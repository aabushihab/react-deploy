// // src/components/DoctorHomePage/DoctorHomePage.jsx
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .doctor-home {
//     display: flex;
//     flex-direction: column;
//     height: 100vh;
//     background: #f0f2f5;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     overflow: hidden;
//   }

//   /* Layout */
//   .doctor-layout {
//     display: flex;
//     flex: 1;
//     overflow: hidden;
//   }

//   /* Sidebar */
//   .doctor-sidebar {
//     background: linear-gradient(to bottom, #1a2332, #2c3e50);
//     color: #ecf0f1;
//     width: 55px;
//     min-width: 55px;
//     padding: 15px 10px;
//     transition: width 0.3s ease;
//     overflow: hidden;
//     flex-shrink: 0;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//   }

//   .doctor-sidebar:hover {
//     width: 250px;
//   }

//   .doctor-sidebar .sidebar-header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding-bottom: 15px;
//     border-bottom: 1px solid rgba(255,255,255,0.1);
//     margin-bottom: 10px;
//   }

//   .doctor-sidebar .sidebar-header .icon {
//     font-size: 24px;
//     color: white;
//   }

//   .doctor-sidebar .sidebar-header .title {
//     font-size: 16px;
//     font-weight: bold;
//     color: #ecf0f1;
//     opacity: 0;
//     transition: opacity 0.3s;
//     white-space: nowrap;
//   }

//   .doctor-sidebar:hover .sidebar-header .title {
//     opacity: 1;
//   }

//   .doctor-sidebar .sidebar-menu {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 5px;
//   }

//   .doctor-sidebar .sidebar-menu button {
//     padding: 10px 12px;
//     font-size: 14px;
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

//   .doctor-sidebar .sidebar-menu button:hover {
//     background: rgba(255,255,255,0.15);
//     border-left: 3px solid #3498db;
//   }

//   .doctor-sidebar .sidebar-menu button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }

//   .doctor-sidebar:hover .sidebar-menu button .label {
//     opacity: 1;
//   }

//   .doctor-sidebar .sidebar-logout {
//     margin-top: auto;
//     padding-top: 10px;
//     border-top: 1px solid rgba(255,255,255,0.1);
//   }

//   .doctor-sidebar .sidebar-logout button {
//     padding: 10px 12px;
//     font-size: 14px;
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

//   .doctor-sidebar .sidebar-logout button:hover {
//     background: #e74c3c;
//   }

//   .doctor-sidebar .sidebar-logout button .label {
//     opacity: 0;
//     transition: opacity 0.3s;
//   }

//   .doctor-sidebar:hover .sidebar-logout button .label {
//     opacity: 1;
//   }

//   /* Main content */
//   .doctor-main {
//     flex: 1;
//     padding: 15px;
//     overflow-y: auto;
//   }

//   /* Welcome section */
//   .doctor-welcome {
//     background: white;
//     border-radius: 15px;
//     padding: 15px 20px;
//     margin-bottom: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     flex-wrap: wrap;
//     gap: 10px;
//   }

//   .doctor-welcome .welcome-text {
//     font-size: 26px;
//     font-weight: bold;
//     background: linear-gradient(to right, #1E90FF, #00CED1);
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//   }

//   .doctor-welcome .find-box {
//     display: flex;
//     align-items: center;
//     gap: 5px;
//   }

//   .doctor-welcome .find-box input {
//     padding: 8px 15px;
//     border-radius: 20px;
//     border: 1px solid #dce4ec;
//     font-size: 13px;
//     outline: none;
//     min-width: 120px;
//   }

//   .doctor-welcome .find-box input:focus {
//     border-color: #1E90FF;
//   }

//   .doctor-welcome .find-box button {
//     padding: 8px 15px;
//     border-radius: 20px;
//     border: none;
//     background: #1E90FF;
//     color: white;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }

//   .doctor-welcome .find-box button:hover {
//     background: #4169E1;
//     transform: scale(1.05);
//   }

//   .doctor-welcome .notification-icon {
//     font-size: 24px;
//     cursor: pointer;
//     color: #FF4500;
//     transition: all 0.2s;
//   }

//   .doctor-welcome .notification-icon:hover {
//     transform: scale(1.1);
//   }

//   /* Summary cards */
//   .doctor-summary {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//     gap: 12px;
//     margin-bottom: 15px;
//   }

//   .doctor-summary .card {
//     padding: 15px;
//     border-radius: 15px;
//     color: white;
//     text-align: center;
//     box-shadow: 0 4px 15px rgba(0,0,0,0.1);
//     transition: all 0.2s;
//     cursor: pointer;
//     min-height: 80px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//   }

//   .doctor-summary .card:hover {
//     transform: scale(1.05);
//   }

//   .doctor-summary .card .value {
//     font-size: 28px;
//     font-weight: bold;
//   }

//   .doctor-summary .card .label {
//     font-size: 13px;
//     opacity: 0.9;
//   }

//   .doctor-summary .card.today { background: #1E90FF; }
//   .doctor-summary .card.all { background: #20B2AA; }
//   .doctor-summary .card.new { background: #FF9800; }
//   .doctor-summary .card.closed { background: #4CAF50; }

//   /* Performance widget */
//   .doctor-performance {
//     background: white;
//     border-radius: 15px;
//     margin-bottom: 15px;
//     border: 1px solid #e9ecef;
//     overflow: hidden;
//   }

//   .doctor-performance .header {
//     padding: 12px 15px;
//     font-weight: bold;
//     font-size: 14px;
//     background: #f8f9fa;
//     cursor: pointer;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }

//   .doctor-performance .header .arrow {
//     transition: transform 0.3s;
//   }

//   .doctor-performance .header .arrow.open {
//     transform: rotate(90deg);
//   }

//   .doctor-performance .body {
//     padding: 15px;
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//     gap: 10px;
//   }

//   .doctor-performance .body .item {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }

//   .doctor-performance .body .item .icon {
//     font-size: 20px;
//   }

//   .doctor-performance .body .item .info .label {
//     font-size: 12px;
//     color: #7f8c8d;
//   }

//   .doctor-performance .body .item .info .value {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2c3e50;
//   }

//   /* Filters */
//   .doctor-filters {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//     margin-bottom: 15px;
//     flex-wrap: wrap;
//   }

//   .doctor-filters .filter-btn {
//     padding: 6px 18px;
//     border-radius: 20px;
//     border: none;
//     font-size: 13px;
//     cursor: pointer;
//     transition: all 0.2s;
//     background: #f0f0f0;
//     color: #555;
//     font-weight: normal;
//   }

//   .doctor-filters .filter-btn.active {
//     background: linear-gradient(to right, #1E90FF, #4169E1);
//     color: white;
//     font-weight: bold;
//     box-shadow: 0 4px 10px rgba(30,144,255,0.3);
//   }

//   .doctor-filters .filter-btn:hover:not(.active) {
//     background: #e0e0e0;
//   }

//   .doctor-filters .search-field {
//     padding: 6px 15px;
//     border-radius: 20px;
//     border: 1px solid #dce4ec;
//     font-size: 13px;
//     outline: none;
//     flex: 1;
//     min-width: 120px;
//   }

//   .doctor-filters .search-field:focus {
//     border-color: #1E90FF;
//   }

//   .doctor-filters .icon-btn {
//     padding: 6px 12px;
//     border-radius: 20px;
//     border: none;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//     cursor: pointer;
//     transition: all 0.2s;
//     background: #6c757d;
//   }

//   .doctor-filters .icon-btn:hover {
//     transform: scale(1.05);
//   }

//   .doctor-filters .icon-btn.sort { background: #6c757d; }
//   .doctor-filters .icon-btn.layout { background: #17a2b8; }
//   .doctor-filters .icon-btn.refresh { background: #28a745; }

//   /* Visit cards */
//   .doctor-visits {
//     display: flex;
//     flex-direction: column;
//     gap: 12px;
//   }

//   .doctor-visits .visit-card {
//     background: white;
//     border-radius: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.06);
//     border: 1px solid #e9ecef;
//     transition: all 0.2s;
//     cursor: pointer;
//     overflow: hidden;
//   }

//   .doctor-visits .visit-card:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 6px 20px rgba(0,0,0,0.1);
//   }

//   .doctor-visits .visit-card .header {
//     padding: 8px 15px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     background: #FFD700;
//   }

//   .doctor-visits .visit-card .header .id {
//     font-weight: bold;
//     color: #2c3e50;
//   }

//   .doctor-visits .visit-card .header .status {
//     padding: 2px 12px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 11px;
//     color: white;
//   }

//   .doctor-visits .visit-card .header .status.created { background: #e74c3c; }
//   .doctor-visits .visit-card .header .status.in-progress { background: #f39c12; }
//   .doctor-visits .visit-card .header .status.closed { background: #27ae60; }
//   .doctor-visits .visit-card .header .status.default { background: #3498db; }

//   .doctor-visits .visit-card .body {
//     padding: 12px 15px;
//     display: flex;
//     align-items: center;
//     gap: 15px;
//   }

//   .doctor-visits .visit-card .body .avatar {
//     width: 50px;
//     height: 50px;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 24px;
//     border: 2px solid #e9ecef;
//     background: #f8f9fa;
//   }

//   .doctor-visits .visit-card .body .info {
//     flex: 1;
//   }

//   .doctor-visits .visit-card .body .info .name {
//     font-size: 15px;
//     font-weight: bold;
//     color: #2c3e50;
//   }

//   .doctor-visits .visit-card .body .info .meta {
//     font-size: 12px;
//     color: #7f8c8d;
//   }

//   .doctor-visits .visit-card .body .actions {
//     display: flex;
//     flex-direction: column;
//     gap: 5px;
//   }

//   .doctor-visits .visit-card .body .actions button {
//     padding: 4px 12px;
//     border-radius: 20px;
//     border: none;
//     font-weight: bold;
//     font-size: 11px;
//     color: white;
//     cursor: pointer;
//     transition: all 0.2s;
//     min-width: 80px;
//   }

//   .doctor-visits .visit-card .body .actions button:hover {
//     transform: scale(1.05);
//   }

//   .doctor-visits .visit-card .body .actions .btn-open { background: #1E90FF; }
//   .doctor-visits .visit-card .body .actions .btn-open:hover { background: #4169E1; }
//   .doctor-visits .visit-card .body .actions .btn-details { background: #6c757d; }
//   .doctor-visits .visit-card .body .actions .btn-details:hover { background: #5a6268; }

//   /* Pagination */
//   .doctor-pagination {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 5px;
//     padding: 10px 0;
//     flex-wrap: wrap;
//   }

//   .doctor-pagination button {
//     padding: 4px 12px;
//     border-radius: 20px;
//     border: none;
//     background: #f0f0f0;
//     color: #555;
//     font-size: 13px;
//     cursor: pointer;
//     transition: all 0.2s;
//   }

//   .doctor-pagination button.active {
//     background: #1E90FF;
//     color: white;
//     font-weight: bold;
//   }

//   .doctor-pagination button:hover:not(:disabled) {
//     background: #e0e0e0;
//   }

//   .doctor-pagination button:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }

//   .doctor-pagination .info {
//     font-size: 13px;
//     color: #555;
//     padding: 0 10px;
//   }

//   /* Empty state */
//   .doctor-empty {
//     text-align: center;
//     padding: 50px;
//     color: #95a5a6;
//     font-size: 18px;
//   }

//   /* Loading */
//   .doctor-loading {
//     text-align: center;
//     padding: 40px;
//     color: #7f8c8d;
//   }

//   /* Modal overlay */
//   .doctor-modal-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: rgba(0,0,0,0.5);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 2000;
//   }

//   .doctor-modal {
//     background: white;
//     border-radius: 15px;
//     padding: 25px;
//     max-width: 600px;
//     width: 95%;
//     max-height: 90vh;
//     overflow-y: auto;
//     box-shadow: 0 10px 30px rgba(0,0,0,0.2);
//   }

//   .doctor-modal h2 {
//     margin-top: 0;
//     color: #2c3e50;
//   }

//   .doctor-modal .form-group {
//     margin-bottom: 15px;
//   }

//   .doctor-modal .form-group label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
//     color: #34495e;
//   }

//   .doctor-modal .form-group input {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #dce4ec;
//     font-size: 14px;
//   }

//   .doctor-modal .form-group input:focus {
//     outline: none;
//     border-color: #1E90FF;
//   }

//   .doctor-modal .modal-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }

//   .doctor-modal .modal-actions button {
//     padding: 8px 25px;
//     border-radius: 20px;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }

//   .doctor-modal .modal-actions .btn-primary {
//     background: #1E90FF;
//     color: white;
//   }

//   .doctor-modal .modal-actions .btn-primary:hover {
//     background: #4169E1;
//     transform: scale(1.05);
//   }

//   .doctor-modal .modal-actions .btn-secondary {
//     background: #e2e8f0;
//     color: #4a5568;
//   }

//   .doctor-modal .modal-actions .btn-secondary:hover {
//     background: #cbd5e0;
//     transform: scale(1.05);
//   }

//   .doctor-modal .modal-actions .btn-danger {
//     background: #e74c3c;
//     color: white;
//   }

//   .doctor-modal .modal-actions .btn-danger:hover {
//     background: #c0392b;
//     transform: scale(1.05);
//   }

//   /* Mobile responsive */
//   @media (max-width: 600px) {
//     .doctor-welcome .welcome-text {
//       font-size: 20px;
//     }
//     .doctor-summary {
//       grid-template-columns: repeat(2, 1fr);
//     }
//     .doctor-visits .visit-card .body {
//       flex-wrap: wrap;
//     }
//     .doctor-visits .visit-card .body .actions {
//       flex-direction: row;
//       width: 100%;
//     }
//   }
// `;

// // ---------- Helper functions ----------
// const formatDateTime = (iso) => {
//   if (!iso) return '-';
//   try {
//     const d = new Date(iso);
//     return d.toLocaleString('en-GB', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   } catch {
//     return '-';
//   }
// };

// const calculateAge = (dob) => {
//   if (!dob) return '-';
//   try {
//     const birth = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birth.getFullYear();
//     const m = today.getMonth() - birth.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
//       age--;
//     }
//     return age;
//   } catch {
//     return '-';
//   }
// };

// const buildFullName = (patient) => {
//   if (!patient) return '';
//   const parts = [patient.firstName, patient.middleName, patient.lastName].filter(Boolean);
//   return parts.join(' ') || 'Unknown';
// };

// // ---------- Main Component ----------
// const DoctorHomePage = ({ doctorId, username, lang = 'en', onClose }) => {
//   const navigate = useNavigate();

//   // ---------- State ----------
//   const [visits, setVisits] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortByDateAsc, setSortByDateAsc] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(false);
//   const [cardsPerRow, setCardsPerRow] = useState(2);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pageSize] = useState(20);

//   // Summary stats
//   const [summary, setSummary] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0,
//   });

//   // Performance stats
//   const [performance, setPerformance] = useState({
//     patientsSeenToday: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0,
//   });

//   // UI state
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [selectedVisit, setSelectedVisit] = useState(null);
//   const [showVisitDetails, setShowVisitDetails] = useState(false);
//   const [showPerformance, setShowPerformance] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const refreshTimer = useRef(null);
//   const notificationTimer = useRef(null);

//   // ---------- API Calls ----------
//   const loadVisits = useCallback(async (page = currentPage, filter = currentFilter) => {
//     setLoading(true);
//     try {
//       const url = `${BASE_URL}/api/visits/doctor/${doctorId}?page=${page}&size=${pageSize}`;
//       console.log('📤 Fetching visits:', url);

//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();
//       const content = data.content || [];
//       setVisits(content);
//       setTotalPages(data.totalPages || 1);
//       setCurrentPage(page);

//       // Filter and sort locally
//       applyFilters(content, filter, searchQuery);
//     } catch (err) {
//       console.error('🚨 Load visits error:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [doctorId, pageSize, searchQuery, currentFilter]);

//   const loadSummary = useCallback(async () => {
//     try {
//       const url = `${BASE_URL}/api/visits/doctor/${doctorId}/summary`;
//       console.log('📤 Fetching summary:', url);

//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       const data = await res.json();
//       setSummary({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0,
//       });
//     } catch (err) {
//       console.error('🚨 Load summary error:', err);
//     }
//   }, [doctorId]);

//   const changePassword = useCallback(async () => {
//     const { oldPassword, newPassword, confirmPassword } = passwordData;

//     if (!oldPassword || !newPassword || !confirmPassword) {
//       alert('Please fill all fields');
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       alert('New passwords do not match');
//       return;
//     }

//     try {
//       const url = `${BASE_URL}/api/doctors/change-password`;
//       console.log('📤 Changing password:', url);

//       const res = await fetch(url, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword,
//         }),
//       });

//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(errorText || `HTTP ${res.status}`);
//       }

//       alert('Password changed successfully!');
//       setShowChangePassword(false);
//       setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
//     } catch (err) {
//       console.error('🚨 Change password error:', err);
//       alert('Error changing password: ' + err.message);
//     }
//   }, [username, passwordData]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const url = `${BASE_URL}/api/visits/${visitId}/reopen`;
//       console.log('📤 Reopening visit:', url);

//       const res = await fetch(url, { method: 'PUT' });
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);

//       alert('Visit reopened successfully');
//       loadVisits();
//       loadSummary();
//     } catch (err) {
//       console.error('🚨 Reopen error:', err);
//       alert('Failed to reopen visit: ' + err.message);
//     }
//   }, [loadVisits, loadSummary]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert('Please enter a visit ID');
//       return;
//     }

//     try {
//       const url = `${BASE_URL}/api/visits/find/${visitId}`;
//       console.log('📤 Finding visit:', url);

//       const res = await fetch(url);
//       if (!res.ok) {
//         if (res.status === 404) {
//           alert(`Visit #${visitId} not found`);
//         } else {
//           throw new Error(`HTTP ${res.status}`);
//         }
//         return;
//       }

//       const data = await res.json();
//       setSelectedVisit(data);
//       setShowVisitDetails(true);
//     } catch (err) {
//       console.error('🚨 Find visit error:', err);
//       alert('Error finding visit: ' + err.message);
//     }
//   }, []);

//   // ---------- Helper functions ----------
//   const applyFilters = (data, filter, query) => {
//     let filtered = [...data];

//     // Filter by status
//     const today = new Date().toISOString().split('T')[0];
//     switch (filter) {
//       case 'TODAY':
//         filtered = filtered.filter(v => {
//           const d = v.visitDate ? v.visitDate.split('T')[0] : '';
//           return d === today;
//         });
//         break;
//       case 'NEW':
//         filtered = filtered.filter(v => v.visitStatus === 'CREATED');
//         break;
//       case 'IN_PROGRESS':
//         filtered = filtered.filter(v => v.visitStatus === 'IN_PROGRESS');
//         break;
//       case 'CLOSED':
//         filtered = filtered.filter(v => v.visitStatus === 'CLOSED');
//         break;
//       default: // ALL
//         break;
//     }

//     // Search filter
//     if (query.trim()) {
//       const q = query.toLowerCase();
//       filtered = filtered.filter(v => {
//         const patient = v.patient || {};
//         const name = buildFullName(patient).toLowerCase();
//         const phone = (patient.phone || '').toLowerCase();
//         const id = String(v.id || '');
//         return name.includes(q) || phone.includes(q) || id.includes(q);
//       });
//     }

//     // Sort by date
//     filtered.sort((a, b) => {
//       const d1 = a.visitDate || '';
//       const d2 = b.visitDate || '';
//       if (!d1 && !d2) return 0;
//       if (!d1) return 1;
//       if (!d2) return -1;
//       return sortByDateAsc
//         ? d1.localeCompare(d2)
//         : d2.localeCompare(d1);
//     });

//     setFilteredVisits(filtered);

//     // Calculate performance stats from filtered data
//     const todayStr = new Date().toISOString().split('T')[0];
//     let patientsSeenToday = 0;
//     let openVisits = 0;
//     let completedToday = 0;

//     filtered.forEach(v => {
//       const d = v.visitDate ? v.visitDate.split('T')[0] : '';
//       if (d === todayStr) {
//         patientsSeenToday++;
//         if (v.visitStatus === 'CLOSED') completedToday++;
//       }
//       if (v.visitStatus !== 'CLOSED') openVisits++;
//     });

//     setPerformance({
//       patientsSeenToday,
//       openVisits,
//       completedToday,
//       completionRate: patientsSeenToday > 0
//         ? Math.round((completedToday / patientsSeenToday) * 100)
//         : 0,
//     });

//     // Update notification count
//     const openCount = filtered.filter(v => v.visitStatus !== 'CLOSED').length;
//     setNotificationCount(openCount);
//   };

//   const handleFilterChange = (filter) => {
//     setCurrentFilter(filter);
//     setCurrentPage(0);
//     loadVisits(0, filter);
//   };

//   const handleSearchChange = (e) => {
//     const q = e.target.value;
//     setSearchQuery(q);
//     applyFilters(visits, currentFilter, q);
//   };

//   const toggleSort = () => {
//     setSortByDateAsc(!sortByDateAsc);
//     applyFilters(visits, currentFilter, searchQuery);
//   };

//   const toggleLayout = () => {
//     setIsGridLayout(!isGridLayout);
//     setCardsPerRow(prev => (prev % 3) + 1);
//   };

//   const handlePageChange = (page) => {
//     if (page >= 0 && page < totalPages) {
//       loadVisits(page);
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'CREATED': return 'created';
//       case 'IN_PROGRESS': return 'in-progress';
//       case 'CLOSED': return 'closed';
//       default: return 'default';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   };

//   // ---------- Effects ----------
//   useEffect(() => {
//     loadVisits(0, currentFilter);
//     loadSummary();

//     // Auto-refresh every 30 seconds
//     refreshTimer.current = setInterval(() => {
//       loadVisits(currentPage, currentFilter);
//       loadSummary();
//     }, 30000);

//     return () => {
//       if (refreshTimer.current) clearInterval(refreshTimer.current);
//     };
//   }, [loadVisits, loadSummary, currentFilter, currentPage]);

//   // ---------- Logout ----------
//   const handleLogout = () => {
//     localStorage.removeItem('adminToken');
//     localStorage.removeItem('userRole');
//     localStorage.removeItem('doctorId');
//     localStorage.removeItem('doctorName');
//     localStorage.removeItem('username');
//     navigate('/');
//   };

//   // ---------- Render visit card ----------
//   const renderVisitCard = (visit) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const name = buildFullName(patient);
//     const age = calculateAge(patient.dateOfBirth);
//     const phone = patient.phone || '-';
//     const visitDate = formatDateTime(visit.visitDate);
//     const visitType = visit.visitType || 'APPOINTMENT';
//     const gender = patient.gender || 'MALE';

//     return (
//       <div key={visit.id} className="visit-card">
//         <div className="header">
//           <span className="id">🆔 Visit #{visit.id}</span>
//           <span className={`status ${getStatusClass(status)}`}>
//             {status}
//           </span>
//         </div>
//         <div className="body">
//           <div className="avatar">
//             {gender.toUpperCase() === 'FEMALE' ? '👩' : '👨'}
//           </div>
//           <div className="info">
//             <div className="name">👤 {name}</div>
//             <div className="meta">
//               📞 {phone} &nbsp;|&nbsp; Age: {age}
//             </div>
//             <div className="meta">
//               📅 {visitDate} &nbsp;|&nbsp; {visitType}
//             </div>
//           </div>
//           <div className="actions">
//             <button
//               className="btn-open"
//               onClick={() => {
//                 if (status === 'CLOSED') {
//                   if (window.confirm('Reopen this visit?')) {
//                     reopenVisit(visit.id);
//                   }
//                 } else {
//                   // Open visit screen - navigate to doctor visit page
//                   alert('Opening visit: ' + visit.id);
//                 }
//               }}
//             >
//               {status === 'CLOSED' ? '↻ Reopen' : '📋 Open'}
//             </button>
//             <button
//               className="btn-details"
//               onClick={() => {
//                 setSelectedVisit(visit);
//                 setShowVisitDetails(true);
//               }}
//             >
//               ℹ️ Details
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ---------- Render visit details modal ----------
//   const renderVisitDetailsModal = () => {
//     if (!showVisitDetails || !selectedVisit) return null;

//     const visit = selectedVisit;
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';

//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal">
//           <h2>📋 Visit Details #{visit.id}</h2>
          
//           <div style={{ marginBottom: '15px' }}>
//             <strong>Patient:</strong> {buildFullName(patient)}<br />
//             <strong>Phone:</strong> {patient.phone || '-'}<br />
//             <strong>Gender:</strong> {patient.gender || '-'}<br />
//             <strong>Visit Date:</strong> {formatDateTime(visit.visitDate)}<br />
//             <strong>Status:</strong> 
//             <span style={{ 
//               display: 'inline-block',
//               padding: '2px 12px',
//               borderRadius: '12px',
//               fontWeight: 'bold',
//               fontSize: '12px',
//               color: 'white',
//               backgroundColor: getStatusColor(status),
//               marginLeft: '8px'
//             }}>
//               {status}
//             </span>
//           </div>

//           <div style={{ marginBottom: '15px' }}>
//             <h3>Medical Information</h3>
//             <p><strong>Chief Complaint:</strong> {visit.chiefComplaint || '-'}</p>
//             <p><strong>History:</strong> {visit.history || '-'}</p>
//             <p><strong>Medications:</strong> {visit.medications || '-'}</p>
//             <p><strong>Allergies:</strong> {visit.allergies || '-'}</p>
//             <p><strong>Doctor Notes:</strong> {visit.doctorNotes || '-'}</p>
//           </div>

//           <div style={{ marginBottom: '15px' }}>
//             <h3>Prescribed Drugs</h3>
//             {(visit.visitDrugs && visit.visitDrugs.length > 0) ? (
//               visit.visitDrugs.map((item, idx) => {
//                 const drug = item.drug || {};
//                 return (
//                   <div key={idx} style={{
//                     padding: '10px',
//                     marginBottom: '8px',
//                     background: '#f5f5f5',
//                     borderRadius: '8px'
//                   }}>
//                     <strong>💊 {drug.tradeName || '-'}</strong><br />
//                     Dose: {item.dose || '-'} | Frequency: {item.frequency || '-'} | Duration: {item.duration || '-'}
//                   </div>
//                 );
//               })
//             ) : (
//               <p style={{ color: '#7f8c8d', fontStyle: 'italic' }}>No drugs prescribed</p>
//             )}
//           </div>

//           <div className="modal-actions">
//             <button
//               className="btn-primary"
//               onClick={() => {
//                 if (status === 'CLOSED') {
//                   reopenVisit(visit.id);
//                 } else {
//                   alert('Opening visit: ' + visit.id);
//                 }
//                 setShowVisitDetails(false);
//               }}
//             >
//               {status === 'CLOSED' ? '↻ Reopen' : '📋 Open Visit'}
//             </button>
//             <button
//               className="btn-secondary"
//               onClick={() => setShowVisitDetails(false)}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ---------- Render change password modal ----------
//   const renderChangePasswordModal = () => {
//     if (!showChangePassword) return null;

//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal">
//           <h2>🔒 Change Password</h2>
          
//           <div className="form-group">
//             <label>Old Password</label>
//             <input
//               type="password"
//               value={passwordData.oldPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
//               placeholder="Enter old password"
//             />
//           </div>

//           <div className="form-group">
//             <label>New Password</label>
//             <input
//               type="password"
//               value={passwordData.newPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//               placeholder="Enter new password"
//             />
//           </div>

//           <div className="form-group">
//             <label>Confirm New Password</label>
//             <input
//               type="password"
//               value={passwordData.confirmPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//               placeholder="Confirm new password"
//             />
//           </div>

//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowChangePassword(false)}
//             >
//               Cancel
//             </button>
//             <button
//               className="btn-primary"
//               onClick={changePassword}
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ---------- Render ----------
//   return (
//     <>
//       <style>{styles}</style>
//       <div className="doctor-home">
//         <div className="doctor-layout">
//           {/* Sidebar */}
//           <div className="doctor-sidebar">
//             <div className="sidebar-header">
//               <span className="icon">☰</span>
//               <span className="title">Menu</span>
//             </div>
//             <div className="sidebar-menu">
//               <button onClick={() => alert('Search Patient')}>
//                 <span>🔍</span>
//                 <span className="label">Search Patient</span>
//               </button>
//               <button onClick={() => alert('Reports')}>
//                 <span>📊</span>
//                 <span className="label">Reports</span>
//               </button>
//               <button onClick={() => setShowChangePassword(true)}>
//                 <span>🔒</span>
//                 <span className="label">Change Password</span>
//               </button>
//             </div>
//             <div className="sidebar-logout">
//               <button onClick={handleLogout}>
//                 <span>🚪</span>
//                 <span className="label">Logout</span>
//               </button>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="doctor-main">
//             {/* Welcome Section */}
//             <div className="doctor-welcome">
//               <span className="welcome-text">
//                 👨‍⚕️ Welcome, {username}!
//               </span>
//               <div className="find-box">
//                 <input
//                   type="text"
//                   placeholder="Visit ID"
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter') {
//                       findVisitById(e.target.value);
//                     }
//                   }}
//                 />
//                 <button onClick={() => {
//                   const input = document.querySelector('.find-box input');
//                   findVisitById(input.value);
//                 }}>
//                   🔍
//                 </button>
//               </div>
//               <span
//                 className="notification-icon"
//                 onClick={() => setShowNotifications(!showNotifications)}
//               >
//                 🔔 {notificationCount > 0 && notificationCount}
//               </span>
//             </div>

//             {/* Summary Cards */}
//             <div className="doctor-summary">
//               <div className="card today">
//                 <div className="value">{summary.today}</div>
//                 <div className="label">Today's Visits</div>
//               </div>
//               <div className="card all">
//                 <div className="value">{summary.total}</div>
//                 <div className="label">Total Visits</div>
//               </div>
//               <div className="card new">
//                 <div className="value">{summary.open}</div>
//                 <div className="label">Open Visits</div>
//               </div>
//               <div className="card closed">
//                 <div className="value">{summary.closed}</div>
//                 <div className="label">Closed Visits</div>
//               </div>
//             </div>

//             {/* Performance Widget */}
//             <div className="doctor-performance">
//               <div className="header" onClick={() => setShowPerformance(!showPerformance)}>
//                 <span>📊 Performance</span>
//                 <span className={`arrow ${showPerformance ? 'open' : ''}`}>▶</span>
//               </div>
//               {showPerformance && (
//                 <div className="body">
//                   <div className="item">
//                     <span className="icon">👤</span>
//                     <div className="info">
//                       <div className="label">Patients Seen Today</div>
//                       <div className="value">{performance.patientsSeenToday}</div>
//                     </div>
//                   </div>
//                   <div className="item">
//                     <span className="icon">📋</span>
//                     <div className="info">
//                       <div className="label">Open Visits</div>
//                       <div className="value">{performance.openVisits}</div>
//                     </div>
//                   </div>
//                   <div className="item">
//                     <span className="icon">✅</span>
//                     <div className="info">
//                       <div className="label">Completed Today</div>
//                       <div className="value">{performance.completedToday}</div>
//                     </div>
//                   </div>
//                   <div className="item">
//                     <span className="icon">📊</span>
//                     <div className="info">
//                       <div className="label">Completion Rate</div>
//                       <div className="value">{performance.completionRate}%</div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Filters */}
//             <div className="doctor-filters">
//               <button
//                 className={`filter-btn ${currentFilter === 'TODAY' ? 'active' : ''}`}
//                 onClick={() => handleFilterChange('TODAY')}
//               >
//                 Today
//               </button>
//               <button
//                 className={`filter-btn ${currentFilter === 'ALL' ? 'active' : ''}`}
//                 onClick={() => handleFilterChange('ALL')}
//               >
//                 All
//               </button>
//               <button
//                 className={`filter-btn ${currentFilter === 'NEW' ? 'active' : ''}`}
//                 onClick={() => handleFilterChange('NEW')}
//               >
//                 New
//               </button>
//               <button
//                 className={`filter-btn ${currentFilter === 'IN_PROGRESS' ? 'active' : ''}`}
//                 onClick={() => handleFilterChange('IN_PROGRESS')}
//               >
//                 In Progress
//               </button>
//               <button
//                 className={`filter-btn ${currentFilter === 'CLOSED' ? 'active' : ''}`}
//                 onClick={() => handleFilterChange('CLOSED')}
//               >
//                 Closed
//               </button>

//               <input
//                 type="text"
//                 className="search-field"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//               />

//               <button className="icon-btn sort" onClick={toggleSort}>
//                 ↕ {sortByDateAsc ? 'Oldest' : 'Newest'}
//               </button>
//               <button className="icon-btn layout" onClick={toggleLayout}>
//                 ⊞ {isGridLayout ? `Grid ${cardsPerRow}` : 'List'}
//               </button>
//               <button
//                 className="icon-btn refresh"
//                 onClick={() => {
//                   loadVisits(currentPage, currentFilter);
//                   loadSummary();
//                 }}
//               >
//                 🔄 Refresh
//               </button>
//             </div>

//             {/* Visit Cards */}
//             {loading ? (
//               <div className="doctor-loading">⏳ Loading visits...</div>
//             ) : filteredVisits.length === 0 ? (
//               <div className="doctor-empty">📭 No visits found</div>
//             ) : (
//               <div className="doctor-visits">
//                 {filteredVisits.map(visit => renderVisitCard(visit))}
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="doctor-pagination">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 0}
//                 >
//                   ◀
//                 </button>
//                 {[...Array(Math.min(5, totalPages))].map((_, i) => {
//                   const page = i + Math.max(0, currentPage - 2);
//                   if (page >= totalPages) return null;
//                   return (
//                     <button
//                       key={page}
//                       className={page === currentPage ? 'active' : ''}
//                       onClick={() => handlePageChange(page)}
//                     >
//                       {page + 1}
//                     </button>
//                   );
//                 })}
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages - 1}
//                 >
//                   ▶
//                 </button>
//                 <span className="info">
//                   Page {currentPage + 1} of {totalPages}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Modals */}
//         {renderChangePasswordModal()}
//         {renderVisitDetailsModal()}
//       </div>
//     </>
//   );
// };

// export default DoctorHomePage; V1

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// // Hardcoded fallback translations (English)
// const DEFAULT_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info PDF',
//   'doctor.pdf.medical': 'Medical Info PDF',
//   'doctor.pdf.drugs': 'Drugs PDF',
//   'doctor.pdf.procedures': 'Procedures PDF',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report'
// };

// const DoctorHomePage = ({ doctorId, username }) => {
//   // ==================== API BASE URL ====================
//   // Use the imported BASE_URL from utils/api.js
//   const API_BASE_URL = BASE_URL;

//   // ==================== STATE ====================
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(false);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(0);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [bundle] = useState(DEFAULT_BUNDLE);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);

//   // ==================== LOCALIZATION ====================
//   const t = useCallback((key) => {
//     return bundle[key] || key;
//   }, [bundle]);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     // Ensure endpoint starts with /api
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
//     console.log('🔗 API Request:', fullUrl);
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         console.log('✅ API Response:', json);
//         return json;
//       } catch (e) {
//         console.error('❌ Failed to parse JSON:', text.substring(0, 200));
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('❌ API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

// const loadDoctorVisits = useCallback(async (filter, resetPage = true) => {
//   if (resetPage) setCurrentPage(0);

//   setCurrentFilter(filter); // keep UI state
//   setLoading(true);
//   setError(null);

//   try {
//     const page = resetPage ? 0 : currentPage;

//     const endpoint =
//       `/api/visits/doctor/${doctorId}?page=${page}&size=${PAGE_SIZE}`;

//     const data = await apiFetch(endpoint);

//     const visits = data.content || [];

//     setVisitsCache(visits);

//     updateFilterCounts(visits);
//     updatePerformanceStats(visits);

//     // 🔥 IMPORTANT: use filter argument, not state
//     filterCardsBySearch(currentSearchQuery, visits, filter);

//     if (scrollPaneRef.current) {
//       scrollPaneRef.current.scrollTop = 0;
//     }
//   } catch (err) {
//     setError(t('doctor.visit.loadError') || 'Failed to load visits');
//   } finally {
//     setLoading(false);
//   }
// }, [doctorId, currentPage, currentSearchQuery, apiFetch]);

//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       console.log('📊 Loading summary:', endpoint);
      
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('❌ Error loading summary:', error);
//       // Use cached data or defaults - keep existing stats
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       console.log('🔍 Finding visit:', endpoint);
      
//       const visit = await apiFetch(endpoint);
//       showVisitInDialog(visit);
//     } catch (error) {
//       console.error('❌ Error finding visit:', error);
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       console.log('🔄 Reopening visit:', endpoint);
      
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//     } catch (error) {
//       console.error('❌ Error reopening visit:', error);
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       console.log('🔒 Changing password');
      
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       console.error('❌ Error changing password:', error);
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

// // ==================== FILTERING ====================
// const filterCardsBySearch = useCallback(
//   (query, visits = null, filterOverride = null) => {
//     const data = visits || visitsCache;
//     const q = (query || '').toLowerCase().trim();
//     const activeFilter = filterOverride || currentFilter;

//     const todayStr = new Date().toDateString();

//     let filtered = data.filter((visit) => {
//       const patient = visit.patient || {};

//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');

//       const matchesSearch =
//         name.includes(q) ||
//         phone.includes(q) ||
//         visitId.includes(q);

//       const status = visit.visitStatus || 'CREATED';

//       const visitDateStr = visit.visitDate
//         ? new Date(visit.visitDate).toDateString()
//         : null;

//       let statusMatches = true;

//       switch (activeFilter) {
//         case 'TODAY':
//           statusMatches = visitDateStr === todayStr;
//           break;

//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;

//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;

//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;

//         case 'ALL':
//         default:
//           statusMatches = true;
//           break;
//       }

//       return matchesSearch && statusMatches;
//     });

//     // Sort
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);

//       return sortByDateAsc ? dateA - dateB : dateB - dateA;
//     });

//     setFilteredVisits(filtered);
//   },
//   [visitsCache, currentFilter, sortByDateAsc, buildFullName]
// );
//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//     filterCardsBySearch(currentSearchQuery);
//   }, [cardsPerRowIndex, cardsPerRowPattern, currentSearchQuery, filterCardsBySearch]);

//   // ==================== PAGINATION ====================
//   const goToPage = useCallback((page) => {
//     if (page >= 0 && page < totalPages) {
//       setCurrentPage(page);
//       loadDoctorVisits(currentFilter, false);
//     }
//   }, [totalPages, currentFilter, loadDoctorVisits]);

//   // ==================== VISIT DIALOG ====================
//   const showVisitInDialog = useCallback((visit) => {
//     const patient = visit.patient || {};
//     const message = `
//       📋 Visit Details #${visit.id}
//       ─────────────────────
//       👤 Patient: ${buildFullName(patient)}
//       📞 Phone: ${patient.phone || '-'}
//       ⚧ Gender: ${patient.gender || '-'}
//       📅 Date: ${formatDateTime(visit.visitDate)}
//       📌 Status: ${visit.visitStatus || 'CREATED'}
//       ─────────────────────
//       🩺 Chief Complaint: ${visit.chiefComplaint || '-'}
//       📜 History: ${visit.history || '-'}
//       💊 Medications: ${visit.medications || '-'}
//       ⚠ Allergies: ${visit.allergies || '-'}
//       📝 Doctor Notes: ${visit.doctorNotes || '-'}
//     `;
//     alert(message);
//   }, [buildFullName, formatDateTime]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

//   // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
    
//     init();
//   }, [loadSummaryCards, loadDoctorVisits]);

//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'MALE';
// const avatarPath =
//   gender === 'FEMALE'
//     ? '/female.PNG'
//     : '/male.PNG';    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//          <img
//   src={avatarPath}
//   alt="Patient avatar"
//   className="visit-avatar"
//   onError={(e) => (e.target.src = '/images/default.png')}
// />
//           <div className="visit-info">
//             <div className="visit-name">👤 {buildFullName(patient)}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => goToPage(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => goToPage(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           Page {currentPage + 1} of {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && filteredVisits.length === 0) {
//     return (
//       <div className="doctor-home loading">
//         <div className="loading-spinner">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="doctor-home error">
//         <div className="error-message">
//           <h2>⚠️ Error</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>Retry</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="doctor-home">
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={() => {
//               const id = prompt('Enter patient ID or name to search:');
//               if (id) findVisitById(id);
//             }}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert('Reports feature coming soon')}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               onChange={(e) => {
//                 setCurrentSearchQuery(e.target.value);
//                 filterCardsBySearch(e.target.value);
//               }}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 setSortByDateAsc(!sortByDateAsc);
//                 filterCardsBySearch(currentSearchQuery);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         findVisitById(id);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         findVisitById(id);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>
//     </div>
//   );
// };

// export default DoctorHomePage;  04072026 7:40 pm

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// const DEFAULT_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info PDF',
//   'doctor.pdf.medical': 'Medical Info PDF',
//   'doctor.pdf.drugs': 'Drugs PDF',
//   'doctor.pdf.procedures': 'Procedures PDF',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report'
// };

// const DoctorHomePage = ({ doctorId, username }) => {
//   // ==================== API BASE URL ====================
//   const API_BASE_URL = BASE_URL;

//   // ==================== STATE ====================
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(true);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [bundle] = useState(DEFAULT_BUNDLE);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);

//   // ==================== LOCALIZATION ====================
//   const t = useCallback((key) => {
//     return bundle[key] || key;
//   }, [bundle]);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
//     console.log('🔗 API Request:', fullUrl);
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         console.log('✅ API Response:', json);
//         return json;
//       } catch (e) {
//         console.error('❌ Failed to parse JSON:', text.substring(0, 200));
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('❌ API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

//   // ==================== FILTERING FUNCTION ====================
//   const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
//     const q = searchQuery.toLowerCase().trim();
//     const today = new Date().toDateString();
    
//     let filtered = visits.filter(visit => {
//       const patient = visit.patient || {};
//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');
      
//       const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
//       // Status filter
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
//       const isToday = visitDate && visitDate.toDateString() === today;
      
//       let statusMatches = true;
//       switch (filter) {
//         case 'TODAY':
//           statusMatches = isToday;
//           break;
//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;
//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;
//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;
//         case 'ALL':
//           statusMatches = true;
//           break;
//         default:
//           statusMatches = true;
//       }
      
//       return matchesSearch && statusMatches;
//     });
    
//     // Sort
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
//       return sortAsc ? dateA - dateB : dateB - dateA;
//     });
    
//     return filtered;
//   }, []);

//  const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {

//     console.log("loadDoctorVisits called", {
//     filter,
//     resetPage,
//     pageOverride,
//     currentPage
//   });
//     if (resetPage) {
//     setCurrentPage(0);
//   }

//   setCurrentFilter(filter);
//   setCurrentSearchQuery('');
//   setLoading(true);
//   setError(null);

//   try {
//     const page = pageOverride !== null
//       ? pageOverride
//       : (resetPage ? 0 : currentPage);

//     const endpoint = `/api/visits/doctor/${doctorId}?page=${page}&size=${PAGE_SIZE}`;

//     console.log('📋 Loading visits page:', page);

//     const data = await apiFetch(endpoint);

//     const visits = data.content || [];
//     const total = data.totalPages || 1;

//     setTotalPages(total);
//     setVisitsCache(visits);

//     updateFilterCounts(visits);
//     updatePerformanceStats(visits);

//     const filtered = filterVisits(visits, filter, '', sortByDateAsc);
//     setFilteredVisits(filtered);

//     if (scrollPaneRef.current) {
//       scrollPaneRef.current.scrollTop = 0;
//     }
//   } catch (err) {
//     setError(t('doctor.visit.loadError') || 'Failed to load visits');
//     console.error('❌ Error loading visits:', err);
//   } finally {
//     setLoading(false);
//     setIsInitialLoad(false);
//   }
// }, [doctorId, currentPage, sortByDateAsc, t, apiFetch, filterVisits]);


//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       console.log('📊 Loading summary:', endpoint);
      
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('❌ Error loading summary:', error);
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       console.log('🔍 Finding visit:', endpoint);
      
//       const visit = await apiFetch(endpoint);
//       showVisitInDialog(visit);
//     } catch (error) {
//       console.error('❌ Error finding visit:', error);
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       console.log('🔄 Reopening visit:', endpoint);
      
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//     } catch (error) {
//       console.error('❌ Error reopening visit:', error);
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       console.log('🔒 Changing password');
      
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       console.error('❌ Error changing password:', error);
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

//   // ==================== AVATAR HANDLING ====================
//   const getAvatarPath = useCallback((gender) => {
//     if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return `${process.env.PUBLIC_URL}/female.PNG`;
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return `${process.env.PUBLIC_URL}/male.PNG`;
//     }
//     return `${process.env.PUBLIC_URL}/unknown.PNG`;
//   }, []);

//   const getAvatarColor = useCallback((gender) => {
//     if (!gender) return '#95a5a6';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '#e91e63';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '#2196f3';
//     }
//     return '#95a5a6';
//   }, []);

//   const getGenderEmoji = useCallback((gender) => {
//     if (!gender) return '👤';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '♀️';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '♂️';
//     }
//     return '👤';
//   }, []);

//   // ==================== SEARCH HANDLING ====================
//   const handleSearch = useCallback((query) => {
//     setCurrentSearchQuery(query);
//     const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
//     setFilteredVisits(filtered);
//   }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//   }, [cardsPerRowIndex, cardsPerRowPattern]);

//   // ==================== PAGINATION ====================
// const goToPage = useCallback((page) => {
//   console.log("CLICK PAGE:", page);
//   console.log("Before setCurrentPage currentPage =", currentPage);

//   if (page >= 0 && page < totalPages && page !== currentPage) {
//     setCurrentPage(page);
//     loadDoctorVisits(currentFilter, false, page);
//   }
// }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

//   // ==================== VISIT DIALOG ====================
//   const showVisitInDialog = useCallback((visit) => {
//     const patient = visit.patient || {};
//     const gender = patient.gender || 'Unknown';
//     const genderEmoji = getGenderEmoji(gender);
    
//     const message = `
//       📋 Visit Details #${visit.id}
//       ─────────────────────
//       ${genderEmoji} Patient: ${buildFullName(patient)}
//       📞 Phone: ${patient.phone || '-'}
//       ⚧ Gender: ${gender}
//       📅 Date: ${formatDateTime(visit.visitDate)}
//       📌 Status: ${visit.visitStatus || 'CREATED'}
//       ─────────────────────
//       🩺 Chief Complaint: ${visit.chiefComplaint || '-'}
//       📜 History: ${visit.history || '-'}
//       💊 Medications: ${visit.medications || '-'}
//       ⚠ Allergies: ${visit.allergies || '-'}
//       📝 Doctor Notes: ${visit.doctorNotes || '-'}
//     `;
//     alert(message);
//   }, [buildFullName, formatDateTime, getGenderEmoji]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, currentFilter]);

//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== INITIALIZATION ====================
//  useEffect(() => {
//   const init = async () => {
//     await loadSummaryCards();
//     await loadDoctorVisits('TODAY', true);
//   };

//   init();
// }, []);
//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Avatar Component
//   const PatientAvatar = ({ gender, name, size = 60 }) => {
//     const avatarPath = getAvatarPath(gender);
//     const bgColor = getAvatarColor(gender);
//     const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//     const [imageError, setImageError] = useState(false);

//     return (
//       <div 
//         className="patient-avatar"
//         style={{ 
//           width: size, 
//           height: size,
//           borderRadius: '50%',
//           overflow: 'hidden',
//           flexShrink: 0,
//           border: '2px solid #e9ecef',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: bgColor,
//           color: 'white',
//           fontSize: `${size * 0.35}px`,
//           fontWeight: 'bold',
//           position: 'relative'
//         }}
//       >
//         {!imageError ? (
//           <img
//             src={avatarPath}
//             alt={`${gender || 'Unknown'} avatar`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//     );
//   };

//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//           <PatientAvatar gender={gender} name={fullName} size={60} />
//           <div className="visit-info">
//             <div className="visit-name">👤 {fullName}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => goToPage(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => goToPage(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           Page {currentPage + 1} of {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && isInitialLoad) {
//     return (
//       <div className="doctor-home loading">
//         <div className="loading-spinner">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="doctor-home error">
//         <div className="error-message">
//           <h2>⚠️ Error</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>Retry</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="doctor-home">
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={() => {
//               const id = prompt('Enter patient ID or name to search:');
//               if (id) findVisitById(id);
//             }}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert('Reports feature coming soon')}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               value={currentSearchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 const newSort = !sortByDateAsc;
//                 setSortByDateAsc(newSort);
//                 const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
//                 setFilteredVisits(filtered);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         findVisitById(id);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         findVisitById(id);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>
//     </div>
//   );
// };

// export default DoctorHomePage;   04072026  8:00

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import DoctorVisitScreen from '../DoctorHomePage/DoctorVisitScreen';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// const DEFAULT_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info PDF',
//   'doctor.pdf.medical': 'Medical Info PDF',
//   'doctor.pdf.drugs': 'Drugs PDF',
//   'doctor.pdf.procedures': 'Procedures PDF',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report'
// };

// const DoctorHomePage = ({ doctorId, username }) => {
//   // ==================== API BASE URL ====================
//   const API_BASE_URL = BASE_URL;

//   // ==================== STATE ====================
//   const [showVisitPopup, setShowVisitPopup] = useState(false);
// const [popupVisit, setPopupVisit] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(true);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [bundle] = useState(DEFAULT_BUNDLE);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
  
//   // ==================== VISIT SCREEN STATE ====================
//   const [showVisitScreen, setShowVisitScreen] = useState(false);
//   const [selectedVisitId, setSelectedVisitId] = useState(null);
//   const [selectedVisitStatus, setSelectedVisitStatus] = useState('NEW');
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);

//   // ==================== LOCALIZATION ====================
//   const t = useCallback((key) => {
//     return bundle[key] || key;
//   }, [bundle]);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
//     console.log('🔗 API Request:', fullUrl);
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         console.log('✅ API Response:', json);
//         return json;
//       } catch (e) {
//         console.error('❌ Failed to parse JSON:', text.substring(0, 200));
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('❌ API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

//   // ==================== FILTERING FUNCTION ====================
//   const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
//     const q = searchQuery.toLowerCase().trim();
//     const today = new Date().toDateString();
    
//     let filtered = visits.filter(visit => {
//       const patient = visit.patient || {};
//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');
      
//       const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
//       // Status filter
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
//       const isToday = visitDate && visitDate.toDateString() === today;
      
//       let statusMatches = true;
//       switch (filter) {
//         case 'TODAY':
//           statusMatches = isToday;
//           break;
//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;
//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;
//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;
//         case 'ALL':
//           statusMatches = true;
//           break;
//         default:
//           statusMatches = true;
//       }
      
//       return matchesSearch && statusMatches;
//     });
    
//     // Sort
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
//       return sortAsc ? dateA - dateB : dateB - dateA;
//     });
    
//     return filtered;
//   }, []);

//   const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {
//     console.log("loadDoctorVisits called", {
//       filter,
//       resetPage,
//       pageOverride,
//       currentPage
//     });
    
//     if (resetPage) {
//       setCurrentPage(0);
//     }

//     setCurrentFilter(filter);
//     setCurrentSearchQuery('');
//     setLoading(true);
//     setError(null);

//     try {
//       const page = pageOverride !== null
//         ? pageOverride
//         : (resetPage ? 0 : currentPage);

//       const endpoint = `/api/visits/doctor/${doctorId}?page=${page}&size=${PAGE_SIZE}`;
//       console.log('📋 Loading visits page:', page);

//       const data = await apiFetch(endpoint);

//       const visits = data.content || [];
//       const total = data.totalPages || 1;

//       setTotalPages(total);
//       setVisitsCache(visits);

//       updateFilterCounts(visits);
//       updatePerformanceStats(visits);

//       const filtered = filterVisits(visits, filter, '', sortByDateAsc);
//       setFilteredVisits(filtered);

//       if (scrollPaneRef.current) {
//         scrollPaneRef.current.scrollTop = 0;
//       }
//     } catch (err) {
//       setError(t('doctor.visit.loadError') || 'Failed to load visits');
//       console.error('❌ Error loading visits:', err);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, [doctorId, currentPage, sortByDateAsc, t, apiFetch, filterVisits]);

//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       console.log('📊 Loading summary:', endpoint);
      
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('❌ Error loading summary:', error);
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       console.log('🔍 Finding visit:', endpoint);
      
//       const visit = await apiFetch(endpoint);
//       showVisitInDialog(visit);
//     } catch (error) {
//       console.error('❌ Error finding visit:', error);
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       console.log('🔄 Reopening visit:', endpoint);
      
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//     } catch (error) {
//       console.error('❌ Error reopening visit:', error);
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       console.log('🔒 Changing password');
      
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       console.error('❌ Error changing password:', error);
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== VISIT SCREEN HANDLING ====================
//   const openVisitScreen = useCallback((visitId, status) => {
//     setSelectedVisitId(visitId);
//     setSelectedVisitStatus(status);
//     setShowVisitScreen(true);
//   }, []);

//   const closeVisitScreen = useCallback(() => {
//     setShowVisitScreen(false);
//     setSelectedVisitId(null);
//     setSelectedVisitStatus('NEW');
//     // Refresh data when closing
//     loadDoctorVisits(currentFilter, false);
//     loadSummaryCards();
//   }, [currentFilter, loadDoctorVisits, loadSummaryCards]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

//   // ==================== AVATAR HANDLING ====================
//   const getAvatarPath = useCallback((gender) => {
//     if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return `${process.env.PUBLIC_URL}/female.PNG`;
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return `${process.env.PUBLIC_URL}/male.PNG`;
//     }
//     return `${process.env.PUBLIC_URL}/unknown.PNG`;
//   }, []);

//   const getAvatarColor = useCallback((gender) => {
//     if (!gender) return '#95a5a6';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '#e91e63';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '#2196f3';
//     }
//     return '#95a5a6';
//   }, []);

//   const getGenderEmoji = useCallback((gender) => {
//     if (!gender) return '👤';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '♀️';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '♂️';
//     }
//     return '👤';
//   }, []);

//   // ==================== SEARCH HANDLING ====================
//   const handleSearch = useCallback((query) => {
//     setCurrentSearchQuery(query);
//     const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
//     setFilteredVisits(filtered);
//   }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//   }, [cardsPerRowIndex, cardsPerRowPattern]);

//   // ==================== PAGINATION ====================
//   const goToPage = useCallback((page) => {
//     console.log("CLICK PAGE:", page);
//     console.log("Before setCurrentPage currentPage =", currentPage);

//     if (page >= 0 && page < totalPages && page !== currentPage) {
//       setCurrentPage(page);
//       loadDoctorVisits(currentFilter, false, page);
//     }
//   }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

//   // ==================== VISIT DIALOG ====================
// const showVisitInDialog = useCallback((visit) => {
//   setPopupVisit(visit);
//   setShowVisitPopup(true);
// }, []);
//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

//   // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
//     init();
//   }, []);

//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Avatar Component
//   const PatientAvatar = ({ gender, name, size = 60 }) => {
//     const avatarPath = getAvatarPath(gender);
//     const bgColor = getAvatarColor(gender);
//     const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//     const [imageError, setImageError] = useState(false);

//     return (
//       <div 
//         className="patient-avatar"
//         style={{ 
//           width: size, 
//           height: size,
//           borderRadius: '50%',
//           overflow: 'hidden',
//           flexShrink: 0,
//           border: '2px solid #e9ecef',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: bgColor,
//           color: 'white',
//           fontSize: `${size * 0.35}px`,
//           fontWeight: 'bold',
//           position: 'relative'
//         }}
//       >
//         {!imageError ? (
//           <img
//             src={avatarPath}
//             alt={`${gender || 'Unknown'} avatar`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//     );
//   };

//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//           <PatientAvatar gender={gender} name={fullName} size={60} />
//           <div className="visit-info">
//             <div className="visit-name">👤 {fullName}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => goToPage(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => goToPage(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           Page {currentPage + 1} of {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && isInitialLoad) {
//     return (
//       <div className="doctor-home loading">
//         <div className="loading-spinner">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="doctor-home error">
//         <div className="error-message">
//           <h2>⚠️ Error</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>Retry</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="doctor-home">
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={() => {
//               const id = prompt('Enter patient ID or name to search:');
//               if (id) findVisitById(id);
//             }}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert('Reports feature coming soon')}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               value={currentSearchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 const newSort = !sortByDateAsc;
//                 setSortByDateAsc(newSort);
//                 const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
//                 setFilteredVisits(filtered);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>

//       {/* ==================== VISIT SCREEN MODAL ==================== */}
//       {showVisitScreen && selectedVisitId && (
//         <div className="visit-screen-modal-overlay" onClick={closeVisitScreen}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeVisitScreen}
//             >
//               ✖
//             </button>
//             <DoctorVisitScreen
//               doctorId={doctorId}
//               visitId={selectedVisitId}
//               initialStatus={selectedVisitStatus}
//               username={username}
//               onClose={closeVisitScreen}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorHomePage;  04072026   8:25 pm

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import DoctorVisitScreen from '../DoctorHomePage/DoctorVisitScreen';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// const DEFAULT_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info PDF',
//   'doctor.pdf.medical': 'Medical Info PDF',
//   'doctor.pdf.drugs': 'Drugs PDF',
//   'doctor.pdf.procedures': 'Procedures PDF',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report'
// };

// const DoctorHomePage = ({ doctorId, username }) => {
//   // ==================== API BASE URL ====================
//   const API_BASE_URL = BASE_URL;

//   // ==================== STATE ====================
//   const [showVisitPopup, setShowVisitPopup] = useState(false);
//   const [popupVisit, setPopupVisit] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(true);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [bundle] = useState(DEFAULT_BUNDLE);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
  
//   // ==================== VISIT SCREEN STATE ====================
//   const [showVisitScreen, setShowVisitScreen] = useState(false);
//   const [selectedVisitId, setSelectedVisitId] = useState(null);
//   const [selectedVisitStatus, setSelectedVisitStatus] = useState('NEW');
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);

//   // ==================== LOCALIZATION ====================
//   const t = useCallback((key) => {
//     return bundle[key] || key;
//   }, [bundle]);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
//     console.log('🔗 API Request:', fullUrl);
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         console.log('✅ API Response:', json);
//         return json;
//       } catch (e) {
//         console.error('❌ Failed to parse JSON:', text.substring(0, 200));
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('❌ API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

//   // ==================== FILTERING FUNCTION ====================
//   const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
//     const q = searchQuery.toLowerCase().trim();
//     const today = new Date().toDateString();
    
//     let filtered = visits.filter(visit => {
//       const patient = visit.patient || {};
//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');
      
//       const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
//       // Status filter
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
//       const isToday = visitDate && visitDate.toDateString() === today;
      
//       let statusMatches = true;
//       switch (filter) {
//         case 'TODAY':
//           statusMatches = isToday;
//           break;
//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;
//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;
//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;
//         case 'ALL':
//           statusMatches = true;
//           break;
//         default:
//           statusMatches = true;
//       }
      
//       return matchesSearch && statusMatches;
//     });
    
//     // Sort
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
//       return sortAsc ? dateA - dateB : dateB - dateA;
//     });
    
//     return filtered;
//   }, []);

//   const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {
//     console.log("loadDoctorVisits called", {
//       filter,
//       resetPage,
//       pageOverride,
//       currentPage
//     });
    
//     if (resetPage) {
//       setCurrentPage(0);
//     }

//     setCurrentFilter(filter);
//     setCurrentSearchQuery('');
//     setLoading(true);
//     setError(null);

//     try {
//       const page = pageOverride !== null
//         ? pageOverride
//         : (resetPage ? 0 : currentPage);

//       const endpoint = `/api/visits/doctor/${doctorId}?page=${page}&size=${PAGE_SIZE}`;
//       console.log('📋 Loading visits page:', page);

//       const data = await apiFetch(endpoint);

//       const visits = data.content || [];
//       const total = data.totalPages || 1;

//       setTotalPages(total);
//       setVisitsCache(visits);

//       updateFilterCounts(visits);
//       updatePerformanceStats(visits);

//       const filtered = filterVisits(visits, filter, '', sortByDateAsc);
//       setFilteredVisits(filtered);

//       if (scrollPaneRef.current) {
//         scrollPaneRef.current.scrollTop = 0;
//       }
//     } catch (err) {
//       setError(t('doctor.visit.loadError') || 'Failed to load visits');
//       console.error('❌ Error loading visits:', err);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, [doctorId, currentPage, sortByDateAsc, t, apiFetch, filterVisits]);

//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       console.log('📊 Loading summary:', endpoint);
      
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('❌ Error loading summary:', error);
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       console.log('🔍 Finding visit:', endpoint);
      
//       const visit = await apiFetch(endpoint);
//       // Show visit in popup instead of alert
//       setPopupVisit(visit);
//       setShowVisitPopup(true);
//     } catch (error) {
//       console.error('❌ Error finding visit:', error);
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       console.log('🔄 Reopening visit:', endpoint);
      
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//       // Close popup after reopen
//       setShowVisitPopup(false);
//       setPopupVisit(null);
//     } catch (error) {
//       console.error('❌ Error reopening visit:', error);
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       console.log('🔒 Changing password');
      
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       console.error('❌ Error changing password:', error);
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== VISIT SCREEN HANDLING ====================
//   const openVisitScreen = useCallback((visitId, status) => {
//     setSelectedVisitId(visitId);
//     setSelectedVisitStatus(status);
//     setShowVisitScreen(true);
//     // Close popup when opening full screen
//     setShowVisitPopup(false);
//     setPopupVisit(null);
//   }, []);

//   const closeVisitScreen = useCallback(() => {
//     setShowVisitScreen(false);
//     setSelectedVisitId(null);
//     setSelectedVisitStatus('NEW');
//     // Refresh data when closing
//     loadDoctorVisits(currentFilter, false);
//     loadSummaryCards();
//   }, [currentFilter, loadDoctorVisits, loadSummaryCards]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
//     if (!iso) return '-';
//     try {
//       const date = new Date(iso);
//       return date.toLocaleString('en-GB', {
//         day: '2-digit',
//         month: '2-digit',
//         year: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

//   // ==================== AVATAR HANDLING ====================
//   const getAvatarPath = useCallback((gender) => {
//     if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return `${process.env.PUBLIC_URL}/female.PNG`;
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return `${process.env.PUBLIC_URL}/male.PNG`;
//     }
//     return `${process.env.PUBLIC_URL}/unknown.PNG`;
//   }, []);

//   const getAvatarColor = useCallback((gender) => {
//     if (!gender) return '#95a5a6';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '#e91e63';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '#2196f3';
//     }
//     return '#95a5a6';
//   }, []);

//   const getGenderEmoji = useCallback((gender) => {
//     if (!gender) return '👤';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '♀️';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '♂️';
//     }
//     return '👤';
//   }, []);

//   // ==================== SEARCH HANDLING ====================
//   const handleSearch = useCallback((query) => {
//     setCurrentSearchQuery(query);
//     const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
//     setFilteredVisits(filtered);
//   }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//   }, [cardsPerRowIndex, cardsPerRowPattern]);

//   // ==================== PAGINATION ====================
//   const goToPage = useCallback((page) => {
//     console.log("CLICK PAGE:", page);
//     console.log("Before setCurrentPage currentPage =", currentPage);

//     if (page >= 0 && page < totalPages && page !== currentPage) {
//       setCurrentPage(page);
//       loadDoctorVisits(currentFilter, false, page);
//     }
//   }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

//   // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
//     init();
//   }, []);

//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Avatar Component
//   const PatientAvatar = ({ gender, name, size = 60 }) => {
//     const avatarPath = getAvatarPath(gender);
//     const bgColor = getAvatarColor(gender);
//     const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//     const [imageError, setImageError] = useState(false);

//     return (
//       <div 
//         className="patient-avatar"
//         style={{ 
//           width: size, 
//           height: size,
//           borderRadius: '50%',
//           overflow: 'hidden',
//           flexShrink: 0,
//           border: '2px solid #e9ecef',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: bgColor,
//           color: 'white',
//           fontSize: `${size * 0.35}px`,
//           fontWeight: 'bold',
//           position: 'relative'
//         }}
//       >
//         {!imageError ? (
//           <img
//             src={avatarPath}
//             alt={`${gender || 'Unknown'} avatar`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//     );
//   };

//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//           <PatientAvatar gender={gender} name={fullName} size={60} />
//           <div className="visit-info">
//             <div className="visit-name">👤 {fullName}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== VISIT POPUP COMPONENT ====================
//   const VisitPopup = ({ visit, onClose, onOpen, onDetails }) => {
//     if (!visit) return null;
    
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-popup-overlay" onClick={onClose}>
//         <div className="visit-popup-content" onClick={(e) => e.stopPropagation()}>
//           <button className="visit-popup-close" onClick={onClose}>✖</button>
//           <h2 className="visit-popup-title">📋 Visit Details</h2>
          
//           <div className="visit-popup-card" style={{ backgroundColor: bgColor }}>
//             <div className="visit-card-header">
//               <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//               <span className="visit-header-spacer" />
//               <StatusBadge status={status} />
//             </div>
//             <div className="visit-card-body">
//               <PatientAvatar gender={gender} name={fullName} size={60} />
//               <div className="visit-info">
//                 <div className="visit-name">👤 {fullName}</div>
//                 <div className="visit-details">
//                   📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//                 </div>
//                 <div className="visit-details">
//                   📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//                 </div>
//                 <div className="visit-details" style={{ marginTop: '8px' }}>
//                   <strong>{t('doctor.details.medicalInfo')}:</strong><br />
//                   🩺 {t('doctor.details.chiefComplaint')}: {visit.chiefComplaint || '-'}<br />
//                   📜 {t('doctor.details.history')}: {visit.history || '-'}<br />
//                   💊 {t('doctor.details.medications')}: {visit.medications || '-'}<br />
//                   ⚠ {t('doctor.details.allergies')}: {visit.allergies || '-'}<br />
//                   📝 {t('doctor.details.notes')}: {visit.doctorNotes || '-'}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="visit-popup-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//             <button className="btn-close-popup" onClick={onClose}>
//               {t('doctor.dialog.close')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => goToPage(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => goToPage(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           Page {currentPage + 1} of {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && isInitialLoad) {
//     return (
//       <div className="doctor-home loading">
//         <div className="loading-spinner">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="doctor-home error">
//         <div className="error-message">
//           <h2>⚠️ Error</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>Retry</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="doctor-home">
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={() => {
//               const id = prompt('Enter patient ID or name to search:');
//               if (id) findVisitById(id);
//             }}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert('Reports feature coming soon')}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               value={currentSearchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 const newSort = !sortByDateAsc;
//                 setSortByDateAsc(newSort);
//                 const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
//                 setFilteredVisits(filtered);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>

//       {/* ==================== VISIT POPUP ==================== */}
//       {showVisitPopup && popupVisit && (
//         <VisitPopup
//           visit={popupVisit}
//           onClose={() => {
//             setShowVisitPopup(false);
//             setPopupVisit(null);
//           }}
//           onOpen={(id, status) => {
//             if (status === 'CLOSED') {
//               reopenVisit(id);
//             } else {
//               openVisitScreen(id, status);
//             }
//           }}
//           onDetails={(id) => {
//             // Close popup and open full details
//             setShowVisitPopup(false);
//             findVisitById(id);
//           }}
//         />
//       )}

//       {/* ==================== VISIT SCREEN MODAL ==================== */}
//       {showVisitScreen && selectedVisitId && (
//         <div className="visit-screen-modal-overlay" onClick={closeVisitScreen}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeVisitScreen}
//             >
//               ✖
//             </button>
//             <DoctorVisitScreen
//               doctorId={doctorId}
//               visitId={selectedVisitId}
//               initialStatus={selectedVisitStatus}
//               username={username}
//               onClose={closeVisitScreen}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorHomePage;  04072026 8:45 pm

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import DoctorVisitScreen from '../DoctorHomePage/DoctorVisitScreen';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// // English translations
// const EN_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.details.chiefComplaint': 'Chief Complaint',
//   'doctor.details.history': 'History',
//   'doctor.details.medications': 'Medications',
//   'doctor.details.allergies': 'Allergies',
//   'doctor.details.notes': 'Doctor Notes',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info PDF',
//   'doctor.pdf.medical': 'Medical Info PDF',
//   'doctor.pdf.drugs': 'Drugs PDF',
//   'doctor.pdf.procedures': 'Procedures PDF',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report'
// };

// // Arabic translations
// const AR_BUNDLE = {
//   'doctor.home.title': 'لوحة تحكم الطبيب',
//   'doctor.home.welcome': 'مرحباً, {0}',
//   'doctor.sidebar.menu': 'القائمة',
//   'doctor.sidebar.searchPatient': 'بحث عن مريض',
//   'doctor.sidebar.reports': 'التقارير',
//   'doctor.sidebar.changePassword': 'تغيير كلمة المرور',
//   'doctor.sidebar.logout': 'تسجيل الخروج',
//   'doctor.sidebar.logoutConfirm': 'هل أنت متأكد من تسجيل الخروج؟',
//   'doctor.dashboard.todayVisits': 'زيارات اليوم',
//   'doctor.dashboard.totalVisits': 'إجمالي الزيارات',
//   'doctor.dashboard.newVisits': 'زيارات جديدة',
//   'doctor.dashboard.closedVisits': 'زيارات مغلقة',
//   'doctor.performance.title': '📊 نظرة عامة على الأداء',
//   'doctor.performance.patientsSeen': 'المرضى اليوم',
//   'doctor.performance.openVisits': 'زيارات مفتوحة',
//   'doctor.performance.completedToday': 'مكتمل اليوم',
//   'doctor.performance.completionRate': 'نسبة الإنجاز',
//   'doctor.filter.today': 'اليوم',
//   'doctor.filter.all': 'الكل',
//   'doctor.filter.new': 'جديد',
//   'doctor.filter.inProgress': 'قيد التنفيذ',
//   'doctor.filter.closed': 'مغلق',
//   'doctor.filter.searchPrompt': 'بحث بالاسم أو رقم الهاتف أو المعرف...',
//   'doctor.filter.sortAsc': 'ترتيب تصاعدي',
//   'doctor.filter.sortDesc': 'ترتيب تنازلي',
//   'doctor.filter.cardView1': 'عمود واحد',
//   'doctor.filter.cardView2': 'عمودان',
//   'doctor.filter.cardView3': 'ثلاثة أعمدة',
//   'doctor.filter.cardDisplay': 'تخطيط',
//   'doctor.filter.refresh': 'تحديث',
//   'doctor.filter.noResults': 'لا توجد زيارات',
//   'doctor.visit.id': 'المعرف',
//   'doctor.visit.age': 'العمر',
//   'doctor.visit.type': 'النوع',
//   'doctor.visit.open': 'فتح',
//   'doctor.visit.details': 'تفاصيل',
//   'doctor.visit.reopen': 'إعادة فتح',
//   'doctor.visit.reopened': 'تم إعادة فتح الزيارة بنجاح',
//   'doctor.visit.reopenFailed': 'فشل إعادة فتح الزيارة',
//   'doctor.visit.reopenError': 'خطأ في إعادة فتح الزيارة',
//   'doctor.visit.loadError': 'فشل تحميل الزيارات',
//   'doctor.findVisit.prompt': 'أدخل معرف الزيارة...',
//   'doctor.findVisit.notFound': 'الزيارة رقم {0} غير موجودة',
//   'doctor.findVisit.invalidAlert': 'الرجاء إدخال معرف زيارة صحيح',
//   'doctor.findVisit.emptyAlert': 'الرجاء إدخال معرف الزيارة',
//   'doctor.findVisit.errorFetch': 'خطأ في جلب الزيارة',
//   'doctor.notifications.title': 'الإشعارات',
//   'doctor.notifications.noOpen': 'لا توجد زيارات مفتوحة',
//   'doctor.notifications.openVisits': 'الزيارات المفتوحة',
//   'doctor.notifications.visitId': 'معرف الزيارة',
//   'doctor.notifications.patient': 'المريض',
//   'doctor.notifications.status': 'الحالة',
//   'doctor.password.title': 'تغيير كلمة المرور',
//   'doctor.password.old': 'كلمة المرور القديمة',
//   'doctor.password.new': 'كلمة المرور الجديدة',
//   'doctor.password.confirm': 'تأكيد كلمة المرور',
//   'doctor.password.save': 'حفظ',
//   'doctor.password.fillAll': 'الرجاء ملء جميع الحقول',
//   'doctor.password.notMatch': 'كلمات المرور غير متطابقة',
//   'doctor.password.success': 'تم تغيير كلمة المرور بنجاح',
//   'doctor.password.error': 'خطأ في تغيير كلمة المرور',
//   'doctor.details.patientInfo': 'معلومات المريض',
//   'doctor.details.medicalInfo': 'المعلومات الطبية',
//   'doctor.details.prescribedDrugs': 'الأدوية الموصوفة',
//   'doctor.details.noDrugs': 'لا توجد أدوية موصوفة',
//   'doctor.details.procedures': 'الإجراءات',
//   'doctor.details.noProcedures': 'لا توجد إجراءات',
//   'doctor.details.patient': 'المريض',
//   'doctor.details.chiefComplaint': 'الشكوى الرئيسية',
//   'doctor.details.history': 'التاريخ الطبي',
//   'doctor.details.medications': 'الأدوية',
//   'doctor.details.allergies': 'الحساسية',
//   'doctor.details.notes': 'ملاحظات الطبيب',
//   'doctor.visit.phone': 'الهاتف',
//   'doctor.visit.gender': 'الجنس',
//   'doctor.visit.visitDate': 'تاريخ الزيارة',
//   'doctor.visit.status': 'الحالة',
//   'doctor.dialog.close': 'إغلاق',
//   'doctor.pdf.patient': 'معلومات المريض PDF',
//   'doctor.pdf.medical': 'المعلومات الطبية PDF',
//   'doctor.pdf.drugs': 'الأدوية PDF',
//   'doctor.pdf.procedures': 'الإجراءات PDF',
//   'doctor.pdf.visitReport': 'تقرير الزيارة',
//   'doctor.pdf.patientLabel': 'المريض',
//   'doctor.pdf.doctorLabel': 'الطبيب',
//   'doctor.pdf.dateLabel': 'التاريخ',
//   'doctor.pdf.patientInfo': 'معلومات المريض',
//   'doctor.pdf.medicalInfo': 'المعلومات الطبية',
//   'doctor.pdf.drugsReport': 'تقرير الأدوية',
//   'doctor.pdf.proceduresReport': 'تقرير الإجراءات'
// };

// const DoctorHomePage = ({ doctorId, username, language = 'en' }) => {
//   // ==================== API BASE URL ====================
//   const API_BASE_URL = BASE_URL;

//   // ==================== STATE ====================
//   const [showVisitPopup, setShowVisitPopup] = useState(false);
//   const [popupVisit, setPopupVisit] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(true);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [locale, setLocale] = useState(language || 'en');
  
//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   const isRTL = locale === 'ar';

//   // ==================== VISIT SCREEN STATE ====================
//   const [showVisitScreen, setShowVisitScreen] = useState(false);
//   const [selectedVisitId, setSelectedVisitId] = useState(null);
//   const [selectedVisitStatus, setSelectedVisitStatus] = useState('NEW');
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
//     console.log('🔗 API Request:', fullUrl);
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         console.log('✅ API Response:', json);
//         return json;
//       } catch (e) {
//         console.error('❌ Failed to parse JSON:', text.substring(0, 200));
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('❌ API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

//   // ==================== FILTERING FUNCTION ====================
//   const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
//     const q = searchQuery.toLowerCase().trim();
//     const today = new Date().toDateString();
    
//     let filtered = visits.filter(visit => {
//       const patient = visit.patient || {};
//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');
      
//       const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
//       // Status filter
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
//       const isToday = visitDate && visitDate.toDateString() === today;
      
//       let statusMatches = true;
//       switch (filter) {
//         case 'TODAY':
//           statusMatches = isToday;
//           break;
//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;
//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;
//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;
//         case 'ALL':
//           statusMatches = true;
//           break;
//         default:
//           statusMatches = true;
//       }
      
//       return matchesSearch && statusMatches;
//     });
    
//     // Sort
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
//       return sortAsc ? dateA - dateB : dateB - dateA;
//     });
    
//     return filtered;
//   }, []);

//   const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {
//     console.log("loadDoctorVisits called", {
//       filter,
//       resetPage,
//       pageOverride,
//       currentPage
//     });
    
//     if (resetPage) {
//       setCurrentPage(0);
//     }

//     setCurrentFilter(filter);
//     setCurrentSearchQuery('');
//     setLoading(true);
//     setError(null);

//     try {
//       const page = pageOverride !== null
//         ? pageOverride
//         : (resetPage ? 0 : currentPage);

//       const endpoint = `/api/visits/doctor/${doctorId}?page=${page}&size=${PAGE_SIZE}`;
//       console.log('📋 Loading visits page:', page);

//       const data = await apiFetch(endpoint);

//       const visits = data.content || [];
//       const total = data.totalPages || 1;

//       setTotalPages(total);
//       setVisitsCache(visits);

//       updateFilterCounts(visits);
//       updatePerformanceStats(visits);

//       const filtered = filterVisits(visits, filter, '', sortByDateAsc);
//       setFilteredVisits(filtered);

//       if (scrollPaneRef.current) {
//         scrollPaneRef.current.scrollTop = 0;
//       }
//     } catch (err) {
//       setError(t('doctor.visit.loadError') || 'Failed to load visits');
//       console.error('❌ Error loading visits:', err);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, [doctorId, currentPage, sortByDateAsc, t, apiFetch, filterVisits]);

//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       console.log('📊 Loading summary:', endpoint);
      
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('❌ Error loading summary:', error);
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       console.log('🔍 Finding visit:', endpoint);
      
//       const visit = await apiFetch(endpoint);
//       // Show visit in popup instead of alert
//       setPopupVisit(visit);
//       setShowVisitPopup(true);
//     } catch (error) {
//       console.error('❌ Error finding visit:', error);
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       console.log('🔄 Reopening visit:', endpoint);
      
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//       // Close popup after reopen
//       setShowVisitPopup(false);
//       setPopupVisit(null);
//     } catch (error) {
//       console.error('❌ Error reopening visit:', error);
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       console.log('🔒 Changing password');
      
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       console.error('❌ Error changing password:', error);
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== VISIT SCREEN HANDLING ====================
//   const openVisitScreen = useCallback((visitId, status) => {
//     setSelectedVisitId(visitId);
//     setSelectedVisitStatus(status);
//     setShowVisitScreen(true);
//     // Close popup when opening full screen
//     setShowVisitPopup(false);
//     setPopupVisit(null);
//   }, []);

//   const closeVisitScreen = useCallback(() => {
//     setShowVisitScreen(false);
//     setSelectedVisitId(null);
//     setSelectedVisitStatus('NEW');
//     // Refresh data when closing
//     loadDoctorVisits(currentFilter, false);
//     loadSummaryCards();
//   }, [currentFilter, loadDoctorVisits, loadSummaryCards]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
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
//     } catch (e) {
//       return '-';
//     }
//   }, [isRTL]);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

//   // ==================== AVATAR HANDLING ====================
//   const getAvatarPath = useCallback((gender) => {
//     if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return `${process.env.PUBLIC_URL}/female.PNG`;
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return `${process.env.PUBLIC_URL}/male.PNG`;
//     }
//     return `${process.env.PUBLIC_URL}/unknown.PNG`;
//   }, []);

//   const getAvatarColor = useCallback((gender) => {
//     if (!gender) return '#95a5a6';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '#e91e63';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '#2196f3';
//     }
//     return '#95a5a6';
//   }, []);

//   const getGenderEmoji = useCallback((gender) => {
//     if (!gender) return '👤';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '♀️';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '♂️';
//     }
//     return '👤';
//   }, []);

//   // ==================== SEARCH HANDLING ====================
//   const handleSearch = useCallback((query) => {
//     setCurrentSearchQuery(query);
//     const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
//     setFilteredVisits(filtered);
//   }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//   }, [cardsPerRowIndex, cardsPerRowPattern]);

//   // ==================== PAGINATION ====================
//   const goToPage = useCallback((page) => {
//     console.log("CLICK PAGE:", page);
//     console.log("Before setCurrentPage currentPage =", currentPage);

//     if (page >= 0 && page < totalPages && page !== currentPage) {
//       setCurrentPage(page);
//       loadDoctorVisits(currentFilter, false, page);
//     }
//   }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

//   // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
//     init();
//   }, []);

//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Avatar Component
//   const PatientAvatar = ({ gender, name, size = 60 }) => {
//     const avatarPath = getAvatarPath(gender);
//     const bgColor = getAvatarColor(gender);
//     const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//     const [imageError, setImageError] = useState(false);

//     return (
//       <div 
//         className="patient-avatar"
//         style={{ 
//           width: size, 
//           height: size,
//           borderRadius: '50%',
//           overflow: 'hidden',
//           flexShrink: 0,
//           border: '2px solid #e9ecef',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: bgColor,
//           color: 'white',
//           fontSize: `${size * 0.35}px`,
//           fontWeight: 'bold',
//           position: 'relative'
//         }}
//       >
//         {!imageError ? (
//           <img
//             src={avatarPath}
//             alt={`${gender || 'Unknown'} avatar`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//     );
//   };

//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//           <PatientAvatar gender={gender} name={fullName} size={60} />
//           <div className="visit-info">
//             <div className="visit-name">👤 {fullName}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== VISIT POPUP COMPONENT ====================
//   const VisitPopup = ({ visit, onClose, onOpen, onDetails }) => {
//     if (!visit) return null;
    
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-popup-overlay" onClick={onClose}>
//         <div className="visit-popup-content" onClick={(e) => e.stopPropagation()}>
//           <button className="visit-popup-close" onClick={onClose}>✖</button>
//           <h2 className="visit-popup-title">📋 {t('doctor.visit.details')}</h2>
          
//           <div className="visit-popup-card" style={{ backgroundColor: bgColor }}>
//             <div className="visit-card-header">
//               <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//               <span className="visit-header-spacer" />
//               <StatusBadge status={status} />
//             </div>
//             <div className="visit-card-body">
//               <PatientAvatar gender={gender} name={fullName} size={60} />
//               <div className="visit-info">
//                 <div className="visit-name">👤 {fullName}</div>
//                 <div className="visit-details">
//                   📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//                 </div>
//                 <div className="visit-details">
//                   📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//                 </div>
//                 <div className="visit-details" style={{ marginTop: '8px' }}>
//                   <strong>{t('doctor.details.medicalInfo')}:</strong><br />
//                   🩺 {t('doctor.details.chiefComplaint')}: {visit.chiefComplaint || '-'}<br />
//                   📜 {t('doctor.details.history')}: {visit.history || '-'}<br />
//                   💊 {t('doctor.details.medications')}: {visit.medications || '-'}<br />
//                   ⚠ {t('doctor.details.allergies')}: {visit.allergies || '-'}<br />
//                   📝 {t('doctor.details.notes')}: {visit.doctorNotes || '-'}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="visit-popup-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//             <button className="btn-close-popup" onClick={onClose}>
//               {t('doctor.dialog.close')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => goToPage(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => goToPage(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           {t('doctor.filter.page') || 'Page'} {currentPage + 1} {t('doctor.filter.of') || 'of'} {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && isInitialLoad) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="loading-spinner">{t('doctor.loading') || 'Loading...'}</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="error-message">
//           <h2>⚠️ {t('doctor.error') || 'Error'}</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>{t('doctor.retry') || 'Retry'}</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={() => {
//               const id = prompt(t('doctor.findVisit.prompt'));
//               if (id) findVisitById(id);
//             }}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert(t('doctor.reports.comingSoon') || 'Reports feature coming soon')}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               value={currentSearchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 const newSort = !sortByDateAsc;
//                 setSortByDateAsc(newSort);
//                 const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
//                 setFilteredVisits(filtered);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>

//       {/* ==================== VISIT POPUP ==================== */}
//       {showVisitPopup && popupVisit && (
//         <VisitPopup
//           visit={popupVisit}
//           onClose={() => {
//             setShowVisitPopup(false);
//             setPopupVisit(null);
//           }}
//           onOpen={(id, status) => {
//             if (status === 'CLOSED') {
//               reopenVisit(id);
//             } else {
//               openVisitScreen(id, status);
//             }
//           }}
//           onDetails={(id) => {
//             // Close popup and open full details
//             setShowVisitPopup(false);
//             findVisitById(id);
//           }}
//         />
//       )}

//       {/* ==================== VISIT SCREEN MODAL ==================== */}
//       {showVisitScreen && selectedVisitId && (
//         <div className="visit-screen-modal-overlay" onClick={closeVisitScreen}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeVisitScreen}
//             >
//               ✖
//             </button>
//             <DoctorVisitScreen
//               doctorId={doctorId}
//               visitId={selectedVisitId}
//               initialStatus={selectedVisitStatus}
//               username={username}
//               onClose={closeVisitScreen}
//               language={locale}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };


// // export default DoctorHomePage;  04072026 9:00 pm
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import DoctorVisitScreen from '../DoctorHomePage/DoctorVisitScreen';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// // English translations
// const EN_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.details.chiefComplaint': 'Chief Complaint',
//   'doctor.details.history': 'History',
//   'doctor.details.medications': 'Medications',
//   'doctor.details.allergies': 'Allergies',
//   'doctor.details.notes': 'Doctor Notes',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info PDF',
//   'doctor.pdf.medical': 'Medical Info PDF',
//   'doctor.pdf.drugs': 'Drugs PDF',
//   'doctor.pdf.procedures': 'Procedures PDF',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report',
//   'doctor.filter.page': 'Page',
//   'doctor.filter.of': 'of',
//   'doctor.loading': 'Loading...',
//   'doctor.error': 'Error',
//   'doctor.retry': 'Retry',
//   'doctor.reports.comingSoon': 'Reports feature coming soon'
// };

// // Arabic translations
// const AR_BUNDLE = {
//   'doctor.home.title': 'لوحة تحكم الطبيب',
//   'doctor.home.welcome': 'مرحباً, {0}',
//   'doctor.sidebar.menu': 'القائمة',
//   'doctor.sidebar.searchPatient': 'بحث عن مريض',
//   'doctor.sidebar.reports': 'التقارير',
//   'doctor.sidebar.changePassword': 'تغيير كلمة المرور',
//   'doctor.sidebar.logout': 'تسجيل الخروج',
//   'doctor.sidebar.logoutConfirm': 'هل أنت متأكد من تسجيل الخروج؟',
//   'doctor.dashboard.todayVisits': 'زيارات اليوم',
//   'doctor.dashboard.totalVisits': 'إجمالي الزيارات',
//   'doctor.dashboard.newVisits': 'زيارات جديدة',
//   'doctor.dashboard.closedVisits': 'زيارات مغلقة',
//   'doctor.performance.title': '📊 نظرة عامة على الأداء',
//   'doctor.performance.patientsSeen': 'المرضى اليوم',
//   'doctor.performance.openVisits': 'زيارات مفتوحة',
//   'doctor.performance.completedToday': 'مكتمل اليوم',
//   'doctor.performance.completionRate': 'نسبة الإنجاز',
//   'doctor.filter.today': 'اليوم',
//   'doctor.filter.all': 'الكل',
//   'doctor.filter.new': 'جديد',
//   'doctor.filter.inProgress': 'قيد التنفيذ',
//   'doctor.filter.closed': 'مغلق',
//   'doctor.filter.searchPrompt': 'بحث بالاسم أو رقم الهاتف أو المعرف...',
//   'doctor.filter.sortAsc': 'ترتيب تصاعدي',
//   'doctor.filter.sortDesc': 'ترتيب تنازلي',
//   'doctor.filter.cardView1': 'عمود واحد',
//   'doctor.filter.cardView2': 'عمودان',
//   'doctor.filter.cardView3': 'ثلاثة أعمدة',
//   'doctor.filter.cardDisplay': 'تخطيط',
//   'doctor.filter.refresh': 'تحديث',
//   'doctor.filter.noResults': 'لا توجد زيارات',
//   'doctor.visit.id': 'المعرف',
//   'doctor.visit.age': 'العمر',
//   'doctor.visit.type': 'النوع',
//   'doctor.visit.open': 'فتح',
//   'doctor.visit.details': 'تفاصيل',
//   'doctor.visit.reopen': 'إعادة فتح',
//   'doctor.visit.reopened': 'تم إعادة فتح الزيارة بنجاح',
//   'doctor.visit.reopenFailed': 'فشل إعادة فتح الزيارة',
//   'doctor.visit.reopenError': 'خطأ في إعادة فتح الزيارة',
//   'doctor.visit.loadError': 'فشل تحميل الزيارات',
//   'doctor.findVisit.prompt': 'أدخل معرف الزيارة...',
//   'doctor.findVisit.notFound': 'الزيارة رقم {0} غير موجودة',
//   'doctor.findVisit.invalidAlert': 'الرجاء إدخال معرف زيارة صحيح',
//   'doctor.findVisit.emptyAlert': 'الرجاء إدخال معرف الزيارة',
//   'doctor.findVisit.errorFetch': 'خطأ في جلب الزيارة',
//   'doctor.notifications.title': 'الإشعارات',
//   'doctor.notifications.noOpen': 'لا توجد زيارات مفتوحة',
//   'doctor.notifications.openVisits': 'الزيارات المفتوحة',
//   'doctor.notifications.visitId': 'معرف الزيارة',
//   'doctor.notifications.patient': 'المريض',
//   'doctor.notifications.status': 'الحالة',
//   'doctor.password.title': 'تغيير كلمة المرور',
//   'doctor.password.old': 'كلمة المرور القديمة',
//   'doctor.password.new': 'كلمة المرور الجديدة',
//   'doctor.password.confirm': 'تأكيد كلمة المرور',
//   'doctor.password.save': 'حفظ',
//   'doctor.password.fillAll': 'الرجاء ملء جميع الحقول',
//   'doctor.password.notMatch': 'كلمات المرور غير متطابقة',
//   'doctor.password.success': 'تم تغيير كلمة المرور بنجاح',
//   'doctor.password.error': 'خطأ في تغيير كلمة المرور',
//   'doctor.details.patientInfo': 'معلومات المريض',
//   'doctor.details.medicalInfo': 'المعلومات الطبية',
//   'doctor.details.prescribedDrugs': 'الأدوية الموصوفة',
//   'doctor.details.noDrugs': 'لا توجد أدوية موصوفة',
//   'doctor.details.procedures': 'الإجراءات',
//   'doctor.details.noProcedures': 'لا توجد إجراءات',
//   'doctor.details.patient': 'المريض',
//   'doctor.details.chiefComplaint': 'الشكوى الرئيسية',
//   'doctor.details.history': 'التاريخ الطبي',
//   'doctor.details.medications': 'الأدوية',
//   'doctor.details.allergies': 'الحساسية',
//   'doctor.details.notes': 'ملاحظات الطبيب',
//   'doctor.visit.phone': 'الهاتف',
//   'doctor.visit.gender': 'الجنس',
//   'doctor.visit.visitDate': 'تاريخ الزيارة',
//   'doctor.visit.status': 'الحالة',
//   'doctor.dialog.close': 'إغلاق',
//   'doctor.pdf.patient': 'معلومات المريض PDF',
//   'doctor.pdf.medical': 'المعلومات الطبية PDF',
//   'doctor.pdf.drugs': 'الأدوية PDF',
//   'doctor.pdf.procedures': 'الإجراءات PDF',
//   'doctor.pdf.visitReport': 'تقرير الزيارة',
//   'doctor.pdf.patientLabel': 'المريض',
//   'doctor.pdf.doctorLabel': 'الطبيب',
//   'doctor.pdf.dateLabel': 'التاريخ',
//   'doctor.pdf.patientInfo': 'معلومات المريض',
//   'doctor.pdf.medicalInfo': 'المعلومات الطبية',
//   'doctor.pdf.drugsReport': 'تقرير الأدوية',
//   'doctor.pdf.proceduresReport': 'تقرير الإجراءات',
//   'doctor.filter.page': 'صفحة',
//   'doctor.filter.of': 'من',
//   'doctor.loading': 'جاري التحميل...',
//   'doctor.error': 'خطأ',
//   'doctor.retry': 'إعادة المحاولة',
//   'doctor.reports.comingSoon': 'ميزة التقارير قريباً'
// };

// const DoctorHomePage = ({ doctorId, username, language: propLanguage }) => {
//   // ==================== API BASE URL ====================
//   const API_BASE_URL = BASE_URL;

//   // ==================== GET LANGUAGE FROM LOCALSTORAGE ====================
//   const getLanguage = () => {
//     // First check if language prop is passed
//     if (propLanguage) return propLanguage;
//     // Then check localStorage
//     const storedLang = localStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     // Default to English
//     return 'en';
//   };

//   // ==================== STATE ====================
//   const [showVisitPopup, setShowVisitPopup] = useState(false);
//   const [popupVisit, setPopupVisit] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(true);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [locale, setLocale] = useState(getLanguage());
  
//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   const isRTL = locale === 'ar';

//   // ==================== VISIT SCREEN STATE ====================
//   const [showVisitScreen, setShowVisitScreen] = useState(false);
//   const [selectedVisitId, setSelectedVisitId] = useState(null);
//   const [selectedVisitStatus, setSelectedVisitStatus] = useState('NEW');
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
//     console.log('🔗 API Request:', fullUrl);
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         console.log('✅ API Response:', json);
//         return json;
//       } catch (e) {
//         console.error('❌ Failed to parse JSON:', text.substring(0, 200));
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('❌ API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

//   // ==================== FILTERING FUNCTION ====================
//   const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
//     const q = searchQuery.toLowerCase().trim();
//     const today = new Date().toDateString();
    
//     let filtered = visits.filter(visit => {
//       const patient = visit.patient || {};
//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');
      
//       const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
//       // Status filter
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
//       const isToday = visitDate && visitDate.toDateString() === today;
      
//       let statusMatches = true;
//       switch (filter) {
//         case 'TODAY':
//           statusMatches = isToday;
//           break;
//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;
//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;
//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;
//         case 'ALL':
//           statusMatches = true;
//           break;
//         default:
//           statusMatches = true;
//       }
      
//       return matchesSearch && statusMatches;
//     });
    
//     // Sort
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
//       return sortAsc ? dateA - dateB : dateB - dateA;
//     });
    
//     return filtered;
//   }, []);

//   const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {
//     console.log("loadDoctorVisits called", {
//       filter,
//       resetPage,
//       pageOverride,
//       currentPage
//     });
    
//     if (resetPage) {
//       setCurrentPage(0);
//     }

//     setCurrentFilter(filter);
//     setCurrentSearchQuery('');
//     setLoading(true);
//     setError(null);

//     try {
//       const page = pageOverride !== null
//         ? pageOverride
//         : (resetPage ? 0 : currentPage);

//       const endpoint = `/api/visits/doctor/${doctorId}?page=${page}&size=${PAGE_SIZE}`;
//       console.log('📋 Loading visits page:', page);

//       const data = await apiFetch(endpoint);

//       const visits = data.content || [];
//       const total = data.totalPages || 1;

//       setTotalPages(total);
//       setVisitsCache(visits);

//       updateFilterCounts(visits);
//       updatePerformanceStats(visits);

//       const filtered = filterVisits(visits, filter, '', sortByDateAsc);
//       setFilteredVisits(filtered);

//       if (scrollPaneRef.current) {
//         scrollPaneRef.current.scrollTop = 0;
//       }
//     } catch (err) {
//       setError(t('doctor.visit.loadError') || 'Failed to load visits');
//       console.error('❌ Error loading visits:', err);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, [doctorId, currentPage, sortByDateAsc, t, apiFetch, filterVisits]);

//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       console.log('📊 Loading summary:', endpoint);
      
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('❌ Error loading summary:', error);
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       console.log('🔍 Finding visit:', endpoint);
      
//       const visit = await apiFetch(endpoint);
//       // Show visit in popup instead of alert
//       setPopupVisit(visit);
//       setShowVisitPopup(true);
//     } catch (error) {
//       console.error('❌ Error finding visit:', error);
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       console.log('🔄 Reopening visit:', endpoint);
      
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//       // Close popup after reopen
//       setShowVisitPopup(false);
//       setPopupVisit(null);
//     } catch (error) {
//       console.error('❌ Error reopening visit:', error);
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       console.log('🔒 Changing password');
      
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       console.error('❌ Error changing password:', error);
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== VISIT SCREEN HANDLING ====================
//   const openVisitScreen = useCallback((visitId, status) => {
//     setSelectedVisitId(visitId);
//     setSelectedVisitStatus(status);
//     setShowVisitScreen(true);
//     // Close popup when opening full screen
//     setShowVisitPopup(false);
//     setPopupVisit(null);
//   }, []);

//   const closeVisitScreen = useCallback(() => {
//     setShowVisitScreen(false);
//     setSelectedVisitId(null);
//     setSelectedVisitStatus('NEW');
//     // Refresh data when closing
//     loadDoctorVisits(currentFilter, false);
//     loadSummaryCards();
//   }, [currentFilter, loadDoctorVisits, loadSummaryCards]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
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
//     } catch (e) {
//       return '-';
//     }
//   }, [isRTL]);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

//   // ==================== AVATAR HANDLING ====================
//   const getAvatarPath = useCallback((gender) => {
//     if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return `${process.env.PUBLIC_URL}/female.PNG`;
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return `${process.env.PUBLIC_URL}/male.PNG`;
//     }
//     return `${process.env.PUBLIC_URL}/unknown.PNG`;
//   }, []);

//   const getAvatarColor = useCallback((gender) => {
//     if (!gender) return '#95a5a6';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '#e91e63';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '#2196f3';
//     }
//     return '#95a5a6';
//   }, []);

//   const getGenderEmoji = useCallback((gender) => {
//     if (!gender) return '👤';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '♀️';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '♂️';
//     }
//     return '👤';
//   }, []);

//   // ==================== SEARCH HANDLING ====================
//   const handleSearch = useCallback((query) => {
//     setCurrentSearchQuery(query);
//     const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
//     setFilteredVisits(filtered);
//   }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//   }, [cardsPerRowIndex, cardsPerRowPattern]);

//   // ==================== PAGINATION ====================
//   const goToPage = useCallback((page) => {
//     console.log("CLICK PAGE:", page);
//     console.log("Before setCurrentPage currentPage =", currentPage);

//     if (page >= 0 && page < totalPages && page !== currentPage) {
//       setCurrentPage(page);
//       loadDoctorVisits(currentFilter, false, page);
//     }
//   }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

//   // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
//     init();
//   }, []);

//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Avatar Component
//   const PatientAvatar = ({ gender, name, size = 60 }) => {
//     const avatarPath = getAvatarPath(gender);
//     const bgColor = getAvatarColor(gender);
//     const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//     const [imageError, setImageError] = useState(false);

//     return (
//       <div 
//         className="patient-avatar"
//         style={{ 
//           width: size, 
//           height: size,
//           borderRadius: '50%',
//           overflow: 'hidden',
//           flexShrink: 0,
//           border: '2px solid #e9ecef',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: bgColor,
//           color: 'white',
//           fontSize: `${size * 0.35}px`,
//           fontWeight: 'bold',
//           position: 'relative'
//         }}
//       >
//         {!imageError ? (
//           <img
//             src={avatarPath}
//             alt={`${gender || 'Unknown'} avatar`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//     );
//   };

//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//           <PatientAvatar gender={gender} name={fullName} size={60} />
//           <div className="visit-info">
//             <div className="visit-name">👤 {fullName}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== VISIT POPUP COMPONENT ====================
//   const VisitPopup = ({ visit, onClose, onOpen, onDetails }) => {
//     if (!visit) return null;
    
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-popup-overlay" onClick={onClose}>
//         <div className="visit-popup-content" onClick={(e) => e.stopPropagation()}>
//           <button className="visit-popup-close" onClick={onClose}>✖</button>
//           <h2 className="visit-popup-title">📋 {t('doctor.visit.details')}</h2>
          
//           <div className="visit-popup-card" style={{ backgroundColor: bgColor }}>
//             <div className="visit-card-header">
//               <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//               <span className="visit-header-spacer" />
//               <StatusBadge status={status} />
//             </div>
//             <div className="visit-card-body">
//               <PatientAvatar gender={gender} name={fullName} size={60} />
//               <div className="visit-info">
//                 <div className="visit-name">👤 {fullName}</div>
//                 <div className="visit-details">
//                   📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//                 </div>
//                 <div className="visit-details">
//                   📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//                 </div>
//                 <div className="visit-details" style={{ marginTop: '8px' }}>
//                   <strong>{t('doctor.details.medicalInfo')}:</strong><br />
//                   🩺 {t('doctor.details.chiefComplaint')}: {visit.chiefComplaint || '-'}<br />
//                   📜 {t('doctor.details.history')}: {visit.history || '-'}<br />
//                   💊 {t('doctor.details.medications')}: {visit.medications || '-'}<br />
//                   ⚠ {t('doctor.details.allergies')}: {visit.allergies || '-'}<br />
//                   📝 {t('doctor.details.notes')}: {visit.doctorNotes || '-'}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="visit-popup-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//             <button className="btn-close-popup" onClick={onClose}>
//               {t('doctor.dialog.close')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => goToPage(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => goToPage(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           {t('doctor.filter.page') || 'Page'} {currentPage + 1} {t('doctor.filter.of') || 'of'} {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && isInitialLoad) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="loading-spinner">{t('doctor.loading') || 'Loading...'}</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="error-message">
//           <h2>⚠️ {t('doctor.error') || 'Error'}</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>{t('doctor.retry') || 'Retry'}</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={() => {
//               const id = prompt(t('doctor.findVisit.prompt'));
//               if (id) findVisitById(id);
//             }}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert(t('doctor.reports.comingSoon') || 'Reports feature coming soon')}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               value={currentSearchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 const newSort = !sortByDateAsc;
//                 setSortByDateAsc(newSort);
//                 const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
//                 setFilteredVisits(filtered);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>

//       {/* ==================== VISIT POPUP ==================== */}
//       {showVisitPopup && popupVisit && (
//         <VisitPopup
//           visit={popupVisit}
//           onClose={() => {
//             setShowVisitPopup(false);
//             setPopupVisit(null);
//           }}
//           onOpen={(id, status) => {
//             if (status === 'CLOSED') {
//               reopenVisit(id);
//             } else {
//               openVisitScreen(id, status);
//             }
//           }}
//           onDetails={(id) => {
//             // Close popup and open full details
//             setShowVisitPopup(false);
//             findVisitById(id);
//           }}
//         />
//       )}

//       {/* ==================== VISIT SCREEN MODAL ==================== */}
//       {showVisitScreen && selectedVisitId && (
//         <div className="visit-screen-modal-overlay" onClick={closeVisitScreen}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeVisitScreen}
//             >
//               ✖
//             </button>
//             <DoctorVisitScreen
//               doctorId={doctorId}
//               visitId={selectedVisitId}
//               initialStatus={selectedVisitStatus}
//               username={username}
//               onClose={closeVisitScreen}
//               language={locale}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorHomePage;   04072026  9:05

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import DoctorVisitScreen from '../DoctorHomePage/DoctorVisitScreen';
// import DoctorSearchPatientScreen from '../DoctorHomePage/DoctorSearchPatientScreen';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// // English translations
// const EN_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.details.chiefComplaint': 'Chief Complaint',
//   'doctor.details.history': 'History',
//   'doctor.details.medications': 'Medications',
//   'doctor.details.allergies': 'Allergies',
//   'doctor.details.notes': 'Doctor Notes',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info PDF',
//   'doctor.pdf.medical': 'Medical Info PDF',
//   'doctor.pdf.drugs': 'Drugs PDF',
//   'doctor.pdf.procedures': 'Procedures PDF',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report',
//   'doctor.filter.page': 'Page',
//   'doctor.filter.of': 'of',
//   'doctor.loading': 'Loading...',
//   'doctor.error': 'Error',
//   'doctor.retry': 'Retry',
//   'doctor.reports.comingSoon': 'Reports feature coming soon'
// };

// // Arabic translations
// const AR_BUNDLE = {
//   'doctor.home.title': 'لوحة تحكم الطبيب',
//   'doctor.home.welcome': 'مرحباً, {0}',
//   'doctor.sidebar.menu': 'القائمة',
//   'doctor.sidebar.searchPatient': 'بحث عن مريض',
//   'doctor.sidebar.reports': 'التقارير',
//   'doctor.sidebar.changePassword': 'تغيير كلمة المرور',
//   'doctor.sidebar.logout': 'تسجيل الخروج',
//   'doctor.sidebar.logoutConfirm': 'هل أنت متأكد من تسجيل الخروج؟',
//   'doctor.dashboard.todayVisits': 'زيارات اليوم',
//   'doctor.dashboard.totalVisits': 'إجمالي الزيارات',
//   'doctor.dashboard.newVisits': 'زيارات جديدة',
//   'doctor.dashboard.closedVisits': 'زيارات مغلقة',
//   'doctor.performance.title': '📊 نظرة عامة على الأداء',
//   'doctor.performance.patientsSeen': 'المرضى اليوم',
//   'doctor.performance.openVisits': 'زيارات مفتوحة',
//   'doctor.performance.completedToday': 'مكتمل اليوم',
//   'doctor.performance.completionRate': 'نسبة الإنجاز',
//   'doctor.filter.today': 'اليوم',
//   'doctor.filter.all': 'الكل',
//   'doctor.filter.new': 'جديد',
//   'doctor.filter.inProgress': 'قيد التنفيذ',
//   'doctor.filter.closed': 'مغلق',
//   'doctor.filter.searchPrompt': 'بحث بالاسم أو رقم الهاتف أو المعرف...',
//   'doctor.filter.sortAsc': 'ترتيب تصاعدي',
//   'doctor.filter.sortDesc': 'ترتيب تنازلي',
//   'doctor.filter.cardView1': 'عمود واحد',
//   'doctor.filter.cardView2': 'عمودان',
//   'doctor.filter.cardView3': 'ثلاثة أعمدة',
//   'doctor.filter.cardDisplay': 'تخطيط',
//   'doctor.filter.refresh': 'تحديث',
//   'doctor.filter.noResults': 'لا توجد زيارات',
//   'doctor.visit.id': 'المعرف',
//   'doctor.visit.age': 'العمر',
//   'doctor.visit.type': 'النوع',
//   'doctor.visit.open': 'فتح',
//   'doctor.visit.details': 'تفاصيل',
//   'doctor.visit.reopen': 'إعادة فتح',
//   'doctor.visit.reopened': 'تم إعادة فتح الزيارة بنجاح',
//   'doctor.visit.reopenFailed': 'فشل إعادة فتح الزيارة',
//   'doctor.visit.reopenError': 'خطأ في إعادة فتح الزيارة',
//   'doctor.visit.loadError': 'فشل تحميل الزيارات',
//   'doctor.findVisit.prompt': 'أدخل معرف الزيارة...',
//   'doctor.findVisit.notFound': 'الزيارة رقم {0} غير موجودة',
//   'doctor.findVisit.invalidAlert': 'الرجاء إدخال معرف زيارة صحيح',
//   'doctor.findVisit.emptyAlert': 'الرجاء إدخال معرف الزيارة',
//   'doctor.findVisit.errorFetch': 'خطأ في جلب الزيارة',
//   'doctor.notifications.title': 'الإشعارات',
//   'doctor.notifications.noOpen': 'لا توجد زيارات مفتوحة',
//   'doctor.notifications.openVisits': 'الزيارات المفتوحة',
//   'doctor.notifications.visitId': 'معرف الزيارة',
//   'doctor.notifications.patient': 'المريض',
//   'doctor.notifications.status': 'الحالة',
//   'doctor.password.title': 'تغيير كلمة المرور',
//   'doctor.password.old': 'كلمة المرور القديمة',
//   'doctor.password.new': 'كلمة المرور الجديدة',
//   'doctor.password.confirm': 'تأكيد كلمة المرور',
//   'doctor.password.save': 'حفظ',
//   'doctor.password.fillAll': 'الرجاء ملء جميع الحقول',
//   'doctor.password.notMatch': 'كلمات المرور غير متطابقة',
//   'doctor.password.success': 'تم تغيير كلمة المرور بنجاح',
//   'doctor.password.error': 'خطأ في تغيير كلمة المرور',
//   'doctor.details.patientInfo': 'معلومات المريض',
//   'doctor.details.medicalInfo': 'المعلومات الطبية',
//   'doctor.details.prescribedDrugs': 'الأدوية الموصوفة',
//   'doctor.details.noDrugs': 'لا توجد أدوية موصوفة',
//   'doctor.details.procedures': 'الإجراءات',
//   'doctor.details.noProcedures': 'لا توجد إجراءات',
//   'doctor.details.patient': 'المريض',
//   'doctor.details.chiefComplaint': 'الشكوى الرئيسية',
//   'doctor.details.history': 'التاريخ الطبي',
//   'doctor.details.medications': 'الأدوية',
//   'doctor.details.allergies': 'الحساسية',
//   'doctor.details.notes': 'ملاحظات الطبيب',
//   'doctor.visit.phone': 'الهاتف',
//   'doctor.visit.gender': 'الجنس',
//   'doctor.visit.visitDate': 'تاريخ الزيارة',
//   'doctor.visit.status': 'الحالة',
//   'doctor.dialog.close': 'إغلاق',
//   'doctor.pdf.patient': 'معلومات المريض PDF',
//   'doctor.pdf.medical': 'المعلومات الطبية PDF',
//   'doctor.pdf.drugs': 'الأدوية PDF',
//   'doctor.pdf.procedures': 'الإجراءات PDF',
//   'doctor.pdf.visitReport': 'تقرير الزيارة',
//   'doctor.pdf.patientLabel': 'المريض',
//   'doctor.pdf.doctorLabel': 'الطبيب',
//   'doctor.pdf.dateLabel': 'التاريخ',
//   'doctor.pdf.patientInfo': 'معلومات المريض',
//   'doctor.pdf.medicalInfo': 'المعلومات الطبية',
//   'doctor.pdf.drugsReport': 'تقرير الأدوية',
//   'doctor.pdf.proceduresReport': 'تقرير الإجراءات',
//   'doctor.filter.page': 'صفحة',
//   'doctor.filter.of': 'من',
//   'doctor.loading': 'جاري التحميل...',
//   'doctor.error': 'خطأ',
//   'doctor.retry': 'إعادة المحاولة',
//   'doctor.reports.comingSoon': 'ميزة التقارير قريباً'
// };

// const DoctorHomePage = ({ doctorId, username, language: propLanguage }) => {
//   // ==================== API BASE URL ====================
//   const API_BASE_URL = BASE_URL;

//   // ==================== GET LANGUAGE FROM LOCALSTORAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = localStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== STATE ====================
//   const [showVisitPopup, setShowVisitPopup] = useState(false);
//   const [popupVisit, setPopupVisit] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(true);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [locale, setLocale] = useState(getLanguage());
  
//   // ==================== SEARCH PATIENT SCREEN STATE ====================
//   const [showSearchPatient, setShowSearchPatient] = useState(false);
  
//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   const isRTL = locale === 'ar';

//   // ==================== VISIT SCREEN STATE ====================
//   const [showVisitScreen, setShowVisitScreen] = useState(false);
//   const [selectedVisitId, setSelectedVisitId] = useState(null);
//   const [selectedVisitStatus, setSelectedVisitStatus] = useState('NEW');
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
//     console.log('🔗 API Request:', fullUrl);
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         console.log('✅ API Response:', json);
//         return json;
//       } catch (e) {
//         console.error('❌ Failed to parse JSON:', text.substring(0, 200));
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('❌ API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
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
//     } catch (e) {
//       return '-';
//     }
//   }, [isRTL]);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   // ==================== FILTERING FUNCTION ====================
//   const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
//     const q = searchQuery.toLowerCase().trim();
//     const today = new Date().toDateString();
    
//     let filtered = visits.filter(visit => {
//       const patient = visit.patient || {};
//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');
      
//       const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
//       // Status filter
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
//       const isToday = visitDate && visitDate.toDateString() === today;
      
//       let statusMatches = true;
//       switch (filter) {
//         case 'TODAY':
//           statusMatches = isToday;
//           break;
//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;
//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;
//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;
//         case 'ALL':
//           statusMatches = true;
//           break;
//         default:
//           statusMatches = true;
//       }
      
//       return matchesSearch && statusMatches;
//     });
    
//     // Sort
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
//       return sortAsc ? dateA - dateB : dateB - dateA;
//     });
    
//     return filtered;
//   }, [buildFullName]);

//   // ==================== LOAD FUNCTIONS ====================
//   const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {
//     console.log("loadDoctorVisits called", {
//       filter,
//       resetPage,
//       pageOverride,
//       currentPage
//     });
    
//     if (resetPage) {
//       setCurrentPage(0);
//     }

//     setCurrentFilter(filter);
//     setCurrentSearchQuery('');
//     setLoading(true);
//     setError(null);

//     try {
//       const pageToUse = pageOverride !== null ? pageOverride : (resetPage ? 0 : currentPage);

//       const endpoint = `/api/visits/doctor/${doctorId}?page=${pageToUse}&size=${PAGE_SIZE}`;
//       console.log('📋 Loading visits page:', pageToUse);

//       const data = await apiFetch(endpoint);

//       const visits = data.content || [];
//       const total = data.totalPages || 1;

//       setTotalPages(total);
//       setVisitsCache(visits);

//       updateFilterCounts(visits);
//       updatePerformanceStats(visits);

//       const filtered = filterVisits(visits, filter, '', sortByDateAsc);
//       setFilteredVisits(filtered);

//       if (scrollPaneRef.current) {
//         scrollPaneRef.current.scrollTop = 0;
//       }
//     } catch (err) {
//       setError(t('doctor.visit.loadError') || 'Failed to load visits');
//       console.error('❌ Error loading visits:', err);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, [doctorId, sortByDateAsc, t, apiFetch, filterVisits, updateFilterCounts, updatePerformanceStats]);

//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       console.log('📊 Loading summary:', endpoint);
      
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('❌ Error loading summary:', error);
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       console.log('🔍 Finding visit:', endpoint);
      
//       const visit = await apiFetch(endpoint);
//       setPopupVisit(visit);
//       setShowVisitPopup(true);
//     } catch (error) {
//       console.error('❌ Error finding visit:', error);
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       console.log('🔄 Reopening visit:', endpoint);
      
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//       setShowVisitPopup(false);
//       setPopupVisit(null);
//     } catch (error) {
//       console.error('❌ Error reopening visit:', error);
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       console.log('🔒 Changing password');
      
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       console.error('❌ Error changing password:', error);
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== VISIT SCREEN HANDLING ====================
//   const openVisitScreen = useCallback((visitId, status) => {
//     setSelectedVisitId(visitId);
//     setSelectedVisitStatus(status);
//     setShowVisitScreen(true);
//     setShowVisitPopup(false);
//     setPopupVisit(null);
//   }, []);

//   const closeVisitScreen = useCallback(() => {
//     setShowVisitScreen(false);
//     setSelectedVisitId(null);
//     setSelectedVisitStatus('NEW');
//     loadDoctorVisits(currentFilter, false);
//     loadSummaryCards();
//   }, [currentFilter, loadDoctorVisits, loadSummaryCards]);

//   // ==================== SEARCH PATIENT HANDLING ====================
//   const openSearchPatient = useCallback(() => {
//     setShowSearchPatient(true);
//   }, []);

//   const closeSearchPatient = useCallback(() => {
//     setShowSearchPatient(false);
//   }, []);

//   // ==================== AVATAR HANDLING ====================
//   const getAvatarPath = useCallback((gender) => {
//     if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return `${process.env.PUBLIC_URL}/female.PNG`;
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return `${process.env.PUBLIC_URL}/male.PNG`;
//     }
//     return `${process.env.PUBLIC_URL}/unknown.PNG`;
//   }, []);

//   const getAvatarColor = useCallback((gender) => {
//     if (!gender) return '#95a5a6';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '#e91e63';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '#2196f3';
//     }
//     return '#95a5a6';
//   }, []);

//   // ==================== SEARCH HANDLING ====================
//   const handleSearch = useCallback((query) => {
//     setCurrentSearchQuery(query);
//     const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
//     setFilteredVisits(filtered);
//   }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//   }, [cardsPerRowIndex, cardsPerRowPattern]);

//   // ==================== PAGINATION ====================
//   const goToPage = useCallback((page) => {
//     console.log("CLICK PAGE:", page);
//     console.log("Before setCurrentPage currentPage =", currentPage);

//     if (page >= 0 && page < totalPages && page !== currentPage) {
//       setCurrentPage(page);
//       loadDoctorVisits(currentFilter, false, page);
//     }
//   }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

//   // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
//     init();
//   }, []);

//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Avatar Component
//   const PatientAvatar = ({ gender, name, size = 60 }) => {
//     const avatarPath = getAvatarPath(gender);
//     const bgColor = getAvatarColor(gender);
//     const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//     const [imageError, setImageError] = useState(false);

//     return (
//       <div 
//         className="patient-avatar"
//         style={{ 
//           width: size, 
//           height: size,
//           borderRadius: '50%',
//           overflow: 'hidden',
//           flexShrink: 0,
//           border: '2px solid #e9ecef',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: bgColor,
//           color: 'white',
//           fontSize: `${size * 0.35}px`,
//           fontWeight: 'bold',
//           position: 'relative'
//         }}
//       >
//         {!imageError ? (
//           <img
//             src={avatarPath}
//             alt={`${gender || 'Unknown'} avatar`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//     );
//   };

//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//           <PatientAvatar gender={gender} name={fullName} size={60} />
//           <div className="visit-info">
//             <div className="visit-name">👤 {fullName}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== VISIT POPUP COMPONENT ====================
//   const VisitPopup = ({ visit, onClose, onOpen, onDetails }) => {
//     if (!visit) return null;
    
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-popup-overlay" onClick={onClose}>
//         <div className="visit-popup-content" onClick={(e) => e.stopPropagation()}>
//           <button className="visit-popup-close" onClick={onClose}>✖</button>
//           <h2 className="visit-popup-title">📋 {t('doctor.visit.details')}</h2>
          
//           <div className="visit-popup-card" style={{ backgroundColor: bgColor }}>
//             <div className="visit-card-header">
//               <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//               <span className="visit-header-spacer" />
//               <StatusBadge status={status} />
//             </div>
//             <div className="visit-card-body">
//               <PatientAvatar gender={gender} name={fullName} size={60} />
//               <div className="visit-info">
//                 <div className="visit-name">👤 {fullName}</div>
//                 <div className="visit-details">
//                   📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//                 </div>
//                 <div className="visit-details">
//                   📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//                 </div>
//                 <div className="visit-details" style={{ marginTop: '8px' }}>
//                   <strong>{t('doctor.details.medicalInfo')}:</strong><br />
//                   🩺 {t('doctor.details.chiefComplaint')}: {visit.chiefComplaint || '-'}<br />
//                   📜 {t('doctor.details.history')}: {visit.history || '-'}<br />
//                   💊 {t('doctor.details.medications')}: {visit.medications || '-'}<br />
//                   ⚠ {t('doctor.details.allergies')}: {visit.allergies || '-'}<br />
//                   📝 {t('doctor.details.notes')}: {visit.doctorNotes || '-'}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="visit-popup-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//             <button className="btn-close-popup" onClick={onClose}>
//               {t('doctor.dialog.close')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     const handlePageClick = (page) => {
//       if (page >= 0 && page < totalPages && page !== currentPage) {
//         setCurrentPage(page);
//         loadDoctorVisits(currentFilter, false, page);
//       }
//     };
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => handlePageClick(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => handlePageClick(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => handlePageClick(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => handlePageClick(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => handlePageClick(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           {t('doctor.filter.page') || 'Page'} {currentPage + 1} {t('doctor.filter.of') || 'of'} {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && isInitialLoad) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="loading-spinner">{t('doctor.loading') || 'Loading...'}</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="error-message">
//           <h2>⚠️ {t('doctor.error') || 'Error'}</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>{t('doctor.retry') || 'Retry'}</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={openSearchPatient}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert(t('doctor.reports.comingSoon') || 'Reports feature coming soon')}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               value={currentSearchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 const newSort = !sortByDateAsc;
//                 setSortByDateAsc(newSort);
//                 const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
//                 setFilteredVisits(filtered);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={findVisitById}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>

//       {/* ==================== VISIT POPUP ==================== */}
//       {showVisitPopup && popupVisit && (
//         <VisitPopup
//           visit={popupVisit}
//           onClose={() => {
//             setShowVisitPopup(false);
//             setPopupVisit(null);
//           }}
//           onOpen={(id, status) => {
//             if (status === 'CLOSED') {
//               reopenVisit(id);
//             } else {
//               openVisitScreen(id, status);
//             }
//           }}
//           onDetails={(id) => {
//             setShowVisitPopup(false);
//             findVisitById(id);
//           }}
//         />
//       )}

//       {/* ==================== VISIT SCREEN MODAL ==================== */}
//       {showVisitScreen && selectedVisitId && (
//         <div className="visit-screen-modal-overlay" onClick={closeVisitScreen}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeVisitScreen}
//             >
//               ✖
//             </button>
//             <DoctorVisitScreen
//               doctorId={doctorId}
//               visitId={selectedVisitId}
//               initialStatus={selectedVisitStatus}
//               username={username}
//               onClose={closeVisitScreen}
//               language={locale}
//             />
//           </div>
//         </div>
//       )}

//       {/* ==================== SEARCH PATIENT MODAL ==================== */}
//       {showSearchPatient && (
//         <div className="visit-screen-modal-overlay" onClick={closeSearchPatient}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeSearchPatient}
//             >
//               ✖
//             </button>
//             <DoctorSearchPatientScreen
//               loggedUser={username}
//               language={locale}
//               onClose={closeSearchPatient}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorHomePage;  04072026  11:20 pm 



// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import DoctorVisitScreen from '../DoctorHomePage/DoctorVisitScreen';
// import DoctorSearchPatientScreen from '../DoctorHomePage/DoctorSearchPatientScreen';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// // English translations
// const EN_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.details.chiefComplaint': 'Chief Complaint',
//   'doctor.details.history': 'History',
//   'doctor.details.medications': 'Medications',
//   'doctor.details.allergies': 'Allergies',
//   'doctor.details.notes': 'Doctor Notes',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info PDF',
//   'doctor.pdf.medical': 'Medical Info PDF',
//   'doctor.pdf.drugs': 'Drugs PDF',
//   'doctor.pdf.procedures': 'Procedures PDF',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report',
//   'doctor.filter.page': 'Page',
//   'doctor.filter.of': 'of',
//   'doctor.loading': 'Loading...',
//   'doctor.error': 'Error',
//   'doctor.retry': 'Retry',
//   'doctor.reports.comingSoon': 'Reports feature coming soon',
//   'doctor.details.visitReport': 'Visit Report',
//   'doctor.details.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.visitReport': 'Visit Report',
//   'doctor.details.dateLabel': 'Date',
//   'doctor.details.patientLabel': 'Patient',
//   'doctor.details.doctorLabel': 'Doctor'
// };

// // Arabic translations
// const AR_BUNDLE = {
//   'doctor.home.title': 'لوحة تحكم الطبيب',
//   'doctor.home.welcome': 'مرحباً, {0}',
//   'doctor.sidebar.menu': 'القائمة',
//   'doctor.sidebar.searchPatient': 'بحث عن مريض',
//   'doctor.sidebar.reports': 'التقارير',
//   'doctor.sidebar.changePassword': 'تغيير كلمة المرور',
//   'doctor.sidebar.logout': 'تسجيل الخروج',
//   'doctor.sidebar.logoutConfirm': 'هل أنت متأكد من تسجيل الخروج؟',
//   'doctor.dashboard.todayVisits': 'زيارات اليوم',
//   'doctor.dashboard.totalVisits': 'إجمالي الزيارات',
//   'doctor.dashboard.newVisits': 'زيارات جديدة',
//   'doctor.dashboard.closedVisits': 'زيارات مغلقة',
//   'doctor.performance.title': '📊 نظرة عامة على الأداء',
//   'doctor.performance.patientsSeen': 'المرضى اليوم',
//   'doctor.performance.openVisits': 'زيارات مفتوحة',
//   'doctor.performance.completedToday': 'مكتمل اليوم',
//   'doctor.performance.completionRate': 'نسبة الإنجاز',
//   'doctor.filter.today': 'اليوم',
//   'doctor.filter.all': 'الكل',
//   'doctor.filter.new': 'جديد',
//   'doctor.filter.inProgress': 'قيد التنفيذ',
//   'doctor.filter.closed': 'مغلق',
//   'doctor.filter.searchPrompt': 'بحث بالاسم أو رقم الهاتف أو المعرف...',
//   'doctor.filter.sortAsc': 'ترتيب تصاعدي',
//   'doctor.filter.sortDesc': 'ترتيب تنازلي',
//   'doctor.filter.cardView1': 'عمود واحد',
//   'doctor.filter.cardView2': 'عمودان',
//   'doctor.filter.cardView3': 'ثلاثة أعمدة',
//   'doctor.filter.cardDisplay': 'تخطيط',
//   'doctor.filter.refresh': 'تحديث',
//   'doctor.filter.noResults': 'لا توجد زيارات',
//   'doctor.visit.id': 'المعرف',
//   'doctor.visit.age': 'العمر',
//   'doctor.visit.type': 'النوع',
//   'doctor.visit.open': 'فتح',
//   'doctor.visit.details': 'تفاصيل',
//   'doctor.visit.reopen': 'إعادة فتح',
//   'doctor.visit.reopened': 'تم إعادة فتح الزيارة بنجاح',
//   'doctor.visit.reopenFailed': 'فشل إعادة فتح الزيارة',
//   'doctor.visit.reopenError': 'خطأ في إعادة فتح الزيارة',
//   'doctor.visit.loadError': 'فشل تحميل الزيارات',
//   'doctor.findVisit.prompt': 'أدخل معرف الزيارة...',
//   'doctor.findVisit.notFound': 'الزيارة رقم {0} غير موجودة',
//   'doctor.findVisit.invalidAlert': 'الرجاء إدخال معرف زيارة صحيح',
//   'doctor.findVisit.emptyAlert': 'الرجاء إدخال معرف الزيارة',
//   'doctor.findVisit.errorFetch': 'خطأ في جلب الزيارة',
//   'doctor.notifications.title': 'الإشعارات',
//   'doctor.notifications.noOpen': 'لا توجد زيارات مفتوحة',
//   'doctor.notifications.openVisits': 'الزيارات المفتوحة',
//   'doctor.notifications.visitId': 'معرف الزيارة',
//   'doctor.notifications.patient': 'المريض',
//   'doctor.notifications.status': 'الحالة',
//   'doctor.password.title': 'تغيير كلمة المرور',
//   'doctor.password.old': 'كلمة المرور القديمة',
//   'doctor.password.new': 'كلمة المرور الجديدة',
//   'doctor.password.confirm': 'تأكيد كلمة المرور',
//   'doctor.password.save': 'حفظ',
//   'doctor.password.fillAll': 'الرجاء ملء جميع الحقول',
//   'doctor.password.notMatch': 'كلمات المرور غير متطابقة',
//   'doctor.password.success': 'تم تغيير كلمة المرور بنجاح',
//   'doctor.password.error': 'خطأ في تغيير كلمة المرور',
//   'doctor.details.patientInfo': 'معلومات المريض',
//   'doctor.details.medicalInfo': 'المعلومات الطبية',
//   'doctor.details.prescribedDrugs': 'الأدوية الموصوفة',
//   'doctor.details.noDrugs': 'لا توجد أدوية موصوفة',
//   'doctor.details.procedures': 'الإجراءات',
//   'doctor.details.noProcedures': 'لا توجد إجراءات',
//   'doctor.details.patient': 'المريض',
//   'doctor.details.chiefComplaint': 'الشكوى الرئيسية',
//   'doctor.details.history': 'التاريخ الطبي',
//   'doctor.details.medications': 'الأدوية',
//   'doctor.details.allergies': 'الحساسية',
//   'doctor.details.notes': 'ملاحظات الطبيب',
//   'doctor.visit.phone': 'الهاتف',
//   'doctor.visit.gender': 'الجنس',
//   'doctor.visit.visitDate': 'تاريخ الزيارة',
//   'doctor.visit.status': 'الحالة',
//   'doctor.dialog.close': 'إغلاق',
//   'doctor.pdf.patient': 'معلومات المريض PDF',
//   'doctor.pdf.medical': 'المعلومات الطبية PDF',
//   'doctor.pdf.drugs': 'الأدوية PDF',
//   'doctor.pdf.procedures': 'الإجراءات PDF',
//   'doctor.pdf.visitReport': 'تقرير الزيارة',
//   'doctor.pdf.patientLabel': 'المريض',
//   'doctor.pdf.doctorLabel': 'الطبيب',
//   'doctor.pdf.dateLabel': 'التاريخ',
//   'doctor.pdf.patientInfo': 'معلومات المريض',
//   'doctor.pdf.medicalInfo': 'المعلومات الطبية',
//   'doctor.pdf.drugsReport': 'تقرير الأدوية',
//   'doctor.pdf.proceduresReport': 'تقرير الإجراءات',
//   'doctor.filter.page': 'صفحة',
//   'doctor.filter.of': 'من',
//   'doctor.loading': 'جاري التحميل...',
//   'doctor.error': 'خطأ',
//   'doctor.retry': 'إعادة المحاولة',
//   'doctor.reports.comingSoon': 'ميزة التقارير قريباً',
//   'doctor.details.visitReport': 'تقرير الزيارة',
//   'doctor.details.dateLabel': 'التاريخ',
//   'doctor.details.patientLabel': 'المريض',
//   'doctor.details.doctorLabel': 'الطبيب'
// };

// const DoctorHomePage = ({ doctorId, username, language: propLanguage }) => {
//   // ==================== API BASE URL ====================
//   const API_BASE_URL = BASE_URL;

//   // ==================== GET LANGUAGE FROM LOCALSTORAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = localStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== STATE ====================
//   const [showVisitPopup, setShowVisitPopup] = useState(false);
//   const [popupVisit, setPopupVisit] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(true);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [locale, setLocale] = useState(getLanguage());
  
//   // ==================== SEARCH PATIENT SCREEN STATE ====================
//   const [showSearchPatient, setShowSearchPatient] = useState(false);
  
//   // ==================== DETAILS MODAL STATE ====================
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [detailsVisitData, setDetailsVisitData] = useState(null);
//   const [detailsVisitDrugs, setDetailsVisitDrugs] = useState([]);
//   const [detailsVisitProcedures, setDetailsVisitProcedures] = useState([]);
//   const [loadingDetails, setLoadingDetails] = useState(false);
  
//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   const isRTL = locale === 'ar';

//   // ==================== VISIT SCREEN STATE ====================
//   const [showVisitScreen, setShowVisitScreen] = useState(false);
//   const [selectedVisitId, setSelectedVisitId] = useState(null);
//   const [selectedVisitStatus, setSelectedVisitStatus] = useState('NEW');
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         return json;
//       } catch (e) {
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
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
//     } catch (e) {
//       return '-';
//     }
//   }, [isRTL]);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

//   const mapDurationType = useCallback((type) => {
//     if (!type) return '-';
//     const map = {
//       '1': 'Hour',
//       '2': 'Day',
//       '3': 'Week',
//       '4': 'Month',
//       '5': 'Year'
//     };
//     return map[type] || '-';
//   }, []);

//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   // ==================== FILTERING FUNCTION ====================
//   const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
//     const q = searchQuery.toLowerCase().trim();
//     const today = new Date().toDateString();
    
//     let filtered = visits.filter(visit => {
//       const patient = visit.patient || {};
//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');
      
//       const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
//       const isToday = visitDate && visitDate.toDateString() === today;
      
//       let statusMatches = true;
//       switch (filter) {
//         case 'TODAY':
//           statusMatches = isToday;
//           break;
//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;
//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;
//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;
//         case 'ALL':
//           statusMatches = true;
//           break;
//         default:
//           statusMatches = true;
//       }
      
//       return matchesSearch && statusMatches;
//     });
    
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
//       return sortAsc ? dateA - dateB : dateB - dateA;
//     });
    
//     return filtered;
//   }, [buildFullName]);

//   // ==================== LOAD FUNCTIONS ====================
//   const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {
//     if (resetPage) {
//       setCurrentPage(0);
//     }

//     setCurrentFilter(filter);
//     setCurrentSearchQuery('');
//     setLoading(true);
//     setError(null);

//     try {
//       const pageToUse = pageOverride !== null ? pageOverride : (resetPage ? 0 : currentPage);
//       const endpoint = `/api/visits/doctor/${doctorId}?page=${pageToUse}&size=${PAGE_SIZE}`;

//       const data = await apiFetch(endpoint);

//       const visits = data.content || [];
//       const total = data.totalPages || 1;

//       setTotalPages(total);
//       setVisitsCache(visits);

//       updateFilterCounts(visits);
//       updatePerformanceStats(visits);

//       const filtered = filterVisits(visits, filter, '', sortByDateAsc);
//       setFilteredVisits(filtered);

//       if (scrollPaneRef.current) {
//         scrollPaneRef.current.scrollTop = 0;
//       }
//     } catch (err) {
//       setError(t('doctor.visit.loadError') || 'Failed to load visits');
//       console.error('Error loading visits:', err);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, [doctorId, sortByDateAsc, t, apiFetch, filterVisits, updateFilterCounts, updatePerformanceStats]);

//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('Error loading summary:', error);
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       const visit = await apiFetch(endpoint);
//       setPopupVisit(visit);
//       setShowVisitPopup(true);
//     } catch (error) {
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   // ==================== SHOW VISIT DETAILS (Like Java showVisitDetailsDialog) ====================
//   const showVisitDetails = useCallback(async (visitId) => {
//     setLoadingDetails(true);
//     setShowDetailsModal(true);

//     try {
//       const visitData = await apiFetch(`/api/visits/${visitId}`);
//       setDetailsVisitData(visitData);

//       try {
//         const drugsData = await apiFetch(`/api/visits/${visitId}/drugs`);
//         setDetailsVisitDrugs(Array.isArray(drugsData) ? drugsData : []);
//       } catch (error) {
//         console.error('Failed to load drugs:', error);
//         setDetailsVisitDrugs([]);
//       }

//       try {
//         const proceduresData = await apiFetch(`/api/visits/${visitId}/procedures`);
//         setDetailsVisitProcedures(Array.isArray(proceduresData) ? proceduresData : []);
//       } catch (error) {
//         console.error('Failed to load procedures:', error);
//         setDetailsVisitProcedures([]);
//       }

//     } catch (error) {
//       alert(t('doctor.visit.loadError') + ': ' + error.message);
//       setShowDetailsModal(false);
//     } finally {
//       setLoadingDetails(false);
//     }
//   }, [apiFetch, t]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//       setShowVisitPopup(false);
//       setPopupVisit(null);
//     } catch (error) {
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== VISIT SCREEN HANDLING ====================
//   const openVisitScreen = useCallback((visitId, status) => {
//     setSelectedVisitId(visitId);
//     setSelectedVisitStatus(status);
//     setShowVisitScreen(true);
//     setShowVisitPopup(false);
//     setPopupVisit(null);
//   }, []);

//   const closeVisitScreen = useCallback(() => {
//     setShowVisitScreen(false);
//     setSelectedVisitId(null);
//     setSelectedVisitStatus('NEW');
//     loadDoctorVisits(currentFilter, false);
//     loadSummaryCards();
//   }, [currentFilter, loadDoctorVisits, loadSummaryCards]);

//   // ==================== SEARCH PATIENT HANDLING ====================
//   const openSearchPatient = useCallback(() => {
//     setShowSearchPatient(true);
//   }, []);

//   const closeSearchPatient = useCallback(() => {
//     setShowSearchPatient(false);
//   }, []);

//   // ==================== AVATAR HANDLING ====================
//   const getAvatarPath = useCallback((gender) => {
//     if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return `${process.env.PUBLIC_URL}/female.PNG`;
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return `${process.env.PUBLIC_URL}/male.PNG`;
//     }
//     return `${process.env.PUBLIC_URL}/unknown.PNG`;
//   }, []);

//   const getAvatarColor = useCallback((gender) => {
//     if (!gender) return '#95a5a6';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '#e91e63';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '#2196f3';
//     }
//     return '#95a5a6';
//   }, []);

//   // ==================== SEARCH HANDLING ====================
//   const handleSearch = useCallback((query) => {
//     setCurrentSearchQuery(query);
//     const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
//     setFilteredVisits(filtered);
//   }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//   }, [cardsPerRowIndex, cardsPerRowPattern]);

//   // ==================== PAGINATION ====================
//   const goToPage = useCallback((page) => {
//     if (page >= 0 && page < totalPages && page !== currentPage) {
//       setCurrentPage(page);
//       loadDoctorVisits(currentFilter, false, page);
//     }
//   }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

//   // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
//     init();
//   }, []);

//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Avatar Component
//   const PatientAvatar = ({ gender, name, size = 60 }) => {
//     const avatarPath = getAvatarPath(gender);
//     const bgColor = getAvatarColor(gender);
//     const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//     const [imageError, setImageError] = useState(false);

//     return (
//       <div 
//         className="patient-avatar"
//         style={{ 
//           width: size, 
//           height: size,
//           borderRadius: '50%',
//           overflow: 'hidden',
//           flexShrink: 0,
//           border: '2px solid #e9ecef',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: bgColor,
//           color: 'white',
//           fontSize: `${size * 0.35}px`,
//           fontWeight: 'bold',
//           position: 'relative'
//         }}
//       >
//         {!imageError ? (
//           <img
//             src={avatarPath}
//             alt={`${gender || 'Unknown'} avatar`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//     );
//   };

//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//           <PatientAvatar gender={gender} name={fullName} size={60} />
//           <div className="visit-info">
//             <div className="visit-name">👤 {fullName}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== VISIT POPUP COMPONENT ====================
//   const VisitPopup = ({ visit, onClose, onOpen, onDetails }) => {
//     if (!visit) return null;
    
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-popup-overlay" onClick={onClose}>
//         <div className="visit-popup-content" onClick={(e) => e.stopPropagation()}>
//           <button className="visit-popup-close" onClick={onClose}>✖</button>
//           <h2 className="visit-popup-title">📋 {t('doctor.visit.details')}</h2>
          
//           <div className="visit-popup-card" style={{ backgroundColor: bgColor }}>
//             <div className="visit-card-header">
//               <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//               <span className="visit-header-spacer" />
//               <StatusBadge status={status} />
//             </div>
//             <div className="visit-card-body">
//               <PatientAvatar gender={gender} name={fullName} size={60} />
//               <div className="visit-info">
//                 <div className="visit-name">👤 {fullName}</div>
//                 <div className="visit-details">
//                   📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//                 </div>
//                 <div className="visit-details">
//                   📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//                 </div>
//                 <div className="visit-details" style={{ marginTop: '8px' }}>
//                   <strong>{t('doctor.details.medicalInfo')}:</strong><br />
//                   🩺 {t('doctor.details.chiefComplaint')}: {visit.chiefComplaint || '-'}<br />
//                   📜 {t('doctor.details.history')}: {visit.history || '-'}<br />
//                   💊 {t('doctor.details.medications')}: {visit.medications || '-'}<br />
//                   ⚠ {t('doctor.details.allergies')}: {visit.allergies || '-'}<br />
//                   📝 {t('doctor.details.notes')}: {visit.doctorNotes || '-'}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="visit-popup-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//             <button className="btn-close-popup" onClick={onClose}>
//               {t('doctor.dialog.close')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== DETAILS MODAL (Matches Java showVisitDetailsDialog) ====================
//   const DetailsModal = () => {
//     if (!showDetailsModal || !detailsVisitData) return null;
    
//     const visit = detailsVisitData;
//     const patient = visit.patient || {};
    
//     const formatDateTimeLocal = (iso) => {
//       if (!iso) return '-';
//       try {
//         const date = new Date(iso);
//         return date.toLocaleString(isRTL ? 'ar' : 'en-GB', {
//           day: '2-digit',
//           month: '2-digit',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         });
//       } catch {
//         return '-';
//       }
//     };

//     const buildFullNameLocal = (p) => {
//       if (!p) return '';
//       return [p.firstName, p.middleName, p.lastName].filter(Boolean).join(' ').trim() || 'Unknown';
//     };

//     const getStatusColorLocal = (status) => {
//       switch (status?.toUpperCase()) {
//         case 'COMPLETED':
//         case 'CLOSED':
//           return '#27ae60';
//         case 'IN_PROGRESS':
//           return '#f39c12';
//         case 'CANCELLED':
//           return '#e74c3c';
//         case 'CREATED':
//         case 'NEW':
//           return '#e74c3c';
//         default:
//           return '#3498db';
//       }
//     };

//     const mapDurationTypeLocal = (type) => {
//       if (!type) return '-';
//       const map = {
//         '1': 'Hour',
//         '2': 'Day',
//         '3': 'Week',
//         '4': 'Month',
//         '5': 'Year'
//       };
//       return map[type] || '-';
//     };

//     // PDF Export functions
//     const exportPatientPdf = () => {
//       const content = `
//         ${t('doctor.details.visitReport')}
//         ===========================
//         ${t('doctor.details.patientLabel')}: ${buildFullNameLocal(patient)}
//         ${t('doctor.visit.phone')}: ${patient.phone || '-'}
//         ${t('doctor.visit.gender')}: ${patient.gender || '-'}
//         ${t('doctor.visit.id')}: ${visit.id}
//         ${t('doctor.details.dateLabel')}: ${new Date().toLocaleDateString()}
//       `;
//       alert(t('doctor.pdf.patientInfo') + ':\n\n' + content);
//     };

//     const exportMedicalPdf = () => {
//       const content = `
//         ${t('doctor.details.medicalInfo')}
//         ==========================
//         ${t('doctor.details.chiefComplaint')}: ${visit.chiefComplaint || '-'}
//         ${t('doctor.details.history')}: ${visit.history || '-'}
//         ${t('doctor.details.medications')}: ${visit.medications || '-'}
//         ${t('doctor.details.allergies')}: ${visit.allergies || '-'}
//         ${t('doctor.details.notes')}: ${visit.doctorNotes || '-'}
//       `;
//       alert(t('doctor.pdf.medicalInfo') + ':\n\n' + content);
//     };

//     const exportDrugsPdf = () => {
//       let content = t('doctor.pdf.drugsReport') + '\n' + '='.repeat(40) + '\n';
//       if (detailsVisitDrugs.length === 0) {
//         content += t('doctor.details.noDrugs');
//       } else {
//         detailsVisitDrugs.forEach((drug, index) => {
//           const drugObj = drug.drug || {};
//           content += `\n${index + 1}. ${drugObj.tradeName || drug.tradeName || 'Unknown'}\n`;
//           content += `   Dose: ${drug.dose || '-'}\n`;
//           content += `   Frequency: ${drug.frequency || '-'}\n`;
//           content += `   Duration: ${drug.duration || '-'} ${mapDurationTypeLocal(drug.durationType)}\n`;
//           content += `   Instructions: ${drug.instructions || '-'}\n`;
//         });
//       }
//       alert(t('doctor.pdf.drugsReport') + ':\n\n' + content);
//     };

//     const exportProceduresPdf = () => {
//       let content = t('doctor.pdf.proceduresReport') + '\n' + '='.repeat(40) + '\n';
//       if (detailsVisitProcedures.length === 0) {
//         content += t('doctor.details.noProcedures');
//       } else {
//         detailsVisitProcedures.forEach((proc, index) => {
//           content += `\n${index + 1}. ${proc}\n`;
//         });
//       }
//       alert(t('doctor.pdf.proceduresReport') + ':\n\n' + content);
//     };

//     return (
//       <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
//         <div className="modal-content full-details" onClick={(e) => e.stopPropagation()}>
//           <button className="modal-close" onClick={() => setShowDetailsModal(false)}>✖</button>
          
//           {loadingDetails ? (
//             <div className="loading-container">
//               <div className="loading-spinner-large"></div>
//               <p>{t('doctor.loading')}</p>
//             </div>
//           ) : (
//             <>
//               <h2>📋 {t('doctor.visit.details')} #{visit.id}</h2>
              
//               {/* PDF Buttons */}
//               <div className="pdf-buttons-container">
//                 <button className="btn-pdf patient" onClick={exportPatientPdf}>
//                   👤 {t('doctor.pdf.patient')}
//                 </button>
//                 <button className="btn-pdf medical" onClick={exportMedicalPdf}>
//                   🏥 {t('doctor.pdf.medical')}
//                 </button>
//                 <button className="btn-pdf drugs" onClick={exportDrugsPdf}>
//                   💊 {t('doctor.pdf.drugs')}
//                 </button>
//                 <button className="btn-pdf procedures" onClick={exportProceduresPdf}>
//                   🔬 {t('doctor.pdf.procedures')}
//                 </button>
//               </div>

//               {/* Basic Info */}
//               <div className="details-section basic-info">
//                 <h3>👤 {t('doctor.details.patientInfo')}</h3>
//                 <div className="info-grid">
//                   <div className="info-card">
//                     <span className="info-icon">🆔</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.id')}</span>
//                       <span className="info-value">{visit.id}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">👤</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.details.patient')}</span>
//                       <span className="info-value">{buildFullNameLocal(patient)}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">📞</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.phone')}</span>
//                       <span className="info-value">{patient.phone || '-'}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">⚧</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.gender')}</span>
//                       <span className="info-value">{patient.gender || '-'}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">📅</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.visitDate')}</span>
//                       <span className="info-value">{formatDateTimeLocal(visit.visitDate)}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">📌</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.status')}</span>
//                       <span className="status-badge" style={{ 
//                         backgroundColor: getStatusColorLocal(visit.visitStatus),
//                         color: 'white',
//                         padding: '4px 15px',
//                         borderRadius: '12px',
//                         fontSize: '12px',
//                         fontWeight: 'bold',
//                         display: 'inline-block'
//                       }}>
//                         {visit.visitStatus || 'N/A'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Medical Info */}
//               <div className="details-section medical-info">
//                 <h3>🏥 {t('doctor.details.medicalInfo')}</h3>
//                 <div className="medical-grid">
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#E74C3C' }}>
//                       🩺 {t('doctor.details.chiefComplaint')}
//                     </div>
//                     <div className="medical-content">{visit.chiefComplaint || '-'}</div>
//                   </div>
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#3498DB' }}>
//                       📜 {t('doctor.details.history')}
//                     </div>
//                     <div className="medical-content">{visit.history || '-'}</div>
//                   </div>
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#2ECC71' }}>
//                       💊 {t('doctor.details.medications')}
//                     </div>
//                     <div className="medical-content">{visit.medications || '-'}</div>
//                   </div>
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#F39C12' }}>
//                       ⚠ {t('doctor.details.allergies')}
//                     </div>
//                     <div className="medical-content">{visit.allergies || '-'}</div>
//                   </div>
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#9B59B6' }}>
//                       📝 {t('doctor.details.notes')}
//                     </div>
//                     <div className="medical-content">{visit.doctorNotes || '-'}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Drugs */}
//               <div className="details-section drugs-info">
//                 <h3>💊 {t('doctor.details.prescribedDrugs')}</h3>
//                 {detailsVisitDrugs.length === 0 ? (
//                   <div className="empty-state small">📭 {t('doctor.details.noDrugs')}</div>
//                 ) : (
//                   <div className="drugs-grid">
//                     {detailsVisitDrugs.map((drug, index) => {
//                       const drugObj = drug.drug || {};
//                       return (
//                         <div key={index} className="drug-card">
//                           <div className="drug-header">
//                             <span className="drug-name">💊 {drugObj.tradeName || drug.tradeName || 'Unknown'}</span>
//                             <span className="drug-form-badge">{drugObj.dosageForm || drug.dosageForm || '-'}</span>
//                           </div>
//                           <div className="drug-details">
//                             <div className="drug-detail-row">
//                               <span className="drug-label">💪 Strength:</span>
//                               <span className="drug-value">
//                                 {drugObj.strength || drug.strength || '-'} {drugObj.unitType || drug.unitType || ''}
//                               </span>
//                             </div>
//                             <div className="drug-detail-row">
//                               <span className="drug-label">💊 Dose:</span>
//                               <span className="drug-value">{drug.dose || '-'}</span>
//                             </div>
//                             <div className="drug-detail-row">
//                               <span className="drug-label">⏰ Frequency:</span>
//                               <span className="drug-value">{drug.frequency || '-'}</span>
//                             </div>
//                             <div className="drug-detail-row">
//                               <span className="drug-label">📅 Duration:</span>
//                               <span className="drug-value">
//                                 {drug.duration || '-'} {mapDurationTypeLocal(drug.durationType)}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="drug-instructions">
//                             📝 {drug.instructions || 'No instructions'}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>

//               {/* Procedures */}
//               <div className="details-section procedures-info">
//                 <h3>🔬 {t('doctor.details.procedures')}</h3>
//                 {detailsVisitProcedures.length === 0 ? (
//                   <div className="empty-state small">📭 {t('doctor.details.noProcedures')}</div>
//                 ) : (
//                   <div className="procedures-list">
//                     {detailsVisitProcedures.map((proc, index) => {
//                       let icon = '🧪';
//                       let category = 'General';
//                       let color = '#3498DB';
                      
//                       if (proc.startsWith('[RADIOLOGY]')) {
//                         icon = '📡';
//                         category = 'Radiology';
//                         color = '#E74C3C';
//                       } else if (proc.startsWith('[LABORATORY]')) {
//                         icon = '🧫';
//                         category = 'Laboratory';
//                         color = '#2ECC71';
//                       } else if (proc.startsWith('[MEDICAL]')) {
//                         icon = '🩺';
//                         category = 'Medical';
//                         color = '#F39C12';
//                       }
                      
//                       const cleanProc = proc.replace(/\[.*?\]\s*/, '');
                      
//                       return (
//                         <div key={index} className="procedure-item" style={{ borderLeftColor: color }}>
//                           <span className="procedure-icon">{icon}</span>
//                           <div className="procedure-content">
//                             <span className="procedure-category" style={{ color: color }}>
//                               {category}
//                             </span>
//                             <span className="procedure-name">{cleanProc}</span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => goToPage(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => goToPage(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           {t('doctor.filter.page')} {currentPage + 1} {t('doctor.filter.of')} {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && isInitialLoad) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="loading-spinner">{t('doctor.loading')}</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="error-message">
//           <h2>⚠️ {t('doctor.error')}</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>{t('doctor.retry')}</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={openSearchPatient}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert(t('doctor.reports.comingSoon'))}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               value={currentSearchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 const newSort = !sortByDateAsc;
//                 setSortByDateAsc(newSort);
//                 const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
//                 setFilteredVisits(filtered);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={showVisitDetails}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={showVisitDetails}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>

//       {/* Visit Popup */}
//       {showVisitPopup && popupVisit && (
//         <VisitPopup
//           visit={popupVisit}
//           onClose={() => {
//             setShowVisitPopup(false);
//             setPopupVisit(null);
//           }}
//           onOpen={(id, status) => {
//             if (status === 'CLOSED') {
//               reopenVisit(id);
//             } else {
//               openVisitScreen(id, status);
//             }
//           }}
//           onDetails={(id) => {
//             setShowVisitPopup(false);
//             showVisitDetails(id);
//           }}
//         />
//       )}

//       {/* Visit Screen Modal */}
//       {showVisitScreen && selectedVisitId && (
//         <div className="visit-screen-modal-overlay" onClick={closeVisitScreen}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeVisitScreen}
//             >
//               ✖
//             </button>
//             <DoctorVisitScreen
//               doctorId={doctorId}
//               visitId={selectedVisitId}
//               initialStatus={selectedVisitStatus}
//               username={username}
//               onClose={closeVisitScreen}
//               language={locale}
//             />
//           </div>
//         </div>
//       )}

//       {/* Search Patient Modal */}
//       {showSearchPatient && (
//         <div className="visit-screen-modal-overlay" onClick={closeSearchPatient}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeSearchPatient}
//             >
//               ✖
//             </button>
//             <DoctorSearchPatientScreen
//               loggedUser={username}
//               language={locale}
//               onClose={closeSearchPatient}
//             />
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       <DetailsModal />
//     </div>
//   );
// };

// export default DoctorHomePage;  04072026  11:25 pm 

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import DoctorVisitScreen from '../DoctorHomePage/DoctorVisitScreen';
// import DoctorSearchPatientScreen from '../DoctorHomePage/DoctorSearchPatientScreen';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// // English translations
// const EN_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.details.chiefComplaint': 'Chief Complaint',
//   'doctor.details.history': 'History',
//   'doctor.details.medications': 'Medications',
//   'doctor.details.allergies': 'Allergies',
//   'doctor.details.notes': 'Doctor Notes',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info',
//   'doctor.pdf.medical': 'Medical Info',
//   'doctor.pdf.drugs': 'Drugs Report',
//   'doctor.pdf.procedures': 'Procedures Report',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report',
//   'doctor.filter.page': 'Page',
//   'doctor.filter.of': 'of',
//   'doctor.loading': 'Loading...',
//   'doctor.error': 'Error',
//   'doctor.retry': 'Retry',
//   'doctor.reports.comingSoon': 'Reports feature coming soon',
//   'doctor.details.visitReport': 'Visit Report',
//   'doctor.details.dateLabel': 'Date',
//   'doctor.details.patientLabel': 'Patient',
//   'doctor.details.doctorLabel': 'Doctor',
//   'doctor.pdf.generating': 'Generating PDF...',
//   'doctor.pdf.downloading': 'Downloading PDF...',
//   'doctor.pdf.success': 'PDF downloaded successfully',
//   'doctor.pdf.error': 'Error generating PDF'
// };

// // Arabic translations
// const AR_BUNDLE = {
//   'doctor.home.title': 'لوحة تحكم الطبيب',
//   'doctor.home.welcome': 'مرحباً, {0}',
//   'doctor.sidebar.menu': 'القائمة',
//   'doctor.sidebar.searchPatient': 'بحث عن مريض',
//   'doctor.sidebar.reports': 'التقارير',
//   'doctor.sidebar.changePassword': 'تغيير كلمة المرور',
//   'doctor.sidebar.logout': 'تسجيل الخروج',
//   'doctor.sidebar.logoutConfirm': 'هل أنت متأكد من تسجيل الخروج؟',
//   'doctor.dashboard.todayVisits': 'زيارات اليوم',
//   'doctor.dashboard.totalVisits': 'إجمالي الزيارات',
//   'doctor.dashboard.newVisits': 'زيارات جديدة',
//   'doctor.dashboard.closedVisits': 'زيارات مغلقة',
//   'doctor.performance.title': '📊 نظرة عامة على الأداء',
//   'doctor.performance.patientsSeen': 'المرضى اليوم',
//   'doctor.performance.openVisits': 'زيارات مفتوحة',
//   'doctor.performance.completedToday': 'مكتمل اليوم',
//   'doctor.performance.completionRate': 'نسبة الإنجاز',
//   'doctor.filter.today': 'اليوم',
//   'doctor.filter.all': 'الكل',
//   'doctor.filter.new': 'جديد',
//   'doctor.filter.inProgress': 'قيد التنفيذ',
//   'doctor.filter.closed': 'مغلق',
//   'doctor.filter.searchPrompt': 'بحث بالاسم أو رقم الهاتف أو المعرف...',
//   'doctor.filter.sortAsc': 'ترتيب تصاعدي',
//   'doctor.filter.sortDesc': 'ترتيب تنازلي',
//   'doctor.filter.cardView1': 'عمود واحد',
//   'doctor.filter.cardView2': 'عمودان',
//   'doctor.filter.cardView3': 'ثلاثة أعمدة',
//   'doctor.filter.cardDisplay': 'تخطيط',
//   'doctor.filter.refresh': 'تحديث',
//   'doctor.filter.noResults': 'لا توجد زيارات',
//   'doctor.visit.id': 'المعرف',
//   'doctor.visit.age': 'العمر',
//   'doctor.visit.type': 'النوع',
//   'doctor.visit.open': 'فتح',
//   'doctor.visit.details': 'تفاصيل',
//   'doctor.visit.reopen': 'إعادة فتح',
//   'doctor.visit.reopened': 'تم إعادة فتح الزيارة بنجاح',
//   'doctor.visit.reopenFailed': 'فشل إعادة فتح الزيارة',
//   'doctor.visit.reopenError': 'خطأ في إعادة فتح الزيارة',
//   'doctor.visit.loadError': 'فشل تحميل الزيارات',
//   'doctor.findVisit.prompt': 'أدخل معرف الزيارة...',
//   'doctor.findVisit.notFound': 'الزيارة رقم {0} غير موجودة',
//   'doctor.findVisit.invalidAlert': 'الرجاء إدخال معرف زيارة صحيح',
//   'doctor.findVisit.emptyAlert': 'الرجاء إدخال معرف الزيارة',
//   'doctor.findVisit.errorFetch': 'خطأ في جلب الزيارة',
//   'doctor.notifications.title': 'الإشعارات',
//   'doctor.notifications.noOpen': 'لا توجد زيارات مفتوحة',
//   'doctor.notifications.openVisits': 'الزيارات المفتوحة',
//   'doctor.notifications.visitId': 'معرف الزيارة',
//   'doctor.notifications.patient': 'المريض',
//   'doctor.notifications.status': 'الحالة',
//   'doctor.password.title': 'تغيير كلمة المرور',
//   'doctor.password.old': 'كلمة المرور القديمة',
//   'doctor.password.new': 'كلمة المرور الجديدة',
//   'doctor.password.confirm': 'تأكيد كلمة المرور',
//   'doctor.password.save': 'حفظ',
//   'doctor.password.fillAll': 'الرجاء ملء جميع الحقول',
//   'doctor.password.notMatch': 'كلمات المرور غير متطابقة',
//   'doctor.password.success': 'تم تغيير كلمة المرور بنجاح',
//   'doctor.password.error': 'خطأ في تغيير كلمة المرور',
//   'doctor.details.patientInfo': 'معلومات المريض',
//   'doctor.details.medicalInfo': 'المعلومات الطبية',
//   'doctor.details.prescribedDrugs': 'الأدوية الموصوفة',
//   'doctor.details.noDrugs': 'لا توجد أدوية موصوفة',
//   'doctor.details.procedures': 'الإجراءات',
//   'doctor.details.noProcedures': 'لا توجد إجراءات',
//   'doctor.details.patient': 'المريض',
//   'doctor.details.chiefComplaint': 'الشكوى الرئيسية',
//   'doctor.details.history': 'التاريخ الطبي',
//   'doctor.details.medications': 'الأدوية',
//   'doctor.details.allergies': 'الحساسية',
//   'doctor.details.notes': 'ملاحظات الطبيب',
//   'doctor.visit.phone': 'الهاتف',
//   'doctor.visit.gender': 'الجنس',
//   'doctor.visit.visitDate': 'تاريخ الزيارة',
//   'doctor.visit.status': 'الحالة',
//   'doctor.dialog.close': 'إغلاق',
//   'doctor.pdf.patient': 'معلومات المريض',
//   'doctor.pdf.medical': 'المعلومات الطبية',
//   'doctor.pdf.drugs': 'تقرير الأدوية',
//   'doctor.pdf.procedures': 'تقرير الإجراءات',
//   'doctor.pdf.visitReport': 'تقرير الزيارة',
//   'doctor.pdf.patientLabel': 'المريض',
//   'doctor.pdf.doctorLabel': 'الطبيب',
//   'doctor.pdf.dateLabel': 'التاريخ',
//   'doctor.pdf.patientInfo': 'معلومات المريض',
//   'doctor.pdf.medicalInfo': 'المعلومات الطبية',
//   'doctor.pdf.drugsReport': 'تقرير الأدوية',
//   'doctor.pdf.proceduresReport': 'تقرير الإجراءات',
//   'doctor.filter.page': 'صفحة',
//   'doctor.filter.of': 'من',
//   'doctor.loading': 'جاري التحميل...',
//   'doctor.error': 'خطأ',
//   'doctor.retry': 'إعادة المحاولة',
//   'doctor.reports.comingSoon': 'ميزة التقارير قريباً',
//   'doctor.details.visitReport': 'تقرير الزيارة',
//   'doctor.details.dateLabel': 'التاريخ',
//   'doctor.details.patientLabel': 'المريض',
//   'doctor.details.doctorLabel': 'الطبيب',
//   'doctor.pdf.generating': 'جاري إنشاء PDF...',
//   'doctor.pdf.downloading': 'جاري تحميل PDF...',
//   'doctor.pdf.success': 'تم تحميل PDF بنجاح',
//   'doctor.pdf.error': 'خطأ في إنشاء PDF'
// };

// const DoctorHomePage = ({ doctorId, username, language: propLanguage }) => {
//   // ==================== API BASE URL ====================
//   const API_BASE_URL = BASE_URL;

//   // ==================== GET LANGUAGE FROM LOCALSTORAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = localStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== STATE ====================
//   const [showVisitPopup, setShowVisitPopup] = useState(false);
//   const [popupVisit, setPopupVisit] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(true);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [locale, setLocale] = useState(getLanguage());
  
//   // ==================== SEARCH PATIENT SCREEN STATE ====================
//   const [showSearchPatient, setShowSearchPatient] = useState(false);
  
//   // ==================== DETAILS MODAL STATE ====================
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [detailsVisitData, setDetailsVisitData] = useState(null);
//   const [detailsVisitDrugs, setDetailsVisitDrugs] = useState([]);
//   const [detailsVisitProcedures, setDetailsVisitProcedures] = useState([]);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [generatingPdf, setGeneratingPdf] = useState(false);
  
//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   const isRTL = locale === 'ar';

//   // ==================== VISIT SCREEN STATE ====================
//   const [showVisitScreen, setShowVisitScreen] = useState(false);
//   const [selectedVisitId, setSelectedVisitId] = useState(null);
//   const [selectedVisitStatus, setSelectedVisitStatus] = useState('NEW');
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);
//   const detailsModalRef = useRef(null);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         return json;
//       } catch (e) {
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
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
//     } catch (e) {
//       return '-';
//     }
//   }, [isRTL]);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

//   const mapDurationType = useCallback((type) => {
//     if (!type) return '-';
//     const map = {
//       '1': 'Hour',
//       '2': 'Day',
//       '3': 'Week',
//       '4': 'Month',
//       '5': 'Year'
//     };
//     return map[type] || '-';
//   }, []);

//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   // ==================== FILTERING FUNCTION ====================
//   const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
//     const q = searchQuery.toLowerCase().trim();
//     const today = new Date().toDateString();
    
//     let filtered = visits.filter(visit => {
//       const patient = visit.patient || {};
//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');
      
//       const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
//       const isToday = visitDate && visitDate.toDateString() === today;
      
//       let statusMatches = true;
//       switch (filter) {
//         case 'TODAY':
//           statusMatches = isToday;
//           break;
//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;
//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;
//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;
//         case 'ALL':
//           statusMatches = true;
//           break;
//         default:
//           statusMatches = true;
//       }
      
//       return matchesSearch && statusMatches;
//     });
    
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
//       return sortAsc ? dateA - dateB : dateB - dateA;
//     });
    
//     return filtered;
//   }, [buildFullName]);

//   // ==================== LOAD FUNCTIONS ====================
//   const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {
//     if (resetPage) {
//       setCurrentPage(0);
//     }

//     setCurrentFilter(filter);
//     setCurrentSearchQuery('');
//     setLoading(true);
//     setError(null);

//     try {
//       const pageToUse = pageOverride !== null ? pageOverride : (resetPage ? 0 : currentPage);
//       const endpoint = `/api/visits/doctor/${doctorId}?page=${pageToUse}&size=${PAGE_SIZE}`;

//       const data = await apiFetch(endpoint);

//       const visits = data.content || [];
//       const total = data.totalPages || 1;

//       setTotalPages(total);
//       setVisitsCache(visits);

//       updateFilterCounts(visits);
//       updatePerformanceStats(visits);

//       const filtered = filterVisits(visits, filter, '', sortByDateAsc);
//       setFilteredVisits(filtered);

//       if (scrollPaneRef.current) {
//         scrollPaneRef.current.scrollTop = 0;
//       }
//     } catch (err) {
//       setError(t('doctor.visit.loadError') || 'Failed to load visits');
//       console.error('Error loading visits:', err);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, [doctorId, sortByDateAsc, t, apiFetch, filterVisits, updateFilterCounts, updatePerformanceStats]);

//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('Error loading summary:', error);
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       const visit = await apiFetch(endpoint);
//       setPopupVisit(visit);
//       setShowVisitPopup(true);
//     } catch (error) {
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   // ==================== PDF GENERATION FUNCTIONS ====================
//   const generatePDF = useCallback((content, filename) => {
//     setGeneratingPdf(true);
    
//     try {
//       // Create a clean HTML document for PDF
//       const htmlContent = `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <meta charset="UTF-8">
//             <title>${filename}</title>
//             <style>
//               body {
//                 font-family: Arial, Helvetica, sans-serif;
//                 padding: 40px;
//                 line-height: 1.6;
//                 color: #333;
//               }
//               .header {
//                 text-align: center;
//                 border-bottom: 2px solid #1E90FF;
//                 padding-bottom: 20px;
//                 margin-bottom: 30px;
//               }
//               .header h1 {
//                 color: #1E90FF;
//                 margin: 0;
//                 font-size: 24px;
//               }
//               .header p {
//                 color: #666;
//                 margin: 5px 0 0 0;
//               }
//               .section {
//                 margin-bottom: 25px;
//                 padding: 15px;
//                 border: 1px solid #e0e0e0;
//                 border-radius: 8px;
//                 background: #f9f9f9;
//               }
//               .section h2 {
//                 color: #2C3E50;
//                 border-bottom: 2px solid #e0e0e0;
//                 padding-bottom: 8px;
//                 margin-top: 0;
//               }
//               .info-row {
//                 display: flex;
//                 padding: 5px 0;
//                 border-bottom: 1px solid #f0f0f0;
//               }
//               .info-label {
//                 font-weight: bold;
//                 width: 150px;
//                 color: #555;
//               }
//               .info-value {
//                 flex: 1;
//                 color: #333;
//               }
//               .drug-item {
//                 background: white;
//                 padding: 12px;
//                 margin: 8px 0;
//                 border-radius: 6px;
//                 border: 1px solid #e0e0e0;
//               }
//               .drug-name {
//                 font-weight: bold;
//                 color: #2C3E50;
//                 font-size: 16px;
//               }
//               .drug-detail {
//                 display: flex;
//                 padding: 3px 0;
//                 font-size: 14px;
//               }
//               .drug-label {
//                 font-weight: bold;
//                 width: 120px;
//                 color: #666;
//               }
//               .procedure-item {
//                 padding: 8px 12px;
//                 margin: 5px 0;
//                 background: white;
//                 border-radius: 4px;
//                 border-left: 4px solid #3498DB;
//               }
//               .procedure-category {
//                 font-size: 12px;
//                 font-weight: bold;
//                 color: #3498DB;
//               }
//               .procedure-name {
//                 font-size: 14px;
//                 color: #333;
//               }
//               .footer {
//                 text-align: center;
//                 margin-top: 40px;
//                 padding-top: 20px;
//                 border-top: 1px solid #e0e0e0;
//                 color: #999;
//                 font-size: 12px;
//               }
//               .badge {
//                 display: inline-block;
//                 padding: 2px 12px;
//                 border-radius: 12px;
//                 color: white;
//                 font-weight: bold;
//                 font-size: 12px;
//               }
//               .badge-created { background: #e74c3c; }
//               .badge-inprogress { background: #f39c12; }
//               .badge-closed { background: #27ae60; }
//               .badge-default { background: #3498db; }
//             </style>
//           </head>
//           <body>
//             ${content}
//             <div class="footer">
//               Generated on ${new Date().toLocaleString()}
//             </div>
//           </body>
//         </html>
//       `;

//       // Create a Blob with the HTML content
//       const blob = new Blob([htmlContent], { type: 'text/html' });
//       const url = window.URL.createObjectURL(blob);
      
//       // Create a link and trigger download
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${filename}.html`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
      
//       alert(t('doctor.pdf.success'));
//     } catch (error) {
//       console.error('PDF generation error:', error);
//       alert(t('doctor.pdf.error') + ': ' + error.message);
//     } finally {
//       setGeneratingPdf(false);
//     }
//   }, [t]);

//   // ==================== SHOW VISIT DETAILS ====================
//   const showVisitDetails = useCallback(async (visitId) => {
//     setLoadingDetails(true);
//     setShowDetailsModal(true);

//     try {
//       const visitData = await apiFetch(`/api/visits/${visitId}`);
//       setDetailsVisitData(visitData);

//       try {
//         const drugsData = await apiFetch(`/api/visits/${visitId}/drugs`);
//         setDetailsVisitDrugs(Array.isArray(drugsData) ? drugsData : []);
//       } catch (error) {
//         console.error('Failed to load drugs:', error);
//         setDetailsVisitDrugs([]);
//       }

//       try {
//         const proceduresData = await apiFetch(`/api/visits/${visitId}/procedures`);
//         setDetailsVisitProcedures(Array.isArray(proceduresData) ? proceduresData : []);
//       } catch (error) {
//         console.error('Failed to load procedures:', error);
//         setDetailsVisitProcedures([]);
//       }

//     } catch (error) {
//       alert(t('doctor.visit.loadError') + ': ' + error.message);
//       setShowDetailsModal(false);
//     } finally {
//       setLoadingDetails(false);
//     }
//   }, [apiFetch, t]);

//   // ==================== PDF EXPORT FUNCTIONS ====================
//   const exportVisitPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
//     const patient = visit.patient || {};
//     const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
//                         visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
//                         visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
    
//     let drugsHtml = '';
//     if (detailsVisitDrugs.length === 0) {
//       drugsHtml = '<p style="color: #999; font-style: italic;">No drugs prescribed</p>';
//     } else {
//       detailsVisitDrugs.forEach((drug) => {
//         const drugObj = drug.drug || {};
//         drugsHtml += `
//           <div class="drug-item">
//             <div class="drug-name">💊 ${drugObj.tradeName || drug.tradeName || 'Unknown'}</div>
//             <div class="drug-detail">
//               <span class="drug-label">Strength:</span>
//               <span>${drugObj.strength || drug.strength || '-'} ${drugObj.unitType || drug.unitType || ''}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Dose:</span>
//               <span>${drug.dose || '-'}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Frequency:</span>
//               <span>${drug.frequency || '-'}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Duration:</span>
//               <span>${drug.duration || '-'} ${mapDurationType(drug.durationType)}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Instructions:</span>
//               <span>${drug.instructions || 'No instructions'}</span>
//             </div>
//           </div>
//         `;
//       });
//     }

//     let proceduresHtml = '';
//     if (detailsVisitProcedures.length === 0) {
//       proceduresHtml = '<p style="color: #999; font-style: italic;">No procedures performed</p>';
//     } else {
//       detailsVisitProcedures.forEach((proc) => {
//         let icon = '🧪';
//         let category = 'General';
//         let color = '#3498DB';
        
//         if (proc.startsWith('[RADIOLOGY]')) {
//           icon = '📡';
//           category = 'Radiology';
//           color = '#E74C3C';
//         } else if (proc.startsWith('[LABORATORY]')) {
//           icon = '🧫';
//           category = 'Laboratory';
//           color = '#2ECC71';
//         } else if (proc.startsWith('[MEDICAL]')) {
//           icon = '🩺';
//           category = 'Medical';
//           color = '#F39C12';
//         }
        
//         const cleanProc = proc.replace(/\[.*?\]\s*/, '');
        
//         proceduresHtml += `
//           <div class="procedure-item" style="border-left-color: ${color};">
//             <div class="procedure-category" style="color: ${color};">${icon} ${category}</div>
//             <div class="procedure-name">${cleanProc}</div>
//           </div>
//         `;
//       });
//     }

//     const content = `
//       <div class="header">
//         <h1>${t('doctor.details.visitReport')}</h1>
//         <p>Visit #${visit.id}</p>
//       </div>

//       <div class="section">
//         <h2>👤 ${t('doctor.details.patientInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.id')}</span>
//           <span class="info-value">${visit.id}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.patient')}</span>
//           <span class="info-value">${buildFullName(patient)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.phone')}</span>
//           <span class="info-value">${patient.phone || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.gender')}</span>
//           <span class="info-value">${patient.gender || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.visitDate')}</span>
//           <span class="info-value">${formatDateTime(visit.visitDate)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.status')}</span>
//           <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
//         </div>
//       </div>

//       <div class="section">
//         <h2>🏥 ${t('doctor.details.medicalInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.chiefComplaint')}</span>
//           <span class="info-value">${visit.chiefComplaint || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.history')}</span>
//           <span class="info-value">${visit.history || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.medications')}</span>
//           <span class="info-value">${visit.medications || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.allergies')}</span>
//           <span class="info-value">${visit.allergies || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.notes')}</span>
//           <span class="info-value">${visit.doctorNotes || '-'}</span>
//         </div>
//       </div>

//       <div class="section">
//         <h2>💊 ${t('doctor.details.prescribedDrugs')}</h2>
//         ${drugsHtml}
//       </div>

//       <div class="section">
//         <h2>🔬 ${t('doctor.details.procedures')}</h2>
//         ${proceduresHtml}
//       </div>
//     `;

//     generatePDF(content, `Visit_${visit.id}_Report`);
//   }, [detailsVisitData, detailsVisitDrugs, detailsVisitProcedures, buildFullName, formatDateTime, mapDurationType, generatePDF, t]);

//   const exportPatientPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
//     const patient = visit.patient || {};
    
//     const content = `
//       <div class="header">
//         <h1>${t('doctor.pdf.patientInfo')}</h1>
//         <p>${t('doctor.details.patientLabel')}: ${buildFullName(patient)}</p>
//       </div>

//       <div class="section">
//         <h2>👤 ${t('doctor.details.patientInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.id')}</span>
//           <span class="info-value">${visit.id}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.patient')}</span>
//           <span class="info-value">${buildFullName(patient)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.phone')}</span>
//           <span class="info-value">${patient.phone || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.gender')}</span>
//           <span class="info-value">${patient.gender || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.visitDate')}</span>
//           <span class="info-value">${formatDateTime(visit.visitDate)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.status')}</span>
//           <span class="info-value">${visit.visitStatus || 'N/A'}</span>
//         </div>
//       </div>
//     `;

//     generatePDF(content, `Patient_${visit.id}_Info`);
//   }, [detailsVisitData, buildFullName, formatDateTime, generatePDF, t]);

//   const exportMedicalPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
    
//     const content = `
//       <div class="header">
//         <h1>${t('doctor.pdf.medicalInfo')}</h1>
//         <p>Visit #${visit.id}</p>
//       </div>

//       <div class="section">
//         <h2>🏥 ${t('doctor.details.medicalInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.chiefComplaint')}</span>
//           <span class="info-value">${visit.chiefComplaint || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.history')}</span>
//           <span class="info-value">${visit.history || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.medications')}</span>
//           <span class="info-value">${visit.medications || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.allergies')}</span>
//           <span class="info-value">${visit.allergies || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.notes')}</span>
//           <span class="info-value">${visit.doctorNotes || '-'}</span>
//         </div>
//       </div>
//     `;

//     generatePDF(content, `Visit_${visit.id}_Medical`);
//   }, [detailsVisitData, generatePDF, t]);

//   const exportDrugsPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
    
//     let drugsHtml = '';
//     if (detailsVisitDrugs.length === 0) {
//       drugsHtml = '<p style="color: #999; font-style: italic;">No drugs prescribed</p>';
//     } else {
//       detailsVisitDrugs.forEach((drug) => {
//         const drugObj = drug.drug || {};
//         drugsHtml += `
//           <div class="drug-item">
//             <div class="drug-name">💊 ${drugObj.tradeName || drug.tradeName || 'Unknown'}</div>
//             <div class="drug-detail">
//               <span class="drug-label">Strength:</span>
//               <span>${drugObj.strength || drug.strength || '-'} ${drugObj.unitType || drug.unitType || ''}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Dose:</span>
//               <span>${drug.dose || '-'}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Frequency:</span>
//               <span>${drug.frequency || '-'}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Duration:</span>
//               <span>${drug.duration || '-'} ${mapDurationType(drug.durationType)}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Instructions:</span>
//               <span>${drug.instructions || 'No instructions'}</span>
//             </div>
//           </div>
//         `;
//       });
//     }

//     const content = `
//       <div class="header">
//         <h1>${t('doctor.pdf.drugsReport')}</h1>
//         <p>Visit #${visit.id}</p>
//       </div>

//       <div class="section">
//         <h2>💊 ${t('doctor.details.prescribedDrugs')}</h2>
//         ${drugsHtml}
//       </div>
//     `;

//     generatePDF(content, `Visit_${visit.id}_Drugs`);
//   }, [detailsVisitData, detailsVisitDrugs, mapDurationType, generatePDF, t]);

//   const exportProceduresPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
    
//     let proceduresHtml = '';
//     if (detailsVisitProcedures.length === 0) {
//       proceduresHtml = '<p style="color: #999; font-style: italic;">No procedures performed</p>';
//     } else {
//       detailsVisitProcedures.forEach((proc) => {
//         let icon = '🧪';
//         let category = 'General';
//         let color = '#3498DB';
        
//         if (proc.startsWith('[RADIOLOGY]')) {
//           icon = '📡';
//           category = 'Radiology';
//           color = '#E74C3C';
//         } else if (proc.startsWith('[LABORATORY]')) {
//           icon = '🧫';
//           category = 'Laboratory';
//           color = '#2ECC71';
//         } else if (proc.startsWith('[MEDICAL]')) {
//           icon = '🩺';
//           category = 'Medical';
//           color = '#F39C12';
//         }
        
//         const cleanProc = proc.replace(/\[.*?\]\s*/, '');
        
//         proceduresHtml += `
//           <div class="procedure-item" style="border-left-color: ${color};">
//             <div class="procedure-category" style="color: ${color};">${icon} ${category}</div>
//             <div class="procedure-name">${cleanProc}</div>
//           </div>
//         `;
//       });
//     }

//     const content = `
//       <div class="header">
//         <h1>${t('doctor.pdf.proceduresReport')}</h1>
//         <p>Visit #${visit.id}</p>
//       </div>

//       <div class="section">
//         <h2>🔬 ${t('doctor.details.procedures')}</h2>
//         ${proceduresHtml}
//       </div>
//     `;

//     generatePDF(content, `Visit_${visit.id}_Procedures`);
//   }, [detailsVisitData, detailsVisitProcedures, generatePDF, t]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//       setShowVisitPopup(false);
//       setPopupVisit(null);
//     } catch (error) {
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== VISIT SCREEN HANDLING ====================
//   const openVisitScreen = useCallback((visitId, status) => {
//     setSelectedVisitId(visitId);
//     setSelectedVisitStatus(status);
//     setShowVisitScreen(true);
//     setShowVisitPopup(false);
//     setPopupVisit(null);
//   }, []);

//   const closeVisitScreen = useCallback(() => {
//     setShowVisitScreen(false);
//     setSelectedVisitId(null);
//     setSelectedVisitStatus('NEW');
//     loadDoctorVisits(currentFilter, false);
//     loadSummaryCards();
//   }, [currentFilter, loadDoctorVisits, loadSummaryCards]);

//   // ==================== SEARCH PATIENT HANDLING ====================
//   const openSearchPatient = useCallback(() => {
//     setShowSearchPatient(true);
//   }, []);

//   const closeSearchPatient = useCallback(() => {
//     setShowSearchPatient(false);
//   }, []);

//   // ==================== AVATAR HANDLING ====================
//   const getAvatarPath = useCallback((gender) => {
//     if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return `${process.env.PUBLIC_URL}/female.PNG`;
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return `${process.env.PUBLIC_URL}/male.PNG`;
//     }
//     return `${process.env.PUBLIC_URL}/unknown.PNG`;
//   }, []);

//   const getAvatarColor = useCallback((gender) => {
//     if (!gender) return '#95a5a6';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '#e91e63';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '#2196f3';
//     }
//     return '#95a5a6';
//   }, []);

//   // ==================== SEARCH HANDLING ====================
//   const handleSearch = useCallback((query) => {
//     setCurrentSearchQuery(query);
//     const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
//     setFilteredVisits(filtered);
//   }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//   }, [cardsPerRowIndex, cardsPerRowPattern]);

//   // ==================== PAGINATION ====================
//   const goToPage = useCallback((page) => {
//     if (page >= 0 && page < totalPages && page !== currentPage) {
//       setCurrentPage(page);
//       loadDoctorVisits(currentFilter, false, page);
//     }
//   }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

//   // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
//     init();
//   }, []);

//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Avatar Component
//   const PatientAvatar = ({ gender, name, size = 60 }) => {
//     const avatarPath = getAvatarPath(gender);
//     const bgColor = getAvatarColor(gender);
//     const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//     const [imageError, setImageError] = useState(false);

//     return (
//       <div 
//         className="patient-avatar"
//         style={{ 
//           width: size, 
//           height: size,
//           borderRadius: '50%',
//           overflow: 'hidden',
//           flexShrink: 0,
//           border: '2px solid #e9ecef',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: bgColor,
//           color: 'white',
//           fontSize: `${size * 0.35}px`,
//           fontWeight: 'bold',
//           position: 'relative'
//         }}
//       >
//         {!imageError ? (
//           <img
//             src={avatarPath}
//             alt={`${gender || 'Unknown'} avatar`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//     );
//   };

//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//           <PatientAvatar gender={gender} name={fullName} size={60} />
//           <div className="visit-info">
//             <div className="visit-name">👤 {fullName}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== VISIT POPUP COMPONENT ====================
//   const VisitPopup = ({ visit, onClose, onOpen, onDetails }) => {
//     if (!visit) return null;
    
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-popup-overlay" onClick={onClose}>
//         <div className="visit-popup-content" onClick={(e) => e.stopPropagation()}>
//           <button className="visit-popup-close" onClick={onClose}>✖</button>
//           <h2 className="visit-popup-title">📋 {t('doctor.visit.details')}</h2>
          
//           <div className="visit-popup-card" style={{ backgroundColor: bgColor }}>
//             <div className="visit-card-header">
//               <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//               <span className="visit-header-spacer" />
//               <StatusBadge status={status} />
//             </div>
//             <div className="visit-card-body">
//               <PatientAvatar gender={gender} name={fullName} size={60} />
//               <div className="visit-info">
//                 <div className="visit-name">👤 {fullName}</div>
//                 <div className="visit-details">
//                   📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//                 </div>
//                 <div className="visit-details">
//                   📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//                 </div>
//                 <div className="visit-details" style={{ marginTop: '8px' }}>
//                   <strong>{t('doctor.details.medicalInfo')}:</strong><br />
//                   🩺 {t('doctor.details.chiefComplaint')}: {visit.chiefComplaint || '-'}<br />
//                   📜 {t('doctor.details.history')}: {visit.history || '-'}<br />
//                   💊 {t('doctor.details.medications')}: {visit.medications || '-'}<br />
//                   ⚠ {t('doctor.details.allergies')}: {visit.allergies || '-'}<br />
//                   📝 {t('doctor.details.notes')}: {visit.doctorNotes || '-'}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="visit-popup-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//             <button className="btn-close-popup" onClick={onClose}>
//               {t('doctor.dialog.close')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== DETAILS MODAL ====================
//   const DetailsModal = () => {
//     if (!showDetailsModal || !detailsVisitData) return null;
    
//     const visit = detailsVisitData;
//     const patient = visit.patient || {};
    
//     const formatDateTimeLocal = (iso) => {
//       if (!iso) return '-';
//       try {
//         const date = new Date(iso);
//         return date.toLocaleString(isRTL ? 'ar' : 'en-GB', {
//           day: '2-digit',
//           month: '2-digit',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         });
//       } catch {
//         return '-';
//       }
//     };

//     const buildFullNameLocal = (p) => {
//       if (!p) return '';
//       return [p.firstName, p.middleName, p.lastName].filter(Boolean).join(' ').trim() || 'Unknown';
//     };

//     const getStatusColorLocal = (status) => {
//       switch (status?.toUpperCase()) {
//         case 'COMPLETED':
//         case 'CLOSED':
//           return '#27ae60';
//         case 'IN_PROGRESS':
//           return '#f39c12';
//         case 'CANCELLED':
//           return '#e74c3c';
//         case 'CREATED':
//         case 'NEW':
//           return '#e74c3c';
//         default:
//           return '#3498db';
//       }
//     };

//     const mapDurationTypeLocal = (type) => {
//       if (!type) return '-';
//       const map = {
//         '1': 'Hour',
//         '2': 'Day',
//         '3': 'Week',
//         '4': 'Month',
//         '5': 'Year'
//       };
//       return map[type] || '-';
//     };

//     return (
//       <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
//         <div className="modal-content full-details" onClick={(e) => e.stopPropagation()} ref={detailsModalRef}>
//           <button className="modal-close" onClick={() => setShowDetailsModal(false)}>✖</button>
          
//           {loadingDetails ? (
//             <div className="loading-container">
//               <div className="loading-spinner-large"></div>
//               <p>{t('doctor.loading')}</p>
//             </div>
//           ) : (
//             <>
//               <h2>📋 {t('doctor.visit.details')} #{visit.id}</h2>
              
//               {/* PDF Buttons */}
//               <div className="pdf-buttons-container">
//                 <button 
//                   className="btn-pdf visit" 
//                   onClick={exportVisitPdf}
//                   disabled={generatingPdf}
//                 >
//                   📄 {generatingPdf ? t('doctor.pdf.generating') : t('doctor.pdf.visitReport')}
//                 </button>
//                 <button 
//                   className="btn-pdf patient" 
//                   onClick={exportPatientPdf}
//                   disabled={generatingPdf}
//                 >
//                   👤 {t('doctor.pdf.patient')}
//                 </button>
//                 <button 
//                   className="btn-pdf medical" 
//                   onClick={exportMedicalPdf}
//                   disabled={generatingPdf}
//                 >
//                   🏥 {t('doctor.pdf.medical')}
//                 </button>
//                 <button 
//                   className="btn-pdf drugs" 
//                   onClick={exportDrugsPdf}
//                   disabled={generatingPdf}
//                 >
//                   💊 {t('doctor.pdf.drugs')}
//                 </button>
//                 <button 
//                   className="btn-pdf procedures" 
//                   onClick={exportProceduresPdf}
//                   disabled={generatingPdf}
//                 >
//                   🔬 {t('doctor.pdf.procedures')}
//                 </button>
//               </div>

//               {/* Scrollable Content */}
//               <div className="details-scrollable">
//                 {/* Basic Info */}
//                 <div className="details-section basic-info">
//                   <h3>👤 {t('doctor.details.patientInfo')}</h3>
//                   <div className="info-grid">
//                     <div className="info-card">
//                       <span className="info-icon">🆔</span>
//                       <div className="info-content">
//                         <span className="info-label">{t('doctor.visit.id')}</span>
//                         <span className="info-value">{visit.id}</span>
//                       </div>
//                     </div>
//                     <div className="info-card">
//                       <span className="info-icon">👤</span>
//                       <div className="info-content">
//                         <span className="info-label">{t('doctor.details.patient')}</span>
//                         <span className="info-value">{buildFullNameLocal(patient)}</span>
//                       </div>
//                     </div>
//                     <div className="info-card">
//                       <span className="info-icon">📞</span>
//                       <div className="info-content">
//                         <span className="info-label">{t('doctor.visit.phone')}</span>
//                         <span className="info-value">{patient.phone || '-'}</span>
//                       </div>
//                     </div>
//                     <div className="info-card">
//                       <span className="info-icon">⚧</span>
//                       <div className="info-content">
//                         <span className="info-label">{t('doctor.visit.gender')}</span>
//                         <span className="info-value">{patient.gender || '-'}</span>
//                       </div>
//                     </div>
//                     <div className="info-card">
//                       <span className="info-icon">📅</span>
//                       <div className="info-content">
//                         <span className="info-label">{t('doctor.visit.visitDate')}</span>
//                         <span className="info-value">{formatDateTimeLocal(visit.visitDate)}</span>
//                       </div>
//                     </div>
//                     <div className="info-card">
//                       <span className="info-icon">📌</span>
//                       <div className="info-content">
//                         <span className="info-label">{t('doctor.visit.status')}</span>
//                         <span className="status-badge" style={{ 
//                           backgroundColor: getStatusColorLocal(visit.visitStatus),
//                           color: 'white',
//                           padding: '4px 15px',
//                           borderRadius: '12px',
//                           fontSize: '12px',
//                           fontWeight: 'bold',
//                           display: 'inline-block'
//                         }}>
//                           {visit.visitStatus || 'N/A'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Medical Info */}
//                 <div className="details-section medical-info">
//                   <h3>🏥 {t('doctor.details.medicalInfo')}</h3>
//                   <div className="medical-grid">
//                     <div className="medical-item">
//                       <div className="medical-header" style={{ color: '#E74C3C' }}>
//                         🩺 {t('doctor.details.chiefComplaint')}
//                       </div>
//                       <div className="medical-content">{visit.chiefComplaint || '-'}</div>
//                     </div>
//                     <div className="medical-item">
//                       <div className="medical-header" style={{ color: '#3498DB' }}>
//                         📜 {t('doctor.details.history')}
//                       </div>
//                       <div className="medical-content">{visit.history || '-'}</div>
//                     </div>
//                     <div className="medical-item">
//                       <div className="medical-header" style={{ color: '#2ECC71' }}>
//                         💊 {t('doctor.details.medications')}
//                       </div>
//                       <div className="medical-content">{visit.medications || '-'}</div>
//                     </div>
//                     <div className="medical-item">
//                       <div className="medical-header" style={{ color: '#F39C12' }}>
//                         ⚠ {t('doctor.details.allergies')}
//                       </div>
//                       <div className="medical-content">{visit.allergies || '-'}</div>
//                     </div>
//                     <div className="medical-item">
//                       <div className="medical-header" style={{ color: '#9B59B6' }}>
//                         📝 {t('doctor.details.notes')}
//                       </div>
//                       <div className="medical-content">{visit.doctorNotes || '-'}</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Drugs */}
//                 <div className="details-section drugs-info">
//                   <h3>💊 {t('doctor.details.prescribedDrugs')}</h3>
//                   {detailsVisitDrugs.length === 0 ? (
//                     <div className="empty-state small">📭 {t('doctor.details.noDrugs')}</div>
//                   ) : (
//                     <div className="drugs-grid">
//                       {detailsVisitDrugs.map((drug, index) => {
//                         const drugObj = drug.drug || {};
//                         return (
//                           <div key={index} className="drug-card">
//                             <div className="drug-header">
//                               <span className="drug-name">💊 {drugObj.tradeName || drug.tradeName || 'Unknown'}</span>
//                               <span className="drug-form-badge">{drugObj.dosageForm || drug.dosageForm || '-'}</span>
//                             </div>
//                             <div className="drug-details">
//                               <div className="drug-detail-row">
//                                 <span className="drug-label">💪 Strength:</span>
//                                 <span className="drug-value">
//                                   {drugObj.strength || drug.strength || '-'} {drugObj.unitType || drug.unitType || ''}
//                                 </span>
//                               </div>
//                               <div className="drug-detail-row">
//                                 <span className="drug-label">💊 Dose:</span>
//                                 <span className="drug-value">{drug.dose || '-'}</span>
//                               </div>
//                               <div className="drug-detail-row">
//                                 <span className="drug-label">⏰ Frequency:</span>
//                                 <span className="drug-value">{drug.frequency || '-'}</span>
//                               </div>
//                               <div className="drug-detail-row">
//                                 <span className="drug-label">📅 Duration:</span>
//                                 <span className="drug-value">
//                                   {drug.duration || '-'} {mapDurationTypeLocal(drug.durationType)}
//                                 </span>
//                               </div>
//                             </div>
//                             <div className="drug-instructions">
//                               📝 {drug.instructions || 'No instructions'}
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>

//                 {/* Procedures */}
//                 <div className="details-section procedures-info">
//                   <h3>🔬 {t('doctor.details.procedures')}</h3>
//                   {detailsVisitProcedures.length === 0 ? (
//                     <div className="empty-state small">📭 {t('doctor.details.noProcedures')}</div>
//                   ) : (
//                     <div className="procedures-list">
//                       {detailsVisitProcedures.map((proc, index) => {
//                         let icon = '🧪';
//                         let category = 'General';
//                         let color = '#3498DB';
                        
//                         if (proc.startsWith('[RADIOLOGY]')) {
//                           icon = '📡';
//                           category = 'Radiology';
//                           color = '#E74C3C';
//                         } else if (proc.startsWith('[LABORATORY]')) {
//                           icon = '🧫';
//                           category = 'Laboratory';
//                           color = '#2ECC71';
//                         } else if (proc.startsWith('[MEDICAL]')) {
//                           icon = '🩺';
//                           category = 'Medical';
//                           color = '#F39C12';
//                         }
                        
//                         const cleanProc = proc.replace(/\[.*?\]\s*/, '');
                        
//                         return (
//                           <div key={index} className="procedure-item" style={{ borderLeftColor: color }}>
//                             <span className="procedure-icon">{icon}</span>
//                             <div className="procedure-content">
//                               <span className="procedure-category" style={{ color: color }}>
//                                 {category}
//                               </span>
//                               <span className="procedure-name">{cleanProc}</span>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => goToPage(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => goToPage(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           {t('doctor.filter.page')} {currentPage + 1} {t('doctor.filter.of')} {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && isInitialLoad) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="loading-spinner">{t('doctor.loading')}</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="error-message">
//           <h2>⚠️ {t('doctor.error')}</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>{t('doctor.retry')}</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={openSearchPatient}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert(t('doctor.reports.comingSoon'))}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               value={currentSearchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 const newSort = !sortByDateAsc;
//                 setSortByDateAsc(newSort);
//                 const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
//                 setFilteredVisits(filtered);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={showVisitDetails}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={showVisitDetails}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>

//       {/* Visit Popup */}
//       {showVisitPopup && popupVisit && (
//         <VisitPopup
//           visit={popupVisit}
//           onClose={() => {
//             setShowVisitPopup(false);
//             setPopupVisit(null);
//           }}
//           onOpen={(id, status) => {
//             if (status === 'CLOSED') {
//               reopenVisit(id);
//             } else {
//               openVisitScreen(id, status);
//             }
//           }}
//           onDetails={(id) => {
//             setShowVisitPopup(false);
//             showVisitDetails(id);
//           }}
//         />
//       )}

//       {/* Visit Screen Modal */}
//       {showVisitScreen && selectedVisitId && (
//         <div className="visit-screen-modal-overlay" onClick={closeVisitScreen}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeVisitScreen}
//             >
//               ✖
//             </button>
//             <DoctorVisitScreen
//               doctorId={doctorId}
//               visitId={selectedVisitId}
//               initialStatus={selectedVisitStatus}
//               username={username}
//               onClose={closeVisitScreen}
//               language={locale}
//             />
//           </div>
//         </div>
//       )}

//       {/* Search Patient Modal */}
//       {showSearchPatient && (
//         <div className="visit-screen-modal-overlay" onClick={closeSearchPatient}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeSearchPatient}
//             >
//               ✖
//             </button>
//             <DoctorSearchPatientScreen
//               loggedUser={username}
//               language={locale}
//               onClose={closeSearchPatient}
//             />
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       <DetailsModal />
//     </div>
//   );
// };
// // Helper to create PDF HTML content
// const createPdfHtml = (title, content, visitId) => {
//   return `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta charset="UTF-8">
//         <title>${title}</title>
//         <style>
//           body {
//             font-family: Arial, Helvetica, sans-serif;
//             padding: 40px;
//             line-height: 1.6;
//             color: #333;
//           }
//           .header {
//             text-align: center;
//             border-bottom: 2px solid #1E90FF;
//             padding-bottom: 20px;
//             margin-bottom: 30px;
//           }
//           .header h1 {
//             color: #1E90FF;
//             margin: 0;
//             font-size: 24px;
//           }
//           .header p {
//             color: #666;
//             margin: 5px 0 0 0;
//           }
//           .section {
//             margin-bottom: 25px;
//             padding: 15px;
//             border: 1px solid #e0e0e0;
//             border-radius: 8px;
//             background: #f9f9f9;
//           }
//           .section h2 {
//             color: #2C3E50;
//             border-bottom: 2px solid #e0e0e0;
//             padding-bottom: 8px;
//             margin-top: 0;
//           }
//           .info-row {
//             display: flex;
//             padding: 5px 0;
//             border-bottom: 1px solid #f0f0f0;
//           }
//           .info-label {
//             font-weight: bold;
//             width: 150px;
//             color: #555;
//           }
//           .info-value {
//             flex: 1;
//             color: #333;
//           }
//           .drug-item {
//             background: white;
//             padding: 12px;
//             margin: 8px 0;
//             border-radius: 6px;
//             border: 1px solid #e0e0e0;
//           }
//           .drug-name {
//             font-weight: bold;
//             color: #2C3E50;
//             font-size: 16px;
//           }
//           .drug-detail {
//             display: flex;
//             padding: 3px 0;
//             font-size: 14px;
//           }
//           .drug-label {
//             font-weight: bold;
//             width: 120px;
//             color: #666;
//           }
//           .procedure-item {
//             padding: 8px 12px;
//             margin: 5px 0;
//             background: white;
//             border-radius: 4px;
//             border-left: 4px solid #3498DB;
//           }
//           .procedure-category {
//             font-size: 12px;
//             font-weight: bold;
//             color: #3498DB;
//           }
//           .procedure-name {
//             font-size: 14px;
//             color: #333;
//           }
//           .footer {
//             text-align: center;
//             margin-top: 40px;
//             padding-top: 20px;
//             border-top: 1px solid #e0e0e0;
//             color: #999;
//             font-size: 12px;
//           }
//           .badge {
//             display: inline-block;
//             padding: 2px 12px;
//             border-radius: 12px;
//             color: white;
//             font-weight: bold;
//             font-size: 12px;
//           }
//           .badge-created { background: #e74c3c; }
//           .badge-inprogress { background: #f39c12; }
//           .badge-closed { background: #27ae60; }
//           .badge-default { background: #3498db; }
//           .section-divider {
//             border-top: 2px dashed #e0e0e0;
//             margin: 20px 0;
//           }
//         </style>
//       </head>
//       <body>
//         ${content}
//         <div class="footer">
//           Generated on ${new Date().toLocaleString()}
//         </div>
//       </body>
//     </html>
//   `;
// };

// // Generate and download PDF
// const generatePDF = useCallback((title, content, filename) => {
//   setGeneratingPdf(true);
  
//   try {
//     const htmlContent = createPdfHtml(title, content, '');
//     const blob = new Blob([htmlContent], { type: 'text/html' });
//     const url = window.URL.createObjectURL(blob);
    
//     const link = document.createElement('a');
//     link.href = url;
//     link.download = `${filename}.html`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
    
//     alert(t('doctor.pdf.success'));
//   } catch (error) {
//     console.error('PDF generation error:', error);
//     alert(t('doctor.pdf.error') + ': ' + error.message);
//   } finally {
//     setGeneratingPdf(false);
//   }
// }, [t]);

// // ==================== PDF EXPORT FUNCTIONS ====================

// // 1. Export Full Visit Report (All Sections)
// const exportFullVisitPdf = useCallback(() => {
//   if (!detailsVisitData) return;
  
//   const visit = detailsVisitData;
//   const patient = visit.patient || {};
//   const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
//                       visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
//                       visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
  
//   // Patient Info Section
//   const patientSection = `
//     <div class="section">
//       <h2>👤 ${t('doctor.details.patientInfo')}</h2>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.visit.id')}</span>
//         <span class="info-value">${visit.id}</span>
//       </div>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.details.patient')}</span>
//         <span class="info-value">${buildFullName(patient)}</span>
//       </div>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.visit.phone')}</span>
//         <span class="info-value">${patient.phone || '-'}</span>
//       </div>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.visit.gender')}</span>
//         <span class="info-value">${patient.gender || '-'}</span>
//       </div>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.visit.visitDate')}</span>
//         <span class="info-value">${formatDateTime(visit.visitDate)}</span>
//       </div>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.visit.status')}</span>
//         <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
//       </div>
//     </div>
//   `;

//   // Medical Info Section
//   const medicalSection = `
//     <div class="section">
//       <h2>🏥 ${t('doctor.details.medicalInfo')}</h2>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.details.chiefComplaint')}</span>
//         <span class="info-value">${visit.chiefComplaint || '-'}</span>
//       </div>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.details.history')}</span>
//         <span class="info-value">${visit.history || '-'}</span>
//       </div>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.details.medications')}</span>
//         <span class="info-value">${visit.medications || '-'}</span>
//       </div>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.details.allergies')}</span>
//         <span class="info-value">${visit.allergies || '-'}</span>
//       </div>
//       <div class="info-row">
//         <span class="info-label">${t('doctor.details.notes')}</span>
//         <span class="info-value">${visit.doctorNotes || '-'}</span>
//       </div>
//     </div>
//   `;

//   // Drugs Section
//   let drugsHtml = '';
//   if (detailsVisitDrugs.length === 0) {
//     drugsHtml = '<p style="color: #999; font-style: italic;">No drugs prescribed</p>';
//   } else {
//     detailsVisitDrugs.forEach((drug) => {
//       const drugObj = drug.drug || {};
//       drugsHtml += `
//         <div class="drug-item">
//           <div class="drug-name">💊 ${drugObj.tradeName || drug.tradeName || 'Unknown'}</div>
//           <div class="drug-detail">
//             <span class="drug-label">Strength:</span>
//             <span>${drugObj.strength || drug.strength || '-'} ${drugObj.unitType || drug.unitType || ''}</span>
//           </div>
//           <div class="drug-detail">
//             <span class="drug-label">Dose:</span>
//             <span>${drug.dose || '-'}</span>
//           </div>
//           <div class="drug-detail">
//             <span class="drug-label">Frequency:</span>
//             <span>${drug.frequency || '-'}</span>
//           </div>
//           <div class="drug-detail">
//             <span class="drug-label">Duration:</span>
//             <span>${drug.duration || '-'} ${mapDurationType(drug.durationType)}</span>
//           </div>
//           <div class="drug-detail">
//             <span class="drug-label">Instructions:</span>
//             <span>${drug.instructions || 'No instructions'}</span>
//           </div>
//         </div>
//       `;
//     });
//   }

//   const drugsSection = `
//     <div class="section">
//       <h2>💊 ${t('doctor.details.prescribedDrugs')}</h2>
//       ${drugsHtml}
//     </div>
//   `;

//   // Procedures Section
//   let proceduresHtml = '';
//   if (detailsVisitProcedures.length === 0) {
//     proceduresHtml = '<p style="color: #999; font-style: italic;">No procedures performed</p>';
//   } else {
//     detailsVisitProcedures.forEach((proc) => {
//       let icon = '🧪';
//       let category = 'General';
//       let color = '#3498DB';
      
//       if (proc.startsWith('[RADIOLOGY]')) {
//         icon = '📡';
//         category = 'Radiology';
//         color = '#E74C3C';
//       } else if (proc.startsWith('[LABORATORY]')) {
//         icon = '🧫';
//         category = 'Laboratory';
//         color = '#2ECC71';
//       } else if (proc.startsWith('[MEDICAL]')) {
//         icon = '🩺';
//         category = 'Medical';
//         color = '#F39C12';
//       }
      
//       const cleanProc = proc.replace(/\[.*?\]\s*/, '');
      
//       proceduresHtml += `
//         <div class="procedure-item" style="border-left-color: ${color};">
//           <div class="procedure-category" style="color: ${color};">${icon} ${category}</div>
//           <div class="procedure-name">${cleanProc}</div>
//         </div>
//       `;
//     });
//   }

//   const proceduresSection = `
//     <div class="section">
//       <h2>🔬 ${t('doctor.details.procedures')}</h2>
//       ${proceduresHtml}
//     </div>
//   `;

//   const content = `
//     <div class="header">
//       <h1>${t('doctor.details.visitReport')}</h1>
//       <p>Visit #${visit.id}</p>
//     </div>
//     ${patientSection}
//     ${medicalSection}
//     ${drugsSection}
//     ${proceduresSection}
//   `;

//   generatePDF(t('doctor.details.visitReport'), content, `Visit_${visit.id}_Full_Report`);
// }, [detailsVisitData, detailsVisitDrugs, detailsVisitProcedures, buildFullName, formatDateTime, mapDurationType, generatePDF, t]);

// export default DoctorHomePage;   04072026 11:30 pm


// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import DoctorVisitScreen from '../DoctorHomePage/DoctorVisitScreen';
// import DoctorSearchPatientScreen from '../DoctorHomePage/DoctorSearchPatientScreen';
// import './DoctorHomePage.css';

// // Constants
// const SIDEBAR_WIDTH = 250;
// const SIDEBAR_COLLAPSED = 55;
// const PAGE_SIZE = 40;

// // ==================== LOCALIZATION ====================
// // English translations
// const EN_BUNDLE = {
//   'doctor.home.title': 'Doctor Dashboard',
//   'doctor.home.welcome': 'Welcome, {0}',
//   'doctor.sidebar.menu': 'Menu',
//   'doctor.sidebar.searchPatient': 'Search Patient',
//   'doctor.sidebar.reports': 'Reports',
//   'doctor.sidebar.changePassword': 'Change Password',
//   'doctor.sidebar.logout': 'Logout',
//   'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
//   'doctor.dashboard.todayVisits': "Today's Visits",
//   'doctor.dashboard.totalVisits': 'Total Visits',
//   'doctor.dashboard.newVisits': 'New Visits',
//   'doctor.dashboard.closedVisits': 'Closed Visits',
//   'doctor.performance.title': '📊 Performance Overview',
//   'doctor.performance.patientsSeen': 'Patients Seen Today',
//   'doctor.performance.openVisits': 'Open Visits',
//   'doctor.performance.completedToday': 'Completed Today',
//   'doctor.performance.completionRate': 'Completion Rate',
//   'doctor.filter.today': 'Today',
//   'doctor.filter.all': 'All',
//   'doctor.filter.new': 'New',
//   'doctor.filter.inProgress': 'In Progress',
//   'doctor.filter.closed': 'Closed',
//   'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
//   'doctor.filter.sortAsc': 'Sort Asc',
//   'doctor.filter.sortDesc': 'Sort Desc',
//   'doctor.filter.cardView1': '1 Column',
//   'doctor.filter.cardView2': '2 Columns',
//   'doctor.filter.cardView3': '3 Columns',
//   'doctor.filter.cardDisplay': 'Layout',
//   'doctor.filter.refresh': 'Refresh',
//   'doctor.filter.noResults': 'No visits found',
//   'doctor.visit.id': 'ID',
//   'doctor.visit.age': 'Age',
//   'doctor.visit.type': 'Type',
//   'doctor.visit.open': 'Open',
//   'doctor.visit.details': 'Details',
//   'doctor.visit.reopen': 'Reopen',
//   'doctor.visit.reopened': 'Visit reopened successfully',
//   'doctor.visit.reopenFailed': 'Failed to reopen visit',
//   'doctor.visit.reopenError': 'Error reopening visit',
//   'doctor.visit.loadError': 'Failed to load visits',
//   'doctor.findVisit.prompt': 'Enter Visit ID...',
//   'doctor.findVisit.notFound': 'Visit #{0} not found',
//   'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
//   'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
//   'doctor.findVisit.errorFetch': 'Error fetching visit',
//   'doctor.notifications.title': 'Notifications',
//   'doctor.notifications.noOpen': 'No open visits',
//   'doctor.notifications.openVisits': 'Open Visits',
//   'doctor.notifications.visitId': 'Visit ID',
//   'doctor.notifications.patient': 'Patient',
//   'doctor.notifications.status': 'Status',
//   'doctor.password.title': 'Change Password',
//   'doctor.password.old': 'Old Password',
//   'doctor.password.new': 'New Password',
//   'doctor.password.confirm': 'Confirm Password',
//   'doctor.password.save': 'Save',
//   'doctor.password.fillAll': 'Please fill all fields',
//   'doctor.password.notMatch': 'New passwords do not match',
//   'doctor.password.success': 'Password changed successfully',
//   'doctor.password.error': 'Error changing password',
//   'doctor.details.patientInfo': 'Patient Information',
//   'doctor.details.medicalInfo': 'Medical Information',
//   'doctor.details.prescribedDrugs': 'Prescribed Drugs',
//   'doctor.details.noDrugs': 'No drugs prescribed',
//   'doctor.details.procedures': 'Procedures',
//   'doctor.details.noProcedures': 'No procedures performed',
//   'doctor.details.patient': 'Patient',
//   'doctor.details.chiefComplaint': 'Chief Complaint',
//   'doctor.details.history': 'History',
//   'doctor.details.medications': 'Medications',
//   'doctor.details.allergies': 'Allergies',
//   'doctor.details.notes': 'Doctor Notes',
//   'doctor.visit.phone': 'Phone',
//   'doctor.visit.gender': 'Gender',
//   'doctor.visit.visitDate': 'Visit Date',
//   'doctor.visit.status': 'Status',
//   'doctor.dialog.close': 'Close',
//   'doctor.pdf.patient': 'Patient Info',
//   'doctor.pdf.medical': 'Medical Info',
//   'doctor.pdf.drugs': 'Drugs Report',
//   'doctor.pdf.procedures': 'Procedures Report',
//   'doctor.pdf.visitReport': 'Visit Report',
//   'doctor.pdf.patientLabel': 'Patient',
//   'doctor.pdf.doctorLabel': 'Doctor',
//   'doctor.pdf.dateLabel': 'Date',
//   'doctor.pdf.patientInfo': 'Patient Information',
//   'doctor.pdf.medicalInfo': 'Medical Information',
//   'doctor.pdf.drugsReport': 'Drugs Report',
//   'doctor.pdf.proceduresReport': 'Procedures Report',
//   'doctor.filter.page': 'Page',
//   'doctor.filter.of': 'of',
//   'doctor.loading': 'Loading...',
//   'doctor.error': 'Error',
//   'doctor.retry': 'Retry',
//   'doctor.reports.comingSoon': 'Reports feature coming soon',
//   'doctor.details.visitReport': 'Visit Report',
//   'doctor.details.dateLabel': 'Date',
//   'doctor.details.patientLabel': 'Patient',
//   'doctor.details.doctorLabel': 'Doctor',
//   'doctor.pdf.generating': 'Generating PDF...',
//   'doctor.pdf.downloading': 'Downloading PDF...',
//   'doctor.pdf.success': 'PDF downloaded successfully',
//   'doctor.pdf.error': 'Error generating PDF',
//   // Add to EN_BUNDLE
// 'doctor.pdf.fullReport': 'Full Report',
// 'doctor.pdf.patientDrugs': 'Patient + Drugs',
// 'doctor.pdf.patientProcedures': 'Patient + Procedures'
// };

// // Arabic translations
// const AR_BUNDLE = {
//   'doctor.home.title': 'لوحة تحكم الطبيب',
//   'doctor.home.welcome': 'مرحباً, {0}',
//   'doctor.sidebar.menu': 'القائمة',
//   'doctor.sidebar.searchPatient': 'بحث عن مريض',
//   'doctor.sidebar.reports': 'التقارير',
//   'doctor.sidebar.changePassword': 'تغيير كلمة المرور',
//   'doctor.sidebar.logout': 'تسجيل الخروج',
//   'doctor.sidebar.logoutConfirm': 'هل أنت متأكد من تسجيل الخروج؟',
//   'doctor.dashboard.todayVisits': 'زيارات اليوم',
//   'doctor.dashboard.totalVisits': 'إجمالي الزيارات',
//   'doctor.dashboard.newVisits': 'زيارات جديدة',
//   'doctor.dashboard.closedVisits': 'زيارات مغلقة',
//   'doctor.performance.title': '📊 نظرة عامة على الأداء',
//   'doctor.performance.patientsSeen': 'المرضى اليوم',
//   'doctor.performance.openVisits': 'زيارات مفتوحة',
//   'doctor.performance.completedToday': 'مكتمل اليوم',
//   'doctor.performance.completionRate': 'نسبة الإنجاز',
//   'doctor.filter.today': 'اليوم',
//   'doctor.filter.all': 'الكل',
//   'doctor.filter.new': 'جديد',
//   'doctor.filter.inProgress': 'قيد التنفيذ',
//   'doctor.filter.closed': 'مغلق',
//   'doctor.filter.searchPrompt': 'بحث بالاسم أو رقم الهاتف أو المعرف...',
//   'doctor.filter.sortAsc': 'ترتيب تصاعدي',
//   'doctor.filter.sortDesc': 'ترتيب تنازلي',
//   'doctor.filter.cardView1': 'عمود واحد',
//   'doctor.filter.cardView2': 'عمودان',
//   'doctor.filter.cardView3': 'ثلاثة أعمدة',
//   'doctor.filter.cardDisplay': 'تخطيط',
//   'doctor.filter.refresh': 'تحديث',
//   'doctor.filter.noResults': 'لا توجد زيارات',
//   'doctor.visit.id': 'المعرف',
//   'doctor.visit.age': 'العمر',
//   'doctor.visit.type': 'النوع',
//   'doctor.visit.open': 'فتح',
//   'doctor.visit.details': 'تفاصيل',
//   'doctor.visit.reopen': 'إعادة فتح',
//   'doctor.visit.reopened': 'تم إعادة فتح الزيارة بنجاح',
//   'doctor.visit.reopenFailed': 'فشل إعادة فتح الزيارة',
//   'doctor.visit.reopenError': 'خطأ في إعادة فتح الزيارة',
//   'doctor.visit.loadError': 'فشل تحميل الزيارات',
//   'doctor.findVisit.prompt': 'أدخل معرف الزيارة...',
//   'doctor.findVisit.notFound': 'الزيارة رقم {0} غير موجودة',
//   'doctor.findVisit.invalidAlert': 'الرجاء إدخال معرف زيارة صحيح',
//   'doctor.findVisit.emptyAlert': 'الرجاء إدخال معرف الزيارة',
//   'doctor.findVisit.errorFetch': 'خطأ في جلب الزيارة',
//   'doctor.notifications.title': 'الإشعارات',
//   'doctor.notifications.noOpen': 'لا توجد زيارات مفتوحة',
//   'doctor.notifications.openVisits': 'الزيارات المفتوحة',
//   'doctor.notifications.visitId': 'معرف الزيارة',
//   'doctor.notifications.patient': 'المريض',
//   'doctor.notifications.status': 'الحالة',
//   'doctor.password.title': 'تغيير كلمة المرور',
//   'doctor.password.old': 'كلمة المرور القديمة',
//   'doctor.password.new': 'كلمة المرور الجديدة',
//   'doctor.password.confirm': 'تأكيد كلمة المرور',
//   'doctor.password.save': 'حفظ',
//   'doctor.password.fillAll': 'الرجاء ملء جميع الحقول',
//   'doctor.password.notMatch': 'كلمات المرور غير متطابقة',
//   'doctor.password.success': 'تم تغيير كلمة المرور بنجاح',
//   'doctor.password.error': 'خطأ في تغيير كلمة المرور',
//   'doctor.details.patientInfo': 'معلومات المريض',
//   'doctor.details.medicalInfo': 'المعلومات الطبية',
//   'doctor.details.prescribedDrugs': 'الأدوية الموصوفة',
//   'doctor.details.noDrugs': 'لا توجد أدوية موصوفة',
//   'doctor.details.procedures': 'الإجراءات',
//   'doctor.details.noProcedures': 'لا توجد إجراءات',
//   'doctor.details.patient': 'المريض',
//   'doctor.details.chiefComplaint': 'الشكوى الرئيسية',
//   'doctor.details.history': 'التاريخ الطبي',
//   'doctor.details.medications': 'الأدوية',
//   'doctor.details.allergies': 'الحساسية',
//   'doctor.details.notes': 'ملاحظات الطبيب',
//   'doctor.visit.phone': 'الهاتف',
//   'doctor.visit.gender': 'الجنس',
//   'doctor.visit.visitDate': 'تاريخ الزيارة',
//   'doctor.visit.status': 'الحالة',
//   'doctor.dialog.close': 'إغلاق',
//   'doctor.pdf.patient': 'معلومات المريض',
//   'doctor.pdf.medical': 'المعلومات الطبية',
//   'doctor.pdf.drugs': 'تقرير الأدوية',
//   'doctor.pdf.procedures': 'تقرير الإجراءات',
//   'doctor.pdf.visitReport': 'تقرير الزيارة',
//   'doctor.pdf.patientLabel': 'المريض',
//   'doctor.pdf.doctorLabel': 'الطبيب',
//   'doctor.pdf.dateLabel': 'التاريخ',
//   'doctor.pdf.patientInfo': 'معلومات المريض',
//   'doctor.pdf.medicalInfo': 'المعلومات الطبية',
//   'doctor.pdf.drugsReport': 'تقرير الأدوية',
//   'doctor.pdf.proceduresReport': 'تقرير الإجراءات',
//   'doctor.filter.page': 'صفحة',
//   'doctor.filter.of': 'من',
//   'doctor.loading': 'جاري التحميل...',
//   'doctor.error': 'خطأ',
//   'doctor.retry': 'إعادة المحاولة',
//   'doctor.reports.comingSoon': 'ميزة التقارير قريباً',
//   'doctor.details.visitReport': 'تقرير الزيارة',
//   'doctor.details.dateLabel': 'التاريخ',
//   'doctor.details.patientLabel': 'المريض',
//   'doctor.details.doctorLabel': 'الطبيب',
//   'doctor.pdf.generating': 'جاري إنشاء PDF...',
//   'doctor.pdf.downloading': 'جاري تحميل PDF...',
//   'doctor.pdf.success': 'تم تحميل PDF بنجاح',
//   'doctor.pdf.error': 'خطأ في إنشاء PDF',
//   // Add to AR_BUNDLE
// 'doctor.pdf.fullReport': 'تقرير كامل',
// 'doctor.pdf.patientDrugs': 'المريض + الأدوية',
// 'doctor.pdf.patientProcedures': 'المريض + الإجراءات',
// };

// const DoctorHomePage = ({ doctorId, username, language: propLanguage }) => {
//   // ==================== API BASE URL ====================
//   const API_BASE_URL = BASE_URL;

//   // ==================== GET LANGUAGE FROM LOCALSTORAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = localStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== STATE ====================
//   const [showVisitPopup, setShowVisitPopup] = useState(false);
//   const [popupVisit, setPopupVisit] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isGridLayout, setIsGridLayout] = useState(true);
//   const [sortByDateAsc, setSortByDateAsc] = useState(true);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [visitsCache, setVisitsCache] = useState([]);
//   const [filteredVisits, setFilteredVisits] = useState([]);
//   const [currentFilter, setCurrentFilter] = useState('TODAY');
//   const [currentSearchQuery, setCurrentSearchQuery] = useState('');
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [lastNotificationCount, setLastNotificationCount] = useState(0);
//   const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
//   const [cardsPerRowPattern] = useState([1, 2, 3]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [locale, setLocale] = useState(getLanguage());
  
//   // ==================== SEARCH PATIENT SCREEN STATE ====================
//   const [showSearchPatient, setShowSearchPatient] = useState(false);
  
//   // ==================== DETAILS MODAL STATE ====================
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [detailsVisitData, setDetailsVisitData] = useState(null);
//   const [detailsVisitDrugs, setDetailsVisitDrugs] = useState([]);
//   const [detailsVisitProcedures, setDetailsVisitProcedures] = useState([]);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [generatingPdf, setGeneratingPdf] = useState(false);
  
//   // ==================== LOCALIZATION ====================
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   const isRTL = locale === 'ar';

//   // ==================== VISIT SCREEN STATE ====================
//   const [showVisitScreen, setShowVisitScreen] = useState(false);
//   const [selectedVisitId, setSelectedVisitId] = useState(null);
//   const [selectedVisitStatus, setSelectedVisitStatus] = useState('NEW');
  
//   // Dashboard summary stats
//   const [summaryStats, setSummaryStats] = useState({
//     today: 0,
//     total: 0,
//     open: 0,
//     closed: 0
//   });
  
//   // Performance widget stats
//   const [performanceStats, setPerformanceStats] = useState({
//     patientsSeen: 0,
//     openVisits: 0,
//     completedToday: 0,
//     completionRate: 0
//   });

//   // Filter counts
//   const [filterCounts, setFilterCounts] = useState({
//     TODAY: 0,
//     ALL: 0,
//     NEW: 0,
//     IN_PROGRESS: 0,
//     CLOSED: 0
//   });

//   // Refs
//   const scrollPaneRef = useRef(null);
//   const autoRefreshInterval = useRef(null);
//   const notificationInterval = useRef(null);
//   const mountedRef = useRef(true);
//   const detailsModalRef = useRef(null);

//   // ==================== API CALLS WITH ERROR HANDLING ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${API_BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const text = await response.text();
//       if (!text || text.trim() === '') {
//         throw new Error('Empty response');
//       }
      
//       try {
//         const json = JSON.parse(text);
//         return json;
//       } catch (e) {
//         throw new Error('Invalid JSON response');
//       }
//     } catch (error) {
//       console.error('API Error:', error.message);
//       throw error;
//     }
//   }, [API_BASE_URL]);

//   // ==================== UTILITY FUNCTIONS ====================
//   const buildFullName = useCallback((patient) => {
//     if (!patient) return '';
//     return [patient.firstName, patient.middleName, patient.lastName]
//       .filter(Boolean)
//       .join(' ')
//       .trim() || 'Unknown';
//   }, []);

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
//       return age > 0 ? age.toString() : '0';
//     } catch (e) {
//       return '-';
//     }
//   }, []);

//   const formatDateTime = useCallback((iso) => {
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
//     } catch (e) {
//       return '-';
//     }
//   }, [isRTL]);

//   const getStatusColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#e74c3c';
//       case 'IN_PROGRESS': return '#f39c12';
//       case 'CLOSED': return '#27ae60';
//       default: return '#3498db';
//     }
//   }, []);

//   const getStatusBgColor = useCallback((status) => {
//     switch (status) {
//       case 'CREATED': return '#fff5f5';
//       case 'IN_PROGRESS': return '#fffbf0';
//       case 'CLOSED': return '#f0fff4';
//       default: return 'white';
//     }
//   }, []);

//   const mapDurationType = useCallback((type) => {
//     if (!type) return '-';
//     const map = {
//       '1': 'Hour',
//       '2': 'Day',
//       '3': 'Week',
//       '4': 'Month',
//       '5': 'Year'
//     };
//     return map[type] || '-';
//   }, []);

//   const updateFilterCounts = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
//     visits.forEach(visit => {
//       counts.ALL++;
//       const status = visit.visitStatus || 'CREATED';
//       if (status === 'CREATED') counts.NEW++;
//       else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
//       else if (status === 'CLOSED') counts.CLOSED++;
      
//       if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
//         counts.TODAY++;
//       }
//     });
    
//     setFilterCounts(counts);
//   }, []);

//   const updatePerformanceStats = useCallback((visits) => {
//     const today = new Date().toDateString();
//     let patientsSeen = 0;
//     let openVisits = 0;
//     let completedToday = 0;
    
//     visits.forEach(visit => {
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
//       if (visitDate === today) {
//         patientsSeen++;
//         if (status === 'CLOSED') completedToday++;
//       }
      
//       if (status !== 'CLOSED') openVisits++;
//     });
    
//     const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
//     setPerformanceStats({
//       patientsSeen,
//       openVisits,
//       completedToday,
//       completionRate: Math.round(completionRate * 10) / 10
//     });
//   }, []);

//   // ==================== FILTERING FUNCTION ====================
//   const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
//     const q = searchQuery.toLowerCase().trim();
//     const today = new Date().toDateString();
    
//     let filtered = visits.filter(visit => {
//       const patient = visit.patient || {};
//       const name = buildFullName(patient).toLowerCase();
//       const phone = (patient.phone || '').toLowerCase();
//       const visitId = String(visit.id || '');
      
//       const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
//       const status = visit.visitStatus || 'CREATED';
//       const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
//       const isToday = visitDate && visitDate.toDateString() === today;
      
//       let statusMatches = true;
//       switch (filter) {
//         case 'TODAY':
//           statusMatches = isToday;
//           break;
//         case 'NEW':
//           statusMatches = status === 'CREATED';
//           break;
//         case 'IN_PROGRESS':
//           statusMatches = status === 'IN_PROGRESS';
//           break;
//         case 'CLOSED':
//           statusMatches = status === 'CLOSED';
//           break;
//         case 'ALL':
//           statusMatches = true;
//           break;
//         default:
//           statusMatches = true;
//       }
      
//       return matchesSearch && statusMatches;
//     });
    
//     filtered.sort((a, b) => {
//       const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
//       const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
//       return sortAsc ? dateA - dateB : dateB - dateA;
//     });
    
//     return filtered;
//   }, [buildFullName]);

//   // ==================== LOAD FUNCTIONS ====================
//   const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {
//     if (resetPage) {
//       setCurrentPage(0);
//     }

//     setCurrentFilter(filter);
//     setCurrentSearchQuery('');
//     setLoading(true);
//     setError(null);

//     try {
//       const pageToUse = pageOverride !== null ? pageOverride : (resetPage ? 0 : currentPage);
//       const endpoint = `/api/visits/doctor/${doctorId}?page=${pageToUse}&size=${PAGE_SIZE}`;

//       const data = await apiFetch(endpoint);

//       const visits = data.content || [];
//       const total = data.totalPages || 1;

//       setTotalPages(total);
//       setVisitsCache(visits);

//       updateFilterCounts(visits);
//       updatePerformanceStats(visits);

//       const filtered = filterVisits(visits, filter, '', sortByDateAsc);
//       setFilteredVisits(filtered);

//       if (scrollPaneRef.current) {
//         scrollPaneRef.current.scrollTop = 0;
//       }
//     } catch (err) {
//       setError(t('doctor.visit.loadError') || 'Failed to load visits');
//       console.error('Error loading visits:', err);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, [doctorId, sortByDateAsc, t, apiFetch, filterVisits, updateFilterCounts, updatePerformanceStats]);

//   const loadSummaryCards = useCallback(async () => {
//     try {
//       const endpoint = `/api/visits/doctor/${doctorId}/summary`;
//       const data = await apiFetch(endpoint);
//       setSummaryStats({
//         today: data.totalToday || 0,
//         total: data.totalVisits || 0,
//         open: data.totalOpen || 0,
//         closed: data.totalClosed || 0
//       });
//     } catch (error) {
//       console.error('Error loading summary:', error);
//     }
//   }, [doctorId, apiFetch]);

//   const findVisitById = useCallback(async (visitId) => {
//     if (!visitId) {
//       alert(t('doctor.findVisit.emptyAlert'));
//       return;
//     }
    
//     try {
//       const endpoint = `/api/visits/find/${visitId}`;
//       const visit = await apiFetch(endpoint);
//       setPopupVisit(visit);
//       setShowVisitPopup(true);
//     } catch (error) {
//       alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
//     }
//   }, [t, apiFetch]);

//   // ==================== PDF GENERATION FUNCTIONS ====================
//   const createPdfHtml = useCallback((title, content, visitId) => {
//     return `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <meta charset="UTF-8">
//           <title>${title}</title>
//           <style>
//             body {
//               font-family: Arial, Helvetica, sans-serif;
//               padding: 40px;
//               line-height: 1.6;
//               color: #333;
//             }
//             .header {
//               text-align: center;
//               border-bottom: 2px solid #1E90FF;
//               padding-bottom: 20px;
//               margin-bottom: 30px;
//             }
//             .header h1 {
//               color: #1E90FF;
//               margin: 0;
//               font-size: 24px;
//             }
//             .header p {
//               color: #666;
//               margin: 5px 0 0 0;
//             }
//             .section {
//               margin-bottom: 25px;
//               padding: 15px;
//               border: 1px solid #e0e0e0;
//               border-radius: 8px;
//               background: #f9f9f9;
//             }
//             .section h2 {
//               color: #2C3E50;
//               border-bottom: 2px solid #e0e0e0;
//               padding-bottom: 8px;
//               margin-top: 0;
//             }
//             .info-row {
//               display: flex;
//               padding: 5px 0;
//               border-bottom: 1px solid #f0f0f0;
//             }
//             .info-label {
//               font-weight: bold;
//               width: 150px;
//               color: #555;
//             }
//             .info-value {
//               flex: 1;
//               color: #333;
//             }
//             .drug-item {
//               background: white;
//               padding: 12px;
//               margin: 8px 0;
//               border-radius: 6px;
//               border: 1px solid #e0e0e0;
//             }
//             .drug-name {
//               font-weight: bold;
//               color: #2C3E50;
//               font-size: 16px;
//             }
//             .drug-detail {
//               display: flex;
//               padding: 3px 0;
//               font-size: 14px;
//             }
//             .drug-label {
//               font-weight: bold;
//               width: 120px;
//               color: #666;
//             }
//             .procedure-item {
//               padding: 8px 12px;
//               margin: 5px 0;
//               background: white;
//               border-radius: 4px;
//               border-left: 4px solid #3498DB;
//             }
//             .procedure-category {
//               font-size: 12px;
//               font-weight: bold;
//               color: #3498DB;
//             }
//             .procedure-name {
//               font-size: 14px;
//               color: #333;
//             }
//             .footer {
//               text-align: center;
//               margin-top: 40px;
//               padding-top: 20px;
//               border-top: 1px solid #e0e0e0;
//               color: #999;
//               font-size: 12px;
//             }
//             .badge {
//               display: inline-block;
//               padding: 2px 12px;
//               border-radius: 12px;
//               color: white;
//               font-weight: bold;
//               font-size: 12px;
//             }
//             .badge-created { background: #e74c3c; }
//             .badge-inprogress { background: #f39c12; }
//             .badge-closed { background: #27ae60; }
//             .badge-default { background: #3498db; }
//             .section-divider {
//               border-top: 2px dashed #e0e0e0;
//               margin: 20px 0;
//             }
//           </style>
//         </head>
//         <body>
//           ${content}
//           <div class="footer">
//             Generated on ${new Date().toLocaleString()}
//           </div>
//         </body>
//       </html>
//     `;
//   }, []);

//   const generatePDF = useCallback((title, content, filename) => {
//     setGeneratingPdf(true);
    
//     try {
//       const htmlContent = createPdfHtml(title, content, '');
//       const blob = new Blob([htmlContent], { type: 'text/html' });
//       const url = window.URL.createObjectURL(blob);
      
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `${filename}.html`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
      
//       alert(t('doctor.pdf.success'));
//     } catch (error) {
//       console.error('PDF generation error:', error);
//       alert(t('doctor.pdf.error') + ': ' + error.message);
//     } finally {
//       setGeneratingPdf(false);
//     }
//   }, [createPdfHtml, t]);

//   // ==================== SHOW VISIT DETAILS ====================
//   // ==================== SHOW VISIT DETAILS ====================
// const showVisitDetails = useCallback(async (visitId) => {
//   setLoadingDetails(true);
//   setShowDetailsModal(true);

//   try {
//     // Fetch visit details - this already includes drugs and procedures
//     const visitData = await apiFetch(`/api/visits/${visitId}`);
//     setDetailsVisitData(visitData);

//     // Extract drugs from the visit data directly
//     const visitDrugs = visitData.visitDrugs || [];
//     setDetailsVisitDrugs(visitDrugs);

//     // Extract procedures from the visit data directly
//     const visitProcedures = visitData.procedures || [];
//     setDetailsVisitProcedures(visitProcedures);

//   } catch (error) {
//     alert(t('doctor.visit.loadError') + ': ' + error.message);
//     setShowDetailsModal(false);
//   } finally {
//     setLoadingDetails(false);
//   }
// }, [apiFetch, t]);

//   // ==================== PDF EXPORT FUNCTIONS ====================
  
//   // 1. Export Full Visit Report (All Sections Combined)
//   const exportFullVisitPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
//     const patient = visit.patient || {};
//     const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
//                         visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
//                         visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
    
//     let drugsHtml = '';
//     if (detailsVisitDrugs.length === 0) {
//       drugsHtml = '<p style="color: #999; font-style: italic;">No drugs prescribed</p>';
//     } else {
//       detailsVisitDrugs.forEach((drug) => {
//         const drugObj = drug.drug || {};
//         drugsHtml += `
//           <div class="drug-item">
//             <div class="drug-name">💊 ${drugObj.tradeName || drug.tradeName || 'Unknown'}</div>
//             <div class="drug-detail">
//               <span class="drug-label">Strength:</span>
//               <span>${drugObj.strength || drug.strength || '-'} ${drugObj.unitType || drug.unitType || ''}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Dose:</span>
//               <span>${drug.dose || '-'}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Frequency:</span>
//               <span>${drug.frequency || '-'}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Duration:</span>
//               <span>${drug.duration || '-'} ${mapDurationType(drug.durationType)}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Instructions:</span>
//               <span>${drug.instructions || 'No instructions'}</span>
//             </div>
//           </div>
//         `;
//       });
//     }

//     let proceduresHtml = '';
//     if (detailsVisitProcedures.length === 0) {
//       proceduresHtml = '<p style="color: #999; font-style: italic;">No procedures performed</p>';
//     } else {
//       detailsVisitProcedures.forEach((proc) => {
//         let icon = '🧪';
//         let category = 'General';
//         let color = '#3498DB';
        
//         if (proc.startsWith('[RADIOLOGY]')) {
//           icon = '📡';
//           category = 'Radiology';
//           color = '#E74C3C';
//         } else if (proc.startsWith('[LABORATORY]')) {
//           icon = '🧫';
//           category = 'Laboratory';
//           color = '#2ECC71';
//         } else if (proc.startsWith('[MEDICAL]')) {
//           icon = '🩺';
//           category = 'Medical';
//           color = '#F39C12';
//         }
        
//         const cleanProc = proc.replace(/\[.*?\]\s*/, '');
        
//         proceduresHtml += `
//           <div class="procedure-item" style="border-left-color: ${color};">
//             <div class="procedure-category" style="color: ${color};">${icon} ${category}</div>
//             <div class="procedure-name">${cleanProc}</div>
//           </div>
//         `;
//       });
//     }

//     const content = `
//       <div class="header">
//         <h1>${t('doctor.details.visitReport')}</h1>
//         <p>Complete Report - Visit #${visit.id}</p>
//       </div>

//       <div class="section">
//         <h2>👤 ${t('doctor.details.patientInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.id')}</span>
//           <span class="info-value">${visit.id}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.patient')}</span>
//           <span class="info-value">${buildFullName(patient)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.phone')}</span>
//           <span class="info-value">${patient.phone || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.gender')}</span>
//           <span class="info-value">${patient.gender || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.visitDate')}</span>
//           <span class="info-value">${formatDateTime(visit.visitDate)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.status')}</span>
//           <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
//         </div>
//       </div>

//       <div class="section">
//         <h2>🏥 ${t('doctor.details.medicalInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.chiefComplaint')}</span>
//           <span class="info-value">${visit.chiefComplaint || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.history')}</span>
//           <span class="info-value">${visit.history || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.medications')}</span>
//           <span class="info-value">${visit.medications || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.allergies')}</span>
//           <span class="info-value">${visit.allergies || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.notes')}</span>
//           <span class="info-value">${visit.doctorNotes || '-'}</span>
//         </div>
//       </div>

//       <div class="section">
//         <h2>💊 ${t('doctor.details.prescribedDrugs')}</h2>
//         ${drugsHtml}
//       </div>

//       <div class="section">
//         <h2>🔬 ${t('doctor.details.procedures')}</h2>
//         ${proceduresHtml}
//       </div>
//     `;

//     generatePDF(t('doctor.details.visitReport'), content, `Visit_${visit.id}_Full_Report`);
//   }, [detailsVisitData, detailsVisitDrugs, detailsVisitProcedures, buildFullName, formatDateTime, mapDurationType, generatePDF, t]);

//   // 2. Export Patient Info Only
//   const exportPatientPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
//     const patient = visit.patient || {};
//     const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
//                         visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
//                         visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
    
//     const content = `
//       <div class="header">
//         <h1>${t('doctor.pdf.patientInfo')}</h1>
//         <p>${t('doctor.details.patientLabel')}: ${buildFullName(patient)}</p>
//       </div>

//       <div class="section">
//         <h2>👤 ${t('doctor.details.patientInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.id')}</span>
//           <span class="info-value">${visit.id}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.patient')}</span>
//           <span class="info-value">${buildFullName(patient)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.phone')}</span>
//           <span class="info-value">${patient.phone || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.gender')}</span>
//           <span class="info-value">${patient.gender || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.visitDate')}</span>
//           <span class="info-value">${formatDateTime(visit.visitDate)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.status')}</span>
//           <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
//         </div>
//       </div>
//     `;

//     generatePDF(t('doctor.pdf.patientInfo'), content, `Patient_${visit.id}_Info`);
//   }, [detailsVisitData, buildFullName, formatDateTime, generatePDF, t]);

//   // 3. Export Medical Info Only
//   const exportMedicalPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
    
//     const content = `
//       <div class="header">
//         <h1>${t('doctor.pdf.medicalInfo')}</h1>
//         <p>Visit #${visit.id}</p>
//       </div>

//       <div class="section">
//         <h2>🏥 ${t('doctor.details.medicalInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.chiefComplaint')}</span>
//           <span class="info-value">${visit.chiefComplaint || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.history')}</span>
//           <span class="info-value">${visit.history || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.medications')}</span>
//           <span class="info-value">${visit.medications || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.allergies')}</span>
//           <span class="info-value">${visit.allergies || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.notes')}</span>
//           <span class="info-value">${visit.doctorNotes || '-'}</span>
//         </div>
//       </div>
//     `;

//     generatePDF(t('doctor.pdf.medicalInfo'), content, `Visit_${visit.id}_Medical`);
//   }, [detailsVisitData, generatePDF, t]);

//   // 4. Export Drugs Only
// // 4. Export Drugs Only
// const exportDrugsPdf = useCallback(() => {
//   if (!detailsVisitData) return;
  
//   const visit = detailsVisitData;
//   const drugs = detailsVisitDrugs || [];
  
//   let drugsHtml = '';
//   if (drugs.length === 0) {
//     drugsHtml = '<p style="color: #999; font-style: italic;">No drugs prescribed</p>';
//   } else {
//     drugs.forEach((item) => {
//       const drug = item.drug || {};
//       drugsHtml += `
//         <div class="drug-item">
//           <div class="drug-name">💊 ${drug.tradeName || 'Unknown'}</div>
//           <div class="drug-detail">
//             <span class="drug-label">Strength:</span>
//             <span>${drug.strength || '-'} ${drug.unitType || ''}</span>
//           </div>
//           <div class="drug-detail">
//             <span class="drug-label">Dose:</span>
//             <span>${item.dose || '-'}</span>
//           </div>
//           <div class="drug-detail">
//             <span class="drug-label">Frequency:</span>
//             <span>${item.frequency || '-'}</span>
//           </div>
//           <div class="drug-detail">
//             <span class="drug-label">Duration:</span>
//             <span>${item.duration || '-'} ${mapDurationType(item.durationType)}</span>
//           </div>
//           <div class="drug-detail">
//             <span class="drug-label">Instructions:</span>
//             <span>${item.instructions || 'No instructions'}</span>
//           </div>
//           <div class="drug-detail">
//             <span class="drug-label">Package:</span>
//             <span>${drug.packageSize || '-'} - ${drug.packageType || '-'}</span>
//           </div>
//         </div>
//       `;
//     });
//   }

//   const content = `
//     <div class="header">
//       <h1>${t('doctor.pdf.drugsReport')}</h1>
//       <p>Visit #${visit.id}</p>
//     </div>

//     <div class="section">
//       <h2>💊 ${t('doctor.details.prescribedDrugs')}</h2>
//       ${drugsHtml}
//     </div>
//   `;

//   generatePDF(t('doctor.pdf.drugsReport'), content, `Visit_${visit.id}_Drugs`);
// }, [detailsVisitData, detailsVisitDrugs, mapDurationType, generatePDF, t]);

// // 5. Export Procedures Only
// const exportProceduresPdf = useCallback(() => {
//   if (!detailsVisitData) return;
  
//   const visit = detailsVisitData;
//   const procedures = detailsVisitProcedures || [];
  
//   let proceduresHtml = '';
//   if (procedures.length === 0) {
//     proceduresHtml = '<p style="color: #999; font-style: italic;">No procedures performed</p>';
//   } else {
//     procedures.forEach((proc) => {
//       let icon = '🧪';
//       let category = 'General';
//       let color = '#3498DB';
      
//       const upperProc = proc.toUpperCase();
//       if (upperProc.includes('RADIOLOGY') || upperProc.includes('MRI') || upperProc.includes('CT') || upperProc.includes('X-RAY') || upperProc.includes('ULTRASOUND')) {
//         icon = '📡';
//         category = 'Radiology';
//         color = '#E74C3C';
//       } else if (upperProc.includes('LAB') || upperProc.includes('PCR') || upperProc.includes('BLOOD') || upperProc.includes('URINE')) {
//         icon = '🧫';
//         category = 'Laboratory';
//         color = '#2ECC71';
//       } else if (upperProc.includes('SURGERY') || upperProc.includes('OPR') || upperProc.includes('OPERATION')) {
//         icon = '🩺';
//         category = 'Surgical';
//         color = '#F39C12';
//       }
      
//       proceduresHtml += `
//         <div class="procedure-item" style="border-left-color: ${color};">
//           <div class="procedure-category" style="color: ${color};">${icon} ${category}</div>
//           <div class="procedure-name">${proc}</div>
//         </div>
//       `;
//     });
//   }

//   const content = `
//     <div class="header">
//       <h1>${t('doctor.pdf.proceduresReport')}</h1>
//       <p>Visit #${visit.id}</p>
//     </div>

//     <div class="section">
//       <h2>🔬 ${t('doctor.details.procedures')}</h2>
//       ${proceduresHtml}
//     </div>
//   `;

//   generatePDF(t('doctor.pdf.proceduresReport'), content, `Visit_${visit.id}_Procedures`);
// }, [detailsVisitData, detailsVisitProcedures, generatePDF, t]);

//   // 6. Export Patient + Drugs (Combined)
//   const exportPatientAndDrugsPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
//     const patient = visit.patient || {};
//     const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
//                         visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
//                         visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
    
//     let drugsHtml = '';
//     if (detailsVisitDrugs.length === 0) {
//       drugsHtml = '<p style="color: #999; font-style: italic;">No drugs prescribed</p>';
//     } else {
//       detailsVisitDrugs.forEach((drug) => {
//         const drugObj = drug.drug || {};
//         drugsHtml += `
//           <div class="drug-item">
//             <div class="drug-name">💊 ${drugObj.tradeName || drug.tradeName || 'Unknown'}</div>
//             <div class="drug-detail">
//               <span class="drug-label">Strength:</span>
//               <span>${drugObj.strength || drug.strength || '-'} ${drugObj.unitType || drug.unitType || ''}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Dose:</span>
//               <span>${drug.dose || '-'}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Frequency:</span>
//               <span>${drug.frequency || '-'}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Duration:</span>
//               <span>${drug.duration || '-'} ${mapDurationType(drug.durationType)}</span>
//             </div>
//             <div class="drug-detail">
//               <span class="drug-label">Instructions:</span>
//               <span>${drug.instructions || 'No instructions'}</span>
//             </div>
//           </div>
//         `;
//       });
//     }

//     const content = `
//       <div class="header">
//         <h1>${t('doctor.pdf.patientInfo')} & ${t('doctor.pdf.drugsReport')}</h1>
//         <p>Visit #${visit.id}</p>
//       </div>

//       <div class="section">
//         <h2>👤 ${t('doctor.details.patientInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.id')}</span>
//           <span class="info-value">${visit.id}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.patient')}</span>
//           <span class="info-value">${buildFullName(patient)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.phone')}</span>
//           <span class="info-value">${patient.phone || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.gender')}</span>
//           <span class="info-value">${patient.gender || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.visitDate')}</span>
//           <span class="info-value">${formatDateTime(visit.visitDate)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.status')}</span>
//           <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
//         </div>
//       </div>

//       <div class="section-divider"></div>

//       <div class="section">
//         <h2>💊 ${t('doctor.details.prescribedDrugs')}</h2>
//         ${drugsHtml}
//       </div>
//     `;

//     generatePDF(`${t('doctor.pdf.patientInfo')} & ${t('doctor.pdf.drugsReport')}`, content, `Visit_${visit.id}_Patient_Drugs`);
//   }, [detailsVisitData, detailsVisitDrugs, buildFullName, formatDateTime, mapDurationType, generatePDF, t]);

//   // 7. Export Patient + Procedures (Combined)
//   const exportPatientAndProceduresPdf = useCallback(() => {
//     if (!detailsVisitData) return;
    
//     const visit = detailsVisitData;
//     const patient = visit.patient || {};
//     const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
//                         visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
//                         visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
    
//     let proceduresHtml = '';
//     if (detailsVisitProcedures.length === 0) {
//       proceduresHtml = '<p style="color: #999; font-style: italic;">No procedures performed</p>';
//     } else {
//       detailsVisitProcedures.forEach((proc) => {
//         let icon = '🧪';
//         let category = 'General';
//         let color = '#3498DB';
        
//         if (proc.startsWith('[RADIOLOGY]')) {
//           icon = '📡';
//           category = 'Radiology';
//           color = '#E74C3C';
//         } else if (proc.startsWith('[LABORATORY]')) {
//           icon = '🧫';
//           category = 'Laboratory';
//           color = '#2ECC71';
//         } else if (proc.startsWith('[MEDICAL]')) {
//           icon = '🩺';
//           category = 'Medical';
//           color = '#F39C12';
//         }
        
//         const cleanProc = proc.replace(/\[.*?\]\s*/, '');
        
//         proceduresHtml += `
//           <div class="procedure-item" style="border-left-color: ${color};">
//             <div class="procedure-category" style="color: ${color};">${icon} ${category}</div>
//             <div class="procedure-name">${cleanProc}</div>
//           </div>
//         `;
//       });
//     }

//     const content = `
//       <div class="header">
//         <h1>${t('doctor.pdf.patientInfo')} & ${t('doctor.pdf.proceduresReport')}</h1>
//         <p>Visit #${visit.id}</p>
//       </div>

//       <div class="section">
//         <h2>👤 ${t('doctor.details.patientInfo')}</h2>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.id')}</span>
//           <span class="info-value">${visit.id}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.details.patient')}</span>
//           <span class="info-value">${buildFullName(patient)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.phone')}</span>
//           <span class="info-value">${patient.phone || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.gender')}</span>
//           <span class="info-value">${patient.gender || '-'}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.visitDate')}</span>
//           <span class="info-value">${formatDateTime(visit.visitDate)}</span>
//         </div>
//         <div class="info-row">
//           <span class="info-label">${t('doctor.visit.status')}</span>
//           <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
//         </div>
//       </div>

//       <div class="section-divider"></div>

//       <div class="section">
//         <h2>🔬 ${t('doctor.details.procedures')}</h2>
//         ${proceduresHtml}
//       </div>
//     `;

//     generatePDF(`${t('doctor.pdf.patientInfo')} & ${t('doctor.pdf.proceduresReport')}`, content, `Visit_${visit.id}_Patient_Procedures`);
//   }, [detailsVisitData, detailsVisitProcedures, buildFullName, formatDateTime, generatePDF, t]);

//   const reopenVisit = useCallback(async (visitId) => {
//     try {
//       const endpoint = `/api/visits/${visitId}/reopen`;
//       await apiFetch(endpoint, { method: 'PUT' });
//       alert(t('doctor.visit.reopened'));
//       loadDoctorVisits(currentFilter, false);
//       loadSummaryCards();
//       setShowVisitPopup(false);
//       setPopupVisit(null);
//     } catch (error) {
//       alert(t('doctor.visit.reopenError') + ': ' + error.message);
//     }
//   }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

//   const changePassword = useCallback(async (oldPassword, newPassword) => {
//     try {
//       const endpoint = '/api/doctors/change-password';
//       await apiFetch(endpoint, {
//         method: 'PUT',
//         body: JSON.stringify({
//           username,
//           oldPassword,
//           newPassword
//         })
//       });
//       alert(t('doctor.password.success'));
//       return true;
//     } catch (error) {
//       alert(t('doctor.password.error') + error.message);
//       return false;
//     }
//   }, [username, t, apiFetch]);

//   // ==================== VISIT SCREEN HANDLING ====================
//   const openVisitScreen = useCallback((visitId, status) => {
//     setSelectedVisitId(visitId);
//     setSelectedVisitStatus(status);
//     setShowVisitScreen(true);
//     setShowVisitPopup(false);
//     setPopupVisit(null);
//   }, []);

//   const closeVisitScreen = useCallback(() => {
//     setShowVisitScreen(false);
//     setSelectedVisitId(null);
//     setSelectedVisitStatus('NEW');
//     loadDoctorVisits(currentFilter, false);
//     loadSummaryCards();
//   }, [currentFilter, loadDoctorVisits, loadSummaryCards]);

//   // ==================== SEARCH PATIENT HANDLING ====================
//   const openSearchPatient = useCallback(() => {
//     setShowSearchPatient(true);
//   }, []);

//   const closeSearchPatient = useCallback(() => {
//     setShowSearchPatient(false);
//   }, []);

//   // ==================== AVATAR HANDLING ====================
//   const getAvatarPath = useCallback((gender) => {
//     if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return `${process.env.PUBLIC_URL}/female.PNG`;
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return `${process.env.PUBLIC_URL}/male.PNG`;
//     }
//     return `${process.env.PUBLIC_URL}/unknown.PNG`;
//   }, []);

//   const getAvatarColor = useCallback((gender) => {
//     if (!gender) return '#95a5a6';
    
//     const normalizedGender = gender.toUpperCase();
//     if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
//       return '#e91e63';
//     } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
//       return '#2196f3';
//     }
//     return '#95a5a6';
//   }, []);

//   // ==================== SEARCH HANDLING ====================
//   const handleSearch = useCallback((query) => {
//     setCurrentSearchQuery(query);
//     const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
//     setFilteredVisits(filtered);
//   }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

//   // ==================== CARD LAYOUT ====================
//   const toggleCardLayout = useCallback(() => {
//     const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
//     setCardsPerRowIndex(newIndex);
//     setIsGridLayout(true);
//   }, [cardsPerRowIndex, cardsPerRowPattern]);

//   // ==================== PAGINATION ====================
//   const goToPage = useCallback((page) => {
//     if (page >= 0 && page < totalPages && page !== currentPage) {
//       setCurrentPage(page);
//       loadDoctorVisits(currentFilter, false, page);
//     }
//   }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

//   // ==================== NOTIFICATIONS ====================
//   const checkNotifications = useCallback(() => {
//     const count = visitsCache.filter(v => {
//       const status = v.visitStatus || 'CREATED';
//       return status === 'IN_PROGRESS' || status === 'CREATED';
//     }).length;
    
//     setNotificationCount(count);
    
//     if (count > 0 && count > lastNotificationCount) {
//       const icon = document.getElementById('notification-icon');
//       if (icon) {
//         icon.classList.add('notification-pulse');
//         setTimeout(() => icon.classList.remove('notification-pulse'), 300);
//       }
//     }
//     setLastNotificationCount(count);
//   }, [visitsCache, lastNotificationCount]);

//   // ==================== AUTO REFRESH ====================
//   useEffect(() => {
//     const startAutoRefresh = () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       autoRefreshInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           loadDoctorVisits(currentFilter, false);
//           loadSummaryCards();
//         }
//       }, 30000);
//     };
    
//     const startNotificationCheck = () => {
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       notificationInterval.current = setInterval(() => {
//         if (mountedRef.current) {
//           checkNotifications();
//         }
//       }, 30000);
//     };
    
//     startAutoRefresh();
//     startNotificationCheck();
    
//     return () => {
//       if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
//       if (notificationInterval.current) clearInterval(notificationInterval.current);
//       mountedRef.current = false;
//     };
//   }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

//   // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
//     init();
//   }, []);

//   // ==================== SIDEBAR HANDLING ====================
//   const handleSidebarMouseEnter = () => {
//     if (!sidebarOpen) {
//       setSidebarOpen(true);
//     }
//   };

//   const handleSidebarMouseLeave = () => {
//     if (sidebarOpen) {
//       setSidebarOpen(false);
//     }
//   };

//   // ==================== RENDER COMPONENTS ====================
  
//   // Avatar Component
//   const PatientAvatar = ({ gender, name, size = 60 }) => {
//     const avatarPath = getAvatarPath(gender);
//     const bgColor = getAvatarColor(gender);
//     const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
//     const [imageError, setImageError] = useState(false);

//     return (
//       <div 
//         className="patient-avatar"
//         style={{ 
//           width: size, 
//           height: size,
//           borderRadius: '50%',
//           overflow: 'hidden',
//           flexShrink: 0,
//           border: '2px solid #e9ecef',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           backgroundColor: bgColor,
//           color: 'white',
//           fontSize: `${size * 0.35}px`,
//           fontWeight: 'bold',
//           position: 'relative'
//         }}
//       >
//         {!imageError ? (
//           <img
//             src={avatarPath}
//             alt={`${gender || 'Unknown'} avatar`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover'
//             }}
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <span>{initials}</span>
//         )}
//       </div>
//     );
//   };

//   // Sidebar Button Component
//   const SidebarButton = ({ icon, text, color, onClick }) => (
//     <button
//       className="sidebar-button"
//       style={{ '--hover-color': color }}
//       onClick={onClick}
//     >
//       <span className="sidebar-icon">{icon}</span>
//       <span className="sidebar-text">{text}</span>
//     </button>
//   );

//   // Filter Button Component
//   const FilterButton = ({ filterKey, label, count, active, onClick }) => (
//     <button
//       className={`filter-button ${active ? 'active' : 'inactive'}`}
//       onClick={onClick}
//     >
//       {label} ({count})
//     </button>
//   );

//   // Summary Card Component
//   const SummaryCard = ({ title, value, color, delay }) => (
//     <div 
//       className="summary-card"
//       style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
//     >
//       <div className="summary-card-title">{title}</div>
//       <div className="summary-card-value">{value}</div>
//     </div>
//   );

//   // Performance Item Component
//   const PerformanceItem = ({ icon, label, value }) => (
//     <div className="performance-item">
//       <span className="performance-icon">{icon}</span>
//       <div className="performance-text">
//         <div className="performance-label">{label}</div>
//         <div className="performance-value">{value}</div>
//       </div>
//     </div>
//   );

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
//   const VisitCard = ({ visit, onOpen, onDetails }) => {
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-card" style={{ backgroundColor: bgColor }}>
//         <div className="visit-card-header">
//           <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//           <span className="visit-header-spacer" />
//           <StatusBadge status={status} />
//         </div>
//         <div className="visit-card-body">
//           <PatientAvatar gender={gender} name={fullName} size={60} />
//           <div className="visit-info">
//             <div className="visit-name">👤 {fullName}</div>
//             <div className="visit-details">
//               📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//             </div>
//             <div className="visit-details">
//               📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//             </div>
//           </div>
//           <div className="visit-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== VISIT POPUP COMPONENT ====================
//   const VisitPopup = ({ visit, onClose, onOpen, onDetails }) => {
//     if (!visit) return null;
    
//     const patient = visit.patient || {};
//     const status = visit.visitStatus || 'CREATED';
//     const bgColor = getStatusBgColor(status);
//     const gender = patient.gender || 'Unknown';
//     const fullName = buildFullName(patient);
    
//     return (
//       <div className="visit-popup-overlay" onClick={onClose}>
//         <div className="visit-popup-content" onClick={(e) => e.stopPropagation()}>
//           <button className="visit-popup-close" onClick={onClose}>✖</button>
//           <h2 className="visit-popup-title">📋 {t('doctor.visit.details')}</h2>
          
//           <div className="visit-popup-card" style={{ backgroundColor: bgColor }}>
//             <div className="visit-card-header">
//               <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
//               <span className="visit-header-spacer" />
//               <StatusBadge status={status} />
//             </div>
//             <div className="visit-card-body">
//               <PatientAvatar gender={gender} name={fullName} size={60} />
//               <div className="visit-info">
//                 <div className="visit-name">👤 {fullName}</div>
//                 <div className="visit-details">
//                   📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
//                 </div>
//                 <div className="visit-details">
//                   📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
//                 </div>
//                 <div className="visit-details" style={{ marginTop: '8px' }}>
//                   <strong>{t('doctor.details.medicalInfo')}:</strong><br />
//                   🩺 {t('doctor.details.chiefComplaint')}: {visit.chiefComplaint || '-'}<br />
//                   📜 {t('doctor.details.history')}: {visit.history || '-'}<br />
//                   💊 {t('doctor.details.medications')}: {visit.medications || '-'}<br />
//                   ⚠ {t('doctor.details.allergies')}: {visit.allergies || '-'}<br />
//                   📝 {t('doctor.details.notes')}: {visit.doctorNotes || '-'}
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="visit-popup-actions">
//             <button 
//               className="btn-open"
//               onClick={() => onOpen(visit.id, status)}
//             >
//               {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
//             </button>
//             <button 
//               className="btn-details"
//               onClick={() => onDetails(visit.id)}
//             >
//               {t('doctor.visit.details')}
//             </button>
//             <button className="btn-close-popup" onClick={onClose}>
//               {t('doctor.dialog.close')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== DETAILS MODAL ====================
// // ==================== DETAILS MODAL ====================
// const DetailsModal = () => {
//   if (!showDetailsModal || !detailsVisitData) return null;
  
//   const visit = detailsVisitData;
//   const patient = visit.patient || {};
  
//   const formatDateTimeLocal = (iso) => {
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
//       return '-';
//     }
//   };

//   const buildFullNameLocal = (p) => {
//     if (!p) return '';
//     return [p.firstName, p.middleName, p.lastName].filter(Boolean).join(' ').trim() || 'Unknown';
//   };

//   const getStatusColorLocal = (status) => {
//     switch (status?.toUpperCase()) {
//       case 'COMPLETED':
//       case 'CLOSED':
//         return '#27ae60';
//       case 'IN_PROGRESS':
//         return '#f39c12';
//       case 'CANCELLED':
//         return '#e74c3c';
//       case 'CREATED':
//       case 'NEW':
//         return '#e74c3c';
//       default:
//         return '#3498db';
//     }
//   };

//   const mapDurationTypeLocal = (type) => {
//     if (!type) return '-';
//     const map = {
//       '1': 'Hour',
//       '2': 'Day',
//       '3': 'Week',
//       '4': 'Month',
//       '5': 'Year'
//     };
//     return map[type] || '-';
//   };

//   // Get drugs from visit data
//   const drugs = detailsVisitDrugs || [];
//   const procedures = detailsVisitProcedures || [];

//   return (
//     <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
//       <div className="modal-content full-details" onClick={(e) => e.stopPropagation()} ref={detailsModalRef}>
//         <button className="modal-close" onClick={() => setShowDetailsModal(false)}>✖</button>
        
//         {loadingDetails ? (
//           <div className="loading-container">
//             <div className="loading-spinner-large"></div>
//             <p>{t('doctor.loading')}</p>
//           </div>
//         ) : (
//           <>
//             <h2>📋 {t('doctor.visit.details')} #{visit.id}</h2>
            
//             {/* PDF Buttons */}
//             <div className="pdf-buttons-container">
//               <button 
//                 className="btn-pdf full" 
//                 onClick={exportFullVisitPdf}
//                 disabled={generatingPdf}
//               >
//     📄 {generatingPdf ? t('doctor.pdf.generating') : t('doctor.pdf.fullReport')}
//               </button>
//               <button 
//                 className="btn-pdf patient" 
//                 onClick={exportPatientPdf}
//                 disabled={generatingPdf}
//               >
//                 👤 {t('doctor.pdf.patient')}
//               </button>
//               <button 
//                 className="btn-pdf medical" 
//                 onClick={exportMedicalPdf}
//                 disabled={generatingPdf}
//               >
//                 🏥 {t('doctor.pdf.medical')}
//               </button>
//               <button 
//                 className="btn-pdf drugs" 
//                 onClick={exportDrugsPdf}
//                 disabled={generatingPdf}
//               >
//                 💊 {t('doctor.pdf.drugs')}
//               </button>
//               <button 
//                 className="btn-pdf procedures" 
//                 onClick={exportProceduresPdf}
//                 disabled={generatingPdf}
//               >
//                 🔬 {t('doctor.pdf.procedures')}
//               </button>
//               <button 
//                 className="btn-pdf combined" 
//                 onClick={exportPatientAndDrugsPdf}
//                 disabled={generatingPdf}
//               >
//     👤+💊 {t('doctor.pdf.patientDrugs')}
//               </button>
//               <button 
//                 className="btn-pdf combined" 
//                 onClick={exportPatientAndProceduresPdf}
//                 disabled={generatingPdf}
//               >
//     👤+🔬 {t('doctor.pdf.patientProcedures')}
//               </button>
//             </div>

//             {/* Scrollable Content */}
//             <div className="details-scrollable">
//               {/* Basic Info */}
//               <div className="details-section basic-info">
//                 <h3>👤 {t('doctor.details.patientInfo')}</h3>
//                 <div className="info-grid">
//                   <div className="info-card">
//                     <span className="info-icon">🆔</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.id')}</span>
//                       <span className="info-value">{visit.id}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">👤</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.details.patient')}</span>
//                       <span className="info-value">{buildFullNameLocal(patient)}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">📞</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.phone')}</span>
//                       <span className="info-value">{patient.phone || '-'}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">⚧</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.gender')}</span>
//                       <span className="info-value">{patient.gender || '-'}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">📅</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.visitDate')}</span>
//                       <span className="info-value">{formatDateTimeLocal(visit.visitDate)}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">📌</span>
//                     <div className="info-content">
//                       <span className="info-label">{t('doctor.visit.status')}</span>
//                       <span className="status-badge" style={{ 
//                         backgroundColor: getStatusColorLocal(visit.visitStatus),
//                         color: 'white',
//                         padding: '4px 15px',
//                         borderRadius: '12px',
//                         fontSize: '12px',
//                         fontWeight: 'bold',
//                         display: 'inline-block'
//                       }}>
//                         {visit.visitStatus || 'N/A'}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">💳</span>
//                     <div className="info-content">
//                       <span className="info-label">Payment</span>
//                       <span className="info-value">{visit.paid ? '✅ Paid' : '❌ Unpaid'}</span>
//                     </div>
//                   </div>
//                   <div className="info-card">
//                     <span className="info-icon">💰</span>
//                     <div className="info-content">
//                       <span className="info-label">Amount</span>
//                       <span className="info-value">{visit.originalAmount || 0} {visit.currency || 'JOD'}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Medical Info */}
//               <div className="details-section medical-info">
//                 <h3>🏥 {t('doctor.details.medicalInfo')}</h3>
//                 <div className="medical-grid">
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#E74C3C' }}>
//                       🩺 {t('doctor.details.chiefComplaint')}
//                     </div>
//                     <div className="medical-content">{visit.chiefComplaint || '-'}</div>
//                   </div>
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#3498DB' }}>
//                       📜 {t('doctor.details.history')}
//                     </div>
//                     <div className="medical-content">{visit.history || '-'}</div>
//                   </div>
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#2ECC71' }}>
//                       💊 {t('doctor.details.medications')}
//                     </div>
//                     <div className="medical-content">{visit.medications || '-'}</div>
//                   </div>
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#F39C12' }}>
//                       ⚠ {t('doctor.details.allergies')}
//                     </div>
//                     <div className="medical-content">{visit.allergies || '-'}</div>
//                   </div>
//                   <div className="medical-item">
//                     <div className="medical-header" style={{ color: '#9B59B6' }}>
//                       📝 {t('doctor.details.notes')}
//                     </div>
//                     <div className="medical-content">{visit.doctorNotes || '-'}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Drugs */}
//               <div className="details-section drugs-info">
//                 <h3>💊 {t('doctor.details.prescribedDrugs')}</h3>
//                 {!drugs || drugs.length === 0 ? (
//                   <div className="empty-state small">📭 {t('doctor.details.noDrugs')}</div>
//                 ) : (
//                   <div className="drugs-grid">
//                     {drugs.map((item, index) => {
//                       const drug = item.drug || {};
//                       return (
//                         <div key={index} className="drug-card">
//                           <div className="drug-header">
//                             <span className="drug-name">💊 {drug.tradeName || 'Unknown'}</span>
//                             <span className="drug-form-badge">{drug.dosageForm || '-'}</span>
//                           </div>
//                           <div className="drug-details">
//                             <div className="drug-detail-row">
//                               <span className="drug-label">💪 Strength:</span>
//                               <span className="drug-value">
//                                 {drug.strength || '-'} {drug.unitType || ''}
//                               </span>
//                             </div>
//                             <div className="drug-detail-row">
//                               <span className="drug-label">💊 Dose:</span>
//                               <span className="drug-value">{item.dose || '-'}</span>
//                             </div>
//                             <div className="drug-detail-row">
//                               <span className="drug-label">⏰ Frequency:</span>
//                               <span className="drug-value">{item.frequency || '-'}</span>
//                             </div>
//                             <div className="drug-detail-row">
//                               <span className="drug-label">📅 Duration:</span>
//                               <span className="drug-value">
//                                 {item.duration || '-'} {mapDurationTypeLocal(item.durationType)}
//                               </span>
//                             </div>
//                             <div className="drug-detail-row">
//                               <span className="drug-label">📦 Package:</span>
//                               <span className="drug-value">
//                                 {drug.packageSize || '-'} - {drug.packageType || '-'}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="drug-instructions">
//                             📝 {item.instructions || 'No instructions'}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>

//               {/* Procedures */}
//               <div className="details-section procedures-info">
//                 <h3>🔬 {t('doctor.details.procedures')}</h3>
//                 {!procedures || procedures.length === 0 ? (
//                   <div className="empty-state small">📭 {t('doctor.details.noProcedures')}</div>
//                 ) : (
//                   <div className="procedures-list">
//                     {procedures.map((proc, index) => {
//                       let icon = '🧪';
//                       let category = 'General';
//                       let color = '#3498DB';
                      
//                       const upperProc = proc.toUpperCase();
//                       if (upperProc.includes('RADIOLOGY') || upperProc.includes('MRI') || upperProc.includes('CT') || upperProc.includes('X-RAY') || upperProc.includes('ULTRASOUND')) {
//                         icon = '📡';
//                         category = 'Radiology';
//                         color = '#E74C3C';
//                       } else if (upperProc.includes('LAB') || upperProc.includes('PCR') || upperProc.includes('BLOOD') || upperProc.includes('URINE')) {
//                         icon = '🧫';
//                         category = 'Laboratory';
//                         color = '#2ECC71';
//                       } else if (upperProc.includes('SURGERY') || upperProc.includes('OPR') || upperProc.includes('OPERATION')) {
//                         icon = '🩺';
//                         category = 'Surgical';
//                         color = '#F39C12';
//                       } else if (upperProc.includes('ELBOW') || upperProc.includes('KNEE') || upperProc.includes('SHOULDER')) {
//                         icon = '🦴';
//                         category = 'Orthopedic';
//                         color = '#8E44AD';
//                       }
                      
//                       return (
//                         <div key={index} className="procedure-item" style={{ borderLeftColor: color }}>
//                           <span className="procedure-icon">{icon}</span>
//                           <div className="procedure-content">
//                             <span className="procedure-category" style={{ color: color }}>
//                               {category}
//                             </span>
//                             <span className="procedure-name">{proc}</span>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

//   // Pagination Component
//   const Pagination = () => {
//     const visiblePages = 7;
//     const halfVisible = Math.floor(visiblePages / 2);
//     let startPage = Math.max(0, currentPage - halfVisible);
//     let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
//     if (endPage - startPage < visiblePages - 1) {
//       startPage = Math.max(0, endPage - visiblePages + 1);
//     }
    
//     const pageNumbers = [];
//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }
    
//     return (
//       <div className="pagination">
//         <button 
//           className="pagination-prev"
//           disabled={currentPage === 0}
//           onClick={() => goToPage(currentPage - 1)}
//         >
//           ◀
//         </button>
        
//         {startPage > 0 && (
//           <>
//             <button className="pagination-page" onClick={() => goToPage(0)}>1</button>
//             {startPage > 1 && <span className="pagination-ellipsis">...</span>}
//           </>
//         )}
        
//         {pageNumbers.map(num => (
//           <button
//             key={num}
//             className={`pagination-page ${num === currentPage ? 'active' : ''}`}
//             onClick={() => goToPage(num)}
//           >
//             {num + 1}
//           </button>
//         ))}
        
//         {endPage < totalPages - 1 && (
//           <>
//             {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
//             <button className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
//               {totalPages}
//             </button>
//           </>
//         )}
        
//         <button 
//           className="pagination-next"
//           disabled={currentPage >= totalPages - 1}
//           onClick={() => goToPage(currentPage + 1)}
//         >
//           ▶
//         </button>
        
//         <span className="pagination-info">
//           {t('doctor.filter.page')} {currentPage + 1} {t('doctor.filter.of')} {totalPages}
//         </span>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   if (loading && isInitialLoad) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="loading-spinner">{t('doctor.loading')}</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//         <div className="error-message">
//           <h2>⚠️ {t('doctor.error')}</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()}>{t('doctor.retry')}</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
//       {/* Sidebar */}
//       <aside 
//         className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
//         onMouseEnter={handleSidebarMouseEnter}
//         onMouseLeave={handleSidebarMouseLeave}
//       >
//         <div className="sidebar-header">
//           <span className="menu-icon">☰</span>
//           {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
//         </div>
        
//         <nav className="sidebar-nav">
//           <SidebarButton 
//             icon="🔍" 
//             text={t('doctor.sidebar.searchPatient')}
//             color="#3498db"
//             onClick={openSearchPatient}
//           />
//           <SidebarButton 
//             icon="📊" 
//             text={t('doctor.sidebar.reports')}
//             color="#2ecc71"
//             onClick={() => alert(t('doctor.reports.comingSoon'))}
//           />
//           <SidebarButton 
//             icon="🔒" 
//             text={t('doctor.sidebar.changePassword')}
//             color="#f39c12"
//             onClick={() => {
//               const oldPass = prompt(t('doctor.password.old'));
//               if (!oldPass) return;
//               const newPass = prompt(t('doctor.password.new'));
//               if (!newPass) return;
//               const confirmPass = prompt(t('doctor.password.confirm'));
//               if (!confirmPass) return;
//               if (newPass !== confirmPass) {
//                 alert(t('doctor.password.notMatch'));
//                 return;
//               }
//               changePassword(oldPass, newPass);
//             }}
//           />
//           <SidebarButton 
//             icon="🚪" 
//             text={t('doctor.sidebar.logout')}
//             color="#e74c3c"
//             onClick={() => {
//               if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
//                 window.location.href = '/login';
//               }
//             }}
//           />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Welcome Section */}
//         <div className="welcome-section">
//           <div className="welcome-text">
//             <h1 className="welcome-greeting">
//               {t('doctor.home.welcome').replace('{0}', username)}
//             </h1>
//           </div>
          
//           <div className="welcome-actions">
//             <div className="find-visit">
//               <input
//                 type="text"
//                 className="find-visit-input"
//                 placeholder={t('doctor.findVisit.prompt')}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const value = e.target.value.trim();
//                     if (value) findVisitById(value);
//                   }
//                 }}
//               />
//               <button 
//                 className="find-visit-btn"
//                 onClick={() => {
//                   const input = document.querySelector('.find-visit-input');
//                   if (input && input.value.trim()) {
//                     findVisitById(input.value.trim());
//                   }
//                 }}
//               >
//                 🔍
//               </button>
//             </div>
            
//             <span 
//               id="notification-icon"
//               className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
//               onClick={() => {
//                 const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
//                 if (openVisits.length === 0) {
//                   alert(t('doctor.notifications.noOpen'));
//                   return;
//                 }
//                 const message = openVisits.map(v => 
//                   `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
//                 ).join('\n');
//                 alert(t('doctor.notifications.openVisits') + '\n\n' + message);
//               }}
//             >
//               🔔 {notificationCount}
//             </span>
//           </div>
//         </div>

//         {/* Summary Cards */}
//         <div className="summary-cards">
//           <SummaryCard 
//             title={t('doctor.dashboard.todayVisits')} 
//             value={summaryStats.today} 
//             color="#1E90FF"
//             delay={100}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.totalVisits')} 
//             value={summaryStats.total} 
//             color="#20B2AA"
//             delay={200}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.newVisits')} 
//             value={summaryStats.open} 
//             color="#FF9800"
//             delay={300}
//           />
//           <SummaryCard 
//             title={t('doctor.dashboard.closedVisits')} 
//             value={summaryStats.closed} 
//             color="#4CAF50"
//             delay={400}
//           />
//         </div>

//         {/* Performance Widget */}
//         <details className="performance-widget">
//           <summary>{t('doctor.performance.title')}</summary>
//           <div className="performance-grid">
//             <PerformanceItem 
//               icon="👤" 
//               label={t('doctor.performance.patientsSeen')} 
//               value={performanceStats.patientsSeen}
//             />
//             <PerformanceItem 
//               icon="📋" 
//               label={t('doctor.performance.openVisits')} 
//               value={performanceStats.openVisits}
//             />
//             <PerformanceItem 
//               icon="✅" 
//               label={t('doctor.performance.completedToday')} 
//               value={performanceStats.completedToday}
//             />
//             <PerformanceItem 
//               icon="📊" 
//               label={t('doctor.performance.completionRate')} 
//               value={`${performanceStats.completionRate}%`}
//             />
//           </div>
//         </details>

//         {/* Filters */}
//         <div className="filters-bar">
//           <div className="filter-buttons">
//             <FilterButton 
//               filterKey="TODAY"
//               label={t('doctor.filter.today')}
//               count={filterCounts.TODAY}
//               active={currentFilter === 'TODAY'}
//               onClick={() => loadDoctorVisits('TODAY', true)}
//             />
//             <FilterButton 
//               filterKey="ALL"
//               label={t('doctor.filter.all')}
//               count={filterCounts.ALL}
//               active={currentFilter === 'ALL'}
//               onClick={() => loadDoctorVisits('ALL', true)}
//             />
//             <FilterButton 
//               filterKey="NEW"
//               label={t('doctor.filter.new')}
//               count={filterCounts.NEW}
//               active={currentFilter === 'NEW'}
//               onClick={() => loadDoctorVisits('NEW', true)}
//             />
//             <FilterButton 
//               filterKey="IN_PROGRESS"
//               label={t('doctor.filter.inProgress')}
//               count={filterCounts.IN_PROGRESS}
//               active={currentFilter === 'IN_PROGRESS'}
//               onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
//             />
//             <FilterButton 
//               filterKey="CLOSED"
//               label={t('doctor.filter.closed')}
//               count={filterCounts.CLOSED}
//               active={currentFilter === 'CLOSED'}
//               onClick={() => loadDoctorVisits('CLOSED', true)}
//             />
//           </div>
          
//           <div className="filter-actions">
//             <button 
//               className="filter-action-btn refresh"
//               onClick={() => {
//                 loadDoctorVisits(currentFilter, false);
//                 loadSummaryCards();
//               }}
//             >
//               🔄 {t('doctor.filter.refresh')}
//             </button>
//             <input
//               type="text"
//               className="search-input"
//               placeholder={t('doctor.filter.searchPrompt')}
//               value={currentSearchQuery}
//               onChange={(e) => handleSearch(e.target.value)}
//             />
//             <button 
//               className="filter-action-btn layout"
//               onClick={toggleCardLayout}
//             >
//               ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
//             </button>
//             <button 
//               className="filter-action-btn sort"
//               onClick={() => {
//                 const newSort = !sortByDateAsc;
//                 setSortByDateAsc(newSort);
//                 const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
//                 setFilteredVisits(filtered);
//               }}
//             >
//               ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
//             </button>
//           </div>
//         </div>

//         {/* Card Container */}
//         <div className="card-scroll-container" ref={scrollPaneRef}>
//           <div className="card-container">
//             {filteredVisits.length === 0 ? (
//               <div className="empty-state">
//                 📭 {t('doctor.filter.noResults')}
//               </div>
//             ) : isGridLayout ? (
//               <div 
//                 className="card-grid"
//                 style={{ 
//                   gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
//                 }}
//               >
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={showVisitDetails}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="card-list">
//                 {filteredVisits.map((visit) => (
//                   <VisitCard
//                     key={visit.id}
//                     visit={visit}
//                     onOpen={(id, status) => {
//                       if (status === 'CLOSED') {
//                         reopenVisit(id);
//                       } else {
//                         openVisitScreen(id, status);
//                       }
//                     }}
//                     onDetails={showVisitDetails}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && <Pagination />}
//       </main>

//       {/* Visit Popup */}
//       {showVisitPopup && popupVisit && (
//         <VisitPopup
//           visit={popupVisit}
//           onClose={() => {
//             setShowVisitPopup(false);
//             setPopupVisit(null);
//           }}
//           onOpen={(id, status) => {
//             if (status === 'CLOSED') {
//               reopenVisit(id);
//             } else {
//               openVisitScreen(id, status);
//             }
//           }}
//           onDetails={(id) => {
//             setShowVisitPopup(false);
//             showVisitDetails(id);
//           }}
//         />
//       )}

//       {/* Visit Screen Modal */}
//       {showVisitScreen && selectedVisitId && (
//         <div className="visit-screen-modal-overlay" onClick={closeVisitScreen}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeVisitScreen}
//             >
//               ✖
//             </button>
//             <DoctorVisitScreen
//               doctorId={doctorId}
//               visitId={selectedVisitId}
//               initialStatus={selectedVisitStatus}
//               username={username}
//               onClose={closeVisitScreen}
//               language={locale}
//             />
//           </div>
//         </div>
//       )}

//       {/* Search Patient Modal */}
//       {showSearchPatient && (
//         <div className="visit-screen-modal-overlay" onClick={closeSearchPatient}>
//           <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
//             <button 
//               className="visit-screen-close-btn"
//               onClick={closeSearchPatient}
//             >
//               ✖
//             </button>
//             <DoctorSearchPatientScreen
//               loggedUser={username}
//               language={locale}
//               onClose={closeSearchPatient}
//             />
//           </div>
//         </div>
//       )}

//       {/* Details Modal */}
//       <DetailsModal />
//     </div>
//   );
// };

// export default DoctorHomePage;    05072026  1:00 Pm




import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BASE_URL } from '../../utils/api';
import DoctorVisitScreen from '../DoctorHomePage/DoctorVisitScreen';
import DoctorSearchPatientScreen from '../DoctorHomePage/DoctorSearchPatientScreen';
import './DoctorHomePage.css';
import ReportsScreen from '../ReportsScreen/ReportsScreen'; // Add this import
import DoctorGuide from '../DoctorGuide/DoctorGuide';


// Constants
const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED = 55;
const PAGE_SIZE = 40;

// ==================== LOCALIZATION ====================
// English translations
const EN_BUNDLE = {
  'doctor.home.title': 'Doctor Dashboard',
  'doctor.home.welcome': 'Welcome, {0}',
  'doctor.sidebar.menu': 'Menu',
  'doctor.sidebar.searchPatient': 'Search Patient',
  'doctor.sidebar.reports': 'Reports',
  'doctor.sidebar.changePassword': 'Change Password',
  'doctor.sidebar.logout': 'Logout',
  'doctor.sidebar.logoutConfirm': 'Are you sure you want to logout?',
  'doctor.dashboard.todayVisits': "Today's Visits",
  'doctor.dashboard.totalVisits': 'Total Visits',
  'doctor.dashboard.newVisits': 'New Visits',
  'doctor.dashboard.closedVisits': 'Closed Visits',
  'doctor.performance.title': '📊 Performance Overview',
  'doctor.performance.patientsSeen': 'Patients Seen Today',
  'doctor.performance.openVisits': 'Open Visits',
  'doctor.performance.completedToday': 'Completed Today',
  'doctor.performance.completionRate': 'Completion Rate',
  'doctor.filter.today': 'Today',
  'doctor.filter.all': 'All',
  'doctor.filter.new': 'New',
  'doctor.filter.inProgress': 'In Progress',
  'doctor.filter.closed': 'Closed',
  'doctor.filter.searchPrompt': 'Search by name, phone or ID...',
  'doctor.filter.sortAsc': 'Sort Asc',
  'doctor.filter.sortDesc': 'Sort Desc',
  'doctor.filter.cardView1': '1 Column',
  'doctor.filter.cardView2': '2 Columns',
  'doctor.filter.cardView3': '3 Columns',
  'doctor.filter.cardDisplay': 'Layout',
  'doctor.filter.refresh': 'Refresh',
  'doctor.filter.noResults': 'No visits found',
  'doctor.visit.id': 'ID',
  'doctor.visit.age': 'Age',
  'doctor.visit.type': 'Type',
  'doctor.visit.open': 'Open',
  'doctor.visit.details': 'Details',
  'doctor.visit.reopen': 'Reopen',
  'doctor.visit.reopened': 'Visit reopened successfully',
  'doctor.visit.reopenFailed': 'Failed to reopen visit',
  'doctor.visit.reopenError': 'Error reopening visit',
  'doctor.visit.loadError': 'Failed to load visits',
  'doctor.findVisit.prompt': 'Enter Visit ID...',
  'doctor.findVisit.notFound': 'Visit #{0} not found',
  'doctor.findVisit.invalidAlert': 'Please enter a valid visit ID',
  'doctor.findVisit.emptyAlert': 'Please enter a visit ID',
  'doctor.findVisit.errorFetch': 'Error fetching visit',
  'doctor.notifications.title': 'Notifications',
  'doctor.notifications.noOpen': 'No open visits',
  'doctor.notifications.openVisits': 'Open Visits',
  'doctor.notifications.visitId': 'Visit ID',
  'doctor.notifications.patient': 'Patient',
  'doctor.notifications.status': 'Status',
  'doctor.password.title': 'Change Password',
  'doctor.password.old': 'Old Password',
  'doctor.password.new': 'New Password',
  'doctor.password.confirm': 'Confirm Password',
  'doctor.password.save': 'Save',
  'doctor.password.fillAll': 'Please fill all fields',
  'doctor.password.notMatch': 'New passwords do not match',
  'doctor.password.success': 'Password changed successfully',
  'doctor.password.error': 'Error changing password',
  'doctor.details.patientInfo': 'Patient Information',
  'doctor.details.medicalInfo': 'Medical Information',
  'doctor.details.prescribedDrugs': 'Prescribed Drugs',
  'doctor.details.noDrugs': 'No drugs prescribed',
  'doctor.details.procedures': 'Procedures',
  'doctor.details.noProcedures': 'No procedures performed',
  'doctor.details.patient': 'Patient',
  'doctor.details.chiefComplaint': 'Chief Complaint',
  'doctor.details.history': 'History',
  'doctor.details.medications': 'Medications',
  'doctor.details.allergies': 'Allergies',
  'doctor.details.notes': 'Doctor Notes',
  'doctor.visit.phone': 'Phone',
  'doctor.visit.gender': 'Gender',
  'doctor.visit.visitDate': 'Visit Date',
  'doctor.visit.status': 'Status',
  'doctor.dialog.close': 'Close',
  'doctor.pdf.patient': 'Patient Info',
  'doctor.pdf.medical': 'Medical Info',
  'doctor.pdf.drugs': 'Drugs Report',
  'doctor.pdf.procedures': 'Procedures Report',
  'doctor.pdf.visitReport': 'Visit Report',
  'doctor.pdf.patientLabel': 'Patient',
  'doctor.pdf.doctorLabel': 'Doctor',
  'doctor.pdf.dateLabel': 'Date',
  'doctor.pdf.patientInfo': 'Patient Information',
  'doctor.pdf.medicalInfo': 'Medical Information',
  'doctor.pdf.drugsReport': 'Drugs Report',
  'doctor.pdf.proceduresReport': 'Procedures Report',
  'doctor.filter.page': 'Page',
  'doctor.filter.of': 'of',
  'doctor.loading': 'Loading...',
  'doctor.error': 'Error',
  'doctor.retry': 'Retry',
  'doctor.reports.comingSoon': 'Reports feature coming soon',
  'doctor.details.visitReport': 'Visit Report',
  'doctor.details.dateLabel': 'Date',
  'doctor.details.patientLabel': 'Patient',
  'doctor.details.doctorLabel': 'Doctor',
  'doctor.pdf.generating': 'Generating PDF...',
  'doctor.pdf.downloading': 'Downloading PDF...',
  'doctor.pdf.success': 'PDF downloaded successfully',
  'doctor.pdf.error': 'Error generating PDF',
  'doctor.pdf.fullReport': 'Full Report',
  'doctor.pdf.patientDrugs': 'Patient + Drugs',
  'doctor.pdf.patientProcedures': 'Patient + Procedures',
    'doctor.reports.title': 'Reports Dashboard',
  'doctor.reports.close': 'Close Reports',
};

// Arabic translations
const AR_BUNDLE = {
  'doctor.home.title': 'لوحة تحكم الطبيب',
  'doctor.home.welcome': 'مرحباً, {0}',
  'doctor.sidebar.menu': 'القائمة',
  'doctor.sidebar.searchPatient': 'بحث عن مريض',
  'doctor.sidebar.reports': 'التقارير',
  'doctor.sidebar.changePassword': 'تغيير كلمة المرور',
  'doctor.sidebar.logout': 'تسجيل الخروج',
  'doctor.sidebar.logoutConfirm': 'هل أنت متأكد من تسجيل الخروج؟',
  'doctor.dashboard.todayVisits': 'زيارات اليوم',
  'doctor.dashboard.totalVisits': 'إجمالي الزيارات',
  'doctor.dashboard.newVisits': 'زيارات جديدة',
  'doctor.dashboard.closedVisits': 'زيارات مغلقة',
  'doctor.performance.title': '📊 نظرة عامة على الأداء',
  'doctor.performance.patientsSeen': 'المرضى اليوم',
  'doctor.performance.openVisits': 'زيارات مفتوحة',
  'doctor.performance.completedToday': 'مكتمل اليوم',
  'doctor.performance.completionRate': 'نسبة الإنجاز',
  'doctor.filter.today': 'اليوم',
  'doctor.filter.all': 'الكل',
  'doctor.filter.new': 'جديد',
  'doctor.filter.inProgress': 'قيد التنفيذ',
  'doctor.filter.closed': 'مغلق',
  'doctor.filter.searchPrompt': 'بحث بالاسم أو رقم الهاتف أو المعرف...',
  'doctor.filter.sortAsc': 'ترتيب تصاعدي',
  'doctor.filter.sortDesc': 'ترتيب تنازلي',
  'doctor.filter.cardView1': 'عمود واحد',
  'doctor.filter.cardView2': 'عمودان',
  'doctor.filter.cardView3': 'ثلاثة أعمدة',
  'doctor.filter.cardDisplay': 'تخطيط',
  'doctor.filter.refresh': 'تحديث',
  'doctor.filter.noResults': 'لا توجد زيارات',
  'doctor.visit.id': 'المعرف',
  'doctor.visit.age': 'العمر',
  'doctor.visit.type': 'النوع',
  'doctor.visit.open': 'فتح',
  'doctor.visit.details': 'تفاصيل',
  'doctor.visit.reopen': 'إعادة فتح',
  'doctor.visit.reopened': 'تم إعادة فتح الزيارة بنجاح',
  'doctor.visit.reopenFailed': 'فشل إعادة فتح الزيارة',
  'doctor.visit.reopenError': 'خطأ في إعادة فتح الزيارة',
  'doctor.visit.loadError': 'فشل تحميل الزيارات',
  'doctor.findVisit.prompt': 'أدخل معرف الزيارة...',
  'doctor.findVisit.notFound': 'الزيارة رقم {0} غير موجودة',
  'doctor.findVisit.invalidAlert': 'الرجاء إدخال معرف زيارة صحيح',
  'doctor.findVisit.emptyAlert': 'الرجاء إدخال معرف الزيارة',
  'doctor.findVisit.errorFetch': 'خطأ في جلب الزيارة',
  'doctor.notifications.title': 'الإشعارات',
  'doctor.notifications.noOpen': 'لا توجد زيارات مفتوحة',
  'doctor.notifications.openVisits': 'الزيارات المفتوحة',
  'doctor.notifications.visitId': 'معرف الزيارة',
  'doctor.notifications.patient': 'المريض',
  'doctor.notifications.status': 'الحالة',
  'doctor.password.title': 'تغيير كلمة المرور',
  'doctor.password.old': 'كلمة المرور القديمة',
  'doctor.password.new': 'كلمة المرور الجديدة',
  'doctor.password.confirm': 'تأكيد كلمة المرور',
  'doctor.password.save': 'حفظ',
  'doctor.password.fillAll': 'الرجاء ملء جميع الحقول',
  'doctor.password.notMatch': 'كلمات المرور غير متطابقة',
  'doctor.password.success': 'تم تغيير كلمة المرور بنجاح',
  'doctor.password.error': 'خطأ في تغيير كلمة المرور',
  'doctor.details.patientInfo': 'معلومات المريض',
  'doctor.details.medicalInfo': 'المعلومات الطبية',
  'doctor.details.prescribedDrugs': 'الأدوية الموصوفة',
  'doctor.details.noDrugs': 'لا توجد أدوية موصوفة',
  'doctor.details.procedures': 'الإجراءات',
  'doctor.details.noProcedures': 'لا توجد إجراءات',
  'doctor.details.patient': 'المريض',
  'doctor.details.chiefComplaint': 'الشكوى الرئيسية',
  'doctor.details.history': 'التاريخ الطبي',
  'doctor.details.medications': 'الأدوية',
  'doctor.details.allergies': 'الحساسية',
  'doctor.details.notes': 'ملاحظات الطبيب',
  'doctor.visit.phone': 'الهاتف',
  'doctor.visit.gender': 'الجنس',
  'doctor.visit.visitDate': 'تاريخ الزيارة',
  'doctor.visit.status': 'الحالة',
  'doctor.dialog.close': 'إغلاق',
  'doctor.pdf.patient': 'معلومات المريض',
  'doctor.pdf.medical': 'المعلومات الطبية',
  'doctor.pdf.drugs': 'تقرير الأدوية',
  'doctor.pdf.procedures': 'تقرير الإجراءات',
  'doctor.pdf.visitReport': 'تقرير الزيارة',
  'doctor.pdf.patientLabel': 'المريض',
  'doctor.pdf.doctorLabel': 'الطبيب',
  'doctor.pdf.dateLabel': 'التاريخ',
  'doctor.pdf.patientInfo': 'معلومات المريض',
  'doctor.pdf.medicalInfo': 'المعلومات الطبية',
  'doctor.pdf.drugsReport': 'تقرير الأدوية',
  'doctor.pdf.proceduresReport': 'تقرير الإجراءات',
  'doctor.filter.page': 'صفحة',
  'doctor.filter.of': 'من',
  'doctor.loading': 'جاري التحميل...',
  'doctor.error': 'خطأ',
  'doctor.retry': 'إعادة المحاولة',
  'doctor.reports.comingSoon': 'ميزة التقارير قريباً',
  'doctor.details.visitReport': 'تقرير الزيارة',
  'doctor.details.dateLabel': 'التاريخ',
  'doctor.details.patientLabel': 'المريض',
  'doctor.details.doctorLabel': 'الطبيب',
  'doctor.pdf.generating': 'جاري إنشاء PDF...',
  'doctor.pdf.downloading': 'جاري تحميل PDF...',
  'doctor.pdf.success': 'تم تحميل PDF بنجاح',
  'doctor.pdf.error': 'خطأ في إنشاء PDF',
  'doctor.pdf.fullReport': 'تقرير كامل',
  'doctor.pdf.patientDrugs': 'المريض + الأدوية',
  'doctor.pdf.patientProcedures': 'المريض + الإجراءات',
  'doctor.reports.title': 'لوحة التقارير',
  'doctor.reports.close': 'إغلاق التقارير',
};

const DoctorHomePage = ({ doctorId, username, language: propLanguage }) => {
  // ==================== API BASE URL ====================
  const API_BASE_URL = BASE_URL;

  // ==================== GET LANGUAGE FROM LOCALSTORAGE ====================
  const getLanguage = () => {
    if (propLanguage) return propLanguage;
    const storedLang = localStorage.getItem('lang');
    if (storedLang) return storedLang;
    return 'en';
  };

  // ==================== STATE ====================
  const [showVisitPopup, setShowVisitPopup] = useState(false);
  const [popupVisit, setPopupVisit] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGridLayout, setIsGridLayout] = useState(true);
  const [sortByDateAsc, setSortByDateAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [visitsCache, setVisitsCache] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('TODAY');
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [lastNotificationCount, setLastNotificationCount] = useState(0);
  const [cardsPerRowIndex, setCardsPerRowIndex] = useState(2);
  const [cardsPerRowPattern] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [locale, setLocale] = useState(getLanguage());
  

    // ==================== GUIDE STATE ====================
  const [showGuide, setShowGuide] = useState(false);
  // ==================== SEARCH PATIENT SCREEN STATE ====================
  const [showSearchPatient, setShowSearchPatient] = useState(false);
  
  // ==================== DETAILS MODAL STATE ====================
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsVisitData, setDetailsVisitData] = useState(null);
  const [detailsVisitDrugs, setDetailsVisitDrugs] = useState([]);
  const [detailsVisitProcedures, setDetailsVisitProcedures] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  
  // ==================== PASSWORD MODAL STATE ====================
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  // ==================== REPORTS SCREEN STATE ====================
  const [showReportsScreen, setShowReportsScreen] = useState(false);

  // ==================== LOCALIZATION ====================
  const getBundle = useCallback(() => {
    return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
  }, [locale]);

  const t = useCallback((key) => {
    const bundle = getBundle();
    return bundle[key] || key;
  }, [getBundle]);

  const isRTL = locale === 'ar';

  // ==================== VISIT SCREEN STATE ====================
  const [showVisitScreen, setShowVisitScreen] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [selectedVisitStatus, setSelectedVisitStatus] = useState('NEW');
  
  // Dashboard summary stats
  const [summaryStats, setSummaryStats] = useState({
    today: 0,
    total: 0,
    open: 0,
    closed: 0
  });
  
  // Performance widget stats
  const [performanceStats, setPerformanceStats] = useState({
    patientsSeen: 0,
    openVisits: 0,
    completedToday: 0,
    completionRate: 0
  });

  // Filter counts
  const [filterCounts, setFilterCounts] = useState({
    TODAY: 0,
    ALL: 0,
    NEW: 0,
    IN_PROGRESS: 0,
    CLOSED: 0
  });

  // Refs
  const scrollPaneRef = useRef(null);
  const autoRefreshInterval = useRef(null);
  const notificationInterval = useRef(null);
  const mountedRef = useRef(true);
  const detailsModalRef = useRef(null);

  // ==================== API CALLS WITH ERROR HANDLING ====================
  const apiFetch = useCallback(async (endpoint, options = {}) => {
    const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${API_BASE_URL}${url}`;
    
    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage;
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.error || `HTTP ${response.status}`;
        } catch {
          errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const text = await response.text();
      if (!text || text.trim() === '') {
        throw new Error('Empty response');
      }
      
      try {
        const json = JSON.parse(text);
        return json;
      } catch (e) {
        throw new Error('Invalid JSON response');
      }
    } catch (error) {
      console.error('API Error:', error.message);
      throw error;
    }
  }, [API_BASE_URL]);

  // ==================== UTILITY FUNCTIONS ====================
  const buildFullName = useCallback((patient) => {
    if (!patient) return '';
    return [patient.firstName, patient.middleName, patient.lastName]
      .filter(Boolean)
      .join(' ')
      .trim() || 'Unknown';
  }, []);

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
      return age > 0 ? age.toString() : '0';
    } catch (e) {
      return '-';
    }
  }, []);

  const formatDateTime = useCallback((iso) => {
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
    } catch (e) {
      return '-';
    }
  }, [isRTL]);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'CREATED': return '#e74c3c';
      case 'IN_PROGRESS': return '#f39c12';
      case 'CLOSED': return '#27ae60';
      default: return '#3498db';
    }
  }, []);

  const getStatusBgColor = useCallback((status) => {
    switch (status) {
      case 'CREATED': return '#fff5f5';
      case 'IN_PROGRESS': return '#fffbf0';
      case 'CLOSED': return '#f0fff4';
      default: return 'white';
    }
  }, []);

  const mapDurationType = useCallback((type) => {
    if (!type) return '-';
    const map = {
      '1': 'Hour',
      '2': 'Day',
      '3': 'Week',
      '4': 'Month',
      '5': 'Year'
    };
    return map[type] || '-';
  }, []);

  const updateFilterCounts = useCallback((visits) => {
    const today = new Date().toDateString();
    let counts = { TODAY: 0, ALL: 0, NEW: 0, IN_PROGRESS: 0, CLOSED: 0 };
    
    visits.forEach(visit => {
      counts.ALL++;
      const status = visit.visitStatus || 'CREATED';
      if (status === 'CREATED') counts.NEW++;
      else if (status === 'IN_PROGRESS') counts.IN_PROGRESS++;
      else if (status === 'CLOSED') counts.CLOSED++;
      
      if (visit.visitDate && new Date(visit.visitDate).toDateString() === today) {
        counts.TODAY++;
      }
    });
    
    setFilterCounts(counts);
  }, []);

  const updatePerformanceStats = useCallback((visits) => {
    const today = new Date().toDateString();
    let patientsSeen = 0;
    let openVisits = 0;
    let completedToday = 0;
    
    visits.forEach(visit => {
      const status = visit.visitStatus || 'CREATED';
      const visitDate = visit.visitDate ? new Date(visit.visitDate).toDateString() : '';
      
      if (visitDate === today) {
        patientsSeen++;
        if (status === 'CLOSED') completedToday++;
      }
      
      if (status !== 'CLOSED') openVisits++;
    });
    
    const completionRate = patientsSeen === 0 ? 0 : (completedToday / patientsSeen) * 100;
    
    setPerformanceStats({
      patientsSeen,
      openVisits,
      completedToday,
      completionRate: Math.round(completionRate * 10) / 10
    });
  }, []);

  // ==================== FILTERING FUNCTION ====================
  const filterVisits = useCallback((visits, filter, searchQuery, sortAsc) => {
    const q = searchQuery.toLowerCase().trim();
    const today = new Date().toDateString();
    
    let filtered = visits.filter(visit => {
      const patient = visit.patient || {};
      const name = buildFullName(patient).toLowerCase();
      const phone = (patient.phone || '').toLowerCase();
      const visitId = String(visit.id || '');
      
      const matchesSearch = name.includes(q) || phone.includes(q) || visitId.includes(q);
      
      const status = visit.visitStatus || 'CREATED';
      const visitDate = visit.visitDate ? new Date(visit.visitDate) : null;
      const isToday = visitDate && visitDate.toDateString() === today;
      
      let statusMatches = true;
      switch (filter) {
        case 'TODAY':
          statusMatches = isToday;
          break;
        case 'NEW':
          statusMatches = status === 'CREATED';
          break;
        case 'IN_PROGRESS':
          statusMatches = status === 'IN_PROGRESS';
          break;
        case 'CLOSED':
          statusMatches = status === 'CLOSED';
          break;
        case 'ALL':
          statusMatches = true;
          break;
        default:
          statusMatches = true;
      }
      
      return matchesSearch && statusMatches;
    });
    
    filtered.sort((a, b) => {
      const dateA = a.visitDate ? new Date(a.visitDate) : new Date(0);
      const dateB = b.visitDate ? new Date(b.visitDate) : new Date(0);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
    
    return filtered;
  }, [buildFullName]);

  // ==================== LOAD FUNCTIONS ====================
  const loadDoctorVisits = useCallback(async (filter, resetPage = true, pageOverride = null) => {
    if (resetPage) {
      setCurrentPage(0);
    }

    setCurrentFilter(filter);
    setCurrentSearchQuery('');
    setLoading(true);
    setError(null);

    try {
      const pageToUse = pageOverride !== null ? pageOverride : (resetPage ? 0 : currentPage);
      const endpoint = `/api/visits/doctor/${doctorId}?page=${pageToUse}&size=${PAGE_SIZE}`;

      const data = await apiFetch(endpoint);

      const visits = data.content || [];
      const total = data.totalPages || 1;

      setTotalPages(total);
      setVisitsCache(visits);

      updateFilterCounts(visits);
      updatePerformanceStats(visits);

      const filtered = filterVisits(visits, filter, '', sortByDateAsc);
      setFilteredVisits(filtered);

      if (scrollPaneRef.current) {
        scrollPaneRef.current.scrollTop = 0;
      }
    } catch (err) {
      setError(t('doctor.visit.loadError') || 'Failed to load visits');
      console.error('Error loading visits:', err);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, [doctorId, sortByDateAsc, t, apiFetch, filterVisits, updateFilterCounts, updatePerformanceStats]);

  const loadSummaryCards = useCallback(async () => {
    try {
      const endpoint = `/api/visits/doctor/${doctorId}/summary`;
      const data = await apiFetch(endpoint);
      setSummaryStats({
        today: data.totalToday || 0,
        total: data.totalVisits || 0,
        open: data.totalOpen || 0,
        closed: data.totalClosed || 0
      });
    } catch (error) {
      console.error('Error loading summary:', error);
    }
  }, [doctorId, apiFetch]);

  const findVisitById = useCallback(async (visitId) => {
    if (!visitId) {
      alert(t('doctor.findVisit.emptyAlert'));
      return;
    }
    
    try {
      const endpoint = `/api/visits/find/${visitId}`;
      const visit = await apiFetch(endpoint);
      setPopupVisit(visit);
      setShowVisitPopup(true);
    } catch (error) {
      alert(t('doctor.findVisit.notFound').replace('{0}', visitId));
    }
  }, [t, apiFetch]);

  // ==================== PDF GENERATION FUNCTIONS ====================
  const createPdfHtml = useCallback((title, content, visitId) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <style>
            body {
              font-family: Arial, Helvetica, sans-serif;
              padding: 40px;
              line-height: 1.6;
              color: #333;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #1E90FF;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #1E90FF;
              margin: 0;
              font-size: 24px;
            }
            .header p {
              color: #666;
              margin: 5px 0 0 0;
            }
            .section {
              margin-bottom: 25px;
              padding: 15px;
              border: 1px solid #e0e0e0;
              border-radius: 8px;
              background: #f9f9f9;
            }
            .section h2 {
              color: #2C3E50;
              border-bottom: 2px solid #e0e0e0;
              padding-bottom: 8px;
              margin-top: 0;
            }
            .info-row {
              display: flex;
              padding: 5px 0;
              border-bottom: 1px solid #f0f0f0;
            }
            .info-label {
              font-weight: bold;
              width: 150px;
              color: #555;
            }
            .info-value {
              flex: 1;
              color: #333;
            }
            .drug-item {
              background: white;
              padding: 12px;
              margin: 8px 0;
              border-radius: 6px;
              border: 1px solid #e0e0e0;
            }
            .drug-name {
              font-weight: bold;
              color: #2C3E50;
              font-size: 16px;
            }
            .drug-detail {
              display: flex;
              padding: 3px 0;
              font-size: 14px;
            }
            .drug-label {
              font-weight: bold;
              width: 120px;
              color: #666;
            }
            .procedure-item {
              padding: 8px 12px;
              margin: 5px 0;
              background: white;
              border-radius: 4px;
              border-left: 4px solid #3498DB;
            }
            .procedure-category {
              font-size: 12px;
              font-weight: bold;
              color: #3498DB;
            }
            .procedure-name {
              font-size: 14px;
              color: #333;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e0e0e0;
              color: #999;
              font-size: 12px;
            }
            .badge {
              display: inline-block;
              padding: 2px 12px;
              border-radius: 12px;
              color: white;
              font-weight: bold;
              font-size: 12px;
            }
            .badge-created { background: #e74c3c; }
            .badge-inprogress { background: #f39c12; }
            .badge-closed { background: #27ae60; }
            .badge-default { background: #3498db; }
            .section-divider {
              border-top: 2px dashed #e0e0e0;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          ${content}
          <div class="footer">
            Generated on ${new Date().toLocaleString()}
          </div>
        </body>
      </html>
    `;
  }, []);

  const generatePDF = useCallback((title, content, filename) => {
    setGeneratingPdf(true);
    
    try {
      const htmlContent = createPdfHtml(title, content, '');
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      alert(t('doctor.pdf.success'));
    } catch (error) {
      console.error('PDF generation error:', error);
      alert(t('doctor.pdf.error') + ': ' + error.message);
    } finally {
      setGeneratingPdf(false);
    }
  }, [createPdfHtml, t]);

  // ==================== SHOW VISIT DETAILS ====================
  const showVisitDetails = useCallback(async (visitId) => {
    setLoadingDetails(true);
    setShowDetailsModal(true);

    try {
      const visitData = await apiFetch(`/api/visits/${visitId}`);
      setDetailsVisitData(visitData);

      const visitDrugs = visitData.visitDrugs || [];
      setDetailsVisitDrugs(visitDrugs);

      const visitProcedures = visitData.procedures || [];
      setDetailsVisitProcedures(visitProcedures);

    } catch (error) {
      alert(t('doctor.visit.loadError') + ': ' + error.message);
      setShowDetailsModal(false);
    } finally {
      setLoadingDetails(false);
    }
  }, [apiFetch, t]);

  // ==================== PDF EXPORT FUNCTIONS ====================
  const exportFullVisitPdf = useCallback(() => {
    if (!detailsVisitData) return;
    
    const visit = detailsVisitData;
    const patient = visit.patient || {};
    const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
                        visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
                        visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
    
    let drugsHtml = '';
    if (detailsVisitDrugs.length === 0) {
      drugsHtml = '<p style="color: #999; font-style: italic;">No drugs prescribed</p>';
    } else {
      detailsVisitDrugs.forEach((drug) => {
        const drugObj = drug.drug || {};
        drugsHtml += `
          <div class="drug-item">
            <div class="drug-name">💊 ${drugObj.tradeName || drug.tradeName || 'Unknown'}</div>
            <div class="drug-detail">
              <span class="drug-label">Strength:</span>
              <span>${drugObj.strength || drug.strength || '-'} ${drugObj.unitType || drug.unitType || ''}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Dose:</span>
              <span>${drug.dose || '-'}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Frequency:</span>
              <span>${drug.frequency || '-'}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Duration:</span>
              <span>${drug.duration || '-'} ${mapDurationType(drug.durationType)}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Instructions:</span>
              <span>${drug.instructions || 'No instructions'}</span>
            </div>
          </div>
        `;
      });
    }

    let proceduresHtml = '';
    if (detailsVisitProcedures.length === 0) {
      proceduresHtml = '<p style="color: #999; font-style: italic;">No procedures performed</p>';
    } else {
      detailsVisitProcedures.forEach((proc) => {
        let icon = '🧪';
        let category = 'General';
        let color = '#3498DB';
        
        if (proc.startsWith('[RADIOLOGY]')) {
          icon = '📡';
          category = 'Radiology';
          color = '#E74C3C';
        } else if (proc.startsWith('[LABORATORY]')) {
          icon = '🧫';
          category = 'Laboratory';
          color = '#2ECC71';
        } else if (proc.startsWith('[MEDICAL]')) {
          icon = '🩺';
          category = 'Medical';
          color = '#F39C12';
        }
        
        const cleanProc = proc.replace(/\[.*?\]\s*/, '');
        
        proceduresHtml += `
          <div class="procedure-item" style="border-left-color: ${color};">
            <div class="procedure-category" style="color: ${color};">${icon} ${category}</div>
            <div class="procedure-name">${cleanProc}</div>
          </div>
        `;
      });
    }

    const content = `
      <div class="header">
        <h1>${t('doctor.details.visitReport')}</h1>
        <p>Complete Report - Visit #${visit.id}</p>
      </div>

      <div class="section">
        <h2>👤 ${t('doctor.details.patientInfo')}</h2>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.id')}</span>
          <span class="info-value">${visit.id}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.patient')}</span>
          <span class="info-value">${buildFullName(patient)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.phone')}</span>
          <span class="info-value">${patient.phone || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.gender')}</span>
          <span class="info-value">${patient.gender || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.visitDate')}</span>
          <span class="info-value">${formatDateTime(visit.visitDate)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.status')}</span>
          <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
        </div>
      </div>

      <div class="section">
        <h2>🏥 ${t('doctor.details.medicalInfo')}</h2>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.chiefComplaint')}</span>
          <span class="info-value">${visit.chiefComplaint || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.history')}</span>
          <span class="info-value">${visit.history || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.medications')}</span>
          <span class="info-value">${visit.medications || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.allergies')}</span>
          <span class="info-value">${visit.allergies || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.notes')}</span>
          <span class="info-value">${visit.doctorNotes || '-'}</span>
        </div>
      </div>

      <div class="section">
        <h2>💊 ${t('doctor.details.prescribedDrugs')}</h2>
        ${drugsHtml}
      </div>

      <div class="section">
        <h2>🔬 ${t('doctor.details.procedures')}</h2>
        ${proceduresHtml}
      </div>
    `;

    generatePDF(t('doctor.details.visitReport'), content, `Visit_${visit.id}_Full_Report`);
  }, [detailsVisitData, detailsVisitDrugs, detailsVisitProcedures, buildFullName, formatDateTime, mapDurationType, generatePDF, t]);

  const exportPatientPdf = useCallback(() => {
    if (!detailsVisitData) return;
    
    const visit = detailsVisitData;
    const patient = visit.patient || {};
    const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
                        visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
                        visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
    
    const content = `
      <div class="header">
        <h1>${t('doctor.pdf.patientInfo')}</h1>
        <p>${t('doctor.details.patientLabel')}: ${buildFullName(patient)}</p>
      </div>

      <div class="section">
        <h2>👤 ${t('doctor.details.patientInfo')}</h2>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.id')}</span>
          <span class="info-value">${visit.id}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.patient')}</span>
          <span class="info-value">${buildFullName(patient)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.phone')}</span>
          <span class="info-value">${patient.phone || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.gender')}</span>
          <span class="info-value">${patient.gender || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.visitDate')}</span>
          <span class="info-value">${formatDateTime(visit.visitDate)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.status')}</span>
          <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
        </div>
      </div>
    `;

    generatePDF(t('doctor.pdf.patientInfo'), content, `Patient_${visit.id}_Info`);
  }, [detailsVisitData, buildFullName, formatDateTime, generatePDF, t]);

  const exportMedicalPdf = useCallback(() => {
    if (!detailsVisitData) return;
    
    const visit = detailsVisitData;
    
    const content = `
      <div class="header">
        <h1>${t('doctor.pdf.medicalInfo')}</h1>
        <p>Visit #${visit.id}</p>
      </div>

      <div class="section">
        <h2>🏥 ${t('doctor.details.medicalInfo')}</h2>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.chiefComplaint')}</span>
          <span class="info-value">${visit.chiefComplaint || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.history')}</span>
          <span class="info-value">${visit.history || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.medications')}</span>
          <span class="info-value">${visit.medications || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.allergies')}</span>
          <span class="info-value">${visit.allergies || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.notes')}</span>
          <span class="info-value">${visit.doctorNotes || '-'}</span>
        </div>
      </div>
    `;

    generatePDF(t('doctor.pdf.medicalInfo'), content, `Visit_${visit.id}_Medical`);
  }, [detailsVisitData, generatePDF, t]);

  const exportDrugsPdf = useCallback(() => {
    if (!detailsVisitData) return;
    
    const visit = detailsVisitData;
    const drugs = detailsVisitDrugs || [];
    
    let drugsHtml = '';
    if (drugs.length === 0) {
      drugsHtml = '<p style="color: #999; font-style: italic;">No drugs prescribed</p>';
    } else {
      drugs.forEach((item) => {
        const drug = item.drug || {};
        drugsHtml += `
          <div class="drug-item">
            <div class="drug-name">💊 ${drug.tradeName || 'Unknown'}</div>
            <div class="drug-detail">
              <span class="drug-label">Strength:</span>
              <span>${drug.strength || '-'} ${drug.unitType || ''}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Dose:</span>
              <span>${item.dose || '-'}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Frequency:</span>
              <span>${item.frequency || '-'}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Duration:</span>
              <span>${item.duration || '-'} ${mapDurationType(item.durationType)}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Instructions:</span>
              <span>${item.instructions || 'No instructions'}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Package:</span>
              <span>${drug.packageSize || '-'} - ${drug.packageType || '-'}</span>
            </div>
          </div>
        `;
      });
    }

    const content = `
      <div class="header">
        <h1>${t('doctor.pdf.drugsReport')}</h1>
        <p>Visit #${visit.id}</p>
      </div>

      <div class="section">
        <h2>💊 ${t('doctor.details.prescribedDrugs')}</h2>
        ${drugsHtml}
      </div>
    `;

    generatePDF(t('doctor.pdf.drugsReport'), content, `Visit_${visit.id}_Drugs`);
  }, [detailsVisitData, detailsVisitDrugs, mapDurationType, generatePDF, t]);

  const exportProceduresPdf = useCallback(() => {
    if (!detailsVisitData) return;
    
    const visit = detailsVisitData;
    const procedures = detailsVisitProcedures || [];
    
    let proceduresHtml = '';
    if (procedures.length === 0) {
      proceduresHtml = '<p style="color: #999; font-style: italic;">No procedures performed</p>';
    } else {
      procedures.forEach((proc) => {
        let icon = '🧪';
        let category = 'General';
        let color = '#3498DB';
        
        const upperProc = proc.toUpperCase();
        if (upperProc.includes('RADIOLOGY') || upperProc.includes('MRI') || upperProc.includes('CT') || upperProc.includes('X-RAY') || upperProc.includes('ULTRASOUND')) {
          icon = '📡';
          category = 'Radiology';
          color = '#E74C3C';
        } else if (upperProc.includes('LAB') || upperProc.includes('PCR') || upperProc.includes('BLOOD') || upperProc.includes('URINE')) {
          icon = '🧫';
          category = 'Laboratory';
          color = '#2ECC71';
        } else if (upperProc.includes('SURGERY') || upperProc.includes('OPR') || upperProc.includes('OPERATION')) {
          icon = '🩺';
          category = 'Surgical';
          color = '#F39C12';
        }
        
        proceduresHtml += `
          <div class="procedure-item" style="border-left-color: ${color};">
            <div class="procedure-category" style="color: ${color};">${icon} ${category}</div>
            <div class="procedure-name">${proc}</div>
          </div>
        `;
      });
    }

    const content = `
      <div class="header">
        <h1>${t('doctor.pdf.proceduresReport')}</h1>
        <p>Visit #${visit.id}</p>
      </div>

      <div class="section">
        <h2>🔬 ${t('doctor.details.procedures')}</h2>
        ${proceduresHtml}
      </div>
    `;

    generatePDF(t('doctor.pdf.proceduresReport'), content, `Visit_${visit.id}_Procedures`);
  }, [detailsVisitData, detailsVisitProcedures, generatePDF, t]);

  const exportPatientAndDrugsPdf = useCallback(() => {
    if (!detailsVisitData) return;
    
    const visit = detailsVisitData;
    const patient = visit.patient || {};
    const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
                        visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
                        visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
    
    let drugsHtml = '';
    if (detailsVisitDrugs.length === 0) {
      drugsHtml = '<p style="color: #999; font-style: italic;">No drugs prescribed</p>';
    } else {
      detailsVisitDrugs.forEach((drug) => {
        const drugObj = drug.drug || {};
        drugsHtml += `
          <div class="drug-item">
            <div class="drug-name">💊 ${drugObj.tradeName || drug.tradeName || 'Unknown'}</div>
            <div class="drug-detail">
              <span class="drug-label">Strength:</span>
              <span>${drugObj.strength || drug.strength || '-'} ${drugObj.unitType || drug.unitType || ''}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Dose:</span>
              <span>${drug.dose || '-'}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Frequency:</span>
              <span>${drug.frequency || '-'}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Duration:</span>
              <span>${drug.duration || '-'} ${mapDurationType(drug.durationType)}</span>
            </div>
            <div class="drug-detail">
              <span class="drug-label">Instructions:</span>
              <span>${drug.instructions || 'No instructions'}</span>
            </div>
          </div>
        `;
      });
    }

    const content = `
      <div class="header">
        <h1>${t('doctor.pdf.patientInfo')} & ${t('doctor.pdf.drugsReport')}</h1>
        <p>Visit #${visit.id}</p>
      </div>

      <div class="section">
        <h2>👤 ${t('doctor.details.patientInfo')}</h2>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.id')}</span>
          <span class="info-value">${visit.id}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.patient')}</span>
          <span class="info-value">${buildFullName(patient)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.phone')}</span>
          <span class="info-value">${patient.phone || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.gender')}</span>
          <span class="info-value">${patient.gender || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.visitDate')}</span>
          <span class="info-value">${formatDateTime(visit.visitDate)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.status')}</span>
          <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
        </div>
      </div>

      <div class="section-divider"></div>

      <div class="section">
        <h2>💊 ${t('doctor.details.prescribedDrugs')}</h2>
        ${drugsHtml}
      </div>
    `;

    generatePDF(`${t('doctor.pdf.patientInfo')} & ${t('doctor.pdf.drugsReport')}`, content, `Visit_${visit.id}_Patient_Drugs`);
  }, [detailsVisitData, detailsVisitDrugs, buildFullName, formatDateTime, mapDurationType, generatePDF, t]);

  const exportPatientAndProceduresPdf = useCallback(() => {
    if (!detailsVisitData) return;
    
    const visit = detailsVisitData;
    const patient = visit.patient || {};
    const statusColor = visit.visitStatus === 'CREATED' ? 'badge-created' : 
                        visit.visitStatus === 'IN_PROGRESS' ? 'badge-inprogress' : 
                        visit.visitStatus === 'CLOSED' ? 'badge-closed' : 'badge-default';
    
    let proceduresHtml = '';
    if (detailsVisitProcedures.length === 0) {
      proceduresHtml = '<p style="color: #999; font-style: italic;">No procedures performed</p>';
    } else {
      detailsVisitProcedures.forEach((proc) => {
        let icon = '🧪';
        let category = 'General';
        let color = '#3498DB';
        
        if (proc.startsWith('[RADIOLOGY]')) {
          icon = '📡';
          category = 'Radiology';
          color = '#E74C3C';
        } else if (proc.startsWith('[LABORATORY]')) {
          icon = '🧫';
          category = 'Laboratory';
          color = '#2ECC71';
        } else if (proc.startsWith('[MEDICAL]')) {
          icon = '🩺';
          category = 'Medical';
          color = '#F39C12';
        }
        
        const cleanProc = proc.replace(/\[.*?\]\s*/, '');
        
        proceduresHtml += `
          <div class="procedure-item" style="border-left-color: ${color};">
            <div class="procedure-category" style="color: ${color};">${icon} ${category}</div>
            <div class="procedure-name">${cleanProc}</div>
          </div>
        `;
      });
    }

    const content = `
      <div class="header">
        <h1>${t('doctor.pdf.patientInfo')} & ${t('doctor.pdf.proceduresReport')}</h1>
        <p>Visit #${visit.id}</p>
      </div>

      <div class="section">
        <h2>👤 ${t('doctor.details.patientInfo')}</h2>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.id')}</span>
          <span class="info-value">${visit.id}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.details.patient')}</span>
          <span class="info-value">${buildFullName(patient)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.phone')}</span>
          <span class="info-value">${patient.phone || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.gender')}</span>
          <span class="info-value">${patient.gender || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.visitDate')}</span>
          <span class="info-value">${formatDateTime(visit.visitDate)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">${t('doctor.visit.status')}</span>
          <span class="info-value"><span class="badge ${statusColor}">${visit.visitStatus || 'N/A'}</span></span>
        </div>
      </div>

      <div class="section-divider"></div>

      <div class="section">
        <h2>🔬 ${t('doctor.details.procedures')}</h2>
        ${proceduresHtml}
      </div>
    `;

    generatePDF(`${t('doctor.pdf.patientInfo')} & ${t('doctor.pdf.proceduresReport')}`, content, `Visit_${visit.id}_Patient_Procedures`);
  }, [detailsVisitData, detailsVisitProcedures, buildFullName, formatDateTime, generatePDF, t]);

  const reopenVisit = useCallback(async (visitId) => {
    try {
      const endpoint = `/api/visits/${visitId}/reopen`;
      await apiFetch(endpoint, { method: 'PUT' });
      alert(t('doctor.visit.reopened'));
      loadDoctorVisits(currentFilter, false);
      loadSummaryCards();
      setShowVisitPopup(false);
      setPopupVisit(null);
    } catch (error) {
      alert(t('doctor.visit.reopenError') + ': ' + error.message);
    }
  }, [t, currentFilter, loadDoctorVisits, loadSummaryCards, apiFetch]);

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    const endpoint = '/api/doctors/change-password';
    await apiFetch(endpoint, {
      method: 'PUT',
      body: JSON.stringify({
        username,
        oldPassword,
        newPassword
      })
    });
    return true;
  }, [username, apiFetch]);

  // ==================== VISIT SCREEN HANDLING ====================
  const openVisitScreen = useCallback((visitId, status) => {
    setSelectedVisitId(visitId);
    setSelectedVisitStatus(status);
    setShowVisitScreen(true);
    setShowVisitPopup(false);
    setPopupVisit(null);
  }, []);

  const closeVisitScreen = useCallback(() => {
    setShowVisitScreen(false);
    setSelectedVisitId(null);
    setSelectedVisitStatus('NEW');
    loadDoctorVisits(currentFilter, false);
    loadSummaryCards();
  }, [currentFilter, loadDoctorVisits, loadSummaryCards]);

  // ==================== SEARCH PATIENT HANDLING ====================
  const openSearchPatient = useCallback(() => {
    setShowSearchPatient(true);
  }, []);

  const closeSearchPatient = useCallback(() => {
    setShowSearchPatient(false);
  }, []);


   // ==================== REPORTS HANDLING ====================
  const openReportsScreen = useCallback(() => {
    setShowReportsScreen(true);
  }, []);

  const closeReportsScreen = useCallback(() => {
    setShowReportsScreen(false);
  }, []);
  // ==================== AVATAR HANDLING ====================
  const getAvatarPath = useCallback((gender) => {
    if (!gender) return `${process.env.PUBLIC_URL}/unknown.PNG`;
    
    const normalizedGender = gender.toUpperCase();
    if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
      return `${process.env.PUBLIC_URL}/female.PNG`;
    } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
      return `${process.env.PUBLIC_URL}/male.PNG`;
    }
    return `${process.env.PUBLIC_URL}/unknown.PNG`;
  }, []);

  const getAvatarColor = useCallback((gender) => {
    if (!gender) return '#95a5a6';
    
    const normalizedGender = gender.toUpperCase();
    if (normalizedGender === 'FEMALE' || normalizedGender === 'F') {
      return '#e91e63';
    } else if (normalizedGender === 'MALE' || normalizedGender === 'M') {
      return '#2196f3';
    }
    return '#95a5a6';
  }, []);

  // ==================== SEARCH HANDLING ====================
  const handleSearch = useCallback((query) => {
    setCurrentSearchQuery(query);
    const filtered = filterVisits(visitsCache, currentFilter, query, sortByDateAsc);
    setFilteredVisits(filtered);
  }, [visitsCache, currentFilter, sortByDateAsc, filterVisits]);

  // ==================== CARD LAYOUT ====================
  const toggleCardLayout = useCallback(() => {
    const newIndex = (cardsPerRowIndex + 1) % cardsPerRowPattern.length;
    setCardsPerRowIndex(newIndex);
    setIsGridLayout(true);
  }, [cardsPerRowIndex, cardsPerRowPattern]);

  // ==================== PAGINATION ====================
  const goToPage = useCallback((page) => {
    if (page >= 0 && page < totalPages && page !== currentPage) {
      setCurrentPage(page);
      loadDoctorVisits(currentFilter, false, page);
    }
  }, [totalPages, currentPage, currentFilter, loadDoctorVisits]);

  // ==================== NOTIFICATIONS ====================
  const checkNotifications = useCallback(() => {
    const count = visitsCache.filter(v => {
      const status = v.visitStatus || 'CREATED';
      return status === 'IN_PROGRESS' || status === 'CREATED';
    }).length;
    
    setNotificationCount(count);
    
    if (count > 0 && count > lastNotificationCount) {
      const icon = document.getElementById('notification-icon');
      if (icon) {
        icon.classList.add('notification-pulse');
        setTimeout(() => icon.classList.remove('notification-pulse'), 300);
      }
    }
    setLastNotificationCount(count);
  }, [visitsCache, lastNotificationCount]);

  // ==================== AUTO REFRESH ====================
  useEffect(() => {
    const startAutoRefresh = () => {
      if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
      autoRefreshInterval.current = setInterval(() => {
        if (mountedRef.current) {
          loadDoctorVisits(currentFilter, false);
          loadSummaryCards();
        }
      }, 30000);
    };
    
    const startNotificationCheck = () => {
      if (notificationInterval.current) clearInterval(notificationInterval.current);
      notificationInterval.current = setInterval(() => {
        if (mountedRef.current) {
          checkNotifications();
        }
      }, 30000);
    };
    
    startAutoRefresh();
    startNotificationCheck();
    
    return () => {
      if (autoRefreshInterval.current) clearInterval(autoRefreshInterval.current);
      if (notificationInterval.current) clearInterval(notificationInterval.current);
      mountedRef.current = false;
    };
  }, [loadDoctorVisits, loadSummaryCards, checkNotifications, currentFilter]);

  // ==================== INITIALIZATION ====================
//   useEffect(() => {
//     const init = async () => {
//       await loadSummaryCards();
//       await loadDoctorVisits('TODAY', true);
//     };
//     init();
//   }, []);
useEffect(() => {
  let isMounted = true;
  
  const initialize = async () => {
    try {
      // Load data in parallel
      await Promise.all([
        loadSummaryCards(),
        loadDoctorVisits('TODAY', true)
      ]);
    } catch (error) {
      console.error('Initialization error:', error);
      if (isMounted) {
        setError(t('doctor.visit.loadError') || 'Failed to load data');
      }
    }
  };
  
  initialize();
  
  return () => {
    isMounted = false;
  };
}, []);
  // ==================== SIDEBAR HANDLING ====================
  const handleSidebarMouseEnter = () => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
  };

  const handleSidebarMouseLeave = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  // ==================== PASSWORD CHANGE HANDLING ====================
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setPasswordError('');

    // Validation
    if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError(t('doctor.password.fillAll'));
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError(t('doctor.password.notMatch'));
      return;
    }

    setChangingPassword(true);
    changePassword(passwordData.oldPassword, passwordData.newPassword)
      .then(() => {
        alert(t('doctor.password.success'));
        setShowPasswordModal(false);
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordError('');
      })
      .catch((error) => {
        setPasswordError(t('doctor.password.error') + ': ' + error.message);
      })
      .finally(() => {
        setChangingPassword(false);
      });
  };

  const handlePasswordInputChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    setPasswordError('');
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordError('');
  };

  // ==================== RENDER COMPONENTS ====================
  
  // Avatar Component
  const PatientAvatar = ({ gender, name, size = 60 }) => {
    const avatarPath = getAvatarPath(gender);
    const bgColor = getAvatarColor(gender);
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
    const [imageError, setImageError] = useState(false);

    return (
      <div 
        className="patient-avatar"
        style={{ 
          width: size, 
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
          border: '2px solid #e9ecef',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor,
          color: 'white',
          fontSize: `${size * 0.35}px`,
          fontWeight: 'bold',
          position: 'relative'
        }}
      >
        {!imageError ? (
          <img
            src={avatarPath}
            alt={`${gender || 'Unknown'} avatar`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    );
  };

  // Sidebar Button Component
  const SidebarButton = ({ icon, text, color, onClick }) => (
    <button
      type="button"
      className="sidebar-button"
      style={{ '--hover-color': color }}
      onClick={onClick}
    >
      <span className="sidebar-icon">{icon}</span>
      <span className="sidebar-text">{text}</span>
    </button>
  );

  // Filter Button Component
  const FilterButton = ({ filterKey, label, count, active, onClick }) => (
    <button
      type="button"
      className={`filter-button ${active ? 'active' : 'inactive'}`}
      onClick={onClick}
    >
      {label} ({count})
    </button>
  );

  // Summary Card Component
  const SummaryCard = ({ title, value, color, delay }) => (
    <div 
      className="summary-card"
      style={{ backgroundColor: color, animationDelay: `${delay}ms` }}
    >
      <div className="summary-card-title">{title}</div>
      <div className="summary-card-value">{value}</div>
    </div>
  );

  // Performance Item Component
  const PerformanceItem = ({ icon, label, value }) => (
    <div className="performance-item">
      <span className="performance-icon">{icon}</span>
      <div className="performance-text">
        <div className="performance-label">{label}</div>
        <div className="performance-value">{value}</div>
      </div>
    </div>
  );

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
  const VisitCard = ({ visit, onOpen, onDetails }) => {
    const patient = visit.patient || {};
    const status = visit.visitStatus || 'CREATED';
    const bgColor = getStatusBgColor(status);
    const gender = patient.gender || 'Unknown';
    const fullName = buildFullName(patient);
    
    return (
      <div className="visit-card" style={{ backgroundColor: bgColor }}>
        <div className="visit-card-header">
          <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
          <span className="visit-header-spacer" />
          <StatusBadge status={status} />
        </div>
        <div className="visit-card-body">
          <PatientAvatar gender={gender} name={fullName} size={60} />
          <div className="visit-info">
            <div className="visit-name">👤 {fullName}</div>
            <div className="visit-details">
              📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
            </div>
            <div className="visit-details">
              📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
            </div>
          </div>
          <div className="visit-actions">
            <button 
              type="button"
              className="btn-open"
              onClick={() => onOpen(visit.id, status)}
            >
              {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
            </button>
            <button 
              type="button"
              className="btn-details"
              onClick={() => onDetails(visit.id)}
            >
              {t('doctor.visit.details')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==================== VISIT POPUP COMPONENT ====================
  const VisitPopup = ({ visit, onClose, onOpen, onDetails }) => {
    if (!visit) return null;
    
    const patient = visit.patient || {};
    const status = visit.visitStatus || 'CREATED';
    const bgColor = getStatusBgColor(status);
    const gender = patient.gender || 'Unknown';
    const fullName = buildFullName(patient);
    
    return (
      <div className="visit-popup-overlay" onClick={onClose}>
        <div className="visit-popup-content" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="visit-popup-close" onClick={onClose}>✖</button>
          <h2 className="visit-popup-title">📋 {t('doctor.visit.details')}</h2>
          
          <div className="visit-popup-card" style={{ backgroundColor: bgColor }}>
            <div className="visit-card-header">
              <span className="visit-id">🆔 {t('doctor.visit.id')}: {visit.id}</span>
              <span className="visit-header-spacer" />
              <StatusBadge status={status} />
            </div>
            <div className="visit-card-body">
              <PatientAvatar gender={gender} name={fullName} size={60} />
              <div className="visit-info">
                <div className="visit-name">👤 {fullName}</div>
                <div className="visit-details">
                  📞 {patient.phone || '-'} | {t('doctor.visit.age')}: {calculateAge(patient.dateOfBirth)}
                </div>
                <div className="visit-details">
                  📅 {formatDateTime(visit.visitDate)} | {t('doctor.visit.type')}: {visit.visitType || 'APPOINTMENT'}
                </div>
                <div className="visit-details" style={{ marginTop: '8px' }}>
                  <strong>{t('doctor.details.medicalInfo')}:</strong><br />
                  🩺 {t('doctor.details.chiefComplaint')}: {visit.chiefComplaint || '-'}<br />
                  📜 {t('doctor.details.history')}: {visit.history || '-'}<br />
                  💊 {t('doctor.details.medications')}: {visit.medications || '-'}<br />
                  ⚠ {t('doctor.details.allergies')}: {visit.allergies || '-'}<br />
                  📝 {t('doctor.details.notes')}: {visit.doctorNotes || '-'}
                </div>
              </div>
            </div>
          </div>
          
          <div className="visit-popup-actions">
            <button 
              type="button"
              className="btn-open"
              onClick={() => onOpen(visit.id, status)}
            >
              {status === 'CLOSED' ? t('doctor.visit.reopen') : t('doctor.visit.open')}
            </button>
            <button 
              type="button"
              className="btn-details"
              onClick={() => onDetails(visit.id)}
            >
              {t('doctor.visit.details')}
            </button>
            <button type="button" className="btn-close-popup" onClick={onClose}>
              {t('doctor.dialog.close')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==================== DETAILS MODAL ====================
  const DetailsModal = () => {
    if (!showDetailsModal || !detailsVisitData) return null;
    
    const visit = detailsVisitData;
    const patient = visit.patient || {};
    
    const formatDateTimeLocal = (iso) => {
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
        return '-';
      }
    };

    const buildFullNameLocal = (p) => {
      if (!p) return '';
      return [p.firstName, p.middleName, p.lastName].filter(Boolean).join(' ').trim() || 'Unknown';
    };

    const getStatusColorLocal = (status) => {
      switch (status?.toUpperCase()) {
        case 'COMPLETED':
        case 'CLOSED':
          return '#27ae60';
        case 'IN_PROGRESS':
          return '#f39c12';
        case 'CANCELLED':
          return '#e74c3c';
        case 'CREATED':
        case 'NEW':
          return '#e74c3c';
        default:
          return '#3498db';
      }
    };

    const mapDurationTypeLocal = (type) => {
      if (!type) return '-';
      const map = {
        '1': 'Hour',
        '2': 'Day',
        '3': 'Week',
        '4': 'Month',
        '5': 'Year'
      };
      return map[type] || '-';
    };

    const drugs = detailsVisitDrugs || [];
    const procedures = detailsVisitProcedures || [];

    return (
      <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
        <div className="modal-content full-details" onClick={(e) => e.stopPropagation()} ref={detailsModalRef}>
          <button type="button" className="modal-close" onClick={() => setShowDetailsModal(false)}>✖</button>
          
          {loadingDetails ? (
            <div className="loading-container">
              <div className="loading-spinner-large"></div>
              <p>{t('doctor.loading')}</p>
            </div>
          ) : (
            <>
              <h2>📋 {t('doctor.visit.details')} #{visit.id}</h2>
              
              <div className="pdf-buttons-container">
                <button type="button" className="btn-pdf full" onClick={exportFullVisitPdf} disabled={generatingPdf}>
                  📄 {generatingPdf ? t('doctor.pdf.generating') : t('doctor.pdf.fullReport')}
                </button>
                <button type="button" className="btn-pdf patient" onClick={exportPatientPdf} disabled={generatingPdf}>
                  👤 {t('doctor.pdf.patient')}
                </button>
                <button type="button" className="btn-pdf medical" onClick={exportMedicalPdf} disabled={generatingPdf}>
                  🏥 {t('doctor.pdf.medical')}
                </button>
                <button type="button" className="btn-pdf drugs" onClick={exportDrugsPdf} disabled={generatingPdf}>
                  💊 {t('doctor.pdf.drugs')}
                </button>
                <button type="button" className="btn-pdf procedures" onClick={exportProceduresPdf} disabled={generatingPdf}>
                  🔬 {t('doctor.pdf.procedures')}
                </button>
                <button type="button" className="btn-pdf combined" onClick={exportPatientAndDrugsPdf} disabled={generatingPdf}>
                  👤+💊 {t('doctor.pdf.patientDrugs')}
                </button>
                <button type="button" className="btn-pdf combined" onClick={exportPatientAndProceduresPdf} disabled={generatingPdf}>
                  👤+🔬 {t('doctor.pdf.patientProcedures')}
                </button>
              </div>

              <div className="details-scrollable">
                <div className="details-section basic-info">
                  <h3>👤 {t('doctor.details.patientInfo')}</h3>
                  <div className="info-grid">
                    <div className="info-card">
                      <span className="info-icon">🆔</span>
                      <div className="info-content">
                        <span className="info-label">{t('doctor.visit.id')}</span>
                        <span className="info-value">{visit.id}</span>
                      </div>
                    </div>
                    <div className="info-card">
                      <span className="info-icon">👤</span>
                      <div className="info-content">
                        <span className="info-label">{t('doctor.details.patient')}</span>
                        <span className="info-value">{buildFullNameLocal(patient)}</span>
                      </div>
                    </div>
                    <div className="info-card">
                      <span className="info-icon">📞</span>
                      <div className="info-content">
                        <span className="info-label">{t('doctor.visit.phone')}</span>
                        <span className="info-value">{patient.phone || '-'}</span>
                      </div>
                    </div>
                    <div className="info-card">
                      <span className="info-icon">⚧</span>
                      <div className="info-content">
                        <span className="info-label">{t('doctor.visit.gender')}</span>
                        <span className="info-value">{patient.gender || '-'}</span>
                      </div>
                    </div>
                    <div className="info-card">
                      <span className="info-icon">📅</span>
                      <div className="info-content">
                        <span className="info-label">{t('doctor.visit.visitDate')}</span>
                        <span className="info-value">{formatDateTimeLocal(visit.visitDate)}</span>
                      </div>
                    </div>
                    <div className="info-card">
                      <span className="info-icon">📌</span>
                      <div className="info-content">
                        <span className="info-label">{t('doctor.visit.status')}</span>
                        <span className="status-badge" style={{ 
                          backgroundColor: getStatusColorLocal(visit.visitStatus),
                          color: 'white',
                          padding: '4px 15px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          display: 'inline-block'
                        }}>
                          {visit.visitStatus || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="info-card">
                      <span className="info-icon">💳</span>
                      <div className="info-content">
                        <span className="info-label">Payment</span>
                        <span className="info-value">{visit.paid ? '✅ Paid' : '❌ Unpaid'}</span>
                      </div>
                    </div>
                    <div className="info-card">
                      <span className="info-icon">💰</span>
                      <div className="info-content">
                        <span className="info-label">Amount</span>
                        <span className="info-value">{visit.originalAmount || 0} {visit.currency || 'JOD'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="details-section medical-info">
                  <h3>🏥 {t('doctor.details.medicalInfo')}</h3>
                  <div className="medical-grid">
                    <div className="medical-item">
                      <div className="medical-header" style={{ color: '#E74C3C' }}>
                        🩺 {t('doctor.details.chiefComplaint')}
                      </div>
                      <div className="medical-content">{visit.chiefComplaint || '-'}</div>
                    </div>
                    <div className="medical-item">
                      <div className="medical-header" style={{ color: '#3498DB' }}>
                        📜 {t('doctor.details.history')}
                      </div>
                      <div className="medical-content">{visit.history || '-'}</div>
                    </div>
                    <div className="medical-item">
                      <div className="medical-header" style={{ color: '#2ECC71' }}>
                        💊 {t('doctor.details.medications')}
                      </div>
                      <div className="medical-content">{visit.medications || '-'}</div>
                    </div>
                    <div className="medical-item">
                      <div className="medical-header" style={{ color: '#F39C12' }}>
                        ⚠ {t('doctor.details.allergies')}
                      </div>
                      <div className="medical-content">{visit.allergies || '-'}</div>
                    </div>
                    <div className="medical-item">
                      <div className="medical-header" style={{ color: '#9B59B6' }}>
                        📝 {t('doctor.details.notes')}
                      </div>
                      <div className="medical-content">{visit.doctorNotes || '-'}</div>
                    </div>
                  </div>
                </div>

                <div className="details-section drugs-info">
                  <h3>💊 {t('doctor.details.prescribedDrugs')}</h3>
                  {!drugs || drugs.length === 0 ? (
                    <div className="empty-state small">📭 {t('doctor.details.noDrugs')}</div>
                  ) : (
                    <div className="drugs-grid">
                      {drugs.map((item, index) => {
                        const drug = item.drug || {};
                        return (
                          <div key={index} className="drug-card">
                            <div className="drug-header">
                              <span className="drug-name">💊 {drug.tradeName || 'Unknown'}</span>
                              <span className="drug-form-badge">{drug.dosageForm || '-'}</span>
                            </div>
                            <div className="drug-details">
                              <div className="drug-detail-row">
                                <span className="drug-label">💪 Strength:</span>
                                <span className="drug-value">
                                  {drug.strength || '-'} {drug.unitType || ''}
                                </span>
                              </div>
                              <div className="drug-detail-row">
                                <span className="drug-label">💊 Dose:</span>
                                <span className="drug-value">{item.dose || '-'}</span>
                              </div>
                              <div className="drug-detail-row">
                                <span className="drug-label">⏰ Frequency:</span>
                                <span className="drug-value">{item.frequency || '-'}</span>
                              </div>
                              <div className="drug-detail-row">
                                <span className="drug-label">📅 Duration:</span>
                                <span className="drug-value">
                                  {item.duration || '-'} {mapDurationTypeLocal(item.durationType)}
                                </span>
                              </div>
                              <div className="drug-detail-row">
                                <span className="drug-label">📦 Package:</span>
                                <span className="drug-value">
                                  {drug.packageSize || '-'} - {drug.packageType || '-'}
                                </span>
                              </div>
                            </div>
                            <div className="drug-instructions">
                              📝 {item.instructions || 'No instructions'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="details-section procedures-info">
                  <h3>🔬 {t('doctor.details.procedures')}</h3>
                  {!procedures || procedures.length === 0 ? (
                    <div className="empty-state small">📭 {t('doctor.details.noProcedures')}</div>
                  ) : (
                    <div className="procedures-list">
                      {procedures.map((proc, index) => {
                        let icon = '🧪';
                        let category = 'General';
                        let color = '#3498DB';
                        
                        const upperProc = proc.toUpperCase();
                        if (upperProc.includes('RADIOLOGY') || upperProc.includes('MRI') || upperProc.includes('CT') || upperProc.includes('X-RAY') || upperProc.includes('ULTRASOUND')) {
                          icon = '📡';
                          category = 'Radiology';
                          color = '#E74C3C';
                        } else if (upperProc.includes('LAB') || upperProc.includes('PCR') || upperProc.includes('BLOOD') || upperProc.includes('URINE')) {
                          icon = '🧫';
                          category = 'Laboratory';
                          color = '#2ECC71';
                        } else if (upperProc.includes('SURGERY') || upperProc.includes('OPR') || upperProc.includes('OPERATION')) {
                          icon = '🩺';
                          category = 'Surgical';
                          color = '#F39C12';
                        } else if (upperProc.includes('ELBOW') || upperProc.includes('KNEE') || upperProc.includes('SHOULDER')) {
                          icon = '🦴';
                          category = 'Orthopedic';
                          color = '#8E44AD';
                        }
                        
                        return (
                          <div key={index} className="procedure-item" style={{ borderLeftColor: color }}>
                            <span className="procedure-icon">{icon}</span>
                            <div className="procedure-content">
                              <span className="procedure-category" style={{ color: color }}>
                                {category}
                              </span>
                              <span className="procedure-name">{proc}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // ==================== PASSWORD CHANGE MODAL ====================
  const PasswordChangeModal = () => {
    if (!showPasswordModal) return null;

    return (
      <div className="modal-overlay" onClick={(e) => {
        if (e.target === e.currentTarget) {
          closePasswordModal();
        }
      }}>
        <div className="modal-content password-modal" onClick={(e) => e.stopPropagation()}>
          <button 
            type="button" 
            className="modal-close" 
            onClick={closePasswordModal}
          >
            ✖
          </button>
          
          <h2>🔒 {t('doctor.password.title')}</h2>
          
          <form onSubmit={handlePasswordSubmit} className="password-form" noValidate>
            <div className="form-group">
              <label htmlFor="oldPassword">{t('doctor.password.old')}</label>
              <input
                id="oldPassword"
                type="password"
                className="form-input"
                value={passwordData.oldPassword}
                onChange={(e) => handlePasswordInputChange('oldPassword', e.target.value)}
                placeholder={t('doctor.password.old')}
                autoFocus
                autoComplete="off"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="newPassword">{t('doctor.password.new')}</label>
              <input
                id="newPassword"
                type="password"
                className="form-input"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                placeholder={t('doctor.password.new')}
                autoComplete="off"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">{t('doctor.password.confirm')}</label>
              <input
                id="confirmPassword"
                type="password"
                className="form-input"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                placeholder={t('doctor.password.confirm')}
                autoComplete="off"
              />
            </div>
            
            {passwordError && (
              <div className="error-message small">{passwordError}</div>
            )}
            
            <button 
              type="submit" 
              className="btn-save-password"
              disabled={changingPassword}
            >
              {changingPassword ? '⏳ ' + t('doctor.loading') : '💾 ' + t('doctor.password.save')}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Pagination Component
  const Pagination = () => {
    const visiblePages = 7;
    const halfVisible = Math.floor(visiblePages / 2);
    let startPage = Math.max(0, currentPage - halfVisible);
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);
    
    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(0, endPage - visiblePages + 1);
    }
    
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="pagination">
        <button 
          type="button"
          className="pagination-prev"
          disabled={currentPage === 0}
          onClick={() => goToPage(currentPage - 1)}
        >
          ◀
        </button>
        
        {startPage > 0 && (
          <>
            <button type="button" className="pagination-page" onClick={() => goToPage(0)}>1</button>
            {startPage > 1 && <span className="pagination-ellipsis">...</span>}
          </>
        )}
        
        {pageNumbers.map(num => (
          <button
            type="button"
            key={num}
            className={`pagination-page ${num === currentPage ? 'active' : ''}`}
            onClick={() => goToPage(num)}
          >
            {num + 1}
          </button>
        ))}
        
        {endPage < totalPages - 1 && (
          <>
            {endPage < totalPages - 2 && <span className="pagination-ellipsis">...</span>}
            <button type="button" className="pagination-page" onClick={() => goToPage(totalPages - 1)}>
              {totalPages}
            </button>
          </>
        )}
        
        <button 
          type="button"
          className="pagination-next"
          disabled={currentPage >= totalPages - 1}
          onClick={() => goToPage(currentPage + 1)}
        >
          ▶
        </button>
        
        <span className="pagination-info">
          {t('doctor.filter.page')} {currentPage + 1} {t('doctor.filter.of')} {totalPages}
        </span>
      </div>
    );
  };

  // ==================== RENDER ====================
  if (loading && isInitialLoad) {
    return (
      <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
        <div className="loading-spinner">{t('doctor.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
        <div className="error-message">
          <h2>⚠️ {t('doctor.error')}</h2>
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>{t('doctor.retry')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`doctor-home ${isRTL ? 'rtl' : ''}`}>
      {/* Sidebar */}
      <aside 
        className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      >
        <div className="sidebar-header">
          <span className="menu-icon">☰</span>
          {sidebarOpen && <span className="menu-title">{t('doctor.sidebar.menu')}</span>}
        </div>
        
        <nav className="sidebar-nav">
          <SidebarButton 
            icon="🔍" 
            text={t('doctor.sidebar.searchPatient')}
            color="#3498db"
            onClick={openSearchPatient}
          />
        <SidebarButton 
  icon="📊" 
  text={t('doctor.sidebar.reports')}
  color="#2ecc71"
  onClick={openReportsScreen}
/>
          <SidebarButton 
            icon="🔒" 
            text={t('doctor.sidebar.changePassword')}
            color="#f39c12"
            onClick={() => setShowPasswordModal(true)}
          />
          <SidebarButton 
            icon="🚪" 
            text={t('doctor.sidebar.logout')}
            color="#e74c3c"
            onClick={() => {
              if (window.confirm(t('doctor.sidebar.logoutConfirm'))) {
                window.location.href = '/login';
              }
            }}
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-text">
            <h1 className="welcome-greeting">
              {t('doctor.home.welcome').replace('{0}', username)}
            </h1>
          </div>
          
          <div className="welcome-actions">

            
            <div className="find-visit">
                 {/* Add this button */}
    <button 
        onClick={() => setShowGuide(true)}
        style={{
            background: '#9f7aea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontWeight: 'bold'
        }}
    >
        ❓ Guide
    </button>
              <input
                type="text"
                className="find-visit-input"
                placeholder={t('doctor.findVisit.prompt')}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const value = e.target.value.trim();
                    if (value) findVisitById(value);
                  }
                }}
              />
              <button 
                type="button"
                className="find-visit-btn"
                onClick={() => {
                  const input = document.querySelector('.find-visit-input');
                  if (input && input.value.trim()) {
                    findVisitById(input.value.trim());
                  }
                }}
              >
                🔍
              </button>
            </div>
            
            <span 
              id="notification-icon"
              className={`notification-icon ${notificationCount > 0 ? 'has-notifications' : ''}`}
              onClick={() => {
                const openVisits = visitsCache.filter(v => v.visitStatus !== 'CLOSED');
                if (openVisits.length === 0) {
                  alert(t('doctor.notifications.noOpen'));
                  return;
                }
                const message = openVisits.map(v => 
                  `${t('doctor.notifications.visitId')}: ${v.id}, ${t('doctor.notifications.patient')}: ${buildFullName(v.patient)}, ${t('doctor.notifications.status')}: ${v.visitStatus}`
                ).join('\n');
                alert(t('doctor.notifications.openVisits') + '\n\n' + message);
              }}
            >
              🔔 {notificationCount}
            </span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          <SummaryCard 
            title={t('doctor.dashboard.todayVisits')} 
            value={summaryStats.today} 
            color="#1E90FF"
            delay={100}
          />
          <SummaryCard 
            title={t('doctor.dashboard.totalVisits')} 
            value={summaryStats.total} 
            color="#20B2AA"
            delay={200}
          />
          <SummaryCard 
            title={t('doctor.dashboard.newVisits')} 
            value={summaryStats.open} 
            color="#FF9800"
            delay={300}
          />
          <SummaryCard 
            title={t('doctor.dashboard.closedVisits')} 
            value={summaryStats.closed} 
            color="#4CAF50"
            delay={400}
          />
        </div>

        {/* Performance Widget */}
        <details className="performance-widget">
          <summary>{t('doctor.performance.title')}</summary>
          <div className="performance-grid">
            <PerformanceItem 
              icon="👤" 
              label={t('doctor.performance.patientsSeen')} 
              value={performanceStats.patientsSeen}
            />
            <PerformanceItem 
              icon="📋" 
              label={t('doctor.performance.openVisits')} 
              value={performanceStats.openVisits}
            />
            <PerformanceItem 
              icon="✅" 
              label={t('doctor.performance.completedToday')} 
              value={performanceStats.completedToday}
            />
            <PerformanceItem 
              icon="📊" 
              label={t('doctor.performance.completionRate')} 
              value={`${performanceStats.completionRate}%`}
            />
          </div>
        </details>

        {/* Filters */}
        <div className="filters-bar">
          <div className="filter-buttons">
            <FilterButton 
              filterKey="TODAY"
              label={t('doctor.filter.today')}
              count={filterCounts.TODAY}
              active={currentFilter === 'TODAY'}
              onClick={() => loadDoctorVisits('TODAY', true)}
            />
            <FilterButton 
              filterKey="ALL"
              label={t('doctor.filter.all')}
              count={filterCounts.ALL}
              active={currentFilter === 'ALL'}
              onClick={() => loadDoctorVisits('ALL', true)}
            />
            <FilterButton 
              filterKey="NEW"
              label={t('doctor.filter.new')}
              count={filterCounts.NEW}
              active={currentFilter === 'NEW'}
              onClick={() => loadDoctorVisits('NEW', true)}
            />
            <FilterButton 
              filterKey="IN_PROGRESS"
              label={t('doctor.filter.inProgress')}
              count={filterCounts.IN_PROGRESS}
              active={currentFilter === 'IN_PROGRESS'}
              onClick={() => loadDoctorVisits('IN_PROGRESS', true)}
            />
            <FilterButton 
              filterKey="CLOSED"
              label={t('doctor.filter.closed')}
              count={filterCounts.CLOSED}
              active={currentFilter === 'CLOSED'}
              onClick={() => loadDoctorVisits('CLOSED', true)}
            />
          </div>
          
          <div className="filter-actions">
            <button 
              type="button"
              className="filter-action-btn refresh"
              onClick={() => {
                loadDoctorVisits(currentFilter, false);
                loadSummaryCards();
              }}
            >
              🔄 {t('doctor.filter.refresh')}
            </button>
            <input
              type="text"
              className="search-input"
              placeholder={t('doctor.filter.searchPrompt')}
              value={currentSearchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button 
              type="button"
              className="filter-action-btn layout"
              onClick={toggleCardLayout}
            >
              ⊞ {t(`doctor.filter.cardView${cardsPerRowPattern[cardsPerRowIndex]}`)}
            </button>
            <button 
              type="button"
              className="filter-action-btn sort"
              onClick={() => {
                const newSort = !sortByDateAsc;
                setSortByDateAsc(newSort);
                const filtered = filterVisits(visitsCache, currentFilter, currentSearchQuery, newSort);
                setFilteredVisits(filtered);
              }}
            >
              ↕ {sortByDateAsc ? t('doctor.filter.sortAsc') : t('doctor.filter.sortDesc')}
            </button>
          </div>
        </div>

        {/* Card Container */}
        <div className="card-scroll-container" ref={scrollPaneRef}>
          <div className="card-container">
            {filteredVisits.length === 0 ? (
              <div className="empty-state">
                📭 {t('doctor.filter.noResults')}
              </div>
            ) : isGridLayout ? (
              <div 
                className="card-grid"
                style={{ 
                  gridTemplateColumns: `repeat(${cardsPerRowPattern[cardsPerRowIndex]}, 1fr)`
                }}
              >
                {filteredVisits.map((visit) => (
                  <VisitCard
                    key={visit.id}
                    visit={visit}
                    onOpen={(id, status) => {
                      if (status === 'CLOSED') {
                        reopenVisit(id);
                      } else {
                        openVisitScreen(id, status);
                      }
                    }}
                    onDetails={showVisitDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="card-list">
                {filteredVisits.map((visit) => (
                  <VisitCard
                    key={visit.id}
                    visit={visit}
                    onOpen={(id, status) => {
                      if (status === 'CLOSED') {
                        reopenVisit(id);
                      } else {
                        openVisitScreen(id, status);
                      }
                    }}
                    onDetails={showVisitDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && <Pagination />}
      </main>

      {/* Visit Popup */}
      {showVisitPopup && popupVisit && (
        <VisitPopup
          visit={popupVisit}
          onClose={() => {
            setShowVisitPopup(false);
            setPopupVisit(null);
          }}
          onOpen={(id, status) => {
            if (status === 'CLOSED') {
              reopenVisit(id);
            } else {
              openVisitScreen(id, status);
            }
          }}
          onDetails={(id) => {
            setShowVisitPopup(false);
            showVisitDetails(id);
          }}
        />
      )}

      {/* Visit Screen Modal */}
      {showVisitScreen && selectedVisitId && (
        <div className="visit-screen-modal-overlay" onClick={closeVisitScreen}>
          <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button"
              className="visit-screen-close-btn"
              onClick={closeVisitScreen}
            >
              ✖
            </button>
            <DoctorVisitScreen
              doctorId={doctorId}
              visitId={selectedVisitId}
              initialStatus={selectedVisitStatus}
              username={username}
              onClose={closeVisitScreen}
              language={locale}
            />
          </div>
        </div>
      )}
      {/* Search Patient Modal */}
      {showSearchPatient && (
        <div className="visit-screen-modal-overlay" onClick={closeSearchPatient}>
          <div className="visit-screen-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button"
              className="visit-screen-close-btn"
              onClick={closeSearchPatient}
            >
              ✖
            </button>
            <DoctorSearchPatientScreen
              loggedUser={username}
              language={locale}
              onClose={closeSearchPatient}
            />
          </div>
        </div>
      )}

      {/* Reports Screen Modal */}
      {showReportsScreen && (
        <div className="visit-screen-modal-overlay" onClick={closeReportsScreen}>
          <div className="visit-screen-modal-content reports-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button"
              className="visit-screen-close-btn"
              onClick={closeReportsScreen}
            >
              ✖
            </button>
            <ReportsScreen
              loggedUser={username}
              lang={locale}
              onClose={closeReportsScreen}
            />
          </div>
        </div>
      )}

      {/* Details Modal */}
      <DetailsModal />

      {/* Password Change Modal */}
      <PasswordChangeModal />
      {/* ==================== GUIDE MODAL ==================== */}
      {showGuide && (
        <DoctorGuide
            isOpen={showGuide}
            onClose={() => setShowGuide(false)}
            locale={locale}
        />
      )}
    </div>
  );
};

export default DoctorHomePage;