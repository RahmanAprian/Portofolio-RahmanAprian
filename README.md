# 🚀 Template Portofolio Next.js

Template portofolio modern untuk developer, dibangun dengan Next.js 14, Tailwind CSS, dan Framer Motion.

## ✨ Fitur

- Dark mode dengan desain modern (mirip portofolio Aji Arlando)
- Animasi scroll dan typing effect
- Section lengkap: Hero, About, Skills, Projects, Contact
- Filter proyek berdasarkan kategori
- Form kontak interaktif
- Fully responsive (mobile-first)
- Performa tinggi (Lighthouse 95+)

---

## 🛠️ Langkah-langkah Setup

### 1. Install Node.js

Pastikan Node.js versi 18+ sudah terinstall.
Download di: https://nodejs.org

Cek dengan: `node --version`

---

### 2. Extract & Masuk ke Folder Project

```bash
cd portfolio
```

---

### 3. Install Dependencies

```bash
npm install
```

Ini akan menginstall semua package yang dibutuhkan:
- `next` — framework utama
- `framer-motion` — animasi
- `react-type-animation` — efek typing di hero
- `react-icons` — icon set
- `tailwindcss` — utility CSS

---

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka browser di: http://localhost:3000

---

## ✏️ Cara Kustomisasi

### Ganti informasi pribadi

Buka setiap file komponen dan cari bagian yang perlu diubah:

**`components/Navbar.tsx`**
- Ganti `NamaKamu` dengan nama/brand kamu

**`components/Hero.tsx`**
- Ganti `Nama Kamu` di heading
- Update link sosial media (GitHub, LinkedIn, Instagram)
- Ganti teks di TypeAnimation sesuai deskripsi dirimu
- Ganti `NK` (inisial) dengan foto: hapus div placeholder, gunakan komponen Image dari Next.js:
  ```tsx
  import Image from "next/image";
  // ...
  <Image src="/foto.jpg" alt="Foto Nama Kamu" fill className="object-cover" />
  ```
  Letakkan foto di folder `public/` dengan nama `foto.jpg`

**`components/About.tsx`**
- Update teks paragraf tentang dirimu
- Sesuaikan angka statistik (tahun pengalaman, jumlah proyek, dll)
- Ganti tags teknologi yang kamu kuasai

**`components/Skills.tsx`**
- Edit `skillGroups` — sesuaikan nama skill dan persentase level
- Update `techStack` badges di bagian bawah

**`components/Projects.tsx`**
- Edit array `projects` — ganti dengan proyek-proyek nyata kamu
- Update link `github` dan `demo` di setiap proyek
- Ganti `usernamekamu` di link GitHub CTA

**`components/Contact.tsx`**
- Ganti email di `contactInfo`
- Update kota/lokasi

**`components/Footer.tsx`**
- Ganti semua `usernamekamu` dengan username media sosial kamu

---

### Ganti warna tema

Buka `tailwind.config.ts`, edit bagian `colors`:

```ts
colors: {
  bg: "#04050f",           // warna background utama
  surface: "#0d0f1e",      // warna card/panel
  "surface-2": "#141628",  // warna panel lebih terang
  primary: "#6c63ff",      // warna aksen utama (ungu)
  "primary-light": "#9b94ff",
  accent: "#00d4ff",       // warna aksen kedua (cyan)
  muted: "#8b8fa8",        // warna teks abu-abu
},
```

Contoh tema alternatif:
- **Biru-hijau**: primary `#00b4d8`, accent `#06d6a0`
- **Orange-pink**: primary `#f77f00`, accent `#d62828`
- **Hijau hacker**: primary `#39ff14`, accent `#00ff88`

---

### Sambungkan form kontak

Buka `components/Contact.tsx`, cari `handleSubmit`, ganti simulasi dengan integrasi nyata.

**Opsi 1 — EmailJS (paling mudah, gratis):**
```bash
npm install @emailjs/browser
```
```ts
import emailjs from "@emailjs/browser";
const result = await emailjs.send(
  "YOUR_SERVICE_ID",
  "YOUR_TEMPLATE_ID",
  { name: form.name, email: form.email, message: form.message },
  "YOUR_PUBLIC_KEY"
);
```
Daftar di https://emailjs.com — gratis 200 email/bulan.

**Opsi 2 — API Route Next.js + Nodemailer:**
Buat file `app/api/contact/route.ts` dan kirim email via SMTP (Gmail, Resend, dll).

---

## 🚀 Deploy ke Vercel (Gratis)

### Cara 1: Via GitHub (Direkomendasikan)

1. Buat repository baru di GitHub
2. Push kode ke repo:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/username/nama-repo.git
   git push -u origin main
   ```
3. Buka https://vercel.com → Login dengan GitHub
4. Klik **"New Project"** → Import repo yang baru dibuat
5. Klik **"Deploy"** — selesai!

Vercel otomatis re-deploy setiap kali kamu push ke GitHub.

### Cara 2: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🌐 Custom Domain (Opsional)

Setelah deploy di Vercel:
1. Beli domain di Niagahoster / Domainesia / Namecheap
2. Di dashboard Vercel → Project Settings → Domains
3. Tambahkan domain kamu dan ikuti instruksi DNS

---

## 📁 Struktur File

```
portfolio/
├── app/
│   ├── globals.css       ← styling global & animasi
│   ├── layout.tsx        ← metadata SEO
│   └── page.tsx          ← halaman utama
├── components/
│   ├── Navbar.tsx        ← navigasi
│   ├── Hero.tsx          ← section pertama
│   ├── About.tsx         ← tentang saya
│   ├── Skills.tsx        ← keahlian & skill bar
│   ├── Projects.tsx      ← proyek dengan filter
│   ├── Contact.tsx       ← form kontak
│   └── Footer.tsx        ← footer
├── public/               ← taruh foto & aset disini
├── tailwind.config.ts    ← konfigurasi warna & tema
├── package.json
└── README.md             ← panduan ini
```

---

## 🆘 Troubleshooting

**`npm install` error?**
→ Pastikan Node.js versi 18+: `node --version`

**Halaman blank?**
→ Cek terminal untuk error, biasanya ada typo di file yang diedit

**Animasi tidak muncul?**
→ Pastikan `framer-motion` terinstall: `npm install framer-motion`

**Font tidak load?**
→ Butuh koneksi internet untuk Google Fonts. Untuk offline, download font dan taruh di `public/fonts/`
