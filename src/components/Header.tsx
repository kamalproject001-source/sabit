import { UserRole } from '../types';
import { ShieldAlert, User, Users, Shield, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  currentUser: { name: string; email: string };
  onSwitchSimulatedUser: (userId: string) => void;
  activeUserId: string;
}

export default function Header({
  currentRole,
  onChangeRole,
  currentUser,
  onSwitchSimulatedUser,
  activeUserId
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-emerald-100 sticky top-0 z-40 shadow-xs">
      {/* Top Banner indicating research background */}
      <div className="bg-emerald-900 text-emerald-100 text-[11px] font-mono py-1 px-4 text-center tracking-wider flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>PROPOSAL PENELITIAN OPSI 2026 - SMA CENDEKIA BAZNAS BOGOR</span>
        <span className="hidden sm:inline">|</span>
        <span className="hidden sm:inline">PLATFORM KONSULTASI DIGITAL TATA RUANG NUSANTARA</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand Logo & Presentation */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-md shadow-emerald-200">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-emerald-950 font-sans">
                  tataruang<span className="text-emerald-600">.in</span>
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                  PROTOTIPE OPSI
                </span>
              </div>
              <p className="text-xs text-emerald-700/80 font-medium">
                Konsultasi Digital Berbasis Kearifan Tata Ruang Nusantara
              </p>
            </div>
          </div>

          {/* Dynamic Interactive Role/Persona Selection Area */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="text-xs text-right text-emerald-900 font-medium sm:block hidden">
              <div>Pilih Akun &amp; Role Simulasi:</div>
              <div className="text-[11px] text-emerald-600 font-mono">
                Aktif: {currentUser.name} ({currentRole.toUpperCase()})
              </div>
            </div>

            <div className="inline-flex rounded-xl bg-emerald-50 p-1 border border-emerald-100 shadow-inner">
              {/* Citizen/User Role */}
              <button
                id="role-user-selector"
                onClick={() => {
                  onChangeRole('user');
                  onSwitchSimulatedUser('user-kamal');
                }}
                className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  currentRole === 'user'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-emerald-800 hover:text-emerald-900 hover:bg-emerald-100/50'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Masyarakat (User)
              </button>

              {/* Volunteer (Relawan) Role */}
              <button
                id="role-relawan-selector"
                onClick={() => {
                  onChangeRole('relawan');
                  onSwitchSimulatedUser('vol-sabit');
                }}
                className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  currentRole === 'relawan'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-emerald-800 hover:text-emerald-900 hover:bg-emerald-100/50'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Relawan Ahli
              </button>

              {/* Admin Role */}
              <button
                id="role-admin-selector"
                onClick={() => {
                  onChangeRole('admin');
                  onSwitchSimulatedUser('admin-utama');
                }}
                className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  currentRole === 'admin'
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'text-emerald-800 hover:text-emerald-900 hover:bg-emerald-100/50'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Web
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
