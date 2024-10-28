package com.mk.qr_tracking_system_dss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class})
public class QrTrackingSystemDssApplication {

	public static void main(String[] args) {
		SpringApplication.run(QrTrackingSystemDssApplication.class, args);
	}

}
