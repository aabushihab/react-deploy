// // import React, {
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// // } from 'react';

// // // -------------------- Styles (inline via <style> tag) --------------------
// // const styles = `
// //   * {
// //     margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .app {
// //     display: flex;
// //     flex-direction: column;
// //     height: 100vh;
// //     background: #f0f2f5;
// //     overflow: hidden;
// //   }
// //   /* Top Bar */
// //   .topbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 12px 25px;
// //     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
// //     color: white;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //     flex-shrink: 0;
// //   }
// //   .topbar .clinic {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 24px;
// //     font-weight: bold;
// //     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// //   }
// //   .topbar .datetime {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     font-size: 16px;
// //   }
// //   .topbar .datetime .time {
// //     font-weight: bold;
// //     color: #f1c40f;
// //     font-size: 20px;
// //   }
// //   .topbar .datetime .clock-icon {
// //     display: inline-block;
// //     animation: spin 60s linear infinite;
// //   }
// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   /* Sidebar */
// //   .sidebar {
// //     display: flex;
// //     flex-direction: column;
// //     background: rgba(44, 62, 80, 0.98);
// //     color: #ecf0f1;
// //     width: 65px;
// //     min-width: 65px;
// //     padding: 15px 12px;
// //     transition: width 0.3s ease;
// //     overflow: hidden;
// //     flex-shrink: 0;
// //     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
// //   }
// //   .sidebar:hover {
// //     width: 250px;
// //   }
// //   .sidebar .header {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid rgba(255,255,255,0.1);
// //     margin-bottom: 10px;
// //     white-space: nowrap;
// //   }
// //   .sidebar .header .icon {
// //     font-size: 24px;
// //   }
// //   .sidebar .header .title {
// //     font-size: 18px;
// //     font-weight: bold;
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .header .title {
// //     opacity: 1;
// //   }
// //   .sidebar .menu {
// //     flex: 1;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 6px;
// //     overflow-y: auto;
// //   }
// //   .sidebar .menu button {
// //     background: transparent;
// //     border: none;
// //     color: #ecf0f1;
// //     padding: 8px 15;
// //     border-radius: 8px;
// //     text-align: left;
// //     font-size: 14px;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     white-space: nowrap;
// //     transition: all 0.2s;
// //     width: 100%;
// //   }
// //   .sidebar .menu button:hover {
// //     background: rgba(255,255,255,0.15);
// //     transform: scale(1.02);
// //     border-left: 3px solid #3498db;
// //   }
// //   .sidebar .menu button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .menu button .label {
// //     opacity: 1;
// //   }
// //   .sidebar .logout {
// //     margin-top: auto;
// //     padding-top: 10px;
// //     border-top: 1px solid rgba(255,255,255,0.1);
// //   }
// //   .sidebar .logout button {
// //     background: #c0392b;
// //     color: white;
// //     font-weight: bold;
// //     border-radius: 8px;
// //     padding: 10px 15;
// //     width: 100%;
// //     border: none;
// //     cursor: pointer;
// //     font-size: 14px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     transition: all 0.2s;
// //   }
// //   .sidebar .logout button:hover {
// //     background: #e74c3c;
// //     transform: scale(1.05);
// //   }
// //   .sidebar .logout button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .logout button .label {
// //     opacity: 1;
// //   }

// //   /* Main Content */
// //   .main {
// //     flex: 1;
// //     padding: 20px;
// //     overflow-y: auto;
// //     background: #f0f2f5;
// //   }
// //   .main .title {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     margin-bottom: 20px;
// //   }
// //   /* Summary Cards */
// //   .summary {
// //     display: flex;
// //     gap: 15px;
// //     justify-content: center;
// //     flex-wrap: wrap;
// //     margin-bottom: 20px;
// //   }
// //   .summary .card {
// //     flex: 1;
// //     min-width: 150px;
// //     max-width: 220px;
// //     padding: 12px;
// //     border-radius: 14px;
// //     text-align: center;
// //     color: white;
// //     cursor: pointer;
// //     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
// //     transition: all 0.2s;
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     position: relative;
// //     overflow: hidden;
// //   }
// //   .summary .card:hover {
// //     transform: scale(1.05);
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
// //   }
// //   .summary .card .icon { font-size: 28px; }
// //   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
// //   .summary .card .value { font-size: 34px; font-weight: bold; }
// //   .summary .card .top-bar {
// //     height: 5px;
// //     background: rgba(255,255,255,0.3);
// //     border-radius: 12px 12px 0 0;
// //     margin: -12px -12px 10px -12px;
// //   }
// //   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
// //   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
// //   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
// //   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

// //   /* Toggle Button */
// //   .toggle-btn {
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     color: white;
// //     border: none;
// //     padding: 12px 30px;
// //     border-radius: 30px;
// //     font-weight: bold;
// //     font-size: 16px;
// //     cursor: pointer;
// //     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
// //     transition: all 0.2s;
// //     margin-bottom: 15px;
// //   }
// //   .toggle-btn:hover {
// //     transform: scale(1.08);
// //     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
// //   }

// //   /* Table / Card Container */
// //   .content-container {
// //     background: white;
// //     border-radius: 10px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// //     padding: 0;
// //     overflow: hidden;
// //     transition: opacity 0.3s;
// //     position: relative;
// //     min-height: 400px;
// //   }
// //   .content-container .table-view {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }
// //   .content-container .table-view th {
// //     background: #f8f9fa;
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //   }
// //   .content-container .table-view td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //     font-size: 13px;
// //   }
// //   .content-container .table-view tr:hover td {
// //     background: #f8f9fa;
// //   }
// //   .content-container .table-view .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     text-align: center;
// //   }
// //   .content-container .table-view .status-badge.attended { background: #27ae60; }
// //   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
// //   .content-container .table-view .status-badge.closed { background: #e74c3c; }
// //   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
// //   .content-container .table-view .status-badge.normal { background: #3498db; }

// //   /* Card Grid */
// //   .card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// //   }
// //   .card-grid .appt-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #e9ecef;
// //     transition: all 0.2s;
// //     cursor: pointer;
// //   }
// //   .card-grid .appt-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
// //   }
// //   .card-grid .appt-card .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     margin-bottom: 8px;
// //   }
// //   .card-grid .appt-card .patient {
// //     font-size: 18px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .card-grid .appt-card .detail {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     color: #34495e;
// //     font-size: 14px;
// //     margin-top: 4px;
// //   }
// //   .card-grid .appt-card .detail .label {
// //     color: #7f8c8d;
// //     font-size: 13px;
// //   }

// //   /* Status Bar */
// //   .statusbar {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     padding: 10px 20px;
// //     background: white;
// //     border-radius: 10px;
// //     margin-top: 15px;
// //     border: 1px solid #e9ecef;
// //     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
// //   }
// //   .statusbar .loading {
// //     width: 20px;
// //     height: 20px;
// //   }
// //   .statusbar .message {
// //     font-size: 13px;
// //     color: #27ae60;
// //   }
// //   .statusbar .message.error { color: #e74c3c; }
// //   .statusbar .message.loading { color: #f39c12; }
// //   .statusbar .version {
// //     margin-left: auto;
// //     font-size: 12px;
// //     color: #95a5a6;
// //   }

// //   /* Scrollable */
// //   .scrollable {
// //     overflow-y: auto;
// //     max-height: 60vh;
// //   }

// //   /* Utilities */
// //   .flex-row { display: flex; flex-direction: row; }
// //   .flex-1 { flex: 1; }
// //   .h-full { height: 100%; }
// //   .overflow-hidden { overflow: hidden; }
// // `;

// // // -------------------- Mock API --------------------
// // const mockFetchAppointments = () => {
// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       const now = new Date();
// //       const formatTime = (d) => d.toTimeString().slice(0,5);
// //       const statuses = ['ATTENDED', 'IN_PROGRESS', 'CLOSED', 'CANCELLED', 'NORMAL'];
// //       const names = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Brown'];
// //       const doctors = ['Dr. Adams', 'Dr. Baker', 'Dr. Clark', 'Dr. Davis', 'Dr. Evans'];
// //       const rooms = ['101', '102', '103', '104', '105'];
// //       const sections = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology'];
// //       const notes = ['', 'Follow-up', 'Urgent', 'Routine check', ''];

// //       const appointments = Array.from({ length: 12 }, (_, i) => {
// //         const status = statuses[i % statuses.length];
// //         const patient = names[i % names.length];
// //         const doctor = doctors[i % doctors.length];
// //         const time = new Date(now);
// //         time.setHours(8 + i % 10, (i * 7) % 60);
// //         return {
// //           id: i + 1,
// //           patientName: patient,
// //           doctorName: doctor,
// //           appointmentTime: time,
// //           appointmentTimeString: formatTime(time),
// //           roomNumber: rooms[i % rooms.length],
// //           sectionName: sections[i % sections.length],
// //           status: status,
// //           notes: notes[i % notes.length],
// //         };
// //       });
// //       resolve(appointments);
// //     }, 500);
// //   });
// // };

// // // -------------------- Main Component --------------------
// // const AdminHomePage = () => {
// //   // ---------- State ----------
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
// //   const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: '● Ready', type: 'success' });
// //   const [clinicInfo, setClinicInfo] = useState({ name: 'My Clinic', date: 'Monday | 2024-12-01' });
// //   const [currentTime, setCurrentTime] = useState(new Date());

// //   // Ref for auto-refresh timer
// //   const refreshInterval = useRef(null);

// //   // ---------- Helper: update status ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text, type });
// //   }, []);

// //   // ---------- Load appointments ----------
// //   const loadAppointments = useCallback(async () => {
// //     setLoading(true);
// //     setStatus('Loading appointments...', 'loading');
// //     try {
// //       const data = await mockFetchAppointments();
// //       setAppointments(data);
// //       setFilteredAppointments(data);
// //       // Update summary
// //       const total = data.length;
// //       const attended = data.filter(a => a.status === 'ATTENDED').length;
// //       const inProgress = data.filter(a => a.status === 'IN_PROGRESS').length;
// //       const cancelled = data.filter(a => a.status === 'CANCELLED').length;
// //       setSummary({ total, attended, inProgress, cancelled });
// //       setStatus(`Loaded ${total} appointments`, 'success');
// //     } catch (err) {
// //       setStatus('Error loading data', 'error');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [setStatus]);

// //   // ---------- Apply filter by status ----------
// //   const applyFilter = useCallback((status) => {
// //     if (status === 'ALL') {
// //       setFilteredAppointments(appointments);
// //     } else {
// //       setFilteredAppointments(appointments.filter(a => a.status === status));
// //     }
// //     setStatus(`Filtered: ${status}`, 'info');
// //   }, [appointments, setStatus]);

// //   // ---------- Toggle view ----------
// //   const toggleView = useCallback(() => {
// //     setViewMode(prev => prev === 'table' ? 'card' : 'table');
// //   }, []);

// //   // ---------- Clock update ----------
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ---------- Load clinic info (mock) ----------
// //   useEffect(() => {
// //     // Simulate clinic info fetch
// //     const info = {
// //       name: 'City Medical Center',
// //       date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
// //     };
// //     setClinicInfo(info);
// //   }, []);

// //   // ---------- Initial data load ----------
// //   useEffect(() => {
// //     loadAppointments();
// //     // Auto-refresh every 30 seconds
// //     refreshInterval.current = setInterval(() => {
// //       loadAppointments();
// //     }, 30000);
// //     return () => {
// //       clearInterval(refreshInterval.current);
// //     };
// //   }, [loadAppointments]);

// //   // ---------- Render helpers ----------
// //   // Helper function (put inside the component)
// // const getStatusClass = (status) => {
// //   switch (status) {
// //     case 'ATTENDED':   return 'attended';
// //     case 'IN_PROGRESS':return 'inprogress';
// //     case 'CLOSED':     return 'closed';
// //     case 'CANCELLED':  return 'cancelled';
// //     default:           return 'normal';
// //   }
// // };

// // // Updated renderSummaryCards
// // const renderSummaryCards = () => {
// //   const cards = [
// //     { key: 'total', label: 'Total', count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
// //     { key: 'attended', label: 'Attended', count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
// //     { key: 'inProgress', label: 'In Progress', count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
// //     { key: 'cancelled', label: 'Cancelled', count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
// //   ];

// //   return (
// //     <div className="summary">
// //       {cards.map(({ key, label, count, icon, cls, filter }) => (
// //         <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
// //           <div className="top-bar"></div>
// //           <div className="icon">{icon}</div>
// //           <div className="title">{label}</div>
// //           <div className="value">{count}</div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };
// // // Updated renderTable (only the status cell changes)
// // const renderTable = () => (
// //   <table className="table-view">
// //     <thead>
// //       <tr>
// //         <th>Patient</th>
// //         <th>Doctor</th>
// //         <th>Time</th>
// //         <th>Room</th>
// //         <th>Section</th>
// //         <th>Status</th>
// //         <th>Notes</th>
// //       </tr>
// //     </thead>
// //     <tbody>
// //       {filteredAppointments.length === 0 ? (
// //         <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>No appointments</td></tr>
// //       ) : (
// //         filteredAppointments.map(a => (
// //           <tr key={a.id}>
// //             <td>{a.patientName}</td>
// //             <td>{a.doctorName}</td>
// //             <td>{a.appointmentTimeString}</td>
// //             <td>{a.roomNumber}</td>
// //             <td>{a.sectionName}</td>
// //             <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
// //             <td>{a.notes}</td>
// //           </tr>
// //         ))
// //       )}
// //     </tbody>
// //   </table>
// // );

// //   // Updated renderCardGrid (only the status badge changes)
// // const renderCardGrid = () => (
// //   <div className="card-grid">
// //     {filteredAppointments.length === 0 ? (
// //       <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>No appointments</div>
// //     ) : (
// //       filteredAppointments.map(a => (
// //         <div key={a.id} className="appt-card">
// //           <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
// //           <div className="patient">{a.patientName}</div>
// //           <div className="detail"><span>🩺</span> {a.doctorName}</div>
// //           <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
// //           <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
// //           {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
// //         </div>
// //       ))
// //     )}
// //   </div>
// // );
// //   // ---------- Sidebar menu items ----------
// //   const menuItems = [
// //     { icon: '🔍', label: 'Search Patient', action: () => alert('Search Patient') },
// //     { icon: '📅', label: 'Appointments', action: () => alert('Appointments Admin') },
// //     { icon: '📝', label: 'Visit Tracking', action: () => alert('Visit Tracking') },
// //     { icon: '📑', label: 'Claims Tracking', action: () => alert('Claims Tracking') },
// //     { icon: '🩺', label: 'Manage Doctors', action: () => alert('Manage Doctors') },
// //     { icon: '📊', label: 'Reports', action: () => alert('Reports') },
// //     { icon: '💰', label: 'Clinic Payments', action: () => alert('Clinic Payments') },
// //     { icon: '🏢', label: 'Manage Sections', action: () => alert('Manage Sections') },
// //     { icon: '🚪', label: 'Manage Rooms', action: () => alert('Manage Rooms') },
// //     { icon: '👤', label: 'User Management', action: () => alert('User Management') },
// //     { icon: '🏥', label: 'Health Insurance', action: () => alert('Health Insurance') },
// //     { icon: '📜', label: 'Logs', action: () => alert('Logs') },
// //     { icon: 'ℹ️', label: 'About', action: () => alert('About') },
// //   ];

// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="app">
// //         {/* Top Bar */}
// //         <div className="topbar">
// //           <div className="clinic">
// //             <span>🏥</span>
// //             <span>{clinicInfo.name}</span>
// //           </div>
// //           <div className="datetime">
// //             <span>📅 {clinicInfo.date}</span>
// //             <span>
// //               <span className="clock-icon">🕐</span>
// //               <span className="time">
// //                 {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex-row flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           <div className="sidebar">
// //             <div className="header">
// //               <span className="icon">☰</span>
// //               <span className="title">Menu</span>
// //             </div>
// //             <div className="menu">
// //               {menuItems.map((item, idx) => (
// //                 <button key={idx} onClick={item.action}>
// //                   <span>{item.icon}</span>
// //                   <span className="label">{item.label}</span>
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="logout">
// //               <button onClick={() => { alert('Logout'); }}>
// //                 <span>🚪</span>
// //                 <span className="label">Logout</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Main Content */}
// //           <div className="main">
// //             <div className="title">
// //               <span>📊</span>
// //               <span>Dashboard</span>
// //             </div>

// //             {renderSummaryCards()}

// //             <button className="toggle-btn" onClick={toggleView}>
// //               {viewMode === 'table' ? '📇 Switch to Card View' : '📋 Switch to Table View'}
// //             </button>

// //             <div className="content-container">
// //               <div className="scrollable">
// //                 {viewMode === 'table' ? renderTable() : renderCardGrid()}
// //               </div>
// //             </div>

// //             {/* Status Bar */}
// //             <div className="statusbar">
// //               {loading && <div className="loading">⏳</div>}
// //               <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
// //               <span className="version">v2.0.0</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminHomePage;


// // import React, {
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// // } from 'react';
// // import { adminTranslations } from '../../i18n/adminTranslations';
// // import { BASE_URL } from '../../utils/api';   // ✅ must be exported from api.js

// // // -------------------- Styles (inline) --------------------
// // const styles = `
// //   * {
// //     margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .app {
// //     display: flex;
// //     flex-direction: column;
// //     height: 100vh;
// //     background: #f0f2f5;
// //     overflow: hidden;
// //   }
// //   /* Top Bar */
// //   .topbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 12px 25px;
// //     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
// //     color: white;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //     flex-shrink: 0;
// //   }
// //   .topbar .clinic {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 24px;
// //     font-weight: bold;
// //     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// //   }
// //   .topbar .datetime {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     font-size: 16px;
// //     flex-wrap: wrap;
// //   }
// //   .topbar .datetime .time {
// //     font-weight: bold;
// //     color: #f1c40f;
// //     font-size: 20px;
// //   }
// //   .topbar .datetime .clock-icon {
// //     display: inline-block;
// //     animation: spin 60s linear infinite;
// //   }
// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   .topbar .datetime input[type="date"] {
// //     padding: 5px 10px;
// //     border-radius: 5px;
// //     border: none;
// //     background: #fff;
// //     color: #2c3e50;
// //     font-weight: bold;
// //     cursor: pointer;
// //   }
// //   .topbar .datetime select {
// //     padding: 5px 10px;
// //     border-radius: 5px;
// //     border: none;
// //     background: #fff;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     cursor: pointer;
// //   }
// //   /* Sidebar */
// //   .sidebar {
// //     display: flex;
// //     flex-direction: column;
// //     background: rgba(44, 62, 80, 0.98);
// //     color: #ecf0f1;
// //     width: 65px;
// //     min-width: 65px;
// //     padding: 15px 12px;
// //     transition: width 0.3s ease;
// //     overflow: hidden;
// //     flex-shrink: 0;
// //     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
// //   }
// //   .sidebar:hover {
// //     width: 250px;
// //   }
// //   .sidebar .header {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid rgba(255,255,255,0.1);
// //     margin-bottom: 10px;
// //     white-space: nowrap;
// //   }
// //   .sidebar .header .icon {
// //     font-size: 24px;
// //   }
// //   .sidebar .header .title {
// //     font-size: 18px;
// //     font-weight: bold;
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .header .title {
// //     opacity: 1;
// //   }
// //   .sidebar .menu {
// //     flex: 1;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 6px;
// //     overflow-y: auto;
// //   }
// //   .sidebar .menu button {
// //     background: transparent;
// //     border: none;
// //     color: #ecf0f1;
// //     padding: 8px 15px;
// //     border-radius: 8px;
// //     text-align: left;
// //     font-size: 14px;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     white-space: nowrap;
// //     transition: all 0.2s;
// //     width: 100%;
// //   }
// //   .sidebar .menu button:hover {
// //     background: rgba(255,255,255,0.15);
// //     transform: scale(1.02);
// //     border-left: 3px solid #3498db;
// //   }
// //   .sidebar .menu button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .menu button .label {
// //     opacity: 1;
// //   }
// //   .sidebar .logout {
// //     margin-top: auto;
// //     padding-top: 10px;
// //     border-top: 1px solid rgba(255,255,255,0.1);
// //   }
// //   .sidebar .logout button {
// //     background: #c0392b;
// //     color: white;
// //     font-weight: bold;
// //     border-radius: 8px;
// //     padding: 10px 15px;
// //     width: 100%;
// //     border: none;
// //     cursor: pointer;
// //     font-size: 14px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     transition: all 0.2s;
// //   }
// //   .sidebar .logout button:hover {
// //     background: #e74c3c;
// //     transform: scale(1.05);
// //   }
// //   .sidebar .logout button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .logout button .label {
// //     opacity: 1;
// //   }

// //   /* Main Content */
// //   .main {
// //     flex: 1;
// //     padding: 20px;
// //     overflow-y: auto;
// //     background: #f0f2f5;
// //   }
// //   .main .title {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     margin-bottom: 20px;
// //   }
// //   /* Summary Cards */
// //   .summary {
// //     display: flex;
// //     gap: 15px;
// //     justify-content: center;
// //     flex-wrap: wrap;
// //     margin-bottom: 20px;
// //   }
// //   .summary .card {
// //     flex: 1;
// //     min-width: 150px;
// //     max-width: 220px;
// //     padding: 12px;
// //     border-radius: 14px;
// //     text-align: center;
// //     color: white;
// //     cursor: pointer;
// //     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
// //     transition: all 0.2s;
// //     position: relative;
// //     overflow: hidden;
// //   }
// //   .summary .card:hover {
// //     transform: scale(1.05);
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
// //   }
// //   .summary .card .icon { font-size: 28px; }
// //   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
// //   .summary .card .value { font-size: 34px; font-weight: bold; }
// //   .summary .card .top-bar {
// //     height: 5px;
// //     background: rgba(255,255,255,0.3);
// //     border-radius: 12px 12px 0 0;
// //     margin: -12px -12px 10px -12px;
// //   }
// //   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
// //   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
// //   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
// //   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

// //   /* Toggle Button */
// //   .toggle-btn {
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     color: white;
// //     border: none;
// //     padding: 12px 30px;
// //     border-radius: 30px;
// //     font-weight: bold;
// //     font-size: 16px;
// //     cursor: pointer;
// //     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
// //     transition: all 0.2s;
// //     margin-bottom: 15px;
// //   }
// //   .toggle-btn:hover {
// //     transform: scale(1.08);
// //     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
// //   }

// //   /* Table / Card Container */
// //   .content-container {
// //     background: white;
// //     border-radius: 10px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// //     padding: 0;
// //     overflow: hidden;
// //     transition: opacity 0.3s;
// //     position: relative;
// //     min-height: 400px;
// //   }
// //   .content-container .table-view {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }
// //   .content-container .table-view th {
// //     background: #f8f9fa;
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //   }
// //   .content-container .table-view td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //     font-size: 13px;
// //   }
// //   .content-container .table-view tr:hover td {
// //     background: #f8f9fa;
// //   }
// //   .content-container .table-view .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     text-align: center;
// //   }
// //   .content-container .table-view .status-badge.attended { background: #27ae60; }
// //   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
// //   .content-container .table-view .status-badge.closed { background: #e74c3c; }
// //   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
// //   .content-container .table-view .status-badge.normal { background: #3498db; }

// //   /* Card Grid */
// //   .card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// //   }
// //   .card-grid .appt-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #e9ecef;
// //     transition: all 0.2s;
// //     cursor: pointer;
// //   }
// //   .card-grid .appt-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
// //   }
// //   .card-grid .appt-card .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     margin-bottom: 8px;
// //   }
// //   .card-grid .appt-card .patient {
// //     font-size: 18px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .card-grid .appt-card .detail {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     color: #34495e;
// //     font-size: 14px;
// //     margin-top: 4px;
// //   }
// //   .card-grid .appt-card .detail .label {
// //     color: #7f8c8d;
// //     font-size: 13px;
// //   }

// //   /* Status Bar */
// //   .statusbar {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     padding: 10px 20px;
// //     background: white;
// //     border-radius: 10px;
// //     margin-top: 15px;
// //     border: 1px solid #e9ecef;
// //     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
// //   }
// //   .statusbar .loading {
// //     width: 20px;
// //     height: 20px;
// //   }
// //   .statusbar .message {
// //     font-size: 13px;
// //     color: #27ae60;
// //   }
// //   .statusbar .message.error { color: #e74c3c; }
// //   .statusbar .message.loading { color: #f39c12; }
// //   .statusbar .version {
// //     margin-left: auto;
// //     font-size: 12px;
// //     color: #95a5a6;
// //   }

// //   /* Scrollable */
// //   .scrollable {
// //     overflow-y: auto;
// //     max-height: 60vh;
// //   }

// //   /* Utilities */
// //   .flex-row { display: flex; flex-direction: row; }
// //   .flex-1 { flex: 1; }
// //   .h-full { height: 100%; }
// //   .overflow-hidden { overflow: hidden; }
// // `;

// // // -------------------- Helper: format local date --------------------
// // const formatLocalDate = (date) => {
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0');
// //   const day = String(date.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // // -------------------- API call using BASE_URL --------------------
// // const fetchScheduleFromApi = async (date) => {
// //   const formattedDate = formatLocalDate(date);
// //   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
// //   console.log('📤 Fetching:', url);

// //   try {
// //     const response = await fetch(url);
// //     console.log('📡 Response status:', response.status);
// //     const rawText = await response.text();
// //     console.log('📄 Raw response body:', rawText);

// //     if (!response.ok) {
// //       throw new Error(`HTTP ${response.status}: ${rawText}`);
// //     }

// //     return JSON.parse(rawText);
// //   } catch (err) {
// //     console.error('🚨 Fetch error:', err);
// //     throw err;
// //   }
// // };

// // // -------------------- Main Component --------------------
// // const AdminHomePage = () => {
// //   // ---------- Language ----------
// //   const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
// //   const t = adminTranslations[lang];
// //   const isRTL = lang === 'ar';

// //   useEffect(() => {
// //     localStorage.setItem('lang', lang);
// //   }, [lang]);

// //   // ---------- State ----------
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
// //   const [viewMode, setViewMode] = useState('table');
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
// //   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(new Date());

// //   const refreshInterval = useRef(null);

// //   // ---------- Helper: update status ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text, type });
// //   }, []);

// //   // ---------- Load appointments from API ----------
// //   const loadAppointments = useCallback(async (date) => {
// //     setLoading(true);
// //     setStatus(t.status.loading, 'loading');
// //     try {
// //       const data = await fetchScheduleFromApi(date);
// //       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
// //       const rows = allItems.map(item => {
// //         const timeStr = item.visitTime || item.appointmentTime;
// //         const time = timeStr ? new Date(timeStr) : new Date();
// //         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// //         let patientName = '';
// //         if (item.patient) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.patient;
// //           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         } else if (item.patientName) {
// //           patientName = item.patientName;
// //         }

// //         let doctorName = '';
// //         if (item.doctorName) {
// //           doctorName = item.doctorName;
// //         } else if (item.doctor) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
// //           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         }

// //         const roomNumber = item.room?.roomNumber || '';
// //         const sectionName = item.room?.section?.name || '';

// //         return {
// //           id: item.id,
// //           patientName: patientName || 'Unknown',
// //           doctorName: doctorName || 'N/A',
// //           appointmentTimeString: timeString,
// //           roomNumber,
// //           sectionName,
// //           status: item.status || 'NORMAL',
// //           notes: item.notes || '',
// //         };
// //       });

// //       setAppointments(rows);
// //       setFilteredAppointments(rows);

// //       const total = rows.length;
// //       const attended = rows.filter(a => a.status === 'ATTENDED').length;
// //       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
// //       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
// //       setSummary({ total, attended, inProgress, cancelled });
// //       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
// //     } catch (err) {
// //       setStatus(t.status.error, 'error');
// //       console.error('🚨 Load error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t, setStatus]);

// //   // ---------- Apply filter ----------
// //   const applyFilter = useCallback((status) => {
// //     if (status === 'ALL') {
// //       setFilteredAppointments(appointments);
// //     } else {
// //       setFilteredAppointments(appointments.filter(a => a.status === status));
// //     }
// //     setStatus(`${t.status.filtered}: ${status}`, 'info');
// //   }, [appointments, t, setStatus]);

// //   // ---------- Toggle view ----------
// //   const toggleView = useCallback(() => {
// //     setViewMode(prev => prev === 'table' ? 'card' : 'table');
// //   }, []);

// //   // ---------- Clock ----------
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ---------- Clinic info (mock) ----------
// //   useEffect(() => {
// //     const info = {
// //       name: t.clinic.default,
// //       date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
// //         weekday: 'long',
// //         year: 'numeric',
// //         month: 'long',
// //         day: 'numeric',
// //       }),
// //     };
// //     setClinicInfo(info);
// //   }, [lang, t]);

// //   // ---------- Date change handler ----------
// //   const handleDateChange = (e) => {
// //     const newDate = new Date(e.target.value + 'T00:00:00');
// //     setSelectedDate(newDate);
// //   };

// //   // ---------- Initial load and auto‑refresh ----------
// //   useEffect(() => {
// //     loadAppointments(selectedDate);
// //     refreshInterval.current = setInterval(() => {
// //       loadAppointments(selectedDate);
// //     }, 30000);
// //     return () => clearInterval(refreshInterval.current);
// //   }, [selectedDate, loadAppointments]);

// //   // ---------- Language switcher ----------
// //   const handleLanguageChange = (e) => {
// //     setLang(e.target.value);
// //   };

// //   // ---------- Helper: status CSS class ----------
// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'attended';
// //       case 'IN_PROGRESS': return 'inprogress';
// //       case 'CLOSED': return 'closed';
// //       case 'CANCELLED': return 'cancelled';
// //       default: return 'normal';
// //     }
// //   };

// //   // ---------- Render helpers ----------
// //   const renderSummaryCards = () => {
// //     const cards = [
// //       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
// //       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
// //       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
// //       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
// //     ];
// //     return (
// //       <div className="summary">
// //         {cards.map(({ key, label, count, icon, cls, filter }) => (
// //           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
// //             <div className="top-bar"></div>
// //             <div className="icon">{icon}</div>
// //             <div className="title">{label}</div>
// //             <div className="value">{count}</div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderTable = () => (
// //     <table className="table-view">
// //       <thead>
// //         <tr>
// //           <th>{t.table.patient}</th>
// //           <th>{t.table.doctor}</th>
// //           <th>{t.table.time}</th>
// //           <th>{t.table.room}</th>
// //           <th>{t.table.section}</th>
// //           <th>{t.table.status}</th>
// //           <th>{t.table.notes}</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {filteredAppointments.length === 0 ? (
// //           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
// //         ) : (
// //           filteredAppointments.map(a => (
// //             <tr key={a.id}>
// //               <td>{a.patientName}</td>
// //               <td>{a.doctorName}</td>
// //               <td>{a.appointmentTimeString}</td>
// //               <td>{a.roomNumber}</td>
// //               <td>{a.sectionName}</td>
// //               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
// //               <td>{a.notes}</td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   const renderCardGrid = () => (
// //     <div className="card-grid">
// //       {filteredAppointments.length === 0 ? (
// //         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
// //       ) : (
// //         filteredAppointments.map(a => (
// //           <div key={a.id} className="appt-card">
// //             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
// //             <div className="patient">{a.patientName}</div>
// //             <div className="detail"><span>🩺</span> {a.doctorName}</div>
// //             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
// //             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
// //             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );

// //   // ---------- Sidebar menu items ----------
// //   const menuItems = [
// //     { icon: '🔍', label: t.sidebar.searchPatient, action: () => alert(t.sidebar.searchPatient) },
// //     { icon: '📅', label: t.sidebar.appointments, action: () => alert(t.sidebar.appointments) },
// //     { icon: '📝', label: t.sidebar.visitTracking, action: () => alert(t.sidebar.visitTracking) },
// //     { icon: '📑', label: t.sidebar.claimsTracking, action: () => alert(t.sidebar.claimsTracking) },
// //     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
// //     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
// //     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
// //     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
// //     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
// //     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
// //     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
// //     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
// //     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
// //   ];

// //   // ---------- JSX ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
// //         {/* Top Bar */}
// //         <div className="topbar">
// //           <div className="clinic">
// //             <span>🏥</span>
// //             <span>{clinicInfo.name}</span>
// //           </div>
// //           <div className="datetime">
// //             <span>📅 {clinicInfo.date}</span>
// //             <input
// //               type="date"
// //               value={formatLocalDate(selectedDate)}
// //               onChange={handleDateChange}
// //             />
// //             <select value={lang} onChange={handleLanguageChange}>
// //               <option value="en">🇬🇧 English</option>
// //               <option value="ar">🇸🇦 العربية</option>
// //             </select>
// //             <span>
// //               <span className="clock-icon">🕐</span>
// //               <span className="time">
// //                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
// //                   hour: '2-digit',
// //                   minute: '2-digit',
// //                   second: '2-digit',
// //                 })}
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex-row flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           <div className="sidebar">
// //             <div className="header">
// //               <span className="icon">☰</span>
// //               <span className="title">{t.sidebar.menu}</span>
// //             </div>
// //             <div className="menu">
// //               {menuItems.map((item, idx) => (
// //                 <button key={idx} onClick={item.action}>
// //                   <span>{item.icon}</span>
// //                   <span className="label">{item.label}</span>
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="logout">
// //               <button onClick={() => { alert(t.sidebar.logout); }}>
// //                 <span>🚪</span>
// //                 <span className="label">{t.sidebar.logout}</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Main Content */}
// //           <div className="main">
// //             <div className="title">
// //               <span>📊</span>
// //               <span>{t.dashboard.title}</span>
// //             </div>

// //             {renderSummaryCards()}

// //             <button className="toggle-btn" onClick={toggleView}>
// //               {viewMode === 'table'
// //                 ? `📇 ${t.dashboard.switchToCard}`
// //                 : `📋 ${t.dashboard.switchToTable}`}
// //             </button>

// //             <div className="content-container">
// //               <div className="scrollable">
// //                 {viewMode === 'table' ? renderTable() : renderCardGrid()}
// //               </div>
// //             </div>

// //             {/* Status Bar */}
// //             <div className="statusbar">
// //               {loading && <div className="loading">⏳</div>}
// //               <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
// //               <span className="version">v2.0.0</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminHomePage; Work 29062026 2:55 PM 

// // import React, {
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// // } from 'react';
// // import { adminTranslations } from '../../i18n/adminTranslations';
// // import { BASE_URL, fetchClinicInfo } from '../../utils/api';   // 👈 import fetchClinicInfo

// // // -------------------- Styles (inline) --------------------
// // const styles = `
// //   * {
// //     margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .app {
// //     display: flex;
// //     flex-direction: column;
// //     height: 100vh;
// //     background: #f0f2f5;
// //     overflow: hidden;
// //   }
// //   /* Top Bar */
// //   .topbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 12px 25px;
// //     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
// //     color: white;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //     flex-shrink: 0;
// //   }
// //   .topbar .clinic {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 24px;
// //     font-weight: bold;
// //     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// //   }
// //   .topbar .datetime {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     font-size: 16px;
// //     flex-wrap: wrap;
// //   }
// //   .topbar .datetime .time {
// //     font-weight: bold;
// //     color: #f1c40f;
// //     font-size: 20px;
// //   }
// //   .topbar .datetime .clock-icon {
// //     display: inline-block;
// //     animation: spin 60s linear infinite;
// //   }
// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   .topbar .datetime input[type="date"] {
// //     padding: 5px 10px;
// //     border-radius: 5px;
// //     border: none;
// //     background: #fff;
// //     color: #2c3e50;
// //     font-weight: bold;
// //     cursor: pointer;
// //   }
// //   .topbar .datetime select {
// //     padding: 5px 10px;
// //     border-radius: 5px;
// //     border: none;
// //     background: #fff;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     cursor: pointer;
// //   }
// //   /* Sidebar */
// //   .sidebar {
// //     display: flex;
// //     flex-direction: column;
// //     background: rgba(44, 62, 80, 0.98);
// //     color: #ecf0f1;
// //     width: 65px;
// //     min-width: 65px;
// //     padding: 15px 12px;
// //     transition: width 0.3s ease;
// //     overflow: hidden;
// //     flex-shrink: 0;
// //     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
// //   }
// //   .sidebar:hover {
// //     width: 250px;
// //   }
// //   .sidebar .header {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid rgba(255,255,255,0.1);
// //     margin-bottom: 10px;
// //     white-space: nowrap;
// //   }
// //   .sidebar .header .icon {
// //     font-size: 24px;
// //   }
// //   .sidebar .header .title {
// //     font-size: 18px;
// //     font-weight: bold;
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .header .title {
// //     opacity: 1;
// //   }
// //   .sidebar .menu {
// //     flex: 1;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 6px;
// //     overflow-y: auto;
// //   }
// //   .sidebar .menu button {
// //     background: transparent;
// //     border: none;
// //     color: #ecf0f1;
// //     padding: 8px 15px;
// //     border-radius: 8px;
// //     text-align: left;
// //     font-size: 14px;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     white-space: nowrap;
// //     transition: all 0.2s;
// //     width: 100%;
// //   }
// //   .sidebar .menu button:hover {
// //     background: rgba(255,255,255,0.15);
// //     transform: scale(1.02);
// //     border-left: 3px solid #3498db;
// //   }
// //   .sidebar .menu button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .menu button .label {
// //     opacity: 1;
// //   }
// //   .sidebar .logout {
// //     margin-top: auto;
// //     padding-top: 10px;
// //     border-top: 1px solid rgba(255,255,255,0.1);
// //   }
// //   .sidebar .logout button {
// //     background: #c0392b;
// //     color: white;
// //     font-weight: bold;
// //     border-radius: 8px;
// //     padding: 10px 15px;
// //     width: 100%;
// //     border: none;
// //     cursor: pointer;
// //     font-size: 14px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     transition: all 0.2s;
// //   }
// //   .sidebar .logout button:hover {
// //     background: #e74c3c;
// //     transform: scale(1.05);
// //   }
// //   .sidebar .logout button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .logout button .label {
// //     opacity: 1;
// //   }

// //   /* Main Content */
// //   .main {
// //     flex: 1;
// //     padding: 20px;
// //     overflow-y: auto;
// //     background: #f0f2f5;
// //   }
// //   .main .title {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     margin-bottom: 20px;
// //   }
// //   /* Summary Cards */
// //   .summary {
// //     display: flex;
// //     gap: 15px;
// //     justify-content: center;
// //     flex-wrap: wrap;
// //     margin-bottom: 20px;
// //   }
// //   .summary .card {
// //     flex: 1;
// //     min-width: 150px;
// //     max-width: 220px;
// //     padding: 12px;
// //     border-radius: 14px;
// //     text-align: center;
// //     color: white;
// //     cursor: pointer;
// //     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
// //     transition: all 0.2s;
// //     position: relative;
// //     overflow: hidden;
// //   }
// //   .summary .card:hover {
// //     transform: scale(1.05);
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
// //   }
// //   .summary .card .icon { font-size: 28px; }
// //   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
// //   .summary .card .value { font-size: 34px; font-weight: bold; }
// //   .summary .card .top-bar {
// //     height: 5px;
// //     background: rgba(255,255,255,0.3);
// //     border-radius: 12px 12px 0 0;
// //     margin: -12px -12px 10px -12px;
// //   }
// //   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
// //   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
// //   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
// //   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

// //   /* Toggle Button */
// //   .toggle-btn {
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     color: white;
// //     border: none;
// //     padding: 12px 30px;
// //     border-radius: 30px;
// //     font-weight: bold;
// //     font-size: 16px;
// //     cursor: pointer;
// //     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
// //     transition: all 0.2s;
// //     margin-bottom: 15px;
// //   }
// //   .toggle-btn:hover {
// //     transform: scale(1.08);
// //     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
// //   }

// //   /* Table / Card Container */
// //   .content-container {
// //     background: white;
// //     border-radius: 10px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// //     padding: 0;
// //     overflow: hidden;
// //     transition: opacity 0.3s;
// //     position: relative;
// //     min-height: 400px;
// //   }
// //   .content-container .table-view {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }
// //   .content-container .table-view th {
// //     background: #f8f9fa;
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //   }
// //   .content-container .table-view td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //     font-size: 13px;
// //   }
// //   .content-container .table-view tr:hover td {
// //     background: #f8f9fa;
// //   }
// //   .content-container .table-view .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     text-align: center;
// //   }
// //   .content-container .table-view .status-badge.attended { background: #27ae60; }
// //   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
// //   .content-container .table-view .status-badge.closed { background: #e74c3c; }
// //   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
// //   .content-container .table-view .status-badge.normal { background: #3498db; }

// //   /* Card Grid */
// //   .card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// //   }
// //   .card-grid .appt-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #e9ecef;
// //     transition: all 0.2s;
// //     cursor: pointer;
// //   }
// //   .card-grid .appt-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
// //   }
// //   .card-grid .appt-card .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     margin-bottom: 8px;
// //   }
// //   .card-grid .appt-card .patient {
// //     font-size: 18px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .card-grid .appt-card .detail {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     color: #34495e;
// //     font-size: 14px;
// //     margin-top: 4px;
// //   }
// //   .card-grid .appt-card .detail .label {
// //     color: #7f8c8d;
// //     font-size: 13px;
// //   }

// //   /* Status Bar */
// //   .statusbar {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     padding: 10px 20px;
// //     background: white;
// //     border-radius: 10px;
// //     margin-top: 15px;
// //     border: 1px solid #e9ecef;
// //     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
// //   }
// //   .statusbar .loading {
// //     width: 20px;
// //     height: 20px;
// //   }
// //   .statusbar .message {
// //     font-size: 13px;
// //     color: #27ae60;
// //   }
// //   .statusbar .message.error { color: #e74c3c; }
// //   .statusbar .message.loading { color: #f39c12; }
// //   .statusbar .version {
// //     margin-left: auto;
// //     font-size: 12px;
// //     color: #95a5a6;
// //   }

// //   /* Scrollable */
// //   .scrollable {
// //     overflow-y: auto;
// //     max-height: 60vh;
// //   }

// //   /* Utilities */
// //   .flex-row { display: flex; flex-direction: row; }
// //   .flex-1 { flex: 1; }
// //   .h-full { height: 100%; }
// //   .overflow-hidden { overflow: hidden; }
// // `;

// // // -------------------- Helper: format local date --------------------
// // const formatLocalDate = (date) => {
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0');
// //   const day = String(date.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // // -------------------- API call using BASE_URL --------------------
// // const fetchScheduleFromApi = async (date) => {
// //   const formattedDate = formatLocalDate(date);
// //   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
// //   console.log('📤 Fetching:', url);

// //   try {
// //     const response = await fetch(url);
// //     console.log('📡 Response status:', response.status);
// //     const rawText = await response.text();
// //     console.log('📄 Raw response body:', rawText);

// //     if (!response.ok) {
// //       throw new Error(`HTTP ${response.status}: ${rawText}`);
// //     }

// //     return JSON.parse(rawText);
// //   } catch (err) {
// //     console.error('🚨 Fetch error:', err);
// //     throw err;
// //   }
// // };

// // // -------------------- Main Component --------------------
// // const AdminHomePage = () => {
// //   // ---------- Language ----------
// //   const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
// //   const t = adminTranslations[lang];
// //   const isRTL = lang === 'ar';

// //   useEffect(() => {
// //     localStorage.setItem('lang', lang);
// //   }, [lang]);

// //   // ---------- State ----------
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
// //   const [viewMode, setViewMode] = useState('table');
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
// //   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(new Date());

// //   const refreshInterval = useRef(null);

// //   // ---------- Helper: update status ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text, type });
// //   }, []);

// //   // ---------- Load clinic info from API ----------
// //   useEffect(() => {
// //     const loadClinic = async () => {
// //       try {
// //         const data = await fetchClinicInfo();
// //         if (data) {
// //           // Use clinicName and day + date from response
// //           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
// //           setClinicInfo({
// //             name: data.clinicName || t.clinic.default,
// //             date: displayDate,
// //           });
// //           // Optionally sync language if clinic has different language
// //           if (data.language && data.language !== lang) {
// //             setLang(data.language);
// //           }
// //         } else {
// //           // Fallback to default
// //           setClinicInfo({
// //             name: t.clinic.default,
// //             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
// //               weekday: 'long',
// //               year: 'numeric',
// //               month: 'long',
// //               day: 'numeric',
// //             }),
// //           });
// //         }
// //       } catch (err) {
// //         console.warn('Failed to fetch clinic info:', err);
// //         // Keep default
// //       }
// //     };
// //     loadClinic();
// //   }, [lang, t]);

// //   // ---------- Load appointments from API ----------
// //   const loadAppointments = useCallback(async (date) => {
// //     setLoading(true);
// //     setStatus(t.status.loading, 'loading');
// //     try {
// //       const data = await fetchScheduleFromApi(date);
// //       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
// //       const rows = allItems.map(item => {
// //         const timeStr = item.visitTime || item.appointmentTime;
// //         const time = timeStr ? new Date(timeStr) : new Date();
// //         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// //         let patientName = '';
// //         if (item.patient) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.patient;
// //           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         } else if (item.patientName) {
// //           patientName = item.patientName;
// //         }

// //         let doctorName = '';
// //         if (item.doctorName) {
// //           doctorName = item.doctorName;
// //         } else if (item.doctor) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
// //           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         }

// //         const roomNumber = item.room?.roomNumber || '';
// //         const sectionName = item.room?.section?.name || '';

// //         return {
// //           id: item.id,
// //           patientName: patientName || 'Unknown',
// //           doctorName: doctorName || 'N/A',
// //           appointmentTimeString: timeString,
// //           roomNumber,
// //           sectionName,
// //           status: item.status || 'NORMAL',
// //           notes: item.notes || '',
// //         };
// //       });

// //       setAppointments(rows);
// //       setFilteredAppointments(rows);

// //       const total = rows.length;
// //       const attended = rows.filter(a => a.status === 'ATTENDED').length;
// //       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
// //       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
// //       setSummary({ total, attended, inProgress, cancelled });
// //       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
// //     } catch (err) {
// //       setStatus(t.status.error, 'error');
// //       console.error('🚨 Load error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t, setStatus]);

// //   // ---------- Apply filter ----------
// //   const applyFilter = useCallback((status) => {
// //     if (status === 'ALL') {
// //       setFilteredAppointments(appointments);
// //     } else {
// //       setFilteredAppointments(appointments.filter(a => a.status === status));
// //     }
// //     setStatus(`${t.status.filtered}: ${status}`, 'info');
// //   }, [appointments, t, setStatus]);

// //   // ---------- Toggle view ----------
// //   const toggleView = useCallback(() => {
// //     setViewMode(prev => prev === 'table' ? 'card' : 'table');
// //   }, []);

// //   // ---------- Clock ----------
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ---------- Date change handler ----------
// //   const handleDateChange = (e) => {
// //     const newDate = new Date(e.target.value + 'T00:00:00');
// //     setSelectedDate(newDate);
// //   };

// //   // ---------- Initial load and auto‑refresh ----------
// //   useEffect(() => {
// //     loadAppointments(selectedDate);
// //     refreshInterval.current = setInterval(() => {
// //       loadAppointments(selectedDate);
// //     }, 30000);
// //     return () => clearInterval(refreshInterval.current);
// //   }, [selectedDate, loadAppointments]);

// //   // ---------- Language switcher ----------
// //   const handleLanguageChange = (e) => {
// //     setLang(e.target.value);
// //   };

// //   // ---------- Helper: status CSS class ----------
// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'attended';
// //       case 'IN_PROGRESS': return 'inprogress';
// //       case 'CLOSED': return 'closed';
// //       case 'CANCELLED': return 'cancelled';
// //       default: return 'normal';
// //     }
// //   };

// //   // ---------- Render helpers (unchanged) ----------
// //   const renderSummaryCards = () => {
// //     const cards = [
// //       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
// //       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
// //       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
// //       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
// //     ];
// //     return (
// //       <div className="summary">
// //         {cards.map(({ key, label, count, icon, cls, filter }) => (
// //           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
// //             <div className="top-bar"></div>
// //             <div className="icon">{icon}</div>
// //             <div className="title">{label}</div>
// //             <div className="value">{count}</div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderTable = () => (
// //     <table className="table-view">
// //       <thead>
// //         <tr>
// //           <th>{t.table.patient}</th>
// //           <th>{t.table.doctor}</th>
// //           <th>{t.table.time}</th>
// //           <th>{t.table.room}</th>
// //           <th>{t.table.section}</th>
// //           <th>{t.table.status}</th>
// //           <th>{t.table.notes}</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {filteredAppointments.length === 0 ? (
// //           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
// //         ) : (
// //           filteredAppointments.map(a => (
// //             <tr key={a.id}>
// //               <td>{a.patientName}</td>
// //               <td>{a.doctorName}</td>
// //               <td>{a.appointmentTimeString}</td>
// //               <td>{a.roomNumber}</td>
// //               <td>{a.sectionName}</td>
// //               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
// //               <td>{a.notes}</td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   const renderCardGrid = () => (
// //     <div className="card-grid">
// //       {filteredAppointments.length === 0 ? (
// //         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
// //       ) : (
// //         filteredAppointments.map(a => (
// //           <div key={a.id} className="appt-card">
// //             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
// //             <div className="patient">{a.patientName}</div>
// //             <div className="detail"><span>🩺</span> {a.doctorName}</div>
// //             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
// //             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
// //             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );

// //   // ---------- Sidebar menu items ----------
// //   const menuItems = [
// //     { icon: '🔍', label: t.sidebar.searchPatient, action: () => alert(t.sidebar.searchPatient) },
// //     { icon: '📅', label: t.sidebar.appointments, action: () => alert(t.sidebar.appointments) },
// //     { icon: '📝', label: t.sidebar.visitTracking, action: () => alert(t.sidebar.visitTracking) },
// //     { icon: '📑', label: t.sidebar.claimsTracking, action: () => alert(t.sidebar.claimsTracking) },
// //     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
// //     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
// //     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
// //     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
// //     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
// //     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
// //     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
// //     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
// //     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
// //   ];

// //   // ---------- JSX ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
// //         {/* Top Bar */}
// //         <div className="topbar">
// //           <div className="clinic">
// //             <span>🏥</span>
// //             <span>{clinicInfo.name}</span>
// //           </div>
// //           <div className="datetime">
// //             <span>📅 {clinicInfo.date}</span>
// //             <input
// //               type="date"
// //               value={formatLocalDate(selectedDate)}
// //               onChange={handleDateChange}
// //             />
// //             <select value={lang} onChange={handleLanguageChange}>
// //               <option value="en">🇬🇧 English</option>
// //               <option value="ar">🇸🇦 العربية</option>
// //             </select>
// //             <span>
// //               <span className="clock-icon">🕐</span>
// //               <span className="time">
// //                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
// //                   hour: '2-digit',
// //                   minute: '2-digit',
// //                   second: '2-digit',
// //                 })}
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex-row flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           <div className="sidebar">
// //             <div className="header">
// //               <span className="icon">☰</span>
// //               <span className="title">{t.sidebar.menu}</span>
// //             </div>
// //             <div className="menu">
// //               {menuItems.map((item, idx) => (
// //                 <button key={idx} onClick={item.action}>
// //                   <span>{item.icon}</span>
// //                   <span className="label">{item.label}</span>
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="logout">
// //               <button onClick={() => { alert(t.sidebar.logout); }}>
// //                 <span>🚪</span>
// //                 <span className="label">{t.sidebar.logout}</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Main Content */}
// //           <div className="main">
// //             <div className="title">
// //               <span>📊</span>
// //               <span>{t.dashboard.title}</span>
// //             </div>

// //             {renderSummaryCards()}

// //             <button className="toggle-btn" onClick={toggleView}>
// //               {viewMode === 'table'
// //                 ? `📇 ${t.dashboard.switchToCard}`
// //                 : `📋 ${t.dashboard.switchToTable}`}
// //             </button>

// //             <div className="content-container">
// //               <div className="scrollable">
// //                 {viewMode === 'table' ? renderTable() : renderCardGrid()}
// //               </div>
// //             </div>

// //             {/* Status Bar */}
// //             <div className="statusbar">
// //               {loading && <div className="loading">⏳</div>}
// //               <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
// //               <span className="version">v2.0.0</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminHomePage;


// // import React, {
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// // } from 'react';
// // import { adminTranslations } from '../../i18n/adminTranslations';
// // import { BASE_URL, fetchClinicInfo } from '../../utils/api';

// // // -------------------- Styles (inline) --------------------
// // const styles = `
// //   * {
// //     margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .app {
// //     display: flex;
// //     flex-direction: column;
// //     height: 100vh;
// //     background: #f0f2f5;
// //     overflow: hidden;
// //   }
// //   /* Top Bar */
// //   .topbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 12px 25px;
// //     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
// //     color: white;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //     flex-shrink: 0;
// //   }
// //   .topbar .clinic {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 24px;
// //     font-weight: bold;
// //     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// //   }
// //   .topbar .datetime {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     font-size: 16px;
// //     flex-wrap: wrap;
// //   }
// //   .topbar .datetime .time {
// //     font-weight: bold;
// //     color: #f1c40f;
// //     font-size: 20px;
// //   }
// //   .topbar .datetime .clock-icon {
// //     display: inline-block;
// //     animation: spin 60s linear infinite;
// //   }
// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   .topbar .datetime input[type="date"] {
// //     padding: 5px 10px;
// //     border-radius: 5px;
// //     border: none;
// //     background: #fff;
// //     color: #2c3e50;
// //     font-weight: bold;
// //     cursor: pointer;
// //   }
// //   .topbar .datetime select {
// //     padding: 5px 10px;
// //     border-radius: 5px;
// //     border: none;
// //     background: #fff;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     cursor: pointer;
// //   }
// //   /* Sidebar */
// //   .sidebar {
// //     display: flex;
// //     flex-direction: column;
// //     background: rgba(44, 62, 80, 0.98);
// //     color: #ecf0f1;
// //     width: 65px;
// //     min-width: 65px;
// //     padding: 15px 12px;
// //     transition: width 0.3s ease;
// //     overflow: hidden;
// //     flex-shrink: 0;
// //     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
// //   }
// //   .sidebar:hover {
// //     width: 250px;
// //   }
// //   .sidebar .header {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid rgba(255,255,255,0.1);
// //     margin-bottom: 10px;
// //     white-space: nowrap;
// //   }
// //   .sidebar .header .icon {
// //     font-size: 24px;
// //   }
// //   .sidebar .header .title {
// //     font-size: 18px;
// //     font-weight: bold;
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .header .title {
// //     opacity: 1;
// //   }
// //   .sidebar .menu {
// //     flex: 1;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 6px;
// //     overflow-y: auto;
// //   }
// //   .sidebar .menu button {
// //     background: transparent;
// //     border: none;
// //     color: #ecf0f1;
// //     padding: 8px 15px;
// //     border-radius: 8px;
// //     text-align: left;
// //     font-size: 14px;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     white-space: nowrap;
// //     transition: all 0.2s;
// //     width: 100%;
// //   }
// //   .sidebar .menu button:hover {
// //     background: rgba(255,255,255,0.15);
// //     transform: scale(1.02);
// //     border-left: 3px solid #3498db;
// //   }
// //   .sidebar .menu button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .menu button .label {
// //     opacity: 1;
// //   }
// //   .sidebar .logout {
// //     margin-top: auto;
// //     padding-top: 10px;
// //     border-top: 1px solid rgba(255,255,255,0.1);
// //   }
// //   .sidebar .logout button {
// //     background: #c0392b;
// //     color: white;
// //     font-weight: bold;
// //     border-radius: 8px;
// //     padding: 10px 15px;
// //     width: 100%;
// //     border: none;
// //     cursor: pointer;
// //     font-size: 14px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     transition: all 0.2s;
// //   }
// //   .sidebar .logout button:hover {
// //     background: #e74c3c;
// //     transform: scale(1.05);
// //   }
// //   .sidebar .logout button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .logout button .label {
// //     opacity: 1;
// //   }

// //   /* Main Content */
// //   .main {
// //     flex: 1;
// //     padding: 20px;
// //     overflow-y: auto;
// //     background: #f0f2f5;
// //   }
// //   .main .title {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     margin-bottom: 20px;
// //   }
// //   /* Summary Cards */
// //   .summary {
// //     display: flex;
// //     gap: 15px;
// //     justify-content: center;
// //     flex-wrap: wrap;
// //     margin-bottom: 20px;
// //   }
// //   .summary .card {
// //     flex: 1;
// //     min-width: 150px;
// //     max-width: 220px;
// //     padding: 12px;
// //     border-radius: 14px;
// //     text-align: center;
// //     color: white;
// //     cursor: pointer;
// //     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
// //     transition: all 0.2s;
// //     position: relative;
// //     overflow: hidden;
// //   }
// //   .summary .card:hover {
// //     transform: scale(1.05);
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
// //   }
// //   .summary .card .icon { font-size: 28px; }
// //   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
// //   .summary .card .value { font-size: 34px; font-weight: bold; }
// //   .summary .card .top-bar {
// //     height: 5px;
// //     background: rgba(255,255,255,0.3);
// //     border-radius: 12px 12px 0 0;
// //     margin: -12px -12px 10px -12px;
// //   }
// //   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
// //   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
// //   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
// //   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

// //   /* Toggle Button */
// //   .toggle-btn {
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     color: white;
// //     border: none;
// //     padding: 12px 30px;
// //     border-radius: 30px;
// //     font-weight: bold;
// //     font-size: 16px;
// //     cursor: pointer;
// //     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
// //     transition: all 0.2s;
// //     margin-bottom: 15px;
// //   }
// //   .toggle-btn:hover {
// //     transform: scale(1.08);
// //     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
// //   }

// //   /* Table / Card Container */
// //   .content-container {
// //     background: white;
// //     border-radius: 10px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// //     padding: 0;
// //     overflow: hidden;
// //     transition: opacity 0.3s;
// //     position: relative;
// //     min-height: 400px;
// //   }
// //   .content-container .table-view {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }
// //   .content-container .table-view th {
// //     background: #f8f9fa;
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //   }
// //   .content-container .table-view td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //     font-size: 13px;
// //   }
// //   .content-container .table-view tr:hover td {
// //     background: #f0f2f5 !important;
// //   }
// //   .content-container .table-view .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     text-align: center;
// //   }
// //   .content-container .table-view .status-badge.attended { background: #27ae60; }
// //   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
// //   .content-container .table-view .status-badge.closed { background: #e74c3c; }
// //   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
// //   .content-container .table-view .status-badge.normal { background: #3498db; }

// //   /* Table row background colors */
// //   .content-container .table-view tbody tr.row-attended {
// //     background-color: #d4edda;
// //   }
// //   .content-container .table-view tbody tr.row-inprogress {
// //     background-color: #fff3cd;
// //   }
// //   .content-container .table-view tbody tr.row-closed {
// //     background-color: #f8d7da;
// //   }
// //   .content-container .table-view tbody tr.row-cancelled {
// //     background-color: #e2e3e5;
// //   }
// //   .content-container .table-view tbody tr.row-normal {
// //     background-color: #cce5ff;
// //   }

// //   /* Card Grid */
// //   .card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// //   }
// //   .card-grid .appt-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #e9ecef;
// //     transition: all 0.2s;
// //     cursor: pointer;
// //   }
// //   .card-grid .appt-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
// //   }
// //   .card-grid .appt-card .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     margin-bottom: 8px;
// //   }
// //   .card-grid .appt-card .patient {
// //     font-size: 18px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .card-grid .appt-card .detail {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     color: #34495e;
// //     font-size: 14px;
// //     margin-top: 4px;
// //   }
// //   .card-grid .appt-card .detail .label {
// //     color: #7f8c8d;
// //     font-size: 13px;
// //   }

// //   /* Card background colors with left border */
// //   .card-grid .appt-card.row-attended {
// //     background-color: #d4edda;
// //     border-left: 6px solid #28a745;
// //   }
// //   .card-grid .appt-card.row-inprogress {
// //     background-color: #fff3cd;
// //     border-left: 6px solid #ffc107;
// //   }
// //   .card-grid .appt-card.row-closed {
// //     background-color: #f8d7da;
// //     border-left: 6px solid #dc3545;
// //   }
// //   .card-grid .appt-card.row-cancelled {
// //     background-color: #e2e3e5;
// //     border-left: 6px solid #6c757d;
// //   }
// //   .card-grid .appt-card.row-normal {
// //     background-color: #cce5ff;
// //     border-left: 6px solid #007bff;
// //   }

// //   /* Status Bar */
// //   .statusbar {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     padding: 10px 20px;
// //     background: white;
// //     border-radius: 10px;
// //     margin-top: 15px;
// //     border: 1px solid #e9ecef;
// //     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
// //   }
// //   .statusbar .loading {
// //     width: 20px;
// //     height: 20px;
// //   }
// //   .statusbar .message {
// //     font-size: 13px;
// //     color: #27ae60;
// //   }
// //   .statusbar .message.error { color: #e74c3c; }
// //   .statusbar .message.loading { color: #f39c12; }
// //   .statusbar .version {
// //     margin-left: auto;
// //     font-size: 12px;
// //     color: #95a5a6;
// //   }

// //   /* Scrollable */
// //   .scrollable {
// //     overflow-y: auto;
// //     max-height: 60vh;
// //   }

// //   /* Utilities */
// //   .flex-row { display: flex; flex-direction: row; }
// //   .flex-1 { flex: 1; }
// //   .h-full { height: 100%; }
// //   .overflow-hidden { overflow: hidden; }
// // `;

// // // -------------------- Helper: format local date --------------------
// // const formatLocalDate = (date) => {
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0');
// //   const day = String(date.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // // -------------------- API call using BASE_URL --------------------
// // const fetchScheduleFromApi = async (date) => {
// //   const formattedDate = formatLocalDate(date);
// //   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
// //   console.log('📤 Fetching:', url);

// //   try {
// //     const response = await fetch(url);
// //     console.log('📡 Response status:', response.status);
// //     const rawText = await response.text();
// //     console.log('📄 Raw response body:', rawText);

// //     if (!response.ok) {
// //       throw new Error(`HTTP ${response.status}: ${rawText}`);
// //     }

// //     return JSON.parse(rawText);
// //   } catch (err) {
// //     console.error('🚨 Fetch error:', err);
// //     throw err;
// //   }
// // };

// // // -------------------- Main Component --------------------
// // const AdminHomePage = () => {
// //   // ---------- Language ----------
// //   const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
// //   const t = adminTranslations[lang];
// //   const isRTL = lang === 'ar';

// //   useEffect(() => {
// //     localStorage.setItem('lang', lang);
// //   }, [lang]);

// //   // ---------- State ----------
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
// //   const [viewMode, setViewMode] = useState('table');
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
// //   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(new Date());

// //   const refreshInterval = useRef(null);

// //   // ---------- Helper: update status ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text, type });
// //   }, []);

// //   // ---------- Load clinic info from API ----------
// //   useEffect(() => {
// //     const loadClinic = async () => {
// //       try {
// //         const data = await fetchClinicInfo();
// //         if (data) {
// //           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
// //           setClinicInfo({
// //             name: data.clinicName || t.clinic.default,
// //             date: displayDate,
// //           });
// //           if (data.language && data.language !== lang) {
// //             setLang(data.language);
// //           }
// //         } else {
// //           setClinicInfo({
// //             name: t.clinic.default,
// //             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
// //               weekday: 'long',
// //               year: 'numeric',
// //               month: 'long',
// //               day: 'numeric',
// //             }),
// //           });
// //         }
// //       } catch (err) {
// //         console.warn('Failed to fetch clinic info:', err);
// //       }
// //     };
// //     loadClinic();
// //   }, [lang, t]);

// //   // ---------- Load appointments from API ----------
// //   const loadAppointments = useCallback(async (date) => {
// //     setLoading(true);
// //     setStatus(t.status.loading, 'loading');
// //     try {
// //       const data = await fetchScheduleFromApi(date);
// //       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
// //       const rows = allItems.map(item => {
// //         const timeStr = item.visitTime || item.appointmentTime;
// //         const time = timeStr ? new Date(timeStr) : new Date();
// //         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// //         let patientName = '';
// //         if (item.patient) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.patient;
// //           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         } else if (item.patientName) {
// //           patientName = item.patientName;
// //         }

// //         let doctorName = '';
// //         if (item.doctorName) {
// //           doctorName = item.doctorName;
// //         } else if (item.doctor) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
// //           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         }

// //         const roomNumber = item.room?.roomNumber || '';
// //         const sectionName = item.room?.section?.name || '';

// //         return {
// //           id: item.id,
// //           patientName: patientName || 'Unknown',
// //           doctorName: doctorName || 'N/A',
// //           appointmentTimeString: timeString,
// //           roomNumber,
// //           sectionName,
// //           status: item.status || 'NORMAL',
// //           notes: item.notes || '',
// //         };
// //       });

// //       setAppointments(rows);
// //       setFilteredAppointments(rows);

// //       const total = rows.length;
// //       const attended = rows.filter(a => a.status === 'ATTENDED').length;
// //       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
// //       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
// //       setSummary({ total, attended, inProgress, cancelled });
// //       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
// //     } catch (err) {
// //       setStatus(t.status.error, 'error');
// //       console.error('🚨 Load error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t, setStatus]);

// //   // ---------- Apply filter ----------
// //   const applyFilter = useCallback((status) => {
// //     if (status === 'ALL') {
// //       setFilteredAppointments(appointments);
// //     } else {
// //       setFilteredAppointments(appointments.filter(a => a.status === status));
// //     }
// //     setStatus(`${t.status.filtered}: ${status}`, 'info');
// //   }, [appointments, t, setStatus]);

// //   // ---------- Toggle view ----------
// //   const toggleView = useCallback(() => {
// //     setViewMode(prev => prev === 'table' ? 'card' : 'table');
// //   }, []);

// //   // ---------- Clock ----------
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ---------- Date change handler ----------
// //   const handleDateChange = (e) => {
// //     const newDate = new Date(e.target.value + 'T00:00:00');
// //     setSelectedDate(newDate);
// //   };

// //   // ---------- Initial load and auto‑refresh ----------
// //   useEffect(() => {
// //     loadAppointments(selectedDate);
// //     refreshInterval.current = setInterval(() => {
// //       loadAppointments(selectedDate);
// //     }, 30000);
// //     return () => clearInterval(refreshInterval.current);
// //   }, [selectedDate, loadAppointments]);

// //   // ---------- Language switcher ----------
// //   const handleLanguageChange = (e) => {
// //     setLang(e.target.value);
// //   };

// //   // ---------- Helper: status CSS class for badge ----------
// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'attended';
// //       case 'IN_PROGRESS': return 'inprogress';
// //       case 'CLOSED': return 'closed';
// //       case 'CANCELLED': return 'cancelled';
// //       default: return 'normal';
// //     }
// //   };

// //   // ---------- Helper: row/card background class ----------
// //   const getRowStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'row-attended';
// //       case 'IN_PROGRESS': return 'row-inprogress';
// //       case 'CLOSED': return 'row-closed';
// //       case 'CANCELLED': return 'row-cancelled';
// //       default: return 'row-normal';
// //     }
// //   };

// //   // ---------- Render helpers ----------
// //   const renderSummaryCards = () => {
// //     const cards = [
// //       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
// //       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
// //       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
// //       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
// //     ];
// //     return (
// //       <div className="summary">
// //         {cards.map(({ key, label, count, icon, cls, filter }) => (
// //           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
// //             <div className="top-bar"></div>
// //             <div className="icon">{icon}</div>
// //             <div className="title">{label}</div>
// //             <div className="value">{count}</div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderTable = () => (
// //     <table className="table-view">
// //       <thead>
// //         <tr>
// //           <th>{t.table.patient}</th>
// //           <th>{t.table.doctor}</th>
// //           <th>{t.table.time}</th>
// //           <th>{t.table.room}</th>
// //           <th>{t.table.section}</th>
// //           <th>{t.table.status}</th>
// //           <th>{t.table.notes}</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {filteredAppointments.length === 0 ? (
// //           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
// //         ) : (
// //           filteredAppointments.map(a => (
// //             <tr key={a.id} className={getRowStatusClass(a.status)}>
// //               <td>{a.patientName}</td>
// //               <td>{a.doctorName}</td>
// //               <td>{a.appointmentTimeString}</td>
// //               <td>{a.roomNumber}</td>
// //               <td>{a.sectionName}</td>
// //               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
// //               <td>{a.notes}</td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   const renderCardGrid = () => (
// //     <div className="card-grid">
// //       {filteredAppointments.length === 0 ? (
// //         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
// //       ) : (
// //         filteredAppointments.map(a => (
// //           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
// //             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
// //             <div className="patient">{a.patientName}</div>
// //             <div className="detail"><span>🩺</span> {a.doctorName}</div>
// //             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
// //             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
// //             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );

// //   // ---------- Sidebar menu items ----------
// //   const menuItems = [
// //     { icon: '🔍', label: t.sidebar.searchPatient, action: () => alert(t.sidebar.searchPatient) },
// //     { icon: '📅', label: t.sidebar.appointments, action: () => alert(t.sidebar.appointments) },
// //     { icon: '📝', label: t.sidebar.visitTracking, action: () => alert(t.sidebar.visitTracking) },
// //     { icon: '📑', label: t.sidebar.claimsTracking, action: () => alert(t.sidebar.claimsTracking) },
// //     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
// //     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
// //     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
// //     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
// //     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
// //     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
// //     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
// //     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
// //     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
// //   ];

// //   // ---------- JSX ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
// //         {/* Top Bar */}
// //         <div className="topbar">
// //           <div className="clinic">
// //             <span>🏥</span>
// //             <span>{clinicInfo.name}</span>
// //           </div>
// //           <div className="datetime">
// //             <span>📅 {clinicInfo.date}</span>
// //             <input
// //               type="date"
// //               value={formatLocalDate(selectedDate)}
// //               onChange={handleDateChange}
// //             />
// //             <select value={lang} onChange={handleLanguageChange}>
// //               <option value="en">🇬🇧 English</option>
// //               <option value="ar">🇸🇦 العربية</option>
// //             </select>
// //             <span>
// //               <span className="clock-icon">🕐</span>
// //               <span className="time">
// //                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
// //                   hour: '2-digit',
// //                   minute: '2-digit',
// //                   second: '2-digit',
// //                 })}
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex-row flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           <div className="sidebar">
// //             <div className="header">
// //               <span className="icon">☰</span>
// //               <span className="title">{t.sidebar.menu}</span>
// //             </div>
// //             <div className="menu">
// //               {menuItems.map((item, idx) => (
// //                 <button key={idx} onClick={item.action}>
// //                   <span>{item.icon}</span>
// //                   <span className="label">{item.label}</span>
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="logout">
// //               <button onClick={() => { alert(t.sidebar.logout); }}>
// //                 <span>🚪</span>
// //                 <span className="label">{t.sidebar.logout}</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Main Content */}
// //           <div className="main">
// //             <div className="title">
// //               <span>📊</span>
// //               <span>{t.dashboard.title}</span>
// //             </div>

// //             {renderSummaryCards()}

// //             <button className="toggle-btn" onClick={toggleView}>
// //               {viewMode === 'table'
// //                 ? `📇 ${t.dashboard.switchToCard}`
// //                 : `📋 ${t.dashboard.switchToTable}`}
// //             </button>

// //             <div className="content-container">
// //               <div className="scrollable">
// //                 {viewMode === 'table' ? renderTable() : renderCardGrid()}
// //               </div>
// //             </div>

// //             {/* Status Bar */}
// //             <div className="statusbar">
// //               {loading && <div className="loading">⏳</div>}
// //               <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
// //               <span className="version">v2.0.0</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminHomePage; -- 29062026


// // import React, {
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// // } from 'react';
// // import { useNavigate } from 'react-router-dom'; // ✅ Added for navigation
// // import { adminTranslations } from '../../i18n/adminTranslations';
// // import { BASE_URL, fetchClinicInfo } from '../../utils/api';

// // // -------------------- Styles (inline) --------------------
// // const styles = `
// //   * {
// //     margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .app {
// //     display: flex;
// //     flex-direction: column;
// //     height: 100vh;
// //     background: #f0f2f5;
// //     overflow: hidden;
// //   }
// //   /* Top Bar */
// //   .topbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 12px 25px;
// //     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
// //     color: white;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //     flex-shrink: 0;
// //   }
// //   .topbar .clinic {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 24px;
// //     font-weight: bold;
// //     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// //   }
// //   .topbar .datetime {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     font-size: 16px;
// //     flex-wrap: wrap;
// //   }
// //   .topbar .datetime .time {
// //     font-weight: bold;
// //     color: #f1c40f;
// //     font-size: 20px;
// //   }
// //   .topbar .datetime .clock-icon {
// //     display: inline-block;
// //     animation: spin 60s linear infinite;
// //   }
// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   .topbar .datetime input[type="date"] {
// //     padding: 5px 10px;
// //     border-radius: 5px;
// //     border: none;
// //     background: #fff;
// //     color: #2c3e50;
// //     font-weight: bold;
// //     cursor: pointer;
// //   }
// //   .topbar .datetime select {
// //     padding: 5px 10px;
// //     border-radius: 5px;
// //     border: none;
// //     background: #fff;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     cursor: pointer;
// //   }
// //   /* Sidebar */
// //   .sidebar {
// //     display: flex;
// //     flex-direction: column;
// //     background: rgba(44, 62, 80, 0.98);
// //     color: #ecf0f1;
// //     width: 65px;
// //     min-width: 65px;
// //     padding: 15px 12px;
// //     transition: width 0.3s ease;
// //     overflow: hidden;
// //     flex-shrink: 0;
// //     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
// //   }
// //   .sidebar:hover {
// //     width: 250px;
// //   }
// //   .sidebar .header {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid rgba(255,255,255,0.1);
// //     margin-bottom: 10px;
// //     white-space: nowrap;
// //   }
// //   .sidebar .header .icon {
// //     font-size: 24px;
// //   }
// //   .sidebar .header .title {
// //     font-size: 18px;
// //     font-weight: bold;
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .header .title {
// //     opacity: 1;
// //   }
// //   .sidebar .menu {
// //     flex: 1;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 6px;
// //     overflow-y: auto;
// //   }
// //   .sidebar .menu button {
// //     background: transparent;
// //     border: none;
// //     color: #ecf0f1;
// //     padding: 8px 15px;
// //     border-radius: 8px;
// //     text-align: left;
// //     font-size: 14px;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     white-space: nowrap;
// //     transition: all 0.2s;
// //     width: 100%;
// //   }
// //   .sidebar .menu button:hover {
// //     background: rgba(255,255,255,0.15);
// //     transform: scale(1.02);
// //     border-left: 3px solid #3498db;
// //   }
// //   .sidebar .menu button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .menu button .label {
// //     opacity: 1;
// //   }
// //   .sidebar .logout {
// //     margin-top: auto;
// //     padding-top: 10px;
// //     border-top: 1px solid rgba(255,255,255,0.1);
// //   }
// //   .sidebar .logout button {
// //     background: #c0392b;
// //     color: white;
// //     font-weight: bold;
// //     border-radius: 8px;
// //     padding: 10px 15px;
// //     width: 100%;
// //     border: none;
// //     cursor: pointer;
// //     font-size: 14px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     transition: all 0.2s;
// //   }
// //   .sidebar .logout button:hover {
// //     background: #e74c3c;
// //     transform: scale(1.05);
// //   }
// //   .sidebar .logout button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .logout button .label {
// //     opacity: 1;
// //   }

// //   /* Main Content */
// //   .main {
// //     flex: 1;
// //     padding: 20px;
// //     overflow-y: auto;
// //     background: #f0f2f5;
// //   }
// //   .main .title {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     margin-bottom: 20px;
// //   }
// //   /* Summary Cards */
// //   .summary {
// //     display: flex;
// //     gap: 15px;
// //     justify-content: center;
// //     flex-wrap: wrap;
// //     margin-bottom: 20px;
// //   }
// //   .summary .card {
// //     flex: 1;
// //     min-width: 150px;
// //     max-width: 220px;
// //     padding: 12px;
// //     border-radius: 14px;
// //     text-align: center;
// //     color: white;
// //     cursor: pointer;
// //     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
// //     transition: all 0.2s;
// //     position: relative;
// //     overflow: hidden;
// //   }
// //   .summary .card:hover {
// //     transform: scale(1.05);
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
// //   }
// //   .summary .card .icon { font-size: 28px; }
// //   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
// //   .summary .card .value { font-size: 34px; font-weight: bold; }
// //   .summary .card .top-bar {
// //     height: 5px;
// //     background: rgba(255,255,255,0.3);
// //     border-radius: 12px 12px 0 0;
// //     margin: -12px -12px 10px -12px;
// //   }
// //   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
// //   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
// //   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
// //   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

// //   /* Toggle Button */
// //   .toggle-btn {
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     color: white;
// //     border: none;
// //     padding: 12px 30px;
// //     border-radius: 30px;
// //     font-weight: bold;
// //     font-size: 16px;
// //     cursor: pointer;
// //     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
// //     transition: all 0.2s;
// //     margin-bottom: 15px;
// //   }
// //   .toggle-btn:hover {
// //     transform: scale(1.08);
// //     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
// //   }

// //   /* Table / Card Container */
// //   .content-container {
// //     background: white;
// //     border-radius: 10px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// //     padding: 0;
// //     overflow: hidden;
// //     transition: opacity 0.3s;
// //     position: relative;
// //     min-height: 400px;
// //   }
// //   .content-container .table-view {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }
// //   .content-container .table-view th {
// //     background: #f8f9fa;
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //   }
// //   .content-container .table-view td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //     font-size: 13px;
// //   }
// //   .content-container .table-view tr:hover td {
// //     background: #f0f2f5 !important;
// //   }
// //   .content-container .table-view .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     text-align: center;
// //   }
// //   .content-container .table-view .status-badge.attended { background: #27ae60; }
// //   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
// //   .content-container .table-view .status-badge.closed { background: #e74c3c; }
// //   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
// //   .content-container .table-view .status-badge.normal { background: #3498db; }

// //   /* Table row background colors */
// //   .content-container .table-view tbody tr.row-attended {
// //     background-color: #d4edda;
// //   }
// //   .content-container .table-view tbody tr.row-inprogress {
// //     background-color: #fff3cd;
// //   }
// //   .content-container .table-view tbody tr.row-closed {
// //     background-color: #f8d7da;
// //   }
// //   .content-container .table-view tbody tr.row-cancelled {
// //     background-color: #e2e3e5;
// //   }
// //   .content-container .table-view tbody tr.row-normal {
// //     background-color: #cce5ff;
// //   }

// //   /* Card Grid */
// //   .card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// //   }
// //   .card-grid .appt-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #e9ecef;
// //     transition: all 0.2s;
// //     cursor: pointer;
// //   }
// //   .card-grid .appt-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
// //   }
// //   .card-grid .appt-card .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     margin-bottom: 8px;
// //   }
// //   .card-grid .appt-card .patient {
// //     font-size: 18px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .card-grid .appt-card .detail {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     color: #34495e;
// //     font-size: 14px;
// //     margin-top: 4px;
// //   }
// //   .card-grid .appt-card .detail .label {
// //     color: #7f8c8d;
// //     font-size: 13px;
// //   }

// //   /* Card background colors with left border */
// //   .card-grid .appt-card.row-attended {
// //     background-color: #d4edda;
// //     border-left: 6px solid #28a745;
// //   }
// //   .card-grid .appt-card.row-inprogress {
// //     background-color: #fff3cd;
// //     border-left: 6px solid #ffc107;
// //   }
// //   .card-grid .appt-card.row-closed {
// //     background-color: #f8d7da;
// //     border-left: 6px solid #dc3545;
// //   }
// //   .card-grid .appt-card.row-cancelled {
// //     background-color: #e2e3e5;
// //     border-left: 6px solid #6c757d;
// //   }
// //   .card-grid .appt-card.row-normal {
// //     background-color: #cce5ff;
// //     border-left: 6px solid #007bff;
// //   }

// //   /* Status Bar */
// //   .statusbar {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     padding: 10px 20px;
// //     background: white;
// //     border-radius: 10px;
// //     margin-top: 15px;
// //     border: 1px solid #e9ecef;
// //     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
// //   }
// //   .statusbar .loading {
// //     width: 20px;
// //     height: 20px;
// //   }
// //   .statusbar .message {
// //     font-size: 13px;
// //     color: #27ae60;
// //   }
// //   .statusbar .message.error { color: #e74c3c; }
// //   .statusbar .message.loading { color: #f39c12; }
// //   .statusbar .version {
// //     margin-left: auto;
// //     font-size: 12px;
// //     color: #95a5a6;
// //   }

// //   /* Scrollable */
// //   .scrollable {
// //     overflow-y: auto;
// //     max-height: 60vh;
// //   }

// //   /* Utilities */
// //   .flex-row { display: flex; flex-direction: row; }
// //   .flex-1 { flex: 1; }
// //   .h-full { height: 100%; }
// //   .overflow-hidden { overflow: hidden; }
// // `;

// // // -------------------- Helper: format local date --------------------
// // const formatLocalDate = (date) => {
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0');
// //   const day = String(date.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // // -------------------- API call using BASE_URL --------------------
// // const fetchScheduleFromApi = async (date) => {
// //   const formattedDate = formatLocalDate(date);
// //   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
// //   console.log('📤 Fetching:', url);

// //   try {
// //     const response = await fetch(url);
// //     console.log('📡 Response status:', response.status);
// //     const rawText = await response.text();
// //     console.log('📄 Raw response body:', rawText);

// //     if (!response.ok) {
// //       throw new Error(`HTTP ${response.status}: ${rawText}`);
// //     }

// //     return JSON.parse(rawText);
// //   } catch (err) {
// //     console.error('🚨 Fetch error:', err);
// //     throw err;
// //   }
// // };

// // // -------------------- Main Component --------------------
// // const AdminHomePage = () => {
// //   // ---------- Language ----------
// //   const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
// //   const t = adminTranslations[lang];
// //   const isRTL = lang === 'ar';

// //   useEffect(() => {
// //     localStorage.setItem('lang', lang);
// //   }, [lang]);

// //   // ---------- State ----------
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
// //   const [viewMode, setViewMode] = useState('table');
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
// //   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(new Date());

// //   const refreshInterval = useRef(null);
// //   const navigate = useNavigate(); // ✅ Added for navigation

// //   // ---------- Helper: update status ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text, type });
// //   }, []);

// //   // ---------- Load clinic info from API ----------
// //   useEffect(() => {
// //     const loadClinic = async () => {
// //       try {
// //         const data = await fetchClinicInfo();
// //         if (data) {
// //           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
// //           setClinicInfo({
// //             name: data.clinicName || t.clinic.default,
// //             date: displayDate,
// //           });
// //           if (data.language && data.language !== lang) {
// //             setLang(data.language);
// //           }
// //         } else {
// //           setClinicInfo({
// //             name: t.clinic.default,
// //             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
// //               weekday: 'long',
// //               year: 'numeric',
// //               month: 'long',
// //               day: 'numeric',
// //             }),
// //           });
// //         }
// //       } catch (err) {
// //         console.warn('Failed to fetch clinic info:', err);
// //       }
// //     };
// //     loadClinic();
// //   }, [lang, t]);

// //   // ---------- Load appointments from API ----------
// //   const loadAppointments = useCallback(async (date) => {
// //     setLoading(true);
// //     setStatus(t.status.loading, 'loading');
// //     try {
// //       const data = await fetchScheduleFromApi(date);
// //       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
// //       const rows = allItems.map(item => {
// //         const timeStr = item.visitTime || item.appointmentTime;
// //         const time = timeStr ? new Date(timeStr) : new Date();
// //         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// //         let patientName = '';
// //         if (item.patient) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.patient;
// //           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         } else if (item.patientName) {
// //           patientName = item.patientName;
// //         }

// //         let doctorName = '';
// //         if (item.doctorName) {
// //           doctorName = item.doctorName;
// //         } else if (item.doctor) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
// //           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         }

// //         const roomNumber = item.room?.roomNumber || '';
// //         const sectionName = item.room?.section?.name || '';

// //         return {
// //           id: item.id,
// //           patientName: patientName || 'Unknown',
// //           doctorName: doctorName || 'N/A',
// //           appointmentTimeString: timeString,
// //           roomNumber,
// //           sectionName,
// //           status: item.status || 'NORMAL',
// //           notes: item.notes || '',
// //         };
// //       });

// //       setAppointments(rows);
// //       setFilteredAppointments(rows);

// //       const total = rows.length;
// //       const attended = rows.filter(a => a.status === 'ATTENDED').length;
// //       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
// //       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
// //       setSummary({ total, attended, inProgress, cancelled });
// //       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
// //     } catch (err) {
// //       setStatus(t.status.error, 'error');
// //       console.error('🚨 Load error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t, setStatus]);

// //   // ---------- Apply filter ----------
// //   const applyFilter = useCallback((status) => {
// //     if (status === 'ALL') {
// //       setFilteredAppointments(appointments);
// //     } else {
// //       setFilteredAppointments(appointments.filter(a => a.status === status));
// //     }
// //     setStatus(`${t.status.filtered}: ${status}`, 'info');
// //   }, [appointments, t, setStatus]);

// //   // ---------- Toggle view ----------
// //   const toggleView = useCallback(() => {
// //     setViewMode(prev => prev === 'table' ? 'card' : 'table');
// //   }, []);

// //   // ---------- Clock ----------
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ---------- Date change handler ----------
// //   const handleDateChange = (e) => {
// //     const newDate = new Date(e.target.value + 'T00:00:00');
// //     setSelectedDate(newDate);
// //   };

// //   // ---------- Initial load and auto‑refresh ----------
// //   useEffect(() => {
// //     loadAppointments(selectedDate);
// //     refreshInterval.current = setInterval(() => {
// //       loadAppointments(selectedDate);
// //     }, 30000);
// //     return () => clearInterval(refreshInterval.current);
// //   }, [selectedDate, loadAppointments]);

// //   // ---------- Language switcher ----------
// //   const handleLanguageChange = (e) => {
// //     setLang(e.target.value);
// //   };

// //   // ---------- Helper: status CSS class for badge ----------
// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'attended';
// //       case 'IN_PROGRESS': return 'inprogress';
// //       case 'CLOSED': return 'closed';
// //       case 'CANCELLED': return 'cancelled';
// //       default: return 'normal';
// //     }
// //   };

// //   // ---------- Helper: row/card background class ----------
// //   const getRowStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'row-attended';
// //       case 'IN_PROGRESS': return 'row-inprogress';
// //       case 'CLOSED': return 'row-closed';
// //       case 'CANCELLED': return 'row-cancelled';
// //       default: return 'row-normal';
// //     }
// //   };

// //   // ---------- Logout handler ---------- ✅ Added
// //   const handleLogout = () => {
// //     localStorage.removeItem('adminToken'); // Remove the token
// //     navigate('/'); // Redirect to login page
// //   };

// //   // ---------- Render helpers ----------
// //   const renderSummaryCards = () => {
// //     const cards = [
// //       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
// //       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
// //       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
// //       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
// //     ];
// //     return (
// //       <div className="summary">
// //         {cards.map(({ key, label, count, icon, cls, filter }) => (
// //           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
// //             <div className="top-bar"></div>
// //             <div className="icon">{icon}</div>
// //             <div className="title">{label}</div>
// //             <div className="value">{count}</div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderTable = () => (
// //     <table className="table-view">
// //       <thead>
// //         <tr>
// //           <th>{t.table.patient}</th>
// //           <th>{t.table.doctor}</th>
// //           <th>{t.table.time}</th>
// //           <th>{t.table.room}</th>
// //           <th>{t.table.section}</th>
// //           <th>{t.table.status}</th>
// //           <th>{t.table.notes}</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {filteredAppointments.length === 0 ? (
// //           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
// //         ) : (
// //           filteredAppointments.map(a => (
// //             <tr key={a.id} className={getRowStatusClass(a.status)}>
// //               <td>{a.patientName}</td>
// //               <td>{a.doctorName}</td>
// //               <td>{a.appointmentTimeString}</td>
// //               <td>{a.roomNumber}</td>
// //               <td>{a.sectionName}</td>
// //               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
// //               <td>{a.notes}</td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   const renderCardGrid = () => (
// //     <div className="card-grid">
// //       {filteredAppointments.length === 0 ? (
// //         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
// //       ) : (
// //         filteredAppointments.map(a => (
// //           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
// //             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
// //             <div className="patient">{a.patientName}</div>
// //             <div className="detail"><span>🩺</span> {a.doctorName}</div>
// //             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
// //             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
// //             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );

// //   // ---------- Sidebar menu items ----------
// //   const menuItems = [
// //     { icon: '🔍', label: t.sidebar.searchPatient, action: () => alert(t.sidebar.searchPatient) },
// //     { icon: '📅', label: t.sidebar.appointments, action: () => alert(t.sidebar.appointments) },
// //     { icon: '📝', label: t.sidebar.visitTracking, action: () => alert(t.sidebar.visitTracking) },
// //     { icon: '📑', label: t.sidebar.claimsTracking, action: () => alert(t.sidebar.claimsTracking) },
// //     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
// //     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
// //     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
// //     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
// //     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
// //     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
// //     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
// //     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
// //     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
// //   ];

// //   // ---------- JSX ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
// //         {/* Top Bar */}
// //         <div className="topbar">
// //           <div className="clinic">
// //             <span>🏥</span>
// //             <span>{clinicInfo.name}</span>
// //           </div>
// //           <div className="datetime">
// //             <span>📅 {clinicInfo.date}</span>
// //             <input
// //               type="date"
// //               value={formatLocalDate(selectedDate)}
// //               onChange={handleDateChange}
// //             />
// //             <select value={lang} onChange={handleLanguageChange}>
// //               <option value="en">🇬🇧 English</option>
// //               <option value="ar">🇸🇦 العربية</option>
// //             </select>
// //             <span>
// //               <span className="clock-icon">🕐</span>
// //               <span className="time">
// //                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
// //                   hour: '2-digit',
// //                   minute: '2-digit',
// //                   second: '2-digit',
// //                 })}
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex-row flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           <div className="sidebar">
// //             <div className="header">
// //               <span className="icon">☰</span>
// //               <span className="title">{t.sidebar.menu}</span>
// //             </div>
// //             <div className="menu">
// //               {menuItems.map((item, idx) => (
// //                 <button key={idx} onClick={item.action}>
// //                   <span>{item.icon}</span>
// //                   <span className="label">{item.label}</span>
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="logout">
// //               {/* ✅ Fixed: calls handleLogout instead of alert */}
// //               <button onClick={handleLogout}>
// //                 <span>🚪</span>
// //                 <span className="label">{t.sidebar.logout}</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Main Content */}
// //           <div className="main">
// //             <div className="title">
// //               <span>📊</span>
// //               <span>{t.dashboard.title}</span>
// //             </div>

// //             {renderSummaryCards()}

// //             <button className="toggle-btn" onClick={toggleView}>
// //               {viewMode === 'table'
// //                 ? `📇 ${t.dashboard.switchToCard}`
// //                 : `📋 ${t.dashboard.switchToTable}`}
// //             </button>

// //             <div className="content-container">
// //               <div className="scrollable">
// //                 {viewMode === 'table' ? renderTable() : renderCardGrid()}
// //               </div>
// //             </div>

// //             {/* Status Bar */}
// //             <div className="statusbar">
// //               {loading && <div className="loading">⏳</div>}
// //               <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
// //               <span className="version">v2.0.0</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminHomePage;   -- 29062026 4:00 pm

// // import React, {
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// // } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { adminTranslations } from '../../i18n/adminTranslations';
// // import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// // import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen'; // ✅ Import search screen

// // // -------------------- Styles (inline) --------------------
// // // // -------------------- Styles (inline via <style> tag) --------------------
// // const styles = `
// //   * {
// //     margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .app {
// //     display: flex;
// //     flex-direction: column;
// //     height: 100vh;
// //     background: #f0f2f5;
// //     overflow: hidden;
// //   }
// //   /* Top Bar */
// //   .topbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 12px 25px;
// //     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
// //     color: white;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //     flex-shrink: 0;
// //   }
// //   .topbar .clinic {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 24px;
// //     font-weight: bold;
// //     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// //   }
// //   .topbar .datetime {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     font-size: 16px;
// //   }
// //   .topbar .datetime .time {
// //     font-weight: bold;
// //     color: #f1c40f;
// //     font-size: 20px;
// //   }
// //   .topbar .datetime .clock-icon {
// //     display: inline-block;
// //     animation: spin 60s linear infinite;
// //   }
// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   /* Sidebar */
// //   .sidebar {
// //     display: flex;
// //     flex-direction: column;
// //     background: rgba(44, 62, 80, 0.98);
// //     color: #ecf0f1;
// //     width: 65px;
// //     min-width: 65px;
// //     padding: 15px 12px;
// //     transition: width 0.3s ease;
// //     overflow: hidden;
// //     flex-shrink: 0;
// //     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
// //   }
// //   .sidebar:hover {
// //     width: 250px;
// //   }
// //   .sidebar .header {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid rgba(255,255,255,0.1);
// //     margin-bottom: 10px;
// //     white-space: nowrap;
// //   }
// //   .sidebar .header .icon {
// //     font-size: 24px;
// //   }
// //   .sidebar .header .title {
// //     font-size: 18px;
// //     font-weight: bold;
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .header .title {
// //     opacity: 1;
// //   }
// //   .sidebar .menu {
// //     flex: 1;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 6px;
// //     overflow-y: auto;
// //   }
// //   .sidebar .menu button {
// //     background: transparent;
// //     border: none;
// //     color: #ecf0f1;
// //     padding: 8px 15;
// //     border-radius: 8px;
// //     text-align: left;
// //     font-size: 14px;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     white-space: nowrap;
// //     transition: all 0.2s;
// //     width: 100%;
// //   }
// //   .sidebar .menu button:hover {
// //     background: rgba(255,255,255,0.15);
// //     transform: scale(1.02);
// //     border-left: 3px solid #3498db;
// //   }
// //   .sidebar .menu button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .menu button .label {
// //     opacity: 1;
// //   }
// //   .sidebar .logout {
// //     margin-top: auto;
// //     padding-top: 10px;
// //     border-top: 1px solid rgba(255,255,255,0.1);
// //   }
// //   .sidebar .logout button {
// //     background: #c0392b;
// //     color: white;
// //     font-weight: bold;
// //     border-radius: 8px;
// //     padding: 10px 15;
// //     width: 100%;
// //     border: none;
// //     cursor: pointer;
// //     font-size: 14px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     transition: all 0.2s;
// //   }
// //   .sidebar .logout button:hover {
// //     background: #e74c3c;
// //     transform: scale(1.05);
// //   }
// //   .sidebar .logout button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .logout button .label {
// //     opacity: 1;
// //   }

// //   /* Main Content */
// //   .main {
// //     flex: 1;
// //     padding: 20px;
// //     overflow-y: auto;
// //     background: #f0f2f5;
// //   }
// //   .main .title {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     margin-bottom: 20px;
// //   }
// //   /* Summary Cards */
// //   .summary {
// //     display: flex;
// //     gap: 15px;
// //     justify-content: center;
// //     flex-wrap: wrap;
// //     margin-bottom: 20px;
// //   }
// //   .summary .card {
// //     flex: 1;
// //     min-width: 150px;
// //     max-width: 220px;
// //     padding: 12px;
// //     border-radius: 14px;
// //     text-align: center;
// //     color: white;
// //     cursor: pointer;
// //     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
// //     transition: all 0.2s;
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     position: relative;
// //     overflow: hidden;
// //   }
// //   .summary .card:hover {
// //     transform: scale(1.05);
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
// //   }
// //   .summary .card .icon { font-size: 28px; }
// //   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
// //   .summary .card .value { font-size: 34px; font-weight: bold; }
// //   .summary .card .top-bar {
// //     height: 5px;
// //     background: rgba(255,255,255,0.3);
// //     border-radius: 12px 12px 0 0;
// //     margin: -12px -12px 10px -12px;
// //   }
// //   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
// //   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
// //   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
// //   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

// //   /* Toggle Button */
// //   .toggle-btn {
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     color: white;
// //     border: none;
// //     padding: 12px 30px;
// //     border-radius: 30px;
// //     font-weight: bold;
// //     font-size: 16px;
// //     cursor: pointer;
// //     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
// //     transition: all 0.2s;
// //     margin-bottom: 15px;
// //   }
// //   .toggle-btn:hover {
// //     transform: scale(1.08);
// //     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
// //   }

// //   /* Table / Card Container */
// //   .content-container {
// //     background: white;
// //     border-radius: 10px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// //     padding: 0;
// //     overflow: hidden;
// //     transition: opacity 0.3s;
// //     position: relative;
// //     min-height: 400px;
// //   }
// //   .content-container .table-view {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }
// //   .content-container .table-view th {
// //     background: #f8f9fa;
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //   }
// //   .content-container .table-view td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //     font-size: 13px;
// //   }
// //   .content-container .table-view tr:hover td {
// //     background: #f8f9fa;
// //   }
// //   .content-container .table-view .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     text-align: center;
// //   }
// //   .content-container .table-view .status-badge.attended { background: #27ae60; }
// //   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
// //   .content-container .table-view .status-badge.closed { background: #e74c3c; }
// //   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
// //   .content-container .table-view .status-badge.normal { background: #3498db; }

// //   /* Card Grid */
// //   .card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// //   }
// //   .card-grid .appt-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #e9ecef;
// //     transition: all 0.2s;
// //     cursor: pointer;
// //   }
// //   .card-grid .appt-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
// //   }
// //   .card-grid .appt-card .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     margin-bottom: 8px;
// //   }
// //   .card-grid .appt-card .patient {
// //     font-size: 18px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .card-grid .appt-card .detail {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     color: #34495e;
// //     font-size: 14px;
// //     margin-top: 4px;
// //   }
// //   .card-grid .appt-card .detail .label {
// //     color: #7f8c8d;
// //     font-size: 13px;
// //   }

// //   /* Status Bar */
// //   .statusbar {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     padding: 10px 20px;
// //     background: white;
// //     border-radius: 10px;
// //     margin-top: 15px;
// //     border: 1px solid #e9ecef;
// //     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
// //   }
// //   .statusbar .loading {
// //     width: 20px;
// //     height: 20px;
// //   }
// //   .statusbar .message {
// //     font-size: 13px;
// //     color: #27ae60;
// //   }
// //   .statusbar .message.error { color: #e74c3c; }
// //   .statusbar .message.loading { color: #f39c12; }
// //   .statusbar .version {
// //     margin-left: auto;
// //     font-size: 12px;
// //     color: #95a5a6;
// //   }

// //   /* Scrollable */
// //   .scrollable {
// //     overflow-y: auto;
// //     max-height: 60vh;
// //   }

// //   /* Utilities */
// //   .flex-row { display: flex; flex-direction: row; }
// //   .flex-1 { flex: 1; }
// //   .h-full { height: 100%; }
// //   .overflow-hidden { overflow: hidden; }
// // `;

// // // -------------------- Helper: format local date --------------------
// // const formatLocalDate = (date) => {
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0');
// //   const day = String(date.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // // -------------------- API call using BASE_URL --------------------
// // const fetchScheduleFromApi = async (date) => {
// //   const formattedDate = formatLocalDate(date);
// //   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
// //   console.log('📤 Fetching:', url);

// //   try {
// //     const response = await fetch(url);
// //     console.log('📡 Response status:', response.status);
// //     const rawText = await response.text();
// //     console.log('📄 Raw response body:', rawText);

// //     if (!response.ok) {
// //       throw new Error(`HTTP ${response.status}: ${rawText}`);
// //     }

// //     return JSON.parse(rawText);
// //   } catch (err) {
// //     console.error('🚨 Fetch error:', err);
// //     throw err;
// //   }
// // };

// // // -------------------- Main Component --------------------
// // const AdminHomePage = () => {
// //   // ---------- Language ----------
// //   const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
// //   const t = adminTranslations[lang];
// //   const isRTL = lang === 'ar';

// //   useEffect(() => {
// //     localStorage.setItem('lang', lang);
// //   }, [lang]);

// //   // ---------- State ----------
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
// //   const [viewMode, setViewMode] = useState('table');
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
// //   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [currentScreen, setCurrentScreen] = useState('dashboard'); // ✅ Screen management

// //   const refreshInterval = useRef(null);
// //   const navigate = useNavigate();

// //   // ---------- Helper: update status ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text, type });
// //   }, []);

// //   // ---------- Load clinic info from API ----------
// //   useEffect(() => {
// //     const loadClinic = async () => {
// //       try {
// //         const data = await fetchClinicInfo();
// //         if (data) {
// //           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
// //           setClinicInfo({
// //             name: data.clinicName || t.clinic.default,
// //             date: displayDate,
// //           });
// //           if (data.language && data.language !== lang) {
// //             setLang(data.language);
// //           }
// //         } else {
// //           setClinicInfo({
// //             name: t.clinic.default,
// //             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
// //               weekday: 'long',
// //               year: 'numeric',
// //               month: 'long',
// //               day: 'numeric',
// //             }),
// //           });
// //         }
// //       } catch (err) {
// //         console.warn('Failed to fetch clinic info:', err);
// //       }
// //     };
// //     loadClinic();
// //   }, [lang, t]);

// //   // ---------- Load appointments from API ----------
// //   const loadAppointments = useCallback(async (date) => {
// //     setLoading(true);
// //     setStatus(t.status.loading, 'loading');
// //     try {
// //       const data = await fetchScheduleFromApi(date);
// //       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
// //       const rows = allItems.map(item => {
// //         const timeStr = item.visitTime || item.appointmentTime;
// //         const time = timeStr ? new Date(timeStr) : new Date();
// //         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// //         let patientName = '';
// //         if (item.patient) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.patient;
// //           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         } else if (item.patientName) {
// //           patientName = item.patientName;
// //         }

// //         let doctorName = '';
// //         if (item.doctorName) {
// //           doctorName = item.doctorName;
// //         } else if (item.doctor) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
// //           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         }

// //         const roomNumber = item.room?.roomNumber || '';
// //         const sectionName = item.room?.section?.name || '';

// //         return {
// //           id: item.id,
// //           patientName: patientName || 'Unknown',
// //           doctorName: doctorName || 'N/A',
// //           appointmentTimeString: timeString,
// //           roomNumber,
// //           sectionName,
// //           status: item.status || 'NORMAL',
// //           notes: item.notes || '',
// //         };
// //       });

// //       setAppointments(rows);
// //       setFilteredAppointments(rows);

// //       const total = rows.length;
// //       const attended = rows.filter(a => a.status === 'ATTENDED').length;
// //       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
// //       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
// //       setSummary({ total, attended, inProgress, cancelled });
// //       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
// //     } catch (err) {
// //       setStatus(t.status.error, 'error');
// //       console.error('🚨 Load error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t, setStatus]);

// //   // ---------- Apply filter ----------
// //   const applyFilter = useCallback((status) => {
// //     if (status === 'ALL') {
// //       setFilteredAppointments(appointments);
// //     } else {
// //       setFilteredAppointments(appointments.filter(a => a.status === status));
// //     }
// //     setStatus(`${t.status.filtered}: ${status}`, 'info');
// //   }, [appointments, t, setStatus]);

// //   // ---------- Toggle view ----------
// //   const toggleView = useCallback(() => {
// //     setViewMode(prev => prev === 'table' ? 'card' : 'table');
// //   }, []);

// //   // ---------- Clock ----------
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ---------- Date change handler ----------
// //   const handleDateChange = (e) => {
// //     const newDate = new Date(e.target.value + 'T00:00:00');
// //     setSelectedDate(newDate);
// //   };

// //   // ---------- Initial load and auto‑refresh ----------
// //   useEffect(() => {
// //     loadAppointments(selectedDate);
// //     refreshInterval.current = setInterval(() => {
// //       loadAppointments(selectedDate);
// //     }, 30000);
// //     return () => clearInterval(refreshInterval.current);
// //   }, [selectedDate, loadAppointments]);

// //   // ---------- Language switcher ----------
// //   const handleLanguageChange = (e) => {
// //     setLang(e.target.value);
// //   };

// //   // ---------- Helper: status CSS class for badge ----------
// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'attended';
// //       case 'IN_PROGRESS': return 'inprogress';
// //       case 'CLOSED': return 'closed';
// //       case 'CANCELLED': return 'cancelled';
// //       default: return 'normal';
// //     }
// //   };

// //   // ---------- Helper: row/card background class ----------
// //   const getRowStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'row-attended';
// //       case 'IN_PROGRESS': return 'row-inprogress';
// //       case 'CLOSED': return 'row-closed';
// //       case 'CANCELLED': return 'row-cancelled';
// //       default: return 'row-normal';
// //     }
// //   };

// //   // ---------- Logout handler ----------
// //   const handleLogout = () => {
// //     localStorage.removeItem('adminToken');
// //     navigate('/');
// //   };

// //   // ---------- Render helpers (dashboard) ----------
// //   const renderSummaryCards = () => {
// //     const cards = [
// //       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
// //       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
// //       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
// //       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
// //     ];
// //     return (
// //       <div className="summary">
// //         {cards.map(({ key, label, count, icon, cls, filter }) => (
// //           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
// //             <div className="top-bar"></div>
// //             <div className="icon">{icon}</div>
// //             <div className="title">{label}</div>
// //             <div className="value">{count}</div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderTable = () => (
// //     <table className="table-view">
// //       <thead>
// //         <tr>
// //           <th>{t.table.patient}</th>
// //           <th>{t.table.doctor}</th>
// //           <th>{t.table.time}</th>
// //           <th>{t.table.room}</th>
// //           <th>{t.table.section}</th>
// //           <th>{t.table.status}</th>
// //           <th>{t.table.notes}</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {filteredAppointments.length === 0 ? (
// //           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
// //         ) : (
// //           filteredAppointments.map(a => (
// //             <tr key={a.id} className={getRowStatusClass(a.status)}>
// //               <td>{a.patientName}</td>
// //               <td>{a.doctorName}</td>
// //               <td>{a.appointmentTimeString}</td>
// //               <td>{a.roomNumber}</td>
// //               <td>{a.sectionName}</td>
// //               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
// //               <td>{a.notes}</td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   const renderCardGrid = () => (
// //     <div className="card-grid">
// //       {filteredAppointments.length === 0 ? (
// //         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
// //       ) : (
// //         filteredAppointments.map(a => (
// //           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
// //             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
// //             <div className="patient">{a.patientName}</div>
// //             <div className="detail"><span>🩺</span> {a.doctorName}</div>
// //             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
// //             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
// //             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );

// //   // ---------- Sidebar menu items ----------
// //   const menuItems = [
// //     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') }, // ✅ Now opens search screen
// //     { icon: '📅', label: t.sidebar.appointments, action: () => alert(t.sidebar.appointments) },
// //     { icon: '📝', label: t.sidebar.visitTracking, action: () => alert(t.sidebar.visitTracking) },
// //     { icon: '📑', label: t.sidebar.claimsTracking, action: () => alert(t.sidebar.claimsTracking) },
// //     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
// //     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
// //     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
// //     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
// //     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
// //     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
// //     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
// //     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
// //     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
// //   ];

// //   // ---------- JSX ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
// //         {/* Top Bar */}
// //         <div className="topbar">
// //           <div className="clinic">
// //             <span>🏥</span>
// //             <span>{clinicInfo.name}</span>
// //           </div>
// //           <div className="datetime">
// //             <span>📅 {clinicInfo.date}</span>
// //             <input
// //               type="date"
// //               value={formatLocalDate(selectedDate)}
// //               onChange={handleDateChange}
// //             />
// //             <select value={lang} onChange={handleLanguageChange}>
// //               <option value="en">🇬🇧 English</option>
// //               <option value="ar">🇸🇦 العربية</option>
// //             </select>
// //             <span>
// //               <span className="clock-icon">🕐</span>
// //               <span className="time">
// //                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
// //                   hour: '2-digit',
// //                   minute: '2-digit',
// //                   second: '2-digit',
// //                 })}
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex-row flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           <div className="sidebar">
// //             <div className="header">
// //               <span className="icon">☰</span>
// //               <span className="title">{t.sidebar.menu}</span>
// //             </div>
// //             <div className="menu">
// //               {menuItems.map((item, idx) => (
// //                 <button key={idx} onClick={item.action}>
// //                   <span>{item.icon}</span>
// //                   <span className="label">{item.label}</span>
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="logout">
// //               <button onClick={handleLogout}>
// //                 <span>🚪</span>
// //                 <span className="label">{t.sidebar.logout}</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Main Content – now switches between dashboard and search */}
// //           <div className="main">
// //             {currentScreen === 'dashboard' ? (
// //               <>
// //                 <div className="title">
// //                   <span>📊</span>
// //                   <span>{t.dashboard.title}</span>
// //                 </div>

// //                 {renderSummaryCards()}

// //                 <button className="toggle-btn" onClick={toggleView}>
// //                   {viewMode === 'table'
// //                     ? `📇 ${t.dashboard.switchToCard}`
// //                     : `📋 ${t.dashboard.switchToTable}`}
// //                 </button>

// //                 <div className="content-container">
// //                   <div className="scrollable">
// //                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
// //                   </div>
// //                 </div>

// //                 <div className="statusbar">
// //                   {loading && <div className="loading">⏳</div>}
// //                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
// //                   <span className="version">v2.0.0</span>
// //                 </div>
// //               </>
// //             ) : currentScreen === 'searchPatient' ? (
// //               <SearchPatientScreen
// //                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
// //                 lang={lang}
// //                 onClose={() => setCurrentScreen('dashboard')}
// //               />
// //             ) : null}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminHomePage;



// // import React, {
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// // } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { adminTranslations } from '../../i18n/adminTranslations';
// // import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// // import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';

// // // -------------------- Styles (inline) --------------------
// // const styles = `
// //   * {
// //     margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .app {
// //     display: flex;
// //     flex-direction: column;
// //     height: 100vh;
// //     background: #f0f2f5;
// //     overflow: hidden;
// //   }
// //   /* Top Bar */
// //   .topbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 12px 25px;
// //     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
// //     color: white;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //     flex-shrink: 0;
// //   }
// //   .topbar .clinic {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 24px;
// //     font-weight: bold;
// //     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// //   }
// //   .topbar .datetime {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     font-size: 16px;
// //   }
// //   .topbar .datetime .time {
// //     font-weight: bold;
// //     color: #f1c40f;
// //     font-size: 20px;
// //   }
// //   .topbar .datetime .clock-icon {
// //     display: inline-block;
// //     animation: spin 60s linear infinite;
// //   }
// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   /* Sidebar */
// //   .sidebar {
// //     display: flex;
// //     flex-direction: column;
// //     background: rgba(44, 62, 80, 0.98);
// //     color: #ecf0f1;
// //     width: 65px;
// //     min-width: 65px;
// //     padding: 15px 12px;
// //     transition: width 0.3s ease;
// //     overflow: hidden;
// //     flex-shrink: 0;
// //     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
// //   }
// //   .sidebar:hover {
// //     width: 270px;        
    
// //     }
// //   .sidebar .header {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid rgba(255,255,255,0.1);
// //     margin-bottom: 10px;
// //     white-space: nowrap;
// //       font-size: 20px;     /* was 18px */

// //     }
// //   .sidebar .header .icon {
// //     font-size: 24px;
// //   }
// //   .sidebar .header .title {
// //     font-size: 17px;
// //     font-weight: bold;
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .header .title {
// //     opacity: 1;
// //   }
// //   .sidebar .menu {
// //     flex: 1;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 6px;
// //     overflow-y: auto;
// //   }
// //   .sidebar .menu button {
// //    padding: 10px 16px;     /* was 8px 15px, now modest */
// //   font-size: 15px;        /* was 14px, now +1 */
// //     background: transparent;
// //     border: none;
// //     color: #ecf0f1;
// //     padding: 8px 15;
// //     border-radius: 8px;
// //     text-align: left;
// //     font-size: 14px;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     white-space: nowrap;
// //     transition: all 0.2s;
// //     width: 100%;
// //   }
// //   .sidebar .menu button:hover {
// //     background: rgba(255,255,255,0.15);
// //     transform: scale(1.02);
// //     border-left: 3px solid #3498db;
// //   }
// //   .sidebar .menu button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .menu button .label {
// //     opacity: 1;
// //   }
// //   .sidebar .logout {
// //     margin-top: auto;
// //     padding-top: 10px;
// //     border-top: 1px solid rgba(255,255,255,0.1);
// //   }
// //   .sidebar .logout button {
// //   padding: 10px 16px;     /* match menu */
// //   font-size: 15px;        /* was 14px, now +1 */
// //     background: #c0392b;
// //     color: white;
// //     font-weight: bold;
// //     border-radius: 8px;
// //     padding: 10px 15;
// //     width: 100%;
// //     border: none;
// //     cursor: pointer;
// //     font-size: 14px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     transition: all 0.2s;
// //   }
// //   .sidebar .logout button:hover {
// //     background: #e74c3c;
// //     transform: scale(1.05);
// //   }
// //   .sidebar .logout button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .logout button .label {
// //     opacity: 1;
// //   }

// //   /* Main Content */
// //   .main {
// //     flex: 1;
// //     padding: 20px;
// //     overflow-y: auto;
// //     background: #f0f2f5;
// //   }
// //   .main .title {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     margin-bottom: 20px;
// //   }
// //   /* Summary Cards */
// //   .summary {
// //     display: flex;
// //     gap: 15px;
// //     justify-content: center;
// //     flex-wrap: wrap;
// //     margin-bottom: 20px;
// //   }
// //   .summary .card {
// //     flex: 1;
// //     min-width: 150px;
// //     max-width: 220px;
// //     padding: 12px;
// //     border-radius: 14px;
// //     text-align: center;
// //     color: white;
// //     cursor: pointer;
// //     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
// //     transition: all 0.2s;
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     position: relative;
// //     overflow: hidden;
// //   }
// //   .summary .card:hover {
// //     transform: scale(1.05);
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
// //   }
// //   .summary .card .icon { font-size: 28px; }
// //   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
// //   .summary .card .value { font-size: 34px; font-weight: bold; }
// //   .summary .card .top-bar {
// //     height: 5px;
// //     background: rgba(255,255,255,0.3);
// //     border-radius: 12px 12px 0 0;
// //     margin: -12px -12px 10px -12px;
// //   }
// //   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
// //   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
// //   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
// //   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

// //   /* Toggle Button */
// //   .toggle-btn {
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     color: white;
// //     border: none;
// //     padding: 12px 30px;
// //     border-radius: 30px;
// //     font-weight: bold;
// //     font-size: 16px;
// //     cursor: pointer;
// //     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
// //     transition: all 0.2s;
// //     margin-bottom: 15px;
// //   }
// //   .toggle-btn:hover {
// //     transform: scale(1.08);
// //     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
// //   }

// //   /* Table / Card Container */
// //   .content-container {
// //     background: white;
// //     border-radius: 10px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// //     padding: 0;
// //     overflow: hidden;
// //     transition: opacity 0.3s;
// //     position: relative;
// //     min-height: 400px;
// //   }
// //   .content-container .table-view {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }
// //   .content-container .table-view th {
// //     background: #f8f9fa;
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //   }
// //   .content-container .table-view td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //     font-size: 13px;
// //   }
// //   .content-container .table-view tr:hover td {
// //     background: #f8f9fa;
// //   }
// //   .content-container .table-view .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     text-align: center;
// //   }
// //   .content-container .table-view .status-badge.attended { background: #27ae60; }
// //   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
// //   .content-container .table-view .status-badge.closed { background: #e74c3c; }
// //   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
// //   .content-container .table-view .status-badge.normal { background: #3498db; }

// //   /* Card Grid */
// //   .card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// //   }
// //   .card-grid .appt-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #e9ecef;
// //     transition: all 0.2s;
// //     cursor: pointer;
// //   }
// //   .card-grid .appt-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
// //   }
// //   .card-grid .appt-card .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     margin-bottom: 8px;
// //   }
// //   .card-grid .appt-card .patient {
// //     font-size: 18px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .card-grid .appt-card .detail {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     color: #34495e;
// //     font-size: 14px;
// //     margin-top: 4px;
// //   }
// //   .card-grid .appt-card .detail .label {
// //     color: #7f8c8d;
// //     font-size: 13px;
// //   }

// //   /* Status Bar */
// //   .statusbar {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     padding: 10px 20px;
// //     background: white;
// //     border-radius: 10px;
// //     margin-top: 15px;
// //     border: 1px solid #e9ecef;
// //     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
// //   }
// //   .statusbar .loading {
// //     width: 20px;
// //     height: 20px;
// //   }
// //   .statusbar .message {
// //     font-size: 13px;
// //     color: #27ae60;
// //   }
// //   .statusbar .message.error { color: #e74c3c; }
// //   .statusbar .message.loading { color: #f39c12; }
// //   .statusbar .version {
// //     margin-left: auto;
// //     font-size: 12px;
// //     color: #95a5a6;
// //   }

// //   /* Scrollable */
// //   .scrollable {
// //     overflow-y: auto;
// //     max-height: 60vh;
// //   }

// //   /* Utilities */
// //   .flex-row { display: flex; flex-direction: row; }
// //   .flex-1 { flex: 1; }
// //   .h-full { height: 100%; }
// //   .overflow-hidden { overflow: hidden; }
// // `;

// // // -------------------- Helper: format local date --------------------
// // const formatLocalDate = (date) => {
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0');
// //   const day = String(date.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // // -------------------- API call using BASE_URL --------------------
// // const fetchScheduleFromApi = async (date) => {
// //   const formattedDate = formatLocalDate(date);
// //   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
// //   console.log('📤 Fetching:', url);

// //   try {
// //     const response = await fetch(url);
// //     console.log('📡 Response status:', response.status);
// //     const rawText = await response.text();
// //     console.log('📄 Raw response body:', rawText);

// //     if (!response.ok) {
// //       throw new Error(`HTTP ${response.status}: ${rawText}`);
// //     }

// //     return JSON.parse(rawText);
// //   } catch (err) {
// //     console.error('🚨 Fetch error:', err);
// //     throw err;
// //   }
// // };

// // // -------------------- Main Component --------------------
// // const AdminHomePage = () => {
// //   // ---------- Language (locked – read once from localStorage) ----------
// //   const lang = localStorage.getItem('lang') || 'en';
// //   const t = adminTranslations[lang];
// //   const isRTL = lang === 'ar';

// //   // ---------- State ----------
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
// //   const [viewMode, setViewMode] = useState('table');
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
// //   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [currentScreen, setCurrentScreen] = useState('dashboard');

// //   const refreshInterval = useRef(null);
// //   const navigate = useNavigate();

// //   // ---------- Helper: update status ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text, type });
// //   }, []);

// //   // ---------- Load clinic info from API ----------
// //   useEffect(() => {
// //     const loadClinic = async () => {
// //       try {
// //         const data = await fetchClinicInfo();
// //         if (data) {
// //           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
// //           setClinicInfo({
// //             name: data.clinicName || t.clinic.default,
// //             date: displayDate,
// //           });
// //           // Language is locked – no longer overwritten from API
// //         } else {
// //           setClinicInfo({
// //             name: t.clinic.default,
// //             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
// //               weekday: 'long',
// //               year: 'numeric',
// //               month: 'long',
// //               day: 'numeric',
// //             }),
// //           });
// //         }
// //       } catch (err) {
// //         console.warn('Failed to fetch clinic info:', err);
// //       }
// //     };
// //     loadClinic();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [lang, t]);

// //   // ---------- Load appointments from API ----------
// //   const loadAppointments = useCallback(async (date) => {
// //     setLoading(true);
// //     setStatus(t.status.loading, 'loading');
// //     try {
// //       const data = await fetchScheduleFromApi(date);
// //       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
// //       const rows = allItems.map(item => {
// //         const timeStr = item.visitTime || item.appointmentTime;
// //         const time = timeStr ? new Date(timeStr) : new Date();
// //         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// //         let patientName = '';
// //         if (item.patient) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.patient;
// //           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         } else if (item.patientName) {
// //           patientName = item.patientName;
// //         }

// //         let doctorName = '';
// //         if (item.doctorName) {
// //           doctorName = item.doctorName;
// //         } else if (item.doctor) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
// //           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         }

// //         const roomNumber = item.room?.roomNumber || '';
// //         const sectionName = item.room?.section?.name || '';

// //         return {
// //           id: item.id,
// //           patientName: patientName || 'Unknown',
// //           doctorName: doctorName || 'N/A',
// //           appointmentTimeString: timeString,
// //           roomNumber,
// //           sectionName,
// //           status: item.status || 'NORMAL',
// //           notes: item.notes || '',
// //         };
// //       });

// //       setAppointments(rows);
// //       setFilteredAppointments(rows);

// //       const total = rows.length;
// //       const attended = rows.filter(a => a.status === 'ATTENDED').length;
// //       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
// //       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
// //       setSummary({ total, attended, inProgress, cancelled });
// //       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
// //     } catch (err) {
// //       setStatus(t.status.error, 'error');
// //       console.error('🚨 Load error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t, setStatus]);

// //   // ---------- Apply filter ----------
// //   const applyFilter = useCallback((status) => {
// //     if (status === 'ALL') {
// //       setFilteredAppointments(appointments);
// //     } else {
// //       setFilteredAppointments(appointments.filter(a => a.status === status));
// //     }
// //     setStatus(`${t.status.filtered}: ${status}`, 'info');
// //   }, [appointments, t, setStatus]);

// //   // ---------- Toggle view ----------
// //   const toggleView = useCallback(() => {
// //     setViewMode(prev => prev === 'table' ? 'card' : 'table');
// //   }, []);

// //   // ---------- Clock ----------
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ---------- Date change handler ----------
// //   const handleDateChange = (e) => {
// //     const newDate = new Date(e.target.value + 'T00:00:00');
// //     setSelectedDate(newDate);
// //   };

// //   // ---------- Initial load and auto‑refresh ----------
// //   useEffect(() => {
// //     loadAppointments(selectedDate);
// //     refreshInterval.current = setInterval(() => {
// //       loadAppointments(selectedDate);
// //     }, 30000);
// //     return () => clearInterval(refreshInterval.current);
// //   }, [selectedDate, loadAppointments]);

// //   // ---------- Helper: status CSS class for badge ----------
// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'attended';
// //       case 'IN_PROGRESS': return 'inprogress';
// //       case 'CLOSED': return 'closed';
// //       case 'CANCELLED': return 'cancelled';
// //       default: return 'normal';
// //     }
// //   };

// //   // ---------- Helper: row/card background class ----------
// //   const getRowStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'row-attended';
// //       case 'IN_PROGRESS': return 'row-inprogress';
// //       case 'CLOSED': return 'row-closed';
// //       case 'CANCELLED': return 'row-cancelled';
// //       default: return 'row-normal';
// //     }
// //   };

// //   // ---------- Logout handler ----------
// //   const handleLogout = () => {
// //     localStorage.removeItem('adminToken');
// //     navigate('/');
// //   };

// //   // ---------- Render helpers (dashboard) ----------
// //   const renderSummaryCards = () => {
// //     const cards = [
// //       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
// //       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
// //       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
// //       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
// //     ];
// //     return (
// //       <div className="summary">
// //         {cards.map(({ key, label, count, icon, cls, filter }) => (
// //           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
// //             <div className="top-bar"></div>
// //             <div className="icon">{icon}</div>
// //             <div className="title">{label}</div>
// //             <div className="value">{count}</div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderTable = () => (
// //     <table className="table-view">
// //       <thead>
// //         <tr>
// //           <th>{t.table.patient}</th>
// //           <th>{t.table.doctor}</th>
// //           <th>{t.table.time}</th>
// //           <th>{t.table.room}</th>
// //           <th>{t.table.section}</th>
// //           <th>{t.table.status}</th>
// //           <th>{t.table.notes}</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {filteredAppointments.length === 0 ? (
// //           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
// //         ) : (
// //           filteredAppointments.map(a => (
// //             <tr key={a.id} className={getRowStatusClass(a.status)}>
// //               <td>{a.patientName}</td>
// //               <td>{a.doctorName}</td>
// //               <td>{a.appointmentTimeString}</td>
// //               <td>{a.roomNumber}</td>
// //               <td>{a.sectionName}</td>
// //               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
// //               <td>{a.notes}</td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   const renderCardGrid = () => (
// //     <div className="card-grid">
// //       {filteredAppointments.length === 0 ? (
// //         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
// //       ) : (
// //         filteredAppointments.map(a => (
// //           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
// //             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
// //             <div className="patient">{a.patientName}</div>
// //             <div className="detail"><span>🩺</span> {a.doctorName}</div>
// //             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
// //             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
// //             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );

// //   // ---------- Sidebar menu items ----------
// //   const menuItems = [
// //     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
// //     { icon: '📅', label: t.sidebar.appointments, action: () => alert(t.sidebar.appointments) },
// //     { icon: '📝', label: t.sidebar.visitTracking, action: () => alert(t.sidebar.visitTracking) },
// //     { icon: '📑', label: t.sidebar.claimsTracking, action: () => alert(t.sidebar.claimsTracking) },
// //     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
// //     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
// //     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
// //     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
// //     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
// //     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
// //     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
// //     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
// //     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
// //   ];

// //   // ---------- JSX ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
// //         {/* Top Bar */}
// //         <div className="topbar">
// //           <div className="clinic">
// //             <span>🏥</span>
// //             <span>{clinicInfo.name}</span>
// //           </div>
// //           <div className="datetime">
// //             <span>📅 {clinicInfo.date}</span>
// //             <input
// //               type="date"
// //               value={formatLocalDate(selectedDate)}
// //               onChange={handleDateChange}
// //             />
// //             <span>
// //               <span className="clock-icon">🕐</span>
// //               <span className="time">
// //                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
// //                   hour: '2-digit',
// //                   minute: '2-digit',
// //                   second: '2-digit',
// //                 })}
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex-row flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           <div className="sidebar">
// //             <div className="header">
// //               <span className="icon">☰</span>
// //               <span className="title">{t.sidebar.menu}</span>
// //             </div>
// //             <div className="menu">
// //               {menuItems.map((item, idx) => (
// //                 <button key={idx} onClick={item.action}>
// //                   <span>{item.icon}</span>
// //                   <span className="label">{item.label}</span>
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="logout">
// //               <button onClick={handleLogout}>
// //                 <span>🚪</span>
// //                 <span className="label">{t.sidebar.logout}</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Main Content – now switches between dashboard and search */}
// //           <div className="main">
// //             {currentScreen === 'dashboard' ? (
// //               <>
// //                 <div className="title">
// //                   <span>📊</span>
// //                   <span>{t.dashboard.title}</span>
// //                 </div>

// //                 {renderSummaryCards()}

// //                 <button className="toggle-btn" onClick={toggleView}>
// //                   {viewMode === 'table'
// //                     ? `📇 ${t.dashboard.switchToCard}`
// //                     : `📋 ${t.dashboard.switchToTable}`}
// //                 </button>

// //                 <div className="content-container">
// //                   <div className="scrollable">
// //                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
// //                   </div>
// //                 </div>

// //                 <div className="statusbar">
// //                   {loading && <div className="loading">⏳</div>}
// //                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
// //                   <span className="version">v2.0.0</span>
// //                 </div>
// //               </>
// //             ) : currentScreen === 'searchPatient' ? (
// //               <SearchPatientScreen
// //                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
// //                 lang={lang}
// //                 onClose={() => setCurrentScreen('dashboard')}
// //               />
// //             ) : null}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminHomePage; //30062026 1:30 pm


// // import React, {
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// // } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { adminTranslations } from '../../i18n/adminTranslations';
// // import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// // import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';


// // // -------------------- Styles (inline) --------------------
// // const styles = `
// //   * {
// //     margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .app {
// //     display: flex;
// //     flex-direction: column;
// //     height: 100vh;
// //     background: #f0f2f5;
// //     overflow: hidden;
// //   }
// //   /* Top Bar */
// //   .topbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 12px 25px;
// //     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
// //     color: white;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //     flex-shrink: 0;
// //   }
// //   .topbar .clinic {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 24px;
// //     font-weight: bold;
// //     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// //   }
// //   .topbar .datetime {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     font-size: 16px;
// //   }
// //   .topbar .datetime .time {
// //     font-weight: bold;
// //     color: #f1c40f;
// //     font-size: 20px;
// //   }
// //   .topbar .datetime .clock-icon {
// //     display: inline-block;
// //     animation: spin 60s linear infinite;
// //   }
// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   /* Sidebar */
// //   .sidebar {
// //     display: flex;
// //     flex-direction: column;
// //     background: rgba(44, 62, 80, 0.98);
// //     color: #ecf0f1;
// //     width: 65px;
// //     min-width: 65px;
// //     padding: 15px 12px;
// //     transition: width 0.3s ease;
// //     overflow: hidden;
// //     flex-shrink: 0;
// //     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
// //   }
// //   .sidebar:hover {
// //     width: 270px;        
    
// //     }
// //   .sidebar .header {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid rgba(255,255,255,0.1);
// //     margin-bottom: 10px;
// //     white-space: nowrap;
// //       font-size: 20px;     /* was 18px */

// //     }
// //   .sidebar .header .icon {
// //     font-size: 24px;
// //   }
// //   .sidebar .header .title {
// //     font-size: 17px;
// //     font-weight: bold;
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .header .title {
// //     opacity: 1;
// //   }
// //   .sidebar .menu {
// //     flex: 1;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 6px;
// //     overflow-y: auto;
// //   }
// //   .sidebar .menu button {
// //    padding: 10px 16px;     /* was 8px 15px, now modest */
// //   font-size: 15px;        /* was 14px, now +1 */
// //     background: transparent;
// //     border: none;
// //     color: #ecf0f1;
// //     padding: 8px 15;
// //     border-radius: 8px;
// //     text-align: left;
// //     font-size: 14px;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     white-space: nowrap;
// //     transition: all 0.2s;
// //     width: 100%;
// //   }
// //   .sidebar .menu button:hover {
// //     background: rgba(255,255,255,0.15);
// //     transform: scale(1.02);
// //     border-left: 3px solid #3498db;
// //   }
// //   .sidebar .menu button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .menu button .label {
// //     opacity: 1;
// //   }
// //   .sidebar .logout {
// //     margin-top: auto;
// //     padding-top: 10px;
// //     border-top: 1px solid rgba(255,255,255,0.1);
// //   }
// //   .sidebar .logout button {
// //   padding: 10px 16px;     /* match menu */
// //   font-size: 15px;        /* was 14px, now +1 */
// //     background: #c0392b;
// //     color: white;
// //     font-weight: bold;
// //     border-radius: 8px;
// //     padding: 10px 15;
// //     width: 100%;
// //     border: none;
// //     cursor: pointer;
// //     font-size: 14px;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     transition: all 0.2s;
// //   }
// //   .sidebar .logout button:hover {
// //     background: #e74c3c;
// //     transform: scale(1.05);
// //   }
// //   .sidebar .logout button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .logout button .label {
// //     opacity: 1;
// //   }

// //   /* Main Content */
// //   .main {
// //     flex: 1;
// //     padding: 20px;
// //     overflow-y: auto;
// //     background: #f0f2f5;
// //   }
// //   .main .title {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     margin-bottom: 20px;
// //   }
// //   /* Summary Cards */
// //   .summary {
// //     display: flex;
// //     gap: 15px;
// //     justify-content: center;
// //     flex-wrap: wrap;
// //     margin-bottom: 20px;
// //   }
// //   .summary .card {
// //     flex: 1;
// //     min-width: 150px;
// //     max-width: 220px;
// //     padding: 12px;
// //     border-radius: 14px;
// //     text-align: center;
// //     color: white;
// //     cursor: pointer;
// //     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
// //     transition: all 0.2s;
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     position: relative;
// //     overflow: hidden;
// //   }
// //   .summary .card:hover {
// //     transform: scale(1.05);
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
// //   }
// //   .summary .card .icon { font-size: 28px; }
// //   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
// //   .summary .card .value { font-size: 34px; font-weight: bold; }
// //   .summary .card .top-bar {
// //     height: 5px;
// //     background: rgba(255,255,255,0.3);
// //     border-radius: 12px 12px 0 0;
// //     margin: -12px -12px 10px -12px;
// //   }
// //   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
// //   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
// //   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
// //   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

// //   /* Toggle Button */
// //   .toggle-btn {
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     color: white;
// //     border: none;
// //     padding: 12px 30px;
// //     border-radius: 30px;
// //     font-weight: bold;
// //     font-size: 16px;
// //     cursor: pointer;
// //     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
// //     transition: all 0.2s;
// //     margin-bottom: 15px;
// //   }
// //   .toggle-btn:hover {
// //     transform: scale(1.08);
// //     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
// //   }

// //   /* Table / Card Container */
// //   .content-container {
// //     background: white;
// //     border-radius: 10px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// //     padding: 0;
// //     overflow: hidden;
// //     transition: opacity 0.3s;
// //     position: relative;
// //     min-height: 400px;
// //   }
// //   .content-container .table-view {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }
// //   .content-container .table-view th {
// //     background: #f8f9fa;
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //   }
// //   .content-container .table-view td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //     font-size: 13px;
// //   }
// //   .content-container .table-view tr:hover td {
// //     background: #f8f9fa;
// //   }
// //   .content-container .table-view .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     text-align: center;
// //   }
// //   .content-container .table-view .status-badge.attended { background: #27ae60; }
// //   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
// //   .content-container .table-view .status-badge.closed { background: #e74c3c; }
// //   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
// //   .content-container .table-view .status-badge.normal { background: #3498db; }

// //   /* Card Grid */
// //   .card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// //   }
// //   .card-grid .appt-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #e9ecef;
// //     transition: all 0.2s;
// //     cursor: pointer;
// //   }
// //   .card-grid .appt-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
// //   }
// //   .card-grid .appt-card .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     margin-bottom: 8px;
// //   }
// //   .card-grid .appt-card .patient {
// //     font-size: 18px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .card-grid .appt-card .detail {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     color: #34495e;
// //     font-size: 14px;
// //     margin-top: 4px;
// //   }
// //   .card-grid .appt-card .detail .label {
// //     color: #7f8c8d;
// //     font-size: 13px;
// //   }

// //   /* Status Bar */
// //   .statusbar {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     padding: 10px 20px;
// //     background: white;
// //     border-radius: 10px;
// //     margin-top: 15px;
// //     border: 1px solid #e9ecef;
// //     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
// //   }
// //   .statusbar .loading {
// //     width: 20px;
// //     height: 20px;
// //   }
// //   .statusbar .message {
// //     font-size: 13px;
// //     color: #27ae60;
// //   }
// //   .statusbar .message.error { color: #e74c3c; }
// //   .statusbar .message.loading { color: #f39c12; }
// //   .statusbar .version {
// //     margin-left: auto;
// //     font-size: 12px;
// //     color: #95a5a6;
// //   }

// //   /* Scrollable */
// //   .scrollable {
// //     overflow-y: auto;
// //     max-height: 60vh;
// //   }

// //   /* Utilities */
// //   .flex-row { display: flex; flex-direction: row; }
// //   .flex-1 { flex: 1; }
// //   .h-full { height: 100%; }
// //   .overflow-hidden { overflow: hidden; }
// // `;

// // // -------------------- Helper: format local date --------------------
// // const formatLocalDate = (date) => {
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0');
// //   const day = String(date.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // // -------------------- API call using BASE_URL --------------------
// // const fetchScheduleFromApi = async (date) => {
// //   const formattedDate = formatLocalDate(date);
// //   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
// //   console.log('📤 Fetching:', url);

// //   try {
// //     const response = await fetch(url);
// //     console.log('📡 Response status:', response.status);
// //     const rawText = await response.text();
// //     console.log('📄 Raw response body:', rawText);

// //     if (!response.ok) {
// //       throw new Error(`HTTP ${response.status}: ${rawText}`);
// //     }

// //     return JSON.parse(rawText);
// //   } catch (err) {
// //     console.error('🚨 Fetch error:', err);
// //     throw err;
// //   }
// // };

// // // -------------------- Main Component --------------------
// // const AdminHomePage = () => {
// //   // ---------- Language (locked – read once from localStorage) ----------
// //   const lang = localStorage.getItem('lang') || 'en';
// //   const t = adminTranslations[lang];
// //   const isRTL = lang === 'ar';

// //   // ---------- State ----------
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
// //   const [viewMode, setViewMode] = useState('table');
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
// //   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [currentScreen, setCurrentScreen] = useState('dashboard');

// //   const refreshInterval = useRef(null);
// //   const navigate = useNavigate();

// //   // ---------- Helper: update status ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text, type });
// //   }, []);

// //   // ---------- Load clinic info from API ----------
// //   useEffect(() => {
// //     const loadClinic = async () => {
// //       try {
// //         const data = await fetchClinicInfo();
// //         if (data) {
// //           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
// //           setClinicInfo({
// //             name: data.clinicName || t.clinic.default,
// //             date: displayDate,
// //           });
// //           // Language is locked – no longer overwritten from API
// //         } else {
// //           setClinicInfo({
// //             name: t.clinic.default,
// //             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
// //               weekday: 'long',
// //               year: 'numeric',
// //               month: 'long',
// //               day: 'numeric',
// //             }),
// //           });
// //         }
// //       } catch (err) {
// //         console.warn('Failed to fetch clinic info:', err);
// //       }
// //     };
// //     loadClinic();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [lang, t]);

// //   // ---------- Load appointments from API ----------
// //   const loadAppointments = useCallback(async (date) => {
// //     setLoading(true);
// //     setStatus(t.status.loading, 'loading');
// //     try {
// //       const data = await fetchScheduleFromApi(date);
// //       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
// //       const rows = allItems.map(item => {
// //         const timeStr = item.visitTime || item.appointmentTime;
// //         const time = timeStr ? new Date(timeStr) : new Date();
// //         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// //         let patientName = '';
// //         if (item.patient) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.patient;
// //           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         } else if (item.patientName) {
// //           patientName = item.patientName;
// //         }

// //         let doctorName = '';
// //         if (item.doctorName) {
// //           doctorName = item.doctorName;
// //         } else if (item.doctor) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
// //           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         }

// //         const roomNumber = item.room?.roomNumber || '';
// //         const sectionName = item.room?.section?.name || '';

// //         return {
// //           id: item.id,
// //           patientName: patientName || 'Unknown',
// //           doctorName: doctorName || 'N/A',
// //           appointmentTimeString: timeString,
// //           roomNumber,
// //           sectionName,
// //           status: item.status || 'NORMAL',
// //           notes: item.notes || '',
// //         };
// //       });

// //       setAppointments(rows);
// //       setFilteredAppointments(rows);

// //       const total = rows.length;
// //       const attended = rows.filter(a => a.status === 'ATTENDED').length;
// //       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
// //       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
// //       setSummary({ total, attended, inProgress, cancelled });
// //       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
// //     } catch (err) {
// //       setStatus(t.status.error, 'error');
// //       console.error('🚨 Load error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t, setStatus]);

// //   // ---------- Apply filter ----------
// //   const applyFilter = useCallback((status) => {
// //     if (status === 'ALL') {
// //       setFilteredAppointments(appointments);
// //     } else {
// //       setFilteredAppointments(appointments.filter(a => a.status === status));
// //     }
// //     setStatus(`${t.status.filtered}: ${status}`, 'info');
// //   }, [appointments, t, setStatus]);

// //   // ---------- Toggle view ----------
// //   const toggleView = useCallback(() => {
// //     setViewMode(prev => prev === 'table' ? 'card' : 'table');
// //   }, []);

// //   // ---------- Clock ----------
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ---------- Date change handler ----------
// //   const handleDateChange = (e) => {
// //     const newDate = new Date(e.target.value + 'T00:00:00');
// //     setSelectedDate(newDate);
// //   };

// //   // ---------- Initial load and auto‑refresh ----------
// //   useEffect(() => {
// //     loadAppointments(selectedDate);
// //     refreshInterval.current = setInterval(() => {
// //       loadAppointments(selectedDate);
// //     }, 30000);
// //     return () => clearInterval(refreshInterval.current);
// //   }, [selectedDate, loadAppointments]);

// //   // ---------- Helper: status CSS class for badge ----------
// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'attended';
// //       case 'IN_PROGRESS': return 'inprogress';
// //       case 'CLOSED': return 'closed';
// //       case 'CANCELLED': return 'cancelled';
// //       default: return 'normal';
// //     }
// //   };

// //   // ---------- Helper: row/card background class ----------
// //   const getRowStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'row-attended';
// //       case 'IN_PROGRESS': return 'row-inprogress';
// //       case 'CLOSED': return 'row-closed';
// //       case 'CANCELLED': return 'row-cancelled';
// //       default: return 'row-normal';
// //     }
// //   };

// //   // ---------- Logout handler ----------
// //   const handleLogout = () => {
// //     localStorage.removeItem('adminToken');
// //     navigate('/');
// //   };

// //   // ---------- Render helpers (dashboard) ----------
// //   const renderSummaryCards = () => {
// //     const cards = [
// //       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
// //       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
// //       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
// //       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
// //     ];
// //     return (
// //       <div className="summary">
// //         {cards.map(({ key, label, count, icon, cls, filter }) => (
// //           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
// //             <div className="top-bar"></div>
// //             <div className="icon">{icon}</div>
// //             <div className="title">{label}</div>
// //             <div className="value">{count}</div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderTable = () => (
// //     <table className="table-view">
// //       <thead>
// //         <tr>
// //           <th>{t.table.patient}</th>
// //           <th>{t.table.doctor}</th>
// //           <th>{t.table.time}</th>
// //           <th>{t.table.room}</th>
// //           <th>{t.table.section}</th>
// //           <th>{t.table.status}</th>
// //           <th>{t.table.notes}</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {filteredAppointments.length === 0 ? (
// //           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
// //         ) : (
// //           filteredAppointments.map(a => (
// //             <tr key={a.id} className={getRowStatusClass(a.status)}>
// //               <td>{a.patientName}</td>
// //               <td>{a.doctorName}</td>
// //               <td>{a.appointmentTimeString}</td>
// //               <td>{a.roomNumber}</td>
// //               <td>{a.sectionName}</td>
// //               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
// //               <td>{a.notes}</td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   const renderCardGrid = () => (
// //     <div className="card-grid">
// //       {filteredAppointments.length === 0 ? (
// //         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
// //       ) : (
// //         filteredAppointments.map(a => (
// //           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
// //             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
// //             <div className="patient">{a.patientName}</div>
// //             <div className="detail"><span>🩺</span> {a.doctorName}</div>
// //             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
// //             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
// //             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );

// //   // ---------- Sidebar menu items (with Home button) ----------
// //   const menuItems = [
// //     { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') }, // ✅ NEW HOME BUTTON
// //     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
// //     { icon: '📅', label: t.sidebar.appointments, action: () => alert(t.sidebar.appointments) },
// //     { icon: '📝', label: t.sidebar.visitTracking, action: () => alert(t.sidebar.visitTracking) },
// //     { icon: '📑', label: t.sidebar.claimsTracking, action: () => alert(t.sidebar.claimsTracking) },
// //     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
// //     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
// //     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
// //     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
// //     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
// //     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
// //     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
// //     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
// //     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
// //   ];

// //   // ---------- JSX ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
// //         {/* Top Bar */}
// //         <div className="topbar">
// //           <div className="clinic">
// //             <span>🏥</span>
// //             <span>{clinicInfo.name}</span>
// //           </div>
// //           <div className="datetime">
// //             <span>📅 {clinicInfo.date}</span>
// //             <input
// //               type="date"
// //               value={formatLocalDate(selectedDate)}
// //               onChange={handleDateChange}
// //             />
// //             <span>
// //               <span className="clock-icon">🕐</span>
// //               <span className="time">
// //                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
// //                   hour: '2-digit',
// //                   minute: '2-digit',
// //                   second: '2-digit',
// //                 })}
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex-row flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           <div className="sidebar">
// //             <div className="header">
// //               <span className="icon">☰</span>
// //               <span className="title">{t.sidebar.menu}</span>
// //             </div>
// //             <div className="menu">
// //               {menuItems.map((item, idx) => (
// //                 <button key={idx} onClick={item.action}>
// //                   <span>{item.icon}</span>
// //                   <span className="label">{item.label}</span>
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="logout">
// //               <button onClick={handleLogout}>
// //                 <span>🚪</span>
// //                 <span className="label">{t.sidebar.logout}</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Main Content – now switches between dashboard and search */}
// //           <div className="main">
// //             {currentScreen === 'dashboard' ? (
// //               <>
// //                 <div className="title">
// //                   <span>📊</span>
// //                   <span>{t.dashboard.title}</span>
// //                 </div>

// //                 {renderSummaryCards()}

// //                 <button className="toggle-btn" onClick={toggleView}>
// //                   {viewMode === 'table'
// //                     ? `📇 ${t.dashboard.switchToCard}`
// //                     : `📋 ${t.dashboard.switchToTable}`}
// //                 </button>

// //                 <div className="content-container">
// //                   <div className="scrollable">
// //                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
// //                   </div>
// //                 </div>

// //                 <div className="statusbar">
// //                   {loading && <div className="loading">⏳</div>}
// //                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
// //                   <span className="version">v2.0.0</span>
// //                 </div>
// //               </>
// //             ) : currentScreen === 'searchPatient' ? (
// //               <SearchPatientScreen
// //                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
// //                 lang={lang}
// //                 onClose={() => setCurrentScreen('dashboard')}
// //               />
// //             ) : null}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminHomePage; 30062026  5:00 pm

// // import React, {
// //   useState,
// //   useEffect,
// //   useRef,
// //   useCallback,
// // } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import ReactDOM from 'react-dom'; // ✅ for portal
// // import { adminTranslations } from '../../i18n/adminTranslations';
// // import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// // import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';
// // import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen'; // ✅ import

// // // -------------------- Styles (inline) --------------------
// // const styles = `
// //   * {
// //     margin: 0;
// //     padding: 0;
// //     box-sizing: border-box;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .app {
// //     display: flex;
// //     flex-direction: column;
// //     height: 100vh;
// //     background: #f0f2f5;
// //     overflow: hidden;
// //   }
// //   /* Top Bar */
// //   .topbar {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 12px 25px;
// //     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
// //     color: white;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
// //     flex-shrink: 0;
// //   }
// //   .topbar .clinic {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 24px;
// //     font-weight: bold;
// //     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
// //   }
// //   .topbar .datetime {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     font-size: 16px;
// //   }
// //   .topbar .datetime .time {
// //     font-weight: bold;
// //     color: #f1c40f;
// //     font-size: 20px;
// //   }
// //   .topbar .datetime .clock-icon {
// //     display: inline-block;
// //     animation: spin 60s linear infinite;
// //   }
// //   @keyframes spin {
// //     from { transform: rotate(0deg); }
// //     to { transform: rotate(360deg); }
// //   }
// //   /* Sidebar */
// //   .sidebar {
// //     display: flex;
// //     flex-direction: column;
// //     background: rgba(44, 62, 80, 0.98);
// //     color: #ecf0f1;
// //     width: 65px;
// //     min-width: 65px;
// //     padding: 15px 12px;
// //     transition: width 0.3s ease;
// //     overflow: hidden;
// //     flex-shrink: 0;
// //     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
// //   }
// //   .sidebar:hover {
// //     width: 270px;
// //   }
// //   .sidebar .header {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid rgba(255,255,255,0.1);
// //     margin-bottom: 10px;
// //     white-space: nowrap;
// //     font-size: 20px;
// //   }
// //   .sidebar .header .icon {
// //     font-size: 24px;
// //   }
// //   .sidebar .header .title {
// //     font-size: 17px;
// //     font-weight: bold;
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .header .title {
// //     opacity: 1;
// //   }
// //   .sidebar .menu {
// //     flex: 1;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 6px;
// //     overflow-y: auto;
// //   }
// //   .sidebar .menu button {
// //     padding: 10px 16px;
// //     font-size: 15px;
// //     background: transparent;
// //     border: none;
// //     color: #ecf0f1;
// //     border-radius: 8px;
// //     text-align: left;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     white-space: nowrap;
// //     transition: all 0.2s;
// //     width: 100%;
// //   }
// //   .sidebar .menu button:hover {
// //     background: rgba(255,255,255,0.15);
// //     transform: scale(1.02);
// //     border-left: 3px solid #3498db;
// //   }
// //   .sidebar .menu button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .menu button .label {
// //     opacity: 1;
// //   }
// //   .sidebar .logout {
// //     margin-top: auto;
// //     padding-top: 10px;
// //     border-top: 1px solid rgba(255,255,255,0.1);
// //   }
// //   .sidebar .logout button {
// //     padding: 10px 16px;
// //     font-size: 15px;
// //     background: #c0392b;
// //     color: white;
// //     font-weight: bold;
// //     border-radius: 8px;
// //     width: 100%;
// //     border: none;
// //     cursor: pointer;
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     transition: all 0.2s;
// //   }
// //   .sidebar .logout button:hover {
// //     background: #e74c3c;
// //     transform: scale(1.05);
// //   }
// //   .sidebar .logout button .label {
// //     opacity: 0;
// //     transition: opacity 0.3s;
// //   }
// //   .sidebar:hover .logout button .label {
// //     opacity: 1;
// //   }

// //   /* Main Content */
// //   .main {
// //     flex: 1;
// //     padding: 20px;
// //     overflow-y: auto;
// //     background: #f0f2f5;
// //   }
// //   .main .title {
// //     display: flex;
// //     align-items: center;
// //     gap: 10px;
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     margin-bottom: 20px;
// //   }
// //   /* Summary Cards */
// //   .summary {
// //     display: flex;
// //     gap: 15px;
// //     justify-content: center;
// //     flex-wrap: wrap;
// //     margin-bottom: 20px;
// //   }
// //   .summary .card {
// //     flex: 1;
// //     min-width: 150px;
// //     max-width: 220px;
// //     padding: 12px;
// //     border-radius: 14px;
// //     text-align: center;
// //     color: white;
// //     cursor: pointer;
// //     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
// //     transition: all 0.2s;
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     position: relative;
// //     overflow: hidden;
// //   }
// //   .summary .card:hover {
// //     transform: scale(1.05);
// //     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
// //   }
// //   .summary .card .icon { font-size: 28px; }
// //   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
// //   .summary .card .value { font-size: 34px; font-weight: bold; }
// //   .summary .card .top-bar {
// //     height: 5px;
// //     background: rgba(255,255,255,0.3);
// //     border-radius: 12px 12px 0 0;
// //     margin: -12px -12px 10px -12px;
// //   }
// //   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
// //   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
// //   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
// //   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

// //   /* Toggle Button */
// //   .toggle-btn {
// //     background: linear-gradient(135deg, #3498db, #2980b9);
// //     color: white;
// //     border: none;
// //     padding: 12px 30px;
// //     border-radius: 30px;
// //     font-weight: bold;
// //     font-size: 16px;
// //     cursor: pointer;
// //     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
// //     transition: all 0.2s;
// //     margin-bottom: 15px;
// //   }
// //   .toggle-btn:hover {
// //     transform: scale(1.08);
// //     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
// //   }

// //   /* Table / Card Container */
// //   .content-container {
// //     background: white;
// //     border-radius: 10px;
// //     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// //     padding: 0;
// //     overflow: hidden;
// //     transition: opacity 0.3s;
// //     position: relative;
// //     min-height: 400px;
// //   }
// //   .content-container .table-view {
// //     width: 100%;
// //     border-collapse: collapse;
// //   }
// //   .content-container .table-view th {
// //     background: #f8f9fa;
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //   }
// //   .content-container .table-view td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //     font-size: 13px;
// //   }
// //   .content-container .table-view tr:hover td {
// //     background: #f8f9fa;
// //   }
// //   .content-container .table-view .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     text-align: center;
// //   }
// //   .content-container .table-view .status-badge.attended { background: #27ae60; }
// //   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
// //   .content-container .table-view .status-badge.closed { background: #e74c3c; }
// //   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
// //   .content-container .table-view .status-badge.normal { background: #3498db; }

// //   /* Card Grid */
// //   .card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
// //     gap: 15px;
// //     padding: 20px;
// //   }
// //   .card-grid .appt-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #e9ecef;
// //     transition: all 0.2s;
// //     cursor: pointer;
// //   }
// //   .card-grid .appt-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
// //   }
// //   .card-grid .appt-card .status-badge {
// //     display: inline-block;
// //     padding: 3px 14px;
// //     border-radius: 12px;
// //     font-weight: bold;
// //     font-size: 12px;
// //     color: white;
// //     margin-bottom: 8px;
// //   }
// //   .card-grid .appt-card .patient {
// //     font-size: 18px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .card-grid .appt-card .detail {
// //     display: flex;
// //     align-items: center;
// //     gap: 6px;
// //     color: #34495e;
// //     font-size: 14px;
// //     margin-top: 4px;
// //   }
// //   .card-grid .appt-card .detail .label {
// //     color: #7f8c8d;
// //     font-size: 13px;
// //   }

// //   /* Status Bar */
// //   .statusbar {
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     padding: 10px 20px;
// //     background: white;
// //     border-radius: 10px;
// //     margin-top: 15px;
// //     border: 1px solid #e9ecef;
// //     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
// //   }
// //   .statusbar .loading {
// //     width: 20px;
// //     height: 20px;
// //   }
// //   .statusbar .message {
// //     font-size: 13px;
// //     color: #27ae60;
// //   }
// //   .statusbar .message.error { color: #e74c3c; }
// //   .statusbar .message.loading { color: #f39c12; }
// //   .statusbar .version {
// //     margin-left: auto;
// //     font-size: 12px;
// //     color: #95a5a6;
// //   }

// //   /* Scrollable */
// //   .scrollable {
// //     overflow-y: auto;
// //     max-height: 60vh;
// //   }

// //   /* Utilities */
// //   .flex-row { display: flex; flex-direction: row; }
// //   .flex-1 { flex: 1; }
// //   .h-full { height: 100%; }
// //   .overflow-hidden { overflow: hidden; }
// // `;

// // // -------------------- Helper: format local date --------------------
// // const formatLocalDate = (date) => {
// //   const year = date.getFullYear();
// //   const month = String(date.getMonth() + 1).padStart(2, '0');
// //   const day = String(date.getDate()).padStart(2, '0');
// //   return `${year}-${month}-${day}`;
// // };

// // // -------------------- API call using BASE_URL --------------------
// // const fetchScheduleFromApi = async (date) => {
// //   const formattedDate = formatLocalDate(date);
// //   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
// //   console.log('📤 Fetching:', url);

// //   try {
// //     const response = await fetch(url);
// //     console.log('📡 Response status:', response.status);
// //     const rawText = await response.text();
// //     console.log('📄 Raw response body:', rawText);

// //     if (!response.ok) {
// //       throw new Error(`HTTP ${response.status}: ${rawText}`);
// //     }

// //     return JSON.parse(rawText);
// //   } catch (err) {
// //     console.error('🚨 Fetch error:', err);
// //     throw err;
// //   }
// // };

// // // -------------------- Main Component --------------------
// // const AdminHomePage = () => {
// //   // ---------- Language (locked – read once from localStorage) ----------
// //   const lang = localStorage.getItem('lang') || 'en';
// //   const t = adminTranslations[lang];
// //   const isRTL = lang === 'ar';

// //   // ---------- State ----------
// //   const [appointments, setAppointments] = useState([]);
// //   const [filteredAppointments, setFilteredAppointments] = useState([]);
// //   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
// //   const [viewMode, setViewMode] = useState('table');
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
// //   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [currentScreen, setCurrentScreen] = useState('dashboard');
// //   const [showAppointmentsAdmin, setShowAppointmentsAdmin] = useState(false); // ✅ new state

// //   const refreshInterval = useRef(null);
// //   const navigate = useNavigate();

// //   // ---------- Helper: update status ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text, type });
// //   }, []);

// //   // ---------- Load clinic info from API ----------
// //   useEffect(() => {
// //     const loadClinic = async () => {
// //       try {
// //         const data = await fetchClinicInfo();
// //         if (data) {
// //           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
// //           setClinicInfo({
// //             name: data.clinicName || t.clinic.default,
// //             date: displayDate,
// //           });
// //         } else {
// //           setClinicInfo({
// //             name: t.clinic.default,
// //             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
// //               weekday: 'long',
// //               year: 'numeric',
// //               month: 'long',
// //               day: 'numeric',
// //             }),
// //           });
// //         }
// //       } catch (err) {
// //         console.warn('Failed to fetch clinic info:', err);
// //       }
// //     };
// //     loadClinic();
// //   }, [lang, t]);

// //   // ---------- Load appointments from API ----------
// //   const loadAppointments = useCallback(async (date) => {
// //     setLoading(true);
// //     setStatus(t.status.loading, 'loading');
// //     try {
// //       const data = await fetchScheduleFromApi(date);
// //       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
// //       const rows = allItems.map(item => {
// //         const timeStr = item.visitTime || item.appointmentTime;
// //         const time = timeStr ? new Date(timeStr) : new Date();
// //         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// //         let patientName = '';
// //         if (item.patient) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.patient;
// //           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         } else if (item.patientName) {
// //           patientName = item.patientName;
// //         }

// //         let doctorName = '';
// //         if (item.doctorName) {
// //           doctorName = item.doctorName;
// //         } else if (item.doctor) {
// //           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
// //           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
// //         }

// //         const roomNumber = item.room?.roomNumber || '';
// //         const sectionName = item.room?.section?.name || '';

// //         return {
// //           id: item.id,
// //           patientName: patientName || 'Unknown',
// //           doctorName: doctorName || 'N/A',
// //           appointmentTimeString: timeString,
// //           roomNumber,
// //           sectionName,
// //           status: item.status || 'NORMAL',
// //           notes: item.notes || '',
// //         };
// //       });

// //       setAppointments(rows);
// //       setFilteredAppointments(rows);

// //       const total = rows.length;
// //       const attended = rows.filter(a => a.status === 'ATTENDED').length;
// //       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
// //       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
// //       setSummary({ total, attended, inProgress, cancelled });
// //       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
// //     } catch (err) {
// //       setStatus(t.status.error, 'error');
// //       console.error('🚨 Load error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t, setStatus]);

// //   // ---------- Apply filter ----------
// //   const applyFilter = useCallback((status) => {
// //     if (status === 'ALL') {
// //       setFilteredAppointments(appointments);
// //     } else {
// //       setFilteredAppointments(appointments.filter(a => a.status === status));
// //     }
// //     setStatus(`${t.status.filtered}: ${status}`, 'info');
// //   }, [appointments, t, setStatus]);

// //   // ---------- Toggle view ----------
// //   const toggleView = useCallback(() => {
// //     setViewMode(prev => prev === 'table' ? 'card' : 'table');
// //   }, []);

// //   // ---------- Clock ----------
// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // ---------- Date change handler ----------
// //   const handleDateChange = (e) => {
// //     const newDate = new Date(e.target.value + 'T00:00:00');
// //     setSelectedDate(newDate);
// //   };

// //   // ---------- Initial load and auto‑refresh ----------
// //   useEffect(() => {
// //     loadAppointments(selectedDate);
// //     refreshInterval.current = setInterval(() => {
// //       loadAppointments(selectedDate);
// //     }, 30000);
// //     return () => clearInterval(refreshInterval.current);
// //   }, [selectedDate, loadAppointments]);

// //   // ---------- Helper: status CSS class for badge ----------
// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'attended';
// //       case 'IN_PROGRESS': return 'inprogress';
// //       case 'CLOSED': return 'closed';
// //       case 'CANCELLED': return 'cancelled';
// //       default: return 'normal';
// //     }
// //   };

// //   // ---------- Helper: row/card background class ----------
// //   const getRowStatusClass = (status) => {
// //     switch (status) {
// //       case 'ATTENDED': return 'row-attended';
// //       case 'IN_PROGRESS': return 'row-inprogress';
// //       case 'CLOSED': return 'row-closed';
// //       case 'CANCELLED': return 'row-cancelled';
// //       default: return 'row-normal';
// //     }
// //   };

// //   // ---------- Logout handler ----------
// //   const handleLogout = () => {
// //     localStorage.removeItem('adminToken');
// //     navigate('/');
// //   };

// //   // ---------- Render helpers (dashboard) ----------
// //   const renderSummaryCards = () => {
// //     const cards = [
// //       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
// //       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
// //       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
// //       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
// //     ];
// //     return (
// //       <div className="summary">
// //         {cards.map(({ key, label, count, icon, cls, filter }) => (
// //           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
// //             <div className="top-bar"></div>
// //             <div className="icon">{icon}</div>
// //             <div className="title">{label}</div>
// //             <div className="value">{count}</div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderTable = () => (
// //     <table className="table-view">
// //       <thead>
// //         <tr>
// //           <th>{t.table.patient}</th>
// //           <th>{t.table.doctor}</th>
// //           <th>{t.table.time}</th>
// //           <th>{t.table.room}</th>
// //           <th>{t.table.section}</th>
// //           <th>{t.table.status}</th>
// //           <th>{t.table.notes}</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {filteredAppointments.length === 0 ? (
// //           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
// //         ) : (
// //           filteredAppointments.map(a => (
// //             <tr key={a.id} className={getRowStatusClass(a.status)}>
// //               <td>{a.patientName}</td>
// //               <td>{a.doctorName}</td>
// //               <td>{a.appointmentTimeString}</td>
// //               <td>{a.roomNumber}</td>
// //               <td>{a.sectionName}</td>
// //               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
// //               <td>{a.notes}</td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   const renderCardGrid = () => (
// //     <div className="card-grid">
// //       {filteredAppointments.length === 0 ? (
// //         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
// //       ) : (
// //         filteredAppointments.map(a => (
// //           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
// //             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
// //             <div className="patient">{a.patientName}</div>
// //             <div className="detail"><span>🩺</span> {a.doctorName}</div>
// //             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
// //             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
// //             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );

// //   // ---------- Sidebar menu items (with Home button) ----------
// //   const menuItems = [
// //     { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') },
// //     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
// //     { icon: '📅', label: t.sidebar.appointments, action: () => setShowAppointmentsAdmin(true) }, // ✅ opens admin screen
// //     { icon: '📝', label: t.sidebar.visitTracking, action: () => alert(t.sidebar.visitTracking) },
// //     { icon: '📑', label: t.sidebar.claimsTracking, action: () => alert(t.sidebar.claimsTracking) },
// //     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
// //     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
// //     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
// //     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
// //     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
// //     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
// //     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
// //     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
// //     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
// //   ];

// //   // ---------- JSX ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
// //         {/* Top Bar */}
// //         <div className="topbar">
// //           <div className="clinic">
// //             <span>🏥</span>
// //             <span>{clinicInfo.name}</span>
// //           </div>
// //           <div className="datetime">
// //             <span>📅 {clinicInfo.date}</span>
// //             <input
// //               type="date"
// //               value={formatLocalDate(selectedDate)}
// //               onChange={handleDateChange}
// //             />
// //             <span>
// //               <span className="clock-icon">🕐</span>
// //               <span className="time">
// //                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
// //                   hour: '2-digit',
// //                   minute: '2-digit',
// //                   second: '2-digit',
// //                 })}
// //               </span>
// //             </span>
// //           </div>
// //         </div>

// //         <div className="flex-row flex-1 overflow-hidden">
// //           {/* Sidebar */}
// //           <div className="sidebar">
// //             <div className="header">
// //               <span className="icon">☰</span>
// //               <span className="title">{t.sidebar.menu}</span>
// //             </div>
// //             <div className="menu">
// //               {menuItems.map((item, idx) => (
// //                 <button key={idx} onClick={item.action}>
// //                   <span>{item.icon}</span>
// //                   <span className="label">{item.label}</span>
// //                 </button>
// //               ))}
// //             </div>
// //             <div className="logout">
// //               <button onClick={handleLogout}>
// //                 <span>🚪</span>
// //                 <span className="label">{t.sidebar.logout}</span>
// //               </button>
// //             </div>
// //           </div>

// //           {/* Main Content – switches between dashboard and search */}
// //           <div className="main">
// //             {currentScreen === 'dashboard' ? (
// //               <>
// //                 <div className="title">
// //                   <span>📊</span>
// //                   <span>{t.dashboard.title}</span>
// //                 </div>

// //                 {renderSummaryCards()}

// //                 <button className="toggle-btn" onClick={toggleView}>
// //                   {viewMode === 'table'
// //                     ? `📇 ${t.dashboard.switchToCard}`
// //                     : `📋 ${t.dashboard.switchToTable}`}
// //                 </button>

// //                 <div className="content-container">
// //                   <div className="scrollable">
// //                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
// //                   </div>
// //                 </div>

// //                 <div className="statusbar">
// //                   {loading && <div className="loading">⏳</div>}
// //                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
// //                   <span className="version">v2.0.0</span>
// //                 </div>
// //               </>
// //             ) : currentScreen === 'searchPatient' ? (
// //               <SearchPatientScreen
// //                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
// //                 lang={lang}
// //                 onClose={() => setCurrentScreen('dashboard')}
// //               />
// //             ) : null}
// //           </div>
// //         </div>

// //         {/* ---------- Appointments Admin Modal (Portal) ---------- */}
// //         {showAppointmentsAdmin && ReactDOM.createPortal(
// //           <AppointmentsAdminScreen
// //             refreshCallback={() => {}}
// //             loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
// //             lang={lang}
// //             onClose={() => setShowAppointmentsAdmin(false)}
// //           />,
// //           document.body
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default AdminHomePage; 30062026 9:10 pm

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { adminTranslations } from '../../i18n/adminTranslations';
// import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
// import VisitTrackingScreen from '../VisitTrackingScreen/VisitTrackingScreen';
// import ClaimsTrackingScreen from '../ClaimsTrackingScreen/ClaimsTrackingScreen';

// // -------------------- Styles (inline) --------------------
// const styles = `
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .app {
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
//     background: #f0f2f5;
//     overflow: hidden;
//   }
//   /* Top Bar */
//   .topbar {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 12px 25px;
//     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
//     color: white;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//     flex-shrink: 0;
//   }
//   .topbar .clinic {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 24px;
//     font-weight: bold;
//     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//   }
//   .topbar .datetime {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     font-size: 16px;
//   }
//   .topbar .datetime .time {
//     font-weight: bold;
//     color: #f1c40f;
//     font-size: 20px;
//   }
//   .topbar .datetime .clock-icon {
//     display: inline-block;
//     animation: spin 60s linear infinite;
//   }
//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   /* Sidebar */
//   .sidebar {
//     display: flex;
//     flex-direction: column;
//     background: rgba(44, 62, 80, 0.98);
//     color: #ecf0f1;
//     width: 65px;
//     min-width: 65px;
//     padding: 15px 12px;
//     transition: width 0.3s ease;
//     overflow: hidden;
//     flex-shrink: 0;
//     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
//   }
//   .sidebar:hover {
//     width: 270px;
//   }
//   .sidebar .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid rgba(255,255,255,0.1);
//     margin-bottom: 10px;
//     white-space: nowrap;
//     font-size: 20px;
//   }
//   .sidebar .header .icon {
//     font-size: 24px;
//   }
//   .sidebar .header .title {
//     font-size: 17px;
//     font-weight: bold;
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .header .title {
//     opacity: 1;
//   }
//   .sidebar .menu {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     overflow-y: auto;
//   }
//   .sidebar .menu button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: transparent;
//     border: none;
//     color: #ecf0f1;
//     border-radius: 8px;
//     text-align: left;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     white-space: nowrap;
//     transition: all 0.2s;
//     width: 100%;
//   }
//   .sidebar .menu button:hover {
//     background: rgba(255,255,255,0.15);
//     transform: scale(1.02);
//     border-left: 3px solid #3498db;
//   }
//   .sidebar .menu button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .menu button .label {
//     opacity: 1;
//   }
//   .sidebar .logout {
//     margin-top: auto;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.1);
//   }
//   .sidebar .logout button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: #c0392b;
//     color: white;
//     font-weight: bold;
//     border-radius: 8px;
//     width: 100%;
//     border: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     transition: all 0.2s;
//   }
//   .sidebar .logout button:hover {
//     background: #e74c3c;
//     transform: scale(1.05);
//   }
//   .sidebar .logout button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .logout button .label {
//     opacity: 1;
//   }

//   /* Main Content */
//   .main {
//     flex: 1;
//     padding: 20px;
//     overflow-y: auto;
//     background: #f0f2f5;
//   }
//   .main .title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 28px;
//     font-weight: bold;
//     color: #2c3e50;
//     margin-bottom: 20px;
//   }
//   /* Summary Cards */
//   .summary {
//     display: flex;
//     gap: 15px;
//     justify-content: center;
//     flex-wrap: wrap;
//     margin-bottom: 20px;
//   }
//   .summary .card {
//     flex: 1;
//     min-width: 150px;
//     max-width: 220px;
//     padding: 12px;
//     border-radius: 14px;
//     text-align: center;
//     color: white;
//     cursor: pointer;
//     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
//     transition: all 0.2s;
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     position: relative;
//     overflow: hidden;
//   }
//   .summary .card:hover {
//     transform: scale(1.05);
//     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//   }
//   .summary .card .icon { font-size: 28px; }
//   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
//   .summary .card .value { font-size: 34px; font-weight: bold; }
//   .summary .card .top-bar {
//     height: 5px;
//     background: rgba(255,255,255,0.3);
//     border-radius: 12px 12px 0 0;
//     margin: -12px -12px 10px -12px;
//   }
//   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
//   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
//   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
//   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

//   /* Toggle Button */
//   .toggle-btn {
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     color: white;
//     border: none;
//     padding: 12px 30px;
//     border-radius: 30px;
//     font-weight: bold;
//     font-size: 16px;
//     cursor: pointer;
//     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
//     transition: all 0.2s;
//     margin-bottom: 15px;
//   }
//   .toggle-btn:hover {
//     transform: scale(1.08);
//     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
//   }

//   /* Table / Card Container */
//   .content-container {
//     background: white;
//     border-radius: 10px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//     padding: 0;
//     overflow: hidden;
//     transition: opacity 0.3s;
//     position: relative;
//     min-height: 400px;
//   }
//   .content-container .table-view {
//     width: 100%;
//     border-collapse: collapse;
//   }
//   .content-container .table-view th {
//     background: #f8f9fa;
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2c3e50;
//     border-bottom: 2px solid #e9ecef;
//   }
//   .content-container .table-view td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #f0f0f0;
//     font-size: 13px;
//   }
//   .content-container .table-view tr:hover td {
//     background: #f8f9fa;
//   }
//   .content-container .table-view .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     text-align: center;
//   }
//   .content-container .table-view .status-badge.attended { background: #27ae60; }
//   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
//   .content-container .table-view .status-badge.closed { background: #e74c3c; }
//   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
//   .content-container .table-view .status-badge.normal { background: #3498db; }

//   /* Card Grid */
//   .card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//     gap: 15px;
//     padding: 20px;
//   }
//   .card-grid .appt-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #e9ecef;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .card-grid .appt-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//   }
//   .card-grid .appt-card .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     margin-bottom: 8px;
//   }
//   .card-grid .appt-card .patient {
//     font-size: 18px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .card-grid .appt-card .detail {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     color: #34495e;
//     font-size: 14px;
//     margin-top: 4px;
//   }
//   .card-grid .appt-card .detail .label {
//     color: #7f8c8d;
//     font-size: 13px;
//   }

//   /* Status Bar */
//   .statusbar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 10px;
//     margin-top: 15px;
//     border: 1px solid #e9ecef;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .statusbar .loading {
//     width: 20px;
//     height: 20px;
//   }
//   .statusbar .message {
//     font-size: 13px;
//     color: #27ae60;
//   }
//   .statusbar .message.error { color: #e74c3c; }
//   .statusbar .message.loading { color: #f39c12; }
//   .statusbar .version {
//     margin-left: auto;
//     font-size: 12px;
//     color: #95a5a6;
//   }

//   /* Scrollable */
//   .scrollable {
//     overflow-y: auto;
//     max-height: 60vh;
//   }

//   /* Utilities */
//   .flex-row { display: flex; flex-direction: row; }
//   .flex-1 { flex: 1; }
//   .h-full { height: 100%; }
//   .overflow-hidden { overflow: hidden; }
// `;

// // -------------------- Helper: format local date --------------------
// const formatLocalDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // -------------------- API call using BASE_URL --------------------
// const fetchScheduleFromApi = async (date) => {
//   const formattedDate = formatLocalDate(date);
//   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
//   console.log('📤 Fetching:', url);

//   try {
//     const response = await fetch(url);
//     console.log('📡 Response status:', response.status);
//     const rawText = await response.text();
//     console.log('📄 Raw response body:', rawText);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${rawText}`);
//     }

//     return JSON.parse(rawText);
//   } catch (err) {
//     console.error('🚨 Fetch error:', err);
//     throw err;
//   }
// };

// // -------------------- Main Component --------------------
// const AdminHomePage = () => {
//   // ---------- Language ----------
//   const lang = localStorage.getItem('lang') || 'en';
//   const t = adminTranslations[lang];
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard' | 'searchPatient' | 'appointmentsAdmin'

//   const refreshInterval = useRef(null);
//   const navigate = useNavigate();

//   // ---------- Helper: update status ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text, type });
//   }, []);

//   // ---------- Load clinic info from API ----------
//   useEffect(() => {
//     const loadClinic = async () => {
//       try {
//         const data = await fetchClinicInfo();
//         if (data) {
//           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
//           setClinicInfo({
//             name: data.clinicName || t.clinic.default,
//             date: displayDate,
//           });
//         } else {
//           setClinicInfo({
//             name: t.clinic.default,
//             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             }),
//           });
//         }
//       } catch (err) {
//         console.warn('Failed to fetch clinic info:', err);
//       }
//     };
//     loadClinic();
//   }, [lang, t]);

//   // ---------- Load appointments from API ----------
//   const loadAppointments = useCallback(async (date) => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');
//     try {
//       const data = await fetchScheduleFromApi(date);
//       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
//       const rows = allItems.map(item => {
//         const timeStr = item.visitTime || item.appointmentTime;
//         const time = timeStr ? new Date(timeStr) : new Date();
//         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         let patientName = '';
//         if (item.patient) {
//           const { firstName = '', middleName = '', lastName = '' } = item.patient;
//           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         } else if (item.patientName) {
//           patientName = item.patientName;
//         }

//         let doctorName = '';
//         if (item.doctorName) {
//           doctorName = item.doctorName;
//         } else if (item.doctor) {
//           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
//           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         }

//         const roomNumber = item.room?.roomNumber || '';
//         const sectionName = item.room?.section?.name || '';

//         return {
//           id: item.id,
//           patientName: patientName || 'Unknown',
//           doctorName: doctorName || 'N/A',
//           appointmentTimeString: timeString,
//           roomNumber,
//           sectionName,
//           status: item.status || 'NORMAL',
//           notes: item.notes || '',
//         };
//       });

//       setAppointments(rows);
//       setFilteredAppointments(rows);

//       const total = rows.length;
//       const attended = rows.filter(a => a.status === 'ATTENDED').length;
//       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
//       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
//       setSummary({ total, attended, inProgress, cancelled });
//       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
//     } catch (err) {
//       setStatus(t.status.error, 'error');
//       console.error('🚨 Load error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, setStatus]);

//   // ---------- Apply filter ----------
//   const applyFilter = useCallback((status) => {
//     if (status === 'ALL') {
//       setFilteredAppointments(appointments);
//     } else {
//       setFilteredAppointments(appointments.filter(a => a.status === status));
//     }
//     setStatus(`${t.status.filtered}: ${status}`, 'info');
//   }, [appointments, t, setStatus]);

//   // ---------- Toggle view ----------
//   const toggleView = useCallback(() => {
//     setViewMode(prev => prev === 'table' ? 'card' : 'table');
//   }, []);

//   // ---------- Clock ----------
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // ---------- Date change handler ----------
//   const handleDateChange = (e) => {
//     const newDate = new Date(e.target.value + 'T00:00:00');
//     setSelectedDate(newDate);
//   };

//   // ---------- Initial load and auto‑refresh ----------
//   useEffect(() => {
//     loadAppointments(selectedDate);
//     refreshInterval.current = setInterval(() => {
//       loadAppointments(selectedDate);
//     }, 30000);
//     return () => clearInterval(refreshInterval.current);
//   }, [selectedDate, loadAppointments]);

//   // ---------- Helper: status CSS class for badge ----------
//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'attended';
//       case 'IN_PROGRESS': return 'inprogress';
//       case 'CLOSED': return 'closed';
//       case 'CANCELLED': return 'cancelled';
//       default: return 'normal';
//     }
//   };

//   // ---------- Helper: row/card background class ----------
//   const getRowStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'row-attended';
//       case 'IN_PROGRESS': return 'row-inprogress';
//       case 'CLOSED': return 'row-closed';
//       case 'CANCELLED': return 'row-cancelled';
//       default: return 'row-normal';
//     }
//   };

//   // ---------- Logout handler ----------
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/');
//   };

//   // ---------- Render helpers (dashboard) ----------
//   const renderSummaryCards = () => {
//     const cards = [
//       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
//       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
//       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
//       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
//     ];
//     return (
//       <div className="summary">
//         {cards.map(({ key, label, count, icon, cls, filter }) => (
//           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
//             <div className="top-bar"></div>
//             <div className="icon">{icon}</div>
//             <div className="title">{label}</div>
//             <div className="value">{count}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTable = () => (
//     <table className="table-view">
//       <thead>
//         <tr>
//           <th>{t.table.patient}</th>
//           <th>{t.table.doctor}</th>
//           <th>{t.table.time}</th>
//           <th>{t.table.room}</th>
//           <th>{t.table.section}</th>
//           <th>{t.table.status}</th>
//           <th>{t.table.notes}</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredAppointments.length === 0 ? (
//           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
//         ) : (
//           filteredAppointments.map(a => (
//             <tr key={a.id} className={getRowStatusClass(a.status)}>
//               <td>{a.patientName}</td>
//               <td>{a.doctorName}</td>
//               <td>{a.appointmentTimeString}</td>
//               <td>{a.roomNumber}</td>
//               <td>{a.sectionName}</td>
//               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
//               <td>{a.notes}</td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );

//   const renderCardGrid = () => (
//     <div className="card-grid">
//       {filteredAppointments.length === 0 ? (
//         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
//       ) : (
//         filteredAppointments.map(a => (
//           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
//             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
//             <div className="patient">{a.patientName}</div>
//             <div className="detail"><span>🩺</span> {a.doctorName}</div>
//             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
//             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
//             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
//           </div>
//         ))
//       )}
//     </div>
//   );

//   // ---------- Sidebar menu items ----------
//   const menuItems = [
//     { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') },
//     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
//     { icon: '📅', label: t.sidebar.appointments, action: () => setCurrentScreen('appointmentsAdmin') }, // ✅ page switch
//     { icon: '📝', label: t.sidebar.visitTracking, action: () => setCurrentScreen('visitTracking') },
//   { icon: '📑', label: t.sidebar.claimsTracking, action: () => setCurrentScreen('claimsTracking') },
//     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
//     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
//     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
//     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
//     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
//     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
//     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
//     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
//     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
//   ];

//   // ---------- JSX ----------
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
//         {/* Top Bar */}
//         <div className="topbar">
//           <div className="clinic">
//             <span>🏥</span>
//             <span>{clinicInfo.name}</span>
//           </div>
//           <div className="datetime">
//             <span>📅 {clinicInfo.date}</span>
//             <input
//               type="date"
//               value={formatLocalDate(selectedDate)}
//               onChange={handleDateChange}
//             />
//             <span>
//               <span className="clock-icon">🕐</span>
//               <span className="time">
//                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                 })}
//               </span>
//             </span>
//           </div>
//         </div>

//         <div className="flex-row flex-1 overflow-hidden">
//           {/* Sidebar – always visible */}
//           <div className="sidebar">
//             <div className="header">
//               <span className="icon">☰</span>
//               <span className="title">{t.sidebar.menu}</span>
//             </div>
//             <div className="menu">
//               {menuItems.map((item, idx) => (
//                 <button key={idx} onClick={item.action}>
//                   <span>{item.icon}</span>
//                   <span className="label">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//             <div className="logout">
//               <button onClick={handleLogout}>
//                 <span>🚪</span>
//                 <span className="label">{t.sidebar.logout}</span>
//               </button>
//             </div>
//           </div>

//           {/* Main Content – switches between dashboard, search, and appointments */}
//           <div className="main">
//             {currentScreen === 'dashboard' && (
//               <>
//                 <div className="title">
//                   <span>📊</span>
//                   <span>{t.dashboard.title}</span>
//                 </div>

//                 {renderSummaryCards()}

//                 <button className="toggle-btn" onClick={toggleView}>
//                   {viewMode === 'table'
//                     ? `📇 ${t.dashboard.switchToCard}`
//                     : `📋 ${t.dashboard.switchToTable}`}
//                 </button>

//                 <div className="content-container">
//                   <div className="scrollable">
//                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
//                   </div>
//                 </div>

//                 <div className="statusbar">
//                   {loading && <div className="loading">⏳</div>}
//                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
//                   <span className="version">v2.0.0</span>
//                 </div>
//               </>
//             )}
//             {currentScreen === 'claimsTracking' && (
//   <ClaimsTrackingScreen
//     loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//     lang={lang}
//     onClose={() => setCurrentScreen('dashboard')}
//   />
// )}
//             {currentScreen === 'visitTracking' && (
//   <VisitTrackingScreen
//     loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//     lang={lang}
//     onClose={() => setCurrentScreen('dashboard')}
//   />
// )}

//             {currentScreen === 'searchPatient' && (
//               <SearchPatientScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'appointmentsAdmin' && (
//               <AppointmentsAdminScreen
//                 refreshCallback={() => {}}
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//                 embedded={true}   // 👈 ensures it renders as a page, not a modal
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminHomePage; above 2072026


// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { adminTranslations } from '../../i18n/adminTranslations';
// import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
// import VisitTrackingScreen from '../VisitTrackingScreen/VisitTrackingScreen';
// import ClaimsTrackingScreen from '../ClaimsTrackingScreen/ClaimsTrackingScreen';

// // -------------------- Styles (inline) --------------------
// const styles = `
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .app {
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
//     background: #f0f2f5;
//     overflow: hidden;
//   }
//   /* Top Bar */
//   .topbar {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 12px 25px;
//     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
//     color: white;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//     flex-shrink: 0;
//   }
//   .topbar .clinic {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 24px;
//     font-weight: bold;
//     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//   }
//   .topbar .datetime {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     font-size: 16px;
//   }
//   .topbar .datetime .time {
//     font-weight: bold;
//     color: #f1c40f;
//     font-size: 20px;
//   }
//   .topbar .datetime .clock-icon {
//     display: inline-block;
//     animation: spin 60s linear infinite;
//   }
//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   /* Sidebar */
//   .sidebar {
//     display: flex;
//     flex-direction: column;
//     background: rgba(44, 62, 80, 0.98);
//     color: #ecf0f1;
//     width: 65px;
//     min-width: 65px;
//     padding: 15px 12px;
//     transition: width 0.3s ease;
//     overflow: hidden;
//     flex-shrink: 0;
//     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
//   }
//   .sidebar:hover {
//     width: 270px;
//   }
//   .sidebar .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid rgba(255,255,255,0.1);
//     margin-bottom: 10px;
//     white-space: nowrap;
//     font-size: 20px;
//   }
//   .sidebar .header .icon {
//     font-size: 24px;
//   }
//   .sidebar .header .title {
//     font-size: 17px;
//     font-weight: bold;
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .header .title {
//     opacity: 1;
//   }
//   .sidebar .menu {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     overflow-y: auto;
//   }
//   .sidebar .menu button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: transparent;
//     border: none;
//     color: #ecf0f1;
//     border-radius: 8px;
//     text-align: left;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     white-space: nowrap;
//     transition: all 0.2s;
//     width: 100%;
//   }
//   .sidebar .menu button:hover {
//     background: rgba(255,255,255,0.15);
//     transform: scale(1.02);
//     border-left: 3px solid #3498db;
//   }
//   .sidebar .menu button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .menu button .label {
//     opacity: 1;
//   }
//   .sidebar .logout {
//     margin-top: auto;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.1);
//   }
//   .sidebar .logout button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: #c0392b;
//     color: white;
//     font-weight: bold;
//     border-radius: 8px;
//     width: 100%;
//     border: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     transition: all 0.2s;
//   }
//   .sidebar .logout button:hover {
//     background: #e74c3c;
//     transform: scale(1.05);
//   }
//   .sidebar .logout button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .logout button .label {
//     opacity: 1;
//   }

//   /* Main Content */
//   .main {
//     flex: 1;
//     padding: 20px;
//     overflow-y: auto;
//     background: #f0f2f5;
//   }
//   .main .title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 28px;
//     font-weight: bold;
//     color: #2c3e50;
//     margin-bottom: 20px;
//   }
//   /* Summary Cards */
//   .summary {
//     display: flex;
//     gap: 15px;
//     justify-content: center;
//     flex-wrap: wrap;
//     margin-bottom: 20px;
//   }
//   .summary .card {
//     flex: 1;
//     min-width: 150px;
//     max-width: 220px;
//     padding: 12px;
//     border-radius: 14px;
//     text-align: center;
//     color: white;
//     cursor: pointer;
//     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
//     transition: all 0.2s;
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     position: relative;
//     overflow: hidden;
//   }
//   .summary .card:hover {
//     transform: scale(1.05);
//     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//   }
//   .summary .card .icon { font-size: 28px; }
//   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
//   .summary .card .value { font-size: 34px; font-weight: bold; }
//   .summary .card .top-bar {
//     height: 5px;
//     background: rgba(255,255,255,0.3);
//     border-radius: 12px 12px 0 0;
//     margin: -12px -12px 10px -12px;
//   }
//   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
//   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
//   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
//   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

//   /* Toggle Button */
//   .toggle-btn {
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     color: white;
//     border: none;
//     padding: 12px 30px;
//     border-radius: 30px;
//     font-weight: bold;
//     font-size: 16px;
//     cursor: pointer;
//     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
//     transition: all 0.2s;
//     margin-bottom: 15px;
//   }
//   .toggle-btn:hover {
//     transform: scale(1.08);
//     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
//   }

//   /* Table / Card Container */
//   .content-container {
//     background: white;
//     border-radius: 10px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//     padding: 0;
//     overflow: hidden;
//     transition: opacity 0.3s;
//     position: relative;
//     min-height: 400px;
//   }
//   .content-container .table-view {
//     width: 100%;
//     border-collapse: collapse;
//   }
//   .content-container .table-view th {
//     background: #f8f9fa;
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2c3e50;
//     border-bottom: 2px solid #e9ecef;
//   }
//   .content-container .table-view td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #f0f0f0;
//     font-size: 13px;
//   }
//   .content-container .table-view tr:hover td {
//     background: #f8f9fa;
//   }
//   .content-container .table-view .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     text-align: center;
//   }
//   .content-container .table-view .status-badge.attended { background: #27ae60; }
//   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
//   .content-container .table-view .status-badge.closed { background: #e74c3c; }
//   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
//   .content-container .table-view .status-badge.normal { background: #3498db; }

//   /* Card Grid */
//   .card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//     gap: 15px;
//     padding: 20px;
//   }
//   .card-grid .appt-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #e9ecef;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .card-grid .appt-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//   }
//   .card-grid .appt-card .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     margin-bottom: 8px;
//   }
//   .card-grid .appt-card .patient {
//     font-size: 18px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .card-grid .appt-card .detail {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     color: #34495e;
//     font-size: 14px;
//     margin-top: 4px;
//   }
//   .card-grid .appt-card .detail .label {
//     color: #7f8c8d;
//     font-size: 13px;
//   }

//   /* Status Bar */
//   .statusbar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 10px;
//     margin-top: 15px;
//     border: 1px solid #e9ecef;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .statusbar .loading {
//     width: 20px;
//     height: 20px;
//   }
//   .statusbar .message {
//     font-size: 13px;
//     color: #27ae60;
//   }
//   .statusbar .message.error { color: #e74c3c; }
//   .statusbar .message.loading { color: #f39c12; }
//   .statusbar .version {
//     margin-left: auto;
//     font-size: 12px;
//     color: #95a5a6;
//   }

//   /* Scrollable */
//   .scrollable {
//     overflow-y: auto;
//     max-height: 60vh;
//   }

//   /* Utilities */
//   .flex-row { display: flex; flex-direction: row; }
//   .flex-1 { flex: 1; }
//   .h-full { height: 100%; }
//   .overflow-hidden { overflow: hidden; }
// `;

// // -------------------- Helper: format local date --------------------
// const formatLocalDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // -------------------- API call using BASE_URL --------------------
// const fetchScheduleFromApi = async (date) => {
//   const formattedDate = formatLocalDate(date);
//   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
//   console.log('📤 Fetching:', url);

//   try {
//     const response = await fetch(url);
//     console.log('📡 Response status:', response.status);
//     const rawText = await response.text();
//     console.log('📄 Raw response body:', rawText);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${rawText}`);
//     }

//     return JSON.parse(rawText);
//   } catch (err) {
//     console.error('🚨 Fetch error:', err);
//     throw err;
//   }
// };

// // -------------------- Main Component --------------------
// const AdminHomePage = () => {
//   // ---------- Language ----------
//   const lang = localStorage.getItem('lang') || 'en';
//   const t = adminTranslations[lang];
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [currentScreen, setCurrentScreen] = useState('dashboard');

//   const refreshInterval = useRef(null);
//   const navigate = useNavigate();

//   // ---------- Helper: update status ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text, type });
//   }, []);

//   // ---------- Load clinic info from API ----------
//   useEffect(() => {
//     const loadClinic = async () => {
//       try {
//         const data = await fetchClinicInfo();
//         if (data) {
//           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
//           setClinicInfo({
//             name: data.clinicName || t.clinic.default,
//             date: displayDate,
//           });
//         } else {
//           setClinicInfo({
//             name: t.clinic.default,
//             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             }),
//           });
//         }
//       } catch (err) {
//         console.warn('Failed to fetch clinic info:', err);
//       }
//     };
//     loadClinic();
//   }, [lang, t]);

//   // ---------- Load appointments from API ----------
//   const loadAppointments = useCallback(async (date) => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');
//     try {
//       const data = await fetchScheduleFromApi(date);
//       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
//       const rows = allItems.map(item => {
//         const timeStr = item.visitTime || item.appointmentTime;
//         const time = timeStr ? new Date(timeStr) : new Date();
//         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         let patientName = '';
//         if (item.patient) {
//           const { firstName = '', middleName = '', lastName = '' } = item.patient;
//           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         } else if (item.patientName) {
//           patientName = item.patientName;
//         }

//         let doctorName = '';
//         if (item.doctorName) {
//           doctorName = item.doctorName;
//         } else if (item.doctor) {
//           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
//           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         }

//         const roomNumber = item.room?.roomNumber || '';
//         const sectionName = item.room?.section?.name || '';

//         return {
//           id: item.id,
//           patientName: patientName || 'Unknown',
//           doctorName: doctorName || 'N/A',
//           appointmentTimeString: timeString,
//           roomNumber,
//           sectionName,
//           status: item.status || 'NORMAL',
//           notes: item.notes || '',
//         };
//       });

//       setAppointments(rows);
//       setFilteredAppointments(rows);

//       const total = rows.length;
//       const attended = rows.filter(a => a.status === 'ATTENDED').length;
//       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
//       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
//       setSummary({ total, attended, inProgress, cancelled });
//       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
//     } catch (err) {
//       setStatus(t.status.error, 'error');
//       console.error('🚨 Load error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, setStatus]);

//   // ---------- Apply filter ----------
//   const applyFilter = useCallback((status) => {
//     if (status === 'ALL') {
//       setFilteredAppointments(appointments);
//     } else {
//       setFilteredAppointments(appointments.filter(a => a.status === status));
//     }
//     setStatus(`${t.status.filtered}: ${status}`, 'info');
//   }, [appointments, t, setStatus]);

//   // ---------- Toggle view ----------
//   const toggleView = useCallback(() => {
//     setViewMode(prev => prev === 'table' ? 'card' : 'table');
//   }, []);

//   // ---------- Clock ----------
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // ---------- Date change handler ----------
//   const handleDateChange = (e) => {
//     const newDate = new Date(e.target.value + 'T00:00:00');
//     setSelectedDate(newDate);
//   };

//   // ---------- Initial load and auto‑refresh ----------
//   useEffect(() => {
//     loadAppointments(selectedDate);
//     refreshInterval.current = setInterval(() => {
//       loadAppointments(selectedDate);
//     }, 30000);
//     return () => clearInterval(refreshInterval.current);
//   }, [selectedDate, loadAppointments]);

//   // ---------- Helper: status CSS class for badge ----------
//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'attended';
//       case 'IN_PROGRESS': return 'inprogress';
//       case 'CLOSED': return 'closed';
//       case 'CANCELLED': return 'cancelled';
//       default: return 'normal';
//     }
//   };

//   // ---------- Helper: row/card background class ----------
//   const getRowStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'row-attended';
//       case 'IN_PROGRESS': return 'row-inprogress';
//       case 'CLOSED': return 'row-closed';
//       case 'CANCELLED': return 'row-cancelled';
//       default: return 'row-normal';
//     }
//   };

//   // ---------- Logout handler ----------
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/');
//   };

//   // ---------- Render helpers (dashboard) ----------
//   const renderSummaryCards = () => {
//     const cards = [
//       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
//       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
//       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
//       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
//     ];
//     return (
//       <div className="summary">
//         {cards.map(({ key, label, count, icon, cls, filter }) => (
//           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
//             <div className="top-bar"></div>
//             <div className="icon">{icon}</div>
//             <div className="title">{label}</div>
//             <div className="value">{count}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTable = () => (
//     <table className="table-view">
//       <thead>
//         <tr>
//           <th>{t.table.patient}</th>
//           <th>{t.table.doctor}</th>
//           <th>{t.table.time}</th>
//           <th>{t.table.room}</th>
//           <th>{t.table.section}</th>
//           <th>{t.table.status}</th>
//           <th>{t.table.notes}</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredAppointments.length === 0 ? (
//           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
//         ) : (
//           filteredAppointments.map(a => (
//             <tr key={a.id} className={getRowStatusClass(a.status)}>
//               <td>{a.patientName}</td>
//               <td>{a.doctorName}</td>
//               <td>{a.appointmentTimeString}</td>
//               <td>{a.roomNumber}</td>
//               <td>{a.sectionName}</td>
//               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
//               <td>{a.notes}</td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );

//   const renderCardGrid = () => (
//     <div className="card-grid">
//       {filteredAppointments.length === 0 ? (
//         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
//       ) : (
//         filteredAppointments.map(a => (
//           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
//             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
//             <div className="patient">{a.patientName}</div>
//             <div className="detail"><span>🩺</span> {a.doctorName}</div>
//             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
//             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
//             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
//           </div>
//         ))
//       )}
//     </div>
//   );

//   // ---------- Sidebar menu items ----------
//   const menuItems = [
//     { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') },
//     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
//     { icon: '📅', label: t.sidebar.appointments, action: () => setCurrentScreen('appointmentsAdmin') },
//     { icon: '📝', label: t.sidebar.visitTracking, action: () => setCurrentScreen('visitTracking') },
//     { icon: '📑', label: t.sidebar.claimsTracking, action: () => setCurrentScreen('claimsTracking') },
//     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => alert(t.sidebar.manageDoctors) },
//     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
//     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
//     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
//     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
//     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
//     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
//     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
//     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
//   ];

//   // ---------- JSX ----------
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
//         {/* Top Bar */}
//         <div className="topbar">
//           <div className="clinic">
//             <span>🏥</span>
//             <span>{clinicInfo.name}</span>
//           </div>
//           <div className="datetime">
//             <span>📅 {clinicInfo.date}</span>
//             <input
//               type="date"
//               value={formatLocalDate(selectedDate)}
//               onChange={handleDateChange}
//             />
//             <span>
//               <span className="clock-icon">🕐</span>
//               <span className="time">
//                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                 })}
//               </span>
//             </span>
//           </div>
//         </div>

//         <div className="flex-row flex-1 overflow-hidden">
//           {/* Sidebar – always visible */}
//           <div className="sidebar">
//             <div className="header">
//               <span className="icon">☰</span>
//               <span className="title">{t.sidebar.menu}</span>
//             </div>
//             <div className="menu">
//               {menuItems.map((item, idx) => (
//                 <button key={idx} onClick={item.action}>
//                   <span>{item.icon}</span>
//                   <span className="label">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//             <div className="logout">
//               <button onClick={handleLogout}>
//                 <span>🚪</span>
//                 <span className="label">{t.sidebar.logout}</span>
//               </button>
//             </div>
//           </div>

//           {/* Main Content – switches between dashboard, search, and appointments */}
//           <div className="main">
//             {currentScreen === 'dashboard' && (
//               <>
//                 <div className="title">
//                   <span>📊</span>
//                   <span>{t.dashboard.title}</span>
//                 </div>

//                 {renderSummaryCards()}

//                 <button className="toggle-btn" onClick={toggleView}>
//                   {viewMode === 'table'
//                     ? `📇 ${t.dashboard.switchToCard}`
//                     : `📋 ${t.dashboard.switchToTable}`}
//                 </button>

//                 <div className="content-container">
//                   <div className="scrollable">
//                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
//                   </div>
//                 </div>

//                 <div className="statusbar">
//                   {loading && <div className="loading">⏳</div>}
//                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
//                   <span className="version">v2.0.0</span>
//                 </div>
//               </>
//             )}

//             {currentScreen === 'claimsTracking' && (
//               <ClaimsTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'visitTracking' && (
//               <VisitTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'searchPatient' && (
//               <SearchPatientScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'appointmentsAdmin' && (
//               <AppointmentsAdminScreen
//                 refreshCallback={() => {}}
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//                 embedded={true}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminHomePage; 02072026 V2

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { adminTranslations } from '../../i18n/adminTranslations';
// import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
// import VisitTrackingScreen from '../VisitTrackingScreen/VisitTrackingScreen';
// import ClaimsTrackingScreen from '../ClaimsTrackingScreen/ClaimsTrackingScreen';
// import DoctorManagementScreen from '../DoctorManagementScreen/DoctorManagementScreen';

// // -------------------- Styles (inline) --------------------
// const styles = `
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .app {
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
//     background: #f0f2f5;
//     overflow: hidden;
//   }
//   /* Top Bar */
//   .topbar {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 12px 25px;
//     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
//     color: white;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//     flex-shrink: 0;
//   }
//   .topbar .clinic {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 24px;
//     font-weight: bold;
//     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//   }
//   .topbar .datetime {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     font-size: 16px;
//   }
//   .topbar .datetime .time {
//     font-weight: bold;
//     color: #f1c40f;
//     font-size: 20px;
//   }
//   .topbar .datetime .clock-icon {
//     display: inline-block;
//     animation: spin 60s linear infinite;
//   }
//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   /* Sidebar */
//   .sidebar {
//     display: flex;
//     flex-direction: column;
//     background: rgba(44, 62, 80, 0.98);
//     color: #ecf0f1;
//     width: 65px;
//     min-width: 65px;
//     padding: 15px 12px;
//     transition: width 0.3s ease;
//     overflow: hidden;
//     flex-shrink: 0;
//     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
//   }
//   .sidebar:hover {
//     width: 270px;
//   }
//   .sidebar .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid rgba(255,255,255,0.1);
//     margin-bottom: 10px;
//     white-space: nowrap;
//     font-size: 20px;
//   }
//   .sidebar .header .icon {
//     font-size: 24px;
//   }
//   .sidebar .header .title {
//     font-size: 17px;
//     font-weight: bold;
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .header .title {
//     opacity: 1;
//   }
//   .sidebar .menu {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     overflow-y: auto;
//   }
//   .sidebar .menu button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: transparent;
//     border: none;
//     color: #ecf0f1;
//     border-radius: 8px;
//     text-align: left;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     white-space: nowrap;
//     transition: all 0.2s;
//     width: 100%;
//   }
//   .sidebar .menu button:hover {
//     background: rgba(255,255,255,0.15);
//     transform: scale(1.02);
//     border-left: 3px solid #3498db;
//   }
//   .sidebar .menu button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .menu button .label {
//     opacity: 1;
//   }
//   .sidebar .logout {
//     margin-top: auto;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.1);
//   }
//   .sidebar .logout button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: #c0392b;
//     color: white;
//     font-weight: bold;
//     border-radius: 8px;
//     width: 100%;
//     border: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     transition: all 0.2s;
//   }
//   .sidebar .logout button:hover {
//     background: #e74c3c;
//     transform: scale(1.05);
//   }
//   .sidebar .logout button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .logout button .label {
//     opacity: 1;
//   }

//   /* Main Content */
//   .main {
//     flex: 1;
//     padding: 20px;
//     overflow-y: auto;
//     background: #f0f2f5;
//   }
//   .main .title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 28px;
//     font-weight: bold;
//     color: #2c3e50;
//     margin-bottom: 20px;
//   }
//   /* Summary Cards */
//   .summary {
//     display: flex;
//     gap: 15px;
//     justify-content: center;
//     flex-wrap: wrap;
//     margin-bottom: 20px;
//   }
//   .summary .card {
//     flex: 1;
//     min-width: 150px;
//     max-width: 220px;
//     padding: 12px;
//     border-radius: 14px;
//     text-align: center;
//     color: white;
//     cursor: pointer;
//     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
//     transition: all 0.2s;
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     position: relative;
//     overflow: hidden;
//   }
//   .summary .card:hover {
//     transform: scale(1.05);
//     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//   }
//   .summary .card .icon { font-size: 28px; }
//   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
//   .summary .card .value { font-size: 34px; font-weight: bold; }
//   .summary .card .top-bar {
//     height: 5px;
//     background: rgba(255,255,255,0.3);
//     border-radius: 12px 12px 0 0;
//     margin: -12px -12px 10px -12px;
//   }
//   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
//   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
//   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
//   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

//   /* Toggle Button */
//   .toggle-btn {
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     color: white;
//     border: none;
//     padding: 12px 30px;
//     border-radius: 30px;
//     font-weight: bold;
//     font-size: 16px;
//     cursor: pointer;
//     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
//     transition: all 0.2s;
//     margin-bottom: 15px;
//   }
//   .toggle-btn:hover {
//     transform: scale(1.08);
//     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
//   }

//   /* Table / Card Container */
//   .content-container {
//     background: white;
//     border-radius: 10px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//     padding: 0;
//     overflow: hidden;
//     transition: opacity 0.3s;
//     position: relative;
//     min-height: 400px;
//   }
//   .content-container .table-view {
//     width: 100%;
//     border-collapse: collapse;
//   }
//   .content-container .table-view th {
//     background: #f8f9fa;
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2c3e50;
//     border-bottom: 2px solid #e9ecef;
//   }
//   .content-container .table-view td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #f0f0f0;
//     font-size: 13px;
//   }
//   .content-container .table-view tr:hover td {
//     background: #f8f9fa;
//   }
//   .content-container .table-view .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     text-align: center;
//   }
//   .content-container .table-view .status-badge.attended { background: #27ae60; }
//   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
//   .content-container .table-view .status-badge.closed { background: #e74c3c; }
//   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
//   .content-container .table-view .status-badge.normal { background: #3498db; }

//   /* Card Grid */
//   .card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//     gap: 15px;
//     padding: 20px;
//   }
//   .card-grid .appt-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #e9ecef;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .card-grid .appt-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//   }
//   .card-grid .appt-card .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     margin-bottom: 8px;
//   }
//   .card-grid .appt-card .patient {
//     font-size: 18px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .card-grid .appt-card .detail {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     color: #34495e;
//     font-size: 14px;
//     margin-top: 4px;
//   }
//   .card-grid .appt-card .detail .label {
//     color: #7f8c8d;
//     font-size: 13px;
//   }

//   /* Status Bar */
//   .statusbar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 10px;
//     margin-top: 15px;
//     border: 1px solid #e9ecef;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .statusbar .loading {
//     width: 20px;
//     height: 20px;
//   }
//   .statusbar .message {
//     font-size: 13px;
//     color: #27ae60;
//   }
//   .statusbar .message.error { color: #e74c3c; }
//   .statusbar .message.loading { color: #f39c12; }
//   .statusbar .version {
//     margin-left: auto;
//     font-size: 12px;
//     color: #95a5a6;
//   }

//   /* Scrollable */
//   .scrollable {
//     overflow-y: auto;
//     max-height: 60vh;
//   }

//   /* Utilities */
//   .flex-row { display: flex; flex-direction: row; }
//   .flex-1 { flex: 1; }
//   .h-full { height: 100%; }
//   .overflow-hidden { overflow: hidden; }
// `;

// // -------------------- Helper: format local date --------------------
// const formatLocalDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // -------------------- API call using BASE_URL --------------------
// const fetchScheduleFromApi = async (date) => {
//   const formattedDate = formatLocalDate(date);
//   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
//   console.log('📤 Fetching:', url);

//   try {
//     const response = await fetch(url);
//     console.log('📡 Response status:', response.status);
//     const rawText = await response.text();
//     console.log('📄 Raw response body:', rawText);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${rawText}`);
//     }

//     return JSON.parse(rawText);
//   } catch (err) {
//     console.error('🚨 Fetch error:', err);
//     throw err;
//   }
// };

// // -------------------- Main Component --------------------
// const AdminHomePage = () => {
//   // ---------- Language ----------
//   const lang = localStorage.getItem('lang') || 'en';
//   const t = adminTranslations[lang];
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [currentScreen, setCurrentScreen] = useState('dashboard');

//   const refreshInterval = useRef(null);
//   const navigate = useNavigate();

//   // ---------- Helper: update status ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text, type });
//   }, []);

//   // ---------- Load clinic info from API ----------
//   useEffect(() => {
//     const loadClinic = async () => {
//       try {
//         const data = await fetchClinicInfo();
//         if (data) {
//           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
//           setClinicInfo({
//             name: data.clinicName || t.clinic.default,
//             date: displayDate,
//           });
//         } else {
//           setClinicInfo({
//             name: t.clinic.default,
//             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             }),
//           });
//         }
//       } catch (err) {
//         console.warn('Failed to fetch clinic info:', err);
//       }
//     };
//     loadClinic();
//   }, [lang, t]);

//   // ---------- Load appointments from API ----------
//   const loadAppointments = useCallback(async (date) => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');
//     try {
//       const data = await fetchScheduleFromApi(date);
//       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
//       const rows = allItems.map(item => {
//         const timeStr = item.visitTime || item.appointmentTime;
//         const time = timeStr ? new Date(timeStr) : new Date();
//         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         let patientName = '';
//         if (item.patient) {
//           const { firstName = '', middleName = '', lastName = '' } = item.patient;
//           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         } else if (item.patientName) {
//           patientName = item.patientName;
//         }

//         let doctorName = '';
//         if (item.doctorName) {
//           doctorName = item.doctorName;
//         } else if (item.doctor) {
//           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
//           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         }

//         const roomNumber = item.room?.roomNumber || '';
//         const sectionName = item.room?.section?.name || '';

//         return {
//           id: item.id,
//           patientName: patientName || 'Unknown',
//           doctorName: doctorName || 'N/A',
//           appointmentTimeString: timeString,
//           roomNumber,
//           sectionName,
//           status: item.status || 'NORMAL',
//           notes: item.notes || '',
//         };
//       });

//       setAppointments(rows);
//       setFilteredAppointments(rows);

//       const total = rows.length;
//       const attended = rows.filter(a => a.status === 'ATTENDED').length;
//       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
//       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
//       setSummary({ total, attended, inProgress, cancelled });
//       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
//     } catch (err) {
//       setStatus(t.status.error, 'error');
//       console.error('🚨 Load error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, setStatus]);

//   // ---------- Apply filter ----------
//   const applyFilter = useCallback((status) => {
//     if (status === 'ALL') {
//       setFilteredAppointments(appointments);
//     } else {
//       setFilteredAppointments(appointments.filter(a => a.status === status));
//     }
//     setStatus(`${t.status.filtered}: ${status}`, 'info');
//   }, [appointments, t, setStatus]);

//   // ---------- Toggle view ----------
//   const toggleView = useCallback(() => {
//     setViewMode(prev => prev === 'table' ? 'card' : 'table');
//   }, []);

//   // ---------- Clock ----------
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // ---------- Date change handler ----------
//   const handleDateChange = (e) => {
//     const newDate = new Date(e.target.value + 'T00:00:00');
//     setSelectedDate(newDate);
//   };

//   // ---------- Initial load and auto‑refresh ----------
//   useEffect(() => {
//     loadAppointments(selectedDate);
//     refreshInterval.current = setInterval(() => {
//       loadAppointments(selectedDate);
//     }, 30000);
//     return () => clearInterval(refreshInterval.current);
//   }, [selectedDate, loadAppointments]);

//   // ---------- Helper: status CSS class for badge ----------
//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'attended';
//       case 'IN_PROGRESS': return 'inprogress';
//       case 'CLOSED': return 'closed';
//       case 'CANCELLED': return 'cancelled';
//       default: return 'normal';
//     }
//   };

//   // ---------- Helper: row/card background class ----------
//   const getRowStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'row-attended';
//       case 'IN_PROGRESS': return 'row-inprogress';
//       case 'CLOSED': return 'row-closed';
//       case 'CANCELLED': return 'row-cancelled';
//       default: return 'row-normal';
//     }
//   };

//   // ---------- Logout handler ----------
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/');
//   };

//   // ---------- Render helpers (dashboard) ----------
//   const renderSummaryCards = () => {
//     const cards = [
//       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
//       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
//       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
//       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
//     ];
//     return (
//       <div className="summary">
//         {cards.map(({ key, label, count, icon, cls, filter }) => (
//           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
//             <div className="top-bar"></div>
//             <div className="icon">{icon}</div>
//             <div className="title">{label}</div>
//             <div className="value">{count}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTable = () => (
//     <table className="table-view">
//       <thead>
//         <tr>
//           <th>{t.table.patient}</th>
//           <th>{t.table.doctor}</th>
//           <th>{t.table.time}</th>
//           <th>{t.table.room}</th>
//           <th>{t.table.section}</th>
//           <th>{t.table.status}</th>
//           <th>{t.table.notes}</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredAppointments.length === 0 ? (
//           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
//         ) : (
//           filteredAppointments.map(a => (
//             <tr key={a.id} className={getRowStatusClass(a.status)}>
//               <td>{a.patientName}</td>
//               <td>{a.doctorName}</td>
//               <td>{a.appointmentTimeString}</td>
//               <td>{a.roomNumber}</td>
//               <td>{a.sectionName}</td>
//               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
//               <td>{a.notes}</td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );

//   const renderCardGrid = () => (
//     <div className="card-grid">
//       {filteredAppointments.length === 0 ? (
//         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
//       ) : (
//         filteredAppointments.map(a => (
//           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
//             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
//             <div className="patient">{a.patientName}</div>
//             <div className="detail"><span>🩺</span> {a.doctorName}</div>
//             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
//             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
//             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
//           </div>
//         ))
//       )}
//     </div>
//   );

//   // ---------- Sidebar menu items ----------
//   const menuItems = [
//     { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') },
//     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
//     { icon: '📅', label: t.sidebar.appointments, action: () => setCurrentScreen('appointmentsAdmin') },
//     { icon: '📝', label: t.sidebar.visitTracking, action: () => setCurrentScreen('visitTracking') },
//     { icon: '📑', label: t.sidebar.claimsTracking, action: () => setCurrentScreen('claimsTracking') },
//     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => setCurrentScreen('doctorManagement') },
//     { icon: '📊', label: t.sidebar.reports, action: () => alert(t.sidebar.reports) },
//     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
//     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
//     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
//     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
//     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
//     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
//     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
//   ];

//   // ---------- JSX ----------
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
//         {/* Top Bar */}
//         <div className="topbar">
//           <div className="clinic">
//             <span>🏥</span>
//             <span>{clinicInfo.name}</span>
//           </div>
//           <div className="datetime">
//             <span>📅 {clinicInfo.date}</span>
//             <input
//               type="date"
//               value={formatLocalDate(selectedDate)}
//               onChange={handleDateChange}
//             />
//             <span>
//               <span className="clock-icon">🕐</span>
//               <span className="time">
//                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                 })}
//               </span>
//             </span>
//           </div>
//         </div>

//         <div className="flex-row flex-1 overflow-hidden">
//           {/* Sidebar – always visible */}
//           <div className="sidebar">
//             <div className="header">
//               <span className="icon">☰</span>
//               <span className="title">{t.sidebar.menu}</span>
//             </div>
//             <div className="menu">
//               {menuItems.map((item, idx) => (
//                 <button key={idx} onClick={item.action}>
//                   <span>{item.icon}</span>
//                   <span className="label">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//             <div className="logout">
//               <button onClick={handleLogout}>
//                 <span>🚪</span>
//                 <span className="label">{t.sidebar.logout}</span>
//               </button>
//             </div>
//           </div>

//           {/* Main Content – switches between dashboard, search, and appointments */}
//           <div className="main">
//             {currentScreen === 'dashboard' && (
//               <>
//                 <div className="title">
//                   <span>📊</span>
//                   <span>{t.dashboard.title}</span>
//                 </div>

//                 {renderSummaryCards()}

//                 <button className="toggle-btn" onClick={toggleView}>
//                   {viewMode === 'table'
//                     ? `📇 ${t.dashboard.switchToCard}`
//                     : `📋 ${t.dashboard.switchToTable}`}
//                 </button>

//                 <div className="content-container">
//                   <div className="scrollable">
//                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
//                   </div>
//                 </div>

//                 <div className="statusbar">
//                   {loading && <div className="loading">⏳</div>}
//                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
//                   <span className="version">v2.0.0</span>
//                 </div>
//               </>
//             )}

//             {currentScreen === 'claimsTracking' && (
//               <ClaimsTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'visitTracking' && (
//               <VisitTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'searchPatient' && (
//               <SearchPatientScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'appointmentsAdmin' && (
//               <AppointmentsAdminScreen
//                 refreshCallback={() => {}}
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//                 embedded={true}
//               />
//             )}

//             {currentScreen === 'doctorManagement' && (
//               <DoctorManagementScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminHomePage; 02072026 7:30 pm

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { adminTranslations } from '../../i18n/adminTranslations';
// import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
// import VisitTrackingScreen from '../VisitTrackingScreen/VisitTrackingScreen';
// import ClaimsTrackingScreen from '../ClaimsTrackingScreen/ClaimsTrackingScreen';
// import DoctorManagementScreen from '../DoctorManagementScreen/DoctorManagementScreen';
// import ReportsScreen from '../ReportsScreen/ReportsScreen'; // 👈 Import ReportsScreen

// // -------------------- Styles (inline) --------------------
// const styles = `
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .app {
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
//     background: #f0f2f5;
//     overflow: hidden;
//   }
//   /* Top Bar */
//   .topbar {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 12px 25px;
//     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
//     color: white;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//     flex-shrink: 0;
//   }
//   .topbar .clinic {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 24px;
//     font-weight: bold;
//     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//   }
//   .topbar .datetime {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     font-size: 16px;
//   }
//   .topbar .datetime .time {
//     font-weight: bold;
//     color: #f1c40f;
//     font-size: 20px;
//   }
//   .topbar .datetime .clock-icon {
//     display: inline-block;
//     animation: spin 60s linear infinite;
//   }
//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   /* Sidebar */
//   .sidebar {
//     display: flex;
//     flex-direction: column;
//     background: rgba(44, 62, 80, 0.98);
//     color: #ecf0f1;
//     width: 65px;
//     min-width: 65px;
//     padding: 15px 12px;
//     transition: width 0.3s ease;
//     overflow: hidden;
//     flex-shrink: 0;
//     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
//   }
//   .sidebar:hover {
//     width: 270px;
//   }
//   .sidebar .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid rgba(255,255,255,0.1);
//     margin-bottom: 10px;
//     white-space: nowrap;
//     font-size: 20px;
//   }
//   .sidebar .header .icon {
//     font-size: 24px;
//   }
//   .sidebar .header .title {
//     font-size: 17px;
//     font-weight: bold;
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .header .title {
//     opacity: 1;
//   }
//   .sidebar .menu {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     overflow-y: auto;
//   }
//   .sidebar .menu button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: transparent;
//     border: none;
//     color: #ecf0f1;
//     border-radius: 8px;
//     text-align: left;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     white-space: nowrap;
//     transition: all 0.2s;
//     width: 100%;
//   }
//   .sidebar .menu button:hover {
//     background: rgba(255,255,255,0.15);
//     transform: scale(1.02);
//     border-left: 3px solid #3498db;
//   }
//   .sidebar .menu button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .menu button .label {
//     opacity: 1;
//   }
//   .sidebar .logout {
//     margin-top: auto;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.1);
//   }
//   .sidebar .logout button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: #c0392b;
//     color: white;
//     font-weight: bold;
//     border-radius: 8px;
//     width: 100%;
//     border: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     transition: all 0.2s;
//   }
//   .sidebar .logout button:hover {
//     background: #e74c3c;
//     transform: scale(1.05);
//   }
//   .sidebar .logout button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .logout button .label {
//     opacity: 1;
//   }

//   /* Main Content */
//   .main {
//     flex: 1;
//     padding: 20px;
//     overflow-y: auto;
//     background: #f0f2f5;
//   }
//   .main .title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 28px;
//     font-weight: bold;
//     color: #2c3e50;
//     margin-bottom: 20px;
//   }
//   /* Summary Cards */
//   .summary {
//     display: flex;
//     gap: 15px;
//     justify-content: center;
//     flex-wrap: wrap;
//     margin-bottom: 20px;
//   }
//   .summary .card {
//     flex: 1;
//     min-width: 150px;
//     max-width: 220px;
//     padding: 12px;
//     border-radius: 14px;
//     text-align: center;
//     color: white;
//     cursor: pointer;
//     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
//     transition: all 0.2s;
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     position: relative;
//     overflow: hidden;
//   }
//   .summary .card:hover {
//     transform: scale(1.05);
//     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//   }
//   .summary .card .icon { font-size: 28px; }
//   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
//   .summary .card .value { font-size: 34px; font-weight: bold; }
//   .summary .card .top-bar {
//     height: 5px;
//     background: rgba(255,255,255,0.3);
//     border-radius: 12px 12px 0 0;
//     margin: -12px -12px 10px -12px;
//   }
//   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
//   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
//   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
//   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

//   /* Toggle Button */
//   .toggle-btn {
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     color: white;
//     border: none;
//     padding: 12px 30px;
//     border-radius: 30px;
//     font-weight: bold;
//     font-size: 16px;
//     cursor: pointer;
//     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
//     transition: all 0.2s;
//     margin-bottom: 15px;
//   }
//   .toggle-btn:hover {
//     transform: scale(1.08);
//     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
//   }

//   /* Table / Card Container */
//   .content-container {
//     background: white;
//     border-radius: 10px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//     padding: 0;
//     overflow: hidden;
//     transition: opacity 0.3s;
//     position: relative;
//     min-height: 400px;
//   }
//   .content-container .table-view {
//     width: 100%;
//     border-collapse: collapse;
//   }
//   .content-container .table-view th {
//     background: #f8f9fa;
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2c3e50;
//     border-bottom: 2px solid #e9ecef;
//   }
//   .content-container .table-view td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #f0f0f0;
//     font-size: 13px;
//   }
//   .content-container .table-view tr:hover td {
//     background: #f8f9fa;
//   }
//   .content-container .table-view .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     text-align: center;
//   }
//   .content-container .table-view .status-badge.attended { background: #27ae60; }
//   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
//   .content-container .table-view .status-badge.closed { background: #e74c3c; }
//   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
//   .content-container .table-view .status-badge.normal { background: #3498db; }

//   /* Card Grid */
//   .card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//     gap: 15px;
//     padding: 20px;
//   }
//   .card-grid .appt-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #e9ecef;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .card-grid .appt-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//   }
//   .card-grid .appt-card .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     margin-bottom: 8px;
//   }
//   .card-grid .appt-card .patient {
//     font-size: 18px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .card-grid .appt-card .detail {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     color: #34495e;
//     font-size: 14px;
//     margin-top: 4px;
//   }
//   .card-grid .appt-card .detail .label {
//     color: #7f8c8d;
//     font-size: 13px;
//   }

//   /* Status Bar */
//   .statusbar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 10px;
//     margin-top: 15px;
//     border: 1px solid #e9ecef;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .statusbar .loading {
//     width: 20px;
//     height: 20px;
//   }
//   .statusbar .message {
//     font-size: 13px;
//     color: #27ae60;
//   }
//   .statusbar .message.error { color: #e74c3c; }
//   .statusbar .message.loading { color: #f39c12; }
//   .statusbar .version {
//     margin-left: auto;
//     font-size: 12px;
//     color: #95a5a6;
//   }

//   /* Scrollable */
//   .scrollable {
//     overflow-y: auto;
//     max-height: 60vh;
//   }

//   /* Utilities */
//   .flex-row { display: flex; flex-direction: row; }
//   .flex-1 { flex: 1; }
//   .h-full { height: 100%; }
//   .overflow-hidden { overflow: hidden; }
// `;

// // -------------------- Helper: format local date --------------------
// const formatLocalDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // -------------------- API call using BASE_URL --------------------
// const fetchScheduleFromApi = async (date) => {
//   const formattedDate = formatLocalDate(date);
//   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
//   console.log('📤 Fetching:', url);

//   try {
//     const response = await fetch(url);
//     console.log('📡 Response status:', response.status);
//     const rawText = await response.text();
//     console.log('📄 Raw response body:', rawText);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${rawText}`);
//     }

//     return JSON.parse(rawText);
//   } catch (err) {
//     console.error('🚨 Fetch error:', err);
//     throw err;
//   }
// };

// // -------------------- Main Component --------------------
// const AdminHomePage = () => {
//   // ---------- Language ----------
//   const lang = localStorage.getItem('lang') || 'en';
//   const t = adminTranslations[lang];
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [currentScreen, setCurrentScreen] = useState('dashboard');

//   const refreshInterval = useRef(null);
//   const navigate = useNavigate();

//   // ---------- Helper: update status ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text, type });
//   }, []);

//   // ---------- Load clinic info from API ----------
//   useEffect(() => {
//     const loadClinic = async () => {
//       try {
//         const data = await fetchClinicInfo();
//         if (data) {
//           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
//           setClinicInfo({
//             name: data.clinicName || t.clinic.default,
//             date: displayDate,
//           });
//         } else {
//           setClinicInfo({
//             name: t.clinic.default,
//             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             }),
//           });
//         }
//       } catch (err) {
//         console.warn('Failed to fetch clinic info:', err);
//       }
//     };
//     loadClinic();
//   }, [lang, t]);

//   // ---------- Load appointments from API ----------
//   const loadAppointments = useCallback(async (date) => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');
//     try {
//       const data = await fetchScheduleFromApi(date);
//       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
//       const rows = allItems.map(item => {
//         const timeStr = item.visitTime || item.appointmentTime;
//         const time = timeStr ? new Date(timeStr) : new Date();
//         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         let patientName = '';
//         if (item.patient) {
//           const { firstName = '', middleName = '', lastName = '' } = item.patient;
//           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         } else if (item.patientName) {
//           patientName = item.patientName;
//         }

//         let doctorName = '';
//         if (item.doctorName) {
//           doctorName = item.doctorName;
//         } else if (item.doctor) {
//           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
//           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         }

//         const roomNumber = item.room?.roomNumber || '';
//         const sectionName = item.room?.section?.name || '';

//         return {
//           id: item.id,
//           patientName: patientName || 'Unknown',
//           doctorName: doctorName || 'N/A',
//           appointmentTimeString: timeString,
//           roomNumber,
//           sectionName,
//           status: item.status || 'NORMAL',
//           notes: item.notes || '',
//         };
//       });

//       setAppointments(rows);
//       setFilteredAppointments(rows);

//       const total = rows.length;
//       const attended = rows.filter(a => a.status === 'ATTENDED').length;
//       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
//       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
//       setSummary({ total, attended, inProgress, cancelled });
//       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
//     } catch (err) {
//       setStatus(t.status.error, 'error');
//       console.error('🚨 Load error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, setStatus]);

//   // ---------- Apply filter ----------
//   const applyFilter = useCallback((status) => {
//     if (status === 'ALL') {
//       setFilteredAppointments(appointments);
//     } else {
//       setFilteredAppointments(appointments.filter(a => a.status === status));
//     }
//     setStatus(`${t.status.filtered}: ${status}`, 'info');
//   }, [appointments, t, setStatus]);

//   // ---------- Toggle view ----------
//   const toggleView = useCallback(() => {
//     setViewMode(prev => prev === 'table' ? 'card' : 'table');
//   }, []);

//   // ---------- Clock ----------
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // ---------- Date change handler ----------
//   const handleDateChange = (e) => {
//     const newDate = new Date(e.target.value + 'T00:00:00');
//     setSelectedDate(newDate);
//   };

//   // ---------- Initial load and auto‑refresh ----------
//   useEffect(() => {
//     loadAppointments(selectedDate);
//     refreshInterval.current = setInterval(() => {
//       loadAppointments(selectedDate);
//     }, 30000);
//     return () => clearInterval(refreshInterval.current);
//   }, [selectedDate, loadAppointments]);

//   // ---------- Helper: status CSS class for badge ----------
//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'attended';
//       case 'IN_PROGRESS': return 'inprogress';
//       case 'CLOSED': return 'closed';
//       case 'CANCELLED': return 'cancelled';
//       default: return 'normal';
//     }
//   };

//   // ---------- Helper: row/card background class ----------
//   const getRowStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'row-attended';
//       case 'IN_PROGRESS': return 'row-inprogress';
//       case 'CLOSED': return 'row-closed';
//       case 'CANCELLED': return 'row-cancelled';
//       default: return 'row-normal';
//     }
//   };

//   // ---------- Logout handler ----------
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/');
//   };

//   // ---------- Render helpers (dashboard) ----------
//   const renderSummaryCards = () => {
//     const cards = [
//       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
//       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
//       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
//       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
//     ];
//     return (
//       <div className="summary">
//         {cards.map(({ key, label, count, icon, cls, filter }) => (
//           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
//             <div className="top-bar"></div>
//             <div className="icon">{icon}</div>
//             <div className="title">{label}</div>
//             <div className="value">{count}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTable = () => (
//     <table className="table-view">
//       <thead>
//         <tr>
//           <th>{t.table.patient}</th>
//           <th>{t.table.doctor}</th>
//           <th>{t.table.time}</th>
//           <th>{t.table.room}</th>
//           <th>{t.table.section}</th>
//           <th>{t.table.status}</th>
//           <th>{t.table.notes}</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredAppointments.length === 0 ? (
//           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
//         ) : (
//           filteredAppointments.map(a => (
//             <tr key={a.id} className={getRowStatusClass(a.status)}>
//               <td>{a.patientName}</td>
//               <td>{a.doctorName}</td>
//               <td>{a.appointmentTimeString}</td>
//               <td>{a.roomNumber}</td>
//               <td>{a.sectionName}</td>
//               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
//               <td>{a.notes}</td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );

//   const renderCardGrid = () => (
//     <div className="card-grid">
//       {filteredAppointments.length === 0 ? (
//         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
//       ) : (
//         filteredAppointments.map(a => (
//           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
//             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
//             <div className="patient">{a.patientName}</div>
//             <div className="detail"><span>🩺</span> {a.doctorName}</div>
//             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
//             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
//             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
//           </div>
//         ))
//       )}
//     </div>
//   );

//   // ---------- Sidebar menu items ----------
//   const menuItems = [
//     { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') },
//     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
//     { icon: '📅', label: t.sidebar.appointments, action: () => setCurrentScreen('appointmentsAdmin') },
//     { icon: '📝', label: t.sidebar.visitTracking, action: () => setCurrentScreen('visitTracking') },
//     { icon: '📑', label: t.sidebar.claimsTracking, action: () => setCurrentScreen('claimsTracking') },
//     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => setCurrentScreen('doctorManagement') },
//     { icon: '📊', label: t.sidebar.reports, action: () => setCurrentScreen('reports') }, // 👈 Changed from alert to setCurrentScreen
//     { icon: '💰', label: t.sidebar.clinicPayments, action: () => alert(t.sidebar.clinicPayments) },
//     { icon: '🏢', label: t.sidebar.manageSections, action: () => alert(t.sidebar.manageSections) },
//     { icon: '🚪', label: t.sidebar.manageRooms, action: () => alert(t.sidebar.manageRooms) },
//     { icon: '👤', label: t.sidebar.userManagement, action: () => alert(t.sidebar.userManagement) },
//     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => alert(t.sidebar.healthInsurance) },
//     { icon: '📜', label: t.sidebar.logs, action: () => alert(t.sidebar.logs) },
//     { icon: 'ℹ️', label: t.sidebar.about, action: () => alert(t.sidebar.about) },
//   ];

//   // ---------- JSX ----------
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
//         {/* Top Bar */}
//         <div className="topbar">
//           <div className="clinic">
//             <span>🏥</span>
//             <span>{clinicInfo.name}</span>
//           </div>
//           <div className="datetime">
//             <span>📅 {clinicInfo.date}</span>
//             <input
//               type="date"
//               value={formatLocalDate(selectedDate)}
//               onChange={handleDateChange}
//             />
//             <span>
//               <span className="clock-icon">🕐</span>
//               <span className="time">
//                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                 })}
//               </span>
//             </span>
//           </div>
//         </div>

//         <div className="flex-row flex-1 overflow-hidden">
//           {/* Sidebar – always visible */}
//           <div className="sidebar">
//             <div className="header">
//               <span className="icon">☰</span>
//               <span className="title">{t.sidebar.menu}</span>
//             </div>
//             <div className="menu">
//               {menuItems.map((item, idx) => (
//                 <button key={idx} onClick={item.action}>
//                   <span>{item.icon}</span>
//                   <span className="label">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//             <div className="logout">
//               <button onClick={handleLogout}>
//                 <span>🚪</span>
//                 <span className="label">{t.sidebar.logout}</span>
//               </button>
//             </div>
//           </div>

//           {/* Main Content – switches between dashboard, search, and appointments */}
//           <div className="main">
//             {currentScreen === 'dashboard' && (
//               <>
//                 <div className="title">
//                   <span>📊</span>
//                   <span>{t.dashboard.title}</span>
//                 </div>

//                 {renderSummaryCards()}

//                 <button className="toggle-btn" onClick={toggleView}>
//                   {viewMode === 'table'
//                     ? `📇 ${t.dashboard.switchToCard}`
//                     : `📋 ${t.dashboard.switchToTable}`}
//                 </button>

//                 <div className="content-container">
//                   <div className="scrollable">
//                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
//                   </div>
//                 </div>

//                 <div className="statusbar">
//                   {loading && <div className="loading">⏳</div>}
//                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
//                   <span className="version">v2.0.0</span>
//                 </div>
//               </>
//             )}

//             {currentScreen === 'claimsTracking' && (
//               <ClaimsTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'visitTracking' && (
//               <VisitTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'searchPatient' && (
//               <SearchPatientScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'appointmentsAdmin' && (
//               <AppointmentsAdminScreen
//                 refreshCallback={() => {}}
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//                 embedded={true}
//               />
//             )}

//             {currentScreen === 'doctorManagement' && (
//               <DoctorManagementScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'reports' && ( // 👈 Added ReportsScreen
//               <ReportsScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminHomePage; 02072026  7:35 pm 

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { adminTranslations } from '../../i18n/adminTranslations';
// import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
// import VisitTrackingScreen from '../VisitTrackingScreen/VisitTrackingScreen';
// import ClaimsTrackingScreen from '../ClaimsTrackingScreen/ClaimsTrackingScreen';
// import DoctorManagementScreen from '../DoctorManagementScreen/DoctorManagementScreen';
// import ReportsScreen from '../ReportsScreen/ReportsScreen';
// import ClinicPaymentReportScreen from '../ClinicPaymentReportScreen/ClinicPaymentReportScreen';

// // -------------------- Styles (inline) --------------------
// const styles = `
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .app {
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
//     background: #f0f2f5;
//     overflow: hidden;
//   }
//   /* Top Bar */
//   .topbar {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 12px 25px;
//     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
//     color: white;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//     flex-shrink: 0;
//   }
//   .topbar .clinic {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 24px;
//     font-weight: bold;
//     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//   }
//   .topbar .datetime {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     font-size: 16px;
//   }
//   .topbar .datetime .time {
//     font-weight: bold;
//     color: #f1c40f;
//     font-size: 20px;
//   }
//   .topbar .datetime .clock-icon {
//     display: inline-block;
//     animation: spin 60s linear infinite;
//   }
//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   /* Sidebar */
//   .sidebar {
//     display: flex;
//     flex-direction: column;
//     background: rgba(44, 62, 80, 0.98);
//     color: #ecf0f1;
//     width: 65px;
//     min-width: 65px;
//     padding: 15px 12px;
//     transition: width 0.3s ease;
//     overflow: hidden;
//     flex-shrink: 0;
//     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
//   }
//   .sidebar:hover {
//     width: 270px;
//   }
//   .sidebar .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid rgba(255,255,255,0.1);
//     margin-bottom: 10px;
//     white-space: nowrap;
//     font-size: 20px;
//   }
//   .sidebar .header .icon {
//     font-size: 24px;
//   }
//   .sidebar .header .title {
//     font-size: 17px;
//     font-weight: bold;
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .header .title {
//     opacity: 1;
//   }
//   .sidebar .menu {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     overflow-y: auto;
//   }
//   .sidebar .menu button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: transparent;
//     border: none;
//     color: #ecf0f1;
//     border-radius: 8px;
//     text-align: left;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     white-space: nowrap;
//     transition: all 0.2s;
//     width: 100%;
//   }
//   .sidebar .menu button:hover {
//     background: rgba(255,255,255,0.15);
//     transform: scale(1.02);
//     border-left: 3px solid #3498db;
//   }
//   .sidebar .menu button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .menu button .label {
//     opacity: 1;
//   }
//   .sidebar .logout {
//     margin-top: auto;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.1);
//   }
//   .sidebar .logout button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: #c0392b;
//     color: white;
//     font-weight: bold;
//     border-radius: 8px;
//     width: 100%;
//     border: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     transition: all 0.2s;
//   }
//   .sidebar .logout button:hover {
//     background: #e74c3c;
//     transform: scale(1.05);
//   }
//   .sidebar .logout button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .logout button .label {
//     opacity: 1;
//   }

//   /* Main Content */
//   .main {
//     flex: 1;
//     padding: 20px;
//     overflow-y: auto;
//     background: #f0f2f5;
//   }
//   .main .title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 28px;
//     font-weight: bold;
//     color: #2c3e50;
//     margin-bottom: 20px;
//   }
//   /* Summary Cards */
//   .summary {
//     display: flex;
//     gap: 15px;
//     justify-content: center;
//     flex-wrap: wrap;
//     margin-bottom: 20px;
//   }
//   .summary .card {
//     flex: 1;
//     min-width: 150px;
//     max-width: 220px;
//     padding: 12px;
//     border-radius: 14px;
//     text-align: center;
//     color: white;
//     cursor: pointer;
//     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
//     transition: all 0.2s;
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     position: relative;
//     overflow: hidden;
//   }
//   .summary .card:hover {
//     transform: scale(1.05);
//     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//   }
//   .summary .card .icon { font-size: 28px; }
//   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
//   .summary .card .value { font-size: 34px; font-weight: bold; }
//   .summary .card .top-bar {
//     height: 5px;
//     background: rgba(255,255,255,0.3);
//     border-radius: 12px 12px 0 0;
//     margin: -12px -12px 10px -12px;
//   }
//   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
//   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
//   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
//   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

//   /* Toggle Button */
//   .toggle-btn {
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     color: white;
//     border: none;
//     padding: 12px 30px;
//     border-radius: 30px;
//     font-weight: bold;
//     font-size: 16px;
//     cursor: pointer;
//     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
//     transition: all 0.2s;
//     margin-bottom: 15px;
//   }
//   .toggle-btn:hover {
//     transform: scale(1.08);
//     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
//   }

//   /* Table / Card Container */
//   .content-container {
//     background: white;
//     border-radius: 10px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//     padding: 0;
//     overflow: hidden;
//     transition: opacity 0.3s;
//     position: relative;
//     min-height: 400px;
//   }
//   .content-container .table-view {
//     width: 100%;
//     border-collapse: collapse;
//   }
//   .content-container .table-view th {
//     background: #f8f9fa;
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2c3e50;
//     border-bottom: 2px solid #e9ecef;
//   }
//   .content-container .table-view td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #f0f0f0;
//     font-size: 13px;
//   }
//   .content-container .table-view tr:hover td {
//     background: #f8f9fa;
//   }
//   .content-container .table-view .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     text-align: center;
//   }
//   .content-container .table-view .status-badge.attended { background: #27ae60; }
//   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
//   .content-container .table-view .status-badge.closed { background: #e74c3c; }
//   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
//   .content-container .table-view .status-badge.normal { background: #3498db; }

//   /* Card Grid */
//   .card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//     gap: 15px;
//     padding: 20px;
//   }
//   .card-grid .appt-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #e9ecef;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .card-grid .appt-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//   }
//   .card-grid .appt-card .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     margin-bottom: 8px;
//   }
//   .card-grid .appt-card .patient {
//     font-size: 18px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .card-grid .appt-card .detail {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     color: #34495e;
//     font-size: 14px;
//     margin-top: 4px;
//   }
//   .card-grid .appt-card .detail .label {
//     color: #7f8c8d;
//     font-size: 13px;
//   }

//   /* Status Bar */
//   .statusbar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 10px;
//     margin-top: 15px;
//     border: 1px solid #e9ecef;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .statusbar .loading {
//     width: 20px;
//     height: 20px;
//   }
//   .statusbar .message {
//     font-size: 13px;
//     color: #27ae60;
//   }
//   .statusbar .message.error { color: #e74c3c; }
//   .statusbar .message.loading { color: #f39c12; }
//   .statusbar .version {
//     margin-left: auto;
//     font-size: 12px;
//     color: #95a5a6;
//   }

//   /* Scrollable */
//   .scrollable {
//     overflow-y: auto;
//     max-height: 60vh;
//   }

//   /* Utilities */
//   .flex-row { display: flex; flex-direction: row; }
//   .flex-1 { flex: 1; }
//   .h-full { height: 100%; }
//   .overflow-hidden { overflow: hidden; }
// `;

// // -------------------- Helper: format local date --------------------
// const formatLocalDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // -------------------- API call using BASE_URL --------------------
// const fetchScheduleFromApi = async (date) => {
//   const formattedDate = formatLocalDate(date);
//   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
//   console.log('📤 Fetching:', url);

//   try {
//     const response = await fetch(url);
//     console.log('📡 Response status:', response.status);
//     const rawText = await response.text();
//     console.log('📄 Raw response body:', rawText);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${rawText}`);
//     }

//     return JSON.parse(rawText);
//   } catch (err) {
//     console.error('🚨 Fetch error:', err);
//     throw err;
//   }
// };

// // -------------------- Main Component --------------------
// const AdminHomePage = () => {
//   // ---------- Language ----------
//   const lang = localStorage.getItem('lang') || 'en';
//   const t = adminTranslations[lang];
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [currentScreen, setCurrentScreen] = useState('dashboard');

//   const refreshInterval = useRef(null);
//   const navigate = useNavigate();

//   // ---------- Helper: update status ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text, type });
//   }, []);

//   // ---------- Load clinic info from API ----------
//   useEffect(() => {
//     const loadClinic = async () => {
//       try {
//         const data = await fetchClinicInfo();
//         if (data) {
//           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
//           setClinicInfo({
//             name: data.clinicName || t.clinic.default,
//             date: displayDate,
//           });
//         } else {
//           setClinicInfo({
//             name: t.clinic.default,
//             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             }),
//           });
//         }
//       } catch (err) {
//         console.warn('Failed to fetch clinic info:', err);
//       }
//     };
//     loadClinic();
//   }, [lang, t]);

//   // ---------- Load appointments from API ----------
//   const loadAppointments = useCallback(async (date) => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');
//     try {
//       const data = await fetchScheduleFromApi(date);
//       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
//       const rows = allItems.map(item => {
//         const timeStr = item.visitTime || item.appointmentTime;
//         const time = timeStr ? new Date(timeStr) : new Date();
//         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         let patientName = '';
//         if (item.patient) {
//           const { firstName = '', middleName = '', lastName = '' } = item.patient;
//           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         } else if (item.patientName) {
//           patientName = item.patientName;
//         }

//         let doctorName = '';
//         if (item.doctorName) {
//           doctorName = item.doctorName;
//         } else if (item.doctor) {
//           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
//           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         }

//         const roomNumber = item.room?.roomNumber || '';
//         const sectionName = item.room?.section?.name || '';

//         return {
//           id: item.id,
//           patientName: patientName || 'Unknown',
//           doctorName: doctorName || 'N/A',
//           appointmentTimeString: timeString,
//           roomNumber,
//           sectionName,
//           status: item.status || 'NORMAL',
//           notes: item.notes || '',
//         };
//       });

//       setAppointments(rows);
//       setFilteredAppointments(rows);

//       const total = rows.length;
//       const attended = rows.filter(a => a.status === 'ATTENDED').length;
//       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
//       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
//       setSummary({ total, attended, inProgress, cancelled });
//       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
//     } catch (err) {
//       setStatus(t.status.error, 'error');
//       console.error('🚨 Load error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, setStatus]);

//   // ---------- Apply filter ----------
//   const applyFilter = useCallback((status) => {
//     if (status === 'ALL') {
//       setFilteredAppointments(appointments);
//     } else {
//       setFilteredAppointments(appointments.filter(a => a.status === status));
//     }
//     setStatus(`${t.status.filtered}: ${status}`, 'info');
//   }, [appointments, t, setStatus]);

//   // ---------- Toggle view ----------
//   const toggleView = useCallback(() => {
//     setViewMode(prev => prev === 'table' ? 'card' : 'table');
//   }, []);

//   // ---------- Clock ----------
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // ---------- Date change handler ----------
//   const handleDateChange = (e) => {
//     const newDate = new Date(e.target.value + 'T00:00:00');
//     setSelectedDate(newDate);
//   };

//   // ---------- Initial load and auto‑refresh ----------
//   useEffect(() => {
//     loadAppointments(selectedDate);
//     refreshInterval.current = setInterval(() => {
//       loadAppointments(selectedDate);
//     }, 30000);
//     return () => clearInterval(refreshInterval.current);
//   }, [selectedDate, loadAppointments]);

//   // ---------- Helper: status CSS class for badge ----------
//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'attended';
//       case 'IN_PROGRESS': return 'inprogress';
//       case 'CLOSED': return 'closed';
//       case 'CANCELLED': return 'cancelled';
//       default: return 'normal';
//     }
//   };

//   // ---------- Helper: row/card background class ----------
//   const getRowStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'row-attended';
//       case 'IN_PROGRESS': return 'row-inprogress';
//       case 'CLOSED': return 'row-closed';
//       case 'CANCELLED': return 'row-cancelled';
//       default: return 'row-normal';
//     }
//   };

//   // ---------- Logout handler ----------
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/');
//   };

//   // ---------- Render helpers (dashboard) ----------
//   const renderSummaryCards = () => {
//     const cards = [
//       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
//       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
//       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
//       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
//     ];
//     return (
//       <div className="summary">
//         {cards.map(({ key, label, count, icon, cls, filter }) => (
//           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
//             <div className="top-bar"></div>
//             <div className="icon">{icon}</div>
//             <div className="title">{label}</div>
//             <div className="value">{count}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTable = () => (
//     <table className="table-view">
//       <thead>
//         <tr>
//           <th>{t.table.patient}</th>
//           <th>{t.table.doctor}</th>
//           <th>{t.table.time}</th>
//           <th>{t.table.room}</th>
//           <th>{t.table.section}</th>
//           <th>{t.table.status}</th>
//           <th>{t.table.notes}</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredAppointments.length === 0 ? (
//           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
//         ) : (
//           filteredAppointments.map(a => (
//             <tr key={a.id} className={getRowStatusClass(a.status)}>
//               <td>{a.patientName}</td>
//               <td>{a.doctorName}</td>
//               <td>{a.appointmentTimeString}</td>
//               <td>{a.roomNumber}</td>
//               <td>{a.sectionName}</td>
//               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
//               <td>{a.notes}</td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );

//   const renderCardGrid = () => (
//     <div className="card-grid">
//       {filteredAppointments.length === 0 ? (
//         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
//       ) : (
//         filteredAppointments.map(a => (
//           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
//             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
//             <div className="patient">{a.patientName}</div>
//             <div className="detail"><span>🩺</span> {a.doctorName}</div>
//             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
//             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
//             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
//           </div>
//         ))
//       )}
//     </div>
//   );

//   // ---------- Sidebar menu items ----------
//   const menuItems = [
//     { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') },
//     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
//     { icon: '📅', label: t.sidebar.appointments, action: () => setCurrentScreen('appointmentsAdmin') },
//     { icon: '📝', label: t.sidebar.visitTracking, action: () => setCurrentScreen('visitTracking') },
//     { icon: '📑', label: t.sidebar.claimsTracking, action: () => setCurrentScreen('claimsTracking') },
//     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => setCurrentScreen('doctorManagement') },
//     { icon: '📊', label: t.sidebar.reports, action: () => setCurrentScreen('reports') },
//     { icon: '💰', label: t.sidebar.clinicPayments, action: () => setCurrentScreen('clinicPayments') },
//     { icon: '🏢', label: t.sidebar.manageSections, action: () => setCurrentScreen('manageSections') },
//     { icon: '🚪', label: t.sidebar.manageRooms, action: () => setCurrentScreen('manageRooms') },
//     { icon: '👤', label: t.sidebar.userManagement, action: () => setCurrentScreen('userManagement') },
//     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => setCurrentScreen('healthInsurance') },
//     { icon: '📜', label: t.sidebar.logs, action: () => setCurrentScreen('logs') },
//     { icon: 'ℹ️', label: t.sidebar.about, action: () => setCurrentScreen('about') },
//   ];

//   // ---------- JSX ----------
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
//         {/* Top Bar */}
//         <div className="topbar">
//           <div className="clinic">
//             <span>🏥</span>
//             <span>{clinicInfo.name}</span>
//           </div>
//           <div className="datetime">
//             <span>📅 {clinicInfo.date}</span>
//             <input
//               type="date"
//               value={formatLocalDate(selectedDate)}
//               onChange={handleDateChange}
//             />
//             <span>
//               <span className="clock-icon">🕐</span>
//               <span className="time">
//                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                 })}
//               </span>
//             </span>
//           </div>
//         </div>

//         <div className="flex-row flex-1 overflow-hidden">
//           {/* Sidebar – always visible */}
//           <div className="sidebar">
//             <div className="header">
//               <span className="icon">☰</span>
//               <span className="title">{t.sidebar.menu}</span>
//             </div>
//             <div className="menu">
//               {menuItems.map((item, idx) => (
//                 <button key={idx} onClick={item.action}>
//                   <span>{item.icon}</span>
//                   <span className="label">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//             <div className="logout">
//               <button onClick={handleLogout}>
//                 <span>🚪</span>
//                 <span className="label">{t.sidebar.logout}</span>
//               </button>
//             </div>
//           </div>

//           {/* Main Content – switches between screens */}
//           <div className="main">
//             {currentScreen === 'dashboard' && (
//               <>
//                 <div className="title">
//                   <span>📊</span>
//                   <span>{t.dashboard.title}</span>
//                 </div>

//                 {renderSummaryCards()}

//                 <button className="toggle-btn" onClick={toggleView}>
//                   {viewMode === 'table'
//                     ? `📇 ${t.dashboard.switchToCard}`
//                     : `📋 ${t.dashboard.switchToTable}`}
//                 </button>

//                 <div className="content-container">
//                   <div className="scrollable">
//                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
//                   </div>
//                 </div>

//                 <div className="statusbar">
//                   {loading && <div className="loading">⏳</div>}
//                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
//                   <span className="version">v2.0.0</span>
//                 </div>
//               </>
//             )}

//             {currentScreen === 'claimsTracking' && (
//               <ClaimsTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'visitTracking' && (
//               <VisitTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'searchPatient' && (
//               <SearchPatientScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'appointmentsAdmin' && (
//               <AppointmentsAdminScreen
//                 refreshCallback={() => {}}
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//                 embedded={true}
//               />
//             )}

//             {currentScreen === 'doctorManagement' && (
//               <DoctorManagementScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'reports' && (
//               <ReportsScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'clinicPayments' && (
//               <ClinicPaymentReportScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'manageSections' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 🏢 Manage Sections - Coming Soon
//               </div>
//             )}

//             {currentScreen === 'manageRooms' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 🚪 Manage Rooms - Coming Soon
//               </div>
//             )}

//             {currentScreen === 'userManagement' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 👤 User Management - Coming Soon
//               </div>
//             )}

//             {currentScreen === 'healthInsurance' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 🏥 Health Insurance - Coming Soon
//               </div>
//             )}

//             {currentScreen === 'logs' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 📜 Logs - Coming Soon
//               </div>
//             )}

//             {currentScreen === 'about' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 ℹ️ About - Coming Soon
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminHomePage; 02072026 7:50 pm

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { adminTranslations } from '../../i18n/adminTranslations';
// import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
// import VisitTrackingScreen from '../VisitTrackingScreen/VisitTrackingScreen';
// import ClaimsTrackingScreen from '../ClaimsTrackingScreen/ClaimsTrackingScreen';
// import DoctorManagementScreen from '../DoctorManagementScreen/DoctorManagementScreen';
// import ReportsScreen from '../ReportsScreen/ReportsScreen';
// import ClinicPaymentReportScreen from '../ClinicPaymentReportScreen/ClinicPaymentReportScreen';
// import SectionManagementScreen from '../SectionManagementScreen/SectionManagementScreen';

// // -------------------- Styles (inline) --------------------
// const styles = `
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .app {
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
//     background: #f0f2f5;
//     overflow: hidden;
//   }
//   /* Top Bar */
//   .topbar {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 12px 25px;
//     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
//     color: white;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//     flex-shrink: 0;
//   }
//   .topbar .clinic {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 24px;
//     font-weight: bold;
//     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//   }
//   .topbar .datetime {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     font-size: 16px;
//   }
//   .topbar .datetime .time {
//     font-weight: bold;
//     color: #f1c40f;
//     font-size: 20px;
//   }
//   .topbar .datetime .clock-icon {
//     display: inline-block;
//     animation: spin 60s linear infinite;
//   }
//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   /* Sidebar */
//   .sidebar {
//     display: flex;
//     flex-direction: column;
//     background: rgba(44, 62, 80, 0.98);
//     color: #ecf0f1;
//     width: 65px;
//     min-width: 65px;
//     padding: 15px 12px;
//     transition: width 0.3s ease;
//     overflow: hidden;
//     flex-shrink: 0;
//     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
//   }
//   .sidebar:hover {
//     width: 270px;
//   }
//   .sidebar .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid rgba(255,255,255,0.1);
//     margin-bottom: 10px;
//     white-space: nowrap;
//     font-size: 20px;
//   }
//   .sidebar .header .icon {
//     font-size: 24px;
//   }
//   .sidebar .header .title {
//     font-size: 17px;
//     font-weight: bold;
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .header .title {
//     opacity: 1;
//   }
//   .sidebar .menu {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     overflow-y: auto;
//   }
//   .sidebar .menu button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: transparent;
//     border: none;
//     color: #ecf0f1;
//     border-radius: 8px;
//     text-align: left;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     white-space: nowrap;
//     transition: all 0.2s;
//     width: 100%;
//   }
//   .sidebar .menu button:hover {
//     background: rgba(255,255,255,0.15);
//     transform: scale(1.02);
//     border-left: 3px solid #3498db;
//   }
//   .sidebar .menu button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .menu button .label {
//     opacity: 1;
//   }
//   .sidebar .logout {
//     margin-top: auto;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.1);
//   }
//   .sidebar .logout button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: #c0392b;
//     color: white;
//     font-weight: bold;
//     border-radius: 8px;
//     width: 100%;
//     border: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     transition: all 0.2s;
//   }
//   .sidebar .logout button:hover {
//     background: #e74c3c;
//     transform: scale(1.05);
//   }
//   .sidebar .logout button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .logout button .label {
//     opacity: 1;
//   }

//   /* Main Content */
//   .main {
//     flex: 1;
//     padding: 20px;
//     overflow-y: auto;
//     background: #f0f2f5;
//   }
//   .main .title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 28px;
//     font-weight: bold;
//     color: #2c3e50;
//     margin-bottom: 20px;
//   }
//   /* Summary Cards */
//   .summary {
//     display: flex;
//     gap: 15px;
//     justify-content: center;
//     flex-wrap: wrap;
//     margin-bottom: 20px;
//   }
//   .summary .card {
//     flex: 1;
//     min-width: 150px;
//     max-width: 220px;
//     padding: 12px;
//     border-radius: 14px;
//     text-align: center;
//     color: white;
//     cursor: pointer;
//     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
//     transition: all 0.2s;
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     position: relative;
//     overflow: hidden;
//   }
//   .summary .card:hover {
//     transform: scale(1.05);
//     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//   }
//   .summary .card .icon { font-size: 28px; }
//   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
//   .summary .card .value { font-size: 34px; font-weight: bold; }
//   .summary .card .top-bar {
//     height: 5px;
//     background: rgba(255,255,255,0.3);
//     border-radius: 12px 12px 0 0;
//     margin: -12px -12px 10px -12px;
//   }
//   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
//   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
//   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
//   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

//   /* Toggle Button */
//   .toggle-btn {
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     color: white;
//     border: none;
//     padding: 12px 30px;
//     border-radius: 30px;
//     font-weight: bold;
//     font-size: 16px;
//     cursor: pointer;
//     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
//     transition: all 0.2s;
//     margin-bottom: 15px;
//   }
//   .toggle-btn:hover {
//     transform: scale(1.08);
//     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
//   }

//   /* Table / Card Container */
//   .content-container {
//     background: white;
//     border-radius: 10px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//     padding: 0;
//     overflow: hidden;
//     transition: opacity 0.3s;
//     position: relative;
//     min-height: 400px;
//   }
//   .content-container .table-view {
//     width: 100%;
//     border-collapse: collapse;
//   }
//   .content-container .table-view th {
//     background: #f8f9fa;
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2c3e50;
//     border-bottom: 2px solid #e9ecef;
//   }
//   .content-container .table-view td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #f0f0f0;
//     font-size: 13px;
//   }
//   .content-container .table-view tr:hover td {
//     background: #f8f9fa;
//   }
//   .content-container .table-view .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     text-align: center;
//   }
//   .content-container .table-view .status-badge.attended { background: #27ae60; }
//   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
//   .content-container .table-view .status-badge.closed { background: #e74c3c; }
//   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
//   .content-container .table-view .status-badge.normal { background: #3498db; }

//   /* Card Grid */
//   .card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//     gap: 15px;
//     padding: 20px;
//   }
//   .card-grid .appt-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #e9ecef;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .card-grid .appt-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//   }
//   .card-grid .appt-card .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     margin-bottom: 8px;
//   }
//   .card-grid .appt-card .patient {
//     font-size: 18px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .card-grid .appt-card .detail {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     color: #34495e;
//     font-size: 14px;
//     margin-top: 4px;
//   }
//   .card-grid .appt-card .detail .label {
//     color: #7f8c8d;
//     font-size: 13px;
//   }

//   /* Status Bar */
//   .statusbar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 10px;
//     margin-top: 15px;
//     border: 1px solid #e9ecef;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .statusbar .loading {
//     width: 20px;
//     height: 20px;
//   }
//   .statusbar .message {
//     font-size: 13px;
//     color: #27ae60;
//   }
//   .statusbar .message.error { color: #e74c3c; }
//   .statusbar .message.loading { color: #f39c12; }
//   .statusbar .version {
//     margin-left: auto;
//     font-size: 12px;
//     color: #95a5a6;
//   }

//   /* Scrollable */
//   .scrollable {
//     overflow-y: auto;
//     max-height: 60vh;
//   }

//   /* Utilities */
//   .flex-row { display: flex; flex-direction: row; }
//   .flex-1 { flex: 1; }
//   .h-full { height: 100%; }
//   .overflow-hidden { overflow: hidden; }
// `;

// // -------------------- Helper: format local date --------------------
// const formatLocalDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // -------------------- API call using BASE_URL --------------------
// const fetchScheduleFromApi = async (date) => {
//   const formattedDate = formatLocalDate(date);
//   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
//   console.log('📤 Fetching:', url);

//   try {
//     const response = await fetch(url);
//     console.log('📡 Response status:', response.status);
//     const rawText = await response.text();
//     console.log('📄 Raw response body:', rawText);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${rawText}`);
//     }

//     return JSON.parse(rawText);
//   } catch (err) {
//     console.error('🚨 Fetch error:', err);
//     throw err;
//   }
// };

// // -------------------- Main Component --------------------
// const AdminHomePage = () => {
//   // ---------- Language ----------
//   const lang = localStorage.getItem('lang') || 'en';
//   const t = adminTranslations[lang];
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [currentScreen, setCurrentScreen] = useState('dashboard');

//   const refreshInterval = useRef(null);
//   const navigate = useNavigate();

//   // ---------- Helper: update status ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text, type });
//   }, []);

//   // ---------- Load clinic info from API ----------
//   useEffect(() => {
//     const loadClinic = async () => {
//       try {
//         const data = await fetchClinicInfo();
//         if (data) {
//           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
//           setClinicInfo({
//             name: data.clinicName || t.clinic.default,
//             date: displayDate,
//           });
//         } else {
//           setClinicInfo({
//             name: t.clinic.default,
//             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             }),
//           });
//         }
//       } catch (err) {
//         console.warn('Failed to fetch clinic info:', err);
//       }
//     };
//     loadClinic();
//   }, [lang, t]);

//   // ---------- Load appointments from API ----------
//   const loadAppointments = useCallback(async (date) => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');
//     try {
//       const data = await fetchScheduleFromApi(date);
//       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
//       const rows = allItems.map(item => {
//         const timeStr = item.visitTime || item.appointmentTime;
//         const time = timeStr ? new Date(timeStr) : new Date();
//         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         let patientName = '';
//         if (item.patient) {
//           const { firstName = '', middleName = '', lastName = '' } = item.patient;
//           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         } else if (item.patientName) {
//           patientName = item.patientName;
//         }

//         let doctorName = '';
//         if (item.doctorName) {
//           doctorName = item.doctorName;
//         } else if (item.doctor) {
//           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
//           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         }

//         const roomNumber = item.room?.roomNumber || '';
//         const sectionName = item.room?.section?.name || '';

//         return {
//           id: item.id,
//           patientName: patientName || 'Unknown',
//           doctorName: doctorName || 'N/A',
//           appointmentTimeString: timeString,
//           roomNumber,
//           sectionName,
//           status: item.status || 'NORMAL',
//           notes: item.notes || '',
//         };
//       });

//       setAppointments(rows);
//       setFilteredAppointments(rows);

//       const total = rows.length;
//       const attended = rows.filter(a => a.status === 'ATTENDED').length;
//       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
//       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
//       setSummary({ total, attended, inProgress, cancelled });
//       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
//     } catch (err) {
//       setStatus(t.status.error, 'error');
//       console.error('🚨 Load error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, setStatus]);

//   // ---------- Apply filter ----------
//   const applyFilter = useCallback((status) => {
//     if (status === 'ALL') {
//       setFilteredAppointments(appointments);
//     } else {
//       setFilteredAppointments(appointments.filter(a => a.status === status));
//     }
//     setStatus(`${t.status.filtered}: ${status}`, 'info');
//   }, [appointments, t, setStatus]);

//   // ---------- Toggle view ----------
//   const toggleView = useCallback(() => {
//     setViewMode(prev => prev === 'table' ? 'card' : 'table');
//   }, []);

//   // ---------- Clock ----------
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // ---------- Date change handler ----------
//   const handleDateChange = (e) => {
//     const newDate = new Date(e.target.value + 'T00:00:00');
//     setSelectedDate(newDate);
//   };

//   // ---------- Initial load and auto‑refresh ----------
//   useEffect(() => {
//     loadAppointments(selectedDate);
//     refreshInterval.current = setInterval(() => {
//       loadAppointments(selectedDate);
//     }, 30000);
//     return () => clearInterval(refreshInterval.current);
//   }, [selectedDate, loadAppointments]);

//   // ---------- Helper: status CSS class for badge ----------
//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'attended';
//       case 'IN_PROGRESS': return 'inprogress';
//       case 'CLOSED': return 'closed';
//       case 'CANCELLED': return 'cancelled';
//       default: return 'normal';
//     }
//   };

//   // ---------- Helper: row/card background class ----------
//   const getRowStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'row-attended';
//       case 'IN_PROGRESS': return 'row-inprogress';
//       case 'CLOSED': return 'row-closed';
//       case 'CANCELLED': return 'row-cancelled';
//       default: return 'row-normal';
//     }
//   };

//   // ---------- Logout handler ----------
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/');
//   };

//   // ---------- Render helpers (dashboard) ----------
//   const renderSummaryCards = () => {
//     const cards = [
//       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
//       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
//       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
//       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
//     ];
//     return (
//       <div className="summary">
//         {cards.map(({ key, label, count, icon, cls, filter }) => (
//           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
//             <div className="top-bar"></div>
//             <div className="icon">{icon}</div>
//             <div className="title">{label}</div>
//             <div className="value">{count}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTable = () => (
//     <table className="table-view">
//       <thead>
//         <tr>
//           <th>{t.table.patient}</th>
//           <th>{t.table.doctor}</th>
//           <th>{t.table.time}</th>
//           <th>{t.table.room}</th>
//           <th>{t.table.section}</th>
//           <th>{t.table.status}</th>
//           <th>{t.table.notes}</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredAppointments.length === 0 ? (
//           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
//         ) : (
//           filteredAppointments.map(a => (
//             <tr key={a.id} className={getRowStatusClass(a.status)}>
//               <td>{a.patientName}</td>
//               <td>{a.doctorName}</td>
//               <td>{a.appointmentTimeString}</td>
//               <td>{a.roomNumber}</td>
//               <td>{a.sectionName}</td>
//               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
//               <td>{a.notes}</td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );

//   const renderCardGrid = () => (
//     <div className="card-grid">
//       {filteredAppointments.length === 0 ? (
//         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
//       ) : (
//         filteredAppointments.map(a => (
//           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
//             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
//             <div className="patient">{a.patientName}</div>
//             <div className="detail"><span>🩺</span> {a.doctorName}</div>
//             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
//             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
//             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
//           </div>
//         ))
//       )}
//     </div>
//   );

//   // ---------- Sidebar menu items ----------
//   const menuItems = [
//     { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') },
//     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
//     { icon: '📅', label: t.sidebar.appointments, action: () => setCurrentScreen('appointmentsAdmin') },
//     { icon: '📝', label: t.sidebar.visitTracking, action: () => setCurrentScreen('visitTracking') },
//     { icon: '📑', label: t.sidebar.claimsTracking, action: () => setCurrentScreen('claimsTracking') },
//     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => setCurrentScreen('doctorManagement') },
//     { icon: '📊', label: t.sidebar.reports, action: () => setCurrentScreen('reports') },
//     { icon: '💰', label: t.sidebar.clinicPayments, action: () => setCurrentScreen('clinicPayments') },
//     { icon: '🏢', label: t.sidebar.manageSections, action: () => setCurrentScreen('manageSections') },
//     { icon: '🚪', label: t.sidebar.manageRooms, action: () => setCurrentScreen('manageRooms') },
//     { icon: '👤', label: t.sidebar.userManagement, action: () => setCurrentScreen('userManagement') },
//     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => setCurrentScreen('healthInsurance') },
//     { icon: '📜', label: t.sidebar.logs, action: () => setCurrentScreen('logs') },
//     { icon: 'ℹ️', label: t.sidebar.about, action: () => setCurrentScreen('about') },
//   ];

//   // ---------- JSX ----------
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
//         {/* Top Bar */}
//         <div className="topbar">
//           <div className="clinic">
//             <span>🏥</span>
//             <span>{clinicInfo.name}</span>
//           </div>
//           <div className="datetime">
//             <span>📅 {clinicInfo.date}</span>
//             <input
//               type="date"
//               value={formatLocalDate(selectedDate)}
//               onChange={handleDateChange}
//             />
//             <span>
//               <span className="clock-icon">🕐</span>
//               <span className="time">
//                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                 })}
//               </span>
//             </span>
//           </div>
//         </div>

//         <div className="flex-row flex-1 overflow-hidden">
//           {/* Sidebar – always visible */}
//           <div className="sidebar">
//             <div className="header">
//               <span className="icon">☰</span>
//               <span className="title">{t.sidebar.menu}</span>
//             </div>
//             <div className="menu">
//               {menuItems.map((item, idx) => (
//                 <button key={idx} onClick={item.action}>
//                   <span>{item.icon}</span>
//                   <span className="label">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//             <div className="logout">
//               <button onClick={handleLogout}>
//                 <span>🚪</span>
//                 <span className="label">{t.sidebar.logout}</span>
//               </button>
//             </div>
//           </div>

//           {/* Main Content – switches between screens */}
//           <div className="main">
//             {currentScreen === 'dashboard' && (
//               <>
//                 <div className="title">
//                   <span>📊</span>
//                   <span>{t.dashboard.title}</span>
//                 </div>

//                 {renderSummaryCards()}

//                 <button className="toggle-btn" onClick={toggleView}>
//                   {viewMode === 'table'
//                     ? `📇 ${t.dashboard.switchToCard}`
//                     : `📋 ${t.dashboard.switchToTable}`}
//                 </button>

//                 <div className="content-container">
//                   <div className="scrollable">
//                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
//                   </div>
//                 </div>

//                 <div className="statusbar">
//                   {loading && <div className="loading">⏳</div>}
//                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
//                   <span className="version">v2.0.0</span>
//                 </div>
//               </>
//             )}

//             {currentScreen === 'claimsTracking' && (
//               <ClaimsTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'visitTracking' && (
//               <VisitTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'searchPatient' && (
//               <SearchPatientScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'appointmentsAdmin' && (
//               <AppointmentsAdminScreen
//                 refreshCallback={() => {}}
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//                 embedded={true}
//               />
//             )}

//             {currentScreen === 'doctorManagement' && (
//               <DoctorManagementScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'reports' && (
//               <ReportsScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'clinicPayments' && (
//               <ClinicPaymentReportScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'manageSections' && (
//               <SectionManagementScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'manageRooms' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 🚪 Manage Rooms - Coming Soon
//               </div>
//             )}

//             {currentScreen === 'userManagement' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 👤 User Management - Coming Soon
//               </div>
//             )}

//             {currentScreen === 'healthInsurance' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 🏥 Health Insurance - Coming Soon
//               </div>
//             )}

//             {currentScreen === 'logs' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 📜 Logs - Coming Soon
//               </div>
//             )}

//             {currentScreen === 'about' && (
//               <div className="payment-empty" style={{ padding: '40px', textAlign: 'center', color: '#7f8c8d' }}>
//                 ℹ️ About - Coming Soon
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminHomePage; 04072026

// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useCallback,
// } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { adminTranslations } from '../../i18n/adminTranslations';
// import { BASE_URL, fetchClinicInfo } from '../../utils/api';
// import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';
// import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
// import VisitTrackingScreen from '../VisitTrackingScreen/VisitTrackingScreen';
// import ClaimsTrackingScreen from '../ClaimsTrackingScreen/ClaimsTrackingScreen';
// import DoctorManagementScreen from '../DoctorManagementScreen/DoctorManagementScreen';
// import ReportsScreen from '../ReportsScreen/ReportsScreen';
// import ClinicPaymentReportScreen from '../ClinicPaymentReportScreen/ClinicPaymentReportScreen';
// import SectionManagementScreen from '../SectionManagementScreen/SectionManagementScreen';
// import RoomManagementScreen from '../RoomManagementScreen/RoomManagementScreen'; // Import the new component
// import UserManagementScreen from '../UserManagementScreen/UserManagementScreen';
// import HealthInsuranceScreen from '../HealthInsuranceScreen/HealthInsuranceScreen';
// import LogsMonitorScreen from '../LogsMonitorScreen/LogsMonitorScreen';


// // -------------------- Styles (inline) --------------------
// const styles = `
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .app {
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
//     background: #f0f2f5;
//     overflow: hidden;
//   }
//   /* Top Bar */
//   .topbar {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 12px 25px;
//     background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
//     color: white;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.2);
//     flex-shrink: 0;
//   }
//   .topbar .clinic {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 24px;
//     font-weight: bold;
//     text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//   }
//   .topbar .datetime {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     font-size: 16px;
//   }
//   .topbar .datetime .time {
//     font-weight: bold;
//     color: #f1c40f;
//     font-size: 20px;
//   }
//   .topbar .datetime .clock-icon {
//     display: inline-block;
//     animation: spin 60s linear infinite;
//   }
//   @keyframes spin {
//     from { transform: rotate(0deg); }
//     to { transform: rotate(360deg); }
//   }
//   /* Sidebar */
//   .sidebar {
//     display: flex;
//     flex-direction: column;
//     background: rgba(44, 62, 80, 0.98);
//     color: #ecf0f1;
//     width: 65px;
//     min-width: 65px;
//     padding: 15px 12px;
//     transition: width 0.3s ease;
//     overflow: hidden;
//     flex-shrink: 0;
//     box-shadow: 2px 0 10px rgba(0,0,0,0.1);
//   }
//   .sidebar:hover {
//     width: 270px;
//   }
//   .sidebar .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid rgba(255,255,255,0.1);
//     margin-bottom: 10px;
//     white-space: nowrap;
//     font-size: 20px;
//   }
//   .sidebar .header .icon {
//     font-size: 24px;
//   }
//   .sidebar .header .title {
//     font-size: 17px;
//     font-weight: bold;
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .header .title {
//     opacity: 1;
//   }
//   .sidebar .menu {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 6px;
//     overflow-y: auto;
//   }
//   .sidebar .menu button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: transparent;
//     border: none;
//     color: #ecf0f1;
//     border-radius: 8px;
//     text-align: left;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     white-space: nowrap;
//     transition: all 0.2s;
//     width: 100%;
//   }
//   .sidebar .menu button:hover {
//     background: rgba(255,255,255,0.15);
//     transform: scale(1.02);
//     border-left: 3px solid #3498db;
//   }
//   .sidebar .menu button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .menu button .label {
//     opacity: 1;
//   }
//   .sidebar .logout {
//     margin-top: auto;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.1);
//   }
//   .sidebar .logout button {
//     padding: 10px 16px;
//     font-size: 15px;
//     background: #c0392b;
//     color: white;
//     font-weight: bold;
//     border-radius: 8px;
//     width: 100%;
//     border: none;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     transition: all 0.2s;
//   }
//   .sidebar .logout button:hover {
//     background: #e74c3c;
//     transform: scale(1.05);
//   }
//   .sidebar .logout button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }
//   .sidebar:hover .logout button .label {
//     opacity: 1;
//   }

//   /* Main Content */
//   .main {
//     flex: 1;
//     padding: 20px;
//     overflow-y: auto;
//     background: #f0f2f5;
//   }
//   .main .title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     font-size: 28px;
//     font-weight: bold;
//     color: #2c3e50;
//     margin-bottom: 20px;
//   }
//   /* Summary Cards */
//   .summary {
//     display: flex;
//     gap: 15px;
//     justify-content: center;
//     flex-wrap: wrap;
//     margin-bottom: 20px;
//   }
//   .summary .card {
//     flex: 1;
//     min-width: 150px;
//     max-width: 220px;
//     padding: 12px;
//     border-radius: 14px;
//     text-align: center;
//     color: white;
//     cursor: pointer;
//     box-shadow: 0 8px 20px rgba(0,0,0,0.2);
//     transition: all 0.2s;
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     position: relative;
//     overflow: hidden;
//   }
//   .summary .card:hover {
//     transform: scale(1.05);
//     box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//   }
//   .summary .card .icon { font-size: 28px; }
//   .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
//   .summary .card .value { font-size: 34px; font-weight: bold; }
//   .summary .card .top-bar {
//     height: 5px;
//     background: rgba(255,255,255,0.3);
//     border-radius: 12px 12px 0 0;
//     margin: -12px -12px 10px -12px;
//   }
//   .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
//   .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
//   .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
//   .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

//   /* Toggle Button */
//   .toggle-btn {
//     background: linear-gradient(135deg, #3498db, #2980b9);
//     color: white;
//     border: none;
//     padding: 12px 30px;
//     border-radius: 30px;
//     font-weight: bold;
//     font-size: 16px;
//     cursor: pointer;
//     box-shadow: 0 4px 15px rgba(52,152,219,0.3);
//     transition: all 0.2s;
//     margin-bottom: 15px;
//   }
//   .toggle-btn:hover {
//     transform: scale(1.08);
//     box-shadow: 0 6px 20px rgba(52,152,219,0.5);
//   }

//   /* Table / Card Container */
//   .content-container {
//     background: white;
//     border-radius: 10px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//     padding: 0;
//     overflow: hidden;
//     transition: opacity 0.3s;
//     position: relative;
//     min-height: 400px;
//   }
//   .content-container .table-view {
//     width: 100%;
//     border-collapse: collapse;
//   }
//   .content-container .table-view th {
//     background: #f8f9fa;
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2c3e50;
//     border-bottom: 2px solid #e9ecef;
//   }
//   .content-container .table-view td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #f0f0f0;
//     font-size: 13px;
//   }
//   .content-container .table-view tr:hover td {
//     background: #f8f9fa;
//   }
//   .content-container .table-view .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     text-align: center;
//   }
//   .content-container .table-view .status-badge.attended { background: #27ae60; }
//   .content-container .table-view .status-badge.inprogress { background: #f39c12; }
//   .content-container .table-view .status-badge.closed { background: #e74c3c; }
//   .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
//   .content-container .table-view .status-badge.normal { background: #3498db; }

//   /* Card Grid */
//   .card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//     gap: 15px;
//     padding: 20px;
//   }
//   .card-grid .appt-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #e9ecef;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .card-grid .appt-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 8px 25px rgba(0,0,0,0.12);
//   }
//   .card-grid .appt-card .status-badge {
//     display: inline-block;
//     padding: 3px 14px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     margin-bottom: 8px;
//   }
//   .card-grid .appt-card .patient {
//     font-size: 18px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .card-grid .appt-card .detail {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     color: #34495e;
//     font-size: 14px;
//     margin-top: 4px;
//   }
//   .card-grid .appt-card .detail .label {
//     color: #7f8c8d;
//     font-size: 13px;
//   }

//   /* Status Bar */
//   .statusbar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 10px;
//     margin-top: 15px;
//     border: 1px solid #e9ecef;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .statusbar .loading {
//     width: 20px;
//     height: 20px;
//   }
//   .statusbar .message {
//     font-size: 13px;
//     color: #27ae60;
//   }
//   .statusbar .message.error { color: #e74c3c; }
//   .statusbar .message.loading { color: #f39c12; }
//   .statusbar .version {
//     margin-left: auto;
//     font-size: 12px;
//     color: #95a5a6;
//   }

//   /* Scrollable */
//   .scrollable {
//     overflow-y: auto;
//     max-height: 60vh;
//   }

//   /* Utilities */
//   .flex-row { display: flex; flex-direction: row; }
//   .flex-1 { flex: 1; }
//   .h-full { height: 100%; }
//   .overflow-hidden { overflow: hidden; }
  
//   /* Additional styles for room management integration */
//   .screen-container {
//     height: 100%;
//     overflow-y: auto;
//     padding: 0;
//   }
  
//   .screen-container > * {
//     height: 100%;
//   }
  
//   .back-button {
//     display: inline-flex;
//     align-items: center;
//     gap: 8px;
//     padding: 10px 20px;
//     background: #4299e1;
//     color: white;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     margin-bottom: 20px;
//     transition: all 0.2s;
//   }
  
//   .back-button:hover {
//     background: #3182ce;
//     transform: scale(1.05);
//   }
  
//   .coming-soon {
//     padding: 60px;
//     text-align: center;
//     font-size: 18px;
//     color: #7f8c8d;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 12px rgba(0,0,0,0.08);
//   }
  
//   .coming-soon .icon {
//     font-size: 48px;
//     display: block;
//     margin-bottom: 20px;
//   }
  
//   .coming-soon .title {
//     font-size: 24px;
//     font-weight: bold;
//     color: #2c3e50;
//     margin-bottom: 10px;
//   }
  
//   .coming-soon .subtitle {
//     color: #95a5a6;
//   }
// `;

// // -------------------- Helper: format local date --------------------
// const formatLocalDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const day = String(date.getDate()).padStart(2, '0');
//   return `${year}-${month}-${day}`;
// };

// // -------------------- API call using BASE_URL --------------------
// const fetchScheduleFromApi = async (date) => {
//   const formattedDate = formatLocalDate(date);
//   const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
//   console.log('📤 Fetching:', url);

//   try {
//     const response = await fetch(url);
//     console.log('📡 Response status:', response.status);
//     const rawText = await response.text();
//     console.log('📄 Raw response body:', rawText);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${rawText}`);
//     }

//     return JSON.parse(rawText);
//   } catch (err) {
//     console.error('🚨 Fetch error:', err);
//     throw err;
//   }
// };

// // -------------------- Main Component --------------------
// const AdminHomePage = () => {
//   // ---------- Language ----------
//   const lang = localStorage.getItem('lang') || 'en';
//   const t = adminTranslations[lang];
//   const isRTL = lang === 'ar';

//   // ---------- State ----------
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
//   const [viewMode, setViewMode] = useState('table');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [currentScreen, setCurrentScreen] = useState('dashboard');

//   const refreshInterval = useRef(null);
//   const navigate = useNavigate();

//   // ---------- Helper: update status ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text, type });
//   }, []);

//   // ---------- Load clinic info from API ----------
//   useEffect(() => {
//     const loadClinic = async () => {
//       try {
//         const data = await fetchClinicInfo();
//         if (data) {
//           const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
//           setClinicInfo({
//             name: data.clinicName || t.clinic.default,
//             date: displayDate,
//           });
//         } else {
//           setClinicInfo({
//             name: t.clinic.default,
//             date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
//               weekday: 'long',
//               year: 'numeric',
//               month: 'long',
//               day: 'numeric',
//             }),
//           });
//         }
//       } catch (err) {
//         console.warn('Failed to fetch clinic info:', err);
//       }
//     };
//     loadClinic();
//   }, [lang, t]);

//   // ---------- Load appointments from API ----------
//   const loadAppointments = useCallback(async (date) => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');
//     try {
//       const data = await fetchScheduleFromApi(date);
//       const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
//       const rows = allItems.map(item => {
//         const timeStr = item.visitTime || item.appointmentTime;
//         const time = timeStr ? new Date(timeStr) : new Date();
//         const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         let patientName = '';
//         if (item.patient) {
//           const { firstName = '', middleName = '', lastName = '' } = item.patient;
//           patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         } else if (item.patientName) {
//           patientName = item.patientName;
//         }

//         let doctorName = '';
//         if (item.doctorName) {
//           doctorName = item.doctorName;
//         } else if (item.doctor) {
//           const { firstName = '', middleName = '', lastName = '' } = item.doctor;
//           doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
//         }

//         const roomNumber = item.room?.roomNumber || '';
//         const sectionName = item.room?.section?.name || '';

//         return {
//           id: item.id,
//           patientName: patientName || 'Unknown',
//           doctorName: doctorName || 'N/A',
//           appointmentTimeString: timeString,
//           roomNumber,
//           sectionName,
//           status: item.status || 'NORMAL',
//           notes: item.notes || '',
//         };
//       });

//       setAppointments(rows);
//       setFilteredAppointments(rows);

//       const total = rows.length;
//       const attended = rows.filter(a => a.status === 'ATTENDED').length;
//       const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
//       const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
//       setSummary({ total, attended, inProgress, cancelled });
//       setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
//     } catch (err) {
//       setStatus(t.status.error, 'error');
//       console.error('🚨 Load error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [t, setStatus]);

//   // ---------- Apply filter ----------
//   const applyFilter = useCallback((status) => {
//     if (status === 'ALL') {
//       setFilteredAppointments(appointments);
//     } else {
//       setFilteredAppointments(appointments.filter(a => a.status === status));
//     }
//     setStatus(`${t.status.filtered}: ${status}`, 'info');
//   }, [appointments, t, setStatus]);

//   // ---------- Toggle view ----------
//   const toggleView = useCallback(() => {
//     setViewMode(prev => prev === 'table' ? 'card' : 'table');
//   }, []);

//   // ---------- Clock ----------
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // ---------- Date change handler ----------
//   const handleDateChange = (e) => {
//     const newDate = new Date(e.target.value + 'T00:00:00');
//     setSelectedDate(newDate);
//   };

//   // ---------- Initial load and auto‑refresh ----------
//   useEffect(() => {
//     loadAppointments(selectedDate);
//     refreshInterval.current = setInterval(() => {
//       loadAppointments(selectedDate);
//     }, 30000);
//     return () => clearInterval(refreshInterval.current);
//   }, [selectedDate, loadAppointments]);

//   // ---------- Helper: status CSS class for badge ----------
//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'attended';
//       case 'IN_PROGRESS': return 'inprogress';
//       case 'CLOSED': return 'closed';
//       case 'CANCELLED': return 'cancelled';
//       default: return 'normal';
//     }
//   };

//   // ---------- Helper: row/card background class ----------
//   const getRowStatusClass = (status) => {
//     switch (status) {
//       case 'ATTENDED': return 'row-attended';
//       case 'IN_PROGRESS': return 'row-inprogress';
//       case 'CLOSED': return 'row-closed';
//       case 'CANCELLED': return 'row-cancelled';
//       default: return 'row-normal';
//     }
//   };

//   // ---------- Logout handler ----------
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     navigate('/');
//   };

//   // ---------- Render helpers (dashboard) ----------
//   const renderSummaryCards = () => {
//     const cards = [
//       { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
//       { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
//       { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
//       { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
//     ];
//     return (
//       <div className="summary">
//         {cards.map(({ key, label, count, icon, cls, filter }) => (
//           <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
//             <div className="top-bar"></div>
//             <div className="icon">{icon}</div>
//             <div className="title">{label}</div>
//             <div className="value">{count}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTable = () => (
//     <table className="table-view">
//       <thead>
//         <tr>
//           <th>{t.table.patient}</th>
//           <th>{t.table.doctor}</th>
//           <th>{t.table.time}</th>
//           <th>{t.table.room}</th>
//           <th>{t.table.section}</th>
//           <th>{t.table.status}</th>
//           <th>{t.table.notes}</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredAppointments.length === 0 ? (
//           <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
//         ) : (
//           filteredAppointments.map(a => (
//             <tr key={a.id} className={getRowStatusClass(a.status)}>
//               <td>{a.patientName}</td>
//               <td>{a.doctorName}</td>
//               <td>{a.appointmentTimeString}</td>
//               <td>{a.roomNumber}</td>
//               <td>{a.sectionName}</td>
//               <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
//               <td>{a.notes}</td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );

//   const renderCardGrid = () => (
//     <div className="card-grid">
//       {filteredAppointments.length === 0 ? (
//         <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
//       ) : (
//         filteredAppointments.map(a => (
//           <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
//             <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
//             <div className="patient">{a.patientName}</div>
//             <div className="detail"><span>🩺</span> {a.doctorName}</div>
//             <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
//             <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
//             {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
//           </div>
//         ))
//       )}
//     </div>
//   );

//   // ---------- Sidebar menu items ----------
//   const menuItems = [
//     { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') },
//     { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
//     { icon: '📅', label: t.sidebar.appointments, action: () => setCurrentScreen('appointmentsAdmin') },
//     { icon: '📝', label: t.sidebar.visitTracking, action: () => setCurrentScreen('visitTracking') },
//     { icon: '📑', label: t.sidebar.claimsTracking, action: () => setCurrentScreen('claimsTracking') },
//     { icon: '🩺', label: t.sidebar.manageDoctors, action: () => setCurrentScreen('doctorManagement') },
//     { icon: '📊', label: t.sidebar.reports, action: () => setCurrentScreen('reports') },
//     { icon: '💰', label: t.sidebar.clinicPayments, action: () => setCurrentScreen('clinicPayments') },
//     { icon: '🏢', label: t.sidebar.manageSections, action: () => setCurrentScreen('manageSections') },
//     { icon: '🚪', label: t.sidebar.manageRooms, action: () => setCurrentScreen('manageRooms') },
// { icon: '👤', label: t.sidebar.userManagement, action: () => setCurrentScreen('userManagement') },
//     { icon: '🏥', label: t.sidebar.healthInsurance, action: () => setCurrentScreen('healthInsurance') },
//     { icon: '📜', label: t.sidebar.logs, action: () => setCurrentScreen('logs') },
//     { icon: 'ℹ️', label: t.sidebar.about, action: () => setCurrentScreen('about') },
//   ];

//   // ---------- Render coming soon placeholder ----------
//   const renderComingSoon = (icon, title, subtitle) => (
//     <div className="coming-soon">
//       <span className="icon">{icon}</span>
//       <div className="title">{title}</div>
//       <div className="subtitle">{subtitle}</div>
//     </div>
//   );

//   // ---------- JSX ----------
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
//         {/* Top Bar */}
//         <div className="topbar">
//           <div className="clinic">
//             <span>🏥</span>
//             <span>{clinicInfo.name}</span>
//           </div>
//           <div className="datetime">
//             <span>📅 {clinicInfo.date}</span>
//             <input
//               type="date"
//               value={formatLocalDate(selectedDate)}
//               onChange={handleDateChange}
//             />
//             <span>
//               <span className="clock-icon">🕐</span>
//               <span className="time">
//                 {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                 })}
//               </span>
//             </span>
//           </div>
//         </div>

//         <div className="flex-row flex-1 overflow-hidden">
//           {/* Sidebar – always visible */}
//           <div className="sidebar">
//             <div className="header">
//               <span className="icon">☰</span>
//               <span className="title">{t.sidebar.menu}</span>
//             </div>
//             <div className="menu">
//               {menuItems.map((item, idx) => (
//                 <button key={idx} onClick={item.action}>
//                   <span>{item.icon}</span>
//                   <span className="label">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//             <div className="logout">
//               <button onClick={handleLogout}>
//                 <span>🚪</span>
//                 <span className="label">{t.sidebar.logout}</span>
//               </button>
//             </div>
//           </div>

//           {/* Main Content – switches between screens */}
//           <div className="main">
//             {currentScreen === 'dashboard' && (
//               <>
//                 <div className="title">
//                   <span>📊</span>
//                   <span>{t.dashboard.title}</span>
//                 </div>

//                 {renderSummaryCards()}

//                 <button className="toggle-btn" onClick={toggleView}>
//                   {viewMode === 'table'
//                     ? `📇 ${t.dashboard.switchToCard}`
//                     : `📋 ${t.dashboard.switchToTable}`}
//                 </button>

//                 <div className="content-container">
//                   <div className="scrollable">
//                     {viewMode === 'table' ? renderTable() : renderCardGrid()}
//                   </div>
//                 </div>

//                 <div className="statusbar">
//                   {loading && <div className="loading">⏳</div>}
//                   <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
//                   <span className="version">v2.0.0</span>
//                 </div>
//               </>
//             )}

//             {currentScreen === 'claimsTracking' && (
//               <ClaimsTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'visitTracking' && (
//               <VisitTrackingScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'searchPatient' && (
//               <SearchPatientScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'appointmentsAdmin' && (
//               <AppointmentsAdminScreen
//                 refreshCallback={() => {}}
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//                 embedded={true}
//               />
//             )}

//             {currentScreen === 'doctorManagement' && (
//               <DoctorManagementScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'reports' && (
//               <ReportsScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'clinicPayments' && (
//               <ClinicPaymentReportScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//             {currentScreen === 'manageSections' && (
//               <SectionManagementScreen
//                 loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//                 lang={lang}
//                 onClose={() => setCurrentScreen('dashboard')}
//               />
//             )}

//            {currentScreen === 'manageRooms' && (
//   <RoomManagementScreen
//     loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//     lang={lang}
//     onClose={() => setCurrentScreen('dashboard')}
//   />
// )}

//            {currentScreen === 'userManagement' && (
//   <UserManagementScreen
//     loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//     lang={lang}
//     onClose={() => setCurrentScreen('dashboard')}
//   />
// )}

//           {currentScreen === 'healthInsurance' && (
//   <HealthInsuranceScreen
//     loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//     lang={lang}
//     onClose={() => setCurrentScreen('dashboard')}
//   />
// )}
//            {currentScreen === 'logs' && (
//   <LogsMonitorScreen
//     loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
//     lang={lang}
//     onClose={() => setCurrentScreen('dashboard')}
//   />
// )}

//             {currentScreen === 'about' && (
//               renderComingSoon('ℹ️', 'About', 'Coming Soon!')
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminHomePage; V2 04072026


import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { adminTranslations } from '../../i18n/adminTranslations';
import { BASE_URL, fetchClinicInfo } from '../../utils/api';
import SearchPatientScreen from '../SearchPatientScreen/SearchPatientScreen';
import AppointmentsAdminScreen from '../AppointmentsAdminScreen/AppointmentsAdminScreen';
import VisitTrackingScreen from '../VisitTrackingScreen/VisitTrackingScreen';
import ClaimsTrackingScreen from '../ClaimsTrackingScreen/ClaimsTrackingScreen';
import DoctorManagementScreen from '../DoctorManagementScreen/DoctorManagementScreen';
import ReportsScreen from '../ReportsScreen/ReportsScreen';
import ClinicPaymentReportScreen from '../ClinicPaymentReportScreen/ClinicPaymentReportScreen';
import SectionManagementScreen from '../SectionManagementScreen/SectionManagementScreen';
import RoomManagementScreen from '../RoomManagementScreen/RoomManagementScreen';
import UserManagementScreen from '../UserManagementScreen/UserManagementScreen';
import HealthInsuranceScreen from '../HealthInsuranceScreen/HealthInsuranceScreen';
import LogsMonitorScreen from '../LogsMonitorScreen/LogsMonitorScreen';

// -------------------- Styles (inline) --------------------
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .app {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #f0f2f5;
    overflow: hidden;
  }
  /* Top Bar */
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 25px;
    background: linear-gradient(135deg, #2c3e50, #3498db, #2980b9);
    color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    flex-shrink: 0;
  }
  .topbar .clinic {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  .topbar .datetime {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 16px;
  }
  .topbar .datetime .time {
    font-weight: bold;
    color: #f1c40f;
    font-size: 20px;
  }
  .topbar .datetime .clock-icon {
    display: inline-block;
    animation: spin 60s linear infinite;
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  /* Sidebar */
  .sidebar {
    display: flex;
    flex-direction: column;
    background: rgba(44, 62, 80, 0.98);
    color: #ecf0f1;
    width: 65px;
    min-width: 65px;
    padding: 15px 12px;
    transition: width 0.3s ease;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  }
  .sidebar:hover {
    width: 270px;
  }
  .sidebar .header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 10px;
    white-space: nowrap;
    font-size: 20px;
  }
  .sidebar .header .icon {
    font-size: 24px;
  }
  .sidebar .header .title {
    font-size: 17px;
    font-weight: bold;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .sidebar:hover .header .title {
    opacity: 1;
  }
  .sidebar .menu {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow-y: auto;
  }
  .sidebar .menu button {
    padding: 10px 16px;
    font-size: 15px;
    background: transparent;
    border: none;
    color: #ecf0f1;
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    transition: all 0.2s;
    width: 100%;
  }
  .sidebar .menu button:hover {
    background: rgba(255,255,255,0.15);
    transform: scale(1.02);
    border-left: 3px solid #3498db;
  }
  .sidebar .menu button .label {
    opacity: 0;
    transition: opacity 0.3s;
  }
  .sidebar:hover .menu button .label {
    opacity: 1;
  }
  .sidebar .logout {
    margin-top: auto;
    padding-top: 10px;
    border-top: 1px solid rgba(255,255,255,0.1);
  }
  .sidebar .logout button {
    padding: 10px 16px;
    font-size: 15px;
    background: #c0392b;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    width: 100%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.2s;
  }
  .sidebar .logout button:hover {
    background: #e74c3c;
    transform: scale(1.05);
  }
  .sidebar .logout button .label {
    opacity: 0;
    transition: opacity 0.3s;
  }
  .sidebar:hover .logout button .label {
    opacity: 1;
  }

  /* Main Content */
  .main {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #f0f2f5;
  }
  .main .title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 28px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 20px;
  }
  /* Summary Cards */
  .summary {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }
  .summary .card {
    flex: 1;
    min-width: 150px;
    max-width: 220px;
    padding: 12px;
    border-radius: 14px;
    text-align: center;
    color: white;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    transition: all 0.2s;
    background: linear-gradient(135deg, #3498db, #2980b9);
    position: relative;
    overflow: hidden;
  }
  .summary .card:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 30px rgba(0,0,0,0.3);
  }
  .summary .card .icon { font-size: 28px; }
  .summary .card .title { font-size: 13px; font-weight: bold; opacity: 0.9; }
  .summary .card .value { font-size: 34px; font-weight: bold; }
  .summary .card .top-bar {
    height: 5px;
    background: rgba(255,255,255,0.3);
    border-radius: 12px 12px 0 0;
    margin: -12px -12px 10px -12px;
  }
  .summary .card.total { background: linear-gradient(135deg, #3498db, #2980b9); }
  .summary .card.attended { background: linear-gradient(135deg, #2ecc71, #27ae60); }
  .summary .card.inprogress { background: linear-gradient(135deg, #f39c12, #e67e22); }
  .summary .card.cancelled { background: linear-gradient(135deg, #e74c3c, #c0392b); }

  /* Toggle Button */
  .toggle-btn {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(52,152,219,0.3);
    transition: all 0.2s;
    margin-bottom: 15px;
  }
  .toggle-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(52,152,219,0.5);
  }

  /* Table / Card Container */
  .content-container {
    background: white;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    padding: 0;
    overflow: hidden;
    transition: opacity 0.3s;
    position: relative;
    min-height: 400px;
  }
  .content-container .table-view {
    width: 100%;
    border-collapse: collapse;
  }
  .content-container .table-view th {
    background: #f8f9fa;
    padding: 12px 15px;
    text-align: left;
    font-weight: bold;
    color: #2c3e50;
    border-bottom: 2px solid #e9ecef;
  }
  .content-container .table-view td {
    padding: 10px 15px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 13px;
  }
  .content-container .table-view tr:hover td {
    background: #f8f9fa;
  }
  .content-container .table-view .status-badge {
    display: inline-block;
    padding: 3px 14px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 12px;
    color: white;
    text-align: center;
  }
  .content-container .table-view .status-badge.attended { background: #27ae60; }
  .content-container .table-view .status-badge.inprogress { background: #f39c12; }
  .content-container .table-view .status-badge.closed { background: #e74c3c; }
  .content-container .table-view .status-badge.cancelled { background: #95a5a6; }
  .content-container .table-view .status-badge.normal { background: #3498db; }

  /* Card Grid */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 15px;
    padding: 20px;
  }
  .card-grid .appt-card {
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    border: 1px solid #e9ecef;
    transition: all 0.2s;
    cursor: pointer;
  }
  .card-grid .appt-card:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  }
  .card-grid .appt-card .status-badge {
    display: inline-block;
    padding: 3px 14px;
    border-radius: 12px;
    font-weight: bold;
    font-size: 12px;
    color: white;
    margin-bottom: 8px;
  }
  .card-grid .appt-card .patient {
    font-size: 18px;
    font-weight: bold;
    color: #2c3e50;
  }
  .card-grid .appt-card .detail {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #34495e;
    font-size: 14px;
    margin-top: 4px;
  }
  .card-grid .appt-card .detail .label {
    color: #7f8c8d;
    font-size: 13px;
  }

  /* Status Bar */
  .statusbar {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px 20px;
    background: white;
    border-radius: 10px;
    margin-top: 15px;
    border: 1px solid #e9ecef;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  }
  .statusbar .loading {
    width: 20px;
    height: 20px;
  }
  .statusbar .message {
    font-size: 13px;
    color: #27ae60;
  }
  .statusbar .message.error { color: #e74c3c; }
  .statusbar .message.loading { color: #f39c12; }
  .statusbar .version {
    margin-left: auto;
    font-size: 12px;
    color: #95a5a6;
  }

  /* Scrollable */
  .scrollable {
    overflow-y: auto;
    max-height: 60vh;
  }

  /* Utilities */
  .flex-row { display: flex; flex-direction: row; }
  .flex-1 { flex: 1; }
  .h-full { height: 100%; }
  .overflow-hidden { overflow: hidden; }
  
  /* Additional styles for room management integration */
  .screen-container {
    height: 100%;
    overflow-y: auto;
    padding: 0;
  }
  
  .screen-container > * {
    height: 100%;
  }
  
  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: #4299e1;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 20px;
    transition: all 0.2s;
  }
  
  .back-button:hover {
    background: #3182ce;
    transform: scale(1.05);
  }
  
  .coming-soon {
    padding: 60px;
    text-align: center;
    font-size: 18px;
    color: #7f8c8d;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  }
  
  .coming-soon .icon {
    font-size: 48px;
    display: block;
    margin-bottom: 20px;
  }
  
  .coming-soon .title {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  
  .coming-soon .subtitle {
    color: #95a5a6;
  }
`;

// -------------------- Helper: format local date --------------------
const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// -------------------- API call using BASE_URL --------------------
const fetchScheduleFromApi = async (date) => {
  const formattedDate = formatLocalDate(date);
  const url = `${BASE_URL}/api/schedule?date=${formattedDate}`;
  console.log('📤 Fetching:', url);

  try {
    const response = await fetch(url);
    console.log('📡 Response status:', response.status);
    const rawText = await response.text();
    console.log('📄 Raw response body:', rawText);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${rawText}`);
    }

    return JSON.parse(rawText);
  } catch (err) {
    console.error('🚨 Fetch error:', err);
    throw err;
  }
};

// -------------------- Main Component --------------------
const AdminHomePage = () => {
  // ---------- Language ----------
  const lang = localStorage.getItem('lang') || 'en';
  const t = adminTranslations[lang];
  const isRTL = lang === 'ar';

  // ---------- State ----------
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [summary, setSummary] = useState({ total: 0, attended: 0, inProgress: 0, cancelled: 0 });
  const [viewMode, setViewMode] = useState('table');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
  const [clinicInfo, setClinicInfo] = useState({ name: t.clinic.default, date: '' });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  const refreshInterval = useRef(null);
  const navigate = useNavigate();

  // Get user role from localStorage
  const userRole = localStorage.getItem('userRole') || 'ASSISTANT';
  const isAdmin = userRole === 'ADMIN';

  // ---------- Helper: update status ----------
  const setStatus = useCallback((text, type = 'success') => {
    setStatusMessage({ text, type });
  }, []);

  // ---------- Load clinic info from API ----------
  useEffect(() => {
    const loadClinic = async () => {
      try {
        const data = await fetchClinicInfo();
        if (data) {
          const displayDate = data.day && data.date ? `${data.day} | ${data.date}` : t.clinic.default;
          setClinicInfo({
            name: data.clinicName || t.clinic.default,
            date: displayDate,
          });
        } else {
          setClinicInfo({
            name: t.clinic.default,
            date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          });
        }
      } catch (err) {
        console.warn('Failed to fetch clinic info:', err);
      }
    };
    loadClinic();
  }, [lang, t]);

  // ---------- Load appointments from API ----------
  const loadAppointments = useCallback(async (date) => {
    setLoading(true);
    setStatus(t.status.loading, 'loading');
    try {
      const data = await fetchScheduleFromApi(date);
      const allItems = [...(data.appointments || []), ...(data.walkIns || [])];
      const rows = allItems.map(item => {
        const timeStr = item.visitTime || item.appointmentTime;
        const time = timeStr ? new Date(timeStr) : new Date();
        const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let patientName = '';
        if (item.patient) {
          const { firstName = '', middleName = '', lastName = '' } = item.patient;
          patientName = [firstName, middleName, lastName].filter(Boolean).join(' ');
        } else if (item.patientName) {
          patientName = item.patientName;
        }

        let doctorName = '';
        if (item.doctorName) {
          doctorName = item.doctorName;
        } else if (item.doctor) {
          const { firstName = '', middleName = '', lastName = '' } = item.doctor;
          doctorName = [firstName, middleName, lastName].filter(Boolean).join(' ');
        }

        const roomNumber = item.room?.roomNumber || '';
        const sectionName = item.room?.section?.name || '';

        return {
          id: item.id,
          patientName: patientName || 'Unknown',
          doctorName: doctorName || 'N/A',
          appointmentTimeString: timeString,
          roomNumber,
          sectionName,
          status: item.status || 'NORMAL',
          notes: item.notes || '',
        };
      });

      setAppointments(rows);
      setFilteredAppointments(rows);

      const total = rows.length;
      const attended = rows.filter(a => a.status === 'ATTENDED').length;
      const inProgress = rows.filter(a => a.status === 'IN_PROGRESS').length;
      const cancelled = rows.filter(a => a.status === 'CANCELLED').length;
      setSummary({ total, attended, inProgress, cancelled });
      setStatus(`${t.status.loaded} (${total} ${t.status.appointments})`, 'success');
    } catch (err) {
      setStatus(t.status.error, 'error');
      console.error('🚨 Load error:', err);
    } finally {
      setLoading(false);
    }
  }, [t, setStatus]);

  // ---------- Apply filter ----------
  const applyFilter = useCallback((status) => {
    if (status === 'ALL') {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter(a => a.status === status));
    }
    setStatus(`${t.status.filtered}: ${status}`, 'info');
  }, [appointments, t, setStatus]);

  // ---------- Toggle view ----------
  const toggleView = useCallback(() => {
    setViewMode(prev => prev === 'table' ? 'card' : 'table');
  }, []);

  // ---------- Clock ----------
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ---------- Date change handler ----------
  const handleDateChange = (e) => {
    const newDate = new Date(e.target.value + 'T00:00:00');
    setSelectedDate(newDate);
  };

  // ---------- Initial load and auto‑refresh ----------
  useEffect(() => {
    loadAppointments(selectedDate);
    refreshInterval.current = setInterval(() => {
      loadAppointments(selectedDate);
    }, 30000);
    return () => clearInterval(refreshInterval.current);
  }, [selectedDate, loadAppointments]);

  // ---------- Helper: status CSS class for badge ----------
  const getStatusClass = (status) => {
    switch (status) {
      case 'ATTENDED': return 'attended';
      case 'IN_PROGRESS': return 'inprogress';
      case 'CLOSED': return 'closed';
      case 'CANCELLED': return 'cancelled';
      default: return 'normal';
    }
  };

  // ---------- Helper: row/card background class ----------
  const getRowStatusClass = (status) => {
    switch (status) {
      case 'ATTENDED': return 'row-attended';
      case 'IN_PROGRESS': return 'row-inprogress';
      case 'CLOSED': return 'row-closed';
      case 'CANCELLED': return 'row-cancelled';
      default: return 'row-normal';
    }
  };

  // ---------- Logout handler ----------
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/');
  };

  // ---------- Render helpers (dashboard) ----------
  const renderSummaryCards = () => {
    const cards = [
      { key: 'total', label: t.summary.total, count: summary.total, icon: '📊', cls: 'total', filter: 'ALL' },
      { key: 'attended', label: t.summary.attended, count: summary.attended, icon: '✅', cls: 'attended', filter: 'ATTENDED' },
      { key: 'inProgress', label: t.summary.inProgress, count: summary.inProgress, icon: '🔄', cls: 'inprogress', filter: 'IN_PROGRESS' },
      { key: 'cancelled', label: t.summary.cancelled, count: summary.cancelled, icon: '❌', cls: 'cancelled', filter: 'CANCELLED' },
    ];
    return (
      <div className="summary">
        {cards.map(({ key, label, count, icon, cls, filter }) => (
          <div key={key} className={`card ${cls}`} onClick={() => applyFilter(filter)}>
            <div className="top-bar"></div>
            <div className="icon">{icon}</div>
            <div className="title">{label}</div>
            <div className="value">{count}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderTable = () => (
    <table className="table-view">
      <thead>
        <tr>
          <th>{t.table.patient}</th>
          <th>{t.table.doctor}</th>
          <th>{t.table.time}</th>
          <th>{t.table.room}</th>
          <th>{t.table.section}</th>
          <th>{t.table.status}</th>
          <th>{t.table.notes}</th>
        </tr>
      </thead>
      <tbody>
        {filteredAppointments.length === 0 ? (
          <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</td></tr>
        ) : (
          filteredAppointments.map(a => (
            <tr key={a.id} className={getRowStatusClass(a.status)}>
              <td>{a.patientName}</td>
              <td>{a.doctorName}</td>
              <td>{a.appointmentTimeString}</td>
              <td>{a.roomNumber}</td>
              <td>{a.sectionName}</td>
              <td><span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span></td>
              <td>{a.notes}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const renderCardGrid = () => (
    <div className="card-grid">
      {filteredAppointments.length === 0 ? (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#95a5a6' }}>{t.table.noAppointments}</div>
      ) : (
        filteredAppointments.map(a => (
          <div key={a.id} className={`appt-card ${getRowStatusClass(a.status)}`}>
            <span className={`status-badge ${getStatusClass(a.status)}`}>{a.status}</span>
            <div className="patient">{a.patientName}</div>
            <div className="detail"><span>🩺</span> {a.doctorName}</div>
            <div className="detail"><span>⏰</span> {a.appointmentTimeString}</div>
            <div className="detail"><span>🚪</span> {a.roomNumber} | {a.sectionName}</div>
            {a.notes && <div className="detail"><span>📝</span> {a.notes}</div>}
          </div>
        ))
      )}
    </div>
  );

  // ---------- Sidebar menu items ----------
  const menuItems = [
    { icon: '🏠', label: t.sidebar.home || 'Home', action: () => setCurrentScreen('dashboard') },
    { icon: '🔍', label: t.sidebar.searchPatient, action: () => setCurrentScreen('searchPatient') },
    { icon: '📅', label: t.sidebar.appointments, action: () => setCurrentScreen('appointmentsAdmin') },
    { icon: '📝', label: t.sidebar.visitTracking, action: () => setCurrentScreen('visitTracking') },
    { icon: '📑', label: t.sidebar.claimsTracking, action: () => setCurrentScreen('claimsTracking') },
    { icon: '🩺', label: t.sidebar.manageDoctors, action: () => setCurrentScreen('doctorManagement') },
    { icon: '📊', label: t.sidebar.reports, action: () => setCurrentScreen('reports') },
    { icon: '💰', label: t.sidebar.clinicPayments, action: () => setCurrentScreen('clinicPayments') },
    { icon: '🏢', label: t.sidebar.manageSections, action: () => setCurrentScreen('manageSections') },
    { icon: '🚪', label: t.sidebar.manageRooms, action: () => setCurrentScreen('manageRooms') },
    { icon: '👤', label: t.sidebar.userManagement, action: () => setCurrentScreen('userManagement') },
    { icon: '🏥', label: t.sidebar.healthInsurance, action: () => setCurrentScreen('healthInsurance') },
    // Only show Logs for ADMIN users
    ...(isAdmin ? [{ icon: '📜', label: t.sidebar.logs, action: () => setCurrentScreen('logs') }] : []),
    { icon: 'ℹ️', label: t.sidebar.about, action: () => setCurrentScreen('about') },
  ];

  // ---------- Render coming soon placeholder ----------
  const renderComingSoon = (icon, title, subtitle) => (
    <div className="coming-soon">
      <span className="icon">{icon}</span>
      <div className="title">{title}</div>
      <div className="subtitle">{subtitle}</div>
    </div>
  );

  // ---------- JSX ----------
  return (
    <>
      <style>{styles}</style>
      <div className="app" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Top Bar */}
        <div className="topbar">
          <div className="clinic">
            <span>🏥</span>
            <span>{clinicInfo.name}</span>
          </div>
          <div className="datetime">
            <span>📅 {clinicInfo.date}</span>
            <input
              type="date"
              value={formatLocalDate(selectedDate)}
              onChange={handleDateChange}
            />
            <span>
              <span className="clock-icon">🕐</span>
              <span className="time">
                {currentTime.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            </span>
          </div>
        </div>

        <div className="flex-row flex-1 overflow-hidden">
          {/* Sidebar – always visible */}
          <div className="sidebar">
            <div className="header">
              <span className="icon">☰</span>
              <span className="title">{t.sidebar.menu}</span>
            </div>
            <div className="menu">
              {menuItems.map((item, idx) => (
                <button key={idx} onClick={item.action}>
                  <span>{item.icon}</span>
                  <span className="label">{item.label}</span>
                </button>
              ))}
            </div>
            <div className="logout">
              <button onClick={handleLogout}>
                <span>🚪</span>
                <span className="label">{t.sidebar.logout}</span>
              </button>
            </div>
          </div>

          {/* Main Content – switches between screens */}
          <div className="main">
            {currentScreen === 'dashboard' && (
              <>
                <div className="title">
                  <span>📊</span>
                  <span>{t.dashboard.title}</span>
                </div>

                {renderSummaryCards()}

                <button className="toggle-btn" onClick={toggleView}>
                  {viewMode === 'table'
                    ? `📇 ${t.dashboard.switchToCard}`
                    : `📋 ${t.dashboard.switchToTable}`}
                </button>

                <div className="content-container">
                  <div className="scrollable">
                    {viewMode === 'table' ? renderTable() : renderCardGrid()}
                  </div>
                </div>

                <div className="statusbar">
                  {loading && <div className="loading">⏳</div>}
                  <span className={`message ${statusMessage.type}`}>{statusMessage.text}</span>
                  <span className="version">v2.0.0</span>
                </div>
              </>
            )}

            {currentScreen === 'claimsTracking' && (
              <ClaimsTrackingScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'visitTracking' && (
              <VisitTrackingScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'searchPatient' && (
              <SearchPatientScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'appointmentsAdmin' && (
              <AppointmentsAdminScreen
                refreshCallback={() => {}}
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
                embedded={true}
              />
            )}

            {currentScreen === 'doctorManagement' && (
              <DoctorManagementScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'reports' && (
              <ReportsScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'clinicPayments' && (
              <ClinicPaymentReportScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'manageSections' && (
              <SectionManagementScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'manageRooms' && (
              <RoomManagementScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'userManagement' && (
              <UserManagementScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'healthInsurance' && (
              <HealthInsuranceScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'logs' && isAdmin && (
              <LogsMonitorScreen
                loggedUser={localStorage.getItem('adminToken') ? 'admin' : ''}
                lang={lang}
                onClose={() => setCurrentScreen('dashboard')}
              />
            )}

            {currentScreen === 'about' && (
              renderComingSoon('ℹ️', 'About', 'Coming Soon!')
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHomePage;

