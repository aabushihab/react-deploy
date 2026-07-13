// import React, { useState, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Translations ----------
// const translations = {
//   en: {
//     title: 'Visit Tracking',
//     search: {
//       name: 'Name',
//       mobile: 'Mobile',
//       placeholder: 'Search by name or mobile...',
//     },
//     btn: {
//       search: 'Search',
//       clear: 'Clear',
//       start: 'Start Visit',
//       end: 'End Visit',
//       pay: 'Payment',
//       view: 'View',
//       yes: 'Yes',
//       no: 'No',
//       close: 'Close',
//       cancel: 'Cancel',
//       table: 'Table',
//       cards: 'Cards',
//     },
//     col: {
//       id: 'ID',
//       patient: 'Patient',
//       doctor: 'Doctor',
//       type: 'Type',
//       status: 'Status',
//       payment: 'Payment',
//       amount: 'Amount',
//       insurancePaid: 'Insurance Paid',
//       remaining: 'Remaining',
//       details: 'Details',
//     },
//     status: {
//       ready: 'Ready',
//       loading: 'Loading...',
//       found: 'Found',
//       cleared: 'Cleared',
//       visit: 'Visit',
//       success: 'successfully',
//     },
//     msg: {
//       enterSearchValue: 'Please enter a search value',
//       noPatients: 'No patients found',
//       selectVisit: 'Please select a visit',
//       visitActionFailedHttp: 'Visit {0} failed (HTTP {1})',
//       visitActionFailedError: 'Visit {0} failed: {1}',
//       noInsuranceId: 'No insurance ID found',
//       insuranceMarked: 'Insurance marked as paid',
//       insuranceFailed: 'Failed to mark insurance as paid',
//       insuranceServiceError: 'Insurance service error',
//       paymentDetailsFailed: 'Failed to load payment details',
//       paymentDetailsError: 'Error loading payment details',
//       searchFailed: 'Search failed',
//     },
//     confirm: {
//       title: 'Confirm',
//       header: 'Insurance Payment',
//       message: 'Mark insurance as paid?',
//     },
//     payment: {
//       details: {
//         title: 'Payment Details',
//       },
//       original: 'Original Amount',
//       insurance: 'Insurance Amount',
//       insurancePaid: 'Insurance Paid',
//       insuranceDiscount: 'Insurance Discount',
//       patientPaid: 'Patient Paid',
//       remaining: 'Remaining',
//       transactions: 'Transactions',
//     },
//     label: {
//       visits: 'visits',
//     },
//     alert: {
//       title: 'Information',
//     },
//   },
//   ar: {
//     title: 'تتبع الزيارات',
//     search: {
//       name: 'الاسم',
//       mobile: 'الجوال',
//       placeholder: 'ابحث بالاسم أو رقم الجوال...',
//     },
//     btn: {
//       search: 'بحث',
//       clear: 'مسح',
//       start: 'بدء الزيارة',
//       end: 'إنهاء الزيارة',
//       pay: 'دفع',
//       view: 'عرض',
//       yes: 'نعم',
//       no: 'لا',
//       close: 'إغلاق',
//       cancel: 'إلغاء',
//       table: 'جدول',
//       cards: 'بطاقات',
//     },
//     col: {
//       id: 'الرقم',
//       patient: 'المريض',
//       doctor: 'الطبيب',
//       type: 'النوع',
//       status: 'الحالة',
//       payment: 'الدفع',
//       amount: 'المبلغ',
//       insurancePaid: 'دفع التأمين',
//       remaining: 'المتبقي',
//       details: 'التفاصيل',
//     },
//     status: {
//       ready: 'جاهز',
//       loading: 'جاري التحميل...',
//       found: 'تم العثور على',
//       cleared: 'تم المسح',
//       visit: 'الزيارة',
//       success: 'بنجاح',
//     },
//     msg: {
//       enterSearchValue: 'يرجى إدخال قيمة للبحث',
//       noPatients: 'لم يتم العثور على مرضى',
//       selectVisit: 'يرجى تحديد زيارة',
//       visitActionFailedHttp: 'فشل {0} الزيارة (HTTP {1})',
//       visitActionFailedError: 'فشل {0} الزيارة: {1}',
//       noInsuranceId: 'لم يتم العثور على رقم تأمين',
//       insuranceMarked: 'تم تحديد التأمين كمدفوع',
//       insuranceFailed: 'فشل تحديد التأمين كمدفوع',
//       insuranceServiceError: 'خطأ في خدمة التأمين',
//       paymentDetailsFailed: 'فشل تحميل تفاصيل الدفع',
//       paymentDetailsError: 'خطأ في تحميل تفاصيل الدفع',
//       searchFailed: 'فشل البحث',
//     },
//     confirm: {
//       title: 'تأكيد',
//       header: 'دفع التأمين',
//       message: 'تأكيد دفع التأمين؟',
//     },
//     payment: {
//       details: {
//         title: 'تفاصيل الدفع',
//       },
//       original: 'المبلغ الأصلي',
//       insurance: 'مبلغ التأمين',
//       insurancePaid: 'المدفوع من التأمين',
//       insuranceDiscount: 'خصم التأمين',
//       patientPaid: 'المدفوع من المريض',
//       remaining: 'المتبقي',
//       transactions: 'المعاملات',
//     },
//     label: {
//       visits: 'زيارات',
//     },
//     alert: {
//       title: 'معلومات',
//     },
//   },
// };

// // ---------- Main Component ----------
// const VisitTrackingScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   const t = translations[lang] || translations.en;

//   // ---------- State ----------
//   const [searchBy, setSearchBy] = useState('name');
//   const [searchText, setSearchText] = useState('');
//   const [visits, setVisits] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [selectedVisit, setSelectedVisit] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [viewMode, setViewMode] = useState('table');

//   // ---------- Helper: log action ----------
//   const logAction = useCallback(async (action, details) => {
//     try {
//       await fetch(`${BASE_URL}/api/logs/add`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: loggedUser, action, details }),
//       });
//     } catch (e) { /* ignore */ }
//   }, [loggedUser]);

//   // ---------- Fetch visits by patient IDs ----------
//   const fetchVisits = useCallback(async (patientIds) => {
//     if (!patientIds || patientIds.length === 0) {
//       setVisits([]);
//       setFilteredVisits([]);
//       return;
//     }

//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);

//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/patients`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(patientIds),
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();
//       console.log('Visits data:', data);

//       // Parse the response - it's a map of patientId -> visits array
//       let allVisits = [];
//       for (const key in data) {
//         const visitArray = data[key];
//         if (Array.isArray(visitArray)) {
//           visitArray.forEach(v => {
//             allVisits.push(parseVisit(v));
//           });
//         }
//       }

//       setVisits(allVisits);
//       setFilteredVisits(allVisits);
//       setStatusMsg(`✅ ${t.status.found} ${allVisits.length} ${t.label.visits}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${err.message}`);
//       setVisits([]);
//       setFilteredVisits([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [t]);

//   // ---------- Parse a single visit ----------
//   const parseVisit = (v) => {
//     const p = v.patient || {};
//     const d = v.doctor || {};

//     let originalAmount = v.originalAmount || 0;
//     let paidAmount = 0;
//     let paymentMethod = 'FREE';
//     let insurancePaid = false;
//     let insuranceFormId = null;
//     let insuranceCardId = null;

//     const payments = v.payments || [];

//     let hasCash = false;
//     let hasPos = false;
//     let hasInsurance = false;

//     payments.forEach(pay => {
//       const method = pay.paymentMethod;
//       const amount = pay.amount || 0;

//       if (method === 'CASH') hasCash = true;
//       if (method === 'POS') hasPos = true;
//       if (method === 'INSURANCE') {
//         hasInsurance = true;
//         insurancePaid = pay.insurancePaid || false;
//         insuranceFormId = pay.insuranceFormId || null;
//         insuranceCardId = pay.insuranceCardId || null;
//       }
//       paidAmount += amount;
//     });

//     if (hasInsurance) paymentMethod = 'INSURANCE';
//     else if (hasCash && hasPos) paymentMethod = 'CASH + POS';
//     else if (hasCash) paymentMethod = 'CASH';
//     else if (hasPos) paymentMethod = 'POS';

//     const totalPaid = paidAmount || 0;
//     const remaining = Math.max(0, originalAmount - totalPaid);

//     return {
//       id: v.id,
//       patientId: p.id || null,
//       patientName: p.fullName || `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Unknown',
//       doctorName: d.fullName || `${d.firstName || ''} ${d.lastName || ''}`.trim() || 'Unknown',
//       visitType: v.visitType || 'N/A',
//       visitStatus: v.visitStatus || 'NEW',
//       paid: v.paid ? 'YES' : 'NO',
//       paymentMethod: paymentMethod,
//       amount: originalAmount,
//       totalPaid: totalPaid,
//       remaining: remaining,
//       insurancePaid: insurancePaid,
//       insuranceFormId: insuranceFormId,
//       insuranceCardId: insuranceCardId,
//       payments: payments,
//     };
//   };

//   // ---------- Search handlers ----------
//   const performSearch = useCallback(async () => {
//     if (!searchText || searchText.trim().length < 2) {
//       setStatusMsg(`⚠️ ${t.msg.enterSearchValue}`);
//       return;
//     }

//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);

//     try {
//       const endpoint = searchBy === 'mobile'
//         ? `${BASE_URL}/api/patients/search/mobile/${encodeURIComponent(searchText)}`
//         : `${BASE_URL}/api/patients/search/name/${encodeURIComponent(searchText)}`;

//       const res = await fetch(endpoint);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const patients = await res.json();
//       const patientIds = patients.map(p => p.id);

//       if (patientIds.length === 0) {
//         setStatusMsg(`📭 ${t.msg.noPatients}`);
//         setVisits([]);
//         setFilteredVisits([]);
//         setLoading(false);
//         return;
//       }

//       await fetchVisits(patientIds);
//       logAction('SEARCH_VISITS', `Searched by ${searchBy} = ${searchText}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.msg.searchFailed}: ${err.message}`);
//       setVisits([]);
//       setFilteredVisits([]);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchBy, searchText, fetchVisits, t, logAction]);

//   const clearSearch = useCallback(() => {
//     setSearchText('');
//     setVisits([]);
//     setFilteredVisits([]);
//     setSelectedVisit(null);
//     setStatusMsg(`🗑️ ${t.status.cleared}`);
//   }, [t]);

//   // ---------- Visit actions ----------
//   const updateVisitStatus = async (visitId, action) => {
//     if (!selectedVisit && !visitId) {
//       alert(t.msg.selectVisit);
//       return;
//     }

//     const id = visitId || selectedVisit?.id;
//     if (!id) return;

//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/${id}/${action}`, {
//         method: 'PUT',
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       // Update local state
//       const updatedVisits = filteredVisits.map(v => {
//         if (v.id === id) {
//           if (action === 'start') {
//             return { ...v, visitStatus: 'IN_PROGRESS' };
//           } else if (action === 'end') {
//             return { ...v, visitStatus: 'COMPLETED' };
//           }
//         }
//         return v;
//       });

//       setFilteredVisits(updatedVisits);
//       setVisits(visits.map(v => {
//         if (v.id === id) {
//           if (action === 'start') {
//             return { ...v, visitStatus: 'IN_PROGRESS' };
//           } else if (action === 'end') {
//             return { ...v, visitStatus: 'COMPLETED' };
//           }
//         }
//         return v;
//       }));

//       // Update selected visit
//       if (selectedVisit && selectedVisit.id === id) {
//         setSelectedVisit(prev => ({
//           ...prev,
//           visitStatus: action === 'start' ? 'IN_PROGRESS' : 'COMPLETED'
//         }));
//       }

//       setStatusMsg(`✅ ${t.status.visit} ${action}ed ${t.status.success}`);
//       logAction(`VISIT_${action.toUpperCase()}`, `${action}ed visit ${id}`);
//     } catch (err) {
//       alert(`${t.msg.visitActionFailedError.replace('{0}', action).replace('{1}', err.message)}`);
//     }
//   };

//   const handleStartVisit = () => updateVisitStatus(null, 'start');
//   const handleEndVisit = () => updateVisitStatus(null, 'end');

//   const handlePayment = () => {
//     if (!selectedVisit) {
//       alert(t.msg.selectVisit);
//       return;
//     }
//     alert(`💰 Payment for visit ${selectedVisit.id}\nRemaining: ${selectedVisit.remaining}`);
//     // This would open a payment modal in a real implementation
//   };

//   const handleMarkInsurancePaid = async (visitId) => {
//     if (!window.confirm(t.confirm.message)) return;

//     const visit = filteredVisits.find(v => v.id === visitId);
//     if (!visit) return;

//     try {
//       const insuranceId = visit.insuranceFormId || visit.insuranceCardId;
//       if (!insuranceId) {
//         alert(t.msg.noInsuranceId);
//         return;
//       }

//       const params = new URLSearchParams();
//       if (visit.insuranceFormId) params.append('insuranceFormId', visit.insuranceFormId);
//       if (visit.insuranceCardId) params.append('insuranceCardId', visit.insuranceCardId);

//       const res = await fetch(`${BASE_URL}/api/visits/mark-insurance-paid?${params.toString()}`, {
//         method: 'PUT',
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       // Update local state
//       const updatedVisits = filteredVisits.map(v => {
//         if (v.id === visitId) {
//           return { ...v, insurancePaid: true };
//         }
//         return v;
//       });

//       setFilteredVisits(updatedVisits);
//       setVisits(visits.map(v => {
//         if (v.id === visitId) {
//           return { ...v, insurancePaid: true };
//         }
//         return v;
//       }));

//       if (selectedVisit && selectedVisit.id === visitId) {
//         setSelectedVisit(prev => ({ ...prev, insurancePaid: true }));
//       }

//       setStatusMsg(`✅ ${t.msg.insuranceMarked}`);
//       logAction('MARK_INSURANCE_PAID', `Marked insurance paid for visit ${visitId}`);
//     } catch (err) {
//       alert(`${t.msg.insuranceFailed}: ${err.message}`);
//     }
//   };

//   const showPaymentDetails = async (visitId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/${visitId}/payments`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();
//       console.log('Payment details:', data);

//       let msg = `💳 Payment Details for Visit #${visitId}\n\n`;
//       msg += `Original Amount: ${data.originalAmount || 0}\n`;
//       msg += `Insurance Amount: ${data.insuranceAmount || 0}\n`;
//       msg += `Insurance Paid: ${data.insurancePaidAmount || 0}\n`;
//       msg += `Insurance Discount: ${data.insuranceDiscount || 0}\n`;
//       msg += `Patient Paid: ${data.patientPaid || 0}\n`;
//       msg += `Remaining: ${data.remainingAmount || 0}\n\n`;
//       msg += `--- Transactions ---\n`;

//       (data.payments || []).forEach(p => {
//         msg += `${p.paymentMethod} | ${p.amount} | ${p.paidAt || ''}\n`;
//       });

//       alert(msg);
//     } catch (err) {
//       alert(`${t.msg.paymentDetailsFailed}: ${err.message}`);
//     }
//   };

//   // ---------- Determine if row should be disabled ----------
//   const shouldDisableRow = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     return visit.visitStatus === 'CLOSED' && visit.amount > 0 && remaining === 0;
//   };

//   // ---------- Check if actions are available ----------
//   const canStartVisit = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     const isNew = ['NEW', 'CREATED'].includes(visit.visitStatus);
//     const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
//     const isSpecial = visit.visitStatus === 'CREATED' && visit.amount > 0 && remaining === 0;
//     return (isNew && notPaid) || isSpecial;
//   };

//   const canEndVisit = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     const isInProgress = visit.visitStatus === 'IN_PROGRESS';
//     const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
//     const isSpecial = visit.visitStatus === 'IN_PROGRESS' && remaining === 0 && visit.amount > 0;
//     return (isInProgress && notPaid) || isSpecial;
//   };

//   const canPay = (visit) => {
//     if (!visit) return false;
//     return visit.paid !== 'YES' && !visit.insurancePaid;
//   };

//   // ---------- Render table ----------
//   const renderTable = () => {
//     if (filteredVisits.length === 0) {
//       return <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 No visits found</div>;
//     }

//     return (
//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th style={thStyle}>ID</th>
//               <th style={thStyle}>Patient</th>
//               <th style={thStyle}>Doctor</th>
//               <th style={thStyle}>Type</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Payment</th>
//               <th style={thStyle}>Amount</th>
//               <th style={thStyle}>Insurance Paid</th>
//               <th style={thStyle}>Remaining</th>
//               <th style={thStyle}>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredVisits.map(visit => {
//               const disabled = shouldDisableRow(visit);
//               const remaining = Math.max(0, visit.amount - visit.totalPaid);

//               return (
//                 <tr
//                   key={visit.id}
//                   onClick={() => {
//                     setSelectedVisit(visit);
//                     logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
//                   }}
//                   style={{
//                     cursor: 'pointer',
//                     background: selectedVisit?.id === visit.id ? '#ebf8ff' : (disabled ? '#f7fafc' : 'white'),
//                     opacity: disabled ? 0.6 : 1,
//                     borderBottom: '1px solid #eee'
//                   }}
//                 >
//                   <td style={tdStyle}>{visit.id}</td>
//                   <td style={tdStyle}>{visit.patientName}</td>
//                   <td style={tdStyle}>{visit.doctorName}</td>
//                   <td style={tdStyle}>{visit.visitType}</td>
//                   <td style={tdStyle}>
//                     <span style={{
//                       color: visit.visitStatus === 'IN_PROGRESS' ? '#48bb78' :
//                         visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? '#4299e1' :
//                         '#718096',
//                       fontWeight: 'bold'
//                     }}>
//                       {visit.visitStatus}
//                     </span>
//                   </td>
//                   <td style={tdStyle}>{visit.paymentMethod}</td>
//                   <td style={tdStyle}>{visit.amount.toFixed(2)}</td>
//                   <td style={tdStyle}>
//                     {visit.paymentMethod === 'INSURANCE' && (
//                       <input
//                         type="checkbox"
//                         checked={visit.insurancePaid || false}
//                         disabled={visit.insurancePaid}
//                         onChange={() => handleMarkInsurancePaid(visit.id)}
//                         style={{ cursor: 'pointer' }}
//                       />
//                     )}
//                   </td>
//                   <td style={{ ...tdStyle, color: remaining === 0 ? '#48bb78' : '#e53e3e', fontWeight: 'bold' }}>
//                     {remaining.toFixed(2)}
//                   </td>
//                   <td style={tdStyle}>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         showPaymentDetails(visit.id);
//                       }}
//                       style={{
//                         background: disabled ? '#fc8181' : '#4299e1',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: 6,
//                         padding: '4px 12px',
//                         cursor: 'pointer',
//                         fontSize: 12,
//                       }}
//                     >
//                       📋 {t.btn.view}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   // ---------- Render cards ----------
//   const renderCards = () => {
//     if (filteredVisits.length === 0) {
//       return <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 No visits found</div>;
//     }

//     return (
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
//         {filteredVisits.map(visit => {
//           const disabled = shouldDisableRow(visit);
//           const remaining = Math.max(0, visit.amount - visit.totalPaid);

//           return (
//             <div
//               key={visit.id}
//               onClick={() => {
//                 setSelectedVisit(visit);
//                 logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
//               }}
//               style={{
//                 background: selectedVisit?.id === visit.id ? '#ebf8ff' : 'white',
//                 borderRadius: 12,
//                 padding: 15,
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//                 border: selectedVisit?.id === visit.id ? '2px solid #4299e1' : '1px solid #edf2f7',
//                 cursor: 'pointer',
//                 opacity: disabled ? 0.6 : 1,
//               }}
//             >
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
//                 <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>
//                   #{visit.id}
//                 </span>
//                 <span style={{ fontWeight: 'bold' }}>{visit.patientName}</span>
//                 <span style={{
//                   background: visit.visitStatus === 'IN_PROGRESS' ? '#48bb78' :
//                     visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? '#4299e1' :
//                     '#edf2f7',
//                   color: ['IN_PROGRESS', 'NEW', 'CREATED'].includes(visit.visitStatus) ? 'white' : '#4a5568',
//                   borderRadius: 12,
//                   padding: '2px 10px',
//                   fontSize: 11,
//                 }}>
//                   {visit.visitStatus}
//                 </span>
//               </div>
//               <div style={{ fontSize: 13, color: '#4a5568' }}>
//                 <div>👨‍⚕️ {visit.doctorName}</div>
//                 <div>📋 {visit.visitType} | 💳 {visit.paymentMethod}</div>
//                 <div>💰 {visit.amount.toFixed(2)} | Remaining: <span style={{ color: remaining === 0 ? '#48bb78' : '#e53e3e', fontWeight: 'bold' }}>{remaining.toFixed(2)}</span></div>
//                 {visit.paymentMethod === 'INSURANCE' && (
//                   <div style={{ marginTop: 4 }}>
//                     <label style={{ fontSize: 12 }}>
//                       <input
//                         type="checkbox"
//                         checked={visit.insurancePaid || false}
//                         disabled={visit.insurancePaid}
//                         onChange={(e) => {
//                           e.stopPropagation();
//                           handleMarkInsurancePaid(visit.id);
//                         }}
//                       /> Insurance Paid
//                     </label>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   showPaymentDetails(visit.id);
//                 }}
//                 style={{
//                   marginTop: 8,
//                   background: disabled ? '#fc8181' : '#4299e1',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: 6,
//                   padding: '4px 12px',
//                   cursor: 'pointer',
//                   fontSize: 12,
//                 }}
//               >
//                 📋 {t.btn.view}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ---------- Render ----------
//   return (
//     <div style={{ padding: 20, fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//         <h2>📋 {t.title}</h2>
//         <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.close}</button>
//       </div>

//       {/* Search Section */}
//       <div style={{
//         background: 'white',
//         borderRadius: 12,
//         padding: 15,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//         marginBottom: 20,
//       }}>
//         <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
//           <select
//             value={searchBy}
//             onChange={e => setSearchBy(e.target.value)}
//             style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
//           >
//             <option value="name">{t.search.name}</option>
//             <option value="mobile">{t.search.mobile}</option>
//           </select>
//           <input
//             type="text"
//             placeholder={t.search.placeholder}
//             value={searchText}
//             onChange={e => setSearchText(e.target.value)}
//             onKeyPress={e => e.key === 'Enter' && performSearch()}
//             style={{ flex: 1, padding: '8px 15px', borderRadius: 8, border: '1px solid #ccc', minWidth: 200 }}
//           />
//           <button
//             onClick={performSearch}
//             disabled={!searchText || searchText.trim().length < 2}
//             style={{
//               ...primaryBtn('#4299e1'),
//               opacity: !searchText || searchText.trim().length < 2 ? 0.5 : 1,
//             }}
//           >
//             🔍 {t.btn.search}
//           </button>
//           <button onClick={clearSearch} style={primaryBtn('#fc8181')}>
//             🗑️ {t.btn.clear}
//           </button>
//         </div>
//       </div>

//       {/* View Toggle */}
//       <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
//         <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
//           📋 {t.btn.table}
//         </button>
//         <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
//           🃏 {t.btn.cards}
//         </button>
//         <span style={{ marginLeft: 'auto', color: '#4a5568' }}>{statusMsg}</span>
//       </div>

//       {/* Content */}
//       <div style={{
//         background: 'white',
//         borderRadius: 12,
//         padding: 10,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         minHeight: 300,
//       }}>
//         {loading ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>⏳ Loading...</div>
//         ) : (
//           viewMode === 'table' ? renderTable() : renderCards()
//         )}
//       </div>

//       {/* Action Buttons */}
//       {selectedVisit && (
//         <div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', justifyContent: 'center' }}>
//           <button
//             onClick={handleStartVisit}
//             disabled={!canStartVisit(selectedVisit)}
//             style={{
//               ...primaryBtn(canStartVisit(selectedVisit) ? '#48bb78' : '#a0aec0'),
//               cursor: canStartVisit(selectedVisit) ? 'pointer' : 'default',
//             }}
//           >
//             ▶ {t.btn.start}
//           </button>
//           <button
//             onClick={handleEndVisit}
//             disabled={!canEndVisit(selectedVisit)}
//             style={{
//               ...primaryBtn(canEndVisit(selectedVisit) ? '#fc8181' : '#a0aec0'),
//               cursor: canEndVisit(selectedVisit) ? 'pointer' : 'default',
//             }}
//           >
//             ⏹ {t.btn.end}
//           </button>
//           <button
//             onClick={handlePayment}
//             disabled={!canPay(selectedVisit)}
//             style={{
//               ...primaryBtn(canPay(selectedVisit) ? '#48bb78' : '#a0aec0'),
//               cursor: canPay(selectedVisit) ? 'pointer' : 'default',
//             }}
//           >
//             💰 {t.btn.pay}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ---------- Style utilities ----------
// const primaryBtn = (bg) => ({
//   background: bg,
//   color: 'white',
//   fontWeight: 'bold',
//   border: 'none',
//   borderRadius: 8,
//   padding: '8px 16px',
//   cursor: 'pointer',
// });

// const secondaryBtn = {
//   background: '#e2e8f0',
//   border: 'none',
//   padding: '8px 16px',
//   borderRadius: 8,
//   cursor: 'pointer',
// };

// const toggleBtn = {
//   background: '#edf2f7',
//   border: '1px solid #e2e8f0',
//   borderRadius: 8,
//   padding: '8px 12px',
//   cursor: 'pointer',
// };

// const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };

// const thStyle = {
//   padding: 10,
//   background: '#f8f9fa',
//   textAlign: 'left',
//   borderBottom: '2px solid #e2e8f0',
// };

// const tdStyle = {
//   padding: 10,
//   borderBottom: '1px solid #eee',
// };

// export default VisitTrackingScreen;  01072026  11:30 pm

// import React, { useState, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import VisitPayScreen from './VisitPayScreen';

// // ---------- Translations ----------
// const translations = {
//   en: {
//     title: 'Visit Tracking',
//     search: {
//       name: 'Name',
//       mobile: 'Mobile',
//       placeholder: 'Search by name or mobile...',
//     },
//     btn: {
//       search: 'Search',
//       clear: 'Clear',
//       start: 'Start Visit',
//       end: 'End Visit',
//       pay: 'Payment',
//       view: 'View',
//       yes: 'Yes',
//       no: 'No',
//       close: 'Close',
//       cancel: 'Cancel',
//       table: 'Table',
//       cards: 'Cards',
//     },
//     col: {
//       id: 'ID',
//       patient: 'Patient',
//       doctor: 'Doctor',
//       type: 'Type',
//       status: 'Status',
//       payment: 'Payment',
//       amount: 'Amount',
//       insurancePaid: 'Insurance Paid',
//       remaining: 'Remaining',
//       details: 'Details',
//     },
//     status: {
//       ready: 'Ready',
//       loading: 'Loading...',
//       found: 'Found',
//       cleared: 'Cleared',
//       visit: 'Visit',
//       success: 'successfully',
//     },
//     msg: {
//       enterSearchValue: 'Please enter a search value',
//       noPatients: 'No patients found',
//       selectVisit: 'Please select a visit',
//       visitActionFailedHttp: 'Visit {0} failed (HTTP {1})',
//       visitActionFailedError: 'Visit {0} failed: {1}',
//       noInsuranceId: 'No insurance ID found',
//       insuranceMarked: 'Insurance marked as paid',
//       insuranceFailed: 'Failed to mark insurance as paid',
//       insuranceServiceError: 'Insurance service error',
//       paymentDetailsFailed: 'Failed to load payment details',
//       paymentDetailsError: 'Error loading payment details',
//       searchFailed: 'Search failed',
//       closeConfirm: 'Are you sure you want to close this screen?',
//       confirmClose: 'Confirm Close',
//     },
//     confirm: {
//       title: 'Confirm',
//       header: 'Insurance Payment',
//       message: 'Mark insurance as paid?',
//     },
//     payment: {
//       details: {
//         title: 'Payment Details',
//       },
//       original: 'Original Amount',
//       insurance: 'Insurance Amount',
//       insurancePaid: 'Insurance Paid',
//       insuranceDiscount: 'Insurance Discount',
//       patientPaid: 'Patient Paid',
//       remaining: 'Remaining',
//       transactions: 'Transactions',
//     },
//     label: {
//       visits: 'visits',
//     },
//     alert: {
//       title: 'Information',
//     },
//     tooltip: {
//       visitClosed: 'Visit not available',
//     },
//   },
//   ar: {
//     title: 'تتبع الزيارات',
//     search: {
//       name: 'الاسم',
//       mobile: 'الجوال',
//       placeholder: 'ابحث بالاسم أو رقم الجوال...',
//     },
//     btn: {
//       search: 'بحث',
//       clear: 'مسح',
//       start: 'بدء الزيارة',
//       end: 'إنهاء الزيارة',
//       pay: 'دفع',
//       view: 'عرض',
//       yes: 'نعم',
//       no: 'لا',
//       close: 'إغلاق',
//       cancel: 'إلغاء',
//       table: 'جدول',
//       cards: 'بطاقات',
//     },
//     col: {
//       id: 'الرقم',
//       patient: 'المريض',
//       doctor: 'الطبيب',
//       type: 'النوع',
//       status: 'الحالة',
//       payment: 'الدفع',
//       amount: 'المبلغ',
//       insurancePaid: 'دفع التأمين',
//       remaining: 'المتبقي',
//       details: 'التفاصيل',
//     },
//     status: {
//       ready: 'جاهز',
//       loading: 'جاري التحميل...',
//       found: 'تم العثور على',
//       cleared: 'تم المسح',
//       visit: 'الزيارة',
//       success: 'بنجاح',
//     },
//     msg: {
//       enterSearchValue: 'يرجى إدخال قيمة للبحث',
//       noPatients: 'لم يتم العثور على مرضى',
//       selectVisit: 'يرجى تحديد زيارة',
//       visitActionFailedHttp: 'فشل {0} الزيارة (HTTP {1})',
//       visitActionFailedError: 'فشل {0} الزيارة: {1}',
//       noInsuranceId: 'لم يتم العثور على رقم تأمين',
//       insuranceMarked: 'تم تحديد التأمين كمدفوع',
//       insuranceFailed: 'فشل تحديد التأمين كمدفوع',
//       insuranceServiceError: 'خطأ في خدمة التأمين',
//       paymentDetailsFailed: 'فشل تحميل تفاصيل الدفع',
//       paymentDetailsError: 'خطأ في تحميل تفاصيل الدفع',
//       searchFailed: 'فشل البحث',
//       closeConfirm: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
//       confirmClose: 'تأكيد الإغلاق',
//     },
//     confirm: {
//       title: 'تأكيد',
//       header: 'دفع التأمين',
//       message: 'تأكيد دفع التأمين؟',
//     },
//     payment: {
//       details: {
//         title: 'تفاصيل الدفع',
//       },
//       original: 'المبلغ الأصلي',
//       insurance: 'مبلغ التأمين',
//       insurancePaid: 'المدفوع من التأمين',
//       insuranceDiscount: 'خصم التأمين',
//       patientPaid: 'المدفوع من المريض',
//       remaining: 'المتبقي',
//       transactions: 'المعاملات',
//     },
//     label: {
//       visits: 'زيارات',
//     },
//     alert: {
//       title: 'معلومات',
//     },
//     tooltip: {
//       visitClosed: 'الزيارة غير متاحة',
//     },
//   },
// };

// // ---------- Main Component ----------
// const VisitTrackingScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   const t = translations[lang] || translations.en;

//   // ---------- State ----------
//   const [searchBy, setSearchBy] = useState('name');
//   const [searchText, setSearchText] = useState('');
//   const [visits, setVisits] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [selectedVisit, setSelectedVisit] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [viewMode, setViewMode] = useState('table');
//   const [showPayment, setShowPayment] = useState(false);

//   // ---------- Helper: log action ----------
//   const logAction = useCallback(async (action, details) => {
//     try {
//       await fetch(`${BASE_URL}/api/logs/add`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: loggedUser, action, details }),
//       });
//     } catch (e) { /* ignore */ }
//   }, [loggedUser]);

//   // ---------- Parse a single visit ----------
//   const parseVisit = (v) => {
//     const p = v.patient || {};
//     const d = v.doctor || {};

//     let originalAmount = v.originalAmount || 0;
//     let paidAmount = 0;
//     let paymentMethod = 'FREE';
//     let insurancePaid = false;
//     let insuranceFormId = null;
//     let insuranceCardId = null;

//     const payments = v.payments || [];

//     let hasCash = false;
//     let hasPos = false;
//     let hasInsurance = false;

//     payments.forEach(pay => {
//       const method = pay.paymentMethod;
//       const amount = pay.amount || 0;

//       if (method === 'CASH') hasCash = true;
//       if (method === 'POS') hasPos = true;
//       if (method === 'INSURANCE') {
//         hasInsurance = true;
//         insurancePaid = pay.insurancePaid || false;
//         insuranceFormId = pay.insuranceFormId || null;
//         insuranceCardId = pay.insuranceCardId || null;
//       }
//       paidAmount += amount;
//     });

//     if (hasInsurance) paymentMethod = 'INSURANCE';
//     else if (hasCash && hasPos) paymentMethod = 'CASH + POS';
//     else if (hasCash) paymentMethod = 'CASH';
//     else if (hasPos) paymentMethod = 'POS';

//     const totalPaid = paidAmount || 0;
//     const remaining = Math.max(0, originalAmount - totalPaid);

//     return {
//       id: v.id,
//       patientId: p.id || null,
//       patientName: p.fullName || `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Unknown',
//       doctorName: d.fullName || `${d.firstName || ''} ${d.lastName || ''}`.trim() || 'Unknown',
//       visitType: v.visitType || 'N/A',
//       visitStatus: v.visitStatus || 'NEW',
//       paid: v.paid ? 'YES' : 'NO',
//       paymentMethod: paymentMethod,
//       amount: originalAmount,
//       totalPaid: totalPaid,
//       remaining: remaining,
//       insurancePaid: insurancePaid,
//       insuranceFormId: insuranceFormId,
//       insuranceCardId: insuranceCardId,
//       payments: payments,
//     };
//   };

//   // ---------- Fetch visits by patient IDs ----------
//   const fetchVisits = useCallback(async (patientIds) => {
//     if (!patientIds || patientIds.length === 0) {
//       setVisits([]);
//       setFilteredVisits([]);
//       return;
//     }

//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);

//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/patients`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(patientIds),
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();
//       let allVisits = [];
//       for (const key in data) {
//         const visitArray = data[key];
//         if (Array.isArray(visitArray)) {
//           visitArray.forEach(v => {
//             allVisits.push(parseVisit(v));
//           });
//         }
//       }

//       setVisits(allVisits);
//       setFilteredVisits(allVisits);
//       setStatusMsg(`✅ ${t.status.found} ${allVisits.length} ${t.label.visits}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${err.message}`);
//       setVisits([]);
//       setFilteredVisits([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [t]);

//   // ---------- Search handlers ----------
//   const performSearch = useCallback(async () => {
//     if (!searchText || searchText.trim().length < 2) {
//       setStatusMsg(`⚠️ ${t.msg.enterSearchValue}`);
//       return;
//     }

//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);

//     try {
//       const endpoint = searchBy === 'mobile'
//         ? `${BASE_URL}/api/patients/search/mobile/${encodeURIComponent(searchText)}`
//         : `${BASE_URL}/api/patients/search/name/${encodeURIComponent(searchText)}`;

//       const res = await fetch(endpoint);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const patients = await res.json();
//       const patientIds = patients.map(p => p.id);

//       if (patientIds.length === 0) {
//         setStatusMsg(`📭 ${t.msg.noPatients}`);
//         setVisits([]);
//         setFilteredVisits([]);
//         setLoading(false);
//         return;
//       }

//       await fetchVisits(patientIds);
//       logAction('SEARCH_VISITS', `Searched by ${searchBy} = ${searchText}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.msg.searchFailed}: ${err.message}`);
//       setVisits([]);
//       setFilteredVisits([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchBy, searchText, fetchVisits, t, logAction]);

//   const clearSearch = useCallback(() => {
//     setSearchText('');
//     setVisits([]);
//     setFilteredVisits([]);
//     setSelectedVisit(null);
//     setStatusMsg(`🗑️ ${t.status.cleared}`);
//   }, [t]);

//   // ---------- Visit actions ----------
//   const updateVisitStatus = async (visitId, action) => {
//     if (!selectedVisit && !visitId) {
//       alert(t.msg.selectVisit);
//       return;
//     }

//     const id = visitId || selectedVisit?.id;
//     if (!id) return;

//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/${id}/${action}`, {
//         method: 'PUT',
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const updatedVisits = filteredVisits.map(v => {
//         if (v.id === id) {
//           if (action === 'start') {
//             return { ...v, visitStatus: 'IN_PROGRESS' };
//           } else if (action === 'end') {
//             return { ...v, visitStatus: 'COMPLETED' };
//           }
//         }
//         return v;
//       });

//       setFilteredVisits(updatedVisits);
//       setVisits(visits.map(v => {
//         if (v.id === id) {
//           if (action === 'start') {
//             return { ...v, visitStatus: 'IN_PROGRESS' };
//           } else if (action === 'end') {
//             return { ...v, visitStatus: 'COMPLETED' };
//           }
//         }
//         return v;
//       }));

//       if (selectedVisit && selectedVisit.id === id) {
//         setSelectedVisit(prev => ({
//           ...prev,
//           visitStatus: action === 'start' ? 'IN_PROGRESS' : 'COMPLETED'
//         }));
//       }

//       setStatusMsg(`✅ ${t.status.visit} ${action}ed ${t.status.success}`);
//       logAction(`VISIT_${action.toUpperCase()}`, `${action}ed visit ${id}`);
//     } catch (err) {
//       alert(`${t.msg.visitActionFailedError.replace('{0}', action).replace('{1}', err.message)}`);
//     }
//   };

//   const handleStartVisit = () => updateVisitStatus(null, 'start');
//   const handleEndVisit = () => updateVisitStatus(null, 'end');

//   const handlePaymentComplete = useCallback((amount) => {
//     if (selectedVisit) {
//       const newTotalPaid = selectedVisit.totalPaid + amount;
//       const newRemaining = Math.max(0, selectedVisit.amount - newTotalPaid);
      
//       setSelectedVisit(prev => ({
//         ...prev,
//         totalPaid: newTotalPaid,
//         remaining: newRemaining,
//       }));

//       const updateVisits = (list) => list.map(v => {
//         if (v.id === selectedVisit.id) {
//           return { ...v, totalPaid: newTotalPaid, remaining: newRemaining };
//         }
//         return v;
//       });

//       setFilteredVisits(updateVisits(filteredVisits));
//       setVisits(updateVisits(visits));
//     }
//   }, [selectedVisit, filteredVisits, visits]);

//   const handlePayment = () => {
//     if (!selectedVisit) {
//       alert(t.msg.selectVisit);
//       return;
//     }
//     setShowPayment(true);
//   };

//   const handleMarkInsurancePaid = async (visitId) => {
//     if (!window.confirm(t.confirm.message)) return;

//     const visit = filteredVisits.find(v => v.id === visitId);
//     if (!visit) return;

//     try {
//       const insuranceId = visit.insuranceFormId || visit.insuranceCardId;
//       if (!insuranceId) {
//         alert(t.msg.noInsuranceId);
//         return;
//       }

//       const params = new URLSearchParams();
//       if (visit.insuranceFormId) params.append('insuranceFormId', visit.insuranceFormId);
//       if (visit.insuranceCardId) params.append('insuranceCardId', visit.insuranceCardId);

//       const res = await fetch(`${BASE_URL}/api/visits/mark-insurance-paid?${params.toString()}`, {
//         method: 'PUT',
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const updatedVisits = filteredVisits.map(v => {
//         if (v.id === visitId) {
//           return { ...v, insurancePaid: true };
//         }
//         return v;
//       });

//       setFilteredVisits(updatedVisits);
//       setVisits(visits.map(v => {
//         if (v.id === visitId) {
//           return { ...v, insurancePaid: true };
//         }
//         return v;
//       }));

//       if (selectedVisit && selectedVisit.id === visitId) {
//         setSelectedVisit(prev => ({ ...prev, insurancePaid: true }));
//       }

//       setStatusMsg(`✅ ${t.msg.insuranceMarked}`);
//       logAction('MARK_INSURANCE_PAID', `Marked insurance paid for visit ${visitId}`);
//     } catch (err) {
//       alert(`${t.msg.insuranceFailed}: ${err.message}`);
//     }
//   };

//   const showPaymentDetails = async (visitId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/${visitId}/payments`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();

//       let msg = `💳 Payment Details for Visit #${visitId}\n\n`;
//       msg += `Original Amount: ${data.originalAmount || 0}\n`;
//       msg += `Insurance Amount: ${data.insuranceAmount || 0}\n`;
//       msg += `Insurance Paid: ${data.insurancePaidAmount || 0}\n`;
//       msg += `Insurance Discount: ${data.insuranceDiscount || 0}\n`;
//       msg += `Patient Paid: ${data.patientPaid || 0}\n`;
//       msg += `Remaining: ${data.remainingAmount || 0}\n\n`;
//       msg += `--- Transactions ---\n`;

//       (data.payments || []).forEach(p => {
//         msg += `${p.paymentMethod} | ${p.amount} | ${p.paidAt || ''}\n`;
//       });

//       alert(msg);
//     } catch (err) {
//       alert(`${t.msg.paymentDetailsFailed}: ${err.message}`);
//     }
//   };

//   // ---------- Determine if row should be disabled ----------
//   const shouldDisableRow = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     return visit.visitStatus === 'CLOSED' && visit.amount > 0 && remaining === 0;
//   };

//   // ---------- Check if actions are available ----------
//   const canStartVisit = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     const isNew = ['NEW', 'CREATED'].includes(visit.visitStatus);
//     const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
//     const isSpecial = visit.visitStatus === 'CREATED' && visit.amount > 0 && remaining === 0;
//     return (isNew && notPaid) || isSpecial;
//   };

//   const canEndVisit = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     const isInProgress = visit.visitStatus === 'IN_PROGRESS';
//     const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
//     const isSpecial = visit.visitStatus === 'IN_PROGRESS' && remaining === 0 && visit.amount > 0;
//     return (isInProgress && notPaid) || isSpecial;
//   };

//   const canPay = (visit) => {
//     if (!visit) return false;
//     return visit.paid !== 'YES' && !visit.insurancePaid;
//   };

//   // ---------- Render table ----------
//   const renderTable = () => {
//     if (filteredVisits.length === 0) {
//       return <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 No visits found</div>;
//     }

//     return (
//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th style={tableHeaderStyle}>ID</th>
//               <th style={tableHeaderStyle}>Patient</th>
//               <th style={tableHeaderStyle}>Doctor</th>
//               <th style={tableHeaderStyle}>Type</th>
//               <th style={tableHeaderStyle}>Status</th>
//               <th style={tableHeaderStyle}>Payment</th>
//               <th style={tableHeaderStyle}>Amount</th>
//               <th style={tableHeaderStyle}>Insurance Paid</th>
//               <th style={tableHeaderStyle}>Remaining</th>
//               <th style={tableHeaderStyle}>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredVisits.map(visit => {
//               const disabled = shouldDisableRow(visit);
//               const remaining = Math.max(0, visit.amount - visit.totalPaid);

//               return (
//                 <tr
//                   key={visit.id}
//                   onClick={() => {
//                     setSelectedVisit(visit);
//                     logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
//                   }}
//                   style={{
//                     cursor: disabled ? 'not-allowed' : 'pointer',
//                     background: selectedVisit?.id === visit.id ? '#ebf8ff' : (disabled ? '#f7fafc' : 'white'),
//                     opacity: disabled ? 0.6 : 1,
//                     borderBottom: '1px solid #eee'
//                   }}
//                 >
//                   <td style={tableCellStyle}>{visit.id}</td>
//                   <td style={tableCellStyle}>{visit.patientName}</td>
//                   <td style={tableCellStyle}>{visit.doctorName}</td>
//                   <td style={tableCellStyle}>{visit.visitType}</td>
//                   <td style={tableCellStyle}>
//                     <span style={{
//                       color: visit.visitStatus === 'IN_PROGRESS' ? '#48bb78' :
//                         visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? '#4299e1' :
//                         '#718096',
//                       fontWeight: 'bold'
//                     }}>
//                       {visit.visitStatus}
//                     </span>
//                   </td>
//                   <td style={tableCellStyle}>{visit.paymentMethod}</td>
//                   <td style={tableCellStyle}>{visit.amount.toFixed(2)}</td>
//                   <td style={tableCellStyle}>
//                     {visit.paymentMethod === 'INSURANCE' && (
//                       <input
//                         type="checkbox"
//                         checked={visit.insurancePaid || false}
//                         disabled={visit.insurancePaid}
//                         onChange={() => handleMarkInsurancePaid(visit.id)}
//                         style={{ cursor: 'pointer' }}
//                       />
//                     )}
//                   </td>
//                   <td style={{ ...tableCellStyle, color: remaining === 0 ? '#48bb78' : '#e53e3e', fontWeight: 'bold' }}>
//                     {remaining.toFixed(2)}
//                   </td>
//                   <td style={tableCellStyle}>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         showPaymentDetails(visit.id);
//                       }}
//                       style={{
//                         background: disabled ? '#fc8181' : '#4299e1',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: 6,
//                         padding: '4px 12px',
//                         cursor: 'pointer',
//                         fontSize: 12,
//                       }}
//                     >
//                       📋 {t.btn.view}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   // ---------- Render cards ----------
//   const renderCards = () => {
//     if (filteredVisits.length === 0) {
//       return <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 No visits found</div>;
//     }

//     return (
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
//         {filteredVisits.map(visit => {
//           const disabled = shouldDisableRow(visit);
//           const remaining = Math.max(0, visit.amount - visit.totalPaid);

//           return (
//             <div
//               key={visit.id}
//               onClick={() => {
//                 setSelectedVisit(visit);
//                 logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
//               }}
//               style={{
//                 background: selectedVisit?.id === visit.id ? '#ebf8ff' : 'white',
//                 borderRadius: 12,
//                 padding: 15,
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//                 border: selectedVisit?.id === visit.id ? '2px solid #4299e1' : '1px solid #edf2f7',
//                 cursor: disabled ? 'not-allowed' : 'pointer',
//                 opacity: disabled ? 0.6 : 1,
//               }}
//             >
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
//                 <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>
//                   #{visit.id}
//                 </span>
//                 <span style={{ fontWeight: 'bold' }}>{visit.patientName}</span>
//                 <span style={{
//                   background: visit.visitStatus === 'IN_PROGRESS' ? '#48bb78' :
//                     visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? '#4299e1' :
//                     '#edf2f7',
//                   color: ['IN_PROGRESS', 'NEW', 'CREATED'].includes(visit.visitStatus) ? 'white' : '#4a5568',
//                   borderRadius: 12,
//                   padding: '2px 10px',
//                   fontSize: 11,
//                 }}>
//                   {visit.visitStatus}
//                 </span>
//               </div>
//               <div style={{ fontSize: 13, color: '#4a5568' }}>
//                 <div>👨‍⚕️ {visit.doctorName}</div>
//                 <div>📋 {visit.visitType} | 💳 {visit.paymentMethod}</div>
//                 <div>💰 {visit.amount.toFixed(2)} | Remaining: <span style={{ color: remaining === 0 ? '#48bb78' : '#e53e3e', fontWeight: 'bold' }}>{remaining.toFixed(2)}</span></div>
//                 {visit.paymentMethod === 'INSURANCE' && (
//                   <div style={{ marginTop: 4 }}>
//                     <label style={{ fontSize: 12 }}>
//                       <input
//                         type="checkbox"
//                         checked={visit.insurancePaid || false}
//                         disabled={visit.insurancePaid}
//                         onChange={(e) => {
//                           e.stopPropagation();
//                           handleMarkInsurancePaid(visit.id);
//                         }}
//                       /> Insurance Paid
//                     </label>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   showPaymentDetails(visit.id);
//                 }}
//                 style={{
//                   marginTop: 8,
//                   background: disabled ? '#fc8181' : '#4299e1',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: 6,
//                   padding: '4px 12px',
//                   cursor: 'pointer',
//                   fontSize: 12,
//                 }}
//               >
//                 📋 {t.btn.view}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ---------- Render ----------
//   return (
//     <div style={{ padding: 20, fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//         <h2>📋 {t.title}</h2>
//         <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.close}</button>
//       </div>

//       {/* Search Section */}
//       <div style={{
//         background: 'white',
//         borderRadius: 12,
//         padding: 15,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//         marginBottom: 20,
//       }}>
//         <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
//           <select
//             value={searchBy}
//             onChange={e => setSearchBy(e.target.value)}
//             style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
//           >
//             <option value="name">{t.search.name}</option>
//             <option value="mobile">{t.search.mobile}</option>
//           </select>
//           <input
//             type="text"
//             placeholder={t.search.placeholder}
//             value={searchText}
//             onChange={e => setSearchText(e.target.value)}
//             onKeyPress={e => e.key === 'Enter' && performSearch()}
//             style={{ flex: 1, padding: '8px 15px', borderRadius: 8, border: '1px solid #ccc', minWidth: 200 }}
//           />
//           <button
//             onClick={performSearch}
//             disabled={!searchText || searchText.trim().length < 2}
//             style={{
//               ...primaryBtn('#4299e1'),
//               opacity: !searchText || searchText.trim().length < 2 ? 0.5 : 1,
//             }}
//           >
//             🔍 {t.btn.search}
//           </button>
//           <button onClick={clearSearch} style={primaryBtn('#fc8181')}>
//             🗑️ {t.btn.clear}
//           </button>
//         </div>
//       </div>

//       {/* View Toggle */}
//       <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
//         <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
//           📋 {t.btn.table}
//         </button>
//         <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
//           🃏 {t.btn.cards}
//         </button>
//         <span style={{ marginLeft: 'auto', color: '#4a5568' }}>{statusMsg}</span>
//       </div>

//       {/* Content */}
//       <div style={{
//         background: 'white',
//         borderRadius: 12,
//         padding: 10,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         minHeight: 300,
//       }}>
//         {loading ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>⏳ Loading...</div>
//         ) : (
//           viewMode === 'table' ? renderTable() : renderCards()
//         )}
//       </div>

//       {/* Action Buttons */}
//       {selectedVisit && (
//         <div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', justifyContent: 'center' }}>
//           <button
//             onClick={handleStartVisit}
//             disabled={!canStartVisit(selectedVisit)}
//             style={{
//               ...primaryBtn(canStartVisit(selectedVisit) ? '#48bb78' : '#a0aec0'),
//               cursor: canStartVisit(selectedVisit) ? 'pointer' : 'default',
//             }}
//           >
//             ▶ {t.btn.start}
//           </button>
//           <button
//             onClick={handleEndVisit}
//             disabled={!canEndVisit(selectedVisit)}
//             style={{
//               ...primaryBtn(canEndVisit(selectedVisit) ? '#fc8181' : '#a0aec0'),
//               cursor: canEndVisit(selectedVisit) ? 'pointer' : 'default',
//             }}
//           >
//             ⏹ {t.btn.end}
//           </button>
//           <button
//             onClick={handlePayment}
//             disabled={!canPay(selectedVisit)}
//             style={{
//               ...primaryBtn(canPay(selectedVisit) ? '#48bb78' : '#a0aec0'),
//               cursor: canPay(selectedVisit) ? 'pointer' : 'default',
//             }}
//           >
//             💰 {t.btn.pay}
//           </button>
//         </div>
//       )}

//       {/* Payment Modal */}
//       {showPayment && selectedVisit && (
//         <VisitPayScreen
//           visit={selectedVisit}
//           remaining={Math.max(0, selectedVisit.amount - selectedVisit.totalPaid)}
//           loggedUser={loggedUser}
//           onClose={() => setShowPayment(false)}
//           onPaymentComplete={handlePaymentComplete}
//         />
//       )}
//     </div>
//   );
// };

// // ---------- Style utilities ----------
// const primaryBtn = (bg) => ({
//   background: bg,
//   color: 'white',
//   fontWeight: 'bold',
//   border: 'none',
//   borderRadius: 8,
//   padding: '8px 16px',
//   cursor: 'pointer',
// });

// const secondaryBtn = {
//   background: '#e2e8f0',
//   border: 'none',
//   padding: '8px 16px',
//   borderRadius: 8,
//   cursor: 'pointer',
// };

// const toggleBtn = {
//   background: '#edf2f7',
//   border: '1px solid #e2e8f0',
//   borderRadius: 8,
//   padding: '8px 12px',
//   cursor: 'pointer',
// };

// const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };

// const tableHeaderStyle = {
//   padding: 10,
//   background: '#f8f9fa',
//   textAlign: 'left',
//   borderBottom: '2px solid #e2e8f0',
// };

// const tableCellStyle = {
//   padding: 10,
//   borderBottom: '1px solid #eee',
// };

// // export default VisitTrackingScreen;
// import React, { useState, useCallback, useRef, useEffect } from 'react';
// // import React, { useState, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';
// import VisitPayScreen from './VisitPayScreen';

// // ---------- Translations ----------
// const translations = {
//   en: {
//     title: 'Visit Tracking',
//     search: {
//       name: 'Name',
//       mobile: 'Mobile',
//       placeholder: 'Search by name or mobile...',
//     },
//     btn: {
//       search: 'Search',
//       clear: 'Clear',
//       start: 'Start Visit',
//       end: 'End Visit',
//       pay: 'Payment',
//       view: 'View',
//       yes: 'Yes',
//       no: 'No',
//       close: 'Close',
//       cancel: 'Cancel',
//       table: 'Table',
//       cards: 'Cards',
//     },
//     col: {
//       id: 'ID',
//       patient: 'Patient',
//       doctor: 'Doctor',
//       type: 'Type',
//       status: 'Status',
//       payment: 'Payment',
//       amount: 'Amount',
//       insurancePaid: 'Insurance Paid',
//       remaining: 'Remaining',
//       details: 'Details',
//     },
//     status: {
//       ready: 'Ready',
//       loading: 'Loading...',
//       found: 'Found',
//       cleared: 'Cleared',
//       visit: 'Visit',
//       success: 'successfully',
//     },
//     msg: {
//       enterSearchValue: 'Please enter a search value',
//       noPatients: 'No patients found',
//       selectVisit: 'Please select a visit',
//       visitActionFailedHttp: 'Visit {0} failed (HTTP {1})',
//       visitActionFailedError: 'Visit {0} failed: {1}',
//       noInsuranceId: 'No insurance ID found',
//       insuranceMarked: 'Insurance marked as paid',
//       insuranceFailed: 'Failed to mark insurance as paid',
//       insuranceServiceError: 'Insurance service error',
//       paymentDetailsFailed: 'Failed to load payment details',
//       paymentDetailsError: 'Error loading payment details',
//       searchFailed: 'Search failed',
//       closeConfirm: 'Are you sure you want to close this screen?',
//       confirmClose: 'Confirm Close',
//     },
//     confirm: {
//       title: 'Confirm',
//       header: 'Insurance Payment',
//       message: 'Mark insurance as paid?',
//     },
//     payment: {
//       details: {
//         title: 'Payment Details',
//       },
//       original: 'Original Amount',
//       insurance: 'Insurance Amount',
//       insurancePaid: 'Insurance Paid',
//       insuranceDiscount: 'Insurance Discount',
//       patientPaid: 'Patient Paid',
//       remaining: 'Remaining',
//       transactions: 'Transactions',
//     },
//     label: {
//       visits: 'visits',
//     },
//     alert: {
//       title: 'Information',
//     },
//     tooltip: {
//       visitClosed: 'Visit not available',
//     },
//   },
//   ar: {
//     title: 'تتبع الزيارات',
//     search: {
//       name: 'الاسم',
//       mobile: 'الجوال',
//       placeholder: 'ابحث بالاسم أو رقم الجوال...',
//     },
//     btn: {
//       search: 'بحث',
//       clear: 'مسح',
//       start: 'بدء الزيارة',
//       end: 'إنهاء الزيارة',
//       pay: 'دفع',
//       view: 'عرض',
//       yes: 'نعم',
//       no: 'لا',
//       close: 'إغلاق',
//       cancel: 'إلغاء',
//       table: 'جدول',
//       cards: 'بطاقات',
//     },
//     col: {
//       id: 'الرقم',
//       patient: 'المريض',
//       doctor: 'الطبيب',
//       type: 'النوع',
//       status: 'الحالة',
//       payment: 'الدفع',
//       amount: 'المبلغ',
//       insurancePaid: 'دفع التأمين',
//       remaining: 'المتبقي',
//       details: 'التفاصيل',
//     },
//     status: {
//       ready: 'جاهز',
//       loading: 'جاري التحميل...',
//       found: 'تم العثور على',
//       cleared: 'تم المسح',
//       visit: 'الزيارة',
//       success: 'بنجاح',
//     },
//     msg: {
//       enterSearchValue: 'يرجى إدخال قيمة للبحث',
//       noPatients: 'لم يتم العثور على مرضى',
//       selectVisit: 'يرجى تحديد زيارة',
//       visitActionFailedHttp: 'فشل {0} الزيارة (HTTP {1})',
//       visitActionFailedError: 'فشل {0} الزيارة: {1}',
//       noInsuranceId: 'لم يتم العثور على رقم تأمين',
//       insuranceMarked: 'تم تحديد التأمين كمدفوع',
//       insuranceFailed: 'فشل تحديد التأمين كمدفوع',
//       insuranceServiceError: 'خطأ في خدمة التأمين',
//       paymentDetailsFailed: 'فشل تحميل تفاصيل الدفع',
//       paymentDetailsError: 'خطأ في تحميل تفاصيل الدفع',
//       searchFailed: 'فشل البحث',
//       closeConfirm: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
//       confirmClose: 'تأكيد الإغلاق',
//     },
//     confirm: {
//       title: 'تأكيد',
//       header: 'دفع التأمين',
//       message: 'تأكيد دفع التأمين؟',
//     },
//     payment: {
//       details: {
//         title: 'تفاصيل الدفع',
//       },
//       original: 'المبلغ الأصلي',
//       insurance: 'مبلغ التأمين',
//       insurancePaid: 'المدفوع من التأمين',
//       insuranceDiscount: 'خصم التأمين',
//       patientPaid: 'المدفوع من المريض',
//       remaining: 'المتبقي',
//       transactions: 'المعاملات',
//     },
//     label: {
//       visits: 'زيارات',
//     },
//     alert: {
//       title: 'معلومات',
//     },
//     tooltip: {
//       visitClosed: 'الزيارة غير متاحة',
//     },
//   },
// };

// // ---------- Main Component ----------
// const VisitTrackingScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   const t = translations[lang] || translations.en;

//   // ---------- State ----------
//   const [searchBy, setSearchBy] = useState('name');
//   const [searchText, setSearchText] = useState('');
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [selectedVisit, setSelectedVisit] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [viewMode, setViewMode] = useState('table');
//   const [showPayment, setShowPayment] = useState(false);
  
//   // Add ref to store current patient IDs for refresh
//   const currentPatientIdsRef = useRef([]);

//   // ---------- Helper: log action ----------
//   const logAction = useCallback(async (action, details) => {
//     try {
//       await fetch(`${BASE_URL}/api/logs/add`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: loggedUser, action, details }),
//       });
//     } catch (e) { /* ignore */ }
//   }, [loggedUser]);

//   // ---------- Parse a single visit ----------
//   const parseVisit = (v) => {
//     const p = v.patient || {};
//     const d = v.doctor || {};

//     let originalAmount = v.originalAmount || 0;
//     let paidAmount = 0;
//     let paymentMethod = 'FREE';
//     let insurancePaid = false;
//     let insuranceFormId = null;
//     let insuranceCardId = null;

//     const payments = v.payments || [];

//     let hasCash = false;
//     let hasPos = false;
//     let hasInsurance = false;

//     payments.forEach(pay => {
//       const method = pay.paymentMethod;
//       const amount = pay.amount || 0;

//       if (method === 'CASH') hasCash = true;
//       if (method === 'POS') hasPos = true;
//       if (method === 'INSURANCE') {
//         hasInsurance = true;
//         insurancePaid = pay.insurancePaid || false;
//         insuranceFormId = pay.insuranceFormId || null;
//         insuranceCardId = pay.insuranceCardId || null;
//       }
//       paidAmount += amount;
//     });

//     if (hasInsurance) paymentMethod = 'INSURANCE';
//     else if (hasCash && hasPos) paymentMethod = 'CASH + POS';
//     else if (hasCash) paymentMethod = 'CASH';
//     else if (hasPos) paymentMethod = 'POS';

//     const totalPaid = paidAmount || 0;
//     const remaining = Math.max(0, originalAmount - totalPaid);

//     return {
//       id: v.id,
//       patientId: p.id || null,
//       patientName: p.fullName || `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Unknown',
//       doctorName: d.fullName || `${d.firstName || ''} ${d.lastName || ''}`.trim() || 'Unknown',
//       visitType: v.visitType || 'N/A',
//       visitStatus: v.visitStatus || 'NEW',
//       paid: v.paid ? 'YES' : 'NO',
//       paymentMethod: paymentMethod,
//       amount: originalAmount,
//       totalPaid: totalPaid,
//       remaining: remaining,
//       insurancePaid: insurancePaid,
//       insuranceFormId: insuranceFormId,
//       insuranceCardId: insuranceCardId,
//       payments: payments,
//     };
//   };

//   // ---------- Fetch visits by patient IDs ----------
//  const fetchVisits = useCallback(async (patientIds, clearSelection = false) => {
//   if (!patientIds || patientIds.length === 0) {
//     setFilteredVisits([]);
//     setSelectedVisit(null);
//     return [];
//   }

//   setLoading(true);
//   setStatusMsg(`⏳ ${t.status.loading}`);

//   try {
//     const res = await fetch(`${BASE_URL}/api/visits/patients`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(patientIds),
//     });

//     if (!res.ok) throw new Error(`HTTP ${res.status}`);

//     const data = await res.json();
//     let allVisits = [];

//     for (const key in data) {
//       const visitArray = data[key];
//       if (Array.isArray(visitArray)) {
//         visitArray.forEach(v => {
//           allVisits.push(parseVisit(v));
//         });
//       }
//     }

//     setFilteredVisits(allVisits);

//     if (clearSelection) {
//       setSelectedVisit(null);
//     }

//     setStatusMsg(`✅ ${t.status.found} ${allVisits.length} ${t.label.visits}`);

//     return allVisits;
//   } catch (err) {
//     setStatusMsg(`❌ ${err.message}`);
//     setFilteredVisits([]);
//     setSelectedVisit(null);
//     return [];
//   } finally {
//     setLoading(false);
//   }
// }, [t]);

//   // ---------- Auto-refresh function ----------
// //  const refreshVisits = useCallback(async () => {
// //   if (currentPatientIdsRef.current.length > 0) {
// //     console.log('🔄 Auto-refreshing visits...');
    
// //     // setSelectedVisit(null); // clear selected row
// //    return  await fetchVisits(currentPatientIdsRef.current);
// //   }
// //     return [];

// // }, [fetchVisits]);
// const refreshVisits = useCallback(async () => {
//   if (currentPatientIdsRef.current.length === 0) return [];

//   const visits = await fetchVisits(currentPatientIdsRef.current, false);

//   // IMPORTANT: return fresh data only
//   return visits;
// }, [fetchVisits]);

// useEffect(() => {
//   if (!selectedVisit?.id) return;

//   const updated = filteredVisits.find(v => v.id === selectedVisit.id);

//   if (updated) {
//     setSelectedVisit(prev => {
//       // avoid useless re-renders
//       if (prev && JSON.stringify(prev) === JSON.stringify(updated)) {
//         return prev;
//       }
//       return updated;
//     });
//   }
// }, [filteredVisits, selectedVisit?.id]);
//   // ---------- Search handlers ----------
//   const performSearch = useCallback(async () => {
//     if (!searchText || searchText.trim().length < 2) {
//       setStatusMsg(`⚠️ ${t.msg.enterSearchValue}`);
//       return;
//     }

//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);

//     try {
//       const endpoint = searchBy === 'mobile'
//         ? `${BASE_URL}/api/patients/search/mobile/${encodeURIComponent(searchText)}`
//         : `${BASE_URL}/api/patients/search/name/${encodeURIComponent(searchText)}`;

//       const res = await fetch(endpoint);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const patients = await res.json();
//       const patientIds = patients.map(p => p.id);
      
//       // Store patient IDs for auto-refresh
//       currentPatientIdsRef.current = patientIds;

//       if (patientIds.length === 0) {
//         setStatusMsg(`📭 ${t.msg.noPatients}`);
//         setFilteredVisits([]);
//         setLoading(false);
//         return;
//       }

//       await fetchVisits(patientIds);
//       logAction('SEARCH_VISITS', `Searched by ${searchBy} = ${searchText}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.msg.searchFailed}: ${err.message}`);
//       setFilteredVisits([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchBy, searchText, fetchVisits, t, logAction]);

//   const clearSearch = useCallback(() => {
//     setSearchText('');
//     setFilteredVisits([]);
//     setSelectedVisit(null);
//     currentPatientIdsRef.current = [];
//     setStatusMsg(`🗑️ ${t.status.cleared}`);
//   }, [t]);

//   // ---------- Visit actions ----------
//   const updateVisitStatus = async (visitId, action) => {
//     if (!selectedVisit && !visitId) {
//       alert(t.msg.selectVisit);
//       return;
//     }

//     const id = visitId || selectedVisit?.id;
//     if (!id) return;

//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/${id}/${action}`, {
//         method: 'PUT',
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       // Auto-refresh after successful action
//       await refreshVisits();
//       setSelectedVisit(null); // clear selected row

//       setStatusMsg(`✅ ${t.status.visit} ${action}ed ${t.status.success}`);
//       logAction(`VISIT_${action.toUpperCase()}`, `${action}ed visit ${id}`);
//     } catch (err) {
//       alert(`${t.msg.visitActionFailedError.replace('{0}', action).replace('{1}', err.message)}`);
//     }
//   };

//   const handleStartVisit = () => updateVisitStatus(null, 'start');
//   const handleEndVisit = () => updateVisitStatus(null, 'end');

// //   const handlePaymentComplete = useCallback(async (amount) => {
// //     // Auto-refresh after payment
// //     await refreshVisits();
    
// //     // Update selected visit with new data from refreshed list
// //     if (selectedVisit) {
// //       const updatedVisit = filteredVisits.find(v => v.id === selectedVisit.id);
// //       if (updatedVisit) {
// //         setSelectedVisit(updatedVisit);
// //       }
// //     }
// //      setSelectedVisit(null); // remove selection
// //     setStatusMsg(`✅ Payment of ${amount} completed successfully`);
// //     setShowPayment(false);
// //   }, [selectedVisit, filteredVisits, refreshVisits]);
// const handlePaymentComplete = useCallback(async (amount) => {
//   const id = selectedVisit?.id;

//   const visits = await refreshVisits();

//   const updated = visits.find(v => v.id === id);

//   setSelectedVisit(updated || null);
//   setShowPayment(false);

//   setStatusMsg(`✅ Payment of ${amount} completed successfully`);
// }, [selectedVisit, refreshVisits]);

//   const handlePayment = () => {
//     if (!selectedVisit) {
//       alert(t.msg.selectVisit);
//       return;
//     }
//     setShowPayment(true);
//   };

//   const handlePaymentModalClose = useCallback(async () => {
//   setShowPayment(false);
  
//   // Auto-refresh when payment modal is closed (even if no payment was made)
//   await refreshVisits();
  
//   // Update selected visit with fresh data
//   if (selectedVisit) {
//     const updatedVisit = filteredVisits.find(v => v.id === selectedVisit.id);
//     if (updatedVisit) {
//       setSelectedVisit(updatedVisit);
//     }
//   }
  
//   setStatusMsg(`🔄 Table refreshed`);
// }, [selectedVisit, filteredVisits, refreshVisits]);
//   const handleMarkInsurancePaid = async (visitId) => {
//     if (!window.confirm(t.confirm.message)) return;

//     const visit = filteredVisits.find(v => v.id === visitId);
//     if (!visit) return;

//     try {
//       const insuranceId = visit.insuranceFormId || visit.insuranceCardId;
//       if (!insuranceId) {
//         alert(t.msg.noInsuranceId);
//         return;
//       }

//       const params = new URLSearchParams();
//       if (visit.insuranceFormId) params.append('insuranceFormId', visit.insuranceFormId);
//       if (visit.insuranceCardId) params.append('insuranceCardId', visit.insuranceCardId);

//       const res = await fetch(`${BASE_URL}/api/visits/mark-insurance-paid?${params.toString()}`, {
//         method: 'PUT',
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       // Auto-refresh after marking insurance as paid
//       await refreshVisits();

//       setStatusMsg(`✅ ${t.msg.insuranceMarked}`);
//       logAction('MARK_INSURANCE_PAID', `Marked insurance paid for visit ${visitId}`);
//     } catch (err) {
//       alert(`${t.msg.insuranceFailed}: ${err.message}`);
//     }
//   };

//   const showPaymentDetails = async (visitId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/${visitId}/payments`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();

//       let msg = `💳 Payment Details for Visit #${visitId}\n\n`;
//       msg += `Original Amount: ${data.originalAmount || 0}\n`;
//       msg += `Insurance Amount: ${data.insuranceAmount || 0}\n`;
//       msg += `Insurance Paid: ${data.insurancePaidAmount || 0}\n`;
//       msg += `Insurance Discount: ${data.insuranceDiscount || 0}\n`;
//       msg += `Patient Paid: ${data.patientPaid || 0}\n`;
//       msg += `Remaining: ${data.remainingAmount || 0}\n\n`;
//       msg += `--- Transactions ---\n`;

//       (data.payments || []).forEach(p => {
//         msg += `${p.paymentMethod} | ${p.amount} | ${p.paidAt || ''}\n`;
//       });

//       alert(msg);
//     } catch (err) {
//       alert(`${t.msg.paymentDetailsFailed}: ${err.message}`);
//     }
//   };

//   // ---------- Determine if row should be disabled ----------
//   const shouldDisableRow = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     return visit.visitStatus === 'CLOSED' && visit.amount > 0 && remaining === 0;
//   };

//   // ---------- Check if actions are available ----------
//   const canStartVisit = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     const isNew = ['NEW', 'CREATED'].includes(visit.visitStatus);
//     const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
//     const isSpecial = visit.visitStatus === 'CREATED' && visit.amount > 0 && remaining === 0;
//     return (isNew && notPaid) || isSpecial;
//   };

//   const canEndVisit = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     const isInProgress = visit.visitStatus === 'IN_PROGRESS';
//     const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
//     const isSpecial = visit.visitStatus === 'IN_PROGRESS' && remaining === 0 && visit.amount > 0;
//     return (isInProgress && notPaid) || isSpecial;
//   };

//   const canPay = (visit) => {
//     if (!visit) return false;
//     return visit.paid !== 'YES' && !visit.insurancePaid;
//   };

//   // ---------- Render table ----------
//   const renderTable = () => {
//     if (filteredVisits.length === 0) {
//       return <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 No visits found</div>;
//     }

//     return (
//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th style={tableHeaderStyle}>ID</th>
//               <th style={tableHeaderStyle}>Patient</th>
//               <th style={tableHeaderStyle}>Doctor</th>
//               <th style={tableHeaderStyle}>Type</th>
//               <th style={tableHeaderStyle}>Status</th>
//               <th style={tableHeaderStyle}>Payment</th>
//               <th style={tableHeaderStyle}>Amount</th>
//               <th style={tableHeaderStyle}>Insurance Paid</th>
//               <th style={tableHeaderStyle}>Remaining</th>
//               <th style={tableHeaderStyle}>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredVisits.map(visit => {
//               const disabled = shouldDisableRow(visit);
//               const remaining = Math.max(0, visit.amount - visit.totalPaid);

//               return (
//                 <tr
//                   key={visit.id}
//                   onClick={() => {
//                     setSelectedVisit(visit);
//                     logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
//                   }}
//                   style={{
//                     cursor: disabled ? 'not-allowed' : 'pointer',
//                     background: selectedVisit?.id === visit.id ? '#ebf8ff' : (disabled ? '#f7fafc' : 'white'),
//                     opacity: disabled ? 0.6 : 1,
//                     borderBottom: '1px solid #eee'
//                   }}
//                 >
//                   <td style={tableCellStyle}>{visit.id}</td>
//                   <td style={tableCellStyle}>{visit.patientName}</td>
//                   <td style={tableCellStyle}>{visit.doctorName}</td>
//                   <td style={tableCellStyle}>{visit.visitType}</td>
//                   <td style={tableCellStyle}>
//                     <span style={{
//                       color: visit.visitStatus === 'IN_PROGRESS' ? '#48bb78' :
//                         visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? '#4299e1' :
//                         '#718096',
//                       fontWeight: 'bold'
//                     }}>
//                       {visit.visitStatus}
//                     </span>
//                   </td>
//                   <td style={tableCellStyle}>{visit.paymentMethod}</td>
//                   <td style={tableCellStyle}>{visit.amount.toFixed(2)}</td>
//                   <td style={tableCellStyle}>
//                     {visit.paymentMethod === 'INSURANCE' && (
//                       <input
//                         type="checkbox"
//                         checked={visit.insurancePaid || false}
//                         disabled={visit.insurancePaid}
//                         onChange={() => handleMarkInsurancePaid(visit.id)}
//                         style={{ cursor: 'pointer' }}
//                       />
//                     )}
//                   </td>
//                   <td style={{ ...tableCellStyle, color: remaining === 0 ? '#48bb78' : '#e53e3e', fontWeight: 'bold' }}>
//                     {remaining.toFixed(2)}
//                   </td>
//                   <td style={tableCellStyle}>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         showPaymentDetails(visit.id);
//                       }}
//                       style={{
//                         background: disabled ? '#fc8181' : '#4299e1',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: 6,
//                         padding: '4px 12px',
//                         cursor: 'pointer',
//                         fontSize: 12,
//                       }}
//                     >
//                       📋 {t.btn.view}
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   // ---------- Render cards ----------
//   const renderCards = () => {
//     if (filteredVisits.length === 0) {
//       return <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 No visits found</div>;
//     }

//     return (
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
//         {filteredVisits.map(visit => {
//           const disabled = shouldDisableRow(visit);
//           const remaining = Math.max(0, visit.amount - visit.totalPaid);

//           return (
//             <div
//               key={visit.id}
//               onClick={() => {
//                 setSelectedVisit(visit);
//                 logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
//               }}
//               style={{
//                 background: selectedVisit?.id === visit.id ? '#ebf8ff' : 'white',
//                 borderRadius: 12,
//                 padding: 15,
//                 boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//                 border: selectedVisit?.id === visit.id ? '2px solid #4299e1' : '1px solid #edf2f7',
//                 cursor: disabled ? 'not-allowed' : 'pointer',
//                 opacity: disabled ? 0.6 : 1,
//               }}
//             >
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
//                 <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>
//                   #{visit.id}
//                 </span>
//                 <span style={{ fontWeight: 'bold' }}>{visit.patientName}</span>
//                 <span style={{
//                   background: visit.visitStatus === 'IN_PROGRESS' ? '#48bb78' :
//                     visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? '#4299e1' :
//                     '#edf2f7',
//                   color: ['IN_PROGRESS', 'NEW', 'CREATED'].includes(visit.visitStatus) ? 'white' : '#4a5568',
//                   borderRadius: 12,
//                   padding: '2px 10px',
//                   fontSize: 11,
//                 }}>
//                   {visit.visitStatus}
//                 </span>
//               </div>
//               <div style={{ fontSize: 13, color: '#4a5568' }}>
//                 <div>👨‍⚕️ {visit.doctorName}</div>
//                 <div>📋 {visit.visitType} | 💳 {visit.paymentMethod}</div>
//                 <div>💰 {visit.amount.toFixed(2)} | Remaining: <span style={{ color: remaining === 0 ? '#48bb78' : '#e53e3e', fontWeight: 'bold' }}>{remaining.toFixed(2)}</span></div>
//                 {visit.paymentMethod === 'INSURANCE' && (
//                   <div style={{ marginTop: 4 }}>
//                     <label style={{ fontSize: 12 }}>
//                       <input
//                         type="checkbox"
//                         checked={visit.insurancePaid || false}
//                         disabled={visit.insurancePaid}
//                         onChange={(e) => {
//                           e.stopPropagation();
//                           handleMarkInsurancePaid(visit.id);
//                         }}
//                       /> Insurance Paid
//                     </label>
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   showPaymentDetails(visit.id);
//                 }}
//                 style={{
//                   marginTop: 8,
//                   background: disabled ? '#fc8181' : '#4299e1',
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: 6,
//                   padding: '4px 12px',
//                   cursor: 'pointer',
//                   fontSize: 12,
//                 }}
//               >
//                 📋 {t.btn.view}
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   // ---------- Render ----------
//   return (
//     <div style={{ padding: 20, fontFamily: "'Segoe UI', Tahoma, sans-serif" }}>
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//         <h2>📋 {t.title}</h2>
//         <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.close}</button>
//       </div>

//       {/* Search Section */}
//       <div style={{
//         background: 'white',
//         borderRadius: 12,
//         padding: 15,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//         marginBottom: 20,
//       }}>
//         <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
//           <select
//             value={searchBy}
//             onChange={e => setSearchBy(e.target.value)}
//             style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc' }}
//           >
//             <option value="name">{t.search.name}</option>
//             <option value="mobile">{t.search.mobile}</option>
//           </select>
//           <input
//             type="text"
//             placeholder={t.search.placeholder}
//             value={searchText}
//             onChange={e => setSearchText(e.target.value)}
//             onKeyPress={e => e.key === 'Enter' && performSearch()}
//             style={{ flex: 1, padding: '8px 15px', borderRadius: 8, border: '1px solid #ccc', minWidth: 200 }}
//           />
//           <button
//             onClick={performSearch}
//             disabled={!searchText || searchText.trim().length < 2}
//             style={{
//               ...primaryBtn('#4299e1'),
//               opacity: !searchText || searchText.trim().length < 2 ? 0.5 : 1,
//             }}
//           >
//             🔍 {t.btn.search}
//           </button>
//           <button onClick={clearSearch} style={primaryBtn('#fc8181')}>
//             🗑️ {t.btn.clear}
//           </button>
//         </div>
//       </div>

//       {/* View Toggle */}
//       <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
//         <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
//           📋 {t.btn.table}
//         </button>
//         <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
//           🃏 {t.btn.cards}
//         </button>
//         <span style={{ marginLeft: 'auto', color: '#4a5568' }}>{statusMsg}</span>
//       </div>

//       {/* Content */}
//       <div style={{
//         background: 'white',
//         borderRadius: 12,
//         padding: 10,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
//         minHeight: 300,
//       }}>
//         {loading ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>⏳ Loading...</div>
//         ) : (
//           viewMode === 'table' ? renderTable() : renderCards()
//         )}
//       </div>

//       {/* Action Buttons */}
//       {selectedVisit && (
//         <div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap', justifyContent: 'center' }}>
//           <button
//             onClick={handleStartVisit}
//             disabled={!canStartVisit(selectedVisit)}
//             style={{
//               ...primaryBtn(canStartVisit(selectedVisit) ? '#48bb78' : '#a0aec0'),
//               cursor: canStartVisit(selectedVisit) ? 'pointer' : 'default',
//             }}
//           >
//             ▶ {t.btn.start}
//           </button>
//           <button
//             onClick={handleEndVisit}
//             disabled={!canEndVisit(selectedVisit)}
//             style={{
//               ...primaryBtn(canEndVisit(selectedVisit) ? '#fc8181' : '#a0aec0'),
//               cursor: canEndVisit(selectedVisit) ? 'pointer' : 'default',
//             }}
//           >
//             ⏹ {t.btn.end}
//           </button>
//           <button
//             onClick={handlePayment}
//             disabled={!canPay(selectedVisit)}
//             style={{
//               ...primaryBtn(canPay(selectedVisit) ? '#48bb78' : '#a0aec0'),
//               cursor: canPay(selectedVisit) ? 'pointer' : 'default',
//             }}
//           >
//             💰 {t.btn.pay}
//           </button>
//         </div>
//       )}

//       {/* Payment Modal */}
//       {showPayment && selectedVisit && (
//         <VisitPayScreen
//           visit={selectedVisit}
//           remaining={Math.max(0, selectedVisit.amount - selectedVisit.totalPaid)}
//           loggedUser={loggedUser}
// onClose={handlePaymentModalClose}
//           onPaymentComplete={handlePaymentComplete}
//         />
//       )}
//     </div>
//   );
// };

// // ---------- Style utilities ----------
// const primaryBtn = (bg) => ({
//   background: bg,
//   color: 'white',
//   fontWeight: 'bold',
//   border: 'none',
//   borderRadius: 8,
//   padding: '8px 16px',
//   cursor: 'pointer',
// });

// const secondaryBtn = {
//   background: '#e2e8f0',
//   border: 'none',
//   padding: '8px 16px',
//   borderRadius: 8,
//   cursor: 'pointer',
// };

// const toggleBtn = {
//   background: '#edf2f7',
//   border: '1px solid #e2e8f0',
//   borderRadius: 8,
//   padding: '8px 12px',
//   cursor: 'pointer',
// };

// const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };

// const tableHeaderStyle = {
//   padding: 10,
//   background: '#f8f9fa',
//   textAlign: 'left',
//   borderBottom: '2px solid #e2e8f0',
// };

// const tableCellStyle = {
//   padding: 10,
//   borderBottom: '1px solid #eee',
// };

// export default VisitTrackingScreen;  12072026 4:00 pm


// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import { BASE_URL } from '../../utils/api';
// import VisitPayScreen from './VisitPayScreen';

// // ---------- Translations ----------
// const translations = {
//   en: {
//     title: 'Visit Tracking',
//     search: {
//       name: 'Name',
//       mobile: 'Mobile',
//       placeholder: 'Search by name or mobile...',
//     },
//     btn: {
//       search: 'Search',
//       clear: 'Clear',
//       start: 'Start Visit',
//       end: 'End Visit',
//       pay: 'Payment',
//       view: 'View',
//       yes: 'Yes',
//       no: 'No',
//       close: 'Close',
//       cancel: 'Cancel',
//       table: 'Table',
//       cards: 'Cards',
//     },
//     col: {
//       id: 'ID',
//       patient: 'Patient',
//       doctor: 'Doctor',
//       type: 'Type',
//       status: 'Status',
//       payment: 'Payment',
//       amount: 'Amount',
//       insurancePaid: 'Insurance Paid',
//       remaining: 'Remaining',
//       details: 'Details',
//     },
//     status: {
//       ready: 'Ready',
//       loading: 'Loading...',
//       found: 'Found',
//       cleared: 'Cleared',
//       visit: 'Visit',
//       success: 'successfully',
//     },
//     msg: {
//       enterSearchValue: 'Please enter a search value',
//       noPatients: 'No patients found',
//       selectVisit: 'Please select a visit',
//       visitActionFailedHttp: 'Visit {0} failed (HTTP {1})',
//       visitActionFailedError: 'Visit {0} failed: {1}',
//       noInsuranceId: 'No insurance ID found',
//       insuranceMarked: 'Insurance marked as paid',
//       insuranceFailed: 'Failed to mark insurance as paid',
//       insuranceServiceError: 'Insurance service error',
//       paymentDetailsFailed: 'Failed to load payment details',
//       paymentDetailsError: 'Error loading payment details',
//       searchFailed: 'Search failed',
//       closeConfirm: 'Are you sure you want to close this screen?',
//       confirmClose: 'Confirm Close',
//     },
//     confirm: {
//       title: 'Confirm',
//       header: 'Insurance Payment',
//       message: 'Mark insurance as paid?',
//     },
//     payment: {
//       details: {
//         title: 'Payment Details',
//       },
//       original: 'Original Amount',
//       insurance: 'Insurance Amount',
//       insurancePaid: 'Insurance Paid',
//       insuranceDiscount: 'Insurance Discount',
//       patientPaid: 'Patient Paid',
//       remaining: 'Remaining',
//       transactions: 'Transactions',
//     },
//     label: {
//       visits: 'visits',
//     },
//     alert: {
//       title: 'Information',
//     },
//     tooltip: {
//       visitClosed: 'Visit not available',
//     },
//   },
//   ar: {
//     title: 'تتبع الزيارات',
//     search: {
//       name: 'الاسم',
//       mobile: 'الجوال',
//       placeholder: 'ابحث بالاسم أو رقم الجوال...',
//     },
//     btn: {
//       search: 'بحث',
//       clear: 'مسح',
//       start: 'بدء الزيارة',
//       end: 'إنهاء الزيارة',
//       pay: 'دفع',
//       view: 'عرض',
//       yes: 'نعم',
//       no: 'لا',
//       close: 'إغلاق',
//       cancel: 'إلغاء',
//       table: 'جدول',
//       cards: 'بطاقات',
//     },
//     col: {
//       id: 'الرقم',
//       patient: 'المريض',
//       doctor: 'الطبيب',
//       type: 'النوع',
//       status: 'الحالة',
//       payment: 'الدفع',
//       amount: 'المبلغ',
//       insurancePaid: 'دفع التأمين',
//       remaining: 'المتبقي',
//       details: 'التفاصيل',
//     },
//     status: {
//       ready: 'جاهز',
//       loading: 'جاري التحميل...',
//       found: 'تم العثور على',
//       cleared: 'تم المسح',
//       visit: 'الزيارة',
//       success: 'بنجاح',
//     },
//     msg: {
//       enterSearchValue: 'يرجى إدخال قيمة للبحث',
//       noPatients: 'لم يتم العثور على مرضى',
//       selectVisit: 'يرجى تحديد زيارة',
//       visitActionFailedHttp: 'فشل {0} الزيارة (HTTP {1})',
//       visitActionFailedError: 'فشل {0} الزيارة: {1}',
//       noInsuranceId: 'لم يتم العثور على رقم تأمين',
//       insuranceMarked: 'تم تحديد التأمين كمدفوع',
//       insuranceFailed: 'فشل تحديد التأمين كمدفوع',
//       insuranceServiceError: 'خطأ في خدمة التأمين',
//       paymentDetailsFailed: 'فشل تحميل تفاصيل الدفع',
//       paymentDetailsError: 'خطأ في تحميل تفاصيل الدفع',
//       searchFailed: 'فشل البحث',
//       closeConfirm: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
//       confirmClose: 'تأكيد الإغلاق',
//     },
//     confirm: {
//       title: 'تأكيد',
//       header: 'دفع التأمين',
//       message: 'تأكيد دفع التأمين؟',
//     },
//     payment: {
//       details: {
//         title: 'تفاصيل الدفع',
//       },
//       original: 'المبلغ الأصلي',
//       insurance: 'مبلغ التأمين',
//       insurancePaid: 'المدفوع من التأمين',
//       insuranceDiscount: 'خصم التأمين',
//       patientPaid: 'المدفوع من المريض',
//       remaining: 'المتبقي',
//       transactions: 'المعاملات',
//     },
//     label: {
//       visits: 'زيارات',
//     },
//     alert: {
//       title: 'معلومات',
//     },
//     tooltip: {
//       visitClosed: 'الزيارة غير متاحة',
//     },
//   },
// };

// // ---------- Main Component ----------
// const VisitTrackingScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   const t = translations[lang] || translations.en;

//   // ---------- State ----------
//   const [searchBy, setSearchBy] = useState('name');
//   const [searchText, setSearchText] = useState('');
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [selectedVisit, setSelectedVisit] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [viewMode, setViewMode] = useState('table');
//   const [showPayment, setShowPayment] = useState(false);
  
//   // Add ref to store current patient IDs for refresh
//   const currentPatientIdsRef = useRef([]);

//   // ---------- Helper: log action ----------
//   const logAction = useCallback(async (action, details) => {
//     try {
//       await fetch(`${BASE_URL}/api/logs/add`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: loggedUser, action, details }),
//       });
//     } catch (e) { /* ignore */ }
//   }, [loggedUser]);

//   // ---------- Parse a single visit ----------
//   const parseVisit = (v) => {
//     const p = v.patient || {};
//     const d = v.doctor || {};

//     let originalAmount = v.originalAmount || 0;
//     let paidAmount = 0;
//     let paymentMethod = 'FREE';
//     let insurancePaid = false;
//     let insuranceFormId = null;
//     let insuranceCardId = null;

//     const payments = v.payments || [];

//     let hasCash = false;
//     let hasPos = false;
//     let hasInsurance = false;

//     payments.forEach(pay => {
//       const method = pay.paymentMethod;
//       const amount = pay.amount || 0;

//       if (method === 'CASH') hasCash = true;
//       if (method === 'POS') hasPos = true;
//       if (method === 'INSURANCE') {
//         hasInsurance = true;
//         insurancePaid = pay.insurancePaid || false;
//         insuranceFormId = pay.insuranceFormId || null;
//         insuranceCardId = pay.insuranceCardId || null;
//       }
//       paidAmount += amount;
//     });

//     if (hasInsurance) paymentMethod = 'INSURANCE';
//     else if (hasCash && hasPos) paymentMethod = 'CASH + POS';
//     else if (hasCash) paymentMethod = 'CASH';
//     else if (hasPos) paymentMethod = 'POS';

//     const totalPaid = paidAmount || 0;
//     const remaining = Math.max(0, originalAmount - totalPaid);

//     return {
//       id: v.id,
//       patientId: p.id || null,
//       patientName: p.fullName || `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Unknown',
//       doctorName: d.fullName || `${d.firstName || ''} ${d.lastName || ''}`.trim() || 'Unknown',
//       visitType: v.visitType || 'N/A',
//       visitStatus: v.visitStatus || 'NEW',
//       paid: v.paid ? 'YES' : 'NO',
//       paymentMethod: paymentMethod,
//       amount: originalAmount,
//       totalPaid: totalPaid,
//       remaining: remaining,
//       insurancePaid: insurancePaid,
//       insuranceFormId: insuranceFormId,
//       insuranceCardId: insuranceCardId,
//       payments: payments,
//     };
//   };

//   // ---------- Fetch visits by patient IDs ----------
//   const fetchVisits = useCallback(async (patientIds, clearSelection = false) => {
//     if (!patientIds || patientIds.length === 0) {
//       setFilteredVisits([]);
//       setSelectedVisit(null);
//       return [];
//     }

//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);

//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/patients`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(patientIds),
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();
//       let allVisits = [];

//       for (const key in data) {
//         const visitArray = data[key];
//         if (Array.isArray(visitArray)) {
//           visitArray.forEach(v => {
//             allVisits.push(parseVisit(v));
//           });
//         }
//       }

//       setFilteredVisits(allVisits);

//       if (clearSelection) {
//         setSelectedVisit(null);
//       }

//       setStatusMsg(`✅ ${t.status.found} ${allVisits.length} ${t.label.visits}`);

//       return allVisits;
//     } catch (err) {
//       setStatusMsg(`❌ ${err.message}`);
//       setFilteredVisits([]);
//       setSelectedVisit(null);
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   }, [t]);

//   // ---------- Auto-refresh function ----------
//   const refreshVisits = useCallback(async () => {
//     if (currentPatientIdsRef.current.length === 0) return [];

//     const visits = await fetchVisits(currentPatientIdsRef.current, false);
//     return visits;
//   }, [fetchVisits]);

//   useEffect(() => {
//     if (!selectedVisit?.id) return;

//     const updated = filteredVisits.find(v => v.id === selectedVisit.id);

//     if (updated) {
//       setSelectedVisit(prev => {
//         if (prev && JSON.stringify(prev) === JSON.stringify(updated)) {
//           return prev;
//         }
//         return updated;
//       });
//     }
//   }, [filteredVisits, selectedVisit?.id]);

//   // ---------- Search handlers ----------
//   const performSearch = useCallback(async () => {
//     if (!searchText || searchText.trim().length < 2) {
//       setStatusMsg(`⚠️ ${t.msg.enterSearchValue}`);
//       return;
//     }

//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);

//     try {
//       const endpoint = searchBy === 'mobile'
//         ? `${BASE_URL}/api/patients/search/mobile/${encodeURIComponent(searchText)}`
//         : `${BASE_URL}/api/patients/search/name/${encodeURIComponent(searchText)}`;

//       const res = await fetch(endpoint);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const patients = await res.json();
//       const patientIds = patients.map(p => p.id);
      
//       currentPatientIdsRef.current = patientIds;

//       if (patientIds.length === 0) {
//         setStatusMsg(`📭 ${t.msg.noPatients}`);
//         setFilteredVisits([]);
//         setLoading(false);
//         return;
//       }

//       await fetchVisits(patientIds);
//       logAction('SEARCH_VISITS', `Searched by ${searchBy} = ${searchText}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.msg.searchFailed}: ${err.message}`);
//       setFilteredVisits([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchBy, searchText, fetchVisits, t, logAction]);

//   const clearSearch = useCallback(() => {
//     setSearchText('');
//     setFilteredVisits([]);
//     setSelectedVisit(null);
//     currentPatientIdsRef.current = [];
//     setStatusMsg(`🗑️ ${t.status.cleared}`);
//   }, [t]);

//   // ---------- Visit actions ----------
//   const updateVisitStatus = async (visitId, action) => {
//     if (!selectedVisit && !visitId) {
//       alert(t.msg.selectVisit);
//       return;
//     }

//     const id = visitId || selectedVisit?.id;
//     if (!id) return;

//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/${id}/${action}`, {
//         method: 'PUT',
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       await refreshVisits();
//       setSelectedVisit(null);

//       setStatusMsg(`✅ ${t.status.visit} ${action}ed ${t.status.success}`);
//       logAction(`VISIT_${action.toUpperCase()}`, `${action}ed visit ${id}`);
//     } catch (err) {
//       alert(`${t.msg.visitActionFailedError.replace('{0}', action).replace('{1}', err.message)}`);
//     }
//   };

//   const handleStartVisit = () => updateVisitStatus(null, 'start');
//   const handleEndVisit = () => updateVisitStatus(null, 'end');

//   const handlePaymentComplete = useCallback(async (amount) => {
//     const id = selectedVisit?.id;

//     const visits = await refreshVisits();

//     const updated = visits.find(v => v.id === id);

//     setSelectedVisit(updated || null);
//     setShowPayment(false);

//     setStatusMsg(`✅ Payment of ${amount} completed successfully`);
//   }, [selectedVisit, refreshVisits]);

//   const handlePayment = () => {
//     if (!selectedVisit) {
//       alert(t.msg.selectVisit);
//       return;
//     }
//     setShowPayment(true);
//   };

//   const handlePaymentModalClose = useCallback(async () => {
//     setShowPayment(false);
    
//     await refreshVisits();
    
//     if (selectedVisit) {
//       const updatedVisit = filteredVisits.find(v => v.id === selectedVisit.id);
//       if (updatedVisit) {
//         setSelectedVisit(updatedVisit);
//       }
//     }
    
//     setStatusMsg(`🔄 Table refreshed`);
//   }, [selectedVisit, filteredVisits, refreshVisits]);

//   const handleMarkInsurancePaid = async (visitId) => {
//     if (!window.confirm(t.confirm.message)) return;

//     const visit = filteredVisits.find(v => v.id === visitId);
//     if (!visit) return;

//     try {
//       const insuranceId = visit.insuranceFormId || visit.insuranceCardId;
//       if (!insuranceId) {
//         alert(t.msg.noInsuranceId);
//         return;
//       }

//       const params = new URLSearchParams();
//       if (visit.insuranceFormId) params.append('insuranceFormId', visit.insuranceFormId);
//       if (visit.insuranceCardId) params.append('insuranceCardId', visit.insuranceCardId);

//       const res = await fetch(`${BASE_URL}/api/visits/mark-insurance-paid?${params.toString()}`, {
//         method: 'PUT',
//       });

//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       await refreshVisits();

//       setStatusMsg(`✅ ${t.msg.insuranceMarked}`);
//       logAction('MARK_INSURANCE_PAID', `Marked insurance paid for visit ${visitId}`);
//     } catch (err) {
//       alert(`${t.msg.insuranceFailed}: ${err.message}`);
//     }
//   };

//   const showPaymentDetails = async (visitId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/${visitId}/payments`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();

//       let msg = `💳 Payment Details for Visit #${visitId}\n\n`;
//       msg += `Original Amount: ${data.originalAmount || 0}\n`;
//       msg += `Insurance Amount: ${data.insuranceAmount || 0}\n`;
//       msg += `Insurance Paid: ${data.insurancePaidAmount || 0}\n`;
//       msg += `Insurance Discount: ${data.insuranceDiscount || 0}\n`;
//       msg += `Patient Paid: ${data.patientPaid || 0}\n`;
//       msg += `Remaining: ${data.remainingAmount || 0}\n\n`;
//       msg += `--- Transactions ---\n`;

//       (data.payments || []).forEach(p => {
//         msg += `${p.paymentMethod} | ${p.amount} | ${p.paidAt || ''}\n`;
//       });

//       alert(msg);
//     } catch (err) {
//       alert(`${t.msg.paymentDetailsFailed}: ${err.message}`);
//     }
//   };

//   // ---------- Determine if row should be disabled ----------
//   const shouldDisableRow = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     return visit.visitStatus === 'CLOSED' && visit.amount > 0 && remaining === 0;
//   };

//   // ---------- Check if actions are available ----------
//   const canStartVisit = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     const isNew = ['NEW', 'CREATED'].includes(visit.visitStatus);
//     const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
//     const isSpecial = visit.visitStatus === 'CREATED' && visit.amount > 0 && remaining === 0;
//     return (isNew && notPaid) || isSpecial;
//   };

//   const canEndVisit = (visit) => {
//     if (!visit) return false;
//     const remaining = Math.max(0, visit.amount - visit.totalPaid);
//     const isInProgress = visit.visitStatus === 'IN_PROGRESS';
//     const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
//     const isSpecial = visit.visitStatus === 'IN_PROGRESS' && remaining === 0 && visit.amount > 0;
//     return (isInProgress && notPaid) || isSpecial;
//   };

//   const canPay = (visit) => {
//     if (!visit) return false;
//     return visit.paid !== 'YES' && !visit.insurancePaid;
//   };

//   // ---------- Render ----------
//   return (
//     <>
//       <style>{`
//         /* ==================== VISIT TRACKING STYLES ==================== */
//         .visit-tracking-container {
//           padding: 20px;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }

//         .visit-tracking-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//           flex-wrap: wrap;
//           gap: 10px;
//         }

//         .visit-tracking-header h2 {
//           margin: 0;
//           font-size: 24px;
//           color: #2d3748;
//         }

//         .visit-tracking-close-btn {
//           background: #e2e8f0;
//           border: none;
//           padding: 8px 16px;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 14px;
//           min-height: 38px;
//           transition: all 0.2s;
//         }

//         .visit-tracking-close-btn:hover {
//           background: #cbd5e0;
//         }

//         .visit-tracking-search-section {
//           background: white;
//           border-radius: 12px;
//           padding: 15px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//           margin-bottom: 20px;
//         }

//         .visit-tracking-search-row {
//           display: flex;
//           gap: 10px;
//           align-items: center;
//           flex-wrap: wrap;
//         }

//         .visit-tracking-search-row select,
//         .visit-tracking-search-row input {
//           padding: 8px 12px;
//           border-radius: 8px;
//           border: 1px solid #ccc;
//           min-height: 38px;
//         }

//         .visit-tracking-search-row select:focus,
//         .visit-tracking-search-row input:focus {
//           outline: none;
//           border-color: #4299e1;
//         }

//         .visit-tracking-search-row input {
//           flex: 1;
//           min-width: 200px;
//         }

//         .visit-tracking-btn {
//           color: white;
//           font-weight: bold;
//           border: none;
//           border-radius: 8px;
//           padding: 8px 16px;
//           cursor: pointer;
//           min-height: 38px;
//           transition: all 0.2s;
//         }

//         .visit-tracking-btn:hover:not(:disabled) {
//           transform: scale(1.05);
//         }

//         .visit-tracking-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .visit-tracking-btn-primary {
//           background: #4299e1;
//         }

//         .visit-tracking-btn-primary:hover:not(:disabled) {
//           background: #3182ce;
//         }

//         .visit-tracking-btn-danger {
//           background: #fc8181;
//         }

//         .visit-tracking-btn-danger:hover:not(:disabled) {
//           background: #f56565;
//         }

//         .visit-tracking-btn-success {
//           background: #48bb78;
//         }

//         .visit-tracking-btn-success:hover:not(:disabled) {
//           background: #38a169;
//         }

//         .visit-tracking-btn-secondary {
//           background: #e2e8f0;
//           color: #4a5568;
//         }

//         .visit-tracking-btn-secondary:hover:not(:disabled) {
//           background: #cbd5e0;
//         }

//         .visit-tracking-toolbar {
//           display: flex;
//           gap: 10px;
//           margin-bottom: 15px;
//           align-items: center;
//           flex-wrap: wrap;
//         }

//         .visit-tracking-toggle-btn {
//           background: #edf2f7;
//           border: 1px solid #e2e8f0;
//           border-radius: 8px;
//           padding: 8px 12px;
//           cursor: pointer;
//           min-height: 38px;
//           transition: all 0.2s;
//         }

//         .visit-tracking-toggle-btn.active {
//           background: #4299e1;
//           color: white;
//           font-weight: bold;
//           border-color: #4299e1;
//         }

//         .visit-tracking-toggle-btn:hover:not(.active) {
//           background: #e2e8f0;
//         }

//         .visit-tracking-status-msg {
//           margin-left: auto;
//           color: #4a5568;
//           font-size: 13px;
//         }

//         .visit-tracking-content {
//           background: white;
//           border-radius: 12px;
//           padding: 10px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//           min-height: 300px;
//         }

//         .visit-tracking-loading {
//           text-align: center;
//           padding: 40px;
//           color: #7f8c8d;
//         }

//         .visit-tracking-empty {
//           text-align: center;
//           padding: 40px;
//           color: #a0aec0;
//         }

//         .visit-tracking-actions {
//           display: flex;
//           gap: 10px;
//           margin-top: 15px;
//           flex-wrap: wrap;
//           justify-content: center;
//         }

//         /* Table Styles */
//         .visit-tracking-table-wrapper {
//           overflow-x: auto;
//           -webkit-overflow-scrolling: touch;
//         }

//         .visit-tracking-table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 13px;
//           min-width: 700px;
//         }

//         .visit-tracking-table th {
//           padding: 10px;
//           background: #f8f9fa;
//           text-align: left;
//           font-weight: bold;
//           color: #2d3748;
//           border-bottom: 2px solid #e2e8f0;
//         }

//         .visit-tracking-table td {
//           padding: 10px;
//           border-bottom: 1px solid #eee;
//           vertical-align: middle;
//         }

//         .visit-tracking-table tr {
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .visit-tracking-table tr:hover td {
//           background: #f7fafc;
//         }

//         .visit-tracking-table tr.selected td {
//           background: #ebf8ff;
//         }

//         .visit-tracking-table tr.disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .visit-tracking-table tr.disabled td {
//           background: #f7fafc;
//         }

//         .visit-tracking-table .status-badge {
//           font-weight: bold;
//         }

//         .visit-tracking-table .status-badge.inprogress { color: #48bb78; }
//         .visit-tracking-table .status-badge.new { color: #4299e1; }
//         .visit-tracking-table .status-badge.closed { color: #718096; }

//         .visit-tracking-table .remaining-zero {
//           color: #48bb78;
//         }

//         .visit-tracking-table .remaining-positive {
//           color: #e53e3e;
//         }

//         .visit-tracking-table .btn-view {
//           background: #4299e1;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           padding: 4px 12px;
//           cursor: pointer;
//           font-size: 12px;
//           min-height: 30px;
//           transition: all 0.2s;
//         }

//         .visit-tracking-table .btn-view:hover:not(:disabled) {
//           transform: scale(1.05);
//         }

//         .visit-tracking-table .btn-view:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//         }

//         .visit-tracking-table .btn-view.danger {
//           background: #fc8181;
//         }

//         .visit-tracking-table .btn-view.danger:hover:not(:disabled) {
//           background: #f56565;
//         }

//         /* Card Styles */
//         .visit-tracking-card-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//           gap: 15px;
//         }

//         .visit-tracking-card {
//           background: white;
//           border-radius: 12px;
//           padding: 15px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//           border: 1px solid #edf2f7;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .visit-tracking-card:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//         }

//         .visit-tracking-card.selected {
//           border: 2px solid #4299e1;
//           background: #ebf8ff;
//         }

//         .visit-tracking-card.disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .visit-tracking-card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 10px;
//         }

//         .visit-tracking-card-id {
//           background: #4299e1;
//           color: white;
//           border-radius: 12px;
//           padding: 2px 10px;
//           font-size: 12px;
//         }

//         .visit-tracking-card-patient {
//           font-weight: bold;
//           flex: 1;
//           margin: 0 8px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .visit-tracking-card-status {
//           border-radius: 12px;
//           padding: 2px 10px;
//           font-size: 11px;
//           white-space: nowrap;
//         }

//         .visit-tracking-card-status.inprogress { background: #48bb78; color: white; }
//         .visit-tracking-card-status.new { background: #4299e1; color: white; }
//         .visit-tracking-card-status.closed { background: #edf2f7; color: #4a5568; }

//         .visit-tracking-card-body {
//           font-size: 13px;
//           color: #4a5568;
//         }

//         .visit-tracking-card-body .detail {
//           margin-bottom: 4px;
//         }

//         .visit-tracking-card-body .remaining-zero {
//           color: #48bb78;
//         }

//         .visit-tracking-card-body .remaining-positive {
//           color: #e53e3e;
//         }

//         .visit-tracking-card-actions {
//           margin-top: 10px;
//           display: flex;
//           gap: 5px;
//           flex-wrap: wrap;
//         }

//         .visit-tracking-card-checkbox {
//           margin-top: 4px;
//         }

//         .visit-tracking-card-checkbox label {
//           font-size: 12px;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }

//         .visit-tracking-card-checkbox input[type="checkbox"] {
//           cursor: pointer;
//         }

//         /* Responsive */
//         @media (max-width: 768px) {
//           .visit-tracking-container {
//             padding: 12px;
//           }

//           .visit-tracking-header h2 {
//             font-size: 20px;
//           }

//           .visit-tracking-search-row {
//             flex-direction: column;
//             align-items: stretch;
//           }

//           .visit-tracking-search-row select,
//           .visit-tracking-search-row input {
//             width: 100%;
//             min-width: unset;
//           }

//           .visit-tracking-search-row input {
//             min-width: unset;
//           }

//           .visit-tracking-toolbar {
//             flex-direction: column;
//             align-items: stretch;
//           }

//           .visit-tracking-status-msg {
//             margin-left: 0;
//             text-align: center;
//           }

//           .visit-tracking-actions {
//             flex-direction: column;
//           }

//           .visit-tracking-actions button {
//             width: 100%;
//           }

//           .visit-tracking-table {
//             font-size: 12px;
//             min-width: 500px;
//           }

//           .visit-tracking-table th,
//           .visit-tracking-table td {
//             padding: 6px 8px;
//           }

//           .visit-tracking-table .btn-view {
//             font-size: 10px;
//             padding: 3px 8px;
//             min-height: 24px;
//           }

//           .visit-tracking-card-grid {
//             grid-template-columns: 1fr;
//           }

//           .visit-tracking-card {
//             padding: 12px;
//           }
//         }

//         @media (max-width: 480px) {
//           .visit-tracking-container {
//             padding: 8px;
//           }

//           .visit-tracking-header h2 {
//             font-size: 17px;
//           }

//           .visit-tracking-close-btn {
//             font-size: 12px;
//             padding: 6px 12px;
//             min-height: 32px;
//           }

//           .visit-tracking-search-row select,
//           .visit-tracking-search-row input {
//             font-size: 15px;
//             min-height: 36px;
//           }

//           .visit-tracking-btn {
//             font-size: 12px;
//             padding: 6px 12px;
//             min-height: 34px;
//           }

//           .visit-tracking-toggle-btn {
//             font-size: 12px;
//             padding: 6px 12px;
//             min-height: 34px;
//           }

//           .visit-tracking-table {
//             font-size: 11px;
//             min-width: 400px;
//           }

//           .visit-tracking-table th,
//           .visit-tracking-table td {
//             padding: 4px 6px;
//           }

//           .visit-tracking-card {
//             padding: 10px;
//           }

//           .visit-tracking-card .card-patient {
//             font-size: 14px;
//           }
//         }

//         @media (min-width: 769px) and (max-width: 1024px) {
//           .visit-tracking-card-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }

//         /* Dark mode */
//         @media (prefers-color-scheme: dark) {
//           .visit-tracking-container {
//             background: #1a1a2e;
//           }

//           .visit-tracking-header h2 {
//             color: #ecf0f1;
//           }

//           .visit-tracking-close-btn {
//             background: #2d2d44;
//             color: #b0b0b0;
//           }

//           .visit-tracking-close-btn:hover {
//             background: #3d3d5c;
//           }

//           .visit-tracking-search-section,
//           .visit-tracking-content {
//             background: #2d2d44;
//           }

//           .visit-tracking-search-row select,
//           .visit-tracking-search-row input {
//             background: #1a1a2e;
//             border-color: #3d3d5c;
//             color: #ecf0f1;
//           }

//           .visit-tracking-search-row select:focus,
//           .visit-tracking-search-row input:focus {
//             border-color: #4299e1;
//           }

//           .visit-tracking-search-row input::placeholder {
//             color: #666;
//           }

//           .visit-tracking-toggle-btn {
//             background: #2d2d44;
//             border-color: #3d3d5c;
//             color: #b0b0b0;
//           }

//           .visit-tracking-toggle-btn.active {
//             background: #4299e1;
//             color: white;
//             border-color: #4299e1;
//           }

//           .visit-tracking-toggle-btn:hover:not(.active) {
//             background: #3d3d5c;
//           }

//           .visit-tracking-status-msg {
//             color: #b0b0b0;
//           }

//           .visit-tracking-table th {
//             background: #1a1a2e;
//             color: #ecf0f1;
//             border-bottom-color: #3d3d5c;
//           }

//           .visit-tracking-table td {
//             color: #b0b0b0;
//             border-bottom-color: #3d3d5c;
//           }

//           .visit-tracking-table tr:hover td {
//             background: #1a1a2e;
//           }

//           .visit-tracking-table tr.selected td {
//             background: #1a2744;
//           }

//           .visit-tracking-table .status-badge.inprogress { color: #4CAF50; }
//           .visit-tracking-table .status-badge.new { color: #63b3ed; }
//           .visit-tracking-table .status-badge.closed { color: #888; }

//           .visit-tracking-table .btn-view {
//             background: #3182ce;
//           }

//           .visit-tracking-table .btn-view:hover:not(:disabled) {
//             background: #4299e1;
//           }

//           .visit-tracking-table .btn-view.danger {
//             background: #c53030;
//           }

//           .visit-tracking-table .btn-view.danger:hover:not(:disabled) {
//             background: #fc8181;
//           }

//           .visit-tracking-card {
//             background: #2d2d44;
//             border-color: #3d3d5c;
//           }

//           .visit-tracking-card.selected {
//             border-color: #4299e1;
//             background: #1a2744;
//           }

//           .visit-tracking-card-patient {
//             color: #ecf0f1;
//           }

//           .visit-tracking-card-body {
//             color: #b0b0b0;
//           }

//           .visit-tracking-card-status.closed {
//             background: #2d2d44;
//             color: #b0b0b0;
//           }

//           .visit-tracking-card .remaining-zero {
//             color: #4CAF50;
//           }

//           .visit-tracking-card .remaining-positive {
//             color: #fc8181;
//           }

//           .visit-tracking-btn-primary {
//             background: #3182ce;
//           }

//           .visit-tracking-btn-primary:hover:not(:disabled) {
//             background: #4299e1;
//           }

//           .visit-tracking-btn-danger {
//             background: #c53030;
//           }

//           .visit-tracking-btn-danger:hover:not(:disabled) {
//             background: #fc8181;
//           }

//           .visit-tracking-btn-success {
//             background: #2f855a;
//           }

//           .visit-tracking-btn-success:hover:not(:disabled) {
//             background: #38a169;
//           }

//           .visit-tracking-btn-secondary {
//             background: #2d2d44;
//             color: #b0b0b0;
//           }

//           .visit-tracking-btn-secondary:hover:not(:disabled) {
//             background: #3d3d5c;
//           }

//           .visit-tracking-loading {
//             color: #666;
//           }

//           .visit-tracking-empty {
//             color: #666;
//           }

//           .visit-tracking-card-checkbox label {
//             color: #b0b0b0;
//           }
//         }
//       `}</style>

//       <div className="visit-tracking-container">
//         {/* Header */}
//         <div className="visit-tracking-header">
//           <h2>📋 {t.title}</h2>
//           <button className="visit-tracking-close-btn" onClick={onClose}>
//             ✕ {t.btn.close}
//           </button>
//         </div>

//         {/* Search Section */}
//         <div className="visit-tracking-search-section">
//           <div className="visit-tracking-search-row">
//             <select
//               value={searchBy}
//               onChange={e => setSearchBy(e.target.value)}
//             >
//               <option value="name">{t.search.name}</option>
//               <option value="mobile">{t.search.mobile}</option>
//             </select>
//             <input
//               type="text"
//               placeholder={t.search.placeholder}
//               value={searchText}
//               onChange={e => setSearchText(e.target.value)}
//               onKeyPress={e => e.key === 'Enter' && performSearch()}
//             />
//             <button
//               className="visit-tracking-btn visit-tracking-btn-primary"
//               onClick={performSearch}
//               disabled={!searchText || searchText.trim().length < 2}
//             >
//               🔍 {t.btn.search}
//             </button>
//             <button
//               className="visit-tracking-btn visit-tracking-btn-danger"
//               onClick={clearSearch}
//             >
//               🗑️ {t.btn.clear}
//             </button>
//           </div>
//         </div>

//         {/* View Toggle */}
//         <div className="visit-tracking-toolbar">
//           <button
//             className={`visit-tracking-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
//             onClick={() => setViewMode('table')}
//           >
//             📋 {t.btn.table}
//           </button>
//           <button
//             className={`visit-tracking-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
//             onClick={() => setViewMode('card')}
//           >
//             🃏 {t.btn.cards}
//           </button>
//           <span className="visit-tracking-status-msg">{statusMsg}</span>
//         </div>

//         {/* Content */}
//         <div className="visit-tracking-content">
//           {loading ? (
//             <div className="visit-tracking-loading">⏳ Loading...</div>
//           ) : filteredVisits.length === 0 ? (
//             <div className="visit-tracking-empty">📭 No visits found</div>
//           ) : viewMode === 'table' ? (
//             <div className="visit-tracking-table-wrapper">
//               <table className="visit-tracking-table">
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Patient</th>
//                     <th>Doctor</th>
//                     <th>Type</th>
//                     <th>Status</th>
//                     <th>Payment</th>
//                     <th>Amount</th>
//                     <th>Insurance Paid</th>
//                     <th>Remaining</th>
//                     <th>Details</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredVisits.map(visit => {
//                     const disabled = shouldDisableRow(visit);
//                     const remaining = Math.max(0, visit.amount - visit.totalPaid);

//                     return (
//                       <tr
//                         key={visit.id}
//                         className={`${selectedVisit?.id === visit.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
//                         onClick={() => {
//                           if (!disabled) {
//                             setSelectedVisit(visit);
//                             logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
//                           }
//                         }}
//                       >
//                         <td>{visit.id}</td>
//                         <td>{visit.patientName}</td>
//                         <td>{visit.doctorName}</td>
//                         <td>{visit.visitType}</td>
//                         <td>
//                           <span className={`status-badge 
//                             ${visit.visitStatus === 'IN_PROGRESS' ? 'inprogress' : 
//                               visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? 'new' : 
//                               'closed'}`}>
//                             {visit.visitStatus}
//                           </span>
//                         </td>
//                         <td>{visit.paymentMethod}</td>
//                         <td>{visit.amount.toFixed(2)}</td>
//                         <td>
//                           {visit.paymentMethod === 'INSURANCE' && (
//                             <input
//                               type="checkbox"
//                               checked={visit.insurancePaid || false}
//                               disabled={visit.insurancePaid}
//                               onChange={() => handleMarkInsurancePaid(visit.id)}
//                               style={{ cursor: 'pointer' }}
//                             />
//                           )}
//                         </td>
//                         <td className={remaining === 0 ? 'remaining-zero' : 'remaining-positive'}>
//                           {remaining.toFixed(2)}
//                         </td>
//                         <td>
//                           <button
//                             className={`btn-view ${disabled ? 'danger' : ''}`}
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               showPaymentDetails(visit.id);
//                             }}
//                             disabled={disabled}
//                           >
//                             📋 {t.btn.view}
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="visit-tracking-card-grid">
//               {filteredVisits.map(visit => {
//                 const disabled = shouldDisableRow(visit);
//                 const remaining = Math.max(0, visit.amount - visit.totalPaid);

//                 return (
//                   <div
//                     key={visit.id}
//                     className={`visit-tracking-card ${selectedVisit?.id === visit.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
//                     onClick={() => {
//                       if (!disabled) {
//                         setSelectedVisit(visit);
//                         logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
//                       }
//                     }}
//                   >
//                     <div className="visit-tracking-card-header">
//                       <span className="visit-tracking-card-id">#{visit.id}</span>
//                       <span className="visit-tracking-card-patient">{visit.patientName}</span>
//                       <span className={`visit-tracking-card-status 
//                         ${visit.visitStatus === 'IN_PROGRESS' ? 'inprogress' : 
//                           visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? 'new' : 
//                           'closed'}`}>
//                         {visit.visitStatus}
//                       </span>
//                     </div>
//                     <div className="visit-tracking-card-body">
//                       <div className="detail">👨‍⚕️ {visit.doctorName}</div>
//                       <div className="detail">📋 {visit.visitType} | 💳 {visit.paymentMethod}</div>
//                       <div className="detail">
//                         💰 {visit.amount.toFixed(2)} | Remaining: <span className={remaining === 0 ? 'remaining-zero' : 'remaining-positive'}>{remaining.toFixed(2)}</span>
//                       </div>
//                       {visit.paymentMethod === 'INSURANCE' && (
//                         <div className="visit-tracking-card-checkbox">
//                           <label>
//                             <input
//                               type="checkbox"
//                               checked={visit.insurancePaid || false}
//                               disabled={visit.insurancePaid}
//                               onChange={(e) => {
//                                 e.stopPropagation();
//                                 handleMarkInsurancePaid(visit.id);
//                               }}
//                             /> Insurance Paid
//                           </label>
//                         </div>
//                       )}
//                     </div>
//                     <button
//                       className="btn-view"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         showPaymentDetails(visit.id);
//                       }}
//                     >
//                       📋 {t.btn.view}
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         {selectedVisit && (
//           <div className="visit-tracking-actions">
//             <button
//               className="visit-tracking-btn visit-tracking-btn-success"
//               onClick={handleStartVisit}
//               disabled={!canStartVisit(selectedVisit)}
//             >
//               ▶ {t.btn.start}
//             </button>
//             <button
//               className="visit-tracking-btn visit-tracking-btn-danger"
//               onClick={handleEndVisit}
//               disabled={!canEndVisit(selectedVisit)}
//             >
//               ⏹ {t.btn.end}
//             </button>
//             <button
//               className="visit-tracking-btn visit-tracking-btn-success"
//               onClick={handlePayment}
//               disabled={!canPay(selectedVisit)}
//             >
//               💰 {t.btn.pay}
//             </button>
//           </div>
//         )}

//         {/* Payment Modal */}
//         {showPayment && selectedVisit && (
//           <VisitPayScreen
//             visit={selectedVisit}
//             remaining={Math.max(0, selectedVisit.amount - selectedVisit.totalPaid)}
//             loggedUser={loggedUser}
//             onClose={handlePaymentModalClose}
//             onPaymentComplete={handlePaymentComplete}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default VisitTrackingScreen;   13072026  11:00 am

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { BASE_URL } from '../../utils/api';
import VisitPayScreen from './VisitPayScreen';

// ---------- Translations ----------
const translations = {
  en: {
    title: 'Visit Tracking',
    search: {
      name: 'Name',
      mobile: 'Mobile',
      placeholder: 'Search by name or mobile...',
    },
    btn: {
      search: 'Search',
      clear: 'Clear',
      start: 'Start Visit',
      end: 'End Visit',
      pay: 'Payment',
      view: 'View',
      yes: 'Yes',
      no: 'No',
      close: 'Close',
      cancel: 'Cancel',
      table: 'Table',
      cards: 'Cards',
    },
    col: {
      id: 'ID',
      patient: 'Patient',
      doctor: 'Doctor',
      type: 'Type',
      status: 'Status',
      payment: 'Payment',
      amount: 'Amount',
      insurancePaid: 'Insurance Paid',
      remaining: 'Remaining',
      details: 'Details',
    },
    status: {
      ready: 'Ready',
      loading: 'Loading...',
      found: 'Found',
      cleared: 'Cleared',
      visit: 'Visit',
      success: 'successfully',
    },
    msg: {
      enterSearchValue: 'Please enter a search value',
      noPatients: 'No patients found',
      selectVisit: 'Please select a visit',
      visitActionFailedHttp: 'Visit {0} failed (HTTP {1})',
      visitActionFailedError: 'Visit {0} failed: {1}',
      noInsuranceId: 'No insurance ID found',
      insuranceMarked: 'Insurance marked as paid',
      insuranceFailed: 'Failed to mark insurance as paid',
      insuranceServiceError: 'Insurance service error',
      paymentDetailsFailed: 'Failed to load payment details',
      paymentDetailsError: 'Error loading payment details',
      searchFailed: 'Search failed',
      closeConfirm: 'Are you sure you want to close this screen?',
      confirmClose: 'Confirm Close',
    },
    confirm: {
      title: 'Confirm',
      header: 'Insurance Payment',
      message: 'Mark insurance as paid?',
    },
    payment: {
      details: {
        title: 'Payment Details',
      },
      original: 'Original Amount',
      insurance: 'Insurance Amount',
      insurancePaid: 'Insurance Paid',
      insuranceDiscount: 'Insurance Discount',
      patientPaid: 'Patient Paid',
      remaining: 'Remaining',
      transactions: 'Transactions',
    },
    label: {
      visits: 'visits',
    },
    alert: {
      title: 'Information',
    },
    tooltip: {
      visitClosed: 'Visit not available',
    },
  },
  ar: {
    title: 'تتبع الزيارات',
    search: {
      name: 'الاسم',
      mobile: 'الجوال',
      placeholder: 'ابحث بالاسم أو رقم الجوال...',
    },
    btn: {
      search: 'بحث',
      clear: 'مسح',
      start: 'بدء الزيارة',
      end: 'إنهاء الزيارة',
      pay: 'دفع',
      view: 'عرض',
      yes: 'نعم',
      no: 'لا',
      close: 'إغلاق',
      cancel: 'إلغاء',
      table: 'جدول',
      cards: 'بطاقات',
    },
    col: {
      id: 'الرقم',
      patient: 'المريض',
      doctor: 'الطبيب',
      type: 'النوع',
      status: 'الحالة',
      payment: 'الدفع',
      amount: 'المبلغ',
      insurancePaid: 'دفع التأمين',
      remaining: 'المتبقي',
      details: 'التفاصيل',
    },
    status: {
      ready: 'جاهز',
      loading: 'جاري التحميل...',
      found: 'تم العثور على',
      cleared: 'تم المسح',
      visit: 'الزيارة',
      success: 'بنجاح',
    },
    msg: {
      enterSearchValue: 'يرجى إدخال قيمة للبحث',
      noPatients: 'لم يتم العثور على مرضى',
      selectVisit: 'يرجى تحديد زيارة',
      visitActionFailedHttp: 'فشل {0} الزيارة (HTTP {1})',
      visitActionFailedError: 'فشل {0} الزيارة: {1}',
      noInsuranceId: 'لم يتم العثور على رقم تأمين',
      insuranceMarked: 'تم تحديد التأمين كمدفوع',
      insuranceFailed: 'فشل تحديد التأمين كمدفوع',
      insuranceServiceError: 'خطأ في خدمة التأمين',
      paymentDetailsFailed: 'فشل تحميل تفاصيل الدفع',
      paymentDetailsError: 'خطأ في تحميل تفاصيل الدفع',
      searchFailed: 'فشل البحث',
      closeConfirm: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
      confirmClose: 'تأكيد الإغلاق',
    },
    confirm: {
      title: 'تأكيد',
      header: 'دفع التأمين',
      message: 'تأكيد دفع التأمين؟',
    },
    payment: {
      details: {
        title: 'تفاصيل الدفع',
      },
      original: 'المبلغ الأصلي',
      insurance: 'مبلغ التأمين',
      insurancePaid: 'المدفوع من التأمين',
      insuranceDiscount: 'خصم التأمين',
      patientPaid: 'المدفوع من المريض',
      remaining: 'المتبقي',
      transactions: 'المعاملات',
    },
    label: {
      visits: 'زيارات',
    },
    alert: {
      title: 'معلومات',
    },
    tooltip: {
      visitClosed: 'الزيارة غير متاحة',
    },
  },
};

// ---------- Main Component ----------
const VisitTrackingScreen = ({ loggedUser, lang = 'en', onClose }) => {
  const t = translations[lang] || translations.en;

  // ---------- State ----------
  const [searchBy, setSearchBy] = useState('name');
  const [searchText, setSearchText] = useState('');
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
  const [viewMode, setViewMode] = useState('table');
  const [showPayment, setShowPayment] = useState(false);
  
  // Add ref to store current patient IDs for refresh
  const currentPatientIdsRef = useRef([]);

  // ---------- Helper: log action ----------
  const logAction = useCallback(async (action, details) => {
    try {
      await fetch(`${BASE_URL}/api/logs/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedUser, action, details }),
      });
    } catch (e) { /* ignore */ }
  }, [loggedUser]);

  // ---------- Parse a single visit ----------
  const parseVisit = (v) => {
    const p = v.patient || {};
    const d = v.doctor || {};

    let originalAmount = v.originalAmount || 0;
    let paidAmount = 0;
    let paymentMethod = 'FREE';
    let insurancePaid = false;
    let insuranceFormId = null;
    let insuranceCardId = null;

    const payments = v.payments || [];

    let hasCash = false;
    let hasPos = false;
    let hasInsurance = false;

    payments.forEach(pay => {
      const method = pay.paymentMethod;
      const amount = pay.amount || 0;

      if (method === 'CASH') hasCash = true;
      if (method === 'POS') hasPos = true;
      if (method === 'INSURANCE') {
        hasInsurance = true;
        insurancePaid = pay.insurancePaid || false;
        insuranceFormId = pay.insuranceFormId || null;
        insuranceCardId = pay.insuranceCardId || null;
      }
      paidAmount += amount;
    });

    if (hasInsurance) paymentMethod = 'INSURANCE';
    else if (hasCash && hasPos) paymentMethod = 'CASH + POS';
    else if (hasCash) paymentMethod = 'CASH';
    else if (hasPos) paymentMethod = 'POS';

    const totalPaid = paidAmount || 0;
    const remaining = Math.max(0, originalAmount - totalPaid);

    return {
      id: v.id,
      patientId: p.id || null,
      patientName: p.fullName || `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'Unknown',
      doctorName: d.fullName || `${d.firstName || ''} ${d.lastName || ''}`.trim() || 'Unknown',
      visitType: v.visitType || 'N/A',
      visitStatus: v.visitStatus || 'NEW',
      paid: v.paid ? 'YES' : 'NO',
      paymentMethod: paymentMethod,
      amount: originalAmount,
      totalPaid: totalPaid,
      remaining: remaining,
      insurancePaid: insurancePaid,
      insuranceFormId: insuranceFormId,
      insuranceCardId: insuranceCardId,
      payments: payments,
    };
  };

  // ---------- Fetch visits by patient IDs ----------
  const fetchVisits = useCallback(async (patientIds, clearSelection = false) => {
    if (!patientIds || patientIds.length === 0) {
      setFilteredVisits([]);
      setSelectedVisit(null);
      return [];
    }

    setLoading(true);
    setStatusMsg(`⏳ ${t.status.loading}`);

    try {
      const res = await fetch(`${BASE_URL}/api/visits/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientIds),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      let allVisits = [];

      for (const key in data) {
        const visitArray = data[key];
        if (Array.isArray(visitArray)) {
          visitArray.forEach(v => {
            allVisits.push(parseVisit(v));
          });
        }
      }

      setFilteredVisits(allVisits);

      if (clearSelection) {
        setSelectedVisit(null);
      }

      setStatusMsg(`✅ ${t.status.found} ${allVisits.length} ${t.label.visits}`);

      return allVisits;
    } catch (err) {
      setStatusMsg(`❌ ${err.message}`);
      setFilteredVisits([]);
      setSelectedVisit(null);
      return [];
    } finally {
      setLoading(false);
    }
  }, [t]);

  // ---------- Auto-refresh function ----------
  const refreshVisits = useCallback(async () => {
    if (currentPatientIdsRef.current.length === 0) return [];

    const visits = await fetchVisits(currentPatientIdsRef.current, false);
    return visits;
  }, [fetchVisits]);

  useEffect(() => {
    if (!selectedVisit?.id) return;

    const updated = filteredVisits.find(v => v.id === selectedVisit.id);

    if (updated) {
      setSelectedVisit(prev => {
        if (prev && JSON.stringify(prev) === JSON.stringify(updated)) {
          return prev;
        }
        return updated;
      });
    }
  }, [filteredVisits, selectedVisit?.id]);

  // ---------- Search handlers ----------
  const performSearch = useCallback(async () => {
    if (!searchText || searchText.trim().length < 2) {
      setStatusMsg(`⚠️ ${t.msg.enterSearchValue}`);
      return;
    }

    setLoading(true);
    setStatusMsg(`⏳ ${t.status.loading}`);

    try {
      const endpoint = searchBy === 'mobile'
        ? `${BASE_URL}/api/patients/search/mobile/${encodeURIComponent(searchText)}`
        : `${BASE_URL}/api/patients/search/name/${encodeURIComponent(searchText)}`;

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const patients = await res.json();
      const patientIds = patients.map(p => p.id);
      
      currentPatientIdsRef.current = patientIds;

      if (patientIds.length === 0) {
        setStatusMsg(`📭 ${t.msg.noPatients}`);
        setFilteredVisits([]);
        setLoading(false);
        return;
      }

      await fetchVisits(patientIds);
      logAction('SEARCH_VISITS', `Searched by ${searchBy} = ${searchText}`);
    } catch (err) {
      setStatusMsg(`❌ ${t.msg.searchFailed}: ${err.message}`);
      setFilteredVisits([]);
    } finally {
      setLoading(false);
    }
  }, [searchBy, searchText, fetchVisits, t, logAction]);

  const clearSearch = useCallback(() => {
    setSearchText('');
    setFilteredVisits([]);
    setSelectedVisit(null);
    currentPatientIdsRef.current = [];
    setStatusMsg(`🗑️ ${t.status.cleared}`);
  }, [t]);

  // ---------- Visit actions ----------
  const updateVisitStatus = async (visitId, action) => {
    if (!selectedVisit && !visitId) {
      alert(t.msg.selectVisit);
      return;
    }

    const id = visitId || selectedVisit?.id;
    if (!id) return;

    try {
      const res = await fetch(`${BASE_URL}/api/visits/${id}/${action}`, {
        method: 'PUT',
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      await refreshVisits();
      setSelectedVisit(null);

      setStatusMsg(`✅ ${t.status.visit} ${action}ed ${t.status.success}`);
      logAction(`VISIT_${action.toUpperCase()}`, `${action}ed visit ${id}`);
    } catch (err) {
      alert(`${t.msg.visitActionFailedError.replace('{0}', action).replace('{1}', err.message)}`);
    }
  };

  const handleStartVisit = () => updateVisitStatus(null, 'start');
  const handleEndVisit = () => updateVisitStatus(null, 'end');

  const handlePaymentComplete = useCallback(async (amount) => {
    const id = selectedVisit?.id;

    const visits = await refreshVisits();

    const updated = visits.find(v => v.id === id);

    setSelectedVisit(updated || null);
    setShowPayment(false);

    setStatusMsg(`✅ Payment of ${amount} completed successfully`);
  }, [selectedVisit, refreshVisits]);

  const handlePayment = () => {
    if (!selectedVisit) {
      alert(t.msg.selectVisit);
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentModalClose = useCallback(async () => {
    setShowPayment(false);
    
    await refreshVisits();
    
    if (selectedVisit) {
      const updatedVisit = filteredVisits.find(v => v.id === selectedVisit.id);
      if (updatedVisit) {
        setSelectedVisit(updatedVisit);
      }
    }
    
    setStatusMsg(`🔄 Table refreshed`);
  }, [selectedVisit, filteredVisits, refreshVisits]);

  const handleMarkInsurancePaid = async (visitId) => {
    if (!window.confirm(t.confirm.message)) return;

    const visit = filteredVisits.find(v => v.id === visitId);
    if (!visit) return;

    try {
      const insuranceId = visit.insuranceFormId || visit.insuranceCardId;
      if (!insuranceId) {
        alert(t.msg.noInsuranceId);
        return;
      }

      const params = new URLSearchParams();
      if (visit.insuranceFormId) params.append('insuranceFormId', visit.insuranceFormId);
      if (visit.insuranceCardId) params.append('insuranceCardId', visit.insuranceCardId);

      const res = await fetch(`${BASE_URL}/api/visits/mark-insurance-paid?${params.toString()}`, {
        method: 'PUT',
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      await refreshVisits();

      setStatusMsg(`✅ ${t.msg.insuranceMarked}`);
      logAction('MARK_INSURANCE_PAID', `Marked insurance paid for visit ${visitId}`);
    } catch (err) {
      alert(`${t.msg.insuranceFailed}: ${err.message}`);
    }
  };

  const showPaymentDetails = async (visitId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/visits/${visitId}/payments`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      let msg = `💳 Payment Details for Visit #${visitId}\n\n`;
      msg += `Original Amount: ${data.originalAmount || 0}\n`;
      msg += `Insurance Amount: ${data.insuranceAmount || 0}\n`;
      msg += `Insurance Paid: ${data.insurancePaidAmount || 0}\n`;
      msg += `Insurance Discount: ${data.insuranceDiscount || 0}\n`;
      msg += `Patient Paid: ${data.patientPaid || 0}\n`;
      msg += `Remaining: ${data.remainingAmount || 0}\n\n`;
      msg += `--- Transactions ---\n`;

      (data.payments || []).forEach(p => {
        msg += `${p.paymentMethod} | ${p.amount} | ${p.paidAt || ''}\n`;
      });

      alert(msg);
    } catch (err) {
      alert(`${t.msg.paymentDetailsFailed}: ${err.message}`);
    }
  };

  // ---------- Determine if row should be disabled ----------
  const shouldDisableRow = (visit) => {
    if (!visit) return false;
    const remaining = Math.max(0, visit.amount - visit.totalPaid);
    return visit.visitStatus === 'CLOSED' && visit.amount > 0 && remaining === 0;
  };

  // ---------- Check if actions are available ----------
  const canStartVisit = (visit) => {
    if (!visit) return false;
    const remaining = Math.max(0, visit.amount - visit.totalPaid);
    const isNew = ['NEW', 'CREATED'].includes(visit.visitStatus);
    const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
    const isSpecial = visit.visitStatus === 'CREATED' && visit.amount > 0 && remaining === 0;
    return (isNew && notPaid) || isSpecial;
  };

  const canEndVisit = (visit) => {
    if (!visit) return false;
    const remaining = Math.max(0, visit.amount - visit.totalPaid);
    const isInProgress = visit.visitStatus === 'IN_PROGRESS';
    const notPaid = visit.paid !== 'YES' && !visit.insurancePaid;
    const isSpecial = visit.visitStatus === 'IN_PROGRESS' && remaining === 0 && visit.amount > 0;
    return (isInProgress && notPaid) || isSpecial;
  };

  const canPay = (visit) => {
    if (!visit) return false;
    return visit.paid !== 'YES' && !visit.insurancePaid;
  };

  // ---------- Render ----------
  return (
    <>
      <style>{`
        /* ==================== VISIT TRACKING STYLES ==================== */
        .visit-tracking-container {
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .visit-tracking-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .visit-tracking-header h2 {
          margin: 0;
          font-size: 24px;
          color: #2d3748;
        }

        .visit-tracking-close-btn {
          background: #e2e8f0;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          min-height: 38px;
          transition: all 0.2s;
        }

        .visit-tracking-close-btn:hover {
          background: #cbd5e0;
        }

        .visit-tracking-search-section {
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }

        .visit-tracking-search-row {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .visit-tracking-search-row select,
        .visit-tracking-search-row input {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          min-height: 38px;
        }

        .visit-tracking-search-row select:focus,
        .visit-tracking-search-row input:focus {
          outline: none;
          border-color: #4299e1;
        }

        .visit-tracking-search-row input {
          flex: 1;
          min-width: 200px;
        }

        .visit-tracking-btn {
          color: white;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          cursor: pointer;
          min-height: 38px;
          transition: all 0.2s;
          touch-action: manipulation;
        }

        .visit-tracking-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .visit-tracking-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .visit-tracking-btn-primary {
          background: #4299e1;
        }

        .visit-tracking-btn-primary:hover:not(:disabled) {
          background: #3182ce;
        }

        .visit-tracking-btn-danger {
          background: #fc8181;
        }

        .visit-tracking-btn-danger:hover:not(:disabled) {
          background: #f56565;
        }

        .visit-tracking-btn-success {
          background: #48bb78;
        }

        .visit-tracking-btn-success:hover:not(:disabled) {
          background: #38a169;
        }

        .visit-tracking-btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .visit-tracking-btn-secondary:hover:not(:disabled) {
          background: #cbd5e0;
        }

        .visit-tracking-toolbar {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          align-items: center;
          flex-wrap: wrap;
        }

        .visit-tracking-toggle-btn {
          background: #edf2f7;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          min-height: 38px;
          transition: all 0.2s;
        }

        .visit-tracking-toggle-btn.active {
          background: #4299e1;
          color: white;
          font-weight: bold;
          border-color: #4299e1;
        }

        .visit-tracking-toggle-btn:hover:not(.active) {
          background: #e2e8f0;
        }

        .visit-tracking-status-msg {
          margin-left: auto;
          color: #4a5568;
          font-size: 13px;
        }

        .visit-tracking-content {
          background: white;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          min-height: 300px;
        }

        .visit-tracking-loading {
          text-align: center;
          padding: 40px;
          color: #7f8c8d;
        }

        .visit-tracking-empty {
          text-align: center;
          padding: 40px;
          color: #a0aec0;
        }

        .visit-tracking-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Table Styles */
        .visit-tracking-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .visit-tracking-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 700px;
        }

        .visit-tracking-table th {
          padding: 10px;
          background: #f8f9fa;
          text-align: left;
          font-weight: bold;
          color: #2d3748;
          border-bottom: 2px solid #e2e8f0;
        }

        .visit-tracking-table td {
          padding: 10px;
          border-bottom: 1px solid #eee;
          vertical-align: middle;
        }

        .visit-tracking-table tr {
          cursor: pointer;
          transition: background 0.2s;
        }

        .visit-tracking-table tr:hover td {
          background: #f7fafc;
        }

        .visit-tracking-table tr.selected td {
          background: #ebf8ff;
        }

        .visit-tracking-table tr.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .visit-tracking-table tr.disabled td {
          background: #f7fafc;
        }

        .visit-tracking-table .status-badge {
          font-weight: bold;
        }

        .visit-tracking-table .status-badge.inprogress { color: #48bb78; }
        .visit-tracking-table .status-badge.new { color: #4299e1; }
        .visit-tracking-table .status-badge.closed { color: #718096; }

        .visit-tracking-table .remaining-zero {
          color: #48bb78;
        }

        .visit-tracking-table .remaining-positive {
          color: #e53e3e;
        }

        .visit-tracking-table .btn-view {
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 4px 12px;
          cursor: pointer;
          font-size: 12px;
          min-height: 30px;
          transition: all 0.2s;
          touch-action: manipulation;
        }

        .visit-tracking-table .btn-view:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .visit-tracking-table .btn-view:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .visit-tracking-table .btn-view.danger {
          background: #fc8181;
        }

        .visit-tracking-table .btn-view.danger:hover:not(:disabled) {
          background: #f56565;
        }

        /* Card Styles */
        .visit-tracking-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
        }

        .visit-tracking-card {
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border: 1px solid #edf2f7;
          cursor: pointer;
          transition: all 0.2s;
        }

        .visit-tracking-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }

        .visit-tracking-card.selected {
          border: 2px solid #4299e1;
          background: #ebf8ff;
        }

        .visit-tracking-card.disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .visit-tracking-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .visit-tracking-card-id {
          background: #4299e1;
          color: white;
          border-radius: 12px;
          padding: 2px 10px;
          font-size: 12px;
        }

        .visit-tracking-card-patient {
          font-weight: bold;
          flex: 1;
          margin: 0 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .visit-tracking-card-status {
          border-radius: 12px;
          padding: 2px 10px;
          font-size: 11px;
          white-space: nowrap;
        }

        .visit-tracking-card-status.inprogress { background: #48bb78; color: white; }
        .visit-tracking-card-status.new { background: #4299e1; color: white; }
        .visit-tracking-card-status.closed { background: #edf2f7; color: #4a5568; }

        .visit-tracking-card-body {
          font-size: 13px;
          color: #4a5568;
        }

        .visit-tracking-card-body .detail {
          margin-bottom: 4px;
        }

        .visit-tracking-card-body .remaining-zero {
          color: #48bb78;
        }

        .visit-tracking-card-body .remaining-positive {
          color: #e53e3e;
        }

        .visit-tracking-card-actions {
          margin-top: 10px;
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .visit-tracking-card-checkbox {
          margin-top: 4px;
        }

        .visit-tracking-card-checkbox label {
          font-size: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .visit-tracking-card-checkbox input[type="checkbox"] {
          cursor: pointer;
        }

       /* Update the mobile styles section - replace the .visit-tracking-actions part */

@media (max-width: 768px) {
  .visit-tracking-actions {
    position: sticky;
    bottom: 0;
    background: white;
    padding: 12px;
    margin: 0 -12px -12px -12px;
    border-top: 1px solid #e2e8f0;
    box-shadow: 0 -4px 10px rgba(0,0,0,0.1);
    z-index: 10;
    flex-direction: row !important;
    gap: 8px;
    /* Add these lines to ensure visibility */
    display: flex !important;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .visit-tracking-actions button {
    flex: 1;
    min-height: 48px;
    font-size: 14px;
    padding: 12px 8px;
    min-width: 80px; /* Add minimum width */
  }
  
  /* Add this to ensure the wrapper doesn't hide the buttons */
  .visit-tracking-actions-wrapper {
    position: relative;
    width: 100%;
    overflow: visible;
      min-height: 80px; /* Reserve space for actions */

  }
}

          .visit-tracking-container {
            padding: 12px;
          }

          .visit-tracking-header h2 {
            font-size: 20px;
          }

          .visit-tracking-search-row {
            flex-direction: column;
            align-items: stretch;
          }

          .visit-tracking-search-row select,
          .visit-tracking-search-row input {
            width: 100%;
            min-width: unset;
          }

          .visit-tracking-search-row input {
            min-width: unset;
          }

          .visit-tracking-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .visit-tracking-status-msg {
            margin-left: 0;
            text-align: center;
          }

          .visit-tracking-table {
            font-size: 12px;
            min-width: 500px;
          }

          .visit-tracking-table th,
          .visit-tracking-table td {
            padding: 6px 8px;
          }

          .visit-tracking-table .btn-view {
            font-size: 10px;
            padding: 3px 8px;
            min-height: 24px;
          }

          .visit-tracking-card-grid {
            grid-template-columns: 1fr;
          }

          .visit-tracking-card {
            padding: 12px;
          }

          /* Dark mode support for sticky actions */
          @media (prefers-color-scheme: dark) {
            .visit-tracking-actions {
              background: #2d2d44;
              border-top-color: #3d3d5c;
            }
          }
        }

        @media (max-width: 480px) {
          .visit-tracking-actions {
            padding: 10px;
            margin: 0 -8px -8px -8px;
            gap: 6px;
          }
          
          .visit-tracking-actions button {
            min-height: 44px;
            font-size: 12px;
            padding: 10px 6px;
          }

          .visit-tracking-container {
            padding: 8px;
          }

          .visit-tracking-header h2 {
            font-size: 17px;
          }

          .visit-tracking-close-btn {
            font-size: 12px;
            padding: 6px 12px;
            min-height: 32px;
          }

          .visit-tracking-search-row select,
          .visit-tracking-search-row input {
            font-size: 15px;
            min-height: 36px;
          }

          .visit-tracking-btn {
            font-size: 12px;
            padding: 6px 12px;
            min-height: 34px;
          }

          .visit-tracking-toggle-btn {
            font-size: 12px;
            padding: 6px 12px;
            min-height: 34px;
          }

          .visit-tracking-table {
            font-size: 11px;
            min-width: 400px;
          }

          .visit-tracking-table th,
          .visit-tracking-table td {
            padding: 4px 6px;
          }

          .visit-tracking-card {
            padding: 10px;
          }

          .visit-tracking-card .card-patient {
            font-size: 14px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .visit-tracking-card-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .visit-tracking-container {
            background: #1a1a2e;
          }

          .visit-tracking-header h2 {
            color: #ecf0f1;
          }

          .visit-tracking-close-btn {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .visit-tracking-close-btn:hover {
            background: #3d3d5c;
          }

          .visit-tracking-search-section,
          .visit-tracking-content {
            background: #2d2d44;
          }

          .visit-tracking-search-row select,
          .visit-tracking-search-row input {
            background: #1a1a2e;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .visit-tracking-search-row select:focus,
          .visit-tracking-search-row input:focus {
            border-color: #4299e1;
          }

          .visit-tracking-search-row input::placeholder {
            color: #666;
          }

          .visit-tracking-toggle-btn {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #b0b0b0;
          }

          .visit-tracking-toggle-btn.active {
            background: #4299e1;
            color: white;
            border-color: #4299e1;
          }

          .visit-tracking-toggle-btn:hover:not(.active) {
            background: #3d3d5c;
          }

          .visit-tracking-status-msg {
            color: #b0b0b0;
          }

          .visit-tracking-table th {
            background: #1a1a2e;
            color: #ecf0f1;
            border-bottom-color: #3d3d5c;
          }

          .visit-tracking-table td {
            color: #b0b0b0;
            border-bottom-color: #3d3d5c;
          }

          .visit-tracking-table tr:hover td {
            background: #1a1a2e;
          }

          .visit-tracking-table tr.selected td {
            background: #1a2744;
          }

          .visit-tracking-table .status-badge.inprogress { color: #4CAF50; }
          .visit-tracking-table .status-badge.new { color: #63b3ed; }
          .visit-tracking-table .status-badge.closed { color: #888; }

          .visit-tracking-table .btn-view {
            background: #3182ce;
          }

          .visit-tracking-table .btn-view:hover:not(:disabled) {
            background: #4299e1;
          }

          .visit-tracking-table .btn-view.danger {
            background: #c53030;
          }

          .visit-tracking-table .btn-view.danger:hover:not(:disabled) {
            background: #fc8181;
          }

          .visit-tracking-card {
            background: #2d2d44;
            border-color: #3d3d5c;
          }

          .visit-tracking-card.selected {
            border-color: #4299e1;
            background: #1a2744;
          }

          .visit-tracking-card-patient {
            color: #ecf0f1;
          }

          .visit-tracking-card-body {
            color: #b0b0b0;
          }

          .visit-tracking-card-status.closed {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .visit-tracking-card .remaining-zero {
            color: #4CAF50;
          }

          .visit-tracking-card .remaining-positive {
            color: #fc8181;
          }

          .visit-tracking-btn-primary {
            background: #3182ce;
          }

          .visit-tracking-btn-primary:hover:not(:disabled) {
            background: #4299e1;
          }

          .visit-tracking-btn-danger {
            background: #c53030;
          }

          .visit-tracking-btn-danger:hover:not(:disabled) {
            background: #fc8181;
          }

          .visit-tracking-btn-success {
            background: #2f855a;
          }

          .visit-tracking-btn-success:hover:not(:disabled) {
            background: #38a169;
          }

          .visit-tracking-btn-secondary {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .visit-tracking-btn-secondary:hover:not(:disabled) {
            background: #3d3d5c;
          }

          .visit-tracking-loading {
            color: #666;
          }

          .visit-tracking-empty {
            color: #666;
          }

          .visit-tracking-card-checkbox label {
            color: #b0b0b0;
          }
        }
      `}</style>

      <div className="visit-tracking-container">
        {/* Header */}
        <div className="visit-tracking-header">
          <h2>📋 {t.title}</h2>
          <button className="visit-tracking-close-btn" onClick={onClose}>
            ✕ {t.btn.close}
          </button>
        </div>

        {/* Search Section */}
        <div className="visit-tracking-search-section">
          <div className="visit-tracking-search-row">
            <select
              value={searchBy}
              onChange={e => setSearchBy(e.target.value)}
            >
              <option value="name">{t.search.name}</option>
              <option value="mobile">{t.search.mobile}</option>
            </select>
            <input
              type="text"
              placeholder={t.search.placeholder}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && performSearch()}
            />
            <button
              className="visit-tracking-btn visit-tracking-btn-primary"
              onClick={performSearch}
              disabled={!searchText || searchText.trim().length < 2}
            >
              🔍 {t.btn.search}
            </button>
            <button
              className="visit-tracking-btn visit-tracking-btn-danger"
              onClick={clearSearch}
            >
              🗑️ {t.btn.clear}
            </button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="visit-tracking-toolbar">
          <button
            className={`visit-tracking-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
          >
            📋 {t.btn.table}
          </button>
          <button
            className={`visit-tracking-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
            onClick={() => setViewMode('card')}
          >
            🃏 {t.btn.cards}
          </button>
          <span className="visit-tracking-status-msg">{statusMsg}</span>
        </div>

        {/* Content */}
        <div className="visit-tracking-content">
          {loading ? (
            <div className="visit-tracking-loading">⏳ Loading...</div>
          ) : filteredVisits.length === 0 ? (
            <div className="visit-tracking-empty">📭 No visits found</div>
          ) : viewMode === 'table' ? (
            <div className="visit-tracking-table-wrapper">
              <table className="visit-tracking-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Amount</th>
                    <th>Insurance Paid</th>
                    <th>Remaining</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisits.map(visit => {
                    const disabled = shouldDisableRow(visit);
                    const remaining = Math.max(0, visit.amount - visit.totalPaid);

                    return (
                      <tr
                        key={visit.id}
                        className={`${selectedVisit?.id === visit.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                        onClick={() => {
                          if (!disabled) {
                            setSelectedVisit(visit);
                            logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
                          }
                        }}
                      >
                        <td>{visit.id}</td>
                        <td>{visit.patientName}</td>
                        <td>{visit.doctorName}</td>
                        <td>{visit.visitType}</td>
                        <td>
                          <span className={`status-badge 
                            ${visit.visitStatus === 'IN_PROGRESS' ? 'inprogress' : 
                              visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? 'new' : 
                              'closed'}`}>
                            {visit.visitStatus}
                          </span>
                        </td>
                        <td>{visit.paymentMethod}</td>
                        <td>{visit.amount.toFixed(2)}</td>
                        <td>
                          {visit.paymentMethod === 'INSURANCE' && (
                            <input
                              type="checkbox"
                              checked={visit.insurancePaid || false}
                              disabled={visit.insurancePaid}
                              onChange={() => handleMarkInsurancePaid(visit.id)}
                              style={{ cursor: 'pointer' }}
                            />
                          )}
                        </td>
                        <td className={remaining === 0 ? 'remaining-zero' : 'remaining-positive'}>
                          {remaining.toFixed(2)}
                        </td>
                        <td>
                          <button
                            className={`btn-view ${disabled ? 'danger' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              showPaymentDetails(visit.id);
                            }}
                            disabled={disabled}
                          >
                            📋 {t.btn.view}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="visit-tracking-card-grid">
              {filteredVisits.map(visit => {
                const disabled = shouldDisableRow(visit);
                const remaining = Math.max(0, visit.amount - visit.totalPaid);

                return (
                  <div
                    key={visit.id}
                    className={`visit-tracking-card ${selectedVisit?.id === visit.id ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                    onClick={() => {
                      if (!disabled) {
                        setSelectedVisit(visit);
                        logAction('SELECT_VISIT', `Selected visit ${visit.id}`);
                      }
                    }}
                  >
                    <div className="visit-tracking-card-header">
                      <span className="visit-tracking-card-id">#{visit.id}</span>
                      <span className="visit-tracking-card-patient">{visit.patientName}</span>
                      <span className={`visit-tracking-card-status 
                        ${visit.visitStatus === 'IN_PROGRESS' ? 'inprogress' : 
                          visit.visitStatus === 'NEW' || visit.visitStatus === 'CREATED' ? 'new' : 
                          'closed'}`}>
                        {visit.visitStatus}
                      </span>
                    </div>
                    <div className="visit-tracking-card-body">
                      <div className="detail">👨‍⚕️ {visit.doctorName}</div>
                      <div className="detail">📋 {visit.visitType} | 💳 {visit.paymentMethod}</div>
                      <div className="detail">
                        💰 {visit.amount.toFixed(2)} | Remaining: <span className={remaining === 0 ? 'remaining-zero' : 'remaining-positive'}>{remaining.toFixed(2)}</span>
                      </div>
                      {visit.paymentMethod === 'INSURANCE' && (
                        <div className="visit-tracking-card-checkbox">
                          <label>
                            <input
                              type="checkbox"
                              checked={visit.insurancePaid || false}
                              disabled={visit.insurancePaid}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleMarkInsurancePaid(visit.id);
                              }}
                            /> Insurance Paid
                          </label>
                        </div>
                      )}
                    </div>
                    <button
                      className="btn-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        showPaymentDetails(visit.id);
                      }}
                    >
                      📋 {t.btn.view}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Buttons - Wrapped in container for better mobile handling */}
        <div className="visit-tracking-actions-wrapper">
          {selectedVisit && (
            <div className="visit-tracking-actions">
              <button
                className="visit-tracking-btn visit-tracking-btn-success"
                onClick={handleStartVisit}
                disabled={!canStartVisit(selectedVisit)}
              >
                ▶ {t.btn.start}
              </button>
              <button
                className="visit-tracking-btn visit-tracking-btn-danger"
                onClick={handleEndVisit}
                disabled={!canEndVisit(selectedVisit)}
              >
                ⏹ {t.btn.end}
              </button>
              <button
                className="visit-tracking-btn visit-tracking-btn-success"
                onClick={handlePayment}
                disabled={!canPay(selectedVisit)}
              >
                💰 {t.btn.pay}
              </button>
            </div>
          )}
        </div>

        {/* Payment Modal */}
        {showPayment && selectedVisit && (
          <VisitPayScreen
            visit={selectedVisit}
            remaining={Math.max(0, selectedVisit.amount - selectedVisit.totalPaid)}
            loggedUser={loggedUser}
            onClose={handlePaymentModalClose}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </div>
    </>
  );
};

export default VisitTrackingScreen;