package com.mk.qr_tracking_system_dss.controller;
import com.mk.qr_tracking_system_dss.service.PackageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mk.qr_tracking_system_dss.entity.Package;

import java.util.List;

@RestController
@RequestMapping("/packages")
public class PackageController {

    @Autowired
    private PackageService packageService;

    // Örnek yolu : packages/add?productId=1&rackId=1
    @PostMapping("/add")
    public ResponseEntity<String> addPackage(@Valid @RequestBody Package pkg, @RequestParam Long productId, @RequestParam Long rackId) {
        packageService.addPackage(pkg, productId, rackId);
        return ResponseEntity.ok("Paket başarıyla eklendi.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePackageById(@PathVariable Long id) {
        packageService.deletePackageById(id);
        return ResponseEntity.ok("Paket başarıyla silindi.");
    }

    @DeleteMapping("/exit/{id}")
    public ResponseEntity<String> exitPackageById(@PathVariable Long id) {
        packageService.exitPackageById(id);
        return ResponseEntity.ok("Paket başarıyla çıkış yaptı.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Package> getPackageById(@PathVariable Long id) {
        return ResponseEntity.ok(packageService.getPackageById(id));
    }

    @GetMapping //Bu direkt /packages isteğinde çalışır ve tüm paketleri çağırır.
    public ResponseEntity<List<Package>> getAllPackages() {
        return ResponseEntity.ok(packageService.getAllPackages());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updatePackage(@Valid @RequestBody Package pkg, @PathVariable Long id) {
        packageService.updatePackage(pkg, id);
        return ResponseEntity.ok("Paket başarıyla güncellendi.");
    }

}
