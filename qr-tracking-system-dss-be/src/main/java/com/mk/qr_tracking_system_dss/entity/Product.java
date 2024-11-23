package com.mk.qr_tracking_system_dss.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mk.qr_tracking_system_dss.enums.Category;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE product SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
@Entity
    public class Product extends BaseEntity {

        @NotBlank(message = "Ürün ismi gerekli")
        @NotNull(message = "Ürün ismi gerekli")
        private String productName;

        @NotBlank(message = "Ürün açıklaması gerekli")
        private String productDescription;

        @Enumerated(EnumType.STRING)
        private Category productCategory;

        @NotNull(message = "Ürün ağırlığı gerekli")
        private double productWeight;

        @JsonIgnore @OneToMany(mappedBy = "product")
        private List<Package> packages;

        @Column(nullable = false)
        @JsonIgnore
        private boolean deleted = Boolean.FALSE;
    }
