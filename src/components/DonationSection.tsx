import React, { useState } from 'react';
import {
  HeartHandshake,
  Copy,
  Check,
  Building,
  ShieldCheck,
  Send,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { QURAN_VERSES, BANK_ACCOUNTS } from '../data/constants';

export const DonationSection: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [donorName, setDonorName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('Official Zakat & Sadaqah Fund');
  const [bankUsed, setBankUsed] = useState('Jaiz Bank Plc');
  const [transactionRef, setTransactionRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState<string | null>(null);

  const handleCopyAccount = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !amount.trim()) return;

    setIsSubmitting(true);
    setSubmittedNotice(null);

    try {
      const res = await fetch('/api/donations/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          donorName,
          phone,
          amount: Number(amount),
          purpose,
          bankUsed,
          transactionRef
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSubmittedNotice(
          'Jazakumullahu Khayran! Your donation notification has been received by the MCAN Osun State Financial Directorate. May Allah accept your Sadaqah and multiply your provision.'
        );
        setDonorName('');
        setPhone('');
        setAmount('');
        setTransactionRef('');
      } else {
        setSubmittedNotice(data.error || 'Failed to submit notification. Please verify details.');
      }
    } catch (err: any) {
      setSubmittedNotice('Network error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 rounded-2xl text-white p-6 sm:p-10 mb-10 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-xs font-semibold text-amber-300 mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Zakat, Sadaqah & Capital Projects Fund</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Support the Cause of Allah: Zakat & Charity
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
            Your generous contributions sustain our NYSC Ede Camp Da'wah initiatives, maintain the Osogbo Corpers Lodge & Central Mosque, support indigent Muslim corpers, and empower community welfare across Osun State.
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

      {/* Noble Quranic Verses on Charity & Zakat */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="w-5 h-5 text-emerald-800" />
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Divine Words of Allah on Spending in His Way (Infaq & Zakat)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QURAN_VERSES.map((verse, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-emerald-950/10 shadow-xs hover:shadow-md transition-shadow p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {verse.surah} [{verse.reference}]
                  </span>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    {verse.focus}
                  </span>
                </div>

                {/* Arabic Script */}
                <div className="text-right font-serif text-xl sm:text-2xl leading-loose text-emerald-950 mb-4 tracking-wide">
                  {verse.arabic}
                </div>

                {/* Transliteration */}
                <p className="text-xs italic text-gray-500 font-mono mb-3 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  {verse.transliteration}
                </p>

                {/* Translation */}
                <p className="text-sm text-gray-800 leading-relaxed font-medium">
                  "{verse.translation}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Account Details Grid */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <Building className="w-5 h-5 text-emerald-800" />
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Official MCAN Osun State Bank Accounts
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Click the copy button next to any account number to copy it instantly to your clipboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BANK_ACCOUNTS.map((acc, idx) => {
            const isCopied = copiedAccount === acc.accountNumber;
            return (
              <div
                key={idx}
                className="bg-gradient-to-b from-white to-emerald-50/30 rounded-2xl border-2 border-emerald-800/20 shadow-xs hover:border-emerald-700 transition-all p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 uppercase tracking-wider">
                      {acc.bankName}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {acc.purpose}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">{acc.note}</p>

                  {/* Prominent Account Number Box */}
                  <div className="bg-emerald-900 text-white rounded-xl p-4 mb-4 relative">
                    <span className="text-[11px] font-semibold text-emerald-200 block uppercase tracking-wider">
                      Account Number
                    </span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-2xl font-extrabold tracking-wider text-amber-300">
                        {acc.accountNumber}
                      </span>
                      <button
                        onClick={() => handleCopyAccount(acc.accountNumber)}
                        className={`p-2 rounded-lg transition-all ${
                          isCopied
                            ? 'bg-amber-400 text-slate-950 font-bold'
                            : 'bg-emerald-800 text-white hover:bg-emerald-700'
                        }`}
                        title="Copy Account Number"
                      >
                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600">
                    <span className="font-medium text-gray-400 block">Account Name:</span>
                    <span className="font-bold text-gray-900">{acc.accountName}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-emerald-800 font-semibold flex items-center justify-between">
                  <span>Verified Chapter Account</span>
                  <span>CBN Regulated</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notify Us of Transfer Form */}
      <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
        <div className="text-center max-w-lg mx-auto mb-6">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
            <Send className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Notify Us of Your Donation / Transfer
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Let our financial desk acknowledge your transfer, verify the purpose, and issue an official prayer receipt.
          </p>
        </div>

        {submittedNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm leading-relaxed">
            {submittedNotice}
          </div>
        )}

        <form onSubmit={handleNotifySubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Donor Name / Alias *
              </label>
              <input
                type="text"
                required
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. Bro. Abdul-Rahman or Anonymous"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Phone Number (WhatsApp)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08012345678"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Amount Donated (NGN ₦) *
              </label>
              <input
                type="number"
                required
                min="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 10000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 text-sm font-semibold text-emerald-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Designated Purpose *
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 text-sm bg-white"
              >
                <option value="Official Zakat & Sadaqah Fund">Official Zakat & Sadaqah Fund</option>
                <option value="Mosque & Corpers Lodge Expansion Project">Mosque & Corpers Lodge Expansion</option>
                <option value="NYSC Ede Orientation Camp Da'wah & Welfare">NYSC Ede Camp Da'wah & Welfare</option>
                <option value="Ramadan Feeding & Iftar Project">Ramadan Feeding & Iftar Project</option>
                <option value="General Da'wah & Educational Support">General Da'wah & Educational Support</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Bank Paid Into
              </label>
              <select
                value={bankUsed}
                onChange={(e) => setBankUsed(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 text-sm bg-white"
              >
                <option value="Jaiz Bank Plc">Jaiz Bank Plc (Zakat & Sadaqah)</option>
                <option value="Stanbic IBTC Bank">Stanbic IBTC Bank (Building Fund)</option>
                <option value="TAJBank Ltd">TAJBank Ltd (Camp Da'wah)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Transaction Ref / Session ID
              </label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                placeholder="e.g. 090267... or payment receipt ref"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-600 text-sm font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-4"
          >
            {isSubmitting ? 'Sending Notification...' : 'Submit Donation Notification'}
          </button>
        </form>
      </div>
    </div>
  );
};
