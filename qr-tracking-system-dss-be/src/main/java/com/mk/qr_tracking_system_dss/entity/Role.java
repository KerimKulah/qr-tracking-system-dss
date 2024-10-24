package com.mk.qr_tracking_system_dss.entity;

import com.mk.qr_tracking_system_dss.enums.RoleEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private RoleEnum roleName;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}
