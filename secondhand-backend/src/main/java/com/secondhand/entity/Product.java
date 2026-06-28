package com.secondhand.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 
 @Column(nullable = false)
 private String title;

 @Column(nullable = false)
  private String description;

 @Column(nullable = false)
 private Double price;

 @Column(nullable = false)
 private String category;
   
 @Column(nullable = false)
 private String conditions;

 private String size;
 private String color;
 private String imageUrl;
 private Integer quantity = 1;

   @Column(nullable = false)
    private String status = "ACTIVE";  

 @ManyToOne
 @JoinColumn(name = "seller_id", nullable =  false)
 private User seller;

 @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
 private LocalDateTime createdAt;

 @Column(columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
 private LocalDateTime updatedAt;

 @PrePersist
 public void PrePersist(){
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
 }
 @PreUpdate
 public void preUpdate(){
    this.updatedAt = LocalDateTime.now();
 }
}

