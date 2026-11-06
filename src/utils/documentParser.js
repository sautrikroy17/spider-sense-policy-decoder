import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

// Configure PDF.js worker URL for Vite
if (typeof window !== 'undefined' && pdfjsLib.GlobalWorkerOptions) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
}

/**
 * Extracts plain text from an uploaded File object (PDF, TXT, MD, etc.)
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function extractTextFromFile(file) {
  if (!file) throw new Error('No file provided');

  const extension = file.name.split('.').pop()?.toLowerCase();

  if (extension === 'pdf') {
    return extractTextFromPdf(file);
  } else {
    return extractTextFromPlainText(file);
  }
}

async function extractTextFromPdf(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true
    });
    const pdf = await loadingTask.promise;

    let fullText = '';
    // Scan up to 15 pages for policy exclusions & schedules
    const numPages = Math.min(pdf.numPages, 15);

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => (item.str !== undefined ? item.str : ''))
        .join(' ');
      if (pageText.trim()) {
        fullText += `\n[--- PAGE ${i} ---]\n` + pageText + '\n';
      }
    }

    if (!fullText.trim()) {
      throw new Error('PDF appears to be scanned or contains no extractable text layer.');
    }

    return fullText.trim();
  } catch (err) {
    console.error('PDF parsing error:', err);
    throw err;
  }
}

function extractTextFromPlainText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(new Error('Failed to read file: ' + e.target.error));
    reader.readAsText(file);
  });
}
