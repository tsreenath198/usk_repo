/*(function () {*/
'use strict';

dmtApplication.factory("userRoleService", userRoleService);
function userRoleService($http, __env, $window) {
  var service = {
    getAllUserRoles : getAllUserRoles,
    create : create,
    update : update,
    deleteRow : deleteRow
  }, url = __env.baseUrl + __env.context
  return service;
  function getAllUserRoles() {
    return $http.get(url + "/userRoles/readAll");
  }

  function create(jsonData) {
    return $http({
      url : url + '/userRoles/create',
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
      url : url + '/userRoles/update',
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
      url : url + '/userRoles/delete?id=' + data,
      method : "POST"
    }).then(function(response) {
      // success
    }, function(response) { // optional
      // failed
    });
  }

}
/* }()); */