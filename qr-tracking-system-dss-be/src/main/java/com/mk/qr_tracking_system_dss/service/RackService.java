package com.mk.qr_tracking_system_dss.service;

import com.mk.qr_tracking_system_dss.entity.Rack;

import java.util.List;

public interface RackService {
    void addRack(Rack rack); // Sisteme raf ekler
    void deleteRackById(Long id); // ID ile rafı siler
    List<Package> getAllPackagesInRack(Long rackId); // ID ile Bir raftaki tüm paketleri getirir
    void updateCurrentWeight(Long rackId); // Rafın mevcut ağırlığını günceller
    List<Rack> getAvailableRacks(double packageWeight); // Paket oluştururken musait rafları getirmeye yarar
}
