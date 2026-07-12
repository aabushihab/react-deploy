// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .logs-container {
//     padding: 20px;
//     background: #f0f2f5;
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//   }
  
//   /* Header */
//   .logs-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 12px 20px;
//     background: white;
//     border-radius: 8px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     flex-wrap: wrap;
//     gap: 10px;
//   }
//   .logs-header .title {
//     font-size: 22px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .logs-header .controls {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     flex-wrap: wrap;
//   }
//   .logs-header .controls .search-box {
//     display: flex;
//     align-items: center;
//     background: #f5f7fa;
//     border-radius: 20px;
//     padding: 4px 15px;
//   }
//   .logs-header .controls .search-box input {
//     border: none;
//     outline: none;
//     padding: 6px 5px;
//     font-size: 13px;
//     background: transparent;
//     min-width: 150px;
//   }
//   .logs-header .controls .search-box .search-icon {
//     font-size: 14px;
//     color: #a0aec0;
//   }
//   .logs-header .controls button {
//     padding: 6px 16px;
//     border: none;
//     border-radius: 5px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     color: white;
//   }
//   .logs-header .controls button:hover {
//     transform: scale(1.05);
//   }
//   .logs-header .controls button.refresh { background: #3498db; }
//   .logs-header .controls button.refresh:hover { background: #2980b9; }
//   .logs-header .status-badge {
//     padding: 4px 15px;
//     border-radius: 10px;
//     font-size: 12px;
//     background: #e8f8f5;
//     color: #27ae60;
//   }
//   .logs-header .status-badge.error { background: #fdedec; color: #e74c3c; }
//   .logs-header .status-badge.loading { background: #fef9e7; color: #f39c12; }

//   /* Filter Bar */
//   .logs-filter-bar {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     padding: 10px 15px;
//     background: white;
//     border-radius: 8px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//     flex-wrap: wrap;
//   }
//   .logs-filter-bar .filter-group {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//   }
//   .logs-filter-bar .filter-group label {
//     font-weight: bold;
//     font-size: 13px;
//     color: #34495e;
//     white-space: nowrap;
//   }
//   .logs-filter-bar .filter-group input,
//   .logs-filter-bar .filter-group select {
//     padding: 6px 10px;
//     border-radius: 5px;
//     border: 1px solid #dce4ec;
//     font-size: 13px;
//     background: white;
//   }
//   .logs-filter-bar .filter-group input:focus,
//   .logs-filter-bar .filter-group select:focus {
//     outline: none;
//     border-color: #3498db;
//   }
//   .logs-filter-bar .filter-group input[type="date"] {
//     min-width: 140px;
//   }
//   .logs-filter-bar .filter-group select {
//     min-width: 150px;
//   }
//   .logs-filter-bar button {
//     padding: 6px 16px;
//     border: none;
//     border-radius: 5px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//   }
//   .logs-filter-bar button:hover {
//     transform: scale(1.05);
//   }
//   .logs-filter-bar .btn-filter { background: #3498db; color: white; }
//   .logs-filter-bar .btn-filter:hover { background: #2980b9; }
//   .logs-filter-bar .btn-clear { background: #e74c3c; color: white; }
//   .logs-filter-bar .btn-clear:hover { background: #c0392b; }
//   .logs-filter-bar .btn-export { background: #27ae60; color: white; }
//   .logs-filter-bar .btn-export:hover { background: #1e8449; }
//   .logs-filter-bar .loading {
//     width: 20px;
//     height: 20px;
//   }

//   /* Table Section */
//   .logs-table-section {
//     background: white;
//     border-radius: 8px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//   }
//   .logs-table-section .table-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin-bottom: 10px;
//   }
//   .logs-table-section .table-header .title {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .logs-table-section .table-header .stats {
//     display: flex;
//     gap: 10px;
//   }
//   .logs-table-section .table-header .stats .pill {
//     padding: 3px 12px;
//     border-radius: 12px;
//     font-size: 12px;
//     background: #e8f8f5;
//     color: #1abc9c;
//   }
//   .logs-table-wrapper {
//     overflow-x: auto;
//     max-height: 450px;
//     border: 1px solid #e9ecef;
//     border-radius: 8px;
//   }
//   .logs-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .logs-table th {
//     background: #f8f9fa;
//     padding: 10px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2c3e50;
//     border-bottom: 2px solid #e9ecef;
//     position: sticky;
//     top: 0;
//     z-index: 10;
//   }
//   .logs-table td {
//     padding: 8px 15px;
//     border-bottom: 1px solid #f0f0f0;
//   }
//   .logs-table tr:hover td {
//     background: #f8f9fa;
//   }
//   .logs-table tr:nth-child(even) td {
//     background: #f8f9fa;
//   }
//   .logs-table tr:nth-child(even):hover td {
//     background: #e8f8f5;
//   }
//   .logs-table .action-badge {
//     display: inline-block;
//     padding: 2px 12px;
//     border-radius: 12px;
//     font-weight: bold;
//     font-size: 12px;
//     color: white;
//   }
//   .logs-table .action-badge.login { background: #27ae60; }
//   .logs-table .action-badge.logout { background: #e74c3c; }
//   .logs-table .action-badge.add-user { background: #3498db; }
//   .logs-table .action-badge.delete-user { background: #e74c3c; }
//   .logs-table .action-badge.reset-password { background: #f39c12; }
//   .logs-table .action-badge.toggle-user { background: #9b59b6; }
//   .logs-table .action-badge.open-user-management { background: #1abc9c; }
//   .logs-table .action-badge.open-reports { background: #2ecc71; }
//   .logs-table .action-badge.open-payments { background: #3498db; }
//   .logs-table .action-badge.export-data { background: #f39c12; }
//   .logs-table .action-badge.default { background: #95a5a6; }
//   .logs-table .timestamp {
//     color: #7f8c8d;
//     font-size: 12px;
//   }

//   /* Footer */
//   .logs-footer {
//     font-size: 12px;
//     color: #7f8c8d;
//     padding: 5px 0 0 0;
//   }

//   /* Status Bar */
//   .logs-status-bar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 8px 15px;
//     background: white;
//     border-radius: 8px;
//     border: 1px solid #e9ecef;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .logs-status-bar .status-msg {
//     font-size: 12px;
//     color: #27ae60;
//   }
//   .logs-status-bar .status-msg.error { color: #e74c3c; }
//   .logs-status-bar .status-msg.loading { color: #f39c12; }
//   .logs-status-bar .spacer { flex: 1; }
//   .logs-status-bar .time {
//     font-size: 11px;
//     color: #95a5a6;
//   }

//   /* Loading */
//   .logs-loading {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 40px;
//     color: #7f8c8d;
//   }

//   /* Empty State */
//   .logs-empty {
//     text-align: center;
//     padding: 40px;
//     color: #a0aec0;
//     font-size: 16px;
//   }

//   @keyframes slideIn {
//     from {
//       transform: translateY(-20px);
//       opacity: 0;
//     }
//     to {
//       transform: translateY(0);
//       opacity: 1;
//     }
//   }
//   .slide-in {
//     animation: slideIn 0.3s ease-out;
//   }
// `;

// // ---------- Main Component ----------
// const LogsMonitorScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const getTranslations = (language) => {
//     const translations = {
//       en: {
//         title: { logsMonitor: 'Logs Monitor' },
//         label: {
//           username: 'Username',
//           fromDate: 'From Date',
//           toDate: 'To Date',
//           action: 'Action'
//         },
//         prompt: {
//           search: 'Search logs...',
//           filterUsername: 'Filter by username',
//           fromDate: 'From Date',
//           toDate: 'To Date',
//           allActions: 'All Actions'
//         },
//         btn: {
//           refresh: 'Refresh',
//           applyFilters: 'Apply Filters',
//           clearFilters: 'Clear Filters',
//           export: 'Export CSV'
//         },
//         status: {
//           ready: 'Ready',
//           loading: 'Loading...',
//           loaded: 'Loaded',
//           logs: 'logs',
//           totalLogs: 'Total Logs',
//           filtered: 'Filtered',
//           lastUpdate: 'Last Update',
//           error: 'Error',
//           exporting: 'Exporting...',
//           exported: 'Exported successfully',
//           filtersCleared: 'Filters cleared'
//         },
//         table: {
//           title: 'Logs',
//           username: 'Username',
//           action: 'Action',
//           details: 'Details',
//           timestamp: 'Timestamp'
//         },
//         col: {
//           username: 'Username',
//           action: 'Action',
//           details: 'Details',
//           timestamp: 'Timestamp'
//         },
//         alert: {
//           info: 'Information',
//           warning: 'Warning',
//           error: 'Error',
//           noData: 'No logs to export',
//           loadError: 'Failed to load logs',
//           exportSuccess: 'Logs exported successfully',
//           exportError: 'Failed to export logs'
//         }
//       },
//       ar: {
//         title: { logsMonitor: 'مراقبة السجلات' },
//         label: {
//           username: 'اسم المستخدم',
//           fromDate: 'من تاريخ',
//           toDate: 'إلى تاريخ',
//           action: 'الإجراء'
//         },
//         prompt: {
//           search: 'بحث في السجلات...',
//           filterUsername: 'تصفية باسم المستخدم',
//           fromDate: 'من تاريخ',
//           toDate: 'إلى تاريخ',
//           allActions: 'جميع الإجراءات'
//         },
//         btn: {
//           refresh: 'تحديث',
//           applyFilters: 'تطبيق الفلاتر',
//           clearFilters: 'مسح الفلاتر',
//           export: 'تصدير CSV'
//         },
//         status: {
//           ready: 'جاهز',
//           loading: 'جاري التحميل...',
//           loaded: 'تم التحميل',
//           logs: 'سجلات',
//           totalLogs: 'إجمالي السجلات',
//           filtered: 'المصفاة',
//           lastUpdate: 'آخر تحديث',
//           error: 'خطأ',
//           exporting: 'جاري التصدير...',
//           exported: 'تم التصدير بنجاح',
//           filtersCleared: 'تم مسح الفلاتر'
//         },
//         table: {
//           title: 'السجلات',
//           username: 'اسم المستخدم',
//           action: 'الإجراء',
//           details: 'التفاصيل',
//           timestamp: 'الوقت'
//         },
//         col: {
//           username: 'اسم المستخدم',
//           action: 'الإجراء',
//           details: 'التفاصيل',
//           timestamp: 'الوقت'
//         },
//         alert: {
//           info: 'معلومات',
//           warning: 'تحذير',
//           error: 'خطأ',
//           noData: 'لا توجد سجلات للتصدير',
//           loadError: 'فشل في تحميل السجلات',
//           exportSuccess: 'تم تصدير السجلات بنجاح',
//           exportError: 'فشل في تصدير السجلات'
//         }
//       }
//     };
//     return translations[language] || translations.en;
//   };

//   const t = getTranslations(lang);

//   // ---------- State ----------
//   const [logs, setLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [totalCount, setTotalCount] = useState(0);

//   // Filter states
//   const [filterUsername, setFilterUsername] = useState('');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [filterAction, setFilterAction] = useState('');

//   // ---------- Helper Functions ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text: `● ${text}`, type });
//   }, []);

//   const getActionColor = (action) => {
//     if (!action) return 'default';
//     const upper = action.toUpperCase();
//     switch (upper) {
//       case 'LOGIN': return 'login';
//       case 'LOGOUT': return 'logout';
//       case 'ADD_USER': return 'add-user';
//       case 'DELETE_USER': return 'delete-user';
//       case 'RESET_PASSWORD': return 'reset-password';
//       case 'TOGGLE_USER': return 'toggle-user';
//       case 'OPEN_USER_MANAGEMENT': return 'open-user-management';
//       case 'OPEN_REPORTS': return 'open-reports';
//       case 'OPEN_PAYMENTS': return 'open-payments';
//       case 'EXPORT_DATA': return 'export-data';
//       default: return 'default';
//     }
//   };

//   const formatTimestamp = (timestamp) => {
//     if (!timestamp) return '';
//     try {
//       const date = new Date(timestamp);
//       return date.toLocaleString('en-GB', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit'
//       });
//     } catch {
//       return timestamp;
//     }
//   };

//   // ---------- API Calls ----------
//   const loadLogs = useCallback(async () => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');

//     try {
//       // Build URL with query parameters
//       let url = `${BASE_URL}/api/logs`;
//       const params = new URLSearchParams();

//       if (filterUsername.trim()) {
//         params.append('username', filterUsername.trim());
//       }

//       if (fromDate) {
//         params.append('fromDate', fromDate);
//       }

//       if (toDate) {
//         params.append('toDate', toDate);
//       }

//       if (filterAction && filterAction !== t.prompt.allActions) {
//         params.append('action', filterAction);
//       }

//       if (params.toString()) {
//         url += `?${params.toString()}`;
//       }

//       //console.log('📤 Fetching logs:', url);
      
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
//       const data = await response.json();
//       const logsData = Array.isArray(data) ? data : [data];
      
//       const parsedLogs = logsData.map(log => ({
//         username: log.username || '',
//         action: log.action || '',
//         details: log.details || '',
//         timestamp: log.timestamp || ''
//       }));
      
//       setLogs(parsedLogs);
//       setFilteredLogs(parsedLogs);
//       setTotalCount(parsedLogs.length);
      
//       setStatus(`${t.status.loaded} (${parsedLogs.length} ${t.status.logs})`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Load error:', err);
//       setStatus(t.status.error, 'error');
//       alert(t.alert.loadError);
//       setLogs([]);
//       setFilteredLogs([]);
//       setTotalCount(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [filterUsername, fromDate, toDate, filterAction, t]);

//   const exportLogs = useCallback(async () => {
//     if (filteredLogs.length === 0) {
//       alert(t.alert.noData);
//       return;
//     }

//     setStatus(t.status.exporting, 'loading');

//     try {
//       // Create CSV
//       const headers = 'Username,Action,Details,Timestamp';
//       const rows = filteredLogs.map(log => {
//         const details = log.details ? `"${log.details.replace(/"/g, '""')}"` : '';
//         return `${log.username},${log.action},${details},${log.timestamp}`;
//       }).join('\n');

//       const csv = `${headers}\n${rows}`;
//       const blob = new Blob([csv], { type: 'text/csv' });
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `logs_${new Date().toISOString().split('T')[0]}.csv`;
//       a.click();
//       URL.revokeObjectURL(url);

//       setStatus(t.status.exported, 'success');
//       alert(t.alert.exportSuccess);

//     } catch (err) {
//       //console.error('🚨 Export error:', err);
//       setStatus(t.status.error, 'error');
//       alert(t.alert.exportError);
//     }
//   }, [filteredLogs, t]);

//   // ---------- Handlers ----------
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase().trim();
//     setSearchQuery(query);
    
//     if (query === '') {
//       setFilteredLogs(logs);
//     } else {
//       const filtered = logs.filter(log => {
//         return (
//           log.username.toLowerCase().includes(query) ||
//           log.action.toLowerCase().includes(query) ||
//           log.details.toLowerCase().includes(query)
//         );
//       });
//       setFilteredLogs(filtered);
//     }
//   };

//   const handleApplyFilters = () => {
//     loadLogs();
//   };

//   const handleClearFilters = () => {
//     setFilterUsername('');
//     setFromDate('');
//     setToDate('');
//     setFilterAction('');
//     setSearchQuery('');
//     loadLogs();
//     setStatus(t.status.filtersCleared, 'success');
//   };

//   // ---------- Effects ----------
//   const isFirstLoad = useRef(true);

//   useEffect(() => {
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       loadLogs();
//     }
//   }, [loadLogs]);

//   // ---------- Render Components ----------
//   const renderTable = () => {
//     if (filteredLogs.length === 0) {
//       return <div className="logs-empty">📭 No logs found</div>;
//     }

//     return (
//       <div className="logs-table-wrapper">
//         <table className="logs-table">
//           <thead>
//             <tr>
//               <th>{t.col.username}</th>
//               <th>{t.col.action}</th>
//               <th>{t.col.details}</th>
//               <th>{t.col.timestamp}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredLogs.map((log, index) => (
//               <tr key={index}>
//                 <td style={{ fontWeight: 'bold' }}>{log.username}</td>
//                 <td>
//                   <span className={`action-badge ${getActionColor(log.action)}`}>
//                     {log.action || '-'}
//                   </span>
//                 </td>
//                 <td>{log.details || '-'}</td>
//                 <td className="timestamp">{formatTimestamp(log.timestamp)}</td>
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
//       <div className="logs-container">
//         {/* Header */}
//         <div className="logs-header">
//           <div className="title">📋 {t.title.logsMonitor}</div>
//           <div className="controls">
//             <div className="search-box">
//               <span className="search-icon">🔍</span>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 placeholder={t.prompt.search}
//               />
//             </div>
//             <button 
//               className="refresh"
//               onClick={loadLogs}
//               disabled={loading}
//             >
//               🔄 {t.btn.refresh}
//             </button>
//             <span className={`status-badge ${statusMessage.type}`}>
//               {statusMessage.text}
//             </span>
//           </div>
//         </div>

//         {/* Filter Bar */}
//         <div className="logs-filter-bar">
//           <div className="filter-group">
//             <label>{t.label.username}</label>
//             <input
//               type="text"
//               value={filterUsername}
//               onChange={(e) => setFilterUsername(e.target.value)}
//               placeholder={t.prompt.filterUsername}
//             />
//           </div>
          
//           <div className="filter-group">
//             <label>{t.label.fromDate}</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//             />
//           </div>
          
//           <div className="filter-group">
//             <label>{t.label.toDate}</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//             />
//           </div>
          
//           <div className="filter-group">
//             <label>{t.label.action}</label>
//             <select
//               value={filterAction}
//               onChange={(e) => setFilterAction(e.target.value)}
//             >
//               <option value="">{t.prompt.allActions}</option>
//               <option value="LOGIN">LOGIN</option>
//               <option value="LOGOUT">LOGOUT</option>
//               <option value="ADD_USER">ADD_USER</option>
//               <option value="DELETE_USER">DELETE_USER</option>
//               <option value="RESET_PASSWORD">RESET_PASSWORD</option>
//               <option value="TOGGLE_USER">TOGGLE_USER</option>
//               <option value="OPEN_USER_MANAGEMENT">OPEN_USER_MANAGEMENT</option>
//               <option value="OPEN_REPORTS">OPEN_REPORTS</option>
//               <option value="OPEN_PAYMENTS">OPEN_PAYMENTS</option>
//               <option value="EXPORT_DATA">EXPORT_DATA</option>
//             </select>
//           </div>
          
//           <button 
//             className="btn-filter"
//             onClick={handleApplyFilters}
//             disabled={loading}
//           >
//             🔍 {t.btn.applyFilters}
//           </button>
//           <button 
//             className="btn-clear"
//             onClick={handleClearFilters}
//             disabled={loading}
//           >
//             🗑️ {t.btn.clearFilters}
//           </button>
//           <button 
//             className="btn-export"
//             onClick={exportLogs}
//             disabled={loading || filteredLogs.length === 0}
//           >
//             📊 {t.btn.export}
//           </button>
//           {loading && <div className="loading">⏳</div>}
//         </div>

//         {/* Table Section */}
//         <div className="logs-table-section">
//           <div className="table-header">
//             <div className="title">📊 {t.table.title}</div>
//             <div className="stats">
//               <span className="pill">
//                 📝 {t.status.totalLogs}: {filteredLogs.length}
//               </span>
//               {searchQuery && (
//                 <span className="pill">
//                   🔍 {t.status.filtered}: {filteredLogs.length}
//                 </span>
//               )}
//             </div>
//           </div>
//           {loading && !logs.length ? (
//             <div className="logs-loading">⏳ {t.status.loading}</div>
//           ) : (
//             renderTable()
//           )}
//           <div className="logs-footer">
//             {t.status.totalLogs}: {filteredLogs.length}
//             {searchQuery && ` | ${t.status.filtered}: ${filteredLogs.length}`}
//             {` | ${t.status.lastUpdate}: ${new Date().toLocaleTimeString()}`}
//           </div>
//         </div>

//         {/* Status Bar */}
//         <div className="logs-status-bar">
//           <span className={`status-msg ${statusMessage.type}`}>
//             {statusMessage.text}
//           </span>
//           <span className="spacer"></span>
//           <span className="time">
//             🕐 {new Date().toLocaleTimeString()}
//           </span>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LogsMonitorScreen; 12072026 4:00pm

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Main Component ----------
const LogsMonitorScreen = ({ loggedUser, lang = 'en', onClose }) => {
  // ---------- Translations ----------
  const getTranslations = (language) => {
    const translations = {
      en: {
        title: { logsMonitor: 'Logs Monitor' },
        label: {
          username: 'Username',
          fromDate: 'From Date',
          toDate: 'To Date',
          action: 'Action'
        },
        prompt: {
          search: 'Search logs...',
          filterUsername: 'Filter by username',
          fromDate: 'From Date',
          toDate: 'To Date',
          allActions: 'All Actions'
        },
        btn: {
          refresh: 'Refresh',
          applyFilters: 'Apply Filters',
          clearFilters: 'Clear Filters',
          export: 'Export CSV'
        },
        status: {
          ready: 'Ready',
          loading: 'Loading...',
          loaded: 'Loaded',
          logs: 'logs',
          totalLogs: 'Total Logs',
          filtered: 'Filtered',
          lastUpdate: 'Last Update',
          error: 'Error',
          exporting: 'Exporting...',
          exported: 'Exported successfully',
          filtersCleared: 'Filters cleared'
        },
        table: {
          title: 'Logs',
          username: 'Username',
          action: 'Action',
          details: 'Details',
          timestamp: 'Timestamp'
        },
        col: {
          username: 'Username',
          action: 'Action',
          details: 'Details',
          timestamp: 'Timestamp'
        },
        alert: {
          info: 'Information',
          warning: 'Warning',
          error: 'Error',
          noData: 'No logs to export',
          loadError: 'Failed to load logs',
          exportSuccess: 'Logs exported successfully',
          exportError: 'Failed to export logs'
        }
      },
      ar: {
        title: { logsMonitor: 'مراقبة السجلات' },
        label: {
          username: 'اسم المستخدم',
          fromDate: 'من تاريخ',
          toDate: 'إلى تاريخ',
          action: 'الإجراء'
        },
        prompt: {
          search: 'بحث في السجلات...',
          filterUsername: 'تصفية باسم المستخدم',
          fromDate: 'من تاريخ',
          toDate: 'إلى تاريخ',
          allActions: 'جميع الإجراءات'
        },
        btn: {
          refresh: 'تحديث',
          applyFilters: 'تطبيق الفلاتر',
          clearFilters: 'مسح الفلاتر',
          export: 'تصدير CSV'
        },
        status: {
          ready: 'جاهز',
          loading: 'جاري التحميل...',
          loaded: 'تم التحميل',
          logs: 'سجلات',
          totalLogs: 'إجمالي السجلات',
          filtered: 'المصفاة',
          lastUpdate: 'آخر تحديث',
          error: 'خطأ',
          exporting: 'جاري التصدير...',
          exported: 'تم التصدير بنجاح',
          filtersCleared: 'تم مسح الفلاتر'
        },
        table: {
          title: 'السجلات',
          username: 'اسم المستخدم',
          action: 'الإجراء',
          details: 'التفاصيل',
          timestamp: 'الوقت'
        },
        col: {
          username: 'اسم المستخدم',
          action: 'الإجراء',
          details: 'التفاصيل',
          timestamp: 'الوقت'
        },
        alert: {
          info: 'معلومات',
          warning: 'تحذير',
          error: 'خطأ',
          noData: 'لا توجد سجلات للتصدير',
          loadError: 'فشل في تحميل السجلات',
          exportSuccess: 'تم تصدير السجلات بنجاح',
          exportError: 'فشل في تصدير السجلات'
        }
      }
    };
    return translations[language] || translations.en;
  };

  const t = getTranslations(lang);

  // ---------- State ----------
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
  const [totalCount, setTotalCount] = useState(0);

  // Filter states
  const [filterUsername, setFilterUsername] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filterAction, setFilterAction] = useState('');

  // ---------- Helper Functions ----------
  const setStatus = useCallback((text, type = 'success') => {
    setStatusMessage({ text: `● ${text}`, type });
  }, []);

  const getActionColor = (action) => {
    if (!action) return 'default';
    const upper = action.toUpperCase();
    switch (upper) {
      case 'LOGIN': return 'login';
      case 'LOGOUT': return 'logout';
      case 'ADD_USER': return 'add-user';
      case 'DELETE_USER': return 'delete-user';
      case 'RESET_PASSWORD': return 'reset-password';
      case 'TOGGLE_USER': return 'toggle-user';
      case 'OPEN_USER_MANAGEMENT': return 'open-user-management';
      case 'OPEN_REPORTS': return 'open-reports';
      case 'OPEN_PAYMENTS': return 'open-payments';
      case 'EXPORT_DATA': return 'export-data';
      default: return 'default';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return date.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    } catch {
      return timestamp;
    }
  };

  // ---------- API Calls ----------
  const loadLogs = useCallback(async () => {
    setLoading(true);
    setStatus(t.status.loading, 'loading');

    try {
      let url = `${BASE_URL}/api/logs`;
      const params = new URLSearchParams();

      if (filterUsername.trim()) {
        params.append('username', filterUsername.trim());
      }

      if (fromDate) {
        params.append('fromDate', fromDate);
      }

      if (toDate) {
        params.append('toDate', toDate);
      }

      if (filterAction && filterAction !== t.prompt.allActions) {
        params.append('action', filterAction);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const logsData = Array.isArray(data) ? data : [data];
      
      const parsedLogs = logsData.map(log => ({
        username: log.username || '',
        action: log.action || '',
        details: log.details || '',
        timestamp: log.timestamp || ''
      }));
      
      setLogs(parsedLogs);
      setFilteredLogs(parsedLogs);
      setTotalCount(parsedLogs.length);
      
      setStatus(`${t.status.loaded} (${parsedLogs.length} ${t.status.logs})`, 'success');
      
    } catch (err) {
      setStatus(t.status.error, 'error');
      alert(t.alert.loadError);
      setLogs([]);
      setFilteredLogs([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [filterUsername, fromDate, toDate, filterAction, t]);

  const exportLogs = useCallback(async () => {
    if (filteredLogs.length === 0) {
      alert(t.alert.noData);
      return;
    }

    setStatus(t.status.exporting, 'loading');

    try {
      const headers = 'Username,Action,Details,Timestamp';
      const rows = filteredLogs.map(log => {
        const details = log.details ? `"${log.details.replace(/"/g, '""')}"` : '';
        return `${log.username},${log.action},${details},${log.timestamp}`;
      }).join('\n');

      const csv = `${headers}\n${rows}`;
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `logs_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      setStatus(t.status.exported, 'success');
      alert(t.alert.exportSuccess);

    } catch (err) {
      setStatus(t.status.error, 'error');
      alert(t.alert.exportError);
    }
  }, [filteredLogs, t]);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase().trim();
    setSearchQuery(query);
    
    if (query === '') {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter(log => {
        return (
          log.username.toLowerCase().includes(query) ||
          log.action.toLowerCase().includes(query) ||
          log.details.toLowerCase().includes(query)
        );
      });
      setFilteredLogs(filtered);
    }
  };

  const handleApplyFilters = () => {
    loadLogs();
  };

  const handleClearFilters = () => {
    setFilterUsername('');
    setFromDate('');
    setToDate('');
    setFilterAction('');
    setSearchQuery('');
    loadLogs();
    setStatus(t.status.filtersCleared, 'success');
  };

  // ---------- Effects ----------
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      loadLogs();
    }
  }, [loadLogs]);

  // ---------- Render ----------
  return (
    <>
      <style>{`
        /* ==================== LOGS MONITOR STYLES ==================== */
        .logs-container {
          padding: 20px;
          background: #f0f2f5;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        /* Header */
        .logs-header {
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

        .logs-header .title {
          font-size: 22px;
          font-weight: bold;
          color: #2c3e50;
        }

        .logs-header .controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .logs-header .controls .search-box {
          display: flex;
          align-items: center;
          background: #f5f7fa;
          border-radius: 20px;
          padding: 4px 15px;
          flex: 1;
          min-width: 150px;
        }

        .logs-header .controls .search-box input {
          border: none;
          outline: none;
          padding: 6px 5px;
          font-size: 13px;
          background: transparent;
          min-width: 120px;
          min-height: 34px;
        }

        .logs-header .controls .search-box .search-icon {
          font-size: 14px;
          color: #a0aec0;
        }

        .logs-header .controls button {
          padding: 6px 16px;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
          color: white;
          min-height: 38px;
        }

        .logs-header .controls button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .logs-header .controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .logs-header .controls button.refresh { background: #3498db; }
        .logs-header .controls button.refresh:hover:not(:disabled) { background: #2980b9; }

        .logs-header .status-badge {
          padding: 4px 15px;
          border-radius: 10px;
          font-size: 12px;
          background: #e8f8f5;
          color: #27ae60;
        }

        .logs-header .status-badge.error { background: #fdedec; color: #e74c3c; }
        .logs-header .status-badge.loading { background: #fef9e7; color: #f39c12; }

        /* Filter Bar */
        .logs-filter-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 15px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          flex-wrap: wrap;
        }

        .logs-filter-bar .filter-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .logs-filter-bar .filter-group label {
          font-weight: bold;
          font-size: 13px;
          color: #34495e;
          white-space: nowrap;
        }

        .logs-filter-bar .filter-group input,
        .logs-filter-bar .filter-group select {
          padding: 6px 10px;
          border-radius: 5px;
          border: 1px solid #dce4ec;
          font-size: 13px;
          background: white;
          min-height: 38px;
        }

        .logs-filter-bar .filter-group input:focus,
        .logs-filter-bar .filter-group select:focus {
          outline: none;
          border-color: #3498db;
        }

        .logs-filter-bar .filter-group input[type="date"] {
          min-width: 140px;
        }

        .logs-filter-bar .filter-group select {
          min-width: 150px;
        }

        .logs-filter-bar button {
          padding: 6px 16px;
          border: none;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
          min-height: 38px;
        }

        .logs-filter-bar button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .logs-filter-bar button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .logs-filter-bar .btn-filter { background: #3498db; color: white; }
        .logs-filter-bar .btn-filter:hover:not(:disabled) { background: #2980b9; }
        .logs-filter-bar .btn-clear { background: #e74c3c; color: white; }
        .logs-filter-bar .btn-clear:hover:not(:disabled) { background: #c0392b; }
        .logs-filter-bar .btn-export { background: #27ae60; color: white; }
        .logs-filter-bar .btn-export:hover:not(:disabled) { background: #1e8449; }
        .logs-filter-bar .loading {
          width: 20px;
          height: 20px;
        }

        /* Table Section */
        .logs-table-section {
          background: white;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .logs-table-section .table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 8px;
        }

        .logs-table-section .table-header .title {
          font-size: 16px;
          font-weight: bold;
          color: #2c3e50;
        }

        .logs-table-section .table-header .stats {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .logs-table-section .table-header .stats .pill {
          padding: 3px 12px;
          border-radius: 12px;
          font-size: 12px;
          background: #e8f8f5;
          color: #1abc9c;
        }

        .logs-table-wrapper {
          overflow-x: auto;
          max-height: 450px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          -webkit-overflow-scrolling: touch;
        }

        .logs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 600px;
        }

        .logs-table th {
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

        .logs-table td {
          padding: 8px 15px;
          border-bottom: 1px solid #f0f0f0;
        }

        .logs-table tr:hover td {
          background: #f8f9fa;
        }

        .logs-table tr:nth-child(even) td {
          background: #f8f9fa;
        }

        .logs-table tr:nth-child(even):hover td {
          background: #e8f8f5;
        }

        .logs-table .action-badge {
          display: inline-block;
          padding: 2px 12px;
          border-radius: 12px;
          font-weight: bold;
          font-size: 12px;
          color: white;
        }

        .logs-table .action-badge.login { background: #27ae60; }
        .logs-table .action-badge.logout { background: #e74c3c; }
        .logs-table .action-badge.add-user { background: #3498db; }
        .logs-table .action-badge.delete-user { background: #e74c3c; }
        .logs-table .action-badge.reset-password { background: #f39c12; }
        .logs-table .action-badge.toggle-user { background: #9b59b6; }
        .logs-table .action-badge.open-user-management { background: #1abc9c; }
        .logs-table .action-badge.open-reports { background: #2ecc71; }
        .logs-table .action-badge.open-payments { background: #3498db; }
        .logs-table .action-badge.export-data { background: #f39c12; }
        .logs-table .action-badge.default { background: #95a5a6; }

        .logs-table .timestamp {
          color: #7f8c8d;
          font-size: 12px;
        }

        /* Footer */
        .logs-footer {
          font-size: 12px;
          color: #7f8c8d;
          padding: 5px 0 0 0;
        }

        /* Status Bar */
        .logs-status-bar {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 8px 15px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e9ecef;
          box-shadow: 0 1px 5px rgba(0,0,0,0.05);
          flex-wrap: wrap;
        }

        .logs-status-bar .status-msg {
          font-size: 12px;
          color: #27ae60;
        }

        .logs-status-bar .status-msg.error { color: #e74c3c; }
        .logs-status-bar .status-msg.loading { color: #f39c12; }

        .logs-status-bar .spacer { flex: 1; }
        .logs-status-bar .time {
          font-size: 11px;
          color: #95a5a6;
        }

        /* Loading */
        .logs-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #7f8c8d;
        }

        /* Empty State */
        .logs-empty {
          text-align: center;
          padding: 40px;
          color: #a0aec0;
          font-size: 16px;
        }

        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .slide-in {
          animation: slideIn 0.3s ease-out;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .logs-container {
            padding: 12px;
          }

          .logs-header {
            flex-direction: column;
            align-items: stretch;
          }

          .logs-header .title {
            font-size: 18px;
          }

          .logs-header .controls {
            flex-direction: column;
            align-items: stretch;
          }

          .logs-header .controls .search-box {
            width: 100%;
            min-width: unset;
          }

          .logs-header .controls .search-box input {
            min-width: unset;
          }

          .logs-header .controls button {
            width: 100%;
          }

          .logs-filter-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .logs-filter-bar .filter-group {
            flex-direction: column;
            align-items: stretch;
          }

          .logs-filter-bar .filter-group label {
            margin-bottom: 2px;
          }

          .logs-filter-bar .filter-group input,
          .logs-filter-bar .filter-group select {
            width: 100%;
            min-width: unset;
          }

          .logs-filter-bar button {
            width: 100%;
          }

          .logs-table-section .table-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .logs-table-section .table-header .stats {
            width: 100%;
          }

          .logs-status-bar {
            flex-direction: column;
            text-align: center;
          }

          .logs-table {
            font-size: 12px;
            min-width: 500px;
          }

          .logs-table th,
          .logs-table td {
            padding: 6px 10px;
          }
        }

        @media (max-width: 480px) {
          .logs-container {
            padding: 8px;
          }

          .logs-header {
            padding: 10px 14px;
          }

          .logs-header .title {
            font-size: 16px;
          }

          .logs-header .controls button {
            font-size: 12px;
            padding: 5px 12px;
            min-height: 34px;
          }

          .logs-filter-bar {
            padding: 8px 10px;
          }

          .logs-filter-bar .filter-group input,
          .logs-filter-bar .filter-group select {
            font-size: 15px;
            min-height: 36px;
          }

          .logs-filter-bar button {
            font-size: 12px;
            padding: 5px 12px;
            min-height: 34px;
          }

          .logs-table {
            font-size: 11px;
            min-width: 400px;
          }

          .logs-table th,
          .logs-table td {
            padding: 4px 8px;
          }

          .logs-table .action-badge {
            font-size: 10px;
            padding: 1px 8px;
          }

          .logs-table .timestamp {
            font-size: 10px;
          }

          .logs-table-section {
            padding: 10px;
          }

          .logs-status-bar {
            padding: 6px 10px;
            font-size: 11px;
          }

          .logs-footer {
            font-size: 10px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .logs-filter-bar {
            gap: 8px;
          }

          .logs-filter-bar .filter-group input[type="date"] {
            min-width: 120px;
          }

          .logs-filter-bar .filter-group select {
            min-width: 120px;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .logs-container {
            background: #1a1a2e;
          }

          .logs-header,
          .logs-filter-bar,
          .logs-table-section,
          .logs-status-bar {
            background: #2d2d44;
          }

          .logs-header .title {
            color: #ecf0f1;
          }

          .logs-header .controls .search-box {
            background: #1a1a2e;
            border: 1px solid #3d3d5c;
          }

          .logs-header .controls .search-box input {
            color: #ecf0f1;
          }

          .logs-header .controls .search-box input::placeholder {
            color: #666;
          }

          .logs-header .status-badge {
            background: #1a2a2a;
            color: #4CAF50;
          }

          .logs-header .status-badge.error {
            background: #2a1a1a;
            color: #e74c3c;
          }

          .logs-header .status-badge.loading {
            background: #2a2a1a;
            color: #f39c12;
          }

          .logs-filter-bar .filter-group label {
            color: #b0b0b0;
          }

          .logs-filter-bar .filter-group input,
          .logs-filter-bar .filter-group select {
            background: #1a1a2e;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .logs-filter-bar .filter-group input:focus,
          .logs-filter-bar .filter-group select:focus {
            border-color: #3498db;
          }

          .logs-filter-bar .filter-group input::placeholder {
            color: #666;
          }

          .logs-table th {
            background: #1a1a2e;
            color: #ecf0f1;
            border-bottom-color: #3d3d5c;
          }

          .logs-table td {
            color: #b0b0b0;
            border-bottom-color: #3d3d5c;
          }

          .logs-table tr:hover td {
            background: #1a1a2e;
          }

          .logs-table tr:nth-child(even) td {
            background: #1a1a2e;
          }

          .logs-table tr:nth-child(even):hover td {
            background: #1a2744;
          }

          .logs-table .timestamp {
            color: #888;
          }

          .logs-table-section .table-header .title {
            color: #ecf0f1;
          }

          .logs-table-section .table-header .stats .pill {
            background: #1a2a2a;
            color: #4CAF50;
          }

          .logs-footer {
            color: #888;
          }

          .logs-status-bar {
            border-color: #3d3d5c;
          }

          .logs-status-bar .status-msg {
            color: #4CAF50;
          }

          .logs-status-bar .status-msg.error {
            color: #e74c3c;
          }

          .logs-status-bar .status-msg.loading {
            color: #f39c12;
          }

          .logs-status-bar .time {
            color: #888;
          }

          .logs-empty {
            color: #666;
          }

          .logs-loading {
            color: #666;
          }
        }
      `}</style>

      <div className="logs-container">
        {/* Header */}
        <div className="logs-header">
          <div className="title">📋 {t.title.logsMonitor}</div>
          <div className="controls">
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
              className="refresh"
              onClick={loadLogs}
              disabled={loading}
            >
              🔄 {t.btn.refresh}
            </button>
            <span className={`status-badge ${statusMessage.type}`}>
              {statusMessage.text}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="logs-filter-bar">
          <div className="filter-group">
            <label>{t.label.username}</label>
            <input
              type="text"
              value={filterUsername}
              onChange={(e) => setFilterUsername(e.target.value)}
              placeholder={t.prompt.filterUsername}
            />
          </div>
          
          <div className="filter-group">
            <label>{t.label.fromDate}</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>{t.label.toDate}</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>{t.label.action}</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
            >
              <option value="">{t.prompt.allActions}</option>
              <option value="LOGIN">LOGIN</option>
              <option value="LOGOUT">LOGOUT</option>
              <option value="ADD_USER">ADD_USER</option>
              <option value="DELETE_USER">DELETE_USER</option>
              <option value="RESET_PASSWORD">RESET_PASSWORD</option>
              <option value="TOGGLE_USER">TOGGLE_USER</option>
              <option value="OPEN_USER_MANAGEMENT">OPEN_USER_MANAGEMENT</option>
              <option value="OPEN_REPORTS">OPEN_REPORTS</option>
              <option value="OPEN_PAYMENTS">OPEN_PAYMENTS</option>
              <option value="EXPORT_DATA">EXPORT_DATA</option>
            </select>
          </div>
          
          <button 
            className="btn-filter"
            onClick={handleApplyFilters}
            disabled={loading}
          >
            🔍 {t.btn.applyFilters}
          </button>
          <button 
            className="btn-clear"
            onClick={handleClearFilters}
            disabled={loading}
          >
            🗑️ {t.btn.clearFilters}
          </button>
          <button 
            className="btn-export"
            onClick={exportLogs}
            disabled={loading || filteredLogs.length === 0}
          >
            📊 {t.btn.export}
          </button>
          {loading && <div className="loading">⏳</div>}
        </div>

        {/* Table Section */}
        <div className="logs-table-section">
          <div className="table-header">
            <div className="title">📊 {t.table.title}</div>
            <div className="stats">
              <span className="pill">
                📝 {t.status.totalLogs}: {filteredLogs.length}
              </span>
              {searchQuery && (
                <span className="pill">
                  🔍 {t.status.filtered}: {filteredLogs.length}
                </span>
              )}
            </div>
          </div>
          {loading && !logs.length ? (
            <div className="logs-loading">⏳ {t.status.loading}</div>
          ) : filteredLogs.length === 0 ? (
            <div className="logs-empty">📭 No logs found</div>
          ) : (
            <div className="logs-table-wrapper">
              <table className="logs-table">
                <thead>
                  <tr>
                    <th>{t.col.username}</th>
                    <th>{t.col.action}</th>
                    <th>{t.col.details}</th>
                    <th>{t.col.timestamp}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 'bold' }}>{log.username}</td>
                      <td>
                        <span className={`action-badge ${getActionColor(log.action)}`}>
                          {log.action || '-'}
                        </span>
                      </td>
                      <td>{log.details || '-'}</td>
                      <td className="timestamp">{formatTimestamp(log.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="logs-footer">
            {t.status.totalLogs}: {filteredLogs.length}
            {searchQuery && ` | ${t.status.filtered}: ${filteredLogs.length}`}
            {` | ${t.status.lastUpdate}: ${new Date().toLocaleTimeString()}`}
          </div>
        </div>

        {/* Status Bar */}
        <div className="logs-status-bar">
          <span className={`status-msg ${statusMessage.type}`}>
            {statusMessage.text}
          </span>
          <span className="spacer"></span>
          <span className="time">
            🕐 {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </>
  );
};

export default LogsMonitorScreen;