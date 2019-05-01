(function (app) {
    var recipientsController = function ($scope, $http, recipientService) {
        $scope.showRecipientLayout = false;
        $scope.table_list = {};
        $scope.editing = false;

        var initialize = function () {
            recipientService.init(() => {
                let list = recipientService.getRecipients();
                $scope.table_list["columns"] = list.columns.slice(2);
                $scope.table_list["rows"] = list.rows.map((row) => {
                    return {
                        "channel" : row.slice(0, 2),
                        "recipients" : row.slice(2)
                    }
                });
            }); 
        }

        $scope.$on('recipients-display-updated', function(event, value) {
            $scope.showRecipientLayout = value;
        });

        $scope.loadCSV = function () {
            var file = document.getElementById("file_input").files[0];
            recipientService.loadCSV(file, (list)=>{
                $scope.$apply(()=>{
                    $scope.table_list["columns"] = list.columns.slice(2);
                    $scope.table_list["rows"] = list.rows.map((row) => {
                        return {
                            "channel" : row.slice(0, 2),
                            "recipients" : row.slice(2)
                        }
                    });    
                    $scope.editing = true;
                })
            });
        }

       initialize();
    };
    app.controller("recipientsController", ["$scope", "$http", "recipientService", recipientsController]);
}(angular.module("emlrApp")));