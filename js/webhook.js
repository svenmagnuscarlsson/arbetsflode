/**
 * Webhook Module - Skickar feedback till n8n
 */

const Webhook = (function () {
    const WEBHOOK_URL = 'https://natan.swedeniot.se/webhook-test/3079b512-f047-442e-b284-9bf682a26597';

    /**
     * Skicka feedback till webhook
     */
    async function send(data) {
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Försök parsa JSON-svar om det finns
            let result = null;
            try {
                result = await response.json();
            } catch {
                // Om inget JSON-svar, det är OK
                result = { success: true };
            }

            return {
                success: true,
                data: result
            };
        } catch (error) {
            console.error('Webhook error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Formatera feedback för att skicka
     */
    function formatPayload(compiledFeedback, user, overallComment) {
        return {
            timestamp: new Date().toISOString(),
            user: {
                name: user?.name || 'Anonym',
                email: user?.email || null
            },
            steps: compiledFeedback,
            overallComment: overallComment || '',
            metadata: {
                workflowVersion: WORKFLOW_DATA.version,
                workflowTitle: WORKFLOW_DATA.title,
                submittedAt: new Date().toISOString(),
                userAgent: navigator.userAgent
            }
        };
    }

    /**
     * Skicka komplett feedback
     */
    async function sendFeedback(steps, user, overallComment) {
        const compiledFeedback = FeedbackManager.compile(steps);
        const payload = formatPayload(compiledFeedback, user, overallComment);
        return send(payload);
    }

    // Public API
    return {
        send,
        sendFeedback,
        formatPayload,
        getWebhookUrl: () => WEBHOOK_URL
    };
})();
