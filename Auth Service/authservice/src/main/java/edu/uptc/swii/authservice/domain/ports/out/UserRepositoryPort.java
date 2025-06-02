package edu.uptc.swii.authservice.domain.ports.out;

import edu.uptc.swii.authservice.domain.model.User;

public interface UserRepositoryPort {
    User save(User user);
    User findByUserId(Long userId);
    boolean existsByUserId(Long userId);
}

