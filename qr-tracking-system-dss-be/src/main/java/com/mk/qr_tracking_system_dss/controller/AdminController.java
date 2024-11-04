package com.mk.qr_tracking_system_dss.controller;

import com.mk.qr_tracking_system_dss.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;

    @PostMapping("/makeAdmin/{id}")
    public void makeAdmin(@PathVariable Long id) {
        userService.makeAdmin(id);
    }

    @GetMapping("/dashboard") // Deneme amaçlı yazıldı
    public String dashboard() {
        return "Deneme Dashboard Başarılı";
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
