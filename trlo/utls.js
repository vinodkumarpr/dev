
module.exports.getQueryString = function(query) {
    parts = []
    for (key in query) {
        parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(query[key]));
    }

    return parts.join("&");
};
