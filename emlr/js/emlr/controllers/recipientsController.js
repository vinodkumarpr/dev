(function (app) {
    var recipientsController = function ($scope, $http, recipientService) {
        $scope.showRecipientLayout = false;

        var initialize = function () {
            recipientService.init(() => {
            }); 
        }

        $scope.$on('recipients-display-updated', function(event, value) {
            $scope.showRecipientLayout = value;
        });

        $scope.loadCSV = function () {
            var file = document.getElementById("file_input").files[0];
            recipientService.loadCSV(file, (content)=>{
                console.log("content \n\n" + content);

                var csv = require("csvtojson");
                console.log(csv);
            });
        }

       initialize();
    };
    app.controller("recipientsController", ["$scope", "$http", "recipientService", recipientsController]);
}(angular.module("emlrApp")));