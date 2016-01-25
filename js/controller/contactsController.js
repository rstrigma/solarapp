
slrapp.controller("ContactsCtrl", function($scope, $document, $firebaseObject, $http, $localStorage) {
		$scope.getUserName =  localStorage.getItem('token');
		
		var contactsRef = new Firebase(contactRefUrl);
		if($firebaseObject(contactsRef)){
			$scope.contactsArray = $firebaseObject(contactsRef);
		}
		
		$scope.viewContact = function(key) {
				window.location.href = '#/admin/contacts/view/'+key;
		};
		
		$scope.deleteContact = function(key) {
			if (confirm("Do you want to remove user?")) {
					var fredRef = new Firebase(contactRefUrl+key);
					fredRef.remove();
			}
		};

});	


/* View  the contacts*/
slrapp.controller("ContactviewCtrl", function($scope, $routeParams, $firebaseObject) {
	var getRef = new Firebase(contactRefUrl+$routeParams.contactid);
	$scope.contactArray = $firebaseObject(getRef);
});
