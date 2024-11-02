package com.mk.qr_tracking_system_dss.controller;

import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        String token = authService.login(user);
        return ResponseEntity.ok(token);
    }

}