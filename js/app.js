/* 	Declaration of angular main backbone file
/* 	Created Date : 16-12-2015
/* 	Created By : T:307
/*	Configure the route for different pages and links */


/***************** Admin pages Routing  *****************/



slrapp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'homeCtrl'
		})
		.when('/solar-revolution', {
			templateUrl : 'pages/solar-revolution.html',
			controller  : 'getrewardCtrl'
		})
		.when('/faq', {
			templateUrl : 'pages/faq.html',
			controller  : 'FaqsCtrl'
		})
		.when('/get-reward', {
			templateUrl : 'pages/get-reward.html',
			controller  : 'getrewardCtrl'
		})
		.when('/signup', {
			resolve:{
				"check":  function($location){
					var result = window.localStorage.getItem("token");
					if (result){
						$location.path('/admin/dashboard');
					}
				}
			},
			templateUrl : 'pages/signup.html',
			controller  : 'SignupCtrl'
		})
		.when('/ajax', {
				templateUrl : 'pages/ajax.php',
				controller  : 'PartnersCtrl'
		})
		
		/***************** Admin pages Routing  *****************/
		.when('/admin', {
			resolve:{
				"check":  function($location){
					var result = window.localStorage.getItem("token");
					if (result){
						$location.path('/admin/dashboard');
					}
				}
			},
			templateUrl : 'pages/login.html',
			controller  : 'AuthCtrl'
		})
		.when('/admin/dashboard', {
			resolve:{
				"check":  function($location){
					var result = window.localStorage.getItem("token");
					if (!result){
						$location.path('admin');
					}
				}
			},
			templateUrl : 'admin/dashboard.html',
			controller  : 'DashboardCtrl'
		})
		.when('/admin/pages', {
			resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
			templateUrl : 'admin/pages.html',
			controller  : 'PagesCtrl'
		})
		.when('/admin/pages/edit/:pageid', {
				resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
				templateUrl : 'admin/editpage.html',
				controller  : 'PageviewCtrl'
		})
		.when('/admin/faqs', {
			resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
			templateUrl : 'admin/faq.html',
			controller  : 'FaqsCtrl'
		})
		.when('/admin/faqs/add', {
				resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
				templateUrl : 'admin/addfaq.html',
				controller  : 'FaqsCtrl'
		})
		.when('/admin/faqs/edit/:faqid', {
				resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
				templateUrl : 'admin/editfaq.html',
				controller  : 'FaqsCtrl'
		})
		.when('/admin/partners', {
			resolve:{
				"check":  function($location){
					var result = window.localStorage.getItem("token");
					if (!result){
						$location.path('admin');
					}
				}
			},
			templateUrl : 'admin/partner.html',
			controller  : 'PartnersCtrl'
		})
		.when('/admin/partners/add', {
				resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
				templateUrl : 'admin/addpartner.html',
				controller  : 'PartnersCtrl'
		})
		.when('/admin/partners/edit/:partnerid', {
				resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
				templateUrl : 'admin/editpartner.html',
				controller  : 'PartnersCtrl'
		})
		.when('/admin/contacts', {
				resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
				templateUrl : 'admin/contacts.html',
				controller  : 'ContactsCtrl'
		})
		.when('/admin/contacts/view/:contactid', {
				resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
				templateUrl : 'admin/viewcontact.html',
				controller  : 'ContactviewCtrl'
		})
		.when('/admin/newsletters', {
				resolve:{
					"check":  function($location){
						var result = window.localStorage.getItem("token");
						if (!result){
							$location.path('admin');
						}
					}
				},
				templateUrl : 'admin/newsletter.html',
				controller  : 'NewsletterCtrl'
		});
});