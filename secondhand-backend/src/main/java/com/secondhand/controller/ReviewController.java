package com.secondhand.controller;

import com.secondhand.entity.Review;
import com.secondhand.service.ReviewService;
import com.secondhand.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping
    public ResponseEntity<Review> addReview(
            @RequestBody Map<String, Object> request,
            @RequestHeader("Authorization") String token) {
        String tokenValue = token.substring(7);
        Long buyerId = jwtTokenProvider.getUserIdFromToken(tokenValue);
        Long productId = ((Number) request.get("productId")).longValue();
        Integer rating = ((Number) request.get("rating")).intValue();
        String comment = (String) request.get("comment");
        return new ResponseEntity<>(reviewService.addReview(productId, buyerId, rating, comment), HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReviews(@PathVariable Long productId) {
        return new ResponseEntity<>(reviewService.getProductReviews(productId), HttpStatus.OK);
    }

    @GetMapping("/product/{productId}/rating")
    public ResponseEntity<Double> getProductRating(@PathVariable Long productId) {
        return new ResponseEntity<>(reviewService.getProductRating(productId), HttpStatus.OK);
    }

    @GetMapping("/my-reviews")
    public ResponseEntity<List<Review>> getMyReviews(@RequestHeader("Authorization") String token) {
        String tokenValue = token.substring(7);
        Long buyerId = jwtTokenProvider.getUserIdFromToken(tokenValue);
        return new ResponseEntity<>(reviewService.getBuyerReviews(buyerId), HttpStatus.OK);
    }
}