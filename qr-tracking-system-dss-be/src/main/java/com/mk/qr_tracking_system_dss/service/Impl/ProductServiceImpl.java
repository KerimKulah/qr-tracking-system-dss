package com.mk.qr_tracking_system_dss.service.Impl;
import com.mk.qr_tracking_system_dss.entity.Product;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.repository.PackageRepository;
import com.mk.qr_tracking_system_dss.repository.ProductRepository;
import com.mk.qr_tracking_system_dss.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final PackageRepository packageRepository;

    @Override
    public void addProduct(@Valid Product product) {
        if (productRepository.existsByProductName(product.getProductName())) {
            throw new DataIntegrityViolationException("Bu isimde bir ürün zaten mevcut.");
        }
        if (product.getProductWeight() <= 0) {
            throw new IllegalArgumentException("Ürün ağırlığı 0 veya daha az olamaz.");
        }
        productRepository.save(product);
    }

    @Override
    public void deleteProductById(Long id) {
       Product product = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı."));
       if (!packageRepository.findByProductIdIncludeDeleted(id).isEmpty()) {
           throw new IllegalArgumentException("Bu ürün paketlerde işlem görmüş olduğu için silinemez.");
       }
       product.setProductWeight(0);
       product.setProductDescription("Ürün silinmiştir.");
       productRepository.save(product);
       productRepository.deleteById(id);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı."));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> searchProducts(String name) {
        if (name == null || name.trim().isEmpty()) {
            return List.of();
        }
        List<Product> products = productRepository.findByProductNameContainingIgnoreCase(name);
        if (products.isEmpty()) {
            throw new IllegalArgumentException("Arama kriterine uygun hiçbir ürün bulunamadı.");
        }
        return products;
    }

    @Override
    public List<Package> getProductPackagesById(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new IllegalArgumentException("Bu ID ile ürün bulunamadı.");
        }
        return packageRepository.findByProductId(productId);
    }

    @Override
    public int getTotalQuantityOfProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new IllegalArgumentException("Bu ID ile ürün bulunamadı.");
        }
        List<Package> packages = packageRepository.findByProductId(productId);
        if (packages.isEmpty()) {
            return 0;
        }
        return packages.stream().mapToInt(Package::getQuantityOfProduct).sum();
    }

    @Override
    public void updateProduct(Product product, Long productId) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı."));

        List<Package> packages = getProductPackagesById(productId);
        if (!packages.isEmpty()) {
            throw new IllegalArgumentException("Bu ürün paketlerde bulunduğu için güncellenemez.");
        }

        existingProduct.setProductName(product.getProductName());
        existingProduct.setProductWeight(product.getProductWeight());
        existingProduct.setProductDescription(product.getProductDescription());
        existingProduct.setProductCategory(product.getProductCategory());

        productRepository.save(existingProduct);
    }
}
