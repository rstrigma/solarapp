slrapp.controller("DashboardCtrl", function($scope, $document, $firebaseObject, $http, $localStorage,cssInjector, $location) {
		$scope.getUserName =  localStorage.getItem('token');
		
});	