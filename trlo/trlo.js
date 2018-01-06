var format = require('string-format')
var request = require("request");
var config = require("./config.json");
var { getQueryString } = require('./utls')
var { requestUserInfo, getUserInfo, allUsersLoaded } = require('./trlombrs')

var trelloBaseUrl = "https://api.trello.com/1/";
var listsUrlPart = "boards/{0}/lists/";
var cardsUrlPart = "lists/{0}/cards";

var callback;

function loadTrelloTasks(loadedCallback) {
    var query = {
        "fields": "name",
        "members": "true",
        "member_fields": "fullName",
        "key": config.apiKey,
        "token": config.authToken
    };

    callback = loadedCallback;

    var part = format(listsUrlPart, config.board);
    var url = trelloBaseUrl + part + "?" + getQueryString(query);

    getTrelloTasks(url);
}

function getTrelloTasks(url) {
    var options = {
        'url': url,
        'method': 'GET',
    };
    request(options, responseHandler);
}

function responseHandler(error, response, body) {
    if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        getTrelloLists(data);
    } else {
        callback(true);
    }
}

function tasks(lists) {
    let lines = [];
    let rows = 0;
    let index = 1;
    for (list in lists) {

        lines[rows++] = {
            "serialnumber": "#",
            "name": list,
            "url": "",
            "users": "",
            "due":""
        }

        let cards = lists[list];
        for (var i in cards) {
            row = {
                "serialnumber": index,
                "name": cards[i].name,
                "url": cards[i].shortUrl,
                "users": getCardUsers(cards[i]),
                "due": getDate(cards[i])
            }
            lines[rows++] = row;
            index++;
        }
    }
    return lines;
}

function getDate(card){
    if (card.due){
        var date = new Date(card.due);
        var options = { month: "short",  
        day: "numeric" };
            
        return date.toLocaleDateString("en-IN", options);
    }
    return "";
}

function getCardUsers(card) {
    var users = "";
    card["idMembers"].forEach((id) => {
        var user = getUserInfo(id);
        if (user != undefined) {
            users = users.length > 0 ? users + ", " + user.fullName : user.fullName;
        } else {
            users = users.length > 0 ? users + ", " + id : id;
        }
        
    });

    return users;
}

function getAllUsersInfo(lists, done) {
    for (list in lists) {
        let cards = lists[list];
        for (var i in cards) {
            for (var index in cards[i].idMembers) {
                var id = cards[i].idMembers[index];
                var user = getUserInfo(id);
                if (!user) {
                    requestUserInfo(id, (err, data) => {
                        loaded = allUsersLoaded();
                        if (loaded) done();
                    });
                }
            }
        }
    }
}

function fetchListCards(name, listId, done) {
    var query = {
        "key": config.apiKey,
        "token": config.authToken
    };
    var part = format(cardsUrlPart, listId);
    var url = trelloBaseUrl + part + "?" + getQueryString(query);

    var options = {
        'url': url,
        'method': 'GET',
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            done(data, false);
        } else {
            console.log("fetchListCards :: Error occurred, Response Status : " + response.statusCode);
        }
    });
}

function getTrelloLists(trelloListInfos) {
    function getListCards(lists, trelloLists, done) {
        if (lists.length === 0) {
            return done();
        }

        var listInfo = lists.shift();

        function next() {
            setImmediate(function () {
                getListCards(lists, trelloLists, done);
            });
        }

        fetchListCards(listInfo.name, listInfo.id, function (data, err) {
            if (err) {
                return done(err);
            }
            trelloLists[listInfo.name] = data;
            next();
        });
    }

    var trelloLists = {};
    var infolist = [];

    for (var i = 0; i < trelloListInfos.length; i++) {
        infolist[i] = {
            id: trelloListInfos[i].id,
            name: trelloListInfos[i].name
        };
    }

    getListCards(infolist, trelloLists, function (err) {
        if (err) {
            callback(true);
        }
        dump(trelloLists);
        getAllUsersInfo(trelloLists, () => {
            trelloTasks = tasks(trelloLists);
            callback(false, trelloTasks);
        });
    });
};

function saveTrelloTasks(tasks, filename, done) {
    var options = {
        rowDelimiter: '\t',
        textDelimiter: '\\',
        headers: [
            "serialnumber",
            "name",
            "url",
            "users",
            "due"
        ],
        rename: [
            "Sl. No",
            "Task",
            "Link",
            "Users",
            "Date"
        ]
    };

    require('jsonexport')(tasks, options, function (err, csv) {
        if (err) {
            done(err);
            return;
        }

        require('fs').writeFile(filename, csv, () => {
            done(false);
        });
    });
}

function dump(data) {
    require('jsonfile').writeFile("trello.txt", data, () => {
    });
}

function trlotest() {
    require('jsonfile').readFile("trello.txt", function (err, obj) {
        console.dir(obj);
        tasksobj = tasks(obj);
        file = "trello.csv";
        saveTrelloTasks(tasksobj, file, () => {
            console.log("Saved to " + file)
        });
        // getAllUsersInfo(obj, () => {
        //     tasksobj = tasks(obj);
        //     file = "trello.csv";
        //     saveTrelloTasks(tasksobj, file, () => {
        //         console.log("Saved to " + file)
        //     });
        // });
    })
}

module.exports.loadTrelloTasks = loadTrelloTasks;
module.exports.saveTrelloTasks = saveTrelloTasks;
module.exports.trlotest = trlotest;
