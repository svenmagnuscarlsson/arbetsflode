/**
 * UI Module - DOM-rendering och interaktioner
 */

const UI = (function () {
    // DOM element references
    let elements = {};

    /**
     * Initialisera UI och cacha element-referenser
     */
    function init() {
        elements = {
            stepContainer: document.getElementById('step-container'),
            stepper: document.getElementById('stepper'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            navInfo: document.getElementById('nav-info'),
            themeToggle: document.getElementById('theme-toggle'),
            toastContainer: document.getElementById('toast-container')
        };

        // Initiera tema
        initTheme();

        // Bind theme toggle
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }
    }

    /**
     * Initiera tema baserat på sparad preferens eller system
     */
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }

    /**
     * Växla mellan ljust och mörkt tema
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        let newTheme;
        if (currentTheme === 'dark') {
            newTheme = 'light';
        } else if (currentTheme === 'light') {
            newTheme = 'dark';
        } else {
            // Ingen explicit tema satt, växla från systempreferens
            newTheme = prefersDark ? 'light' : 'dark';
        }

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    /**
     * Rendera progress stepper
     */
    function renderStepper(currentStep, steps, feedbackCache) {
        if (!elements.stepper) return;

        let html = '';
        steps.forEach((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const hasFeedback = feedbackCache && FeedbackManager.hasFeedback(step.id);

            let dotClass = 'stepper-dot';
            if (isActive) dotClass += ' active';
            if (isCompleted) dotClass += ' completed';
            if (hasFeedback && !isActive) dotClass += ' has-feedback';

            html += `
        <div class="stepper-step">
          <button 
            class="${dotClass}" 
            data-step="${index}"
            aria-label="Gå till ${step.title}"
          ></button>
          <span class="stepper-tooltip">${step.title}</span>
        </div>
      `;

            // Lägg till linje mellan steg (inte efter sista)
            if (index < steps.length - 1) {
                const lineClass = isCompleted ? 'stepper-line completed' : 'stepper-line';
                html += `<div class="${lineClass}"></div>`;
            }
        });

        elements.stepper.innerHTML = html;

        // Bind click events för stepper dots
        elements.stepper.querySelectorAll('.stepper-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const stepIndex = parseInt(e.target.dataset.step, 10);
                if (!isNaN(stepIndex)) {
                    StepManager.goToStep(stepIndex);
                }
            });
        });
    }

    /**
     * Rendera intro-steg
     */
    function renderIntro(step, user) {
        return `
      <div class="card intro-card">
        <div class="card-header">
          <h1 class="card-title">${step.title}</h1>
          <p class="card-description">${step.description}</p>
        </div>
        
        <div class="card-content">
          <div class="intro-features">
            ${step.features.map(f => `
              <div class="intro-feature">
                <span class="intro-feature-icon">${f.icon}</span>
                <div class="intro-feature-text">
                  <strong>${f.title}</strong>
                  ${f.description}
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="user-identification">
            <div class="form-group">
              <label for="user-name" class="form-label">Ditt namn (valfritt)</label>
              <input 
                type="text" 
                id="user-name" 
                class="form-input" 
                placeholder="Förnamn Efternamn"
                value="${user?.name || ''}"
              />
              <p class="form-help">Hjälper oss förstå vem som gett feedback</p>
            </div>
          </div>
        </div>
        
        <div class="card-footer justify-center">
          <button class="btn btn-primary btn-lg" id="start-btn">
            Börja validering →
          </button>
        </div>
      </div>
    `;
    }

    /**
     * Rendera fas-steg
     */
    function renderPhase(step, feedback) {
        const sectionsHtml = step.sections.map(section => `
      <div class="content-section">
        <h4 class="section-title">
          <span class="section-title-icon">${section.icon}</span>
          ${section.title}
        </h4>
        <ul class="content-list">
          ${section.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');

        return `
      <div class="step-container">
        <div class="step-badge-wrapper">
          <span class="badge badge-info">Fas ${step.number}</span>
          <span class="step-number">Steg ${StepManager.getCurrentStep()} av ${StepManager.getTotalSteps() - 1}</span>
        </div>
        
        <div class="card phase-card">
          <div class="card-header">
            <h2 class="card-title">${step.title}</h2>
            <p class="card-description">${step.subtitle}</p>
          </div>
          
          <div class="card-content">
            ${sectionsHtml}
          </div>
        </div>
        
        ${renderFeedbackForm(step.id, feedback)}
      </div>
    `;
    }

    /**
     * Rendera gate-steg
     */
    function renderGate(step, feedback) {
        const criteriaHtml = step.criteria.map(criterion => `
      <li class="criteria-item">
        <span class="criteria-icon">✓</span>
        <span class="criteria-text">${criterion}</span>
      </li>
    `).join('');

        return `
      <div class="step-container">
        <div class="step-badge-wrapper">
          <span class="badge badge-success">Gate ${step.number}</span>
          <span class="step-number">Steg ${StepManager.getCurrentStep()} av ${StepManager.getTotalSteps() - 1}</span>
        </div>
        
        <div class="card gate-card">
          <div class="card-header">
            <h2 class="card-title">${step.title}</h2>
            <p class="card-description">
              Ansvarig: ${step.responsible} | Godkänns av: ${step.approvedBy}
            </p>
          </div>
          
          <div class="card-content">
            <div class="content-section">
              <h4 class="section-title">
                <span class="section-title-icon">📋</span>
                Kriterier för godkännande
              </h4>
              <ul class="criteria-list">
                ${criteriaHtml}
              </ul>
            </div>
          </div>
        </div>
        
        ${renderFeedbackForm(step.id, feedback)}
      </div>
    `;
    }

    /**
     * Rendera feedback-formulär
     */
    function renderFeedbackForm(stepId, feedback) {
        const additionsList = feedback.additions.map((item, i) => `
      <div class="suggestion-item addition">
        <span class="suggestion-text">${item}</span>
        <button class="suggestion-remove" data-type="addition" data-index="${i}" aria-label="Ta bort">
          ✕
        </button>
      </div>
    `).join('');

        const removalsList = feedback.removals.map((item, i) => `
      <div class="suggestion-item removal">
        <span class="suggestion-text">${item}</span>
        <button class="suggestion-remove" data-type="removal" data-index="${i}" aria-label="Ta bort">
          ✕
        </button>
      </div>
    `).join('');

        return `
      <div class="card feedback-card">
        <div class="card-header">
          <h3 class="card-title">Din Feedback</h3>
          <p class="card-description">Dela med dig av dina synpunkter på detta steg</p>
        </div>
        
        <div class="card-content">
          <div class="form-group">
            <label for="comment" class="form-label">Kommentar</label>
            <textarea 
              id="comment" 
              class="form-textarea" 
              placeholder="Skriv din kommentar här..."
              data-step="${stepId}"
            >${feedback.comment}</textarea>
          </div>
          
          <div class="form-group">
            <label class="form-label">
              <span style="color: var(--success);">+</span> Förslag på tillägg
            </label>
            <div class="suggestion-list" id="additions-list">
              ${additionsList}
            </div>
            <div class="add-suggestion">
              <input 
                type="text" 
                id="addition-input" 
                class="form-input" 
                placeholder="Vad borde läggas till?"
              />
              <button class="btn btn-outline btn-md" id="add-addition-btn">Lägg till</button>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">
              <span style="color: var(--error);">−</span> Förslag på borttagning
            </label>
            <div class="suggestion-list" id="removals-list">
              ${removalsList}
            </div>
            <div class="add-suggestion">
              <input 
                type="text" 
                id="removal-input" 
                class="form-input" 
                placeholder="Vad borde tas bort?"
              />
              <button class="btn btn-outline btn-md" id="add-removal-btn">Lägg till</button>
            </div>
          </div>
          
          <div class="approval-toggle ${feedback.approved ? 'approved' : ''}" id="approval-toggle">
            <div class="toggle-switch ${feedback.approved ? 'active' : ''}" id="toggle-switch"></div>
            <span class="toggle-label">
              ${feedback.approved ? '✓ Jag godkänner detta steg' : 'Godkänn detta steg'}
            </span>
          </div>
        </div>
      </div>
    `;
    }

    /**
     * Rendera sammanfattning
     */
    function renderSummary(step, steps, feedbackCache, user) {
        // Filtrera bort intro och summary
        const contentSteps = steps.filter(s => s.type === 'phase' || s.type === 'gate');

        const summaryItems = contentSteps.map(s => {
            const feedback = FeedbackManager.get(s.id);
            const hasFeedback = FeedbackManager.hasFeedback(s.id);
            const typeLabel = s.type === 'phase' ? `Fas ${s.number}` : `Gate ${s.number}`;
            const badgeClass = s.type === 'phase' ? 'badge-info' : 'badge-success';

            let feedbackHtml = '';
            if (feedback.comment) {
                feedbackHtml += `<p><strong>Kommentar:</strong> ${feedback.comment}</p>`;
            }
            if (feedback.additions.length > 0) {
                feedbackHtml += `<p><strong>Tillägg:</strong> ${feedback.additions.join(', ')}</p>`;
            }
            if (feedback.removals.length > 0) {
                feedbackHtml += `<p><strong>Borttagningar:</strong> ${feedback.removals.join(', ')}</p>`;
            }

            return `
        <div class="summary-item">
          <div class="summary-item-header">
            <span class="summary-item-title">
              <span class="badge ${badgeClass}">${typeLabel}</span>
              ${s.title}
            </span>
            ${feedback.approved
                    ? '<span class="badge badge-success">Godkänd</span>'
                    : '<span class="badge badge-default">Ej godkänd</span>'
                }
          </div>
          <div class="summary-item-feedback">
            ${feedbackHtml || '<em>Ingen feedback</em>'}
          </div>
        </div>
      `;
        }).join('');

        return `
      <div class="step-container">
        <div class="summary-header">
          <h1>📋 Sammanfattning</h1>
          <p>Granska din feedback innan du skickar in</p>
        </div>
        
        <div class="summary-grid">
          ${summaryItems}
        </div>
        
        <div class="overall-comment-section">
          <h3>Övergripande kommentar</h3>
          <div class="form-group">
            <textarea 
              id="overall-comment" 
              class="form-textarea" 
              placeholder="Har du några övergripande kommentarer om arbetsflödet?"
              rows="4"
            ></textarea>
          </div>
        </div>
        
        <div class="send-feedback-section">
          <h3>Skicka din feedback</h3>
          <p>Din feedback skickas till vårt team för genomgång</p>
          <button class="btn btn-success btn-lg" id="send-feedback-btn">
            📤 Skicka feedback
          </button>
        </div>
      </div>
    `;
    }

    /**
     * Rendera aktuellt steg
     */
    function renderStep(step, steps, feedback, user) {
        if (!elements.stepContainer) return;

        let html = '';

        switch (step.type) {
            case 'intro':
                html = renderIntro(step, user);
                break;
            case 'phase':
                html = renderPhase(step, feedback);
                break;
            case 'gate':
                html = renderGate(step, feedback);
                break;
            case 'summary':
                html = renderSummary(step, steps, null, user);
                break;
            default:
                html = '<p>Okänd stegtyp</p>';
        }

        elements.stepContainer.innerHTML = html;

        // Scrolla till toppen
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Uppdatera navigation
     */
    function updateNavigation(currentStep, totalSteps) {
        if (elements.prevBtn) {
            elements.prevBtn.disabled = currentStep === 0;
            elements.prevBtn.classList.toggle('hidden', currentStep === 0);
        }

        if (elements.nextBtn) {
            const isLast = currentStep === totalSteps - 1;
            elements.nextBtn.textContent = isLast ? 'Sammanfattning →' : 'Nästa →';
            elements.nextBtn.classList.toggle('hidden', isLast);
        }

        if (elements.navInfo) {
            if (currentStep === 0) {
                elements.navInfo.textContent = '';
            } else if (currentStep === totalSteps - 1) {
                elements.navInfo.textContent = 'Sista steget';
            } else {
                elements.navInfo.textContent = `Steg ${currentStep} av ${totalSteps - 1}`;
            }
        }
    }

    /**
     * Visa toast-notifikation
     */
    function showToast(title, message, type = 'info') {
        if (!elements.toastContainer) return;

        const icons = {
            success: '✓',
            error: '✕',
            info: 'ℹ',
            warning: '⚠'
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-close" aria-label="Stäng">✕</button>
    `;

        elements.toastContainer.appendChild(toast);

        // Bind close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });

        // Auto-remove efter 5 sekunder
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 5000);
    }

    /**
     * Sätt loading-state på en knapp
     */
    function setButtonLoading(button, loading) {
        if (!button) return;

        if (loading) {
            button.disabled = true;
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = '<span class="loading-spinner"></span> Skickar...';
        } else {
            button.disabled = false;
            button.innerHTML = button.dataset.originalText || button.innerHTML;
        }
    }

    // Public API
    return {
        init,
        renderStepper,
        renderStep,
        updateNavigation,
        showToast,
        setButtonLoading,
        toggleTheme,
        getElements: () => elements
    };
})();
