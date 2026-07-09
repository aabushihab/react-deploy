// // import React, { useState, useCallback, useEffect } from 'react';

// // import { BASE_URL } from '../../utils/api';
// // // ---------- Styles ----------
// // const styles = `
// //   .claims-container {
// //     padding: 20px;
// //     background: #f0f2f5;
// //     min-height: 100vh;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .claims-topbar {
// //     background: white;
// //     padding: 15px;
// //     border-radius: 8px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     margin-bottom: 20px;
// //   }
// //   .claims-filter-section {
// //     display: flex;
// //     gap: 15px;
// //     flex-wrap: wrap;
// //     align-items: center;
// //     padding: 5px 0;
// //   }
// //   .claims-filter-section select, 
// //   .claims-filter-section input {
// //     padding: 8px 12px;
// //     border-radius: 20px;
// //     border: 1px solid #e2e8f0;
// //     font-size: 14px;
// //     background: white;
// //   }
// //   .claims-filter-section select:focus,
// //   .claims-filter-section input:focus {
// //     outline: none;
// //     border-color: #4a90d9;
// //     box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.1);
// //   }
// //   .claims-stats-section {
// //     display: flex;
// //     gap: 30px;
// //     padding: 10px 15px;
// //     background: #f7fafc;
// //     border: 1px solid #e2e8f0;
// //     border-radius: 8px;
// //     margin-top: 10px;
// //     flex-wrap: wrap;
// //   }
// //   .claims-stats-section .stat-item {
// //     font-weight: bold;
// //     font-size: 14px;
// //   }
// //   .claims-table-container {
// //     background: white;
// //     border-radius: 8px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     overflow: hidden;
// //   }
// //   .claims-table-header {
// //     padding: 10px 15px;
// //     background: #edf2f7;
// //     border-bottom: 1px solid #e2e8f0;
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;
// //   }
// //   .claims-table-header .title {
// //     font-weight: bold;
// //     font-size: 16px;
// //   }
// //   .claims-table-header .actions {
// //     display: flex;
// //     gap: 10px;
// //   }
// //   .claims-table-header .actions button {
// //     padding: 6px 15px;
// //     border: none;
// //     border-radius: 15px;
// //     font-weight: bold;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //     font-size: 13px;
// //   }
// //   .claims-table-header .actions button:hover {
// //     transform: scale(1.05);
// //   }
// //   .claims-table-wrapper {
// //     overflow-x: auto;
// //   }
// //   .claims-table {
// //     width: 100%;
// //     border-collapse: collapse;
// //     font-size: 13px;
// //   }
// //   .claims-table th {
// //     padding: 12px 15px;
// //     text-align: left;
// //     font-weight: bold;
// //     color: #2d3748;
// //     border-bottom: 2px solid #e2e8f0;
// //     background: #f8f9fa;
// //   }
// //   .claims-table td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #e2e8f0;
// //     vertical-align: middle;
// //   }
// //   .claims-table tr:hover td {
// //     background: #f7fafc;
// //   }
// //   .claims-table .amount-positive {
// //     color: #2d3748;
// //     font-weight: bold;
// //   }
// //   .claims-table .amount-negative {
// //     color: #e53e3e;
// //     font-weight: bold;
// //   }
// //   .claims-table .status-paid {
// //     color: #38a169;
// //     font-weight: bold;
// //   }
// //   .claims-table .status-pending {
// //     color: #e53e3e;
// //     font-weight: bold;
// //   }
// //   .claims-table .settle-btn {
// //     background: #4a90d9;
// //     color: white;
// //     border: none;
// //     border-radius: 15px;
// //     padding: 4px 12px;
// //     font-size: 11px;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //   }
// //   .claims-table .settle-btn:hover {
// //     background: #357abd;
// //     transform: scale(1.05);
// //   }
// //   .claims-selection-bar {
// //     background: #ebf8ff;
// //     padding: 8px 15px;
// //     border: 1px solid #bee3f8;
// //     border-radius: 4px;
// //     display: flex;
// //     align-items: center;
// //     gap: 15px;
// //     flex-wrap: wrap;
// //   }
// //   .claims-selection-bar .selected-count {
// //     font-weight: bold;
// //     color: #2b6cb0;
// //   }
// //   .claims-selection-bar button {
// //     border: none;
// //     border-radius: 15px;
// //     padding: 4px 15px;
// //     font-weight: bold;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //     font-size: 12px;
// //   }
// //   .claims-selection-bar button:hover {
// //     transform: scale(1.05);
// //   }
// //   .claims-bottom-bar {
// //     display: flex;
// //     justify-content: flex-end;
// //     padding: 10px 15px;
// //     background: #f7fafc;
// //     border-top: 1px solid #e2e8f0;
// //     gap: 15px;
// //     font-size: 12px;
// //     color: #4a5568;
// //     margin-top: 15px;
// //   }
// //   .claims-bottom-bar .status-online {
// //     color: #38a169;
// //   }
// //   .claims-modal-overlay {
// //     position: fixed;
// //     top: 0;
// //     left: 0;
// //     right: 0;
// //     bottom: 0;
// //     background: rgba(0,0,0,0.5);
// //     display: flex;
// //     justify-content: center;
// //     align-items: center;
// //     z-index: 2000;
// //   }
// //   .claims-modal {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 25px;
// //     max-width: 500px;
// //     width: 95%;
// //     max-height: 90vh;
// //     overflow-y: auto;
// //     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
// //   }
// //   .claims-modal h3 {
// //     margin: 0 0 15px 0;
// //   }
// //   .claims-modal .form-group {
// //     margin-bottom: 15px;
// //   }
// //   .claims-modal .form-group label {
// //     display: block;
// //     font-weight: bold;
// //     margin-bottom: 5px;
// //   }
// //   .claims-modal .form-group input {
// //     width: 100%;
// //     padding: 8px 12px;
// //     border-radius: 8px;
// //     border: 1px solid #e2e8f0;
// //     font-size: 14px;
// //   }
// //   .claims-modal .form-group input:focus {
// //     outline: none;
// //     border-color: #4a90d9;
// //   }
// //   .claims-modal .validation-msg {
// //     font-size: 13px;
// //     font-weight: bold;
// //     margin-top: 5px;
// //   }
// //   .claims-modal .validation-msg.success {
// //     color: #38a169;
// //   }
// //   .claims-modal .validation-msg.error {
// //     color: #e53e3e;
// //   }
// //   .claims-modal .validation-msg.warning {
// //     color: #ed8936;
// //   }
// //   .claims-modal .modal-actions {
// //     display: flex;
// //     gap: 10px;
// //     justify-content: flex-end;
// //     margin-top: 20px;
// //   }
// //   .claims-modal .modal-actions button {
// //     padding: 8px 25px;
// //     border: none;
// //     border-radius: 20px;
// //     font-weight: bold;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //   }
// //   .claims-modal .modal-actions button:hover {
// //     transform: scale(1.05);
// //   }
// //   .claims-modal .modal-actions .btn-primary {
// //     background: #4a90d9;
// //     color: white;
// //   }
// //   .claims-modal .modal-actions .btn-primary:disabled {
// //     background: #a0aec0;
// //     cursor: not-allowed;
// //   }
// //   .claims-modal .modal-actions .btn-secondary {
// //     background: #e2e8f0;
// //     color: #4a5568;
// //   }
// //   .claims-folder-modal {
// //     max-width: 800px;
// //   }
// //   .claims-folder-modal .folder-table {
// //     width: 100%;
// //     border-collapse: collapse;
// //     font-size: 13px;
// //   }
// //   .claims-folder-modal .folder-table th {
// //     padding: 10px;
// //     text-align: left;
// //     background: #f8f9fa;
// //     border-bottom: 2px solid #e2e8f0;
// //   }
// //   .claims-folder-modal .folder-table td {
// //     padding: 8px 10px;
// //     border-bottom: 1px solid #e2e8f0;
// //   }
// //   .claims-folder-modal .folder-table tr:hover td {
// //     background: #f7fafc;
// //   }
// //   .claims-folder-modal .folder-table .delete-btn {
// //     background: #e53e3e;
// //     color: white;
// //     border: none;
// //     border-radius: 12px;
// //     padding: 2px 10px;
// //     font-size: 11px;
// //     cursor: pointer;
// //   }
// //   .claims-folder-modal .folder-table .delete-btn:hover {
// //     background: #c0392b;
// //   }
// //   .claims-loading {
// //     display: flex;
// //     justify-content: center;
// //     align-items: center;
// //     padding: 40px;
// //     font-size: 18px;
// //     color: #a0aec0;
// //   }
// //   .claims-empty {
// //     text-align: center;
// //     padding: 40px;
// //     color: #a0aec0;
// //   }
// //   .claims-table .checkbox-cell {
// //     text-align: center;
// //   }
// //   .claims-table .checkbox-cell input[type="checkbox"] {
// //     cursor: pointer;
// //   }
// // `;

// // // ---------- Helper Functions ----------
// // const formatCurrency = (amount) => {
// //   return new Intl.NumberFormat('en-US', {
// //     style: 'currency',
// //     currency: 'USD',
// //     minimumFractionDigits: 2,
// //     maximumFractionDigits: 2,
// //   }).format(amount);
// // };

// // const formatDate = (dateString) => {
// //   if (!dateString) return '';
// //   try {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString();
// //   } catch {
// //     return dateString;
// //   }
// // };

// // // ---------- Claim Row Class ----------
// // class ClaimRow {
// //   constructor(data = {}) {
// //     this.id = data.id || 0;
// //     this.visitId = data.visitId || 0;
// //     this.patientName = data.patientName || '';
// //     this.doctorName = data.doctorName || '';
// //     this.insuranceProvider = data.insuranceProvider || '';
// //     this.insuranceAmount = data.insuranceAmount || 0;
// //     this.insurancePaidAmount = data.insurancePaidAmount || 0;
// //     this.insuranceDiscount = data.insuranceDiscount || 0;
// //     this.insuranceOutstanding = data.insuranceOutstanding || 0;
// //     this.originalAmount = data.originalAmount || 0;
// //     this.paymentMethod = data.paymentMethod || '';
// //     this.insuranceClass = data.insuranceClass || '';
// //     this.insuranceType = data.insuranceType || '';
// //     this.coveragePercent = data.coveragePercent || 0;
// //     this.insuranceAcceptNumber = data.insuranceAcceptNumber || '';
// //     this.insuranceCardId = data.insuranceCardId || '';
// //     this.insuranceFormId = data.insuranceFormId || '';
// //     this.terminalId = data.terminalId || '';
// //     this.referenceNumber = data.referenceNumber || '';
// //     this.cardType = data.cardType || '';
// //     this.approvalCode = data.approvalCode || '';
// //     this.paidAt = data.paidAt || '';
// //     this.visitDate = data.visitDate || '';
// //     this.currency = data.currency || 'USD';
// //     this.insurancePaid = data.insurancePaid || false;
// //     this.insuranceSettled = data.insuranceSettled || false;
// //     this.selected = false;
// //   }

// //   static fromJson(json) {
// //     return new ClaimRow({
// //       id: json.id || 0,
// //       visitId: json.visitId || 0,
// //       patientName: json.patientName || json.patient?.fullName || '',
// //       doctorName: json.doctorName || json.doctor?.fullName || '',
// //       insuranceProvider: json.insuranceProvider || '',
// //       insuranceAmount: json.insuranceAmount || 0,
// //       insurancePaidAmount: json.insurancePaidAmount || 0,
// //       insuranceDiscount: json.insuranceDiscount || 0,
// //       insuranceOutstanding: json.insuranceOutstanding || 0,
// //       originalAmount: json.originalAmount || 0,
// //       paymentMethod: json.paymentMethod || '',
// //       insuranceClass: json.insuranceClass || '',
// //       insuranceType: json.insuranceType || '',
// //       coveragePercent: json.coveragePercent || 0,
// //       insuranceAcceptNumber: json.insuranceAcceptNumber || '',
// //       insuranceCardId: json.insuranceCardId || '',
// //       insuranceFormId: json.insuranceFormId || '',
// //       terminalId: json.terminalId || '',
// //       referenceNumber: json.referenceNumber || '',
// //       cardType: json.cardType || '',
// //       approvalCode: json.approvalCode || '',
// //       paidAt: json.paidAt || '',
// //       visitDate: json.visitDate || '',
// //       currency: json.currency || 'USD',
// //       insurancePaid: json.insurancePaid || false,
// //       insuranceSettled: json.insuranceSettled || false,
// //     });
// //   }
// // }

// // // ---------- Folder Row Class ----------
// // class FolderRow {
// //   constructor(data = {}) {
// //     this.id = data.id || 0;
// //     this.name = data.name || '';
// //     this.description = data.description || '';
// //   }

// //   static fromJson(json) {
// //     return new FolderRow({
// //       id: json.id || 0,
// //       name: json.name || '',
// //       description: json.description || '',
// //     });
// //   }
// // }

// // // ---------- Main Component ----------
// // const ClaimsTrackingScreen = ({ loggedUser, lang = 'en', onClose }) => {
// //   // ---------- Translations ----------

// //   const [folderName, setFolderName] = useState('');

// //   const t = React.useMemo(() => {
// //     const translations = {
// //       en: {
// //         title: 'Claims Tracking',
// //         search: { claims: 'Search claims...' },
// //         allClaims: 'All Claims',
// //         unpaidClaims: 'Unpaid Claims',
// //         selectFolder: 'Select Folder',
// //         refresh: 'Refresh',
// //         createFolder: 'Create Folder',
// //         folders: 'Folders',
// //         from: 'From',
// //         to: 'To',
// //         search: 'Search',
// //         claimsList: 'Claims List',
// //         export: 'Export',
// //         viewAll: 'View All',
// //         selected: 'selected',
// //         addToFolder: 'Add to Folder',
// //         removeSelected: 'Remove Selected',
// //         selectAll: 'Select All',
// //         claimsCount: 'Claims',
// //         recordsLoaded: 'Records Loaded',
// //         online: 'Online',
// //         column: {
// //           id: '#',
// //           patient: 'Patient',
// //           doctor: 'Doctor',
// //           provider: 'Provider',
// //           insurance: 'Insurance',
// //           paid: 'Paid',
// //           outstanding: 'Outstanding',
// //           paidStatus: 'Status',
// //           paidAt: 'Date',
// //           action: 'Action',
// //           name: 'Name',
// //           description: 'Description',
// //         },
// //         paid: 'Paid',
// //         pending: 'Pending',
// //         settle: 'Settle',
// //         chooseFolder: 'Choose Folder',
// //         selectFolderHeader: 'Select a folder to add claims',
// //         noFolderSelected: 'Please select a folder first',
// //         noClaimsSelected: 'Please select claims first',
// //         addedToFolder: 'Claims added to folder successfully',
// //         error: 'An error occurred',
// //         errorLoading: 'Failed to load data',
// //         createFolderTitle: 'Create Folder',
// //         createFolderHeader: 'Enter folder name',
// //         folderName: 'Folder name:',
// //         folderCreated: 'Folder created successfully',
// //         failedLoadingFolders: 'Failed to load folders',
// //         delete: 'Delete',
// //         deleteFolderTitle: 'Delete Folder',
// //         deleteFolderHeader: 'Delete Folder',
// //         deleteFolderContent: 'Are you sure you want to delete folder',
// //         folderDeleted: 'Folder deleted successfully',
// //         errorDeleting: 'Error deleting folder',
// //         serverError: 'Server error',
// //         deleteFailed: 'Delete failed',
// //         alertItemsRemoved: 'Items removed from folder',
// //         settleInsuranceTitle: 'Settle Insurance',
// //         settleInsuranceHeader: 'Enter settlement details',
// //         insuranceAmount: 'Insurance Amount',
// //         paidAmount: 'Paid Amount',
// //         discountAmount: 'Discount Amount',
// //         outstanding: 'Outstanding',
// //         totalAmount: 'Total Amount',
// //         valuesNegative: 'Values cannot be negative',
// //         validationValid: '✓ Valid settlement amount',
// //         validationRemaining: 'Remaining amount',
// //         validationExceeds: 'Amount exceeds insurance amount',
// //         invalidNumber: 'Please enter valid numbers',
// //         paidDiscountExceed: 'Paid + Discount cannot exceed insurance amount',
// //         confirmTitle: 'Confirm',
// //         settleConfirmHeader: 'Confirm Insurance Settlement',
// //         settleConfirmContent: 'Please confirm the settlement details:',
// //         settleSuccess: 'Insurance settled successfully',
// //         alertError: 'Error',
// //         selectDates: 'Please select from and to dates',
// //         failedLoadClaims: 'Failed to load claims',
// //         failedLoadFolder: 'Failed to load folder',
// //         failedLoadFolderItems: 'Failed to load folder items',
// //         itemsRemoved: 'Items removed from folder',
// //         close: 'Close',
// //         confirmClose: 'Are you sure you want to close this screen?',
// //         msg: {
// //           confirmClose: 'Are you sure you want to close this screen?',
// //         },
// //         status: {
// //           ready: 'Ready',
// //           loading: 'Loading...',
// //           loaded: 'Loaded',
// //           error: 'Error',
// //           appointments: 'claims',
// //           filtered: 'Filtered',
// //         },
// //         dashboard: {
// //           switchToTable: 'Switch to Table',
// //           switchToCard: 'Switch to Cards',
// //         },
// //         sidebar: {
// //           claimsTracking: 'Claims Tracking',
// //         },
// //       },
// //       ar: {
// //         title: 'تتبع المطالبات',
// //         search: { claims: 'بحث عن المطالبات...' },
// //         allClaims: 'جميع المطالبات',
// //         unpaidClaims: 'المطالبات غير المدفوعة',
// //         selectFolder: 'اختر مجلد',
// //         refresh: 'تحديث',
// //         createFolder: 'إنشاء مجلد',
// //         folders: 'المجلدات',
// //         from: 'من',
// //         to: 'إلى',
// //         search: 'بحث',
// //         claimsList: 'قائمة المطالبات',
// //         export: 'تصدير',
// //         viewAll: 'عرض الكل',
// //         selected: 'محدد',
// //         addToFolder: 'إضافة إلى مجلد',
// //         removeSelected: 'حذف المحدد',
// //         selectAll: 'تحديد الكل',
// //         claimsCount: 'المطالبات',
// //         recordsLoaded: 'السجلات المحملة',
// //         online: 'متصل',
// //         column: {
// //           id: '#',
// //           patient: 'المريض',
// //           doctor: 'الطبيب',
// //           provider: 'المزود',
// //           insurance: 'التأمين',
// //           paid: 'المدفوع',
// //           outstanding: 'المتبقي',
// //           paidStatus: 'الحالة',
// //           paidAt: 'التاريخ',
// //           action: 'إجراء',
// //           name: 'الاسم',
// //           description: 'الوصف',
// //         },
// //         paid: 'مدفوع',
// //         pending: 'معلق',
// //         settle: 'تسوية',
// //         chooseFolder: 'اختر مجلد',
// //         selectFolderHeader: 'اختر مجلد لإضافة المطالبات',
// //         noFolderSelected: 'يرجى اختيار مجلد أولاً',
// //         noClaimsSelected: 'يرجى اختيار مطالبات أولاً',
// //         addedToFolder: 'تمت إضافة المطالبات إلى المجلد بنجاح',
// //         error: 'حدث خطأ',
// //         errorLoading: 'فشل تحميل البيانات',
// //         createFolderTitle: 'إنشاء مجلد',
// //         createFolderHeader: 'أدخل اسم المجلد',
// //         folderName: 'اسم المجلد:',
// //         folderCreated: 'تم إنشاء المجلد بنجاح',
// //         failedLoadingFolders: 'فشل تحميل المجلدات',
// //         delete: 'حذف',
// //         deleteFolderTitle: 'حذف المجلد',
// //         deleteFolderHeader: 'حذف المجلد',
// //         deleteFolderContent: 'هل أنت متأكد من حذف المجلد',
// //         folderDeleted: 'تم حذف المجلد بنجاح',
// //         errorDeleting: 'خطأ في حذف المجلد',
// //         serverError: 'خطأ في الخادم',
// //         deleteFailed: 'فشل الحذف',
// //         alertItemsRemoved: 'تمت إزالة العناصر من المجلد',
// //         settleInsuranceTitle: 'تسوية التأمين',
// //         settleInsuranceHeader: 'أدخل تفاصيل التسوية',
// //         insuranceAmount: 'مبلغ التأمين',
// //         paidAmount: 'المبلغ المدفوع',
// //         discountAmount: 'مبلغ الخصم',
// //         outstanding: 'المتبقي',
// //         totalAmount: 'المبلغ الإجمالي',
// //         valuesNegative: 'لا يمكن أن تكون القيم سالبة',
// //         validationValid: '✓ مبلغ تسوية صحيح',
// //         validationRemaining: 'المبلغ المتبقي',
// //         validationExceeds: 'المبلغ يتجاوز مبلغ التأمين',
// //         invalidNumber: 'يرجى إدخال أرقام صحيحة',
// //         paidDiscountExceed: 'المدفوع + الخصم لا يمكن أن يتجاوز مبلغ التأمين',
// //         confirmTitle: 'تأكيد',
// //         settleConfirmHeader: 'تأكيد تسوية التأمين',
// //         settleConfirmContent: 'يرجى تأكيد تفاصيل التسوية:',
// //         settleSuccess: 'تمت تسوية التأمين بنجاح',
// //         alertError: 'خطأ',
// //         selectDates: 'يرجى تحديد تاريخ البداية والنهاية',
// //         failedLoadClaims: 'فشل تحميل المطالبات',
// //         failedLoadFolder: 'فشل تحميل المجلد',
// //         failedLoadFolderItems: 'فشل تحميل عناصر المجلد',
// //         itemsRemoved: 'تمت إزالة العناصر من المجلد',
// //         close: 'إغلاق',
// //         confirmClose: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
// //         status: {
// //           ready: 'جاهز',
// //           loading: 'جاري التحميل...',
// //           loaded: 'تم التحميل',
// //           error: 'خطأ',
// //           appointments: 'مطالبات',
// //           filtered: 'تم التصفية',
// //         },
// //         dashboard: {
// //           switchToTable: 'التبديل إلى الجدول',
// //           switchToCard: 'التبديل إلى البطاقات',
// //         },
// //         sidebar: {
// //           claimsTracking: 'تتبع المطالبات',
// //         },
// //       },
// //     };

// //     return translations[lang] || translations.en;
// //   }, [lang]);

// //   // ---------- State ----------
// //   const [claims, setClaims] = useState([]);
// //   const [filteredClaims, setFilteredClaims] = useState([]);
// //   const [folders, setFolders] = useState([]);
// //   const [selectedFolder, setSelectedFolder] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [stats, setStats] = useState({ total: 0, outstanding: 0 });
// //   const [filterType, setFilterType] = useState('unpaid');
// //   const [fromDate, setFromDate] = useState('');
// //   const [toDate, setToDate] = useState('');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [isInitialLoad, setIsInitialLoad] = useState(true);
// //   const [showSettleModal, setShowSettleModal] = useState(false);
// //   const [showFolderModal, setShowFolderModal] = useState(false);
// //   const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
// //   const [currentClaim, setCurrentClaim] = useState(null);
  
// //   // Settle form state
// //   const [settlePaidAmount, setSettlePaidAmount] = useState('');
// //   const [settleDiscountAmount, setSettleDiscountAmount] = useState('');
// //   const [settleValidationMsg, setSettleValidationMsg] = useState('');
// //   const [settleValidationType, setSettleValidationType] = useState('');
// //   const [settleTotalDisplay, setSettleTotalDisplay] = useState('$0.00');

// //   // ---------- Helper: log action ----------
// //   const logAction = useCallback(async (action, details) => {
// //     try {
// //       await fetch(`${BASE_URL}/api/logs/add`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ username: loggedUser, action, details }),
// //       });
// //     } catch (e) { /* ignore */ }
// //   }, [loggedUser]);

// //   // ---------- API Calls ----------
// //   const loadClaims = useCallback(async (endpoint) => {
// //     setLoading(true);

// //     try {
// //       const url = `${BASE_URL}${endpoint}`;
// //       console.log('📤 Loading claims from:', url);
      
// //       const res = await fetch(url);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       const data = await res.json();
// //       const claimsData = Array.isArray(data) ? data : [data];
      
// //       const parsedClaims = claimsData.map(item => ClaimRow.fromJson(item));
      
// //       setClaims(parsedClaims);
// //       setFilteredClaims(parsedClaims);
      
// //       // Update stats
// //       const totalOutstanding = parsedClaims
// //         .filter(c => !c.insurancePaid)
// //         .reduce((sum, c) => sum + c.insuranceOutstanding, 0);
      
// //       setStats({
// //         total: parsedClaims.length,
// //         outstanding: totalOutstanding,
// //       });
// //     } catch (err) {
// //       console.error('🚨 Load error:', err);
// //       setClaims([]);
// //       setFilteredClaims([]);
// //     } finally {
// //       setLoading(false);
// //       setIsInitialLoad(false);
// //     }
// //   }, []);

// //   const loadUnpaidClaims = useCallback(() => {
// //     loadClaims('/api/visits/outstanding');
// //   }, [loadClaims]);

// //   const loadAllClaims = useCallback(() => {
// //     loadClaims('/api/visits');
// //   }, [loadClaims]);

// //   const loadClaimsByDateRange = useCallback(async () => {
// //     if (!fromDate || !toDate) {
// //       alert(t.selectDates);
// //       return;
// //     }
// //     loadClaims(`/api/visits/between-dates?fromDate=${fromDate}&toDate=${toDate}`);
// //   }, [fromDate, toDate, loadClaims, t.selectDates]);

// //   const loadFolders = useCallback(async () => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/folders`);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       const data = await res.json();
// //       const folderData = Array.isArray(data) ? data : [data];
// //       const parsedFolders = folderData.map(item => FolderRow.fromJson(item));
      
// //       setFolders(parsedFolders);
// //     } catch (err) {
// //       console.error('🚨 Load folders error:', err);
// //       alert(t.failedLoadingFolders);
// //     }
// //   }, [t.failedLoadingFolders]);

// //   const loadFolderItems = useCallback(async (folderId) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       const data = await res.json();
// //       const ids = Array.isArray(data) ? data : [data];
      
// //       if (ids.length > 0) {
// //         const idsParam = ids.join(',');
// //         loadClaims(`/api/visits/by-ids?ids=${idsParam}`);
// //       } else {
// //         setClaims([]);
// //         setFilteredClaims([]);
// //       }
// //     } catch (err) {
// //       console.error('🚨 Load folder items error:', err);
// //       alert(t.failedLoadFolder);
// //     }
// //   }, [loadClaims, t.failedLoadFolder]);

// //   const createFolder = useCallback(async (name) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/folders`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ name, description: '' }),
// //       });
      
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       alert(t.folderCreated);
// //       loadFolders();
// //       setShowCreateFolderModal(false);
// //     } catch (err) {
// //       console.error('🚨 Create folder error:', err);
// //       alert(t.alertError);
// //     }
// //   }, [loadFolders, t.folderCreated, t.alertError]);

// //   const deleteFolder = useCallback(async (folderId) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/folders/${folderId}`, {
// //         method: 'DELETE',
// //       });
      
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       alert(t.folderDeleted);
// //       loadFolders();
// //       setShowFolderModal(false);
// //     } catch (err) {
// //       console.error('🚨 Delete folder error:', err);
// //       alert(t.errorDeleting);
// //     }
// //   }, [loadFolders, t.folderDeleted, t.errorDeleting]);

// //   const removeClaimsFromFolder = useCallback(async (folderId, claimIds) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`, {
// //         method: 'DELETE',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(claimIds),
// //       });
      
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       alert(t.itemsRemoved);
// //       // Refresh the folder items
// //       if (folderId) {
// //         loadFolderItems(folderId);
// //       }
// //     } catch (err) {
// //       console.error('🚨 Remove from folder error:', err);
// //       alert(t.deleteFailed);
// //     }
// //   }, [loadFolderItems, t.itemsRemoved, t.deleteFailed]);

// //   const settleInsurance = useCallback(async (claimId, paidAmount, discountAmount) => {
// //     try {
// //       const url = `${BASE_URL}/api/visits/payments/insurance/${claimId}/settle?paidAmount=${paidAmount}&discountAmount=${discountAmount}`;
// //       console.log('📤 Settling insurance:', url);
      
// //       const res = await fetch(url, {
// //         method: 'PUT',
// //       });
      
// //       if (!res.ok) {
// //         const errorText = await res.text();
// //         throw new Error(`HTTP ${res.status}: ${errorText}`);
// //       }
      
// //       alert(t.settleSuccess);
// //       loadUnpaidClaims();
// //       setShowSettleModal(false);
// //       logAction('SETTLE_INSURANCE', `Settled insurance for claim ${claimId}`);
// //     } catch (err) {
// //       console.error('🚨 Settle error:', err);
// //       alert(`${t.serverError}: ${err.message}`);
// //     }
// //   }, [loadUnpaidClaims, t.settleSuccess, t.serverError, logAction]);

// //   // ---------- Handlers ----------
// //   const handleFilterChange = (e) => {
// //     const value = e.target.value;
// //     setFilterType(value);
    
// //     if (value === 'all') {
// //       loadAllClaims();
// //     } else if (value === 'unpaid') {
// //       loadUnpaidClaims();
// //     }
// //   };

// //   const handleFolderSelect = (e) => {
// //     const folderId = parseInt(e.target.value);
// //     if (folderId) {
// //       const folder = folders.find(f => f.id === folderId);
// //       setSelectedFolder(folder);
// //       loadFolderItems(folderId);
// //     } else {
// //       setSelectedFolder(null);
// //       loadUnpaidClaims();
// //     }
// //   };

// //   const handleSearch = (e) => {
// //     const query = e.target.value.toLowerCase();
// //     setSearchQuery(query);
    
// //     if (query.trim() === '') {
// //       // Reset to current filter
// //       if (filterType === 'all') {
// //         loadAllClaims();
// //       } else {
// //         loadUnpaidClaims();
// //       }
// //       return;
// //     }
    
// //     // Client-side filtering
// //     const filtered = claims.filter(claim => {
// //       return (
// //         claim.patientName.toLowerCase().includes(query) ||
// //         claim.doctorName.toLowerCase().includes(query) ||
// //         claim.insuranceProvider.toLowerCase().includes(query) ||
// //         claim.insuranceClass.toLowerCase().includes(query) ||
// //         claim.insuranceType.toLowerCase().includes(query) ||
// //         claim.insuranceAcceptNumber?.toLowerCase().includes(query) ||
// //         claim.insuranceCardId?.toLowerCase().includes(query) ||
// //         claim.insuranceFormId?.toLowerCase().includes(query) ||
// //         claim.terminalId?.toLowerCase().includes(query) ||
// //         claim.referenceNumber?.toLowerCase().includes(query) ||
// //         claim.cardType?.toLowerCase().includes(query) ||
// //         claim.approvalCode?.toLowerCase().includes(query) ||
// //         claim.paidAt?.toLowerCase().includes(query) ||
// //         claim.visitDate?.toLowerCase().includes(query) ||
// //         claim.currency?.toLowerCase().includes(query) ||
// //         String(claim.id).includes(query) ||
// //         String(claim.visitId).includes(query) ||
// //         String(claim.amount).includes(query) ||
// //         String(claim.insuranceAmount).includes(query) ||
// //         String(claim.insurancePaidAmount).includes(query) ||
// //         String(claim.insuranceDiscount).includes(query) ||
// //         String(claim.insuranceOutstanding).includes(query) ||
// //         String(claim.originalAmount).includes(query) ||
// //         String(claim.coveragePercent).includes(query)
// //       );
// //     });
    
// //     setFilteredClaims(filtered);
// //     updateStats(filtered);
// //   };

// //   const handleSelectAll = (e) => {
// //     const checked = e.target.checked;
// //     setFilteredClaims(prev => prev.map(c => ({ ...c, selected: checked })));
// //     setClaims(prev => prev.map(c => ({ ...c, selected: checked })));
// //   };

// //   const handleSelectOne = (id) => {
// //     setFilteredClaims(prev => prev.map(c => 
// //       c.id === id ? { ...c, selected: !c.selected } : c
// //     ));
// //     setClaims(prev => prev.map(c => 
// //       c.id === id ? { ...c, selected: !c.selected } : c
// //     ));
// //   };

// //   const handleAddToFolder = () => {
// //     const selectedIds = filteredClaims.filter(c => c.selected).map(c => c.id);
// //     if (selectedIds.length === 0) {
// //       alert(t.noClaimsSelected);
// //       return;
// //     }
// //     setShowFolderModal(true);
// //   };

// //   const handleRemoveFromFolder = () => {
// //     if (!selectedFolder) {
// //       alert(t.noFolderSelected);
// //       return;
// //     }
    
// //     const selectedIds = filteredClaims.filter(c => c.selected).map(c => c.id);
// //     if (selectedIds.length === 0) {
// //       alert(t.noClaimsSelected);
// //       return;
// //     }
    
// //     if (window.confirm(`Remove ${selectedIds.length} claims from folder "${selectedFolder.name}"?`)) {
// //       removeClaimsFromFolder(selectedFolder.id, selectedIds);
// //     }
// //   };

// //   const handleSettleClick = (claim) => {
// //     setCurrentClaim(claim);
// //     setSettlePaidAmount('');
// //     setSettleDiscountAmount('');
// //     setSettleValidationMsg('');
// //     setSettleValidationType('');
// //     setSettleTotalDisplay('$0.00');
// //     setShowSettleModal(true);
// //   };

// //   const validateSettleAmounts = useCallback(() => {
// //     if (!currentClaim) return false;
    
// //     const paidVal = parseFloat(settlePaidAmount) || 0;
// //     const discountVal = parseFloat(settleDiscountAmount) || 0;
// //     const insuranceAmount = currentClaim.insuranceAmount;
// //     const total = paidVal + discountVal;
    
// //     // Check for negative values
// //     if (paidVal < 0 || discountVal < 0) {
// //       setSettleValidationMsg(t.valuesNegative);
// //       setSettleValidationType('error');
// //       setSettleTotalDisplay(formatCurrency(total));
// //       return false;
// //     }
    
// //     // Check if total equals insurance amount
// //     if (Math.abs(total - insuranceAmount) <= 0.01) {
// //       setSettleValidationMsg(t.validationValid);
// //       setSettleValidationType('success');
// //       setSettleTotalDisplay(formatCurrency(total));
// //       return true;
// //     } else if (total < insuranceAmount) {
// //       const remaining = insuranceAmount - total;
// //       setSettleValidationMsg(`${t.validationRemaining}: ${formatCurrency(remaining)}`);
// //       setSettleValidationType('warning');
// //       setSettleTotalDisplay(formatCurrency(total));
// //       return false;
// //     } else {
// //       const excess = total - insuranceAmount;
// //       setSettleValidationMsg(`${t.validationExceeds}: ${formatCurrency(excess)}`);
// //       setSettleValidationType('error');
// //       setSettleTotalDisplay(formatCurrency(total));
// //       return false;
// //     }
// //   }, [currentClaim, settlePaidAmount, settleDiscountAmount, t]);

// //   const handleSettleConfirm = () => {
// //     if (!currentClaim) return;
    
// //     const paidVal = parseFloat(settlePaidAmount) || 0;
// //     const discountVal = parseFloat(settleDiscountAmount) || 0;
// //     const total = paidVal + discountVal;
// //     const insuranceAmount = currentClaim.insuranceAmount;
    
// //     // Final validation
// //     if (paidVal < 0 || discountVal < 0) {
// //       alert(t.valuesNegative);
// //       return;
// //     }
    
// //     if (Math.abs(total - insuranceAmount) > 0.01) {
// //       alert(`${t.paidDiscountExceed} (${formatCurrency(insuranceAmount)}). Total: ${formatCurrency(total)}`);
// //       return;
// //     }
    
// //     // Confirm before settling
// //     if (window.confirm(
// //       `${t.settleConfirmContent}\n\n` +
// //       `${t.paidAmount}: ${formatCurrency(paidVal)}\n` +
// //       `${t.discountAmount}: ${formatCurrency(discountVal)}\n` +
// //       `${t.totalAmount}: ${formatCurrency(total)}`
// //     )) {
// //       settleInsurance(currentClaim.id, paidVal, discountVal);
// //     }
// //   };

// //   const updateStats = (claimsList) => {
// //     const list = claimsList || filteredClaims;
// //     const totalOutstanding = list
// //       .filter(c => !c.insurancePaid)
// //       .reduce((sum, c) => sum + c.insuranceOutstanding, 0);
    
// //     setStats({
// //       total: list.length,
// //       outstanding: totalOutstanding,
// //     });
// //   };

// //   const exportToCSV = () => {
// //     if (filteredClaims.length === 0) {
// //       alert('No claims to export');
// //       return;
// //     }
    
// //     // Create CSV content
// //     let csv = 'ID,Patient,Doctor,Provider,Insurance Amount,Paid Amount,Outstanding,Status,Date\n';
    
// //     filteredClaims.forEach(claim => {
// //       const row = [
// //         claim.id,
// //         `"${claim.patientName || ''}"`,
// //         `"${claim.doctorName || ''}"`,
// //         `"${claim.insuranceProvider || ''}"`,
// //         claim.insuranceAmount.toFixed(2),
// //         claim.insurancePaidAmount.toFixed(2),
// //         claim.insuranceOutstanding.toFixed(2),
// //         claim.insurancePaid ? 'Paid' : 'Unpaid',
// //         claim.paidAt || '',
// //       ];
// //       csv += row.join(',') + '\n';
// //     });
    
// //     // Download CSV
// //     const blob = new Blob([csv], { type: 'text/csv' });
// //     const url = window.URL.createObjectURL(blob);
// //     const a = document.createElement('a');
// //     a.href = url;
// //     a.download = `claims_export_${new Date().toISOString().split('T')[0]}.csv`;
// //     a.click();
// //     window.URL.revokeObjectURL(url);
    
// //     alert('Export completed successfully');
// //   };

// //   // ---------- Effects ----------
// //   useEffect(() => {
// //     if (isInitialLoad) {
// //       loadUnpaidClaims();
// //       loadFolders();
// //     }
// //   }, [isInitialLoad, loadUnpaidClaims, loadFolders]);

// //   // Validate settle amounts on input change
// //   useEffect(() => {
// //     if (showSettleModal) {
// //       validateSettleAmounts();
// //     }
// //   }, [settlePaidAmount, settleDiscountAmount, showSettleModal, validateSettleAmounts]);

// //   // ---------- Render Helpers ----------
// //   const getSelectedCount = () => {
// //     return filteredClaims.filter(c => c.selected).length;
// //   };

// //   const renderStats = () => {
// //     return (
// //       <div className="claims-stats-section">
// //         <div className="stat-item">
// //           {t.claimsCount}: {stats.total}
// //         </div>
// //         <div className="stat-item" style={{ color: '#e53e3e' }}>
// //           {t.column.outstanding}: {formatCurrency(stats.outstanding)}
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderFilterSection = () => {
// //     return (
// //       <div className="claims-filter-section">
// //         <select value={filterType} onChange={handleFilterChange}>
// //           <option value="all">{t.allClaims}</option>
// //           <option value="unpaid">{t.unpaidClaims}</option>
// //         </select>
        
// //         <select value={selectedFolder?.id || ''} onChange={handleFolderSelect}>
// //           <option value="">{t.selectFolder}</option>
// //           {folders.map(folder => (
// //             <option key={folder.id} value={folder.id}>{folder.name}</option>
// //           ))}
// //         </select>
        
// //         <input
// //           type="date"
// //           value={fromDate}
// //           onChange={(e) => setFromDate(e.target.value)}
// //           placeholder={t.from}
// //         />
// //         <input
// //           type="date"
// //           value={toDate}
// //           onChange={(e) => setToDate(e.target.value)}
// //           placeholder={t.to}
// //         />
// //         <button
// //           onClick={loadClaimsByDateRange}
// //           style={{
// //             background: '#4a90d9',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '20px',
// //             padding: '8px 20px',
// //             fontWeight: 'bold',
// //             cursor: 'pointer',
// //           }}
// //         >
// //           📅 {t.search}
// //         </button>
        
// //         <input
// //           type="text"
// //           value={searchQuery}
// //           onChange={handleSearch}
// //           placeholder={t.search.claims}
// //           style={{
// //             flex: 1,
// //             minWidth: '150px',
// //             borderRadius: '20px',
// //             padding: '8px 15px',
// //             border: '1px solid #e2e8f0',
// //           }}
// //         />
        
// //         <button
// //           onClick={() => {
// //             setClaims([]);
// //             setFilteredClaims([]);
// //             setSelectedFolder(null);
// //             loadUnpaidClaims();
// //           }}
// //           style={{
// //             background: '#2d3748',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '20px',
// //             padding: '8px 20px',
// //             fontWeight: 'bold',
// //             cursor: 'pointer',
// //           }}
// //         >
// //           🔄 {t.refresh}
// //         </button>
        
// //         <button
// //           onClick={() => setShowCreateFolderModal(true)}
// //           style={{
// //             background: '#38a169',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '20px',
// //             padding: '8px 20px',
// //             fontWeight: 'bold',
// //             cursor: 'pointer',
// //           }}
// //         >
// //           📁 {t.createFolder}
// //         </button>
        
// //         <button
// //           onClick={() => {
// //             loadFolders();
// //             setShowFolderModal(true);
// //           }}
// //           style={{
// //             background: '#6b46c1',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '20px',
// //             padding: '8px 20px',
// //             fontWeight: 'bold',
// //             cursor: 'pointer',
// //           }}
// //         >
// //           📂 {t.folders}
// //         </button>
// //       </div>
// //     );
// //   };

// //   const renderSelectionBar = () => {
// //     const selectedCount = getSelectedCount();
// //     if (selectedCount === 0) return null;
    
// //     return (
// //       <div className="claims-selection-bar">
// //         <span className="selected-count">
// //           {selectedCount} {t.selected}
// //         </span>
// //         <button
// //           onClick={handleAddToFolder}
// //           style={{ background: '#38a169', color: 'white' }}
// //         >
// //           📂 {t.addToFolder}
// //         </button>
// //         {selectedFolder && (
// //           <button
// //             onClick={handleRemoveFromFolder}
// //             style={{ background: '#e53e3e', color: 'white' }}
// //           >
// //             🗑️ {t.removeSelected}
// //           </button>
// //         )}
// //         <div style={{ flex: 1 }}></div>
// //         <button
// //           onClick={() => {
// //             setFilteredClaims(prev => prev.map(c => ({ ...c, selected: false })));
// //             setClaims(prev => prev.map(c => ({ ...c, selected: false })));
// //           }}
// //           style={{ background: 'transparent', color: '#a0aec0' }}
// //         >
// //           ✕
// //         </button>
// //       </div>
// //     );
// //   };

// //   const renderTable = () => {
// //     if (loading && isInitialLoad) {
// //       return <div className="claims-loading">⏳ Loading...</div>;
// //     }
    
// //     if (filteredClaims.length === 0) {
// //       return <div className="claims-empty">📭 No claims found</div>;
// //     }
    
// //     return (
// //       <div className="claims-table-wrapper">
// //         <table className="claims-table">
// //           <thead>
// //             <tr>
// //               <th style={{ width: '40px', textAlign: 'center' }}>
// //                 <input
// //                   type="checkbox"
// //                   checked={filteredClaims.every(c => c.selected)}
// //                   onChange={handleSelectAll}
// //                 />
// //               </th>
// //               <th>{t.column.id}</th>
// //               <th>{t.column.patient}</th>
// //               <th>{t.column.doctor}</th>
// //               <th>{t.column.provider}</th>
// //               <th>{t.column.insurance}</th>
// //               <th>{t.column.paid}</th>
// //               <th>{t.column.outstanding}</th>
// //               <th>{t.column.paidStatus}</th>
// //               <th>{t.column.paidAt}</th>
// //               <th>{t.column.action}</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredClaims.map(claim => (
// //               <tr key={claim.id}>
// //                 <td style={{ textAlign: 'center' }}>
// //                   <input
// //                     type="checkbox"
// //                     checked={claim.selected}
// //                     onChange={() => handleSelectOne(claim.id)}
// //                   />
// //                 </td>
// //                 <td>{claim.id}</td>
// //                 <td style={{ fontWeight: 'bold' }}>{claim.patientName}</td>
// //                 <td>{claim.doctorName}</td>
// //                 <td>{claim.insuranceProvider}</td>
// //                 <td className="amount-positive">{formatCurrency(claim.insuranceAmount)}</td>
// //                 <td style={{ color: '#38a169' }}>{formatCurrency(claim.insurancePaidAmount)}</td>
// //                 <td className={claim.insuranceOutstanding > 0 ? 'amount-negative' : 'amount-positive'}>
// //                   {formatCurrency(claim.insuranceOutstanding)}
// //                 </td>
// //                 <td>
// //                   <span className={claim.insurancePaid ? 'status-paid' : 'status-pending'}>
// //                     {claim.insurancePaid ? `✓ ${t.paid}` : `⏳ ${t.pending}`}
// //                   </span>
// //                 </td>
// //                 <td>{formatDate(claim.paidAt)}</td>
// //                 <td>
// //                   {claim.paymentMethod === 'INSURANCE' && !claim.insurancePaid && (
// //                     <button
// //                       className="settle-btn"
// //                       onClick={() => handleSettleClick(claim)}
// //                     >
// //                       {t.settle}
// //                     </button>
// //                   )}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     );
// //   };

// //   const renderSettleModal = () => {
// //     if (!showSettleModal || !currentClaim) return null;
    
// //     return (
// //       <div className="claims-modal-overlay">
// //         <div className="claims-modal">
// //           <h3>💰 {t.settleInsuranceTitle}</h3>
// //           <p style={{ color: '#4a5568', marginBottom: '15px' }}>
// //             {t.settleInsuranceHeader}
// //           </p>
          
// //           <div className="form-group">
// //             <label>{t.insuranceAmount}:</label>
// //             <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#2d3748' }}>
// //               {formatCurrency(currentClaim.insuranceAmount)}
// //             </div>
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.outstanding}:</label>
// //             <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#e53e3e' }}>
// //               {formatCurrency(currentClaim.insuranceOutstanding)}
// //             </div>
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.paidAmount}:</label>
// //             <input
// //               type="number"
// //               step="0.01"
// //               min="0"
// //               value={settlePaidAmount}
// //               onChange={(e) => setSettlePaidAmount(e.target.value)}
// //               placeholder="0.00"
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.discountAmount}:</label>
// //             <input
// //               type="number"
// //               step="0.01"
// //               min="0"
// //               value={settleDiscountAmount}
// //               onChange={(e) => setSettleDiscountAmount(e.target.value)}
// //               placeholder="0.00"
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.totalAmount}:</label>
// //             <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
// //               {settleTotalDisplay}
// //             </div>
// //           </div>
          
// //           {settleValidationMsg && (
// //             <div className={`validation-msg ${settleValidationType}`}>
// //               {settleValidationMsg}
// //             </div>
// //           )}
          
// //           <div className="modal-actions">
// //             <button
// //               className="btn-secondary"
// //               onClick={() => setShowSettleModal(false)}
// //             >
// //               {t.close}
// //             </button>
// //             <button
// //               className="btn-primary"
// //               onClick={handleSettleConfirm}
// //               disabled={settleValidationType !== 'success'}
// //             >
// //               {t.settle}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderFolderModal = () => {
// //     if (!showFolderModal) return null;
    
// //     return (
// //       <div className="claims-modal-overlay">
// //         <div className="claims-modal claims-folder-modal">
// //           <h3>📂 {t.folders}</h3>
          
// //           <div style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
// //             <button
// //               onClick={() => {
// //                 loadFolders();
// //                 setShowFolderModal(true);
// //               }}
// //               style={{
// //                 background: '#4a90d9',
// //                 color: 'white',
// //                 border: 'none',
// //                 borderRadius: '15px',
// //                 padding: '6px 15px',
// //                 cursor: 'pointer',
// //               }}
// //             >
// //               🔄 {t.refresh}
// //             </button>
// //           </div>
          
// //           <div className="claims-table-wrapper">
// //             <table className="folder-table">
// //               <thead>
// //                 <tr>
// //                   <th>{t.column.id}</th>
// //                   <th>{t.column.name}</th>
// //                   <th>{t.column.description}</th>
// //                   <th>{t.column.action}</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {folders.map(folder => (
// //                   <tr key={folder.id}>
// //                     <td>{folder.id}</td>
// //                     <td style={{ fontWeight: 'bold' }}>{folder.name}</td>
// //                     <td>{folder.description}</td>
// //                     <td>
// //                       <button
// //                         className="delete-btn"
// //                         onClick={() => {
// //                           if (window.confirm(`${t.deleteFolderContent} '${folder.name}'?`)) {
// //                             deleteFolder(folder.id);
// //                           }
// //                         }}
// //                       >
// //                         🗑️ {t.delete}
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //                 {folders.length === 0 && (
// //                   <tr>
// //                     <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#a0aec0' }}>
// //                       No folders found
// //                     </td>
// //                   </tr>
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>
          
// //           <div className="modal-actions" style={{ marginTop: '20px' }}>
// //             <button
// //               className="btn-secondary"
// //               onClick={() => setShowFolderModal(false)}
// //             >
// //               {t.close}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderCreateFolderModal = () => {
// //     if (!showCreateFolderModal) return null;
    
    
// //     return (
// //       <div className="claims-modal-overlay">
// //         <div className="claims-modal">
// //           <h3>📁 {t.createFolderTitle}</h3>
// //           <p style={{ color: '#4a5568', marginBottom: '15px' }}>
// //             {t.createFolderHeader}
// //           </p>
          
// //           <div className="form-group">
// //             <label>{t.folderName}</label>
// //             <input
// //               type="text"
// //               value={folderName}
// //               onChange={(e) => setFolderName(e.target.value)}
// //               placeholder={t.folderName}
// //               autoFocus
// //               onKeyDown={(e) => {
// //                 if (e.key === 'Enter' && folderName.trim()) {
// //                   createFolder(folderName.trim());
// //                 }
// //               }}
// //             />
// //           </div>
          
// //           <div className="modal-actions">
// //             <button
// //               className="btn-secondary"
// //               onClick={() => setShowCreateFolderModal(false)}
// //             >
// //               {t.close}
// //             </button>
// //             <button
// //               className="btn-primary"
// //               onClick={() => {
// //                 if (folderName.trim()) {
// //                   createFolder(folderName.trim());
// //                 }
// //               }}
// //               disabled={!folderName.trim()}
// //             >
// //               {t.createFolder}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // ---------- Render ----------
// //   return (
// //     <>
// //       <style>{styles}</style>
// //       <div className="claims-container">
// //         {/* Header */}
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
// //           <h2 style={{ margin: 0 }}>📑 {t.title}</h2>
// //           <button
// //             onClick={onClose}
// //             style={{
// //               background: '#e2e8f0',
// //               border: 'none',
// //               padding: '8px 20px',
// //               borderRadius: '8px',
// //               cursor: 'pointer',
// //               fontSize: '14px',
// //             }}
// //           >
// //             ✕ {t.close}
// //           </button>
// //         </div>

// //         {/* Filter Section */}
// //         <div className="claims-topbar">
// //           {renderFilterSection()}
// //           {renderStats()}
// //         </div>

// //         {/* Selection Bar */}
// //         {renderSelectionBar()}

// //         {/* Table */}
// //         <div className="claims-table-container">
// //           <div className="claims-table-header">
// //             <span className="title">📋 {t.claimsList}</span>
// //             <div className="actions">
// //               <button
// //                 onClick={exportToCSV}
// //                 style={{ background: '#38a169', color: 'white' }}
// //               >
// //                 📊 {t.export}
// //               </button>
// //               <button
// //                 onClick={loadAllClaims}
// //                 style={{ background: '#4a90d9', color: 'white' }}
// //               >
// //                 👁️ {t.viewAll}
// //               </button>
// //             </div>
// //           </div>
// //           {renderTable()}
// //         </div>

// //         {/* Bottom Bar */}
// //         <div className="claims-bottom-bar">
// //           <span className="status-online">● {t.online}</span>
// //           <span>v2.0</span>
// //           <span style={{ flex: 1 }}></span>
// //           <span>{t.recordsLoaded}: {filteredClaims.length}</span>
// //         </div>

// //         {/* Modals */}
// //         {renderSettleModal()}
// //         {renderFolderModal()}
// //         {renderCreateFolderModal()}
// //       </div>
// //     </>
// //   );
// // };

// // export default ClaimsTrackingScreen;


// import React, { useState, useCallback, useEffect } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .claims-container {
//     padding: 20px;
//     background: #f0f2f5;
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .claims-topbar {
//     background: white;
//     padding: 15px;
//     border-radius: 8px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     margin-bottom: 20px;
//   }
//   .claims-filter-section {
//     display: flex;
//     gap: 15px;
//     flex-wrap: wrap;
//     align-items: center;
//     padding: 5px 0;
//   }
//   .claims-filter-section select, 
//   .claims-filter-section input {
//     padding: 8px 12px;
//     border-radius: 20px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//   }
//   .claims-filter-section select:focus,
//   .claims-filter-section input:focus {
//     outline: none;
//     border-color: #4a90d9;
//     box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.1);
//   }
//   .claims-stats-section {
//     display: flex;
//     gap: 30px;
//     padding: 10px 15px;
//     background: #f7fafc;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     margin-top: 10px;
//     flex-wrap: wrap;
//   }
//   .claims-stats-section .stat-item {
//     font-weight: bold;
//     font-size: 14px;
//   }
//   .claims-table-container {
//     background: white;
//     border-radius: 8px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     overflow: hidden;
//   }
//   .claims-table-header {
//     padding: 10px 15px;
//     background: #edf2f7;
//     border-bottom: 1px solid #e2e8f0;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
//   .claims-table-header .title {
//     font-weight: bold;
//     font-size: 16px;
//   }
//   .claims-table-header .actions {
//     display: flex;
//     gap: 10px;
//   }
//   .claims-table-header .actions button {
//     padding: 6px 15px;
//     border: none;
//     border-radius: 15px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//   }
//   .claims-table-header .actions button:hover {
//     transform: scale(1.05);
//   }
//   .claims-table-wrapper {
//     overflow-x: auto;
//   }
//   .claims-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .claims-table th {
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2d3748;
//     border-bottom: 2px solid #e2e8f0;
//     background: #f8f9fa;
//   }
//   .claims-table td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #e2e8f0;
//     vertical-align: middle;
//   }
//   .claims-table tr:hover td {
//     background: #f7fafc;
//   }
//   .claims-table .amount-positive {
//     color: #2d3748;
//     font-weight: bold;
//   }
//   .claims-table .amount-negative {
//     color: #e53e3e;
//     font-weight: bold;
//   }
//   .claims-table .status-paid {
//     color: #38a169;
//     font-weight: bold;
//   }
//   .claims-table .status-pending {
//     color: #e53e3e;
//     font-weight: bold;
//   }
//   .claims-table .settle-btn {
//     background: #4a90d9;
//     color: white;
//     border: none;
//     border-radius: 15px;
//     padding: 4px 12px;
//     font-size: 11px;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .claims-table .settle-btn:hover {
//     background: #357abd;
//     transform: scale(1.05);
//   }
//   .claims-selection-bar {
//     background: #ebf8ff;
//     padding: 8px 15px;
//     border: 1px solid #bee3f8;
//     border-radius: 4px;
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     flex-wrap: wrap;
//   }
//   .claims-selection-bar .selected-count {
//     font-weight: bold;
//     color: #2b6cb0;
//   }
//   .claims-selection-bar button {
//     border: none;
//     border-radius: 15px;
//     padding: 4px 15px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 12px;
//   }
//   .claims-selection-bar button:hover {
//     transform: scale(1.05);
//   }
//   .claims-bottom-bar {
//     display: flex;
//     justify-content: flex-end;
//     padding: 10px 15px;
//     background: #f7fafc;
//     border-top: 1px solid #e2e8f0;
//     gap: 15px;
//     font-size: 12px;
//     color: #4a5568;
//     margin-top: 15px;
//   }
//   .claims-bottom-bar .status-online {
//     color: #38a169;
//   }
//   .claims-modal-overlay {
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
//   .claims-modal {
//     background: white;
//     border-radius: 12px;
//     padding: 25px;
//     max-width: 500px;
//     width: 95%;
//     max-height: 90vh;
//     overflow-y: auto;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   }
//   .claims-modal h3 {
//     margin: 0 0 15px 0;
//   }
//   .claims-modal .form-group {
//     margin-bottom: 15px;
//   }
//   .claims-modal .form-group label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
//   }
//   .claims-modal .form-group input {
//     width: 100%;
//     padding: 8px 12px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//   }
//   .claims-modal .form-group input:focus {
//     outline: none;
//     border-color: #4a90d9;
//   }
//   .claims-modal .validation-msg {
//     font-size: 13px;
//     font-weight: bold;
//     margin-top: 5px;
//   }
//   .claims-modal .validation-msg.success {
//     color: #38a169;
//   }
//   .claims-modal .validation-msg.error {
//     color: #e53e3e;
//   }
//   .claims-modal .validation-msg.warning {
//     color: #ed8936;
//   }
//   .claims-modal .modal-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }
//   .claims-modal .modal-actions button {
//     padding: 8px 25px;
//     border: none;
//     border-radius: 20px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .claims-modal .modal-actions button:hover {
//     transform: scale(1.05);
//   }
//   .claims-modal .modal-actions .btn-primary {
//     background: #4a90d9;
//     color: white;
//   }
//   .claims-modal .modal-actions .btn-primary:disabled {
//     background: #a0aec0;
//     cursor: not-allowed;
//   }
//   .claims-modal .modal-actions .btn-secondary {
//     background: #e2e8f0;
//     color: #4a5568;
//   }
//   .claims-folder-modal {
//     max-width: 800px;
//   }
//   .claims-folder-modal .folder-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .claims-folder-modal .folder-table th {
//     padding: 10px;
//     text-align: left;
//     background: #f8f9fa;
//     border-bottom: 2px solid #e2e8f0;
//   }
//   .claims-folder-modal .folder-table td {
//     padding: 8px 10px;
//     border-bottom: 1px solid #e2e8f0;
//   }
//   .claims-folder-modal .folder-table tr:hover td {
//     background: #f7fafc;
//   }
//   .claims-folder-modal .folder-table .delete-btn {
//     background: #e53e3e;
//     color: white;
//     border: none;
//     border-radius: 12px;
//     padding: 2px 10px;
//     font-size: 11px;
//     cursor: pointer;
//   }
//   .claims-folder-modal .folder-table .delete-btn:hover {
//     background: #c0392b;
//   }
//   .claims-loading {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 40px;
//     font-size: 18px;
//     color: #a0aec0;
//   }
//   .claims-empty {
//     text-align: center;
//     padding: 40px;
//     color: #a0aec0;
//   }
//   .claims-table .checkbox-cell {
//     text-align: center;
//   }
//   .claims-table .checkbox-cell input[type="checkbox"] {
//     cursor: pointer;
//   }
// `;

// // ---------- Helper Functions ----------
// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// const formatDate = (dateString) => {
//   if (!dateString) return '';
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   } catch {
//     return dateString;
//   }
// };

// // ---------- Claim Row Class ----------
// class ClaimRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.visitId = data.visitId || 0;
//     this.patientName = data.patientName || '';
//     this.doctorName = data.doctorName || '';
//     this.insuranceProvider = data.insuranceProvider || '';
//     this.insuranceAmount = data.insuranceAmount || 0;
//     this.insurancePaidAmount = data.insurancePaidAmount || 0;
//     this.insuranceDiscount = data.insuranceDiscount || 0;
//     this.insuranceOutstanding = data.insuranceOutstanding || 0;
//     this.originalAmount = data.originalAmount || 0;
//     this.paymentMethod = data.paymentMethod || '';
//     this.insuranceClass = data.insuranceClass || '';
//     this.insuranceType = data.insuranceType || '';
//     this.coveragePercent = data.coveragePercent || 0;
//     this.insuranceAcceptNumber = data.insuranceAcceptNumber || '';
//     this.insuranceCardId = data.insuranceCardId || '';
//     this.insuranceFormId = data.insuranceFormId || '';
//     this.terminalId = data.terminalId || '';
//     this.referenceNumber = data.referenceNumber || '';
//     this.cardType = data.cardType || '';
//     this.approvalCode = data.approvalCode || '';
//     this.paidAt = data.paidAt || '';
//     this.visitDate = data.visitDate || '';
//     this.currency = data.currency || 'USD';
//     this.insurancePaid = data.insurancePaid || false;
//     this.insuranceSettled = data.insuranceSettled || false;
//     this.selected = false;
//   }

//   static fromJson(json) {
//     return new ClaimRow({
//       id: json.id || 0,
//       visitId: json.visitId || 0,
//       patientName: json.patientName || json.patient?.fullName || '',
//       doctorName: json.doctorName || json.doctor?.fullName || '',
//       insuranceProvider: json.insuranceProvider || '',
//       insuranceAmount: json.insuranceAmount || 0,
//       insurancePaidAmount: json.insurancePaidAmount || 0,
//       insuranceDiscount: json.insuranceDiscount || 0,
//       insuranceOutstanding: json.insuranceOutstanding || 0,
//       originalAmount: json.originalAmount || 0,
//       paymentMethod: json.paymentMethod || '',
//       insuranceClass: json.insuranceClass || '',
//       insuranceType: json.insuranceType || '',
//       coveragePercent: json.coveragePercent || 0,
//       insuranceAcceptNumber: json.insuranceAcceptNumber || '',
//       insuranceCardId: json.insuranceCardId || '',
//       insuranceFormId: json.insuranceFormId || '',
//       terminalId: json.terminalId || '',
//       referenceNumber: json.referenceNumber || '',
//       cardType: json.cardType || '',
//       approvalCode: json.approvalCode || '',
//       paidAt: json.paidAt || '',
//       visitDate: json.visitDate || '',
//       currency: json.currency || 'USD',
//       insurancePaid: json.insurancePaid || false,
//       insuranceSettled: json.insuranceSettled || false,
//     });
//   }
// }

// // ---------- Folder Row Class ----------
// class FolderRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.name = data.name || '';
//     this.description = data.description || '';
//   }

//   static fromJson(json) {
//     return new FolderRow({
//       id: json.id || 0,
//       name: json.name || '',
//       description: json.description || '',
//     });
//   }
// }

// // ---------- Main Component ----------
// const ClaimsTrackingScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const [folderName, setFolderName] = useState('');

//   const t = React.useMemo(() => {
//     const translations = {
//       en: {
//         title: 'Claims Tracking',
//         search: { claims: 'Search claims...' },
//         allClaims: 'All Claims',
//         unpaidClaims: 'Unpaid Claims',
//         selectFolder: 'Select Folder',
//         refresh: 'Refresh',
//         createFolder: 'Create Folder',
//         folders: 'Folders',
//         from: 'From',
//         to: 'To',
//         search: 'Search',
//         claimsList: 'Claims List',
//         export: 'Export',
//         viewAll: 'View All',
//         selected: 'selected',
//         addToFolder: 'Add to Folder',
//         removeSelected: 'Remove Selected',
//         selectAll: 'Select All',
//         claimsCount: 'Claims',
//         recordsLoaded: 'Records Loaded',
//         online: 'Online',
//         column: {
//           id: '#',
//           patient: 'Patient',
//           doctor: 'Doctor',
//           provider: 'Provider',
//           insurance: 'Insurance',
//           paid: 'Paid',
//           outstanding: 'Outstanding',
//           paidStatus: 'Status',
//           paidAt: 'Date',
//           action: 'Action',
//           name: 'Name',
//           description: 'Description',
//         },
//         paid: 'Paid',
//         pending: 'Pending',
//         settle: 'Settle',
//         chooseFolder: 'Choose Folder',
//         selectFolderHeader: 'Select a folder to add claims',
//         noFolderSelected: 'Please select a folder first',
//         noClaimsSelected: 'Please select claims first',
//         addedToFolder: 'Claims added to folder successfully',
//         error: 'An error occurred',
//         errorLoading: 'Failed to load data',
//         createFolderTitle: 'Create Folder',
//         createFolderHeader: 'Enter folder name',
//         folderName: 'Folder name:',
//         folderCreated: 'Folder created successfully',
//         failedLoadingFolders: 'Failed to load folders',
//         delete: 'Delete',
//         deleteFolderTitle: 'Delete Folder',
//         deleteFolderHeader: 'Delete Folder',
//         deleteFolderContent: 'Are you sure you want to delete folder',
//         folderDeleted: 'Folder deleted successfully',
//         errorDeleting: 'Error deleting folder',
//         serverError: 'Server error',
//         deleteFailed: 'Delete failed',
//         alertItemsRemoved: 'Items removed from folder',
//         settleInsuranceTitle: 'Settle Insurance',
//         settleInsuranceHeader: 'Enter settlement details',
//         insuranceAmount: 'Insurance Amount',
//         paidAmount: 'Paid Amount',
//         discountAmount: 'Discount Amount',
//         outstanding: 'Outstanding',
//         totalAmount: 'Total Amount',
//         valuesNegative: 'Values cannot be negative',
//         validationValid: '✓ Valid settlement amount',
//         validationRemaining: 'Remaining amount',
//         validationExceeds: 'Amount exceeds insurance amount',
//         invalidNumber: 'Please enter valid numbers',
//         paidDiscountExceed: 'Paid + Discount cannot exceed insurance amount',
//         confirmTitle: 'Confirm',
//         settleConfirmHeader: 'Confirm Insurance Settlement',
//         settleConfirmContent: 'Please confirm the settlement details:',
//         settleSuccess: 'Insurance settled successfully',
//         alertError: 'Error',
//         selectDates: 'Please select from and to dates',
//         failedLoadClaims: 'Failed to load claims',
//         failedLoadFolder: 'Failed to load folder',
//         failedLoadFolderItems: 'Failed to load folder items',
//         itemsRemoved: 'Items removed from folder',
//         close: 'Close',
//         confirmClose: 'Are you sure you want to close this screen?',
//         msg: {
//           confirmClose: 'Are you sure you want to close this screen?',
//         },
//         status: {
//           ready: 'Ready',
//           loading: 'Loading...',
//           loaded: 'Loaded',
//           error: 'Error',
//           appointments: 'claims',
//           filtered: 'Filtered',
//         },
//         dashboard: {
//           switchToTable: 'Switch to Table',
//           switchToCard: 'Switch to Cards',
//         },
//         sidebar: {
//           claimsTracking: 'Claims Tracking',
//         },
//       },
//       ar: {
//         title: 'تتبع المطالبات',
//         search: { claims: 'بحث عن المطالبات...' },
//         allClaims: 'جميع المطالبات',
//         unpaidClaims: 'المطالبات غير المدفوعة',
//         selectFolder: 'اختر مجلد',
//         refresh: 'تحديث',
//         createFolder: 'إنشاء مجلد',
//         folders: 'المجلدات',
//         from: 'من',
//         to: 'إلى',
//         search: 'بحث',
//         claimsList: 'قائمة المطالبات',
//         export: 'تصدير',
//         viewAll: 'عرض الكل',
//         selected: 'محدد',
//         addToFolder: 'إضافة إلى مجلد',
//         removeSelected: 'حذف المحدد',
//         selectAll: 'تحديد الكل',
//         claimsCount: 'المطالبات',
//         recordsLoaded: 'السجلات المحملة',
//         online: 'متصل',
//         column: {
//           id: '#',
//           patient: 'المريض',
//           doctor: 'الطبيب',
//           provider: 'المزود',
//           insurance: 'التأمين',
//           paid: 'المدفوع',
//           outstanding: 'المتبقي',
//           paidStatus: 'الحالة',
//           paidAt: 'التاريخ',
//           action: 'إجراء',
//           name: 'الاسم',
//           description: 'الوصف',
//         },
//         paid: 'مدفوع',
//         pending: 'معلق',
//         settle: 'تسوية',
//         chooseFolder: 'اختر مجلد',
//         selectFolderHeader: 'اختر مجلد لإضافة المطالبات',
//         noFolderSelected: 'يرجى اختيار مجلد أولاً',
//         noClaimsSelected: 'يرجى اختيار مطالبات أولاً',
//         addedToFolder: 'تمت إضافة المطالبات إلى المجلد بنجاح',
//         error: 'حدث خطأ',
//         errorLoading: 'فشل تحميل البيانات',
//         createFolderTitle: 'إنشاء مجلد',
//         createFolderHeader: 'أدخل اسم المجلد',
//         folderName: 'اسم المجلد:',
//         folderCreated: 'تم إنشاء المجلد بنجاح',
//         failedLoadingFolders: 'فشل تحميل المجلدات',
//         delete: 'حذف',
//         deleteFolderTitle: 'حذف المجلد',
//         deleteFolderHeader: 'حذف المجلد',
//         deleteFolderContent: 'هل أنت متأكد من حذف المجلد',
//         folderDeleted: 'تم حذف المجلد بنجاح',
//         errorDeleting: 'خطأ في حذف المجلد',
//         serverError: 'خطأ في الخادم',
//         deleteFailed: 'فشل الحذف',
//         alertItemsRemoved: 'تمت إزالة العناصر من المجلد',
//         settleInsuranceTitle: 'تسوية التأمين',
//         settleInsuranceHeader: 'أدخل تفاصيل التسوية',
//         insuranceAmount: 'مبلغ التأمين',
//         paidAmount: 'المبلغ المدفوع',
//         discountAmount: 'مبلغ الخصم',
//         outstanding: 'المتبقي',
//         totalAmount: 'المبلغ الإجمالي',
//         valuesNegative: 'لا يمكن أن تكون القيم سالبة',
//         validationValid: '✓ مبلغ تسوية صحيح',
//         validationRemaining: 'المبلغ المتبقي',
//         validationExceeds: 'المبلغ يتجاوز مبلغ التأمين',
//         invalidNumber: 'يرجى إدخال أرقام صحيحة',
//         paidDiscountExceed: 'المدفوع + الخصم لا يمكن أن يتجاوز مبلغ التأمين',
//         confirmTitle: 'تأكيد',
//         settleConfirmHeader: 'تأكيد تسوية التأمين',
//         settleConfirmContent: 'يرجى تأكيد تفاصيل التسوية:',
//         settleSuccess: 'تمت تسوية التأمين بنجاح',
//         alertError: 'خطأ',
//         selectDates: 'يرجى تحديد تاريخ البداية والنهاية',
//         failedLoadClaims: 'فشل تحميل المطالبات',
//         failedLoadFolder: 'فشل تحميل المجلد',
//         failedLoadFolderItems: 'فشل تحميل عناصر المجلد',
//         itemsRemoved: 'تمت إزالة العناصر من المجلد',
//         close: 'إغلاق',
//         confirmClose: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
//         status: {
//           ready: 'جاهز',
//           loading: 'جاري التحميل...',
//           loaded: 'تم التحميل',
//           error: 'خطأ',
//           appointments: 'مطالبات',
//           filtered: 'تم التصفية',
//         },
//         dashboard: {
//           switchToTable: 'التبديل إلى الجدول',
//           switchToCard: 'التبديل إلى البطاقات',
//         },
//         sidebar: {
//           claimsTracking: 'تتبع المطالبات',
//         },
//       },
//     };

//     return translations[lang] || translations.en;
//   }, [lang]);

//   // ---------- State ----------
//   const [claims, setClaims] = useState([]);
//   const [filteredClaims, setFilteredClaims] = useState([]);
//   const [folders, setFolders] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [stats, setStats] = useState({ total: 0, outstanding: 0 });
//   const [filterType, setFilterType] = useState('unpaid');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [showSettleModal, setShowSettleModal] = useState(false);
//   const [showFolderModal, setShowFolderModal] = useState(false);
//   const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
//   const [currentClaim, setCurrentClaim] = useState(null);
//   const [selectedFolderId, setSelectedFolderId] = useState(null); // 👈 Moved here
  
//   // Settle form state
//   const [settlePaidAmount, setSettlePaidAmount] = useState('');
//   const [settleDiscountAmount, setSettleDiscountAmount] = useState('');
//   const [settleValidationMsg, setSettleValidationMsg] = useState('');
//   const [settleValidationType, setSettleValidationType] = useState('');
//   const [settleTotalDisplay, setSettleTotalDisplay] = useState('$0.00');

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

//   // ---------- API Calls ----------
//   const loadClaims = useCallback(async (endpoint) => {
//     setLoading(true);

//     try {
//       const url = `${BASE_URL}${endpoint}`;
//       console.log('📤 Loading claims from:', url);
      
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const claimsData = Array.isArray(data) ? data : [data];
      
//       const parsedClaims = claimsData.map(item => ClaimRow.fromJson(item));
      
//       setClaims(parsedClaims);
//       setFilteredClaims(parsedClaims);
      
//       // Update stats
//       const totalOutstanding = parsedClaims
//         .filter(c => !c.insurancePaid)
//         .reduce((sum, c) => sum + c.insuranceOutstanding, 0);
      
//       setStats({
//         total: parsedClaims.length,
//         outstanding: totalOutstanding,
//       });
//     } catch (err) {
//       console.error('🚨 Load error:', err);
//       setClaims([]);
//       setFilteredClaims([]);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, []);

//   const loadUnpaidClaims = useCallback(() => {
//     loadClaims('/api/visits/outstanding');
//   }, [loadClaims]);

//   const loadAllClaims = useCallback(() => {
//     loadClaims('/api/visits');
//   }, [loadClaims]);

//   const loadClaimsByDateRange = useCallback(async () => {
//     if (!fromDate || !toDate) {
//       alert(t.selectDates);
//       return;
//     }
//     loadClaims(`/api/visits/between-dates?fromDate=${fromDate}&toDate=${toDate}`);
//   }, [fromDate, toDate, loadClaims, t.selectDates]);

//   const loadFolders = useCallback(async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const folderData = Array.isArray(data) ? data : [data];
//       const parsedFolders = folderData.map(item => FolderRow.fromJson(item));
      
//       setFolders(parsedFolders);
//     } catch (err) {
//       console.error('🚨 Load folders error:', err);
//       alert(t.failedLoadingFolders);
//     }
//   }, [t.failedLoadingFolders]);

//   const loadFolderItems = useCallback(async (folderId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const ids = Array.isArray(data) ? data : [data];
      
//       if (ids.length > 0) {
//         const idsParam = ids.join(',');
//         loadClaims(`/api/visits/by-ids?ids=${idsParam}`);
//       } else {
//         setClaims([]);
//         setFilteredClaims([]);
//       }
//     } catch (err) {
//       console.error('🚨 Load folder items error:', err);
//       alert(t.failedLoadFolder);
//     }
//   }, [loadClaims, t.failedLoadFolder]);

//   const createFolder = useCallback(async (name) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, description: '' }),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.folderCreated);
//       loadFolders();
//       setShowCreateFolderModal(false);
//     } catch (err) {
//       console.error('🚨 Create folder error:', err);
//       alert(t.alertError);
//     }
//   }, [loadFolders, t.folderCreated, t.alertError]);

//   const deleteFolder = useCallback(async (folderId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders/${folderId}`, {
//         method: 'DELETE',
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.folderDeleted);
//       loadFolders();
//       setShowFolderModal(false);
//     } catch (err) {
//       console.error('🚨 Delete folder error:', err);
//       alert(t.errorDeleting);
//     }
//   }, [loadFolders, t.folderDeleted, t.errorDeleting]);

//   const addClaimsToFolder = useCallback(async (folderId, claimIds) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(claimIds),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.addedToFolder);
//       // Clear selections
//       setClaims(prev => prev.map(c => ({ ...c, selected: false })));
//       setFilteredClaims(prev => prev.map(c => ({ ...c, selected: false })));
//     } catch (err) {
//       console.error('🚨 Add to folder error:', err);
//       alert(t.error);
//     }
//   }, [t.addedToFolder, t.error]);

//   const removeClaimsFromFolder = useCallback(async (folderId, claimIds) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(claimIds),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.itemsRemoved);
//       // Refresh the folder items
//       if (folderId) {
//         loadFolderItems(folderId);
//       }
//     } catch (err) {
//       console.error('🚨 Remove from folder error:', err);
//       alert(t.deleteFailed);
//     }
//   }, [loadFolderItems, t.itemsRemoved, t.deleteFailed]);

//   const settleInsurance = useCallback(async (claimId, paidAmount, discountAmount) => {
//     try {
//       const url = `${BASE_URL}/api/visits/payments/insurance/${claimId}/settle?paidAmount=${paidAmount}&discountAmount=${discountAmount}`;
//       console.log('📤 Settling insurance:', url);
      
//       const res = await fetch(url, {
//         method: 'PUT',
//       });
      
//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }
      
//       alert(t.settleSuccess);
//       loadUnpaidClaims();
//       setShowSettleModal(false);
//       logAction('SETTLE_INSURANCE', `Settled insurance for claim ${claimId}`);
//     } catch (err) {
//       console.error('🚨 Settle error:', err);
//       alert(`${t.serverError}: ${err.message}`);
//     }
//   }, [loadUnpaidClaims, t.settleSuccess, t.serverError, logAction]);

//   // ---------- Handlers ----------
//   const handleFilterChange = (e) => {
//     const value = e.target.value;
//     setFilterType(value);
    
//     if (value === 'all') {
//       loadAllClaims();
//     } else if (value === 'unpaid') {
//       loadUnpaidClaims();
//     }
//   };

//   const handleFolderSelect = (e) => {
//     const folderId = parseInt(e.target.value);
//     if (folderId) {
//       const folder = folders.find(f => f.id === folderId);
//       setSelectedFolder(folder);
//       loadFolderItems(folderId);
//     } else {
//       setSelectedFolder(null);
//       loadUnpaidClaims();
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
    
//     if (query.trim() === '') {
//       // Reset to current filter
//       if (filterType === 'all') {
//         loadAllClaims();
//       } else {
//         loadUnpaidClaims();
//       }
//       return;
//     }
    
//     // Client-side filtering
//     const filtered = claims.filter(claim => {
//       return (
//         claim.patientName.toLowerCase().includes(query) ||
//         claim.doctorName.toLowerCase().includes(query) ||
//         claim.insuranceProvider.toLowerCase().includes(query) ||
//         claim.insuranceClass.toLowerCase().includes(query) ||
//         claim.insuranceType.toLowerCase().includes(query) ||
//         claim.insuranceAcceptNumber?.toLowerCase().includes(query) ||
//         claim.insuranceCardId?.toLowerCase().includes(query) ||
//         claim.insuranceFormId?.toLowerCase().includes(query) ||
//         claim.terminalId?.toLowerCase().includes(query) ||
//         claim.referenceNumber?.toLowerCase().includes(query) ||
//         claim.cardType?.toLowerCase().includes(query) ||
//         claim.approvalCode?.toLowerCase().includes(query) ||
//         claim.paidAt?.toLowerCase().includes(query) ||
//         claim.visitDate?.toLowerCase().includes(query) ||
//         claim.currency?.toLowerCase().includes(query) ||
//         String(claim.id).includes(query) ||
//         String(claim.visitId).includes(query) ||
//         String(claim.amount).includes(query) ||
//         String(claim.insuranceAmount).includes(query) ||
//         String(claim.insurancePaidAmount).includes(query) ||
//         String(claim.insuranceDiscount).includes(query) ||
//         String(claim.insuranceOutstanding).includes(query) ||
//         String(claim.originalAmount).includes(query) ||
//         String(claim.coveragePercent).includes(query)
//       );
//     });
    
//     setFilteredClaims(filtered);
//     updateStats(filtered);
//   };

//   const handleSelectAll = (e) => {
//     const checked = e.target.checked;
//     setFilteredClaims(prev => prev.map(c => ({ ...c, selected: checked })));
//     setClaims(prev => prev.map(c => ({ ...c, selected: checked })));
//   };

//   const handleSelectOne = (id) => {
//     setFilteredClaims(prev => prev.map(c => 
//       c.id === id ? { ...c, selected: !c.selected } : c
//     ));
//     setClaims(prev => prev.map(c => 
//       c.id === id ? { ...c, selected: !c.selected } : c
//     ));
//   };

//   const handleAddToFolder = () => {
//     const selectedIds = filteredClaims.filter(c => c.selected).map(c => c.id);
//     if (selectedIds.length === 0) {
//       alert(t.noClaimsSelected);
//       return;
//     }
//     setSelectedFolderId(null); // Reset selection when opening modal
//     setShowFolderModal(true);
//   };

//   const handleRemoveFromFolder = () => {
//     if (!selectedFolder) {
//       alert(t.noFolderSelected);
//       return;
//     }
    
//     const selectedIds = filteredClaims.filter(c => c.selected).map(c => c.id);
//     if (selectedIds.length === 0) {
//       alert(t.noClaimsSelected);
//       return;
//     }
    
//     if (window.confirm(`Remove ${selectedIds.length} claims from folder "${selectedFolder.name}"?`)) {
//       removeClaimsFromFolder(selectedFolder.id, selectedIds);
//     }
//   };

//   const handleSettleClick = (claim) => {
//     setCurrentClaim(claim);
//     setSettlePaidAmount('');
//     setSettleDiscountAmount('');
//     setSettleValidationMsg('');
//     setSettleValidationType('');
//     setSettleTotalDisplay('$0.00');
//     setShowSettleModal(true);
//   };

//   const validateSettleAmounts = useCallback(() => {
//     if (!currentClaim) return false;
    
//     const paidVal = parseFloat(settlePaidAmount) || 0;
//     const discountVal = parseFloat(settleDiscountAmount) || 0;
//     const insuranceAmount = currentClaim.insuranceAmount;
//     const total = paidVal + discountVal;
    
//     // Check for negative values
//     if (paidVal < 0 || discountVal < 0) {
//       setSettleValidationMsg(t.valuesNegative);
//       setSettleValidationType('error');
//       setSettleTotalDisplay(formatCurrency(total));
//       return false;
//     }
    
//     // Check if total equals insurance amount
//     if (Math.abs(total - insuranceAmount) <= 0.01) {
//       setSettleValidationMsg(t.validationValid);
//       setSettleValidationType('success');
//       setSettleTotalDisplay(formatCurrency(total));
//       return true;
//     } else if (total < insuranceAmount) {
//       const remaining = insuranceAmount - total;
//       setSettleValidationMsg(`${t.validationRemaining}: ${formatCurrency(remaining)}`);
//       setSettleValidationType('warning');
//       setSettleTotalDisplay(formatCurrency(total));
//       return false;
//     } else {
//       const excess = total - insuranceAmount;
//       setSettleValidationMsg(`${t.validationExceeds}: ${formatCurrency(excess)}`);
//       setSettleValidationType('error');
//       setSettleTotalDisplay(formatCurrency(total));
//       return false;
//     }
//   }, [currentClaim, settlePaidAmount, settleDiscountAmount, t]);

//   const handleSettleConfirm = () => {
//     if (!currentClaim) return;
    
//     const paidVal = parseFloat(settlePaidAmount) || 0;
//     const discountVal = parseFloat(settleDiscountAmount) || 0;
//     const total = paidVal + discountVal;
//     const insuranceAmount = currentClaim.insuranceAmount;
    
//     // Final validation
//     if (paidVal < 0 || discountVal < 0) {
//       alert(t.valuesNegative);
//       return;
//     }
    
//     if (Math.abs(total - insuranceAmount) > 0.01) {
//       alert(`${t.paidDiscountExceed} (${formatCurrency(insuranceAmount)}). Total: ${formatCurrency(total)}`);
//       return;
//     }
    
//     // Confirm before settling
//     if (window.confirm(
//       `${t.settleConfirmContent}\n\n` +
//       `${t.paidAmount}: ${formatCurrency(paidVal)}\n` +
//       `${t.discountAmount}: ${formatCurrency(discountVal)}\n` +
//       `${t.totalAmount}: ${formatCurrency(total)}`
//     )) {
//       settleInsurance(currentClaim.id, paidVal, discountVal);
//     }
//   };

//   const updateStats = (claimsList) => {
//     const list = claimsList || filteredClaims;
//     const totalOutstanding = list
//       .filter(c => !c.insurancePaid)
//       .reduce((sum, c) => sum + c.insuranceOutstanding, 0);
    
//     setStats({
//       total: list.length,
//       outstanding: totalOutstanding,
//     });
//   };

//   const exportToCSV = () => {
//     if (filteredClaims.length === 0) {
//       alert('No claims to export');
//       return;
//     }
    
//     // Create CSV content
//     let csv = 'ID,Patient,Doctor,Provider,Insurance Amount,Paid Amount,Outstanding,Status,Date\n';
    
//     filteredClaims.forEach(claim => {
//       const row = [
//         claim.id,
//         `"${claim.patientName || ''}"`,
//         `"${claim.doctorName || ''}"`,
//         `"${claim.insuranceProvider || ''}"`,
//         claim.insuranceAmount.toFixed(2),
//         claim.insurancePaidAmount.toFixed(2),
//         claim.insuranceOutstanding.toFixed(2),
//         claim.insurancePaid ? 'Paid' : 'Unpaid',
//         claim.paidAt || '',
//       ];
//       csv += row.join(',') + '\n';
//     });
    
//     // Download CSV
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `claims_export_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
    
//     alert('Export completed successfully');
//   };

//   // ---------- Effects ----------
//   useEffect(() => {
//     if (isInitialLoad) {
//       loadUnpaidClaims();
//       loadFolders();
//     }
//   }, [isInitialLoad, loadUnpaidClaims, loadFolders]);

//   // Validate settle amounts on input change
//   useEffect(() => {
//     if (showSettleModal) {
//       validateSettleAmounts();
//     }
//   }, [settlePaidAmount, settleDiscountAmount, showSettleModal, validateSettleAmounts]);

//   // ---------- Render Helpers ----------
//   const getSelectedCount = () => {
//     return filteredClaims.filter(c => c.selected).length;
//   };

//   const renderStats = () => {
//     return (
//       <div className="claims-stats-section">
//         <div className="stat-item">
//           {t.claimsCount}: {stats.total}
//         </div>
//         <div className="stat-item" style={{ color: '#e53e3e' }}>
//           {t.column.outstanding}: {formatCurrency(stats.outstanding)}
//         </div>
//       </div>
//     );
//   };

//   const renderFilterSection = () => {
//     return (
//       <div className="claims-filter-section">
//         <select value={filterType} onChange={handleFilterChange}>
//           <option value="all">{t.allClaims}</option>
//           <option value="unpaid">{t.unpaidClaims}</option>
//         </select>
        
//         <select value={selectedFolder?.id || ''} onChange={handleFolderSelect}>
//           <option value="">{t.selectFolder}</option>
//           {folders.map(folder => (
//             <option key={folder.id} value={folder.id}>{folder.name}</option>
//           ))}
//         </select>
        
//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           placeholder={t.from}
//         />
//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           placeholder={t.to}
//         />
//         <button
//           onClick={loadClaimsByDateRange}
//           style={{
//             background: '#4a90d9',
//             color: 'white',
//             border: 'none',
//             borderRadius: '20px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           📅 {t.search}
//         </button>
        
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder={t.search.claims}
//           style={{
//             flex: 1,
//             minWidth: '150px',
//             borderRadius: '20px',
//             padding: '8px 15px',
//             border: '1px solid #e2e8f0',
//           }}
//         />
        
//         <button
//           onClick={() => {
//             setClaims([]);
//             setFilteredClaims([]);
//             setSelectedFolder(null);
//             loadUnpaidClaims();
//           }}
//           style={{
//             background: '#2d3748',
//             color: 'white',
//             border: 'none',
//             borderRadius: '20px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           🔄 {t.refresh}
//         </button>
        
//         <button
//           onClick={() => setShowCreateFolderModal(true)}
//           style={{
//             background: '#38a169',
//             color: 'white',
//             border: 'none',
//             borderRadius: '20px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           📁 {t.createFolder}
//         </button>
        
//         <button
//           onClick={() => {
//             loadFolders();
//             setShowFolderModal(true);
//           }}
//           style={{
//             background: '#6b46c1',
//             color: 'white',
//             border: 'none',
//             borderRadius: '20px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           📂 {t.folders}
//         </button>
//       </div>
//     );
//   };

//   const renderSelectionBar = () => {
//     const selectedCount = getSelectedCount();
//     if (selectedCount === 0) return null;
    
//     return (
//       <div className="claims-selection-bar">
//         <span className="selected-count">
//           {selectedCount} {t.selected}
//         </span>
//         <button
//           onClick={handleAddToFolder}
//           style={{ background: '#38a169', color: 'white' }}
//         >
//           📂 {t.addToFolder}
//         </button>
//         {selectedFolder && (
//           <button
//             onClick={handleRemoveFromFolder}
//             style={{ background: '#e53e3e', color: 'white' }}
//           >
//             🗑️ {t.removeSelected}
//           </button>
//         )}
//         <div style={{ flex: 1 }}></div>
//         <button
//           onClick={() => {
//             setFilteredClaims(prev => prev.map(c => ({ ...c, selected: false })));
//             setClaims(prev => prev.map(c => ({ ...c, selected: false })));
//           }}
//           style={{ background: 'transparent', color: '#a0aec0' }}
//         >
//           ✕
//         </button>
//       </div>
//     );
//   };

//   const renderTable = () => {
//     if (loading && isInitialLoad) {
//       return <div className="claims-loading">⏳ Loading...</div>;
//     }
    
//     if (filteredClaims.length === 0) {
//       return <div className="claims-empty">📭 No claims found</div>;
//     }
    
//     return (
//       <div className="claims-table-wrapper">
//         <table className="claims-table">
//           <thead>
//             <tr>
//               <th style={{ width: '40px', textAlign: 'center' }}>
//                 <input
//                   type="checkbox"
//                   checked={filteredClaims.every(c => c.selected)}
//                   onChange={handleSelectAll}
//                 />
//               </th>
//               <th>{t.column.id}</th>
//               <th>{t.column.patient}</th>
//               <th>{t.column.doctor}</th>
//               <th>{t.column.provider}</th>
//               <th>{t.column.insurance}</th>
//               <th>{t.column.paid}</th>
//               <th>{t.column.outstanding}</th>
//               <th>{t.column.paidStatus}</th>
//               <th>{t.column.paidAt}</th>
//               <th>{t.column.action}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredClaims.map(claim => (
//               <tr key={claim.id}>
//                 <td style={{ textAlign: 'center' }}>
//                   <input
//                     type="checkbox"
//                     checked={claim.selected}
//                     onChange={() => handleSelectOne(claim.id)}
//                   />
//                 </td>
//                 <td>{claim.id}</td>
//                 <td style={{ fontWeight: 'bold' }}>{claim.patientName}</td>
//                 <td>{claim.doctorName}</td>
//                 <td>{claim.insuranceProvider}</td>
//                 <td className="amount-positive">{formatCurrency(claim.insuranceAmount)}</td>
//                 <td style={{ color: '#38a169' }}>{formatCurrency(claim.insurancePaidAmount)}</td>
//                 <td className={claim.insuranceOutstanding > 0 ? 'amount-negative' : 'amount-positive'}>
//                   {formatCurrency(claim.insuranceOutstanding)}
//                 </td>
//                 <td>
//                   <span className={claim.insurancePaid ? 'status-paid' : 'status-pending'}>
//                     {claim.insurancePaid ? `✓ ${t.paid}` : `⏳ ${t.pending}`}
//                   </span>
//                 </td>
//                 <td>{formatDate(claim.paidAt)}</td>
//                 <td>
//                   {claim.paymentMethod === 'INSURANCE' && !claim.insurancePaid && (
//                     <button
//                       className="settle-btn"
//                       onClick={() => handleSettleClick(claim)}
//                     >
//                       {t.settle}
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderSettleModal = () => {
//     if (!showSettleModal || !currentClaim) return null;
    
//     return (
//       <div className="claims-modal-overlay">
//         <div className="claims-modal">
//           <h3>💰 {t.settleInsuranceTitle}</h3>
//           <p style={{ color: '#4a5568', marginBottom: '15px' }}>
//             {t.settleInsuranceHeader}
//           </p>
          
//           <div className="form-group">
//             <label>{t.insuranceAmount}:</label>
//             <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#2d3748' }}>
//               {formatCurrency(currentClaim.insuranceAmount)}
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label>{t.outstanding}:</label>
//             <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#e53e3e' }}>
//               {formatCurrency(currentClaim.insuranceOutstanding)}
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label>{t.paidAmount}:</label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={settlePaidAmount}
//               onChange={(e) => setSettlePaidAmount(e.target.value)}
//               placeholder="0.00"
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.discountAmount}:</label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={settleDiscountAmount}
//               onChange={(e) => setSettleDiscountAmount(e.target.value)}
//               placeholder="0.00"
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.totalAmount}:</label>
//             <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
//               {settleTotalDisplay}
//             </div>
//           </div>
          
//           {settleValidationMsg && (
//             <div className={`validation-msg ${settleValidationType}`}>
//               {settleValidationMsg}
//             </div>
//           )}
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowSettleModal(false)}
//             >
//               {t.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleSettleConfirm}
//               disabled={settleValidationType !== 'success'}
//             >
//               {t.settle}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderFolderModal = () => {
//     if (!showFolderModal) return null;
    
//     // Get selected claim IDs
//     const selectedClaimIds = filteredClaims.filter(c => c.selected).map(c => c.id);
    
//     const handleAddToSelectedFolder = () => {
//       if (!selectedFolderId) {
//         alert(t.noFolderSelected);
//         return;
//       }
//       addClaimsToFolder(selectedFolderId, selectedClaimIds);
//       setShowFolderModal(false);
//     };

//     return (
//       <div className="claims-modal-overlay">
//         <div className="claims-modal claims-folder-modal">
//           <h3>📂 {t.folders}</h3>
          
//           <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//             <button
//               onClick={() => {
//                 loadFolders();
//                 setShowFolderModal(true);
//               }}
//               style={{
//                 background: '#4a90d9',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '15px',
//                 padding: '6px 15px',
//                 cursor: 'pointer',
//               }}
//             >
//               🔄 {t.refresh}
//             </button>
//           </div>
          
//           <p style={{ marginBottom: '10px', color: '#4a5568' }}>
//             {t.selectFolderHeader} ({selectedClaimIds.length} {t.selected})
//           </p>
          
//           <div className="claims-table-wrapper">
//             <table className="folder-table">
//               <thead>
//                 <tr>
//                   <th style={{ width: '40px' }}>Select</th>
//                   <th>{t.column.id}</th>
//                   <th>{t.column.name}</th>
//                   <th>{t.column.description}</th>
//                   <th>{t.column.action}</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {folders.map(folder => (
//                   <tr key={folder.id} style={{ 
//                     background: selectedFolderId === folder.id ? '#ebf8ff' : 'white',
//                     cursor: 'pointer'
//                   }}>
//                     <td style={{ textAlign: 'center' }}>
//                       <input
//                         type="radio"
//                         name="folderSelect"
//                         checked={selectedFolderId === folder.id}
//                         onChange={() => setSelectedFolderId(folder.id)}
//                       />
//                     </td>
//                     <td>{folder.id}</td>
//                     <td style={{ fontWeight: 'bold' }}>{folder.name}</td>
//                     <td>{folder.description}</td>
//                     <td>
//                       <button
//                         className="delete-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           if (window.confirm(`${t.deleteFolderContent} '${folder.name}'?`)) {
//                             deleteFolder(folder.id);
//                           }
//                         }}
//                       >
//                         🗑️ {t.delete}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {folders.length === 0 && (
//                   <tr>
//                     <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#a0aec0' }}>
//                       No folders found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           <div className="modal-actions" style={{ marginTop: '20px' }}>
//             <button
//               className="btn-secondary"
//               onClick={() => setShowFolderModal(false)}
//             >
//               {t.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleAddToSelectedFolder}
//               disabled={!selectedFolderId}
//             >
//               📂 {t.addToFolder}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderCreateFolderModal = () => {
//     if (!showCreateFolderModal) return null;
    
//     return (
//       <div className="claims-modal-overlay">
//         <div className="claims-modal">
//           <h3>📁 {t.createFolderTitle}</h3>
//           <p style={{ color: '#4a5568', marginBottom: '15px' }}>
//             {t.createFolderHeader}
//           </p>
          
//           <div className="form-group">
//             <label>{t.folderName}</label>
//             <input
//               type="text"
//               value={folderName}
//               onChange={(e) => setFolderName(e.target.value)}
//               placeholder={t.folderName}
//               autoFocus
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && folderName.trim()) {
//                   createFolder(folderName.trim());
//                 }
//               }}
//             />
//           </div>
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowCreateFolderModal(false)}
//             >
//               {t.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={() => {
//                 if (folderName.trim()) {
//                   createFolder(folderName.trim());
//                 }
//               }}
//               disabled={!folderName.trim()}
//             >
//               {t.createFolder}
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
//       <div className="claims-container">
//         {/* Header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
//           <h2 style={{ margin: 0 }}>📑 {t.title}</h2>
//           <button
//             onClick={onClose}
//             style={{
//               background: '#e2e8f0',
//               border: 'none',
//               padding: '8px 20px',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontSize: '14px',
//             }}
//           >
//             ✕ {t.close}
//           </button>
//         </div>

//         {/* Filter Section */}
//         <div className="claims-topbar">
//           {renderFilterSection()}
//           {renderStats()}
//         </div>

//         {/* Selection Bar */}
//         {renderSelectionBar()}

//         {/* Table */}
//         <div className="claims-table-container">
//           <div className="claims-table-header">
//             <span className="title">📋 {t.claimsList}</span>
//             <div className="actions">
//               <button
//                 onClick={exportToCSV}
//                 style={{ background: '#38a169', color: 'white' }}
//               >
//                 📊 {t.export}
//               </button>
//               <button
//                 onClick={loadAllClaims}
//                 style={{ background: '#4a90d9', color: 'white' }}
//               >
//                 👁️ {t.viewAll}
//               </button>
//             </div>
//           </div>
//           {renderTable()}
//         </div>

//         {/* Bottom Bar */}
//         <div className="claims-bottom-bar">
//           <span className="status-online">● {t.online}</span>
//           <span>v2.0</span>
//           <span style={{ flex: 1 }}></span>
//           <span>{t.recordsLoaded}: {filteredClaims.length}</span>
//         </div>

//         {/* Modals */}
//         {renderSettleModal()}
//         {renderFolderModal()}
//         {renderCreateFolderModal()}
//       </div>
//     </>
//   );
// };

// export default ClaimsTrackingScreen;  02072026 V2 

// import React, { useState, useCallback, useEffect } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .claims-container {
//     padding: 20px;
//     background: #f0f2f5;
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .claims-topbar {
//     background: white;
//     padding: 15px;
//     border-radius: 8px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     margin-bottom: 20px;
//   }
//   .claims-filter-section {
//     display: flex;
//     gap: 15px;
//     flex-wrap: wrap;
//     align-items: center;
//     padding: 5px 0;
//   }
//   .claims-filter-section select, 
//   .claims-filter-section input {
//     padding: 8px 12px;
//     border-radius: 20px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//   }
//   .claims-filter-section select:focus,
//   .claims-filter-section input:focus {
//     outline: none;
//     border-color: #4a90d9;
//     box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.1);
//   }
//   .claims-stats-section {
//     display: flex;
//     gap: 30px;
//     padding: 10px 15px;
//     background: #f7fafc;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     margin-top: 10px;
//     flex-wrap: wrap;
//   }
//   .claims-stats-section .stat-item {
//     font-weight: bold;
//     font-size: 14px;
//   }
//   .claims-table-container {
//     background: white;
//     border-radius: 8px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     overflow: hidden;
//   }
//   .claims-table-header {
//     padding: 10px 15px;
//     background: #edf2f7;
//     border-bottom: 1px solid #e2e8f0;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
//   .claims-table-header .title {
//     font-weight: bold;
//     font-size: 16px;
//   }
//   .claims-table-header .actions {
//     display: flex;
//     gap: 10px;
//   }
//   .claims-table-header .actions button {
//     padding: 6px 15px;
//     border: none;
//     border-radius: 15px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//   }
//   .claims-table-header .actions button:hover {
//     transform: scale(1.05);
//   }
//   .claims-table-wrapper {
//     overflow-x: auto;
//   }
//   .claims-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .claims-table th {
//     padding: 12px 15px;
//     text-align: left;
//     font-weight: bold;
//     color: #2d3748;
//     border-bottom: 2px solid #e2e8f0;
//     background: #f8f9fa;
//   }
//   .claims-table td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #e2e8f0;
//     vertical-align: middle;
//   }
//   .claims-table tr:hover td {
//     background: #f7fafc;
//   }
//   .claims-table .amount-positive {
//     color: #2d3748;
//     font-weight: bold;
//   }
//   .claims-table .amount-negative {
//     color: #e53e3e;
//     font-weight: bold;
//   }
//   .claims-table .status-paid {
//     color: #38a169;
//     font-weight: bold;
//   }
//   .claims-table .status-pending {
//     color: #e53e3e;
//     font-weight: bold;
//   }
//   .claims-table .settle-btn {
//     background: #4a90d9;
//     color: white;
//     border: none;
//     border-radius: 15px;
//     padding: 4px 12px;
//     font-size: 11px;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .claims-table .settle-btn:hover {
//     background: #357abd;
//     transform: scale(1.05);
//   }
//   .claims-selection-bar {
//     background: #ebf8ff;
//     padding: 8px 15px;
//     border: 1px solid #bee3f8;
//     border-radius: 4px;
//     display: flex;
//     align-items: center;
//     gap: 15px;
//     flex-wrap: wrap;
//   }
//   .claims-selection-bar .selected-count {
//     font-weight: bold;
//     color: #2b6cb0;
//   }
//   .claims-selection-bar button {
//     border: none;
//     border-radius: 15px;
//     padding: 4px 15px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 12px;
//   }
//   .claims-selection-bar button:hover {
//     transform: scale(1.05);
//   }
//   .claims-bottom-bar {
//     display: flex;
//     justify-content: flex-end;
//     padding: 10px 15px;
//     background: #f7fafc;
//     border-top: 1px solid #e2e8f0;
//     gap: 15px;
//     font-size: 12px;
//     color: #4a5568;
//     margin-top: 15px;
//   }
//   .claims-bottom-bar .status-online {
//     color: #38a169;
//   }
//   .claims-modal-overlay {
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
//   .claims-modal {
//     background: white;
//     border-radius: 12px;
//     padding: 25px;
//     max-width: 500px;
//     width: 95%;
//     max-height: 90vh;
//     overflow-y: auto;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   }
//   .claims-modal h3 {
//     margin: 0 0 15px 0;
//   }
//   .claims-modal .form-group {
//     margin-bottom: 15px;
//   }
//   .claims-modal .form-group label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
//   }
//   .claims-modal .form-group input {
//     width: 100%;
//     padding: 8px 12px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//   }
//   .claims-modal .form-group input:focus {
//     outline: none;
//     border-color: #4a90d9;
//   }
//   .claims-modal .validation-msg {
//     font-size: 13px;
//     font-weight: bold;
//     margin-top: 5px;
//   }
//   .claims-modal .validation-msg.success {
//     color: #38a169;
//   }
//   .claims-modal .validation-msg.error {
//     color: #e53e3e;
//   }
//   .claims-modal .validation-msg.warning {
//     color: #ed8936;
//   }
//   .claims-modal .modal-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }
//   .claims-modal .modal-actions button {
//     padding: 8px 25px;
//     border: none;
//     border-radius: 20px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .claims-modal .modal-actions button:hover {
//     transform: scale(1.05);
//   }
//   .claims-modal .modal-actions .btn-primary {
//     background: #4a90d9;
//     color: white;
//   }
//   .claims-modal .modal-actions .btn-primary:disabled {
//     background: #a0aec0;
//     cursor: not-allowed;
//   }
//   .claims-modal .modal-actions .btn-secondary {
//     background: #e2e8f0;
//     color: #4a5568;
//   }
//   .claims-folder-modal {
//     max-width: 800px;
//   }
//   .claims-folder-modal .folder-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .claims-folder-modal .folder-table th {
//     padding: 10px;
//     text-align: left;
//     background: #f8f9fa;
//     border-bottom: 2px solid #e2e8f0;
//   }
//   .claims-folder-modal .folder-table td {
//     padding: 8px 10px;
//     border-bottom: 1px solid #e2e8f0;
//   }
//   .claims-folder-modal .folder-table tr:hover td {
//     background: #f7fafc;
//   }
//   .claims-folder-modal .folder-table .delete-btn {
//     background: #e53e3e;
//     color: white;
//     border: none;
//     border-radius: 12px;
//     padding: 2px 10px;
//     font-size: 11px;
//     cursor: pointer;
//   }
//   .claims-folder-modal .folder-table .delete-btn:hover {
//     background: #c0392b;
//   }
//   .claims-loading {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 40px;
//     font-size: 18px;
//     color: #a0aec0;
//   }
//   .claims-empty {
//     text-align: center;
//     padding: 40px;
//     color: #a0aec0;
//   }
//   .claims-table .checkbox-cell {
//     text-align: center;
//   }
//   .claims-table .checkbox-cell input[type="checkbox"] {
//     cursor: pointer;
//   }
// `;

// // ---------- Helper Functions ----------
// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(amount);
// };

// const formatDate = (dateString) => {
//   if (!dateString) return '';
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   } catch {
//     return dateString;
//   }
// };

// // ---------- Claim Row Class ----------
// class ClaimRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.visitId = data.visitId || 0;
//     this.patientName = data.patientName || '';
//     this.doctorName = data.doctorName || '';
//     this.insuranceProvider = data.insuranceProvider || '';
//     this.insuranceAmount = data.insuranceAmount || 0;
//     this.insurancePaidAmount = data.insurancePaidAmount || 0;
//     this.insuranceDiscount = data.insuranceDiscount || 0;
//     this.insuranceOutstanding = data.insuranceOutstanding || 0;
//     this.originalAmount = data.originalAmount || 0;
//     this.paymentMethod = data.paymentMethod || '';
//     this.insuranceClass = data.insuranceClass || '';
//     this.insuranceType = data.insuranceType || '';
//     this.coveragePercent = data.coveragePercent || 0;
//     this.insuranceAcceptNumber = data.insuranceAcceptNumber || '';
//     this.insuranceCardId = data.insuranceCardId || '';
//     this.insuranceFormId = data.insuranceFormId || '';
//     this.terminalId = data.terminalId || '';
//     this.referenceNumber = data.referenceNumber || '';
//     this.cardType = data.cardType || '';
//     this.approvalCode = data.approvalCode || '';
//     this.paidAt = data.paidAt || '';
//     this.visitDate = data.visitDate || '';
//     this.currency = data.currency || 'USD';
//     this.insurancePaid = data.insurancePaid || false;
//     this.insuranceSettled = data.insuranceSettled || false;
//     this.selected = false;
//   }

//   static fromJson(json) {
//     return new ClaimRow({
//       id: json.id || 0,
//       visitId: json.visitId || 0,
//       patientName: json.patientName || json.patient?.fullName || '',
//       doctorName: json.doctorName || json.doctor?.fullName || '',
//       insuranceProvider: json.insuranceProvider || '',
//       insuranceAmount: json.insuranceAmount || 0,
//       insurancePaidAmount: json.insurancePaidAmount || 0,
//       insuranceDiscount: json.insuranceDiscount || 0,
//       insuranceOutstanding: json.insuranceOutstanding || 0,
//       originalAmount: json.originalAmount || 0,
//       paymentMethod: json.paymentMethod || '',
//       insuranceClass: json.insuranceClass || '',
//       insuranceType: json.insuranceType || '',
//       coveragePercent: json.coveragePercent || 0,
//       insuranceAcceptNumber: json.insuranceAcceptNumber || '',
//       insuranceCardId: json.insuranceCardId || '',
//       insuranceFormId: json.insuranceFormId || '',
//       terminalId: json.terminalId || '',
//       referenceNumber: json.referenceNumber || '',
//       cardType: json.cardType || '',
//       approvalCode: json.approvalCode || '',
//       paidAt: json.paidAt || '',
//       visitDate: json.visitDate || '',
//       currency: json.currency || 'USD',
//       insurancePaid: json.insurancePaid || false,
//       insuranceSettled: json.insuranceSettled || false,
//     });
//   }
// }

// // ---------- Folder Row Class ----------
// class FolderRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.name = data.name || '';
//     this.description = data.description || '';
//   }

//   static fromJson(json) {
//     return new FolderRow({
//       id: json.id || 0,
//       name: json.name || '',
//       description: json.description || '',
//     });
//   }
// }

// // ---------- Main Component ----------
// const ClaimsTrackingScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const [folderName, setFolderName] = useState('');

//   const t = React.useMemo(() => {
//     const translations = {
//       en: {
//         title: 'Claims Tracking',
//         search: { claims: 'Search claims...' },
//         allClaims: 'All Claims',
//         unpaidClaims: 'Unpaid Claims',
//         selectFolder: 'Select Folder',
//         refresh: 'Refresh',
//         createFolder: 'Create Folder',
//         folders: 'Folders',
//         from: 'From',
//         to: 'To',
//         search: 'Search',
//         claimsList: 'Claims List',
//         export: 'Export',
//         viewAll: 'View All',
//         selected: 'selected',
//         addToFolder: 'Add to Folder',
//         removeSelected: 'Remove Selected',
//         selectAll: 'Select All',
//         claimsCount: 'Claims',
//         recordsLoaded: 'Records Loaded',
//         online: 'Online',
//         column: {
//           id: '#',
//           patient: 'Patient',
//           doctor: 'Doctor',
//           provider: 'Provider',
//           insurance: 'Insurance',
//           paid: 'Paid',
//           discount: 'Discount',  // 👈 Add this
//           outstanding: 'Outstanding',
//           paidStatus: 'Status',
//           paidAt: 'Date',
//           action: 'Action',
//           name: 'Name',
//           description: 'Description',
//         },
//         paid: 'Paid',
//         pending: 'Pending',
//         settle: 'Settle',
//         chooseFolder: 'Choose Folder',
//         selectFolderHeader: 'Select a folder to add claims',
//         noFolderSelected: 'Please select a folder first',
//         noClaimsSelected: 'Please select claims first',
//         addedToFolder: 'Claims added to folder successfully',
//         error: 'An error occurred',
//         errorLoading: 'Failed to load data',
//         createFolderTitle: 'Create Folder',
//         createFolderHeader: 'Enter folder name',
//         folderName: 'Folder name:',
//         folderCreated: 'Folder created successfully',
//         failedLoadingFolders: 'Failed to load folders',
//         delete: 'Delete',
//         deleteFolderTitle: 'Delete Folder',
//         deleteFolderHeader: 'Delete Folder',
//         deleteFolderContent: 'Are you sure you want to delete folder',
//         folderDeleted: 'Folder deleted successfully',
//         errorDeleting: 'Error deleting folder',
//         serverError: 'Server error',
//         deleteFailed: 'Delete failed',
//         alertItemsRemoved: 'Items removed from folder',
//         settleInsuranceTitle: 'Settle Insurance',
//         settleInsuranceHeader: 'Enter settlement details',
//         insuranceAmount: 'Insurance Amount',
//         paidAmount: 'Paid Amount',
//         discountAmount: 'Discount Amount',
//         outstanding: 'Outstanding',
//         totalAmount: 'Total Amount',
//         valuesNegative: 'Values cannot be negative',
//         validationValid: '✓ Valid settlement amount',
//         validationRemaining: 'Remaining amount',
//         validationExceeds: 'Amount exceeds insurance amount',
//         invalidNumber: 'Please enter valid numbers',
//         paidDiscountExceed: 'Paid + Discount cannot exceed insurance amount',
//         confirmTitle: 'Confirm',
//         settleConfirmHeader: 'Confirm Insurance Settlement',
//         settleConfirmContent: 'Please confirm the settlement details:',
//         settleSuccess: 'Insurance settled successfully',
//         alertError: 'Error',
//         selectDates: 'Please select from and to dates',
//         failedLoadClaims: 'Failed to load claims',
//         failedLoadFolder: 'Failed to load folder',
//         failedLoadFolderItems: 'Failed to load folder items',
//         itemsRemoved: 'Items removed from folder',
//         close: 'Close',
//         confirmClose: 'Are you sure you want to close this screen?',
//         msg: {
//           confirmClose: 'Are you sure you want to close this screen?',
//         },
//         status: {
//           ready: 'Ready',
//           loading: 'Loading...',
//           loaded: 'Loaded',
//           error: 'Error',
//           appointments: 'claims',
//           filtered: 'Filtered',
//         },
//         dashboard: {
//           switchToTable: 'Switch to Table',
//           switchToCard: 'Switch to Cards',
//         },
//         sidebar: {
//           claimsTracking: 'Claims Tracking',
//         },
//       },
//       ar: {
//         title: 'تتبع المطالبات',
//         search: { claims: 'بحث عن المطالبات...' },
//         allClaims: 'جميع المطالبات',
//         unpaidClaims: 'المطالبات غير المدفوعة',
//         selectFolder: 'اختر مجلد',
//         refresh: 'تحديث',
//         createFolder: 'إنشاء مجلد',
//         folders: 'المجلدات',
//         from: 'من',
//         to: 'إلى',
//         search: 'بحث',
//         claimsList: 'قائمة المطالبات',
//         export: 'تصدير',
//         viewAll: 'عرض الكل',
//         selected: 'محدد',
//         addToFolder: 'إضافة إلى مجلد',
//         removeSelected: 'حذف المحدد',
//         selectAll: 'تحديد الكل',
//         claimsCount: 'المطالبات',
//         recordsLoaded: 'السجلات المحملة',
//         online: 'متصل',
//         column: {
//           id: '#',
//           patient: 'المريض',
//           doctor: 'الطبيب',
//           provider: 'المزود',
//           insurance: 'التأمين',
//           paid: 'المدفوع',
//              discount: 'الخصم',  // 👈 Add this

//           outstanding: 'المتبقي',
//           paidStatus: 'الحالة',
//           paidAt: 'التاريخ',
//           action: 'إجراء',
//           name: 'الاسم',
//           description: 'الوصف',
//         },
//         paid: 'مدفوع',
//         pending: 'معلق',
//         settle: 'تسوية',
//         chooseFolder: 'اختر مجلد',
//         selectFolderHeader: 'اختر مجلد لإضافة المطالبات',
//         noFolderSelected: 'يرجى اختيار مجلد أولاً',
//         noClaimsSelected: 'يرجى اختيار مطالبات أولاً',
//         addedToFolder: 'تمت إضافة المطالبات إلى المجلد بنجاح',
//         error: 'حدث خطأ',
//         errorLoading: 'فشل تحميل البيانات',
//         createFolderTitle: 'إنشاء مجلد',
//         createFolderHeader: 'أدخل اسم المجلد',
//         folderName: 'اسم المجلد:',
//         folderCreated: 'تم إنشاء المجلد بنجاح',
//         failedLoadingFolders: 'فشل تحميل المجلدات',
//         delete: 'حذف',
//         deleteFolderTitle: 'حذف المجلد',
//         deleteFolderHeader: 'حذف المجلد',
//         deleteFolderContent: 'هل أنت متأكد من حذف المجلد',
//         folderDeleted: 'تم حذف المجلد بنجاح',
//         errorDeleting: 'خطأ في حذف المجلد',
//         serverError: 'خطأ في الخادم',
//         deleteFailed: 'فشل الحذف',
//         alertItemsRemoved: 'تمت إزالة العناصر من المجلد',
//         settleInsuranceTitle: 'تسوية التأمين',
//         settleInsuranceHeader: 'أدخل تفاصيل التسوية',
//         insuranceAmount: 'مبلغ التأمين',
//         paidAmount: 'المبلغ المدفوع',
//         discountAmount: 'مبلغ الخصم',
//         outstanding: 'المتبقي',
//         totalAmount: 'المبلغ الإجمالي',
//         valuesNegative: 'لا يمكن أن تكون القيم سالبة',
//         validationValid: '✓ مبلغ تسوية صحيح',
//         validationRemaining: 'المبلغ المتبقي',
//         validationExceeds: 'المبلغ يتجاوز مبلغ التأمين',
//         invalidNumber: 'يرجى إدخال أرقام صحيحة',
//         paidDiscountExceed: 'المدفوع + الخصم لا يمكن أن يتجاوز مبلغ التأمين',
//         confirmTitle: 'تأكيد',
//         settleConfirmHeader: 'تأكيد تسوية التأمين',
//         settleConfirmContent: 'يرجى تأكيد تفاصيل التسوية:',
//         settleSuccess: 'تمت تسوية التأمين بنجاح',
//         alertError: 'خطأ',
//         selectDates: 'يرجى تحديد تاريخ البداية والنهاية',
//         failedLoadClaims: 'فشل تحميل المطالبات',
//         failedLoadFolder: 'فشل تحميل المجلد',
//         failedLoadFolderItems: 'فشل تحميل عناصر المجلد',
//         itemsRemoved: 'تمت إزالة العناصر من المجلد',
//         close: 'إغلاق',
//         confirmClose: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
//         status: {
//           ready: 'جاهز',
//           loading: 'جاري التحميل...',
//           loaded: 'تم التحميل',
//           error: 'خطأ',
//           appointments: 'مطالبات',
//           filtered: 'تم التصفية',
//         },
//         dashboard: {
//           switchToTable: 'التبديل إلى الجدول',
//           switchToCard: 'التبديل إلى البطاقات',
//         },
//         sidebar: {
//           claimsTracking: 'تتبع المطالبات',
//         },
//       },
//     };

//     return translations[lang] || translations.en;
//   }, [lang]);

//   // ---------- State ----------
//   const [claims, setClaims] = useState([]);
//   const [filteredClaims, setFilteredClaims] = useState([]);
//   const [folders, setFolders] = useState([]);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [stats, setStats] = useState({ total: 0, outstanding: 0 });
//   const [filterType, setFilterType] = useState('unpaid');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [showSettleModal, setShowSettleModal] = useState(false);
//   const [showFolderModal, setShowFolderModal] = useState(false);
//   const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
//   const [currentClaim, setCurrentClaim] = useState(null);
//   const [selectedFolderId, setSelectedFolderId] = useState(null);
  
//   // Settle form state
//   const [settlePaidAmount, setSettlePaidAmount] = useState('');
//   const [settleDiscountAmount, setSettleDiscountAmount] = useState('');
//   const [settleValidationMsg, setSettleValidationMsg] = useState('');
//   const [settleValidationType, setSettleValidationType] = useState('');
//   const [settleTotalDisplay, setSettleTotalDisplay] = useState('$0.00');

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

//   // ---------- API Calls ----------
//   const loadClaims = useCallback(async (endpoint) => {
//     setLoading(true);

//     try {
//       const url = `${BASE_URL}${endpoint}`;
//       console.log('📤 Loading claims from:', url);
      
//       const res = await fetch(url);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const claimsData = Array.isArray(data) ? data : [data];
      
//       const parsedClaims = claimsData.map(item => ClaimRow.fromJson(item));
      
//       setClaims(parsedClaims);
//       setFilteredClaims(parsedClaims);
      
//       // Update stats - Calculate outstanding from insuranceAmount - insurancePaidAmount
//       const totalOutstanding = parsedClaims
//         .filter(c => !c.insurancePaid)
//         .reduce((sum, c) => {
//           const outstanding = c.insuranceAmount - c.insurancePaidAmount;
//           return sum + outstanding;
//         }, 0);
      
//       setStats({
//         total: parsedClaims.length,
//         outstanding: totalOutstanding,
//       });
//     } catch (err) {
//       console.error('🚨 Load error:', err);
//       setClaims([]);
//       setFilteredClaims([]);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   }, []);

//   const loadUnpaidClaims = useCallback(() => {
//     loadClaims('/api/visits/outstanding');
//   }, [loadClaims]);

//   const loadAllClaims = useCallback(() => {
//     loadClaims('/api/visits');
//   }, [loadClaims]);

//   const loadClaimsByDateRange = useCallback(async () => {
//     if (!fromDate || !toDate) {
//       alert(t.selectDates);
//       return;
//     }
//     loadClaims(`/api/visits/between-dates?fromDate=${fromDate}&toDate=${toDate}`);
//   }, [fromDate, toDate, loadClaims, t.selectDates]);

//   const loadFolders = useCallback(async () => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const folderData = Array.isArray(data) ? data : [data];
//       const parsedFolders = folderData.map(item => FolderRow.fromJson(item));
      
//       setFolders(parsedFolders);
//     } catch (err) {
//       console.error('🚨 Load folders error:', err);
//       alert(t.failedLoadingFolders);
//     }
//   }, [t.failedLoadingFolders]);

//   const loadFolderItems = useCallback(async (folderId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const ids = Array.isArray(data) ? data : [data];
      
//       if (ids.length > 0) {
//         const idsParam = ids.join(',');
//         loadClaims(`/api/visits/by-ids?ids=${idsParam}`);
//       } else {
//         setClaims([]);
//         setFilteredClaims([]);
//         setStats({ total: 0, outstanding: 0 });
//       }
//     } catch (err) {
//       console.error('🚨 Load folder items error:', err);
//       alert(t.failedLoadFolder);
//     }
//   }, [loadClaims, t.failedLoadFolder]);

//   const createFolder = useCallback(async (name) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, description: '' }),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.folderCreated);
//       loadFolders();
//       setShowCreateFolderModal(false);
//     } catch (err) {
//       console.error('🚨 Create folder error:', err);
//       alert(t.alertError);
//     }
//   }, [loadFolders, t.folderCreated, t.alertError]);

//   const deleteFolder = useCallback(async (folderId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders/${folderId}`, {
//         method: 'DELETE',
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.folderDeleted);
//       loadFolders();
//       setShowFolderModal(false);
//     } catch (err) {
//       console.error('🚨 Delete folder error:', err);
//       alert(t.errorDeleting);
//     }
//   }, [loadFolders, t.folderDeleted, t.errorDeleting]);

//   const addClaimsToFolder = useCallback(async (folderId, claimIds) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(claimIds),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.addedToFolder);
//       // Clear selections
//       setClaims(prev => prev.map(c => ({ ...c, selected: false })));
//       setFilteredClaims(prev => prev.map(c => ({ ...c, selected: false })));
//     } catch (err) {
//       console.error('🚨 Add to folder error:', err);
//       alert(t.error);
//     }
//   }, [t.addedToFolder, t.error]);

//   const removeClaimsFromFolder = useCallback(async (folderId, claimIds) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(claimIds),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.itemsRemoved);
//       // Refresh the folder items
//       if (folderId) {
//         loadFolderItems(folderId);
//       }
//     } catch (err) {
//       console.error('🚨 Remove from folder error:', err);
//       alert(t.deleteFailed);
//     }
//   }, [loadFolderItems, t.itemsRemoved, t.deleteFailed]);

//   const settleInsurance = useCallback(async (claimId, paidAmount, discountAmount) => {
//     try {
//       const url = `${BASE_URL}/api/visits/payments/insurance/${claimId}/settle?paidAmount=${paidAmount}&discountAmount=${discountAmount}`;
//       console.log('📤 Settling insurance:', url);
      
//       const res = await fetch(url, {
//         method: 'PUT',
//       });
      
//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }
      
//       alert(t.settleSuccess);
//       loadUnpaidClaims();
//       setShowSettleModal(false);
//       logAction('SETTLE_INSURANCE', `Settled insurance for claim ${claimId}`);
//     } catch (err) {
//       console.error('🚨 Settle error:', err);
//       alert(`${t.serverError}: ${err.message}`);
//     }
//   }, [loadUnpaidClaims, t.settleSuccess, t.serverError, logAction]);

//   // ---------- Handlers ----------
//   const handleFilterChange = (e) => {
//     const value = e.target.value;
//     setFilterType(value);
    
//     if (value === 'all') {
//       loadAllClaims();
//     } else if (value === 'unpaid') {
//       loadUnpaidClaims();
//     }
//   };

//   const handleFolderSelect = (e) => {
//     const folderId = parseInt(e.target.value);
//     if (folderId) {
//       const folder = folders.find(f => f.id === folderId);
//       setSelectedFolder(folder);
//       loadFolderItems(folderId);
//     } else {
//       setSelectedFolder(null);
//       loadUnpaidClaims();
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
    
//     if (query.trim() === '') {
//       // Reset to current filter
//       if (filterType === 'all') {
//         loadAllClaims();
//       } else {
//         loadUnpaidClaims();
//       }
//       return;
//     }
    
//     // Client-side filtering
//     const filtered = claims.filter(claim => {
//       return (
//         claim.patientName.toLowerCase().includes(query) ||
//         claim.doctorName.toLowerCase().includes(query) ||
//         claim.insuranceProvider.toLowerCase().includes(query) ||
//         claim.insuranceClass.toLowerCase().includes(query) ||
//         claim.insuranceType.toLowerCase().includes(query) ||
//         claim.insuranceAcceptNumber?.toLowerCase().includes(query) ||
//         claim.insuranceCardId?.toLowerCase().includes(query) ||
//         claim.insuranceFormId?.toLowerCase().includes(query) ||
//         claim.terminalId?.toLowerCase().includes(query) ||
//         claim.referenceNumber?.toLowerCase().includes(query) ||
//         claim.cardType?.toLowerCase().includes(query) ||
//         claim.approvalCode?.toLowerCase().includes(query) ||
//         claim.paidAt?.toLowerCase().includes(query) ||
//         claim.visitDate?.toLowerCase().includes(query) ||
//         claim.currency?.toLowerCase().includes(query) ||
//         String(claim.id).includes(query) ||
//         String(claim.visitId).includes(query) ||
//         String(claim.amount).includes(query) ||
//         String(claim.insuranceAmount).includes(query) ||
//         String(claim.insurancePaidAmount).includes(query) ||
//         String(claim.insuranceDiscount).includes(query) ||
//         String(claim.insuranceOutstanding).includes(query) ||
//         String(claim.originalAmount).includes(query) ||
//         String(claim.coveragePercent).includes(query)
//       );
//     });
    
//     setFilteredClaims(filtered);
//     updateStats(filtered);
//   };

//   const handleSelectAll = (e) => {
//     const checked = e.target.checked;
//     setFilteredClaims(prev => prev.map(c => ({ ...c, selected: checked })));
//     setClaims(prev => prev.map(c => ({ ...c, selected: checked })));
//   };

//   const handleSelectOne = (id) => {
//     setFilteredClaims(prev => prev.map(c => 
//       c.id === id ? { ...c, selected: !c.selected } : c
//     ));
//     setClaims(prev => prev.map(c => 
//       c.id === id ? { ...c, selected: !c.selected } : c
//     ));
//   };

//   const handleAddToFolder = () => {
//     const selectedIds = filteredClaims.filter(c => c.selected).map(c => c.id);
//     if (selectedIds.length === 0) {
//       alert(t.noClaimsSelected);
//       return;
//     }
//     setSelectedFolderId(null); // Reset selection when opening modal
//     setShowFolderModal(true);
//   };

//   const handleRemoveFromFolder = () => {
//     if (!selectedFolder) {
//       alert(t.noFolderSelected);
//       return;
//     }
    
//     const selectedIds = filteredClaims.filter(c => c.selected).map(c => c.id);
//     if (selectedIds.length === 0) {
//       alert(t.noClaimsSelected);
//       return;
//     }
    
//     if (window.confirm(`Remove ${selectedIds.length} claims from folder "${selectedFolder.name}"?`)) {
//       removeClaimsFromFolder(selectedFolder.id, selectedIds);
//     }
//   };

//   const handleSettleClick = (claim) => {
//     setCurrentClaim(claim);
//     setSettlePaidAmount('');
//     setSettleDiscountAmount('');
//     setSettleValidationMsg('');
//     setSettleValidationType('');
//     setSettleTotalDisplay('$0.00');
//     setShowSettleModal(true);
//   };

//   const validateSettleAmounts = useCallback(() => {
//     if (!currentClaim) return false;
    
//     const paidVal = parseFloat(settlePaidAmount) || 0;
//     const discountVal = parseFloat(settleDiscountAmount) || 0;
//     const insuranceAmount = currentClaim.insuranceAmount;
//     const total = paidVal + discountVal;
    
//     // Check for negative values
//     if (paidVal < 0 || discountVal < 0) {
//       setSettleValidationMsg(t.valuesNegative);
//       setSettleValidationType('error');
//       setSettleTotalDisplay(formatCurrency(total));
//       return false;
//     }
    
//     // Check if total equals insurance amount
//     if (Math.abs(total - insuranceAmount) <= 0.01) {
//       setSettleValidationMsg(t.validationValid);
//       setSettleValidationType('success');
//       setSettleTotalDisplay(formatCurrency(total));
//       return true;
//     } else if (total < insuranceAmount) {
//       const remaining = insuranceAmount - total;
//       setSettleValidationMsg(`${t.validationRemaining}: ${formatCurrency(remaining)}`);
//       setSettleValidationType('warning');
//       setSettleTotalDisplay(formatCurrency(total));
//       return false;
//     } else {
//       const excess = total - insuranceAmount;
//       setSettleValidationMsg(`${t.validationExceeds}: ${formatCurrency(excess)}`);
//       setSettleValidationType('error');
//       setSettleTotalDisplay(formatCurrency(total));
//       return false;
//     }
//   }, [currentClaim, settlePaidAmount, settleDiscountAmount, t]);

//   const handleSettleConfirm = () => {
//     if (!currentClaim) return;
    
//     const paidVal = parseFloat(settlePaidAmount) || 0;
//     const discountVal = parseFloat(settleDiscountAmount) || 0;
//     const total = paidVal + discountVal;
//     const insuranceAmount = currentClaim.insuranceAmount;
    
//     // Final validation
//     if (paidVal < 0 || discountVal < 0) {
//       alert(t.valuesNegative);
//       return;
//     }
    
//     if (Math.abs(total - insuranceAmount) > 0.01) {
//       alert(`${t.paidDiscountExceed} (${formatCurrency(insuranceAmount)}). Total: ${formatCurrency(total)}`);
//       return;
//     }
    
//     // Confirm before settling
//     if (window.confirm(
//       `${t.settleConfirmContent}\n\n` +
//       `${t.paidAmount}: ${formatCurrency(paidVal)}\n` +
//       `${t.discountAmount}: ${formatCurrency(discountVal)}\n` +
//       `${t.totalAmount}: ${formatCurrency(total)}`
//     )) {
//       settleInsurance(currentClaim.id, paidVal, discountVal);
//     }
//   };

//   const updateStats = (claimsList) => {
//     const list = claimsList || filteredClaims;
//     // Calculate outstanding from insuranceAmount - insurancePaidAmount
//     const totalOutstanding = list
//       .filter(c => !c.insurancePaid)
//       .reduce((sum, c) => {
//         const outstanding = c.insuranceAmount - c.insurancePaidAmount;
//         return sum + outstanding;
//       }, 0);
    
//     setStats({
//       total: list.length,
//       outstanding: totalOutstanding,
//     });
//   };

//   const exportToCSV = () => {
//     if (filteredClaims.length === 0) {
//       alert('No claims to export');
//       return;
//     }
    
//     // Create CSV content
//     let csv = 'ID,Patient,Doctor,Provider,Insurance Amount,Paid Amount,Outstanding,Status,Date\n';
    
//     filteredClaims.forEach(claim => {
//       const row = [
//         claim.id,
//         `"${claim.patientName || ''}"`,
//         `"${claim.doctorName || ''}"`,
//         `"${claim.insuranceProvider || ''}"`,
//         claim.insuranceAmount.toFixed(2),
//         claim.insurancePaidAmount.toFixed(2),
//         claim.insuranceOutstanding.toFixed(2),
//         claim.insurancePaid ? 'Paid' : 'Unpaid',
//         claim.paidAt || '',
//       ];
//       csv += row.join(',') + '\n';
//     });
    
//     // Download CSV
//     const blob = new Blob([csv], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `claims_export_${new Date().toISOString().split('T')[0]}.csv`;
//     a.click();
//     window.URL.revokeObjectURL(url);
    
//     alert('Export completed successfully');
//   };

//   // ---------- Effects ----------
//   useEffect(() => {
//     if (isInitialLoad) {
//       loadUnpaidClaims();
//       loadFolders();
//     }
//   }, [isInitialLoad, loadUnpaidClaims, loadFolders]);

//   // Validate settle amounts on input change
//   useEffect(() => {
//     if (showSettleModal) {
//       validateSettleAmounts();
//     }
//   }, [settlePaidAmount, settleDiscountAmount, showSettleModal, validateSettleAmounts]);

//   // ---------- Render Helpers ----------
//   const getSelectedCount = () => {
//     return filteredClaims.filter(c => c.selected).length;
//   };

//   const renderStats = () => {
//     return (
//       <div className="claims-stats-section">
//         <div className="stat-item">
//           {t.claimsCount}: {stats.total}
//         </div>
//         <div className="stat-item" style={{ color: '#e53e3e' }}>
//           {t.column.outstanding}: {formatCurrency(stats.outstanding)}
//         </div>
//       </div>
//     );
//   };

//   const renderFilterSection = () => {
//     return (
//       <div className="claims-filter-section">
//         <select value={filterType} onChange={handleFilterChange}>
//           <option value="all">{t.allClaims}</option>
//           <option value="unpaid">{t.unpaidClaims}</option>
//         </select>
        
//         <select value={selectedFolder?.id || ''} onChange={handleFolderSelect}>
//           <option value="">{t.selectFolder}</option>
//           {folders.map(folder => (
//             <option key={folder.id} value={folder.id}>{folder.name}</option>
//           ))}
//         </select>
        
//         <input
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           placeholder={t.from}
//         />
//         <input
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           placeholder={t.to}
//         />
//         <button
//           onClick={loadClaimsByDateRange}
//           style={{
//             background: '#4a90d9',
//             color: 'white',
//             border: 'none',
//             borderRadius: '20px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           📅 {t.search}
//         </button>
        
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearch}
//           placeholder={t.search.claims}
//           style={{
//             flex: 1,
//             minWidth: '150px',
//             borderRadius: '20px',
//             padding: '8px 15px',
//             border: '1px solid #e2e8f0',
//           }}
//         />
        
//         <button
//           onClick={() => {
//             setClaims([]);
//             setFilteredClaims([]);
//             setSelectedFolder(null);
//             loadUnpaidClaims();
//           }}
//           style={{
//             background: '#2d3748',
//             color: 'white',
//             border: 'none',
//             borderRadius: '20px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           🔄 {t.refresh}
//         </button>
        
//         <button
//           onClick={() => setShowCreateFolderModal(true)}
//           style={{
//             background: '#38a169',
//             color: 'white',
//             border: 'none',
//             borderRadius: '20px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           📁 {t.createFolder}
//         </button>
        
//         <button
//           onClick={() => {
//             loadFolders();
//             setShowFolderModal(true);
//           }}
//           style={{
//             background: '#6b46c1',
//             color: 'white',
//             border: 'none',
//             borderRadius: '20px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           📂 {t.folders}
//         </button>
//       </div>
//     );
//   };

//   const renderSelectionBar = () => {
//     const selectedCount = getSelectedCount();
//     if (selectedCount === 0) return null;
    
//     return (
//       <div className="claims-selection-bar">
//         <span className="selected-count">
//           {selectedCount} {t.selected}
//         </span>
//         <button
//           onClick={handleAddToFolder}
//           style={{ background: '#38a169', color: 'white' }}
//         >
//           📂 {t.addToFolder}
//         </button>
//         {selectedFolder && (
//           <button
//             onClick={handleRemoveFromFolder}
//             style={{ background: '#e53e3e', color: 'white' }}
//           >
//             🗑️ {t.removeSelected}
//           </button>
//         )}
//         <div style={{ flex: 1 }}></div>
//         <button
//           onClick={() => {
//             setFilteredClaims(prev => prev.map(c => ({ ...c, selected: false })));
//             setClaims(prev => prev.map(c => ({ ...c, selected: false })));
//           }}
//           style={{ background: 'transparent', color: '#a0aec0' }}
//         >
//           ✕
//         </button>
//       </div>
//     );
//   };

// //   const renderTable = () => {
// //     if (loading && isInitialLoad) {
// //       return <div className="claims-loading">⏳ Loading...</div>;
// //     }
    
// //     if (filteredClaims.length === 0) {
// //       return <div className="claims-empty">📭 No claims found</div>;
// //     }
    
// //     return (
// //       <div className="claims-table-wrapper">
// //         <table className="claims-table">
// //           <thead>
// //             <tr>
// //               <th style={{ width: '40px', textAlign: 'center' }}>
// //                 <input
// //                   type="checkbox"
// //                   checked={filteredClaims.every(c => c.selected)}
// //                   onChange={handleSelectAll}
// //                 />
// //               </th>
// //               <th>{t.column.id}</th>
// //               <th>{t.column.patient}</th>
// //               <th>{t.column.doctor}</th>
// //               <th>{t.column.provider}</th>
// //               <th>{t.column.insurance}</th>
// //               <th>{t.column.paid}</th>
// //               <th>{t.column.outstanding}</th>
// //               <th>{t.column.paidStatus}</th>
// //               <th>{t.column.paidAt}</th>
// //               <th>{t.column.action}</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredClaims.map(claim => (
// //               <tr key={claim.id}>
// //                 <td style={{ textAlign: 'center' }}>
// //                   <input
// //                     type="checkbox"
// //                     checked={claim.selected}
// //                     onChange={() => handleSelectOne(claim.id)}
// //                   />
// //                 </td>
// //                 <td>{claim.id}</td>
// //                 <td style={{ fontWeight: 'bold' }}>{claim.patientName}</td>
// //                 <td>{claim.doctorName}</td>
// //                 <td>{claim.insuranceProvider}</td>
// //                 <td className="amount-positive">{formatCurrency(claim.insuranceAmount)}</td>
// //                 <td style={{ color: '#38a169' }}>{formatCurrency(claim.insurancePaidAmount)}</td>
// //                 <td className={claim.insuranceOutstanding > 0 ? 'amount-negative' : 'amount-positive'}>
// //                   {formatCurrency(claim.insuranceOutstanding)}
// //                 </td>
// //                 <td>
// //                   <span className={claim.insurancePaid ? 'status-paid' : 'status-pending'}>
// //                     {claim.insurancePaid ? `✓ ${t.paid}` : `⏳ ${t.pending}`}
// //                   </span>
// //                 </td>
// //                 <td>{formatDate(claim.paidAt)}</td>
// //                 <td>
// //                   {claim.paymentMethod === 'INSURANCE' && !claim.insurancePaid && (
// //                     <button
// //                       className="settle-btn"
// //                       onClick={() => handleSettleClick(claim)}
// //                     >
// //                       {t.settle}
// //                     </button>
// //                   )}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     );
// //   };
// const renderTable = () => {
//   if (loading && isInitialLoad) {
//     return <div className="claims-loading">⏳ Loading...</div>;
//   }
  
//   if (filteredClaims.length === 0) {
//     return <div className="claims-empty">📭 No claims found</div>;
//   }
  
//   return (
//     <div className="claims-table-wrapper">
//       <table className="claims-table">
//         <thead>
//           <tr>
//             <th style={{ width: '40px', textAlign: 'center' }}>
//               <input
//                 type="checkbox"
//                 checked={filteredClaims.every(c => c.selected)}
//                 onChange={handleSelectAll}
//               />
//             </th>
//             <th>{t.column.id}</th>
//             <th>{t.column.patient}</th>
//             <th>{t.column.doctor}</th>
//             <th>{t.column.provider}</th>
//             <th>{t.column.insurance}</th>
//             <th>{t.column.paid}</th>
//             <th>Discount</th>  {/* 👈 NEW COLUMN */}
//             <th>{t.column.outstanding}</th>
//             <th>{t.column.paidStatus}</th>
//             <th>{t.column.paidAt}</th>
//             <th>{t.column.action}</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredClaims.map(claim => (
//             <tr key={claim.id}>
//               <td style={{ textAlign: 'center' }}>
//                 <input
//                   type="checkbox"
//                   checked={claim.selected}
//                   onChange={() => handleSelectOne(claim.id)}
//                 />
//               </td>
//               <td>{claim.id}</td>
//               <td style={{ fontWeight: 'bold' }}>{claim.patientName}</td>
//               <td>{claim.doctorName}</td>
//               <td>{claim.insuranceProvider}</td>
//               <td className="amount-positive">{formatCurrency(claim.insuranceAmount)}</td>
//               <td style={{ color: '#38a169' }}>{formatCurrency(claim.insurancePaidAmount)}</td>
//               <td style={{ color: '#805ad5' }}>  {/* 👈 Discount column with purple color */}
//                 {formatCurrency(claim.insuranceDiscount)}
//               </td>
//               <td className={claim.insuranceOutstanding > 0 ? 'amount-negative' : 'amount-positive'}>
//                 {formatCurrency(claim.insuranceOutstanding)}
//               </td>
//               <td>
//                 <span className={claim.insurancePaid ? 'status-paid' : 'status-pending'}>
//                   {claim.insurancePaid ? `✓ ${t.paid}` : `⏳ ${t.pending}`}
//                 </span>
//               </td>
//               <td>{formatDate(claim.paidAt)}</td>
//               <td>
//                 {claim.paymentMethod === 'INSURANCE' && !claim.insurancePaid && (
//                   <button
//                     className="settle-btn"
//                     onClick={() => handleSettleClick(claim)}
//                   >
//                     {t.settle}
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };


//   const renderSettleModal = () => {
//     if (!showSettleModal || !currentClaim) return null;
    
//     return (
//       <div className="claims-modal-overlay">
//         <div className="claims-modal">
//           <h3>💰 {t.settleInsuranceTitle}</h3>
//           <p style={{ color: '#4a5568', marginBottom: '15px' }}>
//             {t.settleInsuranceHeader}
//           </p>
          
//           <div className="form-group">
//             <label>{t.insuranceAmount}:</label>
//             <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#2d3748' }}>
//               {formatCurrency(currentClaim.insuranceAmount)}
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label>{t.outstanding}:</label>
//             <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#e53e3e' }}>
//               {formatCurrency(currentClaim.insuranceOutstanding)}
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label>{t.paidAmount}:</label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={settlePaidAmount}
//               onChange={(e) => setSettlePaidAmount(e.target.value)}
//               placeholder="0.00"
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.discountAmount}:</label>
//             <input
//               type="number"
//               step="0.01"
//               min="0"
//               value={settleDiscountAmount}
//               onChange={(e) => setSettleDiscountAmount(e.target.value)}
//               placeholder="0.00"
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.totalAmount}:</label>
//             <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
//               {settleTotalDisplay}
//             </div>
//           </div>
          
//           {settleValidationMsg && (
//             <div className={`validation-msg ${settleValidationType}`}>
//               {settleValidationMsg}
//             </div>
//           )}
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowSettleModal(false)}
//             >
//               {t.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleSettleConfirm}
//               disabled={settleValidationType !== 'success'}
//             >
//               {t.settle}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderFolderModal = () => {
//     if (!showFolderModal) return null;
    
//     // Get selected claim IDs
//     const selectedClaimIds = filteredClaims.filter(c => c.selected).map(c => c.id);
    
//     const handleAddToSelectedFolder = () => {
//       if (!selectedFolderId) {
//         alert(t.noFolderSelected);
//         return;
//       }
//       addClaimsToFolder(selectedFolderId, selectedClaimIds);
//       setShowFolderModal(false);
//     };

//     return (
//       <div className="claims-modal-overlay">
//         <div className="claims-modal claims-folder-modal">
//           <h3>📂 {t.folders}</h3>
          
//           <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
//             <button
//               onClick={() => {
//                 loadFolders();
//                 setShowFolderModal(true);
//               }}
//               style={{
//                 background: '#4a90d9',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '15px',
//                 padding: '6px 15px',
//                 cursor: 'pointer',
//               }}
//             >
//               🔄 {t.refresh}
//             </button>
//           </div>
          
//           <p style={{ marginBottom: '10px', color: '#4a5568' }}>
//             {t.selectFolderHeader} ({selectedClaimIds.length} {t.selected})
//           </p>
          
//           <div className="claims-table-wrapper">
//             <table className="folder-table">
//               <thead>
//                 <tr>
//                   <th style={{ width: '40px' }}>Select</th>
//                   <th>{t.column.id}</th>
//                   <th>{t.column.name}</th>
//                   <th>{t.column.description}</th>
//                   <th>{t.column.action}</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {folders.map(folder => (
//                   <tr key={folder.id} style={{ 
//                     background: selectedFolderId === folder.id ? '#ebf8ff' : 'white',
//                     cursor: 'pointer'
//                   }}>
//                     <td style={{ textAlign: 'center' }}>
//                       <input
//                         type="radio"
//                         name="folderSelect"
//                         checked={selectedFolderId === folder.id}
//                         onChange={() => setSelectedFolderId(folder.id)}
//                       />
//                     </td>
//                     <td>{folder.id}</td>
//                     <td style={{ fontWeight: 'bold' }}>{folder.name}</td>
//                     <td>{folder.description}</td>
//                     <td>
//                       <button
//                         className="delete-btn"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           if (window.confirm(`${t.deleteFolderContent} '${folder.name}'?`)) {
//                             deleteFolder(folder.id);
//                           }
//                         }}
//                       >
//                         🗑️ {t.delete}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {folders.length === 0 && (
//                   <tr>
//                     <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#a0aec0' }}>
//                       No folders found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
          
//           <div className="modal-actions" style={{ marginTop: '20px' }}>
//             <button
//               className="btn-secondary"
//               onClick={() => setShowFolderModal(false)}
//             >
//               {t.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleAddToSelectedFolder}
//               disabled={!selectedFolderId}
//             >
//               📂 {t.addToFolder}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderCreateFolderModal = () => {
//     if (!showCreateFolderModal) return null;
    
//     return (
//       <div className="claims-modal-overlay">
//         <div className="claims-modal">
//           <h3>📁 {t.createFolderTitle}</h3>
//           <p style={{ color: '#4a5568', marginBottom: '15px' }}>
//             {t.createFolderHeader}
//           </p>
          
//           <div className="form-group">
//             <label>{t.folderName}</label>
//             <input
//               type="text"
//               value={folderName}
//               onChange={(e) => setFolderName(e.target.value)}
//               placeholder={t.folderName}
//               autoFocus
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && folderName.trim()) {
//                   createFolder(folderName.trim());
//                 }
//               }}
//             />
//           </div>
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowCreateFolderModal(false)}
//             >
//               {t.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={() => {
//                 if (folderName.trim()) {
//                   createFolder(folderName.trim());
//                 }
//               }}
//               disabled={!folderName.trim()}
//             >
//               {t.createFolder}
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
//       <div className="claims-container">
//         {/* Header */}
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
//           <h2 style={{ margin: 0 }}>📑 {t.title}</h2>
//           <button
//             onClick={onClose}
//             style={{
//               background: '#e2e8f0',
//               border: 'none',
//               padding: '8px 20px',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontSize: '14px',
//             }}
//           >
//             ✕ {t.close}
//           </button>
//         </div>

//         {/* Filter Section */}
//         <div className="claims-topbar">
//           {renderFilterSection()}
//           {renderStats()}
//         </div>

//         {/* Selection Bar */}
//         {renderSelectionBar()}

//         {/* Table */}
//         <div className="claims-table-container">
//           <div className="claims-table-header">
//             <span className="title">📋 {t.claimsList}</span>
//             <div className="actions">
//               <button
//                 onClick={exportToCSV}
//                 style={{ background: '#38a169', color: 'white' }}
//               >
//                 📊 {t.export}
//               </button>
//               <button
//                 onClick={loadAllClaims}
//                 style={{ background: '#4a90d9', color: 'white' }}
//               >
//                 👁️ {t.viewAll}
//               </button>
//             </div>
//           </div>
//           {renderTable()}
//         </div>

//         {/* Bottom Bar */}
//         <div className="claims-bottom-bar">
//           <span className="status-online">● {t.online}</span>
//           <span>v2.0</span>
//           <span style={{ flex: 1 }}></span>
//           <span>{t.recordsLoaded}: {filteredClaims.length}</span>
//         </div>

//         {/* Modals */}
//         {renderSettleModal()}
//         {renderFolderModal()}
//         {renderCreateFolderModal()}
//       </div>
//     </>
//   );
// };

// export default ClaimsTrackingScreen;  09072026  11:00 pm 


import React, { useState, useCallback, useEffect } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Styles ----------
const styles = `
  .claims-container {
    padding: 20px;
    background: #f0f2f5;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .claims-topbar {
    background: white;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    margin-bottom: 20px;
  }
  .claims-filter-section {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    align-items: center;
    padding: 5px 0;
  }
  .claims-filter-section select, 
  .claims-filter-section input {
    padding: 8px 12px;
    border-radius: 20px;
    border: 1px solid #e2e8f0;
    font-size: 14px;
    background: white;
  }
  .claims-filter-section select:focus,
  .claims-filter-section input:focus {
    outline: none;
    border-color: #4a90d9;
    box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.1);
  }
  .claims-stats-section {
    display: flex;
    gap: 30px;
    padding: 10px 15px;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    margin-top: 10px;
    flex-wrap: wrap;
  }
  .claims-stats-section .stat-item {
    font-weight: bold;
    font-size: 14px;
  }
  .claims-table-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    overflow: hidden;
  }
  .claims-table-header {
    padding: 10px 15px;
    background: #edf2f7;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .claims-table-header .title {
    font-weight: bold;
    font-size: 16px;
  }
  .claims-table-header .actions {
    display: flex;
    gap: 10px;
  }
  .claims-table-header .actions button {
    padding: 6px 15px;
    border: none;
    border-radius: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
  }
  .claims-table-header .actions button:hover {
    transform: scale(1.05);
  }
  .claims-table-wrapper {
    overflow-x: auto;
  }
  .claims-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .claims-table th {
    padding: 12px 15px;
    text-align: left;
    font-weight: bold;
    color: #2d3748;
    border-bottom: 2px solid #e2e8f0;
    background: #f8f9fa;
  }
  .claims-table td {
    padding: 10px 15px;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: middle;
  }
  .claims-table tr:hover td {
    background: #f7fafc;
  }
  .claims-table .amount-positive {
    color: #2d3748;
    font-weight: bold;
  }
  .claims-table .amount-negative {
    color: #e53e3e;
    font-weight: bold;
  }
  .claims-table .status-paid {
    color: #38a169;
    font-weight: bold;
  }
  .claims-table .status-pending {
    color: #e53e3e;
    font-weight: bold;
  }
  .claims-table .settle-btn {
    background: #4a90d9;
    color: white;
    border: none;
    border-radius: 15px;
    padding: 4px 12px;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .claims-table .settle-btn:hover {
    background: #357abd;
    transform: scale(1.05);
  }
  .claims-selection-bar {
    background: #ebf8ff;
    padding: 8px 15px;
    border: 1px solid #bee3f8;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  .claims-selection-bar .selected-count {
    font-weight: bold;
    color: #2b6cb0;
  }
  .claims-selection-bar button {
    border: none;
    border-radius: 15px;
    padding: 4px 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 12px;
  }
  .claims-selection-bar button:hover {
    transform: scale(1.05);
  }
  .claims-bottom-bar {
    display: flex;
    justify-content: flex-end;
    padding: 10px 15px;
    background: #f7fafc;
    border-top: 1px solid #e2e8f0;
    gap: 15px;
    font-size: 12px;
    color: #4a5568;
    margin-top: 15px;
  }
  .claims-bottom-bar .status-online {
    color: #38a169;
  }
  .claims-modal-overlay {
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
  .claims-modal {
    background: white;
    border-radius: 12px;
    padding: 25px;
    max-width: 500px;
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  .claims-modal h3 {
    margin: 0 0 15px 0;
  }
  .claims-modal .form-group {
    margin-bottom: 15px;
  }
  .claims-modal .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .claims-modal .form-group input {
    width: 100%;
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    font-size: 14px;
  }
  .claims-modal .form-group input:focus {
    outline: none;
    border-color: #4a90d9;
  }
  .claims-modal .validation-msg {
    font-size: 13px;
    font-weight: bold;
    margin-top: 5px;
  }
  .claims-modal .validation-msg.success {
    color: #38a169;
  }
  .claims-modal .validation-msg.error {
    color: #e53e3e;
  }
  .claims-modal .validation-msg.warning {
    color: #ed8936;
  }
  .claims-modal .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .claims-modal .modal-actions button {
    padding: 8px 25px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
  }
  .claims-modal .modal-actions button:hover {
    transform: scale(1.05);
  }
  .claims-modal .modal-actions .btn-primary {
    background: #4a90d9;
    color: white;
  }
  .claims-modal .modal-actions .btn-primary:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
  .claims-modal .modal-actions .btn-secondary {
    background: #e2e8f0;
    color: #4a5568;
  }
  .claims-folder-modal {
    max-width: 800px;
  }
  .claims-folder-modal .folder-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .claims-folder-modal .folder-table th {
    padding: 10px;
    text-align: left;
    background: #f8f9fa;
    border-bottom: 2px solid #e2e8f0;
  }
  .claims-folder-modal .folder-table td {
    padding: 8px 10px;
    border-bottom: 1px solid #e2e8f0;
  }
  .claims-folder-modal .folder-table tr:hover td {
    background: #f7fafc;
  }
  .claims-folder-modal .folder-table .delete-btn {
    background: #e53e3e;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 2px 10px;
    font-size: 11px;
    cursor: pointer;
  }
  .claims-folder-modal .folder-table .delete-btn:hover {
    background: #c0392b;
  }
  .claims-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    font-size: 18px;
    color: #a0aec0;
  }
  .claims-empty {
    text-align: center;
    padding: 40px;
    color: #a0aec0;
  }
  .claims-table .checkbox-cell {
    text-align: center;
  }
  .claims-table .checkbox-cell input[type="checkbox"] {
    cursor: pointer;
  }
`;

// ---------- Helper Functions ----------
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch {
    return dateString;
  }
};

// ---------- Claim Row Class ----------
class ClaimRow {
  constructor(data = {}) {
    this.id = data.id || 0;
    this.visitId = data.visitId || 0;
    this.patientName = data.patientName || '';
    this.doctorName = data.doctorName || '';
    this.insuranceProvider = data.insuranceProvider || '';
    this.insuranceAmount = data.insuranceAmount || 0;
    this.insurancePaidAmount = data.insurancePaidAmount || 0;
    this.insuranceDiscount = data.insuranceDiscount || 0;
    this.insuranceOutstanding = data.insuranceOutstanding || 0;
    this.originalAmount = data.originalAmount || 0;
    this.paymentMethod = data.paymentMethod || '';
    this.insuranceClass = data.insuranceClass || '';
    this.insuranceType = data.insuranceType || '';
    this.coveragePercent = data.coveragePercent || 0;
    this.insuranceAcceptNumber = data.insuranceAcceptNumber || '';
    this.insuranceCardId = data.insuranceCardId || '';
    this.insuranceFormId = data.insuranceFormId || '';
    this.terminalId = data.terminalId || '';
    this.referenceNumber = data.referenceNumber || '';
    this.cardType = data.cardType || '';
    this.approvalCode = data.approvalCode || '';
    this.paidAt = data.paidAt || '';
    this.visitDate = data.visitDate || '';
    this.currency = data.currency || 'USD';
    this.insurancePaid = data.insurancePaid || false;
    this.insuranceSettled = data.insuranceSettled || false;
    this.selected = false;
  }

  static fromJson(json) {
    return new ClaimRow({
      id: json.id || 0,
      visitId: json.visitId || 0,
      patientName: json.patientName || json.patient?.fullName || '',
      doctorName: json.doctorName || json.doctor?.fullName || '',
      insuranceProvider: json.insuranceProvider || '',
      insuranceAmount: json.insuranceAmount || 0,
      insurancePaidAmount: json.insurancePaidAmount || 0,
      insuranceDiscount: json.insuranceDiscount || 0,
      insuranceOutstanding: json.insuranceOutstanding || 0,
      originalAmount: json.originalAmount || 0,
      paymentMethod: json.paymentMethod || '',
      insuranceClass: json.insuranceClass || '',
      insuranceType: json.insuranceType || '',
      coveragePercent: json.coveragePercent || 0,
      insuranceAcceptNumber: json.insuranceAcceptNumber || '',
      insuranceCardId: json.insuranceCardId || '',
      insuranceFormId: json.insuranceFormId || '',
      terminalId: json.terminalId || '',
      referenceNumber: json.referenceNumber || '',
      cardType: json.cardType || '',
      approvalCode: json.approvalCode || '',
      paidAt: json.paidAt || '',
      visitDate: json.visitDate || '',
      currency: json.currency || 'USD',
      insurancePaid: json.insurancePaid || false,
      insuranceSettled: json.insuranceSettled || false,
    });
  }
}

// ---------- Folder Row Class ----------
class FolderRow {
  constructor(data = {}) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.description = data.description || '';
  }

  static fromJson(json) {
    return new FolderRow({
      id: json.id || 0,
      name: json.name || '',
      description: json.description || '',
    });
  }
}

// ---------- Main Component ----------
const ClaimsTrackingScreen = ({ loggedUser, lang = 'en', onClose }) => {
  // ---------- Translations ----------
  const [folderName, setFolderName] = useState('');

  const t = React.useMemo(() => {
    const translations = {
      en: {
        title: 'Claims Tracking',
        search: { claims: 'Search claims...' },
        allClaims: 'All Claims',
        unpaidClaims: 'Unpaid Claims',
        selectFolder: 'Select Folder',
        refresh: 'Refresh',
        createFolder: 'Create Folder',
        folders: 'Folders',
        from: 'From',
        to: 'To',
        search: 'Search',
        claimsList: 'Claims List',
        export: 'Export',
        viewAll: 'View All',
        selected: 'selected',
        addToFolder: 'Add to Folder',
        removeSelected: 'Remove Selected',
        selectAll: 'Select All',
        claimsCount: 'Claims',
        recordsLoaded: 'Records Loaded',
        online: 'Online',
        column: {
          id: '#',
          patient: 'Patient',
          doctor: 'Doctor',
          provider: 'Provider',
          insurance: 'Insurance',
          paid: 'Paid',
          discount: 'Discount',  // 👈 Add this
          outstanding: 'Outstanding',
          paidStatus: 'Status',
          paidAt: 'Date',
          action: 'Action',
          name: 'Name',
          description: 'Description',
        },
        paid: 'Paid',
        pending: 'Pending',
        settle: 'Settle',
        chooseFolder: 'Choose Folder',
        selectFolderHeader: 'Select a folder to add claims',
        noFolderSelected: 'Please select a folder first',
        noClaimsSelected: 'Please select claims first',
        addedToFolder: 'Claims added to folder successfully',
        error: 'An error occurred',
        errorLoading: 'Failed to load data',
        createFolderTitle: 'Create Folder',
        createFolderHeader: 'Enter folder name',
        folderName: 'Folder name:',
        folderCreated: 'Folder created successfully',
        failedLoadingFolders: 'Failed to load folders',
        delete: 'Delete',
        deleteFolderTitle: 'Delete Folder',
        deleteFolderHeader: 'Delete Folder',
        deleteFolderContent: 'Are you sure you want to delete folder',
        folderDeleted: 'Folder deleted successfully',
        errorDeleting: 'Error deleting folder',
        serverError: 'Server error',
        deleteFailed: 'Delete failed',
        alertItemsRemoved: 'Items removed from folder',
        settleInsuranceTitle: 'Settle Insurance',
        settleInsuranceHeader: 'Enter settlement details',
        insuranceAmount: 'Insurance Amount',
        paidAmount: 'Paid Amount',
        discountAmount: 'Discount Amount',
        outstanding: 'Outstanding',
        totalAmount: 'Total Amount',
        valuesNegative: 'Values cannot be negative',
        validationValid: '✓ Valid settlement amount',
        validationRemaining: 'Remaining amount',
        validationExceeds: 'Amount exceeds insurance amount',
        invalidNumber: 'Please enter valid numbers',
        paidDiscountExceed: 'Paid + Discount cannot exceed insurance amount',
        confirmTitle: 'Confirm',
        settleConfirmHeader: 'Confirm Insurance Settlement',
        settleConfirmContent: 'Please confirm the settlement details:',
        settleSuccess: 'Insurance settled successfully',
        alertError: 'Error',
        selectDates: 'Please select from and to dates',
        failedLoadClaims: 'Failed to load claims',
        failedLoadFolder: 'Failed to load folder',
        failedLoadFolderItems: 'Failed to load folder items',
        itemsRemoved: 'Items removed from folder',
        close: 'Close',
        confirmClose: 'Are you sure you want to close this screen?',
        msg: {
          confirmClose: 'Are you sure you want to close this screen?',
        },
        status: {
          ready: 'Ready',
          loading: 'Loading...',
          loaded: 'Loaded',
          error: 'Error',
          appointments: 'claims',
          filtered: 'Filtered',
        },
        dashboard: {
          switchToTable: 'Switch to Table',
          switchToCard: 'Switch to Cards',
        },
        sidebar: {
          claimsTracking: 'Claims Tracking',
        },
      },
      ar: {
        title: 'تتبع المطالبات',
        search: { claims: 'بحث عن المطالبات...' },
        allClaims: 'جميع المطالبات',
        unpaidClaims: 'المطالبات غير المدفوعة',
        selectFolder: 'اختر مجلد',
        refresh: 'تحديث',
        createFolder: 'إنشاء مجلد',
        folders: 'المجلدات',
        from: 'من',
        to: 'إلى',
        search: 'بحث',
        claimsList: 'قائمة المطالبات',
        export: 'تصدير',
        viewAll: 'عرض الكل',
        selected: 'محدد',
        addToFolder: 'إضافة إلى مجلد',
        removeSelected: 'حذف المحدد',
        selectAll: 'تحديد الكل',
        claimsCount: 'المطالبات',
        recordsLoaded: 'السجلات المحملة',
        online: 'متصل',
        column: {
          id: '#',
          patient: 'المريض',
          doctor: 'الطبيب',
          provider: 'المزود',
          insurance: 'التأمين',
          paid: 'المدفوع',
             discount: 'الخصم',  // 👈 Add this

          outstanding: 'المتبقي',
          paidStatus: 'الحالة',
          paidAt: 'التاريخ',
          action: 'إجراء',
          name: 'الاسم',
          description: 'الوصف',
        },
        paid: 'مدفوع',
        pending: 'معلق',
        settle: 'تسوية',
        chooseFolder: 'اختر مجلد',
        selectFolderHeader: 'اختر مجلد لإضافة المطالبات',
        noFolderSelected: 'يرجى اختيار مجلد أولاً',
        noClaimsSelected: 'يرجى اختيار مطالبات أولاً',
        addedToFolder: 'تمت إضافة المطالبات إلى المجلد بنجاح',
        error: 'حدث خطأ',
        errorLoading: 'فشل تحميل البيانات',
        createFolderTitle: 'إنشاء مجلد',
        createFolderHeader: 'أدخل اسم المجلد',
        folderName: 'اسم المجلد:',
        folderCreated: 'تم إنشاء المجلد بنجاح',
        failedLoadingFolders: 'فشل تحميل المجلدات',
        delete: 'حذف',
        deleteFolderTitle: 'حذف المجلد',
        deleteFolderHeader: 'حذف المجلد',
        deleteFolderContent: 'هل أنت متأكد من حذف المجلد',
        folderDeleted: 'تم حذف المجلد بنجاح',
        errorDeleting: 'خطأ في حذف المجلد',
        serverError: 'خطأ في الخادم',
        deleteFailed: 'فشل الحذف',
        alertItemsRemoved: 'تمت إزالة العناصر من المجلد',
        settleInsuranceTitle: 'تسوية التأمين',
        settleInsuranceHeader: 'أدخل تفاصيل التسوية',
        insuranceAmount: 'مبلغ التأمين',
        paidAmount: 'المبلغ المدفوع',
        discountAmount: 'مبلغ الخصم',
        outstanding: 'المتبقي',
        totalAmount: 'المبلغ الإجمالي',
        valuesNegative: 'لا يمكن أن تكون القيم سالبة',
        validationValid: '✓ مبلغ تسوية صحيح',
        validationRemaining: 'المبلغ المتبقي',
        validationExceeds: 'المبلغ يتجاوز مبلغ التأمين',
        invalidNumber: 'يرجى إدخال أرقام صحيحة',
        paidDiscountExceed: 'المدفوع + الخصم لا يمكن أن يتجاوز مبلغ التأمين',
        confirmTitle: 'تأكيد',
        settleConfirmHeader: 'تأكيد تسوية التأمين',
        settleConfirmContent: 'يرجى تأكيد تفاصيل التسوية:',
        settleSuccess: 'تمت تسوية التأمين بنجاح',
        alertError: 'خطأ',
        selectDates: 'يرجى تحديد تاريخ البداية والنهاية',
        failedLoadClaims: 'فشل تحميل المطالبات',
        failedLoadFolder: 'فشل تحميل المجلد',
        failedLoadFolderItems: 'فشل تحميل عناصر المجلد',
        itemsRemoved: 'تمت إزالة العناصر من المجلد',
        close: 'إغلاق',
        confirmClose: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
        status: {
          ready: 'جاهز',
          loading: 'جاري التحميل...',
          loaded: 'تم التحميل',
          error: 'خطأ',
          appointments: 'مطالبات',
          filtered: 'تم التصفية',
        },
        dashboard: {
          switchToTable: 'التبديل إلى الجدول',
          switchToCard: 'التبديل إلى البطاقات',
        },
        sidebar: {
          claimsTracking: 'تتبع المطالبات',
        },
      },
    };

    return translations[lang] || translations.en;
  }, [lang]);

  // ---------- State ----------
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 0, outstanding: 0 });
  const [filterType, setFilterType] = useState('unpaid');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [currentClaim, setCurrentClaim] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  
  // Settle form state
  const [settlePaidAmount, setSettlePaidAmount] = useState('');
  const [settleDiscountAmount, setSettleDiscountAmount] = useState('');
  const [settleValidationMsg, setSettleValidationMsg] = useState('');
  const [settleValidationType, setSettleValidationType] = useState('');
  const [settleTotalDisplay, setSettleTotalDisplay] = useState('$0.00');

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

  // ---------- API Calls ----------
  const loadClaims = useCallback(async (endpoint) => {
    setLoading(true);

    try {
      const url = `${BASE_URL}${endpoint}`;
      console.log('📤 Loading claims from:', url);
      
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      const claimsData = Array.isArray(data) ? data : [data];
      
      const parsedClaims = claimsData.map(item => ClaimRow.fromJson(item));
      
      setClaims(parsedClaims);
      setFilteredClaims(parsedClaims);
      
      // Update stats - Calculate outstanding from insuranceAmount - insurancePaidAmount
      const totalOutstanding = parsedClaims
        .filter(c => !c.insurancePaid)
        .reduce((sum, c) => {
          const outstanding = c.insuranceAmount - c.insurancePaidAmount;
          return sum + outstanding;
        }, 0);
      
      setStats({
        total: parsedClaims.length,
        outstanding: totalOutstanding,
      });
    } catch (err) {
      console.error('🚨 Load error:', err);
      setClaims([]);
      setFilteredClaims([]);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  const loadUnpaidClaims = useCallback(() => {
    loadClaims('/api/visits/outstanding');
  }, [loadClaims]);

  const loadAllClaims = useCallback(() => {
    loadClaims('/api/visits');
  }, [loadClaims]);

  const loadClaimsByDateRange = useCallback(async () => {
    if (!fromDate || !toDate) {
      alert(t.selectDates);
      return;
    }
    loadClaims(`/api/visits/between-dates?fromDate=${fromDate}&toDate=${toDate}`);
  }, [fromDate, toDate, loadClaims, t.selectDates]);

  const loadFolders = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/folders`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      const folderData = Array.isArray(data) ? data : [data];
      const parsedFolders = folderData.map(item => FolderRow.fromJson(item));
      
      setFolders(parsedFolders);
    } catch (err) {
      console.error('🚨 Load folders error:', err);
      alert(t.failedLoadingFolders);
    }
  }, [t.failedLoadingFolders]);

  const loadFolderItems = useCallback(async (folderId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      const ids = Array.isArray(data) ? data : [data];
      
      if (ids.length > 0) {
        const idsParam = ids.join(',');
        loadClaims(`/api/visits/by-ids?ids=${idsParam}`);
      } else {
        setClaims([]);
        setFilteredClaims([]);
        setStats({ total: 0, outstanding: 0 });
      }
    } catch (err) {
      console.error('🚨 Load folder items error:', err);
      alert(t.failedLoadFolder);
    }
  }, [loadClaims, t.failedLoadFolder]);

  const createFolder = useCallback(async (name) => {
    try {
      const res = await fetch(`${BASE_URL}/api/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description: '' }),
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      alert(t.folderCreated);
      loadFolders();
      setShowCreateFolderModal(false);
    } catch (err) {
      console.error('🚨 Create folder error:', err);
      alert(t.alertError);
    }
  }, [loadFolders, t.folderCreated, t.alertError]);

  const deleteFolder = useCallback(async (folderId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/folders/${folderId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      alert(t.folderDeleted);
      loadFolders();
      setShowFolderModal(false);
    } catch (err) {
      console.error('🚨 Delete folder error:', err);
      alert(t.errorDeleting);
    }
  }, [loadFolders, t.folderDeleted, t.errorDeleting]);

  const addClaimsToFolder = useCallback(async (folderId, claimIds) => {
    try {
      const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claimIds),
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      alert(t.addedToFolder);
      // Clear selections
      setClaims(prev => prev.map(c => ({ ...c, selected: false })));
      setFilteredClaims(prev => prev.map(c => ({ ...c, selected: false })));
    } catch (err) {
      console.error('🚨 Add to folder error:', err);
      alert(t.error);
    }
  }, [t.addedToFolder, t.error]);

  const removeClaimsFromFolder = useCallback(async (folderId, claimIds) => {
    try {
      const res = await fetch(`${BASE_URL}/api/folders/${folderId}/items`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claimIds),
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      alert(t.itemsRemoved);
      // Refresh the folder items
      if (folderId) {
        loadFolderItems(folderId);
      }
    } catch (err) {
      console.error('🚨 Remove from folder error:', err);
      alert(t.deleteFailed);
    }
  }, [loadFolderItems, t.itemsRemoved, t.deleteFailed]);

  const settleInsurance = useCallback(async (claimId, paidAmount, discountAmount) => {
    try {
      const url = `${BASE_URL}/api/visits/payments/insurance/${claimId}/settle?paidAmount=${paidAmount}&discountAmount=${discountAmount}`;
      console.log('📤 Settling insurance:', url);
      
      const res = await fetch(url, {
        method: 'PUT',
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      
      alert(t.settleSuccess);
      loadUnpaidClaims();
      setShowSettleModal(false);
      logAction('SETTLE_INSURANCE', `Settled insurance for claim ${claimId}`);
    } catch (err) {
      console.error('🚨 Settle error:', err);
      alert(`${t.serverError}: ${err.message}`);
    }
  }, [loadUnpaidClaims, t.settleSuccess, t.serverError, logAction]);

  // ---------- Handlers ----------
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterType(value);
    
    if (value === 'all') {
      loadAllClaims();
    } else if (value === 'unpaid') {
      loadUnpaidClaims();
    }
  };

  const handleFolderSelect = (e) => {
    const folderId = parseInt(e.target.value);
    if (folderId) {
      const folder = folders.find(f => f.id === folderId);
      setSelectedFolder(folder);
      loadFolderItems(folderId);
    } else {
      setSelectedFolder(null);
      loadUnpaidClaims();
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      // Reset to current filter
      if (filterType === 'all') {
        loadAllClaims();
      } else {
        loadUnpaidClaims();
      }
      return;
    }
    
    // Client-side filtering
    const filtered = claims.filter(claim => {
      return (
        claim.patientName.toLowerCase().includes(query) ||
        claim.doctorName.toLowerCase().includes(query) ||
        claim.insuranceProvider.toLowerCase().includes(query) ||
        claim.insuranceClass.toLowerCase().includes(query) ||
        claim.insuranceType.toLowerCase().includes(query) ||
        claim.insuranceAcceptNumber?.toLowerCase().includes(query) ||
        claim.insuranceCardId?.toLowerCase().includes(query) ||
        claim.insuranceFormId?.toLowerCase().includes(query) ||
        claim.terminalId?.toLowerCase().includes(query) ||
        claim.referenceNumber?.toLowerCase().includes(query) ||
        claim.cardType?.toLowerCase().includes(query) ||
        claim.approvalCode?.toLowerCase().includes(query) ||
        claim.paidAt?.toLowerCase().includes(query) ||
        claim.visitDate?.toLowerCase().includes(query) ||
        claim.currency?.toLowerCase().includes(query) ||
        String(claim.id).includes(query) ||
        String(claim.visitId).includes(query) ||
        String(claim.amount).includes(query) ||
        String(claim.insuranceAmount).includes(query) ||
        String(claim.insurancePaidAmount).includes(query) ||
        String(claim.insuranceDiscount).includes(query) ||
        String(claim.insuranceOutstanding).includes(query) ||
        String(claim.originalAmount).includes(query) ||
        String(claim.coveragePercent).includes(query)
      );
    });
    
    setFilteredClaims(filtered);
    updateStats(filtered);
  };

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setFilteredClaims(prev => prev.map(c => ({ ...c, selected: checked })));
    setClaims(prev => prev.map(c => ({ ...c, selected: checked })));
  };

  const handleSelectOne = (id) => {
    setFilteredClaims(prev => prev.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    ));
    setClaims(prev => prev.map(c => 
      c.id === id ? { ...c, selected: !c.selected } : c
    ));
  };

  const handleAddToFolder = () => {
    const selectedIds = filteredClaims.filter(c => c.selected).map(c => c.id);
    if (selectedIds.length === 0) {
      alert(t.noClaimsSelected);
      return;
    }
    setSelectedFolderId(null); // Reset selection when opening modal
    setShowFolderModal(true);
  };

  const handleRemoveFromFolder = () => {
    if (!selectedFolder) {
      alert(t.noFolderSelected);
      return;
    }
    
    const selectedIds = filteredClaims.filter(c => c.selected).map(c => c.id);
    if (selectedIds.length === 0) {
      alert(t.noClaimsSelected);
      return;
    }
    
    if (window.confirm(`Remove ${selectedIds.length} claims from folder "${selectedFolder.name}"?`)) {
      removeClaimsFromFolder(selectedFolder.id, selectedIds);
    }
  };

  const handleSettleClick = (claim) => {
    setCurrentClaim(claim);
    setSettlePaidAmount('');
    setSettleDiscountAmount('');
    setSettleValidationMsg('');
    setSettleValidationType('');
    setSettleTotalDisplay('$0.00');
    setShowSettleModal(true);
  };

  const validateSettleAmounts = useCallback(() => {
    if (!currentClaim) return false;
    
    const paidVal = parseFloat(settlePaidAmount) || 0;
    const discountVal = parseFloat(settleDiscountAmount) || 0;
    const insuranceAmount = currentClaim.insuranceAmount;
    const total = paidVal + discountVal;
    
    // Check for negative values
    if (paidVal < 0 || discountVal < 0) {
      setSettleValidationMsg(t.valuesNegative);
      setSettleValidationType('error');
      setSettleTotalDisplay(formatCurrency(total));
      return false;
    }
    
    // Check if total equals insurance amount
    if (Math.abs(total - insuranceAmount) <= 0.01) {
      setSettleValidationMsg(t.validationValid);
      setSettleValidationType('success');
      setSettleTotalDisplay(formatCurrency(total));
      return true;
    } else if (total < insuranceAmount) {
      const remaining = insuranceAmount - total;
      setSettleValidationMsg(`${t.validationRemaining}: ${formatCurrency(remaining)}`);
      setSettleValidationType('warning');
      setSettleTotalDisplay(formatCurrency(total));
      return false;
    } else {
      const excess = total - insuranceAmount;
      setSettleValidationMsg(`${t.validationExceeds}: ${formatCurrency(excess)}`);
      setSettleValidationType('error');
      setSettleTotalDisplay(formatCurrency(total));
      return false;
    }
  }, [currentClaim, settlePaidAmount, settleDiscountAmount, t]);

  const handleSettleConfirm = () => {
    if (!currentClaim) return;
    
    const paidVal = parseFloat(settlePaidAmount) || 0;
    const discountVal = parseFloat(settleDiscountAmount) || 0;
    const total = paidVal + discountVal;
    const insuranceAmount = currentClaim.insuranceAmount;
    
    // Final validation
    if (paidVal < 0 || discountVal < 0) {
      alert(t.valuesNegative);
      return;
    }
    
    if (Math.abs(total - insuranceAmount) > 0.01) {
      alert(`${t.paidDiscountExceed} (${formatCurrency(insuranceAmount)}). Total: ${formatCurrency(total)}`);
      return;
    }
    
    // Confirm before settling
    if (window.confirm(
      `${t.settleConfirmContent}\n\n` +
      `${t.paidAmount}: ${formatCurrency(paidVal)}\n` +
      `${t.discountAmount}: ${formatCurrency(discountVal)}\n` +
      `${t.totalAmount}: ${formatCurrency(total)}`
    )) {
      settleInsurance(currentClaim.id, paidVal, discountVal);
    }
  };

  const updateStats = (claimsList) => {
    const list = claimsList || filteredClaims;
    // Calculate outstanding from insuranceAmount - insurancePaidAmount
    const totalOutstanding = list
      .filter(c => !c.insurancePaid)
      .reduce((sum, c) => {
        const outstanding = c.insuranceAmount - c.insurancePaidAmount;
        return sum + outstanding;
      }, 0);
    
    setStats({
      total: list.length,
      outstanding: totalOutstanding,
    });
  };

  const exportToCSV = () => {
    if (filteredClaims.length === 0) {
      alert('No claims to export');
      return;
    }
    
    // Create CSV content
    let csv = 'ID,Patient,Doctor,Provider,Insurance Amount,Paid Amount,Outstanding,Status,Date\n';
    
    filteredClaims.forEach(claim => {
      const row = [
        claim.id,
        `"${claim.patientName || ''}"`,
        `"${claim.doctorName || ''}"`,
        `"${claim.insuranceProvider || ''}"`,
        claim.insuranceAmount.toFixed(2),
        claim.insurancePaidAmount.toFixed(2),
        claim.insuranceOutstanding.toFixed(2),
        claim.insurancePaid ? 'Paid' : 'Unpaid',
        claim.paidAt || '',
      ];
      csv += row.join(',') + '\n';
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claims_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('Export completed successfully');
  };

  // ---------- Effects ----------
  useEffect(() => {
    if (isInitialLoad) {
      loadUnpaidClaims();
      loadFolders();
    }
  }, [isInitialLoad, loadUnpaidClaims, loadFolders]);

  // Validate settle amounts on input change
  useEffect(() => {
    if (showSettleModal) {
      validateSettleAmounts();
    }
  }, [settlePaidAmount, settleDiscountAmount, showSettleModal, validateSettleAmounts]);

  // ---------- Render Helpers ----------
  const getSelectedCount = () => {
    return filteredClaims.filter(c => c.selected).length;
  };

  const renderStats = () => {
    return (
      <div className="claims-stats-section">
        <div className="stat-item">
          {t.claimsCount}: {stats.total}
        </div>
        <div className="stat-item" style={{ color: '#e53e3e' }}>
          {t.column.outstanding}: {formatCurrency(stats.outstanding)}
        </div>
      </div>
    );
  };

  const renderFilterSection = () => {
    return (
      <div className="claims-filter-section">
        <select value={filterType} onChange={handleFilterChange}>
          <option value="all">{t.allClaims}</option>
          <option value="unpaid">{t.unpaidClaims}</option>
        </select>
        
        <select value={selectedFolder?.id || ''} onChange={handleFolderSelect}>
          <option value="">{t.selectFolder}</option>
          {folders.map(folder => (
            <option key={folder.id} value={folder.id}>{folder.name}</option>
          ))}
        </select>
        
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          placeholder={t.from}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          placeholder={t.to}
        />
        <button
          onClick={loadClaimsByDateRange}
          style={{
            background: '#4a90d9',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 20px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          📅 {t.search}
        </button>
        
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={t.search.claims}
          style={{
            flex: 1,
            minWidth: '150px',
            borderRadius: '20px',
            padding: '8px 15px',
            border: '1px solid #e2e8f0',
          }}
        />
        
        <button
          onClick={() => {
            setClaims([]);
            setFilteredClaims([]);
            setSelectedFolder(null);
            loadUnpaidClaims();
          }}
          style={{
            background: '#2d3748',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 20px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          🔄 {t.refresh}
        </button>
        
        <button
          onClick={() => setShowCreateFolderModal(true)}
          style={{
            background: '#38a169',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 20px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          📁 {t.createFolder}
        </button>
        
        <button
          onClick={() => {
            loadFolders();
            setShowFolderModal(true);
          }}
          style={{
            background: '#6b46c1',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 20px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          📂 {t.folders}
        </button>
      </div>
    );
  };

  const renderSelectionBar = () => {
    const selectedCount = getSelectedCount();
    if (selectedCount === 0) return null;
    
    return (
      <div className="claims-selection-bar">
        <span className="selected-count">
          {selectedCount} {t.selected}
        </span>
        <button
          onClick={handleAddToFolder}
          style={{ background: '#38a169', color: 'white' }}
        >
          📂 {t.addToFolder}
        </button>
        {selectedFolder && (
          <button
            onClick={handleRemoveFromFolder}
            style={{ background: '#e53e3e', color: 'white' }}
          >
            🗑️ {t.removeSelected}
          </button>
        )}
        <div style={{ flex: 1 }}></div>
        <button
          onClick={() => {
            setFilteredClaims(prev => prev.map(c => ({ ...c, selected: false })));
            setClaims(prev => prev.map(c => ({ ...c, selected: false })));
          }}
          style={{ background: 'transparent', color: '#a0aec0' }}
        >
          ✕
        </button>
      </div>
    );
  };

//   const renderTable = () => {
//     if (loading && isInitialLoad) {
//       return <div className="claims-loading">⏳ Loading...</div>;
//     }
    
//     if (filteredClaims.length === 0) {
//       return <div className="claims-empty">📭 No claims found</div>;
//     }
    
//     return (
//       <div className="claims-table-wrapper">
//         <table className="claims-table">
//           <thead>
//             <tr>
//               <th style={{ width: '40px', textAlign: 'center' }}>
//                 <input
//                   type="checkbox"
//                   checked={filteredClaims.every(c => c.selected)}
//                   onChange={handleSelectAll}
//                 />
//               </th>
//               <th>{t.column.id}</th>
//               <th>{t.column.patient}</th>
//               <th>{t.column.doctor}</th>
//               <th>{t.column.provider}</th>
//               <th>{t.column.insurance}</th>
//               <th>{t.column.paid}</th>
//               <th>{t.column.outstanding}</th>
//               <th>{t.column.paidStatus}</th>
//               <th>{t.column.paidAt}</th>
//               <th>{t.column.action}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredClaims.map(claim => (
//               <tr key={claim.id}>
//                 <td style={{ textAlign: 'center' }}>
//                   <input
//                     type="checkbox"
//                     checked={claim.selected}
//                     onChange={() => handleSelectOne(claim.id)}
//                   />
//                 </td>
//                 <td>{claim.id}</td>
//                 <td style={{ fontWeight: 'bold' }}>{claim.patientName}</td>
//                 <td>{claim.doctorName}</td>
//                 <td>{claim.insuranceProvider}</td>
//                 <td className="amount-positive">{formatCurrency(claim.insuranceAmount)}</td>
//                 <td style={{ color: '#38a169' }}>{formatCurrency(claim.insurancePaidAmount)}</td>
//                 <td className={claim.insuranceOutstanding > 0 ? 'amount-negative' : 'amount-positive'}>
//                   {formatCurrency(claim.insuranceOutstanding)}
//                 </td>
//                 <td>
//                   <span className={claim.insurancePaid ? 'status-paid' : 'status-pending'}>
//                     {claim.insurancePaid ? `✓ ${t.paid}` : `⏳ ${t.pending}`}
//                   </span>
//                 </td>
//                 <td>{formatDate(claim.paidAt)}</td>
//                 <td>
//                   {claim.paymentMethod === 'INSURANCE' && !claim.insurancePaid && (
//                     <button
//                       className="settle-btn"
//                       onClick={() => handleSettleClick(claim)}
//                     >
//                       {t.settle}
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };
const renderTable = () => {
  if (loading && isInitialLoad) {
    return <div className="claims-loading">⏳ Loading...</div>;
  }
  
  if (filteredClaims.length === 0) {
    return <div className="claims-empty">📭 No claims found</div>;
  }
  
  return (
    <div className="claims-table-wrapper">
      <table className="claims-table">
        <thead>
          <tr>
            <th style={{ width: '40px', textAlign: 'center' }}>
              <input
                type="checkbox"
                checked={filteredClaims.every(c => c.selected)}
                onChange={handleSelectAll}
              />
            </th>
            <th>{t.column.id}</th>
            <th>{t.column.patient}</th>
            <th>{t.column.doctor}</th>
            <th>{t.column.provider}</th>
            <th>{t.column.insurance}</th>
            <th>{t.column.paid}</th>
            <th>Discount</th>  {/* 👈 NEW COLUMN */}
            <th>{t.column.outstanding}</th>
            <th>{t.column.paidStatus}</th>
            <th>{t.column.paidAt}</th>
            <th>{t.column.action}</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map(claim => (
            <tr key={claim.id}>
              <td style={{ textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={claim.selected}
                  onChange={() => handleSelectOne(claim.id)}
                />
              </td>
              <td>{claim.id}</td>
              <td style={{ fontWeight: 'bold' }}>{claim.patientName}</td>
              <td>{claim.doctorName}</td>
              <td>{claim.insuranceProvider}</td>
              <td className="amount-positive">{formatCurrency(claim.insuranceAmount)}</td>
              <td style={{ color: '#38a169' }}>{formatCurrency(claim.insurancePaidAmount)}</td>
              <td style={{ color: '#805ad5' }}>  {/* 👈 Discount column with purple color */}
                {formatCurrency(claim.insuranceDiscount)}
              </td>
              <td className={claim.insuranceOutstanding > 0 ? 'amount-negative' : 'amount-positive'}>
                {formatCurrency(claim.insuranceOutstanding)}
              </td>
              <td>
                <span className={claim.insurancePaid ? 'status-paid' : 'status-pending'}>
                  {claim.insurancePaid ? `✓ ${t.paid}` : `⏳ ${t.pending}`}
                </span>
              </td>
              <td>{formatDate(claim.paidAt)}</td>
              <td>
                {claim.paymentMethod === 'INSURANCE' && !claim.insurancePaid && (
                  <button
                    className="settle-btn"
                    onClick={() => handleSettleClick(claim)}
                  >
                    {t.settle}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


  const renderSettleModal = () => {
    if (!showSettleModal || !currentClaim) return null;
    
    return (
      <div className="claims-modal-overlay">
        <div className="claims-modal">
          <h3>💰 {t.settleInsuranceTitle}</h3>
          <p style={{ color: '#4a5568', marginBottom: '15px' }}>
            {t.settleInsuranceHeader}
          </p>
          
          <div className="form-group">
            <label>{t.insuranceAmount}:</label>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#2d3748' }}>
              {formatCurrency(currentClaim.insuranceAmount)}
            </div>
          </div>
          
          <div className="form-group">
            <label>{t.outstanding}:</label>
            <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#e53e3e' }}>
              {formatCurrency(currentClaim.insuranceOutstanding)}
            </div>
          </div>
          
          <div className="form-group">
            <label>{t.paidAmount}:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={settlePaidAmount}
              onChange={(e) => setSettlePaidAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
          
          <div className="form-group">
            <label>{t.discountAmount}:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={settleDiscountAmount}
              onChange={(e) => setSettleDiscountAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
          
          <div className="form-group">
            <label>{t.totalAmount}:</label>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
              {settleTotalDisplay}
            </div>
          </div>
          
          {settleValidationMsg && (
            <div className={`validation-msg ${settleValidationType}`}>
              {settleValidationMsg}
            </div>
          )}
          
          <div className="modal-actions">
            <button
              className="btn-secondary"
              onClick={() => setShowSettleModal(false)}
            >
              {t.close}
            </button>
            <button
              className="btn-primary"
              onClick={handleSettleConfirm}
              disabled={settleValidationType !== 'success'}
            >
              {t.settle}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderFolderModal = () => {
    if (!showFolderModal) return null;
    
    // Get selected claim IDs
    const selectedClaimIds = filteredClaims.filter(c => c.selected).map(c => c.id);
    
    const handleAddToSelectedFolder = () => {
      if (!selectedFolderId) {
        alert(t.noFolderSelected);
        return;
      }
      addClaimsToFolder(selectedFolderId, selectedClaimIds);
      setShowFolderModal(false);
    };

    return (
      <div className="claims-modal-overlay">
        <div className="claims-modal claims-folder-modal">
          <h3>📂 {t.folders}</h3>
          
          <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                loadFolders();
                setShowFolderModal(true);
              }}
              style={{
                background: '#4a90d9',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                padding: '6px 15px',
                cursor: 'pointer',
              }}
            >
              🔄 {t.refresh}
            </button>
          </div>
          
          <p style={{ marginBottom: '10px', color: '#4a5568' }}>
            {t.selectFolderHeader} ({selectedClaimIds.length} {t.selected})
          </p>
          
          <div className="claims-table-wrapper">
            <table className="folder-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>Select</th>
                  <th>{t.column.id}</th>
                  <th>{t.column.name}</th>
                  <th>{t.column.description}</th>
                  <th>{t.column.action}</th>
                </tr>
              </thead>
              <tbody>
                {folders.map(folder => (
                  <tr key={folder.id} style={{ 
                    background: selectedFolderId === folder.id ? '#ebf8ff' : 'white',
                    cursor: 'pointer'
                  }}>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="radio"
                        name="folderSelect"
                        checked={selectedFolderId === folder.id}
                        onChange={() => setSelectedFolderId(folder.id)}
                      />
                    </td>
                    <td>{folder.id}</td>
                    <td style={{ fontWeight: 'bold' }}>{folder.name}</td>
                    <td>{folder.description}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`${t.deleteFolderContent} '${folder.name}'?`)) {
                            deleteFolder(folder.id);
                          }
                        }}
                      >
                        🗑️ {t.delete}
                      </button>
                    </td>
                  </tr>
                ))}
                {folders.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#a0aec0' }}>
                      No folders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="modal-actions" style={{ marginTop: '20px' }}>
            <button
              className="btn-secondary"
              onClick={() => setShowFolderModal(false)}
            >
              {t.close}
            </button>
            <button
              className="btn-primary"
              onClick={handleAddToSelectedFolder}
              disabled={!selectedFolderId}
            >
              📂 {t.addToFolder}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCreateFolderModal = () => {
    if (!showCreateFolderModal) return null;
    
    return (
      <div className="claims-modal-overlay">
        <div className="claims-modal">
          <h3>📁 {t.createFolderTitle}</h3>
          <p style={{ color: '#4a5568', marginBottom: '15px' }}>
            {t.createFolderHeader}
          </p>
          
          <div className="form-group">
            <label>{t.folderName}</label>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder={t.folderName}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && folderName.trim()) {
                  createFolder(folderName.trim());
                }
              }}
            />
          </div>
          
          <div className="modal-actions">
            <button
              className="btn-secondary"
              onClick={() => setShowCreateFolderModal(false)}
            >
              {t.close}
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                if (folderName.trim()) {
                  createFolder(folderName.trim());
                }
              }}
              disabled={!folderName.trim()}
            >
              {t.createFolder}
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
      <div className="claims-container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2 style={{ margin: 0 }}>📑 {t.title}</h2>
          <button
            onClick={onClose}
            style={{
              background: '#e2e8f0',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            ✕ {t.close}
          </button>
        </div>

        {/* Filter Section */}
        <div className="claims-topbar">
          {renderFilterSection()}
          {renderStats()}
        </div>

        {/* Selection Bar */}
        {renderSelectionBar()}

        {/* Table */}
        <div className="claims-table-container">
          <div className="claims-table-header">
            <span className="title">📋 {t.claimsList}</span>
            <div className="actions">
              <button
                onClick={exportToCSV}
                style={{ background: '#38a169', color: 'white' }}
              >
                📊 {t.export}
              </button>
              <button
                onClick={loadAllClaims}
                style={{ background: '#4a90d9', color: 'white' }}
              >
                👁️ {t.viewAll}
              </button>
            </div>
          </div>
          {renderTable()}
        </div>

        {/* Bottom Bar */}
        <div className="claims-bottom-bar">
          <span className="status-online">● {t.online}</span>
          <span>v2.0</span>
          <span style={{ flex: 1 }}></span>
          <span>{t.recordsLoaded}: {filteredClaims.length}</span>
        </div>

        {/* Modals */}
        {renderSettleModal()}
        {renderFolderModal()}
        {renderCreateFolderModal()}
      </div>
    </>
  );
};

export default ClaimsTrackingScreen;