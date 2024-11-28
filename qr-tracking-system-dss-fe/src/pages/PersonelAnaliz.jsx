import React from 'react'
import { Paper, FormControl, InputLabel, Select, MenuItem, Typography, Button } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovements } from '../redux/slices/adminSlice'
import { getAllUsers } from '../redux/slices/adminSlice'

function PersonelAnaliz() {
    const dispatch = useDispatch();
    const userMovements = useSelector(state => state.admin.userMovements); // Redux'tan hareketleri al
    const users = useSelector(state => state.admin.users); // Redux'tan kullanıcıları al
    const [selectedUserMovements, setSelectedUserMovements] = useState([]); // Seçilen kullanıcının hareketleri
    const [selectedUserId, setSelectedUserId] = useState(null); // Seçilen kullanıcı id'si
    const [timeRange, setTimeRange] = useState('7'); // Zaman dilimi (7 gün, 30 gün, 90 gün)

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    // Grafik verilerini hazırlama
    const getGraphData = () => {
        if (!selectedUserMovements || selectedUserMovements.length === 0) return []; // Eğer hareketler yoksa boş döndür
        const entryCount = selectedUserMovements.filter(movement => movement.movementType === 'PACKAGE_ENTRY').length;
        const exitCount = selectedUserMovements.filter(movement => movement.movementType === 'PACKAGE_EXIT').length;

        return [
            { name: 'Paket Girişi', islem_sayisi: entryCount },
            { name: 'Paket Çıkışı', islem_sayisi: exitCount },
        ];
    };

    // userId değiştiğinde getMovements'i çağırarak veriyi güncelleriz
    useEffect(() => {
        if (selectedUserId) {
            dispatch(getMovements(selectedUserId)); // getMovements action'ını çağırıyoruz
        }
    }, [selectedUserId, dispatch]); // selectedUserId değiştiğinde tetiklenir

    useEffect(() => {
        // Redux'tan gelen userMovements'ı selectedUserMovements'e atıyoruz
        setSelectedUserMovements(userMovements);
    }, [userMovements]); // userMovements güncellendikçe tetiklenir

    // Performans değerlendirmesini yapma
    const getPerformanceStatus = () => {
        const totalTransactions = selectedUserMovements.filter(
            movement => movement.movementType === 'PACKAGE_ENTRY' || movement.movementType === 'PACKAGE_EXIT'
        ).length;

        if (totalTransactions > 30) return 'Verimli'; // 30'dan fazla işlem: Verimli
        if (totalTransactions >= 10) return 'Orta'; // 10-30 arası işlem: Orta
        return 'Verimsiz'; // 10'dan az işlem: Verimsiz
    };

    // Performans durumu için renk kodlama
    const getPerformanceColor = () => {
        const performance = getPerformanceStatus();
        if (performance === 'Verimli') return 'green';
        if (performance === 'Orta') return 'yellow';
        return 'red';
    };

    // Zaman dilimi filtresi uygulama
    const filterMovementsByTime = () => {
        if (!selectedUserMovements) return [];
        const currentDate = new Date();
        const filteredMovements = selectedUserMovements.filter(movement => {
            const movementDate = new Date(movement.timestamp); // Hareketin tarih bilgisini al
            const timeDifference = currentDate - movementDate; // Zaman farkı
            const daysDifference = timeDifference / (1000 * 3600 * 24); // Gün farkı

            if (timeRange === '7' && daysDifference <= 7) return true;
            if (timeRange === '30' && daysDifference <= 30) return true;
            if (timeRange === '90' && daysDifference <= 90) return true;
            return false;
        });
        return filteredMovements;
    };

    // Zaman dilimini değiştirdiğinde hareketleri güncelle
    const handleTimeRangeChange = (event) => {
        setTimeRange(event.target.value);
    };

    return (
        <div>
            <h2>PERFORMANS GRAFİĞİ</h2>
            {/* Personel Performans Grafiği */}
            <Paper elevation={3} sx={{ padding: '1rem', marginTop: '2rem' }}>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Personel Seç</InputLabel>
                    <Select
                        value={selectedUserId || ''}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        label="Personel Seç">
                        {users.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.fullName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Zaman dilimi seçimi */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Zaman Dilimi Seç</InputLabel>
                    <Select
                        value={timeRange}
                        onChange={handleTimeRangeChange}
                        label="Zaman Dilimi Seç">
                        <MenuItem value="7">Son 7 Gün</MenuItem>
                        <MenuItem value="30">Son 30 Gün</MenuItem>
                        <MenuItem value="90">Son 90 Gün</MenuItem>
                    </Select>
                </FormControl>

                {
                    selectedUserId && (
                        <>
                            <Typography variant="h6" sx={{ marginTop: '1rem', marginBottom: '1rem', color: getPerformanceColor() }}>
                                Performans Durumu: {getPerformanceStatus()}
                            </Typography>

                            <ResponsiveContainer fullWidth height={300}>
                                <BarChart layout="horizontal" data={getGraphData()}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="islem_sayisi" fill="#003366" barSize={15} />
                                </BarChart>
                            </ResponsiveContainer>
                        </>
                    )
                }
            </Paper >
        </div>
    )
}

export default PersonelAnaliz;
