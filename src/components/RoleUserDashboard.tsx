import { useState, FormEvent } from 'react';
import { Consultation, KearifanLokal } from '../types';
import { HelpCircle, Clock, CheckCircle2, Navigation, Layers, Compass, BookOpen, Send, Sparkles } from 'lucide-react';

interface RoleUserDashboardProps {
  consultations: Consultation[];
  wisdoms: KearifanLokal[];
  onSubmitConsultation: (data: {
    title: string;
    location: string;
    terrainType: string;
    wisdomPreferenceId: string;
    question: string;
  }) => void;
  currentUser: { name: string; email: string };
}

export default function RoleUserDashboard({
  consultations,
  wisdoms,
  onSubmitConsultation,
  currentUser
}: RoleUserDashboardProps) {
  // Form state
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [terrainType, setTerrainType] = useState('Dataran Rendah Rawan Banjir');
  const [wisdomPreferenceId, setWisdomPreferenceId] = useState(wisdoms[0]?.id || '');
  const [question, setQuestion] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Filter consultations submitted by this simulated user
  const userConsultations = consultations.filter((c) => c.userId === 'user-kamal');

  const terrainOptions = [
    'Dataran Rendah Rawan Banjir',
    'Lereng Gunung Terjal / Curam',
    'Daerah Aliran Sungai / Bantaran',
    'Pekarangan Kering Padat Penduduk',
    'Pesisir Pantai / Rawan Rob'
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !location || !question) return;

    onSubmitConsultation({
      title,
      location,
      terrainType,
      wisdomPreferenceId,
      question
    });

    // Reset Form
    setTitle('');
    setLocation('');
    setQuestion('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Area: Ask Recommendation Form */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-emerald-950">Mulai Konsultasi Tata Ruang</h2>
              <p className="text-xs text-emerald-700">
                Hubungkan rancangan hunian Anda dengan kebijaksanaan spasial suku Nusantara
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl p-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Konsultasi berhasil diajukan! Beralihlah ke tab <strong>Relawan Ahli</strong> di kanan atas untuk menjawab pertanyaan ini.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                Judul Perencanaan / Masalah Lahan
              </label>
              <input
                type="text"
                placeholder="cth: Pembangunan Garasi di Tepi Sungai Cisadane"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 font-medium placeholder:text-emerald-700/30 text-emerald-950 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                  Lokasi Administratif
                </label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-2.5 w-3.5 h-3.5 text-emerald-600/70" />
                  <input
                    type="text"
                    placeholder="cth: Bogor, Jawa Barat"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="w-full text-xs pl-8 pr-3.5 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 font-medium placeholder:text-emerald-700/30 text-emerald-950 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                  Jenis Topografi / Lahan
                </label>
                <select
                  value={terrainType}
                  onChange={(e) => setTerrainType(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 font-medium text-emerald-950 bg-white outline-none transition-all"
                >
                  {terrainOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                Kearifan Adat yang Diinginkan Sebagai Inspirasi
              </label>
              <div className="grid grid-cols-2 gap-2">
                {wisdoms.map((wis) => (
                  <button
                    key={wis.id}
                    type="button"
                    onClick={() => setWisdomPreferenceId(wis.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                      wisdomPreferenceId === wis.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                        : 'border-emerald-100 bg-white hover:bg-emerald-50/10 text-emerald-800'
                    }`}
                  >
                    <div className="font-semibold truncate">{wis.title}</div>
                    <div className="text-[10px] text-emerald-600">Wilayah: {wis.region}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                Detail Pertanyaan Konsultasi Spasial
              </label>
              <textarea
                rows={4}
                placeholder="Jelaskan kondisi lahan Anda, rencana pembangunan, serta keraguan spasial/lingkungan yang dihadapi. Rekomendasi kearifan lokal apa yang ingin Anda gali lebih dalam?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 font-medium placeholder:text-emerald-700/30 text-emerald-950 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Kirim Kuisioner Konsultasi Ke Relawan Ahli
            </button>
          </form>
        </div>
      </div>

      {/* Right Area: History list & active queries */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* User Account Persona Card */}
        <div className="bg-emerald-900 text-white rounded-2xl p-5 border border-emerald-800 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-5 translate-y-5 opacity-10 pointer-events-none">
            <Compass className="w-40 h-40" />
          </div>
          <span className="bg-emerald-800 text-emerald-300 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider">
            AKUN SIMULASI AKTIF
          </span>
          <h3 className="text-base font-bold mt-2 font-sans">{currentUser.name}</h3>
          <p className="text-xs text-emerald-200/95 font-medium">{currentUser.email}</p>
          <div className="mt-3 pt-3 border-t border-emerald-800 flex justify-between text-[11px] text-emerald-200">
            <span>Konsultasi Diajukan:</span>
            <span className="font-bold font-mono">{userConsultations.length}</span>
          </div>
        </div>

        {/* History Stream */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600" />
              Riwayat Konsultasi Spasial
            </h3>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-mono px-2 py-0.5 rounded-lg border border-emerald-100">
              {userConsultations.length} Pertanyaan
            </span>
          </div>

          {userConsultations.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="w-8 h-8 text-emerald-300 mx-auto mb-1.5" />
              <p className="text-xs font-bold text-emerald-800">Belum ada riwayat</p>
              <p className="text-[10px] text-emerald-600/70">Gunakan formulir di kiri untuk mengirim konsultasi pertama Anda.</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
              {userConsultations.map((cons) => {
                const preference = wisdoms.find((w) => w.id === cons.wisdomPreferenceId);
                return (
                  <div
                    key={cons.id}
                    className="border border-emerald-100 rounded-xl p-3.5 space-y-3 hover:border-emerald-300 transition-all bg-emerald-50/20"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div>
                        <h4 className="text-xs font-bold text-emerald-950">{cons.title}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-700/80 mt-0.5">
                          <span>{cons.location}</span>
                          <span>•</span>
                          <span className="italic">{cons.terrainType}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          cons.status === 'answered'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {cons.status === 'answered' ? 'Terjawab' : 'Menunggu'}
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-700 bg-white border border-emerald-100/40 p-2.5 rounded-lg">
                      <strong>Pertanyaan:</strong> {cons.question}
                    </p>

                    {preference && (
                      <div className="text-[10px] text-emerald-800 font-medium">
                        Model Acuan: <strong className="text-emerald-950">{preference.title}</strong>
                      </div>
                    )}

                    {/* Show Answer if Answered */}
                    {cons.status === 'answered' && cons.answer ? (
                      <div className="bg-emerald-600/5 text-white border border-emerald-200/80 rounded-xl p-3 space-y-2 mt-2">
                        <div className="flex items-center justify-between border-b border-emerald-500/10 pb-1.5">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-[10px] font-bold text-emerald-950">
                              Dijawab Oleh: {cons.answer.volunteerName}
                            </span>
                          </div>
                          <span className="text-[9px] text-emerald-700 font-mono">
                            {cons.answer.volunteerTitle}
                          </span>
                        </div>
                        <p className="text-xs text-emerald-950 leading-relaxed font-sans whitespace-pre-wrap">
                          {cons.answer.response}
                        </p>
                        <div className="text-[9px] bg-emerald-600 text-white p-2 rounded-lg font-mono">
                          <strong>Kearifan Terapan:</strong> {cons.answer.wisdomRecommendation}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-amber-500/5 border border-dashed border-amber-200 rounded-xl p-3 flex items-center gap-2 text-[10px] text-amber-800 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Dokumen sedang diteliti relawan. Ganti role ke <strong>Relawan Ahli</strong> di kanan atas untuk memproses jawaban!</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Informative Research Panel */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-5">
          <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Mengapa Tataruang.in Penting?
          </h4>
          <p className="text-[11px] text-emerald-900/90 leading-relaxed">
            Data BNPB menunjukkan bahwa <strong>73% kabupaten/kota di Indonesia berada dalam kondisi rawan bencana hidrometeorologi (banjir & longsor)</strong>. Sistem penataan modern sering lupa menyertakan kearifan adaptasi ekologis lokal.
          </p>
          <div className="mt-3 bg-emerald-50 rounded-xl p-2.5 text-[10px] text-emerald-800 font-mono">
            <strong>Penelitian OPSI 2026:</strong> Berupaya mengomunikasikan best practices perumahan adat (batu umpak, terasering tanpa semen) ke generasi modern berteknologi digital.
          </div>
        </div>

      </div>

    </div>
  );
}
