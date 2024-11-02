package com.mk.qr_tracking_system_dss.controller;
import com.mk.qr_tracking_system_dss.entity.Product;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor // Lombok ile constructor injection
public class ProductController {

    private final ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@Valid @RequestBody Product product) {
        productService.addProduct(product);
        return ResponseEntity.ok("Ürün başarıyla sisteme eklendi.");
    }

    @PostMapping("/addAll") //Toplu ürün ekleme
    public ResponseEntity<String> addProducts(@Valid @RequestBody List<Product> products) {
        products.forEach(product -> productService.addProduct(product));
        return ResponseEntity.ok("Tüm ürünler başarıyla sisteme eklendi.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok("Ürün başarıyla silindi.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    @GetMapping //Bu direkt /products isteğinde çalışır ve tüm productsları çağırır.
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/search")  // /products/search?name=Sample şeklinde çağrılır.
    public List<Product> searchProducts(@RequestParam String name) {
        return productService.searchProducts(name);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateProduct(@Valid @RequestBody Product product, @PathVariable Long id) {
        productService.updateProduct(product, id);
        return ResponseEntity.ok("Ürün başarıyla güncellendi.");
    }

    @GetMapping("/{productId}/packages")
    public ResponseEntity<List<Package>> getProductPackagesById(@PathVariable Long productId) {
        List<Package> packages = productService.getProductPackagesById(productId);
        return ResponseEntity.ok(packages);
    }

    @GetMapping("/{productId}/totalQuantity")
    public ResponseEntity<String> getTotalQuantityOfProduct(@PathVariable Long productId) {
        String totalQuantity = productService.getTotalQuantityOfProduct(productId);
        return ResponseEntity.ok(totalQuantity);
    }
}