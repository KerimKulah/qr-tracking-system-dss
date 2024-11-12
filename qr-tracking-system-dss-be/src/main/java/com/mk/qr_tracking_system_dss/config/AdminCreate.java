package com.mk.qr_tracking_system_dss.config;

import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.enums.Role;
import com.mk.qr_tracking_system_dss.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminCreate implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("12345"));
            admin.setFullName("Admin User");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
            System.out.println("Admin kullanıcı oluşturuldu: admin , 12345 ");
    } else {
        System.out.println("Admin kullanıcı oluşturuldu: admin , 12345 ");
 }
}
}
