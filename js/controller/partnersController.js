
slrapp.controller('PartnersCtrl', ["$scope", "$document", "Upload", "$timeout", "$location", "$firebaseArray", "PartnerService", "$routeParams", "$localStorage", function HomeCtrl($scope, $document, Upload, $timeout, $location, $firebaseArray,PartnerService, $routeParams, $localStorage) {
	
	$scope.getUserName =  localStorage.getItem('token');
	
	/* Get All Partner*/
	$scope.partners = PartnerService.getPartners(); 
	
	/* Delete particular Partner*/
	$scope.deletePartner = function (partner) {
			if (confirm("Do you want to remove user?")) {
				PartnerService.removePartner(partner);		
			}
	};
	
	

	/*  Redirect for adding partner*/
	$scope.addPartner = function () {
			$location.path('/admin/partners/add');
	};
	
	/* Save partner Partner */
	$scope.AddPartner = function(file,formData) {
		file.upload = Upload.upload({
		  url: 'http/request.php',
		  data: {file: file, username: $scope.username,rootDirectory: rootDirectory},
		});

		file.upload.then(function (response) {
			if(response.statusText=='OK'){
				var fileName = response.data.uploaded_file;
				var link = formData.link;
				var tooltip = formData.tooltip;
				var date = year+'-'+month+'-'+day;
				
				var ref = new Firebase(appUrl);
				var partnersRef = ref.child('partners'); 
				var partnerArr = partnersRef.push();
				
				partnerArr.set({
					link: link,
					tooltip: tooltip,
					fileName: fileName,
					date: date
				}); 
				window.location = '#/admin/partners';
			}
		}, 
		function (response) {
			if (response.status > 0)
				console.log(response);
				$scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
	}
	
	/*  Redirect for edit partner*/
	$scope.editPartner = function (partner_id) {
			$location.path('/admin/partners/edit/'+partner_id);
	};
	
}]);	

/*
* Creating Editing controller
* View  the contacts
*/
slrapp.controller("PartnersEditCtrl", function($scope, $routeParams, $firebaseObject,$localStorage,Upload) {

	$scope.getUserName =  localStorage.getItem('token');
	
	var getRef = new Firebase(appUrl+'partners/'+$routeParams.partnerid);
	$scope.getPartner = $firebaseObject(getRef);
	
	/* Save partner Partner */
	$scope.updatePartner = function(file,formData) {
		console.log(formData);
		file.upload = Upload.upload({
		  url: 'http/request.php',
		  data: {file: file, username: $scope.username,rootDirectory: rootDirectory},
		});
		
		file.upload.then(function (response) {
			if(response.statusText=='OK'){
				var fileName = response.data.uploaded_file;
				var link = $scope.getPartner.link;
				var tooltip = $scope.getPartner.tooltip;
				var refUrlObject = new Firebase(appUrl+'partners/'+$routeParams.partnerid);
				refUrlObject.update({  link: link, tooltip: tooltip,fileName:fileName});
				window.location = '#/admin/pages';
				window.location = '#/admin/partners';
			}
		}, 
		function (response) {
			if (response.status > 0)
				console.log(response);
				$scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
				file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			});
	}
	
	
});