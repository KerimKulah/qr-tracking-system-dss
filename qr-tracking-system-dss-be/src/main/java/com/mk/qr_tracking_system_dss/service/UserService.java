package com.mk.qr_tracking_system_dss.service;

import com.mk.qr_tracking_system_dss.entity.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    void deleteUser(Long userId);
}
