import React, { useState } from 'react';
import {
  IdCard,
  Calendar,
  HeartHandshake,
  BookOpen,
  ShieldCheck,
  Menu,
  X,
  Compass,
  Bell
} from 'lucide-react';
import { Announcement } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  announcements: Announcement[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  announcements
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pinnedAnnouncement = announcements.find((a) => a.pinned) || announcements[0];

  const navItems = [
    { id: 'home', label: 'Overview', icon: Compass },
    { id: 'register', label: 'Register & ID Card', icon: IdCard },
    { id: 'verify', label: 'Verify Member', icon: ShieldCheck },
    { id: 'programs', label: 'Programs & Schedule', icon: Calendar },
    { id: 'resources', label: 'Resource Portal', icon: BookOpen },
    { id: 'donate', label: 'Zakat & Donation', icon: HeartHandshake }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-emerald-950/10 shadow-xs">
      {/* Top Banner: Islamic Motto & Announcements Ticker */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-serif text-amber-300">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
            <span className="hidden md:inline text-emerald-300">|</span>
            <span className="hidden md:inline">Motto: In the Name of Allah, Service to Humanity and the Nation</span>
          </div>
          {pinnedAnnouncement && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-200 truncate max-w-md">
              <Bell className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-semibold text-amber-200 shrink-0">Latest:</span>
              <span className="truncate">{pinnedAnnouncement.title}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Chapter Brand */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left focus:outline-hidden group shrink-0"
          >
            {/* Crest / Emblem */}
            <div className="relative shrink-0">
              <img
                src="/mcan-logo.png"
                alt="MCAN Official Logo"
                className="w-12 h-12 rounded-full object-contain bg-white p-0.5 shadow-sm border border-emerald-700/50 group-hover:scale-105 transition-transform shrink-0"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg font-bold text-emerald-950 tracking-tight leading-tight group-hover:text-emerald-800 transition-colors whitespace-nowrap">
                MCAN Osun State
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-850 rounded-full whitespace-nowrap">
                  Muslim Corpers Association
                </span>
                <span className="text-[11px] text-gray-500 hidden md:inline whitespace-nowrap">
                  • Secretariat, Osogbo
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-gray-700 hover:text-emerald-900 hover:bg-emerald-50/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile menu trigger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-emerald-50 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-900" /> : <Menu className="w-6 h-6 text-emerald-900" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-900'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
