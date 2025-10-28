/**
 * IndexedDB Storage Manager
 * Provides robust local storage for prayer app data
 * Replaces cookies with a proper database solution
 */

const DB_NAME = 'PrayerAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'appData';

class IndexedDBStorage {
  constructor() {
    this.db = null;
    this.initPromise = this.init();
  }

  /**
   * Initialize IndexedDB
   * @returns {Promise<IDBDatabase>}
   */
  async init() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB not supported, falling back to localStorage');
        resolve(null);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          objectStore.createIndex('timestamp', 'timestamp', { unique: false });
          console.log('IndexedDB object store created');
        }
      };
    });
  }

  /**
   * Set a value in IndexedDB
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be serialized)
   * @returns {Promise<void>}
   */
  async setItem(key, value) {
    try {
      await this.initPromise;

      if (!this.db) {
        // Fallback to localStorage
        localStorage.setItem(key, JSON.stringify(value));
        return;
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const data = {
          key: key,
          value: value,
          timestamp: new Date().toISOString()
        };

        const request = store.put(data);

        request.onsuccess = () => {
          console.log(`IndexedDB: Stored ${key}`);
          resolve();
        };

        request.onerror = () => {
          console.error('IndexedDB setItem error:', request.error);
          // Fallback to localStorage
          localStorage.setItem(key, JSON.stringify(value));
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('IndexedDB setItem error:', error);
      // Fallback to localStorage
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Get a value from IndexedDB
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key not found
   * @returns {Promise<*>}
   */
  async getItem(key, defaultValue = null) {
    try {
      await this.initPromise;

      if (!this.db) {
        // Fallback to localStorage
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);

        request.onsuccess = () => {
          if (request.result && request.result.value !== undefined) {
            console.log(`IndexedDB: Retrieved ${key}`);
            resolve(request.result.value);
          } else {
            // Try localStorage as fallback
            const item = localStorage.getItem(key);
            const value = item ? JSON.parse(item) : defaultValue;
            resolve(value);
          }
        };

        request.onerror = () => {
          console.error('IndexedDB getItem error:', request.error);
          // Fallback to localStorage
          const item = localStorage.getItem(key);
          resolve(item ? JSON.parse(item) : defaultValue);
        };
      });
    } catch (error) {
      console.error('IndexedDB getItem error:', error);
      // Fallback to localStorage
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    }
  }

  /**
   * Remove a value from IndexedDB
   * @param {string} key - Storage key
   * @returns {Promise<void>}
   */
  async removeItem(key) {
    try {
      await this.initPromise;

      if (!this.db) {
        localStorage.removeItem(key);
        return;
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(key);

        request.onsuccess = () => {
          console.log(`IndexedDB: Removed ${key}`);
          localStorage.removeItem(key);
          resolve();
        };

        request.onerror = () => {
          console.error('IndexedDB removeItem error:', request.error);
          localStorage.removeItem(key);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('IndexedDB removeItem error:', error);
      localStorage.removeItem(key);
    }
  }

  /**
   * Clear all data from IndexedDB
   * @returns {Promise<void>}
   */
  async clear() {
    try {
      await this.initPromise;

      if (!this.db) {
        localStorage.clear();
        return;
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => {
          console.log('IndexedDB: Cleared all data');
          localStorage.clear();
          resolve();
        };

        request.onerror = () => {
          console.error('IndexedDB clear error:', request.error);
          localStorage.clear();
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('IndexedDB clear error:', error);
      localStorage.clear();
    }
  }

  /**
   * Get all keys from IndexedDB
   * @returns {Promise<string[]>}
   */
  async getAllKeys() {
    try {
      await this.initPromise;

      if (!this.db) {
        return Object.keys(localStorage);
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAllKeys();

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          console.error('IndexedDB getAllKeys error:', request.error);
          resolve(Object.keys(localStorage));
        };
      });
    } catch (error) {
      console.error('IndexedDB getAllKeys error:', error);
      return Object.keys(localStorage);
    }
  }

  /**
   * Export all data (useful for backup/migration)
   * @returns {Promise<Object>}
   */
  async exportAllData() {
    try {
      await this.initPromise;

      if (!this.db) {
        const data = {};
        Object.keys(localStorage).forEach(key => {
          data[key] = JSON.parse(localStorage.getItem(key));
        });
        return data;
      }

      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
          const data = {};
          request.result.forEach(item => {
            data[item.key] = item.value;
          });
          resolve(data);
        };

        request.onerror = () => {
          console.error('IndexedDB exportAllData error:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('IndexedDB exportAllData error:', error);
      return {};
    }
  }

  /**
   * Import data (useful for restore/migration)
   * @param {Object} data - Data to import
   * @returns {Promise<void>}
   */
  async importData(data) {
    try {
      await this.initPromise;

      const promises = Object.entries(data).map(([key, value]) =>
        this.setItem(key, value)
      );

      await Promise.all(promises);
      console.log('IndexedDB: Data imported successfully');
    } catch (error) {
      console.error('IndexedDB importData error:', error);
      throw error;
    }
  }
}

// Create singleton instance
const dbStorage = new IndexedDBStorage();

export default dbStorage;
