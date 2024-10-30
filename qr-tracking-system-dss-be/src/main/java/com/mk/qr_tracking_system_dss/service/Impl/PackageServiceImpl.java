package com.mk.qr_tracking_system_dss.service.Impl;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.repository.PackageRepository;
import com.mk.qr_tracking_system_dss.repository.ProductRepository;
import com.mk.qr_tracking_system_dss.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PackageServiceImpl implements PackageService {

    @Autowired
    private PackageRepository packageRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public void addPackage(Package pkg, Long productId) {
        pkg.setProduct(productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı.")));
        packageRepository.save(pkg);

        // QR kod üretimi burada yapılacak

    }

    @Override
    public void deletePackageById(Long id) {
        try {
            packageRepository.deleteById(id);
        } catch (Exception e) {
            throw new IllegalArgumentException("Bu ID ile paket bulunamadı.");
        }
    }

    @Override
    public void exitPackageById(Long id) {
        // Paket çıkışı yapılacak
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
}
