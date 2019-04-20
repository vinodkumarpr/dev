var request = require("request");
var config = require("../config");

//https://turner-nordic.amagi.tv/v1/api/playlist/status.json?feed_id=1&start_date=2018-05-27&end_date=2018-05-31&ptype=normal&auth_token=AUTH_TOKEN
//https://turner-nordic.amagi.tv/v1/api/playlist/5011.json?token=AUTH_TOKEN&feed_id=7


function getPlaylists(callback, args, startDate, endDate, feed_id) {
    var query = {
        "start_date": startDate.format('YYYY-MM-DD'),
        "end_date": endDate.format('YYYY-MM-DD'),
        "auth_token" : config.auth_token,
        "feed_id" : feed_id,
        "type" :"normal"
    };

    var urlPart = "https://" + config.host + "/v1/api/playlist/status.json";
    var url = urlPart + "?" + getQueryString(query);

    fetch(url, { callback : callback , args : args});
}

function getPlaylist(callback, args, id, feed_id) {
    var query = {
        "auth_token" : config.auth_token,
        "feed_id" : feed_id
    };

    var urlPart = "https://" + config.host + "/v1/api/playlist/" + id + ".json";
    var url = urlPart + "?" + getQueryString(query);

    fetch(url, { callback : callback , args : args});
}

function fetch(url, callbackparam) {
    var options = {
        'url': url,
        'method': 'GET',
    };
    request(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {

            var data = JSON.parse(body);
            callbackparam.callback(false, data, callbackparam.args);

        } else {
            callbackparam.callback(true, response, callbackparam.args);
        }
    });
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

function getQueryString(query) {
    var parts = [];
    for (var key in query) {
        parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(query[key]));
    }

    return parts.join("&");
};

module.exports.getPlaylists = getPlaylists;
module.exports.getPlaylist = getPlaylist;
