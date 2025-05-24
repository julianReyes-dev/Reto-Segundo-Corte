package edu.uptc.swii.authservice.infrastructure.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.uptc.swii.authservice.application.services.AuthService;
import edu.uptc.swii.authservice.infrastructure.dto.CreateUserRequest;
import edu.uptc.swii.authservice.infrastructure.dto.JwtResponse;
import edu.uptc.swii.authservice.infrastructure.dto.LoginRequest;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private final AuthService authService;
    
    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest loginRequest) {
        String token = authService.login(loginRequest.getUserId(), loginRequest.getPassword());
        return ResponseEntity.ok(new JwtResponse(token));
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest request) {
        try {
            authService.createUser(request.getUserId(), request.getPassword());
            return ResponseEntity.ok("User created successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(
            @RequestHeader("Authorization") String authHeader) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String token = authHeader.replace("Bearer ", "");
            boolean isValid = authService.validateToken(token);
            response.put("valid", isValid);
            
            if (!isValid) {
                response.put("message", "Token is invalid");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("valid", false);
            response.put("message", "Error validating token: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/debug/validate")
    public ResponseEntity<?> debugValidateToken(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        
        try {
            SecretKey key = Keys.hmacShaKeyFor("my-very-secure-secret-key-that-is-at-least-256-bits-long-1234567890".getBytes());
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);
            
            Map<String, Object> response = new HashMap<>();
            response.put("valid", true);
            response.put("claims", claims.getBody());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}