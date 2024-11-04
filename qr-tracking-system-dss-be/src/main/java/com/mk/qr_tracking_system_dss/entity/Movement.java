package com.mk.qr_tracking_system_dss.entity;
import com.mk.qr_tracking_system_dss.enums.MovementType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Movement extends BaseEntity{

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime movementDate;

    @Enumerated(EnumType.STRING)
    private MovementType movementType;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "package_id")
    private Package aPackage; // package ismi kullanılamadığı için aPackage olarak tanımlandı.
}
