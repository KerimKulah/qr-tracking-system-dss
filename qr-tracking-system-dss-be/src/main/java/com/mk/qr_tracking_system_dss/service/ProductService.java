package com.mk.qr_tracking_system_dss.service;

import com.mk.qr_tracking_system_dss.entity.Product;
import com.mk.qr_tracking_system_dss.entity.Package;
import java.util.List;


public interface ProductService {
    void addProduct(Product product); // Ürün yaratma
    void deleteProductById(Long id); // Ürün silme
    Product getProductById(Long id); // ID ile ürün getirir
    List<Product> getAllProducts(); // Tüm ürünleri getirir
    List<Product> searchProducts(String name); // İsme göre ürünleri arar.
    void updateProduct(Product product, Long id); // Ürün bilgilerini günceller
    List<Package> getProductPackagesById(Long productId); // Bir ürünün olduğu tüm paketleri getirir
    int getTotalQuantityOfProduct(Long productId); // Bir üründen toplam kaç adet olduğunu getirir;
}
