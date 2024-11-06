import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PKCEService } from '../services/pkceservice.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
    selector: 'app-auth-callback',
    template: '<p>Loading...</p>',
})
export class AuthCallbackComponent implements OnInit {
    constructor(private route: ActivatedRoute, private pkceService: PKCEService, private router: Router) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            const code = params['code'];
            if (code) {
                const codeVerifier = this.pkceService.retrieveCodeVerifier();
                this.exchangeCodeForTokens(code, codeVerifier as string);
            }
        });
    }

    private exchangeCodeForTokens(code: string, codeVerifier: string) {
        //const tokenUrl = `https://dipa-spike.auth.eu-west-2.amazoncognito.com/oauth2/token`;
        const tokenUrl = `https://dipa-azuread.auth.eu-west-2.amazoncognito.com/oauth2/token`;

        const body = new URLSearchParams();
        body.set('grant_type', 'authorization_code');
        body.set('code', code);
        body.set('redirect_uri', 'http://localhost:4200/callback');
        //body.set('client_id', '3uli03omcj24k151a0nk7g0s88');
        body.set('client_id', '2jpj40a051o5vqrflmapf0m89l');
        body.set('client_secret', 'aacjjr8bhuuum1mpg4udnv672ddqu72mdpn90dm0ff8v9qnteub');
        body.set('code_verifier', this.pkceService.retrieveCodeVerifier() as string);

        fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Token exchange failed');
            }
            
            return response.json();
        })
        .then(data => {
            // Handle the token response
            console.log('Token Response:', data);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('id_token', data.id_token);
            localStorage.setItem('refresh_token', data.id_token);
            const username = this.getUsernameFromToken(data.access_token);
            localStorage.setItem("username", username as string);

            this.router.navigate(['/home']);
        })
        .catch(error => {
            console.error('Error during token exchange:', error);
        });
    }

    private getUsernameFromToken(token: string): string | null {
        try {
            // Decode the token
            const decodedToken: any = jwtDecode(token);
            
            // Extract the username (or any other claim)
            const username = decodedToken['preferred_username'] || decodedToken['username'];
            
            return username || null; // Return the username or null if not found
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null; // Return null if decoding fails
        }
    }
}

