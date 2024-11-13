package com.mk.qr_tracking_system_dss.controller;

import com.mk.qr_tracking_system_dss.security.dto.AuthRequest;
import com.mk.qr_tracking_system_dss.security.dto.AuthResponse;
import com.mk.qr_tracking_system_dss.security.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/verifyToken")
    public ResponseEntity<Boolean> verifyToken(@RequestHeader("Authorization") String token) {
        token = token.startsWith("Bearer ") ? token.substring(7) : token;
        boolean isValid = authService.verifyToken(token);
        return ResponseEntity.ok(isValid);
    }
}
