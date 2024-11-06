// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Import routing module
import { AppComponent } from './app.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component'; // Import the callback component
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc'; // Import OAuthModul
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './modules/material.modules';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        AuthCallbackComponent,
        HomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule, // Ensure the routing module is imported
        OAuthModule.forRoot(),
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
        // Other modules...
    ],
    providers: [AuthService, OAuthService],
    bootstrap: [AppComponent]
})
export class AppModule {}
