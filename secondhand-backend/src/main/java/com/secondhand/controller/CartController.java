package com.secondhand.controller;

import com.secondhand.entity.Cart;
import com.secondhand.service.CartService;
import com.secondhand.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:8080")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping 
    public ResponseEntity<List<Cart>> getCart(@RequestHeader("Authorization")String token){
        String tokenValue = token.substring(7);
        Long userId = jwtTokenProvider.getUserIdFromToken(tokenValue);
        return new ResponseEntity<>(cartService.getCartItems(userId), HttpStatus.OK);
    }
    @GetMapping("/total")
    public ResponseEntity<Double> getCartTotal(@RequestHeader("Authorization") String token) {
        String tokenValue = token.substring(7);
        Long userId = jwtTokenProvider.getUserIdFromToken(tokenValue);
        return new ResponseEntity<>(cartService.getCartTotal(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Cart> addToCart(
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") Integer quantity,
            @RequestHeader("Authorization") String token) {
        String tokenValue = token.substring(7);
        Long userId = jwtTokenProvider.getUserIdFromToken(tokenValue);
        return new ResponseEntity<>(cartService.addToCart(userId, productId, quantity), HttpStatus.CREATED);
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long cartId) {
        cartService.removeFromCart(cartId);
        return new ResponseEntity<>("Item removed", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> clearCart(@RequestHeader("Authorization") String token) {
        String tokenValue = token.substring(7);
        Long userId = jwtTokenProvider.getUserIdFromToken(tokenValue);
        cartService.clearCart(userId);
        return new ResponseEntity<>("Cart cleared", HttpStatus.OK);
    }
    
}
