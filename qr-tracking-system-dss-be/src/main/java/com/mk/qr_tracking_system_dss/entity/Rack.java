package com.mk.qr_tracking_system_dss.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Rack extends BaseEntity {

    @NotNull(message = "Rafın maksimum ağırlığı gerekli")
    private double maxWeightCapacity;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY) // currentWeightin dışarıdan girilmesini engeller.
    private double currentWeight;

    @Column(unique = true)
    @NotBlank(message = "Rafın konumu belirtilmeli")
    // @Pattern(regexp = "^[A-Z][1-9][0-9]?$", message = "Konum A1 ile Z100 arasında olmalıdır.")
    private String location;

    @JsonIgnore
    @OneToMany(mappedBy = "rack")
    private List<Package> packages;
}
