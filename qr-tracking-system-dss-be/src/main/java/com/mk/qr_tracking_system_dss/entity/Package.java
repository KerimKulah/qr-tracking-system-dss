package com.mk.qr_tracking_system_dss.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mk.qr_tracking_system_dss.validation.ExpDateFuture;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE package SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
@Entity
public class Package extends  BaseEntity{

    @NotNull(message = "Ürün miktarı gerekli")
    @Min(value = 1, message = "Ürün miktarı 1 veya daha fazla olmalıdır")
    private int quantityOfProduct;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private double packageWeight;

    @ExpDateFuture // Eğer skt varsa, bu tarih bugünden sonraki bir tarih olmalı
    private Date productExpDate;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @Column(length = 2048)
    private String qrCode;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "rack_id")
    private Rack rack;

    @Column(nullable = false)
    @JsonIgnore
    private boolean deleted = Boolean.FALSE;
}

