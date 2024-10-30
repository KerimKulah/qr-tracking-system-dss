package com.mk.qr_tracking_system_dss.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Package extends  BaseEntity{

    @NotNull(message = "Ürün miktarı gerekli")
    private int quantityOfProduct;

    @NotNull(message = "Paket ağırlığı gerekli")
    private double packageWeight;

    private Date productExpDate;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String qrCode; // Bu String olmayacak muhtemelen kontrol edilecek

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "rack_id")
    private Rack rack;
}

