package com.mk.qr_tracking_system_dss.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Component;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;

@Component
public class QRCodeGenerator {
    public String generateQRCode(Long packageId) {
        String data = "https://172.20.10.3:8080/PackageDetail/" + packageId;
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, 300, 300);
            BufferedImage qrImage = MatrixToImageWriter.toBufferedImage(bitMatrix);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(qrImage, "PNG", baos);
            byte[] qrCodeBytes = baos.toByteArray();
            return Base64.getEncoder().encodeToString(qrCodeBytes);
        } catch (WriterException | IOException e) {
            System.err.println("QR kodu oluşturulurken hata oluştu: " + e.getMessage());
            return null;
        }
    }

}

