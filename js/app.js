/**
 * App Module - Huvudinitiering och koordinering
 */

const App = (function () {
    let steps = [];
    let user = null;

    /**
     * Initialisera applikationen
     */
    async function init() {
        try {
            // Initialisera storage
            await Storage.init();

            // Ladda workflow data
            steps = WORKFLOW_DATA.steps;

            // Ladda sparad feedback
            await FeedbackManager.loadAll();

            // Ladda sparad progress
            const savedProgress = await Storage.getProgress();

            // Ladda användarinfo
            user = await Storage.getUser();

            // Initialisera step manager
            StepManager.init(steps, savedProgress);
            StepManager.onStepChange(handleStepChange);

            // Initialisera UI
            UI.init();

            // Rendera initial vy
            renderCurrentStep();

            // Bind globala event listeners
            bindEventListeners();

            console.log('App initialized successfully');
        } catch (error) {
            console.error('Error initializing app:', error);
            UI.showToast('Fel', 'Kunde inte ladda applikationen', 'error');
        }
    }

    /**
     * Hantera stegbyte
     */
    async function handleStepChange(stepIndex) {
        // Spara progress
        await Storage.saveProgress(stepIndex);

        // Rendera nytt steg
        renderCurrentStep();
    }

    /**
     * Rendera aktuellt steg
     */
    function renderCurrentStep() {
        const currentStep = StepManager.getCurrentStep();
        const step = steps[currentStep];
        const feedback = FeedbackManager.get(step.id);

        // Rendera stepper
        UI.renderStepper(currentStep, steps, FeedbackManager.getAll());

        // Rendera steginnehåll
        UI.renderStep(step, steps, feedback, user);

        // Uppdatera navigation
        UI.updateNavigation(currentStep, steps.length);

        // Bind steg-specifika event listeners
        bindStepEventListeners(step);
    }

    /**
     * Bind globala event listeners
     */
    function bindEventListeners() {
        const elements = UI.getElements();

        // Navigation buttons
        if (elements.prevBtn) {
            elements.prevBtn.addEventListener('click', () => {
                StepManager.prevStep();
            });
        }

        if (elements.nextBtn) {
            elements.nextBtn.addEventListener('click', () => {
                StepManager.nextStep();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Ignorera om vi skriver i ett input-fält
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                StepManager.nextStep();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                StepManager.prevStep();
            }
        });
    }

    /**
     * Bind steg-specifika event listeners
     */
    function bindStepEventListeners(step) {
        // Intro: Start-knapp och användarnamn
        if (step.type === 'intro') {
            const startBtn = document.getElementById('start-btn');
            const userNameInput = document.getElementById('user-name');

            if (startBtn) {
                startBtn.addEventListener('click', () => {
                    StepManager.nextStep();
                });
            }

            if (userNameInput) {
                userNameInput.addEventListener('blur', async () => {
                    user = { name: userNameInput.value.trim() };
                    await Storage.saveUser(user);
                });
            }
            return;
        }

        // Summary: Skicka feedback
        if (step.type === 'summary') {
            const sendBtn = document.getElementById('send-feedback-btn');

            if (sendBtn) {
                sendBtn.addEventListener('click', handleSendFeedback);
            }
            return;
        }

        // Fas/Gate: Feedback-formulär
        bindFeedbackFormListeners(step.id);
    }

    /**
     * Bind event listeners för feedback-formulär
     */
    function bindFeedbackFormListeners(stepId) {
        // Kommentar textarea
        const commentTextarea = document.getElementById('comment');
        if (commentTextarea) {
            let debounceTimer;
            commentTextarea.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    FeedbackManager.updateComment(stepId, commentTextarea.value);
                }, 500);
            });
        }

        // Lägg till tillägg
        const additionInput = document.getElementById('addition-input');
        const addAdditionBtn = document.getElementById('add-addition-btn');

        if (additionInput && addAdditionBtn) {
            const addAddition = async () => {
                const text = additionInput.value.trim();
                if (text) {
                    await FeedbackManager.addAddition(stepId, text);
                    additionInput.value = '';
                    renderCurrentStep();
                    UI.showToast('Tillagt', 'Ditt förslag har sparats', 'success');
                }
            };

            addAdditionBtn.addEventListener('click', addAddition);
            additionInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addAddition();
                }
            });
        }

        // Lägg till borttagning
        const removalInput = document.getElementById('removal-input');
        const addRemovalBtn = document.getElementById('add-removal-btn');

        if (removalInput && addRemovalBtn) {
            const addRemoval = async () => {
                const text = removalInput.value.trim();
                if (text) {
                    await FeedbackManager.addRemoval(stepId, text);
                    removalInput.value = '';
                    renderCurrentStep();
                    UI.showToast('Tillagt', 'Ditt förslag har sparats', 'success');
                }
            };

            addRemovalBtn.addEventListener('click', addRemoval);
            removalInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addRemoval();
                }
            });
        }

        // Ta bort förslag
        document.querySelectorAll('.suggestion-remove').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const type = e.target.dataset.type;
                const index = parseInt(e.target.dataset.index, 10);

                if (type === 'addition') {
                    await FeedbackManager.removeAddition(stepId, index);
                } else if (type === 'removal') {
                    await FeedbackManager.removeRemoval(stepId, index);
                }

                renderCurrentStep();
            });
        });

        // Godkänn-toggle
        const approvalToggle = document.getElementById('approval-toggle');
        const toggleSwitch = document.getElementById('toggle-switch');

        if (approvalToggle && toggleSwitch) {
            approvalToggle.addEventListener('click', async () => {
                const feedback = FeedbackManager.get(stepId);
                const newApproved = !feedback.approved;
                await FeedbackManager.setApproved(stepId, newApproved);

                // Uppdatera UI
                approvalToggle.classList.toggle('approved', newApproved);
                toggleSwitch.classList.toggle('active', newApproved);
                approvalToggle.querySelector('.toggle-label').textContent =
                    newApproved ? '✓ Jag godkänner detta steg' : 'Godkänn detta steg';
            });
        }
    }

    /**
     * Hantera skicka feedback
     */
    async function handleSendFeedback() {
        const sendBtn = document.getElementById('send-feedback-btn');
        const overallComment = document.getElementById('overall-comment')?.value || '';

        UI.setButtonLoading(sendBtn, true);

        try {
            const result = await Webhook.sendFeedback(steps, user, overallComment);

            if (result.success) {
                UI.showToast('Skickat!', 'Din feedback har skickats. Tack för ditt bidrag!', 'success');

                // Automatisk omdirigering och rensning efter 2 sekunder
                setTimeout(async () => {
                    await Storage.clearAll();
                    await FeedbackManager.loadAll();
                    user = null;
                    StepManager.goToStep(0);
                }, 2000);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            UI.showToast(
                'Kunde inte skicka',
                'Din feedback är sparad lokalt. Försök igen senare.',
                'error'
            );
        } finally {
            UI.setButtonLoading(sendBtn, false);
        }
    }

    // Public API
    return {
        init
    };
})();

// Starta applikationen när DOM är laddad
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
