package com.mk.qr_tracking_system_dss.service.Impl;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.entity.Product;
import com.mk.qr_tracking_system_dss.entity.Rack;
import com.mk.qr_tracking_system_dss.repository.PackageRepository;
import com.mk.qr_tracking_system_dss.repository.ProductRepository;
import com.mk.qr_tracking_system_dss.repository.RackRepository;
import com.mk.qr_tracking_system_dss.service.RackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RackServiceImpl implements RackService {

    @Autowired
    private RackRepository rackRepository;

    @Autowired
    private PackageRepository packageRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void addRack(Rack rack) {
        try {
            rack.setCurrentWeight(0);
            rack.setFreeWeight(rack.getMaxWeightCapacity()); // Başlangıçta free weight maxweightcapacity kadar olmalı
            rackRepository.save(rack);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Bu raf sistemde zaten mevcut."); // Locationa (A1 vs.) bakıyor
        }
    }

    @Override
    public void deleteRackById(Long id) {
        rackRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile raf bulunamadı."));

        // Rafta paket olup olmadığını kontrol et
        List<Package> packagesInRack = packageRepository.findByRackId(id);
        if (!packagesInRack.isEmpty()) {
            throw new IllegalArgumentException("Bu rafın içinde paketler var. Rafı silemezsiniz.");
        }

        rackRepository.deleteById(id);
    }

    @Override
    public List<Rack> getAllRacks() {
        return rackRepository.findAll();
    }

    @Override
    public Rack getRackById(Long id) {
        return rackRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile raf bulunamadı."));
    }

    @Override
    public List<Package> getAllPackagesInRack(Long rackId) {
        try {
            return packageRepository.findByRackId(rackId);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Bu ID ile raf bulunamadı.");
        }
    }

    @Override
    public void updateCurrentWeight(Long rackId) {
        // Rafı getir
        Rack rack = rackRepository.findById(rackId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile raf bulunamadı."));

        // Raf içindeki tüm paketleri getir
        List<Package> packagesInRack = packageRepository.findByRackId(rackId);

        // Paketlerin toplam ağırlığını hesapla
        double totalWeight = packagesInRack.stream()
                .mapToDouble(Package::getPackageWeight)
                .sum();

        // Rafın mevcut ağırlığını güncelle
        rack.setCurrentWeight(totalWeight);

        // Rafın freeWeightini güncelle
        rack.setFreeWeight(rack.getMaxWeightCapacity() - totalWeight);

        // Rafı kaydet
        rackRepository.save(rack);
    }

    // Paket ağırlığına göre uygun rafları getirir.
    @Override
    public List<Rack> findSuitableRacks(Long productId, int quantityOfProduct) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
        double packageWeight = product.getProductWeight() * quantityOfProduct;

        return rackRepository.findByFreeWeightGreaterThanEqual(packageWeight);
    }
}
