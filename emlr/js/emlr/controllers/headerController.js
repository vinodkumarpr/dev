(function (app) {
    var headerController = function ($scope, $rootScope, $http) {
        var selectedLinkClass = "list-group-item active waves-effect";
        var normalLinkClass = "list-group-item waves-effect";

        $scope.header = {
            "items" :
            [
              {
                "class" : "nav-item",
                "title" : "emlr",
                "linkClass" : "list-group-item active waves-effect",
                "iconClass" : "fa fa-pie-chart mr-3",
                "broadcastMsg" : "mainlayout-display-updated"
                },
                {
                "class" : "nav-item",
                "title" : "Recipients",
                "linkClass" : "list-group-item waves-effect",
                "iconClass" : "fa fa-user mr-3",
                "broadcastMsg" : "recipients-display-updated"
                },
                {
                "class" : "nav-item",
                "title" : "Channels",
                "linkClass" : "list-group-item waves-effect",
                "iconClass" : "fa fa-tv mr-3"
                },
                {
                "class" : "nav-item",
                "title" : "Issues",
                "linkClass" : "list-group-item waves-effect",
                "iconClass" : "fa fa-cog mr-3"
                }
            ]
        }

        var initialize = function () {
        }

        $scope.headerSelected = function(index){
            for (let i = 0; i < $scope.header.items.length; i++) {
                if (i == index) {
                    $scope.header.items[i].linkClass = selectedLinkClass;                    
                    $rootScope.$broadcast($scope.header.items[i].broadcastMsg, true);
                } else if ($scope.header.items[i].linkClass == selectedLinkClass){
                    $scope.header.items[i].linkClass = normalLinkClass;
                    $rootScope.$broadcast($scope.header.items[i].broadcastMsg, false);
                }
            }

        }

       initialize();
    };
    app.controller("headerController", ["$scope", "$rootScope", "$http", headerController]);
}(angular.module("emlrApp")));