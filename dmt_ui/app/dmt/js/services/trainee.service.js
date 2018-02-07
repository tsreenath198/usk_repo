'use strict';
    
    dmtApplication.factory("TraineeService", TraineeService);
    function TraineeService($http,__env,$window) {
           

		var service = {
		       getAllTrainees: getAllTrainees,
		       getAllClients:getAllClients,
		       getAllTimezones:getAllTimezones,
		       getAllBatchs:getAllBatchs,
		       getAllPaidStatus:getAllPaidStatus,
		       getAllReceivedStatus:getAllReceivedStatus,
		       getAllStatus:getAllStatus,
		       getAllTechnologies:getAllTechnologies,
		       create:create,
		       update:update,
		       deleteRow:deleteRow
            
          },url = __env.baseUrl + __env.context
    	 return service;
    	 function getAllTrainees(){
    			return $http.get(url + "/trainees/readAll");
    		}
    	 
    	 function getAllClients(){
 			return $http.get(url + "/clients/readAll");
 		}
    	 function getAllTimezones(){
 			return $http.get("./mock/timeZones.json");
 		}
    	 function getAllBatchs(){
  			return $http.get(url + "/batches/readAll");
  		}
    	 function getAllPaidStatus(){
  			return $http.get("./mock/paidStatusConstants.json");
  		}
    	 function getAllReceivedStatus(){
  			return $http.get("./mock/receivedStatusConstants.json");
  		}
    	 function getAllStatus(){
  			return $http.get("./mock/feeStatus.json");
  		}
    	 function getAllTechnologies(){
   			return $http.get(url + "/technology/readAll");
   		}

    	 function create(jsonData) {
				return $http({
					url : url + '/trainees/create',
					method : "POST",
					data : jsonData
				}).then(function(response) {
					// success
				}, function(response) { // optional
					// failed
				});
			}
    	 
    	 function update(jsonData) {
				return $http({
					url : url + '/trainees/update',
					method : "POST",
					data : jsonData
				}).then(function(response) {
					// success
				}, function(response) { // optional
					// failed
				});
			}
    	 
    	 function deleteRow(data) {
    			return $http({
    				url : url + '/trainees/delete?id='+data,
    				method : "POST"
    			}).then(function(response) {
    				// success
    			}, function(response) { // optional
    				// failed
    			});
    		}
            }
    