package com.mk.qr_tracking_system_dss.config;

import com.mk.qr_tracking_system_dss.entity.Role;
import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.enums.RoleEnum;
import com.mk.qr_tracking_system_dss.repository.RoleRepository;
import com.mk.qr_tracking_system_dss.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AdminConfig {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initAdminUser() {
        return args -> {
            // ADMIN Rolu Ekle
            if (!roleRepository.existsByRoleName(RoleEnum.ADMIN)) {
                Role adminRole = new Role();
                adminRole.setRoleName(RoleEnum.ADMIN);
                roleRepository.save(adminRole);
            }
            // USER Rolu Ekle
            if (!roleRepository.existsByRoleName(RoleEnum.USER)) {
                Role userRole = new Role();
                userRole.setRoleName(RoleEnum.USER);
                roleRepository.save(userRole);
            }

            // Admin kullanıcı var mı diye kontrol et yoksa oluştur ve kaydet
            if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("12345"));
            adminUser.setFullName("Admin User");
            adminUser.setRole(roleRepository.findByRoleName(RoleEnum.ADMIN));
            userRepository.save(adminUser);
            }
        };
    }
}

