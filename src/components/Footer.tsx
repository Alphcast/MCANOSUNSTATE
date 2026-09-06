import React from 'react';
import { MapPin, Phone, Mail, Globe, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-emerald-950 text-emerald-100 text-xs border-t border-emerald-900/60">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/mcan-logo.png"
                alt="MCAN Official Logo"
                className="w-12 h-12 rounded-full object-contain bg-white p-0.5 border border-emerald-400/60 shrink-0 shadow-md"
              />
              <div>
                <span className="font-bold text-sm text-white block">MCAN Osun State</span>
                <span className="text-[11px] text-emerald-300">Muslim Corpers Association</span>
              </div>
            </div>
            <p className="text-emerald-200/80 leading-relaxed text-xs">
              Official chapter portal serving Muslim corps members across all 30 Local Government Areas of Osun State with verifiable digital IDs, weekly spiritual programs, and camp welfare.
            </p>
            <div className="text-[11px] font-serif text-amber-300">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-white tracking-wider uppercase mb-3">
              Portal Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('register')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Member Registration & ID Card
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('verify')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Verify Member Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('programs')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Weekly, Monthly & Yearly Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Resource Portal & Camp Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('donate')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Zakat & Sadaqah Accounts
                </button>
              </li>
            </ul>
          </div>

          {/* Chapter Secretariats */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-white tracking-wider uppercase mb-3">
              Chapter Locations
            </h4>
            <div className="space-y-3 text-emerald-200/90 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">State Central Secretariat:</strong>
                  Opposite Old Garage / Railway Corridor, P.O. Box 1284, Osogbo, Osun State.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Camp Da'wah Pavilion:</strong>
                  NYSC Permanent Orientation Camp, Ede, Osun State.
                </div>
              </div>
            </div>
          </div>

          {/* Executive Desks */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-white tracking-wider uppercase mb-3">
              Executive Helplines
            </h4>
            <div className="space-y-2 text-emerald-200/90 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>State Amir: +234 803 456 7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>State Amira: +234 814 987 6543</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>State Imam: +234 706 112 2334</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>secretariat@mcan.osun.ng</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>www.mcanosun.org.ng</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-emerald-900 bg-emerald-950/80 py-4 px-4 text-center text-[11px] text-emerald-300/70">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} Muslim Corpers Association of Nigeria (MCAN), Osun State Chapter. All Rights Reserved.
          </span>
          <span className="flex items-center gap-1">
            Motto: "In the name of Allah, Service to Humanity and the Nation"
          </span>
        </div>
      </div>
    </footer>
  );
};
