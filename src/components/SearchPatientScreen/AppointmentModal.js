// // import React, { useState, useEffect, useCallback } from 'react';
// // import { BASE_URL } from '../../utils/api';
// // import { appointmentTranslations } from '../../i18n/appointmentTranslations';

// // const API_APPOINTMENTS = `${BASE_URL}/api/appointments`;
// // const API_SECTIONS = `${BASE_URL}/api/sections`;
// // const API_ROOMS_BY_SECTION = `${BASE_URL}/api/rooms/section`;
// // const API_DOCTORS = `${BASE_URL}/api/doctors`;
// // const API_LOG = `${BASE_URL}/api/logs/add`;

// // const AppointmentModal = ({ patientId, loggedUser, lang = 'en', onClose }) => {
// //   const t = appointmentTranslations[lang] || appointmentTranslations.en;
// //   const isRTL = lang === 'ar';

// //   // ----- State for appointments and stats -----
// //   const [appointments, setAppointments] = useState([]);
// //   const [stats, setStats] = useState({ total: 0, active: 0, cancelled: 0 });

// //   // ----- State for form (add appointment) -----
// //   const [sections, setSections] = useState([]);
// //   const [rooms, setRooms] = useState([]);
// //   const [doctors, setDoctors] = useState([]);
// //   const [selectedSection, setSelectedSection] = useState('');
// //   const [selectedRoom, setSelectedRoom] = useState('');
// //   const [selectedDoctor, setSelectedDoctor] = useState('');
// //   const [appointmentDate, setAppointmentDate] = useState('');
// //   const [appointmentHour, setAppointmentHour] = useState(new Date().getHours() + 1);
// //   const [appointmentMinute, setAppointmentMinute] = useState(0);
// //   const [notes, setNotes] = useState('');
// //   const [showAddDialog, setShowAddDialog] = useState(false);

// //   // ----- UI state -----
// //   const [loading, setLoading] = useState(false);
// //   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);

// //   // ----- Helper: log action -----
// //   const logAction = useCallback(async (action, details) => {
// //     try {
// //       await fetch(API_LOG, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ username: loggedUser, action, details }),
// //       });
// //     } catch (e) { /* ignore */ }
// //   }, [loggedUser]);

// //   // ----- Fetch appointments -----
// //   const fetchAppointments = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch(`${API_APPOINTMENTS}/patient/${patientId}`);
// //       if (!res.ok) throw new Error('Failed to load appointments');
// //       const data = await res.json();

// //       const formatted = data.map(a => ({
// //         id: a.id,
// //         doctorId: a.doctor?.id || null,
// //         doctorName: a.doctor ? `${a.doctor.firstName} ${a.doctor.middleName || ''} ${a.doctor.lastName}`.replace(/\s+/g, ' ').trim() : '',
// //         appointmentTime: a.appointmentTime,
// //         notes: a.notes || '',
// //         patientName: a.patient ? `${a.patient.firstName} ${a.patient.middleName || ''} ${a.patient.lastName}`.replace(/\s+/g, ' ').trim() : '',
// //         dob: a.patient?.dob || 'N/A',
// //         age: a.patient?.dob ? Math.floor((new Date() - new Date(a.patient.dob)) / (365.25 * 24 * 60 * 60 * 1000)) : 'N/A',
// //         gender: a.patient?.gender || 'N/A',
// //         patientId: a.patient?.id,
// //         status: a.status || 'NEW',
// //         roomNumber: a.room?.roomNumber || '',
// //         sectionName: a.room?.section?.name || '',
// //       }));

// //       setAppointments(formatted);
// //       const total = formatted.length;
// //       const active = formatted.filter(a => ['IN_PROGRESS', 'ATTENDED'].includes(a.status)).length;
// //       const cancelled = formatted.filter(a => a.status === 'CANCELLED').length;
// //       setStats({ total, active, cancelled });
// //       setStatusMsg(`✅ ${t.status.loaded}`);
// //     } catch (err) {
// //       setStatusMsg(`❌ ${t.alert.errorLoadAppointments}: ${err.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [patientId, t]);

// //   // ----- Fetch sections -----
// //   const fetchSections = useCallback(async () => {
// //     try {
// //       const res = await fetch(API_SECTIONS);
// //       if (!res.ok) throw new Error('Failed to load sections');
// //       const data = await res.json();
// //       setSections(data.map(s => ({ id: s.id, name: s.name })));
// //     } catch (err) {
// //       console.error('Sections error:', err);
// //     }
// //   }, []);

// //   // ----- Fetch doctors -----
// //   const fetchDoctors = useCallback(async () => {
// //     try {
// //       const res = await fetch(API_DOCTORS);
// //       if (!res.ok) throw new Error('Failed to load doctors');
// //       const data = await res.json();
// //       setDoctors(data.map(d => ({
// //         id: d.id,
// //         fullName: `${d.firstName} ${d.middleName || ''} ${d.lastName}`.replace(/\s+/g, ' ').trim(),
// //         specialty: d.specialty || '',
// //       })));
// //     } catch (err) {
// //       console.error('Doctors error:', err);
// //     }
// //   }, []);

// //   // ----- Fetch rooms by section -----
// //   const fetchRoomsBySection = useCallback(async (sectionId) => {
// //     if (!sectionId) {
// //       setRooms([]);
// //       return;
// //     }
// //     try {
// //       const res = await fetch(`${API_ROOMS_BY_SECTION}/${sectionId}`);
// //       if (!res.ok) throw new Error('Failed to load rooms');
// //       const data = await res.json();
// //       setRooms(data.map(r => ({
// //         id: r.id,
// //         roomNumber: r.roomNumber,
// //         sectionName: r.section?.name || '',
// //       })));
// //     } catch (err) {
// //       console.error('Rooms error:', err);
// //     }
// //   }, []);

// //   // ----- Initial load -----
// //   useEffect(() => {
// //     fetchAppointments();
// //     fetchSections();
// //     fetchDoctors();
// //     logAction('OPEN_APPOINTMENT_SCREEN', `Opened appointment screen for patientId=${patientId}`);
// //   }, [fetchAppointments, fetchSections, fetchDoctors, logAction, patientId]);

// //   // ----- When section changes, fetch rooms -----
// //   useEffect(() => {
// //     if (selectedSection) {
// //       fetchRoomsBySection(selectedSection);
// //     } else {
// //       setRooms([]);
// //     }
// //   }, [selectedSection, fetchRoomsBySection]);

// //   // ----- Create appointment -----
// //   const createAppointment = async (roomId, doctorId, dateTimeStr, notesText) => {
// //     try {
// //       const url = `${API_APPOINTMENTS}/patient/${patientId}/room/${roomId}/doctor/${doctorId}`;
// //       const payload = {
// //         appointmentTime: dateTimeStr,
// //         notes: notesText,
// //         status: 'NEW',
// //       };
// //       const res = await fetch(url, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload),
// //       });
// //       if (!res.ok) {
// //         const errorText = await res.text();
// //         throw new Error(`HTTP ${res.status} - ${errorText}`);
// //       }
// //       await fetchAppointments();
// //       logAction('CREATE_APPOINTMENT', `Created appointment for patient ID ${patientId}`);
// //       setStatusMsg(`✅ ${t.status.added}`);
// //       setNotes('');
// //       setSelectedSection('');
// //       setSelectedRoom('');
// //       setSelectedDoctor('');
// //       setAppointmentDate('');
// //       setAppointmentHour(new Date().getHours() + 1);
// //       setAppointmentMinute(0);
// //     } catch (err) {
// //       setStatusMsg(`❌ ${t.alert.errorCreateAppointment}: ${err.message}`);
// //     }
// //   };

// //   // ----- Handle add appointment -----
// //   const handleAddAppointment = () => {
// //     if (!selectedRoom || !selectedDoctor || !appointmentDate) {
// //       setStatusMsg(`⚠️ ${t.alert.completeFields}`);
// //       return;
// //     }
// //     const dateTimeStr = `${appointmentDate}T${String(appointmentHour).padStart(2, '0')}:${String(appointmentMinute).padStart(2, '0')}:00`;
// //     const dateTime = new Date(dateTimeStr);
// //     if (dateTime < new Date()) {
// //       setStatusMsg(`⚠️ ${t.alert.pastDate}`);
// //       return;
// //     }
// //     createAppointment(selectedRoom, selectedDoctor, dateTimeStr, notes);
// //     setShowAddDialog(false);
// //   };

// //   // ----- Attend appointment -----
// //   const attendAppointment = async (appointmentId) => {
// //     try {
// //       const res = await fetch(`${API_APPOINTMENTS}/${appointmentId}/attend?username=${loggedUser}`, {
// //         method: 'PUT',
// //       });
// //       if (!res.ok) {
// //         const errorText = await res.text();
// //         throw new Error(errorText);
// //       }
// //       await fetchAppointments();
// //       logAction('ATTEND_APPOINTMENT', `Marked appointment ID ${appointmentId} as ATTENDED`);
// //     } catch (err) {
// //       setStatusMsg(`❌ ${err.message}`);
// //     }
// //   };

// //   // ----- Start visit (open visit) -----
// //   const startVisit = async (appointmentId) => {
// //     try {
// //       const res = await fetch(`${API_APPOINTMENTS}/${appointmentId}/start?username=${loggedUser}`, {
// //         method: 'PUT',
// //       });
// //       if (!res.ok) {
// //         const errorText = await res.text();
// //         throw new Error(errorText);
// //       }
// //       await fetchAppointments();
// //       logAction('OPEN_VISIT', `Opened visit for appointment ID ${appointmentId}`);
// //     } catch (err) {
// //       setStatusMsg(`❌ ${err.message}`);
// //     }
// //   };

// //   // ----- Cancel appointment -----
// //   const cancelAppointment = async (appointmentId) => {
// //     const reason = prompt(t.dialog.cancel.content);
// //     if (reason === null) return;
// //     if (reason.trim() === '') {
// //       setStatusMsg(`⚠️ ${t.alert.cancelReasonRequired}`);
// //       return;
// //     }
// //     try {
// //       const encodedReason = encodeURIComponent(reason);
// //       const res = await fetch(`${API_APPOINTMENTS}/${appointmentId}/cancel?username=${loggedUser}&reason=${encodedReason}`, {
// //         method: 'PUT',
// //       });
// //       if (!res.ok) {
// //         const errorText = await res.text();
// //         throw new Error(errorText);
// //       }
// //       await fetchAppointments();
// //       logAction('CANCEL_APPOINTMENT', `Cancelled appointment ID ${appointmentId} | Reason: ${reason}`);
// //     } catch (err) {
// //       setStatusMsg(`❌ ${err.message}`);
// //     }
// //   };

// //   // ----- Render table row actions -----
// //   const renderActions = (appt) => {
// //     const isNew = appt.status === 'NEW';
// //     const isAttended = appt.status === 'ATTENDED';
// //     const isCancelledOrClosed = ['CANCELLED', 'CLOSED'].includes(appt.status);
// //     const canAttend = isNew;
// //     const canStartVisit = isAttended;
// //     const canCancel = !isCancelledOrClosed;

// //     return (
// //       <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
// //         <label style={{ display: 'flex', alignItems: 'center', fontSize: 13 }}>
// //           <input
// //             type="checkbox"
// //             checked={isAttended || appt.status === 'IN_PROGRESS' || appt.status === 'CLOSED'}
// //             disabled={!canAttend}
// //             onChange={() => attendAppointment(appt.id)}
// //           />
// //           <span style={{ marginLeft: 4 }}>{t.chk.attended}</span>
// //         </label>
// //         {canStartVisit && (
// //           <button
// //             onClick={() => startVisit(appt.id)}
// //             style={{ ...miniBtn, background: '#4299e1' }}
// //           >
// //             {t.btn.openVisit}
// //           </button>
// //         )}
// //         {canCancel && (
// //           <button
// //             onClick={() => cancelAppointment(appt.id)}
// //             style={{ ...miniBtn, background: '#fc8181' }}
// //           >
// //             {t.btn.cancel}
// //           </button>
// //         )}
// //       </div>
// //     );
// //   };

// //   // ----- Render -----
// //   return (
// //     <div style={modalOverlay}>
// //       <div style={{ ...modalContent, direction: isRTL ? 'rtl' : 'ltr' }}>
// //         {/* Header */}
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
// //           <h2>📅 {t.title}</h2>
// //           <button onClick={onClose} style={closeBtn}>✕</button>
// //         </div>

// //         {/* Stats Cards */}
// //         <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
// //           <StatCard icon="📊" label={t.stat.total} value={stats.total} color="#4299e1" />
// //           <StatCard icon="✅" label={t.stat.active} value={stats.active} color="#48bb78" />
// //           <StatCard icon="❌" label={t.stat.cancelled} value={stats.cancelled} color="#fc8181" />
// //         </div>

// //         {/* Status */}
// //         <div style={{ marginBottom: 10, color: '#4a5568' }}>{statusMsg}</div>

// //         {/* Table */}
// //         {loading ? (
// //           <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
// //         ) : appointments.length === 0 ? (
// //           <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.status.noAppointments}</div>
// //         ) : (
// //           <div style={{ overflowX: 'auto' }}>
// //             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
// //               <thead>
// //                 <tr>
// //                   <th style={thStyle}>{t.table.id}</th>
// //                   <th style={thStyle}>{t.table.doctor}</th>
// //                   <th style={thStyle}>{t.table.section}</th>
// //                   <th style={thStyle}>{t.table.room}</th>
// //                   <th style={thStyle}>{t.table.time}</th>
// //                   <th style={thStyle}>{t.table.status}</th>
// //                   <th style={thStyle}>{t.table.actions}</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {appointments.map(appt => {
// //                   const statusColor = {
// //                     NEW: '#dbeafe',
// //                     ATTENDED: '#fff3cd',
// //                     IN_PROGRESS: '#d4edda',
// //                     CANCELLED: '#f8d7da',
// //                     CLOSED: '#f8d7da',
// //                   }[appt.status] || 'white';

// //                   return (
// //                     <tr key={appt.id} style={{ background: statusColor, borderBottom: '1px solid #eee' }}>
// //                       <td style={tdStyle}>{appt.id}</td>
// //                       <td style={tdStyle}>{appt.doctorName}</td>
// //                       <td style={tdStyle}>{appt.sectionName}</td>
// //                       <td style={tdStyle}>{appt.roomNumber}</td>
// //                       <td style={tdStyle}>
// //                         {appt.appointmentTime ? new Date(appt.appointmentTime).toLocaleString() : ''}
// //                       </td>
// //                       <td style={tdStyle}>{appt.status}</td>
// //                       <td style={tdStyle}>{renderActions(appt)}</td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Floating Add Button */}
// //         <button
// //           onClick={() => setShowAddDialog(true)}
// //           style={{
// //             position: 'fixed',
// //             bottom: 40,
// //             right: 40,
// //             background: 'linear-gradient(to bottom, #48bb78, #38a169)',
// //             color: 'white',
// //             fontSize: 32,
// //             fontWeight: 'bold',
// //             borderRadius: 35,
// //             padding: '15px 25px',
// //             border: 'none',
// //             cursor: 'pointer',
// //             boxShadow: '0 4px 12px rgba(72, 187, 120, 0.5)',
// //             zIndex: 1100,
// //           }}
// //         >
// //           +
// //         </button>

// //         {/* Add Appointment Dialog Modal */}
// //         {showAddDialog && (
// //           <div style={dialogOverlay}>
// //             <div style={dialogContent}>
// //               <h3>➕ {t.dialog.addAppointment}</h3>
// //               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15, marginTop: 15 }}>
// //                 {/* Section */}
// //                 <label style={{ fontWeight: 'bold' }}>{t.prompt.section}</label>
// //                 <select
// //                   value={selectedSection}
// //                   onChange={e => setSelectedSection(e.target.value)}
// //                   style={inputStyle}
// //                 >
// //                   <option value="">{t.prompt.section}</option>
// //                   {sections.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
// //                 </select>

// //                 {/* Room */}
// //                 <label style={{ fontWeight: 'bold' }}>{t.prompt.room}</label>
// //                 <select
// //                   value={selectedRoom}
// //                   onChange={e => setSelectedRoom(e.target.value)}
// //                   style={inputStyle}
// //                   disabled={!selectedSection}
// //                 >
// //                   <option value="">{t.prompt.room}</option>
// //                   {rooms.map(r => <option key={r.id} value={r.id}>{r.roomNumber} - {r.sectionName}</option>)}
// //                 </select>

// //                 {/* Doctor */}
// //                 <label style={{ fontWeight: 'bold' }}>{t.prompt.doctor}</label>
// //                 <select
// //                   value={selectedDoctor}
// //                   onChange={e => setSelectedDoctor(e.target.value)}
// //                   style={inputStyle}
// //                 >
// //                   <option value="">{t.prompt.doctor}</option>
// //                   {doctors.map(d => <option key={d.id} value={d.id}>{d.fullName}</option>)}
// //                 </select>

// //                 {/* Date and Time */}
// //                 <label style={{ fontWeight: 'bold' }}>{t.label.time}</label>
// //                 <div style={{ display: 'flex', gap: 8 }}>
// //                   <input
// //                     type="date"
// //                     value={appointmentDate}
// //                     onChange={e => setAppointmentDate(e.target.value)}
// //                     style={{ ...inputStyle, flex: 1 }}
// //                   />
// //                   <input
// //                     type="number"
// //                     min="0"
// //                     max="23"
// //                     value={appointmentHour}
// //                     onChange={e => setAppointmentHour(parseInt(e.target.value) || 0)}
// //                     style={{ ...inputStyle, width: 60 }}
// //                   />
// //                   <span style={{ alignSelf: 'center' }}>:</span>
// //                   <input
// //                     type="number"
// //                     min="0"
// //                     max="59"
// //                     value={appointmentMinute}
// //                     onChange={e => setAppointmentMinute(parseInt(e.target.value) || 0)}
// //                     style={{ ...inputStyle, width: 60 }}
// //                   />
// //                 </div>

// //                 {/* Notes */}
// //                 <label style={{ fontWeight: 'bold' }}>{t.txt.notes}</label>
// //                 <input
// //                   type="text"
// //                   value={notes}
// //                   onChange={e => setNotes(e.target.value)}
// //                   placeholder={t.txt.notes}
// //                   style={inputStyle}
// //                 />
// //               </div>

// //               <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
// //                 <button onClick={() => setShowAddDialog(false)} style={secondaryBtn}>
// //                   {t.btn.cancel}
// //                 </button>
// //                 <button onClick={handleAddAppointment} style={primaryBtn('#48bb78')}>
// //                   {t.btn.add}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // // ----- Sub-components -----
// // const StatCard = ({ icon, label, value, color }) => (
// //   <div style={{
// //     background: 'white',
// //     borderRadius: 12,
// //     padding: '15px 20px',
// //     boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
// //     borderLeft: `4px solid ${color}`,
// //     flex: 1,
// //     minWidth: 150,
// //   }}>
// //     <span style={{ fontSize: 24 }}>{icon}</span>
// //     <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
// //     <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
// //   </div>
// // );

// // // ----- Styles (matching WalkInScreen size) -----
// // const modalOverlay = {
// //   position: 'fixed',
// //   top: 0,
// //   left: 0,
// //   right: 0,
// //   bottom: 0,
// //   background: 'rgba(0,0,0,0.5)',
// //   display: 'flex',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   zIndex: 1000,
// // };

// // const modalContent = {
// //   background: 'white',
// //   borderRadius: 12,
// //   padding: 20,
// //   minWidth: 600,      // 👈 matches WalkInScreen
// //   maxWidth: 1000,     // 👈 matches WalkInScreen
// //   width: '90%',
// //   maxHeight: '90vh',
// //   overflowY: 'auto',
// //   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// //   position: 'relative',
// // };

// // const dialogOverlay = {
// //   position: 'fixed',
// //   top: 0,
// //   left: 0,
// //   right: 0,
// //   bottom: 0,
// //   background: 'rgba(0,0,0,0.4)',
// //   display: 'flex',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   zIndex: 1200,
// // };

// // const dialogContent = {
// //   background: 'white',
// //   borderRadius: 12,
// //   padding: 20,
// //   maxWidth: 500,
// //   width: '90%',
// //   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// // };

// // const inputStyle = {
// //   width: '100%',
// //   padding: '8px 12px',
// //   borderRadius: 8,
// //   border: '1px solid #e2e8f0',
// //   fontSize: 14,
// // };

// // const thStyle = {
// //   padding: 10,
// //   background: '#f8f9fa',
// //   textAlign: 'left',
// //   borderBottom: '2px solid #e2e8f0',
// // };

// // const tdStyle = {
// //   padding: 10,
// //   borderBottom: '1px solid #e2e8f0',
// // };

// // const primaryBtn = (bg) => ({
// //   background: bg,
// //   color: 'white',
// //   fontWeight: 'bold',
// //   border: 'none',
// //   borderRadius: 8,
// //   padding: '8px 20px',
// //   cursor: 'pointer',
// // });

// // const secondaryBtn = {
// //   background: '#e2e8f0',
// //   border: 'none',
// //   padding: '8px 20px',
// //   borderRadius: 8,
// //   cursor: 'pointer',
// // };

// // const closeBtn = {
// //   background: 'transparent',
// //   border: 'none',
// //   fontSize: 24,
// //   cursor: 'pointer',
// //   color: '#a0aec0',
// // };

// // const miniBtn = {
// //   color: 'white',
// //   border: 'none',
// //   borderRadius: 6,
// //   padding: '4px 10px',
// //   cursor: 'pointer',
// //   fontSize: 12,
// // };

// // export default AppointmentModal;

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import { appointmentTranslations } from '../../i18n/appointmentTranslations';

// const API_APPOINTMENTS = `${BASE_URL}/api/appointments`;
// const API_SECTIONS = `${BASE_URL}/api/sections`;
// const API_ROOMS_BY_SECTION = `${BASE_URL}/api/rooms/section`;
// const API_DOCTORS = `${BASE_URL}/api/doctors`;

// // ---------- Helper: format date/time ----------
// const formatAppointmentTime = (isoString) => {
//   if (!isoString) return '';
//   const d = new Date(isoString);
//   return d.toLocaleString('en-GB', { hour12: false });
// };

// // ---------- Main Component ----------
// const AppointmentModal = ({ patientId, loggedUser, lang = 'en', onClose }) => {
//   const t = appointmentTranslations[lang] || appointmentTranslations.en;
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [appointments, setAppointments] = useState([]);
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [stats, setStats] = useState({ total: 0, active: 0, cancelled: 0 });
//   const [showAddDialog, setShowAddDialog] = useState(false);

//   // Form fields for adding appointment
//   const [sections, setSections] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [selectedSection, setSelectedSection] = useState('');
//   const [selectedRoom, setSelectedRoom] = useState('');
//   const [selectedDoctor, setSelectedDoctor] = useState('');
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [appointmentHour, setAppointmentHour] = useState(new Date().getHours() + 1);
//   const [appointmentMinute, setAppointmentMinute] = useState(0);
//   const [notes, setNotes] = useState('');
//   const [addLoading, setAddLoading] = useState(false);

//   // ---------- Fetch appointments ----------
//   const fetchAppointments = useCallback(async () => {
//     if (!patientId) return;
//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.loading}`);
//     try {
//       const res = await fetch(`${API_APPOINTMENTS}/patient/${patientId}`);
//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(`HTTP ${res.status} - ${text}`);
//       }
//       const data = await res.json();

//       const formatted = data.map(a => ({
//         id: a.id,
//         doctorName: a.doctor ? `${a.doctor.firstName} ${a.doctor.middleName || ''} ${a.doctor.lastName}`.replace(/\s+/g, ' ').trim() : '',
//         appointmentTime: a.appointmentTime,
//         notes: a.notes || '',
//         status: a.status || 'NEW',
//         roomNumber: a.room?.roomNumber || '',
//         sectionName: a.room?.section?.name || '',
//         patientName: a.patient ? `${a.patient.firstName} ${a.patient.middleName || ''} ${a.patient.lastName}`.replace(/\s+/g, ' ').trim() : '',
//       }));

//       setAppointments(formatted);
//       const total = formatted.length;
//       const active = formatted.filter(a => ['IN_PROGRESS', 'ATTENDED'].includes(a.status)).length;
//       const cancelled = formatted.filter(a => a.status === 'CANCELLED').length;
//       setStats({ total, active, cancelled });
//       setStatusMsg(`✅ ${t.status.loaded} (${total} ${t.stat.total})`);
//     } catch (err) {
//       setStatusMsg(`❌ ${t.status.error}: ${err.message}`);
//       setAppointments([]);
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
//       setSections(data.map(s => ({ id: s.id, name: s.name })));
//     } catch (e) {
//       console.error('Failed to load sections');
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
//       setRooms(data.map(r => ({
//         id: r.id,
//         roomNumber: r.roomNumber,
//         sectionName: r.section?.name || '',
//       })));
//     } catch (e) {
//       console.error('Failed to load rooms');
//     }
//   }, []);

//   const fetchDoctors = useCallback(async () => {
//     try {
//       const res = await fetch(API_DOCTORS);
//       if (!res.ok) throw new Error();
//       const data = await res.json();
//       setDoctors(data.map(d => ({
//         id: d.id,
//         fullName: `${d.firstName} ${d.middleName || ''} ${d.lastName}`.replace(/\s+/g, ' ').trim(),
//       })));
//     } catch (e) {
//       console.error('Failed to load doctors');
//     }
//   }, []);

//   // ---------- Load initial data ----------
//   useEffect(() => {
//     if (patientId) {
//       fetchAppointments();
//       fetchSections();
//       fetchDoctors();
//     }
//   }, [patientId, fetchAppointments, fetchSections, fetchDoctors]);

//   // ---------- When section changes, fetch rooms ----------
//   useEffect(() => {
//     if (selectedSection) {
//       fetchRoomsBySection(selectedSection);
//     } else {
//       setRooms([]);
//     }
//   }, [selectedSection, fetchRoomsBySection]);

//   // ---------- Handlers for appointment actions ----------
//   const handleAttend = async (appointmentId) => {
//     try {
//       const res = await fetch(`${API_APPOINTMENTS}/${appointmentId}/attend?username=${loggedUser}`, { method: 'PUT' });
//       if (!res.ok) throw new Error('Failed to attend');
//       await fetchAppointments();
//       setStatusMsg(`✅ Appointment #${appointmentId} attended`);
//     } catch (err) {
//       setStatusMsg(`❌ ${err.message}`);
//     }
//   };

//   const handleStartVisit = async (appointmentId) => {
//     try {
//       const res = await fetch(`${API_APPOINTMENTS}/${appointmentId}/start?username=${loggedUser}`, { method: 'PUT' });
//       if (!res.ok) throw new Error('Failed to start visit');
//       await fetchAppointments();
//       setStatusMsg(`✅ Visit started for appointment #${appointmentId}`);
//     } catch (err) {
//       setStatusMsg(`❌ ${err.message}`);
//     }
//   };

//   const handleCancel = async (appointmentId) => {
//     const reason = prompt(t.dialog.cancel.content);
//     if (reason === null) return;
//     if (reason.trim() === '') {
//       setStatusMsg(`⚠️ ${t.alert.cancelReasonRequired}`);
//       return;
//     }
//     try {
//       const encodedReason = encodeURIComponent(reason);
//       const res = await fetch(
//         `${API_APPOINTMENTS}/${appointmentId}/cancel?username=${loggedUser}&reason=${encodedReason}`,
//         { method: 'PUT' }
//       );
//       if (!res.ok) throw new Error('Failed to cancel');
//       await fetchAppointments();
//       setStatusMsg(`✅ Appointment #${appointmentId} cancelled`);
//     } catch (err) {
//       setStatusMsg(`❌ ${err.message}`);
//     }
//   };

//   // ---------- Add appointment ----------
//   const handleAddAppointment = async () => {
//     if (!selectedRoom || !selectedDoctor || !appointmentDate) {
//       alert(t.alert.completeFields);
//       return;
//     }
//     const dateTimeStr = `${appointmentDate}T${String(appointmentHour).padStart(2, '0')}:${String(appointmentMinute).padStart(2, '0')}:00`;
//     const dateTime = new Date(dateTimeStr);
//     if (dateTime < new Date()) {
//       alert(t.alert.pastDate);
//       return;
//     }

//     setAddLoading(true);
//     try {
//       const url = `${API_APPOINTMENTS}/patient/${patientId}/room/${selectedRoom}/doctor/${selectedDoctor}`;
//       const res = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           appointmentTime: dateTimeStr,
//           notes: notes.trim(),
//           status: 'NEW',
//         }),
//       });
//       if (!res.ok) {
//         const err = await res.text();
//         throw new Error(err || 'Failed to add appointment');
//       }
//       setStatusMsg(`✅ ${t.status.added}`);
//       setShowAddDialog(false);
//       fetchAppointments();
//       // Reset form
//       setSelectedSection('');
//       setSelectedRoom('');
//       setSelectedDoctor('');
//       setAppointmentDate('');
//       setAppointmentHour(new Date().getHours() + 1);
//       setAppointmentMinute(0);
//       setNotes('');
//     } catch (err) {
//       alert(`${t.status.error}: ${err.message}`);
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   // ---------- Render ----------
//   return (
//     <div style={modalOverlay} dir={isRTL ? 'rtl' : 'ltr'}>
//       <div style={modalContent}>
//         {/* Header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
//           <h2>📅 {t.title}</h2>
//           <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.close}</button>
//         </div>

//         {/* Stats cards */}
//         <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
//           <StatCard icon="📊" label={t.stat.total} value={stats.total} color="#4299e1" />
//           <StatCard icon="✅" label={t.stat.active} value={stats.active} color="#48bb78" />
//           <StatCard icon="❌" label={t.stat.cancelled} value={stats.cancelled} color="#fc8181" />
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
//           ) : appointments.length === 0 ? (
//             <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.status.noAppointments}</div>
//           ) : viewMode === 'table' ? (
//             <AppointmentTable
//               appointments={appointments}
//               onAttend={handleAttend}
//               onStartVisit={handleStartVisit}
//               onCancel={handleCancel}
//               t={t}
//               isRTL={isRTL}
//             />
//           ) : (
//             <AppointmentCards
//               appointments={appointments}
//               onAttend={handleAttend}
//               onStartVisit={handleStartVisit}
//               onCancel={handleCancel}
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

//         {/* Add Appointment Dialog */}
//         {showAddDialog && (
//           <div style={modalOverlay}>
//             <div style={{ ...modalContent, minWidth: 400, maxWidth: 500 }}>
//               <h3>➕ {t.dialog.addAppointment}</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
//                 <select
//                   value={selectedSection}
//                   onChange={e => {
//                     const val = e.target.value;
//                     setSelectedSection(val);
//                     fetchRoomsBySection(val);
//                     setSelectedRoom('');
//                   }}
//                   style={inputStyle}
//                 >
//                   <option value="">{t.prompt.section}</option>
//                   {sections.map(s => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={selectedRoom}
//                   onChange={e => setSelectedRoom(e.target.value)}
//                   style={inputStyle}
//                   disabled={!selectedSection}
//                 >
//                   <option value="">{t.prompt.room}</option>
//                   {rooms.map(r => (
//                     <option key={r.id} value={r.id}>{r.roomNumber} - {r.sectionName}</option>
//                   ))}
//                 </select>
//                 <select
//                   value={selectedDoctor}
//                   onChange={e => setSelectedDoctor(e.target.value)}
//                   style={inputStyle}
//                 >
//                   <option value="">{t.prompt.doctor}</option>
//                   {doctors.map(d => (
//                     <option key={d.id} value={d.id}>{d.fullName}</option>
//                   ))}
//                 </select>
//                 <input
//                   type="date"
//                   value={appointmentDate}
//                   onChange={e => setAppointmentDate(e.target.value)}
//                   style={inputStyle}
//                 />
//                 <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
//                   <input
//                     type="number"
//                     min="0"
//                     max="23"
//                     value={appointmentHour}
//                     onChange={e => setAppointmentHour(parseInt(e.target.value) || 0)}
//                     style={{ ...inputStyle, width: 70 }}
//                   />
//                   <span>:</span>
//                   <input
//                     type="number"
//                     min="0"
//                     max="59"
//                     value={appointmentMinute}
//                     onChange={e => setAppointmentMinute(parseInt(e.target.value) || 0)}
//                     style={{ ...inputStyle, width: 70 }}
//                   />
//                 </div>
//                 <textarea
//                   placeholder={t.txt.notes}
//                   value={notes}
//                   onChange={e => setNotes(e.target.value)}
//                   style={{ ...inputStyle, minHeight: 80 }}
//                 />
//                 <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//                   <button onClick={() => setShowAddDialog(false)} style={secondaryBtn}>
//                     {t.btn.cancel}
//                   </button>
//                   <button onClick={handleAddAppointment} style={primaryBtn('#48bb78')} disabled={addLoading}>
//                     {addLoading ? '⏳' : t.btn.add}
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
// // ---------- Appointment Table ----------
// const AppointmentTable = ({ appointments, onAttend, onStartVisit, onCancel, t, isRTL }) => {
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
//         {appointments.map(a => (
//           <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
//             {columns.map(col => {
//               switch (col) {
//                 case 'id': return <td key={col}>{a.id}</td>;
//                 case 'patient': return <td key={col}>{a.patientName}</td>;
//                 case 'doctor': return <td key={col}>{a.doctorName}</td>;
//                 case 'section': return <td key={col}>{a.sectionName}</td>;
//                 case 'room': return <td key={col}>{a.roomNumber}</td>;
//                 case 'time': return <td key={col}>{formatAppointmentTime(a.appointmentTime)}</td>;
//                 case 'status': {
//                   const colorMap = {
//                     NEW: '#3182ce',
//                     ATTENDED: '#38a169',
//                     IN_PROGRESS: '#d69e2e',
//                     CANCELLED: '#e53e3e',
//                     CLOSED: '#718096',
//                   };
//                   return <td key={col} style={{ color: colorMap[a.status] || 'black', fontWeight: 'bold' }}>{a.status}</td>;
//                 }
//                 case 'actions': {
//                   const isNew = a.status === 'NEW';
//                   const isAttended = a.status === 'ATTENDED';
//                   const isCancelledOrClosed = ['CANCELLED', 'CLOSED'].includes(a.status);
//                   return (
//                     <td key={col}>
//                       <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
//                         {isNew && (
//                           <button onClick={() => onAttend(a.id)} style={miniBtn('#48bb78')}>
//                             ✅ {t.chk.attended}
//                           </button>
//                         )}
//                         {isAttended && (
//                           <button onClick={() => onStartVisit(a.id)} style={miniBtn('#4299e1')}>
//                             {t.btn.openVisit}
//                           </button>
//                         )}
//                         {!isCancelledOrClosed && (
//                           <button onClick={() => onCancel(a.id)} style={miniBtn('#fc8181')}>
//                             {t.btn.cancel}
//                           </button>
//                         )}
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

// // ---------- Appointment Cards ----------
// const AppointmentCards = ({ appointments, onAttend, onStartVisit, onCancel, t, isRTL }) => (
//   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
//     {appointments.map(a => (
//       <div key={a.id} style={{
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
//             #{a.id}
//           </span>
//           <span style={{ fontWeight: 'bold', flex: 1, marginLeft: 8, marginRight: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//             {a.patientName || 'N/A'}
//           </span>
//           <span style={{
//             background: a.status === 'CANCELLED' ? '#fc8181'
//               : a.status === 'IN_PROGRESS' ? '#48bb78'
//               : a.status === 'ATTENDED' ? '#38a169'
//               : '#edf2f7',
//             color: ['CANCELLED', 'IN_PROGRESS', 'ATTENDED'].includes(a.status) ? 'white' : '#4a5568',
//             borderRadius: 12,
//             padding: '2px 10px',
//             fontSize: 11,
//             whiteSpace: 'nowrap',
//           }}>
//             {a.status}
//           </span>
//         </div>

//         {/* Doctor, Room, Section, Time */}
//         <div style={{ fontSize: 13, color: '#4a5568', marginBottom: 6 }}>
//           <div>👨‍⚕️ {a.doctorName || 'N/A'}</div>
//           <div style={{ display: 'flex', gap: 12, marginTop: 2 }}>
//             <span>🏥 {a.roomNumber || 'N/A'}</span>
//             <span>📋 {a.sectionName || 'N/A'}</span>
//           </div>
//           <div style={{ marginTop: 2 }}>🕐 {formatAppointmentTime(a.appointmentTime) || 'N/A'}</div>
//         </div>

//         {/* Notes (if any) */}
//         {a.notes && (
//           <div style={{ fontSize: 12, color: '#718096', marginTop: 4, borderTop: '1px solid #f0f0f0', paddingTop: 6 }}>
//             📝 {a.notes}
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
//           {a.status === 'NEW' && (
//             <button onClick={() => onAttend(a.id)} style={miniBtn('#48bb78')}>
//               ✅ {t.chk.attended}
//             </button>
//           )}
//           {a.status === 'ATTENDED' && (
//             <button onClick={() => onStartVisit(a.id)} style={miniBtn('#4299e1')}>
//               {t.btn.openVisit}
//             </button>
//           )}
//           {!['CANCELLED', 'CLOSED'].includes(a.status) && (
//             <button onClick={() => onCancel(a.id)} style={miniBtn('#fc8181')}>
//               {t.btn.cancel}
//             </button>
//           )}
//         </div>
//       </div>
//     ))}
//   </div>
// );

// // ---------- Style utilities (matching WalkInScreen) ----------
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

// export default AppointmentModal;


import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../../utils/api';
import { appointmentTranslations } from '../../i18n/appointmentTranslations';

const API_APPOINTMENTS = `${BASE_URL}/api/appointments`;
const API_SECTIONS = `${BASE_URL}/api/sections`;
const API_ROOMS_BY_SECTION = `${BASE_URL}/api/rooms/section`;
const API_DOCTORS = `${BASE_URL}/api/doctors`;

// ---------- Helper: format date/time ----------
const formatAppointmentTime = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleString('en-GB', { hour12: false });
};

// ---------- Main Component ----------
const AppointmentModal = ({ patientId, loggedUser, lang = 'en', onClose }) => {
  const t = appointmentTranslations[lang] || appointmentTranslations.en;
  const isRTL = lang === 'ar';

  // ---------- State ----------
  const [appointments, setAppointments] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
  const [stats, setStats] = useState({ total: 0, active: 0, cancelled: 0 });
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Form fields for adding appointment
  const [sections, setSections] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentHour, setAppointmentHour] = useState(new Date().getHours() + 1);
  const [appointmentMinute, setAppointmentMinute] = useState(0);
  const [notes, setNotes] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  // ---------- Fetch appointments ----------
  const fetchAppointments = useCallback(async () => {
    if (!patientId) return;
    setLoading(true);
    setStatusMsg(`⏳ ${t.status.loading}`);
    try {
      const res = await fetch(`${API_APPOINTMENTS}/patient/${patientId}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} - ${text}`);
      }
      const data = await res.json();

      const formatted = data.map(a => ({
        id: a.id,
        doctorName: a.doctor ? `${a.doctor.firstName} ${a.doctor.middleName || ''} ${a.doctor.lastName}`.replace(/\s+/g, ' ').trim() : '',
        appointmentTime: a.appointmentTime,
        notes: a.notes || '',
        status: a.status || 'NEW',
        roomNumber: a.room?.roomNumber || '',
        sectionName: a.room?.section?.name || '',
        patientName: a.patient ? `${a.patient.firstName} ${a.patient.middleName || ''} ${a.patient.lastName}`.replace(/\s+/g, ' ').trim() : '',
      }));

      setAppointments(formatted);
      const total = formatted.length;
      const active = formatted.filter(a => ['IN_PROGRESS', 'ATTENDED'].includes(a.status)).length;
      const cancelled = formatted.filter(a => a.status === 'CANCELLED').length;
      setStats({ total, active, cancelled });
      setStatusMsg(`✅ ${t.status.loaded} (${total} ${t.stat.total})`);
    } catch (err) {
      setStatusMsg(`❌ ${t.status.error}: ${err.message}`);
      setAppointments([]);
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
      setSections(data.map(s => ({ id: s.id, name: s.name })));
    } catch (e) {
      console.error('Failed to load sections');
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
      setRooms(data.map(r => ({
        id: r.id,
        roomNumber: r.roomNumber,
        sectionName: r.section?.name || '',
      })));
    } catch (e) {
      console.error('Failed to load rooms');
    }
  }, []);

  const fetchDoctors = useCallback(async () => {
    try {
      const res = await fetch(API_DOCTORS);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDoctors(data.map(d => ({
        id: d.id,
        fullName: `${d.firstName} ${d.middleName || ''} ${d.lastName}`.replace(/\s+/g, ' ').trim(),
      })));
    } catch (e) {
      console.error('Failed to load doctors');
    }
  }, []);

  // ---------- Load initial data ----------
  useEffect(() => {
    if (patientId) {
      fetchAppointments();
      fetchSections();
      fetchDoctors();
    }
  }, [patientId, fetchAppointments, fetchSections, fetchDoctors]);

  // ---------- When section changes, fetch rooms ----------
  useEffect(() => {
    if (selectedSection) {
      fetchRoomsBySection(selectedSection);
    } else {
      setRooms([]);
    }
  }, [selectedSection, fetchRoomsBySection]);

  // ---------- Handlers for appointment actions ----------
  const handleAttend = async (appointmentId) => {
    try {
      const res = await fetch(`${API_APPOINTMENTS}/${appointmentId}/attend?username=${loggedUser}`, { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to attend');
      await fetchAppointments();
      setStatusMsg(`✅ Appointment #${appointmentId} attended`);
    } catch (err) {
      setStatusMsg(`❌ ${err.message}`);
    }
  };

  const handleStartVisit = async (appointmentId) => {
    try {
      const res = await fetch(`${API_APPOINTMENTS}/${appointmentId}/start?username=${loggedUser}`, { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to start visit');
      await fetchAppointments();
      setStatusMsg(`✅ Visit started for appointment #${appointmentId}`);
    } catch (err) {
      setStatusMsg(`❌ ${err.message}`);
    }
  };

  const handleCancel = async (appointmentId) => {
    const reason = prompt(t.dialog.cancel.content);
    if (reason === null) return;
    if (reason.trim() === '') {
      setStatusMsg(`⚠️ ${t.alert.cancelReasonRequired}`);
      return;
    }
    try {
      const encodedReason = encodeURIComponent(reason);
      const res = await fetch(
        `${API_APPOINTMENTS}/${appointmentId}/cancel?username=${loggedUser}&reason=${encodedReason}`,
        { method: 'PUT' }
      );
      if (!res.ok) throw new Error('Failed to cancel');
      await fetchAppointments();
      setStatusMsg(`✅ Appointment #${appointmentId} cancelled`);
    } catch (err) {
      setStatusMsg(`❌ ${err.message}`);
    }
  };

  // ---------- Add appointment ----------
  const handleAddAppointment = async () => {
    if (!selectedRoom || !selectedDoctor || !appointmentDate) {
      alert(t.alert.completeFields);
      return;
    }
    const dateTimeStr = `${appointmentDate}T${String(appointmentHour).padStart(2, '0')}:${String(appointmentMinute).padStart(2, '0')}:00`;
    const dateTime = new Date(dateTimeStr);
    if (dateTime < new Date()) {
      alert(t.alert.pastDate);
      return;
    }

    setAddLoading(true);
    try {
      const url = `${API_APPOINTMENTS}/patient/${patientId}/room/${selectedRoom}/doctor/${selectedDoctor}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentTime: dateTimeStr,
          notes: notes.trim(),
          status: 'NEW',
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Failed to add appointment');
      }
      setStatusMsg(`✅ ${t.status.added}`);
      setShowAddDialog(false);
      fetchAppointments();
      // Reset form
      setSelectedSection('');
      setSelectedRoom('');
      setSelectedDoctor('');
      setAppointmentDate('');
      setAppointmentHour(new Date().getHours() + 1);
      setAppointmentMinute(0);
      setNotes('');
    } catch (err) {
      alert(`${t.status.error}: ${err.message}`);
    } finally {
      setAddLoading(false);
    }
  };

  // ---------- Render ----------
  return (
    <div style={modalOverlay} dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={modalContent}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2>📅 {t.title}</h2>
          <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.close}</button>
        </div>

        {/* Stats cards */}
        <div style={{ display: 'flex', gap: 15, marginBottom: 20 }}>
          <StatCard icon="📊" label={t.stat.total} value={stats.total} color="#4299e1" />
          <StatCard icon="✅" label={t.stat.active} value={stats.active} color="#48bb78" />
          <StatCard icon="❌" label={t.stat.cancelled} value={stats.cancelled} color="#fc8181" />
        </div>

        {/* View toggle – now with hardcoded "Table" and "Cards" */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
          <button
            onClick={() => setViewMode('table')}
            style={viewMode === 'table' ? activeToggle : toggleBtn}
          >
            📋 Table
          </button>
          <button
            onClick={() => setViewMode('card')}
            style={viewMode === 'card' ? activeToggle : toggleBtn}
          >
            🃏 Cards
          </button>
          <span style={{ marginLeft: 'auto', color: '#4a5568' }}>{statusMsg}</span>
        </div>

        {/* Content */}
        <div style={{ background: 'white', borderRadius: 12, padding: 10, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 300 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>⏳ {t.status.loading}</div>
          ) : appointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#a0aec0' }}>📭 {t.status.noAppointments}</div>
          ) : viewMode === 'table' ? (
            <AppointmentTable
              appointments={appointments}
              onAttend={handleAttend}
              onStartVisit={handleStartVisit}
              onCancel={handleCancel}
              t={t}
              isRTL={isRTL}
            />
          ) : (
            <AppointmentCards
              appointments={appointments}
              onAttend={handleAttend}
              onStartVisit={handleStartVisit}
              onCancel={handleCancel}
              t={t}
              isRTL={isRTL}
            />
          )}
        </div>

        {/* Floating Add Button */}
        <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 1100 }}>
          <button
            onClick={() => setShowAddDialog(true)}
            style={{
              ...primaryBtn('#48bb78'),
              borderRadius: '50%',
              width: 60,
              height: 60,
              fontSize: 32,
              boxShadow: '0 4px 12px rgba(72,187,120,0.5)',
            }}
          >
            +
          </button>
        </div>

        {/* Add Appointment Dialog */}
        {showAddDialog && (
          <div style={modalOverlay}>
            <div style={{ ...modalContent, minWidth: 400, maxWidth: 500 }}>
              <h3>➕ {t.dialog.addAppointment}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                <select
                  value={selectedSection}
                  onChange={e => {
                    const val = e.target.value;
                    setSelectedSection(val);
                    fetchRoomsBySection(val);
                    setSelectedRoom('');
                  }}
                  style={inputStyle}
                >
                  <option value="">{t.prompt.section}</option>
                  {sections.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <select
                  value={selectedRoom}
                  onChange={e => setSelectedRoom(e.target.value)}
                  style={inputStyle}
                  disabled={!selectedSection}
                >
                  <option value="">{t.prompt.room}</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>{r.roomNumber} - {r.sectionName}</option>
                  ))}
                </select>
                <select
                  value={selectedDoctor}
                  onChange={e => setSelectedDoctor(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">{t.prompt.doctor}</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.fullName}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={e => setAppointmentDate(e.target.value)}
                  style={inputStyle}
                />
                <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={appointmentHour}
                    onChange={e => setAppointmentHour(parseInt(e.target.value) || 0)}
                    style={{ ...inputStyle, width: 70 }}
                  />
                  <span>:</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={appointmentMinute}
                    onChange={e => setAppointmentMinute(parseInt(e.target.value) || 0)}
                    style={{ ...inputStyle, width: 70 }}
                  />
                </div>
                <textarea
                  placeholder={t.txt.notes}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{ ...inputStyle, minHeight: 80 }}
                />
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button onClick={() => setShowAddDialog(false)} style={secondaryBtn}>
                    {t.btn.cancel}
                  </button>
                  <button onClick={handleAddAppointment} style={primaryBtn('#48bb78')} disabled={addLoading}>
                    {addLoading ? '⏳' : t.btn.add}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Subcomponents ----------
const StatCard = ({ icon, label, value, color }) => (
  <div style={{
    background: 'white', borderRadius: 12, padding: '15px 20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${color}`,
    flex: 1, minWidth: 150,
  }}>
    <span style={{ fontSize: 24 }}>{icon}</span>
    <div style={{ fontSize: 24, fontWeight: 'bold', color }}>{value}</div>
    <div style={{ fontSize: 12, color: '#718096' }}>{label}</div>
  </div>
);

// ---------- Appointment Table ----------
const AppointmentTable = ({ appointments, onAttend, onStartVisit, onCancel, t, isRTL }) => {
  const columns = isRTL
    ? ['actions', 'status', 'time', 'room', 'section', 'doctor', 'patient', 'id']
    : ['id', 'patient', 'doctor', 'section', 'room', 'time', 'status', 'actions'];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col} style={{ padding: 10, background: '#f8f9fa', textAlign: 'left' }}>
              {t.table[col] || col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {appointments.map(a => (
          <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
            {columns.map(col => {
              switch (col) {
                case 'id': return <td key={col}>{a.id}</td>;
                case 'patient': return <td key={col}>{a.patientName}</td>;
                case 'doctor': return <td key={col}>{a.doctorName}</td>;
                case 'section': return <td key={col}>{a.sectionName}</td>;
                case 'room': return <td key={col}>{a.roomNumber}</td>;
                case 'time': return <td key={col}>{formatAppointmentTime(a.appointmentTime)}</td>;
                case 'status': {
                  const colorMap = {
                    NEW: '#3182ce',
                    ATTENDED: '#38a169',
                    IN_PROGRESS: '#d69e2e',
                    CANCELLED: '#e53e3e',
                    CLOSED: '#718096',
                  };
                  return <td key={col} style={{ color: colorMap[a.status] || 'black', fontWeight: 'bold' }}>{a.status}</td>;
                }
                case 'actions': {
                  const isNew = a.status === 'NEW';
                  const isAttended = a.status === 'ATTENDED';
                  const isCancelledOrClosed = ['CANCELLED', 'CLOSED'].includes(a.status);
                  return (
                    <td key={col}>
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                        {isNew && (
                          <button onClick={() => onAttend(a.id)} style={miniBtn('#48bb78')}>
                            ✅ {t.chk.attended}
                          </button>
                        )}
                        {isAttended && (
                          <button onClick={() => onStartVisit(a.id)} style={miniBtn('#4299e1')}>
                            {t.btn.openVisit}
                          </button>
                        )}
                        {!isCancelledOrClosed && (
                          <button onClick={() => onCancel(a.id)} style={miniBtn('#fc8181')}>
                            {t.btn.cancel}
                          </button>
                        )}
                      </div>
                    </td>
                  );
                }
                default: return <td key={col}></td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// ---------- Appointment Cards ----------
const AppointmentCards = ({ appointments, onAttend, onStartVisit, onCancel, t, isRTL }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 15 }}>
    {appointments.map(a => (
      <div key={a.id} style={{
        background: 'white',
        borderRadius: 12,
        padding: 15,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
        border: '1px solid #edf2f7',
        direction: isRTL ? 'rtl' : 'ltr',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        cursor: 'default',
      }}>
        {/* Header: ID, Patient, Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ background: '#4299e1', color: 'white', borderRadius: 12, padding: '2px 10px', fontSize: 12 }}>
            #{a.id}
          </span>
          <span style={{ fontWeight: 'bold', flex: 1, marginLeft: 8, marginRight: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {a.patientName || 'N/A'}
          </span>
          <span style={{
            background: a.status === 'CANCELLED' ? '#fc8181'
              : a.status === 'IN_PROGRESS' ? '#48bb78'
              : a.status === 'ATTENDED' ? '#38a169'
              : '#edf2f7',
            color: ['CANCELLED', 'IN_PROGRESS', 'ATTENDED'].includes(a.status) ? 'white' : '#4a5568',
            borderRadius: 12,
            padding: '2px 10px',
            fontSize: 11,
            whiteSpace: 'nowrap',
          }}>
            {a.status}
          </span>
        </div>

        {/* Doctor, Room, Section, Time */}
        <div style={{ fontSize: 13, color: '#4a5568', marginBottom: 6 }}>
          <div>👨‍⚕️ {a.doctorName || 'N/A'}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 2 }}>
            <span>🏥 {a.roomNumber || 'N/A'}</span>
            <span>📋 {a.sectionName || 'N/A'}</span>
          </div>
          <div style={{ marginTop: 2 }}>🕐 {formatAppointmentTime(a.appointmentTime) || 'N/A'}</div>
        </div>

        {/* Notes (if any) */}
        {a.notes && (
          <div style={{ fontSize: 12, color: '#718096', marginTop: 4, borderTop: '1px solid #f0f0f0', paddingTop: 6 }}>
            📝 {a.notes}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {a.status === 'NEW' && (
            <button onClick={() => onAttend(a.id)} style={miniBtn('#48bb78')}>
              ✅ {t.chk.attended}
            </button>
          )}
          {a.status === 'ATTENDED' && (
            <button onClick={() => onStartVisit(a.id)} style={miniBtn('#4299e1')}>
              {t.btn.openVisit}
            </button>
          )}
          {!['CANCELLED', 'CLOSED'].includes(a.status) && (
            <button onClick={() => onCancel(a.id)} style={miniBtn('#fc8181')}>
              {t.btn.cancel}
            </button>
          )}
        </div>
      </div>
    ))}
  </div>
);

// ---------- Style utilities (matching WalkInScreen) ----------
const primaryBtn = (bg) => ({
  background: bg, color: 'white', fontWeight: 'bold', border: 'none',
  borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
});
const secondaryBtn = {
  background: '#e2e8f0', border: 'none', padding: '8px 16px',
  borderRadius: 8, cursor: 'pointer',
};
const toggleBtn = {
  background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 8,
  padding: '8px 12px', cursor: 'pointer',
};
const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };
const miniBtn = (bg) => ({
  background: bg, color: 'white', border: 'none', borderRadius: 6,
  padding: '4px 10px', cursor: 'pointer', fontSize: 12,
});
const inputStyle = { padding: '8px 10px', borderRadius: 8, border: '1px solid #ccc' };

const modalOverlay = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
  alignItems: 'center', zIndex: 1000,
};
const modalContent = {
  background: 'white', borderRadius: 12, padding: 20, minWidth: 600,
  maxWidth: 1000, width: '90%', maxHeight: '90vh', overflowY: 'auto',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

export default AppointmentModal;