package com.example.service;

import com.example.model.Role;
import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        // Extract required user details
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");

        // Find existing user or create new one
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setUsername(generateUsername(name)); // Create username from name
                    newUser.setRole(Role.USER);
                    return userRepository.save(newUser);
                });

        // Store user information in the session
        // This is important for your app to recognize the logged-in user

        return oauth2User;
    }

    private String generateUsername(String name) {
        // Simple method to generate username from name
        return name.replaceAll("\\s+", "") + Math.abs(name.hashCode() % 1000);
    }
}