/**
 * Storage abstraction utility for handling localStorage and cookies
 */

// Cookie utility functions
const COOKIE_EXPIRY_DAYS = 7;

export const CookieManager = {
  set: (name, value, days = COOKIE_EXPIRY_DAYS) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + days);
    const cookieValue = encodeURIComponent(value) + 
      (days ? `; expires=${expiryDate.toUTCString()}` : '') + 
      '; path=/; SameSite=Lax';
    document.cookie = `${name}=${cookieValue}`;
  },
  
  get: (name) => {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }
    return null;
  },
  
  remove: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
};

// LocalStorage utility functions
export const LocalStorageManager = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return false;
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return false;
    }
  }
}; 