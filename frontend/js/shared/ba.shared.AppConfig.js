/*
ba.shared.appConfig.js
Constant config values used by BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.shared').constant('appConfig', {

    BA_UNTAPPD_APP_SCHEME: 'untappd:///?beer=',
    BA_UNTAPPD_URL_SCHEME: 'http://untappd.com/beer/',
    BA_UNTAPPD_CLIENTID: 'B2DA1064B03A353A75E9B035879ECA2CA3E9C3E6',
    BA_UNTAPPD_LOGIN_URL: 'https://untappd.com/oauth/authenticate/?client_id={0}&response_type=code&redirect_url={1}',
    BA_UNTAPPD_CALLBACK_URL: 'http://mccrager.com/nodejs/beer/login',
    BA_LOGOUT_URL: '/nodejs/beer/logout'

  });

})();
