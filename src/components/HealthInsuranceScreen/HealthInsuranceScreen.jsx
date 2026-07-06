import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Styles ----------
const styles = `
  .insurance-container {
    padding: 20px;
    background: #f0f2f5;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  /* Header */
  .insurance-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    flex-wrap: wrap;
    gap: 10px;
  }
  .insurance-header .title {
    font-size: 22px;
    font-weight: bold;
    color: #2c3e50;
  }
  .insurance-header .controls {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
  .insurance-header .controls .country-select {
    padding: 6px 12px;
    border-radius: 5px;
    border: 1px solid #dce4ec;
    font-size: 13px;
    background: white;
    min-width: 150px;
  }
  .insurance-header .controls .country-select:focus {
    outline: none;
    border-color: #3498db;
  }
  .insurance-header .controls .search-box {
    display: flex;
    align-items: center;
    background: #f5f7fa;
    border-radius: 20px;
    padding: 4px 15px;
  }
  .insurance-header .controls .search-box input {
    border: none;
    outline: none;
    padding: 6px 5px;
    font-size: 13px;
    background: transparent;
    min-width: 150px;
  }
  .insurance-header .controls .search-box .search-icon {
    font-size: 14px;
    color: #a0aec0;
  }
  .insurance-header .controls button {
    padding: 6px 16px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
    color: white;
  }
  .insurance-header .controls button:hover {
    transform: scale(1.05);
  }
  .insurance-header .controls button.get-providers { background: #3498db; }
  .insurance-header .controls button.get-providers:hover { background: #2980b9; }
  .insurance-header .controls button.refresh { background: #f39c12; }
  .insurance-header .controls button.refresh:hover { background: #e67e22; }
  .insurance-header .status-badge {
    padding: 4px 15px;
    border-radius: 10px;
    font-size: 12px;
    background: #e8f8f5;
    color: #27ae60;
  }
  .insurance-header .status-badge.error { background: #fdedec; color: #e74c3c; }
  .insurance-header .status-badge.loading { background: #fef9e7; color: #f39c12; }

  /* Content */
  .insurance-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  /* Table Section */
  .insurance-table-section {
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  .insurance-table-section .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .insurance-table-section .table-header .title {
    font-size: 16px;
    font-weight: bold;
    color: #2c3e50;
  }
  .insurance-table-section .table-header .stats {
    display: flex;
    gap: 10px;
  }
  .insurance-table-section .table-header .stats .pill {
    padding: 3px 12px;
    border-radius: 12px;
    font-size: 12px;
    background: #e8f8f5;
    color: #1abc9c;
  }
  .insurance-table-wrapper {
    overflow-x: auto;
    max-height: 350px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
  }
  .insurance-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .insurance-table th {
    background: #f8f9fa;
    padding: 10px 15px;
    text-align: left;
    font-weight: bold;
    color: #2c3e50;
    border-bottom: 2px solid #e9ecef;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .insurance-table td {
    padding: 8px 15px;
    border-bottom: 1px solid #f0f0f0;
  }
  .insurance-table tr:hover td {
    background: #f8f9fa;
  }
  .insurance-table tr:nth-child(even) td {
    background: #f8f9fa;
  }
  .insurance-table tr:nth-child(even):hover td {
    background: #e8f8f5;
  }
  .insurance-table .type-badge {
    display: inline-block;
    padding: 2px 12px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 12px;
    color: white;
  }
  .insurance-table .type-badge.private { background: #3498db; }
  .insurance-table .type-badge.government { background: #e74c3c; }
  .insurance-table .type-badge.other { background: #27ae60; }
  .insurance-table .class-icon {
    font-size: 16px;
    text-align: center;
  }
  .insurance-table .class-icon.active { font-weight: bold; }
  .insurance-table .class-icon.inactive { color: #bdc3c7; }
  .insurance-table .website-link {
    color: #3498db;
    text-decoration: underline;
    cursor: pointer;
  }
  .insurance-table .website-link:hover {
    color: #2980b9;
  }
  .insurance-table .delete-btn {
    padding: 4px 10px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 12px;
    color: white;
    background: #e74c3c;
  }
  .insurance-table .delete-btn:hover {
    background: #c0392b;
    transform: scale(1.05);
  }
  .insurance-table .delete-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Add Provider Section */
  .insurance-add-section {
    background: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  .insurance-add-section .add-title {
    font-size: 16px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  .insurance-add-section .form-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px 15px;
    align-items: center;
    max-width: 700px;
  }
  .insurance-add-section .form-grid label {
    font-weight: bold;
    font-size: 13px;
    color: #34495e;
  }
  .insurance-add-section .form-grid input {
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #dce4ec;
    font-size: 13px;
    background: white;
    width: 100%;
  }
  .insurance-add-section .form-grid input:focus {
    outline: none;
    border-color: #3498db;
  }
  .insurance-add-section .form-grid .checkbox-group {
    display: flex;
    gap: 15px;
  }
  .insurance-add-section .form-grid .checkbox-group label {
    font-weight: normal;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  .insurance-add-section .form-grid .checkbox-group input[type="checkbox"] {
    width: auto;
    cursor: pointer;
  }
  .insurance-add-section .form-grid .button-group {
    display: flex;
    gap: 10px;
  }
  .insurance-add-section .form-grid .button-group button {
    padding: 8px 20px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
  }
  .insurance-add-section .form-grid .button-group button:hover {
    transform: scale(1.05);
  }
  .insurance-add-section .form-grid .button-group .btn-save {
    background: #2ecc71;
    color: white;
  }
  .insurance-add-section .form-grid .button-group .btn-save:hover {
    background: #27ae60;
  }
  .insurance-add-section .form-grid .button-group .btn-save:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .insurance-add-section .form-grid .button-group .btn-clear {
    background: #e74c3c;
    color: white;
  }
  .insurance-add-section .form-grid .button-group .btn-clear:hover {
    background: #c0392b;
  }

  /* Status Bar */
  .insurance-status-bar {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 15px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  }
  .insurance-status-bar .loading {
    width: 20px;
    height: 20px;
  }
  .insurance-status-bar .status-msg {
    font-size: 12px;
    color: #27ae60;
  }
  .insurance-status-bar .status-msg.error { color: #e74c3c; }
  .insurance-status-bar .status-msg.loading { color: #f39c12; }
  .insurance-status-bar .spacer { flex: 1; }
  .insurance-status-bar .time {
    font-size: 11px;
    color: #95a5a6;
  }

  /* Loading */
  .insurance-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #7f8c8d;
  }

  /* Empty State */
  .insurance-empty {
    text-align: center;
    padding: 40px;
    color: #a0aec0;
    font-size: 16px;
  }

  /* Confirm Dialog Overlay */
  .insurance-confirm-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }
  .insurance-confirm {
    background: white;
    border-radius: 12px;
    padding: 25px;
    max-width: 400px;
    width: 95%;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  .insurance-confirm h3 {
    margin: 0 0 15px 0;
    color: #2d3748;
    font-size: 18px;
  }
  .insurance-confirm .message {
    margin: 15px 0;
    font-size: 14px;
    color: #4a5568;
  }
  .insurance-confirm .actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
  .insurance-confirm .actions button {
    padding: 8px 25px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
  }
  .insurance-confirm .actions .btn-confirm {
    background: #e74c3c;
    color: white;
  }
  .insurance-confirm .actions .btn-confirm:hover {
    background: #c0392b;
    transform: scale(1.05);
  }
  .insurance-confirm .actions .btn-cancel {
    background: #e2e8f0;
    color: #4a5568;
  }
  .insurance-confirm .actions .btn-cancel:hover {
    background: #cbd5e0;
    transform: scale(1.05);
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .slide-in {
    animation: slideIn 0.3s ease-out;
  }
`;

// ---------- Main Component ----------
const HealthInsuranceScreen = ({ loggedUser, lang = 'en', onClose }) => {
  // ---------- Translations ----------
  const getTranslations = (language) => {
    const translations = {
      en: {
        title: { healthInsurance: 'Health Insurance' },
        label: {
          country: 'Country',
          name: 'Provider Name',
          type: 'Provider Type',
          classes: 'Coverage Classes',
          website: 'Website',
          addProvider: 'Add Provider'
        },
        prompt: {
          selectCountry: 'Select Country',
          search: 'Search providers...',
          name: 'Enter provider name',
          type: 'Enter provider type',
          website: 'Enter website URL'
        },
        btn: {
          getProviders: 'Get Providers',
          refresh: 'Refresh',
          saveProvider: 'Save Provider',
          clear: 'Clear'
        },
        status: {
          ready: 'Ready',
          loading: 'Loading...',
          loadingCountries: 'Loading countries...',
          loadingProviders: 'Loading providers for',
          providersLoaded: 'Providers loaded',
          countriesLoaded: 'Countries loaded',
          saving: 'Saving provider...',
          providerSaved: 'Provider saved successfully',
          deleting: 'Deleting provider...',
          providerDeleted: 'Provider deleted successfully',
          totalProviders: 'Total Providers',
          providers: 'providers',
          country: 'Country',
          filtered: 'Filtered',
          error: 'Error',
          formCleared: 'Form cleared'
        },
        table: {
          title: 'Providers',
          name: 'Name',
          type: 'Type',
          classA: 'Class A',
          classB: 'Class B',
          classC: 'Class C',
          website: 'Website',
          delete: 'Delete'
        },
        alert: {
          info: 'Information',
          warning: 'Warning',
          error: 'Error',
          confirmDelete: {
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete provider: {0}?'
          },
          selectCountry: 'Please select a country first',
          nameRequired: 'Provider name is required',
          typeRequired: 'Provider type is required',
          classRequired: 'Please select at least one coverage class',
          websiteRequired: 'Website URL is required',
          saveSuccess: 'Provider saved successfully',
          saveError: 'Failed to save provider',
          loadCountriesError: 'Failed to load countries',
          loadProvidersError: 'Failed to load providers',
          deleteSuccess: 'Provider deleted successfully',
          deleteError: 'Failed to delete provider',
          invalidUrl: 'Invalid website URL'
        }
      },
      ar: {
        title: { healthInsurance: 'التأمين الصحي' },
        label: {
          country: 'الدولة',
          name: 'اسم المزود',
          type: 'نوع المزود',
          classes: 'فئات التغطية',
          website: 'الموقع الإلكتروني',
          addProvider: 'إضافة مزود'
        },
        prompt: {
          selectCountry: 'اختر الدولة',
          search: 'بحث عن المزودين...',
          name: 'أدخل اسم المزود',
          type: 'أدخل نوع المزود',
          website: 'أدخل رابط الموقع'
        },
        btn: {
          getProviders: 'عرض المزودين',
          refresh: 'تحديث',
          saveProvider: 'حفظ المزود',
          clear: 'مسح'
        },
        status: {
          ready: 'جاهز',
          loading: 'جاري التحميل...',
          loadingCountries: 'جاري تحميل الدول...',
          loadingProviders: 'جاري تحميل المزودين لـ',
          providersLoaded: 'تم تحميل المزودين',
          countriesLoaded: 'تم تحميل الدول',
          saving: 'جاري حفظ المزود...',
          providerSaved: 'تم حفظ المزود بنجاح',
          deleting: 'جاري حذف المزود...',
          providerDeleted: 'تم حذف المزود بنجاح',
          totalProviders: 'إجمالي المزودين',
          providers: 'مزودين',
          country: 'الدولة',
          filtered: 'المصفاة',
          error: 'خطأ',
          formCleared: 'تم مسح النموذج'
        },
        table: {
          title: 'المزودين',
          name: 'الاسم',
          type: 'النوع',
          classA: 'الفئة أ',
          classB: 'الفئة ب',
          classC: 'الفئة ج',
          website: 'الموقع',
          delete: 'حذف'
        },
        alert: {
          info: 'معلومات',
          warning: 'تحذير',
          error: 'خطأ',
          confirmDelete: {
            title: 'تأكيد الحذف',
            content: 'هل أنت متأكد من حذف المزود: {0}؟'
          },
          selectCountry: 'يرجى اختيار دولة أولاً',
          nameRequired: 'اسم المزود مطلوب',
          typeRequired: 'نوع المزود مطلوب',
          classRequired: 'يرجى اختيار فئة تغطية واحدة على الأقل',
          websiteRequired: 'رابط الموقع مطلوب',
          saveSuccess: 'تم حفظ المزود بنجاح',
          saveError: 'فشل في حفظ المزود',
          loadCountriesError: 'فشل في تحميل الدول',
          loadProvidersError: 'فشل في تحميل المزودين',
          deleteSuccess: 'تم حذف المزود بنجاح',
          deleteError: 'فشل في حذف المزود',
          invalidUrl: 'رابط الموقع غير صالح'
        }
      }
    };
    return translations[language] || translations.en;
  };

  const t = getTranslations(lang);

  // ---------- State ----------
  const [countries, setCountries] = useState([]);
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });

  // Form states
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [classA, setClassA] = useState(false);
  const [classB, setClassB] = useState(false);
  const [classC, setClassC] = useState(false);
  const [website, setWebsite] = useState('');

  // Confirm dialog state
  const [showConfirm, setShowConfirm] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);

  // ---------- Helper Functions ----------
  const setStatus = useCallback((text, type = 'success') => {
    setStatusMessage({ text: `● ${text}`, type });
  }, []);

  // ---------- API Calls ----------
  const loadCountries = useCallback(async () => {
    setLoading(true);
    setStatus(t.status.loadingCountries, 'loading');

    try {
      const url = `${BASE_URL}/api/arab-cities/countries`;
      console.log('📤 Fetching countries:', url);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const countriesData = Array.isArray(data) ? data : [data];
      const countryNames = countriesData.map(c => c.countryName || '');
      
      setCountries(countryNames);
      if (countryNames.length > 0) {
        setSelectedCountry(countryNames[0]);
        loadProviders(countryNames[0]);
      }
      
      setStatus(`${t.status.countriesLoaded} (${countryNames.length})`, 'success');
      
    } catch (err) {
      console.error('🚨 Load countries error:', err);
      setStatus(t.status.error, 'error');
      alert(t.alert.loadCountriesError);
    } finally {
      setLoading(false);
    }
  }, [t]);

  const loadProviders = useCallback(async (country) => {
    if (!country) return;
    
    setLoading(true);
    setStatus(`${t.status.loadingProviders} ${country}`, 'loading');

    try {
      const encodedCountry = encodeURIComponent(country);
      const url = `${BASE_URL}/api/providers/country/${encodedCountry}`;
      console.log('📤 Fetching providers:', url);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const providersData = Array.isArray(data) ? data : [data];
      
      const parsedProviders = providersData.map(p => ({
        id: p.id || 0,
        name: p.name || '',
        type: p.type || '',
        classA: p.classA || false,
        classB: p.classB || false,
        classC: p.classC || false,
        website: p.website || ''
      }));
      
      setProviders(parsedProviders);
      setFilteredProviders(parsedProviders);
      
      setStatus(`${t.status.providersLoaded} (${parsedProviders.length} ${t.status.providers})`, 'success');
      
    } catch (err) {
      console.error('🚨 Load providers error:', err);
      setStatus(t.status.error, 'error');
      alert(t.alert.loadProvidersError);
      setProviders([]);
      setFilteredProviders([]);
    } finally {
      setLoading(false);
    }
  }, [t]);

  const saveProvider = useCallback(async () => {
    // Validate
    if (!selectedCountry) {
      alert(t.alert.selectCountry);
      return;
    }

    if (!name.trim()) {
      alert(t.alert.nameRequired);
      return;
    }

    if (!type.trim()) {
      alert(t.alert.typeRequired);
      return;
    }

    if (!classA && !classB && !classC) {
      alert(t.alert.classRequired);
      return;
    }

    if (!website.trim()) {
      alert(t.alert.websiteRequired);
      return;
    }

    setLoading(true);
    setStatus(t.status.saving, 'loading');

    try {
      const url = `${BASE_URL}/api/providers`;
      console.log('📤 Saving provider:', url);
      
      const payload = {
        name: name.trim(),
        type: type.trim(),
        classA: classA,
        classB: classB,
        classC: classC,
        website: website.trim(),
        country: selectedCountry
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      clearForm();
      loadProviders(selectedCountry);
      alert(t.alert.saveSuccess);
      setStatus(t.status.providerSaved, 'success');
      
    } catch (err) {
      console.error('🚨 Save error:', err);
      setStatus(t.status.error, 'error');
      alert(`${t.alert.saveError}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [selectedCountry, name, type, classA, classB, classC, website, t, loadProviders]);

  const deleteProvider = useCallback(async (provider) => {
    setLoading(true);
    setStatus(t.status.deleting, 'loading');

    try {
      const url = `${BASE_URL}/api/providers/${provider.id}`;
      console.log('📤 Deleting provider:', url);
      
      const response = await fetch(url, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      setShowConfirm(false);
      setProviderToDelete(null);
      loadProviders(selectedCountry);
      alert(t.alert.deleteSuccess);
      setStatus(t.status.providerDeleted, 'success');
      
    } catch (err) {
      console.error('🚨 Delete error:', err);
      setStatus(t.status.error, 'error');
      alert(`${t.alert.deleteError}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [selectedCountry, t, loadProviders]);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);
    
    if (query === '') {
      setFilteredProviders(providers);
    } else {
      const filtered = providers.filter(provider => {
        return (
          provider.name.toLowerCase().includes(query) ||
          provider.type.toLowerCase().includes(query) ||
          provider.website.toLowerCase().includes(query)
        );
      });
      setFilteredProviders(filtered);
    }
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    if (country) {
      loadProviders(country);
    }
  };

  const clearForm = () => {
    setName('');
    setType('');
    setClassA(false);
    setClassB(false);
    setClassC(false);
    setWebsite('');
    setStatus(t.status.formCleared, 'success');
  };

  const handleDeleteClick = (provider) => {
    setProviderToDelete(provider);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (providerToDelete) {
      deleteProvider(providerToDelete);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setProviderToDelete(null);
  };

  // ---------- Effects ----------
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      loadCountries();
    }
  }, [loadCountries]);

  // ---------- Render Components ----------
  const renderTable = () => {
    if (filteredProviders.length === 0) {
      return <div className="insurance-empty">📭 No providers found</div>;
    }

    return (
      <div className="insurance-table-wrapper">
        <table className="insurance-table">
          <thead>
            <tr>
              <th>{t.table.name}</th>
              <th>{t.table.type}</th>
              <th style={{ textAlign: 'center' }}>{t.table.classA}</th>
              <th style={{ textAlign: 'center' }}>{t.table.classB}</th>
              <th style={{ textAlign: 'center' }}>{t.table.classC}</th>
              <th>{t.table.website}</th>
              <th style={{ textAlign: 'center' }}>{t.table.delete}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProviders.map((provider, index) => {
              const typeClass = provider.type?.toLowerCase() === 'private' ? 'private' :
                               provider.type?.toLowerCase() === 'government' ? 'government' : 'other';
              return (
                <tr key={provider.id || index}>
                  <td style={{ fontWeight: 'bold' }}>{provider.name}</td>
                  <td>
                    <span className={`type-badge ${typeClass}`}>
                      {provider.type || 'OTHER'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`class-icon ${provider.classA ? 'active' : 'inactive'}`}>
                      {provider.classA ? '✅' : '❌'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`class-icon ${provider.classB ? 'active' : 'inactive'}`}>
                      {provider.classB ? '✅' : '❌'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`class-icon ${provider.classC ? 'active' : 'inactive'}`}>
                      {provider.classC ? '✅' : '❌'}
                    </span>
                  </td>
                  <td>
                    {provider.website ? (
                      <a 
                        href={provider.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="website-link"
                      >
                        {provider.website}
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteClick(provider)}
                      disabled={loading}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // ---------- Confirm Dialog ----------
  const renderConfirmDialog = () => {
    if (!showConfirm || !providerToDelete) return null;

    return (
      <div className="insurance-confirm-overlay">
        <div className="insurance-confirm slide-in">
          <h3>🗑️ {t.alert.confirmDelete.title}</h3>
          <div className="message">
            {t.alert.confirmDelete.content.replace('{0}', providerToDelete.name)}
          </div>
          <div className="actions">
            <button 
              className="btn-cancel"
              onClick={handleCancelDelete}
            >
              {t.btn.clear}
            </button>
            <button 
              className="btn-confirm"
              onClick={handleConfirmDelete}
            >
              {t.btn.saveProvider}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ---------- Render ----------
  return (
    <>
      <style>{styles}</style>
      <div className="insurance-container">
        {/* Header */}
        <div className="insurance-header">
          <div className="title">🏥 {t.title.healthInsurance}</div>
          <div className="controls">
            <select 
              className="country-select"
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">{t.prompt.selectCountry}</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
            
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder={t.prompt.search}
              />
            </div>
            
            <button 
              className="get-providers"
              onClick={() => loadProviders(selectedCountry)}
              disabled={loading || !selectedCountry}
            >
              📋 {t.btn.getProviders}
            </button>
            
            <button 
              className="refresh"
              onClick={() => {
                if (selectedCountry) {
                  loadProviders(selectedCountry);
                } else {
                  alert(t.alert.selectCountry);
                }
              }}
              disabled={loading}
            >
              🔄 {t.btn.refresh}
            </button>
            
            <span className={`status-badge ${statusMessage.type}`}>
              {statusMessage.text}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="insurance-content">
          {/* Table Section */}
          <div className="insurance-table-section">
            <div className="table-header">
              <div className="title">📋 {t.table.title}</div>
              <div className="stats">
                <span className="pill">
                  🏥 {t.status.totalProviders}: {filteredProviders.length}
                </span>
                {searchQuery && (
                  <span className="pill">
                    🔍 {t.status.filtered}: {filteredProviders.length}
                  </span>
                )}
              </div>
            </div>
            {loading && !providers.length ? (
              <div className="insurance-loading">⏳ {t.status.loading}</div>
            ) : (
              renderTable()
            )}
          </div>

          {/* Add Provider Section */}
          <div className="insurance-add-section">
            <div className="add-title">➕ {t.label.addProvider}</div>
            <div className="form-grid">
              <label>{t.label.name}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.prompt.name}
              />
              
              <label>{t.label.type}</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder={t.prompt.type}
              />
              
              <label>{t.label.classes}</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={classA}
                    onChange={(e) => setClassA(e.target.checked)}
                  />
                  {t.table.classA}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={classB}
                    onChange={(e) => setClassB(e.target.checked)}
                  />
                  {t.table.classB}
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={classC}
                    onChange={(e) => setClassC(e.target.checked)}
                  />
                  {t.table.classC}
                </label>
              </div>
              
              <label>{t.label.website}</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder={t.prompt.website}
              />
              
              <div></div>
              <div className="button-group">
                <button 
                  className="btn-save"
                  onClick={saveProvider}
                  disabled={loading || !selectedCountry || !name.trim() || !type.trim() || !website.trim() || (!classA && !classB && !classC)}
                >
                  💾 {t.btn.saveProvider}
                </button>
                <button 
                  className="btn-clear"
                  onClick={clearForm}
                >
                  🗑️ {t.btn.clear}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="insurance-status-bar">
          {loading && <div className="loading">⏳</div>}
          <span className={`status-msg ${statusMessage.type}`}>
            {statusMessage.text}
          </span>
          <span className="spacer"></span>
          <span className="time">
            🕐 {new Date().toLocaleTimeString()}
          </span>
        </div>

        {/* Confirm Dialog */}
        {renderConfirmDialog()}
      </div>
    </>
  );
};

export default HealthInsuranceScreen;