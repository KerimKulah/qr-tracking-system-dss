package com.mk.qr_tracking_system_dss.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Role extends BaseEntity {

    private String roleName;

    @OneToMany(mappedBy = "role")
    private List<User> users;
}
