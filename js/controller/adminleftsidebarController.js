slrapp.controller("AdminleftsidebarCtrl", function($scope, $document, $firebaseObject, $http, $localStorage,cssInjector, $location) {
	$scope.getUserName =  localStorage.getItem('token');
	
		$scope.dashboard = function(){
			window.location.href='#/admin/dashboard';
		}
		
		$scope.pages = function(){
			window.location.href='#/admin/pages';
		}
		
		$scope.contacts = function(){
			window.location.href='#/admin/contacts';
		}
		
		$scope.newsletters = function(){
			window.location.href='#/admin/newsletters';
		}
		
		$scope.faqs = function(){
			window.location.href='#/admin/faqs';
		}
		
		$scope.partner = function () {
			$location.path('/admin/partners');
		};
		
		
	 
});	