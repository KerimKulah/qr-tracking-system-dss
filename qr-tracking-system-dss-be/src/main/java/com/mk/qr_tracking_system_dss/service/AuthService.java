package com.mk.qr_tracking_system_dss.service;

import com.mk.qr_tracking_system_dss.dto.UserDto;
import com.mk.qr_tracking_system_dss.dto.UserRequest;
import com.mk.qr_tracking_system_dss.dto.UserResponse;

public interface AuthService {
    UserResponse login(UserRequest userRequest);
    UserResponse register(UserDto userDto);
}
