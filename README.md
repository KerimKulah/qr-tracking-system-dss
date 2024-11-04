# QR Kodlu Depo Takip ve Karar Destek Sistemi

## 1. Proje Tanımı
QR Kodlu Ürün(Depo) Takip ve Karar Destek Sistemi, depo ortamlarında ürünlerin etkili bir şekilde yönetilmesi, izlenmesi ve güncellenmesi amacıyla geliştirilmiş bir yazılımdır. 
Mobil cihazlar aracılığıyla QR kodlarının okutulabilmesi ve ürün bilgilerine erişim sağlanabilmesi, stokların güncellenmesi ve web üzerinden ürünlerin yönetilmesi üzerine kuruludur.

- **Not:** Bu proje şu an da mühendislik projem olarak geliştirilmektedir.
- **Not:** Backend endpointleri en aşağıda verildi.

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
-**React**: Kullanılacak
-**Bootstrap**: Kullanılacak

### Backend
- **Java**: Uygulamanın temel programlama dili; nesne yönelimli programlama, çoklu iş parçacığı, ve koleksiyonlar gibi temel kavramları destekler.
- **Spring Boot**: Backend uygulama geliştirme için.
- **Spring Security & JWT**: Güvenlik ve kimlik doğrulama işlemleri için.
- **MySQL**: Veri yönetimi ve saklama için.
- **Lombok**: Java kodunu daha okunabilir hale getirmek için.
- **JPA (Java Persistence API)**: Veritabanı ile etkileşim için.
- **ZXing**: QR kodları oluşturmak ve okumak için kütüphane.

## 7. Backend (API) Endpoint'leri

## AdminController

| HTTP Method | Endpoint                          | Açıklama                       |
|-------------|-----------------------------------|--------------------------------|
| POST        | `/admin/makeAdmin/{id}`           | Kullanıcıyı admin yapar        |
| GET         | `/admin/dashboard`                | Deneme amaçlı dashboard sayfası|
| DELETE      | `/admin/deleteUser/{id}`          | Kullanıcıyı siler              |

## AuthController

| HTTP Method | Endpoint                          | Açıklama                       |
|-------------|-----------------------------------|--------------------------------|
| POST        | `/auth/login`                     | Kullanıcı giriş yapar          |
| POST        | `/auth/register`                  | Kullanıcı kaydolur             |

## PackageController

| HTTP Method | Endpoint                                      | Açıklama                       |
|-------------|-----------------------------------------------|--------------------------------|
| POST        | `/packages/add`                               | Yeni paket ekler               |
| DELETE      | `/packages/exit/{id}`                         | Paketi çıkış yapar             |
| GET         | `/packages/{id}`                              | Paket detayını getirir         |
| GET         | `/packages`                                   | Tüm paketleri getirir          |
| PUT         | `/packages/update/{id}`                       | Paketi günceller               |
| PUT         | `/packages/changeRack/{packageId}/{newRackId}`| Paketin rafını değiştirir      |

## PackageDetailController

| HTTP Method | Endpoint                          | Açıklama                       |
|-------------|-----------------------------------|--------------------------------|
| GET         | `/PackageDetail/{PackageId}`      | Paket detay sayfasını gösterir |

## ProductController

| HTTP Method | Endpoint                                      | Açıklama                       |
|-------------|-----------------------------------------------|--------------------------------|
| POST        | `/products/add`                               | Yeni ürün ekler                |
| POST        | `/products/addAll`                            | Toplu ürün ekler               |
| DELETE      | `/products/delete/{id}`                       | Ürünü siler                    |
| GET         | `/products/{id}`                              | Ürün detayını getirir          |
| GET         | `/products`                                   | Tüm ürünleri getirir           |
| GET         | `/products/search`                            | Ürün arar                      |
| PUT         | `/products/update/{id}`                       | Ürünü günceller                |
| GET         | `/products/{productId}/packages`              | Ürünün paketlerini getirir     |
| GET         | `/products/{productId}/totalQuantity`         | Ürünün toplam miktarını getirir|

## RackController

| HTTP Method | Endpoint                                      | Açıklama                       |
|-------------|-----------------------------------------------|--------------------------------|
| POST        | `/racks/add`                                  | Yeni raf ekler                 |
| DELETE      | `/racks/delete/{id}`                          | Rafı siler                     |
| PUT         | `/racks/update/{id}`                          | Rafı günceller                 |
| GET         | `/racks/{id}`                                 | Raf detayını getirir           |
| GET         | `/racks`                                      | Tüm rafları getirir            |
| GET         | `/racks/{rackId}/packages`                    | Raftaki tüm paketleri getirir  |
| GET         | `/racks/findSuitableRacks/{productId}/{quantityOfProduct}` | Uygun rafları bulur           |

## UserController

| HTTP Method | Endpoint                          | Açıklama                       |
|-------------|-----------------------------------|--------------------------------|
| GET         | `/users`                          | Tüm kullanıcıları getirir      |
| GET         | `/users/movements/{id}`           | Kullanıcının hareketlerini getirir |
| GET         | `/users/current`                  | Mevcut kullanıcıyı getirir     |
| POST        | `/users/changePassword`           | Kullanıcı şifresini değiştirir |

