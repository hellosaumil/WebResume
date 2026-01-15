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

  // Add reset functionality
  const resetBtn = document.getElementById('resetContent');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all content? This will clear your unsaved edits and reload the default resume.')) {
        location.reload();
      }
    });
  }

  // ========================================
  // Clean Mode (Print Preview)
  // ========================================
  const cleanModeBtn = document.getElementById('cleanMode');
  if (cleanModeBtn) {
    cleanModeBtn.addEventListener('click', () => {
      document.body.classList.add('clean-mode');

      // Show temporary instruction (removed automatically or by print dialog)
      const toast = document.createElement('div');
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%)';
      toast.style.background = 'rgba(0, 0, 0, 0.8)';
      toast.style.color = 'white';
      toast.style.padding = '10px 20px';
      toast.style.borderRadius = '20px';
      toast.style.zIndex = '3000';
      toast.style.fontFamily = 'sans-serif';
      toast.style.fontSize = '14px';
      toast.style.transition = 'opacity 0.5s';
      toast.textContent = 'Press ESC to exit Clean Mode';
      document.body.appendChild(toast);

      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
      }, 3000);
    });
  }

  // Exit Clean Mode on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('clean-mode')) {
      document.body.classList.remove('clean-mode');
    }
  });

  // ========================================
  // Element Inspector Tooltip
  // ========================================
  const tooltip = document.createElement('div');
  tooltip.className = 'inspector-tooltip no-print';
  document.body.appendChild(tooltip);

  function updateTooltip(e) {
    const target = e.target;
    // Only inspect elements within the resume and ignore the tooltip itself or controls
    if (!resumeElement.contains(target) || target === tooltip) {
      tooltip.classList.remove('visible');
      return;
    }

    const style = window.getComputedStyle(target);
    const classes = Array.from(target.classList).filter(c => c !== 'visible');
    const fontSize = style.fontSize;
    const fontWeight = style.fontWeight;

    let content = '';
    if (classes.length > 0) {
      content += `<span class="label">Class:</span> <span class="value">.${classes.join(' .')}</span>\n`;
    }
    content += `<span class="label">Size:</span> <span class="value">${fontSize}</span>\n`;
    content += `<span class="label">Weight:</span> <span class="value">${fontWeight}</span>`;

    tooltip.innerHTML = content;
    tooltip.classList.add('visible');

    // Position tooltip
    const padding = 15;
    let x = e.clientX + padding;
    let y = e.clientY + padding;

    // Boundary check
    const tooltipRect = tooltip.getBoundingClientRect();
    if (x + tooltipRect.width > window.innerWidth) {
      x = e.clientX - tooltipRect.width - padding;
    }
    if (y + tooltipRect.height > window.innerHeight) {
      y = e.clientY - tooltipRect.height - padding;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  }

  document.addEventListener('mousemove', updateTooltip);
  document.addEventListener('scroll', () => tooltip.classList.remove('visible'));
});
