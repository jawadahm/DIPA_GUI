package com.amt.sybex.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("http://localhost:4200");  // Add the domain of your Angular app
        corsConfiguration.addAllowedMethod("*");  // Allow all methods
        corsConfiguration.addAllowedHeader("*");  // Allow all headers
        corsConfiguration.setAllowCredentials(true);  // Allow credentials like cookies or authorization headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(source);
    }

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
        .cors().and()
        .csrf().disable()
		.authorizeHttpRequests(authorize -> 
		authorize.requestMatchers( 
				HttpMethod.GET,
				"/",
                "/index.html",
                "/callback",
                "/favicon.ico",
                "/assets/**",  // Allow all assets (images, fonts, etc.)
                "/**/*.css",    // All CSS files
                "/**/*.js",     // All JS files
                "/**/*.svg", 
                "/**/*.png", 
                "/**/*.jpg", 
                "/**/*.ico"
		        ).permitAll()     // Allow unauthenticated access to your auth endpoints).permitAll()
				.requestMatchers("/**/auth/**").permitAll()
				.anyRequest().authenticated()); // Secure all other paths
		
		http.oauth2ResourceServer(authServer -> authServer.jwt(Customizer.withDefaults()));

		return http.build();
	}
}

