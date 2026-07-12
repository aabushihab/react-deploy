// // import React, { useState, useEffect, useCallback } from 'react';
// // import { BASE_URL } from '../../utils/api';

// // // ---------- Styles ----------
// // const styles = `
// //   .doctor-container {
// //     padding: 20px;
// //     background: #f0f4f8;
// //     min-height: 100vh;
// //     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
// //   }
// //   .doctor-header {
// //     margin-bottom: 20px;
// //   }
// //   .doctor-header h2 {
// //     font-size: 28px;
// //     font-weight: bold;
// //     color: #1a202c;
// //     margin: 0 0 5px 0;
// //   }
// //   .doctor-header .underline {
// //     height: 3px;
// //     width: 60px;
// //     background: linear-gradient(to right, #4299e1, #2b6cb0);
// //     border-radius: 2px;
// //   }
// //   .doctor-stats {
// //     display: flex;
// //     gap: 15px;
// //     margin-bottom: 15px;
// //     flex-wrap: wrap;
// //   }
// //   .doctor-stat-card {
// //     background: white;
// //     padding: 15px 20px;
// //     border-radius: 12px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border-left: 4px solid #4299e1;
// //     min-width: 150px;
// //     flex: 1;
// //     max-width: 200px;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //   }
// //   .doctor-stat-card:hover {
// //     transform: scale(1.02);
// //     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
// //   }
// //   .doctor-stat-card .icon { font-size: 24px; }
// //   .doctor-stat-card .value { font-size: 24px; font-weight: bold; color: #4299e1; }
// //   .doctor-stat-card .label { font-size: 12px; color: #718096; }
// //   .doctor-search-tools {
// //     display: flex;
// //     gap: 10px;
// //     flex-wrap: wrap;
// //     align-items: center;
// //     margin-bottom: 15px;
// //   }
// //   .doctor-search-box {
// //     display: flex;
// //     align-items: center;
// //     background: white;
// //     border-radius: 25px;
// //     border: 1px solid #e2e8f0;
// //     padding: 5px 15px;
// //     flex: 1;
// //     min-width: 200px;
// //   }
// //   .doctor-search-box input {
// //     border: none;
// //     outline: none;
// //     padding: 8px 5px;
// //     font-size: 14px;
// //     flex: 1;
// //     background: transparent;
// //   }
// //   .doctor-search-box .search-icon {
// //     font-size: 14px;
// //     color: #a0aec0;
// //   }
// //   .doctor-view-toggle {
// //     display: flex;
// //     gap: 5px;
// //   }
// //   .doctor-view-toggle button {
// //     padding: 6px 15px;
// //     border: 1px solid #e2e8f0;
// //     border-radius: 8px;
// //     background: white;
// //     font-weight: bold;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //     font-size: 13px;
// //   }
// //   .doctor-view-toggle button.active {
// //     background: #4299e1;
// //     color: white;
// //     border-color: #4299e1;
// //   }
// //   .doctor-view-toggle button:hover:not(.active) {
// //     background: #f7fafc;
// //   }
// //   .doctor-content {
// //     background: white;
// //     border-radius: 12px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     overflow: hidden;
// //     min-height: 400px;
// //     position: relative;
// //   }
// //   .doctor-table-wrapper {
// //     overflow-x: auto;
// //   }
// //   .doctor-table {
// //     width: 100%;
// //     border-collapse: collapse;
// //     font-size: 13px;
// //   }
// //   .doctor-table th {
// //     padding: 12px 15px;
// //     text-align: left;
// //     background: #f8f9fa;
// //     font-weight: bold;
// //     color: #2d3748;
// //     border-bottom: 2px solid #e2e8f0;
// //   }
// //   .doctor-table td {
// //     padding: 10px 15px;
// //     border-bottom: 1px solid #edf2f7;
// //   }
// //   .doctor-table tr:hover td {
// //     background: #f7fafc;
// //   }
// //   .doctor-table tr.selected td {
// //     background: #ebf8ff;
// //   }
// //   .doctor-table .password-mask {
// //     color: #718096;
// //     font-family: monospace;
// //   }
// //   .doctor-card-grid {
// //     display: grid;
// //     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
// //     gap: 15px;
// //     padding: 15px;
// //   }
// //   .doctor-card {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 15px;
// //     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
// //     border: 1px solid #edf2f7;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //   }
// //   .doctor-card:hover {
// //     transform: translateY(-3px);
// //     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
// //   }
// //   .doctor-card.selected {
// //     background: #fc8181;
// //     border-color: #e53e3e;
// //     color: white;
// //   }
// //   .doctor-card.selected .card-text {
// //     color: white !important;
// //   }
// //   .doctor-card .card-header {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;
// //     margin-bottom: 8px;
// //   }
// //   .doctor-card .card-id {
// //     background: #4299e1;
// //     color: white;
// //     padding: 2px 12px;
// //     border-radius: 12px;
// //     font-size: 12px;
// //     font-weight: bold;
// //   }
// //   .doctor-card .card-name {
// //     font-size: 16px;
// //     font-weight: bold;
// //     color: #2d3748;
// //   }
// //   .doctor-card .card-specialty {
// //     font-size: 13px;
// //     color: #4a5568;
// //   }
// //   .doctor-card .card-details {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 4px;
// //     margin-top: 8px;
// //     font-size: 13px;
// //     color: #4a5568;
// //   }
// //   .doctor-card .card-actions {
// //     margin-top: 10px;
// //     display: flex;
// //     gap: 5px;
// //   }
// //   .doctor-card .card-actions button {
// //     padding: 4px 12px;
// //     border: none;
// //     border-radius: 6px;
// //     font-size: 12px;
// //     font-weight: bold;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //   }
// //   .doctor-card .card-actions button:hover {
// //     transform: scale(1.05);
// //   }
// //   .doctor-buttons {
// //     display: flex;
// //     gap: 10px;
// //     flex-wrap: wrap;
// //     justify-content: center;
// //     padding: 15px 0;
// //   }
// //   .doctor-buttons button {
// //     padding: 8px 20px;
// //     border: none;
// //     border-radius: 8px;
// //     font-weight: bold;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //     font-size: 13px;
// //     min-width: 140px;
// //   }
// //   .doctor-buttons button:hover:not(:disabled) {
// //     transform: scale(1.05);
// //   }
// //   .doctor-buttons button:disabled {
// //     opacity: 0.5;
// //     cursor: not-allowed;
// //   }
// //   .doctor-status-bar {
// //     display: flex;
// //     justify-content: space-between;
// //     align-items: center;
// //     padding: 8px 15px;
// //     background: #f7fafc;
// //     border-top: 1px solid #e2e8f0;
// //     font-size: 13px;
// //     color: #4a5568;
// //   }
// //   .doctor-status-bar .status-msg {
// //     display: flex;
// //     align-items: center;
// //     gap: 8px;
// //   }
// //   .doctor-loading {
// //     position: absolute;
// //     top: 50%;
// //     left: 50%;
// //     transform: translate(-50%, -50%);
// //     font-size: 18px;
// //     color: #a0aec0;
// //   }
// //   .doctor-empty {
// //     text-align: center;
// //     padding: 40px;
// //     color: #a0aec0;
// //   }
// //   .doctor-modal-overlay {
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
// //   .doctor-modal {
// //     background: white;
// //     border-radius: 12px;
// //     padding: 25px;
// //     max-width: 500px;
// //     width: 95%;
// //     max-height: 90vh;
// //     overflow-y: auto;
// //     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
// //   }
// //   .doctor-modal h3 {
// //     margin: 0 0 15px 0;
// //     color: #2d3748;
// //   }
// //   .doctor-modal .form-group {
// //     margin-bottom: 15px;
// //   }
// //   .doctor-modal .form-group label {
// //     display: block;
// //     font-weight: bold;
// //     margin-bottom: 5px;
// //     color: #2d3748;
// //   }
// //   .doctor-modal .form-group input {
// //     width: 100%;
// //     padding: 10px 15px;
// //     border-radius: 8px;
// //     border: 1px solid #e2e8f0;
// //     font-size: 14px;
// //     background: white;
// //     transition: border-color 0.2s;
// //   }
// //   .doctor-modal .form-group input:focus {
// //     outline: none;
// //     border-color: #4299e1;
// //   }
// //   .doctor-modal .modal-actions {
// //     display: flex;
// //     gap: 10px;
// //     justify-content: flex-end;
// //     margin-top: 20px;
// //   }
// //   .doctor-modal .modal-actions button {
// //     padding: 8px 30px;
// //     border: none;
// //     border-radius: 8px;
// //     font-weight: bold;
// //     cursor: pointer;
// //     transition: all 0.2s;
// //   }
// //   .doctor-modal .modal-actions button:hover {
// //     transform: scale(1.05);
// //   }
// //   .doctor-modal .modal-actions .btn-primary {
// //     background: #48bb78;
// //     color: white;
// //   }
// //   .doctor-modal .modal-actions .btn-primary:disabled {
// //     background: #a0aec0;
// //     cursor: not-allowed;
// //   }
// //   .doctor-modal .modal-actions .btn-secondary {
// //     background: #e2e8f0;
// //     color: #4a5568;
// //   }
// //   .doctor-appointments-modal {
// //     max-width: 800px;
// //   }
// //   .doctor-appointments-modal .appt-table {
// //     width: 100%;
// //     border-collapse: collapse;
// //     font-size: 13px;
// //   }
// //   .doctor-appointments-modal .appt-table th {
// //     padding: 10px;
// //     text-align: left;
// //     background: #f8f9fa;
// //     border-bottom: 2px solid #e2e8f0;
// //   }
// //   .doctor-appointments-modal .appt-table td {
// //     padding: 8px 10px;
// //     border-bottom: 1px solid #edf2f7;
// //   }
// //   .doctor-appointments-modal .appt-table tr:hover td {
// //     background: #f7fafc;
// //   }
// //   .doctor-appointments-modal .appt-actions {
// //     display: flex;
// //     gap: 10px;
// //     justify-content: center;
// //     margin-top: 15px;
// //   }
// //   .doctor-reassign-modal {
// //     max-width: 450px;
// //   }
// //   .doctor-reassign-modal select {
// //     width: 100%;
// //     padding: 10px 15px;
// //     border-radius: 8px;
// //     border: 1px solid #e2e8f0;
// //     font-size: 14px;
// //     background: white;
// //   }
// //   .doctor-reassign-modal select:focus {
// //     outline: none;
// //     border-color: #4299e1;
// //   }
// //   .doctor-change-password-modal {
// //     max-width: 450px;
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

// // // ---------- Data Classes ----------
// // class DoctorRow {
// //   constructor(data = {}) {
// //     this.id = data.id || 0;
// //     this.firstName = data.firstName || '';
// //     this.middleName = data.middleName || '';
// //     this.lastName = data.lastName || '';
// //     this.specialty = data.specialty || '';
// //     this.email = data.email || '';
// //     this.phone = data.phone || '';
// //     this.username = data.username || '';
// //     this.password = data.password || '';
// //     this.fullName = `${this.firstName} ${this.middleName} ${this.lastName}`.trim();
// //   }

// //   static fromJson(json) {
// //     return new DoctorRow({
// //       id: json.id || 0,
// //       firstName: json.firstName || '',
// //       middleName: json.middleName || '',
// //       lastName: json.lastName || '',
// //       specialty: json.specialty || '',
// //       email: json.email || '',
// //       phone: json.phone || '',
// //       username: json.username || '',
// //       password: json.password || '',
// //     });
// //   }
// // }

// // class AppointmentRow {
// //   constructor(data = {}) {
// //     this.id = data.id || 0;
// //     this.patientName = data.patientName || '';
// //     this.appointmentTime = data.appointmentTime || '';
// //     this.notes = data.notes || '';
// //   }

// //   static fromJson(json) {
// //     return new AppointmentRow({
// //       id: json.id || 0,
// //       patientName: json.patientName || json.patient?.fullName || '',
// //       appointmentTime: json.appointmentTime || '',
// //       notes: json.notes || '',
// //     });
// //   }
// // }

// // // ---------- Main Component ----------
// // const DoctorManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
// //   // ---------- Translations ----------
// //   const t = React.useMemo(() => {
// //     const translations = {
// //       en: {
// //         title: 'Doctor Management',
// //         stat: { total: 'Total Doctors' },
// //         search: { placeholder: 'Search doctors...' },
// //         btn: {
// //           table: 'Table',
// //           cards: 'Cards',
// //           refresh: 'Refresh',
// //           add: 'Add Doctor',
// //           update: 'Update',
// //           delete: 'Delete',
// //           viewAppointments: 'View Appointments',
// //           changePassword: 'Change Password',
// //           save: 'Save',
// //           yes: 'Yes',
// //           no: 'No',
// //           assign: 'Assign',
// //           deleteAppointment: 'Delete Appointment',
// //           reassignAppointment: 'Reassign',
// //           close: 'Close',
// //         },
// //         col: {
// //           id: 'ID',
// //           firstName: 'First Name',
// //           middleName: 'Middle Name',
// //           lastName: 'Last Name',
// //           specialty: 'Specialty',
// //           email: 'Email',
// //           phone: 'Phone',
// //           username: 'Username',
// //           password: 'Password',
// //           patient: 'Patient',
// //           time: 'Time',
// //           notes: 'Notes',
// //         },
// //         label: {
// //           firstName: 'First Name',
// //           middleName: 'Middle Name',
// //           lastName: 'Last Name',
// //           specialty: 'Specialty',
// //           email: 'Email',
// //           phone: 'Phone',
// //           username: 'Username',
// //           password: 'Password',
// //           oldPassword: 'Old Password',
// //           newPassword: 'New Password',
// //           confirmPassword: 'Confirm Password',
// //           newDoctor: 'New Doctor',
// //           noDoctors: 'No doctors found',
// //           showing: 'Showing',
// //           records: 'records',
// //         },
// //         titleAddDoctor: 'Add Doctor',
// //         titleUpdateDoctor: 'Update Doctor',
// //         titleChangePassword: 'Change Password',
// //         titleDoctorAppointments: 'Appointments',
// //         titleReassign: 'Reassign Appointment',
// //         alert: {
// //           selectDoctor: 'Please select a doctor first',
// //           selectAppointment: 'Please select an appointment first',
// //           fillAllFields: 'Please fill all required fields',
// //           invalidFirstName: 'First name must be at least 3 letters',
// //           invalidLastName: 'Last name must be at least 3 letters',
// //           invalidPassword: 'Password must be at least 6 characters',
// //           invalidEmail: 'Please enter a valid email',
// //           invalidPhone: 'Phone must be 7-15 digits',
// //           saved: 'Doctor saved successfully',
// //           deleted: 'Doctor deleted successfully',
// //           errorSaveDoctor: 'Error saving doctor',
// //           errorDeleteDoctor: 'Error deleting doctor',
// //           errorLoadDoctors: 'Error loading doctors',
// //           passwordChanged: 'Password changed successfully',
// //           errorChangePassword: 'Error changing password',
// //           passwordMismatch: 'Passwords do not match',
// //           appointmentDeleted: 'Appointment deleted successfully',
// //           errorDeleteAppointment: 'Error deleting appointment',
// //           appointmentReassigned: 'Appointment reassigned successfully',
// //           errorReassignAppointment: 'Error reassigning appointment',
// //           errorFetchAppointments: 'Error fetching appointments',
// //           errorFetchDoctors: 'Error fetching doctors',
// //         },
// //         confirm: {
// //           delete: { title: 'Confirm Delete', content: 'Are you sure you want to delete this doctor?' },
// //         },
// //         status: {
// //           ready: 'Ready',
// //           refreshing: 'Refreshing...',
// //           selected: 'Selected',
// //           added: 'Added successfully',
// //           updated: 'Updated successfully',
// //           deleted: 'Deleted successfully',
// //           passwordChanged: 'Password changed successfully',
// //           reassigned: 'Reassigned successfully',
// //         },
// //         prompt: { selectDoctor: 'Select a doctor' },
// //         msg: {
// //           confirmClose: 'Are you sure you want to close this screen?',
// //         },
// //       },
// //       ar: {
// //         title: 'إدارة الأطباء',
// //         stat: { total: 'إجمالي الأطباء' },
// //         search: { placeholder: 'بحث عن الأطباء...' },
// //         btn: {
// //           table: 'جدول',
// //           cards: 'بطاقات',
// //           refresh: 'تحديث',
// //           add: 'إضافة طبيب',
// //           update: 'تعديل',
// //           delete: 'حذف',
// //           viewAppointments: 'عرض المواعيد',
// //           changePassword: 'تغيير كلمة المرور',
// //           save: 'حفظ',
// //           yes: 'نعم',
// //           no: 'لا',
// //           assign: 'تعيين',
// //           deleteAppointment: 'حذف الموعد',
// //           reassignAppointment: 'إعادة تعيين',
// //           close: 'إغلاق',
// //         },
// //         col: {
// //           id: 'الرقم',
// //           firstName: 'الاسم الأول',
// //           middleName: 'الاسم الأوسط',
// //           lastName: 'الاسم الأخير',
// //           specialty: 'التخصص',
// //           email: 'البريد الإلكتروني',
// //           phone: 'الهاتف',
// //           username: 'اسم المستخدم',
// //           password: 'كلمة المرور',
// //           patient: 'المريض',
// //           time: 'الوقت',
// //           notes: 'ملاحظات',
// //         },
// //         label: {
// //           firstName: 'الاسم الأول',
// //           middleName: 'الاسم الأوسط',
// //           lastName: 'الاسم الأخير',
// //           specialty: 'التخصص',
// //           email: 'البريد الإلكتروني',
// //           phone: 'الهاتف',
// //           username: 'اسم المستخدم',
// //           password: 'كلمة المرور',
// //           oldPassword: 'كلمة المرور القديمة',
// //           newPassword: 'كلمة المرور الجديدة',
// //           confirmPassword: 'تأكيد كلمة المرور',
// //           newDoctor: 'طبيب جديد',
// //           noDoctors: 'لا يوجد أطباء',
// //           showing: 'عرض',
// //           records: 'سجلات',
// //         },
// //         titleAddDoctor: 'إضافة طبيب',
// //         titleUpdateDoctor: 'تعديل طبيب',
// //         titleChangePassword: 'تغيير كلمة المرور',
// //         titleDoctorAppointments: 'المواعيد',
// //         titleReassign: 'إعادة تعيين الموعد',
// //         alert: {
// //           selectDoctor: 'يرجى اختيار طبيب أولاً',
// //           selectAppointment: 'يرجى اختيار موعد أولاً',
// //           fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',
// //           invalidFirstName: 'الاسم الأول يجب أن يكون 3 أحرف على الأقل',
// //           invalidLastName: 'الاسم الأخير يجب أن يكون 3 أحرف على الأقل',
// //           invalidPassword: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
// //           invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
// //           invalidPhone: 'الهاتف يجب أن يكون 7-15 رقم',
// //           saved: 'تم حفظ الطبيب بنجاح',
// //           deleted: 'تم حذف الطبيب بنجاح',
// //           errorSaveDoctor: 'خطأ في حفظ الطبيب',
// //           errorDeleteDoctor: 'خطأ في حذف الطبيب',
// //           errorLoadDoctors: 'خطأ في تحميل الأطباء',
// //           passwordChanged: 'تم تغيير كلمة المرور بنجاح',
// //           errorChangePassword: 'خطأ في تغيير كلمة المرور',
// //           passwordMismatch: 'كلمات المرور غير متطابقة',
// //           appointmentDeleted: 'تم حذف الموعد بنجاح',
// //           errorDeleteAppointment: 'خطأ في حذف الموعد',
// //           appointmentReassigned: 'تم إعادة تعيين الموعد بنجاح',
// //           errorReassignAppointment: 'خطأ في إعادة تعيين الموعد',
// //           errorFetchAppointments: 'خطأ في جلب المواعيد',
// //           errorFetchDoctors: 'خطأ في جلب الأطباء',
// //         },
// //         confirm: {
// //           delete: { title: 'تأكيد الحذف', content: 'هل أنت متأكد من حذف هذا الطبيب؟' },
// //         },
// //         status: {
// //           ready: 'جاهز',
// //           refreshing: 'جاري التحديث...',
// //           selected: 'تم الاختيار',
// //           added: 'تمت الإضافة بنجاح',
// //           updated: 'تم التعديل بنجاح',
// //           deleted: 'تم الحذف بنجاح',
// //           passwordChanged: 'تم تغيير كلمة المرور بنجاح',
// //           reassigned: 'تم إعادة التعيين بنجاح',
// //         },
// //         prompt: { selectDoctor: 'اختر طبيباً' },
// //         msg: {
// //           confirmClose: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
// //         },
// //       },
// //     };
// //     return translations[lang] || translations.en;
// //   }, [lang]);

// //   // ---------- State ----------
// //   const [doctors, setDoctors] = useState([]);
// //   const [filteredDoctors, setFilteredDoctors] = useState([]);
// //   const [selectedDoctor, setSelectedDoctor] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [viewMode, setViewMode] = useState('table');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
// //   const [stats, setStats] = useState({ total: 0 });
  
// //   // Modal states
// //   const [showDoctorForm, setShowDoctorForm] = useState(false);
// //   const [showChangePassword, setShowChangePassword] = useState(false);
// //   const [showAppointments, setShowAppointments] = useState(false);
// //   const [showReassign, setShowReassign] = useState(false);
// //   const [editingDoctor, setEditingDoctor] = useState(null);
// //   const [selectedAppointment, setSelectedAppointment] = useState(null);
// //   const [appointments, setAppointments] = useState([]);
  
// //   // Form states
// //   const [formData, setFormData] = useState({
// //     firstName: '',
// //     middleName: '',
// //     lastName: '',
// //     specialty: '',
// //     email: '',
// //     phone: '',
// //     username: '',
// //     password: '',
// //   });
  
// //   const [passwordData, setPasswordData] = useState({
// //     oldPassword: '',
// //     newPassword: '',
// //     confirmPassword: '',
// //   });
  
// //   const [reassignDoctorId, setReassignDoctorId] = useState('');

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
// //   const loadDoctors = useCallback(async () => {
// //     setLoading(true);
// //     setStatusMsg(`⏳ ${t.status.refreshing}`);

// //     try {
// //       const res = await fetch(`${BASE_URL}/api/doctors`);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       const data = await res.json();
// //       const doctorsData = Array.isArray(data) ? data : [data];
      
// //       const parsedDoctors = doctorsData.map(item => DoctorRow.fromJson(item));
      
// //       setDoctors(parsedDoctors);
// //       setFilteredDoctors(parsedDoctors);
// //       setStats({ total: parsedDoctors.length });
      
// //       setStatusMsg(`✅ ${t.status.ready} (${parsedDoctors.length} ${t.label.records})`);
// //     } catch (err) {
// //       //console.error('🚨 Load error:', err);
// //       setStatusMsg(`❌ ${t.alert.errorLoadDoctors}: ${err.message}`);
// //       setDoctors([]);
// //       setFilteredDoctors([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [t]);

// //   const saveDoctor = useCallback(async (doctorData) => {
// //     try {
// //       const isUpdate = !!editingDoctor;
// //       const url = isUpdate 
// //         ? `${BASE_URL}/api/doctors/${editingDoctor.id}`
// //         : `${BASE_URL}/api/doctors`;
      
// //       const res = await fetch(url, {
// //         method: isUpdate ? 'PUT' : 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(doctorData),
// //       });
      
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       alert(t.alert.saved);
// //       setShowDoctorForm(false);
// //       setEditingDoctor(null);
// //       loadDoctors();
// //       logAction(isUpdate ? 'UPDATE_DOCTOR' : 'ADD_DOCTOR', 
// //         `${isUpdate ? 'Updated' : 'Added'} doctor: ${doctorData.firstName} ${doctorData.lastName}`);
// //       setStatusMsg(`✅ ${isUpdate ? t.status.updated : t.status.added}`);
// //     } catch (err) {
// //       //console.error('🚨 Save error:', err);
// //       alert(`${t.alert.errorSaveDoctor}: ${err.message}`);
// //     }
// //   }, [editingDoctor, loadDoctors, t, logAction]);

// //   const deleteDoctor = useCallback(async (doctorId) => {
// //     if (!window.confirm(t.confirm.delete.content)) return;
    
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/doctors/${doctorId}`, {
// //         method: 'DELETE',
// //       });
      
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       alert(t.alert.deleted);
// //       setSelectedDoctor(null);
// //       loadDoctors();
// //       logAction('DELETE_DOCTOR', `Deleted doctor ID: ${doctorId}`);
// //       setStatusMsg(`🗑️ ${t.status.deleted}`);
// //     } catch (err) {
// //       //console.error('🚨 Delete error:', err);
// //       alert(`${t.alert.errorDeleteDoctor}: ${err.message}`);
// //     }
// //   }, [loadDoctors, t, logAction]);

// //   const changePassword = useCallback(async (username, oldPassword, newPassword) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/doctors/change-password`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ username, oldPassword, newPassword }),
// //       });
      
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       alert(t.alert.passwordChanged);
// //       setShowChangePassword(false);
// //       setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
// //       logAction('CHANGE_PASSWORD', `Changed password for doctor: ${username}`);
// //       setStatusMsg(`✅ ${t.status.passwordChanged}`);
// //     } catch (err) {
// //       //console.error('🚨 Password change error:', err);
// //       alert(`${t.alert.errorChangePassword}: ${err.message}`);
// //     }
// //   }, [t, logAction]);

// //   const loadAppointments = useCallback(async (doctorId) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/appointments/doctor/${doctorId}`);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       const data = await res.json();
// //       const appointmentsData = Array.isArray(data) ? data : [data];
      
// //       const parsedAppointments = appointmentsData.map(item => AppointmentRow.fromJson(item));
// //       setAppointments(parsedAppointments);
// //     } catch (err) {
// //       //console.error('🚨 Load appointments error:', err);
// //       alert(t.alert.errorFetchAppointments);
// //     }
// //   }, [t]);

// //   const deleteAppointment = useCallback(async (appointmentId) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}`, {
// //         method: 'DELETE',
// //       });
      
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       alert(t.alert.appointmentDeleted);
// //       setAppointments(prev => prev.filter(a => a.id !== appointmentId));
// //       setSelectedAppointment(null);
// //       logAction('DELETE_APPOINTMENT', `Deleted appointment ID: ${appointmentId}`);
// //     } catch (err) {
// //       //console.error('🚨 Delete appointment error:', err);
// //       alert(t.alert.errorDeleteAppointment);
// //     }
// //   }, [t, logAction]);

// //   const reassignAppointment = useCallback(async (appointmentId, newDoctorId) => {
// //     try {
// //       const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}/reassign`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ doctorId: newDoctorId }),
// //       });
      
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
// //       alert(t.alert.appointmentReassigned);
// //       setShowReassign(false);
// //       setSelectedAppointment(null);
// //       setReassignDoctorId('');
// //       loadAppointments(selectedDoctor.id);
// //       logAction('REASSIGN_APPOINTMENT', `Reassigned appointment ${appointmentId} to doctor ${newDoctorId}`);
// //       setStatusMsg(`✅ ${t.status.reassigned}`);
// //     } catch (err) {
// //       //console.error('🚨 Reassign error:', err);
// //       alert(t.alert.errorReassignAppointment);
// //     }
// //   }, [selectedDoctor, loadAppointments, t, logAction]);

// //   // ---------- Handlers ----------
// //   const handleSearch = (e) => {
// //     const query = e.target.value.toLowerCase();
// //     setSearchQuery(query);
    
// //     if (query.trim() === '') {
// //       setFilteredDoctors(doctors);
// //       return;
// //     }
    
// //     const filtered = doctors.filter(doctor => {
// //       return (
// //         doctor.firstName.toLowerCase().includes(query) ||
// //         doctor.lastName.toLowerCase().includes(query) ||
// //         doctor.specialty.toLowerCase().includes(query) ||
// //         doctor.email.toLowerCase().includes(query) ||
// //         doctor.username.toLowerCase().includes(query) ||
// //         doctor.fullName.toLowerCase().includes(query)
// //       );
// //     });
    
// //     setFilteredDoctors(filtered);
// //   };

// //   const handleSelectDoctor = (doctor) => {
// //     setSelectedDoctor(doctor);
// //     setStatusMsg(`✅ ${t.status.selected}: ${doctor.fullName}`);
// //   };

// //   const handleAddDoctor = () => {
// //     setEditingDoctor(null);
// //     setFormData({
// //       firstName: '',
// //       middleName: '',
// //       lastName: '',
// //       specialty: '',
// //       email: '',
// //       phone: '',
// //       username: '',
// //       password: '',
// //     });
// //     setShowDoctorForm(true);
// //   };

// //   const handleEditDoctor = () => {
// //     if (!selectedDoctor) {
// //       alert(t.alert.selectDoctor);
// //       return;
// //     }
// //     setEditingDoctor(selectedDoctor);
// //     setFormData({
// //       firstName: selectedDoctor.firstName,
// //       middleName: selectedDoctor.middleName,
// //       lastName: selectedDoctor.lastName,
// //       specialty: selectedDoctor.specialty,
// //       email: selectedDoctor.email,
// //       phone: selectedDoctor.phone,
// //       username: selectedDoctor.username,
// //       password: selectedDoctor.password,
// //     });
// //     setShowDoctorForm(true);
// //   };

// //   const handleDeleteDoctor = () => {
// //     if (!selectedDoctor) {
// //       alert(t.alert.selectDoctor);
// //       return;
// //     }
// //     deleteDoctor(selectedDoctor.id);
// //   };

// //   const handleViewAppointments = () => {
// //     if (!selectedDoctor) {
// //       alert(t.alert.selectDoctor);
// //       return;
// //     }
// //     loadAppointments(selectedDoctor.id);
// //     setShowAppointments(true);
// //   };

// //   const handleChangePassword = () => {
// //     if (!selectedDoctor) {
// //       alert(t.alert.selectDoctor);
// //       return;
// //     }
// //     setPasswordData({
// //       oldPassword: '',
// //       newPassword: '',
// //       confirmPassword: '',
// //     });
// //     setShowChangePassword(true);
// //   };

// //   const handleSaveDoctor = () => {
// //     const { firstName, lastName, specialty, email, phone, username, password } = formData;
    
// //     // Validation
// //     if (!firstName.trim() || !lastName.trim() || !specialty.trim() || 
// //         !email.trim() || !phone.trim() || !username.trim() || !password.trim()) {
// //       alert(t.alert.fillAllFields);
// //       return;
// //     }
    
// //     if (firstName.length < 3) {
// //       alert(t.alert.invalidFirstName);
// //       return;
// //     }
    
// //     if (lastName.length < 3) {
// //       alert(t.alert.invalidLastName);
// //       return;
// //     }
    
// //     if (password.length < 6) {
// //       alert(t.alert.invalidPassword);
// //       return;
// //     }
    
// //     if (!email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/)) {
// //       alert(t.alert.invalidEmail);
// //       return;
// //     }
    
// //     if (!phone.match(/^\d{7,15}$/)) {
// //       alert(t.alert.invalidPhone);
// //       return;
// //     }
    
// //     saveDoctor(formData);
// //   };

// //   const handleSavePassword = () => {
// //     const { oldPassword, newPassword, confirmPassword } = passwordData;
    
// //     if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
// //       alert(t.alert.fillAllFields);
// //       return;
// //     }
    
// //     if (newPassword !== confirmPassword) {
// //       alert(t.alert.passwordMismatch);
// //       return;
// //     }
    
// //     changePassword(selectedDoctor.username, oldPassword, newPassword);
// //   };

// //   const handleReassignAppointment = () => {
// //     if (!selectedAppointment) {
// //       alert(t.alert.selectAppointment);
// //       return;
// //     }
// //     if (!reassignDoctorId) {
// //       alert(t.alert.selectDoctor);
// //       return;
// //     }
// //     reassignAppointment(selectedAppointment.id, parseInt(reassignDoctorId));
// //   };

// //   const handleViewToggle = (mode) => {
// //     setViewMode(mode);
// //   };

// //   // ---------- Effects ----------
// //   useEffect(() => {
// //     loadDoctors();
// //   }, [loadDoctors]);

// //   // ---------- Render Helpers ----------
// //   const renderStats = () => {
// //     return (
// //       <div className="doctor-stats">
// //         <div className="doctor-stat-card">
// //           <div className="icon">👥</div>
// //           <div className="value">{stats.total}</div>
// //           <div className="label">{t.stat.total}</div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderSearchTools = () => {
// //     return (
// //       <div className="doctor-search-tools">
// //         <div className="doctor-search-box">
// //           <span className="search-icon">🔍</span>
// //           <input
// //             type="text"
// //             value={searchQuery}
// //             onChange={handleSearch}
// //             placeholder={t.search.placeholder}
// //           />
// //         </div>
        
// //         <div className="doctor-view-toggle">
// //           <button
// //             className={viewMode === 'table' ? 'active' : ''}
// //             onClick={() => handleViewToggle('table')}
// //           >
// //             📋 {t.btn.table}
// //           </button>
// //           <button
// //             className={viewMode === 'cards' ? 'active' : ''}
// //             onClick={() => handleViewToggle('cards')}
// //           >
// //             🃏 {t.btn.cards}
// //           </button>
// //         </div>
        
// //         <button
// //           onClick={loadDoctors}
// //           style={{
// //             background: '#4299e1',
// //             color: 'white',
// //             border: 'none',
// //             borderRadius: '8px',
// //             padding: '8px 20px',
// //             fontWeight: 'bold',
// //             cursor: 'pointer',
// //           }}
// //         >
// //           🔄 {t.btn.refresh}
// //         </button>
// //       </div>
// //     );
// //   };

// //   const renderTable = () => {
// //     if (filteredDoctors.length === 0) {
// //       return <div className="doctor-empty">📭 {t.label.noDoctors}</div>;
// //     }
    
// //     return (
// //       <div className="doctor-table-wrapper">
// //         <table className="doctor-table">
// //           <thead>
// //             <tr>
// //               <th>{t.col.id}</th>
// //               <th>{t.col.firstName}</th>
// //               <th>{t.col.middleName}</th>
// //               <th>{t.col.lastName}</th>
// //               <th>{t.col.specialty}</th>
// //               <th>{t.col.email}</th>
// //               <th>{t.col.phone}</th>
// //               <th>{t.col.username}</th>
// //               <th>{t.col.password}</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredDoctors.map(doctor => (
// //               <tr
// //                 key={doctor.id}
// //                 className={selectedDoctor?.id === doctor.id ? 'selected' : ''}
// //                 onClick={() => handleSelectDoctor(doctor)}
// //                 style={{ cursor: 'pointer' }}
// //               >
// //                 <td>{doctor.id}</td>
// //                 <td>{doctor.firstName}</td>
// //                 <td>{doctor.middleName}</td>
// //                 <td>{doctor.lastName}</td>
// //                 <td>{doctor.specialty}</td>
// //                 <td>{doctor.email}</td>
// //                 <td>{doctor.phone}</td>
// //                 <td>{doctor.username}</td>
// //                 <td className="password-mask">****</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     );
// //   };

// //   const renderCards = () => {
// //     if (filteredDoctors.length === 0) {
// //       return <div className="doctor-empty">📭 {t.label.noDoctors}</div>;
// //     }
    
// //     return (
// //       <div className="doctor-card-grid">
// //         {filteredDoctors.map(doctor => (
// //           <div
// //             key={doctor.id}
// //             className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
// //             onClick={() => handleSelectDoctor(doctor)}
// //           >
// //             <div className="card-header">
// //               <span className="card-id">#{doctor.id}</span>
// //               <span className="card-name">{doctor.fullName}</span>
// //             </div>
// //             <div className="card-specialty">🩺 {doctor.specialty}</div>
// //             <div className="card-details">
// //               <div>📧 {doctor.email}</div>
// //               <div>📱 {doctor.phone}</div>
// //               <div>👤 {doctor.username}</div>
// //             </div>
// //             <div className="card-actions">
// //               <button
// //                 style={{ background: '#4299e1', color: 'white' }}
// //                 onClick={(e) => {
// //                   e.stopPropagation();
// //                   setSelectedDoctor(doctor);
// //                   loadAppointments(doctor.id);
// //                   setShowAppointments(true);
// //                 }}
// //               >
// //                 📋 {t.btn.viewAppointments}
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderButtons = () => {
// //     return (
// //       <div className="doctor-buttons">
// //         <button
// //           onClick={handleAddDoctor}
// //           style={{ background: '#48bb78', color: 'white' }}
// //         >
// //           ➕ {t.btn.add}
// //         </button>
// //         <button
// //           onClick={handleEditDoctor}
// //           disabled={!selectedDoctor}
// //           style={{ background: '#4299e1', color: 'white' }}
// //         >
// //           ✏️ {t.btn.update}
// //         </button>
// //         <button
// //           onClick={handleDeleteDoctor}
// //           disabled={!selectedDoctor}
// //           style={{ background: '#fc8181', color: 'white' }}
// //         >
// //           🗑️ {t.btn.delete}
// //         </button>
// //         <button
// //           onClick={handleViewAppointments}
// //           disabled={!selectedDoctor}
// //           style={{ background: '#805ad5', color: 'white' }}
// //         >
// //           📋 {t.btn.viewAppointments}
// //         </button>
// //         <button
// //           onClick={handleChangePassword}
// //           disabled={!selectedDoctor}
// //           style={{ background: '#ed8936', color: 'white' }}
// //         >
// //           🔑 {t.btn.changePassword}
// //         </button>
// //       </div>
// //     );
// //   };

// //   const renderStatusBar = () => {
// //     return (
// //       <div className="doctor-status-bar">
// //         <div className="status-msg">
// //           {statusMsg}
// //         </div>
// //         <div>
// //           🕐 {new Date().toLocaleTimeString()}
// //         </div>
// //       </div>
// //     );
// //   };

// //   // ---------- Modals ----------
// //   const renderDoctorFormModal = () => {
// //     if (!showDoctorForm) return null;
    
// //     const isEdit = !!editingDoctor;
// //     const modalTitle = isEdit ? `✏️ ${t.titleUpdateDoctor}` : `➕ ${t.titleAddDoctor}`;
    
// //     return (
// //       <div className="doctor-modal-overlay">
// //         <div className="doctor-modal">
// //           <h3>{modalTitle}</h3>
          
// //           <div className="form-group">
// //             <label>{t.label.firstName}</label>
// //             <input
// //               type="text"
// //               value={formData.firstName}
// //               onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.label.middleName}</label>
// //             <input
// //               type="text"
// //               value={formData.middleName}
// //               onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.label.lastName}</label>
// //             <input
// //               type="text"
// //               value={formData.lastName}
// //               onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.label.specialty}</label>
// //             <input
// //               type="text"
// //               value={formData.specialty}
// //               onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.label.email}</label>
// //             <input
// //               type="text"
// //               value={formData.email}
// //               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.label.phone}</label>
// //             <input
// //               type="text"
// //               value={formData.phone}
// //               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.label.username}</label>
// //             <input
// //               type="text"
// //               value={formData.username}
// //               onChange={(e) => setFormData({ ...formData, username: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.label.password}</label>
// //             <input
// //               type="password"
// //               value={formData.password}
// //               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="modal-actions">
// //             <button
// //               className="btn-secondary"
// //               onClick={() => setShowDoctorForm(false)}
// //             >
// //               {t.btn.close}
// //             </button>
// //             <button
// //               className="btn-primary"
// //               onClick={handleSaveDoctor}
// //             >
// //               💾 {t.btn.save}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderChangePasswordModal = () => {
// //     if (!showChangePassword) return null;
    
// //     return (
// //       <div className="doctor-modal-overlay">
// //         <div className="doctor-modal doctor-change-password-modal">
// //           <h3>🔑 {t.titleChangePassword}</h3>
          
// //           <div className="form-group">
// //             <label>{t.label.oldPassword}</label>
// //             <input
// //               type="password"
// //               value={passwordData.oldPassword}
// //               onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.label.newPassword}</label>
// //             <input
// //               type="password"
// //               value={passwordData.newPassword}
// //               onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="form-group">
// //             <label>{t.label.confirmPassword}</label>
// //             <input
// //               type="password"
// //               value={passwordData.confirmPassword}
// //               onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
// //             />
// //           </div>
          
// //           <div className="modal-actions">
// //             <button
// //               className="btn-secondary"
// //               onClick={() => setShowChangePassword(false)}
// //             >
// //               {t.btn.close}
// //             </button>
// //             <button
// //               className="btn-primary"
// //               onClick={handleSavePassword}
// //             >
// //               💾 {t.btn.save}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderAppointmentsModal = () => {
// //     if (!showAppointments) return null;
    
// //     return (
// //       <div className="doctor-modal-overlay">
// //         <div className="doctor-modal doctor-appointments-modal">
// //           <h3>📋 {t.titleDoctorAppointments} - {selectedDoctor?.fullName}</h3>
          
// //           {appointments.length === 0 ? (
// //             <div className="doctor-empty">📭 No appointments found</div>
// //           ) : (
// //             <>
// //               <div className="doctor-table-wrapper">
// //                 <table className="appt-table">
// //                   <thead>
// //                     <tr>
// //                       <th style={{ width: '40px' }}>#</th>
// //                       <th>{t.col.patient}</th>
// //                       <th>{t.col.time}</th>
// //                       <th>{t.col.notes}</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {appointments.map((appt, index) => (
// //                       <tr
// //                         key={appt.id}
// //                         style={{
// //                           background: selectedAppointment?.id === appt.id ? '#ebf8ff' : 'white',
// //                           cursor: 'pointer'
// //                         }}
// //                         onClick={() => setSelectedAppointment(appt)}
// //                       >
// //                         <td>{index + 1}</td>
// //                         <td>{appt.patientName}</td>
// //                         <td>{appt.appointmentTime}</td>
// //                         <td>{appt.notes}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
              
// //               <div className="appt-actions">
// //                 <button
// //                   style={{
// //                     background: '#fc8181',
// //                     color: 'white',
// //                     border: 'none',
// //                     borderRadius: '8px',
// //                     padding: '8px 20px',
// //                     fontWeight: 'bold',
// //                     cursor: 'pointer',
// //                   }}
// //                   onClick={() => {
// //                     if (selectedAppointment) {
// //                       if (window.confirm('Delete this appointment?')) {
// //                         deleteAppointment(selectedAppointment.id);
// //                       }
// //                     } else {
// //                       alert(t.alert.selectAppointment);
// //                     }
// //                   }}
// //                 >
// //                   🗑️ {t.btn.deleteAppointment}
// //                 </button>
// //                 <button
// //                   style={{
// //                     background: '#ed8936',
// //                     color: 'white',
// //                     border: 'none',
// //                     borderRadius: '8px',
// //                     padding: '8px 20px',
// //                     fontWeight: 'bold',
// //                     cursor: 'pointer',
// //                   }}
// //                   onClick={() => {
// //                     if (!selectedAppointment) {
// //                       alert(t.alert.selectAppointment);
// //                       return;
// //                     }
// //                     setReassignDoctorId('');
// //                     setShowReassign(true);
// //                   }}
// //                 >
// //                   🔄 {t.btn.reassignAppointment}
// //                 </button>
// //               </div>
// //             </>
// //           )}
          
// //           <div className="modal-actions" style={{ marginTop: '15px' }}>
// //             <button
// //               className="btn-secondary"
// //               onClick={() => {
// //                 setShowAppointments(false);
// //                 setSelectedAppointment(null);
// //               }}
// //             >
// //               {t.btn.close}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderReassignModal = () => {
// //     if (!showReassign) return null;
    
// //     return (
// //       <div className="doctor-modal-overlay">
// //         <div className="doctor-modal doctor-reassign-modal">
// //           <h3>🔄 {t.titleReassign}</h3>
          
// //           <div className="form-group">
// //             <label>{t.label.newDoctor}</label>
// //             <select
// //               value={reassignDoctorId}
// //               onChange={(e) => setReassignDoctorId(e.target.value)}
// //             >
// //               <option value="">{t.prompt.selectDoctor}</option>
// //               {doctors.map(doctor => (
// //                 <option key={doctor.id} value={doctor.id}>
// //                   {doctor.fullName} ({doctor.specialty})
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
          
// //           <div className="modal-actions">
// //             <button
// //               className="btn-secondary"
// //               onClick={() => setShowReassign(false)}
// //             >
// //               {t.btn.close}
// //             </button>
// //             <button
// //               className="btn-primary"
// //               onClick={handleReassignAppointment}
// //               disabled={!reassignDoctorId}
// //             >
// //               ✅ {t.btn.assign}
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
// //       <div className="doctor-container">
// //         {/* Header */}
// //         <div className="doctor-header">
// //           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //             <div>
// //               <h2>👨‍⚕️ {t.title}</h2>
// //               <div className="underline"></div>
// //             </div>
// //             <button
// //               onClick={onClose}
// //               style={{
// //                 background: '#e2e8f0',
// //                 border: 'none',
// //                 padding: '8px 20px',
// //                 borderRadius: '8px',
// //                 cursor: 'pointer',
// //                 fontSize: '14px',
// //               }}
// //             >
// //               ✕ {t.btn.close}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Stats */}
// //         {renderStats()}

// //         {/* Search & Tools */}
// //         {renderSearchTools()}

// //         {/* Content */}
// //         <div className="doctor-content">
// //           {loading ? (
// //             <div className="doctor-loading">⏳ Loading...</div>
// //           ) : (
// //             viewMode === 'table' ? renderTable() : renderCards()
// //           )}
// //         </div>

// //         {/* Buttons */}
// //         {renderButtons()}

// //         {/* Status Bar */}
// //         {renderStatusBar()}

// //         {/* Modals */}
// //         {renderDoctorFormModal()}
// //         {renderChangePasswordModal()}
// //         {renderAppointmentsModal()}
// //         {renderReassignModal()}
// //       </div>
// //     </>
// //   );
// // };

// // export default DoctorManagementScreen;  02072026

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .doctor-container {
//     padding: 20px;
//     background: #f0f4f8;
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .doctor-header {
//     margin-bottom: 20px;
//   }
//   .doctor-header h2 {
//     font-size: 28px;
//     font-weight: bold;
//     color: #1a202c;
//     margin: 0 0 5px 0;
//   }
//   .doctor-header .underline {
//     height: 3px;
//     width: 60px;
//     background: linear-gradient(to right, #4299e1, #2b6cb0);
//     border-radius: 2px;
//   }
//   .doctor-stats {
//     display: flex;
//     gap: 15px;
//     margin-bottom: 15px;
//     flex-wrap: wrap;
//   }
//   .doctor-stat-card {
//     background: white;
//     padding: 15px 20px;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border-left: 4px solid #4299e1;
//     min-width: 150px;
//     flex: 1;
//     max-width: 200px;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-stat-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .doctor-stat-card .icon { font-size: 24px; }
//   .doctor-stat-card .value { font-size: 24px; font-weight: bold; color: #4299e1; }
//   .doctor-stat-card .label { font-size: 12px; color: #718096; }
//   .doctor-tools-wrapper {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     margin-bottom: 15px;
//   }
//   .doctor-buttons-row {
//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;
//     align-items: center;
//   }
//   .doctor-buttons-row button {
//     padding: 8px 20px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     min-width: 120px;
//   }
//   .doctor-buttons-row button:hover:not(:disabled) {
//     transform: scale(1.05);
//   }
//   .doctor-buttons-row button:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
//   .doctor-search-tools {
//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;
//     align-items: center;
//   }
//   .doctor-search-box {
//     display: flex;
//     align-items: center;
//     background: white;
//     border-radius: 25px;
//     border: 1px solid #e2e8f0;
//     padding: 5px 15px;
//     flex: 1;
//     min-width: 200px;
//   }
//   .doctor-search-box input {
//     border: none;
//     outline: none;
//     padding: 8px 5px;
//     font-size: 14px;
//     flex: 1;
//     background: transparent;
//   }
//   .doctor-search-box .search-icon {
//     font-size: 14px;
//     color: #a0aec0;
//   }
//   .doctor-view-toggle {
//     display: flex;
//     gap: 5px;
//   }
//   .doctor-view-toggle button {
//     padding: 6px 15px;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     background: white;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//   }
//   .doctor-view-toggle button.active {
//     background: #4299e1;
//     color: white;
//     border-color: #4299e1;
//   }
//   .doctor-view-toggle button:hover:not(.active) {
//     background: #f7fafc;
//   }
//   .doctor-content {
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     overflow: hidden;
//     min-height: 400px;
//     position: relative;
//   }
//   .doctor-table-wrapper {
//     overflow-x: auto;
//   }
//   .doctor-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .doctor-table th {
//     padding: 12px 15px;
//     text-align: left;
//     background: #f8f9fa;
//     font-weight: bold;
//     color: #2d3748;
//     border-bottom: 2px solid #e2e8f0;
//   }
//   .doctor-table td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #edf2f7;
//   }
//   .doctor-table tr:hover td {
//     background: #f7fafc;
//   }
//   .doctor-table tr.selected td {
//     background: #ebf8ff;
//   }
//   .doctor-table .password-mask {
//     color: #718096;
//     font-family: monospace;
//   }
//   .doctor-card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//     gap: 15px;
//     padding: 15px;
//   }
//   .doctor-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #edf2f7;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-card:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .doctor-card.selected {
//     background: #fc8181;
//     border-color: #e53e3e;
//     color: white;
//   }
//   .doctor-card.selected .card-text {
//     color: white !important;
//   }
//   .doctor-card .card-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 8px;
//   }
//   .doctor-card .card-id {
//     background: #4299e1;
//     color: white;
//     padding: 2px 12px;
//     border-radius: 12px;
//     font-size: 12px;
//     font-weight: bold;
//   }
//   .doctor-card .card-name {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2d3748;
//   }
//   .doctor-card .card-specialty {
//     font-size: 13px;
//     color: #4a5568;
//   }
//   .doctor-card .card-details {
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//     margin-top: 8px;
//     font-size: 13px;
//     color: #4a5568;
//   }
//   .doctor-card .card-actions {
//     margin-top: 10px;
//     display: flex;
//     gap: 5px;
//   }
//   .doctor-card .card-actions button {
//     padding: 4px 12px;
//     border: none;
//     border-radius: 6px;
//     font-size: 12px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-card .card-actions button:hover {
//     transform: scale(1.05);
//   }
//   .doctor-status-bar {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 8px 15px;
//     background: #f7fafc;
//     border-top: 1px solid #e2e8f0;
//     font-size: 13px;
//     color: #4a5568;
//   }
//   .doctor-status-bar .status-msg {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }
//   .doctor-loading {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     font-size: 18px;
//     color: #a0aec0;
//   }
//   .doctor-empty {
//     text-align: center;
//     padding: 40px;
//     color: #a0aec0;
//   }
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
//     border-radius: 12px;
//     padding: 25px;
//     max-width: 500px;
//     width: 95%;
//     max-height: 90vh;
//     overflow-y: auto;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   }
//   .doctor-modal h3 {
//     margin: 0 0 15px 0;
//     color: #2d3748;
//   }
//   .doctor-modal .form-group {
//     margin-bottom: 15px;
//   }
//   .doctor-modal .form-group label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
//     color: #2d3748;
//   }
//   .doctor-modal .form-group input {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//     transition: border-color 0.2s;
//   }
//   .doctor-modal .form-group input:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .doctor-modal .modal-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }
//   .doctor-modal .modal-actions button {
//     padding: 8px 30px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-modal .modal-actions button:hover {
//     transform: scale(1.05);
//   }
//   .doctor-modal .modal-actions .btn-primary {
//     background: #48bb78;
//     color: white;
//   }
//   .doctor-modal .modal-actions .btn-primary:disabled {
//     background: #a0aec0;
//     cursor: not-allowed;
//   }
//   .doctor-modal .modal-actions .btn-secondary {
//     background: #e2e8f0;
//     color: #4a5568;
//   }
//   .doctor-appointments-modal {
//     max-width: 800px;
//   }
//   .doctor-appointments-modal .appt-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .doctor-appointments-modal .appt-table th {
//     padding: 10px;
//     text-align: left;
//     background: #f8f9fa;
//     border-bottom: 2px solid #e2e8f0;
//   }
//   .doctor-appointments-modal .appt-table td {
//     padding: 8px 10px;
//     border-bottom: 1px solid #edf2f7;
//   }
//   .doctor-appointments-modal .appt-table tr:hover td {
//     background: #f7fafc;
//   }
//   .doctor-appointments-modal .appt-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: center;
//     margin-top: 15px;
//   }
//   .doctor-reassign-modal {
//     max-width: 450px;
//   }
//   .doctor-reassign-modal select {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//   }
//   .doctor-reassign-modal select:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .doctor-change-password-modal {
//     max-width: 450px;
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

// // ---------- Data Classes ----------
// class DoctorRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.firstName = data.firstName || '';
//     this.middleName = data.middleName || '';
//     this.lastName = data.lastName || '';
//     this.specialty = data.specialty || '';
//     this.email = data.email || '';
//     this.phone = data.phone || '';
//     this.username = data.username || '';
//     this.password = data.password || '';
//     this.fullName = `${this.firstName} ${this.middleName} ${this.lastName}`.trim();
//   }

//   static fromJson(json) {
//     return new DoctorRow({
//       id: json.id || 0,
//       firstName: json.firstName || '',
//       middleName: json.middleName || '',
//       lastName: json.lastName || '',
//       specialty: json.specialty || '',
//       email: json.email || '',
//       phone: json.phone || '',
//       username: json.username || '',
//       password: json.password || '',
//     });
//   }
// }

// class AppointmentRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.patientName = data.patientName || '';
//     this.appointmentTime = data.appointmentTime || '';
//     this.notes = data.notes || '';
//   }

//   static fromJson(json) {
//     return new AppointmentRow({
//       id: json.id || 0,
//       patientName: json.patientName || json.patient?.fullName || '',
//       appointmentTime: json.appointmentTime || '',
//       notes: json.notes || '',
//     });
//   }
// }

// // ---------- Main Component ----------
// const DoctorManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const t = React.useMemo(() => {
//     const translations = {
//       en: {
//         title: 'Doctor Management',
//         stat: { total: 'Total Doctors' },
//         search: { placeholder: 'Search doctors...' },
//         btn: {
//           table: 'Table',
//           cards: 'Cards',
//           refresh: 'Refresh',
//           add: 'Add Doctor',
//           update: 'Update',
//           delete: 'Delete',
//           viewAppointments: 'View Appointments',
//           changePassword: 'Change Password',
//           save: 'Save',
//           yes: 'Yes',
//           no: 'No',
//           assign: 'Assign',
//           deleteAppointment: 'Delete Appointment',
//           reassignAppointment: 'Reassign',
//           close: 'Close',
//         },
//         col: {
//           id: 'ID',
//           firstName: 'First Name',
//           middleName: 'Middle Name',
//           lastName: 'Last Name',
//           specialty: 'Specialty',
//           email: 'Email',
//           phone: 'Phone',
//           username: 'Username',
//           password: 'Password',
//           patient: 'Patient',
//           time: 'Time',
//           notes: 'Notes',
//         },
//         label: {
//           firstName: 'First Name',
//           middleName: 'Middle Name',
//           lastName: 'Last Name',
//           specialty: 'Specialty',
//           email: 'Email',
//           phone: 'Phone',
//           username: 'Username',
//           password: 'Password',
//           oldPassword: 'Old Password',
//           newPassword: 'New Password',
//           confirmPassword: 'Confirm Password',
//           newDoctor: 'New Doctor',
//           noDoctors: 'No doctors found',
//           showing: 'Showing',
//           records: 'records',
//         },
//         titleAddDoctor: 'Add Doctor',
//         titleUpdateDoctor: 'Update Doctor',
//         titleChangePassword: 'Change Password',
//         titleDoctorAppointments: 'Appointments',
//         titleReassign: 'Reassign Appointment',
//         alert: {
//           selectDoctor: 'Please select a doctor first',
//           selectAppointment: 'Please select an appointment first',
//           fillAllFields: 'Please fill all required fields',
//           invalidFirstName: 'First name must be at least 3 letters',
//           invalidLastName: 'Last name must be at least 3 letters',
//           invalidPassword: 'Password must be at least 6 characters',
//           invalidEmail: 'Please enter a valid email',
//           invalidPhone: 'Phone must be 7-15 digits',
//           saved: 'Doctor saved successfully',
//           deleted: 'Doctor deleted successfully',
//           errorSaveDoctor: 'Error saving doctor',
//           errorDeleteDoctor: 'Error deleting doctor',
//           errorLoadDoctors: 'Error loading doctors',
//           passwordChanged: 'Password changed successfully',
//           errorChangePassword: 'Error changing password',
//           passwordMismatch: 'Passwords do not match',
//           appointmentDeleted: 'Appointment deleted successfully',
//           errorDeleteAppointment: 'Error deleting appointment',
//           appointmentReassigned: 'Appointment reassigned successfully',
//           errorReassignAppointment: 'Error reassigning appointment',
//           errorFetchAppointments: 'Error fetching appointments',
//           errorFetchDoctors: 'Error fetching doctors',
//         },
//         confirm: {
//           delete: { title: 'Confirm Delete', content: 'Are you sure you want to delete this doctor?' },
//         },
//         status: {
//           ready: 'Ready',
//           refreshing: 'Refreshing...',
//           selected: 'Selected',
//           added: 'Added successfully',
//           updated: 'Updated successfully',
//           deleted: 'Deleted successfully',
//           passwordChanged: 'Password changed successfully',
//           reassigned: 'Reassigned successfully',
//         },
//         prompt: { selectDoctor: 'Select a doctor' },
//         msg: {
//           confirmClose: 'Are you sure you want to close this screen?',
//         },
//       },
//       ar: {
//         title: 'إدارة الأطباء',
//         stat: { total: 'إجمالي الأطباء' },
//         search: { placeholder: 'بحث عن الأطباء...' },
//         btn: {
//           table: 'جدول',
//           cards: 'بطاقات',
//           refresh: 'تحديث',
//           add: 'إضافة طبيب',
//           update: 'تعديل',
//           delete: 'حذف',
//           viewAppointments: 'عرض المواعيد',
//           changePassword: 'تغيير كلمة المرور',
//           save: 'حفظ',
//           yes: 'نعم',
//           no: 'لا',
//           assign: 'تعيين',
//           deleteAppointment: 'حذف الموعد',
//           reassignAppointment: 'إعادة تعيين',
//           close: 'إغلاق',
//         },
//         col: {
//           id: 'الرقم',
//           firstName: 'الاسم الأول',
//           middleName: 'الاسم الأوسط',
//           lastName: 'الاسم الأخير',
//           specialty: 'التخصص',
//           email: 'البريد الإلكتروني',
//           phone: 'الهاتف',
//           username: 'اسم المستخدم',
//           password: 'كلمة المرور',
//           patient: 'المريض',
//           time: 'الوقت',
//           notes: 'ملاحظات',
//         },
//         label: {
//           firstName: 'الاسم الأول',
//           middleName: 'الاسم الأوسط',
//           lastName: 'الاسم الأخير',
//           specialty: 'التخصص',
//           email: 'البريد الإلكتروني',
//           phone: 'الهاتف',
//           username: 'اسم المستخدم',
//           password: 'كلمة المرور',
//           oldPassword: 'كلمة المرور القديمة',
//           newPassword: 'كلمة المرور الجديدة',
//           confirmPassword: 'تأكيد كلمة المرور',
//           newDoctor: 'طبيب جديد',
//           noDoctors: 'لا يوجد أطباء',
//           showing: 'عرض',
//           records: 'سجلات',
//         },
//         titleAddDoctor: 'إضافة طبيب',
//         titleUpdateDoctor: 'تعديل طبيب',
//         titleChangePassword: 'تغيير كلمة المرور',
//         titleDoctorAppointments: 'المواعيد',
//         titleReassign: 'إعادة تعيين الموعد',
//         alert: {
//           selectDoctor: 'يرجى اختيار طبيب أولاً',
//           selectAppointment: 'يرجى اختيار موعد أولاً',
//           fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',
//           invalidFirstName: 'الاسم الأول يجب أن يكون 3 أحرف على الأقل',
//           invalidLastName: 'الاسم الأخير يجب أن يكون 3 أحرف على الأقل',
//           invalidPassword: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
//           invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
//           invalidPhone: 'الهاتف يجب أن يكون 7-15 رقم',
//           saved: 'تم حفظ الطبيب بنجاح',
//           deleted: 'تم حذف الطبيب بنجاح',
//           errorSaveDoctor: 'خطأ في حفظ الطبيب',
//           errorDeleteDoctor: 'خطأ في حذف الطبيب',
//           errorLoadDoctors: 'خطأ في تحميل الأطباء',
//           passwordChanged: 'تم تغيير كلمة المرور بنجاح',
//           errorChangePassword: 'خطأ في تغيير كلمة المرور',
//           passwordMismatch: 'كلمات المرور غير متطابقة',
//           appointmentDeleted: 'تم حذف الموعد بنجاح',
//           errorDeleteAppointment: 'خطأ في حذف الموعد',
//           appointmentReassigned: 'تم إعادة تعيين الموعد بنجاح',
//           errorReassignAppointment: 'خطأ في إعادة تعيين الموعد',
//           errorFetchAppointments: 'خطأ في جلب المواعيد',
//           errorFetchDoctors: 'خطأ في جلب الأطباء',
//         },
//         confirm: {
//           delete: { title: 'تأكيد الحذف', content: 'هل أنت متأكد من حذف هذا الطبيب؟' },
//         },
//         status: {
//           ready: 'جاهز',
//           refreshing: 'جاري التحديث...',
//           selected: 'تم الاختيار',
//           added: 'تمت الإضافة بنجاح',
//           updated: 'تم التعديل بنجاح',
//           deleted: 'تم الحذف بنجاح',
//           passwordChanged: 'تم تغيير كلمة المرور بنجاح',
//           reassigned: 'تم إعادة التعيين بنجاح',
//         },
//         prompt: { selectDoctor: 'اختر طبيباً' },
//         msg: {
//           confirmClose: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
//         },
//       },
//     };
//     return translations[lang] || translations.en;
//   }, [lang]);

//   // ---------- State ----------
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [viewMode, setViewMode] = useState('table');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [stats, setStats] = useState({ total: 0 });
  
//   // Modal states
//   const [showDoctorForm, setShowDoctorForm] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [showReassign, setShowReassign] = useState(false);
//   const [editingDoctor, setEditingDoctor] = useState(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [appointments, setAppointments] = useState([]);
  
//   // Form states
//   const [formData, setFormData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     specialty: '',
//     email: '',
//     phone: '',
//     username: '',
//     password: '',
//   });
  
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
  
//   const [reassignDoctorId, setReassignDoctorId] = useState('');

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
//   const loadDoctors = useCallback(async () => {
//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.refreshing}`);

//     try {
//       const res = await fetch(`${BASE_URL}/api/doctors`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const doctorsData = Array.isArray(data) ? data : [data];
      
//       const parsedDoctors = doctorsData.map(item => DoctorRow.fromJson(item));
      
//       setDoctors(parsedDoctors);
//       setFilteredDoctors(parsedDoctors);
//       setStats({ total: parsedDoctors.length });
      
//       setStatusMsg(`✅ ${t.status.ready} (${parsedDoctors.length} ${t.label.records})`);
//     } catch (err) {
//       //console.error('🚨 Load error:', err);
//       setStatusMsg(`❌ ${t.alert.errorLoadDoctors}: ${err.message}`);
//       setDoctors([]);
//       setFilteredDoctors([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [t]);

// const saveDoctor = useCallback(async (doctorData) => {
//   try {
//     const isUpdate = !!editingDoctor;
//     const url = isUpdate 
//       ? `${BASE_URL}/api/doctors/${editingDoctor.id}`
//       : `${BASE_URL}/api/doctors`;
    
//     // ✅ Ensure all required fields are sent
//     const payload = {
//       firstName: doctorData.firstName.trim(),
//       middleName: doctorData.middleName ? doctorData.middleName.trim() : '',
//       lastName: doctorData.lastName.trim(),
//       specialty: doctorData.specialty.trim(),
//       email: doctorData.email.trim(),
//       phone: doctorData.phone.trim(),
//       username: doctorData.username.trim(),
//       password: doctorData.password.trim(),
//     };

//     //console.log('📤 Sending doctor payload:', payload);

//     const res = await fetch(url, {
//       method: isUpdate ? 'PUT' : 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     // ✅ Read error response body for debugging
//     let responseBody;
//     try {
//       responseBody = await res.json();
//     } catch {
//       responseBody = await res.text();
//     }

//     if (!res.ok) {
//       //console.error('❌ Server error response:', responseBody);
//       // If responseBody is an object with a message, show that
//       const errorMessage = typeof responseBody === 'object' && responseBody.message
//         ? responseBody.message
//         : typeof responseBody === 'string'
//         ? responseBody
//         : `HTTP ${res.status}`;
//       throw new Error(errorMessage);
//     }

//     alert(t.alert.saved);
//     setShowDoctorForm(false);
//     setEditingDoctor(null);
//     loadDoctors();
//     logAction(isUpdate ? 'UPDATE_DOCTOR' : 'ADD_DOCTOR', 
//       `${isUpdate ? 'Updated' : 'Added'} doctor: ${payload.firstName} ${payload.lastName}`);
//     setStatusMsg(`✅ ${isUpdate ? t.status.updated : t.status.added}`);
//   } catch (err) {
//     //console.error('🚨 Save error:', err);
//     alert(`Error: ${err.message}`);
//   }
// }, [editingDoctor, loadDoctors, t, logAction]);
//   const deleteDoctor = useCallback(async (doctorId) => {
//     if (!window.confirm(t.confirm.delete.content)) return;
    
//     try {
//       const res = await fetch(`${BASE_URL}/api/doctors/${doctorId}`, {
//         method: 'DELETE',
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.alert.deleted);
//       setSelectedDoctor(null);
//       loadDoctors();
//       logAction('DELETE_DOCTOR', `Deleted doctor ID: ${doctorId}`);
//       setStatusMsg(`🗑️ ${t.status.deleted}`);
//     } catch (err) {
//       //console.error('🚨 Delete error:', err);
//       alert(`${t.alert.errorDeleteDoctor}: ${err.message}`);
//     }
//   }, [loadDoctors, t, logAction]);

//   const changePassword = useCallback(async (username, oldPassword, newPassword) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/doctors/change-password`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, oldPassword, newPassword }),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.alert.passwordChanged);
//       setShowChangePassword(false);
//       setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
//       logAction('CHANGE_PASSWORD', `Changed password for doctor: ${username}`);
//       setStatusMsg(`✅ ${t.status.passwordChanged}`);
//     } catch (err) {
//       //console.error('🚨 Password change error:', err);
//       alert(`${t.alert.errorChangePassword}: ${err.message}`);
//     }
//   }, [t, logAction]);

//   const loadAppointments = useCallback(async (doctorId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/appointments/doctor/${doctorId}`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const appointmentsData = Array.isArray(data) ? data : [data];
      
//       const parsedAppointments = appointmentsData.map(item => AppointmentRow.fromJson(item));
//       setAppointments(parsedAppointments);
//     } catch (err) {
//       //console.error('🚨 Load appointments error:', err);
//       alert(t.alert.errorFetchAppointments);
//     }
//   }, [t]);

//   const deleteAppointment = useCallback(async (appointmentId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}`, {
//         method: 'DELETE',
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.alert.appointmentDeleted);
//       setAppointments(prev => prev.filter(a => a.id !== appointmentId));
//       setSelectedAppointment(null);
//       logAction('DELETE_APPOINTMENT', `Deleted appointment ID: ${appointmentId}`);
//     } catch (err) {
//       //console.error('🚨 Delete appointment error:', err);
//       alert(t.alert.errorDeleteAppointment);
//     }
//   }, [t, logAction]);

//   const reassignAppointment = useCallback(async (appointmentId, newDoctorId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}/reassign`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ doctorId: newDoctorId }),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.alert.appointmentReassigned);
//       setShowReassign(false);
//       setSelectedAppointment(null);
//       setReassignDoctorId('');
//       loadAppointments(selectedDoctor.id);
//       logAction('REASSIGN_APPOINTMENT', `Reassigned appointment ${appointmentId} to doctor ${newDoctorId}`);
//       setStatusMsg(`✅ ${t.status.reassigned}`);
//     } catch (err) {
//       //console.error('🚨 Reassign error:', err);
//       alert(t.alert.errorReassignAppointment);
//     }
//   }, [selectedDoctor, loadAppointments, t, logAction]);

//   // ---------- Handlers ----------
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
    
//     if (query.trim() === '') {
//       setFilteredDoctors(doctors);
//       return;
//     }
    
//     const filtered = doctors.filter(doctor => {
//       return (
//         doctor.firstName.toLowerCase().includes(query) ||
//         doctor.lastName.toLowerCase().includes(query) ||
//         doctor.specialty.toLowerCase().includes(query) ||
//         doctor.email.toLowerCase().includes(query) ||
//         doctor.username.toLowerCase().includes(query) ||
//         doctor.fullName.toLowerCase().includes(query)
//       );
//     });
    
//     setFilteredDoctors(filtered);
//   };

//   const handleSelectDoctor = (doctor) => {
//     setSelectedDoctor(doctor);
//     setStatusMsg(`✅ ${t.status.selected}: ${doctor.fullName}`);
//   };

//   const handleAddDoctor = () => {
//     setEditingDoctor(null);
//     setFormData({
//       firstName: '',
//       middleName: '',
//       lastName: '',
//       specialty: '',
//       email: '',
//       phone: '',
//       username: '',
//       password: '',
//     });
//     setShowDoctorForm(true);
//   };

//   const handleEditDoctor = () => {
//     if (!selectedDoctor) {
//       alert(t.alert.selectDoctor);
//       return;
//     }
//     setEditingDoctor(selectedDoctor);
//     setFormData({
//       firstName: selectedDoctor.firstName,
//       middleName: selectedDoctor.middleName,
//       lastName: selectedDoctor.lastName,
//       specialty: selectedDoctor.specialty,
//       email: selectedDoctor.email,
//       phone: selectedDoctor.phone,
//       username: selectedDoctor.username,
//       password: selectedDoctor.password,
//     });
//     setShowDoctorForm(true);
//   };

//   const handleDeleteDoctor = () => {
//     if (!selectedDoctor) {
//       alert(t.alert.selectDoctor);
//       return;
//     }
//     deleteDoctor(selectedDoctor.id);
//   };

//   const handleViewAppointments = () => {
//     if (!selectedDoctor) {
//       alert(t.alert.selectDoctor);
//       return;
//     }
//     loadAppointments(selectedDoctor.id);
//     setShowAppointments(true);
//   };

//   const handleChangePassword = () => {
//     if (!selectedDoctor) {
//       alert(t.alert.selectDoctor);
//       return;
//     }
//     setPasswordData({
//       oldPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setShowChangePassword(true);
//   };

//   const handleSaveDoctor = () => {
//     const { firstName, lastName, specialty, email, phone, username, password } = formData;
    
//     // Validation
//     if (!firstName.trim() || !lastName.trim() || !specialty.trim() || 
//         !email.trim() || !phone.trim() || !username.trim() || !password.trim()) {
//       alert(t.alert.fillAllFields);
//       return;
//     }
    
//     if (firstName.length < 3) {
//       alert(t.alert.invalidFirstName);
//       return;
//     }
    
//     if (lastName.length < 3) {
//       alert(t.alert.invalidLastName);
//       return;
//     }
    
//     if (password.length < 6) {
//       alert(t.alert.invalidPassword);
//       return;
//     }
    
//     if (!email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/)) {
//       alert(t.alert.invalidEmail);
//       return;
//     }
    
//     if (!phone.match(/^\d{7,15}$/)) {
//       alert(t.alert.invalidPhone);
//       return;
//     }
    
//     saveDoctor(formData);
//   };

//   const handleSavePassword = () => {
//     const { oldPassword, newPassword, confirmPassword } = passwordData;
    
//     if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
//       alert(t.alert.fillAllFields);
//       return;
//     }
    
//     if (newPassword !== confirmPassword) {
//       alert(t.alert.passwordMismatch);
//       return;
//     }
    
//     changePassword(selectedDoctor.username, oldPassword, newPassword);
//   };

//   const handleReassignAppointment = () => {
//     if (!selectedAppointment) {
//       alert(t.alert.selectAppointment);
//       return;
//     }
//     if (!reassignDoctorId) {
//       alert(t.alert.selectDoctor);
//       return;
//     }
//     reassignAppointment(selectedAppointment.id, parseInt(reassignDoctorId));
//   };

//   const handleViewToggle = (mode) => {
//     setViewMode(mode);
//   };

//   // ---------- Effects ----------
//   useEffect(() => {
//     loadDoctors();
//   }, [loadDoctors]);

//   // ---------- Render Helpers ----------
//   const renderStats = () => {
//     return (
//       <div className="doctor-stats">
//         <div className="doctor-stat-card">
//           <div className="icon">👥</div>
//           <div className="value">{stats.total}</div>
//           <div className="label">{t.stat.total}</div>
//         </div>
//       </div>
//     );
//   };

//   const renderButtonsRow = () => {
//     return (
//       <div className="doctor-buttons-row">
//         <button
//           onClick={handleAddDoctor}
//           style={{ background: '#48bb78', color: 'white' }}
//         >
//           ➕ {t.btn.add}
//         </button>
//         <button
//           onClick={handleEditDoctor}
//           disabled={!selectedDoctor}
//           style={{ background: '#4299e1', color: 'white' }}
//         >
//           ✏️ {t.btn.update}
//         </button>
//         <button
//           onClick={handleDeleteDoctor}
//           disabled={!selectedDoctor}
//           style={{ background: '#fc8181', color: 'white' }}
//         >
//           🗑️ {t.btn.delete}
//         </button>
//         <button
//           onClick={handleViewAppointments}
//           disabled={!selectedDoctor}
//           style={{ background: '#805ad5', color: 'white' }}
//         >
//           📋 {t.btn.viewAppointments}
//         </button>
//         <button
//           onClick={handleChangePassword}
//           disabled={!selectedDoctor}
//           style={{ background: '#ed8936', color: 'white' }}
//         >
//           🔑 {t.btn.changePassword}
//         </button>
//       </div>
//     );
//   };

//   const renderSearchTools = () => {
//     return (
//       <div className="doctor-search-tools">
//         <div className="doctor-search-box">
//           <span className="search-icon">🔍</span>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder={t.search.placeholder}
//           />
//         </div>
        
//         <div className="doctor-view-toggle">
//           <button
//             className={viewMode === 'table' ? 'active' : ''}
//             onClick={() => handleViewToggle('table')}
//           >
//             📋 {t.btn.table}
//           </button>
//           <button
//             className={viewMode === 'cards' ? 'active' : ''}
//             onClick={() => handleViewToggle('cards')}
//           >
//             🃏 {t.btn.cards}
//           </button>
//         </div>
        
//         <button
//           onClick={loadDoctors}
//           style={{
//             background: '#4299e1',
//             color: 'white',
//             border: 'none',
//             borderRadius: '8px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           🔄 {t.btn.refresh}
//         </button>
//       </div>
//     );
//   };

//   const renderTable = () => {
//     if (filteredDoctors.length === 0) {
//       return <div className="doctor-empty">📭 {t.label.noDoctors}</div>;
//     }
    
//     return (
//       <div className="doctor-table-wrapper">
//         <table className="doctor-table">
//           <thead>
//             <tr>
//               <th>{t.col.id}</th>
//               <th>{t.col.firstName}</th>
//               <th>{t.col.middleName}</th>
//               <th>{t.col.lastName}</th>
//               <th>{t.col.specialty}</th>
//               <th>{t.col.email}</th>
//               <th>{t.col.phone}</th>
//               <th>{t.col.username}</th>
//               <th>{t.col.password}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredDoctors.map(doctor => (
//               <tr
//                 key={doctor.id}
//                 className={selectedDoctor?.id === doctor.id ? 'selected' : ''}
//                 onClick={() => handleSelectDoctor(doctor)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <td>{doctor.id}</td>
//                 <td>{doctor.firstName}</td>
//                 <td>{doctor.middleName}</td>
//                 <td>{doctor.lastName}</td>
//                 <td>{doctor.specialty}</td>
//                 <td>{doctor.email}</td>
//                 <td>{doctor.phone}</td>
//                 <td>{doctor.username}</td>
//                 <td className="password-mask">****</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderCards = () => {
//     if (filteredDoctors.length === 0) {
//       return <div className="doctor-empty">📭 {t.label.noDoctors}</div>;
//     }
    
//     return (
//       <div className="doctor-card-grid">
//         {filteredDoctors.map(doctor => (
//           <div
//             key={doctor.id}
//             className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
//             onClick={() => handleSelectDoctor(doctor)}
//           >
//             <div className="card-header">
//               <span className="card-id">#{doctor.id}</span>
//               <span className="card-name">{doctor.fullName}</span>
//             </div>
//             <div className="card-specialty">🩺 {doctor.specialty}</div>
//             <div className="card-details">
//               <div>📧 {doctor.email}</div>
//               <div>📱 {doctor.phone}</div>
//               <div>👤 {doctor.username}</div>
//             </div>
//             <div className="card-actions">
//               <button
//                 style={{ background: '#4299e1', color: 'white' }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedDoctor(doctor);
//                   loadAppointments(doctor.id);
//                   setShowAppointments(true);
//                 }}
//               >
//                 📋 {t.btn.viewAppointments}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderStatusBar = () => {
//     return (
//       <div className="doctor-status-bar">
//         <div className="status-msg">
//           {statusMsg}
//         </div>
//         <div>
//           🕐 {new Date().toLocaleTimeString()}
//         </div>
//       </div>
//     );
//   };

//   // ---------- Modals ----------
//   const renderDoctorFormModal = () => {
//     if (!showDoctorForm) return null;
    
//     const isEdit = !!editingDoctor;
//     const modalTitle = isEdit ? `✏️ ${t.titleUpdateDoctor}` : `➕ ${t.titleAddDoctor}`;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal">
//           <h3>{modalTitle}</h3>
          
//           <div className="form-group">
//             <label>{t.label.firstName}</label>
//             <input
//               type="text"
//               value={formData.firstName}
//               onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.middleName}</label>
//             <input
//               type="text"
//               value={formData.middleName}
//               onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.lastName}</label>
//             <input
//               type="text"
//               value={formData.lastName}
//               onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.specialty}</label>
//             <input
//               type="text"
//               value={formData.specialty}
//               onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.email}</label>
//             <input
//               type="text"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.phone}</label>
//             <input
//               type="text"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.username}</label>
//             <input
//               type="text"
//               value={formData.username}
//               onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.password}</label>
//             <input
//               type="password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             />
//           </div>
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowDoctorForm(false)}
//             >
//               {t.btn.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleSaveDoctor}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderChangePasswordModal = () => {
//     if (!showChangePassword) return null;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal doctor-change-password-modal">
//           <h3>🔑 {t.titleChangePassword}</h3>
          
//           <div className="form-group">
//             <label>{t.label.oldPassword}</label>
//             <input
//               type="password"
//               value={passwordData.oldPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.newPassword}</label>
//             <input
//               type="password"
//               value={passwordData.newPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.confirmPassword}</label>
//             <input
//               type="password"
//               value={passwordData.confirmPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//             />
//           </div>
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowChangePassword(false)}
//             >
//               {t.btn.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleSavePassword}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderAppointmentsModal = () => {
//     if (!showAppointments) return null;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal doctor-appointments-modal">
//           <h3>📋 {t.titleDoctorAppointments} - {selectedDoctor?.fullName}</h3>
          
//           {appointments.length === 0 ? (
//             <div className="doctor-empty">📭 No appointments found</div>
//           ) : (
//             <>
//               <div className="doctor-table-wrapper">
//                 <table className="appt-table">
//                   <thead>
//                     <tr>
//                       <th style={{ width: '40px' }}>#</th>
//                       <th>{t.col.patient}</th>
//                       <th>{t.col.time}</th>
//                       <th>{t.col.notes}</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {appointments.map((appt, index) => (
//                       <tr
//                         key={appt.id}
//                         style={{
//                           background: selectedAppointment?.id === appt.id ? '#ebf8ff' : 'white',
//                           cursor: 'pointer'
//                         }}
//                         onClick={() => setSelectedAppointment(appt)}
//                       >
//                         <td>{index + 1}</td>
//                         <td>{appt.patientName}</td>
//                         <td>{appt.appointmentTime}</td>
//                         <td>{appt.notes}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="appt-actions">
//                 <button
//                   style={{
//                     background: '#fc8181',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     padding: '8px 20px',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => {
//                     if (selectedAppointment) {
//                       if (window.confirm('Delete this appointment?')) {
//                         deleteAppointment(selectedAppointment.id);
//                       }
//                     } else {
//                       alert(t.alert.selectAppointment);
//                     }
//                   }}
//                 >
//                   🗑️ {t.btn.deleteAppointment}
//                 </button>
//                 <button
//                   style={{
//                     background: '#ed8936',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     padding: '8px 20px',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => {
//                     if (!selectedAppointment) {
//                       alert(t.alert.selectAppointment);
//                       return;
//                     }
//                     setReassignDoctorId('');
//                     setShowReassign(true);
//                   }}
//                 >
//                   🔄 {t.btn.reassignAppointment}
//                 </button>
//               </div>
//             </>
//           )}
          
//           <div className="modal-actions" style={{ marginTop: '15px' }}>
//             <button
//               className="btn-secondary"
//               onClick={() => {
//                 setShowAppointments(false);
//                 setSelectedAppointment(null);
//               }}
//             >
//               {t.btn.close}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderReassignModal = () => {
//     if (!showReassign) return null;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal doctor-reassign-modal">
//           <h3>🔄 {t.titleReassign}</h3>
          
//           <div className="form-group">
//             <label>{t.label.newDoctor}</label>
//             <select
//               value={reassignDoctorId}
//               onChange={(e) => setReassignDoctorId(e.target.value)}
//             >
//               <option value="">{t.prompt.selectDoctor}</option>
//               {doctors.map(doctor => (
//                 <option key={doctor.id} value={doctor.id}>
//                   {doctor.fullName} ({doctor.specialty})
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowReassign(false)}
//             >
//               {t.btn.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleReassignAppointment}
//               disabled={!reassignDoctorId}
//             >
//               ✅ {t.btn.assign}
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
//       <div className="doctor-container">
//         {/* Header */}
//         <div className="doctor-header">
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div>
//               <h2>👨‍⚕️ {t.title}</h2>
//               <div className="underline"></div>
//             </div>
//             <button
//               onClick={onClose}
//               style={{
//                 background: '#e2e8f0',
//                 border: 'none',
//                 padding: '8px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//               }}
//             >
//               ✕ {t.btn.close}
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         {renderStats()}

//         {/* Tools Wrapper (Buttons + Search) */}
//         <div className="doctor-tools-wrapper">
//           {renderButtonsRow()}
//           {renderSearchTools()}
//         </div>

//         {/* Content */}
//         <div className="doctor-content">
//           {loading ? (
//             <div className="doctor-loading">⏳ Loading...</div>
//           ) : (
//             viewMode === 'table' ? renderTable() : renderCards()
//           )}
//         </div>

//         {/* Status Bar */}
//         {renderStatusBar()}

//         {/* Modals */}
//         {renderDoctorFormModal()}
//         {renderChangePasswordModal()}
//         {renderAppointmentsModal()}
//         {renderReassignModal()}
//       </div>
//     </>
//   );
// };

// export default DoctorManagementScreen; 02072026 V3

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .doctor-container {
//     padding: 20px;
//     background: #f0f4f8;
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .doctor-header {
//     margin-bottom: 20px;
//   }
//   .doctor-header h2 {
//     font-size: 28px;
//     font-weight: bold;
//     color: #1a202c;
//     margin: 0 0 5px 0;
//   }
//   .doctor-header .underline {
//     height: 3px;
//     width: 60px;
//     background: linear-gradient(to right, #4299e1, #2b6cb0);
//     border-radius: 2px;
//   }
//   .doctor-stats {
//     display: flex;
//     gap: 15px;
//     margin-bottom: 15px;
//     flex-wrap: wrap;
//   }
//   .doctor-stat-card {
//     background: white;
//     padding: 15px 20px;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border-left: 4px solid #4299e1;
//     min-width: 150px;
//     flex: 1;
//     max-width: 200px;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-stat-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .doctor-stat-card .icon { font-size: 24px; }
//   .doctor-stat-card .value { font-size: 24px; font-weight: bold; color: #4299e1; }
//   .doctor-stat-card .label { font-size: 12px; color: #718096; }
//   .doctor-tools-wrapper {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     margin-bottom: 15px;
//   }
//   .doctor-buttons-row {
//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;
//     align-items: center;
//   }
//   .doctor-buttons-row button {
//     padding: 8px 20px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     min-width: 120px;
//   }
//   .doctor-buttons-row button:hover:not(:disabled) {
//     transform: scale(1.05);
//   }
//   .doctor-buttons-row button:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
//   .doctor-search-tools {
//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;
//     align-items: center;
//   }
//   .doctor-search-box {
//     display: flex;
//     align-items: center;
//     background: white;
//     border-radius: 25px;
//     border: 1px solid #e2e8f0;
//     padding: 5px 15px;
//     flex: 1;
//     min-width: 200px;
//   }
//   .doctor-search-box input {
//     border: none;
//     outline: none;
//     padding: 8px 5px;
//     font-size: 14px;
//     flex: 1;
//     background: transparent;
//   }
//   .doctor-search-box .search-icon {
//     font-size: 14px;
//     color: #a0aec0;
//   }
//   .doctor-view-toggle {
//     display: flex;
//     gap: 5px;
//   }
//   .doctor-view-toggle button {
//     padding: 6px 15px;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     background: white;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//   }
//   .doctor-view-toggle button.active {
//     background: #4299e1;
//     color: white;
//     border-color: #4299e1;
//   }
//   .doctor-view-toggle button:hover:not(.active) {
//     background: #f7fafc;
//   }
//   .doctor-content {
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     overflow: hidden;
//     min-height: 400px;
//     position: relative;
//   }
//   .doctor-table-wrapper {
//     overflow-x: auto;
//   }
//   .doctor-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .doctor-table th {
//     padding: 12px 15px;
//     text-align: left;
//     background: #f8f9fa;
//     font-weight: bold;
//     color: #2d3748;
//     border-bottom: 2px solid #e2e8f0;
//   }
//   .doctor-table td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #edf2f7;
//   }
//   .doctor-table tr:hover td {
//     background: #f7fafc;
//   }
//   .doctor-table tr.selected td {
//     background: #ebf8ff;
//   }
//   .doctor-table .password-mask {
//     color: #718096;
//     font-family: monospace;
//   }
//   .doctor-card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//     gap: 15px;
//     padding: 15px;
//   }
//   .doctor-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #edf2f7;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-card:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .doctor-card.selected {
//     background: #fc8181;
//     border-color: #e53e3e;
//     color: white;
//   }
//   .doctor-card.selected .card-text {
//     color: white !important;
//   }
//   .doctor-card .card-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 8px;
//   }
//   .doctor-card .card-id {
//     background: #4299e1;
//     color: white;
//     padding: 2px 12px;
//     border-radius: 12px;
//     font-size: 12px;
//     font-weight: bold;
//   }
//   .doctor-card .card-name {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2d3748;
//   }
//   .doctor-card .card-specialty {
//     font-size: 13px;
//     color: #4a5568;
//   }
//   .doctor-card .card-details {
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//     margin-top: 8px;
//     font-size: 13px;
//     color: #4a5568;
//   }
//   .doctor-card .card-actions {
//     margin-top: 10px;
//     display: flex;
//     gap: 5px;
//   }
//   .doctor-card .card-actions button {
//     padding: 4px 12px;
//     border: none;
//     border-radius: 6px;
//     font-size: 12px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-card .card-actions button:hover {
//     transform: scale(1.05);
//   }
//   .doctor-status-bar {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 8px 15px;
//     background: #f7fafc;
//     border-top: 1px solid #e2e8f0;
//     font-size: 13px;
//     color: #4a5568;
//   }
//   .doctor-status-bar .status-msg {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }
//   .doctor-loading {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     font-size: 18px;
//     color: #a0aec0;
//   }
//   .doctor-empty {
//     text-align: center;
//     padding: 40px;
//     color: #a0aec0;
//   }
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
//     border-radius: 12px;
//     padding: 25px;
//     max-width: 500px;
//     width: 95%;
//     max-height: 90vh;
//     overflow-y: auto;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   }
//   .doctor-modal h3 {
//     margin: 0 0 15px 0;
//     color: #2d3748;
//   }
//   .doctor-modal .form-group {
//     margin-bottom: 15px;
//   }
//   .doctor-modal .form-group label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
//     color: #2d3748;
//   }
//   .doctor-modal .form-group input {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//     transition: border-color 0.2s;
//   }
//   .doctor-modal .form-group input:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .doctor-modal .modal-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }
//   .doctor-modal .modal-actions button {
//     padding: 8px 30px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-modal .modal-actions button:hover {
//     transform: scale(1.05);
//   }
//   .doctor-modal .modal-actions .btn-primary {
//     background: #48bb78;
//     color: white;
//   }
//   .doctor-modal .modal-actions .btn-primary:disabled {
//     background: #a0aec0;
//     cursor: not-allowed;
//   }
//   .doctor-modal .modal-actions .btn-secondary {
//     background: #e2e8f0;
//     color: #4a5568;
//   }
//   .doctor-appointments-modal {
//     max-width: 800px;
//   }
//   .doctor-appointments-modal .appt-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .doctor-appointments-modal .appt-table th {
//     padding: 10px;
//     text-align: left;
//     background: #f8f9fa;
//     border-bottom: 2px solid #e2e8f0;
//   }
//   .doctor-appointments-modal .appt-table td {
//     padding: 8px 10px;
//     border-bottom: 1px solid #edf2f7;
//   }
//   .doctor-appointments-modal .appt-table tr:hover td {
//     background: #f7fafc;
//   }
//   .doctor-appointments-modal .appt-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: center;
//     margin-top: 15px;
//   }
//   .doctor-reassign-modal {
//     max-width: 450px;
//   }
//   .doctor-reassign-modal select {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//   }
//   .doctor-reassign-modal select:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .doctor-change-password-modal {
//     max-width: 450px;
//   }
// `;

// // ---------- Data Classes ----------
// class DoctorRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.firstName = data.firstName || '';
//     this.middleName = data.middleName || '';
//     this.lastName = data.lastName || '';
//     this.specialty = data.specialty || '';
//     this.email = data.email || '';
//     this.phone = data.phone || '';
//     this.username = data.username || '';
//     this.password = data.password || '';
//     this.fullName = `${this.firstName} ${this.middleName} ${this.lastName}`.trim();
//   }
  

//   static fromJson(json) {
//     return new DoctorRow({
//       id: json.id || 0,
//       firstName: json.firstName || '',
//       middleName: json.middleName || '',
//       lastName: json.lastName || '',
//       specialty: json.specialty || '',
//       email: json.email || '',
//       phone: json.phone || '',
//       username: json.username || '',
//       password: json.password || '',
//     });
//   }
// }

// class AppointmentRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.patientName = data.patientName || '';
//     this.appointmentTime = data.appointmentTime || '';
//     this.notes = data.notes || '';
//   }

//   static fromJson(json) {
//     return new AppointmentRow({
//       id: json.id || 0,
//       patientName: json.patientName || json.patient?.fullName || '',
//       appointmentTime: json.appointmentTime || '',
//       notes: json.notes || '',
//     });
//   }
// }

// // ---------- Main Component ----------
// const DoctorManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const t = React.useMemo(() => {
//     const translations = {
//       en: {
//         title: 'Doctor Management',
//         stat: { total: 'Total Doctors' },
//         search: { placeholder: 'Search doctors...' },
//         btn: {
//           table: 'Table',
//           cards: 'Cards',
//           refresh: 'Refresh',
//           add: 'Add Doctor',
//           update: 'Update',
//           delete: 'Delete',
//           viewAppointments: 'View Appointments',
//           changePassword: 'Change Password',
//           save: 'Save',
//           yes: 'Yes',
//           no: 'No',
//           assign: 'Assign',
//           deleteAppointment: 'Delete Appointment',
//           reassignAppointment: 'Reassign',
//           close: 'Close',
//         },
//         col: {
//           id: 'ID',
//           firstName: 'First Name',
//           middleName: 'Middle Name',
//           lastName: 'Last Name',
//           specialty: 'Specialty',
//           email: 'Email',
//           phone: 'Phone',
//           username: 'Username',
//           password: 'Password',
//           patient: 'Patient',
//           time: 'Time',
//           notes: 'Notes',
//         },
//         label: {
//           firstName: 'First Name',
//           middleName: 'Middle Name',
//           lastName: 'Last Name',
//           specialty: 'Specialty',
//           email: 'Email',
//           phone: 'Phone',
//           username: 'Username',
//           password: 'Password',
//           oldPassword: 'Old Password',
//           newPassword: 'New Password',
//           confirmPassword: 'Confirm Password',
//           newDoctor: 'New Doctor',
//           noDoctors: 'No doctors found',
//           showing: 'Showing',
//           records: 'records',
//         },
//         titleAddDoctor: 'Add Doctor',
//         titleUpdateDoctor: 'Update Doctor',
//         titleChangePassword: 'Change Password',
//         titleDoctorAppointments: 'Appointments',
//         titleReassign: 'Reassign Appointment',
//         alert: {
//           selectDoctor: 'Please select a doctor first',
//           selectAppointment: 'Please select an appointment first',
//           fillAllFields: 'Please fill all required fields',
//           invalidFirstName: 'First name must be at least 3 letters',
//           invalidLastName: 'Last name must be at least 3 letters',
//           invalidPassword: 'Password must be at least 6 characters',
//           invalidEmail: 'Please enter a valid email',
//           invalidPhone: 'Phone must be 7-15 digits',
//           saved: 'Doctor saved successfully',
//           deleted: 'Doctor deleted successfully',
//           errorSaveDoctor: 'Error saving doctor',
//           errorDeleteDoctor: 'Error deleting doctor',
//           errorLoadDoctors: 'Error loading doctors',
//           passwordChanged: 'Password changed successfully',
//           errorChangePassword: 'Error changing password',
//           passwordMismatch: 'Passwords do not match',
//           appointmentDeleted: 'Appointment deleted successfully',
//           errorDeleteAppointment: 'Error deleting appointment',
//           appointmentReassigned: 'Appointment reassigned successfully',
//           errorReassignAppointment: 'Error reassigning appointment',
//           errorFetchAppointments: 'Error fetching appointments',
//           errorFetchDoctors: 'Error fetching doctors',
//         },
//         confirm: {
//           delete: { title: 'Confirm Delete', content: 'Are you sure you want to delete this doctor?' },
//         },
//         status: {
//           ready: 'Ready',
//           refreshing: 'Refreshing...',
//           selected: 'Selected',
//           added: 'Added successfully',
//           updated: 'Updated successfully',
//           deleted: 'Deleted successfully',
//           passwordChanged: 'Password changed successfully',
//           reassigned: 'Reassigned successfully',
//         },
//         prompt: { selectDoctor: 'Select a doctor' },
//         msg: {
//           confirmClose: 'Are you sure you want to close this screen?',
//         },
//       },
//       ar: {
//         title: 'إدارة الأطباء',
//         stat: { total: 'إجمالي الأطباء' },
//         search: { placeholder: 'بحث عن الأطباء...' },
//         btn: {
//           table: 'جدول',
//           cards: 'بطاقات',
//           refresh: 'تحديث',
//           add: 'إضافة طبيب',
//           update: 'تعديل',
//           delete: 'حذف',
//           viewAppointments: 'عرض المواعيد',
//           changePassword: 'تغيير كلمة المرور',
//           save: 'حفظ',
//           yes: 'نعم',
//           no: 'لا',
//           assign: 'تعيين',
//           deleteAppointment: 'حذف الموعد',
//           reassignAppointment: 'إعادة تعيين',
//           close: 'إغلاق',
//         },
//         col: {
//           id: 'الرقم',
//           firstName: 'الاسم الأول',
//           middleName: 'الاسم الأوسط',
//           lastName: 'الاسم الأخير',
//           specialty: 'التخصص',
//           email: 'البريد الإلكتروني',
//           phone: 'الهاتف',
//           username: 'اسم المستخدم',
//           password: 'كلمة المرور',
//           patient: 'المريض',
//           time: 'الوقت',
//           notes: 'ملاحظات',
//         },
//         label: {
//           firstName: 'الاسم الأول',
//           middleName: 'الاسم الأوسط',
//           lastName: 'الاسم الأخير',
//           specialty: 'التخصص',
//           email: 'البريد الإلكتروني',
//           phone: 'الهاتف',
//           username: 'اسم المستخدم',
//           password: 'كلمة المرور',
//           oldPassword: 'كلمة المرور القديمة',
//           newPassword: 'كلمة المرور الجديدة',
//           confirmPassword: 'تأكيد كلمة المرور',
//           newDoctor: 'طبيب جديد',
//           noDoctors: 'لا يوجد أطباء',
//           showing: 'عرض',
//           records: 'سجلات',
//         },
//         titleAddDoctor: 'إضافة طبيب',
//         titleUpdateDoctor: 'تعديل طبيب',
//         titleChangePassword: 'تغيير كلمة المرور',
//         titleDoctorAppointments: 'المواعيد',
//         titleReassign: 'إعادة تعيين الموعد',
//         alert: {
//           selectDoctor: 'يرجى اختيار طبيب أولاً',
//           selectAppointment: 'يرجى اختيار موعد أولاً',
//           fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',
//           invalidFirstName: 'الاسم الأول يجب أن يكون 3 أحرف على الأقل',
//           invalidLastName: 'الاسم الأخير يجب أن يكون 3 أحرف على الأقل',
//           invalidPassword: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
//           invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
//           invalidPhone: 'الهاتف يجب أن يكون 7-15 رقم',
//           saved: 'تم حفظ الطبيب بنجاح',
//           deleted: 'تم حذف الطبيب بنجاح',
//           errorSaveDoctor: 'خطأ في حفظ الطبيب',
//           errorDeleteDoctor: 'خطأ في حذف الطبيب',
//           errorLoadDoctors: 'خطأ في تحميل الأطباء',
//           passwordChanged: 'تم تغيير كلمة المرور بنجاح',
//           errorChangePassword: 'خطأ في تغيير كلمة المرور',
//           passwordMismatch: 'كلمات المرور غير متطابقة',
//           appointmentDeleted: 'تم حذف الموعد بنجاح',
//           errorDeleteAppointment: 'خطأ في حذف الموعد',
//           appointmentReassigned: 'تم إعادة تعيين الموعد بنجاح',
//           errorReassignAppointment: 'خطأ في إعادة تعيين الموعد',
//           errorFetchAppointments: 'خطأ في جلب المواعيد',
//           errorFetchDoctors: 'خطأ في جلب الأطباء',
//         },
//         confirm: {
//           delete: { title: 'تأكيد الحذف', content: 'هل أنت متأكد من حذف هذا الطبيب؟' },
//         },
//         status: {
//           ready: 'جاهز',
//           refreshing: 'جاري التحديث...',
//           selected: 'تم الاختيار',
//           added: 'تمت الإضافة بنجاح',
//           updated: 'تم التعديل بنجاح',
//           deleted: 'تم الحذف بنجاح',
//           passwordChanged: 'تم تغيير كلمة المرور بنجاح',
//           reassigned: 'تم إعادة التعيين بنجاح',
//         },
//         prompt: { selectDoctor: 'اختر طبيباً' },
//         msg: {
//           confirmClose: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
//         },
//       },
//     };
//     return translations[lang] || translations.en;
//   }, [lang]);

//   // ---------- State ----------
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [viewMode, setViewMode] = useState('table');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [stats, setStats] = useState({ total: 0 });
  
//   // Modal states
//   const [showDoctorForm, setShowDoctorForm] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [showReassign, setShowReassign] = useState(false);
//   const [editingDoctor, setEditingDoctor] = useState(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [appointments, setAppointments] = useState([]);
  
//   // Form states
//   const [formData, setFormData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     specialty: '',
//     email: '',
//     phone: '',
//     username: '',
//     password: '',
//   });
  
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
  
//   const [reassignDoctorId, setReassignDoctorId] = useState('');

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
//  const loadDoctors = useCallback(async () => {
//   setLoading(true);
//   setStatusMsg(`⏳ ${t.status.refreshing}`);

//   try {
//     const res = await fetch(`${BASE_URL}/api/doctors`);
//     if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
//     const data = await res.json();
//     const doctorsData = Array.isArray(data) ? data : [data];
    
//     // Log the raw data to see what's coming from the API
//     //console.log('📥 Raw doctor data from API:', doctorsData);
    
//     const parsedDoctors = doctorsData.map(item => {
//       // Log each doctor's password
//       //console.log(`Doctor ${item.username} password:`, item.password);
//       return DoctorRow.fromJson(item);
//     });
    
//     setDoctors(parsedDoctors);
//     setFilteredDoctors(parsedDoctors);
//     setStats({ total: parsedDoctors.length });
    
//     setStatusMsg(`✅ ${t.status.ready} (${parsedDoctors.length} ${t.label.records})`);
//   } catch (err) {
//     //console.error('🚨 Load error:', err);
//     setStatusMsg(`❌ ${t.alert.errorLoadDoctors}: ${err.message}`);
//     setDoctors([]);
//     setFilteredDoctors([]);
//   } finally {
//     setLoading(false);
//   }
// }, [t]);

//   const saveDoctor = useCallback(async (doctorData) => {
//     try {
//       const isUpdate = !!editingDoctor;
//       const url = isUpdate 
//         ? `${BASE_URL}/api/doctors/${editingDoctor.id}`
//         : `${BASE_URL}/api/doctors`;
      
//       // ✅ Ensure all required fields are sent
//       const payload = {
//         firstName: doctorData.firstName.trim(),
//         middleName: doctorData.middleName ? doctorData.middleName.trim() : '',
//         lastName: doctorData.lastName.trim(),
//         specialty: doctorData.specialty.trim(),
//         email: doctorData.email.trim(),
//         phone: doctorData.phone.trim(),
//         username: doctorData.username.trim(),
//         password: doctorData.password.trim(),
//       };

//       //console.log('📤 Sending doctor payload:', payload);

//       const res = await fetch(url, {
//         method: isUpdate ? 'PUT' : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       // ✅ Read error response body for debugging
//       let responseBody;
//       try {
//         responseBody = await res.json();
//       } catch {
//         responseBody = await res.text();
//       }

//       if (!res.ok) {
//         //console.error('❌ Server error response:', responseBody);
//         // If responseBody is an object with a message, show that
//         const errorMessage = typeof responseBody === 'object' && responseBody.message
//           ? responseBody.message
//           : typeof responseBody === 'string'
//           ? responseBody
//           : `HTTP ${res.status}`;
//         throw new Error(errorMessage);
//       }

//       alert(t.alert.saved);
//       setShowDoctorForm(false);
//       setEditingDoctor(null);
//       loadDoctors();
//       logAction(isUpdate ? 'UPDATE_DOCTOR' : 'ADD_DOCTOR', 
//         `${isUpdate ? 'Updated' : 'Added'} doctor: ${payload.firstName} ${payload.lastName}`);
//       setStatusMsg(`✅ ${isUpdate ? t.status.updated : t.status.added}`);
//     } catch (err) {
//       //console.error('🚨 Save error:', err);
//       alert(`Error: ${err.message}`);
//     }
//   }, [editingDoctor, loadDoctors, t, logAction]);

//   const deleteDoctor = useCallback(async (doctorId) => {
//     if (!window.confirm(t.confirm.delete.content)) return;
    
//     try {
//       const res = await fetch(`${BASE_URL}/api/doctors/${doctorId}`, {
//         method: 'DELETE',
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.alert.deleted);
//       setSelectedDoctor(null);
//       loadDoctors();
//       logAction('DELETE_DOCTOR', `Deleted doctor ID: ${doctorId}`);
//       setStatusMsg(`🗑️ ${t.status.deleted}`);
//     } catch (err) {
//       //console.error('🚨 Delete error:', err);
//       alert(`${t.alert.errorDeleteDoctor}: ${err.message}`);
//     }
//   }, [loadDoctors, t, logAction]);

//  const changePassword = useCallback(async (username, oldPassword, newPassword) => {
//   try {
//     // ✅ Validate inputs before sending
//     if (!oldPassword.trim() || !newPassword.trim()) {
//       alert('Old password and new password are required');
//       return;
//     }
//     if (newPassword.length < 6) {
//       alert('New password must be at least 6 characters');
//       return;
//     }

//     const payload = { username, oldPassword, newPassword };
//     //console.log('📤 Sending password change payload:', payload);

//     const res = await fetch(`${BASE_URL}/api/doctors/change-password`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     // ✅ Read the response body once and store it
//     let responseBody;
//     const contentType = res.headers.get('content-type');
    
//     if (contentType && contentType.includes('application/json')) {
//       responseBody = await res.json();
//     } else {
//       responseBody = await res.text();
//     }

//     if (!res.ok) {
//       //console.error('❌ Server error response:', responseBody);
//       // If responseBody is an object with a message, show that
//       const errorMessage = typeof responseBody === 'object' && responseBody.message
//         ? responseBody.message
//         : typeof responseBody === 'string'
//         ? responseBody
//         : `HTTP ${res.status}`;
//       throw new Error(errorMessage);
//     }

//     // ✅ Success - show result alert
//     alert(`✅ ${t.alert.passwordChanged}`);
    
//     // ✅ Close modal and reset form
//     setShowChangePassword(false);
//     setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    
//     // ✅ Update status bar
//     setStatusMsg(`✅ ${t.status.passwordChanged}`);
    
//     // ✅ Log action
//     logAction('CHANGE_PASSWORD', `Changed password for doctor: ${username}`);
    
//     // ✅ Refresh doctor list to get updated data
//     loadDoctors();
    
//   } catch (err) {
//     //console.error('🚨 Password change error:', err);
//     alert(`❌ Error: ${err.message}`);
//     setStatusMsg(`❌ Error: ${err.message}`);
//   }
// }, [t, logAction, loadDoctors]);

//   const loadAppointments = useCallback(async (doctorId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/appointments/doctor/${doctorId}`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const appointmentsData = Array.isArray(data) ? data : [data];
      
//       const parsedAppointments = appointmentsData.map(item => AppointmentRow.fromJson(item));
//       setAppointments(parsedAppointments);
//     } catch (err) {
//       //console.error('🚨 Load appointments error:', err);
//       alert(t.alert.errorFetchAppointments);
//     }
//   }, [t]);

//   const deleteAppointment = useCallback(async (appointmentId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}`, {
//         method: 'DELETE',
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.alert.appointmentDeleted);
//       setAppointments(prev => prev.filter(a => a.id !== appointmentId));
//       setSelectedAppointment(null);
//       logAction('DELETE_APPOINTMENT', `Deleted appointment ID: ${appointmentId}`);
//     } catch (err) {
//       //console.error('🚨 Delete appointment error:', err);
//       alert(t.alert.errorDeleteAppointment);
//     }
//   }, [t, logAction]);

//   const reassignAppointment = useCallback(async (appointmentId, newDoctorId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}/reassign`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ doctorId: newDoctorId }),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       alert(t.alert.appointmentReassigned);
//       setShowReassign(false);
//       setSelectedAppointment(null);
//       setReassignDoctorId('');
//       loadAppointments(selectedDoctor.id);
//       logAction('REASSIGN_APPOINTMENT', `Reassigned appointment ${appointmentId} to doctor ${newDoctorId}`);
//       setStatusMsg(`✅ ${t.status.reassigned}`);
//     } catch (err) {
//       //console.error('🚨 Reassign error:', err);
//       alert(t.alert.errorReassignAppointment);
//     }
//   }, [selectedDoctor, loadAppointments, t, logAction]);

//   // ---------- Handlers ----------
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
    
//     if (query.trim() === '') {
//       setFilteredDoctors(doctors);
//       return;
//     }
    
//     const filtered = doctors.filter(doctor => {
//       return (
//         doctor.firstName.toLowerCase().includes(query) ||
//         doctor.lastName.toLowerCase().includes(query) ||
//         doctor.specialty.toLowerCase().includes(query) ||
//         doctor.email.toLowerCase().includes(query) ||
//         doctor.username.toLowerCase().includes(query) ||
//         doctor.fullName.toLowerCase().includes(query)
//       );
//     });
    
//     setFilteredDoctors(filtered);
//   };

//   const handleSelectDoctor = (doctor) => {
//     setSelectedDoctor(doctor);
//     setStatusMsg(`✅ ${t.status.selected}: ${doctor.fullName}`);
//   };

//   const handleAddDoctor = () => {
//     setEditingDoctor(null);
//     setFormData({
//       firstName: '',
//       middleName: '',
//       lastName: '',
//       specialty: '',
//       email: '',
//       phone: '',
//       username: '',
//       password: '',
//     });
//     setShowDoctorForm(true);
//   };

//   const handleEditDoctor = () => {
//     if (!selectedDoctor) {
//       alert(t.alert.selectDoctor);
//       return;
//     }
//     setEditingDoctor(selectedDoctor);
//     setFormData({
//       firstName: selectedDoctor.firstName,
//       middleName: selectedDoctor.middleName,
//       lastName: selectedDoctor.lastName,
//       specialty: selectedDoctor.specialty,
//       email: selectedDoctor.email,
//       phone: selectedDoctor.phone,
//       username: selectedDoctor.username,
//       password: selectedDoctor.password,
//     });
//     setShowDoctorForm(true);
//   };

//   const handleDeleteDoctor = () => {
//     if (!selectedDoctor) {
//       alert(t.alert.selectDoctor);
//       return;
//     }
//     deleteDoctor(selectedDoctor.id);
//   };

//   const handleViewAppointments = () => {
//     if (!selectedDoctor) {
//       alert(t.alert.selectDoctor);
//       return;
//     }
//     loadAppointments(selectedDoctor.id);
//     setShowAppointments(true);
//   };

//  const handleChangePassword = () => {
//   if (!selectedDoctor) {
//     alert(t.alert.selectDoctor);
//     return;
//   }
  
//   // Debug: Check what password is stored
//   //console.log('📋 Selected doctor full data:', selectedDoctor);
//   //console.log('🔑 Selected doctor password:', selectedDoctor.password);
  
//   setPasswordData({
//     oldPassword: selectedDoctor.password || '', // Auto-fill from selected doctor
//     newPassword: '',
//     confirmPassword: '',
//   });
//   setShowChangePassword(true);
// };

//   const handleSaveDoctor = () => {
//     const { firstName, lastName, specialty, email, phone, username, password } = formData;
    
//     // Validation
//     if (!firstName.trim() || !lastName.trim() || !specialty.trim() || 
//         !email.trim() || !phone.trim() || !username.trim() || !password.trim()) {
//       alert(t.alert.fillAllFields);
//       return;
//     }
    
//     if (firstName.length < 3) {
//       alert(t.alert.invalidFirstName);
//       return;
//     }
    
//     if (lastName.length < 3) {
//       alert(t.alert.invalidLastName);
//       return;
//     }
    
//     if (password.length < 6) {
//       alert(t.alert.invalidPassword);
//       return;
//     }
    
//     if (!email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/)) {
//       alert(t.alert.invalidEmail);
//       return;
//     }
    
//     if (!phone.match(/^\d{7,15}$/)) {
//       alert(t.alert.invalidPhone);
//       return;
//     }
    
//     saveDoctor(formData);
//   };

//   const handleSavePassword = () => {
//     const { oldPassword, newPassword, confirmPassword } = passwordData;
    
//     // Client-side validation before sending
//     if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
//       alert(t.alert.fillAllFields);
//       return;
//     }
    
//     if (newPassword !== confirmPassword) {
//       alert(t.alert.passwordMismatch);
//       return;
//     }
    
//     if (newPassword.length < 6) {
//       alert(t.alert.invalidPassword);
//       return;
//     }
    
//     changePassword(selectedDoctor.username, oldPassword, newPassword);
//   };

//   const handleReassignAppointment = () => {
//     if (!selectedAppointment) {
//       alert(t.alert.selectAppointment);
//       return;
//     }
//     if (!reassignDoctorId) {
//       alert(t.alert.selectDoctor);
//       return;
//     }
//     reassignAppointment(selectedAppointment.id, parseInt(reassignDoctorId));
//   };

//   const handleViewToggle = (mode) => {
//     setViewMode(mode);
//   };

//   // ---------- Effects ----------
//   useEffect(() => {
//     loadDoctors();
//   }, [loadDoctors]);

//   // ---------- Render Helpers ----------
//   const renderStats = () => {
//     return (
//       <div className="doctor-stats">
//         <div className="doctor-stat-card">
//           <div className="icon">👥</div>
//           <div className="value">{stats.total}</div>
//           <div className="label">{t.stat.total}</div>
//         </div>
//       </div>
//     );
//   };

//   const renderButtonsRow = () => {
//     return (
//       <div className="doctor-buttons-row">
//         <button
//           onClick={handleAddDoctor}
//           style={{ background: '#48bb78', color: 'white' }}
//         >
//           ➕ {t.btn.add}
//         </button>
//         <button
//           onClick={handleEditDoctor}
//           disabled={!selectedDoctor}
//           style={{ background: '#4299e1', color: 'white' }}
//         >
//           ✏️ {t.btn.update}
//         </button>
//         <button
//           onClick={handleDeleteDoctor}
//           disabled={!selectedDoctor}
//           style={{ background: '#fc8181', color: 'white' }}
//         >
//           🗑️ {t.btn.delete}
//         </button>
//         <button
//           onClick={handleViewAppointments}
//           disabled={!selectedDoctor}
//           style={{ background: '#805ad5', color: 'white' }}
//         >
//           📋 {t.btn.viewAppointments}
//         </button>
//         <button
//           onClick={handleChangePassword}
//           disabled={!selectedDoctor}
//           style={{ background: '#ed8936', color: 'white' }}
//         >
//           🔑 {t.btn.changePassword}
//         </button>
//       </div>
//     );
//   };

//   const renderSearchTools = () => {
//     return (
//       <div className="doctor-search-tools">
//         <div className="doctor-search-box">
//           <span className="search-icon">🔍</span>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder={t.search.placeholder}
//           />
//         </div>
        
//         <div className="doctor-view-toggle">
//           <button
//             className={viewMode === 'table' ? 'active' : ''}
//             onClick={() => handleViewToggle('table')}
//           >
//             📋 {t.btn.table}
//           </button>
//           <button
//             className={viewMode === 'cards' ? 'active' : ''}
//             onClick={() => handleViewToggle('cards')}
//           >
//             🃏 {t.btn.cards}
//           </button>
//         </div>
        
//         <button
//           onClick={loadDoctors}
//           style={{
//             background: '#4299e1',
//             color: 'white',
//             border: 'none',
//             borderRadius: '8px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           🔄 {t.btn.refresh}
//         </button>
//       </div>
//     );
//   };

//   const renderTable = () => {
//     if (filteredDoctors.length === 0) {
//       return <div className="doctor-empty">📭 {t.label.noDoctors}</div>;
//     }
    
//     return (
//       <div className="doctor-table-wrapper">
//         <table className="doctor-table">
//           <thead>
//             <tr>
//               <th>{t.col.id}</th>
//               <th>{t.col.firstName}</th>
//               <th>{t.col.middleName}</th>
//               <th>{t.col.lastName}</th>
//               <th>{t.col.specialty}</th>
//               <th>{t.col.email}</th>
//               <th>{t.col.phone}</th>
//               <th>{t.col.username}</th>
//               <th>{t.col.password}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredDoctors.map(doctor => (
//               <tr
//                 key={doctor.id}
//                 className={selectedDoctor?.id === doctor.id ? 'selected' : ''}
//                 onClick={() => handleSelectDoctor(doctor)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <td>{doctor.id}</td>
//                 <td>{doctor.firstName}</td>
//                 <td>{doctor.middleName}</td>
//                 <td>{doctor.lastName}</td>
//                 <td>{doctor.specialty}</td>
//                 <td>{doctor.email}</td>
//                 <td>{doctor.phone}</td>
//                 <td>{doctor.username}</td>
//                 <td className="password-mask">****</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderCards = () => {
//     if (filteredDoctors.length === 0) {
//       return <div className="doctor-empty">📭 {t.label.noDoctors}</div>;
//     }
    
//     return (
//       <div className="doctor-card-grid">
//         {filteredDoctors.map(doctor => (
//           <div
//             key={doctor.id}
//             className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
//             onClick={() => handleSelectDoctor(doctor)}
//           >
//             <div className="card-header">
//               <span className="card-id">#{doctor.id}</span>
//               <span className="card-name">{doctor.fullName}</span>
//             </div>
//             <div className="card-specialty">🩺 {doctor.specialty}</div>
//             <div className="card-details">
//               <div>📧 {doctor.email}</div>
//               <div>📱 {doctor.phone}</div>
//               <div>👤 {doctor.username}</div>
//             </div>
//             <div className="card-actions">
//               <button
//                 style={{ background: '#4299e1', color: 'white' }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedDoctor(doctor);
//                   loadAppointments(doctor.id);
//                   setShowAppointments(true);
//                 }}
//               >
//                 📋 {t.btn.viewAppointments}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderStatusBar = () => {
//     return (
//       <div className="doctor-status-bar">
//         <div className="status-msg">
//           {statusMsg}
//         </div>
//         <div>
//           🕐 {new Date().toLocaleTimeString()}
//         </div>
//       </div>
//     );
//   };

//   // ---------- Modals ----------
//   const renderDoctorFormModal = () => {
//     if (!showDoctorForm) return null;
    
//     const isEdit = !!editingDoctor;
//     const modalTitle = isEdit ? `✏️ ${t.titleUpdateDoctor}` : `➕ ${t.titleAddDoctor}`;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal">
//           <h3>{modalTitle}</h3>
          
//           <div className="form-group">
//             <label>{t.label.firstName}</label>
//             <input
//               type="text"
//               value={formData.firstName}
//               onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.middleName}</label>
//             <input
//               type="text"
//               value={formData.middleName}
//               onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.lastName}</label>
//             <input
//               type="text"
//               value={formData.lastName}
//               onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.specialty}</label>
//             <input
//               type="text"
//               value={formData.specialty}
//               onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.email}</label>
//             <input
//               type="text"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.phone}</label>
//             <input
//               type="text"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.username}</label>
//             <input
//               type="text"
//               value={formData.username}
//               onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.password}</label>
//             <input
//               type="password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             />
//           </div>
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowDoctorForm(false)}
//             >
//               {t.btn.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleSaveDoctor}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// const renderChangePasswordModal = () => {
//   if (!showChangePassword) return null;
  
//   return (
//     <div className="doctor-modal-overlay">
//       <div className="doctor-modal doctor-change-password-modal">
//         <h3>🔑 {t.titleChangePassword}</h3>
        
//         <div className="form-group">
//           <label>Doctor</label>
//           <div style={{ 
//             padding: '10px 15px', 
//             background: '#f7fafc', 
//             borderRadius: '8px',
//             color: '#2d3748',
//             fontWeight: 'bold'
//           }}>
//             {selectedDoctor?.fullName} ({selectedDoctor?.username})
//           </div>
//         </div>
        
//         <div className="form-group">
//           <label>{t.label.oldPassword}</label>
//           <input
//             type="text" // Use text to see the actual password
//             value={passwordData.oldPassword}
//             readOnly
//             style={{ 
//               backgroundColor: '#f7fafc', 
//               cursor: 'not-allowed',
//               color: '#718096'
//             }}
//           />
//           <div style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
//             ℹ️ Auto-filled from system (read-only)
//           </div>
//         </div>
        
//         <div className="form-group">
//           <label>{t.label.newPassword}</label>
//           <input
//             type="password"
//             value={passwordData.newPassword}
//             onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//             placeholder="Enter new password (min 6 characters)"
//           />
//         </div>
        
//         <div className="form-group">
//           <label>{t.label.confirmPassword}</label>
//           <input
//             type="password"
//             value={passwordData.confirmPassword}
//             onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//             placeholder="Confirm new password"
//           />
//         </div>
        
//         <div className="modal-actions">
//           <button
//             className="btn-secondary"
//             onClick={() => {
//               setShowChangePassword(false);
//               setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
//             }}
//           >
//             {t.btn.close}
//           </button>
//           <button
//             className="btn-primary"
//             onClick={handleSavePassword}
//           >
//             💾 {t.btn.save}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

//   const renderAppointmentsModal = () => {
//     if (!showAppointments) return null;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal doctor-appointments-modal">
//           <h3>📋 {t.titleDoctorAppointments} - {selectedDoctor?.fullName}</h3>
          
//           {appointments.length === 0 ? (
//             <div className="doctor-empty">📭 No appointments found</div>
//           ) : (
//             <>
//               <div className="doctor-table-wrapper">
//                 <table className="appt-table">
//                   <thead>
//                     <tr>
//                       <th style={{ width: '40px' }}>#</th>
//                       <th>{t.col.patient}</th>
//                       <th>{t.col.time}</th>
//                       <th>{t.col.notes}</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {appointments.map((appt, index) => (
//                       <tr
//                         key={appt.id}
//                         style={{
//                           background: selectedAppointment?.id === appt.id ? '#ebf8ff' : 'white',
//                           cursor: 'pointer'
//                         }}
//                         onClick={() => setSelectedAppointment(appt)}
//                       >
//                         <td>{index + 1}</td>
//                         <td>{appt.patientName}</td>
//                         <td>{appt.appointmentTime}</td>
//                         <td>{appt.notes}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="appt-actions">
//                 <button
//                   style={{
//                     background: '#fc8181',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     padding: '8px 20px',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => {
//                     if (selectedAppointment) {
//                       if (window.confirm('Delete this appointment?')) {
//                         deleteAppointment(selectedAppointment.id);
//                       }
//                     } else {
//                       alert(t.alert.selectAppointment);
//                     }
//                   }}
//                 >
//                   🗑️ {t.btn.deleteAppointment}
//                 </button>
//                 <button
//                   style={{
//                     background: '#ed8936',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     padding: '8px 20px',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => {
//                     if (!selectedAppointment) {
//                       alert(t.alert.selectAppointment);
//                       return;
//                     }
//                     setReassignDoctorId('');
//                     setShowReassign(true);
//                   }}
//                 >
//                   🔄 {t.btn.reassignAppointment}
//                 </button>
//               </div>
//             </>
//           )}
          
//           <div className="modal-actions" style={{ marginTop: '15px' }}>
//             <button
//               className="btn-secondary"
//               onClick={() => {
//                 setShowAppointments(false);
//                 setSelectedAppointment(null);
//               }}
//             >
//               {t.btn.close}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderReassignModal = () => {
//     if (!showReassign) return null;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal doctor-reassign-modal">
//           <h3>🔄 {t.titleReassign}</h3>
          
//           <div className="form-group">
//             <label>{t.label.newDoctor}</label>
//             <select
//               value={reassignDoctorId}
//               onChange={(e) => setReassignDoctorId(e.target.value)}
//             >
//               <option value="">{t.prompt.selectDoctor}</option>
//               {doctors.map(doctor => (
//                 <option key={doctor.id} value={doctor.id}>
//                   {doctor.fullName} ({doctor.specialty})
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowReassign(false)}
//             >
//               {t.btn.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleReassignAppointment}
//               disabled={!reassignDoctorId}
//             >
//               ✅ {t.btn.assign}
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
//       <div className="doctor-container">
//         {/* Header */}
//         <div className="doctor-header">
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div>
//               <h2>👨‍⚕️ {t.title}</h2>
//               <div className="underline"></div>
//             </div>
//             <button
//               onClick={onClose}
//               style={{
//                 background: '#e2e8f0',
//                 border: 'none',
//                 padding: '8px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//               }}
//             >
//               ✕ {t.btn.close}
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         {renderStats()}

//         {/* Tools Wrapper (Buttons + Search) */}
//         <div className="doctor-tools-wrapper">
//           {renderButtonsRow()}
//           {renderSearchTools()}
//         </div>

//         {/* Content */}
//         <div className="doctor-content">
//           {loading ? (
//             <div className="doctor-loading">⏳ Loading...</div>
//           ) : (
//             viewMode === 'table' ? renderTable() : renderCards()
//           )}
//         </div>

//         {/* Status Bar */}
//         {renderStatusBar()}

//         {/* Modals */}
//         {renderDoctorFormModal()}
//         {renderChangePasswordModal()}
//         {renderAppointmentsModal()}
//         {renderReassignModal()}
//       </div>
//     </>
//   );
// };

// export default DoctorManagementScreen;  V4

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';

// // ---------- Styles ----------
// const styles = `
//   .doctor-container {
//     padding: 20px;
//     background: #f0f4f8;
//     min-height: 100vh;
//     font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//   }
//   .doctor-header {
//     margin-bottom: 20px;
//   }
//   .doctor-header h2 {
//     font-size: 28px;
//     font-weight: bold;
//     color: #1a202c;
//     margin: 0 0 5px 0;
//   }
//   .doctor-header .underline {
//     height: 3px;
//     width: 60px;
//     background: linear-gradient(to right, #4299e1, #2b6cb0);
//     border-radius: 2px;
//   }
//   .doctor-stats {
//     display: flex;
//     gap: 15px;
//     margin-bottom: 15px;
//     flex-wrap: wrap;
//   }
//   .doctor-stat-card {
//     background: white;
//     padding: 15px 20px;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border-left: 4px solid #4299e1;
//     min-width: 150px;
//     flex: 1;
//     max-width: 200px;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-stat-card:hover {
//     transform: scale(1.02);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .doctor-stat-card .icon { font-size: 24px; }
//   .doctor-stat-card .value { font-size: 24px; font-weight: bold; color: #4299e1; }
//   .doctor-stat-card .label { font-size: 12px; color: #718096; }
//   .doctor-tools-wrapper {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     margin-bottom: 15px;
//   }
//   .doctor-buttons-row {
//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;
//     align-items: center;
//   }
//   .doctor-buttons-row button {
//     padding: 8px 20px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//     min-width: 120px;
//   }
//   .doctor-buttons-row button:hover:not(:disabled) {
//     transform: scale(1.05);
//   }
//   .doctor-buttons-row button:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
//   .doctor-search-tools {
//     display: flex;
//     gap: 10px;
//     flex-wrap: wrap;
//     align-items: center;
//   }
//   .doctor-search-box {
//     display: flex;
//     align-items: center;
//     background: white;
//     border-radius: 25px;
//     border: 1px solid #e2e8f0;
//     padding: 5px 15px;
//     flex: 1;
//     min-width: 200px;
//   }
//   .doctor-search-box input {
//     border: none;
//     outline: none;
//     padding: 8px 5px;
//     font-size: 14px;
//     flex: 1;
//     background: transparent;
//   }
//   .doctor-search-box .search-icon {
//     font-size: 14px;
//     color: #a0aec0;
//   }
//   .doctor-view-toggle {
//     display: flex;
//     gap: 5px;
//   }
//   .doctor-view-toggle button {
//     padding: 6px 15px;
//     border: 1px solid #e2e8f0;
//     border-radius: 8px;
//     background: white;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//     font-size: 13px;
//   }
//   .doctor-view-toggle button.active {
//     background: #4299e1;
//     color: white;
//     border-color: #4299e1;
//   }
//   .doctor-view-toggle button:hover:not(.active) {
//     background: #f7fafc;
//   }
//   .doctor-content {
//     background: white;
//     border-radius: 12px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     overflow: hidden;
//     min-height: 400px;
//     position: relative;
//   }
//   .doctor-table-wrapper {
//     overflow-x: auto;
//   }
//   .doctor-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .doctor-table th {
//     padding: 12px 15px;
//     text-align: left;
//     background: #f8f9fa;
//     font-weight: bold;
//     color: #2d3748;
//     border-bottom: 2px solid #e2e8f0;
//   }
//   .doctor-table td {
//     padding: 10px 15px;
//     border-bottom: 1px solid #edf2f7;
//   }
//   .doctor-table tr:hover td {
//     background: #f7fafc;
//   }
//   .doctor-table tr.selected td {
//     background: #ebf8ff;
//   }
//   .doctor-table .password-mask {
//     color: #718096;
//     font-family: monospace;
//   }
//   .doctor-card-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//     gap: 15px;
//     padding: 15px;
//   }
//   .doctor-card {
//     background: white;
//     border-radius: 12px;
//     padding: 15px;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.08);
//     border: 1px solid #edf2f7;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-card:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 4px 20px rgba(0,0,0,0.12);
//   }
//   .doctor-card.selected {
//     background: #fc8181;
//     border-color: #e53e3e;
//     color: white;
//   }
//   .doctor-card.selected .card-text {
//     color: white !important;
//   }
//   .doctor-card .card-header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 8px;
//   }
//   .doctor-card .card-id {
//     background: #4299e1;
//     color: white;
//     padding: 2px 12px;
//     border-radius: 12px;
//     font-size: 12px;
//     font-weight: bold;
//   }
//   .doctor-card .card-name {
//     font-size: 16px;
//     font-weight: bold;
//     color: #2d3748;
//   }
//   .doctor-card .card-specialty {
//     font-size: 13px;
//     color: #4a5568;
//   }
//   .doctor-card .card-details {
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//     margin-top: 8px;
//     font-size: 13px;
//     color: #4a5568;
//   }
//   .doctor-card .card-actions {
//     margin-top: 10px;
//     display: flex;
//     gap: 5px;
//   }
//   .doctor-card .card-actions button {
//     padding: 4px 12px;
//     border: none;
//     border-radius: 6px;
//     font-size: 12px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-card .card-actions button:hover {
//     transform: scale(1.05);
//   }
//   .doctor-status-bar {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 8px 15px;
//     background: #f7fafc;
//     border-top: 1px solid #e2e8f0;
//     font-size: 13px;
//     color: #4a5568;
//   }
//   .doctor-status-bar .status-msg {
//     display: flex;
//     align-items: center;
//     gap: 8px;
//   }
//   .doctor-loading {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     font-size: 18px;
//     color: #a0aec0;
//   }
//   .doctor-empty {
//     text-align: center;
//     padding: 40px;
//     color: #a0aec0;
//   }
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
//     border-radius: 12px;
//     padding: 25px;
//     max-width: 500px;
//     width: 95%;
//     max-height: 90vh;
//     overflow-y: auto;
//     box-shadow: 0 10px 25px rgba(0,0,0,0.2);
//   }
//   .doctor-modal h3 {
//     margin: 0 0 15px 0;
//     color: #2d3748;
//   }
//   .doctor-modal .form-group {
//     margin-bottom: 15px;
//   }
//   .doctor-modal .form-group label {
//     display: block;
//     font-weight: bold;
//     margin-bottom: 5px;
//     color: #2d3748;
//   }
//   .doctor-modal .form-group input {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//     transition: border-color 0.2s;
//   }
//   .doctor-modal .form-group input:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .doctor-modal .modal-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: flex-end;
//     margin-top: 20px;
//   }
//   .doctor-modal .modal-actions button {
//     padding: 8px 30px;
//     border: none;
//     border-radius: 8px;
//     font-weight: bold;
//     cursor: pointer;
//     transition: all 0.2s;
//   }
//   .doctor-modal .modal-actions button:hover {
//     transform: scale(1.05);
//   }
//   .doctor-modal .modal-actions .btn-primary {
//     background: #48bb78;
//     color: white;
//   }
//   .doctor-modal .modal-actions .btn-primary:disabled {
//     background: #a0aec0;
//     cursor: not-allowed;
//   }
//   .doctor-modal .modal-actions .btn-secondary {
//     background: #e2e8f0;
//     color: #4a5568;
//   }
//   .doctor-appointments-modal {
//     max-width: 800px;
//   }
//   .doctor-appointments-modal .appt-table {
//     width: 100%;
//     border-collapse: collapse;
//     font-size: 13px;
//   }
//   .doctor-appointments-modal .appt-table th {
//     padding: 10px;
//     text-align: left;
//     background: #f8f9fa;
//     border-bottom: 2px solid #e2e8f0;
//   }
//   .doctor-appointments-modal .appt-table td {
//     padding: 8px 10px;
//     border-bottom: 1px solid #edf2f7;
//   }
//   .doctor-appointments-modal .appt-table tr:hover td {
//     background: #f7fafc;
//   }
//   .doctor-appointments-modal .appt-actions {
//     display: flex;
//     gap: 10px;
//     justify-content: center;
//     margin-top: 15px;
//   }
//   .doctor-reassign-modal {
//     max-width: 450px;
//   }
//   .doctor-reassign-modal select {
//     width: 100%;
//     padding: 10px 15px;
//     border-radius: 8px;
//     border: 1px solid #e2e8f0;
//     font-size: 14px;
//     background: white;
//   }
//   .doctor-reassign-modal select:focus {
//     outline: none;
//     border-color: #4299e1;
//   }
//   .doctor-change-password-modal {
//     max-width: 450px;
//   }
// `;

// // ---------- Data Classes ----------
// class DoctorRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.firstName = data.firstName || '';
//     this.middleName = data.middleName || '';
//     this.lastName = data.lastName || '';
//     this.specialty = data.specialty || '';
//     this.email = data.email || '';
//     this.phone = data.phone || '';
//     this.username = data.username || '';
//     this.password = data.password || '';
//     this.fullName = `${this.firstName} ${this.middleName} ${this.lastName}`.trim();
//   }

//   static fromJson(json) {
//     return new DoctorRow({
//       id: json.id || 0,
//       firstName: json.firstName || '',
//       middleName: json.middleName || '',
//       lastName: json.lastName || '',
//       specialty: json.specialty || '',
//       email: json.email || '',
//       phone: json.phone || '',
//       username: json.username || '',
//       password: json.password || '',
//     });
//   }
// }

// class AppointmentRow {
//   constructor(data = {}) {
//     this.id = data.id || 0;
//     this.patientName = data.patientName || '';
//     this.appointmentTime = data.appointmentTime || '';
//     this.notes = data.notes || '';
//   }

//   static fromJson(json) {
//     return new AppointmentRow({
//       id: json.id || 0,
//       patientName: json.patientName || json.patient?.fullName || '',
//       appointmentTime: json.appointmentTime || '',
//       notes: json.notes || '',
//     });
//   }
// }

// // ---------- Main Component ----------
// const DoctorManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
//   // ---------- Translations ----------
//   const t = React.useMemo(() => {
//     const translations = {
//       en: {
//         title: 'Doctor Management',
//         stat: { total: 'Total Doctors' },
//         search: { placeholder: 'Search doctors...' },
//         btn: {
//           table: 'Table',
//           cards: 'Cards',
//           refresh: 'Refresh',
//           add: 'Add Doctor',
//           update: 'Update',
//           delete: 'Delete',
//           viewAppointments: 'View Appointments',
//           changePassword: 'Change Password',
//           save: 'Save',
//           yes: 'Yes',
//           no: 'No',
//           assign: 'Assign',
//           deleteAppointment: 'Delete Appointment',
//           reassignAppointment: 'Reassign',
//           close: 'Close',
//         },
//         col: {
//           id: 'ID',
//           firstName: 'First Name',
//           middleName: 'Middle Name',
//           lastName: 'Last Name',
//           specialty: 'Specialty',
//           email: 'Email',
//           phone: 'Phone',
//           username: 'Username',
//           password: 'Password',
//           patient: 'Patient',
//           time: 'Time',
//           notes: 'Notes',
//         },
//         label: {
//           firstName: 'First Name',
//           middleName: 'Middle Name',
//           lastName: 'Last Name',
//           specialty: 'Specialty',
//           email: 'Email',
//           phone: 'Phone',
//           username: 'Username',
//           password: 'Password',
//           oldPassword: 'Old Password',
//           newPassword: 'New Password',
//           confirmPassword: 'Confirm Password',
//           newDoctor: 'New Doctor',
//           noDoctors: 'No doctors found',
//           showing: 'Showing',
//           records: 'records',
//         },
//         titleAddDoctor: 'Add Doctor',
//         titleUpdateDoctor: 'Update Doctor',
//         titleChangePassword: 'Change Password',
//         titleDoctorAppointments: 'Appointments',
//         titleReassign: 'Reassign Appointment',
//         alert: {
//           selectDoctor: 'Please select a doctor first',
//           selectAppointment: 'Please select an appointment first',
//           fillAllFields: 'Please fill all required fields',
//           invalidFirstName: 'First name must be at least 3 letters',
//           invalidLastName: 'Last name must be at least 3 letters',
//           invalidPassword: 'Password must be at least 6 characters',
//           invalidEmail: 'Please enter a valid email',
//           invalidPhone: 'Phone must be 7-15 digits',
//           saved: 'Doctor saved successfully',
//           deleted: 'Doctor deleted successfully',
//           errorSaveDoctor: 'Error saving doctor',
//           errorDeleteDoctor: 'Error deleting doctor',
//           errorLoadDoctors: 'Error loading doctors',
//           passwordChanged: 'Password changed successfully',
//           errorChangePassword: 'Error changing password',
//           passwordMismatch: 'Passwords do not match',
//           appointmentDeleted: 'Appointment deleted successfully',
//           errorDeleteAppointment: 'Error deleting appointment',
//           appointmentReassigned: 'Appointment reassigned successfully',
//           errorReassignAppointment: 'Error reassigning appointment',
//           errorFetchAppointments: 'Error fetching appointments',
//           errorFetchDoctors: 'Error fetching doctors',
//         },
//         confirm: {
//           delete: { title: 'Confirm Delete', content: 'Are you sure you want to delete this doctor?' },
//         },
//         status: {
//           ready: 'Ready',
//           refreshing: 'Refreshing...',
//           selected: 'Selected',
//           added: 'Added successfully',
//           updated: 'Updated successfully',
//           deleted: 'Deleted successfully',
//           passwordChanged: 'Password changed successfully',
//           reassigned: 'Reassigned successfully',
//         },
//         prompt: { selectDoctor: 'Select a doctor' },
//         msg: {
//           confirmClose: 'Are you sure you want to close this screen?',
//         },
//       },
//       ar: {
//         title: 'إدارة الأطباء',
//         stat: { total: 'إجمالي الأطباء' },
//         search: { placeholder: 'بحث عن الأطباء...' },
//         btn: {
//           table: 'جدول',
//           cards: 'بطاقات',
//           refresh: 'تحديث',
//           add: 'إضافة طبيب',
//           update: 'تعديل',
//           delete: 'حذف',
//           viewAppointments: 'عرض المواعيد',
//           changePassword: 'تغيير كلمة المرور',
//           save: 'حفظ',
//           yes: 'نعم',
//           no: 'لا',
//           assign: 'تعيين',
//           deleteAppointment: 'حذف الموعد',
//           reassignAppointment: 'إعادة تعيين',
//           close: 'إغلاق',
//         },
//         col: {
//           id: 'الرقم',
//           firstName: 'الاسم الأول',
//           middleName: 'الاسم الأوسط',
//           lastName: 'الاسم الأخير',
//           specialty: 'التخصص',
//           email: 'البريد الإلكتروني',
//           phone: 'الهاتف',
//           username: 'اسم المستخدم',
//           password: 'كلمة المرور',
//           patient: 'المريض',
//           time: 'الوقت',
//           notes: 'ملاحظات',
//         },
//         label: {
//           firstName: 'الاسم الأول',
//           middleName: 'الاسم الأوسط',
//           lastName: 'الاسم الأخير',
//           specialty: 'التخصص',
//           email: 'البريد الإلكتروني',
//           phone: 'الهاتف',
//           username: 'اسم المستخدم',
//           password: 'كلمة المرور',
//           oldPassword: 'كلمة المرور القديمة',
//           newPassword: 'كلمة المرور الجديدة',
//           confirmPassword: 'تأكيد كلمة المرور',
//           newDoctor: 'طبيب جديد',
//           noDoctors: 'لا يوجد أطباء',
//           showing: 'عرض',
//           records: 'سجلات',
//         },
//         titleAddDoctor: 'إضافة طبيب',
//         titleUpdateDoctor: 'تعديل طبيب',
//         titleChangePassword: 'تغيير كلمة المرور',
//         titleDoctorAppointments: 'المواعيد',
//         titleReassign: 'إعادة تعيين الموعد',
//         alert: {
//           selectDoctor: 'يرجى اختيار طبيب أولاً',
//           selectAppointment: 'يرجى اختيار موعد أولاً',
//           fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',
//           invalidFirstName: 'الاسم الأول يجب أن يكون 3 أحرف على الأقل',
//           invalidLastName: 'الاسم الأخير يجب أن يكون 3 أحرف على الأقل',
//           invalidPassword: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
//           invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
//           invalidPhone: 'الهاتف يجب أن يكون 7-15 رقم',
//           saved: 'تم حفظ الطبيب بنجاح',
//           deleted: 'تم حذف الطبيب بنجاح',
//           errorSaveDoctor: 'خطأ في حفظ الطبيب',
//           errorDeleteDoctor: 'خطأ في حذف الطبيب',
//           errorLoadDoctors: 'خطأ في تحميل الأطباء',
//           passwordChanged: 'تم تغيير كلمة المرور بنجاح',
//           errorChangePassword: 'خطأ في تغيير كلمة المرور',
//           passwordMismatch: 'كلمات المرور غير متطابقة',
//           appointmentDeleted: 'تم حذف الموعد بنجاح',
//           errorDeleteAppointment: 'خطأ في حذف الموعد',
//           appointmentReassigned: 'تم إعادة تعيين الموعد بنجاح',
//           errorReassignAppointment: 'خطأ في إعادة تعيين الموعد',
//           errorFetchAppointments: 'خطأ في جلب المواعيد',
//           errorFetchDoctors: 'خطأ في جلب الأطباء',
//         },
//         confirm: {
//           delete: { title: 'تأكيد الحذف', content: 'هل أنت متأكد من حذف هذا الطبيب؟' },
//         },
//         status: {
//           ready: 'جاهز',
//           refreshing: 'جاري التحديث...',
//           selected: 'تم الاختيار',
//           added: 'تمت الإضافة بنجاح',
//           updated: 'تم التعديل بنجاح',
//           deleted: 'تم الحذف بنجاح',
//           passwordChanged: 'تم تغيير كلمة المرور بنجاح',
//           reassigned: 'تم إعادة التعيين بنجاح',
//         },
//         prompt: { selectDoctor: 'اختر طبيباً' },
//         msg: {
//           confirmClose: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
//         },
//       },
//     };
//     return translations[lang] || translations.en;
//   }, [lang]);

//   // ---------- State ----------
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [viewMode, setViewMode] = useState('table');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
//   const [stats, setStats] = useState({ total: 0 });
  
//   // Modal states
//   const [showDoctorForm, setShowDoctorForm] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);
//   const [showAppointments, setShowAppointments] = useState(false);
//   const [showReassign, setShowReassign] = useState(false);
//   const [editingDoctor, setEditingDoctor] = useState(null);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [appointments, setAppointments] = useState([]);
  
//   // Form states
//   const [formData, setFormData] = useState({
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     specialty: '',
//     email: '',
//     phone: '',
//     username: '',
//     password: '',
//   });
  
//   const [passwordData, setPasswordData] = useState({
//     oldPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
  
//   const [reassignDoctorId, setReassignDoctorId] = useState('');

//   // Notification state
//   const [notification, setNotification] = useState({ type: '', message: '', visible: false });

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
//   const loadDoctors = useCallback(async () => {
//     setLoading(true);
//     setStatusMsg(`⏳ ${t.status.refreshing}`);

//     try {
//       const res = await fetch(`${BASE_URL}/api/doctors`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const doctorsData = Array.isArray(data) ? data : [data];
      
//       // Log the raw data to see what's coming from the API
//       //console.log('📥 Raw doctor data from API:', doctorsData);
      
//       const parsedDoctors = doctorsData.map(item => {
//         // Log each doctor's password
//         //console.log(`Doctor ${item.username} password:`, item.password);
//         return DoctorRow.fromJson(item);
//       });
      
//       setDoctors(parsedDoctors);
//       setFilteredDoctors(parsedDoctors);
//       setStats({ total: parsedDoctors.length });
      
//       setStatusMsg(`✅ ${t.status.ready} (${parsedDoctors.length} ${t.label.records})`);
//     } catch (err) {
//       //console.error('🚨 Load error:', err);
//       setStatusMsg(`❌ ${t.alert.errorLoadDoctors}: ${err.message}`);
//       setDoctors([]);
//       setFilteredDoctors([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [t]);

//   const saveDoctor = useCallback(async (doctorData) => {
//     try {
//       const isUpdate = !!editingDoctor;
//       const url = isUpdate 
//         ? `${BASE_URL}/api/doctors/${editingDoctor.id}`
//         : `${BASE_URL}/api/doctors`;
      
//       // ✅ Ensure all required fields are sent
//       const payload = {
//         firstName: doctorData.firstName.trim(),
//         middleName: doctorData.middleName ? doctorData.middleName.trim() : '',
//         lastName: doctorData.lastName.trim(),
//         specialty: doctorData.specialty.trim(),
//         email: doctorData.email.trim(),
//         phone: doctorData.phone.trim(),
//         username: doctorData.username.trim(),
//         password: doctorData.password.trim(),
//       };

//       //console.log('📤 Sending doctor payload:', payload);

//       const res = await fetch(url, {
//         method: isUpdate ? 'PUT' : 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       // ✅ Read error response body for debugging
//       let responseBody;
//       try {
//         responseBody = await res.json();
//       } catch {
//         responseBody = await res.text();
//       }

//       if (!res.ok) {
//         //console.error('❌ Server error response:', responseBody);
//         // If responseBody is an object with a message, show that
//         const errorMessage = typeof responseBody === 'object' && responseBody.message
//           ? responseBody.message
//           : typeof responseBody === 'string'
//           ? responseBody
//           : `HTTP ${res.status}`;
//         throw new Error(errorMessage);
//       }

//       setNotification({
//         type: 'success',
//         message: `✅ ${t.alert.saved}`,
//         visible: true
//       });
      
//       setShowDoctorForm(false);
//       setEditingDoctor(null);
//       loadDoctors();
//       logAction(isUpdate ? 'UPDATE_DOCTOR' : 'ADD_DOCTOR', 
//         `${isUpdate ? 'Updated' : 'Added'} doctor: ${payload.firstName} ${payload.lastName}`);
//       setStatusMsg(`✅ ${isUpdate ? t.status.updated : t.status.added}`);
//     } catch (err) {
//       //console.error('🚨 Save error:', err);
//       setNotification({
//         type: 'error',
//         message: `❌ Error: ${err.message}`,
//         visible: true
//       });
//     }
//   }, [editingDoctor, loadDoctors, t, logAction]);

//   const deleteDoctor = useCallback(async (doctorId) => {
//     if (!window.confirm(t.confirm.delete.content)) return;
    
//     try {
//       const res = await fetch(`${BASE_URL}/api/doctors/${doctorId}`, {
//         method: 'DELETE',
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       setNotification({
//         type: 'success',
//         message: `✅ ${t.alert.deleted}`,
//         visible: true
//       });
      
//       setSelectedDoctor(null);
//       loadDoctors();
//       logAction('DELETE_DOCTOR', `Deleted doctor ID: ${doctorId}`);
//       setStatusMsg(`🗑️ ${t.status.deleted}`);
//     } catch (err) {
//       //console.error('🚨 Delete error:', err);
//       setNotification({
//         type: 'error',
//         message: `❌ ${t.alert.errorDeleteDoctor}: ${err.message}`,
//         visible: true
//       });
//     }
//   }, [loadDoctors, t, logAction]);

//   const changePassword = useCallback(async (username, oldPassword, newPassword) => {
//     try {
//       // ✅ Validate inputs before sending
//       if (!oldPassword.trim() || !newPassword.trim()) {
//         setNotification({
//           type: 'error',
//           message: 'Old password and new password are required',
//           visible: true
//         });
//         return;
//       }
//       if (newPassword.length < 6) {
//         setNotification({
//           type: 'error',
//           message: 'New password must be at least 6 characters',
//           visible: true
//         });
//         return;
//       }

//       const payload = { username, oldPassword, newPassword };
//       //console.log('📤 Sending password change payload:', payload);

//       const res = await fetch(`${BASE_URL}/api/doctors/change-password`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       // ✅ Read the response body once and store it
//       let responseBody;
//       const contentType = res.headers.get('content-type');
      
//       if (contentType && contentType.includes('application/json')) {
//         responseBody = await res.json();
//       } else {
//         responseBody = await res.text();
//       }

//       if (!res.ok) {
//         //console.error('❌ Server error response:', responseBody);
//         // If responseBody is an object with a message, show that
//         const errorMessage = typeof responseBody === 'object' && responseBody.message
//           ? responseBody.message
//           : typeof responseBody === 'string'
//           ? responseBody
//           : `HTTP ${res.status}`;
//         throw new Error(errorMessage);
//       }

//       // ✅ Success - show result notification
//       setNotification({
//         type: 'success',
//         message: `✅ ${t.alert.passwordChanged}`,
//         visible: true
//       });
      
//       // ✅ Close modal and reset form
//       setShowChangePassword(false);
//       setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      
//       // ✅ Update status bar
//       setStatusMsg(`✅ ${t.status.passwordChanged}`);
      
//       // ✅ Log action
//       logAction('CHANGE_PASSWORD', `Changed password for doctor: ${username}`);
      
//       // ✅ Refresh doctor list to get updated data
//       loadDoctors();
      
//     } catch (err) {
//       //console.error('🚨 Password change error:', err);
//       setNotification({
//         type: 'error',
//         message: `❌ Error: ${err.message}`,
//         visible: true
//       });
//       setStatusMsg(`❌ Error: ${err.message}`);
//     }
//   }, [t, logAction, loadDoctors]);

//   const loadAppointments = useCallback(async (doctorId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/appointments/doctor/${doctorId}`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       const data = await res.json();
//       const appointmentsData = Array.isArray(data) ? data : [data];
      
//       const parsedAppointments = appointmentsData.map(item => AppointmentRow.fromJson(item));
//       setAppointments(parsedAppointments);
//     } catch (err) {
//       //console.error('🚨 Load appointments error:', err);
//       setNotification({
//         type: 'error',
//         message: `❌ ${t.alert.errorFetchAppointments}`,
//         visible: true
//       });
//     }
//   }, [t]);

//   const deleteAppointment = useCallback(async (appointmentId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}`, {
//         method: 'DELETE',
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       setNotification({
//         type: 'success',
//         message: `✅ ${t.alert.appointmentDeleted}`,
//         visible: true
//       });
      
//       setAppointments(prev => prev.filter(a => a.id !== appointmentId));
//       setSelectedAppointment(null);
//       logAction('DELETE_APPOINTMENT', `Deleted appointment ID: ${appointmentId}`);
//     } catch (err) {
//       //console.error('🚨 Delete appointment error:', err);
//       setNotification({
//         type: 'error',
//         message: `❌ ${t.alert.errorDeleteAppointment}`,
//         visible: true
//       });
//     }
//   }, [t, logAction]);

//   const reassignAppointment = useCallback(async (appointmentId, newDoctorId) => {
//     try {
//       const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}/reassign`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ doctorId: newDoctorId }),
//       });
      
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
//       setNotification({
//         type: 'success',
//         message: `✅ ${t.alert.appointmentReassigned}`,
//         visible: true
//       });
      
//       setShowReassign(false);
//       setSelectedAppointment(null);
//       setReassignDoctorId('');
//       loadAppointments(selectedDoctor.id);
//       logAction('REASSIGN_APPOINTMENT', `Reassigned appointment ${appointmentId} to doctor ${newDoctorId}`);
//       setStatusMsg(`✅ ${t.status.reassigned}`);
//     } catch (err) {
//       //console.error('🚨 Reassign error:', err);
//       setNotification({
//         type: 'error',
//         message: `❌ ${t.alert.errorReassignAppointment}`,
//         visible: true
//       });
//     }
//   }, [selectedDoctor, loadAppointments, t, logAction]);

//   // ---------- Handlers ----------
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
    
//     if (query.trim() === '') {
//       setFilteredDoctors(doctors);
//       return;
//     }
    
//     const filtered = doctors.filter(doctor => {
//       return (
//         doctor.firstName.toLowerCase().includes(query) ||
//         doctor.lastName.toLowerCase().includes(query) ||
//         doctor.specialty.toLowerCase().includes(query) ||
//         doctor.email.toLowerCase().includes(query) ||
//         doctor.username.toLowerCase().includes(query) ||
//         doctor.fullName.toLowerCase().includes(query)
//       );
//     });
    
//     setFilteredDoctors(filtered);
//   };

//   const handleSelectDoctor = (doctor) => {
//     setSelectedDoctor(doctor);
//     setStatusMsg(`✅ ${t.status.selected}: ${doctor.fullName}`);
//   };

//   const handleAddDoctor = () => {
//     setEditingDoctor(null);
//     setFormData({
//       firstName: '',
//       middleName: '',
//       lastName: '',
//       specialty: '',
//       email: '',
//       phone: '',
//       username: '',
//       password: '',
//     });
//     setShowDoctorForm(true);
//   };

//   const handleEditDoctor = () => {
//     if (!selectedDoctor) {
//       setNotification({
//         type: 'error',
//         message: t.alert.selectDoctor,
//         visible: true
//       });
//       return;
//     }
//     setEditingDoctor(selectedDoctor);
//     setFormData({
//       firstName: selectedDoctor.firstName,
//       middleName: selectedDoctor.middleName,
//       lastName: selectedDoctor.lastName,
//       specialty: selectedDoctor.specialty,
//       email: selectedDoctor.email,
//       phone: selectedDoctor.phone,
//       username: selectedDoctor.username,
//       password: selectedDoctor.password,
//     });
//     setShowDoctorForm(true);
//   };

//   const handleDeleteDoctor = () => {
//     if (!selectedDoctor) {
//       setNotification({
//         type: 'error',
//         message: t.alert.selectDoctor,
//         visible: true
//       });
//       return;
//     }
//     deleteDoctor(selectedDoctor.id);
//   };

//   const handleViewAppointments = () => {
//     if (!selectedDoctor) {
//       setNotification({
//         type: 'error',
//         message: t.alert.selectDoctor,
//         visible: true
//       });
//       return;
//     }
//     loadAppointments(selectedDoctor.id);
//     setShowAppointments(true);
//   };

//   const handleChangePassword = () => {
//     if (!selectedDoctor) {
//       setNotification({
//         type: 'error',
//         message: t.alert.selectDoctor,
//         visible: true
//       });
//       return;
//     }
    
//     // Debug: Check what password is stored
//     //console.log('📋 Selected doctor full data:', selectedDoctor);
//     //console.log('🔑 Selected doctor password:', selectedDoctor.password);
    
//     setPasswordData({
//       oldPassword: selectedDoctor.password || '', // Auto-fill from selected doctor
//       newPassword: '',
//       confirmPassword: '',
//     });
//     setShowChangePassword(true);
//   };

//   const handleSaveDoctor = () => {
//     const { firstName, lastName, specialty, email, phone, username, password } = formData;
    
//     // Validation
//     if (!firstName.trim() || !lastName.trim() || !specialty.trim() || 
//         !email.trim() || !phone.trim() || !username.trim() || !password.trim()) {
//       setNotification({
//         type: 'error',
//         message: t.alert.fillAllFields,
//         visible: true
//       });
//       return;
//     }
    
//     if (firstName.length < 3) {
//       setNotification({
//         type: 'error',
//         message: t.alert.invalidFirstName,
//         visible: true
//       });
//       return;
//     }
    
//     if (lastName.length < 3) {
//       setNotification({
//         type: 'error',
//         message: t.alert.invalidLastName,
//         visible: true
//       });
//       return;
//     }
    
//     if (password.length < 6) {
//       setNotification({
//         type: 'error',
//         message: t.alert.invalidPassword,
//         visible: true
//       });
//       return;
//     }
    
//     if (!email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/)) {
//       setNotification({
//         type: 'error',
//         message: t.alert.invalidEmail,
//         visible: true
//       });
//       return;
//     }
    
//     if (!phone.match(/^\d{7,15}$/)) {
//       setNotification({
//         type: 'error',
//         message: t.alert.invalidPhone,
//         visible: true
//       });
//       return;
//     }
    
//     saveDoctor(formData);
//   };

//   const handleSavePassword = () => {
//     const { oldPassword, newPassword, confirmPassword } = passwordData;
    
//     // Client-side validation before sending
//     if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
//       setNotification({
//         type: 'error',
//         message: t.alert.fillAllFields,
//         visible: true
//       });
//       return;
//     }
    
//     if (newPassword !== confirmPassword) {
//       setNotification({
//         type: 'error',
//         message: t.alert.passwordMismatch,
//         visible: true
//       });
//       return;
//     }
    
//     if (newPassword.length < 6) {
//       setNotification({
//         type: 'error',
//         message: t.alert.invalidPassword,
//         visible: true
//       });
//       return;
//     }
    
//     setStatusMsg('⏳ Changing password...');
//     changePassword(selectedDoctor.username, oldPassword, newPassword);
//   };

//   const handleReassignAppointment = () => {
//     if (!selectedAppointment) {
//       setNotification({
//         type: 'error',
//         message: t.alert.selectAppointment,
//         visible: true
//       });
//       return;
//     }
//     if (!reassignDoctorId) {
//       setNotification({
//         type: 'error',
//         message: t.alert.selectDoctor,
//         visible: true
//       });
//       return;
//     }
//     reassignAppointment(selectedAppointment.id, parseInt(reassignDoctorId));
//   };

//   const handleViewToggle = (mode) => {
//     setViewMode(mode);
//   };

//   // ---------- Effects ----------
//   useEffect(() => {
//     loadDoctors();
//   }, [loadDoctors]);

//   // Auto-dismiss notification after 5 seconds
//   useEffect(() => {
//     if (notification.visible) {
//       const timer = setTimeout(() => {
//         setNotification({ ...notification, visible: false });
//       }, 5000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   // ---------- Render Helpers ----------
//   const renderNotification = () => {
//     if (!notification.visible) return null;
    
//     const backgroundColor = notification.type === 'success' ? '#48bb78' : '#fc8181';
//     const borderColor = notification.type === 'success' ? '#38a169' : '#e53e3e';
    
//     return (
//       <div style={{
//         position: 'fixed',
//         top: '20px',
//         right: '20px',
//         backgroundColor: backgroundColor,
//         color: 'white',
//         padding: '15px 25px',
//         borderRadius: '8px',
//         boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
//         zIndex: 9999,
//         maxWidth: '400px',
//         animation: 'slideIn 0.3s ease-out',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         borderLeft: `4px solid ${borderColor}`
//       }}>
//         <span>{notification.message}</span>
//         <button
//           onClick={() => setNotification({ ...notification, visible: false })}
//           style={{
//             background: 'transparent',
//             border: 'none',
//             color: 'white',
//             fontSize: '18px',
//             cursor: 'pointer',
//             marginLeft: '15px',
//             fontWeight: 'bold'
//           }}
//         >
//           ×
//         </button>
//       </div>
//     );
//   };

//   const renderStats = () => {
//     return (
//       <div className="doctor-stats">
//         <div className="doctor-stat-card">
//           <div className="icon">👥</div>
//           <div className="value">{stats.total}</div>
//           <div className="label">{t.stat.total}</div>
//         </div>
//       </div>
//     );
//   };

//   const renderButtonsRow = () => {
//     return (
//       <div className="doctor-buttons-row">
//         <button
//           onClick={handleAddDoctor}
//           style={{ background: '#48bb78', color: 'white' }}
//         >
//           ➕ {t.btn.add}
//         </button>
//         <button
//           onClick={handleEditDoctor}
//           disabled={!selectedDoctor}
//           style={{ background: '#4299e1', color: 'white' }}
//         >
//           ✏️ {t.btn.update}
//         </button>
//         <button
//           onClick={handleDeleteDoctor}
//           disabled={!selectedDoctor}
//           style={{ background: '#fc8181', color: 'white' }}
//         >
//           🗑️ {t.btn.delete}
//         </button>
//         <button
//           onClick={handleViewAppointments}
//           disabled={!selectedDoctor}
//           style={{ background: '#805ad5', color: 'white' }}
//         >
//           📋 {t.btn.viewAppointments}
//         </button>
//         <button
//           onClick={handleChangePassword}
//           disabled={!selectedDoctor}
//           style={{ background: '#ed8936', color: 'white' }}
//         >
//           🔑 {t.btn.changePassword}
//         </button>
//       </div>
//     );
//   };

//   const renderSearchTools = () => {
//     return (
//       <div className="doctor-search-tools">
//         <div className="doctor-search-box">
//           <span className="search-icon">🔍</span>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder={t.search.placeholder}
//           />
//         </div>
        
//         <div className="doctor-view-toggle">
//           <button
//             className={viewMode === 'table' ? 'active' : ''}
//             onClick={() => handleViewToggle('table')}
//           >
//             📋 {t.btn.table}
//           </button>
//           <button
//             className={viewMode === 'cards' ? 'active' : ''}
//             onClick={() => handleViewToggle('cards')}
//           >
//             🃏 {t.btn.cards}
//           </button>
//         </div>
        
//         <button
//           onClick={loadDoctors}
//           style={{
//             background: '#4299e1',
//             color: 'white',
//             border: 'none',
//             borderRadius: '8px',
//             padding: '8px 20px',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           🔄 {t.btn.refresh}
//         </button>
//       </div>
//     );
//   };

//   const renderTable = () => {
//     if (filteredDoctors.length === 0) {
//       return <div className="doctor-empty">📭 {t.label.noDoctors}</div>;
//     }
    
//     return (
//       <div className="doctor-table-wrapper">
//         <table className="doctor-table">
//           <thead>
//             <tr>
//               <th>{t.col.id}</th>
//               <th>{t.col.firstName}</th>
//               <th>{t.col.middleName}</th>
//               <th>{t.col.lastName}</th>
//               <th>{t.col.specialty}</th>
//               <th>{t.col.email}</th>
//               <th>{t.col.phone}</th>
//               <th>{t.col.username}</th>
//               <th>{t.col.password}</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredDoctors.map(doctor => (
//               <tr
//                 key={doctor.id}
//                 className={selectedDoctor?.id === doctor.id ? 'selected' : ''}
//                 onClick={() => handleSelectDoctor(doctor)}
//                 style={{ cursor: 'pointer' }}
//               >
//                 <td>{doctor.id}</td>
//                 <td>{doctor.firstName}</td>
//                 <td>{doctor.middleName}</td>
//                 <td>{doctor.lastName}</td>
//                 <td>{doctor.specialty}</td>
//                 <td>{doctor.email}</td>
//                 <td>{doctor.phone}</td>
//                 <td>{doctor.username}</td>
//                 <td className="password-mask">****</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderCards = () => {
//     if (filteredDoctors.length === 0) {
//       return <div className="doctor-empty">📭 {t.label.noDoctors}</div>;
//     }
    
//     return (
//       <div className="doctor-card-grid">
//         {filteredDoctors.map(doctor => (
//           <div
//             key={doctor.id}
//             className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
//             onClick={() => handleSelectDoctor(doctor)}
//           >
//             <div className="card-header">
//               <span className="card-id">#{doctor.id}</span>
//               <span className="card-name">{doctor.fullName}</span>
//             </div>
//             <div className="card-specialty">🩺 {doctor.specialty}</div>
//             <div className="card-details">
//               <div>📧 {doctor.email}</div>
//               <div>📱 {doctor.phone}</div>
//               <div>👤 {doctor.username}</div>
//             </div>
//             <div className="card-actions">
//               <button
//                 style={{ background: '#4299e1', color: 'white' }}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedDoctor(doctor);
//                   loadAppointments(doctor.id);
//                   setShowAppointments(true);
//                 }}
//               >
//                 📋 {t.btn.viewAppointments}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderStatusBar = () => {
//     return (
//       <div className="doctor-status-bar">
//         <div className="status-msg">
//           {statusMsg}
//         </div>
//         <div>
//           🕐 {new Date().toLocaleTimeString()}
//         </div>
//       </div>
//     );
//   };

//   // ---------- Modals ----------
//   const renderDoctorFormModal = () => {
//     if (!showDoctorForm) return null;
    
//     const isEdit = !!editingDoctor;
//     const modalTitle = isEdit ? `✏️ ${t.titleUpdateDoctor}` : `➕ ${t.titleAddDoctor}`;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal">
//           <h3>{modalTitle}</h3>
          
//           <div className="form-group">
//             <label>{t.label.firstName}</label>
//             <input
//               type="text"
//               value={formData.firstName}
//               onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.middleName}</label>
//             <input
//               type="text"
//               value={formData.middleName}
//               onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.lastName}</label>
//             <input
//               type="text"
//               value={formData.lastName}
//               onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.specialty}</label>
//             <input
//               type="text"
//               value={formData.specialty}
//               onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.email}</label>
//             <input
//               type="text"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.phone}</label>
//             <input
//               type="text"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.username}</label>
//             <input
//               type="text"
//               value={formData.username}
//               onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.password}</label>
//             <input
//               type="password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             />
//           </div>
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowDoctorForm(false)}
//             >
//               {t.btn.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleSaveDoctor}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderChangePasswordModal = () => {
//     if (!showChangePassword) return null;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal doctor-change-password-modal">
//           <h3>🔑 {t.titleChangePassword}</h3>
          
//           <div className="form-group">
//             <label>Doctor</label>
//             <div style={{ 
//               padding: '10px 15px', 
//               background: '#f7fafc', 
//               borderRadius: '8px',
//               color: '#2d3748',
//               fontWeight: 'bold'
//             }}>
//               {selectedDoctor?.fullName} ({selectedDoctor?.username})
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.oldPassword}</label>
//             <input
//               type="password" // Changed from "text" to "password" to hide the auto-filled password
//               value={passwordData.oldPassword}
//               readOnly
//               style={{ 
//                 backgroundColor: '#f7fafc', 
//                 cursor: 'not-allowed',
//                 color: '#718096'
//               }}
//             />
//             <div style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
//               ℹ️ Auto-filled from system (hidden)
//             </div>
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.newPassword}</label>
//             <input
//               type="password"
//               value={passwordData.newPassword}
//               onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//               placeholder="Enter new password (min 6 characters)"
//             />
//           </div>
          
//           <div className="form-group">
//             <label>{t.label.confirmPassword}</label>
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
//               onClick={() => {
//                 setShowChangePassword(false);
//                 setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
//               }}
//             >
//               {t.btn.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleSavePassword}
//             >
//               💾 {t.btn.save}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderAppointmentsModal = () => {
//     if (!showAppointments) return null;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal doctor-appointments-modal">
//           <h3>📋 {t.titleDoctorAppointments} - {selectedDoctor?.fullName}</h3>
          
//           {appointments.length === 0 ? (
//             <div className="doctor-empty">📭 No appointments found</div>
//           ) : (
//             <>
//               <div className="doctor-table-wrapper">
//                 <table className="appt-table">
//                   <thead>
//                     <tr>
//                       <th style={{ width: '40px' }}>#</th>
//                       <th>{t.col.patient}</th>
//                       <th>{t.col.time}</th>
//                       <th>{t.col.notes}</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {appointments.map((appt, index) => (
//                       <tr
//                         key={appt.id}
//                         style={{
//                           background: selectedAppointment?.id === appt.id ? '#ebf8ff' : 'white',
//                           cursor: 'pointer'
//                         }}
//                         onClick={() => setSelectedAppointment(appt)}
//                       >
//                         <td>{index + 1}</td>
//                         <td>{appt.patientName}</td>
//                         <td>{appt.appointmentTime}</td>
//                         <td>{appt.notes}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="appt-actions">
//                 <button
//                   style={{
//                     background: '#fc8181',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     padding: '8px 20px',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => {
//                     if (selectedAppointment) {
//                       if (window.confirm('Delete this appointment?')) {
//                         deleteAppointment(selectedAppointment.id);
//                       }
//                     } else {
//                       setNotification({
//                         type: 'error',
//                         message: t.alert.selectAppointment,
//                         visible: true
//                       });
//                     }
//                   }}
//                 >
//                   🗑️ {t.btn.deleteAppointment}
//                 </button>
//                 <button
//                   style={{
//                     background: '#ed8936',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     padding: '8px 20px',
//                     fontWeight: 'bold',
//                     cursor: 'pointer',
//                   }}
//                   onClick={() => {
//                     if (!selectedAppointment) {
//                       setNotification({
//                         type: 'error',
//                         message: t.alert.selectAppointment,
//                         visible: true
//                       });
//                       return;
//                     }
//                     setReassignDoctorId('');
//                     setShowReassign(true);
//                   }}
//                 >
//                   🔄 {t.btn.reassignAppointment}
//                 </button>
//               </div>
//             </>
//           )}
          
//           <div className="modal-actions" style={{ marginTop: '15px' }}>
//             <button
//               className="btn-secondary"
//               onClick={() => {
//                 setShowAppointments(false);
//                 setSelectedAppointment(null);
//               }}
//             >
//               {t.btn.close}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderReassignModal = () => {
//     if (!showReassign) return null;
    
//     return (
//       <div className="doctor-modal-overlay">
//         <div className="doctor-modal doctor-reassign-modal">
//           <h3>🔄 {t.titleReassign}</h3>
          
//           <div className="form-group">
//             <label>{t.label.newDoctor}</label>
//             <select
//               value={reassignDoctorId}
//               onChange={(e) => setReassignDoctorId(e.target.value)}
//             >
//               <option value="">{t.prompt.selectDoctor}</option>
//               {doctors.map(doctor => (
//                 <option key={doctor.id} value={doctor.id}>
//                   {doctor.fullName} ({doctor.specialty})
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="modal-actions">
//             <button
//               className="btn-secondary"
//               onClick={() => setShowReassign(false)}
//             >
//               {t.btn.close}
//             </button>
//             <button
//               className="btn-primary"
//               onClick={handleReassignAppointment}
//               disabled={!reassignDoctorId}
//             >
//               ✅ {t.btn.assign}
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
//       <div className="doctor-container">
//         {/* Header */}
//         <div className="doctor-header">
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div>
//               <h2>👨‍⚕️ {t.title}</h2>
//               <div className="underline"></div>
//             </div>
//             <button
//               onClick={onClose}
//               style={{
//                 background: '#e2e8f0',
//                 border: 'none',
//                 padding: '8px 20px',
//                 borderRadius: '8px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//               }}
//             >
//               ✕ {t.btn.close}
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         {renderStats()}

//         {/* Tools Wrapper (Buttons + Search) */}
//         <div className="doctor-tools-wrapper">
//           {renderButtonsRow()}
//           {renderSearchTools()}
//         </div>

//         {/* Content */}
//         <div className="doctor-content">
//           {loading ? (
//             <div className="doctor-loading">⏳ Loading...</div>
//           ) : (
//             viewMode === 'table' ? renderTable() : renderCards()
//           )}
//         </div>

//         {/* Status Bar */}
//         {renderStatusBar()}

//         {/* Modals */}
//         {renderDoctorFormModal()}
//         {renderChangePasswordModal()}
//         {renderAppointmentsModal()}
//         {renderReassignModal()}
        
//         {/* Notification */}
//         {renderNotification()}
//       </div>
//     </>
//   );
// };

// export default DoctorManagementScreen; 11072026 11:20 pm

import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Data Classes ----------
class DoctorRow {
  constructor(data = {}) {
    this.id = data.id || 0;
    this.firstName = data.firstName || '';
    this.middleName = data.middleName || '';
    this.lastName = data.lastName || '';
    this.specialty = data.specialty || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.username = data.username || '';
    this.password = data.password || '';
    this.fullName = `${this.firstName} ${this.middleName} ${this.lastName}`.trim();
  }

  static fromJson(json) {
    return new DoctorRow({
      id: json.id || 0,
      firstName: json.firstName || '',
      middleName: json.middleName || '',
      lastName: json.lastName || '',
      specialty: json.specialty || '',
      email: json.email || '',
      phone: json.phone || '',
      username: json.username || '',
      password: json.password || '',
    });
  }
}

class AppointmentRow {
  constructor(data = {}) {
    this.id = data.id || 0;
    this.patientName = data.patientName || '';
    this.appointmentTime = data.appointmentTime || '';
    this.notes = data.notes || '';
  }

  static fromJson(json) {
    return new AppointmentRow({
      id: json.id || 0,
      patientName: json.patientName || json.patient?.fullName || '',
      appointmentTime: json.appointmentTime || '',
      notes: json.notes || '',
    });
  }
}

// ---------- Main Component ----------
const DoctorManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
  // ---------- Translations ----------
  const t = React.useMemo(() => {
    const translations = {
      en: {
        title: 'Doctor Management',
        stat: { total: 'Total Doctors' },
        search: { placeholder: 'Search doctors...' },
        btn: {
          table: 'Table',
          cards: 'Cards',
          refresh: 'Refresh',
          add: 'Add Doctor',
          update: 'Update',
          delete: 'Delete',
          viewAppointments: 'View Appointments',
          changePassword: 'Change Password',
          save: 'Save',
          yes: 'Yes',
          no: 'No',
          assign: 'Assign',
          deleteAppointment: 'Delete Appointment',
          reassignAppointment: 'Reassign',
          close: 'Close',
        },
        col: {
          id: 'ID',
          firstName: 'First Name',
          middleName: 'Middle Name',
          lastName: 'Last Name',
          specialty: 'Specialty',
          email: 'Email',
          phone: 'Phone',
          username: 'Username',
          password: 'Password',
          patient: 'Patient',
          time: 'Time',
          notes: 'Notes',
        },
        label: {
          firstName: 'First Name',
          middleName: 'Middle Name',
          lastName: 'Last Name',
          specialty: 'Specialty',
          email: 'Email',
          phone: 'Phone',
          username: 'Username',
          password: 'Password',
          oldPassword: 'Old Password',
          newPassword: 'New Password',
          confirmPassword: 'Confirm Password',
          newDoctor: 'New Doctor',
          noDoctors: 'No doctors found',
          showing: 'Showing',
          records: 'records',
        },
        titleAddDoctor: 'Add Doctor',
        titleUpdateDoctor: 'Update Doctor',
        titleChangePassword: 'Change Password',
        titleDoctorAppointments: 'Appointments',
        titleReassign: 'Reassign Appointment',
        alert: {
          selectDoctor: 'Please select a doctor first',
          selectAppointment: 'Please select an appointment first',
          fillAllFields: 'Please fill all required fields',
          invalidFirstName: 'First name must be at least 3 letters',
          invalidLastName: 'Last name must be at least 3 letters',
          invalidPassword: 'Password must be at least 6 characters',
          invalidEmail: 'Please enter a valid email',
          invalidPhone: 'Phone must be 7-15 digits',
          saved: 'Doctor saved successfully',
          deleted: 'Doctor deleted successfully',
          errorSaveDoctor: 'Error saving doctor',
          errorDeleteDoctor: 'Error deleting doctor',
          errorLoadDoctors: 'Error loading doctors',
          passwordChanged: 'Password changed successfully',
          errorChangePassword: 'Error changing password',
          passwordMismatch: 'Passwords do not match',
          appointmentDeleted: 'Appointment deleted successfully',
          errorDeleteAppointment: 'Error deleting appointment',
          appointmentReassigned: 'Appointment reassigned successfully',
          errorReassignAppointment: 'Error reassigning appointment',
          errorFetchAppointments: 'Error fetching appointments',
          errorFetchDoctors: 'Error fetching doctors',
        },
        confirm: {
          delete: { title: 'Confirm Delete', content: 'Are you sure you want to delete this doctor?' },
        },
        status: {
          ready: 'Ready',
          refreshing: 'Refreshing...',
          selected: 'Selected',
          added: 'Added successfully',
          updated: 'Updated successfully',
          deleted: 'Deleted successfully',
          passwordChanged: 'Password changed successfully',
          reassigned: 'Reassigned successfully',
        },
        prompt: { selectDoctor: 'Select a doctor' },
        msg: {
          confirmClose: 'Are you sure you want to close this screen?',
        },
      },
      ar: {
        title: 'إدارة الأطباء',
        stat: { total: 'إجمالي الأطباء' },
        search: { placeholder: 'بحث عن الأطباء...' },
        btn: {
          table: 'جدول',
          cards: 'بطاقات',
          refresh: 'تحديث',
          add: 'إضافة طبيب',
          update: 'تعديل',
          delete: 'حذف',
          viewAppointments: 'عرض المواعيد',
          changePassword: 'تغيير كلمة المرور',
          save: 'حفظ',
          yes: 'نعم',
          no: 'لا',
          assign: 'تعيين',
          deleteAppointment: 'حذف الموعد',
          reassignAppointment: 'إعادة تعيين',
          close: 'إغلاق',
        },
        col: {
          id: 'الرقم',
          firstName: 'الاسم الأول',
          middleName: 'الاسم الأوسط',
          lastName: 'الاسم الأخير',
          specialty: 'التخصص',
          email: 'البريد الإلكتروني',
          phone: 'الهاتف',
          username: 'اسم المستخدم',
          password: 'كلمة المرور',
          patient: 'المريض',
          time: 'الوقت',
          notes: 'ملاحظات',
        },
        label: {
          firstName: 'الاسم الأول',
          middleName: 'الاسم الأوسط',
          lastName: 'الاسم الأخير',
          specialty: 'التخصص',
          email: 'البريد الإلكتروني',
          phone: 'الهاتف',
          username: 'اسم المستخدم',
          password: 'كلمة المرور',
          oldPassword: 'كلمة المرور القديمة',
          newPassword: 'كلمة المرور الجديدة',
          confirmPassword: 'تأكيد كلمة المرور',
          newDoctor: 'طبيب جديد',
          noDoctors: 'لا يوجد أطباء',
          showing: 'عرض',
          records: 'سجلات',
        },
        titleAddDoctor: 'إضافة طبيب',
        titleUpdateDoctor: 'تعديل طبيب',
        titleChangePassword: 'تغيير كلمة المرور',
        titleDoctorAppointments: 'المواعيد',
        titleReassign: 'إعادة تعيين الموعد',
        alert: {
          selectDoctor: 'يرجى اختيار طبيب أولاً',
          selectAppointment: 'يرجى اختيار موعد أولاً',
          fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',
          invalidFirstName: 'الاسم الأول يجب أن يكون 3 أحرف على الأقل',
          invalidLastName: 'الاسم الأخير يجب أن يكون 3 أحرف على الأقل',
          invalidPassword: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
          invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
          invalidPhone: 'الهاتف يجب أن يكون 7-15 رقم',
          saved: 'تم حفظ الطبيب بنجاح',
          deleted: 'تم حذف الطبيب بنجاح',
          errorSaveDoctor: 'خطأ في حفظ الطبيب',
          errorDeleteDoctor: 'خطأ في حذف الطبيب',
          errorLoadDoctors: 'خطأ في تحميل الأطباء',
          passwordChanged: 'تم تغيير كلمة المرور بنجاح',
          errorChangePassword: 'خطأ في تغيير كلمة المرور',
          passwordMismatch: 'كلمات المرور غير متطابقة',
          appointmentDeleted: 'تم حذف الموعد بنجاح',
          errorDeleteAppointment: 'خطأ في حذف الموعد',
          appointmentReassigned: 'تم إعادة تعيين الموعد بنجاح',
          errorReassignAppointment: 'خطأ في إعادة تعيين الموعد',
          errorFetchAppointments: 'خطأ في جلب المواعيد',
          errorFetchDoctors: 'خطأ في جلب الأطباء',
        },
        confirm: {
          delete: { title: 'تأكيد الحذف', content: 'هل أنت متأكد من حذف هذا الطبيب؟' },
        },
        status: {
          ready: 'جاهز',
          refreshing: 'جاري التحديث...',
          selected: 'تم الاختيار',
          added: 'تمت الإضافة بنجاح',
          updated: 'تم التعديل بنجاح',
          deleted: 'تم الحذف بنجاح',
          passwordChanged: 'تم تغيير كلمة المرور بنجاح',
          reassigned: 'تم إعادة التعيين بنجاح',
        },
        prompt: { selectDoctor: 'اختر طبيباً' },
        msg: {
          confirmClose: 'هل أنت متأكد من إغلاق هذه الشاشة؟',
        },
      },
    };
    return translations[lang] || translations.en;
  }, [lang]);

  // ---------- State ----------
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
  const [stats, setStats] = useState({ total: 0 });
  
  // Modal states
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showReassign, setShowReassign] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    specialty: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [reassignDoctorId, setReassignDoctorId] = useState('');

  // Notification state
  const [notification, setNotification] = useState({ type: '', message: '', visible: false });

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
  const loadDoctors = useCallback(async () => {
    setLoading(true);
    setStatusMsg(`⏳ ${t.status.refreshing}`);

    try {
      const res = await fetch(`${BASE_URL}/api/doctors`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      const doctorsData = Array.isArray(data) ? data : [data];
      
      const parsedDoctors = doctorsData.map(item => DoctorRow.fromJson(item));
      
      setDoctors(parsedDoctors);
      setFilteredDoctors(parsedDoctors);
      setStats({ total: parsedDoctors.length });
      
      setStatusMsg(`✅ ${t.status.ready} (${parsedDoctors.length} ${t.label.records})`);
    } catch (err) {
      setStatusMsg(`❌ ${t.alert.errorLoadDoctors}: ${err.message}`);
      setDoctors([]);
      setFilteredDoctors([]);
    } finally {
      setLoading(false);
    }
  }, [t]);

  const saveDoctor = useCallback(async (doctorData) => {
    try {
      const isUpdate = !!editingDoctor;
      const url = isUpdate 
        ? `${BASE_URL}/api/doctors/${editingDoctor.id}`
        : `${BASE_URL}/api/doctors`;
      
      const payload = {
        firstName: doctorData.firstName.trim(),
        middleName: doctorData.middleName ? doctorData.middleName.trim() : '',
        lastName: doctorData.lastName.trim(),
        specialty: doctorData.specialty.trim(),
        email: doctorData.email.trim(),
        phone: doctorData.phone.trim(),
        username: doctorData.username.trim(),
        password: doctorData.password.trim(),
      };

      const res = await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let responseBody;
      try {
        responseBody = await res.json();
      } catch {
        responseBody = await res.text();
      }

      if (!res.ok) {
        const errorMessage = typeof responseBody === 'object' && responseBody.message
          ? responseBody.message
          : typeof responseBody === 'string'
          ? responseBody
          : `HTTP ${res.status}`;
        throw new Error(errorMessage);
      }

      setNotification({
        type: 'success',
        message: `✅ ${t.alert.saved}`,
        visible: true
      });
      
      setShowDoctorForm(false);
      setEditingDoctor(null);
      loadDoctors();
      logAction(isUpdate ? 'UPDATE_DOCTOR' : 'ADD_DOCTOR', 
        `${isUpdate ? 'Updated' : 'Added'} doctor: ${payload.firstName} ${payload.lastName}`);
      setStatusMsg(`✅ ${isUpdate ? t.status.updated : t.status.added}`);
    } catch (err) {
      setNotification({
        type: 'error',
        message: `❌ Error: ${err.message}`,
        visible: true
      });
    }
  }, [editingDoctor, loadDoctors, t, logAction]);

  const deleteDoctor = useCallback(async (doctorId) => {
    if (!window.confirm(t.confirm.delete.content)) return;
    
    try {
      const res = await fetch(`${BASE_URL}/api/doctors/${doctorId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      setNotification({
        type: 'success',
        message: `✅ ${t.alert.deleted}`,
        visible: true
      });
      
      setSelectedDoctor(null);
      loadDoctors();
      logAction('DELETE_DOCTOR', `Deleted doctor ID: ${doctorId}`);
      setStatusMsg(`🗑️ ${t.status.deleted}`);
    } catch (err) {
      setNotification({
        type: 'error',
        message: `❌ ${t.alert.errorDeleteDoctor}: ${err.message}`,
        visible: true
      });
    }
  }, [loadDoctors, t, logAction]);

  const changePassword = useCallback(async (username, oldPassword, newPassword) => {
    try {
      if (!oldPassword.trim() || !newPassword.trim()) {
        setNotification({
          type: 'error',
          message: 'Old password and new password are required',
          visible: true
        });
        return;
      }
      if (newPassword.length < 6) {
        setNotification({
          type: 'error',
          message: 'New password must be at least 6 characters',
          visible: true
        });
        return;
      }

      const payload = { username, oldPassword, newPassword };

      const res = await fetch(`${BASE_URL}/api/doctors/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let responseBody;
      const contentType = res.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseBody = await res.json();
      } else {
        responseBody = await res.text();
      }

      if (!res.ok) {
        const errorMessage = typeof responseBody === 'object' && responseBody.message
          ? responseBody.message
          : typeof responseBody === 'string'
          ? responseBody
          : `HTTP ${res.status}`;
        throw new Error(errorMessage);
      }

      setNotification({
        type: 'success',
        message: `✅ ${t.alert.passwordChanged}`,
        visible: true
      });
      
      setShowChangePassword(false);
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setStatusMsg(`✅ ${t.status.passwordChanged}`);
      logAction('CHANGE_PASSWORD', `Changed password for doctor: ${username}`);
      loadDoctors();
      
    } catch (err) {
      setNotification({
        type: 'error',
        message: `❌ Error: ${err.message}`,
        visible: true
      });
      setStatusMsg(`❌ Error: ${err.message}`);
    }
  }, [t, logAction, loadDoctors]);

  const loadAppointments = useCallback(async (doctorId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/appointments/doctor/${doctorId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      const data = await res.json();
      const appointmentsData = Array.isArray(data) ? data : [data];
      
      const parsedAppointments = appointmentsData.map(item => AppointmentRow.fromJson(item));
      setAppointments(parsedAppointments);
    } catch (err) {
      setNotification({
        type: 'error',
        message: `❌ ${t.alert.errorFetchAppointments}`,
        visible: true
      });
    }
  }, [t]);

  const deleteAppointment = useCallback(async (appointmentId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      setNotification({
        type: 'success',
        message: `✅ ${t.alert.appointmentDeleted}`,
        visible: true
      });
      
      setAppointments(prev => prev.filter(a => a.id !== appointmentId));
      setSelectedAppointment(null);
      logAction('DELETE_APPOINTMENT', `Deleted appointment ID: ${appointmentId}`);
    } catch (err) {
      setNotification({
        type: 'error',
        message: `❌ ${t.alert.errorDeleteAppointment}`,
        visible: true
      });
    }
  }, [t, logAction]);

  const reassignAppointment = useCallback(async (appointmentId, newDoctorId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/appointments/${appointmentId}/reassign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorId: newDoctorId }),
      });
      
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      
      setNotification({
        type: 'success',
        message: `✅ ${t.alert.appointmentReassigned}`,
        visible: true
      });
      
      setShowReassign(false);
      setSelectedAppointment(null);
      setReassignDoctorId('');
      loadAppointments(selectedDoctor.id);
      logAction('REASSIGN_APPOINTMENT', `Reassigned appointment ${appointmentId} to doctor ${newDoctorId}`);
      setStatusMsg(`✅ ${t.status.reassigned}`);
    } catch (err) {
      setNotification({
        type: 'error',
        message: `❌ ${t.alert.errorReassignAppointment}`,
        visible: true
      });
    }
  }, [selectedDoctor, loadAppointments, t, logAction]);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredDoctors(doctors);
      return;
    }
    
    const filtered = doctors.filter(doctor => {
      return (
        doctor.firstName.toLowerCase().includes(query) ||
        doctor.lastName.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.email.toLowerCase().includes(query) ||
        doctor.username.toLowerCase().includes(query) ||
        doctor.fullName.toLowerCase().includes(query)
      );
    });
    
    setFilteredDoctors(filtered);
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setStatusMsg(`✅ ${t.status.selected}: ${doctor.fullName}`);
  };

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      specialty: '',
      email: '',
      phone: '',
      username: '',
      password: '',
    });
    setShowDoctorForm(true);
  };

  const handleEditDoctor = () => {
    if (!selectedDoctor) {
      setNotification({
        type: 'error',
        message: t.alert.selectDoctor,
        visible: true
      });
      return;
    }
    setEditingDoctor(selectedDoctor);
    setFormData({
      firstName: selectedDoctor.firstName,
      middleName: selectedDoctor.middleName,
      lastName: selectedDoctor.lastName,
      specialty: selectedDoctor.specialty,
      email: selectedDoctor.email,
      phone: selectedDoctor.phone,
      username: selectedDoctor.username,
      password: selectedDoctor.password,
    });
    setShowDoctorForm(true);
  };

  const handleDeleteDoctor = () => {
    if (!selectedDoctor) {
      setNotification({
        type: 'error',
        message: t.alert.selectDoctor,
        visible: true
      });
      return;
    }
    deleteDoctor(selectedDoctor.id);
  };

  const handleViewAppointments = () => {
    if (!selectedDoctor) {
      setNotification({
        type: 'error',
        message: t.alert.selectDoctor,
        visible: true
      });
      return;
    }
    loadAppointments(selectedDoctor.id);
    setShowAppointments(true);
  };

  const handleChangePassword = () => {
    if (!selectedDoctor) {
      setNotification({
        type: 'error',
        message: t.alert.selectDoctor,
        visible: true
      });
      return;
    }
    
    setPasswordData({
      oldPassword: selectedDoctor.password || '',
      newPassword: '',
      confirmPassword: '',
    });
    setShowChangePassword(true);
  };

  const handleSaveDoctor = () => {
    const { firstName, lastName, specialty, email, phone, username, password } = formData;
    
    if (!firstName.trim() || !lastName.trim() || !specialty.trim() || 
        !email.trim() || !phone.trim() || !username.trim() || !password.trim()) {
      setNotification({
        type: 'error',
        message: t.alert.fillAllFields,
        visible: true
      });
      return;
    }
    
    if (firstName.length < 3) {
      setNotification({
        type: 'error',
        message: t.alert.invalidFirstName,
        visible: true
      });
      return;
    }
    
    if (lastName.length < 3) {
      setNotification({
        type: 'error',
        message: t.alert.invalidLastName,
        visible: true
      });
      return;
    }
    
    if (password.length < 6) {
      setNotification({
        type: 'error',
        message: t.alert.invalidPassword,
        visible: true
      });
      return;
    }
    
    if (!email.match(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/)) {
      setNotification({
        type: 'error',
        message: t.alert.invalidEmail,
        visible: true
      });
      return;
    }
    
    if (!phone.match(/^\d{7,15}$/)) {
      setNotification({
        type: 'error',
        message: t.alert.invalidPhone,
        visible: true
      });
      return;
    }
    
    saveDoctor(formData);
  };

  const handleSavePassword = () => {
    const { oldPassword, newPassword, confirmPassword } = passwordData;
    
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setNotification({
        type: 'error',
        message: t.alert.fillAllFields,
        visible: true
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setNotification({
        type: 'error',
        message: t.alert.passwordMismatch,
        visible: true
      });
      return;
    }
    
    if (newPassword.length < 6) {
      setNotification({
        type: 'error',
        message: t.alert.invalidPassword,
        visible: true
      });
      return;
    }
    
    setStatusMsg('⏳ Changing password...');
    changePassword(selectedDoctor.username, oldPassword, newPassword);
  };

  const handleReassignAppointment = () => {
    if (!selectedAppointment) {
      setNotification({
        type: 'error',
        message: t.alert.selectAppointment,
        visible: true
      });
      return;
    }
    if (!reassignDoctorId) {
      setNotification({
        type: 'error',
        message: t.alert.selectDoctor,
        visible: true
      });
      return;
    }
    reassignAppointment(selectedAppointment.id, parseInt(reassignDoctorId));
  };

  const handleViewToggle = (mode) => {
    setViewMode(mode);
  };

  // ---------- Effects ----------
  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  useEffect(() => {
    if (notification.visible) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, visible: false });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // ---------- Render Helpers ----------
  const renderNotification = () => {
    if (!notification.visible) return null;
    
    const backgroundColor = notification.type === 'success' ? '#48bb78' : '#fc8181';
    const borderColor = notification.type === 'success' ? '#38a169' : '#e53e3e';
    
    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: backgroundColor,
        color: 'white',
        padding: '15px 25px',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        zIndex: 9999,
        maxWidth: '400px',
        animation: 'slideIn 0.3s ease-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderLeft: `4px solid ${borderColor}`
      }}>
        <span>{notification.message}</span>
        <button
          onClick={() => setNotification({ ...notification, visible: false })}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            marginLeft: '15px',
            fontWeight: 'bold'
          }}
        >
          ×
        </button>
      </div>
    );
  };

  // ---------- Render ----------
  return (
    <>
      <style>{`
        /* ==================== DOCTOR MANAGEMENT STYLES ==================== */
        .doctor-container {
          padding: 20px;
          background: #f0f4f8;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .doctor-header {
          margin-bottom: 20px;
        }

        .doctor-header h2 {
          font-size: 28px;
          font-weight: bold;
          color: #1a202c;
          margin: 0 0 5px 0;
        }

        .doctor-header .underline {
          height: 3px;
          width: 60px;
          background: linear-gradient(to right, #4299e1, #2b6cb0);
          border-radius: 2px;
        }

        .doctor-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 15px;
        }

        .doctor-stat-card {
          background: white;
          padding: 15px 20px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border-left: 4px solid #4299e1;
          min-width: 150px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .doctor-stat-card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }

        .doctor-stat-card .icon { font-size: 24px; }
        .doctor-stat-card .value { font-size: 24px; font-weight: bold; color: #4299e1; }
        .doctor-stat-card .label { font-size: 12px; color: #718096; }

        .doctor-tools-wrapper {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 15px;
        }

        .doctor-buttons-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .doctor-buttons-row button {
          padding: 8px 20px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
          min-width: 120px;
          min-height: 38px;
        }

        .doctor-buttons-row button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .doctor-buttons-row button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .doctor-search-tools {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .doctor-search-box {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 25px;
          border: 1px solid #e2e8f0;
          padding: 5px 15px;
          flex: 1;
          min-width: 200px;
        }

        .doctor-search-box input {
          border: none;
          outline: none;
          padding: 8px 5px;
          font-size: 14px;
          flex: 1;
          background: transparent;
          min-height: 38px;
        }

        .doctor-search-box .search-icon {
          font-size: 14px;
          color: #a0aec0;
        }

        .doctor-view-toggle {
          display: flex;
          gap: 5px;
        }

        .doctor-view-toggle button {
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

        .doctor-view-toggle button.active {
          background: #4299e1;
          color: white;
          border-color: #4299e1;
        }

        .doctor-view-toggle button:hover:not(.active) {
          background: #f7fafc;
        }

        .doctor-content {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          overflow: hidden;
          min-height: 400px;
          position: relative;
        }

        .doctor-table-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .doctor-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 800px;
        }

        .doctor-table th {
          padding: 12px 15px;
          text-align: left;
          background: #f8f9fa;
          font-weight: bold;
          color: #2d3748;
          border-bottom: 2px solid #e2e8f0;
        }

        .doctor-table td {
          padding: 10px 15px;
          border-bottom: 1px solid #edf2f7;
        }

        .doctor-table tr:hover td {
          background: #f7fafc;
        }

        .doctor-table tr.selected td {
          background: #ebf8ff;
        }

        .doctor-table .password-mask {
          color: #718096;
          font-family: monospace;
        }

        .doctor-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 15px;
          padding: 15px;
        }

        .doctor-card {
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border: 1px solid #edf2f7;
          cursor: pointer;
          transition: all 0.2s;
        }

        .doctor-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }

        .doctor-card.selected {
          background: #fc8181;
          border-color: #e53e3e;
          color: white;
        }

        .doctor-card.selected .card-text {
          color: white !important;
        }

        .doctor-card .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .doctor-card .card-id {
          background: #4299e1;
          color: white;
          padding: 2px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }

        .doctor-card .card-name {
          font-size: 16px;
          font-weight: bold;
          color: #2d3748;
        }

        .doctor-card .card-specialty {
          font-size: 13px;
          color: #4a5568;
        }

        .doctor-card .card-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 8px;
          font-size: 13px;
          color: #4a5568;
        }

        .doctor-card .card-actions {
          margin-top: 10px;
          display: flex;
          gap: 5px;
        }

        .doctor-card .card-actions button {
          padding: 4px 12px;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 30px;
        }

        .doctor-card .card-actions button:hover {
          transform: scale(1.05);
        }

        .doctor-status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 15px;
          background: #f7fafc;
          border-top: 1px solid #e2e8f0;
          font-size: 13px;
          color: #4a5568;
          flex-wrap: wrap;
          gap: 8px;
        }

        .doctor-status-bar .status-msg {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .doctor-loading {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 18px;
          color: #a0aec0;
        }

        .doctor-empty {
          text-align: center;
          padding: 40px;
          color: #a0aec0;
        }

        /* Modal Styles */
        .doctor-modal-overlay {
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

        .doctor-modal {
          background: white;
          border-radius: 12px;
          padding: 25px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: slideUp 0.3s ease;
        }

        .doctor-modal h3 {
          margin: 0 0 15px 0;
          color: #2d3748;
        }

        .doctor-modal .form-group {
          margin-bottom: 15px;
        }

        .doctor-modal .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          color: #2d3748;
          font-size: 14px;
        }

        .doctor-modal .form-group input,
        .doctor-modal .form-group select {
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          background: white;
          transition: border-color 0.2s;
          min-height: 40px;
        }

        .doctor-modal .form-group input:focus,
        .doctor-modal .form-group select:focus {
          outline: none;
          border-color: #4299e1;
        }

        .doctor-modal .modal-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .doctor-modal .modal-actions button {
          padding: 8px 30px;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 38px;
        }

        .doctor-modal .modal-actions button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .doctor-modal .modal-actions .btn-primary {
          background: #48bb78;
          color: white;
        }

        .doctor-modal .modal-actions .btn-primary:disabled {
          background: #a0aec0;
          cursor: not-allowed;
        }

        .doctor-modal .modal-actions .btn-secondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .doctor-appointments-modal {
          max-width: 800px;
        }

        .doctor-appointments-modal .appt-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          min-width: 400px;
        }

        .doctor-appointments-modal .appt-table th {
          padding: 10px;
          text-align: left;
          background: #f8f9fa;
          border-bottom: 2px solid #e2e8f0;
        }

        .doctor-appointments-modal .appt-table td {
          padding: 8px 10px;
          border-bottom: 1px solid #edf2f7;
        }

        .doctor-appointments-modal .appt-table tr:hover td {
          background: #f7fafc;
        }

        .doctor-appointments-modal .appt-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 15px;
          flex-wrap: wrap;
        }

        .doctor-reassign-modal {
          max-width: 450px;
        }

        .doctor-reassign-modal select {
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          background: white;
          min-height: 40px;
        }

        .doctor-change-password-modal {
          max-width: 450px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .doctor-container {
            padding: 12px;
          }

          .doctor-header h2 {
            font-size: 22px;
          }

          .doctor-stats {
            grid-template-columns: 1fr 1fr;
          }

          .doctor-buttons-row {
            flex-direction: column;
            width: 100%;
          }

          .doctor-buttons-row button {
            width: 100%;
            min-width: unset;
          }

          .doctor-search-tools {
            flex-direction: column;
            width: 100%;
          }

          .doctor-search-box {
            width: 100%;
            min-width: unset;
          }

          .doctor-view-toggle {
            width: 100%;
            justify-content: center;
          }

          .doctor-view-toggle button {
            flex: 1;
            text-align: center;
          }

          .doctor-modal {
            padding: 20px;
            max-width: 95%;
            margin: 10px;
          }

          .doctor-card-grid {
            grid-template-columns: 1fr;
          }

          .doctor-status-bar {
            flex-direction: column;
            text-align: center;
          }

          .doctor-appointments-modal .appt-actions {
            flex-direction: column;
          }

          .doctor-appointments-modal .appt-actions button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .doctor-container {
            padding: 8px;
          }

          .doctor-header h2 {
            font-size: 18px;
          }

          .doctor-stats {
            grid-template-columns: 1fr;
          }

          .doctor-stat-card {
            min-width: unset;
          }

          .doctor-modal {
            padding: 15px;
            max-width: 98%;
          }

          .doctor-modal h3 {
            font-size: 18px;
          }

          .doctor-modal .form-group input,
          .doctor-modal .form-group select {
            font-size: 15px;
            min-height: 36px;
          }

          .doctor-modal .modal-actions {
            flex-direction: column;
          }

          .doctor-modal .modal-actions button {
            width: 100%;
          }

          .doctor-table {
            font-size: 12px;
            min-width: 600px;
          }

          .doctor-table th,
          .doctor-table td {
            padding: 6px 8px;
          }

          .doctor-card .card-name {
            font-size: 14px;
          }

          .doctor-card .card-actions {
            flex-direction: column;
          }

          .doctor-card .card-actions button {
            width: 100%;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .doctor-card-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .doctor-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .doctor-container {
            background: #1a1a2e;
          }

          .doctor-header h2 {
            color: #ecf0f1;
          }

          .doctor-stat-card {
            background: #2d2d44;
            border-left-color: #4299e1;
          }

          .doctor-stat-card .value {
            color: #4299e1;
          }

          .doctor-stat-card .label {
            color: #b0b0b0;
          }

          .doctor-content {
            background: #2d2d44;
          }

          .doctor-table th {
            background: #1a1a2e;
            color: #ecf0f1;
            border-bottom-color: #3d3d5c;
          }

          .doctor-table td {
            color: #b0b0b0;
            border-bottom-color: #3d3d5c;
          }

          .doctor-table tr:hover td {
            background: #1a1a2e;
          }

          .doctor-table tr.selected td {
            background: #1a2744;
          }

          .doctor-card {
            background: #2d2d44;
            border-color: #3d3d5c;
          }

          .doctor-card .card-name {
            color: #ecf0f1;
          }

          .doctor-card .card-specialty {
            color: #b0b0b0;
          }

          .doctor-card .card-details {
            color: #b0b0b0;
          }

          .doctor-card .card-id {
            background: #4299e1;
          }

          .doctor-card.selected {
            background: #fc8181;
            border-color: #e53e3e;
          }

          .doctor-search-box {
            background: #2d2d44;
            border-color: #3d3d5c;
          }

          .doctor-search-box input {
            color: #ecf0f1;
          }

          .doctor-search-box input::placeholder {
            color: #666;
          }

          .doctor-view-toggle button {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #b0b0b0;
          }

          .doctor-view-toggle button.active {
            background: #4299e1;
            color: white;
            border-color: #4299e1;
          }

          .doctor-view-toggle button:hover:not(.active) {
            background: #3d3d5c;
          }

          .doctor-status-bar {
            background: #1a1a2e;
            border-top-color: #3d3d5c;
            color: #b0b0b0;
          }

          .doctor-modal {
            background: #1a1a2e;
          }

          .doctor-modal h3 {
            color: #ecf0f1;
          }

          .doctor-modal .form-group label {
            color: #b0b0b0;
          }

          .doctor-modal .form-group input,
          .doctor-modal .form-group select {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .doctor-modal .form-group input:focus,
          .doctor-modal .form-group select:focus {
            border-color: #4299e1;
          }

          .doctor-modal .modal-actions .btn-secondary {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .doctor-modal .modal-actions .btn-secondary:hover {
            background: #3d3d5c;
          }

          .doctor-appointments-modal .appt-table th {
            background: #1a1a2e;
            color: #ecf0f1;
            border-bottom-color: #3d3d5c;
          }

          .doctor-appointments-modal .appt-table td {
            color: #b0b0b0;
            border-bottom-color: #3d3d5c;
          }

          .doctor-appointments-modal .appt-table tr:hover td {
            background: #1a1a2e;
          }

          .doctor-empty {
            color: #666;
          }

          .doctor-loading {
            color: #666;
          }
        }
      `}</style>

      <div className="doctor-container">
        {/* Header */}
        <div className="doctor-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2>👨‍⚕️ {t.title}</h2>
              <div className="underline"></div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: '#e2e8f0',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                minHeight: '38px'
              }}
            >
              ✕ {t.btn.close}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="doctor-stats">
          <div className="doctor-stat-card">
            <div className="icon">👥</div>
            <div className="value">{stats.total}</div>
            <div className="label">{t.stat.total}</div>
          </div>
        </div>

        {/* Tools Wrapper (Buttons + Search) */}
        <div className="doctor-tools-wrapper">
          <div className="doctor-buttons-row">
            <button
              onClick={handleAddDoctor}
              style={{ background: '#48bb78', color: 'white' }}
            >
              ➕ {t.btn.add}
            </button>
            <button
              onClick={handleEditDoctor}
              disabled={!selectedDoctor}
              style={{ background: '#4299e1', color: 'white' }}
            >
              ✏️ {t.btn.update}
            </button>
            <button
              onClick={handleDeleteDoctor}
              disabled={!selectedDoctor}
              style={{ background: '#fc8181', color: 'white' }}
            >
              🗑️ {t.btn.delete}
            </button>
            <button
              onClick={handleViewAppointments}
              disabled={!selectedDoctor}
              style={{ background: '#805ad5', color: 'white' }}
            >
              📋 {t.btn.viewAppointments}
            </button>
            <button
              onClick={handleChangePassword}
              disabled={!selectedDoctor}
              style={{ background: '#ed8936', color: 'white' }}
            >
              🔑 {t.btn.changePassword}
            </button>
          </div>
          
          <div className="doctor-search-tools">
            <div className="doctor-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder={t.search.placeholder}
              />
            </div>
            
            <div className="doctor-view-toggle">
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
            
            <button
              onClick={loadDoctors}
              style={{
                background: '#4299e1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                minHeight: '38px'
              }}
            >
              🔄 {t.btn.refresh}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="doctor-content">
          {loading ? (
            <div className="doctor-loading">⏳ Loading...</div>
          ) : filteredDoctors.length === 0 ? (
            <div className="doctor-empty">📭 {t.label.noDoctors}</div>
          ) : viewMode === 'table' ? (
            <div className="doctor-table-wrapper">
              <table className="doctor-table">
                <thead>
                  <tr>
                    <th>{t.col.id}</th>
                    <th>{t.col.firstName}</th>
                    <th>{t.col.middleName}</th>
                    <th>{t.col.lastName}</th>
                    <th>{t.col.specialty}</th>
                    <th>{t.col.email}</th>
                    <th>{t.col.phone}</th>
                    <th>{t.col.username}</th>
                    <th>{t.col.password}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map(doctor => (
                    <tr
                      key={doctor.id}
                      className={selectedDoctor?.id === doctor.id ? 'selected' : ''}
                      onClick={() => handleSelectDoctor(doctor)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{doctor.id}</td>
                      <td>{doctor.firstName}</td>
                      <td>{doctor.middleName}</td>
                      <td>{doctor.lastName}</td>
                      <td>{doctor.specialty}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.phone}</td>
                      <td>{doctor.username}</td>
                      <td className="password-mask">****</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="doctor-card-grid">
              {filteredDoctors.map(doctor => (
                <div
                  key={doctor.id}
                  className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                  onClick={() => handleSelectDoctor(doctor)}
                >
                  <div className="card-header">
                    <span className="card-id">#{doctor.id}</span>
                    <span className="card-name">{doctor.fullName}</span>
                  </div>
                  <div className="card-specialty">🩺 {doctor.specialty}</div>
                  <div className="card-details">
                    <div>📧 {doctor.email}</div>
                    <div>📱 {doctor.phone}</div>
                    <div>👤 {doctor.username}</div>
                  </div>
                  <div className="card-actions">
                    <button
                      style={{ background: '#4299e1', color: 'white' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDoctor(doctor);
                        loadAppointments(doctor.id);
                        setShowAppointments(true);
                      }}
                    >
                      📋 {t.btn.viewAppointments}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="doctor-status-bar">
          <div className="status-msg">{statusMsg}</div>
          <div>🕐 {new Date().toLocaleTimeString()}</div>
        </div>

        {/* Modals */}
        {showDoctorForm && (
          <div className="doctor-modal-overlay" onClick={() => setShowDoctorForm(false)}>
            <div className="doctor-modal" onClick={(e) => e.stopPropagation()}>
              <h3>{editingDoctor ? `✏️ ${t.titleUpdateDoctor}` : `➕ ${t.titleAddDoctor}`}</h3>
              
              <div className="form-group">
                <label>{t.label.firstName}</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>{t.label.middleName}</label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>{t.label.lastName}</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>{t.label.specialty}</label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>{t.label.email}</label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>{t.label.phone}</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>{t.label.username}</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>{t.label.password}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowDoctorForm(false)}>
                  {t.btn.close}
                </button>
                <button className="btn-primary" onClick={handleSaveDoctor}>
                  💾 {t.btn.save}
                </button>
              </div>
            </div>
          </div>
        )}

        {showChangePassword && (
          <div className="doctor-modal-overlay" onClick={() => setShowChangePassword(false)}>
            <div className="doctor-modal doctor-change-password-modal" onClick={(e) => e.stopPropagation()}>
              <h3>🔑 {t.titleChangePassword}</h3>
              
              <div className="form-group">
                <label>Doctor</label>
                <div style={{ 
                  padding: '10px 15px', 
                  background: '#f7fafc', 
                  borderRadius: '8px',
                  color: '#2d3748',
                  fontWeight: 'bold'
                }}>
                  {selectedDoctor?.fullName} ({selectedDoctor?.username})
                </div>
              </div>
              
              <div className="form-group">
                <label>{t.label.oldPassword}</label>
                <input
                  type="password"
                  value={passwordData.oldPassword}
                  readOnly
                  style={{ 
                    backgroundColor: '#f7fafc', 
                    cursor: 'not-allowed',
                    color: '#718096'
                  }}
                />
                <div style={{ fontSize: '12px', color: '#718096', marginTop: '4px' }}>
                  ℹ️ Auto-filled from system (hidden)
                </div>
              </div>
              
              <div className="form-group">
                <label>{t.label.newPassword}</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="Enter new password (min 6 characters)"
                />
              </div>
              
              <div className="form-group">
                <label>{t.label.confirmPassword}</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="Confirm new password"
                />
              </div>
              
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => {
                  setShowChangePassword(false);
                  setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                }}>
                  {t.btn.close}
                </button>
                <button className="btn-primary" onClick={handleSavePassword}>
                  💾 {t.btn.save}
                </button>
              </div>
            </div>
          </div>
        )}

        {showAppointments && (
          <div className="doctor-modal-overlay" onClick={() => {
            setShowAppointments(false);
            setSelectedAppointment(null);
          }}>
            <div className="doctor-modal doctor-appointments-modal" onClick={(e) => e.stopPropagation()}>
              <h3>📋 {t.titleDoctorAppointments} - {selectedDoctor?.fullName}</h3>
              
              {appointments.length === 0 ? (
                <div className="doctor-empty">📭 No appointments found</div>
              ) : (
                <>
                  <div className="doctor-table-wrapper">
                    <table className="appt-table">
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>#</th>
                          <th>{t.col.patient}</th>
                          <th>{t.col.time}</th>
                          <th>{t.col.notes}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appt, index) => (
                          <tr
                            key={appt.id}
                            style={{
                              background: selectedAppointment?.id === appt.id ? '#ebf8ff' : 'white',
                              cursor: 'pointer'
                            }}
                            onClick={() => setSelectedAppointment(appt)}
                          >
                            <td>{index + 1}</td>
                            <td>{appt.patientName}</td>
                            <td>{appt.appointmentTime}</td>
                            <td>{appt.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="appt-actions">
                    <button
                      style={{
                        background: '#fc8181',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 20px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        minHeight: '38px'
                      }}
                      onClick={() => {
                        if (selectedAppointment) {
                          if (window.confirm('Delete this appointment?')) {
                            deleteAppointment(selectedAppointment.id);
                          }
                        } else {
                          setNotification({
                            type: 'error',
                            message: t.alert.selectAppointment,
                            visible: true
                          });
                        }
                      }}
                    >
                      🗑️ {t.btn.deleteAppointment}
                    </button>
                    <button
                      style={{
                        background: '#ed8936',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 20px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        minHeight: '38px'
                      }}
                      onClick={() => {
                        if (!selectedAppointment) {
                          setNotification({
                            type: 'error',
                            message: t.alert.selectAppointment,
                            visible: true
                          });
                          return;
                        }
                        setReassignDoctorId('');
                        setShowReassign(true);
                      }}
                    >
                      🔄 {t.btn.reassignAppointment}
                    </button>
                  </div>
                </>
              )}
              
              <div className="modal-actions" style={{ marginTop: '15px' }}>
                <button className="btn-secondary" onClick={() => {
                  setShowAppointments(false);
                  setSelectedAppointment(null);
                }}>
                  {t.btn.close}
                </button>
              </div>
            </div>
          </div>
        )}

        {showReassign && (
          <div className="doctor-modal-overlay" onClick={() => setShowReassign(false)}>
            <div className="doctor-modal doctor-reassign-modal" onClick={(e) => e.stopPropagation()}>
              <h3>🔄 {t.titleReassign}</h3>
              
              <div className="form-group">
                <label>{t.label.newDoctor}</label>
                <select
                  value={reassignDoctorId}
                  onChange={(e) => setReassignDoctorId(e.target.value)}
                >
                  <option value="">{t.prompt.selectDoctor}</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.fullName} ({doctor.specialty})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="modal-actions">
                <button className="btn-secondary" onClick={() => setShowReassign(false)}>
                  {t.btn.close}
                </button>
                <button className="btn-primary" onClick={handleReassignAppointment} disabled={!reassignDoctorId}>
                  ✅ {t.btn.assign}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Notification */}
        {renderNotification()}
      </div>
    </>
  );
};

export default DoctorManagementScreen;