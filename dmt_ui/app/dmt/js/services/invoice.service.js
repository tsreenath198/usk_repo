/*(function () {*/
'use strict';

dmtApplication.factory("invoiceService", invoiceService);
function invoiceService($http, __env, $window) {
  var service = {
    getAllInVoices : getAllInVoices,
    getAllInvoiceType : getAllInvoiceType,
    create : create,
    update : update,
    deleteRow : deleteRow

  }, url = __env.baseUrl + __env.context
  return service;

  function getAllInVoices() {
    return $http.get(url + "/invoices/readAll");
  }
  function getAllInvoiceType() {
    return $http.get("./mock/invoiceType.json");
  }

  function create(jsonData) {
    return $http({
      url : url + '/invoices/create',
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
      url : url + '/invoices/update',
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
      url : url + '/invoices/delete?id=' + data,
      method : "POST"
    }).then(function(response) {
      // success
    }, function(response) { // optional
      // failed
    });
  }

}
/* }()); */