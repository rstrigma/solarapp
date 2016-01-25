	slrapp.controller("AuthCtrl", function($scope, $document, $firebaseObject, $http, promiseTracker, $location, $rootScope, $localStorage,$sessionStorage, cssInjector) {
		
		
		/** add and remove css according to the pages */
		cssInjector.remove("css/style.css");
		cssInjector.add("css/admin/admin.css");
		
		$scope.progress = promiseTracker();
		$scope.login = function(formData) {
			/** validate the form field */
			$scope.submitted = true;
			if (formData.$invalid) {
				return;
			} 
			else{
			 
				/* Get username and password from firebase and compare the form password
				/* If matched, we are login	
				/* generate local storage session token
				*/
				var getUserRef = new Firebase(userRefUrl);
				var getUser = getUserRef.child('user');
				getUser.on("value", function (userArr) {
						var userObj = userArr.val();
						if($scope.username==userObj.username && $scope.password==userObj.password){
							localStorage.setItem("token", $scope.username);
							window.location.href = '#/admin/dashboard'; 
						}
						else{
							alert('wrong username or password');
						}
				});
			
			}
		
		}
});