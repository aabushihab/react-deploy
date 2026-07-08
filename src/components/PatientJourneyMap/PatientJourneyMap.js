import React, { useState, useEffect } from 'react';
import PatientJourneyMap from './PatientJourneyMap';

const PatientLifeCycleGuide = ({ isOpen, onClose, locale = 'en', onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [showJourneyMap, setShowJourneyMap] = useState(false);

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen) {
      setCurrentStep(0);
      setShowJourneyMap(false);
    }
  }, [isOpen]);

  // Handle step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  // Translations for the patient lifecycle
  const getTranslations = (language) => {
    const translations = {
      en: {
        title: '🔄 Patient Life Cycle Guide',
        subtitle: 'Learn how to manage patients from registration to discharge',
        steps: [
          {
            id: 'search',
            title: '🔍 Step 1: Search for Patient',
            reason: 'Find existing patients in the system',
            content: 'Use the search bar to find patients by name or mobile number. This is your entry point to access all patient records.',
            features: [
              'Search by Name - Find patients using their full name',
              'Search by Mobile - Find patients using their phone number',
              'Filter by Patient Type - TEMP (temporary) or PERMANENT',
              'View patient statistics and quick access to their records'
            ],
            icon: '🔍',
            screen: 'SearchPatientScreen'
          },
          {
            id: 'select',
            title: '👤 Step 2: Select a Patient',
            reason: 'Access patient details and medical history',
            content: 'Click on any patient from the search results to select them. The selected patient bar will appear with all available actions.',
            features: [
              'View patient information - ID, name, phone, address',
              'Check patient type - Temporary or Permanent',
              'Access patient details panel with full information',
              'Toggle between Table and Card view modes'
            ],
            icon: '👤',
            screen: 'SearchPatientScreen'
          },
          {
            id: 'view_details',
            title: '📋 Step 3: View Patient Details',
            reason: 'Review complete patient medical history and information',
            content: 'Click the expand button (▼) to view all patient details including medical history, previous visits, and personal information.',
            features: [
              'Full patient profile with all contact information',
              'Medical history and previous visit records',
              'Age calculation and date of birth',
              'Gender and address information'
            ],
            icon: '📋',
            screen: 'SearchPatientScreen'
          },
          {
            id: 'walk_in',
            title: '🚶 Step 4: Walk-in Visit',
            reason: 'Register a patient for an immediate visit without an appointment',
            content: 'Click the "Walk-in" button to start a new visit for the patient. This creates a new visit record and initiates the consultation process.',
            features: [
              'Create a new visit record instantly',
              'No appointment needed - immediate service',
              'Patient checked in automatically',
              'Visit status set to "IN_PROGRESS"'
            ],
            icon: '🚶',
            screen: 'WalkInScreen'
          },
          {
            id: 'appointments',
            title: '📅 Step 5: Schedule Appointments',
            reason: 'Plan future visits and consultations for the patient',
            content: 'Click "Appointments" to schedule future visits. Manage appointment times, dates, and track scheduled consultations.',
            features: [
              'Schedule future appointments',
              'Choose date and time for visit',
              'Select doctor and room availability',
              'Track all scheduled appointments'
            ],
            icon: '📅',
            screen: 'AppointmentModal'
          },
          {
            id: 'update',
            title: '✏️ Step 6: Update Patient Information',
            reason: 'Keep patient records accurate and up-to-date',
            content: 'Click "Update Patient" to edit patient information. Maintain accurate records by updating contact details, medical history, and personal information.',
            features: [
              'Edit patient contact information',
              'Update medical history',
              'Modify personal details',
              'Maintain accurate patient records'
            ],
            icon: '✏️',
            screen: 'UpdatePatientModal'
          },
          {
            id: 'upgrade',
            title: '⬆️ Step 7: Upgrade to Permanent Patient',
            reason: 'Convert temporary patients to permanent status for long-term care',
            content: 'For TEMP patients, click "Upgrade to Permanent" to convert them to permanent status. This gives them full access to all healthcare services.',
            features: [
              'Convert temporary to permanent status',
              'Full access to all healthcare services',
              'Improved patient tracking and history',
              'Better long-term care management'
            ],
            icon: '⬆️',
            screen: 'UpgradePatientModal'
          },
          {
            id: 'report',
            title: '🖨️ Step 8: Generate Patient Report',
            reason: 'Create comprehensive patient history reports for medical records',
            content: 'Click "Print Report" to generate a detailed PDF report containing all patient visits, prescriptions, and procedures.',
            features: [
              'Complete visit history with dates and doctors',
              'Prescribed drugs with dosage and instructions',
              'Medical procedures performed',
              'Clinic branding and professional formatting'
            ],
            icon: '🖨️',
            screen: 'SearchPatientScreen'
          },
          {
            id: 'availability',
            title: '🔔 Step 9: Check Doctor/Room Availability',
            reason: 'Verify doctor and room availability before scheduling appointments',
            content: 'Click "Availability" to check which doctors and rooms are available on a specific date. This helps with efficient appointment scheduling.',
            features: [
              'Check doctor availability for specific dates',
              'Verify room availability',
              'View available time slots',
              'Efficient appointment scheduling'
            ],
            icon: '🔔',
            screen: 'AvailabilityModal'
          },
          {
            id: 'admin',
            title: '📊 Step 10: Manage All Appointments',
            reason: 'View and manage all patient appointments across the system',
            content: 'Click "Manage All Appointments" to see a comprehensive view of all scheduled appointments and their statuses.',
            features: [
              'View all appointments system-wide',
              'Track appointment statuses',
              'Manage scheduling conflicts',
              'Monitor overall appointment flow'
            ],
            icon: '📊',
            screen: 'AppointmentsAdminScreen'
          },
          {
            id: 'complete',
            title: '🎉 Step 11: Patient Care Complete!',
            reason: 'You have successfully managed the patient through their healthcare journey',
            content: 'You have completed the full patient lifecycle! From search to report generation, you now have all the tools to provide excellent patient care.',
            features: [
              'Search and find patients',
              'View and update patient information',
              'Schedule appointments and walk-ins',
              'Generate professional reports',
              'Check availability for efficient scheduling'
            ],
            icon: '🎉',
            screen: 'Complete'
          }
        ],
        buttons: {
          next: 'Next →',
          previous: '← Previous',
          close: 'Close Guide',
          skip: 'Skip Tutorial',
          viewJourney: '🗺️ View Journey Map'
        }
      },
      ar: {
        title: '🔄 دليل دورة حياة المريض',
        subtitle: 'تعلم كيفية إدارة المرضى من التسجيل إلى الخروج',
        steps: [
          {
            id: 'search',
            title: '🔍 الخطوة 1: البحث عن مريض',
            reason: 'ابحث عن المرضى الموجودين في النظام',
            content: 'استخدم شريط البحث للعثور على المرضى بالاسم أو رقم الهاتف. هذه هي نقطة الدخول للوصول إلى جميع سجلات المرضى.',
            features: [
              'البحث بالاسم - ابحث عن المرضى باستخدام الاسم الكامل',
              'البحث برقم الهاتف - ابحث عن المرضى باستخدام رقم الهاتف',
              'تصفية حسب نوع المريض - مؤقت أو دائم',
              'عرض إحصائيات المرضى والوصول السريع إلى سجلاتهم'
            ],
            icon: '🔍',
            screen: 'SearchPatientScreen'
          },
          {
            id: 'select',
            title: '👤 الخطوة 2: اختيار مريض',
            reason: 'الوصول إلى تفاصيل المريض والتاريخ الطبي',
            content: 'انقر على أي مريض من نتائج البحث لتحديده. سيظهر شريط المريض المحدد مع جميع الإجراءات المتاحة.',
            features: [
              'عرض معلومات المريض - المعرف، الاسم، الهاتف، العنوان',
              'التحقق من نوع المريض - مؤقت أو دائم',
              'الوصول إلى لوحة تفاصيل المريض مع المعلومات الكاملة',
              'التبديل بين وضعي عرض الجدول والبطاقات'
            ],
            icon: '👤',
            screen: 'SearchPatientScreen'
          },
          {
            id: 'view_details',
            title: '📋 الخطوة 3: عرض تفاصيل المريض',
            reason: 'مراجعة التاريخ الطبي الكامل للمريض والمعلومات',
            content: 'انقر على زر التوسيع (▼) لعرض جميع تفاصيل المريض بما في ذلك التاريخ الطبي والزيارات السابقة والمعلومات الشخصية.',
            features: [
              'ملف تعريف كامل للمريض مع جميع معلومات الاتصال',
              'التاريخ الطبي وسجلات الزيارات السابقة',
              'حساب العمر وتاريخ الميلاد',
              'معلومات الجنس والعنوان'
            ],
            icon: '📋',
            screen: 'SearchPatientScreen'
          },
          {
            id: 'walk_in',
            title: '🚶 الخطوة 4: زيارة مباشرة',
            reason: 'تسجيل مريض لزيارة فورية دون موعد',
            content: 'انقر على زر "زيارة مباشرة" لبدء زيارة جديدة للمريض. هذا ينشئ سجل زيارة جديد ويبدأ عملية الاستشارة.',
            features: [
              'إنشاء سجل زيارة جديد فوراً',
              'لا حاجة لموعد - خدمة فورية',
              'تسجيل دخول المريض تلقائياً',
              'حالة الزيارة مضبوطة على "قيد التنفيذ"'
            ],
            icon: '🚶',
            screen: 'WalkInScreen'
          },
          {
            id: 'appointments',
            title: '📅 الخطوة 5: جدولة المواعيد',
            reason: 'تخطيط الزيارات والاستشارات المستقبلية للمريض',
            content: 'انقر على "المواعيد" لجدولة الزيارات المستقبلية. إدارة أوقات المواعيد والتواريخ وتتبع الاستشارات المجدولة.',
            features: [
              'جدولة المواعيد المستقبلية',
              'اختيار التاريخ والوقت للزيارة',
              'تحديد الطبيب وتوفر الغرفة',
              'تتبع جميع المواعيد المجدولة'
            ],
            icon: '📅',
            screen: 'AppointmentModal'
          },
          {
            id: 'update',
            title: '✏️ الخطوة 6: تحديث معلومات المريض',
            reason: 'الحفاظ على دقة وحداثة سجلات المرضى',
            content: 'انقر على "تحديث المريض" لتعديل معلومات المريض. حافظ على دقة السجلات بتحديث تفاصيل الاتصال والتاريخ الطبي والمعلومات الشخصية.',
            features: [
              'تعديل معلومات الاتصال للمريض',
              'تحديث التاريخ الطبي',
              'تعديل التفاصيل الشخصية',
              'الحفاظ على دقة سجلات المرضى'
            ],
            icon: '✏️',
            screen: 'UpdatePatientModal'
          },
          {
            id: 'upgrade',
            title: '⬆️ الخطوة 7: ترقية إلى مريض دائم',
            reason: 'تحويل المرضى المؤقتين إلى حالة دائمة للرعاية طويلة الأجل',
            content: 'للمرضى المؤقتين، انقر على "ترقية إلى دائم" لتحويلهم إلى حالة دائمة. هذا يمنحهم الوصول الكامل إلى جميع خدمات الرعاية الصحية.',
            features: [
              'تحويل من مؤقت إلى دائم',
              'الوصول الكامل إلى جميع خدمات الرعاية الصحية',
              'تحسين تتبع المرضى والتاريخ',
              'إدارة أفضل للرعاية طويلة الأجل'
            ],
            icon: '⬆️',
            screen: 'UpgradePatientModal'
          },
          {
            id: 'report',
            title: '🖨️ الخطوة 8: إنشاء تقرير المريض',
            reason: 'إنشاء تقارير تاريخ المريض الشاملة للسجلات الطبية',
            content: 'انقر على "طباعة التقرير" لإنشاء تقرير PDF مفصل يحتوي على جميع زيارات المريض والوصفات الطبية والإجراءات.',
            features: [
              'تاريخ زيارات كامل مع التواريخ والأطباء',
              'الأدوية الموصوفة مع الجرعة والتعليمات',
              'الإجراءات الطبية التي تم إجراؤها',
              'تنسيق احترافي مع علامة العيادة'
            ],
            icon: '🖨️',
            screen: 'SearchPatientScreen'
          },
          {
            id: 'availability',
            title: '🔔 الخطوة 9: التحقق من توفر الطبيب/الغرفة',
            reason: 'التحقق من توفر الأطباء والغرف قبل جدولة المواعيد',
            content: 'انقر على "التوفر" للتحقق من الأطباء والغرف المتاحة في تاريخ محدد. هذا يساعد في جدولة المواعيد بكفاءة.',
            features: [
              'التحقق من توفر الأطباء لتواريخ محددة',
              'التحقق من توفر الغرف',
              'عرض فترات الوقت المتاحة',
              'جدولة مواعيد فعالة'
            ],
            icon: '🔔',
            screen: 'AvailabilityModal'
          },
          {
            id: 'admin',
            title: '📊 الخطوة 10: إدارة جميع المواعيد',
            reason: 'عرض وإدارة جميع مواعيد المرضى عبر النظام',
            content: 'انقر على "إدارة جميع المواعيد" لرؤية نظرة شاملة لجميع المواعيد المجدولة وحالاتها.',
            features: [
              'عرض جميع المواعيد على مستوى النظام',
              'تتبع حالات المواعيد',
              'إدارة تعارضات الجدولة',
              'مراقبة تدفق المواعيد بشكل عام'
            ],
            icon: '📊',
            screen: 'AppointmentsAdminScreen'
          },
          {
            id: 'complete',
            title: '🎉 الخطوة 11: اكتملت رعاية المريض!',
            reason: 'لقد نجحت في إدارة المريض خلال رحلته في الرعاية الصحية',
            content: 'لقد أكملت دورة حياة المريض الكاملة! من البحث إلى إنشاء التقرير، لديك الآن جميع الأدوات لتقديم رعاية ممتازة للمرضى.',
            features: [
              'البحث عن المرضى والعثور عليهم',
              'عرض وتحديث معلومات المريض',
              'جدولة المواعيد والزيارات المباشرة',
              'إنشاء تقارير احترافية',
              'التحقق من التوفر للجدولة الفعالة'
            ],
            icon: '🎉',
            screen: 'Complete'
          }
        ],
        buttons: {
          next: 'التالي →',
          previous: '← السابق',
          close: 'إغلاق الدليل',
          skip: 'تخطي البرنامج التعليمي',
          viewJourney: '🗺️ عرض خريطة الرحلة'
        }
      }
    };
    
    return translations[language] || translations.en;
  };

  const t = getTranslations(locale);
  const totalSteps = t.steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
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

  const handleSkip = () => {
    onClose();
  };

  const handleDotClick = (index) => {
    setCurrentStep(index);
  };

  const handleJourneyStepClick = (index) => {
    setCurrentStep(index);
    setShowJourneyMap(false);
  };

  const toggleJourneyMap = () => {
    setShowJourneyMap(!showJourneyMap);
  };

  if (!isVisible) return null;

  const currentStepData = t.steps[currentStep];

  return (
    <div style={styles.overlay} onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>{t.title}</h2>
            <p style={styles.subtitle}>{t.subtitle}</p>
          </div>
          <button 
            onClick={onClose} 
            style={styles.closeButton}
            aria-label="Close guide"
          >
            ✕
          </button>
        </div>

        {/* Toggle Journey Map Button */}
        <div style={styles.toggleContainer}>
          <button 
            onClick={toggleJourneyMap}
            style={{
              ...styles.journeyToggle,
              backgroundColor: showJourneyMap ? '#4299e1' : '#edf2f7',
              color: showJourneyMap ? 'white' : '#4a5568',
            }}
          >
            {showJourneyMap ? '📋 Back to Guide' : t.buttons.viewJourney}
          </button>
        </div>

        {/* Content Area */}
        {showJourneyMap ? (
          <div style={styles.journeyContainer}>
            <PatientJourneyMap 
              currentStep={currentStep}
              locale={locale}
              onStepClick={handleJourneyStepClick}
            />
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div style={styles.progressContainer}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${((currentStep + 1) / totalSteps) * 100}%`
                  }}
                />
              </div>
              <span style={styles.progressText}>
                {currentStep + 1} / {totalSteps}
              </span>
            </div>

            {/* Step Content */}
            <div style={styles.content}>
              {/* Step Header */}
              <div style={styles.stepHeader}>
                <div style={styles.stepIcon}>{currentStepData.icon}</div>
                <div style={styles.stepTitleContainer}>
                  <h3 style={styles.stepTitle}>{currentStepData.title}</h3>
                  <div style={styles.stepReason}>
                    <span style={styles.reasonLabel}>🎯 Reason:</span>
                    <span style={styles.reasonText}>{currentStepData.reason}</span>
                  </div>
                </div>
              </div>

              {/* Step Description */}
              <div style={styles.stepDescription}>
                <p>{currentStepData.content}</p>
              </div>

              {/* Features List */}
              <div style={styles.featuresContainer}>
                <h4 style={styles.featuresTitle}>✨ Key Features:</h4>
                <ul style={styles.featuresList}>
                  {currentStepData.features.map((feature, index) => (
                    <li key={index} style={styles.featureItem}>
                      <span style={styles.featureBullet}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Screen Indicator */}
              {currentStepData.screen !== 'Complete' && (
                <div style={styles.screenIndicator}>
                  <span style={styles.screenLabel}>📱 Screen:</span>
                  <span style={styles.screenName}>{currentStepData.screen}</span>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div style={styles.footer}>
              <button 
                onClick={handleSkip} 
                style={styles.skipButton}
              >
                {t.buttons.skip}
              </button>
              
              <div style={styles.navigationButtons}>
                <button 
                  onClick={handlePrevious} 
                  disabled={currentStep === 0}
                  style={{
                    ...styles.navButton,
                    ...(currentStep === 0 ? styles.disabledButton : {})
                  }}
                >
                  {t.buttons.previous}
                </button>
                
                <button 
                  onClick={handleNext} 
                  style={styles.primaryButton}
                >
                  {currentStep === totalSteps - 1 ? '🎉 ' + t.buttons.close : t.buttons.next}
                </button>
              </div>
            </div>

            {/* Dot Navigation */}
            <div style={styles.dotsContainer}>
              {t.steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  style={{
                    ...styles.dot,
                    backgroundColor: index === currentStep ? '#4299e1' : '#e2e8f0',
                  }}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ---------- Styles ----------
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '25px',
    maxWidth: '800px',
    width: '95%',
    maxHeight: '90vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
    animation: 'slideUp 0.3s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    color: '#2d3748',
    fontWeight: 'bold',
  },
  subtitle: {
    margin: '5px 0 0 0',
    fontSize: '14px',
    color: '#718096',
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#a0aec0',
    padding: '5px 10px',
    transition: 'all 0.2s',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '15px',
  },
  journeyToggle: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  journeyContainer: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '15px',
  },
  progressContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  progressBar: {
    flex: 1,
    height: '6px',
    backgroundColor: '#e2e8f0',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4299e1',
    borderRadius: '3px',
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: '12px',
    color: '#718096',
    fontWeight: 'bold',
    minWidth: '40px',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '20px',
    paddingRight: '5px',
  },
  stepHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    marginBottom: '15px',
  },
  stepIcon: {
    fontSize: '32px',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebf8ff',
    borderRadius: '12px',
    flexShrink: 0,
  },
  stepTitleContainer: {
    flex: 1,
  },
  stepTitle: {
    margin: 0,
    fontSize: '18px',
    color: '#2d3748',
    fontWeight: 'bold',
  },
  stepReason: {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
  },
  reasonLabel: {
    fontWeight: 'bold',
    color: '#e53e3e',
  },
  reasonText: {
    color: '#4a5568',
  },
  stepDescription: {
    marginBottom: '15px',
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#4a5568',
    padding: '15px',
    backgroundColor: '#f7fafc',
    borderRadius: '8px',
    borderLeft: '4px solid #4299e1',
  },
  featuresContainer: {
    marginBottom: '15px',
  },
  featuresTitle: {
    margin: '0 0 10px 0',
    fontSize: '14px',
    color: '#2d3748',
    fontWeight: 'bold',
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '6px 0',
    fontSize: '14px',
    color: '#4a5568',
    borderBottom: '1px solid #f7fafc',
  },
  featureBullet: {
    color: '#4299e1',
    fontWeight: 'bold',
  },
  screenIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 15px',
    backgroundColor: '#edf2f7',
    borderRadius: '8px',
    marginTop: '10px',
  },
  screenLabel: {
    fontWeight: 'bold',
    color: '#2d3748',
  },
  screenName: {
    color: '#4299e1',
    fontFamily: 'monospace',
    fontSize: '13px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '15px',
    borderTop: '1px solid #e2e8f0',
  },
  skipButton: {
    background: 'transparent',
    border: 'none',
    color: '#a0aec0',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '8px 16px',
    transition: 'all 0.2s',
  },
  navigationButtons: {
    display: 'flex',
    gap: '10px',
  },
  navButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    color: '#4a5568',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  primaryButton: {
    padding: '10px 24px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4299e1',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    paddingTop: '15px',
    marginTop: '15px',
    borderTop: '1px solid #f7fafc',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.2s',
  },
};

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  @media (max-width: 768px) {
    .step-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .step-reason {
      justify-content: center;
    }
    .screen-indicator {
      flex-direction: column;
      text-align: center;
    }
    .footer {
      flex-direction: column;
      gap: 10px;
    }
    .navigation-buttons {
      width: 100%;
      justify-content: center;
    }
  }
`;
document.head.appendChild(styleSheet);

export default PatientLifeCycleGuide;