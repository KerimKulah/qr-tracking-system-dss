package com.mk.qr_tracking_system_dss.entity;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mk.qr_tracking_system_dss.validation.ExpDateFuture;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
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
    @Min(value = 1, message = "Ürün miktarı 1 veya daha fazla olmalıdır")
    private int quantityOfProduct;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY) // Burası productWeight * quantityOfProduct olacak
    private double packageWeight;

    @ExpDateFuture // Eğer skt varsa, bu tarih bugünden sonraki bir tarih olmalı
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

