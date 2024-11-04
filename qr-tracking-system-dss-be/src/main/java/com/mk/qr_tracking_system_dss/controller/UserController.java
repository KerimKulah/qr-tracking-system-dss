package com.mk.qr_tracking_system_dss.controller;

import com.mk.qr_tracking_system_dss.dto.UserDto;
import com.mk.qr_tracking_system_dss.entity.Movement;
import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping()
    public ResponseEntity <List<UserDto>> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/movements/{id}")
    public ResponseEntity <List<Movement>> getMovements(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserMovements(id));
    }

    @GetMapping("/current")
    public ResponseEntity <User> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PostMapping("/changePassword")
    public void changePassword(@RequestBody String password) {
        userService.changePassword(password);
    }

}
