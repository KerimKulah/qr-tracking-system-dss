<p align="center">
  <img src="https://github.com/user-attachments/assets/a662fe1c-4b93-4ee6-9d97-38f71ace8fa0" width="400" height="240" />
</p>

<h1 align="center">QR Kodlu Depo Takip ve Karar Destek Sistemi (Qrtaksis)</h1>

## 1. Proje Tanımı
QR Kodlu Ürün(Depo) Takip ve Karar Destek Sistemi, depo ortamlarında ürünlerin etkili bir şekilde yönetilmesi, izlenmesi ve güncellenmesi amacıyla geliştirilmiş bir yazılımdır. 
Mobil cihazlar aracılığıyla QR kodlarının okutulabilmesi ve ürün bilgilerine erişim sağlanabilmesi, stokların güncellenmesi ve web üzerinden ürünlerin yönetilmesi üzerine kuruludur.

## 2. Kullanılan Teknolojiler
- **Java 21 (JDK 21)**: Uygulamanın temel programlama dili; nesne yönelimli programlama, çoklu iş parçacığı ve koleksiyonlar gibi kavramları destekler.
- **Maven Wrapper**: Maven'ın belirli bir sürümünü projeye entegre etmek ve projeyi çalıştırmak için kullanılan bir araçtır. Projeyi herhangi bir Maven kurulumu olmadan, doğru sürümle çalıştırmanıza olanak tanır.
- **Spring Web**: HTTP istek ve yanıtlarını yönetir, RESTful servisler ve web uygulamaları için gerekli altyapıyı sunar.
- **Spring Security & JWT**: Güvenlik ve kimlik doğrulama işlemlerini sağlar.
- **MySQL**: Verilerin yönetimi ve saklanması için kullanılır.
- **Lombok**: Java kodunu sadeleştirir ve okunabilirliği artırır.
- **JPA (Java Persistence API)**: Veritabanı ile etkileşim için kullanılır.
- **ZXing**: QR kodları oluşturma ve okuma kütüphanesidir.
- **Thymeleaf**: Sunucu tarafında sayfa gösterimi yapar.
- **Vite**: Hızlı bir geliştirme sunucusu ve build aracı, özellikle modern JavaScript projelerinde kullanılır.
- **NodeJS (20.18)**: JavaScript çalıştırma ortamı, özellikle frontend ve backend geliştirmede kullanılır.
- **NPM (10.8)**: Node.js için paket yöneticisi, bağımlılıkları yönetir ve projeyi çalıştırmak için gerekli araçları sağlar.
- **React**: Dinamik ve bileşen tabanlı kullanıcı arayüzleri oluşturmak için kullanılan bir JavaScript kütüphanesi.
- **Metarial UI**: Google’ın Material Design prensiplerine dayalı, şık ve uyumlu UI bileşenleri sunar.
- **Python, Flask, pandas, scikit-learn ile Kategori Tahmin Modeli**: Flask ile sunulan Random Forest tabanlı model, ürün adına göre kategori tahmini yapar. scikit-learn ve pandas kullanılarak eğitildi. 
- **Diğer**: Redux Toolkit, html5-qrcode, Router-Dom ...

## 3. Hedef Kullanıcılar
- **E-Ticaret Depoları**: Online siparişleri hızlı bir şekilde karşılamak isteyen firmalar.
- **İlaç Depoları**: Son kullanma tarihleri ve stok durumlarını hızlı bir şekilde kontrol etmek isteyen sağlık sektöründe depolar.
- **Gıda Depoları**: Gıda ürünlerinin tazeliğini ve son kullanma tarihlerini takip eden depolar.
- **Üretim Tesisleri**: Hammaddelerin ve bileşenlerin yönetimini kolaylaştırmak isteyen fabrikalar.
- **Depo Personelleri**: Ürün giriş/çıkış işlemlerini gerçekleştiren çalışanlar.
- **Yöneticiler**: Depo yönetimini ve personel performansını izleyen üst düzey yöneticiler.

## 4. Kullanım Senaryoları
- **Paket Girişi**: Yeni ürünler ve paketler sisteme eklenir ve QR kod oluşturulur. QR kod, paket bilgilerine erişmeyi sağlar.
- **Paket Çıkışı**: QR kod okutularak veya web paneli üzerinden paket çıkışları gerçekleştirilir.
- **Stok Takibi**: QR kodlar kullanılarak paketin bilgileri görüntülenebilir.
- **Son Kullanma Tarihi Takibi**: Son kullanma tarihi yaklaşan ürünler için otomatik uyarılar gönderilir.
- **Raf Yönetimi**: Ürünlerin konumları ve raf yerleşimleri takip edilir. Uygun raflar paketin girişi yapılırken sistem tarafından sağlanır.
- **Raporlama**: Personel hareketleri izlenir.

## 5. İş Süreci

### 5.1 Ürün Tedarik Süreci
- **Tedarik ve Sipariş**: Tedarikçilerden ürün siparişleri gerçekleştirilir.
- **Ürün Kabulü ve Kontrol**: Gelen ürünler depo personeli tarafından kontrol edilir ve sisteme eklenir.

### 5.2 QR Kod Oluşturma ve Ürün Etiketleme
- **QR Kod Oluşturma**: Sisteme eklenen her paket için otomatik QR kod oluşturulur.
- **Etiketleme**: Paketlere fiziksel olarak QR kod etiketleri yapıştırılır.

### 5.3 Ürün Raflandırma ve Depo Konumlandırma
- **Raf Yönetimi**: Paketlerin raflarda yerleştirilmesi ve doluluk durumları kaydedilir.
- **Uygun Raf Önerisi**: Depo alanının verimli kullanımını sağlamak amacıyla raf önerileri sunulur. 

### 5.4 Stok ve Ürün Yönetimi
- **Stok Takibi**: Paketlerin giriş-çıkışları sistemde otomatik olarak güncellenir.
- **Son Kullanma Tarihi Takibi**: Son kullanma tarihi yaklaşan paketler için uyarılar oluşturulur.

### 5.5 Mobil Cihazlarla QR Kod Okuma
- **Mobil Cihaz Kullanımı**: Depo personeli mobil cihazlar ile QR kodları okutarak ürün bilgilerine erişir.

### 5.6 Ürün Çıkışı ve Dağıtım
- **Çıkış Talimatı**: Ürünlerin çıkış süreci QR kod okutularak yapılabilir.
- **Stok Güncellemesi**: Ürün çıkışında sistemde stok durumu otomatik olarak güncellenir.

### 5.7 Karar Destek Sistemi (KDS) İşlevleri (Henüz Eklenmedi)
- **Düşük Stok Uyarıları**: Düşük stok seviyeleri için otomatik bildirimler gönderilir.
- **Son Kullanma Tarihi Uyarıları**: Yaklaşan son kullanma tarihleri için bildirimler oluşturulur.
- **Performans Raporlaması**: Personel performansı ve ürün tüketimi hakkında raporlar hazırlanır.

### 5.8 Yönetici Paneli 
- **Personel Yönetimi**: Yönetici paneli üzerinden personel ekleme, silme gibi işlemleri yapılabilir.
- **Performans Raporları**: Personel performansı izlenir.
  
## 6. Faydaları
- **Gerçek Zamanlı Bilgi**: QR kodlar ile anlık bilgi erişimi sağlar.
- **İyileştirilmiş Stok Yönetimi**: Ürünlerin son kullanma tarihleri etkin bir şekilde takip edilir.
- **Kullanıcı Dostu Arayüz**: Web ve mobil paneller ile kullanıcıların ürünleri kolayca yönetmesini sağlar.
- **Performans Takibi**: Personel performansını izlemeyi ve iyileştirmeleri kolaylaştırır.

## 7. Backend (API) Endpoint'leri

| **Controller**           | **HTTP Method** | **URL**                                            | **Açıklama**                                                                                      |
|--------------------------|-----------------|----------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **AdminController**       | POST            | `/admin/createUser`                                | Yeni kullanıcı kaydı yapar.                                                                       |
|                          | DELETE          | `/admin/deleteUser/{id}`                           | Kullanıcıyı siler.                                                                                 |
|                          | POST            | `/admin/makeAdmin/{id}`                            | Kullanıcıyı admin yapar.                                                                           |
|                          | GET             | `/admin/getMovements/{id}`                         | Kullanıcının hareketlerini getirir.                                                                |
|                          | GET             | `/admin/getAllUsers`                               | Tüm kullanıcıları getirir.                                                                         |
|                          | GET             | `/admin/getAllMovements`                           | Tüm hareketleri getirir.                                                                           |
| **PackageController**     | POST            | `/packages/add`                                    | Yeni bir paket ekler.                                                                               |
|                          | DELETE          | `/packages/exit/{id}`                              | Paketi sistemden çıkarır.                                                                          |
|                          | GET             | `/packages/{id}`                                   | Belirli bir paketi getirir.                                                                        |
|                          | GET             | `/packages`                                        | Tüm paketleri getirir.                                                                             |
|                          | PUT             | `/packages/update/{id}`                            | Mevcut paketi günceller.                                                                           |
|                          | PUT             | `/packages/changeRack/{packageId}/{newRackId}`      | Paketin rafını değiştirir.                                                                         |
| **PackageDetailController**| GET            | `/PackageDetail/{PackageId}`                       | Paketin detay bilgilerini getirir ve `PackageDetail` adlı view'e yönlendirir.                     |
| **ProductController**     | POST            | `/products/add`                                    | Yeni ürün ekler.                                                                                  |
|                          | POST            | `/products/addAll`                                 | Birden fazla ürün ekler.                                                                           |
|                          | DELETE          | `/products/delete/{id}`                            | Ürünü siler.                                                                                      |
|                          | GET             | `/products/{id}`                                   | Belirli bir ürünü getirir.                                                                          |
|                          | GET             | `/products`                                        | Tüm ürünleri getirir.                                                                              |
|                          | GET             | `/products/search`                                 | Ürün adı ile arama yapar.                                                                          |
|                          | PUT             | `/products/update/{id}`                            | Ürünü günceller.                                                                                  |
|                          | GET             | `/products/{productId}/packages`                    | Ürüne ait paketleri getirir.                                                                      |
|                          | GET             | `/products/{productId}/totalQuantity`               | Ürünün toplam miktarını getirir.                                                                  |
| **RackController**        | POST            | `/racks/add`                                       | Yeni raf ekler.                                                                                   |
|                          | DELETE          | `/racks/delete/{id}`                               | Rafı siler.                                                                                        |
|                          | PUT             | `/racks/update/{id}`                               | Rafı günceller.                                                                                   |
|                          | GET             | `/racks/{id}`                                      | Belirli bir rafı getirir.                                                                          |
|                          | GET             | `/racks`                                           | Tüm rafları getirir.                                                                               |
|                          | GET             | `/racks/{rackId}/packages`                         | Belirli bir rafın tüm paketlerini getirir.                                                         |
|                          | GET             | `/racks/findSuitableRacks/{productId}/{quantityOfProduct}` | Ürün için uygun rafları bulur.                                                                   |
| **UserController**        | GET             | `/users/current`                                   | Şu anki kullanıcıyı getirir.                                                                      |
|                          | POST            | `/users/changePassword`                            | Kullanıcının şifresini değiştirir.                                                                  |
| **AuthController**        | POST            | `/auth/login`                                      | Kullanıcıyı sisteme giriş yapar.                                                                   |
|                          | POST            | `/auth/verifyToken`                                | Token'ı doğrular ve geçerli olup olmadığını kontrol eder.                                          |

## 8. Front-end Ekran Görüntüleri (Yapım Aşamasında)

<p>Giriş Ekranı : </p>
<img src="https://github.com/user-attachments/assets/caf36eda-b297-4822-8526-91b72475ef99" alt="Resim 1" width="750" />

<p>Panel Ana Ekranı : </p>
<img src="https://github.com/user-attachments/assets/520bb28e-7d67-4a56-982b-c5912a390746" alt="Resim 2" width="750" />

<p>Personel Ekranı ve Personel Hareketleri Modalı : </p>
<img src="https://github.com/user-attachments/assets/2dc65b32-5749-4fe2-aaff-8be686238360" alt="Resim 2" width="750" />

<p>Kameradan QR Okutulunca Açılan Paket Detayları Ekranı : </p>
<img src="https://github.com/user-attachments/assets/989ba800-12e2-4d1b-ac27-e8435763dc03" alt="Resim 2" width="750" />

<p>Diger Sekmelerden Görüntüler : </p>
<img src="https://github.com/user-attachments/assets/4d609f5c-eafd-49ac-9a09-1999fb9e7435" alt="Resim 2" width="750" />
<img src="https://github.com/user-attachments/assets/797c2df3-20b9-49b2-b94e-2e2a394a41eb" alt="Resim 2" width="750" />













