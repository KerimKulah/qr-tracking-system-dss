package com.mk.qr_tracking_system_dss.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
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

        @Column(unique = true) // Aynı isim ile birden fazla ürün olmasını engeller.
        private String productName;
        private String productDescription;
        private String productCategory;
        private double productWeight;

        @JsonIgnore // Product çağırıldığında sonsuz packages gelmesini ve sonsuz döngü oluşmasını engeller.
        @OneToMany(mappedBy = "product")
        private List<Package> packages;
    }
