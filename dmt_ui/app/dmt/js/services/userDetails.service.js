/*(function () {*/
    'use strict';
    
    dmtApplication.factory("UserDetailsService", UserDetailsService);
    function UserDetailsService($http,__env,$window) {
           var service = {
           getAllUsers: getAllUsers
            
          };
       return service;
       function getAllUsers() {
                return $http({
                    method: 'GET', 
                    url: "http://localhost:8011/dmt_rest_service/userDetails/readAll",
                    headers: {'Content-Type': 'application/json'}
       
});  
              }
      

        
    }
/*}());*/