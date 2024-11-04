package com.mk.qr_tracking_system_dss.service;
import com.mk.qr_tracking_system_dss.entity.Package;

import java.util.List;

public interface PackageService {
    void addPackage(Package pkg, Long productId, Long rackId); // Product id ile paket ekler.
    void exitPackageById(Long id); // Paketi çıkış yapar
    List<Package> getAllPackages(); // Tüm paketleri getirir
    Package getPackageById(Long id); // ID ile paket getirir
    void updatePackage(Package pkg, Long packageId); // Paket bilgilerini günceller
    void changePackageRack(Long packageId, Long newRackId); // Paketin rafını değiştirir
}
