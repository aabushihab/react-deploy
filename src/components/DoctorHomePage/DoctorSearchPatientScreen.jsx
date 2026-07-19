// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorSearchPatientScreen.css';

// // ==================== CONSTANTS ====================
// const SEARCH_NAME = 'NAME';
// const SEARCH_MOBILE = 'MOBILE';

// // ==================== LOCALIZATION ====================
// const EN_BUNDLE = {
//   'title.searchPatients': 'Search Patients',
//   'title.visits': 'Patient Visits',
//   'title.visitDetails': 'Visit Details',
//   'search.name': 'Name',
//   'search.mobile': 'Mobile',
//   'prompt.name': 'Enter patient name...',
//   'prompt.mobile': 'Enter mobile number...',
//   'btn.search': 'Search',
//   'btn.clear': 'Clear',
//   'btn.patientHistory': 'Patient History',
//   'btn.viewDetails': 'View Details',
//   'btn.exportPDF': 'Export PDF',
//   'btn.savePDF': 'Save PDF',
//   'status.ready': 'Ready',
//   'status.searching': 'Searching...',
//   'status.found': 'Found',
//   'status.patients': 'patients',
//   'status.totalPatients': 'Total Patients',
//   'status.error': 'Error',
//   'status.cleared': 'Cleared',
//   'status.loadingVisits': 'Loading visits...',
//   'status.visitsLoaded': 'Visits loaded',
//   'status.loadingHistory': 'Loading history...',
//   'status.historyLoaded': 'History loaded',
//   'status.noVisits': 'No visits found',
//   'status.noDrugs': 'No drugs prescribed',
//   'status.temp': 'Temporary',
//   'status.permanent': 'Permanent',
//   'patient.temp': 'Temp',
//   'patient.permanent': 'Permanent',
//   'table.title': 'Patient List',
//   'table.id': 'ID',
//   'table.firstName': 'First Name',
//   'table.middleName': 'Middle Name',
//   'table.lastName': 'Last Name',
//   'table.phone': 'Phone',
//   'table.type': 'Type',
//   'table.address': 'Address',
//   'table.gender': 'Gender',
//   'table.dob': 'Date of Birth',
//   'table.age': 'Age',
//   'table.status': 'Status',
//   'label.visitId': 'Visit ID',
//   'label.visitType': 'Visit Type',
//   'label.visitStatus': 'Visit Status',
//   'label.checkInTime': 'Check-in Time',
//   'label.consultationStart': 'Consultation Start',
//   'label.consultationEnd': 'Consultation End',
//   'label.chiefComplaint': 'Chief Complaint',
//   'label.history': 'History',
//   'label.medications': 'Medications',
//   'label.allergies': 'Allergies',
//   'label.doctorNotes': 'Doctor Notes',
//   'label.prescribedDrugs': 'Prescribed Drugs',
//   'label.drugName': 'Drug Name',
//   'label.strength': 'Strength',
//   'label.route': 'Route',
//   'label.date': 'Date',
//   'label.doctor': 'Doctor',
//   'info.patientHistoryReport': 'Patient History Report - {0}',
//   'info.noHistory': 'No history found for this patient',
//   'info.pdfSaved': 'PDF saved successfully at: {0}',
//   'error.searchFailed': 'Search failed: {0}',
//   'error.loadVisits': 'Failed to load visits: {0}',
//   'error.loadHistory': 'Failed to load history: {0}',
//   'error.pdfExport': 'PDF export failed: {0}',
//   'msg.enterValue': 'Please enter at least 2 characters',
//   'alert.information': 'Information',
//   'alert.warning': 'Warning',
//   'alert.error': 'Error'
// };

// const AR_BUNDLE = {
//   'title.searchPatients': 'بحث عن المرضى',
//   'title.visits': 'زيارات المريض',
//   'title.visitDetails': 'تفاصيل الزيارة',
//   'search.name': 'الاسم',
//   'search.mobile': 'الجوال',
//   'prompt.name': 'أدخل اسم المريض...',
//   'prompt.mobile': 'أدخل رقم الجوال...',
//   'btn.search': 'بحث',
//   'btn.clear': 'مسح',
//   'btn.patientHistory': 'تاريخ المريض',
//   'btn.viewDetails': 'عرض التفاصيل',
//   'btn.exportPDF': 'تصدير PDF',
//   'btn.savePDF': 'حفظ PDF',
//   'status.ready': 'جاهز',
//   'status.searching': 'جاري البحث...',
//   'status.found': 'تم العثور على',
//   'status.patients': 'مريض',
//   'status.totalPatients': 'إجمالي المرضى',
//   'status.error': 'خطأ',
//   'status.cleared': 'تم المسح',
//   'status.loadingVisits': 'جاري تحميل الزيارات...',
//   'status.visitsLoaded': 'تم تحميل الزيارات',
//   'status.loadingHistory': 'جاري تحميل التاريخ...',
//   'status.historyLoaded': 'تم تحميل التاريخ',
//   'status.noVisits': 'لا توجد زيارات',
//   'status.noDrugs': 'لا توجد أدوية موصوفة',
//   'status.temp': 'مؤقت',
//   'status.permanent': 'دائم',
//   'patient.temp': 'مؤقت',
//   'patient.permanent': 'دائم',
//   'table.title': 'قائمة المرضى',
//   'table.id': 'المعرف',
//   'table.firstName': 'الاسم الأول',
//   'table.middleName': 'الاسم الأوسط',
//   'table.lastName': 'الاسم الأخير',
//   'table.phone': 'الهاتف',
//   'table.type': 'النوع',
//   'table.address': 'العنوان',
//   'table.gender': 'الجنس',
//   'table.dob': 'تاريخ الميلاد',
//   'table.age': 'العمر',
//   'table.status': 'الحالة',
//   'label.visitId': 'معرف الزيارة',
//   'label.visitType': 'نوع الزيارة',
//   'label.visitStatus': 'حالة الزيارة',
//   'label.checkInTime': 'وقت تسجيل الدخول',
//   'label.consultationStart': 'بداية الاستشارة',
//   'label.consultationEnd': 'نهاية الاستشارة',
//   'label.chiefComplaint': 'الشكوى الرئيسية',
//   'label.history': 'التاريخ الطبي',
//   'label.medications': 'الأدوية',
//   'label.allergies': 'الحساسية',
//   'label.doctorNotes': 'ملاحظات الطبيب',
//   'label.prescribedDrugs': 'الأدوية الموصوفة',
//   'label.drugName': 'اسم الدواء',
//   'label.strength': 'التركيز',
//   'label.route': 'طريقة الاستخدام',
//   'label.date': 'التاريخ',
//   'label.doctor': 'الطبيب',
//   'info.patientHistoryReport': 'تقرير تاريخ المريض - {0}',
//   'info.noHistory': 'لا يوجد تاريخ لهذا المريض',
//   'info.pdfSaved': 'تم حفظ PDF بنجاح في: {0}',
//   'error.searchFailed': 'فشل البحث: {0}',
//   'error.loadVisits': 'فشل تحميل الزيارات: {0}',
//   'error.loadHistory': 'فشل تحميل التاريخ: {0}',
//   'error.pdfExport': 'فشل تصدير PDF: {0}',
//   'msg.enterValue': 'الرجاء إدخال حرفين على الأقل',
//   'alert.information': 'معلومات',
//   'alert.warning': 'تحذير',
//   'alert.error': 'خطأ'
// };

// const DoctorSearchPatientScreen = ({ loggedUser, language: propLanguage, onClose }) => {
//   // ==================== GET LANGUAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = localStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== STATE ====================
//   const [locale, setLocale] = useState(getLanguage());
//   const [searchBy, setSearchBy] = useState(SEARCH_NAME);
//   const [searchValue, setSearchValue] = useState('');
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState({ text: 'Ready', type: 'success' });
//   const [totalResults, setTotalResults] = useState(0);
//   const [showVisitsModal, setShowVisitsModal] = useState(false);
//   const [visits, setVisits] = useState([]);
//   const [showHistoryModal, setShowHistoryModal] = useState(false);
//   const [historyData, setHistoryData] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedVisitDetails, setSelectedVisitDetails] = useState(null);
//   const [drugs, setDrugs] = useState([]);

//   const isRTL = locale === 'ar';

//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== SEARCH FUNCTIONS ====================
//   const performSearch = useCallback(async () => {
//     if (searchValue.length < 2) {
//       alert(t('msg.enterValue'));
//       return;
//     }

//     setLoading(true);
//     setStatus({ text: t('status.searching'), type: 'loading' });

//     try {
//       let endpoint;
//       if (searchBy === SEARCH_MOBILE) {
//         endpoint = `/api/patients/search/mobile/${encodeURIComponent(searchValue)}`;
//       } else {
//         endpoint = `/api/patients/search/name/${encodeURIComponent(searchValue)}`;
//       }

//       const data = await apiFetch(endpoint);
//       const patientList = Array.isArray(data) ? data : [];
      
//       // Transform data
//       const transformed = patientList.map(p => ({
//         id: p.id,
//         firstName: p.firstName || '',
//         middleName: p.middleName || '',
//         lastName: p.lastName || '',
//         phone: p.phone || '',
//         address: p.address || '',
//         gender: p.gender || '',
//         dateOfBirth: p.dateOfBirth || null,
//         tempPatient: p.temp || false
//       }));

//       setPatients(transformed);
//       setTotalResults(transformed.length);
//       setStatus({ 
//         text: `${t('status.found')} ${transformed.length} ${t('status.patients')}`, 
//         type: 'success' 
//       });
//     } catch (error) {
//       setStatus({ text: t('status.error'), type: 'error' });
//       alert(t('error.searchFailed').replace('{0}', error.message));
//     } finally {
//       setLoading(false);
//     }
//   }, [searchValue, searchBy, apiFetch, t]);

//   const clearSearch = useCallback(() => {
//     setSearchValue('');
//     setPatients([]);
//     setTotalResults(0);
//     setSelectedPatient(null);
//     setStatus({ text: t('status.cleared'), type: 'info' });
//   }, [t]);

//   // ==================== VISIT FUNCTIONS ====================
//   const loadPatientVisits = useCallback(async () => {
//     if (!selectedPatient) return;

//     setLoading(true);
//     setStatus({ text: t('status.loadingVisits'), type: 'loading' });

//     try {
//       const patientName = selectedPatient.firstName.replace(' (Temp)', '');
//       const endpoint = `/api/visits/doctor/1/search?name=${encodeURIComponent(patientName)}`;
//       const data = await apiFetch(endpoint);
      
//       const visitsList = Array.isArray(data) ? data : [];
//       setVisits(visitsList);
//       setShowVisitsModal(true);
//       setStatus({ text: `${t('status.visitsLoaded')} (${visitsList.length})`, type: 'success' });
//     } catch (error) {
//       alert(t('error.loadVisits').replace('{0}', error.message));
//       setStatus({ text: t('status.error'), type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedPatient, apiFetch, t]);

//   // ==================== HISTORY FUNCTIONS ====================
//   const loadPatientHistory = useCallback(async () => {
//     if (!selectedPatient) return;

//     setLoading(true);
//     setStatus({ text: t('status.loadingHistory'), type: 'loading' });

//     try {
//       const endpoint = `/api/patient/history/patient/${selectedPatient.id}`;
//       const data = await apiFetch(endpoint);
      
//       setHistoryData(data);
//       setShowHistoryModal(true);
//       setStatus({ text: t('status.historyLoaded'), type: 'success' });
//     } catch (error) {
//       alert(t('error.loadHistory').replace('{0}', error.message));
//       setStatus({ text: t('status.error'), type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedPatient, apiFetch, t]);

//   // ==================== VISIT DETAILS ====================
//   const showVisitDetails = useCallback(async (visit) => {
//     setSelectedVisitDetails(visit);
    
//     // Load drugs for this visit
//     try {
//       const drugsData = await apiFetch(`/api/visits/${visit.id}/drugs`);
//       setDrugs(Array.isArray(drugsData) ? drugsData : []);
//     } catch (error) {
//       console.error('Failed to load drugs:', error);
//       setDrugs([]);
//     }
    
//     setShowDetailsModal(true);
//   }, [apiFetch]);

//   // ==================== FORMAT HELPERS ====================
//   const formatDate = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleString(isRTL ? 'ar' : 'en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return iso;
//     }
//   }, [isRTL]);

//   const formatDateShort = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleDateString(isRTL ? 'ar' : 'en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch {
//       return iso;
//     }
//   }, [isRTL]);

//   const calculateAge = useCallback((dob) => {
//     if (!dob) return '-';
//     try {
//       const birth = new Date(dob);
//       const today = new Date();
//       let age = today.getFullYear() - birth.getFullYear();
//       const m = today.getMonth() - birth.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//         age--;
//       }
//       return age;
//     } catch {
//       return '-';
//     }
//   }, []);

//   const getStatusColor = useCallback((status) => {
//     switch (status?.toUpperCase()) {
//       case 'COMPLETED': return '#27ae60';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CANCELLED': return '#e74c3c';
//       default: return '#3498db';
//     }
//   }, []);

//   // ==================== RENDER COMPONENTS ====================
  
//   // Status Badge Component
//   const StatusBadge = ({ status }) => {
//     const color = getStatusColor(status);
//     return (
//       <span className="status-badge" style={{ backgroundColor: color }}>
//         {status}
//       </span>
//     );
//   };

//   // Visit Card Component
//   const VisitCard = ({ visit, onViewDetails }) => {
//     const statusColor = getStatusColor(visit.visitStatus);
    
//     return (
//       <div className="visit-card">
//         <div className="visit-card-header">
//           <span className="visit-id">📋 {t('label.visitId')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <span className="status-badge" style={{ backgroundColor: statusColor }}>
//             {visit.visitStatus || 'N/A'}
//           </span>
//         </div>
//         <div className="visit-card-body">
//           <div className="visit-info">
//             <div className="visit-detail">
//               <strong>{t('label.visitType')}:</strong> {visit.visitType || 'N/A'}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.checkInTime')}:</strong> {formatDate(visit.checkInTime)}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.chiefComplaint')}:</strong> {visit.chiefComplaint || 'N/A'}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.doctorNotes')}:</strong> {visit.doctorNotes || 'N/A'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-view-details"
//               onClick={() => onViewDetails(visit)}
//             >
//               👁️ {t('btn.viewDetails')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Patient Table Row Component
//   const PatientRow = ({ patient, isSelected, onSelect }) => {
//     const fullName = `${patient.firstName} ${patient.lastName}`;
//     const age = calculateAge(patient.dateOfBirth);
//     const isTemp = patient.tempPatient;
//     const genderIcon = patient.gender?.toUpperCase() === 'FEMALE' ? '♀️' : '♂️';
    
//     return (
//       <tr 
//         className={`patient-row ${isSelected ? 'selected' : ''} ${isTemp ? 'temp' : ''}`}
//         onClick={() => onSelect(patient)}
//       >
//         <td>{patient.id}</td>
//         <td>{patient.firstName}</td>
//         <td>{patient.middleName}</td>
//         <td>{patient.lastName}</td>
//         <td>
//           <span className={`patient-type-badge ${isTemp ? 'temp' : 'permanent'}`}>
//             {isTemp ? '🟡 ' + t('patient.temp') : '🟢 ' + t('patient.permanent')}
//           </span>
//         </td>
//         <td>{patient.phone}</td>
//         <td>{patient.address}</td>
//         <td>{genderIcon} {patient.gender}</td>
//         <td>{formatDateShort(patient.dateOfBirth)}</td>
//         <td>{age}</td>
//         <td>
//           <span className={`status-badge ${isTemp ? 'temp' : 'permanent'}`}>
//             {isTemp ? t('status.temp') : t('status.permanent')}
//           </span>
//         </td>
//       </tr>
//     );
//   };

//   // ==================== MODALS ====================
  
//   // Visits Modal
//   const VisitsModal = () => {
//     if (!showVisitsModal) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowVisitsModal(false)}>
//         <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowVisitsModal(false)}>✖</button>
//           <h2>{t('title.visits')}</h2>
          
//           {visits.length === 0 ? (
//             <div className="empty-state">📭 {t('status.noVisits')}</div>
//           ) : (
//             <div className="visits-list">
//               {visits.map((visit, index) => (
//                 <VisitCard 
//                   key={visit.id || index} 
//                   visit={visit} 
//                   onViewDetails={showVisitDetails}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Visit Details Modal
//   const VisitDetailsModal = () => {
//     if (!showDetailsModal || !selectedVisitDetails) return null;
    
//     const visit = selectedVisitDetails;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowDetailsModal(false)}>✖</button>
//           <h2>{t('title.visitDetails')} #{visit.id}</h2>
          
//           <div className="details-grid">
//             <div className="detail-row">
//               <span className="detail-label">{t('label.visitStatus')}:</span>
//               <span className="detail-value">
//                 <StatusBadge status={visit.visitStatus} />
//               </span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.visitType')}:</span>
//               <span className="detail-value">{visit.visitType || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.checkInTime')}:</span>
//               <span className="detail-value">{formatDate(visit.checkInTime)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.consultationStart')}:</span>
//               <span className="detail-value">{formatDate(visit.consultationStart)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.consultationEnd')}:</span>
//               <span className="detail-value">{formatDate(visit.consultationEnd)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.chiefComplaint')}:</span>
//               <span className="detail-value">{visit.chiefComplaint || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.history')}:</span>
//               <span className="detail-value">{visit.history || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.medications')}:</span>
//               <span className="detail-value">{visit.medications || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.allergies')}:</span>
//               <span className="detail-value">{visit.allergies || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.doctorNotes')}:</span>
//               <span className="detail-value">{visit.doctorNotes || 'N/A'}</span>
//             </div>
//           </div>
          
//           <h3>{t('label.prescribedDrugs')}</h3>
//           {drugs.length === 0 ? (
//             <div className="empty-state small">{t('status.noDrugs')}</div>
//           ) : (
//             <div className="drugs-list">
//               {drugs.map((drug, index) => (
//                 <div key={index} className="drug-item">
//                   <span className="drug-name">💊 {drug.tradeName || 'Unknown'}</span>
//                   <span className="drug-strength">💪 {drug.strength || 'N/A'}</span>
//                   <span className="drug-route">📌 {drug.routeOfAdmin || 'N/A'}</span>
//                   <span className="drug-form">📦 {drug.dosageForm || 'N/A'}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // History Modal
//   const HistoryModal = () => {
//     if (!showHistoryModal || !historyData) return null;
    
//     const history = Array.isArray(historyData) ? historyData : [];
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
//         <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowHistoryModal(false)}>✖</button>
//           <h2>{t('info.patientHistoryReport').replace('{0}', selectedPatient?.firstName || '')}</h2>
          
//           {history.length === 0 ? (
//             <div className="empty-state">{t('info.noHistory')}</div>
//           ) : (
//             <div className="history-list">
//               {history.map((record, index) => (
//                 <div key={index} className="history-record">
//                   <div className="history-header">
//                     <strong>{t('label.visitId')}: {record.id}</strong>
//                     <span className="history-date">{formatDate(record.checkInTime)}</span>
//                   </div>
//                   <div className="history-body">
//                     <div><strong>{t('label.doctor')}:</strong> {record.doctorName || 'N/A'}</div>
//                     <div><strong>{t('label.visitType')}:</strong> {record.visitType || 'N/A'}</div>
//                     <div><strong>{t('label.visitStatus')}:</strong> {record.visitStatus || 'N/A'}</div>
//                     <div><strong>{t('label.chiefComplaint')}:</strong> {record.chiefComplaint || 'N/A'}</div>
//                     <div><strong>{t('label.allergies')}:</strong> {record.allergies || 'N/A'}</div>
//                     <div><strong>{t('label.medications')}:</strong> {record.medications || 'N/A'}</div>
//                     <div><strong>{t('label.doctorNotes')}:</strong> {record.doctorNotes || 'N/A'}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // ==================== MAIN RENDER ====================
//   return (
//     <div className={`doctor-search-patient ${isRTL ? 'rtl' : ''}`}>
//       {/* Header */}
//       <div className="search-header">
//         <h1>🔍 {t('title.searchPatients')}</h1>
//         <div className={`status-badge ${status.type}`}>
//           ● {status.text}
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="search-section">
//         <div className="search-controls">
//           <select 
//             value={searchBy}
//             onChange={(e) => {
//               setSearchBy(e.target.value);
//               setSearchValue('');
//             }}
//             className="search-select"
//           >
//             <option value={SEARCH_NAME}>{t('search.name')}</option>
//             <option value={SEARCH_MOBILE}>{t('search.mobile')}</option>
//           </select>
          
//           <input
//             type="text"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             placeholder={searchBy === SEARCH_MOBILE ? t('prompt.mobile') : t('prompt.name')}
//             onKeyPress={(e) => e.key === 'Enter' && performSearch()}
//             className="search-input"
//           />
          
//           <button 
//             onClick={performSearch}
//             disabled={searchValue.length < 2 || loading}
//             className="btn-search"
//           >
//             {loading ? '⏳' : '🔍'} {t('btn.search')}
//           </button>
          
//           <button 
//             onClick={clearSearch}
//             className="btn-clear"
//           >
//             🗑️ {t('btn.clear')}
//           </button>
          
//           {loading && <div className="loading-spinner-small"></div>}
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="table-section">
//         <div className="table-header">
//           <h2>📋 {t('table.title')}</h2>
//           <span className="total-results">👤 {t('status.totalPatients')}: {totalResults}</span>
//         </div>
        
//         <div className="table-container">
//           <table className="patients-table">
//             <thead>
//               <tr>
//                 <th>{t('table.id')}</th>
//                 <th>{t('table.firstName')}</th>
//                 <th>{t('table.middleName')}</th>
//                 <th>{t('table.lastName')}</th>
//                 <th>{t('table.type')}</th>
//                 <th>{t('table.phone')}</th>
//                 <th>{t('table.address')}</th>
//                 <th>{t('table.gender')}</th>
//                 <th>{t('table.dob')}</th>
//                 <th>{t('table.age')}</th>
//                 <th>{t('table.status')}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.length === 0 ? (
//                 <tr>
//                   <td colSpan="11" className="empty-state">
//                     📭 {t('status.noVisits')}
//                   </td>
//                 </tr>
//               ) : (
//                 patients.map((patient) => (
//                   <PatientRow
//                     key={patient.id}
//                     patient={patient}
//                     isSelected={selectedPatient?.id === patient.id}
//                     onSelect={setSelectedPatient}
//                   />
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//      {/* Actions Section */}
// <div className="actions-section">
//   <button 
//     onClick={loadPatientHistory}
//     disabled={!selectedPatient || loading}
//     className="btn-action btn-history"
//   >
//     📊 {t('btn.patientHistory')}
//   </button>
// </div>

//       {/* Modals */}
//       <VisitsModal />
//       <VisitDetailsModal />
//       <HistoryModal />
//     </div>
//   );
// };

// export default DoctorSearchPatientScreen;   04072026 9:30 pm 

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorSearchPatientScreen.css';

// // ==================== CONSTANTS ====================
// const SEARCH_NAME = 'NAME';
// const SEARCH_MOBILE = 'MOBILE';
// const PAGE_SIZE = 10;

// // ==================== LOCALIZATION ====================
// const EN_BUNDLE = {
//   'title.searchPatients': 'Search Patients',
//   'title.visits': 'Patient Visits',
//   'title.visitDetails': 'Visit Details',
//   'search.name': 'Name',
//   'search.mobile': 'Mobile',
//   'prompt.name': 'Enter patient name...',
//   'prompt.mobile': 'Enter mobile number...',
//   'btn.search': 'Search',
//   'btn.clear': 'Clear',
//   'btn.patientHistory': 'Patient History',
//   'btn.viewDetails': 'View Details',
//   'btn.exportPDF': 'Export PDF',
//   'btn.savePDF': 'Save PDF',
//   'status.ready': 'Ready',
//   'status.searching': 'Searching...',
//   'status.found': 'Found',
//   'status.patients': 'patients',
//   'status.totalPatients': 'Total Patients',
//   'status.error': 'Error',
//   'status.cleared': 'Cleared',
//   'status.loadingVisits': 'Loading visits...',
//   'status.visitsLoaded': 'Visits loaded',
//   'status.loadingHistory': 'Loading history...',
//   'status.historyLoaded': 'History loaded',
//   'status.noVisits': 'No visits found',
//   'status.noDrugs': 'No drugs prescribed',
//   'status.temp': 'Temporary',
//   'status.permanent': 'Permanent',
//   'patient.temp': 'Temp',
//   'patient.permanent': 'Permanent',
//   'table.title': 'Patient List',
//   'table.id': 'ID',
//   'table.firstName': 'First Name',
//   'table.middleName': 'Middle Name',
//   'table.lastName': 'Last Name',
//   'table.phone': 'Phone',
//   'table.type': 'Type',
//   'table.address': 'Address',
//   'table.gender': 'Gender',
//   'table.dob': 'Date of Birth',
//   'table.age': 'Age',
//   'table.status': 'Status',
//   'label.visitId': 'Visit ID',
//   'label.visitType': 'Visit Type',
//   'label.visitStatus': 'Visit Status',
//   'label.checkInTime': 'Check-in Time',
//   'label.consultationStart': 'Consultation Start',
//   'label.consultationEnd': 'Consultation End',
//   'label.chiefComplaint': 'Chief Complaint',
//   'label.history': 'History',
//   'label.medications': 'Medications',
//   'label.allergies': 'Allergies',
//   'label.doctorNotes': 'Doctor Notes',
//   'label.prescribedDrugs': 'Prescribed Drugs',
//   'label.drugName': 'Drug Name',
//   'label.strength': 'Strength',
//   'label.route': 'Route',
//   'label.date': 'Date',
//   'label.doctor': 'Doctor',
//   'info.patientHistoryReport': 'Patient History Report - {0}',
//   'info.noHistory': 'No history found for this patient',
//   'info.pdfSaved': 'PDF saved successfully at: {0}',
//   'error.searchFailed': 'Search failed: {0}',
//   'error.loadVisits': 'Failed to load visits: {0}',
//   'error.loadHistory': 'Failed to load history: {0}',
//   'error.pdfExport': 'PDF export failed: {0}',
//   'msg.enterValue': 'Please enter at least 2 characters',
//   'alert.information': 'Information',
//   'alert.warning': 'Warning',
//   'alert.error': 'Error',
//   'pagination.prev': 'Previous',
//   'pagination.next': 'Next',
//   'pagination.page': 'Page',
//   'pagination.of': 'of'
// };

// const AR_BUNDLE = {
//   'title.searchPatients': 'بحث عن المرضى',
//   'title.visits': 'زيارات المريض',
//   'title.visitDetails': 'تفاصيل الزيارة',
//   'search.name': 'الاسم',
//   'search.mobile': 'الجوال',
//   'prompt.name': 'أدخل اسم المريض...',
//   'prompt.mobile': 'أدخل رقم الجوال...',
//   'btn.search': 'بحث',
//   'btn.clear': 'مسح',
//   'btn.patientHistory': 'تاريخ المريض',
//   'btn.viewDetails': 'عرض التفاصيل',
//   'btn.exportPDF': 'تصدير PDF',
//   'btn.savePDF': 'حفظ PDF',
//   'status.ready': 'جاهز',
//   'status.searching': 'جاري البحث...',
//   'status.found': 'تم العثور على',
//   'status.patients': 'مريض',
//   'status.totalPatients': 'إجمالي المرضى',
//   'status.error': 'خطأ',
//   'status.cleared': 'تم المسح',
//   'status.loadingVisits': 'جاري تحميل الزيارات...',
//   'status.visitsLoaded': 'تم تحميل الزيارات',
//   'status.loadingHistory': 'جاري تحميل التاريخ...',
//   'status.historyLoaded': 'تم تحميل التاريخ',
//   'status.noVisits': 'لا توجد زيارات',
//   'status.noDrugs': 'لا توجد أدوية موصوفة',
//   'status.temp': 'مؤقت',
//   'status.permanent': 'دائم',
//   'patient.temp': 'مؤقت',
//   'patient.permanent': 'دائم',
//   'table.title': 'قائمة المرضى',
//   'table.id': 'المعرف',
//   'table.firstName': 'الاسم الأول',
//   'table.middleName': 'الاسم الأوسط',
//   'table.lastName': 'الاسم الأخير',
//   'table.phone': 'الهاتف',
//   'table.type': 'النوع',
//   'table.address': 'العنوان',
//   'table.gender': 'الجنس',
//   'table.dob': 'تاريخ الميلاد',
//   'table.age': 'العمر',
//   'table.status': 'الحالة',
//   'label.visitId': 'معرف الزيارة',
//   'label.visitType': 'نوع الزيارة',
//   'label.visitStatus': 'حالة الزيارة',
//   'label.checkInTime': 'وقت تسجيل الدخول',
//   'label.consultationStart': 'بداية الاستشارة',
//   'label.consultationEnd': 'نهاية الاستشارة',
//   'label.chiefComplaint': 'الشكوى الرئيسية',
//   'label.history': 'التاريخ الطبي',
//   'label.medications': 'الأدوية',
//   'label.allergies': 'الحساسية',
//   'label.doctorNotes': 'ملاحظات الطبيب',
//   'label.prescribedDrugs': 'الأدوية الموصوفة',
//   'label.drugName': 'اسم الدواء',
//   'label.strength': 'التركيز',
//   'label.route': 'طريقة الاستخدام',
//   'label.date': 'التاريخ',
//   'label.doctor': 'الطبيب',
//   'info.patientHistoryReport': 'تقرير تاريخ المريض - {0}',
//   'info.noHistory': 'لا يوجد تاريخ لهذا المريض',
//   'info.pdfSaved': 'تم حفظ PDF بنجاح في: {0}',
//   'error.searchFailed': 'فشل البحث: {0}',
//   'error.loadVisits': 'فشل تحميل الزيارات: {0}',
//   'error.loadHistory': 'فشل تحميل التاريخ: {0}',
//   'error.pdfExport': 'فشل تصدير PDF: {0}',
//   'msg.enterValue': 'الرجاء إدخال حرفين على الأقل',
//   'alert.information': 'معلومات',
//   'alert.warning': 'تحذير',
//   'alert.error': 'خطأ',
//   'pagination.prev': 'السابق',
//   'pagination.next': 'التالي',
//   'pagination.page': 'صفحة',
//   'pagination.of': 'من'
// };

// const DoctorSearchPatientScreen = ({ loggedUser, language: propLanguage, onClose }) => {
//   // ==================== GET LANGUAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = localStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== STATE ====================
//   const [locale, setLocale] = useState(getLanguage());
//   const [searchBy, setSearchBy] = useState(SEARCH_NAME);
//   const [searchValue, setSearchValue] = useState('');
//   const [allPatients, setAllPatients] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState({ text: 'Ready', type: 'success' });
//   const [totalResults, setTotalResults] = useState(0);
//   const [showVisitsModal, setShowVisitsModal] = useState(false);
//   const [visits, setVisits] = useState([]);
//   const [showHistoryModal, setShowHistoryModal] = useState(false);
//   const [historyData, setHistoryData] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedVisitDetails, setSelectedVisitDetails] = useState(null);
//   const [drugs, setDrugs] = useState([]);
  
//   // ==================== PAGINATION STATE ====================
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   const isRTL = locale === 'ar';

//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== PAGINATION FUNCTIONS ====================
//   const goToPage = useCallback((page) => {
//     if (page < 0 || page >= totalPages) return;
//     setCurrentPage(page);
    
//     const start = page * PAGE_SIZE;
//     const end = Math.min(start + PAGE_SIZE, allPatients.length);
//     setPatients(allPatients.slice(start, end));
//   }, [allPatients, totalPages]);

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const pages = [];
//     const maxVisible = 7;
//     let startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
//     let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);
    
//     if (endPage - startPage < maxVisible - 1) {
//       startPage = Math.max(0, endPage - maxVisible + 1);
//     }

//     return (
//       <div className="pagination-container">
//         <button 
//           className="pagination-btn"
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage === 0}
//         >
//           ◀ {t('pagination.prev')}
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-btn" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
//           <button
//             key={page}
//             className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(page)}
//           >
//             {page + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-btn" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-btn"
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage >= totalPages - 1}
//         >
//           {t('pagination.next')} ▶
//         </button>
        
//         <span className="pagination-info">
//           {t('pagination.page')} {currentPage + 1} {t('pagination.of')} {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== SEARCH FUNCTIONS ====================
//   const performSearch = useCallback(async () => {
//     if (searchValue.length < 2) {
//       alert(t('msg.enterValue'));
//       return;
//     }

//     setLoading(true);
//     setStatus({ text: t('status.searching'), type: 'loading' });

//     try {
//       let endpoint;
//       if (searchBy === SEARCH_MOBILE) {
//         endpoint = `/api/patients/search/mobile/${encodeURIComponent(searchValue)}`;
//       } else {
//         endpoint = `/api/patients/search/name/${encodeURIComponent(searchValue)}`;
//       }

//       const data = await apiFetch(endpoint);
//       const patientList = Array.isArray(data) ? data : [];
      
//       const transformed = patientList.map(p => ({
//         id: p.id,
//         firstName: p.firstName || '',
//         middleName: p.middleName || '',
//         lastName: p.lastName || '',
//         phone: p.phone || '',
//         address: p.address || '',
//         gender: p.gender || '',
//         dateOfBirth: p.dateOfBirth || null,
//         tempPatient: p.temp || false
//       }));

//       setAllPatients(transformed);
//       setTotalResults(transformed.length);
      
//       // Calculate pagination
//       const total = Math.ceil(transformed.length / PAGE_SIZE);
//       setTotalPages(total);
//       setCurrentPage(0);
      
//       // Set first page
//       setPatients(transformed.slice(0, PAGE_SIZE));
      
//       setStatus({ 
//         text: `${t('status.found')} ${transformed.length} ${t('status.patients')}`, 
//         type: 'success' 
//       });
//     } catch (error) {
//       setStatus({ text: t('status.error'), type: 'error' });
//       alert(t('error.searchFailed').replace('{0}', error.message));
//     } finally {
//       setLoading(false);
//     }
//   }, [searchValue, searchBy, apiFetch, t]);

//   const clearSearch = useCallback(() => {
//     setSearchValue('');
//     setAllPatients([]);
//     setPatients([]);
//     setTotalResults(0);
//     setSelectedPatient(null);
//     setCurrentPage(0);
//     setTotalPages(0);
//     setStatus({ text: t('status.cleared'), type: 'info' });
//   }, [t]);

//   // ==================== VISIT FUNCTIONS ====================
//   const loadPatientHistory = useCallback(async () => {
//     if (!selectedPatient) return;

//     setLoading(true);
//     setStatus({ text: t('status.loadingHistory'), type: 'loading' });

//     try {
//       const endpoint = `/api/patient/history/patient/${selectedPatient.id}`;
//       const data = await apiFetch(endpoint);
      
//       setHistoryData(data);
//       setShowHistoryModal(true);
//       setStatus({ text: t('status.historyLoaded'), type: 'success' });
//     } catch (error) {
//       alert(t('error.loadHistory').replace('{0}', error.message));
//       setStatus({ text: t('status.error'), type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedPatient, apiFetch, t]);

//   // ==================== VISIT DETAILS ====================
//   const showVisitDetails = useCallback(async (visit) => {
//     setSelectedVisitDetails(visit);
    
//     try {
//       const drugsData = await apiFetch(`/api/visits/${visit.id}/drugs`);
//       setDrugs(Array.isArray(drugsData) ? drugsData : []);
//     } catch (error) {
//       console.error('Failed to load drugs:', error);
//       setDrugs([]);
//     }
    
//     setShowDetailsModal(true);
//   }, [apiFetch]);

//   // ==================== FORMAT HELPERS ====================
//   const formatDate = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleString(isRTL ? 'ar' : 'en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return iso;
//     }
//   }, [isRTL]);

//   const formatDateShort = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleDateString(isRTL ? 'ar' : 'en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch {
//       return iso;
//     }
//   }, [isRTL]);

//   const calculateAge = useCallback((dob) => {
//     if (!dob) return '-';
//     try {
//       const birth = new Date(dob);
//       const today = new Date();
//       let age = today.getFullYear() - birth.getFullYear();
//       const m = today.getMonth() - birth.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//         age--;
//       }
//       return age;
//     } catch {
//       return '-';
//     }
//   }, []);

//   const getStatusColor = useCallback((status) => {
//     switch (status?.toUpperCase()) {
//       case 'COMPLETED': return '#27ae60';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CANCELLED': return '#e74c3c';
//       default: return '#3498db';
//     }
//   }, []);

//   // ==================== RENDER COMPONENTS ====================
  
//   // Status Badge Component
//   const StatusBadge = ({ status }) => {
//     const color = getStatusColor(status);
//     return (
//       <span className="status-badge" style={{ backgroundColor: color }}>
//         {status}
//       </span>
//     );
//   };

//   // Visit Card Component
//   const VisitCard = ({ visit, onViewDetails }) => {
//     const statusColor = getStatusColor(visit.visitStatus);
    
//     return (
//       <div className="visit-card">
//         <div className="visit-card-header">
//           <span className="visit-id">📋 {t('label.visitId')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <span className="status-badge" style={{ backgroundColor: statusColor }}>
//             {visit.visitStatus || 'N/A'}
//           </span>
//         </div>
//         <div className="visit-card-body">
//           <div className="visit-info">
//             <div className="visit-detail">
//               <strong>{t('label.visitType')}:</strong> {visit.visitType || 'N/A'}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.checkInTime')}:</strong> {formatDate(visit.checkInTime)}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.chiefComplaint')}:</strong> {visit.chiefComplaint || 'N/A'}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.doctorNotes')}:</strong> {visit.doctorNotes || 'N/A'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-view-details"
//               onClick={() => onViewDetails(visit)}
//             >
//               👁️ {t('btn.viewDetails')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Patient Table Row Component
//   const PatientRow = ({ patient, isSelected, onSelect }) => {
//     const fullName = `${patient.firstName} ${patient.lastName}`;
//     const age = calculateAge(patient.dateOfBirth);
//     const isTemp = patient.tempPatient;
//     const genderIcon = patient.gender?.toUpperCase() === 'FEMALE' ? '♀️' : '♂️';
    
//     return (
//       <tr 
//         className={`patient-row ${isSelected ? 'selected' : ''} ${isTemp ? 'temp' : ''}`}
//         onClick={() => onSelect(patient)}
//       >
//         <td>{patient.id}</td>
//         <td>{patient.firstName}</td>
//         <td>{patient.middleName}</td>
//         <td>{patient.lastName}</td>
//         <td>
//           <span className={`patient-type-badge ${isTemp ? 'temp' : 'permanent'}`}>
//             {isTemp ? '🟡 ' + t('patient.temp') : '🟢 ' + t('patient.permanent')}
//           </span>
//         </td>
//         <td>{patient.phone}</td>
//         <td>{patient.address}</td>
//         <td>{genderIcon} {patient.gender}</td>
//         <td>{formatDateShort(patient.dateOfBirth)}</td>
//         <td>{age}</td>
//         <td>
//           <span className={`status-badge ${isTemp ? 'temp' : 'permanent'}`}>
//             {isTemp ? t('status.temp') : t('status.permanent')}
//           </span>
//         </td>
//       </tr>
//     );
//   };

//   // ==================== MODALS ====================
  
//   // Visit Details Modal
//   const VisitDetailsModal = () => {
//     if (!showDetailsModal || !selectedVisitDetails) return null;
    
//     const visit = selectedVisitDetails;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowDetailsModal(false)}>✖</button>
//           <h2>{t('title.visitDetails')} #{visit.id}</h2>
          
//           <div className="details-grid">
//             <div className="detail-row">
//               <span className="detail-label">{t('label.visitStatus')}:</span>
//               <span className="detail-value">
//                 <StatusBadge status={visit.visitStatus} />
//               </span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.visitType')}:</span>
//               <span className="detail-value">{visit.visitType || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.checkInTime')}:</span>
//               <span className="detail-value">{formatDate(visit.checkInTime)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.consultationStart')}:</span>
//               <span className="detail-value">{formatDate(visit.consultationStart)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.consultationEnd')}:</span>
//               <span className="detail-value">{formatDate(visit.consultationEnd)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.chiefComplaint')}:</span>
//               <span className="detail-value">{visit.chiefComplaint || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.history')}:</span>
//               <span className="detail-value">{visit.history || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.medications')}:</span>
//               <span className="detail-value">{visit.medications || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.allergies')}:</span>
//               <span className="detail-value">{visit.allergies || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.doctorNotes')}:</span>
//               <span className="detail-value">{visit.doctorNotes || 'N/A'}</span>
//             </div>
//           </div>
          
//           <h3>{t('label.prescribedDrugs')}</h3>
//           {drugs.length === 0 ? (
//             <div className="empty-state small">{t('status.noDrugs')}</div>
//           ) : (
//             <div className="drugs-list">
//               {drugs.map((drug, index) => (
//                 <div key={index} className="drug-item">
//                   <span className="drug-name">💊 {drug.tradeName || 'Unknown'}</span>
//                   <span className="drug-strength">💪 {drug.strength || 'N/A'}</span>
//                   <span className="drug-route">📌 {drug.routeOfAdmin || 'N/A'}</span>
//                   <span className="drug-form">📦 {drug.dosageForm || 'N/A'}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // History Modal
//   const HistoryModal = () => {
//     if (!showHistoryModal || !historyData) return null;
    
//     const history = Array.isArray(historyData) ? historyData : [];
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
//         <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowHistoryModal(false)}>✖</button>
//           <h2>{t('info.patientHistoryReport').replace('{0}', selectedPatient?.firstName || '')}</h2>
          
//           {history.length === 0 ? (
//             <div className="empty-state">{t('info.noHistory')}</div>
//           ) : (
//             <div className="history-list">
//               {history.map((record, index) => (
//                 <div key={index} className="history-record">
//                   <div className="history-header">
//                     <strong>{t('label.visitId')}: {record.id}</strong>
//                     <span className="history-date">{formatDate(record.checkInTime)}</span>
//                   </div>
//                   <div className="history-body">
//                     <div><strong>{t('label.doctor')}:</strong> {record.doctorName || 'N/A'}</div>
//                     <div><strong>{t('label.visitType')}:</strong> {record.visitType || 'N/A'}</div>
//                     <div><strong>{t('label.visitStatus')}:</strong> {record.visitStatus || 'N/A'}</div>
//                     <div><strong>{t('label.chiefComplaint')}:</strong> {record.chiefComplaint || 'N/A'}</div>
//                     <div><strong>{t('label.allergies')}:</strong> {record.allergies || 'N/A'}</div>
//                     <div><strong>{t('label.medications')}:</strong> {record.medications || 'N/A'}</div>
//                     <div><strong>{t('label.doctorNotes')}:</strong> {record.doctorNotes || 'N/A'}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // ==================== MAIN RENDER ====================
//   return (
//     <div className={`doctor-search-patient ${isRTL ? 'rtl' : ''}`}>
//       {/* Header */}
//       {/* <div className="search-header">
//         <h1>🔍 {t('title.searchPatients')}</h1>
//         <div className={`status-badge ${status.type}`}>
//           ● {status.text}
//         </div>
//       </div> */}

// {/* Header */}
// <div className="search-header">
//   <div className="header-left">
//     <h1>🔍 {t('title.searchPatients')}</h1>
//     <div className={`status-badge ${status.type}`}>
//       ● {status.text}
//     </div>
//   </div>

//   <button
//     className="btn-close-screen"
//     onClick={onClose}
//     title="Close"
//   >
//     ✖
//   </button>
// </div>
//       {/* Search Section */}
//       <div className="search-section">
//         <div className="search-controls">
//           <select 
//             value={searchBy}
//             onChange={(e) => {
//               setSearchBy(e.target.value);
//               setSearchValue('');
//             }}
//             className="search-select"
//           >
//             <option value={SEARCH_NAME}>{t('search.name')}</option>
//             <option value={SEARCH_MOBILE}>{t('search.mobile')}</option>
//           </select>
          
//           <input
//             type="text"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             placeholder={searchBy === SEARCH_MOBILE ? t('prompt.mobile') : t('prompt.name')}
//             onKeyPress={(e) => e.key === 'Enter' && performSearch()}
//             className="search-input"
//           />
          
//           <button 
//             onClick={performSearch}
//             disabled={searchValue.length < 2 || loading}
//             className="btn-search"
//           >
//             {loading ? '⏳' : '🔍'} {t('btn.search')}
//           </button>
          
//           <button 
//             onClick={clearSearch}
//             className="btn-clear"
//           >
//             🗑️ {t('btn.clear')}
//           </button>
          
//           {loading && <div className="loading-spinner-small"></div>}
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="table-section">
//         <div className="table-header">
//           <h2>📋 {t('table.title')}</h2>
//           <span className="total-results">👤 {t('status.totalPatients')}: {totalResults}</span>
//         </div>
        
//         <div className="table-container">
//           <table className="patients-table">
//             <thead>
//               <tr>
//                 <th>{t('table.id')}</th>
//                 <th>{t('table.firstName')}</th>
//                 <th>{t('table.middleName')}</th>
//                 <th>{t('table.lastName')}</th>
//                 <th>{t('table.type')}</th>
//                 <th>{t('table.phone')}</th>
//                 <th>{t('table.address')}</th>
//                 <th>{t('table.gender')}</th>
//                 <th>{t('table.dob')}</th>
//                 <th>{t('table.age')}</th>
//                 <th>{t('table.status')}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.length === 0 ? (
//                 <tr>
//                   <td colSpan="11" className="empty-state">
//                     📭 {t('status.noVisits')}
//                   </td>
//                 </tr>
//               ) : (
//                 patients.map((patient) => (
//                   <PatientRow
//                     key={patient.id}
//                     patient={patient}
//                     isSelected={selectedPatient?.id === patient.id}
//                     onSelect={setSelectedPatient}
//                   />
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         {/* ==================== PAGINATION ==================== */}
//         {renderPagination()}
//       </div>

//       {/* Actions Section */}
//       <div className="actions-section">
//         <button 
//           onClick={loadPatientHistory}
//           disabled={!selectedPatient || loading}
//           className="btn-action btn-history"
//         >
//           📊 {t('btn.patientHistory')}
//         </button>
//       </div>

//       {/* Modals */}
//       <VisitDetailsModal />
//       <HistoryModal />
//     </div>
//   );
// };

// export default DoctorSearchPatientScreen;   04072026  9:45 pm

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorSearchPatientScreen.css';

// // ==================== CONSTANTS ====================
// const SEARCH_NAME = 'NAME';
// const SEARCH_MOBILE = 'MOBILE';
// const PAGE_SIZE = 10;

// // ==================== LOCALIZATION ====================
// const EN_BUNDLE = {
//   'title.searchPatients': 'Search Patients',
//   'title.visits': 'Patient Visits',
//   'title.visitDetails': 'Visit Details',
//   'search.name': 'Name',
//   'search.mobile': 'Mobile',
//   'prompt.name': 'Enter patient name...',
//   'prompt.mobile': 'Enter mobile number...',
//   'btn.search': 'Search',
//   'btn.clear': 'Clear',
//   'btn.close': 'Close',
//   'btn.patientHistory': 'Patient History',
//   'btn.viewDetails': 'View Details',
//   'btn.exportPDF': 'Export PDF',
//   'btn.savePDF': 'Save PDF',
//   'btn.history': 'History',
//   'status.ready': 'Ready',
//   'status.searching': 'Searching...',
//   'status.found': 'Found',
//   'status.patients': 'patients',
//   'status.totalPatients': 'Total Patients',
//   'status.error': 'Error',
//   'status.cleared': 'Cleared',
//   'status.loadingVisits': 'Loading visits...',
//   'status.visitsLoaded': 'Visits loaded',
//   'status.loadingHistory': 'Loading history...',
//   'status.historyLoaded': 'History loaded',
//   'status.noVisits': 'No visits found',
//   'status.noDrugs': 'No drugs prescribed',
//   'status.temp': 'Temporary',
//   'status.permanent': 'Permanent',
//   'patient.temp': 'Temp',
//   'patient.permanent': 'Permanent',
//   'table.title': 'Patient List',
//   'table.id': 'ID',
//   'table.firstName': 'First Name',
//   'table.middleName': 'Middle Name',
//   'table.lastName': 'Last Name',
//   'table.phone': 'Phone',
//   'table.type': 'Type',
//   'table.address': 'Address',
//   'table.gender': 'Gender',
//   'table.dob': 'Date of Birth',
//   'table.age': 'Age',
//   'table.status': 'Status',
//   'table.actions': 'Actions',
//   'label.visitId': 'Visit ID',
//   'label.visitType': 'Visit Type',
//   'label.visitStatus': 'Visit Status',
//   'label.checkInTime': 'Check-in Time',
//   'label.consultationStart': 'Consultation Start',
//   'label.consultationEnd': 'Consultation End',
//   'label.chiefComplaint': 'Chief Complaint',
//   'label.history': 'History',
//   'label.medications': 'Medications',
//   'label.allergies': 'Allergies',
//   'label.doctorNotes': 'Doctor Notes',
//   'label.prescribedDrugs': 'Prescribed Drugs',
//   'label.drugName': 'Drug Name',
//   'label.strength': 'Strength',
//   'label.route': 'Route',
//   'label.date': 'Date',
//   'label.doctor': 'Doctor',
//   'info.patientHistoryReport': 'Patient History Report - {0}',
//   'info.noHistory': 'No history found for this patient',
//   'info.pdfSaved': 'PDF saved successfully at: {0}',
//   'error.searchFailed': 'Search failed: {0}',
//   'error.loadVisits': 'Failed to load visits: {0}',
//   'error.loadHistory': 'Failed to load history: {0}',
//   'error.pdfExport': 'PDF export failed: {0}',
//   'msg.enterValue': 'Please enter at least 2 characters',
//   'alert.information': 'Information',
//   'alert.warning': 'Warning',
//   'alert.error': 'Error',
//   'pagination.prev': 'Previous',
//   'pagination.next': 'Next',
//   'pagination.page': 'Page',
//   'pagination.of': 'of'
// };

// const AR_BUNDLE = {
//   'title.searchPatients': 'بحث عن المرضى',
//   'title.visits': 'زيارات المريض',
//   'title.visitDetails': 'تفاصيل الزيارة',
//   'search.name': 'الاسم',
//   'search.mobile': 'الجوال',
//   'prompt.name': 'أدخل اسم المريض...',
//   'prompt.mobile': 'أدخل رقم الجوال...',
//   'btn.search': 'بحث',
//   'btn.clear': 'مسح',
//   'btn.close': 'إغلاق',
//   'btn.patientHistory': 'تاريخ المريض',
//   'btn.viewDetails': 'عرض التفاصيل',
//   'btn.exportPDF': 'تصدير PDF',
//   'btn.savePDF': 'حفظ PDF',
//   'btn.history': 'التاريخ',
//   'status.ready': 'جاهز',
//   'status.searching': 'جاري البحث...',
//   'status.found': 'تم العثور على',
//   'status.patients': 'مريض',
//   'status.totalPatients': 'إجمالي المرضى',
//   'status.error': 'خطأ',
//   'status.cleared': 'تم المسح',
//   'status.loadingVisits': 'جاري تحميل الزيارات...',
//   'status.visitsLoaded': 'تم تحميل الزيارات',
//   'status.loadingHistory': 'جاري تحميل التاريخ...',
//   'status.historyLoaded': 'تم تحميل التاريخ',
//   'status.noVisits': 'لا توجد زيارات',
//   'status.noDrugs': 'لا توجد أدوية موصوفة',
//   'status.temp': 'مؤقت',
//   'status.permanent': 'دائم',
//   'patient.temp': 'مؤقت',
//   'patient.permanent': 'دائم',
//   'table.title': 'قائمة المرضى',
//   'table.id': 'المعرف',
//   'table.firstName': 'الاسم الأول',
//   'table.middleName': 'الاسم الأوسط',
//   'table.lastName': 'الاسم الأخير',
//   'table.phone': 'الهاتف',
//   'table.type': 'النوع',
//   'table.address': 'العنوان',
//   'table.gender': 'الجنس',
//   'table.dob': 'تاريخ الميلاد',
//   'table.age': 'العمر',
//   'table.status': 'الحالة',
//   'table.actions': 'الإجراءات',
//   'label.visitId': 'معرف الزيارة',
//   'label.visitType': 'نوع الزيارة',
//   'label.visitStatus': 'حالة الزيارة',
//   'label.checkInTime': 'وقت تسجيل الدخول',
//   'label.consultationStart': 'بداية الاستشارة',
//   'label.consultationEnd': 'نهاية الاستشارة',
//   'label.chiefComplaint': 'الشكوى الرئيسية',
//   'label.history': 'التاريخ الطبي',
//   'label.medications': 'الأدوية',
//   'label.allergies': 'الحساسية',
//   'label.doctorNotes': 'ملاحظات الطبيب',
//   'label.prescribedDrugs': 'الأدوية الموصوفة',
//   'label.drugName': 'اسم الدواء',
//   'label.strength': 'التركيز',
//   'label.route': 'طريقة الاستخدام',
//   'label.date': 'التاريخ',
//   'label.doctor': 'الطبيب',
//   'info.patientHistoryReport': 'تقرير تاريخ المريض - {0}',
//   'info.noHistory': 'لا يوجد تاريخ لهذا المريض',
//   'info.pdfSaved': 'تم حفظ PDF بنجاح في: {0}',
//   'error.searchFailed': 'فشل البحث: {0}',
//   'error.loadVisits': 'فشل تحميل الزيارات: {0}',
//   'error.loadHistory': 'فشل تحميل التاريخ: {0}',
//   'error.pdfExport': 'فشل تصدير PDF: {0}',
//   'msg.enterValue': 'الرجاء إدخال حرفين على الأقل',
//   'alert.information': 'معلومات',
//   'alert.warning': 'تحذير',
//   'alert.error': 'خطأ',
//   'pagination.prev': 'السابق',
//   'pagination.next': 'التالي',
//   'pagination.page': 'صفحة',
//   'pagination.of': 'من'
// };

// const DoctorSearchPatientScreen = ({ loggedUser, language: propLanguage, onClose }) => {
//   // ==================== GET LANGUAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = localStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== STATE ====================
//   const [locale, setLocale] = useState(getLanguage());
//   const [searchBy, setSearchBy] = useState(SEARCH_NAME);
//   const [searchValue, setSearchValue] = useState('');
//   const [allPatients, setAllPatients] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState({ text: 'Ready', type: 'success' });
//   const [totalResults, setTotalResults] = useState(0);
//   const [showVisitsModal, setShowVisitsModal] = useState(false);
//   const [visits, setVisits] = useState([]);
//   const [showHistoryModal, setShowHistoryModal] = useState(false);
//   const [historyData, setHistoryData] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedVisitDetails, setSelectedVisitDetails] = useState(null);
//   const [drugs, setDrugs] = useState([]);
//   const [historyLoadingPatientId, setHistoryLoadingPatientId] = useState(null);
  
//   // ==================== PAGINATION STATE ====================
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   const isRTL = locale === 'ar';

//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== PAGINATION FUNCTIONS ====================
//   const goToPage = useCallback((page) => {
//     if (page < 0 || page >= totalPages) return;
//     setCurrentPage(page);
    
//     const start = page * PAGE_SIZE;
//     const end = Math.min(start + PAGE_SIZE, allPatients.length);
//     setPatients(allPatients.slice(start, end));
//   }, [allPatients, totalPages]);

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const pages = [];
//     const maxVisible = 7;
//     let startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
//     let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);
    
//     if (endPage - startPage < maxVisible - 1) {
//       startPage = Math.max(0, endPage - maxVisible + 1);
//     }

//     return (
//       <div className="pagination-container">
//         <button 
//           className="pagination-btn"
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage === 0}
//         >
//           ◀ {t('pagination.prev')}
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-btn" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
//           <button
//             key={page}
//             className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(page)}
//           >
//             {page + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-btn" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-btn"
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage >= totalPages - 1}
//         >
//           {t('pagination.next')} ▶
//         </button>
        
//         <span className="pagination-info">
//           {t('pagination.page')} {currentPage + 1} {t('pagination.of')} {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== SEARCH FUNCTIONS ====================
//   const performSearch = useCallback(async () => {
//     if (searchValue.length < 2) {
//       alert(t('msg.enterValue'));
//       return;
//     }

//     setLoading(true);
//     setStatus({ text: t('status.searching'), type: 'loading' });

//     try {
//       let endpoint;
//       if (searchBy === SEARCH_MOBILE) {
//         endpoint = `/api/patients/search/mobile/${encodeURIComponent(searchValue)}`;
//       } else {
//         endpoint = `/api/patients/search/name/${encodeURIComponent(searchValue)}`;
//       }

//       const data = await apiFetch(endpoint);
//       const patientList = Array.isArray(data) ? data : [];
      
//       const transformed = patientList.map(p => ({
//         id: p.id,
//         firstName: p.firstName || '',
//         middleName: p.middleName || '',
//         lastName: p.lastName || '',
//         phone: p.phone || '',
//         address: p.address || '',
//         gender: p.gender || '',
//         dateOfBirth: p.dateOfBirth || null,
//         tempPatient: p.temp || false
//       }));

//       setAllPatients(transformed);
//       setTotalResults(transformed.length);
      
//       // Calculate pagination
//       const total = Math.ceil(transformed.length / PAGE_SIZE);
//       setTotalPages(total);
//       setCurrentPage(0);
      
//       // Set first page
//       setPatients(transformed.slice(0, PAGE_SIZE));
      
//       setStatus({ 
//         text: `${t('status.found')} ${transformed.length} ${t('status.patients')}`, 
//         type: 'success' 
//       });
//     } catch (error) {
//       setStatus({ text: t('status.error'), type: 'error' });
//       alert(t('error.searchFailed').replace('{0}', error.message));
//     } finally {
//       setLoading(false);
//     }
//   }, [searchValue, searchBy, apiFetch, t]);

//   const clearSearch = useCallback(() => {
//     setSearchValue('');
//     setAllPatients([]);
//     setPatients([]);
//     setTotalResults(0);
//     setSelectedPatient(null);
//     setCurrentPage(0);
//     setTotalPages(0);
//     setStatus({ text: t('status.cleared'), type: 'info' });
//   }, [t]);

//   // ==================== HISTORY FUNCTIONS ====================
//  const loadPatientHistoryForRow = useCallback(async (patient) => {
//     setHistoryLoadingPatientId(patient.id);
//     setStatus({ text: t('status.loadingHistory'), type: 'loading' });

//     try {
//       const endpoint = `/api/patient/history/patient/${patient.id}`;
//       const data = await apiFetch(endpoint);
      
//       setSelectedPatient(patient);
//       // Handle null/empty response
//       setHistoryData(data || []);
//       setShowHistoryModal(true);
//       setStatus({ text: t('status.historyLoaded'), type: 'success' });
//     } catch (error) {
//       // If it's a 204, it might not actually be an error
//       if (error.message === '204' || error.message.includes('204')) {
//         setSelectedPatient(patient);
//         setHistoryData([]);
//         setShowHistoryModal(true);
//         setStatus({ text: t('status.historyLoaded'), type: 'success' });
//       } else {
//         alert(t('error.loadHistory').replace('{0}', error.message));
//         setStatus({ text: t('status.error'), type: 'error' });
//       }
//     } finally {
//       setHistoryLoadingPatientId(null);
//       setLoading(false);
//     }
//   }, [apiFetch, t]);
//   const loadPatientHistory = useCallback(async () => {
//     if (!selectedPatient) return;

//     setLoading(true);
//     setStatus({ text: t('status.loadingHistory'), type: 'loading' });

//     try {
//       const endpoint = `/api/patient/history/patient/${selectedPatient.id}`;
//       const data = await apiFetch(endpoint);
      
//       setHistoryData(data);
//       setShowHistoryModal(true);
//       setStatus({ text: t('status.historyLoaded'), type: 'success' });
//     } catch (error) {
//       alert(t('error.loadHistory').replace('{0}', error.message));
//       setStatus({ text: t('status.error'), type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedPatient, apiFetch, t]);

//   // ==================== VISIT DETAILS ====================
//   const showVisitDetails = useCallback(async (visit) => {
//     setSelectedVisitDetails(visit);
    
//     try {
//       const drugsData = await apiFetch(`/api/visits/${visit.id}/drugs`);
//       setDrugs(Array.isArray(drugsData) ? drugsData : []);
//     } catch (error) {
//       console.error('Failed to load drugs:', error);
//       setDrugs([]);
//     }
    
//     setShowDetailsModal(true);
//   }, [apiFetch]);

//   // ==================== FORMAT HELPERS ====================
//   const formatDate = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleString(isRTL ? 'ar' : 'en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return iso;
//     }
//   }, [isRTL]);

//   const formatDateShort = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleDateString(isRTL ? 'ar' : 'en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch {
//       return iso;
//     }
//   }, [isRTL]);

//   const calculateAge = useCallback((dob) => {
//     if (!dob) return '-';
//     try {
//       const birth = new Date(dob);
//       const today = new Date();
//       let age = today.getFullYear() - birth.getFullYear();
//       const m = today.getMonth() - birth.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//         age--;
//       }
//       return age;
//     } catch {
//       return '-';
//     }
//   }, []);

//   const getStatusColor = useCallback((status) => {
//     switch (status?.toUpperCase()) {
//       case 'COMPLETED': return '#27ae60';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CANCELLED': return '#e74c3c';
//       default: return '#3498db';
//     }
//   }, []);

//   // ==================== RENDER COMPONENTS ====================
  
//   // Status Badge Component
//   const StatusBadge = ({ status }) => {
//     const color = getStatusColor(status);
//     return (
//       <span className="status-badge" style={{ backgroundColor: color }}>
//         {status}
//       </span>
//     );
//   };

//   // Visit Card Component
//   const VisitCard = ({ visit, onViewDetails }) => {
//     const statusColor = getStatusColor(visit.visitStatus);
    
//     return (
//       <div className="visit-card">
//         <div className="visit-card-header">
//           <span className="visit-id">📋 {t('label.visitId')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <span className="status-badge" style={{ backgroundColor: statusColor }}>
//             {visit.visitStatus || 'N/A'}
//           </span>
//         </div>
//         <div className="visit-card-body">
//           <div className="visit-info">
//             <div className="visit-detail">
//               <strong>{t('label.visitType')}:</strong> {visit.visitType || 'N/A'}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.checkInTime')}:</strong> {formatDate(visit.checkInTime)}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.chiefComplaint')}:</strong> {visit.chiefComplaint || 'N/A'}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.doctorNotes')}:</strong> {visit.doctorNotes || 'N/A'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-view-details"
//               onClick={() => onViewDetails(visit)}
//             >
//               👁️ {t('btn.viewDetails')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Patient Table Row Component - Updated with History button
//   const PatientRow = ({ patient, isSelected, onSelect, onHistory }) => {
//     const fullName = `${patient.firstName} ${patient.lastName}`;
//     const age = calculateAge(patient.dateOfBirth);
//     const isTemp = patient.tempPatient;
//     const genderIcon = patient.gender?.toUpperCase() === 'FEMALE' ? '♀️' : '♂️';
//     const isLoadingHistory = historyLoadingPatientId === patient.id;
    
//     return (
//       <tr 
//         className={`patient-row ${isSelected ? 'selected' : ''} ${isTemp ? 'temp' : ''}`}
//         onClick={() => onSelect(patient)}
//       >
//         <td>{patient.id}</td>
//         <td>{patient.firstName}</td>
//         <td>{patient.middleName}</td>
//         <td>{patient.lastName}</td>
//         <td>
//           <span className={`patient-type-badge ${isTemp ? 'temp' : 'permanent'}`}>
//             {isTemp ? '🟡 ' + t('patient.temp') : '🟢 ' + t('patient.permanent')}
//           </span>
//         </td>
//         <td>{patient.phone}</td>
//         <td>{patient.address}</td>
//         <td>{genderIcon} {patient.gender}</td>
//         <td>{formatDateShort(patient.dateOfBirth)}</td>
//         <td>{age}</td>
//         <td>
//           <span className={`status-badge ${isTemp ? 'temp' : 'permanent'}`}>
//             {isTemp ? t('status.temp') : t('status.permanent')}
//           </span>
//         </td>
//         <td>
//           <button
//             className="btn-row-history"
//             onClick={(e) => {
//               e.stopPropagation();
//               onHistory(patient);
//             }}
//             disabled={isLoadingHistory}
//             title={t('btn.history')}
//           >
//             {isLoadingHistory ? '⏳' : '📊'} {t('btn.history')}
//           </button>
//         </td>
//       </tr>
//     );
//   };

//   // ==================== MODALS ====================
  
//   // Visit Details Modal
//   const VisitDetailsModal = () => {
//     if (!showDetailsModal || !selectedVisitDetails) return null;
    
//     const visit = selectedVisitDetails;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowDetailsModal(false)}>✖</button>
//           <h2>{t('title.visitDetails')} #{visit.id}</h2>
          
//           <div className="details-grid">
//             <div className="detail-row">
//               <span className="detail-label">{t('label.visitStatus')}:</span>
//               <span className="detail-value">
//                 <StatusBadge status={visit.visitStatus} />
//               </span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.visitType')}:</span>
//               <span className="detail-value">{visit.visitType || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.checkInTime')}:</span>
//               <span className="detail-value">{formatDate(visit.checkInTime)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.consultationStart')}:</span>
//               <span className="detail-value">{formatDate(visit.consultationStart)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.consultationEnd')}:</span>
//               <span className="detail-value">{formatDate(visit.consultationEnd)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.chiefComplaint')}:</span>
//               <span className="detail-value">{visit.chiefComplaint || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.history')}:</span>
//               <span className="detail-value">{visit.history || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.medications')}:</span>
//               <span className="detail-value">{visit.medications || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.allergies')}:</span>
//               <span className="detail-value">{visit.allergies || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.doctorNotes')}:</span>
//               <span className="detail-value">{visit.doctorNotes || 'N/A'}</span>
//             </div>
//           </div>
          
//           <h3>{t('label.prescribedDrugs')}</h3>
//           {drugs.length === 0 ? (
//             <div className="empty-state small">{t('status.noDrugs')}</div>
//           ) : (
//             <div className="drugs-list">
//               {drugs.map((drug, index) => (
//                 <div key={index} className="drug-item">
//                   <span className="drug-name">💊 {drug.tradeName || 'Unknown'}</span>
//                   <span className="drug-strength">💪 {drug.strength || 'N/A'}</span>
//                   <span className="drug-route">📌 {drug.routeOfAdmin || 'N/A'}</span>
//                   <span className="drug-form">📦 {drug.dosageForm || 'N/A'}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // History Modal
//   const HistoryModal = () => {
//     if (!showHistoryModal || !historyData) return null;
    
//     const history = Array.isArray(historyData) ? historyData : [];
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
//         <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowHistoryModal(false)}>✖</button>
//           <h2>{t('info.patientHistoryReport').replace('{0}', selectedPatient?.firstName || '')}</h2>
          
//           {history.length === 0 ? (
//             <div className="empty-state">{t('info.noHistory')}</div>
//           ) : (
//             <div className="history-list">
//               {history.map((record, index) => (
//                 <div key={index} className="history-record">
//                   <div className="history-header">
//                     <strong>{t('label.visitId')}: {record.id}</strong>
//                     <span className="history-date">{formatDate(record.checkInTime)}</span>
//                   </div>
//                   <div className="history-body">
//                     <div><strong>{t('label.doctor')}:</strong> {record.doctorName || 'N/A'}</div>
//                     <div><strong>{t('label.visitType')}:</strong> {record.visitType || 'N/A'}</div>
//                     <div><strong>{t('label.visitStatus')}:</strong> {record.visitStatus || 'N/A'}</div>
//                     <div><strong>{t('label.chiefComplaint')}:</strong> {record.chiefComplaint || 'N/A'}</div>
//                     <div><strong>{t('label.allergies')}:</strong> {record.allergies || 'N/A'}</div>
//                     <div><strong>{t('label.medications')}:</strong> {record.medications || 'N/A'}</div>
//                     <div><strong>{t('label.doctorNotes')}:</strong> {record.doctorNotes || 'N/A'}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // ==================== MAIN RENDER ====================
//   return (
//     <div className={`doctor-search-patient ${isRTL ? 'rtl' : ''}`}>
//       {/* Header with Close Button */}
//       <div className="search-header">
//         <h1>🔍 {t('title.searchPatients')}</h1>
//         <div className="header-actions">
//           <div className={`status-badge ${status.type}`}>
//             ● {status.text}
//           </div>
//           <button 
//             className="btn-close-header"
//             onClick={onClose}
//             title={t('btn.close')}
//           >
//             ✖ {t('btn.close')}
//           </button>
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="search-section">
//         <div className="search-controls">
//           <select 
//             value={searchBy}
//             onChange={(e) => {
//               setSearchBy(e.target.value);
//               setSearchValue('');
//             }}
//             className="search-select"
//           >
//             <option value={SEARCH_NAME}>{t('search.name')}</option>
//             <option value={SEARCH_MOBILE}>{t('search.mobile')}</option>
//           </select>
          
//           <input
//             type="text"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             placeholder={searchBy === SEARCH_MOBILE ? t('prompt.mobile') : t('prompt.name')}
//             onKeyPress={(e) => e.key === 'Enter' && performSearch()}
//             className="search-input"
//           />
          
//           <button 
//             onClick={performSearch}
//             disabled={searchValue.length < 2 || loading}
//             className="btn-search"
//           >
//             {loading ? '⏳' : '🔍'} {t('btn.search')}
//           </button>
          
//           <button 
//             onClick={clearSearch}
//             className="btn-clear"
//           >
//             🗑️ {t('btn.clear')}
//           </button>
          
//           {loading && <div className="loading-spinner-small"></div>}
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="table-section">
//         <div className="table-header">
//           <h2>📋 {t('table.title')}</h2>
//           <span className="total-results">👤 {t('status.totalPatients')}: {totalResults}</span>
//         </div>
        
//         <div className="table-container">
//           <table className="patients-table">
//             <thead>
//               <tr>
//                 <th>{t('table.id')}</th>
//                 <th>{t('table.firstName')}</th>
//                 <th>{t('table.middleName')}</th>
//                 <th>{t('table.lastName')}</th>
//                 <th>{t('table.type')}</th>
//                 <th>{t('table.phone')}</th>
//                 <th>{t('table.address')}</th>
//                 <th>{t('table.gender')}</th>
//                 <th>{t('table.dob')}</th>
//                 <th>{t('table.age')}</th>
//                 <th>{t('table.status')}</th>
//                 <th>{t('table.actions')}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.length === 0 ? (
//                 <tr>
//                   <td colSpan="12" className="empty-state">
//                     📭 {t('status.noVisits')}
//                   </td>
//                 </tr>
//               ) : (
//                 patients.map((patient) => (
//                   <PatientRow
//                     key={patient.id}
//                     patient={patient}
//                     isSelected={selectedPatient?.id === patient.id}
//                     onSelect={setSelectedPatient}
//                     onHistory={loadPatientHistoryForRow}
//                   />
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         {/* ==================== PAGINATION ==================== */}
//         {renderPagination()}
//       </div>

//       {/* Modals */}
//       <VisitDetailsModal />
//       <HistoryModal />
//     </div>
//   );
// };

// export default DoctorSearchPatientScreen;   09072026  11:00 


// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorSearchPatientScreen.css';

// // ==================== CONSTANTS ====================
// const SEARCH_NAME = 'NAME';
// const SEARCH_MOBILE = 'MOBILE';
// const PAGE_SIZE = 10;

// // ==================== LOCALIZATION ====================
// const EN_BUNDLE = {
//   'title.searchPatients': 'Search Patients',
//   'title.visits': 'Patient Visits',
//   'title.visitDetails': 'Visit Details',
//   'search.name': 'Name',
//   'search.mobile': 'Mobile',
//   'prompt.name': 'Enter patient name...',
//   'prompt.mobile': 'Enter mobile number...',
//   'btn.search': 'Search',
//   'btn.clear': 'Clear',
//   'btn.close': 'Close',
//   'btn.patientHistory': 'Patient History',
//   'btn.viewDetails': 'View Details',
//   'btn.exportPDF': 'Export PDF',
//   'btn.savePDF': 'Save PDF',
//   'btn.history': 'History',
//   'status.ready': 'Ready',
//   'status.searching': 'Searching...',
//   'status.found': 'Found',
//   'status.patients': 'patients',
//   'status.totalPatients': 'Total Patients',
//   'status.error': 'Error',
//   'status.cleared': 'Cleared',
//   'status.loadingVisits': 'Loading visits...',
//   'status.visitsLoaded': 'Visits loaded',
//   'status.loadingHistory': 'Loading history...',
//   'status.historyLoaded': 'History loaded',
//   'status.noVisits': 'No visits found',
//   'status.noDrugs': 'No drugs prescribed',
//   'status.temp': 'Temporary',
//   'status.permanent': 'Permanent',
//   'patient.temp': 'Temp',
//   'patient.permanent': 'Permanent',
//   'table.title': 'Patient List',
//   'table.id': 'ID',
//   'table.firstName': 'First Name',
//   'table.middleName': 'Middle Name',
//   'table.lastName': 'Last Name',
//   'table.phone': 'Phone',
//   'table.type': 'Type',
//   'table.address': 'Address',
//   'table.gender': 'Gender',
//   'table.dob': 'Date of Birth',
//   'table.age': 'Age',
//   'table.status': 'Status',
//   'table.actions': 'Actions',
//   'label.visitId': 'Visit ID',
//   'label.visitType': 'Visit Type',
//   'label.visitStatus': 'Visit Status',
//   'label.checkInTime': 'Check-in Time',
//   'label.consultationStart': 'Consultation Start',
//   'label.consultationEnd': 'Consultation End',
//   'label.chiefComplaint': 'Chief Complaint',
//   'label.history': 'History',
//   'label.medications': 'Medications',
//   'label.allergies': 'Allergies',
//   'label.doctorNotes': 'Doctor Notes',
//   'label.prescribedDrugs': 'Prescribed Drugs',
//   'label.drugName': 'Drug Name',
//   'label.strength': 'Strength',
//   'label.route': 'Route',
//   'label.date': 'Date',
//   'label.doctor': 'Doctor',
//   'info.patientHistoryReport': 'Patient History Report - {0}',
//   'info.noHistory': 'No history found for this patient',
//   'info.pdfSaved': 'PDF saved successfully at: {0}',
//   'error.searchFailed': 'Search failed: {0}',
//   'error.loadVisits': 'Failed to load visits: {0}',
//   'error.loadHistory': 'Failed to load history: {0}',
//   'error.pdfExport': 'PDF export failed: {0}',
//   'msg.enterValue': 'Please enter at least 2 characters',
//   'alert.information': 'Information',
//   'alert.warning': 'Warning',
//   'alert.error': 'Error',
//   'pagination.prev': 'Previous',
//   'pagination.next': 'Next',
//   'pagination.page': 'Page',
//   'pagination.of': 'of'
// };

// const AR_BUNDLE = {
//   'title.searchPatients': 'بحث عن المرضى',
//   'title.visits': 'زيارات المريض',
//   'title.visitDetails': 'تفاصيل الزيارة',
//   'search.name': 'الاسم',
//   'search.mobile': 'الجوال',
//   'prompt.name': 'أدخل اسم المريض...',
//   'prompt.mobile': 'أدخل رقم الجوال...',
//   'btn.search': 'بحث',
//   'btn.clear': 'مسح',
//   'btn.close': 'إغلاق',
//   'btn.patientHistory': 'تاريخ المريض',
//   'btn.viewDetails': 'عرض التفاصيل',
//   'btn.exportPDF': 'تصدير PDF',
//   'btn.savePDF': 'حفظ PDF',
//   'btn.history': 'التاريخ',
//   'status.ready': 'جاهز',
//   'status.searching': 'جاري البحث...',
//   'status.found': 'تم العثور على',
//   'status.patients': 'مريض',
//   'status.totalPatients': 'إجمالي المرضى',
//   'status.error': 'خطأ',
//   'status.cleared': 'تم المسح',
//   'status.loadingVisits': 'جاري تحميل الزيارات...',
//   'status.visitsLoaded': 'تم تحميل الزيارات',
//   'status.loadingHistory': 'جاري تحميل التاريخ...',
//   'status.historyLoaded': 'تم تحميل التاريخ',
//   'status.noVisits': 'لا توجد زيارات',
//   'status.noDrugs': 'لا توجد أدوية موصوفة',
//   'status.temp': 'مؤقت',
//   'status.permanent': 'دائم',
//   'patient.temp': 'مؤقت',
//   'patient.permanent': 'دائم',
//   'table.title': 'قائمة المرضى',
//   'table.id': 'المعرف',
//   'table.firstName': 'الاسم الأول',
//   'table.middleName': 'الاسم الأوسط',
//   'table.lastName': 'الاسم الأخير',
//   'table.phone': 'الهاتف',
//   'table.type': 'النوع',
//   'table.address': 'العنوان',
//   'table.gender': 'الجنس',
//   'table.dob': 'تاريخ الميلاد',
//   'table.age': 'العمر',
//   'table.status': 'الحالة',
//   'table.actions': 'الإجراءات',
//   'label.visitId': 'معرف الزيارة',
//   'label.visitType': 'نوع الزيارة',
//   'label.visitStatus': 'حالة الزيارة',
//   'label.checkInTime': 'وقت تسجيل الدخول',
//   'label.consultationStart': 'بداية الاستشارة',
//   'label.consultationEnd': 'نهاية الاستشارة',
//   'label.chiefComplaint': 'الشكوى الرئيسية',
//   'label.history': 'التاريخ الطبي',
//   'label.medications': 'الأدوية',
//   'label.allergies': 'الحساسية',
//   'label.doctorNotes': 'ملاحظات الطبيب',
//   'label.prescribedDrugs': 'الأدوية الموصوفة',
//   'label.drugName': 'اسم الدواء',
//   'label.strength': 'التركيز',
//   'label.route': 'طريقة الاستخدام',
//   'label.date': 'التاريخ',
//   'label.doctor': 'الطبيب',
//   'info.patientHistoryReport': 'تقرير تاريخ المريض - {0}',
//   'info.noHistory': 'لا يوجد تاريخ لهذا المريض',
//   'info.pdfSaved': 'تم حفظ PDF بنجاح في: {0}',
//   'error.searchFailed': 'فشل البحث: {0}',
//   'error.loadVisits': 'فشل تحميل الزيارات: {0}',
//   'error.loadHistory': 'فشل تحميل التاريخ: {0}',
//   'error.pdfExport': 'فشل تصدير PDF: {0}',
//   'msg.enterValue': 'الرجاء إدخال حرفين على الأقل',
//   'alert.information': 'معلومات',
//   'alert.warning': 'تحذير',
//   'alert.error': 'خطأ',
//   'pagination.prev': 'السابق',
//   'pagination.next': 'التالي',
//   'pagination.page': 'صفحة',
//   'pagination.of': 'من'
// };

// const DoctorSearchPatientScreen = ({ loggedUser, language: propLanguage, onClose }) => {
//   // ==================== GET LANGUAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = sessionStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== STATE ====================
//   const [locale, setLocale] = useState(getLanguage());
//   const [searchBy, setSearchBy] = useState(SEARCH_NAME);
//   const [searchValue, setSearchValue] = useState('');
//   const [allPatients, setAllPatients] = useState([]);
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState({ text: 'Ready', type: 'success' });
//   const [totalResults, setTotalResults] = useState(0);
//   const [showVisitsModal, setShowVisitsModal] = useState(false);
//   const [visits, setVisits] = useState([]);
//   const [showHistoryModal, setShowHistoryModal] = useState(false);
//   const [historyData, setHistoryData] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedVisitDetails, setSelectedVisitDetails] = useState(null);
//   const [drugs, setDrugs] = useState([]);
//   const [historyLoadingPatientId, setHistoryLoadingPatientId] = useState(null);
  
//   // ==================== PAGINATION STATE ====================
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   const isRTL = locale === 'ar';

//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== PAGINATION FUNCTIONS ====================
//   const goToPage = useCallback((page) => {
//     if (page < 0 || page >= totalPages) return;
//     setCurrentPage(page);
    
//     const start = page * PAGE_SIZE;
//     const end = Math.min(start + PAGE_SIZE, allPatients.length);
//     setPatients(allPatients.slice(start, end));
//   }, [allPatients, totalPages]);

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const pages = [];
//     const maxVisible = 7;
//     let startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
//     let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);
    
//     if (endPage - startPage < maxVisible - 1) {
//       startPage = Math.max(0, endPage - maxVisible + 1);
//     }

//     return (
//       <div className="pagination-container">
//         <button 
//           className="pagination-btn"
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage === 0}
//         >
//           ◀ {t('pagination.prev')}
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-btn" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
//           <button
//             key={page}
//             className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(page)}
//           >
//             {page + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-btn" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-btn"
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage >= totalPages - 1}
//         >
//           {t('pagination.next')} ▶
//         </button>
        
//         <span className="pagination-info">
//           {t('pagination.page')} {currentPage + 1} {t('pagination.of')} {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== SEARCH FUNCTIONS ====================
//   const performSearch = useCallback(async () => {
//     if (searchValue.length < 2) {
//       alert(t('msg.enterValue'));
//       return;
//     }

//     setLoading(true);
//     setStatus({ text: t('status.searching'), type: 'loading' });

//     try {
//       let endpoint;
//       if (searchBy === SEARCH_MOBILE) {
//         endpoint = `/api/patients/search/mobile/${encodeURIComponent(searchValue)}`;
//       } else {
//         endpoint = `/api/patients/search/name/${encodeURIComponent(searchValue)}`;
//       }

//       const data = await apiFetch(endpoint);
//       const patientList = Array.isArray(data) ? data : [];
      
//       const transformed = patientList.map(p => ({
//         id: p.id,
//         firstName: p.firstName || '',
//         middleName: p.middleName || '',
//         lastName: p.lastName || '',
//         phone: p.phone || '',
//         address: p.address || '',
//         gender: p.gender || '',
//         dateOfBirth: p.dateOfBirth || null,
//         tempPatient: p.temp || false
//       }));

//       setAllPatients(transformed);
//       setTotalResults(transformed.length);
      
//       // Calculate pagination
//       const total = Math.ceil(transformed.length / PAGE_SIZE);
//       setTotalPages(total);
//       setCurrentPage(0);
      
//       // Set first page
//       setPatients(transformed.slice(0, PAGE_SIZE));
      
//       setStatus({ 
//         text: `${t('status.found')} ${transformed.length} ${t('status.patients')}`, 
//         type: 'success' 
//       });
//     } catch (error) {
//       setStatus({ text: t('status.error'), type: 'error' });
//       alert(t('error.searchFailed').replace('{0}', error.message));
//     } finally {
//       setLoading(false);
//     }
//   }, [searchValue, searchBy, apiFetch, t]);

//   const clearSearch = useCallback(() => {
//     setSearchValue('');
//     setAllPatients([]);
//     setPatients([]);
//     setTotalResults(0);
//     setSelectedPatient(null);
//     setCurrentPage(0);
//     setTotalPages(0);
//     setStatus({ text: t('status.cleared'), type: 'info' });
//   }, [t]);

//   // ==================== HISTORY FUNCTIONS ====================
//  const loadPatientHistoryForRow = useCallback(async (patient) => {
//     setHistoryLoadingPatientId(patient.id);
//     setStatus({ text: t('status.loadingHistory'), type: 'loading' });

//     try {
//       const endpoint = `/api/patient/history/patient/${patient.id}`;
//       const data = await apiFetch(endpoint);
      
//       setSelectedPatient(patient);
//       // Handle null/empty response
//       setHistoryData(data || []);
//       setShowHistoryModal(true);
//       setStatus({ text: t('status.historyLoaded'), type: 'success' });
//     } catch (error) {
//       // If it's a 204, it might not actually be an error
//       if (error.message === '204' || error.message.includes('204')) {
//         setSelectedPatient(patient);
//         setHistoryData([]);
//         setShowHistoryModal(true);
//         setStatus({ text: t('status.historyLoaded'), type: 'success' });
//       } else {
//         alert(t('error.loadHistory').replace('{0}', error.message));
//         setStatus({ text: t('status.error'), type: 'error' });
//       }
//     } finally {
//       setHistoryLoadingPatientId(null);
//       setLoading(false);
//     }
//   }, [apiFetch, t]);
//   const loadPatientHistory = useCallback(async () => {
//     if (!selectedPatient) return;

//     setLoading(true);
//     setStatus({ text: t('status.loadingHistory'), type: 'loading' });

//     try {
//       const endpoint = `/api/patient/history/patient/${selectedPatient.id}`;
//       const data = await apiFetch(endpoint);
      
//       setHistoryData(data);
//       setShowHistoryModal(true);
//       setStatus({ text: t('status.historyLoaded'), type: 'success' });
//     } catch (error) {
//       alert(t('error.loadHistory').replace('{0}', error.message));
//       setStatus({ text: t('status.error'), type: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedPatient, apiFetch, t]);

//   // ==================== VISIT DETAILS ====================
//   const showVisitDetails = useCallback(async (visit) => {
//     setSelectedVisitDetails(visit);
    
//     try {
//       const drugsData = await apiFetch(`/api/visits/${visit.id}/drugs`);
//       setDrugs(Array.isArray(drugsData) ? drugsData : []);
//     } catch (error) {
//       console.error('Failed to load drugs:', error);
//       setDrugs([]);
//     }
    
//     setShowDetailsModal(true);
//   }, [apiFetch]);

//   // ==================== FORMAT HELPERS ====================
//   const formatDate = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleString(isRTL ? 'ar' : 'en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return iso;
//     }
//   }, [isRTL]);

//   const formatDateShort = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleDateString(isRTL ? 'ar' : 'en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric'
//       });
//     } catch {
//       return iso;
//     }
//   }, [isRTL]);

//   const calculateAge = useCallback((dob) => {
//     if (!dob) return '-';
//     try {
//       const birth = new Date(dob);
//       const today = new Date();
//       let age = today.getFullYear() - birth.getFullYear();
//       const m = today.getMonth() - birth.getMonth();
//       if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//         age--;
//       }
//       return age;
//     } catch {
//       return '-';
//     }
//   }, []);

//   const getStatusColor = useCallback((status) => {
//     switch (status?.toUpperCase()) {
//       case 'COMPLETED': return '#27ae60';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CANCELLED': return '#e74c3c';
//       default: return '#3498db';
//     }
//   }, []);

//   // ==================== RENDER COMPONENTS ====================
  
//   // Status Badge Component
//   const StatusBadge = ({ status }) => {
//     const color = getStatusColor(status);
//     return (
//       <span className="status-badge" style={{ backgroundColor: color }}>
//         {status}
//       </span>
//     );
//   };

//   // Visit Card Component
//   const VisitCard = ({ visit, onViewDetails }) => {
//     const statusColor = getStatusColor(visit.visitStatus);
    
//     return (
//       <div className="visit-card">
//         <div className="visit-card-header">
//           <span className="visit-id">📋 {t('label.visitId')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <span className="status-badge" style={{ backgroundColor: statusColor }}>
//             {visit.visitStatus || 'N/A'}
//           </span>
//         </div>
//         <div className="visit-card-body">
//           <div className="visit-info">
//             <div className="visit-detail">
//               <strong>{t('label.visitType')}:</strong> {visit.visitType || 'N/A'}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.checkInTime')}:</strong> {formatDate(visit.checkInTime)}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.chiefComplaint')}:</strong> {visit.chiefComplaint || 'N/A'}
//             </div>
//             <div className="visit-detail">
//               <strong>{t('label.doctorNotes')}:</strong> {visit.doctorNotes || 'N/A'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-view-details"
//               onClick={() => onViewDetails(visit)}
//             >
//               👁️ {t('btn.viewDetails')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Patient Table Row Component - Updated with History button
//   const PatientRow = ({ patient, isSelected, onSelect, onHistory }) => {
//     const fullName = `${patient.firstName} ${patient.lastName}`;
//     const age = calculateAge(patient.dateOfBirth);
//     const isTemp = patient.tempPatient;
//     const genderIcon = patient.gender?.toUpperCase() === 'FEMALE' ? '♀️' : '♂️';
//     const isLoadingHistory = historyLoadingPatientId === patient.id;
    
//     return (
//       <tr 
//         className={`patient-row ${isSelected ? 'selected' : ''} ${isTemp ? 'temp' : ''}`}
//         onClick={() => onSelect(patient)}
//       >
//         <td>{patient.id}</td>
//         <td>{patient.firstName}</td>
//         <td>{patient.middleName}</td>
//         <td>{patient.lastName}</td>
//         <td>
//           <span className={`patient-type-badge ${isTemp ? 'temp' : 'permanent'}`}>
//             {isTemp ? '🟡 ' + t('patient.temp') : '🟢 ' + t('patient.permanent')}
//           </span>
//         </td>
//         <td>{patient.phone}</td>
//         <td>{patient.address}</td>
//         <td>{genderIcon} {patient.gender}</td>
//         <td>{formatDateShort(patient.dateOfBirth)}</td>
//         <td>{age}</td>
//         <td>
//           <span className={`status-badge ${isTemp ? 'temp' : 'permanent'}`}>
//             {isTemp ? t('status.temp') : t('status.permanent')}
//           </span>
//         </td>
//         <td>
//           <button
//             className="btn-row-history"
//             onClick={(e) => {
//               e.stopPropagation();
//               onHistory(patient);
//             }}
//             disabled={isLoadingHistory}
//             title={t('btn.history')}
//           >
//             {isLoadingHistory ? '⏳' : '📊'} {t('btn.history')}
//           </button>
//         </td>
//       </tr>
//     );
//   };

//   // ==================== MODALS ====================
  
//   // Visit Details Modal
//   const VisitDetailsModal = () => {
//     if (!showDetailsModal || !selectedVisitDetails) return null;
    
//     const visit = selectedVisitDetails;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowDetailsModal(false)}>✖</button>
//           <h2>{t('title.visitDetails')} #{visit.id}</h2>
          
//           <div className="details-grid">
//             <div className="detail-row">
//               <span className="detail-label">{t('label.visitStatus')}:</span>
//               <span className="detail-value">
//                 <StatusBadge status={visit.visitStatus} />
//               </span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.visitType')}:</span>
//               <span className="detail-value">{visit.visitType || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.checkInTime')}:</span>
//               <span className="detail-value">{formatDate(visit.checkInTime)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.consultationStart')}:</span>
//               <span className="detail-value">{formatDate(visit.consultationStart)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.consultationEnd')}:</span>
//               <span className="detail-value">{formatDate(visit.consultationEnd)}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.chiefComplaint')}:</span>
//               <span className="detail-value">{visit.chiefComplaint || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.history')}:</span>
//               <span className="detail-value">{visit.history || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.medications')}:</span>
//               <span className="detail-value">{visit.medications || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.allergies')}:</span>
//               <span className="detail-value">{visit.allergies || 'N/A'}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">{t('label.doctorNotes')}:</span>
//               <span className="detail-value">{visit.doctorNotes || 'N/A'}</span>
//             </div>
//           </div>
          
//           <h3>{t('label.prescribedDrugs')}</h3>
//           {drugs.length === 0 ? (
//             <div className="empty-state small">{t('status.noDrugs')}</div>
//           ) : (
//             <div className="drugs-list">
//               {drugs.map((drug, index) => (
//                 <div key={index} className="drug-item">
//                   <span className="drug-name">💊 {drug.tradeName || 'Unknown'}</span>
//                   <span className="drug-strength">💪 {drug.strength || 'N/A'}</span>
//                   <span className="drug-route">📌 {drug.routeOfAdmin || 'N/A'}</span>
//                   <span className="drug-form">📦 {drug.dosageForm || 'N/A'}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // History Modal
//   const HistoryModal = () => {
//     if (!showHistoryModal || !historyData) return null;
    
//     const history = Array.isArray(historyData) ? historyData : [];
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
//         <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowHistoryModal(false)}>✖</button>
//           <h2>{t('info.patientHistoryReport').replace('{0}', selectedPatient?.firstName || '')}</h2>
          
//           {history.length === 0 ? (
//             <div className="empty-state">{t('info.noHistory')}</div>
//           ) : (
//             <div className="history-list">
//               {history.map((record, index) => (
//                 <div key={index} className="history-record">
//                   <div className="history-header">
//                     <strong>{t('label.visitId')}: {record.id}</strong>
//                     <span className="history-date">{formatDate(record.checkInTime)}</span>
//                   </div>
//                   <div className="history-body">
//                     <div><strong>{t('label.doctor')}:</strong> {record.doctorName || 'N/A'}</div>
//                     <div><strong>{t('label.visitType')}:</strong> {record.visitType || 'N/A'}</div>
//                     <div><strong>{t('label.visitStatus')}:</strong> {record.visitStatus || 'N/A'}</div>
//                     <div><strong>{t('label.chiefComplaint')}:</strong> {record.chiefComplaint || 'N/A'}</div>
//                     <div><strong>{t('label.allergies')}:</strong> {record.allergies || 'N/A'}</div>
//                     <div><strong>{t('label.medications')}:</strong> {record.medications || 'N/A'}</div>
//                     <div><strong>{t('label.doctorNotes')}:</strong> {record.doctorNotes || 'N/A'}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // ==================== MAIN RENDER ====================
//   return (
//     <div className={`doctor-search-patient ${isRTL ? 'rtl' : ''}`}>
//       {/* Header with Close Button */}
//       <div className="search-header">
//         <h1>🔍 {t('title.searchPatients')}</h1>
//         <div className="header-actions">
//           <div className={`status-badge ${status.type}`}>
//             ● {status.text}
//           </div>
//           <button 
//             className="btn-close-header"
//             onClick={onClose}
//             title={t('btn.close')}
//           >
//             ✖ {t('btn.close')}
//           </button>
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="search-section">
//         <div className="search-controls">
//           <select 
//             value={searchBy}
//             onChange={(e) => {
//               setSearchBy(e.target.value);
//               setSearchValue('');
//             }}
//             className="search-select"
//           >
//             <option value={SEARCH_NAME}>{t('search.name')}</option>
//             <option value={SEARCH_MOBILE}>{t('search.mobile')}</option>
//           </select>
          
//           <input
//             type="text"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//             placeholder={searchBy === SEARCH_MOBILE ? t('prompt.mobile') : t('prompt.name')}
//             onKeyPress={(e) => e.key === 'Enter' && performSearch()}
//             className="search-input"
//           />
          
//           <button 
//             onClick={performSearch}
//             disabled={searchValue.length < 2 || loading}
//             className="btn-search"
//           >
//             {loading ? '⏳' : '🔍'} {t('btn.search')}
//           </button>
          
//           <button 
//             onClick={clearSearch}
//             className="btn-clear"
//           >
//             🗑️ {t('btn.clear')}
//           </button>
          
//           {loading && <div className="loading-spinner-small"></div>}
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="table-section">
//         <div className="table-header">
//           <h2>📋 {t('table.title')}</h2>
//           <span className="total-results">👤 {t('status.totalPatients')}: {totalResults}</span>
//         </div>
        
//         <div className="table-container">
//           <table className="patients-table">
//             <thead>
//               <tr>
//                 <th>{t('table.id')}</th>
//                 <th>{t('table.firstName')}</th>
//                 <th>{t('table.middleName')}</th>
//                 <th>{t('table.lastName')}</th>
//                 <th>{t('table.type')}</th>
//                 <th>{t('table.phone')}</th>
//                 <th>{t('table.address')}</th>
//                 <th>{t('table.gender')}</th>
//                 <th>{t('table.dob')}</th>
//                 <th>{t('table.age')}</th>
//                 <th>{t('table.status')}</th>
//                 <th>{t('table.actions')}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.length === 0 ? (
//                 <tr>
//                   <td colSpan="12" className="empty-state">
//                     📭 {t('status.noVisits')}
//                   </td>
//                 </tr>
//               ) : (
//                 patients.map((patient) => (
//                   <PatientRow
//                     key={patient.id}
//                     patient={patient}
//                     isSelected={selectedPatient?.id === patient.id}
//                     onSelect={setSelectedPatient}
//                     onHistory={loadPatientHistoryForRow}
//                   />
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         {/* ==================== PAGINATION ==================== */}
//         {renderPagination()}
//       </div>

//       {/* Modals */}
//       <VisitDetailsModal />
//       <HistoryModal />
//     </div>
//   );
// };

// export default DoctorSearchPatientScreen;  11072026 11:20 pm


import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../../utils/api';

// ==================== CONSTANTS ====================
const SEARCH_NAME = 'NAME';
const SEARCH_MOBILE = 'MOBILE';
const PAGE_SIZE = 10;

// ==================== LOCALIZATION ====================
const EN_BUNDLE = {
  'title.searchPatients': 'Search Patients',
  'title.visits': 'Patient Visits',
  'title.visitDetails': 'Visit Details',
  'search.name': 'Name',
  'search.mobile': 'Mobile',
  'prompt.name': 'Enter patient name...',
  'prompt.mobile': 'Enter mobile number...',
  'btn.search': 'Search',
  'btn.clear': 'Clear',
  'btn.close': 'Close',
  'btn.patientHistory': 'Patient History',
  'btn.viewDetails': 'View Details',
  'btn.exportPDF': 'Export PDF',
  'btn.savePDF': 'Save PDF',
  'btn.history': 'History',
  'status.ready': 'Ready',
  'status.searching': 'Searching...',
  'status.found': 'Found',
  'status.patients': 'patients',
  'status.totalPatients': 'Total Patients',
  'status.error': 'Error',
  'status.cleared': 'Cleared',
  'status.loadingVisits': 'Loading visits...',
  'status.visitsLoaded': 'Visits loaded',
  'status.loadingHistory': 'Loading history...',
  'status.historyLoaded': 'History loaded',
  'status.noVisits': 'No visits found',
  'status.noDrugs': 'No drugs prescribed',
  'status.temp': 'Temporary',
  'status.permanent': 'Permanent',
  'patient.temp': 'Temp',
  'patient.permanent': 'Permanent',
  'table.title': 'Patient List',
  'table.id': 'ID',
  'table.firstName': 'First Name',
  'table.middleName': 'Middle Name',
  'table.lastName': 'Last Name',
  'table.phone': 'Phone',
  'table.type': 'Type',
  'table.address': 'Address',
  'table.gender': 'Gender',
  'table.dob': 'Date of Birth',
  'table.age': 'Age',
  'table.status': 'Status',
  'table.actions': 'Actions',
  'label.visitId': 'Visit ID',
  'label.visitType': 'Visit Type',
  'label.visitStatus': 'Visit Status',
  'label.checkInTime': 'Check-in Time',
  'label.consultationStart': 'Consultation Start',
  'label.consultationEnd': 'Consultation End',
  'label.chiefComplaint': 'Chief Complaint',
  'label.history': 'History',
  'label.medications': 'Medications',
  'label.allergies': 'Allergies',
  'label.doctorNotes': 'Doctor Notes',
  'label.prescribedDrugs': 'Prescribed Drugs',
  'label.drugName': 'Drug Name',
  'label.strength': 'Strength',
  'label.route': 'Route',
  'label.date': 'Date',
  'label.doctor': 'Doctor',
  'info.patientHistoryReport': 'Patient History Report - {0}',
  'info.noHistory': 'No history found for this patient',
  'info.pdfSaved': 'PDF saved successfully at: {0}',
  'error.searchFailed': 'Search failed: {0}',
  'error.loadVisits': 'Failed to load visits: {0}',
  'error.loadHistory': 'Failed to load history: {0}',
  'error.pdfExport': 'PDF export failed: {0}',
  'msg.enterValue': 'Please enter at least 2 characters',
  'alert.information': 'Information',
  'alert.warning': 'Warning',
  'alert.error': 'Error',
  'pagination.prev': 'Previous',
  'pagination.next': 'Next',
  'pagination.page': 'Page',
  'pagination.of': 'of'
};

const AR_BUNDLE = {
  'title.searchPatients': 'بحث عن المرضى',
  'title.visits': 'زيارات المريض',
  'title.visitDetails': 'تفاصيل الزيارة',
  'search.name': 'الاسم',
  'search.mobile': 'الجوال',
  'prompt.name': 'أدخل اسم المريض...',
  'prompt.mobile': 'أدخل رقم الجوال...',
  'btn.search': 'بحث',
  'btn.clear': 'مسح',
  'btn.close': 'إغلاق',
  'btn.patientHistory': 'تاريخ المريض',
  'btn.viewDetails': 'عرض التفاصيل',
  'btn.exportPDF': 'تصدير PDF',
  'btn.savePDF': 'حفظ PDF',
  'btn.history': 'التاريخ',
  'status.ready': 'جاهز',
  'status.searching': 'جاري البحث...',
  'status.found': 'تم العثور على',
  'status.patients': 'مريض',
  'status.totalPatients': 'إجمالي المرضى',
  'status.error': 'خطأ',
  'status.cleared': 'تم المسح',
  'status.loadingVisits': 'جاري تحميل الزيارات...',
  'status.visitsLoaded': 'تم تحميل الزيارات',
  'status.loadingHistory': 'جاري تحميل التاريخ...',
  'status.historyLoaded': 'تم تحميل التاريخ',
  'status.noVisits': 'لا توجد زيارات',
  'status.noDrugs': 'لا توجد أدوية موصوفة',
  'status.temp': 'مؤقت',
  'status.permanent': 'دائم',
  'patient.temp': 'مؤقت',
  'patient.permanent': 'دائم',
  'table.title': 'قائمة المرضى',
  'table.id': 'المعرف',
  'table.firstName': 'الاسم الأول',
  'table.middleName': 'الاسم الأوسط',
  'table.lastName': 'الاسم الأخير',
  'table.phone': 'الهاتف',
  'table.type': 'النوع',
  'table.address': 'العنوان',
  'table.gender': 'الجنس',
  'table.dob': 'تاريخ الميلاد',
  'table.age': 'العمر',
  'table.status': 'الحالة',
  'table.actions': 'الإجراءات',
  'label.visitId': 'معرف الزيارة',
  'label.visitType': 'نوع الزيارة',
  'label.visitStatus': 'حالة الزيارة',
  'label.checkInTime': 'وقت تسجيل الدخول',
  'label.consultationStart': 'بداية الاستشارة',
  'label.consultationEnd': 'نهاية الاستشارة',
  'label.chiefComplaint': 'الشكوى الرئيسية',
  'label.history': 'التاريخ الطبي',
  'label.medications': 'الأدوية',
  'label.allergies': 'الحساسية',
  'label.doctorNotes': 'ملاحظات الطبيب',
  'label.prescribedDrugs': 'الأدوية الموصوفة',
  'label.drugName': 'اسم الدواء',
  'label.strength': 'التركيز',
  'label.route': 'طريقة الاستخدام',
  'label.date': 'التاريخ',
  'label.doctor': 'الطبيب',
  'info.patientHistoryReport': 'تقرير تاريخ المريض - {0}',
  'info.noHistory': 'لا يوجد تاريخ لهذا المريض',
  'info.pdfSaved': 'تم حفظ PDF بنجاح في: {0}',
  'error.searchFailed': 'فشل البحث: {0}',
  'error.loadVisits': 'فشل تحميل الزيارات: {0}',
  'error.loadHistory': 'فشل تحميل التاريخ: {0}',
  'error.pdfExport': 'فشل تصدير PDF: {0}',
  'msg.enterValue': 'الرجاء إدخال حرفين على الأقل',
  'alert.information': 'معلومات',
  'alert.warning': 'تحذير',
  'alert.error': 'خطأ',
  'pagination.prev': 'السابق',
  'pagination.next': 'التالي',
  'pagination.page': 'صفحة',
  'pagination.of': 'من'
};

const DoctorSearchPatientScreen = ({ loggedUser, language: propLanguage, onClose }) => {
  // ==================== GET LANGUAGE ====================
  const getLanguage = () => {
    if (propLanguage) return propLanguage;
    const storedLang = sessionStorage.getItem('lang');
    if (storedLang) return storedLang;
    return 'en';
  };

  // ==================== STATE ====================
  const [locale, setLocale] = useState(getLanguage());
  const [searchBy, setSearchBy] = useState(SEARCH_NAME);
  const [searchValue, setSearchValue] = useState('');
  const [allPatients, setAllPatients] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ text: 'Ready', type: 'success' });
  const [totalResults, setTotalResults] = useState(0);
  const [showVisitsModal, setShowVisitsModal] = useState(false);
  const [visits, setVisits] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyData, setHistoryData] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedVisitDetails, setSelectedVisitDetails] = useState(null);
  const [drugs, setDrugs] = useState([]);
  const [historyLoadingPatientId, setHistoryLoadingPatientId] = useState(null);
  
  // ==================== PAGINATION STATE ====================
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const isRTL = locale === 'ar';

  // ==================== LOCALIZATION ====================
  const getBundle = useCallback(() => {
    return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
  }, [locale]);

  const t = useCallback((key) => {
    const bundle = getBundle();
    return bundle[key] || key;
  }, [getBundle]);

  // ==================== API HELPERS ====================
  const apiFetch = useCallback(async (endpoint, options = {}) => {
    const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${BASE_URL}${url}`;
    
    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });
      
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || `HTTP ${response.status}`);
      }
      
      return text ? JSON.parse(text) : null;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }, []);

  // ==================== PAGINATION FUNCTIONS ====================
  const goToPage = useCallback((page) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
    
    const start = page * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, allPatients.length);
    setPatients(allPatients.slice(start, end));
  }, [allPatients, totalPages]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 7;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(0, endPage - maxVisible + 1);
    }

    return (
      <div className="pagination-container">
        <button 
          className="pagination-btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          ◀ {t('pagination.prev')}
        </button>
        
        {startPage > 0 && (
          <>
            <button className="pagination-btn" onClick={() => goToPage(0)}>1</button>
            {startPage > 1 && <span className="pagination-ellipsis">...</span>}
          </>
        )}
        
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
          <button
            key={page}
            className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => goToPage(page)}
          >
            {page + 1}
          </button>
        ))}
        
        {endPage < totalPages - 1 && (
          <>
            {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
            <button className="pagination-btn" onClick={() => goToPage(totalPages - 1)}>
              {totalPages}
            </button>
          </>
        )}
        
        <button 
          className="pagination-btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          {t('pagination.next')} ▶
        </button>
        
        <span className="pagination-info">
          {t('pagination.page')} {currentPage + 1} {t('pagination.of')} {totalPages}
        </span>
      </div>
    );
  };

  // ==================== SEARCH FUNCTIONS ====================
  const performSearch = useCallback(async () => {
    if (searchValue.length < 2) {
      alert(t('msg.enterValue'));
      return;
    }

    setLoading(true);
    setStatus({ text: t('status.searching'), type: 'loading' });

    try {
      let endpoint;
      if (searchBy === SEARCH_MOBILE) {
        endpoint = `/api/patients/search/mobile/${encodeURIComponent(searchValue)}`;
      } else {
        endpoint = `/api/patients/search/name/${encodeURIComponent(searchValue)}`;
      }

      const data = await apiFetch(endpoint);
      const patientList = Array.isArray(data) ? data : [];
      
      const transformed = patientList.map(p => ({
        id: p.id,
        firstName: p.firstName || '',
        middleName: p.middleName || '',
        lastName: p.lastName || '',
        phone: p.phone || '',
        address: p.address || '',
        gender: p.gender || '',
        dateOfBirth: p.dateOfBirth || null,
        tempPatient: p.temp || false
      }));

      setAllPatients(transformed);
      setTotalResults(transformed.length);
      
      const total = Math.ceil(transformed.length / PAGE_SIZE);
      setTotalPages(total);
      setCurrentPage(0);
      
      setPatients(transformed.slice(0, PAGE_SIZE));
      
      setStatus({ 
        text: `${t('status.found')} ${transformed.length} ${t('status.patients')}`, 
        type: 'success' 
      });
    } catch (error) {
      setStatus({ text: t('status.error'), type: 'error' });
      alert(t('error.searchFailed').replace('{0}', error.message));
    } finally {
      setLoading(false);
    }
  }, [searchValue, searchBy, apiFetch, t]);

  const clearSearch = useCallback(() => {
    setSearchValue('');
    setAllPatients([]);
    setPatients([]);
    setTotalResults(0);
    setSelectedPatient(null);
    setCurrentPage(0);
    setTotalPages(0);
    setStatus({ text: t('status.cleared'), type: 'info' });
  }, [t]);

  // ==================== HISTORY FUNCTIONS ====================
  const loadPatientHistoryForRow = useCallback(async (patient) => {
    setHistoryLoadingPatientId(patient.id);
    setStatus({ text: t('status.loadingHistory'), type: 'loading' });

    try {
      const endpoint = `/api/patient/history/patient/${patient.id}`;
      const data = await apiFetch(endpoint);
      
      setSelectedPatient(patient);
      setHistoryData(data || []);
      setShowHistoryModal(true);
      setStatus({ text: t('status.historyLoaded'), type: 'success' });
    } catch (error) {
      if (error.message === '204' || error.message.includes('204')) {
        setSelectedPatient(patient);
        setHistoryData([]);
        setShowHistoryModal(true);
        setStatus({ text: t('status.historyLoaded'), type: 'success' });
      } else {
        alert(t('error.loadHistory').replace('{0}', error.message));
        setStatus({ text: t('status.error'), type: 'error' });
      }
    } finally {
      setHistoryLoadingPatientId(null);
      setLoading(false);
    }
  }, [apiFetch, t]);

  // ==================== VISIT DETAILS ====================
  const showVisitDetails = useCallback(async (visit) => {
    setSelectedVisitDetails(visit);
    
    try {
      const drugsData = await apiFetch(`/api/visits/${visit.id}/drugs`);
      setDrugs(Array.isArray(drugsData) ? drugsData : []);
    } catch (error) {
      console.error('Failed to load drugs:', error);
      setDrugs([]);
    }
    
    setShowDetailsModal(true);
  }, [apiFetch]);

  // ==================== FORMAT HELPERS ====================
  const formatDate = useCallback((iso) => {
    if (!iso) return '-';
    try {
      const date = new Date(iso);
      return date.toLocaleString(isRTL ? 'ar' : 'en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return iso;
    }
  }, [isRTL]);

  const formatDateShort = useCallback((iso) => {
    if (!iso) return '-';
    try {
      const date = new Date(iso);
      return date.toLocaleDateString(isRTL ? 'ar' : 'en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return iso;
    }
  }, [isRTL]);

  const calculateAge = useCallback((dob) => {
    if (!dob) return '-';
    try {
      const birth = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age;
    } catch {
      return '-';
    }
  }, []);

  const getStatusColor = useCallback((status) => {
    switch (status?.toUpperCase()) {
      case 'COMPLETED': return '#27ae60';
      case 'IN_PROGRESS': return '#f39c12';
      case 'CANCELLED': return '#e74c3c';
      default: return '#3498db';
    }
  }, []);

  // ==================== RENDER COMPONENTS ====================
  
  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const color = getStatusColor(status);
    return (
      <span className="status-badge" style={{ backgroundColor: color }}>
        {status}
      </span>
    );
  };

  // Visit Card Component
  const VisitCard = ({ visit, onViewDetails }) => {
    const statusColor = getStatusColor(visit.visitStatus);
    
    return (
      <div className="visit-card">
        <div className="visit-card-header">
          <span className="visit-id">📋 {t('label.visitId')}: {visit.id}</span>
          <span className="visit-header-spacer" />
          <span className="status-badge" style={{ backgroundColor: statusColor }}>
            {visit.visitStatus || 'N/A'}
          </span>
        </div>
        <div className="visit-card-body">
          <div className="visit-info">
            <div className="visit-detail">
              <strong>{t('label.visitType')}:</strong> {visit.visitType || 'N/A'}
            </div>
            <div className="visit-detail">
              <strong>{t('label.checkInTime')}:</strong> {formatDate(visit.checkInTime)}
            </div>
            <div className="visit-detail">
              <strong>{t('label.chiefComplaint')}:</strong> {visit.chiefComplaint || 'N/A'}
            </div>
            <div className="visit-detail">
              <strong>{t('label.doctorNotes')}:</strong> {visit.doctorNotes || 'N/A'}
            </div>
          </div>
          <div className="visit-actions">
            <button 
              className="btn-view-details"
              onClick={() => onViewDetails(visit)}
            >
              👁️ {t('btn.viewDetails')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Patient Table Row Component
  const PatientRow = ({ patient, isSelected, onSelect, onHistory }) => {
    const fullName = `${patient.firstName} ${patient.lastName}`;
    const age = calculateAge(patient.dateOfBirth);
    const isTemp = patient.tempPatient;
    const genderIcon = patient.gender?.toUpperCase() === 'FEMALE' ? '♀️' : '♂️';
    const isLoadingHistory = historyLoadingPatientId === patient.id;
    
    return (
      <tr 
        className={`patient-row ${isSelected ? 'selected' : ''} ${isTemp ? 'temp' : ''}`}
        onClick={() => onSelect(patient)}
      >
        <td>{patient.id}</td>
        <td>{patient.firstName}</td>
        <td>{patient.middleName}</td>
        <td>{patient.lastName}</td>
        <td>
          <span className={`patient-type-badge ${isTemp ? 'temp' : 'permanent'}`}>
            {isTemp ? '🟡 ' + t('patient.temp') : '🟢 ' + t('patient.permanent')}
          </span>
        </td>
        <td>{patient.phone}</td>
        <td>{patient.address}</td>
        <td>{genderIcon} {patient.gender}</td>
        <td>{formatDateShort(patient.dateOfBirth)}</td>
        <td>{age}</td>
        <td>
          <span className={`status-badge ${isTemp ? 'temp' : 'permanent'}`}>
            {isTemp ? t('status.temp') : t('status.permanent')}
          </span>
        </td>
        <td>
          <button
            className="btn-row-history"
            onClick={(e) => {
              e.stopPropagation();
              onHistory(patient);
            }}
            disabled={isLoadingHistory}
            title={t('btn.history')}
          >
            {isLoadingHistory ? '⏳' : '📊'} {t('btn.history')}
          </button>
        </td>
      </tr>
    );
  };

  // ==================== MODALS ====================
  
  // Visit Details Modal
  const VisitDetailsModal = () => {
    if (!showDetailsModal || !selectedVisitDetails) return null;
    
    const visit = selectedVisitDetails;
    
    return (
      <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowDetailsModal(false)}>✖</button>
          <h2>{t('title.visitDetails')} #{visit.id}</h2>
          
          <div className="details-grid">
            <div className="detail-row">
              <span className="detail-label">{t('label.visitStatus')}:</span>
              <span className="detail-value">
                <StatusBadge status={visit.visitStatus} />
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('label.visitType')}:</span>
              <span className="detail-value">{visit.visitType || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('label.checkInTime')}:</span>
              <span className="detail-value">{formatDate(visit.checkInTime)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('label.consultationStart')}:</span>
              <span className="detail-value">{formatDate(visit.consultationStart)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('label.consultationEnd')}:</span>
              <span className="detail-value">{formatDate(visit.consultationEnd)}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('label.chiefComplaint')}:</span>
              <span className="detail-value">{visit.chiefComplaint || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('label.history')}:</span>
              <span className="detail-value">{visit.history || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('label.medications')}:</span>
              <span className="detail-value">{visit.medications || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('label.allergies')}:</span>
              <span className="detail-value">{visit.allergies || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">{t('label.doctorNotes')}:</span>
              <span className="detail-value">{visit.doctorNotes || 'N/A'}</span>
            </div>
          </div>
          
          <h3>{t('label.prescribedDrugs')}</h3>
          {drugs.length === 0 ? (
            <div className="empty-state small">{t('status.noDrugs')}</div>
          ) : (
            <div className="drugs-list">
              {drugs.map((drug, index) => (
                <div key={index} className="drug-item">
                  <span className="drug-name">💊 {drug.tradeName || 'Unknown'}</span>
                  <span className="drug-strength">💪 {drug.strength || 'N/A'}</span>
                  <span className="drug-route">📌 {drug.routeOfAdmin || 'N/A'}</span>
                  <span className="drug-form">📦 {drug.dosageForm || 'N/A'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // History Modal
  const HistoryModal = () => {
    if (!showHistoryModal || !historyData) return null;
    
    const history = Array.isArray(historyData) ? historyData : [];
    
    return (
      <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
        <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowHistoryModal(false)}>✖</button>
          <h2>{t('info.patientHistoryReport').replace('{0}', selectedPatient?.firstName || '')}</h2>
          
          {history.length === 0 ? (
            <div className="empty-state">{t('info.noHistory')}</div>
          ) : (
            <div className="history-list">
              {history.map((record, index) => (
                <div key={index} className="history-record">
                  <div className="history-header">
                    <strong>{t('label.visitId')}: {record.id}</strong>
                    <span className="history-date">{formatDate(record.checkInTime)}</span>
                  </div>
                  <div className="history-body">
                    <div><strong>{t('label.doctor')}:</strong> {record.doctorName || 'N/A'}</div>
                    <div><strong>{t('label.visitType')}:</strong> {record.visitType || 'N/A'}</div>
                    <div><strong>{t('label.visitStatus')}:</strong> {record.visitStatus || 'N/A'}</div>
                    <div><strong>{t('label.chiefComplaint')}:</strong> {record.chiefComplaint || 'N/A'}</div>
                    <div><strong>{t('label.allergies')}:</strong> {record.allergies || 'N/A'}</div>
                    <div><strong>{t('label.medications')}:</strong> {record.medications || 'N/A'}</div>
                    <div><strong>{t('label.doctorNotes')}:</strong> {record.doctorNotes || 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ==================== MAIN RENDER ====================
  return (
    <>
      <style>{`
        /* ==================== DOCTOR SEARCH PATIENT STYLES ==================== */
        .doctor-search-patient {
          padding: 20px;
          background: #f0f2f5;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Header */
        .search-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 15px 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          min-height: 70px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .search-header h1 {
          margin: 0;
          color: #2c3e50;
          font-size: 24px;
        }

        .status-badge {
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge.success {
          background: #e8f8f5;
          color: #27ae60;
        }

        .status-badge.error {
          background: #fdedec;
          color: #e74c3c;
        }

        .status-badge.loading {
          background: #fef9e7;
          color: #f39c12;
        }

        .status-badge.info {
          background: #eaf2f8;
          color: #3498db;
        }

        .btn-close-header {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          background: #e74c3c;
          color: white;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 38px;
        }

        .btn-close-header:hover {
          background: #c0392b;
          transform: scale(1.05);
        }

        .btn-close-header:active {
          transform: scale(0.95);
        }

        /* Search Section */
        .search-section {
          background: white;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .search-controls {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-select {
          padding: 8px 12px;
          border-radius: 5px;
          border: 1px solid #dce4ec;
          font-size: 14px;
          background: white;
          min-width: 120px;
          min-height: 38px;
        }

        .search-input {
          flex: 1;
          padding: 8px 12px;
          border-radius: 5px;
          border: 1px solid #dce4ec;
          font-size: 14px;
          min-width: 200px;
          min-height: 38px;
        }

        .search-input:focus {
          outline: none;
          border-color: #3498db;
        }

        .btn-search {
          padding: 8px 20px;
          border: none;
          border-radius: 5px;
          background: #3498db;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 38px;
        }

        .btn-search:hover:not(:disabled) {
          background: #2980b9;
          transform: scale(1.02);
        }

        .btn-search:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-clear {
          padding: 8px 20px;
          border: none;
          border-radius: 5px;
          background: #95a5a6;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 38px;
        }

        .btn-clear:hover {
          background: #7f8c8d;
          transform: scale(1.02);
        }

        .loading-spinner-small {
          width: 25px;
          height: 25px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Table Section */
        .table-section {
          background: white;
          border-radius: 10px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e9ecef;
          flex-wrap: wrap;
          gap: 8px;
        }

        .table-header h2 {
          margin: 0;
          font-size: 16px;
          color: #2c3e50;
        }

        .total-results {
          background: #e8f8f5;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          color: #1abc9c;
        }

        .table-container {
          max-height: 55vh;
          overflow-y: auto;
          overflow-x: auto;
        }

        .patients-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 600px;
        }

        .patients-table th {
          background: #f8f9fa;
          padding: 10px 12px;
          text-align: left;
          font-weight: bold;
          color: #2c3e50;
          border-bottom: 2px solid #e9ecef;
          font-size: 13px;
          white-space: nowrap;
        }

        .patients-table td {
          padding: 8px 12px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 13px;
        }

        .patient-row {
          cursor: pointer;
          transition: background 0.2s;
        }

        .patient-row:hover {
          background: #f8f9fa;
        }

        .patient-row.selected {
          background: #ebf5fb;
        }

        .patient-row.temp {
          background: #fff3cd;
        }

        .patient-type-badge {
          padding: 2px 10px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: bold;
        }

        .patient-type-badge.temp {
          background: #fff3cd;
          color: #856404;
        }

        .patient-type-badge.permanent {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.temp {
          background: #fff3cd;
          color: #856404;
          padding: 2px 10px;
          border-radius: 10px;
          font-size: 11px;
        }

        .status-badge.permanent {
          background: #d4edda;
          color: #155724;
          padding: 2px 10px;
          border-radius: 10px;
          font-size: 11px;
        }

        .empty-state {
          text-align: center;
          padding: 30px;
          color: #95a5a6;
          font-size: 16px;
        }

        /* Row History Button */
        .btn-row-history {
          padding: 4px 12px;
          border: none;
          border-radius: 5px;
          background: #27ae60;
          color: white;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          min-height: 30px;
        }

        .btn-row-history:hover:not(:disabled) {
          background: #1e8449;
          transform: scale(1.05);
        }

        .btn-row-history:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .patients-table th:last-child,
        .patients-table td:last-child {
          text-align: center;
          width: 100px;
        }

        /* Visit Cards */
        .visit-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e9ecef;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          overflow: hidden;
          margin-bottom: 12px;
          transition: all 0.2s;
        }

        .visit-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        .visit-card-header {
          display: flex;
          align-items: center;
          padding: 8px 15px;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .visit-id {
          font-weight: bold;
          color: #2c3e50;
        }

        .visit-header-spacer {
          flex: 1;
        }

        .visit-card-body {
          padding: 15px;
        }

        .visit-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .visit-detail {
          font-size: 13px;
          color: #34495e;
        }

        .visit-actions {
          margin-top: 10px;
        }

        .btn-view-details {
          padding: 6px 15px;
          border: none;
          border-radius: 20px;
          background: #3498db;
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 34px;
        }

        .btn-view-details:hover {
          background: #2980b9;
          transform: scale(1.05);
        }

        /* Pagination */
        .pagination-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px 10px 5px 10px;
          border-top: 1px solid #e9ecef;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .pagination-btn {
          padding: 6px 14px;
          border: 1px solid #dce4ec;
          border-radius: 6px;
          background: white;
          color: #2c3e50;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 36px;
          min-height: 34px;
        }

        .pagination-btn:hover:not(:disabled):not(.active) {
          background: #f0f2f5;
          border-color: #3498db;
        }

        .pagination-btn.active {
          background: #3498db;
          color: white;
          border-color: #3498db;
          font-weight: bold;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-ellipsis {
          color: #95a5a6;
          padding: 0 5px;
        }

        .pagination-info {
          font-size: 13px;
          color: #7f8c8d;
          padding: 0 10px;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 15px;
          padding: 25px;
          max-width: 700px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-content.large {
          max-width: 900px;
        }

        .modal-close {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #555;
          transition: all 0.2s;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .modal-close:hover {
          color: #e74c3c;
          background: rgba(231, 76, 60, 0.1);
        }

        .modal-content h2 {
          margin: 0 0 20px 0;
          color: #2c3e50;
          padding-right: 40px;
        }

        .modal-content h3 {
          margin: 15px 0 10px 0;
          color: #2c3e50;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 20px;
        }

        .detail-row {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-weight: bold;
          font-size: 12px;
          color: #7f8c8d;
        }

        .detail-value {
          font-size: 13px;
          color: #2c3e50;
        }

        .drugs-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .drug-item {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 5px;
          font-size: 13px;
        }

        .drug-name {
          font-weight: bold;
          color: #2c3e50;
        }

        .drug-strength, .drug-route, .drug-form {
          color: #34495e;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-height: 60vh;
          overflow-y: auto;
        }

        .history-record {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 12px;
          background: #f8f9fa;
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e9ecef;
          flex-wrap: wrap;
          gap: 8px;
        }

        .history-date {
          font-size: 12px;
          color: #7f8c8d;
        }

        .history-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px 20px;
          font-size: 13px;
        }

        .history-body div {
          padding: 2px 0;
        }

        .empty-state.small {
          padding: 15px;
          font-size: 14px;
        }

        /* RTL Support */
        .doctor-search-patient.rtl {
          direction: rtl;
        }

        .doctor-search-patient.rtl .search-controls {
          flex-direction: row-reverse;
        }

        .doctor-search-patient.rtl .table-header {
          flex-direction: row-reverse;
        }

        .doctor-search-patient.rtl .modal-close {
          right: auto;
          left: 15px;
        }

        .doctor-search-patient.rtl .pagination-container {
          direction: rtl;
        }

        .doctor-search-patient.rtl .pagination-btn {
          margin: 0 2px;
        }

        .doctor-search-patient.rtl .modal-content h2 {
          padding-right: 0;
          padding-left: 40px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .search-header {
            flex-direction: column;
            align-items: stretch;
          }

          .search-controls {
            flex-direction: column;
          }
          
          .search-input {
            min-width: 100%;
          }
          
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .history-body {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            padding: 15px;
            max-width: 95%;
          }

          .modal-content.large {
            max-width: 95%;
          }
          
          .patients-table {
            font-size: 12px;
          }
          
          .patients-table th,
          .patients-table td {
            padding: 6px 8px;
          }

          .pagination-container {
            gap: 4px;
            padding: 10px 5px;
          }
          
          .pagination-btn {
            padding: 4px 10px;
            font-size: 12px;
            min-width: 30px;
            min-height: 30px;
          }
          
          .pagination-info {
            font-size: 11px;
            padding: 0 5px;
          }

          .header-actions {
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 480px) {
          .doctor-search-patient {
            padding: 10px;
          }

          .search-header h1 {
            font-size: 18px;
          }

          .btn-close-header {
            font-size: 12px;
            padding: 6px 12px;
            min-height: 34px;
          }

          .search-section {
            padding: 10px;
          }

          .search-select {
            min-width: 100%;
          }

          .btn-search,
          .btn-clear {
            width: 100%;
          }

          .modal-content {
            padding: 12px;
          }

          .modal-content h2 {
            font-size: 18px;
          }

          .pagination-container {
            gap: 3px;
          }
          
          .pagination-btn {
            padding: 3px 8px;
            font-size: 11px;
            min-width: 26px;
            min-height: 26px;
          }

          .btn-row-history {
            font-size: 10px;
            padding: 3px 8px;
            min-height: 26px;
          }
        }

        @media (max-width: 360px) {
          .patients-table {
            font-size: 11px;
          }

          .patients-table th,
          .patients-table td {
            padding: 4px 6px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .modal-content {
            max-width: 80%;
          }

          .modal-content.large {
            max-width: 85%;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .doctor-search-patient {
            background: #1a1a2e;
          }

          .search-header,
          .search-section,
          .table-section {
            background: #2d2d44;
          }

          .search-header h1 {
            color: #ecf0f1;
          }

          .search-select,
          .search-input {
            background: #1a1a2e;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .search-select:focus,
          .search-input:focus {
            border-color: #3498db;
          }

          .search-input::placeholder {
            color: #666;
          }

          .patients-table th {
            background: #1a1a2e;
            color: #ecf0f1;
            border-bottom-color: #3d3d5c;
          }

          .patients-table td {
            color: #b0b0b0;
            border-bottom-color: #3d3d5c;
          }

          .patients-table td strong {
            color: #ecf0f1;
          }

          .patient-row:hover {
            background: #1a1a2e;
          }

          .patient-row.selected {
            background: #1a2744;
          }

          .patient-row.temp {
            background: #2d1f0a;
          }

          .table-header h2 {
            color: #ecf0f1;
          }

          .total-results {
            background: #1a2a2a;
            color: #4CAF50;
          }

          .table-container {
            border-color: #3d3d5c;
          }

          .modal-content {
            background: #1a1a2e;
          }

          .modal-content h2 {
            color: #ecf0f1;
          }

          .modal-content h3 {
            color: #ecf0f1;
          }

          .modal-close {
            color: #b0b0b0;
          }

          .modal-close:hover {
            color: #e74c3c;
          }

          .detail-label {
            color: #888;
          }

          .detail-value {
            color: #b0b0b0;
          }

          .drug-item {
            background: #2d2d44;
          }

          .drug-name {
            color: #ecf0f1;
          }

          .drug-strength,
          .drug-route,
          .drug-form {
            color: #b0b0b0;
          }

          .history-record {
            background: #2d2d44;
            border-color: #3d3d5c;
          }

          .history-header {
            border-bottom-color: #3d3d5c;
          }

          .history-date {
            color: #888;
          }

          .history-body {
            color: #b0b0b0;
          }

          .visit-card {
            background: #2d2d44;
            border-color: #3d3d5c;
          }

          .visit-card-header {
            background: #1a1a2e;
            border-bottom-color: #3d3d5c;
          }

          .visit-id {
            color: #ecf0f1;
          }

          .visit-detail {
            color: #b0b0b0;
          }

          .visit-detail strong {
            color: #ecf0f1;
          }

          .pagination-btn {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #b0b0b0;
          }

          .pagination-btn:hover:not(:disabled):not(.active) {
            background: #3d3d5c;
          }

          .pagination-btn.active {
            background: #3498db;
            color: white;
          }

          .pagination-ellipsis {
            color: #666;
          }

          .pagination-info {
            color: #888;
          }

          .status-badge.success {
            background: #1a2a2a;
            color: #4CAF50;
          }

          .status-badge.error {
            background: #2a1a1a;
            color: #e74c3c;
          }

          .status-badge.loading {
            background: #2a2a1a;
            color: #f39c12;
          }

          .status-badge.info {
            background: #1a1a2a;
            color: #3498db;
          }

          .btn-row-history {
            background: #1e8449;
          }

          .btn-row-history:hover:not(:disabled) {
            background: #27ae60;
          }

          .btn-view-details {
            background: #2980b9;
          }

          .btn-view-details:hover {
            background: #3498db;
          }

          .patient-type-badge.temp {
            background: #2d1f0a;
            color: #ffb74d;
          }

          .patient-type-badge.permanent {
            background: #0a2d1a;
            color: #4CAF50;
          }

          .status-badge.temp {
            background: #2d1f0a;
            color: #ffb74d;
          }

          .status-badge.permanent {
            background: #0a2d1a;
            color: #4CAF50;
          }

          .empty-state {
            color: #666;
          }

          .btn-close-header {
            background: #c0392b;
          }

          .btn-close-header:hover {
            background: #e74c3c;
          }

          .btn-search {
            background: #2980b9;
          }

          .btn-search:hover:not(:disabled) {
            background: #3498db;
          }

          .btn-clear {
            background: #5a6268;
          }

          .btn-clear:hover {
            background: #6c757d;
          }
        }
      `}</style>

      <div className={`doctor-search-patient ${isRTL ? 'rtl' : ''}`}>
        {/* Header with Close Button */}
        <div className="search-header">
          <h1>🔍 {t('title.searchPatients')}</h1>
          <div className="header-actions">
            <div className={`status-badge ${status.type}`}>
              ● {status.text}
            </div>
            <button 
              className="btn-close-header"
              onClick={onClose}
              title={t('btn.close')}
            >
              ✖ {t('btn.close')}
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="search-controls">
            <select 
              value={searchBy}
              onChange={(e) => {
                setSearchBy(e.target.value);
                setSearchValue('');
              }}
              className="search-select"
            >
              <option value={SEARCH_NAME}>{t('search.name')}</option>
              <option value={SEARCH_MOBILE}>{t('search.mobile')}</option>
            </select>
            
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchBy === SEARCH_MOBILE ? t('prompt.mobile') : t('prompt.name')}
              onKeyPress={(e) => e.key === 'Enter' && performSearch()}
              className="search-input"
            />
            
            <button 
              onClick={performSearch}
              disabled={searchValue.length < 2 || loading}
              className="btn-search"
            >
              {loading ? '⏳' : '🔍'} {t('btn.search')}
            </button>
            
            <button 
              onClick={clearSearch}
              className="btn-clear"
            >
              🗑️ {t('btn.clear')}
            </button>
            
            {loading && <div className="loading-spinner-small"></div>}
          </div>
        </div>

        {/* Table Section */}
        <div className="table-section">
          <div className="table-header">
            <h2>📋 {t('table.title')}</h2>
            <span className="total-results">👤 {t('status.totalPatients')}: {totalResults}</span>
          </div>
          
          <div className="table-container">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>{t('table.id')}</th>
                  <th>{t('table.firstName')}</th>
                  <th>{t('table.middleName')}</th>
                  <th>{t('table.lastName')}</th>
                  <th>{t('table.type')}</th>
                  <th>{t('table.phone')}</th>
                  <th>{t('table.address')}</th>
                  <th>{t('table.gender')}</th>
                  <th>{t('table.dob')}</th>
                  <th>{t('table.age')}</th>
                  <th>{t('table.status')}</th>
                  <th>{t('table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="empty-state">
                      📭 {t('status.noVisits')}
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => (
                    <PatientRow
                      key={patient.id}
                      patient={patient}
                      isSelected={selectedPatient?.id === patient.id}
                      onSelect={setSelectedPatient}
                      onHistory={loadPatientHistoryForRow}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {renderPagination()}
        </div>

        {/* Modals */}
        <VisitDetailsModal />
        <HistoryModal />
      </div>
    </>
  );
};

export default DoctorSearchPatientScreen;