var props = require('../js/emlr/props')
var recipients_props = require('../mkr/output/recipients-props.json')

function getHighLevelProps(props, highLevelProps){
    for (let index = 0; index < 1; index++) {
        let currentItem = props[index];

        highLevelProps.push(currentItem.name);
        if (currentItem.hasOwnProperty("props")){
            getHighLevelProps(currentItem["props"], highLevelProps);
        }
    }
}

function getSimpleProps(props){
    let simpleProps = [];
    for (let i = 0; i < props.length; i++) {
        simpleProps.push(props[i].name);
    }

    return simpleProps;
}

function getFilteredProps(props, filter){
    if (filter[0].value == "*"){
        let values = []
        for (let i = 0; i < props.length; i++){
            if (props[i].name == filter[0].name){
                values.push(props[i].value);
            }
        }
        return values;
    }
    prop = null;
    for (let i = 0; i < props.length; i++){
        if (props[i].name == filter[0].name && props[i].value == filter[0].value){
            prop = props[i];
            break;
        }
    }
    if (prop != null) {
        return getFilteredProps(prop["props"], filter.slice(1));
    }
    return null;
}

function testprops(){
    let highLevelProps = [];
    getHighLevelProps(props.__issues_props.props, highLevelProps)
    console.log(highLevelProps);

    let actionProps = [];
    actionProps = getSimpleProps(props.__action_props.props)
    console.log(actionProps);

    highLevelProps = [];
    getHighLevelProps(props.__channels_props.props, highLevelProps)
    console.log(highLevelProps);

    let filter = [
        {
            "name" : "Issue",
            "value" : "Asset Transcode Failed"
        },
        {
            "name" : "Action",
            "value" : "Delivered Program has failed to transcode. Please analyze and update Customer"
        },
        {
            "name" : "Actor",
            "value" : "*"
        }
    ];
    let filteredProps = getFilteredProps(props.__issues_props.props, filter);
    console.log(filteredProps);

    let values = {
        "Customer" : "ACJ",
        "Channel" : "ABS",
        "Actor" : "Media"
    }
    
    // for (value in values){
    //     console.log(value);
    //     console.log(values[value]);
    // }
}


function process(filepath, callback){
    const csv = require('csvtojson')
    csv({
	    noheader : true,
        output : "csv"    
    }).fromFile(filepath)
    .then((result) => {
        let list = {
            "columns": result[0],
            "rows": result.slice(1)
        }
        callback(list);
    });   
}

function makeRecipientsTable(){
    let columns = Object.keys(recipients_props.props[0]);
    let rows = [];
    for (let i = 0; i < recipients_props.props.length; i++){
        let row = [];
        for (let j = 0; j < columns.length; j++){
            row.push(recipients_props.props[i][columns[j]]);
        }
        rows.push(row); 
    }
    return {
        "columns": columns,
        "rows": rows
    };
}

function compareRows(row1, row2, num_elem_cols, num_cols){
    let matching = true;
    for (let i = 0; i < num_elem_cols; i++){
        if (row1[i] != row2[i]){
            matching = false;
            break;
        }
    }
    if (!matching){
        return "DIFFERENT"
    }

    for (let i = num_elem_cols; i < num_cols; i++){
        if (row1[i] != row2[i]){
            matching = false;
            break;
        }
    }

    return matching ? "SAME" : "MODIFIED";
}

function combineLists(existing_list, new_list){
    let combined_list = {
        "columns": [],
        "rows" : []
    };
    
    for (let i = 0; i < existing_list.rows.length; i++){
        let status = "None";
        let new_item = null;
        for (let j = 0; j < new_list.rows.length; j++){
            let result = compareRows(existing_list.rows[i], new_list.rows[j], 2, existing_list.columns.length);
            if (result == "MODIFIED"){
                status = result; 
                new_item = new_list.rows[j];
                break;
            }
        }
        if (status == "MODIFIED"){
            combined_list.rows.push(new_item);
        } else {
            combined_list.rows.push(existing_list.rows[i]);
        }
    }
    for (let i = 0; i < new_list.rows.length; i++){
        let status = "None";
        for (let j = 0; j < existing_list.rows.length; j++){
            let result = compareRows(new_list.rows[i], existing_list.rows[j], 2, existing_list.columns.length);
            if (result == "SAME" || result == "MODIFIED"){
                status = result;
                break;
            }
        }
        if (status == "None") {
            combined_list.rows.push(new_list.rows[i]);
        }
    }

    combined_list["columns"] = existing_list.columns;

    return combined_list;
}

function updateStatus(existing_list, new_list){
    for (let i = 0; i < new_list.rows.length; i++){
        for (let j = 0; j < existing_list.rows.length; j++){
            let result = compareRows(new_list.rows[i], existing_list.rows[j], 2, existing_list.columns.length);
            if (result == "SAME" || result == "MODIFIED"){
                new_list.rows[i]["status"] = result;
                break;
            }
        }
        if (!new_list.rows[i].hasOwnProperty("status")){
            new_list.rows[i]["status"] = "NEW";
        }
    }
}

function getJsonToCSV(data){
    const NEW_LINE = "\n";
    let header = data.columns.map((column) => {
        return '"' + column + '"';
    }).join(",");

    let rows = data.rows.map((row) => {
        return row.map((item) => {
            return '"' + item + '"';
        }).join(",");
    }).join(NEW_LINE);

    let csv = [header, rows].join(NEW_LINE)
    return csv;
}

function compare(filepath){
    let recipients = makeRecipientsTable();
    let new_list;
    process(filepath, (list) => {
        new_list = list;
        updateStatus(recipients, new_list)

        for (let i = 0; i < new_list.rows.length; i++){
            console.log(new_list.rows[i][0], new_list.rows[i][1], new_list.rows[i]["status"]);
        }

        let combined_list = combineLists(recipients, new_list);
        for (let i = 0; i < combined_list.rows.length; i++){
            console.log(combined_list.rows[i][0], combined_list.rows[i][1]);
        }
        let csv = getJsonToCSV(combined_list);
        putRequest("253ad866cf61fb86afb02665368f5f60f03f1e63", '/vinodkumarpr/dev/working/emlr/store/recipients.csv', csv, "text/csv");
    });
}

//curl -i -H "Authorization: token  6d7828c032cfb08eef29d346f12d7819515a1883" https://raw.githubusercontent.com/vinodkumarpr/dev/working/README^C

// curl -X GET -u 253ad866cf61fb86afb02665368f5f60f03f1e63:x-oauth-basic 'https://api.github.com/user'
// curl -X GET -u 253ad866cf61fb86afb02665368f5f60f03f1e63:x-oauth-basic 'https://api.github.com/users/vinodkumarpr/repos'
// curl -X GET -u 253ad866cf61fb86afb02665368f5f60f03f1e63:x-oauth-basic "https://api.github.com/repos/vinodkumarpr/dev/downloads"

function getRequest(token, path){
    const https = require('https')

    authToken = 'token  ' + token;
    const options = {
        hostname: 'raw.githubusercontent.com',
        port: 443,
        path: path,
        method: 'GET',
        headers: {
          'Authorization': authToken,
          'User-Agent' : 'git-user-app'
        }
      }
      
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)            
        res.on('data', (d) => {
            console.log("body " + d)
        })
        res.on("end", () => {
            console.log("end")
        });
      })
      
      req.on('error', (error) => {
        console.error(error)
      })
      
      req.end()
}

function putRequest(token, path, data, contentType){
    const https = require('https')

    authToken = 'token  ' + token;
    const options = {
        hostname: 'raw.githubusercontent.com',
        port: 443,
        path: path,
        method: 'PUT',
        headers: {
          'Authorization': authToken,
          'Content-Type': 'application/json',
          'Content-Length': data.length
        }
      }
      
      const req = https.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
            
        res.on('data', (d) => {
            console.log("body " + d)
        })

        res.on('end', () => {
            console.log("end")
        })
      })
      
      req.on('error', (error) => {
        console.error(error)
      })

      req.write(data)
      
      req.end()
}


// git_token = "6d7828c032cfb08eef29d346f12d7819515a1883"
token = "253ad866cf61fb86afb02665368f5f60f03f1e63"

//getRequest("6d7828c032cfb08eef29d346f12d7819515a1883", '/vinodkumarpr/dev/working/emlr/store/recipients.csv');

// setTimeout(function afterTwoSeconds() {
//     console.log('20')
//   }, 20000)

compare("/home/vinod/wrkng/rpstry/dev/emlr/mkr/input/recipients/recipients_v3.0.csv");
//makeRecipientsTable();