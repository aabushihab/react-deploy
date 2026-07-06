import React from 'react';
import './IdleWarningModal.css';

const IdleWarningModal = ({ 
  isOpen, 
  onContinue, 
  onLogout, 
  timeRemaining,
  isRTL = false 
}) => {
  if (!isOpen) return null;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className={`idle-warning-overlay ${isRTL ? 'rtl' : ''}`} onClick={(e) => e.stopPropagation()}>
      <div className="idle-warning-modal" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="idle-warning-header">
          <span className="idle-warning-icon">⏰</span>
          <h2>Session Timeout Warning</h2>
        </div>
        <div className="idle-warning-body">
          <p>
            You have been inactive for a while. Your session will expire in 
            <strong> {minutes}:{seconds.toString().padStart(2, '0')} </strong>
            if you don't interact with the page.
          </p>
          <p>Click "Continue Session" to stay logged in.</p>
        </div>
        <div className="idle-warning-footer">
          <button 
            className="idle-warning-btn continue"
            onClick={onContinue}
          >
            Continue Session
          </button>
          <button 
            className="idle-warning-btn logout"
            onClick={onLogout}
          >
            Logout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdleWarningModal;