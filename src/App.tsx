import { useState, useEffect } from 'react';
import { UserRole, KearifanLokal, Consultation, Volunteer } from './types';
import {
  initialKearifanLokal,
  initialConsultations,
  initialVolunteers
} from './initialData';
import Header from './components/Header';
import WisdomDatabase from './components/WisdomDatabase';
import RoleUserDashboard from './components/RoleUserDashboard';
import RoleRelawanDashboard from './components/RoleRelawanDashboard';
import RoleAdminDashboard from './components/RoleAdminDashboard';
import {
  BookOpen,
  Award,
  Sparkles,
  Layers,
  HelpCircle,
  Clock,
  CheckCircle,
  Users,
  Info,
  Calendar,
  Compass
} from 'lucide-react';

export default function App() {
  // 1. Core Reactive States backed by LocalStorage for dynamic full-simulator experience
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('tataruang_current_role');
    return (saved as UserRole) || 'user';
  });

  const [wisdoms, setWisdoms] = useState<KearifanLokal[]>(() => {
    const saved = localStorage.getItem('tataruang_wisdoms');
    return saved ? JSON.parse(saved) : initialKearifanLokal;
  });

  const [consultations, setConsultations] = useState<Consultation[]>(() => {
    const saved = localStorage.getItem('tataruang_consultations');
    return saved ? JSON.parse(saved) : initialConsultations;
  });

  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => {
    const saved = localStorage.getItem('tataruang_volunteers');
    return saved ? JSON.parse(saved) : initialVolunteers;
  });

  // Simulated current logged-in identity
  const [activeUserId, setActiveUserId] = useState(() => {
    return currentRole === 'admin'
      ? 'admin-utama'
      : currentRole === 'relawan'
      ? 'vol-sabit'
      : 'user-kamal';
  });

  // Main navigation tab
  const [activeMainTab, setActiveMainTab] = useState<'beranda' | 'konsultasi' | 'pustaka' | 'daftar'>('beranda');

  // Registration form state for dynamic volunteer list additions
  const [regName, setRegName] = useState('');
  const [regTitle, setRegTitle] = useState('');
  const [regInstitution, setRegInstitution] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // Keep state synced to localStorage
  useEffect(() => {
    localStorage.setItem('tataruang_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('tataruang_wisdoms', JSON.stringify(wisdoms));
  }, [wisdoms]);

  useEffect(() => {
    localStorage.setItem('tataruang_consultations', JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem('tataruang_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  // Adjust active simulated user profile based on role changes
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'admin') {
      setActiveUserId('admin-utama');
    } else if (role === 'relawan') {
      setActiveUserId('vol-sabit');
    } else {
      setActiveUserId('user-kamal');
    }
  };

  const handleSwitchSimulatedUser = (userId: string) => {
    setActiveUserId(userId);
  };

  const getSimulatedUser = () => {
    if (currentRole === 'admin') {
      return { name: 'Administrator Utama', email: 'admin@tataruang.in' };
    }
    if (currentRole === 'relawan') {
      const vol = volunteers.find((v) => v.id === activeUserId) || volunteers[0];
      return { name: vol.name, email: vol.email };
    }
    return { name: 'Kamal Pratama (Siswa BAZNAS)', email: 'kamalproject001@gmail.com' };
  };

  // 2. Action Handlers called by subcomponents
  // citizens adding new surveys
  const handleSubmitConsultation = (data: {
    title: string;
    location: string;
    terrainType: string;
    wisdomPreferenceId: string;
    question: string;
  }) => {
    const newConsItem: Consultation = {
      id: `cons-${Date.now()}`,
      userId: 'user-kamal', // default user id
      userName: 'Kamal Pratama',
      title: data.title,
      location: data.location,
      terrainType: data.terrainType,
      wisdomPreferenceId: data.wisdomPreferenceId,
      question: data.question,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setConsultations((prev) => [newConsItem, ...prev]);
  };

  // volunteers answering consultation questions
  const handleAnswerConsultation = (
    consultationId: string,
    data: {
      volunteerId: string;
      volunteerName: string;
      volunteerTitle: string;
      response: string;
      wisdomRecommendation: string;
    }
  ) => {
    setConsultations((prev) =>
      prev.map((c) => {
        if (c.id === consultationId) {
          return {
            ...c,
            status: 'answered' as const,
            answer: {
              id: `ans-${Date.now()}`,
              volunteerId: data.volunteerId,
              volunteerName: data.volunteerName,
              volunteerTitle: data.volunteerTitle,
              response: data.response,
              wisdomRecommendation: data.wisdomRecommendation,
              createdAt: new Date().toISOString()
            }
          };
        }
        return c;
      })
    );

    // Give points/hours to the volunteer
    setVolunteers((prev) =>
      prev.map((v) => {
        if (v.id === data.volunteerId) {
          return {
            ...v,
            certifiedHours: v.certifiedHours + 4, // 4 Jam Pelajaran/Sertifikat
            consultationsAnswered: v.consultationsAnswered + 1
          };
        }
        return v;
      })
    );
  };

  // admin deleting consultations
  const handleDeleteConsultation = (id: string) => {
    setConsultations((prev) => prev.filter((c) => c.id !== id));
  };

  // admin deleting wisdom entries
  const handleDeleteWisdom = (id: string) => {
    setWisdoms((prev) => prev.filter((w) => w.id !== id));
  };

  // admin adding custom wisdom entries
  const handleAddWisdom = (newWisdom: KearifanLokal) => {
    setWisdoms((prev) => [newWisdom, ...prev]);
  };

  // resetting simulated storage
  const handleResetData = () => {
    setWisdoms(initialKearifanLokal);
    setConsultations(initialConsultations);
    setVolunteers(initialVolunteers);
    localStorage.removeItem('tataruang_wisdoms');
    localStorage.removeItem('tataruang_consultations');
    localStorage.removeItem('tataruang_volunteers');
  };

  const handleRegisterVolunteer = (e: any) => {
    e.preventDefault();
    if (!regName || !regTitle || !regInstitution || !regEmail) return;

    const newVol: Volunteer = {
      id: `vol-${Date.now()}`,
      name: regName,
      email: regEmail,
      title: regTitle,
      institution: regInstitution,
      certifiedHours: 0,
      consultationsAnswered: 0
    };

    setVolunteers((prev) => [...prev, newVol]);
    setRegName('');
    setRegTitle('');
    setRegInstitution('');
    setRegEmail('');
    setRegSuccess('Selamat! Pendaftaran Relawan sukses. Nama baru Anda sekarang tertera pada list Relawan Terdaftar!');
    setTimeout(() => setRegSuccess(''), 5000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans">
      
      {/* Universal Sticky Header (With role selectors and researcher credits) */}
      <Header
        currentRole={currentRole}
        onChangeRole={handleRoleChange}
        currentUser={getSimulatedUser()}
        onSwitchSimulatedUser={handleSwitchSimulatedUser}
        activeUserId={activeUserId}
      />

      {/* Main Body Grid wrapper container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8 w-full">
        
        {/* Pitch Jumbotron Intro */}
        <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-10 pointer-events-none">
            <Compass className="w-80 h-80" />
          </div>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/30 text-emerald-100 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-emerald-400/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              Sains &amp; Kearifan Nusantara Berpadu
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Sistem Konsultasi Tata Ruang Partisipatif untuk Permukiman Berkelanjutan
            </h1>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-2xl">
              Meminimalisir risiko bencana dengan mengadaptasi prinsip kearifan tata letak adat (Baduy, Bena, Subak Bali) ke draf bangunan modern Anda. Didukung oleh jaringan relawan siswa peneliti SMA BAZNAS.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-emerald-500/20 text-xs text-left">
            <div>
              <div className="text-emerald-300 uppercase font-bold text-[10px]">Model Penelitian</div>
              <div className="font-semibold text-white mt-0.5 font-mono">ADDIE Framework</div>
            </div>
            <div>
              <div className="text-emerald-300 uppercase font-bold text-[10px]">Potensi Rawan Bencana</div>
              <div className="font-semibold text-white mt-0.5 font-mono">73% Kabupaten/Kota</div>
            </div>
            <div>
              <div className="text-emerald-300 uppercase font-bold text-[10px]">Rasio Terjawab</div>
              <div className="font-semibold text-white mt-0.5 font-mono">
                {consultations.length > 0
                  ? `${Math.round(
                      (consultations.filter((c) => c.status === 'answered').length /
                        consultations.length) *
                        100
                    )}%`
                  : '100%'}
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Features / Navigation Tabs Bar */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-2 shadow-xs flex flex-wrap gap-2">
          <button
            onClick={() => setActiveMainTab('beranda')}
            className={`flex-1 min-w-[120px] text-center py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
              activeMainTab === 'beranda'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-800 hover:bg-emerald-50/50'
            }`}
          >
            🏡 Beranda
          </button>
          
          <button
            onClick={() => setActiveMainTab('konsultasi')}
            className={`flex-1 min-w-[120px] text-center py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
              activeMainTab === 'konsultasi'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-800 hover:bg-emerald-50/50'
            }`}
          >
            💬 Konsultasi ({consultations.filter((c) => c.status === 'pending').length} Baru)
          </button>

          <button
            onClick={() => setActiveMainTab('pustaka')}
            className={`flex-1 min-w-[120px] text-center py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
              activeMainTab === 'pustaka'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-800 hover:bg-emerald-50/50'
            }`}
          >
            📚 Ensiklopedia Pustaka
          </button>

          <button
            onClick={() => setActiveMainTab('daftar')}
            className={`flex-1 min-w-[120px] text-center py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all cursor-pointer ${
              activeMainTab === 'daftar'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-800 hover:bg-emerald-50/50'
            }`}
          >
            📂 Daftar Relawan ({volunteers.length})
          </button>
        </div>

        {/* Dynamic Nav Content Switcher */}
        {activeMainTab === 'beranda' && (
          <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Konsep Platform */}
              <div className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-xs space-y-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">💡</div>
                <h3 className="font-bold text-emerald-950 text-base">Konsep Tataruang.in</h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Menjembatani kesenjangan akses pengetahuan mengenai tata ruang adat Nusantara yang terbukti efektif mengadaptasi alam secara berkelanjutan selama ratusan tahun.
                </p>
              </div>

              {/* Card 2: Metode Partisipatif */}
              <div className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-xs space-y-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">🤝</div>
                <h3 className="font-bold text-emerald-950 text-base">Crowdsourcing Sosial</h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Melibatkan pemuda, siswa/pelajar, serta relawan arsitektur profesional untuk menyumbangkan keahlian dengan mendampingi permohonan analisis spasial publik secara gratis.
                </p>
              </div>

              {/* Card 3: Mitigasi Kebencanaan */}
              <div className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-xs space-y-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">🛡️</div>
                <h3 className="font-bold text-emerald-950 text-base">Adaptasi &amp; Mitigasi</h3>
                <p className="text-xs text-stone-700 leading-relaxed">
                  Mengembangkan teras pemukiman dinamis, resapan air pekarangan terbuka, serta zonasi larangan pemukiman di bantaran sungai guna menekan curah bahaya banjir.
                </p>
              </div>

            </div>

            {/* Quick Walkthrough For Mock Simulator */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-left">
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                Panduan Uji Coba Simulasi 3 Role (Admin, Relawan, &amp; User)
              </h3>
              <p className="text-xs text-emerald-950 leading-relaxed mb-4">
                Tataruang.in mensimulasikan platform kolaboratif multi-pihak secara real-time. Anda dapat berganti peran di menu pojok kanan atas layar dan melihat hasil interaksinya:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white/80 p-3 rounded-lg border border-emerald-100">
                  <span className="font-extrabold text-emerald-700 block mb-1">1. Role Masyarakat (User)</span>
                  Kirim form pertanyaan terkait perencanaan hunian Anda. Tentukan topografi dan model arsitektur Nusantara acuan Anda.
                </div>
                <div className="bg-white/80 p-3 rounded-lg border border-emerald-100">
                  <span className="font-extrabold text-emerald-700 block mb-1">2. Role Relawan Ahli</span>
                  Lihat antrean pertanyaan baru yang dikirim warga. Bantu susun naskah penyelesaian tata tempat tinggal dan dapatkan poin sertifikat OPSI!
                </div>
                <div className="bg-white/80 p-3 rounded-lg border border-emerald-100">
                  <span className="font-extrabold text-emerald-700 block mb-1">3. Role Admin Web</span>
                  Mengevaluasi, menghapus postingan yang melanggar, menambahkan bank data adat baru, serta menyetel ulang simulasi.
                </div>
              </div>
            </div>
          </section>
        )}

        {activeMainTab === 'konsultasi' && (
          <section className="space-y-4 text-left">
            
            {/* Dynamic Multi-role Switchable Workspaces */}
            <div id="role-workspace-box" className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 inline-block"></span>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-emerald-950 font-serif">
                  Tampilan Workspace Berdasarkan Akun: <span className="text-emerald-600 underline">{currentRole.toUpperCase()}</span>
                </h2>
              </div>

              {currentRole === 'user' && (
                <RoleUserDashboard
                  consultations={consultations}
                  wisdoms={wisdoms}
                  onSubmitConsultation={handleSubmitConsultation}
                  currentUser={getSimulatedUser()}
                />
              )}

              {currentRole === 'relawan' && (
                <RoleRelawanDashboard
                  consultations={consultations}
                  wisdoms={wisdoms}
                  volunteers={volunteers}
                  activeVolunteerId={activeUserId}
                  onAnswerConsultation={handleAnswerConsultation}
                />
              )}

              {currentRole === 'admin' && (
                <RoleAdminDashboard
                  consultations={consultations}
                  wisdoms={wisdoms}
                  volunteers={volunteers}
                  onDeleteConsultation={handleDeleteConsultation}
                  onDeleteWisdom={handleDeleteWisdom}
                  onAddWisdom={handleAddWisdom}
                  onResetData={handleResetData}
                />
              )}
            </div>
          </section>
        )}

        {activeMainTab === 'pustaka' && (
          <section className="space-y-4 text-left">
            {/* Persistent Wisdom Knowledge Bank (Visible below workspace, allowing fast reference) */}
            <WisdomDatabase wisdoms={wisdoms} />
          </section>
        )}

        {activeMainTab === 'daftar' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
            
            {/* Registered Volunteers List */}
            <div className="lg:col-span-7 bg-white border border-emerald-100 rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-base font-bold text-emerald-950">Daftar Relawan Adat Terverifikasi</h3>
                <p className="text-xs text-emerald-700">
                  Tim peneliti, siswa SMA, dan praktisi tata ruang terdaftar yang mengawal konsultasi Nusantara
                </p>
              </div>

              <div className="divide-y divide-emerald-50">
                {volunteers.map((vol) => (
                  <div key={vol.id} className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold font-serif flex items-center justify-center">
                        {vol.name[0]}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-stone-900">{vol.name}</h4>
                        <p className="text-[11px] text-stone-500 font-medium">{vol.title}</p>
                        <p className="text-[10px] text-emerald-700">{vol.institution}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-lg">
                        {vol.certifiedHours} JP Pengabdian
                      </span>
                      <p className="text-[10px] text-stone-400 mt-1">{vol.consultationsAnswered} konsultasi dijawab</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated Registration Form */}
            <div className="lg:col-span-5 bg-white border border-emerald-100 rounded-2xl p-6 space-y-4 h-fit">
              <div>
                <h3 className="text-base font-bold text-emerald-950">Daftar Menjadi Relawan Ahli</h3>
                <p className="text-xs text-emerald-700">
                  Gabung ke program OPSI 2026. Berkontribusi mendisiplinkan tata bangunan adat Indonesia.
                </p>
              </div>

              {regSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs p-3 rounded-xl">
                  {regSuccess}
                </div>
              )}

              <form onSubmit={handleRegisterVolunteer} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-emerald-900 font-bold mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="cth: Sabit Nur Kamal"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-950 font-medium outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-emerald-900 font-bold mb-1">Gelar / Spesialisasi</label>
                  <input
                    type="text"
                    required
                    value={regTitle}
                    onChange={(e) => setRegTitle(e.target.value)}
                    placeholder="cth: Arsitek Desain Hijau / Siswa Peneliti"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-950 font-medium outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-emerald-900 font-bold mb-1">Instansi / Sekolah</label>
                  <input
                    type="text"
                    required
                    value={regInstitution}
                    onChange={(e) => setRegInstitution(e.target.value)}
                    placeholder="cth: SMA Cendekia BAZNAS, Bogor"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-950 font-medium outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-emerald-900 font-bold mb-1">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="sabit@cendekia.sch.id"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 bg-white text-emerald-950 font-medium outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Daftarkan Akun Relawan Sekarang
                </button>
              </form>
            </div>

          </section>
        )}

        {/* Research References (Sourced directly from PDF Proposal) */}
        <section className="bg-white border border-emerald-100 rounded-3xl p-6 text-left">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-2 uppercase tracking-tight text-emerald-900 border-b border-emerald-50 pb-2">
              <Info className="w-4.5 h-4.5" />
              Landasan Teoretis (Daftar Pustaka)
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] text-stone-600 italic">
              <li>
                "Kedudukan Kearifan Lokal dalam Penataan Tata Ruang Kota di Pemerintahan Daerah" — <strong>Islahuddin &amp; Mukhtar (2023)</strong>.
              </li>
              <li>
                "Tata Ruang Masyarakat Pendukung Tradisi Megalitik: Kasus Masyarakat Baduy" — <strong>Raden Cecep Eka Permana (1995)</strong>.
              </li>
              <li>
                "E-Participation dalam Kebijakan Publik Berdasarkan Literature Review" — <strong>Pebriyanto, Jumanah, &amp; Sutoto (2024)</strong>.
              </li>
            </ul>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-[10px] text-emerald-950 text-center">
              <strong>Catatan Autentik:</strong> Model UI, role, relawan dan data pengolahan spasial dirancang sesuai bab demi bab proposal penelitian OPSI 2026.
            </div>
          </div>
        </section>

      </main>

      {/* Modern Compact Green Footer */}
      <footer className="bg-emerald-950 text-emerald-200 py-6 border-t border-emerald-900 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="text-xs font-semibold">
            © 2026 tataruang.in — Prototipe Platform Konsultasi Digital OPSI SMA Cendekia BAZNAS.
          </p>
          <p className="text-[10px] text-emerald-400">
            Dibuat secara profesional menggunakan framework React + TypeScript + Tailwind CSS
          </p>
        </div>
      </footer>

    </div>
  );
}
