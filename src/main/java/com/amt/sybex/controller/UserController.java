package com.amt.sybex.controller;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping("/user-details")
    public String getUserDetails(JwtAuthenticationToken authentication) {
        String username = authentication.getToken().getClaim("username");
        String email = authentication.getToken().getClaim("email");
        return "Username: " + username + ", Email: " + email;
    }
}
