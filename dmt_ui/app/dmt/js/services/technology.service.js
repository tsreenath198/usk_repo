/*(function () {*/
    'use strict';
    
    dmtApplication.factory("TechnologyService", TechnologyService);
    function TechnologyService($http,__env,$window) {
           var service = {
           getAllTechnologies: getAllTechnologies,
            
          };
       return service;
       function getAllTechnologies() {
                return $http({
                    method: 'GET', 
                    url: "http://localhost:8011/dmt_rest_service/technologies/readAll",
                    headers: {'Content-Type': 'application/json'}
       
});  
              }
      

		    
    }
/*}());*/