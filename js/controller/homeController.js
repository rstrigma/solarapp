/* 	Declaration the controller for homepage 
/* 	Created Date : 18-12-2015
/* 	Created By : T:307
/*	Configure the dependencies and other properties*/


slrapp.directive('modalDialog', function() {
  return {
			restrict: 'E',
			scope: {
				show: '='
			},
			replace: true, // Replace with the template below
			transclude: true, // we want to insert custom content inside the directive
			link: function(scope, element, attrs) {
				scope.dialogStyle = {};
				if (attrs.width)
				scope.dialogStyle.width = attrs.width;
				if (attrs.height)
				scope.dialogStyle.height = attrs.height;
				scope.hideModal = function() {
				scope.show = false;
				};
			},
			template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div>"
	};
});

slrapp.controller('homeCtrl', function($scope, $document, $firebaseObject, $http, promiseTracker, cssInjector,$sce, $location){
		
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
			//console.log(formcustomdata.email.$viewValue);
			$scope.modalShown = false;
			$scope.signupFrom = !$scope.signupFrom;
		}; 
		
		
		$scope.headerSignup = function(formdata){
				
				var email = formdata.email.$viewValue;
				var firstname = formdata.firstname.$viewValue;
				var lastname = formdata.lastname.$viewValue;
				var password = formdata.password.$viewValue;

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
				
				$scope.email = "";
				$scope.signupFrom = false;
		}
		
		
		$scope.getReward = function(){ 
			window.location.href='#/get-reward';
		}
		
		
		var homeRef = new Firebase(homePageUrl);
		var homeObj = $firebaseObject(homeRef);
		homeObj.$loaded().then(function(){
				$scope.homeTitle = $sce.trustAsHtml(homeObj.content);
		});
		
		var solarpowerRef = new Firebase(solarpowerPageUrl);
		var solarpowerObj = $firebaseObject(solarpowerRef);
		solarpowerObj.$loaded().then(function(){
				$scope.solarpowerObjTitle = $sce.trustAsHtml(solarpowerObj.content);
		});

		
		var aboutRef = new Firebase(aboutPageUrl);
		var aboutObj = $firebaseObject(aboutRef);
		aboutObj.$loaded().then(function(){
				$scope.aboutContent = $sce.trustAsHtml(aboutObj.content);
				$scope.aboutTitle = $sce.trustAsHtml(aboutObj.title);
		});
		
		/* Partner Content */
		var ref = new Firebase(appUrl);		
	 	ref = ref.child("partners");
		$scope.getPartner = $firebaseObject(ref);   
		
		/************************ Submit the contact form here ***********************************/
	
		$scope.progress = promiseTracker();
		$scope.submit = function(form) {
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
						data: {name: $scope.name,email: $scope.email,subject: $scope.subject,message: $scope.message,action: 'contact'},
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					});
					request.success(function( html ) {
							$scope.cfdump = html;
					}); 
				
				/******** Set the field blank after submitting the data ***************/ 
				document.getElementById("contactForm").reset();
				//$scope.name = ' '; $scope.email = ' '; $scope.subject = ' '; $scope.message = ' ';
			}
		};
		
		
		/*************** Signup Function *********************/
		$scope.signup = function(signupForm) {
			
			$scope.submitted = true;
			if(signupForm.useremail.$viewValue!='' || signupForm.userpassword.$viewValue!=''){
			
				if(signupForm.userpassword.$viewValue!=signupForm.usercpassword.$viewValue){
					alert("Username or password is wrong");
				} 
				else{
						var ref = new Firebase(appUrl);
						var postsRef = ref.child('users');
						var newPostRef = postsRef.push();
						newPostRef.set({
							email: signupForm.useremail.$viewValue,
							password: signupForm.userpassword.$viewValue
							
						}); 
						window.location.href='http://52.27.201.224/html';
						/******** Set the field blank after submitting the data ***************/ 
				}
			}
			else{
				alert("please fill all the field");
			}
		}
		
		
		
		/*************** Scrolling animation *********************/
		var top = angular.element(document.getElementById('top'));
		$scope.home = function() {
			$document.scrollToElementAnimated(top);
		}
		
		var solar_production = angular.element(document.getElementById('solar-production'));
		$scope.production = function() {
			$document.scrollToElementAnimated(solar_production);
		}
		var solar_earth = angular.element(document.getElementById('solar-earth'));
		$scope.about = function() {
			$document.scrollToElementAnimated(solar_earth);
		}	
		
		var world_brands = angular.element(document.getElementById('world-brands'));
		$scope.partner = function() {
			$document.scrollToElementAnimated(world_brands);
		}
		
		var contact_form = angular.element(document.getElementById('contact-form'));
		$scope.contact = function() {
			$document.scrollToElementAnimated(contact_form);
		}
		var solar_production = angular.element(document.getElementById('solar-production'));
		$scope.backtotop = function() {
			$document.scrollToElementAnimated(solar_production);
		}
		/*************** Scrolling animation *********************/
});

slrapp.value('duScrollOffset', 30);