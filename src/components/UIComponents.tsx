import React, { useState, useEffect } from 'react';
import { 
  Trophy, Calendar, User, ArrowRight, Download, Eye, FileText, 
  Search, ShieldAlert, Sparkles, Send, CheckCircle, Info, MapPin, 
  ChevronLeft, ChevronRight, BookOpen, Star, HelpCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NewsItem, Achievement, Teacher, GalleryItem, TransparencyDoc, HeroSlide, SCHOOL_CONFIG } from '../data/schoolData';

// ----------------------------------------------------
// 1. SECTION TITLE
// ----------------------------------------------------
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, align = 'center' }) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <div className={`inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 text-xs font-extrabold uppercase px-3 py-1.5 rounded-full mb-3`}>
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        <span>Portal SDN 8 Wonogiri</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 tracking-tight leading-tight">
        {title}
      </h2>
      <div className={`h-1.5 w-24 bg-amber-500 rounded-full mt-4 ${align === 'center' ? 'mx-auto' : ''} relative overflow-hidden`}>
        <div className="absolute top-0 left-0 h-full w-1/2 bg-emerald-600 animate-slide"></div>
      </div>
      {subtitle && (
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mt-4 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 2. QUOTE CARD
// ----------------------------------------------------
interface QuoteCardProps {
  text: string;
  author: string;
  role: string;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ text, author, role }) => {
  return (
    <div className="relative bg-gradient-to-br from-emerald-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl overflow-hidden max-w-4xl mx-auto my-8 border border-emerald-800">
      <div className="absolute -right-10 -bottom-10 opacity-10 text-emerald-200 pointer-events-none">
        <span className="text-[200px] font-serif font-black leading-none">”</span>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <span className="text-amber-400 text-6xl font-serif">“</span>
        <blockquote className="text-lg sm:text-2xl font-sans italic font-medium leading-relaxed text-emerald-100 max-w-3xl">
          {text}
        </blockquote>
        <div className="h-0.5 w-16 bg-amber-400"></div>
        <div>
          <cite className="not-italic font-extrabold text-white tracking-wide text-base block sm:text-lg">
            {author}
          </cite>
          <span className="text-xs sm:text-sm text-emerald-400 uppercase font-mono tracking-widest mt-1 block">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. NEWS CARD
// ----------------------------------------------------
interface NewsCardProps {
  news: NewsItem;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const badgeColors = {
    Berita: 'bg-blue-50 text-blue-700 border-blue-100',
    Pengumuman: 'bg-amber-50 text-amber-700 border-amber-100',
    Artikel: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  };

  return (
    <article className="group bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={news.image} 
          alt={news.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border shadow-sm ${badgeColors[news.category]}`}>
            {news.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-4 text-slate-500 text-xs font-mono mb-3">
          <span className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            {news.date}
          </span>
          <span className="flex items-center">
            <User className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            {news.author.split(' ')[0]}
          </span>
        </div>
        <h3 className="font-sans font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 mb-3">
          <a href={`/berita-detail.html?id=${news.id}`}>{news.title}</a>
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6 flex-grow">
          {news.excerpt}
        </p>
        <div className="pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors mt-auto">
          <a href={`/berita-detail.html?id=${news.id}`} className="flex items-center space-x-1">
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </article>
  );
};

// ----------------------------------------------------
// 4. GALLERY CARD (With Lightbox Zoom Feature)
// ----------------------------------------------------
interface GalleryCardProps {
  item: GalleryItem;
  onZoom: (item: GalleryItem) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, onZoom }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-100 aspect-square cursor-pointer transition-all duration-300" onClick={() => onZoom(item)}>
      <img 
        src={item.url} 
        alt={item.title}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1.5">{item.category}</span>
        <h4 className="text-white font-sans font-bold text-sm leading-tight line-clamp-2 mb-1">{item.title}</h4>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
          <span className="text-[10px] text-slate-300 font-mono">{item.date}</span>
          <div className="p-1.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 5. TEACHER CARD
// ----------------------------------------------------
interface TeacherCardProps {
  teacher: Teacher;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100 mb-4 bg-slate-100">
        <img 
          src={teacher.photo} 
          alt={teacher.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-sans font-bold text-slate-900 text-base leading-tight mb-1">
        {teacher.name}
      </h3>
      <p className="text-emerald-700 font-semibold text-xs mb-3">
        {teacher.role}
      </p>
      {teacher.nip && (
        <p className="text-[10px] text-slate-500 font-mono bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100 mb-2">
          NIP: {teacher.nip}
        </p>
      )}
      {teacher.education && (
        <p className="text-[11px] text-slate-600 italic">
          {teacher.education}
        </p>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 6. ACHIEVEMENT CARD
// ----------------------------------------------------
interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-lg transition-all flex flex-col h-full">
      <div className="h-44 rounded-xl overflow-hidden bg-slate-50 mb-5 relative">
        <img 
          src={achievement.image} 
          alt={achievement.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 z-10 bg-amber-500 text-white p-1.5 rounded-full shadow">
          <Trophy className="w-5 h-5" />
        </div>
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900`}>
            {achievement.category}
          </span>
        </div>
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
          <span className="font-bold text-emerald-700 uppercase tracking-wider">{achievement.level}</span>
          <span>Th. {achievement.year}</span>
        </div>
        <h3 className="font-sans font-extrabold text-slate-900 text-base sm:text-lg leading-snug mb-2">
          {achievement.title}
        </h3>
        <p className="text-xs text-amber-700 font-semibold mb-3 flex items-center bg-amber-50 p-2 rounded border border-amber-100">
          <Star className="w-4 h-4 mr-1 text-amber-500 fill-amber-500 shrink-0" />
          <span>Pemenang: {achievement.winner}</span>
        </p>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {achievement.description}
        </p>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 7. DOCUMENT VIEWER (For Transparansi & PDF download)
// ----------------------------------------------------
interface DocumentViewerProps {
  doc: TransparencyDoc;
  onPreview: (doc: TransparencyDoc) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ doc, onPreview }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`Pemberitahuan: Berhasil mengunduh dokumen "${doc.title}". Dokumen disimpan di folder Download.`);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl shrink-0">
          <FileText className="w-8 h-8" />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
            {doc.category}
          </span>
          <h4 className="font-sans font-bold text-slate-900 text-sm sm:text-base leading-tight mt-2 hover:text-emerald-700 transition-colors">
            {doc.title}
          </h4>
          <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1 font-mono">
            <span>Tahun: {doc.year}</span>
            <span>Ukuran: {doc.fileSize}</span>
            <span>Unggah: {doc.dateAdded}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 pt-2 sm:pt-0">
        <button
          onClick={() => onPreview(doc)}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Buka Preview</span>
        </button>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:bg-emerald-300"
        >
          {downloading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Unduh...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 8. CONTACT FORM
// ----------------------------------------------------
export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-100">
      <AnimatePresence>
        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-10 space-y-4"
          >
            <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-full mb-2">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Pesan Berhasil Terkirim!</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
              Terima kasih telah menghubungi SD Negeri 8 Wonogiri. Pesan Anda telah masuk ke sistem kami dan akan segera direspon oleh staf administrasi kami dalam kurun waktu 1x24 jam kerja.
            </p>
            <div className="pt-4">
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase rounded-full shadow hover:shadow-lg transition-all"
              >
                Kirim Pesan Baru
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">No. WhatsApp/Telepon *</label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Alamat Email (Opsional)</label>
                <input
                  type="email"
                  placeholder="Contoh: budi@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Subjek / Perihal *</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                >
                  <option value="">-- Pilih Kategori --</option>
                  <option value="SPMB / Pendaftaran">SPMB / Pendaftaran Siswa Baru</option>
                  <option value="Pertanyaan Umum">Pertanyaan Umum tentang Sekolah</option>
                  <option value="Layanan Publik / Pengaduan">Layanan Publik / Pengaduan Administrasi</option>
                  <option value="Kritik & Saran">Kritik, Saran & Ide Inovasi</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Isi Pesan Anda *</label>
              <textarea
                required
                rows={4}
                placeholder="Tuliskan pesan lengkap atau pertanyaan Anda di sini..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase py-4 rounded-xl shadow-md hover:shadow-lg transition-all disabled:bg-emerald-300"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Mengirim Pesan...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Sekarang</span>
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};

// ----------------------------------------------------
// 9. HERO CAROUSEL WITH CENTERED SEARCH BAR
//    (Matches the "Google style" search portal mock)
// ----------------------------------------------------
interface HeroCarouselProps {
  slides: HeroSlide[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearched(false);
      return;
    }
    
    // Simple mock search across school capabilities and pages
    const query = searchQuery.toLowerCase();
    const results: string[] = [];

    if (query.includes('daftar') || query.includes('spmb') || query.includes('ppdb') || query.includes('masuk') || query.includes('syarat') || query.includes('umur')) {
      results.push('SPMB / PPDB 2026/2027: Penerimaan Siswa Baru Kelas I SD. Lengkap dengan alur dan persyaratan. <a href="/spmb.html" class="text-amber-600 underline font-bold">Buka halaman SPMB</a>');
    }
    if (query.includes('guru') || query.includes('tendik') || query.includes('staf') || query.includes('kepala') || query.includes('sri')) {
      results.push('Guru & Tenaga Kependidikan: Kepala Sekolah Sri Hartati, S.Pd., M.Pd. dan daftar wali kelas. <a href="/profil.html#guru" class="text-amber-600 underline font-bold">Buka Daftar Guru</a>');
    }
    if (query.includes('baca') || query.includes('buku') || query.includes('gemari') || query.includes('literasi') || query.includes('jumat')) {
      results.push('Inovasi GEMARI: Gerakan Gemar Membaca Hari Jumat untuk mengasah literasi siswa. <a href="/inovasi.html#gemari" class="text-amber-600 underline font-bold">Buka Inovasi GEMARI</a>');
    }
    if (query.includes('sampah') || query.includes('plastik') || query.includes('ditali') || query.includes('rapia') || query.includes('bersih') || query.includes('lingkungan') || query.includes('adiwiyata')) {
      results.push('Inovasi DITALI RAPIA: Pendidikan karakter peduli sampah dan aksi nyata Bank Sampah Sekolah. <a href="/inovasi.html#ditali-rapia" class="text-amber-600 underline font-bold">Buka Inovasi Ditali Rapia</a>');
    }
    if (query.includes('laporan') || query.includes('dana') || query.includes('bos') || query.includes('uang') || query.includes('rkas') || query.includes('anggaran') || query.includes('transparansi')) {
      results.push('Transparansi Publik: Laporan BOS Reguler dan RKAS sekolah transparan yang dapat diunduh. <a href="/transparansi.html" class="text-amber-600 underline font-bold">Buka Transparansi Keuangan</a>');
    }
    if (query.includes('alamat') || query.includes('peta') || query.includes('kontak') || query.includes('maps') || query.includes('telp') || query.includes('email')) {
      results.push('Kontak & Peta: Hubungi sekolah via telepon, WA, email, atau navigasi via Google Maps. <a href="/kontak.html" class="text-amber-600 underline font-bold">Hubungi Kami</a>');
    }
    if (query.includes('piala') || query.includes('prestasi') || query.includes('juara') || query.includes('lomba') || query.includes('menang') || query.includes('futsal')) {
      results.push('Prestasi Sekolah: Daftar piala kejuaraan Sains Matematika, menulis cerita, futsal, dan Adiwiyata. <a href="/prestasi.html" class="text-amber-600 underline font-bold">Buka Prestasi</a>');
    }
    if (query.includes('fasilitas') || query.includes('kelas') || query.includes('perpus') || query.includes('komputer') || query.includes('taman')) {
      results.push('Fasilitas: Ruang kelas multimedia, perpustakaan "Taman Ilmu", lab komputer ANBK, dan taman hidroponik. <a href="/profil.html#fasilitas" class="text-amber-600 underline font-bold">Buka Fasilitas</a>');
    }

    if (results.length === 0) {
      results.push('Maaf, tidak menemukan hasil khusus untuk kata kunci tersebut. Coba gunakan kata kunci seperti: "SPMB", "Gemari", "Guru", "BOS", "Fasilitas", atau "Alamat".');
    }

    setSearchResults(results);
    setSearched(true);
  };

  return (
    <div className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden bg-slate-900">
      {/* Background Slides */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/70 to-slate-950/90 z-10"></div>
            <img 
              src={slides[currentIdx].image} 
              alt="School slide"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content & Search Portal overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center mt-12">
        <div className="max-w-4xl w-full space-y-6 sm:space-y-8">
          
          {/* Tagline / Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 bg-amber-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>PORTAL INFORMASI RESMI</span>
          </motion.div>

          {/* SMAN 1 Yogyakarta Style Large Search Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            <h2 className="text-4xl sm:text-6xl font-sans font-extrabold text-white tracking-tight leading-none drop-shadow">
              {SCHOOL_CONFIG.name}
            </h2>
            <p className="text-emerald-300 font-mono tracking-widest text-xs sm:text-sm uppercase font-bold">
              MENDIDIK GENERASI CERDAS BERKARAKTER ADIWIYATA
            </p>
          </motion.div>

          {/* Big Search Bar (The "Google Style" Portal requested by user image description) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/95 text-slate-800 p-2.5 rounded-full shadow-2xl max-w-2xl mx-auto border border-emerald-500/30 backdrop-blur-sm"
          >
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="pl-3 sm:pl-4 text-emerald-700">
                <Search className="w-5 h-5 sm:w-6 h-6" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Apa yang ingin Anda cari di website sekolah ini?"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base bg-transparent text-slate-800 focus:outline-none placeholder-slate-400"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm uppercase px-5 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-md transition-all active:scale-95 shrink-0"
              >
                Cari
              </button>
            </form>
          </motion.div>

          {/* Search Result Overlay Box */}
          {searched && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white text-slate-800 p-6 rounded-2xl shadow-2xl max-w-2xl mx-auto text-left border-2 border-amber-400 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center">
                  <Info className="w-4 h-4 mr-1 text-amber-500" />
                  Hasil Pencarian Mandiri
                </h4>
                <button 
                  onClick={() => { setSearched(false); setSearchQuery(''); }}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded"
                >
                  Tutup [X]
                </button>
              </div>
              <div className="space-y-3">
                {searchResults.map((result, idx) => (
                  <p 
                    key={idx} 
                    className="text-xs sm:text-sm leading-relaxed text-slate-700 border-l-4 border-amber-400 pl-3"
                    dangerouslySetInnerHTML={{ __html: result }}
                  ></p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Slide Indicators / Quick Links */}
          <div className="flex justify-center items-center space-x-2 pt-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-2.5 rounded-full transition-all ${currentIdx === idx ? 'w-8 bg-amber-500' : 'w-2.5 bg-white/40'}`}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          {/* Quick Stats Grid under search bar */}
          <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto pt-4 text-white">
            <div className="bg-emerald-900/60 backdrop-blur-sm px-3 py-2.5 rounded-xl border border-emerald-700/30">
              <span className="block text-xl font-bold text-amber-400">A</span>
              <span className="text-[10px] text-emerald-200 font-semibold tracking-wider uppercase">Akreditasi</span>
            </div>
            <div className="bg-emerald-900/60 backdrop-blur-sm px-3 py-2.5 rounded-xl border border-emerald-700/30">
              <span className="block text-xl font-bold text-amber-400">100%</span>
              <span className="text-[10px] text-emerald-200 font-semibold tracking-wider uppercase">Kelulusan</span>
            </div>
            <div className="bg-emerald-900/60 backdrop-blur-sm px-3 py-2.5 rounded-xl border border-emerald-700/30">
              <span className="block text-xl font-bold text-amber-400">Gratis</span>
              <span className="text-[10px] text-emerald-200 font-semibold tracking-wider uppercase">Dana BOS</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={() => setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hidden sm:block"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentIdx((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hidden sm:block"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
