"use strict";

var request = require("request");
var fs = require('fs');
var csvWriter = require('csv-write-stream')


var url = "https://jira.amagi.tv/rest/api/2/search";
var fieldConfigs = require("./fields.json");
var authText = 'Basic dmlub2RwcjpCYW5nYWxvcmVAMjAwMQ==';

var received = 0;
var total = 0;
var writer;
var queryText = "";

function getJiraIssues(query, filename) {
    queryText = query;
    var data = {
        "jql": query,
        "maxResults" : 1000,
        'startAt': 0
    };
    var options = {
        'url': url,
        'method': 'POST',
        'json': data,
        'headers': {
            'Authorization' : authText
        }
    };
    
    writer = openCSVFile(filename, fieldConfigs);

    request(options, responseHandler);
}

function responseHandler(error, response, body) {
    if (!error && response.statusCode === 200) {
        var str = JSON.stringify(body);

        var result = JSON.parse(str);
        var issues = result["issues"];
        total = result["total"];

        writeJiraIssues(writer, received + 1, issues, fieldConfigs);  
        received += issues.length;
        console.log("Received : " + received + ", Total : " + total);
        if (received < total) {
            var data = {
                "jql": queryText,
                "maxResults" : 1000,
                'startAt': received
            };
            var options = {
                'url': url,
                'method': 'POST',
                'json': data,
                'headers': {
                    'Authorization' : authText
                }
            };
            request(options, responseHandler);
        } else {
            writer.end();
            console.log("Received all");
        }
    } else {
        writer.end();
        console.log("Error occurred, Status : " + response.statusCode);
    }
}

function _getJiraIssues(query, filename) {
    fs.readFile("body-str-10.json", 'utf8', function(err, data) {
        var result = JSON.parse(data);
        issues = result["issues"];
        writeJiraIssues(filename, issues, fieldConfigs);
    });
}

function openCSVFile(filename, fieldConfigs) {
    var titleCols = getTitleColumns(fieldConfigs);
    var csvWriterOpts = {
        'separator': ',',
        'newline': '\n',
        'headers': titleCols,
        'sendHeaders': true
      };

    var writer = csvWriter(csvWriterOpts);

    writer.pipe(fs.createWriteStream(filename));

    return writer;
}


function writeJiraIssues(writer, index, issues, fieldConfigs) {
    for (var issue in issues) {
        var issueFields = getIssueFields(issues[issue], index, fieldConfigs);
        writer.write(issueFields);
        index++;
    }
}

function getTitleColumns(fieldConfigs) {
    var values = [];
    var added = 0;
    values[added++] = "Sl. No.";
    for (var item in fieldConfigs) {
        var fieldConfig = fieldConfigs[item];
        var fieldTitle = fieldConfig["fieldTitle"];
        values[added++] = fieldTitle;
    }

    return values;
}

function getIssueFields(issue, index, fieldConfigs) {
    var values = [];
    var added = 0;
    values[added++] = index;
    values[added++] = issue['key'];
    var fields = issue['fields'];
    for (var item in fieldConfigs) {
        var fieldConfig = fieldConfigs[item];
        var fieldTitle = fieldConfig["fieldTitle"];
        var jiraFieldName = fieldConfig["jiraFieldName"];
        var property = fieldConfig["property"];
        var type = fieldConfig["type"];
        
        var value;

        if (property == undefined) {
            value = valueToString(fields[jiraFieldName], type);
        } else {
            var propval = fields[jiraFieldName];
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
    var date = new Date(dateString);
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
}

module.exports = getJiraIssues;