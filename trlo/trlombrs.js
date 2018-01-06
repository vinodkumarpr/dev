var format = require('string-format')
var request = require("request");
var config = require("./config.json");
var {getQueryString} = require('./utls')

var users = {};
var requests = [];
var working = [];

function requestUserInfo(id, done) {
    users[id] = {
        "user": null,
        "loaded": false
    };
    addRequest([id, done]);
}

function addRequest(request){
    var index = requests.find((element) => {
        if (element[0] == request[0])
            return true;
        return false;
    });

    if (index != undefined) {
        return;
    }
    requests.push(request);
    if (working.length == 0) {
        nextRequest();
    }
}

function remove(array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function nextRequest(){
    if (requests.length == 0){
        return;
    }
    [id, done] = requests.shift();
    working.push(id);
    setImmediate( function(){
        getTrelloUserInfo(id, (err, data) => {
            remove(working, id);
            if (err) {
                users[id] = {
                    "user": null,
                    "loaded": false,
                    "error": true
                };
            } else {
                users[id] = {
                    "user": data,
                    "loaded": true,
                    "error": false
                };
            }
            done(err, data);
            nextRequest();
        });
    });
}

function getUserInfo(id) {
    if (users[id] && users[id].loaded){
        return users[id].user;
    }
}

function allUsersLoaded(){
    for (var key in users) {
        if (!(users[key].loaded || users[key].error)){
            return false;
        }
    }
    return true;
}

function getTrelloUserInfo(id, done){
    var request = require("request");
    var query = {
        "key": config.apiKey,
        "token": config.authToken
    };
    var memberurl = "https://api.trello.com/1/members/" + id;

    var url = memberurl + "?" + getQueryString(query);

    var options = { method: 'GET',
      url: url };
    
    request(options, function (error, response, body) {
        if (error || response.statusCode != 200) {
            done(true);
        }
        var data = JSON.parse(body);
        done(false, data);
    });
}

module.exports.requestUserInfo = requestUserInfo;
module.exports.getUserInfo = getUserInfo;
module.exports.allUsersLoaded = allUsersLoaded;
