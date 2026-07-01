/**
 * SD Negeri 8 Wonogiri - Main Application Entry & MPA Router
 * This handles loading the correct page template based on current window location
 */

import React, { useState, useEffect } from 'react';
import { 
  Navbar, Footer 
} from './components/Navigation';
import { 
  SectionTitle, QuoteCard, NewsCard, GalleryCard, 
  TeacherCard, AchievementCard, DocumentViewer, ContactForm, 
  HeroCarousel 
} from './components/UIComponents';
import { 
  SCHOOL_CONFIG as RAW_SCHOOL_CONFIG, HERO_SLIDES as RAW_HERO_SLIDES, MOTIVATION_QUOTE as RAW_MOTIVATION_QUOTE, QUICK_MENU_ITEMS,
  VISION_MISSION as RAW_VISION_MISSION, TEACHERS as RAW_TEACHERS, FACILITIES as RAW_FACILITIES, INNOVATIONS as RAW_INNOVATIONS, NEWS_ITEMS as RAW_NEWS_ITEMS,
  ACHIEVEMENTS as RAW_ACHIEVEMENTS, ACTIVITIES as RAW_ACTIVITIES, GALLERY_ITEMS as RAW_GALLERY_ITEMS, TRANSPARENCY_DOCS as RAW_TRANSPARENCY_DOCS, FAQS,
  NewsItem, Achievement, GalleryItem, TransparencyDoc, PublicServiceSop, RAW_PUBLIC_SERVICES,
  Teacher, Facility, Innovation, Activity, Quote, HeroSlide
} from './data/schoolData';
import { 
  BookOpen, Calendar, User, ArrowRight, Trophy, Download, 
  Eye, FileText, Search, Sparkles, Send, CheckCircle, Info, 
  MapPin, ChevronRight, GraduationCap, Clock, Phone, Mail,
  ListFilter, Shield, Check, FileCheck, Users, HelpCircle,
  School, Compass, UserPlus, X, Settings, Maximize2, ZoomIn,
  ZoomOut, ExternalLink, File, Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState('beranda');
  const [activeTab, setActiveTab] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Reactive state for school CMS data, initialized from localStorage if edited
  const [SCHOOL_CONFIG, setSchoolConfig] = useState<typeof RAW_SCHOOL_CONFIG>(() => {
    const saved = localStorage.getItem('school_config');
    return saved ? JSON.parse(saved) : RAW_SCHOOL_CONFIG;
  });
  const [HERO_SLIDES, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('hero_slides');
    return saved ? JSON.parse(saved) : RAW_HERO_SLIDES;
  });
  const [MOTIVATION_QUOTE, setMotivationQuote] = useState<Quote>(() => {
    const saved = localStorage.getItem('motivation_quote');
    return saved ? JSON.parse(saved) : RAW_MOTIVATION_QUOTE;
  });
  const [VISION_MISSION, setVisionMission] = useState<typeof RAW_VISION_MISSION>(() => {
    const saved = localStorage.getItem('vision_mission');
    return saved ? JSON.parse(saved) : RAW_VISION_MISSION;
  });
  const [TEACHERS, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('teachers');
    return saved ? JSON.parse(saved) : RAW_TEACHERS;
  });
  const [FACILITIES, setFacilities] = useState<Facility[]>(() => {
    const saved = localStorage.getItem('facilities');
    return saved ? JSON.parse(saved) : RAW_FACILITIES;
  });
  const [INNOVATIONS, setInnovations] = useState<Innovation[]>(() => {
    const saved = localStorage.getItem('innovations');
    return saved ? JSON.parse(saved) : RAW_INNOVATIONS;
  });
  const [NEWS_ITEMS, setNewsItems] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('news_items');
    return saved ? JSON.parse(saved) : RAW_NEWS_ITEMS;
  });
  const [ACHIEVEMENTS, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : RAW_ACHIEVEMENTS;
  });
  const [ACTIVITIES, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('activities');
    return saved ? JSON.parse(saved) : RAW_ACTIVITIES;
  });
  const [GALLERY_ITEMS, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('gallery_items');
    return saved ? JSON.parse(saved) : RAW_GALLERY_ITEMS;
  });
  const [TRANSPARENCY_DOCS, setTransparencyDocs] = useState<TransparencyDoc[]>(() => {
    const saved = localStorage.getItem('transparency_docs');
    return saved ? JSON.parse(saved) : RAW_TRANSPARENCY_DOCS;
  });
  const [PUBLIC_SERVICES, setPublicServices] = useState<PublicServiceSop[]>(() => {
    const saved = localStorage.getItem('public_services');
    return saved ? JSON.parse(saved) : RAW_PUBLIC_SERVICES;
  });

  // State for active public service tab
  const [activeServiceId, setActiveServiceId] = useState<number>(1);
  const [activeServiceTab, setActiveServiceTab] = useState<'sop' | 'pdf'>('sop');
  const [pdfZoom, setPdfZoom] = useState<number>(100);
  const [viewOriginalPdf, setViewOriginalPdf] = useState<boolean>(false);
  
  // Lightbox Modal State
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  
  // PDF Preview State
  const [selectedDoc, setSelectedDoc] = useState<TransparencyDoc | null>(null);
  const [transparencyYear, setTransparencyYear] = useState<string>('Semua');
  const [transparencySearch, setTransparencySearch] = useState<string>('');

  // SPMB Wizard State
  const [spmbStep, setSpmbStep] = useState(1);
  const [spmbSubmitted, setSpmbSubmitted] = useState(false);
  const [spmbForm, setSpmbForm] = useState({
    namaLengkap: '',
    nik: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: '',
    agama: 'Islam',
    alamatSiswa: '',
    namaAyah: '',
    pekerjaanAyah: '',
    namaIbu: '',
    pekerjaanIbu: '',
    noWhatsappOrangTua: '',
    pilihanEkstrakurikuler: 'Pramuka'
  });

  // URL Path Matching to normalize current page in MPA
  useEffect(() => {
    const handlePath = () => {
      const path = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      
      // Get category filter from URL if present
      const catParam = searchParams.get('cat');
      if (catParam) {
        setActiveTab(catParam);
      }

      if (path === '/' || path.endsWith('/index.html') || path === '') {
        setCurrentPage('beranda');
      } else if (path.endsWith('/profil.html') || path.includes('/profil')) {
        setCurrentPage('profil');
      } else if (path.endsWith('/kegiatan.html') || path.includes('/kegiatan')) {
        setCurrentPage('kegiatan');
      } else if (path.endsWith('/prestasi.html') || path.includes('/prestasi')) {
        setCurrentPage('prestasi');
      } else if (path.endsWith('/berita.html') || (path.includes('/berita') && !path.includes('detail'))) {
        setCurrentPage('berita');
      } else if (path.endsWith('/berita-detail.html') || path.includes('/berita-detail')) {
        setCurrentPage('berita-detail');
      } else if (path.endsWith('/galeri.html') || path.includes('/galeri')) {
        setCurrentPage('galeri');
      } else if (path.endsWith('/inovasi.html') || path.includes('/inovasi')) {
        setCurrentPage('inovasi');
      } else if (path.endsWith('/transparansi.html') || path.includes('/transparansi')) {
        setCurrentPage('transparansi');
      } else if (path.endsWith('/layanan-publik.html') || path.includes('/layanan-publik')) {
        setCurrentPage('layanan-publik');
      } else if (path.endsWith('/spmb.html') || path.includes('/spmb')) {
        setCurrentPage('spmb');
      } else if (path.endsWith('/kontak.html') || path.includes('/kontak')) {
        setCurrentPage('kontak');
      } else {
        setCurrentPage('beranda');
      }
    };

    handlePath();
    window.addEventListener('popstate', handlePath);
    return () => window.removeEventListener('popstate', handlePath);
  }, []);

  // Handle Hash Scrolling for sections like #sambutan, #history, etc.
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [currentPage]);

  // Handle SPMB Registration Submit
  const handleSpmbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSpmbStep(3); // Loading step
    setTimeout(() => {
      setSpmbSubmitted(true);
      setSpmbStep(4); // Success step
    }, 2000);
  };

  // Render Breadcrumb helper
  const renderBreadcrumb = (pageTitle: string) => (
    <div className="bg-slate-100 py-4 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-slate-500 font-sans flex items-center space-x-2">
        <a href="/index.html" className="hover:text-emerald-700 transition-colors">Beranda</a>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">{pageTitle}</span>
      </div>
    </div>
  );

  // ----------------------------------------------------
  // PAGE RENDERERS
  // ----------------------------------------------------

  // 1. BERANDA (Home Page)
  const renderBeranda = () => {
    return (
      <div className="space-y-12 pb-12">
        <HeroCarousel slides={HERO_SLIDES} />
        
        {/* Quote Motivasi */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuoteCard {...MOTIVATION_QUOTE} />
        </div>

        {/* Profil Singkat & Sambutan Kepala Sekolah */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Foto Kepala Sekolah */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-400 rounded-3xl z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-100 rounded-3xl z-0"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 z-10 aspect-square sm:aspect-[4/5]">
                <img 
                  src={SCHOOL_CONFIG.headmaster.photo} 
                  alt={SCHOOL_CONFIG.headmaster.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 left-6 z-20 bg-white/95 backdrop-blur shadow-xl rounded-2xl p-4 border border-slate-100 text-left max-w-xs">
                <p className="font-sans font-bold text-slate-900 text-xs sm:text-sm">{SCHOOL_CONFIG.headmaster.name}</p>
                <p className="font-mono text-[9px] sm:text-[10px] text-emerald-700 font-bold uppercase tracking-wider mt-0.5">Kepala Sekolah SDN 8 Wonogiri</p>
              </div>
            </div>

            {/* Profil Singkat */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                Sambutan Hangat
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
                Membangun Generasi Unggul Sejak Dini
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic">
                "{SCHOOL_CONFIG.headmaster.welcomeMessage.split('\n\n')[2]}"
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                SD Negeri 8 Wonogiri berkomitmen menghadirkan iklim belajar yang inklusif, asri (Adiwiyata), inovatif, dan berlandaskan budi pekerti Pancasila. Kami bersinergi dengan orang tua untuk memastikan potensi buah hati berkembang pesat.
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                <a 
                  href="/profil.html#sambutan" 
                  className="inline-flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <span>Baca Sambutan Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="/profil.html" 
                  className="inline-flex items-center space-x-1.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase px-5 py-3 rounded-full transition-all"
                >
                  <span>Sejarah & Visi Misi</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Menu (6 Menu Cards) */}
        <section className="bg-slate-50 py-12 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionTitle 
              title="Menu Akses Cepat" 
              subtitle="Temukan seluruh informasi penting, layanan administrasi, dan laporan kinerja sekolah secara praktis."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {QUICK_MENU_ITEMS.map((item) => {
                return (
                  <a 
                    id={`quick-menu-card-${item.id}`}
                    key={item.id}
                    href={item.link}
                    className={`group block p-6 bg-white border rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3.5 rounded-2xl border transition-colors ${item.color}`}>
                        {/* Render Icon dynamically */}
                        {item.id === 1 && <School className="w-6 h-6" />}
                        {item.id === 2 && <Compass className="w-6 h-6" />}
                        {item.id === 3 && <Trophy className="w-6 h-6" />}
                        {item.id === 4 && <BookOpen className="w-6 h-6" />}
                        {item.id === 5 && <FileText className="w-6 h-6" />}
                        {item.id === 6 && <UserPlus className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-slate-900 text-base sm:text-lg group-hover:text-emerald-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1.5 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Berita Terbaru */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle 
            title="Kabar & Pengumuman Terbaru" 
            subtitle="Dapatkan informasi berita terkini seputar kegiatan belajar, pengumuman ujian, serta artikel menarik."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            {NEWS_ITEMS.slice(0, 3).map((news: NewsItem) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
          <div className="pt-10">
            <a 
              href="/berita.html" 
              className="inline-flex items-center space-x-1.5 bg-emerald-950 hover:bg-emerald-900 text-white font-bold text-xs uppercase px-6 py-3 rounded-full shadow transition-all"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Banner SPMB / PPDB Highlight */}
        <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white py-10 sm:py-12 border-y border-emerald-950 shadow-inner relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
            <GraduationCap className="w-[500px] h-[500px] text-white" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <span className="bg-amber-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow">
              PENERIMAAN SISWA BARU TA 2026/2027
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-extrabold text-white tracking-tight leading-none drop-shadow">
              Mari Bergabung Bersama Kami!
            </h2>
            <p className="text-emerald-100 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
              Daftarkan putra-putri tercinta di SD Negeri 8 Wonogiri. Nikmati proses pendaftaran online yang cepat, tanpa pungutan biaya, dengan dukungan guru bersertifikasi tinggi dan iklim belajar Adiwiyata.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a 
                href="/spmb.html" 
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm uppercase px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Daftar Online Sekarang
              </a>
              <a 
                href="/spmb.html#alur" 
                className="border border-white/30 hover:bg-white/10 text-white font-bold text-xs sm:text-sm uppercase px-8 py-4 rounded-full transition-all"
              >
                Persyaratan & Alur
              </a>
            </div>
          </div>
        </section>

        {/* Kegiatan Terbaru & Ekstrakurikuler */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle 
            title="Kegiatan & Pembelajaran" 
            subtitle="Intip keseruan pembelajaran kreatif Kurikulum Merdeka serta kegiatan ekstrakurikuler pembentuk karakter siswa."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {ACTIVITIES.slice(0, 3).map((act) => (
              <div key={act.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-left flex flex-col hover:shadow-md transition-all">
                <div className="h-44 bg-slate-100 overflow-hidden relative">
                  <img src={act.image} alt={act.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-900">
                    {act.category}
                  </span>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <span className="text-[10px] text-slate-500 font-mono flex items-center mb-1">
                    <Clock className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    {act.schedule}
                  </span>
                  <h3 className="font-sans font-bold text-slate-900 text-base leading-snug mb-2 flex-grow line-clamp-1">{act.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">{act.description}</p>
                  <a href="/kegiatan.html" className="text-xs font-bold text-emerald-700 flex items-center mt-auto hover:text-emerald-800">
                    <span>Lihat Rincian Kegiatan</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-10">
            <a 
              href="/kegiatan.html" 
              className="inline-flex items-center space-x-1.5 bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs uppercase px-6 py-3 rounded-full shadow transition-all"
            >
              <span>Eksplor Semua Kegiatan</span>
            </a>
          </div>
        </section>

        {/* Prestasi Juara Terbaru */}
        <section className="bg-slate-50 py-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionTitle 
              title="Prestasi Terkini SDN 8 Wonogiri" 
              subtitle="Sekolah dasar ramah anak dengan tradisi mengukir juara di bidang akademis dan non-akademis."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
              {ACHIEVEMENTS.slice(0, 4).map((ach: Achievement) => (
                <div key={ach.id} className="transform hover:scale-[1.02] transition-transform h-full">
                  <AchievementCard achievement={ach} />
                </div>
              ))}
            </div>
            <div className="pt-12">
              <a 
                href="/prestasi.html" 
                className="inline-flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase px-6 py-3 rounded-full shadow transition-all"
              >
                <span>Lihat Semua Prestasi Juara</span>
              </a>
            </div>
          </div>
        </section>

        {/* Banner CariYanlik (SIPPN) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center my-8">
            <a 
              href="https://sippn.menpan.go.id/" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Menuju SIPPN - CariYanlik"
              className="inline-block group"
            >
              <div className="bg-gradient-to-r from-[#e31e65] to-[#c81452] rounded-xl shadow-lg hover:shadow-xl transition-all px-6 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40 shrink-0">
                    <span className="text-white font-sans font-black text-lg sm:text-xl">c</span>
                  </div>
                  <div className="font-sans text-2xl sm:text-3xl tracking-tight text-left">
                    <span className="text-white font-black">cari</span><span className="text-white/90 font-light">yanlik</span>
                  </div>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/30"></div>
                <div className="text-center sm:text-left">
                  <p className="text-white font-bold text-xs sm:text-sm leading-tight">SIPPN - CariYanlik</p>
                  <p className="text-white/80 text-[10px] sm:text-xs leading-tight">Sistem Informasi Pelayanan Publik Nasional</p>
                </div>
                <span className="bg-white text-[#e31e65] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mt-2 sm:mt-0 sm:ml-2 whitespace-nowrap">KemenPAN-RB</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  };

  // 2. PROFIL
  const renderProfil = () => {
    return (
      <div className="pb-20">
        {/* Banner Header */}
        <div className="relative bg-emerald-950 text-white py-12 sm:py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-15"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">Tentang Institusi</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">Profil Lengkap Sekolah</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto font-sans">Mengenal visi, misi, sejarah pendirian, fasilitas pembelajaran, serta struktur guru pendidik di SDN 8 Wonogiri.</p>
          </div>
        </div>
        {renderBreadcrumb('Profil Sekolah')}

        {/* Sambutan Kepala Sekolah */}
        <section id="sambutan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 sticky top-28">
              <div className="rounded-2xl overflow-hidden border-4 border-emerald-100 shadow-xl bg-slate-50">
                <img src={SCHOOL_CONFIG.headmaster.photo} alt={SCHOOL_CONFIG.headmaster.name} referrerPolicy="no-referrer" className="w-full object-cover aspect-[4/5]" />
              </div>
              <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                <p className="font-bold text-slate-900 text-sm">{SCHOOL_CONFIG.headmaster.name}</p>
                <p className="text-xs text-slate-500 mt-1">NIP: {SCHOOL_CONFIG.headmaster.nip}</p>
                <p className="text-xs text-emerald-700 font-bold mt-1 uppercase">Kepala Sekolah SDN 8 Wonogiri</p>
              </div>
            </div>
            
            <div className="lg:col-span-8 text-left space-y-6">
              <span className="text-xs font-extrabold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">Sambutan Kepala Sekolah</span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900">Sri Hartati, S.Pd., M.Pd.</h2>
              <div className="h-1 w-20 bg-amber-500 rounded-full"></div>
              
              <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
                {SCHOOL_CONFIG.headmaster.welcomeMessage}
              </div>
            </div>
          </div>
        </section>

        {/* Sejarah Sekolah */}
        <section id="sejarah" className="bg-slate-50 py-16 scroll-mt-24 border-y border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-left space-y-6">
            <div className="text-center">
              <span className="text-xs font-extrabold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">Lintas Sejarah</span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 mt-3">Sejarah Pendirian Sekolah</h2>
              <div className="h-1 w-20 bg-amber-500 rounded-full mx-auto mt-3"></div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line text-justify font-sans">
              {SCHOOL_CONFIG.history}
            </p>
          </div>
        </section>

        {/* Visi Misi & Tujuan */}
        <section id="visi-misi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 text-left">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">Tujuan Pendidikan</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 mt-3">Visi, Misi & Tujuan</h2>
            <div className="h-1 w-20 bg-amber-500 rounded-full mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Visi */}
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-8 shadow-md border border-emerald-800">
              <span className="text-xs text-amber-400 font-mono uppercase tracking-widest font-bold">Visi SDN 8 Wonogiri</span>
              <h3 className="text-xl sm:text-2xl font-bold mt-4 leading-relaxed italic">
                "{VISION_MISSION.vision}"
              </h3>
            </div>

            {/* Misi List */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-md">
              <h3 className="text-lg font-bold text-slate-950 mb-4 border-b pb-2 flex items-center">
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full mr-2"></span>
                Misi Utama Sekolah:
              </h3>
              <ol className="space-y-3 text-slate-600 text-xs sm:text-sm">
                {VISION_MISSION.mission.map((misi: string, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <span className="bg-emerald-50 text-emerald-800 font-bold font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-3 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Sasaran Tujuan Akhir */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 mt-8">
            <h3 className="text-lg font-bold text-slate-950 mb-4 border-b pb-2 flex items-center">
              <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full mr-2"></span>
              Tujuan Jangka Menengah Sekolah (Indikator Kinerja):
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-600">
              {VISION_MISSION.goals.map((goal: string, idx: number) => (
                <div key={idx} className="flex items-start space-x-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Guru dan Tendik */}
        <section id="guru" className="bg-slate-50 py-16 border-y border-slate-200 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-extrabold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">Keluarga Besar</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 mt-3">Guru & Tenaga Kependidikan</h2>
            <div className="h-1 w-20 bg-amber-500 rounded-full mx-auto mt-3"></div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-4 mb-10 leading-relaxed font-sans">
              Didukung oleh guru pendidik berkompetensi tinggi, ramah anak, serta lulusan universitas ternama berdedikasi penuh.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 pt-2">
              {TEACHERS.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          </div>
        </section>

        {/* Fasilitas */}
        <section id="fasilitas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 text-left">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">Lingkungan Belajar</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 mt-3">Fasilitas Penunjang Pendidikan</h2>
            <div className="h-1 w-20 bg-amber-500 rounded-full mx-auto mt-3"></div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-4 leading-relaxed text-center font-sans">
              Sarana fisik yang representatif dan asri berstandar Adiwiyata untuk mengoptimalkan proses kognitif serta afektif siswa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((fac) => (
              <div key={fac.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all">
                <div className="h-48 overflow-hidden bg-slate-50">
                  <img src={fac.image} alt={fac.name} referrerPolicy="no-referrer" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-tight mb-2">{fac.name}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{fac.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  // 3. KEGIATAN
  const renderKegiatan = () => {
    const tabs = ['Semua', 'Intrakurikuler', 'Kokurikuler', 'Ekstrakurikuler'];
    const filteredActivities = activeTab === 'Semua' 
      ? ACTIVITIES 
      : ACTIVITIES.filter(a => a.category === activeTab);

    return (
      <div className="pb-20 text-left">
        {/* Header */}
        <div className="relative bg-emerald-950 text-white py-12 sm:py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-15"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">Aktivitas Siswa</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">Program Kegiatan Sekolah</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto font-sans">Eksplorasi ragam kegiatan pembelajaran inti (intrakurikuler), projek penguatan literasi (kokurikuler), dan bakat minat siswa (ekstrakurikuler).</p>
          </div>
        </div>
        {renderBreadcrumb('Kegiatan Siswa')}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Tab Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b pb-4">
            <div className="text-xs font-bold text-slate-400 flex items-center mr-2 uppercase tracking-wider">
              <ListFilter className="w-4 h-4 mr-1 text-slate-400" />
              <span>Saring Kategori:</span>
            </div>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); }}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                  activeTab === tab 
                    ? 'bg-emerald-700 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => (
              <div key={act.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col h-full">
                <div className="h-48 overflow-hidden bg-slate-50 relative">
                  <img src={act.image} alt={act.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-emerald-950 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-900">
                    {act.category}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-xs text-slate-500 font-mono mb-2">
                    <Clock className="w-4 h-4 mr-1 text-emerald-600 shrink-0" />
                    <span>{act.schedule}</span>
                  </div>
                  <h3 className="font-sans font-bold text-slate-900 text-base sm:text-lg mb-2 leading-tight">
                    {act.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                    {act.description}
                  </p>
                  <div className="pt-4 border-t border-slate-100 mt-auto flex items-center text-xs font-bold text-emerald-700">
                    <span className="bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center">
                      <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" />
                      Aktif Berjalan Gratis
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 4. PRESTASI
  const renderPrestasi = () => {
    const tabs = ['Semua', 'Akademik', 'Non-Akademik'];
    const filteredAchievements = activeTab === 'Semua' 
      ? ACHIEVEMENTS 
      : ACHIEVEMENTS.filter(a => a.category === activeTab);

    return (
      <div className="pb-20 text-left">
        <div className="relative bg-emerald-950 text-white py-12 sm:py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-15"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">Tradisi Juara</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">Prestasi Siswa Siswi</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto font-sans">Kumpulan pencapaian piala kejuaraan membanggakan yang diraih oleh siswa berprestasi SDN 8 Wonogiri.</p>
          </div>
        </div>
        {renderBreadcrumb('Prestasi')}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Tab Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b pb-4">
            <div className="text-xs font-bold text-slate-400 flex items-center mr-2 uppercase tracking-wider">
              <ListFilter className="w-4 h-4 mr-1 text-slate-400" />
              <span>Saring Bidang:</span>
            </div>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); }}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                  activeTab === tab 
                    ? 'bg-amber-500 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid Achievements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAchievements.map((ach) => (
              <AchievementCard key={ach.id} achievement={ach} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 5. BERITA (News Portal)
  const renderBerita = () => {
    const tabs = ['Semua', 'Berita', 'Pengumuman', 'Artikel'];
    
    // Filter news items based on both Tab selection and search bar text
    const filteredNews = NEWS_ITEMS.filter((item) => {
      const matchTab = activeTab === 'Semua' || item.category === activeTab;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });

    return (
      <div className="pb-20 text-left">
        <div className="relative bg-emerald-950 text-white py-12 sm:py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-15"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">Kabar Publikasi</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">Berita & Pengumuman</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto font-sans">Dapatkan asupan informasi resmi terkini seputar kalender sekolah, pengumuman ujian, artikel literasi, dan agenda penting.</p>
          </div>
        </div>
        {renderBreadcrumb('Berita Sekolah')}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Search Box & Tab filters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10 pb-6 border-b border-slate-200">
            {/* Search Input */}
            <div className="lg:col-span-5">
              <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600 transition-all">
                <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik kata kunci pencarian berita..."
                  className="w-full text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-xs text-slate-400 hover:text-slate-600 px-1 font-bold">X</button>
                )}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="lg:col-span-7 flex flex-wrap gap-1.5 justify-start lg:justify-end">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); }}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === tab 
                      ? 'bg-emerald-700 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Status */}
          {searchQuery && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs sm:text-sm text-amber-800 flex items-center justify-between">
              <span>Menampilkan hasil pencarian untuk kata kunci: <strong>"{searchQuery}"</strong> ({filteredNews.length} Berita ditemukan)</span>
              <button onClick={() => setSearchQuery('')} className="font-bold underline ml-2 hover:text-amber-900">Reset Pencarian</button>
            </div>
          )}

          {/* Grid Berita */}
          {filteredNews.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-800">Tidak Menemukan Berita</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-sm mx-auto">Coba gunakan filter kategori lain atau ketik kata kunci pencarian yang lebih umum.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // 6. DETAIL BERITA
  const renderBeritaDetail = () => {
    // Extract ID from query parameters
    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get('id');
    const newsId = idParam ? parseInt(idParam) : 1;
    
    // Find matching news item
    const newsItem = NEWS_ITEMS.find(n => n.id === newsId) || NEWS_ITEMS[0];

    const shareUrl = window.location.href;

    const handleCopyLink = () => {
      navigator.clipboard.writeText(shareUrl);
      alert('Pemberitahuan: Link berhasil disalin ke clipboard!');
    };

    return (
      <div className="pb-20 text-left">
        {renderBreadcrumb(`Berita / ${newsItem.category}`)}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Full News Article */}
            <article className="lg:col-span-8 space-y-6 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm">
              <div className="space-y-4">
                <span className="inline-flex px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-100">
                  {newsItem.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
                  {newsItem.title}
                </h1>
                
                <div className="flex flex-wrap items-center text-xs font-mono text-slate-500 gap-4 pt-2 border-b border-slate-100 pb-4">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-emerald-600" />
                    Tanggal: {newsItem.date}
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1 text-emerald-600" />
                    Ditulis oleh: {newsItem.author}
                  </span>
                </div>
              </div>

              {/* Cover Image */}
              <div className="rounded-2xl overflow-hidden bg-slate-50 shadow aspect-[16/9] w-full">
                <img 
                  src={newsItem.image} 
                  alt={newsItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content text */}
              <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-5 whitespace-pre-line text-justify font-sans">
                {newsItem.content}
              </div>

              {/* Article tags */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-bold text-slate-400 mr-1 uppercase">Tagar:</span>
                {newsItem.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-lg">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share Box */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Bagikan Informasi Ini</h4>
                  <p className="text-xs text-slate-500 mt-1">Sampaikan kabar bermanfaat ini ke kerabat atau kelompok chat Anda.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl hover:bg-emerald-100 transition-colors"
                  >
                    Salin Link
                  </button>
                  <a 
                    href={`https://wa.me/?text=${encodeURIComponent(newsItem.title + ' ' + shareUrl)}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

            </article>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Box 1: Recent articles */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg border-b pb-2 flex items-center">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full mr-2"></span>
                  Kabar Berita Lainnya
                </h3>
                <div className="space-y-4">
                  {NEWS_ITEMS.filter(n => n.id !== newsItem.id).map((other) => (
                    <a 
                      key={other.id} 
                      href={`/berita-detail.html?id=${other.id}`}
                      className="group flex items-start space-x-3.5 border-b border-slate-50 pb-3 last:border-0 last:pb-0"
                    >
                      <div className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0">
                        <img src={other.image} alt={other.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase text-emerald-700">{other.category}</span>
                        <h4 className="font-bold text-xs text-slate-800 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors mt-0.5">
                          {other.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono block mt-1">{other.date}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Box 2: Quick Info */}
              <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 shadow space-y-4">
                <h4 className="font-bold text-sm text-amber-400 uppercase tracking-widest font-mono">Hubungi Sekolah</h4>
                <p className="text-xs leading-relaxed text-emerald-100">Ada hal penting yang ingin dikonfirmasikan langsung dengan tim Tata Usaha SDN 8 Wonogiri?</p>
                <div className="space-y-2 text-xs pt-2">
                  <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-amber-400 shrink-0" /> {SCHOOL_CONFIG.phone}</p>
                  <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-amber-400 shrink-0" /> {SCHOOL_CONFIG.email}</p>
                </div>
                <a href="/kontak.html" className="block text-center bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase py-3 rounded-xl transition-all">Hubungi Kami</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  // 7. GALERI
  const renderGaleri = () => {
    const categories = ['Semua', 'Sekolah', 'Kegiatan', 'Prestasi'];
    const filteredMedia = activeTab === 'Semua' 
      ? GALLERY_ITEMS 
      : GALLERY_ITEMS.filter(m => m.category === activeTab);

    return (
      <div className="pb-20 text-left">
        <div className="relative bg-emerald-950 text-white py-12 sm:py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-15"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">Dokumentasi Visual</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">Galeri Kegiatan Sekolah</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto font-sans">Kumpulan jepretan kamera aksi seru siswa siswi dan guru dalam berbagai upacara, perlombaan, literasi, serta aksi lingkungan hidup.</p>
          </div>
        </div>
        {renderBreadcrumb('Galeri Media')}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Tab Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b pb-4">
            <div className="text-xs font-bold text-slate-400 flex items-center mr-2 uppercase tracking-wider">
              <ListFilter className="w-4 h-4 mr-1 text-slate-400" />
              <span>Saring Kategori:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveTab(cat); }}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                  activeTab === cat 
                    ? 'bg-emerald-700 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredMedia.map((item) => (
              <GalleryCard key={item.id} item={item} onZoom={(itm) => setSelectedMedia(itm)} />
            ))}
          </div>
        </div>

        {/* Lightbox Modal overlay */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/90 z-50 flex flex-col justify-center items-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedMedia(null)}
            >
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-3xl p-2 sm:p-3 shadow-2xl max-w-4xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
                  <img src={selectedMedia.url} alt={selectedMedia.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setSelectedMedia(null)}
                    className="absolute top-4 right-4 bg-slate-900/60 text-white rounded-full p-2 hover:bg-slate-900/80 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5 text-left">
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-emerald-100 inline-block mb-2">
                    {selectedMedia.category}
                  </span>
                  <h3 className="font-sans font-bold text-slate-900 text-base sm:text-lg leading-tight">
                    {selectedMedia.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-1">Tanggal dokumentasi: {selectedMedia.date}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // 8. INOVASI
  const renderInovasi = () => {
    return (
      <div className="pb-20 text-left">
        <div className="relative bg-emerald-950 text-white py-12 sm:py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-15"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">Unggulan Mutu</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">Program Inovasi Sekolah</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto font-sans">Menumbuhkan pembiasaan literasi literer dan pelestarian sampah Adiwiyata secara terstruktur melalui program "Gemari" & "Ditali Rapia".</p>
          </div>
        </div>
        {renderBreadcrumb('Inovasi Sekolah')}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
          
          {/* Inovasi 1: Gemari */}
          <section id="gemari" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24">
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-400 rounded-3xl z-0"></div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-emerald-100 rounded-3xl z-0"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-150 bg-slate-50 z-10 aspect-video sm:aspect-square">
                <img src={INNOVATIONS[0].image} alt={INNOVATIONS[0].title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-amber-200 inline-block">
                Inovasi Literasi Dasar
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 leading-tight">
                {INNOVATIONS[0].title}
              </h2>
              <p className="text-emerald-700 font-bold text-sm sm:text-base italic">
                "{INNOVATIONS[0].tagline}"
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                {INNOVATIONS[0].description}
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600">
                <h4 className="font-bold text-slate-900 mb-1">Latar Belakang:</h4>
                <p>{INNOVATIONS[0].background}</p>
              </div>
              <div className="space-y-2.5">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Dampak & Keberhasilan Nyata:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
                  {INNOVATIONS[0].impact.map((imp, idx) => (
                    <div key={idx} className="flex items-start space-x-2 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Inovasi 2: Ditali Rapia */}
          <section id="ditali-rapia" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24 pt-12 border-t border-slate-200">
            <div className="lg:col-span-7 space-y-5">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-emerald-200 inline-block">
                Inovasi Adiwiyata & Karakter
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 leading-tight">
                {INNOVATIONS[1].title}
              </h2>
              <p className="text-emerald-700 font-bold text-sm sm:text-base italic">
                "{INNOVATIONS[1].tagline}"
              </p>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                {INNOVATIONS[1].description}
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600">
                <h4 className="font-bold text-slate-900 mb-1">Latar Belakang:</h4>
                <p>{INNOVATIONS[1].background}</p>
              </div>
              <div className="space-y-2.5">
                <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Dampak & Keberhasilan Nyata:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
                  {INNOVATIONS[1].impact.map((imp, idx) => (
                    <div key={idx} className="flex items-start space-x-2 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-3xl z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-emerald-100 rounded-3xl z-0"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-150 bg-slate-50 z-10 aspect-video sm:aspect-square">
                <img src={INNOVATIONS[1].image} alt={INNOVATIONS[1].title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>

        </div>
      </div>
    );
  };

  // 9. TRANSPARANSI (RKAS & Dana BOS)
  const renderTransparansi = () => {
    const categories = ['Semua', 'Rencana Kerja (RKAS)', 'Laporan Keuangan', 'Dana BOS', 'Lainnya'];
    const years = ['Semua', '2026', '2025', '2024'];

    const filteredDocs = TRANSPARENCY_DOCS.filter((doc) => {
      const matchCat = activeTab === 'Semua' || doc.category === activeTab;
      const matchYear = transparencyYear === 'Semua' || doc.year === transparencyYear;
      const matchSearch = doc.title.toLowerCase().includes(transparencySearch.toLowerCase());
      return matchCat && matchYear && matchSearch;
    });

    const activeDoc = selectedDoc && filteredDocs.find(d => d.id === selectedDoc.id)
      ? selectedDoc
      : (filteredDocs[0] || null);

    return (
      <div className="pb-24 text-left bg-slate-50/50">
        <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-950 to-slate-950 text-white py-14 sm:py-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-extrabold px-3 py-1 bg-emerald-900/60 border border-emerald-800/40 rounded-full inline-block">Keterbukaan Informasi Publik (UU KIP No. 14/2008)</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white">Transparansi Laporan BOS & RKAS</h1>
            <p className="text-emerald-200/90 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Wujud akuntabilitas, kejujuran, dan keterbukaan informasi anggaran SD Negeri 8 Wonogiri. Seluruh berkas RKAS dan realisasi dana BOS dapat diakses secara transparan dan dipertanggungjawabkan kepada publik.
            </p>
          </div>
        </div>
        {renderBreadcrumb('Transparansi Publik')}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-12">
          
          {/* Integrity Pledge & Core Budget Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Box 1: Piagam Komitmen Transparansi */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/85 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-5 flex items-center justify-center border border-emerald-200">
                    <Shield className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest font-mono">Piagam Integritas Anggaran</h3>
                    <h4 className="text-lg sm:text-xl font-sans font-black text-slate-900">Maklumat Keterbukaan Informasi</h4>
                  </div>
                </div>

                <div className="border-l-4 border-emerald-700 pl-4 py-1 italic text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  "Kami, segenap jajaran pendidik dan komite sekolah SD Negeri 8 Wonogiri, menjamin keterbukaan penuh atas penerimaan dan penyaluran seluruh dana publik, RKAS, serta bantuan operasional sekolah (BOS) secara objektif, jujur, akuntabel, dan bebas dari gratifikasi."
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  Penyusunan anggaran dilakukan melalui forum koordinasi komite, perwakilan guru, wali murid, dan disetujui secara tertulis oleh pengawas satuan pendidikan Dinas Pendidikan dan Kebudayaan Kabupaten Wonogiri.
                </p>
              </div>

              {/* Verified Badge */}
              <div className="pt-6 flex flex-wrap items-center gap-4 text-[11px] border-t border-slate-100 mt-6 justify-between">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold font-sans">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Diaudit Secara Berkala oleh Inspektorat</span>
                </div>
                <div className="font-mono text-slate-400">ID: BOS-REG-27FB2</div>
              </div>
            </div>

            {/* Box 2: Interactive Donut Chart / Progress Widget */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-900/40 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="bg-amber-500/20 text-amber-300 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 border border-amber-500/20 rounded-full">Realisasi Dana BOS 2026</span>
                  <span className="text-[10px] text-emerald-300 font-mono font-bold">WTP Status</span>
                </div>
                <h4 className="font-sans font-extrabold text-base sm:text-lg">Persentase Penggunaan Dana</h4>
                
                <div className="space-y-2.5 pt-1.5 text-xs text-slate-300">
                  <div>
                    <div className="flex justify-between font-bold mb-0.5 text-[11px]">
                      <span>Buku Pembelajaran & ATK Literasi</span>
                      <span className="text-amber-400">35%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-0.5 text-[11px]">
                      <span>Sarana Prasarana & Adiwiyata</span>
                      <span className="text-emerald-400">25%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-0.5 text-[11px]">
                      <span>Honor Pendidik Non-PNS Resmi</span>
                      <span className="text-blue-400">20%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-bold mb-0.5 text-[11px]">
                      <span>Kegiatan Ekstrakurikuler & Asesmen</span>
                      <span className="text-purple-400">20%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-emerald-300 mt-4">
                <span>Total Penyerapan Anggaran:</span>
                <span className="font-bold text-white">Rp 91.000.000 / Tahun</span>
              </div>
            </div>
          </div>

          {/* Interactive Redesigned Split Document Browser Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Search filters, category selectors, and list of documents (5-col) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <h4 className="font-sans font-black text-xs text-slate-800 uppercase tracking-wider flex items-center">
                  <span className="w-1.5 h-4 bg-emerald-700 rounded-full mr-2.5"></span>
                  Penyaring Laporan Publik
                </h4>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama laporan..."
                    value={transparencySearch}
                    onChange={(e) => setTransparencySearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-4 py-2 border border-slate-250 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none"
                  />
                </div>

                {/* Category selectors */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Kategori:</span>
                  <div className="flex flex-wrap gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setActiveTab(cat); }}
                        className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all ${
                          activeTab === cat
                            ? 'bg-emerald-800 border-emerald-800 text-white shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year Selectors */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tahun Anggaran:</span>
                  <div className="flex gap-1 flex-wrap">
                    {years.map((yr) => (
                      <button
                        key={yr}
                        onClick={() => { setTransparencyYear(yr); }}
                        className={`px-3 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                          transparencyYear === yr
                            ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-xs font-black'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documents List Card stack */}
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block pl-1">Menampilkan {filteredDocs.length} Dokumen Laporan</span>
                
                {filteredDocs.length === 0 ? (
                  <div className="bg-white rounded-3xl p-8 border border-dashed border-slate-200 text-center space-y-2">
                    <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-xs text-slate-500 font-medium">Laporan anggaran tidak ditemukan.</p>
                  </div>
                ) : (
                  filteredDocs.map((doc) => {
                    const isSelected = activeDoc && activeDoc.id === doc.id;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDoc(doc)}
                        className={`w-full text-left bg-white p-4 rounded-2xl border transition-all hover:shadow-xs flex items-start gap-4 select-none ${
                          isSelected 
                            ? 'border-emerald-800 shadow-sm ring-1 ring-emerald-800/20 bg-emerald-50/5' 
                            : 'border-slate-200/80 hover:border-slate-350'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-50 text-slate-500'}`}>
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-mono tracking-wide border">
                            {doc.category}
                          </span>
                          <h4 className="font-sans font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2">
                            {doc.title}
                          </h4>
                          <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-mono">
                            <span>Thn {doc.year}</span>
                            <span>•</span>
                            <span>{doc.fileSize}</span>
                          </div>
                        </div>
                        <div className="shrink-0 self-center">
                          <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-600 scale-125 animate-pulse' : 'bg-transparent'}`}></div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Premium Digital Document Reader Workspace (7-col) */}
            <div className="lg:col-span-7">
              {activeDoc ? (
                <div className="flex flex-col bg-slate-800/95 rounded-3xl overflow-hidden border border-slate-700/60 shadow-lg">
                  
                  {/* Workspace Toolbar */}
                  <div className="bg-slate-900 px-4 py-3 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-rose-500 shrink-0 animate-pulse" />
                      <span className="font-mono text-[11px] truncate max-w-[200px] sm:max-w-none" title={`SK_SPP_SDN8WONOGIRI_${activeDoc.title.toUpperCase().replace(/ /g, '_')}.pdf`}>
                        SK_SPP_SDN8_{activeDoc.year}_{activeDoc.category.toUpperCase().replace(/ /g, '_')}.pdf
                      </span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400 shrink-0 select-none">Hal 1 / 1</span>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {/* Zoom Controls */}
                      <div className="flex items-center bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                        <button 
                          onClick={() => setPdfZoom(prev => Math.max(50, prev - 10))}
                          className="p-1 px-2 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                          title="Perkecil"
                        >
                          <ZoomOut className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] font-mono font-bold px-1.5 text-slate-300 w-11 text-center select-none">{pdfZoom}%</span>
                        <button 
                          onClick={() => setPdfZoom(prev => Math.min(150, prev + 10))}
                          className="p-1 px-2 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                          title="Perbesar"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Toggle real pdf vs simulation if fileUrl starts with http */}
                      {activeDoc.fileUrl && activeDoc.fileUrl.startsWith('http') && (
                        <button
                          onClick={() => setViewOriginalPdf(!viewOriginalPdf)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all flex items-center space-x-1 ${
                            viewOriginalPdf
                              ? 'bg-amber-500 border-amber-600 text-slate-950'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                          }`}
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>{viewOriginalPdf ? 'Lihat Salinan SK' : 'Lihat PDF Asli'}</span>
                        </button>
                      )}

                      {/* Download / Print */}
                      <button
                        onClick={() => {
                          if (activeDoc.fileUrl && activeDoc.fileUrl.startsWith('http')) {
                            window.open(activeDoc.fileUrl, '_blank');
                          } else {
                            window.print();
                          }
                        }}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-lg text-[10px] transition-all flex items-center space-x-1"
                        title="Cetak atau Unduh Surat Keputusan"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>

                  {/* Desk Workspace Container with print capabilities */}
                  <div className="bg-slate-700/30 p-4 sm:p-8 overflow-y-auto max-h-[600px] shadow-inner flex justify-center items-start print:bg-white print:p-0 print:max-h-none">
                    {activeDoc.fileUrl && activeDoc.fileUrl.startsWith('http') && viewOriginalPdf ? (
                      /* Embedded Real PDF Frame */
                      <div className="w-full h-[550px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                        <iframe 
                          src={activeDoc.fileUrl} 
                          className="w-full h-full" 
                          title={`PDF ${activeDoc.title}`}
                        />
                      </div>
                    ) : (
                      /* Classical Signed SK Document Sheet */
                      <div 
                        className="bg-white shadow-2xl p-6 sm:p-12 border border-slate-200/85 relative text-slate-800 font-sans mx-auto transition-all text-left w-full max-w-[650px] origin-top print:shadow-none print:border-none print:p-0"
                        style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center', marginBottom: `${(pdfZoom - 100) > 0 ? (pdfZoom - 100) * 4.5 : 0}px` }}
                      >
                        {/* Circular Logo & SK Watermark */}
                        <div className="flex flex-col items-center text-center space-y-1 mb-4 select-none">
                          <div className="w-11 h-11 rounded-full border-2 border-slate-900 flex items-center justify-center p-1 font-black text-xs tracking-tight bg-slate-50">
                            BOS-8
                          </div>
                          <p className="text-[8px] font-mono font-bold uppercase tracking-widest text-slate-400">LAMPIRAN KEPUTUSAN KEPALA SEKOLAH - TRANSPARANSI ANGGARAN</p>
                        </div>

                        {/* Kop Surat Resmi */}
                        <div className="text-center font-sans space-y-0.5 select-none">
                          <h4 className="text-xs sm:text-sm font-black tracking-wider text-slate-900">PEMERINTAH KABUPATEN WONOGIRI</h4>
                          <h4 className="text-xs sm:text-sm font-black tracking-wider text-slate-900">DINAS PENDIDIKAN DAN KEBUDAYAAN</h4>
                          <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-950">SD NEGERI 8 WONOGIRI</h3>
                          <p className="text-[9px] sm:text-[10px] text-slate-500 font-mono">Alamat: Jl. Jenderal Sudirman No. 8, Wonogiri, Jawa Tengah | Telp: (0273) 321085</p>
                          <div className="border-b-2 border-double border-slate-850 mt-2.5"></div>
                        </div>

                        {/* Judul Keputusan */}
                        <div className="text-center my-6 space-y-1 sm:space-y-1.5">
                          <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest font-mono text-emerald-800">LAMPIRAN SURAT KEPUTUSAN KEPALA SD NEGERI 8 WONOGIRI</h4>
                          <p className="text-[10px] font-semibold text-slate-500 font-mono">NOMOR: 188.4 / 092 / SPP / {activeDoc.year}</p>
                          <p className="text-[11px] sm:text-xs font-extrabold uppercase text-slate-800 tracking-wide mt-1.5">TENTANG STANDAR PELAYANAN OPERASIONAL & PERTANGGUNGJAWABAN KEUANGAN</p>
                          <div className="inline-block border-y-2 border-slate-800 px-4 py-1 mt-1 text-[11px] font-black text-slate-950 uppercase tracking-wide bg-slate-50/60 max-w-full truncate">
                            JENIS LAPORAN: {activeDoc.title}
                          </div>
                        </div>

                        {/* Spesifikasi Tabel / Standard Operasional */}
                        <div className="space-y-5 text-[11px] leading-relaxed text-slate-800">
                          <div>
                            <h5 className="font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
                              <span className="w-1.5 h-3 bg-slate-800 mr-2 rounded-xs"></span>
                              I. SPESIFIKASI DOKUMEN ANGGARAN
                            </h5>
                            <table className="w-full border-collapse border border-slate-300 text-[10px] sm:text-[11px]">
                              <tbody>
                                <tr className="border-b border-slate-300">
                                  <td className="w-1/3 bg-slate-50/80 p-2 font-bold border-r border-slate-300">1. Nama Layanan/Dokumen</td>
                                  <td className="p-2 font-semibold text-slate-800">{activeDoc.title}</td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                  <td className="bg-slate-50/80 p-2 font-bold border-r border-slate-300">2. Kategori Dokumen</td>
                                  <td className="p-2 font-semibold text-slate-800">{activeDoc.category}</td>
                                </tr>
                                <tr className="border-b border-slate-300">
                                  <td className="bg-slate-50/80 p-2 font-bold border-r border-slate-300">3. Tahun Anggaran</td>
                                  <td className="p-2 font-semibold text-slate-800">{activeDoc.year}</td>
                                </tr>
                                <tr>
                                  <td className="bg-slate-50/80 p-2 font-bold border-r border-slate-300">4. Ukuran Dokumen File</td>
                                  <td className="p-2 font-semibold text-slate-800">{activeDoc.fileSize} (Terbuka Publik)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          {/* Persyaratan Administrasi */}
                          <div>
                            <h5 className="font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
                              <span className="w-1.5 h-3 bg-slate-800 mr-2 rounded-xs"></span>
                              II. RINCIAN POS ANGGARAN & REALISASI KEUANGAN
                            </h5>
                            
                            {activeDoc.budgetRows && activeDoc.budgetRows.length > 0 ? (
                              <table className="w-full border-collapse border border-slate-300 text-[10px] sm:text-[11px]">
                                <thead className="bg-slate-50/80 border-b border-slate-300 font-bold text-slate-700">
                                  <tr>
                                    <th className="p-2 text-left border-r border-slate-300 w-12">No</th>
                                    <th className="p-2 text-left border-r border-slate-300">Pos Alokasi Belanja Anggaran</th>
                                    <th className="p-2 text-right">Jumlah Anggaran</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {activeDoc.budgetRows.map((row, idx) => (
                                    <tr key={idx} className="border-b border-slate-300">
                                      <td className="p-2 font-mono text-center border-r border-slate-300">{idx + 1}</td>
                                      <td className="p-2 font-sans text-slate-700 border-r border-slate-300">{row.item}</td>
                                      <td className="p-2 font-mono text-right font-bold text-emerald-800">{row.amount}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <div className="bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200 text-center space-y-1">
                                <Info className="w-4 h-4 text-emerald-700 mx-auto" />
                                <p className="text-[10px] text-slate-500">Gunakan rincian pos anggaran di control panel untuk menambahkan rincian sub-pos keuangan.</p>
                              </div>
                            )}
                          </div>

                          {/* Keterangan Penutup */}
                          <div className="space-y-1 text-[10px] text-slate-500 leading-relaxed pt-1 select-none">
                            <p className="font-black uppercase tracking-wider text-slate-600">IV. KETERANGAN VALIDASI:</p>
                            <p>1. Dokumen ini sah dan terintegrasi dengan sistem ARKAS Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi.</p>
                            <p>2. Salinan cetak dokumen ini merupakan dokumen resmi transparansi SDN 8 Wonogiri.</p>
                          </div>
                        </div>

                        {/* Tanda Tangan, NIP dan Cap Digital */}
                        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-[10px] sm:text-[11px] relative select-none">
                          <div className="space-y-0.5">
                            <p className="text-slate-400 font-bold italic">Motto Keuangan: "Akuntabel, Transparan, Bebas Korupsi & Jujur"</p>
                            <p className="text-slate-400 text-[8px] sm:text-[9px]">Dokumen ini diperbarui otomatis setiap pencairan dana operasional sekolah.</p>
                          </div>
                          
                          <div className="text-left sm:text-right space-y-0.5 shrink-0 relative pr-6">
                            <p className="text-slate-500">Ditetapkan di: Wonogiri</p>
                            <p className="text-slate-500">Pada tanggal: {activeDoc.dateAdded}</p>
                            <p className="font-bold text-slate-700 mt-2">Kepala SD Negeri 8 Wonogiri,</p>
                            
                            {/* Blue Stamp circular seal graphic */}
                            <div className="absolute right-12 -bottom-2 w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-double border-blue-600/35 flex items-center justify-center pointer-events-none rotate-12 bg-blue-50/5">
                              <div className="text-center font-sans font-black text-[6px] sm:text-[7px] text-blue-600 leading-none p-1 uppercase">
                                <p className="text-[5px]">PEMERINTAH</p>
                                <p>SDN 8</p>
                                <p>WONOGIRI</p>
                                <p className="text-[5px] font-bold text-blue-500 mt-0.5">CAP BASAH</p>
                              </div>
                            </div>

                            <div className="pt-8">
                              <p className="font-sans font-black text-slate-900 text-xs underline decoration-double">WURYANTI, S.Pd., M.Pd.</p>
                              <p className="text-slate-500 text-[8px] sm:text-[9px] font-mono mt-0.5">NIP. 19710308 199603 2 003</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center space-y-3 flex flex-col items-center justify-center">
                  <FileText className="w-12 h-12 text-slate-300" />
                  <h4 className="font-sans font-bold text-slate-800">Silakan Pilih Laporan Publik</h4>
                  <p className="text-xs text-slate-500 max-w-sm leading-relaxed">Klik pada salah satu daftar laporan di sebelah kiri untuk menampilkan rincian anggaran serta lampiran fisik resmi Surat Keputusan.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 10. LAYANAN PUBLIK
  const renderLayananPublik = () => {
    const activeService = PUBLIC_SERVICES.find(s => s.id === activeServiceId) || PUBLIC_SERVICES[0] || RAW_PUBLIC_SERVICES[0];
    
    // Fallback procedures for added/edited services
    const serviceProcedure = activeService.procedure || [
      "Pemohon menyerahkan seluruh berkas persyaratan fisik ke petugas loket pelayanan Tata Usaha.",
      "Petugas Tata Usaha menerima, mencocokkan, dan memverifikasi kelengkapan berkas fisik.",
      "Kepala Sekolah melakukan validasi akhir dan menandatangani dokumen resmi hasil pelayanan.",
      "Petugas mengarsipkan satu salinan berkas, membubuhkan stempel basah, dan menyerahkan dokumen asli kepada pemohon."
    ];

    return (
      <div className="pb-24 text-left bg-slate-50/50">
        {/* Page Hero Header */}
        <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-950 to-slate-950 text-white py-14 sm:py-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-extrabold px-3 py-1 bg-emerald-900/60 border border-emerald-800/40 rounded-full inline-block">Layanan Publik Prima & Akuntabel</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white">Layanan Publik & SIPPN</h1>
            <p className="text-emerald-200/90 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Selamat datang di Portal Pelayanan Publik SD Negeri 8 Wonogiri. Kami berkomitmen menyelenggarakan pelayanan administrasi sekolah yang transparan, profesional, bebas pungli, dan terintegrasi SIPPN Kemenpan RB.
            </p>
          </div>
        </div>
        {renderBreadcrumb('Layanan Publik')}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 space-y-12">
          
          {/* Top Section: Maklumat Pelayanan (Service Pledge) & CariYanlik SIPPN Integration */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Box 1: Maklumat Pelayanan (Classical Signed Document) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/85 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center border border-amber-200">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-amber-800 uppercase tracking-widest font-mono">Piagam Standar Pelayanan</h3>
                    <h4 className="text-lg sm:text-xl font-sans font-black text-slate-900">Maklumat Pelayanan</h4>
                  </div>
                </div>

                <div className="relative bg-amber-50/20 border border-amber-200/50 rounded-2xl p-5 text-slate-700 italic text-xs sm:text-sm leading-relaxed font-sans font-medium text-justify">
                  <span className="absolute -top-3 left-4 px-2.5 py-0.5 bg-amber-600 text-white rounded-full text-[9px] font-extrabold font-mono uppercase tracking-wider shadow-sm">KOMITMEN UTAMA</span>
                  "Kami seluruh pengelola dan staf pelayanan SD Negeri 8 Wonogiri menyatakan sanggup menyelenggarakan pelayanan publik sesuai Standar Pelayanan yang telah ditetapkan, dan apabila tidak menepati janji ini, kami siap menerima sanksi sesuai dengan peraturan perundang-undangan yang berlaku."
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-600 font-semibold">Pelayanan 100% Gratis & Bebas Pungli</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-600 font-semibold">Prosedur Cepat & Transparan</span>
                  </div>
                </div>
              </div>

              {/* Headmaster Signature Block */}
              <div className="border-t border-slate-100 mt-6 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div>
                  <p className="text-slate-400 font-medium">Motto Pelayanan:</p>
                  <p className="font-extrabold text-emerald-800 text-sm italic">"Melayani dengan Hati, Cepat, Bersih, dan Prima"</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-slate-500 font-medium">Kepala Sekolah SD Negeri 8 Wonogiri,</p>
                  <p className="font-sans font-black text-slate-900 text-sm mt-1">Wuryanti, S.Pd., M.Pd.</p>
                  <p className="text-slate-500 text-[10px] font-mono mt-0.5">NIP. 19710308 199603 2 003</p>
                </div>
              </div>
            </div>

            {/* Box 2: CARIYANLIK SIPPN BANNER INTEGRATION */}
            <div className="lg:col-span-5 bg-gradient-to-br from-rose-50/70 via-white to-rose-50/40 border border-rose-100/90 rounded-3xl p-6 sm:p-8 text-center shadow-xs relative overflow-hidden flex flex-col items-center justify-center space-y-4">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/30 via-transparent to-transparent pointer-events-none"></div>
              
              {/* Logo Group */}
              <div className="flex items-center space-x-2.5 relative z-10 select-none">
                <div className="w-9 h-9 rounded-full bg-[#e31e65] flex items-center justify-center shadow-md relative shrink-0">
                  <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white font-sans font-bold text-[9px] relative -top-[0.5px]">c</span>
                  </div>
                  <div className="absolute bottom-1 right-1 w-2 h-0.5 bg-white rounded-full transform rotate-45 origin-top-left"></div>
                </div>
                <div className="font-sans text-xl sm:text-2xl tracking-tight">
                  <span className="text-[#e31e65] font-black">cari</span>
                  <span className="text-[#e31e65] font-light">yanlik</span>
                </div>
              </div>

              {/* Banner Title */}
              <h2 className="text-xl sm:text-2xl font-sans font-black text-[#e31e65] tracking-tight relative z-10">
                CariYanlik SIPPN
              </h2>

              {/* Description Paragraph */}
              <p className="text-slate-600 text-xs leading-relaxed max-w-sm relative z-10 font-sans">
                Kemenpan RB menghadirkan layanan pencarian informasi pelayanan publik terintegrasi di seluruh Indonesia. Temukan kejelasan prosedur, estimasi waktu, dan persyaratan mutasi/legalisasi SD Negeri 8 Wonogiri di portal SIPPN Nasional.
              </p>

              {/* Call to Action Button */}
              <a 
                href="https://sippn.menpan.go.id" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-[#e31e65] hover:bg-[#c81452] text-white text-xs font-extrabold px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 relative z-10"
              >
                Kunjungi CariYanlik SIPPN
              </a>
            </div>
          </div>

          {/* Interactive Portal: Standar Pelayanan Publik (SPP) */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-100/60 inline-block">Standar Pelayanan Publik (SPP)</span>
                <h3 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 tracking-tight">E-Katalog Informasi Pelayanan Sekolah</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
                  Pilih salah satu klasifikasi jenis layanan administratif di bawah untuk menampilkan standar persyaratan berkas, estimasi durasi proses, dan bagan alur prosedurnya secara transparan.
                </p>
              </div>
              <div className="shrink-0 flex items-center space-x-2 text-xs font-bold text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-xl border">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Terdaftar di SIPPN Nasional</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Side: Services Navigation Tab List (Col span: 4) */}
              <div className="lg:col-span-4 space-y-2.5">
                {PUBLIC_SERVICES.map((sop) => {
                  const isActive = sop.id === activeServiceId;
                  return (
                    <button
                      key={sop.id}
                      onClick={() => setActiveServiceId(sop.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3 group relative overflow-hidden ${
                        isActive
                          ? 'bg-emerald-900 border-emerald-900 text-white shadow-md'
                          : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 transition-colors ${
                        isActive 
                          ? 'bg-emerald-800 text-amber-400' 
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200/80 group-hover:text-emerald-700'
                      }`}>
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-extrabold uppercase tracking-wide opacity-75 font-mono">
                          Layanan {sop.id}
                        </p>
                        <h4 className="text-xs sm:text-sm font-sans font-black leading-snug">
                          {sop.title}
                        </h4>
                      </div>
                      {isActive && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Side: Active Service Profile Detail Container (Col span: 8) */}
              <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/85 shadow-sm overflow-hidden flex flex-col">
                
                {/* Profile Header Block */}
                <div className="bg-slate-50/80 px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">PUBLIK SPP PROFILE</span>
                    <h3 className="text-base sm:text-lg font-sans font-black text-slate-900 leading-tight">{activeService.title}</h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 rounded-full text-[10px] font-extrabold uppercase tracking-wider shrink-0 shadow-xs">
                    Rp 0 (Gratis)
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex border-b border-slate-100 text-xs bg-slate-50/30">
                  <button
                    onClick={() => setActiveServiceTab('sop')}
                    className={`flex-1 py-3.5 font-bold transition-all flex items-center justify-center space-x-2 border-b-2 ${
                      activeServiceTab === 'sop'
                        ? 'border-emerald-800 text-emerald-900 bg-white shadow-xs'
                        : 'border-transparent text-slate-500 hover:text-slate-850 hover:bg-slate-100/40'
                    }`}
                  >
                    <ListFilter className="w-4 h-4 text-emerald-800" />
                    <span>Standar Pelayanan (SOP)</span>
                  </button>
                  <button
                    onClick={() => setActiveServiceTab('pdf')}
                    className={`flex-1 py-3.5 font-bold transition-all flex items-center justify-center space-x-2 border-b-2 ${
                      activeServiceTab === 'pdf'
                        ? 'border-emerald-800 text-emerald-900 bg-white shadow-xs'
                        : 'border-transparent text-slate-500 hover:text-slate-850 hover:bg-slate-100/40'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-rose-500" />
                    <span className="flex items-center">
                      Lampiran Dokumen PDF
                      <span className="ml-1.5 px-1.5 py-0.5 bg-rose-100 text-rose-700 text-[8px] rounded-full font-black uppercase font-mono tracking-wider animate-pulse">Preview</span>
                    </span>
                  </button>
                </div>

                {activeServiceTab === 'sop' ? (
                  <>
                    {/* Profile Key Specifications Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-100 text-xs">
                      
                      {/* Spec 1: Duration */}
                      <div className="p-4 flex items-center space-x-3 border-b md:border-b-0 md:border-r border-slate-100">
                        <div className="p-2.5 rounded-xl bg-slate-50 text-emerald-800 border shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">WAKTU SELESAI</p>
                          <p className="font-extrabold text-slate-800 text-sm mt-0.5">{activeService.time || "2 Hari Kerja"}</p>
                        </div>
                      </div>

                      {/* Spec 2: Cost */}
                      <div className="p-4 flex items-center space-x-3 border-b md:border-b-0 md:border-r border-slate-100">
                        <div className="p-2.5 rounded-xl bg-slate-50 text-emerald-800 border shrink-0">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">BIAYA / TARIF</p>
                          <p className="font-extrabold text-emerald-700 text-sm mt-0.5">{activeService.cost || "Rp 0,- (Gratis)"}</p>
                        </div>
                      </div>

                      {/* Spec 3: Product Output */}
                      <div className="p-4 flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-slate-50 text-emerald-800 border shrink-0">
                          <FileCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">PRODUK PELAYANAN</p>
                          <p className="font-extrabold text-slate-800 text-sm mt-0.5 line-clamp-1" title={activeService.output || "Dokumen / Surat Resmi"}>
                            {activeService.output || "Dokumen Resmi"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Main Details Section */}
                    <div className="p-6 sm:p-8 space-y-8">
                      
                      {/* Detail 1: Requirements (Persyaratan) */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center">
                          <span className="w-1.5 h-4 bg-emerald-600 rounded-full mr-2.5"></span>
                          Persyaratan Administratif Berkas
                        </h4>
                        <div className="grid grid-cols-1 gap-3.5 pl-1.5">
                          {activeService.requirements.map((req, idx) => (
                            <div key={idx} className="flex items-start space-x-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="font-medium font-sans">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Detail 2: Procedure Steps (Sistem, Mekanisme & Prosedur) */}
                      <div className="space-y-4 pt-2">
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center">
                          <span className="w-1.5 h-4 bg-emerald-600 rounded-full mr-2.5"></span>
                          Sistem, Mekanisme & Prosedur (Alur SOP)
                        </h4>
                        <div className="space-y-6 relative pl-5 border-l-2 border-slate-100 pt-2 ml-3">
                          {serviceProcedure.map((step, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[30px] top-0 bg-white text-emerald-800 border-2 border-emerald-600 font-extrabold w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] shadow-xs group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                {idx + 1}
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs font-sans text-slate-600 font-medium leading-relaxed">
                                  {step}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* PDF Tab Content - Digital Document Reader Workspace */
                  <div className="flex flex-col bg-slate-800/90 flex-1">
                    {/* Toolbar PDF Reader */}
                    <div className="bg-slate-900 px-4 py-2 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="font-mono text-[11px] truncate max-w-[200px] sm:max-w-none" title={`SK_SPP_SDN8WONOGIRI_${activeService.title.toUpperCase().replace(/ /g, '_')}.pdf`}>
                          SK_SPP_SDN8_{activeService.title.toUpperCase().replace(/ /g, '_')}.pdf
                        </span>
                        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400 shrink-0 select-none">Halaman 1 / 1</span>
                      </div>

                      <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
                        {/* Zoom Controls */}
                        <div className="flex items-center bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
                          <button 
                            onClick={() => setPdfZoom(prev => Math.max(50, prev - 10))}
                            className="p-1 px-2 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                            title="Perkecil"
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] font-mono font-bold px-2 text-slate-300 w-12 text-center select-none">{pdfZoom}%</span>
                          <button 
                            onClick={() => setPdfZoom(prev => Math.min(150, prev + 10))}
                            className="p-1 px-2 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                            title="Perbesar"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Toggle real pdf vs simulation if pdfUrl exists */}
                        {activeService.pdfUrl && (
                          <button
                            onClick={() => setViewOriginalPdf(!viewOriginalPdf)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all flex items-center space-x-1 ${
                              viewOriginalPdf
                                ? 'bg-amber-500 border-amber-600 text-slate-950'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                            }`}
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>{viewOriginalPdf ? 'Lihat Salinan SK' : 'Lihat PDF Asli'}</span>
                          </button>
                        )}

                        {/* Download / Print */}
                        <button
                          onClick={() => {
                            if (activeService.pdfUrl) {
                              window.open(activeService.pdfUrl, '_blank');
                            } else {
                              window.print();
                            }
                          }}
                          className="bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold px-3 py-1 rounded-lg text-[10px] transition-all flex items-center space-x-1"
                          title="Cetak atau Unduh Surat Keputusan"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Unduh / Cetak</span>
                        </button>
                      </div>
                    </div>

                    {/* Desk Workspace Container with hidden print capabilities */}
                    <div className="bg-slate-700/40 p-4 sm:p-8 overflow-y-auto max-h-[600px] shadow-inner flex justify-center items-start print:bg-white print:p-0 print:max-h-none">
                      {activeService.pdfUrl && viewOriginalPdf ? (
                        /* Embedded Real PDF Frame */
                        <div className="w-full h-[550px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                          <iframe 
                            src={activeService.pdfUrl} 
                            className="w-full h-full" 
                            title={`PDF ${activeService.title}`}
                          />
                        </div>
                      ) : (
                        /* Classical Signed SK Document Sheet */
                        <div 
                          className="bg-white shadow-2xl p-6 sm:p-12 border border-slate-200/80 relative text-slate-800 font-sans mx-auto transition-all text-left w-full max-w-[650px] origin-top print:shadow-none print:border-none print:p-0"
                          style={{ transform: `scale(${pdfZoom / 100})`, transformOrigin: 'top center', marginBottom: `${(pdfZoom - 100) > 0 ? (pdfZoom - 100) * 4 : 0}px` }}
                        >
                          {/* Circular Logo & SK Watermark */}
                          <div className="flex flex-col items-center text-center space-y-1 mb-4 select-none">
                            <div className="w-11 h-11 rounded-full border-2 border-slate-900 flex items-center justify-center p-1 font-black text-xs tracking-tight bg-slate-50">
                              SK-8
                            </div>
                            <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">LAMPIRAN KEPUTUSAN KEPALA SEKOLAH</p>
                          </div>

                          {/* Kop Surat Resmi */}
                          <div className="text-center font-sans space-y-0.5 select-none">
                            <h4 className="text-xs sm:text-sm font-black tracking-wider text-slate-900">PEMERINTAH KABUPATEN WONOGIRI</h4>
                            <h4 className="text-xs sm:text-sm font-black tracking-wider text-slate-900">DINAS PENDIDIKAN DAN KEBUDAYAAN</h4>
                            <h3 className="text-sm sm:text-base font-black tracking-tight text-slate-950">SD NEGERI 8 WONOGIRI</h3>
                            <p className="text-[9px] sm:text-[10px] text-slate-500 font-mono">Alamat: Jl. Jenderal Sudirman No. 8, Wonogiri, Jawa Tengah | Telp: (0273) 321085</p>
                            <div className="border-b-2 border-double border-slate-850 mt-2.5"></div>
                          </div>

                          {/* Judul Keputusan */}
                          <div className="text-center my-6 space-y-1 sm:space-y-1.5">
                            <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest font-mono text-emerald-800">LAMPIRAN SURAT KEPUTUSAN KEPALA SD NEGERI 8 WONOGIRI</h4>
                            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 font-mono">NOMOR: 188.4 / 092 / SPP / 2026</p>
                            <p className="text-[11px] sm:text-xs font-extrabold uppercase text-slate-800 tracking-wide mt-1.5">TENTANG STANDAR PELAYANAN OPERASIONAL (SOP) ADMINISTRASI</p>
                            <div className="inline-block border-y-2 border-slate-800 px-4 py-1 mt-1 text-xs font-black text-slate-950 uppercase tracking-wide bg-slate-50/60">
                              JENIS PELAYANAN: {activeService.title}
                            </div>
                          </div>

                          {/* Spesifikasi Tabel / Standard Operasional */}
                          <div className="space-y-5 text-[11px] leading-relaxed text-slate-800">
                            <div>
                              <h5 className="font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
                                <span className="w-1.5 h-3 bg-slate-800 mr-2 rounded-xs"></span>
                                I. SPESIFIKASI STANDAR PELAYANAN (SPP)
                              </h5>
                              <table className="w-full border-collapse border border-slate-300">
                                <tbody>
                                  <tr className="border-b border-slate-300">
                                    <td className="w-1/3 bg-slate-50/80 p-2 font-bold border-r border-slate-300">1. Nama Layanan Publik</td>
                                    <td className="p-2 font-semibold text-slate-800">{activeService.title}</td>
                                  </tr>
                                  <tr className="border-b border-slate-300">
                                    <td className="bg-slate-50/80 p-2 font-bold border-r border-slate-300">2. Jangka Waktu Penyelesaian</td>
                                    <td className="p-2 font-semibold text-slate-800">{activeService.time || "2 Hari Kerja"}</td>
                                  </tr>
                                  <tr className="border-b border-slate-300">
                                    <td className="bg-slate-50/80 p-2 font-bold border-r border-slate-300">3. Biaya / Tarif Pelayanan</td>
                                    <td className="p-2 font-semibold text-emerald-800">{activeService.cost || "Rp 0,- (Gratis)"}</td>
                                  </tr>
                                  <tr>
                                    <td className="bg-slate-50/80 p-2 font-bold border-r border-slate-300">4. Produk Hasil Pelayanan</td>
                                    <td className="p-2 font-semibold text-slate-800">{activeService.output || "Surat / Dokumen Resmi"}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            {/* Persyaratan Administrasi */}
                            <div>
                              <h5 className="font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
                                <span className="w-1.5 h-3 bg-slate-800 mr-2 rounded-xs"></span>
                                II. PERSYARATAN ADMINISTRATIF BERKAS
                              </h5>
                              <ul className="list-decimal pl-5 space-y-1 text-slate-700 font-medium">
                                {activeService.requirements.map((req, idx) => (
                                  <li key={idx} className="font-sans pl-1">{req}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Alur Prosedur */}
                            <div>
                              <h5 className="font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
                                <span className="w-1.5 h-3 bg-slate-800 mr-2 rounded-xs"></span>
                                III. SISTEM, MEKANISME & PROSEDUR SOP
                              </h5>
                              <ul className="list-decimal pl-5 space-y-1 text-slate-700 font-medium">
                                {serviceProcedure.map((step, idx) => (
                                  <li key={idx} className="font-sans pl-1">{step}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Tanda Tangan, NIP dan Cap Digital */}
                          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-[10px] sm:text-[11px] relative select-none">
                            <div className="space-y-0.5">
                              <p className="text-slate-400 font-bold italic">Motto Pelayanan: "Melayani dengan Hati, Cepat, Bersih & Prima"</p>
                              <p className="text-slate-400 text-[8px] sm:text-[9px]">Dokumen Standar Pelayanan ini diterbitkan secara sah oleh Kepala Sekolah SDN 8 Wonogiri.</p>
                            </div>
                            
                            <div className="text-left sm:text-right space-y-0.5 shrink-0 relative pr-6">
                              <p className="text-slate-500">Ditetapkan di: Wonogiri</p>
                              <p className="text-slate-500">Pada tanggal: 28 Juni 2026</p>
                              <p className="font-bold text-slate-700 mt-2">Kepala SD Negeri 8 Wonogiri,</p>
                              
                              {/* Blue Stamp circular seal graphic */}
                              <div className="absolute right-12 -bottom-2 w-16 sm:w-20 h-16 sm:h-20 rounded-full border-4 border-double border-blue-600/35 flex items-center justify-center pointer-events-none rotate-12 bg-blue-50/5">
                                <div className="text-center font-sans font-black text-[6px] sm:text-[7px] text-blue-600 leading-none p-1 uppercase">
                                  <p className="text-[5px]">PEMERINTAH</p>
                                  <p>SDN 8</p>
                                  <p>WONOGIRI</p>
                                  <p className="text-[5px] font-bold text-blue-500 mt-0.5">CAP BASAH</p>
                                </div>
                              </div>

                              <div className="pt-8">
                                <p className="font-sans font-black text-slate-900 text-xs underline decoration-double">WURYANTI, S.Pd., M.Pd.</p>
                                <p className="text-slate-500 text-[8px] sm:text-[9px] font-mono mt-0.5">NIP. 19710308 199603 2 003</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section: Indeks Kepuasan Masyarakat (IKM) & Public Complaint Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Indeks Kepuasan Masyarakat Dashboard Widget */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-extrabold uppercase bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-800/40 inline-block font-mono tracking-wider">
                  STATISTIK KINERJA PELAYANAN
                </span>
                <h3 className="font-sans font-black text-white text-lg sm:text-xl leading-tight">Indeks Kepuasan Masyarakat</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Berdasarkan akumulasi survei berkala tingkat kepuasan wali murid dan masyarakat terhadap efisiensi administrasi sekolah tahun pelajaran terakhir.
                </p>

                {/* Score Big Display */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400">NILAI MUTU LAYANAN</p>
                    <p className="text-3xl sm:text-4xl font-sans font-black text-amber-400 tracking-tight">94.50</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-900/40 border border-emerald-800/40 px-2 py-0.5 rounded">SANGAT BAIK</p>
                    <p className="text-2xl font-black text-white tracking-tight mt-1">MUTU A</p>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Target Kinerja: 95.00</span>
                    <span className="text-emerald-400">94.50 % Achieved</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full w-[94.5%]" />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800/60 pt-4 mt-6 text-[10px] text-slate-400 leading-relaxed italic">
                *SD Negeri 8 Wonogiri menjamin akuntabilitas serta keterbukaan informasi. Kami terus berinovasi untuk memberikan kepuasan terbaik bagi masyarakat.
              </div>
            </div>

            {/* Column 2: Whistleblowing Public Complaint Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/85 shadow-sm space-y-5">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl shrink-0 border border-rose-100">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-black text-slate-900 text-base sm:text-lg leading-tight">Layanan Aspirasi & Pengaduan Publik</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Sampaikan keluhan, draf laporan ketidakpuasan, ataupun saran pengembangan layanan langsung ke pihak pengelola sekolah demi peningkatan mutu berkelanjutan.
                  </p>
                </div>
              </div>
              <ContactForm />
            </div>

          </div>

        </div>
      </div>
    );
  };

  // 11. SPMB (PPDB Admissions)
  const renderSpmb = () => {
    return (
      <div className="pb-20 text-left">
        <div className="relative bg-emerald-950 text-white py-12 sm:py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-15"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">Penerimaan Siswa Baru</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">PPDB / SPMB Online 2026</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto font-sans">Selamat datang di portal Sistem Penerimaan Murid Baru (SPMB) SD Negeri 8 Wonogiri. Daftarkan buah hati tercinta secara mudah, aman, gratis, dan terpercaya.</p>
          </div>
        </div>
        {renderBreadcrumb('SPMB Pendaftaran')}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Requirements & Flowchart timeline */}
            <div className="lg:col-span-6 space-y-12">
              
              {/* Requirements */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">Persyaratan Berkas</span>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900">Syarat Calon Siswa Baru</h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Harap siapkan pindaian (scan) atau foto dokumen fisik berikut sebelum mengisi formulir pendaftaran online agar proses verifikasi berjalan lancar:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="flex items-start space-x-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-xs text-slate-700">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Usia minimal 6 (enam) tahun pada tanggal 1 Juli 2026.</span>
                  </div>
                  <div className="flex items-start space-x-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-xs text-slate-700">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Fotokopi Akta Kelahiran Calon Siswa asli.</span>
                  </div>
                  <div className="flex items-start space-x-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-xs text-slate-700">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Fotokopi Kartu Keluarga (KK) yang mencantumkan nama calon siswa.</span>
                  </div>
                  <div className="flex items-start space-x-2.5 bg-white p-3 rounded-xl border border-slate-100 shadow-sm text-xs text-slate-700">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Mengisi formulir pendaftaran di loket web ini secara lengkap.</span>
                  </div>
                </div>
              </div>

              {/* Flowchart timeline */}
              <div id="alur" className="space-y-4 scroll-mt-24">
                <span className="text-xs font-bold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">Alur PPDB</span>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900">Prosedur Alur Pendaftaran</h2>
                
                {/* Visual timeline components */}
                <div className="space-y-6 pt-4 relative pl-8 border-l-2 border-emerald-100">
                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 bg-emerald-700 text-white font-extrabold w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs border-4 border-emerald-50 shadow">1</div>
                    <h4 className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-none">Pendaftaran Mandiri Online</h4>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">Orang tua calon siswa mengisi formulir digital di sebelah kanan halaman ini dengan data yang valid.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 bg-emerald-700 text-white font-extrabold w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs border-4 border-emerald-50 shadow">2</div>
                    <h4 className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-none">Verifikasi Berkas Administrasi</h4>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">Panitia PPDB sekolah melakukan validasi berkas pendaftaran dan sinkronisasi batas umur calon siswa.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 bg-emerald-700 text-white font-extrabold w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs border-4 border-emerald-50 shadow">3</div>
                    <h4 className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-none">Pengumuman Kelulusan Seleksi</h4>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">Status kelulusan diumumkan via loket web serta WhatsApp resmi panitia pendaftaran kepada wali murid.</p>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-[41px] top-0 bg-emerald-700 text-white font-extrabold w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs border-4 border-emerald-50 shadow">4</div>
                    <h4 className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-none">Daftar Ulang Mandiri</h4>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">Melakukan konfirmasi kesediaan bersekolah serta penyerahan berkas fisik asli ke sekolah.</p>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion List */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">Pertanyaan Umum</span>
                <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900">Tanya Jawab Seputar PPDB</h2>
                <div className="space-y-3 pt-2">
                  {FAQS.slice(0, 3).map((faq, idx) => (
                    <div key={idx} className="bg-white border rounded-2xl p-5 shadow-sm space-y-2">
                      <h4 className="font-sans font-bold text-slate-900 text-sm sm:text-base flex items-start">
                        <HelpCircle className="w-5 h-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
                        {faq.question}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm pl-7 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Multi-step registration Wizard form */}
            <div className="lg:col-span-6 sticky top-28 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-2xl space-y-6">
              <div className="border-b pb-4">
                <span className="bg-amber-100 text-amber-800 text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-amber-200">
                  Formulir Digital PPDB SDN 8
                </span>
                <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg mt-3 leading-tight">Pendaftaran Siswa Baru TA 2026/2027</h3>
                <p className="text-[11px] text-slate-500 mt-1">Isilah data di bawah ini secara jujur sesuai berkas Kartu Keluarga asli.</p>
              </div>

              {/* Step indicator */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span className={spmbStep >= 1 ? 'text-emerald-700' : ''}>1. Data Calon Siswa</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span className={spmbStep >= 2 ? 'text-emerald-700' : ''}>2. Data Orang Tua</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span className={spmbStep >= 4 ? 'text-emerald-700' : ''}>3. Selesai</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: spmbStep === 1 ? '33%' : spmbStep === 2 ? '66%' : '100%' }}></div>
              </div>

              {/* Form wizards render */}
              {spmbStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Nama Lengkap Calon Siswa *</label>
                    <input 
                      type="text" 
                      required 
                      value={spmbForm.namaLengkap}
                      onChange={(e) => setSpmbForm({ ...spmbForm, namaLengkap: e.target.value })}
                      placeholder="Contoh: Muhammad Faiz Ramadhan" 
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50" 
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">NIK Siswa (Di KK) *</label>
                      <input 
                        type="text" 
                        required 
                        value={spmbForm.nik}
                        onChange={(e) => setSpmbForm({ ...spmbForm, nik: e.target.value })}
                        placeholder="Contoh: 331201xxxxxxxxxx" 
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Jenis Kelamin *</label>
                      <select 
                        required 
                        value={spmbForm.jenisKelamin}
                        onChange={(e) => setSpmbForm({ ...spmbForm, jenisKelamin: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50"
                      >
                        <option value="">-- Pilih --</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Tempat Lahir *</label>
                      <input 
                        type="text" 
                        required 
                        value={spmbForm.tempatLahir}
                        onChange={(e) => setSpmbForm({ ...spmbForm, tempatLahir: e.target.value })}
                        placeholder="Contoh: Wonogiri" 
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Tanggal Lahir *</label>
                      <input 
                        type="date" 
                        required 
                        value={spmbForm.tanggalLahir}
                        onChange={(e) => setSpmbForm({ ...spmbForm, tanggalLahir: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 text-slate-600" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Alamat Lengkap (Sesuai KK) *</label>
                    <textarea 
                      required 
                      rows={2}
                      value={spmbForm.alamatSiswa}
                      onChange={(e) => setSpmbForm({ ...spmbForm, alamatSiswa: e.target.value })}
                      placeholder="Tuliskan nama jalan, RT/RW, kelurahan, dan kecamatan..." 
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    onClick={() => {
                      if (!spmbForm.namaLengkap || !spmbForm.nik || !spmbForm.jenisKelamin || !spmbForm.tempatLahir || !spmbForm.tanggalLahir || !spmbForm.alamatSiswa) {
                        alert('Pemberitahuan: Harap isi semua kolom wajib bertanda bintang (*) sebelum melanjutkan.');
                        return;
                      }
                      setSpmbStep(2);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase py-3.5 rounded-xl shadow transition-all"
                  >
                    Lanjutkan ke Langkah 2
                  </button>
                </div>
              )}

              {spmbStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Nama Lengkap Ayah *</label>
                      <input 
                        type="text" 
                        required 
                        value={spmbForm.namaAyah}
                        onChange={(e) => setSpmbForm({ ...spmbForm, namaAyah: e.target.value })}
                        placeholder="Nama Ayah Kandung" 
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Pekerjaan Ayah *</label>
                      <input 
                        type="text" 
                        required 
                        value={spmbForm.pekerjaanAyah}
                        onChange={(e) => setSpmbForm({ ...spmbForm, pekerjaanAyah: e.target.value })}
                        placeholder="Contoh: Karyawan Swasta" 
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Nama Lengkap Ibu *</label>
                      <input 
                        type="text" 
                        required 
                        value={spmbForm.namaIbu}
                        onChange={(e) => setSpmbForm({ ...spmbForm, namaIbu: e.target.value })}
                        placeholder="Nama Ibu Kandung" 
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Pekerjaan Ibu *</label>
                      <input 
                        type="text" 
                        required 
                        value={spmbForm.pekerjaanIbu}
                        onChange={(e) => setSpmbForm({ ...spmbForm, pekerjaanIbu: e.target.value })}
                        placeholder="Contoh: Ibu Rumah Tangga" 
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">No. WhatsApp Wali (Aktif) *</label>
                      <input 
                        type="tel" 
                        required 
                        value={spmbForm.noWhatsappOrangTua}
                        onChange={(e) => setSpmbForm({ ...spmbForm, noWhatsappOrangTua: e.target.value })}
                        placeholder="Contoh: 08123456789" 
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Minat Ekstrakurikuler Pilihan</label>
                      <select 
                        value={spmbForm.pilihanEkstrakurikuler}
                        onChange={(e) => setSpmbForm({ ...spmbForm, pilihanEkstrakurikuler: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-slate-50/50 text-slate-600"
                      >
                        <option value="Seni Tari Tradisional">Seni Tari Tradisional Jawa</option>
                        <option value="Futsal / Bulu Tangkis">Klub Olahraga (Futsal & Bulu Tangkis)</option>
                        <option value="Menggambar / Seni Rupa">Menggambar & Mewarnai</option>
                        <option value="Pemrograman Dasar Scratch">Komputer Coding Scratch</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={() => setSpmbStep(1)}
                      className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase py-3 rounded-xl transition-all"
                    >
                      Kembali
                    </button>
                    <button 
                      onClick={handleSpmbSubmit}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase py-3 rounded-xl shadow transition-all flex items-center justify-center space-x-1"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Berkas Pendaftaran</span>
                    </button>
                  </div>
                </div>
              )}

              {spmbStep === 3 && (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <h4 className="text-lg font-bold text-slate-800">Sedang Mengunggah Dokumen...</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">Sistem sedang memproses data calon peserta didik dan mengunggah pendaftaran ke database PPDB SDN 8 Wonogiri.</p>
                </div>
              )}

              {spmbStep === 4 && (
                <div className="text-center py-6 space-y-5 animate-fadeIn text-slate-800">
                  <div className="inline-flex p-3 bg-emerald-50 text-emerald-600 rounded-full">
                    <FileCheck className="w-12 h-12" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">Registrasi PPDB Berhasil!</h3>
                  
                  {/* Proof receipt container */}
                  <div className="bg-slate-50 border border-emerald-500 p-4 rounded-2xl text-left text-xs space-y-2.5 font-mono">
                    <div className="text-center font-bold text-emerald-800 border-b pb-1.5 uppercase">BUKTI PENDAFTARAN DIGITAL PPDB</div>
                    <div><span className="text-slate-400">NAMA CALON SISWA:</span> <span className="font-bold">{spmbForm.namaLengkap.toUpperCase()}</span></div>
                    <div><span className="text-slate-400">KODE REGISTER:</span> <span className="font-bold text-amber-600">SDN8-2026-REG{Math.floor(1000 + Math.random() * 9000)}</span></div>
                    <div><span className="text-slate-400">NIK SISWA:</span> <span>{spmbForm.nik}</span></div>
                    <div><span className="text-slate-400">NO WA WALI:</span> <span>{spmbForm.noWhatsappOrangTua}</span></div>
                    <div className="border-t pt-1.5 text-[10px] text-center text-slate-500 italic">Harap simpan screenshot / tangkapan layar bukti pendaftaran digital ini.</div>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto">
                    Data berhasil disimpan dalam basis data sekolah. Tim panitia PPDB akan segera menghubungi No. WhatsApp Wali Siswa <strong>({spmbForm.noWhatsappOrangTua})</strong> dalam kurun waktu 2 hari kerja untuk jadwal penyerahan berkas fisik asli ke sekolah.
                  </p>

                  <div className="pt-2">
                    <button 
                      onClick={() => {
                        setSpmbSubmitted(false);
                        setSpmbStep(1);
                        setSpmbForm({
                          namaLengkap: '', nik: '', tempatLahir: '', tanggalLahir: '', jenisKelamin: '',
                          agama: 'Islam', alamatSiswa: '', namaAyah: '', pekerjaanAyah: '', namaIbu: '',
                          pekerjaanIbu: '', noWhatsappOrangTua: '', pilihanEkstrakurikuler: 'Pramuka'
                        });
                      }}
                      className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase rounded-full shadow"
                    >
                      Isi Formulir Baru
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    );
  };

  // 12. HUBUNGI KAMI (Kontak)
  const renderKontak = () => {
    return (
      <div className="pb-20 text-left">
        <div className="relative bg-emerald-950 text-white py-12 sm:py-16 text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-15"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-3">
            <span className="text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">Saluran Komunikasi</span>
            <h1 className="text-3xl sm:text-5xl font-sans font-extrabold tracking-tight">Hubungi Kami</h1>
            <p className="text-emerald-200 text-xs sm:text-sm max-w-xl mx-auto font-sans">Kirimkan pertanyaan, saran, pengaduan, atau jadwalkan janji temu kunjungan langsung bersama tim humas sekolah.</p>
          </div>
        </div>
        {renderBreadcrumb('Hubungi Kami')}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Contact details & Map */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Detailed cards of contact channel */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-950">Alamat Fisik Sekolah</h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{SCHOOL_CONFIG.address}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-950">Telepon Resmi Kantor</h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{SCHOOL_CONFIG.phone}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-950">Alamat Surat Elektronik (Email)</h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{SCHOOL_CONFIG.email}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-950">Jam Layanan Kantor</h4>
                    <div className="text-xs text-slate-600 mt-1.5 space-y-1 font-medium">
                      <p><span className="font-bold text-slate-800">Senin - Kamis:</span> {SCHOOL_CONFIG.workingHours.seninKamis.split(', ')[1] || '07.00 - 14.00 WIB'}</p>
                      <p><span className="font-bold text-slate-800">Jumat:</span> {SCHOOL_CONFIG.workingHours.jumat.split(', ')[1] || '07.00 - 11.00 WIB'}</p>
                      <p><span className="font-bold text-slate-800">Sabtu:</span> {SCHOOL_CONFIG.workingHours.sabtu.split(', ')[1] || '07.00 - 12.30 WIB'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded interactive Google Maps iframe */}
              <div className="rounded-3xl overflow-hidden border-2 border-slate-200 shadow-lg h-72 bg-slate-100 relative">
                <iframe 
                  title="Google Maps Location"
                  src={SCHOOL_CONFIG.googleMapsIframe} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

            </div>

            {/* Right Column: Contact Message Form */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">Kirim Pesan Mandiri</span>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 leading-tight">Hubungi Tim Administrasi Kami</h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Ada pertanyaan umum tentang kurikulum, agenda sekolah, pendaftaran PPDB, atau butuh bantuan administrasi dari Tata Usaha? Isi formulir terintegrasi di bawah ini secara lengkap.
              </p>
              <ContactForm />
            </div>

          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="school-app-wrapper" className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans pt-16">
      {/* Navbar Component */}
      <Navbar currentPage={currentPage} />

      {/* Main Page Content Router */}
      <main className="flex-grow">
        {currentPage === 'beranda' && renderBeranda()}
        {currentPage === 'profil' && renderProfil()}
        {currentPage === 'kegiatan' && renderKegiatan()}
        {currentPage === 'prestasi' && renderPrestasi()}
        {currentPage === 'berita' && renderBerita()}
        {currentPage === 'berita-detail' && renderBeritaDetail()}
        {currentPage === 'galeri' && renderGaleri()}
        {currentPage === 'inovasi' && renderInovasi()}
        {currentPage === 'transparansi' && renderTransparansi()}
        {currentPage === 'layanan-publik' && renderLayananPublik()}
        {currentPage === 'spmb' && renderSpmb()}
        {currentPage === 'kontak' && renderKontak()}
      </main>

      {/* Footer Component */}
      <Footer />

      {/* Floating Admin Trigger Button */}
      <motion.button 
        id="admin-trigger-fab"
        onClick={() => setIsAdminOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[999] bg-emerald-800 hover:bg-emerald-950 text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center justify-center border border-emerald-700/50 group transition-all"
        title="Kelola Portal (Mode Admin)"
      >
        <Settings className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-500" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-sans font-bold text-xs whitespace-nowrap pl-0 group-hover:pl-2">
          Kelola Portal
        </span>
      </motion.button>

      {/* Admin Panel Overlay */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        schoolConfig={SCHOOL_CONFIG}
        setSchoolConfig={setSchoolConfig}
        heroSlides={HERO_SLIDES}
        setHeroSlides={setHeroSlides}
        motivationQuote={MOTIVATION_QUOTE}
        setMotivationQuote={setMotivationQuote}
        visionMission={VISION_MISSION}
        setVisionMission={setVisionMission}
        teachers={TEACHERS}
        setTeachers={setTeachers}
        facilities={FACILITIES}
        setFacilities={setFacilities}
        innovations={INNOVATIONS}
        setInnovations={setInnovations}
        newsItems={NEWS_ITEMS}
        setNewsItems={setNewsItems}
        achievements={ACHIEVEMENTS}
        setAchievements={setAchievements}
        activities={ACTIVITIES}
        setActivities={setActivities}
        galleryItems={GALLERY_ITEMS}
        setGalleryItems={setGalleryItems}
        transparencyDocs={TRANSPARENCY_DOCS}
        setTransparencyDocs={setTransparencyDocs}
        publicServices={PUBLIC_SERVICES}
        setPublicServices={setPublicServices}
      />
    </div>
  );
}
