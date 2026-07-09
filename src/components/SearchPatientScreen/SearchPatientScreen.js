// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { BASE_URL } from '../../utils/api';
// // import { searchPatientTranslations } from '../../i18n/searchPatientTranslations';
// // import AddPatientModal from '../AddPatientModal/AddPatientModal';
// // import UpdatePatientModal from './UpdatePatientModal';
// // import UpgradePatientModal from './UpgradePatientModal';
// // import AppointmentModal from './AppointmentModal';
// // import WalkInScreen from './WalkInScreen';
// // import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';

// // const API_PATIENT = `${BASE_URL}/api/patients`;
// // const API_DOCTORS = `${BASE_URL}/api/doctors`;
// // const API_LOG = `${BASE_URL}/api/logs/add`;
// // const API_AVAILABILITY = `${BASE_URL}/api/availability`;
// // const API_ROOMS = `${BASE_URL}/api/rooms`;

// // const ROWS_PER_PAGE = 10;

// // const SearchPatientScreen = ({ loggedUser, lang = 'en', onClose }) => {
// //   const t = searchPatientTranslations[lang] || searchPatientTranslations.en;
// //   const isRTL = lang === 'ar';

// //   // ---------- State ----------
// //   const [searchBy, setSearchBy] = useState('name');
// //   const [searchText, setSearchText] = useState('');
// //   const [allPatients, setAllPatients] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(0);
// //   const [totalPages, setTotalPages] = useState(0);
// //   const [viewMode, setViewMode] = useState('table');
// //   const [selectedPatient, setSelectedPatient] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
// //   const [stats, setStats] = useState({ total: 0, temp: 0, permanent: 0 });
// //   const [lastSearch, setLastSearch] = useState(null);
// //   const autoRefreshRef = useRef(null);
// //   const [showAvailability, setShowAvailability] = useState(false);
// //   const [availabilityData, setAvailabilityData] = useState(null);
// //   const [showVisits, setShowVisits] = useState(false);
// //   const [visitData, setVisitData] = useState(null);
// //   const [doctors, setDoctors] = useState([]);
// //   const [rooms, setRooms] = useState([]);
// //   const [patientTypeFilter, setPatientTypeFilter] = useState('ALL');
// //   const [showAddPatient, setShowAddPatient] = useState(false);
// //   const [showUpdatePatient, setShowUpdatePatient] = useState(false);
// //   const [showUpgradePatient, setShowUpgradePatient] = useState(false);
// //   const [showAppointments, setShowAppointments] = useState(false);
// //   const [showWalkIn, setShowWalkIn] = useState(false);
// //   const [showAppointmentsAdmin, setShowAppointmentsAdmin] = useState(false); // ✅ new state

// //   // New state for compact details panel
// //   const [showDetails, setShowDetails] = useState(false);

// //   // ---------- Helper functions ----------
// //   const updateStats = (patients) => {
// //     const total = patients.length;
// //     const temp = patients.filter(p => p.tempPatient).length;
// //     setStats({ total, temp, permanent: total - temp });
// //   };

// //   // ---------- Log action ----------
// //   const logAction = useCallback(async (action, details) => {
// //     try {
// //       await fetch(API_LOG, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ username: loggedUser, action, details }),
// //       });
// //     } catch (e) { /* ignore */ }
// //   }, [loggedUser]);

// //   // ---------- Fetch patients ----------
// //   const fetchPatients = useCallback(async (searchType, searchValue) => {
// //     if (!searchValue || searchValue.trim().length < 3) {
// //       setStatusMsg(`⚠️ ${t.alert.minChars}`);
// //       return;
// //     }
// //     setLoading(true);
// //     setStatusMsg(t.status.loading);
// //     try {
// //       const endpoint = searchType === 'mobile'
// //         ? `${API_PATIENT}/search/mobile/${encodeURIComponent(searchValue)}`
// //         : `${API_PATIENT}/search/name/${encodeURIComponent(searchValue)}`;
// //       const res = await fetch(endpoint);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //       const data = await res.json();

// //       const normalized = data.map(p => ({
// //         ...p,
// //         tempPatient: p.patientType === 'TEMP',
// //       }));

// //       setAllPatients(normalized);
// //       updateStats(normalized);
// //       setCurrentPage(0);
// //       setStatusMsg(`✅ ${t.status.found} ${normalized.length} ${t.label.patients}`);
// //       setLastSearch({ type: searchType, value: searchValue });
// //       logAction('SEARCH_PATIENT', `Searched by ${searchType} = ${searchValue}`);
// //     } catch (err) {
// //       setStatusMsg(`❌ ${t.alert.errorFetch}: ${err.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t, logAction]);

// //   // Auto‑refresh
// //   useEffect(() => {
// //     if (lastSearch) {
// //       autoRefreshRef.current = setInterval(() => {
// //         fetchPatients(lastSearch.type, lastSearch.value);
// //       }, 30000);
// //     }
// //     return () => {
// //       if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
// //     };
// //   }, [lastSearch, fetchPatients]);

// //   // ---------- Handlers ----------
// //   const handleSearch = () => fetchPatients(searchBy, searchText.trim());

// //   const exportCSV = () => {
// //     if (allPatients.length === 0) {
// //       setStatusMsg(`⚠️ ${t.alert.noDataToExport}`);
// //       return;
// //     }
// //     const headers = ['ID', 'First Name', 'Middle Name', 'Last Name', 'Phone', 'Type', 'Gender', 'DOB', 'Age'];
// //     const csvContent = [
// //       headers.join(','),
// //       ...allPatients.map(p => {
// //         const age = p.dateOfBirth
// //           ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
// //           : '';
// //         return `${p.id},${p.firstName},${p.middleName || ''},${p.lastName},${p.phone},${p.tempPatient ? 'TEMP' : 'PERMANENT'},${p.gender || ''},${p.dateOfBirth || ''},${age}`;
// //       })
// //     ].join('\n');
// //     const blob = new Blob([csvContent], { type: 'text/csv' });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = `patients_${new Date().toISOString().slice(0, 10)}.csv`;
// //     a.click();
// //     URL.revokeObjectURL(url);
// //     setStatusMsg(`📥 ${t.status.exported}`);
// //   };

// //   const openAvailability = (patientId) => {
// //     setShowAvailability(patientId);
// //     fetch(API_DOCTORS).then(res => res.json()).then(setDoctors);
// //     fetch(API_ROOMS).then(res => res.json()).then(setRooms);
// //   };

// //   const checkAvailability = async (doctorId, roomId, date) => {
// //     try {
// //       let url = `${API_AVAILABILITY}?date=${date}`;
// //       if (doctorId) url += `&doctorId=${doctorId}`;
// //       if (roomId) url += `&roomId=${roomId}`;
// //       const res = await fetch(url);
// //       const slots = await res.json();
// //       setAvailabilityData(slots);
// //     } catch (err) {
// //       alert(t.alert.errorFetch);
// //     }
// //   };

// //   const showPatientVisits = async (patientId) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/visits/patient/${patientId}`);
// //       if (!res.ok) throw new Error('Failed');
// //       const visits = await res.json();
// //       setVisitData(visits);
// //       setShowVisits(true);
// //     } catch (err) {
// //       alert(t.alert.errorFetch);
// //     }
// //   };

// //   // ---------- Callback when a new patient is added ----------
// //   const handlePatientAdded = useCallback((newPatient) => {
// //     if (lastSearch) {
// //       fetchPatients(lastSearch.type, lastSearch.value);
// //     } else {
// //       const updated = [{ ...newPatient, tempPatient: newPatient.patientType === 'TEMP' }, ...allPatients];
// //       setAllPatients(updated);
// //       updateStats(updated);
// //     }
// //     setStatusMsg(`✅ ${t.status.patientAdded}: ${newPatient.firstName} ${newPatient.lastName}`);
// //   }, [lastSearch, fetchPatients, allPatients, t]);

// //   // ---------- Filter and pagination ----------
// //   const filteredByType = allPatients.filter(p => {
// //     if (patientTypeFilter === 'ALL') return true;
// //     return patientTypeFilter === 'TEMP' ? p.tempPatient : !p.tempPatient;
// //   });

// //   const paginatedPatients = filteredByType.slice(
// //     currentPage * ROWS_PER_PAGE,
// //     (currentPage + 1) * ROWS_PER_PAGE
// //   );

// //   useEffect(() => {
// //     setTotalPages(Math.ceil(filteredByType.length / ROWS_PER_PAGE));
// //     if (currentPage >= Math.ceil(filteredByType.length / ROWS_PER_PAGE) && filteredByType.length > 0) {
// //       setCurrentPage(0);
// //     }
// //   }, [filteredByType, currentPage]);

// //   // ---------- Render ----------
// //   return (
// //     <div
// //       style={{
// //         padding: 20,
// //         fontFamily: "'Noto Sans Arabic', Tahoma, 'Segoe UI', sans-serif",
// //         direction: isRTL ? 'rtl' : 'ltr',
// //       }}
// //     >
// //       {/* Header */}
// //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
// //         <h2>🔍 {t.title.searchPatients}</h2>
// //         <div style={{ display: 'flex', gap: 10 }}>
// //           {/* ✅ New button for Admin Appointments */}
// //           <button onClick={() => setShowAppointmentsAdmin(true)} style={primaryBtn('#4299e1')}>
// //             📅 {t.btn?.manageAppointments || 'Manage All Appointments'}
// //           </button>
// //           <button onClick={() => setShowAddPatient(true)} style={primaryBtn('#48bb78')}>
// //             ➕ {t.btn.addNewPatient}
// //           </button>
// //           <button onClick={onClose} style={{ ...secondaryBtn, marginLeft: 10 }}>
// //             ✕ {t.btn.close}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stats Cards */}
// //       <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
// //         <StatCard icon="👥" label={t.stat.totalPatients} value={stats.total} color="#4299e1" />
// //         <StatCard icon="🔄" label={t.stat.tempPatients} value={stats.temp} color="#ed8936" />
// //         <StatCard icon="✅" label={t.stat.permanentPatients} value={stats.permanent} color="#48bb78" />
// //       </div>

// //       {/* Search controls */}
// //       <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
// //         <select value={searchBy} onChange={e => setSearchBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
// //           <option value="name">{t.search.name}</option>
// //           <option value="mobile">{t.search.mobile}</option>
// //         </select>
// //         <input
// //           type="text"
// //           placeholder={searchBy === 'mobile' ? t.prompt.mobile : t.prompt.name}
// //           value={searchText}
// //           onChange={e => setSearchText(e.target.value)}
// //           onKeyPress={e => e.key === 'Enter' && handleSearch()}
// //           style={{ flex: 1, padding: '8px 15px', borderRadius: 25, border: '1px solid #ccc' }}
// //         />
// //         <button onClick={handleSearch} style={primaryBtn('#4299e1')} disabled={loading}>
// //           🔍 {t.btn.search}
// //         </button>
// //         <button onClick={() => lastSearch && fetchPatients(lastSearch.type, lastSearch.value)} style={iconBtn}>
// //           🔄
// //         </button>
// //         <button onClick={exportCSV} style={iconBtn}>
// //           📥
// //         </button>
// //         <select value={patientTypeFilter} onChange={e => setPatientTypeFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
// //           <option value="ALL">{t.patient.temp} + {t.patient.permanent}</option>
// //           <option value="TEMP">{t.patient.temp}</option>
// //           <option value="PERMANENT">{t.patient.permanent}</option>
// //         </select>
// //         <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
// //           📋 {t.btn.table}
// //         </button>
// //         <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
// //           🃏 {t.btn.cards}
// //         </button>
// //       </div>

// //       <div style={{ marginBottom: 10, color: '#4a5568' }}>{statusMsg}</div>

// //       {/* ---- Compact Patient Details Panel (Collapsible) ---- */}
// //       {selectedPatient && (
// //         <div
// //           style={{
// //             marginBottom: 15,
// //             padding: showDetails ? '12px 15px' : '8px 15px',
// //             background: '#f7fafc',
// //             borderRadius: 8,
// //             border: '1px solid #e2e8f0',
// //             transition: 'all 0.3s ease',
// //           }}
// //         >
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
// //               <span style={{ fontWeight: 'bold' }}>
// //                 #{selectedPatient.id} – {selectedPatient.firstName} {selectedPatient.lastName}
// //               </span>
// //               <span
// //                 style={{
// //                   fontSize: 12,
// //                   background: selectedPatient.tempPatient ? '#ed8936' : '#48bb78',
// //                   color: 'white',
// //                   borderRadius: 12,
// //                   padding: '2px 10px',
// //                 }}
// //               >
// //                 {selectedPatient.tempPatient ? t.patient.temp : t.patient.permanent}
// //               </span>
// //             </div>
// //             <button
// //               onClick={() => setShowDetails(!showDetails)}
// //               style={{
// //                 background: 'transparent',
// //                 border: 'none',
// //                 cursor: 'pointer',
// //                 fontSize: 14,
// //                 color: '#4299e1',
// //                 fontWeight: 'bold',
// //               }}
// //             >
// //               {showDetails ? '▲ ' + (t.btn?.collapse || 'Collapse') : '▼ ' + (t.btn?.expand || 'Expand')}
// //             </button>
// //           </div>

// //           {showDetails && (
// //             <div
// //               style={{
// //                 marginTop: 10,
// //                 display: 'grid',
// //                 gridTemplateColumns: '1fr 1fr',
// //                 gap: '6px 20px',
// //                 fontSize: '13px',
// //               }}
// //             >
// //               <div><strong>{t.col.id}:</strong> {selectedPatient.id}</div>
// //               <div><strong>{t.col.firstName}:</strong> {selectedPatient.firstName}</div>
// //               <div><strong>{t.col.middleName}:</strong> {selectedPatient.middleName || ''}</div>
// //               <div><strong>{t.col.lastName}:</strong> {selectedPatient.lastName}</div>
// //               <div><strong>{t.col.phone}:</strong> {selectedPatient.phone}</div>
// //               <div><strong>{t.col.address}:</strong> {selectedPatient.address || ''}</div>
// //               <div><strong>{t.col.gender}:</strong> {selectedPatient.gender || ''}</div>
// //               <div><strong>{t.col.dob}:</strong> {selectedPatient.dateOfBirth || ''}</div>
// //               <div>
// //                 <strong>{t.col.age}:</strong>{' '}
// //                 {selectedPatient.dateOfBirth
// //                   ? Math.floor((new Date() - new Date(selectedPatient.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
// //                   : ''}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       {/* Table / Card container */}
// //       <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 400 }}>
// //         {loading ? (
// //           <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
// //         ) : filteredByType.length === 0 ? (
// //           <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.status.noPatients}</div>
// //         ) : viewMode === 'table' ? (
// //           <TableView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
// //         ) : (
// //           <CardView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
// //         )}
// //       </div>

// //       {totalPages > 1 && (
// //         <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 15 }}>
// //           <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)}>{'<'}</button>
// //           <span>{`${t.label.showing} ${currentPage + 1} / ${totalPages}`}</span>
// //           <button disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)}>{'>'}</button>
// //         </div>
// //       )}

// //       {/* Action buttons remain below the table */}
// //       {selectedPatient && (
// //         <div style={{ display: 'flex', gap: 10, marginTop: 15, flexWrap: 'wrap' }}>
// //           <button onClick={() => setShowWalkIn(true)} style={primaryBtn('#4299e1')}>🚶 {t.btn.walkIn}</button>
// //           <button onClick={() => setShowAppointments(true)} style={primaryBtn('#4299e1')}> 📅 {t.btn.appointments}</button>
// //           <button onClick={() => setShowUpdatePatient(true)} style={primaryBtn('#4299e1')}>
// //             ✏️ {t.btn.updatePatient}
// //           </button>
// //           {selectedPatient.tempPatient && (
// //             <button onClick={() => setShowUpgradePatient(true)} style={primaryBtn('#ed8936')}>
// //               ⬆️ {t.btn.upgradePermanent}
// //             </button>
// //           )}
// //           <button onClick={() => alert('Print report')} style={primaryBtn('#48bb78')}>🖨️ {t.btn.printReport}</button>
// //           <button onClick={() => openAvailability(selectedPatient.id)} style={primaryBtn('#9f7aea')}>🔔 {t.btn.availability}</button>
// //         </div>
// //       )}

// //       {/* ---------- MODALS ---------- */}

// //       {/* Admin Appointments Modal */}
// //       {showAppointmentsAdmin && (
// //         <AppointmentsAdminScreen
// //           refreshCallback={() => {
// //             // Optional: refresh parent if needed
// //           }}
// //           loggedUser={loggedUser}
// //           lang={lang}
// //           onClose={() => setShowAppointmentsAdmin(false)}
// //         />
// //       )}

// //       {showWalkIn && selectedPatient && (
// //         <WalkInScreen
// //           patientId={selectedPatient.id}
// //           loggedUser={loggedUser}
// //           lang={lang}
// //           onClose={() => setShowWalkIn(false)}
// //         />
// //       )}
// //       {showUpdatePatient && selectedPatient && (
// //         <UpdatePatientModal
// //           patientId={selectedPatient.id}
// //           loggedUser={loggedUser}
// //           lang={lang}
// //           onClose={() => setShowUpdatePatient(false)}
// //           onPatientUpdated={() => {
// //             if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
// //           }}
// //         />
// //       )}
// //       {showUpgradePatient && selectedPatient && (
// //         <UpgradePatientModal
// //           patientId={selectedPatient.id}
// //           loggedUser={loggedUser}
// //           lang={lang}
// //           onClose={() => setShowUpgradePatient(false)}
// //           onPatientUpgraded={() => {
// //             if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
// //           }}
// //         />
// //       )}
// //       {showAppointments && selectedPatient && (
// //         <AppointmentModal
// //           patientId={selectedPatient.id}
// //           loggedUser={loggedUser}
// //           lang={lang}
// //           onClose={() => setShowAppointments(false)}
// //         />
// //       )}
// //       {showAvailability && (
// //         <AvailabilityModal
// //           patientId={showAvailability}
// //           doctors={doctors}
// //           rooms={rooms}
// //           translations={t}
// //           onClose={() => setShowAvailability(false)}
// //           onCheck={checkAvailability}
// //           data={availabilityData}
// //           lang={lang}
// //         />
// //       )}
// //       {showVisits && (
// //         <VisitsModal visits={visitData} translations={t} onClose={() => setShowVisits(false)} isRTL={isRTL} />
// //       )}
// //       {showAddPatient && (
// //         <AddPatientModal
// //           translations={t}
// //           lang={lang}
// //           onClose={() => setShowAddPatient(false)}
// //           onPatientAdded={handlePatientAdded}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // // ---------- Sub-components (unchanged) ----------
// // // ... (StatCard, TableView, CardView, AvailabilityModal, VisitsModal, style utilities)
// // // ---------- Sub-components (unchanged) ----------
// // const StatCard = ({ icon, label, value, color }) => (
// //   <div style={{
// //     background: 'white', borderRadius: 12, padding: '15px 20px',
// //     boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
// //     flex: 1, minWidth: 150, transition: 'transform 0.2s',
// //   }}>
// //     <span style={{ fontSize: 24 }}>{icon}</span>
// //     <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
// //     <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
// //   </div>
// // );

// // const TableView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => {
// //   const columns = isRTL
// //     ? ['visits', 'age', 'dob', 'gender', 'address', 'phone', 'patientType', 'lastName', 'middleName', 'firstName', 'id']
// //     : ['id', 'firstName', 'middleName', 'lastName', 'patientType', 'phone', 'address', 'gender', 'dob', 'age', 'visits'];

// //   return (
// //     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
// //       <thead>
// //         <tr>
// //           {columns.map(col => (
// //             <th key={col} style={{ padding: 10, background: '#f8f9fa', textAlign: 'left' }}>
// //               {t.col[col] || col}
// //             </th>
// //           ))}
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {patients.map(p => (
// //           <tr key={p.id} onClick={() => onSelect(p)} style={{
// //             background: selected?.id === p.id ? '#ebf8ff' : 'white',
// //             cursor: 'pointer', borderBottom: '1px solid #eee',
// //           }}>
// //             {columns.map(col => {
// //               switch (col) {
// //                 case 'id': return <td key={col}>{p.id}</td>;
// //                 case 'firstName': return <td key={col}>{p.firstName}</td>;
// //                 case 'middleName': return <td key={col}>{p.middleName || ''}</td>;
// //                 case 'lastName': return <td key={col}>{p.lastName}</td>;
// //                 case 'patientType':
// //                   return (
// //                     <td key={col} style={{ color: p.tempPatient ? '#ed8936' : '#48bb78', fontWeight: 'bold' }}>
// //                       {p.tempPatient ? t.patient.temp : t.patient.permanent}
// //                     </td>
// //                   );
// //                 case 'phone': return <td key={col}>{p.phone}</td>;
// //                 case 'address': return <td key={col}>{p.address || ''}</td>;
// //                 case 'gender': return <td key={col}>{p.gender || ''}</td>;
// //                 case 'dob': return <td key={col}>{p.dateOfBirth || ''}</td>;
// //                 case 'age': {
// //                   const age = p.dateOfBirth
// //                     ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
// //                     : '';
// //                   return <td key={col}>{age}</td>;
// //                 }
// //                 case 'visits':
// //                   return (
// //                     <td key={col}>
// //                       <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={miniBtn}>
// //                         📋 {t.btn.viewVisits}
// //                       </button>
// //                     </td>
// //                   );
// //                 default: return <td key={col}></td>;
// //               }
// //             })}
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   );
// // };

// // const CardView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => (
// //   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
// //     {patients.map(p => (
// //       <div key={p.id} onClick={() => onSelect(p)} style={{
// //         background: selected?.id === p.id ? '#ebf8ff' : 'white',
// //         borderRadius: 12, padding: 15,
// //         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
// //         border: selected?.id === p.id ? '2px solid #4299e1' : '1px solid #edf2f7',
// //         cursor: 'pointer', direction: isRTL ? 'rtl' : 'ltr',
// //       }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
// //           <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>#{p.id}</span>
// //           <span style={{ fontWeight: 'bold' }}>{p.firstName} {p.lastName}</span>
// //           <span style={{
// //             background: p.tempPatient ? '#ed8936' : '#48bb78',
// //             color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 11
// //           }}>
// //             {p.tempPatient ? t.patient.temp : t.patient.permanent}
// //           </span>
// //         </div>
// //         <div style={{ fontSize: 13, color: '#4a5568' }}>
// //           📱 {p.phone} &nbsp; ⚤ {p.gender || 'N/A'} &nbsp;
// //           🎂 {p.dateOfBirth && `${p.dateOfBirth} (${Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} ${t.label.years})`}
// //         </div>
// //         <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={{ marginTop: 8, ...miniBtn }}>
// //           📋 {t.btn.viewVisits}
// //         </button>
// //       </div>
// //     ))}
// //   </div>
// // );

// // const AvailabilityModal = ({ patientId, doctors, rooms, translations: t, onClose, onCheck, data, lang }) => {
// //   const [doctor, setDoctor] = useState('');
// //   const [room, setRoom] = useState('');
// //   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
// //   const [loading, setLoading] = useState(false);

// //   const handleCheck = async () => {
// //     if (!doctor && !room) return alert(t.alert.selectDoctorOrRoom);
// //     setLoading(true);
// //     await onCheck(doctor, room, date);
// //     setLoading(false);
// //   };

// //   return (
// //     <div style={modalOverlay}>
// //       <div style={modalContent}>
// //         <h3>🔔 {t.title.availability} - Patient #{patientId}</h3>
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '15px 0' }}>
// //           <select value={doctor} onChange={e => setDoctor(e.target.value)} style={inputStyle}>
// //             <option value="">{t.label.selectDoctor}</option>
// //             {doctors.map(d => <option key={d.id} value={d.id}>{d.firstName} {d.lastName}</option>)}
// //           </select>
// //           <select value={room} onChange={e => setRoom(e.target.value)} style={inputStyle}>
// //             <option value="">{t.label.selectRoom}</option>
// //             {rooms.map(r => <option key={r.id} value={r.id}>{r.roomNumber}</option>)}
// //           </select>
// //           <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
// //           <button onClick={handleCheck} style={primaryBtn('#48bb78')} disabled={loading}>
// //             {loading ? '⏳' : t.btn.checkAvailability}
// //           </button>
// //         </div>
// //         {data && (
// //           <div>
// //             <h4>{t.label.availableSlots}</h4>
// //             <ul style={{ listStyle: 'none', padding: 0 }}>
// //               {data.map((slot, idx) => (
// //                 <li key={idx} style={{
// //                   padding: '8px 12px', borderRadius: 8, marginBottom: 5,
// //                   background: slot.available ? '#d4edda' : '#f8d7da',
// //                 }}>
// //                   {slot.start} - {slot.end} : {slot.available ? t.label.available : t.label.notAvailable}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         )}
// //         <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
// //       </div>
// //     </div>
// //   );
// // };

// // const VisitsModal = ({ visits, translations: t, onClose, isRTL }) => (
// //   <div style={modalOverlay}>
// //     <div style={modalContent}>
// //       <h3>📋 {t.title.patientVisits}</h3>
// //       {visits && visits.length > 0 ? (
// //         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
// //           <thead>
// //             <tr>
// //               <th>{t.col.visitId}</th>
// //               <th>{t.col.doctor}</th>
// //               <th>{t.col.visitType}</th>
// //               <th>{t.col.status}</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {visits.map(v => (
// //               <tr key={v.id}>
// //                 <td>{v.id}</td>
// //                 <td>{v.doctor?.fullName || v.doctorName || 'Unknown'}</td>
// //                 <td>{v.visitType || 'Walk‑in'}</td>
// //                 <td>{v.visitStatus || v.status}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       ) : (
// //         <p>{t.status.noData}</p>
// //       )}
// //       <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
// //     </div>
// //   </div>
// // );

// // // ---------- Style utilities ----------
// // const primaryBtn = (bg) => ({
// //   background: bg, color: 'white', fontWeight: 'bold', border: 'none',
// //   borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
// // });

// // const secondaryBtn = {
// //   background: '#e2e8f0', border: 'none', padding: '8px 16px',
// //   borderRadius: 8, cursor: 'pointer',
// // };

// // const iconBtn = {
// //   background: 'transparent', border: '1px solid #ccc', borderRadius: 8,
// //   padding: '8px 12px', cursor: 'pointer', fontSize: 16,
// // };

// // const toggleBtn = {
// //   background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 8,
// //   padding: '8px 12px', cursor: 'pointer',
// // };

// // const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };

// // const miniBtn = {
// //   background: '#4299e1', color: 'white', border: 'none', borderRadius: 6,
// //   padding: '4px 10px', cursor: 'pointer', fontSize: 12,
// // };

// // const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' };

// // const modalOverlay = {
// //   position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
// //   background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
// //   alignItems: 'center', zIndex: 1000,
// // };

// // const modalContent = {
// //   background: 'white', borderRadius: 12, padding: 20, minWidth: 400,
// //   maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// // };

// // export default SearchPatientScreen;


// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';
// import { searchPatientTranslations } from '../../i18n/searchPatientTranslations';
// import AddPatientModal from '../AddPatientModal/AddPatientModal';
// import UpdatePatientModal from './UpdatePatientModal';
// import UpgradePatientModal from './UpgradePatientModal';
// import AppointmentModal from './AppointmentModal';
// import WalkInScreen from './WalkInScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';

// const API_PATIENT = `${BASE_URL}/api/patients`;
// const API_DOCTORS = `${BASE_URL}/api/doctors`;
// const API_LOG = `${BASE_URL}/api/logs/add`;
// const API_AVAILABILITY = `${BASE_URL}/api/availability`;
// const API_ROOMS = `${BASE_URL}/api/rooms`;

// const ROWS_PER_PAGE = 10;

// const SearchPatientScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   const t = searchPatientTranslations[lang] || searchPatientTranslations.en;
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [searchBy, setSearchBy] = useState('name');
//   const [searchText, setSearchText] = useState('');
//   const [allPatients, setAllPatients] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [viewMode, setViewMode] = useState('table');
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [stats, setStats] = useState({ total: 0, temp: 0, permanent: 0 });
//   const [lastSearch, setLastSearch] = useState(null);
//   const autoRefreshRef = useRef(null);
//   const [showAvailability, setShowAvailability] = useState(false);
//   const [availabilityData, setAvailabilityData] = useState(null);
//   const [showVisits, setShowVisits] = useState(false);
//   const [visitData, setVisitData] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [patientTypeFilter, setPatientTypeFilter] = useState('ALL');
//   const [showAddPatient, setShowAddPatient] = useState(false);
//   const [showUpdatePatient, setShowUpdatePatient] = useState(false);
//   const [showUpgradePatient, setShowUpgradePatient] = useState(false);
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [showWalkIn, setShowWalkIn] = useState(false);
//   const [showAppointmentsAdmin, setShowAppointmentsAdmin] = useState(false);

//   // New state for compact details panel
//   const [showDetails, setShowDetails] = useState(false);

//   // ---------- Helper functions ----------
//   const updateStats = (patients) => {
//     const total = patients.length;
//     const temp = patients.filter(p => p.tempPatient).length;
//     setStats({ total, temp, permanent: total - temp });
//   };

//   // ---------- Log action ----------
//   const logAction = useCallback(async (action, details) => {
//     try {
//       await fetch(API_LOG, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: loggedUser, action, details }),
//       });
//     } catch (e) { /* ignore */ }
//   }, [loggedUser]);

//   // ---------- Fetch patients ----------
//   const fetchPatients = useCallback(async (searchType, searchValue) => {
//     if (!searchValue || searchValue.trim().length < 3) {
//       setStatusMsg(`⚠️ ${t.alert.minChars}`);
//       return;
//     }
//     setLoading(true);
//     setStatusMsg(t.status.loading);
//     try {
//       const endpoint = searchType === 'mobile'
//         ? `${API_PATIENT}/search/mobile/${encodeURIComponent(searchValue)}`
//         : `${API_PATIENT}/search/name/${encodeURIComponent(searchValue)}`;
//       const res = await fetch(endpoint);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();

//       const normalized = data.map(p => ({
//         ...p,
//         tempPatient: p.patientType === 'TEMP',
//       }));

//       setAllPatients(normalized);
//       updateStats(normalized);
//       setCurrentPage(0);
//       setStatusMsg(`✅ ${t.status.found} ${normalized.length} ${t.label.patients}`);
//       setLastSearch({ type: searchType, value: searchValue });
//       logAction('SEARCH_PATIENT', `Searched by ${searchType} = ${searchValue}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.alert.errorFetch}: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, logAction]);

//   // Auto‑refresh
//   useEffect(() => {
//     if (lastSearch) {
//       autoRefreshRef.current = setInterval(() => {
//         fetchPatients(lastSearch.type, lastSearch.value);
//       }, 30000);
//     }
//     return () => {
//       if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
//     };
//   }, [lastSearch, fetchPatients]);

//   // ---------- Handlers ----------
//   const handleSearch = () => fetchPatients(searchBy, searchText.trim());

//   const exportCSV = () => {
//     if (allPatients.length === 0) {
//       setStatusMsg(`⚠️ ${t.alert.noDataToExport}`);
//       return;
//     }
//     const headers = ['ID', 'First Name', 'Middle Name', 'Last Name', 'Phone', 'Type', 'Gender', 'DOB', 'Age'];
//     const csvContent = [
//       headers.join(','),
//       ...allPatients.map(p => {
//         const age = p.dateOfBirth
//           ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
//           : '';
//         return `${p.id},${p.firstName},${p.middleName || ''},${p.lastName},${p.phone},${p.tempPatient ? 'TEMP' : 'PERMANENT'},${p.gender || ''},${p.dateOfBirth || ''},${age}`;
//       })
//     ].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `patients_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//     setStatusMsg(`📥 ${t.status.exported}`);
//   };

//   const openAvailability = (patientId) => {
//     setShowAvailability(patientId);
//     fetch(API_DOCTORS).then(res => res.json()).then(setDoctors);
//     fetch(API_ROOMS).then(res => res.json()).then(setRooms);
//   };

//   const checkAvailability = async (doctorId, roomId, date) => {
//     try {
//       let url = `${API_AVAILABILITY}?date=${date}`;
//       if (doctorId) url += `&doctorId=${doctorId}`;
//       if (roomId) url += `&roomId=${roomId}`;
//       const res = await fetch(url);
//       const slots = await res.json();
//       setAvailabilityData(slots);
//     } catch (err) {
//       alert(t.alert.errorFetch);
//     }
//   };

//   const showPatientVisits = async (patientId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/patient/${patientId}`);
//       if (!res.ok) throw new Error('Failed');
//       const visits = await res.json();
//       setVisitData(visits);
//       setShowVisits(true);
//     } catch (err) {
//       alert(t.alert.errorFetch);
//     }
//   };

//   // ---------- Callback when a new patient is added ----------
//   const handlePatientAdded = useCallback((newPatient) => {
//     if (lastSearch) {
//       fetchPatients(lastSearch.type, lastSearch.value);
//     } else {
//       const updated = [{ ...newPatient, tempPatient: newPatient.patientType === 'TEMP' }, ...allPatients];
//       setAllPatients(updated);
//       updateStats(updated);
//     }
//     setStatusMsg(`✅ ${t.status.patientAdded}: ${newPatient.firstName} ${newPatient.lastName}`);
//   }, [lastSearch, fetchPatients, allPatients, t]);

//   // ---------- Filter and pagination ----------
//   const filteredByType = allPatients.filter(p => {
//     if (patientTypeFilter === 'ALL') return true;
//     return patientTypeFilter === 'TEMP' ? p.tempPatient : !p.tempPatient;
//   });

//   const paginatedPatients = filteredByType.slice(
//     currentPage * ROWS_PER_PAGE,
//     (currentPage + 1) * ROWS_PER_PAGE
//   );

//   useEffect(() => {
//     setTotalPages(Math.ceil(filteredByType.length / ROWS_PER_PAGE));
//     if (currentPage >= Math.ceil(filteredByType.length / ROWS_PER_PAGE) && filteredByType.length > 0) {
//       setCurrentPage(0);
//     }
//   }, [filteredByType, currentPage]);

//   // ---------- Render ----------
//   return (
//     <div
//       style={{
//         padding: 20,
//         fontFamily: "'Noto Sans Arabic', Tahoma, 'Segoe UI', sans-serif",
//         direction: isRTL ? 'rtl' : 'ltr',
//       }}
//     >
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//         <h2>🔍 {t.title.searchPatients}</h2>
//         <div style={{ display: 'flex', gap: 10 }}>
//           <button onClick={() => setShowAppointmentsAdmin(true)} style={primaryBtn('#4299e1')}>
//             📅 {t.btn?.manageAppointments || 'Manage All Appointments'}
//           </button>
//           <button onClick={() => setShowAddPatient(true)} style={primaryBtn('#48bb78')}>
//             ➕ {t.btn.addNewPatient}
//           </button>
//           <button onClick={onClose} style={{ ...secondaryBtn, marginLeft: 10 }}>
//             ✕ {t.btn.close}
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
//         <StatCard icon="👥" label={t.stat.totalPatients} value={stats.total} color="#4299e1" />
//         <StatCard icon="🔄" label={t.stat.tempPatients} value={stats.temp} color="#ed8936" />
//         <StatCard icon="✅" label={t.stat.permanentPatients} value={stats.permanent} color="#48bb78" />
//       </div>

//       {/* Search controls */}
//       <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
//         <select value={searchBy} onChange={e => setSearchBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
//           <option value="name">{t.search.name}</option>
//           <option value="mobile">{t.search.mobile}</option>
//         </select>
//         <input
//           type="text"
//           placeholder={searchBy === 'mobile' ? t.prompt.mobile : t.prompt.name}
//           value={searchText}
//           onChange={e => setSearchText(e.target.value)}
//           onKeyPress={e => e.key === 'Enter' && handleSearch()}
//           style={{ flex: 1, padding: '8px 15px', borderRadius: 25, border: '1px solid #ccc' }}
//         />
//         <button onClick={handleSearch} style={primaryBtn('#4299e1')} disabled={loading}>
//           🔍 {t.btn.search}
//         </button>
//         <button onClick={() => lastSearch && fetchPatients(lastSearch.type, lastSearch.value)} style={iconBtn}>
//           🔄
//         </button>
//         <button onClick={exportCSV} style={iconBtn}>
//           📥
//         </button>
//         <select value={patientTypeFilter} onChange={e => setPatientTypeFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
//           <option value="ALL">{t.patient.temp} + {t.patient.permanent}</option>
//           <option value="TEMP">{t.patient.temp}</option>
//           <option value="PERMANENT">{t.patient.permanent}</option>
//         </select>
//         <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
//           📋 {t.btn.table}
//         </button>
//         <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
//           🃏 {t.btn.cards}
//         </button>
//       </div>

//       <div style={{ marginBottom: 10, color: '#4a5568' }}>{statusMsg}</div>

//       {/* ---- Patient Selection Bar (above table) ---- */}
//       {selectedPatient && (
//         <div style={{ marginBottom: 15, background: '#f7fafc', borderRadius: 8, border: '1px solid #e2e8f0', padding: '12px 15px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//               <span style={{ fontWeight: 'bold' }}>
//                 #{selectedPatient.id} – {selectedPatient.firstName} {selectedPatient.lastName}
//               </span>
//               <span
//                 style={{
//                   fontSize: 12,
//                   background: selectedPatient.tempPatient ? '#ed8936' : '#48bb78',
//                   color: 'white',
//                   borderRadius: 12,
//                   padding: '2px 10px',
//                 }}
//               >
//                 {selectedPatient.tempPatient ? t.patient.temp : t.patient.permanent}
//               </span>
//               <button
//                 onClick={() => setShowDetails(!showDetails)}
//                 style={{
//                   background: 'transparent',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: 16,
//                   color: '#4299e1',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {showDetails ? '▲' : '▼'}
//               </button>
//             </div>
//             <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//               <button onClick={() => setShowWalkIn(true)} style={primaryBtn('#4299e1')}>
//                 🚶 {t.btn.walkIn}
//               </button>
//               <button onClick={() => setShowAppointments(true)} style={primaryBtn('#4299e1')}>
//                 📅 {t.btn.appointments}
//               </button>
//               <button onClick={() => setShowUpdatePatient(true)} style={primaryBtn('#4299e1')}>
//                 ✏️ {t.btn.updatePatient}
//               </button>
//               {selectedPatient.tempPatient && (
//                 <button onClick={() => setShowUpgradePatient(true)} style={primaryBtn('#ed8936')}>
//                   ⬆️ {t.btn.upgradePermanent}
//                 </button>
//               )}
//               <button onClick={() => alert('Print report')} style={primaryBtn('#48bb78')}>
//                 🖨️ {t.btn.printReport}
//               </button>
//               <button onClick={() => openAvailability(selectedPatient.id)} style={primaryBtn('#9f7aea')}>
//                 🔔 {t.btn.availability}
//               </button>
//             </div>
//           </div>
//           {showDetails && (
//             <div
//               style={{
//                 marginTop: 10,
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: '6px 20px',
//                 fontSize: '13px',
//               }}
//             >
//               <div><strong>{t.col.id}:</strong> {selectedPatient.id}</div>
//               <div><strong>{t.col.firstName}:</strong> {selectedPatient.firstName}</div>
//               <div><strong>{t.col.middleName}:</strong> {selectedPatient.middleName || ''}</div>
//               <div><strong>{t.col.lastName}:</strong> {selectedPatient.lastName}</div>
//               <div><strong>{t.col.phone}:</strong> {selectedPatient.phone}</div>
//               <div><strong>{t.col.address}:</strong> {selectedPatient.address || ''}</div>
//               <div><strong>{t.col.gender}:</strong> {selectedPatient.gender || ''}</div>
//               <div><strong>{t.col.dob}:</strong> {selectedPatient.dateOfBirth || ''}</div>
//               <div>
//                 <strong>{t.col.age}:</strong>{' '}
//                 {selectedPatient.dateOfBirth
//                   ? Math.floor((new Date() - new Date(selectedPatient.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
//                   : ''}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Table / Card container */}
//       <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 400 }}>
//         {loading ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
//         ) : filteredByType.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.status.noPatients}</div>
//         ) : viewMode === 'table' ? (
//           <TableView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
//         ) : (
//           <CardView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 15 }}>
//           <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)}>{'<'}</button>
//           <span>{`${t.label.showing} ${currentPage + 1} / ${totalPages}`}</span>
//           <button disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)}>{'>'}</button>
//         </div>
//       )}

//       {/* ---------- MODALS ---------- */}
//       {showAppointmentsAdmin && (
//         <AppointmentsAdminScreen
//           refreshCallback={() => {}}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowAppointmentsAdmin(false)}
//         />
//       )}
//       {showWalkIn && selectedPatient && (
//         <WalkInScreen
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowWalkIn(false)}
//         />
//       )}
//       {showUpdatePatient && selectedPatient && (
//         <UpdatePatientModal
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowUpdatePatient(false)}
//           onPatientUpdated={() => {
//             if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
//           }}
//         />
//       )}
//       {showUpgradePatient && selectedPatient && (
//         <UpgradePatientModal
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowUpgradePatient(false)}
//           onPatientUpgraded={() => {
//             if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
//           }}
//         />
//       )}
//       {showAppointments && selectedPatient && (
//         <AppointmentModal
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowAppointments(false)}
//         />
//       )}
//       {showAvailability && (
//         <AvailabilityModal
//           patientId={showAvailability}
//           doctors={doctors}
//           rooms={rooms}
//           translations={t}
//           onClose={() => setShowAvailability(false)}
//           onCheck={checkAvailability}
//           data={availabilityData}
//           lang={lang}
//         />
//       )}
//       {showVisits && (
//         <VisitsModal visits={visitData} translations={t} onClose={() => setShowVisits(false)} isRTL={isRTL} />
//       )}
//       {showAddPatient && (
//         <AddPatientModal
//           translations={t}
//           lang={lang}
//           onClose={() => setShowAddPatient(false)}
//           onPatientAdded={handlePatientAdded}
//         />
//       )}
//     </div>
//   );
// };

// // ---------- Sub-components (unchanged) ----------
// const StatCard = ({ icon, label, value, color }) => (
//   <div style={{
//     background: 'white', borderRadius: 12, padding: '15px 20px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
//     flex: 1, minWidth: 150, transition: 'transform 0.2s',
//   }}>
//     <span style={{ fontSize: 24 }}>{icon}</span>
//     <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
//     <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
//   </div>
// );

// const TableView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => {
//   const columns = isRTL
//     ? ['visits', 'age', 'dob', 'gender', 'address', 'phone', 'patientType', 'lastName', 'middleName', 'firstName', 'id']
//     : ['id', 'firstName', 'middleName', 'lastName', 'patientType', 'phone', 'address', 'gender', 'dob', 'age', 'visits'];

//   return (
//     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//       <thead>
//         <tr>
//           {columns.map(col => (
//             <th key={col} style={{ padding: 10, background: '#f8f9fa', textAlign: 'left' }}>
//               {t.col[col] || col}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {patients.map(p => (
//           <tr key={p.id} onClick={() => onSelect(p)} style={{
//             background: selected?.id === p.id ? '#ebf8ff' : 'white',
//             cursor: 'pointer', borderBottom: '1px solid #eee',
//           }}>
//             {columns.map(col => {
//               switch (col) {
//                 case 'id': return <td key={col}>{p.id}</td>;
//                 case 'firstName': return <td key={col}>{p.firstName}</td>;
//                 case 'middleName': return <td key={col}>{p.middleName || ''}</td>;
//                 case 'lastName': return <td key={col}>{p.lastName}</td>;
//                 case 'patientType':
//                   return (
//                     <td key={col} style={{ color: p.tempPatient ? '#ed8936' : '#48bb78', fontWeight: 'bold' }}>
//                       {p.tempPatient ? t.patient.temp : t.patient.permanent}
//                     </td>
//                   );
//                 case 'phone': return <td key={col}>{p.phone}</td>;
//                 case 'address': return <td key={col}>{p.address || ''}</td>;
//                 case 'gender': return <td key={col}>{p.gender || ''}</td>;
//                 case 'dob': return <td key={col}>{p.dateOfBirth || ''}</td>;
//                 case 'age': {
//                   const age = p.dateOfBirth
//                     ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
//                     : '';
//                   return <td key={col}>{age}</td>;
//                 }
//                 case 'visits':
//                   return (
//                     <td key={col}>
//                       <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={miniBtn}>
//                         📋 {t.btn.viewVisits}
//                       </button>
//                     </td>
//                   );
//                 default: return <td key={col}></td>;
//               }
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const CardView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => (
//   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
//     {patients.map(p => (
//       <div key={p.id} onClick={() => onSelect(p)} style={{
//         background: selected?.id === p.id ? '#ebf8ff' : 'white',
//         borderRadius: 12, padding: 15,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//         border: selected?.id === p.id ? '2px solid #4299e1' : '1px solid #edf2f7',
//         cursor: 'pointer', direction: isRTL ? 'rtl' : 'ltr',
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
//           <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>#{p.id}</span>
//           <span style={{ fontWeight: 'bold' }}>{p.firstName} {p.lastName}</span>
//           <span style={{
//             background: p.tempPatient ? '#ed8936' : '#48bb78',
//             color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 11
//           }}>
//             {p.tempPatient ? t.patient.temp : t.patient.permanent}
//           </span>
//         </div>
//         <div style={{ fontSize: 13, color: '#4a5568' }}>
//           📱 {p.phone} &nbsp; ⚤ {p.gender || 'N/A'} &nbsp;
//           🎂 {p.dateOfBirth && `${p.dateOfBirth} (${Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} ${t.label.years})`}
//         </div>
//         <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={{ marginTop: 8, ...miniBtn }}>
//           📋 {t.btn.viewVisits}
//         </button>
//       </div>
//     ))}
//   </div>
// );

// const AvailabilityModal = ({ patientId, doctors, rooms, translations: t, onClose, onCheck, data, lang }) => {
//   const [doctor, setDoctor] = useState('');
//   const [room, setRoom] = useState('');
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [loading, setLoading] = useState(false);

//   const handleCheck = async () => {
//     if (!doctor && !room) return alert(t.alert.selectDoctorOrRoom);
//     setLoading(true);
//     await onCheck(doctor, room, date);
//     setLoading(false);
//   };

//   return (
//     <div style={modalOverlay}>
//       <div style={modalContent}>
//         <h3>🔔 {t.title.availability} - Patient #{patientId}</h3>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '15px 0' }}>
//           <select value={doctor} onChange={e => setDoctor(e.target.value)} style={inputStyle}>
//             <option value="">{t.label.selectDoctor}</option>
//             {doctors.map(d => <option key={d.id} value={d.id}>{d.firstName} {d.lastName}</option>)}
//           </select>
//           <select value={room} onChange={e => setRoom(e.target.value)} style={inputStyle}>
//             <option value="">{t.label.selectRoom}</option>
//             {rooms.map(r => <option key={r.id} value={r.id}>{r.roomNumber}</option>)}
//           </select>
//           <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
//           <button onClick={handleCheck} style={primaryBtn('#48bb78')} disabled={loading}>
//             {loading ? '⏳' : t.btn.checkAvailability}
//           </button>
//         </div>
//         {data && (
//           <div>
//             <h4>{t.label.availableSlots}</h4>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               {data.map((slot, idx) => (
//                 <li key={idx} style={{
//                   padding: '8px 12px', borderRadius: 8, marginBottom: 5,
//                   background: slot.available ? '#d4edda' : '#f8d7da',
//                 }}>
//                   {slot.start} - {slot.end} : {slot.available ? t.label.available : t.label.notAvailable}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
//       </div>
//     </div>
//   );
// };

// const VisitsModal = ({ visits, translations: t, onClose, isRTL }) => (
//   <div style={modalOverlay}>
//     <div style={modalContent}>
//       <h3>📋 {t.title.patientVisits}</h3>
//       {visits && visits.length > 0 ? (
//         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
//           <thead>
//             <tr>
//               <th>{t.col.visitId}</th>
//               <th>{t.col.doctor}</th>
//               <th>{t.col.visitType}</th>
//               <th>{t.col.status}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {visits.map(v => (
//               <tr key={v.id}>
//                 <td>{v.id}</td>
//                 <td>{v.doctor?.fullName || v.doctorName || 'Unknown'}</td>
//                 <td>{v.visitType || 'Walk‑in'}</td>
//                 <td>{v.visitStatus || v.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>{t.status.noData}</p>
//       )}
//       <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
//     </div>
//   </div>
// );

// // ---------- Style utilities ----------
// const primaryBtn = (bg) => ({
//   background: bg, color: 'white', fontWeight: 'bold', border: 'none',
//   borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
// });

// const secondaryBtn = {
//   background: '#e2e8f0', border: 'none', padding: '8px 16px',
//   borderRadius: 8, cursor: 'pointer',
// };

// const iconBtn = {
//   background: 'transparent', border: '1px solid #ccc', borderRadius: 8,
//   padding: '8px 12px', cursor: 'pointer', fontSize: 16,
// };

// const toggleBtn = {
//   background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 8,
//   padding: '8px 12px', cursor: 'pointer',
// };

// const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };

// const miniBtn = {
//   background: '#4299e1', color: 'white', border: 'none', borderRadius: 6,
//   padding: '4px 10px', cursor: 'pointer', fontSize: 12,
// };

// const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' };

// const modalOverlay = {
//   position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//   background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
//   alignItems: 'center', zIndex: 1000,
// };

// const modalContent = {
//   background: 'white', borderRadius: 12, padding: 20, minWidth: 400,
//   maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// export default SearchPatientScreen;


// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';
// import { searchPatientTranslations } from '../../i18n/searchPatientTranslations';
// import AddPatientModal from '../AddPatientModal/AddPatientModal';
// import UpdatePatientModal from './UpdatePatientModal';
// import UpgradePatientModal from './UpgradePatientModal';
// import AppointmentModal from './AppointmentModal';
// import WalkInScreen from './WalkInScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';

// const API_PATIENT = `${BASE_URL}/api/patients`;
// const API_DOCTORS = `${BASE_URL}/api/doctors`;
// const API_LOG = `${BASE_URL}/api/logs/add`;
// const API_AVAILABILITY = `${BASE_URL}/api/availability`;
// const API_ROOMS = `${BASE_URL}/api/rooms`;

// const ROWS_PER_PAGE = 10;

// const SearchPatientScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   const t = searchPatientTranslations[lang] || searchPatientTranslations.en;
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [searchBy, setSearchBy] = useState('name');
//   const [searchText, setSearchText] = useState('');
//   const [allPatients, setAllPatients] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [viewMode, setViewMode] = useState('table');
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [stats, setStats] = useState({ total: 0, temp: 0, permanent: 0 });
//   const [lastSearch, setLastSearch] = useState(null);
//   const autoRefreshRef = useRef(null);
//   const [showAvailability, setShowAvailability] = useState(false);
//   const [availabilityData, setAvailabilityData] = useState(null);
//   const [showVisits, setShowVisits] = useState(false);
//   const [visitData, setVisitData] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [patientTypeFilter, setPatientTypeFilter] = useState('ALL');
//   const [showAddPatient, setShowAddPatient] = useState(false);
//   const [showUpdatePatient, setShowUpdatePatient] = useState(false);
//   const [showUpgradePatient, setShowUpgradePatient] = useState(false);
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [showWalkIn, setShowWalkIn] = useState(false);
//   const [showAppointmentsAdmin, setShowAppointmentsAdmin] = useState(false);

//   // New state for compact details panel
//   const [showDetails, setShowDetails] = useState(false);

//   // ---------- Helper functions ----------
//   const updateStats = (patients) => {
//     const total = patients.length;
//     const temp = patients.filter(p => p.tempPatient).length;
//     setStats({ total, temp, permanent: total - temp });
//   };

//   // ---------- Log action ----------
//   const logAction = useCallback(async (action, details) => {
//     try {
//       await fetch(API_LOG, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: loggedUser, action, details }),
//       });
//     } catch (e) { /* ignore */ }
//   }, [loggedUser]);

//   // ---------- Fetch patients ----------
//   const fetchPatients = useCallback(async (searchType, searchValue) => {
//     if (!searchValue || searchValue.trim().length < 3) {
//       setStatusMsg(`⚠️ ${t.alert.minChars}`);
//       return;
//     }
//     setLoading(true);
//     setStatusMsg(t.status.loading);
//     try {
//       const endpoint = searchType === 'mobile'
//         ? `${API_PATIENT}/search/mobile/${encodeURIComponent(searchValue)}`
//         : `${API_PATIENT}/search/name/${encodeURIComponent(searchValue)}`;
//       const res = await fetch(endpoint);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();

//       const normalized = data.map(p => ({
//         ...p,
//         tempPatient: p.patientType === 'TEMP',
//       }));

//       setAllPatients(normalized);
//       updateStats(normalized);
//       setCurrentPage(0);
//       setStatusMsg(`✅ ${t.status.found} ${normalized.length} ${t.label.patients}`);
//       setLastSearch({ type: searchType, value: searchValue });
//       logAction('SEARCH_PATIENT', `Searched by ${searchType} = ${searchValue}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.alert.errorFetch}: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, logAction]);

//   // Auto‑refresh
//   useEffect(() => {
//     if (lastSearch) {
//       autoRefreshRef.current = setInterval(() => {
//         fetchPatients(lastSearch.type, lastSearch.value);
//       }, 30000);
//     }
//     return () => {
//       if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
//     };
//   }, [lastSearch, fetchPatients]);

//   // ---------- Handlers ----------
//   const handleSearch = () => fetchPatients(searchBy, searchText.trim());

//   const exportCSV = () => {
//     if (allPatients.length === 0) {
//       setStatusMsg(`⚠️ ${t.alert.noDataToExport}`);
//       return;
//     }
//     const headers = ['ID', 'First Name', 'Middle Name', 'Last Name', 'Phone', 'Type', 'Gender', 'DOB', 'Age'];
//     const csvContent = [
//       headers.join(','),
//       ...allPatients.map(p => {
//         const age = p.dateOfBirth
//           ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
//           : '';
//         return `${p.id},${p.firstName},${p.middleName || ''},${p.lastName},${p.phone},${p.tempPatient ? 'TEMP' : 'PERMANENT'},${p.gender || ''},${p.dateOfBirth || ''},${age}`;
//       })
//     ].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `patients_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//     setStatusMsg(`📥 ${t.status.exported}`);
//   };

//   const openAvailability = (patientId) => {
//     setShowAvailability(patientId);
//     fetch(API_DOCTORS).then(res => res.json()).then(setDoctors);
//     fetch(API_ROOMS).then(res => res.json()).then(setRooms);
//   };

//   const checkAvailability = async (doctorId, roomId, date) => {
//     try {
//       let url = `${API_AVAILABILITY}?date=${date}`;
//       if (doctorId) url += `&doctorId=${doctorId}`;
//       if (roomId) url += `&roomId=${roomId}`;
//       const res = await fetch(url);
//       const slots = await res.json();
//       setAvailabilityData(slots);
//     } catch (err) {
//       alert(t.alert.errorFetch);
//     }
//   };

//   const showPatientVisits = async (patientId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/patient/${patientId}`);
//       if (!res.ok) throw new Error('Failed');
//       const visits = await res.json();
//       setVisitData(visits);
//       setShowVisits(true);
//     } catch (err) {
//       alert(t.alert.errorFetch);
//     }
//   };

//   // ---------- Callback when a new patient is added ----------
//   const handlePatientAdded = useCallback((newPatient) => {
//     if (lastSearch) {
//       fetchPatients(lastSearch.type, lastSearch.value);
//     } else {
//       const updated = [{ ...newPatient, tempPatient: newPatient.patientType === 'TEMP' }, ...allPatients];
//       setAllPatients(updated);
//       updateStats(updated);
//     }
//     setStatusMsg(`✅ ${t.status.patientAdded}: ${newPatient.firstName} ${newPatient.lastName}`);
//   }, [lastSearch, fetchPatients, allPatients, t]);

//   // ---------- Filter and pagination ----------
//   const filteredByType = allPatients.filter(p => {
//     if (patientTypeFilter === 'ALL') return true;
//     return patientTypeFilter === 'TEMP' ? p.tempPatient : !p.tempPatient;
//   });

//   const paginatedPatients = filteredByType.slice(
//     currentPage * ROWS_PER_PAGE,
//     (currentPage + 1) * ROWS_PER_PAGE
//   );

//   useEffect(() => {
//     setTotalPages(Math.ceil(filteredByType.length / ROWS_PER_PAGE));
//     if (currentPage >= Math.ceil(filteredByType.length / ROWS_PER_PAGE) && filteredByType.length > 0) {
//       setCurrentPage(0);
//     }
//   }, [filteredByType, currentPage]);

//   // ---------- Render ----------
//   return (
//     <div
//       style={{
//         padding: 20,
//         fontFamily: "'Noto Sans Arabic', Tahoma, 'Segoe UI', sans-serif",
//         direction: isRTL ? 'rtl' : 'ltr',
//       }}
//     >
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//         <h2>🔍 {t.title.searchPatients}</h2>
//         <div style={{ display: 'flex', gap: 10 }}>
//           <button onClick={() => setShowAppointmentsAdmin(true)} style={primaryBtn('#4299e1')}>
//             📅 {t.btn?.manageAppointments || 'Manage All Appointments'}
//           </button>
//           <button onClick={() => setShowAddPatient(true)} style={primaryBtn('#48bb78')}>
//             ➕ {t.btn.addNewPatient}
//           </button>
//           <button onClick={onClose} style={{ ...secondaryBtn, marginLeft: 10 }}>
//             ✕ {t.btn.close}
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
//         <StatCard icon="👥" label={t.stat.totalPatients} value={stats.total} color="#4299e1" />
//         <StatCard icon="🔄" label={t.stat.tempPatients} value={stats.temp} color="#ed8936" />
//         <StatCard icon="✅" label={t.stat.permanentPatients} value={stats.permanent} color="#48bb78" />
//       </div>

//       {/* Search controls */}
//       <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
//         <select value={searchBy} onChange={e => setSearchBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
//           <option value="name">{t.search.name}</option>
//           <option value="mobile">{t.search.mobile}</option>
//         </select>
//         <input
//           type="text"
//           placeholder={searchBy === 'mobile' ? t.prompt.mobile : t.prompt.name}
//           value={searchText}
//           onChange={e => setSearchText(e.target.value)}
//           onKeyPress={e => e.key === 'Enter' && handleSearch()}
//           style={{ flex: 1, padding: '8px 15px', borderRadius: 25, border: '1px solid #ccc' }}
//         />
//         <button onClick={handleSearch} style={primaryBtn('#4299e1')} disabled={loading}>
//           🔍 {t.btn.search}
//         </button>
//         <button onClick={() => lastSearch && fetchPatients(lastSearch.type, lastSearch.value)} style={iconBtn}>
//           🔄
//         </button>
//         <button onClick={exportCSV} style={iconBtn}>
//           📥
//         </button>
//         <select value={patientTypeFilter} onChange={e => setPatientTypeFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
//           <option value="ALL">{t.patient.temp} + {t.patient.permanent}</option>
//           <option value="TEMP">{t.patient.temp}</option>
//           <option value="PERMANENT">{t.patient.permanent}</option>
//         </select>
//         <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
//           📋 {t.btn.table}
//         </button>
//         <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
//           🃏 {t.btn.cards}
//         </button>
//       </div>

//       <div style={{ marginBottom: 10, color: '#4a5568' }}>{statusMsg}</div>

//       {/* ---- Patient Selection Bar (above table) ---- */}
//       {selectedPatient && (
//         <div style={{ marginBottom: 15, background: '#f7fafc', borderRadius: 8, border: '1px solid #e2e8f0', padding: '12px 15px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//               <span style={{ fontWeight: 'bold' }}>
//                 #{selectedPatient.id} – {selectedPatient.firstName} {selectedPatient.lastName}
//               </span>
//               <span
//                 style={{
//                   fontSize: 12,
//                   background: selectedPatient.tempPatient ? '#ed8936' : '#48bb78',
//                   color: 'white',
//                   borderRadius: 12,
//                   padding: '2px 10px',
//                 }}
//               >
//                 {selectedPatient.tempPatient ? t.patient.temp : t.patient.permanent}
//               </span>
//               <button
//                 onClick={() => setShowDetails(!showDetails)}
//                 style={{
//                   background: 'transparent',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: 16,
//                   color: '#4299e1',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {showDetails ? '▲' : '▼'}
//               </button>
//             </div>
//             <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//               <button onClick={() => setShowWalkIn(true)} style={primaryBtn('#4299e1')}>
//                 🚶 {t.btn.walkIn}
//               </button>
//               <button onClick={() => setShowAppointments(true)} style={primaryBtn('#4299e1')}>
//                 📅 {t.btn.appointments}
//               </button>
//               <button onClick={() => setShowUpdatePatient(true)} style={primaryBtn('#4299e1')}>
//                 ✏️ {t.btn.updatePatient}
//               </button>
//               {selectedPatient.tempPatient && (
//                 <button onClick={() => setShowUpgradePatient(true)} style={primaryBtn('#ed8936')}>
//                   ⬆️ {t.btn.upgradePermanent}
//                 </button>
//               )}
//               <button onClick={() => alert('Print report')} style={primaryBtn('#48bb78')}>
//                 🖨️ {t.btn.printReport}
//               </button>
//               <button onClick={() => openAvailability(selectedPatient.id)} style={primaryBtn('#9f7aea')}>
//                 🔔 {t.btn.availability}
//               </button>
//             </div>
//           </div>
//           {showDetails && (
//             <div
//               style={{
//                 marginTop: 10,
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: '6px 20px',
//                 fontSize: '13px',
//               }}
//             >
//               <div><strong>{t.col.id}:</strong> {selectedPatient.id}</div>
//               <div><strong>{t.col.firstName}:</strong> {selectedPatient.firstName}</div>
//               <div><strong>{t.col.middleName}:</strong> {selectedPatient.middleName || ''}</div>
//               <div><strong>{t.col.lastName}:</strong> {selectedPatient.lastName}</div>
//               <div><strong>{t.col.phone}:</strong> {selectedPatient.phone}</div>
//               <div><strong>{t.col.address}:</strong> {selectedPatient.address || ''}</div>
//               <div><strong>{t.col.gender}:</strong> {selectedPatient.gender || ''}</div>
//               <div><strong>{t.col.dob}:</strong> {selectedPatient.dateOfBirth || ''}</div>
//               <div>
//                 <strong>{t.col.age}:</strong>{' '}
//                 {selectedPatient.dateOfBirth
//                   ? Math.floor((new Date() - new Date(selectedPatient.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
//                   : ''}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Table / Card container */}
//       <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 400 }}>
//         {loading ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
//         ) : filteredByType.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.status.noPatients}</div>
//         ) : viewMode === 'table' ? (
//           <TableView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
//         ) : (
//           <CardView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 15 }}>
//           <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)}>{'<'}</button>
//           <span>{`${t.label.showing} ${currentPage + 1} / ${totalPages}`}</span>
//           <button disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)}>{'>'}</button>
//         </div>
//       )}

//       {/* ---------- MODALS ---------- */}
//       {showAppointmentsAdmin && (
//         <AppointmentsAdminScreen
//           refreshCallback={() => {}}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowAppointmentsAdmin(false)}
//         />
//       )}
//       {showWalkIn && selectedPatient && (
//         <WalkInScreen
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowWalkIn(false)}
//         />
//       )}
//       {showUpdatePatient && selectedPatient && (
//         <UpdatePatientModal
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowUpdatePatient(false)}
//           onPatientUpdated={() => {
//             if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
//           }}
//         />
//       )}
//       {showUpgradePatient && selectedPatient && (
//         <UpgradePatientModal
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowUpgradePatient(false)}
//           onPatientUpgraded={() => {
//             if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
//           }}
//         />
//       )}
//       {showAppointments && selectedPatient && (
//         <AppointmentModal
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowAppointments(false)}
//         />
//       )}
//       {showAvailability && (
//         <AvailabilityModal
//           patientId={showAvailability}
//           doctors={doctors}
//           rooms={rooms}
//           translations={t}
//           onClose={() => setShowAvailability(false)}
//           onCheck={checkAvailability}
//           data={availabilityData}
//           lang={lang}
//         />
//       )}
//       {showVisits && (
//         <VisitsModal visits={visitData} translations={t} onClose={() => setShowVisits(false)} isRTL={isRTL} />
//       )}
//       {showAddPatient && (
//         <AddPatientModal
//           translations={t}
//           lang={lang}
//           onClose={() => setShowAddPatient(false)}
//           onPatientAdded={handlePatientAdded}
//         />
//       )}
//     </div>
//   );
// };

// // ---------- Sub-components ----------
// const StatCard = ({ icon, label, value, color }) => (
//   <div style={{
//     background: 'white', borderRadius: 12, padding: '15px 20px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
//     flex: 1, minWidth: 150, transition: 'transform 0.2s',
//   }}>
//     <span style={{ fontSize: 24 }}>{icon}</span>
//     <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
//     <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
//   </div>
// );

// const TableView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => {
//   const columns = isRTL
//     ? ['visits', 'age', 'dob', 'gender', 'address', 'phone', 'patientType', 'lastName', 'middleName', 'firstName', 'id']
//     : ['id', 'firstName', 'middleName', 'lastName', 'patientType', 'phone', 'address', 'gender', 'dob', 'age', 'visits'];

//   return (
//     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//       <thead>
//         <tr>
//           {columns.map(col => (
//             <th key={col} style={{ padding: 10, background: '#f8f9fa', textAlign: 'left' }}>
//               {t.col[col] || col}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {patients.map(p => (
//           <tr key={p.id} onClick={() => onSelect(p)} style={{
//             background: selected?.id === p.id ? '#ebf8ff' : 'white',
//             cursor: 'pointer', borderBottom: '1px solid #eee',
//           }}>
//             {columns.map(col => {
//               switch (col) {
//                 case 'id': return <td key={col}>{p.id}</td>;
//                 case 'firstName': return <td key={col}>{p.firstName}</td>;
//                 case 'middleName': return <td key={col}>{p.middleName || ''}</td>;
//                 case 'lastName': return <td key={col}>{p.lastName}</td>;
//                 case 'patientType':
//                   return (
//                     <td key={col} style={{ color: p.tempPatient ? '#ed8936' : '#48bb78', fontWeight: 'bold' }}>
//                       {p.tempPatient ? t.patient.temp : t.patient.permanent}
//                     </td>
//                   );
//                 case 'phone': return <td key={col}>{p.phone}</td>;
//                 case 'address': return <td key={col}>{p.address || ''}</td>;
//                 case 'gender': return <td key={col}>{p.gender || ''}</td>;
//                 case 'dob': return <td key={col}>{p.dateOfBirth || ''}</td>;
//                 case 'age': {
//                   const age = p.dateOfBirth
//                     ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
//                     : '';
//                   return <td key={col}>{age}</td>;
//                 }
//                 case 'visits':
//                   return (
//                     <td key={col}>
//                       <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={miniBtn}>
//                         📋 {t.btn.viewVisits}
//                       </button>
//                     </td>
//                   );
//                 default: return <td key={col}></td>;
//               }
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const CardView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => (
//   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
//     {patients.map(p => (
//       <div key={p.id} onClick={() => onSelect(p)} style={{
//         background: selected?.id === p.id ? '#ebf8ff' : 'white',
//         borderRadius: 12, padding: 15,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//         border: selected?.id === p.id ? '2px solid #4299e1' : '1px solid #edf2f7',
//         cursor: 'pointer', direction: isRTL ? 'rtl' : 'ltr',
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
//           <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>#{p.id}</span>
//           <span style={{ fontWeight: 'bold' }}>{p.firstName} {p.lastName}</span>
//           <span style={{
//             background: p.tempPatient ? '#ed8936' : '#48bb78',
//             color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 11
//           }}>
//             {p.tempPatient ? t.patient.temp : t.patient.permanent}
//           </span>
//         </div>
//         <div style={{ fontSize: 13, color: '#4a5568' }}>
//           📱 {p.phone} &nbsp; ⚤ {p.gender || 'N/A'} &nbsp;
//           🎂 {p.dateOfBirth && `${p.dateOfBirth} (${Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} ${t.label.years})`}
//         </div>
//         <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={{ marginTop: 8, ...miniBtn }}>
//           📋 {t.btn.viewVisits}
//         </button>
//       </div>
//     ))}
//   </div>
// );

// // ===================== UPDATED AVAILABILITY MODAL =====================
// const AvailabilityModal = ({ patientId, doctors, rooms, translations: t, onClose, onCheck, data, lang }) => {
//   const [doctor, setDoctor] = useState('');
//   const [room, setRoom] = useState('');
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [loading, setLoading] = useState(false);

//   const handleCheck = async () => {
//     if (!doctor && !room) return alert(t.alert.selectDoctorOrRoom);
//     setLoading(true);
//     await onCheck(doctor, room, date);
//     setLoading(false);
//   };

//   return (
//     <div style={modalOverlay}>
//       <div style={{ ...modalContent, width: '500px', maxWidth: '90%', minWidth: 'auto' }}>
//         {/* Header with close button */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
//           <h3 style={{ margin: 0 }}>🔔 {t.title.availability} - Patient #{patientId}</h3>
//           <button
//             onClick={onClose}
//             style={{
//               background: 'transparent',
//               border: 'none',
//               fontSize: 24,
//               cursor: 'pointer',
//               color: '#a0aec0',
//               padding: '0 8px',
//             }}
//           >
//             ✕
//           </button>
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '15px 0' }}>
//           <select value={doctor} onChange={e => setDoctor(e.target.value)} style={inputStyle}>
//             <option value="">{t.label.selectDoctor}</option>
//             {doctors.map(d => <option key={d.id} value={d.id}>{d.firstName} {d.lastName}</option>)}
//           </select>
//           <select value={room} onChange={e => setRoom(e.target.value)} style={inputStyle}>
//             <option value="">{t.label.selectRoom}</option>
//             {rooms.map(r => <option key={r.id} value={r.id}>{r.roomNumber}</option>)}
//           </select>
//           <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
//           <button onClick={handleCheck} style={primaryBtn('#48bb78')} disabled={loading}>
//             {loading ? '⏳' : t.btn.checkAvailability}
//           </button>
//         </div>

//         {/* Show results only if data exists */}
//         {data && data.length > 0 && (
//           <div>
//             <h4>{t.label.availableSlots}</h4>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               {data.map((slot, idx) => (
//                 <li key={idx} style={{
//                   padding: '8px 12px',
//                   borderRadius: 8,
//                   marginBottom: 5,
//                   background: slot.available ? '#d4edda' : '#f8d7da',
//                 }}>
//                   {slot.start} - {slot.end} : {slot.available ? t.label.available : t.label.notAvailable}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {data && data.length === 0 && (
//           <div style={{ textAlign: 'center', padding: 20, color: '#718096' }}>
//             {t.label.noSlots || 'No available slots'}
//           </div>
//         )}

//         <div style={{ marginTop: 15, display: 'flex', justifyContent: 'flex-end' }}>
//           <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// // ================================================================

// const VisitsModal = ({ visits, translations: t, onClose, isRTL }) => (
//   <div style={modalOverlay}>
//     <div style={modalContent}>
//       <h3>📋 {t.title.patientVisits}</h3>
//       {visits && visits.length > 0 ? (
//         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
//           <thead>
//             <tr>
//               <th>{t.col.visitId}</th>
//               <th>{t.col.doctor}</th>
//               <th>{t.col.visitType}</th>
//               <th>{t.col.status}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {visits.map(v => (
//               <tr key={v.id}>
//                 <td>{v.id}</td>
//                 <td>{v.doctor?.fullName || v.doctorName || 'Unknown'}</td>
//                 <td>{v.visitType || 'Walk‑in'}</td>
//                 <td>{v.visitStatus || v.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>{t.status.noData}</p>
//       )}
//       <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
//     </div>
//   </div>
// );

// // ---------- Style utilities ----------
// const primaryBtn = (bg) => ({
//   background: bg, color: 'white', fontWeight: 'bold', border: 'none',
//   borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
// });

// const secondaryBtn = {
//   background: '#e2e8f0', border: 'none', padding: '8px 16px',
//   borderRadius: 8, cursor: 'pointer',
// };

// const iconBtn = {
//   background: 'transparent', border: '1px solid #ccc', borderRadius: 8,
//   padding: '8px 12px', cursor: 'pointer', fontSize: 16,
// };

// const toggleBtn = {
//   background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 8,
//   padding: '8px 12px', cursor: 'pointer',
// };

// const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };

// const miniBtn = {
//   background: '#4299e1', color: 'white', border: 'none', borderRadius: 6,
//   padding: '4px 10px', cursor: 'pointer', fontSize: 12,
// };

// const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' };

// const modalOverlay = {
//   position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//   background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
//   alignItems: 'center', zIndex: 1000,
// };

// const modalContent = {
//   background: 'white', borderRadius: 12, padding: 20,
//   maxHeight: '80vh', overflowY: 'auto',
//   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// export default SearchPatientScreen; 01072026 9:15 AM

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';
// import { searchPatientTranslations } from '../../i18n/searchPatientTranslations';
// import AddPatientModal from '../AddPatientModal/AddPatientModal';
// import UpdatePatientModal from './UpdatePatientModal';
// import UpgradePatientModal from './UpgradePatientModal';
// import AppointmentModal from './AppointmentModal';
// import WalkInScreen from './WalkInScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';   // ✅ direct import

// const API_PATIENT = `${BASE_URL}/api/patients`;
// const API_DOCTORS = `${BASE_URL}/api/doctors`;
// const API_LOG = `${BASE_URL}/api/logs/add`;
// const API_AVAILABILITY = `${BASE_URL}/api/availability`;
// const API_ROOMS = `${BASE_URL}/api/rooms`;

// const ROWS_PER_PAGE = 10;

// const SearchPatientScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   const t = searchPatientTranslations[lang] || searchPatientTranslations.en;
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [searchBy, setSearchBy] = useState('name');
//   const [searchText, setSearchText] = useState('');
//   const [allPatients, setAllPatients] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [viewMode, setViewMode] = useState('table');
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [stats, setStats] = useState({ total: 0, temp: 0, permanent: 0 });
//   const [lastSearch, setLastSearch] = useState(null);
//   const autoRefreshRef = useRef(null);
//   const [showAvailability, setShowAvailability] = useState(false);
//   const [availabilityData, setAvailabilityData] = useState(null);
//   const [showVisits, setShowVisits] = useState(false);
//   const [visitData, setVisitData] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [patientTypeFilter, setPatientTypeFilter] = useState('ALL');
//   const [showAddPatient, setShowAddPatient] = useState(false);
//   const [showUpdatePatient, setShowUpdatePatient] = useState(false);
//   const [showUpgradePatient, setShowUpgradePatient] = useState(false);
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [showWalkIn, setShowWalkIn] = useState(false);
//   const [showAppointmentsAdmin, setShowAppointmentsAdmin] = useState(false);

//   // New state for compact details panel
//   const [showDetails, setShowDetails] = useState(false);

//   // ---------- Helper functions ----------
//   const updateStats = (patients) => {
//     const total = patients.length;
//     const temp = patients.filter(p => p.tempPatient).length;
//     setStats({ total, temp, permanent: total - temp });
//   };

//   // ---------- Log action ----------
//   const logAction = useCallback(async (action, details) => {
//     try {
//       await fetch(API_LOG, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: loggedUser, action, details }),
//       });
//     } catch (e) { /* ignore */ }
//   }, [loggedUser]);

//   // ---------- Fetch patients ----------
//   const fetchPatients = useCallback(async (searchType, searchValue) => {
//     if (!searchValue || searchValue.trim().length < 3) {
//       setStatusMsg(`⚠️ ${t.alert.minChars}`);
//       return;
//     }
//     setLoading(true);
//     setStatusMsg(t.status.loading);
//     try {
//       const endpoint = searchType === 'mobile'
//         ? `${API_PATIENT}/search/mobile/${encodeURIComponent(searchValue)}`
//         : `${API_PATIENT}/search/name/${encodeURIComponent(searchValue)}`;
//       const res = await fetch(endpoint);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();

//       const normalized = data.map(p => ({
//         ...p,
//         tempPatient: p.patientType === 'TEMP',
//       }));

//       setAllPatients(normalized);
//       updateStats(normalized);
//       setCurrentPage(0);
//       setStatusMsg(`✅ ${t.status.found} ${normalized.length} ${t.label.patients}`);
//       setLastSearch({ type: searchType, value: searchValue });
//       logAction('SEARCH_PATIENT', `Searched by ${searchType} = ${searchValue}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.alert.errorFetch}: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, logAction]);

//   // Auto‑refresh
//   useEffect(() => {
//     if (lastSearch) {
//       autoRefreshRef.current = setInterval(() => {
//         fetchPatients(lastSearch.type, lastSearch.value);
//       }, 30000);
//     }
//     return () => {
//       if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
//     };
//   }, [lastSearch, fetchPatients]);

//   // ---------- Handlers ----------
//   const handleSearch = () => fetchPatients(searchBy, searchText.trim());

//   const exportCSV = () => {
//     if (allPatients.length === 0) {
//       setStatusMsg(`⚠️ ${t.alert.noDataToExport}`);
//       return;
//     }
//     const headers = ['ID', 'First Name', 'Middle Name', 'Last Name', 'Phone', 'Type', 'Gender', 'DOB', 'Age'];
//     const csvContent = [
//       headers.join(','),
//       ...allPatients.map(p => {
//         const age = p.dateOfBirth
//           ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
//           : '';
//         return `${p.id},${p.firstName},${p.middleName || ''},${p.lastName},${p.phone},${p.tempPatient ? 'TEMP' : 'PERMANENT'},${p.gender || ''},${p.dateOfBirth || ''},${age}`;
//       })
//     ].join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `patients_${new Date().toISOString().slice(0, 10)}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//     setStatusMsg(`📥 ${t.status.exported}`);
//   };

//   const openAvailability = (patientId) => {
//     setShowAvailability(patientId);
//     fetch(API_DOCTORS).then(res => res.json()).then(setDoctors);
//     fetch(API_ROOMS).then(res => res.json()).then(setRooms);
//   };

//   const checkAvailability = async (doctorId, roomId, date) => {
//     try {
//       let url = `${API_AVAILABILITY}?date=${date}`;
//       if (doctorId) url += `&doctorId=${doctorId}`;
//       if (roomId) url += `&roomId=${roomId}`;
//       const res = await fetch(url);
//       const slots = await res.json();
//       setAvailabilityData(slots);
//     } catch (err) {
//       alert(t.alert.errorFetch);
//     }
//   };

//   const showPatientVisits = async (patientId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/visits/patient/${patientId}`);
//       if (!res.ok) throw new Error('Failed');
//       const visits = await res.json();
//       setVisitData(visits);
//       setShowVisits(true);
//     } catch (err) {
//       alert(t.alert.errorFetch);
//     }
//   };

//   // ---------- Print Report ----------
// // ---------- Print Report (FIXED) ----------
// const getClinicName = async () => {
//   try {
//     const res = await fetch(`${BASE_URL}/api/clinic/1/info`);
//     if (!res.ok) throw new Error('Failed to fetch clinic info');
//     const data = await res.json();
//     return data.clinicName || 'Clinic';
//   } catch (err) {
//     //console.error('Failed to fetch clinic name', err);
//     return 'Clinic';
//   }
// };

// // const generatePDFReport = (visits, patient, clinicName) => {
// //   try {
// //     const doc = new jsPDF();

// //     // ✅ Force English translations for PDF only
// //     const pdfTranslations = {
// //       reportTitle: 'Patient Visit Report',
// //       patient: 'Patient',
// //       date: 'Date',
// //       visitId: 'Visit ID',
// //       doctor: 'Doctor',
// //       visitType: 'Visit Type',
// //       status: 'Status',
// //       checkIn: 'Check‑in',
// //       consultStart: 'Consult Start',
// //       consultEnd: 'Consult End',
// //       dischargeStatus: 'Discharge Status',
// //     };

// //     const tr = (key) => pdfTranslations[key] || key;

// //     // ===== ADD SMALL IMAGE HEADER =====
// //     const imgData = new Image();
// //     imgData.src = '/report-pic.png';

// //     return new Promise((resolve, reject) => {
// //       imgData.onload = function() {
// //         try {
// //           // ✅ SMALLER IMAGE: 40mm wide (was 180mm)
// //           const imgWidth = 40; // reduced from 180 to 40
// //           const imgHeight = (imgData.height / imgData.width) * imgWidth;
// //           const xPosition = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
          
// //           // Add image at the top (centered)
// //           doc.addImage(imgData, 'PNG', xPosition, 8, imgWidth, imgHeight);
          
// //           // Start text below the image (smaller gap since image is smaller)
// //           const startY = 8 + imgHeight + 8;

// //           // Clinic name
// //           doc.setFontSize(18);
// //           doc.setFont('helvetica', 'bold');
// //           doc.text(clinicName, 105, startY + 10, { align: 'center' });

// //           // Title & patient info
// //           doc.setFontSize(12);
// //           doc.setFont('helvetica', 'normal');
// //           doc.text(tr('reportTitle'), 105, startY + 20, { align: 'center' });
// //           doc.text(`${tr('patient')}: ${patient.firstName} ${patient.lastName}`, 105, startY + 28, { align: 'center' });
// //           doc.text(`${tr('date')}: ${new Date().toLocaleDateString('en-US')}`, 105, startY + 36, { align: 'center' });

// //           // Build table data
// //           const tableHeaders = [
// //             tr('visitId'),
// //             tr('doctor'),
// //             tr('visitType'),
// //             tr('status'),
// //             tr('checkIn'),
// //             tr('consultStart'),
// //             tr('consultEnd'),
// //             tr('dischargeStatus'),
// //           ];

// //           const tableRows = visits.map(v => [
// //             v.id || '',
// //             v.doctor?.fullName || v.doctorName || 'Unknown',
// //             v.visitType || 'N/A',
// //             v.visitStatus || v.status || 'N/A',
// //             v.checkInTime || 'N/A',
// //             v.consultationStart || 'N/A',
// //             v.consultationEnd || 'N/A',
// //             v.dischargeStatus || 'N/A',
// //           ]);

// //           // Add table
// //           autoTable(doc, {
// //             head: [tableHeaders],
// //             body: tableRows,
// //             startY: startY + 45,
// //             theme: 'striped',
// //             styles: { fontSize: 8 },
// //             headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontSize: 8 },
// //             margin: { left: 10, right: 10 },
// //           });

// //           // Save PDF
// //           doc.save(`PatientHistory_${patient.id}.pdf`);
// //           setStatusMsg(`📥 ${t.status.exported}`);
// //           alert(t.alert.pdfSaved || 'PDF saved successfully');
// //           resolve();
// //         } catch (err) {
// //           //console.error('PDF generation error:', err);
// //           alert(`PDF generation failed: ${err.message}`);
// //           setStatusMsg(`❌ ${t.status.error}`);
// //           reject(err);
// //         }
// //       };

// //       imgData.onerror = function() {
// //         // If image fails to load, generate report without image
// //         //console.warn('Image not found, generating report without header image');
        
// //         try {
// //           // Generate report without image (fallback)
// //           const startY = 20;

// //           doc.setFontSize(18);
// //           doc.setFont('helvetica', 'bold');
// //           doc.text(clinicName, 105, startY, { align: 'center' });

// //           doc.setFontSize(12);
// //           doc.setFont('helvetica', 'normal');
// //           doc.text(tr('reportTitle'), 105, startY + 10, { align: 'center' });
// //           doc.text(`${tr('patient')}: ${patient.firstName} ${patient.lastName}`, 105, startY + 18, { align: 'center' });
// //           doc.text(`${tr('date')}: ${new Date().toLocaleDateString('en-US')}`, 105, startY + 26, { align: 'center' });

// //           const tableHeaders = [
// //             tr('visitId'),
// //             tr('doctor'),
// //             tr('visitType'),
// //             tr('status'),
// //             tr('checkIn'),
// //             tr('consultStart'),
// //             tr('consultEnd'),
// //             tr('dischargeStatus'),
// //           ];

// //           const tableRows = visits.map(v => [
// //             v.id || '',
// //             v.doctor?.fullName || v.doctorName || 'Unknown',
// //             v.visitType || 'N/A',
// //             v.visitStatus || v.status || 'N/A',
// //             v.checkInTime || 'N/A',
// //             v.consultationStart || 'N/A',
// //             v.consultationEnd || 'N/A',
// //             v.dischargeStatus || 'N/A',
// //           ]);

// //           autoTable(doc, {
// //             head: [tableHeaders],
// //             body: tableRows,
// //             startY: startY + 35,
// //             theme: 'striped',
// //             styles: { fontSize: 8 },
// //             headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontSize: 8 },
// //             margin: { left: 10, right: 10 },
// //           });

// //           doc.save(`PatientHistory_${patient.id}.pdf`);
// //           setStatusMsg(`📥 ${t.status.exported}`);
// //           alert(t.alert.pdfSaved || 'PDF saved successfully');
// //           resolve();
// //         } catch (err) {
// //           //console.error('PDF generation error (fallback):', err);
// //           alert(`PDF generation failed: ${err.message}`);
// //           setStatusMsg(`❌ ${t.status.error}`);
// //           reject(err);
// //         }
// //       };
// //     });
// //   } catch (err) {
// //     //console.error('PDF generation error:', err);
// //     alert(`PDF generation failed: ${err.message}`);
// //     setStatusMsg(`❌ ${t.status.error}`);
// //   }
// // };




// const handlePrintReport = async (patient) => {
//   if (!patient) return;
//   try {
//     const res = await fetch(`${BASE_URL}/api/visits/patient/${patient.id}`);
//     if (!res.ok) throw new Error('Failed to fetch visits');
//     const visits = await res.json();
//     //console.log('Visits for report:', visits);
//     const clinicName = await getClinicName();
    
//     // ✅ Wait for the PDF generation (including image loading)
//     await generatePDFReport(visits, patient, clinicName);
    
//     logAction('PRINT_REPORT', `Printed report for patient ${patient.id}`);
//   } catch (err) {
//     //console.error('Error fetching visits or generating PDF:', err);
//     alert(`${t.alert.pdfFailed || 'PDF generation failed'}: ${err.message}`);
//     setStatusMsg(`❌ ${t.status.error}`);
//   }
// };

//   // ---------- Callback when a new patient is added ----------
//   const handlePatientAdded = useCallback((newPatient) => {
//     if (lastSearch) {
//       fetchPatients(lastSearch.type, lastSearch.value);
//     } else {
//       const updated = [{ ...newPatient, tempPatient: newPatient.patientType === 'TEMP' }, ...allPatients];
//       setAllPatients(updated);
//       updateStats(updated);
//     }
//     setStatusMsg(`✅ ${t.status.patientAdded}: ${newPatient.firstName} ${newPatient.lastName}`);
//   }, [lastSearch, fetchPatients, allPatients, t]);

//   // ---------- Filter and pagination ----------
//   const filteredByType = allPatients.filter(p => {
//     if (patientTypeFilter === 'ALL') return true;
//     return patientTypeFilter === 'TEMP' ? p.tempPatient : !p.tempPatient;
//   });

//   const paginatedPatients = filteredByType.slice(
//     currentPage * ROWS_PER_PAGE,
//     (currentPage + 1) * ROWS_PER_PAGE
//   );

//   useEffect(() => {
//     setTotalPages(Math.ceil(filteredByType.length / ROWS_PER_PAGE));
//     if (currentPage >= Math.ceil(filteredByType.length / ROWS_PER_PAGE) && filteredByType.length > 0) {
//       setCurrentPage(0);
//     }
//   }, [filteredByType, currentPage]);

//   // ---------- Render ----------
//   return (
//     <div
//       style={{
//         padding: 20,
//         fontFamily: "'Noto Sans Arabic', Tahoma, 'Segoe UI', sans-serif",
//         direction: isRTL ? 'rtl' : 'ltr',
//       }}
//     >
//       {/* Header */}
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
//         <h2>🔍 {t.title.searchPatients}</h2>
//         <div style={{ display: 'flex', gap: 10 }}>
//           <button onClick={() => setShowAppointmentsAdmin(true)} style={primaryBtn('#4299e1')}>
//             📅 {t.btn?.manageAppointments || 'Manage All Appointments'}
//           </button>
//           <button onClick={() => setShowAddPatient(true)} style={primaryBtn('#48bb78')}>
//             ➕ {t.btn.addNewPatient}
//           </button>
//           <button onClick={onClose} style={{ ...secondaryBtn, marginLeft: 10 }}>
//             ✕ {t.btn.close}
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
//         <StatCard icon="👥" label={t.stat.totalPatients} value={stats.total} color="#4299e1" />
//         <StatCard icon="🔄" label={t.stat.tempPatients} value={stats.temp} color="#ed8936" />
//         <StatCard icon="✅" label={t.stat.permanentPatients} value={stats.permanent} color="#48bb78" />
//       </div>

//       {/* Search controls */}
//       <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
//         <select value={searchBy} onChange={e => setSearchBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
//           <option value="name">{t.search.name}</option>
//           <option value="mobile">{t.search.mobile}</option>
//         </select>
//         <input
//           type="text"
//           placeholder={searchBy === 'mobile' ? t.prompt.mobile : t.prompt.name}
//           value={searchText}
//           onChange={e => setSearchText(e.target.value)}
//           onKeyPress={e => e.key === 'Enter' && handleSearch()}
//           style={{ flex: 1, padding: '8px 15px', borderRadius: 25, border: '1px solid #ccc' }}
//         />
//         <button onClick={handleSearch} style={primaryBtn('#4299e1')} disabled={loading}>
//           🔍 {t.btn.search}
//         </button>
//         <button onClick={() => lastSearch && fetchPatients(lastSearch.type, lastSearch.value)} style={iconBtn}>
//           🔄
//         </button>
//         <button onClick={exportCSV} style={iconBtn}>
//           📥
//         </button>
//         <select value={patientTypeFilter} onChange={e => setPatientTypeFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
//           <option value="ALL">{t.patient.temp} + {t.patient.permanent}</option>
//           <option value="TEMP">{t.patient.temp}</option>
//           <option value="PERMANENT">{t.patient.permanent}</option>
//         </select>
//         <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
//           📋 {t.btn.table}
//         </button>
//         <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
//           🃏 {t.btn.cards}
//         </button>
//       </div>

//       <div style={{ marginBottom: 10, color: '#4a5568' }}>{statusMsg}</div>

//       {/* ---- Patient Selection Bar (above table) ---- */}
//       {selectedPatient && (
//         <div style={{ marginBottom: 15, background: '#f7fafc', borderRadius: 8, border: '1px solid #e2e8f0', padding: '12px 15px' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
//               <span style={{ fontWeight: 'bold' }}>
//                 #{selectedPatient.id} – {selectedPatient.firstName} {selectedPatient.lastName}
//               </span>
//               <span
//                 style={{
//                   fontSize: 12,
//                   background: selectedPatient.tempPatient ? '#ed8936' : '#48bb78',
//                   color: 'white',
//                   borderRadius: 12,
//                   padding: '2px 10px',
//                 }}
//               >
//                 {selectedPatient.tempPatient ? t.patient.temp : t.patient.permanent}
//               </span>
//               <button
//                 onClick={() => setShowDetails(!showDetails)}
//                 style={{
//                   background: 'transparent',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: 16,
//                   color: '#4299e1',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {showDetails ? '▲' : '▼'}
//               </button>
//             </div>
//             <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
//               <button onClick={() => setShowWalkIn(true)} style={primaryBtn('#4299e1')}>
//                 🚶 {t.btn.walkIn}
//               </button>
//               <button onClick={() => setShowAppointments(true)} style={primaryBtn('#4299e1')}>
//                 📅 {t.btn.appointments}
//               </button>
//               <button onClick={() => setShowUpdatePatient(true)} style={primaryBtn('#4299e1')}>
//                 ✏️ {t.btn.updatePatient}
//               </button>
//               {selectedPatient.tempPatient && (
//                 <button onClick={() => setShowUpgradePatient(true)} style={primaryBtn('#ed8936')}>
//                   ⬆️ {t.btn.upgradePermanent}
//                 </button>
//               )}
//               <button onClick={() => handlePrintReport(selectedPatient)} style={primaryBtn('#48bb78')}>
//                 🖨️ {t.btn.printReport}
//               </button>
//               <button onClick={() => openAvailability(selectedPatient.id)} style={primaryBtn('#9f7aea')}>
//                 🔔 {t.btn.availability}
//               </button>
//             </div>
//           </div>
//           {showDetails && (
//             <div
//               style={{
//                 marginTop: 10,
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr',
//                 gap: '6px 20px',
//                 fontSize: '13px',
//               }}
//             >
//               <div><strong>{t.col.id}:</strong> {selectedPatient.id}</div>
//               <div><strong>{t.col.firstName}:</strong> {selectedPatient.firstName}</div>
//               <div><strong>{t.col.middleName}:</strong> {selectedPatient.middleName || ''}</div>
//               <div><strong>{t.col.lastName}:</strong> {selectedPatient.lastName}</div>
//               <div><strong>{t.col.phone}:</strong> {selectedPatient.phone}</div>
//               <div><strong>{t.col.address}:</strong> {selectedPatient.address || ''}</div>
//               <div><strong>{t.col.gender}:</strong> {selectedPatient.gender || ''}</div>
//               <div><strong>{t.col.dob}:</strong> {selectedPatient.dateOfBirth || ''}</div>
//               <div>
//                 <strong>{t.col.age}:</strong>{' '}
//                 {selectedPatient.dateOfBirth
//                   ? Math.floor((new Date() - new Date(selectedPatient.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
//                   : ''}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Table / Card container */}
//       <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 400 }}>
//         {loading ? (
//           <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
//         ) : filteredByType.length === 0 ? (
//           <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.status.noPatients}</div>
//         ) : viewMode === 'table' ? (
//           <TableView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
//         ) : (
//           <CardView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 15 }}>
//           <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)}>{'<'}</button>
//           <span>{`${t.label.showing} ${currentPage + 1} / ${totalPages}`}</span>
//           <button disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)}>{'>'}</button>
//         </div>
//       )}

//       {/* ---------- MODALS ---------- */}
//       {showAppointmentsAdmin && (
//         <AppointmentsAdminScreen
//           refreshCallback={() => {}}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowAppointmentsAdmin(false)}
//         />
//       )}
//       {showWalkIn && selectedPatient && (
//         <WalkInScreen
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowWalkIn(false)}
//         />
//       )}
//       {showUpdatePatient && selectedPatient && (
//         <UpdatePatientModal
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowUpdatePatient(false)}
//           onPatientUpdated={() => {
//             if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
//           }}
//         />
//       )}
//       {showUpgradePatient && selectedPatient && (
//         <UpgradePatientModal
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowUpgradePatient(false)}
//           onPatientUpgraded={() => {
//             if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
//           }}
//         />
//       )}
//       {showAppointments && selectedPatient && (
//         <AppointmentModal
//           patientId={selectedPatient.id}
//           loggedUser={loggedUser}
//           lang={lang}
//           onClose={() => setShowAppointments(false)}
//         />
//       )}
//       {showAvailability && (
//         <AvailabilityModal
//           patientId={showAvailability}
//           doctors={doctors}
//           rooms={rooms}
//           translations={t}
//           onClose={() => setShowAvailability(false)}
//           onCheck={checkAvailability}
//           data={availabilityData}
//           lang={lang}
//         />
//       )}
//       {showVisits && (
//         <VisitsModal visits={visitData} translations={t} onClose={() => setShowVisits(false)} isRTL={isRTL} />
//       )}
//       {showAddPatient && (
//         <AddPatientModal
//           translations={t}
//           lang={lang}
//           onClose={() => setShowAddPatient(false)}
//           onPatientAdded={handlePatientAdded}
//         />
//       )}
//     </div>
//   );
// };

// // ---------- Sub-components ----------
// const StatCard = ({ icon, label, value, color }) => (
//   <div style={{
//     background: 'white', borderRadius: 12, padding: '15px 20px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
//     flex: 1, minWidth: 150, transition: 'transform 0.2s',
//   }}>
//     <span style={{ fontSize: 24 }}>{icon}</span>
//     <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
//     <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
//   </div>
// );

// const TableView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => {
//   const columns = isRTL
//     ? ['visits', 'age', 'dob', 'gender', 'address', 'phone', 'patientType', 'lastName', 'middleName', 'firstName', 'id']
//     : ['id', 'firstName', 'middleName', 'lastName', 'patientType', 'phone', 'address', 'gender', 'dob', 'age', 'visits'];

//   return (
//     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//       <thead>
//         <tr>
//           {columns.map(col => (
//             <th key={col} style={{ padding: 10, background: '#f8f9fa', textAlign: 'left' }}>
//               {t.col[col] || col}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {patients.map(p => (
//           <tr key={p.id} onClick={() => onSelect(p)} style={{
//             background: selected?.id === p.id ? '#ebf8ff' : 'white',
//             cursor: 'pointer', borderBottom: '1px solid #eee',
//           }}>
//             {columns.map(col => {
//               switch (col) {
//                 case 'id': return <td key={col}>{p.id}</td>;
//                 case 'firstName': return <td key={col}>{p.firstName}</td>;
//                 case 'middleName': return <td key={col}>{p.middleName || ''}</td>;
//                 case 'lastName': return <td key={col}>{p.lastName}</td>;
//                 case 'patientType':
//                   return (
//                     <td key={col} style={{ color: p.tempPatient ? '#ed8936' : '#48bb78', fontWeight: 'bold' }}>
//                       {p.tempPatient ? t.patient.temp : t.patient.permanent}
//                     </td>
//                   );
//                 case 'phone': return <td key={col}>{p.phone}</td>;
//                 case 'address': return <td key={col}>{p.address || ''}</td>;
//                 case 'gender': return <td key={col}>{p.gender || ''}</td>;
//                 case 'dob': return <td key={col}>{p.dateOfBirth || ''}</td>;
//                 case 'age': {
//                   const age = p.dateOfBirth
//                     ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
//                     : '';
//                   return <td key={col}>{age}</td>;
//                 }
//                 case 'visits':
//                   return (
//                     <td key={col}>
//                       <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={miniBtn}>
//                         📋 {t.btn.viewVisits}
//                       </button>
//                     </td>
//                   );
//                 default: return <td key={col}></td>;
//               }
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const CardView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => (
//   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
//     {patients.map(p => (
//       <div key={p.id} onClick={() => onSelect(p)} style={{
//         background: selected?.id === p.id ? '#ebf8ff' : 'white',
//         borderRadius: 12, padding: 15,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//         border: selected?.id === p.id ? '2px solid #4299e1' : '1px solid #edf2f7',
//         cursor: 'pointer', direction: isRTL ? 'rtl' : 'ltr',
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
//           <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>#{p.id}</span>
//           <span style={{ fontWeight: 'bold' }}>{p.firstName} {p.lastName}</span>
//           <span style={{
//             background: p.tempPatient ? '#ed8936' : '#48bb78',
//             color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 11
//           }}>
//             {p.tempPatient ? t.patient.temp : t.patient.permanent}
//           </span>
//         </div>
//         <div style={{ fontSize: 13, color: '#4a5568' }}>
//           📱 {p.phone} &nbsp; ⚤ {p.gender || 'N/A'} &nbsp;
//           🎂 {p.dateOfBirth && `${p.dateOfBirth} (${Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} ${t.label.years})`}
//         </div>
//         <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={{ marginTop: 8, ...miniBtn }}>
//           📋 {t.btn.viewVisits}
//         </button>
//       </div>
//     ))}
//   </div>
// );

// // ===================== AVAILABILITY MODAL =====================
// const AvailabilityModal = ({ patientId, doctors, rooms, translations: t, onClose, onCheck, data, lang }) => {
//   const [doctor, setDoctor] = useState('');
//   const [room, setRoom] = useState('');
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [loading, setLoading] = useState(false);

//   const handleCheck = async () => {
//     if (!doctor && !room) return alert(t.alert.selectDoctorOrRoom);
//     setLoading(true);
//     await onCheck(doctor, room, date);
//     setLoading(false);
//   };

//   return (
//     <div style={modalOverlay}>
//       <div style={{ ...modalContent, width: '500px', maxWidth: '90%', minWidth: 'auto' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
//           <h3 style={{ margin: 0 }}>🔔 {t.title.availability} - Patient #{patientId}</h3>
//           <button
//             onClick={onClose}
//             style={{
//               background: 'transparent',
//               border: 'none',
//               fontSize: 24,
//               cursor: 'pointer',
//               color: '#a0aec0',
//               padding: '0 8px',
//             }}
//           >
//             ✕
//           </button>
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '15px 0' }}>
//           <select value={doctor} onChange={e => setDoctor(e.target.value)} style={inputStyle}>
//             <option value="">{t.label.selectDoctor}</option>
//             {doctors.map(d => <option key={d.id} value={d.id}>{d.firstName} {d.lastName}</option>)}
//           </select>
//           <select value={room} onChange={e => setRoom(e.target.value)} style={inputStyle}>
//             <option value="">{t.label.selectRoom}</option>
//             {rooms.map(r => <option key={r.id} value={r.id}>{r.roomNumber}</option>)}
//           </select>
//           <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
//           <button onClick={handleCheck} style={primaryBtn('#48bb78')} disabled={loading}>
//             {loading ? '⏳' : t.btn.checkAvailability}
//           </button>
//         </div>

//         {data && data.length > 0 && (
//           <div>
//             <h4>{t.label.availableSlots}</h4>
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               {data.map((slot, idx) => (
//                 <li key={idx} style={{
//                   padding: '8px 12px',
//                   borderRadius: 8,
//                   marginBottom: 5,
//                   background: slot.available ? '#d4edda' : '#f8d7da',
//                 }}>
//                   {slot.start} - {slot.end} : {slot.available ? t.label.available : t.label.notAvailable}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {data && data.length === 0 && (
//           <div style={{ textAlign: 'center', padding: 20, color: '#718096' }}>
//             {t.label.noSlots || 'No available slots'}
//           </div>
//         )}

//         <div style={{ marginTop: 15, display: 'flex', justifyContent: 'flex-end' }}>
//           <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const VisitsModal = ({ visits, translations: t, onClose, isRTL }) => (
//   <div style={modalOverlay}>
//     <div style={modalContent}>
//       <h3>📋 {t.title.patientVisits}</h3>
//       {visits && visits.length > 0 ? (
//         <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
//           <thead>
//             <tr>
//               <th>{t.col.visitId}</th>
//               <th>{t.col.doctor}</th>
//               <th>{t.col.visitType}</th>
//               <th>{t.col.status}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {visits.map(v => (
//               <tr key={v.id}>
//                 <td>{v.id}</td>
//                 <td>{v.doctor?.fullName || v.doctorName || 'Unknown'}</td>
//                 <td>{v.visitType || 'Walk‑in'}</td>
//                 <td>{v.visitStatus || v.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>{t.status.noData}</p>
//       )}
//       <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
//     </div>
//   </div>
// );

// // ---------- Style utilities ----------
// const primaryBtn = (bg) => ({
//   background: bg, color: 'white', fontWeight: 'bold', border: 'none',
//   borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
// });

// const secondaryBtn = {
//   background: '#e2e8f0', border: 'none', padding: '8px 16px',
//   borderRadius: 8, cursor: 'pointer',
// };

// const iconBtn = {
//   background: 'transparent', border: '1px solid #ccc', borderRadius: 8,
//   padding: '8px 12px', cursor: 'pointer', fontSize: 16,
// };

// const toggleBtn = {
//   background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 8,
//   padding: '8px 12px', cursor: 'pointer',
// };

// const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };

// const miniBtn = {
//   background: '#4299e1', color: 'white', border: 'none', borderRadius: 6,
//   padding: '4px 10px', cursor: 'pointer', fontSize: 12,
// };

// const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' };

// const modalOverlay = {
//   position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//   background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
//   alignItems: 'center', zIndex: 1000,
// };

// const modalContent = {
//   background: 'white', borderRadius: 12, padding: 20,
//   maxHeight: '80vh', overflowY: 'auto',
//   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// export default SearchPatientScreen;   01072026 11:00 am

/* eslint-disable no-loop-func */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../../utils/api';
import { searchPatientTranslations } from '../../i18n/searchPatientTranslations';
import AddPatientModal from '../AddPatientModal/AddPatientModal';
import UpdatePatientModal from './UpdatePatientModal';
import UpgradePatientModal from './UpgradePatientModal';
import AppointmentModal from './AppointmentModal';
import WalkInScreen from './WalkInScreen';
import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const API_PATIENT = `${BASE_URL}/api/patients`;
const API_DOCTORS = `${BASE_URL}/api/doctors`;
const API_LOG = `${BASE_URL}/api/logs/add`;
const API_AVAILABILITY = `${BASE_URL}/api/availability`;
const API_ROOMS = `${BASE_URL}/api/rooms`;

const ROWS_PER_PAGE = 10;

// ---------- Helper functions for PDF (outside component) ----------
const fetchDrugPrescriptions = async (visitId) => {
  try {
    const res = await fetch(`${BASE_URL}/api/visits/${visitId}/drug-prescriptions`);
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (err) {
    //console.error(`Failed to fetch prescriptions for visit ${visitId}:`, err);
    return [];
  }
};
// ---------- Fetch procedures for a visit ----------
// ---------- Fetch procedures for a visit ----------
const fetchProcedures = async (visitId) => {
  //console.log(`🔍 Fetching procedures for visit ID: ${visitId}`);
  try {
    // ✅ Remove /api/ from the path
    const url = `${BASE_URL}/visits/${visitId}/procedures`;
    //console.log(`📤 GET ${url}`);
    const res = await fetch(url);
    //console.log(`📡 Response status: ${res.status}`);
    if (!res.ok) return [];
    const data = await res.json();
    //console.log(`✅ Procedures for visit ${visitId}:`, data);
    return data || [];
  } catch (err) {
    //console.error(`Failed to fetch procedures for visit ${visitId}:`, err);
    return [];
  }
};
const addDrugTable = (doc, headers, rows, startY) => {
  let newY = startY;
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: newY,
    theme: 'striped',
    styles: { fontSize: 7 },
    headStyles: { fillColor: [180, 180, 180], textColor: [0, 0, 0], fontSize: 7 },
    margin: { left: 20, right: 10 },
    didDrawPage: function(data) {
      newY = data.cursor.y + 5;
    },
  });
  return newY;
};

const addMainTable = (doc, headers, rows, startY) => {
  let newY = startY;
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: newY,
    theme: 'striped',
    styles: { fontSize: 8 },
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontSize: 8 },
    margin: { left: 10, right: 10 },
    didDrawPage: function(data) {
      newY = data.cursor.y;
    },
  });
  return newY;
};

// ---------- Main Component ----------
const SearchPatientScreen = ({ loggedUser, lang = 'en', onClose }) => {
  const t = searchPatientTranslations[lang] || searchPatientTranslations.en;
  const isRTL = lang === 'ar';

  // ---------- State ----------
  const [searchBy, setSearchBy] = useState('name');
  const [searchText, setSearchText] = useState('');
  const [allPatients, setAllPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [viewMode, setViewMode] = useState('table');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
  const [stats, setStats] = useState({ total: 0, temp: 0, permanent: 0 });
  const [lastSearch, setLastSearch] = useState(null);
  const autoRefreshRef = useRef(null);
  const [showAvailability, setShowAvailability] = useState(false);
  const [availabilityData, setAvailabilityData] = useState(null);
  const [showVisits, setShowVisits] = useState(false);
  const [visitData, setVisitData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [patientTypeFilter, setPatientTypeFilter] = useState('ALL');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showUpdatePatient, setShowUpdatePatient] = useState(false);
  const [showUpgradePatient, setShowUpgradePatient] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showWalkIn, setShowWalkIn] = useState(false);
  const [showAppointmentsAdmin, setShowAppointmentsAdmin] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // ---------- Helper functions ----------
  const updateStats = (patients) => {
    const total = patients.length;
    const temp = patients.filter(p => p.tempPatient).length;
    setStats({ total, temp, permanent: total - temp });
  };

  // ---------- Log action ----------
  const logAction = useCallback(async (action, details) => {
    try {
      await fetch(API_LOG, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedUser, action, details }),
      });
    } catch (e) { /* ignore */ }
  }, [loggedUser]);

  // ---------- Fetch patients ----------
  const fetchPatients = useCallback(async (searchType, searchValue) => {
    if (!searchValue || searchValue.trim().length < 3) {
      setStatusMsg(`⚠️ ${t.alert.minChars}`);
      return;
    }
    setLoading(true);
    setStatusMsg(t.status.loading);
    try {
      const endpoint = searchType === 'mobile'
        ? `${API_PATIENT}/search/mobile/${encodeURIComponent(searchValue)}`
        : `${API_PATIENT}/search/name/${encodeURIComponent(searchValue)}`;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const normalized = data.map(p => ({
        ...p,
        tempPatient: p.patientType === 'TEMP',
      }));

      setAllPatients(normalized);
      updateStats(normalized);
      setCurrentPage(0);
      setStatusMsg(`✅ ${t.status.found} ${normalized.length} ${t.label.patients}`);
      setLastSearch({ type: searchType, value: searchValue });
      logAction('SEARCH_PATIENT', `Searched by ${searchType} = ${searchValue}`);
    } catch (err) {
      setStatusMsg(`❌ ${t.alert.errorFetch}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [t, logAction]);

  // Auto‑refresh
  useEffect(() => {
    if (lastSearch) {
      autoRefreshRef.current = setInterval(() => {
        fetchPatients(lastSearch.type, lastSearch.value);
      }, 30000);
    }
    return () => {
      if (autoRefreshRef.current) clearInterval(autoRefreshRef.current);
    };
  }, [lastSearch, fetchPatients]);

  // ---------- Handlers ----------
  const handleSearch = () => fetchPatients(searchBy, searchText.trim());

  const exportCSV = () => {
    if (allPatients.length === 0) {
      setStatusMsg(`⚠️ ${t.alert.noDataToExport}`);
      return;
    }
    const headers = ['ID', 'First Name', 'Middle Name', 'Last Name', 'Phone', 'Type', 'Gender', 'DOB', 'Age'];
    const csvContent = [
      headers.join(','),
      ...allPatients.map(p => {
        const age = p.dateOfBirth
          ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
          : '';
        return `${p.id},${p.firstName},${p.middleName || ''},${p.lastName},${p.phone},${p.tempPatient ? 'TEMP' : 'PERMANENT'},${p.gender || ''},${p.dateOfBirth || ''},${age}`;
      })
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patients_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg(`📥 ${t.status.exported}`);
  };

  const openAvailability = (patientId) => {
    setShowAvailability(patientId);
    fetch(API_DOCTORS).then(res => res.json()).then(setDoctors);
    fetch(API_ROOMS).then(res => res.json()).then(setRooms);
  };

  const checkAvailability = async (doctorId, roomId, date) => {
    try {
      let url = `${API_AVAILABILITY}?date=${date}`;
      if (doctorId) url += `&doctorId=${doctorId}`;
      if (roomId) url += `&roomId=${roomId}`;
      const res = await fetch(url);
      const slots = await res.json();
      setAvailabilityData(slots);
    } catch (err) {
      alert(t.alert.errorFetch);
    }
  };

  const showPatientVisits = async (patientId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/visits/patient/${patientId}`);
      if (!res.ok) throw new Error('Failed');
      const visits = await res.json();
      setVisitData(visits);
      setShowVisits(true);
    } catch (err) {
      alert(t.alert.errorFetch);
    }
  };

  // ---------- Get Clinic Name ----------
  const getClinicName = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/clinic/1/info`);
      if (!res.ok) throw new Error('Failed to fetch clinic info');
      const data = await res.json();
      return data.clinicName || 'Clinic';
    } catch (err) {
      //console.error('Failed to fetch clinic name', err);
      return 'Clinic';
    }
  };

  // ---------- Generate PDF Report ----------
  const generatePDFReport = async (visits, patient, clinicName) => {
    try {
      const doc = new jsPDF();

      const pdfTranslations = {
        reportTitle: 'Patient Visit Report',
        patient: 'Patient',
        date: 'Date',
        visitId: 'Visit ID',
        doctor: 'Doctor',
        visitType: 'Visit Type',
        status: 'Status',
        checkIn: 'Check‑in',
        consultStart: 'Consult Start',
        consultEnd: 'Consult End',
        dischargeStatus: 'Discharge Status',
        drugs: 'Drug Prescriptions',
        drugName: 'Drug Name',
        strength: 'Strength',
        dosageUnit: 'Dosage Form',
        frequency: 'Frequency',
        duration: 'Duration (Days)',
        dose: 'Dose',
        instructions: 'Instructions',
        procedures: 'Procedures',
        procedureName: 'Procedure',
      };

      const tr = (key) => pdfTranslations[key] || key;

      const imgData = new Image();
      imgData.src = '/report-pic.png';

      return new Promise((resolve, reject) => {
        imgData.onload = async function() {
          try {
            const imgWidth = 40;
            const imgHeight = (imgData.height / imgData.width) * imgWidth;
            const xPosition = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
            
            doc.addImage(imgData, 'PNG', xPosition, 8, imgWidth, imgHeight);
            
            const startY = 8 + imgHeight + 8;

            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(clinicName, 105, startY + 10, { align: 'center' });

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(tr('reportTitle'), 105, startY + 20, { align: 'center' });
            doc.text(`${tr('patient')}: ${patient.firstName} ${patient.lastName}`, 105, startY + 28, { align: 'center' });
            doc.text(`${tr('date')}: ${new Date().toLocaleDateString('en-US')}`, 105, startY + 36, { align: 'center' });

            const tableHeaders = [
              tr('visitId'),
              tr('doctor'),
              tr('visitType'),
              tr('status'),
              tr('checkIn'),
              tr('consultStart'),
              tr('consultEnd'),
              tr('dischargeStatus'),
            ];

            const tableRows = visits.map(v => [
              v.id || '',
              v.doctor?.fullName || v.doctorName || 'Unknown',
              v.visitType || 'N/A',
              v.visitStatus || v.status || 'N/A',
              v.checkInTime || 'N/A',
              v.consultationStart || 'N/A',
              v.consultationEnd || 'N/A',
              v.dischargeStatus || 'N/A',
            ]);

            let currentY = addMainTable(doc, tableHeaders, tableRows, startY + 45);

            const fetchPromises = visits.map(async (visit) => {
              const [prescriptions, procedures] = await Promise.all([
                fetchDrugPrescriptions(visit.id),
                fetchProcedures(visit.id)
              ]);
              return { visit, prescriptions, procedures };
            });

            const visitDetails = await Promise.all(fetchPromises);

            for (const item of visitDetails) {
              const { visit, prescriptions, procedures } = item;
              
              const hasDrugs = prescriptions && prescriptions.length > 0;
              const hasProcedures = procedures && procedures.length > 0;
              
              if (!hasDrugs && !hasProcedures) continue;

              if (currentY > 250) {
                doc.addPage();
                currentY = 20;
              }

              currentY += 8;
              doc.setFontSize(11);
              doc.setFont('helvetica', 'bold');
              doc.text(`Visit #${visit.id}`, 14, currentY);
              currentY += 6;

              if (hasDrugs) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(tr('drugs'), 20, currentY);
                currentY += 5;

                const drugHeaders = [
                  tr('drugName'),
                  tr('strength'),
                  tr('dosageUnit'),
                  tr('frequency'),
                  tr('duration'),
                  tr('dose'),
                  tr('instructions'),
                ];

                const drugRows = prescriptions.map(p => [
                  p.tradeName || p.drugName || 'N/A',
                  p.strength || 'N/A',
                  p.dosageUnit || 'N/A',
                  p.frequency || 'N/A',
                  p.duration ? `${p.duration} ${p.durationType === '2' ? 'days' : ''}`.trim() : 'N/A',
                  p.dose || 'N/A',
                  p.instructions || '',
                ]);

                currentY = addDrugTable(doc, drugHeaders, drugRows, currentY);
                currentY += 5;
              }

              if (hasProcedures) {
                if (currentY > 250) {
                  doc.addPage();
                  currentY = 20;
                }

                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(tr('procedures'), 20, currentY);
                currentY += 5;

                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                
                for (let i = 0; i < procedures.length; i++) {
                  const proc = procedures[i];
                  if (currentY > 270) {
                    doc.addPage();
                    currentY = 20;
                  }
                  doc.text(`• ${proc}`, 25, currentY);
                  currentY += 6;
                }
                
                currentY += 5;
              }
            }

            doc.save(`PatientHistory_${patient.id}.pdf`);
            setStatusMsg(`📥 ${t.status.exported}`);
            alert(t.alert.pdfSaved || 'PDF saved successfully');
            resolve();
          } catch (err) {
            //console.error('PDF generation error:', err);
            alert(`PDF generation failed: ${err.message}`);
            setStatusMsg(`❌ ${t.status.error}`);
            reject(err);
          }
        };

        imgData.onerror = async function() {
          //console.warn('Image not found, generating report without header image');
          
          try {
            const startY = 20;

            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text(clinicName, 105, startY, { align: 'center' });

            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(tr('reportTitle'), 105, startY + 10, { align: 'center' });
            doc.text(`${tr('patient')}: ${patient.firstName} ${patient.lastName}`, 105, startY + 18, { align: 'center' });
            doc.text(`${tr('date')}: ${new Date().toLocaleDateString('en-US')}`, 105, startY + 26, { align: 'center' });

            const tableHeaders = [
              tr('visitId'),
              tr('doctor'),
              tr('visitType'),
              tr('status'),
              tr('checkIn'),
              tr('consultStart'),
              tr('consultEnd'),
              tr('dischargeStatus'),
            ];

            const tableRows = visits.map(v => [
              v.id || '',
              v.doctor?.fullName || v.doctorName || 'Unknown',
              v.visitType || 'N/A',
              v.visitStatus || v.status || 'N/A',
              v.checkInTime || 'N/A',
              v.consultationStart || 'N/A',
              v.consultationEnd || 'N/A',
              v.dischargeStatus || 'N/A',
            ]);

            let currentY = addMainTable(doc, tableHeaders, tableRows, startY + 35);

            const fetchPromises = visits.map(async (visit) => {
              const [prescriptions, procedures] = await Promise.all([
                fetchDrugPrescriptions(visit.id),
                fetchProcedures(visit.id)
              ]);
              return { visit, prescriptions, procedures };
            });

            const visitDetails = await Promise.all(fetchPromises);

            for (const item of visitDetails) {
              const { visit, prescriptions, procedures } = item;
              
              const hasDrugs = prescriptions && prescriptions.length > 0;
              const hasProcedures = procedures && procedures.length > 0;
              
              if (!hasDrugs && !hasProcedures) continue;

              if (currentY > 250) {
                doc.addPage();
                currentY = 20;
              }

              currentY += 8;
              doc.setFontSize(11);
              doc.setFont('helvetica', 'bold');
              doc.text(`Visit #${visit.id}`, 14, currentY);
              currentY += 6;

              if (hasDrugs) {
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(tr('drugs'), 20, currentY);
                currentY += 5;

                const drugHeaders = [
                  tr('drugName'),
                  tr('strength'),
                  tr('dosageUnit'),
                  tr('frequency'),
                  tr('duration'),
                  tr('dose'),
                  tr('instructions'),
                ];

                const drugRows = prescriptions.map(p => [
                  p.tradeName || p.drugName || 'N/A',
                  p.strength || 'N/A',
                  p.dosageUnit || 'N/A',
                  p.frequency || 'N/A',
                  p.duration ? `${p.duration} ${p.durationType === '2' ? 'days' : ''}`.trim() : 'N/A',
                  p.dose || 'N/A',
                  p.instructions || '',
                ]);

                currentY = addDrugTable(doc, drugHeaders, drugRows, currentY);
                currentY += 5;
              }

              if (hasProcedures) {
                if (currentY > 250) {
                  doc.addPage();
                  currentY = 20;
                }

                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text(tr('procedures'), 20, currentY);
                currentY += 5;

                doc.setFontSize(8);
                doc.setFont('helvetica', 'normal');
                
                for (let i = 0; i < procedures.length; i++) {
                  const proc = procedures[i];
                  if (currentY > 270) {
                    doc.addPage();
                    currentY = 20;
                  }
                  doc.text(`• ${proc}`, 25, currentY);
                  currentY += 6;
                }
                
                currentY += 5;
              }
            }

            doc.save(`PatientHistory_${patient.id}.pdf`);
            setStatusMsg(`📥 ${t.status.exported}`);
            alert(t.alert.pdfSaved || 'PDF saved successfully');
            resolve();
          } catch (err) {
            //console.error('PDF generation error (fallback):', err);
            alert(`PDF generation failed: ${err.message}`);
            setStatusMsg(`❌ ${t.status.error}`);
            reject(err);
          }
        };
      });
    } catch (err) {
      //console.error('PDF generation error:', err);
      alert(`PDF generation failed: ${err.message}`);
      setStatusMsg(`❌ ${t.status.error}`);
    }
  };

  const handlePrintReport = async (patient) => {
    if (!patient) return;
    try {
      const res = await fetch(`${BASE_URL}/api/visits/patient/${patient.id}`);
      if (!res.ok) throw new Error('Failed to fetch visits');
      const visits = await res.json();
      //console.log('Visits for report:', visits);
      const clinicName = await getClinicName();
      
      await generatePDFReport(visits, patient, clinicName);
      
      logAction('PRINT_REPORT', `Printed report for patient ${patient.id}`);
    } catch (err) {
      //console.error('Error fetching visits or generating PDF:', err);
      alert(`${t.alert.pdfFailed || 'PDF generation failed'}: ${err.message}`);
      setStatusMsg(`❌ ${t.status.error}`);
    }
  };

  // ---------- Callback when a new patient is added ----------
  const handlePatientAdded = useCallback((newPatient) => {
    if (lastSearch) {
      fetchPatients(lastSearch.type, lastSearch.value);
    } else {
      const updated = [{ ...newPatient, tempPatient: newPatient.patientType === 'TEMP' }, ...allPatients];
      setAllPatients(updated);
      updateStats(updated);
    }
    setStatusMsg(`✅ ${t.status.patientAdded}: ${newPatient.firstName} ${newPatient.lastName}`);
  }, [lastSearch, fetchPatients, allPatients, t]);

  // ---------- Filter and pagination ----------
  const filteredByType = allPatients.filter(p => {
    if (patientTypeFilter === 'ALL') return true;
    return patientTypeFilter === 'TEMP' ? p.tempPatient : !p.tempPatient;
  });

  const paginatedPatients = filteredByType.slice(
    currentPage * ROWS_PER_PAGE,
    (currentPage + 1) * ROWS_PER_PAGE
  );

  useEffect(() => {
    setTotalPages(Math.ceil(filteredByType.length / ROWS_PER_PAGE));
    if (currentPage >= Math.ceil(filteredByType.length / ROWS_PER_PAGE) && filteredByType.length > 0) {
      setCurrentPage(0);
    }
  }, [filteredByType, currentPage]);

  // ---------- Render ----------
  return (
    <div
      style={{
        padding: 20,
        fontFamily: "'Noto Sans Arabic', Tahoma, 'Segoe UI', sans-serif",
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2>🔍 {t.title.searchPatients}</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setShowAppointmentsAdmin(true)} style={primaryBtn('#4299e1')}>
            📅 {t.btn?.manageAppointments || 'Manage All Appointments'}
          </button>
          <button onClick={() => setShowAddPatient(true)} style={primaryBtn('#48bb78')}>
            ➕ {t.btn.addNewPatient}
          </button>
          <button onClick={onClose} style={{ ...secondaryBtn, marginLeft: 10 }}>
            ✕ {t.btn.close}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
        <StatCard icon="👥" label={t.stat.totalPatients} value={stats.total} color="#4299e1" />
        <StatCard icon="🔄" label={t.stat.tempPatients} value={stats.temp} color="#ed8936" />
        <StatCard icon="✅" label={t.stat.permanentPatients} value={stats.permanent} color="#48bb78" />
      </div>

      {/* Search controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <select value={searchBy} onChange={e => setSearchBy(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
          <option value="name">{t.search.name}</option>
          <option value="mobile">{t.search.mobile}</option>
        </select>
        <input
          type="text"
          placeholder={searchBy === 'mobile' ? t.prompt.mobile : t.prompt.name}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, padding: '8px 15px', borderRadius: 25, border: '1px solid #ccc' }}
        />
        <button onClick={handleSearch} style={primaryBtn('#4299e1')} disabled={loading}>
          🔍 {t.btn.search}
        </button>
        <button onClick={() => lastSearch && fetchPatients(lastSearch.type, lastSearch.value)} style={iconBtn}>
          🔄
        </button>
        <button onClick={exportCSV} style={iconBtn}>
          📥
        </button>
        <select value={patientTypeFilter} onChange={e => setPatientTypeFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: 8 }}>
          <option value="ALL">{t.patient.temp} + {t.patient.permanent}</option>
          <option value="TEMP">{t.patient.temp}</option>
          <option value="PERMANENT">{t.patient.permanent}</option>
        </select>
        <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
          📋 {t.btn.table}
        </button>
        <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
          🃏 {t.btn.cards}
        </button>
      </div>

      <div style={{ marginBottom: 10, color: '#4a5568' }}>{statusMsg}</div>

      {/* ---- Patient Selection Bar (above table) ---- */}
      {selectedPatient && (
        <div style={{ marginBottom: 15, background: '#f7fafc', borderRadius: 8, border: '1px solid #e2e8f0', padding: '12px 15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontWeight: 'bold' }}>
                #{selectedPatient.id} – {selectedPatient.firstName} {selectedPatient.lastName}
              </span>
              <span
                style={{
                  fontSize: 12,
                  background: selectedPatient.tempPatient ? '#ed8936' : '#48bb78',
                  color: 'white',
                  borderRadius: 12,
                  padding: '2px 10px',
                }}
              >
                {selectedPatient.tempPatient ? t.patient.temp : t.patient.permanent}
              </span>
              <button
                onClick={() => setShowDetails(!showDetails)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 16,
                  color: '#4299e1',
                  fontWeight: 'bold',
                }}
              >
                {showDetails ? '▲' : '▼'}
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={() => setShowWalkIn(true)} style={primaryBtn('#4299e1')}>
                🚶 {t.btn.walkIn}
              </button>
              <button onClick={() => setShowAppointments(true)} style={primaryBtn('#4299e1')}>
                📅 {t.btn.appointments}
              </button>
              <button onClick={() => setShowUpdatePatient(true)} style={primaryBtn('#4299e1')}>
                ✏️ {t.btn.updatePatient}
              </button>
              {selectedPatient.tempPatient && (
                <button onClick={() => setShowUpgradePatient(true)} style={primaryBtn('#ed8936')}>
                  ⬆️ {t.btn.upgradePermanent}
                </button>
              )}
              <button onClick={() => handlePrintReport(selectedPatient)} style={primaryBtn('#48bb78')}>
                🖨️ {t.btn.printReport}
              </button>
              <button onClick={() => openAvailability(selectedPatient.id)} style={primaryBtn('#9f7aea')}>
                🔔 {t.btn.availability}
              </button>
            </div>
          </div>
          {showDetails && (
            <div
              style={{
                marginTop: 10,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '6px 20px',
                fontSize: '13px',
              }}
            >
              <div><strong>{t.col.id}:</strong> {selectedPatient.id}</div>
              <div><strong>{t.col.firstName}:</strong> {selectedPatient.firstName}</div>
              <div><strong>{t.col.middleName}:</strong> {selectedPatient.middleName || ''}</div>
              <div><strong>{t.col.lastName}:</strong> {selectedPatient.lastName}</div>
              <div><strong>{t.col.phone}:</strong> {selectedPatient.phone}</div>
              <div><strong>{t.col.address}:</strong> {selectedPatient.address || ''}</div>
              <div><strong>{t.col.gender}:</strong> {selectedPatient.gender || ''}</div>
              <div><strong>{t.col.dob}:</strong> {selectedPatient.dateOfBirth || ''}</div>
              <div>
                <strong>{t.col.age}:</strong>{' '}
                {selectedPatient.dateOfBirth
                  ? Math.floor((new Date() - new Date(selectedPatient.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
                  : ''}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Table / Card container */}
      <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 400 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
        ) : filteredByType.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.status.noPatients}</div>
        ) : viewMode === 'table' ? (
          <TableView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
        ) : (
          <CardView patients={paginatedPatients} selected={selectedPatient} onSelect={setSelectedPatient} onVisit={showPatientVisits} translations={t} isRTL={isRTL} />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 15 }}>
          <button disabled={currentPage === 0} onClick={() => setCurrentPage(p => p - 1)}>{'<'}</button>
          <span>{`${t.label.showing} ${currentPage + 1} / ${totalPages}`}</span>
          <button disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(p => p + 1)}>{'>'}</button>
        </div>
      )}

      {/* ---------- MODALS ---------- */}
      {showAppointmentsAdmin && (
        <AppointmentsAdminScreen
          refreshCallback={() => {}}
          loggedUser={loggedUser}
          lang={lang}
          onClose={() => setShowAppointmentsAdmin(false)}
        />
      )}
      {showWalkIn && selectedPatient && (
        <WalkInScreen
          patientId={selectedPatient.id}
          loggedUser={loggedUser}
          lang={lang}
          onClose={() => setShowWalkIn(false)}
        />
      )}
      {showUpdatePatient && selectedPatient && (
        <UpdatePatientModal
          patientId={selectedPatient.id}
          loggedUser={loggedUser}
          lang={lang}
          onClose={() => setShowUpdatePatient(false)}
          onPatientUpdated={() => {
            if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
          }}
        />
      )}
      {showUpgradePatient && selectedPatient && (
        <UpgradePatientModal
          patientId={selectedPatient.id}
          loggedUser={loggedUser}
          lang={lang}
          onClose={() => setShowUpgradePatient(false)}
          onPatientUpgraded={() => {
            if (lastSearch) fetchPatients(lastSearch.type, lastSearch.value);
          }}
        />
      )}
      {showAppointments && selectedPatient && (
        <AppointmentModal
          patientId={selectedPatient.id}
          loggedUser={loggedUser}
          lang={lang}
          onClose={() => setShowAppointments(false)}
        />
      )}
      {showAvailability && (
        <AvailabilityModal
          patientId={showAvailability}
          doctors={doctors}
          rooms={rooms}
          translations={t}
          onClose={() => setShowAvailability(false)}
          onCheck={checkAvailability}
          data={availabilityData}
          lang={lang}
        />
      )}
      {showVisits && (
        <VisitsModal visits={visitData} translations={t} onClose={() => setShowVisits(false)} isRTL={isRTL} />
      )}
      {showAddPatient && (
        <AddPatientModal
          translations={t}
          lang={lang}
          onClose={() => setShowAddPatient(false)}
          onPatientAdded={handlePatientAdded}
        />
      )}
    </div>
  );
};

// ---------- Sub-components ----------
const StatCard = ({ icon, label, value, color }) => (
  <div style={{
    background: 'white', borderRadius: 12, padding: '15px 20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
    flex: 1, minWidth: 150, transition: 'transform 0.2s',
  }}>
    <span style={{ fontSize: 24 }}>{icon}</span>
    <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
    <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
  </div>
);

const TableView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => {
  const columns = isRTL
    ? ['visits', 'age', 'dob', 'gender', 'address', 'phone', 'patientType', 'lastName', 'middleName', 'firstName', 'id']
    : ['id', 'firstName', 'middleName', 'lastName', 'patientType', 'phone', 'address', 'gender', 'dob', 'age', 'visits'];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col} style={{ padding: 10, background: '#f8f9fa', textAlign: 'left' }}>
              {t.col[col] || col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {patients.map(p => (
          <tr key={p.id} onClick={() => onSelect(p)} style={{
            background: selected?.id === p.id ? '#ebf8ff' : 'white',
            cursor: 'pointer', borderBottom: '1px solid #eee',
          }}>
            {columns.map(col => {
              switch (col) {
                case 'id': return <td key={col}>{p.id}</td>;
                case 'firstName': return <td key={col}>{p.firstName}</td>;
                case 'middleName': return <td key={col}>{p.middleName || ''}</td>;
                case 'lastName': return <td key={col}>{p.lastName}</td>;
                case 'patientType':
                  return (
                    <td key={col} style={{ color: p.tempPatient ? '#ed8936' : '#48bb78', fontWeight: 'bold' }}>
                      {p.tempPatient ? t.patient.temp : t.patient.permanent}
                    </td>
                  );
                case 'phone': return <td key={col}>{p.phone}</td>;
                case 'address': return <td key={col}>{p.address || ''}</td>;
                case 'gender': return <td key={col}>{p.gender || ''}</td>;
                case 'dob': return <td key={col}>{p.dateOfBirth || ''}</td>;
                case 'age': {
                  const age = p.dateOfBirth
                    ? Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
                    : '';
                  return <td key={col}>{age}</td>;
                }
                case 'visits':
                  return (
                    <td key={col}>
                      <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={miniBtn}>
                        📋 {t.btn.viewVisits}
                      </button>
                    </td>
                  );
                default: return <td key={col}></td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const CardView = ({ patients, selected, onSelect, onVisit, translations: t, isRTL }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
    {patients.map(p => (
      <div key={p.id} onClick={() => onSelect(p)} style={{
        background: selected?.id === p.id ? '#ebf8ff' : 'white',
        borderRadius: 12, padding: 15,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        border: selected?.id === p.id ? '2px solid #4299e1' : '1px solid #edf2f7',
        cursor: 'pointer', direction: isRTL ? 'rtl' : 'ltr',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>#{p.id}</span>
          <span style={{ fontWeight: 'bold' }}>{p.firstName} {p.lastName}</span>
          <span style={{
            background: p.tempPatient ? '#ed8936' : '#48bb78',
            color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 11
          }}>
            {p.tempPatient ? t.patient.temp : t.patient.permanent}
          </span>
        </div>
        <div style={{ fontSize: 13, color: '#4a5568' }}>
          📱 {p.phone} &nbsp; ⚤ {p.gender || 'N/A'} &nbsp;
          🎂 {p.dateOfBirth && `${p.dateOfBirth} (${Math.floor((new Date() - new Date(p.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))} ${t.label.years})`}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onVisit(p.id); }} style={{ marginTop: 8, ...miniBtn }}>
          📋 {t.btn.viewVisits}
        </button>
      </div>
    ))}
  </div>
);

// ===================== AVAILABILITY MODAL =====================
const AvailabilityModal = ({ patientId, doctors, rooms, translations: t, onClose, onCheck, data, lang }) => {
  const [doctor, setDoctor] = useState('');
  const [room, setRoom] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!doctor && !room) return alert(t.alert.selectDoctorOrRoom);
    setLoading(true);
    await onCheck(doctor, room, date);
    setLoading(false);
  };

  return (
    <div style={modalOverlay}>
      <div style={{ ...modalContent, width: '500px', maxWidth: '90%', minWidth: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <h3 style={{ margin: 0 }}>🔔 {t.title.availability} - Patient #{patientId}</h3>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
              color: '#a0aec0',
              padding: '0 8px',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '15px 0' }}>
          <select value={doctor} onChange={e => setDoctor(e.target.value)} style={inputStyle}>
            <option value="">{t.label.selectDoctor}</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.firstName} {d.lastName}</option>)}
          </select>
          <select value={room} onChange={e => setRoom(e.target.value)} style={inputStyle}>
            <option value="">{t.label.selectRoom}</option>
            {rooms.map(r => <option key={r.id} value={r.id}>{r.roomNumber}</option>)}
          </select>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
          <button onClick={handleCheck} style={primaryBtn('#48bb78')} disabled={loading}>
            {loading ? '⏳' : t.btn.checkAvailability}
          </button>
        </div>

        {data && data.length > 0 && (
          <div>
            <h4>{t.label.availableSlots}</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.map((slot, idx) => (
                <li key={idx} style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  marginBottom: 5,
                  background: slot.available ? '#d4edda' : '#f8d7da',
                }}>
                  {slot.start} - {slot.end} : {slot.available ? t.label.available : t.label.notAvailable}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data && data.length === 0 && (
          <div style={{ textAlign: 'center', padding: 20, color: '#718096' }}>
            {t.label.noSlots || 'No available slots'}
          </div>
        )}

        <div style={{ marginTop: 15, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
        </div>
      </div>
    </div>
  );
};

const VisitsModal = ({ visits, translations: t, onClose, isRTL }) => (
  <div style={modalOverlay}>
    <div style={modalContent}>
      <h3>📋 {t.title.patientVisits}</h3>
      {visits && visits.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 10 }}>
          <thead>
            <tr>
              <th>{t.col.visitId}</th>
              <th>{t.col.doctor}</th>
              <th>{t.col.visitType}</th>
              <th>{t.col.status}</th>
            </tr>
          </thead>
          <tbody>
            {visits.map(v => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.doctor?.fullName || v.doctorName || 'Unknown'}</td>
                <td>{v.visitType || 'Walk‑in'}</td>
                <td>{v.visitStatus || v.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{t.status.noData}</p>
      )}
      <button onClick={onClose} style={secondaryBtn}>{t.btn.cancel}</button>
    </div>
  </div>
);

// ---------- Style utilities ----------
const primaryBtn = (bg) => ({
  background: bg, color: 'white', fontWeight: 'bold', border: 'none',
  borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
});

const secondaryBtn = {
  background: '#e2e8f0', border: 'none', padding: '8px 16px',
  borderRadius: 8, cursor: 'pointer',
};

const iconBtn = {
  background: 'transparent', border: '1px solid #ccc', borderRadius: 8,
  padding: '8px 12px', cursor: 'pointer', fontSize: 16,
};

const toggleBtn = {
  background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 8,
  padding: '8px 12px', cursor: 'pointer',
};

const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };

const miniBtn = {
  background: '#4299e1', color: 'white', border: 'none', borderRadius: 6,
  padding: '4px 10px', cursor: 'pointer', fontSize: 12,
};

const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' };

const modalOverlay = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
  alignItems: 'center', zIndex: 1000,
};

const modalContent = {
  background: 'white', borderRadius: 12, padding: 20,
  maxHeight: '80vh', overflowY: 'auto',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

export default SearchPatientScreen;