/**
 * Step Manager - Hanterar navigation mellan steg
 */

const StepManager = (function () {
    let currentStep = 0;
    let totalSteps = 0;
    let onStepChangeCallback = null;

    /**
     * Initialisera step manager
     */
    function init(steps, savedStep = 0) {
        totalSteps = steps.length;
        currentStep = Math.min(savedStep, totalSteps - 1);
        return currentStep;
    }

    /**
     * Gå till ett specifikt steg
     */
    function goToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= totalSteps) {
            return false;
        }

        currentStep = stepIndex;

        if (onStepChangeCallback) {
            onStepChangeCallback(currentStep);
        }

        return true;
    }

    /**
     * Gå till nästa steg
     */
    function nextStep() {
        if (currentStep < totalSteps - 1) {
            return goToStep(currentStep + 1);
        }
        return false;
    }

    /**
     * Gå till föregående steg
     */
    function prevStep() {
        if (currentStep > 0) {
            return goToStep(currentStep - 1);
        }
        return false;
    }

    /**
     * Sätt callback för stegbyte
     */
    function onStepChange(callback) {
        onStepChangeCallback = callback;
    }

    /**
     * Kontrollera om vi är på första steget
     */
    function isFirstStep() {
        return currentStep === 0;
    }

    /**
     * Kontrollera om vi är på sista steget
     */
    function isLastStep() {
        return currentStep === totalSteps - 1;
    }

    /**
     * Hämta stegdata
     */
    function getStepData(steps) {
        return steps[currentStep];
    }

    // Public API
    return {
        init,
        goToStep,
        nextStep,
        prevStep,
        onStepChange,
        isFirstStep,
        isLastStep,
        getStepData,
        getCurrentStep: () => currentStep,
        getTotalSteps: () => totalSteps
    };
})();
