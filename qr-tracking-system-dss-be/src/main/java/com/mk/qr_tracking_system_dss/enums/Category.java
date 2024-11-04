package com.mk.qr_tracking_system_dss.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum Category {
    Elektronik,
    Gida,
    Giyim,
    Spor,
    Egitim,
    Kozmetik,
    Oyuncak,
    Diger,
    Deleted;

    public static List<String> getValues() {
        return Arrays.stream(Category.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }
}


