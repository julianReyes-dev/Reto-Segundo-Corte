package edu.uptc.swii.authservice.application.services;

import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;

import edu.uptc.swii.authservice.domain.model.User;
import edu.uptc.swii.authservice.domain.ports.in.AuthUseCase;
import edu.uptc.swii.authservice.domain.ports.in.UserManagementUseCase;
import edu.uptc.swii.authservice.domain.ports.out.UserRepositoryPort;
import edu.uptc.swii.authservice.infrastructure.jwt.JwtTokenProvider;

@Service
public class AuthService {
    
    private final AuthUseCase authUseCase;
    private final UserManagementUseCase userManagementUseCase;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
     private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    public AuthService(AuthUseCase authUseCase, 
                     UserManagementUseCase userManagementUseCase,
                     UserRepositoryPort userRepositoryPort,
                     PasswordEncoder passwordEncoder,
                     JwtTokenProvider jwtTokenProvider) { // Añadido parámetro
        this.authUseCase = authUseCase;
        this.userManagementUseCase = userManagementUseCase;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider; // Inicializado correctamente
    }
    
    public String login(Long userId, String password) {
        return authUseCase.authenticate(userId, password);
    }
    
    public User createUser(Long userId, String password) {
        return userManagementUseCase.createUser(userId, passwordEncoder.encode(password));
    }
    
    public boolean validateToken(String token) {
    try {
        return jwtTokenProvider.validateToken(token);
    } catch (Exception e) {
        logger.error("Error validating token: " + e.getMessage());
        return false;
    }
}
    
    public Long getUserIdFromToken(String token) {
        return authUseCase.getUserIdFromToken(token);
    }
    
    public boolean existsByUserId(Long userId) {
        return userManagementUseCase.existsByUserId(userId);
    }
}
