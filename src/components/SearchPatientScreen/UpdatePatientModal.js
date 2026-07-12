// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';
// import { updatePatientTranslations } from '../../i18n/updatePatientTranslations';

// const API_PATIENT = `${BASE_URL}/api/patients`;
// const API_COUNTRIES_CITIES = `${BASE_URL}/api/arab-cities/full`;
// const API_PROVIDERS_BY_COUNTRY = `${BASE_URL}/api/providers/country`;

// const UpdatePatientModal = ({ patientId, loggedUser, lang = 'en', onClose, onPatientUpdated }) => {
//   const t = updatePatientTranslations[lang] || updatePatientTranslations.en;
//   const isRTL = lang === 'ar';

//   // ----- Form fields state -----
//   const [formData, setFormData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     phone: '',
//     address: '',
//     gender: '',
//     dateOfBirth: '',
//     passportNumber: '',   // ✅ initialised as empty string
//     country: '',
//     city: '',
//     insuranceProvider: '',
//     classA: false,
//     classB: false,
//     classC: false,
//   });

//   const [countries, setCountries] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [insuranceProviders, setInsuranceProviders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [errors, setErrors] = useState({});

//   const insuranceProviderRef = useRef(formData.insuranceProvider);
//   useEffect(() => {
//     insuranceProviderRef.current = formData.insuranceProvider;
//   }, [formData.insuranceProvider]);

//   const logAction = useCallback(async (action, details) => {
//     try {
//       await fetch(`${BASE_URL}/api/logs/add`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: loggedUser, action, details }),
//       });
//     } catch (e) { /* ignore */ }
//   }, [loggedUser]);

//   // ----- Fetch patient details (only on initial mount) -----
//   const fetchPatient = useCallback(async () => {
//     //console.log('🔄 fetchPatient called for patientId:', patientId);
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_PATIENT}/search/id/${patientId}`);
//       if (!res.ok) throw new Error('Failed to load patient');
//       const data = await res.json();
//       //console.log('📥 Patient data from API:', data);

//       setFormData({
//         firstName: data.firstName || '',
//         middleName: data.middleName || '',
//         lastName: data.lastName || '',
//         phone: data.phone || '',
//         address: data.address || '',
//         gender: data.gender || '',
//         dateOfBirth: data.dateOfBirth || '',
//         passportNumber: data.passportNumber ?? '',   // ✅ null becomes ''
//         country: data.country || '',
//         city: data.city || '',
//         insuranceProvider: data.insuranceProvider || '',
//         classA: data.classA || false,
//         classB: data.classB || false,
//         classC: data.classC || false,
//       });
//       setStatusMsg(`✅ ${t.status.loaded}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.alert.loadFailed}: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, [patientId, t]);

//   const fetchCountriesCities = useCallback(async () => {
//     try {
//       const res = await fetch(API_COUNTRIES_CITIES);
//       if (!res.ok) throw new Error('Failed to load countries');
//       const data = await res.json();
//       const countryNames = data.map(item => item.countryName);
//       setCountries(countryNames);
//       window._countryDataMap = data.reduce((acc, item) => {
//         acc[item.countryName] = item;
//         return acc;
//       }, {});
//     } catch (err) {
//       //console.error('Country load error:', err);
//     }
//   }, []);

//   useEffect(() => {
//     const country = formData.country;
//     if (!country) {
//       setCities([]);
//       setInsuranceProviders([]);
//       return;
//     }
//     const countryData = window._countryDataMap?.[country];
//     if (countryData) {
//       setCities(countryData.cities || []);
//     } else {
//       setCities([]);
//     }
//     const fetchProviders = async () => {
//       try {
//         const encoded = encodeURIComponent(country.toLowerCase());
//         const res = await fetch(`${API_PROVIDERS_BY_COUNTRY}/${encoded}`);
//         if (!res.ok) throw new Error('Failed to load providers');
//         const data = await res.json();
//         const names = data.map(p => p.name);
//         const currentProvider = insuranceProviderRef.current;
//         if (currentProvider && !names.includes(currentProvider)) {
//           setInsuranceProviders([...names, currentProvider]);
//         } else {
//           setInsuranceProviders(names);
//         }
//       } catch (err) {
//         //console.error('Providers load error:', err);
//         setInsuranceProviders([]);
//       }
//     };
//     fetchProviders();
//   }, [formData.country]);

//   // ----- Initial load (ONCE) -----
//   const hasLoaded = useRef(false);
//   useEffect(() => {
//     if (!hasLoaded.current) {
//       //console.log('🔁 Initial load - fetching countries and patient');
//       fetchCountriesCities();
//       fetchPatient();
//       logAction('OPEN_UPDATE_PATIENT', `Opened update screen for patientId=${patientId}`);
//       hasLoaded.current = true;
//     }
//   }, [fetchPatient, fetchCountriesCities, logAction, patientId]);

//   // ----- Update field handler with logs -----
//   const handleChange = (field, value) => {
//     //console.log(`✏️ Changing ${field} to:`, value);
//     setFormData(prev => {
//       const updated = { ...prev, [field]: value };
//       //console.log('📋 New formData:', updated);
//       return updated;
//     });
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

//     const phone = formData.phone.trim();
//     if (!/^\+\d{7,15}$/.test(phone)) {
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

//     if (!formData.country) {
//       newErrors.country = t.error.country;
//       valid = false;
//     }
//     if (!formData.city) {
//       newErrors.city = t.error.city;
//       valid = false;
//     }

//     if (formData.passportNumber && formData.passportNumber.length < 5) {
//       newErrors.passportNumber = t.error.passport;
//       valid = false;
//     }

//     if (!formData.insuranceProvider) {
//       newErrors.insuranceProvider = t.error.insuranceProvider;
//       valid = false;
//     }

//     if (!formData.classA && !formData.classB && !formData.classC) {
//       newErrors.insuranceClass = t.error.insuranceClass;
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   // ----- Save handler (with payload logs) -----
//   const handleSave = async () => {
//     //console.log('💾 handleSave triggered');
//     //console.log('📦 Current formData:', formData);

//     if (!validate()) {
//       setStatusMsg(`⚠️ ${t.alert.fixErrors}`);
//       return;
//     }

//     setSaving(true);
//     setStatusMsg(`⏳ ${t.status.saving}`);

//     try {
//       const payload = {
//         firstName: formData.firstName.trim(),
//         middleName: formData.middleName.trim(),
//         lastName: formData.lastName.trim(),
//         phone: formData.phone.trim(),
//         address: formData.address.trim(),
//         gender: formData.gender,
//         dateOfBirth: formData.dateOfBirth,
//         passportNumber: formData.passportNumber.trim(), // ✅ sends empty string if blank
//         country: formData.country,
//         city: formData.city,
//         insuranceProvider: formData.insuranceProvider,
//         classA: formData.classA,
//         classB: formData.classB,
//         classC: formData.classC,
//       };

//       //console.log('📤 Payload being sent:', payload);

//       const res = await fetch(`${API_PATIENT}/${patientId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`HTTP ${res.status} - ${errorText}`);
//       }

//       setStatusMsg(`✅ ${t.status.updated}`);
//       logAction('UPDATE_PATIENT', `Updated patientId=${patientId}`);
//       onPatientUpdated && onPatientUpdated();
//       setTimeout(onClose, 1500);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.alert.updateFailed}: ${err.message}`);
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ----- Render (unchanged) -----
//   return (
//     <div style={modalOverlay}>
//       <div style={{ ...modalContent, direction: isRTL ? 'rtl' : 'ltr' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//           <h2>✏️ {t.title.updatePatient}</h2>
//           <button onClick={onClose} style={closeBtn}>✕</button>
//         </div>

//         {loading ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
//         ) : (
//           <>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
//               <FieldGroup label={t.lbl.firstName} error={errors.firstName}>
//                 <input type="text" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} style={inputStyle} />
//               </FieldGroup>
//               <FieldGroup label={t.lbl.middleName}>
//                 <input type="text" value={formData.middleName} onChange={e => handleChange('middleName', e.target.value)} style={inputStyle} />
//               </FieldGroup>
//               <FieldGroup label={t.lbl.lastName} error={errors.lastName}>
//                 <input type="text" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} style={inputStyle} />
//               </FieldGroup>
//               <FieldGroup label={t.lbl.phone} error={errors.phone}>
//                 <input type="text" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} placeholder={t.phone.prompt} style={inputStyle} />
//               </FieldGroup>
//               <FieldGroup label={t.lbl.address} error={errors.address} fullWidth>
//                 <input type="text" value={formData.address} onChange={e => handleChange('address', e.target.value)} style={inputStyle} />
//               </FieldGroup>
//               <FieldGroup label={t.lbl.gender} error={errors.gender}>
//                 <select value={formData.gender} onChange={e => handleChange('gender', e.target.value)} style={selectStyle}>
//                   <option value="">{t.gender.select}</option>
//                   <option value="Male">{t.gender.male}</option>
//                   <option value="Female">{t.gender.female}</option>
//                   <option value="Other">{t.gender.other}</option>
//                 </select>
//               </FieldGroup>
//               <FieldGroup label={t.lbl.dob} error={errors.dateOfBirth}>
//                 <input type="date" value={formData.dateOfBirth} onChange={e => handleChange('dateOfBirth', e.target.value)} max={new Date().toISOString().split('T')[0]} style={inputStyle} />
//               </FieldGroup>
//               <FieldGroup label={t.lbl.passport} error={errors.passportNumber}>
//                 <input type="text" value={formData.passportNumber} onChange={e => handleChange('passportNumber', e.target.value)} style={inputStyle} />
//               </FieldGroup>
//               <FieldGroup label={t.lbl.country} error={errors.country}>
//                 <select value={formData.country} onChange={e => handleChange('country', e.target.value)} style={selectStyle}>
//                   <option value="">{t.country.select}</option>
//                   {countries.map(c => <option key={c} value={c}>{c}</option>)}
//                 </select>
//               </FieldGroup>
//               <FieldGroup label={t.lbl.city} error={errors.city}>
//                 <select value={formData.city} onChange={e => handleChange('city', e.target.value)} style={selectStyle} disabled={!formData.country}>
//                   <option value="">{t.city.select}</option>
//                   {cities.map(c => <option key={c} value={c}>{c}</option>)}
//                 </select>
//               </FieldGroup>
//               <FieldGroup label={t.lbl.insuranceProvider} error={errors.insuranceProvider}>
//                 <select value={formData.insuranceProvider} onChange={e => handleChange('insuranceProvider', e.target.value)} style={selectStyle}>
//                   <option value="">{t.insurance.select}</option>
//                   {insuranceProviders.map(p => <option key={p} value={p}>{p}</option>)}
//                 </select>
//               </FieldGroup>
//               <FieldGroup label={t.lbl.insuranceClass} error={errors.insuranceClass}>
//                 <div style={{ display: 'flex', gap: 15 }}>
//                   <label>
//                     <input type="checkbox" checked={formData.classA} onChange={e => {
//                       if (e.target.checked) {
//                         handleChange('classA', true);
//                         handleChange('classB', false);
//                         handleChange('classC', false);
//                       } else {
//                         handleChange('classA', false);
//                       }
//                     }} /> {t.insuranceClass.A}
//                   </label>
//                   <label>
//                     <input type="checkbox" checked={formData.classB} onChange={e => {
//                       if (e.target.checked) {
//                         handleChange('classB', true);
//                         handleChange('classA', false);
//                         handleChange('classC', false);
//                       } else {
//                         handleChange('classB', false);
//                       }
//                     }} /> {t.insuranceClass.B}
//                   </label>
//                   <label>
//                     <input type="checkbox" checked={formData.classC} onChange={e => {
//                       if (e.target.checked) {
//                         handleChange('classC', true);
//                         handleChange('classA', false);
//                         handleChange('classB', false);
//                       } else {
//                         handleChange('classC', false);
//                       }
//                     }} /> {t.insuranceClass.C}
//                   </label>
//                 </div>
//               </FieldGroup>
//             </div>

//             <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <span style={{ color: '#4a5568' }}>{statusMsg}</span>
//               <div>
//                 <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.cancel}</button>
//                 <button onClick={handleSave} style={primaryBtn('#48bb78')} disabled={saving}>
//                   {saving ? '⏳' : '💾 ' + t.btn.saveChanges}
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// // ----- Sub-components & styles (unchanged) -----
// const FieldGroup = ({ label, error, children, fullWidth }) => (
//   <div style={{ gridColumn: fullWidth ? 'span 2' : 'span 1' }}>
//     <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 4 }}>{label}</label>
//     {children}
//     {error && <div style={{ color: '#fc8181', fontSize: 12, marginTop: 4 }}>{error}</div>}
//   </div>
// );

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

// export default UpdatePatientModal;  12072026 4:00 pm

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../../utils/api';
import { updatePatientTranslations } from '../../i18n/updatePatientTranslations';

const API_PATIENT = `${BASE_URL}/api/patients`;
const API_COUNTRIES_CITIES = `${BASE_URL}/api/arab-cities/full`;
const API_PROVIDERS_BY_COUNTRY = `${BASE_URL}/api/providers/country`;

const UpdatePatientModal = ({ patientId, loggedUser, lang = 'en', onClose, onPatientUpdated }) => {
  const t = updatePatientTranslations[lang] || updatePatientTranslations.en;
  const isRTL = lang === 'ar';

  // ----- Form fields state -----
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    address: '',
    gender: '',
    dateOfBirth: '',
    passportNumber: '',
    country: '',
    city: '',
    insuranceProvider: '',
    classA: false,
    classB: false,
    classC: false,
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [insuranceProviders, setInsuranceProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
  const [errors, setErrors] = useState({});

  const insuranceProviderRef = useRef(formData.insuranceProvider);
  useEffect(() => {
    insuranceProviderRef.current = formData.insuranceProvider;
  }, [formData.insuranceProvider]);

  const logAction = useCallback(async (action, details) => {
    try {
      await fetch(`${BASE_URL}/api/logs/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedUser, action, details }),
      });
    } catch (e) { /* ignore */ }
  }, [loggedUser]);

  // ----- Fetch patient details -----
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
        gender: data.gender || '',
        dateOfBirth: data.dateOfBirth || '',
        passportNumber: data.passportNumber ?? '',
        country: data.country || '',
        city: data.city || '',
        insuranceProvider: data.insuranceProvider || '',
        classA: data.classA || false,
        classB: data.classB || false,
        classC: data.classC || false,
      });
      setStatusMsg(`✅ ${t.status.loaded}`);
    } catch (err) {
      setStatusMsg(`❌ ${t.alert.loadFailed}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [patientId, t]);

  const fetchCountriesCities = useCallback(async () => {
    try {
      const res = await fetch(API_COUNTRIES_CITIES);
      if (!res.ok) throw new Error('Failed to load countries');
      const data = await res.json();
      const countryNames = data.map(item => item.countryName);
      setCountries(countryNames);
      window._countryDataMap = data.reduce((acc, item) => {
        acc[item.countryName] = item;
        return acc;
      }, {});
    } catch (err) {
      //console.error('Country load error:', err);
    }
  }, []);

  useEffect(() => {
    const country = formData.country;
    if (!country) {
      setCities([]);
      setInsuranceProviders([]);
      return;
    }
    const countryData = window._countryDataMap?.[country];
    if (countryData) {
      setCities(countryData.cities || []);
    } else {
      setCities([]);
    }
    const fetchProviders = async () => {
      try {
        const encoded = encodeURIComponent(country.toLowerCase());
        const res = await fetch(`${API_PROVIDERS_BY_COUNTRY}/${encoded}`);
        if (!res.ok) throw new Error('Failed to load providers');
        const data = await res.json();
        const names = data.map(p => p.name);
        const currentProvider = insuranceProviderRef.current;
        if (currentProvider && !names.includes(currentProvider)) {
          setInsuranceProviders([...names, currentProvider]);
        } else {
          setInsuranceProviders(names);
        }
      } catch (err) {
        setInsuranceProviders([]);
      }
    };
    fetchProviders();
  }, [formData.country]);

  // ----- Initial load -----
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (!hasLoaded.current) {
      fetchCountriesCities();
      fetchPatient();
      logAction('OPEN_UPDATE_PATIENT', `Opened update screen for patientId=${patientId}`);
      hasLoaded.current = true;
    }
  }, [fetchPatient, fetchCountriesCities, logAction, patientId]);

  // ----- Update field handler -----
  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
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

    const phone = formData.phone.trim();
    if (!/^\+\d{7,15}$/.test(phone)) {
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

    if (!formData.country) {
      newErrors.country = t.error.country;
      valid = false;
    }
    if (!formData.city) {
      newErrors.city = t.error.city;
      valid = false;
    }

    if (formData.passportNumber && formData.passportNumber.length < 5) {
      newErrors.passportNumber = t.error.passport;
      valid = false;
    }

    if (!formData.insuranceProvider) {
      newErrors.insuranceProvider = t.error.insuranceProvider;
      valid = false;
    }

    if (!formData.classA && !formData.classB && !formData.classC) {
      newErrors.insuranceClass = t.error.insuranceClass;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // ----- Save handler -----
  const handleSave = async () => {
    if (!validate()) {
      setStatusMsg(`⚠️ ${t.alert.fixErrors}`);
      return;
    }

    setSaving(true);
    setStatusMsg(`⏳ ${t.status.saving}`);

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        passportNumber: formData.passportNumber.trim(),
        country: formData.country,
        city: formData.city,
        insuranceProvider: formData.insuranceProvider,
        classA: formData.classA,
        classB: formData.classB,
        classC: formData.classC,
      };

      const res = await fetch(`${API_PATIENT}/${patientId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status} - ${errorText}`);
      }

      setStatusMsg(`✅ ${t.status.updated}`);
      logAction('UPDATE_PATIENT', `Updated patientId=${patientId}`);
      onPatientUpdated && onPatientUpdated();
      setTimeout(onClose, 1500);
    } catch (err) {
      setStatusMsg(`❌ ${t.alert.updateFailed}: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  // ----- Render -----
  return (
    <>
      <style>{`
        /* ==================== UPDATE PATIENT MODAL STYLES ==================== */
        .update-patient-overlay {
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

        .update-patient-modal {
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

        .update-patient-modal.rtl {
          direction: rtl;
        }

        .update-patient-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .update-patient-header h2 {
          margin: 0;
          font-size: 22px;
          color: #2d3748;
        }

        .update-patient-close-btn {
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

        .update-patient-close-btn:hover {
          background: #f7fafc;
          color: #e74c3c;
        }

        .update-patient-loading {
          text-align: center;
          padding: 40px;
          color: #7f8c8d;
        }

        .update-patient-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .update-patient-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .update-patient-field.full-width {
          grid-column: span 2;
        }

        .update-patient-field label {
          font-weight: bold;
          font-size: 14px;
          color: #2d3748;
        }

        .update-patient-field .field-error {
          color: #fc8181;
          font-size: 12px;
          margin-top: 4px;
        }

        .update-patient-input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          background: white;
          min-height: 38px;
          transition: border-color 0.2s;
        }

        .update-patient-input:focus {
          outline: none;
          border-color: #4299e1;
        }

        .update-patient-input.error {
          border-color: #fc8181;
        }

        .update-patient-select {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          background: white;
          min-height: 38px;
          transition: border-color 0.2s;
        }

        .update-patient-select:focus {
          outline: none;
          border-color: #4299e1;
        }

        .update-patient-select.error {
          border-color: #fc8181;
        }

        .update-patient-select:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .update-patient-checkbox-group {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          align-items: center;
          margin-top: 4px;
        }

        .update-patient-checkbox-group label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: normal;
          cursor: pointer;
          font-size: 14px;
        }

        .update-patient-checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #4299e1;
        }

        .update-patient-footer {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .update-patient-status {
          color: #4a5568;
          font-size: 14px;
        }

        .update-patient-status.success {
          color: #48bb78;
        }

        .update-patient-status.error {
          color: #fc8181;
        }

        .update-patient-status.loading {
          color: #f39c12;
        }

        .update-patient-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .update-patient-btn {
          padding: 8px 20px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 38px;
          font-size: 14px;
        }

        .update-patient-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .update-patient-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .update-patient-btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .update-patient-btn-secondary:hover:not(:disabled) {
          background: #cbd5e0;
        }

        .update-patient-btn-primary {
          background: #48bb78;
          color: white;
        }

        .update-patient-btn-primary:hover:not(:disabled) {
          background: #38a169;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .update-patient-modal {
            padding: 16px;
            width: 100%;
          }

          .update-patient-header h2 {
            font-size: 18px;
          }

          .update-patient-form-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .update-patient-field.full-width {
            grid-column: span 1;
          }

          .update-patient-footer {
            flex-direction: column;
            align-items: stretch;
          }

          .update-patient-status {
            text-align: center;
          }

          .update-patient-actions {
            justify-content: center;
          }

          .update-patient-btn {
            flex: 1;
            text-align: center;
          }

          .update-patient-checkbox-group {
            gap: 10px;
          }
        }

        @media (max-width: 480px) {
          .update-patient-modal {
            padding: 12px;
          }

          .update-patient-header h2 {
            font-size: 16px;
          }

          .update-patient-close-btn {
            font-size: 20px;
            min-width: 32px;
            min-height: 32px;
          }

          .update-patient-input,
          .update-patient-select {
            font-size: 15px;
            min-height: 36px;
          }

          .update-patient-btn {
            font-size: 13px;
            padding: 6px 14px;
            min-height: 34px;
          }

          .update-patient-checkbox-group label {
            font-size: 13px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .update-patient-modal {
            max-width: 90%;
          }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .update-patient-overlay {
            background: rgba(0, 0, 0, 0.7);
          }

          .update-patient-modal {
            background: #1a1a2e;
          }

          .update-patient-header h2 {
            color: #ecf0f1;
          }

          .update-patient-close-btn {
            color: #b0b0b0;
          }

          .update-patient-close-btn:hover {
            background: #2d2d44;
            color: #e74c3c;
          }

          .update-patient-field label {
            color: #b0b0b0;
          }

          .update-patient-input,
          .update-patient-select {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .update-patient-input:focus,
          .update-patient-select:focus {
            border-color: #4299e1;
          }

          .update-patient-input::placeholder {
            color: #666;
          }

          .update-patient-checkbox-group label {
            color: #b0b0b0;
          }

          .update-patient-checkbox-group input[type="checkbox"] {
            accent-color: #4299e1;
          }

          .update-patient-status {
            color: #b0b0b0;
          }

          .update-patient-status.success {
            color: #4CAF50;
          }

          .update-patient-status.error {
            color: #fc8181;
          }

          .update-patient-status.loading {
            color: #f39c12;
          }

          .update-patient-btn-secondary {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .update-patient-btn-secondary:hover:not(:disabled) {
            background: #3d3d5c;
          }

          .update-patient-btn-primary {
            background: #2f855a;
          }

          .update-patient-btn-primary:hover:not(:disabled) {
            background: #38a169;
          }

          .update-patient-field .field-error {
            color: #fc8181;
          }

          .update-patient-loading {
            color: #666;
          }
        }
      `}</style>

      <div className="update-patient-overlay" onClick={onClose}>
        <div className={`update-patient-modal ${isRTL ? 'rtl' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="update-patient-header">
            <h2>✏️ {t.title.updatePatient}</h2>
            <button className="update-patient-close-btn" onClick={onClose}>✕</button>
          </div>

          {loading ? (
            <div className="update-patient-loading">⏳ {t.status.loading}</div>
          ) : (
            <>
              <div className="update-patient-form-grid">
                <div className="update-patient-field">
                  <label>{t.lbl.firstName}</label>
                  <input
                    type="text"
                    className={`update-patient-input ${errors.firstName ? 'error' : ''}`}
                    value={formData.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                  />
                  {errors.firstName && <div className="field-error">{errors.firstName}</div>}
                </div>

                <div className="update-patient-field">
                  <label>{t.lbl.middleName}</label>
                  <input
                    type="text"
                    className="update-patient-input"
                    value={formData.middleName}
                    onChange={e => handleChange('middleName', e.target.value)}
                  />
                </div>

                <div className="update-patient-field">
                  <label>{t.lbl.lastName}</label>
                  <input
                    type="text"
                    className={`update-patient-input ${errors.lastName ? 'error' : ''}`}
                    value={formData.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                  />
                  {errors.lastName && <div className="field-error">{errors.lastName}</div>}
                </div>

                <div className="update-patient-field">
                  <label>{t.lbl.phone}</label>
                  <input
                    type="text"
                    className={`update-patient-input ${errors.phone ? 'error' : ''}`}
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder={t.phone.prompt}
                  />
                  {errors.phone && <div className="field-error">{errors.phone}</div>}
                </div>

                <div className="update-patient-field full-width">
                  <label>{t.lbl.address}</label>
                  <input
                    type="text"
                    className={`update-patient-input ${errors.address ? 'error' : ''}`}
                    value={formData.address}
                    onChange={e => handleChange('address', e.target.value)}
                  />
                  {errors.address && <div className="field-error">{errors.address}</div>}
                </div>

                <div className="update-patient-field">
                  <label>{t.lbl.gender}</label>
                  <select
                    className={`update-patient-select ${errors.gender ? 'error' : ''}`}
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

                <div className="update-patient-field">
                  <label>{t.lbl.dob}</label>
                  <input
                    type="date"
                    className={`update-patient-input ${errors.dateOfBirth ? 'error' : ''}`}
                    value={formData.dateOfBirth}
                    onChange={e => handleChange('dateOfBirth', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.dateOfBirth && <div className="field-error">{errors.dateOfBirth}</div>}
                </div>

                <div className="update-patient-field">
                  <label>{t.lbl.passport}</label>
                  <input
                    type="text"
                    className={`update-patient-input ${errors.passportNumber ? 'error' : ''}`}
                    value={formData.passportNumber}
                    onChange={e => handleChange('passportNumber', e.target.value)}
                  />
                  {errors.passportNumber && <div className="field-error">{errors.passportNumber}</div>}
                </div>

                <div className="update-patient-field">
                  <label>{t.lbl.country}</label>
                  <select
                    className={`update-patient-select ${errors.country ? 'error' : ''}`}
                    value={formData.country}
                    onChange={e => handleChange('country', e.target.value)}
                  >
                    <option value="">{t.country.select}</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.country && <div className="field-error">{errors.country}</div>}
                </div>

                <div className="update-patient-field">
                  <label>{t.lbl.city}</label>
                  <select
                    className={`update-patient-select ${errors.city ? 'error' : ''}`}
                    value={formData.city}
                    onChange={e => handleChange('city', e.target.value)}
                    disabled={!formData.country}
                  >
                    <option value="">{t.city.select}</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <div className="field-error">{errors.city}</div>}
                </div>

                <div className="update-patient-field">
                  <label>{t.lbl.insuranceProvider}</label>
                  <select
                    className={`update-patient-select ${errors.insuranceProvider ? 'error' : ''}`}
                    value={formData.insuranceProvider}
                    onChange={e => handleChange('insuranceProvider', e.target.value)}
                  >
                    <option value="">{t.insurance.select}</option>
                    {insuranceProviders.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  {errors.insuranceProvider && <div className="field-error">{errors.insuranceProvider}</div>}
                </div>

                <div className="update-patient-field">
                  <label>{t.lbl.insuranceClass}</label>
                  <div className="update-patient-checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.classA}
                        onChange={e => {
                          if (e.target.checked) {
                            handleChange('classA', true);
                            handleChange('classB', false);
                            handleChange('classC', false);
                          } else {
                            handleChange('classA', false);
                          }
                        }}
                      /> {t.insuranceClass.A}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.classB}
                        onChange={e => {
                          if (e.target.checked) {
                            handleChange('classB', true);
                            handleChange('classA', false);
                            handleChange('classC', false);
                          } else {
                            handleChange('classB', false);
                          }
                        }}
                      /> {t.insuranceClass.B}
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={formData.classC}
                        onChange={e => {
                          if (e.target.checked) {
                            handleChange('classC', true);
                            handleChange('classA', false);
                            handleChange('classB', false);
                          } else {
                            handleChange('classC', false);
                          }
                        }}
                      /> {t.insuranceClass.C}
                    </label>
                  </div>
                  {errors.insuranceClass && <div className="field-error">{errors.insuranceClass}</div>}
                </div>
              </div>

              <div className="update-patient-footer">
                <span className={`update-patient-status ${statusMsg.includes('✅') ? 'success' : statusMsg.includes('❌') ? 'error' : statusMsg.includes('⏳') ? 'loading' : ''}`}>
                  {statusMsg}
                </span>
                <div className="update-patient-actions">
                  <button className="update-patient-btn update-patient-btn-secondary" onClick={onClose}>
                    ✕ {t.btn.cancel}
                  </button>
                  <button className="update-patient-btn update-patient-btn-primary" onClick={handleSave} disabled={saving}>
                    {saving ? '⏳' : '💾 ' + t.btn.saveChanges}
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

export default UpdatePatientModal;