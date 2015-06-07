(function () {

    var MainController = function ($scope) {
        
        //Order data by clicking colunm title
        $scope.sortBy = '';
        $scope.reverse = false;
        $scope.customers = [];

        $scope.doSort = function (propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };
        
        //Define array to receive final data
        $scope.coinsAmount = [];
        
        var coinage = {};
        $scope.error = "";
        coinage.coins = [
            {"val": 200, "symbol": '£2'},
            {"val": 100, "symbol": '£1'},
            {"val": 50, "symbol": '50 pence'},
            {"val": 2, "symbol": '2 pence'},
            {"val": 1, "symbol": '1 pence'}
        ];
        
        coinage.inputValidation = function (value) {
            if (!value.match('^[0-9]+$')) {
                $scope.error = "Please, enter only numbers";
                value = 0;
            } else {
                $scope.error = "";
                parseInt(value, 10);
            }
        }
        
        //Calculate the minimum number of coins needed 
        coinage.coinCalc = function () {
            
            var amount = document.getElementById('amount').value;
            coinage.inputValidation(amount);

            return coinage.coins.map(function (coin, i) {
                return [Math.floor(amount / coin.val), amount %= coin.val][0];
            });

        };
        
        //Return the result within an array object
        coinage.getResult = function () {

            var array = coinage.coinCalc();
            var result = [];
            
            angular.forEach(array, function(value, key) {
                this.push({coin: coinage.coins[key].symbol, amount: value});
            }, result);
            
            return result;
        };
        
        //Define an initial function
        $scope.init = function () {
            $scope.coinsAmount = coinage.getResult();
        }
        
    };
    
    //Inject $scope to controler
    MainController.$inject = ['$scope'];

    angular.module('appCoinage')
        .controller('MainController', MainController)
    
}());