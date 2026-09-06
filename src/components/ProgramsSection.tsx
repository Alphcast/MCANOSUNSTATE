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
  Search
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

  const frequencies: { id: 'all' | ProgramFrequency; label: string; count: number }[] = [
    { id: 'all', label: 'All Activities', count: programs.length },
    { id: 'weekly', label: 'Weekly Programs', count: programs.filter((p) => p.frequency === 'weekly').length },
    { id: 'monthly', label: 'Monthly Programs', count: programs.filter((p) => p.frequency === 'monthly').length },
    { id: 'yearly', label: 'Yearly Programs', count: programs.filter((p) => p.frequency === 'yearly').length }
  ];

  const categories = ['all', 'Spiritual', 'Dawah', 'Welfare', 'Educational', 'Conference', 'Camp'];

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
            Stay updated in real time with our weekly spiritual gatherings, monthly executive & CDS community outreaches, and flagship yearly state conferences across Osun State.
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
                  <div className="text-gray-500">
                    <span className="font-medium">Lead:</span> {p.coordinator}
                  </div>

                  <div className="flex items-center gap-1.5">
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
    </div>
  );
};
