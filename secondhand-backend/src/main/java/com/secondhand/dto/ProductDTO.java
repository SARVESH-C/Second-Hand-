package com.secondhand.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private Double originalPrice;
    private String category;
    private String conditions;
    private String size;
    private String color;
    private String imageURL;
    private String sellerName;
    private Long sellerId;
    private Double rating;
    
}
