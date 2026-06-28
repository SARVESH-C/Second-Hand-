package com.secondhand.repository;

import com.secondhand.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategory(String category, Pageable pageable);
    Page<Product> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);
    List<Product> findBySellerId(Long sellerId);
    Page<Product> findByStatus(String status, Pageable pageable);
}
