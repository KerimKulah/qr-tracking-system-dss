package com.mk.qr_tracking_system_dss.service;
import com.mk.qr_tracking_system_dss.dto.MovementsDto;
import com.mk.qr_tracking_system_dss.entity.Package;

import java.util.List;


public interface MovementService {
    void recordPackageEntry(Package pkg); // Paketin girişini kaydeder
    void recordPackageExit(Package pkg); // Paketin çıkışını kaydeder
    List<MovementsDto> getAllMovements(); // Tüm hareketleri getirir
}
