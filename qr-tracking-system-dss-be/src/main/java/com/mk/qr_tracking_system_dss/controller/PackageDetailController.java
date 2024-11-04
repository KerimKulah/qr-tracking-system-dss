package com.mk.qr_tracking_system_dss.controller;

import com.mk.qr_tracking_system_dss.entity.Package;
import com.mk.qr_tracking_system_dss.service.PackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
@RequiredArgsConstructor
public class PackageDetailController {

    private final PackageService packageService;

    @GetMapping("/PackageDetail/{PackageId}")
    public String getPackageInfo(@PathVariable Long PackageId, Model model) {
        Package pkg = packageService.getPackageById(PackageId);
        model.addAttribute("package", pkg);
        return "PackageDetail";
    }
}
