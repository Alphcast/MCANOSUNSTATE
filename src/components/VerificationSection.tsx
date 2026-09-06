import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, Search, CheckCircle, Award, Calendar, MapPin, Building, QrCode } from 'lucide-react';
import { Member } from '../types';

interface VerificationSectionProps {
  initialCode?: string;
  onViewCard?: (member: Member) => void;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({ initialCode, onViewCard }) => {
  const [query, setQuery] = useState(initialCode || '');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<{
    verified: boolean;
    member?: any;
    verificationTimestamp?: string;
    issuingAuthority?: string;
    message?: string;
  } | null>(null);

  // Auto-verify if initialCode is passed (e.g. from QR scan)
  useEffect(() => {
    if (initialCode) {
      setQuery(initialCode);
      verifyCode(initialCode);
    }
  }, [initialCode]);

  const verifyCode = async (codeToVerify: string) => {
    if (!codeToVerify.trim()) return;
    setIsSearching(true);
    setResult(null);

    try {
      const res = await fetch(`/api/verify/${encodeURIComponent(codeToVerify.trim())}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        verified: false,
        message: 'Could not connect to the verification server: ' + err.message
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(query);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="w-20 h-20 rounded-full bg-white p-1 mx-auto mb-4 shadow-md border-2 border-emerald-600/60 flex items-center justify-center">
          <img
            src="/mcan-logo.png"
            alt="MCAN Official Seal"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Official Member Verification Database
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Instantly verify the authentic membership status of any Muslim corps member in Osun State using their State Code, MCAN ID, or QR code security hash.
        </p>
      </div>

      {/* Verification Search Box */}
      <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-sm p-5 sm:p-7 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter State Code (e.g. OS/24A/1042) or MCAN ID"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm sm:text-base font-mono uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="w-full sm:w-auto px-8 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-sm transition-all shadow-sm shrink-0 flex items-center justify-center gap-2"
          >
            {isSearching ? 'Verifying...' : 'Verify Status'}
          </button>
        </form>

        {/* Quick Test Codes */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium">Quick verification examples:</span>
          {['OS/24A/1042', 'OS/24A/2115', 'OS/24A/0891', 'OS/24A/3402'].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setQuery(code);
                verifyCode(code);
              }}
              className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 font-mono hover:bg-emerald-100 font-semibold border border-emerald-200"
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Verification Result Card */}
      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-300">
          {result.verified && result.member ? (
            <div className="bg-white rounded-2xl border-2 border-emerald-600 shadow-md overflow-hidden">
              {/* Green Verified Banner */}
              <div className="bg-emerald-800 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                    <CheckCircle className="w-5 h-5 text-emerald-900" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300 block">
                      VERIFICATION CONFIRMED
                    </span>
                    <h3 className="text-lg font-bold">
                      Authentic Registered Member
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-emerald-200 font-mono text-right hidden sm:block">
                    Timestamp: {new Date(result.verificationTimestamp || Date.now()).toLocaleString()}
                  </div>
                  <img
                    src="/mcan-logo.png"
                    alt="MCAN Seal"
                    className="w-10 h-10 rounded-full bg-white p-0.5 border border-amber-400 shadow-xs shrink-0"
                  />
                </div>
              </div>

              {/* Member Profile Body */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-100">
                  <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-emerald-600 shadow-xs shrink-0 bg-gray-100">
                    <img
                      src={result.member.passportUrl}
                      alt={result.member.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900">
                      {result.member.mcanPost}
                    </div>
                    <h2 className="text-2xl font-black text-gray-900">
                      {result.member.fullName}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 font-medium">
                      <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {result.member.stateCode}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-gray-500">ID: {result.member.id}</span>
                      <span>•</span>
                      <span>Batch: {result.member.batch}</span>
                    </div>
                  </div>
                </div>

                {/* Verification Record Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 text-sm">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <MapPin className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-gray-500 block">Osun LGA</span>
                      <span className="font-bold text-gray-800">{result.member.lga} Local Government Area</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <Building className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-gray-500 block">Place of Primary Assignment (PPA)</span>
                      <span className="font-bold text-gray-800">{result.member.ppa}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <Award className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-gray-500 block">MCAN Designation</span>
                      <span className="font-bold text-gray-800">{result.member.mcanPost}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                    <Calendar className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-gray-500 block">Registration Date</span>
                      <span className="font-bold text-gray-800">
                        {new Date(result.member.registrationDate).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Issuing Authority Guarantee */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
                  <QrCode className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Certified Verification Authority</strong>
                    <span>{result.issuingAuthority}</span>
                    <span className="block mt-1 font-mono text-emerald-800 text-[11px]">
                      Security Hash: {result.member.verificationHash}
                    </span>
                  </div>
                </div>

                {/* View/Reprint Card Button */}
                {onViewCard && (
                  <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => onViewCard(result.member)}
                      className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm transition-all shadow-xs"
                    >
                      View & Print Official ID Card
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-red-200 shadow-sm p-6 sm:p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Verification Failed: Record Not Found
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto mt-2">
                {result.message || 'No registered MCAN Osun member record matches this identifier. Please verify the State Code format (e.g. OS/24A/1042) or register as a new member.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
