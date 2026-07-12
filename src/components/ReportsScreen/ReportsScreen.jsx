// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { BASE_URL } from '../../utils/api';

// // // ---------- Styles ----------
// // const styles = `
// //   .reports-container {
// //     padding: 20px;
// //     background: #f0f4f8;
// //     min-height: 100vh;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //     display: flex;
// //     flex-direction: column;
// //     gap: 20px;
// //   }
  
// //   /* Header */
// //   .reports-header {
// //     display: flex;
// //     align-items: center;
// //     justify-content: space-between;
// //     padding: 15px 25px;
// //     background: white;
// //     border-radius: 12px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //   }
// //   .reports-header .title {
// //     font-size: 24px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .reports-header .actions {
// //     display: flex;
// //     gap: 10px;
// //     align-items: center;
// //   }
// //   .reports-header .actions button {
// //     padding: 8px 18px;
// //     border: none;
// //     border-radius: 20px;
// //     font-weight: bold;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //     font-size: 13px;
// //     color: white;
// //   }
// //   .reports-header .actions button:hover {
// //     transform: scale(1.05);
// //   }
// //   .reports-header .actions button.refresh { background: #3498db; }
// //   .reports-header .actions button.refresh:hover { background: #2980b9; }
// //   .reports-header .actions button.export { background: #2ecc71; }
// //   .reports-header .actions button.export:hover { background: #27ae60; }
// //   .reports-header .actions button.print { background: #e67e22; }
// //   .reports-header .actions button.print:hover { background: #d35400; }
// //   .reports-header .status {
// //     font-size: 12px;
// //     color: #27ae60;
// //   }
// //   .reports-header .status.error { color: #e74c3c; }
// //   .reports-header .status.loading { color: #f39c12; }

// //   /* Layout */
// //   .reports-layout {
// //     display: flex;
// //     gap: 20px;
// //     flex: 1;
// //   }
  
// //   /* Sidebar Navigation */
// //   .reports-nav {
// //     width: 250px;
// //     min-width: 250px;
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //   }
// //   .reports-nav .nav-title {
// //     font-size: 16px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     padding-bottom: 15px;
// //     border-bottom: 1px solid #e9ecef;
// //     margin-bottom: 15px;
// //   }
// //   .reports-nav .nav-group {
// //     margin-bottom: 15px;
// //   }
// //   .reports-nav .nav-group .group-title {
// //     font-size: 12px;
// //     font-weight: bold;
// //     color: #7f8c8d;
// //     text-decoration: underline;
// //     margin-bottom: 5px;
// //   }
// //   .reports-nav .nav-group button {
// //     display: block;
// //     width: 100%;
// //     padding: 8px 12px;
// //     background: transparent;
// //     border: none;
// //     border-radius: 8px;
// //     text-align: left;
// //     cursor: pointer;
// //     font-size: 13px;
// //     color: #34495e;
// //     transition: all 0.2s;
// //   }
// //   .reports-nav .nav-group button:hover {
// //     background: #e9ecef;
// //     color: #2c3e50;
// //   }
// //   .reports-nav .nav-group button.active {
// //     background: #3498db;
// //     color: white;
// //   }

// //   /* Content Area */
// //   .reports-content {
// //     flex: 1;
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     display: flex;
// //     flex-direction: column;
// //     gap: 15px;
// //     min-height: 500px;
// //   }

// //   /* Stats Bar */
// //   .reports-stats {
// //     display: flex;
// //     align-items: center;
// //     gap: 20px;
// //     padding: 10px 15px;
// //     background: #f8f9fa;
// //     border-radius: 8px;
// //     border: 1px solid #e9ecef;
// //   }
// //   .reports-stats .stat-item {
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .reports-stats .spacer { flex: 1; }
// //   .reports-stats .last-update {
// //     font-size: 11px;
// //     color: #7f8c8d;
// //   }

// //   /* Table */
// //   .reports-table-wrapper {
// //     overflow-x: auto;
// //     max-height: 320px;
// //     border: 1px solid #e9ecef;
// //     border-radius: 8px;
// //   }
// //   .reports-table {
// //     width: 100%;
// //     border-collapse: collapse;
// //     font-size: 13px;
// //   }
// //   .reports-table th {
// //     background: #f8f9fa;
// //     padding: 10px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     border-bottom: 2px solid #e9ecef;
// //     position: sticky;
// //     top: 0;
// //     z-index: 10;
// //   }
// //   .reports-table td {
// //     padding: 8px 15px;
// //     border-bottom: 1px solid #f0f0f0;
// //   }
// //   .reports-table tr:hover td {
// //     background: #f8f9fa;
// //   }

// //   /* Chart Container */
// //   .reports-chart {
// //     flex: 1;
// //     padding: 15px;
// //     border: 1px solid #e9ecef;
// //     border-radius: 8px;
// //     background: white;
// //     min-height: 350px;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //   }

// //   /* Loading */
// //   .reports-loading {
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //     padding: 40px;
// //     color: #7f8c8d;
// //   }

// //   /* No Data */
// //   .reports-empty {
// //     text-align: center;
// //     padding: 40px;
// //     color: #7f8c8d;
// //     font-size: 16px;
// //   }

// //   /* Chart Colors */
// //   .chart-color-0 { --chart-color: #4CAF50; }
// //   .chart-color-1 { --chart-color: #2196F3; }
// //   .chart-color-2 { --chart-color: #FF9800; }
// //   .chart-color-3 { --chart-color: #E91E63; }
// //   .chart-color-4 { --chart-color: #9C27B0; }
// //   .chart-color-5 { --chart-color: #00BCD4; }
// //   .chart-color-6 { --chart-color: #FF5722; }
// //   .chart-color-7 { --chart-color: #8BC34A; }
// //   .chart-color-8 { --chart-color: #3F51B5; }
// //   .chart-color-9 { --chart-color: #FFC107; }
// //   .chart-color-10 { --chart-color: #795548; }
// //   .chart-color-11 { --chart-color: #607D8B; }

// //   /* Pie Chart */
// //   .pie-chart-container {
// //     width: 100%;
// //     height: 300px;
// //     display: flex;
// //     align-items: center;
// //     justify-content: center;
// //   }
// //   .pie-chart {
// //     width: 250px;
// //     height: 250px;
// //     border-radius: 50%;
// //     position: relative;
// //   }
// //   .pie-chart .slice {
// //     position: absolute;
// //     width: 100%;
// //     height: 100%;
// //     border-radius: 50%;
// //   }
// //   .pie-chart .slice-label {
// //     position: absolute;
// //     font-size: 12px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //     pointer-events: none;
// //   }

// //   /* Bar Chart */
// //   .bar-chart-container {
// //     width: 100%;
// //     height: 300px;
// //     display: flex;
// //     align-items: flex-end;
// //     justify-content: space-around;
// //     padding: 20px 10px;
// //     gap: 10px;
// //   }
// //   .bar-chart-container .bar-wrapper {
// //     display: flex;
// //     flex-direction: column;
// //     align-items: center;
// //     flex: 1;
// //     height: 100%;
// //     justify-content: flex-end;
// //   }
// //   .bar-chart-container .bar {
// //     width: 40px;
// //     border-radius: 4px 4px 0 0;
// //     transition: height 0.5s ease;
// //     min-height: 4px;
// //     position: relative;
// //   }
// //   .bar-chart-container .bar .bar-value {
// //     position: absolute;
// //     top: -20px;
// //     left: 50%;
// //     transform: translateX(-50%);
// //     font-size: 11px;
// //     font-weight: bold;
// //     color: #2c3e50;
// //   }
// //   .bar-chart-container .bar-label {
// //     margin-top: 8px;
// //     font-size: 11px;
// //     color: #34495e;
// //     text-align: center;
// //     max-width: 60px;
// //     overflow: hidden;
// //     text-overflow: ellipsis;
// //     white-space: nowrap;
// //   }
// // `;

// // // ---------- Color Palette ----------
// // const CHART_COLORS = [
// //   '#4CAF50', '#2196F3', '#FF9800', '#E91E63',
// //   '#9C27B0', '#00BCD4', '#FF5722', '#8BC34A',
// //   '#3F51B5', '#FFC107', '#795548', '#607D8B'
// // ];

// // // ---------- Main Component ----------
// // const ReportsScreen = ({ loggedUser, lang = 'en', onClose }) => {
// //   // ---------- Translations ----------
// //   const [t, setTranslations] = useState({});

// //   useEffect(() => {
// //     const loadTranslations = async () => {
// //       try {
// //         // Load language from API
// //         const response = await fetch(`${BASE_URL}/api/clinic/1/info`);
// //         if (response.ok) {
// //           const data = await response.json();
// //           const language = data.language || 'en';
          
// //           // Use the language to load translations
// //           const translations = {
// //             en: {
// //               title: { reports: 'Reports' },
// //               header: { title: '📊 Reports Dashboard' },
// //               nav: {
// //                 reports: 'Reports',
// //                 group: {
// //                   appointments: 'Appointments',
// //                   walkins: 'Walk-ins',
// //                   patients: 'Patients',
// //                   doctors: 'Doctors'
// //                 },
// //                 appointmentsPerDoctor: 'Appointments per Doctor',
// //                 appointmentsByStatus: 'Appointments by Status',
// //                 walkinsPerDoctor: 'Walk-ins per Doctor',
// //                 patientsByGender: 'Patients by Gender',
// //                 patientsByCity: 'Patients by City',
// //                 doctorsBySpecialty: 'Doctors by Specialty'
// //               },
// //               btn: {
// //                 refresh: 'Refresh',
// //                 export: 'Export',
// //                 print: 'Print',
// //                 close: 'Close'
// //               },
// //               status: {
// //                 ready: 'Ready',
// //                 loading: 'Loading...',
// //                 loaded: 'Loaded',
// //                 records: 'records',
// //                 in: 'in',
// //                 error: 'Error loading data',
// //                 exported: 'Exported successfully',
// //                 exportError: 'Export failed',
// //                 printed: 'Printed successfully'
// //               },
// //               stats: {
// //                 totalRecords: 'Total Records',
// //                 uniqueValues: 'Unique Values',
// //                 lastUpdate: 'Last Update'
// //               },
// //               chart: {
// //                 title: 'Chart',
// //                 category: 'Category',
// //                 value: 'Value'
// //               },
// //               col: {
// //                 doctor: 'Doctor',
// //                 totalAppointments: 'Total Appointments',
// //                 status: 'Status',
// //                 count: 'Count',
// //                 walkins: 'Walk-ins',
// //                 gender: 'Gender',
// //                 city: 'City',
// //                 patientCount: 'Patient Count',
// //                 specialty: 'Specialty',
// //                 doctorCount: 'Doctor Count'
// //               },
// //               message: {
// //                 noData: 'No data available'
// //               },
// //               error: {
// //                 title: 'Error',
// //                 load: 'Failed to load data',
// //                 endpoint: 'Endpoint',
// //                 tryAgain: 'Please try again'
// //               },
// //               alert: {
// //                 noData: 'No data to export',
// //                 exportSuccess: 'Data exported successfully',
// //                 exportError: 'Failed to export data'
// //               }
// //             },
// //             ar: {
// //               title: { reports: 'التقارير' },
// //               header: { title: '📊 لوحة التقارير' },
// //               nav: {
// //                 reports: 'التقارير',
// //                 group: {
// //                   appointments: 'المواعيد',
// //                   walkins: 'الزيارات المباشرة',
// //                   patients: 'المرضى',
// //                   doctors: 'الأطباء'
// //                 },
// //                 appointmentsPerDoctor: 'المواعيد لكل طبيب',
// //                 appointmentsByStatus: 'المواعيد حسب الحالة',
// //                 walkinsPerDoctor: 'الزيارات المباشرة لكل طبيب',
// //                 patientsByGender: 'المرضى حسب الجنس',
// //                 patientsByCity: 'المرضى حسب المدينة',
// //                 doctorsBySpecialty: 'الأطباء حسب التخصص'
// //               },
// //               btn: {
// //                 refresh: 'تحديث',
// //                 export: 'تصدير',
// //                 print: 'طباعة',
// //                 close: 'إغلاق'
// //               },
// //               status: {
// //                 ready: 'جاهز',
// //                 loading: 'جاري التحميل...',
// //                 loaded: 'تم التحميل',
// //                 records: 'سجلات',
// //                 in: 'في',
// //                 error: 'خطأ في تحميل البيانات',
// //                 exported: 'تم التصدير بنجاح',
// //                 exportError: 'فشل التصدير',
// //                 printed: 'تمت الطباعة بنجاح'
// //               },
// //               stats: {
// //                 totalRecords: 'إجمالي السجلات',
// //                 uniqueValues: 'القيم الفريدة',
// //                 lastUpdate: 'آخر تحديث'
// //               },
// //               chart: {
// //                 title: 'الرسم البياني',
// //                 category: 'الفئة',
// //                 value: 'القيمة'
// //               },
// //               col: {
// //                 doctor: 'الطبيب',
// //                 totalAppointments: 'إجمالي المواعيد',
// //                 status: 'الحالة',
// //                 count: 'العدد',
// //                 walkins: 'الزيارات المباشرة',
// //                 gender: 'الجنس',
// //                 city: 'المدينة',
// //                 patientCount: 'عدد المرضى',
// //                 specialty: 'التخصص',
// //                 doctorCount: 'عدد الأطباء'
// //               },
// //               message: {
// //                 noData: 'لا توجد بيانات'
// //               },
// //               error: {
// //                 title: 'خطأ',
// //                 load: 'فشل في تحميل البيانات',
// //                 endpoint: 'نقطة النهاية',
// //                 tryAgain: 'يرجى المحاولة مرة أخرى'
// //               },
// //               alert: {
// //                 noData: 'لا توجد بيانات للتصدير',
// //                 exportSuccess: 'تم تصدير البيانات بنجاح',
// //                 exportError: 'فشل في تصدير البيانات'
// //               }
// //             }
// //           };
          
// //           setTranslations(translations[language] || translations.en);
// //         }
// //       } catch (err) {
// //         //console.error('Failed to load translations:', err);
// //         // Fallback to English
// //         setTranslations({
// //           title: { reports: 'Reports' },
// //           header: { title: '📊 Reports Dashboard' },
// //           nav: {
// //             reports: 'Reports',
// //             group: {
// //               appointments: 'Appointments',
// //               walkins: 'Walk-ins',
// //               patients: 'Patients',
// //               doctors: 'Doctors'
// //             },
// //             appointmentsPerDoctor: 'Appointments per Doctor',
// //             appointmentsByStatus: 'Appointments by Status',
// //             walkinsPerDoctor: 'Walk-ins per Doctor',
// //             patientsByGender: 'Patients by Gender',
// //             patientsByCity: 'Patients by City',
// //             doctorsBySpecialty: 'Doctors by Specialty'
// //           },
// //           btn: {
// //             refresh: 'Refresh',
// //             export: 'Export',
// //             print: 'Print',
// //             close: 'Close'
// //           },
// //           status: {
// //             ready: 'Ready',
// //             loading: 'Loading...',
// //             loaded: 'Loaded',
// //             records: 'records',
// //             in: 'in',
// //             error: 'Error loading data',
// //             exported: 'Exported successfully',
// //             exportError: 'Export failed',
// //             printed: 'Printed successfully'
// //           },
// //           stats: {
// //             totalRecords: 'Total Records',
// //             uniqueValues: 'Unique Values',
// //             lastUpdate: 'Last Update'
// //           },
// //           chart: {
// //             title: 'Chart',
// //             category: 'Category',
// //             value: 'Value'
// //           },
// //           col: {
// //             doctor: 'Doctor',
// //             totalAppointments: 'Total Appointments',
// //             status: 'Status',
// //             count: 'Count',
// //             walkins: 'Walk-ins',
// //             gender: 'Gender',
// //             city: 'City',
// //             patientCount: 'Patient Count',
// //             specialty: 'Specialty',
// //             doctorCount: 'Doctor Count'
// //           },
// //           message: {
// //             noData: 'No data available'
// //           },
// //           error: {
// //             title: 'Error',
// //             load: 'Failed to load data',
// //             endpoint: 'Endpoint',
// //             tryAgain: 'Please try again'
// //           },
// //           alert: {
// //             noData: 'No data to export',
// //             exportSuccess: 'Data exported successfully',
// //             exportError: 'Failed to export data'
// //           }
// //         });
// //       }
// //     };
    
// //     loadTranslations();
// //   }, [lang]);

// //   // ---------- State ----------
// //   const [data, setData] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [statusMessage, setStatusMessage] = useState({ text: '● Ready', type: 'success' });
// //   const [stats, setStats] = useState({ total: 0, unique: 0 });
// //   const [currentEndpoint, setCurrentEndpoint] = useState('/appointments/per-doctor');
// //   const [currentChartType, setCurrentChartType] = useState('bar');
// //   const [currentColumnNames, setCurrentColumnNames] = useState(['Doctor', 'Total Appointments']);
// //   const [activeButton, setActiveButton] = useState('appointmentsPerDoctor');
// //   const [lastUpdate, setLastUpdate] = useState(new Date());

// //   // ---------- Helper Functions ----------
// //   const setStatus = useCallback((text, type = 'success') => {
// //     setStatusMessage({ text: `● ${text}`, type });
// //   }, []);

// //   const formatNumber = (value) => {
// //     if (typeof value === 'number') {
// //       if (value % 1 === 0) {
// //         return String(value);
// //       } else {
// //         return value.toFixed(2);
// //       }
// //     }
// //     return String(value);
// //   };

// //   const getStatusClass = (status) => {
// //     switch (status) {
// //       case 'loading': return 'loading';
// //       case 'error': return 'error';
// //       default: return '';
// //     }
// //   };

// //   // ---------- API Call ----------
// //   const loadReport = useCallback(async (endpoint, chartType, columnNames, reportId) => {
// //     setLoading(true);
// //     setCurrentEndpoint(endpoint);
// //     setCurrentChartType(chartType);
// //     setCurrentColumnNames(columnNames);
// //     if (reportId) setActiveButton(reportId);
    
// //     setStatus('Loading...', 'loading');

// //     try {
// //       const startTime = performance.now();
// //       const url = `${BASE_URL}/api/reports${endpoint}`;
// //       //console.log('📤 Fetching report:', url);
      
// //       const response = await fetch(url);
// //       if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
// //       const rawText = await response.text();
// //       //console.log('📄 Raw response:', rawText);
      
// //       const jsonData = JSON.parse(rawText);
// //       const elapsed = Math.round(performance.now() - startTime);

// //       setData(jsonData);
      
// //       // Update stats
// //       const total = jsonData.length;
// //       const unique = new Set();
// //       jsonData.forEach(row => {
// //         if (row && row.length > 0) {
// //           unique.add(String(row[0]));
// //         }
// //       });
// //       setStats({ total, unique: unique.size });
      
// //       setStatus(`Loaded (${total} records) in ${elapsed}ms`, 'success');
// //       setLastUpdate(new Date());
      
// //     } catch (err) {
// //       //console.error('🚨 Load error:', err);
// //       setStatus('Error loading data', 'error');
// //       setData([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   // ---------- Handlers ----------
// //   const refreshCurrentReport = useCallback(() => {
// //     if (currentEndpoint) {
// //       loadReport(currentEndpoint, currentChartType, currentColumnNames, activeButton);
// //     }
// //   }, [currentEndpoint, currentChartType, currentColumnNames, activeButton, loadReport]);

// //   const exportData = useCallback(() => {
// //     if (data.length === 0) {
// //       alert('No data to export');
// //       return;
// //     }

// //     // Create CSV
// //     const headers = currentColumnNames.join(',');
// //     const rows = data.map(row => {
// //       return row.map(value => {
// //         const str = String(value);
// //         if (str.includes(',') || str.includes('"') || str.includes('\n')) {
// //           return `"${str.replace(/"/g, '""')}"`;
// //         }
// //         return str;
// //       }).join(',');
// //     }).join('\n');

// //     const csv = `${headers}\n${rows}`;
// //     const blob = new Blob([csv], { type: 'text/csv' });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
// //     a.click();
// //     URL.revokeObjectURL(url);

// //     setStatus('Exported successfully', 'success');
// //   }, [data, currentColumnNames]);

// //   const printReport = useCallback(() => {
// //     if (data.length === 0) {
// //       alert('No data to print');
// //       return;
// //     }

// //     // Create a printable version
// //     const printWindow = window.open('', '_blank');
// //     const tableRows = data.map(row => {
// //       return `<tr>${row.map(value => `<td>${value}</td>`).join('')}</tr>`;
// //     }).join('');

// //     printWindow.document.write(`
// //       <html>
// //         <head>
// //           <title>Report</title>
// //           <style>
// //             body { font-family: Arial, sans-serif; padding: 20px; }
// //             h2 { color: #2c3e50; }
// //             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
// //             th { background: #f8f9fa; padding: 10px; text-align: left; border: 1px solid #ddd; }
// //             td { padding: 8px 10px; border: 1px solid #ddd; }
// //             .footer { margin-top: 20px; font-size: 12px; color: #7f8c8d; }
// //           </style>
// //         </head>
// //         <body>
// //           <h2>${t.header?.title || 'Report'}</h2>
// //           <p>${t.stats?.lastUpdate || 'Last Update'}: ${new Date().toLocaleString()}</p>
// //           <table>
// //             <thead>
// //               <tr>${currentColumnNames.map(col => `<th>${col}</th>`).join('')}</tr>
// //             </thead>
// //             <tbody>${tableRows}</tbody>
// //           </table>
// //           <div class="footer">Total Records: ${data.length}</div>
// //         </body>
// //       </html>
// //     `);
    
// //     printWindow.document.close();
// //     printWindow.print();

// //     setStatus('Printed successfully', 'success');
// //   }, [data, currentColumnNames, t]);

// //   // ---------- Chart Components ----------
// //  // ---------- Chart Components ----------
// // const renderPieChart = (data) => {
// //   if (!data || data.length === 0) {
// //     return <div className="reports-empty">No data available</div>;
// //   }

// //   const total = data.reduce((sum, row) => sum + parseFloat(row[1] || 0), 0);
  
// //   if (total === 0) {
// //     return <div className="reports-empty">No data to display</div>;
// //   }

// //   return (
// //     <div className="pie-chart-container" style={{ 
// //       width: '100%', 
// //       height: '300px',
// //       display: 'flex',
// //       flexDirection: 'column',
// //       alignItems: 'center',
// //       justifyContent: 'center'
// //     }}>
// //       <div style={{ 
// //         width: '280px', 
// //         height: '280px', 
// //         position: 'relative',
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'center'
// //       }}>
// //         {/* Using CSS conic-gradient for the pie chart */}
// //         <div style={{
// //           width: '100%',
// //           height: '100%',
// //           borderRadius: '50%',
// //           background: data.map((row, index) => {
// //             const value = parseFloat(row[1] || 0);
// //             const percentage = total > 0 ? (value / total) * 100 : 0;
// //             const color = CHART_COLORS[index % CHART_COLORS.length];
// //             return `${color} ${percentage}%`;
// //           }).join(', '),
// //           position: 'absolute',
// //           top: 0,
// //           left: 0
// //         }} />
        
// //         {/* Center text */}
// //         <div style={{
// //           position: 'absolute',
// //           background: 'white',
// //           borderRadius: '50%',
// //           width: '100px',
// //           height: '100px',
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           flexDirection: 'column',
// //           fontSize: '14px',
// //           fontWeight: 'bold',
// //           color: '#2c3e50',
// //           boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
// //         }}>
// //           <span>Total</span>
// //           <span style={{ fontSize: '18px', color: '#3498db' }}>{total}</span>
// //         </div>
// //       </div>

// //       {/* Legend */}
// //       <div style={{
// //         display: 'flex',
// //         flexWrap: 'wrap',
// //         gap: '15px',
// //         marginTop: '20px',
// //         justifyContent: 'center',
// //         maxWidth: '500px'
// //       }}>
// //         {data.map((row, index) => {
// //           const value = parseFloat(row[1] || 0);
// //           const percentage = total > 0 ? (value / total) * 100 : 0;
// //           const color = CHART_COLORS[index % CHART_COLORS.length];
// //           return (
// //             <div key={index} style={{
// //               display: 'flex',
// //               alignItems: 'center',
// //               gap: '6px',
// //               fontSize: '13px',
// //               color: '#34495e'
// //             }}>
// //               <div style={{
// //                 width: '16px',
// //                 height: '16px',
// //                 borderRadius: '4px',
// //                 backgroundColor: color
// //               }} />
// //               <span>{row[0]}: {value} ({percentage.toFixed(1)}%)</span>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// // const renderBarChart = (data) => {
// //   if (!data || data.length === 0) {
// //     return <div className="reports-empty">No data available</div>;
// //   }

// //   const values = data.map(row => parseFloat(row[1] || 0));
// //   const maxValue = Math.max(...values, 1);
// //   const chartHeight = 250;

// //   return (
// //     <div style={{ 
// //       width: '100%', 
// //       height: '300px',
// //       display: 'flex',
// //       flexDirection: 'column',
// //       alignItems: 'center',
// //       justifyContent: 'flex-end'
// //     }}>
// //       <div style={{
// //         display: 'flex',
// //         alignItems: 'flex-end',
// //         justifyContent: 'space-around',
// //         width: '90%',
// //         height: chartHeight,
// //         padding: '0 10px',
// //         gap: '15px',
// //         borderBottom: '2px solid #e9ecef',
// //         borderLeft: '2px solid #e9ecef',
// //         position: 'relative'
// //       }}>
// //         {data.map((row, index) => {
// //           const value = parseFloat(row[1] || 0);
// //           const height = Math.max((value / maxValue) * chartHeight, 10);
// //           const color = CHART_COLORS[index % CHART_COLORS.length];

// //           return (
// //             <div key={index} style={{
// //               display: 'flex',
// //               flexDirection: 'column',
// //               alignItems: 'center',
// //               flex: 1,
// //               height: '100%',
// //               justifyContent: 'flex-end',
// //               position: 'relative'
// //             }}>
// //               {/* Value on top */}
// //               <div style={{
// //                 position: 'absolute',
// //                 top: -25,
// //                 fontSize: '12px',
// //                 fontWeight: 'bold',
// //                 color: '#2c3e50'
// //               }}>
// //                 {value}
// //               </div>
// //               {/* Bar */}
// //               <div style={{
// //                 width: '40px',
// //                 height: `${height}px`,
// //                 backgroundColor: color,
// //                 borderRadius: '4px 4px 0 0',
// //                 transition: 'height 0.5s ease',
// //                 position: 'relative'
// //               }}>
// //                 {/* Hover tooltip */}
// //                 <div style={{
// //                   position: 'absolute',
// //                   top: -30,
// //                   left: '50%',
// //                   transform: 'translateX(-50%)',
// //                   background: 'rgba(0,0,0,0.8)',
// //                   color: 'white',
// //                   padding: '2px 8px',
// //                   borderRadius: '4px',
// //                   fontSize: '11px',
// //                   opacity: 0,
// //                   transition: 'opacity 0.2s',
// //                   whiteSpace: 'nowrap'
// //                 }}>
// //                   {row[0]}: {value}
// //                 </div>
// //               </div>
// //               {/* Label */}
// //               <div style={{
// //                 marginTop: '8px',
// //                 fontSize: '11px',
// //                 color: '#34495e',
// //                 textAlign: 'center',
// //                 maxWidth: '60px',
// //                 overflow: 'hidden',
// //                 textOverflow: 'ellipsis',
// //                 whiteSpace: 'nowrap'
// //               }}>
// //                 {row[0]}
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // };

// //   // ---------- Table Render ----------
// //   const renderTable = () => {
// //     if (data.length === 0) {
// //       return <div className="reports-empty">No data available</div>;
// //     }

// //     return (
// //       <div className="reports-table-wrapper">
// //         <table className="reports-table">
// //           <thead>
// //             <tr>
// //               {currentColumnNames.map((col, index) => (
// //                 <th key={index}>{col}</th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {data.map((row, rowIndex) => (
// //               <tr key={rowIndex}>
// //                 {row.map((value, colIndex) => (
// //                   <td key={colIndex}>{formatNumber(value)}</td>
// //                 ))}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     );
// //   };

// //   // ---------- Render ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="reports-container">
// //         {/* Header */}
// //         <div className="reports-header">
// //           <div className="title">{t.header?.title || '📊 Reports Dashboard'}</div>
// //           <div className="actions">
// //             <button 
// //               className="refresh" 
// //               onClick={refreshCurrentReport}
// //               disabled={loading}
// //             >
// //               🔄 {t.btn?.refresh || 'Refresh'}
// //             </button>
// //             <button 
// //               className="export" 
// //               onClick={exportData}
// //               disabled={loading || data.length === 0}
// //             >
// //               📊 {t.btn?.export || 'Export'}
// //             </button>
// //             <button 
// //               className="print" 
// //               onClick={printReport}
// //               disabled={loading || data.length === 0}
// //             >
// //               🖨️ {t.btn?.print || 'Print'}
// //             </button>
// //             <span className={`status ${getStatusClass(statusMessage.type)}`}>
// //               {statusMessage.text}
// //             </span>
// //           </div>
// //         </div>

// //         <div className="reports-layout">
// //           {/* Sidebar Navigation */}
// //           <div className="reports-nav">
// //             <div className="nav-title">📋 {t.nav?.reports || 'Reports'}</div>

// //             {/* Appointments Group */}
// //             <div className="nav-group">
// //               <div className="group-title">{t.nav?.group?.appointments || 'Appointments'}</div>
// //               <button
// //                 className={activeButton === 'appointmentsPerDoctor' ? 'active' : ''}
// //                 onClick={() => loadReport(
// //                   '/appointments/per-doctor',
// //                   'bar',
// //                   [t.col?.doctor || 'Doctor', t.col?.totalAppointments || 'Total Appointments'],
// //                   'appointmentsPerDoctor'
// //                 )}
// //               >
// //                 {t.nav?.appointmentsPerDoctor || 'Appointments per Doctor'}
// //               </button>
// //               <button
// //                 className={activeButton === 'appointmentsByStatus' ? 'active' : ''}
// //                 onClick={() => loadReport(
// //                   '/appointments/by-status',
// //                   'pie',
// //                   [t.col?.status || 'Status', t.col?.count || 'Count'],
// //                   'appointmentsByStatus'
// //                 )}
// //               >
// //                 {t.nav?.appointmentsByStatus || 'Appointments by Status'}
// //               </button>
// //             </div>

// //             {/* Walk-ins Group */}
// //             <div className="nav-group">
// //               <div className="group-title">{t.nav?.group?.walkins || 'Walk-ins'}</div>
// //               <button
// //                 className={activeButton === 'walkinsPerDoctor' ? 'active' : ''}
// //                 onClick={() => loadReport(
// //                   '/walkins/per-doctor',
// //                   'bar',
// //                   [t.col?.doctor || 'Doctor', t.col?.walkins || 'Walk-ins'],
// //                   'walkinsPerDoctor'
// //                 )}
// //               >
// //                 {t.nav?.walkinsPerDoctor || 'Walk-ins per Doctor'}
// //               </button>
// //             </div>

// //             {/* Patients Group */}
// //             <div className="nav-group">
// //               <div className="group-title">{t.nav?.group?.patients || 'Patients'}</div>
// //               <button
// //                 className={activeButton === 'patientsByGender' ? 'active' : ''}
// //                 onClick={() => loadReport(
// //                   '/patients/by-gender',
// //                   'pie',
// //                   [t.col?.gender || 'Gender', t.col?.count || 'Count'],
// //                   'patientsByGender'
// //                 )}
// //               >
// //                 {t.nav?.patientsByGender || 'Patients by Gender'}
// //               </button>
// //               <button
// //                 className={activeButton === 'patientsByCity' ? 'active' : ''}
// //                 onClick={() => loadReport(
// //                   '/patients/by-city',
// //                   'bar',
// //                   [t.col?.city || 'City', t.col?.patientCount || 'Patient Count'],
// //                   'patientsByCity'
// //                 )}
// //               >
// //                 {t.nav?.patientsByCity || 'Patients by City'}
// //               </button>
// //             </div>

// //             {/* Doctors Group */}
// //             <div className="nav-group">
// //               <div className="group-title">{t.nav?.group?.doctors || 'Doctors'}</div>
// //               <button
// //                 className={activeButton === 'doctorsBySpecialty' ? 'active' : ''}
// //                 onClick={() => loadReport(
// //                   '/doctors/by-specialty',
// //                   'bar',
// //                   [t.col?.specialty || 'Specialty', t.col?.doctorCount || 'Doctor Count'],
// //                   'doctorsBySpecialty'
// //                 )}
// //               >
// //                 {t.nav?.doctorsBySpecialty || 'Doctors by Specialty'}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Content Area */}
// //           <div className="reports-content">
// //             {/* Stats Bar */}
// //             <div className="reports-stats">
// //               <span className="stat-item">
// //                 {t.stats?.totalRecords || 'Total Records'}: {stats.total}
// //               </span>
// //               <span className="stat-item">
// //                 {t.stats?.uniqueValues || 'Unique Values'}: {stats.unique}
// //               </span>
// //               <span className="spacer"></span>
// //               <span className="last-update">
// //                 {t.stats?.lastUpdate || 'Last Update'}: {lastUpdate.toLocaleString()}
// //               </span>
// //             </div>

// //             {/* Loading State */}
// //             {loading ? (
// //               <div className="reports-loading">
// //                 <span>⏳ Loading...</span>
// //               </div>
// //             ) : (
// //               <>
// //                 {/* Table */}
// //                 {renderTable()}

// //                 {/* Chart */}
// //                 <div className="reports-chart">
// //                   {data.length === 0 ? (
// //                     <div className="reports-empty">{t.message?.noData || 'No data available'}</div>
// //                   ) : currentChartType === 'pie' ? (
// //                     renderPieChart(data)
// //                   ) : (
// //                     renderBarChart(data)
// //                   )}
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ReportsScreen; V1 02072026

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .reports-container {
//     padding: 20px;
//     background: #f0f4f8;
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//   }
  
//   /* Header */
//   .reports-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 15px 25px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//   }
//   .reports-header .title {
//     font-size: 24px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .reports-header .actions {
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
//   .reports-header .actions button {
//     padding: 8px 18px;
//     border: none;
//     border-radius: 20px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     color: white;
//   }
//   .reports-header .actions button:hover {
//     transform: scale(1.05);
//   }
//   .reports-header .actions button.refresh { background: #3498db; }
//   .reports-header .actions button.refresh:hover { background: #2980b9; }
//   .reports-header .actions button.export { background: #2ecc71; }
//   .reports-header .actions button.export:hover { background: #27ae60; }
//   .reports-header .actions button.print { background: #e67e22; }
//   .reports-header .actions button.print:hover { background: #d35400; }
//   .reports-header .status {
//     font-size: 12px;
//     color: #27ae60;
//   }
//   .reports-header .status.error { color: #e74c3c; }
//   .reports-header .status.loading { color: #f39c12; }

//   /* Layout */
//   .reports-layout {
//     display: flex;
//     gap: 20px;
//     flex: 1;
//   }
  
//   /* Sidebar Navigation */
//   .reports-nav {
//     width: 250px;
//     min-width: 250px;
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//   }
//   .reports-nav .nav-title {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2c3e50;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #e9ecef;
//     margin-bottom: 15px;
//   }
//   .reports-nav .nav-group {
//     margin-bottom: 15px;
//   }
//   .reports-nav .nav-group .group-title {
//     font-size: 12px;
//     font-weight: bold;
//     color: #7f8c8d;
//     text-decoration: underline;
//     margin-bottom: 5px;
//   }
//   .reports-nav .nav-group button {
//     display: block;
//     width: 100%;
//     padding: 8px 12px;
//     background: transparent;
//     border: none;
//     border-radius: 8px;
//     text-align: left;
//     cursor: pointer;
//     font-size: 13px;
//     color: #34495e;
//     transition: all 0.2s;
//   }
//   .reports-nav .nav-group button:hover {
//     background: #e9ecef;
//     color: #2c3e50;
//   }
//   .reports-nav .nav-group button.active {
//     background: #3498db;
//     color: white;
//   }

//   /* Content Area */
//   .reports-content {
//     flex: 1;
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//     min-height: 500px;
//   }

//   /* Stats Bar */
//   .reports-stats {
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     padding: 10px 15px;
//     background: #f8f9fa;
//     border-radius: 8px;
//     border: 1px solid #e9ecef;
//   }
//   .reports-stats .stat-item {
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .reports-stats .spacer { flex: 1; }
//   .reports-stats .last-update {
//     font-size: 11px;
//     color: #7f8c8d;
//   }

//   /* Table */
//   .reports-table-wrapper {
//     overflow-x: auto;
//     max-height: 320px;
//     border: 1px solid #e9ecef;
//     border-radius: 8px;
//   }
//   .reports-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .reports-table th {
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
//   .reports-table td {
//     padding: 8px 15px;
//     border-bottom: 1px solid #f0f0f0;
//   }
//   .reports-table tr:hover td {
//     background: #f8f9fa;
//   }

//   /* Chart Container */
//   .reports-chart {
//     flex: 1;
//     padding: 15px;
//     border: 1px solid #e9ecef;
//     border-radius: 8px;
//     background: white;
//     min-height: 400px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   /* Loading */
//   .reports-loading {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 40px;
//     color: #7f8c8d;
//   }

//   /* No Data */
//   .reports-empty {
//     text-align: center;
//     padding: 40px;
//     color: #7f8c8d;
//     font-size: 16px;
//   }

//   /* Pie Chart Styles */
//   .pie-chart-wrapper {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 20px;
//   }
//   .pie-chart-container {
//     width: 280px;
//     height: 280px;
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .pie-chart-center {
//     position: absolute;
//     background: white;
//     border-radius: 50%;
//     width: 100px;
//     height: 100px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     font-size: 14px;
//     font-weight: bold;
//     color: #2c3e50;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//     z-index: 2;
//   }
//   .pie-legend {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 15px;
//     margin-top: 20px;
//     justify-content: center;
//     max-width: 500px;
//   }
//   .pie-legend-item {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 13px;
//     color: #34495e;
//   }
//   .pie-legend-color {
//     width: 16px;
//     height: 16px;
//     border-radius: 4px;
//   }

//   /* Bar Chart Styles */
//   .bar-chart-wrapper {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: flex-end;
//     padding: 20px;
//   }
//   .bar-chart-container {
//     display: flex;
//     align-items: flex-end;
//     justify-content: space-around;
//     width: 90%;
//     height: 250px;
//     padding: 0 10px;
//     gap: 15px;
//     border-bottom: 2px solid #e9ecef;
//     border-left: 2px solid #e9ecef;
//     position: relative;
//   }
//   .bar-wrapper {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     flex: 1;
//     height: 100%;
//     justify-content: flex-end;
//     position: relative;
//   }
//   .bar {
//     width: 40px;
//     border-radius: 4px 4px 0 0;
//     transition: height 0.5s ease;
//     position: relative;
//     min-height: 4px;
//   }
//   .bar-value {
//     position: absolute;
//     top: -25px;
//     left: 50%;
//     transform: translateX(-50%);
//     font-size: 12px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .bar-label {
//     margin-top: 8px;
//     font-size: 11px;
//     color: #34495e;
//     text-align: center;
//     max-width: 60px;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }
//   .bar-tooltip {
//     position: absolute;
//     top: -30px;
//     left: 50%;
//     transform: translateX(-50%);
//     background: rgba(0,0,0,0.8);
//     color: white;
//     padding: 2px 8px;
//     border-radius: 4px;
//     font-size: 11px;
//     opacity: 0;
//     transition: opacity 0.2s;
//     white-space: nowrap;
//     pointer-events: none;
//   }
//   .bar-wrapper:hover .bar-tooltip {
//     opacity: 1;
//   }
// `;

// // ---------- Color Palette ----------
// const CHART_COLORS = [
//   '#4CAF50', '#2196F3', '#FF9800', '#E91E63',
//   '#9C27B0', '#00BCD4', '#FF5722', '#8BC34A',
//   '#3F51B5', '#FFC107', '#795548', '#607D8B'
// ];

// // ---------- Main Component ----------
// const ReportsScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const [t, setTranslations] = useState({});

//   useEffect(() => {
//     const loadTranslations = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/api/clinic/1/info`);
//         if (response.ok) {
//           const data = await response.json();
//           const language = data.language || 'en';
          
//           const translations = {
//             en: {
//               title: { reports: 'Reports' },
//               header: { title: '📊 Reports Dashboard' },
//               nav: {
//                 reports: 'Reports',
//                 group: {
//                   appointments: 'Appointments',
//                   walkins: 'Walk-ins',
//                   patients: 'Patients',
//                   doctors: 'Doctors'
//                 },
//                 appointmentsPerDoctor: 'Appointments per Doctor',
//                 appointmentsByStatus: 'Appointments by Status',
//                 walkinsPerDoctor: 'Walk-ins per Doctor',
//                 patientsByGender: 'Patients by Gender',
//                 patientsByCity: 'Patients by City',
//                 doctorsBySpecialty: 'Doctors by Specialty'
//               },
//               btn: {
//                 refresh: 'Refresh',
//                 export: 'Export',
//                 print: 'Print',
//                 close: 'Close'
//               },
//               status: {
//                 ready: 'Ready',
//                 loading: 'Loading...',
//                 loaded: 'Loaded',
//                 records: 'records',
//                 in: 'in',
//                 error: 'Error loading data',
//                 exported: 'Exported successfully',
//                 exportError: 'Export failed',
//                 printed: 'Printed successfully'
//               },
//               stats: {
//                 totalRecords: 'Total Records',
//                 uniqueValues: 'Unique Values',
//                 lastUpdate: 'Last Update'
//               },
//               chart: {
//                 title: 'Chart',
//                 category: 'Category',
//                 value: 'Value'
//               },
//               col: {
//                 doctor: 'Doctor',
//                 totalAppointments: 'Total Appointments',
//                 status: 'Status',
//                 count: 'Count',
//                 walkins: 'Walk-ins',
//                 gender: 'Gender',
//                 city: 'City',
//                 patientCount: 'Patient Count',
//                 specialty: 'Specialty',
//                 doctorCount: 'Doctor Count'
//               },
//               message: {
//                 noData: 'No data available'
//               },
//               error: {
//                 title: 'Error',
//                 load: 'Failed to load data',
//                 endpoint: 'Endpoint',
//                 tryAgain: 'Please try again'
//               },
//               alert: {
//                 noData: 'No data to export',
//                 exportSuccess: 'Data exported successfully',
//                 exportError: 'Failed to export data'
//               }
//             },
//             ar: {
//               title: { reports: 'التقارير' },
//               header: { title: '📊 لوحة التقارير' },
//               nav: {
//                 reports: 'التقارير',
//                 group: {
//                   appointments: 'المواعيد',
//                   walkins: 'الزيارات المباشرة',
//                   patients: 'المرضى',
//                   doctors: 'الأطباء'
//                 },
//                 appointmentsPerDoctor: 'المواعيد لكل طبيب',
//                 appointmentsByStatus: 'المواعيد حسب الحالة',
//                 walkinsPerDoctor: 'الزيارات المباشرة لكل طبيب',
//                 patientsByGender: 'المرضى حسب الجنس',
//                 patientsByCity: 'المرضى حسب المدينة',
//                 doctorsBySpecialty: 'الأطباء حسب التخصص'
//               },
//               btn: {
//                 refresh: 'تحديث',
//                 export: 'تصدير',
//                 print: 'طباعة',
//                 close: 'إغلاق'
//               },
//               status: {
//                 ready: 'جاهز',
//                 loading: 'جاري التحميل...',
//                 loaded: 'تم التحميل',
//                 records: 'سجلات',
//                 in: 'في',
//                 error: 'خطأ في تحميل البيانات',
//                 exported: 'تم التصدير بنجاح',
//                 exportError: 'فشل التصدير',
//                 printed: 'تمت الطباعة بنجاح'
//               },
//               stats: {
//                 totalRecords: 'إجمالي السجلات',
//                 uniqueValues: 'القيم الفريدة',
//                 lastUpdate: 'آخر تحديث'
//               },
//               chart: {
//                 title: 'الرسم البياني',
//                 category: 'الفئة',
//                 value: 'القيمة'
//               },
//               col: {
//                 doctor: 'الطبيب',
//                 totalAppointments: 'إجمالي المواعيد',
//                 status: 'الحالة',
//                 count: 'العدد',
//                 walkins: 'الزيارات المباشرة',
//                 gender: 'الجنس',
//                 city: 'المدينة',
//                 patientCount: 'عدد المرضى',
//                 specialty: 'التخصص',
//                 doctorCount: 'عدد الأطباء'
//               },
//               message: {
//                 noData: 'لا توجد بيانات'
//               },
//               error: {
//                 title: 'خطأ',
//                 load: 'فشل في تحميل البيانات',
//                 endpoint: 'نقطة النهاية',
//                 tryAgain: 'يرجى المحاولة مرة أخرى'
//               },
//               alert: {
//                 noData: 'لا توجد بيانات للتصدير',
//                 exportSuccess: 'تم تصدير البيانات بنجاح',
//                 exportError: 'فشل في تصدير البيانات'
//               }
//             }
//           };
          
//           setTranslations(translations[language] || translations.en);
//         }
//       } catch (err) {
//         //console.error('Failed to load translations:', err);
//         setTranslations({
//           title: { reports: 'Reports' },
//           header: { title: '📊 Reports Dashboard' },
//           nav: {
//             reports: 'Reports',
//             group: {
//               appointments: 'Appointments',
//               walkins: 'Walk-ins',
//               patients: 'Patients',
//               doctors: 'Doctors'
//             },
//             appointmentsPerDoctor: 'Appointments per Doctor',
//             appointmentsByStatus: 'Appointments by Status',
//             walkinsPerDoctor: 'Walk-ins per Doctor',
//             patientsByGender: 'Patients by Gender',
//             patientsByCity: 'Patients by City',
//             doctorsBySpecialty: 'Doctors by Specialty'
//           },
//           btn: {
//             refresh: 'Refresh',
//             export: 'Export',
//             print: 'Print',
//             close: 'Close'
//           },
//           status: {
//             ready: 'Ready',
//             loading: 'Loading...',
//             loaded: 'Loaded',
//             records: 'records',
//             in: 'in',
//             error: 'Error loading data',
//             exported: 'Exported successfully',
//             exportError: 'Export failed',
//             printed: 'Printed successfully'
//           },
//           stats: {
//             totalRecords: 'Total Records',
//             uniqueValues: 'Unique Values',
//             lastUpdate: 'Last Update'
//           },
//           chart: {
//             title: 'Chart',
//             category: 'Category',
//             value: 'Value'
//           },
//           col: {
//             doctor: 'Doctor',
//             totalAppointments: 'Total Appointments',
//             status: 'Status',
//             count: 'Count',
//             walkins: 'Walk-ins',
//             gender: 'Gender',
//             city: 'City',
//             patientCount: 'Patient Count',
//             specialty: 'Specialty',
//             doctorCount: 'Doctor Count'
//           },
//           message: {
//             noData: 'No data available'
//           },
//           error: {
//             title: 'Error',
//             load: 'Failed to load data',
//             endpoint: 'Endpoint',
//             tryAgain: 'Please try again'
//           },
//           alert: {
//             noData: 'No data to export',
//             exportSuccess: 'Data exported successfully',
//             exportError: 'Failed to export data'
//           }
//         });
//       }
//     };
    
//     loadTranslations();
//   }, [lang]);

//   // ---------- State ----------
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: '● Ready', type: 'success' });
//   const [stats, setStats] = useState({ total: 0, unique: 0 });
//   const [currentEndpoint, setCurrentEndpoint] = useState('/appointments/per-doctor');
//   const [currentChartType, setCurrentChartType] = useState('bar');
//   const [currentColumnNames, setCurrentColumnNames] = useState(['Doctor', 'Total Appointments']);
//   const [activeButton, setActiveButton] = useState('appointmentsPerDoctor');
//   const [lastUpdate, setLastUpdate] = useState(new Date());

//   // ---------- Helper Functions ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text: `● ${text}`, type });
//   }, []);

//   const formatNumber = (value) => {
//     if (typeof value === 'number') {
//       if (value % 1 === 0) {
//         return String(value);
//       } else {
//         return value.toFixed(2);
//       }
//     }
//     return String(value);
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'loading': return 'loading';
//       case 'error': return 'error';
//       default: return '';
//     }
//   };

//   // ---------- Normalize Data ----------
//   const normalizeReportData = (data) => {
//     if (!data || !Array.isArray(data)) return [];
    
//     // If data is an array of objects instead of arrays
//     if (data.length > 0 && typeof data[0] === 'object' && !Array.isArray(data[0])) {
//       // Convert object to array format
//       return data.map(item => {
//         const keys = Object.keys(item);
//         return [item[keys[0]], item[keys[1]]];
//       });
//     }
    
//     return data;
//   };

//   // ---------- API Call ----------
//   const loadReport = useCallback(async (endpoint, chartType, columnNames, reportId) => {
//     setLoading(true);
//     setCurrentEndpoint(endpoint);
//     setCurrentChartType(chartType);
//     setCurrentColumnNames(columnNames);
//     if (reportId) setActiveButton(reportId);
    
//     setStatus('Loading...', 'loading');

//     try {
//       const startTime = performance.now();
//       const url = `${BASE_URL}/api/reports${endpoint}`;
//       //console.log('📤 Fetching report:', url);
      
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
//       const rawText = await response.text();
//       //console.log('📄 Raw response:', rawText);
      
//       const jsonData = JSON.parse(rawText);
//       const elapsed = Math.round(performance.now() - startTime);

//       // Normalize the data
//       const normalizedData = normalizeReportData(jsonData);
//       setData(normalizedData);
      
//       // Update stats
//       const total = normalizedData.length;
//       const unique = new Set();
//       normalizedData.forEach(row => {
//         if (row && row.length > 0) {
//           unique.add(String(row[0]));
//         }
//       });
//       setStats({ total, unique: unique.size });
      
//       setStatus(`Loaded (${total} records) in ${elapsed}ms`, 'success');
//       setLastUpdate(new Date());
      
//     } catch (err) {
//       //console.error('🚨 Load error:', err);
//       setStatus('Error loading data', 'error');
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ---------- Handlers ----------
//   const refreshCurrentReport = useCallback(() => {
//     if (currentEndpoint) {
//       loadReport(currentEndpoint, currentChartType, currentColumnNames, activeButton);
//     }
//   }, [currentEndpoint, currentChartType, currentColumnNames, activeButton, loadReport]);

//   const exportData = useCallback(() => {
//     if (data.length === 0) {
//       alert('No data to export');
//       return;
//     }

//     // Create CSV
//     const headers = currentColumnNames.join(',');
//     const rows = data.map(row => {
//       return row.map(value => {
//         const str = String(value);
//         if (str.includes(',') || str.includes('"') || str.includes('\n')) {
//           return `"${str.replace(/"/g, '""')}"`;
//         }
//         return str;
//       }).join(',');
//     }).join('\n');

//     const csv = `${headers}\n${rows}`;
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);

//     setStatus('Exported successfully', 'success');
//   }, [data, currentColumnNames]);

//   const printReport = useCallback(() => {
//     if (data.length === 0) {
//       alert('No data to print');
//       return;
//     }

//     // Create a printable version
//     const printWindow = window.open('', '_blank');
//     const tableRows = data.map(row => {
//       return `<tr>${row.map(value => `<td>${value}</td>`).join('')}</tr>`;
//     }).join('');

//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Report</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; }
//             h2 { color: #2c3e50; }
//             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//             th { background: #f8f9fa; padding: 10px; text-align: left; border: 1px solid #ddd; }
//             td { padding: 8px 10px; border: 1px solid #ddd; }
//             .footer { margin-top: 20px; font-size: 12px; color: #7f8c8d; }
//           </style>
//         </head>
//         <body>
//           <h2>${t.header?.title || 'Report'}</h2>
//           <p>${t.stats?.lastUpdate || 'Last Update'}: ${new Date().toLocaleString()}</p>
//           <table>
//             <thead>
//               <tr>${currentColumnNames.map(col => `<th>${col}</th>`).join('')}</tr>
//             </thead>
//             <tbody>${tableRows}</tbody>
//           </table>
//           <div class="footer">Total Records: ${data.length}</div>
//         </body>
//       </html>
//     `);
    
//     printWindow.document.close();
//     printWindow.print();

//     setStatus('Printed successfully', 'success');
//   }, [data, currentColumnNames, t]);

//   // ---------- Chart Components ----------
//   const renderPieChart = (data) => {
//     if (!data || data.length === 0) {
//       return <div className="reports-empty">No data available</div>;
//     }

//     const total = data.reduce((sum, row) => sum + parseFloat(row[1] || 0), 0);
    
//     if (total === 0) {
//       return <div className="reports-empty">No data to display</div>;
//     }

//     // Calculate percentages and build the conic gradient
//     let currentPercentage = 0;
//     const gradientParts = data.map((row, index) => {
//       const value = parseFloat(row[1] || 0);
//       const percentage = (value / total) * 100;
//       const start = currentPercentage;
//       const end = currentPercentage + percentage;
//       currentPercentage = end;
//       const color = CHART_COLORS[index % CHART_COLORS.length];
//       return `${color} ${start}% ${end}%`;
//     });

//     return (
//       <div className="pie-chart-wrapper">
//         <div className="pie-chart-container">
//           <div style={{
//             width: '100%',
//             height: '100%',
//             borderRadius: '50%',
//             background: `conic-gradient(${gradientParts.join(', ')})`,
//             position: 'absolute',
//             top: 0,
//             left: 0
//           }} />
//           <div className="pie-chart-center">
//             <span>Total</span>
//             <span style={{ fontSize: '18px', color: '#3498db' }}>{total}</span>
//           </div>
//         </div>

//         <div className="pie-legend">
//           {data.map((row, index) => {
//             const value = parseFloat(row[1] || 0);
//             const percentage = total > 0 ? (value / total) * 100 : 0;
//             const color = CHART_COLORS[index % CHART_COLORS.length];
//             return (
//               <div key={index} className="pie-legend-item">
//                 <div className="pie-legend-color" style={{ backgroundColor: color }} />
//                 <span>{row[0]}: {value} ({percentage.toFixed(1)}%)</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const renderBarChart = (data) => {
//     if (!data || data.length === 0) {
//       return <div className="reports-empty">No data available</div>;
//     }

//     const values = data.map(row => parseFloat(row[1] || 0));
//     const maxValue = Math.max(...values, 1);
//     const chartHeight = 250;

//     return (
//       <div className="bar-chart-wrapper">
//         <div className="bar-chart-container">
//           {data.map((row, index) => {
//             const value = parseFloat(row[1] || 0);
//             const height = Math.max((value / maxValue) * chartHeight, 10);
//             const color = CHART_COLORS[index % CHART_COLORS.length];

//             return (
//               <div key={index} className="bar-wrapper">
//                 <div className="bar" style={{
//                   height: `${height}px`,
//                   backgroundColor: color
//                 }}>
//                   <div className="bar-tooltip">{row[0]}: {value}</div>
//                 </div>
//                 <div className="bar-value">{value}</div>
//                 <div className="bar-label">{row[0]}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   // ---------- Table Render ----------
//   const renderTable = () => {
//     if (data.length === 0) {
//       return <div className="reports-empty">No data available</div>;
//     }

//     return (
//       <div className="reports-table-wrapper">
//         <table className="reports-table">
//           <thead>
//             <tr>
//               {currentColumnNames.map((col, index) => (
//                 <th key={index}>{col}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {row.map((value, colIndex) => (
//                   <td key={colIndex}>{formatNumber(value)}</td>
//                 ))}
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
//       <div className="reports-container">
//         {/* Header */}
//         <div className="reports-header">
//           <div className="title">{t.header?.title || '📊 Reports Dashboard'}</div>
//           <div className="actions">
//             <button 
//               className="refresh" 
//               onClick={refreshCurrentReport}
//               disabled={loading}
//             >
//               🔄 {t.btn?.refresh || 'Refresh'}
//             </button>
//             <button 
//               className="export" 
//               onClick={exportData}
//               disabled={loading || data.length === 0}
//             >
//               📊 {t.btn?.export || 'Export'}
//             </button>
//             <button 
//               className="print" 
//               onClick={printReport}
//               disabled={loading || data.length === 0}
//             >
//               🖨️ {t.btn?.print || 'Print'}
//             </button>
//             <span className={`status ${getStatusClass(statusMessage.type)}`}>
//               {statusMessage.text}
//             </span>
//           </div>
//         </div>

//         <div className="reports-layout">
//           {/* Sidebar Navigation */}
//           <div className="reports-nav">
//             <div className="nav-title">📋 {t.nav?.reports || 'Reports'}</div>

//             {/* Appointments Group */}
//             <div className="nav-group">
//               <div className="group-title">{t.nav?.group?.appointments || 'Appointments'}</div>
//               <button
//                 className={activeButton === 'appointmentsPerDoctor' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/appointments/per-doctor',
//                   'bar',
//                   [t.col?.doctor || 'Doctor', t.col?.totalAppointments || 'Total Appointments'],
//                   'appointmentsPerDoctor'
//                 )}
//               >
//                 {t.nav?.appointmentsPerDoctor || 'Appointments per Doctor'}
//               </button>
//               <button
//                 className={activeButton === 'appointmentsByStatus' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/appointments/by-status',
//                   'pie',
//                   [t.col?.status || 'Status', t.col?.count || 'Count'],
//                   'appointmentsByStatus'
//                 )}
//               >
//                 {t.nav?.appointmentsByStatus || 'Appointments by Status'}
//               </button>
//             </div>

//             {/* Walk-ins Group */}
//             <div className="nav-group">
//               <div className="group-title">{t.nav?.group?.walkins || 'Walk-ins'}</div>
//               <button
//                 className={activeButton === 'walkinsPerDoctor' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/walkins/per-doctor',
//                   'bar',
//                   [t.col?.doctor || 'Doctor', t.col?.walkins || 'Walk-ins'],
//                   'walkinsPerDoctor'
//                 )}
//               >
//                 {t.nav?.walkinsPerDoctor || 'Walk-ins per Doctor'}
//               </button>
//             </div>

//             {/* Patients Group */}
//             <div className="nav-group">
//               <div className="group-title">{t.nav?.group?.patients || 'Patients'}</div>
//               <button
//                 className={activeButton === 'patientsByGender' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/patients/by-gender',
//                   'pie',
//                   [t.col?.gender || 'Gender', t.col?.count || 'Count'],
//                   'patientsByGender'
//                 )}
//               >
//                 {t.nav?.patientsByGender || 'Patients by Gender'}
//               </button>
//               <button
//                 className={activeButton === 'patientsByCity' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/patients/by-city',
//                   'bar',
//                   [t.col?.city || 'City', t.col?.patientCount || 'Patient Count'],
//                   'patientsByCity'
//                 )}
//               >
//                 {t.nav?.patientsByCity || 'Patients by City'}
//               </button>
//             </div>

//             {/* Doctors Group */}
//             <div className="nav-group">
//               <div className="group-title">{t.nav?.group?.doctors || 'Doctors'}</div>
//               <button
//                 className={activeButton === 'doctorsBySpecialty' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/doctors/by-specialty',
//                   'bar',
//                   [t.col?.specialty || 'Specialty', t.col?.doctorCount || 'Doctor Count'],
//                   'doctorsBySpecialty'
//                 )}
//               >
//                 {t.nav?.doctorsBySpecialty || 'Doctors by Specialty'}
//               </button>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="reports-content">
//             {/* Stats Bar */}
//             <div className="reports-stats">
//               <span className="stat-item">
//                 {t.stats?.totalRecords || 'Total Records'}: {stats.total}
//               </span>
//               <span className="stat-item">
//                 {t.stats?.uniqueValues || 'Unique Values'}: {stats.unique}
//               </span>
//               <span className="spacer"></span>
//               <span className="last-update">
//                 {t.stats?.lastUpdate || 'Last Update'}: {lastUpdate.toLocaleString()}
//               </span>
//             </div>

//             {/* Loading State */}
//             {loading ? (
//               <div className="reports-loading">
//                 <span>⏳ Loading...</span>
//               </div>
//             ) : (
//               <>
//                 {/* Table */}
//                 {renderTable()}

//                 {/* Chart */}
//                 <div className="reports-chart">
//                   {data.length === 0 ? (
//                     <div className="reports-empty">{t.message?.noData || 'No data available'}</div>
//                   ) : currentChartType === 'pie' ? (
//                     renderPieChart(data)
//                   ) : (
//                     renderBarChart(data)
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReportsScreen; V2 02072026

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .reports-container {
//     padding: 20px;
//     background: #f0f4f8;
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//   }
  
//   /* Header */
//   .reports-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 15px 25px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//   }
//   .reports-header .title {
//     font-size: 24px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .reports-header .actions {
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
//   .reports-header .actions button {
//     padding: 8px 18px;
//     border: none;
//     border-radius: 20px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     color: white;
//   }
//   .reports-header .actions button:hover {
//     transform: scale(1.05);
//   }
//   .reports-header .actions button.refresh { background: #3498db; }
//   .reports-header .actions button.refresh:hover { background: #2980b9; }
//   .reports-header .actions button.export { background: #2ecc71; }
//   .reports-header .actions button.export:hover { background: #27ae60; }
//   .reports-header .actions button.print { background: #e67e22; }
//   .reports-header .actions button.print:hover { background: #d35400; }
//   .reports-header .status {
//     font-size: 12px;
//     color: #27ae60;
//   }
//   .reports-header .status.error { color: #e74c3c; }
//   .reports-header .status.loading { color: #f39c12; }

//   /* Layout */
//   .reports-layout {
//     display: flex;
//     gap: 20px;
//     flex: 1;
//   }
  
//   /* Sidebar Navigation */
//   .reports-nav {
//     width: 250px;
//     min-width: 250px;
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//   }
//   .reports-nav .nav-title {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2c3e50;
//     padding-bottom: 15px;
//     border-bottom: 1px solid #e9ecef;
//     margin-bottom: 15px;
//   }
//   .reports-nav .nav-group {
//     margin-bottom: 15px;
//   }
//   .reports-nav .nav-group .group-title {
//     font-size: 12px;
//     font-weight: bold;
//     color: #7f8c8d;
//     text-decoration: underline;
//     margin-bottom: 5px;
//   }
//   .reports-nav .nav-group button {
//     display: block;
//     width: 100%;
//     padding: 8px 12px;
//     background: transparent;
//     border: none;
//     border-radius: 8px;
//     text-align: left;
//     cursor: pointer;
//     font-size: 13px;
//     color: #34495e;
//     transition: all 0.2s;
//   }
//   .reports-nav .nav-group button:hover {
//     background: #e9ecef;
//     color: #2c3e50;
//   }
//   .reports-nav .nav-group button.active {
//     background: #3498db;
//     color: white;
//   }

//   /* Content Area */
//   .reports-content {
//     flex: 1;
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//     min-height: 500px;
//   }

//   /* Stats Bar */
//   .reports-stats {
//     display: flex;
//     align-items: center;
//     gap: 20px;
//     padding: 10px 15px;
//     background: #f8f9fa;
//     border-radius: 8px;
//     border: 1px solid #e9ecef;
//   }
//   .reports-stats .stat-item {
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .reports-stats .spacer { flex: 1; }
//   .reports-stats .last-update {
//     font-size: 11px;
//     color: #7f8c8d;
//   }

//   /* Table */
//   .reports-table-wrapper {
//     overflow-x: auto;
//     max-height: 320px;
//     border: 1px solid #e9ecef;
//     border-radius: 8px;
//   }
//   .reports-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .reports-table th {
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
//   .reports-table td {
//     padding: 8px 15px;
//     border-bottom: 1px solid #f0f0f0;
//   }
//   .reports-table tr:hover td {
//     background: #f8f9fa;
//   }

//   /* Chart Container */
//   .reports-chart {
//     flex: 1;
//     padding: 15px;
//     border: 1px solid #e9ecef;
//     border-radius: 8px;
//     background: white;
//     min-height: 400px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }

//   /* Loading */
//   .reports-loading {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 40px;
//     color: #7f8c8d;
//   }

//   /* No Data */
//   .reports-empty {
//     text-align: center;
//     padding: 40px;
//     color: #7f8c8d;
//     font-size: 16px;
//   }

//   /* Pie Chart Styles */
//   .pie-chart-wrapper {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 20px;
//   }
//   .pie-chart-container {
//     width: 280px;
//     height: 280px;
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .pie-chart-center {
//     position: absolute;
//     background: white;
//     border-radius: 50%;
//     width: 100px;
//     height: 100px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//     font-size: 14px;
//     font-weight: bold;
//     color: #2c3e50;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//     z-index: 2;
//   }
//   .pie-legend {
//     display: flex;
//     flex-wrap: wrap;
//     gap: 15px;
//     margin-top: 20px;
//     justify-content: center;
//     max-width: 500px;
//   }
//   .pie-legend-item {
//     display: flex;
//     align-items: center;
//     gap: 6px;
//     font-size: 13px;
//     color: #34495e;
//   }
//   .pie-legend-color {
//     width: 16px;
//     height: 16px;
//     border-radius: 4px;
//   }

//   /* Bar Chart Styles */
//   .bar-chart-wrapper {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: flex-end;
//     padding: 20px;
//   }
//   .bar-chart-container {
//     display: flex;
//     align-items: flex-end;
//     justify-content: space-around;
//     width: 90%;
//     height: 250px;
//     padding: 0 10px;
//     gap: 15px;
//     border-bottom: 2px solid #e9ecef;
//     border-left: 2px solid #e9ecef;
//     position: relative;
//   }
//   .bar-wrapper {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     flex: 1;
//     height: 100%;
//     justify-content: flex-end;
//     position: relative;
//   }
//   .bar {
//     width: 40px;
//     border-radius: 4px 4px 0 0;
//     transition: height 0.5s ease;
//     position: relative;
//     min-height: 4px;
//   }
//   .bar-value {
//     position: absolute;
//     top: -25px;
//     left: 50%;
//     transform: translateX(-50%);
//     font-size: 12px;
//     font-weight: bold;
//     color: #2c3e50;
//   }
//   .bar-label {
//     margin-top: 8px;
//     font-size: 11px;
//     color: #34495e;
//     text-align: center;
//     max-width: 60px;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     white-space: nowrap;
//   }
//   .bar-tooltip {
//     position: absolute;
//     top: -30px;
//     left: 50%;
//     transform: translateX(-50%);
//     background: rgba(0,0,0,0.8);
//     color: white;
//     padding: 2px 8px;
//     border-radius: 4px;
//     font-size: 11px;
//     opacity: 0;
//     transition: opacity 0.2s;
//     white-space: nowrap;
//     pointer-events: none;
//   }
//   .bar-wrapper:hover .bar-tooltip {
//     opacity: 1;
//   }
// `;

// // ---------- Color Palette ----------
// const CHART_COLORS = [
//   '#4CAF50', '#2196F3', '#FF9800', '#E91E63',
//   '#9C27B0', '#00BCD4', '#FF5722', '#8BC34A',
//   '#3F51B5', '#FFC107', '#795548', '#607D8B'
// ];

// // ---------- Main Component ----------
// const ReportsScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const getTranslations = (language) => {
//     const translations = {
//       en: {
//         title: { reports: 'Reports' },
//         header: { title: '📊 Reports Dashboard' },
//         nav: {
//           reports: 'Reports',
//           group: {
//             appointments: 'Appointments',
//             walkins: 'Walk-ins',
//             patients: 'Patients',
//             doctors: 'Doctors'
//           },
//           appointmentsPerDoctor: 'Appointments per Doctor',
//           appointmentsByStatus: 'Appointments by Status',
//           walkinsPerDoctor: 'Walk-ins per Doctor',
//           patientsByGender: 'Patients by Gender',
//           patientsByCity: 'Patients by City',
//           doctorsBySpecialty: 'Doctors by Specialty'
//         },
//         btn: {
//           refresh: 'Refresh',
//           export: 'Export',
//           print: 'Print',
//           close: 'Close'
//         },
//         status: {
//           ready: 'Ready',
//           loading: 'Loading...',
//           loaded: 'Loaded',
//           records: 'records',
//           in: 'in',
//           error: 'Error loading data',
//           exported: 'Exported successfully',
//           exportError: 'Export failed',
//           printed: 'Printed successfully'
//         },
//         stats: {
//           totalRecords: 'Total Records',
//           uniqueValues: 'Unique Values',
//           lastUpdate: 'Last Update'
//         },
//         chart: {
//           title: 'Chart',
//           category: 'Category',
//           value: 'Value'
//         },
//         col: {
//           doctor: 'Doctor',
//           totalAppointments: 'Total Appointments',
//           status: 'Status',
//           count: 'Count',
//           walkins: 'Walk-ins',
//           gender: 'Gender',
//           city: 'City',
//           patientCount: 'Patient Count',
//           specialty: 'Specialty',
//           doctorCount: 'Doctor Count'
//         },
//         message: {
//           noData: 'No data available'
//         },
//         error: {
//           title: 'Error',
//           load: 'Failed to load data',
//           endpoint: 'Endpoint',
//           tryAgain: 'Please try again'
//         },
//         alert: {
//           noData: 'No data to export',
//           exportSuccess: 'Data exported successfully',
//           exportError: 'Failed to export data'
//         }
//       },
//       ar: {
//         title: { reports: 'التقارير' },
//         header: { title: '📊 لوحة التقارير' },
//         nav: {
//           reports: 'التقارير',
//           group: {
//             appointments: 'المواعيد',
//             walkins: 'الزيارات المباشرة',
//             patients: 'المرضى',
//             doctors: 'الأطباء'
//           },
//           appointmentsPerDoctor: 'المواعيد لكل طبيب',
//           appointmentsByStatus: 'المواعيد حسب الحالة',
//           walkinsPerDoctor: 'الزيارات المباشرة لكل طبيب',
//           patientsByGender: 'المرضى حسب الجنس',
//           patientsByCity: 'المرضى حسب المدينة',
//           doctorsBySpecialty: 'الأطباء حسب التخصص'
//         },
//         btn: {
//           refresh: 'تحديث',
//           export: 'تصدير',
//           print: 'طباعة',
//           close: 'إغلاق'
//         },
//         status: {
//           ready: 'جاهز',
//           loading: 'جاري التحميل...',
//           loaded: 'تم التحميل',
//           records: 'سجلات',
//           in: 'في',
//           error: 'خطأ في تحميل البيانات',
//           exported: 'تم التصدير بنجاح',
//           exportError: 'فشل التصدير',
//           printed: 'تمت الطباعة بنجاح'
//         },
//         stats: {
//           totalRecords: 'إجمالي السجلات',
//           uniqueValues: 'القيم الفريدة',
//           lastUpdate: 'آخر تحديث'
//         },
//         chart: {
//           title: 'الرسم البياني',
//           category: 'الفئة',
//           value: 'القيمة'
//         },
//         col: {
//           doctor: 'الطبيب',
//           totalAppointments: 'إجمالي المواعيد',
//           status: 'الحالة',
//           count: 'العدد',
//           walkins: 'الزيارات المباشرة',
//           gender: 'الجنس',
//           city: 'المدينة',
//           patientCount: 'عدد المرضى',
//           specialty: 'التخصص',
//           doctorCount: 'عدد الأطباء'
//         },
//         message: {
//           noData: 'لا توجد بيانات'
//         },
//         error: {
//           title: 'خطأ',
//           load: 'فشل في تحميل البيانات',
//           endpoint: 'نقطة النهاية',
//           tryAgain: 'يرجى المحاولة مرة أخرى'
//         },
//         alert: {
//           noData: 'لا توجد بيانات للتصدير',
//           exportSuccess: 'تم تصدير البيانات بنجاح',
//           exportError: 'فشل في تصدير البيانات'
//         }
//       }
//     };
    
//     return translations[language] || translations.en;
//   };

//   const [t, setTranslations] = useState(getTranslations(lang));

//   // Update translations when language changes
//   useEffect(() => {
//     setTranslations(getTranslations(lang));
//   }, [lang]);

//   // ---------- State ----------
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [stats, setStats] = useState({ total: 0, unique: 0 });
//   const [currentEndpoint, setCurrentEndpoint] = useState('/appointments/per-doctor');
//   const [currentChartType, setCurrentChartType] = useState('bar');
//   const [currentColumnNames, setCurrentColumnNames] = useState([t.col.doctor, t.col.totalAppointments]);
//   const [activeButton, setActiveButton] = useState('appointmentsPerDoctor');
//   const [lastUpdate, setLastUpdate] = useState(new Date());

//   // Update column names when language changes
//   useEffect(() => {
//     if (activeButton === 'appointmentsPerDoctor') {
//       setCurrentColumnNames([t.col.doctor, t.col.totalAppointments]);
//     } else if (activeButton === 'appointmentsByStatus') {
//       setCurrentColumnNames([t.col.status, t.col.count]);
//     } else if (activeButton === 'walkinsPerDoctor') {
//       setCurrentColumnNames([t.col.doctor, t.col.walkins]);
//     } else if (activeButton === 'patientsByGender') {
//       setCurrentColumnNames([t.col.gender, t.col.count]);
//     } else if (activeButton === 'patientsByCity') {
//       setCurrentColumnNames([t.col.city, t.col.patientCount]);
//     } else if (activeButton === 'doctorsBySpecialty') {
//       setCurrentColumnNames([t.col.specialty, t.col.doctorCount]);
//     }
//   }, [lang, t, activeButton]);

//   // ---------- Helper Functions ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text: `● ${text}`, type });
//   }, []);

//   const formatNumber = (value) => {
//     if (typeof value === 'number') {
//       if (value % 1 === 0) {
//         return String(value);
//       } else {
//         return value.toFixed(2);
//       }
//     }
//     return String(value);
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'loading': return 'loading';
//       case 'error': return 'error';
//       default: return '';
//     }
//   };

//   // ---------- Normalize Data ----------
//   const normalizeReportData = (data) => {
//     if (!data || !Array.isArray(data)) return [];
    
//     // If data is an array of objects instead of arrays
//     if (data.length > 0 && typeof data[0] === 'object' && !Array.isArray(data[0])) {
//       // Convert object to array format
//       return data.map(item => {
//         const keys = Object.keys(item);
//         return [item[keys[0]], item[keys[1]]];
//       });
//     }
    
//     return data;
//   };

//   // ---------- API Call ----------
//   const loadReport = useCallback(async (endpoint, chartType, columnNames, reportId) => {
//     setLoading(true);
//     setCurrentEndpoint(endpoint);
//     setCurrentChartType(chartType);
//     setCurrentColumnNames(columnNames);
//     if (reportId) setActiveButton(reportId);
    
//     setStatus(t.status.loading, 'loading');

//     try {
//       const startTime = performance.now();
//       const url = `${BASE_URL}/api/reports${endpoint}`;
//       //console.log('📤 Fetching report:', url);
      
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
//       const rawText = await response.text();
//       //console.log('📄 Raw response:', rawText);
      
//       const jsonData = JSON.parse(rawText);
//       const elapsed = Math.round(performance.now() - startTime);

//       // Normalize the data
//       const normalizedData = normalizeReportData(jsonData);
//       setData(normalizedData);
      
//       // Update stats
//       const total = normalizedData.length;
//       const unique = new Set();
//       normalizedData.forEach(row => {
//         if (row && row.length > 0) {
//           unique.add(String(row[0]));
//         }
//       });
//       setStats({ total, unique: unique.size });
      
//       setStatus(`${t.status.loaded} (${total} ${t.status.records}) ${t.status.in} ${elapsed}ms`, 'success');
//       setLastUpdate(new Date());
      
//     } catch (err) {
//       //console.error('🚨 Load error:', err);
//       setStatus(t.status.error, 'error');
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [t]);

//   // ---------- Handlers ----------
//   const refreshCurrentReport = useCallback(() => {
//     if (currentEndpoint) {
//       loadReport(currentEndpoint, currentChartType, currentColumnNames, activeButton);
//     }
//   }, [currentEndpoint, currentChartType, currentColumnNames, activeButton, loadReport]);

//   const exportData = useCallback(() => {
//     if (data.length === 0) {
//       alert(t.alert.noData);
//       return;
//     }

//     // Create CSV
//     const headers = currentColumnNames.join(',');
//     const rows = data.map(row => {
//       return row.map(value => {
//         const str = String(value);
//         if (str.includes(',') || str.includes('"') || str.includes('\n')) {
//           return `"${str.replace(/"/g, '""')}"`;
//         }
//         return str;
//       }).join(',');
//     }).join('\n');

//     const csv = `${headers}\n${rows}`;
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);

//     setStatus(t.status.exported, 'success');
//   }, [data, currentColumnNames, t]);

//   const printReport = useCallback(() => {
//     if (data.length === 0) {
//       alert(t.alert.noData);
//       return;
//     }

//     // Create a printable version
//     const printWindow = window.open('', '_blank');
//     const tableRows = data.map(row => {
//       return `<tr>${row.map(value => `<td>${value}</td>`).join('')}</tr>`;
//     }).join('');

//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>${t.header.title}</title>
//           <style>
//             body { font-family: Arial, sans-serif; padding: 20px; }
//             h2 { color: #2c3e50; }
//             table { width: 100%; border-collapse: collapse; margin-top: 20px; }
//             th { background: #f8f9fa; padding: 10px; text-align: left; border: 1px solid #ddd; }
//             td { padding: 8px 10px; border: 1px solid #ddd; }
//             .footer { margin-top: 20px; font-size: 12px; color: #7f8c8d; }
//           </style>
//         </head>
//         <body>
//           <h2>${t.header.title}</h2>
//           <p>${t.stats.lastUpdate}: ${new Date().toLocaleString()}</p>
//           <table>
//             <thead>
//               <tr>${currentColumnNames.map(col => `<th>${col}</th>`).join('')}</tr>
//             </thead>
//             <tbody>${tableRows}</tbody>
//           </table>
//           <div class="footer">${t.stats.totalRecords}: ${data.length}</div>
//         </body>
//       </html>
//     `);
    
//     printWindow.document.close();
//     printWindow.print();

//     setStatus(t.status.printed, 'success');
//   }, [data, currentColumnNames, t]);

//   // ---------- Chart Components ----------
//   const renderPieChart = (data) => {
//     if (!data || data.length === 0) {
//       return <div className="reports-empty">{t.message.noData}</div>;
//     }

//     const total = data.reduce((sum, row) => sum + parseFloat(row[1] || 0), 0);
    
//     if (total === 0) {
//       return <div className="reports-empty">{t.message.noData}</div>;
//     }

//     // Calculate percentages and build the conic gradient
//     let currentPercentage = 0;
//     const gradientParts = data.map((row, index) => {
//       const value = parseFloat(row[1] || 0);
//       const percentage = (value / total) * 100;
//       const start = currentPercentage;
//       const end = currentPercentage + percentage;
//       currentPercentage = end;
//       const color = CHART_COLORS[index % CHART_COLORS.length];
//       return `${color} ${start}% ${end}%`;
//     });

//     return (
//       <div className="pie-chart-wrapper">
//         <div className="pie-chart-container">
//           <div style={{
//             width: '100%',
//             height: '100%',
//             borderRadius: '50%',
//             background: `conic-gradient(${gradientParts.join(', ')})`,
//             position: 'absolute',
//             top: 0,
//             left: 0
//           }} />
//           <div className="pie-chart-center">
//             <span>{t.stats.totalRecords}</span>
//             <span style={{ fontSize: '18px', color: '#3498db' }}>{total}</span>
//           </div>
//         </div>

//         <div className="pie-legend">
//           {data.map((row, index) => {
//             const value = parseFloat(row[1] || 0);
//             const percentage = total > 0 ? (value / total) * 100 : 0;
//             const color = CHART_COLORS[index % CHART_COLORS.length];
//             return (
//               <div key={index} className="pie-legend-item">
//                 <div className="pie-legend-color" style={{ backgroundColor: color }} />
//                 <span>{row[0]}: {value} ({percentage.toFixed(1)}%)</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const renderBarChart = (data) => {
//     if (!data || data.length === 0) {
//       return <div className="reports-empty">{t.message.noData}</div>;
//     }

//     const values = data.map(row => parseFloat(row[1] || 0));
//     const maxValue = Math.max(...values, 1);
//     const chartHeight = 250;

//     return (
//       <div className="bar-chart-wrapper">
//         <div className="bar-chart-container">
//           {data.map((row, index) => {
//             const value = parseFloat(row[1] || 0);
//             const height = Math.max((value / maxValue) * chartHeight, 10);
//             const color = CHART_COLORS[index % CHART_COLORS.length];

//             return (
//               <div key={index} className="bar-wrapper">
//                 <div className="bar" style={{
//                   height: `${height}px`,
//                   backgroundColor: color
//                 }}>
//                   <div className="bar-tooltip">{row[0]}: {value}</div>
//                 </div>
//                 <div className="bar-value">{value}</div>
//                 <div className="bar-label">{row[0]}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   // ---------- Table Render ----------
//   const renderTable = () => {
//     if (data.length === 0) {
//       return <div className="reports-empty">{t.message.noData}</div>;
//     }

//     return (
//       <div className="reports-table-wrapper">
//         <table className="reports-table">
//           <thead>
//             <tr>
//               {currentColumnNames.map((col, index) => (
//                 <th key={index}>{col}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {row.map((value, colIndex) => (
//                   <td key={colIndex}>{formatNumber(value)}</td>
//                 ))}
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
//       <div className="reports-container">
//         {/* Header */}
//         <div className="reports-header">
//           <div className="title">{t.header.title}</div>
//           <div className="actions">
//             <button 
//               className="refresh" 
//               onClick={refreshCurrentReport}
//               disabled={loading}
//             >
//               🔄 {t.btn.refresh}
//             </button>
//             <button 
//               className="export" 
//               onClick={exportData}
//               disabled={loading || data.length === 0}
//             >
//               📊 {t.btn.export}
//             </button>
//             <button 
//               className="print" 
//               onClick={printReport}
//               disabled={loading || data.length === 0}
//             >
//               🖨️ {t.btn.print}
//             </button>
//             <span className={`status ${getStatusClass(statusMessage.type)}`}>
//               {statusMessage.text}
//             </span>
//           </div>
//         </div>

//         <div className="reports-layout">
//           {/* Sidebar Navigation */}
//           <div className="reports-nav">
//             <div className="nav-title">📋 {t.nav.reports}</div>

//             {/* Appointments Group */}
//             <div className="nav-group">
//               <div className="group-title">{t.nav.group.appointments}</div>
//               <button
//                 className={activeButton === 'appointmentsPerDoctor' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/appointments/per-doctor',
//                   'bar',
//                   [t.col.doctor, t.col.totalAppointments],
//                   'appointmentsPerDoctor'
//                 )}
//               >
//                 {t.nav.appointmentsPerDoctor}
//               </button>
//               <button
//                 className={activeButton === 'appointmentsByStatus' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/appointments/by-status',
//                   'pie',
//                   [t.col.status, t.col.count],
//                   'appointmentsByStatus'
//                 )}
//               >
//                 {t.nav.appointmentsByStatus}
//               </button>
//             </div>

//             {/* Walk-ins Group */}
//             <div className="nav-group">
//               <div className="group-title">{t.nav.group.walkins}</div>
//               <button
//                 className={activeButton === 'walkinsPerDoctor' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/walkins/per-doctor',
//                   'bar',
//                   [t.col.doctor, t.col.walkins],
//                   'walkinsPerDoctor'
//                 )}
//               >
//                 {t.nav.walkinsPerDoctor}
//               </button>
//             </div>

//             {/* Patients Group */}
//             <div className="nav-group">
//               <div className="group-title">{t.nav.group.patients}</div>
//               <button
//                 className={activeButton === 'patientsByGender' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/patients/by-gender',
//                   'pie',
//                   [t.col.gender, t.col.count],
//                   'patientsByGender'
//                 )}
//               >
//                 {t.nav.patientsByGender}
//               </button>
//               <button
//                 className={activeButton === 'patientsByCity' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/patients/by-city',
//                   'bar',
//                   [t.col.city, t.col.patientCount],
//                   'patientsByCity'
//                 )}
//               >
//                 {t.nav.patientsByCity}
//               </button>
//             </div>

//             {/* Doctors Group */}
//             <div className="nav-group">
//               <div className="group-title">{t.nav.group.doctors}</div>
//               <button
//                 className={activeButton === 'doctorsBySpecialty' ? 'active' : ''}
//                 onClick={() => loadReport(
//                   '/doctors/by-specialty',
//                   'bar',
//                   [t.col.specialty, t.col.doctorCount],
//                   'doctorsBySpecialty'
//                 )}
//               >
//                 {t.nav.doctorsBySpecialty}
//               </button>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="reports-content">
//             {/* Stats Bar */}
//             <div className="reports-stats">
//               <span className="stat-item">
//                 {t.stats.totalRecords}: {stats.total}
//               </span>
//               <span className="stat-item">
//                 {t.stats.uniqueValues}: {stats.unique}
//               </span>
//               <span className="spacer"></span>
//               <span className="last-update">
//                 {t.stats.lastUpdate}: {lastUpdate.toLocaleString()}
//               </span>
//             </div>

//             {/* Loading State */}
//             {loading ? (
//               <div className="reports-loading">
//                 <span>⏳ {t.status.loading}</span>
//               </div>
//             ) : (
//               <>
//                 {/* Table */}
//                 {renderTable()}

//                 {/* Chart */}
//                 <div className="reports-chart">
//                   {data.length === 0 ? (
//                     <div className="reports-empty">{t.message.noData}</div>
//                   ) : currentChartType === 'pie' ? (
//                     renderPieChart(data)
//                   ) : (
//                     renderBarChart(data)
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReportsScreen; 12072026 4:00 pm

import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Color Palette ----------
const CHART_COLORS = [
  '#4CAF50', '#2196F3', '#FF9800', '#E91E63',
  '#9C27B0', '#00BCD4', '#FF5722', '#8BC34A',
  '#3F51B5', '#FFC107', '#795548', '#607D8B'
];

// ---------- Main Component ----------
const ReportsScreen = ({ loggedUser, lang = 'en', onClose }) => {
  // ---------- Translations ----------
  const getTranslations = (language) => {
    const translations = {
      en: {
        title: { reports: 'Reports' },
        header: { title: '📊 Reports Dashboard' },
        nav: {
          reports: 'Reports',
          group: {
            appointments: 'Appointments',
            walkins: 'Walk-ins',
            patients: 'Patients',
            doctors: 'Doctors'
          },
          appointmentsPerDoctor: 'Appointments per Doctor',
          appointmentsByStatus: 'Appointments by Status',
          walkinsPerDoctor: 'Walk-ins per Doctor',
          patientsByGender: 'Patients by Gender',
          patientsByCity: 'Patients by City',
          doctorsBySpecialty: 'Doctors by Specialty'
        },
        btn: {
          refresh: 'Refresh',
          export: 'Export',
          print: 'Print',
          close: 'Close'
        },
        status: {
          ready: 'Ready',
          loading: 'Loading...',
          loaded: 'Loaded',
          records: 'records',
          in: 'in',
          error: 'Error loading data',
          exported: 'Exported successfully',
          exportError: 'Export failed',
          printed: 'Printed successfully'
        },
        stats: {
          totalRecords: 'Total Records',
          uniqueValues: 'Unique Values',
          lastUpdate: 'Last Update'
        },
        chart: {
          title: 'Chart',
          category: 'Category',
          value: 'Value'
        },
        col: {
          doctor: 'Doctor',
          totalAppointments: 'Total Appointments',
          status: 'Status',
          count: 'Count',
          walkins: 'Walk-ins',
          gender: 'Gender',
          city: 'City',
          patientCount: 'Patient Count',
          specialty: 'Specialty',
          doctorCount: 'Doctor Count'
        },
        message: {
          noData: 'No data available'
        },
        error: {
          title: 'Error',
          load: 'Failed to load data',
          endpoint: 'Endpoint',
          tryAgain: 'Please try again'
        },
        alert: {
          noData: 'No data to export',
          exportSuccess: 'Data exported successfully',
          exportError: 'Failed to export data'
        }
      },
      ar: {
        title: { reports: 'التقارير' },
        header: { title: '📊 لوحة التقارير' },
        nav: {
          reports: 'التقارير',
          group: {
            appointments: 'المواعيد',
            walkins: 'الزيارات المباشرة',
            patients: 'المرضى',
            doctors: 'الأطباء'
          },
          appointmentsPerDoctor: 'المواعيد لكل طبيب',
          appointmentsByStatus: 'المواعيد حسب الحالة',
          walkinsPerDoctor: 'الزيارات المباشرة لكل طبيب',
          patientsByGender: 'المرضى حسب الجنس',
          patientsByCity: 'المرضى حسب المدينة',
          doctorsBySpecialty: 'الأطباء حسب التخصص'
        },
        btn: {
          refresh: 'تحديث',
          export: 'تصدير',
          print: 'طباعة',
          close: 'إغلاق'
        },
        status: {
          ready: 'جاهز',
          loading: 'جاري التحميل...',
          loaded: 'تم التحميل',
          records: 'سجلات',
          in: 'في',
          error: 'خطأ في تحميل البيانات',
          exported: 'تم التصدير بنجاح',
          exportError: 'فشل التصدير',
          printed: 'تمت الطباعة بنجاح'
        },
        stats: {
          totalRecords: 'إجمالي السجلات',
          uniqueValues: 'القيم الفريدة',
          lastUpdate: 'آخر تحديث'
        },
        chart: {
          title: 'الرسم البياني',
          category: 'الفئة',
          value: 'القيمة'
        },
        col: {
          doctor: 'الطبيب',
          totalAppointments: 'إجمالي المواعيد',
          status: 'الحالة',
          count: 'العدد',
          walkins: 'الزيارات المباشرة',
          gender: 'الجنس',
          city: 'المدينة',
          patientCount: 'عدد المرضى',
          specialty: 'التخصص',
          doctorCount: 'عدد الأطباء'
        },
        message: {
          noData: 'لا توجد بيانات'
        },
        error: {
          title: 'خطأ',
          load: 'فشل في تحميل البيانات',
          endpoint: 'نقطة النهاية',
          tryAgain: 'يرجى المحاولة مرة أخرى'
        },
        alert: {
          noData: 'لا توجد بيانات للتصدير',
          exportSuccess: 'تم تصدير البيانات بنجاح',
          exportError: 'فشل في تصدير البيانات'
        }
      }
    };
    
    return translations[language] || translations.en;
  };

  const [t, setTranslations] = useState(getTranslations(lang));

  useEffect(() => {
    setTranslations(getTranslations(lang));
  }, [lang]);

  // ---------- State ----------
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
  const [stats, setStats] = useState({ total: 0, unique: 0 });
  const [currentEndpoint, setCurrentEndpoint] = useState('/appointments/per-doctor');
  const [currentChartType, setCurrentChartType] = useState('bar');
  const [currentColumnNames, setCurrentColumnNames] = useState([t.col.doctor, t.col.totalAppointments]);
  const [activeButton, setActiveButton] = useState('appointmentsPerDoctor');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (activeButton === 'appointmentsPerDoctor') {
      setCurrentColumnNames([t.col.doctor, t.col.totalAppointments]);
    } else if (activeButton === 'appointmentsByStatus') {
      setCurrentColumnNames([t.col.status, t.col.count]);
    } else if (activeButton === 'walkinsPerDoctor') {
      setCurrentColumnNames([t.col.doctor, t.col.walkins]);
    } else if (activeButton === 'patientsByGender') {
      setCurrentColumnNames([t.col.gender, t.col.count]);
    } else if (activeButton === 'patientsByCity') {
      setCurrentColumnNames([t.col.city, t.col.patientCount]);
    } else if (activeButton === 'doctorsBySpecialty') {
      setCurrentColumnNames([t.col.specialty, t.col.doctorCount]);
    }
  }, [lang, t, activeButton]);

  // ---------- Helper Functions ----------
  const setStatus = useCallback((text, type = 'success') => {
    setStatusMessage({ text: `● ${text}`, type });
  }, []);

  const formatNumber = (value) => {
    if (typeof value === 'number') {
      if (value % 1 === 0) {
        return String(value);
      } else {
        return value.toFixed(2);
      }
    }
    return String(value);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'loading': return 'loading';
      case 'error': return 'error';
      default: return '';
    }
  };

  const normalizeReportData = (data) => {
    if (!data || !Array.isArray(data)) return [];
    
    if (data.length > 0 && typeof data[0] === 'object' && !Array.isArray(data[0])) {
      return data.map(item => {
        const keys = Object.keys(item);
        return [item[keys[0]], item[keys[1]]];
      });
    }
    
    return data;
  };

  // ---------- API Call ----------
  const loadReport = useCallback(async (endpoint, chartType, columnNames, reportId) => {
    setLoading(true);
    setCurrentEndpoint(endpoint);
    setCurrentChartType(chartType);
    setCurrentColumnNames(columnNames);
    if (reportId) setActiveButton(reportId);
    
    setStatus(t.status.loading, 'loading');

    try {
      const startTime = performance.now();
      const url = `${BASE_URL}/api/reports${endpoint}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const rawText = await response.text();
      const jsonData = JSON.parse(rawText);
      const elapsed = Math.round(performance.now() - startTime);

      const normalizedData = normalizeReportData(jsonData);
      setData(normalizedData);
      
      const total = normalizedData.length;
      const unique = new Set();
      normalizedData.forEach(row => {
        if (row && row.length > 0) {
          unique.add(String(row[0]));
        }
      });
      setStats({ total, unique: unique.size });
      
      setStatus(`${t.status.loaded} (${total} ${t.status.records}) ${t.status.in} ${elapsed}ms`, 'success');
      setLastUpdate(new Date());
      
    } catch (err) {
      setStatus(t.status.error, 'error');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [t]);

  // ---------- Handlers ----------
  const refreshCurrentReport = useCallback(() => {
    if (currentEndpoint) {
      loadReport(currentEndpoint, currentChartType, currentColumnNames, activeButton);
    }
  }, [currentEndpoint, currentChartType, currentColumnNames, activeButton, loadReport]);

  const exportData = useCallback(() => {
    if (data.length === 0) {
      alert(t.alert.noData);
      return;
    }

    const headers = currentColumnNames.join(',');
    const rows = data.map(row => {
      return row.map(value => {
        const str = String(value);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      }).join(',');
    }).join('\n');

    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    setStatus(t.status.exported, 'success');
  }, [data, currentColumnNames, t]);

  const printReport = useCallback(() => {
    if (data.length === 0) {
      alert(t.alert.noData);
      return;
    }

    const printWindow = window.open('', '_blank');
    const tableRows = data.map(row => {
      return `<tr>${row.map(value => `<td>${value}</td>`).join('')}</tr>`;
    }).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>${t.header.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #2c3e50; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background: #f8f9fa; padding: 10px; text-align: left; border: 1px solid #ddd; }
            td { padding: 8px 10px; border: 1px solid #ddd; }
            .footer { margin-top: 20px; font-size: 12px; color: #7f8c8d; }
          </style>
        </head>
        <body>
          <h2>${t.header.title}</h2>
          <p>${t.stats.lastUpdate}: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>${currentColumnNames.map(col => `<th>${col}</th>`).join('')}</tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
          <div class="footer">${t.stats.totalRecords}: ${data.length}</div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();

    setStatus(t.status.printed, 'success');
  }, [data, currentColumnNames, t]);

  // ---------- Chart Components ----------
  const renderPieChart = (data) => {
    if (!data || data.length === 0) {
      return <div className="reports-empty">{t.message.noData}</div>;
    }

    const total = data.reduce((sum, row) => sum + parseFloat(row[1] || 0), 0);
    
    if (total === 0) {
      return <div className="reports-empty">{t.message.noData}</div>;
    }

    let currentPercentage = 0;
    const gradientParts = data.map((row, index) => {
      const value = parseFloat(row[1] || 0);
      const percentage = (value / total) * 100;
      const start = currentPercentage;
      const end = currentPercentage + percentage;
      currentPercentage = end;
      const color = CHART_COLORS[index % CHART_COLORS.length];
      return `${color} ${start}% ${end}%`;
    });

    return (
      <div className="pie-chart-wrapper">
        <div className="pie-chart-container">
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: `conic-gradient(${gradientParts.join(', ')})`,
            position: 'absolute',
            top: 0,
            left: 0
          }} />
          <div className="pie-chart-center">
            <span>{t.stats.totalRecords}</span>
            <span style={{ fontSize: '18px', color: '#3498db' }}>{total}</span>
          </div>
        </div>

        <div className="pie-legend">
          {data.map((row, index) => {
            const value = parseFloat(row[1] || 0);
            const percentage = total > 0 ? (value / total) * 100 : 0;
            const color = CHART_COLORS[index % CHART_COLORS.length];
            return (
              <div key={index} className="pie-legend-item">
                <div className="pie-legend-color" style={{ backgroundColor: color }} />
                <span>{row[0]}: {value} ({percentage.toFixed(1)}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderBarChart = (data) => {
    if (!data || data.length === 0) {
      return <div className="reports-empty">{t.message.noData}</div>;
    }

    const values = data.map(row => parseFloat(row[1] || 0));
    const maxValue = Math.max(...values, 1);
    const chartHeight = 250;

    return (
      <div className="bar-chart-wrapper">
        <div className="bar-chart-container">
          {data.map((row, index) => {
            const value = parseFloat(row[1] || 0);
            const height = Math.max((value / maxValue) * chartHeight, 10);
            const color = CHART_COLORS[index % CHART_COLORS.length];

            return (
              <div key={index} className="bar-wrapper">
                <div className="bar" style={{
                  height: `${height}px`,
                  backgroundColor: color
                }}>
                  <div className="bar-tooltip">{row[0]}: {value}</div>
                </div>
                <div className="bar-value">{value}</div>
                <div className="bar-label">{row[0]}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ---------- Table Render ----------
  const renderTable = () => {
    if (data.length === 0) {
      return <div className="reports-empty">{t.message.noData}</div>;
    }

    return (
      <div className="reports-table-wrapper">
        <table className="reports-table">
          <thead>
            <tr>
              {currentColumnNames.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <td key={colIndex}>{formatNumber(value)}</td>
                ))}
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
      <style>{`
        /* ==================== REPORTS STYLES ==================== */
        .reports-container {
          padding: 20px;
          background: #f0f4f8;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Header */
        .reports-header {
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

        .reports-header .title {
          font-size: 24px;
          font-weight: bold;
          color: #2c3e50;
        }

        .reports-header .actions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .reports-header .actions button {
          padding: 8px 18px;
          border: none;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
          color: white;
          min-height: 38px;
        }

        .reports-header .actions button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .reports-header .actions button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .reports-header .actions button.refresh { background: #3498db; }
        .reports-header .actions button.refresh:hover:not(:disabled) { background: #2980b9; }
        .reports-header .actions button.export { background: #2ecc71; }
        .reports-header .actions button.export:hover:not(:disabled) { background: #27ae60; }
        .reports-header .actions button.print { background: #e67e22; }
        .reports-header .actions button.print:hover:not(:disabled) { background: #d35400; }

        .reports-header .status {
          font-size: 12px;
          color: #27ae60;
        }

        .reports-header .status.error { color: #e74c3c; }
        .reports-header .status.loading { color: #f39c12; }

        /* Layout */
        .reports-layout {
          display: flex;
          gap: 20px;
          flex: 1;
        }

        /* Sidebar Navigation */
        .reports-nav {
          width: 250px;
          min-width: 250px;
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          max-height: 600px;
          overflow-y: auto;
        }

        .reports-nav .nav-title {
          font-size: 16px;
          font-weight: bold;
          color: #2c3e50;
          padding-bottom: 15px;
          border-bottom: 1px solid #e9ecef;
          margin-bottom: 15px;
        }

        .reports-nav .nav-group {
          margin-bottom: 15px;
        }

        .reports-nav .nav-group .group-title {
          font-size: 12px;
          font-weight: bold;
          color: #7f8c8d;
          text-decoration: underline;
          margin-bottom: 5px;
        }

        .reports-nav .nav-group button {
          display: block;
          width: 100%;
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-radius: 8px;
          text-align: left;
          cursor: pointer;
          font-size: 13px;
          color: #34495e;
          transition: all 0.2s;
          min-height: 36px;
        }

        .reports-nav .nav-group button:hover {
          background: #e9ecef;
          color: #2c3e50;
        }

        .reports-nav .nav-group button.active {
          background: #3498db;
          color: white;
        }

        /* Content Area */
        .reports-content {
          flex: 1;
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 15px;
          min-height: 500px;
        }

        /* Stats Bar */
        .reports-stats {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 10px 15px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
          flex-wrap: wrap;
        }

        .reports-stats .stat-item {
          font-weight: bold;
          color: #2c3e50;
          font-size: 13px;
        }

        .reports-stats .spacer { flex: 1; }
        .reports-stats .last-update {
          font-size: 11px;
          color: #7f8c8d;
        }

        /* Table */
        .reports-table-wrapper {
          overflow-x: auto;
          max-height: 320px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          -webkit-overflow-scrolling: touch;
        }

        .reports-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 300px;
        }

        .reports-table th {
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

        .reports-table td {
          padding: 8px 15px;
          border-bottom: 1px solid #f0f0f0;
        }

        .reports-table tr:hover td {
          background: #f8f9fa;
        }

        /* Chart Container */
        .reports-chart {
          flex: 1;
          padding: 15px;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          background: white;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: auto;
        }

        /* Loading */
        .reports-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #7f8c8d;
          flex: 1;
        }

        /* No Data */
        .reports-empty {
          text-align: center;
          padding: 40px;
          color: #7f8c8d;
          font-size: 16px;
        }

        /* Pie Chart Styles */
        .pie-chart-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .pie-chart-container {
          width: 280px;
          height: 280px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pie-chart-center {
          position: absolute;
          background: white;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-size: 14px;
          font-weight: bold;
          color: #2c3e50;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          z-index: 2;
        }

        .pie-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          margin-top: 20px;
          justify-content: center;
          max-width: 500px;
        }

        .pie-legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #34495e;
        }

        .pie-legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        /* Bar Chart Styles */
        .bar-chart-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 20px;
          overflow: auto;
        }

        .bar-chart-container {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          width: 90%;
          height: 250px;
          padding: 0 10px;
          gap: 15px;
          border-bottom: 2px solid #e9ecef;
          border-left: 2px solid #e9ecef;
          position: relative;
        }

        .bar-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          height: 100%;
          justify-content: flex-end;
          position: relative;
        }

        .bar {
          width: 40px;
          border-radius: 4px 4px 0 0;
          transition: height 0.5s ease;
          position: relative;
          min-height: 4px;
        }

        .bar-value {
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          font-weight: bold;
          color: #2c3e50;
        }

        .bar-label {
          margin-top: 8px;
          font-size: 11px;
          color: #34495e;
          text-align: center;
          max-width: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .bar-tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          opacity: 0;
          transition: opacity 0.2s;
          white-space: nowrap;
          pointer-events: none;
        }

        .bar-wrapper:hover .bar-tooltip {
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .reports-container {
            padding: 12px;
          }

          .reports-header {
            flex-direction: column;
            align-items: stretch;
            padding: 12px 16px;
          }

          .reports-header .title {
            font-size: 20px;
          }

          .reports-header .actions {
            justify-content: center;
          }

          .reports-header .actions button {
            font-size: 12px;
            padding: 6px 14px;
            min-height: 34px;
          }

          .reports-layout {
            flex-direction: column;
          }

          .reports-nav {
            width: 100%;
            min-width: unset;
            max-height: 250px;
            padding: 12px;
          }

          .reports-nav .nav-group button {
            padding: 6px 10px;
            font-size: 12px;
            min-height: 32px;
          }

          .reports-content {
            padding: 12px;
            min-height: 400px;
          }

          .reports-stats {
            gap: 10px;
            padding: 8px 12px;
          }

          .reports-stats .stat-item {
            font-size: 12px;
          }

          .reports-table {
            font-size: 12px;
          }

          .reports-table th,
          .reports-table td {
            padding: 6px 10px;
          }

          .reports-chart {
            min-height: 300px;
            padding: 10px;
          }

          .pie-chart-container {
            width: 200px;
            height: 200px;
          }

          .pie-chart-center {
            width: 70px;
            height: 70px;
            font-size: 11px;
          }

          .pie-chart-center span:last-child {
            font-size: 14px !important;
          }

          .pie-legend {
            gap: 8px;
          }

          .pie-legend-item {
            font-size: 11px;
          }

          .bar-chart-container {
            height: 200px;
            width: 100%;
            gap: 8px;
          }

          .bar {
            width: 30px;
          }

          .bar-value {
            font-size: 10px;
            top: -20px;
          }

          .bar-label {
            font-size: 9px;
            max-width: 40px;
          }

          .bar-tooltip {
            font-size: 9px;
            top: -25px;
          }
        }

        @media (max-width: 480px) {
          .reports-container {
            padding: 8px;
          }

          .reports-header {
            padding: 10px 12px;
          }

          .reports-header .title {
            font-size: 17px;
          }

          .reports-header .actions button {
            font-size: 11px;
            padding: 4px 10px;
            min-height: 30px;
          }

          .reports-nav {
            max-height: 200px;
            padding: 10px;
          }

          .reports-nav .nav-title {
            font-size: 14px;
            padding-bottom: 10px;
          }

          .reports-nav .nav-group .group-title {
            font-size: 11px;
          }

          .reports-nav .nav-group button {
            font-size: 11px;
            padding: 5px 8px;
            min-height: 28px;
          }

          .reports-content {
            padding: 8px;
            min-height: 300px;
          }

          .reports-stats {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .reports-stats .stat-item {
            font-size: 11px;
          }

          .reports-stats .last-update {
            font-size: 10px;
          }

          .reports-table {
            font-size: 11px;
          }

          .reports-table th,
          .reports-table td {
            padding: 4px 8px;
          }

          .reports-chart {
            min-height: 250px;
            padding: 8px;
          }

          .pie-chart-container {
            width: 160px;
            height: 160px;
          }

          .pie-chart-center {
            width: 60px;
            height: 60px;
            font-size: 10px;
          }

          .pie-chart-center span:last-child {
            font-size: 12px !important;
          }

          .pie-legend-item {
            font-size: 10px;
          }

          .pie-legend-color {
            width: 12px;
            height: 12px;
          }

          .bar-chart-container {
            height: 160px;
            gap: 4px;
          }

          .bar {
            width: 24px;
          }

          .bar-value {
            font-size: 9px;
            top: -18px;
          }

          .bar-label {
            font-size: 8px;
            max-width: 30px;
          }

          .bar-tooltip {
            font-size: 8px;
            top: -22px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .reports-nav {
            width: 200px;
            min-width: 200px;
          }

          .pie-chart-container {
            width: 240px;
            height: 240px;
          }

          .reports-chart {
            min-height: 350px;
          }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .reports-container {
            background: #1a1a2e;
          }

          .reports-header,
          .reports-nav,
          .reports-content {
            background: #2d2d44;
          }

          .reports-header .title {
            color: #ecf0f1;
          }

          .reports-header .status {
            color: #4CAF50;
          }

          .reports-header .status.error {
            color: #e74c3c;
          }

          .reports-header .status.loading {
            color: #f39c12;
          }

          .reports-nav .nav-title {
            color: #ecf0f1;
            border-bottom-color: #3d3d5c;
          }

          .reports-nav .nav-group .group-title {
            color: #b0b0b0;
          }

          .reports-nav .nav-group button {
            color: #b0b0b0;
          }

          .reports-nav .nav-group button:hover {
            background: #3d3d5c;
            color: #ecf0f1;
          }

          .reports-nav .nav-group button.active {
            background: #3498db;
            color: white;
          }

          .reports-stats {
            background: #1a1a2e;
            border-color: #3d3d5c;
          }

          .reports-stats .stat-item {
            color: #ecf0f1;
          }

          .reports-stats .last-update {
            color: #888;
          }

          .reports-table th {
            background: #1a1a2e;
            color: #ecf0f1;
            border-bottom-color: #3d3d5c;
          }

          .reports-table td {
            color: #b0b0b0;
            border-bottom-color: #3d3d5c;
          }

          .reports-table tr:hover td {
            background: #1a1a2e;
          }

          .reports-chart {
            border-color: #3d3d5c;
            background: #1a1a2e;
          }

          .reports-empty {
            color: #666;
          }

          .reports-loading {
            color: #666;
          }

          .pie-chart-center {
            background: #1a1a2e;
            color: #ecf0f1;
          }

          .pie-legend-item {
            color: #b0b0b0;
          }

          .bar-value {
            color: #ecf0f1;
          }

          .bar-label {
            color: #b0b0b0;
          }

          .reports-table-wrapper {
            border-color: #3d3d5c;
          }

          .reports-table td {
            border-bottom-color: #3d3d5c;
          }
        }
      `}</style>

      <div className="reports-container">
        {/* Header */}
        <div className="reports-header">
          <div className="title">{t.header.title}</div>
          <div className="actions">
            <button 
              className="refresh" 
              onClick={refreshCurrentReport}
              disabled={loading}
            >
              🔄 {t.btn.refresh}
            </button>
            <button 
              className="export" 
              onClick={exportData}
              disabled={loading || data.length === 0}
            >
              📊 {t.btn.export}
            </button>
            <button 
              className="print" 
              onClick={printReport}
              disabled={loading || data.length === 0}
            >
              🖨️ {t.btn.print}
            </button>
            <span className={`status ${getStatusClass(statusMessage.type)}`}>
              {statusMessage.text}
            </span>
          </div>
        </div>

        <div className="reports-layout">
          {/* Sidebar Navigation */}
          <div className="reports-nav">
            <div className="nav-title">📋 {t.nav.reports}</div>

            {/* Appointments Group */}
            <div className="nav-group">
              <div className="group-title">{t.nav.group.appointments}</div>
              <button
                className={activeButton === 'appointmentsPerDoctor' ? 'active' : ''}
                onClick={() => loadReport(
                  '/appointments/per-doctor',
                  'bar',
                  [t.col.doctor, t.col.totalAppointments],
                  'appointmentsPerDoctor'
                )}
              >
                {t.nav.appointmentsPerDoctor}
              </button>
              <button
                className={activeButton === 'appointmentsByStatus' ? 'active' : ''}
                onClick={() => loadReport(
                  '/appointments/by-status',
                  'pie',
                  [t.col.status, t.col.count],
                  'appointmentsByStatus'
                )}
              >
                {t.nav.appointmentsByStatus}
              </button>
            </div>

            {/* Walk-ins Group */}
            <div className="nav-group">
              <div className="group-title">{t.nav.group.walkins}</div>
              <button
                className={activeButton === 'walkinsPerDoctor' ? 'active' : ''}
                onClick={() => loadReport(
                  '/walkins/per-doctor',
                  'bar',
                  [t.col.doctor, t.col.walkins],
                  'walkinsPerDoctor'
                )}
              >
                {t.nav.walkinsPerDoctor}
              </button>
            </div>

            {/* Patients Group */}
            <div className="nav-group">
              <div className="group-title">{t.nav.group.patients}</div>
              <button
                className={activeButton === 'patientsByGender' ? 'active' : ''}
                onClick={() => loadReport(
                  '/patients/by-gender',
                  'pie',
                  [t.col.gender, t.col.count],
                  'patientsByGender'
                )}
              >
                {t.nav.patientsByGender}
              </button>
              <button
                className={activeButton === 'patientsByCity' ? 'active' : ''}
                onClick={() => loadReport(
                  '/patients/by-city',
                  'bar',
                  [t.col.city, t.col.patientCount],
                  'patientsByCity'
                )}
              >
                {t.nav.patientsByCity}
              </button>
            </div>

            {/* Doctors Group */}
            <div className="nav-group">
              <div className="group-title">{t.nav.group.doctors}</div>
              <button
                className={activeButton === 'doctorsBySpecialty' ? 'active' : ''}
                onClick={() => loadReport(
                  '/doctors/by-specialty',
                  'bar',
                  [t.col.specialty, t.col.doctorCount],
                  'doctorsBySpecialty'
                )}
              >
                {t.nav.doctorsBySpecialty}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="reports-content">
            {/* Stats Bar */}
            <div className="reports-stats">
              <span className="stat-item">
                {t.stats.totalRecords}: {stats.total}
              </span>
              <span className="stat-item">
                {t.stats.uniqueValues}: {stats.unique}
              </span>
              <span className="spacer"></span>
              <span className="last-update">
                {t.stats.lastUpdate}: {lastUpdate.toLocaleString()}
              </span>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="reports-loading">
                <span>⏳ {t.status.loading}</span>
              </div>
            ) : (
              <>
                {/* Table */}
                {renderTable()}

                {/* Chart */}
                <div className="reports-chart">
                  {data.length === 0 ? (
                    <div className="reports-empty">{t.message.noData}</div>
                  ) : currentChartType === 'pie' ? (
                    renderPieChart(data)
                  ) : (
                    renderBarChart(data)
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportsScreen;


