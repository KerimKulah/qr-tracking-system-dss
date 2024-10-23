package com.mk.qr_tracking_system_dss.entity;

import com.mk.qr_tracking_system_dss.enums.MovementType;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Movement extends BaseEntity{

    @Temporal(TemporalType.TIMESTAMP)
    private Date movementDate;

    @Enumerated(EnumType.STRING)
    private MovementType movementType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private Package aPackage; // package ismi kullanılamadığı için aPackage olarak tanımlandı.
}
