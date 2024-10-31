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
        // Ürünün var olup olmadığını kontrol et
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı."));

        // Ürün ve paket bilgilerini ayarla
        pkg.setProduct(product);
        pkg.setPackageWeight(product.getProductWeight() * pkg.getQuantityOfProduct());

        // Rafın uygun olup olmadığını kontrol et
        Rack selectedRack = rackService.getRackById(rackId);
        double freeWeight = selectedRack.getMaxWeightCapacity() - selectedRack.getCurrentWeight();
        if (freeWeight < pkg.getPackageWeight()) {
            throw new IllegalArgumentException("Seçilen raf bu paketi taşıyamaz.");
        }
        pkg.setRack(selectedRack);
        packageRepository.save(pkg);
        rackService.updateCurrentWeight(rackId);
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
