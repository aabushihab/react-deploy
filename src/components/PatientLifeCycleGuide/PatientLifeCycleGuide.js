
// export default PatientLifeCycleGuide;//V1.4 Full Guide 

// PatientLifeCycleGuide.js
import React, { useState, useEffect } from 'react';

const PatientLifeCycleGuide = ({ isOpen, onClose, locale = 'en' }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [activeGuide, setActiveGuide] = useState('menu'); // 'menu', 'patient', 'admin'

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCurrentStep(0);
            setActiveGuide('menu');
        }
    }, [isOpen]);

    // ==================== TRANSLATIONS ====================
    const translations = {
        en: {
            title: 'System Guides',
            close: 'Close',
            previous: 'Previous',
            next: 'Next',
            finish: 'Finish',
            backToMenu: 'Back to Menu',
            menu: {
                title: 'Select a Guide',
                subtitle: 'Choose which guide you would like to view:',
                patientLifecycle: {
                    title: '👤 Patient Lifecycle',
                    description: 'Complete guide from patient search through visit closure, payment, and reporting'
                },
                adminModules: {
                    title: '⚙️ Administrative Modules',
                    description: 'Manage users, insurance providers, payment reports, and analytics dashboard'
                }
            },
            // ==================== PATIENT LIFECYCLE ====================
            patient: {
                title: 'Patient Lifecycle Guide',
                steps: [
                    {
                        id: 'setup',
                        title: '⚙️ System Setup',
                        description: 'Before managing patients, ensure your system is properly configured with Sections, Rooms, and Doctors.',
                        details: [
                            'Sections: Create departments for patient care',
                            'Rooms: Assign rooms to sections for patient visits',
                            'Doctors: Add doctors with specialties and credentials'
                        ],
                        actions: [
                            'Manage Sections: Add, edit, or delete departments',
                            'Manage Rooms: Create rooms with section assignments',
                            'Manage Doctors: Add doctors with specialties and login credentials',
                            'Each doctor gets a unique username and password for system access',
                            'Sections and Rooms are linked for organized patient flow'
                        ],
                        screenshot: '⚙️'
                    },
                    {
                        id: 'search',
                        title: '🔍 Search Patient',
                        description: 'Start by searching for a patient using either Name or Mobile number. Enter at least 3 characters to search.',
                        details: [
                            'Select search type: Name or Mobile',
                            'Enter search term (minimum 3 characters)',
                            'Click Search or press Enter',
                            'Results will display in table or card view'
                        ],
                        actions: [
                            'Search by name: Enter patient first or last name',
                            'Search by mobile: Enter full mobile number',
                            'Toggle between Table and Card view modes',
                            'Filter results by patient type (TEMP/PERMANENT)'
                        ],
                        screenshot: '🔍'
                    },
                    {
                        id: 'select',
                        title: '📋 Patient Selection',
                        description: 'Select a patient from the search results to view and manage their details.',
                        details: [
                            'Click on any patient row/card to select them',
                            'Selected patient appears in the selection bar',
                            'View patient summary information',
                            'Expand/collapse patient details'
                        ],
                        actions: [
                            'Click a patient to select them',
                            'View patient ID, name, and type',
                            'Expand details to see full patient information',
                            'Patient remains selected for further actions'
                        ],
                        screenshot: '📋'
                    },
                    {
                        id: 'actions',
                        title: '🚶 Patient Actions',
                        description: 'Once a patient is selected, you can perform various actions from the selection bar.',
                        details: [
                            'Walk-in: Start a walk-in visit',
                            'Appointments: Schedule or view appointments',
                            'Update Patient: Edit patient information',
                            'Upgrade to Permanent: Convert TEMP to PERMANENT',
                            'Print Report: Generate patient visit report',
                            'Check Availability: View doctor/room availability'
                        ],
                        actions: [
                            'Click Walk-in for immediate visit',
                            'Schedule new appointment',
                            'Update patient demographics',
                            'Upgrade temporary patient to permanent',
                            'Print comprehensive visit history report',
                            'Check doctor/room availability'
                        ],
                        screenshot: '🚶'
                    },
                    {
                        id: 'chooseDoctor',
                        title: '👨‍⚕️ Choose Doctor',
                        description: 'After registering an appointment or walk-in visit, you will be prompted to select a doctor for the patient.',
                        details: [
                            'Select a doctor from the list of available doctors',
                            'View doctor specialties and credentials',
                            'Assign the doctor to the appointment or walk-in visit',
                            'Doctor assignment affects room and section assignment'
                        ],
                        actions: [
                            'From Walk-in: Choose a doctor for the walk-in visit',
                            'From Appointment: Select a doctor when scheduling',
                            'From Reassign: Change doctor for existing appointments',
                            'Doctor selection determines which section and room the patient will be seen in'
                        ],
                        screenshot: '👨‍⚕️'
                    },
                    {
                        id: 'doctorVisitClosure',
                        title: '🏥 Doctor Visit Closure',
                        description: 'The doctor completes the visit by documenting clinical information, prescribing medications, recording procedures, and discharging the patient.',
                        details: [
                            'Chief Complaint: Document the patient\'s primary reason for visit',
                            'Drug Prescriptions: Prescribe medications with dosage and instructions',
                            'Procedures: Record any procedures performed during the visit',
                            'Discharge: Complete the discharge process with status',
                            'Clinical Notes: Add detailed medical observations and notes'
                        ],
                        actions: [
                            'Document Chief Complaint and medical notes',
                            'Prescribe drugs with dosage, frequency, and duration',
                            'Record procedures performed during the visit',
                            'Complete discharge with appropriate status (e.g., COMPLETED)',
                            'Add clinical notes and observations',
                            'Update patient medical history with visit details'
                        ],
                        screenshot: '🏥'
                    },
                    {
                        id: 'visitPayment',
                        title: '💰 Visit Payment Processing',
                        description: 'After the doctor closes the visit, the payment is processed from the Visit Tracking screen. This handles the financial settlement of the visit.',
                        details: [
                            'Cash: Enter cash amount paid by patient',
                            'POS: Process card payment with terminal details',
                            'Insurance: Process insurance claim with provider details',
                            'Free: No charges applied (e.g., charity case)',
                            'Payment Summary: View paying now and remaining balance'
                        ],
                        actions: [
                            'Process payment: Cash, POS, Insurance, or Free',
                            'POS payment: Enter terminal ID, POS number, card type, approval code',
                            'Insurance payment: Enter provider, class, type, coverage, accept number, card/form ID',
                            'Free payment: No charges applied',
                            'View paying now amount and remaining balance',
                            'Complete payment to finalize the visit'
                        ],
                        screenshot: '💰'
                    },
                    {
                        id: 'claimsTracking',
                        title: '📑 Claims Tracking',
                        description: 'Track and settle insurance claims efficiently. Monitor outstanding claims, manage folders, and process insurance settlements.',
                        details: [
                            'View all insurance claims with outstanding balances',
                            'Filter claims by all, unpaid, or by date range',
                            'Organize claims into folders for better management',
                            'Settle insurance claims with paid and discount amounts',
                            'Export claims data to CSV for reporting'
                        ],
                        actions: [
                            'Filter claims: All Claims or Unpaid Claims',
                            'Search claims by patient, doctor, provider, or ID',
                            'Create folders to organize claims',
                            'Add claims to folders for grouping',
                            'Remove claims from folders when needed',
                            'Settle insurance: Enter paid amount and discount amount',
                            'View outstanding balance and settlement status',
                            'Export claims to CSV for external analysis'
                        ],
                        screenshot: '📑'
                    },
                    {
                        id: 'visitTracking',
                        title: '📋 Visit Tracking',
                        description: 'Track all patient visits with comprehensive monitoring capabilities. Search for visits by patient name or mobile number.',
                        details: [
                            'Search visits by patient name or mobile number',
                            'View visit details including patient, doctor, type, and status',
                            'Track payment status and remaining amounts',
                            'Start, end, and process payments for visits',
                            'Mark insurance as paid for insurance-covered visits'
                        ],
                        actions: [
                            'Search by patient name or mobile to find visits',
                            'Select a visit to view detailed information',
                            'Start a new visit for the patient',
                            'End an in-progress visit',
                            'Process payment with Cash, POS, Insurance, or Free',
                            'View payment details and transaction history',
                            'Mark insurance as paid for insurance visits'
                        ],
                        screenshot: '📋'
                    },
                    {
                        id: 'appointments',
                        title: '📅 Appointment Management',
                        description: 'Manage all appointments efficiently with comprehensive tools for scheduling, tracking, and reassigning appointments. This is available from both the Search Patient screen and the Appointment Management screen.',
                        details: [
                            'View appointments by date for better organization',
                            'Update appointment notes and details',
                            'Reassign appointments to different doctors',
                            'Delete appointments when necessary',
                            'Export appointment data to CSV for reporting'
                        ],
                        actions: [
                            'From Search Patient: Click "Appointments" button on selected patient',
                            'From Appointment Management: Select a date to view all appointments',
                            'Click on any appointment to view patient and doctor details',
                            'Use the "Reassign" button to move an appointment to another doctor',
                            'Edit appointment notes to add important information',
                            'Export appointment list to CSV for external analysis'
                        ],
                        screenshot: '📅'
                    },
                    {
                        id: 'reports',
                        title: '📊 Patient Reports',
                        description: 'Generate comprehensive reports for selected patients with visit history.',
                        details: [
                            'PDF report with patient visit history',
                            'Includes drug prescriptions',
                            'Includes procedures performed',
                            'Clinic branding and patient information',
                            'Export to CSV for data analysis'
                        ],
                        actions: [
                            'Click Print Report to generate PDF',
                            'Report includes all visits, drugs, and procedures',
                            'CSV export for external analysis',
                            'Report saved locally for record keeping'
                        ],
                        screenshot: '📊'
                    },
                    {
                        id: 'complete',
                        title: '✅ Complete Patient Management',
                        description: 'The patient lifecycle is complete with proper documentation and follow-up. This applies to both the Search Patient screen and the Appointment Management screen.',
                        details: [
                            'All patient data is stored securely',
                            'Visit history is maintained',
                            'Drug prescriptions are tracked',
                            'Procedures are documented',
                            'Patient type is managed (TEMP/PERMANENT)',
                            'Appointments are managed and tracked',
                            'Visits are tracked and monitored',
                            'Payments are processed and recorded',
                            'Insurance claims are tracked and settled'
                        ],
                        actions: [
                            'Continue to manage patient care',
                            'Schedule follow-up appointments',
                            'Update patient records as needed',
                            'Generate additional reports',
                            'Monitor patient progress',
                            'Manage all appointments across the system',
                            'Track all patient visits',
                            'Process and record all payments',
                            'Track and settle insurance claims'
                        ],
                        screenshot: '✅'
                    }
                ]
            },
            // ==================== ADMINISTRATIVE MODULES ====================
            admin: {
                title: 'Administrative Modules Guide',
                steps: [
                    {
                        id: 'adminModules',
                        title: '⚙️ Administrative Modules Overview',
                        description: 'Additional administrative tools for managing the clinic\'s operations, users, and reporting.',
                        details: [
                            'User Management: Create and manage system users with roles',
                            'Health Insurance: Manage insurance providers and coverage classes',
                            'Clinic Payment Report: View payment summaries and details',
                            'Reports Dashboard: Access analytics and visualizations'
                        ],
                        actions: [
                            'User Management: Add, enable/disable users, reset passwords',
                            'Health Insurance: Add providers with coverage classes (A, B, C)',
                            'Clinic Payment Report: View cash, POS, insurance, free totals',
                            'Reports Dashboard: View appointments, walk-ins, patients, doctors analytics'
                        ],
                        screenshot: '⚙️'
                    },
                    {
                        id: 'userManagement',
                        title: '👥 User Management',
                        description: 'Manage system users with role-based access control. Create users, reset passwords, and enable/disable accounts.',
                        details: [
                            'Create new users with username and password',
                            'Assign roles: Admin, Doctor, or Assistant',
                            'Reset passwords for existing users',
                            'Enable or disable user accounts',
                            'Password strength indicator for secure passwords'
                        ],
                        actions: [
                            'Add user: Enter username and password with validation',
                            'Reset password: Set new password for any user',
                            'Toggle user: Enable or disable user access',
                            'Search users by username or role',
                            'Password must be at least 6 characters with letters and numbers'
                        ],
                        screenshot: '👥'
                    },
                    {
                        id: 'healthInsurance',
                        title: '🏥 Health Insurance',
                        description: 'Manage insurance providers and their coverage classes. Track providers by country and coverage types.',
                        details: [
                            'Add insurance providers with name, type, and website',
                            'Select coverage classes (Class A, B, C)',
                            'Filter providers by country',
                            'Search providers by name, type, or website',
                            'Delete providers when needed'
                        ],
                        actions: [
                            'Select a country to view providers',
                            'Add new provider: Enter name, type, coverage classes, website',
                            'Toggle coverage classes: A, B, C for each provider',
                            'Search providers by name or type',
                            'Delete providers with confirmation dialog'
                        ],
                        screenshot: '🏥'
                    },
                    {
                        id: 'clinicPaymentReport',
                        title: '📊 Clinic Payment Report',
                        description: 'Generate comprehensive payment reports for the clinic. View summaries by payment type and detailed patient records.',
                        details: [
                            'View payment summaries: Cash, POS, Insurance, Insurance Discount, Free Visits, Grand Total',
                            'Filter by date range and payment type',
                            'View doctor-wise payment summaries',
                            'Detailed patient payment records',
                            'Export data to CSV for external analysis'
                        ],
                        actions: [
                            'Select from/to dates and payment type filter',
                            'View summary cards with payment totals',
                            'Doctor summary table with payment breakdowns',
                            'Patient details table with payment information',
                            'Export report to CSV format'
                        ],
                        screenshot: '📊'
                    },
                    {
                        id: 'reportsDashboard',
                        title: '📈 Reports Dashboard',
                        description: 'Access analytics and visualizations for clinic operations. View charts and tables for appointments, walk-ins, patients, and doctors.',
                        details: [
                            'Appointments per Doctor: Bar chart showing appointment distribution',
                            'Appointments by Status: Pie chart showing status breakdown',
                            'Walk-ins per Doctor: Bar chart showing walk-in distribution',
                            'Patients by Gender: Pie chart showing gender distribution',
                            'Patients by City: Bar chart showing patient distribution by city',
                            'Doctors by Specialty: Bar chart showing doctor distribution by specialty'
                        ],
                        actions: [
                            'Navigate between different report types using sidebar',
                            'View data in both table and chart formats',
                            'Export reports to CSV format',
                            'Print reports directly from the dashboard',
                            'Refresh data for latest information'
                        ],
                        screenshot: '📈'
                    }
                ]
            }
        },
        ar: {
            title: 'أدلة النظام',
            close: 'إغلاق',
            previous: 'السابق',
            next: 'التالي',
            finish: 'إنهاء',
            backToMenu: 'العودة إلى القائمة',
            menu: {
                title: 'اختر دليلاً',
                subtitle: 'اختر الدليل الذي تريد عرضه:',
                patientLifecycle: {
                    title: '👤 دورة حياة المريض',
                    description: 'دليل كامل من البحث عن المريض عبر إغلاق الزيارة والدفع والتقارير'
                },
                adminModules: {
                    title: '⚙️ الوحدات الإدارية',
                    description: 'إدارة المستخدمين ومزودي التأمين وتقارير الدفع ولوحة التحليلات'
                }
            },
            // ==================== PATIENT LIFECYCLE ====================
            patient: {
                title: 'دليل دورة حياة المريض',
                steps: [
                    {
                        id: 'setup',
                        title: '⚙️ إعداد النظام',
                        description: 'قبل إدارة المرضى، تأكد من إعداد النظام بشكل صحيح مع الأقسام والغرف والأطباء.',
                        details: [
                            'الأقسام: إنشاء أقسام لرعاية المرضى',
                            'الغرف: تعيين الغرف للأقسام لزيارات المرضى',
                            'الأطباء: إضافة أطباء مع التخصصات والمؤهلات'
                        ],
                        actions: [
                            'إدارة الأقسام: إضافة أو تعديل أو حذف الأقسام',
                            'إدارة الغرف: إنشاء غرف مع تعيين الأقسام',
                            'إدارة الأطباء: إضافة أطباء مع التخصصات وبيانات الدخول',
                            'كل طبيب يحصل على اسم مستخدم وكلمة مرور فريدة للوصول إلى النظام',
                            'الأقسام والغرف مرتبطة لتنظيم تدفق المرضى'
                        ],
                        screenshot: '⚙️'
                    },
                    {
                        id: 'search',
                        title: '🔍 بحث عن مريض',
                        description: 'ابدأ بالبحث عن مريض باستخدام الاسم أو رقم الجوال. أدخل 3 أحرف على الأقل للبحث.',
                        details: [
                            'اختر نوع البحث: الاسم أو الجوال',
                            'أدخل مصطلح البحث (3 أحرف على الأقل)',
                            'انقر بحث أو اضغط Enter',
                            'ستظهر النتائج في عرض جدول أو بطاقات'
                        ],
                        actions: [
                            'البحث بالاسم: أدخل الاسم الأول أو الأخير',
                            'البحث بالجوال: أدخل رقم الجوال كاملاً',
                            'تبديل بين عرض الجدول والبطاقات',
                            'تصفية النتائج حسب نوع المريض'
                        ],
                        screenshot: '🔍'
                    },
                    {
                        id: 'select',
                        title: '📋 اختيار المريض',
                        description: 'اختر مريضاً من نتائج البحث لعرض وإدارة تفاصيله.',
                        details: [
                            'انقر على أي صف أو بطاقة مريض لتحديده',
                            'يظهر المريض المحدد في شريط الاختيار',
                            'عرض معلومات ملخصة عن المريض',
                            'توسيع/طي تفاصيل المريض'
                        ],
                        actions: [
                            'انقر على مريض لتحديده',
                            'عرض معرف المريض واسمه ونوعه',
                            'توسيع التفاصيل لمشاهدة معلومات كاملة',
                            'يظل المريض محدداً للإجراءات اللاحقة'
                        ],
                        screenshot: '📋'
                    },
                    {
                        id: 'actions',
                        title: '🚶 إجراءات المريض',
                        description: 'بمجرد اختيار المريض، يمكنك القيام بإجراءات مختلفة من شريط الاختيار.',
                        details: [
                            'زيارة فورية: بدء زيارة فورية',
                            'المواعيد: جدولة أو عرض المواعيد',
                            'تحديث المريض: تعديل معلومات المريض',
                            'ترقية إلى دائم: تحويل مؤقت إلى دائم',
                            'طباعة تقرير: إنشاء تقرير زيارات المريض',
                            'التحقق من التوفر: عرض توفر الطبيب/الغرفة'
                        ],
                        actions: [
                            'انقر زيارة فورية لزيارة فورية',
                            'جدولة موعد جديد',
                            'تحديث بيانات المريض',
                            'ترقية مريض مؤقت إلى دائم',
                            'طباعة تقرير تاريخ الزيارات',
                            'التحقق من توفر الطبيب/الغرفة'
                        ],
                        screenshot: '🚶'
                    },
                    {
                        id: 'chooseDoctor',
                        title: '👨‍⚕️ اختر الطبيب',
                        description: 'بعد تسجيل موعد أو زيارة فورية، سيُطلب منك اختيار طبيب للمريض.',
                        details: [
                            'اختر طبيباً من قائمة الأطباء المتاحين',
                            'عرض تخصصات الطبيب ومؤهلاته',
                            'تعيين الطبيب للموعد أو الزيارة الفورية',
                            'تعيين الطبيب يؤثر على تعيين الغرفة والقسم'
                        ],
                        actions: [
                            'من الزيارة الفورية: اختر طبيباً للزيارة',
                            'من الموعد: اختر طبيباً عند الجدولة',
                            'من إعادة التعيين: تغيير الطبيب للمواعيد الحالية',
                            'اختيار الطبيب يحدد القسم والغرفة التي سيتم فيها رؤية المريض'
                        ],
                        screenshot: '👨‍⚕️'
                    },
                    {
                        id: 'doctorVisitClosure',
                        title: '🏥 إغلاق زيارة الطبيب',
                        description: 'يكمل الطبيب الزيارة بتوثيق المعلومات السريرية، وصف الأدوية، تسجيل الإجراءات، وخروج المريض.',
                        details: [
                            'الشكوى الرئيسية: توثيق السبب الرئيسي لزيارة المريض',
                            'وصفات الأدوية: وصف الأدوية مع الجرعة والتعليمات',
                            'الإجراءات: تسجيل أي إجراءات تمت أثناء الزيارة',
                            'الخروج: إكمال عملية الخروج مع الحالة',
                            'الملاحظات السريرية: إضافة ملاحظات طبية مفصلة'
                        ],
                        actions: [
                            'توثيق الشكوى الرئيسية والملاحظات الطبية',
                            'وصف الأدوية مع الجرعة والتكرار والمدة',
                            'تسجيل الإجراءات التي تمت أثناء الزيارة',
                            'إكمال الخروج مع الحالة المناسبة (مثل: مكتملة)',
                            'إضافة ملاحظات وملاحظات سريرية',
                            'تحديث التاريخ الطبي للمريض بتتفاصيل الزيارة'
                        ],
                        screenshot: '🏥'
                    },
                    {
                        id: 'visitPayment',
                        title: '💰 معالجة دفع الزيارة',
                        description: 'بعد إغلاق الطبيب للزيارة، يتم معالجة الدفع من شاشة تتبع الزيارات. هذا يتعامل مع التسوية المالية للزيارة.',
                        details: [
                            'نقداً: إدخال المبلغ النقدي المدفوع من المريض',
                            'POS: معالجة دفع البطاقة مع تفاصيل الجهاز',
                            'التأمين: معالجة مطالبة التأمين مع تفاصيل المزود',
                            'مجاناً: لا توجد رسوم (مثل: حالة خيرية)',
                            'ملخص الدفع: عرض المبلغ المدفوع الآن والرصيد المتبقي'
                        ],
                        actions: [
                            'معالجة الدفع: نقداً أو POS أو تأمين أو مجاناً',
                            'دفع POS: إدخال معرف الجهاز ورقم POS ونوع البطاقة ورمز الموافقة',
                            'دفع التأمين: إدخال المزود والفئة والنوع والتغطية ورقم القبول ومعرف البطاقة/النموذج',
                            'الدفع المجاني: لا توجد رسوم',
                            'عرض المبلغ المدفوع الآن والرصيد المتبقي',
                            'إكمال الدفع لإنهاء الزيارة'
                        ],
                        screenshot: '💰'
                    },
                    {
                        id: 'claimsTracking',
                        title: '📑 تتبع المطالبات',
                        description: 'تتبع وتسوية مطالبات التأمين بكفاءة. راقب المطالبات المعلقة، وأدر المجلدات، وعالج تسويات التأمين.',
                        details: [
                            'عرض جميع مطالبات التأمين مع الأرصدة المعلقة',
                            'تصفية المطالبات حسب الكل، غير المدفوعة، أو حسب نطاق التاريخ',
                            'تنظيم المطالبات في مجلدات لإدارة أفضل',
                            'تسوية مطالبات التأمين مع المبالغ المدفوعة والخصومات',
                            'تصدير بيانات المطالبات إلى CSV للتقارير'
                        ],
                        actions: [
                            'تصفية المطالبات: جميع المطالبات أو المطالبات غير المدفوعة',
                            'البحث عن المطالبات بواسطة المريض أو الطبيب أو المزود أو المعرف',
                            'إنشاء مجلدات لتنظيم المطالبات',
                            'إضافة المطالبات إلى المجلدات للتجميع',
                            'إزالة المطالبات من المجلدات عند الحاجة',
                            'تسوية التأمين: إدخال المبلغ المدفوع ومبلغ الخصم',
                            'عرض الرصيد المتبقي وحالة التسوية',
                            'تصدير المطالبات إلى CSV للتحليل الخارجي'
                        ],
                        screenshot: '📑'
                    },
                    {
                        id: 'visitTracking',
                        title: '📋 تتبع الزيارات',
                        description: 'تتبع جميع زيارات المرضى مع إمكانيات مراقبة شاملة. ابحث عن الزيارات باسم المريض أو رقم الجوال.',
                        details: [
                            'البحث عن الزيارات باسم المريض أو رقم الجوال',
                            'عرض تفاصيل الزيارة بما في ذلك المريض والطبيب والنوع والحالة',
                            'تتبع حالة الدفع والمبالغ المتبقية',
                            'بدء وإنهاء ومعالجة مدفوعات الزيارات',
                            'تحديد التأمين كمدفوع للزيارات المشمولة بالتأمين'
                        ],
                        actions: [
                            'البحث باسم المريض أو رقم الجوال للعثور على الزيارات',
                            'تحديد زيارة لعرض معلومات مفصلة',
                            'بدء زيارة جديدة للمريض',
                            'إنهاء زيارة قيد التقدم',
                            'معالجة الدفع نقداً أو POS أو تأمين أو مجاناً',
                            'عرض تفاصيل الدفع وسجل المعاملات',
                            'تحديد التأمين كمدفوع لزيارات التأمين'
                        ],
                        screenshot: '📋'
                    },
                    {
                        id: 'appointments',
                        title: '📅 إدارة المواعيد',
                        description: 'إدارة جميع المواعيد بكفاءة مع أدوات شاملة للجدولة والتتبع وإعادة تعيين المواعيد. هذا متاح من شاشة البحث عن المريض وشاشة إدارة المواعيد.',
                        details: [
                            'عرض المواعيد حسب التاريخ لتنظيم أفضل',
                            'تحديث ملاحظات وتفاصيل الموعد',
                            'إعادة تعيين المواعيد لأطباء مختلفين',
                            'حذف المواعيد عند الضرورة',
                            'تصدير بيانات المواعيد إلى CSV للتقارير'
                        ],
                        actions: [
                            'من البحث عن المريض: انقر زر "المواعيد" على المريض المحدد',
                            'من إدارة المواعيد: اختر تاريخاً لعرض جميع المواعيد',
                            'انقر على أي موعد لعرض تفاصيل المريض والطبيب',
                            'استخدم زر "إعادة تعيين" لنقل الموعد إلى طبيب آخر',
                            'تعديل ملاحظات الموعد لإضافة معلومات مهمة',
                            'تصدير قائمة المواعيد إلى CSV للتحليل الخارجي'
                        ],
                        screenshot: '📅'
                    },
                    {
                        id: 'reports',
                        title: '📊 تقارير المريض',
                        description: 'إنشاء تقارير شاملة للمرضى المحددين مع تاريخ الزيارات.',
                        details: [
                            'تقرير PDF مع تاريخ زيارات المريض',
                            'يشمل الوصفات الدوائية',
                            'يشمل الإجراءات التي تمت',
                            'علامة العيادة ومعلومات المريض',
                            'تصدير إلى CSV لتحليل البيانات'
                        ],
                        actions: [
                            'انقر طباعة تقرير لإنشاء PDF',
                            'التقرير يشمل جميع الزيارات والأدوية والإجراءات',
                            'تصدير CSV للتحليل الخارجي',
                            'حفظ التقرير محلياً للسجلات'
                        ],
                        screenshot: '📊'
                    },
                    {
                        id: 'complete',
                        title: '✅ إدارة كاملة للمريض',
                        description: 'تكتمل دورة حياة المريض بتوثيق ومتابعة مناسبة. هذا ينطبق على شاشة البحث عن المريض وشاشة إدارة المواعيد.',
                        details: [
                            'جميع بيانات المريض مخزنة بشكل آمن',
                            'يتم الاحتفاظ بتاريخ الزيارات',
                            'تتبع الوصفات الدوائية',
                            'توثيق الإجراءات',
                            'إدارة نوع المريض',
                            'تتم إدارة المواعيد وتتبعها',
                            'يتم تتبع الزيارات ومراقبتها',
                            'تتم معالجة وتسجيل المدفوعات',
                            'يتم تتبع وتسوية مطالبات التأمين'
                        ],
                        actions: [
                            'استمر في رعاية المريض',
                            'جدولة مواعيد المتابعة',
                            'تحديث سجلات المريض حسب الحاجة',
                            'إنشاء تقارير إضافية',
                            'مراقبة تقدم المريض',
                            'إدارة جميع المواعيد عبر النظام',
                            'تتبع جميع زيارات المرضى',
                            'معالجة وتسجيل جميع المدفوعات',
                            'تتبع وتسوية مطالبات التأمين'
                        ],
                        screenshot: '✅'
                    }
                ]
            },
            // ==================== ADMINISTRATIVE MODULES ====================
            admin: {
                title: 'دليل الوحدات الإدارية',
                steps: [
                    {
                        id: 'adminModules',
                        title: '⚙️ نظرة عامة على الوحدات الإدارية',
                        description: 'أدوات إدارية إضافية لإدارة عمليات العيادة والمستخدمين والتقارير.',
                        details: [
                            'إدارة المستخدمين: إنشاء وإدارة مستخدمي النظام مع الأدوار',
                            'التأمين الصحي: إدارة مزودي التأمين وفئات التغطية',
                            'تقرير مدفوعات العيادة: عرض ملخصات وتفاصيل الدفع',
                            'لوحة التقارير: الوصول إلى التحليلات والتصورات'
                        ],
                        actions: [
                            'إدارة المستخدمين: إضافة وتفعيل/تعطيل المستخدمين وإعادة تعيين كلمات المرور',
                            'التأمين الصحي: إضافة مزودين مع فئات التغطية (أ، ب، ج)',
                            'تقرير مدفوعات العيادة: عرض إجماليات النقد وPOS والتأمين والمجاني',
                            'لوحة التقارير: عرض تحليلات المواعيد والزيارات المباشرة والمرضى والأطباء'
                        ],
                        screenshot: '⚙️'
                    },
                    {
                        id: 'userManagement',
                        title: '👥 إدارة المستخدمين',
                        description: 'إدارة مستخدمي النظام مع التحكم في الوصول القائم على الأدوار. إنشاء المستخدمين وإعادة تعيين كلمات المرور وتفعيل/تعطيل الحسابات.',
                        details: [
                            'إنشاء مستخدمين جدد باسم مستخدم وكلمة مرور',
                            'تعيين الأدوار: مدير أو طبيب أو مساعد',
                            'إعادة تعيين كلمات المرور للمستخدمين الحاليين',
                            'تفعيل أو تعطيل حسابات المستخدمين',
                            'مؤشر قوة كلمة المرور لكلمات مرور آمنة'
                        ],
                        actions: [
                            'إضافة مستخدم: إدخال اسم المستخدم وكلمة المرور مع التحقق',
                            'إعادة تعيين كلمة المرور: تعيين كلمة مرور جديدة لأي مستخدم',
                            'تبديل المستخدم: تفعيل أو تعطيل وصول المستخدم',
                            'البحث عن المستخدمين باسم المستخدم أو الدور',
                            'يجب أن تكون كلمة المرور 6 أحرف على الأقل مع حروف وأرقام'
                        ],
                        screenshot: '👥'
                    },
                    {
                        id: 'healthInsurance',
                        title: '🏥 التأمين الصحي',
                        description: 'إدارة مزودي التأمين وفئات التغطية الخاصة بهم. تتبع المزودين حسب الدولة وأنواع التغطية.',
                        details: [
                            'إضافة مزودي التأمين مع الاسم والنوع والموقع الإلكتروني',
                            'تحديد فئات التغطية (الفئة أ، ب، ج)',
                            'تصفية المزودين حسب الدولة',
                            'البحث عن المزودين بالاسم أو النوع أو الموقع الإلكتروني',
                            'حذف المزودين عند الحاجة'
                        ],
                        actions: [
                            'تحديد دولة لعرض المزودين',
                            'إضافة مزود جديد: إدخال الاسم والنوع وفئات التغطية والموقع الإلكتروني',
                            'تبديل فئات التغطية: أ، ب، ج لكل مزود',
                            'البحث عن المزودين بالاسم أو النوع',
                            'حذف المزودين مع مربع حوار تأكيد'
                        ],
                        screenshot: '🏥'
                    },
                    {
                        id: 'clinicPaymentReport',
                        title: '📊 تقرير مدفوعات العيادة',
                        description: 'إنشاء تقارير شاملة للدفع للعيادة. عرض الملخصات حسب نوع الدفع وسجلات المرضى التفصيلية.',
                        details: [
                            'عرض ملخصات الدفع: نقد وPOS وتأمين وخصم التأمين وزيارات مجانية والإجمالي الكلي',
                            'التصفية حسب نطاق التاريخ ونوع الدفع',
                            'عرض ملخصات الدفع حسب الطبيب',
                            'سجلات دفع المرضى التفصيلية',
                            'تصدير البيانات إلى CSV للتحليل الخارجي'
                        ],
                        actions: [
                            'تحديد تواريخ "من" و"إلى" وفلتر نوع الدفع',
                            'عرض بطاقات الملخص مع إجماليات الدفع',
                            'جدول ملخص الأطباء مع تقسيمات الدفع',
                            'جدول تفاصيل المرضى مع معلومات الدفع',
                            'تصدير التقرير إلى تنسيق CSV'
                        ],
                        screenshot: '📊'
                    },
                    {
                        id: 'reportsDashboard',
                        title: '📈 لوحة التقارير',
                        description: 'الوصول إلى التحليلات والتصورات لعمليات العيادة. عرض الرسوم البيانية والجداول للمواعيد والزيارات المباشرة والمرضى والأطباء.',
                        details: [
                            'المواعيد لكل طبيب: رسم بياني شريطي يوضح توزيع المواعيد',
                            'المواعيد حسب الحالة: رسم بياني دائري يوضح توزيع الحالات',
                            'الزيارات المباشرة لكل طبيب: رسم بياني شريطي يوضح توزيع الزيارات المباشرة',
                            'المرضى حسب الجنس: رسم بياني دائري يوضح توزيع الجنس',
                            'المرضى حسب المدينة: رسم بياني شريطي يوضح توزيع المرضى حسب المدينة',
                            'الأطباء حسب التخصص: رسم بياني شريطي يوضح توزيع الأطباء حسب التخصص'
                        ],
                        actions: [
                            'التنقل بين أنواع التقارير المختلفة باستخدام الشريط الجانبي',
                            'عرض البيانات في تنسيقات الجدول والرسم البياني',
                            'تصدير التقارير إلى تنسيق CSV',
                            'طباعة التقارير مباشرة من لوحة المعلومات',
                            'تحديث البيانات للحصول على أحدث المعلومات'
                        ],
                        screenshot: '📈'
                    }
                ]
            }
        }
    };

    const t = translations[locale] || translations.en;
    const isRTL = locale === 'ar';

    // ==================== NAVIGATION HELPERS ====================
    const getCurrentSteps = () => {
        if (activeGuide === 'patient') return t.patient.steps;
        if (activeGuide === 'admin') return t.admin.steps;
        return [];
    };

    const getCurrentTitle = () => {
        if (activeGuide === 'patient') return t.patient.title;
        if (activeGuide === 'admin') return t.admin.title;
        return t.menu.title;
    };

    const getStepIcon = (stepId) => {
        const icons = {
            'setup': '⚙️',
            'search': '🔍',
            'select': '📋',
            'actions': '🚶',
            'chooseDoctor': '👨‍⚕️',
            'doctorVisitClosure': '🏥',
            'visitPayment': '💰',
            'claimsTracking': '📑',
            'visitTracking': '📋',
            'appointments': '📅',
            'reports': '📊',
            'complete': '✅',
            'adminModules': '⚙️',
            'userManagement': '👥',
            'healthInsurance': '🏥',
            'clinicPaymentReport': '📊',
            'reportsDashboard': '📈'
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
                    {/* Header */}
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

                    {/* Content */}
                    <div style={styles.menuContent}>
                        <h3 style={styles.menuTitle}>{t.menu.title}</h3>
                        <p style={styles.menuSubtitle}>{t.menu.subtitle}</p>
                        
                        <div style={styles.menuGrid}>
                            {/* Patient Lifecycle Card */}
                            <div 
                                style={styles.menuCard}
                                onClick={() => handleSelectGuide('patient')}
                            >
                                <div style={styles.menuCardIcon}>👤</div>
                                <h4 style={styles.menuCardTitle}>{t.menu.patientLifecycle.title}</h4>
                                <p style={styles.menuCardDescription}>{t.menu.patientLifecycle.description}</p>
                                <div style={styles.menuCardButton}>▶ {t.next}</div>
                            </div>

                            {/* Administrative Modules Card */}
                            <div 
                                style={styles.menuCard}
                                onClick={() => handleSelectGuide('admin')}
                            >
                                <div style={styles.menuCardIcon}>⚙️</div>
                                <h4 style={styles.menuCardTitle}>{t.menu.adminModules.title}</h4>
                                <p style={styles.menuCardDescription}>{t.menu.adminModules.description}</p>
                                <div style={styles.menuCardButton}>▶ {t.next}</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
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

    // ==================== RENDER GUIDE ====================
    const steps = getCurrentSteps();
    const currentStepData = steps[currentStep];
    const isPatientGuide = activeGuide === 'patient';
    const guideSteps = isPatientGuide ? t.patient.steps : t.admin.steps;

    return (
        <div style={styles.overlay} dir={isRTL ? 'rtl' : 'ltr'}>
            <div style={styles.modal}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

                {/* Progress Bar */}
                <div style={styles.progressContainer}>
                    <div style={{ ...styles.progressBar, width: `${progress()}%` }} />
                </div>

                {/* Journey Map */}
                <div style={styles.journeyMap}>
                    {guideSteps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;
                        
                        return (
                            <div key={step.id} style={styles.journeyItem}>
                                {/* Connector line */}
                                {index > 0 && (
                                    <div 
                                        style={{
                                            ...styles.journeyConnector,
                                            background: isCompleted || isActive ? '#9f7aea' : '#e2e8f0'
                                        }}
                                    />
                                )}
                                
                                {/* Journey node */}
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
                                
                                {/* Journey label */}
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

                {/* Step Indicators */}
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

                {/* Content */}
                <div style={styles.content}>
                    {/* Step Number */}
                    <div style={styles.stepNumber}>
                        {isRTL ? `الخطوة ${currentStep + 1} من ${guideSteps.length}` : `Step ${currentStep + 1} of ${guideSteps.length}`}
                    </div>

                    {/* Step Title */}
                    <h3 style={styles.stepTitle}>{currentStepData.title}</h3>

                    {/* Screenshot/Icon */}
                    <div style={styles.screenshotContainer}>
                        <span style={styles.screenshotIcon}>{currentStepData.screenshot}</span>
                    </div>

                    {/* Description */}
                    <p style={styles.description}>{currentStepData.description}</p>

                    {/* ==================== PATIENT LIFECYCLE SPECIAL STEPS ==================== */}
                    {isPatientGuide && currentStep === 0 && (
                        <div style={styles.setupContainer}>
                            <div style={styles.setupGrid}>
                                <div style={styles.setupCard}>
                                    <div style={styles.setupCardHeader}>
                                        <span style={styles.setupCardIcon}>🏛️</span>
                                        <h4 style={styles.setupCardTitle}>Sections</h4>
                                    </div>
                                    <ul style={styles.setupList}>
                                        <li>Create departments for patient care</li>
                                        <li>Organize by medical specialty</li>
                                        <li>Assign rooms to sections</li>
                                        <li>Manage department workflows</li>
                                    </ul>
                                </div>
                                <div style={styles.setupCard}>
                                    <div style={styles.setupCardHeader}>
                                        <span style={styles.setupCardIcon}>🛏️</span>
                                        <h4 style={styles.setupCardTitle}>Rooms</h4>
                                    </div>
                                    <ul style={styles.setupList}>
                                        <li>Create rooms for patient visits</li>
                                        <li>Assign to specific sections</li>
                                        <li>Track room availability</li>
                                        <li>Manage room assignments</li>
                                    </ul>
                                </div>
                                <div style={styles.setupCard}>
                                    <div style={styles.setupCardHeader}>
                                        <span style={styles.setupCardIcon}>👨‍⚕️</span>
                                        <h4 style={styles.setupCardTitle}>Doctors</h4>
                                    </div>
                                    <ul style={styles.setupList}>
                                        <li>Add doctors with specialties</li>
                                        <li>Create login credentials</li>
                                        <li>Assign to sections</li>
                                        <li>Manage doctor schedules</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.setupFlow}>
                                <h4 style={styles.setupFlowTitle}>📋 Setup Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Create Sections</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>Add Rooms to Sections</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Register Doctors</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Start Patient Management</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPatientGuide && currentStep === 4 && (
                        <div style={styles.doctorContainer}>
                            <div style={styles.doctorGrid}>
                                <div style={styles.doctorCard}>
                                    <div style={styles.doctorCardHeader}>
                                        <span style={styles.doctorCardIcon}>👨‍⚕️</span>
                                        <h4 style={styles.doctorCardTitle}>Select Doctor</h4>
                                    </div>
                                    <ul style={styles.doctorList}>
                                        <li>Choose from list of registered doctors</li>
                                        <li>View doctor specialties and credentials</li>
                                        <li>Assign doctor to appointment or walk-in</li>
                                        <li>Doctor determines section and room</li>
                                    </ul>
                                </div>
                                <div style={styles.doctorCard}>
                                    <div style={styles.doctorCardHeader}>
                                        <span style={styles.doctorCardIcon}>🔄</span>
                                        <h4 style={styles.doctorCardTitle}>Reassign Doctor</h4>
                                    </div>
                                    <ul style={styles.doctorList}>
                                        <li>Change doctor for existing appointments</li>
                                        <li>Select from available doctors list</li>
                                        <li>System updates automatically</li>
                                        <li>New doctor assigned to appointment</li>
                                    </ul>
                                </div>
                                <div style={styles.doctorCard}>
                                    <div style={styles.doctorCardHeader}>
                                        <span style={styles.doctorCardIcon}>📋</span>
                                        <h4 style={styles.doctorCardTitle}>Doctor Assignment</h4>
                                    </div>
                                    <ul style={styles.doctorList}>
                                        <li>Doctor determines which section</li>
                                        <li>Room assigned based on doctor's section</li>
                                        <li>Track doctor availability</li>
                                        <li>Manage doctor schedules</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.doctorFlow}>
                                <h4 style={styles.doctorFlowTitle}>📋 Doctor Selection Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Register Appointment/Walk-in</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>Choose Doctor</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Assign Section & Room</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Complete Visit</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPatientGuide && currentStep === 5 && (
                        <div style={styles.doctorVisitClosureContainer}>
                            <div style={styles.doctorVisitClosureGrid}>
                                <div style={styles.doctorVisitClosureCard}>
                                    <div style={styles.doctorVisitClosureCardHeader}>
                                        <span style={styles.doctorVisitClosureCardIcon}>📝</span>
                                        <h4 style={styles.doctorVisitClosureCardTitle}>Clinical Documentation</h4>
                                    </div>
                                    <ul style={styles.doctorVisitClosureList}>
                                        <li>Document Chief Complaint</li>
                                        <li>Record medical notes and observations</li>
                                        <li>Update patient medical history</li>
                                        <li>Document diagnosis and treatment plan</li>
                                    </ul>
                                </div>
                                <div style={styles.doctorVisitClosureCard}>
                                    <div style={styles.doctorVisitClosureCardHeader}>
                                        <span style={styles.doctorVisitClosureCardIcon}>💊</span>
                                        <h4 style={styles.doctorVisitClosureCardTitle}>Drug Prescriptions</h4>
                                    </div>
                                    <ul style={styles.doctorVisitClosureList}>
                                        <li>Prescribe medications with trade name</li>
                                        <li>Specify dosage, frequency, and duration</li>
                                        <li>Add instructions for patient</li>
                                        <li>Track prescription history</li>
                                    </ul>
                                </div>
                                <div style={styles.doctorVisitClosureCard}>
                                    <div style={styles.doctorVisitClosureCardHeader}>
                                        <span style={styles.doctorVisitClosureCardIcon}>🩺</span>
                                        <h4 style={styles.doctorVisitClosureCardTitle}>Procedures</h4>
                                    </div>
                                    <ul style={styles.doctorVisitClosureList}>
                                        <li>Record procedures performed</li>
                                        <li>Document procedure details</li>
                                        <li>Track procedure history</li>
                                        <li>Link procedures to visit</li>
                                    </ul>
                                </div>
                                <div style={styles.doctorVisitClosureCard}>
                                    <div style={styles.doctorVisitClosureCardHeader}>
                                        <span style={styles.doctorVisitClosureCardIcon}>🚪</span>
                                        <h4 style={styles.doctorVisitClosureCardTitle}>Discharge</h4>
                                    </div>
                                    <ul style={styles.doctorVisitClosureList}>
                                        <li>Complete discharge process</li>
                                        <li>Set discharge status (COMPLETED)</li>
                                        <li>Provide discharge instructions</li>
                                        <li>Schedule follow-up if needed</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.doctorVisitClosureFlow}>
                                <h4 style={styles.doctorVisitClosureFlowTitle}>📋 Doctor Visit Closure Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Document Clinical Data</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>Prescribe Drugs</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Record Procedures</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Complete Discharge</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>5</span>
                                        <span>Visit Ready for Payment</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPatientGuide && currentStep === 6 && (
                        <div style={styles.visitPaymentContainer}>
                            <div style={styles.visitPaymentGrid}>
                                <div style={styles.visitPaymentCard}>
                                    <div style={styles.visitPaymentCardHeader}>
                                        <span style={styles.visitPaymentCardIcon}>💵</span>
                                        <h4 style={styles.visitPaymentCardTitle}>Cash Payment</h4>
                                    </div>
                                    <ul style={styles.visitPaymentList}>
                                        <li>Enter cash amount paid by patient</li>
                                        <li>Process cash payment directly</li>
                                        <li>Update payment status automatically</li>
                                        <li>Cash payment recorded in system</li>
                                    </ul>
                                </div>
                                <div style={styles.visitPaymentCard}>
                                    <div style={styles.visitPaymentCardHeader}>
                                        <span style={styles.visitPaymentCardIcon}>💳</span>
                                        <h4 style={styles.visitPaymentCardTitle}>POS Payment</h4>
                                    </div>
                                    <ul style={styles.visitPaymentList}>
                                        <li>Enter terminal ID for POS machine</li>
                                        <li>Enter POS payment number</li>
                                        <li>Select card type (Visa, Mastercard, etc.)</li>
                                        <li>Enter approval code from POS terminal</li>
                                    </ul>
                                </div>
                                <div style={styles.visitPaymentCard}>
                                    <div style={styles.visitPaymentCardHeader}>
                                        <span style={styles.visitPaymentCardIcon}>🏥</span>
                                        <h4 style={styles.visitPaymentCardTitle}>Insurance Payment</h4>
                                    </div>
                                    <ul style={styles.visitPaymentList}>
                                        <li>Enter insurance provider name</li>
                                        <li>Select insurance class (A, B, C)</li>
                                        <li>Select insurance type (BENEFICIARY/SUBSCRIBER)</li>
                                        <li>Set coverage percentage</li>
                                        <li>Enter insurance accept number</li>
                                        <li>Enter Card ID OR Form ID</li>
                                    </ul>
                                </div>
                                <div style={styles.visitPaymentCard}>
                                    <div style={styles.visitPaymentCardHeader}>
                                        <span style={styles.visitPaymentCardIcon}>🎁</span>
                                        <h4 style={styles.visitPaymentCardTitle}>Free Payment</h4>
                                    </div>
                                    <ul style={styles.visitPaymentList}>
                                        <li>No charges applied to patient</li>
                                        <li>Used for charity cases</li>
                                        <li>Free payment recorded in system</li>
                                        <li>Visit completed with zero charges</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.visitPaymentFlow}>
                                <h4 style={styles.visitPaymentFlowTitle}>💰 Payment Processing Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Select Payment Type</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>Enter Payment Details</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Validate Payment</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Complete Payment</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPatientGuide && currentStep === 7 && (
                        <div style={styles.claimsTrackingContainer}>
                            <div style={styles.claimsTrackingGrid}>
                                <div style={styles.claimsTrackingCard}>
                                    <div style={styles.claimsTrackingCardHeader}>
                                        <span style={styles.claimsTrackingCardIcon}>📊</span>
                                        <h4 style={styles.claimsTrackingCardTitle}>View & Filter Claims</h4>
                                    </div>
                                    <ul style={styles.claimsTrackingList}>
                                        <li>View all insurance claims with outstanding balances</li>
                                        <li>Filter by All Claims or Unpaid Claims</li>
                                        <li>Filter by date range (from/to dates)</li>
                                        <li>Search claims by patient, doctor, or provider</li>
                                    </ul>
                                </div>
                                <div style={styles.claimsTrackingCard}>
                                    <div style={styles.claimsTrackingCardHeader}>
                                        <span style={styles.claimsTrackingCardIcon}>📁</span>
                                        <h4 style={styles.claimsTrackingCardTitle}>Folder Management</h4>
                                    </div>
                                    <ul style={styles.claimsTrackingList}>
                                        <li>Create folders to organize claims</li>
                                        <li>Add selected claims to folders</li>
                                        <li>Remove claims from folders</li>
                                        <li>Delete folders when no longer needed</li>
                                        <li>View folder contents</li>
                                    </ul>
                                </div>
                                <div style={styles.claimsTrackingCard}>
                                    <div style={styles.claimsTrackingCardHeader}>
                                        <span style={styles.claimsTrackingCardIcon}>💰</span>
                                        <h4 style={styles.claimsTrackingCardTitle}>Settle Claims</h4>
                                    </div>
                                    <ul style={styles.claimsTrackingList}>
                                        <li>Select a claim to settle</li>
                                        <li>Enter paid amount and discount amount</li>
                                        <li>Validate settlement amounts</li>
                                        <li>Confirm and complete settlement</li>
                                        <li>View settlement status (Paid/Pending)</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.claimsTrackingFlow}>
                                <h4 style={styles.claimsTrackingFlowTitle}>📑 Claims Tracking Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>View Claims</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>Filter/Search</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Organize in Folders</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Settle Claims</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPatientGuide && currentStep === 8 && (
                        <div style={styles.visitTrackingContainer}>
                            <div style={styles.visitTrackingGrid}>
                                <div style={styles.visitTrackingCard}>
                                    <div style={styles.visitTrackingCardHeader}>
                                        <span style={styles.visitTrackingCardIcon}>🔍</span>
                                        <h4 style={styles.visitTrackingCardTitle}>Search Visits</h4>
                                    </div>
                                    <ul style={styles.visitTrackingList}>
                                        <li>Search by patient name or mobile</li>
                                        <li>View all visits for found patients</li>
                                        <li>Filter by visit status</li>
                                        <li>Quick access to visit details</li>
                                    </ul>
                                </div>
                                <div style={styles.visitTrackingCard}>
                                    <div style={styles.visitTrackingCardHeader}>
                                        <span style={styles.visitTrackingCardIcon}>📊</span>
                                        <h4 style={styles.visitTrackingCardTitle}>Visit Monitoring</h4>
                                    </div>
                                    <ul style={styles.visitTrackingList}>
                                        <li>Track visit status (NEW, IN_PROGRESS, COMPLETED)</li>
                                        <li>Monitor payment status and amounts</li>
                                        <li>View remaining balance</li>
                                        <li>Track insurance payment status</li>
                                    </ul>
                                </div>
                                <div style={styles.visitTrackingCard}>
                                    <div style={styles.visitTrackingCardHeader}>
                                        <span style={styles.visitTrackingCardIcon}>⚡</span>
                                        <h4 style={styles.visitTrackingCardTitle}>Visit Actions</h4>
                                    </div>
                                    <ul style={styles.visitTrackingList}>
                                        <li>Start new visits for patients</li>
                                        <li>End in-progress visits</li>
                                        <li>Process payments from this screen</li>
                                        <li>Mark insurance as paid</li>
                                        <li>View payment details</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.visitTrackingFlow}>
                                <h4 style={styles.visitTrackingFlowTitle}>📋 Visit Tracking Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Search Patients</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>View Visits</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Select Visit</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Manage Visit</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>5</span>
                                        <span>Process Payment</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPatientGuide && currentStep === 9 && (
                        <div style={styles.appointmentContainer}>
                            <div style={styles.appointmentGrid}>
                                <div style={styles.appointmentCard}>
                                    <div style={styles.appointmentCardHeader}>
                                        <span style={styles.appointmentCardIcon}>📅</span>
                                        <h4 style={styles.appointmentCardTitle}>View Appointments</h4>
                                    </div>
                                    <ul style={styles.appointmentList}>
                                        <li>Select a date to view all appointments</li>
                                        <li>See patient and doctor information</li>
                                        <li>View appointment time and room details</li>
                                        <li>Switch between table and card views</li>
                                    </ul>
                                </div>
                                <div style={styles.appointmentCard}>
                                    <div style={styles.appointmentCardHeader}>
                                        <span style={styles.appointmentCardIcon}>🔄</span>
                                        <h4 style={styles.appointmentCardTitle}>Reassign Appointments</h4>
                                    </div>
                                    <ul style={styles.appointmentList}>
                                        <li>Select an appointment to reassign</li>
                                        <li>Choose a new doctor from the list</li>
                                        <li>Confirm reassignment</li>
                                        <li>System updates automatically</li>
                                    </ul>
                                </div>
                                <div style={styles.appointmentCard}>
                                    <div style={styles.appointmentCardHeader}>
                                        <span style={styles.appointmentCardIcon}>✏️</span>
                                        <h4 style={styles.appointmentCardTitle}>Update & Manage</h4>
                                    </div>
                                    <ul style={styles.appointmentList}>
                                        <li>Edit appointment notes</li>
                                        <li>Delete appointments when needed</li>
                                        <li>Export data to CSV format</li>
                                        <li>Track appointment history</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.appointmentFlow}>
                                <h4 style={styles.appointmentFlowTitle}>📋 Appointment Management Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Select Date</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>View Appointments</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Manage/Reassign</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Export/Complete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isPatientGuide && currentStep === 10 && (
                        <div style={styles.reportsContainer}>
                            <div style={styles.reportsGrid}>
                                <div style={styles.reportsCard}>
                                    <div style={styles.reportsCardHeader}>
                                        <span style={styles.reportsCardIcon}>📄</span>
                                        <h4 style={styles.reportsCardTitle}>PDF Reports</h4>
                                    </div>
                                    <ul style={styles.reportsList}>
                                        <li>Generate PDF with patient visit history</li>
                                        <li>Includes drug prescriptions</li>
                                        <li>Includes procedures performed</li>
                                        <li>Clinic branding and patient information</li>
                                    </ul>
                                </div>
                                <div style={styles.reportsCard}>
                                    <div style={styles.reportsCardHeader}>
                                        <span style={styles.reportsCardIcon}>📊</span>
                                        <h4 style={styles.reportsCardTitle}>CSV Export</h4>
                                    </div>
                                    <ul style={styles.reportsList}>
                                        <li>Export data to CSV format</li>
                                        <li>For external analysis</li>
                                        <li>Data includes visits, drugs, procedures</li>
                                        <li>Save locally for record keeping</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== ADMINISTRATIVE MODULES SPECIAL STEPS ==================== */}
                    {!isPatientGuide && currentStep === 0 && (
                        <div style={styles.adminModulesContainer}>
                            <div style={styles.adminModulesGrid}>
                                <div style={styles.adminModuleCard}>
                                    <div style={styles.adminModuleCardHeader}>
                                        <span style={styles.adminModuleCardIcon}>👥</span>
                                        <h4 style={styles.adminModuleCardTitle}>User Management</h4>
                                    </div>
                                    <ul style={styles.adminModuleList}>
                                        <li>Create users with roles (Admin, Doctor, Assistant)</li>
                                        <li>Reset passwords for users</li>
                                        <li>Enable/disable user accounts</li>
                                        <li>Password strength validation</li>
                                    </ul>
                                </div>
                                <div style={styles.adminModuleCard}>
                                    <div style={styles.adminModuleCardHeader}>
                                        <span style={styles.adminModuleCardIcon}>🏥</span>
                                        <h4 style={styles.adminModuleCardTitle}>Health Insurance</h4>
                                    </div>
                                    <ul style={styles.adminModuleList}>
                                        <li>Manage insurance providers</li>
                                        <li>Set coverage classes (A, B, C)</li>
                                        <li>Filter by country</li>
                                        <li>Search providers</li>
                                    </ul>
                                </div>
                                <div style={styles.adminModuleCard}>
                                    <div style={styles.adminModuleCardHeader}>
                                        <span style={styles.adminModuleCardIcon}>📊</span>
                                        <h4 style={styles.adminModuleCardTitle}>Payment Report</h4>
                                    </div>
                                    <ul style={styles.adminModuleList}>
                                        <li>View payment summaries</li>
                                        <li>Filter by date and payment type</li>
                                        <li>Doctor-wise payment breakdown</li>
                                        <li>Export to CSV</li>
                                    </ul>
                                </div>
                                <div style={styles.adminModuleCard}>
                                    <div style={styles.adminModuleCardHeader}>
                                        <span style={styles.adminModuleCardIcon}>📈</span>
                                        <h4 style={styles.adminModuleCardTitle}>Reports Dashboard</h4>
                                    </div>
                                    <ul style={styles.adminModuleList}>
                                        <li>Appointments per Doctor</li>
                                        <li>Appointments by Status</li>
                                        <li>Walk-ins per Doctor</li>
                                        <li>Patients by Gender/City</li>
                                        <li>Doctors by Specialty</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.adminModulesFlow}>
                                <h4 style={styles.adminModulesFlowTitle}>📋 Administrative Modules Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>User Management</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>Health Insurance</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Payment Report</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Reports Dashboard</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isPatientGuide && currentStep === 1 && (
                        <div style={styles.userManagementContainer}>
                            <div style={styles.userManagementGrid}>
                                <div style={styles.userManagementCard}>
                                    <div style={styles.userManagementCardHeader}>
                                        <span style={styles.userManagementCardIcon}>👤</span>
                                        <h4 style={styles.userManagementCardTitle}>Add User</h4>
                                    </div>
                                    <ul style={styles.userManagementList}>
                                        <li>Enter username (minimum 3 letters)</li>
                                        <li>Enter password (6+ chars, letters & numbers)</li>
                                        <li>View password strength indicator</li>
                                        <li>User created with default role</li>
                                    </ul>
                                </div>
                                <div style={styles.userManagementCard}>
                                    <div style={styles.userManagementCardHeader}>
                                        <span style={styles.userManagementCardIcon}>🔑</span>
                                        <h4 style={styles.userManagementCardTitle}>Reset Password</h4>
                                    </div>
                                    <ul style={styles.userManagementList}>
                                        <li>Select user to reset password</li>
                                        <li>Enter new password with validation</li>
                                        <li>Password strength indicator</li>
                                        <li>Update password immediately</li>
                                    </ul>
                                </div>
                                <div style={styles.userManagementCard}>
                                    <div style={styles.userManagementCardHeader}>
                                        <span style={styles.userManagementCardIcon}>🔄</span>
                                        <h4 style={styles.userManagementCardTitle}>Enable/Disable</h4>
                                    </div>
                                    <ul style={styles.userManagementList}>
                                        <li>Toggle user status</li>
                                        <li>Enable: User can access system</li>
                                        <li>Disable: User access blocked</li>
                                        <li>Status visible in table</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.userManagementFlow}>
                                <h4 style={styles.userManagementFlowTitle}>👥 User Management Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Load Users</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>Add/Reset/Toggle</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Search & Filter</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Manage Users</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isPatientGuide && currentStep === 2 && (
                        <div style={styles.healthInsuranceContainer}>
                            <div style={styles.healthInsuranceGrid}>
                                <div style={styles.healthInsuranceCard}>
                                    <div style={styles.healthInsuranceCardHeader}>
                                        <span style={styles.healthInsuranceCardIcon}>🌍</span>
                                        <h4 style={styles.healthInsuranceCardTitle}>Select Country</h4>
                                    </div>
                                    <ul style={styles.healthInsuranceList}>
                                        <li>Choose country from dropdown</li>
                                        <li>Load providers for selected country</li>
                                        <li>View all providers for that country</li>
                                        <li>Switch countries to change view</li>
                                    </ul>
                                </div>
                                <div style={styles.healthInsuranceCard}>
                                    <div style={styles.healthInsuranceCardHeader}>
                                        <span style={styles.healthInsuranceCardIcon}>➕</span>
                                        <h4 style={styles.healthInsuranceCardTitle}>Add Provider</h4>
                                    </div>
                                    <ul style={styles.healthInsuranceList}>
                                        <li>Enter provider name and type</li>
                                        <li>Select coverage classes (A, B, C)</li>
                                        <li>Enter website URL</li>
                                        <li>Save provider to system</li>
                                    </ul>
                                </div>
                                <div style={styles.healthInsuranceCard}>
                                    <div style={styles.healthInsuranceCardHeader}>
                                        <span style={styles.healthInsuranceCardIcon}>🔍</span>
                                        <h4 style={styles.healthInsuranceCardTitle}>Search & Delete</h4>
                                    </div>
                                    <ul style={styles.healthInsuranceList}>
                                        <li>Search providers by name or type</li>
                                        <li>View providers with class icons</li>
                                        <li>Delete providers with confirmation</li>
                                        <li>Manage provider list</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.healthInsuranceFlow}>
                                <h4 style={styles.healthInsuranceFlowTitle}>🏥 Health Insurance Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Select Country</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>View Providers</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Add/Search/Delete</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isPatientGuide && currentStep === 3 && (
                        <div style={styles.clinicPaymentReportContainer}>
                            <div style={styles.clinicPaymentReportGrid}>
                                <div style={styles.clinicPaymentReportCard}>
                                    <div style={styles.clinicPaymentReportCardHeader}>
                                        <span style={styles.clinicPaymentReportCardIcon}>📊</span>
                                        <h4 style={styles.clinicPaymentReportCardTitle}>Summary Cards</h4>
                                    </div>
                                    <ul style={styles.clinicPaymentReportList}>
                                        <li>Cash total</li>
                                        <li>POS total</li>
                                        <li>Insurance total</li>
                                        <li>Insurance discount</li>
                                        <li>Free visits</li>
                                        <li>Grand total</li>
                                    </ul>
                                </div>
                                <div style={styles.clinicPaymentReportCard}>
                                    <div style={styles.clinicPaymentReportCardHeader}>
                                        <span style={styles.clinicPaymentReportCardIcon}>👨‍⚕️</span>
                                        <h4 style={styles.clinicPaymentReportCardTitle}>Doctor Summary</h4>
                                    </div>
                                    <ul style={styles.clinicPaymentReportList}>
                                        <li>Doctor name</li>
                                        <li>Cash total per doctor</li>
                                        <li>POS total per doctor</li>
                                        <li>Insurance total per doctor</li>
                                        <li>Insurance discount per doctor</li>
                                        <li>Free visits per doctor</li>
                                        <li>Grand total per doctor</li>
                                    </ul>
                                </div>
                                <div style={styles.clinicPaymentReportCard}>
                                    <div style={styles.clinicPaymentReportCardHeader}>
                                        <span style={styles.clinicPaymentReportCardIcon}>📋</span>
                                        <h4 style={styles.clinicPaymentReportCardTitle}>Patient Details</h4>
                                    </div>
                                    <ul style={styles.clinicPaymentReportList}>
                                        <li>Payment ID</li>
                                        <li>Patient name</li>
                                        <li>Payment type with badge</li>
                                        <li>Amount</li>
                                        <li>Insurance amount</li>
                                        <li>Insurance paid</li>
                                        <li>Insurance discount</li>
                                        <li>Paid at time</li>
                                        <li>Doctor name</li>
                                        <li>Visit type and date</li>
                                        <li>Insurance provider</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.clinicPaymentReportFlow}>
                                <h4 style={styles.clinicPaymentReportFlowTitle}>📊 Clinic Payment Report Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Select Dates</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>Filter Payment Type</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>View Summaries</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>4</span>
                                        <span>Export to CSV</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isPatientGuide && currentStep === 4 && (
                        <div style={styles.reportsDashboardContainer}>
                            <div style={styles.reportsDashboardGrid}>
                                <div style={styles.reportsDashboardCard}>
                                    <div style={styles.reportsDashboardCardHeader}>
                                        <span style={styles.reportsDashboardCardIcon}>📊</span>
                                        <h4 style={styles.reportsDashboardCardTitle}>Appointments</h4>
                                    </div>
                                    <ul style={styles.reportsDashboardList}>
                                        <li>Appointments per Doctor (Bar chart)</li>
                                        <li>Appointments by Status (Pie chart)</li>
                                        <li>Walk-ins per Doctor (Bar chart)</li>
                                    </ul>
                                </div>
                                <div style={styles.reportsDashboardCard}>
                                    <div style={styles.reportsDashboardCardHeader}>
                                        <span style={styles.reportsDashboardCardIcon}>👥</span>
                                        <h4 style={styles.reportsDashboardCardTitle}>Patients</h4>
                                    </div>
                                    <ul style={styles.reportsDashboardList}>
                                        <li>Patients by Gender (Pie chart)</li>
                                        <li>Patients by City (Bar chart)</li>
                                    </ul>
                                </div>
                                <div style={styles.reportsDashboardCard}>
                                    <div style={styles.reportsDashboardCardHeader}>
                                        <span style={styles.reportsDashboardCardIcon}>👨‍⚕️</span>
                                        <h4 style={styles.reportsDashboardCardTitle}>Doctors</h4>
                                    </div>
                                    <ul style={styles.reportsDashboardList}>
                                        <li>Doctors by Specialty (Bar chart)</li>
                                    </ul>
                                </div>
                            </div>
                            <div style={styles.reportsDashboardFlow}>
                                <h4 style={styles.reportsDashboardFlowTitle}>📈 Reports Dashboard Flow:</h4>
                                <div style={styles.flowSteps}>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>1</span>
                                        <span>Select Report Type</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>2</span>
                                        <span>View Data & Charts</span>
                                    </div>
                                    <div style={styles.flowArrow}>→</div>
                                    <div style={styles.flowStep}>
                                        <span style={styles.flowStepNumber}>3</span>
                                        <span>Export/Print</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ==================== DETAILS FOR REGULAR STEPS ==================== */}
                    {((isPatientGuide && currentStep !== 0 && currentStep !== 4 && currentStep !== 5 && currentStep !== 6 && 
                       currentStep !== 7 && currentStep !== 8 && currentStep !== 9 && currentStep !== 10) ||
                       (!isPatientGuide && currentStep !== 0 && currentStep !== 1 && currentStep !== 2 && currentStep !== 3 && currentStep !== 4)) && (
                        <>
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

                            {/* Actions */}
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
                        </>
                    )}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        style={{
                            ...styles.button,
                            ...styles.secondaryButton,
                            opacity: currentStep === 0 ? 0.5 : 1
                        }}
                    >
                        {t.previous}
                    </button>
                    
                    <button
                        onClick={handleNext}
                        style={{
                            ...styles.button,
                            ...styles.primaryButton
                        }}
                    >
                        {currentStep === guideSteps.length - 1 ? t.finish : t.next}
                    </button>
                </div>
            </div>

            {/* Inline styles for the component */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

// Styles object
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
        padding: '20px 24px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f7fafc'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#2d3748',
        fontWeight: 'bold'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#718096',
        padding: '4px 8px',
        borderRadius: '6px',
        transition: 'all 0.2s'
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
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#4a5568',
        transition: 'all 0.2s'
    },
    progressContainer: {
        height: '4px',
        backgroundColor: '#e2e8f0',
        position: 'relative'
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#9f7aea',
        transition: 'width 0.5s ease',
        borderRadius: '2px'
    },
    // Menu Styles
    menuContent: {
        padding: '30px 24px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuTitle: {
        fontSize: '24px',
        color: '#2d3748',
        marginBottom: '8px'
    },
    menuSubtitle: {
        fontSize: '16px',
        color: '#718096',
        marginBottom: '30px'
    },
    menuGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        width: '100%',
        maxWidth: '700px'
    },
    menuCard: {
        background: '#f7fafc',
        borderRadius: '12px',
        padding: '24px',
        border: '2px solid #e2e8f0',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    menuCardIcon: {
        fontSize: '48px',
        marginBottom: '12px'
    },
    menuCardTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#2d3748',
        marginBottom: '8px'
    },
    menuCardDescription: {
        fontSize: '14px',
        color: '#718096',
        marginBottom: '16px',
        flex: 1
    },
    menuCardButton: {
        padding: '8px 24px',
        background: '#9f7aea',
        color: 'white',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '14px',
        transition: 'all 0.2s'
    },
    // Journey Map Styles
    journeyMap: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px 10px 24px',
        backgroundColor: '#f7fafc',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative'
    },
    journeyItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        flex: 1
    },
    journeyConnector: {
        position: 'absolute',
        top: '20px',
        left: '-50%',
        right: '50%',
        height: '2px',
        backgroundColor: '#e2e8f0',
        zIndex: 1
    },
    journeyNode: {
        width: '40px',
        height: '40px',
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
        fontSize: '18px',
        lineHeight: 1
    },
    journeyLabel: {
        marginTop: '8px',
        fontSize: '10px',
        textAlign: 'center',
        transition: 'all 0.3s ease'
    },
    stepIndicators: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        padding: '8px 0 12px 0',
        backgroundColor: '#f7fafc'
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
        padding: '24px',
        overflowY: 'auto',
        flex: 1
    },
    stepNumber: {
        fontSize: '12px',
        color: '#718096',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '8px'
    },
    stepTitle: {
        fontSize: '22px',
        color: '#2d3748',
        marginBottom: '16px',
        fontWeight: '600'
    },
    screenshotContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f7fafc',
        borderRadius: '12px',
        marginBottom: '16px'
    },
    screenshotIcon: {
        fontSize: '48px'
    },
    description: {
        fontSize: '16px',
        color: '#4a5568',
        lineHeight: '1.6',
        marginBottom: '20px'
    },
    // Setup Step Styles
    setupContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    setupGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px'
    },
    setupCard: {
        background: '#f7fafc',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    setupCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    setupCardIcon: {
        fontSize: '24px'
    },
    setupCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#2d3748',
        fontWeight: '600'
    },
    setupList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    setupFlow: {
        background: '#ebf8ff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #bee3f8'
    },
    setupFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    flowSteps: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px'
    },
    flowStep: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        background: 'white',
        padding: '6px 12px',
        borderRadius: '20px',
        border: '1px solid #bee3f8',
        fontSize: '12px',
        fontWeight: '500'
    },
    flowStepNumber: {
        background: '#4299e1',
        color: 'white',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: 'bold'
    },
    flowArrow: {
        color: '#4299e1',
        fontWeight: 'bold',
        fontSize: '16px'
    },
    // Choose Doctor Step Styles
    doctorContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    doctorGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    doctorCard: {
        background: '#fefcbf',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #f6e05e',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    doctorCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    doctorCardIcon: {
        fontSize: '24px'
    },
    doctorCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#975a16',
        fontWeight: '600'
    },
    doctorList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    doctorFlow: {
        background: '#fefcbf',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #f6e05e'
    },
    doctorFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#975a16',
        fontWeight: '600'
    },
    // Doctor Visit Closure Step Styles
    doctorVisitClosureContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    doctorVisitClosureGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px'
    },
    doctorVisitClosureCard: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    doctorVisitClosureCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    doctorVisitClosureCardIcon: {
        fontSize: '24px'
    },
    doctorVisitClosureCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#276749',
        fontWeight: '600'
    },
    doctorVisitClosureList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    doctorVisitClosureFlow: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5'
    },
    doctorVisitClosureFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#276749',
        fontWeight: '600'
    },
    // Visit Payment Step Styles
    visitPaymentContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    visitPaymentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '15px'
    },
    visitPaymentCard: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    visitPaymentCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    visitPaymentCardIcon: {
        fontSize: '24px'
    },
    visitPaymentCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#276749',
        fontWeight: '600'
    },
    visitPaymentList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    visitPaymentFlow: {
        background: '#ebf8ff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #bee3f8'
    },
    visitPaymentFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    // Claims Tracking Step Styles
    claimsTrackingContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    claimsTrackingGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    claimsTrackingCard: {
        background: '#fefcbf',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #f6e05e',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    claimsTrackingCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    claimsTrackingCardIcon: {
        fontSize: '24px'
    },
    claimsTrackingCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#975a16',
        fontWeight: '600'
    },
    claimsTrackingList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    claimsTrackingFlow: {
        background: '#fefcbf',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #f6e05e'
    },
    claimsTrackingFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#975a16',
        fontWeight: '600'
    },
    // Visit Tracking Step Styles
    visitTrackingContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    visitTrackingGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    visitTrackingCard: {
        background: '#fefcbf',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #f6e05e',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    visitTrackingCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    visitTrackingCardIcon: {
        fontSize: '24px'
    },
    visitTrackingCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#975a16',
        fontWeight: '600'
    },
    visitTrackingList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    visitTrackingFlow: {
        background: '#fefcbf',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #f6e05e'
    },
    visitTrackingFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#975a16',
        fontWeight: '600'
    },
    // Appointment Step Styles
    appointmentContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    appointmentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    appointmentCard: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    appointmentCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    appointmentCardIcon: {
        fontSize: '24px'
    },
    appointmentCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#276749',
        fontWeight: '600'
    },
    appointmentList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    appointmentFlow: {
        background: '#ebf8ff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #bee3f8'
    },
    appointmentFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    // Reports Step Styles
    reportsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    reportsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    reportsCard: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    reportsCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    reportsCardIcon: {
        fontSize: '24px'
    },
    reportsCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#276749',
        fontWeight: '600'
    },
    reportsList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    // Administrative Modules Step Styles
    adminModulesContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    adminModulesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    adminModuleCard: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    adminModuleCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    adminModuleCardIcon: {
        fontSize: '24px'
    },
    adminModuleCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#276749',
        fontWeight: '600'
    },
    adminModuleList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    adminModulesFlow: {
        background: '#ebf8ff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #bee3f8'
    },
    adminModulesFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    // User Management Step Styles
    userManagementContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    userManagementGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    userManagementCard: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    userManagementCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    userManagementCardIcon: {
        fontSize: '24px'
    },
    userManagementCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#276749',
        fontWeight: '600'
    },
    userManagementList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    userManagementFlow: {
        background: '#ebf8ff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #bee3f8'
    },
    userManagementFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    // Health Insurance Step Styles
    healthInsuranceContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    healthInsuranceGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    healthInsuranceCard: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    healthInsuranceCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    healthInsuranceCardIcon: {
        fontSize: '24px'
    },
    healthInsuranceCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#276749',
        fontWeight: '600'
    },
    healthInsuranceList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    healthInsuranceFlow: {
        background: '#ebf8ff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #bee3f8'
    },
    healthInsuranceFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    // Clinic Payment Report Step Styles
    clinicPaymentReportContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    clinicPaymentReportGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    clinicPaymentReportCard: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    clinicPaymentReportCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    clinicPaymentReportCardIcon: {
        fontSize: '24px'
    },
    clinicPaymentReportCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#276749',
        fontWeight: '600'
    },
    clinicPaymentReportList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    clinicPaymentReportFlow: {
        background: '#ebf8ff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #bee3f8'
    },
    clinicPaymentReportFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    // Reports Dashboard Step Styles
    reportsDashboardContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    reportsDashboardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px'
    },
    reportsDashboardCard: {
        background: '#f0fff4',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #c6f6d5',
        transition: 'all 0.2s',
        cursor: 'default'
    },
    reportsDashboardCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    reportsDashboardCardIcon: {
        fontSize: '24px'
    },
    reportsDashboardCardTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#276749',
        fontWeight: '600'
    },
    reportsDashboardList: {
        margin: 0,
        padding: '0 0 0 20px',
        fontSize: '13px',
        color: '#4a5568'
    },
    reportsDashboardFlow: {
        background: '#ebf8ff',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #bee3f8'
    },
    reportsDashboardFlowTitle: {
        margin: '0 0 12px 0',
        fontSize: '14px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    // Details and Actions Styles
    detailsContainer: {
        backgroundColor: '#ebf8ff',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px'
    },
    detailsTitle: {
        margin: '0 0 8px 0',
        fontSize: '14px',
        color: '#2b6cb0',
        fontWeight: '600'
    },
    actionsContainer: {
        backgroundColor: '#f0fff4',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '20px'
    },
    actionsTitle: {
        margin: '0 0 8px 0',
        fontSize: '14px',
        color: '#276749',
        fontWeight: '600'
    },
    list: {
        margin: 0,
        padding: '0 0 0 20px'
    },
    listItem: {
        fontSize: '14px',
        color: '#4a5568',
        lineHeight: '1.6',
        marginBottom: '4px'
    },
    footer: {
        padding: '16px 24px',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px'
    },
    button: {
        padding: '10px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'all 0.2s',
        border: 'none'
    },
    primaryButton: {
        backgroundColor: '#9f7aea',
        color: 'white',
        flex: 1
    },
    secondaryButton: {
        backgroundColor: '#e2e8f0',
        color: '#4a5568'
    }
};

export default PatientLifeCycleGuide;