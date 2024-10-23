package com.mk.qr_tracking_system_dss.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class User extends BaseEntity{

    private String userName;
    private String password;
    private String fullName;
    private String email;

    @OneToMany(mappedBy = "user")
    private List<Movement> movements;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
