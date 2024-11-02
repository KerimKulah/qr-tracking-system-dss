package com.mk.qr_tracking_system_dss.repository;

import com.mk.qr_tracking_system_dss.entity.Movement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovementRepository extends JpaRepository<Movement, Long> {
}
