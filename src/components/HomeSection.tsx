import React from 'react';
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
  CheckCircle2
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
  const weeklyPrograms = programs.filter((p) => p.frequency === 'weekly').slice(0, 2);
  const monthlyPrograms = programs.filter((p) => p.frequency === 'monthly').slice(0, 1);
  const yearlyPrograms = programs.filter((p) => p.frequency === 'yearly').slice(0, 1);

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
                  Real-time schedule of Sunday Usrah, Thursday Tahajjud, sisters halaqah, monthly medical CDS caravans, and the flagship Annual Osun State Islamic Conference (AOSIC).
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

        {/* Real-Time Program Spotlights (Weekly, Monthly, Yearly) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Featured Program Activities
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Weekly Usrah, Monthly Medical CDS, and Yearly State Conference.
              </p>
            </div>
            <button
              onClick={() => onNavigate('programs')}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              See All Activities →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Weekly Feature */}
            {weeklyPrograms[0] && (
              <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                    Weekly Gathering
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-2">
                    {weeklyPrograms[0].title}
                  </h3>
                  <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2 text-emerald-900 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{weeklyPrograms[0].schedulePattern}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{weeklyPrograms[0].venue}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 line-clamp-2">
                    {weeklyPrograms[0].description}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('programs')}
                  className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-emerald-800 hover:text-emerald-950 text-left"
                >
                  View Details & Directions →
                </button>
              </div>
            )}

            {/* Monthly Feature */}
            {monthlyPrograms[0] && (
              <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-900">
                    Monthly Outreach
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-2">
                    {monthlyPrograms[0].title}
                  </h3>
                  <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2 text-blue-950 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{monthlyPrograms[0].schedulePattern}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{monthlyPrograms[0].venue}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 line-clamp-2">
                    {monthlyPrograms[0].description}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('programs')}
                  className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-blue-800 hover:text-blue-950 text-left"
                >
                  View CDS Roster →
                </button>
              </div>
            )}

            {/* Yearly Feature */}
            {yearlyPrograms[0] && (
              <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-950">
                    Yearly Conference
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mt-2">
                    {yearlyPrograms[0].title}
                  </h3>
                  <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2 text-amber-950 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{yearlyPrograms[0].schedulePattern}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{yearlyPrograms[0].venue}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 line-clamp-2">
                    {yearlyPrograms[0].description}
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('programs')}
                  className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-amber-900 hover:text-amber-950 text-left"
                >
                  Annual Conference Info →
                </button>
              </div>
            )}
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
    </div>
  );
};
