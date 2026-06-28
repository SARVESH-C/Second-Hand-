package com.secondhand.service;

import com.secondhand.entity.Review;
import com.secondhand.entity.Product;
import com.secondhand.entity.User;
import com.secondhand.repository.ReviewRepository;
import com.secondhand.repository.ProductRepository;
import com.secondhand.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Review addReview(Long productId, Long buyerId, Integer rating, String comment) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = new Review();
        review.setProduct(product);
        review.setBuyer(buyer);
        review.setRating(rating);
        review.setComment(comment);

        return reviewRepository.save(review);
    }

    public List<Review> getProductReviews(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    public Double getProductRating(Long productId) {
        List<Review> reviews = getProductReviews(productId);
        if (reviews.isEmpty()) return 0.0;
        return reviews.stream()
                .mapToDouble(Review::getRating)
                .average()
                .orElse(0.0);
    }

    public List<Review> getBuyerReviews(Long buyerId) {
        return reviewRepository.findByBuyerId(buyerId);
    }
}