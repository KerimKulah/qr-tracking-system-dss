package com.mk.qr_tracking_system_dss.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Product extends BaseEntity {

    private String productName;
    private String productDescription;
    private String productCategory;
    private double productWeight;

    @OneToMany(mappedBy = "product")
    private List<Package> packages;
}
