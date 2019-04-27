(function (app) {
    var recipientsController = function ($scope, $http, recipientService) {
        $scope.showRecipientLayout = false;
        $scope.table_list = {
            "columns" : [
                "Customer", "Channel", "Recipients"
            ],
            "rows" : [
                {
                    "channel" : ["Customer", "Channel"],
                    "recipients" :  ["1_1", "1_2", "1_3"]
                },
                {
                    "channel" : ["Customer1", "Channel1"],
                    "recipients" :  ["2_1", "2_2", "2_3"]
                }
            ],
            "recipient_types" : 
            ["a", "b", "c"]
        };

        console.log("List " + $scope.table_list);

        var initialize = function () {
            recipientService.init(() => {
            }); 
        }

        $scope.$on('recipients-display-updated', function(event, value) {
            $scope.showRecipientLayout = value;
        });

        $scope.loadCSV = function () {
            var file = document.getElementById("file_input").files[0];
            recipientService.loadCSV(file, (list)=>{
                //$scope.table_list["columns"] = list.columns;
                $scope.table_list["rows"] = list.rows.map((row) => {
                    return {
                        "channel" : row.slice(0, 2),
                        "recipients" : row.slice(2)
                    }
                });
                console.log("List is " + $scope.table_list);
            });
        }

       initialize();
    };
    app.controller("recipientsController", ["$scope", "$http", "recipientService", recipientsController]);
}(angular.module("emlrApp")));