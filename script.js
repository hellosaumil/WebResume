/**
 * Resume PDF Export Script
 * Uses html2pdf.js for A4-constrained PDF generation
 */

document.addEventListener('DOMContentLoaded', function () {

  const resumeElement = document.getElementById('resume');



  // ========================================
  // Data Loading
  // ========================================

  async function loadResumeData() {
    try {
      await Promise.all([
        loadHeader(),
        loadEducation(),
        loadSkills(),
        loadPublications(),
        loadExperience(),
        loadProjects(),
        loadLeadership(),
        loadCertificates()
      ]);
      console.log('Resume data loaded successfully');
    } catch (error) {
      console.error('Error loading resume data:', error);
    }
  }

  // Helper to fetch markdown
  async function fetchMarkdown(filename) {
    const response = await fetch(`data/${filename}`);
    if (!response.ok) throw new Error(`Failed to load ${filename}`);
    return await response.text();
  }

  // Helper: Parse Key-Value pairs (e.g., "Name: John")
  function parseKeyValue(text) {
    const data = {};
    text.split('\n').forEach(line => {
      const match = line.match(/^([^:]+):\s*(.*)$/);
      if (match) {
        data[match[1].trim().toLowerCase()] = match[2].trim();
      }
    });
    return data;
  }

  // Helper: Parse Sections separated by '---'
  function parseSections(text) {
    return text.split('---').map(section => {
      const lines = section.trim().split('\n');
      const metadata = {};
      const content = [];
      let inContent = false;

      lines.forEach(line => {
        if (line.trim() === '') return;

        if (!inContent) {
          const match = line.match(/^([^:]+):\s*(.*)$/);
          if (match) {
            metadata[match[1].trim().toLowerCase()] = match[2].trim();
          } else {
            inContent = true;
            content.push(line);
          }
        } else {
          content.push(line);
        }
      });
      return { ...metadata, content };
    });
  }

  // Helper: Parse Simple List (bullets)
  function parseList(text) {
    return text.split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim());
  }


  // --- Specific Loaders ---

  async function loadHeader() {
    const text = await fetchMarkdown('header.md');
    const data = parseKeyValue(text);

    // Map fields
    const mapping = {
      'name': 'field-name',
      'phone': 'field-phone',
      'email': 'field-email',
      'location': 'field-location',
      'linkedin': 'field-linkedin',
      'startdate': 'field-startdate'
    };

    for (const [key, id] of Object.entries(mapping)) {
      if (data[key]) {
        document.getElementById(id).textContent = data[key];
      }
    }
  }

  async function loadEducation() {
    const text = await fetchMarkdown('education.md');
    const sections = parseSections(text);
    const container = document.getElementById('education-section');

    sections.forEach(edu => {
      const div = document.createElement('div');
      div.className = 'education-item';
      div.innerHTML = `
        <div class="edu-header">
          <span class="degree title-1" contenteditable="true">${edu.degree || ''}</span>
          <span class="edu-date body-text" contenteditable="true">${edu.date || ''}</span>
        </div>
        <div class="edu-details">
          <span class="school title-2" contenteditable="true">${edu.school || ''}</span>
          ${edu.gpa ? `<span class="gpa title-2-accent" contenteditable="true">${edu.gpa}</span>` : ''}
        </div>
      `;
      container.appendChild(div);
    });
  }

  async function loadSkills() {
    const text = await fetchMarkdown('skills.md');
    const items = parseList(text);
    const container = document.getElementById('skills-section');

    items.forEach(item => {
      // Expecting format "**Label:** Value"
      const match = item.match(/^\*\*(.*?):\*\*\s*(.*)$/);
      if (match) {
        const div = document.createElement('div');
        div.className = 'skills-item';
        div.innerHTML = `
          <span class="skill-label title-1">${match[1]}:</span>
          <span class="skill-value" contenteditable="true">${match[2]}</span>
        `;
        container.appendChild(div);
      }
    });
  }

  async function loadPublications() {
    const text = await fetchMarkdown('publications.md');
    const items = parseList(text);
    const container = document.getElementById('publications-section');
    const ul = document.createElement('ul');
    ul.className = 'compact-list';

    items.forEach(item => {
      // Handle bold start "**Msg:** val" -> "<strong>Msg:</strong> val"
      const html = item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const li = document.createElement('li');
      li.contentEditable = true;
      li.innerHTML = html;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  async function loadExperience() {
    const text = await fetchMarkdown('experience.md');
    const sections = text.split('---').map(section => {
      const lines = section.trim().split('\n');
      const data = { content: [] };

      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('## ')) data.title = trimmed.replace('## ', '').trim();
        else if (trimmed.startsWith('### ')) {
          const val = trimmed.replace('### ', '').trim();
          if (val.startsWith('Thesis:')) data.thesis = val;
          else data.company = val;
        }
        else if (trimmed.startsWith('#### ')) data.date = trimmed.replace('#### ', '').trim();
        else if (trimmed.startsWith('##### ')) data.tech = trimmed.replace('##### ', '').replace(/^\*(.*)\*$/, '$1').trim(); // Strip outer italics if present
        else if (trimmed.startsWith('- ')) data.content.push(trimmed);
      });
      return data;
    });

    const container = document.getElementById('experience-section');

    sections.forEach(exp => {
      if (!exp.title) return; // Skip empty sections

      const div = document.createElement('div');
      div.className = 'experience-item';

      // Generate bullets
      const bullets = exp.content
        .map(line => `<li contenteditable="true">${line.replace(/^-\s*/, '')}</li>`)
        .join('');

      div.innerHTML = `
        <div class="exp-header">
          <span class="job-title title-1" contenteditable="true">${exp.title || ''}</span>
          <span class="exp-date body-text" contenteditable="true">${exp.date || ''}</span>
        </div>
        <div class="company title-2-accent" contenteditable="true">${exp.company || ''}</div>
        ${exp.thesis ? `<div class="thesis title-3-italic" contenteditable="true">${exp.thesis}</div>` : ''}
        <div class="tech-stack title-3-italic" contenteditable="true">${exp.tech || ''}</div>
        <ul class="bullet-list">
          ${bullets}
        </ul>
      `;
      container.appendChild(div);
    });
  }

  async function loadProjects() {
    const text = await fetchMarkdown('projects.md');
    const sections = text.split('---').map(section => {
      const lines = section.trim().split('\n');
      const data = { content: [] };

      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('### ')) data.title = trimmed.replace('### ', '').trim();
        else if (trimmed.startsWith('##### ')) data.tech = trimmed.replace('##### ', '').replace(/^\*(.*)\*$/, '$1').trim();
        else if (trimmed.startsWith('- ')) data.content.push(trimmed);
      });
      return data;
    });

    const container = document.getElementById('projects-section');

    sections.forEach(proj => {
      if (!proj.title) return;

      const div = document.createElement('div');
      div.className = 'project-item';

      const bullets = proj.content
        .map(line => `<li contenteditable="true">${line.replace(/^-\s*/, '')}</li>`)
        .join('');

      div.innerHTML = `
        <div class="project-title title-1" contenteditable="true">${proj.title || ''}</div>
        <div class="tech-stack title-3-italic" contenteditable="true">${proj.tech || ''}</div>
        <ul class="bullet-list">
          ${bullets}
        </ul>
      `;
      container.appendChild(div);
    });
  }

  async function loadLeadership() {
    const text = await fetchMarkdown('leadership.md');
    const items = parseList(text);
    const container = document.getElementById('leadership-section');
    const ul = document.createElement('ul');
    ul.className = 'compact-list';
    items.forEach(item => {
      const li = document.createElement('li');
      li.contentEditable = true;
      li.textContent = item;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  async function loadCertificates() {
    const text = await fetchMarkdown('certificates.md');
    const items = parseList(text);
    const container = document.getElementById('certificates-section');
    const ul = document.createElement('ul');
    ul.className = 'compact-list';
    items.forEach(item => {
      const li = document.createElement('li');
      li.contentEditable = true;
      li.textContent = item;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }


  // Initialize
  loadResumeData();

  const resetBtn = document.getElementById('resetContent');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all content? This will clear your unsaved edits and reload the default resume.')) {
        location.reload();
      }
    });
  }

  // ========================================
  // Page Layout Toggle
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
  let devInspectorEnabled = false;
  // devToggleBtn.classList.add('active');
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
