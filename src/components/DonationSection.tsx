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
  ArrowRight,
  Coins,
  CheckCircle2,
  Info,
  Award
} from 'lucide-react';
import { QURAN_VERSES, PROPHETIC_HADITHS, BANK_ACCOUNTS } from '../data/constants';

export const DonationSection: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [donorName, setDonorName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('Official Chapter Da\'wah & Welfare');
  const [bankUsed, setBankUsed] = useState('Lotus Bank');
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
          'Jazakumullahu Khayran! Your donation notification has been received by the MCAN Osun State Financial Directorate. May Allah accept your contribution in His noble cause and multiply your provisions manifolds in this life and the Hereafter.'
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

  const primaryAccount = BANK_ACCOUNTS[0] || {
    bankName: 'Lotus Bank',
    accountNumber: '1014485564',
    accountName: 'MUSLIM CORPERS ASSOCIATION OF NIGERIA OSUN CHAPTER',
    purpose: 'Official MCAN Osun State Chapter Donation Account',
    note: 'Official chapter account dedicated to Da\'wah, Mosque & Lodge maintenance, and corps members\' welfare in the cause of Allah.'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl text-white p-6 sm:p-10 mb-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800/60">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-amber-400/40 text-xs font-semibold text-amber-300 mb-3.5">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Infāq fī Sabīlillāh • Contributing in the Cause of Allah</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Support the Way of Allah: MCAN Osun State Donations
          </h1>
          <p className="mt-3 text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
            Your generous contributions sustain our NYSC Ede Camp Da'wah initiatives, preserve and expand the Corpers Lodge & Central Mosque in Osogbo, assist indigent Muslim corpers, and earn you enduring rewards (Sadaqah Jariyah).
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
            <span className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-700/60">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              100% Dedicated to Islamic Da'wah
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-700/60">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Direct Official Account
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-900/80 px-3 py-1.5 rounded-lg border border-emerald-700/60">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Sadaqah Jariyah (Ongoing Reward)
            </span>
          </div>
        </div>

        {/* Official MCAN Emblem Seal */}
        <div className="shrink-0 relative hidden sm:flex items-center justify-center">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white p-2 shadow-2xl border-4 border-amber-400/90 flex items-center justify-center">
            <img
              src="/mcan-logo.png"
              alt="Official MCAN Emblem"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Featured Primary Donation Account Box */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-3">
          <Building className="w-5 h-5 text-emerald-800" />
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Official MCAN Osun State Chapter Donation Account
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 max-w-3xl leading-relaxed">
          Please make all chapter donations, contributions towards the Corpers Lodge, Ede Orientation Camp Da'wah, and welfare support into our officially designated Lotus Bank account below.
        </p>

        <div className="bg-gradient-to-br from-emerald-900 via-emerald-850 to-emerald-950 text-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-amber-400/40 relative overflow-hidden">
          {/* Subtle Islamic watermarked motif */}
          <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 pointer-events-none">
            <img src="/mcan-logo.png" alt="Watermark" className="w-full h-full object-contain" />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-emerald-950 uppercase tracking-wider">
                  {primaryAccount.bankName}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-800/80 text-emerald-200 border border-emerald-700/60 inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  Verified Official Account
                </span>
              </div>

              <div>
                <span className="text-xs font-medium text-emerald-200 uppercase tracking-wider block">
                  Account Name
                </span>
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white mt-0.5">
                  {primaryAccount.accountName}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                {primaryAccount.note}
              </p>
            </div>

            {/* Account Number Box & Quick Copy */}
            <div className="bg-emerald-950/90 rounded-2xl p-5 sm:p-6 border border-emerald-700/60 flex flex-col justify-center min-w-[280px] sm:min-w-[340px] shadow-inner">
              <div className="flex items-center justify-between text-xs text-emerald-300 mb-1 font-semibold uppercase tracking-wider">
                <span>Account Number (Lotus Bank)</span>
                <span className="text-[11px] text-amber-300 font-mono">NUBAN</span>
              </div>

              <div className="flex items-center justify-between gap-3 bg-emerald-900/60 p-3 rounded-xl border border-emerald-700/80">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-amber-300 select-all">
                  {primaryAccount.accountNumber}
                </span>

                <button
                  onClick={() => handleCopyAccount(primaryAccount.accountNumber)}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                    copiedAccount === primaryAccount.accountNumber
                      ? 'bg-amber-400 text-slate-950 scale-105'
                      : 'bg-emerald-700 hover:bg-emerald-600 text-white hover:scale-102'
                  }`}
                  title="Copy Account Number"
                >
                  {copiedAccount === primaryAccount.accountNumber ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-300/80 font-medium">
                <span>Bank: <strong>{primaryAccount.bankName}</strong></span>
                <span>Type: <strong>Non-Interest / Islamic Banking</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Contribute to the Cause of Allah? (Da'wah & Community Impact) */}
      <div className="mb-12 bg-white rounded-3xl border border-emerald-950/10 p-6 sm:p-9 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            How Your Donations Serve the Way of Allah
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mb-8 max-w-2xl leading-relaxed">
          Every single contribution directly impacts the spiritual growth, welfare, and safety of Muslim youth serving our nation across Osun State.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-lg mb-3 shadow-xs">
                🕌
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1.5">
                Corpers Lodge & Central Mosque
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Maintaining safe accommodation for brothers and sisters, electricity, borehole water, and daily prayers at our chapter secretariat.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 mt-4 block uppercase tracking-wider">
              • Sadaqah Jariyah
            </span>
          </div>

          <div className="bg-amber-50/60 rounded-2xl p-5 border border-amber-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg mb-3 shadow-xs">
                ⛺
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1.5">
                NYSC Ede Camp Da'wah & Hijab
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Welcoming new Muslim corps members at orientation camp, orientation manuals, distributing prayer rugs, hijabs, and Sahur/Iftar during fasting.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-800 mt-4 block uppercase tracking-wider">
              • Guidance & Preservation
            </span>
          </div>

          <div className="bg-teal-50/60 rounded-2xl p-5 border border-teal-100 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-800 text-teal-200 flex items-center justify-center font-bold text-lg mb-3 shadow-xs">
                🤝
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1.5">
                Corps Members' Welfare & Relief
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Assisting corpers facing sudden medical emergencies, accommodation distress, or unexpected hardship away from their families.
              </p>
            </div>
            <span className="text-[11px] font-bold text-teal-800 mt-4 block uppercase tracking-wider">
              • Relieving Distress
            </span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-amber-300 flex items-center justify-center font-bold text-lg mb-3 shadow-xs">
                📖
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-1.5">
                Rural Da'wah & Islamic Outreach
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Islamic mentorship in rural schools, organizing weekly Fiqh and Tawheed circles, youth conventions, and distributing authentic Islamic literature.
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-800 mt-4 block uppercase tracking-wider">
              • Spreading Knowledge
            </span>
          </div>
        </div>
      </div>

      {/* Noble Quranic Verses on Spending in Allah's Way (Infāq fī Sabīlillāh) */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-emerald-800" />
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Divine Words of Allah on Spending in His Way (Infāq fī Sabīlillāh)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-600 mb-6">
          Reflect upon the promises and eternal rewards pledged by the Almighty to those who spend from what He provided them.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QURAN_VERSES.map((verse, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-emerald-950/10 shadow-xs hover:shadow-md transition-shadow p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                    {verse.surah} [{verse.reference}]
                  </span>
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                    {verse.focus}
                  </span>
                </div>

                {/* Arabic Script */}
                <div className="text-right font-serif text-xl sm:text-2xl leading-loose text-emerald-950 mb-4 tracking-wide font-normal">
                  {verse.arabic}
                </div>

                {/* Transliteration */}
                <p className="text-xs italic text-gray-500 font-mono mb-3 bg-gray-50/80 p-3 rounded-xl border border-gray-100 leading-relaxed">
                  {verse.transliteration}
                </p>

                {/* Translation */}
                <p className="text-sm text-gray-800 leading-relaxed font-medium">
                  "{verse.translation}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] text-emerald-800 font-semibold flex items-center justify-between">
                <span>The Holy Qur'an</span>
                <span>Spiritual Reflection</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prophetic Sayings (Hadiths) on Charity in Allah's Way */}
      <div className="mb-12 bg-emerald-900 text-white rounded-3xl p-6 sm:p-9 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-amber-300" />
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Prophetic Traditions (Hadith) on Giving in the Way of Allah
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-emerald-200 mb-6">
          Timeless wisdom from the Beloved Messenger of Allah (ﷺ) encouraging selfless charity and continuous rewards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROPHETIC_HADITHS.map((item, idx) => (
            <div
              key={idx}
              className="bg-emerald-950/80 rounded-2xl p-5 border border-emerald-700/60 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-2">
                  {item.theme}
                </span>
                <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed italic">
                  "{item.hadith}"
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-emerald-800 text-[11px] font-mono text-emerald-300 flex items-center justify-between">
                <span>Source</span>
                <span>{item.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notify Us of Transfer Form */}
      <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
        <div className="text-center max-w-lg mx-auto mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Send className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Notify Us of Your Donation / Transfer
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1.5 leading-relaxed">
            Kindly notify our financial desk after your transfer to Lotus Bank so we can acknowledge receipt, designate the funds according to your intention, and issue an official prayer receipt.
          </p>
        </div>

        {submittedNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <span>{submittedNotice}</span>
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
                <option value="Official Chapter Da'wah & Welfare">General Chapter Da'wah & Welfare</option>
                <option value="Mosque & Corpers Lodge Expansion Project">Mosque & Corpers Lodge Expansion</option>
                <option value="NYSC Ede Orientation Camp Da'wah & Welfare">NYSC Ede Camp Da'wah & Welfare</option>
                <option value="Sadaqah Jariyah (Continuous Charity)">Sadaqah Jariyah (Continuous Charity)</option>
                <option value="Indigent Muslim Corpers Relief">Indigent Muslim Corpers Relief</option>
                <option value="Ramadan Feeding & Iftar Outreach">Ramadan Feeding & Iftar Outreach</option>
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
                <option value="Lotus Bank">Lotus Bank (1014485564)</option>
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
            className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl text-sm transition-all shadow-sm flex items-center justify-center gap-2 mt-4"
          >
            {isSubmitting ? 'Sending Notification...' : 'Submit Donation Notification'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-emerald-700" />
            Financial transparency supervised by the State Shura & Advisory Council
          </span>
          <span className="font-semibold text-emerald-800">MCAN Osun State</span>
        </div>
      </div>
    </div>
  );
};
