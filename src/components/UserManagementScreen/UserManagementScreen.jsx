import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../../utils/api';

// ---------- Styles ----------
const styles = `
  .user-container {
    padding: 20px;
    background: #f5f7fa;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  /* Header */
  .user-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 25px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  }
  .user-header .title {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
  }
  .user-header .actions {
    display: flex;
    gap: 10px;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }
  .user-header .search-box {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 20px;
    border: 1px solid #dce4ec;
    padding: 5px 15px;
    flex: 1;
    max-width: 300px;
  }
  .user-header .search-box input {
    border: none;
    outline: none;
    padding: 6px 5px;
    font-size: 13px;
    flex: 1;
    background: transparent;
  }
  .user-header .search-box .search-icon {
    font-size: 14px;
    color: #a0aec0;
  }
  .user-header .actions button {
    padding: 8px 18px;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
    color: white;
  }
  .user-header .actions button:hover {
    transform: scale(1.05);
  }
  .user-header .actions button.refresh { background: #3498db; }
  .user-header .actions button.refresh:hover { background: #2980b9; }
  .user-header .status {
    font-size: 12px;
    color: #27ae60;
  }
  .user-header .status.error { color: #e74c3c; }
  .user-header .status.loading { color: #f39c12; }

  /* Content Area */
  .user-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  /* Table */
  .user-table-wrapper {
    overflow-x: auto;
    max-height: 400px;
  }
  .user-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .user-table th {
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
  .user-table td {
    padding: 8px 15px;
    border-bottom: 1px solid #f0f0f0;
  }
  .user-table tr:hover td {
    background: #f8f9fa;
  }
  .user-table tr.disabled {
    opacity: 0.6;
    background: #f5f5f5;
  }
  .user-table .role-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 10px;
    font-weight: bold;
    font-size: 12px;
    color: white;
  }
  .user-table .role-badge.admin { background: #E74C3C; }
  .user-table .role-badge.doctor { background: #3498DB; }
  .user-table .role-badge.assistant { background: #27AE60; }
  .user-table .status-badge {
    font-weight: bold;
    font-size: 12px;
  }
  .user-table .status-badge.active { color: #27ae60; }
  .user-table .status-badge.inactive { color: #e74c3c; }
  .user-table .action-btn {
    padding: 4px 12px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 12px;
    color: white;
    margin-right: 4px;
  }
  .user-table .action-btn:hover {
    transform: scale(1.05);
  }
  .user-table .action-btn.reset { background: #3498db; }
  .user-table .action-btn.reset:hover { background: #2980b9; }
  .user-table .action-btn.enable { background: #2ecc71; }
  .user-table .action-btn.enable:hover { background: #27ae60; }
  .user-table .action-btn.disable { background: #e74c3c; }
  .user-table .action-btn.disable:hover { background: #c0392b; }

  /* Add User Section */
  .user-add-section {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    border: 1px solid #e9ecef;
  }
  .user-add-section .add-title {
    font-size: 16px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
  }
  .user-add-section .add-row {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
  .user-add-section .add-row input {
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #dce4ec;
    font-size: 13px;
    background: white;
    flex: 1;
    min-width: 150px;
  }
  .user-add-section .add-row input:focus {
    outline: none;
    border-color: #3498db;
  }
  .user-add-section .add-row .password-toggle {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    color: #34495e;
  }
  .user-add-section .add-row .password-toggle input[type="checkbox"] {
    cursor: pointer;
  }
  .user-add-section .add-row .strength-label {
    font-size: 11px;
    min-width: 80px;
  }
  .user-add-section .add-row .strength-label.strong { color: #27ae60; }
  .user-add-section .add-row .strength-label.medium { color: #f39c12; }
  .user-add-section .add-row .strength-label.weak { color: #e67e22; }
  .user-add-section .add-row .strength-label.invalid { color: #e74c3c; }
  .user-add-section .add-row button {
    padding: 8px 20px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13px;
    color: white;
    background: #2ecc71;
  }
  .user-add-section .add-row button:hover {
    background: #27ae60;
    transform: scale(1.05);
  }
  .user-add-section .add-row button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Status Bar */
  .user-status-bar {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px 15px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
  }
  .user-status-bar .loading {
    width: 20px;
    height: 20px;
  }
  .user-status-bar .status-msg {
    font-size: 12px;
    color: #27ae60;
  }
  .user-status-bar .status-msg.error { color: #e74c3c; }
  .user-status-bar .status-msg.loading { color: #f39c12; }
  .user-status-bar .spacer { flex: 1; }
  .user-status-bar .time {
    font-size: 11px;
    color: #95a5a6;
  }

  /* Loading */
  .user-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    color: #7f8c8d;
  }

  /* Empty State */
  .user-empty {
    text-align: center;
    padding: 40px;
    color: #a0aec0;
    font-size: 16px;
  }

  /* Modal Overlay */
  .user-modal-overlay {
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
  .user-modal {
    background: white;
    border-radius: 12px;
    padding: 25px;
    max-width: 450px;
    width: 95%;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  }
  .user-modal h3 {
    margin: 0 0 15px 0;
    color: #2d3748;
    font-size: 18px;
  }
  .user-modal .form-group {
    margin-bottom: 15px;
  }
  .user-modal .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #2d3748;
  }
  .user-modal .form-group input {
    width: 100%;
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #dce4ec;
    font-size: 14px;
    background: white;
  }
  .user-modal .form-group input:focus {
    outline: none;
    border-color: #3498db;
  }
  .user-modal .form-group .strength-label {
    font-size: 11px;
    margin-top: 5px;
  }
  .user-modal .form-group .strength-label.strong { color: #27ae60; }
  .user-modal .form-group .strength-label.medium { color: #f39c12; }
  .user-modal .form-group .strength-label.weak { color: #e67e22; }
  .user-modal .form-group .strength-label.invalid { color: #e74c3c; }
  .user-modal .form-group .requirements {
    font-size: 10px;
    color: #7f8c8d;
    margin-top: 5px;
  }
  .user-modal .modal-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .user-modal .modal-actions button {
    padding: 8px 25px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
  }
  .user-modal .modal-actions .btn-primary {
    background: #3498db;
    color: white;
  }
  .user-modal .modal-actions .btn-primary:hover {
    background: #2980b9;
    transform: scale(1.05);
  }
  .user-modal .modal-actions .btn-secondary {
    background: #e2e8f0;
    color: #4a5568;
  }
  .user-modal .modal-actions .btn-secondary:hover {
    background: #cbd5e0;
    transform: scale(1.05);
  }
  .user-modal .modal-actions .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
`;

// ---------- Main Component ----------
const UserManagementScreen = ({ loggedUser, lang = 'en', onClose }) => {
  // ---------- Translations ----------
  const getTranslations = (language) => {
    const translations = {
      en: {
        title: { userManagement: 'User Management' },
        header: { title: '👥 User Management' },
        btn: {
          refresh: 'Refresh',
          addUser: 'Add User',
          reset: 'Reset Password',
          enable: 'Enable',
          disable: 'Disable',
          save: 'Save',
          cancel: 'Cancel'
        },
        prompt: {
          search: 'Search users...',
          username: 'Username',
          password: 'Password'
        },
        label: {
          addUser: 'Add New User',
          showPassword: 'Show password',
          passwordRequirements: 'Password must be at least 6 characters with letters and numbers'
        },
        status: {
          ready: 'Ready',
          loading: 'Loading...',
          loaded: 'Loaded',
          users: 'users',
          error: 'Error loading data',
          totalUsers: 'Total Users',
          active: 'Active',
          inactive: 'Inactive',
          strong: 'Strong password',
          medium: 'Medium password',
          weak: 'Weak password',
          invalid: 'Invalid password'
        },
        table: {
          username: 'Username',
          role: 'Role',
          enabled: 'Status',
          resetPassword: 'Reset Password',
          enableDisable: 'Enable/Disable'
        },
        dialog: {
          resetTitle: 'Reset Password',
          resetHeader: 'Reset password for user: {0}',
          newPassword: 'New Password'
        },
        alert: {
          info: 'Information',
          requiredFields: 'Please fill in all fields',
          invalidUsername: 'Username must start with 3 letters',
          invalidPassword: 'Password must be at least 6 characters with letters and numbers',
          userAdded: 'User added successfully',
          addUserError: 'Failed to add user',
          loadUsersError: 'Failed to load users',
          userToggled: 'User status updated successfully',
          toggleError: 'Failed to update user status',
          passwordReset: 'Password reset successfully',
          resetError: 'Failed to reset password',
          actionFailed: 'Action failed',
          error: 'Error'
        }
      },
      ar: {
        title: { userManagement: 'إدارة المستخدمين' },
        header: { title: '👥 إدارة المستخدمين' },
        btn: {
          refresh: 'تحديث',
          addUser: 'إضافة مستخدم',
          reset: 'إعادة تعيين كلمة المرور',
          enable: 'تفعيل',
          disable: 'تعطيل',
          save: 'حفظ',
          cancel: 'إلغاء'
        },
        prompt: {
          search: 'بحث عن المستخدمين...',
          username: 'اسم المستخدم',
          password: 'كلمة المرور'
        },
        label: {
          addUser: 'إضافة مستخدم جديد',
          showPassword: 'إظهار كلمة المرور',
          passwordRequirements: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل مع حروف وأرقام'
        },
        status: {
          ready: 'جاهز',
          loading: 'جاري التحميل...',
          loaded: 'تم التحميل',
          users: 'مستخدمين',
          error: 'خطأ في تحميل البيانات',
          totalUsers: 'إجمالي المستخدمين',
          active: 'نشط',
          inactive: 'غير نشط',
          strong: 'كلمة مرور قوية',
          medium: 'كلمة مرور متوسطة',
          weak: 'كلمة مرور ضعيفة',
          invalid: 'كلمة مرور غير صالحة'
        },
        table: {
          username: 'اسم المستخدم',
          role: 'الدور',
          enabled: 'الحالة',
          resetPassword: 'إعادة تعيين كلمة المرور',
          enableDisable: 'تفعيل/تعطيل'
        },
        dialog: {
          resetTitle: 'إعادة تعيين كلمة المرور',
          resetHeader: 'إعادة تعيين كلمة المرور للمستخدم: {0}',
          newPassword: 'كلمة المرور الجديدة'
        },
        alert: {
          info: 'معلومات',
          requiredFields: 'يرجى ملء جميع الحقول',
          invalidUsername: 'يجب أن يبدأ اسم المستخدم بـ 3 أحرف',
          invalidPassword: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل مع حروف وأرقام',
          userAdded: 'تم إضافة المستخدم بنجاح',
          addUserError: 'فشل في إضافة المستخدم',
          loadUsersError: 'فشل في تحميل المستخدمين',
          userToggled: 'تم تحديث حالة المستخدم بنجاح',
          toggleError: 'فشل في تحديث حالة المستخدم',
          passwordReset: 'تم إعادة تعيين كلمة المرور بنجاح',
          resetError: 'فشل في إعادة تعيين كلمة المرور',
          actionFailed: 'فشل الإجراء',
          error: 'خطأ'
        }
      }
    };
    return translations[language] || translations.en;
  };

  const t = getTranslations(lang);

  // ---------- State ----------
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: `● ${t.status.ready}`, type: 'success' });

  // Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ text: '', type: '' });

  // Modal states
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetUsername, setResetUsername] = useState('');
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetStrength, setResetStrength] = useState({ text: '', type: '' });

  // ---------- Helper Functions ----------
  const setStatus = useCallback((text, type = 'success') => {
    setStatusMessage({ text: `● ${text}`, type });
  }, []);

  const isValidUsername = (username) => {
    return /^[A-Za-z]{3,}[A-Za-z0-9]*\d{0,3}$/.test(username);
  };

  const isValidPassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@._-]{6,}$/.test(password);
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@._-]/.test(password)) score++;

    if (score >= 5) return 3;
    if (score >= 3) return 2;
    return 1;
  };

  const getStrengthLabel = (password) => {
    if (!password) return { text: '', type: '' };
    if (!isValidPassword(password)) {
      return { text: `✗ ${t.status.invalid}`, type: 'invalid' };
    }
    const strength = getPasswordStrength(password);
    if (strength >= 3) return { text: `✓ ${t.status.strong}`, type: 'strong' };
    if (strength >= 2) return { text: `⚠ ${t.status.medium}`, type: 'medium' };
    return { text: `⚠ ${t.status.weak}`, type: 'weak' };
  };

  // ---------- API Calls ----------
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setStatus(t.status.loading, 'loading');

    try {
      const url = `${BASE_URL}/api/auth/users`;
      //console.log('📤 Fetching users:', url);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const usersData = Array.isArray(data) ? data : [data];
      
      setUsers(usersData);
      setFilteredUsers(usersData);
      
      setStatus(`${t.status.loaded} (${usersData.length} ${t.status.users})`, 'success');
      
    } catch (err) {
      //console.error('🚨 Load error:', err);
      setStatus(t.status.error, 'error');
      alert(t.alert.loadUsersError);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  }, [t]);

  const addUser = useCallback(async (username, password) => {
    try {
      const url = `${BASE_URL}/api/auth/users`;
      //console.log('📤 Adding user:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password: password.trim() })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      setUsername('');
      setPassword('');
      loadUsers();
      alert(t.alert.userAdded);
      setStatus(`✅ ${t.status.ready}`, 'success');
      
    } catch (err) {
      //console.error('🚨 Add user error:', err);
      alert(`${t.alert.addUserError}: ${err.message}`);
    }
  }, [loadUsers, t]);

  const toggleUser = useCallback(async (username) => {
    try {
      const url = `${BASE_URL}/api/auth/users/${username}/toggle`;
      //console.log('📤 Toggling user:', url);
      
      const response = await fetch(url, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      loadUsers();
      alert(t.alert.userToggled);
      
    } catch (err) {
      //console.error('🚨 Toggle error:', err);
      alert(`${t.alert.toggleError}: ${err.message}`);
    }
  }, [loadUsers, t]);

  // FIX: Renamed from resetPassword to handleResetPasswordSubmit to avoid naming conflict
  const handleResetPasswordSubmit = useCallback(async (username, newPassword) => {
    try {
      const url = `${BASE_URL}/api/auth/reset-password`;
      //console.log('📤 Resetting password:', url);
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), newPassword: newPassword.trim() })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      setShowResetModal(false);
      setResetUsername('');
      setResetNewPassword('');
      alert(t.alert.passwordReset);
      setStatus(`✅ ${t.status.ready}`, 'success');
      
    } catch (err) {
      //console.error('🚨 Reset password error:', err);
      alert(`${t.alert.resetError}: ${err.message}`);
    }
  }, [t]);

  // ---------- Log Action ----------
  const logAction = useCallback(async (action, details) => {
    try {
      const url = `${BASE_URL}/api/logs`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedUser, action, details })
      });
    } catch (e) { /* ignore */ }
  }, [loggedUser]);

  // ---------- Handlers ----------
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => {
        return (
          user.username.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
        );
      });
      setFilteredUsers(filtered);
    }
  };

  const handleAddUser = () => {
    const user = username.trim();
    const pass = password.trim();

    if (!user || !pass) {
      alert(t.alert.requiredFields);
      return;
    }

    if (!isValidUsername(user)) {
      alert(t.alert.invalidUsername);
      return;
    }

    if (!isValidPassword(pass)) {
      alert(t.alert.invalidPassword);
      return;
    }

    logAction('ADD_USER', `Added user: ${user}`);
    addUser(user, pass);
  };

  const handleToggleUser = (username) => {
    if (window.confirm(`Are you sure you want to toggle status for user "${username}"?`)) {
      logAction('TOGGLE_USER', `Toggled status for: ${username}`);
      toggleUser(username);
    }
  };

  const handleResetPassword = () => {
    const newPass = resetNewPassword.trim();

    if (!newPass) {
      alert(t.alert.requiredFields);
      return;
    }

    if (!isValidPassword(newPass)) {
      alert(t.alert.invalidPassword);
      return;
    }

    logAction('RESET_PASSWORD', `Reset password for: ${resetUsername}`);
    handleResetPasswordSubmit(resetUsername, newPass);
  };

  const openResetModal = (username) => {
    setResetUsername(username);
    setResetNewPassword('');
    setResetStrength({ text: '', type: '' });
    setShowResetModal(true);
  };

  // ---------- Effects ----------
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      loadUsers();
    }
  }, [loadUsers]);

  // Password strength listener
  useEffect(() => {
    setPasswordStrength(getStrengthLabel(password));
  }, [password, t]);

  useEffect(() => {
    setResetStrength(getStrengthLabel(resetNewPassword));
  }, [resetNewPassword, t]);

  // ---------- Render Components ----------
  const renderTable = () => {
    if (filteredUsers.length === 0) {
      return <div className="user-empty">📭 No users found</div>;
    }

    return (
      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>{t.table.username}</th>
              <th>{t.table.role}</th>
              <th>{t.table.enabled}</th>
              <th>{t.table.resetPassword}</th>
              <th>{t.table.enableDisable}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              const roleClass = user.role?.toLowerCase() === 'admin' ? 'admin' :
                               user.role?.toLowerCase() === 'doctor' ? 'doctor' : 'assistant';
              return (
                <tr key={index} className={user.enabled ? '' : 'disabled'}>
                  <td style={{ fontWeight: 'bold' }}>{user.username}</td>
                  <td>
                    <span className={`role-badge ${roleClass}`}>
                      {user.role || 'ASSISTANT'}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.enabled ? 'active' : 'inactive'}`}>
                      {user.enabled ? `✅ ${t.status.active}` : `❌ ${t.status.inactive}`}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="action-btn reset"
                      onClick={() => openResetModal(user.username)}
                    >
                      🔑 {t.btn.reset}
                    </button>
                  </td>
                  <td>
                    <button 
                      className={`action-btn ${user.enabled ? 'disable' : 'enable'}`}
                      onClick={() => handleToggleUser(user.username)}
                    >
                      {user.enabled ? `🔴 ${t.btn.disable}` : `🟢 ${t.btn.enable}`}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  // ---------- Modals ----------
  const renderResetModal = () => {
    if (!showResetModal) return null;

    const handlePasswordChange = (e) => {
      const value = e.target.value;
      setResetNewPassword(value);
    };

    return (
      <div className="user-modal-overlay">
        <div className="user-modal slide-in">
          <h3>🔑 {t.dialog.resetTitle}</h3>
          
          <div style={{ marginBottom: '15px', color: '#4a5568' }}>
            {t.dialog.resetHeader.replace('{0}', resetUsername)}
          </div>
          
          <div className="form-group">
            <label>{t.dialog.newPassword}</label>
            <input
              type="password"
              value={resetNewPassword}
              onChange={handlePasswordChange}
              placeholder={t.prompt.password}
              autoFocus
            />
            {resetStrength.text && (
              <div className={`strength-label ${resetStrength.type}`}>
                {resetStrength.text}
              </div>
            )}
            <div className="requirements">
              {t.label.passwordRequirements}
            </div>
          </div>
          
          <div className="modal-actions">
            <button 
              className="btn-secondary"
              onClick={() => {
                setShowResetModal(false);
                setResetUsername('');
                setResetNewPassword('');
              }}
            >
              {t.btn.cancel}
            </button>
            <button 
              className="btn-primary"
              onClick={handleResetPassword}
              disabled={!resetNewPassword.trim() || !isValidPassword(resetNewPassword.trim())}
            >
              💾 {t.btn.save}
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
      <div className="user-container">
        {/* Header */}
        <div className="user-header">
          <div className="title">{t.header.title}</div>
          <div className="actions">
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
              onClick={loadUsers}
              disabled={loading}
            >
              🔄 {t.btn.refresh}
            </button>
            <span className={`status ${statusMessage.type}`}>
              {statusMessage.text}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="user-content">
          {/* Table */}
          {loading ? (
            <div className="user-loading">⏳ {t.status.loading}</div>
          ) : (
            renderTable()
          )}

          {/* Add User Section */}
          <div className="user-add-section">
            <div className="add-title">➕ {t.label.addUser}</div>
            <div className="add-row">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.prompt.username}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.prompt.password}
              />
              <div className="password-toggle">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <span>{t.label.showPassword}</span>
              </div>
              {passwordStrength.text && (
                <div className={`strength-label ${passwordStrength.type}`}>
                  {passwordStrength.text}
                </div>
              )}
              <button 
                onClick={handleAddUser}
                disabled={!username.trim() || !password.trim() || !isValidPassword(password.trim())}
              >
                ➕ {t.btn.addUser}
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="user-status-bar">
          {loading && <div className="loading">⏳</div>}
          <span className={`status-msg ${statusMessage.type}`}>
            {statusMessage.text}
          </span>
          <span className="spacer"></span>
          <span className="time">
            🕐 {new Date().toLocaleTimeString()}
          </span>
        </div>

        {/* Modals */}
        {renderResetModal()}
      </div>
    </>
  );
};

export default UserManagementScreen;