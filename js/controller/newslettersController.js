
slrapp.controller("NewsletterCtrl", function($scope, $document, $firebaseObject, $http, $localStorage) {
		$scope.getUserName =  localStorage.getItem('token');
		
		var newslettersRef = new Firebase(newslettersRefUrl);
		if($firebaseObject(newslettersRef)){
			$scope.newsletterArray = $firebaseObject(newslettersRef);
		}
		
		$scope.viewNewsletter = function(key) {
				window.location.href = '#/admin/newsletters/view/'+key;
		};
		
		$scope.deleteNewsletter = function(key) {
			if (confirm("Do you want to remove newsletter?")) {
					var fredRef = new Firebase(newslettersRefUrl+key);
					fredRef.remove();
			}
		};

});	


/* View  the contacts*/
slrapp.controller("NewsletterviewCtrl", function($scope, $routeParams, $firebaseObject) {
	console.log(newslettersRef+$routeParams.newsletterid);
	var getRef = new Firebase(newslettersRef+$routeParams.newsletterid);
	$scope.newsletterArray = $firebaseObject(getRef);
});
