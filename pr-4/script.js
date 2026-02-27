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
        loadSummary(),
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
    const response = await fetch(`data/${filename}?cache=${new Date().getTime()}`);
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

  // Helper: Convert Markdown links [text](url) to HTML <a> tags
  function parseMarkdownLinks(text) {
    return text
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" title="$2" style="text-decoration:underline; color:inherit;">$1</a>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  // --- Specific Loaders ---

  async function loadSummary() {
    const text = await fetchMarkdown('summary.md');
    const section = document.getElementById('summary-section');

    const p = document.createElement('p');
    p.className = 'summary-text body-text';
    p.setAttribute('contenteditable', 'true');
    p.innerHTML = parseMarkdownLinks(text.trim());
    section.appendChild(p);
  }

  async function loadHeader() {
    const text = await fetchMarkdown('header.md');
    const data = parseKeyValue(text);

    // Map fields
    const mapping = {
      'firstname': 'field-firstname',
      'lastname': 'field-lastname',
      'phone': 'field-phone',
      'email': 'field-email',
      'location': 'field-location',
      'linkedin': 'field-linkedin'
    };

    for (const [key, id] of Object.entries(mapping)) {
      if (data[key]) {
        const el = document.getElementById(id);
        if (key === 'email') {
          el.innerHTML = `<a href="mailto:${data[key]}" class="contact-link" style="text-decoration:underline; color:inherit;">${data[key]}</a>`;
        } else if (key === 'phone') {
          const cleanPhone = data[key].replace(/[^\d+]/g, '');
          el.innerHTML = `<a href="tel:${cleanPhone}" class="contact-link" style="text-decoration:none; color:inherit;">${data[key]}</a>`;
        } else if (key === 'linkedin') {
          // Assume data[key] is a URL or handle cases where it isn't? 
          // If it starts with http, use it. If not, maybe prepend https://?
          let url = data[key];
          if (!url.startsWith('http')) url = 'https://' + url;
          el.innerHTML = `<a href="${url}" target="_blank" class="contact-link" style="text-decoration:underline; color:inherit;">${data[key]}</a>`;
        } else {
          el.textContent = data[key];
        }
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
    const section = document.getElementById('skills-section');

    // Create or find a wrapper for grid layout
    let container = section.querySelector('.skills-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'skills-grid';
      section.appendChild(container);
    } else {
      container.innerHTML = ''; // Clear if exists
    }

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
      const li = document.createElement('li');
      li.contentEditable = true;
      li.innerHTML = parseMarkdownLinks(item);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  async function loadExperience() {
    const text = await fetchMarkdown('experience.md');
    const sections = text.split('---').map(section => {
      const lines = section.trim().split('\n');
      const data = { content: [], companies: [] };

      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('## ')) data.title = trimmed.replace('## ', '').trim();
        else if (trimmed.startsWith('### ')) {
          const val = trimmed.replace('### ', '').trim();
          if (val.startsWith("Master's Thesis:")) data.thesis = val;
          else data.companies.push(val);
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

      // Generate bullets with link parsing
      const bullets = exp.content
        .map(line => `<li contenteditable="true">${parseMarkdownLinks(line.replace(/^-\s*/, ''))}</li>`)
        .join('');

      // Generate company rows
      const companyRows = exp.companies
        .map(co => `<div class="company title-2-accent" contenteditable="true">${parseMarkdownLinks(co)}</div>`)
        .join('');

      div.innerHTML = `
        <div class="exp-header">
          <span class="job-title title-1" contenteditable="true">${parseMarkdownLinks(exp.title || '')}</span>
          <span class="exp-date body-text" contenteditable="true">${exp.date || ''}</span>
        </div>
        ${companyRows}
        ${exp.thesis ? `<div class="thesis title-2" contenteditable="true">${parseMarkdownLinks(exp.thesis)}</div>` : ''}
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

    // Split by '===' to separate ML Research Projects from Side Projects
    const majorSections = text.split('===').map(s => s.trim());
    const sectionTitles = ['ML Research Projects', 'Side Projects'];

    const container = document.getElementById('projects-section');

    majorSections.forEach((majorSection, idx) => {
      // Add a sub-section title if there's more than one major section
      if (majorSections.length > 1) {
        const subTitle = document.createElement('h2');
        subTitle.className = 'section-title header-2';
        subTitle.textContent = sectionTitles[idx] || 'Projects';
        container.appendChild(subTitle);
      }

      const sections = majorSection.split('---').map(section => {
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

      sections.forEach(proj => {
        if (!proj.title) return;

        const div = document.createElement('div');
        div.className = 'project-item';

        const bullets = proj.content
          .map(line => `<li contenteditable="true">${parseMarkdownLinks(line.replace(/^-\s*/, ''))}</li>`)
          .join('');

        div.innerHTML = `
          <div class="project-title title-1" contenteditable="true">${parseMarkdownLinks(proj.title || '')}</div>
          <div class="tech-stack title-3-italic" contenteditable="true">${proj.tech || ''}</div>
          <ul class="bullet-list">
            ${bullets}
          </ul>
        `;
        container.appendChild(div);
      });
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
      li.innerHTML = parseMarkdownLinks(item);
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
      li.innerHTML = parseMarkdownLinks(item);
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
  // Settings Management (LocalStorage)
  // ========================================
  const SETTINGS_KEY = 'resume-settings';
  const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
    pagePreview: true,
    cssInspector: true,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    editMode: false,
    privacyMode: false
  };

  function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  // ========================================
  // Page Layout Toggle
  // ========================================
  const toggleLayoutBtn = document.getElementById('toggleLayout');

  function updateLayoutUI(isVisible) {
    document.body.classList.toggle('show-page-preview', isVisible);
    if (toggleLayoutBtn) {
      toggleLayoutBtn.classList.toggle('active', isVisible);
      toggleLayoutBtn.title = isVisible ? 'Hide Page Preview' : 'Show Page Preview';
    }
    settings.pagePreview = isVisible;
    saveSettings();
  }

  if (toggleLayoutBtn) {
    toggleLayoutBtn.addEventListener('click', () => {
      const isVisible = !document.body.classList.contains('show-page-preview');
      updateLayoutUI(isVisible);
    });
  }

  // Initialize Layout
  updateLayoutUI(settings.pagePreview);

  // ========================================
  // Theme Toggle (Dark Mode)
  // ========================================
  const themeToggleBtn = document.getElementById('themeToggle');

  function updateThemeUI(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    if (themeToggleBtn) {
      themeToggleBtn.classList.toggle('active', isDark);
      const moonIcon = themeToggleBtn.querySelector('.moon-icon');
      const sunIcon = themeToggleBtn.querySelector('.sun-icon');
      if (isDark) {
        themeToggleBtn.title = 'Switch to Light Mode';
      } else {
        themeToggleBtn.title = 'Switch to Dark Mode';
      }
    }
    settings.darkMode = isDark;
    saveSettings();
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark-mode');
      updateThemeUI(isDark);
    });
  }

  // Sync with device theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    updateThemeUI(e.matches);
  });

  // Initialize Theme
  updateThemeUI(settings.darkMode);

  // ========================================
  // Edit Mode Toggle
  // ========================================
  const editModeBtn = document.createElement('button');
  editModeBtn.className = 'edit-mode-btn';
  editModeBtn.title = 'Toggle Edit Mode';
  editModeBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    </svg>
  `;

  // Add to controls - insert before Reset button (last position)
  let controlsButtons = document.querySelector('.controls-buttons');
  if (controlsButtons) {
    const resetBtn = controlsButtons.querySelector('.reset-btn');
    if (resetBtn) {
      controlsButtons.insertBefore(editModeBtn, resetBtn);
    } else {
      // Fallback: insert after dev inspector button
      const devBtn = controlsButtons.querySelector('.dev-toggle-btn');
      if (devBtn && devBtn.nextSibling) {
        controlsButtons.insertBefore(editModeBtn, devBtn.nextSibling);
      } else {
        controlsButtons.appendChild(editModeBtn);
      }
    }
  }

  function updateEditModeUI(enabled) {
    const editableElements = document.querySelectorAll('[contenteditable]');
    editableElements.forEach(el => {
      el.contentEditable = enabled ? 'true' : 'false';
    });

    editModeBtn.classList.toggle('active', enabled);
    editModeBtn.title = enabled ? 'Disable Edit Mode' : 'Enable Edit Mode';
    settings.editMode = enabled;
    saveSettings();

    // If enabling Edit Mode, turn off Inspector if it's on
    // user can manually turn it back on if needed
    if (enabled && devInspectorEnabled) {
      if (typeof updateInspectorUI === 'function') {
        updateInspectorUI(false);
      }
    }
  }

  editModeBtn.addEventListener('click', () => {
    updateEditModeUI(!settings.editMode);
  });

  // Initialize Edit Mode after content loads
  setTimeout(() => updateEditModeUI(settings.editMode), 200);

  // ========================================
  // Attribution Panel Minimize Toggle
  // ========================================
  const attribution = document.querySelector('.attribution');
  const attributionToggle = attribution ? attribution.querySelector('.attribution-toggle') : null;

  // Add minimized state to settings if not present
  // Always start expanded regardless of saved state
  settings.attributionMinimized = false;
  saveSettings();

  function updateAttributionUI(minimized) {
    if (!attribution || !attributionToggle) return;

    attribution.classList.toggle('minimized', minimized);
    attributionToggle.title = minimized ? 'Expand Attribution' : 'Minimize Attribution';
    settings.attributionMinimized = minimized;
    saveSettings();
  }

  if (attributionToggle) {
    attributionToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      updateAttributionUI(!settings.attributionMinimized);
    });
  }

  // Initialize as expanded
  setTimeout(() => updateAttributionUI(false), 100);

  // Remove auto-minimize on resize - user controls this manually

  // ========================================
  // Fixed Scale Controls (Zoom Resistance)
  // ========================================
  const controls = document.querySelector('.controls');
  if (controls) {
    const updateScale = () => {
      const zoom = window.devicePixelRatio || 1;
      controls.style.transformOrigin = 'bottom right';
      controls.style.transform = `scale(${2 / zoom})`;
      controls.style.bottom = `${50 / zoom}px`;
      controls.style.right = `${50 / zoom}px`;
    };
    window.addEventListener('resize', updateScale);
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    </svg>
  `;

  // Add toggle button to controls (reuse controlsButtons from above)
  if (controlsButtons) {
    controlsButtons.insertBefore(devToggleBtn, controlsButtons.firstChild);
  }

  // State
  let devInspectorEnabled = settings.cssInspector;
  let currentTarget = null;

  function updateInspectorUI(enabled) {
    devInspectorEnabled = enabled;
    devToggleBtn.classList.toggle('active', enabled);
    settings.cssInspector = enabled;
    saveSettings();

    if (!enabled) {
      hideTooltip();
      if (currentTarget) {
        currentTarget.classList.remove('dev-inspector-highlight');
        currentTarget = null;
      }
    }
  }

  // Toggle handler
  devToggleBtn.addEventListener('click', () => {
    updateInspectorUI(!devInspectorEnabled);
  });

  // Initialize Inspector
  updateInspectorUI(settings.cssInspector);

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

  // ========================================
  // Link Tooltip with Open Button
  // ========================================
  const linkTooltip = document.createElement('div');
  linkTooltip.className = 'link-tooltip';
  linkTooltip.innerHTML = `
    <button class="link-tooltip-btn"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></button>
    <span class="link-tooltip-url"></span>
  `;
  document.body.appendChild(linkTooltip);

  let currentLinkUrl = '';
  let linkHoverTimeout = null;

  // Show link tooltip relative to element
  function showLinkTooltip(linkElement) {
    const url = linkElement.href;
    currentLinkUrl = url;
    const urlSpan = linkTooltip.querySelector('.link-tooltip-url');
    urlSpan.textContent = url;

    // Show it so we can measure it
    linkTooltip.classList.add('visible');

    // Get dimensions
    const tooltipRect = linkTooltip.getBoundingClientRect();
    const linkRect = linkElement.getBoundingClientRect();

    // Position: Centered above the link
    let x = linkRect.left + (linkRect.width / 2) - (tooltipRect.width / 2);
    let y = linkRect.top - tooltipRect.height - 8; // 8px gap

    // Prevent overflow on right
    if (x + tooltipRect.width > window.innerWidth - 10) {
      x = window.innerWidth - tooltipRect.width - 10;
    }

    // Prevent overflow on left
    if (x < 10) x = 10;

    // Prevent overflow on top (show below link instead)
    if (y < 10) {
      y = linkRect.bottom + 8;
    }

    linkTooltip.style.left = `${x}px`;
    linkTooltip.style.top = `${y}px`;
  }

  // Hide link tooltip
  function hideLinkTooltip() {
    linkTooltip.classList.remove('visible');
    currentLinkUrl = '';
  }

  // Open button click
  linkTooltip.querySelector('.link-tooltip-btn').addEventListener('click', () => {
    if (currentLinkUrl) {
      window.open(currentLinkUrl, '_blank');
    }
  });

  // Link hover handlers
  document.addEventListener('mouseover', (e) => {
    const link = e.target.closest('a[href]');
    if (link && link.href && !link.closest('.controls')) {
      clearTimeout(linkHoverTimeout);
      showLinkTooltip(link);
    }
  });

  // Remove the mousemove handler that was causing the 'chasing' issue
  // The tooltip is now anchored to the element for stability.

  document.addEventListener('mouseout', (e) => {
    const link = e.target.closest('a[href]');
    if (link) {
      linkHoverTimeout = setTimeout(() => {
        if (!linkTooltip.matches(':hover')) {
          hideLinkTooltip();
        }
      }, 100);
    }
  });

  // Hide when leaving tooltip
  linkTooltip.addEventListener('mouseleave', () => {
    hideLinkTooltip();
  });

  // ========================================
  // Section Drag & Drop Reordering
  // ========================================

  const mainContent = document.querySelector('.main-content');
  const bottomRow = mainContent.querySelector('.bottom-row');
  const sections = Array.from(mainContent.querySelectorAll('.section:not(.half-section)'));
  const SECTION_ORDER_KEY = 'resume-section-order';

  let draggedSection = null;
  let draggedOverSection = null;

  // Load saved order
  function loadSectionOrder() {
    const savedOrder = localStorage.getItem(SECTION_ORDER_KEY);
    if (savedOrder) {
      try {
        let orderArray = JSON.parse(savedOrder);
        const currentSections = Array.from(mainContent.querySelectorAll('.section:not(.half-section)'));
        const sectionIds = new Set(orderArray);

        // If Summary is a new section, and we have a saved order, 
        // inject it at the beginning of the order to ensure it shows up at top
        if (document.getElementById('summary-section') && !sectionIds.has('summary-section')) {
          orderArray.unshift('summary-section');
          sectionIds.add('summary-section');
          saveSectionOrder(); // Save this updated order
        }

        // Reorder sections according to saved/updated order
        orderArray.forEach(sectionId => {
          const section = document.getElementById(sectionId);
          if (section && section.parentElement === mainContent) {
            if (bottomRow) {
              mainContent.insertBefore(section, bottomRow);
            } else {
              mainContent.appendChild(section);
            }
          }
        });

        // Any other NEW sections still not accounted for
        currentSections.forEach(section => {
          if (section.id && !new Set(orderArray).has(section.id)) {
            if (bottomRow) {
              mainContent.insertBefore(section, bottomRow);
            } else {
              mainContent.appendChild(section);
            }
          }
        });

        // Ensure bottom-row is always last
        if (bottomRow) {
          mainContent.appendChild(bottomRow);
        }
      } catch (e) {
        console.error('Failed to load section order:', e);
      }
    }
  }

  // Save current order
  function saveSectionOrder() {
    const currentSections = Array.from(mainContent.querySelectorAll('.section:not(.half-section)'));
    const orderArray = currentSections.map(s => s.id).filter(id => id);
    localStorage.setItem(SECTION_ORDER_KEY, JSON.stringify(orderArray));
  }

  // Make section titles draggable
  sections.forEach(section => {
    const sectionTitle = section.querySelector('.section-title');
    if (!sectionTitle) return;

    sectionTitle.draggable = true;
    sectionTitle.style.cursor = 'move';

    // Add drag icon indicator
    sectionTitle.style.position = 'relative';
    sectionTitle.title = 'Drag to reorder section';

    // Hover effect on section title
    sectionTitle.addEventListener('mouseenter', () => {
      if (!draggedSection) {
        section.classList.add('section-drag-target');
      }
    });

    sectionTitle.addEventListener('mouseleave', () => {
      if (!draggedSection) {
        section.classList.remove('section-drag-target');
      }
    });

    sectionTitle.addEventListener('dragstart', (e) => {
      draggedSection = section;
      section.classList.add('section-dragging');
      section.classList.remove('section-drag-target');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', section.innerHTML);
    });

    sectionTitle.addEventListener('dragend', (e) => {
      section.classList.remove('section-dragging');
      sections.forEach(s => {
        s.classList.remove('section-drag-target');
        s.style.borderTop = '';
        s.style.borderBottom = '';
      });
      draggedSection = null;
      draggedOverSection = null;
    });

    section.addEventListener('dragover', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';

      if (draggedSection && section !== draggedSection) {
        draggedOverSection = section;

        const rect = section.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;

        // Visual feedback
        sections.forEach(s => {
          if (s !== draggedSection) {
            s.classList.remove('section-drag-target');
          }
          s.style.borderTop = '';
          s.style.borderBottom = '';
        });

        section.classList.add('section-drag-target');

        if (e.clientY < midpoint) {
          section.style.borderTop = '3px solid var(--accent-color)';
        } else {
          section.style.borderBottom = '3px solid var(--accent-color)';
        }
      }

      return false;
    });

    section.addEventListener('dragleave', (e) => {
      section.classList.remove('section-drag-target');
      section.style.borderTop = '';
      section.style.borderBottom = '';
    });

    section.addEventListener('drop', (e) => {
      if (e.stopPropagation) {
        e.stopPropagation();
      }

      section.classList.remove('section-drag-target');
      section.style.borderTop = '';
      section.style.borderBottom = '';

      if (draggedSection && section !== draggedSection) {
        const rect = section.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;

        if (e.clientY < midpoint) {
          mainContent.insertBefore(draggedSection, section);
        } else {
          mainContent.insertBefore(draggedSection, section.nextSibling);
        }

        // Ensure bottom-row stays at the end
        if (bottomRow) {
          mainContent.appendChild(bottomRow);
        }

        saveSectionOrder();
      }

      return false;
    });
  });

  // Load saved order after all content is loaded
  setTimeout(() => loadSectionOrder(), 100);
});
