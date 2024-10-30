/*
package com.mk.qr_tracking_system_dss.service.Impl;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.entity.Rack;
import com.mk.qr_tracking_system_dss.repository.PackageRepository;
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

    @Override
    public void addRack(Rack rack) {
        try {
            rack.setCurrentWeight(0);
            rackRepository.save(rack);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Bu raf sistemde zaten mevcut.");
        }
    }

    @Override
    public void deleteRackById(Long id) {
        rackRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile raf bulunamadı."));
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
        // Bakılacak
    }

    @Override
    public List<Rack> getAvailableRacks(double packageWeight) {
        return List.of(); // Bakılacak
    }
}
*/
