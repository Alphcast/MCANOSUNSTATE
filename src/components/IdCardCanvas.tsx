import React, { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Printer, ShieldCheck, RefreshCw, Eye, Sparkles } from 'lucide-react';
import { Member } from '../types';

interface IdCardCanvasProps {
  member: Member;
  onReprint?: () => void;
}

export const IdCardCanvas: React.FC<IdCardCanvasProps> = ({ member }) => {
  const [activeSide, setActiveSide] = useState<'both' | 'front' | 'back'>('both');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const frontCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const backCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate QR Code containing verification URL
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

  // Draw High-Resolution Front Canvas
  const drawFrontCanvas = async (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Card dimensions: 1012 x 638 (CR80 ratio @ 300 DPI)
    const w = 1012;
    const h = 638;
    canvas.width = w;
    canvas.height = h;

    // 1. Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    // Subtle security pattern / watermark
    ctx.save();
    ctx.strokeStyle = '#f0fdf4';
    ctx.lineWidth = 1.5;
    for (let i = -w; i < w * 2; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }
    ctx.restore();

    // 1b. Subtle MCAN Security Watermark in Center
    try {
      const wmImg = new Image();
      await new Promise<void>((resolve) => {
        wmImg.onload = () => resolve();
        wmImg.onerror = () => resolve();
        wmImg.src = '/mcan-logo.png';
      });
      ctx.save();
      ctx.globalAlpha = 0.07;
      const wmSize = 320;
      ctx.drawImage(wmImg, (w - wmSize) / 2, 175, wmSize, wmSize);
      ctx.restore();
    } catch {
      // Continue without watermark if unavailable
    }

    // 2. Top Header Band (Emerald Green)
    const headerH = 145;
    const gradient = ctx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, '#064e3b');
    gradient.addColorStop(0.5, '#047857');
    gradient.addColorStop(1, '#064e3b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, headerH);

    // Gold accent divider line
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, headerH, w, 8);

    // Header Text
    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 15px "Cinzel", serif, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ', w / 2, 30);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 27px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('MUSLIM CORPERS ASSOCIATION OF NIGERIA', w / 2, 68);

    ctx.fillStyle = '#fcd34d';
    ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('OSUN STATE CHAPTER', w / 2, 98);

    ctx.fillStyle = '#d1fae5';
    ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('OFFICIAL NYSC MEMBERSHIP IDENTIFICATION CARD', w / 2, 126);

    // Left MCAN Badge Logo Circle
    try {
      const logoImg = new Image();
      await new Promise<void>((resolve) => {
        logoImg.onload = () => resolve();
        logoImg.onerror = () => resolve();
        logoImg.src = '/mcan-logo.png';
      });
      ctx.save();
      ctx.beginPath();
      ctx.arc(85, 72, 48, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(85 - 48, 72 - 48, 96, 96);
      ctx.drawImage(logoImg, 85 - 48, 72 - 48, 96, 96);
      ctx.restore();

      // Outer gold border ring
      ctx.save();
      ctx.beginPath();
      ctx.arc(85, 72, 48, 0, Math.PI * 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.restore();
    } catch {
      ctx.save();
      ctx.beginPath();
      ctx.arc(85, 72, 48, 0, Math.PI * 2);
      ctx.fillStyle = '#065f46';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 19px "Cinzel", serif';
      ctx.textAlign = 'center';
      ctx.fillText('MCAN', 85, 72);
      ctx.restore();
    }

    // Right NYSC Emblem Circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(w - 85, 72, 48, 0, Math.PI * 2);
    ctx.fillStyle = '#065f46';
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NYSC', w - 85, 72);
    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('CORPS', w - 85, 90);
    ctx.restore();

    // 3. Member Passport Image
    const photoX = 60;
    const photoY = 175;
    const photoW = 210;
    const photoH = 260;

    // Draw photo border / card frame
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(photoX - 4, photoY - 4, photoW + 8, photoH + 8);
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.strokeRect(photoX - 4, photoY - 4, photoW + 8, photoH + 8);

    // Load and draw member image
    if (member.passportUrl) {
      try {
        const img = new Image();
        if (!member.passportUrl.startsWith('data:')) {
          img.crossOrigin = 'anonymous';
        }
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = member.passportUrl;
        });
        ctx.drawImage(img, photoX, photoY, photoW, photoH);
      } catch {
        // Fallback placeholder
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(photoX, photoY, photoW, photoH);
        ctx.fillStyle = '#6b7280';
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('PASSPORT PHOTO', photoX + photoW / 2, photoY + photoH / 2);
      }
    }

    // Official MCAN Seal watermark under member details
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.fillStyle = '#065f46';
    ctx.beginPath();
    ctx.arc(600, 360, 180, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Member Details (Right of photo)
    const detailsX = 310;
    ctx.textAlign = 'left';

    // Full Name
    ctx.fillStyle = '#064e3b';
    ctx.font = '800 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(member.fullName.toUpperCase(), detailsX, 205);

    // MCAN Post Badge (Pill)
    const postText = member.mcanPost.toUpperCase();
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    const postMetrics = ctx.measureText(postText);
    const pillW = postMetrics.width + 36;
    const pillH = 30;

    ctx.fillStyle = '#047857';
    ctx.beginPath();
    ctx.roundRect(detailsX, 220, pillW, pillH, 6);
    ctx.fill();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(postText, detailsX + 18, 241);

    // State Code (Prominent box)
    ctx.fillStyle = '#f0fdf4';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(detailsX + pillW + 20, 220, 260, pillH, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('STATE CODE:', detailsX + pillW + 32, 240);
    ctx.fillStyle = '#b91c1c';
    ctx.font = '800 17px "JetBrains Mono", monospace';
    ctx.fillText(member.stateCode, detailsX + pillW + 128, 241);

    // Key-Value Grid
    const rowStart = 285;
    const rowH = 32;

    const fields = [
      { label: 'MEMBERSHIP ID:', value: member.id, highlight: true },
      { label: 'LOCAL GOVT (LGA):', value: `${member.lga} LGA, Osun State` },
      { label: 'PRIMARY ASSIGNMENT (PPA):', value: member.ppa },
      { label: 'PHONE NUMBER:', value: member.phoneNumber },
      { label: 'SERVICE BATCH:', value: member.batch },
      { label: 'BLOOD GROUP:', value: member.bloodGroup || 'N/A' }
    ];

    fields.forEach((f, idx) => {
      const y = rowStart + idx * rowH;
      if (y > 470) return;

      ctx.fillStyle = '#64748b';
      ctx.font = 'bold 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(f.label, detailsX, y);

      ctx.fillStyle = f.highlight ? '#064e3b' : '#0f172a';
      ctx.font = f.highlight
        ? '800 16px "JetBrains Mono", monospace'
        : '600 15px "Plus Jakarta Sans", sans-serif';

      // Truncate long PPA if needed
      let displayVal = f.value;
      if (displayVal.length > 38) {
        displayVal = displayVal.substring(0, 35) + '...';
      }
      ctx.fillText(displayVal, detailsX + 175, y);
    });

    // 5. Bottom Verification & Signatures Bar
    const bottomY = 485;

    // Draw QR Code on Bottom Right
    if (qrDataUrl) {
      try {
        const qrImg = new Image();
        await new Promise((res) => {
          qrImg.onload = res;
          qrImg.src = qrDataUrl;
        });
        const qrSize = 120;
        const qrX = w - qrSize - 40;
        const qrY = bottomY + 5;

        // QR Background box
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.strokeRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8);

        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

        ctx.fillStyle = '#065f46';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SCAN TO VERIFY', qrX + qrSize / 2, qrY + qrSize + 16);
      } catch (err) {
        console.error('QR draw error', err);
      }
    }

    // Signatures
    ctx.textAlign = 'center';

    // Signature 1: State Amir
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(310, bottomY + 75);
    ctx.lineTo(470, bottomY + 75);
    ctx.stroke();

    // Mock cursive signature
    ctx.font = 'italic 16px "Amiri", serif';
    ctx.fillStyle = '#064e3b';
    ctx.fillText('Ustadh Ibrahim Alabi', 390, bottomY + 68);

    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText('STATE AMIR', 390, bottomY + 92);
    ctx.font = '9px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('MCAN Osun State Chapter', 390, bottomY + 104);

    // Signature 2: State Coordinator
    ctx.beginPath();
    ctx.moveTo(520, bottomY + 75);
    ctx.lineTo(680, bottomY + 75);
    ctx.stroke();

    ctx.font = 'italic 16px "Amiri", serif';
    ctx.fillStyle = '#064e3b';
    ctx.fillText('Dr. A. A. Olanrewaju', 600, bottomY + 68);

    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText('STATE COORDINATOR', 600, bottomY + 92);
    ctx.font = '9px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Advisory Council', 600, bottomY + 104);

    // Bottom Footer Ribbon
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
  };

  // Draw High-Resolution Back Canvas
  const drawBackCanvas = async (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 1012;
    const h = 638;
    canvas.width = w;
    canvas.height = h;

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, w, h);

    // MCAN Security Watermark on Back
    try {
      const logoImg = new Image();
      await new Promise<void>((resolve) => {
        logoImg.onload = () => resolve();
        logoImg.onerror = () => resolve();
        logoImg.src = '/mcan-logo.png';
      });
      ctx.save();
      ctx.globalAlpha = 0.08;
      const wmSize = 380;
      ctx.drawImage(logoImg, (w - wmSize) / 2, (h - wmSize) / 2 + 30, wmSize, wmSize);
      ctx.restore();

      // Top-Left Bar Mini Seal
      ctx.save();
      ctx.beginPath();
      ctx.arc(50, 30, 22, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(28, 8, 44, 44);
      ctx.drawImage(logoImg, 28, 8, 44, 44);
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.arc(50, 30, 22, 0, Math.PI * 2);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();
    } catch {
      // Continue if logo fails
    }

    // Green Top Bar
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, 0, w, 60);

    // Gold strip
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(0, 60, w, 6);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TERMS OF ISSUANCE & CARDHOLDER NOTICE', w / 2, 38);

    // Quranic Verse in Back Center
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 22px "Amiri", serif';
    ctx.fillText('وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ', w / 2, 110);

    ctx.fillStyle = '#475569';
    ctx.font = 'italic 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('"And cooperate in righteousness and piety, but do not cooperate in sin and aggression." — Surah Al-Ma\'idah (5:2)', w / 2, 134);

    // Instructions Box
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(60, 160, w - 120, 240, 10);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CONDITIONS OF MEMBERSHIP CARD USE:', 90, 195);

    const rules = [
      '1. This identification card is the bonafide property of the Muslim Corpers Association of Nigeria (MCAN), Osun State Chapter.',
      '2. It must be held by the registered corps member and presented upon request at all MCAN programs, Corpers Lodges, and NYSC Camp Da\'wah activities.',
      '3. Card is strictly non-transferable. Any falsification, alteration, or misuse of this card invalidates membership privileges and is subject to NYSC & MCAN disciplinary action.',
      '4. Loss or damage of this card should be reported immediately to the State Public Relations Officer or Welfare Directorate.',
      '5. Validity: Valid throughout the holder\'s official National Youth Service Year in Osun State (Exp: ' + member.batch + ').'
    ];

    rules.forEach((rule, idx) => {
      ctx.fillStyle = '#334155';
      ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(rule, 90, 230 + idx * 30);
    });

    // Emergency & Return Contacts Box
    const returnBoxY = 425;
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
    ctx.fillText('State Amir Helpline: +234 803 456 7890 | Welfare Desk: +234 814 987 6543 | Web: www.mcanosun.org.ng', 90, returnBoxY + 104);

    // Verification Hash display
    ctx.fillStyle = '#64748b';
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`SECURITY VERIFICATION HASH: ${member.verificationHash}`, w - 90, returnBoxY + 124);

    // Bottom border
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, h - 22, w, 22);

    ctx.fillStyle = '#fef3c7';
    ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MUSLIM CORPERS ASSOCIATION OF NIGERIA (MCAN) • OSUN STATE CHAPTER', w / 2, h - 7);
  };

  // Render on mount and update
  useEffect(() => {
    if (frontCanvasRef.current) {
      drawFrontCanvas(frontCanvasRef.current);
    }
    if (backCanvasRef.current) {
      drawBackCanvas(backCanvasRef.current);
    }
  }, [member, qrDataUrl]);

  // Download Handlers
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
          // Stitch both onto a single sheet
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

  // Print as PDF / Card Document
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
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSide === 'both' ? 'bg-emerald-800 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Both Sides
          </button>
          <button
            onClick={() => setActiveSide('front')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSide === 'front' ? 'bg-emerald-800 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Front Side
          </button>
          <button
            onClick={() => setActiveSide('back')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 text-white text-sm font-semibold hover:bg-emerald-900 transition-all shadow-sm active:scale-98"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Print ID Card / Save as PDF</span>
          </button>

          {/* Quick Refresh Re-render */}
          <button
            onClick={() => {
              if (frontCanvasRef.current) drawFrontCanvas(frontCanvasRef.current);
              if (backCanvasRef.current) drawBackCanvas(backCanvasRef.current);
            }}
            title="Redraw Canvas"
            className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
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
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-700/30 bg-emerald-50 text-emerald-900 font-semibold hover:bg-emerald-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Front (PNG)</span>
          </button>

          <button
            onClick={() => handleDownload('back', 'png')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-emerald-700/30 bg-emerald-50 text-emerald-900 font-semibold hover:bg-emerald-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-emerald-700" />
            <span>Back (PNG)</span>
          </button>

          <button
            onClick={() => handleDownload('both', 'png')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-600/40 bg-amber-50 text-amber-900 font-bold hover:bg-amber-100 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-amber-700" />
            <span>Full Sheet (PNG)</span>
          </button>

          <button
            onClick={() => handleDownload('both', 'jpeg')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-gray-600" />
            <span>Full Sheet (JPG)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
