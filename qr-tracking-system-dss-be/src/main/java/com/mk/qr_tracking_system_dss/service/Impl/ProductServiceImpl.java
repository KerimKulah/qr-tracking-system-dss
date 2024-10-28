package com.mk.qr_tracking_system_dss.service.Impl;

import com.mk.qr_tracking_system_dss.entity.Product;
import com.mk.qr_tracking_system_dss.repository.ProductRepository;
import com.mk.qr_tracking_system_dss.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void createProduct(Product product) {
        try {
            productRepository.save(product);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Bu ürün sistemde zaten mevcut.");  //Database productName kısmı unique
        }
    }

    @Override
    public void deleteProductById(Long id) {
        productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı."));
        productRepository.deleteById(id); //orElseThrow çalışırsa bu satır çalışmaz.
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı."));
    }

    @Override
    public Product getProductByName(String name) {
        return productRepository.findByProductName(name)
                .orElseThrow(() -> new IllegalArgumentException("Bu isimle ürün bulunamadı."));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public void updateProduct(Product product) {
        if (product.getId() == null || !productRepository.existsById(product.getId())) {
            throw new IllegalArgumentException("Güncellenecek ürün bulunamadı.");
        }
        productRepository.save(product);
    }

    @Override
    public List<Package> getProductPackagesById(Long productId) {
            if (!productRepository.existsById(productId)) {
                throw new IllegalArgumentException("Bu ID ile ürün bulunamadı.");
            }
            return List.of(); //return packageRepository.findByProductId(productId);
        }
    }
