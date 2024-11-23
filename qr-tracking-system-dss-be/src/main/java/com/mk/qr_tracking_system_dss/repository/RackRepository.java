package com.mk.qr_tracking_system_dss.repository;
import com.mk.qr_tracking_system_dss.entity.Rack;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RackRepository extends JpaRepository<Rack, Long> {
    List<Rack> findByFreeWeightGreaterThanEqual(double packageWeight);
    Optional<Rack> findRackByLocation(String rackLocation);
    boolean existsByLocation(String location);
}
