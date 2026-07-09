// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .room-container {
//     padding: 20px;
//     background: linear-gradient(to bottom, #f0f4f8, #e2e8f0);
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     display: flex;
//     flex-direction: column;
//     gap: 15px;
//   }
  
//   /* Header */
//   .room-header {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     padding: 15px 25px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//   }
//   .room-header .title {
//     font-size: 28px;
//     font-weight: bold;
//     color: #1a202c;
//   }
//   .room-header .title .underline {
//     display: block;
//     height: 3px;
//     width: 60px;
//     background: linear-gradient(to right, #4299e1, #2b6cb0);
//     border-radius: 2px;
//     margin-top: 5px;
//   }
//   .room-header .actions {
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
//   .room-header .actions button {
//     padding: 8px 18px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     color: white;
//   }
//   .room-header .actions button:hover {
//     transform: scale(1.05);
//   }
//   .room-header .actions button.refresh { background: #4299e1; }
//   .room-header .actions button.refresh:hover { background: #2b6cb0; }
//   .room-header .actions button.export { background: #48bb78; }
//   .room-header .actions button.export:hover { background: #38a169; }
//   .room-header .status {
//     font-size: 12px;
//     color: #27ae60;
//   }
//   .room-header .status.error { color: #e74c3c; }
//   .room-header .status.loading { color: #f39c12; }

//   /* Stats Cards */
//   .room-stats {
//     display: flex;
//     gap: 15px;
//     flex-wrap: wrap;
//   }
//   .room-stats .stat-card {
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
//   .room-stats .stat-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .room-stats .stat-card .icon { font-size: 24px; }
//   .room-stats .stat-card .value { font-size: 24px; font-weight: bold; }
//   .room-stats .stat-card .label { font-size: 12px; color: #718096; }
//   .room-stats .stat-card.total { border-color: #4299e1; }
//   .room-stats .stat-card.total .value { color: #4299e1; }
//   .room-stats .stat-card.active { border-color: #48bb78; }
//   .room-stats .stat-card.active .value { color: #48bb78; }
//   .room-stats .stat-card.today { border-color: #ed8936; }
//   .room-stats .stat-card.today .value { color: #ed8936; }

//   /* Search and Tools */
//   .room-tools {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     padding: 10px 20px;
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     flex-wrap: wrap;
//   }
//   .room-tools .search-box {
//     display: flex;
//     align-items: center;
//     background: white;
//     border-radius: 25px;
//     border: 1px solid #e2e8f0;
//     padding: 5px 15px;
//     flex: 1;
//     min-width: 200px;
//   }
//   .room-tools .search-box input {
//     border: none;
//     outline: none;
//     padding: 8px 5px;
//     font-size: 14px;
//     flex: 1;
//     background: transparent;
//   }
//   .room-tools .search-box .search-icon {
//     font-size: 14px;
//     color: #a0aec0;
//   }
//   .room-tools .view-toggle {
//     display: flex;
//     gap: 5px;
//   }
//   .room-tools .view-toggle button {
//     padding: 6px 15px;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     background: white;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//   }
//   .room-tools .view-toggle button.active {
//     background: #4299e1;
//     color: white;
//     border-color: #4299e1;
//   }
//   .room-tools .view-toggle button:hover:not(.active) {
//     background: #f7fafc;
//   }
//   .room-tools .spacer { flex: 1; }

//   /* Content Area */
//   .room-content {
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     padding: 15px;
//     min-height: 400px;
//   }

//   /* Table View */
//   .room-table-wrapper {
//     overflow-x: auto;
//     max-height: 500px;
//   }
//   .room-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .room-table th {
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
//   .room-table td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #edf2f7;
//   }
//   .room-table tr:hover td {
//     background: #f7fafc;
//   }
//   .room-table .action-buttons {
//     display: flex;
//     gap: 5px;
//   }
//   .room-table .action-buttons button {
//     padding: 4px 12px;
//     border: none;
//     border-radius: 6px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 12px;
//     color: white;
//   }
//   .room-table .action-buttons button:hover {
//     transform: scale(1.05);
//   }
//   .room-table .action-buttons .btn-edit { background: #4299e1; }
//   .room-table .action-buttons .btn-edit:hover { background: #3182ce; }
//   .room-table .action-buttons .btn-delete { background: #fc8181; }
//   .room-table .action-buttons .btn-delete:hover { background: #f56565; }

//   /* Card View */
//   .room-card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//     gap: 15px;
//     padding: 5px;
//   }
//   .room-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #edf2f7;
//     transition: all 0.2s;
//     cursor: pointer;
//   }
//   .room-card:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 4px 20px rgba(66, 153, 225, 0.15);
//     border-color: #4299e1;
//     border-width: 2px;
//   }
//   .room-card .card-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 10px;
//   }
//   .room-card .card-id {
//     background: #4299e1;
//     color: white;
//     padding: 2px 12px;
//     border-radius: 12px;
//     font-size: 12px;
//     font-weight: bold;
//   }
//   .room-card .card-number {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2d3748;
//   }
//   .room-card .card-section {
//     font-size: 14px;
//     color: #4a5568;
//   }
//   .room-card .card-actions {
//     display: flex;
//     gap: 5px;
//     margin-top: 10px;
//   }
//   .room-card .card-actions button {
//     padding: 4px 12px;
//     border: none;
//     border-radius: 6px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 12px;
//     color: white;
//   }
//   .room-card .card-actions button:hover {
//     transform: scale(1.05);
//   }
//   .room-card .card-actions .btn-edit { background: #4299e1; }
//   .room-card .card-actions .btn-edit:hover { background: #3182ce; }
//   .room-card .card-actions .btn-delete { background: #fc8181; }
//   .room-card .card-actions .btn-delete:hover { background: #f56565; }
//   .room-card .card-footer {
//     margin-top: 10px;
//     padding-top: 10px;
//     border-top: 1px solid #e2e8f0;
//     font-size: 12px;
//     color: #a0aec0;
//   }

//   /* Quick Add Section */
//   .room-quick-add {
//     padding: 15px 20px;
//     background: linear-gradient(to right, #ebf8ff, #bee3f8);
//     border-radius: 12px;
//     border: 2px solid #4299e1;
//     box-shadow: 0 2px 10px rgba(66, 153, 225, 0.1);
//   }
//   .room-quick-add .header {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//   }
//   .room-quick-add .header .title {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2b6cb0;
//   }
//   .room-quick-add .header .hint {
//     font-size: 12px;
//     color: #4a5568;
//     font-style: italic;
//   }
//   .room-quick-add .input-row {
//     display: flex;
//     gap: 10px;
//     margin-top: 5px;
//     align-items: center;
//     flex-wrap: wrap;
//   }
//   .room-quick-add .input-row select {
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #4299e1;
//     font-size: 14px;
//     background: white;
//     min-width: 200px;
//     height: 42px;
//   }
//   .room-quick-add .input-row select:focus {
//     outline: none;
//     border-color: #2b6cb0;
//     border-width: 2px;
//   }
//   .room-quick-add .input-row input {
//     flex: 1;
//     max-width: 300px;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #4299e1;
//     font-size: 14px;
//     background: white;
//     transition: all 0.2s;
//     height: 42px;
//   }
//   .room-quick-add .input-row input:focus {
//     outline: none;
//     border-color: #2b6cb0;
//     border-width: 2px;
//     background: #f0f9ff;
//   }
//   .room-quick-add .input-row button {
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
//     height: 42px;
//   }
//   .room-quick-add .input-row button:hover {
//     background: #3182ce;
//     transform: scale(1.05);
//     box-shadow: 0 4px 12px rgba(66, 153, 225, 0.5);
//   }
//   .room-quick-add .input-row button:active {
//     transform: scale(0.95);
//   }

//   /* Status Bar */
//   .room-status-bar {
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     padding: 8px 15px;
//     background: white;
//     border-radius: 8px;
//     box-shadow: 0 1px 5px rgba(0,0,0,0.05);
//   }
//   .room-status-bar .status-msg {
//     font-size: 13px;
//     font-weight: 500;
//     color: #48bb78;
//   }
//   .room-status-bar .status-msg.error { color: #e74c3c; }
//   .room-status-bar .status-msg.loading { color: #f39c12; }
//   .room-status-bar .spacer { flex: 1; }
//   .room-status-bar .time {
//     font-size: 12px;
//     color: #a0aec0;
//   }

//   /* Loading */
//   .room-loading {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     padding: 40px;
//     color: #7f8c8d;
//   }

//   /* Empty State */
//   .room-empty {
//     text-align: center;
//     padding: 40px;
//     color: #a0aec0;
//     font-size: 16px;
//   }

//   /* Modal Overlay */
//   .room-modal-overlay {
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
//   .room-modal {
//     background: white;
//     border-radius: 12px;
//     padding: 25px;
//     max-width: 450px;
//     width: 95%;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   }
//   .room-modal h3 {
//     margin: 0 0 15px 0;
//     color: #2d3748;
//     font-size: 18px;
//   }
//   .room-modal .form-group {
//     margin-bottom: 15px;
//   }
//   .room-modal .form-group label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
//     color: #2d3748;
//   }
//   .room-modal .form-group select {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//   }
//   .room-modal .form-group select:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .room-modal .form-group input {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//     transition: border-color 0.2s;
//   }
//   .room-modal .form-group input:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .room-modal .modal-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }
//   .room-modal .modal-actions button {
//     padding: 8px 30px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 14px;
//   }
//   .room-modal .modal-actions .btn-primary {
//     background: #48bb78;
//     color: white;
//   }
//   .room-modal .modal-actions .btn-primary:hover {
//     background: #38a169;
//     transform: scale(1.05);
//   }
//   .room-modal .modal-actions .btn-secondary {
//     background: #e2e8f0;
//     color: #4a5568;
//   }
//   .room-modal .modal-actions .btn-secondary:hover {
//     background: #cbd5e0;
//     transform: scale(1.05);
//   }
//   .room-modal .validation-msg {
//     font-size: 12px;
//     margin-top: 5px;
//   }
//   .room-modal .validation-msg.success { color: #48bb78; }
//   .room-modal .validation-msg.error { color: #fc8181; }

//   /* Floating Button */
//   .room-floating-btn {
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
//   .room-floating-btn:hover {
//     transform: scale(1.1);
//     box-shadow: 0 6px 30px rgba(72, 187, 120, 0.7);
//   }
//   .room-floating-btn:active {
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

// // ---------- Main Component ----------
// const RoomManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const getTranslations = (language) => {
//     const translations = {
//       en: {
//         title: { manageRooms: 'Manage Rooms' },
//         header: { title: '🏥 Manage Rooms' },
//         stat: {
//           totalRooms: 'Total Rooms',
//           activeRooms: 'Active Rooms',
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
//           noRooms: 'No rooms found',
//           created: 'Created',
//           addNew: 'Add New Room',
//           section: 'Section',
//           roomNumber: 'Room Number',
//           chooseSection: 'Choose section'
//         },
//         txt: {
//           search: 'Search rooms',
//           roomNumber: 'Room Number'
//         },
//         dialog: {
//           addRoom: 'Add Room',
//           updateRoom: 'Update Room',
//           updateHeader: 'Updating room',
//           sectionName: 'Section'
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
//           enterName: 'Please enter a room number',
//           invalidRoomName: 'Room number must start with 3 letters and may contain numbers',
//           roomNumberEmpty: 'Room number cannot be empty',
//           errorLoading: 'Error loading rooms',
//           errorCreating: 'Error creating room',
//           errorUpdating: 'Error updating room',
//           errorDeleting: 'Error deleting room',
//           exportError: 'Error exporting data',
//           exportSuccess: 'Data exported successfully',
//           info: 'Information'
//         },
//         col: {
//           roomNumber: 'Room Number',
//           section: 'Section',
//           actions: 'Actions'
//         },
//         validation: {
//           validName: '✓ Valid room number',
//           invalidName: '✗ Room number must start with 3 letters'
//         },
//         quickAdd: {
//           title: '🏥 Quick Add Room',
//           hint: 'Quick add a new room',
//           placeholder: 'Enter room number...',
//           addBtn: 'Add Room',
//           chooseSection: 'Choose section'
//         },
//         msg: {
//           selectSection: 'Please select a section',
//           enterRoomNumber: 'Please enter a room number',
//           invalidRoomName: 'Room number must start with 3 letters',
//           roomNumberEmpty: 'Room number cannot be empty'
//         },
//         confirm: {
//           delete: {
//             title: 'Confirm Delete',
//             content: 'Are you sure you want to delete this room?'
//           }
//         },
//         export: {
//           saveFile: 'Save CSV File'
//         }
//       },
//       ar: {
//         title: { manageRooms: 'إدارة الغرف' },
//         header: { title: '🏥 إدارة الغرف' },
//         stat: {
//           totalRooms: 'إجمالي الغرف',
//           activeRooms: 'الغرف النشطة',
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
//           noRooms: 'لا توجد غرف',
//           created: 'تم الإنشاء',
//           addNew: 'إضافة غرفة جديدة',
//           section: 'القسم',
//           roomNumber: 'رقم الغرفة',
//           chooseSection: 'اختر القسم'
//         },
//         txt: {
//           search: 'بحث عن الغرف',
//           roomNumber: 'رقم الغرفة'
//         },
//         dialog: {
//           addRoom: 'إضافة غرفة',
//           updateRoom: 'تعديل غرفة',
//           updateHeader: 'تعديل الغرفة',
//           sectionName: 'القسم'
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
//           enterName: 'يرجى إدخال رقم الغرفة',
//           invalidRoomName: 'يجب أن يبدأ رقم الغرفة بـ 3 أحرف وقد يحتوي على أرقام',
//           roomNumberEmpty: 'لا يمكن أن يكون رقم الغرفة فارغاً',
//           errorLoading: 'خطأ في تحميل الغرف',
//           errorCreating: 'خطأ في إنشاء الغرفة',
//           errorUpdating: 'خطأ في تحديث الغرفة',
//           errorDeleting: 'خطأ في حذف الغرفة',
//           exportError: 'خطأ في تصدير البيانات',
//           exportSuccess: 'تم تصدير البيانات بنجاح',
//           info: 'معلومات'
//         },
//         col: {
//           roomNumber: 'رقم الغرفة',
//           section: 'القسم',
//           actions: 'إجراءات'
//         },
//         validation: {
//           validName: '✓ رقم غرفة صالح',
//           invalidName: '✗ يجب أن يبدأ رقم الغرفة بـ 3 أحرف'
//         },
//         quickAdd: {
//           title: '🏥 إضافة غرفة سريعة',
//           hint: 'إضافة غرفة سريعة',
//           placeholder: 'أدخل رقم الغرفة...',
//           addBtn: 'إضافة غرفة',
//           chooseSection: 'اختر القسم'
//         },
//         msg: {
//           selectSection: 'يرجى اختيار قسم',
//           enterRoomNumber: 'يرجى إدخال رقم الغرفة',
//           invalidRoomName: 'يجب أن يبدأ رقم الغرفة بـ 3 أحرف',
//           roomNumberEmpty: 'لا يمكن أن يكون رقم الغرفة فارغاً'
//         },
//         confirm: {
//           delete: {
//             title: 'تأكيد الحذف',
//             content: 'هل أنت متأكد من حذف هذه الغرفة؟'
//           }
//         },
//         export: {
//           saveFile: 'حفظ ملف CSV'
//         }
//       }
//     };
//     return translations[language] || translations.en;
//   };

//   const t = getTranslations(lang);

//   // ---------- State ----------
//   const [rooms, setRooms] = useState([]);
//   const [filteredRooms, setFilteredRooms] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [viewMode, setViewMode] = useState('table');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
//   const [stats, setStats] = useState({ total: 0, active: 0, today: 0 });

//   // Modal states
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [roomNumber, setRoomNumber] = useState('');
//   const [updateRoomNumber, setUpdateRoomNumber] = useState('');
//   const [selectedSectionId, setSelectedSectionId] = useState('');
//   const [validationMsg, setValidationMsg] = useState(null);

//   // Quick add states
//   const [quickRoomNumber, setQuickRoomNumber] = useState('');
//   const [quickSectionId, setQuickSectionId] = useState('');

//   // ---------- Helper Functions ----------
//   const setStatus = useCallback((text, type = 'success') => {
//     setStatusMessage({ text: `● ${text}`, type });
//   }, []);

//   const isValidRoomName = (name) => {
//     return /^[A-Za-z]{3,}[A-Za-z0-9]*\d{0,3}$/.test(name);
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
//   const loadRooms = useCallback(async () => {
//     setLoading(true);
//     setStatus(t.status.loading, 'loading');

//     try {
//       const url = `${BASE_URL}/api/rooms`;
//       //console.log('📤 Fetching rooms:', url);
      
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
//       const data = await response.json();
//       const roomsData = Array.isArray(data) ? data : [data];
      
//       // Process rooms with section names
//       const processedRooms = roomsData.map(room => ({
//         id: room.id || 0,
//         roomNumber: room.roomNumber || '',
//         sectionName: room.section?.name || '',
//         sectionId: room.section?.id || null,
//         createdAt: room.createdAt || null
//       }));
      
//       setRooms(processedRooms);
//       setFilteredRooms(processedRooms);
      
//       // Update stats
//       const total = processedRooms.length;
//       const active = processedRooms.filter(r => r.sectionName !== '').length;
//       const today = processedRooms.filter(r => {
//         const created = new Date(r.createdAt || Date.now());
//         const now = new Date();
//         return created.toDateString() === now.toDateString();
//       }).length;
      
//       setStats({ total, active, today });
//       setStatus(`${t.status.ready} (${total} ${t.label.records})`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Load error:', err);
//       setStatus(t.alert.errorLoading, 'error');
//       setRooms([]);
//       setFilteredRooms([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [t]);

//   const loadSections = useCallback(async () => {
//     try {
//       const url = `${BASE_URL}/api/sections`;
//       //console.log('📤 Fetching sections:', url);
      
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
//       const data = await response.json();
//       const sectionsData = Array.isArray(data) ? data : [data];
      
//       setSections(sectionsData);
      
//     } catch (err) {
//       //console.error('🚨 Load sections error:', err);
//     }
//   }, []);

//   const createRoom = useCallback(async (roomNumber, sectionId) => {
//     try {
//       const url = `${BASE_URL}/api/rooms/section/${sectionId}`;
//       //console.log('📤 Creating room:', url);
      
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ roomNumber: roomNumber.trim() })
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP ${response.status}: ${errorText}`);
//       }
      
//       setShowAddModal(false);
//       setRoomNumber('');
//       setSelectedSectionId('');
//       setValidationMsg(null);
//       loadRooms();
//       setStatus(`✅ ${t.status.added}`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Create error:', err);
//       alert(t.alert.errorCreating);
//     }
//   }, [loadRooms, t]);

//   const updateRoom = useCallback(async (id, roomNumber) => {
//     try {
//       const url = `${BASE_URL}/api/rooms/${id}`;
//       //console.log('📤 Updating room:', url);
      
//       const response = await fetch(url, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ roomNumber: roomNumber.trim() })
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP ${response.status}: ${errorText}`);
//       }
      
//       setShowUpdateModal(false);
//       setUpdateRoomNumber('');
//       setSelectedRoom(null);
//       loadRooms();
//       setStatus(`✅ ${t.status.updated}`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Update error:', err);
//       alert(t.alert.errorUpdating);
//     }
//   }, [loadRooms, t]);

//   const deleteRoom = useCallback(async (id) => {
//     try {
//       const url = `${BASE_URL}/api/rooms/${id}`;
//       //console.log('📤 Deleting room:', url);
      
//       const response = await fetch(url, {
//         method: 'DELETE'
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP ${response.status}: ${errorText}`);
//       }
      
//       setShowDeleteModal(false);
//       setSelectedRoom(null);
//       loadRooms();
//       setStatus(`🗑️ ${t.status.deleted}`, 'success');
      
//     } catch (err) {
//       //console.error('🚨 Delete error:', err);
//       alert(t.alert.errorDeleting);
//     }
//   }, [loadRooms, t]);

//   // ---------- Export to CSV ----------
//   const exportToCSV = useCallback(() => {
//     if (filteredRooms.length === 0) {
//       alert('No data to export');
//       return;
//     }

//     // Create CSV
//     const headers = `ID,${t.col.roomNumber},${t.col.section},${t.label.created}`;
//     const rows = filteredRooms.map(room => {
//       const createdAt = room.createdAt ? new Date(room.createdAt).toLocaleString() : new Date().toLocaleString();
//       return `${room.id},${room.roomNumber},${room.sectionName},${createdAt}`;
//     }).join('\n');

//     const csv = `${headers}\n${rows}`;
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `rooms_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     URL.revokeObjectURL(url);

//     setStatus(`📥 ${t.status.exported}`, 'success');
//   }, [filteredRooms, t]);

//   // ---------- Handlers ----------
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
    
//     if (query.trim() === '') {
//       setFilteredRooms(rooms);
//     } else {
//       const filtered = rooms.filter(room => {
//         return (
//           room.roomNumber.toLowerCase().includes(query) ||
//           String(room.id).includes(query) ||
//           room.sectionName.toLowerCase().includes(query)
//         );
//       });
//       setFilteredRooms(filtered);
//     }
//   };

//   const handleViewToggle = (mode) => {
//     setViewMode(mode);
//   };

//   const handleQuickAdd = () => {
//     const roomNumber = quickRoomNumber.trim();
//     const sectionId = quickSectionId;
    
//     if (!sectionId) {
//       setStatus('⚠️ ' + t.msg.selectSection, 'error');
//       return;
//     }
    
//     if (roomNumber === '') {
//       setStatus('⚠️ ' + t.msg.enterRoomNumber, 'error');
//       return;
//     }
    
//     if (!isValidRoomName(roomNumber)) {
//       setStatus('⚠️ ' + t.msg.invalidRoomName, 'error');
//       return;
//     }
    
//     createRoom(roomNumber, parseInt(sectionId));
//     setQuickRoomNumber('');
//     setQuickSectionId('');
//   };

//   const handleOpenUpdateModal = (room) => {
//     setSelectedRoom(room);
//     setUpdateRoomNumber(room.roomNumber);
//     setShowUpdateModal(true);
//   };

//   const handleOpenDeleteModal = (room) => {
//     setSelectedRoom(room);
//     setShowDeleteModal(true);
//   };

//   const handleUpdateSubmit = () => {
//     const roomNumber = updateRoomNumber.trim();
    
//     if (roomNumber === '') {
//       alert(t.msg.roomNumberEmpty);
//       return;
//     }
    
//     if (!isValidRoomName(roomNumber)) {
//       alert(t.msg.invalidRoomName);
//       return;
//     }
    
//     updateRoom(selectedRoom.id, roomNumber);
//   };

//   const handleDeleteConfirm = () => {
//     deleteRoom(selectedRoom.id);
//   };

//   const handleAddRoomFromModal = () => {
//     const roomNumber = roomNumber.trim();
//     const sectionId = selectedSectionId;
    
//     if (!sectionId) {
//       alert(t.msg.selectSection);
//       return;
//     }
    
//     if (roomNumber === '') {
//       alert(t.msg.enterRoomNumber);
//       return;
//     }
    
//     if (!isValidRoomName(roomNumber)) {
//       alert(t.msg.invalidRoomName);
//       return;
//     }
    
//     createRoom(roomNumber, parseInt(sectionId));
//   };

//   // ---------- Effects ----------
//   const isFirstLoad = useRef(true);

//   useEffect(() => {
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       loadRooms();
//       loadSections();
//     }
//   }, [loadRooms, loadSections]);

//   // Update status when language changes
//   useEffect(() => {
//     setStatus(t.status.ready, 'success');
//   }, [t, setStatus]);

//   // ---------- Render Components ----------
//   const renderStats = () => {
//     const cards = [
//       { key: 'total', label: t.stat.totalRooms, value: stats.total, icon: '🏥', cls: 'total' },
//       { key: 'active', label: t.stat.activeRooms, value: stats.active, icon: '✅', cls: 'active' },
//       { key: 'today', label: t.stat.todayAdded, value: stats.today, icon: '➕', cls: 'today' }
//     ];

//     return (
//       <div className="room-stats">
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
//     if (filteredRooms.length === 0) {
//       return <div className="room-empty">📭 {t.label.noRooms}</div>;
//     }

//     return (
//       <div className="room-table-wrapper">
//         <table className="room-table">
//           <thead>
//             <tr>
//               <th style={{ width: '80px' }}>#</th>
//               <th>{t.col.roomNumber}</th>
//               <th>{t.col.section}</th>
//               <th style={{ width: '160px' }}>{t.label.created}</th>
//               <th style={{ width: '180px' }}>{t.btn.add}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredRooms.map((room) => (
//               <tr key={room.id}>
//                 <td>{room.id}</td>
//                 <td style={{ fontWeight: '500', color: '#2d3748' }}>{room.roomNumber}</td>
//                 <td>{room.sectionName || '-'}</td>
//                 <td>
//                   {room.createdAt ? formatDate(room.createdAt) : '-'}
//                 </td>
//                 <td>
//                   <div className="action-buttons">
//                     <button 
//                       className="btn-edit"
//                       onClick={() => handleOpenUpdateModal(room)}
//                     >
//                       ✏️ {t.btn.edit}
//                     </button>
//                     <button 
//                       className="btn-delete"
//                       onClick={() => handleOpenDeleteModal(room)}
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
//     if (filteredRooms.length === 0) {
//       return <div className="room-empty">📭 {t.label.noRooms}</div>;
//     }

//     return (
//       <div className="room-card-grid">
//         {filteredRooms.map((room) => (
//           <div key={room.id} className="room-card">
//             <div className="card-header">
//               <span className="card-id">#{room.id}</span>
//               <span className="card-number">{room.roomNumber}</span>
//             </div>
//             <div className="card-section">📋 {room.sectionName || 'No section'}</div>
//             <div className="card-actions">
//               <button 
//                 className="btn-edit"
//                 onClick={() => handleOpenUpdateModal(room)}
//               >
//                 ✏️ {t.btn.edit}
//               </button>
//               <button 
//                 className="btn-delete"
//                 onClick={() => handleOpenDeleteModal(room)}
//               >
//                 🗑️ {t.btn.delete}
//               </button>
//             </div>
//             <div className="card-footer">
//               📅 {t.label.created}: {room.createdAt ? formatDate(room.createdAt) : '-'}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // ---------- Modals ----------
//   const renderAddModal = () => {
//     if (!showAddModal) return null;

//     const handleRoomNumberChange = (e) => {
//       const value = e.target.value;
//       setRoomNumber(value);
      
//       if (value.length > 0) {
//         if (isValidRoomName(value)) {
//           setValidationMsg({ text: `✅ ${t.validation.validName}`, type: 'success' });
//         } else {
//           setValidationMsg({ text: `❌ ${t.validation.invalidName}`, type: 'error' });
//         }
//       } else {
//         setValidationMsg(null);
//       }
//     };

//     return (
//       <div className="room-modal-overlay">
//         <div className="room-modal slide-in">
//           <h3>🏥 {t.dialog.addRoom}</h3>
          
//           <div className="form-group">
//             <label>{t.label.section}</label>
//             <select
//               value={selectedSectionId}
//               onChange={(e) => setSelectedSectionId(e.target.value)}
//             >
//               <option value="">{t.label.chooseSection}</option>
//               {sections.map(section => (
//                 <option key={section.id} value={section.id}>
//                   {section.name}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.roomNumber}</label>
//             <input
//               type="text"
//               value={roomNumber}
//               onChange={handleRoomNumberChange}
//               placeholder={t.txt.roomNumber}
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
//                 setRoomNumber('');
//                 setSelectedSectionId('');
//                 setValidationMsg(null);
//               }}
//             >
//               {t.btn.cancel}
//             </button>
//             <button 
//               className="btn-primary"
//               onClick={handleAddRoomFromModal}
//               disabled={!roomNumber.trim() || !isValidRoomName(roomNumber.trim()) || !selectedSectionId}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderUpdateModal = () => {
//     if (!showUpdateModal || !selectedRoom) return null;

//     const handleRoomNumberChange = (e) => {
//       const value = e.target.value;
//       setUpdateRoomNumber(value);
//     };

//     return (
//       <div className="room-modal-overlay">
//         <div className="room-modal slide-in">
//           <h3>✏️ {t.dialog.updateRoom}</h3>
          
//           <div className="form-group">
//             <label>{t.label.roomNumber}</label>
//             <input
//               type="text"
//               value={updateRoomNumber}
//               onChange={handleRoomNumberChange}
//               placeholder={t.txt.roomNumber}
//               autoFocus
//             />
//           </div>
          
//           <div className="modal-actions">
//             <button 
//               className="btn-secondary"
//               onClick={() => {
//                 setShowUpdateModal(false);
//                 setSelectedRoom(null);
//                 setUpdateRoomNumber('');
//               }}
//             >
//               {t.btn.cancel}
//             </button>
//             <button 
//               className="btn-primary"
//               onClick={handleUpdateSubmit}
//               disabled={!updateRoomNumber.trim() || !isValidRoomName(updateRoomNumber.trim())}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderDeleteModal = () => {
//     if (!showDeleteModal || !selectedRoom) return null;

//     return (
//       <div className="room-modal-overlay">
//         <div className="room-modal slide-in">
//           <h3>🗑️ {t.confirm.delete.title}</h3>
          
//           <div style={{ margin: '15px 0', fontSize: '14px', color: '#4a5568' }}>
//             {t.confirm.delete.content}
//             <div style={{ 
//               marginTop: '10px', 
//               fontWeight: 'bold', 
//               fontSize: '16px', 
//               color: '#e53e3e' 
//             }}>
//               "{selectedRoom.roomNumber}"
//             </div>
//           </div>
          
//           <div className="modal-actions">
//             <button 
//               className="btn-secondary"
//               onClick={() => {
//                 setShowDeleteModal(false);
//                 setSelectedRoom(null);
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
//       <div className="room-container">
//         {/* Header */}
//         <div className="room-header">
//           <div className="title">
//             {t.header.title}
//             <span className="underline"></span>
//           </div>
//           <div className="actions">
//             <button 
//               className="refresh" 
//               onClick={loadRooms}
//               disabled={loading}
//             >
//               🔄 {t.btn.refresh}
//             </button>
//             <button 
//               className="export" 
//               onClick={exportToCSV}
//               disabled={loading || filteredRooms.length === 0}
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
//         <div className="room-tools">
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
//         <div className="room-quick-add">
//           <div className="header">
//             <span className="title">{t.quickAdd.title}</span>
//             <span className="hint">— {t.quickAdd.hint}</span>
//           </div>
//           <div className="input-row">
//             <select
//               value={quickSectionId}
//               onChange={(e) => setQuickSectionId(e.target.value)}
//             >
//               <option value="">{t.quickAdd.chooseSection}</option>
//               {sections.map(section => (
//                 <option key={section.id} value={section.id}>
//                   {section.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               type="text"
//               value={quickRoomNumber}
//               onChange={(e) => setQuickRoomNumber(e.target.value)}
//               placeholder={t.quickAdd.placeholder}
//               onKeyPress={(e) => e.key === 'Enter' && handleQuickAdd()}
//             />
//             <button onClick={handleQuickAdd}>
//               ➕ {t.quickAdd.addBtn}
//             </button>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="room-content">
//           {loading ? (
//             <div className="room-loading">⏳ {t.status.loading}</div>
//           ) : (
//             viewMode === 'table' ? renderTable() : renderCards()
//           )}
//         </div>

//         {/* Status Bar */}
//         <div className="room-status-bar">
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
//           className="room-floating-btn"
//           onClick={() => {
//             setRoomNumber('');
//             setSelectedSectionId('');
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

// export default RoomManagementScreen; 08072026  7:40 pm

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Styles ----------
const styles = `
  .room-container {
    padding: 20px;
    background: linear-gradient(to bottom, #f0f4f8, #e2e8f0);
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  /* Header */
  .room-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  }
  .room-header .title {
    font-size: 28px;
    font-weight: bold;
    color: #1a202c;
  }
  .room-header .title .underline {
    display: block;
    height: 3px;
    width: 60px;
    background: linear-gradient(to right, #4299e1, #2b6cb0);
    border-radius: 2px;
    margin-top: 5px;
  }
  .room-header .actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .room-header .actions button {
    padding: 8px 18px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
    color: white;
  }
  .room-header .actions button:hover {
    transform: scale(1.05);
  }
  .room-header .actions button.refresh { background: #4299e1; }
  .room-header .actions button.refresh:hover { background: #2b6cb0; }
  .room-header .actions button.export { background: #48bb78; }
  .room-header .actions button.export:hover { background: #38a169; }
  .room-header .status {
    font-size: 12px;
    color: #27ae60;
  }
  .room-header .status.error { color: #e74c3c; }
  .room-header .status.loading { color: #f39c12; }

  /* Stats Cards */
  .room-stats {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }
  .room-stats .stat-card {
    flex: 1;
    min-width: 150px;
    max-width: 200px;
    padding: 15px 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    border-left: 4px solid #4299e1;
    transition: all 0.2s;
    cursor: pointer;
  }
  .room-stats .stat-card:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  }
  .room-stats .stat-card .icon { font-size: 24px; }
  .room-stats .stat-card .value { font-size: 24px; font-weight: bold; }
  .room-stats .stat-card .label { font-size: 12px; color: #718096; }
  .room-stats .stat-card.total { border-color: #4299e1; }
  .room-stats .stat-card.total .value { color: #4299e1; }
  .room-stats .stat-card.active { border-color: #48bb78; }
  .room-stats .stat-card.active .value { color: #48bb78; }
  .room-stats .stat-card.today { border-color: #ed8936; }
  .room-stats .stat-card.today .value { color: #ed8936; }

  /* Search and Tools */
  .room-tools {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    flex-wrap: wrap;
  }
  .room-tools .search-box {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 25px;
    border: 1px solid #e2e8f0;
    padding: 5px 15px;
    flex: 1;
    min-width: 200px;
  }
  .room-tools .search-box input {
    border: none;
    outline: none;
    padding: 8px 5px;
    font-size: 14px;
    flex: 1;
    background: transparent;
  }
  .room-tools .search-box .search-icon {
    font-size: 14px;
    color: #a0aec0;
  }
  .room-tools .view-toggle {
    display: flex;
    gap: 5px;
  }
  .room-tools .view-toggle button {
    padding: 6px 15px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
  }
  .room-tools .view-toggle button.active {
    background: #4299e1;
    color: white;
    border-color: #4299e1;
  }
  .room-tools .view-toggle button:hover:not(.active) {
    background: #f7fafc;
  }
  .room-tools .spacer { flex: 1; }

  /* Content Area */
  .room-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    padding: 15px;
    min-height: 400px;
  }

  /* Table View */
  .room-table-wrapper {
    overflow-x: auto;
    max-height: 500px;
  }
  .room-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .room-table th {
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
  .room-table td {
    padding: 10px 15px;
    border-bottom: 1px solid #edf2f7;
  }
  .room-table tr:hover td {
    background: #f7fafc;
  }
  .room-table .action-buttons {
    display: flex;
    gap: 5px;
  }
  .room-table .action-buttons button {
    padding: 4px 12px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 12px;
    color: white;
  }
  .room-table .action-buttons button:hover {
    transform: scale(1.05);
  }
  .room-table .action-buttons .btn-edit { background: #4299e1; }
  .room-table .action-buttons .btn-edit:hover { background: #3182ce; }
  .room-table .action-buttons .btn-delete { background: #fc8181; }
  .room-table .action-buttons .btn-delete:hover { background: #f56565; }

  /* Card View */
  .room-card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
    padding: 5px;
  }
  .room-card {
    background: white;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    border: 1px solid #edf2f7;
    transition: all 0.2s;
    cursor: pointer;
  }
  .room-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(66, 153, 225, 0.15);
    border-color: #4299e1;
    border-width: 2px;
  }
  .room-card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .room-card .card-id {
    background: #4299e1;
    color: white;
    padding: 2px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
  }
  .room-card .card-number {
    font-size: 16px;
    font-weight: bold;
    color: #2d3748;
  }
  .room-card .card-section {
    font-size: 14px;
    color: #4a5568;
  }
  .room-card .card-actions {
    display: flex;
    gap: 5px;
    margin-top: 10px;
  }
  .room-card .card-actions button {
    padding: 4px 12px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 12px;
    color: white;
  }
  .room-card .card-actions button:hover {
    transform: scale(1.05);
  }
  .room-card .card-actions .btn-edit { background: #4299e1; }
  .room-card .card-actions .btn-edit:hover { background: #3182ce; }
  .room-card .card-actions .btn-delete { background: #fc8181; }
  .room-card .card-actions .btn-delete:hover { background: #f56565; }
  .room-card .card-footer {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #e2e8f0;
    font-size: 12px;
    color: #a0aec0;
  }

  /* Quick Add Section */
  .room-quick-add {
    padding: 15px 20px;
    background: linear-gradient(to right, #ebf8ff, #bee3f8);
    border-radius: 12px;
    border: 2px solid #4299e1;
    box-shadow: 0 2px 10px rgba(66, 153, 225, 0.1);
  }
  .room-quick-add .header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .room-quick-add .header .title {
    font-size: 16px;
    font-weight: bold;
    color: #2b6cb0;
  }
  .room-quick-add .header .hint {
    font-size: 12px;
    color: #4a5568;
    font-style: italic;
  }
  .room-quick-add .input-row {
    display: flex;
    gap: 10px;
    margin-top: 5px;
    align-items: center;
    flex-wrap: wrap;
  }
  .room-quick-add .input-row select {
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #4299e1;
    font-size: 14px;
    background: white;
    min-width: 200px;
    height: 42px;
  }
  .room-quick-add .input-row select:focus {
    outline: none;
    border-color: #2b6cb0;
    border-width: 2px;
  }
  .room-quick-add .input-row input {
    flex: 1;
    max-width: 300px;
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #4299e1;
    font-size: 14px;
    background: white;
    transition: all 0.2s;
    height: 42px;
  }
  .room-quick-add .input-row input:focus {
    outline: none;
    border-color: #2b6cb0;
    border-width: 2px;
    background: #f0f9ff;
  }
  .room-quick-add .input-row button {
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
    height: 42px;
  }
  .room-quick-add .input-row button:hover {
    background: #3182ce;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(66, 153, 225, 0.5);
  }
  .room-quick-add .input-row button:active {
    transform: scale(0.95);
  }

  /* Status Bar */
  .room-status-bar {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 15px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  }
  .room-status-bar .status-msg {
    font-size: 13px;
    font-weight: 500;
    color: #48bb78;
  }
  .room-status-bar .status-msg.error { color: #e74c3c; }
  .room-status-bar .status-msg.loading { color: #f39c12; }
  .room-status-bar .spacer { flex: 1; }
  .room-status-bar .time {
    font-size: 12px;
    color: #a0aec0;
  }

  /* Loading */
  .room-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #7f8c8d;
  }

  /* Empty State */
  .room-empty {
    text-align: center;
    padding: 40px;
    color: #a0aec0;
    font-size: 16px;
  }

  /* Modal Overlay */
  .room-modal-overlay {
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
  }
  .room-modal {
    background: white;
    border-radius: 12px;
    padding: 25px;
    max-width: 450px;
    width: 95%;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  .room-modal h3 {
    margin: 0 0 15px 0;
    color: #2d3748;
    font-size: 18px;
  }
  .room-modal .form-group {
    margin-bottom: 15px;
  }
  .room-modal .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #2d3748;
  }
  .room-modal .form-group select {
    width: 100%;
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    font-size: 14px;
    background: white;
  }
  .room-modal .form-group select:focus {
    outline: none;
    border-color: #4299e1;
  }
  .room-modal .form-group input {
    width: 100%;
    padding: 10px 15px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    font-size: 14px;
    background: white;
    transition: border-color 0.2s;
  }
  .room-modal .form-group input:focus {
    outline: none;
    border-color: #4299e1;
  }
  .room-modal .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .room-modal .modal-actions button {
    padding: 8px 30px;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
  }
  .room-modal .modal-actions .btn-primary {
    background: #48bb78;
    color: white;
  }
  .room-modal .modal-actions .btn-primary:hover {
    background: #38a169;
    transform: scale(1.05);
  }
  .room-modal .modal-actions .btn-secondary {
    background: #e2e8f0;
    color: #4a5568;
  }
  .room-modal .modal-actions .btn-secondary:hover {
    background: #cbd5e0;
    transform: scale(1.05);
  }
  .room-modal .validation-msg {
    font-size: 12px;
    margin-top: 5px;
  }
  .room-modal .validation-msg.success { color: #48bb78; }
  .room-modal .validation-msg.error { color: #fc8181; }

  /* Floating Button */
  .room-floating-btn {
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
  .room-floating-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(72, 187, 120, 0.7);
  }
  .room-floating-btn:active {
    transform: scale(0.95);
  }

  /* Shake Animation */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  .shake {
    animation: shake 0.4s ease-in-out;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .slide-in {
    animation: slideIn 0.3s ease-out;
  }

  /* Toast Notification Styles */
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
  
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .toast-item.removing {
    animation: slideOutRight 0.3s ease-in forwards;
  }
`;

// ---------- Main Component ----------
const RoomManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
  // ---------- Translations ----------
  const getTranslations = (language) => {
    const translations = {
      en: {
        title: { manageRooms: 'Manage Rooms' },
        header: { title: '🏥 Manage Rooms' },
        stat: {
          totalRooms: 'Total Rooms',
          activeRooms: 'Active Rooms',
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
          noRooms: 'No rooms found',
          created: 'Created',
          addNew: 'Add New Room',
          section: 'Section',
          roomNumber: 'Room Number',
          chooseSection: 'Choose section'
        },
        txt: {
          search: 'Search rooms',
          roomNumber: 'Room Number'
        },
        dialog: {
          addRoom: 'Add Room',
          updateRoom: 'Update Room',
          updateHeader: 'Updating room',
          sectionName: 'Section'
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
          enterName: 'Please enter a room number',
          invalidRoomName: 'Room number must start with 3 letters and may contain numbers',
          roomNumberEmpty: 'Room number cannot be empty',
          errorLoading: 'Error loading rooms',
          errorCreating: 'Error creating room',
          errorUpdating: 'Error updating room',
          errorDeleting: 'Error deleting room',
          exportError: 'Error exporting data',
          exportSuccess: 'Data exported successfully',
          info: 'Information'
        },
        col: {
          roomNumber: 'Room Number',
          section: 'Section',
          actions: 'Actions'
        },
        validation: {
          validName: '✓ Valid room number',
          invalidName: '✗ Room number must start with 3 letters'
        },
        quickAdd: {
          title: '🏥 Quick Add Room',
          hint: 'Quick add a new room',
          placeholder: 'Enter room number...',
          addBtn: 'Add Room',
          chooseSection: 'Choose section'
        },
        msg: {
          selectSection: 'Please select a section',
          enterRoomNumber: 'Please enter a room number',
          invalidRoomName: 'Room number must start with 3 letters',
          roomNumberEmpty: 'Room number cannot be empty'
        },
        confirm: {
          delete: {
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this room?'
          }
        },
        export: {
          saveFile: 'Save CSV File'
        }
      },
      ar: {
        title: { manageRooms: 'إدارة الغرف' },
        header: { title: '🏥 إدارة الغرف' },
        stat: {
          totalRooms: 'إجمالي الغرف',
          activeRooms: 'الغرف النشطة',
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
          noRooms: 'لا توجد غرف',
          created: 'تم الإنشاء',
          addNew: 'إضافة غرفة جديدة',
          section: 'القسم',
          roomNumber: 'رقم الغرفة',
          chooseSection: 'اختر القسم'
        },
        txt: {
          search: 'بحث عن الغرف',
          roomNumber: 'رقم الغرفة'
        },
        dialog: {
          addRoom: 'إضافة غرفة',
          updateRoom: 'تعديل غرفة',
          updateHeader: 'تعديل الغرفة',
          sectionName: 'القسم'
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
          enterName: 'يرجى إدخال رقم الغرفة',
          invalidRoomName: 'يجب أن يبدأ رقم الغرفة بـ 3 أحرف وقد يحتوي على أرقام',
          roomNumberEmpty: 'لا يمكن أن يكون رقم الغرفة فارغاً',
          errorLoading: 'خطأ في تحميل الغرف',
          errorCreating: 'خطأ في إنشاء الغرفة',
          errorUpdating: 'خطأ في تحديث الغرفة',
          errorDeleting: 'خطأ في حذف الغرفة',
          exportError: 'خطأ في تصدير البيانات',
          exportSuccess: 'تم تصدير البيانات بنجاح',
          info: 'معلومات'
        },
        col: {
          roomNumber: 'رقم الغرفة',
          section: 'القسم',
          actions: 'إجراءات'
        },
        validation: {
          validName: '✓ رقم غرفة صالح',
          invalidName: '✗ يجب أن يبدأ رقم الغرفة بـ 3 أحرف'
        },
        quickAdd: {
          title: '🏥 إضافة غرفة سريعة',
          hint: 'إضافة غرفة سريعة',
          placeholder: 'أدخل رقم الغرفة...',
          addBtn: 'إضافة غرفة',
          chooseSection: 'اختر القسم'
        },
        msg: {
          selectSection: 'يرجى اختيار قسم',
          enterRoomNumber: 'يرجى إدخال رقم الغرفة',
          invalidRoomName: 'يجب أن يبدأ رقم الغرفة بـ 3 أحرف',
          roomNumberEmpty: 'لا يمكن أن يكون رقم الغرفة فارغاً'
        },
        confirm: {
          delete: {
            title: 'تأكيد الحذف',
            content: 'هل أنت متأكد من حذف هذه الغرفة؟'
          }
        },
        export: {
          saveFile: 'حفظ ملف CSV'
        }
      }
    };
    return translations[language] || translations.en;
  };

  const t = getTranslations(lang);

  // ---------- State ----------
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });
  const [stats, setStats] = useState({ total: 0, active: 0, today: 0 });

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomNumber, setRoomNumber] = useState('');
  const [updateRoomNumber, setUpdateRoomNumber] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [validationMsg, setValidationMsg] = useState(null);

  // Quick add states
  const [quickRoomNumber, setQuickRoomNumber] = useState('');
  const [quickSectionId, setQuickSectionId] = useState('');

  // Toast state
  const [toasts, setToasts] = useState([]);

  // ---------- Helper Functions ----------
  const setStatus = useCallback((text, type = 'success') => {
    setStatusMessage({ text: `● ${text}`, type });
  }, []);

  const isValidRoomName = (name) => {
    // return /^[A-Za-z]{3,}[A-Za-z0-9]*\d{0,3}$/.test(name);
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
    
    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // ---------- API Calls ----------
  const loadRooms = useCallback(async () => {
    setLoading(true);
    setStatus(t.status.loading, 'loading');

    try {
      const url = `${BASE_URL}/api/rooms`;
      //console.log('📤 Fetching rooms:', url);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const roomsData = Array.isArray(data) ? data : [data];
      
      // Process rooms with section names
      const processedRooms = roomsData.map(room => ({
        id: room.id || 0,
        roomNumber: room.roomNumber || '',
        sectionName: room.section?.name || '',
        sectionId: room.section?.id || null,
        createdAt: room.createdAt || null
      }));
      
      setRooms(processedRooms);
      setFilteredRooms(processedRooms);
      
      // Update stats
      const total = processedRooms.length;
      const active = processedRooms.filter(r => r.sectionName !== '').length;
      const today = processedRooms.filter(r => {
        const created = new Date(r.createdAt || Date.now());
        const now = new Date();
        return created.toDateString() === now.toDateString();
      }).length;
      
      setStats({ total, active, today });
      setStatus(`${t.status.ready} (${total} ${t.label.records})`, 'success');
      
    } catch (err) {
      //console.error('🚨 Load error:', err);
      setStatus(t.alert.errorLoading, 'error');
      setRooms([]);
      setFilteredRooms([]);
      showToast(t.alert.errorLoading, 'error');
    } finally {
      setLoading(false);
    }
  }, [t, showToast]);

  const loadSections = useCallback(async () => {
    try {
      const url = `${BASE_URL}/api/sections`;
      //console.log('📤 Fetching sections:', url);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const sectionsData = Array.isArray(data) ? data : [data];
      
      setSections(sectionsData);
      
    } catch (err) {
      //console.error('🚨 Load sections error:', err);
      showToast('Error loading sections', 'error');
    }
  }, [showToast]);

  const createRoom = useCallback(async (roomNumber, sectionId) => {
    try {
      const url = `${BASE_URL}/api/rooms/section/${sectionId}`;
      //console.log('📤 Creating room:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomNumber: roomNumber.trim() })
      });

      const message = await response.text();
      
      if (!response.ok) {
        showToast(message || t.alert.errorCreating, 'error');
        return;
      }
      
      setShowAddModal(false);
      setRoomNumber('');
      setSelectedSectionId('');
      setValidationMsg(null);
      loadRooms();
      showToast(message || t.status.added, 'success');
      
    } catch (err) {
      //console.error('🚨 Create error:', err);
      showToast(err.message || t.alert.errorCreating, 'error');
    }
  }, [loadRooms, t, showToast]);

  const updateRoom = useCallback(async (id, roomNumber) => {
    try {
      const url = `${BASE_URL}/api/rooms/${id}`;
      //console.log('📤 Updating room:', url);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomNumber: roomNumber.trim() })
      });

      const message = await response.text();
      
      if (!response.ok) {
        showToast(message || t.alert.errorUpdating, 'error');
        return;
      }
      
      setShowUpdateModal(false);
      setUpdateRoomNumber('');
      setSelectedRoom(null);
      loadRooms();
      showToast(message || t.status.updated, 'success');
      
    } catch (err) {
      //console.error('🚨 Update error:', err);
      showToast(err.message || t.alert.errorUpdating, 'error');
    }
  }, [loadRooms, t, showToast]);

  const deleteRoom = useCallback(async (id) => {
    try {
      const url = `${BASE_URL}/api/rooms/${id}`;
      //console.log('📤 Deleting room:', url);
      
      const response = await fetch(url, {
        method: 'DELETE'
      });

      const message = await response.text();
      
      if (!response.ok) {
        showToast(message || t.alert.errorDeleting, 'error');
        setShowDeleteModal(false);
        setSelectedRoom(null);
        return;
      }
      
      setShowDeleteModal(false);
      setSelectedRoom(null);
      loadRooms();
      showToast(message || t.status.deleted, 'success');
      
    } catch (err) {
      //console.error('🚨 Delete error:', err);
      showToast(err.message || t.alert.errorDeleting, 'error');
      setShowDeleteModal(false);
      setSelectedRoom(null);
    }
  }, [loadRooms, t, showToast]);

  // ---------- Export to CSV ----------
  const exportToCSV = useCallback(() => {
    if (filteredRooms.length === 0) {
      showToast('No data to export', 'error');
      return;
    }

    // Create CSV
    const headers = `ID,${t.col.roomNumber},${t.col.section},${t.label.created}`;
    const rows = filteredRooms.map(room => {
      const createdAt = room.createdAt ? new Date(room.createdAt).toLocaleString() : new Date().toLocaleString();
      return `${room.id},${room.roomNumber},${room.sectionName},${createdAt}`;
    }).join('\n');

    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rooms_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    showToast(`📥 ${t.status.exported}`, 'success');
  }, [filteredRooms, t, showToast]);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(room => {
        return (
          room.roomNumber.toLowerCase().includes(query) ||
          String(room.id).includes(query) ||
          room.sectionName.toLowerCase().includes(query)
        );
      });
      setFilteredRooms(filtered);
    }
  };

  const handleViewToggle = (mode) => {
    setViewMode(mode);
  };

  const handleQuickAdd = () => {
    const roomNumber = quickRoomNumber.trim();
    const sectionId = quickSectionId;
    
    if (!sectionId) {
      showToast(t.msg.selectSection, 'error');
      return;
    }
    
    if (roomNumber === '') {
      showToast(t.msg.enterRoomNumber, 'error');
      return;
    }
    
    if (!isValidRoomName(roomNumber)) {
      showToast(t.msg.invalidRoomName, 'error');
      return;
    }
    
    createRoom(roomNumber, parseInt(sectionId));
    setQuickRoomNumber('');
    setQuickSectionId('');
  };

  const handleOpenUpdateModal = (room) => {
    setSelectedRoom(room);
    setUpdateRoomNumber(room.roomNumber);
    setShowUpdateModal(true);
  };

  const handleOpenDeleteModal = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const handleUpdateSubmit = () => {
    const roomNumber = updateRoomNumber.trim();
    
    if (roomNumber === '') {
      showToast(t.msg.roomNumberEmpty, 'error');
      return;
    }
    
    if (!isValidRoomName(roomNumber)) {
      showToast(t.msg.invalidRoomName, 'error');
      return;
    }
    
    updateRoom(selectedRoom.id, roomNumber);
  };

  const handleDeleteConfirm = () => {
    deleteRoom(selectedRoom.id);
  };

  const handleAddRoomFromModal = () => {
    const roomNumber = roomNumber.trim();
    const sectionId = selectedSectionId;
    
    if (!sectionId) {
      showToast(t.msg.selectSection, 'error');
      return;
    }
    
    if (roomNumber === '') {
      showToast(t.msg.enterRoomNumber, 'error');
      return;
    }
    
    if (!isValidRoomName(roomNumber)) {
      showToast(t.msg.invalidRoomName, 'error');
      return;
    }
    
    createRoom(roomNumber, parseInt(sectionId));
  };

  // ---------- Effects ----------
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      loadRooms();
      loadSections();
    }
  }, [loadRooms, loadSections]);

  // Update status when language changes
  useEffect(() => {
    setStatus(t.status.ready, 'success');
  }, [t, setStatus]);

  // ---------- Toast Render ----------
  const renderToasts = () => {
    if (toasts.length === 0) return null;
    
    return (
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
    );
  };

  // ---------- Render Components ----------
  const renderStats = () => {
    const cards = [
      { key: 'total', label: t.stat.totalRooms, value: stats.total, icon: '🏥', cls: 'total' },
      { key: 'active', label: t.stat.activeRooms, value: stats.active, icon: '✅', cls: 'active' },
      { key: 'today', label: t.stat.todayAdded, value: stats.today, icon: '➕', cls: 'today' }
    ];

    return (
      <div className="room-stats">
        {cards.map((card) => (
          <div key={card.key} className={`stat-card ${card.cls}`}>
            <div className="icon">{card.icon}</div>
            <div className="value">{card.value}</div>
            <div className="label">{card.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderTable = () => {
    if (filteredRooms.length === 0) {
      return <div className="room-empty">📭 {t.label.noRooms}</div>;
    }

    return (
      <div className="room-table-wrapper">
        <table className="room-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>#</th>
              <th>{t.col.roomNumber}</th>
              <th>{t.col.section}</th>
              <th style={{ width: '160px' }}>{t.label.created}</th>
              <th style={{ width: '180px' }}>{t.btn.add}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td style={{ fontWeight: '500', color: '#2d3748' }}>{room.roomNumber}</td>
                <td>{room.sectionName || '-'}</td>
                <td>
                  {room.createdAt ? formatDate(room.createdAt) : '-'}
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-edit"
                      onClick={() => handleOpenUpdateModal(room)}
                    >
                      ✏️ {t.btn.edit}
                    </button>
                    <button 
                      className="btn-delete"
                      onClick={() => handleOpenDeleteModal(room)}
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
    );
  };

  const renderCards = () => {
    if (filteredRooms.length === 0) {
      return <div className="room-empty">📭 {t.label.noRooms}</div>;
    }

    return (
      <div className="room-card-grid">
        {filteredRooms.map((room) => (
          <div key={room.id} className="room-card">
            <div className="card-header">
              <span className="card-id">#{room.id}</span>
              <span className="card-number">{room.roomNumber}</span>
            </div>
            <div className="card-section">📋 {room.sectionName || 'No section'}</div>
            <div className="card-actions">
              <button 
                className="btn-edit"
                onClick={() => handleOpenUpdateModal(room)}
              >
                ✏️ {t.btn.edit}
              </button>
              <button 
                className="btn-delete"
                onClick={() => handleOpenDeleteModal(room)}
              >
                🗑️ {t.btn.delete}
              </button>
            </div>
            <div className="card-footer">
              📅 {t.label.created}: {room.createdAt ? formatDate(room.createdAt) : '-'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ---------- Modals ----------
  const renderAddModal = () => {
    if (!showAddModal) return null;

    const handleRoomNumberChange = (e) => {
      const value = e.target.value;
      setRoomNumber(value);
      
      if (value.length > 0) {
        if (isValidRoomName(value)) {
          setValidationMsg({ text: `✅ ${t.validation.validName}`, type: 'success' });
        } else {
          setValidationMsg({ text: `❌ ${t.validation.invalidName}`, type: 'error' });
        }
      } else {
        setValidationMsg(null);
      }
    };

    return (
      <div className="room-modal-overlay">
        <div className="room-modal slide-in">
          <h3>🏥 {t.dialog.addRoom}</h3>
          
          <div className="form-group">
            <label>{t.label.section}</label>
            <select
              value={selectedSectionId}
              onChange={(e) => setSelectedSectionId(e.target.value)}
            >
              <option value="">{t.label.chooseSection}</option>
              {sections.map(section => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>{t.label.roomNumber}</label>
            <input
              type="text"
              value={roomNumber}
              onChange={handleRoomNumberChange}
              placeholder={t.txt.roomNumber}
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
                setRoomNumber('');
                setSelectedSectionId('');
                setValidationMsg(null);
              }}
            >
              {t.btn.cancel}
            </button>
            <button 
              className="btn-primary"
              onClick={handleAddRoomFromModal}
              disabled={!roomNumber.trim() || !isValidRoomName(roomNumber.trim()) || !selectedSectionId}
            >
              💾 {t.btn.save}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderUpdateModal = () => {
    if (!showUpdateModal || !selectedRoom) return null;

    const handleRoomNumberChange = (e) => {
      const value = e.target.value;
      setUpdateRoomNumber(value);
    };

    return (
      <div className="room-modal-overlay">
        <div className="room-modal slide-in">
          <h3>✏️ {t.dialog.updateRoom}</h3>
          
          <div className="form-group">
            <label>{t.label.roomNumber}</label>
            <input
              type="text"
              value={updateRoomNumber}
              onChange={handleRoomNumberChange}
              placeholder={t.txt.roomNumber}
              autoFocus
            />
          </div>
          
          <div className="modal-actions">
            <button 
              className="btn-secondary"
              onClick={() => {
                setShowUpdateModal(false);
                setSelectedRoom(null);
                setUpdateRoomNumber('');
              }}
            >
              {t.btn.cancel}
            </button>
            <button 
              className="btn-primary"
              onClick={handleUpdateSubmit}
              disabled={!updateRoomNumber.trim() || !isValidRoomName(updateRoomNumber.trim())}
            >
              💾 {t.btn.save}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDeleteModal = () => {
    if (!showDeleteModal || !selectedRoom) return null;

    return (
      <div className="room-modal-overlay">
        <div className="room-modal slide-in">
          <h3>🗑️ {t.confirm.delete.title}</h3>
          
          <div style={{ margin: '15px 0', fontSize: '14px', color: '#4a5568' }}>
            {t.confirm.delete.content}
            <div style={{ 
              marginTop: '10px', 
              fontWeight: 'bold', 
              fontSize: '16px', 
              color: '#e53e3e' 
            }}>
              "{selectedRoom.roomNumber}"
            </div>
          </div>
          
          <div className="modal-actions">
            <button 
              className="btn-secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedRoom(null);
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
    );
  };

  // ---------- Render ----------
  return (
    <>
      <style>{styles}</style>
      {renderToasts()}
      <div className="room-container">
        {/* Header */}
        <div className="room-header">
          <div className="title">
            {t.header.title}
            <span className="underline"></span>
          </div>
          <div className="actions">
            <button 
              className="refresh" 
              onClick={loadRooms}
              disabled={loading}
            >
              🔄 {t.btn.refresh}
            </button>
            <button 
              className="export" 
              onClick={exportToCSV}
              disabled={loading || filteredRooms.length === 0}
            >
              📥 {t.btn.export}
            </button>
            <span className={`status ${statusMessage.type}`}>
              {statusMessage.text}
            </span>
          </div>
        </div>

        {/* Stats */}
        {renderStats()}

        {/* Search and Tools */}
        <div className="room-tools">
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
        <div className="room-quick-add">
          <div className="header">
            <span className="title">{t.quickAdd.title}</span>
            <span className="hint">— {t.quickAdd.hint}</span>
          </div>
          <div className="input-row">
            <select
              value={quickSectionId}
              onChange={(e) => setQuickSectionId(e.target.value)}
            >
              <option value="">{t.quickAdd.chooseSection}</option>
              {sections.map(section => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={quickRoomNumber}
              onChange={(e) => setQuickRoomNumber(e.target.value)}
              placeholder={t.quickAdd.placeholder}
              onKeyPress={(e) => e.key === 'Enter' && handleQuickAdd()}
            />
            <button onClick={handleQuickAdd}>
              ➕ {t.quickAdd.addBtn}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="room-content">
          {loading ? (
            <div className="room-loading">⏳ {t.status.loading}</div>
          ) : (
            viewMode === 'table' ? renderTable() : renderCards()
          )}
        </div>

        {/* Status Bar */}
        <div className="room-status-bar">
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
          className="room-floating-btn"
          onClick={() => {
            setRoomNumber('');
            setSelectedSectionId('');
            setValidationMsg(null);
            setShowAddModal(true);
          }}
        >
          +
        </button>

        {/* Modals */}
        {renderAddModal()}
        {renderUpdateModal()}
        {renderDeleteModal()}
      </div>
    </>
  );
};

export default RoomManagementScreen;