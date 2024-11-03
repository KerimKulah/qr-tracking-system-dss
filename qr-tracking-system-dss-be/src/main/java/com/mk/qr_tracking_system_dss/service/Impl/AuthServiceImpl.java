package com.mk.qr_tracking_system_dss.service.Impl;

import com.mk.qr_tracking_system_dss.dto.UserDto;
import com.mk.qr_tracking_system_dss.dto.UserRequest;
import com.mk.qr_tracking_system_dss.dto.UserResponse;
import com.mk.qr_tracking_system_dss.entity.Role;
import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.enums.RoleEnum;
import com.mk.qr_tracking_system_dss.repository.RoleRepository;
import com.mk.qr_tracking_system_dss.repository.UserRepository;
import com.mk.qr_tracking_system_dss.service.AuthService;
import com.mk.qr_tracking_system_dss.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // Lombok ile constructor injection
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository RoleRepository;

    @Override
    public UserResponse login(@Valid UserRequest userRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userRequest.getUsername(), userRequest.getPassword()));
        } catch (AuthenticationException e) {
            throw new IllegalArgumentException("Kullanıcı adı veya şifre yanlış.");
        }
        User user = userRepository.findByUsername(userRequest.getUsername()).orElseThrow();
        String token = jwtService.createToken(user);
        UserResponse userResponse = new UserResponse();
        userResponse.setToken(token);
        return userResponse;
    }

    @Override
    public UserResponse register(@Valid UserDto userDto) {
        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Bu kullanıcı adı zaten mevcut.");
        }

        // Userı oluştur ve rol ata
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setFullName(userDto.getFullName());

        //User Rolu
        Role userRole = RoleRepository.findByRoleName(RoleEnum.USER);
        user.setRole(userRole);
        userRepository.save(user);

        // JWT token oluşturma
        var token = jwtService.createToken(user);

        // Token ile response döndürme
        UserResponse userResponse = new UserResponse();
        userResponse.setToken(token);
        return userResponse;
    }
}

