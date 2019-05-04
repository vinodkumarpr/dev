(function (app) {

    var recipientService = function ($http) {
        var recipientFactory = {};
        var config_name = config['active_config'];
        var loadedRecipients;
        var client;

        recipientFactory.init = function (callback) {
            client = new GitClient($http, config['git_config']['token'], () => {
                client.getFile("dev", "working", "emlr/store/recipients.csv", (file)=>{
                    console.log(file);
                    if (file.encoding == "base64"){
                        let text = atob(file.content);
                        getArrayPropertiesFromString(text, (props) => {
                            __recipients_props = JSON.parse(props);
                            callback();
                        })
                    } else {
                        console.log("Could not load recipients list from S3");
                    }
                });
            });
        };

        function makeRecipientsTable(){
            if (!__recipients_props){
                return null; 
            }
            let columns = Object.keys(__recipients_props.props[0]);
            let rows = [];
            for (let i = 0; i < __recipients_props.props.length; i++){
                let row = [];
                for (let j = 0; j < columns.length; j++){
                    row.push(__recipients_props.props[i][columns[j]]);
                }
                rows.push(row); 
            }
            return {
                "columns": columns,
                "rows": rows
            };
        }

        recipientFactory.getRecipients = function(){
            return makeRecipientsTable();
        }
        recipientFactory.init_v1 = function (callback) {
            callback();
        };

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

        recipientFactory.getUpdatedList = function(newList){
            let existingList = makeRecipientsTable();
            let combinedList = combineLists(existingList, newList);
            console.log(combinedList);
            return combinedList;
        }

        recipientFactory.getJsonToCSV = function (data){
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

        recipientFactory.updateStore = function (csv, callback) {
            let message = "Updating recipients"
            client.updateFile("dev", "working", "emlr/store/recipients.csv", csv, message, (data)=>{
                console.log(data);
                callback();
            });
        }

        recipientFactory.loadCSV = function (file, callback) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                csv({
                    noheader: true,
                    output: "csv"
                })
                    .fromString(e.target.result)
                    .then(function (result) {
                        let existing_list = makeRecipientsTable();
                        loadedRecipients = {
                            "columns": result[0],
                            "rows": result.slice(1)
                        }
                        updateStatus(existing_list, loadedRecipients);
                        callback(loadedRecipients);
                    });
            };
            reader.readAsText(file);
        }


        return recipientFactory;
    };
    app.factory("recipientService", recipientService);
}(angular.module("emlrApp")));