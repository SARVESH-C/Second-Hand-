package com.secondhand.controller;

import com.secondhand.entity.Order;
import com.secondhand.service.OrderService;
import com.secondhand.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody Map<String, String> request,
            @RequestHeader("Authorization") String token) {
        String tokenValue = token.substring(7);
        Long userId = jwtTokenProvider.getUserIdFromToken(tokenValue);
        String shippingAddress = request.get("shippingAddress");
        String shippingPhone = request.get("shippingPhone");
        return new ResponseEntity<>(orderService.createOrder(userId, shippingAddress, shippingPhone), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<Order>> getMyOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestHeader("Authorization") String token) {
        String tokenValue = token.substring(7);
        Long userId = jwtTokenProvider.getUserIdFromToken(tokenValue);
        return new ResponseEntity<>(orderService.getBuyerOrders(userId, page, size), HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrder(@PathVariable Long orderId) {
        return new ResponseEntity<>(orderService.getOrder(orderId), HttpStatus.OK);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return new ResponseEntity<>(orderService.updateOrderStatus(orderId, status), HttpStatus.OK);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {
        orderService.cancelOrder(orderId);
        return new ResponseEntity<>("Order cancelled", HttpStatus.OK);
    }
}