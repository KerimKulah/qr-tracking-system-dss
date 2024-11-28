import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { exitPackage } from "../redux/slices/packageSlice";
import { Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import successSoundFile from '../assets/sounds/success.mp3';

const PackageExit = () => {
    const [packageId, setPackageId] = useState(null); // QR'dan gelen packageId
    const [confirmExit, setConfirmExit] = useState(false); // Onay durumu
    const qrCodeScannerRef = useRef(null); // QR kod tarayıcı referansı
    const [isScannerActive, setIsScannerActive] = useState(false); // Tarayıcı durumu
    const [cameraPermissionDenied, setCameraPermissionDenied] = useState(false); // Kamera izni durumu
    const [exitSuccess, setExitSuccess] = useState(false); // Çıkışın başarı durumu
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
                    const successSound = new Audio(successSoundFile);
                    successSound.play();
                    setExitSuccess(true); // Çıkış başarılı oldu mesajını g
                    setPackageId(null); // Paket ID'sini sıfırla
                    setConfirmExit(false); // Onay penceresini kapat
                    setTimeout(() => {
                        setExitSuccess(false); // Başarı mesajını kapat
                    }, 2000);
                })
                .catch((error) => {
                    alert("Paket çıkışı sırasında bir hata oluştu.");
                    console.error(error);
                });
        }
    };

    return (
        <div>
            <h2>PAKET ÇIKIŞI</h2>
            <Paper
                elevation={3}
                sx={{
                    padding: '1rem',
                    width: '100%',
                }}>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Tarayıcıyı butona basarak başlatın ve paketteki QR kodu okutarak çıkışını yapın.
                </Typography>
                {/* Kamera Tarayıcıyı Başlat Butonu */}
                {!isScannerActive && !exitSuccess && (
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
                    <div
                        style={{
                            marginTop: "20px",
                            padding: "10px",
                            border: "1px solid black",
                            position: "fixed", // Sabitleme
                            bottom: "20px", // Alt kısma yapışması için
                            left: "50%", // Ekranın ortasına hizalanma
                            transform: "translateX(-50%)", // Yatayda tam ortalama
                            width: "90%", // Mobil uyumlu genişlik
                            maxWidth: "400px", // Maksimum genişlik
                            zIndex: 1000, // Üstte görünmesi için
                            backgroundColor: "#fff", // Arka plan rengini beyaz yapalım
                            borderRadius: "10px", // Köşe yuvarlama
                        }}
                    >
                        <p>
                            Paket ID: <strong>{packageId}</strong>
                        </p>
                        <p>Paket çıkışını onaylıyor musunuz?</p>
                        <button
                            onClick={confirmPackageExit}
                            style={{
                                marginRight: "10px",
                                padding: "10px 20px",
                                backgroundColor: "green",
                                color: "white",
                                borderRadius: "5px"
                            }}
                        >
                            Evet
                        </button>
                        <button
                            onClick={() => setConfirmExit(false)}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "red",
                                color: "white",
                                borderRadius: "5px"
                            }}
                        >
                            Hayır
                        </button>
                    </div>
                )}

                {/* Başarı Durumu Mesajı */}
                {exitSuccess && (
                    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid green", color: "green" }}>
                        <p>Paket başarıyla çıkarıldı!</p>
                    </div>
                )}
            </Paper>
        </div>
    );
};

export default PackageExit;
