package com.mk.qr_tracking_system_dss.controller;

import com.mk.qr_tracking_system_dss.entity.Role;
import com.mk.qr_tracking_system_dss.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/add")
    public ResponseEntity<String> addRole(Role role) {
        roleService.addRole(role);
        return ResponseEntity.ok("Role başarıyla eklendi");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteRole(Long roleId) {
        roleService.deleteRole(roleId);
        return ResponseEntity.ok("Role başarıyla silindi");
    }
}
