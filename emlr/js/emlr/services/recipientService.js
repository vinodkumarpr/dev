(function (app) {

    var recipientService = function ($http) {
        var recipientFactory = {};
        var config_name = aws_config['active_config'];

        recipientFactory.init = function (callback) {
            getS3Object(getS3(aws_config[config_name]), aws_config[config_name]["bucket"], aws_config[config_name]["path"]["recipients"], (err, data) => {
                if (!err) {
                    let text = data.Body.toString('utf-8');
                    getArrayPropertiesFromString(text, (props) => {
                        __recipients_props = JSON.parse(props);
                    })
                } else {
                    console.log("Could not load recipients list from S3");
                }
            });
                  
            callback();
        };

        recipientFactory.init_v1 = function (callback) {
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