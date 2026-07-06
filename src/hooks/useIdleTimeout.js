import { useState, useEffect, useCallback, useRef } from 'react';

const useIdleTimeout = (timeoutMs = 30 * 60 * 1000, warningMs = 2 * 60 * 1000) => {
  const [showWarning, setShowWarning] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const warningTimerRef = useRef(null);
  const logoutTimerRef = useRef(null);

  const performLogout = useCallback(() => {
    // Clear all storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(';').forEach(c => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    
    // Redirect to login
    window.location.href = window.location.origin + '/login';
  }, []);

  const resetIdleTimer = useCallback(() => {
    setLastActivity(Date.now());
    setShowWarning(false);
    
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }, []);

  const handleUserActivity = useCallback(() => {
    resetIdleTimer();
  }, [resetIdleTimer]);

  const checkIdleStatus = useCallback(() => {
    const now = Date.now();
    const idleTime = now - lastActivity;
    
    if (idleTime >= timeoutMs && !showWarning) {
      // Show warning
      setShowWarning(true);
      
      // Set timer to logout after warning period
      warningTimerRef.current = setTimeout(() => {
        performLogout();
      }, warningMs);
    } else if (idleTime >= timeoutMs - warningMs && !showWarning) {
      // Show warning when approaching timeout
      setShowWarning(true);
      
      warningTimerRef.current = setTimeout(() => {
        performLogout();
      }, warningMs);
    }
  }, [lastActivity, showWarning, timeoutMs, warningMs, performLogout]);

  useEffect(() => {
    // Activity events to track
    const activityEvents = [
      'mousedown', 'mousemove', 'keydown', 'scroll', 
      'touchstart', 'click', 'wheel', 'focus', 'resize'
    ];
    
    // Add event listeners
    activityEvents.forEach(event => {
      document.addEventListener(event, handleUserActivity);
    });
    
    // Check idle status every 30 seconds
    const intervalId = setInterval(checkIdleStatus, 30000);
    
    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      clearInterval(intervalId);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, [handleUserActivity, checkIdleStatus]);

  // Return warning state and methods to interact with it
  return {
    showWarning,
    resetIdleTimer,
    performLogout,
    timeRemaining: Math.max(0, Math.floor((timeoutMs - (Date.now() - lastActivity)) / 1000))
  };
};

export default useIdleTimeout;