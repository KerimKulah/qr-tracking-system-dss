package com.mk.qr_tracking_system_dss.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE rack SET deleted = true WHERE id = ?")
@Where(clause = "deleted = false")
@Entity
public class Rack extends BaseEntity {

    @NotNull(message = "Rafın maksimum kapasitesi gerekli")
    @Min(value = 100, message = "Rafın maksimum kapasitesi 100 veya daha fazla olmalıdır")
    private double maxWeightCapacity;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY) // currentWeight = sum(packages.packageWeight) (Dışarıdan gönderilemez)
    private double currentWeight;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY) // freeWeight = maxWeightCapacity - currentWeight (Dışarıdan gönderilemez)
    private double freeWeight; // Başlangıçta maxWeightCapacity kadar olacak

    @Column(unique = true)
    @NotBlank(message = "Rafın konumu belirtilmeli")
    @Pattern(regexp = "^[A-Z]([1-9][0-9]?|100)$", message = "Konum A1 ile Z100 arasında olmalıdır.")
    private String location;

    @JsonIgnore
    @OneToMany(mappedBy = "rack")
    private List<Package> packages;

    @Column(nullable = false)
    @JsonIgnore
    private boolean deleted = Boolean.FALSE;
}
