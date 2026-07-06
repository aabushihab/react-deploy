import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../../utils/api';
import { upgradePatientTranslations } from '../../i18n/upgradePatientTranslations';

const API_PATIENT = `${BASE_URL}/api/patients`;

const UpgradePatientModal = ({ patientId, loggedUser, lang = 'en', onClose, onPatientUpgraded }) => {
  const t = upgradePatientTranslations[lang] || upgradePatientTranslations.en;
  const isRTL = lang === 'ar';

  // ----- Form fields state -----
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    nationalId: '',
    passportNumber: '',
    email: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    occupation: '',
  });

  // ----- UI state -----
  const [loading, setLoading] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
  const [errors, setErrors] = useState({});

  // ----- Helper to log actions -----
  const logAction = useCallback(async (action, details) => {
    try {
      await fetch(`${BASE_URL}/api/logs/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedUser, action, details }),
      });
    } catch (e) { /* ignore */ }
  }, [loggedUser]);

  // ----- Fetch patient data -----
  const fetchPatient = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_PATIENT}/search/id/${patientId}`);
      if (!res.ok) throw new Error('Failed to load patient');
      const data = await res.json();

      setFormData({
        firstName: data.firstName || '',
        middleName: data.middleName || '',
        lastName: data.lastName || '',
        phone: data.phone || '',
        address: data.address || '',
        country: data.country || '',
        city: data.city || '',
        gender: data.gender || '',
        dateOfBirth: data.dateOfBirth || '',
        nationality: data.nationality || '',
        nationalId: data.nationalId || '',
        passportNumber: data.passportNumber || '',
        email: data.email || '',
        emergencyContactName: data.emergencyContactName || '',
        emergencyContactPhone: data.emergencyContactPhone || '',
        occupation: data.occupation || '',
      });
      setStatusMsg(`✅ ${t.status.loaded}`);
    } catch (err) {
      setStatusMsg(`❌ ${t.alert.loadFailed}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [patientId, t]);

  // ----- Initial load -----
  useEffect(() => {
    fetchPatient();
    logAction('OPEN_UPGRADE_PATIENT', `Opened upgrade screen for patientId=${patientId}`);
  }, [fetchPatient, logAction, patientId]);

  // ----- Update field handler -----
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // ----- Validation -----
  const validate = () => {
    const newErrors = {};
    let valid = true;

    const required = (field, label, min = 3, max = 15) => {
      const val = formData[field]?.trim();
      if (!val || val.length < min || val.length > max) {
        newErrors[field] = t.error[field] || `${label} must be between ${min} and ${max} characters`;
        valid = false;
      }
    };

    required('firstName', t.lbl.firstName);
    required('lastName', t.lbl.lastName);
    required('address', t.lbl.address, 3, 50);
    required('country', t.lbl.country, 2);
    required('city', t.lbl.city, 2);

    // Phone: optional + and 7-15 digits
    const phone = formData.phone.trim();
    if (!/^\+?\d{7,15}$/.test(phone)) {
      newErrors.phone = t.error.phone;
      valid = false;
    }

    if (!formData.gender) {
      newErrors.gender = t.error.gender;
      valid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = t.error.dob;
      valid = false;
    } else {
      const dob = new Date(formData.dateOfBirth);
      const now = new Date();
      if (dob > now) {
        newErrors.dateOfBirth = t.error.dobFuture;
        valid = false;
      }
    }

    // Optional fields
    if (formData.nationality && formData.nationality.length < 3) {
      newErrors.nationality = t.error.nationality;
      valid = false;
    }
    if (formData.nationalId && formData.nationalId.length < 5) {
      newErrors.nationalId = t.error.nationalId;
      valid = false;
    }
    if (formData.passportNumber && formData.passportNumber.length < 5) {
      newErrors.passportNumber = t.error.passport;
      valid = false;
    }
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = t.error.email;
      valid = false;
    }
    if (formData.emergencyContactPhone && !/^\+?\d{7,15}$/.test(formData.emergencyContactPhone)) {
      newErrors.emergencyContactPhone = t.error.emergencyPhone;
      valid = false;
    }
    if (formData.occupation && formData.occupation.length < 3) {
      newErrors.occupation = t.error.occupation;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ----- Upgrade handler -----
  const handleUpgrade = async () => {
    if (!validate()) {
      setStatusMsg(`⚠️ ${t.alert.fixErrors}`);
      return;
    }

    setUpgrading(true);
    setStatusMsg(`⏳ ${t.status.upgrading}`);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        country: formData.country.trim(),
        city: formData.city.trim(),
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality.trim(),
        nationalId: formData.nationalId.trim(),
        passportNumber: formData.passportNumber.trim(),
        email: formData.email.trim(),
        emergencyContactName: formData.emergencyContactName.trim(),
        emergencyContactPhone: formData.emergencyContactPhone.trim(),
        occupation: formData.occupation.trim(),
        type: 'PERMANENT',
      };

      const res = await fetch(`${API_PATIENT}/upgrade/${patientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status} - ${errorText}`);
      }

      setStatusMsg(`✅ ${t.status.upgraded}`);
      logAction('UPGRADE_PATIENT', `Patient ID ${patientId} upgraded to PERMANENT`);
      onPatientUpgraded && onPatientUpgraded();
      setTimeout(onClose, 1500); // close after success
    } catch (err) {
      setStatusMsg(`❌ ${t.alert.upgradeFailed}: ${err.message}`);
      logAction('UPGRADE_PATIENT_FAILED', `Failed to upgrade patient ID ${patientId}: ${err.message}`);
    } finally {
      setUpgrading(false);
    }
  };

  // ----- Render -----
  return (
    <div style={modalOverlay}>
      <div style={{ ...modalContent, direction: isRTL ? 'rtl' : 'ltr' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2>⬆️ {t.title.upgradePatient}</h2>
          <button onClick={onClose} style={closeBtn}>✕</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
        ) : (
          <>
            <p style={{ color: '#4a5568', marginBottom: 20 }}>📝 {t.subtitle.upgradeInfo}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              {/* First Name */}
              <FieldGroup label={t.lbl.firstName} error={errors.firstName}>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Middle Name */}
              <FieldGroup label={t.lbl.middleName}>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={e => handleChange('middleName', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Last Name */}
              <FieldGroup label={t.lbl.lastName} error={errors.lastName}>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Phone */}
              <FieldGroup label={t.lbl.phone} error={errors.phone}>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                  placeholder={t.phone.prompt}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Address */}
              <FieldGroup label={t.lbl.address} error={errors.address} fullWidth>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => handleChange('address', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Country */}
              <FieldGroup label={t.lbl.country} error={errors.country}>
                <input
                  type="text"
                  value={formData.country}
                  onChange={e => handleChange('country', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* City */}
              <FieldGroup label={t.lbl.city} error={errors.city}>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => handleChange('city', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Gender */}
              <FieldGroup label={t.lbl.gender} error={errors.gender}>
                <select
                  value={formData.gender}
                  onChange={e => handleChange('gender', e.target.value)}
                  style={selectStyle}
                >
                  <option value="">{t.gender.select}</option>
                  <option value="Male">{t.gender.male}</option>
                  <option value="Female">{t.gender.female}</option>
                  <option value="Other">{t.gender.other}</option>
                </select>
              </FieldGroup>

              {/* Date of Birth */}
              <FieldGroup label={t.lbl.dob} error={errors.dateOfBirth}>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={e => handleChange('dateOfBirth', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Nationality */}
              <FieldGroup label={t.lbl.nationality} error={errors.nationality}>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={e => handleChange('nationality', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* National ID */}
              <FieldGroup label={t.lbl.nationalId} error={errors.nationalId}>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={e => handleChange('nationalId', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Passport */}
              <FieldGroup label={t.lbl.passport} error={errors.passportNumber}>
                <input
                  type="text"
                  value={formData.passportNumber}
                  onChange={e => handleChange('passportNumber', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Email */}
              <FieldGroup label={t.lbl.email} error={errors.email}>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange('email', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Emergency Contact Name */}
              <FieldGroup label={t.lbl.emergencyName} error={errors.emergencyContactName}>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={e => handleChange('emergencyContactName', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Emergency Phone */}
              <FieldGroup label={t.lbl.emergencyPhone} error={errors.emergencyContactPhone}>
                <input
                  type="text"
                  value={formData.emergencyContactPhone}
                  onChange={e => handleChange('emergencyContactPhone', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>

              {/* Occupation */}
              <FieldGroup label={t.lbl.occupation} error={errors.occupation}>
                <input
                  type="text"
                  value={formData.occupation}
                  onChange={e => handleChange('occupation', e.target.value)}
                  style={inputStyle}
                />
              </FieldGroup>
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#4a5568' }}>{statusMsg}</span>
              <div>
                <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.cancel}</button>
                <button onClick={handleUpgrade} style={primaryBtn('#ed8936')} disabled={upgrading}>
                  {upgrading ? '⏳' : '⬆️ ' + t.btn.upgradePermanent}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ----- Sub-components -----
const FieldGroup = ({ label, error, children, fullWidth }) => (
  <div style={{ gridColumn: fullWidth ? 'span 2' : 'span 1' }}>
    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>{label}</label>
    {children}
    {error && <div style={{ color: '#fc8181', fontSize: 12, marginTop: 4 }}>{error}</div>}
  </div>
);

// ----- Styles -----
const modalOverlay = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
  alignItems: 'center', zIndex: 1000,
};

const modalContent = {
  background: 'white', borderRadius: 12, padding: 20,
  maxWidth: 900, width: '90%', maxHeight: '90vh', overflowY: 'auto',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

const inputStyle = {
  width: '100%', padding: '8px 12px', borderRadius: 8,
  border: '1px solid #e2e8f0', fontSize: 14,
};

const selectStyle = {
  ...inputStyle, appearance: 'auto',
};

const primaryBtn = (bg) => ({
  background: bg, color: 'white', fontWeight: 'bold', border: 'none',
  borderRadius: 8, padding: '8px 20px', cursor: 'pointer', marginLeft: 10,
});

const secondaryBtn = {
  background: '#e2e8f0', border: 'none', padding: '8px 20px',
  borderRadius: 8, cursor: 'pointer',
};

const closeBtn = {
  background: 'transparent', border: 'none', fontSize: 24,
  cursor: 'pointer', color: '#a0aec0',
};

export default UpgradePatientModal;