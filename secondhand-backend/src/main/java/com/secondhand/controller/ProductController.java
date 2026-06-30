package com.secondhand.controller;

import com.secondhand.entity.Product;
import com.secondhand.service.ProductService;
import com.secondhand.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins="http://localhost:8080")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size){
            return new ResponseEntity<>(productService.getAllProducts(page, size), HttpStatus.OK);
    }

    @GetMapping("/id")
    public ResponseEntity<Product> getProductById(@PathVariable Long id){
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    
    @GetMapping("/search")
    public ResponseEntity<Page<Product>>searchProducts(
        @RequestParam String keyword,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size){
            return new ResponseEntity<>(productService.searchProducts(keyword,page,size), HttpStatus.OK);

        }
        
    @GetMapping("/category/{category}")
    public ResponseEntity<Page<Product>>filterByCategory(
        @PathVariable String category,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue="10") int size){
            return new ResponseEntity<>(productService.filterByCategory(category, page, size), HttpStatus.OK);        }
        
    @PostMapping
    public ResponseEntity<Product> addProduct(
        @RequestBody Product product,
        @RequestHeader("Authorization") String token){
        String tokenValue = token.substring(7);
        Long sellerId = jwtTokenProvider.getUserIdFromToken(tokenValue);
        return new ResponseEntity<>(productService.addProduct(product,sellerId) ,HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
        @PathVariable Long id,
        @RequestBody Product updatedProduct,
        @RequestHeader("Authorization")String token){
            String tokenValue = token.substring(7);
            Long sellerId = jwtTokenProvider.getUserIdFromToken(tokenValue);
            return new ResponseEntity<>(productService.updateProduct(id,updatedProduct,sellerId),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
        @PathVariable Long id,
        @RequestHeader("Authorization")String token){
            String tokenValue = token.substring(7);
            Long selelrId = jwtTokenProvider.getUserIdFromToken(tokenValue);
            productService.deleteProduct(id,selelrId);
            return new ResponseEntity<>("Product deleted", HttpStatus.OK);
        }

    
}
