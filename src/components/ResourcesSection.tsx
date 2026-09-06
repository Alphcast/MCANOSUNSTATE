import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  FileText,
  Download,
  CheckCircle,
  ExternalLink,
  Search,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';
import { PORTAL_RESOURCES } from '../data/constants';
import { ResourceItem } from '../types';

export const ResourcesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(PORTAL_RESOURCES[0].id);

  const categories = ['all', 'Camp Guide', 'Prayer Timetable', 'Spiritual & Dua', 'MCAN Constitution', 'Lodge Directory'];

  const filtered = PORTAL_RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === 'all' || res.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-2xl text-white p-6 sm:p-10 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-xs font-semibold text-amber-300 mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Islamic & NYSC Knowledge Base</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            MCAN Osun State Resource Portal
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100 leading-relaxed">
            Essential survival manuals for Ede NYSC Orientation Camp, accurate prayer & sahur timetables for Osun towns, prophetic adhkar booklets, MCAN constitution, and lodge accommodation contacts.
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

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-2 rounded-xl font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides or lodge info..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
          />
        </div>
      </div>

      {/* Resources Accordion List */}
      <div className="space-y-4 mb-12">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs overflow-hidden transition-all hover:border-emerald-800/30"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-hidden"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                      {item.category}
                    </span>
                    {item.readTime && (
                      <span className="text-xs text-gray-400 font-medium">
                        • {item.readTime}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-1">
                    {item.description}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-gray-50 text-gray-500 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Accordion Details */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 pt-1 border-t border-gray-100 bg-emerald-50/20">
                  <div className="mt-3 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                      Key Highlights & Operational Details:
                    </h4>
                    {item.details && item.details.length > 0 && (
                      <ul className="space-y-2 text-sm text-gray-700">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-gray-100">
                            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Camp Helpline Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-2xl text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Phone className="w-4 h-4" />
            <span>Orientation Camp Da'wah Desk</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Heading to NYSC Permanent Camp in Ede, Osun State?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
            Our Camp Da'wah Committee (CDC) provides safe luggage drop-off, ablution provisions, halal food guidance, and immediate post-camp accommodation support.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <a
            href="tel:+2348034567890"
            className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-amber-400 text-emerald-950 font-bold text-xs sm:text-sm hover:bg-amber-300 transition-colors shadow-xs"
          >
            Call Camp Amir (+234 803 456 7890)
          </a>
        </div>
      </div>
    </div>
  );
};
