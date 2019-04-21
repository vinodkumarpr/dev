(function (app) {

    var recipientService = function ($http) {
        var recipientFactory = {};

        recipientFactory.init = function (callback) {
            callback();
        };

        recipientFactory.loadCSV = function(file, callback){
            var reader = new FileReader();
            reader.onloadend = function (e) {
                callback(e.target.result);
            };
            reader.readAsText(file);
        }
        csv({
            
        })
        .fromString("a,b,c\n1,2,3")
        .then(function(result){
            console.log(result);
        });
        return recipientFactory;
    };
    app.factory("recipientService", recipientService);
}(angular.module("emlrApp")));