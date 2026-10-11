import React, { useState } from 'react';
import {
  IdCard,
  ShieldCheck,
  Calendar,
  HeartHandshake,
  BookOpen,
  ArrowRight,
  Bell,
  MapPin,
  Clock,
  Sparkles,
  Users,
  Award,
  CheckCircle2,
  Phone,
  MessageSquare,
  FileImage,
  Eye,
  Download,
  X,
  Mail
} from 'lucide-react';
import { Announcement, ProgramActivity } from '../types';

interface HomeSectionProps {
  onNavigate: (tab: string) => void;
  announcements: Announcement[];
  programs: ProgramActivity[];
  totalMembers: number;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigate,
  announcements,
  programs,
  totalMembers
}) => {
  const [activeFlyer, setActiveFlyer] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  const fiqhProgram = programs.find((p) => p.title.toLowerCase().includes('fiqh') || p.id === 'prog-w-02') || programs.find((p) => p.frequency === 'weekly');
  const tadhkirahProgram = programs.find((p) => p.title.toLowerCase().includes('tadhkirah') || p.id === 'prog-m-02');
  const sistersProgram = programs.find((p) => p.title.toLowerCase().includes('sister') || p.id === 'prog-m-03');
  const conventionProgram = programs.find((p) => p.frequency === 'yearly' || p.title.toLowerCase().includes('convention'));

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto">
          {/* Islamic Greeting & Logo */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8">
            {/* Official MCAN Logo */}
            <div className="relative mb-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-2xl border-4 border-amber-400/90 flex items-center justify-center">
                <img
                  src="/mcan-logo.png"
                  alt="Muslim Corpers Association of Nigeria Official Emblem"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-xs font-semibold text-amber-300 mb-5 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-serif text-sm">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
              <span>•</span>
              <span>Official Chapter Portal</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
              Muslim Corpers Association of Nigeria
            </h1>
            <span className="mt-2 text-xl sm:text-2xl font-bold text-amber-300 font-serif tracking-wider">
              Osun State Chapter
            </span>

            <p className="mt-4 text-sm sm:text-lg text-emerald-100 max-w-2xl leading-relaxed">
              Fostering Islamic brotherhood, spiritual excellence, and national service across the 30 Local Government Areas of Osun State.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={() => onNavigate('register')}
                className="px-6 py-3.5 rounded-xl bg-amber-400 text-emerald-950 font-extrabold text-sm sm:text-base hover:bg-amber-300 transition-all shadow-md active:scale-98 flex items-center gap-2"
              >
                <IdCard className="w-5 h-5 text-emerald-950" />
                <span>Register & Generate ID Card</span>
              </button>

              <button
                onClick={() => onNavigate('verify')}
                className="px-6 py-3.5 rounded-xl bg-emerald-800/90 text-white border border-emerald-600/60 font-bold text-sm sm:text-base hover:bg-emerald-700 transition-all shadow-sm active:scale-98 flex items-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-300" />
                <span>Verify Member Status</span>
              </button>

              <button
                onClick={() => onNavigate('donate')}
                className="px-5 py-3.5 rounded-xl bg-white/10 text-amber-200 border border-white/20 font-semibold text-sm hover:bg-white/20 transition-all"
              >
                <HeartHandshake className="w-4 h-4 inline mr-1.5" />
                <span>Zakat & Donation</span>
              </button>
            </div>
          </div>

          {/* Highlights Ribbon: Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 border-t border-emerald-800/50">
            <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-xl p-3.5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                {totalMembers}+
              </div>
              <div className="text-xs text-emerald-200 font-medium mt-0.5">
                Registered Corps Members
              </div>
            </div>

            <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-xl p-3.5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                30 LGAs
              </div>
              <div className="text-xs text-emerald-200 font-medium mt-0.5">
                Statewide Osun Coverage
              </div>
            </div>

            <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-xl p-3.5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                CR80
              </div>
              <div className="text-xs text-emerald-200 font-medium mt-0.5">
                Front & Back Printable ID
              </div>
            </div>

            <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-xl p-3.5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                24/7
              </div>
              <div className="text-xs text-emerald-200 font-medium mt-0.5">
                Live QR Verification
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Core Pillars Feature Grid */}
        <section>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Comprehensive Services for Muslim Corpers in Osun
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
              Everything you need for an inspiring, spiritually fulfilling, and seamless NYSC service year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: ID Card Generator */}
            <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <IdCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                  Instant Member ID Card
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Register in seconds with your state code (OS/26C/XXXX), upload your passport photo, and immediately generate your official Front & Back ID card with instant PDF, PNG, or JPG download.
                </p>
              </div>
              <button
                onClick={() => onNavigate('register')}
                className="mt-5 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Generate Your ID Card</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Real-time Verification */}
            <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                  Secure Verification Database
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Every card features an encrypted QR code linking to our secure verification database. Camp wardens, lodge coordinators, and employers can authenticate corps member status in real time.
                </p>
              </div>
              <button
                onClick={() => onNavigate('verify')}
                className="mt-5 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Verify a Member Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Programs & Real-time Schedules */}
            <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                  Weekly, Monthly & Yearly Programs
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Real-time schedule of Weekly WhatsApp Fiqh, Hadith & Tawheed sessions, Monthly Tadhkirah, Monthly Sisters Circle at Ode Oga Masjid, and the flagship MCAN Osun State Annual Convention (31st Oct – 1st Nov).
                </p>
              </div>
              <button
                onClick={() => onNavigate('programs')}
                className="mt-5 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                <span>View Full Program Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Real-time Announcements Bulletin */}
        <section className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-emerald-800" />
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  Real-Time Announcements & Chapter Updates
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Official broadcasts from the State Executive Council in Osogbo.
              </p>
            </div>

            <button
              onClick={() => onNavigate('programs')}
              className="text-xs font-bold text-emerald-800 hover:underline shrink-0"
            >
              View Program Schedule →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.slice(0, 4).map((anc) => (
              <div
                key={anc.id}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50/70 hover:bg-emerald-50/40 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-900">
                    {anc.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">
                    {new Date(anc.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{anc.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {anc.content}
                </p>
                <div className="mt-3 pt-2 border-t border-gray-200/60 text-[11px] text-gray-400">
                  Broadcast by: <strong className="text-gray-600">{anc.author}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real-Time Program Spotlights (Weekly, Monthly Tadhkirah, Sisters Circle, Yearly Convention) */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Featured Program Activities
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Weekly Fiqh/Hadith Halaqah, Monthly Tadhkirah, Sisters Circle at Ode Oga Masjid, and Yearly State Convention.
              </p>
            </div>
            <button
              onClick={() => onNavigate('programs')}
              className="text-xs font-bold text-emerald-800 hover:underline shrink-0"
            >
              See All Activities & Schedules →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Weekly Fiqh, Hadith & Tawheed */}
            {fiqhProgram && (
              <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                      Weekly Gathering
                    </span>
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Every Weekend
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mt-1 line-clamp-1">
                    {fiqhProgram.title}
                  </h3>

                  {/* Flyer Banner */}
                  {fiqhProgram.flyerUrl && (
                    <div
                      onClick={() =>
                        setActiveFlyer({
                          url: fiqhProgram.flyerUrl!,
                          title: fiqhProgram.title,
                          subtitle: 'Weekly on WhatsApp'
                        })
                      }
                      className="mt-3 cursor-pointer rounded-xl overflow-hidden border border-emerald-300/80 bg-emerald-950 p-2 flex items-center gap-2.5 hover:bg-emerald-900 transition-colors group"
                    >
                      <img
                        src={fiqhProgram.flyerUrl}
                        alt="Fiqh Halaqah Flyer"
                        className="w-12 h-16 object-cover rounded-md border border-amber-400 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-amber-300 block">
                          Official Flyer
                        </span>
                        <span className="text-xs font-semibold text-white block truncate">
                          Weekly Halaqah
                        </span>
                        <span className="text-[11px] text-emerald-200 underline flex items-center gap-1 mt-0.5">
                          <Eye className="w-3 h-3" />
                          <span>View Flyer</span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{fiqhProgram.schedulePattern}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{fiqhProgram.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-2.5 line-clamp-2">
                    {fiqhProgram.description}
                  </p>

                  {/* Program Contacts & Weekend info */}
                  <div className="mt-2.5 p-2 bg-emerald-50/70 border border-emerald-200 rounded-lg text-[11px] text-emerald-950 space-y-1">
                    <div className="font-bold text-emerald-900 flex items-center justify-between">
                      <span>Weekend Knowledge Circle:</span>
                      <span className="font-mono text-[10px] bg-emerald-200/80 px-1 rounded">Sat & Sun 8PM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ameer:</span>
                      <a href="tel:09056498489" className="font-mono font-bold text-emerald-800 hover:underline">
                        09056498489
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>General Secretary:</span>
                      <a href="tel:07039101391" className="font-mono font-bold text-emerald-800 hover:underline">
                        07039101391
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onNavigate('programs')}
                    className="font-bold text-emerald-800 hover:text-emerald-950 text-left"
                  >
                    View Details →
                  </button>
                  {fiqhProgram.flyerUrl && (
                    <button
                      onClick={() =>
                        setActiveFlyer({
                          url: fiqhProgram.flyerUrl!,
                          title: fiqhProgram.title,
                          subtitle: 'Weekly on WhatsApp'
                        })
                      }
                      className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-900 font-semibold hover:bg-emerald-100 transition-colors text-[11px] flex items-center gap-1"
                    >
                      <FileImage className="w-3 h-3 text-emerald-700" />
                      <span>Flyer</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 2. Monthly Tadhkirah */}
            {tadhkirahProgram && (
              <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-900">
                      Monthly Outreach
                    </span>
                    <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      Last Sunday
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mt-1 line-clamp-1">
                    {tadhkirahProgram.title}
                  </h3>

                  {/* Flyer Banner */}
                  {tadhkirahProgram.flyerUrl && (
                    <div
                      onClick={() =>
                        setActiveFlyer({
                          url: tadhkirahProgram.flyerUrl!,
                          title: tadhkirahProgram.title,
                          subtitle: 'Last Sunday of the Month'
                        })
                      }
                      className="mt-3 cursor-pointer rounded-xl overflow-hidden border border-blue-300/80 bg-emerald-950 p-2 flex items-center gap-2.5 hover:bg-emerald-900 transition-colors group"
                    >
                      <img
                        src={tadhkirahProgram.flyerUrl}
                        alt="Tadhkirah Flyer"
                        className="w-12 h-16 object-cover rounded-md border border-amber-400 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-amber-300 block">
                          Official Flyer
                        </span>
                        <span className="text-xs font-semibold text-white block truncate">
                          Monthly Tadhkirah
                        </span>
                        <span className="text-[11px] text-emerald-200 underline flex items-center gap-1 mt-0.5">
                          <Eye className="w-3 h-3" />
                          <span>View Flyer</span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-2 text-blue-950 font-semibold">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{tadhkirahProgram.schedulePattern}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{tadhkirahProgram.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-2.5 line-clamp-2">
                    {tadhkirahProgram.description}
                  </p>

                  {/* Program Contacts */}
                  <div className="mt-2.5 p-2 bg-blue-50/70 border border-blue-200 rounded-lg text-[11px] text-blue-950 space-y-1">
                    <div className="font-bold text-blue-900 flex items-center justify-between">
                      <span>Monthly Enquiries:</span>
                      <span className="font-mono text-[10px] bg-blue-200/80 px-1 rounded">Last Sunday</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ameer:</span>
                      <a href="tel:09056498489" className="font-mono font-bold text-blue-800 hover:underline">
                        09056498489
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>General Secretary:</span>
                      <a href="tel:07039101391" className="font-mono font-bold text-blue-800 hover:underline">
                        07039101391
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onNavigate('programs')}
                    className="font-bold text-blue-800 hover:text-blue-950 text-left"
                  >
                    View Details →
                  </button>
                  {tadhkirahProgram.flyerUrl && (
                    <button
                      onClick={() =>
                        setActiveFlyer({
                          url: tadhkirahProgram.flyerUrl!,
                          title: tadhkirahProgram.title,
                          subtitle: 'Last Sunday of the Month'
                        })
                      }
                      className="px-2 py-1 rounded-md bg-blue-50 text-blue-900 font-semibold hover:bg-blue-100 transition-colors text-[11px] flex items-center gap-1"
                    >
                      <FileImage className="w-3 h-3 text-blue-700" />
                      <span>Flyer</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 3. Monthly Sisters Circle */}
            {sistersProgram && (
              <div className="bg-white rounded-2xl border border-purple-200/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                      Sisters Circle
                    </span>
                    <span className="text-[10px] font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                      First Sunday
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mt-1 line-clamp-1">
                    {sistersProgram.title}
                  </h3>

                  {/* Flyer Banner */}
                  {sistersProgram.flyerUrl && (
                    <div
                      onClick={() =>
                        setActiveFlyer({
                          url: sistersProgram.flyerUrl!,
                          title: sistersProgram.title,
                          subtitle: 'First Sunday of the Month • Ode Oga Masjid'
                        })
                      }
                      className="mt-3 cursor-pointer rounded-xl overflow-hidden border border-purple-300/80 bg-emerald-950 p-2 flex items-center gap-2.5 hover:bg-emerald-900 transition-colors group"
                    >
                      <img
                        src={sistersProgram.flyerUrl}
                        alt="Sisters Circle Flyer"
                        className="w-12 h-16 object-cover rounded-md border border-amber-400 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-amber-300 block">
                          Official Flyer
                        </span>
                        <span className="text-xs font-semibold text-white block truncate">
                          Ode Oga Masjid
                        </span>
                        <span className="text-[11px] text-emerald-200 underline flex items-center gap-1 mt-0.5">
                          <Eye className="w-3 h-3" />
                          <span>View Flyer</span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-2 text-purple-950 font-semibold">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{sistersProgram.schedulePattern}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-900 font-medium">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-purple-600" />
                      <span className="truncate">{sistersProgram.venue}</span>
                    </div>
                  </div>

                  {/* Highlighted Enquiries / Sponsorship Contacts */}
                  <div className="mt-2.5 p-2 bg-purple-50/70 border border-purple-200 rounded-lg text-[11px] text-purple-950 space-y-1">
                    <div className="font-bold text-purple-900">Enquiries & Sponsorship:</div>
                    <div className="flex items-center justify-between">
                      <span>Ameerah:</span>
                      <a href="tel:09039454686" className="font-mono font-bold text-purple-800 hover:underline">
                        09039454686
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Naibatul Ameerah:</span>
                      <a href="tel:07067340931" className="font-mono font-bold text-purple-800 hover:underline">
                        07067340931
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onNavigate('programs')}
                    className="font-bold text-purple-900 hover:text-purple-950 text-left"
                  >
                    Details & Venue →
                  </button>
                  {sistersProgram.flyerUrl && (
                    <button
                      onClick={() =>
                        setActiveFlyer({
                          url: sistersProgram.flyerUrl!,
                          title: sistersProgram.title,
                          subtitle: 'First Sunday of the Month • Ode Oga Masjid'
                        })
                      }
                      className="px-2 py-1 rounded-md bg-purple-100 text-purple-900 font-semibold hover:bg-purple-200 transition-colors text-[11px] flex items-center gap-1"
                    >
                      <FileImage className="w-3 h-3 text-purple-700" />
                      <span>Flyer</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* 4. Yearly Convention */}
            {conventionProgram && (
              <div className="bg-white rounded-2xl border border-amber-300/80 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-950">
                      Yearly Convention
                    </span>
                    <span className="text-[10px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                      31 Oct – 1 Nov
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mt-1 line-clamp-1">
                    {conventionProgram.title}
                  </h3>

                  {/* Flyer Banner */}
                  {conventionProgram.flyerUrl && (
                    <div
                      onClick={() =>
                        setActiveFlyer({
                          url: conventionProgram.flyerUrl!,
                          title: conventionProgram.title,
                          subtitle: 'Upcoming 31st October – 1st November Biidhnillah'
                        })
                      }
                      className="mt-3 cursor-pointer rounded-xl overflow-hidden border border-amber-400 bg-emerald-950 p-2 flex items-center gap-2.5 hover:bg-emerald-900 transition-colors group"
                    >
                      <img
                        src={conventionProgram.flyerUrl}
                        alt="Convention Flyer"
                        className="w-12 h-16 object-cover rounded-md border border-amber-400 shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-amber-300 block">
                          Official Flyer
                        </span>
                        <span className="text-xs font-semibold text-white block truncate">
                          State Convention
                        </span>
                        <span className="text-[11px] text-emerald-200 underline flex items-center gap-1 mt-0.5">
                          <Eye className="w-3 h-3" />
                          <span>View Flyer</span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-2 text-amber-950 font-semibold">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{conventionProgram.schedulePattern}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{conventionProgram.venue}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mt-2.5 line-clamp-2">
                    {conventionProgram.description}
                  </p>

                  {/* Program Contacts */}
                  <div className="mt-2.5 p-2 bg-amber-50/70 border border-amber-200 rounded-lg text-[11px] text-amber-950 space-y-1">
                    <div className="font-bold text-amber-900 flex items-center justify-between">
                      <span>Convention Secretariat:</span>
                      <span className="font-mono text-[10px] bg-amber-200/80 px-1 rounded">31 Oct – 1 Nov</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>General Secretary:</span>
                      <a href="tel:07039101391" className="font-mono font-bold text-amber-900 hover:underline">
                        07039101391
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ameer:</span>
                      <a href="tel:09056498489" className="font-mono font-bold text-amber-900 hover:underline">
                        09056498489
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onNavigate('programs')}
                    className="font-bold text-amber-900 hover:text-amber-950 text-left"
                  >
                    Convention Details →
                  </button>
                  {conventionProgram.flyerUrl && (
                    <button
                      onClick={() =>
                        setActiveFlyer({
                          url: conventionProgram.flyerUrl!,
                          title: conventionProgram.title,
                          subtitle: 'Upcoming 31st October – 1st November Biidhnillah'
                        })
                      }
                      className="px-2 py-1 rounded-md bg-amber-100 text-amber-950 font-semibold hover:bg-amber-200 transition-colors text-[11px] flex items-center gap-1"
                    >
                      <FileImage className="w-3 h-3 text-amber-800" />
                      <span>Flyer</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Executive Leadership & Advisory Board Helpline Section */}
        <section className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-800" />
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  State Leadership & Helpline Directory
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Reach out directly to executive officers, Staff Advisors (LGIs), Patrons, and Matron for assistance.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Officials</span>
              </button>
              <button
                onClick={() => onNavigate('contacts')}
                className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>Full Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Ameer */}
            <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 px-2 py-0.5 rounded-md bg-emerald-100 inline-block mb-2">
                  Ameer (President)
                </span>
                <h3 className="font-bold text-gray-900 text-sm">Brother Luqman Waliyullah Olamide</h3>
                <p className="text-xs text-emerald-800 font-mono font-bold mt-1">09056498489</p>
                <p className="text-[11px] text-gray-500 mt-1">Overall Chapter Leadership & Direction</p>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-emerald-100">
                <a
                  href="tel:09056498489"
                  className="flex-1 text-center py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
                >
                  Call
                </a>
                <a
                  href="https://wa.me/2349056498489"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Ameerah */}
            <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 px-2 py-0.5 rounded-md bg-emerald-100 inline-block mb-2">
                  Ameerah (Sisters)
                </span>
                <h3 className="font-bold text-gray-900 text-sm">Sister Kofoworola Bilqees</h3>
                <p className="text-xs text-emerald-800 font-mono font-bold mt-1">09039454686</p>
                <p className="text-[11px] text-gray-500 mt-1">Sisters Welfare & Monthly Sisters Circle</p>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-emerald-100">
                <a
                  href="tel:09039454686"
                  className="flex-1 text-center py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
                >
                  Call
                </a>
                <a
                  href="https://wa.me/2349039454686"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* General Secretary */}
            <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 px-2 py-0.5 rounded-md bg-emerald-100 inline-block mb-2">
                  General Secretary
                </span>
                <h3 className="font-bold text-gray-900 text-sm">Brother Abdulsalam Ayinla Abdullah</h3>
                <p className="text-xs text-emerald-800 font-mono font-bold mt-1">07039101391</p>
                <p className="text-[11px] text-gray-500 mt-1">Secretariat Administration & Annual Convention</p>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-emerald-100">
                <a
                  href="tel:07039101391"
                  className="flex-1 text-center py-1.5 rounded-lg bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
                >
                  Call
                </a>
                <a
                  href="https://wa.me/2347039101391"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 text-center py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Quick Staff Advisor / Patrons mention */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-600 gap-2">
            <span>
              Also featuring Staff Advisors (Mr. Suleiman K.A, Mr. Kusamato Olakunle, Mr. Salih Bolaji), Patrons, and Matron (Mrs. Jimoh Tawakalitu).
            </span>
            <button
              onClick={() => onNavigate('contacts')}
              className="text-emerald-800 font-bold hover:underline"
            >
              Open Full Contact Roster →
            </button>
          </div>
        </section>

        {/* Zakat & Charity Callout Card */}
        <section className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-2xl text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-emerald-700/40">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Noble Quran [2:261]
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              "The example of those who spend in the way of Allah is like a seed growing seven spikes..."
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100">
              Support our official Zakat & Sadaqah account, Mosque development, and NYSC Ede Camp Da'wah feeding.
            </p>
          </div>

          <button
            onClick={() => onNavigate('donate')}
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-amber-400 text-emerald-950 font-extrabold text-sm hover:bg-amber-300 transition-all shadow-sm shrink-0"
          >
            View Zakat Accounts & Donate
          </button>
        </section>
      </div>

      {/* Interactive Full Flyer Lightbox Modal on Home Page */}
      {activeFlyer && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveFlyer(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative my-6 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveFlyer(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-4 w-full pr-8">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 mb-1">
                Official Program Poster
              </span>
              <h3 className="text-xl font-extrabold text-gray-900">
                {activeFlyer.title}
              </h3>
              {activeFlyer.subtitle && (
                <p className="text-xs text-gray-500">{activeFlyer.subtitle}</p>
              )}
            </div>

            {/* Flyer Image Container */}
            <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden border border-gray-200 bg-emerald-950 flex items-center justify-center shadow-inner">
              <img
                src={activeFlyer.url}
                alt={activeFlyer.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-gray-100 w-full flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-500">
                <span>Muslim Corpers Association of Nigeria (MCAN) Osun State Chapter</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeFlyer.url}
                  download={`MCAN_Osun_${activeFlyer.title.replace(/\s+/g, '_')}_Flyer.jpg`}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Flyer</span>
                </a>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: activeFlyer.title,
                        text: `${activeFlyer.title} - MCAN Osun State Chapter`,
                        url: window.location.origin
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.origin);
                      alert('Portal link copied to clipboard!');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
