import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Share2,
  CalendarPlus,
  Sparkles,
  Check,
  Search,
  Eye,
  Download,
  X,
  FileImage
} from 'lucide-react';
import { ProgramActivity, ProgramFrequency } from '../types';

interface ProgramsSectionProps {
  programs: ProgramActivity[];
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ programs }) => {
  const [selectedFrequency, setSelectedFrequency] = useState<'all' | ProgramFrequency>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFlyerProgram, setActiveFlyerProgram] = useState<ProgramActivity | null>(null);

  const frequencies: { id: 'all' | ProgramFrequency; label: string; count: number }[] = [
    { id: 'all', label: 'All Activities', count: programs.length },
    { id: 'weekly', label: 'Weekly Programs', count: programs.filter((p) => p.frequency === 'weekly').length },
    { id: 'monthly', label: 'Monthly Programs', count: programs.filter((p) => p.frequency === 'monthly').length },
    { id: 'yearly', label: 'Yearly Programs', count: programs.filter((p) => p.frequency === 'yearly').length }
  ];

  const categories = ['all', 'Spiritual', 'Dawah', 'Welfare', 'Educational', 'Conference'];

  const filteredPrograms = programs.filter((p) => {
    const matchesFreq = selectedFrequency === 'all' || p.frequency === selectedFrequency;
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFreq && matchesCat && matchesSearch;
  });

  const handleShare = (p: ProgramActivity) => {
    const text = `*MCAN Osun State Program Update*\n📅 *${p.title}*\n⏰ ${p.schedulePattern}\n📍 ${p.venue}\n${p.description}\n\nJoin us at: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ title: p.title, text });
    } else {
      navigator.clipboard.writeText(text);
      setCopiedId(p.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const generateIcs = (p: ProgramActivity) => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MCAN Osun State//Programs//EN
BEGIN:VEVENT
SUMMARY:MCAN Osun: ${p.title}
DESCRIPTION:${p.description.replace(/\n/g, ' ')}
LOCATION:${p.venue}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `MCAN_Osun_${p.title.substring(0, 20).replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 rounded-2xl text-white p-6 sm:p-10 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-xs font-semibold text-amber-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Event & Da'wah Calendar</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            MCAN Osun Program Activities & Real-Time Schedule
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100 leading-relaxed">
            Stay updated in real time with our weekly spiritual sessions on WhatsApp, monthly Tadhkirah & Sisters Circle, and the flagship Annual State Islamic Convention across Osun State.
          </p>
        </div>

        {/* Official MCAN Emblem Seal */}
        <div className="shrink-0 relative hidden sm:flex items-center justify-center">
          <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-white p-1.5 shadow-2xl border-4 border-amber-400/90 flex items-center justify-center">
            <img
              src="/mcan-logo.png"
              alt="Official MCAN Emblem"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-4 sm:p-5 mb-8 space-y-4">
        {/* Frequency Tabs (Weekly, Monthly, Yearly) */}
        <div className="flex flex-wrap items-center gap-2">
          {frequencies.map((freq) => (
            <button
              key={freq.id}
              onClick={() => setSelectedFrequency(freq.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedFrequency === freq.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <span>{freq.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                  selectedFrequency === freq.id
                    ? 'bg-emerald-900 text-amber-300'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {freq.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <span className="text-xs text-gray-500 font-semibold mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-100 text-emerald-900 font-bold'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search program or venue..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
            />
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((p) => {
            const isWeekly = p.frequency === 'weekly';
            const isMonthly = p.frequency === 'monthly';
            const isYearly = p.frequency === 'yearly';

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                          isWeekly
                            ? 'bg-emerald-100 text-emerald-900'
                            : isMonthly
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-amber-100 text-amber-950 border border-amber-300/50'
                        }`}
                      >
                        {p.frequency} Activity
                      </span>
                      <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                        {p.category}
                      </span>
                    </div>

                    {p.isUpcoming && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                        Upcoming
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-2">
                    {p.title}
                  </h3>

                  {/* Flyer Banner if available (Dynamic for any program) */}
                  {p.flyerUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-amber-300/60 bg-gradient-to-r from-emerald-950 to-emerald-900 shadow-xs group relative">
                      <div className="flex flex-col sm:flex-row items-center gap-3 p-3">
                        <div
                          onClick={() => setActiveFlyerProgram(p)}
                          className="w-24 h-32 rounded-lg overflow-hidden shrink-0 border border-amber-400/80 shadow-md cursor-pointer relative group-hover:scale-102 transition-transform"
                        >
                          <img
                            src={p.flyerUrl}
                            alt={`${p.title} Official Flyer`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-5 h-5 text-white" />
                          </div>
                        </div>

                        <div className="flex-1 text-white">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400 text-emerald-950 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                            <FileImage className="w-3 h-3" />
                            Official Program Flyer
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                            {p.schedulePattern}
                          </h4>
                          <p className="text-[11px] text-emerald-200/90 mt-0.5 line-clamp-1">
                            📍 {p.venue}
                          </p>
                          <div className="mt-2.5 flex items-center gap-2">
                            <button
                              onClick={() => setActiveFlyerProgram(p)}
                              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Flyer</span>
                            </button>
                            <a
                              href={p.flyerUrl}
                              download={`MCAN_Osun_${p.title.replace(/\s+/g, '_')}_Flyer.jpg`}
                              className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Schedule Pattern */}
                  <div className="space-y-2 mb-4 text-xs sm:text-sm text-gray-700">
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="font-semibold text-emerald-950">{p.schedulePattern}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{p.venue}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Users className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-gray-600">Audience: {p.targetAudience}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 mb-4">
                    {p.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-xs">
                  <div className="text-gray-500 line-clamp-1 pr-2">
                    <span className="font-medium">Lead:</span> {p.coordinator}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {p.flyerUrl && (
                      <button
                        onClick={() => setActiveFlyerProgram(p)}
                        title="View Official Flyer"
                        className="px-2.5 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors font-bold inline-flex items-center gap-1"
                      >
                        <FileImage className="w-3.5 h-3.5 text-amber-700" />
                        <span>Flyer</span>
                      </button>
                    )}
                    <button
                      onClick={() => generateIcs(p)}
                      title="Add to Calendar (.ics)"
                      className="p-2 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:text-emerald-900 text-gray-600 transition-colors"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleShare(p)}
                      title="Share / Copy Info"
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:text-emerald-900 text-gray-600 transition-colors font-semibold"
                    >
                      {copiedId === p.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">No programs match your selection</h3>
          <p className="text-sm text-gray-500 mt-1">
            Try choosing a different frequency tab or clear your category filter.
          </p>
        </div>
      )}

      {/* Interactive Full Flyer Lightbox Modal (Dynamic for each program) */}
      {activeFlyerProgram && activeFlyerProgram.flyerUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setActiveFlyerProgram(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative my-6 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveFlyerProgram(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-4 w-full pr-8">
              <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 mb-1">
                Official {activeFlyerProgram.frequency} Program Poster
              </span>
              <h3 className="text-xl font-extrabold text-gray-900">
                {activeFlyerProgram.title}
              </h3>
              <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                {activeFlyerProgram.schedulePattern} • {activeFlyerProgram.venue}
              </p>
            </div>

            {/* Flyer Image Container */}
            <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden border border-gray-200 bg-emerald-950 flex items-center justify-center shadow-inner">
              <img
                src={activeFlyerProgram.flyerUrl}
                alt={`${activeFlyerProgram.title} Official Flyer`}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {/* Program Details Snippet */}
            <div className="mt-3 w-full bg-gray-50 rounded-xl p-3 border border-gray-200 text-xs text-gray-700 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Coordinator / Directorate:</span>
                <span className="text-emerald-900 font-semibold">{activeFlyerProgram.coordinator}</span>
              </div>
              <p className="text-gray-600 line-clamp-2 pt-1 border-t border-gray-200/60">
                {activeFlyerProgram.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-gray-100 w-full flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-500">
                <span>Save or share with corps members and branches across Osun State.</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeFlyerProgram.flyerUrl}
                  download={`MCAN_Osun_${activeFlyerProgram.title.replace(/\s+/g, '_')}_Flyer.jpg`}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Flyer</span>
                </a>
                <button
                  onClick={() => {
                    const text = `*MCAN Osun State Program - ${activeFlyerProgram.title}*\n📅 ${activeFlyerProgram.schedulePattern}\n📍 ${activeFlyerProgram.venue}\n${activeFlyerProgram.description}\n\nPortal: ${window.location.origin}`;
                    if (navigator.share) {
                      navigator.share({
                        title: `${activeFlyerProgram.title} Flyer`,
                        text,
                        url: window.location.origin
                      });
                    } else {
                      navigator.clipboard.writeText(text);
                      setCopiedId(activeFlyerProgram.id);
                      setTimeout(() => setCopiedId(null), 2500);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedId === activeFlyerProgram.id ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
