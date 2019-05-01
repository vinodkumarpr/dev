(function (app) {
    var recipientsController = function ($scope, $http, recipientService) {
        $scope.showRecipientLayout = false;
        $scope.table_list = {};
        $scope.editing = false;

        var initialize = function () {
            recipientService.init(() => {
                loadRecipients()
            });

            var file_input = document.getElementById('file_input');
            file_input.addEventListener("change", function () {
                $scope.loadCSV();
              });
        }

        function loadRecipients(){
            let list = recipientService.getRecipients();
            $scope.table_list["columns"] = list.columns.slice(2);
            $scope.table_list["rows"] = list.rows.map((row) => {
                return {
                    "channel" : row.slice(0, 2),
                    "recipients" : row.slice(2)
                }
            });
            $scope.editing = false;
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
                            "recipients" : row.slice(2),
                            "status" : row["status"]
                        }
                    });    
                    $scope.editing = true;
                    document.getElementById("file_input").value = null;
                })
            });
        }

        $scope.cancel = function (){
            loadRecipients();
        }

        function updateRecipients(){
            for (let i = 0; i < $scope.table_list.rows.length; i++){
                for (let j = 0; j < $scope.table_list.rows[i].recipients.length; j++){
                    var input = document.getElementById('input_' + i + "_" + j);
                    if ($scope.table_list.rows[i].recipients[j] != input.value) {
                        $scope.table_list.rows[i].status = "MODIFIED";
                        $scope.table_list.rows[i].recipients[j] = input.value;
                    }
                }
            }
        }

        $scope.update = function () {
            updateRecipients();

            let rows = $scope.table_list.rows.map((row) => {
                return row.channel.concat(row.recipients);
                });
            let list = {
                "rows" : rows
            };

            let updatedList = recipientService.getUpdatedList(list);
        }

        onInput = function(id){
            console.log(id);
            splits = id.split('_');
            var input = document.getElementById(id);
            $scope.$apply(()=>{
                $scope.table_list.rows[parseInt(splits[1])].status = "MODIFIED";
                $scope.table_list.rows[parseInt(splits[1])].recipients[parseInt(splits[2])] = input.value;
            });
        }

       initialize();
    };
    app.controller("recipientsController", ["$scope", "$http", "recipientService", recipientsController]);
}(angular.module("emlrApp")));