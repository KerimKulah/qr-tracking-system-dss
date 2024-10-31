package com.mk.qr_tracking_system_dss.service;

import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.entity.Rack;

import java.util.List;

public interface RackService {
    void addRack(Rack rack); // Sisteme raf ekler
    void deleteRackById(Long id); // ID ile rafı siler
    List<Rack> getAllRacks(); // Tüm rafları getirir
    Rack getRackById(Long id); // ID ile raf getirir
    List<Package> getAllPackagesInRack(Long rackId); // ID ile Bir raftaki tüm paketleri getirir
    void updateCurrentWeight(Long rackId); // Rafın mevcut ağırlığını ve freeWeight günceller.
    List<Rack> findSuitableRacks(Long productId, int quantityOfProduct); // Ürün ve miktarına göre uygun rafları getirir.
    void updateRack(Rack rack, Long rackId); // Rafı günceller
}
