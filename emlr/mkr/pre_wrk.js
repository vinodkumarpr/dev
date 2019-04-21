let csvToJson = require('convert-csv-to-json');
let csvparser = require('csv-parse');
let fs = require("fs");

function process(file) {
    let json = csvToJson.fieldDelimiter(',') .getJsonFromCsv(file);
    let val = { "options" : []};

    //console.log(val);

    for (let i = 0; i < json.length; i++) {
        let keys = Object.keys(json[i]);
        for (let j = 0; j < keys.length; j++) {
            if (i == 0){
                var element = create_element(keys[j], j == 0);
                val["options"].push(element);
                if (j > 0){
                    element.content["rel"] = keys[j - 1];
                }
            }
            element = get_element(val["options"], "name", keys[j]);
            if (element["is-base"]) {
                push_unqiue_element(element.content.value, json[i][keys[j]]);
            } else if (j > 0) {
                var opt = json[i][keys[j - 1]];
                if (!element.content.value[opt]) {
                    element.content.value[opt] = [];
                }
                push_unqiue_element(element.content.value[opt], json[i][keys[j]]);
            }
        }
    }
    //console.log(val);
    var jsonVal = JSON.stringify(val, null, 4);
    //console.log(jsonVal);

    return jsonVal;
}

function processIndependant(file) {
    let json = csvToJson.fieldDelimiter(',') .getJsonFromCsv(file);
    let val = { "options" : []};

    //console.log(val);

    for (let i = 0; i < json.length; i++) {
        let keys = Object.keys(json[i]);
        for (let j = 0, element = null; j < keys.length; j++) {
            var tag = json[i][keys[j]].trim();
            if (element == null){
                element = get_element(val["options"], "name", tag);
                if (!element) {
                    element = create_element(tag, true);
                    val["options"].push(element);
                }
            } else {
                push_unqiue_element(element.content.value, tag);
            }    
        }
    }
    //console.log(val);
    var jsonVal = JSON.stringify(val, null, 4);
    //console.log(jsonVal);

    return jsonVal;
}


function create_element(name, isBaseElement) {
    var element = {
        "name": name,
        "title": name,
        "is-base": isBaseElement
    }
    if (isBaseElement) {
        element["content"] = {
            "type": "array",
            "value": []
        }
    } else {
        element["content"] = {
            "type": "dict",
            "value": {}
        }
    }
    return element;
}

function push_unqiue_element(list, value) {
    for (var item in list){
        if (list[item] == value) {
            return;
        }
    }
    return list.push(value);
}

function get_element(list, propname, propval) {
    for (var item in list){
        if (list[item][propname] == propval) {
            return list[item];
        }
    }
    return null;
}

/*
{ 
    Issue: 'Playout Not in Sync With Playlist',
    Source: 'Field',
    Component: 'Local ID',
    Action: 'Scheduled Local ID is not playing on-air. Amagi support team are getting more details and will keep you updated',
    Actor: 'Scheduling' }*/

function create(list){

}

function makeJson(csvFile, jsonFile, callback) {
    var json = process(csvFile);
    json = json.replace("\r", '')
    var fs = require('fs');
    fs.writeFile(jsonFile, json, 'utf8', (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Wrote to " + jsonFile);
            if (callback) callback();
        }
    });    
}

function makeJsonIndependant(csvFile, jsonFile, callback) {
    var json = processIndependant(csvFile);
    json = json.replace("\r", '')
    var fs = require('fs');
    fs.writeFile(jsonFile, json, 'utf8', (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Wrote to " + jsonFile);
            if (callback) callback();
        }
    });    
}

function makeDummyRecipients(channelFile, categoriesFile, recipientsFile) {
    let channels = csvToJson.fieldDelimiter(',').getJsonFromCsv(channelFile);
    let categories = csvToJson.fieldDelimiter(',').getJsonFromCsv(categoriesFile);
    var list = [];
    for (let i = 0; i < channels.length; i++) {
        let keysChannels = Object.keys(channels[i]);
        for (let j = 0; j < keysChannels.length; j++) {
            for (let p = 0; p < categories.length; p++) {
                let keysCategories = Object.keys(categories[p]);
                for (let q = 0; q < keysCategories.length; q++){
                    list.push([channels[i][keysChannels[j]], categories[p][keysCategories[q]]])
                }
            }
        }
    }
    // writeToCsv(list);
    var recipientsJson = {};
    recipientsJson["recipients"] = [];
    for (let i = 0; i < list.length; i++) {
        recipientsJson["recipients"].push(
            {
                "channel" : list[i][0],
                "category" : list[i][1],
                "recipients" : list[i][0] + "_" + list[i][1]
            }
        )
    }
    var jsonVal = JSON.stringify(recipientsJson, null, 4);
    fs.open(recipientsFile, "w", (error, fd) => {
        fs.write(fd,jsonVal, (err, written, str) => {
            fs.close(fd, (error) => {
                console.log("closed");
            });    
        });
    });
}

function writeToCsv(list) {
    fs.open("recipients_list.csv", "w", (error, fd) => {
        fs.write(fd, ("channel" + "," + "category" + "," + "recipients" + "\n"), (error, written, message) => {
            writeList(fd, list);
        });  
    });
}

function writeList(fd, list) {
    if (list.length < 1) {
        fs.close(fd, (error) => {
            console.log("closed");
        });
        return;
    }
    var item = list.shift();
    var recipients = item[0] + "_" + item[1];
    fs.write(fd, (item[0] + "," + item[1] + "," + recipients + "\n"), (error, written, message) => {
        writeList(fd, list);
    });
}

function createJsonDefinition(jsons, index, jsfile, callback) {
    if (index >= jsons.length) {
        callback();
        return;
    }
    data = jsons[index];
    fs.readFile(data["source"], (err, jsonText) => {
        if (err) throw err;

        var json = JSON.parse(jsonText);
        var elementName = data["element"];
        var jsonVariable = {
            "title" : data["title"]
        }
        jsonVariable[elementName] = json[data["element"]];
        var jsonVariableText = JSON.stringify(jsonVariable, null, 4);
        var json_def = "var " + data["name"] + " = \n" + jsonVariableText + ";\n";
        fs.open(jsfile, "a+", (error, fd) => {
            fs.write(fd, json_def, (err, written, str) => {
                fs.close(fd, (error) => {
                    createJsonDefinition(jsons, index + 1, jsfile, callback)
                });    
            });
        });           
    });
}

function createJsonJS(jsfile, callback){
    fs.unlink(jsfile, (err) => {
        if (err && err.code != "ENOENT") throw err;
        createJsonDefinition(js_json_data["jsons"], 0, jsfile, callback);
    });
}

function makeRecipients(dir, file){
    var recipients = [];
    fs.readdir(dir, (err, files) => {
        process_recipients_v2(recipients, dir, files, 0, () => {
            var recipient_list = {
                "recipients" : recipients
            }
            var recipientsText = JSON.stringify(recipient_list, null, 4);
            fs.open(file, "w", (error, fd) => {
                fs.write(fd, recipientsText, (err, written, str) => {
                    fs.close(fd, (error) => {
                        console.log("Recipients completed");
                    });    
                });
            });
            
        });
    });
}

/* function process_recipients_v1(recipients, dir, files, index){
    if (index >= files.length) {
        return;
    }
    var filepath = dir + files[index];

    var parser = csvparser({delimiter: ','}, function(err, data){
        let categories = data.length - 1;
        for (var channel = 1; channel < data[0].length; channel++) {
            console.log(data[0][channel]);
            for (var category = 1; category <  data.length; category++){
                console.log(data[category][0] + "," + data[category][channel]);
            }    
        }
      });
      
      fs.createReadStream(filepath).pipe(parser);
}
 */
function process_recipients_v2(recipients, dir, files, index, callback){
    if (index >= files.length) {
        callback();
        return;
    }
    if (!files[index].endsWith(".csv")) {
        process_recipients_v2(recipients, dir, files, index + 1, callback);
        return;
    }
    var filepath = dir + files[index];
    var parser = csvparser({delimiter: ','}, function(err, data){
        let categories = data.length - 1;
        for (var row = 1; row < data.length; row++) {
            for (var col = 1; col <  data[row].length; col++){
                var recipient = {
                    "channel" : data[row][0],
                    "category" : data[0][col],
                    "recipients" : data[row][col]
                };
                recipients.push(recipient);
            }
        }
        process_recipients_v2(recipients, dir, files, index + 1, callback);
      });
      
      fs.createReadStream(filepath).pipe(parser);
}


var js_json_data = {
    "jsons" : [
        {
            "name" : "__other_data",
            "title" : "Other details",
            "source" : "mkr/others.json",
            "element" : "options"
        },
        {
            "name" : "__channel_data",
            "title" : "Channel details",
            "source" : "mkr/channels.json",
            "element" : "options"
        },
        {
            "name" : "__issue_data",
            "title" : "Issue description",
            "source" : "mkr/issue.json",
            "element" : "options"
        },
        {
            "name" : "__recipients_data",
            "title" : "Recipients",
            "source" : "mkr/recipients_list.json",
            "element" : "recipients"
        }
    ]
};


function build(callback){
    console.log("build started")

    console.log("building data jsons");
    makeJsonIndependant("mkr/input/others.csv", "mkr/others.json", null);
    makeJson("mkr/input/issue.csv", "mkr/issue.json", null);
    makeJson("mkr/input/channels.csv", "mkr/channels.json", null);
    
    console.log("building recipient json");
    makeRecipients("mkr/input/recipients/", "mkr/recipients_list.json");

    console.log("building page_data.js");
    createJsonJS("page_data.js", callback);
    console.log("build completed");
}

build( () => {
    uploadFiles();
});


function uploadFiles() {        
    var AWS = require("aws-sdk");

    // Create a promise on S3 service object
    var config = 
            {
                "accessKeyId": "AKIAJZXWS6DIWRRCXQ7Q",
                "secretAccessKey": "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",
                "region": "us-east-1"
            };

    AWS.config.update(config);

    var s3 = new AWS.S3({apiVersion: '2006-03-01'});

    uploadItems(s3, "amgonb-sam", "emailer/", ["page_data.js", "page.css"]);
}

function uploadItems(s3, bucket, upload_path, items) {
    if (items.length == 0) {
        return;
    }
    var item = items.shift();
    var uploadParams = {Bucket: bucket, Key: '', Body: ''};
    var file = item;
    
    var fs = require('fs');
    var fileStream = fs.createReadStream(file);
    fileStream.on('error', function(err) {
      console.log('File Error', err);
    });
    uploadParams.Body = fileStream;

    var path = require('path');
    uploadParams.Key = upload_path + path.basename(file);
    s3.upload (uploadParams, function (err, data) {
        if (err) {
          console.log("Error", err);
        } if (data) {
          console.log("Upload Success:", data.Location);
          uploadItems(s3, bucket, upload_path, items)
        }
      });    
}
