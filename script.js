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
  // View Mode (Print Preview)
  // ========================================
  const viewModeBtn = document.getElementById('viewMode');
  if (viewModeBtn) {
    viewModeBtn.addEventListener('click', () => {
      document.body.classList.add('view-mode');

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
      toast.textContent = 'Press ESC to exit View Mode';
      document.body.appendChild(toast);

      // Remove toast after 3 seconds
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
      }, 3000);
    });
  }

  // Exit View Mode on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('view-mode')) {
      document.body.classList.remove('view-mode');
    }
  });

  // ========================================
  // Fixed Scale Controls (Zoom Resistance)
  // ========================================
  const controls = document.querySelector('.controls');
  if (controls) {
    const updateScale = () => {
      // Use devicePixelRatio directly for more reliable zoom detection
      // This works better during resize events than window width ratio
      const zoom = window.devicePixelRatio || 1;

      // Counteract zoom to keep visual size constant
      // This prevents buttons from becoming "massive" at 150% zoom
      controls.style.transformOrigin = 'bottom right';
      controls.style.transform = `scale(${2 / zoom})`;

      // Adjust position to keep visual margins constant (approx 50px visual)
      controls.style.bottom = `${50 / zoom}px`;
      controls.style.right = `${50 / zoom}px`;
    };

    // Listen to resize (triggered by zoom) and also DPI changes if supported
    window.addEventListener('resize', updateScale);

    // Initial call
    updateScale();
  }

  // ========================================
  // Dev Inspector (CSS Info on Hover)
  // ========================================

  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.className = 'dev-inspector-tooltip';
  tooltip.innerHTML = `
    <div class="tooltip-row">
      <span class="tooltip-label">class</span>
      <span class="tooltip-value class-value" id="tooltip-class">—</span>
    </div>
    <div class="tooltip-row">
      <span class="tooltip-label">size</span>
      <span class="tooltip-value size-value" id="tooltip-size">—</span>
    </div>
    <div class="tooltip-row">
      <span class="tooltip-label">weight</span>
      <span class="tooltip-value weight-value" id="tooltip-weight">—</span>
    </div>
  `;
  document.body.appendChild(tooltip);

  // Create toggle button
  const devToggleBtn = document.createElement('button');
  devToggleBtn.className = 'dev-toggle-btn';
  devToggleBtn.title = 'CSS Inspector';
  devToggleBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  // Add toggle button to controls
  const controlsEl = document.querySelector('.controls');
  if (controlsEl) {
    controlsEl.insertBefore(devToggleBtn, controlsEl.firstChild);
  }

  // State
  let devInspectorEnabled = true;
  devToggleBtn.classList.add('active');
  let currentTarget = null;

  // Toggle handler
  devToggleBtn.addEventListener('click', () => {
    devInspectorEnabled = !devInspectorEnabled;
    devToggleBtn.classList.toggle('active', devInspectorEnabled);

    if (!devInspectorEnabled) {
      hideTooltip();
      if (currentTarget) {
        currentTarget.classList.remove('dev-inspector-highlight');
        currentTarget = null;
      }
    }
  });

  // Get computed styles
  function getElementStyles(el) {
    const computed = window.getComputedStyle(el);
    return {
      classes: el.className ? el.className.split(' ').filter(c => c && !c.includes('dev-inspector')).join(', ') : '(none)',
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight
    };
  }

  // Convert font-weight number to name
  function getFontWeightName(weight) {
    const weightMap = {
      '100': '100',
      '200': '200',
      '300': '300',
      '400': '400',
      '500': '500',
      '600': '600',
      '700': '700',
      '800': '800',
      '900': '900'
    };
    return weightMap[weight] || weight;
  }

  // Show tooltip
  function showTooltip(e, styles) {
    const tooltipClass = document.getElementById('tooltip-class');
    const tooltipSize = document.getElementById('tooltip-size');
    const tooltipWeight = document.getElementById('tooltip-weight');

    tooltipClass.textContent = styles.classes;
    tooltipSize.textContent = styles.fontSize;
    tooltipWeight.textContent = getFontWeightName(styles.fontWeight);

    // Position tooltip
    const padding = 15;
    let x = e.clientX + padding;
    let y = e.clientY + padding;

    // Prevent overflow on right
    const tooltipRect = tooltip.getBoundingClientRect();
    if (x + tooltipRect.width > window.innerWidth) {
      x = e.clientX - tooltipRect.width - padding;
    }

    // Prevent overflow on bottom
    if (y + tooltipRect.height > window.innerHeight) {
      y = e.clientY - tooltipRect.height - padding;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.classList.add('visible');
  }

  // Hide tooltip
  function hideTooltip() {
    tooltip.classList.remove('visible');
  }

  // Mouse move handler
  document.addEventListener('mousemove', (e) => {
    if (!devInspectorEnabled) return;
    if (document.body.classList.contains('view-mode')) return;

    const target = e.target;

    // Skip non-element targets and the tooltip itself
    if (!target || target === tooltip || tooltip.contains(target)) return;
    // Skip controls area
    if (target.closest('.controls')) {
      hideTooltip();
      if (currentTarget) {
        currentTarget.classList.remove('dev-inspector-highlight');
        currentTarget = null;
      }
      return;
    }

    // Update highlight
    if (currentTarget !== target) {
      if (currentTarget) {
        currentTarget.classList.remove('dev-inspector-highlight');
      }
      target.classList.add('dev-inspector-highlight');
      currentTarget = target;
    }

    // Get and show styles
    const styles = getElementStyles(target);
    showTooltip(e, styles);
  });

  // Mouse leave document
  document.addEventListener('mouseleave', () => {
    if (devInspectorEnabled) {
      hideTooltip();
      if (currentTarget) {
        currentTarget.classList.remove('dev-inspector-highlight');
        currentTarget = null;
      }
    }
  });
});
