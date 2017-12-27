var getJiraIssues = require("./jraqry.js")
var _issuesQuery = "category = \"Active PAAS Customers\" AND createdDate >= 2017-12-01 AND createdDate <= now()";
var __issuesQuery = "category = \"Active PAAS Customers\" AND created >= 2017-10-01 ORDER BY createdDate DESC";
//var issuesQuery = "category = \'Active PAAS Customers\'";
var issuesQuery = "category = \"Active PAAS Customers\" AND created >= 2017-11-01  and created <= 2017-11-21 ORDER BY createdDate DESC";

getJiraIssues(issuesQuery, "out.csv");