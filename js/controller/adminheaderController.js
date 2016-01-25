slrapp.controller("AdminheaderCtrl", function($scope, $document, $firebaseObject, $http, $localStorage,cssInjector, $location) {
		$scope.getUserName =  localStorage.getItem('token');
		
		$scope.logout = function(){
			localStorage.clear();
			$location.path("admin");
		}
		
		/** remove css according to the pages */
		cssInjector.remove("css/style.css");
		cssInjector.remove("css/admin/admin.css");
		
		/** add css according to the pages */
		cssInjector.add("css/admin/bootstrap.min.css");
		cssInjector.add("css/admin/font-awesome.min.css");
		cssInjector.add("css/admin/smartadmin-production-plugins.min.css");
		cssInjector.add("css/admin/smartadmin-production.min.css");
		cssInjector.add("css/admin/smartadmin-skins.min.css");
		
});	