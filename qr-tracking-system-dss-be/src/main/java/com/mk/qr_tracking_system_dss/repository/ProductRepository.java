package com.mk.qr_tracking_system_dss.repository;
import com.mk.qr_tracking_system_dss.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByProductNameContainingIgnoreCase(String name); // Ürün ismine göre arama yapar. (Büyük küçük duyarsız.)
    boolean existsByProductName(String productName);
}
