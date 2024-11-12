package com.mk.qr_tracking_system_dss.security.service;


import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.enums.Role;
import com.mk.qr_tracking_system_dss.repository.UserRepository;
import com.mk.qr_tracking_system_dss.security.dto.AuthRequest;
import com.mk.qr_tracking_system_dss.security.dto.AuthResponse;
import com.mk.qr_tracking_system_dss.security.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    Pattern FULL_NAME_PATTERN = Pattern.compile("^[a-zA-Z]+\\s[a-zA-Z]+$");

    public String register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Kullanıcı adı zaten mevcut");
        }
        if (request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Şifre boş olamaz");
        }
        if (!FULL_NAME_PATTERN.matcher(request.getFullName()).matches()) {
            throw new IllegalArgumentException("Ad soyad sadece harflerden oluşmalı ve bir boşluk ile ayrılmalıdır");
        }
        User user =new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setRole(Role.EMPLOYEE);
        userRepository.save(user);
        return "Kullanıcı başarıyla kaydedildi";
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        if (authentication.isAuthenticated()) {
            User user = userRepository.findByUsername(request.getUsername()).orElseThrow();
            String token = jwtService.generateToken(user);
            return AuthResponse.builder().token(token).build();
        } else {
            return AuthResponse.builder().token("Login servis hatası").build();
        }
    }

}
