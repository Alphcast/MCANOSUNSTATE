import React, { useRef, useEffect, useState, useCallback } from 'react';
import QRCode from 'qrcode';
import { Download, Printer, ShieldCheck, RefreshCw, Eye, Sparkles } from 'lucide-react';
import { Member } from '../types';

interface IdCardCanvasProps {
  member: Member;
  onReprint?: () => void;
}

// Utility to cleanly preload images for synchronous canvas rendering
const preloadImage = (src: string): Promise<HTMLImageElement | null> => {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    if (!src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
};

export const IdCardCanvas: React.FC<IdCardCanvasProps> = ({ member }) => {
  const [activeSide, setActiveSide] = useState<'both' | 'front' | 'back'>('both');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderCounterRef = useRef<number>(0);

  // Generate QR Code containing official verification URL
  useEffect(() => {
    const origin = window.location.origin;
    const verifyUrl = `${origin}?verify=${encodeURIComponent(member.verificationHash || member.stateCode)}`;
    QRCode.toDataURL(verifyUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: '#064e3b',
        light: '#ffffff'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, [member]);

  // Synchronous draw routine for the Front Canvas using preloaded assets
  const renderFrontSync = useCallback(
    (
      canvas: HTMLCanvasElement,
      assets: {
        mcanLogo: HTMLImageElement | null;
        nyscLogo: HTMLImageElement | null;
        passportImg: HTMLImageElement | null;
        qrImg: HTMLImageElement | null;
      }
    ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // CR80 dimensions: 1012 x 638 pixels (300 DPI high-def ratio)
      const w = 1012;
      const h = 638;
      canvas.width = w;
      canvas.height = h;

      // Clear any prior drawing to prevent double-rendering / smudging
      ctx.clearRect(0, 0, w, h);

      // Enable high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Solid White Base Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, w, h);

      // Subtle security hatch background lines
      ctx.save();
      ctx.strokeStyle = '#f0fdf4';
      ctx.lineWidth = 1.5;
      for (let i = -w; i < w * 2; i += 28) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + h, h);
        ctx.stroke();
      }
      ctx.restore();

      // Center MCAN Security Watermark
      if (assets.mcanLogo) {
        ctx.save();
        ctx.globalAlpha = 0.06;
        const wmSize = 340;
        ctx.drawImage(assets.mcanLogo, (w - wmSize) / 2, 175, wmSize, wmSize);
        ctx.restore();
      }

      // 2. Top Header Banner
      const headerH = 145;
      const headerGrad = ctx.createLinearGradient(0, 0, w, 0);
      headerGrad.addColorStop(0, '#064e3b');
      headerGrad.addColorStop(0.5, '#047857');
      headerGrad.addColorStop(1, '#064e3b');
      ctx.fillStyle = headerGrad;
      ctx.fillRect(0, 0, w, headerH);

      // Gold accent line beneath header
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(0, headerH, w, 7);

      // Header Typography
      ctx.textAlign = 'center';

      // Bismillah
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'bold 15px "Amiri", serif, sans-serif';
      ctx.fillText('بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ', w / 2, 30);

      // Organization Title
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('MUSLIM CORPERS ASSOCIATION OF NIGERIA', w / 2, 68);

      // Chapter
      ctx.fillStyle = '#fcd34d';
      ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('OSUN STATE CHAPTER', w / 2, 98);

      // Card Designation
      ctx.fillStyle = '#d1fae5';
      ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('OFFICIAL NYSC MEMBERSHIP IDENTIFICATION CARD', w / 2, 126);

      // Left Header: MCAN Official Crest with Gold Ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(85, 72, 48, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(85 - 48, 72 - 48, 96, 96);
      if (assets.mcanLogo) {
        ctx.drawImage(assets.mcanLogo, 85 - 45, 72 - 45, 90, 90);
      }
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(85, 72, 48, 0, Math.PI * 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // Right Header: Official NYSC Emblem (replacing former circle text with Nysc.jpg image)
      ctx.save();
      ctx.beginPath();
      ctx.arc(w - 85, 72, 48, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w - 85 - 48, 72 - 48, 96, 96);
      if (assets.nyscLogo) {
        ctx.drawImage(assets.nyscLogo, w - 85 - 46, 72 - 46, 92, 92);
      } else {
        // High-fidelity vector fallback if image was unavailable
        ctx.fillStyle = '#065f46';
        ctx.fillRect(w - 85 - 48, 72 - 48, 96, 96);
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('NYSC', w - 85, 72);
      }
      ctx.restore();

      // Outer Gold Ring around NYSC Emblem
      ctx.save();
      ctx.beginPath();
      ctx.arc(w - 85, 72, 48, 0, Math.PI * 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();

      // 3. Member Passport Photo (Left Column)
      const photoX = 60;
      const photoY = 175;
      const photoW = 210;
      const photoH = 265;

      // Outer border frame
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(photoX - 4, photoY - 4, photoW + 8, photoH + 8);
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 3;
      ctx.strokeRect(photoX - 4, photoY - 4, photoW + 8, photoH + 8);

      if (assets.passportImg) {
        ctx.drawImage(assets.passportImg, photoX, photoY, photoW, photoH);
      } else {
        // Elegant photo placeholder
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(photoX, photoY, photoW, photoH);
        ctx.fillStyle = '#94a3b8';
        ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('OFFICIAL PASSPORT', photoX + photoW / 2, photoY + photoH / 2);
      }

      // 4. Member Profile Details (Right Column)
      const detailsX = 300;
      ctx.textAlign = 'left';

      // Full Name (with dynamic font scale to prevent truncation)
      const rawName = (member.fullName || 'CORPS MEMBER').trim().toUpperCase();
      let nameFontSize = 28;
      if (rawName.length > 25) nameFontSize = 23;
      if (rawName.length > 32) nameFontSize = 19;

      ctx.fillStyle = '#064e3b';
      ctx.font = `800 ${nameFontSize}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillText(rawName, detailsX, 202);

      // Designation Pill & State Code Box Row
      const badgeY = 220;
      const postText = (member.mcanPost || 'Corps Member').toUpperCase();
      ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
      const postMetrics = ctx.measureText(postText);
      const pillW = Math.max(130, postMetrics.width + 32);
      const pillH = 32;

      // MCAN Role Pill
      ctx.fillStyle = '#047857';
      ctx.beginPath();
      ctx.roundRect(detailsX, badgeY, pillW, pillH, 6);
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(postText, detailsX + 16, badgeY + 21);

      // State Code Box
      const stateCodeX = detailsX + pillW + 18;
      const stateCodeBoxW = 260;
      ctx.fillStyle = '#f0fdf4';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(stateCodeX, badgeY, stateCodeBoxW, pillH, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('STATE CODE:', stateCodeX + 14, badgeY + 21);

      ctx.fillStyle = '#b91c1c';
      ctx.font = '800 17px "JetBrains Mono", monospace';
      ctx.fillText(member.stateCode, stateCodeX + 110, badgeY + 22);

      // Key-Value Grid: structured with generous label width (215px) so text NEVER collides
      const rowStart = 280;
      const rowStep = 32;
      const labelX = detailsX;
      const valueX = 515; // 215px spacing ensures labels never overlap with values

      const fields = [
        { label: 'MEMBERSHIP ID:', value: member.id, isMono: true, color: '#064e3b' },
        { label: 'LOCAL GOVT (LGA):', value: `${member.lga} LGA, Osun State`, isMono: false, color: '#0f172a' },
        { label: 'PRIMARY ASSIGNMENT:', value: member.ppa, isMono: false, color: '#0f172a' },
        { label: 'PHONE NUMBER:', value: member.phoneNumber, isMono: false, color: '#0f172a' },
        { label: 'SERVICE BATCH:', value: member.batch, isMono: false, color: '#0f172a' },
        { label: 'BLOOD GROUP:', value: member.bloodGroup || 'N/A', isMono: true, color: '#b91c1c' }
      ];

      fields.forEach((f, idx) => {
        const y = rowStart + idx * rowStep;
        if (y > 470) return;

        // Label
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(f.label, labelX, y);

        // Value
        ctx.fillStyle = f.color;
        ctx.font = f.isMono
          ? '800 16px "JetBrains Mono", monospace'
          : '600 15px "Plus Jakarta Sans", sans-serif';

        // Constrain text length to avoid overflowing into QR code area
        let displayVal = f.value || 'N/A';
        if (displayVal.length > 36) {
          displayVal = displayVal.substring(0, 33) + '...';
        }
        ctx.fillText(displayVal, valueX, y);
      });

      // 5. Signatures and Verification Section (Bottom)
      const bottomY = 485;

      // QR Code on Bottom Right
      if (assets.qrImg) {
        const qrSize = 120;
        const qrX = w - qrSize - 40;
        const qrY = bottomY + 2;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8);

        ctx.drawImage(assets.qrImg, qrX, qrY, qrSize, qrSize);

        ctx.fillStyle = '#065f46';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SCAN TO VERIFY', qrX + qrSize / 2, qrY + qrSize + 16);
      }

      // Executive Signatures
      ctx.textAlign = 'center';

      // Signature 1: State Amir
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(detailsX, bottomY + 74);
      ctx.lineTo(detailsX + 160, bottomY + 74);
      ctx.stroke();

      ctx.font = 'italic 16px "Amiri", serif';
      ctx.fillStyle = '#064e3b';
      ctx.fillText('Ustadh Ibrahim Alabi', detailsX + 80, bottomY + 67);

      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText('STATE AMIR', detailsX + 80, bottomY + 91);

      ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText('MCAN Osun State Chapter', detailsX + 80, bottomY + 103);

      // Signature 2: State Coordinator
      const sig2X = detailsX + 210;
      ctx.beginPath();
      ctx.moveTo(sig2X, bottomY + 74);
      ctx.lineTo(sig2X + 160, bottomY + 74);
      ctx.stroke();

      ctx.font = 'italic 16px "Amiri", serif';
      ctx.fillStyle = '#064e3b';
      ctx.fillText('Dr. A. A. Olanrewaju', sig2X + 80, bottomY + 67);

      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText('STATE COORDINATOR', sig2X + 80, bottomY + 91);

      ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#64748b';
      ctx.fillText('Advisory Council', sig2X + 80, bottomY + 103);

      // 6. Bottom Secretariat Ribbon
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, h - 22, w, 22);

      ctx.fillStyle = '#fef3c7';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        'STATE SECRETARIAT: OPPOSITE OLD GARAGE / RAILWAY CORRIDOR, OSOGBO, OSUN STATE • WWW.MCANOSUN.ORG.NG',
        w / 2,
        h - 7
      );
    },
    [member]
  );

  // Synchronous draw routine for the Back Canvas using preloaded assets
  const renderBackSync = useCallback(
    (
      canvas: HTMLCanvasElement,
      assets: {
        mcanLogo: HTMLImageElement | null;
      }
    ) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const w = 1012;
      const h = 638;
      canvas.width = w;
      canvas.height = h;

      // Clear any prior drawing
      ctx.clearRect(0, 0, w, h);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Soft Card Background
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, w, h);

      // Security Watermark on Back
      if (assets.mcanLogo) {
        ctx.save();
        ctx.globalAlpha = 0.08;
        const wmSize = 380;
        ctx.drawImage(assets.mcanLogo, (w - wmSize) / 2, (h - wmSize) / 2 + 25, wmSize, wmSize);
        ctx.restore();

        // Mini Seal in top bar
        ctx.save();
        ctx.beginPath();
        ctx.arc(48, 30, 20, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(28, 10, 40, 40);
        ctx.drawImage(assets.mcanLogo, 28, 10, 40, 40);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(48, 30, 20, 0, Math.PI * 2);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Top Header Bar
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, 0, w, 60);

      // Gold Strip
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(0, 60, w, 6);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TERMS OF ISSUANCE & CARDHOLDER NOTICE', w / 2, 38);

      // 3. Quranic Verse & Translation
      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 22px "Amiri", serif';
      ctx.fillText('وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ', w / 2, 106);

      ctx.fillStyle = '#475569';
      ctx.font = 'italic 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(
        '"And cooperate in righteousness and piety, but do not cooperate in sin and aggression." — Surah Al-Ma\'idah (5:2)',
        w / 2,
        132
      );

      // 4. Conditions of Use Container
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(60, 155, w - 120, 245, 10);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('CONDITIONS OF MEMBERSHIP CARD USE:', 90, 190);

      const rules = [
        '1. This identification card is the bonafide property of the Muslim Corpers Association of Nigeria (MCAN), Osun State Chapter.',
        '2. It must be held by the registered corps member and presented upon request at all MCAN programs, Corpers Lodges, and NYSC Camp Da\'wah activities.',
        '3. Card is strictly non-transferable. Any falsification, alteration, or misuse of this card invalidates membership privileges and is subject to NYSC & MCAN disciplinary action.',
        '4. Loss or damage of this card should be reported immediately to the State Public Relations Officer or Welfare Directorate.',
        `5. Validity: Valid throughout the holder's official National Youth Service Year in Osun State (Exp: ${member.batch}).`
      ];

      rules.forEach((rule, idx) => {
        ctx.fillStyle = '#334155';
        ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(rule, 90, 225 + idx * 30);
      });

      // 5. Emergency Return Contact Box
      const returnBoxY = 415;
      ctx.fillStyle = '#ecfdf5';
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(60, returnBoxY, w - 120, 140, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#065f46';
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('IF FOUND, PLEASE RETURN TO:', 90, returnBoxY + 30);

      ctx.fillStyle = '#1e293b';
      ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('MCAN Osun State Chapter Secretariat & Central Mosque', 90, returnBoxY + 56);

      ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#475569';
      ctx.fillText('Opposite Old Garage / Railway Corridor, P.O. Box 1284, Osogbo, Osun State, Nigeria', 90, returnBoxY + 78);

      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#047857';
      ctx.fillText(
        'State Amir Helpline: +234 803 456 7890 | Welfare Desk: +234 814 987 6543 | Web: www.mcanosun.org.ng',
        90,
        returnBoxY + 104
      );

      // Security Verification Hash
      ctx.fillStyle = '#64748b';
      ctx.font = '600 11px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`SECURITY VERIFICATION HASH: ${member.verificationHash}`, w - 90, returnBoxY + 124);

      // 6. Bottom Ribbon
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, h - 22, w, 22);

      ctx.fillStyle = '#fef3c7';
      ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MUSLIM CORPERS ASSOCIATION OF NIGERIA (MCAN) • OSUN STATE CHAPTER', w / 2, h - 7);
    },
    [member]
  );

  // Coordinated Render Effect: Preload all images and render synchronously to prevent race conditions
  useEffect(() => {
    const renderId = ++renderCounterRef.current;
    let isCancelled = false;

    const performDraw = async () => {
      // 1. Preload all necessary image assets
      const [mcanLogo, nyscLogo, passportImg, qrImg] = await Promise.all([
        preloadImage('/mcan-logo.png'),
        preloadImage('/nysc-logo.png'),
        member.passportUrl ? preloadImage(member.passportUrl) : Promise.resolve(null),
        qrDataUrl ? preloadImage(qrDataUrl) : Promise.resolve(null)
      ]);

      // 2. Ensure web fonts are completely resolved
      try {
        await (document as any).fonts?.ready;
      } catch {}

      // If a newer render was triggered while loading, cancel this obsolete execution
      if (isCancelled || renderId !== renderCounterRef.current) {
        return;
      }

      // 3. Perform synchronized drawing
      if (frontCanvasRef.current) {
        renderFrontSync(frontCanvasRef.current, {
          mcanLogo,
          nyscLogo,
          passportImg,
          qrImg
        });
      }

      if (backCanvasRef.current) {
        renderBackSync(backCanvasRef.current, {
          mcanLogo
        });
      }
    };

    performDraw();

    return () => {
      isCancelled = true;
    };
  }, [member, qrDataUrl, renderFrontSync, renderBackSync]);

  // Export and Download Handlers
  const handleDownload = (type: 'front' | 'back' | 'both', format: 'png' | 'jpeg') => {
    setIsGenerating(true);
    setTimeout(() => {
      try {
        if (type === 'front' && frontCanvasRef.current) {
          const url = frontCanvasRef.current.toDataURL(`image/${format}`, 0.95);
          const a = document.createElement('a');
          a.download = `MCAN_ID_FRONT_${member.stateCode.replace(/\//g, '_')}.${format}`;
          a.href = url;
          a.click();
        } else if (type === 'back' && backCanvasRef.current) {
          const url = backCanvasRef.current.toDataURL(`image/${format}`, 0.95);
          const a = document.createElement('a');
          a.download = `MCAN_ID_BACK_${member.stateCode.replace(/\//g, '_')}.${format}`;
          a.href = url;
          a.click();
        } else if (type === 'both' && frontCanvasRef.current && backCanvasRef.current) {
          const combined = document.createElement('canvas');
          combined.width = 1012;
          combined.height = 638 * 2 + 50;
          const ctx = combined.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#f1f5f9';
            ctx.fillRect(0, 0, combined.width, combined.height);
            ctx.drawImage(frontCanvasRef.current, 0, 0);
            ctx.drawImage(backCanvasRef.current, 0, 638 + 50);

            const url = combined.toDataURL(`image/${format}`, 0.95);
            const a = document.createElement('a');
            a.download = `MCAN_ID_COMPLETE_SHEET_${member.stateCode.replace(/\//g, '_')}.${format}`;
            a.href = url;
            a.click();
          }
        }
      } catch (err) {
        console.error('Download error:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 100);
  };

  // Print PDF / Card Document
  const handlePrintCard = () => {
    if (!frontCanvasRef.current || !backCanvasRef.current) return;

    const frontImg = frontCanvasRef.current.toDataURL('image/png');
    const backImg = backCanvasRef.current.toDataURL('image/png');

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print your official MCAN ID card.');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>MCAN Osun State ID Card - ${member.fullName} (${member.stateCode})</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm;
            }
            body {
              font-family: 'Plus Jakarta Sans', Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #1e293b;
              text-align: center;
              background-color: #ffffff;
            }
            .header {
              margin-bottom: 25px;
              border-bottom: 2px solid #065f46;
              padding-bottom: 12px;
            }
            .header h1 {
              color: #064e3b;
              margin: 0;
              font-size: 22px;
              text-transform: uppercase;
            }
            .header p {
              margin: 4px 0 0;
              color: #64748b;
              font-size: 13px;
            }
            .cards-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 30px;
              margin: 20px auto;
            }
            .card-wrapper {
              width: 85.6mm;
              height: 53.98mm;
              box-shadow: 0 2px 8px rgba(0,0,0,0.15);
              border-radius: 4mm;
              overflow: hidden;
              border: 1px solid #cbd5e1;
              page-break-inside: avoid;
            }
            .card-wrapper img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              display: block;
            }
            .label {
              font-size: 11px;
              font-weight: bold;
              color: #065f46;
              text-transform: uppercase;
              margin-bottom: 6px;
            }
            .instructions {
              margin-top: 30px;
              font-size: 12px;
              color: #475569;
              max-width: 500px;
              margin-left: auto;
              margin-right: auto;
              border: 1px dashed #cbd5e1;
              padding: 15px;
              border-radius: 8px;
            }
            @media print {
              .no-print { display: none; }
              body { padding: 0; }
              .card-wrapper { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/mcan-logo.png" alt="MCAN Logo" style="width: 72px; height: 72px; object-fit: contain; margin: 0 auto 8px; display: block;" />
            <h1>Muslim Corpers Association of Nigeria (MCAN)</h1>
            <p>Osun State Chapter • Official Digital Identification Card</p>
          </div>
          <div class="no-print" style="margin-bottom: 20px;">
            <button onclick="window.print()" style="padding: 10px 24px; background: #065f46; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; font-size: 14px;">
              🖨️ Print / Save as PDF
            </button>
            <span style="margin-left: 15px; font-size: 13px; color: #64748b;">(Choose "Save as PDF" in destination printer menu)</span>
          </div>
          <div class="cards-container">
            <div>
              <div class="label">Front Side (CR80 Standard Size)</div>
              <div class="card-wrapper">
                <img src="${frontImg}" alt="ID Card Front" />
              </div>
            </div>
            <div>
              <div class="label">Back Side (CR80 Standard Size)</div>
              <div class="card-wrapper">
                <img src="${backImg}" alt="ID Card Back" />
              </div>
            </div>
          </div>
          <div class="instructions">
            <strong>Printing Instructions:</strong> Print on heavy card stock (300gsm) or PVC ID card paper at 100% scale (Do not fit to page). Cut along the border and laminate for official field verification.
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-sm p-5 sm:p-7">
      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Officially Verified Member
            </span>
            <span className="text-xs font-mono font-semibold text-gray-500">
              {member.id}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
            Official MCAN Osun Membership ID Card
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            State Code: <strong className="text-emerald-900">{member.stateCode}</strong> • Designation: <strong className="text-emerald-900">{member.mcanPost}</strong>
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveSide('both')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSide === 'both' ? 'bg-emerald-800 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Both Sides
          </button>
          <button
            onClick={() => setActiveSide('front')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSide === 'front' ? 'bg-emerald-800 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Front Side
          </button>
          <button
            onClick={() => setActiveSide('back')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeSide === 'back' ? 'bg-emerald-800 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Back Side
          </button>
        </div>
      </div>

      {/* Real Card Previews */}
      <div className="py-6 flex flex-col items-center justify-center gap-8">
        {/* Front Canvas Container */}
        {(activeSide === 'both' || activeSide === 'front') && (
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Front Identification Face
              </span>
              <span className="text-xs text-gray-400 font-mono">Standard CR80 85.6 × 53.98 mm</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-900/20 shadow-lg bg-gray-50 transition-transform duration-200 hover:shadow-xl">
              <canvas
                ref={frontCanvasRef}
                className="w-full h-auto block"
                style={{ aspectRatio: '1012 / 638' }}
              />
            </div>
          </div>
        )}

        {/* Back Canvas Container */}
        {(activeSide === 'both' || activeSide === 'back') && (
          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                Back Notice & Verification Face
              </span>
              <span className="text-xs text-gray-400 font-mono">Terms & Helpline</span>
            </div>
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-900/20 shadow-lg bg-gray-50 transition-transform duration-200 hover:shadow-xl">
              <canvas
                ref={backCanvasRef}
                className="w-full h-auto block"
                style={{ aspectRatio: '1012 / 638' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Export & Download Actions Bar */}
      <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Print PDF Button */}
          <button
            onClick={handlePrintCard}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-sm font-semibold hover:bg-emerald-900 transition-all shadow-sm active:scale-98 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Print ID Card / Save as PDF</span>
          </button>

          {/* Quick Refresh Re-render */}
          <button
            onClick={() => {
              renderCounterRef.current++;
              // Trigger state update or re-eval
              setActiveSide((s) => s);
            }}
            title="Redraw Canvas"
            className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Image Download Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium hidden md:inline">Download Image:</span>

          <button
            onClick={() => handleDownload('front', 'png')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-700/30 bg-emerald-50 text-emerald-900 font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Front (PNG)</span>
          </button>

          <button
            onClick={() => handleDownload('back', 'png')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-700/30 bg-emerald-50 text-emerald-900 font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Back (PNG)</span>
          </button>

          <button
            onClick={() => handleDownload('both', 'png')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-600/40 bg-amber-50 text-amber-900 font-bold hover:bg-amber-100 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-700" />
            <span>Full Sheet (PNG)</span>
          </button>

          <button
            onClick={() => handleDownload('both', 'jpeg')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            <span>Full Sheet (JPG)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
