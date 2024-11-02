package com.mk.qr_tracking_system_dss.service;

import com.mk.qr_tracking_system_dss.entity.User;

public interface UserService {
    void createUser(User user);
    void deleteUser(Long userId);
    void createAdminUser(User user);
    // Şifre değiştirme
    // Userı admin yapma
}
