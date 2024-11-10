package com.mk.qr_tracking_system_dss.config;

import com.mk.qr_tracking_system_dss.entity.User;
import com.mk.qr_tracking_system_dss.enums.Role;
import com.mk.qr_tracking_system_dss.repository.UserRepository;
import com.mk.qr_tracking_system_dss.security.service.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminCreate implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("12345"));
            admin.setFullName("Admin User");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
/*            var token = jwtService.generateToken(admin);*/
            System.out.println("Admin kullanıcı oluşturuldu: admin , 12345 ");
    } else {
        System.out.println("Admin kullanıcı oluşturuldu: admin , 12345 ");
 }
}
}
