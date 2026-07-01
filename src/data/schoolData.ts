/**
 * SD Negeri 8 Wonogiri - School Data
 * This file contains high-fidelity Indonesian static content for the school website.
 */

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface Quote {
  text: string;
  author: string;
  role: string;
}

export interface QuickMenu {
  id: number;
  title: string;
  icon: string;
  link: string;
  description: string;
  color: string;
}

export interface Teacher {
  id: number;
  name: string;
  role: string;
  nip?: string;
  photo: string;
  education?: string;
}

export interface Facility {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Innovation {
  id: string;
  title: string;
  tagline: string;
  description: string;
  background: string;
  impact: string[];
  image: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: 'Berita' | 'Pengumuman' | 'Artikel';
  date: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
}

export interface Achievement {
  id: number;
  title: string;
  category: 'Akademik' | 'Non-Akademik';
  level: 'Kecamatan' | 'Kabupaten' | 'Provinsi' | 'Nasional';
  year: string;
  winner: string;
  description: string;
  image: string;
}

export interface Activity {
  id: number;
  title: string;
  category: 'Intrakurikuler' | 'Kokurikuler' | 'Ekstrakurikuler';
  description: string;
  schedule: string;
  image: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: 'Sekolah' | 'Kegiatan' | 'Prestasi';
  type: 'image' | 'video';
  url: string;
  date: string;
}

export interface TransparencyDoc {
  id: number;
  title: string;
  category: 'Rencana Kerja (RKAS)' | 'Laporan Keuangan' | 'Dana BOS' | 'Lainnya' | 'Semua';
  year: string;
  dateAdded: string;
  fileSize: string;
  fileUrl: string;
  budgetRows?: { item: string; amount: string }[];
}

export interface PublicServiceSop {
  id: number;
  title: string;
  requirements: string[];
  procedure?: string[];
  time?: string;
  cost?: string;
  output?: string;
  pdfUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const SCHOOL_CONFIG = {
  name: "SD Negeri 8 Wonogiri",
  address: "Jl. Kolonel Sugiono No. 24, Sukorejo, Giritirto, Kec. Wonogiri, Kabupaten Wonogiri, Jawa Tengah 57611",
  phone: "(0273) 321567",
  email: "esde8wng@gmail.com",
  whatsapp: "+6281234567890",
  workingHours: {
    seninKamis: "Senin - Kamis, 07.00 - 14.00 WIB",
    jumat: "Jumat, 07.00 - 11.00 WIB",
    sabtu: "Sabtu, 07.00 - 12.30 WIB"
  },
  googleMapsIframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.493202685794!2d110.9254333!3d-7.8433333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a2e2bfaaaaaaa%3A0x7d020e980345bf9f!2sWonogiri%20District%2C%20Wonogiri%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1680000000000!5m2!1sen!2sid",
  socials: {
    instagram: "https://www.instagram.com/sdn8wonogiri",
    youtube: "https://youtube.com/@sdn8wonogiri",
    facebook: "https://www.facebook.com/profile.php?id=100011753196052"
  },
  established: "1978",
  accreditation: "A (Unggul)",
  headmaster: {
    name: "Sri Hartati, S.Pd., M.Pd.",
    nip: "19691208 199103 2 004",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    welcomeMessage: `Assalamu'alaikum Warahmatullahi Wabarakatuh,
    
    Salam sejahtera bagi kita semua. Rahayu.
    
    Puji syukur senantiasa kita panjatkan ke hadirat Allah SWT, Tuhan Yang Maha Esa, atas limpahan rahmat, berkah, dan hidayah-Nya sehingga website resmi SD Negeri 8 Wonogiri ini dapat hadir sebagai wadah komunikasi dan informasi publik.
    
    Di era transformasi digital ini, SD Negeri 8 Wonogiri berkomitmen untuk terus berinovasi dalam memberikan layanan pendidikan terbaik bagi putra-putri bangsa. Kami memadukan kurikulum nasional yang berstandar tinggi dengan penanaman karakter luhur Pancasila, kepedulian lingkungan hidup, serta literasi digital. Melalui inovasi unggulan kami seperti "Gemari" (Gerakan Gemar Membaca Hari Jumat) dan "Ditali Rapia" (Mendidik Karakter Peduli Lingkungan & Sampah), kami mendidik siswa tidak hanya cerdas secara akademis, namun juga memiliki kepekaan sosial dan kecintaan terhadap bumi.
    
    Website ini dirancang secara modern dan transparan untuk memudahkan para orang tua, calon siswa, serta masyarakat luas dalam mengakses profil sekolah, kegiatan pembelajaran, prestasi siswa, transparansi penggunaan anggaran, serta layanan administrasi publik.
    
    Kami mengucapkan terima kasih kepada seluruh pihak—guru, tenaga kependidikan, komite sekolah, wali murid, dan seluruh elemen masyarakat—yang telah memberikan dukungan penuh bagi kemajuan SD Negeri 8 Wonogiri. Mari bersama-sama kita wujudkan generasi emas yang cerdas, berkarakter, dan peduli sesama.
    
    Wassalamu'alaikum Warahmatullahi Wabarakatuh.`
  },
  history: `SD Negeri 8 Wonogiri didirikan pada tahun 1978 di jantung kota Kecamatan Wonogiri untuk memenuhi kebutuhan sarana pendidikan tingkat dasar berkualitas tinggi. Sejak awal berdiri, sekolah ini terus mengukir berbagai prestasi gemilang di tingkat kabupaten maupun provinsi. 

Seiring perkembangan zaman, SD Negeri 8 Wonogiri bertransformasi menjadi sekolah percontohan dalam bidang literasi dan sekolah ramah lingkungan (Adiwiyata). Sekolah ini secara konsisten mempertahankan akreditasi "A" dengan nilai unggul. Kami bangga telah melahirkan ribuan alumni sukses yang kini mengabdi di berbagai sektor pembangunan di seluruh penjuru tanah air.`
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
    title: "Mendidik Generasi Cerdas Berkarakter",
    subtitle: "Selamat Datang di SD Negeri 8 Wonogiri. Sekolah ramah anak, berprestasi unggul, dan berwawasan lingkungan.",
    ctaText: "Profil Sekolah",
    ctaLink: "/profil.html"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1600&q=80",
    title: "Inovasi Pembelajaran Abad 21",
    subtitle: "Kami menghadirkan inovasi Gemari dan Ditali Rapia untuk membentuk karakter kepemimpinan, gemar membaca, dan peduli sampah sejak dini.",
    ctaText: "Inovasi Sekolah",
    ctaLink: "/inovasi.html"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80",
    title: "Penerimaan Siswa Baru (PPDB) 2026/2027",
    subtitle: "Pendaftaran siswa baru kini lebih mudah secara online. Kuota terbatas! Dapatkan fasilitas belajar terbaik dan lingkungan yang asri.",
    ctaText: "Daftar Sekarang",
    ctaLink: "/spmb.html"
  }
];

export const MOTIVATION_QUOTE: Quote = {
  text: "Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia.",
  author: "Nelson Mandela",
  role: "Tokoh Perdamaian Dunia"
};

export const QUICK_MENU_ITEMS: QuickMenu[] = [
  {
    id: 1,
    title: "Profil Sekolah",
    icon: "School",
    link: "/profil.html",
    description: "Kenali visi-misi, sejarah, dan struktur guru serta fasilitas kami.",
    color: "bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100"
  },
  {
    id: 2,
    title: "Kegiatan Siswa",
    icon: "Compass",
    link: "/kegiatan.html",
    description: "Lihat aktivitas intrakurikuler, kokurikuler, dan ekstrakurikuler sekolah.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100"
  },
  {
    id: 3,
    title: "Prestasi Juara",
    icon: "Trophy",
    link: "/prestasi.html",
    description: "Kumpulan pencapaian akademis dan non-akademis siswa siswi terbaik.",
    color: "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
  },
  {
    id: 4,
    title: "Kabar Berita",
    icon: "Newspaper",
    link: "/berita.html",
    description: "Update berita sekolah, pengumuman ujian, dan artikel edukatif.",
    color: "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100"
  },
  {
    id: 5,
    title: "Transparansi Dana",
    icon: "FileSpreadsheet",
    link: "/transparansi.html",
    description: "Laporan penggunaan anggaran BOS, RKAS, dan transparansi publik.",
    color: "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100"
  },
  {
    id: 6,
    title: "Pendaftaran SPMB",
    icon: "UserPlus",
    link: "/spmb.html",
    description: "Informasi alur, syarat pendaftaran, dan pengumuman seleksi siswa baru.",
    color: "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100"
  }
];

export const VISION_MISSION = {
  vision: "Terwujudnya peserta didik yang bertaqwa kepada Tuhan Yang Maha Esa, cerdas, berprestasi, berkarakter luhur, serta peduli dan berbudaya lingkungan.",
  mission: [
    "Menumbuhkembangkan keimanan dan ketaqwaan kepada Tuhan Yang Maha Esa melalui pembiasaan ibadah dan akhlak mulia sehari-hari.",
    "Melaksanakan pembelajaran aktif, inovatif, kreatif, efektif, dan menyenangkan (PAIKEM) dengan pemanfaatan teknologi informasi.",
    "Mendorong siswa mengenali potensi dirinya untuk meraih prestasi akademik dan non-akademik secara optimal.",
    "Menanamkan karakter budi pekerti yang luhur, disiplin, gotong royong, dan cinta tanah air melalui pembiasaan positif di sekolah.",
    "Menciptakan lingkungan sekolah yang bersih, sehat, rindang, aman, dan nyaman melalui program pengelolaan sampah berbasis edukasi.",
    "Membiasakan budaya literasi melalui gerakan membaca terstruktur guna meningkatkan pengetahuan dan wawasan siswa."
  ],
  goals: [
    "Lulusan memiliki kompetensi dasar keagamaan yang kuat dan taat beribadah.",
    "Rata-rata pencapaian nilai kelulusan meningkat secara konsisten setiap tahun.",
    "Minimal 3 piala kejuaraan tingkat kabupaten diraih dalam satu tahun pelajaran.",
    "Sekolah bebas dari sampah plastik sekali pakai melalui optimalisasi daur ulang.",
    "Tingkat partisipasi membaca siswa meningkat 100% dengan tersedianya pojok baca kelas.",
    "Siswa menguasai keterampilan dasar penggunaan komputer untuk mendukung proses belajar."
  ]
};

export const TEACHERS: Teacher[] = [
  {
    id: 1,
    name: "Sri Hartati, S.Pd., M.Pd.",
    role: "Kepala Sekolah",
    nip: "19691208 199103 2 004",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    education: "S2 Teknologi Pendidikan - UNS"
  },
  {
    id: 2,
    name: "Bambang Pamungkas, S.Pd.",
    role: "Guru Kelas VI / Wali Kelas VI",
    nip: "19750412 200312 1 002",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    education: "S1 PGSD - Universitas Sebelas Maret"
  },
  {
    id: 3,
    name: "Dewi Lestari, S.Pd.SD.",
    role: "Guru Kelas V / Wali Kelas V",
    nip: "19820815 200903 2 005",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    education: "S1 PGSD - Universitas Sanata Dharma"
  },
  {
    id: 4,
    name: "Rahmat Hidayat, S.Pd.I.",
    role: "Guru Pendidikan Agama Islam",
    nip: "19881120 201504 1 003",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    education: "S1 Pendidikan Agama Islam - IAIN Surakarta"
  },
  {
    id: 5,
    name: "Siti Rahmawati, S.Pd.",
    role: "Guru Kelas IV / Wali Kelas IV",
    nip: "19910524 201903 2 008",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    education: "S1 PGSD - Universitas Muhammadiyah Surakarta"
  },
  {
    id: 6,
    name: "Joko Susilo, S.Pd.",
    role: "Guru PJOK (Olahraga)",
    nip: "- (P3K)",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    education: "S1 Pendidikan Olahraga - Universitas Negeri Semarang"
  }
];

export const FACILITIES: Facility[] = [
  {
    id: 1,
    name: "Ruang Kelas Multimedia",
    description: "Setiap kelas dilengkapi proyektor LCD, papan tulis interaktif, AC, kipas angin, dan koneksi Wi-Fi kencang untuk mendukung pembelajaran interaktif.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Perpustakaan 'Taman Ilmu'",
    description: "Memiliki koleksi lebih dari 5.000 buku cerita, ensiklopedia, buku pelajaran, serta area pojok baca berkarpet yang nyaman untuk membiasakan program Gemari.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Laboratorium Komputer & Bahasa",
    description: "Fasilitas 25 unit komputer modern berspesifikasi tinggi yang digunakan untuk latihan asesmen nasional (ANBK) serta kelas pemrograman dasar scratch.",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Taman Hidroponik & Kebun Sekolah",
    description: "Pusat pembelajaran sains alam terbuka dan praktikum cinta lingkungan 'Ditali Rapia' bagi para siswa, memproduksi tanaman sayur organik segar secara rutin.",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Gedung Serbaguna & Lapangan Olahraga",
    description: "Digunakan untuk upacara bendera hari Senin, latihan senam bersama, kegiatan pramuka, bulu tangkis, futsal, serta panggung kreativitas akhir tahun.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Unit Kesehatan Sekolah (UKS) Standar Puskesmas",
    description: "Dilengkapi tempat tidur medis, alat ukur tinggi & berat badan digital, obat-obatan P3K lengkap, serta kerja sama rutin rujukan Puskesmas Wonogiri.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80"
  }
];

export const INNOVATIONS: Innovation[] = [
  {
    id: "gemari",
    title: "GEMARI (Gerakan Gemar Membaca Hari Jumat)",
    tagline: "Menyemai Karakter Pemimpin Masa Depan Lewat Kecintaan Membaca",
    description: "Gemari merupakan program unggulan inovatif yang dilakukan secara terstruktur setiap hari Jumat pagi selama 45 menit sebelum jam pelajaran dimulai. Siswa diwajibkan membawa satu buku cerita non-pelajaran favorit atau meminjam di perpustakaan sekolah. Seluruh elemen sekolah—siswa, guru, tenaga kependidikan, bahkan kepala sekolah—secara serentak membaca bersama di halaman sekolah atau di pojok baca kelas masing-masing. Setelah membaca, perwakilan siswa dari setiap kelas secara bergantian maju ke depan panggung mini untuk menceritakan kembali intisari buku yang mereka baca, melatih rasa percaya diri dan kemampuan komunikasi verbal.",
    background: "Inovasi ini diinisiasi karena melihat rendahnya minat baca anak Indonesia di era digital. SD Negeri 8 Wonogiri mengambil langkah konkret untuk mengalihkan perhatian siswa dari paparan gadget berlebih ke buku cetak yang sarat akan pesan edukatif.",
    impact: [
      "Indeks kunjungan perpustakaan sekolah meningkat hingga 350%.",
      "Kosa kata bahasa Indonesia dan kemampuan menulis karangan siswa meningkat signifikan.",
      "Siswa memperoleh rasa percaya diri tinggi melalui kegiatan presentasi menceritakan ulang di depan umum.",
      "Meraih penghargaan sebagai Sekolah Model Literasi Tingkat Kabupaten Wonogiri."
    ],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ditali-rapia",
    title: "DITALI RAPIA (Pendidikan Berkarakter Peduli Lingkungan & Sampah)",
    tagline: "Didik Karakter Peduli Lingkungan, Kurangi Sampah demi Kelestarian Bumi",
    description: "Ditali Rapia adalah program aksi nyata pembentukan karakter cinta bumi. Dalam program ini, seluruh siswa dibiasakan memilah sampah sejak dari meja kelas. Sekolah melarang penggunaan plastik sekali pakai di kantin, mewajibkan siswa membawa tumbler dan kotak makan pribadi (Zero Waste School). Selain itu, setiap hari Rabu pagi, dilakukan aksi pengumpulan sampah plastik kering seperti botol dan gelas kemasan untuk ditimbang di 'Bank Sampah Sekolah'. Sampah yang terkumpul disalurkan ke laboratorium seni sekolah untuk didaur ulang menjadi kerajinan kreatif bernilai guna tinggi (upcycling) atau dijual ke pengepul, yang hasilnya digunakan untuk membiayai pembuatan taman tanaman hias kelas.",
    background: "Masalah penumpukan sampah plastik di lingkungan sekitar mendorong kepala sekolah menciptakan gerakan peduli sampah terstruktur. Ini membekali siswa dengan tanggung jawab sosial nyata bahwa melestarikan bumi adalah tugas semua orang.",
    impact: [
      "Reduksi limbah sampah plastik di area sekolah hingga 90% dalam 1 semester.",
      "Terbentuknya Bank Sampah Sekolah yang mandiri dan terintegrasi dengan kelas prakarya.",
      "Terbangunnya kesadaran menjaga kebersihan di lingkungan rumah siswa.",
      "Mengantarkan SD Negeri 8 Wonogiri meraih akreditasi Sekolah Adiwiyata Nasional."
    ],
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80"
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    title: "SD Negeri 8 Wonogiri Meraih Juara Umum Lomba Adiwiyata Kabupaten",
    slug: "sd-negeri-8-meraih-juara-umum-adiwiyata",
    category: "Berita",
    date: "2026-06-15",
    excerpt: "Melalui program unggulan 'Ditali Rapia', sekolah kami berhasil menyabet gelar Juara 1 Sekolah Adiwiyata Terbersih dan Terinovatif se-Kabupaten Wonogiri tahun 2026.",
    content: `Sekolah kita tercinta, SD Negeri 8 Wonogiri, berhasil menorehkan prestasi gemilang tingkat kabupaten. Pada puncak peringatan Hari Lingkungan Hidup Sedunia yang diselenggarakan oleh Dinas Lingkungan Hidup (DLH) Kabupaten Wonogiri, SD Negeri 8 Wonogiri dinobatkan sebagai Juara Umum Lomba Sekolah Adiwiyata Tingkat Kabupaten Wonogiri Tahun 2026.
    
    Penghargaan diserahkan langsung oleh Bupati Wonogiri kepada Kepala Sekolah SD Negeri 8 Wonogiri, Ibu Sri Hartati, S.Pd., M.Pd. dalam upacara resmi di Pendopo Kabupaten.
    
    Tim penilai dari Dinas Lingkungan Hidup menyatakan sangat kagum dengan implementasi nyata inovasi "Ditali Rapia" (Mendidik Karakter Peduli Lingkungan & Sampah). Penilaian tidak hanya didasarkan pada keasrian fisik taman sekolah, melainkan juga integrasi pemilahan sampah ke dalam kurikulum pembelajaran, kesadaran mandiri siswa dalam tidak menyisakan sampah makanan, serta keberadaan Bank Sampah Sekolah yang sangat aktif.
    
    "Prestasi ini bukan akhir, melainkan awal bagi kami untuk bersiap melaju ke tingkat provinsi Jawa Tengah. Terima kasih atas kerja keras seluruh siswa, guru, dan para orang tua yang luar biasa mendukung," ujar Ibu Kepala Sekolah dengan penuh rasa bangga.
    
    Dengan diraihnya penghargaan ini, SD Negeri 8 Wonogiri berhak mewakili Kabupaten Wonogiri dalam ajang Adiwiyata Tingkat Provinsi Jawa Tengah yang akan diselenggarakan akhir tahun ini.`,
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    author: "Bambang Pamungkas, S.Pd.",
    tags: ["Adiwiyata", "Prestasi", "Wonogiri", "Ditali Rapia"]
  },
  {
    id: 2,
    title: "Pengumuman Pembagian Rapor Semester Genap Tahun Ajaran 2025/2026",
    slug: "pengumuman-pembagian-rapor-semester-genap-2026",
    category: "Pengumuman",
    date: "2026-06-20",
    excerpt: "Diberitahukan kepada seluruh orang tua/wali murid kelas I - VI mengenai jadwal resmi pengambilan hasil belajar (Rapor) semester genap dan libur akhir tahun ajaran.",
    content: `Diberitahukan dengan hormat kepada seluruh Bapak/Ibu Orang Tua/Wali Murid SD Negeri 8 Wonogiri Kelas I sampai dengan Kelas VI, sehubungan dengan berakhirnya tahun pelajaran 2025/2026, kami sampaikan beberapa informasi penting berikut:
    
    1. Pengumuman Kelulusan Kelas VI
       Kelulusan siswa Kelas VI telah diumumkan pada tanggal 10 Juni 2026 dengan tingkat kelulusan 100% (Lulus Semua). Kami ucapkan selamat kepada seluruh siswa Kelas VI atas kelulusannya.
       
    2. Pembagian Rapor Kenaikan Kelas (Kelas I - V)
       Rapor hasil belajar semester genap tahun pelajaran 2025/2026 akan dibagikan pada:
       Hari / Tanggal : Jumat, 26 Juni 2026
       Waktu : 08:00 - 11:30 WIB
       Tempat : Ruang Kelas masing-masing wali kelas.
       Catatan: Pengambilan rapor WAJIB diambil oleh orang tua/wali murid (tidak boleh diwakilkan kepada siswa sendiri). Harap membawa map rapor masing-masing.
       
    3. Libur Akhir Tahun Pelajaran
       Libur akhir tahun pelajaran dimulai tanggal 29 Juni s.d. 12 Juli 2026.
       Siswa masuk kembali untuk memulai Tahun Ajaran Baru 2026/2027 pada hari Senin, 13 Juli 2026.
       
    Demikian pengumuman ini kami sampaikan, atas perhatian dan kerja sama Bapak/Ibu sekalian, kami mengucapkan banyak terima kasih.`,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    author: "Tata Usaha Sekolah",
    tags: ["Kurikulum", "Pengumuman", "Rapor"]
  },
  {
    id: 3,
    title: "Pentingnya Menanamkan Minat Baca Anak Sejak Dini Melalui Program Literasi",
    slug: "pentingnya-minat-baca-anak-sejak-dini-literasi",
    category: "Artikel",
    date: "2026-06-25",
    excerpt: "Membaca adalah gerbang ilmu pengetahuan. Bagaimana peran sekolah dan orang tua berkolaborasi memperkuat kegemaran membaca anak di rumah dan sekolah?",
    content: `Keterampilan literasi bukan sekadar kemampuan mengeja atau melafalkan kata-kata, melainkan sebuah kompetensi mendalam untuk memahami isi bacaan, mengambil kesimpulan, dan merangsang daya pikir kritis anak. Di tengah gempuran media sosial, tantangan menumbuhkan minat baca pada anak semakin berat.
    
    Bagaimana cara efektif mengatasinya? Di SD Negeri 8 Wonogiri, kami menerapkan metode "pembiasaan menyenangkan" melalui program inovasi GEMARI (Gerakan Gemar Membaca Hari Jumat).
    
    Berikut beberapa tips bagi orang tua untuk mengimbangi literasi anak di rumah:
    
    1. Buat Pojok Baca Sederhana
       Sediakan rak kecil berisi buku cerita bergambar atau majalah anak di sudut rumah yang tenang dan sejuk. Area yang nyaman merangsang anak betah memegang buku.
       
    2. Batasi Screen Time (Penggunaan Gadget)
       Tetapkan jam-jam bebas gadget di rumah. Gunakan waktu luang tersebut untuk berkumpul bersama keluarga, salah satunya adalah membaca bersama.
       
    3. Jadilah Teladan (Role Model)
       Anak-anak adalah peniru yang sangat ulung. Jika mereka sering melihat ayah dan bundanya membaca buku di rumah, secara alamiah mereka akan menganggap membaca adalah aktivitas menyenangkan yang patut ditiru.
       
    Mari kita bersama-sama menyalakan api kecintaan membaca di dalam hati anak-anak kita, demi bekal masa depan mereka yang cemerlang.`,
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    author: "Sri Hartati, S.Pd., M.Pd.",
    tags: ["Edukasi", "Literasi", "Tips Orang Tua", "Gemari"]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Juara 1 Lomba Adiwiyata Kabupaten",
    category: "Non-Akademik",
    level: "Kabupaten",
    year: "2026",
    winner: "Komunitas Adiwiyata SDN 8 Wonogiri",
    description: "Meraih penghargaan sekolah terbersih, dengan inovasi pengelolaan sampah kering dan program Bank Sampah terstruktur terbaik.",
    image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Juara 1 Olimpiade Sains Nasional (OSN) Matematika",
    category: "Akademik",
    level: "Kabupaten",
    year: "2026",
    winner: "Faisal Ahmad Fauzi (Siswa Kelas V)",
    description: "Mendapatkan medali emas OSN bidang Matematika Sekolah Dasar tingkat Kabupaten Wonogiri dan lolos ke tingkat Provinsi Jawa Tengah.",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Juara 2 Lomba Menulis Cerita Anak Literasi Jawa Tengah",
    category: "Akademik",
    level: "Provinsi",
    year: "2025",
    winner: "Anindya Sekar Putri (Siswi Kelas V)",
    description: "Berkat program literasi Gemari, karya tulis cerpen bertema pelestarian lingkungan karya Anindya berhasil menyabet piala harapan kedua tingkat provinsi.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Juara 1 Kejuaraan Futsal Anak Wonogiri Cup",
    category: "Non-Akademik",
    level: "Kecamatan",
    year: "2025",
    winner: "Tim Futsal Ekstrakurikuler SDN 8 Wonogiri",
    description: "Berhasil meraih piala bergilir setelah mengalahkan tim lawan di partai final dengan skor telak 4-2.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80"
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "Pembelajaran Berbasis Proyek (P5) - Kurikulum Merdeka",
    category: "Intrakurikuler",
    description: "Pembelajaran inti harian dengan metode aktif, eksperimen sains, pengenalan sejarah lokal Wonogiri, dan integrasi digital yang menyenangkan.",
    schedule: "Senin - Kamis, 07:00 - 12:15 WIB",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Inovasi GEMARI (Membaca Bersama) & Rabu Pilah Sampah",
    category: "Kokurikuler",
    description: "Kegiatan penunjang kurikulum untuk menguatkan literasi dasar (Hari Jumat) dan praktek hidup bersih daur ulang sampah kering Bank Sampah (Hari Rabu).",
    schedule: "Rabu & Jumat, 07:00 - 07:45 WIB",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Ekstrakurikuler Pramuka (Wajib)",
    category: "Ekstrakurikuler",
    description: "Melatih kepemimpinan, disiplin, kerja kelompok, kemandirian, cinta alam, serta ketangkasan baris-berbaris untuk kelas III sampai VI.",
    schedule: "Sabtu, 10:00 - 12:00 WIB",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Ekstrakurikuler Seni Tari Tradisional Jawa",
    category: "Ekstrakurikuler",
    description: "Melestarikan kesenian daerah seperti Tari Golek, Tari Kuda Lumping, dan seni karawitan menggunakan perangkat gamelan milik sekolah.",
    schedule: "Selasa, 14:00 - 15:30 WIB",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Ekstrakurikuler Bulu Tangkis & Futsal",
    category: "Ekstrakurikuler",
    description: "Melatih kebugaran jasmani dan pembibitan atlet muda berprestasi di bawah bimbingan guru olahraga yang berpengalaman.",
    schedule: "Kamis, 14:00 - 16:00 WIB",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&q=80"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: "Upacara Peringatan Hari Pendidikan Nasional",
    category: "Sekolah",
    type: "image",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    date: "2026-05-02"
  },
  {
    id: 2,
    title: "Siswa Membaca Serentak Program Gemari Hari Jumat",
    category: "Kegiatan",
    type: "image",
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-12"
  },
  {
    id: 3,
    title: "Penerimaan Penghargaan Sekolah Adiwiyata dari Bupati Wonogiri",
    category: "Prestasi",
    type: "image",
    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-15"
  },
  {
    id: 4,
    title: "Praktek Hidroponik Selada Organik oleh Siswa Kelas V",
    category: "Kegiatan",
    type: "image",
    url: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-03"
  },
  {
    id: 5,
    title: "Latihan Rutin Pramuka Menggunakan Sandi Semaphore",
    category: "Kegiatan",
    type: "image",
    url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    date: "2026-05-28"
  },
  {
    id: 6,
    title: "Piala Kejuaraan Akademik dan Non-Akademik Tahun Pelajaran",
    category: "Prestasi",
    type: "image",
    url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-19"
  }
];

export const TRANSPARENCY_DOCS: TransparencyDoc[] = [
  {
    id: 1,
    title: "Rencana Kegiatan dan Anggaran Sekolah (RKAS) Tahun Anggaran 2026",
    category: "Rencana Kerja (RKAS)",
    year: "2026",
    dateAdded: "2026-01-10",
    fileSize: "2.4 MB",
    fileUrl: "#pdf-rkas-2026",
    budgetRows: [
      { item: "Penerimaan Pendapatan Rutin Sekolah", amount: "Rp 120.000.000" },
      { item: "Bantuan Operasional Sekolah (BOS) Pusat", amount: "Rp 91.000.000" },
      { item: "Belanja Pegawai (Honor Gaji Pendidik Non-PNS)", amount: "Rp 32.500.000" },
      { item: "Belanja Barang & Jasa (Buku Pembelajaran Utama)", amount: "Rp 45.925.000" },
      { item: "Belanja Pemeliharaan Sarana & Prasarana Kelas", amount: "Rp 21.375.000" },
      { item: "Belanja Kegiatan Kesiswaan (Ekstrakurikuler, Lomba)", amount: "Rp 11.200.000" }
    ]
  },
  {
    id: 2,
    title: "Laporan Pertanggungjawaban Realisasi Penggunaan Dana BOS Reguler Tahap I 2026",
    category: "Dana BOS",
    year: "2026",
    dateAdded: "2026-05-15",
    fileSize: "1.8 MB",
    fileUrl: "#pdf-bos-reguler-2026-t1",
    budgetRows: [
      { item: "Penerimaan Dana BOS Reguler Tahap I 2026", amount: "Rp 45.500.000" },
      { item: "Penyediaan Buku Teks Utama & Penunjang Perpustakaan", amount: "Rp 15.925.000" },
      { item: "Belanja Bahan Habis Pakai & ATK Kebutuhan Ujian", amount: "Rp 9.100.000" },
      { item: "Pemeliharaan Kebersihan, Sanitasi & Fasilitas Toilet", amount: "Rp 11.375.000" },
      { item: "Honorarium Guru Tidak Tetap & Tenaga Kependidikan", amount: "Rp 9.100.000" }
    ]
  },
  {
    id: 3,
    title: "Laporan Realisasi Penggunaan Anggaran Belanja Sekolah Tahun Anggaran 2025",
    category: "Laporan Keuangan",
    year: "2025",
    dateAdded: "2026-01-15",
    fileSize: "3.1 MB",
    fileUrl: "#pdf-realisasi-anggaran-2025",
    budgetRows: [
      { item: "Sisa Lebih Pembiayaan Anggaran (SiLPA) 2024", amount: "Rp 2.450.000" },
      { item: "Penerimaan Dana BOS Pusat & BOS Daerah 2025", amount: "Rp 182.000.000" },
      { item: "Realisasi Belanja Administrasi Perkantoran & Internet", amount: "Rp 24.500.000" },
      { item: "Realisasi Pembangunan Ruang Adiwiyata Hijau", amount: "Rp 50.000.000" },
      { item: "Realisasi Pembelian Laptop & Proyektor Pembelajaran", amount: "Rp 45.000.000" },
      { item: "Realisasi Biaya Pelatihan Guru & KKG Wonogiri", amount: "Rp 12.000.000" },
      { item: "Realisasi Subsidi Kegiatan Ekstrakurikuler Siswa", amount: "Rp 18.000.000" }
    ]
  },
  {
    id: 4,
    title: "Laporan Pertanggungjawaban Realisasi Penggunaan Dana BOS Reguler Tahap II 2025",
    category: "Dana BOS",
    year: "2025",
    dateAdded: "2025-10-18",
    fileSize: "1.9 MB",
    fileUrl: "#pdf-bos-reguler-2025-t2",
    budgetRows: [
      { item: "Penerimaan Dana BOS Reguler Tahap II 2025", amount: "Rp 45.500.000" },
      { item: "Pengembangan Perpustakaan Digital & Buku Paket Kelas", amount: "Rp 12.500.000" },
      { item: "Pembiayaan Langganan Daya & Jasa (PLN, PDAM, WiFi)", amount: "Rp 8.200.000" },
      { item: "Pemeliharaan Lapangan Olahraga & Pengecatan Kelas", amount: "Rp 15.700.000" },
      { item: "Honorarium Guru Tidak Tetap & Tenaga Administrasi", amount: "Rp 9.100.000" }
    ]
  },
  {
    id: 5,
    title: "Rencana Kerja Jangka Menengah (RKJM) SDN 8 Wonogiri Periode 2024 - 2028",
    category: "Lainnya",
    year: "2024",
    dateAdded: "2024-03-01",
    fileSize: "4.5 MB",
    fileUrl: "#pdf-rkjm-2024-2028",
    budgetRows: [
      { item: "Proyeksi Anggaran Penguatan Karakter Profil Pancasila", amount: "Rp 85.000.000" },
      { item: "Proyeksi Renovasi Perpustakaan Sekolah Terpadu", amount: "Rp 150.000.000" },
      { item: "Proyeksi Pengadaan Laboratorium Komputer Mandiri", amount: "Rp 120.000.000" },
      { item: "Proyeksi Akreditasi Sekolah & Peningkatan Guru Berprestasi", amount: "Rp 45.000.000" }
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Kapan pendaftaran SPMB/PPDB SD Negeri 8 Wonogiri dibuka?",
    answer: "Penerimaan Siswa Baru (SPMB/PPDB) untuk Tahun Ajaran 2026/2027 dibuka secara resmi mulai tanggal 1 Mei hingga 30 Juni 2026. Seleksi berkas dan penyesuaian umur akan diumumkan secara bertahap."
  },
  {
    question: "Berapa batas minimal umur untuk mendaftar kelas 1 SD?",
    answer: "Sesuai regulasi Kemendikbud, calon siswa kelas I SD harus berusia 7 (tujuh) tahun pada saat memulai tahun ajaran baru, atau minimal berusia 6 (enam) tahun pada tanggal 1 Juli 2026. Calon siswa berumur di bawah 6 tahun belum dapat kami terima tanpa rekomendasi tertulis psikolog profesional."
  },
  {
    question: "Apakah ada biaya pendaftaran atau biaya sumbangan pembangunan?",
    answer: "Tidak ada. SD Negeri 8 Wonogiri adalah sekolah negeri penerima Dana BOS Pemerintah, sehingga seluruh biaya pendidikan reguler, pendaftaran siswa baru, kegiatan kurikulum harian, ujian, serta buku paket pelajaran digratiskan 100% untuk seluruh siswa."
  },
  {
    question: "Fasilitas apa saja yang disediakan sekolah untuk mendukung literasi anak?",
    answer: "Sekolah kami memiliki Perpustakaan 'Taman Ilmu' berakreditasi baik yang menyediakan ribuan buku bacaan anak, pojok baca beralas karpet di setiap ruang kelas, serta program wajib GEMARI (Membaca Bersama) setiap Jumat pagi untuk membiasakan kecintaan buku."
  },
  {
    question: "Bagaimana sistem pengelolaan sampah 'Ditali Rapia' di sekolah?",
    answer: "Kami menerapkan zero-waste di lingkungan sekolah. Siswa wajib membawa kotak bekal dan botol minum minum isi ulang (tumbler). Sampah plastik sekali pakai dilarang keras di area kantin. Siswa membiasakan memilah sampah plastik botol/gelas kering setiap hari Rabu untuk dimasukkan ke Bank Sampah Sekolah yang kemudian dikelola menjadi kerajinan daur ulang."
  },
  {
    question: "Apakah sekolah menyediakan ekstrakurikuler wajib dan pilihan?",
    answer: "Ya. Ekstrakurikuler Pramuka wajib diikuti oleh seluruh siswa kelas III sampai VI. Selain itu, kami menyediakan ekstrakurikuler pilihan gratis seperti Futsal, Bulu Tangkis, Seni Tari Tradisional Jawa (menggunakan gamelan milik sekolah), menggambar, dan kelas pemrograman dasar Scratch."
  }
];

export const RAW_PUBLIC_SERVICES: PublicServiceSop[] = [
  {
    id: 1,
    title: "Pelayanan Mutasi Siswa Masuk",
    requirements: [
      "Surat permohonan mutasi masuk dari orang tua/wali murid.",
      "Surat keterangan pindah dari sekolah asal (asli bermaterai & ditandatangani Kepala Sekolah).",
      "Surat rekomendasi penyaluran dari Dinas Pendidikan asal (bila antar Kabupaten/Provinsi).",
      "Fotokopi rapor sekolah asal (lengkap lembar identitas s.d semester terakhir).",
      "Fotokopi Akta Kelahiran & Kartu Keluarga (KK) calon siswa.",
      "Fotokopi Surat Keputusan Akreditasi sekolah asal.",
      "Validasi data siswa pada sistem Dapodik (oleh operator sekolah)."
    ],
    procedure: [
      "Orang tua mengajukan berkas persyaratan ke loket pelayanan Tata Usaha.",
      "Petugas Tata Usaha memvalidasi kelengkapan berkas fisik dan memeriksa kuota kelas.",
      "Kepala Sekolah menelaah berkas dan menerbitkan Surat Keterangan Penerimaan Mutasi Masuk.",
      "Operator sekolah menarik data siswa yang bersangkutan melalui sistem Dapodik nasional.",
      "Siswa resmi terdaftar dan dapat mulai mengikuti kegiatan belajar mengajar."
    ],
    time: "2 Hari Kerja",
    cost: "Rp 0,- (Gratis)",
    output: "Surat Keterangan Penerimaan Siswa Mutasi Masuk & Aktivasi Dapodik"
  },
  {
    id: 2,
    title: "Pelayanan Mutasi Siswa Keluar",
    requirements: [
      "Surat permohonan mutasi keluar tertulis dari orang tua/wali murid (bermaterai).",
      "Surat keterangan bersedia menerima dari sekolah tujuan (ber-NPSN).",
      "Fotokopi Kartu Keluarga (KK) terbaru."
    ],
    procedure: [
      "Orang tua mengajukan permohonan tertulis beserta surat kesediaan menerima dari sekolah tujuan ke Tata Usaha.",
      "Petugas Tata Usaha memproses administrasi mutasi keluar dan membuat draf surat keterangan.",
      "Kepala Sekolah menandatangani Surat Keterangan Pindah Sekolah.",
      "Operator sekolah mengeluarkan siswa dari rombongan belajar (rombel) di Dapodik dan menerbitkan lembar mutasi Dapodik.",
      "Orang tua mengambil dokumen asli (Surat Keterangan Pindah, Buku Rapor asli, & Lembar Dapodik) untuk dibawa ke sekolah tujuan."
    ],
    time: "1 Hari Kerja",
    cost: "Rp 0,- (Gratis)",
    output: "Surat Keterangan Pindah Sekolah, Buku Rapor Asli, & Lembar Mutasi Dapodik"
  },
  {
    id: 3,
    title: "Pelayanan Surat Keterangan Siswa Aktif",
    requirements: [
      "Pemohon menyerahkan nama lengkap siswa, kelas, dan NISN.",
      "Menyebutkan tujuan/keperluan pembuatan surat (misal: pengurusan tunjangan gaji orang tua, beasiswa, paspor, klaim asuransi, dsb)."
    ],
    procedure: [
      "Orang tua/siswa mengajukan permohonan di loket pelayanan Tata Usaha.",
      "Petugas mengonfirmasi keaktifan siswa pada buku induk dan draf surat dibuat.",
      "Kepala Sekolah menandatangani surat keterangan aktif.",
      "Surat diberi nomor, stempel basah sekolah, dan diserahkan kepada pemohon."
    ],
    time: "15 Menit",
    cost: "Rp 0,- (Gratis)",
    output: "Surat Keterangan Siswa Aktif Sekolah"
  },
  {
    id: 4,
    title: "Pelayanan Legalisasi Ijazah",
    requirements: [
      "Menunjukkan dokumen Ijazah / Surat Keterangan Hasil Ujian (SKHU) asli.",
      "Menyerahkan fotokopi dokumen yang akan dilegalisasi (maksimal 5 lembar)."
    ],
    procedure: [
      "Pemohon menyerahkan dokumen asli beserta fotokopi ke petugas loket Tata Usaha.",
      "Petugas mencocokkan fisik fotokopi dengan dokumen asli.",
      "Kepala Sekolah menandatangani lembar fotokopi sebagai pengesahan.",
      "Petugas membubuhkan stempel resmi sekolah dan mengarsipkan satu salinan."
    ],
    time: "30 Menit",
    cost: "Rp 0,- (Gratis)",
    output: "Fotokopi Ijazah / Dokumen Terlegalisasi Resmi"
  },
  {
    id: 5,
    title: "Pelayanan Rekomendasi Bantuan Sosial / PIP",
    requirements: [
      "Fotokopi Kartu Indonesia Pintar (KIP) atau Kartu Perlindungan Sosial (KPS/KKS/PKH).",
      "Fotokopi Kartu Keluarga (KK) dan Akta Kelahiran.",
      "Surat Keterangan Tidak Mampu (SKTM) dari Kelurahan/Desa (bila tidak memiliki kartu jaminan sosial)."
    ],
    procedure: [
      "Orang tua mengajukan permohonan bantuan sosial/PIP dengan melampirkan dokumen pendukung ke loket Tata Usaha.",
      "Petugas menyeleksi dan memasukkan usulan siswa penerima bantuan ke sistem Dapodik.",
      "Sekolah menerbitkan Surat Rekomendasi/Keterangan bahwa siswa yang bersangkutan layak diusulkan menerima bantuan.",
      "Berkas usulan dikirimkan secara kolektif ke Dinas Pendidikan Kabupaten."
    ],
    time: "3 Hari Kerja",
    cost: "Rp 0,- (Gratis)",
    output: "Surat Rekomendasi Sekolah & Penginputan Data Usulan PIP"
  }
];
