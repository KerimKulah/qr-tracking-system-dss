package com.mk.qr_tracking_system_dss.controller;

import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor // Lombok ile constructor injection
public class UserController {

    private final UserService userService;

    @PostMapping("/admin/createUser") // Userı sadece admin oluşturabilir.
    public ResponseEntity<String> createUser(@RequestBody User user) {
        userService.createUser(user);
        return ResponseEntity.ok("Kullanıcı başarıyla oluşturuldu.");
    }

    @DeleteMapping("/admin/deleteUser") // Userı sadece admin silebilir.
    public ResponseEntity<String> deleteUser(@RequestBody Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("Kullanıcı başarıyla silindi.");
    }
}
