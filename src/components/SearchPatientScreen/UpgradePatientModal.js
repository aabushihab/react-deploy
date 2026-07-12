// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import { upgradePatientTranslations } from '../../i18n/upgradePatientTranslations';

// const API_PATIENT = `${BASE_URL}/api/patients`;

// const UpgradePatientModal = ({ patientId, loggedUser, lang = 'en', onClose, onPatientUpgraded }) => {
//   const t = upgradePatientTranslations[lang] || upgradePatientTranslations.en;
//   const isRTL = lang === 'ar';

//   // ----- Form fields state -----
//   const [formData, setFormData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     phone: '',
//     address: '',
//     country: '',
//     city: '',
//     gender: '',
//     dateOfBirth: '',
//     nationality: '',
//     nationalId: '',
//     passportNumber: '',
//     email: '',
//     emergencyContactName: '',
//     emergencyContactPhone: '',
//     occupation: '',
//   });

//   // ----- UI state -----
//   const [loading, setLoading] = useState(false);
//   const [upgrading, setUpgrading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [errors, setErrors] = useState({});

//   // ----- Helper to log actions -----
//   const logAction = useCallback(async (action, details) => {
//     try {
//       await fetch(`${BASE_URL}/api/logs/add`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: loggedUser, action, details }),
//       });
//     } catch (e) { /* ignore */ }
//   }, [loggedUser]);

//   // ----- Fetch patient data -----
//   const fetchPatient = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_PATIENT}/search/id/${patientId}`);
//       if (!res.ok) throw new Error('Failed to load patient');
//       const data = await res.json();

//       setFormData({
//         firstName: data.firstName || '',
//         middleName: data.middleName || '',
//         lastName: data.lastName || '',
//         phone: data.phone || '',
//         address: data.address || '',
//         country: data.country || '',
//         city: data.city || '',
//         gender: data.gender || '',
//         dateOfBirth: data.dateOfBirth || '',
//         nationality: data.nationality || '',
//         nationalId: data.nationalId || '',
//         passportNumber: data.passportNumber || '',
//         email: data.email || '',
//         emergencyContactName: data.emergencyContactName || '',
//         emergencyContactPhone: data.emergencyContactPhone || '',
//         occupation: data.occupation || '',
//       });
//       setStatusMsg(`✅ ${t.status.loaded}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.alert.loadFailed}: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, [patientId, t]);

//   // ----- Initial load -----
//   useEffect(() => {
//     fetchPatient();
//     logAction('OPEN_UPGRADE_PATIENT', `Opened upgrade screen for patientId=${patientId}`);
//   }, [fetchPatient, logAction, patientId]);

//   // ----- Update field handler -----
//   const handleChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setErrors(prev => ({ ...prev, [field]: '' }));
//   };

//   // ----- Validation -----
//   const validate = () => {
//     const newErrors = {};
//     let valid = true;

//     const required = (field, label, min = 3, max = 15) => {
//       const val = formData[field]?.trim();
//       if (!val || val.length < min || val.length > max) {
//         newErrors[field] = t.error[field] || `${label} must be between ${min} and ${max} characters`;
//         valid = false;
//       }
//     };

//     required('firstName', t.lbl.firstName);
//     required('lastName', t.lbl.lastName);
//     required('address', t.lbl.address, 3, 50);
//     required('country', t.lbl.country, 2);
//     required('city', t.lbl.city, 2);

//     // Phone: optional + and 7-15 digits
//     const phone = formData.phone.trim();
//     if (!/^\+?\d{7,15}$/.test(phone)) {
//       newErrors.phone = t.error.phone;
//       valid = false;
//     }

//     if (!formData.gender) {
//       newErrors.gender = t.error.gender;
//       valid = false;
//     }

//     if (!formData.dateOfBirth) {
//       newErrors.dateOfBirth = t.error.dob;
//       valid = false;
//     } else {
//       const dob = new Date(formData.dateOfBirth);
//       const now = new Date();
//       if (dob > now) {
//         newErrors.dateOfBirth = t.error.dobFuture;
//         valid = false;
//       }
//     }

//     // Optional fields
//     if (formData.nationality && formData.nationality.length < 3) {
//       newErrors.nationality = t.error.nationality;
//       valid = false;
//     }
//     if (formData.nationalId && formData.nationalId.length < 5) {
//       newErrors.nationalId = t.error.nationalId;
//       valid = false;
//     }
//     if (formData.passportNumber && formData.passportNumber.length < 5) {
//       newErrors.passportNumber = t.error.passport;
//       valid = false;
//     }
//     if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = t.error.email;
//       valid = false;
//     }
//     if (formData.emergencyContactPhone && !/^\+?\d{7,15}$/.test(formData.emergencyContactPhone)) {
//       newErrors.emergencyContactPhone = t.error.emergencyPhone;
//       valid = false;
//     }
//     if (formData.occupation && formData.occupation.length < 3) {
//       newErrors.occupation = t.error.occupation;
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   // ----- Upgrade handler -----
//   const handleUpgrade = async () => {
//     if (!validate()) {
//       setStatusMsg(`⚠️ ${t.alert.fixErrors}`);
//       return;
//     }

//     setUpgrading(true);
//     setStatusMsg(`⏳ ${t.status.upgrading}`);

//     try {
//       const payload = {
//         firstName: formData.firstName.trim(),
//         middleName: formData.middleName.trim(),
//         lastName: formData.lastName.trim(),
//         phone: formData.phone.trim(),
//         address: formData.address.trim(),
//         country: formData.country.trim(),
//         city: formData.city.trim(),
//         gender: formData.gender,
//         dateOfBirth: formData.dateOfBirth,
//         nationality: formData.nationality.trim(),
//         nationalId: formData.nationalId.trim(),
//         passportNumber: formData.passportNumber.trim(),
//         email: formData.email.trim(),
//         emergencyContactName: formData.emergencyContactName.trim(),
//         emergencyContactPhone: formData.emergencyContactPhone.trim(),
//         occupation: formData.occupation.trim(),
//         type: 'PERMANENT',
//       };

//       const res = await fetch(`${API_PATIENT}/upgrade/${patientId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`HTTP ${res.status} - ${errorText}`);
//       }

//       setStatusMsg(`✅ ${t.status.upgraded}`);
//       logAction('UPGRADE_PATIENT', `Patient ID ${patientId} upgraded to PERMANENT`);
//       onPatientUpgraded && onPatientUpgraded();
//       setTimeout(onClose, 1500); // close after success
//     } catch (err) {
//       setStatusMsg(`❌ ${t.alert.upgradeFailed}: ${err.message}`);
//       logAction('UPGRADE_PATIENT_FAILED', `Failed to upgrade patient ID ${patientId}: ${err.message}`);
//     } finally {
//       setUpgrading(false);
//     }
//   };

//   // ----- Render -----
//   return (
//     <div style={modalOverlay}>
//       <div style={{ ...modalContent, direction: isRTL ? 'rtl' : 'ltr' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//           <h2>⬆️ {t.title.upgradePatient}</h2>
//           <button onClick={onClose} style={closeBtn}>✕</button>
//         </div>

//         {loading ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
//         ) : (
//           <>
//             <p style={{ color: '#4a5568', marginBottom: 20 }}>📝 {t.subtitle.upgradeInfo}</p>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
//               {/* First Name */}
//               <FieldGroup label={t.lbl.firstName} error={errors.firstName}>
//                 <input
//                   type="text"
//                   value={formData.firstName}
//                   onChange={e => handleChange('firstName', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Middle Name */}
//               <FieldGroup label={t.lbl.middleName}>
//                 <input
//                   type="text"
//                   value={formData.middleName}
//                   onChange={e => handleChange('middleName', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Last Name */}
//               <FieldGroup label={t.lbl.lastName} error={errors.lastName}>
//                 <input
//                   type="text"
//                   value={formData.lastName}
//                   onChange={e => handleChange('lastName', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Phone */}
//               <FieldGroup label={t.lbl.phone} error={errors.phone}>
//                 <input
//                   type="text"
//                   value={formData.phone}
//                   onChange={e => handleChange('phone', e.target.value)}
//                   placeholder={t.phone.prompt}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Address */}
//               <FieldGroup label={t.lbl.address} error={errors.address} fullWidth>
//                 <input
//                   type="text"
//                   value={formData.address}
//                   onChange={e => handleChange('address', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Country */}
//               <FieldGroup label={t.lbl.country} error={errors.country}>
//                 <input
//                   type="text"
//                   value={formData.country}
//                   onChange={e => handleChange('country', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* City */}
//               <FieldGroup label={t.lbl.city} error={errors.city}>
//                 <input
//                   type="text"
//                   value={formData.city}
//                   onChange={e => handleChange('city', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Gender */}
//               <FieldGroup label={t.lbl.gender} error={errors.gender}>
//                 <select
//                   value={formData.gender}
//                   onChange={e => handleChange('gender', e.target.value)}
//                   style={selectStyle}
//                 >
//                   <option value="">{t.gender.select}</option>
//                   <option value="Male">{t.gender.male}</option>
//                   <option value="Female">{t.gender.female}</option>
//                   <option value="Other">{t.gender.other}</option>
//                 </select>
//               </FieldGroup>

//               {/* Date of Birth */}
//               <FieldGroup label={t.lbl.dob} error={errors.dateOfBirth}>
//                 <input
//                   type="date"
//                   value={formData.dateOfBirth}
//                   onChange={e => handleChange('dateOfBirth', e.target.value)}
//                   max={new Date().toISOString().split('T')[0]}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Nationality */}
//               <FieldGroup label={t.lbl.nationality} error={errors.nationality}>
//                 <input
//                   type="text"
//                   value={formData.nationality}
//                   onChange={e => handleChange('nationality', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* National ID */}
//               <FieldGroup label={t.lbl.nationalId} error={errors.nationalId}>
//                 <input
//                   type="text"
//                   value={formData.nationalId}
//                   onChange={e => handleChange('nationalId', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Passport */}
//               <FieldGroup label={t.lbl.passport} error={errors.passportNumber}>
//                 <input
//                   type="text"
//                   value={formData.passportNumber}
//                   onChange={e => handleChange('passportNumber', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Email */}
//               <FieldGroup label={t.lbl.email} error={errors.email}>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={e => handleChange('email', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Emergency Contact Name */}
//               <FieldGroup label={t.lbl.emergencyName} error={errors.emergencyContactName}>
//                 <input
//                   type="text"
//                   value={formData.emergencyContactName}
//                   onChange={e => handleChange('emergencyContactName', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Emergency Phone */}
//               <FieldGroup label={t.lbl.emergencyPhone} error={errors.emergencyContactPhone}>
//                 <input
//                   type="text"
//                   value={formData.emergencyContactPhone}
//                   onChange={e => handleChange('emergencyContactPhone', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>

//               {/* Occupation */}
//               <FieldGroup label={t.lbl.occupation} error={errors.occupation}>
//                 <input
//                   type="text"
//                   value={formData.occupation}
//                   onChange={e => handleChange('occupation', e.target.value)}
//                   style={inputStyle}
//                 />
//               </FieldGroup>
//             </div>

//             <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <span style={{ color: '#4a5568' }}>{statusMsg}</span>
//               <div>
//                 <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.cancel}</button>
//                 <button onClick={handleUpgrade} style={primaryBtn('#ed8936')} disabled={upgrading}>
//                   {upgrading ? '⏳' : '⬆️ ' + t.btn.upgradePermanent}
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // ----- Sub-components -----
// const FieldGroup = ({ label, error, children, fullWidth }) => (
//   <div style={{ gridColumn: fullWidth ? 'span 2' : 'span 1' }}>
//     <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>{label}</label>
//     {children}
//     {error && <div style={{ color: '#fc8181', fontSize: 12, marginTop: 4 }}>{error}</div>}
//   </div>
// );

// // ----- Styles -----
// const modalOverlay = {
//   position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//   background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
//   alignItems: 'center', zIndex: 1000,
// };

// const modalContent = {
//   background: 'white', borderRadius: 12, padding: 20,
//   maxWidth: 900, width: '90%', maxHeight: '90vh', overflowY: 'auto',
//   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// const inputStyle = {
//   width: '100%', padding: '8px 12px', borderRadius: 8,
//   border: '1px solid #e2e8f0', fontSize: 14,
// };

// const selectStyle = {
//   ...inputStyle, appearance: 'auto',
// };

// const primaryBtn = (bg) => ({
//   background: bg, color: 'white', fontWeight: 'bold', border: 'none',
//   borderRadius: 8, padding: '8px 20px', cursor: 'pointer', marginLeft: 10,
// });

// const secondaryBtn = {
//   background: '#e2e8f0', border: 'none', padding: '8px 20px',
//   borderRadius: 8, cursor: 'pointer',
// };

// const closeBtn = {
//   background: 'transparent', border: 'none', fontSize: 24,
//   cursor: 'pointer', color: '#a0aec0',
// };

// export default UpgradePatientModal; 12072026 4:00 pm

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
      setTimeout(onClose, 1500);
    } catch (err) {
      setStatusMsg(`❌ ${t.alert.upgradeFailed}: ${err.message}`);
      logAction('UPGRADE_PATIENT_FAILED', `Failed to upgrade patient ID ${patientId}: ${err.message}`);
    } finally {
      setUpgrading(false);
    }
  };

  // ----- Render -----
  return (
    <>
      <style>{`
        /* ==================== UPGRADE PATIENT MODAL STYLES ==================== */
        .upgrade-patient-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .upgrade-patient-modal {
          background: white;
          border-radius: 12px;
          padding: 20px;
          max-width: 900px;
          width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: slideUp 0.3s ease;
        }

        .upgrade-patient-modal.rtl {
          direction: rtl;
        }

        .upgrade-patient-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .upgrade-patient-header h2 {
          margin: 0;
          font-size: 22px;
          color: #2d3748;
        }

        .upgrade-patient-close-btn {
          background: transparent;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #a0aec0;
          min-width: 36px;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .upgrade-patient-close-btn:hover {
          background: #f7fafc;
          color: #e74c3c;
        }

        .upgrade-patient-subtitle {
          color: #4a5568;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .upgrade-patient-loading {
          text-align: center;
          padding: 40px;
          color: #7f8c8d;
        }

        .upgrade-patient-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .upgrade-patient-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .upgrade-patient-field.full-width {
          grid-column: span 2;
        }

        .upgrade-patient-field label {
          font-weight: bold;
          font-size: 14px;
          color: #2d3748;
        }

        .upgrade-patient-field .field-error {
          color: #fc8181;
          font-size: 12px;
          margin-top: 4px;
        }

        .upgrade-patient-input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          background: white;
          min-height: 38px;
          transition: border-color 0.2s;
        }

        .upgrade-patient-input:focus {
          outline: none;
          border-color: #4299e1;
        }

        .upgrade-patient-input.error {
          border-color: #fc8181;
        }

        .upgrade-patient-select {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          background: white;
          min-height: 38px;
          transition: border-color 0.2s;
        }

        .upgrade-patient-select:focus {
          outline: none;
          border-color: #4299e1;
        }

        .upgrade-patient-select.error {
          border-color: #fc8181;
        }

        .upgrade-patient-footer {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .upgrade-patient-status {
          color: #4a5568;
          font-size: 14px;
        }

        .upgrade-patient-status.success {
          color: #48bb78;
        }

        .upgrade-patient-status.error {
          color: #fc8181;
        }

        .upgrade-patient-status.loading {
          color: #f39c12;
        }

        .upgrade-patient-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .upgrade-patient-btn {
          padding: 8px 20px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 38px;
          font-size: 14px;
        }

        .upgrade-patient-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .upgrade-patient-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .upgrade-patient-btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .upgrade-patient-btn-secondary:hover:not(:disabled) {
          background: #cbd5e0;
        }

        .upgrade-patient-btn-primary {
          background: #ed8936;
          color: white;
        }

        .upgrade-patient-btn-primary:hover:not(:disabled) {
          background: #dd6b20;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .upgrade-patient-modal {
            padding: 16px;
            width: 100%;
          }

          .upgrade-patient-header h2 {
            font-size: 18px;
          }

          .upgrade-patient-form-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .upgrade-patient-field.full-width {
            grid-column: span 1;
          }

          .upgrade-patient-footer {
            flex-direction: column;
            align-items: stretch;
          }

          .upgrade-patient-status {
            text-align: center;
          }

          .upgrade-patient-actions {
            justify-content: center;
          }

          .upgrade-patient-btn {
            flex: 1;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .upgrade-patient-modal {
            padding: 12px;
          }

          .upgrade-patient-header h2 {
            font-size: 16px;
          }

          .upgrade-patient-close-btn {
            font-size: 20px;
            min-width: 32px;
            min-height: 32px;
          }

          .upgrade-patient-subtitle {
            font-size: 13px;
          }

          .upgrade-patient-input,
          .upgrade-patient-select {
            font-size: 15px;
            min-height: 36px;
          }

          .upgrade-patient-btn {
            font-size: 13px;
            padding: 6px 14px;
            min-height: 34px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .upgrade-patient-modal {
            max-width: 90%;
          }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .upgrade-patient-overlay {
            background: rgba(0, 0, 0, 0.7);
          }

          .upgrade-patient-modal {
            background: #1a1a2e;
          }

          .upgrade-patient-header h2 {
            color: #ecf0f1;
          }

          .upgrade-patient-close-btn {
            color: #b0b0b0;
          }

          .upgrade-patient-close-btn:hover {
            background: #2d2d44;
            color: #e74c3c;
          }

          .upgrade-patient-subtitle {
            color: #b0b0b0;
          }

          .upgrade-patient-field label {
            color: #b0b0b0;
          }

          .upgrade-patient-input,
          .upgrade-patient-select {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .upgrade-patient-input:focus,
          .upgrade-patient-select:focus {
            border-color: #4299e1;
          }

          .upgrade-patient-input::placeholder {
            color: #666;
          }

          .upgrade-patient-status {
            color: #b0b0b0;
          }

          .upgrade-patient-status.success {
            color: #4CAF50;
          }

          .upgrade-patient-status.error {
            color: #fc8181;
          }

          .upgrade-patient-status.loading {
            color: #f39c12;
          }

          .upgrade-patient-btn-secondary {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .upgrade-patient-btn-secondary:hover:not(:disabled) {
            background: #3d3d5c;
          }

          .upgrade-patient-btn-primary {
            background: #b7791f;
          }

          .upgrade-patient-btn-primary:hover:not(:disabled) {
            background: #d69e2e;
          }

          .upgrade-patient-field .field-error {
            color: #fc8181;
          }

          .upgrade-patient-loading {
            color: #666;
          }
        }
      `}</style>

      <div className="upgrade-patient-overlay" onClick={onClose}>
        <div className={`upgrade-patient-modal ${isRTL ? 'rtl' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="upgrade-patient-header">
            <h2>⬆️ {t.title.upgradePatient}</h2>
            <button className="upgrade-patient-close-btn" onClick={onClose}>✕</button>
          </div>

          {loading ? (
            <div className="upgrade-patient-loading">⏳ {t.status.loading}</div>
          ) : (
            <>
              <p className="upgrade-patient-subtitle">📝 {t.subtitle.upgradeInfo}</p>
              
              <div className="upgrade-patient-form-grid">
                {/* First Name */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.firstName}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.firstName ? 'error' : ''}`}
                    value={formData.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                  />
                  {errors.firstName && <div className="field-error">{errors.firstName}</div>}
                </div>

                {/* Middle Name */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.middleName}</label>
                  <input
                    type="text"
                    className="upgrade-patient-input"
                    value={formData.middleName}
                    onChange={e => handleChange('middleName', e.target.value)}
                  />
                </div>

                {/* Last Name */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.lastName}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.lastName ? 'error' : ''}`}
                    value={formData.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                  />
                  {errors.lastName && <div className="field-error">{errors.lastName}</div>}
                </div>

                {/* Phone */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.phone}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.phone ? 'error' : ''}`}
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder={t.phone.prompt}
                  />
                  {errors.phone && <div className="field-error">{errors.phone}</div>}
                </div>

                {/* Address */}
                <div className="upgrade-patient-field full-width">
                  <label>{t.lbl.address}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.address ? 'error' : ''}`}
                    value={formData.address}
                    onChange={e => handleChange('address', e.target.value)}
                  />
                  {errors.address && <div className="field-error">{errors.address}</div>}
                </div>

                {/* Country */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.country}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.country ? 'error' : ''}`}
                    value={formData.country}
                    onChange={e => handleChange('country', e.target.value)}
                  />
                  {errors.country && <div className="field-error">{errors.country}</div>}
                </div>

                {/* City */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.city}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.city ? 'error' : ''}`}
                    value={formData.city}
                    onChange={e => handleChange('city', e.target.value)}
                  />
                  {errors.city && <div className="field-error">{errors.city}</div>}
                </div>

                {/* Gender */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.gender}</label>
                  <select
                    className={`upgrade-patient-select ${errors.gender ? 'error' : ''}`}
                    value={formData.gender}
                    onChange={e => handleChange('gender', e.target.value)}
                  >
                    <option value="">{t.gender.select}</option>
                    <option value="Male">{t.gender.male}</option>
                    <option value="Female">{t.gender.female}</option>
                    <option value="Other">{t.gender.other}</option>
                  </select>
                  {errors.gender && <div className="field-error">{errors.gender}</div>}
                </div>

                {/* Date of Birth */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.dob}</label>
                  <input
                    type="date"
                    className={`upgrade-patient-input ${errors.dateOfBirth ? 'error' : ''}`}
                    value={formData.dateOfBirth}
                    onChange={e => handleChange('dateOfBirth', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.dateOfBirth && <div className="field-error">{errors.dateOfBirth}</div>}
                </div>

                {/* Nationality */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.nationality}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.nationality ? 'error' : ''}`}
                    value={formData.nationality}
                    onChange={e => handleChange('nationality', e.target.value)}
                  />
                  {errors.nationality && <div className="field-error">{errors.nationality}</div>}
                </div>

                {/* National ID */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.nationalId}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.nationalId ? 'error' : ''}`}
                    value={formData.nationalId}
                    onChange={e => handleChange('nationalId', e.target.value)}
                  />
                  {errors.nationalId && <div className="field-error">{errors.nationalId}</div>}
                </div>

                {/* Passport */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.passport}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.passportNumber ? 'error' : ''}`}
                    value={formData.passportNumber}
                    onChange={e => handleChange('passportNumber', e.target.value)}
                  />
                  {errors.passportNumber && <div className="field-error">{errors.passportNumber}</div>}
                </div>

                {/* Email */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.email}</label>
                  <input
                    type="email"
                    className={`upgrade-patient-input ${errors.email ? 'error' : ''}`}
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                  />
                  {errors.email && <div className="field-error">{errors.email}</div>}
                </div>

                {/* Emergency Contact Name */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.emergencyName}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.emergencyContactName ? 'error' : ''}`}
                    value={formData.emergencyContactName}
                    onChange={e => handleChange('emergencyContactName', e.target.value)}
                  />
                  {errors.emergencyContactName && <div className="field-error">{errors.emergencyContactName}</div>}
                </div>

                {/* Emergency Phone */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.emergencyPhone}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.emergencyContactPhone ? 'error' : ''}`}
                    value={formData.emergencyContactPhone}
                    onChange={e => handleChange('emergencyContactPhone', e.target.value)}
                  />
                  {errors.emergencyContactPhone && <div className="field-error">{errors.emergencyContactPhone}</div>}
                </div>

                {/* Occupation */}
                <div className="upgrade-patient-field">
                  <label>{t.lbl.occupation}</label>
                  <input
                    type="text"
                    className={`upgrade-patient-input ${errors.occupation ? 'error' : ''}`}
                    value={formData.occupation}
                    onChange={e => handleChange('occupation', e.target.value)}
                  />
                  {errors.occupation && <div className="field-error">{errors.occupation}</div>}
                </div>
              </div>

              <div className="upgrade-patient-footer">
                <span className={`upgrade-patient-status ${statusMsg.includes('✅') ? 'success' : statusMsg.includes('❌') ? 'error' : statusMsg.includes('⏳') ? 'loading' : ''}`}>
                  {statusMsg}
                </span>
                <div className="upgrade-patient-actions">
                  <button className="upgrade-patient-btn upgrade-patient-btn-secondary" onClick={onClose}>
                    ✕ {t.btn.cancel}
                  </button>
                  <button className="upgrade-patient-btn upgrade-patient-btn-primary" onClick={handleUpgrade} disabled={upgrading}>
                    {upgrading ? '⏳' : '⬆️ ' + t.btn.upgradePermanent}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpgradePatientModal;