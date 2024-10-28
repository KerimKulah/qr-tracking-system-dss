package com.mk.qr_tracking_system_dss.repository;


import com.mk.qr_tracking_system_dss.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductName(String name); // isim ile ürün aratmak için
}
