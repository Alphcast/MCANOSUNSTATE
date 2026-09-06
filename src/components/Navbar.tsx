import React, { useState } from 'react';
import {
  IdCard,
  Calendar,
  HeartHandshake,
  BookOpen,
  ShieldCheck,
  LayoutDashboard,
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
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  announcements,
  onOpenAdmin,
  isAdminLoggedIn
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
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium tracking-wide text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
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
            className="flex items-center gap-3.5 text-left focus:outline-hidden group"
          >
            {/* Crest / Emblem */}
            <div className="relative shrink-0">
              <img
                src="/mcan-logo.png"
                alt="MCAN Official Logo"
                className="w-13 h-13 rounded-full object-contain bg-white p-0.5 shadow-md border-2 border-emerald-700/60 group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-emerald-950 tracking-tight leading-tight group-hover:text-emerald-800 transition-colors">
                  Muslim Corpers Association of Nigeria
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  Osun State Chapter
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">
                  State Secretariat, Osogbo
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'text-gray-700 hover:text-emerald-900 hover:bg-emerald-50/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Admin Dashboard button */}
            <button
              onClick={onOpenAdmin}
              className={`ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                  : isAdminLoggedIn
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                  : 'text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-900 bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-800" />
              <span>{isAdminLoggedIn ? 'Admin Active' : 'Admin Portal'}</span>
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              title="Admin Portal"
            >
              <LayoutDashboard className="w-5 h-5 text-emerald-800" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-emerald-50 focus:outline-hidden"
              aria-label="Toggle menu"
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
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-emerald-700'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-800 hover:bg-emerald-100 hover:text-emerald-900"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-700" />
              <span>{isAdminLoggedIn ? 'Open Admin Dashboard' : 'Admin Login / Portal'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
