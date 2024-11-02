package com.mk.qr_tracking_system_dss.service.Impl;

import com.mk.qr_tracking_system_dss.entity.Role;
import com.mk.qr_tracking_system_dss.repository.RoleRepository;
import com.mk.qr_tracking_system_dss.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void addRole(Role role) {
        roleRepository.save(role);
    }

    @Override
    public void deleteRole(Long roleId) {
        if (!roleRepository.existsById(roleId)) {
            throw new IllegalArgumentException(roleId + " IDlı rol bulunamadı");
        }
        roleRepository.deleteById(roleId);
    }
}
