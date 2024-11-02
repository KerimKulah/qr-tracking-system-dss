package com.mk.qr_tracking_system_dss.entity;
import com.mk.qr_tracking_system_dss.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private RoleEnum roleName;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}
