/**
 * Safe fetch utility that guarantees never throwing syntax errors on non-JSON HTML error pages.
 * Catches HTML error responses (such as 404 or 500) and displays a clean, user-friendly
 * error message: "Connection is not good, check back later".
 */

export interface SafeFetchResult<T = any> {
  ok: boolean;
  status: number;
  data: T | null;
  rawText?: string;
  error?: string;
}

export async function safeFetchJson<T = any>(
  url: string,
  options?: RequestInit
): Promise<SafeFetchResult<T>> {
  const FRIENDLY_CONNECTION_ERROR = 'Connection is not good, check back later';

  try {
    const res = await fetch(url, options);
    const text = await res.text();

    // Log the raw response before JSON parsing for inspection & debugging
    console.log(`[safeFetchJson] URL: ${url} | HTTP Status: ${res.status}`);
    console.log(`[safeFetchJson] Raw Response Body:\n`, text);

    // Detect HTML responses or server error pages (404, 500, etc.)
    const trimmed = text.trim();
    const isHtml =
      trimmed.startsWith('<') ||
      trimmed.toLowerCase().startsWith('<!doctype') ||
      trimmed.includes('<html') ||
      trimmed.startsWith('The page') ||
      trimmed.includes('<pre>Cannot');

    // If server returned 404, 500 or any HTML error response
    if (res.status === 404 || res.status === 500 || res.status >= 500 || (res.status >= 400 && isHtml)) {
      console.warn(`[safeFetchJson] Server returned HTTP ${res.status} or an HTML error page. Suppressing 404/500 and displaying friendly notice.`);
      return {
        ok: false,
        status: res.status,
        data: null,
        rawText: text,
        error: FRIENDLY_CONNECTION_ERROR
      };
    }

    let parsedData: T | null = null;
    let parseError: string | undefined;

    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        parsedData = JSON.parse(text) as T;
      } catch (err: any) {
        console.warn(`[safeFetchJson] JSON parsing failed for raw response from ${url}:`, err);
        parseError = FRIENDLY_CONNECTION_ERROR;
      }
    } else {
      console.warn(`[safeFetchJson] Expected JSON but received non-JSON text from ${url}:`, trimmed);
      parseError = FRIENDLY_CONNECTION_ERROR;
    }

    // If HTTP status is not OK (e.g., 400 validation error returned as JSON)
    if (!res.ok) {
      const serverErrMsg = (parsedData as any)?.error || (parsedData as any)?.message;
      // If the error message mentions 404, 500, or internal error, replace with user-friendly text
      const friendlyError =
        serverErrMsg && !serverErrMsg.includes('404') && !serverErrMsg.includes('500') && !serverErrMsg.toLowerCase().includes('internal server')
          ? serverErrMsg
          : FRIENDLY_CONNECTION_ERROR;

      return {
        ok: false,
        status: res.status,
        data: parsedData,
        rawText: text,
        error: friendlyError
      };
    }

    return {
      ok: !parseError,
      status: res.status,
      data: parsedData,
      rawText: text,
      error: parseError || (parsedData as any)?.error
    };
  } catch (err: any) {
    console.error(`[safeFetchJson] Network failure on fetch(${url}):`, err);
    return {
      ok: false,
      status: 0,
      data: null,
      error: FRIENDLY_CONNECTION_ERROR
    };
  }
}
