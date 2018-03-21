require('angular');

angular.module('ebookcoinApp').controller('secondPassphraseModalController', ["$scope", "secondPassphraseModal", "$http", "userService", function ($scope, secondPassphraseModal, $http, userService) {

    $scope.rememberedPassphrase = userService.rememberPassphrase ? userService.rememberedPassphrase : false;
    $scope.passmode = false;
    $scope.focus = 'secondPass';
    $scope.fee = 0;

    $scope.getFee = function () {
        $http.get("/api/signatures/fee").then(function (resp) {
            if (resp.data.success) {
                $scope.fee = resp.data.fee;
            } else {
                $scope.fee = 0;
            }
        });
    }

    $scope.getFee();

    $scope.close = function () {
        if ($scope.destroy) {
            $scope.destroy();
        }
        secondPassphraseModal.deactivate();
    }

    $scope.passcheck = function () {
        if ($scope.rememberedPassphrase) {
            $scope.addNewPassphrase($scope.rememberedPassphrase);
        } else {
            $scope.passmode = !$scope.passmode;
            if ($scope.passmode) {
                $scope.focus = 'pass';
            } else {
                $scope.focus = 'secondPass';
            }
            $scope.pass = '';
        }
    }

    $scope.addNewPassphrase = function (pass) {
        $scope.fromServer = '';
        if ($scope.repeatSecretPhrase != $scope.newSecretPhrase) {
            $scope.fromServer = 'Passphrase and Confirm Passphrase don\'t match';
            return;
        }
        if ((($scope.repeatSecretPhrase ? $scope.repeatSecretPhrase.trim() : '') == '') || (($scope.newSecretPhrase ? $scope.newSecretPhrase.trim() : '') == '')) {
            $scope.fromServer = 'Missing Passphrase or Confirm Passphrase';
            return;
        }
        $http.put("/api/signatures", {
            secret: pass,
            secondSecret: $scope.newSecretPhrase,
            publicKey: userService.publicKey
        }).then(function (resp) {
            if (resp.data.error) {
                $scope.fromServer = resp.data.error;
            } else {
                if ($scope.destroy) {
                    $scope.destroy(true);
                }

                secondPassphraseModal.deactivate();
            }
        });
    }

}]);
