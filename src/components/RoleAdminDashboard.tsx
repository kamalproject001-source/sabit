import { useState, FormEvent } from 'react';
import { Consultation, KearifanLokal, Volunteer } from '../types';
import { Trash2, Plus, Sparkles, ShieldCheck, Database, FileText, BarChart3, AlertTriangle } from 'lucide-react';

interface RoleAdminDashboardProps {
  consultations: Consultation[];
  wisdoms: KearifanLokal[];
  volunteers: Volunteer[];
  onDeleteConsultation: (id: string) => void;
  onDeleteWisdom: (id: string) => void;
  onAddWisdom: (newWisdom: KearifanLokal) => void;
  onResetData: () => void;
}

export default function RoleAdminDashboard({
  consultations,
  wisdoms,
  volunteers,
  onDeleteConsultation,
  onDeleteWisdom,
  onAddWisdom,
  onResetData
}: RoleAdminDashboardProps) {
  // New Wisdom form state
  const [newTitle, setNewTitle] = useState('');
  const [newRegion, setNewRegion] = useState('');
  const [newCategory, setNewCategory] = useState<'Mitigasi Bencana' | 'Zonasi Adat' | 'Konservasi Air' | 'Harmoni Lingkungan'>('Zonasi Adat');
  const [newDescription, setNewDescription] = useState('');
  const [newPhilosophies, setNewPhilosophies] = useState('');
  const [newBestPractices, setNewBestPractices] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [activeTab, setActiveTab] = useState<'consultations' | 'wisdoms' | 'system'>('consultations');

  const handleSubmitWisdom = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newRegion || !newDescription) return;

    // Splitting philosophies and practices by newline/comma
    const philosophiesArr = newPhilosophies
      ? newPhilosophies.split('\n').filter((p) => p.trim() !== '')
      : ['Prinsip kelestarian alam hidup bersama masyarakat'];

    const bestPracticesArr = newBestPractices
      ? newBestPractices.split('\n').filter((p) => p.trim() !== '')
      : ['Memposisikan tata bangunan tidak merusak resepan air alami setempat'];

    const newEntry: KearifanLokal = {
      id: `wisdom-${Date.now()}`,
      title: newTitle,
      region: newRegion,
      category: newCategory,
      description: newDescription,
      philosophies: philosophiesArr,
      bestPractices: bestPracticesArr
    };

    onAddWisdom(newEntry);
    setSuccessMsg('Kearifan Lokal Baru Berhasil Ditambahkan ke Pusat Data!');
    
    // Reset Form
    setNewTitle('');
    setNewRegion('');
    setNewDescription('');
    setNewPhilosophies('');
    setNewBestPractices('');

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // Stats calculation
  const totalCons = consultations.length;
  const pendingCons = consultations.filter((c) => c.status === 'pending').length;
  const answeredCons = totalCons - pendingCons;
  const totalWisdoms = wisdoms.length;

  return (
    <div className="space-y-6">

      {/* Admin Disclaimer and Stats Panel */}
      <div className="bg-stone-900 text-white rounded-2xl p-6 border border-stone-850 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-650 text-white rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="bg-red-800 text-red-200 text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                ADMIN PRIVILEGES ACTIVE
              </span>
              <h2 className="text-xl font-black font-sans mt-0.5">Control Panel Administrator</h2>
              <p className="text-xs text-stone-400">
                Lakukan pemoderasian kelayakan isi, reset state, dan optimasi bank data adat
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin menyetel ulang database simulasi ke kondisi bawaan?')) {
                onResetData();
              }
            }}
            className="bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer"
          >
            Reset Seluruh Database Simulasi
          </button>
        </div>

        {/* Admin KPI Ribbon Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-stone-800/80">
          <div className="bg-stone-800/40 rounded-xl p-3 border border-stone-800 text-center">
            <div className="text-stone-450 text-[10px] font-bold uppercase">Total Konsultasi</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{totalCons}</div>
          </div>
          <div className="bg-stone-800/40 rounded-xl p-3 border border-stone-800 text-center">
            <div className="text-stone-450 text-[10px] font-bold uppercase">Belum Dijawab (Pending)</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">{pendingCons}</div>
          </div>
          <div className="bg-stone-800/40 rounded-xl p-3 border border-stone-800 text-center">
            <div className="text-stone-450 text-[10px] font-bold uppercase">Sudah Dijawab</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">{answeredCons}</div>
          </div>
          <div className="bg-stone-800/40 rounded-xl p-3 border border-stone-800 text-center">
            <div className="text-stone-450 text-[10px] font-bold uppercase">Kearifan Lokal Adat</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{totalWisdoms}</div>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-emerald-100 gap-1.5">
        <button
          onClick={() => setActiveTab('consultations')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all ${
            activeTab === 'consultations'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          Moderasi Konsultasi ({totalCons})
        </button>
        <button
          onClick={() => setActiveTab('wisdoms')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all ${
            activeTab === 'wisdoms'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-50'
          }`}
        >
          Kelola Bank Kearifan Lokal ({totalWisdoms})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'consultations' && (
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-600" />
                Moderasi Konsultasi Masuk &amp; Jawaban Relawan
              </h3>
              <p className="text-xs text-emerald-700/80">
                Gunakan otorisasi di bawah untuk menghapus konsultasi masyarakat yang tidak layak atau menyimpang
              </p>
            </div>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full uppercase">
              HAPUS MENGHAPUS DIAKTIFKAN
            </span>
          </div>

          {consultations.length === 0 ? (
            <div className="text-center py-12 text-xs text-stone-500 font-medium">
              Tidak ada data konsultasi dalam sistem.
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {consultations.map((cons) => (
                <div
                  key={cons.id}
                  className="p-4 border border-stone-200/80 rounded-2xl hover:bg-stone-50/40 bg-white transition-all hover:border-red-200 flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-mono bg-stone-100 text-stone-800 px-2 py-0.5 rounded-md border border-stone-200/50">
                        ID: {cons.id}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          cons.status === 'answered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {cons.status === 'answered' ? 'Dijawab' : 'Tertunda'}
                      </span>
                      <span className="text-xs text-stone-600 font-medium">
                        Oleh: <strong>{cons.userName}</strong> @ {cons.location}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-emerald-950">{cons.title}</h4>
                    <p className="text-xs text-stone-700">{cons.question}</p>

                    {cons.status === 'answered' && cons.answer && (
                      <div className="bg-emerald-50 border border-emerald-100/50 p-3 rounded-xl space-y-1 my-2">
                        <div className="text-[10px] font-bold text-emerald-900">
                          Respon Relawan: {cons.answer.volunteerName} ({cons.answer.volunteerTitle})
                        </div>
                        <p className="text-xs text-emerald-950 whitespace-pre-wrap">{cons.answer.response}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex md:flex-col justify-end items-end gap-2 shrink-0">
                    <button
                      onClick={() => {
                        if (confirm(`Hapus konsultasi "${cons.title}"? Tindakan ini permanen.`)) {
                          onDeleteConsultation(cons.id);
                        }
                      }}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1 text-xs font-bold"
                    >
                      <Trash2 className="w-4 h-4" />
                      Hapus Konsultasi
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'wisdoms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Create New Wisdom Entry */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-4">
              <div className="border-b border-emerald-100 pb-2">
                <h3 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider flex items-center gap-1">
                  <Plus className="w-4 h-4 text-emerald-600" />
                  Tambah Kearifan Lokal Baru
                </h3>
                <p className="text-[10px] text-emerald-700 font-medium">
                  Publikasikan data arsitektur adat Nusantara untuk disimak warga
                </p>
              </div>

              {successMsg && (
                <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs rounded-lg p-2.5">
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmitWisdom} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-emerald-900 mb-0.5">Nama Kearifan / Suku</label>
                  <input
                    type="text"
                    required
                    placeholder="Cth: Tata Bangunan Kayu Omo Hada Nias"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-950 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-emerald-900 mb-0.5">Wilayah</label>
                    <input
                      type="text"
                      required
                      placeholder="Cth: Nias, Sumut"
                      value={newRegion}
                      onChange={(e) => setNewRegion(e.target.value)}
                      className="w-full text-xs px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-950 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-emerald-900 mb-0.5">Kategori</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full text-xs px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-950 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="Zonasi Adat">Zonasi Adat</option>
                      <option value="Harmoni Lingkungan">Harmoni Lingkungan</option>
                      <option value="Mitigasi Bencana">Mitigasi Bencana</option>
                      <option value="Konservasi Air">Konservasi Air</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-emerald-900 mb-0.5">Deskripsi Singkat</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tulis ringkasan mengenai sejarah dan makna sosial tata ruang tersebut..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full text-xs p-3 rounded-lg border border-emerald-200 text-emerald-950 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-emerald-900 mb-0.5">Filosofi Kosmologis (Satu per baris)</label>
                  <textarea
                    rows={2}
                    placeholder="Cth: Kekokohan tiang utama saling mengait (Tolo Mbozo)&#10;Rumah condong kedepan menghadap badai laut"
                    value={newPhilosophies}
                    onChange={(e) => setNewPhilosophies(e.target.value)}
                    className="w-full text-[11px] p-2 rounded-lg border border-emerald-200 text-emerald-950 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-emerald-900 mb-0.5">Best Practices Spasial (Satu per baris)</label>
                  <textarea
                    rows={2}
                    placeholder="Cth: Konstruksi tahan gempa tanpa paku logam&#10;Gunakan kayu besi pada pangkal pondasi ke tanah"
                    value={newBestPractices}
                    onChange={(e) => setNewBestPractices(e.target.value)}
                    className="w-full text-[11px] p-2 rounded-lg border border-emerald-200 text-emerald-950 outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl transition-all cursor-pointer"
                >
                  Publish Kearifan Lokal Baru
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: List and Delete Wisdom entries */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white border border-emerald-100 rounded-2xl p-5 space-y-4">
              <div className="border-b border-emerald-100 pb-2">
                <h3 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider flex items-center gap-1">
                  <Database className="w-4 h-4 text-emerald-600" />
                  Daftar Bank Data Aktif ({wisdoms.length})
                </h3>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {wisdoms.map((wis) => (
                  <div
                    key={wis.id}
                    className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-emerald-950">{wis.title}</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-mono px-1.5 py-0.2 rounded-md">
                          {wis.region}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5">{wis.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Hapus kearifan lokal "${wis.title}"? Tindakan ini berpengaruh pada referensi yang ada.`)) {
                          onDeleteWisdom(wis.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-all border border-red-200/50 shrink-0 cursor-pointer"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
