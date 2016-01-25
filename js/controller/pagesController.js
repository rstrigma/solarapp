
slrapp.controller("PagesCtrl", function($scope, $document, $firebaseObject, $http, $localStorage,cssInjector, $location, $sce) {
		$scope.getUserName =  localStorage.getItem('token');
		
		/* slrapp.filter('unsafe', function($sce) {
			return function(val) {
			return $sce.trustAsHtml(val);
			};
		}); */
		
		//$scope.html = '<ul><li>render me please</li></ul>';
		//$scope.trustedHtml = $sce.trustAsHtml($scope.html);
		
		
		var pagesRef = new Firebase(pagesRefUrl);
		var pages = $firebaseObject(pagesRef);
	
		if($firebaseObject(pagesRef)){
			$scope.pagesArray = $firebaseObject(pagesRef);
		}
		 
		
		$scope.editPage = function(key){
			window.location.href = '#/admin/pages/edit/'+key;
		}
		
		
		$scope.deletePage = function(key) {
			if (confirm("Do you want to remove user?")) {
					var fredRef = new Firebase(pagesRefUrl+key);
					fredRef.remove();
			}
		};
		
		
});	

 
/* View and edit the page*/
slrapp.controller("PageviewCtrl", function($scope, $routeParams, $firebaseObject) {
	var getRef = new Firebase(pagesRefUrl+$routeParams.pageid);
	$scope.pageArray = $firebaseObject(getRef);
	var ref = new Firebase(appUrl);
	$scope.updateform = function(pageArray) {
		page_id = pageArray.$id;
		title = pageArray.title;
		content = pageArray.content;
		var refUrlObject = new Firebase(pagesRefUrl+page_id);
		refUrlObject.update({  title: title, content: content});
		window.location = '#/admin/pages';
	};
});
