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
  tooltip.className = 'inspector-tooltip';
  document.body.appendChild(tooltip);
  tooltip.style.display = 'none';

  document.addEventListener('mousemove', (e) => {
    // Hide if in Clean Mode or if explicitly told not to inspect
    if (document.body.classList.contains('clean-mode') || e.target.closest('.no-inspect')) {
      tooltip.style.display = 'none';
      return;
    }

    const target = e.target;
    // Inspect specific resume elements
    if (target.matches('.name, .degree, .school, .company, .job-title, .project-title, .tech-stack, .skill-label, .thesis, p, li, span')) {
      const computedStyle = window.getComputedStyle(target);
      const fontSize = computedStyle.fontSize;
      const fontWeight = computedStyle.fontWeight;
      const fontFamily = computedStyle.fontFamily.split(',')[0].replace(/['"]/g, '');
      const className = target.className ? `.${target.className.split(' ')[0]}` : target.tagName.toLowerCase();

      // Convert px to rounded pt for display (approximate)
      const pxValue = parseFloat(fontSize);
      const ptValue = Math.round(pxValue * 0.75);

      tooltip.innerHTML = `
        <strong>${className}</strong><br>
        <span style="opacity:0.8">${fontFamily}</span><br>
        ${ptValue}pt (${fontWeight})
      `;
      tooltip.style.display = 'block';

      // Position tooltip near mouse but keep onscreen
      const x = e.clientX + 15;
      const y = e.clientY + 15;
      tooltip.style.top = y + 'px';
      tooltip.style.left = x + 'px';
    } else {
      tooltip.style.display = 'none';
    }
  });

  // ========================================
  // Fixed Scale Controls (Zoom Resistance)
  // ========================================
  const controls = document.querySelector('.controls');
  if (controls) {
    const updateScale = () => {
      // Logic: Calculate zoom level based on window width ratio
      // This works for standard "Cmd +/-" browser zoom
      const zoom = window.outerWidth / window.innerWidth;

      // We want to counteract the zoom. 
      // If zoom is 2 (200%), everything is 2x bigger. We scale to 0.5 to look "normal".
      controls.style.transformOrigin = 'bottom right';
      controls.style.transform = `scale(${1 / zoom})`;

      // Also adjust position so the margin doesn't appear to grow
      // Standard margin is 20px. At 200% zoom, 20px visual is 40px physical.
      // We want it to look like 20px physical.
      // CSS pixels * scale = physical pixels.
      // We want physical margin = 20.
      // CSS pixels * zoom = 20  =>  CSS pixels = 20 / zoom.
      controls.style.bottom = `${20 / zoom}px`;
      controls.style.right = `${20 / zoom}px`;
    };

    window.addEventListener('resize', updateScale);
    // Initial call
    updateScale();
  }
  document.addEventListener('scroll', () => tooltip.classList.remove('visible'));
});
