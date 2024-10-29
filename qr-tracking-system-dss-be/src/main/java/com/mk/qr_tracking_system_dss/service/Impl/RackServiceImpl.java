package com.mk.qr_tracking_system_dss.service.Impl;

import com.mk.qr_tracking_system_dss.entity.Rack;
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
    public List<Package> getAllPackagesInRack(Long rackId) {
        return List.of();
    }

    @Override
    public void updateCurrentWeight(Long rackId) {
    }

    @Override
    public List<Rack> getAvailableRacks(double packageWeight) {
        return List.of();
    }
}
