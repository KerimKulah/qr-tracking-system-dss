package com.mk.qr_tracking_system_dss.repository;

import com.mk.qr_tracking_system_dss.entity.Role;
import com.mk.qr_tracking_system_dss.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleName(RoleEnum roleName);
    boolean existsByRoleName(RoleEnum roleName);
}
