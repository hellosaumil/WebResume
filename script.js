/**
 * Resume PDF Export Script
 * Uses html2pdf.js for A4-constrained PDF generation
 */

document.addEventListener('DOMContentLoaded', function () {

  const resumeElement = document.getElementById('resume');



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
  // ========================================
  // Default is View Mode (Print Ready)
  // Toggle Switch for Edit Mode
  // ========================================
  // ========================================
  // Toggle Page Layout (Shadow, Padding, Ruler)
  // ========================================
  const toggleLayoutBtn = document.getElementById('toggleLayout');

  if (toggleLayoutBtn) {
    toggleLayoutBtn.addEventListener('click', () => {
      document.body.classList.toggle('show-page-layout');
      const isLayoutVisible = document.body.classList.contains('show-page-layout');

      toggleLayoutBtn.title = isLayoutVisible ? 'Hide Page Layout' : 'Show Page Layout';

      // Update button visual state if needed
      toggleLayoutBtn.style.color = isLayoutVisible ? 'white' : 'rgba(255, 255, 255, 0.8)';
      toggleLayoutBtn.style.background = isLayoutVisible ? 'rgba(255, 255, 255, 0.15)' : 'transparent';
    });
  }

  // Exit Edit Mode on ESC


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
      <span class="tooltip-value class-value" id="tooltip-class">—</span>
    </div>
    <div class="tooltip-row">
      <span class="tooltip-value size-value" id="tooltip-size">—</span>
    </div>
    <div class="tooltip-row">
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
    const classList = el.className ? el.className.split(' ').filter(c => c && !c.includes('dev-inspector')) : [];
    const formattedClasses = classList.length > 0 ? classList.map(c => `.${c}`).join(', ') : '(none)';

    return {
      classes: formattedClasses,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight
    };
  }

  // Convert font-weight number to name
  function getFontWeightName(weight) {
    const weightMap = {
      '100': '100(Thin)',
      '200': '200(ExtraLight)',
      '300': '300(Light)',
      '400': '400(Regular)',
      '500': '500(Medium)',
      '600': '600(SemiBold)',
      '700': '700(Bold)',
      '800': '800(ExtraBold)',
      '900': '900(Black)'
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

  // Get color class for highlight
  function getHighlightColorClass(el) {
    // Priority 1: Use Design System classes for color mapping
    if (el.classList.contains('header-1') || el.classList.contains('header-2')) return 'h-purple';
    if (el.classList.contains('title-1') || el.classList.contains('title-2')) return 'h-orange';
    if (el.classList.contains('title-2-accent') || el.classList.contains('title-3-italic')) return 'h-green';

    // Priority 2: Semantic fallbacks
    const tagName = el.tagName.toLowerCase();
    if (tagName === 'h1' || tagName === 'h2') return 'h-purple';
    if (tagName === 'li') return 'h-orange';
    if (tagName === 'a') return 'h-green';

    return 'h-blue';
  }

  // Clear all highlight classes
  function clearHighlight(el) {
    if (!el) return;
    el.classList.remove('dev-inspector-highlight', 'h-blue', 'h-purple', 'h-orange', 'h-green');
  }

  // Mouse move handler
  document.addEventListener('mousemove', (e) => {
    if (!devInspectorEnabled) return;


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
        clearHighlight(currentTarget);
      }
      const colorClass = getHighlightColorClass(target);
      target.classList.add('dev-inspector-highlight', colorClass);
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
        clearHighlight(currentTarget);
        currentTarget = null;
      }
    }
  });
});
