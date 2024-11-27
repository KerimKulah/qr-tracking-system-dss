import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { exitPackage } from "../redux/slices/packageSlice";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const PackageExit = () => {
    const [packageId, setPackageId] = useState(null); // QR'dan gelen packageId
    const [confirmExit, setConfirmExit] = useState(false); // Onay durumu
    const qrCodeScannerRef = useRef(null); // QR kod tarayıcı referansı
    const [isScannerActive, setIsScannerActive] = useState(false); // Tarayıcı durumu
    const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false); // Kamera izni durumu
    const dispatch = useDispatch();

    const startScanner = async () => {
        const html5QrCode = new Html5Qrcode("qr-reader");
        qrCodeScannerRef.current = html5QrCode;

        try {
            const hasPermission = await navigator.mediaDevices.getUserMedia({ video: true });
            if (hasPermission) {
                await html5QrCode.start(
                    { facingMode: "environment" }, // Arka kamera
                    { fps: 10, qrbox: 250 }, // Tarama ayarları
                    (decodedText) => {
                        console.log(`Decoded QR Code: ${decodedText}`);
                        const id = decodedText.split("/PackageDetail/")[1]; // packageId'yi ayrıştır
                        if (id) {
                            setPackageId(id); // packageId'yi ayarla
                            setConfirmExit(true); // Onay modalını aç
                            stopScanner(); // Tarayıcıyı durdur
                        }
                    },
                    (errorMessage) => {
                        console.warn(`QR Kod hatası: ${errorMessage}`);
                    }
                );
                setIsScannerActive(true); // Tarayıcı aktif durumda
            }
        } catch (err) {
            console.error(`Kamera izni alınamadı veya tarayıcı başlatılamadı: ${err}`);
            setCameraPermissionDenied(true); // Kamera izni reddedildi
        }
    };

    const stopScanner = async () => {
        if (qrCodeScannerRef.current && isScannerActive) {
            try {
                await qrCodeScannerRef.current.stop();
                setIsScannerActive(false); // Tarayıcı artık aktif değil
                console.log("Tarayıcı başarıyla durduruldu.");
            } catch (err) {
                console.warn("Tarayıcı durdurulurken bir hata oluştu:", err);
            }
        }
    };

    const confirmPackageExit = () => {
        if (packageId) {
            dispatch(exitPackage(packageId))
                .then(() => {
                    alert("Paket başarıyla çıkarıldı!");
                    setPackageId(null); // State sıfırla
                    setConfirmExit(false);
                })
                .catch((error) => {
                    alert("Paket çıkışı sırasında bir hata oluştu.");
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h1>Paket Çıkışı</h1>
            <Paper
                elevation={3}
                sx={{
                    padding: '1rem',
                    width: '100%',
                }}>

                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    QR Okuyucuyu butona basarak başlatabilirsiniz. Tarayıcıyı kullanarak paket çıkışı yapabilirsiniz.
                </Typography>
                {/* Kamera Tarayıcıyı Başlat Butonu */}
                {!isScannerActive && (
                    <Button
                        onClick={startScanner}
                        fullWidth
                        style={{ padding: "10px 20px", backgroundColor: "#003366", color: "white", marginBottom: "20px" }}
                    >
                        QR Kod Tarayıcıyı Başlat
                    </Button>
                )}

                {/* QR Okuyucu için Div */}
                <div id="qr-reader" style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}></div>

                {/* Kamera İzni Reddedildi Mesajı */}
                {cameraPermissionDenied && (
                    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid red", color: "red" }}>
                        <p>Kamera izni verilmedi. Kamera erişimi olmadan QR kod tarayıcı çalışmaz.</p>
                        <p>Lütfen tarayıcı ayarlarından kamera izni verin ve sayfayı yeniden yükleyin.</p>
                    </div>
                )}

                {/* Onay Penceresi */}
                {confirmExit && (
                    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
                        <p>
                            Paket ID: <strong>{packageId}</strong>
                        </p>
                        <p>Paket çıkışını onaylıyor musunuz?</p>
                        <button
                            onClick={confirmPackageExit}
                            style={{ marginRight: "10px", padding: "10px 20px", backgroundColor: "green", color: "white" }}
                        >
                            Evet
                        </button>
                        <button
                            onClick={() => setConfirmExit(false)}
                            style={{ padding: "10px 20px", backgroundColor: "red", color: "white" }}
                        >
                            Hayır
                        </button>
                    </div>
                )}
            </Paper>
        </div>
    );
};

export default PackageExit;
