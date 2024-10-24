package com.mk.qr_tracking_system_dss.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Product extends BaseEntity {

    private String productName;
    private String productDescription;
    private String productCategory;
    private double productWeight;

    @OneToMany(mappedBy = "product")
    private List<Package> packages;
}
