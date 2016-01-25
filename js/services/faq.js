/*global psApp, angular, Firebase */
'use strict';

slrapp.factory('FaqService', ['$firebaseArray',FaqService]);

function FaqService($firebaseArray) {
		
	 	var ref = new Firebase(appUrl);		
	 	ref = ref.child("faqs");

	    var factory = {}; 
	    factory.faqs=null;
	    factory.getFaqs = function() 
	    { 
			if(!factory.faqs)		        
				factory.faqs = $firebaseArray(ref);   
				return factory.faqs;
	    };
		
		factory.removeFaq = function (faq) {
			factory.faqs.$remove(faq).then(function(ref) {
			}, function(error) {
				alert( error);
			});			
		};
		
		factory.addFaqData = function(faq) {		    	
		       
	        factory.faqs.$add(faq).then(function(ref) {
	        }, function(error) {
  		    alert( error);
		  });
	    };
	 
	   	    
	    /* factory.saveProject = function(project) {		   	
	       
	        factory.faqs.$save(project).then(function(ref) {
	        	alert('Successfuly Saved');
	        }, function(error) {
  		    alert( error);
		  });
	    }
	    
	    factory.markAll = function (allCompleted) {
	    	factory.faqs.forEach(function (project) {
				project.completed = allCompleted;
				factory.faqs.$save(project);
			});
		}
	    
	    factory.addProject = function(project) {		    	
		       
	        factory.faqs.$add(project).then(function(ref) {
	        	alert('Successfuly Added');
	        }, function(error) {
  		    alert( error);
		  });
	    }
	    
	    factory.removeProject = function (project) {
	    	 factory.faqs.$remove(project).then(function(ref) {
		        	alert('Successfuly removed');
		        }, function(error) {
	  		    alert( error);
			  });			
		}
	 
	    factory.removeAllCompleted = function () {
	    	factory.faqs.forEach(function (project) {
				if (project.completed) {
					factory.faqs.$remove(project);
				}
			});
		} */
	    return factory;
	}

