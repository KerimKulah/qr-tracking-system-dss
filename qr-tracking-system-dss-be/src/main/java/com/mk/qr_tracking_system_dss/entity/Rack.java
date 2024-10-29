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
public class Rack extends BaseEntity {

    private double maxWeightCapacity;
    private double currentWeight;

    @Column(unique = true)
    private String location;

    @JsonIgnore
    @OneToMany(mappedBy = "rack")
    private List<Package> packages;
}
