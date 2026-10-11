import React, { useState } from 'react';
import {
  Users,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Shield,
  Award,
  Sparkles,
  Search,
  Building,
  UserCheck,
  HeartHandshake,
  Mail
} from 'lucide-react';
import { LEADERSHIP_CONTACTS } from '../data/constants';
import { LeadershipContact } from '../types';

interface LeadershipSectionProps {
  onNavigate?: (tab: string) => void;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Contacts', count: LEADERSHIP_CONTACTS.length },
    { id: 'Executive', label: 'Executive Leadership', count: LEADERSHIP_CONTACTS.filter((c) => c.category === 'Executive').length },
    { id: 'Staff Advisor', label: 'Staff Advisors (NYSC LGIs)', count: LEADERSHIP_CONTACTS.filter((c) => c.category === 'Staff Advisor').length },
    { id: 'Patron', label: 'Patrons', count: LEADERSHIP_CONTACTS.filter((c) => c.category === 'Patron').length },
    { id: 'Matron', label: 'Matron', count: LEADERSHIP_CONTACTS.filter((c) => c.category === 'Matron').length }
  ];

  const filteredContacts = LEADERSHIP_CONTACTS.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.designation && c.designation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.organization && c.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.phone && c.phone.includes(searchQuery.trim()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const getCleanWaNumber = (phone?: string) => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('0')) {
      return `234${digits.slice(1)}`;
    }
    return digits;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-emerald-950 rounded-2xl text-white p-6 sm:p-10 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/50">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-xs font-semibold text-amber-300 mb-3">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Leadership & Helplines</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            MCAN Osun Leadership & Contact Directory
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100 leading-relaxed">
            Reach out directly to our state executive officers, NYSC Staff Advisors, distinguished Patrons, and Matron whenever you need spiritual advice, PPA guidance, or administrative welfare assistance during your service year.
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

      {/* Quick Helplines Callout Box */}
      <div className="bg-emerald-950 text-white rounded-2xl p-5 sm:p-6 mb-8 border border-emerald-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-3 border-b border-emerald-900">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Primary State Helplines & Executive Contacts</span>
            </h2>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Available for immediate corps member welfare, orientation camp questions, and lodge inquiries.
            </p>
          </div>
          <span className="text-xs bg-emerald-900/90 text-emerald-200 border border-emerald-700/60 px-2.5 py-1 rounded-md font-mono">
            Always Available Biidhnillah
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Ameer */}
          <div className="bg-emerald-900/60 rounded-xl p-3.5 border border-emerald-700/50 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Ameer (State President)
              </span>
              <h3 className="text-sm font-bold text-white mt-1">Brother Luqman Waliyullah Olamide</h3>
              <p className="text-xs text-emerald-300 font-mono mt-1 font-semibold">09056498489</p>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-emerald-800">
              <a
                href="tel:09056498489"
                className="flex-1 text-center py-1.5 rounded-lg bg-amber-400 text-emerald-950 text-xs font-bold hover:bg-amber-300 transition-colors"
              >
                Call
              </a>
              <a
                href="https://wa.me/2349056498489"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Ameerah */}
          <div className="bg-emerald-900/60 rounded-xl p-3.5 border border-emerald-700/50 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Ameerah (Sisters President)
              </span>
              <h3 className="text-sm font-bold text-white mt-1">Sister Kofoworola Bilqees</h3>
              <p className="text-xs text-emerald-300 font-mono mt-1 font-semibold">09039454686</p>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-emerald-800">
              <a
                href="tel:09039454686"
                className="flex-1 text-center py-1.5 rounded-lg bg-amber-400 text-emerald-950 text-xs font-bold hover:bg-amber-300 transition-colors"
              >
                Call
              </a>
              <a
                href="https://wa.me/2349039454686"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Naibatul Ameerah */}
          <div className="bg-emerald-900/60 rounded-xl p-3.5 border border-emerald-700/50 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Naibatul Ameerah (Sisters)
              </span>
              <h3 className="text-sm font-bold text-white mt-1">Naibatul Ameerah</h3>
              <p className="text-xs text-emerald-300 font-mono mt-1 font-semibold">07067340931</p>
              <span className="text-[10px] text-emerald-200/90 block mt-0.5">Sisters Circle & Sponsorship</span>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-emerald-800">
              <a
                href="tel:07067340931"
                className="flex-1 text-center py-1.5 rounded-lg bg-amber-400 text-emerald-950 text-xs font-bold hover:bg-amber-300 transition-colors"
              >
                Call
              </a>
              <a
                href="https://wa.me/2347067340931"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* General Secretary */}
          <div className="bg-emerald-900/60 rounded-xl p-3.5 border border-emerald-700/50 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                General Secretary
              </span>
              <h3 className="text-sm font-bold text-white mt-1">Brother Abdulsalam Ayinla Abdullah</h3>
              <p className="text-xs text-emerald-300 font-mono mt-1 font-semibold">07039101391</p>
            </div>
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-emerald-800">
              <a
                href="tel:07039101391"
                className="flex-1 text-center py-1.5 rounded-lg bg-amber-400 text-emerald-950 text-xs font-bold hover:bg-amber-300 transition-colors"
              >
                Call
              </a>
              <a
                href="https://wa.me/2347039101391"
                target="_blank"
                rel="noreferrer"
                className="flex-1 text-center py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Send Direct Inquiry Form Banner */}
        <div className="mt-4 pt-4 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-emerald-200">
            <span className="font-bold text-amber-300">Have an inquiry or accommodation request?</span>
            <span className="ml-1 text-emerald-200/90">Send a direct message via our portal form to the Ameer, Ameerah, or General Secretary.</span>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Direct Inquiry Form</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-4 sm:p-5 mb-8 space-y-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-900'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-900 text-amber-300'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, role, LGA or phone..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-700"
            />
          </div>
          <span className="text-xs text-gray-500 font-medium hidden sm:inline">
            Showing <strong className="text-emerald-900">{filteredContacts.length}</strong> official contacts
          </span>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredContacts.map((contact) => {
          const isExec = contact.category === 'Executive';
          const isAdvisor = contact.category === 'Staff Advisor';
          const isPatron = contact.category === 'Patron';
          const isMatron = contact.category === 'Matron';

          return (
            <div
              key={contact.id}
              className={`bg-white rounded-2xl border p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                isExec
                  ? 'border-emerald-300/80 bg-emerald-50/20'
                  : isAdvisor
                  ? 'border-blue-200 bg-blue-50/15'
                  : isMatron
                  ? 'border-purple-200 bg-purple-50/15'
                  : 'border-emerald-950/10'
              }`}
            >
              <div>
                {/* Category & Role Badges */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-md ${
                      isExec
                        ? 'bg-emerald-100 text-emerald-900'
                        : isAdvisor
                        ? 'bg-blue-100 text-blue-900'
                        : isMatron
                        ? 'bg-purple-100 text-purple-900'
                        : 'bg-amber-100 text-amber-950'
                    }`}
                  >
                    {contact.category}
                  </span>

                  <span className="text-[11px] font-semibold text-gray-500">
                    {contact.role}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight mb-1">
                  {contact.name}
                </h3>

                {/* Designation / Office */}
                {contact.designation && (
                  <p className="text-xs text-gray-600 font-medium mb-1">
                    {contact.designation}
                  </p>
                )}
                {contact.organization && (
                  <p className="text-[11px] text-gray-500 mb-3 flex items-center gap-1">
                    <Building className="w-3 h-3 text-emerald-700" />
                    <span>{contact.organization}</span>
                  </p>
                )}

                {/* Phone Display */}
                {contact.phone ? (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 my-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="font-mono text-xs sm:text-sm font-bold text-gray-900">
                        {contact.phone}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyPhone(contact.phone!)}
                      title="Copy Phone Number"
                      className="text-gray-500 hover:text-emerald-800 p-1 rounded-md transition-colors"
                    >
                      {copiedPhone === contact.phone ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 my-3 text-center text-xs text-gray-500 italic">
                    Contact available via NYSC Secretariat & LGI Office
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                {contact.phone ? (
                  <>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-900 transition-colors shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-300" />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/${getCleanWaNumber(contact.phone)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                      <span>WhatsApp</span>
                    </a>
                  </>
                ) : (
                  <button
                    onClick={() => onNavigate && onNavigate('contacts')}
                    className="w-full py-2 px-3 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Reach via MCAN Secretariat
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Advisory & Help Support Box */}
      <div className="mt-12 bg-white rounded-2xl border border-emerald-950/10 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-850">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            <span>Need Personal Assistance with your PPA or NYSC Clearance?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">
            MCAN Welfare & Shari'ah Advisory Desk
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            Muslim corps members experiencing relocation hurdles, accommodation shortages in rural LGAs, modest uniform concerns at camp, or spiritual counsel are encouraged to reach out to the Ameer, Ameerah, or their respective LGA Staff Advisor.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href="tel:09056498489"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-800 text-white font-bold text-xs sm:text-sm hover:bg-emerald-900 transition-all text-center shadow-xs"
          >
            Call State Ameer (09056498489)
          </a>
          <a
            href="tel:09039454686"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 text-emerald-950 font-bold text-xs sm:text-sm hover:bg-amber-300 transition-all text-center shadow-xs"
          >
            Call Ameerah (09039454686)
          </a>
        </div>
      </div>
    </div>
  );
};
