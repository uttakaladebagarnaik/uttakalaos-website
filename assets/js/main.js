/**
 * UTTAKALA OS — Cyberpunk Dark Tech Motion & Interactive Engine v3.0
 * Mouse Ambient Lighting, 3D Tilt, Magnetic Physics, Reading Progress & HUD Controls
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = currentYear;
  });

  // 2. Sticky Header Elevation on Scroll
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 3. Reading Progress Bar (Legal & Trust Center Docs)
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const progress = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // 4. Mouse-Responsive Ambient Lighting (Desktop Fine Pointer)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow-canvas';
    document.body.appendChild(mouseGlow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    // Smooth lerp for ambient cursor glow
    const renderGlow = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      mouseGlow.style.left = `${currentX}px`;
      mouseGlow.style.top = `${currentY}px`;
      requestAnimationFrame(renderGlow);
    };
    requestAnimationFrame(renderGlow);

    // 5. 3D Perspective Card Tilt Physics
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });

    // 6. Magnetic CTA Buttons
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // 7. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen.toString());
      
      const iconMenu = mobileToggle.querySelector('.icon-menu');
      const iconClose = mobileToggle.querySelector('.icon-close');
      if (iconMenu && iconClose) {
        iconMenu.style.display = isOpen ? 'none' : 'block';
        iconClose.style.display = isOpen ? 'block' : 'none';
      }

      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', () => toggleMenu());

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileDrawer.classList.contains('open')) {
        toggleMenu(false);
      }
    }, { passive: true });
  }

  // 8. Scroll Reveal Animations via IntersectionObserver
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    document.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('revealed');
    });
  }

  // 9. Interactive Tabbed Feature Showcase Switcher
  const tabBtns = document.querySelectorAll('.tabbed-nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabBtns.length > 0 && tabPanes.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabPanes.forEach(pane => {
          if (pane.id === targetId) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });
      });
    });
  }

  // 10. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          faqItems.forEach(i => i.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      }
    });
  }

  // 11. Screenshot Inspection Lightbox / Modal
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.setAttribute('role', 'dialog');
  modalOverlay.setAttribute('aria-modal', 'true');
  modalOverlay.setAttribute('aria-label', 'Screenshot Inspection Lightbox');
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title-group">
          <h3 id="modal-title">Application Screen Inspection</h3>
          <p id="modal-desc">Authentic UTTAKALA OS Native Interface</p>
        </div>
        <button class="modal-close-btn" aria-label="Close Lightbox">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <img id="modal-img" class="modal-img" src="" alt="UTTAKALA OS High-Resolution Screenshot" />
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  const modalImg = modalOverlay.querySelector('#modal-img');
  const modalTitle = modalOverlay.querySelector('#modal-title');
  const modalDesc = modalOverlay.querySelector('#modal-desc');
  const modalClose = modalOverlay.querySelector('.modal-close-btn');

  const openModal = (src, title, desc) => {
    modalImg.src = src;
    modalTitle.textContent = title || 'Application Screen Inspection';
    modalDesc.textContent = desc || 'Authentic UTTAKALA OS Native Interface';
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox], .device-screen-img, .feature-thumb-wrap, .feature-btn-inspect');
    if (trigger) {
      e.preventDefault();
      let img = null;
      let title = '';
      let desc = '';

      if (trigger.matches('.feature-btn-inspect')) {
        const card = trigger.closest('.feature-card');
        img = card ? card.querySelector('.feature-thumb-img') : null;
        title = card ? card.querySelector('.feature-title')?.textContent : '';
        desc = card ? card.querySelector('.feature-category-tag')?.textContent : '';
      } else if (trigger.matches('.feature-thumb-wrap')) {
        img = trigger.querySelector('.feature-thumb-img');
        const card = trigger.closest('.feature-card');
        title = card ? card.querySelector('.feature-title')?.textContent : '';
        desc = card ? card.querySelector('.feature-category-tag')?.textContent : '';
      } else if (trigger.tagName === 'IMG') {
        img = trigger;
        title = trigger.getAttribute('alt') || 'Interface Overview';
        desc = 'Authentic 1920x1080 Native Application Screenshot';
      } else {
        img = trigger.querySelector('img') || trigger;
        title = trigger.dataset.title || img.getAttribute('alt') || 'Screenshot';
        desc = trigger.dataset.desc || 'Native Interface';
      }

      if (img && img.src) {
        openModal(img.src, title, desc);
      }
    }
  });

  // 12. Category Filter Matrix (Features Page)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const featureCards = document.querySelectorAll('.feature-card[data-category]');

  if (filterBtns.length > 0 && featureCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.filter;
        featureCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 13. Interactive Tutorial Demonstration Simulator (Tutorials Page)
  const tutorialPlayer = document.querySelector('.tutorial-player-container');
  if (tutorialPlayer) {
    const tutorialData = [
      {
        id: 'mission-command',
        title: '01. Setting Up Mission Command',
        tag: 'Getting Started',
        duration: '02:45',
        steps: [
          {
            img: './assets/images/screenshots/01-mission-command.png',
            stepNumber: 'Step 1 of 4',
            title: 'Initialize Dashboard HUD',
            desc: 'Configure active biometric status, primary mission objective, and tactical bookmarks.'
          },
          {
            img: './assets/images/screenshots/03-launchpad-mascot.png',
            stepNumber: 'Step 2 of 4',
            title: 'Dock Launchpad Navigation',
            desc: 'Access floating tactical launchpad to teleport across vaults and activate cyber mascot.'
          },
          {
            img: './assets/images/screenshots/02-mastery-matrix.png',
            stepNumber: 'Step 3 of 4',
            title: 'Mastery Matrix & Cadence Distribution',
            desc: 'Evaluate 60-day visual habit heatmaps and assess discipline velocity.'
          },
          {
            img: './assets/images/screenshots/19-profile-customization.png',
            stepNumber: 'Step 4 of 4',
            title: 'Operator Personalization',
            desc: 'Configure callsign, cyber accent colors, and custom security preferences.'
          }
        ]
      },
      {
        id: 'focus-timer',
        title: '02. Deep Work Engine & Dopamine Breaker',
        tag: 'Productivity & Focus',
        duration: '03:10',
        steps: [
          {
            img: './assets/images/screenshots/04-focus-timer.png',
            stepNumber: 'Step 1 of 3',
            title: 'Calibrate High-Performance Focus Timer',
            desc: 'Select Pomodoro or Flow state intervals with zero-stimulation dark timers.'
          },
          {
            img: './assets/images/screenshots/05-daily-tasks.png',
            stepNumber: 'Step 2 of 3',
            title: 'Task Execution & Priority Allocation',
            desc: 'Check off daily deliverables directly from the tactical console.'
          },
          {
            img: './assets/images/screenshots/12-dopamine-breaker.png',
            stepNumber: 'Step 3 of 3',
            title: '10-Second Dopamine Urge Breaker',
            desc: 'When experiencing compulsive urge, engage 10-second breath countdown lock.'
          }
        ]
      },
      {
        id: 'academic-coding',
        title: '03. Academic Vault & LeetCode Tracker',
        tag: 'Academic & DSA',
        duration: '04:00',
        steps: [
          {
            img: './assets/images/screenshots/07-academic-vault.png',
            stepNumber: 'Step 1 of 3',
            title: 'Backlog Clearance & Course Attendance',
            desc: 'Track syllabus modules, exam schedules, and attendance ratios to ensure clearance.'
          },
          {
            img: './assets/images/screenshots/08-coding-vault.png',
            stepNumber: 'Step 2 of 3',
            title: 'LeetCode Problem & Mistake Repository',
            desc: 'Catalogue solved data structures and algorithmic edge-cases to prevent repeating bugs.'
          },
          {
            img: './assets/images/screenshots/13-flashcards.png',
            stepNumber: 'Step 3 of 3',
            title: 'Spaced Repetition Swipe Flashcards',
            desc: 'Review concepts with fluid gesture-based flashcards to lock in technical definitions.'
          }
        ]
      },
      {
        id: 'privacy-security',
        title: '04. SALTICOR Vault & Secret Diary Isolation',
        tag: 'Security & Privacy',
        duration: '03:30',
        steps: [
          {
            img: './assets/images/screenshots/09-salticor-security.png',
            stepNumber: 'Step 1 of 4',
            title: 'SALTICOR Security Gateway',
            desc: 'Audit device telemetry, active session authorization, and local memory sandboxes.'
          },
          {
            img: './assets/images/screenshots/15-secret-diary-locked.png',
            stepNumber: 'Step 2 of 4',
            title: 'Secret Diary Hardware PIN Screen',
            desc: 'Reflections locked behind dedicated client-side PIN authentication barrier.'
          },
          {
            img: './assets/images/screenshots/16-secret-diary-unlocked.png',
            stepNumber: 'Step 3 of 4',
            title: 'Local-Only Writing Enclave',
            desc: 'Write personal entries. Text is strictly local to device and never synced to cloud.'
          },
          {
            img: './assets/images/screenshots/17-google-drive-backup.png',
            stepNumber: 'Step 4 of 4',
            title: 'Google Drive AppData Backup Export',
            desc: 'Export plain JSON backups to Drive AppData (diary entries are strictly filtered out).'
          }
        ]
      }
    ];

    let currentModuleIndex = 0;
    let currentStepIndex = 0;
    let isPlaying = false;
    let playTimer = null;

    const stageImg = tutorialPlayer.querySelector('.tutorial-stage-media');
    const stepBadge = tutorialPlayer.querySelector('.tutorial-step-overlay span:last-child');
    const captionTitle = tutorialPlayer.querySelector('.tutorial-caption-text h4');
    const captionDesc = tutorialPlayer.querySelector('.tutorial-caption-text p');
    const progressFill = tutorialPlayer.querySelector('.tutorial-progress-fill');
    const timeDisplay = tutorialPlayer.querySelector('.tutorial-time');
    const playBtn = tutorialPlayer.querySelector('.tutorial-play-btn');
    const prevBtn = tutorialPlayer.querySelector('.tutorial-prev-btn');
    const nextBtn = tutorialPlayer.querySelector('.tutorial-next-btn');

    const updateStage = () => {
      const module = tutorialData[currentModuleIndex];
      const step = module.steps[currentStepIndex];

      stageImg.style.opacity = '0.3';
      setTimeout(() => {
        stageImg.src = step.img;
        stageImg.style.opacity = '1';
      }, 150);

      stepBadge.textContent = `${module.title} — ${step.stepNumber}`;
      captionTitle.textContent = step.title;
      captionDesc.textContent = step.desc;

      const progressPercent = ((currentStepIndex + 1) / module.steps.length) * 100;
      progressFill.style.width = `${progressPercent}%`;
      timeDisplay.textContent = `00:${String((currentStepIndex + 1) * 15).padStart(2, '0')} / ${module.duration}`;
    };

    const nextStep = () => {
      const module = tutorialData[currentModuleIndex];
      if (currentStepIndex < module.steps.length - 1) {
        currentStepIndex++;
      } else {
        currentStepIndex = 0;
      }
      updateStage();
    };

    const prevStep = () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
      } else {
        const module = tutorialData[currentModuleIndex];
        currentStepIndex = module.steps.length - 1;
      }
      updateStage();
    };

    const togglePlay = () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        `;
        playTimer = setInterval(nextStep, 3500);
      } else {
        playBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
        clearInterval(playTimer);
      }
    };

    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (isPlaying) togglePlay();
      nextStep();
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (isPlaying) togglePlay();
      prevStep();
    });

    const tutorialCards = document.querySelectorAll('.tutorial-card');
    tutorialCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        tutorialCards.forEach(c => c.classList.remove('active-tutorial'));
        card.classList.add('active-tutorial');
        currentModuleIndex = idx;
        currentStepIndex = 0;
        if (isPlaying) togglePlay();
        updateStage();
        tutorialPlayer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    });

    updateStage();
  }

  // 12. Checksum Copy Interaction for Download Center
  document.querySelectorAll('.copy-hash-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const targetHash = btn.getAttribute('data-hash');
      if (!targetHash) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(targetHash);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = targetHash;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        const originalText = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied!</span>
        `;

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
        }, 2200);
      } catch (err) {
        console.warn('Clipboard copy failed:', err);
      }
    });
  });
});
