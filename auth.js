// auth.js — session helper (non-module, loaded via plain <script src="auth.js">)
// Wraps sessionStorage for pages that don't use Firebase Auth directly.
// Once Firebase Auth is fully wired, this file can be simplified to just
// re-export the onAuthStateChanged listener.
 
(function () {
  var KEY = 'issAuth';
 
  function parse() {
    try { return JSON.parse(sessionStorage.getItem(KEY)); }
    catch (e) { return null; }
  }
 
  window.issAuth = {
    key: KEY,
    get: parse,
    set: function (role, email, uid) {
      sessionStorage.setItem(KEY, JSON.stringify({ role: role, email: email, uid: uid || '', at: Date.now() }));
    },
    clear: function () { sessionStorage.removeItem(KEY); },
    requireRole: function (role) {
      var s = parse();
      if (!s || s.role !== role) {
        var page = location.pathname.split('/').pop() || 'index.html';
        location.href = 'login.html?next=' + encodeURIComponent(page);
        return false;
      }
      return true;
    }
  };
})();