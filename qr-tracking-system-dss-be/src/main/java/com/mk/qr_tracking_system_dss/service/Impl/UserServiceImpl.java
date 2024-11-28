package com.mk.qr_tracking_system_dss.service.Impl;

import com.mk.qr_tracking_system_dss.dto.UserDto;

import com.mk.qr_tracking_system_dss.dto.UserMovementDto;
import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.enums.Role;
import com.mk.qr_tracking_system_dss.repository.MovementRepository;
import com.mk.qr_tracking_system_dss.repository.UserRepository;
import com.mk.qr_tracking_system_dss.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MovementRepository movementRepository;

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> new UserDto(user.getId(), user.getUsername(), user.getFullName(), user.getRole().name()))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long userId) {
        User currentUser = getCurrentUser();
        if (currentUser.getId().equals(userId)) {
            throw new IllegalArgumentException("Kendinizi silemezsiniz.");
        }
        userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile kullanıcı bulunamadı."));
        userRepository.deleteById(userId);
    }

    @Override
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("Kullanıcı bulunamadı."));
    }

    @Override
    public List<UserMovementDto> getUserMovements(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile kullanıcı bulunamadı."));
        return user.getMovements().stream()
                .map(movement -> {
                    Package aPackage = movement.getAPackage(); //aPackage.product.productName
                    Long packageId = (aPackage != null) ? aPackage.getId() : null;
                    return new UserMovementDto(
                            movement.getId(),
                            movement.getMovementDate(),
                            movement.getMovementType(),
                            packageId,
                            movement.getAPackage().getProduct().getProductName()
                            );


                })
                .collect(Collectors.toList());
    }

    @Override
    public void changePassword(String password) {
        User user = getCurrentUser();
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public void makeAdmin(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Bu ID ile kullanıcı bulunamadı."));
        user.setRole(Role.ADMIN);
        userRepository.save(user);
    }
}
