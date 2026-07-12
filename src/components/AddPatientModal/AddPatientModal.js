// import React, { useState, useEffect } from 'react';
// import { BASE_URL } from '../../utils/api';

// const modalOverlay = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   background: 'rgba(0,0,0,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 1000,
// };

// const modalContent = {
//   background: 'white',
//   borderRadius: 12,
//   padding: 20,
//   minWidth: 400,
//   maxWidth: 700,
//   maxHeight: '80vh',
//   overflowY: 'auto',
//   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc', width: '100%' };
// const selectStyle = { ...inputStyle, height: 38 };
// const labelStyle = { fontWeight: 'bold', marginBottom: 4 };

// const primaryBtn = (bg) => ({
//   background: bg,
//   color: 'white',
//   fontWeight: 'bold',
//   border: 'none',
//   borderRadius: 8,
//   padding: '10px 24px',
//   cursor: 'pointer',
//   fontSize: 14,
// });

// const secondaryBtn = {
//   background: '#e2e8f0',
//   border: 'none',
//   padding: '10px 24px',
//   borderRadius: 8,
//   cursor: 'pointer',
//   fontSize: 14,
// };

// const AddPatientModal = ({ translations = {}, lang, onClose, onPatientAdded }) => {
//   const t = translations; // now t is always an object

//   const [form, setForm] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     phone: '',
//     address: '',
//     gender: 'MALE',
//     dateOfBirth: '',
//     nationality: '',
//     nationalId: '',
//     passport: '',
//     email: '',
//     emergencyName: '',
//     emergencyPhone: '',
//     occupation: '',
//     country: '',
//     city: '',
//     insuranceProvider: '',
//     classA: false,
//     classB: false,
//     classC: false,
//     tempPatient: false,
//   });

//   const [countries, setCountries] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [insuranceProviders, setInsuranceProviders] = useState([]);
//   const [saving, setSaving] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [status, setStatus] = useState('');

//   useEffect(() => {
//     const loadCountries = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/arab-cities/full`);
//         if (!res.ok) throw new Error('Failed to load countries');
//         const data = await res.json();
//         const countryNames = data.map((item) => item.countryName);
//         setCountries(countryNames);
//         window.__countryData = data.reduce((acc, item) => {
//           acc[item.countryName] = item;
//           return acc;
//         }, {});
//       } catch (err) {
//         console.error('Error loading countries:', err);
//       }
//     };
//     loadCountries();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleCountryChange = (e) => {
//     const countryName = e.target.value;
//     setForm((prev) => ({ ...prev, country: countryName, city: '' }));
//     const countryData = window.__countryData?.[countryName];
//     if (countryData) {
//       const cityList = countryData.cities || [];
//       setCities(cityList);
//       const phoneCode = countryData.phoneCode || '';
//       if (phoneCode && !form.phone.startsWith(phoneCode)) {
//         setForm((prev) => ({ ...prev, phone: phoneCode }));
//       }
//       loadInsuranceProviders(countryName);
//     } else {
//       setCities([]);
//       setInsuranceProviders([]);
//     }
//   };

//   const loadInsuranceProviders = async (countryName) => {
//     try {
//       const encoded = encodeURIComponent(countryName.toLowerCase());
//       const res = await fetch(`${BASE_URL}/api/providers/country/${encoded}`);
//       if (!res.ok) throw new Error('Failed to load insurance providers');
//       const data = await res.json();
//       const providerNames = data.map((p) => p.name);
//       setInsuranceProviders(providerNames);
//       window.__providerData = data.reduce((acc, p) => {
//         acc[p.name] = p;
//         return acc;
//       }, {});
//       setForm((prev) => ({ ...prev, insuranceProvider: '', classA: false, classB: false, classC: false }));
//     } catch (err) {
//       console.error('Error loading insurance providers:', err);
//     }
//   };

//   const handleInsuranceChange = (e) => {
//     const providerName = e.target.value;
//     setForm((prev) => ({ ...prev, insuranceProvider: providerName }));
//     const providerData = window.__providerData?.[providerName];
//     if (providerData) {
//       setForm((prev) => ({
//         ...prev,
//         classA: providerData.classA || false,
//         classB: providerData.classB || false,
//         classC: providerData.classC || false,
//       }));
//     } else {
//       setForm((prev) => ({ ...prev, classA: false, classB: false, classC: false }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     const { firstName, lastName, phone, country, city, address, gender, dateOfBirth, tempPatient } = form;

//     if (!firstName.trim()) newErrors.firstName = 'First name is required';
//     if (!lastName.trim()) newErrors.lastName = 'Last name is required';
//     if (!phone.trim() || !phone.match(/^\+?\d{7,15}$/)) newErrors.phone = 'Valid phone number required';
//     if (!country) newErrors.country = 'Please select a country';
//     if (!city) newErrors.city = 'Please select a city';

//     if (!tempPatient) {
//       if (!address.trim()) newErrors.address = 'Address is required';
//       if (!gender) newErrors.gender = 'Gender is required';
//       if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSaving(true);
//     setStatus('');

//     try {
//       const {
//         firstName,
//         middleName,
//         lastName,
//         phone,
//         address,
//         gender,
//         dateOfBirth,
//         nationality,
//         nationalId,
//         passport,
//         email,
//         emergencyName,
//         emergencyPhone,
//         occupation,
//         country,
//         city,
//         insuranceProvider,
//         classA,
//         classB,
//         classC,
//         tempPatient,
//       } = form;

//       const payload = {
//         firstName: firstName.trim(),
//         middleName: middleName.trim() || null,
//         lastName: lastName.trim(),
//         phone: phone.trim(),
//         country,
//         city,
//         insuranceProvider: insuranceProvider || null,
//         classA,
//         classB,
//         classC,
//         address: tempPatient ? null : address.trim(),
//         gender: tempPatient ? null : gender,
//         dateOfBirth: tempPatient ? null : dateOfBirth,
//         nationality: tempPatient ? null : nationality.trim(),
//         nationalId: tempPatient ? null : nationalId.trim(),
//         passportNumber: tempPatient ? null : passport.trim(),
//         email: tempPatient ? null : email.trim(),
//         emergencyContactName: tempPatient ? null : emergencyName.trim(),
//         emergencyContactPhone: tempPatient ? null : emergencyPhone.trim(),
//         occupation: tempPatient ? null : occupation.trim(),
//       };

//       const endpoint = tempPatient ? '/api/patients/temp' : '/api/patients/permanent';
//       const res = await fetch(`${BASE_URL}${endpoint}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errData = await res.json().catch(() => ({}));
//         throw new Error(errData.message || `HTTP ${res.status}`);
//       }

//       const savedPatient = await res.json();
//       if (onPatientAdded) onPatientAdded(savedPatient);
//       setStatus('✅ Patient saved successfully');
//       setTimeout(() => onClose(), 800);
//     } catch (err) {
//       setStatus(`❌ Error: ${err.message}`);
//       console.error('Save error:', err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const renderField = (label, name, type = 'text', options = {}) => {
//     const value = form[name];
//     const error = errors[name];
//     const isCheckbox = type === 'checkbox';

//     let onChangeHandler = handleChange;
//     if (name === 'country') onChangeHandler = handleCountryChange;
//     if (name === 'insuranceProvider') onChangeHandler = handleInsuranceChange;

//     return (
//       <div style={{ marginBottom: 10 }}>
//         <label style={{ ...labelStyle, color: error ? '#e53e3e' : '#2d3748' }}>
//           {label}
//           {!isCheckbox && <span style={{ color: '#e53e3e' }}>*</span>}
//         </label>
//         {isCheckbox ? (
//           <input
//             type="checkbox"
//             name={name}
//             checked={value}
//             onChange={handleChange}
//             disabled={options.disabled}
//             style={{ marginLeft: 8, transform: 'scale(1.2)' }}
//           />
//         ) : type === 'select' ? (
//           <select
//             name={name}
//             value={value}
//             onChange={onChangeHandler}
//             style={{ ...selectStyle, borderColor: error ? '#fc8181' : '#ccc' }}
//             disabled={options.disabled}
//           >
//             <option value="">Select {label}</option>
//             {options.options?.map((opt) => (
//               <option key={opt} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         ) : type === 'date' ? (
//           <input
//             type="date"
//             name={name}
//             value={value}
//             onChange={handleChange}
//             style={{ ...inputStyle, borderColor: error ? '#fc8181' : '#ccc' }}
//             disabled={options.disabled}
//             max={new Date().toISOString().split('T')[0]}
//           />
//         ) : (
//           <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={handleChange}
//             style={{ ...inputStyle, borderColor: error ? '#fc8181' : '#ccc' }}
//             disabled={options.disabled}
//             placeholder={options.placeholder || ''}
//           />
//         )}
//         {error && <div style={{ color: '#fc8181', fontSize: 12, marginTop: 3 }}>{error}</div>}
//       </div>
//     );
//   };

//   const isTemp = form.tempPatient;
//   const isRTL = lang === 'ar';

//   return (
//     <div style={modalOverlay} onClick={onClose}>
//       <div style={modalContent} onClick={(e) => e.stopPropagation()} dir={isRTL ? 'rtl' : 'ltr'}>
//         <h3 style={{ marginBottom: 15 }}>➕ {t.title?.addPatient || 'Add New Patient'}</h3>

//         <div
//           style={{
//             padding: '10px 15px',
//             background: isTemp ? '#fff5f5' : '#f0fff4',
//             border: `2px solid ${isTemp ? '#fc8181' : '#48bb78'}`,
//             borderRadius: 8,
//             marginBottom: 20,
//           }}
//         >
//           <label style={{ fontWeight: 'bold', color: isTemp ? '#e53e3e' : '#2d3748' }}>
//             <input
//               type="checkbox"
//               name="tempPatient"
//               checked={isTemp}
//               onChange={handleChange}
//               style={{ marginRight: 8 }}
//             />
//             {t.patient?.temp || 'Temporary Patient'}
//           </label>
//           {isTemp && (
//             <div style={{ color: '#e53e3e', fontSize: 12, marginTop: 4 }}>
//               ⚠️ {t.label?.tempWarning || 'Only required fields (Name, Phone, Country, City) are needed'}
//             </div>
//           )}
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
//             {renderField('First Name', 'firstName')}
//             {renderField('Middle Name', 'middleName', 'text', { placeholder: 'Optional' })}
//             {renderField('Last Name', 'lastName')}
//             {renderField('Phone', 'phone', 'tel', { placeholder: '+1234567890' })}
//             {renderField('Country', 'country', 'select', { options: countries })}
//             {renderField('City', 'city', 'select', { options: cities, disabled: !form.country })}
//             {renderField('Address', 'address', 'text', { disabled: isTemp, placeholder: isTemp ? 'Not required for temp' : 'Required' })}
//             {renderField('Gender', 'gender', 'select', { options: ['MALE', 'FEMALE', 'OTHER'], disabled: isTemp })}
//             {renderField('Date of Birth', 'dateOfBirth', 'date', { disabled: isTemp })}
//             {renderField('Nationality', 'nationality', 'text', { disabled: isTemp, placeholder: 'Optional' })}
//             {renderField('National ID', 'nationalId', 'text', { disabled: isTemp, placeholder: 'Optional' })}
//             {renderField('Passport', 'passport', 'text', { disabled: isTemp, placeholder: 'Optional' })}
//             {renderField('Email', 'email', 'email', { disabled: isTemp, placeholder: 'Optional' })}
//             {renderField('Emergency Contact Name', 'emergencyName', 'text', { disabled: isTemp, placeholder: 'Optional' })}
//             {renderField('Emergency Phone', 'emergencyPhone', 'tel', { disabled: isTemp, placeholder: 'Optional' })}
//             {renderField('Occupation', 'occupation', 'text', { disabled: isTemp, placeholder: 'Optional' })}
//             {renderField('Insurance Provider', 'insuranceProvider', 'select', { options: insuranceProviders, disabled: isTemp || !form.country })}

//             <div style={{ gridColumn: 'span 2' }}>
//               <label style={labelStyle}>Insurance Classes</label>
//               <div style={{ display: 'flex', gap: 20, marginTop: 5 }}>
//                 <label>
//                   <input type="checkbox" name="classA" checked={form.classA} onChange={handleChange} disabled={isTemp || !form.insuranceProvider} /> Class A
//                 </label>
//                 <label>
//                   <input type="checkbox" name="classB" checked={form.classB} onChange={handleChange} disabled={isTemp || !form.insuranceProvider} /> Class B
//                 </label>
//                 <label>
//                   <input type="checkbox" name="classC" checked={form.classC} onChange={handleChange} disabled={isTemp || !form.insuranceProvider} /> Class C
//                 </label>
//               </div>
//             </div>
//           </div>

//           {status && (
//             <div style={{ marginTop: 15, padding: 8, borderRadius: 6, background: status.startsWith('✅') ? '#f0fff4' : '#fff5f5', color: status.startsWith('✅') ? '#38a169' : '#e53e3e', fontWeight: 'bold' }}>
//               {status}
//             </div>
//           )}

//           <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//             <button type="button" onClick={onClose} style={secondaryBtn} disabled={saving}>
//               {t.btn?.cancel || 'Cancel'}
//             </button>
//             <button type="submit" style={primaryBtn('#48bb78')} disabled={saving}>
//               {saving ? '⏳ Saving...' : (t.btn?.save || 'Save')}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPatientModal;  11072026  11:20 pm

import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/api';

// -------------------- Responsive Styles --------------------
const styles = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
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

  .modal-content {
    background: white;
    border-radius: 12px;
    padding: 25px;
    width: 100%;
    max-width: 750px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .modal-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #2d3748;
  }

  .temp-patient-banner {
    padding: 12px 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .temp-patient-banner.temp {
    background: #fff5f5;
    border: 2px solid #fc8181;
  }

  .temp-patient-banner.permanent {
    background: #f0fff4;
    border: 2px solid #48bb78;
  }

  .temp-patient-banner .warning-text {
    font-size: 13px;
    color: #e53e3e;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px 20px;
  }

  .form-field {
    margin-bottom: 5px;
  }

  .form-field.full-width {
    grid-column: 1 / -1;
  }

  .form-label {
    font-weight: bold;
    margin-bottom: 4px;
    display: block;
    font-size: 14px;
    color: #2d3748;
  }

  .form-label.error {
    color: #e53e3e;
  }

  .form-label .required {
    color: #e53e3e;
  }

  .form-input {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
    font-size: 14px;
    transition: border-color 0.2s;
    background: white;
  }

  .form-input:focus {
    outline: none;
    border-color: #48bb78;
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
  }

  .form-input.error {
    border-color: #fc8181;
  }

  .form-input:disabled {
    background: #f7fafc;
    cursor: not-allowed;
    opacity: 0.7;
  }

  .form-error {
    color: #fc8181;
    font-size: 12px;
    margin-top: 3px;
  }

  .checkbox-group {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 5px;
  }

  .checkbox-group label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    cursor: pointer;
  }

  .checkbox-group input[type="checkbox"] {
    transform: scale(1.2);
    cursor: pointer;
  }

  .checkbox-group input[type="checkbox"]:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .status-message {
    margin-top: 15px;
    padding: 10px 12px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 14px;
  }

  .status-message.success {
    background: #f0fff4;
    color: #38a169;
  }

  .status-message.error {
    background: #fff5f5;
    color: #e53e3e;
  }

  .modal-actions {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .btn {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
    min-height: 44px;
    min-width: 80px;
  }

  .btn:hover {
    transform: scale(1.02);
  }

  .btn:active {
    transform: scale(0.98);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .btn-primary {
    background: #48bb78;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: #38a169;
  }

  .btn-secondary {
    background: #e2e8f0;
    color: #2d3748;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #cbd5e0;
  }

  /* Responsive Breakpoints */
  @media (max-width: 768px) {
    .modal-overlay {
      padding: 10px;
      align-items: flex-end;
    }

    .modal-content {
      padding: 20px 16px;
      max-height: 95vh;
      border-radius: 12px 12px 0 0;
      animation: slideUpMobile 0.3s ease;
    }

    @keyframes slideUpMobile {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-title {
      font-size: 20px;
    }

    .form-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .form-field.full-width {
      grid-column: 1;
    }

    .form-input {
      font-size: 16px; /* Prevents iOS zoom */
      padding: 12px 14px;
    }

    .temp-patient-banner {
      padding: 10px 12px;
    }

    .checkbox-group {
      gap: 12px;
    }

    .modal-actions {
      flex-direction: column;
      gap: 8px;
    }

    .modal-actions .btn {
      width: 100%;
      justify-content: center;
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 480px) {
    .modal-content {
      padding: 16px 12px;
    }

    .modal-title {
      font-size: 18px;
    }

    .form-label {
      font-size: 13px;
    }

    .form-input {
      padding: 10px 12px;
      font-size: 15px;
    }

    .checkbox-group label {
      font-size: 13px;
    }

    .btn {
      font-size: 13px;
      padding: 12px 20px;
      min-height: 48px;
    }

    .status-message {
      font-size: 13px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .modal-content {
      max-width: 650px;
      padding: 22px;
    }

    .form-grid {
      gap: 12px 16px;
    }
  }
`;

// -------------------- Component --------------------
const AddPatientModal = ({ translations = {}, lang, onClose, onPatientAdded }) => {
  const t = translations;

  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    address: '',
    gender: 'MALE',
    dateOfBirth: '',
    nationality: '',
    nationalId: '',
    passport: '',
    email: '',
    emergencyName: '',
    emergencyPhone: '',
    occupation: '',
    country: '',
    city: '',
    insuranceProvider: '',
    classA: false,
    classB: false,
    classC: false,
    tempPatient: false,
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [insuranceProviders, setInsuranceProviders] = useState([]);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');

  // Load countries
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/arab-cities/full`);
        if (!res.ok) throw new Error('Failed to load countries');
        const data = await res.json();
        const countryNames = data.map((item) => item.countryName);
        setCountries(countryNames);
        window.__countryData = data.reduce((acc, item) => {
          acc[item.countryName] = item;
          return acc;
        }, {});
      } catch (err) {
        console.error('Error loading countries:', err);
      }
    };
    loadCountries();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle country change
  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setForm((prev) => ({ ...prev, country: countryName, city: '' }));
    const countryData = window.__countryData?.[countryName];
    if (countryData) {
      const cityList = countryData.cities || [];
      setCities(cityList);
      const phoneCode = countryData.phoneCode || '';
      if (phoneCode && !form.phone.startsWith(phoneCode)) {
        setForm((prev) => ({ ...prev, phone: phoneCode }));
      }
      loadInsuranceProviders(countryName);
    } else {
      setCities([]);
      setInsuranceProviders([]);
    }
  };

  // Load insurance providers
  const loadInsuranceProviders = async (countryName) => {
    try {
      const encoded = encodeURIComponent(countryName.toLowerCase());
      const res = await fetch(`${BASE_URL}/api/providers/country/${encoded}`);
      if (!res.ok) throw new Error('Failed to load insurance providers');
      const data = await res.json();
      const providerNames = data.map((p) => p.name);
      setInsuranceProviders(providerNames);
      window.__providerData = data.reduce((acc, p) => {
        acc[p.name] = p;
        return acc;
      }, {});
      setForm((prev) => ({ ...prev, insuranceProvider: '', classA: false, classB: false, classC: false }));
    } catch (err) {
      console.error('Error loading insurance providers:', err);
    }
  };

  // Handle insurance change
  const handleInsuranceChange = (e) => {
    const providerName = e.target.value;
    setForm((prev) => ({ ...prev, insuranceProvider: providerName }));
    const providerData = window.__providerData?.[providerName];
    if (providerData) {
      setForm((prev) => ({
        ...prev,
        classA: providerData.classA || false,
        classB: providerData.classB || false,
        classC: providerData.classC || false,
      }));
    } else {
      setForm((prev) => ({ ...prev, classA: false, classB: false, classC: false }));
    }
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    const { firstName, lastName, phone, country, city, address, gender, dateOfBirth, tempPatient } = form;

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!phone.trim() || !phone.match(/^\+?\d{7,15}$/)) newErrors.phone = 'Valid phone number required';
    if (!country) newErrors.country = 'Please select a country';
    if (!city) newErrors.city = 'Please select a city';

    if (!tempPatient) {
      if (!address.trim()) newErrors.address = 'Address is required';
      if (!gender) newErrors.gender = 'Gender is required';
      if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    setStatus('');

    try {
      const {
        firstName,
        middleName,
        lastName,
        phone,
        address,
        gender,
        dateOfBirth,
        nationality,
        nationalId,
        passport,
        email,
        emergencyName,
        emergencyPhone,
        occupation,
        country,
        city,
        insuranceProvider,
        classA,
        classB,
        classC,
        tempPatient,
      } = form;

      const payload = {
        firstName: firstName.trim(),
        middleName: middleName.trim() || null,
        lastName: lastName.trim(),
        phone: phone.trim(),
        country,
        city,
        insuranceProvider: insuranceProvider || null,
        classA,
        classB,
        classC,
        address: tempPatient ? null : address.trim(),
        gender: tempPatient ? null : gender,
        dateOfBirth: tempPatient ? null : dateOfBirth,
        nationality: tempPatient ? null : nationality.trim(),
        nationalId: tempPatient ? null : nationalId.trim(),
        passportNumber: tempPatient ? null : passport.trim(),
        email: tempPatient ? null : email.trim(),
        emergencyContactName: tempPatient ? null : emergencyName.trim(),
        emergencyContactPhone: tempPatient ? null : emergencyPhone.trim(),
        occupation: tempPatient ? null : occupation.trim(),
      };

      const endpoint = tempPatient ? '/api/patients/temp' : '/api/patients/permanent';
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `HTTP ${res.status}`);
      }

      const savedPatient = await res.json();
      if (onPatientAdded) onPatientAdded(savedPatient);
      setStatus('✅ Patient saved successfully');
      setTimeout(() => onClose(), 800);
    } catch (err) {
      setStatus(`❌ Error: ${err.message}`);
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const isTemp = form.tempPatient;
  const isRTL = lang === 'ar';

  // Render form field
  const renderField = (label, name, type = 'text', options = {}) => {
    const value = form[name];
    const error = errors[name];
    const isCheckbox = type === 'checkbox';

    let onChangeHandler = handleChange;
    if (name === 'country') onChangeHandler = handleCountryChange;
    if (name === 'insuranceProvider') onChangeHandler = handleInsuranceChange;

    return (
      <div className={`form-field ${options.fullWidth ? 'full-width' : ''}`}>
        <label className={`form-label ${error ? 'error' : ''}`}>
          {label}
          {!isCheckbox && !options.optional && <span className="required"> *</span>}
        </label>
        {isCheckbox ? (
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name={name}
                checked={value}
                onChange={handleChange}
                disabled={options.disabled}
              />
              {label}
            </label>
          </div>
        ) : type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChangeHandler}
            className={`form-input ${error ? 'error' : ''}`}
            disabled={options.disabled}
          >
            <option value="">Select {label}</option>
            {options.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : type === 'date' ? (
          <input
            type="date"
            name={name}
            value={value}
            onChange={handleChange}
            className={`form-input ${error ? 'error' : ''}`}
            disabled={options.disabled}
            max={new Date().toISOString().split('T')[0]}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            className={`form-input ${error ? 'error' : ''}`}
            disabled={options.disabled}
            placeholder={options.placeholder || ''}
          />
        )}
        {error && <div className="form-error">{error}</div>}
      </div>
    );
  };

  return (
    <>
      <style>{styles}</style>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} dir={isRTL ? 'rtl' : 'ltr'}>
          <h3 className="modal-title">➕ {t.title?.addPatient || 'Add New Patient'}</h3>

          <div className={`temp-patient-banner ${isTemp ? 'temp' : 'permanent'}`}>
            <label style={{ fontWeight: 'bold', color: isTemp ? '#e53e3e' : '#2d3748', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                name="tempPatient"
                checked={isTemp}
                onChange={handleChange}
                style={{ transform: 'scale(1.2)' }}
              />
              {t.patient?.temp || 'Temporary Patient'}
            </label>
            {isTemp && (
              <span className="warning-text">
                ⚠️ {t.label?.tempWarning || 'Only required fields (Name, Phone, Country, City) are needed'}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {renderField('First Name', 'firstName')}
              {renderField('Middle Name', 'middleName', 'text', { placeholder: 'Optional', optional: true })}
              {renderField('Last Name', 'lastName')}
              {renderField('Phone', 'phone', 'tel', { placeholder: '+1234567890' })}
              {renderField('Country', 'country', 'select', { options: countries })}
              {renderField('City', 'city', 'select', { options: cities, disabled: !form.country })}
              {renderField('Address', 'address', 'text', { 
                disabled: isTemp, 
                placeholder: isTemp ? 'Not required for temp' : 'Required',
                optional: isTemp 
              })}
              {renderField('Gender', 'gender', 'select', { 
                options: ['MALE', 'FEMALE', 'OTHER'], 
                disabled: isTemp,
                optional: isTemp 
              })}
              {renderField('Date of Birth', 'dateOfBirth', 'date', { 
                disabled: isTemp,
                optional: isTemp 
              })}
              {renderField('Nationality', 'nationality', 'text', { 
                disabled: isTemp, 
                placeholder: 'Optional',
                optional: true 
              })}
              {renderField('National ID', 'nationalId', 'text', { 
                disabled: isTemp, 
                placeholder: 'Optional',
                optional: true 
              })}
              {renderField('Passport', 'passport', 'text', { 
                disabled: isTemp, 
                placeholder: 'Optional',
                optional: true 
              })}
              {renderField('Email', 'email', 'email', { 
                disabled: isTemp, 
                placeholder: 'Optional',
                optional: true 
              })}
              {renderField('Emergency Contact Name', 'emergencyName', 'text', { 
                disabled: isTemp, 
                placeholder: 'Optional',
                optional: true 
              })}
              {renderField('Emergency Phone', 'emergencyPhone', 'tel', { 
                disabled: isTemp, 
                placeholder: 'Optional',
                optional: true 
              })}
              {renderField('Occupation', 'occupation', 'text', { 
                disabled: isTemp, 
                placeholder: 'Optional',
                optional: true 
              })}
              {renderField('Insurance Provider', 'insuranceProvider', 'select', { 
                options: insuranceProviders, 
                disabled: isTemp || !form.country,
                optional: true 
              })}

              <div className="form-field full-width">
                <label className="form-label">Insurance Classes</label>
                <div className="checkbox-group">
                  <label>
                    <input 
                      type="checkbox" 
                      name="classA" 
                      checked={form.classA} 
                      onChange={handleChange} 
                      disabled={isTemp || !form.insuranceProvider} 
                    /> 
                    Class A
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      name="classB" 
                      checked={form.classB} 
                      onChange={handleChange} 
                      disabled={isTemp || !form.insuranceProvider} 
                    /> 
                    Class B
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      name="classC" 
                      checked={form.classC} 
                      onChange={handleChange} 
                      disabled={isTemp || !form.insuranceProvider} 
                    /> 
                    Class C
                  </label>
                </div>
              </div>
            </div>

            {status && (
              <div className={`status-message ${status.startsWith('✅') ? 'success' : 'error'}`}>
                {status}
              </div>
            )}

            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn btn-secondary" disabled={saving}>
                {t.btn?.cancel || 'Cancel'}
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? '⏳ Saving...' : (t.btn?.save || 'Save')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPatientModal;