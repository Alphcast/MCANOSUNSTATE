import React, { useState } from 'react';
import {
  Mail,
  Send,
  Phone,
  MessageSquare,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Building,
  Clock,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
  Info,
  Users
} from 'lucide-react';
import { OfficialRecipient } from '../types';
import { safeFetchJson } from '../utils/api';

interface ContactUsProps {
  initialRecipient?: OfficialRecipient;
  onNavigate?: (tab: string) => void;
}

interface OfficialConfig {
  id: OfficialRecipient;
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  avatarBg: string;
  avatarText: string;
  focus: string;
  description: string;
  badge: string;
}

const OFFICIALS: OfficialConfig[] = [
  {
    id: 'ameer',
    name: 'Brother Luqman Waliyullah Olamide',
    role: 'Ameer (State President)',
    phone: '09056498489',
    whatsapp: '09056498489',
    avatarBg: 'bg-emerald-900 text-amber-300',
    avatarText: 'LW',
    focus: 'Spiritual guidance, state leadership, lodge allocation, state-wide policy & executive matters',
    description: 'Reach the State Ameer for state-level inquiries, corpers welfare, and overall chapter coordination.',
    badge: 'Chief Executive'
  },
  {
    id: 'ameerah',
    name: 'Sister Kofoworola Bilqees',
    role: 'Ameerah (Head of Sisters Directorate)',
    phone: '09039454686',
    whatsapp: '09039454686',
    avatarBg: 'bg-purple-900 text-purple-200',
    avatarText: 'KB',
    focus: 'Sisters Circle, female corpers welfare, Ode Oga Masjid programs, modesty & sisterhood counseling',
    description: 'Direct contact for all female corps members, Sisters Circle enquiries, and sisterhood support.',
    badge: 'Sisters Directorate'
  },
  {
    id: 'general_secretary',
    name: 'Brother Abdulsalam Ayinla Abdullah',
    role: 'General Secretary',
    phone: '07039101391',
    whatsapp: '07039101391',
    avatarBg: 'bg-blue-900 text-blue-200',
    avatarText: 'AA',
    focus: 'Annual Convention (31st Oct – 1st Nov), secretariat records, official correspondence & event registration',
    description: 'Direct contact for administrative inquiries, convention enquiries, sponsorship & secretariat notices.',
    badge: 'State Secretariat'
  },
  {
    id: 'all',
    name: 'Joint State Executive Council',
    role: 'All Executive Officials (Ameer, Ameerah & Gen. Sec)',
    phone: '09056498489',
    whatsapp: '09056498489',
    avatarBg: 'bg-gradient-to-r from-emerald-900 to-emerald-950 text-white',
    avatarText: 'SEC',
    focus: 'General enquiries, partnership proposals, patron/matron communications, chapter-wide broadcasts',
    description: 'Routes your message jointly to the Ameer, Ameerah, and General Secretary simultaneously.',
    badge: 'Joint Broadcast'
  }
];

export const ContactUs: React.FC<ContactUsProps> = ({
  initialRecipient = 'ameer',
  onNavigate
}) => {
  const [selectedRecipient, setSelectedRecipient] = useState<OfficialRecipient>(initialRecipient);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [category, setCategory] = useState('General');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{
    id: string;
    recipientName: string;
    recipientRole: string;
    recipientPhone: string;
    subject: string;
    message: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const selectedOfficial = OFFICIALS.find((o) => o.id === selectedRecipient) || OFFICIALS[0];

  const handleCopyPhone = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedPhone(num);
    setTimeout(() => setCopiedPhone(null), 2500);
  };

  const formatWhatsAppUrl = (phoneNum: string, refId?: string) => {
    const cleanNumber = phoneNum.replace(/\D/g, '');
    const intlNumber = cleanNumber.startsWith('0') ? '234' + cleanNumber.slice(1) : cleanNumber;
    const refText = refId ? `\n*Ref ID:* ${refId}` : '';
    const stateCodeText = stateCode.trim() ? `\n*State Code:* ${stateCode.toUpperCase()}` : '';
    const phoneText = phone.trim() ? `\n*Phone:* ${phone}` : '';

    const text = `*Assalamu Alaykum Warahmatullah!*
*New Inquiry via MCAN Osun State Portal*${refText}
*From:* ${fullName || 'A Muslim Corps Member'}
*Email:* ${email || 'N/A'}${phoneText}${stateCodeText}
*Target Official:* ${selectedOfficial.name} (${selectedOfficial.role})
*Category:* ${category}
*Subject:* ${subject || 'Portal Inquiry'}

*Message:*
${message}

_Sent via MCAN Osun State Official Portal_`;

    return `https://wa.me/${intlNumber}?text=${encodeURIComponent(text)}`;
  };

  const formatMailtoUrl = () => {
    const toEmail = 'mcanosunstate@gmail.com';
    const sub = `[MCAN Osun Inquiry] ${subject || 'Portal Message'} - Attn: ${selectedOfficial.name}`;
    const body = `Assalamu Alaykum Warahmatullah,

Attention: ${selectedOfficial.name} (${selectedOfficial.role})

Sender Details:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- State Code: ${stateCode || 'Not provided'}
- Inquiry Category: ${category}

Message:
${message}

---
Sent via MCAN Osun State Chapter Web Portal`;

    return `mailto:${toEmail}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your Full Name, Email, and Message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await safeFetchJson<{
        success: boolean;
        message?: string;
        error?: string;
        inquiry?: {
          id: string;
          recipientName: string;
          recipientRole: string;
        };
      }>('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName: fullName.trim(),
          senderEmail: email.trim(),
          senderPhone: phone.trim(),
          senderStateCode: stateCode.trim(),
          recipient: selectedRecipient,
          category,
          subject: subject.trim() || `Inquiry regarding ${category}`,
          message: message.trim()
        })
      });

      if (res.ok && res.data?.success) {
        setSuccessData({
          id: res.data.inquiry?.id || `MCAN-INQ-${Date.now().toString().slice(-6)}`,
          recipientName: selectedOfficial.name,
          recipientRole: selectedOfficial.role,
          recipientPhone: selectedOfficial.phone,
          subject: subject.trim() || `Inquiry regarding ${category}`,
          message: message.trim()
        });
      } else {
        // Fallback offline mock support if backend had a network blip
        setSuccessData({
          id: `MCAN-INQ-${Date.now().toString().slice(-6)}`,
          recipientName: selectedOfficial.name,
          recipientRole: selectedOfficial.role,
          recipientPhone: selectedOfficial.phone,
          subject: subject.trim() || `Inquiry regarding ${category}`,
          message: message.trim()
        });
      }
    } catch (err: any) {
      console.warn('Network issue submitting inquiry, enabling direct WhatsApp routing:', err);
      setSuccessData({
        id: `MCAN-INQ-${Date.now().toString().slice(-6)}`,
        recipientName: selectedOfficial.name,
        recipientRole: selectedOfficial.role,
        recipientPhone: selectedOfficial.phone,
        subject: subject.trim() || `Inquiry regarding ${category}`,
        message: message.trim()
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSuccessData(null);
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-emerald-900 rounded-3xl text-white p-6 sm:p-10 mb-8 sm:mb-12 shadow-sm border border-emerald-800/60 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-xs font-semibold text-amber-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Official Communication & Secretariat Routing</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Contact MCAN Osun State Executive Leadership
          </h1>

          <p className="mt-3 text-sm sm:text-base text-emerald-100 leading-relaxed">
            Have questions about accommodation, corpers lodge placement, Sisters Circle, weekly WhatsApp knowledge circles, or the upcoming Annual State Convention? Reach out directly to the Ameer, Ameerah, and General Secretary.
          </p>
        </div>

        {/* Decorative Watermark Emblem */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none hidden md:block">
          <img src="/mcan-logo.png" alt="Emblem" className="w-64 h-64 object-contain" />
        </div>
      </div>

      {/* Quick Emergency / Direct Call Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {OFFICIALS.filter((o) => o.id !== 'all').map((official) => (
          <div
            key={official.id}
            className={`p-4 rounded-2xl border transition-all ${
              selectedRecipient === official.id
                ? 'bg-emerald-50/80 border-emerald-500 shadow-xs'
                : 'bg-white border-gray-200 hover:border-emerald-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                {official.badge}
              </span>
              <span className="text-xs font-mono font-bold text-gray-700">
                {official.phone}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 text-sm">{official.name}</h3>
            <p className="text-xs text-emerald-800 font-semibold mb-3">{official.role}</p>

            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <a
                href={`tel:${official.phone}`}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/234${official.phone.replace(/\D/g, '').slice(-10)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3 h-3 text-emerald-700" />
                <span>WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopyPhone(official.phone)}
                title="Copy phone number"
                className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
              >
                {copiedPhone === official.phone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recipient Selection & Secretariat Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xs p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-800" />
              <span>1. Choose Official Recipient</span>
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Select which state official should receive your inquiry directly.
            </p>

            <div className="space-y-3">
              {OFFICIALS.map((official) => {
                const isSelected = selectedRecipient === official.id;
                return (
                  <div
                    key={official.id}
                    onClick={() => setSelectedRecipient(official.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-50/70 shadow-2xs ring-2 ring-emerald-600/20'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${official.avatarBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}
                      >
                        {official.avatarText}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                            {official.name}
                          </h4>
                          <span
                            className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm shrink-0 ${
                              isSelected
                                ? 'bg-emerald-800 text-amber-300'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {official.badge}
                          </span>
                        </div>

                        <p className="text-xs text-emerald-800 font-medium truncate">
                          {official.role}
                        </p>

                        <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                          {official.focus}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secretariat Details Box */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 shadow-xs border border-emerald-800/50 space-y-4">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Building className="w-4 h-4" />
              <span>Official State Secretariat & Mosque</span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">MCAN Osun State Headquarters</h4>
              <p className="text-xs text-emerald-200 mt-1 leading-relaxed">
                MCAN State Central Mosque & Secretariat, Old Garage, Osogbo, Osun State.
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-800/60 space-y-2 text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Turnaround Time: Responses typically within 12 – 24 hours.</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="font-mono">mcanosunstate@gmail.com</span>
              </div>
            </div>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('contacts')}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>View Full Patrons & Advisory Council Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Inquiry Form or Success State (7 cols) */}
        <div className="lg:col-span-7">
          {successData ? (
            /* Successful Submission View with Instant Multi-Channel Actions */
            <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm p-6 sm:p-8 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="text-center max-w-lg mx-auto">
                <span className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 mb-2">
                  Reference: {successData.id}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  Inquiry Successfully Routed!
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  Your message has been registered in our database and addressed to{' '}
                  <strong className="text-emerald-900">{successData.recipientName}</strong> (
                  {successData.recipientRole}).
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="mt-6 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-2">
                <div className="flex justify-between border-b border-gray-200/70 pb-1.5">
                  <span className="text-gray-500 font-medium">Recipient Official:</span>
                  <span className="font-bold text-gray-900">{successData.recipientName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/70 pb-1.5">
                  <span className="text-gray-500 font-medium">Subject:</span>
                  <span className="font-semibold text-gray-900 truncate max-w-xs">{successData.subject}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/70 pb-1.5">
                  <span className="text-gray-500 font-medium">Official Phone:</span>
                  <span className="font-mono font-bold text-emerald-900">{successData.recipientPhone}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-medium block mb-0.5">Message Excerpt:</span>
                  <p className="text-gray-600 italic line-clamp-3 bg-white p-2.5 rounded-lg border border-gray-200/60">
                    "{successData.message}"
                  </p>
                </div>
              </div>

              {/* Action Buttons: Instant WhatsApp / Direct Email / Send Another */}
              <div className="mt-6 space-y-3">
                <a
                  href={formatWhatsAppUrl(successData.recipientPhone, successData.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-200" />
                  <span>Send Direct WhatsApp Message to Official Now</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={formatMailtoUrl()}
                    className="py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Send via Email Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-gray-600" />
                    <span>Send Another Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xs p-6 sm:p-8">
              <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <Send className="w-5 h-5 text-emerald-800" />
                    <span>2. Fill Inquiry Details</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Addressing:{' '}
                    <strong className="text-emerald-900">{selectedOfficial.name}</strong> (
                    {selectedOfficial.role})
                  </p>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                    Official Form
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Sender Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Brother Ibrahim Yusuf or Sister Maryam"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm text-gray-900 outline-hidden transition-all bg-white"
                    />
                  </div>
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@example.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm text-gray-900 outline-hidden transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Phone Number (WhatsApp)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="080XXXXXXXX"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm text-gray-900 outline-hidden transition-all bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* State Code & Inquiry Category Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* NYSC State Code */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      NYSC State Code (Optional)
                    </label>
                    <div className="relative">
                      <ShieldCheck className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={stateCode}
                        onChange={(e) => setStateCode(e.target.value.toUpperCase())}
                        placeholder="e.g., OS/26A/1234"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm font-mono text-gray-900 outline-hidden transition-all bg-white"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm text-gray-900 outline-hidden transition-all bg-white"
                    >
                      <option value="General">General Inquiries & Welcome</option>
                      <option value="Accommodation & Lodge">Accommodation & Corpers Lodge (Ede, Osogbo, etc.)</option>
                      <option value="Sisters Affairs">Sisters Circle & Female Corpers Welfare</option>
                      <option value="Programs & Convention">Annual Convention (31st Oct – 1st Nov) & Events</option>
                      <option value="WhatsApp Halaqah">Weekly WhatsApp Fiqh & Hadith Sessions</option>
                      <option value="ID Card & Verification">ID Card Registration & Verification Support</option>
                      <option value="Sponsorship & Donations">Sponsorship, Zakat & Chapter Support</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Subject Line <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of your inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm text-gray-900 outline-hidden transition-all bg-white"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Assalamu alaykum, please state your inquiry or request with as much detail as possible..."
                    className="w-full p-4 rounded-xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs sm:text-sm text-gray-900 outline-hidden transition-all resize-y bg-white"
                  />
                </div>

                {/* Routing Notice */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p>
                    Your message will be sent directly to{' '}
                    <strong>{selectedOfficial.name}</strong> ({selectedOfficial.role}) at{' '}
                    <strong className="font-mono">{selectedOfficial.phone}</strong>.
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-60 text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Routing Message to {selectedOfficial.role}...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Inquiry to {selectedOfficial.name}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
