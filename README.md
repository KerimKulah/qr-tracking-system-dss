# QR Kodlu Depo Takip ve Karar Destek Sistemi

## 1. Proje Tanımı
QR Kodlu Ürün(Depo) Takip ve Karar Destek Sistemi, depo ortamlarında ürünlerin etkili bir şekilde yönetilmesi, izlenmesi ve güncellenmesi amacıyla geliştirilmiş bir yazılımdır. 
Mobil cihazlar aracılığıyla QR kodlarının okutulabilmesi ve ürün bilgilerine erişim sağlanabilmesi, stokların güncellenmesi ve web üzerinden ürünlerin yönetilmesi üzerine kuruludur.

**Not:** Bu proje şu an da mühendislik projem olarak geliştirilmektedir.

## 2. Hedef Kullanıcılar
- **E-Ticaret Depoları**: Online siparişleri hızlı bir şekilde karşılamak isteyen firmalar.
- **İlaç Depoları**: Son kullanma tarihleri ve stok durumlarını hızlı bir şekilde kontrol etmek isteyen sağlık sektöründe depolar.
- **Gıda Depoları**: Gıda ürünlerinin tazeliğini ve son kullanma tarihlerini takip eden depolar.
- **Üretim Tesisleri**: Hammaddelerin ve bileşenlerin yönetimini kolaylaştırmak isteyen fabrikalar.
- **Depo Personelleri**: Ürün giriş/çıkış işlemlerini gerçekleştiren çalışanlar.
- **Yöneticiler**: Depo yönetimini ve personel performansını izleyen üst düzey yöneticiler.

## 3. Kullanım Senaryoları
- **Ürün Girişi**: Yeni ürünler sisteme eklenir ve QR kod oluşturulur. QR kod, ürün bilgilerini erişmeyi sağlar.
- **Ürün Çıkışı**: QR kod okutularak veya web paneli üzerinden ürün çıkışları gerçekleştirilir.
- **Stok Takibi**: QR kodlar kullanılarak anlık stok durumu güncellenir.
- **Son Kullanma Tarihi Takibi**: Son kullanma tarihi yaklaşan ürünler için otomatik uyarılar gönderilir.
- **Raf Yönetimi**: Ürünlerin konumları ve raf yerleşimleri takip edilir.
- **Raporlama ve Analiz**: Personel performansı ve ürün hareketleri izlenir.

## 4. İş Süreci

### 4.1 Ürün Tedarik Süreci
- **Tedarik ve Sipariş**: Tedarikçilerden ürün siparişleri gerçekleştirilir.
- **Ürün Kabulü ve Kontrol**: Gelen ürünler depo personeli tarafından kontrol edilir ve sisteme eklenir.

### 4.2 QR Kod Oluşturma ve Ürün Etiketleme
- **QR Kod Oluşturma**: Sisteme eklenen her ürün için otomatik QR kod oluşturulur.
- **Etiketleme**: Ürünlere fiziksel olarak QR kod etiketleri yapıştırılır.

### 4.3 Ürün Raflandırma ve Depo Konumlandırma
- **Raf Yönetimi**: Ürünlerin raflarda yerleştirilmesi ve doluluk durumları kaydedilir.
- **Uygun Raf Önerisi**: Depo alanının verimli kullanımını sağlamak amacıyla raf önerileri sunulur. 

### 4.4 Stok ve Ürün Yönetimi
- **Stok Takibi**: Ürünlerin giriş-çıkışları sistemde otomatik olarak güncellenir.
- **Son Kullanma Tarihi Takibi**: Son kullanma tarihi yaklaşan ürünler için uyarılar oluşturulur.

### 4.5 Mobil Cihazlarla QR Kod Okuma
- **Mobil Cihaz Kullanımı**: Depo personeli mobil cihazlar ile QR kodları okutarak ürün bilgilerine erişir.
- **Anlık Güncellemeler**: QR kod okuma işlemiyle veriler güncellenir.

### 4.6 Ürün Çıkışı ve Dağıtım
- **Çıkış Talimatı**: Ürünlerin çıkış süreci QR kod okutularak yapılabilir.
- **Stok Güncellemesi**: Ürün çıkışında sistemde stok durumu otomatik olarak güncellenir.

### 4.7 Karar Destek Sistemi (KDS) İşlevleri (Henüz Eklenmedi)
- **Düşük Stok Uyarıları**: Düşük stok seviyeleri için otomatik bildirimler gönderilir.
- **Son Kullanma Tarihi Uyarıları**: Yaklaşan son kullanma tarihleri için bildirimler oluşturulur.
- **Performans Raporlaması**: Personel performansı ve ürün tüketimi hakkında raporlar hazırlanır.

### 4.8 Yönetici ve Personel Paneli 
- **Personel Yönetimi**: Yönetici paneli üzerinden personel çıkarma gibi işlemleri yapılabilir.
- **Performans Raporları**: Personel performansı izlenir ve analiz edilir.

## 5. Faydaları
- **Gerçek Zamanlı Bilgi**: QR kodlar ile anlık bilgi erişimi sağlar.
- **İyileştirilmiş Stok Yönetimi**: Ürünlerin son kullanma tarihleri etkin bir şekilde takip edilir.
- **Kullanıcı Dostu Arayüz**: Web ve mobil paneller ile kullanıcıların ürünleri kolayca yönetmesini sağlar.
- **Performans Takibi**: Personel performansını izlemeyi ve iyileştirmeleri kolaylaştırır.

## 6. Kullanılan Teknolojiler

### Frontend (Başlanmadı)
- **React**:

### Backend
- **Java**: Uygulamanın temel programlama dili; nesne yönelimli programlama, çoklu iş parçacığı, ve koleksiyonlar gibi temel kavramları destekler.
- **Spring Boot**: Backend uygulama geliştirme için.
- **Spring Security & JWT**: Güvenlik ve kimlik doğrulama işlemleri için.
- **MySQL**: Veri yönetimi ve saklama için.
- **Lombok**: Java kodunu daha okunabilir hale getirmek için.
- **JPA (Java Persistence API)**: Veritabanı ile etkileşim için.
- **ZXing**: QR kodları oluşturmak ve okumak için kütüphane.

## 7. API Endpoint'leri
### Kullanıcı Yönetimi
| HTTP Method | Endpoint                      | Açıklama                                         |
|-------------|-------------------------------|--------------------------------------------------|
| POST        | /auth/register                | Yeni bir kullanıcı kaydı yapar.                  |
| POST        | /auth/login                   | Kullanıcı giriş işlemi gerçekleştirir.           |
| GET         | /users                        | Tüm kullanıcıları listeler.                       |
| GET         | /users/movements/{id}        | Belirtilen kullanıcı ID'sine ait hareketleri alır. |
| GET         | /users/current                | Geçerli kullanıcıyı alır.                        |

### Paket Yönetimi
| HTTP Method | Endpoint                      | Açıklama                                         |
|-------------|-------------------------------|--------------------------------------------------|
| POST        | /packages/add                 | Yeni bir paket ekler. (Örnek yolu: /packages/add?productId=1&rackId=1) |
| DELETE      | /packages/exit/{id}          | Belirtilen ID'ye sahip paketin çıkışını yapar.  |
| GET         | /packages/{id}                | Belirtilen ID'ye sahip paketi alır.             |
| GET         | /packages                     | Tüm paketleri listeler.                          |
| PUT         | /packages/update/{id}         | Belirtilen ID'ye sahip paketi günceller.        |
| PUT         | /packages/changeRack/{packageId}/{newRackId} | Paket rafını değiştirir. |

### Ürün Yönetimi
| HTTP Method | Endpoint                      | Açıklama                                         |
|-------------|-------------------------------|--------------------------------------------------|
| POST        | /products/add                 | Yeni bir ürün ekler.                            |
| POST        | /products/addAll              | Birden fazla ürün ekler.                        |
| DELETE      | /products/delete/{id}         | Belirtilen ID'ye sahip ürünü siler.             |
| GET         | /products/{id}                | Belirtilen ID'ye sahip ürünü alır.             |
| GET         | /products                     | Tüm ürünleri listeler.                          |
| GET         | /products/search              | Ürünleri isme göre arar. (Örnek yolu: /products/search?name=Sample) |
| PUT         | /products/update/{id}         | Belirtilen ID'ye sahip ürünü günceller.        |
| GET         | /products/{productId}/packages | Belirtilen ürün ID'sine ait paketleri alır.    |
| GET         | /products/{productId}/totalQuantity | Belirtilen ürün ID'sinin toplam miktarını döner. |

### Raf Yönetimi
| HTTP Method | Endpoint                      | Açıklama                                         |
|-------------|-------------------------------|--------------------------------------------------|
| POST        | /racks/add                    | Yeni bir raf ekler.                             |
| DELETE      | /racks/delete/{id}            | Belirtilen ID'ye sahip rafı siler.             |
| PUT         | /racks/update/{id}            | Belirtilen ID'ye sahip rafı günceller.         |
| GET         | /racks/{id}                   | Belirtilen ID'ye sahip rafı alır.              |
| GET         | /racks                        | Tüm rafları listeler.                          |
| GET         | /racks/{rackId}/packages      | Belirtilen raf ID'sine ait paketleri alır.     |
| GET         | /racks/findSuitableRacks/{productId}/{quantityOfProduct} | Ürün ve miktara göre uygun rafları bulur. |

### Yönetici İşlemleri
| HTTP Method | Endpoint                      | Açıklama                                         |
|-------------|-------------------------------|--------------------------------------------------|
| POST        | /admin/makeAdmin/{id}        | Kullanıcıyı admin yapar. (Sadece admin rollü biri kullanabilir.) |
| DELETE      | /admin/deleteUser/{id}       | Belirtilen ID'ye sahip kullanıcıyı siler.       |


