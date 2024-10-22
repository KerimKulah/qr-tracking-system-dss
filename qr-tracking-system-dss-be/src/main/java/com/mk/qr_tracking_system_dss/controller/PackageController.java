package com.mk.qr_tracking_system_dss.controller;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class PackageController {
    @Id
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
