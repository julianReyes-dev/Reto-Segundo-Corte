package edu.uptc.swii.authservice.infrastructure.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.uptc.swii.authservice.infrastructure.entities.UserEntity;
import edu.uptc.swii.authservice.infrastructure.repositories.JpaUserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final JpaUserRepository userRepository;

    public CustomUserDetailsService(JpaUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity user = userRepository.findByUserId(Long.parseLong(username))
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        return User.builder()
            .username(user.getUserId().toString())
            .password(user.getPassword())
            .roles(user.getRole())
            .build();
    }
}