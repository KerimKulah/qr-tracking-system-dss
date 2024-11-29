package com.mk.qr_tracking_system_dss.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

import com.mk.qr_tracking_system_dss.entity.Package;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PackageRepository extends JpaRepository<Package, Long> {
    @Query("SELECT p FROM Package p WHERE p.rack.id = :rackId AND p.deleted = false")
    List<Package> findByRackId(@Param("rackId") Long rackId);

    @Query("SELECT p FROM Package p WHERE p.product.id = :productId AND p.deleted = false")
    List<Package> findByProductId(@Param("productId") Long productId);

    @Query("SELECT p FROM Package p WHERE p.product.id = :productId")
    List<Package> findByProductIdIncludeDeleted(@Param("productId") Long productId);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Package p WHERE p.rack.id = :rackId AND p.deleted = false")
    boolean existsByRackId(@Param("rackId") Long rackId);

    @Query("SELECT p FROM Package p WHERE p.deleted = false")
    List<Package> findAll();

    @Query("SELECT p FROM Package p WHERE p.id = :id AND p.deleted = false")
    Optional<Package> findById(@Param("id") Long id);
}
