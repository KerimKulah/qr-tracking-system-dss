package com.mk.qr_tracking_system_dss.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public abstract class BaseEntity {

    @Id
    @GeneratedValue
    private Long id;
}
