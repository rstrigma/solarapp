	slrapp.controller("SignupCtrl", function($scope, $document, $firebaseObject, $http, promiseTracker, $location, $rootScope, $localStorage,$sessionStorage, cssInjector) {
		
		
		/** add and remove css according to the pages */
		cssInjector.remove("css/style.css");
		cssInjector.add("css/admin/admin.css");
		
		$scope.progress = promiseTracker();
		$scope.signup = function(form) {
			console.log(form); 
			$scope.submitted = true;
			if (form.$invalid) {
				return;
			} 
			else{
				var ref = new Firebase(appUrl);
				var postsRef = ref.child('contacts');
				var newPostRef = postsRef.push();
				newPostRef.set({ 
					name: $scope.name,
					email: $scope.email, 
					subject: $scope.subject, 
					message: $scope.message
				}); 
				
				/******** Send ajax request for email ***************/
				var request = $http({
						method: "post",
						url: "email/send.php",
						data: {name: $scope.name,email: $scope.email,subject: $scope.subject,message: $scope.message},
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					});
					request.success(function( html ) {
							$scope.cfdump = html;
					}); 
				
				/******** Set the field blank after submitting the data ***************/
				$scope.name = ' '; $scope.email = ' '; $scope.subject = ' '; $scope.message = ' ';
			}
		};
		
	
});