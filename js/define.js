/* 	Declaration of firebase and other definition
/* 	Created Date : 16-12-2015
/* 	Created By : T:307
*/

/* Define the url for firebase 
* Getting the data from firebase with ids and keys
*/

'use strict';


/* Define some static required url */
var appUrl = 'https://solarchange.firebaseio.com/';
var pagesRefUrl = 'https://solarchange.firebaseio.com/pages/';
var userRefUrl = 'https://solarchange.firebaseio.com/users/';
var newslettersRefUrl = 'https://solarchange.firebaseio.com/newsletters/';
var contactRefUrl = 'https://solarchange.firebaseio.com/contacts/';

var homePageUrl = 'https://solarchange.firebaseio.com/pages/home/';
var solarpowerPageUrl = 'https://solarchange.firebaseio.com/pages/solarpower/';
var aboutPageUrl = 'https://solarchange.firebaseio.com/pages/about/';

/* Define root and directory */
var root = document.location.hostname;
var homeUrl = root+'/html';
var rootDirectory = 'html';

/* Define Date */
var d = new Date();
var month = '' + (d.getMonth() + 1);
var day = '' + d.getDate();
var year = d.getFullYear();


/* create module and add required dependencies */

var slrapp = angular.module('solarApp', ['duScroll', 'firebase', 'ajoslin.promise-tracker', 'ngRoute', 'ngStorage', 'angular.css.injector', 'UserValidation', 'ngFileUpload']);
slrapp.filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        }
}]);