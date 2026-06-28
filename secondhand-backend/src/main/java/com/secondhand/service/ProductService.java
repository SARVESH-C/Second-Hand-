package com.secondhand.service;

import com.secondhand.entity.Product;
import com.secondhand.entity.User;
import com.secondhand.repository.ProductRepository;
import com.secondhand.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Product addProduct(Product product, Long sellerId) {
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found"));
        product.setSeller(seller);
        product.setStatus("ACTIVE");
        return productRepository.save(product);
    }

    public Page<Product> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByStatus("ACTIVE", pageable);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Page<Product> searchProducts(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByTitleContainingIgnoreCase(keyword, pageable);
    }

    public Page<Product> filterByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findByCategory(category, pageable);
    }

    public List<Product> getSellerProducts(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    public Product updateProduct(Long id, Product updatedProduct, Long sellerId) {
        Product product = getProductById(id);
        if (!product.getSeller().getId().equals(sellerId)) {
            throw new RuntimeException("Unauthorized");
        }
        product.setTitle(updatedProduct.getTitle());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setCategory(updatedProduct.getCategory());
        product.setConditions(updatedProduct.getConditions());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id, Long sellerId) {
        Product product = getProductById(id);
        if (!product.getSeller().getId().equals(sellerId)) {
            throw new RuntimeException("Unauthorized");
        }
        product.setStatus("REMOVED");
        productRepository.save(product);
    }
}