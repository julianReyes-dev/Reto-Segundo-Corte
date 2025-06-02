package edu.uptc.swii.authservice.application.usecases;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import edu.uptc.swii.authservice.domain.model.User;
import edu.uptc.swii.authservice.domain.ports.in.AuthUseCase;
import edu.uptc.swii.authservice.domain.ports.out.UserRepositoryPort;
import edu.uptc.swii.authservice.infrastructure.jwt.JwtTokenProvider;

@Service
public class AuthUseCaseImpl implements AuthUseCase {
    
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepositoryPort userRepositoryPort;
    
    public AuthUseCaseImpl(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          UserRepositoryPort userRepositoryPort) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepositoryPort = userRepositoryPort;
    }
    
    @Override
    public String authenticate(Long userId, String password) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                userId.toString(),
                password
            )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        User user = userRepositoryPort.findByUserId(userId);
        return jwtTokenProvider.createToken(userId, user.getRole());
    }
    
    @Override
    public boolean validateToken(String token) {
        return jwtTokenProvider.validateToken(token);
    }
    
    @Override
    public Long getUserIdFromToken(String token) {
        return ((AuthUseCase) jwtTokenProvider).getUserIdFromToken(token);
    }
}
