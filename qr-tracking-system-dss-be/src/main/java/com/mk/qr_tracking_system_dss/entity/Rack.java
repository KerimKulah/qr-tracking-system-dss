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
public class Rack extends BaseEntity {

    private double maxWeightCapacity;
    private double currentWeight;
    private String location;

    @OneToMany(mappedBy = "rack")
    private List<Package> packages;
}
