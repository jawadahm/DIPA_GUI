import { Injectable, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { PKCEService } from '../services/pkceservice.service'
import * as AWS from 'aws-sdk/global';
import * as Cognito from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userPoolId = 'eu-west-2_d8rM9YEHo'; // Your User Pool ID
    private region = "eu-west-2";
    private tenantId = 'ba2987fc-4226-4d46-87f1-f4c95bae0be2';
  private clientId = '2jpj40a051o5vqrflmapf0m89l'; // Your User Pool Client ID
  private clientSecret = 'aacjjr8bhuuum1mpg4udnv672ddqu72mdpn90dm0ff8v9qnteub';
  private cognito: CognitoIdentityServiceProvider;
    constructor(private oauthService: OAuthService, private pkceService: PKCEService, private router: Router, private http: HttpClient) {

        this.cognito = new CognitoIdentityServiceProvider({
            region: 'eu-west-2' // Replace with your region
          });

        AWS.config.region = 'eu-west-2';
        const codeVerifier = this.pkceService.retrieveCodeVerifier() as string;
        if (!codeVerifier) {
            const newCodeVerifier = this.pkceService.generateCodeVerifier();
            console.log('Generated new code_verifier:', newCodeVerifier);
        }
    }

    private generateCodeVerifier(): string {
        // Generate a random string for the code verifier
        const randomString = [...Array(32)].map(() => Math.random().toString(36)[2]).join('');
        return randomString; // The code verifier
    }

    public async login() {
        const codeChallenge = await this.pkceService.generateRandomStringForCodeChallenge(this.pkceService.retrieveCodeVerifier() as string);
        const authorizationUrl = `https://dipa-azuread.auth.eu-west-2.amazoncognito.com/oauth2/authorize?` +
            `response_type=code&` +
            `client_id=2jpj40a051o5vqrflmapf0m89l&` +
            `redirect_uri=http://localhost:4200/callback&` +
            `code_challenge=${codeChallenge}&` +
            `code_challenge_method=S256&` +
            `scope=email profile openid`;

        window.location.href = authorizationUrl; // Redirect to Cognito
    }

    public async doLogout(): Promise<void> {
        const clientId = '2jpj40a051o5vqrflmapf0m89l';
    const cognitoDomain = 'https://dipa-azuread.auth.eu-west-2.amazoncognito.com';
    const finalRedirectUri = 'https://6360-124-29-233-66.ngrok-free.app';//'https://materialm-angular-stylish.netlify.app/authentication/boxed-login'//'http://localhost:4200'; // Redirect URI after full logout flow

    // Azure AD logout URL with post-logout redirect parameter
    const azureAdLogoutUrl = `https://login.microsoftonline.com/${this.tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(finalRedirectUri)}`;

    // AWS Cognito logout URL that redirects to Azure AD logout URL
    const cognitoLogoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(azureAdLogoutUrl)}`;

    console.log(cognitoLogoutUrl);

    // Clear local storage session data
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');

    // Redirect to the Cognito logout endpoint
    window.location.href = cognitoLogoutUrl;
    }

    public async authenticateUser(username: string, password: string) {
    const cognito = new Cognito();
    const secretHash = this.generateSecretHash(this.clientId, this.clientSecret, username);
        const params = {
            ClientId: this.clientId,
            AuthFlow: 'USER_PASSWORD_AUTH',
            AuthParameters: {
                USERNAME: username,
                PASSWORD: password,
                SECRET_HASH: secretHash
            }
        };

        try {
            const data = await this.initiateAuth(cognito, params); // Use await to call the method
            localStorage.setItem('access_token', data.AuthenticationResult.AccessToken);
            localStorage.setItem('id_token', data.AuthenticationResult.IdToken);
            localStorage.setItem('refresh_token', data.AuthenticationResult.RefreshToken);
            this.router.navigate(['/home']);
        } catch (error) {
            throw error; // Handle or throw the error as necessary
        }
    }

    // Helper method to promisify initiateAuth
    private initiateAuth(cognito: Cognito, params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            cognito.initiateAuth(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    generateSecretHash(clientId: string, clientSecret: string, username: string): string {
        const message = username + clientId;
        const hash = CryptoJS.HmacSHA256(message, clientSecret);
        return CryptoJS.enc.Base64.stringify(hash);
    }
}



