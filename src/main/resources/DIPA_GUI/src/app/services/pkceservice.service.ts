import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PKCEService {
  private storageKey = 'pkce_code_verifier';

  /**
   * Store the code_verifier in sessionStorage.
   * @param codeVerifier The code_verifier string to store
   */
  storeCodeVerifier(codeVerifier: string): void {
    sessionStorage.setItem(this.storageKey, codeVerifier);
  }

  /**
   * Retrieve the stored code_verifier from sessionStorage.
   * @returns The stored code_verifier or null if not found
   */
  retrieveCodeVerifier(): string | null {
    return sessionStorage.getItem(this.storageKey);
  }

  /**
   * Clear the code_verifier from sessionStorage.
   */
  clearCodeVerifier(): void {
    sessionStorage.removeItem(this.storageKey);
  }

  /**
   * Generate a random code_verifier for PKCE.
   * @returns A new code_verifier string
   */
  generateCodeVerifier(): string {
    const randomString = this.generateRandomString();
    this.storeCodeVerifier(randomString);
    return randomString;
  }

  /**
   * Generate a random string for code_verifier.
   * @returns A random string (minimum length of 43 characters as per PKCE spec)
   */
  private generateRandomString(): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    const length = 128;
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

  async generateRandomStringForCodeChallenge(codeVerifier: string): Promise<string> {
    const encoded = new TextEncoder().encode(codeVerifier);
    const hash = await crypto.subtle.digest('SHA-256', encoded);
    const base64Url = btoa(String.fromCharCode(...new Uint8Array(hash)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, ''); // The code challenge
    return base64Url;
}
}
