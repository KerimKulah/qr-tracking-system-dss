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
