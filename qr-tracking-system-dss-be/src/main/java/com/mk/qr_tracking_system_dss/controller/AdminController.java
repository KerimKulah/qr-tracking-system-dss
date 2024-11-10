package com.mk.qr_tracking_system_dss.controller;

import com.mk.qr_tracking_system_dss.dto.MovementsDto;
import com.mk.qr_tracking_system_dss.dto.UserDto;
import com.mk.qr_tracking_system_dss.dto.UserMovementDto;
import com.mk.qr_tracking_system_dss.entity.Movement;
import com.mk.qr_tracking_system_dss.security.dto.AuthResponse;
import com.mk.qr_tracking_system_dss.security.dto.RegisterRequest;
import com.mk.qr_tracking_system_dss.security.service.AuthService;
import com.mk.qr_tracking_system_dss.service.MovementService;
import com.mk.qr_tracking_system_dss.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final AuthService authService;
    private final MovementService movementService;

    // KULLANICI EKLEME SİLME VE YETKİLENDİRME

    @PostMapping("/createUser")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @PostMapping("/makeAdmin/{id}")
    public void makeAdmin(@PathVariable Long id) {
        userService.makeAdmin(id);
    }

    // KULLANICILARI VE O KULLANICININ HAREKETLERINI GÖRME

    @GetMapping("/getMovements/{id}")
    public ResponseEntity <List<UserMovementDto>> getMovements(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserMovements(id));
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity <List<UserDto>> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/getAllMovements")
    public ResponseEntity <List<MovementsDto>> getAllMovements() {
        return ResponseEntity.ok(movementService.getAllMovements());
    }
}
