// // import React, { useState, useEffect, useCallback } from 'react';
// // import { BASE_URL } from '../../utils/api';
// // import { walkInTranslations } from '../../i18n/walkInTranslations'; // ✅ new import

// // const API_VISITS = `${BASE_URL}/api/patient/visits/patient`;
// // const API_CREATE_VISIT = `${BASE_URL}/api/patient/visits/patient`;
// // const API_OPEN_VISIT = `${BASE_URL}/api/patient/visits`;
// // const API_CANCEL_VISIT = `${BASE_URL}/api/patient/visits`;
// // const API_SECTIONS = `${BASE_URL}/api/sections`;
// // const API_ROOMS_BY_SECTION = `${BASE_URL}/api/rooms/section`;
// // const API_DOCTORS = `${BASE_URL}/api/doctors`;

// // // ---------- Helper: date formatting ----------
// // const formatVisitTime = (dateStr) => {
// //   if (!dateStr) return '';
// //   const d = new Date(dateStr);
// //   return d.toLocaleString('en-GB', { hour12: false });
// // };

// // // ---------- WalkInScreen Component ----------
// // const WalkInScreen = ({ patientId, loggedUser, lang = 'en', onClose }) => {
// //   // Use translations based on lang
// //   const t = walkInTranslations[lang] || walkInTranslations.en;
// //   const isRTL = lang === 'ar';

// //   // ---------- State ----------
// //   const [visits, setVisits] = useState([]);
// //   const [viewMode, setViewMode] = useState('table');
// //   const [loading, setLoading] = useState(false);
// //   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
// //   const [stats, setStats] = useState({ total: 0, active: 0, cancelled: 0 });
// //   const [showAddDialog, setShowAddDialog] = useState(false);
// //   // For add dialog fields:
// //   const [sections, setSections] = useState([]);
// //   const [rooms, setRooms] = useState([]);
// //   const [doctors, setDoctors] = useState([]);
// //   const [selectedSection, setSelectedSection] = useState('');
// //   const [selectedRoom, setSelectedRoom] = useState('');
// //   const [selectedDoctor, setSelectedDoctor] = useState('');
// //   const [visitDate, setVisitDate] = useState('');
// //   const [visitHour, setVisitHour] = useState('12');
// //   const [visitMinute, setVisitMinute] = useState('00');
// //   const [notes, setNotes] = useState('');
// //   const [addLoading, setAddLoading] = useState(false);

// //   // ---------- Fetch visits ----------
// //   const fetchVisits = useCallback(async () => {
// //     if (!patientId) return;
// //     setLoading(true);
// //     setStatusMsg(`⏳ ${t.status.loading}`);
// //     try {
// //       const res = await fetch(`${API_VISITS}/${patientId}`);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //       const data = await res.json();
// //       setVisits(data);
// //       let total = data.length;
// //       let active = 0, cancelled = 0;
// //       data.forEach(v => {
// //         if (v.status === 'IN_PROGRESS') active++;
// //         else if (v.status === 'CANCELLED') cancelled++;
// //       });
// //       setStats({ total, active, cancelled });
// //       setStatusMsg(`✅ ${t.status.ready} (${total} ${t.stats.total})`);
// //     } catch (err) {
// //       setStatusMsg(`❌ ${t.status.error}: ${err.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [patientId, t]);

// //   // ---------- Fetch dropdown data ----------
// //   const fetchSections = useCallback(async () => {
// //     try {
// //       const res = await fetch(API_SECTIONS);
// //       if (!res.ok) throw new Error();
// //       const data = await res.json();
// //       setSections(data);
// //     } catch (e) {
// //       //console.error('Failed to load sections');
// //     }
// //   }, []);

// //   const fetchRoomsBySection = useCallback(async (sectionId) => {
// //     if (!sectionId) return;
// //     try {
// //       const res = await fetch(`${API_ROOMS_BY_SECTION}/${sectionId}`);
// //       if (!res.ok) throw new Error();
// //       const data = await res.json();
// //       setRooms(data);
// //     } catch (e) {
// //       //console.error('Failed to load rooms');
// //     }
// //   }, []);

// //   const fetchDoctors = useCallback(async () => {
// //     try {
// //       const res = await fetch(API_DOCTORS);
// //       if (!res.ok) throw new Error();
// //       const data = await res.json();
// //       setDoctors(data);
// //     } catch (e) {
// //       //console.error('Failed to load doctors');
// //     }
// //   }, []);

// //   // ---------- Load initial data ----------
// //   useEffect(() => {
// //     fetchVisits();
// //     fetchSections();
// //     fetchDoctors();
// //   }, [fetchVisits, fetchSections, fetchDoctors]);

// //   // ---------- Handlers ----------
// //   const handleAddVisit = async () => {
// //     if (!selectedRoom || !selectedDoctor || !visitDate) {
// //       alert(t.msg.completeFields);
// //       return;
// //     }
// //     const dateTime = new Date(`${visitDate}T${visitHour.padStart(2,'0')}:${visitMinute.padStart(2,'0')}:00`);
// //     if (dateTime < new Date()) {
// //       alert(t.msg.pastDateTime);
// //       return;
// //     }

// //     setAddLoading(true);
// //     try {
// //       const url = `${API_CREATE_VISIT}/${patientId}/room/${selectedRoom}/doctor/${selectedDoctor}`;
// //       const res = await fetch(url, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           visitTime: dateTime.toISOString(),
// //           notes: notes.trim(),
// //         }),
// //       });
// //       if (!res.ok) {
// //         const err = await res.text();
// //         throw new Error(err || 'Failed to add visit');
// //       }
// //       setStatusMsg(`✅ ${t.status.added}`);
// //       setShowAddDialog(false);
// //       fetchVisits();
// //       // Reset form
// //       setSelectedSection('');
// //       setSelectedRoom('');
// //       setSelectedDoctor('');
// //       setVisitDate('');
// //       setVisitHour('12');
// //       setVisitMinute('00');
// //       setNotes('');
// //     } catch (err) {
// //       alert(`${t.status.error}: ${err.message}`);
// //     } finally {
// //       setAddLoading(false);
// //     }
// //   };

// //   const handleOpenVisit = async (visitId) => {
// //     try {
// //       const res = await fetch(`${API_OPEN_VISIT}/${visitId}/create-visit`, {
// //         method: 'POST',
// //       });
// //       if (!res.ok) throw new Error('Failed to open visit');
// //       fetchVisits();
// //       setStatusMsg(`✅ Visit #${visitId} opened`);
// //     } catch (err) {
// //       alert(`${t.status.error}: ${err.message}`);
// //     }
// //   };

// //   const handleCancelVisit = async (visitId) => {
// //     const reason = window.prompt(t.dialog.reason);
// //     if (reason === null) return;
// //     if (reason.trim() === '') {
// //       alert(t.msg.cancelRequired);
// //       return;
// //     }
// //     try {
// //       const url = `${API_CANCEL_VISIT}/${visitId}/cancel?username=${encodeURIComponent(loggedUser)}&reason=${encodeURIComponent(reason)}`;
// //       const res = await fetch(url, { method: 'PUT' });
// //       if (!res.ok) throw new Error('Failed to cancel visit');
// //       fetchVisits();
// //       setStatusMsg(`✅ Visit #${visitId} cancelled`);
// //     } catch (err) {
// //       alert(`${t.status.error}: ${err.message}`);
// //     }
// //   };

// //   // ---------- Render ----------
// //   return (
// //     <div style={modalOverlay} dir={isRTL ? 'rtl' : 'ltr'}>
// //       <div style={modalContent}>
// //         {/* Header */}
// //         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
// //           <h2>🚶 {t.title}</h2>
// //           <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.close}</button>
// //         </div>

// //         {/* Stats cards */}
// //         <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
// //           <StatCard icon="📊" label={t.stats.total} value={stats.total} color="#4299e1" />
// //           <StatCard icon="✅" label={t.stats.active} value={stats.active} color="#48bb78" />
// //           <StatCard icon="❌" label={t.stats.cancelled} value={stats.cancelled} color="#fc8181" />
// //         </div>

// //         {/* View toggle */}
// //         <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
// //           <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
// //             📋 {t.btn.table}
// //           </button>
// //           <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
// //             🃏 {t.btn.cards}
// //           </button>
// //           <span style={{ marginLeft: 'auto', color: '#4a5568' }}>{statusMsg}</span>
// //         </div>

// //         {/* Content */}
// //         <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 300 }}>
// //           {loading ? (
// //             <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
// //           ) : visits.length === 0 ? (
// //             <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.label.noVisits}</div>
// //           ) : viewMode === 'table' ? (
// //             <WalkInTable
// //               visits={visits}
// //               onOpen={handleOpenVisit}
// //               onCancel={handleCancelVisit}
// //               t={t}
// //               isRTL={isRTL}
// //             />
// //           ) : (
// //             <WalkInCards
// //               visits={visits}
// //               onOpen={handleOpenVisit}
// //               onCancel={handleCancelVisit}
// //               t={t}
// //               isRTL={isRTL}
// //             />
// //           )}
// //         </div>

// //         {/* Floating Add Button */}
// //         <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1100 }}>
// //           <button
// //             onClick={() => setShowAddDialog(true)}
// //             style={{
// //               ...primaryBtn('#48bb78'),
// //               borderRadius: '50%',
// //               width: 60,
// //               height: 60,
// //               fontSize: 32,
// //               boxShadow: '0 4px 12px rgba(72,187,120,0.5)',
// //             }}
// //           >
// //             +
// //           </button>
// //         </div>

// //         {/* Add Visit Dialog (modal) */}
// //         {showAddDialog && (
// //           <div style={modalOverlay}>
// //             <div style={{ ...modalContent, minWidth: 400, maxWidth: 500 }}>
// //               <h3>🚶 {t.dialog.addVisit}</h3>
// //               <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
// //                 <select value={selectedSection} onChange={e => {
// //                   const val = e.target.value;
// //                   setSelectedSection(val);
// //                   fetchRoomsBySection(val);
// //                   setSelectedRoom('');
// //                 }} style={inputStyle}>
// //                   <option value="">{t.prompt.section}</option>
// //                   {sections.map(s => (
// //                     <option key={s.id} value={s.id}>{s.name}</option>
// //                   ))}
// //                 </select>
// //                 <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} style={inputStyle}>
// //                   <option value="">{t.prompt.room}</option>
// //                   {rooms.map(r => (
// //                     <option key={r.id} value={r.id}>{r.roomNumber} - {r.section?.name || ''}</option>
// //                   ))}
// //                 </select>
// //                 <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} style={inputStyle}>
// //                   <option value="">{t.prompt.doctor}</option>
// //                   {doctors.map(d => (
// //                     <option key={d.id} value={d.id}>
// //                       {d.firstName} {d.middleName} {d.lastName}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <input
// //                   type="date"
// //                   value={visitDate}
// //                   onChange={e => setVisitDate(e.target.value)}
// //                   style={inputStyle}
// //                 />
// //                 <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
// //                   <input
// //                     type="number"
// //                     min="0"
// //                     max="23"
// //                     value={visitHour}
// //                     onChange={e => setVisitHour(e.target.value)}
// //                     style={{ ...inputStyle, width: 70 }}
// //                   />
// //                   <span>:</span>
// //                   <input
// //                     type="number"
// //                     min="0"
// //                     max="59"
// //                     value={visitMinute}
// //                     onChange={e => setVisitMinute(e.target.value)}
// //                     style={{ ...inputStyle, width: 70 }}
// //                   />
// //                 </div>
// //                 <textarea
// //                   placeholder={t.prompt.notes}
// //                   value={notes}
// //                   onChange={e => setNotes(e.target.value)}
// //                   style={{ ...inputStyle, minHeight: 80 }}
// //                 />
// //                 <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
// //                   <button onClick={() => setShowAddDialog(false)} style={secondaryBtn}>
// //                     {t.btn.close}
// //                   </button>
// //                   <button onClick={handleAddVisit} style={primaryBtn('#48bb78')} disabled={addLoading}>
// //                     {addLoading ? '⏳' : t.btn.addVisit}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // // ---------- Subcomponents (unchanged, but now use t) ----------
// // const StatCard = ({ icon, label, value, color }) => (
// //   <div style={{
// //     background: 'white', borderRadius: 12, padding: '15px 20px',
// //     boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
// //     flex: 1, minWidth: 150,
// //   }}>
// //     <span style={{ fontSize: 24 }}>{icon}</span>
// //     <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
// //     <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
// //   </div>
// // );

// // const WalkInTable = ({ visits, onOpen, onCancel, t, isRTL }) => {
// //   const columns = isRTL
// //     ? ['actions', 'status', 'time', 'room', 'section', 'doctor', 'id']
// //     : ['id', 'doctor', 'section', 'room', 'time', 'status', 'actions'];

// //   return (
// //     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
// //       <thead>
// //         <tr>
// //           {columns.map(col => (
// //             <th key={col} style={{ padding: 10, background: '#f8f9fa', textAlign: 'left' }}>
// //               {t.table[col] || col}
// //             </th>
// //           ))}
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {visits.map(v => (
// //           <tr key={v.id} style={{ borderBottom: '1px solid #eee' }}>
// //             {columns.map(col => {
// //               switch (col) {
// //                 case 'id': return <td key={col}>{v.id}</td>;
// //                 case 'doctor': return <td key={col}>{v.doctor?.fullName || v.doctorName || 'N/A'}</td>;
// //                 case 'section': return <td key={col}>{v.room?.section?.name || v.sectionName || 'N/A'}</td>;
// //                 case 'room': return <td key={col}>{v.room?.roomNumber || v.roomNumber || 'N/A'}</td>;
// //                 case 'time': return <td key={col}>{formatVisitTime(v.visitTime)}</td>;
// //                 case 'status': {
// //                   const statusColor = v.status === 'CANCELLED' ? 'red' : v.status === 'IN_PROGRESS' ? 'green' : 'black';
// //                   return <td key={col} style={{ color: statusColor, fontWeight: 'bold' }}>{v.status}</td>;
// //                 }
// //                 case 'actions': {
// //                   const isCancelDisabled = v.status === 'CLOSED' || v.status === 'CANCELLED';
// //                   return (
// //                     <td key={col}>
// //                       <div style={{ display: 'flex', gap: 5 }}>
// //                         {v.status === 'CREATED' && (
// //                           <button onClick={() => onOpen(v.id)} style={miniBtn('#4299e1')}>
// //                             {t.btn.openVisit}
// //                           </button>
// //                         )}
// //                         <button onClick={() => onCancel(v.id)} disabled={isCancelDisabled} style={miniBtn('#fc8181')}>
// //                           {t.btn.cancel}
// //                         </button>
// //                       </div>
// //                     </td>
// //                   );
// //                 }
// //                 default: return <td key={col}></td>;
// //               }
// //             })}
// //           </tr>
// //         ))}
// //       </tbody>
// //     </table>
// //   );
// // };

// // const WalkInCards = ({ visits, onOpen, onCancel, t, isRTL }) => (
// //   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
// //     {visits.map(v => (
// //       <div key={v.id} style={{
// //         background: 'white', borderRadius: 12, padding: 15,
// //         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
// //         border: '1px solid #edf2f7',
// //         direction: isRTL ? 'rtl' : 'ltr',
// //       }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
// //           <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>#{v.id}</span>
// //           <span style={{ fontWeight: 'bold' }}>{v.doctor?.fullName || v.doctorName || 'N/A'}</span>
// //           <span style={{
// //             background: v.status === 'CANCELLED' ? '#fc8181' : v.status === 'IN_PROGRESS' ? '#48bb78' : '#edf2f7',
// //             color: v.status === 'CANCELLED' ? 'white' : v.status === 'IN_PROGRESS' ? 'white' : '#4a5568',
// //             borderRadius: 12, padding: '2px 10px', fontSize: 11
// //           }}>
// //             {v.status}
// //           </span>
// //         </div>
// //         <div style={{ fontSize: 13, color: '#4a5568' }}>
// //           🏥 {v.room?.roomNumber || v.roomNumber || 'N/A'} &nbsp;
// //           📋 {v.room?.section?.name || v.sectionName || 'N/A'} &nbsp;
// //           🕐 {formatVisitTime(v.visitTime)}
// //         </div>
// //         <div style={{ marginTop: 8, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
// //           {v.status === 'CREATED' && (
// //             <button onClick={() => onOpen(v.id)} style={miniBtn('#4299e1')}>
// //               {t.btn.openVisit}
// //             </button>
// //           )}
// //           <button onClick={() => onCancel(v.id)} disabled={v.status === 'CLOSED' || v.status === 'CANCELLED'} style={miniBtn('#fc8181')}>
// //             {t.btn.cancel}
// //           </button>
// //         </div>
// //       </div>
// //     ))}
// //   </div>
// // );

// // // ---------- Style utilities (reused from SearchPatientScreen) ----------
// // const primaryBtn = (bg) => ({
// //   background: bg, color: 'white', fontWeight: 'bold', border: 'none',
// //   borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
// // });
// // const secondaryBtn = {
// //   background: '#e2e8f0', border: 'none', padding: '8px 16px',
// //   borderRadius: 8, cursor: 'pointer',
// // };
// // const toggleBtn = {
// //   background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 8,
// //   padding: '8px 12px', cursor: 'pointer',
// // };
// // const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };
// // const miniBtn = (bg) => ({
// //   background: bg, color: 'white', border: 'none', borderRadius: 6,
// //   padding: '4px 10px', cursor: 'pointer', fontSize: 12,
// // });
// // const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' };
// // const modalOverlay = {
// //   position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
// //   background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
// //   alignItems: 'center', zIndex: 1000,
// // };
// // const modalContent = {
// //   background: 'white', borderRadius: 12, padding: 20, minWidth: 600,
// //   maxWidth: 1000, width: '90%', maxHeight: '90vh', overflowY: 'auto',
// //   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// // };

// // export default WalkInScreen;


// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import { walkInTranslations } from '../../i18n/walkInTranslations';

// const API_VISITS = `${BASE_URL}/api/patient/visits/patient`;
// const API_CREATE_VISIT = `${BASE_URL}/api/patient/visits/patient`;
// const API_OPEN_VISIT = `${BASE_URL}/api/patient/visits`;
// const API_CANCEL_VISIT = `${BASE_URL}/api/patient/visits`;
// const API_SECTIONS = `${BASE_URL}/api/sections`;
// const API_ROOMS_BY_SECTION = `${BASE_URL}/api/rooms/section`;
// const API_DOCTORS = `${BASE_URL}/api/doctors`;

// // ---------- Helper: format date/time for display (same as AppointmentModal) ----------
// const formatVisitTime = (dateStr) => {
//   if (!dateStr) return '';
//   const d = new Date(dateStr);
//   return d.toLocaleString('en-GB', { hour12: false });
// };

// // ---------- Main Component ----------
// const WalkInScreen = ({ patientId, loggedUser, lang = 'en', onClose }) => {
//   const t = walkInTranslations[lang] || walkInTranslations.en;
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [visits, setVisits] = useState([]);
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [stats, setStats] = useState({ total: 0, active: 0, cancelled: 0 });
//   const [showAddDialog, setShowAddDialog] = useState(false);

//   const [sections, setSections] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [selectedSection, setSelectedSection] = useState('');
//   const [selectedRoom, setSelectedRoom] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [visitDate, setVisitDate] = useState('');
//   const [visitHour, setVisitHour] = useState('12');
//   const [visitMinute, setVisitMinute] = useState('00');
//   const [notes, setNotes] = useState('');
//   const [addLoading, setAddLoading] = useState(false);

//   // ---------- Fetch visits ----------
//   const fetchVisits = useCallback(async () => {
//     if (!patientId) return;
//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);
//     try {
//       const res = await fetch(`${API_VISITS}/${patientId}`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       // Enrich with patient name (if available)
//       const enriched = data.map(v => ({
//         ...v,
//         patientName: v.patient ? `${v.patient.firstName} ${v.patient.middleName || ''} ${v.patient.lastName}`.replace(/\s+/g, ' ').trim() : 'N/A',
//       }));
//       setVisits(enriched);
//       let total = enriched.length;
//       let active = 0, cancelled = 0;
//       enriched.forEach(v => {
//         if (v.status === 'IN_PROGRESS') active++;
//         else if (v.status === 'CANCELLED') cancelled++;
//       });
//       setStats({ total, active, cancelled });
//       setStatusMsg(`✅ ${t.status.ready} (${total} ${t.stats.total})`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.status.error}: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, [patientId, t]);

//   // ---------- Fetch dropdown data ----------
//   const fetchSections = useCallback(async () => {
//     try {
//       const res = await fetch(API_SECTIONS);
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setSections(data);
//     } catch (e) {
//       //console.error('Failed to load sections');
//     }
//   }, []);

//   const fetchRoomsBySection = useCallback(async (sectionId) => {
//     if (!sectionId) {
//       setRooms([]);
//       return;
//     }
//     try {
//       const res = await fetch(`${API_ROOMS_BY_SECTION}/${sectionId}`);
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setRooms(data);
//     } catch (e) {
//       //console.error('Failed to load rooms');
//     }
//   }, []);

//   const fetchDoctors = useCallback(async () => {
//     try {
//       const res = await fetch(API_DOCTORS);
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setDoctors(data);
//     } catch (e) {
//       //console.error('Failed to load doctors');
//     }
//   }, []);

//   // ---------- Load initial data ----------
//   useEffect(() => {
//     fetchVisits();
//     fetchSections();
//     fetchDoctors();
//   }, [fetchVisits, fetchSections, fetchDoctors]);

//   // ---------- Handlers ----------
//   const handleAddVisit = async () => {
//     if (!selectedRoom || !selectedDoctor || !visitDate) {
//       alert(t.msg.completeFields);
//       return;
//     }
//     // ✅ Build date‑time string WITHOUT milliseconds & Z (same as AppointmentModal)
//     const dateTimeStr = `${visitDate}T${String(visitHour).padStart(2, '0')}:${String(visitMinute).padStart(2, '0')}:00`;
//     const dateTime = new Date(dateTimeStr);
//     if (dateTime < new Date()) {
//       alert(t.msg.pastDateTime);
//       return;
//     }

//     setAddLoading(true);
//     try {
//       const url = `${API_CREATE_VISIT}/${patientId}/room/${selectedRoom}/doctor/${selectedDoctor}`;
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           visitTime: dateTimeStr,   // ✅ send simple string, not .toISOString()
//           notes: notes.trim(),
//         }),
//       });
//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err || 'Failed to add visit');
//       }
//       setStatusMsg(`✅ ${t.status.added}`);
//       setShowAddDialog(false);
//       fetchVisits();
//       // Reset form
//       setSelectedSection('');
//       setSelectedRoom('');
//       setSelectedDoctor('');
//       setVisitDate('');
//       setVisitHour('12');
//       setVisitMinute('00');
//       setNotes('');
//     } catch (err) {
//       alert(`${t.status.error}: ${err.message}`);
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   const handleOpenVisit = async (visitId) => {
//     try {
//       const res = await fetch(`${API_OPEN_VISIT}/${visitId}/create-visit`, { method: 'POST' });
//       if (!res.ok) throw new Error('Failed to open visit');
//       fetchVisits();
//       setStatusMsg(`✅ Visit #${visitId} opened`);
//     } catch (err) {
//       alert(`${t.status.error}: ${err.message}`);
//     }
//   };

//   const handleCancelVisit = async (visitId) => {
//     const reason = window.prompt(t.dialog.reason);
//     if (reason === null) return;
//     if (reason.trim() === '') {
//       alert(t.msg.cancelRequired);
//       return;
//     }
//     try {
//       const url = `${API_CANCEL_VISIT}/${visitId}/cancel?username=${encodeURIComponent(loggedUser)}&reason=${encodeURIComponent(reason)}`;
//       const res = await fetch(url, { method: 'PUT' });
//       if (!res.ok) throw new Error('Failed to cancel visit');
//       fetchVisits();
//       setStatusMsg(`✅ Visit #${visitId} cancelled`);
//     } catch (err) {
//       alert(`${t.status.error}: ${err.message}`);
//     }
//   };

//   // ---------- Render ----------
//   return (
//     <div style={modalOverlay} dir={isRTL ? 'rtl' : 'ltr'}>
//       <div style={modalContent}>
//         {/* Header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
//           <h2>🚶 {t.title}</h2>
//           <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.close}</button>
//         </div>

//         {/* Stats cards */}
//         <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
//           <StatCard icon="📊" label={t.stats.total} value={stats.total} color="#4299e1" />
//           <StatCard icon="✅" label={t.stats.active} value={stats.active} color="#48bb78" />
//           <StatCard icon="❌" label={t.stats.cancelled} value={stats.cancelled} color="#fc8181" />
//         </div>

//         {/* View toggle */}
//         <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
//           <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
//             📋 {t.btn.table}
//           </button>
//           <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
//             🃏 {t.btn.cards}
//           </button>
//           <span style={{ marginLeft: 'auto', color: '#4a5568' }}>{statusMsg}</span>
//         </div>

//         {/* Content */}
//         <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 300 }}>
//           {loading ? (
//             <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
//           ) : visits.length === 0 ? (
//             <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.label.noVisits}</div>
//           ) : viewMode === 'table' ? (
//             <WalkInTable
//               visits={visits}
//               onOpen={handleOpenVisit}
//               onCancel={handleCancelVisit}
//               t={t}
//               isRTL={isRTL}
//             />
//           ) : (
//             <WalkInCards
//               visits={visits}
//               onOpen={handleOpenVisit}
//               onCancel={handleCancelVisit}
//               t={t}
//               isRTL={isRTL}
//             />
//           )}
//         </div>

//         {/* Floating Add Button */}
//         <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1100 }}>
//           <button
//             onClick={() => setShowAddDialog(true)}
//             style={{
//               ...primaryBtn('#48bb78'),
//               borderRadius: '50%',
//               width: 60,
//               height: 60,
//               fontSize: 32,
//               boxShadow: '0 4px 12px rgba(72,187,120,0.5)',
//             }}
//           >
//             +
//           </button>
//         </div>

//         {/* Add Visit Dialog */}
//         {showAddDialog && (
//           <div style={modalOverlay}>
//             <div style={{ ...modalContent, minWidth: 400, maxWidth: 500 }}>
//               <h3>🚶 {t.dialog.addVisit}</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
//                 <select value={selectedSection} onChange={e => {
//                   const val = e.target.value;
//                   setSelectedSection(val);
//                   fetchRoomsBySection(val);
//                   setSelectedRoom('');
//                 }} style={inputStyle}>
//                   <option value="">{t.prompt.section}</option>
//                   {sections.map(s => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))}
//                 </select>
//                 <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} style={inputStyle}>
//                   <option value="">{t.prompt.room}</option>
//                   {rooms.map(r => (
//                     <option key={r.id} value={r.id}>{r.roomNumber} - {r.section?.name || ''}</option>
//                   ))}
//                 </select>
//                 <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} style={inputStyle}>
//                   <option value="">{t.prompt.doctor}</option>
//                   {doctors.map(d => (
//                     <option key={d.id} value={d.id}>
//                       {d.firstName} {d.middleName} {d.lastName}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="date"
//                   value={visitDate}
//                   onChange={e => setVisitDate(e.target.value)}
//                   style={inputStyle}
//                 />
//                 <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
//                   <input
//                     type="number"
//                     min="0"
//                     max="23"
//                     value={visitHour}
//                     onChange={e => setVisitHour(e.target.value)}
//                     style={{ ...inputStyle, width: 70 }}
//                   />
//                   <span>:</span>
//                   <input
//                     type="number"
//                     min="0"
//                     max="59"
//                     value={visitMinute}
//                     onChange={e => setVisitMinute(e.target.value)}
//                     style={{ ...inputStyle, width: 70 }}
//                   />
//                 </div>
//                 <textarea
//                   placeholder={t.prompt.notes}
//                   value={notes}
//                   onChange={e => setNotes(e.target.value)}
//                   style={{ ...inputStyle, minHeight: 80 }}
//                 />
//                 <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//                   <button onClick={() => setShowAddDialog(false)} style={secondaryBtn}>
//                     {t.btn.close}
//                   </button>
//                   <button onClick={handleAddVisit} style={primaryBtn('#48bb78')} disabled={addLoading}>
//                     {addLoading ? '⏳' : t.btn.addVisit}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ---------- Subcomponents ----------
// const StatCard = ({ icon, label, value, color }) => (
//   <div style={{
//     background: 'white', borderRadius: 12, padding: '15px 20px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
//     flex: 1, minWidth: 150,
//   }}>
//     <span style={{ fontSize: 24 }}>{icon}</span>
//     <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
//     <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
//   </div>
// );

// // ---------- WalkIn Table (with Patient column) ----------
// const WalkInTable = ({ visits, onOpen, onCancel, t, isRTL }) => {
//   const columns = isRTL
//     ? ['actions', 'status', 'time', 'room', 'section', 'doctor', 'patient', 'id']
//     : ['id', 'patient', 'doctor', 'section', 'room', 'time', 'status', 'actions'];

//   return (
//     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//       <thead>
//         <tr>
//           {columns.map(col => (
//             <th key={col} style={{ padding: 10, background: '#f8f9fa', textAlign: 'left' }}>
//               {t.table[col] || col}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {visits.map(v => (
//           <tr key={v.id} style={{ borderBottom: '1px solid #eee' }}>
//             {columns.map(col => {
//               switch (col) {
//                 case 'id': return <td key={col}>{v.id}</td>;
//                 case 'patient': return <td key={col}>{v.patientName || 'N/A'}</td>;
//                 case 'doctor': return <td key={col}>{v.doctor?.fullName || v.doctorName || 'N/A'}</td>;
//                 case 'section': return <td key={col}>{v.room?.section?.name || v.sectionName || 'N/A'}</td>;
//                 case 'room': return <td key={col}>{v.room?.roomNumber || v.roomNumber || 'N/A'}</td>;
//                 case 'time': return <td key={col}>{formatVisitTime(v.visitTime)}</td>;
//                 case 'status': {
//                   const colorMap = {
//                     CANCELLED: '#e53e3e',
//                     IN_PROGRESS: '#d69e2e',
//                     CREATED: '#3182ce',
//                     CLOSED: '#718096',
//                   };
//                   return <td key={col} style={{ color: colorMap[v.status] || 'black', fontWeight: 'bold' }}>{v.status}</td>;
//                 }
//                 case 'actions': {
//                   const isCancelDisabled = v.status === 'CLOSED' || v.status === 'CANCELLED';
//                   return (
//                     <td key={col}>
//                       <div style={{ display: 'flex', gap: 5 }}>
//                         {v.status === 'CREATED' && (
//                           <button onClick={() => onOpen(v.id)} style={miniBtn('#4299e1')}>
//                             {t.btn.openVisit}
//                           </button>
//                         )}
//                         <button onClick={() => onCancel(v.id)} disabled={isCancelDisabled} style={miniBtn('#fc8181')}>
//                           {t.btn.cancel}
//                         </button>
//                       </div>
//                     </td>
//                   );
//                 }
//                 default: return <td key={col}></td>;
//               }
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// // ---------- WalkIn Cards (with Patient name and notes) ----------
// const WalkInCards = ({ visits, onOpen, onCancel, t, isRTL }) => (
//   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
//     {visits.map(v => (
//       <div key={v.id} style={{
//         background: 'white',
//         borderRadius: 12,
//         padding: 15,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//         border: '1px solid #edf2f7',
//         direction: isRTL ? 'rtl' : 'ltr',
//         transition: 'transform 0.15s ease, box-shadow 0.15s ease',
//         cursor: 'default',
//       }}>
//         {/* Header: ID, Patient, Status */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
//           <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>
//             #{v.id}
//           </span>
//           <span style={{ fontWeight: 'bold', flex: 1, marginLeft: 8, marginRight: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//             {v.patientName || 'N/A'}
//           </span>
//           <span style={{
//             background: v.status === 'CANCELLED' ? '#fc8181'
//               : v.status === 'IN_PROGRESS' ? '#48bb78'
//               : v.status === 'CREATED' ? '#3182ce'
//               : '#edf2f7',
//             color: ['CANCELLED', 'IN_PROGRESS', 'CREATED'].includes(v.status) ? 'white' : '#4a5568',
//             borderRadius: 12,
//             padding: '2px 10px',
//             fontSize: 11,
//             whiteSpace: 'nowrap',
//           }}>
//             {v.status}
//           </span>
//         </div>

//         {/* Doctor, Room, Section, Time */}
//         <div style={{ fontSize: 13, color: '#4a5568', marginBottom: 6 }}>
//           <div>👨‍⚕️ {v.doctor?.fullName || v.doctorName || 'N/A'}</div>
//           <div style={{ display: 'flex', gap: 12, marginTop: 2 }}>
//             <span>🏥 {v.room?.roomNumber || v.roomNumber || 'N/A'}</span>
//             <span>📋 {v.room?.section?.name || v.sectionName || 'N/A'}</span>
//           </div>
//           <div style={{ marginTop: 2 }}>🕐 {formatVisitTime(v.visitTime) || 'N/A'}</div>
//         </div>

//         {/* Notes (if any) */}
//         {v.notes && (
//           <div style={{ fontSize: 12, color: '#718096', marginTop: 4, borderTop: '1px solid #f0f0f0', paddingTop: 6 }}>
//             📝 {v.notes}
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
//           {v.status === 'CREATED' && (
//             <button onClick={() => onOpen(v.id)} style={miniBtn('#4299e1')}>
//               {t.btn.openVisit}
//             </button>
//           )}
//           {v.status !== 'CLOSED' && v.status !== 'CANCELLED' && (
//             <button onClick={() => onCancel(v.id)} style={miniBtn('#fc8181')}>
//               {t.btn.cancel}
//             </button>
//           )}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // ---------- Style utilities (matching AppointmentModal) ----------
// const primaryBtn = (bg) => ({
//   background: bg, color: 'white', fontWeight: 'bold', border: 'none',
//   borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
// });
// const secondaryBtn = {
//   background: '#e2e8f0', border: 'none', padding: '8px 16px',
//   borderRadius: 8, cursor: 'pointer',
// };
// const toggleBtn = {
//   background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 8,
//   padding: '8px 12px', cursor: 'pointer',
// };
// const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };
// const miniBtn = (bg) => ({
//   background: bg, color: 'white', border: 'none', borderRadius: 6,
//   padding: '4px 10px', cursor: 'pointer', fontSize: 12,
// });
// const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' };
// const modalOverlay = {
//   position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//   background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
//   alignItems: 'center', zIndex: 1000,
// };
// const modalContent = {
//   background: 'white', borderRadius: 12, padding: 20, minWidth: 600,
//   maxWidth: 1000, width: '90%', maxHeight: '90vh', overflowY: 'auto',
//   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// export default WalkInScreen;



// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import { walkInTranslations } from '../../i18n/walkInTranslations';

// const API_VISITS = `${BASE_URL}/api/patient/visits/patient`;
// const API_CREATE_VISIT = `${BASE_URL}/api/patient/visits/patient`;
// const API_OPEN_VISIT = `${BASE_URL}/api/patient/visits`;
// const API_CANCEL_VISIT = `${BASE_URL}/api/patient/visits`;
// const API_SECTIONS = `${BASE_URL}/api/sections`;
// const API_ROOMS_BY_SECTION = `${BASE_URL}/api/rooms/section`;
// const API_DOCTORS = `${BASE_URL}/api/doctors`;

// // ---------- Helper: format date/time for display ----------
// const formatVisitTime = (dateStr) => {
//   if (!dateStr) return '';
//   const d = new Date(dateStr);
//   return d.toLocaleString('en-GB', { hour12: false });
// };

// // ---------- Helper: get next hour (capped at 23) ----------
// const getNextHour = () => {
//   const now = new Date();
//   let hour = now.getHours() + 1;
//   if (hour > 23) hour = 23;
//   return hour;
// };

// // ---------- Main Component ----------
// const WalkInScreen = ({ patientId, loggedUser, lang = 'en', onClose }) => {
//   const t = walkInTranslations[lang] || walkInTranslations.en;
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [visits, setVisits] = useState([]);
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [stats, setStats] = useState({ total: 0, active: 0, cancelled: 0 });
//   const [showAddDialog, setShowAddDialog] = useState(false);

//   const [sections, setSections] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [selectedSection, setSelectedSection] = useState('');
//   const [selectedRoom, setSelectedRoom] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [visitDate, setVisitDate] = useState('');
//   const [visitHour, setVisitHour] = useState(String(getNextHour()));
//   const [visitMinute, setVisitMinute] = useState('00');
//   const [notes, setNotes] = useState('');
//   const [addLoading, setAddLoading] = useState(false);

//   // ---------- Fetch visits ----------
//   const fetchVisits = useCallback(async () => {
//     if (!patientId) return;
//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);
//     try {
//       const res = await fetch(`${API_VISITS}/${patientId}`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
//       const enriched = data.map(v => ({
//         ...v,
//         patientName: v.patient ? `${v.patient.firstName} ${v.patient.middleName || ''} ${v.patient.lastName}`.replace(/\s+/g, ' ').trim() : 'N/A',
//       }));
//       setVisits(enriched);
//       let total = enriched.length;
//       let active = 0, cancelled = 0;
//       enriched.forEach(v => {
//         if (v.status === 'IN_PROGRESS') active++;
//         else if (v.status === 'CANCELLED') cancelled++;
//       });
//       setStats({ total, active, cancelled });
//       setStatusMsg(`✅ ${t.status.ready} (${total} ${t.stats.total})`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.status.error}: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   }, [patientId, t]);

//   // ---------- Fetch dropdown data ----------
//   const fetchSections = useCallback(async () => {
//     try {
//       const res = await fetch(API_SECTIONS);
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setSections(data);
//     } catch (e) {
//       //console.error('Failed to load sections');
//     }
//   }, []);

//   const fetchRoomsBySection = useCallback(async (sectionId) => {
//     if (!sectionId) {
//       setRooms([]);
//       return;
//     }
//     try {
//       const res = await fetch(`${API_ROOMS_BY_SECTION}/${sectionId}`);
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setRooms(data);
//     } catch (e) {
//       //console.error('Failed to load rooms');
//     }
//   }, []);

//   const fetchDoctors = useCallback(async () => {
//     try {
//       const res = await fetch(API_DOCTORS);
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setDoctors(data);
//     } catch (e) {
//       //console.error('Failed to load doctors');
//     }
//   }, []);

//   // ---------- Load initial data ----------
//   useEffect(() => {
//     fetchVisits();
//     fetchSections();
//     fetchDoctors();
//   }, [fetchVisits, fetchSections, fetchDoctors]);

//   // ---------- Handlers ----------
//   const handleAddVisit = async () => {
//     if (!selectedRoom || !selectedDoctor || !visitDate) {
//       alert(t.msg.completeFields);
//       return;
//     }
//     const dateTimeStr = `${visitDate}T${String(visitHour).padStart(2, '0')}:${String(visitMinute).padStart(2, '0')}:00`;
//     const dateTime = new Date(dateTimeStr);
//     if (dateTime < new Date()) {
//       alert(t.msg.pastDateTime);
//       return;
//     }

//     setAddLoading(true);
//     try {
//       const url = `${API_CREATE_VISIT}/${patientId}/room/${selectedRoom}/doctor/${selectedDoctor}`;
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           visitTime: dateTimeStr,
//           notes: notes.trim(),
//         }),
//       });
//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err || 'Failed to add visit');
//       }
//       setStatusMsg(`✅ ${t.status.added}`);
//       setShowAddDialog(false);
//       fetchVisits();
//       // Reset form with next hour
//       const nextH = getNextHour();
//       setSelectedSection('');
//       setSelectedRoom('');
//       setSelectedDoctor('');
//       setVisitDate('');
//       setVisitHour(String(nextH));
//       setVisitMinute('00');
//       setNotes('');
//     } catch (err) {
//       alert(`${t.status.error}: ${err.message}`);
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   const handleOpenVisit = async (visitId) => {
//     try {
//       const res = await fetch(`${API_OPEN_VISIT}/${visitId}/create-visit`, { method: 'POST' });
//       if (!res.ok) throw new Error('Failed to open visit');
//       fetchVisits();
//       setStatusMsg(`✅ Visit #${visitId} opened`);
//     } catch (err) {
//       alert(`${t.status.error}: ${err.message}`);
//     }
//   };

//   const handleCancelVisit = async (visitId) => {
//     const reason = window.prompt(t.dialog.reason);
//     if (reason === null) return;
//     if (reason.trim() === '') {
//       alert(t.msg.cancelRequired);
//       return;
//     }
//     try {
//       const url = `${API_CANCEL_VISIT}/${visitId}/cancel?username=${encodeURIComponent(loggedUser)}&reason=${encodeURIComponent(reason)}`;
//       const res = await fetch(url, { method: 'PUT' });
//       if (!res.ok) throw new Error('Failed to cancel visit');
//       fetchVisits();
//       setStatusMsg(`✅ Visit #${visitId} cancelled`);
//     } catch (err) {
//       alert(`${t.status.error}: ${err.message}`);
//     }
//   };

//   // ---------- Render ----------
//   return (
//     <div style={modalOverlay} dir={isRTL ? 'rtl' : 'ltr'}>
//       <div style={modalContent}>
//         {/* Header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
//           <h2>🚶 {t.title}</h2>
//           <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.close}</button>
//         </div>

//         {/* Stats cards */}
//         <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
//           <StatCard icon="📊" label={t.stats.total} value={stats.total} color="#4299e1" />
//           <StatCard icon="✅" label={t.stats.active} value={stats.active} color="#48bb78" />
//           <StatCard icon="❌" label={t.stats.cancelled} value={stats.cancelled} color="#fc8181" />
//         </div>

//         {/* View toggle */}
//         <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
//           <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
//             📋 {t.btn.table}
//           </button>
//           <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
//             🃏 {t.btn.cards}
//           </button>
//           <span style={{ marginLeft: 'auto', color: '#4a5568' }}>{statusMsg}</span>
//         </div>

//         {/* Content */}
//         <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 300 }}>
//           {loading ? (
//             <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
//           ) : visits.length === 0 ? (
//             <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.label.noVisits}</div>
//           ) : viewMode === 'table' ? (
//             <WalkInTable
//               visits={visits}
//               onOpen={handleOpenVisit}
//               onCancel={handleCancelVisit}
//               t={t}
//               isRTL={isRTL}
//             />
//           ) : (
//             <WalkInCards
//               visits={visits}
//               onOpen={handleOpenVisit}
//               onCancel={handleCancelVisit}
//               t={t}
//               isRTL={isRTL}
//             />
//           )}
//         </div>

//         {/* Floating Add Button */}
//         <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1100 }}>
//           <button
//             onClick={() => {
//               // Pre‑fill with next hour when dialog opens
//               const nextH = getNextHour();
//               setVisitHour(String(nextH));
//               setVisitMinute('00');
//               setShowAddDialog(true);
//             }}
//             style={{
//               ...primaryBtn('#48bb78'),
//               borderRadius: '50%',
//               width: 60,
//               height: 60,
//               fontSize: 32,
//               boxShadow: '0 4px 12px rgba(72,187,120,0.5)',
//             }}
//           >
//             +
//           </button>
//         </div>

//         {/* Add Visit Dialog */}
//         {showAddDialog && (
//           <div style={modalOverlay}>
//             <div style={{ ...modalContent, minWidth: 400, maxWidth: 500 }}>
//               <h3>🚶 {t.dialog.addVisit}</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
//                 <select value={selectedSection} onChange={e => {
//                   const val = e.target.value;
//                   setSelectedSection(val);
//                   fetchRoomsBySection(val);
//                   setSelectedRoom('');
//                 }} style={inputStyle}>
//                   <option value="">{t.prompt.section}</option>
//                   {sections.map(s => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))}
//                 </select>
//                 <select value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} style={inputStyle}>
//                   <option value="">{t.prompt.room}</option>
//                   {rooms.map(r => (
//                     <option key={r.id} value={r.id}>{r.roomNumber} - {r.section?.name || ''}</option>
//                   ))}
//                 </select>
//                 <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} style={inputStyle}>
//                   <option value="">{t.prompt.doctor}</option>
//                   {doctors.map(d => (
//                     <option key={d.id} value={d.id}>
//                       {d.firstName} {d.middleName} {d.lastName}
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   type="date"
//                   value={visitDate}
//                   onChange={e => setVisitDate(e.target.value)}
//                   style={inputStyle}
//                 />
//                 <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
//                   <input
//                     type="number"
//                     min="0"
//                     max="23"
//                     value={visitHour}
//                     onChange={e => setVisitHour(e.target.value)}
//                     style={{ ...inputStyle, width: 70 }}
//                   />
//                   <span>:</span>
//                   <input
//                     type="number"
//                     min="0"
//                     max="59"
//                     value={visitMinute}
//                     onChange={e => setVisitMinute(e.target.value)}
//                     style={{ ...inputStyle, width: 70 }}
//                   />
//                 </div>
//                 <textarea
//                   placeholder={t.prompt.notes}
//                   value={notes}
//                   onChange={e => setNotes(e.target.value)}
//                   style={{ ...inputStyle, minHeight: 80 }}
//                 />
//                 <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//                   <button onClick={() => setShowAddDialog(false)} style={secondaryBtn}>
//                     {t.btn.close}
//                   </button>
//                   <button onClick={handleAddVisit} style={primaryBtn('#48bb78')} disabled={addLoading}>
//                     {addLoading ? '⏳' : t.btn.addVisit}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ---------- Subcomponents (unchanged) ----------
// const StatCard = ({ icon, label, value, color }) => (
//   <div style={{
//     background: 'white', borderRadius: 12, padding: '15px 20px',
//     boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
//     flex: 1, minWidth: 150,
//   }}>
//     <span style={{ fontSize: 24 }}>{icon}</span>
//     <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
//     <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
//   </div>
// );

// const WalkInTable = ({ visits, onOpen, onCancel, t, isRTL }) => {
//   const columns = isRTL
//     ? ['actions', 'status', 'time', 'room', 'section', 'doctor', 'patient', 'id']
//     : ['id', 'patient', 'doctor', 'section', 'room', 'time', 'status', 'actions'];

//   return (
//     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//       <thead>
//         <tr>
//           {columns.map(col => (
//             <th key={col} style={{ padding: 10, background: '#f8f9fa', textAlign: 'left' }}>
//               {t.table[col] || col}
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {visits.map(v => (
//           <tr key={v.id} style={{ borderBottom: '1px solid #eee' }}>
//             {columns.map(col => {
//               switch (col) {
//                 case 'id': return <td key={col}>{v.id}</td>;
//                 case 'patient': return <td key={col}>{v.patientName || 'N/A'}</td>;
//                 case 'doctor': return <td key={col}>{v.doctor?.fullName || v.doctorName || 'N/A'}</td>;
//                 case 'section': return <td key={col}>{v.room?.section?.name || v.sectionName || 'N/A'}</td>;
//                 case 'room': return <td key={col}>{v.room?.roomNumber || v.roomNumber || 'N/A'}</td>;
//                 case 'time': return <td key={col}>{formatVisitTime(v.visitTime)}</td>;
//                 case 'status': {
//                   const colorMap = {
//                     CANCELLED: '#e53e3e',
//                     IN_PROGRESS: '#d69e2e',
//                     CREATED: '#3182ce',
//                     CLOSED: '#718096',
//                   };
//                   return <td key={col} style={{ color: colorMap[v.status] || 'black', fontWeight: 'bold' }}>{v.status}</td>;
//                 }
//                 case 'actions': {
//                   const isCancelDisabled = v.status === 'CLOSED' || v.status === 'CANCELLED';
//                   return (
//                     <td key={col}>
//                       <div style={{ display: 'flex', gap: 5 }}>
//                         {v.status === 'CREATED' && (
//                           <button onClick={() => onOpen(v.id)} style={miniBtn('#4299e1')}>
//                             {t.btn.openVisit}
//                           </button>
//                         )}
//                         <button onClick={() => onCancel(v.id)} disabled={isCancelDisabled} style={miniBtn('#fc8181')}>
//                           {t.btn.cancel}
//                         </button>
//                       </div>
//                     </td>
//                   );
//                 }
//                 default: return <td key={col}></td>;
//               }
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// const WalkInCards = ({ visits, onOpen, onCancel, t, isRTL }) => (
//   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
//     {visits.map(v => (
//       <div key={v.id} style={{
//         background: 'white',
//         borderRadius: 12,
//         padding: 15,
//         boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
//         border: '1px solid #edf2f7',
//         direction: isRTL ? 'rtl' : 'ltr',
//         transition: 'transform 0.15s ease, box-shadow 0.15s ease',
//         cursor: 'default',
//       }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
//           <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>
//             #{v.id}
//           </span>
//           <span style={{ fontWeight: 'bold', flex: 1, marginLeft: 8, marginRight: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//             {v.patientName || 'N/A'}
//           </span>
//           <span style={{
//             background: v.status === 'CANCELLED' ? '#fc8181'
//               : v.status === 'IN_PROGRESS' ? '#48bb78'
//               : v.status === 'CREATED' ? '#3182ce'
//               : '#edf2f7',
//             color: ['CANCELLED', 'IN_PROGRESS', 'CREATED'].includes(v.status) ? 'white' : '#4a5568',
//             borderRadius: 12,
//             padding: '2px 10px',
//             fontSize: 11,
//             whiteSpace: 'nowrap',
//           }}>
//             {v.status}
//           </span>
//         </div>
//         <div style={{ fontSize: 13, color: '#4a5568', marginBottom: 6 }}>
//           <div>👨‍⚕️ {v.doctor?.fullName || v.doctorName || 'N/A'}</div>
//           <div style={{ display: 'flex', gap: 12, marginTop: 2 }}>
//             <span>🏥 {v.room?.roomNumber || v.roomNumber || 'N/A'}</span>
//             <span>📋 {v.room?.section?.name || v.sectionName || 'N/A'}</span>
//           </div>
//           <div style={{ marginTop: 2 }}>🕐 {formatVisitTime(v.visitTime) || 'N/A'}</div>
//         </div>
//         {v.notes && (
//           <div style={{ fontSize: 12, color: '#718096', marginTop: 4, borderTop: '1px solid #f0f0f0', paddingTop: 6 }}>
//             📝 {v.notes}
//           </div>
//         )}
//         <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
//           {v.status === 'CREATED' && (
//             <button onClick={() => onOpen(v.id)} style={miniBtn('#4299e1')}>
//               {t.btn.openVisit}
//             </button>
//           )}
//           {v.status !== 'CLOSED' && v.status !== 'CANCELLED' && (
//             <button onClick={() => onCancel(v.id)} style={miniBtn('#fc8181')}>
//               {t.btn.cancel}
//             </button>
//           )}
//         </div>
//       </div>
//     ))}
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
// const toggleBtn = {
//   background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 8,
//   padding: '8px 12px', cursor: 'pointer',
// };
// const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };
// const miniBtn = (bg) => ({
//   background: bg, color: 'white', border: 'none', borderRadius: 6,
//   padding: '4px 10px', cursor: 'pointer', fontSize: 12,
// });
// const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' };
// const modalOverlay = {
//   position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
//   background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
//   alignItems: 'center', zIndex: 1000,
// };
// const modalContent = {
//   background: 'white', borderRadius: 12, padding: 20, minWidth: 600,
//   maxWidth: 1000, width: '90%', maxHeight: '90vh', overflowY: 'auto',
//   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// export default WalkInScreen; 12072026 4:00 pm


import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../../utils/api';
import { walkInTranslations } from '../../i18n/walkInTranslations';

const API_VISITS = `${BASE_URL}/api/patient/visits/patient`;
const API_CREATE_VISIT = `${BASE_URL}/api/patient/visits/patient`;
const API_OPEN_VISIT = `${BASE_URL}/api/patient/visits`;
const API_CANCEL_VISIT = `${BASE_URL}/api/patient/visits`;
const API_SECTIONS = `${BASE_URL}/api/sections`;
const API_ROOMS_BY_SECTION = `${BASE_URL}/api/rooms/section`;
const API_DOCTORS = `${BASE_URL}/api/doctors`;

// ---------- Helper: format date/time for display ----------
const formatVisitTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleString('en-GB', { hour12: false });
};

// ---------- Helper: get next hour (capped at 23) ----------
const getNextHour = () => {
  const now = new Date();
  let hour = now.getHours() + 1;
  if (hour > 23) hour = 23;
  return hour;
};

// ---------- Main Component ----------
const WalkInScreen = ({ patientId, loggedUser, lang = 'en', onClose }) => {
  const t = walkInTranslations[lang] || walkInTranslations.en;
  const isRTL = lang === 'ar';

  // ---------- State ----------
  const [visits, setVisits] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
  const [stats, setStats] = useState({ total: 0, active: 0, cancelled: 0 });
  const [showAddDialog, setShowAddDialog] = useState(false);

  const [sections, setSections] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitHour, setVisitHour] = useState(String(getNextHour()));
  const [visitMinute, setVisitMinute] = useState('00');
  const [notes, setNotes] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  // ---------- Fetch visits ----------
  const fetchVisits = useCallback(async () => {
    if (!patientId) return;
    setLoading(true);
    setStatusMsg(`⏳ ${t.status.loading}`);
    try {
      const res = await fetch(`${API_VISITS}/${patientId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const enriched = data.map(v => ({
        ...v,
        patientName: v.patient ? `${v.patient.firstName} ${v.patient.middleName || ''} ${v.patient.lastName}`.replace(/\s+/g, ' ').trim() : 'N/A',
      }));
      setVisits(enriched);
      let total = enriched.length;
      let active = 0, cancelled = 0;
      enriched.forEach(v => {
        if (v.status === 'IN_PROGRESS') active++;
        else if (v.status === 'CANCELLED') cancelled++;
      });
      setStats({ total, active, cancelled });
      setStatusMsg(`✅ ${t.status.ready} (${total} ${t.stats.total})`);
    } catch (err) {
      setStatusMsg(`❌ ${t.status.error}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [patientId, t]);

  // ---------- Fetch dropdown data ----------
  const fetchSections = useCallback(async () => {
    try {
      const res = await fetch(API_SECTIONS);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSections(data);
    } catch (e) {
      //console.error('Failed to load sections');
    }
  }, []);

  const fetchRoomsBySection = useCallback(async (sectionId) => {
    if (!sectionId) {
      setRooms([]);
      return;
    }
    try {
      const res = await fetch(`${API_ROOMS_BY_SECTION}/${sectionId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setRooms(data);
    } catch (e) {
      //console.error('Failed to load rooms');
    }
  }, []);

  const fetchDoctors = useCallback(async () => {
    try {
      const res = await fetch(API_DOCTORS);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDoctors(data);
    } catch (e) {
      //console.error('Failed to load doctors');
    }
  }, []);

  // ---------- Load initial data ----------
  useEffect(() => {
    fetchVisits();
    fetchSections();
    fetchDoctors();
  }, [fetchVisits, fetchSections, fetchDoctors]);

  // ---------- Handlers ----------
  const handleAddVisit = async () => {
    if (!selectedRoom || !selectedDoctor || !visitDate) {
      alert(t.msg.completeFields);
      return;
    }
    const dateTimeStr = `${visitDate}T${String(visitHour).padStart(2, '0')}:${String(visitMinute).padStart(2, '0')}:00`;
    const dateTime = new Date(dateTimeStr);
    if (dateTime < new Date()) {
      alert(t.msg.pastDateTime);
      return;
    }

    setAddLoading(true);
    try {
      const url = `${API_CREATE_VISIT}/${patientId}/room/${selectedRoom}/doctor/${selectedDoctor}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitTime: dateTimeStr,
          notes: notes.trim(),
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Failed to add visit');
      }
      setStatusMsg(`✅ ${t.status.added}`);
      setShowAddDialog(false);
      fetchVisits();
      // Reset form with next hour
      const nextH = getNextHour();
      setSelectedSection('');
      setSelectedRoom('');
      setSelectedDoctor('');
      setVisitDate('');
      setVisitHour(String(nextH));
      setVisitMinute('00');
      setNotes('');
    } catch (err) {
      alert(`${t.status.error}: ${err.message}`);
    } finally {
      setAddLoading(false);
    }
  };

  const handleOpenVisit = async (visitId) => {
    try {
      const res = await fetch(`${API_OPEN_VISIT}/${visitId}/create-visit`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to open visit');
      fetchVisits();
      setStatusMsg(`✅ Visit #${visitId} opened`);
    } catch (err) {
      alert(`${t.status.error}: ${err.message}`);
    }
  };

  const handleCancelVisit = async (visitId) => {
    const reason = window.prompt(t.dialog.reason);
    if (reason === null) return;
    if (reason.trim() === '') {
      alert(t.msg.cancelRequired);
      return;
    }
    try {
      const url = `${API_CANCEL_VISIT}/${visitId}/cancel?username=${encodeURIComponent(loggedUser)}&reason=${encodeURIComponent(reason)}`;
      const res = await fetch(url, { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to cancel visit');
      fetchVisits();
      setStatusMsg(`✅ Visit #${visitId} cancelled`);
    } catch (err) {
      alert(`${t.status.error}: ${err.message}`);
    }
  };

  // ---------- Render ----------
  return (
    <>
      <style>{`
        /* ==================== WALK-IN SCREEN STYLES ==================== */
        .walkin-overlay {
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

        .walkin-modal {
          background: white;
          border-radius: 12px;
          padding: 20px;
          min-width: 300px;
          max-width: 1000px;
          width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: slideUp 0.3s ease;
        }

        .walkin-modal.rtl {
          direction: rtl;
        }

        .walkin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .walkin-header h2 {
          margin: 0;
          font-size: 22px;
          color: #2d3748;
        }

        .walkin-close-btn {
          background: #e2e8f0;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
          min-height: 38px;
        }

        .walkin-close-btn:hover {
          background: #cbd5e0;
        }

        .walkin-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }

        .walkin-stat-card {
          background: white;
          border-radius: 12px;
          padding: 15px 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border-left: 4px solid #4299e1;
          transition: transform 0.2s;
        }

        .walkin-stat-card:hover {
          transform: scale(1.02);
        }

        .walkin-stat-card .stat-icon {
          font-size: 24px;
        }

        .walkin-stat-card .stat-value {
          font-size: 24px;
          font-weight: bold;
          color: #4299e1;
        }

        .walkin-stat-card .stat-label {
          font-size: 12px;
          color: #718096;
        }

        .walkin-toolbar {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          align-items: center;
          flex-wrap: wrap;
        }

        .walkin-toggle-btn {
          background: #edf2f7;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          font-size: 13px;
          min-height: 38px;
          transition: all 0.2s;
        }

        .walkin-toggle-btn.active {
          background: #4299e1;
          color: white;
          font-weight: bold;
          border-color: #4299e1;
        }

        .walkin-toggle-btn:hover:not(.active) {
          background: #e2e8f0;
        }

        .walkin-status-msg {
          margin-left: auto;
          color: #4a5568;
          font-size: 13px;
        }

        .walkin-content {
          background: white;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          min-height: 300px;
        }

        .walkin-loading {
          text-align: center;
          padding: 40px;
          color: #7f8c8d;
        }

        .walkin-empty {
          text-align: center;
          padding: 40px;
          color: #a0aec0;
        }

        /* Table Styles */
        .walkin-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .walkin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 500px;
        }

        .walkin-table th {
          padding: 10px;
          background: #f8f9fa;
          text-align: left;
          font-weight: bold;
          color: #2d3748;
          border-bottom: 2px solid #e2e8f0;
        }

        .walkin-table td {
          padding: 8px 10px;
          border-bottom: 1px solid #eee;
          vertical-align: middle;
        }

        .walkin-table tr:hover td {
          background: #f7fafc;
        }

        .walkin-actions {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .walkin-mini-btn {
          color: white;
          border: none;
          border-radius: 6px;
          padding: 4px 10px;
          cursor: pointer;
          font-size: 12px;
          min-height: 30px;
          transition: all 0.2s;
        }

        .walkin-mini-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .walkin-mini-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .walkin-mini-btn.primary { background: #4299e1; }
        .walkin-mini-btn.primary:hover:not(:disabled) { background: #3182ce; }
        .walkin-mini-btn.danger { background: #fc8181; }
        .walkin-mini-btn.danger:hover:not(:disabled) { background: #f56565; }

        /* Card Styles */
        .walkin-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
        }

        .walkin-card {
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border: 1px solid #edf2f7;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          cursor: default;
        }

        .walkin-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }

        .walkin-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .walkin-card-id {
          background: #4299e1;
          color: white;
          border-radius: 12px;
          padding: 2px 10px;
          font-size: 12px;
        }

        .walkin-card-patient {
          font-weight: bold;
          flex: 1;
          margin: 0 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .walkin-card-status {
          border-radius: 12px;
          padding: 2px 10px;
          font-size: 11px;
          white-space: nowrap;
          font-weight: bold;
        }

        .walkin-card-status.cancelled { background: #fc8181; color: white; }
        .walkin-card-status.inprogress { background: #48bb78; color: white; }
        .walkin-card-status.created { background: #3182ce; color: white; }
        .walkin-card-status.closed { background: #718096; color: white; }

        .walkin-card-body {
          font-size: 13px;
          color: #4a5568;
        }

        .walkin-card-body .detail {
          margin-bottom: 4px;
        }

        .walkin-card-notes {
          font-size: 12px;
          color: #718096;
          margin-top: 4px;
          padding-top: 6px;
          border-top: 1px solid #f0f0f0;
        }

        .walkin-card-actions {
          margin-top: 10px;
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        /* Floating Button */
        .walkin-floating-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1100;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #48bb78;
          color: white;
          border: none;
          font-size: 32px;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(72, 187, 120, 0.5);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .walkin-floating-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(72, 187, 120, 0.7);
        }

        .walkin-floating-btn:active {
          transform: scale(0.95);
        }

        /* Add Dialog */
        .walkin-dialog-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
        }

        .walkin-dialog {
          background: white;
          border-radius: 12px;
          padding: 25px;
          min-width: 300px;
          max-width: 500px;
          width: 95%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: slideUp 0.3s ease;
        }

        .walkin-dialog h3 {
          margin: 0 0 15px 0;
          color: #2d3748;
          font-size: 18px;
        }

        .walkin-dialog .form-group {
          margin-bottom: 10px;
        }

        .walkin-dialog .form-group select,
        .walkin-dialog .form-group input,
        .walkin-dialog .form-group textarea {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
          background: white;
          min-height: 38px;
        }

        .walkin-dialog .form-group select:focus,
        .walkin-dialog .form-group input:focus,
        .walkin-dialog .form-group textarea:focus {
          outline: none;
          border-color: #4299e1;
        }

        .walkin-dialog .form-group textarea {
          min-height: 80px;
          resize: vertical;
        }

        .walkin-dialog .time-group {
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .walkin-dialog .time-group input {
          width: 70px;
        }

        .walkin-dialog .dialog-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .walkin-dialog .dialog-actions button {
          padding: 8px 20px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 38px;
        }

        .walkin-dialog .dialog-actions button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .walkin-dialog .dialog-actions button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .walkin-dialog .dialog-actions .btn-cancel {
          background: #e2e8f0;
          color: #4a5568;
        }

        .walkin-dialog .dialog-actions .btn-cancel:hover:not(:disabled) {
          background: #cbd5e0;
        }

        .walkin-dialog .dialog-actions .btn-add {
          background: #48bb78;
          color: white;
        }

        .walkin-dialog .dialog-actions .btn-add:hover:not(:disabled) {
          background: #38a169;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .walkin-modal {
            padding: 15px;
            width: 100%;
            min-width: unset;
          }

          .walkin-header h2 {
            font-size: 18px;
          }

          .walkin-stats {
            grid-template-columns: 1fr 1fr;
          }

          .walkin-stat-card {
            padding: 12px 15px;
          }

          .walkin-stat-card .stat-value {
            font-size: 20px;
          }

          .walkin-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .walkin-status-msg {
            margin-left: 0;
            text-align: center;
          }

          .walkin-card-grid {
            grid-template-columns: 1fr;
          }

          .walkin-table {
            font-size: 12px;
            min-width: 400px;
          }

          .walkin-table th,
          .walkin-table td {
            padding: 6px 8px;
          }

          .walkin-dialog {
            padding: 20px;
            max-width: 95%;
          }

          .walkin-dialog .dialog-actions {
            flex-direction: column;
          }

          .walkin-dialog .dialog-actions button {
            width: 100%;
          }

          .walkin-floating-btn {
            width: 50px;
            height: 50px;
            font-size: 26px;
            bottom: 20px;
            right: 20px;
          }
        }

        @media (max-width: 480px) {
          .walkin-modal {
            padding: 12px;
          }

          .walkin-header h2 {
            font-size: 16px;
          }

          .walkin-close-btn {
            font-size: 12px;
            padding: 6px 12px;
            min-height: 32px;
          }

          .walkin-stats {
            grid-template-columns: 1fr;
          }

          .walkin-stat-card {
            padding: 10px 12px;
          }

          .walkin-stat-card .stat-value {
            font-size: 18px;
          }

          .walkin-stat-card .stat-icon {
            font-size: 20px;
          }

          .walkin-table {
            font-size: 11px;
            min-width: 320px;
          }

          .walkin-table th,
          .walkin-table td {
            padding: 4px 6px;
          }

          .walkin-mini-btn {
            font-size: 10px;
            padding: 3px 8px;
            min-height: 24px;
          }

          .walkin-card {
            padding: 12px;
          }

          .walkin-dialog {
            padding: 16px;
          }

          .walkin-dialog h3 {
            font-size: 16px;
          }

          .walkin-dialog .form-group select,
          .walkin-dialog .form-group input,
          .walkin-dialog .form-group textarea {
            font-size: 15px;
            min-height: 36px;
          }

          .walkin-dialog .time-group input {
            width: 60px;
          }

          .walkin-floating-btn {
            width: 44px;
            height: 44px;
            font-size: 22px;
            bottom: 15px;
            right: 15px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .walkin-modal {
            max-width: 90%;
          }

          .walkin-stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .walkin-modal {
            background: #1a1a2e;
          }

          .walkin-header h2 {
            color: #ecf0f1;
          }

          .walkin-close-btn {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .walkin-close-btn:hover {
            background: #3d3d5c;
          }

          .walkin-stat-card {
            background: #2d2d44;
          }

          .walkin-stat-card .stat-label {
            color: #b0b0b0;
          }

          .walkin-stat-card .stat-value {
            color: #4299e1;
          }

          .walkin-content {
            background: #2d2d44;
          }

          .walkin-table th {
            background: #1a1a2e;
            color: #ecf0f1;
            border-bottom-color: #3d3d5c;
          }

          .walkin-table td {
            color: #b0b0b0;
            border-bottom-color: #3d3d5c;
          }

          .walkin-table tr:hover td {
            background: #1a1a2e;
          }

          .walkin-toggle-btn {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #b0b0b0;
          }

          .walkin-toggle-btn.active {
            background: #4299e1;
            color: white;
            border-color: #4299e1;
          }

          .walkin-toggle-btn:hover:not(.active) {
            background: #3d3d5c;
          }

          .walkin-status-msg {
            color: #b0b0b0;
          }

          .walkin-card {
            background: #2d2d44;
            border-color: #3d3d5c;
          }

          .walkin-card-body {
            color: #b0b0b0;
          }

          .walkin-card-notes {
            color: #888;
            border-top-color: #3d3d5c;
          }

          .walkin-card-status.created {
            background: #3182ce;
          }

          .walkin-card-status.closed {
            background: #718096;
          }

          .walkin-dialog {
            background: #1a1a2e;
          }

          .walkin-dialog h3 {
            color: #ecf0f1;
          }

          .walkin-dialog .form-group select,
          .walkin-dialog .form-group input,
          .walkin-dialog .form-group textarea {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .walkin-dialog .form-group select:focus,
          .walkin-dialog .form-group input:focus,
          .walkin-dialog .form-group textarea:focus {
            border-color: #4299e1;
          }

          .walkin-dialog .dialog-actions .btn-cancel {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .walkin-dialog .dialog-actions .btn-cancel:hover:not(:disabled) {
            background: #3d3d5c;
          }

          .walkin-loading {
            color: #666;
          }

          .walkin-empty {
            color: #666;
          }

          .walkin-mini-btn.primary {
            background: #3182ce;
          }

          .walkin-mini-btn.primary:hover:not(:disabled) {
            background: #4299e1;
          }

          .walkin-mini-btn.danger {
            background: #c53030;
          }

          .walkin-mini-btn.danger:hover:not(:disabled) {
            background: #fc8181;
          }
        }
      `}</style>

      <div className="walkin-overlay" onClick={onClose}>
        <div className={`walkin-modal ${isRTL ? 'rtl' : ''}`} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="walkin-header">
            <h2>🚶 {t.title}</h2>
            <button className="walkin-close-btn" onClick={onClose}>
              ✕ {t.btn.close}
            </button>
          </div>

          {/* Stats cards */}
          <div className="walkin-stats">
            <div className="walkin-stat-card" style={{ borderColor: '#4299e1' }}>
              <div className="stat-icon">📊</div>
              <div className="stat-value" style={{ color: '#4299e1' }}>{stats.total}</div>
              <div className="stat-label">{t.stats.total}</div>
            </div>
            <div className="walkin-stat-card" style={{ borderColor: '#48bb78' }}>
              <div className="stat-icon">✅</div>
              <div className="stat-value" style={{ color: '#48bb78' }}>{stats.active}</div>
              <div className="stat-label">{t.stats.active}</div>
            </div>
            <div className="walkin-stat-card" style={{ borderColor: '#fc8181' }}>
              <div className="stat-icon">❌</div>
              <div className="stat-value" style={{ color: '#fc8181' }}>{stats.cancelled}</div>
              <div className="stat-label">{t.stats.cancelled}</div>
            </div>
          </div>

          {/* View toggle */}
          <div className="walkin-toolbar">
            <button
              className={`walkin-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              📋 {t.btn.table}
            </button>
            <button
              className={`walkin-toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              🃏 {t.btn.cards}
            </button>
            <span className="walkin-status-msg">{statusMsg}</span>
          </div>

          {/* Content */}
          <div className="walkin-content">
            {loading ? (
              <div className="walkin-loading">⏳ {t.status.loading}</div>
            ) : visits.length === 0 ? (
              <div className="walkin-empty">📭 {t.label.noVisits}</div>
            ) : viewMode === 'table' ? (
              <div className="walkin-table-wrapper">
                <table className="walkin-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>{t.table.patient}</th>
                      <th>{t.table.doctor}</th>
                      <th>{t.table.section}</th>
                      <th>{t.table.room}</th>
                      <th>{t.table.time}</th>
                      <th>{t.table.status}</th>
                      <th>{t.table.actions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.map(v => {
                      const colorMap = {
                        CANCELLED: '#e53e3e',
                        IN_PROGRESS: '#d69e2e',
                        CREATED: '#3182ce',
                        CLOSED: '#718096',
                      };
                      const isCancelDisabled = v.status === 'CLOSED' || v.status === 'CANCELLED';
                      return (
                        <tr key={v.id}>
                          <td>{v.id}</td>
                          <td>{v.patientName || 'N/A'}</td>
                          <td>{v.doctor?.fullName || v.doctorName || 'N/A'}</td>
                          <td>{v.room?.section?.name || v.sectionName || 'N/A'}</td>
                          <td>{v.room?.roomNumber || v.roomNumber || 'N/A'}</td>
                          <td>{formatVisitTime(v.visitTime)}</td>
                          <td style={{ color: colorMap[v.status] || 'black', fontWeight: 'bold' }}>{v.status}</td>
                          <td>
                            <div className="walkin-actions">
                              {v.status === 'CREATED' && (
                                <button className="walkin-mini-btn primary" onClick={() => handleOpenVisit(v.id)}>
                                  {t.btn.openVisit}
                                </button>
                              )}
                              <button 
                                className="walkin-mini-btn danger" 
                                onClick={() => handleCancelVisit(v.id)}
                                disabled={isCancelDisabled}
                              >
                                {t.btn.cancel}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="walkin-card-grid">
                {visits.map(v => {
                  const statusClass = v.status === 'CANCELLED' ? 'cancelled'
                    : v.status === 'IN_PROGRESS' ? 'inprogress'
                    : v.status === 'CREATED' ? 'created'
                    : 'closed';
                  const isCancelDisabled = v.status === 'CLOSED' || v.status === 'CANCELLED';
                  return (
                    <div key={v.id} className="walkin-card">
                      <div className="walkin-card-header">
                        <span className="walkin-card-id">#{v.id}</span>
                        <span className="walkin-card-patient">{v.patientName || 'N/A'}</span>
                        <span className={`walkin-card-status ${statusClass}`}>{v.status}</span>
                      </div>
                      <div className="walkin-card-body">
                        <div className="detail">👨‍⚕️ {v.doctor?.fullName || v.doctorName || 'N/A'}</div>
                        <div className="detail" style={{ display: 'flex', gap: 12 }}>
                          <span>🏥 {v.room?.roomNumber || v.roomNumber || 'N/A'}</span>
                          <span>📋 {v.room?.section?.name || v.sectionName || 'N/A'}</span>
                        </div>
                        <div className="detail">🕐 {formatVisitTime(v.visitTime) || 'N/A'}</div>
                        {v.notes && (
                          <div className="walkin-card-notes">📝 {v.notes}</div>
                        )}
                      </div>
                      <div className="walkin-card-actions">
                        {v.status === 'CREATED' && (
                          <button className="walkin-mini-btn primary" onClick={() => handleOpenVisit(v.id)}>
                            {t.btn.openVisit}
                          </button>
                        )}
                        <button 
                          className="walkin-mini-btn danger" 
                          onClick={() => handleCancelVisit(v.id)}
                          disabled={isCancelDisabled}
                        >
                          {t.btn.cancel}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Floating Add Button */}
          <button 
            className="walkin-floating-btn"
            onClick={() => {
              const nextH = getNextHour();
              setVisitHour(String(nextH));
              setVisitMinute('00');
              setShowAddDialog(true);
            }}
          >
            +
          </button>

          {/* Add Visit Dialog */}
          {showAddDialog && (
            <div className="walkin-dialog-overlay" onClick={() => setShowAddDialog(false)}>
              <div className="walkin-dialog" onClick={(e) => e.stopPropagation()}>
                <h3>🚶 {t.dialog.addVisit}</h3>
                <div className="form-group">
                  <select 
                    value={selectedSection} 
                    onChange={e => {
                      const val = e.target.value;
                      setSelectedSection(val);
                      fetchRoomsBySection(val);
                      setSelectedRoom('');
                    }}
                  >
                    <option value="">{t.prompt.section}</option>
                    {sections.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <select 
                    value={selectedRoom} 
                    onChange={e => setSelectedRoom(e.target.value)}
                    disabled={!selectedSection}
                  >
                    <option value="">{t.prompt.room}</option>
                    {rooms.map(r => (
                      <option key={r.id} value={r.id}>{r.roomNumber} - {r.section?.name || ''}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <select 
                    value={selectedDoctor} 
                    onChange={e => setSelectedDoctor(e.target.value)}
                  >
                    <option value="">{t.prompt.doctor}</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.firstName} {d.middleName} {d.lastName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    value={visitDate}
                    onChange={e => setVisitDate(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <div className="time-group">
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={visitHour}
                      onChange={e => setVisitHour(e.target.value)}
                    />
                    <span>:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={visitMinute}
                      onChange={e => setVisitMinute(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder={t.prompt.notes}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="dialog-actions">
                  <button className="btn-cancel" onClick={() => setShowAddDialog(false)}>
                    {t.btn.close}
                  </button>
                  <button className="btn-add" onClick={handleAddVisit} disabled={addLoading}>
                    {addLoading ? '⏳' : t.btn.addVisit}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WalkInScreen;