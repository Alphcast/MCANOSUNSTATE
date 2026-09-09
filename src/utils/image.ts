/**
 * Image processing and compression utilities for MCAN ID Card generation.
 * Automatically resizes and compresses user-uploaded portraits to lightweight,
 * high-clarity passport photos (typically ~25KB - 45KB), preventing network
 * payload errors and canvas tainting.
 */

export async function compressImageFile(
  file: File,
  maxWidth = 480,
  maxHeight = 600,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read selected image file.'));

    reader.onload = (event) => {
      const src = event.target?.result as string;
      if (!src) {
        reject(new Error('Empty file content.'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          // Calculate dimensions preserving aspect ratio
          let { width, height } = img;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            // Fallback to original if canvas context unavailable
            resolve(src);
            return;
          }

          // Smooth rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // White background for transparent PNGs
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);

          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedDataUrl);
        } catch (err) {
          console.warn('Canvas compression error, using raw image:', err);
          resolve(src);
        }
      };

      img.onerror = () => {
        // If image object fails to parse, return raw data url as fallback
        resolve(src);
      };

      img.src = src;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Converts any image URL to a local Data URL to prevent canvas security tainting.
 */
export async function urlToDataUrl(url: string): Promise<string> {
  if (url.startsWith('data:')) {
    return url;
  }

  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error('Fetch failed');
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    // If CORS fetch fails, return original URL
    return url;
  }
}

/**
 * Generates an instant high-quality fallback SVG passport portrait
 */
export function generateDefaultPassport(gender: 'Male' | 'Female', name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || '')
    .join('');

  const bg = gender === 'Female' ? '#047857' : '#065f46';
  const accent = gender === 'Female' ? '#f59e0b' : '#34d399';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
    <rect width="400" height="500" fill="${bg}"/>
    <circle cx="200" cy="180" r="90" fill="#f8fafc" opacity="0.95"/>
    <circle cx="200" cy="170" r="65" fill="${accent}"/>
    <path d="M 100 450 C 100 320, 300 320, 300 450 Z" fill="#f8fafc" opacity="0.95"/>
    <text x="200" y="190" font-family="sans-serif" font-size="48" font-weight="bold" fill="#ffffff" text-anchor="middle">${initials || 'MC'}</text>
    <text x="200" y="480" font-family="sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="1">MCAN OSUN STATE</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
