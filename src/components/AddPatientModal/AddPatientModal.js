import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/api';

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContent = {
  background: 'white',
  borderRadius: 12,
  padding: 20,
  minWidth: 400,
  maxWidth: 700,
  maxHeight: '80vh',
  overflowY: 'auto',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc', width: '100%' };
const selectStyle = { ...inputStyle, height: 38 };
const labelStyle = { fontWeight: 'bold', marginBottom: 4 };

const primaryBtn = (bg) => ({
  background: bg,
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: 8,
  padding: '10px 24px',
  cursor: 'pointer',
  fontSize: 14,
});

const secondaryBtn = {
  background: '#e2e8f0',
  border: 'none',
  padding: '10px 24px',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 14,
};

const AddPatientModal = ({ translations = {}, lang, onClose, onPatientAdded }) => {
  const t = translations; // now t is always an object

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

  const renderField = (label, name, type = 'text', options = {}) => {
    const value = form[name];
    const error = errors[name];
    const isCheckbox = type === 'checkbox';

    let onChangeHandler = handleChange;
    if (name === 'country') onChangeHandler = handleCountryChange;
    if (name === 'insuranceProvider') onChangeHandler = handleInsuranceChange;

    return (
      <div style={{ marginBottom: 10 }}>
        <label style={{ ...labelStyle, color: error ? '#e53e3e' : '#2d3748' }}>
          {label}
          {!isCheckbox && <span style={{ color: '#e53e3e' }}>*</span>}
        </label>
        {isCheckbox ? (
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={handleChange}
            disabled={options.disabled}
            style={{ marginLeft: 8, transform: 'scale(1.2)' }}
          />
        ) : type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChangeHandler}
            style={{ ...selectStyle, borderColor: error ? '#fc8181' : '#ccc' }}
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
            style={{ ...inputStyle, borderColor: error ? '#fc8181' : '#ccc' }}
            disabled={options.disabled}
            max={new Date().toISOString().split('T')[0]}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            style={{ ...inputStyle, borderColor: error ? '#fc8181' : '#ccc' }}
            disabled={options.disabled}
            placeholder={options.placeholder || ''}
          />
        )}
        {error && <div style={{ color: '#fc8181', fontSize: 12, marginTop: 3 }}>{error}</div>}
      </div>
    );
  };

  const isTemp = form.tempPatient;
  const isRTL = lang === 'ar';

  return (
    <div style={modalOverlay} onClick={onClose}>
      <div style={modalContent} onClick={(e) => e.stopPropagation()} dir={isRTL ? 'rtl' : 'ltr'}>
        <h3 style={{ marginBottom: 15 }}>➕ {t.title?.addPatient || 'Add New Patient'}</h3>

        <div
          style={{
            padding: '10px 15px',
            background: isTemp ? '#fff5f5' : '#f0fff4',
            border: `2px solid ${isTemp ? '#fc8181' : '#48bb78'}`,
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          <label style={{ fontWeight: 'bold', color: isTemp ? '#e53e3e' : '#2d3748' }}>
            <input
              type="checkbox"
              name="tempPatient"
              checked={isTemp}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            {t.patient?.temp || 'Temporary Patient'}
          </label>
          {isTemp && (
            <div style={{ color: '#e53e3e', fontSize: 12, marginTop: 4 }}>
              ⚠️ {t.label?.tempWarning || 'Only required fields (Name, Phone, Country, City) are needed'}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
            {renderField('First Name', 'firstName')}
            {renderField('Middle Name', 'middleName', 'text', { placeholder: 'Optional' })}
            {renderField('Last Name', 'lastName')}
            {renderField('Phone', 'phone', 'tel', { placeholder: '+1234567890' })}
            {renderField('Country', 'country', 'select', { options: countries })}
            {renderField('City', 'city', 'select', { options: cities, disabled: !form.country })}
            {renderField('Address', 'address', 'text', { disabled: isTemp, placeholder: isTemp ? 'Not required for temp' : 'Required' })}
            {renderField('Gender', 'gender', 'select', { options: ['MALE', 'FEMALE', 'OTHER'], disabled: isTemp })}
            {renderField('Date of Birth', 'dateOfBirth', 'date', { disabled: isTemp })}
            {renderField('Nationality', 'nationality', 'text', { disabled: isTemp, placeholder: 'Optional' })}
            {renderField('National ID', 'nationalId', 'text', { disabled: isTemp, placeholder: 'Optional' })}
            {renderField('Passport', 'passport', 'text', { disabled: isTemp, placeholder: 'Optional' })}
            {renderField('Email', 'email', 'email', { disabled: isTemp, placeholder: 'Optional' })}
            {renderField('Emergency Contact Name', 'emergencyName', 'text', { disabled: isTemp, placeholder: 'Optional' })}
            {renderField('Emergency Phone', 'emergencyPhone', 'tel', { disabled: isTemp, placeholder: 'Optional' })}
            {renderField('Occupation', 'occupation', 'text', { disabled: isTemp, placeholder: 'Optional' })}
            {renderField('Insurance Provider', 'insuranceProvider', 'select', { options: insuranceProviders, disabled: isTemp || !form.country })}

            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Insurance Classes</label>
              <div style={{ display: 'flex', gap: 20, marginTop: 5 }}>
                <label>
                  <input type="checkbox" name="classA" checked={form.classA} onChange={handleChange} disabled={isTemp || !form.insuranceProvider} /> Class A
                </label>
                <label>
                  <input type="checkbox" name="classB" checked={form.classB} onChange={handleChange} disabled={isTemp || !form.insuranceProvider} /> Class B
                </label>
                <label>
                  <input type="checkbox" name="classC" checked={form.classC} onChange={handleChange} disabled={isTemp || !form.insuranceProvider} /> Class C
                </label>
              </div>
            </div>
          </div>

          {status && (
            <div style={{ marginTop: 15, padding: 8, borderRadius: 6, background: status.startsWith('✅') ? '#f0fff4' : '#fff5f5', color: status.startsWith('✅') ? '#38a169' : '#e53e3e', fontWeight: 'bold' }}>
              {status}
            </div>
          )}

          <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={secondaryBtn} disabled={saving}>
              {t.btn?.cancel || 'Cancel'}
            </button>
            <button type="submit" style={primaryBtn('#48bb78')} disabled={saving}>
              {saving ? '⏳ Saving...' : (t.btn?.save || 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientModal;