package edu.uptc.swii.authservice.domain.ports.in;

import edu.uptc.swii.authservice.domain.model.User;

public interface UserManagementUseCase {
    User createUser(Long userId, String password);
    boolean existsByUserId(Long userId);
}
