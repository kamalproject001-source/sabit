import { useState, FormEvent } from 'react';
import { Consultation, KearifanLokal, Volunteer } from '../types';
import { BookOpen, Award, CheckCircle2, Clock, MessageSquarePlus, MessageSquare, Sparkles, User, GraduationCap, Send } from 'lucide-react';

interface RoleRelawanDashboardProps {
  consultations: Consultation[];
  wisdoms: KearifanLokal[];
  volunteers: Volunteer[];
  activeVolunteerId: string;
  onAnswerConsultation: (
    consultationId: string,
    data: {
      volunteerId: string;
      volunteerName: string;
      volunteerTitle: string;
      response: string;
      wisdomRecommendation: string;
    }
  ) => void;
}

export default function RoleRelawanDashboard({
  consultations,
  wisdoms,
  volunteers,
  activeVolunteerId,
  onAnswerConsultation
}: RoleRelawanDashboardProps) {
  const activeVolunteer = volunteers.find((v) => v.id === activeVolunteerId) || volunteers[0];

  // Selected consultation to answer
  const [selectedConsId, setSelectedConsId] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [wisdomRecommendation, setWisdomRecommendation] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const pendingConsultations = consultations.filter((c) => c.status === 'pending');
  const answeredConsultationsByMe = consultations.filter(
    (c) => c.status === 'answered' && c.answer?.volunteerId === activeVolunteer.id
  );

  const selectedCons = consultations.find((c) => c.id === selectedConsId);

  const handleOpenAnswerForm = (cons: Consultation) => {
    setSelectedConsId(cons.id);
    const prefWisdom = wisdoms.find((w) => w.id === cons.wisdomPreferenceId);
    setResponse(`Halo ${cons.userName},\n\nMenilik pertanyaan Anda mengenai pembangunan di ${cons.location} dengan jenis tanah "${cons.terrainType}", berikut rekomendasi tata ruang berbasis kearifan lokal ${prefWisdom?.title || 'Nusantara'}:\n\n1. \n2. \n3. `);
    setWisdomRecommendation(prefWisdom ? `Berdasarkan filosofi ${prefWisdom.title}: "${prefWisdom.philosophies[0]}"` : '');
  };

  const handleSubmitAnswer = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedConsId || !response || !wisdomRecommendation) return;

    onAnswerConsultation(selectedConsId, {
      volunteerId: activeVolunteer.id,
      volunteerName: activeVolunteer.name,
      volunteerTitle: activeVolunteer.title,
      response,
      wisdomRecommendation
    });

    setSuccessMsg('Jawaban berhasil disubmit! Anda mendapatkan +4 Jam Sertifikasi Pengalaman OPSI.');
    setSelectedConsId(null);
    setResponse('');
    setWisdomRecommendation('');

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* Left Column: List of Questions to Answer */}
      <div className="lg:col-span-7 space-y-6">

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl p-3.5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Pending Consultations Area */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3 mb-4">
            <div>
              <h2 className="text-base font-bold text-emerald-950 flex items-center gap-2.5">
                <MessageSquarePlus className="w-5 h-5 text-emerald-600" />
                Antrean Konsultasi Publik (Belum Dijawab)
              </h2>
              <p className="text-xs text-emerald-700">
                Pilih kuisioner tata ruang masyarakat untuk Anda bantu berikan solusi spasial
              </p>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-xl border border-emerald-200/50">
              {pendingConsultations.length} Pertanyaan Masuk
            </span>
          </div>

          {pendingConsultations.length === 0 ? (
            <div className="text-center py-12 bg-emerald-50/20 rounded-xl border border-dashed border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-emerald-950">Semua konsultasi telah terjawab!</p>
              <p className="text-xs text-emerald-600/75 mt-0.5">
                Ganti role ke <strong>Masyarakat (User)</strong> untuk memasukkan pertanyaan konsultasi baru.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingConsultations.map((cons) => {
                const preference = wisdoms.find((w) => w.id === cons.wisdomPreferenceId);
                return (
                  <div
                    key={cons.id}
                    className="border border-emerald-100 rounded-2xl p-4 space-y-3 bg-emerald-50/10 hover:border-emerald-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div>
                        <span className="inline-block bg-amber-50 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-md border border-amber-200 uppercase mb-1">
                          {cons.terrainType}
                        </span>
                        <h3 className="text-xs font-bold text-emerald-950">{cons.title}</h3>
                        <p className="text-[10px] text-emerald-700/80 mt-0.5">
                          Diajukan oleh: <strong className="text-emerald-950">{cons.userName}</strong> @ {cons.location}
                        </p>
                      </div>
                      <span className="flex items-center gap-1.5 text-[10px] text-amber-800 bg-amber-50 px-2.1 py-1 rounded-lg font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        Pending
                      </span>
                    </div>

                    <p className="text-[11px] text-stone-700 bg-white p-3 border border-emerald-100/50 rounded-xl">
                      <strong>Masalah Lahan:</strong> {cons.question}
                    </p>

                    {preference && (
                      <div className="text-[10px] bg-emerald-100/30 text-emerald-800 px-3 py-1.5 rounded-lg font-medium flex items-center justify-between">
                        <span>Model Acuan Diminta: <strong>{preference.title}</strong></span>
                        <span className="text-[9px] text-emerald-600">{preference.region}</span>
                      </div>
                    )}

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => handleOpenAnswerForm(cons)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        Formulir Jawab Konsultasi →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Interactive Answer Editor Form */}
        {selectedCons && (
          <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
              <h3 className="text-sm font-bold text-emerald-950">
                Menyusun Rekomendasi untuk: <span className="text-emerald-600">{selectedCons.title}</span>
              </h3>
              <button
                onClick={() => setSelectedConsId(null)}
                className="text-stone-400 hover:text-stone-600 text-xs font-bold"
              >
                Batal
              </button>
            </div>

            <form onSubmit={handleSubmitAnswer} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase mb-1">
                  1. Rekomendasi Solusi Berbasis Arsitektur Tradisional / Tata Ruang
                </label>
                <textarea
                  rows={6}
                  required
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-emerald-200 outline-none focus:ring-2 focus:ring-emerald-500 font-mono resize-none leading-relaxed text-emerald-950"
                ></textarea>
                <span className="text-[10px] text-emerald-700">
                  Tip: Berikan rekomendasi teknis yang aplikatif, cth: drainase batu kali, tiang tanpa mengeruk lereng.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-950 uppercase mb-1">
                  2. Kutipan Filosofi Tradisional (Sebagai Acuan Teoretis)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Filosofi Baduy 'Lojor teu dimeunangkeun dipotong...' - menjaga keselarasan bukit."
                  value={wisdomRecommendation}
                  onChange={(e) => setWisdomRecommendation(e.target.value)}
                  className="w-full text-xs px-3.5 py-2 rounded-xl border border-emerald-200 outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-emerald-950"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[10px] text-emerald-700 font-semibold">
                  Relawan Pengirim: <strong className="text-emerald-900">{activeVolunteer.name}</strong>
                </span>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Kirim &amp; Sahkan Sertifikat
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Right Column: Volunteer Stats & Certificate Counter */}
      <div className="lg:col-span-5 space-y-6">

        {/* Personalized Volunteer Profile */}
        <div className="bg-emerald-950 text-white rounded-3xl p-6 border border-emerald-900 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 -translate-y-6 translate-x-6 opacity-5 pointer-events-none">
            <Award className="w-44 h-44" />
          </div>

          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-12 h-12 rounded-full bg-emerald-600 border-2 border-emerald-400 flex items-center justify-center font-bold text-lg">
              {activeVolunteer.name[0]}
            </div>
            <div>
              <span className="bg-emerald-800 text-emerald-300 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                RELAWAN TERVERIFIKASI
              </span>
              <h3 className="text-base font-bold font-sans">{activeVolunteer.name}</h3>
              <p className="text-[11px] text-emerald-200">{activeVolunteer.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-emerald-900/40 rounded-2xl p-3 border border-emerald-800/60 mt-4">
            <div className="text-center p-2">
              <div className="text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">Jam Mengabdi</div>
              <div className="text-2xl font-black font-mono text-white mt-1">{activeVolunteer.certifiedHours} JP</div>
            </div>
            <div className="text-center p-2 border-l border-emerald-800/40">
              <div className="text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">Terjawab</div>
              <div className="text-2xl font-black font-mono text-white mt-1">{activeVolunteer.consultationsAnswered} Laporan</div>
            </div>
          </div>

          <div className="mt-4 text-[10px] bg-emerald-600/20 text-emerald-300 p-2.5 rounded-xl border border-emerald-800 text-center font-mono">
            Sertifikat Diotorisasi oleh SMA Cendekia BAZNAS (OPSI)
          </div>
        </div>

        {/* Volunteers Leaderboard */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-3.5">
          <h3 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider flex items-center gap-1">
            <GraduationCap className="w-4 h-4 text-emerald-650" />
            Tim Peneliti &amp; Relawan Adat
          </h3>

          <div className="space-y-2.5">
            {volunteers.map((v) => (
              <div
                key={v.id}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  v.id === activeVolunteer.id
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-emerald-100 bg-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                    {v.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">{v.name}</h4>
                    <p className="text-[9.5px] text-emerald-700 font-medium">{v.institution}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black font-mono text-emerald-950">{v.certifiedHours} Jam</div>
                  <div className="text-[9px] text-emerald-600">Sertifikasi JP</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Answered History Stream from Volunteer perspective */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-5">
          <h3 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider mb-3 flex items-center gap-1">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            Sumbangsih Saya ({answeredConsultationsByMe.length})
          </h3>

          {answeredConsultationsByMe.length === 0 ? (
            <div className="text-center py-6 text-[11px] text-emerald-700/75">
              Anda belum menjawab konsultasi apa pun hari ini.
            </div>
          ) : (
            <div className="space-y-3 max-h-[220px] overflow-y-auto">
              {answeredConsultationsByMe.map((cons) => (
                <div key={cons.id} className="p-3 bg-emerald-50/20 border border-emerald-100 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-emerald-950 truncate">{cons.title}</h4>
                    <span className="text-[8.5px] font-mono bg-emerald-600 text-white px-1.5 py-0.5 rounded-md">
                      Disah-kan
                    </span>
                  </div>
                  <p className="text-[10px] text-emerald-900/80 truncate"><strong>User:</strong> {cons.userName}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
