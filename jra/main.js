
var issuesQuery = "category = \"Active PAAS Customers\" AND created >= 2017-11-01 ORDER BY createdDate DESC";

var args = require('minimist')(process.argv.slice(2));

var output;
var query;

if (args['o'] != undefined){
    output = args['o'];
} else if (args['O'] != undefined) {
    output = args['O'];
}

if (args['q'] != undefined){
    query = args['q'];
} else if (args['Q'] != undefined) {
    query = args['Q'];
}


if (output == undefined || query == undefined){
    console.info("Usage : -o <output file> -q <query>");
} else {
    console.log("Output : " + output);
    console.log("Query : " + query);
    require('./jraqry.js')(query, output);
}


