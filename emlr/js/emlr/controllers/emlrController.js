(function (app) {
    var emlrController = function ($scope, $http, emlrService) {
        var i = 0;
        $scope.issueItems = null;
        $scope.SelectControlIdPrefix = "SelectCtrl";
        $scope.InputControlIdPrefix = "InputCtrl";

        var init = function () {
            i = i + 1;
            console.log("init is called " + i);
        };

        var initialize = function () {
            emlrService.init(() => {
                $scope.issues = {
                    "props" : emlrService.getIssues()
                };                
                $scope.channels = {
                    "props" : emlrService.getChannels()
                };
                $scope.actions = {
                    "props" : emlrService.getAction()
                };

                initializeItems();
            }); 
        }

        function initializeItems(){
            $scope.issues["selected"] = getDefaultOptions($scope.issues["props"], emlrService.getIssueOptions);
            $scope.channels["selected"] = getDefaultOptions($scope.channels["props"], emlrService.getChannelOptions);
            $scope.actions["selected"] = getSimpleDefaultOptions($scope.actions["props"], emlrService.getActionOptions);
        }

        function getDefaultOptions(props, optionsProvider){
            let filter = [];
            let options = {};
            for (let i = 0; i < props.length; i++){
                let filterItem = {
                        "name" : props[i],
                        "value" : "*"
                    };
                filter.push(filterItem);
                let result = optionsProvider(filter);
                options[props[i]] = (result[0]);
                filterItem.value = result[0];
            }

            return options;
        }

        function getSimpleDefaultOptions(props, optionsProvider){
            let options = {};
            for (let i = 0; i < props.length; i++){
                let result = optionsProvider(props[i]);
                options[props[i]] = (result[0]);
            }

            return options;
        }

        function resetOptions(propItems, prop, optionsProvider){
            let filter = [];
            let props = propItems.props;
            for (let i = 0, update = false; i < props.length; i++){
                let filterItem;
                if (update) {
                    filterItem = {
                        "name" : props[i],
                        "value" : "*"
                    };
                    filter.push(filterItem);
                    let result = optionsProvider(filter);
                    if (result != null && result.length > 0) {
                        propItems["selected"][props[i]] = (result[0]);
                        filterItem.value = result[0];    
                    }
                } else {
                    filterItem = {
                        "name" : props[i],
                        "value" : propItems["selected"][props[i]]
                    };
                    filter.push(filterItem);
                    if (props[i] == prop) {
                        update = true;
                    }    
                }
            }
        }

        function getOptions(propItems, prop, optionsProvider){
            let filter = [];
            let props = propItems.props;
            for (let i = 0; i < props.length; i++){
                if (props[i] == prop) {
                    filter.push({
                        "name" : props[i],
                        "value" : "*"
                    });
                    break;
                } else {
                    filter.push({
                        "name": props[i],
                        "value": propItems.selected[props[i]]
                    })        
                }
            }
            return optionsProvider(filter);
        }

        function resetInputControl(props, values){
            for (let i = 0; i < props.length; i++) {
                let element = document.getElementById($scope.InputControlIdPrefix + props[i]);
                element.value = values[props[i]];
            }
        }
        
        $scope.getIssueOptions = function(prop) {
            let props = getOptions($scope.issues, prop, emlrService.getIssueOptions);
            return props;
        }

        $scope.getChannelOptions = function(prop) {
            let props = getOptions($scope.channels, prop, emlrService.getChannelOptions);
            return props;
        }

        $scope.getActionOptions = function(prop) {
            let props = emlrService.getActionOptions(prop);
            return props;
        }

        $scope.issuesSelectionChanged = function(prop){
             resetOptions($scope.issues, prop, emlrService.getIssueOptions);
             resetInputControl($scope.issues.props, $scope.issues["selected"]);
             resetRecipients();
        }

        $scope.channelsSelectionChanged = function(prop){
            resetOptions($scope.channels, prop, emlrService.getChannelOptions);
            resetInputControl($scope.channels.props, $scope.channels["selected"]);
            resetRecipients();
        }

        $scope.actionsSelectionChanged = function(prop){
            resetInputControl($scope.actions.props, $scope.actions["selected"]);
        }

        function resetRecipients(){
            let recipients = getRecipients();

            let element = document.getElementById("email_recipients_text");
            element.value = recipients;
        }

        function getRecipients(){
            let props = ["Customer", "Channel"];
            let values = {};

            for (let i = 0; i < props.length; i++) {
                let element = document.getElementById($scope.InputControlIdPrefix + props[i]);
                values[props[i]] = element.value;
            }

            for (let i = 0; i < __recipients_props.props.length; i++){
                let matching = true;

                for (value in values){
                    if (__recipients_props.props[i][value].toLocaleLowerCase() != values[value].toLocaleLowerCase()){
                        matching = false;
                        break;
                    }
                }
                if (matching){
                    let element = document.getElementById($scope.InputControlIdPrefix + "Actor");
                    return __recipients_props.props[i][element.value];
                }
            }
            return null;
        }

       init();
       
       initialize();
    };
    app.controller("emlrController", ["$scope", "$http", "emlrService", emlrController]);
}(angular.module("emlrApp")));