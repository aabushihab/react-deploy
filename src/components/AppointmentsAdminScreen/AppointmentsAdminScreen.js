import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Translations (unchanged) ----------
const translations = {
  en: {
    title: 'Manage Appointments',
    stats: { total: 'Total Appointments' },
    table: {
      patient: 'Patient',
      doctor: 'Doctor',
      time: 'Time',
      room: 'Room',
      section: 'Section',
      reassign: 'Reassign',
      actions: 'Actions',
    },
    btn: {
      table: 'Table',
      cards: 'Cards',
      refresh: 'Refresh',
      export: 'Export',
      edit: 'Edit',
      delete: 'Delete',
      reassign: 'Reassign',
      save: 'Save',
      cancel: 'Cancel',
      yes: 'Yes',
      no: 'No',
      search: 'Search',
      close: 'Close',
    },
    dialog: {
      updateTitle: 'Update Appointment',
      updateHeader: 'Appointment ID',
      notes: 'Notes',
      reassign: {
        title: 'Reassign Appointment',
        info: 'Appointment',
      },
      delete: {
        title: 'Delete Appointment',
        content: 'Are you sure you want to delete this appointment?',
      },
    },
    label: {
      patient: 'Patient',
      doctor: 'Doctor',
      time: 'Time',
      currentDoctor: 'Current Doctor',
      newDoctor: 'New Doctor',
      selectDoctor: 'Select Doctor',
      noNotes: 'No notes',
      showing: 'Showing',
      records: 'records',
      noAppointments: 'No appointments found',
    },
    status: {
      ready: 'Ready',
      loading: 'Loading...',
      refreshing: 'Refreshing...',
      updated: 'Appointment updated',
      deleted: 'Appointment deleted',
      reassigned: 'Appointment reassigned',
      exported: 'Exported',
      searching: 'Searching',
      error: 'Error',
    },
    alert: {
      selectDate: 'Please select a date',
      deleteConfirm: 'Delete this appointment?',
      exportSuccess: 'Exported successfully',
      exportError: 'Export failed',
      errorLoad: 'Failed to load appointments',
      errorUpdate: 'Failed to update appointment',
      errorDelete: 'Failed to delete appointment',
      errorReassign: 'Failed to reassign appointment',
      errorLoadingDoctors: 'Failed to load doctors',
      info: 'Information',
    },
    quickSearch: {
      title: 'Quick Search',
      hint: 'Select a date and click Search',
      searchBtn: 'Search',
    },
    selectDate: 'Select Date',
    confirmDelete: {
      title: 'Confirm Delete',
      content: 'Are you sure?',
    },
  },
  ar: {
    title: 'إدارة المواعيد',
    stats: { total: 'إجمالي المواعيد' },
    table: {
      patient: 'المريض',
      doctor: 'الطبيب',
      time: 'الوقت',
      room: 'الغرفة',
      section: 'القسم',
      reassign: 'إعادة تعيين',
      actions: 'إجراءات',
    },
    btn: {
      table: 'جدول',
      cards: 'بطاقات',
      refresh: 'تحديث',
      export: 'تصدير',
      edit: 'تعديل',
      delete: 'حذف',
      reassign: 'إعادة تعيين',
      save: 'حفظ',
      cancel: 'إلغاء',
      yes: 'نعم',
      no: 'لا',
      search: 'بحث',
      close: 'إغلاق',
    },
    dialog: {
      updateTitle: 'تحديث الموعد',
      updateHeader: 'رقم الموعد',
      notes: 'ملاحظات',
      reassign: {
        title: 'إعادة تعيين الموعد',
        info: 'الموعد',
      },
      delete: {
        title: 'حذف الموعد',
        content: 'هل أنت متأكد من حذف هذا الموعد؟',
      },
    },
    label: {
      patient: 'المريض',
      doctor: 'الطبيب',
      time: 'الوقت',
      currentDoctor: 'الطبيب الحالي',
      newDoctor: 'الطبيب الجديد',
      selectDoctor: 'اختر طبيباً',
      noNotes: 'لا توجد ملاحظات',
      showing: 'عرض',
      records: 'سجلات',
      noAppointments: 'لا توجد مواعيد',
    },
    status: {
      ready: 'جاهز',
      loading: 'جاري التحميل...',
      refreshing: 'جاري التحديث...',
      updated: 'تم تحديث الموعد',
      deleted: 'تم حذف الموعد',
      reassigned: 'تم إعادة تعيين الموعد',
      exported: 'تم التصدير',
      searching: 'جاري البحث',
      error: 'خطأ',
    },
    alert: {
      selectDate: 'يرجى اختيار تاريخ',
      deleteConfirm: 'حذف هذا الموعد؟',
      exportSuccess: 'تم التصدير بنجاح',
      exportError: 'فشل التصدير',
      errorLoad: 'فشل تحميل المواعيد',
      errorUpdate: 'فشل تحديث الموعد',
      errorDelete: 'فشل حذف الموعد',
      errorReassign: 'فشل إعادة تعيين الموعد',
      errorLoadingDoctors: 'فشل تحميل الأطباء',
      info: 'معلومات',
    },
    quickSearch: {
      title: 'بحث سريع',
      hint: 'اختر تاريخاً واضغط بحث',
      searchBtn: 'بحث',
    },
    selectDate: 'اختر التاريخ',
    confirmDelete: {
      title: 'تأكيد الحذف',
      content: 'هل أنت متأكد؟',
    },
  },
};

// ---------- API endpoints ----------
const API_APPOINTMENTS = `${BASE_URL}/api/appointments`;
const API_DOCTORS = `${BASE_URL}/api/doctors`;
const API_LOG = `${BASE_URL}/api/logs/add`;

// ---------- Helper: format date/time ----------
const formatDateTime = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleString('en-GB', { hour12: false });
};

// ---------- Main Component ----------
const AppointmentsAdminScreen = ({ 
  refreshCallback, 
  loggedUser, 
  lang = 'en', 
  onClose,
  embedded = false   // 👈 new prop – if true, render as page (not modal)
}) => {
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';

  // ---------- State ----------
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [appointments, setAppointments] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(`✅ ${t.status.ready}`);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [newDoctorId, setNewDoctorId] = useState('');
  const [updatedNotes, setUpdatedNotes] = useState('');
  const [quickDate, setQuickDate] = useState(selectedDate);

  // ---------- Fetch appointments by date ----------
  const fetchAppointments = useCallback(async (date) => {
    if (!date) {
      setStatusMsg(`⚠️ ${t.alert.selectDate}`);
      return;
    }
    setLoading(true);
    setStatusMsg(`⏳ ${t.status.loading}`);
    try {
      const res = await fetch(`${API_APPOINTMENTS}/date/${date}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAppointments(data);
      setTotalAppointments(data.length);
      setStatusMsg(`✅ ${t.status.ready} (${data.length} ${t.label.records})`);
    } catch (err) {
      setStatusMsg(`❌ ${t.status.error}: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [t]);

  // ---------- Fetch doctors for reassign ----------
  const fetchDoctors = useCallback(async () => {
    try {
      const res = await fetch(API_DOCTORS);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      alert(t.alert.errorLoadingDoctors);
    }
  }, [t]);

  // ---------- Load initial data ----------
  useEffect(() => {
    fetchAppointments(selectedDate);
    fetchDoctors();
  }, [fetchAppointments, fetchDoctors, selectedDate]);

  // ---------- Log action ----------
  const logAction = useCallback(async (action, details) => {
    try {
      await fetch(API_LOG, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedUser, action, details }),
      });
    } catch (e) { /* ignore */ }
  }, [loggedUser]);

  // ---------- ESC key to close (only in modal mode) ----------
  useEffect(() => {
    if (!embedded) {
      const handleEsc = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [embedded, onClose]);

  // ---------- Handlers ----------
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchAppointments(date);
  };

  const handleQuickSearch = () => {
    if (!quickDate) {
      setStatusMsg(`⚠️ ${t.alert.selectDate}`);
      return;
    }
    setSelectedDate(quickDate);
    fetchAppointments(quickDate);
    logAction('SEARCH_APPOINTMENTS', `Searched appointments for date: ${quickDate}`);
    setStatusMsg(`🔍 ${t.status.searching} ${quickDate}`);
  };

  const handleUpdate = (appointment) => {
    setSelectedAppointment(appointment);
    setUpdatedNotes(appointment.notes || '');
    setShowUpdateDialog(true);
  };

  const handleDelete = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDeleteDialog(true);
  };

  const handleReassign = (appointment) => {
    setSelectedAppointment(appointment);
    setNewDoctorId('');
    setShowReassignDialog(true);
  };

  // ---------- API calls ----------
  const updateAppointment = async () => {
    if (!selectedAppointment) return;
    try {
      const res = await fetch(`${API_APPOINTMENTS}/${selectedAppointment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: updatedNotes,
        }),
      });
      if (!res.ok) throw new Error();
      setStatusMsg(`✅ ${t.status.updated}`);
      logAction('UPDATE_APPOINTMENT', `Updated appointment ID: ${selectedAppointment.id}`);
      fetchAppointments(selectedDate);
      setShowUpdateDialog(false);
    } catch (err) {
      alert(t.alert.errorUpdate);
    }
  };

  const deleteAppointment = async () => {
    if (!selectedAppointment) return;
    try {
      const res = await fetch(`${API_APPOINTMENTS}/${selectedAppointment.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error();
      setStatusMsg(`✅ ${t.status.deleted}`);
      logAction('DELETE_APPOINTMENT', `Deleted appointment ID: ${selectedAppointment.id}`);
      fetchAppointments(selectedDate);
      setShowDeleteDialog(false);
    } catch (err) {
      alert(t.alert.errorDelete);
    }
  };

  const reassignAppointment = async () => {
    if (!selectedAppointment || !newDoctorId) return;
    try {
      const res = await fetch(`${API_APPOINTMENTS}/${selectedAppointment.id}/reassign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorId: Number(newDoctorId) }),
      });
      if (!res.ok) throw new Error();
      setStatusMsg(`✅ ${t.status.reassigned}`);
      logAction('REASSIGN_APPOINTMENT', `Reassigned appointment ID: ${selectedAppointment.id} to doctor ${newDoctorId}`);
      fetchAppointments(selectedDate);
      setShowReassignDialog(false);
    } catch (err) {
      alert(t.alert.errorReassign);
    }
  };

  const exportCSV = () => {
    if (appointments.length === 0) {
      setStatusMsg(`⚠️ ${t.alert.noDataToExport || 'No data to export'}`);
      return;
    }
    const headers = ['Patient', 'Doctor', 'Time', 'Room', 'Section', 'Notes'];
    const rows = appointments.map(a => [
      a.patient?.fullName || a.patientName || '',
      a.doctor?.fullName || a.doctorName || '',
      formatDateTime(a.appointmentTime),
      a.room?.roomNumber || '',
      a.room?.section?.name || '',
      a.notes || '',
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments_${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMsg(`📥 ${t.status.exported}`);
  };

  // ---------- Render ----------
  // Determine container style based on embedded mode
  const containerStyle = embedded ? embeddedContainer : fullScreenContainer;
  const contentStyle = embedded ? embeddedContent : fullScreenContent;

  return (
    <div style={containerStyle} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Close button – different for embedded vs modal */}
      {embedded ? (
        // Embedded mode: close button inside header (like SearchPatientScreen)
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <button onClick={onClose} style={secondaryBtn}>✕ {t.btn.close}</button>
        </div>
      ) : (
        // Modal mode: floating fixed close button
        <button
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 10,
            right: isRTL ? 'auto' : 10,
            left: isRTL ? 10 : 'auto',
            zIndex: 10001,
            background: '#e2e8f0',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          ✕
        </button>
      )}

      <div style={contentStyle}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 18 }}>📅 {t.title}</h2>
          {!embedded && (
            <button onClick={onClose} style={{ ...secondaryBtn, padding: '4px 12px', fontSize: 13 }}>
              ✕ {t.btn.close}
            </button>
          )}
        </div>

        {/* Stats Card */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <StatCard icon="📊" label={t.stats.total} value={totalAppointments} color="#4299e1" compact />
        </div>

        {/* Search & Tools */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <label style={{ fontSize: 13 }}>📅</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ ...inputStyle, padding: '4px 8px', fontSize: 12 }}
            />
          </div>
          <button onClick={() => setViewMode('table')} style={viewMode === 'table' ? activeToggle : toggleBtn}>
            📋 {t.btn.table}
          </button>
          <button onClick={() => setViewMode('card')} style={viewMode === 'card' ? activeToggle : toggleBtn}>
            🃏 {t.btn.cards}
          </button>
          <button onClick={() => fetchAppointments(selectedDate)} style={iconBtn}>🔄</button>
          <button onClick={exportCSV} style={iconBtn}>📥</button>
          <span style={{ marginLeft: 'auto', fontSize: 13, color: '#4a5568' }}>{statusMsg}</span>
        </div>

        {/* Quick Search */}
        <div style={{
          marginBottom: 12,
          padding: '6px 12px',
          background: '#ebf8ff',
          borderRadius: 6,
          border: '1px solid #bee3f8',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
        }}>
          <span style={{ fontWeight: 'bold', color: '#2b6cb0', fontSize: 13 }}>🔍 {t.quickSearch.title}</span>
          <span style={{ fontSize: 12, color: '#4a5568' }}>{t.quickSearch.hint}</span>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <input
              type="date"
              value={quickDate}
              onChange={e => setQuickDate(e.target.value)}
              style={{ ...inputStyle, padding: '4px 8px', fontSize: 12 }}
            />
            <button onClick={handleQuickSearch} style={{ ...primaryBtn('#4299e1'), padding: '4px 12px', fontSize: 12 }}>
              🔍 {t.quickSearch.searchBtn}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ background: 'white', borderRadius: 8, padding: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', minHeight: 300 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 30, fontSize: 14 }}>⏳ {t.status.loading}</div>
          ) : appointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 30, color: '#a0aec0', fontSize: 14 }}>📭 {t.label.noAppointments}</div>
          ) : viewMode === 'table' ? (
            <AppointmentsTable
              appointments={appointments}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onReassign={handleReassign}
              t={t}
              isRTL={isRTL}
              compact
            />
          ) : (
            <AppointmentsCards
              appointments={appointments}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onReassign={handleReassign}
              t={t}
              isRTL={isRTL}
              compact
            />
          )}
        </div>

        {/* ---------- Dialogs (unchanged) ---------- */}
        {showUpdateDialog && selectedAppointment && (
          <div style={modalOverlay}>
            <div style={modalContent}>
              <h3 style={{ margin: 0, fontSize: 16 }}>✏️ {t.dialog.updateTitle}</h3>
              <p style={{ fontSize: 13, color: '#718096' }}>
                {t.dialog.updateHeader} #{selectedAppointment.id}
              </p>
              <div style={{ margin: '10px 0' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4, fontSize: 13 }}>
                  {t.dialog.notes}:
                </label>
                <textarea
                  value={updatedNotes}
                  onChange={e => setUpdatedNotes(e.target.value)}
                  style={{ ...inputStyle, width: '100%', minHeight: 60, fontSize: 13 }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button onClick={() => setShowUpdateDialog(false)} style={secondaryBtn}>
                  {t.btn.cancel}
                </button>
                <button onClick={updateAppointment} style={primaryBtn('#4299e1')}>
                  {t.btn.save}
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteDialog && selectedAppointment && (
          <div style={modalOverlay}>
            <div style={modalContent}>
              <h3 style={{ margin: 0, fontSize: 16 }}>🗑️ {t.confirmDelete.title}</h3>
              <p style={{ fontSize: 13, color: '#4a5568' }}>
                {t.confirmDelete.content}
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                <button onClick={() => setShowDeleteDialog(false)} style={secondaryBtn}>
                  {t.btn.no}
                </button>
                <button onClick={deleteAppointment} style={primaryBtn('#fc8181')}>
                  {t.btn.yes}
                </button>
              </div>
            </div>
          </div>
        )}

        {showReassignDialog && selectedAppointment && (
          <div style={modalOverlay}>
            <div style={modalContent}>
              <h3 style={{ margin: 0, fontSize: 16 }}>🔄 {t.dialog.reassign.title}</h3>
              <p style={{ fontSize: 13, color: '#718096' }}>
                {t.dialog.reassign.info} #{selectedAppointment.id}
              </p>
              <div style={{ margin: '10px 0', fontSize: 13 }}>
                <div><strong>{t.label.patient}:</strong> {selectedAppointment.patient?.fullName || selectedAppointment.patientName || ''}</div>
                <div><strong>{t.label.currentDoctor}:</strong> {selectedAppointment.doctor?.fullName || selectedAppointment.doctorName || ''}</div>
              </div>
              <div style={{ margin: '8px 0' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: 4, fontSize: 13 }}>
                  {t.label.newDoctor}:
                </label>
                <select
                  value={newDoctorId}
                  onChange={e => setNewDoctorId(e.target.value)}
                  style={{ ...inputStyle, width: '100%', fontSize: 13 }}
                >
                  <option value="">{t.label.selectDoctor}</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.id}>
                      {doc.firstName} {doc.middleName} {doc.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button onClick={() => setShowReassignDialog(false)} style={secondaryBtn}>
                  {t.btn.cancel}
                </button>
                <button onClick={reassignAppointment} style={primaryBtn('#ed8936')} disabled={!newDoctorId}>
                  {t.btn.reassign}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Subcomponents with compact styles ----------
const StatCard = ({ icon, label, value, color, compact }) => (
  <div style={{
    background: 'white', borderRadius: 8, padding: compact ? '8px 12px' : '15px 20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)', borderLeft: `4px solid ${color}`,
    flex: 1, minWidth: 100,
  }}>
    <span style={{ fontSize: compact ? 18 : 24 }}>{icon}</span>
    <div style={{ fontSize: compact ? 20 : 24, fontWeight: 'bold', color }}>{value}</div>
    <div style={{ fontSize: compact ? 11 : 12, color: '#718096' }}>{label}</div>
  </div>
);

const AppointmentsTable = ({ appointments, onUpdate, onDelete, onReassign, t, isRTL, compact }) => {
  const columns = isRTL
    ? ['actions', 'reassign', 'section', 'room', 'time', 'doctor', 'patient']
    : ['patient', 'doctor', 'time', 'room', 'section', 'reassign', 'actions'];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: compact ? 13 : 14 }}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col} style={{ padding: compact ? '6px 8px' : 10, background: '#f8f9fa', textAlign: 'left' }}>
              {t.table[col] || col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {appointments.map(a => (
          <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
            {columns.map(col => {
              switch (col) {
                case 'patient':
                  return <td key={col}>{a.patient?.fullName || a.patientName || ''}</td>;
                case 'doctor':
                  return <td key={col}>{a.doctor?.fullName || a.doctorName || ''}</td>;
                case 'time':
                  return <td key={col}>{formatDateTime(a.appointmentTime)}</td>;
                case 'room':
                  return <td key={col}>{a.room?.roomNumber || ''}</td>;
                case 'section':
                  return <td key={col}>{a.room?.section?.name || ''}</td>;
                case 'reassign':
                  return (
                    <td key={col}>
                      <button onClick={() => onReassign(a)} style={{ ...miniBtn('#ed8936'), fontSize: 12 }}>
                        🔄
                      </button>
                    </td>
                  );
                case 'actions':
                  return (
                    <td key={col}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button onClick={() => onUpdate(a)} style={{ ...miniBtn('#4299e1'), fontSize: 12 }}>✏️</button>
                        <button onClick={() => onDelete(a)} style={{ ...miniBtn('#fc8181'), fontSize: 12 }}>🗑️</button>
                      </div>
                    </td>
                  );
                default:
                  return <td key={col}></td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AppointmentsCards = ({ appointments, onUpdate, onDelete, onReassign, t, isRTL, compact }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
    {appointments.map(a => (
      <div key={a.id} style={{
        background: 'white', borderRadius: 8, padding: compact ? 10 : 15,
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
        border: '1px solid #edf2f7',
        direction: isRTL ? 'rtl' : 'ltr',
        fontSize: compact ? 13 : 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontWeight: 'bold' }}>{a.patient?.fullName || a.patientName || ''}</span>
          <span style={{ fontSize: 12, color: '#4a5568' }}>{formatDateTime(a.appointmentTime)}</span>
        </div>
        <div style={{ fontSize: 12, color: '#4a5568' }}>
          👨‍⚕️ {a.doctor?.fullName || a.doctorName || ''} &nbsp;
          🏥 {a.room?.roomNumber || ''} &nbsp;
          📋 {a.room?.section?.name || ''}
        </div>
        <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <button onClick={() => onReassign(a)} style={{ ...miniBtn('#ed8936'), fontSize: 11 }}>🔄 {t.btn.reassign}</button>
          <button onClick={() => onUpdate(a)} style={{ ...miniBtn('#4299e1'), fontSize: 11 }}>✏️ {t.btn.edit}</button>
          <button onClick={() => onDelete(a)} style={{ ...miniBtn('#fc8181'), fontSize: 11 }}>🗑️ {t.btn.delete}</button>
        </div>
      </div>
    ))}
  </div>
);

// ---------- Style utilities (compacted) ----------
const primaryBtn = (bg) => ({
  background: bg, color: 'white', fontWeight: 'bold', border: 'none',
  borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: 13,
});

const secondaryBtn = {
  background: '#e2e8f0', border: 'none', padding: '6px 14px',
  borderRadius: 6, cursor: 'pointer', fontSize: 13,
};

const iconBtn = {
  background: 'transparent', border: '1px solid #ccc', borderRadius: 6,
  padding: '4px 8px', cursor: 'pointer', fontSize: 14,
};

const toggleBtn = {
  background: '#edf2f7', border: '1px solid #e2e8f0', borderRadius: 6,
  padding: '4px 10px', cursor: 'pointer', fontSize: 13,
};

const activeToggle = { ...toggleBtn, background: '#4299e1', color: 'white', fontWeight: 'bold' };

const miniBtn = (bg) => ({
  background: bg, color: 'white', border: 'none', borderRadius: 4,
  padding: '2px 8px', cursor: 'pointer', fontSize: 12,
});

const inputStyle = { padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', fontSize: 13 };

// Styles for full‑screen (modal) mode
const fullScreenContainer = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#f0f2f5',
  zIndex: 9999,
  overflowY: 'auto',
  padding: 10,
};

const fullScreenContent = {
  maxWidth: 1400,
  margin: '0 auto',
};

// Styles for embedded (page) mode – similar to SearchPatientScreen outer div
const embeddedContainer = {
  padding: '20px',
  fontFamily: "'Noto Sans Arabic', Tahoma, 'Segoe UI', sans-serif",
  background: 'transparent', // the main background is already light
  width: '100%',
  height: '100%',
  overflowY: 'auto',
};

const embeddedContent = {
  maxWidth: 1400,
  margin: '0 auto',
};

// Modal overlay (for dialogs)
const modalOverlay = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
  alignItems: 'center', zIndex: 10000,
};

const modalContent = {
  background: 'white', borderRadius: 10, padding: 16, minWidth: 320,
  maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

export default AppointmentsAdminScreen;