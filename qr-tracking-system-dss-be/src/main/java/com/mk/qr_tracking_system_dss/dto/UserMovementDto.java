package com.mk.qr_tracking_system_dss.dto;

import com.mk.qr_tracking_system_dss.enums.MovementType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMovementDto {
    private Long id;
    private LocalDateTime movementDate;
    private MovementType movementType;
    private Long packageId;
    private String productName;
}
