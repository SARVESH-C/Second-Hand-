package com.secondhand.controller;


import com.secondhand.dto.AuthResponse;
import com.secondhand.dto.LoginRequest;
import com.secondhand.dto.RegisterRequest;
import com.secondhand.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register (@RequestBody RegisterRequest request){
        return new ResponseEntity<>(authService.register(request), HttpStatus.CREATED);

    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return new ResponseEntity<>(authService.login(request),HttpStatus.OK);
    }
    
}
