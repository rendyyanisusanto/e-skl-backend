# e-SKL Digital - Backend API

e-SKL Digital (Surat Keterangan Lulus Digital) adalah backend service API yang dirancang untuk mendukung operasional platform penerbitan Surat Keterangan Lulus digital secara aman dan efisien.

Repositori ini memuat kode sumber untuk aplikasi **Backend** yang dibangun menggunakan **Node.js**, **Express.js**, **Sequelize ORM**, dan database **MySQL**.

## ✨ Fitur Utama

- 🛡️ **Autentikasi & Otorisasi**: Menggunakan sistem JWT (JSON Web Token) dengan skema _Role-Based Access Control_ (RBAC) untuk Admin dan entitas sistem lainnya.
- 📂 **Manajemen Data Akademik**: Kumpulan endpoints (API) lengkap untuk melakukan operasi CRUD pada tabel Siswa, Kelas, Jurusan, dan Periode Kelulusan.
- 📑 **Pemrosesan Data Massal**: Fitur impor data siswa langsung dari file _spreadsheet_ (.xlsx, .xls) menggunakan _ExcelJS_ untuk memfasilitasi integrasi data dalam jumlah besar dengan mudah.
- 🖨️ **Penerbitan Dokumen PDF**: Algoritma dan _service_ untuk men-_generate_ Surat Keterangan Lulus.
- 📜 **Pencatatan Aktivitas (Logging)**: Mencatat riwayat _download_ dan verifikasi dokumen keaslian SKL untuk keperluan _auditing_ dan mencegah penyalahgunaan.

## 🛠️ Teknologi yang Digunakan

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework API**: [Express.js](https://expressjs.com/)
- **Database ORM**: [Sequelize](https://sequelize.org/)
- **Database**: [MySQL](https://www.mysql.com/)
- **Security**: [Bcryptjs](https://www.npmjs.com/package/bcryptjs) & [JSONWebToken](https://jwt.io/)
- **File & Data Processing**: [Multer](https://www.npmjs.com/package/multer) & [ExcelJS](https://github.com/exceljs/exceljs)

## 🚀 Memulai Proyek (Local Development)

### Persyaratan Sistem
Pastikan Anda sudah menginstal alat-alat pengembangan berikut:
- **Node.js** (v18+)
- **MySQL Server** (Bisa menggunakan XAMPP, Laragon, MAMP, atau Docker)

### Instalasi & Konfigurasi

1. **Kloning repositori**:
   ```bash
   git clone https://github.com/rendyyanisusanto/e-skl-backend.git
   cd e-skl-backend
   ```

2. **Instal dependencies**:
   ```bash
   npm install
   ```

3. **Konfigurasi Database & Lingkungan**:
   Buat file `.env` di _root directory_, salin nilai _environment variables_ yang diperlukan (contohnya seperti di bawah) dan sesuaikan kredensial `DB_USER` & `DB_PASS` ke database lokal Anda:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASS=
   DB_NAME=eskl_digital
   JWT_SECRET=super_secret_key_change_this_in_production
   JWT_EXPIRES_IN=1d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Persiapan Database (Migrasi & Seeder)**:
   Proyek ini menggunakan _Sequelize-CLI_ untuk mengatur skema database. Jalankan skrip persiapan berikut:
   ```bash
   # Untuk membuat database, merunning semua migrasi, lalu mempopulasi data dummy
   npm run db:setup
   
   # Opsi lain (jika database eskl_digital sudah ada namun ingin dikosongkan/di-refresh):
   npm run db:fresh
   ```
   _Akun default admin hasil seeder biasanya:_
   - Username: `admin`
   - Password: `password123`

5. **Jalankan _development server_**:
   ```bash
   npm run dev
   ```

Server API akan berjalan secara lokal pada alamat `http://localhost:3000`.

## 📁 Struktur Proyek (MVC)

- `src/controllers/` - Logika bisnis (_business logic_) dan penganangan _request/response_ HTTP.
- `src/middlewares/` - Sistem interseptor HTTP (seperti autentikasi JWT, penanganan error, validasi file).
- `src/models/` - Definisi tabel dan relasi antar-tabel dalam database.
- `src/routes/` - Titik masuk endpoint API yang dipisahkan berdasar _domain_ (`/admin` vs `/public`).
- `src/services/` - Komponen layanan pendukung (untuk _clean architecture_).
- `src/migrations/` & `src/seeders/` - Konfigurasi perubahan database (DDL) dan injeksi data otomatis.

---
*Proyek ini merupakan bagian dari ekosistem Edulite.*
