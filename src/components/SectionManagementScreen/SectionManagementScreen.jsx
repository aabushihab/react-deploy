// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .section-container {
//     padding: 20px;
//     background: linear-gradient(to bottom, #f0f4f8, #e2e8f0);
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//   }
  
//   /* Header */
//   .section-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 15px 25px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//   }
//   .section-header .title {
//     font-size: 28px;
//     font-weight: bold;
//     color: #1a202c;
//   }
//   .section-header .title .underline {
//     display: block;
//     height: 3px;
//     width: 60px;
//     background: linear-gradient(to right, #4299e1, #2b6cb0);
//     border-radius: 2px;
//     margin-top: 5px;
//   }
//   .section-header .actions {
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
//   .section-header .actions button {
//     padding: 8px 18px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     color: white;
//   }
//   .section-header .actions button:hover {
//     transform: scale(1.05);
//   }
//   .section-header .actions button.refresh { background: #4299e1; }
//   .section-header .actions button.refresh:hover { background: #2b6cb0; }
//   .section-header .actions button.export { background: #48bb78; }
//   .section-header .actions button.export:hover { background: #38a169; }
//   .section-header .status {
//     font-size: 12px;
//     color: #27ae60;
//   }
//   .section-header .status.error { color: #e74c3c; }
//   .section-header .status.loading { color: #f39c12; }

//   /* Stats Cards */
//   .section-stats {
//     display: flex;
//     gap: 15px;
//     flex-wrap: wrap;
//   }
//   .section-stats .stat-card {
//     flex: 1;
//     min-width: 150px;
//     max-width: 200px;
//     padding: 15px 20px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border-left: 4px solid #4299e1;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .section-stats .stat-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .section-stats .stat-card .icon { font-size: 24px; }
//   .section-stats .stat-card .value { font-size: 24px; font-weight: bold; }
//   .section-stats .stat-card .label { font-size: 12px; color: #718096; }
//   .section-stats .stat-card.total { border-color: #4299e1; }
//   .section-stats .stat-card.total .value { color: #4299e1; }
//   .section-stats .stat-card.active { border-color: #48bb78; }
//   .section-stats .stat-card.active .value { color: #48bb78; }
//   .section-stats .stat-card.today { border-color: #ed8936; }
//   .section-stats .stat-card.today .value { color: #ed8936; }

//   /* Search and Tools */
//   .section-tools {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     flex-wrap: wrap;
//   }
//   .section-tools .search-box {
//     display: flex;
//     align-items: center;
//     background: white;
//     border-radius: 25px;
//     border: 1px solid #e2e8f0;
//     padding: 5px 15px;
//     flex: 1;
//     min-width: 200px;
//   }
//   .section-tools .search-box input {
//     border: none;
//     outline: none;
//     padding: 8px 5px;
//     font-size: 14px;
//     flex: 1;
//     background: transparent;
//   }
//   .section-tools .search-box .search-icon {
//     font-size: 14px;
//     color: #a0aec0;
//   }
//   .section-tools .view-toggle {
//     display: flex;
//     gap: 5px;
//   }
//   .section-tools .view-toggle button {
//     padding: 6px 15px;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     background: white;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//   }
//   .section-tools .view-toggle button.active {
//     background: #4299e1;
//     color: white;
//     border-color: #4299e1;
//   }
//   .section-tools .view-toggle button:hover:not(.active) {
//     background: #f7fafc;
//   }
//   .section-tools .spacer { flex: 1; }

//   /* Content Area */
//   .section-content {
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     padding: 15px;
//     min-height: 400px;
//   }

//   /* Table View */
//   .section-table-wrapper {
//     overflow-x: auto;
//     max-height: 500px;
//   }
//   .section-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .section-table th {
//     background: #f8f9fa;
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2d3748;
//     border-bottom: 2px solid #e2e8f0;
//     position: sticky;
//     top: 0;
//     z-index: 10;
//   }
//   .section-table td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #edf2f7;
//   }
//   .section-table tr:hover td {
//     background: #f7fafc;
//   }
//   .section-table .action-buttons {
//     display: flex;
//     gap: 5px;
//   }
//   .section-table .action-buttons button {
//     padding: 4px 12px;
//     border: none;
//     border-radius: 6px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 12px;
//     color: white;
//   }
//   .section-table .action-buttons button:hover {
//     transform: scale(1.05);
//   }
//   .section-table .action-buttons .btn-edit { background: #4299e1; }
//   .section-table .action-buttons .btn-edit:hover { background: #3182ce; }
//   .section-table .action-buttons .btn-delete { background: #fc8181; }
//   .section-table .action-buttons .btn-delete:hover { background: #f56565; }

//   /* Card View */
//   .section-card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//     gap: 15px;
//     padding: 5px;
//   }
//   .section-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #edf2f7;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .section-card:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 4px 20px rgba(66, 153, 225, 0.15);
//     border-color: #4299e1;
//     border-width: 2px;
//   }
//   .section-card .card-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 10px;
//   }
//   .section-card .card-id {
//     background: #4299e1;
//     color: white;
//     padding: 2px 12px;
//     border-radius: 12px;
//     font-size: 12px;
//     font-weight: bold;
//   }
//   .section-card .card-name {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2d3748;
//   }
//   .section-card .card-actions {
//     display: flex;
//     gap: 5px;
//     margin-top: 10px;
//   }
//   .section-card .card-actions button {
//     padding: 4px 12px;
//     border: none;
//     border-radius: 6px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 12px;
//     color: white;
//   }
//   .section-card .card-actions button:hover {
//     transform: scale(1.05);
//   }
//   .section-card .card-actions .btn-edit { background: #4299e1; }
//   .section-card .card-actions .btn-edit:hover { background: #3182ce; }
//   .section-card .card-actions .btn-delete { background: #fc8181; }
//   .section-card .card-actions .btn-delete:hover { background: #f56565; }
//   .section-card .card-footer {
//     margin-top: 10px;
//     padding-top: 10px;
//     border-top: 1px solid #e2e8f0;
//     font-size: 12px;
//     color: #a0aec0;
//   }

//   /* Quick Add Section */
//   .section-quick-add {
//     padding: 15px 20px;
//     background: linear-gradient(to right, #ebf8ff, #bee3f8);
//     border-radius: 12px;
//     border: 2px solid #4299e1;
//     box-shadow: 0 2px 10px rgba(66, 153, 225, 0.1);
//   }
//   .section-quick-add .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }
//   .section-quick-add .header .title {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2b6cb0;
//   }
//   .section-quick-add .header .hint {
//     font-size: 12px;
//     color: #4a5568;
//     font-style: italic;
//   }
//   .section-quick-add .input-row {
//     display: flex;
//     gap: 10px;
//     margin-top: 5px;
//     align-items: center;
//   }
//   .section-quick-add .input-row input {
//     flex: 1;
//     max-width: 300px;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #4299e1;
//     font-size: 14px;
//     background: white;
//     transition: all 0.2s;
//   }
//   .section-quick-add .input-row input:focus {
//     outline: none;
//     border-color: #2b6cb0;
//     border-width: 2px;
//     background: #f0f9ff;
//   }
//   .section-quick-add .input-row button {
//     padding: 10px 25px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 14px;
//     color: white;
//     background: #4299e1;
//     box-shadow: 0 2px 8px rgba(66, 153, 225, 0.3);
//   }
//   .section-quick-add .input-row button:hover {
//     background: #3182ce;
//     transform: scale(1.05);
//     box-shadow: 0 4px 12px rgba(66, 153, 225, 0.5);
//   }
//   .section-quick-add .input-row button:active {
//     transform: scale(0.95);
//   }

//   /* Status Bar */
//   .section-status-bar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 8px 15px;
//     background: white;
//     border-radius: 8px;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .section-status-bar .status-msg {
//     font-size: 13px;
//     font-weight: 500;
//     color: #48bb78;
//   }
//   .section-status-bar .status-msg.error { color: #e74c3c; }
//   .section-status-bar .status-msg.loading { color: #f39c12; }
//   .section-status-bar .spacer { flex: 1; }
//   .section-status-bar .time {
//     font-size: 12px;
//     color: #a0aec0;
//   }

//   /* Loading */
//   .section-loading {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 40px;
//     color: #7f8c8d;
//   }

//   /* Empty State */
//   .section-empty {
//     text-align: center;
//     padding: 40px;
//     color: #a0aec0;
//     font-size: 16px;
//   }

//   /* Modal Overlay */
//   .section-modal-overlay {
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
//   .section-modal {
//     background: white;
//     border-radius: 12px;
//     padding: 25px;
//     max-width: 450px;
//     width: 95%;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   }
//   .section-modal h3 {
//     margin: 0 0 15px 0;
//     color: #2d3748;
//     font-size: 18px;
//   }
//   .section-modal .form-group {
//     margin-bottom: 15px;
//   }
//   .section-modal .form-group label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
//     color: #2d3748;
//   }
//   .section-modal .form-group input {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//     transition: border-color 0.2s;
//   }
//   .section-modal .form-group input:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .section-modal .modal-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }
//   .section-modal .modal-actions button {
//     padding: 8px 30px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 14px;
//   }
//   .section-modal .modal-actions .btn-primary {
//     background: #48bb78;
//     color: white;
//   }
//   .section-modal .modal-actions .btn-primary:hover {
//     background: #38a169;
//     transform: scale(1.05);
//   }
//   .section-modal .modal-actions .btn-secondary {
//     background: #e2e8f0;
//     color: #4a5568;
//   }
//   .section-modal .modal-actions .btn-secondary:hover {
//     background: #cbd5e0;
//     transform: scale(1.05);
//   }
//   .section-modal .validation-msg {
//     font-size: 12px;
//     margin-top: 5px;
//   }
//   .section-modal .validation-msg.success { color: #48bb78; }
//   .section-modal .validation-msg.error { color: #fc8181; }

//   /* Floating Button */
//   .section-floating-btn {
//     position: fixed;
//     bottom: 30px;
//     right: 30px;
//     width: 70px;
//     height: 70px;
//     border-radius: 50%;
//     background: linear-gradient(to bottom, #48bb78, #38a169);
//     color: white;
//     font-size: 36px;
//     font-weight: bold;
//     border: none;
//     cursor: pointer;
//     box-shadow: 0 4px 20px rgba(72, 187, 120, 0.5);
//     transition: all 0.2s;
//     z-index: 1000;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .section-floating-btn:hover {
//     transform: scale(1.1);
//     box-shadow: 0 6px 30px rgba(72, 187, 120, 0.7);
//   }
//   .section-floating-btn:active {
//     transform: scale(0.95);
//   }

//   /* Shake Animation */
//   @keyframes shake {
//     0%, 100% { transform: translateX(0); }
//     25% { transform: translateX(-10px); }
//     75% { transform: translateX(10px); }
//   }
//   .shake {
//     animation: shake 0.4s ease-in-out;
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

// // ---------- Color Palette ----------
// const CHART_COLORS = [
//   '#4CAF50', '#2196F3', '#FF9800', '#E91E63',
//   '#9C27B0', '#00BCD4', '#FF5722', '#8BC34A',
//   '#3F51B5', '#FFC107', '#795548', '#607D8B'
// ];

// // ---------- Main Component ----------
// const SectionManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const getTranslations = (language) => {
//     const translations = {
//       en: {
//         title: { manageSections: 'Manage Sections' },
//         header: { title: '📋 Manage Sections' },
//         stat: {
//           totalSections: 'Total Sections',
//           activeSections: 'Active Sections',
//           todayAdded: 'Today Added'
//         },
//         btn: {
//           table: 'Table',
//           cards: 'Cards',
//           refresh: 'Refresh',
//           export: 'Export CSV',
//           add: 'Add',
//           edit: 'Edit',
//           delete: 'Delete',
//           save: 'Save',
//           cancel: 'Cancel',
//           yes: 'Yes',
//           no: 'No'
//         },
//         label: {
//           showing: 'Showing',
//           records: 'records',
//           noSections: 'No sections found',
//           created: 'Created',
//           addNew: 'Add New Section'
//         },
//         txt: {
//           search: 'Search sections',
//           sectionName: 'Section Name'
//         },
//         dialog: {
//           addSection: 'Add Section',
//           updateSection: 'Update Section',
//           updateHeader: 'Updating section',
//           sectionName: 'Section Name',
//           deleteConfirm: 'Are you sure you want to delete this section?'
//         },
//         status: {
//           ready: 'Ready',
//           loading: 'Loading...',
//           refreshing: 'Refreshing...',
//           added: 'Added successfully',
//           updated: 'Updated successfully',
//           deleted: 'Deleted successfully',
//           exported: 'Exported successfully'
//         },
//         alert: {
//           enterName: 'Please enter a section name',
//           invalidName: 'Name must start with 3 letters and may contain numbers',
//           sectionNameEmpty: 'Section name cannot be empty',
//           errorLoading: 'Error loading sections',
//           errorCreating: 'Error creating section',
//           errorUpdating: 'Error updating section',
//           errorDeleting: 'Error deleting section',
//           exportError: 'Error exporting data',
//           exportSuccess: 'Data exported successfully'
//         },
//         validation: {
//           validName: '✓ Valid name',
//           invalidName: '✗ Name must start with 3 letters'
//         },
//         quickAdd: {
//           hint: 'Quick add a new section',
//           placeholder: 'Enter section name...',
//           addBtn: 'Add Section'
//         },
//         confirm: {
//           delete: {
//             title: 'Confirm Delete',
//             content: 'Are you sure you want to delete this section?'
//           }
//         }
//       },
//       ar: {
//         title: { manageSections: 'إدارة الأقسام' },
//         header: { title: '📋 إدارة الأقسام' },
//         stat: {
//           totalSections: 'إجمالي الأقسام',
//           activeSections: 'الأقسام النشطة',
//           todayAdded: 'تمت إضافته اليوم'
//         },
//         btn: {
//           table: 'جدول',
//           cards: 'بطاقات',
//           refresh: 'تحديث',
//           export: 'تصدير CSV',
//           add: 'إضافة',
//           edit: 'تعديل',
//           delete: 'حذف',
//           save: 'حفظ',
//           cancel: 'إلغاء',
//           yes: 'نعم',
//           no: 'لا'
//         },
//         label: {
//           showing: 'عرض',
//           records: 'سجلات',
//           noSections: 'لا توجد أقسام',
//           created: 'تم الإنشاء',
//           addNew: 'إضافة قسم جديد'
//         },
//         txt: {
//           search: 'بحث عن الأقسام',
//           sectionName: 'اسم القسم'
//         },
//         dialog: {
//           addSection: 'إضافة قسم',
//           updateSection: 'تعديل قسم',
//           updateHeader: 'تعديل القسم',
//           sectionName: 'اسم القسم',
//           deleteConfirm: 'هل أنت متأكد من حذف هذا القسم؟'
//         },
//         status: {
//           ready: 'جاهز',
//           loading: 'جاري التحميل...',
//           refreshing: 'جاري التحديث...',
//           added: 'تمت الإضافة بنجاح',
//           updated: 'تم التعديل بنجاح',
//           deleted: 'تم الحذف بنجاح',
//           exported: 'تم التصدير بنجاح'
//         },
//         alert: {
//           enterName: 'يرجى إدخال اسم القسم',
//           invalidName: 'يجب أن يبدأ الاسم بـ 3 أحرف وقد يحتوي على أرقام',
//           sectionNameEmpty: 'لا يمكن أن يكون اسم القسم فارغاً',
//           errorLoading: 'خطأ في تحميل الأقسام',
//           errorCreating: 'خطأ في إنشاء القسم',
//           errorUpdating: 'خطأ في تحديث القسم',
//           errorDeleting: 'خطأ في حذف القسم',
//           exportError: 'خطأ في تصدير البيانات',
//           exportSuccess: 'تم تصدير البيانات بنجاح'
//         },
//         validation: {
//           validName: '✓ اسم صالح',
//           invalidName: '✗ يجب أن يبدأ الاسم بـ 3 أحرف'
//         },
//         quickAdd: {
//           hint: 'إضافة قسم سريعة',
//           placeholder: 'أدخل اسم القسم...',
//           addBtn: 'إضافة قسم'
//         },
//         confirm: {
//           delete: {
//             title: 'تأكيد الحذف',
//             content: 'هل أنت متأكد من حذف هذا القسم؟'
//           }
//         }
//       }
//     };
//     return translations[language] || translations.en;
//   };

//   const t = getTranslations(lang);

//   // ---------- State ----------
//   const [sections, setSections] = useState([]);
//   const [filteredSections, setFilteredSections] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [viewMode, setViewMode] = useState('table');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [stats, setStats] = useState({ total: 0, active: 0, today: 0 });

//   // Modal states
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [sectionName, setSectionName] = useState('');
//   const [updateName, setUpdateName] = useState('');
//   const [validationMsg, setValidationMsg] = useState(null);

//   // ---------- Helper Functions ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text: `● ${text}`, type });
//   }, []);

//   const isValidSectionName = (name) => {
//     // return /^[A-Za-z]{3,}[A-Za-z]*\d{0,3}$/.test(name);
//   return /^[A-Za-z][A-Za-z0-9 .-]*$/.test(name.trim());

//   };

//   const formatDate = (date) => {
//     if (!date) return '-';
//     return new Date(date).toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   // ---------- API Calls ----------
//   const loadSections = useCallback(async () => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');

//     try {
//       const url = `${BASE_URL}/api/sections`;
//       //console.log('📤 Fetching sections:', url);
      
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
//       const data = await response.json();
//       const sectionsData = Array.isArray(data) ? data : [data];
      
//       setSections(sectionsData);
//       setFilteredSections(sectionsData);
      
//       // Update stats
//       const total = sectionsData.length;
//       const active = sectionsData.filter(s => s.active !== false).length;
//       const today = sectionsData.filter(s => {
//         const created = new Date(s.createdAt || Date.now());
//         const now = new Date();
//         return created.toDateString() === now.toDateString();
//       }).length;
      
//       setStats({ total, active, today });
//       setStatus(`${t.status.ready} (${total} ${t.label.records})`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Load error:', err);
//       setStatus(t.alert.errorLoading, 'error');
//       setSections([]);
//       setFilteredSections([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [t]);

//  const createSection = useCallback(async (name) => {
//     try {
//         const response = await fetch(`${BASE_URL}/api/sections`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ name: name.trim() })
//         });

//         const message = await response.text();

//         if (!response.ok) {
//             setStatus(message || t.alert.errorCreating, "error");
//             return;
//         }

//         setShowAddModal(false);
//         setSectionName("");
//         setValidationMsg(null);

//         await loadSections();

//         setStatus(message || t.status.added, "success");

//     } catch (err) {
//         //console.error(err);
//         setStatus(err.message || t.alert.errorCreating, "error");
//     }
// }, [loadSections, t]);


// const updateSection = useCallback(async (id, name) => {
//     try {
//       const url = `${BASE_URL}/api/sections/${id}`;
//       //console.log('📤 Updating section:', url);
      
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: name.trim() })
//       });
      

//  const message = await response.text();

//         if (!response.ok) {
//             setStatus(message || t.alert.errorCreating, "error");
//             return;
//         }

//       // if (!response.ok) {
//       //   const errorText = await response.text();
//       //   throw new Error(`HTTP ${response.status}: ${errorText}`);
//       // }
      
//       setShowUpdateModal(false);
//       setUpdateName('');
//       setSelectedSection(null);
//       loadSections();
//       setStatus(`✅ ${t.status.updated}`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Update error:', err);
//       alert(t.alert.errorUpdating);
//     }
//   }, [loadSections, t]);

//   // const deleteSection = useCallback(async (id) => {
//   //   try {
//   //     const url = `${BASE_URL}/api/sections/${id}`;
//   //     //console.log('📤 Deleting section:', url);
      
//   //     const response = await fetch(url, {
//   //       method: 'DELETE'
//   //     });
      
//   //      const message = await response.text();

//   //       if (!response.ok) {
//   //           setStatus(message || t.alert.errorCreating, "error");
//   //           return;
//   //       }
//   //     // if (!response.ok) {
//   //     //   const errorText = await response.text();
//   //     //   throw new Error(`HTTP ${response.status}: ${errorText}`);
//   //     // }
      
//   //     setShowDeleteModal(false);
//   //     setSelectedSection(null);
//   //     loadSections();
//   //     setStatus(`🗑️ ${t.status.deleted}`, 'success');
      
//   //   } catch (err) {
//   //     //console.error('🚨 Delete error:', err);
//   //     alert(t.alert.errorDeleting);
//   //   }
//   // }, [loadSections, t]);

//   // ---------- Export to CSV ----------
  
// const deleteSection = useCallback(async (id) => {
//   try {
//     const url = `${BASE_URL}/api/sections/${id}`;
//     //console.log('📤 Deleting section:', url);
    
//     const response = await fetch(url, {
//       method: 'DELETE'
//     });
    
//     const message = await response.text();

//     if (!response.ok) {
//       setStatus(message || t.alert.errorDeleting, "error");
//       // Close the modal even on error
//       setShowDeleteModal(false);
//       setSelectedSection(null);
//       return;
//     }
    
//     setShowDeleteModal(false);
//     setSelectedSection(null);
//     loadSections();
//     setStatus(`🗑️ ${t.status.deleted}`, 'success');
    
//   } catch (err) {
//     //console.error('🚨 Delete error:', err);
//     setStatus(err.message || t.alert.errorDeleting, 'error');
//     // Close the modal even on error
//     setShowDeleteModal(false);
//     setSelectedSection(null);
//   }
// }, [loadSections, t]);

//   const exportToCSV = useCallback(() => {
//     if (filteredSections.length === 0) {
//       alert('No data to export');
//       return;
//     }

//     // Create CSV
//     const headers = 'ID,Section Name,Created At';
//     const rows = filteredSections.map(section => {
//       const createdAt = section.createdAt ? new Date(section.createdAt).toLocaleString() : new Date().toLocaleString();
//       return `${section.id},${section.name},${createdAt}`;
//     }).join('\n');

//     const csv = `${headers}\n${rows}`;
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `sections_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);

//     setStatus(`📥 ${t.status.exported}`, 'success');
//   }, [filteredSections, t]);

//   // ---------- Handlers ----------
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
    
//     if (query.trim() === '') {
//       setFilteredSections(sections);
//     } else {
//       const filtered = sections.filter(section => {
//         return (
//           section.name.toLowerCase().includes(query) ||
//           String(section.id).includes(query)
//         );
//       });
//       setFilteredSections(filtered);
//     }
//   };

//   const handleViewToggle = (mode) => {
//     setViewMode(mode);
//   };

//   const handleQuickAdd = () => {
//     const name = sectionName.trim();
    
//     if (name === '') {
//       setStatus('⚠️ ' + t.alert.enterName, 'error');
//       return;
//     }
    
//     if (!isValidSectionName(name)) {
//       setStatus('⚠️ ' + t.alert.invalidName, 'error');
//       return;
//     }
    
//     createSection(name);
//   };

//   const handleOpenUpdateModal = (section) => {
//     setSelectedSection(section);
//     setUpdateName(section.name);
//     setShowUpdateModal(true);
//   };

//   const handleOpenDeleteModal = (section) => {
//     setSelectedSection(section);
//     setShowDeleteModal(true);
//   };

//   const handleUpdateSubmit = () => {
//     const name = updateName.trim();
    
//     if (name === '') {
//       alert(t.alert.sectionNameEmpty);
//       return;
//     }
    
//     if (!isValidSectionName(name)) {
//       alert(t.alert.invalidName);
//       return;
//     }
    
//     updateSection(selectedSection.id, name);
//   };

//   const handleDeleteConfirm = () => {
//     deleteSection(selectedSection.id);
//   };

//   // ---------- Effects ----------
//   // FIX: Use a ref to track if this is the first load
//   const isFirstLoad = useRef(true);

//   useEffect(() => {
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       loadSections();
//     }
//   }, [loadSections]);

//   // Update status when language changes
//   useEffect(() => {
//     setStatus(t.status.ready, 'success');
//   }, [t, setStatus]);

//   // ---------- Render Components ----------
//   const renderStats = () => {
//     const cards = [
//       { key: 'total', label: t.stat.totalSections, value: stats.total, icon: '📊', cls: 'total' },
//       { key: 'active', label: t.stat.activeSections, value: stats.active, icon: '✅', cls: 'active' },
//       { key: 'today', label: t.stat.todayAdded, value: stats.today, icon: '➕', cls: 'today' }
//     ];

//     return (
//       <div className="section-stats">
//         {cards.map((card) => (
//           <div key={card.key} className={`stat-card ${card.cls}`}>
//             <div className="icon">{card.icon}</div>
//             <div className="value">{card.value}</div>
//             <div className="label">{card.label}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTable = () => {
//     if (filteredSections.length === 0) {
//       return <div className="section-empty">📭 {t.label.noSections}</div>;
//     }

//     return (
//       <div className="section-table-wrapper">
//         <table className="section-table">
//           <thead>
//             <tr>
//               <th style={{ width: '80px' }}>#</th>
//               <th>{t.txt.sectionName}</th>
//               <th style={{ width: '160px' }}>{t.label.created}</th>
//               <th style={{ width: '180px' }}>{t.btn.add}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSections.map((section) => (
//               <tr key={section.id}>
//                 <td>{section.id}</td>
//                 <td style={{ fontWeight: '500', color: '#2d3748' }}>{section.name}</td>
//                 <td>
//                   {section.createdAt ? formatDate(section.createdAt) : '-'}
//                 </td>
//                 <td>
//                   <div className="action-buttons">
//                     <button 
//                       className="btn-edit"
//                       onClick={() => handleOpenUpdateModal(section)}
//                     >
//                       ✏️ {t.btn.edit}
//                     </button>
//                     <button 
//                       className="btn-delete"
//                       onClick={() => handleOpenDeleteModal(section)}
//                     >
//                       🗑️ {t.btn.delete}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderCards = () => {
//     if (filteredSections.length === 0) {
//       return <div className="section-empty">📭 {t.label.noSections}</div>;
//     }

//     return (
//       <div className="section-card-grid">
//         {filteredSections.map((section) => (
//           <div key={section.id} className="section-card">
//             <div className="card-header">
//               <span className="card-id">#{section.id}</span>
//               <span className="card-name">{section.name}</span>
//             </div>
//             <div className="card-actions">
//               <button 
//                 className="btn-edit"
//                 onClick={() => handleOpenUpdateModal(section)}
//               >
//                 ✏️ {t.btn.edit}
//               </button>
//               <button 
//                 className="btn-delete"
//                 onClick={() => handleOpenDeleteModal(section)}
//               >
//                 🗑️ {t.btn.delete}
//               </button>
//             </div>
//             <div className="card-footer">
//               📅 {t.label.created}: {section.createdAt ? formatDate(section.createdAt) : '-'}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // ---------- Modals ----------
//   const renderAddModal = () => {
//     if (!showAddModal) return null;

//     const handleNameChange = (e) => {
//       const value = e.target.value;
//       setSectionName(value);
      
//       if (value.length > 0) {
//         if (isValidSectionName(value)) {
//           setValidationMsg({ text: `✅ ${t.validation.validName}`, type: 'success' });
//         } else {
//           setValidationMsg({ text: `❌ ${t.validation.invalidName}`, type: 'error' });
//         }
//       } else {
//         setValidationMsg(null);
//       }
//     };

//     return (
//       <div className="section-modal-overlay">
//         <div className="section-modal slide-in">
//           <h3>➕ {t.dialog.addSection}</h3>
          
//           <div className="form-group">
//             <label>{t.dialog.sectionName}</label>
//             <input
//               type="text"
//               value={sectionName}
//               onChange={handleNameChange}
//               placeholder={t.txt.sectionName}
//               autoFocus
//             />
//             {validationMsg && (
//               <div className={`validation-msg ${validationMsg.type}`}>
//                 {validationMsg.text}
//               </div>
//             )}
//           </div>
          
//           <div className="modal-actions">
//             <button 
//               className="btn-secondary"
//               onClick={() => {
//                 setShowAddModal(false);
//                 setSectionName('');
//                 setValidationMsg(null);
//               }}
//             >
//               {t.btn.cancel}
//             </button>
//             <button 
//               className="btn-primary"
//               onClick={() => {
//                 const name = sectionName.trim();
//                 if (name === '') {
//                   setStatus('⚠️ ' + t.alert.enterName, 'error');
//                   return;
//                 }
//                 if (!isValidSectionName(name)) {
//                   setStatus('⚠️ ' + t.alert.invalidName, 'error');
//                   return;
//                 }
//                 createSection(name);
//               }}
//               disabled={!sectionName.trim() || !isValidSectionName(sectionName.trim())}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderUpdateModal = () => {
//     if (!showUpdateModal || !selectedSection) return null;

//     return (
//       <div className="section-modal-overlay">
//         <div className="section-modal slide-in">
//           <h3>✏️ {t.dialog.updateSection}</h3>
          
//           <div className="form-group">
//             <label>{t.dialog.sectionName}</label>
//             <input
//               type="text"
//               value={updateName}
//               onChange={(e) => setUpdateName(e.target.value)}
//               placeholder={t.txt.sectionName}
//               autoFocus
//             />
//           </div>
          
//           <div className="modal-actions">
//             <button 
//               className="btn-secondary"
//               onClick={() => {
//                 setShowUpdateModal(false);
//                 setSelectedSection(null);
//                 setUpdateName('');
//               }}
//             >
//               {t.btn.cancel}
//             </button>
//             <button 
//               className="btn-primary"
//               onClick={handleUpdateSubmit}
//               disabled={!updateName.trim() || !isValidSectionName(updateName.trim())}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderDeleteModal = () => {
//     if (!showDeleteModal || !selectedSection) return null;

//     return (
//       <div className="section-modal-overlay">
//         <div className="section-modal slide-in">
//           <h3>🗑️ {t.confirm.delete.title}</h3>
          
//           <div style={{ margin: '15px 0', fontSize: '14px', color: '#4a5568' }}>
//             {t.confirm.delete.content}
//             <div style={{ 
//               marginTop: '10px', 
//               fontWeight: 'bold', 
//               fontSize: '16px', 
//               color: '#e53e3e' 
//             }}>
//               "{selectedSection.name}"
//             </div>
//           </div>
          
//           <div className="modal-actions">
//             <button 
//               className="btn-secondary"
//               onClick={() => {
//                 setShowDeleteModal(false);
//                 setSelectedSection(null);
//               }}
//             >
//               {t.btn.no}
//             </button>
//             <button 
//               className="btn-primary"
//               style={{ background: '#fc8181' }}
//               onClick={handleDeleteConfirm}
//             >
//               {t.btn.yes}
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
//       <div className="section-container">
//         {/* Header */}
//         <div className="section-header">
//           <div className="title">
//             {t.header.title}
//             <span className="underline"></span>
//           </div>
//           <div className="actions">
//             <button 
//               className="refresh" 
//               onClick={loadSections}
//               disabled={loading}
//             >
//               🔄 {t.btn.refresh}
//             </button>
//             <button 
//               className="export" 
//               onClick={exportToCSV}
//               disabled={loading || filteredSections.length === 0}
//             >
//               📥 {t.btn.export}
//             </button>
//             <span className={`status ${statusMessage.type}`}>
//               {statusMessage.text}
//             </span>
//           </div>
//         </div>

//         {/* Stats */}
//         {renderStats()}

//         {/* Search and Tools */}
//         <div className="section-tools">
//           <div className="search-box">
//             <span className="search-icon">🔍</span>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearch}
//               placeholder={t.txt.search + '...'}
//             />
//           </div>
          
//           <div className="view-toggle">
//             <button
//               className={viewMode === 'table' ? 'active' : ''}
//               onClick={() => handleViewToggle('table')}
//             >
//               📋 {t.btn.table}
//             </button>
//             <button
//               className={viewMode === 'cards' ? 'active' : ''}
//               onClick={() => handleViewToggle('cards')}
//             >
//               🃏 {t.btn.cards}
//             </button>
//           </div>
//         </div>

//         {/* Quick Add Section */}
//         <div className="section-quick-add">
//           <div className="header">
//             <span className="title">🚀 {t.dialog.addSection}</span>
//             <span className="hint">— {t.quickAdd.hint}</span>
//           </div>
//           <div className="input-row">
//             <input
//               type="text"
//               value={sectionName}
//               onChange={(e) => setSectionName(e.target.value)}
//               placeholder={t.quickAdd.placeholder}
//               onKeyPress={(e) => e.key === 'Enter' && handleQuickAdd()}
//             />
//             <button onClick={handleQuickAdd}>
//               ➕ {t.quickAdd.addBtn}
//             </button>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="section-content">
//           {loading ? (
//             <div className="section-loading">⏳ {t.status.loading}</div>
//           ) : (
//             viewMode === 'table' ? renderTable() : renderCards()
//           )}
//         </div>

//         {/* Status Bar */}
//         <div className="section-status-bar">
//           <span className={`status-msg ${statusMessage.type}`}>
//             {statusMessage.text}
//           </span>
//           <span className="spacer"></span>
//           <span className="time">
//             🕐 {new Date().toLocaleTimeString()}
//           </span>
//         </div>

//         {/* Floating Add Button */}
//         <button 
//           className="section-floating-btn"
//           onClick={() => {
//             setSectionName('');
//             setValidationMsg(null);
//             setShowAddModal(true);
//           }}
//         >
//           +
//         </button>

//         {/* Modals */}
//         {renderAddModal()}
//         {renderUpdateModal()}
//         {renderDeleteModal()}
//       </div>
//     </>
//   );
// };

// export default SectionManagementScreen;  08072026  7:35 pM


// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .section-container {
//     padding: 20px;
//     background: linear-gradient(to bottom, #f0f4f8, #e2e8f0);
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//   }
  
//   /* Header */
//   .section-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 15px 25px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//   }
//   .section-header .title {
//     font-size: 28px;
//     font-weight: bold;
//     color: #1a202c;
//   }
//   .section-header .title .underline {
//     display: block;
//     height: 3px;
//     width: 60px;
//     background: linear-gradient(to right, #4299e1, #2b6cb0);
//     border-radius: 2px;
//     margin-top: 5px;
//   }
//   .section-header .actions {
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
//   .section-header .actions button {
//     padding: 8px 18px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     color: white;
//   }
//   .section-header .actions button:hover {
//     transform: scale(1.05);
//   }
//   .section-header .actions button.refresh { background: #4299e1; }
//   .section-header .actions button.refresh:hover { background: #2b6cb0; }
//   .section-header .actions button.export { background: #48bb78; }
//   .section-header .actions button.export:hover { background: #38a169; }
//   .section-header .status {
//     font-size: 12px;
//     color: #27ae60;
//   }
//   .section-header .status.error { color: #e74c3c; }
//   .section-header .status.loading { color: #f39c12; }

//   /* Stats Cards */
//   .section-stats {
//     display: flex;
//     gap: 15px;
//     flex-wrap: wrap;
//   }
//   .section-stats .stat-card {
//     flex: 1;
//     min-width: 150px;
//     max-width: 200px;
//     padding: 15px 20px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border-left: 4px solid #4299e1;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .section-stats .stat-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .section-stats .stat-card .icon { font-size: 24px; }
//   .section-stats .stat-card .value { font-size: 24px; font-weight: bold; }
//   .section-stats .stat-card .label { font-size: 12px; color: #718096; }
//   .section-stats .stat-card.total { border-color: #4299e1; }
//   .section-stats .stat-card.total .value { color: #4299e1; }
//   .section-stats .stat-card.active { border-color: #48bb78; }
//   .section-stats .stat-card.active .value { color: #48bb78; }
//   .section-stats .stat-card.today { border-color: #ed8936; }
//   .section-stats .stat-card.today .value { color: #ed8936; }

//   /* Search and Tools */
//   .section-tools {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     flex-wrap: wrap;
//   }
//   .section-tools .search-box {
//     display: flex;
//     align-items: center;
//     background: white;
//     border-radius: 25px;
//     border: 1px solid #e2e8f0;
//     padding: 5px 15px;
//     flex: 1;
//     min-width: 200px;
//   }
//   .section-tools .search-box input {
//     border: none;
//     outline: none;
//     padding: 8px 5px;
//     font-size: 14px;
//     flex: 1;
//     background: transparent;
//   }
//   .section-tools .search-box .search-icon {
//     font-size: 14px;
//     color: #a0aec0;
//   }
//   .section-tools .view-toggle {
//     display: flex;
//     gap: 5px;
//   }
//   .section-tools .view-toggle button {
//     padding: 6px 15px;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     background: white;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//   }
//   .section-tools .view-toggle button.active {
//     background: #4299e1;
//     color: white;
//     border-color: #4299e1;
//   }
//   .section-tools .view-toggle button:hover:not(.active) {
//     background: #f7fafc;
//   }
//   .section-tools .spacer { flex: 1; }

//   /* Content Area */
//   .section-content {
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     padding: 15px;
//     min-height: 400px;
//   }

//   /* Table View */
//   .section-table-wrapper {
//     overflow-x: auto;
//     max-height: 500px;
//   }
//   .section-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .section-table th {
//     background: #f8f9fa;
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2d3748;
//     border-bottom: 2px solid #e2e8f0;
//     position: sticky;
//     top: 0;
//     z-index: 10;
//   }
//   .section-table td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #edf2f7;
//   }
//   .section-table tr:hover td {
//     background: #f7fafc;
//   }
//   .section-table .action-buttons {
//     display: flex;
//     gap: 5px;
//   }
//   .section-table .action-buttons button {
//     padding: 4px 12px;
//     border: none;
//     border-radius: 6px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 12px;
//     color: white;
//   }
//   .section-table .action-buttons button:hover {
//     transform: scale(1.05);
//   }
//   .section-table .action-buttons .btn-edit { background: #4299e1; }
//   .section-table .action-buttons .btn-edit:hover { background: #3182ce; }
//   .section-table .action-buttons .btn-delete { background: #fc8181; }
//   .section-table .action-buttons .btn-delete:hover { background: #f56565; }

//   /* Card View */
//   .section-card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//     gap: 15px;
//     padding: 5px;
//   }
//   .section-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #edf2f7;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .section-card:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 4px 20px rgba(66, 153, 225, 0.15);
//     border-color: #4299e1;
//     border-width: 2px;
//   }
//   .section-card .card-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 10px;
//   }
//   .section-card .card-id {
//     background: #4299e1;
//     color: white;
//     padding: 2px 12px;
//     border-radius: 12px;
//     font-size: 12px;
//     font-weight: bold;
//   }
//   .section-card .card-name {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2d3748;
//   }
//   .section-card .card-actions {
//     display: flex;
//     gap: 5px;
//     margin-top: 10px;
//   }
//   .section-card .card-actions button {
//     padding: 4px 12px;
//     border: none;
//     border-radius: 6px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 12px;
//     color: white;
//   }
//   .section-card .card-actions button:hover {
//     transform: scale(1.05);
//   }
//   .section-card .card-actions .btn-edit { background: #4299e1; }
//   .section-card .card-actions .btn-edit:hover { background: #3182ce; }
//   .section-card .card-actions .btn-delete { background: #fc8181; }
//   .section-card .card-actions .btn-delete:hover { background: #f56565; }
//   .section-card .card-footer {
//     margin-top: 10px;
//     padding-top: 10px;
//     border-top: 1px solid #e2e8f0;
//     font-size: 12px;
//     color: #a0aec0;
//   }

//   /* Quick Add Section */
//   .section-quick-add {
//     padding: 15px 20px;
//     background: linear-gradient(to right, #ebf8ff, #bee3f8);
//     border-radius: 12px;
//     border: 2px solid #4299e1;
//     box-shadow: 0 2px 10px rgba(66, 153, 225, 0.1);
//   }
//   .section-quick-add .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }
//   .section-quick-add .header .title {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2b6cb0;
//   }
//   .section-quick-add .header .hint {
//     font-size: 12px;
//     color: #4a5568;
//     font-style: italic;
//   }
//   .section-quick-add .input-row {
//     display: flex;
//     gap: 10px;
//     margin-top: 5px;
//     align-items: center;
//   }
//   .section-quick-add .input-row input {
//     flex: 1;
//     max-width: 300px;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #4299e1;
//     font-size: 14px;
//     background: white;
//     transition: all 0.2s;
//   }
//   .section-quick-add .input-row input:focus {
//     outline: none;
//     border-color: #2b6cb0;
//     border-width: 2px;
//     background: #f0f9ff;
//   }
//   .section-quick-add .input-row button {
//     padding: 10px 25px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 14px;
//     color: white;
//     background: #4299e1;
//     box-shadow: 0 2px 8px rgba(66, 153, 225, 0.3);
//   }
//   .section-quick-add .input-row button:hover {
//     background: #3182ce;
//     transform: scale(1.05);
//     box-shadow: 0 4px 12px rgba(66, 153, 225, 0.5);
//   }
//   .section-quick-add .input-row button:active {
//     transform: scale(0.95);
//   }

//   /* Status Bar */
//   .section-status-bar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 8px 15px;
//     background: white;
//     border-radius: 8px;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .section-status-bar .status-msg {
//     font-size: 13px;
//     font-weight: 500;
//     color: #48bb78;
//   }
//   .section-status-bar .status-msg.error { color: #e74c3c; }
//   .section-status-bar .status-msg.loading { color: #f39c12; }
//   .section-status-bar .spacer { flex: 1; }
//   .section-status-bar .time {
//     font-size: 12px;
//     color: #a0aec0;
//   }

//   /* Loading */
//   .section-loading {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 40px;
//     color: #7f8c8d;
//   }

//   /* Empty State */
//   .section-empty {
//     text-align: center;
//     padding: 40px;
//     color: #a0aec0;
//     font-size: 16px;
//   }

//   /* Modal Overlay */
//   .section-modal-overlay {
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
//   .section-modal {
//     background: white;
//     border-radius: 12px;
//     padding: 25px;
//     max-width: 450px;
//     width: 95%;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   }
//   .section-modal h3 {
//     margin: 0 0 15px 0;
//     color: #2d3748;
//     font-size: 18px;
//   }
//   .section-modal .form-group {
//     margin-bottom: 15px;
//   }
//   .section-modal .form-group label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
//     color: #2d3748;
//   }
//   .section-modal .form-group input {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//     transition: border-color 0.2s;
//   }
//   .section-modal .form-group input:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .section-modal .modal-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }
//   .section-modal .modal-actions button {
//     padding: 8px 30px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 14px;
//   }
//   .section-modal .modal-actions .btn-primary {
//     background: #48bb78;
//     color: white;
//   }
//   .section-modal .modal-actions .btn-primary:hover {
//     background: #38a169;
//     transform: scale(1.05);
//   }
//   .section-modal .modal-actions .btn-secondary {
//     background: #e2e8f0;
//     color: #4a5568;
//   }
//   .section-modal .modal-actions .btn-secondary:hover {
//     background: #cbd5e0;
//     transform: scale(1.05);
//   }
//   .section-modal .validation-msg {
//     font-size: 12px;
//     margin-top: 5px;
//   }
//   .section-modal .validation-msg.success { color: #48bb78; }
//   .section-modal .validation-msg.error { color: #fc8181; }

//   /* Floating Button */
//   .section-floating-btn {
//     position: fixed;
//     bottom: 30px;
//     right: 30px;
//     width: 70px;
//     height: 70px;
//     border-radius: 50%;
//     background: linear-gradient(to bottom, #48bb78, #38a169);
//     color: white;
//     font-size: 36px;
//     font-weight: bold;
//     border: none;
//     cursor: pointer;
//     box-shadow: 0 4px 20px rgba(72, 187, 120, 0.5);
//     transition: all 0.2s;
//     z-index: 1000;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   .section-floating-btn:hover {
//     transform: scale(1.1);
//     box-shadow: 0 6px 30px rgba(72, 187, 120, 0.7);
//   }
//   .section-floating-btn:active {
//     transform: scale(0.95);
//   }

//   /* Shake Animation */
//   @keyframes shake {
//     0%, 100% { transform: translateX(0); }
//     25% { transform: translateX(-10px); }
//     75% { transform: translateX(10px); }
//   }
//   .shake {
//     animation: shake 0.4s ease-in-out;
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

//   /* Toast Notification Styles */
//   .toast-container {
//     position: fixed;
//     top: 20px;
//     right: 20px;
//     z-index: 9999;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     max-width: 400px;
//     width: 90%;
//   }
  
//   .toast-item {
//     padding: 15px 20px;
//     border-radius: 12px;
//     box-shadow: 0 4px 20px rgba(0,0,0,0.15);
//     animation: slideInRight 0.3s ease-out;
//     font-size: 14px;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     gap: 12px;
//     position: relative;
//   }
  
//   .toast-item.success {
//     background: #48bb78;
//     color: white;
//     border-left: 4px solid #2f855a;
//   }
  
//   .toast-item.error {
//     background: #fc8181;
//     color: white;
//     border-left: 4px solid #c53030;
//   }
  
//   .toast-item.info {
//     background: #4299e1;
//     color: white;
//     border-left: 4px solid #2b6cb0;
//   }
  
//   .toast-item .toast-icon {
//     font-size: 20px;
//     flex-shrink: 0;
//   }
  
//   .toast-item .toast-message {
//     flex: 1;
//     word-break: break-word;
//   }
  
//   .toast-item .toast-close {
//     background: transparent;
//     border: none;
//     color: white;
//     font-size: 20px;
//     cursor: pointer;
//     padding: 0 5px;
//     opacity: 0.8;
//     transition: opacity 0.2s;
//     flex-shrink: 0;
//   }
  
//   .toast-item .toast-close:hover {
//     opacity: 1;
//   }
  
//   @keyframes slideInRight {
//     from {
//       transform: translateX(100%);
//       opacity: 0;
//     }
//     to {
//       transform: translateX(0);
//       opacity: 1;
//     }
//   }
  
//   @keyframes slideOutRight {
//     from {
//       transform: translateX(0);
//       opacity: 1;
//     }
//     to {
//       transform: translateX(100%);
//       opacity: 0;
//     }
//   }
  
//   .toast-item.removing {
//     animation: slideOutRight 0.3s ease-in forwards;
//   }
// `;

// // ---------- Color Palette ----------
// const CHART_COLORS = [
//   '#4CAF50', '#2196F3', '#FF9800', '#E91E63',
//   '#9C27B0', '#00BCD4', '#FF5722', '#8BC34A',
//   '#3F51B5', '#FFC107', '#795548', '#607D8B'
// ];

// // ---------- Main Component ----------
// const SectionManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const getTranslations = (language) => {
//     const translations = {
//       en: {
//         title: { manageSections: 'Manage Sections' },
//         header: { title: '📋 Manage Sections' },
//         stat: {
//           totalSections: 'Total Sections',
//           activeSections: 'Active Sections',
//           todayAdded: 'Today Added'
//         },
//         btn: {
//           table: 'Table',
//           cards: 'Cards',
//           refresh: 'Refresh',
//           export: 'Export CSV',
//           add: 'Add',
//           edit: 'Edit',
//           delete: 'Delete',
//           save: 'Save',
//           cancel: 'Cancel',
//           yes: 'Yes',
//           no: 'No'
//         },
//         label: {
//           showing: 'Showing',
//           records: 'records',
//           noSections: 'No sections found',
//           created: 'Created',
//           addNew: 'Add New Section'
//         },
//         txt: {
//           search: 'Search sections',
//           sectionName: 'Section Name'
//         },
//         dialog: {
//           addSection: 'Add Section',
//           updateSection: 'Update Section',
//           updateHeader: 'Updating section',
//           sectionName: 'Section Name',
//           deleteConfirm: 'Are you sure you want to delete this section?'
//         },
//         status: {
//           ready: 'Ready',
//           loading: 'Loading...',
//           refreshing: 'Refreshing...',
//           added: 'Added successfully',
//           updated: 'Updated successfully',
//           deleted: 'Deleted successfully',
//           exported: 'Exported successfully'
//         },
//         alert: {
//           enterName: 'Please enter a section name',
//           invalidName: 'Name must start with 3 letters and may contain numbers',
//           sectionNameEmpty: 'Section name cannot be empty',
//           errorLoading: 'Error loading sections',
//           errorCreating: 'Error creating section',
//           errorUpdating: 'Error updating section',
//           errorDeleting: 'Error deleting section',
//           exportError: 'Error exporting data',
//           exportSuccess: 'Data exported successfully'
//         },
//         validation: {
//           validName: '✓ Valid name',
//           invalidName: '✗ Name must start with 3 letters'
//         },
//         quickAdd: {
//           hint: 'Quick add a new section',
//           placeholder: 'Enter section name...',
//           addBtn: 'Add Section'
//         },
//         confirm: {
//           delete: {
//             title: 'Confirm Delete',
//             content: 'Are you sure you want to delete this section?'
//           }
//         }
//       },
//       ar: {
//         title: { manageSections: 'إدارة الأقسام' },
//         header: { title: '📋 إدارة الأقسام' },
//         stat: {
//           totalSections: 'إجمالي الأقسام',
//           activeSections: 'الأقسام النشطة',
//           todayAdded: 'تمت إضافته اليوم'
//         },
//         btn: {
//           table: 'جدول',
//           cards: 'بطاقات',
//           refresh: 'تحديث',
//           export: 'تصدير CSV',
//           add: 'إضافة',
//           edit: 'تعديل',
//           delete: 'حذف',
//           save: 'حفظ',
//           cancel: 'إلغاء',
//           yes: 'نعم',
//           no: 'لا'
//         },
//         label: {
//           showing: 'عرض',
//           records: 'سجلات',
//           noSections: 'لا توجد أقسام',
//           created: 'تم الإنشاء',
//           addNew: 'إضافة قسم جديد'
//         },
//         txt: {
//           search: 'بحث عن الأقسام',
//           sectionName: 'اسم القسم'
//         },
//         dialog: {
//           addSection: 'إضافة قسم',
//           updateSection: 'تعديل قسم',
//           updateHeader: 'تعديل القسم',
//           sectionName: 'اسم القسم',
//           deleteConfirm: 'هل أنت متأكد من حذف هذا القسم؟'
//         },
//         status: {
//           ready: 'جاهز',
//           loading: 'جاري التحميل...',
//           refreshing: 'جاري التحديث...',
//           added: 'تمت الإضافة بنجاح',
//           updated: 'تم التعديل بنجاح',
//           deleted: 'تم الحذف بنجاح',
//           exported: 'تم التصدير بنجاح'
//         },
//         alert: {
//           enterName: 'يرجى إدخال اسم القسم',
//           invalidName: 'يجب أن يبدأ الاسم بـ 3 أحرف وقد يحتوي على أرقام',
//           sectionNameEmpty: 'لا يمكن أن يكون اسم القسم فارغاً',
//           errorLoading: 'خطأ في تحميل الأقسام',
//           errorCreating: 'خطأ في إنشاء القسم',
//           errorUpdating: 'خطأ في تحديث القسم',
//           errorDeleting: 'خطأ في حذف القسم',
//           exportError: 'خطأ في تصدير البيانات',
//           exportSuccess: 'تم تصدير البيانات بنجاح'
//         },
//         validation: {
//           validName: '✓ اسم صالح',
//           invalidName: '✗ يجب أن يبدأ الاسم بـ 3 أحرف'
//         },
//         quickAdd: {
//           hint: 'إضافة قسم سريعة',
//           placeholder: 'أدخل اسم القسم...',
//           addBtn: 'إضافة قسم'
//         },
//         confirm: {
//           delete: {
//             title: 'تأكيد الحذف',
//             content: 'هل أنت متأكد من حذف هذا القسم؟'
//           }
//         }
//       }
//     };
//     return translations[language] || translations.en;
//   };

//   const t = getTranslations(lang);

//   // ---------- State ----------
//   const [sections, setSections] = useState([]);
//   const [filteredSections, setFilteredSections] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [viewMode, setViewMode] = useState('table');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [stats, setStats] = useState({ total: 0, active: 0, today: 0 });

//   // Modal states
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [sectionName, setSectionName] = useState('');
//   const [updateName, setUpdateName] = useState('');
//   const [validationMsg, setValidationMsg] = useState(null);

//   // Toast state
//   const [toasts, setToasts] = useState([]);

//   // ---------- Helper Functions ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text: `● ${text}`, type });
//   }, []);

//   const isValidSectionName = (name) => {
//     return /^[A-Za-z][A-Za-z0-9 .-]*$/.test(name.trim());
//   };

//   const formatDate = (date) => {
//     if (!date) return '-';
//     return new Date(date).toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   // Toast functions
//   const showToast = useCallback((message, type = 'success', duration = 3000) => {
//     const id = Date.now() + Math.random();
//     setToasts(prev => [...prev, { id, message, type }]);
    
//     // Auto remove after duration
//     setTimeout(() => {
//       removeToast(id);
//     }, duration);
//   }, []);

//   const removeToast = useCallback((id) => {
//     setToasts(prev => prev.filter(toast => toast.id !== id));
//   }, []);

//   // ---------- API Calls ----------
//   const loadSections = useCallback(async () => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');

//     try {
//       const url = `${BASE_URL}/api/sections`;
//       //console.log('📤 Fetching sections:', url);
      
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
//       const data = await response.json();
//       const sectionsData = Array.isArray(data) ? data : [data];
      
//       setSections(sectionsData);
//       setFilteredSections(sectionsData);
      
//       // Update stats
//       const total = sectionsData.length;
//       const active = sectionsData.filter(s => s.active !== false).length;
//       const today = sectionsData.filter(s => {
//         const created = new Date(s.createdAt || Date.now());
//         const now = new Date();
//         return created.toDateString() === now.toDateString();
//       }).length;
      
//       setStats({ total, active, today });
//       setStatus(`${t.status.ready} (${total} ${t.label.records})`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Load error:', err);
//       setStatus(t.alert.errorLoading, 'error');
//       setSections([]);
//       setFilteredSections([]);
//       showToast(t.alert.errorLoading, 'error');
//     } finally {
//       setLoading(false);
//     }
//   }, [t, showToast]);

//   const createSection = useCallback(async (name) => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/sections`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ name: name.trim() })
//       });

//       const message = await response.text();

//       if (!response.ok) {
//         showToast(message || t.alert.errorCreating, 'error');
//         return;
//       }

//       setShowAddModal(false);
//       setSectionName("");
//       setValidationMsg(null);

//       await loadSections();

//       showToast(message || t.status.added, 'success');

//     } catch (err) {
//       //console.error(err);
//       showToast(err.message || t.alert.errorCreating, 'error');
//     }
//   }, [loadSections, t, showToast]);

//   const updateSection = useCallback(async (id, name) => {
//     try {
//       const url = `${BASE_URL}/api/sections/${id}`;
//       //console.log('📤 Updating section:', url);
      
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: name.trim() })
//       });

//       const message = await response.text();

//       if (!response.ok) {
//         showToast(message || t.alert.errorUpdating, 'error');
//         return;
//       }
      
//       setShowUpdateModal(false);
//       setUpdateName('');
//       setSelectedSection(null);
//       loadSections();
//       showToast(`✅ ${t.status.updated}`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Update error:', err);
//       showToast(err.message || t.alert.errorUpdating, 'error');
//     }
//   }, [loadSections, t, showToast]);

//   const deleteSection = useCallback(async (id) => {
//     try {
//       const url = `${BASE_URL}/api/sections/${id}`;
//       //console.log('📤 Deleting section:', url);
      
//       const response = await fetch(url, {
//         method: 'DELETE'
//       });
      
//       const message = await response.text();

//       if (!response.ok) {
//         showToast(message || t.alert.errorDeleting, 'error');
//         setShowDeleteModal(false);
//         setSelectedSection(null);
//         return;
//       }
      
//       setShowDeleteModal(false);
//       setSelectedSection(null);
//       loadSections();
//       showToast(`🗑️ ${t.status.deleted}`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Delete error:', err);
//       showToast(err.message || t.alert.errorDeleting, 'error');
//       setShowDeleteModal(false);
//       setSelectedSection(null);
//     }
//   }, [loadSections, t, showToast]);

//   const exportToCSV = useCallback(() => {
//     if (filteredSections.length === 0) {
//       showToast('No data to export', 'error');
//       return;
//     }

//     // Create CSV
//     const headers = 'ID,Section Name,Created At';
//     const rows = filteredSections.map(section => {
//       const createdAt = section.createdAt ? new Date(section.createdAt).toLocaleString() : new Date().toLocaleString();
//       return `${section.id},${section.name},${createdAt}`;
//     }).join('\n');

//     const csv = `${headers}\n${rows}`;
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `sections_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);

//     showToast(`📥 ${t.status.exported}`, 'success');
//   }, [filteredSections, t, showToast]);

//   // ---------- Handlers ----------
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
    
//     if (query.trim() === '') {
//       setFilteredSections(sections);
//     } else {
//       const filtered = sections.filter(section => {
//         return (
//           section.name.toLowerCase().includes(query) ||
//           String(section.id).includes(query)
//         );
//       });
//       setFilteredSections(filtered);
//     }
//   };

//   const handleViewToggle = (mode) => {
//     setViewMode(mode);
//   };

//   const handleQuickAdd = () => {
//     const name = sectionName.trim();
    
//     if (name === '') {
//       showToast(t.alert.enterName, 'error');
//       return;
//     }
    
//     if (!isValidSectionName(name)) {
//       showToast(t.alert.invalidName, 'error');
//       return;
//     }
    
//     createSection(name);
//   };

//   const handleOpenUpdateModal = (section) => {
//     setSelectedSection(section);
//     setUpdateName(section.name);
//     setShowUpdateModal(true);
//   };

//   const handleOpenDeleteModal = (section) => {
//     setSelectedSection(section);
//     setShowDeleteModal(true);
//   };

//   const handleUpdateSubmit = () => {
//     const name = updateName.trim();
    
//     if (name === '') {
//       showToast(t.alert.sectionNameEmpty, 'error');
//       return;
//     }
    
//     if (!isValidSectionName(name)) {
//       showToast(t.alert.invalidName, 'error');
//       return;
//     }
    
//     updateSection(selectedSection.id, name);
//   };

//   const handleDeleteConfirm = () => {
//     deleteSection(selectedSection.id);
//   };

//   // ---------- Effects ----------
//   const isFirstLoad = useRef(true);

//   useEffect(() => {
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       loadSections();
//     }
//   }, [loadSections]);

//   // Update status when language changes
//   useEffect(() => {
//     setStatus(t.status.ready, 'success');
//   }, [t, setStatus]);

//   // ---------- Render Components ----------
//   const renderStats = () => {
//     const cards = [
//       { key: 'total', label: t.stat.totalSections, value: stats.total, icon: '📊', cls: 'total' },
//       { key: 'active', label: t.stat.activeSections, value: stats.active, icon: '✅', cls: 'active' },
//       { key: 'today', label: t.stat.todayAdded, value: stats.today, icon: '➕', cls: 'today' }
//     ];

//     return (
//       <div className="section-stats">
//         {cards.map((card) => (
//           <div key={card.key} className={`stat-card ${card.cls}`}>
//             <div className="icon">{card.icon}</div>
//             <div className="value">{card.value}</div>
//             <div className="label">{card.label}</div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTable = () => {
//     if (filteredSections.length === 0) {
//       return <div className="section-empty">📭 {t.label.noSections}</div>;
//     }

//     return (
//       <div className="section-table-wrapper">
//         <table className="section-table">
//           <thead>
//             <tr>
//               <th style={{ width: '80px' }}>#</th>
//               <th>{t.txt.sectionName}</th>
//               <th style={{ width: '160px' }}>{t.label.created}</th>
//               <th style={{ width: '180px' }}>{t.btn.add}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSections.map((section) => (
//               <tr key={section.id}>
//                 <td>{section.id}</td>
//                 <td style={{ fontWeight: '500', color: '#2d3748' }}>{section.name}</td>
//                 <td>
//                   {section.createdAt ? formatDate(section.createdAt) : '-'}
//                 </td>
//                 <td>
//                   <div className="action-buttons">
//                     <button 
//                       className="btn-edit"
//                       onClick={() => handleOpenUpdateModal(section)}
//                     >
//                       ✏️ {t.btn.edit}
//                     </button>
//                     <button 
//                       className="btn-delete"
//                       onClick={() => handleOpenDeleteModal(section)}
//                     >
//                       🗑️ {t.btn.delete}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderCards = () => {
//     if (filteredSections.length === 0) {
//       return <div className="section-empty">📭 {t.label.noSections}</div>;
//     }

//     return (
//       <div className="section-card-grid">
//         {filteredSections.map((section) => (
//           <div key={section.id} className="section-card">
//             <div className="card-header">
//               <span className="card-id">#{section.id}</span>
//               <span className="card-name">{section.name}</span>
//             </div>
//             <div className="card-actions">
//               <button 
//                 className="btn-edit"
//                 onClick={() => handleOpenUpdateModal(section)}
//               >
//                 ✏️ {t.btn.edit}
//               </button>
//               <button 
//                 className="btn-delete"
//                 onClick={() => handleOpenDeleteModal(section)}
//               >
//                 🗑️ {t.btn.delete}
//               </button>
//             </div>
//             <div className="card-footer">
//               📅 {t.label.created}: {section.createdAt ? formatDate(section.createdAt) : '-'}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // ---------- Toast Render ----------
//   const renderToasts = () => {
//     if (toasts.length === 0) return null;
    
//     return (
//       <div className="toast-container">
//         {toasts.map((toast) => (
//           <div key={toast.id} className={`toast-item ${toast.type}`}>
//             <span className="toast-icon">
//               {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
//             </span>
//             <span className="toast-message">{toast.message}</span>
//             <button 
//               className="toast-close" 
//               onClick={() => removeToast(toast.id)}
//             >
//               ×
//             </button>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // ---------- Modals ----------
//   const renderAddModal = () => {
//     if (!showAddModal) return null;

//     const handleNameChange = (e) => {
//       const value = e.target.value;
//       setSectionName(value);
      
//       if (value.length > 0) {
//         if (isValidSectionName(value)) {
//           setValidationMsg({ text: `✅ ${t.validation.validName}`, type: 'success' });
//         } else {
//           setValidationMsg({ text: `❌ ${t.validation.invalidName}`, type: 'error' });
//         }
//       } else {
//         setValidationMsg(null);
//       }
//     };

//     return (
//       <div className="section-modal-overlay">
//         <div className="section-modal slide-in">
//           <h3>➕ {t.dialog.addSection}</h3>
          
//           <div className="form-group">
//             <label>{t.dialog.sectionName}</label>
//             <input
//               type="text"
//               value={sectionName}
//               onChange={handleNameChange}
//               placeholder={t.txt.sectionName}
//               autoFocus
//             />
//             {validationMsg && (
//               <div className={`validation-msg ${validationMsg.type}`}>
//                 {validationMsg.text}
//               </div>
//             )}
//           </div>
          
//           <div className="modal-actions">
//             <button 
//               className="btn-secondary"
//               onClick={() => {
//                 setShowAddModal(false);
//                 setSectionName('');
//                 setValidationMsg(null);
//               }}
//             >
//               {t.btn.cancel}
//             </button>
//             <button 
//               className="btn-primary"
//               onClick={() => {
//                 const name = sectionName.trim();
//                 if (name === '') {
//                   showToast(t.alert.enterName, 'error');
//                   return;
//                 }
//                 if (!isValidSectionName(name)) {
//                   showToast(t.alert.invalidName, 'error');
//                   return;
//                 }
//                 createSection(name);
//               }}
//               disabled={!sectionName.trim() || !isValidSectionName(sectionName.trim())}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderUpdateModal = () => {
//     if (!showUpdateModal || !selectedSection) return null;

//     return (
//       <div className="section-modal-overlay">
//         <div className="section-modal slide-in">
//           <h3>✏️ {t.dialog.updateSection}</h3>
          
//           <div className="form-group">
//             <label>{t.dialog.sectionName}</label>
//             <input
//               type="text"
//               value={updateName}
//               onChange={(e) => setUpdateName(e.target.value)}
//               placeholder={t.txt.sectionName}
//               autoFocus
//             />
//           </div>
          
//           <div className="modal-actions">
//             <button 
//               className="btn-secondary"
//               onClick={() => {
//                 setShowUpdateModal(false);
//                 setSelectedSection(null);
//                 setUpdateName('');
//               }}
//             >
//               {t.btn.cancel}
//             </button>
//             <button 
//               className="btn-primary"
//               onClick={handleUpdateSubmit}
//               disabled={!updateName.trim() || !isValidSectionName(updateName.trim())}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderDeleteModal = () => {
//     if (!showDeleteModal || !selectedSection) return null;

//     return (
//       <div className="section-modal-overlay">
//         <div className="section-modal slide-in">
//           <h3>🗑️ {t.confirm.delete.title}</h3>
          
//           <div style={{ margin: '15px 0', fontSize: '14px', color: '#4a5568' }}>
//             {t.confirm.delete.content}
//             <div style={{ 
//               marginTop: '10px', 
//               fontWeight: 'bold', 
//               fontSize: '16px', 
//               color: '#e53e3e' 
//             }}>
//               "{selectedSection.name}"
//             </div>
//           </div>
          
//           <div className="modal-actions">
//             <button 
//               className="btn-secondary"
//               onClick={() => {
//                 setShowDeleteModal(false);
//                 setSelectedSection(null);
//               }}
//             >
//               {t.btn.no}
//             </button>
//             <button 
//               className="btn-primary"
//               style={{ background: '#fc8181' }}
//               onClick={handleDeleteConfirm}
//             >
//               {t.btn.yes}
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
//       {renderToasts()}
//       <div className="section-container">
//         {/* Header */}
//         <div className="section-header">
//           <div className="title">
//             {t.header.title}
//             <span className="underline"></span>
//           </div>
//           <div className="actions">
//             <button 
//               className="refresh" 
//               onClick={loadSections}
//               disabled={loading}
//             >
//               🔄 {t.btn.refresh}
//             </button>
//             <button 
//               className="export" 
//               onClick={exportToCSV}
//               disabled={loading || filteredSections.length === 0}
//             >
//               📥 {t.btn.export}
//             </button>
//             <span className={`status ${statusMessage.type}`}>
//               {statusMessage.text}
//             </span>
//           </div>
//         </div>

//         {/* Stats */}
//         {renderStats()}

//         {/* Search and Tools */}
//         <div className="section-tools">
//           <div className="search-box">
//             <span className="search-icon">🔍</span>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearch}
//               placeholder={t.txt.search + '...'}
//             />
//           </div>
          
//           <div className="view-toggle">
//             <button
//               className={viewMode === 'table' ? 'active' : ''}
//               onClick={() => handleViewToggle('table')}
//             >
//               📋 {t.btn.table}
//             </button>
//             <button
//               className={viewMode === 'cards' ? 'active' : ''}
//               onClick={() => handleViewToggle('cards')}
//             >
//               🃏 {t.btn.cards}
//             </button>
//           </div>
//         </div>

//         {/* Quick Add Section */}
//         <div className="section-quick-add">
//           <div className="header">
//             <span className="title">🚀 {t.dialog.addSection}</span>
//             <span className="hint">— {t.quickAdd.hint}</span>
//           </div>
//           <div className="input-row">
//             <input
//               type="text"
//               value={sectionName}
//               onChange={(e) => setSectionName(e.target.value)}
//               placeholder={t.quickAdd.placeholder}
//               onKeyPress={(e) => e.key === 'Enter' && handleQuickAdd()}
//             />
//             <button onClick={handleQuickAdd}>
//               ➕ {t.quickAdd.addBtn}
//             </button>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="section-content">
//           {loading ? (
//             <div className="section-loading">⏳ {t.status.loading}</div>
//           ) : (
//             viewMode === 'table' ? renderTable() : renderCards()
//           )}
//         </div>

//         {/* Status Bar */}
//         <div className="section-status-bar">
//           <span className={`status-msg ${statusMessage.type}`}>
//             {statusMessage.text}
//           </span>
//           <span className="spacer"></span>
//           <span className="time">
//             🕐 {new Date().toLocaleTimeString()}
//           </span>
//         </div>

//         {/* Floating Add Button */}
//         <button 
//           className="section-floating-btn"
//           onClick={() => {
//             setSectionName('');
//             setValidationMsg(null);
//             setShowAddModal(true);
//           }}
//         >
//           +
//         </button>

//         {/* Modals */}
//         {renderAddModal()}
//         {renderUpdateModal()}
//         {renderDeleteModal()}
//       </div>
//     </>
//   );
// };

// export default SectionManagementScreen; 12072026 4:00 pm

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Color Palette ----------
const CHART_COLORS = [
  '#4CAF50', '#2196F3', '#FF9800', '#E91E63',
  '#9C27B0', '#00BCD4', '#FF5722', '#8BC34A',
  '#3F51B5', '#FFC107', '#795548', '#607D8B'
];

// ---------- Main Component ----------
const SectionManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
  // ---------- Translations ----------
  const getTranslations = (language) => {
    const translations = {
      en: {
        title: { manageSections: 'Manage Sections' },
        header: { title: '📋 Manage Sections' },
        stat: {
          totalSections: 'Total Sections',
          activeSections: 'Active Sections',
          todayAdded: 'Today Added'
        },
        btn: {
          table: 'Table',
          cards: 'Cards',
          refresh: 'Refresh',
          export: 'Export CSV',
          add: 'Add',
          edit: 'Edit',
          delete: 'Delete',
          save: 'Save',
          cancel: 'Cancel',
          yes: 'Yes',
          no: 'No'
        },
        label: {
          showing: 'Showing',
          records: 'records',
          noSections: 'No sections found',
          created: 'Created',
          addNew: 'Add New Section'
        },
        txt: {
          search: 'Search sections',
          sectionName: 'Section Name'
        },
        dialog: {
          addSection: 'Add Section',
          updateSection: 'Update Section',
          updateHeader: 'Updating section',
          sectionName: 'Section Name',
          deleteConfirm: 'Are you sure you want to delete this section?'
        },
        status: {
          ready: 'Ready',
          loading: 'Loading...',
          refreshing: 'Refreshing...',
          added: 'Added successfully',
          updated: 'Updated successfully',
          deleted: 'Deleted successfully',
          exported: 'Exported successfully'
        },
        alert: {
          enterName: 'Please enter a section name',
          invalidName: 'Name must start with 3 letters and may contain numbers',
          sectionNameEmpty: 'Section name cannot be empty',
          errorLoading: 'Error loading sections',
          errorCreating: 'Error creating section',
          errorUpdating: 'Error updating section',
          errorDeleting: 'Error deleting section',
          exportError: 'Error exporting data',
          exportSuccess: 'Data exported successfully'
        },
        validation: {
          validName: '✓ Valid name',
          invalidName: '✗ Name must start with 3 letters'
        },
        quickAdd: {
          hint: 'Quick add a new section',
          placeholder: 'Enter section name...',
          addBtn: 'Add Section'
        },
        confirm: {
          delete: {
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this section?'
          }
        }
      },
      ar: {
        title: { manageSections: 'إدارة الأقسام' },
        header: { title: '📋 إدارة الأقسام' },
        stat: {
          totalSections: 'إجمالي الأقسام',
          activeSections: 'الأقسام النشطة',
          todayAdded: 'تمت إضافته اليوم'
        },
        btn: {
          table: 'جدول',
          cards: 'بطاقات',
          refresh: 'تحديث',
          export: 'تصدير CSV',
          add: 'إضافة',
          edit: 'تعديل',
          delete: 'حذف',
          save: 'حفظ',
          cancel: 'إلغاء',
          yes: 'نعم',
          no: 'لا'
        },
        label: {
          showing: 'عرض',
          records: 'سجلات',
          noSections: 'لا توجد أقسام',
          created: 'تم الإنشاء',
          addNew: 'إضافة قسم جديد'
        },
        txt: {
          search: 'بحث عن الأقسام',
          sectionName: 'اسم القسم'
        },
        dialog: {
          addSection: 'إضافة قسم',
          updateSection: 'تعديل قسم',
          updateHeader: 'تعديل القسم',
          sectionName: 'اسم القسم',
          deleteConfirm: 'هل أنت متأكد من حذف هذا القسم؟'
        },
        status: {
          ready: 'جاهز',
          loading: 'جاري التحميل...',
          refreshing: 'جاري التحديث...',
          added: 'تمت الإضافة بنجاح',
          updated: 'تم التعديل بنجاح',
          deleted: 'تم الحذف بنجاح',
          exported: 'تم التصدير بنجاح'
        },
        alert: {
          enterName: 'يرجى إدخال اسم القسم',
          invalidName: 'يجب أن يبدأ الاسم بـ 3 أحرف وقد يحتوي على أرقام',
          sectionNameEmpty: 'لا يمكن أن يكون اسم القسم فارغاً',
          errorLoading: 'خطأ في تحميل الأقسام',
          errorCreating: 'خطأ في إنشاء القسم',
          errorUpdating: 'خطأ في تحديث القسم',
          errorDeleting: 'خطأ في حذف القسم',
          exportError: 'خطأ في تصدير البيانات',
          exportSuccess: 'تم تصدير البيانات بنجاح'
        },
        validation: {
          validName: '✓ اسم صالح',
          invalidName: '✗ يجب أن يبدأ الاسم بـ 3 أحرف'
        },
        quickAdd: {
          hint: 'إضافة قسم سريعة',
          placeholder: 'أدخل اسم القسم...',
          addBtn: 'إضافة قسم'
        },
        confirm: {
          delete: {
            title: 'تأكيد الحذف',
            content: 'هل أنت متأكد من حذف هذا القسم؟'
          }
        }
      }
    };
    return translations[language] || translations.en;
  };

  const t = getTranslations(lang);

  // ---------- State ----------
  const [sections, setSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
  const [stats, setStats] = useState({ total: 0, active: 0, today: 0 });

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [sectionName, setSectionName] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [validationMsg, setValidationMsg] = useState(null);

  // Toast state
  const [toasts, setToasts] = useState([]);

  // ---------- Helper Functions ----------
  const setStatus = useCallback((text, type = 'success') => {
    setStatusMessage({ text: `● ${text}`, type });
  }, []);

  const isValidSectionName = (name) => {
    return /^[A-Za-z][A-Za-z0-9 .-]*$/.test(name.trim());
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Toast functions
  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // ---------- API Calls ----------
  const loadSections = useCallback(async () => {
    setLoading(true);
    setStatus(t.status.loading, 'loading');

    try {
      const url = `${BASE_URL}/api/sections`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const sectionsData = Array.isArray(data) ? data : [data];
      
      setSections(sectionsData);
      setFilteredSections(sectionsData);
      
      const total = sectionsData.length;
      const active = sectionsData.filter(s => s.active !== false).length;
      const today = sectionsData.filter(s => {
        const created = new Date(s.createdAt || Date.now());
        const now = new Date();
        return created.toDateString() === now.toDateString();
      }).length;
      
      setStats({ total, active, today });
      setStatus(`${t.status.ready} (${total} ${t.label.records})`, 'success');
      
    } catch (err) {
      setStatus(t.alert.errorLoading, 'error');
      setSections([]);
      setFilteredSections([]);
      showToast(t.alert.errorLoading, 'error');
    } finally {
      setLoading(false);
    }
  }, [t, showToast]);

  const createSection = useCallback(async (name) => {
    try {
      const response = await fetch(`${BASE_URL}/api/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name.trim() })
      });

      const message = await response.text();

      if (!response.ok) {
        showToast(message || t.alert.errorCreating, 'error');
        return;
      }

      setShowAddModal(false);
      setSectionName("");
      setValidationMsg(null);

      await loadSections();

      showToast(message || t.status.added, 'success');

    } catch (err) {
      showToast(err.message || t.alert.errorCreating, 'error');
    }
  }, [loadSections, t, showToast]);

  const updateSection = useCallback(async (id, name) => {
    try {
      const url = `${BASE_URL}/api/sections/${id}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      });

      const message = await response.text();

      if (!response.ok) {
        showToast(message || t.alert.errorUpdating, 'error');
        return;
      }
      
      setShowUpdateModal(false);
      setUpdateName('');
      setSelectedSection(null);
      loadSections();
      showToast(`✅ ${t.status.updated}`, 'success');
      
    } catch (err) {
      showToast(err.message || t.alert.errorUpdating, 'error');
    }
  }, [loadSections, t, showToast]);

  const deleteSection = useCallback(async (id) => {
    try {
      const url = `${BASE_URL}/api/sections/${id}`;
      
      const response = await fetch(url, {
        method: 'DELETE'
      });
      
      const message = await response.text();

      if (!response.ok) {
        showToast(message || t.alert.errorDeleting, 'error');
        setShowDeleteModal(false);
        setSelectedSection(null);
        return;
      }
      
      setShowDeleteModal(false);
      setSelectedSection(null);
      loadSections();
      showToast(`🗑️ ${t.status.deleted}`, 'success');
      
    } catch (err) {
      showToast(err.message || t.alert.errorDeleting, 'error');
      setShowDeleteModal(false);
      setSelectedSection(null);
    }
  }, [loadSections, t, showToast]);

  const exportToCSV = useCallback(() => {
    if (filteredSections.length === 0) {
      showToast('No data to export', 'error');
      return;
    }

    const headers = 'ID,Section Name,Created At';
    const rows = filteredSections.map(section => {
      const createdAt = section.createdAt ? new Date(section.createdAt).toLocaleString() : new Date().toLocaleString();
      return `${section.id},${section.name},${createdAt}`;
    }).join('\n');

    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sections_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    showToast(`📥 ${t.status.exported}`, 'success');
  }, [filteredSections, t, showToast]);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredSections(sections);
    } else {
      const filtered = sections.filter(section => {
        return (
          section.name.toLowerCase().includes(query) ||
          String(section.id).includes(query)
        );
      });
      setFilteredSections(filtered);
    }
  };

  const handleViewToggle = (mode) => {
    setViewMode(mode);
  };

  const handleQuickAdd = () => {
    const name = sectionName.trim();
    
    if (name === '') {
      showToast(t.alert.enterName, 'error');
      return;
    }
    
    if (!isValidSectionName(name)) {
      showToast(t.alert.invalidName, 'error');
      return;
    }
    
    createSection(name);
  };

  const handleOpenUpdateModal = (section) => {
    setSelectedSection(section);
    setUpdateName(section.name);
    setShowUpdateModal(true);
  };

  const handleOpenDeleteModal = (section) => {
    setSelectedSection(section);
    setShowDeleteModal(true);
  };

  const handleUpdateSubmit = () => {
    const name = updateName.trim();
    
    if (name === '') {
      showToast(t.alert.sectionNameEmpty, 'error');
      return;
    }
    
    if (!isValidSectionName(name)) {
      showToast(t.alert.invalidName, 'error');
      return;
    }
    
    updateSection(selectedSection.id, name);
  };

  const handleDeleteConfirm = () => {
    deleteSection(selectedSection.id);
  };

  // ---------- Effects ----------
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      loadSections();
    }
  }, [loadSections]);

  useEffect(() => {
    setStatus(t.status.ready, 'success');
  }, [t, setStatus]);

  // ---------- Render ----------
  return (
    <>
      <style>{`
        /* ==================== SECTION MANAGEMENT STYLES ==================== */
        .section-container {
          padding: 20px;
          background: linear-gradient(to bottom, #f0f4f8, #e2e8f0);
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        /* Header */
        .section-header {
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

        .section-header .title {
          font-size: 28px;
          font-weight: bold;
          color: #1a202c;
        }

        .section-header .title .underline {
          display: block;
          height: 3px;
          width: 60px;
          background: linear-gradient(to right, #4299e1, #2b6cb0);
          border-radius: 2px;
          margin-top: 5px;
        }

        .section-header .actions {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .section-header .actions button {
          padding: 8px 18px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
          color: white;
          min-height: 38px;
        }

        .section-header .actions button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .section-header .actions button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .section-header .actions button.refresh { background: #4299e1; }
        .section-header .actions button.refresh:hover:not(:disabled) { background: #2b6cb0; }
        .section-header .actions button.export { background: #48bb78; }
        .section-header .actions button.export:hover:not(:disabled) { background: #38a169; }

        .section-header .status {
          font-size: 12px;
          color: #27ae60;
        }

        .section-header .status.error { color: #e74c3c; }
        .section-header .status.loading { color: #f39c12; }

        /* Stats Cards */
        .section-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
        }

        .section-stats .stat-card {
          padding: 15px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border-left: 4px solid #4299e1;
          transition: all 0.2s;
          cursor: pointer;
        }

        .section-stats .stat-card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }

        .section-stats .stat-card .icon { font-size: 24px; }
        .section-stats .stat-card .value { font-size: 24px; font-weight: bold; }
        .section-stats .stat-card .label { font-size: 12px; color: #718096; }
        .section-stats .stat-card.total { border-color: #4299e1; }
        .section-stats .stat-card.total .value { color: #4299e1; }
        .section-stats .stat-card.active { border-color: #48bb78; }
        .section-stats .stat-card.active .value { color: #48bb78; }
        .section-stats .stat-card.today { border-color: #ed8936; }
        .section-stats .stat-card.today .value { color: #ed8936; }

        /* Search and Tools */
        .section-tools {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          flex-wrap: wrap;
        }

        .section-tools .search-box {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 25px;
          border: 1px solid #e2e8f0;
          padding: 5px 15px;
          flex: 1;
          min-width: 200px;
        }

        .section-tools .search-box input {
          border: none;
          outline: none;
          padding: 8px 5px;
          font-size: 14px;
          flex: 1;
          background: transparent;
          min-height: 38px;
        }

        .section-tools .search-box .search-icon {
          font-size: 14px;
          color: #a0aec0;
        }

        .section-tools .view-toggle {
          display: flex;
          gap: 5px;
        }

        .section-tools .view-toggle button {
          padding: 6px 15px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
          min-height: 38px;
        }

        .section-tools .view-toggle button.active {
          background: #4299e1;
          color: white;
          border-color: #4299e1;
        }

        .section-tools .view-toggle button:hover:not(.active) {
          background: #f7fafc;
        }

        /* Content Area */
        .section-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          padding: 15px;
          min-height: 400px;
        }

        /* Table View */
        .section-table-wrapper {
          overflow-x: auto;
          max-height: 500px;
          -webkit-overflow-scrolling: touch;
        }

        .section-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 400px;
        }

        .section-table th {
          background: #f8f9fa;
          padding: 12px 15px;
          text-align: left;
          font-weight: bold;
          color: #2d3748;
          border-bottom: 2px solid #e2e8f0;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .section-table td {
          padding: 10px 15px;
          border-bottom: 1px solid #edf2f7;
        }

        .section-table tr:hover td {
          background: #f7fafc;
        }

        .section-table .action-buttons {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .section-table .action-buttons button {
          padding: 4px 12px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 12px;
          color: white;
          min-height: 30px;
        }

        .section-table .action-buttons button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .section-table .action-buttons .btn-edit { background: #4299e1; }
        .section-table .action-buttons .btn-edit:hover:not(:disabled) { background: #3182ce; }
        .section-table .action-buttons .btn-delete { background: #fc8181; }
        .section-table .action-buttons .btn-delete:hover:not(:disabled) { background: #f56565; }

        /* Card View */
        .section-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
          padding: 5px;
        }

        .section-card {
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border: 1px solid #edf2f7;
          transition: all 0.2s;
          cursor: pointer;
        }

        .section-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 20px rgba(66, 153, 225, 0.15);
          border-color: #4299e1;
          border-width: 2px;
        }

        .section-card .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .section-card .card-id {
          background: #4299e1;
          color: white;
          padding: 2px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }

        .section-card .card-name {
          font-size: 16px;
          font-weight: bold;
          color: #2d3748;
        }

        .section-card .card-actions {
          display: flex;
          gap: 5px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .section-card .card-actions button {
          padding: 4px 12px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 12px;
          color: white;
          min-height: 30px;
        }

        .section-card .card-actions button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .section-card .card-actions .btn-edit { background: #4299e1; }
        .section-card .card-actions .btn-edit:hover:not(:disabled) { background: #3182ce; }
        .section-card .card-actions .btn-delete { background: #fc8181; }
        .section-card .card-actions .btn-delete:hover:not(:disabled) { background: #f56565; }

        .section-card .card-footer {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #e2e8f0;
          font-size: 12px;
          color: #a0aec0;
        }

        /* Quick Add Section */
        .section-quick-add {
          padding: 15px 20px;
          background: linear-gradient(to right, #ebf8ff, #bee3f8);
          border-radius: 12px;
          border: 2px solid #4299e1;
          box-shadow: 0 2px 10px rgba(66, 153, 225, 0.1);
        }

        .section-quick-add .header {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .section-quick-add .header .title {
          font-size: 16px;
          font-weight: bold;
          color: #2b6cb0;
        }

        .section-quick-add .header .hint {
          font-size: 12px;
          color: #4a5568;
          font-style: italic;
        }

        .section-quick-add .input-row {
          display: flex;
          gap: 10px;
          margin-top: 5px;
          align-items: center;
          flex-wrap: wrap;
        }

        .section-quick-add .input-row input {
          flex: 1;
          max-width: 300px;
          padding: 10px 15px;
          border-radius: 8px;
          border: 1px solid #4299e1;
          font-size: 14px;
          background: white;
          transition: all 0.2s;
          min-height: 42px;
        }

        .section-quick-add .input-row input:focus {
          outline: none;
          border-color: #2b6cb0;
          border-width: 2px;
          background: #f0f9ff;
        }

        .section-quick-add .input-row button {
          padding: 10px 25px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          color: white;
          background: #4299e1;
          box-shadow: 0 2px 8px rgba(66, 153, 225, 0.3);
          min-height: 42px;
        }

        .section-quick-add .input-row button:hover:not(:disabled) {
          background: #3182ce;
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.5);
        }

        .section-quick-add .input-row button:active {
          transform: scale(0.95);
        }

        /* Status Bar */
        .section-status-bar {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 8px 15px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 5px rgba(0,0,0,0.05);
          flex-wrap: wrap;
        }

        .section-status-bar .status-msg {
          font-size: 13px;
          font-weight: 500;
          color: #48bb78;
        }

        .section-status-bar .status-msg.error { color: #e74c3c; }
        .section-status-bar .status-msg.loading { color: #f39c12; }

        .section-status-bar .spacer { flex: 1; }
        .section-status-bar .time {
          font-size: 12px;
          color: #a0aec0;
        }

        /* Loading */
        .section-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          color: #7f8c8d;
        }

        /* Empty State */
        .section-empty {
          text-align: center;
          padding: 40px;
          color: #a0aec0;
          font-size: 16px;
        }

        /* Modal Overlay */
        .section-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          padding: 20px;
        }

        .section-modal {
          background: white;
          border-radius: 12px;
          padding: 25px;
          max-width: 450px;
          width: 100%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: slideIn 0.3s ease-out;
          max-height: 90vh;
          overflow-y: auto;
        }

        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .section-modal h3 {
          margin: 0 0 15px 0;
          color: #2d3748;
          font-size: 18px;
        }

        .section-modal .form-group {
          margin-bottom: 15px;
        }

        .section-modal .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          color: #2d3748;
          font-size: 14px;
        }

        .section-modal .form-group input {
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          background: white;
          transition: border-color 0.2s;
          min-height: 42px;
        }

        .section-modal .form-group input:focus {
          outline: none;
          border-color: #4299e1;
        }

        .section-modal .modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .section-modal .modal-actions button {
          padding: 8px 30px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          min-height: 38px;
        }

        .section-modal .modal-actions .btn-primary {
          background: #48bb78;
          color: white;
        }

        .section-modal .modal-actions .btn-primary:hover:not(:disabled) {
          background: #38a169;
          transform: scale(1.05);
        }

        .section-modal .modal-actions .btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .section-modal .modal-actions .btn-secondary:hover:not(:disabled) {
          background: #cbd5e0;
          transform: scale(1.05);
        }

        .section-modal .validation-msg {
          font-size: 12px;
          margin-top: 5px;
        }

        .section-modal .validation-msg.success { color: #48bb78; }
        .section-modal .validation-msg.error { color: #fc8181; }

        /* Floating Button */
        .section-floating-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(to bottom, #48bb78, #38a169);
          color: white;
          font-size: 36px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(72, 187, 120, 0.5);
          transition: all 0.2s;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-floating-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 30px rgba(72, 187, 120, 0.7);
        }

        .section-floating-btn:active {
          transform: scale(0.95);
        }

        /* Toast Styles */
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 400px;
          width: 90%;
        }

        .toast-item {
          padding: 15px 20px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          animation: slideInRight 0.3s ease-out;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .toast-item.success {
          background: #48bb78;
          color: white;
          border-left: 4px solid #2f855a;
        }

        .toast-item.error {
          background: #fc8181;
          color: white;
          border-left: 4px solid #c53030;
        }

        .toast-item.info {
          background: #4299e1;
          color: white;
          border-left: 4px solid #2b6cb0;
        }

        .toast-item .toast-icon {
          font-size: 20px;
          flex-shrink: 0;
        }

        .toast-item .toast-message {
          flex: 1;
          word-break: break-word;
        }

        .toast-item .toast-close {
          background: transparent;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
          padding: 0 5px;
          opacity: 0.8;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }

        .toast-item .toast-close:hover {
          opacity: 1;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .section-container {
            padding: 12px;
          }

          .section-header {
            flex-direction: column;
            align-items: stretch;
            padding: 12px 16px;
          }

          .section-header .title {
            font-size: 22px;
          }

          .section-header .actions {
            justify-content: center;
          }

          .section-header .actions button {
            font-size: 12px;
            padding: 6px 14px;
            min-height: 34px;
          }

          .section-stats {
            grid-template-columns: 1fr 1fr;
          }

          .section-stats .stat-card {
            padding: 12px 15px;
          }

          .section-stats .stat-card .value {
            font-size: 20px;
          }

          .section-tools {
            flex-direction: column;
            align-items: stretch;
            padding: 10px 14px;
          }

          .section-tools .search-box {
            min-width: unset;
          }

          .section-tools .view-toggle {
            justify-content: center;
          }

          .section-tools .view-toggle button {
            flex: 1;
            text-align: center;
          }

          .section-quick-add {
            padding: 12px 14px;
          }

          .section-quick-add .input-row {
            flex-direction: column;
          }

          .section-quick-add .input-row input,
          .section-quick-add .input-row button {
            width: 100%;
            max-width: unset;
          }

          .section-content {
            padding: 10px;
            min-height: 300px;
          }

          .section-card-grid {
            grid-template-columns: 1fr;
          }

          .section-table {
            font-size: 12px;
            min-width: 350px;
          }

          .section-table th,
          .section-table td {
            padding: 6px 10px;
          }

          .section-modal {
            padding: 20px;
            max-width: 95%;
          }

          .section-modal .modal-actions {
            flex-direction: column;
          }

          .section-modal .modal-actions button {
            width: 100%;
          }

          .section-status-bar {
            flex-direction: column;
            text-align: center;
          }

          .section-floating-btn {
            width: 60px;
            height: 60px;
            font-size: 30px;
            bottom: 20px;
            right: 20px;
          }
        }

        @media (max-width: 480px) {
          .section-container {
            padding: 8px;
          }

          .section-header {
            padding: 10px 12px;
          }

          .section-header .title {
            font-size: 18px;
          }

          .section-header .actions button {
            font-size: 11px;
            padding: 4px 10px;
            min-height: 30px;
          }

          .section-stats {
            grid-template-columns: 1fr;
          }

          .section-stats .stat-card {
            padding: 10px 12px;
          }

          .section-stats .stat-card .value {
            font-size: 18px;
          }

          .section-tools {
            padding: 8px 10px;
          }

          .section-tools .search-box input {
            font-size: 15px;
          }

          .section-tools .view-toggle button {
            font-size: 11px;
            padding: 4px 10px;
            min-height: 30px;
          }

          .section-quick-add {
            padding: 10px 12px;
          }

          .section-quick-add .header .title {
            font-size: 14px;
          }

          .section-quick-add .header .hint {
            font-size: 11px;
          }

          .section-quick-add .input-row input,
          .section-quick-add .input-row button {
            font-size: 15px;
            min-height: 38px;
          }

          .section-content {
            padding: 8px;
            min-height: 250px;
          }

          .section-table {
            font-size: 11px;
            min-width: 300px;
          }

          .section-table th,
          .section-table td {
            padding: 4px 8px;
          }

          .section-table .action-buttons button {
            font-size: 10px;
            padding: 3px 8px;
            min-height: 24px;
          }

          .section-card {
            padding: 12px;
          }

          .section-card .card-name {
            font-size: 14px;
          }

          .section-card .card-actions button {
            font-size: 10px;
            padding: 3px 8px;
            min-height: 24px;
          }

          .section-modal {
            padding: 16px;
          }

          .section-modal h3 {
            font-size: 16px;
          }

          .section-modal .form-group label {
            font-size: 13px;
          }

          .section-modal .form-group input {
            font-size: 15px;
            min-height: 38px;
          }

          .section-modal .modal-actions button {
            font-size: 13px;
            padding: 6px 16px;
            min-height: 34px;
          }

          .section-status-bar {
            font-size: 12px;
            padding: 6px 10px;
          }

          .section-floating-btn {
            width: 50px;
            height: 50px;
            font-size: 24px;
            bottom: 15px;
            right: 15px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .section-stats {
            grid-template-columns: repeat(3, 1fr);
          }

          .section-card-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Dark mode */
        @media (prefers-color-scheme: dark) {
          .section-container {
            background: #1a1a2e;
          }

          .section-header,
          .section-tools,
          .section-content,
          .section-status-bar,
          .section-stats .stat-card,
          .section-card {
            background: #2d2d44;
          }

          .section-header .title {
            color: #ecf0f1;
          }

          .section-header .status {
            color: #4CAF50;
          }

          .section-header .status.error {
            color: #e74c3c;
          }

          .section-header .status.loading {
            color: #f39c12;
          }

          .section-stats .stat-card .value {
            color: #4299e1;
          }

          .section-stats .stat-card.active .value {
            color: #4CAF50;
          }

          .section-stats .stat-card.today .value {
            color: #ed8936;
          }

          .section-stats .stat-card .label {
            color: #b0b0b0;
          }

          .section-tools .search-box {
            background: #1a1a2e;
            border-color: #3d3d5c;
          }

          .section-tools .search-box input {
            color: #ecf0f1;
          }

          .section-tools .search-box input::placeholder {
            color: #666;
          }

          .section-tools .view-toggle button {
            background: #1a1a2e;
            border-color: #3d3d5c;
            color: #b0b0b0;
          }

          .section-tools .view-toggle button.active {
            background: #4299e1;
            color: white;
            border-color: #4299e1;
          }

          .section-tools .view-toggle button:hover:not(.active) {
            background: #2d2d44;
          }

          .section-table th {
            background: #1a1a2e;
            color: #ecf0f1;
            border-bottom-color: #3d3d5c;
          }

          .section-table td {
            color: #b0b0b0;
            border-bottom-color: #3d3d5c;
          }

          .section-table tr:hover td {
            background: #1a1a2e;
          }

          .section-card {
            border-color: #3d3d5c;
          }

          .section-card:hover {
            border-color: #4299e1;
          }

          .section-card .card-name {
            color: #ecf0f1;
          }

          .section-card .card-footer {
            border-top-color: #3d3d5c;
            color: #666;
          }

          .section-quick-add {
            background: linear-gradient(to right, #1a2744, #1a2a3a);
            border-color: #4299e1;
          }

          .section-quick-add .header .title {
            color: #63b3ed;
          }

          .section-quick-add .header .hint {
            color: #b0b0b0;
          }

          .section-quick-add .input-row input {
            background: #1a1a2e;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .section-quick-add .input-row input:focus {
            border-color: #4299e1;
          }

          .section-quick-add .input-row input::placeholder {
            color: #666;
          }

          .section-quick-add .input-row button {
            background: #4299e1;
          }

          .section-quick-add .input-row button:hover:not(:disabled) {
            background: #3182ce;
          }

          .section-modal {
            background: #1a1a2e;
          }

          .section-modal h3 {
            color: #ecf0f1;
          }

          .section-modal .form-group label {
            color: #b0b0b0;
          }

          .section-modal .form-group input {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .section-modal .form-group input:focus {
            border-color: #4299e1;
          }

          .section-modal .modal-actions .btn-secondary {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .section-modal .modal-actions .btn-secondary:hover:not(:disabled) {
            background: #3d3d5c;
          }

          .section-modal .validation-msg.success { color: #4CAF50; }
          .section-modal .validation-msg.error { color: #fc8181; }

          .section-status-bar {
            border-color: #3d3d5c;
          }

          .section-status-bar .status-msg {
            color: #4CAF50;
          }

          .section-status-bar .status-msg.error {
            color: #e74c3c;
          }

          .section-status-bar .status-msg.loading {
            color: #f39c12;
          }

          .section-status-bar .time {
            color: #666;
          }

          .section-empty {
            color: #666;
          }

          .section-loading {
            color: #666;
          }

          .toast-item.success {
            background: #2f855a;
          }

          .toast-item.error {
            background: #c53030;
          }

          .toast-item.info {
            background: #2b6cb0;
          }
        }
      `}</style>

      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <span className="toast-icon">
              {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span className="toast-message">{toast.message}</span>
            <button 
              className="toast-close" 
              onClick={() => removeToast(toast.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="section-container">
        {/* Header */}
        <div className="section-header">
          <div className="title">
            {t.header.title}
            <span className="underline"></span>
          </div>
          <div className="actions">
            <button 
              className="refresh" 
              onClick={loadSections}
              disabled={loading}
            >
              🔄 {t.btn.refresh}
            </button>
            <button 
              className="export" 
              onClick={exportToCSV}
              disabled={loading || filteredSections.length === 0}
            >
              📥 {t.btn.export}
            </button>
            <span className={`status ${statusMessage.type}`}>
              {statusMessage.text}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="section-stats">
          <div className="stat-card total">
            <div className="icon">📊</div>
            <div className="value">{stats.total}</div>
            <div className="label">{t.stat.totalSections}</div>
          </div>
          <div className="stat-card active">
            <div className="icon">✅</div>
            <div className="value">{stats.active}</div>
            <div className="label">{t.stat.activeSections}</div>
          </div>
          <div className="stat-card today">
            <div className="icon">➕</div>
            <div className="value">{stats.today}</div>
            <div className="label">{t.stat.todayAdded}</div>
          </div>
        </div>

        {/* Search and Tools */}
        <div className="section-tools">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder={t.txt.search + '...'}
            />
          </div>
          
          <div className="view-toggle">
            <button
              className={viewMode === 'table' ? 'active' : ''}
              onClick={() => handleViewToggle('table')}
            >
              📋 {t.btn.table}
            </button>
            <button
              className={viewMode === 'cards' ? 'active' : ''}
              onClick={() => handleViewToggle('cards')}
            >
              🃏 {t.btn.cards}
            </button>
          </div>
        </div>

        {/* Quick Add Section */}
        <div className="section-quick-add">
          <div className="header">
            <span className="title">🚀 {t.dialog.addSection}</span>
            <span className="hint">— {t.quickAdd.hint}</span>
          </div>
          <div className="input-row">
            <input
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              placeholder={t.quickAdd.placeholder}
              onKeyPress={(e) => e.key === 'Enter' && handleQuickAdd()}
            />
            <button onClick={handleQuickAdd}>
              ➕ {t.quickAdd.addBtn}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="section-content">
          {loading ? (
            <div className="section-loading">⏳ {t.status.loading}</div>
          ) : filteredSections.length === 0 ? (
            <div className="section-empty">📭 {t.label.noSections}</div>
          ) : viewMode === 'table' ? (
            <div className="section-table-wrapper">
              <table className="section-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>#</th>
                    <th>{t.txt.sectionName}</th>
                    <th style={{ width: '160px' }}>{t.label.created}</th>
                    <th style={{ width: '180px' }}>{t.btn.add}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSections.map((section) => (
                    <tr key={section.id}>
                      <td>{section.id}</td>
                      <td style={{ fontWeight: '500', color: '#2d3748' }}>{section.name}</td>
                      <td>{section.createdAt ? formatDate(section.createdAt) : '-'}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-edit"
                            onClick={() => handleOpenUpdateModal(section)}
                          >
                            ✏️ {t.btn.edit}
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleOpenDeleteModal(section)}
                          >
                            🗑️ {t.btn.delete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="section-card-grid">
              {filteredSections.map((section) => (
                <div key={section.id} className="section-card">
                  <div className="card-header">
                    <span className="card-id">#{section.id}</span>
                    <span className="card-name">{section.name}</span>
                  </div>
                  <div className="card-actions">
                    <button 
                      className="btn-edit"
                      onClick={() => handleOpenUpdateModal(section)}
                    >
                      ✏️ {t.btn.edit}
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleOpenDeleteModal(section)}
                    >
                      🗑️ {t.btn.delete}
                    </button>
                  </div>
                  <div className="card-footer">
                    📅 {t.label.created}: {section.createdAt ? formatDate(section.createdAt) : '-'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="section-status-bar">
          <span className={`status-msg ${statusMessage.type}`}>
            {statusMessage.text}
          </span>
          <span className="spacer"></span>
          <span className="time">
            🕐 {new Date().toLocaleTimeString()}
          </span>
        </div>

        {/* Floating Add Button */}
        <button 
          className="section-floating-btn"
          onClick={() => {
            setSectionName('');
            setValidationMsg(null);
            setShowAddModal(true);
          }}
        >
          +
        </button>

        {/* Modals */}
        {showAddModal && (
          <div className="section-modal-overlay" onClick={() => {
            setShowAddModal(false);
            setSectionName('');
            setValidationMsg(null);
          }}>
            <div className="section-modal" onClick={(e) => e.stopPropagation()}>
              <h3>➕ {t.dialog.addSection}</h3>
              
              <div className="form-group">
                <label>{t.dialog.sectionName}</label>
                <input
                  type="text"
                  value={sectionName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSectionName(value);
                    
                    if (value.length > 0) {
                      if (isValidSectionName(value)) {
                        setValidationMsg({ text: `✅ ${t.validation.validName}`, type: 'success' });
                      } else {
                        setValidationMsg({ text: `❌ ${t.validation.invalidName}`, type: 'error' });
                      }
                    } else {
                      setValidationMsg(null);
                    }
                  }}
                  placeholder={t.txt.sectionName}
                  autoFocus
                />
                {validationMsg && (
                  <div className={`validation-msg ${validationMsg.type}`}>
                    {validationMsg.text}
                  </div>
                )}
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setShowAddModal(false);
                    setSectionName('');
                    setValidationMsg(null);
                  }}
                >
                  {t.btn.cancel}
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    const name = sectionName.trim();
                    if (name === '') {
                      showToast(t.alert.enterName, 'error');
                      return;
                    }
                    if (!isValidSectionName(name)) {
                      showToast(t.alert.invalidName, 'error');
                      return;
                    }
                    createSection(name);
                  }}
                  disabled={!sectionName.trim() || !isValidSectionName(sectionName.trim())}
                >
                  💾 {t.btn.save}
                </button>
              </div>
            </div>
          </div>
        )}

        {showUpdateModal && selectedSection && (
          <div className="section-modal-overlay" onClick={() => {
            setShowUpdateModal(false);
            setSelectedSection(null);
            setUpdateName('');
          }}>
            <div className="section-modal" onClick={(e) => e.stopPropagation()}>
              <h3>✏️ {t.dialog.updateSection}</h3>
              
              <div className="form-group">
                <label>{t.dialog.sectionName}</label>
                <input
                  type="text"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  placeholder={t.txt.sectionName}
                  autoFocus
                />
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setSelectedSection(null);
                    setUpdateName('');
                  }}
                >
                  {t.btn.cancel}
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleUpdateSubmit}
                  disabled={!updateName.trim() || !isValidSectionName(updateName.trim())}
                >
                  💾 {t.btn.save}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && selectedSection && (
          <div className="section-modal-overlay" onClick={() => {
            setShowDeleteModal(false);
            setSelectedSection(null);
          }}>
            <div className="section-modal" onClick={(e) => e.stopPropagation()}>
              <h3>🗑️ {t.confirm.delete.title}</h3>
              
              <div style={{ margin: '15px 0', fontSize: '14px', color: '#4a5568' }}>
                {t.confirm.delete.content}
                <div style={{ 
                  marginTop: '10px', 
                  fontWeight: 'bold', 
                  fontSize: '16px', 
                  color: '#e53e3e' 
                }}>
                  "{selectedSection.name}"
                </div>
              </div>
              
              <div className="modal-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedSection(null);
                  }}
                >
                  {t.btn.no}
                </button>
                <button 
                  className="btn-primary"
                  style={{ background: '#fc8181' }}
                  onClick={handleDeleteConfirm}
                >
                  {t.btn.yes}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionManagementScreen;