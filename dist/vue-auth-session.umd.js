(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global['vue-auth-session'] = global['vue-auth-session'] || {})));
}(this, (function (exports) { 'use strict';

  var TOKEN_NAMESPACE = 'vue-auth-token';
  var TOKEN_EXPIRES_NAMESPACE = 'vue-auth-token-expires';

  function plugin(Vue) {
    Vue.auth = {
      setToken: function setToken(token, expires_at) {
        localStorage.setItem(TOKEN_NAMESPACE, token);
        // console.log(expires_at)

        if(undefined === expires_at) {
          var date = new Date();
          date.setDate(date.getDate() + 5000 );
          localStorage.setItem(TOKEN_EXPIRES_NAMESPACE, date.getTime());
        } else {
          var date$1 = new Date(expires_at);
          localStorage.setItem(TOKEN_EXPIRES_NAMESPACE, date$1.getTime());
        }
      },

      getToken: function getToken() {
        var token = localStorage.getItem(TOKEN_NAMESPACE);
        var expires_at = localStorage.getItem(TOKEN_EXPIRES_NAMESPACE);

        if (!expires_at || Date.now() > parseInt(expires_at)) {
          this.destroyToken();
          return null
        }

        return token
      },

      destroyToken: function destroyToken() {
        localStorage.removeItem(TOKEN_NAMESPACE);
        localStorage.removeItem(TOKEN_EXPIRES_NAMESPACE);
      },

      isAuthenticated: function isAuthenticated() {
        if(this.getToken()) {
          return true
        }

        return false
      },
    };

    Object.defineProperties(Vue.prototype, {
      $auth: {
        get: function get() {
          return Vue.auth
        }
      }
    });
  }

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }

  exports.TOKEN_NAMESPACE = TOKEN_NAMESPACE;
  exports.TOKEN_EXPIRES_NAMESPACE = TOKEN_EXPIRES_NAMESPACE;
  exports.default = plugin;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
