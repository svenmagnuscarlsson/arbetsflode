/**
 * Storage Module - IndexedDB för persistent lagring
 * Hanterar feedback och progress
 */

const Storage = (function () {
    const DB_NAME = 'workflow-validation';
    const DB_VERSION = 1;
    const STORES = {
        FEEDBACK: 'feedback',
        PROGRESS: 'progress',
        USER: 'user'
    };

    let db = null;

    /**
     * Initialisera IndexedDB
     */
    async function init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error('IndexedDB error:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                db = request.result;
                console.log('IndexedDB initialized');
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const database = event.target.result;

                // Feedback store - keyed by step ID
                if (!database.objectStoreNames.contains(STORES.FEEDBACK)) {
                    database.createObjectStore(STORES.FEEDBACK, { keyPath: 'stepId' });
                }

                // Progress store - single record
                if (!database.objectStoreNames.contains(STORES.PROGRESS)) {
                    database.createObjectStore(STORES.PROGRESS, { keyPath: 'id' });
                }

                // User store - user information
                if (!database.objectStoreNames.contains(STORES.USER)) {
                    database.createObjectStore(STORES.USER, { keyPath: 'id' });
                }
            };
        });
    }

    /**
     * Generisk put-operation
     */
    async function put(storeName, data) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Generisk get-operation
     */
    async function get(storeName, key) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Hämta alla records från en store
     */
    async function getAll(storeName) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Radera en record
     */
    async function remove(storeName, key) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Rensa en hel store
     */
    async function clear(storeName) {
        return new Promise((resolve, reject) => {
            if (!db) {
                reject(new Error('Database not initialized'));
                return;
            }

            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // Public API
    return {
        init,

        // Feedback operations
        async saveFeedback(stepId, feedbackData) {
            const data = {
                stepId,
                ...feedbackData,
                updatedAt: new Date().toISOString()
            };
            return put(STORES.FEEDBACK, data);
        },

        async getFeedback(stepId) {
            return get(STORES.FEEDBACK, stepId);
        },

        async getAllFeedback() {
            return getAll(STORES.FEEDBACK);
        },

        async clearFeedback() {
            return clear(STORES.FEEDBACK);
        },

        // Progress operations
        async saveProgress(currentStep) {
            const data = {
                id: 'current',
                currentStep,
                updatedAt: new Date().toISOString()
            };
            return put(STORES.PROGRESS, data);
        },

        async getProgress() {
            const result = await get(STORES.PROGRESS, 'current');
            return result ? result.currentStep : 0;
        },

        // User operations
        async saveUser(userData) {
            const data = {
                id: 'user',
                ...userData,
                updatedAt: new Date().toISOString()
            };
            return put(STORES.USER, data);
        },

        async getUser() {
            return get(STORES.USER, 'user');
        },

        // Clear all data
        async clearAll() {
            await clear(STORES.FEEDBACK);
            await clear(STORES.PROGRESS);
            await clear(STORES.USER);
        }
    };
})();
