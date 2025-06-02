package edu.uptc.swii.authservice.infrastructure.repositories;

import org.springframework.stereotype.Component;

import edu.uptc.swii.authservice.domain.model.User;
import edu.uptc.swii.authservice.domain.ports.out.UserRepositoryPort;
import edu.uptc.swii.authservice.infrastructure.entities.UserEntity;

@Component
public class JpaUserRepositoryAdapter implements UserRepositoryPort {
    
    private final JpaUserRepository jpaUserRepository;
    
    public JpaUserRepositoryAdapter(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }
    
    @Override
    public User save(User user) {
        UserEntity entity = new UserEntity();
        entity.setUserId(user.getUserId());
        entity.setPassword(user.getPassword());
        entity.setRole(user.getRole());
        
        UserEntity savedEntity = jpaUserRepository.save(entity);
        
        user.setId(savedEntity.getId());
        return user;
    }
    
    @Override
    public User findByUserId(Long userId) {
        return jpaUserRepository.findByUserId(userId)
            .map(entity -> {
                User user = new User(entity.getUserId(), entity.getPassword(), entity.getRole());
                user.setId(entity.getId());
                return user;
            })
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    @Override
    public boolean existsByUserId(Long userId) {
        return jpaUserRepository.existsById(userId);
    }
}