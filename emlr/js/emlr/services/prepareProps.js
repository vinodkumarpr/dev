let fs = require("fs");
//const csv = require('csvtojson');

let PROPS_KEY = "props";
let PROP_NAME_KEY = "name";
let PROP_VAL_KEY = "value";

function getProp(props, propName, propValue) {
    for (let index = 0; index < props.length; index++){
        if (props[index][PROP_NAME_KEY] == propName
        && props[index][PROP_VAL_KEY] == propValue) {
            return props[index];
        }
    }
    return null;
}

function putProp(props, propName, propValue){
    var propItem = {};
    propItem[PROP_NAME_KEY] = propName;
    propItem[PROP_VAL_KEY] = propVal;
    props.push(propItem);

    return propItem;
}

function testcsv(filepath){
    const csv = require('')
    csv()
    .fromFile(filepath)
    .then((jsonObj)=> {
        var text = JSON.stringify(jsonObj, null, 4);
        console.log(text);
    })
}

function convertRows(rows, relational){
    let items = {};
    
    for (let row = 0; row < rows.length; row++) {
        var currentProp = items;

        //
        // Walk through the columns and prepare properties
        //
        let cols = Object.keys(rows[row]);
        for (let col = 0; col < cols.length; col++) {
            //
            // If "props" is not available, add the property
            //
            if (!currentProp.hasOwnProperty(PROPS_KEY)) {
                currentProp[PROPS_KEY] = [];
            }

            propName = cols[col];
            propVal = rows[row][propName];
            if (!relational){
                propName = propVal;
            }

            currentProps = currentProp[PROPS_KEY]; 
            propItem = getProp(currentProps, propName, propVal);
            if (propItem == null) {
                //
                // If property item is not present, insert item to props list
                //
                propItem = putProp(currentProps, propName, propVal);
            }

            currentProp = propItem;
        }
    }
    var jsonText = JSON.stringify(items, null, 4);
    return jsonText;
}

function prepareProperties(filepath, relational, callback) {
    fs.readFile(filepath, (err, data) => {
        if (err) throw err;
        let text = data.toString('utf-8');
        preparePropertiesFromString(text, relational, callback);
    });
}

function preparePropertiesFromString(csvText, relational, callback) {
    csv()
    .fromString(csvText)
    .then((rows)=> {
        jsonText = convertRows(rows, relational);
        callback(jsonText);    
    })
}

function writeArrayProperties(filepath, propFile, callback) {
    fs.readFile(filepath, (err, data) => {
        if (err) throw err;
        let text = data.toString('utf-8');
        getArrayPropertiesFromString(text, (jsonText) => {
            writeToFile(propFile, jsonText, callback);
        });
    });
}


function getArrayPropertiesFromString(text, callback) {
    csv()
        .fromString(text)
        .then((data) => {
            var properties = {
                "props": data
            };
            var jsonText = JSON.stringify(properties, null, 4);
            callback(jsonText);
        });
}


function writeProperties(csvFile, propFile, callback){
    prepareProperties(csvFile, true, (properties) =>{
        writeToFile(propFile, properties);    
    });
}

function writeSimpleProperties(csvFile, propFile, callback){
    prepareProperties(csvFile, false, (properties) =>{
        writeToFile(propFile, properties);
    });
}


function writeToFile(file, data, callback){
    fs.writeFile(file, data, 'utf8', (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Wrote to " + file);
            if (callback) callback();
        }
    });    
}

var js_json_data = {
    "jsons" : [
        {
            "name" : "__action_props",
            "title" : "Action details",
            "source" : "../../../mkr/output/action-props.json",
            "element" : "props"
        },
        {
            "name" : "__channels_props",
            "title" : "Channel details",
            "source" : "../../../mkr/output/channels-props.json",
            "element" : "props"
        },
        {
            "name" : "__issues_props",
            "title" : "Issue description",
            "source" : "../../../mkr/output/issues-props.json",
            "element" : "props"
        }
        /*,
        {
            "name" : "__recipients_props",
            "title" : "Recipients",
            "source" : "../../../mkr/output/recipients-props.json",
            "element" : "props"
        }*/
    ]
};


function createJsonDefinition(jsons, index, jsfile, callback) {
    if (index >= jsons.length) {
        if (callback) callback();
        return;
    }
    data = jsons[index];
    fs.readFile(absolutePath(data["source"]), (err, jsonText) => {
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

function writeExports(jsfile, jsons) {
    fs.open(jsfile, "a+", (error, fd) => {
        var props = "";
        for (var i = 0; i< jsons.length; i++){
            if (props.length > 0) {
                props = props + ", ";
            }
            props = props + jsons[i].name;
        }
        var exportsText = "module.exports = { " + props + " };"
        fs.write(fd, exportsText, (err, written, str) => {
            fs.close(fd, (error) => {
            });    
        });
    });
}


function createJsonJS(jsfile, callback){
    fs.unlink(jsfile, (err) => {
        if (err && err.code != "ENOENT") throw err;
        createJsonDefinition(js_json_data["jsons"], 0, jsfile, () => {
            writeExports(jsfile, js_json_data["jsons"]);
        });
    });
}

function absolutePath(filepath){
    const path = require('path');
    return path.join(__dirname, filepath);
}

function build_t(callback){
    console.log("build started")

    console.log("building data jsons");
    // makeJsonIndependant("../../../mkr/input/others.csv", "../../../mkr/output/others.json", null);
    writeProperties(absolutePath("../../../mkr/input/issue.csv"), absolutePath("../../../mkr/output/issues-props.json"), null);
    writeProperties(absolutePath("../../../mkr/input/channels.csv"), absolutePath("../../../mkr/output/channels-props.json"), null);
    writeSimpleProperties(absolutePath("../../../mkr/input/action.csv"), absolutePath("../../../mkr/output/action-props.json"), null);
    writeArrayProperties(absolutePath("../../../mkr/input/recipients/recipients_v2.0.csv"), absolutePath("../../../mkr/output/recipients-props.json"), null);
    
    createJsonJS("js/emlr/props.js")
    console.log("build completed");
}

function build(callback){
    //testcsv("../../../mkr/input/recipients/recipients_v2.0.csv");
    writeProperties(absolutePath("../../../mkr/input/issue.csv"), absolutePath("../../../mkr/output/issues-props.json"), null);
}

build_t( () => {
    //uploadFiles();
});

