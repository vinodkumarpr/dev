(function (app) {
    var recipientsController = function ($scope, $http) {
        $scope.showRecipientLayout = false;

        var initialize = function () {
        }

        $scope.$on('recipients-display-updated', function(event, value) {
            $scope.showRecipientLayout = value;
        });

       initialize();
    };
    app.controller("recipientsController", ["$scope", "$http", recipientsController]);
}(angular.module("emlrApp")));