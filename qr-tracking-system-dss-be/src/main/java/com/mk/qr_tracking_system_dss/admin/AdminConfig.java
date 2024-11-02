package com.mk.qr_tracking_system_dss.admin;

import com.mk.qr_tracking_system_dss.entity.Role;
import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.enums.RoleEnum;
import com.mk.qr_tracking_system_dss.repository.RoleRepository;
import com.mk.qr_tracking_system_dss.repository.UserRepository;
import com.mk.qr_tracking_system_dss.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminConfig {

    @Bean
    public CommandLineRunner createAdmin(AuthService authService, RoleRepository roleRepository, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        return args -> {
            // Öncelikle ADMIN rolünün var olup olmadığını kontrol ediyoruz yoksa oluşturuyoruz
            if (!roleRepository.existsByRoleName(RoleEnum.ADMIN)) {
                Role adminRole = new Role();
                adminRole.setRoleName(RoleEnum.ADMIN);
                roleRepository.save(adminRole);
            }
            // Admin kullanıcı var mı diye kontrol et yoksa oluştur ve kaydet
            if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("12345")); // Şifreyi encode ediyoruz
            adminUser.setFullname("Admin User");
            adminUser.setRole(roleRepository.findByRoleName(RoleEnum.ADMIN));
            userRepository.save(adminUser);
            }
        };
    }
}

