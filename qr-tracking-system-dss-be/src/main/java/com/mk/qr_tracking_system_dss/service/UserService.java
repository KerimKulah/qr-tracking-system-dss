package com.mk.qr_tracking_system_dss.service;

import com.mk.qr_tracking_system_dss.dto.UserDto;
import com.mk.qr_tracking_system_dss.dto.UserMovementDto;
import com.mk.qr_tracking_system_dss.entity.User;

import java.util.List;

public interface UserService {
    List<UserDto> getAllUsers(); // Tüm kullanıcıları getirir.
    void deleteUser(Long userId); // Kullanıcıyı siler.
    User getCurrentUser(); // Şu an giriş yapmış olan kullanıcıyı getirir.
    List <UserMovementDto> getUserMovements(Long userId); // Kullanıcının hareketlerini getirir.
    void changePassword(String password); // Kullanıcının şifresini değiştirir.
    void makeAdmin(Long userId); // Kullanıcıya yönetici rolu verir.
}
