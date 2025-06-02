package edu.uptc.swii.authservice.infrastructure.dto;

public class CreateUserRequest {
    private Long userId;
    private String password;
    
    // Getters y Setters
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}