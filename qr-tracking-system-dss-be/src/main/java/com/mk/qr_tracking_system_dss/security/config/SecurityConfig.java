package com.mk.qr_tracking_system_dss.security.config;

import com.mk.qr_tracking_system_dss.security.service.LogoutService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JWTFilter jwtFilter;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutService logoutService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
         http
            .cors(cors -> cors.configurationSource(request -> {
                     var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
                     corsConfiguration.setAllowedOriginPatterns(List.of("*")); // IP gerekebilr
                     corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                     corsConfiguration.setAllowedHeaders(List.of("*"));
                     corsConfiguration.setAllowCredentials(true);
                     return corsConfiguration;
                 }))
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorize -> authorize
                    .requestMatchers("/error", "/auth/**","/PackageDetail/**").permitAll()
                    .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
                    .anyRequest().authenticated())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                 .logout(logout -> logout
                         .logoutUrl("/auth/logout")
                         .logoutSuccessHandler((request, response, authentication) -> {
                             String authorizationHeader = request.getHeader("Authorization");
                             if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                                 String token = authorizationHeader.substring(7);
                                 logoutService.blacklistToken(token);
                             }
                             response.setStatus(HttpServletResponse.SC_OK);
                         })
                 );

        return http.build();
    }
}

