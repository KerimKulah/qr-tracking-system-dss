package com.mk.qr_tracking_system_dss.service;

import com.mk.qr_tracking_system_dss.entity.Product;
import java.util.List;


public interface ProductService
{
    void createProduct(Product product); // Ürün yaratma
    void deleteProductById(Long id); // Ürün silme
    Product getProductById(Long id); // ID ile ürün getirir
    Product getProductByName(String name); // Name ile ürün getirir
    List<Product> getAllProducts(); // Tüm ürünleri getirir
    void updateProduct(Product product); // Ürün bilgilerini günceller
    List<Package> getProductPackagesById(Long productId); // Bir ürünün olduğu tüm paketleri getirir
}
