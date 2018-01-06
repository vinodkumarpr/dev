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
