// // DoctorGuide.js
// import React, { useState, useEffect } from 'react';

// const DoctorGuide = ({ isOpen, onClose, locale = 'en' }) => {
//     const [currentStep, setCurrentStep] = useState(0);
//     const [activeGuide, setActiveGuide] = useState('menu'); // 'menu', 'doctor'

//     // Reset state when modal opens
//     useEffect(() => {
//         if (isOpen) {
//             setCurrentStep(0);
//             setActiveGuide('menu');
//         }
//     }, [isOpen]);

//     // ==================== TRANSLATIONS ====================
//     const translations = {
//         en: {
//             title: 'Doctor Guides',
//             close: 'Close',
//             previous: 'Previous',
//             next: 'Next',
//             finish: 'Finish',
//             backToMenu: 'Back to Menu',
//             menu: {
//                 title: 'Select a Guide',
//                 subtitle: 'Choose which guide you would like to view:',
//                 doctorWorkflow: {
//                     title: '👨‍⚕️ Doctor Workflow',
//                     description: 'Complete guide for doctors: Dashboard, patient search, visit management, and clinical documentation'
//                 }
//             },
//             // ==================== DOCTOR WORKFLOW ====================
//             doctor: {
//                 title: 'Doctor Workflow Guide',
//                 steps: [
//                     {
//                         id: 'dashboard',
//                         title: '📊 Doctor Dashboard',
//                         description: 'The Doctor Dashboard provides a comprehensive overview of your daily practice. Monitor visits, track performance, and manage patient care.',
//                         details: [
//                             'Summary Cards: Today\'s Visits, Total Visits, New Visits, Closed Visits',
//                             'Performance Widget: Patients seen today, open visits, completion rate',
//                             'Visit List: Filter and view all patient visits',
//                             'Quick Actions: Find visit by ID, view notifications'
//                         ],
//                         actions: [
//                             'View summary statistics at a glance',
//                             'Track your daily performance metrics',
//                             'Filter visits by Today, All, New, In Progress, or Closed',
//                             'Search for specific visits by patient name, phone, or ID',
//                             'Toggle between grid and list view layouts',
//                             'Sort visits by date (ascending/descending)'
//                         ],
//                         screenshot: '📊'
//                     },
//                     {
//                         id: 'sidebar',
//                         title: '📋 Sidebar Navigation',
//                         description: 'The sidebar provides quick access to essential tools and features for patient management.',
//                         details: [
//                             'Search Patient: Find and view patient records',
//                             'Reports: Access analytics and reports',
//                             'Change Password: Update your login credentials',
//                             'Logout: Securely exit the system'
//                         ],
//                         actions: [
//                             'Click "Search Patient" to find patients by name or mobile',
//                             'Access "Reports" to view practice analytics',
//                             'Use "Change Password" to update your security credentials',
//                             'Click "Logout" to securely exit the application',
//                             'Sidebar auto-expands on hover for easy access'
//                         ],
//                         screenshot: '📋'
//                     },
//                     {
//                         id: 'searchPatient',
//                         title: '🔍 Search Patient',
//                         description: 'Search for patients by name or mobile number. View patient details, history, and manage their care.',
//                         details: [
//                             'Search by Name: Enter patient first or last name',
//                             'Search by Mobile: Enter full mobile number',
//                             'View patient list with ID, name, phone, type, and status',
//                             'Access patient history with one click',
//                             'Pagination for large result sets'
//                         ],
//                         actions: [
//                             'Select search type: Name or Mobile',
//                             'Enter at least 2 characters to search',
//                             'Click Search or press Enter to perform search',
//                             'Click on a patient row to select them',
//                             'Use the History button to view patient\'s visit history',
//                             'Navigate through pages using pagination controls'
//                         ],
//                         screenshot: '🔍'
//                     },
//                     {
//                         id: 'patientHistory',
//                         title: '📜 Patient History',
//                         description: 'View comprehensive patient history including all past visits, diagnoses, and treatments.',
//                         details: [
//                             'Complete visit history with dates and details',
//                             'Visit information: ID, type, status, doctor',
//                             'Medical information: Chief complaint, history, medications, allergies',
//                             'Doctor notes from each visit'
//                         ],
//                         actions: [
//                             'Select a patient and click "History" to view their records',
//                             'View all past visits in chronological order',
//                             'See detailed information for each visit',
//                             'Track patient\'s medical journey over time'
//                         ],
//                         screenshot: '📜'
//                     },
//                     {
//                         id: 'visitManagement',
//                         title: '🏥 Visit Management',
//                         description: 'Manage patient visits from start to finish. Start new visits, document clinical information, and close visits.',
//                         details: [
//                             'Start Visit: Begin a new patient consultation',
//                             'Visit Details: Document chief complaint, history, medications, allergies',
//                             'Drugs: Search, add, and prescribe medications',
//                             'Procedures: Select and record medical procedures',
//                             'Discharge: Complete the visit with discharge status'
//                         ],
//                         actions: [
//                             'Click "Start Visit" to begin a new consultation',
//                             'Document Chief Complaint, History, Medications, and Allergies',
//                             'Add Doctor Notes for clinical observations',
//                             'Search and add drugs to the visit',
//                             'Prescribe drugs with duration, frequency, dose, and instructions',
//                             'Select and add procedures from Radiology, Laboratory, or Medical categories',
//                             'Set discharge status: Not Discharged, Discharged, Follow-up Required, or Referred',
//                             'Save visit details and close the visit when complete'
//                         ],
//                         screenshot: '🏥'
//                     },
//                     {
//                         id: 'drugPrescription',
//                         title: '💊 Drug Prescription',
//                         description: 'Comprehensive drug management system. Search medications, add favorites, and prescribe with detailed instructions.',
//                         details: [
//                             'Search Drugs: Find medications by trade name',
//                             'Favorite Drugs: Quickly access commonly prescribed medications',
//                             'Selected Drugs: View and manage drugs added to the visit',
//                             'Prescription Dialog: Set duration, frequency, dose, and instructions'
//                         ],
//                         actions: [
//                             'Search for drugs by name using the search box',
//                             'Click "Add" (➕) to add a drug to the current visit',
//                             'Click the star (★/☆) to add/remove from favorites',
//                             'For selected drugs, click "Prescription" (📋) to open the prescription dialog',
//                             'Set duration: Enter number and select type (Hour, Day, Week, Month, Year)',
//                             'Select frequency from available options',
//                             'Enter dose and instructions for the patient',
//                             'View existing prescriptions with the "View" (👁) button',
//                             'Remove drugs from the visit when needed'
//                         ],
//                         screenshot: '💊'
//                     },
//                     {
//                         id: 'procedures',
//                         title: '🔬 Procedures',
//                         description: 'Select and record medical procedures from various categories. Track procedures performed during the visit.',
//                         details: [
//                             'Radiology: Imaging procedures like MRI, CT, X-Ray, Ultrasound',
//                             'Laboratory: Lab tests like blood work, PCR, urinalysis',
//                             'Medical: Clinical procedures and examinations',
//                             'Selected Procedures: View all procedures added to the visit'
//                         ],
//                         actions: [
//                             'Search within each category (Radiology, Laboratory, Medical)',
//                             'Click "Add" (➕) to add a procedure to the visit',
//                             'View all selected procedures in the "Selected Procedures" section',
//                             'Remove procedures using the "Remove" (✖) button',
//                             'Procedures are categorized with icons for easy identification'
//                         ],
//                         screenshot: '🔬'
//                     },
//                     {
//                         id: 'visitClosure',
//                         title: '✅ Visit Closure & Discharge',
//                         description: 'Complete the visit with proper documentation and discharge. Ensure all clinical data is recorded before closing.',
//                         details: [
//                             'Clinical Documentation: Chief complaint, history, medications, allergies, notes',
//                             'Drug Prescriptions: All prescribed medications',
//                             'Procedures: All procedures performed',
//                             'Discharge Status: Select appropriate discharge status',
//                             'Visit Closure: Finalize the visit and generate reports'
//                         ],
//                         actions: [
//                             'Review all clinical documentation for completeness',
//                             'Verify drug prescriptions and procedures',
//                             'Set discharge status: Not Discharged, Discharged, Follow-up Required, Referred',
//                             'Click "Close Visit" to finalize the visit',
//                             'Visit status updates to "CLOSED"',
//                             'Generate PDF reports for patient records'
//                         ],
//                         screenshot: '✅'
//                     },
//                     {
//                         id: 'reports',
//                         title: '📊 Reports & Analytics',
//                         description: 'Access practice analytics and generate comprehensive reports for patient care documentation.',
//                         details: [
//                             'Full Visit Report: Complete patient visit history',
//                             'Patient Info: Patient demographics and visit summary',
//                             'Medical Info: Clinical data and observations',
//                             'Drugs Report: All prescribed medications',
//                             'Procedures Report: All procedures performed',
//                             'Combined Reports: Patient + Drugs, Patient + Procedures'
//                         ],
//                         actions: [
//                             'From Visit Details, click "PDF" buttons to generate reports',
//                             'Full Report: Complete visit documentation',
//                             'Patient Info: Patient details and visit summary',
//                             'Medical Info: Clinical notes and observations',
//                             'Drugs Report: All prescribed medications with details',
//                             'Procedures Report: All procedures performed',
//                             'Patient + Drugs: Combined patient info and drugs',
//                             'Patient + Procedures: Combined patient info and procedures'
//                         ],
//                         screenshot: '📊'
//                     },
//                     {
//                         id: 'changePassword',
//                         title: '🔒 Change Password',
//                         description: 'Securely update your login credentials. Change your password regularly for security best practices.',
//                         details: [
//                             'Old Password: Enter your current password',
//                             'New Password: Enter your new password (min 6 characters)',
//                             'Confirm Password: Verify your new password',
//                             'Show Passwords: Toggle visibility of password fields'
//                         ],
//                         actions: [
//                             'Navigate to Change Password from sidebar',
//                             'Enter your current password',
//                             'Enter your new password (minimum 6 characters)',
//                             'Confirm your new password',
//                             'Click "Save" to update your credentials',
//                             'Success message confirms password change'
//                         ],
//                         screenshot: '🔒'
//                     }
//                 ]
//             }
//         },
//         ar: {
//             title: 'أدلة الطبيب',
//             close: 'إغلاق',
//             previous: 'السابق',
//             next: 'التالي',
//             finish: 'إنهاء',
//             backToMenu: 'العودة إلى القائمة',
//             menu: {
//                 title: 'اختر دليلاً',
//                 subtitle: 'اختر الدليل الذي تريد عرضه:',
//                 doctorWorkflow: {
//                     title: '👨‍⚕️ سير عمل الطبيب',
//                     description: 'دليل كامل للأطباء: لوحة التحكم، البحث عن المرضى، إدارة الزيارات، والتوثيق السريري'
//                 }
//             },
//             // ==================== DOCTOR WORKFLOW ====================
//             doctor: {
//                 title: 'دليل سير عمل الطبيب',
//                 steps: [
//                     {
//                         id: 'dashboard',
//                         title: '📊 لوحة تحكم الطبيب',
//                         description: 'توفر لوحة تحكم الطبيب نظرة شاملة على ممارستك اليومية. راقب الزيارات وتتبع الأداء وأدر رعاية المرضى.',
//                         details: [
//                             'بطاقات الملخص: زيارات اليوم، إجمالي الزيارات، الزيارات الجديدة، الزيارات المغلقة',
//                             'أداة الأداء: المرضى الذين تمت رؤيتهم اليوم، الزيارات المفتوحة، معدل الإنجاز',
//                             'قائمة الزيارات: تصفية وعرض جميع زيارات المرضى',
//                             'إجراءات سريعة: البحث عن زيارة بالمعرف، عرض الإشعارات'
//                         ],
//                         actions: [
//                             'عرض إحصائيات الملخص في لمحة',
//                             'تتبع مقاييس أدائك اليومي',
//                             'تصفية الزيارات حسب اليوم، الكل، جديد، قيد التنفيذ، أو مغلق',
//                             'البحث عن زيارات محددة باسم المريض أو رقم الهاتف أو المعرف',
//                             'التبديل بين تخطيط الشبكة والقائمة',
//                             'ترتيب الزيارات حسب التاريخ (تصاعدي/تنازلي)'
//                         ],
//                         screenshot: '📊'
//                     },
//                     {
//                         id: 'sidebar',
//                         title: '📋 شريط التنقل الجانبي',
//                         description: 'يوفر الشريط الجانبي وصولاً سريعاً إلى الأدوات والميزات الأساسية لإدارة المرضى.',
//                         details: [
//                             'البحث عن مريض: العثور على سجلات المرضى وعرضها',
//                             'التقارير: الوصول إلى التحليلات والتقارير',
//                             'تغيير كلمة المرور: تحديث بيانات اعتماد الدخول الخاصة بك',
//                             'تسجيل الخروج: الخروج الآمن من النظام'
//                         ],
//                         actions: [
//                             'انقر "البحث عن مريض" للعثور على المرضى بالاسم أو رقم الجوال',
//                             'الوصول إلى "التقارير" لعرض تحليلات الممارسة',
//                             'استخدم "تغيير كلمة المرور" لتحديث بيانات الأمان الخاصة بك',
//                             'انقر "تسجيل الخروج" للخروج الآمن من التطبيق',
//                             'يتوسع الشريط الجانبي تلقائياً عند التمرير فوقه لسهولة الوصول'
//                         ],
//                         screenshot: '📋'
//                     },
//                     {
//                         id: 'searchPatient',
//                         title: '🔍 بحث عن مريض',
//                         description: 'ابحث عن المرضى بالاسم أو رقم الجوال. عرض تفاصيل المريض والتاريخ وإدارة رعايتهم.',
//                         details: [
//                             'البحث بالاسم: إدخال الاسم الأول أو الأخير للمريض',
//                             'البحث بالجوال: إدخال رقم الجوال كاملاً',
//                             'عرض قائمة المرضى مع المعرف والاسم والهاتف والنوع والحالة',
//                             'الوصول إلى تاريخ المريض بنقرة واحدة',
//                             'ترقيم الصفحات لمجموعات النتائج الكبيرة'
//                         ],
//                         actions: [
//                             'اختر نوع البحث: الاسم أو الجوال',
//                             'أدخل حرفين على الأقل للبحث',
//                             'انقر بحث أو اضغط Enter لإجراء البحث',
//                             'انقر على صف المريض لتحديده',
//                             'استخدم زر التاريخ لعرض تاريخ زيارات المريض',
//                             'التنقل بين الصفحات باستخدام عناصر التحكم في الترقيم'
//                         ],
//                         screenshot: '🔍'
//                     },
//                     {
//                         id: 'patientHistory',
//                         title: '📜 تاريخ المريض',
//                         description: 'عرض تاريخ المريض الشامل بما في ذلك جميع الزيارات السابقة والتشخيصات والعلاجات.',
//                         details: [
//                             'تاريخ الزيارات الكامل مع التواريخ والتفاصيل',
//                             'معلومات الزيارة: المعرف، النوع، الحالة، الطبيب',
//                             'المعلومات الطبية: الشكوى الرئيسية، التاريخ، الأدوية، الحساسية',
//                             'ملاحظات الطبيب من كل زيارة'
//                         ],
//                         actions: [
//                             'اختر مريضاً وانقر "التاريخ" لعرض سجلاته',
//                             'عرض جميع الزيارات السابقة بترتيب زمني',
//                             'رؤية معلومات مفصلة لكل زيارة',
//                             'تتبع رحلة المريض الطبية بمرور الوقت'
//                         ],
//                         screenshot: '📜'
//                     },
//                     {
//                         id: 'visitManagement',
//                         title: '🏥 إدارة الزيارات',
//                         description: 'إدارة زيارات المرضى من البداية إلى النهاية. بدء زيارات جديدة، توثيق المعلومات السريرية، وإغلاق الزيارات.',
//                         details: [
//                             'بدء الزيارة: بدء استشارة مريض جديدة',
//                             'تفاصيل الزيارة: توثيق الشكوى الرئيسية، التاريخ، الأدوية، الحساسية',
//                             'الأدوية: البحث وإضافة ووصف الأدوية',
//                             'الإجراءات: تحديد وتسجيل الإجراءات الطبية',
//                             'الخروج: إكمال الزيارة مع حالة الخروج'
//                         ],
//                         actions: [
//                             'انقر "بدء الزيارة" لبدء استشارة جديدة',
//                             'توثيق الشكوى الرئيسية والتاريخ والأدوية والحساسية',
//                             'إضافة ملاحظات الطبيب للملاحظات السريرية',
//                             'البحث وإضافة الأدوية إلى الزيارة',
//                             'وصف الأدوية مع المدة والتكرار والجرعة والتعليمات',
//                             'تحديد وإضافة الإجراءات من فئات الأشعة أو المختبر أو الطبية',
//                             'تعيين حالة الخروج: لم يخرج، خرج، متابعة مطلوبة، أو تم التحويل',
//                             'حفظ تفاصيل الزيارة وإغلاق الزيارة عند الانتهاء'
//                         ],
//                         screenshot: '🏥'
//                     },
//                     {
//                         id: 'drugPrescription',
//                         title: '💊 وصف الأدوية',
//                         description: 'نظام شامل لإدارة الأدوية. البحث عن الأدوية، إضافة المفضلة، والوصف مع تعليمات مفصلة.',
//                         details: [
//                             'البحث عن الأدوية: العثور على الأدوية بالاسم التجاري',
//                             'الأدوية المفضلة: الوصول السريع إلى الأدوية الشائعة الاستخدام',
//                             'الأدوية المختارة: عرض وإدارة الأدوية المضافة إلى الزيارة',
//                             'حوار الوصف: تعيين المدة والتكرار والجرعة والتعليمات'
//                         ],
//                         actions: [
//                             'البحث عن الأدوية بالاسم باستخدام مربع البحث',
//                             'انقر "إضافة" (➕) لإضافة دواء إلى الزيارة الحالية',
//                             'انقر النجمة (★/☆) لإضافة/إزالة من المفضلة',
//                             'للأدوية المختارة، انقر "وصف" (📋) لفتح حوار الوصف',
//                             'تعيين المدة: إدخال الرقم وتحديد النوع (ساعة، يوم، أسبوع، شهر، سنة)',
//                             'اختر التكرار من الخيارات المتاحة',
//                             'إدخال الجرعة والتعليمات للمريض',
//                             'عرض الوصفات الحالية باستخدام زر "عرض" (👁)',
//                             'إزالة الأدوية من الزيارة عند الحاجة'
//                         ],
//                         screenshot: '💊'
//                     },
//                     {
//                         id: 'procedures',
//                         title: '🔬 الإجراءات',
//                         description: 'تحديد وتسجيل الإجراءات الطبية من فئات مختلفة. تتبع الإجراءات التي تمت أثناء الزيارة.',
//                         details: [
//                             'الأشعة: إجراءات التصوير مثل MRI، CT، X-Ray، الموجات فوق الصوتية',
//                             'المختبر: اختبارات المختبر مثل فحص الدم، PCR، تحليل البول',
//                             'الطبي: الإجراءات والفحوصات السريرية',
//                             'الإجراءات المختارة: عرض جميع الإجراءات المضافة إلى الزيارة'
//                         ],
//                         actions: [
//                             'البحث داخل كل فئة (الأشعة، المختبر، الطبي)',
//                             'انقر "إضافة" (➕) لإضافة إجراء إلى الزيارة',
//                             'عرض جميع الإجراءات المختارة في قسم "الإجراءات المختارة"',
//                             'إزالة الإجراءات باستخدام زر "إزالة" (✖)',
//                             'يتم تصنيف الإجراءات بأيقونات لسهولة التعرف عليها'
//                         ],
//                         screenshot: '🔬'
//                     },
//                     {
//                         id: 'visitClosure',
//                         title: '✅ إغلاق الزيارة والخروج',
//                         description: 'إكمال الزيارة مع التوثيق المناسب والخروج. تأكد من تسجيل جميع البيانات السريرية قبل الإغلاق.',
//                         details: [
//                             'التوثيق السريري: الشكوى الرئيسية، التاريخ، الأدوية، الحساسية، الملاحظات',
//                             'وصفات الأدوية: جميع الأدوية الموصوفة',
//                             'الإجراءات: جميع الإجراءات التي تمت',
//                             'حالة الخروج: اختيار حالة الخروج المناسبة',
//                             'إغلاق الزيارة: إنهاء الزيارة وتوليد التقارير'
//                         ],
//                         actions: [
//                             'مراجعة جميع التوثيق السريري للتأكد من الاكتمال',
//                             'التحقق من وصفات الأدوية والإجراءات',
//                             'تعيين حالة الخروج: لم يخرج، خرج، متابعة مطلوبة، تم التحويل',
//                             'انقر "إغلاق الزيارة" لإنهاء الزيارة',
//                             'تتغير حالة الزيارة إلى "مغلق"',
//                             'توليد تقارير PDF لسجلات المرضى'
//                         ],
//                         screenshot: '✅'
//                     },
//                     {
//                         id: 'reports',
//                         title: '📊 التقارير والتحليلات',
//                         description: 'الوصول إلى تحليلات الممارسة وتوليد تقارير شاملة لتوثيق رعاية المرضى.',
//                         details: [
//                             'تقرير الزيارة الكامل: تاريخ زيارة المريض الكامل',
//                             'معلومات المريض: بيانات المريض وملخص الزيارة',
//                             'المعلومات الطبية: البيانات السريرية والملاحظات',
//                             'تقرير الأدوية: جميع الأدوية الموصوفة',
//                             'تقرير الإجراءات: جميع الإجراءات التي تمت',
//                             'تقارير مجمعة: المريض + الأدوية، المريض + الإجراءات'
//                         ],
//                         actions: [
//                             'من تفاصيل الزيارة، انقر أزرار "PDF" لتوليد التقارير',
//                             'التقرير الكامل: توثيق الزيارة الكامل',
//                             'معلومات المريض: تفاصيل المريض وملخص الزيارة',
//                             'المعلومات الطبية: الملاحظات والملاحظات السريرية',
//                             'تقرير الأدوية: جميع الأدوية الموصوفة مع التفاصيل',
//                             'تقرير الإجراءات: جميع الإجراءات التي تمت',
//                             'المريض + الأدوية: معلومات المريض والأدوية مجمعة',
//                             'المريض + الإجراءات: معلومات المريض والإجراءات مجمعة'
//                         ],
//                         screenshot: '📊'
//                     },
//                     {
//                         id: 'changePassword',
//                         title: '🔒 تغيير كلمة المرور',
//                         description: 'تحديث بيانات اعتماد الدخول الخاصة بك بشكل آمن. قم بتغيير كلمة المرور بانتظام لأفضل ممارسات الأمان.',
//                         details: [
//                             'كلمة المرور القديمة: إدخال كلمة المرور الحالية',
//                             'كلمة المرور الجديدة: إدخال كلمة المرور الجديدة (6 أحرف على الأقل)',
//                             'تأكيد كلمة المرور: التحقق من كلمة المرور الجديدة',
//                             'إظهار كلمات المرور: تبديل رؤية حقول كلمة المرور'
//                         ],
//                         actions: [
//                             'انتقل إلى تغيير كلمة المرور من الشريط الجانبي',
//                             'أدخل كلمة المرور الحالية',
//                             'أدخل كلمة المرور الجديدة (6 أحرف على الأقل)',
//                             'أكد كلمة المرور الجديدة',
//                             'انقر "حفظ" لتحديث بيانات الاعتماد الخاصة بك',
//                             'تؤكد رسالة النجاح تغيير كلمة المرور'
//                         ],
//                         screenshot: '🔒'
//                     }
//                 ]
//             }
//         }
//     };

//     const t = translations[locale] || translations.en;
//     const isRTL = locale === 'ar';

//     // ==================== NAVIGATION HELPERS ====================
//     const getCurrentSteps = () => {
//         if (activeGuide === 'doctor') return t.doctor.steps;
//         return [];
//     };

//     const getCurrentTitle = () => {
//         if (activeGuide === 'doctor') return t.doctor.title;
//         return t.menu.title;
//     };

//     const getStepIcon = (stepId) => {
//         const icons = {
//             'dashboard': '📊',
//             'sidebar': '📋',
//             'searchPatient': '🔍',
//             'patientHistory': '📜',
//             'visitManagement': '🏥',
//             'drugPrescription': '💊',
//             'procedures': '🔬',
//             'visitClosure': '✅',
//             'reports': '📊',
//             'changePassword': '🔒'
//         };
//         return icons[stepId] || '📍';
//     };

//     const getStepColor = (index, steps) => {
//         if (index === currentStep) return '#9f7aea';
//         if (index < currentStep) return '#48bb78';
//         return '#e2e8f0';
//     };

//     const handleNext = () => {
//         const steps = getCurrentSteps();
//         if (currentStep < steps.length - 1) {
//             setCurrentStep(currentStep + 1);
//         } else {
//             onClose();
//         }
//     };

//     const handlePrevious = () => {
//         if (currentStep > 0) {
//             setCurrentStep(currentStep - 1);
//         }
//     };

//     const handleBackToMenu = () => {
//         setActiveGuide('menu');
//         setCurrentStep(0);
//     };

//     const handleSelectGuide = (guide) => {
//         setActiveGuide(guide);
//         setCurrentStep(0);
//     };

//     const progress = () => {
//         const steps = getCurrentSteps();
//         if (activeGuide === 'menu' || steps.length === 0) return 0;
//         return ((currentStep + 1) / steps.length) * 100;
//     };

//     if (!isOpen) return null;

//     // ==================== RENDER MENU ====================
//     if (activeGuide === 'menu') {
//         return (
//             <div style={styles.overlay} dir={isRTL ? 'rtl' : 'ltr'}>
//                 <div style={styles.modal}>
//                     {/* Header */}
//                     <div style={styles.header}>
//                         <h2 style={styles.title}>{t.title}</h2>
//                         <button 
//                             onClick={onClose}
//                             style={styles.closeButton}
//                             aria-label="Close guide"
//                         >
//                             ✕
//                         </button>
//                     </div>

//                     {/* Content */}
//                     <div style={styles.menuContent}>
//                         <h3 style={styles.menuTitle}>{t.menu.title}</h3>
//                         <p style={styles.menuSubtitle}>{t.menu.subtitle}</p>
                        
//                         <div style={styles.menuGrid}>
//                             {/* Doctor Workflow Card */}
//                             <div 
//                                 style={styles.menuCard}
//                                 onClick={() => handleSelectGuide('doctor')}
//                             >
//                                 <div style={styles.menuCardIcon}>👨‍⚕️</div>
//                                 <h4 style={styles.menuCardTitle}>{t.menu.doctorWorkflow.title}</h4>
//                                 <p style={styles.menuCardDescription}>{t.menu.doctorWorkflow.description}</p>
//                                 <div style={styles.menuCardButton}>▶ {t.next}</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Footer */}
//                     <div style={styles.footer}>
//                         <div style={{ flex: 1 }}></div>
//                         <button
//                             onClick={onClose}
//                             style={styles.secondaryButton}
//                         >
//                             {t.close}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // ==================== RENDER DOCTOR GUIDE ====================
//     const steps = getCurrentSteps();
//     const currentStepData = steps[currentStep];
//     const guideSteps = t.doctor.steps;

//     return (
//         <div style={styles.overlay} dir={isRTL ? 'rtl' : 'ltr'}>
//             <div style={styles.modal}>
//                 {/* Header */}
//                 <div style={styles.header}>
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                         <button
//                             onClick={handleBackToMenu}
//                             style={styles.backButton}
//                             title={t.backToMenu}
//                         >
//                             ←
//                         </button>
//                         <h2 style={styles.title}>{getCurrentTitle()}</h2>
//                     </div>
//                     <button 
//                         onClick={onClose}
//                         style={styles.closeButton}
//                         aria-label="Close guide"
//                     >
//                         ✕
//                     </button>
//                 </div>

//                 {/* Progress Bar */}
//                 <div style={styles.progressContainer}>
//                     <div style={{ ...styles.progressBar, width: `${progress()}%` }} />
//                 </div>

//                 {/* Journey Map */}
//                 <div style={styles.journeyMap}>
//                     {guideSteps.map((step, index) => {
//                         const isActive = index === currentStep;
//                         const isCompleted = index < currentStep;
                        
//                         return (
//                             <div key={step.id} style={styles.journeyItem}>
//                                 {/* Connector line */}
//                                 {index > 0 && (
//                                     <div 
//                                         style={{
//                                             ...styles.journeyConnector,
//                                             background: isCompleted || isActive ? '#9f7aea' : '#e2e8f0'
//                                         }}
//                                     />
//                                 )}
                                
//                                 {/* Journey node */}
//                                 <div 
//                                     style={{
//                                         ...styles.journeyNode,
//                                         background: getStepColor(index, guideSteps),
//                                         transform: isActive ? 'scale(1.1)' : 'scale(1)',
//                                         boxShadow: isActive ? '0 0 20px rgba(159, 122, 234, 0.4)' : 'none'
//                                     }}
//                                     onClick={() => setCurrentStep(index)}
//                                     title={step.title}
//                                 >
//                                     <span style={styles.journeyIcon}>
//                                         {getStepIcon(step.id)}
//                                     </span>
//                                 </div>
                                
//                                 {/* Journey label */}
//                                 <div 
//                                     style={{
//                                         ...styles.journeyLabel,
//                                         color: getStepColor(index, guideSteps),
//                                         fontWeight: isActive ? 'bold' : 'normal'
//                                     }}
//                                 >
//                                     {isRTL ? `الخطوة ${index + 1}` : `Step ${index + 1}`}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* Step Indicators */}
//                 <div style={styles.stepIndicators}>
//                     {guideSteps.map((step, index) => (
//                         <div
//                             key={index}
//                             style={{
//                                 ...styles.stepDot,
//                                 background: getStepColor(index, guideSteps)
//                             }}
//                             onClick={() => setCurrentStep(index)}
//                             title={`${isRTL ? 'الخطوة' : 'Step'} ${index + 1}: ${step.title}`}
//                         />
//                     ))}
//                 </div>

//                 {/* Content */}
//                 <div style={styles.content}>
//                     {/* Step Number */}
//                     <div style={styles.stepNumber}>
//                         {isRTL ? `الخطوة ${currentStep + 1} من ${guideSteps.length}` : `Step ${currentStep + 1} of ${guideSteps.length}`}
//                     </div>

//                     {/* Step Title */}
//                     <h3 style={styles.stepTitle}>{currentStepData.title}</h3>

//                     {/* Screenshot/Icon */}
//                     <div style={styles.screenshotContainer}>
//                         <span style={styles.screenshotIcon}>{currentStepData.screenshot}</span>
//                     </div>

//                     {/* Description */}
//                     <p style={styles.description}>{currentStepData.description}</p>

//                     {/* ==================== DETAILS FOR ALL STEPS ==================== */}
//                     <div style={styles.detailsContainer}>
//                         <h4 style={styles.detailsTitle}>📌 {isRTL ? 'نقاط رئيسية:' : 'Key Points:'}</h4>
//                         <ul style={styles.list}>
//                             {currentStepData.details.map((detail, index) => (
//                                 <li key={index} style={styles.listItem}>
//                                     {detail}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>

//                     {/* Actions */}
//                     <div style={styles.actionsContainer}>
//                         <h4 style={styles.actionsTitle}>🎯 {isRTL ? 'ماذا يمكنك أن تفعل:' : 'What You Can Do:'}</h4>
//                         <ul style={styles.list}>
//                             {currentStepData.actions.map((action, index) => (
//                                 <li key={index} style={styles.listItem}>
//                                     {action}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div style={styles.footer}>
//                     <button
//                         onClick={handlePrevious}
//                         disabled={currentStep === 0}
//                         style={{
//                             ...styles.button,
//                             ...styles.secondaryButton,
//                             opacity: currentStep === 0 ? 0.5 : 1
//                         }}
//                     >
//                         {t.previous}
//                     </button>
                    
//                     <button
//                         onClick={handleNext}
//                         style={{
//                             ...styles.button,
//                             ...styles.primaryButton
//                         }}
//                     >
//                         {currentStep === guideSteps.length - 1 ? t.finish : t.next}
//                     </button>
//                 </div>
//             </div>

//             {/* Inline styles for the component */}
//             <style jsx>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(20px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 @keyframes slideIn {
//                     from { opacity: 0; transform: scale(0.95); }
//                     to { opacity: 1; transform: scale(1); }
//                 }
//                 @keyframes pulse {
//                     0% { transform: scale(1); }
//                     50% { transform: scale(1.1); }
//                     100% { transform: scale(1); }
//                 }
//             `}</style>
//         </div>
//     );
// };

// // Styles object
// const styles = {
//     overlay: {
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 9999,
//         animation: 'fadeIn 0.3s ease',
//         padding: '20px'
//     },
//     modal: {
//         background: 'white',
//         borderRadius: '16px',
//         maxWidth: '950px',
//         width: '100%',
//         maxHeight: '90vh',
//         overflow: 'hidden',
//         boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
//         animation: 'slideIn 0.3s ease',
//         display: 'flex',
//         flexDirection: 'column'
//     },
//     header: {
//         padding: '20px 24px',
//         borderBottom: '1px solid #e2e8f0',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: '#f7fafc'
//     },
//     title: {
//         margin: 0,
//         fontSize: '20px',
//         color: '#2d3748',
//         fontWeight: 'bold'
//     },
//     closeButton: {
//         background: 'none',
//         border: 'none',
//         fontSize: '24px',
//         cursor: 'pointer',
//         color: '#718096',
//         padding: '4px 8px',
//         borderRadius: '6px',
//         transition: 'all 0.2s'
//     },
//     backButton: {
//         background: '#e2e8f0',
//         border: 'none',
//         borderRadius: '50%',
//         width: '32px',
//         height: '32px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         cursor: 'pointer',
//         fontSize: '18px',
//         fontWeight: 'bold',
//         color: '#4a5568',
//         transition: 'all 0.2s'
//     },
//     progressContainer: {
//         height: '4px',
//         backgroundColor: '#e2e8f0',
//         position: 'relative'
//     },
//     progressBar: {
//         height: '100%',
//         backgroundColor: '#9f7aea',
//         transition: 'width 0.5s ease',
//         borderRadius: '2px'
//     },
//     // Menu Styles
//     menuContent: {
//         padding: '30px 24px',
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     menuTitle: {
//         fontSize: '24px',
//         color: '#2d3748',
//         marginBottom: '8px'
//     },
//     menuSubtitle: {
//         fontSize: '16px',
//         color: '#718096',
//         marginBottom: '30px'
//     },
//     menuGrid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//         gap: '20px',
//         width: '100%',
//         maxWidth: '700px'
//     },
//     menuCard: {
//         background: '#f7fafc',
//         borderRadius: '12px',
//         padding: '24px',
//         border: '2px solid #e2e8f0',
//         cursor: 'pointer',
//         transition: 'all 0.3s ease',
//         textAlign: 'center',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center'
//     },
//     menuCardIcon: {
//         fontSize: '48px',
//         marginBottom: '12px'
//     },
//     menuCardTitle: {
//         fontSize: '18px',
//         fontWeight: 'bold',
//         color: '#2d3748',
//         marginBottom: '8px'
//     },
//     menuCardDescription: {
//         fontSize: '14px',
//         color: '#718096',
//         marginBottom: '16px',
//         flex: 1
//     },
//     menuCardButton: {
//         padding: '8px 24px',
//         background: '#9f7aea',
//         color: 'white',
//         borderRadius: '8px',
//         fontWeight: 'bold',
//         fontSize: '14px',
//         transition: 'all 0.2s'
//     },
//     // Journey Map Styles
//     journeyMap: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: '20px 24px 10px 24px',
//         backgroundColor: '#f7fafc',
//         borderBottom: '1px solid #e2e8f0',
//         position: 'relative'
//     },
//     journeyItem: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         position: 'relative',
//         flex: 1
//     },
//     journeyConnector: {
//         position: 'absolute',
//         top: '20px',
//         left: '-50%',
//         right: '50%',
//         height: '2px',
//         backgroundColor: '#e2e8f0',
//         zIndex: 1
//     },
//     journeyNode: {
//         width: '40px',
//         height: '40px',
//         borderRadius: '50%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         cursor: 'pointer',
//         transition: 'all 0.3s ease',
//         zIndex: 2,
//         border: '2px solid white',
//         boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//     },
//     journeyIcon: {
//         fontSize: '18px',
//         lineHeight: 1
//     },
//     journeyLabel: {
//         marginTop: '8px',
//         fontSize: '10px',
//         textAlign: 'center',
//         transition: 'all 0.3s ease'
//     },
//     stepIndicators: {
//         display: 'flex',
//         justifyContent: 'center',
//         gap: '8px',
//         padding: '8px 0 12px 0',
//         backgroundColor: '#f7fafc'
//     },
//     stepDot: {
//         width: '8px',
//         height: '8px',
//         borderRadius: '50%',
//         cursor: 'pointer',
//         transition: 'all 0.3s ease',
//         border: '2px solid transparent'
//     },
//     content: {
//         padding: '24px',
//         overflowY: 'auto',
//         flex: 1
//     },
//     stepNumber: {
//         fontSize: '12px',
//         color: '#718096',
//         textTransform: 'uppercase',
//         letterSpacing: '1px',
//         marginBottom: '8px'
//     },
//     stepTitle: {
//         fontSize: '22px',
//         color: '#2d3748',
//         marginBottom: '16px',
//         fontWeight: '600'
//     },
//     screenshotContainer: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: '20px',
//         backgroundColor: '#f7fafc',
//         borderRadius: '12px',
//         marginBottom: '16px'
//     },
//     screenshotIcon: {
//         fontSize: '48px'
//     },
//     description: {
//         fontSize: '16px',
//         color: '#4a5568',
//         lineHeight: '1.6',
//         marginBottom: '20px'
//     },
//     detailsContainer: {
//         backgroundColor: '#ebf8ff',
//         padding: '16px',
//         borderRadius: '8px',
//         marginBottom: '16px'
//     },
//     detailsTitle: {
//         margin: '0 0 8px 0',
//         fontSize: '14px',
//         color: '#2b6cb0',
//         fontWeight: '600'
//     },
//     actionsContainer: {
//         backgroundColor: '#f0fff4',
//         padding: '16px',
//         borderRadius: '8px',
//         marginBottom: '20px'
//     },
//     actionsTitle: {
//         margin: '0 0 8px 0',
//         fontSize: '14px',
//         color: '#276749',
//         fontWeight: '600'
//     },
//     list: {
//         margin: 0,
//         padding: '0 0 0 20px'
//     },
//     listItem: {
//         fontSize: '14px',
//         color: '#4a5568',
//         lineHeight: '1.6',
//         marginBottom: '4px'
//     },
//     footer: {
//         padding: '16px 24px',
//         borderTop: '1px solid #e2e8f0',
//         display: 'flex',
//         justifyContent: 'space-between',
//         gap: '10px'
//     },
//     button: {
//         padding: '10px 24px',
//         borderRadius: '8px',
//         cursor: 'pointer',
//         fontWeight: '600',
//         fontSize: '14px',
//         transition: 'all 0.2s',
//         border: 'none'
//     },
//     primaryButton: {
//         backgroundColor: '#9f7aea',
//         color: 'white',
//         flex: 1
//     },
//     secondaryButton: {
//         backgroundColor: '#e2e8f0',
//         color: '#4a5568'
//     }
// };

// export default DoctorGuide;  11072026 11:20 pm

// DoctorGuide.js
import React, { useState, useEffect } from 'react';

const DoctorGuide = ({ isOpen, onClose, locale = 'en' }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [activeGuide, setActiveGuide] = useState('menu');

    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0);
            setActiveGuide('menu');
        }
    }, [isOpen]);

    // ==================== TRANSLATIONS ====================
    const translations = {
        en: {
            title: 'Doctor Guides',
            close: 'Close',
            previous: 'Previous',
            next: 'Next',
            finish: 'Finish',
            backToMenu: 'Back to Menu',
            menu: {
                title: 'Select a Guide',
                subtitle: 'Choose which guide you would like to view:',
                doctorWorkflow: {
                    title: '👨‍⚕️ Doctor Workflow',
                    description: 'Complete guide for doctors: Dashboard, patient search, visit management, and clinical documentation'
                }
            },
            doctor: {
                title: 'Doctor Workflow Guide',
                steps: [
                    {
                        id: 'dashboard',
                        title: '📊 Doctor Dashboard',
                        description: 'The Doctor Dashboard provides a comprehensive overview of your daily practice.',
                        details: [
                            'Summary Cards: Today\'s Visits, Total Visits, New Visits, Closed Visits',
                            'Performance Widget: Patients seen today, open visits, completion rate',
                            'Visit List: Filter and view all patient visits',
                            'Quick Actions: Find visit by ID, view notifications'
                        ],
                        actions: [
                            'View summary statistics at a glance',
                            'Track your daily performance metrics',
                            'Filter visits by Today, All, New, In Progress, or Closed',
                            'Search for specific visits by patient name, phone, or ID'
                        ],
                        screenshot: '📊'
                    },
                    {
                        id: 'sidebar',
                        title: '📋 Sidebar Navigation',
                        description: 'The sidebar provides quick access to essential tools and features.',
                        details: [
                            'Search Patient: Find and view patient records',
                            'Reports: Access analytics and reports',
                            'Change Password: Update your login credentials',
                            'Logout: Securely exit the system'
                        ],
                        actions: [
                            'Click "Search Patient" to find patients by name or mobile',
                            'Access "Reports" to view practice analytics',
                            'Use "Change Password" to update your security credentials',
                            'Click "Logout" to securely exit the application'
                        ],
                        screenshot: '📋'
                    },
                    {
                        id: 'searchPatient',
                        title: '🔍 Search Patient',
                        description: 'Search for patients by name or mobile number.',
                        details: [
                            'Search by Name: Enter patient first or last name',
                            'Search by Mobile: Enter full mobile number',
                            'View patient list with ID, name, phone, type, and status',
                            'Access patient history with one click'
                        ],
                        actions: [
                            'Select search type: Name or Mobile',
                            'Enter at least 2 characters to search',
                            'Click Search or press Enter to perform search',
                            'Click on a patient row to select them'
                        ],
                        screenshot: '🔍'
                    },
                    {
                        id: 'patientHistory',
                        title: '📜 Patient History',
                        description: 'View comprehensive patient history including all past visits.',
                        details: [
                            'Complete visit history with dates and details',
                            'Visit information: ID, type, status, doctor',
                            'Medical information: Chief complaint, history, medications, allergies',
                            'Doctor notes from each visit'
                        ],
                        actions: [
                            'Select a patient and click "History" to view their records',
                            'View all past visits in chronological order',
                            'See detailed information for each visit',
                            'Track patient\'s medical journey over time'
                        ],
                        screenshot: '📜'
                    },
                    {
                        id: 'visitManagement',
                        title: '🏥 Visit Management',
                        description: 'Manage patient visits from start to finish.',
                        details: [
                            'Start Visit: Begin a new patient consultation',
                            'Visit Details: Document chief complaint, history, medications, allergies',
                            'Drugs: Search, add, and prescribe medications',
                            'Procedures: Select and record medical procedures',
                            'Discharge: Complete the visit with discharge status'
                        ],
                        actions: [
                            'Click "Start Visit" to begin a new consultation',
                            'Document Chief Complaint, History, Medications, and Allergies',
                            'Add Doctor Notes for clinical observations',
                            'Search and add drugs to the visit',
                            'Prescribe drugs with duration, frequency, dose, and instructions',
                            'Set discharge status: Not Discharged, Discharged, Follow-up Required, or Referred'
                        ],
                        screenshot: '🏥'
                    },
                    {
                        id: 'drugPrescription',
                        title: '💊 Drug Prescription',
                        description: 'Comprehensive drug management system.',
                        details: [
                            'Search Drugs: Find medications by trade name',
                            'Favorite Drugs: Quickly access commonly prescribed medications',
                            'Selected Drugs: View and manage drugs added to the visit',
                            'Prescription Dialog: Set duration, frequency, dose, and instructions'
                        ],
                        actions: [
                            'Search for drugs by name using the search box',
                            'Click "Add" (➕) to add a drug to the current visit',
                            'Click the star (★/☆) to add/remove from favorites',
                            'Set duration, frequency, dose, and instructions for the patient'
                        ],
                        screenshot: '💊'
                    },
                    {
                        id: 'procedures',
                        title: '🔬 Procedures',
                        description: 'Select and record medical procedures from various categories.',
                        details: [
                            'Radiology: Imaging procedures like MRI, CT, X-Ray, Ultrasound',
                            'Laboratory: Lab tests like blood work, PCR, urinalysis',
                            'Medical: Clinical procedures and examinations',
                            'Selected Procedures: View all procedures added to the visit'
                        ],
                        actions: [
                            'Search within each category (Radiology, Laboratory, Medical)',
                            'Click "Add" (➕) to add a procedure to the visit',
                            'View all selected procedures in the "Selected Procedures" section',
                            'Remove procedures using the "Remove" (✖) button'
                        ],
                        screenshot: '🔬'
                    },
                    {
                        id: 'visitClosure',
                        title: '✅ Visit Closure & Discharge',
                        description: 'Complete the visit with proper documentation and discharge.',
                        details: [
                            'Clinical Documentation: Chief complaint, history, medications, allergies, notes',
                            'Drug Prescriptions: All prescribed medications',
                            'Procedures: All procedures performed',
                            'Discharge Status: Select appropriate discharge status',
                            'Visit Closure: Finalize the visit and generate reports'
                        ],
                        actions: [
                            'Review all clinical documentation for completeness',
                            'Verify drug prescriptions and procedures',
                            'Set discharge status: Not Discharged, Discharged, Follow-up Required, Referred',
                            'Click "Close Visit" to finalize the visit',
                            'Generate PDF reports for patient records'
                        ],
                        screenshot: '✅'
                    },
                    {
                        id: 'reports',
                        title: '📊 Reports & Analytics',
                        description: 'Access practice analytics and generate comprehensive reports.',
                        details: [
                            'Full Visit Report: Complete patient visit history',
                            'Patient Info: Patient demographics and visit summary',
                            'Medical Info: Clinical data and observations',
                            'Drugs Report: All prescribed medications',
                            'Procedures Report: All procedures performed'
                        ],
                        actions: [
                            'From Visit Details, click "PDF" buttons to generate reports',
                            'Full Report: Complete visit documentation',
                            'Patient Info: Patient details and visit summary',
                            'Medical Info: Clinical notes and observations',
                            'Drugs Report: All prescribed medications with details',
                            'Procedures Report: All procedures performed'
                        ],
                        screenshot: '📊'
                    },
                    {
                        id: 'changePassword',
                        title: '🔒 Change Password',
                        description: 'Securely update your login credentials.',
                        details: [
                            'Old Password: Enter your current password',
                            'New Password: Enter your new password (min 6 characters)',
                            'Confirm Password: Verify your new password',
                            'Show Passwords: Toggle visibility of password fields'
                        ],
                        actions: [
                            'Navigate to Change Password from sidebar',
                            'Enter your current password',
                            'Enter your new password (minimum 6 characters)',
                            'Confirm your new password',
                            'Click "Save" to update your credentials'
                        ],
                        screenshot: '🔒'
                    }
                ]
            }
        },
        ar: {
            title: 'أدلة الطبيب',
            close: 'إغلاق',
            previous: 'السابق',
            next: 'التالي',
            finish: 'إنهاء',
            backToMenu: 'العودة إلى القائمة',
            menu: {
                title: 'اختر دليلاً',
                subtitle: 'اختر الدليل الذي تريد عرضه:',
                doctorWorkflow: {
                    title: '👨‍⚕️ سير عمل الطبيب',
                    description: 'دليل كامل للأطباء: لوحة التحكم، البحث عن المرضى، إدارة الزيارات، والتوثيق السريري'
                }
            },
            doctor: {
                title: 'دليل سير عمل الطبيب',
                steps: [
                    {
                        id: 'dashboard',
                        title: '📊 لوحة تحكم الطبيب',
                        description: 'توفر لوحة تحكم الطبيب نظرة شاملة على ممارستك اليومية.',
                        details: [
                            'بطاقات الملخص: زيارات اليوم، إجمالي الزيارات، الزيارات الجديدة، الزيارات المغلقة',
                            'أداة الأداء: المرضى الذين تمت رؤيتهم اليوم، الزيارات المفتوحة، معدل الإنجاز',
                            'قائمة الزيارات: تصفية وعرض جميع زيارات المرضى',
                            'إجراءات سريعة: البحث عن زيارة بالمعرف، عرض الإشعارات'
                        ],
                        actions: [
                            'عرض إحصائيات الملخص في لمحة',
                            'تتبع مقاييس أدائك اليومي',
                            'تصفية الزيارات حسب اليوم، الكل، جديد، قيد التنفيذ، أو مغلق',
                            'البحث عن زيارات محددة باسم المريض أو رقم الهاتف أو المعرف'
                        ],
                        screenshot: '📊'
                    },
                    {
                        id: 'sidebar',
                        title: '📋 شريط التنقل الجانبي',
                        description: 'يوفر الشريط الجانبي وصولاً سريعاً إلى الأدوات والميزات الأساسية.',
                        details: [
                            'البحث عن مريض: العثور على سجلات المرضى وعرضها',
                            'التقارير: الوصول إلى التحليلات والتقارير',
                            'تغيير كلمة المرور: تحديث بيانات اعتماد الدخول الخاصة بك',
                            'تسجيل الخروج: الخروج الآمن من النظام'
                        ],
                        actions: [
                            'انقر "البحث عن مريض" للعثور على المرضى بالاسم أو رقم الجوال',
                            'الوصول إلى "التقارير" لعرض تحليلات الممارسة',
                            'استخدم "تغيير كلمة المرور" لتحديث بيانات الأمان الخاصة بك',
                            'انقر "تسجيل الخروج" للخروج الآمن من التطبيق'
                        ],
                        screenshot: '📋'
                    },
                    {
                        id: 'searchPatient',
                        title: '🔍 بحث عن مريض',
                        description: 'ابحث عن المرضى بالاسم أو رقم الجوال.',
                        details: [
                            'البحث بالاسم: إدخال الاسم الأول أو الأخير للمريض',
                            'البحث بالجوال: إدخال رقم الجوال كاملاً',
                            'عرض قائمة المرضى مع المعرف والاسم والهاتف والنوع والحالة',
                            'الوصول إلى تاريخ المريض بنقرة واحدة'
                        ],
                        actions: [
                            'اختر نوع البحث: الاسم أو الجوال',
                            'أدخل حرفين على الأقل للبحث',
                            'انقر بحث أو اضغط Enter لإجراء البحث',
                            'انقر على صف المريض لتحديده'
                        ],
                        screenshot: '🔍'
                    },
                    {
                        id: 'patientHistory',
                        title: '📜 تاريخ المريض',
                        description: 'عرض تاريخ المريض الشامل بما في ذلك جميع الزيارات السابقة.',
                        details: [
                            'تاريخ الزيارات الكامل مع التواريخ والتفاصيل',
                            'معلومات الزيارة: المعرف، النوع، الحالة، الطبيب',
                            'المعلومات الطبية: الشكوى الرئيسية، التاريخ، الأدوية، الحساسية',
                            'ملاحظات الطبيب من كل زيارة'
                        ],
                        actions: [
                            'اختر مريضاً وانقر "التاريخ" لعرض سجلاته',
                            'عرض جميع الزيارات السابقة بترتيب زمني',
                            'رؤية معلومات مفصلة لكل زيارة',
                            'تتبع رحلة المريض الطبية بمرور الوقت'
                        ],
                        screenshot: '📜'
                    },
                    {
                        id: 'visitManagement',
                        title: '🏥 إدارة الزيارات',
                        description: 'إدارة زيارات المرضى من البداية إلى النهاية.',
                        details: [
                            'بدء الزيارة: بدء استشارة مريض جديدة',
                            'تفاصيل الزيارة: توثيق الشكوى الرئيسية، التاريخ، الأدوية، الحساسية',
                            'الأدوية: البحث وإضافة ووصف الأدوية',
                            'الإجراءات: تحديد وتسجيل الإجراءات الطبية',
                            'الخروج: إكمال الزيارة مع حالة الخروج'
                        ],
                        actions: [
                            'انقر "بدء الزيارة" لبدء استشارة جديدة',
                            'توثيق الشكوى الرئيسية والتاريخ والأدوية والحساسية',
                            'إضافة ملاحظات الطبيب للملاحظات السريرية',
                            'البحث وإضافة الأدوية إلى الزيارة',
                            'وصف الأدوية مع المدة والتكرار والجرعة والتعليمات',
                            'تعيين حالة الخروج: لم يخرج، خرج، متابعة مطلوبة، أو تم التحويل'
                        ],
                        screenshot: '🏥'
                    },
                    {
                        id: 'drugPrescription',
                        title: '💊 وصف الأدوية',
                        description: 'نظام شامل لإدارة الأدوية.',
                        details: [
                            'البحث عن الأدوية: العثور على الأدوية بالاسم التجاري',
                            'الأدوية المفضلة: الوصول السريع إلى الأدوية الشائعة الاستخدام',
                            'الأدوية المختارة: عرض وإدارة الأدوية المضافة إلى الزيارة',
                            'حوار الوصف: تعيين المدة والتكرار والجرعة والتعليمات'
                        ],
                        actions: [
                            'البحث عن الأدوية بالاسم باستخدام مربع البحث',
                            'انقر "إضافة" (➕) لإضافة دواء إلى الزيارة الحالية',
                            'انقر النجمة (★/☆) لإضافة/إزالة من المفضلة',
                            'تعيين المدة والتكرار والجرعة والتعليمات للمريض'
                        ],
                        screenshot: '💊'
                    },
                    {
                        id: 'procedures',
                        title: '🔬 الإجراءات',
                        description: 'تحديد وتسجيل الإجراءات الطبية من فئات مختلفة.',
                        details: [
                            'الأشعة: إجراءات التصوير مثل MRI، CT، X-Ray، الموجات فوق الصوتية',
                            'المختبر: اختبارات المختبر مثل فحص الدم، PCR، تحليل البول',
                            'الطبي: الإجراءات والفحوصات السريرية',
                            'الإجراءات المختارة: عرض جميع الإجراءات المضافة إلى الزيارة'
                        ],
                        actions: [
                            'البحث داخل كل فئة (الأشعة، المختبر، الطبي)',
                            'انقر "إضافة" (➕) لإضافة إجراء إلى الزيارة',
                            'عرض جميع الإجراءات المختارة في قسم "الإجراءات المختارة"',
                            'إزالة الإجراءات باستخدام زر "إزالة" (✖)'
                        ],
                        screenshot: '🔬'
                    },
                    {
                        id: 'visitClosure',
                        title: '✅ إغلاق الزيارة والخروج',
                        description: 'إكمال الزيارة مع التوثيق المناسب والخروج.',
                        details: [
                            'التوثيق السريري: الشكوى الرئيسية، التاريخ، الأدوية، الحساسية، الملاحظات',
                            'وصفات الأدوية: جميع الأدوية الموصوفة',
                            'الإجراءات: جميع الإجراءات التي تمت',
                            'حالة الخروج: اختيار حالة الخروج المناسبة',
                            'إغلاق الزيارة: إنهاء الزيارة وتوليد التقارير'
                        ],
                        actions: [
                            'مراجعة جميع التوثيق السريري للتأكد من الاكتمال',
                            'التحقق من وصفات الأدوية والإجراءات',
                            'تعيين حالة الخروج: لم يخرج، خرج، متابعة مطلوبة، تم التحويل',
                            'انقر "إغلاق الزيارة" لإنهاء الزيارة',
                            'توليد تقارير PDF لسجلات المرضى'
                        ],
                        screenshot: '✅'
                    },
                    {
                        id: 'reports',
                        title: '📊 التقارير والتحليلات',
                        description: 'الوصول إلى تحليلات الممارسة وتوليد تقارير شاملة.',
                        details: [
                            'تقرير الزيارة الكامل: تاريخ زيارة المريض الكامل',
                            'معلومات المريض: بيانات المريض وملخص الزيارة',
                            'المعلومات الطبية: البيانات السريرية والملاحظات',
                            'تقرير الأدوية: جميع الأدوية الموصوفة',
                            'تقرير الإجراءات: جميع الإجراءات التي تمت'
                        ],
                        actions: [
                            'من تفاصيل الزيارة، انقر أزرار "PDF" لتوليد التقارير',
                            'التقرير الكامل: توثيق الزيارة الكامل',
                            'معلومات المريض: تفاصيل المريض وملخص الزيارة',
                            'المعلومات الطبية: الملاحظات والملاحظات السريرية',
                            'تقرير الأدوية: جميع الأدوية الموصوفة مع التفاصيل',
                            'تقرير الإجراءات: جميع الإجراءات التي تمت'
                        ],
                        screenshot: '📊'
                    },
                    {
                        id: 'changePassword',
                        title: '🔒 تغيير كلمة المرور',
                        description: 'تحديث بيانات اعتماد الدخول الخاصة بك بشكل آمن.',
                        details: [
                            'كلمة المرور القديمة: إدخال كلمة المرور الحالية',
                            'كلمة المرور الجديدة: إدخال كلمة المرور الجديدة (6 أحرف على الأقل)',
                            'تأكيد كلمة المرور: التحقق من كلمة المرور الجديدة',
                            'إظهار كلمات المرور: تبديل رؤية حقول كلمة المرور'
                        ],
                        actions: [
                            'انتقل إلى تغيير كلمة المرور من الشريط الجانبي',
                            'أدخل كلمة المرور الحالية',
                            'أدخل كلمة المرور الجديدة (6 أحرف على الأقل)',
                            'أكد كلمة المرور الجديدة',
                            'انقر "حفظ" لتحديث بيانات الاعتماد الخاصة بك'
                        ],
                        screenshot: '🔒'
                    }
                ]
            }
        }
    };

    const t = translations[locale] || translations.en;
    const isRTL = locale === 'ar';

    // ==================== NAVIGATION HELPERS ====================
    const getCurrentSteps = () => {
        if (activeGuide === 'doctor') return t.doctor.steps;
        return [];
    };

    const getCurrentTitle = () => {
        if (activeGuide === 'doctor') return t.doctor.title;
        return t.menu.title;
    };

    const getStepIcon = (stepId) => {
        const icons = {
            'dashboard': '📊',
            'sidebar': '📋',
            'searchPatient': '🔍',
            'patientHistory': '📜',
            'visitManagement': '🏥',
            'drugPrescription': '💊',
            'procedures': '🔬',
            'visitClosure': '✅',
            'reports': '📊',
            'changePassword': '🔒'
        };
        return icons[stepId] || '📍';
    };

    const getStepColor = (index, steps) => {
        if (index === currentStep) return '#9f7aea';
        if (index < currentStep) return '#48bb78';
        return '#e2e8f0';
    };

    const handleNext = () => {
        const steps = getCurrentSteps();
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleBackToMenu = () => {
        setActiveGuide('menu');
        setCurrentStep(0);
    };

    const handleSelectGuide = (guide) => {
        setActiveGuide(guide);
        setCurrentStep(0);
    };

    const progress = () => {
        const steps = getCurrentSteps();
        if (activeGuide === 'menu' || steps.length === 0) return 0;
        return ((currentStep + 1) / steps.length) * 100;
    };

    if (!isOpen) return null;

    // ==================== RENDER MENU ====================
    if (activeGuide === 'menu') {
        return (
            <div style={styles.overlay} dir={isRTL ? 'rtl' : 'ltr'}>
                <div style={styles.modal}>
                    <div style={styles.header}>
                        <h2 style={styles.title}>{t.title}</h2>
                        <button 
                            onClick={onClose}
                            style={styles.closeButton}
                            aria-label="Close guide"
                        >
                            ✕
                        </button>
                    </div>

                    <div style={styles.menuContent}>
                        <h3 style={styles.menuTitle}>{t.menu.title}</h3>
                        <p style={styles.menuSubtitle}>{t.menu.subtitle}</p>
                        
                        <div style={styles.menuGrid}>
                            <div 
                                style={styles.menuCard}
                                onClick={() => handleSelectGuide('doctor')}
                            >
                                <div style={styles.menuCardIcon}>👨‍⚕️</div>
                                <h4 style={styles.menuCardTitle}>{t.menu.doctorWorkflow.title}</h4>
                                <p style={styles.menuCardDescription}>{t.menu.doctorWorkflow.description}</p>
                                <div style={styles.menuCardButton}>▶ {t.next}</div>
                            </div>
                        </div>
                    </div>

                    <div style={styles.footer}>
                        <div style={{ flex: 1 }}></div>
                        <button
                            onClick={onClose}
                            style={styles.secondaryButton}
                        >
                            {t.close}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ==================== RENDER DOCTOR GUIDE ====================
    const steps = getCurrentSteps();
    const currentStepData = steps[currentStep];
    const guideSteps = t.doctor.steps;

    return (
        <div style={styles.overlay} dir={isRTL ? 'rtl' : 'ltr'}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <button
                            onClick={handleBackToMenu}
                            style={styles.backButton}
                            title={t.backToMenu}
                        >
                            ←
                        </button>
                        <h2 style={styles.title}>{getCurrentTitle()}</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        style={styles.closeButton}
                        aria-label="Close guide"
                    >
                        ✕
                    </button>
                </div>

                <div style={styles.progressContainer}>
                    <div style={{ ...styles.progressBar, width: `${progress()}%` }} />
                </div>

                <div style={styles.journeyMap}>
                    {guideSteps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;
                        
                        return (
                            <div key={step.id} style={styles.journeyItem}>
                                {index > 0 && (
                                    <div 
                                        style={{
                                            ...styles.journeyConnector,
                                            background: isCompleted || isActive ? '#9f7aea' : '#e2e8f0'
                                        }}
                                    />
                                )}
                                
                                <div 
                                    style={{
                                        ...styles.journeyNode,
                                        background: getStepColor(index, guideSteps),
                                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                        boxShadow: isActive ? '0 0 20px rgba(159, 122, 234, 0.4)' : 'none'
                                    }}
                                    onClick={() => setCurrentStep(index)}
                                    title={step.title}
                                >
                                    <span style={styles.journeyIcon}>
                                        {getStepIcon(step.id)}
                                    </span>
                                </div>
                                
                                <div 
                                    style={{
                                        ...styles.journeyLabel,
                                        color: getStepColor(index, guideSteps),
                                        fontWeight: isActive ? 'bold' : 'normal'
                                    }}
                                >
                                    {isRTL ? `الخطوة ${index + 1}` : `Step ${index + 1}`}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={styles.stepIndicators}>
                    {guideSteps.map((step, index) => (
                        <div
                            key={index}
                            style={{
                                ...styles.stepDot,
                                background: getStepColor(index, guideSteps)
                            }}
                            onClick={() => setCurrentStep(index)}
                            title={`${isRTL ? 'الخطوة' : 'Step'} ${index + 1}: ${step.title}`}
                        />
                    ))}
                </div>

                <div style={styles.content}>
                    <div style={styles.stepNumber}>
                        {isRTL ? `الخطوة ${currentStep + 1} من ${guideSteps.length}` : `Step ${currentStep + 1} of ${guideSteps.length}`}
                    </div>

                    <h3 style={styles.stepTitle}>{currentStepData.title}</h3>

                    <div style={styles.screenshotContainer}>
                        <span style={styles.screenshotIcon}>{currentStepData.screenshot}</span>
                    </div>

                    <p style={styles.description}>{currentStepData.description}</p>

                    <div style={styles.detailsContainer}>
                        <h4 style={styles.detailsTitle}>📌 {isRTL ? 'نقاط رئيسية:' : 'Key Points:'}</h4>
                        <ul style={styles.list}>
                            {currentStepData.details.map((detail, index) => (
                                <li key={index} style={styles.listItem}>
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div style={styles.actionsContainer}>
                        <h4 style={styles.actionsTitle}>🎯 {isRTL ? 'ماذا يمكنك أن تفعل:' : 'What You Can Do:'}</h4>
                        <ul style={styles.list}>
                            {currentStepData.actions.map((action, index) => (
                                <li key={index} style={styles.listItem}>
                                    {action}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div style={styles.footer}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        style={{
                            ...styles.secondaryButton,
                            opacity: currentStep === 0 ? 0.5 : 1,
                            cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {t.previous}
                    </button>
                    
                    <button
                        onClick={handleNext}
                        style={styles.primaryButton}
                    >
                        {currentStep === guideSteps.length - 1 ? t.finish : t.next}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

// ==================== RESPONSIVE STYLES ====================
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.3s ease',
        padding: '20px'
    },
    modal: {
        background: 'white',
        borderRadius: '16px',
        maxWidth: '950px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        animation: 'slideIn 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        padding: '16px 20px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f7fafc',
        flexShrink: 0
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minWidth: 0
    },
    title: {
        margin: 0,
        fontSize: '18px',
        color: '#2d3748',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#718096',
        padding: '4px 8px',
        borderRadius: '6px',
        transition: 'all 0.2s',
        minWidth: '36px',
        minHeight: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButton: {
        background: '#e2e8f0',
        border: 'none',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#4a5568',
        transition: 'all 0.2s',
        minWidth: '32px',
        minHeight: '32px'
    },
    progressContainer: {
        height: '4px',
        backgroundColor: '#e2e8f0',
        position: 'relative',
        flexShrink: 0
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#9f7aea',
        transition: 'width 0.5s ease',
        borderRadius: '2px'
    },
    menuContent: {
        padding: '24px 20px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto'
    },
    menuTitle: {
        fontSize: '20px',
        color: '#2d3748',
        marginBottom: '6px'
    },
    menuSubtitle: {
        fontSize: '14px',
        color: '#718096',
        marginBottom: '24px',
        textAlign: 'center'
    },
    menuGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        width: '100%',
        maxWidth: '700px'
    },
    menuCard: {
        background: '#f7fafc',
        borderRadius: '12px',
        padding: '20px',
        border: '2px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    menuCardIcon: {
        fontSize: '40px',
        marginBottom: '10px'
    },
    menuCardTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: '6px'
    },
    menuCardDescription: {
        fontSize: '13px',
        color: '#718096',
        marginBottom: '14px',
        flex: 1
    },
    menuCardButton: {
        padding: '6px 20px',
        background: '#9f7aea',
        color: 'white',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '13px',
        transition: 'all 0.2s'
    },
    journeyMap: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 16px 8px 16px',
        backgroundColor: '#f7fafc',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        flexShrink: 0,
        overflowX: 'auto'
    },
    journeyItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        flex: 1,
        minWidth: '50px'
    },
    journeyConnector: {
        position: 'absolute',
        top: '18px',
        left: '-50%',
        right: '50%',
        height: '2px',
        zIndex: 1
    },
    journeyNode: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        zIndex: 2,
        border: '2px solid white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    journeyIcon: {
        fontSize: '16px',
        lineHeight: 1
    },
    journeyLabel: {
        marginTop: '6px',
        fontSize: '9px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap'
    },
    stepIndicators: {
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        padding: '6px 0 10px 0',
        backgroundColor: '#f7fafc',
        flexShrink: 0
    },
    stepDot: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '2px solid transparent'
    },
    content: {
        padding: '16px 20px',
        overflowY: 'auto',
        flex: 1
    },
    stepNumber: {
        fontSize: '11px',
        color: '#718096',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '6px'
    },
    stepTitle: {
        fontSize: '18px',
        color: '#2d3748',
        marginBottom: '12px',
        fontWeight: '600'
    },
    screenshotContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#f7fafc',
        borderRadius: '10px',
        marginBottom: '14px'
    },
    screenshotIcon: {
        fontSize: '40px'
    },
    description: {
        fontSize: '14px',
        color: '#4a5568',
        lineHeight: '1.6',
        marginBottom: '16px'
    },
    detailsContainer: {
        backgroundColor: '#ebf8ff',
        padding: '14px',
        borderRadius: '8px',
        marginBottom: '14px'
    },
    detailsTitle: {
        margin: '0 0 6px 0',
        fontSize: '13px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    actionsContainer: {
        backgroundColor: '#f0fff4',
        padding: '14px',
        borderRadius: '8px',
        marginBottom: '16px'
    },
    actionsTitle: {
        margin: '0 0 6px 0',
        fontSize: '13px',
        color: '#276749',
        fontWeight: '600'
    },
    list: {
        margin: 0,
        padding: '0 0 0 18px'
    },
    listItem: {
        fontSize: '13px',
        color: '#4a5568',
        lineHeight: '1.5',
        marginBottom: '3px'
    },
    footer: {
        padding: '12px 20px',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '8px',
        flexShrink: 0
    },
    primaryButton: {
        padding: '8px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
        transition: 'all 0.2s',
        border: 'none',
        backgroundColor: '#9f7aea',
        color: 'white',
        flex: 1,
        minHeight: '40px'
    },
    secondaryButton: {
        padding: '8px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
        transition: 'all 0.2s',
        border: 'none',
        backgroundColor: '#e2e8f0',
        color: '#4a5568',
        minHeight: '40px'
    },
    // Responsive overrides via media queries will be handled by CSS-in-JS
};

// Add responsive styles
const responsiveStyles = `
    @media (max-width: 768px) {
        .doctor-guide-overlay {
            padding: 10px;
            align-items: flex-end;
        }
        .doctor-guide-modal {
            max-height: 95vh;
            border-radius: 12px 12px 0 0;
        }
        .doctor-guide-title {
            font-size: 16px;
        }
        .doctor-guide-menu-title {
            font-size: 18px;
        }
        .doctor-guide-menu-grid {
            grid-template-columns: 1fr;
        }
        .doctor-guide-journey-map {
            padding: 10px 8px 6px 8px;
        }
        .doctor-guide-journey-node {
            width: 30px;
            height: 30px;
        }
        .doctor-guide-journey-icon {
            font-size: 14px;
        }
        .doctor-guide-journey-label {
            font-size: 8px;
        }
        .doctor-guide-step-title {
            font-size: 16px;
        }
        .doctor-guide-content {
            padding: 12px 14px;
        }
        .doctor-guide-description {
            font-size: 13px;
        }
        .doctor-guide-list-item {
            font-size: 12px;
        }
        .doctor-guide-footer {
            padding: 10px 14px;
        }
        .doctor-guide-button {
            font-size: 12px;
            padding: 6px 14px;
            min-height: 36px;
        }
        .doctor-guide-screenshot-icon {
            font-size: 32px;
        }
    }

    @media (max-width: 480px) {
        .doctor-guide-overlay {
            padding: 6px;
        }
        .doctor-guide-modal {
            max-height: 98vh;
            border-radius: 10px 10px 0 0;
        }
        .doctor-guide-header {
            padding: 12px 14px;
        }
        .doctor-guide-title {
            font-size: 14px;
        }
        .doctor-guide-close-button {
            font-size: 18px;
            min-width: 32px;
            min-height: 32px;
        }
        .doctor-guide-back-button {
            width: 28px;
            height: 28px;
            font-size: 14px;
            min-width: 28px;
            min-height: 28px;
        }
        .doctor-guide-menu-title {
            font-size: 16px;
        }
        .doctor-guide-menu-subtitle {
            font-size: 12px;
        }
        .doctor-guide-menu-card {
            padding: 14px;
        }
        .doctor-guide-menu-card-icon {
            font-size: 32px;
        }
        .doctor-guide-menu-card-title {
            font-size: 14px;
        }
        .doctor-guide-menu-card-description {
            font-size: 12px;
        }
        .doctor-guide-step-title {
            font-size: 14px;
        }
        .doctor-guide-description {
            font-size: 12px;
        }
        .doctor-guide-details-container {
            padding: 10px;
        }
        .doctor-guide-actions-container {
            padding: 10px;
        }
        .doctor-guide-list-item {
            font-size: 11px;
        }
        .doctor-guide-button {
            font-size: 11px;
            padding: 4px 12px;
            min-height: 32px;
        }
        .doctor-guide-journey-node {
            width: 26px;
            height: 26px;
        }
        .doctor-guide-journey-icon {
            font-size: 12px;
        }
        .doctor-guide-step-dot {
            width: 6px;
            height: 6px;
        }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        .doctor-guide-modal {
            max-width: 90%;
        }
        .doctor-guide-menu-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
`;

// Inject responsive styles
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = responsiveStyles;
    document.head.appendChild(styleElement);
}

export default DoctorGuide;