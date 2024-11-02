package com.mk.qr_tracking_system_dss.service.Impl;

import com.mk.qr_tracking_system_dss.entity.Role;
import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.enums.RoleEnum;
import com.mk.qr_tracking_system_dss.repository.RoleRepository;
import com.mk.qr_tracking_system_dss.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.mk.qr_tracking_system_dss.repository.UserRepository;

@Service
@RequiredArgsConstructor // Lombok ile constructor injection
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public void createUser(User user) {
        // User Role var mı kontrol ediyoruz yoksa User Rol Oluştur.
        if (!roleRepository.existsByRoleName(RoleEnum.USER)) {
            Role userRole = new Role();
            userRole.setRoleName(RoleEnum.USER);
            roleRepository.save(userRole);
        }

        // Şifreyi encode ediyoruz
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // User Rolu atıyoruz
        user.setRole(roleRepository.findByRoleName(RoleEnum.USER));

        try {
            userRepository.save(user);
        } catch (DataIntegrityViolationException e) {  //username unique olduğu için bu hata
            throw new IllegalArgumentException("Bu kullanıcı adı zaten mevcut.");
        }
    }

    @Override
    public void deleteUser(Long userId) {
        try {
            userRepository.deleteById(userId);
        } catch (Exception e) {
            throw new IllegalArgumentException("Bu kullanıcıya ait bir kayıt bulunmaktadır.");
        }
    }

    @Override
    public void createAdminUser(User user) {
        // Admin Role var mı kontrol ediyoruz yoksa Admin Rol Oluştur.
        if (!roleRepository.existsByRoleName(RoleEnum.ADMIN)) {
            Role adminRole = new Role();
            adminRole.setRoleName(RoleEnum.ADMIN);
            roleRepository.save(adminRole);
        }

        // Şifreyi encode ediyoruz
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Admin Rolu atıyoruz
        user.setRole(roleRepository.findByRoleName(RoleEnum.ADMIN));

        try {
            userRepository.save(user);
        } catch (DataIntegrityViolationException e) {  //username unique olduğu için bu hata
            throw new IllegalArgumentException("Bu kullanıcı adı zaten mevcut.");
        }
    }
}



