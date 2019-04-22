(function (app) {

    var recipientService = function ($http) {
        var recipientFactory = {};

        recipientFactory.init = function (callback) {
            callback();
        };

        recipientFactory.loadCSV = function (file, callback) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                csv({
                    noheader: true,
                    output: "csv"
                })
                    .fromString(e.target.result)
                    .then(function (result) {
                        let list = {
                            "columns": result[0],
                            "rows": result.slice(1)
                        }
                        callback(list);
                    });
            };
            reader.readAsText(file);
        }
        return recipientFactory;
    };
    app.factory("recipientService", recipientService);
}(angular.module("emlrApp")));