app.controller('mainController', function($scope) {
    $scope.liveData = [];
    $scope.testArray = [];
    $scope.testArrayData = [];
    $scope.isLabel = '';

    var ws = new WebSocket("ws://stocks.mnet.website", "myProtocol");

    // Event handler for the WebSocket connection opening
    ws.onopen = function(e) {
        console.log("Connection established");
    };

    // Event handler for receiving text messages
    ws.onmessage = function(e) {
        // live data with updated date
        $scope.liveData = JSON.parse((e.data));
        $scope.updatedDate = new Date();
        console.log("live data ", $scope.liveData);

        /** added code for different color on basis of data change
         * 
         * Data is changing very fast so not able to capture actual data so below code is not giving perfect output
         * 
         * below code till line number - 57
         * created array with unique ticker and if ticker is already present I am updating price
         * if price is less or greater then adding color on that
         */

        $scope.testArray = [];
        angular.forEach($scope.liveData, function(data) {
            $scope.keyValue = {
                'ticker': data[0],
                'price': data[1],
                'islabel': ''
            }

            // console.log('test array - ', $scope.testArray);
            if ($scope.testArray.length !== 0) {

                angular.forEach($scope.testArray, function(item) {
                    if (item.ticker === data[0]) {
                        if (item.price > data[1]) {
                            item.islabel = 'red';
                        } else if (item.price < data[1]) {
                            item.islabel = 'green';
                        } else if (item.price = data[1]) {
                            item.islabel = 'white';
                        }
                        item.price = data[1];
                        return true;
                    } else {
                        if ($scope.testArray.indexOf(item) === ($scope.testArray.length - 1)) {
                            $scope.testArray.push($scope.keyValue);
                        }
                    }
                });
            } else {
                $scope.testArray.push($scope.keyValue);
            }
        });

        $scope.$apply();
    };
});