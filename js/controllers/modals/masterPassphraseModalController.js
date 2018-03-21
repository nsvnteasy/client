require('angular');

angular.module('ebookcoinApp').controller('masterPassphraseModalController', ["$scope", "masterPassphraseModal", 'gettextCatalog', function ($scope, masterPassphraseModal, gettextCatalog) {

    $scope.masterPass = '';
    $scope.emptyPass = false;

    $scope.title = $scope.title || gettextCatalog.getString('Please enter master password.');
    $scope.label = $scope.label || gettextCatalog.getString('Master Passphrase');

    $scope.close = function (pass) {
        if ($scope.destroy) {
            $scope.destroy(pass);
        }
        masterPassphraseModal.deactivate();
    }
    $scope.passcheck = function (pass) {
        $scope.emptyPass = !pass;
        if (!$scope.emptyPass) {
            $scope.close(pass);
        }
    }

}]);
