import React, { useState } from 'react';
import { 
  X, Lock, Layout, ShieldAlert, Plus, Trash2, Edit2, Upload, 
  Check, Image as ImageIcon, FileText, UserPlus, HelpCircle, Users 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeroSlide, Teacher, Facility, Innovation, NewsItem, 
  Achievement, Activity, GalleryItem, TransparencyDoc, PublicServiceSop 
} from '../data/schoolData';
import { db } from '../lib/db';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  schoolConfig: any;
  setSchoolConfig: React.Dispatch<React.SetStateAction<any>>;
  heroSlides: HeroSlide[];
  setHeroSlides: React.Dispatch<React.SetStateAction<HeroSlide[]>>;
  motivationQuote: any;
  setMotivationQuote: React.Dispatch<React.SetStateAction<any>>;
  visionMission: any;
  setVisionMission: React.Dispatch<React.SetStateAction<any>>;
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
  facilities: Facility[];
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>;
  innovations: Innovation[];
  setInnovations: React.Dispatch<React.SetStateAction<Innovation[]>>;
  newsItems: NewsItem[];
  setNewsItems: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  achievements: Achievement[];
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  galleryItems: GalleryItem[];
  setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  transparencyDocs: TransparencyDoc[];
  setTransparencyDocs: React.Dispatch<React.SetStateAction<TransparencyDoc[]>>;
  publicServices: PublicServiceSop[];
  setPublicServices: React.Dispatch<React.SetStateAction<PublicServiceSop[]>>;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen, onClose,
  schoolConfig, setSchoolConfig,
  heroSlides, setHeroSlides,
  motivationQuote, setMotivationQuote,
  visionMission, setVisionMission,
  teachers, setTeachers,
  facilities, setFacilities,
  innovations, setInnovations,
  newsItems, setNewsItems,
  achievements, setAchievements,
  activities, setActivities,
  galleryItems, setGalleryItems,
  transparencyDocs, setTransparencyDocs,
  publicServices, setPublicServices
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'beranda' | 'profil' | 'guru' | 'fasilitas' | 'kegiatan' | 'prestasi' | 'berita' | 'galeri' | 'transparansi' | 'layanan' | 'inovasi' | 'akun'>('beranda');
  const [feedback, setFeedback] = useState('');
  const [newMissionInput, setNewMissionInput] = useState('');
  const [editMissionIdx, setEditMissionIdx] = useState<number | null>(null);
  const [newGoalInput, setNewGoalInput] = useState('');
  const [editGoalIdx, setEditGoalIdx] = useState<number | null>(null);

  // Load and manage admin accounts
  const [accounts, setAccounts] = useState<any[]>(() => {
    const saved = localStorage.getItem('admin_accounts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [{ id: '1', username: 'admin', pin: '8888', role: 'Administrator' }];
  });

  // Local helper to read file as base64 string
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result as string);
      showFeedback('Berkas berhasil diunggah!');
    };
    reader.readAsDataURL(file);
  };

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = accounts.find(
      (acc) => acc.username.toLowerCase().trim() === usernameInput.toLowerCase().trim() && acc.pin === pinInput
    );
    if (matched) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Username atau PIN salah! Silakan coba lagi.');
    }
  };

  const saveToStorage = async (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    try {
      switch (key) {
        case 'school_config':
          await db.schoolConfig.set(data);
          break;
        case 'hero_slides':
          await db.heroSlides.replace(data);
          break;
        case 'motivation_quote':
          await db.motivationQuote.set(data);
          break;
        case 'vision_mission':
          await db.visionMission.set(data);
          break;
        case 'teachers':
          await db.teachers.replace(data);
          break;
        case 'facilities':
          await db.facilities.replace(data);
          break;
        case 'innovations':
          await db.innovations.replace(data);
          break;
        case 'news_items':
          await db.newsItems.replace(data);
          break;
        case 'achievements':
          await db.achievements.replace(data);
          break;
        case 'activities':
          await db.activities.replace(data);
          break;
        case 'gallery_items':
          await db.galleryItems.replace(data);
          break;
        case 'transparency_docs':
          await db.transparencyDocs.replace(data);
          break;
        case 'public_services':
          await db.publicServices.replace(data);
          break;
        case 'faqs':
          await db.faqs.replace(data);
          break;
        case 'quick_menu_items':
          await db.quickMenuItems.replace(data);
          break;
        default:
          break;
      }
    } catch (e) {
      console.error('Failed to save to Supabase', e);
    }
  };

  // Profile fields helper
  const updateConfigField = (section: string, field: string, value: any) => {
    const updated = { ...schoolConfig };
    if (section === 'root') {
      updated[field] = value;
    } else {
      updated[section] = { ...updated[section], [field]: value };
    }
    setSchoolConfig(updated);
    saveToStorage('school_config', updated);
    showFeedback('Konfigurasi sekolah diperbarui!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-100"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="font-sans font-bold text-base sm:text-lg leading-tight">Panel Kontrol Admin</h2>
              <p className="text-[10px] text-emerald-200">Kelola dan update semua informasi website resmi sekolah</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-full transition-all text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {feedback && (
          <div className="bg-emerald-600 text-white text-xs font-bold text-center py-2 px-4 animate-pulse">
            ✨ {feedback}
          </div>
        )}

        {/* Login Gate */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-sm mx-auto">
            <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center text-emerald-800 mb-4 border border-slate-200">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="font-sans font-bold text-slate-900 text-lg">Masuk Mode Admin</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">Silakan masuk menggunakan nama pengguna dan PIN administrator Anda.</p>
            
            <form onSubmit={handleLogin} className="w-full space-y-3">
              <div>
                <input 
                  type="text"
                  placeholder="Username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full text-center text-sm font-sans px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <input 
                  type="password"
                  placeholder="PIN Keamanan"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent transition-all"
                  required
                />
                {pinError && <p className="text-[11px] text-rose-600 font-bold mt-1.5">{pinError}</p>}
              </div>
              <button 
                type="submit"
                className="w-full bg-emerald-800 hover:bg-emerald-950 text-white text-sm font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                Buka Panel Editor
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-48 sm:w-56 bg-slate-50 border-r border-slate-200 p-3 overflow-y-auto space-y-1.5 text-left flex flex-col shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2.5 mb-1 inline-block">Kategori Data</span>
              
              <button 
                onClick={() => setActiveTab('beranda')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'beranda' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Layout className="w-4 h-4" />
                <span>Slider Beranda</span>
              </button>

              <button 
                onClick={() => setActiveTab('profil')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'profil' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Layout className="w-4 h-4" />
                <span>Profil & Kepala Sekolah</span>
              </button>

              <button 
                onClick={() => setActiveTab('guru')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'guru' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Guru & Tendik</span>
              </button>

              <button 
                onClick={() => setActiveTab('fasilitas')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'fasilitas' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Fasilitas Belajar</span>
              </button>

              <button 
                onClick={() => setActiveTab('kegiatan')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'kegiatan' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Layout className="w-4 h-4" />
                <span>Kegiatan Siswa</span>
              </button>

              <button 
                onClick={() => setActiveTab('prestasi')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'prestasi' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Layout className="w-4 h-4" />
                <span>Prestasi Juara</span>
              </button>

              <button 
                onClick={() => setActiveTab('berita')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'berita' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <FileText className="w-4 h-4" />
                <span>Berita & Pengumuman</span>
              </button>

              <button 
                onClick={() => setActiveTab('galeri')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'galeri' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Galeri Media</span>
              </button>

              <button 
                onClick={() => setActiveTab('transparansi')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'transparansi' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <FileText className="w-4 h-4" />
                <span>Laporan BOS & RKAS</span>
              </button>

              <button 
                onClick={() => setActiveTab('layanan')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'layanan' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <FileText className="w-4 h-4" />
                <span>Layanan Publik & SIPPN</span>
              </button>

              <button 
                onClick={() => setActiveTab('inovasi')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'inovasi' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Layout className="w-4 h-4" />
                <span>Inovasi Sekolah</span>
              </button>

              <button 
                onClick={() => setActiveTab('akun')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${activeTab === 'akun' ? 'bg-emerald-800 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <Users className="w-4 h-4" />
                <span>Pengelolaan Akun</span>
              </button>

              <div className="mt-auto pt-4 border-t border-slate-200">
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all"
                >
                  Keluar Mode Admin
                </button>
              </div>
            </div>

            {/* Editing Canvas */}
            <div className="flex-1 p-6 overflow-y-auto text-left bg-slate-50/50">
              {activeTab === 'beranda' && (
                <HeroSlideManager heroSlides={heroSlides} setHeroSlides={setHeroSlides} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'profil' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-bold text-slate-900 text-base">Konfigurasi Sambutan Kepala Sekolah</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Edit profil kepala sekolah, foto sambutan, dan salam hangat kepala sekolah.</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Nama Kepala Sekolah</label>
                        <input 
                          type="text"
                          value={schoolConfig.headmaster?.name || ''}
                          onChange={(e) => updateConfigField('headmaster', 'name', e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">NIP Kepala Sekolah</label>
                        <input 
                          type="text"
                          value={schoolConfig.headmaster?.nip || ''}
                          onChange={(e) => updateConfigField('headmaster', 'nip', e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Teks Sambutan</label>
                      <textarea 
                        rows={6}
                        value={schoolConfig.headmaster?.welcomeMessage || ''}
                        onChange={(e) => updateConfigField('headmaster', 'welcomeMessage', e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800 font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">URL Foto Kepala Sekolah</label>
                        <input 
                          type="text"
                          value={schoolConfig.headmaster?.photo || ''}
                          onChange={(e) => updateConfigField('headmaster', 'photo', e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center space-x-1 border border-slate-300">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Unggah Foto Kepala Sekolah</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (url) => updateConfigField('headmaster', 'photo', url))}
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Sejarah */}
                  <div>
                    <h3 className="font-sans font-bold text-slate-900 text-base">Sejarah Singkat Sekolah</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Teks sejarah pendirian SD Negeri 8 Wonogiri sejak berdiri tahun 1978.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                    <textarea 
                      rows={4}
                      value={schoolConfig.history || ''}
                      onChange={(e) => updateConfigField('root', 'history', e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800 font-sans"
                    />
                  </div>

                  {/* Visi Misi */}
                  <div>
                    <h3 className="font-sans font-bold text-slate-900 text-base">Visi, Misi & Tujuan Sekolah</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Update teks visi dan daftar poin misi serta tujuan jangka panjang.</p>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Visi Sekolah</label>
                      <input 
                        type="text"
                        value={visionMission.vision || ''}
                        onChange={(e) => {
                          const updated = { ...visionMission, vision: e.target.value };
                          setVisionMission(updated);
                          saveToStorage('vision_mission', updated);
                        }}
                        className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800 font-sans"
                      />
                    </div>

                    {/* Misi */}
                    <div className="border-t pt-4">
                      <label className="block text-xs font-bold text-slate-700 mb-2">Misi Sekolah</label>
                      <div className="space-y-2">
                        {(visionMission.mission || []).map((m: string, idx: number) => (
                          <div key={idx} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-150 text-xs gap-2">
                            <span className="flex-1 font-sans text-slate-700 leading-snug">{m}</span>
                            <div className="flex items-center space-x-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setNewMissionInput(m);
                                  setEditMissionIdx(idx);
                                }}
                                className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedMissions = (visionMission.mission || []).filter((_: any, i: number) => i !== idx);
                                  const updated = { ...visionMission, mission: updatedMissions };
                                  setVisionMission(updated);
                                  saveToStorage('vision_mission', updated);
                                  showFeedback('Misi berhasil dihapus!');
                                }}
                                className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          placeholder={editMissionIdx !== null ? "Edit misi..." : "Tambah misi baru..."}
                          value={newMissionInput}
                          onChange={(e) => setNewMissionInput(e.target.value)}
                          className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newMissionInput.trim()) return;
                            let updatedMissions = [...(visionMission.mission || [])];
                            if (editMissionIdx !== null) {
                              updatedMissions[editMissionIdx] = newMissionInput.trim();
                              setEditMissionIdx(null);
                              showFeedback('Misi berhasil diperbarui!');
                            } else {
                              updatedMissions.push(newMissionInput.trim());
                              showFeedback('Misi baru ditambahkan!');
                            }
                            const updated = { ...visionMission, mission: updatedMissions };
                            setVisionMission(updated);
                            saveToStorage('vision_mission', updated);
                            setNewMissionInput('');
                          }}
                          className="bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                        >
                          {editMissionIdx !== null ? 'Simpan' : 'Tambah'}
                        </button>
                        {editMissionIdx !== null && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditMissionIdx(null);
                              setNewMissionInput('');
                            }}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg transition-all"
                          >
                            Batal
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Tujuan */}
                    <div className="border-t pt-4">
                      <label className="block text-xs font-bold text-slate-700 mb-2">Tujuan Sekolah</label>
                      <div className="space-y-2">
                        {(visionMission.goals || []).map((g: string, idx: number) => (
                          <div key={idx} className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-150 text-xs gap-2">
                            <span className="flex-1 font-sans text-slate-700 leading-snug">{g}</span>
                            <div className="flex items-center space-x-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setNewGoalInput(g);
                                  setEditGoalIdx(idx);
                                }}
                                className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedGoals = (visionMission.goals || []).filter((_: any, i: number) => i !== idx);
                                  const updated = { ...visionMission, goals: updatedGoals };
                                  setVisionMission(updated);
                                  saveToStorage('vision_mission', updated);
                                  showFeedback('Tujuan berhasil dihapus!');
                                }}
                                className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          placeholder={editGoalIdx !== null ? "Edit tujuan..." : "Tambah tujuan baru..."}
                          value={newGoalInput}
                          onChange={(e) => setNewGoalInput(e.target.value)}
                          className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!newGoalInput.trim()) return;
                            let updatedGoals = [...(visionMission.goals || [])];
                            if (editGoalIdx !== null) {
                              updatedGoals[editGoalIdx] = newGoalInput.trim();
                              setEditGoalIdx(null);
                              showFeedback('Tujuan berhasil diperbarui!');
                            } else {
                              updatedGoals.push(newGoalInput.trim());
                              showFeedback('Tujuan baru ditambahkan!');
                            }
                            const updated = { ...visionMission, goals: updatedGoals };
                            setVisionMission(updated);
                            saveToStorage('vision_mission', updated);
                            setNewGoalInput('');
                          }}
                          className="bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                        >
                          {editGoalIdx !== null ? 'Simpan' : 'Tambah'}
                        </button>
                        {editGoalIdx !== null && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditGoalIdx(null);
                              setNewGoalInput('');
                            }}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg transition-all"
                          >
                            Batal
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'guru' && (
                <TeacherManager teachers={teachers} setTeachers={setTeachers} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'fasilitas' && (
                <FacilityManager facilities={facilities} setFacilities={setFacilities} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'kegiatan' && (
                <ActivityManager activities={activities} setActivities={setActivities} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'prestasi' && (
                <AchievementManager achievements={achievements} setAchievements={setAchievements} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'berita' && (
                <NewsManager newsItems={newsItems} setNewsItems={setNewsItems} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'galeri' && (
                <GalleryManager galleryItems={galleryItems} setGalleryItems={setGalleryItems} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'transparansi' && (
                <TransparencyManager transparencyDocs={transparencyDocs} setTransparencyDocs={setTransparencyDocs} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'layanan' && (
                <LayananManager publicServices={publicServices} setPublicServices={setPublicServices} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'inovasi' && (
                <InnovationManager innovations={innovations} setInnovations={setInnovations} saveToStorage={saveToStorage} handleFileUpload={handleFileUpload} />
              )}

              {activeTab === 'akun' && (
                <AccountManager accounts={accounts} setAccounts={setAccounts} saveToStorage={saveToStorage} />
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/* ========================================================
   SUB-MANAGERS (Modul Guru, Fasilitas, dll)
   ======================================================== */

const TeacherManager: React.FC<{ 
  teachers: Teacher[]; 
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>; 
  saveToStorage: any; 
  handleFileUpload: any;
}> = ({ teachers, setTeachers, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<Teacher>>({ name: '', role: '', nip: '', photo: '', education: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) return;
    
    let updated: Teacher[];
    if (editId !== null) {
      updated = teachers.map(t => t.id === editId ? { ...t, ...form } as Teacher : t);
      setEditId(null);
    } else {
      const newTeacher: Teacher = {
        id: Date.now(),
        name: form.name,
        role: form.role,
        nip: form.nip || '',
        photo: form.photo || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        education: form.education || ''
      };
      updated = [...teachers, newTeacher];
    }
    setTeachers(updated);
    saveToStorage('teachers', updated);
    setForm({ name: '', role: '', nip: '', photo: '', education: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-bold text-slate-900 text-base">Kelola Guru & Tenaga Kependidikan</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Tambah, edit, atau hapus guru serta wali kelas.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3.5 shadow-xs">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{editId !== null ? 'Edit Guru' : 'Tambah Guru Baru'}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input 
            type="text" 
            placeholder="Nama Lengkap & Gelar" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
            required
          />
          <input 
            type="text" 
            placeholder="Jabatan / Wali Kelas" 
            value={form.role} 
            onChange={(e) => setForm({ ...form, role: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
            required
          />
          <input 
            type="text" 
            placeholder="NIP" 
            value={form.nip} 
            onChange={(e) => setForm({ ...form, nip: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <input 
            type="text" 
            placeholder="Pendidikan Terakhir" 
            value={form.education} 
            onChange={(e) => setForm({ ...form, education: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <input 
            type="text" 
            placeholder="URL Foto (Atau gunakan tombol unggah)" 
            value={form.photo} 
            onChange={(e) => setForm({ ...form, photo: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center space-x-1 border border-slate-300 h-9">
            <Upload className="w-3.5 h-3.5" />
            <span>Unggah Foto Guru</span>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, photo: url }))}
              className="hidden" 
            />
          </label>
        </div>
        <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
          {editId !== null ? 'Simpan Perubahan' : 'Tambah Guru'}
        </button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 font-sans font-bold text-slate-700 border-b border-slate-200">
            <tr>
              <th className="p-3">Foto</th>
              <th className="p-3">Nama</th>
              <th className="p-3">Jabatan</th>
              <th className="p-3">NIP</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {teachers.map(t => (
              <tr key={t.id} className="hover:bg-slate-50/50">
                <td className="p-3">
                  <img src={t.photo} alt={t.name} className="w-8 h-8 rounded-full object-cover border" />
                </td>
                <td className="p-3 font-bold text-slate-800">{t.name}</td>
                <td className="p-3 text-slate-600">{t.role}</td>
                <td className="p-3 font-mono text-slate-500">{t.nip || '-'}</td>
                <td className="p-3 text-right space-x-1.5">
                  <button 
                    onClick={() => { setForm(t); setEditId(t.id); }}
                    className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      const updated = teachers.filter(x => x.id !== t.id);
                      setTeachers(updated);
                      saveToStorage('teachers', updated);
                    }}
                    className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FacilityManager: React.FC<{ 
  facilities: Facility[]; 
  setFacilities: React.Dispatch<React.SetStateAction<Facility[]>>; 
  saveToStorage: any; 
  handleFileUpload: any;
}> = ({ facilities, setFacilities, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<Facility>>({ name: '', description: '', image: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description) return;
    
    let updated: Facility[];
    if (editId !== null) {
      updated = facilities.map(f => f.id === editId ? { ...f, ...form } as Facility : f);
      setEditId(null);
    } else {
      const newFacility: Facility = {
        id: Date.now(),
        name: form.name,
        description: form.description,
        image: form.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80'
      };
      updated = [...facilities, newFacility];
    }
    setFacilities(updated);
    saveToStorage('facilities', updated);
    setForm({ name: '', description: '', image: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-bold text-slate-900 text-base">Kelola Fasilitas Belajar</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Tambah, edit, atau hapus prasarana pendukung sekolah.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3.5 shadow-xs">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{editId !== null ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input 
            type="text" 
            placeholder="Nama Fasilitas" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full sm:col-span-2"
            required
          />
          <textarea 
            placeholder="Deskripsi Lengkap" 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full sm:col-span-2"
            rows={3}
            required
          />
          <input 
            type="text" 
            placeholder="URL Gambar Fasilitas" 
            value={form.image} 
            onChange={(e) => setForm({ ...form, image: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center space-x-1 border border-slate-300 h-9">
            <Upload className="w-3.5 h-3.5" />
            <span>Unggah Gambar</span>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, image: url }))}
              className="hidden" 
            />
          </label>
        </div>
        <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
          {editId !== null ? 'Simpan Perubahan' : 'Tambah Fasilitas'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {facilities.map(f => (
          <div key={f.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
            <img src={f.image} alt={f.name} className="w-full h-32 object-cover" />
            <div className="p-3.5 flex-1 flex flex-col">
              <h4 className="font-bold text-slate-900 text-xs leading-snug">{f.name}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-3 leading-normal flex-1">{f.description}</p>
              <div className="flex justify-end space-x-1.5 mt-3 pt-3 border-t border-slate-100">
                <button 
                  onClick={() => { setForm(f); setEditId(f.id); }}
                  className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={() => {
                    const updated = facilities.filter(x => x.id !== f.id);
                    setFacilities(updated);
                    saveToStorage('facilities', updated);
                  }}
                  className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivityManager: React.FC<{ 
  activities: Activity[]; 
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>; 
  saveToStorage: any; 
  handleFileUpload: any;
}> = ({ activities, setActivities, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<Activity>>({ title: '', category: 'Intrakurikuler', description: '', schedule: '', image: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    
    let updated: Activity[];
    if (editId !== null) {
      updated = activities.map(a => a.id === editId ? { ...a, ...form } as Activity : a);
      setEditId(null);
    } else {
      const newAct: Activity = {
        id: Date.now(),
        title: form.title,
        category: form.category || 'Intrakurikuler',
        description: form.description,
        schedule: form.schedule || '',
        image: form.image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80'
      };
      updated = [...activities, newAct];
    }
    setActivities(updated);
    saveToStorage('activities', updated);
    setForm({ title: '', category: 'Intrakurikuler', description: '', schedule: '', image: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-bold text-slate-900 text-base">Kelola Kegiatan (Kurikuler & Ekstra)</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Tambah dan update Semua Kegiatan, Intrakurikuler, Kokurikuler, dan Ekstrakurikuler.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3.5 shadow-xs">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{editId !== null ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input 
            type="text" 
            placeholder="Judul Kegiatan" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
            required
          />
          <select 
            value={form.category} 
            onChange={(e) => setForm({ ...form, category: e.target.value as any })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          >
            <option value="Intrakurikuler">Intrakurikuler</option>
            <option value="Kokurikuler">Kokurikuler</option>
            <option value="Ekstrakurikuler">Ekstrakurikuler</option>
          </select>
          <input 
            type="text" 
            placeholder="Jadwal / Waktu Pelaksanaan" 
            value={form.schedule} 
            onChange={(e) => setForm({ ...form, schedule: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full sm:col-span-2"
          />
          <textarea 
            placeholder="Deskripsi Kegiatan" 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full sm:col-span-2"
            rows={3}
            required
          />
          <input 
            type="text" 
            placeholder="URL Gambar Kegiatan" 
            value={form.image} 
            onChange={(e) => setForm({ ...form, image: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center space-x-1 border border-slate-300 h-9">
            <Upload className="w-3.5 h-3.5" />
            <span>Unggah Gambar Kegiatan</span>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, image: url }))}
              className="hidden" 
            />
          </label>
        </div>
        <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
          {editId !== null ? 'Simpan Kegiatan' : 'Tambah Kegiatan'}
        </button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 font-sans font-bold text-slate-700 border-b border-slate-200">
            <tr>
              <th className="p-3">Judul</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Jadwal</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activities.map(a => (
              <tr key={a.id} className="hover:bg-slate-50/50">
                <td className="p-3 font-bold text-slate-800">{a.title}</td>
                <td className="p-3">
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded border border-slate-200">
                    {a.category}
                  </span>
                </td>
                <td className="p-3 text-slate-600">{a.schedule || '-'}</td>
                <td className="p-3 text-right space-x-1.5">
                  <button 
                    onClick={() => { setForm(a); setEditId(a.id); }}
                    className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      const updated = activities.filter(x => x.id !== a.id);
                      setActivities(updated);
                      saveToStorage('activities', updated);
                    }}
                    className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AchievementManager: React.FC<{ 
  achievements: Achievement[]; 
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>; 
  saveToStorage: any; 
  handleFileUpload: any;
}> = ({ achievements, setAchievements, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<Achievement>>({ title: '', category: 'Akademik', level: 'Kabupaten', year: '2026', winner: '', description: '', image: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.winner || !form.description) return;
    
    let updated: Achievement[];
    if (editId !== null) {
      updated = achievements.map(a => a.id === editId ? { ...a, ...form } as Achievement : a);
      setEditId(null);
    } else {
      const newAch: Achievement = {
        id: Date.now(),
        title: form.title,
        category: form.category || 'Akademik',
        level: form.level || 'Kabupaten',
        year: form.year || '2026',
        winner: form.winner,
        description: form.description,
        image: form.image || 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80'
      };
      updated = [...achievements, newAch];
    }
    setAchievements(updated);
    saveToStorage('achievements', updated);
    setForm({ title: '', category: 'Akademik', level: 'Kabupaten', year: '2026', winner: '', description: '', image: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-bold text-slate-900 text-base">Kelola Prestasi Sekolah & Siswa</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Edit dan tampilkan daftar juara kompetisi akademik maupun non-akademik.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3.5 shadow-xs">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{editId !== null ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input 
            type="text" 
            placeholder="Judul Prestasi (cth: Juara 1 Olimpiade Matematika)" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
            required
          />
          <input 
            type="text" 
            placeholder="Nama Pemenang / Peraih" 
            value={form.winner} 
            onChange={(e) => setForm({ ...form, winner: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
            required
          />
          <select 
            value={form.category} 
            onChange={(e) => setForm({ ...form, category: e.target.value as any })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          >
            <option value="Akademik">Akademik</option>
            <option value="Non-Akademik">Non-Akademik</option>
          </select>
          <select 
            value={form.level} 
            onChange={(e) => setForm({ ...form, level: e.target.value as any })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          >
            <option value="Kecamatan">Kecamatan</option>
            <option value="Kabupaten">Kabupaten</option>
            <option value="Provinsi">Provinsi</option>
            <option value="Nasional">Nasional</option>
          </select>
          <input 
            type="text" 
            placeholder="Tahun Perolehan" 
            value={form.year} 
            onChange={(e) => setForm({ ...form, year: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <input 
            type="text" 
            placeholder="URL Gambar Prestasi / Piala" 
            value={form.image} 
            onChange={(e) => setForm({ ...form, image: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <textarea 
            placeholder="Deskripsi Singkat Lomba" 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full sm:col-span-2"
            rows={2}
            required
          />
          <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center space-x-1 border border-slate-300 h-9 sm:col-span-2">
            <Upload className="w-3.5 h-3.5" />
            <span>Unggah Foto Prestasi</span>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, image: url }))}
              className="hidden" 
            />
          </label>
        </div>
        <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
          {editId !== null ? 'Simpan Prestasi' : 'Tambah Prestasi'}
        </button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 font-sans font-bold text-slate-700 border-b border-slate-200">
            <tr>
              <th className="p-3">Tahun</th>
              <th className="p-3">Prestasi</th>
              <th className="p-3">Pemenang</th>
              <th className="p-3">Tingkat</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {achievements.map(a => (
              <tr key={a.id} className="hover:bg-slate-50/50">
                <td className="p-3 font-mono font-bold text-slate-700">{a.year}</td>
                <td className="p-3 font-bold text-slate-800">{a.title}</td>
                <td className="p-3 text-slate-600">{a.winner}</td>
                <td className="p-3">
                  <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                    {a.level}
                  </span>
                </td>
                <td className="p-3 text-right space-x-1.5">
                  <button 
                    onClick={() => { setForm(a); setEditId(a.id); }}
                    className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      const updated = achievements.filter(x => x.id !== a.id);
                      setAchievements(updated);
                      saveToStorage('achievements', updated);
                    }}
                    className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const NewsManager: React.FC<{ 
  newsItems: NewsItem[]; 
  setNewsItems: React.Dispatch<React.SetStateAction<NewsItem[]>>; 
  saveToStorage: any; 
  handleFileUpload: any;
}> = ({ newsItems, setNewsItems, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<NewsItem>>({ title: '', category: 'Berita', date: '2026-06-28', excerpt: '', content: '', image: '', author: 'Admin SDN 8' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    
    let updated: NewsItem[];
    if (editId !== null) {
      updated = newsItems.map(n => n.id === editId ? { ...n, ...form } as NewsItem : n);
      setEditId(null);
    } else {
      const newNews: NewsItem = {
        id: Date.now(),
        title: form.title,
        slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        category: form.category || 'Berita',
        date: form.date || '2026-06-28',
        excerpt: form.excerpt || form.content.slice(0, 150) + '...',
        content: form.content,
        image: form.image || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        author: form.author || 'Admin SDN 8',
        tags: ['Pendidikan', 'SDN 8 Wonogiri']
      };
      updated = [newNews, ...newsItems];
    }
    setNewsItems(updated);
    saveToStorage('news_items', updated);
    setForm({ title: '', category: 'Berita', date: '2026-06-28', excerpt: '', content: '', image: '', author: 'Admin SDN 8' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-bold text-slate-900 text-base">Kelola Kabar Berita & Pengumuman</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Kelola portal berita, pengumuman, ujian, dan artikel sekolah.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3.5 shadow-xs">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{editId !== null ? 'Edit Berita' : 'Tulis Berita Baru'}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input 
            type="text" 
            placeholder="Judul Berita" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full sm:col-span-2"
            required
          />
          <select 
            value={form.category} 
            onChange={(e) => setForm({ ...form, category: e.target.value as any })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          >
            <option value="Berita">Berita</option>
            <option value="Pengumuman">Pengumuman</option>
            <option value="Artikel">Artikel</option>
          </select>
          <input 
            type="date" 
            value={form.date} 
            onChange={(e) => setForm({ ...form, date: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <input 
            type="text" 
            placeholder="Penulis / Redaktur" 
            value={form.author} 
            onChange={(e) => setForm({ ...form, author: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <input 
            type="text" 
            placeholder="URL Gambar Cover" 
            value={form.image} 
            onChange={(e) => setForm({ ...form, image: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <textarea 
            placeholder="Kutipan Berita (Ringkasan Singkat)" 
            value={form.excerpt} 
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full sm:col-span-2"
            rows={2}
          />
          <textarea 
            placeholder="Isi Berita Lengkap (Dukung teks multi paragraf)" 
            value={form.content} 
            onChange={(e) => setForm({ ...form, content: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full sm:col-span-2"
            rows={5}
            required
          />
          <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center space-x-1 border border-slate-300 h-9 sm:col-span-2">
            <Upload className="w-3.5 h-3.5" />
            <span>Unggah Gambar Cover</span>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, image: url }))}
              className="hidden" 
            />
          </label>
        </div>
        <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
          {editId !== null ? 'Simpan Berita' : 'Publikasikan'}
        </button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 font-sans font-bold text-slate-700 border-b border-slate-200">
            <tr>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Judul</th>
              <th className="p-3">Kategori</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {newsItems.map(n => (
              <tr key={n.id} className="hover:bg-slate-50/50">
                <td className="p-3 font-mono text-slate-600">{n.date}</td>
                <td className="p-3 font-bold text-slate-800 line-clamp-1">{n.title}</td>
                <td className="p-3">
                  <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100">
                    {n.category}
                  </span>
                </td>
                <td className="p-3 text-right space-x-1.5">
                  <button 
                    onClick={() => { setForm(n); setEditId(n.id); }}
                    className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      const updated = newsItems.filter(x => x.id !== n.id);
                      setNewsItems(updated);
                      saveToStorage('news_items', updated);
                    }}
                    className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GalleryManager: React.FC<{ 
  galleryItems: GalleryItem[]; 
  setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>; 
  saveToStorage: any; 
  handleFileUpload: any;
}> = ({ galleryItems, setGalleryItems, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<GalleryItem>>({ title: '', category: 'Sekolah', type: 'image', url: '', date: '2026-06-28' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.url) return;
    
    let updated: GalleryItem[];
    if (editId !== null) {
      updated = galleryItems.map(g => g.id === editId ? { ...g, ...form } as GalleryItem : g);
      setEditId(null);
    } else {
      const newItem: GalleryItem = {
        id: Date.now(),
        title: form.title,
        category: form.category || 'Sekolah',
        type: form.type || 'image',
        url: form.url,
        date: form.date || '2026-06-28'
      };
      updated = [newItem, ...galleryItems];
    }
    setGalleryItems(updated);
    saveToStorage('gallery_items', updated);
    setForm({ title: '', category: 'Sekolah', type: 'image', url: '', date: '2026-06-28' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-bold text-slate-900 text-base">Kelola Galeri Media (Foto & Video)</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Unggah foto kegiatan sekolah baru atau tambahkan tautan video YouTube.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3.5 shadow-xs">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{editId !== null ? 'Edit Media' : 'Tambah Media Baru'}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <input 
            type="text" 
            placeholder="Judul / Keterangan Foto/Video" 
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
            required
          />
          <select 
            value={form.category} 
            onChange={(e) => setForm({ ...form, category: e.target.value as any })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          >
            <option value="Sekolah">Sekolah</option>
            <option value="Kegiatan">Kegiatan</option>
            <option value="Prestasi">Prestasi</option>
          </select>
          <select 
            value={form.type} 
            onChange={(e) => setForm({ ...form, type: e.target.value as any })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          >
            <option value="image">Gambar / Foto</option>
            <option value="video">Tautan Video</option>
          </select>
          <input 
            type="date" 
            value={form.date} 
            onChange={(e) => setForm({ ...form, date: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
          />
          <input 
            type="text" 
            placeholder="URL Media (Foto Unsplash atau link video YouTube)" 
            value={form.url} 
            onChange={(e) => setForm({ ...form, url: e.target.value })} 
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full sm:col-span-2"
            required
          />
          {form.type === 'image' && (
            <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center space-x-1 border border-slate-300 h-9 sm:col-span-2">
              <Upload className="w-3.5 h-3.5" />
              <span>Unggah Gambar Ke Galeri</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, url }))}
                className="hidden" 
              />
            </label>
          )}
        </div>
        <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
          {editId !== null ? 'Simpan Media' : 'Tambah Media'}
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {galleryItems.map(g => (
          <div key={g.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col relative group">
            {g.type === 'image' ? (
              <img src={g.url} alt={g.title} className="w-full h-24 object-cover" />
            ) : (
              <div className="w-full h-24 bg-slate-800 flex items-center justify-center text-white text-[10px] font-bold">TAUTAN VIDEO</div>
            )}
            <div className="p-2 flex-1 flex flex-col justify-between">
              <h5 className="font-bold text-slate-900 text-[10px] leading-tight line-clamp-2">{g.title}</h5>
              <div className="flex justify-end space-x-1 mt-2">
                <button 
                  onClick={() => { setForm(g); setEditId(g.id); }}
                  className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button 
                  onClick={() => {
                    const updated = galleryItems.filter(x => x.id !== g.id);
                    setGalleryItems(updated);
                    saveToStorage('gallery_items', updated);
                  }}
                  className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TransparencyManager: React.FC<{ 
  transparencyDocs: TransparencyDoc[]; 
  setTransparencyDocs: React.Dispatch<React.SetStateAction<TransparencyDoc[]>>; 
  saveToStorage: any; 
  handleFileUpload: any;
}> = ({ transparencyDocs, setTransparencyDocs, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<TransparencyDoc>>({ 
    title: '', 
    category: 'Dana BOS', 
    year: '2026', 
    dateAdded: '2026-06-28', 
    fileSize: '1.2 MB', 
    fileUrl: '',
    budgetRows: []
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [newBudgetRow, setNewBudgetRow] = useState({ item: '', amount: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    
    let updated: TransparencyDoc[];
    if (editId !== null) {
      updated = transparencyDocs.map(d => d.id === editId ? { ...d, ...form } as TransparencyDoc : d);
      setEditId(null);
    } else {
      const newDoc: TransparencyDoc = {
        id: Date.now(),
        title: form.title,
        category: form.category || 'Dana BOS',
        year: form.year || '2026',
        dateAdded: new Date().toISOString().split('T')[0],
        fileSize: form.fileSize || '1.5 MB',
        fileUrl: form.fileUrl || '',
        budgetRows: form.budgetRows || []
      };
      updated = [newDoc, ...transparencyDocs];
    }
    setTransparencyDocs(updated);
    saveToStorage('transparency_docs', updated);
    
    // Reset form
    setForm({ 
      title: '', 
      category: 'Dana BOS', 
      year: '2026', 
      dateAdded: new Date().toISOString().split('T')[0], 
      fileSize: '1.5 MB', 
      fileUrl: '',
      budgetRows: []
    });
    setNewBudgetRow({ item: '', amount: '' });
  };

  const addBudgetRow = () => {
    if (!newBudgetRow.item.trim() || !newBudgetRow.amount.trim()) return;
    const rows = form.budgetRows ? [...form.budgetRows] : [];
    rows.push({ item: newBudgetRow.item.trim(), amount: newBudgetRow.amount.trim() });
    setForm({ ...form, budgetRows: rows });
    setNewBudgetRow({ item: '', amount: '' });
  };

  const removeBudgetRow = (index: number) => {
    const rows = form.budgetRows ? form.budgetRows.filter((_, i) => i !== index) : [];
    setForm({ ...form, budgetRows: rows });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div>
          <h3 className="font-sans font-black text-slate-900 text-sm sm:text-base">Kelola Transparansi Anggaran (RKAS & Dana BOS)</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Unggah pertanggungjawaban dana operasional sekolah, rancangan belanja RKAS, serta rincian pos realisasi anggaran.</p>
        </div>
        <span className="text-[10px] bg-amber-100 text-amber-800 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono shrink-0">UU KIP COMPLIANT</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        <h4 className="font-sans font-black text-xs text-slate-800 uppercase tracking-widest border-b pb-2">
          {editId !== null ? '📝 Edit Data Laporan Anggaran' : '➕ Tambah Laporan Anggaran Baru'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <label className="block text-xs font-bold text-slate-700 mb-1">Judul / Nama Laporan Anggaran</label>
            <input 
              type="text" 
              placeholder="Contoh: Laporan Realisasi Penggunaan Dana BOS Reguler Tahap I 2026" 
              value={form.title || ''} 
              onChange={(e) => setForm({ ...form, title: e.target.value })} 
              className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
              required
            />
          </div>
          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Dokumen</label>
            <select 
              value={form.category || 'Dana BOS'} 
              onChange={(e) => setForm({ ...form, category: e.target.value as any })} 
              className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
            >
              <option value="Rencana Kerja (RKAS)">Rencana Kerja (RKAS)</option>
              <option value="Dana BOS">Dana BOS</option>
              <option value="Laporan Keuangan">Laporan Keuangan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Anggaran</label>
            <input 
              type="text" 
              placeholder="Contoh: 2026" 
              value={form.year || ''} 
              onChange={(e) => setForm({ ...form, year: e.target.value })} 
              className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Ukuran Berkas PDF (cth: 1.8 MB)</label>
            <input 
              type="text" 
              placeholder="Contoh: 1.8 MB" 
              value={form.fileSize || ''} 
              onChange={(e) => setForm({ ...form, fileSize: e.target.value })} 
              className="text-xs px-3 py-2 rounded-lg border border-slate-300 w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tautan File PDF / Dokumen Resmi</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Url PDF dokumen..." 
                value={form.fileUrl || ''} 
                onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} 
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300"
              />
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg p-2 flex items-center justify-center transition-all h-9 shrink-0">
                <Upload className="w-3.5 h-3.5 text-slate-600" />
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, fileUrl: url, fileSize: '2.0 MB' }))}
                  className="hidden" 
                />
              </label>
            </div>
          </div>
        </div>

        {/* Dynamic Budget Rows Section */}
        <div className="border-t pt-4 space-y-3">
          <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">📊 Rincian Pos Anggaran & Realisasi (Untuk Lampiran PDF)</label>
          
          <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
            {(form.budgetRows || []).map((row, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border text-xs gap-3">
                <span className="font-sans font-medium text-slate-700 flex-1">{idx + 1}. {row.item}</span>
                <span className="font-mono font-bold text-emerald-800 shrink-0">{row.amount}</span>
                <button 
                  type="button" 
                  onClick={() => removeBudgetRow(idx)}
                  className="text-rose-600 hover:text-rose-800 p-0.5 transition-all shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {(form.budgetRows || []).length === 0 && (
              <p className="text-[11px] text-slate-400 italic pl-1">Belum ada rincian pos anggaran. Laporan ini akan menggunakan visualisasi global default.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text"
              placeholder="Nama Pos Anggaran (cth: Belanja Buku Paket Literasi)..."
              value={newBudgetRow.item}
              onChange={(e) => setNewBudgetRow({ ...newBudgetRow, item: e.target.value })}
              className="flex-1 text-xs px-2.5 py-2 rounded-lg border border-slate-300"
            />
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Jumlah (cth: Rp 15.925.000)..."
                value={newBudgetRow.amount}
                onChange={(e) => setNewBudgetRow({ ...newBudgetRow, amount: e.target.value })}
                className="w-full sm:w-[180px] text-xs px-2.5 py-2 rounded-lg border border-slate-300"
              />
              <button 
                type="button" 
                onClick={addBudgetRow}
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-[10px] font-extrabold px-3.5 py-2 rounded-lg transition-all shrink-0"
              >
                Tambah Pos
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-3">
          {editId !== null && (
            <button 
              type="button" 
              onClick={() => {
                setEditId(null);
                setForm({ 
                  title: '', 
                  category: 'Dana BOS', 
                  year: '2026', 
                  dateAdded: '2026-06-28', 
                  fileSize: '1.2 MB', 
                  fileUrl: '',
                  budgetRows: []
                });
                setNewBudgetRow({ item: '', amount: '' });
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg transition-all"
            >
              Batal Edit
            </button>
          )}
          <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-5 py-2 rounded-lg transition-all shadow-sm">
            {editId !== null ? '💾 Simpan Perubahan' : '➕ Daftarkan Laporan'}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
          <h4 className="font-sans font-black text-xs text-slate-700 uppercase tracking-widest">Daftar Dokumen Transparansi Publik ({transparencyDocs.length})</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100/50 font-sans font-extrabold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-[10px]">
              <tr>
                <th className="p-3 pl-4">Judul Laporan</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Tahun</th>
                <th className="p-3 font-mono">Ukuran</th>
                <th className="p-3 font-mono">Rincian Pos</th>
                <th className="p-3 text-right pr-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transparencyDocs.map(d => (
                <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 pl-4 font-bold text-slate-800 leading-snug max-w-[280px]">
                    <div className="space-y-0.5">
                      <p>{d.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono font-medium">Diunggah: {d.dateAdded}</p>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
                      {d.category}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-600">{d.year}</td>
                  <td className="p-3 font-mono text-slate-500">{d.fileSize}</td>
                  <td className="p-3 font-medium text-slate-500">
                    {d.budgetRows && d.budgetRows.length > 0 ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full font-mono">{d.budgetRows.length} Pos</span>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic font-mono">-</span>
                    )}
                  </td>
                  <td className="p-3 text-right pr-4 space-x-1 shrink-0">
                    <button 
                      onClick={() => { setForm(d); setEditId(d.id); }}
                      className="p-1.5 hover:bg-emerald-50 text-emerald-700 rounded-xl border border-slate-100 transition-all shadow-xs bg-slate-50/50"
                      title="Edit Dokumen"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        const updated = transparencyDocs.filter(x => x.id !== d.id);
                        setTransparencyDocs(updated);
                        saveToStorage('transparency_docs', updated);
                      }}
                      className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-xl border border-slate-100 transition-all shadow-xs bg-slate-50/50"
                      title="Hapus Dokumen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InnovationManager: React.FC<{ 
  innovations: Innovation[]; 
  setInnovations: React.Dispatch<React.SetStateAction<Innovation[]>>; 
  saveToStorage: any; 
  handleFileUpload: any;
}> = ({ innovations, setInnovations, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<Innovation>>({ id: '', title: '', tagline: '', description: '', background: '', image: '', impact: [] });
  const [editId, setEditId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.tagline || !form.description) return;

    let updated: Innovation[];
    if (editId !== null) {
      updated = innovations.map(inv => inv.id === editId ? { ...inv, ...form } as Innovation : inv);
      setEditId(null);
    } else {
      const newId = (form.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newInv: Innovation = {
        id: newId || String(Date.now()),
        title: form.title,
        tagline: form.tagline,
        description: form.description,
        background: form.background || '',
        image: form.image || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
        impact: form.impact || []
      };
      updated = [...innovations, newInv];
    }
    setInnovations(updated);
    saveToStorage('innovations', updated);
    setForm({ id: '', title: '', tagline: '', description: '', background: '', image: '', impact: [] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-bold text-slate-900 text-base">Kelola Inovasi Sekolah</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Tambah, edit, atau hapus program inovasi sekolah (GEMARI, DITALI RAPIA, dll).</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{editId !== null ? 'Edit Inovasi' : 'Tambah Inovasi Baru'}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Judul Inovasi</label>
            <input 
              type="text"
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
            <input 
              type="text"
              value={form.tagline || ''}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Lengkap</label>
            <textarea 
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              rows={4}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Latar Belakang</label>
            <textarea 
              value={form.background || ''}
              onChange={(e) => setForm({ ...form, background: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">URL Gambar Cover</label>
            <input 
              type="text"
              value={form.image || ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
            />
          </div>

          <div className="flex items-end">
            <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center space-x-1 border border-slate-300 h-9 w-full">
              <Upload className="w-3.5 h-3.5" />
              <span>Unggah Gambar Inovasi</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, image: url }))}
                className="hidden" 
              />
            </label>
          </div>
        </div>

        <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
          {editId !== null ? 'Simpan Perubahan' : 'Tambah Inovasi'}
        </button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 font-sans font-bold text-slate-700 border-b border-slate-200">
            <tr>
              <th className="p-3">Cover</th>
              <th className="p-3">Judul Inovasi</th>
              <th className="p-3">Tagline</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {innovations.map(inv => (
              <tr key={inv.id} className="hover:bg-slate-50/50">
                <td className="p-3">
                  <img src={inv.image} alt={inv.title} className="w-12 h-8 rounded object-cover border" />
                </td>
                <td className="p-3 font-bold text-slate-800">{inv.title}</td>
                <td className="p-3 text-slate-600 italic">{inv.tagline}</td>
                <td className="p-3 text-right space-x-1.5 shrink-0">
                  <button 
                    onClick={() => { setForm(inv); setEditId(inv.id); }}
                    className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all inline-block"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => {
                      const updated = innovations.filter(x => x.id !== inv.id);
                      setInnovations(updated);
                      saveToStorage('innovations', updated);
                    }}
                    className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all inline-block"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HeroSlideManager: React.FC<{
  heroSlides: HeroSlide[];
  setHeroSlides: React.Dispatch<React.SetStateAction<HeroSlide[]>>;
  saveToStorage: any;
  handleFileUpload: any;
}> = ({ heroSlides, setHeroSlides, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<HeroSlide>>({ title: '', subtitle: '', image: '', ctaText: 'Selengkapnya', ctaLink: '#' });
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.subtitle || !form.image) return;

    let updated: HeroSlide[];
    if (editId !== null) {
      updated = heroSlides.map(slide => slide.id === editId ? { ...slide, ...form } as HeroSlide : slide);
      setEditId(null);
    } else {
      const newSlide: HeroSlide = {
        id: Date.now(),
        title: form.title,
        subtitle: form.subtitle,
        image: form.image,
        ctaText: form.ctaText || 'Selengkapnya',
        ctaLink: form.ctaLink || '#'
      };
      updated = [...heroSlides, newSlide];
    }
    setHeroSlides(updated);
    saveToStorage('hero_slides', updated);
    setForm({ title: '', subtitle: '', image: '', ctaText: 'Selengkapnya', ctaLink: '#' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-sans font-bold text-slate-900 text-base">Kelola Slider Beranda (Hero Carousel)</h3>
        <p className="text-[11px] text-slate-500 mt-0.5">Tambah, edit, atau hapus slide gambar utama halaman depan.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{editId !== null ? 'Edit Slide' : 'Tambah Slide Baru'}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama Slide</label>
            <input 
              type="text"
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Sub-judul Slide</label>
            <input 
              type="text"
              value={form.subtitle || ''}
              onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol (CTA)</label>
            <input 
              type="text"
              value={form.ctaText || ''}
              onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tautan Tombol (CTA Link)</label>
            <input 
              type="text"
              value={form.ctaLink || ''}
              onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">URL Gambar</label>
            <input 
              type="text"
              value={form.image || ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              required
            />
          </div>

          <div className="flex items-end">
            <label className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg cursor-pointer flex items-center justify-center space-x-1 border border-slate-300 h-9 w-full">
              <Upload className="w-3.5 h-3.5" />
              <span>Unggah Gambar Slide</span>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, image: url }))}
                className="hidden" 
              />
            </label>
          </div>
        </div>

        <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
          {editId !== null ? 'Simpan Slide' : 'Tambah Slide'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {heroSlides.map(slide => (
          <div key={slide.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col relative group">
            <img src={slide.image} alt={slide.title} className="w-full h-36 object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">{slide.title}</h5>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{slide.subtitle}</p>
              </div>
              <div className="flex justify-end space-x-2 mt-4 pt-3 border-t">
                <button 
                  onClick={() => { setForm(slide); setEditId(slide.id); }}
                  className="p-1.5 hover:bg-emerald-50 text-emerald-700 rounded transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    const updated = heroSlides.filter(x => x.id !== slide.id);
                    setHeroSlides(updated);
                    saveToStorage('hero_slides', updated);
                  }}
                  className="p-1.5 hover:bg-rose-50 text-rose-600 rounded transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LayananManager: React.FC<{
  publicServices: PublicServiceSop[];
  setPublicServices: React.Dispatch<React.SetStateAction<PublicServiceSop[]>>;
  saveToStorage: any;
  handleFileUpload: any;
}> = ({ publicServices, setPublicServices, saveToStorage, handleFileUpload }) => {
  const [form, setForm] = useState<Partial<PublicServiceSop>>({
    title: '',
    time: '2 Hari Kerja',
    cost: 'Rp 0,- (Gratis)',
    output: '',
    requirements: [],
    procedure: [],
    pdfUrl: ''
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [newReq, setNewReq] = useState('');
  const [newStep, setNewStep] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;

    let updated: PublicServiceSop[];
    if (editId !== null) {
      updated = publicServices.map(sop => sop.id === editId ? { ...sop, ...form } as PublicServiceSop : sop);
      setEditId(null);
    } else {
      const newSop: PublicServiceSop = {
        id: Date.now(),
        title: form.title,
        time: form.time || '2 Hari Kerja',
        cost: form.cost || 'Rp 0,- (Gratis)',
        output: form.output || 'Surat / Dokumen Resmi',
        requirements: form.requirements || [],
        procedure: form.procedure || [],
        pdfUrl: form.pdfUrl || ''
      };
      updated = [...publicServices, newSop];
    }
    setPublicServices(updated);
    saveToStorage('public_services', updated);
    
    // Reset form
    setForm({
      title: '',
      time: '2 Hari Kerja',
      cost: 'Rp 0,- (Gratis)',
      output: '',
      requirements: [],
      procedure: [],
      pdfUrl: ''
    });
    setNewReq('');
    setNewStep('');
  };

  const addRequirement = () => {
    if (!newReq.trim()) return;
    const reqs = form.requirements ? [...form.requirements] : [];
    reqs.push(newReq.trim());
    setForm({ ...form, requirements: reqs });
    setNewReq('');
  };

  const removeRequirement = (index: number) => {
    const reqs = form.requirements ? form.requirements.filter((_, i) => i !== index) : [];
    setForm({ ...form, requirements: reqs });
  };

  const addStep = () => {
    if (!newStep.trim()) return;
    const steps = form.procedure ? [...form.procedure] : [];
    steps.push(newStep.trim());
    setForm({ ...form, procedure: steps });
    setNewStep('');
  };

  const removeStep = (index: number) => {
    const steps = form.procedure ? form.procedure.filter((_, i) => i !== index) : [];
    setForm({ ...form, procedure: steps });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div>
          <h3 className="font-sans font-black text-slate-900 text-sm sm:text-base">Kelola E-Katalog & Standar Pelayanan Publik (SPP)</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Edit standar operasional (SOP), waktu penyelesaian, biaya, produk output, serta lampiran dokumen PDF resmi.</p>
        </div>
        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono shrink-0">SIPPN INTEGRATION</span>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
        <h4 className="font-sans font-black text-xs text-slate-800 uppercase tracking-widest border-b pb-2">
          {editId !== null ? '📝 Edit Data Layanan Publik' : '➕ Tambah Layanan Publik Baru'}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nama / Judul Layanan Publik</label>
            <input 
              type="text"
              placeholder="Contoh: Pelayanan Mutasi Siswa Masuk"
              value={form.title || ''}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Produk Hasil Pelayanan</label>
            <input 
              type="text"
              placeholder="Contoh: Surat Keterangan Penerimaan Siswa"
              value={form.output || ''}
              onChange={(e) => setForm({ ...form, output: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Waktu Penyelesaian</label>
            <input 
              type="text"
              placeholder="Contoh: 2 Hari Kerja atau 15 Menit"
              value={form.time || ''}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Biaya / Tarif</label>
            <input 
              type="text"
              placeholder="Contoh: Rp 0,- (Gratis)"
              value={form.cost || ''}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tautan / Dokumen PDF Resmi</label>
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Url berkas PDF..."
                value={form.pdfUrl || ''}
                onChange={(e) => setForm({ ...form, pdfUrl: e.target.value })}
                className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-300"
              />
              <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg p-2 flex items-center justify-center transition-all">
                <Upload className="w-3.5 h-3.5 text-slate-600" />
                <input 
                  type="file" 
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e, (url: string) => setForm({ ...form, pdfUrl: url }))}
                  className="hidden" 
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-4">
          {/* REQUIREMENTS SECTION */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">📋 Poin-Poin Persyaratan Berkas</label>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {(form.requirements || []).map((req, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 px-2.5 py-1 rounded-lg border text-xs gap-2">
                  <span className="flex-1 font-sans font-medium text-slate-600 text-[11px] line-clamp-1" title={req}>{idx + 1}. {req}</span>
                  <button 
                    type="button" 
                    onClick={() => removeRequirement(idx)}
                    className="text-rose-600 hover:text-rose-800 p-0.5 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {(form.requirements || []).length === 0 && (
                <p className="text-[11px] text-slate-400 italic">Belum ada poin persyaratan.</p>
              )}
            </div>

            <div className="flex gap-1.5">
              <input 
                type="text"
                placeholder="Ketik syarat berkas baru..."
                value={newReq}
                onChange={(e) => setNewReq(e.target.value)}
                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300"
              />
              <button 
                type="button" 
                onClick={addRequirement}
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg transition-all shrink-0"
              >
                Tambah
              </button>
            </div>
          </div>

          {/* PROCEDURE STEPS SECTION */}
          <div className="space-y-3">
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider">⚙️ Alur Mekanisme & Prosedur (SOP)</label>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {(form.procedure || []).map((step, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50 px-2.5 py-1 rounded-lg border text-xs gap-2">
                  <span className="flex-1 font-sans font-medium text-slate-600 text-[11px] line-clamp-1" title={step}>{idx + 1}. {step}</span>
                  <button 
                    type="button" 
                    onClick={() => removeStep(idx)}
                    className="text-rose-600 hover:text-rose-800 p-0.5 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              {(form.procedure || []).length === 0 && (
                <p className="text-[11px] text-slate-400 italic">Belum ada alur prosedur.</p>
              )}
            </div>

            <div className="flex gap-1.5">
              <input 
                type="text"
                placeholder="Ketik tahapan alur baru..."
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-300"
              />
              <button 
                type="button" 
                onClick={addStep}
                className="bg-emerald-800 hover:bg-emerald-900 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg transition-all shrink-0"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-3">
          {editId !== null && (
            <button 
              type="button" 
              onClick={() => {
                setEditId(null);
                setForm({
                  title: '',
                  time: '2 Hari Kerja',
                  cost: 'Rp 0,- (Gratis)',
                  output: '',
                  requirements: [],
                  procedure: [],
                  pdfUrl: ''
                });
                setNewReq('');
                setNewStep('');
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg transition-all"
            >
              Batal Edit
            </button>
          )}
          <button type="submit" className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-5 py-2 rounded-lg transition-all shadow-sm">
            {editId !== null ? '💾 Simpan Perubahan' : '➕ Daftarkan Layanan Publik'}
          </button>
        </div>
      </form>

      <div className="space-y-3">
        <h4 className="font-sans font-bold text-xs text-slate-700 uppercase tracking-widest pl-1">Daftar Layanan Publik Terbit ({publicServices.length})</h4>
        {publicServices.map(sop => (
          <div key={sop.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex justify-between items-start gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-sans font-black text-slate-900 text-sm">{sop.title}</h4>
                {sop.pdfUrl ? (
                  <span className="text-[9px] bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded-full uppercase font-mono border border-red-200">PDF ATTACHED</span>
                ) : (
                  <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full uppercase font-mono">NO PDF</span>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-[11px] font-medium text-slate-600">
                <p>⌛ <b>Waktu:</b> {sop.time || '1 Hari Kerja'}</p>
                <p>💰 <b>Biaya:</b> {sop.cost || 'Gratis'}</p>
                <p>📁 <b>Output:</b> {sop.output || 'Dokumen Resmi'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider mb-1">📋 Persyaratan ({sop.requirements.length}):</p>
                  <ul className="text-[11px] text-slate-500 space-y-1 list-decimal pl-4 font-sans">
                    {sop.requirements.map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-slate-700 text-[11px] uppercase tracking-wider mb-1">⚙️ Prosedur ({(sop.procedure || []).length}):</p>
                  <ul className="text-[11px] text-slate-500 space-y-1 list-decimal pl-4 font-sans">
                    {(sop.procedure || []).map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                    {(sop.procedure || []).length === 0 && (
                      <li className="list-none text-slate-400 italic">Belum ada alur prosedur khusus.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-1.5 shrink-0">
              <button 
                onClick={() => { setForm(sop); setEditId(sop.id); }}
                className="p-2 hover:bg-emerald-50 text-emerald-700 rounded-xl border border-slate-100 transition-all shadow-xs bg-slate-50/50"
                title="Edit Layanan"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => {
                  const updated = publicServices.filter(x => x.id !== sop.id);
                  setPublicServices(updated);
                  saveToStorage('public_services', updated);
                }}
                className="p-2 hover:bg-rose-50 text-rose-600 rounded-xl border border-slate-100 transition-all shadow-xs bg-slate-50/50"
                title="Hapus Layanan"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AccountManager: React.FC<{
  accounts: any[];
  setAccounts: React.Dispatch<React.SetStateAction<any[]>>;
  saveToStorage: any;
}> = ({ accounts, setAccounts, saveToStorage }) => {
  const [form, setForm] = useState<Partial<{ id: string; username: string; pin: string; role: string }>>({ username: '', pin: '', role: 'Administrator' });
  const [editId, setEditId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const showLocalFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username?.trim() || !form.pin?.trim()) {
      showLocalFeedback('Username dan PIN wajib diisi!');
      return;
    }

    const cleanUsername = form.username.trim().toLowerCase();
    
    // Check for duplicate username (except when editing the same account)
    const duplicate = accounts.some(acc => acc.id !== editId && acc.username.toLowerCase() === cleanUsername);
    if (duplicate) {
      showLocalFeedback('Username sudah digunakan oleh akun lain!');
      return;
    }

    let updated: any[];
    if (editId !== null) {
      updated = accounts.map(acc => acc.id === editId ? { ...acc, username: form.username!.trim(), pin: form.pin!.trim(), role: form.role } : acc);
      setEditId(null);
      showLocalFeedback('Akun berhasil diperbarui!');
    } else {
      const newAcc = {
        id: Date.now().toString(),
        username: form.username.trim(),
        pin: form.pin.trim(),
        role: form.role || 'Administrator'
      };
      updated = [...accounts, newAcc];
      showLocalFeedback('Akun baru berhasil ditambahkan!');
    }

    setAccounts(updated);
    saveToStorage('admin_accounts', updated);
    setForm({ username: '', pin: '', role: 'Administrator' });
  };

  const handleDelete = (id: string) => {
    if (accounts.length <= 1) {
      showLocalFeedback('Gagal! Minimal harus ada satu akun terdaftar agar tidak terkunci.');
      return;
    }
    const updated = accounts.filter(acc => acc.id !== id);
    setAccounts(updated);
    saveToStorage('admin_accounts', updated);
    showLocalFeedback('Akun berhasil dihapus!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-sans font-bold text-slate-900 text-base">Kelola Akun Administrator</h3>
          <p className="text-[11px] text-slate-500 mt-0.5">Tambah, edit, atau hapus kredensial akses masuk ke Panel Kontrol Admin.</p>
        </div>
        {feedback && (
          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-150 animate-pulse">
            {feedback}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form panel */}
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm lg:col-span-1 h-fit">
          <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{editId !== null ? 'Edit Akun' : 'Tambah Akun Baru'}</h4>
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nama Pengguna (Username)</label>
            <input 
              type="text"
              placeholder="Contoh: admin_sekolah"
              value={form.username || ''}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800 font-sans"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">PIN / Password Keamanan</label>
            <input 
              type="text"
              placeholder="Masukkan PIN / Password"
              value={form.pin || ''}
              onChange={(e) => setForm({ ...form, pin: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800 font-mono"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Peran Akses (Role)</label>
            <select
              value={form.role || 'Administrator'}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-emerald-800 bg-white"
            >
              <option value="Administrator">Administrator (Akses Penuh)</option>
              <option value="Operator">Operator (Akses Edit Data)</option>
              <option value="Kontributor">Guru Kontributor (Akses Berita)</option>
            </select>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
              {editId !== null ? 'Simpan Akun' : 'Daftarkan Akun'}
            </button>
            {editId !== null && (
              <button 
                type="button" 
                onClick={() => {
                  setEditId(null);
                  setForm({ username: '', pin: '', role: 'Administrator' });
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-3 py-2 rounded-lg transition-all"
              >
                Batal
              </button>
            )}
          </div>
        </form>

        {/* List table panel */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs lg:col-span-2">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700">Daftar Pengguna Aktif</span>
            <span className="text-[10px] font-mono text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full">{accounts.length} Akun</span>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 font-sans font-bold text-slate-700 border-b border-slate-200">
              <tr>
                <th className="p-3">Username</th>
                <th className="p-3">PIN / Password</th>
                <th className="p-3">Peran (Role)</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accounts.map(acc => (
                <tr key={acc.id} className="hover:bg-slate-50/50">
                  <td className="p-3">
                    <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span>{acc.username}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-slate-600 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                      {acc.pin}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      acc.role === 'Administrator' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                      acc.role === 'Operator' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {acc.role}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1.5 shrink-0">
                    <button 
                      onClick={() => { setForm(acc); setEditId(acc.id); }}
                      className="p-1 hover:bg-emerald-50 text-emerald-700 rounded transition-all inline-block"
                      title="Edit Akun"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(acc.id)}
                      className="p-1 hover:bg-rose-50 text-rose-600 rounded transition-all inline-block"
                      title="Hapus Akun"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-3 bg-amber-50 border-t border-amber-100 text-[11px] text-amber-800 flex items-start gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>Kredensial disimpan secara aman di browser lokal Anda. Pastikan selalu ada minimal satu akun Administrator aktif untuk menghindari terkunci dari sistem editing.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
