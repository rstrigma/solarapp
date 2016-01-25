
//slrapp.controller("FaqsCtrl", function($scope, $document, $firebaseObject, $http, $localStorage,cssInjector, $location, $sce, HomeService) {

slrapp.controller('FaqsCtrl', ["$scope","$location", "$firebaseArray","FaqService", "$http", "$document","cssInjector", function HomeCtrl($scope, $location, $firebaseArray,FaqService, $http,$document,cssInjector) {
	
	/***********add and remove css according to the pages ***********/
		cssInjector.add("css/style.css");  
		cssInjector.remove("css/admin/admin.css"); 
		
	$scope.getUserName =  localStorage.getItem('token');
	
	/***********************Getting the data from the page like home, about us etc ************************************/
		
		$scope.modalShown = false;
		$scope.myaccount = function() {
			$scope.modalShown = !$scope.modalShown;
		};
		
		$scope.signupFrom = false;
		$scope.userSignup = function(formcustomdata) {
			var getEmail = formcustomdata.email.$viewValue;
			$scope.modalShown = false;
			$scope.signupFrom = !$scope.signupFrom;
		}; 
		
		/************************ Submit the contact form here ***********************************/
	
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
				//$scope.email = "";
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
	
	$scope.faqs = FaqService.getFaqs(); 
	$scope.deleteFaq = function (faq) {
		if (confirm("Do you want to remove user?")) {
			FaqService.removeFaq(faq);		
		}
	};

	$scope.addFaq = function () {
			$location.path('/admin/faqs/add');
	};
	
	$scope.addfaqdata = function (faqdata) {
			$scope.faqs = FaqService.addFaqData(faqdata); 
			$location.path('/admin/faqs');
	};

	
	/*  Redirect for edit partner*/
	$scope.editFaq = function (partner_id) {
		$location.path('/admin/faqs/edit/'+partner_id);
	};
	
	$scope.doneEditing = function (project) {
		$scope.editedProject = null;
		var title = project.title.trim();
		if (title) {
			HomeService.saveToDo(project);
		} else {
			HomeService.removeToDo(project);
		}
	};

	/*$scope.editProject = function (project) {
		$scope.editedProject = project;
		$scope.originalProject = angular.extend({}, $scope.editedProject);
	};

	$scope.doneEditing = function (project) {
		$scope.editedProject = null;
		var title = project.title.trim();
		if (title) {
			HomeService.saveToDo(project);
		} else {
			HomeService.removeToDo(project);
		}
	};

	$scope.revertEditing = function (project) {
		project.title = $scope.originalProject.title;
		$scope.doneEditing(project);
	};

	$scope.removeProject = function (project) {
		HomeService.removeToDo(project);		
	};

	$scope.clearCompletedProjects = function () {
		HomeService.removeAllCompleted();
	};

	$scope.markAll = function (allCompleted) {
		 HomeService.markAll(allCompleted);
	};

	if ($location.path() === '') {
		$location.path('/');
	}
	$scope.location = $location; */
		
}]);	


/*
* Creating Editing controller
* View  the contacts
*/
slrapp.controller("FaqsEditCtrl", function($scope, $routeParams, $firebaseObject,$localStorage,Upload) {
		console.log(appUrl+'faqs/'+$routeParams.faqid);
		$scope.getUserName =  localStorage.getItem('token');
		var getRef = new Firebase(appUrl+'faqs/'+$routeParams.faqid);
		$scope.getFaq = $firebaseObject(getRef);    
		
		/* Save partner Partner */
	$scope.addfaqdata = function(formData) {
		console.log(formData);
		var question = $scope.getFaq.question;
		var answer = $scope.getFaq.answer;
		var refUrlObject = new Firebase(appUrl+'faqs/'+$routeParams.partnerid);
		refUrlObject.update({  question: question, answer: answer});
		window.location = '#/admin/faqs';
	}
		
});