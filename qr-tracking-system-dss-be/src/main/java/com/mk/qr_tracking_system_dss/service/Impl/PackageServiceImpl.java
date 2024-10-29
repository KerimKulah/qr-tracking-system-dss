package com.mk.qr_tracking_system_dss.service.Impl;

import com.mk.qr_tracking_system_dss.repository.PackageRepository;
import com.mk.qr_tracking_system_dss.repository.ProductRepository;
import com.mk.qr_tracking_system_dss.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PackageServiceImpl implements PackageService {

    @Autowired
    private PackageRepository packageRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public void addPackage(Package pkg, Long productId) {
    }


}
