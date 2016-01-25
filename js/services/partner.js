/*global psApp, angular, Firebase */
'use strict';

slrapp.factory('PartnerService', ['$firebaseArray',PartnerService]);

function PartnerService($firebaseArray) {
		
	 	var ref = new Firebase(appUrl);		
	 	ref = ref.child("partners");

	    var factory = {}; 
	    factory.faqs=null;
	    factory.getPartners = function() 
	    { 
			if(!factory.partners)		        
				factory.partners = $firebaseArray(ref);   
				return factory.partners;
	    };
		
		factory.removePartner = function (partner) {
			factory.partners.$remove(partner).then(function(ref) {
			}, function(error) {
				alert( error);
			});			
		};
		
		factory.addPartnerData = function(partner) {		    	
		       
	        factory.partners.$add(partner).then(function(ref) {
	        }, function(error) {
  		    alert( error);
		  });
	    };
	    return factory;
	}

