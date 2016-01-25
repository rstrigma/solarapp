/* 	Declaration the controller for homepage 
/* 	Created Date : 18-12-2015
/* 	Created By : T:307
/*	Configure the dependencies and other properties*/

angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.signupForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
            })
        }
    }
})

slrapp.controller('getrewardCtrl', function($scope, $document, $routeParams, $firebaseObject, $http, promiseTracker, $location, cssInjector,$sce){
		
		/***********add and remove css according to the pages ***********/
		cssInjector.add("css/style.css");  
		cssInjector.remove("css/admin/admin.css"); 
		
		
		/***********************Getting the data from the page like home, about us etc ************************************/
		
		$scope.modalShown = false;
		$scope.myaccount = function() {
			$scope.modalShown = !$scope.modalShown;
		};
		
		$scope.signupFrom = false;
		$scope.progress = promiseTracker();
		$scope.userSignup = function(formcustomdata) {
			var getEmail = formcustomdata.email.$viewValue;
			$scope.modalShown = false;
			$scope.signupFrom = !$scope.signupFrom;
		}; 
		
		
		var production = angular.element(document.getElementById('production'));
		$document.scrollToElementAnimated(production);
		$scope.home = function(){$location.url('/');} 
		$scope.about = function(){ $location.url('/');}
		$scope.contact = function(){$location.url('/');}	
		
		
		/************************ Submit the contact form here ***********************************/
	
		$scope.progress = promiseTracker();
		$scope.submit = function(form) {
		
			/* var text = document.getElementById("emailvalue").value;
			console.log(text);
			document.getElementById("signupemailvalue").value = text; */
		
			var currentDate = new Date();
			var day = currentDate.getDate();
			var month = currentDate.getMonth() + 1;
			var year = currentDate.getFullYear();
			var current_date = year + "-" + month + "-" + day;
			
			$scope.submitted = true;
			if (form.$invalid) {
				return;
			} 
			else{
				$scope.signupFrom = false;
				$scope.signupFrom = !$scope.signupFrom;
			}
			
		};
		
		$scope.signup = function(formdata){

					var email = formdata.email.$viewValue;
					var firstname = formdata.firstname.$viewValue;
					var lastname = formdata.lastname.$viewValue;
					var password = formdata.password.$viewValue;
					
					console.log(email);
					console.log(firstname);
					console.log(lastname);
					console.log(password);

					var ref = new Firebase(appUrl);
					var newslettersRef = ref.child('users'); 
					var newPostRef = newslettersRef.push();
					
					newPostRef.set({
						email: email,
						firstname: firstname,
						lastname: lastname,
						password: password
					}); 
					
					/******** Send ajax request for email ***************/
					var request = $http({
							method: "post",
							url: "email/send.php",
							data: {email: email, action: 'newsLetter'},
							headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
						});
						request.success(function( html ) {
								$scope.cfdump = html;
						});
					window.location.href="#/"
					//document.getElementById("signupForm").reset();
					//$scope.signupFrom = false;	
		}
		
		/*************** Scrolling animation *********************/
		$scope.home = function() {
			window.location.href='#/';
		}	
		$scope.production = function() {
			window.location.href='#/';
		}	
		$scope.about = function() {
			window.location.href='#/';
		}	
		$scope.partner = function() {
			window.location.href='#/';
		}	
		/*************** Scrolling animation *********************/
		
});
slrapp.value('duScrollOffset', 30);
