// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .payment-container {
//     padding: 20px;
//     background: #f0f4f8;
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//   }
  
//   /* Header */
//   .payment-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 15px 25px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//   }
//   .payment-header .title {
//     font-size: 24px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .payment-header .actions {
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
//   .payment-header .actions button {
//     padding: 8px 18px;
//     border: none;
//     border-radius: 20px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     color: white;
//   }
//   .payment-header .actions button:hover {
//     transform: scale(1.05);
//   }
//   .payment-header .actions button.load { background: #2ecc71; }
//   .payment-header .actions button.load:hover { background: #27ae60; }
//   .payment-header .actions button.refresh { background: #f39c12; }
//   .payment-header .actions button.refresh:hover { background: #e67e22; }
//   .payment-header .actions button.export { background: #3498db; }
//   .payment-header .actions button.export:hover { background: #2980b9; }
//   .payment-header .status {
//     font-size: 12px;
//     color: #27ae60;
//   }
//   .payment-header .status.error { color: #e74c3c; }
//   .payment-header .status.loading { color: #f39c12; }

//   /* Filter Bar */
//   .payment-filters {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     flex-wrap: wrap;
//   }
//   .payment-filters .filter-group {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }
//   .payment-filters .filter-group label {
//     font-weight: bold;
//     font-size: 12px;
//     color: #34495e;
//   }
//   .payment-filters .filter-group input[type="date"] {
//     padding: 6px 12px;
//     border: 1px solid #dce4ec;
//     border-radius: 5px;
//     font-size: 13px;
//   }
//   .payment-filters .filter-group select {
//     padding: 6px 12px;
//     border: 1px solid #dce4ec;
//     border-radius: 5px;
//     font-size: 13px;
//     min-width: 150px;
//   }

//   /* Summary Cards */
//   .payment-summary {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
//     gap: 12px;
//   }
//   .payment-summary .card {
//     padding: 12px 18px;
//     border-radius: 10px;
//     background: white;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     transition: all 0.2s;
//     cursor: pointer;
//     min-height: 70px;
//   }
//   .payment-summary .card:hover {
//     transform: scale(1.03);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .payment-summary .card .card-title {
//     font-size: 13px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .payment-summary .card .card-value {
//     font-size: 22px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .payment-summary .card .card-emoji {
//     font-size: 20px;
//   }
//   .payment-summary .card.cash { background: #E8F5E9; }
//   .payment-summary .card.pos { background: #E3F2FD; }
//   .payment-summary .card.insurance { background: #F3E5F5; }
//   .payment-summary .card.insurance-discount { background: #FFF3E0; }
//   .payment-summary .card.free { background: #FFFDE7; }
//   .payment-summary .card.total { background: #ECEFF1; }

//   /* Tables */
//   .payment-tables {
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//   }
//   .payment-table-section {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//   }
//   .payment-table-section .section-title {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2c3e50;
//     margin-bottom: 10px;
//   }
//   .payment-table-section .search-box {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 10px;
//   }
//   .payment-table-section .search-box input {
//     padding: 6px 12px;
//     border: 1px solid #dce4ec;
//     border-radius: 5px;
//     font-size: 13px;
//     flex: 1;
//     max-width: 300px;
//   }
//   .payment-table-wrapper {
//     overflow-x: auto;
//     max-height: 250px;
//     border: 1px solid #e9ecef;
//     border-radius: 8px;
//   }
//   .payment-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .payment-table th {
//     background: #f8f9fa;
//     padding: 8px 12px;
//     text-align: left;
//     font-weight: bold;
//     color: #2c3e50;
//     border-bottom: 2px solid #e9ecef;
//     position: sticky;
//     top: 0;
//     z-index: 10;
//   }
//   .payment-table td {
//     padding: 6px 12px;
//     border-bottom: 1px solid #f0f0f0;
//   }
//   .payment-table tr:hover td {
//     background: #f8f9fa;
//   }
//   .payment-table .highlight-row {
//     background: #FFF3E0;
//   }
//   .payment-table .payment-badge {
//     display: inline-block;
//     padding: 2px 10px;
//     border-radius: 10px;
//     font-size: 12px;
//     font-weight: bold;
//     color: white;
//   }
//   .payment-table .payment-badge.cash { background: #4CAF50; }
//   .payment-table .payment-badge.pos { background: #2196F3; }
//   .payment-table .payment-badge.insurance { background: #9C27B0; }
//   .payment-table .payment-badge.free { background: #FF9800; }
//   .payment-table .payment-badge.default { background: #757575; }

//   /* Loading */
//   .payment-loading {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 40px;
//     color: #7f8c8d;
//   }

//   /* No Data */
//   .payment-empty {
//     text-align: center;
//     padding: 40px;
//     color: #7f8c8d;
//     font-size: 16px;
//   }
// `;

// // ---------- Helper Functions ----------
// const formatDate = (date) => {
//   if (!date) return '';
//   const d = new Date(date);
//   return d.toISOString().split('T')[0];
// };

// const formatDateTime = (dateStr) => {
//   if (!dateStr) return '';
//   try {
//     const date = new Date(dateStr);
//     return date.toLocaleString();
//   } catch {
//     return dateStr;
//   }
// };

// const formatCurrency = (value) => {
//   if (value === null || value === undefined) return '0.00';
//   return Number(value).toFixed(2);
// };

// const formatCurrencyWithCommas = (value) => {
//   if (value === null || value === undefined) return '0.00';
//   return Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// };

// const parseAmount = (value) => {
//   if (typeof value === 'string') {
//     return parseFloat(value.replace(/,/g, '')) || 0;
//   }
//   return value || 0;
// };

// // ---------- Main Component ----------
// const ClinicPaymentReportScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const getTranslations = (language) => {
//     const translations = {
//       en: {
//         title: 'Clinic Payment Report',
//         filter: {
//           from: 'From Date',
//           to: 'To Date',
//           paymentType: 'Payment Type',
//           load: 'Load Data',
//           refresh: 'Refresh',
//           export: 'Export Excel'
//         },
//         summary: {
//           cash: 'Cash',
//           pos: 'POS',
//           insurance: 'Insurance',
//           insuranceDiscount: 'Insurance Discount',
//           free: 'Free Visits',
//           total: 'Total'
//         },
//         doctor: {
//           title: 'Doctors Summary',
//           count: 'Doctors',
//           name: 'Doctor Name',
//           cash: 'Cash',
//           pos: 'POS',
//           insurance: 'Insurance',
//           insuranceDiscount: 'Insurance Discount',
//           free: 'Free',
//           total: 'Total'
//         },
//         patient: {
//           title: 'Patient Details',
//           search: 'Search patients...',
//           id: 'Payment ID',
//           name: 'Patient Name',
//           paymentType: 'Payment Type',
//           amount: 'Amount',
//           insuranceAmount: 'Insurance Amount',
//           insurancePaid: 'Insurance Paid',
//           insuranceDiscount: 'Insurance Discount',
//           paidAt: 'Paid At',
//           doctorName: 'Doctor',
//           visitType: 'Visit Type',
//           visitDate: 'Visit Date',
//           insuranceProvider: 'Insurance Provider'
//         },
//         status: {
//           ready: 'Ready',
//           loading: 'Loading...',
//           loaded: 'Loaded',
//           error: 'Error loading data',
//           doctors: 'Doctors',
//           patients: 'Patients',
//           exporting: 'Exporting...',
//           exported: 'Exported successfully',
//           exportError: 'Export failed'
//         },
//         alert: {
//           loadError: 'Failed to load data. Please try again.',
//           noData: 'No data to export',
//           exportSuccess: 'Data exported successfully',
//           exportError: 'Failed to export data'
//         },
//         payment: {
//           cash: 'CASH',
//           pos: 'POS',
//           insurance: 'INSURANCE',
//           free: 'FREE'
//         }
//       },
//       ar: {
//         title: 'تقرير مدفوعات العيادة',
//         filter: {
//           from: 'من تاريخ',
//           to: 'إلى تاريخ',
//           paymentType: 'نوع الدفع',
//           load: 'تحميل البيانات',
//           refresh: 'تحديث',
//           export: 'تصدير إكسل'
//         },
//         summary: {
//           cash: 'نقدي',
//           pos: 'بطاقة',
//           insurance: 'تأمين',
//           insuranceDiscount: 'خصم التأمين',
//           free: 'زيارات مجانية',
//           total: 'الإجمالي'
//         },
//         doctor: {
//           title: 'ملخص الأطباء',
//           count: 'الأطباء',
//           name: 'اسم الطبيب',
//           cash: 'نقدي',
//           pos: 'بطاقة',
//           insurance: 'تأمين',
//           insuranceDiscount: 'خصم التأمين',
//           free: 'مجاني',
//           total: 'الإجمالي'
//         },
//         patient: {
//           title: 'تفاصيل المرضى',
//           search: 'بحث عن المرضى...',
//           id: 'رقم الدفع',
//           name: 'اسم المريض',
//           paymentType: 'نوع الدفع',
//           amount: 'المبلغ',
//           insuranceAmount: 'مبلغ التأمين',
//           insurancePaid: 'المدفوع من التأمين',
//           insuranceDiscount: 'خصم التأمين',
//           paidAt: 'وقت الدفع',
//           doctorName: 'الطبيب',
//           visitType: 'نوع الزيارة',
//           visitDate: 'تاريخ الزيارة',
//           insuranceProvider: 'شركة التأمين'
//         },
//         status: {
//           ready: 'جاهز',
//           loading: 'جاري التحميل...',
//           loaded: 'تم التحميل',
//           error: 'خطأ في تحميل البيانات',
//           doctors: 'الأطباء',
//           patients: 'المرضى',
//           exporting: 'جاري التصدير...',
//           exported: 'تم التصدير بنجاح',
//           exportError: 'فشل التصدير'
//         },
//         alert: {
//           loadError: 'فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.',
//           noData: 'لا توجد بيانات للتصدير',
//           exportSuccess: 'تم تصدير البيانات بنجاح',
//           exportError: 'فشل في تصدير البيانات'
//         },
//         payment: {
//           cash: 'نقدي',
//           pos: 'بطاقة',
//           insurance: 'تأمين',
//           free: 'مجاني'
//         }
//       }
//     };
//     return translations[language] || translations.en;
//   };

//   const t = getTranslations(lang);

//   // ---------- State ----------
//   const [fromDate, setFromDate] = useState(() => {
//     const date = new Date();
//     date.setDate(1);
//     return formatDate(date);
//   });
//   const [toDate, setToDate] = useState(formatDate(new Date()));
//   const [paymentType, setPaymentType] = useState('ALL');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });

//   // Summary data
//   const [summary, setSummary] = useState({
//     cashTotal: 0,
//     posTotal: 0,
//     insuranceTotal: 0,
//     insuranceDiscount: 0,
//     freeVisits: 0,
//     grandTotal: 0
//   });

//   // Table data
//   const [doctorRows, setDoctorRows] = useState([]);
//   const [patientRows, setPatientRows] = useState([]);
//   const [filteredPatientRows, setFilteredPatientRows] = useState([]);
//   const [patientSearch, setPatientSearch] = useState('');

//   // Payment type mapping
//   const paymentMap = {
//     [t.payment.cash]: 'CASH',
//     [t.payment.pos]: 'POS',
//     [t.payment.insurance]: 'INSURANCE',
//     [t.payment.free]: 'FREE'
//   };

//   // ---------- Helper Functions ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text: `● ${text}`, type });
//   }, []);

//   // ---------- API Calls ----------
//   const loadClinicData = useCallback(async (from, to) => {
//     const url = `${BASE_URL}/api/reports/payments/with-doctors?fromDate=${from}&toDate=${to}`;
//     console.log('📤 Fetching clinic data:', url);
    
//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`HTTP ${response.status}`);
//     return await response.json();
//   }, []);

//  const loadPatientsData = useCallback(async (from, to, paymentTypeCode) => {
//   // Don't call the API if paymentTypeCode is 'ALL'
//   if (paymentTypeCode === 'ALL') {
//     return [];
//   }
  
//   const url = `${BASE_URL}/api/patients/payment-method/${paymentTypeCode}?fromDate=${from}&toDate=${to}`;
//   console.log('📤 Fetching patients data:', url);
  
//   const response = await fetch(url);
//   if (!response.ok) throw new Error(`HTTP ${response.status}`);
//   return await response.json();
// }, []);

// const loadAllData = useCallback(async () => {
//   setLoading(true);
//   setStatus(t.status.loading, 'loading');

//   try {
//     const from = `${fromDate}T00:00:00`;
//     const to = `${toDate}T23:59:59`;
//     const selectedLabel = paymentType;
//     const paymentCode = selectedLabel === 'ALL' ? null : paymentMap[selectedLabel];
    
//     // Don't call patient API if ALL is selected
//     let patientsData = [];
    
//     const startTime = performance.now();

//     // Load clinic data (always)
//     const clinicData = await loadClinicData(from, to);
    
//     // Load patients data only if a specific payment type is selected
//     if (paymentCode) {
//       patientsData = await loadPatientsData(from, to, paymentCode);
//     }

//     const elapsed = Math.round(performance.now() - startTime);

//     // Update summary
//     const totals = clinicData.clinicTotals || {};
//     setSummary({
//       cashTotal: totals.cashTotal || 0,
//       posTotal: totals.posTotal || 0,
//       insuranceTotal: totals.insuranceTotal || 0,
//       insuranceDiscount: totals.insuranceDiscount || 0,
//       freeVisits: totals.freeVisits || 0,
//       grandTotal: totals.grandTotal || 0
//     });

//     // Update doctor table
//     const doctors = (clinicData.doctorSummaries || []).map(d => ({
//       name: d.doctorName || 'Unknown',
//       cash: formatCurrencyWithCommas(d.cashTotal || 0),
//       pos: formatCurrencyWithCommas(d.posTotal || 0),
//       insurance: formatCurrencyWithCommas(d.insuranceTotal || 0),
//       insuranceDiscount: formatCurrencyWithCommas(d.insuranceDiscount || 0),
//       free: String(d.freeCount || 0),
//       total: formatCurrencyWithCommas(d.grandTotal || 0)
//     }));
//     setDoctorRows(doctors);

//     // Update patient table
//     const patients = (patientsData || []).map(p => ({
//       id: String(p.paymentId || ''),
//       name: p.patientName || '',
//       payment: p.paymentMethod || '',
//       amount: p.amount !== null ? formatCurrencyWithCommas(p.amount) : '0.00',
//       paidAt: formatDateTime(p.paidAt),
//       doctorName: p.doctorName || '',
//       visitType: p.visitType || '',
//       visitDate: formatDateTime(p.visitDate),
//       insuranceProvider: p.insuranceProvider || '',
//       insuranceAmount: p.insuranceAmount !== null ? formatCurrencyWithCommas(p.insuranceAmount) : '0.00',
//       insurancePaidAmount: p.insurancePaidAmount !== null ? formatCurrencyWithCommas(p.insurancePaidAmount) : '0.00',
//       insuranceDiscount: p.insuranceDiscount !== null ? formatCurrencyWithCommas(p.insuranceDiscount) : '0.00'
//     }));
//     setPatientRows(patients);
//     setFilteredPatientRows(patients);

//     setStatus(`${t.status.loaded} | ${t.status.doctors}: ${doctors.length} | ${t.status.patients}: ${patients.length} (${elapsed}ms)`, 'success');

//   } catch (err) {
//     console.error('🚨 Load error:', err);
//     setStatus(t.status.error, 'error');
//     alert(t.alert.loadError);
//   } finally {
//     setLoading(false);
//   }
// }, [fromDate, toDate, paymentType, paymentMap, t, loadClinicData, loadPatientsData]);
//   const refreshData = useCallback(() => {
//     loadAllData();
//   }, [loadAllData]);

//   // ---------- Export to CSV ----------
//   const exportData = useCallback(() => {
//     if (doctorRows.length === 0 && patientRows.length === 0) {
//       alert(t.alert.noData);
//       return;
//     }

//     try {
//       setStatus(t.status.exporting, 'loading');

//       // Create CSV content
//       let csv = '';

//       // Summary section
//       csv += 'Clinic Payment Report\n\n';
//       csv += 'Summary\n';
//       csv += `Cash Total,${formatCurrencyWithCommas(summary.cashTotal)}\n`;
//       csv += `POS Total,${formatCurrencyWithCommas(summary.posTotal)}\n`;
//       csv += `Insurance Total,${formatCurrencyWithCommas(summary.insuranceTotal)}\n`;
//       csv += `Insurance Discount,${formatCurrencyWithCommas(summary.insuranceDiscount)}\n`;
//       csv += `Free Visits,${summary.freeVisits}\n`;
//       csv += `Grand Total,${formatCurrencyWithCommas(summary.grandTotal)}\n\n`;

//       // Doctors section
//       csv += 'Doctors Summary\n';
//       csv += 'Doctor Name,Cash,POS,Insurance,Insurance Discount,Free,Total\n';
//       doctorRows.forEach(row => {
//         csv += `${row.name},${row.cash},${row.pos},${row.insurance},${row.insuranceDiscount},${row.free},${row.total}\n`;
//       });
//       csv += '\n';

//       // Patients section
//       csv += 'Patient Details\n';
//       csv += 'Payment ID,Patient Name,Payment Type,Amount,Paid At,Doctor,Visit Type,Visit Date,Insurance Provider,Insurance Amount,Insurance Paid,Insurance Discount\n';
//       filteredPatientRows.forEach(row => {
//         csv += `${row.id},${row.name},${row.payment},${row.amount},${row.paidAt},${row.doctorName},${row.visitType},${row.visitDate},${row.insuranceProvider},${row.insuranceAmount},${row.insurancePaidAmount},${row.insuranceDiscount}\n`;
//       });

//       // Download CSV
//       const blob = new Blob([csv], { type: 'text/csv' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `clinic-payment-report_${new Date().toISOString().split('T')[0]}.csv`;
//       a.click();
//       URL.revokeObjectURL(url);

//       setStatus(t.status.exported, 'success');
//       alert(t.alert.exportSuccess);

//     } catch (err) {
//       console.error('🚨 Export error:', err);
//       setStatus(t.status.exportError, 'error');
//       alert(t.alert.exportError);
//     }
//   }, [doctorRows, filteredPatientRows, summary, t]);

//   // ---------- Filter Patients ----------
//   useEffect(() => {
//     if (patientSearch.trim() === '') {
//       setFilteredPatientRows(patientRows);
//     } else {
//       const searchLower = patientSearch.toLowerCase();
//       const filtered = patientRows.filter(row => {
//         return (
//           row.name.toLowerCase().includes(searchLower) ||
//           row.id.toLowerCase().includes(searchLower) ||
//           row.doctorName.toLowerCase().includes(searchLower) ||
//           row.payment.toLowerCase().includes(searchLower)
//         );
//       });
//       setFilteredPatientRows(filtered);
//     }
//   }, [patientSearch, patientRows]);

//   // ---------- Initial Load ----------
//   useEffect(() => {
//     loadAllData();
//   }, []);

//   // ---------- Payment Badge Color ----------
//   const getPaymentBadgeClass = (paymentType) => {
//     const type = paymentType.toUpperCase();
//     switch (type) {
//       case 'CASH': return 'cash';
//       case 'POS': return 'pos';
//       case 'INSURANCE': return 'insurance';
//       case 'FREE': return 'free';
//       default: return 'default';
//     }
//   };

//   // ---------- Render Components ----------
//   const renderSummaryCards = () => {
//     const cards = [
//       { key: 'cash', title: t.summary.cash, value: formatCurrencyWithCommas(summary.cashTotal), emoji: '💰', cls: 'cash' },
//       { key: 'pos', title: t.summary.pos, value: formatCurrencyWithCommas(summary.posTotal), emoji: '💳', cls: 'pos' },
//       { key: 'insurance', title: t.summary.insurance, value: formatCurrencyWithCommas(summary.insuranceTotal), emoji: '🏥', cls: 'insurance' },
//       { key: 'insuranceDiscount', title: t.summary.insuranceDiscount, value: formatCurrencyWithCommas(summary.insuranceDiscount), emoji: '💸', cls: 'insurance-discount' },
//       { key: 'free', title: t.summary.free, value: summary.freeVisits, emoji: '🎁', cls: 'free' },
//       { key: 'total', title: t.summary.total, value: formatCurrencyWithCommas(summary.grandTotal), emoji: '📊', cls: 'total' }
//     ];

//     return (
//       <div className="payment-summary">
//         {cards.map((card) => (
//           <div key={card.key} className={`card ${card.cls}`}>
//             <div className="card-title">
//               <span className="card-emoji">{card.emoji}</span> {card.title}
//             </div>
//             <div className="card-value">{card.value}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderDoctorTable = () => {
//     if (doctorRows.length === 0) {
//       return <div className="payment-empty">No doctor data available</div>;
//     }

//     return (
//       <div className="payment-table-wrapper">
//         <table className="payment-table">
//           <thead>
//             <tr>
//               <th>{t.doctor.name}</th>
//               <th>{t.doctor.cash}</th>
//               <th>{t.doctor.pos}</th>
//               <th>{t.doctor.insurance}</th>
//               <th>{t.doctor.insuranceDiscount}</th>
//               <th>{t.doctor.free}</th>
//               <th>{t.doctor.total}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {doctorRows.map((row, index) => {
//               const total = parseAmount(row.total);
//               const isHighlight = total > 1000;
//               return (
//                 <tr key={index} className={isHighlight ? 'highlight-row' : ''}>
//                   <td>{row.name}</td>
//                   <td>{row.cash}</td>
//                   <td>{row.pos}</td>
//                   <td>{row.insurance}</td>
//                   <td>{row.insuranceDiscount}</td>
//                   <td>{row.free}</td>
//                   <td>{row.total}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderPatientTable = () => {
//     if (filteredPatientRows.length === 0) {
//       return <div className="payment-empty">No patient data available</div>;
//     }

//     return (
//       <div className="payment-table-wrapper">
//         <table className="payment-table">
//           <thead>
//             <tr>
//               <th>{t.patient.id}</th>
//               <th>{t.patient.name}</th>
//               <th>{t.patient.paymentType}</th>
//               <th>{t.patient.amount}</th>
//               <th>{t.patient.insuranceAmount}</th>
//               <th>{t.patient.insurancePaid}</th>
//               <th>{t.patient.insuranceDiscount}</th>
//               <th>{t.patient.paidAt}</th>
//               <th>{t.patient.doctorName}</th>
//               <th>{t.patient.visitType}</th>
//               <th>{t.patient.visitDate}</th>
//               <th>{t.patient.insuranceProvider}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPatientRows.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.id}</td>
//                 <td>{row.name}</td>
//                 <td>
//                   <span className={`payment-badge ${getPaymentBadgeClass(row.payment)}`}>
//                     {row.payment}
//                   </span>
//                 </td>
//                 <td>{row.amount}</td>
//                 <td>{row.insuranceAmount}</td>
//                 <td>{row.insurancePaidAmount}</td>
//                 <td>{row.insuranceDiscount}</td>
//                 <td>{row.paidAt}</td>
//                 <td>{row.doctorName}</td>
//                 <td>{row.visitType}</td>
//                 <td>{row.visitDate}</td>
//                 <td>{row.insuranceProvider}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   // ---------- Render ----------
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="payment-container">
//         {/* Header */}
//         <div className="payment-header">
//           <div className="title">{t.title}</div>
//           <div className="actions">
//             <button 
//               className="load" 
//               onClick={loadAllData}
//               disabled={loading}
//             >
//               📊 {t.filter.load}
//             </button>
//             <button 
//               className="refresh" 
//               onClick={refreshData}
//               disabled={loading}
//             >
//               🔄 {t.filter.refresh}
//             </button>
//             <button 
//               className="export" 
//               onClick={exportData}
//               disabled={loading || (doctorRows.length === 0 && patientRows.length === 0)}
//             >
//               📥 {t.filter.export}
//             </button>
//             <span className={`status ${statusMessage.type}`}>
//               {statusMessage.text}
//             </span>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="payment-filters">
//           <div className="filter-group">
//             <label>{t.filter.from}</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//             />
//           </div>
//           <div className="filter-group">
//             <label>{t.filter.to}</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//             />
//           </div>
//           <div className="filter-group">
//             <label>{t.filter.paymentType}</label>
//            <select
//   value={paymentType}
//   onChange={(e) => setPaymentType(e.target.value)}
// >
//   <option value="ALL">All Types</option>
//   <option value={t.payment.cash}>{t.payment.cash}</option>
//   <option value={t.payment.pos}>{t.payment.pos}</option>
//   <option value={t.payment.insurance}>{t.payment.insurance}</option>
//   <option value={t.payment.free}>{t.payment.free}</option>
// </select>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         {renderSummaryCards()}

//         {/* Tables */}
//         <div className="payment-tables">
//           {/* Doctor Table */}
//           <div className="payment-table-section">
//             <div className="section-title">👨‍⚕️ {t.doctor.title}</div>
//             {loading ? (
//               <div className="payment-loading">⏳ Loading...</div>
//             ) : (
//               renderDoctorTable()
//             )}
//             <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '5px' }}>
//               {t.doctor.count}: {doctorRows.length}
//             </div>
//           </div>

//           {/* Patient Table */}
//           <div className="payment-table-section">
//             <div className="section-title">📋 {t.patient.title}</div>
//             <div className="search-box">
//               <span>🔍</span>
//               <input
//                 type="text"
//                 placeholder={t.patient.search}
//                 value={patientSearch}
//                 onChange={(e) => setPatientSearch(e.target.value)}
//               />
//             </div>
//             {loading ? (
//               <div className="payment-loading">⏳ Loading...</div>
//             ) : (
//               renderPatientTable()
//             )}
//             <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '5px' }}>
//               {t.status.patients}: {filteredPatientRows.length}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ClinicPaymentReportScreen;  11072026  11:20 pm

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Styles ----------
const styles = `
  .payment-container {
    padding: 20px;
    background: #f0f4f8;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  /* Header */
  .payment-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    flex-wrap: wrap;
    gap: 10px;
  }
  .payment-header .title {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
  }
  .payment-header .actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
  .payment-header .actions button {
    padding: 8px 18px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
    color: white;
    min-height: 38px;
    white-space: nowrap;
  }
  .payment-header .actions button:hover {
    transform: scale(1.05);
  }
  .payment-header .actions button:active {
    transform: scale(0.95);
  }
  .payment-header .actions button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  .payment-header .actions button.load { background: #2ecc71; }
  .payment-header .actions button.load:hover:not(:disabled) { background: #27ae60; }
  .payment-header .actions button.refresh { background: #f39c12; }
  .payment-header .actions button.refresh:hover:not(:disabled) { background: #e67e22; }
  .payment-header .actions button.export { background: #3498db; }
  .payment-header .actions button.export:hover:not(:disabled) { background: #2980b9; }
  .payment-header .status {
    font-size: 12px;
    color: #27ae60;
    word-break: break-word;
  }
  .payment-header .status.error { color: #e74c3c; }
  .payment-header .status.loading { color: #f39c12; }

  /* Filter Bar */
  .payment-filters {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    flex-wrap: wrap;
  }
  .payment-filters .filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .payment-filters .filter-group label {
    font-weight: bold;
    font-size: 12px;
    color: #34495e;
  }
  .payment-filters .filter-group input[type="date"] {
    padding: 6px 12px;
    border: 1px solid #dce4ec;
    border-radius: 5px;
    font-size: 13px;
    min-height: 38px;
  }
  .payment-filters .filter-group select {
    padding: 6px 12px;
    border: 1px solid #dce4ec;
    border-radius: 5px;
    font-size: 13px;
    min-width: 150px;
    min-height: 38px;
  }

  /* Summary Cards */
  .payment-summary {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
  }
  .payment-summary .card {
    padding: 12px 18px;
    border-radius: 10px;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    transition: all 0.2s;
    cursor: pointer;
    min-height: 70px;
  }
  .payment-summary .card:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  }
  .payment-summary .card:active {
    transform: scale(0.98);
  }
  .payment-summary .card .card-title {
    font-size: 13px;
    font-weight: bold;
    color: #2c3e50;
  }
  .payment-summary .card .card-value {
    font-size: 22px;
    font-weight: bold;
    color: #2c3e50;
  }
  .payment-summary .card .card-emoji {
    font-size: 20px;
  }
  .payment-summary .card.cash { background: #E8F5E9; }
  .payment-summary .card.pos { background: #E3F2FD; }
  .payment-summary .card.insurance { background: #F3E5F5; }
  .payment-summary .card.insurance-discount { background: #FFF3E0; }
  .payment-summary .card.free { background: #FFFDE7; }
  .payment-summary .card.total { background: #ECEFF1; }

  /* Tables */
  .payment-tables {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .payment-table-section {
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  }
  .payment-table-section .section-title {
    font-size: 16px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  .payment-table-section .search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .payment-table-section .search-box input {
    padding: 6px 12px;
    border: 1px solid #dce4ec;
    border-radius: 5px;
    font-size: 13px;
    flex: 1;
    max-width: 300px;
    min-height: 38px;
  }
  .payment-table-section .search-box input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
  }
  .payment-table-wrapper {
    overflow-x: auto;
    max-height: 250px;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    -webkit-overflow-scrolling: touch;
  }
  .payment-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    min-width: 800px;
  }
  .payment-table th {
    background: #f8f9fa;
    padding: 8px 12px;
    text-align: left;
    font-weight: bold;
    color: #2c3e50;
    border-bottom: 2px solid #e9ecef;
    position: sticky;
    top: 0;
    z-index: 10;
    white-space: nowrap;
  }
  .payment-table td {
    padding: 6px 12px;
    border-bottom: 1px solid #f0f0f0;
  }
  .payment-table tr:hover td {
    background: #f8f9fa;
  }
  .payment-table .highlight-row {
    background: #FFF3E0;
  }
  .payment-table .payment-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: bold;
    color: white;
  }
  .payment-table .payment-badge.cash { background: #4CAF50; }
  .payment-table .payment-badge.pos { background: #2196F3; }
  .payment-table .payment-badge.insurance { background: #9C27B0; }
  .payment-table .payment-badge.free { background: #FF9800; }
  .payment-table .payment-badge.default { background: #757575; }

  /* Loading */
  .payment-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #7f8c8d;
  }

  /* No Data */
  .payment-empty {
    text-align: center;
    padding: 40px;
    color: #7f8c8d;
    font-size: 16px;
  }

  .payment-table-count {
    font-size: 12px;
    color: #7f8c8d;
    margin-top: 5px;
  }

  /* Responsive Breakpoints */
  @media (max-width: 768px) {
    .payment-container {
      padding: 12px;
    }

    .payment-header {
      padding: 12px 16px;
    }

    .payment-header .title {
      font-size: 20px;
    }

    .payment-header .actions {
      width: 100%;
      justify-content: flex-start;
    }

    .payment-header .actions button {
      font-size: 12px;
      padding: 6px 14px;
      min-height: 34px;
    }

    .payment-header .status {
      font-size: 11px;
      width: 100%;
    }

    .payment-filters {
      padding: 10px 14px;
      gap: 10px;
    }

    .payment-filters .filter-group {
      flex: 1 1 100%;
    }

    .payment-filters .filter-group label {
      min-width: 60px;
    }

    .payment-filters .filter-group input[type="date"],
    .payment-filters .filter-group select {
      font-size: 16px;
      min-height: 44px;
      flex: 1;
      min-width: 120px;
    }

    .payment-summary {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .payment-summary .card {
      padding: 10px 14px;
      min-height: 60px;
    }

    .payment-summary .card .card-value {
      font-size: 18px;
    }

    .payment-summary .card .card-title {
      font-size: 11px;
    }

    .payment-summary .card .card-emoji {
      font-size: 16px;
    }

    .payment-table-section {
      padding: 10px;
    }

    .payment-table-section .section-title {
      font-size: 14px;
    }

    .payment-table-section .search-box input {
      font-size: 16px;
      min-height: 44px;
      max-width: 100%;
    }

    .payment-table-wrapper {
      max-height: 300px;
    }

    /* Mobile table - convert to cards */
    .payment-table thead {
      display: none;
    }

    .payment-table tbody tr {
      display: block;
      margin-bottom: 10px;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 10px;
      background: white;
    }

    .payment-table tbody td {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      border: none;
      border-bottom: 1px solid #f0f0f0;
      align-items: center;
      font-size: 12px;
    }

    .payment-table tbody td:last-child {
      border-bottom: none;
    }

    .payment-table tbody td::before {
      content: attr(data-label);
      font-weight: bold;
      color: #2c3e50;
      margin-right: 10px;
      font-size: 11px;
    }

    .payment-table .payment-badge {
      font-size: 11px;
      padding: 2px 8px;
    }

    .payment-table .highlight-row {
      background: #FFF3E0;
    }

    .payment-table-count {
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    .payment-container {
      padding: 8px;
    }

    .payment-header {
      padding: 10px 12px;
    }

    .payment-header .title {
      font-size: 17px;
    }

    .payment-header .actions button {
      font-size: 11px;
      padding: 4px 10px;
      min-height: 30px;
    }

    .payment-filters {
      padding: 8px 10px;
      gap: 6px;
    }

    .payment-filters .filter-group input[type="date"],
    .payment-filters .filter-group select {
      font-size: 15px;
      min-height: 40px;
      padding: 4px 8px;
    }

    .payment-summary {
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    .payment-summary .card {
      padding: 8px 10px;
      min-height: 50px;
    }

    .payment-summary .card .card-value {
      font-size: 16px;
    }

    .payment-summary .card .card-title {
      font-size: 10px;
    }

    .payment-summary .card .card-emoji {
      font-size: 14px;
    }

    .payment-table-section {
      padding: 8px;
    }

    .payment-table-section .search-box input {
      font-size: 15px;
      min-height: 40px;
    }

    .payment-table tbody td {
      font-size: 11px;
      padding: 3px 0;
    }

    .payment-table tbody td::before {
      font-size: 10px;
    }

    .payment-table .payment-badge {
      font-size: 10px;
      padding: 1px 6px;
    }

    .payment-empty {
      padding: 20px;
      font-size: 14px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .payment-summary {
      grid-template-columns: repeat(3, 1fr);
    }

    .payment-filters .filter-group {
      flex: 1;
      min-width: 150px;
    }
  }
`;

// ---------- Helper Functions ----------
const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleString();
  } catch {
    return dateStr;
  }
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '0.00';
  return Number(value).toFixed(2);
};

const formatCurrencyWithCommas = (value) => {
  if (value === null || value === undefined) return '0.00';
  return Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const parseAmount = (value) => {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/,/g, '')) || 0;
  }
  return value || 0;
};

// ---------- Main Component ----------
const ClinicPaymentReportScreen = ({ loggedUser, lang = 'en', onClose }) => {
  // ---------- Translations ----------
  const getTranslations = (language) => {
    const translations = {
      en: {
        title: 'Clinic Payment Report',
        filter: {
          from: 'From Date',
          to: 'To Date',
          paymentType: 'Payment Type',
          load: 'Load Data',
          refresh: 'Refresh',
          export: 'Export Excel'
        },
        summary: {
          cash: 'Cash',
          pos: 'POS',
          insurance: 'Insurance',
          insuranceDiscount: 'Insurance Discount',
          free: 'Free Visits',
          total: 'Total'
        },
        doctor: {
          title: 'Doctors Summary',
          count: 'Doctors',
          name: 'Doctor Name',
          cash: 'Cash',
          pos: 'POS',
          insurance: 'Insurance',
          insuranceDiscount: 'Insurance Discount',
          free: 'Free',
          total: 'Total'
        },
        patient: {
          title: 'Patient Details',
          search: 'Search patients...',
          id: 'Payment ID',
          name: 'Patient Name',
          paymentType: 'Payment Type',
          amount: 'Amount',
          insuranceAmount: 'Insurance Amount',
          insurancePaid: 'Insurance Paid',
          insuranceDiscount: 'Insurance Discount',
          paidAt: 'Paid At',
          doctorName: 'Doctor',
          visitType: 'Visit Type',
          visitDate: 'Visit Date',
          insuranceProvider: 'Insurance Provider'
        },
        status: {
          ready: 'Ready',
          loading: 'Loading...',
          loaded: 'Loaded',
          error: 'Error loading data',
          doctors: 'Doctors',
          patients: 'Patients',
          exporting: 'Exporting...',
          exported: 'Exported successfully',
          exportError: 'Export failed'
        },
        alert: {
          loadError: 'Failed to load data. Please try again.',
          noData: 'No data to export',
          exportSuccess: 'Data exported successfully',
          exportError: 'Failed to export data'
        },
        payment: {
          cash: 'CASH',
          pos: 'POS',
          insurance: 'INSURANCE',
          free: 'FREE'
        }
      },
      ar: {
        title: 'تقرير مدفوعات العيادة',
        filter: {
          from: 'من تاريخ',
          to: 'إلى تاريخ',
          paymentType: 'نوع الدفع',
          load: 'تحميل البيانات',
          refresh: 'تحديث',
          export: 'تصدير إكسل'
        },
        summary: {
          cash: 'نقدي',
          pos: 'بطاقة',
          insurance: 'تأمين',
          insuranceDiscount: 'خصم التأمين',
          free: 'زيارات مجانية',
          total: 'الإجمالي'
        },
        doctor: {
          title: 'ملخص الأطباء',
          count: 'الأطباء',
          name: 'اسم الطبيب',
          cash: 'نقدي',
          pos: 'بطاقة',
          insurance: 'تأمين',
          insuranceDiscount: 'خصم التأمين',
          free: 'مجاني',
          total: 'الإجمالي'
        },
        patient: {
          title: 'تفاصيل المرضى',
          search: 'بحث عن المرضى...',
          id: 'رقم الدفع',
          name: 'اسم المريض',
          paymentType: 'نوع الدفع',
          amount: 'المبلغ',
          insuranceAmount: 'مبلغ التأمين',
          insurancePaid: 'المدفوع من التأمين',
          insuranceDiscount: 'خصم التأمين',
          paidAt: 'وقت الدفع',
          doctorName: 'الطبيب',
          visitType: 'نوع الزيارة',
          visitDate: 'تاريخ الزيارة',
          insuranceProvider: 'شركة التأمين'
        },
        status: {
          ready: 'جاهز',
          loading: 'جاري التحميل...',
          loaded: 'تم التحميل',
          error: 'خطأ في تحميل البيانات',
          doctors: 'الأطباء',
          patients: 'المرضى',
          exporting: 'جاري التصدير...',
          exported: 'تم التصدير بنجاح',
          exportError: 'فشل التصدير'
        },
        alert: {
          loadError: 'فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.',
          noData: 'لا توجد بيانات للتصدير',
          exportSuccess: 'تم تصدير البيانات بنجاح',
          exportError: 'فشل في تصدير البيانات'
        },
        payment: {
          cash: 'نقدي',
          pos: 'بطاقة',
          insurance: 'تأمين',
          free: 'مجاني'
        }
      }
    };
    return translations[language] || translations.en;
  };

  const t = getTranslations(lang);

  // ---------- State ----------
  const [fromDate, setFromDate] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return formatDate(date);
  });
  const [toDate, setToDate] = useState(formatDate(new Date()));
  const [paymentType, setPaymentType] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });

  // Summary data
  const [summary, setSummary] = useState({
    cashTotal: 0,
    posTotal: 0,
    insuranceTotal: 0,
    insuranceDiscount: 0,
    freeVisits: 0,
    grandTotal: 0
  });

  // Table data
  const [doctorRows, setDoctorRows] = useState([]);
  const [patientRows, setPatientRows] = useState([]);
  const [filteredPatientRows, setFilteredPatientRows] = useState([]);
  const [patientSearch, setPatientSearch] = useState('');

  // Payment type mapping
  const paymentMap = {
    [t.payment.cash]: 'CASH',
    [t.payment.pos]: 'POS',
    [t.payment.insurance]: 'INSURANCE',
    [t.payment.free]: 'FREE'
  };

  // ---------- Helper Functions ----------
  const setStatus = useCallback((text, type = 'success') => {
    setStatusMessage({ text: `● ${text}`, type });
  }, []);

  // ---------- API Calls ----------
  const loadClinicData = useCallback(async (from, to) => {
    const url = `${BASE_URL}/api/reports/payments/with-doctors?fromDate=${from}&toDate=${to}`;
    console.log('📤 Fetching clinic data:', url);
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  }, []);

  const loadPatientsData = useCallback(async (from, to, paymentTypeCode) => {
    if (paymentTypeCode === 'ALL') {
      return [];
    }
    
    const url = `${BASE_URL}/api/patients/payment-method/${paymentTypeCode}?fromDate=${from}&toDate=${to}`;
    console.log('📤 Fetching patients data:', url);
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  }, []);

  const loadAllData = useCallback(async () => {
    setLoading(true);
    setStatus(t.status.loading, 'loading');

    try {
      const from = `${fromDate}T00:00:00`;
      const to = `${toDate}T23:59:59`;
      const selectedLabel = paymentType;
      const paymentCode = selectedLabel === 'ALL' ? null : paymentMap[selectedLabel];
      
      let patientsData = [];
      
      const startTime = performance.now();

      const clinicData = await loadClinicData(from, to);
      
      if (paymentCode) {
        patientsData = await loadPatientsData(from, to, paymentCode);
      }

      const elapsed = Math.round(performance.now() - startTime);

      const totals = clinicData.clinicTotals || {};
      setSummary({
        cashTotal: totals.cashTotal || 0,
        posTotal: totals.posTotal || 0,
        insuranceTotal: totals.insuranceTotal || 0,
        insuranceDiscount: totals.insuranceDiscount || 0,
        freeVisits: totals.freeVisits || 0,
        grandTotal: totals.grandTotal || 0
      });

      const doctors = (clinicData.doctorSummaries || []).map(d => ({
        name: d.doctorName || 'Unknown',
        cash: formatCurrencyWithCommas(d.cashTotal || 0),
        pos: formatCurrencyWithCommas(d.posTotal || 0),
        insurance: formatCurrencyWithCommas(d.insuranceTotal || 0),
        insuranceDiscount: formatCurrencyWithCommas(d.insuranceDiscount || 0),
        free: String(d.freeCount || 0),
        total: formatCurrencyWithCommas(d.grandTotal || 0)
      }));
      setDoctorRows(doctors);

      const patients = (patientsData || []).map(p => ({
        id: String(p.paymentId || ''),
        name: p.patientName || '',
        payment: p.paymentMethod || '',
        amount: p.amount !== null ? formatCurrencyWithCommas(p.amount) : '0.00',
        paidAt: formatDateTime(p.paidAt),
        doctorName: p.doctorName || '',
        visitType: p.visitType || '',
        visitDate: formatDateTime(p.visitDate),
        insuranceProvider: p.insuranceProvider || '',
        insuranceAmount: p.insuranceAmount !== null ? formatCurrencyWithCommas(p.insuranceAmount) : '0.00',
        insurancePaidAmount: p.insurancePaidAmount !== null ? formatCurrencyWithCommas(p.insurancePaidAmount) : '0.00',
        insuranceDiscount: p.insuranceDiscount !== null ? formatCurrencyWithCommas(p.insuranceDiscount) : '0.00'
      }));
      setPatientRows(patients);
      setFilteredPatientRows(patients);

      setStatus(`${t.status.loaded} | ${t.status.doctors}: ${doctors.length} | ${t.status.patients}: ${patients.length} (${elapsed}ms)`, 'success');

    } catch (err) {
      console.error('🚨 Load error:', err);
      setStatus(t.status.error, 'error');
      alert(t.alert.loadError);
    } finally {
      setLoading(false);
    }
  }, [fromDate, toDate, paymentType, paymentMap, t, loadClinicData, loadPatientsData]);

  const refreshData = useCallback(() => {
    loadAllData();
  }, [loadAllData]);

  // ---------- Export to CSV ----------
  const exportData = useCallback(() => {
    if (doctorRows.length === 0 && patientRows.length === 0) {
      alert(t.alert.noData);
      return;
    }

    try {
      setStatus(t.status.exporting, 'loading');

      let csv = '';

      csv += 'Clinic Payment Report\n\n';
      csv += 'Summary\n';
      csv += `Cash Total,${formatCurrencyWithCommas(summary.cashTotal)}\n`;
      csv += `POS Total,${formatCurrencyWithCommas(summary.posTotal)}\n`;
      csv += `Insurance Total,${formatCurrencyWithCommas(summary.insuranceTotal)}\n`;
      csv += `Insurance Discount,${formatCurrencyWithCommas(summary.insuranceDiscount)}\n`;
      csv += `Free Visits,${summary.freeVisits}\n`;
      csv += `Grand Total,${formatCurrencyWithCommas(summary.grandTotal)}\n\n`;

      csv += 'Doctors Summary\n';
      csv += 'Doctor Name,Cash,POS,Insurance,Insurance Discount,Free,Total\n';
      doctorRows.forEach(row => {
        csv += `${row.name},${row.cash},${row.pos},${row.insurance},${row.insuranceDiscount},${row.free},${row.total}\n`;
      });
      csv += '\n';

      csv += 'Patient Details\n';
      csv += 'Payment ID,Patient Name,Payment Type,Amount,Paid At,Doctor,Visit Type,Visit Date,Insurance Provider,Insurance Amount,Insurance Paid,Insurance Discount\n';
      filteredPatientRows.forEach(row => {
        csv += `${row.id},${row.name},${row.payment},${row.amount},${row.paidAt},${row.doctorName},${row.visitType},${row.visitDate},${row.insuranceProvider},${row.insuranceAmount},${row.insurancePaidAmount},${row.insuranceDiscount}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `clinic-payment-report_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      setStatus(t.status.exported, 'success');
      alert(t.alert.exportSuccess);

    } catch (err) {
      console.error('🚨 Export error:', err);
      setStatus(t.status.exportError, 'error');
      alert(t.alert.exportError);
    }
  }, [doctorRows, filteredPatientRows, summary, t]);

  // ---------- Filter Patients ----------
  useEffect(() => {
    if (patientSearch.trim() === '') {
      setFilteredPatientRows(patientRows);
    } else {
      const searchLower = patientSearch.toLowerCase();
      const filtered = patientRows.filter(row => {
        return (
          row.name.toLowerCase().includes(searchLower) ||
          row.id.toLowerCase().includes(searchLower) ||
          row.doctorName.toLowerCase().includes(searchLower) ||
          row.payment.toLowerCase().includes(searchLower)
        );
      });
      setFilteredPatientRows(filtered);
    }
  }, [patientSearch, patientRows]);

  // ---------- Initial Load ----------
  useEffect(() => {
    loadAllData();
  }, []);

  // ---------- Payment Badge Color ----------
  const getPaymentBadgeClass = (paymentType) => {
    const type = paymentType.toUpperCase();
    switch (type) {
      case 'CASH': return 'cash';
      case 'POS': return 'pos';
      case 'INSURANCE': return 'insurance';
      case 'FREE': return 'free';
      default: return 'default';
    }
  };

  // ---------- Render Components ----------
  const renderSummaryCards = () => {
    const cards = [
      { key: 'cash', title: t.summary.cash, value: formatCurrencyWithCommas(summary.cashTotal), emoji: '💰', cls: 'cash' },
      { key: 'pos', title: t.summary.pos, value: formatCurrencyWithCommas(summary.posTotal), emoji: '💳', cls: 'pos' },
      { key: 'insurance', title: t.summary.insurance, value: formatCurrencyWithCommas(summary.insuranceTotal), emoji: '🏥', cls: 'insurance' },
      { key: 'insuranceDiscount', title: t.summary.insuranceDiscount, value: formatCurrencyWithCommas(summary.insuranceDiscount), emoji: '💸', cls: 'insurance-discount' },
      { key: 'free', title: t.summary.free, value: summary.freeVisits, emoji: '🎁', cls: 'free' },
      { key: 'total', title: t.summary.total, value: formatCurrencyWithCommas(summary.grandTotal), emoji: '📊', cls: 'total' }
    ];

    return (
      <div className="payment-summary">
        {cards.map((card) => (
          <div key={card.key} className={`card ${card.cls}`}>
            <div className="card-title">
              <span className="card-emoji">{card.emoji}</span> {card.title}
            </div>
            <div className="card-value">{card.value}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderDoctorTable = () => {
    if (doctorRows.length === 0) {
      return <div className="payment-empty">No doctor data available</div>;
    }

    return (
      <div className="payment-table-wrapper">
        <table className="payment-table">
          <thead>
            <tr>
              <th>{t.doctor.name}</th>
              <th>{t.doctor.cash}</th>
              <th>{t.doctor.pos}</th>
              <th>{t.doctor.insurance}</th>
              <th>{t.doctor.insuranceDiscount}</th>
              <th>{t.doctor.free}</th>
              <th>{t.doctor.total}</th>
            </tr>
          </thead>
          <tbody>
            {doctorRows.map((row, index) => {
              const total = parseAmount(row.total);
              const isHighlight = total > 1000;
              return (
                <tr key={index} className={isHighlight ? 'highlight-row' : ''}>
                  <td data-label={t.doctor.name}>{row.name}</td>
                  <td data-label={t.doctor.cash}>{row.cash}</td>
                  <td data-label={t.doctor.pos}>{row.pos}</td>
                  <td data-label={t.doctor.insurance}>{row.insurance}</td>
                  <td data-label={t.doctor.insuranceDiscount}>{row.insuranceDiscount}</td>
                  <td data-label={t.doctor.free}>{row.free}</td>
                  <td data-label={t.doctor.total}>{row.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPatientTable = () => {
    if (filteredPatientRows.length === 0) {
      return <div className="payment-empty">No patient data available</div>;
    }

    return (
      <div className="payment-table-wrapper">
        <table className="payment-table">
          <thead>
            <tr>
              <th>{t.patient.id}</th>
              <th>{t.patient.name}</th>
              <th>{t.patient.paymentType}</th>
              <th>{t.patient.amount}</th>
              <th>{t.patient.insuranceAmount}</th>
              <th>{t.patient.insurancePaid}</th>
              <th>{t.patient.insuranceDiscount}</th>
              <th>{t.patient.paidAt}</th>
              <th>{t.patient.doctorName}</th>
              <th>{t.patient.visitType}</th>
              <th>{t.patient.visitDate}</th>
              <th>{t.patient.insuranceProvider}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatientRows.map((row, index) => (
              <tr key={index}>
                <td data-label={t.patient.id}>{row.id}</td>
                <td data-label={t.patient.name}>{row.name}</td>
                <td data-label={t.patient.paymentType}>
                  <span className={`payment-badge ${getPaymentBadgeClass(row.payment)}`}>
                    {row.payment}
                  </span>
                </td>
                <td data-label={t.patient.amount}>{row.amount}</td>
                <td data-label={t.patient.insuranceAmount}>{row.insuranceAmount}</td>
                <td data-label={t.patient.insurancePaid}>{row.insurancePaidAmount}</td>
                <td data-label={t.patient.insuranceDiscount}>{row.insuranceDiscount}</td>
                <td data-label={t.patient.paidAt}>{row.paidAt}</td>
                <td data-label={t.patient.doctorName}>{row.doctorName}</td>
                <td data-label={t.patient.visitType}>{row.visitType}</td>
                <td data-label={t.patient.visitDate}>{row.visitDate}</td>
                <td data-label={t.patient.insuranceProvider}>{row.insuranceProvider}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // ---------- Render ----------
  return (
    <>
      <style>{styles}</style>
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <div className="title">📊 {t.title}</div>
          <div className="actions">
            <button 
              className="load" 
              onClick={loadAllData}
              disabled={loading}
            >
              📊 {t.filter.load}
            </button>
            <button 
              className="refresh" 
              onClick={refreshData}
              disabled={loading}
            >
              🔄 {t.filter.refresh}
            </button>
            <button 
              className="export" 
              onClick={exportData}
              disabled={loading || (doctorRows.length === 0 && patientRows.length === 0)}
            >
              📥 {t.filter.export}
            </button>
            <span className={`status ${statusMessage.type}`}>
              {statusMessage.text}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="payment-filters">
          <div className="filter-group">
            <label>{t.filter.from}</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>{t.filter.to}</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>{t.filter.paymentType}</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="ALL">All Types</option>
              <option value={t.payment.cash}>{t.payment.cash}</option>
              <option value={t.payment.pos}>{t.payment.pos}</option>
              <option value={t.payment.insurance}>{t.payment.insurance}</option>
              <option value={t.payment.free}>{t.payment.free}</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        {renderSummaryCards()}

        {/* Tables */}
        <div className="payment-tables">
          {/* Doctor Table */}
          <div className="payment-table-section">
            <div className="section-title">👨‍⚕️ {t.doctor.title}</div>
            {loading ? (
              <div className="payment-loading">⏳ Loading...</div>
            ) : (
              renderDoctorTable()
            )}
            <div className="payment-table-count">
              {t.doctor.count}: {doctorRows.length}
            </div>
          </div>

          {/* Patient Table */}
          <div className="payment-table-section">
            <div className="section-title">📋 {t.patient.title}</div>
            <div className="search-box">
              <span>🔍</span>
              <input
                type="text"
                placeholder={t.patient.search}
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
              />
            </div>
            {loading ? (
              <div className="payment-loading">⏳ Loading...</div>
            ) : (
              renderPatientTable()
            )}
            <div className="payment-table-count">
              {t.status.patients}: {filteredPatientRows.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClinicPaymentReportScreen;