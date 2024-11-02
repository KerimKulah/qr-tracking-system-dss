package com.mk.qr_tracking_system_dss.service.Impl;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.entity.Product;
import com.mk.qr_tracking_system_dss.entity.Rack;
import com.mk.qr_tracking_system_dss.repository.PackageRepository;
import com.mk.qr_tracking_system_dss.repository.ProductRepository;
import com.mk.qr_tracking_system_dss.repository.RackRepository;
import com.mk.qr_tracking_system_dss.service.PackageService;
import com.mk.qr_tracking_system_dss.service.RackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PackageServiceImpl implements PackageService {

    @Autowired
    private PackageRepository packageRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private RackService rackService;
    @Autowired
    private RackRepository rackRepository;

    @Override
    public void addPackage(Package pkg, Long productId, Long rackId) {
        // IDler kontrol edilir.
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı."));
        Rack rack = rackRepository.findById(rackId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile raf bulunamadı."));

        // Rafın boş yeri kontrol edilir.
        double pckWeight = product.getProductWeight()* pkg.getQuantityOfProduct();
        if (pckWeight > rack.getFreeWeight()) {
            throw new IllegalArgumentException("Rafın ağırlığı yetersiz.");
        }
        pkg.setPackageWeight(pckWeight);
        pkg.setProduct(product);
        pkg.setRack(rack);
        packageRepository.save(pkg);
        rackService.updateCurrentWeight(rackId);

        // Paketin QR kodu oluşturulur.

        // PACKAGE_ENTRY işlemi yapılır.


    }

    @Override
    public void deletePackageById(Long id) {
        Package pkg = packageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile paket bulunamadı."));

        packageRepository.deleteById(id);

        // Rafın ağırlığını güncelle
        rackService.updateCurrentWeight(pkg.getRack().getId());
    }

    @Override
    public void exitPackageById(Long id) {
        Package pkg = packageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile paket bulunamadı."));

        // Rafın ağırlığını güncelle
        rackService.updateCurrentWeight(pkg.getRack().getId());

        // PACKAGE_EXIT işlemi yapılır.
    }

    @Override
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    @Override
    public Package getPackageById(Long id) {
        return packageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile paket bulunamadı."));
    }

    @Override
    public void updatePackage(Package pkg, Long packageId) {
        // Güncellenmek istenen paketin mevcut olup olmadığını kontrol et
        Package existingPackage = packageRepository.findById(packageId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile paket bulunamadı."));

        // Ürün kontrolü
        Product product = productRepository.findById(pkg.getProduct().getId())
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı."));

        // Raf kontrolü
        Rack rack = rackRepository.findById(pkg.getRack().getId())
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile raf bulunamadı."));

        // Paket ağırlığını hesapla
        double newPackageWeight = product.getProductWeight() * pkg.getQuantityOfProduct();

        // Rafın boş yerini kontrol et
        double availableWeightAfterUpdate = rack.getMaxWeightCapacity() - rack.getCurrentWeight() + existingPackage.getPackageWeight();
        if (newPackageWeight > availableWeightAfterUpdate) {
            throw new IllegalArgumentException("Rafın ağırlık kapasitesi yetersiz, önce uygun bir rafa alınmalı.");
        }

        // Paket bilgilerini güncelle
        existingPackage.setQuantityOfProduct(pkg.getQuantityOfProduct());
        existingPackage.setPackageWeight(newPackageWeight);
        existingPackage.setProduct(product);
        existingPackage.setRack(rack);

        // Güncellemeleri kaydet
        packageRepository.save(existingPackage);
        rackService.updateCurrentWeight(rack.getId());
    }

    @Override
    public void changePackageRack(Long packageId, Long newRackId) {
        Package pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile paket bulunamadı."));
        Rack newRack = rackRepository.findById(newRackId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile raf bulunamadı."));

        // Rafın boş yeri kontrol edilir
        double pckWeight = pkg.getProduct().getProductWeight() * pkg.getQuantityOfProduct();
        if (pckWeight > newRack.getFreeWeight()) {
            throw new IllegalArgumentException("Rafın ağırlığı yetersiz.");
        }

        // Eski rafın ağırlığı güncellenir
        rackService.updateCurrentWeight(pkg.getRack().getId());

        // Paketin rafı değiştirilir
        pkg.setRack(newRack);
        packageRepository.save(pkg);

        // Yeni rafın ağırlığı güncellenir
        rackService.updateCurrentWeight(newRackId);
    }
}
