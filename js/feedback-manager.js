/**
 * Feedback Manager - Hanterar feedback-data för varje steg
 */

const FeedbackManager = (function () {
    // In-memory cache av feedback
    let feedbackCache = {};

    /**
     * Ladda all sparad feedback från storage
     */
    async function loadAll() {
        try {
            const allFeedback = await Storage.getAllFeedback();
            feedbackCache = {};
            allFeedback.forEach(item => {
                feedbackCache[item.stepId] = item;
            });
            return feedbackCache;
        } catch (error) {
            console.error('Error loading feedback:', error);
            return {};
        }
    }

    /**
     * Hämta feedback för ett steg
     */
    function get(stepId) {
        return feedbackCache[stepId] || createEmptyFeedback(stepId);
    }

    /**
     * Skapa tom feedback-struktur
     */
    function createEmptyFeedback(stepId) {
        return {
            stepId,
            comment: '',
            additions: [],
            removals: [],
            approved: false
        };
    }

    /**
     * Spara feedback för ett steg
     */
    async function save(stepId, feedbackData) {
        const data = {
            ...createEmptyFeedback(stepId),
            ...feedbackData
        };

        feedbackCache[stepId] = data;

        try {
            await Storage.saveFeedback(stepId, data);
        } catch (error) {
            console.error('Error saving feedback:', error);
        }

        return data;
    }

    /**
     * Uppdatera kommentar
     */
    async function updateComment(stepId, comment) {
        const current = get(stepId);
        return save(stepId, { ...current, comment });
    }

    /**
     * Lägg till förslag på tillägg
     */
    async function addAddition(stepId, text) {
        if (!text.trim()) return;

        const current = get(stepId);
        const additions = [...current.additions, text.trim()];
        return save(stepId, { ...current, additions });
    }

    /**
     * Ta bort förslag på tillägg
     */
    async function removeAddition(stepId, index) {
        const current = get(stepId);
        const additions = current.additions.filter((_, i) => i !== index);
        return save(stepId, { ...current, additions });
    }

    /**
     * Lägg till förslag på borttagning
     */
    async function addRemoval(stepId, text) {
        if (!text.trim()) return;

        const current = get(stepId);
        const removals = [...current.removals, text.trim()];
        return save(stepId, { ...current, removals });
    }

    /**
     * Ta bort förslag på borttagning
     */
    async function removeRemoval(stepId, index) {
        const current = get(stepId);
        const removals = current.removals.filter((_, i) => i !== index);
        return save(stepId, { ...current, removals });
    }

    /**
     * Sätt godkännande-status
     */
    async function setApproved(stepId, approved) {
        const current = get(stepId);
        return save(stepId, { ...current, approved });
    }

    /**
     * Hämta all feedback
     */
    function getAll() {
        return { ...feedbackCache };
    }

    /**
     * Kolla om ett steg har feedback
     */
    function hasFeedback(stepId) {
        const feedback = feedbackCache[stepId];
        if (!feedback) return false;

        return (
            feedback.comment.trim() !== '' ||
            feedback.additions.length > 0 ||
            feedback.removals.length > 0
        );
    }

    /**
     * Sammanställ all feedback för export
     */
    function compile(steps) {
        const compiledSteps = [];

        steps.forEach(step => {
            if (step.type === 'intro' || step.type === 'summary') return;

            const feedback = get(step.id);
            compiledSteps.push({
                stepId: step.id,
                stepName: step.title,
                stepType: step.type,
                comment: feedback.comment,
                additions: feedback.additions,
                removals: feedback.removals,
                approved: feedback.approved
            });
        });

        return compiledSteps;
    }

    /**
     * Rensa all feedback
     */
    async function clearAll() {
        feedbackCache = {};
        try {
            await Storage.clearFeedback();
        } catch (error) {
            console.error('Error clearing feedback:', error);
        }
    }

    // Public API
    return {
        loadAll,
        get,
        save,
        updateComment,
        addAddition,
        removeAddition,
        addRemoval,
        removeRemoval,
        setApproved,
        getAll,
        hasFeedback,
        compile,
        clearAll
    };
})();
