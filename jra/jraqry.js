var request = require("request");
var fs = require('fs');

var csvWriter = require('csv-write-stream')


var host = "https://jira.amagi.tv";
var searchPath = "/rest/api/2/search";
var fieldConfigs = require("./fields.json");

function getJiraIssues(query, filename) {

    var data = {
        "jql": query,
        "maxResults" : 1000,
        'startAt':0
    };

    url = host + searchPath;

    var options = {
        'url': url,
        'method': 'POST',
        'json': data,
        'headers': {
            'Authorization' : 'Basic dmlub2RwcjpCYW5nYWxvcmVAMjAwMQ=='
        }
    };

    request(options,  function(error, response, body) {
        if (!error && response.statusCode === 200) {

            var str = JSON.stringify(body);
            fs.writeFile("body-str-10-1.json", str, function(err) {
                if (err){
                    console.log(err);
                }
            });

            //console.log(str);
            var result = JSON.parse(str);
            issues = result["issues"];
            writeJiraIssues(filename, issues, fieldConfigs);        
        } else {
            console.log("Error: " + error);
            console.log("Status Code: " + response.statusCode);
            console.log("Status Text: " + response.statusText);
        }
    });
}

function _getJiraIssues(query, filename) {
    fs.readFile("body-str-10.json", 'utf8', function(err, data) {
        var result = JSON.parse(data);
        issues = result["issues"];
        writeJiraIssues(filename, issues, fieldConfigs);
    });
}

function writeJiraIssues(filename, issues, fieldConfigs) {
    var titleCols = getTitleColumns(fieldConfigs);
    var csvWriterOpts = {
        'separator': ',',
        'newline': '\n',
        'headers': titleCols,
        'sendHeaders': true
      };

    console.log(titleCols);
    var writer = csvWriter(csvWriterOpts);

    writer.pipe(fs.createWriteStream(filename));
    var index = 1;
    for (issue in issues) {
        issueFields = getIssueFields(issues[issue], index, fieldConfigs);
        writer.write(issueFields);
        console.log(issueFields);
        index++;
    }
    writer.end();
}

function getTitleColumns(fieldConfigs) {
    values = [];
    added = 0;
    values[added++] = "Sl. No.";
    for (item in fieldConfigs) {
        fieldConfig = fieldConfigs[item];
        fieldTitle = fieldConfig["fieldTitle"];
        values[added++] = fieldTitle;
    }

    return values;
}

function getIssueFields(issue, index, fieldConfigs) {
    var values = [];
    var added = 0;
    values[added++] = index;
    values[added++] = issue['key'];
    fields = issue['fields'];
    for (item in fieldConfigs) {
        fieldConfig = fieldConfigs[item];
        fieldTitle = fieldConfig["fieldTitle"];
        jiraFieldName = fieldConfig["jiraFieldName"];
        property = fieldConfig["property"];
        type = fieldConfig["type"];

        if (property == undefined) {
            value = valueToString(fields[jiraFieldName], type);
        } else {
            propval = fields[jiraFieldName];
            if (propval != undefined) {
                value = valueToString(propval[property], type);
            } else {
                value = "";
            }
        }

        values[added++] = value;
    }

    return values;
}

function valueToString(value, type) {
    if (value == undefined) {
        return "";
    }
    if (type == "date") {
        return getFormattedDateString(value);
    } else if (type == "array") {
        return "";
    } else {
        return value;
    }
}

function getFormattedDateString(dateString) {
    date = new Date(dateString);
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
}

module.exports = getJiraIssues;