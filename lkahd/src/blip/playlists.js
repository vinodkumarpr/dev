var request = require("request");

var config = {
    host : "turner-nordic.amagi.tv",
    feed_id : [1,2,3,4,5,6],
    auth_token : "AUTH_TOKEN"
};

//https://turner-nordic.amagi.tv/v1/api/playlist/status.json?feed_id=1&start_date=2018-05-27&end_date=2018-05-31&ptype=normal&auth_token=AUTH_TOKEN

var callback;
var callbackArgs;

function getPlaylists(loadedCallback, args, startDate, endDate, feed_id) {
    var query = {
        "start_date": startDate.format('YYYY-MM-DD'),
        "end_date": endDate.format('YYYY-MM-DD'),
        "auth_token" : config.auth_token,
        "feed_id" : feed_id,
        "type" :"normal"
    };

    callback = loadedCallback;
    callbackArgs = args;

    var urlPart = "https://" + config.host + "/v1/api/playlist/status.json";
    var url = urlPart + "?" + getQueryString(query);

    fetchPlaylists(url);
}

function fetchPlaylists(url) {
    var options = {
        'url': url,
        'method': 'GET',
    };
    request(options, responseHandler);
}

function dump(file, data) {
    var fs = require('fs');
    fs.writeFile(file, data, function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
}

function responseHandler(error, response, body) {
    if (!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        //dump("resp", body);
        callback(false, data, callbackArgs);
    } else {
        callback(true, response)
    }
}

function getQueryString(query) {
    var parts = [];
    for (var key in query) {
        parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(query[key]));
    }

    return parts.join("&");
};

module.exports.getPlaylists = getPlaylists;
