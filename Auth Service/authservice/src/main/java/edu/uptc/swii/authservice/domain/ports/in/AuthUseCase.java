package edu.uptc.swii.authservice.domain.ports.in;

public interface AuthUseCase {
    String authenticate(Long userId, String password);
    boolean validateToken(String token);
    Long getUserIdFromToken(String token);
}