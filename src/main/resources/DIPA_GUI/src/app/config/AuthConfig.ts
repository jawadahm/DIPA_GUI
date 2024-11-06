import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  // Cognito Issuer URL
  issuer: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_g8f04t5gD',
  
  // Cognito App Client ID
  clientId: '3uli03omcj24k151a0nk7g0s88',

  // Redirect URL after login
  redirectUri: window.location.origin,

  // URL after logout
  postLogoutRedirectUri: window.location.origin,

  // Scopes for access token
  scope: 'openid phone email',

  // Enable PKCE (Proof Key for Code Exchange)
  responseType: 'code',

  // Required to use PKCE with Cognito
  disableAtHashCheck: true,

  // Disable strict validation
  strictDiscoveryDocumentValidation: false,
  
  // Silent refresh for token renewal (optional)
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html'
};
