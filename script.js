/**
 * Resume PDF Export Script
 * Uses html2pdf.js for A4-constrained PDF generation
 */

document.addEventListener('DOMContentLoaded', function () {
  const exportBtn = document.getElementById('exportPdf');
  const resumeElement = document.getElementById('resume');

  // PDF Export Configuration
  const pdfOptions = {
    margin: 0,
    filename: 'Resume-Saumil-Shah-Exported.pdf',
    image: {
      type: 'jpeg',
      quality: 0.98
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      avoid: ['section', '.experience-item', '.project-item', '.education-item']
    }
  };

  // Export to PDF
  exportBtn.addEventListener('click', function () {
    // Add exporting state
    exportBtn.disabled = true;
    exportBtn.innerHTML = '⏳ <span class="btn-text">Generating PDF...</span>';

    // Temporarily hide contenteditable visual cues
    const editables = document.querySelectorAll('[contenteditable="true"]');
    editables.forEach(el => {
      el.style.backgroundColor = 'transparent';
      el.blur();
    });

    // Generate PDF
    html2pdf()
      .set(pdfOptions)
      .from(resumeElement)
      .save()
      .then(() => {
        // Reset button
        exportBtn.disabled = false;
        exportBtn.innerHTML = '📄 <span class="btn-text">Export PDF</span>';
      })
      .catch((error) => {
        console.error('PDF Export Error:', error);
        exportBtn.disabled = false;
        exportBtn.innerHTML = '📄 <span class="btn-text">Export PDF</span>';
        alert('Error generating PDF. Please try again.');
      });
  });

  // Save content to localStorage on blur
  document.querySelectorAll('[contenteditable="true"]').forEach(el => {
    el.addEventListener('blur', saveContent);
  });

  // Load content on startup
  window.addEventListener('load', loadContent);

  // Add reset functionality
  document.getElementById('resetContent').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all content? This will clear your saved edits and reload the default resume.')) {
      localStorage.removeItem('resumeContent');
      location.reload();
    }
  });

  // Load saved content on page load
  loadContent();



  /**
   * Save all editable content to localStorage
   */
  function saveContent() {
    const editables = document.querySelectorAll('[contenteditable="true"]');
    const content = {};

    editables.forEach((el, index) => {
      content[`editable_${index}`] = el.innerHTML;
    });

    localStorage.setItem('resumeContent', JSON.stringify(content));
  }

  /**
   * Load saved content from localStorage
   */
  function loadContent() {
    const saved = localStorage.getItem('resumeContent');

    if (saved) {
      const content = JSON.parse(saved);
      const editables = document.querySelectorAll('[contenteditable="true"]');

      editables.forEach((el, index) => {
        if (content[`editable_${index}`]) {
          el.innerHTML = content[`editable_${index}`];
        }
      });
    }
  }

  /**
   * Clear saved content (optional utility)
   */
  function clearSavedContent() {
    localStorage.removeItem('resumeContent');
    location.reload();
  }
});
