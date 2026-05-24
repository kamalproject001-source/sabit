import { useState } from 'react';
import { KearifanLokal } from '../types';
import { Search, MapPin, Lightbulb, CheckCircle2, BookOpen, Layers } from 'lucide-react';

interface WisdomDatabaseProps {
  wisdoms: KearifanLokal[];
}

export default function WisdomDatabase({ wisdoms }: WisdomDatabaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Zonasi Adat', 'Harmoni Lingkungan', 'Mitigasi Bencana', 'Konservasi Air'];

  const filteredWisdoms = wisdoms.filter((w) => {
    const matchesSearch =
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || w.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Pusat Data Kearifan Lokal Nusantara
          </h2>
          <p className="text-xs text-emerald-700">
            Nilai adat leluhur sebagai basis perencanaan permukiman modern yang tangguh bencana
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-600/60" />
        <input
          type="text"
          placeholder="Cari adat (cth: Baduy, Flores, zonasi, lereng, air, batu)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-200 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm placeholder:text-emerald-700/40 text-emerald-950 transition-all"
        />
      </div>

      {/* Grid of wisdom items */}
      {filteredWisdoms.length === 0 ? (
        <div className="text-center py-12 bg-emerald-50/40 rounded-xl border border-dashed border-emerald-200">
          <Layers className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-emerald-800">Kearifan lokal tidak ditemukan</p>
          <p className="text-xs text-emerald-600/75 mt-0.5">Coba dengan kata kunci pencarian yang lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredWisdoms.map((wisdom) => (
            <div
              key={wisdom.id}
              className="bg-white hover:bg-emerald-50/20 border border-emerald-100/80 rounded-2xl p-5 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mb-1">
                      {wisdom.category}
                    </span>
                    <h3 className="text-base font-bold text-emerald-950">{wisdom.title}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-medium border border-emerald-100/50">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {wisdom.region}
                  </div>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed mb-4">
                  {wisdom.description}
                </p>

                {/* Philosophies */}
                <div className="mb-4 bg-emerald-50/50 rounded-xl p-3 border border-emerald-100/50">
                  <h4 className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500 shrink-0" />
                    Filosofi Kosmologi Adat
                  </h4>
                  <ul className="space-y-1">
                    {wisdom.philosophies.map((phil, idx) => (
                      <li key={idx} className="text-xs text-emerald-950/90 leading-normal pl-2.5 relative">
                        <span className="absolute left-0 top-1 text-emerald-600">•</span>
                        <em className="font-serif">"{phil}"</em>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best Practices */}
                <div>
                  <h4 className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    Rekomendasi / Best Practices Spasial
                  </h4>
                  <ul className="space-y-1.5">
                    {wisdom.bestPractices.map((practice, idx) => (
                      <li key={idx} className="text-xs text-stone-700 leading-normal pl-3 relative flex items-start gap-1">
                        <span className="text-emerald-500 font-bold select-none text-[10px] mt-0.5">✓</span>
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decorative Accent Footer */}
              <div className="border-t border-emerald-100/50 mt-4 pt-3 flex items-center justify-between text-[10px] text-emerald-600 font-mono">
                <span>REKOMENDASI AKTIF</span>
                <span>ID: {wisdom.id}</span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
