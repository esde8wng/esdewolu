-- Supabase Schema for SD Negeri 8 Wonogiri Portal
-- Run this in Supabase SQL Editor (Project > SQL Editor > New query)

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. School Config (singleton)
create table if not exists school_config (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 2. Hero Slides
create table if not exists hero_slides (
  id bigserial primary key,
  image text not null,
  title text not null,
  subtitle text not null,
  cta_text text not null,
  cta_link text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3. Motivation Quote (singleton)
create table if not exists motivation_quote (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 4. Vision & Mission (singleton)
create table if not exists vision_mission (
  id text primary key default 'main',
  data jsonb not null,
  updated_at timestamptz default now()
);

-- 5. Teachers
create table if not exists teachers (
  id bigserial primary key,
  name text not null,
  role text not null,
  nip text,
  photo text not null,
  education text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 6. Facilities
create table if not exists facilities (
  id bigserial primary key,
  name text not null,
  description text not null,
  image text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 7. Innovations
create table if not exists innovations (
  id text primary key,
  title text not null,
  tagline text not null,
  description text not null,
  background text not null,
  impact jsonb not null default '[]'::jsonb,
  image text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 8. News Items
create table if not exists news_items (
  id bigserial primary key,
  title text not null,
  slug text not null unique,
  category text not null check (category in ('Berita','Pengumuman','Artikel')),
  date text not null,
  excerpt text not null,
  content text not null,
  image text not null,
  author text not null,
  tags jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);

-- 9. Achievements
create table if not exists achievements (
  id bigserial primary key,
  title text not null,
  category text not null check (category in ('Akademik','Non-Akademik')),
  level text not null check (level in ('Kecamatan','Kabupaten','Provinsi','Nasional')),
  year text not null,
  winner text not null,
  description text not null,
  image text not null,
  created_at timestamptz default now()
);

-- 10. Activities
create table if not exists activities (
  id bigserial primary key,
  title text not null,
  category text not null check (category in ('Intrakurikuler','Kokurikuler','Ekstrakurikuler')),
  description text not null,
  schedule text not null,
  image text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 11. Gallery Items
create table if not exists gallery_items (
  id bigserial primary key,
  title text not null,
  category text not null check (category in ('Sekolah','Kegiatan','Prestasi')),
  type text not null check (type in ('image','video')),
  url text not null,
  date text not null,
  created_at timestamptz default now()
);

-- 12. Transparency Docs
create table if not exists transparency_docs (
  id bigserial primary key,
  title text not null,
  category text not null check (category in ('Rencana Kerja (RKAS)','Laporan Keuangan','Dana BOS','Lainnya','Semua')),
  year text not null,
  date_added text not null,
  file_size text not null,
  file_url text not null,
  budget_rows jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

-- 13. Public Services SOP
create table if not exists public_services (
  id bigserial primary key,
  title text not null,
  requirements jsonb not null default '[]'::jsonb,
  procedure jsonb default '[]'::jsonb,
  time text,
  cost text,
  output text,
  pdf_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 14. SPMB Registrations
create table if not exists spmb_registrations (
  id uuid primary key default uuid_generate_v4(),
  nama_lengkap text not null,
  nik text not null,
  tempat_lahir text not null,
  tanggal_lahir text not null,
  jenis_kelamin text not null,
  agama text not null default 'Islam',
  alamat_siswa text not null,
  nama_ayah text not null,
  pekerjaan_ayah text not null,
  nama_ibu text not null,
  pekerjaan_ibu text not null,
  no_whatsapp_orang_tua text not null,
  pilihan_ekstrakurikuler text not null default 'Pramuka',
  status text not null default 'Menunggu' check (status in ('Menunggu','Diverifikasi','Diterima','Ditolak')),
  submitted_at timestamptz default now()
);

-- 15. LAPOR Reports
create table if not exists lapor_reports (
  id uuid primary key default uuid_generate_v4(),
  category text not null,
  name text,
  contact text,
  subject text not null,
  message text not null,
  is_anonymous boolean not null default false,
  status text not null default 'Menunggu' check (status in ('Menunggu','Diproses','Selesai')),
  attachment_url text,
  submitted_at timestamptz default now()
);

-- 16. FAQ
create table if not exists faqs (
  id bigserial primary key,
  question text not null,
  answer text not null,
  category text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 17. Quick Menu Items
create table if not exists quick_menu_items (
  id bigserial primary key,
  title text not null,
  icon text not null,
  link text not null,
  description text not null,
  color text not null,
  sort_order int default 0
);

-- 18. Feedback / Pesan Pengunjung
create table if not exists visitor_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  is_anonymous boolean not null default false,
  agree_terms boolean not null default false,
  status text not null default 'Menunggu' check (status in ('Menunggu','Dibaca','Selesai')),
  submitted_at timestamptz default now()
);

-- Indexes for common queries
create index if not exists idx_news_items_category on news_items(category);
create index if not exists idx_news_items_date on news_items(date);
create index if not exists idx_achievements_category on achievements(category);
create index if not exists idx_achievements_level on achievements(level);
create index if not exists idx_activities_category on activities(category);
create index if not exists idx_gallery_items_category on gallery_items(category);
create index if not exists idx_transparency_docs_category on transparency_docs(category);
create index if not exists idx_transparency_docs_year on transparency_docs(year);
create index if not exists idx_spmb_registrations_status on spmb_registrations(status);
create index if not exists idx_lapor_reports_status on lapor_reports(status);
create index if not exists idx_lapor_reports_category on lapor_reports(category);

-- Seed minimal data if tables are empty
insert into school_config (id, data)
select 'main', '{"name":"SD Negeri 8 Wonogiri","address":"Jl. Kolonel Sugiono No. 24, Sukorejo, Giritirto, Kec. Wonogiri, Kabupaten Wonogiri, Jawa Tengah 57611","phone":"(0273) 321567","email":"esde8wng@gmail.com","whatsapp":"+6281234567890","workingHours":{"seninKamis":"Senin - Kamis, 07.00 - 14.00 WIB","jumat":"Jumat, 07.00 - 11.00 WIB","sabtu":"Sabtu, 07.00 - 12.30 WIB"},"established":"1978","accreditation":"A (Unggul)"}'::jsonb
where not exists (select 1 from school_config);

insert into motivation_quote (id, data)
select 'main', '{"text":"Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.","author":"Nelson Mandela","role":"Motto Sekolah"}'::jsonb
where not exists (select 1 from motivation_quote);

insert into vision_mission (id, data)
select 'main', '{"vision":"Terwujudnya SD Negeri 8 Wonogiri sebagai sekolah unggulan yang Berakhlak, Berprestasi, dan Berwawasan Lingkungan.","mission":["Menyelenggarakan pembelajaran yang efektif dan menyenangkan","Membangun karakter siswa yang berakhlak mulia","Mengembangkan sekolah ramah lingkungan (Adiwiyata)","Meningkatkan kompetensi guru dan tenaga kependidikan"],"goals":["100% siswa mampu membaca dan berhitung dengan baik","100% guru bersertifikat pelatihan kurikulum terbaru","Penciptaan lingkungan sekolah yang asri dan berkelanjutan","Peningkatan nilai akreditasi sekolah"]}'::jsonb
where not exists (select 1 from vision_mission);
