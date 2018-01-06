var {loadTrelloTasks, saveTrelloTasks, trlotest} = require('./trlo.js');
var {requestUserInfo, getUserInfo, allUsersLoaded} = require('./trlombrs')

//trlotest();

loadTrelloTasks(function (err, tasks) {
    if (err){
        console.dir("Error while loading Trello Tasks");
        return;
    }

    file = "trello.csv";
    saveTrelloTasks(tasks, file, () => {
        console.dir("Saved Trello tasks to " + file);
    });
});

/*
var members = ["5892ccc5ac281eef7d257060","5892c951c100ed2efa13202b", "5952273ca10369e98383f35c"];

members.forEach(id => {
    var user = getUserInfo(id);
    if (!user) {
        requestUserInfo(id, (err, data) => {
            if (err) {
                console.dir("Error while loading " + id);
            } else {
                console.dir("[" + id + "]");
            }
            loaded = allUsersLoaded();
            console.dir("All loaded " + loaded);
        });
    }
});
*/
