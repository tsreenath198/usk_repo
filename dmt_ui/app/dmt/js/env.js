(function (window) {
  window.__env = window.__env || {};
 
  // Base url
  window.__env.baseUrl = 'http://localhost:9090';
 
  // context will be prepended to policy2-admin relative paths
  window.__env.context = '/dmt_rest_service';
 
 // relative path to logout
  window.__env.logoutPath = '/logout';
 
  // relative path to session time check
  window.__env.sessionTimeCheck = '/api/session/timecheck';
 
  // relative path to session keep alive
  window.__env.sessionKeepAlive = '/api/session/keepalive';
 
  // relative path to session keep alive
  window.__env.sessionTimedOut = '/sessionTimedOut';
 
  // Time in milliseconds before the session expires to open the dialog
  window.__env.sessionWarnBefore = 60000;
 
 
  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));

