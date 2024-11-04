package com.mk.qr_tracking_system_dss.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ADMIN,
    EMPLOYEE,
    ;

    @Override
    public String getAuthority() {
        return "ROLE_" + name();
    }
}
