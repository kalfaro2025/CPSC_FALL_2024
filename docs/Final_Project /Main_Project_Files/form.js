angular.module('myFormApp').factory('formDataService', function() {
    var formData = {};
    return {
      getFormData: function() {
        return formData;
      },
      setFormData: function(data) {
        formData = data;
      }
    };
  });

  angular.module('myFormApp').config(function($routeProvider) {
    $routeProvider.when('/formresults', {
      templateUrl: 'formresults.html',
      controller: 'formResultsController'
    });
  });