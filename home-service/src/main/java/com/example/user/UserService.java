package com.example.user;

import com.example.user.User;
import com.example.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;
    
    public User findByUsername(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));
    }

    public String signup(User user) {
        if (userRepo.existsByUsername(user.getUsername()) || userRepo.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Username or email already exists");
        }
        userRepo.save(user);
        return "Signup successful";
    }

    public String login(String username, String password) {
        return userRepo.findByUsernameAndPassword(username, password)
                .map(user -> "Login successful")
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }

    public String resetPassword(String username, String email, String newPassword) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getEmail().equals(email)) {
            throw new RuntimeException("Email does not match");
        }

        user.setPassword(newPassword);
        userRepo.save(user);
        return "Password reset successful";
    }

    public User getProfile(String username) {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String username, User updatedInfo) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(updatedInfo.getFullName());
        user.setEmail(updatedInfo.getEmail());
        user.setPhone(updatedInfo.getPhone());
        user.setAddress(updatedInfo.getAddress());
        return userRepo.save(user);
    }
}
