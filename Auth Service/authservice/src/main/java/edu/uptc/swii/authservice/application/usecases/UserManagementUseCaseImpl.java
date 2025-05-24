package edu.uptc.swii.authservice.application.usecases;

import org.springframework.stereotype.Service;

import edu.uptc.swii.authservice.domain.model.User;
import edu.uptc.swii.authservice.domain.ports.in.UserManagementUseCase;
import edu.uptc.swii.authservice.domain.ports.out.UserRepositoryPort;

@Service
public class UserManagementUseCaseImpl implements UserManagementUseCase {
    
    private final UserRepositoryPort userRepositoryPort;
    
    public UserManagementUseCaseImpl(UserRepositoryPort userRepositoryPort) {
        this.userRepositoryPort = userRepositoryPort;
    }
    
    @Override
    public User createUser(Long userId, String password) {
        if (userRepositoryPort.existsByUserId(userId)) {
            throw new RuntimeException("User already exists");
        }
        
        User user = new User(userId, password, "ADMIN");
        return userRepositoryPort.save(user);
    }
    
    @Override
    public boolean existsByUserId(Long userId) {
        return userRepositoryPort.existsByUserId(userId);
    }
}
