export const environment = {
  production: false,
/*   firebase:{
    apiKey: "AIzaSyBbU9k6qH2qpenm_zBRcDe8kWs4nR_5YRY",
    authDomain: "mobile-app-007.firebaseapp.com",
    databaseURL: "https://mobile-app-007.firebaseio.com",
    projectId: "mobile-app-007",
    storageBucket: "mobile-app-007.appspot.com",
    messagingSenderId: "184377155595",
    appId: "1:184377155595:web:574e93387435f5ebd5e70e",
    measurementId: "G-6P4M1GNZCE"
  }, */
  api: {
      url: 'http://localhost:61595'
  },
  auth: {
      authority: 'https://localhost:44316',
      clientId: 'exApp',
      redirectUrl: 'http://localhost:8080/authentication/redirect',
      logoutRedirectUrl: 'http://localhost:8080/authentication/logout/redirect',
      scope: 'openid exApi'
  }
};