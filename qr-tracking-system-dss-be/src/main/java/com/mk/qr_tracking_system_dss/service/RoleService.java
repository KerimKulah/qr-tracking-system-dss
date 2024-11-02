package com.mk.qr_tracking_system_dss.service;

import com.mk.qr_tracking_system_dss.entity.Role;

public interface RoleService {
    void addRole(Role role);
    void deleteRole(Long roleId);
}
