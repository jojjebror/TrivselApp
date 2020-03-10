export const environment = {
  production: false,
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