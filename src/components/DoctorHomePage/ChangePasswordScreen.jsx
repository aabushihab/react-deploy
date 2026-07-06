// ChangePasswordScreen.jsx
import React, { useState } from 'react';
import './ChangePasswordScreen.css';

const ChangePasswordScreen = ({ 
  isOpen, 
  onClose, 
  onChangePassword, 
  username, 
  t,
  isRTL = false 
}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError(t('doctor.password.fillAll') || 'Please fill all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(t('doctor.password.notMatch') || 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    const success = await onChangePassword(oldPassword, newPassword);
    setLoading(false);

    if (success) {
      // Clear form and close
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      onClose();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`change-password-overlay ${isRTL ? 'rtl' : ''}`} onClick={onClose}>
      <div 
        className="change-password-modal" 
        onClick={(e) => e.stopPropagation()}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="change-password-header">
          <button className="change-password-close" onClick={onClose}>
            ✖
          </button>
          <div className="change-password-title">
            <span className="change-password-icon">🔒</span>
            <h2>{t('doctor.password.title') || 'Change Password'}</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="change-password-form">
          {error && (
            <div className="change-password-error">
              ⚠️ {error}
            </div>
          )}

          <div className="change-password-field">
            <label htmlFor="oldPassword" className="change-password-label">
              {t('doctor.password.old') || 'Old Password'}
            </label>
            <div className="change-password-input-wrapper">
              <input
                id="oldPassword"
                type={showPasswords ? 'text' : 'password'}
                className="change-password-input"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('doctor.password.old') || 'Enter old password'}
                autoFocus
                disabled={loading}
              />
              <span className="change-password-input-icon">🔑</span>
            </div>
          </div>

          <div className="change-password-field">
            <label htmlFor="newPassword" className="change-password-label">
              {t('doctor.password.new') || 'New Password'}
            </label>
            <div className="change-password-input-wrapper">
              <input
                id="newPassword"
                type={showPasswords ? 'text' : 'password'}
                className="change-password-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('doctor.password.new') || 'Enter new password'}
                disabled={loading}
              />
              <span className="change-password-input-icon">🔐</span>
            </div>
          </div>

          <div className="change-password-field">
            <label htmlFor="confirmPassword" className="change-password-label">
              {t('doctor.password.confirm') || 'Confirm Password'}
            </label>
            <div className="change-password-input-wrapper">
              <input
                id="confirmPassword"
                type={showPasswords ? 'text' : 'password'}
                className="change-password-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('doctor.password.confirm') || 'Confirm new password'}
                disabled={loading}
              />
              <span className="change-password-input-icon">🔐</span>
            </div>
          </div>

          <div className="change-password-toggle">
            <label className="change-password-toggle-label">
              <input
                type="checkbox"
                checked={showPasswords}
                onChange={(e) => setShowPasswords(e.target.checked)}
                disabled={loading}
              />
              <span className="change-password-toggle-text">👁️ Show passwords</span>
            </label>
          </div>

          <div className="change-password-actions">
            <button 
              type="button" 
              className="change-password-btn cancel" 
              onClick={onClose}
              disabled={loading}
            >
              {t('doctor.dialog.close') || 'Close'}
            </button>
            <button 
              type="submit" 
              className="change-password-btn submit" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="change-password-spinner"></span>
                  {t('doctor.loading') || 'Loading...'}
                </>
              ) : (
                t('doctor.password.save') || 'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordScreen;