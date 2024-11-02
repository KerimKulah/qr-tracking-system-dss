package com.mk.qr_tracking_system_dss.service.Impl;
import com.mk.qr_tracking_system_dss.entity.Product;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.repository.PackageRepository;
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

    @Autowired
    private PackageRepository packageRepository;

    @Override
    public void addProduct(Product product) {
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
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> searchProducts(String name) {
        if (name == null || name.trim().isEmpty()) {
            return List.of(); // Boş bir liste döndür
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
    public String getTotalQuantityOfProduct(Long productId) {
        if (!productRepository.existsById(productId)) {
            throw new IllegalArgumentException("Bu ID ile ürün bulunamadı.");
        }
        List<Package> packages = packageRepository.findByProductId(productId);
        if (packages.isEmpty()) {
            return productId + " ID'li ürün hiçbir pakette bulunmamaktadır.";
        }
        int totalQuantity = packages.stream().mapToInt(Package::getQuantityOfProduct).sum();
        return productId + " ID'li ürünün toplam " + totalQuantity + " adet bulunmaktadır.";
    }

    @Override
    public void updateProduct(Product product, Long productId) {
        // Ürünün mevcut olup olmadığını kontrol et
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile ürün bulunamadı."));

        // Ürünün herhangi bir pakette olup olmadığını kontrol et
        List<Package> packages = getProductPackagesById(productId);
        if (!packages.isEmpty()) {
            throw new IllegalArgumentException("Bu ürün paketlerde bulunduğu için güncellenemez.");
        }

        // Güncellenmesi gereken alanları mevcut ürüne set et
        existingProduct.setProductName(product.getProductName());
        existingProduct.setProductWeight(product.getProductWeight());
        existingProduct.setProductDescription(product.getProductDescription());
        existingProduct.setProductCategory(product.getProductCategory());

        // Değişiklikleri kaydet
        productRepository.save(existingProduct);
    }
}
