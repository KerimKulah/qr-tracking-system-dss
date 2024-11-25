import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useDispatch } from 'react-redux';
import { exitPackage } from '../redux/slices/packageSlice';

const PackageExit = () => {
    const [packageId, setPackageId] = useState(null); // QR'dan gelen packageId
    const [confirmExit, setConfirmExit] = useState(false); // Onay durumu
    const qrCodeScannerRef = useRef(null); // QR kod tarayıcı referansı
    const [isScannerActive, setIsScannerActive] = useState(false); // Tarayıcı durumu
    const dispatch = useDispatch();

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("qr-reader"); // QR okuyucu tanımlama
        qrCodeScannerRef.current = html5QrCode;

        const startScanner = async () => {
            try {
                await html5QrCode.start(
                    { facingMode: "environment" }, // Arka kamera
                    { fps: 10, qrbox: 250 }, // Tarama ayarları
                    (decodedText) => {
                        console.log(`Decoded QR Code: ${decodedText}`);
                        const id = decodedText.split('/PackageDetail/')[1]; // packageId'yi ayrıştır
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
            } catch (err) {
                console.error(`QR Kod tarayıcı başlatılamadı: ${err}`);
            }
        };

        startScanner();

        // Temizlik işlemleri: Tarayıcıyı durdur
        return () => {
            stopScanner();
        };
    }, []);

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
                    alert('Paket başarıyla çıkarıldı!');
                    setPackageId(null); // State sıfırla
                    setConfirmExit(false);
                })
                .catch((error) => {
                    alert('Paket çıkışı sırasında bir hata oluştu.');
                    console.error(error);
                });
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Paket Çıkışı</h1>
            {/* QR Okuyucu için Div */}
            <div id="qr-reader" style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}></div>

            {/* Onay Penceresi */}
            {confirmExit && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
                    <p>
                        Paket ID: <strong>{packageId}</strong>
                    </p>
                    <p>Paket çıkışını yapmak istiyor musunuz?</p>
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
        </div>
    );
};

export default PackageExit;
