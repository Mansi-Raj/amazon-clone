package com.mansirajprojects.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain; // Add this import
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.mansirajprojects.backend.security.JwtAuthFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults()).csrf(csrf -> csrf.disable()) // Disable CSRF for REST APIs
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                                // Allow public access to auth, generating OTPs, and fetching products
                                .requestMatchers("/api/admin/auth/**", "/auth/**", "/api/products/**", "/images/**").permitAll()

                                // Protect admin routes: Must have the exact role "ROLE_ADMIN"
                                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")

                                // Everything else requires authentication
                                .anyRequest().authenticated()
                );

        // Add our custom JWT filter before Spring's standard authentication filter
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}