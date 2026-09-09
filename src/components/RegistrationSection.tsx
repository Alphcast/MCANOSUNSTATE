import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Upload,
  User,
  Phone,
  Building,
  MapPin,
  Heart,
  CheckCircle2,
  AlertCircle,
  Search,
  Camera,
  RotateCcw,
  Sparkles,
  Loader2
} from 'lucide-react';
import { Member, MCANPost } from '../types';
import { OSUN_LGAS, MCAN_POSTS, BATCH_LIST } from '../data/constants';
import { IdCardCanvas } from './IdCardCanvas';
import { compressImageFile, generateDefaultPassport } from '../utils/image';
import { safeFetchJson } from '../utils/api';
import { saveLocalMember, findMemberInLocal, generateMemberLocally } from '../utils/memberStorage';

interface RegistrationSectionProps {
  onMemberRegistered?: (member: Member) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({ onMemberRegistered }) => {
  const [activeMode, setActiveMode] = useState<'register' | 'retrieve'>('register');

  // Form State
  const [fullName, setFullName] = useState('');
  const [stateCode, setStateCode] = useState('OS/26C/');
  const [mcanPost, setMcanPost] = useState<MCANPost | string>('Corps Member');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [lga, setLga] = useState('Osogbo');
  const [ppa, setPpa] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [batch, setBatch] = useState(BATCH_LIST[4] || '2026 Batch C Stream 1');
  const [passportUrl, setPassportUrl] = useState<string>('');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');

  // UI status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressingPhoto, setIsCompressingPhoto] = useState(false);
  const [photoInfo, setPhotoInfo] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registeredMember, setRegisteredMember] = useState<Member | null>(null);

  // Retrieve existing ID state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Sample quick passport presets for convenient testing
  const samplePassports = [
    { label: 'Brother 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
    { label: 'Brother 2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
    { label: 'Sister 1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80' },
    { label: 'Sister 2', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' }
  ];

  // Handle local passport upload with automatic client-side compression
  const handlePassportUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setIsCompressingPhoto(true);
    setErrorMessage(null);

    try {
      // Compress and optimize image to high-clarity passport dimensions (~30KB)
      const compressedDataUrl = await compressImageFile(file, 480, 600, 0.85);
      setPassportUrl(compressedDataUrl);
      const approxKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);
      setPhotoInfo(`Optimized passport photo (${approxKb} KB)`);
    } catch (err: any) {
      console.warn('Canvas compression error, falling back to direct reader:', err);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPassportUrl(uploadEvent.target.result as string);
          setPhotoInfo('Photo loaded');
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsCompressingPhoto(false);
    }
  };

  // Submit registration & Generate ID card automatically
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMessage('Full Name is required as written on your NYSC Call-up letter.');
      return;
    }

    const cleanCode = stateCode.trim().toUpperCase().replace(/\/+/g, '/');
    if (!cleanCode.startsWith('OS/') || cleanCode.length < 8) {
      setErrorMessage('State code must be in official NYSC Osun format, e.g., OS/26A/1234 or OS/26C/5678.');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
      setErrorMessage('Please provide a valid 11-digit Nigerian phone number.');
      return;
    }

    // Auto-generate default passport if none selected
    const activePassportUrl = passportUrl || generateDefaultPassport(gender, fullName);

    setIsSubmitting(true);

    const payload = {
      fullName: fullName.trim(),
      stateCode: cleanCode,
      mcanPost,
      phoneNumber: phoneNumber.trim(),
      whatsappNumber: whatsappNumber.trim() || phoneNumber.trim(),
      email: email.trim() || undefined,
      gender,
      lga,
      ppa: ppa.trim() || `${lga} LGA, Osun State`,
      bloodGroup,
      batch,
      passportUrl: activePassportUrl,
      emergencyContactName: emergencyContactName.trim() || undefined,
      emergencyContactPhone: emergencyContactPhone.trim() || undefined
    };

    try {
      // 1. Send to server using safe fetch (guaranteed never to crash on HTML error responses)
      const res = await safeFetchJson<{
        success: boolean;
        message?: string;
        member?: Member;
        existingMember?: Member;
        error?: string;
      }>('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok && res.data?.member) {
        // Successfully registered on backend!
        saveLocalMember(res.data.member);
        setRegisteredMember(res.data.member);
        if (onMemberRegistered) {
          onMemberRegistered(res.data.member);
        }

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#047857', '#10b981', '#f59e0b', '#fbbf24']
        });
        return;
      }

      if (res.data?.existingMember) {
        // Already registered on server, display the member's card
        saveLocalMember(res.data.existingMember);
        setRegisteredMember(res.data.existingMember);
        setErrorMessage(res.data.error || 'Member is already registered. Your official ID card is displayed below.');
        return;
      }

      // Check if state code is registered in local storage
      const existingLocal = findMemberInLocal(cleanCode);
      if (existingLocal) {
        setRegisteredMember(existingLocal);
        setErrorMessage(`State code ${cleanCode} is already registered (${existingLocal.fullName}). Card retrieved below.`);
        return;
      }

      // 2. Automatic ID Card Generation Fallback:
      // If the backend was unreachable or returned non-JSON, automatically generate the official ID card locally!
      const locallyGenerated = generateMemberLocally(payload);
      setRegisteredMember(locallyGenerated);
      if (onMemberRegistered) {
        onMemberRegistered(locallyGenerated);
      }

      setErrorMessage(res.error || 'Connection is not good, check back later');

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#047857', '#10b981', '#f59e0b', '#fbbf24']
      });
    } catch (err: any) {
      console.warn('Network issue during registration, generating ID card automatically:', err);
      // Failsafe: Guarantee automatic generation
      const locallyGenerated = generateMemberLocally(payload);
      setRegisteredMember(locallyGenerated);
      setErrorMessage('Connection is not good, check back later');
      if (onMemberRegistered) {
        onMemberRegistered(locallyGenerated);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Search existing member to reprint ID
  const handleSearchExisting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    const code = searchQuery.trim().replace(/\/+/g, '/').toUpperCase();

    // Check local storage first
    const localMember = findMemberInLocal(code);
    if (localMember) {
      setRegisteredMember(localMember);
      setIsSearching(false);
      return;
    }

    try {
      const res = await safeFetchJson<{ verified: boolean; member?: Member; message?: string }>(
        `/api/verify/${encodeURIComponent(code)}`
      );

      if (res.ok && res.data?.member) {
        // Retrieve full member record
        const fullRes = await safeFetchJson<{ member?: Member }>(`/api/members/${res.data.member.id}`);
        if (fullRes.data?.member) {
          saveLocalMember(fullRes.data.member);
          setRegisteredMember(fullRes.data.member);
        } else {
          saveLocalMember(res.data.member);
          setRegisteredMember(res.data.member);
        }
        return;
      }

      setSearchError(res.error || res.data?.message || 'No member record found for this State Code or MCAN ID. Please ensure exact code (e.g. OS/26C/1042).');
    } catch (err: any) {
      setSearchError('Connection is not good, check back later');
    } finally {
      setIsSearching(false);
    }
  };

  // Quick 1-click Auto-Generate Demo Card
  const handleAutoFillAndGenerate = () => {
    const randomNum = Math.floor(1000 + Math.random() * 8999);
    setFullName('Bro. Abdul-Hameed Olatunji');
    setStateCode(`OS/26C/${randomNum}`);
    setBatch('2026 Batch C Stream 1');
    setPhoneNumber('08134567890');
    setWhatsappNumber('08134567890');
    setEmail('abdulhameed.osun@mcan.org.ng');
    setMcanPost('Corps Member');
    setLga('Osogbo');
    setPpa('Government Technical College, Osogbo');
    setBloodGroup('O+');
    setPassportUrl(samplePassports[0].url);
    setPhotoInfo('Demo Passport Loaded');
    setErrorMessage(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top Header Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 rounded-2xl text-white p-6 sm:p-10 shadow-md relative overflow-hidden mb-8 border border-emerald-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-xs font-semibold text-amber-300 mb-3">
            <span>Official Portal</span>
            <span>•</span>
            <span>Osun State Chapter</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            MCAN Osun Member Registration & ID Card Generator
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
            Register your NYSC Muslim Corps membership in Osun State, get enrolled into the state verification database, and immediately generate & download your official Front & Back ID card for print (PDF / PNG / JPG).
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActiveMode('register');
                setRegisteredMember(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'register'
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'bg-emerald-800/80 text-white hover:bg-emerald-700'
              }`}
            >
              New Member Registration
            </button>
            <button
              onClick={() => setActiveMode('retrieve')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeMode === 'retrieve'
                  ? 'bg-amber-400 text-emerald-950 shadow-xs'
                  : 'bg-emerald-800/80 text-white hover:bg-emerald-700'
              }`}
            >
              Reprint / Retrieve Existing ID Card
            </button>
          </div>
        </div>

        {/* Official MCAN Emblem Seal */}
        <div className="shrink-0 relative hidden sm:flex items-center justify-center">
          <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-white p-1.5 shadow-2xl border-4 border-amber-400/90 flex items-center justify-center">
            <img
              src="/mcan-logo.png"
              alt="Official MCAN Emblem"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Mode 1: Retrieve Existing ID Card */}
      {activeMode === 'retrieve' && !registeredMember && (
        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-sm p-6 sm:p-8 max-w-2xl mx-auto mb-10">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Retrieve & Reprint Your ID Card</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Enter your Osun State Code (e.g. <strong className="text-emerald-900">OS/26A/1042</strong>) or MCAN ID to load your card.
            </p>
          </div>

          <form onSubmit={handleSearchExisting} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                State Code or MCAN Membership ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. OS/26C/1042 or MCAN-OS-2026-0001"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-mono text-base uppercase"
                />
              </div>
            </div>

            {searchError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{searchError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {isSearching ? 'Searching Database...' : 'Find & Display My ID Card'}
            </button>
          </form>

          {/* Quick Demo Previews */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <span className="text-xs text-gray-500 block mb-2 font-medium">
              Or click to test with verified executive cards:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('OS/26A/1042');
                  safeFetchJson('/api/members/MCAN-OS-2026-0001')
                    .then((res) => {
                      if (res.ok && res.data?.member) setRegisteredMember(res.data.member);
                    });
                }}
                className="text-xs px-2.5 py-1 rounded-md bg-gray-100 hover:bg-emerald-100 text-emerald-900 font-mono"
              >
                OS/26A/1042 (Amir)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('OS/26A/2115');
                  safeFetchJson('/api/members/MCAN-OS-2026-0002')
                    .then((res) => {
                      if (res.ok && res.data?.member) setRegisteredMember(res.data.member);
                    });
                }}
                className="text-xs px-2.5 py-1 rounded-md bg-gray-100 hover:bg-emerald-100 text-emerald-900 font-mono"
              >
                OS/26A/2115 (Amira)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('OS/26B/0891');
                  safeFetchJson('/api/members/MCAN-OS-2026-0003')
                    .then((res) => {
                      if (res.ok && res.data?.member) setRegisteredMember(res.data.member);
                    });
                }}
                className="text-xs px-2.5 py-1 rounded-md bg-gray-100 hover:bg-emerald-100 text-emerald-900 font-mono"
              >
                OS/26B/0891 (Imam)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Render ID Card if member is registered / retrieved */}
      {registeredMember && (
        <div className="space-y-6 mb-12 animate-in fade-in duration-300">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                  {registeredMember.fullName} ({registeredMember.stateCode})
                </h3>
                <p className="text-xs text-emerald-800">
                  ID: <strong>{registeredMember.id}</strong> • Post: <strong>{registeredMember.mcanPost}</strong> • LGA: <strong>{registeredMember.lga}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setRegisteredMember(null)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Register Another Member</span>
            </button>
          </div>

          <IdCardCanvas member={registeredMember} />
        </div>
      )}

      {/* Registration Form */}
      {activeMode === 'register' && !registeredMember && (
        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-sm p-6 sm:p-10">
          <div className="border-b border-gray-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                New Member Registration Form
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Please enter your accurate NYSC details. All fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAutoFillAndGenerate}
              className="self-start sm:self-center text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-xl font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Fill Sample Data</span>
            </button>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Notice</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Passport Photograph Upload Section */}
            <div className="bg-emerald-50/50 border border-emerald-900/10 rounded-2xl p-5 sm:p-6">
              <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                Passport Photograph <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-4">
                Upload a clear frontal portrait photo on a light background. This photo will appear on your front ID card.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Image Preview Box */}
                <div className="relative w-36 h-44 rounded-xl border-2 border-dashed border-emerald-700/40 bg-white overflow-hidden flex flex-col items-center justify-center shrink-0 shadow-xs">
                  {isCompressingPhoto ? (
                    <div className="flex flex-col items-center justify-center p-3 text-center">
                      <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-2" />
                      <span className="text-[11px] font-semibold text-emerald-900">Optimizing...</span>
                    </div>
                  ) : passportUrl ? (
                    <img
                      src={passportUrl}
                      alt="Uploaded Passport"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-3">
                      <Camera className="w-8 h-8 text-emerald-700/60 mx-auto mb-1" />
                      <span className="text-[11px] text-gray-400 font-medium leading-tight block">
                        No photo selected
                      </span>
                    </div>
                  )}
                </div>

                {/* Upload Action */}
                <div className="space-y-3 w-full">
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-xs sm:text-sm font-semibold hover:bg-emerald-900 cursor-pointer shadow-2xs transition-all">
                      <Upload className="w-4 h-4 text-amber-300" />
                      <span>{isCompressingPhoto ? 'Processing...' : 'Upload Photo from Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isCompressingPhoto}
                        onChange={handlePassportUpload}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        const avatar = generateDefaultPassport(gender, fullName || 'MCAN Member');
                        setPassportUrl(avatar);
                        setPhotoInfo('Official Emblem Avatar selected');
                        setErrorMessage(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-semibold transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Use Official Avatar</span>
                    </button>
                  </div>

                  {photoInfo ? (
                    <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{photoInfo}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500 block">
                      Photos are automatically compressed to ensure instant generation and fast download.
                    </span>
                  )}

                  {/* Sample portraits shortcut */}
                  <div className="pt-2">
                    <span className="text-xs text-gray-600 font-medium block mb-1.5">
                      Or select sample portrait for instant testing:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {samplePassports.map((sample, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setPassportUrl(sample.url);
                            setPhotoInfo(`${sample.label} photo selected`);
                            setErrorMessage(null);
                          }}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                            passportUrl === sample.url
                              ? 'bg-emerald-800 text-white border-emerald-800'
                              : 'bg-white text-gray-700 border-gray-200 hover:bg-emerald-50'
                          }`}
                        >
                          {sample.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* General Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Full Name (As on NYSC Call-up) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ahmad Olawale Jimoh"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                  />
                </div>
              </div>

              {/* State Code */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  State Code (OS/26C/XXXX) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={stateCode}
                    onChange={(e) => setStateCode(e.target.value.toUpperCase())}
                    placeholder="OS/26C/1234"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 font-mono text-sm uppercase font-bold text-emerald-950"
                  />
                </div>
                <div className="flex gap-1.5 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setStateCode('OS/26A/')}
                    className="text-[11px] px-2 py-0.5 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono"
                  >
                    OS/26A/
                  </button>
                  <button
                    type="button"
                    onClick={() => setStateCode('OS/26B/')}
                    className="text-[11px] px-2 py-0.5 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono"
                  >
                    OS/26B/
                  </button>
                  <button
                    type="button"
                    onClick={() => setStateCode('OS/26C/')}
                    className="text-[11px] px-2 py-0.5 rounded-sm bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-mono font-bold"
                  >
                    OS/26C/
                  </button>
                  <button
                    type="button"
                    onClick={() => setStateCode('OS/27A/')}
                    className="text-[11px] px-2 py-0.5 rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono"
                  >
                    OS/27A/
                  </button>
                </div>
              </div>

              {/* MCAN Post */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  MCAN Office / Post <span className="text-red-500">*</span>
                </label>
                <select
                  value={mcanPost}
                  onChange={(e) => setMcanPost(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm font-semibold text-emerald-900 bg-white"
                >
                  {MCAN_POSTS.map((post) => (
                    <option key={post} value={post}>
                      {post}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="08012345678"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="08012345678 (Leave empty if same as phone)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="corpsmember@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('Male')}
                    className={`py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      gender === 'Male'
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-2xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Brother (Male)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('Female')}
                    className={`py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                      gender === 'Female'
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-2xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Sister (Female)
                  </button>
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Blood Group (For Emergency ID)
                </label>
                <div className="relative">
                  <Heart className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm bg-white"
                  >
                    {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'Unknown'].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Posting & Location Grid */}
            <div className="border-t border-gray-100 pt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Osun LGA */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Local Govt Area in Osun <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <select
                    value={lga}
                    onChange={(e) => setLga(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm bg-white font-medium"
                  >
                    {OSUN_LGAS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc} LGA
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Batch */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  NYSC Service Batch <span className="text-red-500">*</span>
                </label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm bg-white"
                >
                  {BATCH_LIST.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Place of Primary Assignment (PPA) */}
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Place of Primary Assignment (PPA)
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={ppa}
                    onChange={(e) => setPpa(e.target.value)}
                    placeholder="e.g. Govt Technical College, Osogbo"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="border-t border-gray-100 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Emergency Next of Kin Name
                </label>
                <input
                  type="text"
                  value={emergencyContactName}
                  onChange={(e) => setEmergencyContactName(e.target.value)}
                  placeholder="e.g. Alhaji Abdul-Gafar"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Emergency Next of Kin Phone
                </label>
                <input
                  type="tel"
                  value={emergencyContactPhone}
                  onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  placeholder="08023456789"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500 max-w-md">
                By submitting this form, you confirm that you are a serving or prospective Muslim corps member deployed to Osun State.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Registering & Generating Card...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>Generate Official ID Card Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
