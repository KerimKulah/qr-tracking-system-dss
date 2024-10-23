package com.mk.qr_tracking_system_dss.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import java.util.Date;

@Data
@Entity
public class Package extends  BaseEntity{

    private int quantityOfProduct;
    private double packageWeight;
    private Date productExpDate;
    private String qrCode;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "rack_id")
    private Rack rack;
}