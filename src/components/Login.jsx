// import React, { useState, useEffect } from 'react';
// import { translations } from '../i18n/translations';
// import './Login.css';
// import { fetchClinicInfo } from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [currentTime, setCurrentTime] = useState(
//     new Date().toLocaleTimeString()
//   );
//   const [loading, setLoading] = useState(false);
//   const [clinicInfo, setClinicInfo] = useState(null);
//   const [openLogin, setOpenLogin] = useState(false);
// const navigate = useNavigate(); 
//   const t = translations.en;

//   // LIVE CLOCK
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // LOAD CLINIC INFO
//   useEffect(() => {
//     const loadClinic = async () => {
//       const data = await fetchClinicInfo();
//       if (data) setClinicInfo(data);
//     };

//     loadClinic();
//   }, []);

//   // LOGIN
//   const handleLogin = async () => {
//     const user = username.trim();
//     const pass = password.trim();

//     if (!user || !pass) {
//       setError(t.msg.enterCredentials);
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//      if (user === 'admin' && pass === 'admin123') {
//   navigate('/admin');
//   alert('Welcome admin!');
//   return;
// }
//       setError(t.msg.invalidCredentials);
//     } catch (err) {
//       setError(t.msg.serverError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="login-container"
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL}/report-pic.png)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >

//       {/* ================= HEADER (BACKGROUND) ================= */}
//  <div className="background-header">

//   {/* LEFT */}
//   <div className="header-left">
//     {clinicInfo?.day}
//   </div>

//   {/* CENTER */}
//   <div className="header-center">
//     Clinic Name : {clinicInfo?.clinicName || 'Loading...'}
//   </div>

//   {/* RIGHT */}
//   <div className="header-right">
//     {currentTime}
//   </div>

// </div>

//       {/* ================= LOGIN BUTTON ================= */}
//       {!openLogin && (
//         <button
//           className="login-main-button"
//           onClick={() => {
//             setUsername('');
//             setPassword('');
//             setError('');
//             setOpenLogin(true);
//           }}
//         >
//           Login
//         </button>
//       )}

//       {/* ================= LOGIN MODAL ================= */}
//       {openLogin && (
//         <div className="login-overlay">
//           <div className="login-modal">

//             {/* Clinic info inside modal */}
//             <div className="modal-header">
//               <div className="modal-clinic-name">
//                 {clinicInfo?.clinicName || 'Loading...'}
//               </div>

//               <div className="modal-day">
//                 {clinicInfo?.day}
//               </div>
//             </div>

//             <h2>{t.title.login}</h2>

//             <input
//               type="text"
//               placeholder={t.prompt.username}
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="text-field"
//             />

//             <input
//               type="password"
//               placeholder={t.prompt.password}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="text-field"
//             />

//             <div className="error-label">{error}</div>

//             <button
//               className="login-button"
//               onClick={handleLogin}
//               disabled={loading}
//             >
//               {loading ? '...' : t.btn.signin}
//             </button>

//             <button
//               className="close-button"
//               onClick={() => setOpenLogin(false)}
//             >
//               Cancel
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default Login;



// import React, { useState, useEffect } from 'react';
// import { translations } from '../i18n/translations';
// import './Login.css';
// import { fetchClinicInfo } from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [currentTime, setCurrentTime] = useState(
//     new Date().toLocaleTimeString()
//   );
//   const [loading, setLoading] = useState(false);
//   const [clinicInfo, setClinicInfo] = useState(null);
//   const [openLogin, setOpenLogin] = useState(false);
//   const navigate = useNavigate();

//   // ---------- LANGUAGE STATE ----------
//   const [lang, setLang] = useState(() => {
//     // Persist language choice in localStorage
//     return localStorage.getItem('lang') || 'en';
//   });

//   // Save language preference whenever it changes
//   useEffect(() => {
//     localStorage.setItem('lang', lang);
//   }, [lang]);

//   // Get translations for the current language
//   const t = translations[lang];

//   // Determine if RTL
//   const isRTL = lang === 'ar';

//   // LIVE CLOCK
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // LOAD CLINIC INFO
//   useEffect(() => {
//     const loadClinic = async () => {
//       const data = await fetchClinicInfo();
//       if (data) setClinicInfo(data);
//     };
//     loadClinic();
//   }, []);

//   // LOGIN
//   const handleLogin = async () => {
//     const user = username.trim();
//     const pass = password.trim();

//     if (!user || !pass) {
//       setError(t.msg.enterCredentials);
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       if (user === 'admin' && pass === 'admin123') {
//           localStorage.setItem('adminToken', 'true');   // <-- store a token

//         navigate('/admin');
//         alert(t.msg.welcomeAdmin); // optional translation
//         return;
//       }
//       setError(t.msg.invalidCredentials);
//     } catch (err) {
//       setError(t.msg.serverError);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------- LANGUAGE DROPDOWN ----------
//   const handleLanguageChange = (e) => {
//     setLang(e.target.value);
//   };

//   return (
//     <div
//       className="login-container"
//       dir={isRTL ? 'rtl' : 'ltr'}   // RTL support
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL}/report-pic.png)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       <div className="background-header">
//         {/* LEFT */}
//         <div className="header-left">
//           {clinicInfo?.day}
//         </div>

//         {/* CENTER */}
//         <div className="header-center">
//           {t.clinicLabel} : {clinicInfo?.clinicName || t.loading}
//         </div>

//         {/* RIGHT - Language Switcher + Time */}
//         <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <select value={lang} onChange={handleLanguageChange} style={{ padding: '5px 10px', borderRadius: '5px', border: 'none', background: '#fff', fontWeight: 'bold' }}>
//             <option value="en">🇬🇧 English</option>
//             <option value="ar">🇸🇦 العربية</option>
//           </select>
//           <span>{currentTime}</span>
//         </div>
//       </div>

//       {/* ================= LOGIN BUTTON ================= */}
//       {!openLogin && (
//         <button
//           className="login-main-button"
//           onClick={() => {
//             setUsername('');
//             setPassword('');
//             setError('');
//             setOpenLogin(true);
//           }}
//         >
//           {t.btn.signin}
//         </button>
//       )}

//       {/* ================= LOGIN MODAL ================= */}
//       {openLogin && (
//         <div className="login-overlay">
//           <div className="login-modal" dir={isRTL ? 'rtl' : 'ltr'}>
//             {/* Clinic info inside modal */}
//             <div className="modal-header">
//               <div className="modal-clinic-name">
//                 {clinicInfo?.clinicName || t.loading}
//               </div>
//               <div className="modal-day">
//                 {clinicInfo?.day}
//               </div>
//             </div>

//             <h2>{t.title.login}</h2>

//             <input
//               type="text"
//               placeholder={t.prompt.username}
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="text-field"
//             />

//             <input
//               type="password"
//               placeholder={t.prompt.password}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="text-field"
//             />

//             <div className="error-label">{error}</div>

//             <button
//               className="login-button"
//               onClick={handleLogin}
//               disabled={loading}
//             >
//               {loading ? '...' : t.btn.signin}
//             </button>

//             <button
//               className="close-button"
//               onClick={() => setOpenLogin(false)}
//             >
//               {t.btn.cancel}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login; 04072026


// import React, { useState, useEffect } from 'react';
// import { translations } from '../i18n/translations';
// import './Login.css';
// import { fetchClinicInfo, BASE_URL } from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [currentTime, setCurrentTime] = useState(
//     new Date().toLocaleTimeString()
//   );
//   const [loading, setLoading] = useState(false);
//   const [clinicInfo, setClinicInfo] = useState(null);
//   const [openLogin, setOpenLogin] = useState(false);
//   const navigate = useNavigate();

//   // ---------- LANGUAGE STATE ----------
//   const [lang, setLang] = useState(() => {
//     return localStorage.getItem('lang') || 'en';
//   });

//   useEffect(() => {
//     localStorage.setItem('lang', lang);
//   }, [lang]);

//   const t = translations[lang];
//   const isRTL = lang === 'ar';

//   // ---------- LIVE CLOCK ----------
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // ---------- LOAD CLINIC INFO ----------
//   useEffect(() => {
//     const loadClinic = async () => {
//       const data = await fetchClinicInfo();
//       if (data) setClinicInfo(data);
//     };
//     loadClinic();
//   }, []);

//   // ---------- LOGIN ----------
//   const handleLogin = async () => {
//     const user = username.trim();
//     const pass = password.trim();

//     if (!user || !pass) {
//       setError(t.msg.enterCredentials);
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       // ===== 1. ADMIN LOGIN (Hardcoded) =====
//       if (user === 'admin' && pass === 'admin123') {
//         localStorage.setItem('adminToken', 'true');
//         localStorage.setItem('username', user);
//         localStorage.setItem('userRole', 'ADMIN');
        
//         //console.log('✅ Admin login successful');
//         alert(t.msg.welcomeAdmin || 'Welcome Admin!');
//         navigate('/admin');
//         return;
//       }

//       // ===== 2. ASSISTANT LOGIN (API) =====
//       const url = `${BASE_URL}/api/auth/login`;
//       //console.log('📤 Attempting assistant login:', url);

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: user,
//           password: pass,
//         }),
//       });

//       // Read response as text first
//       const rawText = await response.text();
//       //console.log('📄 Raw response:', rawText);

//       // Try to parse as JSON
//       let data;
//       try {
//         data = JSON.parse(rawText);
//       } catch (e) {
//         //console.error('❌ Response is not JSON:', rawText);
//         setError('Server returned an invalid response');
//         return;
//       }

//       // Check if login was successful
//       if (response.ok) {
//         // CASE 1: Response has a token field (JWT authentication)
//         if (data.token) {
//           localStorage.setItem('adminToken', data.token);
//           localStorage.setItem('username', data.username || user);
//           localStorage.setItem('userRole', data.role || 'ASSISTANT');
          
//           //console.log('✅ Assistant login successful (with token) for:', user);
//           alert(t.msg.welcomeAdmin || 'Welcome!');
//           navigate('/admin');
//           return;
//         }
        
//         // CASE 2: Response is the user object (no token - direct user response)
//         if (data.id && data.username) {
//           // Check if account is enabled
//           if (data.enabled === false) {
//             setError(t.msg.accountDisabled || 'Account is disabled. Please contact administrator.');
//             return;
//           }
          
//           // Store user info (using username as token for now)
//           localStorage.setItem('adminToken', 'true');
//           localStorage.setItem('username', data.username);
//           localStorage.setItem('userRole', data.role || 'ASSISTANT');
//           localStorage.setItem('userId', String(data.id));
          
//           //console.log('✅ Assistant login successful (user object) for:', data.username);
//           alert(t.msg.welcomeAdmin || 'Welcome!');
//           navigate('/admin');
//           return;
//         }
        
//         // If we got here, response is ok but we don't recognize the format
//         //console.error('❌ Unrecognized response format:', data);
//         setError('Server returned an unrecognized response format');
//       } else {
//         // Handle error response
//         if (data.message && data.message.toLowerCase().includes('disabled')) {
//           setError(t.msg.accountDisabled || 'Account is disabled. Please contact administrator.');
//         } else {
//           const errorMessage = data.message || data.error || t.msg.invalidCredentials;
//           setError(errorMessage);
//         }
//         //console.error('❌ Login failed:', data);
//       }
//     } catch (err) {
//       //console.error('🚨 Login error:', err);
//       setError(t.msg.serverError || 'Server connection failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------- ENTER KEY SUPPORT ----------
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && openLogin) {
//       handleLogin();
//     }
//   };

//   // ---------- LANGUAGE DROPDOWN ----------
//   const handleLanguageChange = (e) => {
//     setLang(e.target.value);
//   };

//   // ---------- UPDATE CLINIC LANGUAGE ----------
//   const updateClinicLanguage = async (language) => {
//     try {
//       const url = `${BASE_URL}/api/clinic/1/language?language=${language}`;
//       await fetch(url, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//       });
//     } catch (err) {
//       //console.warn('Failed to update clinic language:', err);
//     }
//   };

//   return (
//     <div
//       className="login-container"
//       dir={isRTL ? 'rtl' : 'ltr'}
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL}/report-pic.png)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       {/* ================= HEADER ================= */}
//       <div className="background-header">
//         {/* LEFT */}
//         <div className="header-left">
//           {clinicInfo?.day}
//         </div>

//         {/* CENTER */}
//         <div className="header-center">
//           {t.clinicLabel} : {clinicInfo?.clinicName || t.loading}
//         </div>

//         {/* RIGHT - Language Switcher + Time */}
//         <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
//           <select 
//             value={lang} 
//             onChange={(e) => {
//               const newLang = e.target.value;
//               setLang(newLang);
//               updateClinicLanguage(newLang);
//             }} 
//             style={{ padding: '5px 10px', borderRadius: '5px', border: 'none', background: '#fff', fontWeight: 'bold' }}
//           >
//             <option value="en">🇬🇧 English</option>
//             <option value="ar">🇸🇦 العربية</option>
//           </select>
//           <span>{currentTime}</span>
//         </div>
//       </div>

//       {/* ================= LOGIN BUTTON ================= */}
//       {!openLogin && (
//         <button
//           className="login-main-button"
//           onClick={() => {
//             setUsername('');
//             setPassword('');
//             setError('');
//             setOpenLogin(true);
//           }}
//         >
//           {t.btn.signin}
//         </button>
//       )}

//       {/* ================= LOGIN MODAL ================= */}
//       {openLogin && (
//         <div className="login-overlay">
//           <div className="login-modal" dir={isRTL ? 'rtl' : 'ltr'}>
//             {/* Clinic info inside modal */}
//             <div className="modal-header">
//               <div className="modal-clinic-name">
//                 {clinicInfo?.clinicName || t.loading}
//               </div>
//               <div className="modal-day">
//                 {clinicInfo?.day}
//               </div>
//             </div>

//             <h2>{t.title.login}</h2>

//             <input
//               type="text"
//               placeholder={t.prompt.username}
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="text-field"
//               autoFocus
//             />

//             <input
//               type="password"
//               placeholder={t.prompt.password}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="text-field"
//             />

//             <div className="error-label">{error}</div>

//             <button
//               className="login-button"
//               onClick={handleLogin}
//               disabled={loading}
//             >
//               {loading ? '⏳' : t.btn.signin}
//             </button>

//             <button
//               className="close-button"
//               onClick={() => setOpenLogin(false)}
//             >
//               {t.btn.cancel}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login; V2 04072026 

// import React, { useState, useEffect, useCallback } from 'react';
// import { translations } from '../i18n/translations';
// import './Login.css';
// import { fetchClinicInfo, BASE_URL } from '../utils/api';
// import { useNavigate } from 'react-router-dom';



// const Login = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
//   const [loading, setLoading] = useState(false);
//   const [clinicInfo, setClinicInfo] = useState(null);
//   const [openLogin, setOpenLogin] = useState(false);

//   // language
//   const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

//   const t = translations[lang];
//   const isRTL = lang === 'ar';

//   // ================= CLOCK =================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // ================= CLINIC INFO =================
//   useEffect(() => {
//     const loadClinic = async () => {
//       const data = await fetchClinicInfo();
//       if (data) setClinicInfo(data);
//     };
//     loadClinic();
//   }, []);

//   // ================= SAVE LANGUAGE =================
//   useEffect(() => {
//     localStorage.setItem('lang', lang);
//   }, [lang]);

//   // ================= LOGIN =================
//   const handleLogin = useCallback(async () => {
//     const user = username.trim();
//     const pass = password.trim();

//     if (!user || !pass) {
//       setError(t.msg.enterCredentials);
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       if (user === 'admin' && pass === 'admin123') {
//         localStorage.setItem('adminToken', 'true');
//         localStorage.setItem('username', user);
//         localStorage.setItem('userRole', 'ADMIN');

//         // alert(t.msg.welcomeAdmin || 'Welcome Admin!');
//         navigate('/admin');
//         return;
//       }

//       const response = await fetch(`${BASE_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username: user, password: pass }),
//       });

//       const data = await response.json().catch(() => null);

//       if (!response.ok) {
//         setError(data?.message || t.msg.invalidCredentials);
//         return;
//       }

//       // token login
//       if (data?.token) {
//         localStorage.setItem('adminToken', data.token);
//         localStorage.setItem('username', data.username || user);
//         localStorage.setItem('userRole', data.role || 'ASSISTANT');
//         navigate('/admin');
//         return;
//       }

//       // user object login
//       if (data?.id && data?.username) {
//         if (data.enabled === false) {
//           setError(t.msg.accountDisabled);
//           return;
//         }

//         localStorage.setItem('adminToken', 'true');
//         localStorage.setItem('username', data.username);
//         localStorage.setItem('userRole', data.role || 'ASSISTANT');
//         localStorage.setItem('userId', String(data.id));

//         navigate('/admin');
//         return;
//       }

//       setError('Invalid server response format');
//     } catch (err) {
//       //console.error(err);
//       setError(t.msg.serverError || 'Server error');
//     } finally {
//       setLoading(false);
//     }
//   }, [username, password, navigate, t]);

//   // ================= ENTER KEY =================
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleLogin();
//   };

//   // ================= LANGUAGE =================
//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     setLang(newLang);
//   };

//   const updateClinicLanguage = async (language) => {
//     try {
//       await fetch(`${BASE_URL}/api/clinic/1/language?language=${language}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//       });
//     } catch (err) {
//       //console.warn(err);
//     }
//   };

//   return (
//     <div
//       className="login-container"
//       dir={isRTL ? 'rtl' : 'ltr'}
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL}/report-pic.png)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       {/* HEADER */}
//       <div className="background-header">
//         <div className="header-left">{clinicInfo?.day}</div>

//         <div className="header-center">
//           {t.clinicLabel} : {clinicInfo?.clinicName || t.loading}
//         </div>

//         <div className="header-right">
//           <select
//             value={lang}
//             onChange={(e) => {
//               handleLanguageChange(e);
//               updateClinicLanguage(e.target.value);
//             }}
//           >
//             <option value="en">🇬🇧 English</option>
//             <option value="ar">🇸🇦 العربية</option>
//           </select>

//           <span>{currentTime}</span>
//         </div>
//       </div>

//       {/* LOGIN BUTTON */}
//       {!openLogin && (
//         <button
//           className="login-main-button"
//           onClick={() => {
//             setUsername('');
//             setPassword('');
//             setError('');
//             setOpenLogin(true);
//           }}
//         >
//           {t.btn.signin}
//         </button>
//       )}

//       {/* LOGIN MODAL */}
//       {openLogin && (
//         <div className="login-overlay">
//           <div className="login-modal" dir={isRTL ? 'rtl' : 'ltr'}>
//             <div className="modal-header">
//               <div className="modal-clinic-name">
//                 {clinicInfo?.clinicName}
//               </div>
//               <div className="modal-day">{clinicInfo?.day}</div>
//             </div>

// <div className="welcome-premium">
//   Welcome to <span>Clinic Management System</span>
// </div>

// <h2>{t.title.login}</h2>
//             <input
//               type="text"
//               value={username}
//               placeholder={t.prompt.username}
//               onChange={(e) => setUsername(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="text-field"
//               autoFocus
//             />

//             <input
//               type="password"
//               value={password}
//               placeholder={t.prompt.password}
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="text-field"
//             />

//             <div className="error-label">{error}</div>

//             <button
//               className="login-button"
//               onClick={handleLogin}
//               disabled={loading}
//             >
//               {loading ? '⏳' : t.btn.signin}
//             </button>

//             <button
//               className="close-button"
//               onClick={() => setOpenLogin(false)}
//             >
//               {t.btn.cancel}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;  V3 04072026


// import React, { useState, useEffect, useCallback } from 'react';
// import { translations } from '../i18n/translations';
// import './Login.css';
// import { fetchClinicInfo, BASE_URL } from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
//   const [loading, setLoading] = useState(false);
//   const [clinicInfo, setClinicInfo] = useState(null);
//   const [openLogin, setOpenLogin] = useState(false);

//   // language
//   const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

//   const t = translations[lang];
//   const isRTL = lang === 'ar';

//   // ================= CLOCK =================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // ================= CLINIC INFO =================
//   useEffect(() => {
//     const loadClinic = async () => {
//       const data = await fetchClinicInfo();
//       if (data) setClinicInfo(data);
//     };
//     loadClinic();
//   }, []);

//   // ================= SAVE LANGUAGE =================
//   useEffect(() => {
//     localStorage.setItem('lang', lang);
//   }, [lang]);

//   // ================= TOAST =================
//   const showToast = (message, type = 'info') => {
//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
//     toast.textContent = message;
//     toast.style.cssText = `
//       position: fixed;
//       top: 20px;
//       right: 20px;
//       padding: 12px 24px;
//       border-radius: 8px;
//       color: white;
//       font-weight: bold;
//       z-index: 9999;
//       animation: slideInRight 0.3s ease-out;
//       ${type === 'success' ? 'background: #2ecc71;' : ''}
//       ${type === 'error' ? 'background: #e74c3c;' : ''}
//       ${type === 'info' ? 'background: #3498db;' : ''}
//       ${type === 'warning' ? 'background: #f39c12;' : ''}
//       box-shadow: 0 4px 15px rgba(0,0,0,0.2);
//     `;
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       toast.style.animation = 'slideOutRight 0.3s ease-in';
//       setTimeout(() => {
//         if (toast.parentNode) toast.parentNode.removeChild(toast);
//       }, 300);
//     }, 3000);
//   };

//   // ================= LOGIN =================
// const handleLogin = useCallback(async () => {
//   const user = username.trim();
//   const pass = password.trim();

//   if (!user || !pass) {
//     setError(t.msg.enterCredentials);
//     return;
//   }

//   setLoading(true);
//   setError('');

//   try {
//     // ===== 1. ADMIN LOGIN (Hardcoded) =====
//     if (user === 'admin' && pass === 'admin123') {
//       localStorage.setItem('adminToken', 'true');
//       localStorage.setItem('username', user);
//       localStorage.setItem('userRole', 'ADMIN');
//       navigate('/admin');
//       return;
//     }

//     // ===== 2. ASSISTANT LOGIN (API) – FIRST =====
//     const assistantUrl = `${BASE_URL}/api/auth/login`;
//     //console.log('📤 Attempting assistant login:', assistantUrl);

//     const assistantResponse = await fetch(assistantUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username: user, password: pass }),
//     });

//     const assistantRaw = await assistantResponse.text();
//     //console.log('📄 Assistant raw response:', assistantRaw);

//     // ✅ If assistant login succeeds, navigate to /admin
//     if (assistantResponse.ok) {
//       let assistantData;
//       try {
//         assistantData = JSON.parse(assistantRaw);
//       } catch (e) {
//         setError('Server returned invalid response format');
//         return;
//       }

//       if (assistantData?.enabled === false) {
//         setError(t.msg.accountDisabled);
//         return;
//       }

//       if (assistantData?.token) {
//         localStorage.setItem('adminToken', assistantData.token);
//         localStorage.setItem('username', assistantData.username || user);
//         localStorage.setItem('userRole', assistantData.role || 'ASSISTANT');
//         navigate('/admin');
//         return;
//       }

//       if (assistantData?.id && assistantData?.username) {
//         localStorage.setItem('adminToken', 'true');
//         localStorage.setItem('username', assistantData.username);
//         localStorage.setItem('userRole', assistantData.role || 'ASSISTANT');
//         localStorage.setItem('userId', String(assistantData.id));
//         navigate('/admin');
//         return;
//       }

//       if (assistantData?.success === true) {
//         const userData = assistantData.user || assistantData.data;
//         if (userData) {
//           localStorage.setItem('adminToken', 'true');
//           localStorage.setItem('username', userData.username || user);
//           localStorage.setItem('userRole', userData.role || 'ASSISTANT');
//           navigate('/admin');
//           return;
//         }
//       }

//       if (assistantData?.username) {
//         localStorage.setItem('adminToken', 'true');
//         localStorage.setItem('username', assistantData.username);
//         localStorage.setItem('userRole', assistantData.role || 'ASSISTANT');
//         navigate('/admin');
//         return;
//       }
//     }

//     // ===== 3. DOCTOR LOGIN (API) – ONLY if assistant failed =====
//     const doctorUrl = `${BASE_URL}/api/doctors/login`;
//     //console.log('📤 Attempting doctor login:', doctorUrl);

//     const doctorResponse = await fetch(doctorUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username: user, password: pass }),
//     });

//     const doctorRaw = await doctorResponse.text();
//     //console.log('📄 Doctor raw response:', doctorRaw);

//     // ✅ If doctor login succeeds, navigate to /doctor
//     if (doctorResponse.ok) {
//       let doctorData;
//       try {
//         doctorData = JSON.parse(doctorRaw);
//       } catch (e) {
//         setError('Server returned invalid response format');
//         return;
//       }

//       if (doctorData?.id) {
//         localStorage.setItem('adminToken', 'true');
//         localStorage.setItem('username', doctorData.username || user);
//         localStorage.setItem('userRole', 'DOCTOR');
//         localStorage.setItem('doctorId', String(doctorData.id));
//         localStorage.setItem('doctorName', doctorData.fullName || 
//           `${doctorData.firstName || ''} ${doctorData.lastName || ''}`.trim() || user);
//         navigate('/doctor');
//         return;
//       }
//     }

//     // ===== 4. BOTH LOGINS FAILED =====
//     // Show the error from the last attempt (Doctor)
//     setError(doctorRaw || assistantRaw || 'User not found');
//     //console.error('❌ Both Assistant and Doctor login failed');
//   } catch (err) {
//     //console.error('🚨 Login error:', err);
//     setError(t.msg.serverError || 'Server error. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// }, [username, password, navigate, t]);

//   // ================= ENTER KEY =================
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleLogin();
//   };

//   // ================= LANGUAGE =================
//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     setLang(newLang);
//   };

//   const updateClinicLanguage = async (language) => {
//     try {
//       await fetch(`${BASE_URL}/api/clinic/1/language?language=${language}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//       });
//     } catch (err) {
//       //console.warn(err);
//     }
//   };

//   return (
//     <div
//       className="login-container"
//       dir={isRTL ? 'rtl' : 'ltr'}
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL}/report-pic.png)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       {/* HEADER */}
//       <div className="background-header">
//         <div className="header-left">{clinicInfo?.day}</div>

//         <div className="header-center">
//           {t.clinicLabel} : {clinicInfo?.clinicName || t.loading}
//         </div>

//         <div className="header-right">
//           <select
//             value={lang}
//             onChange={(e) => {
//               handleLanguageChange(e);
//               updateClinicLanguage(e.target.value);
//             }}
//             style={{ 
//               padding: '8px 12px', 
//               borderRadius: '8px', 
//               border: 'none', 
//               background: 'rgba(255,255,255,0.9)', 
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               fontSize: '14px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//             }}
//           >
//             <option value="en">🇬🇧 English</option>
//             <option value="ar">🇸🇦 العربية</option>
//           </select>

//           <span style={{ 
//             fontSize: '18px', 
//             fontWeight: 'bold',
//             textShadow: '0 2px 4px rgba(0,0,0,0.3)'
//           }}>
//             {currentTime}
//           </span>
//         </div>
//       </div>

//       {/* LOGIN BUTTON */}
//       {!openLogin && (
//         <button
//           className="login-main-button"
//           onClick={() => {
//             setUsername('');
//             setPassword('');
//             setError('');
//             setOpenLogin(true);
//           }}
//           style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             padding: '18px 40px',
//             fontSize: '20px',
//             fontWeight: 'bold',
//             background: 'linear-gradient(135deg, #2c3e50, #3498db)',
//             color: 'white',
//             border: 'none',
//             borderRadius: '50px',
//             cursor: 'pointer',
//             boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
//             transition: 'all 0.3s ease'
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.transform = 'translate(-50%, -50%) scale(1.05)';
//             e.target.style.boxShadow = '0 12px 35px rgba(52, 152, 219, 0.6)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = 'translate(-50%, -50%) scale(1)';
//             e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.4)';
//           }}
//         >
//           {t.btn.signin}
//         </button>
//       )}

//       {/* LOGIN MODAL */}
//       {openLogin && (
//         <div className="login-overlay">
//           <div className="login-modal" dir={isRTL ? 'rtl' : 'ltr'}>
//             <div className="modal-header">
//               <div className="modal-clinic-name">
//                 🏥 {clinicInfo?.clinicName}
//               </div>
//               <div className="modal-day">
//                 📅 {clinicInfo?.day}
//               </div>
//             </div>

//             <div className="welcome-premium" style={{
//               textAlign: 'center',
//               fontSize: '16px',
//               color: '#4a5568',
//               marginBottom: '20px'
//             }}>
//               Welcome to <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Clinic Management System</span>
//             </div>

//             <h2 style={{
//               textAlign: 'center',
//               marginBottom: '25px',
//               fontSize: '28px',
//               color: '#2c3e50'
//             }}>
//               {t.title.login}
//             </h2>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ 
//                 display: 'block', 
//                 marginBottom: '5px', 
//                 fontWeight: 'bold',
//                 color: '#34495e',
//                 fontSize: '14px'
//               }}>
//                 {t.prompt.username}
//               </label>
//               <input
//                 type="text"
//                 value={username}
//                 placeholder={t.prompt.username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="text-field"
//                 autoFocus
//                 style={{
//                   width: '100%',
//                   padding: '14px 16px',
//                   borderRadius: '10px',
//                   border: '2px solid #dce4ec',
//                   fontSize: '16px',
//                   transition: 'all 0.3s ease',
//                   outline: 'none',
//                   background: '#f8f9fa'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#3498db';
//                   e.target.style.background = 'white';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#dce4ec';
//                   e.target.style.background = '#f8f9fa';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ 
//                 display: 'block', 
//                 marginBottom: '5px', 
//                 fontWeight: 'bold',
//                 color: '#34495e',
//                 fontSize: '14px'
//               }}>
//                 {t.prompt.password}
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 placeholder={t.prompt.password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="text-field"
//                 style={{
//                   width: '100%',
//                   padding: '14px 16px',
//                   borderRadius: '10px',
//                   border: '2px solid #dce4ec',
//                   fontSize: '16px',
//                   transition: 'all 0.3s ease',
//                   outline: 'none',
//                   background: '#f8f9fa'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#3498db';
//                   e.target.style.background = 'white';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#dce4ec';
//                   e.target.style.background = '#f8f9fa';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             <div className="error-label" style={{
//               color: '#e74c3c',
//               fontSize: '14px',
//               textAlign: 'center',
//               marginBottom: '15px',
//               minHeight: '22px',
//               fontWeight: '500'
//             }}>
//               {error}
//             </div>

//             <button
//               className="login-button"
//               onClick={handleLogin}
//               disabled={loading}
//               style={{
//                 width: '100%',
//                 padding: '14px',
//                 fontSize: '18px',
//                 fontWeight: 'bold',
//                 background: loading ? '#bdc3c7' : 'linear-gradient(135deg, #2c3e50, #3498db)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.3s ease',
//                 boxShadow: loading ? 'none' : '0 4px 15px rgba(52, 152, 219, 0.3)',
//                 marginBottom: '12px'
//               }}
//               onMouseEnter={(e) => {
//                 if (!loading) {
//                   e.target.style.transform = 'scale(1.02)';
//                   e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.5)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!loading) {
//                   e.target.style.transform = 'scale(1)';
//                   e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
//                 }
//               }}
//             >
//               {loading ? '⏳ Signing in...' : t.btn.signin}
//             </button>

//             <button
//               className="close-button"
//               onClick={() => setOpenLogin(false)}
//               style={{
//                 width: '100%',
//                 padding: '12px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 background: '#e2e8f0',
//                 color: '#4a5568',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = '#cbd5e0';
//                 e.target.style.transform = 'scale(1.02)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = '#e2e8f0';
//                 e.target.style.transform = 'scale(1)';
//               }}
//             >
//               {t.btn.cancel}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;


// import React, { useState, useEffect, useCallback } from 'react';
// import { translations } from '../i18n/translations';
// import './Login.css';
// import { fetchClinicInfo, BASE_URL } from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
//   const [loading, setLoading] = useState(false);
//   const [clinicInfo, setClinicInfo] = useState(null);
//   const [openLogin, setOpenLogin] = useState(false);

//   // language
//   const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

//   const t = translations[lang];
//   const isRTL = lang === 'ar';

//   // ================= CLOCK =================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // ================= CLINIC INFO =================
//   useEffect(() => {
//     const loadClinic = async () => {
//       const data = await fetchClinicInfo();
//       if (data) setClinicInfo(data);
//     };
//     loadClinic();
//   }, []);

//   // ================= SAVE LANGUAGE =================
//   useEffect(() => {
//     localStorage.setItem('lang', lang);
//   }, [lang]);

//   // ================= TOAST =================
//   const showToast = (message, type = 'info') => {
//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
//     toast.textContent = message;
//     toast.style.cssText = `
//       position: fixed;
//       top: 20px;
//       right: 20px;
//       padding: 12px 24px;
//       border-radius: 8px;
//       color: white;
//       font-weight: bold;
//       z-index: 9999;
//       animation: slideInRight 0.3s ease-out;
//       ${type === 'success' ? 'background: #2ecc71;' : ''}
//       ${type === 'error' ? 'background: #e74c3c;' : ''}
//       ${type === 'info' ? 'background: #3498db;' : ''}
//       ${type === 'warning' ? 'background: #f39c12;' : ''}
//       box-shadow: 0 4px 15px rgba(0,0,0,0.2);
//     `;
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       toast.style.animation = 'slideOutRight 0.3s ease-in';
//       setTimeout(() => {
//         if (toast.parentNode) toast.parentNode.removeChild(toast);
//       }, 300);
//     }, 3000);
//   };

//   // ================= LOGIN =================
//   const handleLogin = useCallback(async () => {
//     const user = username.trim();
//     const pass = password.trim();

//     if (!user || !pass) {
//       setError(t.msg.enterCredentials);
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       // ===== 1. ADMIN LOGIN (Hardcoded) =====
//       if (user === 'admin' && pass === 'admin123') {
//         localStorage.setItem('adminToken', 'true');
//         localStorage.setItem('username', user);
//         localStorage.setItem('userRole', 'ADMIN');
//         localStorage.setItem('userId', '0');
//         showToast('Welcome Admin!', 'success');
//         //console.log('✅ Admin login successful, navigating to /admin');
//         navigate('/admin', { replace: true });
//         return;
//       }

//       // ===== 2. ASSISTANT LOGIN (API) =====
//       const assistantUrl = `${BASE_URL}/api/auth/login`;
//       //console.log('📤 Attempting assistant login:', assistantUrl);

//       try {
//         const assistantResponse = await fetch(assistantUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ username: user, password: pass }),
//         });

//         const assistantRaw = await assistantResponse.text();
//         //console.log('📄 Assistant raw response:', assistantRaw);

//         // ✅ If assistant login succeeds, navigate to /admin
//         if (assistantResponse.ok) {
//           let assistantData;
//           try {
//             assistantData = JSON.parse(assistantRaw);
//           } catch (e) {
//             //console.error('❌ Failed to parse assistant response:', e);
//             setError('Server returned invalid response format');
//             setLoading(false);
//             return;
//           }

//           // Check if account is disabled
//           if (assistantData?.enabled === false) {
//             setError(t.msg.accountDisabled || 'Account is disabled');
//             setLoading(false);
//             return;
//           }

//           // Store assistant data in localStorage
//           localStorage.setItem('adminToken', assistantData?.token || 'assistant-token');
//           localStorage.setItem('username', assistantData?.username || user);
//           localStorage.setItem('userRole', assistantData?.role || 'ASSISTANT');
//           localStorage.setItem('userId', String(assistantData?.id || ''));
//           localStorage.setItem('userType', 'ASSISTANT');
          
//           showToast(`Welcome ${assistantData?.username || 'Assistant'}!`, 'success');
//           //console.log('✅ Assistant login successful, navigating to /admin');
          
//           // Navigate to admin dashboard with replace to prevent back button issues
//           navigate('/admin', { replace: true });
//           return;
//         } else {
//           // Assistant login failed, log the error
//           //console.log('❌ Assistant login failed:', assistantResponse.status, assistantRaw);
//           // Don't throw here, try doctor login next
//         }
//       } catch (assistantErr) {
//         //console.warn('⚠️ Assistant login error:', assistantErr.message);
//         // Continue to doctor login
//       }

//       // ===== 3. DOCTOR LOGIN (API) – ONLY if assistant failed =====
//       const doctorUrl = `${BASE_URL}/api/doctors/login`;
//       //console.log('📤 Attempting doctor login:', doctorUrl);

//       try {
//         const doctorResponse = await fetch(doctorUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ username: user, password: pass }),
//         });

//         const doctorRaw = await doctorResponse.text();
//         //console.log('📄 Doctor raw response:', doctorRaw);

//         // ✅ If doctor login succeeds, navigate to /doctor
//         if (doctorResponse.ok) {
//           let doctorData;
//           try {
//             doctorData = JSON.parse(doctorRaw);
//           } catch (e) {
//             //console.error('❌ Failed to parse doctor response:', e);
//             setError('Server returned invalid response format');
//             setLoading(false);
//             return;
//           }

//           if (doctorData?.id) {
//             localStorage.setItem('adminToken', 'true');
//             localStorage.setItem('username', doctorData.username || user);
//             localStorage.setItem('userRole', 'DOCTOR');
//             localStorage.setItem('doctorId', String(doctorData.id));
//             localStorage.setItem('userType', 'DOCTOR');
//             localStorage.setItem('doctorName', doctorData.fullName || 
//               `${doctorData.firstName || ''} ${doctorData.lastName || ''}`.trim() || user);
            
//             showToast(`Welcome Dr. ${doctorData.fullName || 'Doctor'}!`, 'success');
//             //console.log('✅ Doctor login successful, navigating to /doctor');
//             navigate('/doctor', { replace: true });
//             return;
//           }
//         } else {
//           //console.log('❌ Doctor login failed:', doctorResponse.status, doctorRaw);
//         }
//       } catch (doctorErr) {
//         //console.warn('⚠️ Doctor login error:', doctorErr.message);
//       }

//       // ===== 4. BOTH LOGINS FAILED =====
//       setError('Invalid username or password. Please try again.');
//       //console.error('❌ Both Assistant and Doctor login failed');
      
//     } catch (err) {
//       //console.error('🚨 Login error:', err);
//       setError(t.msg.serverError || 'Server error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   }, [username, password, navigate, t]);

//   // ================= ENTER KEY =================
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleLogin();
//   };

//   // ================= LANGUAGE =================
//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     setLang(newLang);
//   };

//   const updateClinicLanguage = async (language) => {
//     try {
//       await fetch(`${BASE_URL}/api/clinic/1/language?language=${language}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//       });
//     } catch (err) {
//       //console.warn(err);
//     }
//   };

//   return (
//     <div
//       className="login-container"
//       dir={isRTL ? 'rtl' : 'ltr'}
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL}/report-pic.png)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       {/* HEADER */}
//       <div className="background-header">
//         <div className="header-left">{clinicInfo?.day}</div>

//         <div className="header-center">
//           {t.clinicLabel} : {clinicInfo?.clinicName || t.loading}
//         </div>

//         <div className="header-right">
//           <select
//             value={lang}
//             onChange={(e) => {
//               handleLanguageChange(e);
//               updateClinicLanguage(e.target.value);
//             }}
//             style={{ 
//               padding: '8px 12px', 
//               borderRadius: '8px', 
//               border: 'none', 
//               background: 'rgba(255,255,255,0.9)', 
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               fontSize: '14px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//             }}
//           >
//             <option value="en">🇬🇧 English</option>
//             <option value="ar">🇸🇦 العربية</option>
//           </select>

//           <span style={{ 
//             fontSize: '18px', 
//             fontWeight: 'bold',
//             textShadow: '0 2px 4px rgba(0,0,0,0.3)'
//           }}>
//             {currentTime}
//           </span>
//         </div>
//       </div>

//       {/* LOGIN BUTTON */}
//       {!openLogin && (
//         <button
//           className="login-main-button"
//           onClick={() => {
//             setUsername('');
//             setPassword('');
//             setError('');
//             setOpenLogin(true);
//           }}
//           style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             padding: '18px 40px',
//             fontSize: '20px',
//             fontWeight: 'bold',
//             background: 'linear-gradient(135deg, #2c3e50, #3498db)',
//             color: 'white',
//             border: 'none',
//             borderRadius: '50px',
//             cursor: 'pointer',
//             boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
//             transition: 'all 0.3s ease'
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.transform = 'translate(-50%, -50%) scale(1.05)';
//             e.target.style.boxShadow = '0 12px 35px rgba(52, 152, 219, 0.6)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = 'translate(-50%, -50%) scale(1)';
//             e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.4)';
//           }}
//         >
//           {t.btn.signin}
//         </button>
//       )}

//       {/* LOGIN MODAL */}
//       {openLogin && (
//         <div className="login-overlay">
//           <div className="login-modal" dir={isRTL ? 'rtl' : 'ltr'}>
//             <div className="modal-header">
//               <div className="modal-clinic-name">
//                 🏥 {clinicInfo?.clinicName}
//               </div>
//               <div className="modal-day">
//                 📅 {clinicInfo?.day}
//               </div>
//             </div>

//             <div className="welcome-premium" style={{
//               textAlign: 'center',
//               fontSize: '16px',
//               color: '#4a5568',
//               marginBottom: '20px'
//             }}>
//               Welcome to <span style={{ fontWeight: 'bold', color: '#2c3e50' }}>Clinic Management System</span>
//             </div>

//             <h2 style={{
//               textAlign: 'center',
//               marginBottom: '25px',
//               fontSize: '28px',
//               color: '#2c3e50'
//             }}>
//               {t.title.login}
//             </h2>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ 
//                 display: 'block', 
//                 marginBottom: '5px', 
//                 fontWeight: 'bold',
//                 color: '#34495e',
//                 fontSize: '14px'
//               }}>
//                 {t.prompt.username}
//               </label>
//               <input
//                 type="text"
//                 value={username}
//                 placeholder={t.prompt.username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="text-field"
//                 autoFocus
//                 style={{
//                   width: '100%',
//                   padding: '14px 16px',
//                   borderRadius: '10px',
//                   border: '2px solid #dce4ec',
//                   fontSize: '16px',
//                   transition: 'all 0.3s ease',
//                   outline: 'none',
//                   background: '#f8f9fa'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#3498db';
//                   e.target.style.background = 'white';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#dce4ec';
//                   e.target.style.background = '#f8f9fa';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ 
//                 display: 'block', 
//                 marginBottom: '5px', 
//                 fontWeight: 'bold',
//                 color: '#34495e',
//                 fontSize: '14px'
//               }}>
//                 {t.prompt.password}
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 placeholder={t.prompt.password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="text-field"
//                 style={{
//                   width: '100%',
//                   padding: '14px 16px',
//                   borderRadius: '10px',
//                   border: '2px solid #dce4ec',
//                   fontSize: '16px',
//                   transition: 'all 0.3s ease',
//                   outline: 'none',
//                   background: '#f8f9fa'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#3498db';
//                   e.target.style.background = 'white';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#dce4ec';
//                   e.target.style.background = '#f8f9fa';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             <div className="error-label" style={{
//               color: '#e74c3c',
//               fontSize: '14px',
//               textAlign: 'center',
//               marginBottom: '15px',
//               minHeight: '22px',
//               fontWeight: '500'
//             }}>
//               {error}
//             </div>

//             <button
//               className="login-button"
//               onClick={handleLogin}
//               disabled={loading}
//               style={{
//                 width: '100%',
//                 padding: '14px',
//                 fontSize: '18px',
//                 fontWeight: 'bold',
//                 background: loading ? '#bdc3c7' : 'linear-gradient(135deg, #2c3e50, #3498db)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.3s ease',
//                 boxShadow: loading ? 'none' : '0 4px 15px rgba(52, 152, 219, 0.3)',
//                 marginBottom: '12px'
//               }}
//               onMouseEnter={(e) => {
//                 if (!loading) {
//                   e.target.style.transform = 'scale(1.02)';
//                   e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.5)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!loading) {
//                   e.target.style.transform = 'scale(1)';
//                   e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
//                 }
//               }}
//             >
//               {loading ? '⏳ Signing in...' : t.btn.signin}
//             </button>

//             <button
//               className="close-button"
//               onClick={() => setOpenLogin(false)}
//               style={{
//                 width: '100%',
//                 padding: '12px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 background: '#e2e8f0',
//                 color: '#4a5568',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = '#cbd5e0';
//                 e.target.style.transform = 'scale(1.02)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = '#e2e8f0';
//                 e.target.style.transform = 'scale(1)';
//               }}
//             >
//               {t.btn.cancel}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;   09072026  11:00 pm




// import React, { useState, useEffect, useCallback } from 'react';
// import { translations } from '../i18n/translations';
// import './Login.css';
// import { fetchClinicInfo, BASE_URL } from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
//   const [loading, setLoading] = useState(false);
//   const [clinicInfo, setClinicInfo] = useState(null);
//   const [openLogin, setOpenLogin] = useState(false);

//   // language
//   const [lang, setLang] = useState(() => sessionStorage.getItem('lang') || 'en');

//   const t = translations[lang];
//   const isRTL = lang === 'ar';

//   // ================= CLOCK =================
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(new Date().toLocaleTimeString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   // ================= CLINIC INFO =================
//   useEffect(() => {
//     const loadClinic = async () => {
//       const data = await fetchClinicInfo();
//       if (data) setClinicInfo(data);
//     };
//     loadClinic();
//   }, []);

//   // ================= SAVE LANGUAGE =================
//   useEffect(() => {
//     sessionStorage.setItem('lang', lang);
//   }, [lang]);

//   // ================= TOAST =================
//   const showToast = (message, type = 'info') => {
//     const toast = document.createElement('div');
//     toast.className = `toast toast-${type}`;
//     toast.textContent = message;
//     toast.style.cssText = `
//       position: fixed;
//       top: 20px;
//       right: 20px;
//       padding: 12px 24px;
//       border-radius: 8px;
//       color: white;
//       font-weight: bold;
//       z-index: 9999;
//       animation: slideInRight 0.3s ease-out;
//       ${type === 'success' ? 'background: #2ecc71;' : ''}
//       ${type === 'error' ? 'background: #e74c3c;' : ''}
//       ${type === 'info' ? 'background: #3498db;' : ''}
//       ${type === 'warning' ? 'background: #f39c12;' : ''}
//       box-shadow: 0 4px 15px rgba(0,0,0,0.2);
//     `;
//     document.body.appendChild(toast);
    
//     setTimeout(() => {
//       toast.style.animation = 'slideOutRight 0.3s ease-in';
//       setTimeout(() => {
//         if (toast.parentNode) toast.parentNode.removeChild(toast);
//       }, 300);
//     }, 3000);
//   };

//   // ================= LOGIN =================
//   const handleLogin = useCallback(async () => {

//      // Clear previous login information
//   sessionStorage.removeItem("adminToken");
//   sessionStorage.removeItem("doctorId");
//   sessionStorage.removeItem("userRole");
//   sessionStorage.removeItem("userType");
//   sessionStorage.removeItem("username");


//     const user = username.trim();
//     const pass = password.trim();

//     if (!user || !pass) {
//       setError(t.msg.enterCredentials);
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       // ===== 1. ADMIN LOGIN (Hardcoded) =====
//       if (user === 'admin' && pass === 'admin123') {
//         sessionStorage.setItem('adminToken', 'true');
//         sessionStorage.setItem('username', user);
//         sessionStorage.setItem('userRole', 'ADMIN');
//         sessionStorage.setItem('userId', '0');
//         showToast('Welcome Admin!', 'success');
//         //console.log('✅ Admin login successful, navigating to /admin');
//         navigate('/admin', { replace: true });
//         return;
//       }

//       // ===== 2. ASSISTANT LOGIN (API) =====
//       const assistantUrl = `${BASE_URL}/api/auth/login`;
//       //console.log('📤 Attempting assistant login:', assistantUrl);

//       try {
//         const assistantResponse = await fetch(assistantUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ username: user, password: pass }),
//         });

//         const assistantRaw = await assistantResponse.text();
//         //console.log('📄 Assistant raw response:', assistantRaw);

//         // ✅ If assistant login succeeds, navigate to /admin
//         if (assistantResponse.ok) {
//           let assistantData;
//           try {
//             assistantData = JSON.parse(assistantRaw);
//           } catch (e) {
//             //console.error('❌ Failed to parse assistant response:', e);
//             setError('Server returned invalid response format');
//             setLoading(false);
//             return;
//           }

//           // Check if account is disabled
//           if (assistantData?.enabled === false) {
//             setError(t.msg.accountDisabled || 'Account is disabled');
//             setLoading(false);
//             return;
//           }

//           // Store assistant data in 
//           sessionStorage.setItem('adminToken', assistantData?.token || 'assistant-token');
//           sessionStorage.setItem('username', assistantData?.username || user);
//           sessionStorage.setItem('userRole', assistantData?.role || 'ASSISTANT');
//           sessionStorage.setItem('userId', String(assistantData?.id || ''));
//           sessionStorage.setItem('userType', 'ASSISTANT');
          
//           showToast(`Welcome ${assistantData?.username || 'Assistant'}!`, 'success');
//           //console.log('✅ Assistant login successful, navigating to /admin');
          
//           // Navigate to admin dashboard with replace to prevent back button issues
//           navigate('/admin', { replace: true });
//           return;
//         } else {
//           // Assistant login failed, log the error
//           //console.log('❌ Assistant login failed:', assistantResponse.status, assistantRaw);
//           // Don't throw here, try doctor login next
//         }
//       } catch (assistantErr) {
//         console.warn('⚠️ Assistant login error:', assistantErr.message);
//         // Continue to doctor login
//       }

//       // ===== 3. DOCTOR LOGIN (API) – ONLY if assistant failed =====
//       const doctorUrl = `${BASE_URL}/api/doctors/login`;
//       //console.log('📤 Attempting doctor login:', doctorUrl);

//       try {
//         const doctorResponse = await fetch(doctorUrl, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ username: user, password: pass }),
//         });

//         const doctorRaw = await doctorResponse.text();
//         //console.log('📄 Doctor raw response:', doctorRaw);

//         // ✅ If doctor login succeeds, navigate to /doctor
//         if (doctorResponse.ok) {
//           let doctorData;
//           try {
//             doctorData = JSON.parse(doctorRaw);
//           } catch (e) {
//             //console.error('❌ Failed to parse doctor response:', e);
//             setError('Server returned invalid response format');
//             setLoading(false);
//             return;
//           }

//           if (doctorData?.id) {
//             sessionStorage.setItem('adminToken', 'true');
//             sessionStorage.setItem('username', doctorData.username || user);
//             sessionStorage.setItem('userRole', 'DOCTOR');
//             sessionStorage.setItem('doctorId', String(doctorData.id));
//             sessionStorage.setItem('userType', 'DOCTOR');
//             sessionStorage.setItem('doctorName', doctorData.fullName || 
//               `${doctorData.firstName || ''} ${doctorData.lastName || ''}`.trim() || user);
            
//             showToast(`Welcome Dr. ${doctorData.fullName || 'Doctor'}!`, 'success');
//             //console.log('✅ Doctor login successful, navigating to /doctor');
//             navigate('/doctor', { replace: true });
//             return;
//           }
//         } else {
//           //console.log('❌ Doctor login failed:', doctorResponse.status, doctorRaw);
//         }
//       } catch (doctorErr) {
//         //console.warn('⚠️ Doctor login error:', doctorErr.message);
//       }

//       // ===== 4. BOTH LOGINS FAILED =====
//       setError('Invalid username or password. Please try again.');
//       //console.error('❌ Both Assistant and Doctor login failed');
      
//     } catch (err) {
//       //console.error('🚨 Login error:', err);
//       setError(t.msg.serverError || 'Server error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   }, [username, password, navigate, t]);

//   // ================= ENTER KEY =================
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleLogin();
//   };

//   // ================= LANGUAGE =================
//   const handleLanguageChange = (e) => {
//     const newLang = e.target.value;
//     setLang(newLang);
//   };

//   const updateClinicLanguage = async (language) => {
//     try {
//       await fetch(`${BASE_URL}/api/clinic/1/language?language=${language}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//       });
//     } catch (err) {
//       //console.warn(err);
//     }
//   };

//   return (
//     <div
//       className="login-container"
//       dir={isRTL ? 'rtl' : 'ltr'}
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL}/report-pic.png)`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       {/* HEADER */}
//       <div className="background-header">
//         <div className="header-left">{clinicInfo?.day}</div>

//         <div className="header-center">
//           {t.clinicLabel} : {clinicInfo?.clinicName || t.loading}
//         </div>

//         <div className="header-right">
//           <select
//             value={lang}
//             onChange={(e) => {
//               handleLanguageChange(e);
//               updateClinicLanguage(e.target.value);
//             }}
//             style={{ 
//               padding: '8px 12px', 
//               borderRadius: '8px', 
//               border: 'none', 
//               background: 'rgba(255,255,255,0.9)', 
//               fontWeight: 'bold',
//               cursor: 'pointer',
//               fontSize: '14px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//             }}
//           >
//             <option value="en">🇬🇧 English</option>
//             <option value="ar">🇸🇦 العربية</option>
//           </select>

//           <span style={{ 
//             fontSize: '18px', 
//             fontWeight: 'bold',
//             textShadow: '0 2px 4px rgba(0,0,0,0.3)'
//           }}>
//             {currentTime}
//           </span>
//         </div>
//       </div>

//       {/* LOGIN BUTTON */}
//       {!openLogin && (
//         <button
//           className="login-main-button"
//           onClick={() => {
//             setUsername('');
//             setPassword('');
//             setError('');
//             setOpenLogin(true);
//           }}
//           style={{
//             position: 'fixed',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             padding: '18px 40px',
//             fontSize: '20px',
//             fontWeight: 'bold',
//             background: 'linear-gradient(135deg, #2c3e50, #3498db)',
//             color: 'white',
//             border: 'none',
//             borderRadius: '50px',
//             cursor: 'pointer',
//             boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
//             transition: 'all 0.3s ease'
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.transform = 'translate(-50%, -50%) scale(1.05)';
//             e.target.style.boxShadow = '0 12px 35px rgba(52, 152, 219, 0.6)';
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.transform = 'translate(-50%, -50%) scale(1)';
//             e.target.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.4)';
//           }}
//         >
//           {t.btn.signin}
//         </button>
//       )}

//       {/* LOGIN MODAL */}
//       {openLogin && (
//         <div className="login-overlay">
//           <div className="login-modal" dir={isRTL ? 'rtl' : 'ltr'}>
//             <div className="modal-header">
//               <div className="modal-clinic-name">
//                 🏥 {clinicInfo?.clinicName}
//               </div>
//               <div className="modal-day">
//                 📅 {clinicInfo?.day}
//               </div>
//             </div>

//             <div className="welcome-premium" style={{
//               textAlign: 'center',
//               fontSize: '16px',
//               color: '#fbfbfbff',
//               marginBottom: '20px'
//             }}>
//               Welcome to <span style={{ fontWeight: 'bold', color: '#fcfcfcff' }}>Clinic Management System</span>
//             </div>

//             <h2 style={{
//               textAlign: 'center',
//               marginBottom: '25px',
//               fontSize: '28px',
//               color: '#fdfdfdff'
//             }}>
//               {t.title.login}
//             </h2>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ 
//                 display: 'block', 
//                 marginBottom: '5px', 
//                 fontWeight: 'bold',
//                 color: '#f8fbfeff',
//                 fontSize: '14px'
//               }}>
//                 {t.prompt.username}
//               </label>
//               <input
//                 type="text"
//                 value={username}
//                 placeholder={t.prompt.username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="text-field"
//                 autoFocus
//                 style={{
//                   width: '100%',
//                   padding: '14px 16px',
//                   borderRadius: '10px',
//                   border: '2px solid #dce4ec',
//                   fontSize: '16px',
//                   transition: 'all 0.3s ease',
//                   outline: 'none',
//                   background: '#f8f9fa'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#3498db';
//                   e.target.style.background = 'white';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#dce4ec';
//                   e.target.style.background = '#f8f9fa';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ 
//                 display: 'block', 
//                 marginBottom: '5px', 
//                 fontWeight: 'bold',
//                 color: '#f4f4f4ff',
//                 fontSize: '14px'
//               }}>
//                 {t.prompt.password}
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 placeholder={t.prompt.password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="text-field"
//                 style={{
//                   width: '100%',
//                   padding: '14px 16px',
//                   borderRadius: '10px',
//                   border: '2px solid #dce4ec',
//                   fontSize: '16px',
//                   transition: 'all 0.3s ease',
//                   outline: 'none',
//                   background: '#f8f9fa'
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#3498db';
//                   e.target.style.background = 'white';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#dce4ec';
//                   e.target.style.background = '#f8f9fa';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             <div className="error-label" style={{
//               color: '#e74c3c',
//               fontSize: '14px',
//               textAlign: 'center',
//               marginBottom: '15px',
//               minHeight: '22px',
//               fontWeight: '500'
//             }}>
//               {error}
//             </div>

//             <button
//               className="login-button"
//               onClick={handleLogin}
//               disabled={loading}
//               style={{
//                 width: '100%',
//                 padding: '14px',
//                 fontSize: '18px',
//                 fontWeight: 'bold',
//                 background: loading ? '#bdc3c7' : 'linear-gradient(135deg, #2c3e50, #3498db)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.3s ease',
//                 boxShadow: loading ? 'none' : '0 4px 15px rgba(52, 152, 219, 0.3)',
//                 marginBottom: '12px'
//               }}
//               onMouseEnter={(e) => {
//                 if (!loading) {
//                   e.target.style.transform = 'scale(1.02)';
//                   e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.5)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!loading) {
//                   e.target.style.transform = 'scale(1)';
//                   e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
//                 }
//               }}
//             >
//               {loading ? '⏳ Signing in...' : t.btn.signin}
//             </button>

//             <button
//               className="close-button"
//               onClick={() => setOpenLogin(false)}
//               style={{
//                 width: '100%',
//                 padding: '12px',
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 background: '#e2e8f0',
//                 color: '#4a5568',
//                 border: 'none',
//                 borderRadius: '10px',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = '#cbd5e0';
//                 e.target.style.transform = 'scale(1.02)';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = '#e2e8f0';
//                 e.target.style.transform = 'scale(1)';
//               }}
//             >
//               {t.btn.cancel}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;  19072026

import React, { useState, useEffect, useCallback } from 'react';
import { translations } from '../i18n/translations';
import './Login.css';
import { fetchClinicInfo, BASE_URL } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [loading, setLoading] = useState(false);
  const [clinicInfo, setClinicInfo] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

  // language
  const [lang, setLang] = useState(() => sessionStorage.getItem('lang') || 'en');

  const t = translations[lang];
  const isRTL = lang === 'ar';

  // ================= CLOCK =================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ================= CLINIC INFO =================
  useEffect(() => {
    const loadClinic = async () => {
      const data = await fetchClinicInfo();
      if (data) setClinicInfo(data);
    };
    loadClinic();
  }, []);

  // ================= SAVE LANGUAGE =================
  useEffect(() => {
    sessionStorage.setItem('lang', lang);
  }, [lang]);

  // ================= TOAST =================
  const showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 9999;
      animation: slideInRight 0.3s ease-out;
      ${type === 'success' ? 'background: #2ecc71;' : ''}
      ${type === 'error' ? 'background: #e74c3c;' : ''}
      ${type === 'info' ? 'background: #3498db;' : ''}
      ${type === 'warning' ? 'background: #f39c12;' : ''}
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  };

  // ================= LOGIN =================
  const handleLogin = useCallback(async () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("doctorId");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("username");

    const user = username.trim();
    const pass = password.trim();

    if (!user || !pass) {
      setError(t.msg.enterCredentials);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ===== 1. ADMIN LOGIN (Hardcoded) =====
      if (user === 'admin' && pass === 'admin123') {
        sessionStorage.setItem('adminToken', 'true');
        sessionStorage.setItem('username', user);
        sessionStorage.setItem('userRole', 'ADMIN');
        sessionStorage.setItem('userId', '0');
        showToast('Welcome Admin!', 'success');
        navigate('/admin', { replace: true });
        return;
      }

      // ===== 2. ASSISTANT LOGIN (API) =====
      const assistantUrl = `${BASE_URL}/api/auth/login`;
      
      try {
        const assistantResponse = await fetch(assistantUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user, password: pass }),
        });

        const assistantRaw = await assistantResponse.text();

        if (assistantResponse.ok) {
          let assistantData;
          try {
            assistantData = JSON.parse(assistantRaw);
          } catch (e) {
            setError('Server returned invalid response format');
            setLoading(false);
            return;
          }

          if (assistantData?.enabled === false) {
            setError(t.msg.accountDisabled || 'Account is disabled');
            setLoading(false);
            return;
          }

          sessionStorage.setItem('adminToken', assistantData?.token || 'assistant-token');
          sessionStorage.setItem('username', assistantData?.username || user);
          sessionStorage.setItem('userRole', assistantData?.role || 'ASSISTANT');
          sessionStorage.setItem('userId', String(assistantData?.id || ''));
          sessionStorage.setItem('userType', 'ASSISTANT');
          
          showToast(`Welcome ${assistantData?.username || 'Assistant'}!`, 'success');
          navigate('/admin', { replace: true });
          return;
        }
      } catch (assistantErr) {
        console.warn('⚠️ Assistant login error:', assistantErr.message);
      }

      // ===== 3. DOCTOR LOGIN (API) =====
      const doctorUrl = `${BASE_URL}/api/doctors/login`;

      try {
        const doctorResponse = await fetch(doctorUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user, password: pass }),
        });

        const doctorRaw = await doctorResponse.text();

        if (doctorResponse.ok) {
          let doctorData;
          try {
            doctorData = JSON.parse(doctorRaw);
          } catch (e) {
            setError('Server returned invalid response format');
            setLoading(false);
            return;
          }

          if (doctorData?.id) {
            sessionStorage.setItem('adminToken', 'true');
            sessionStorage.setItem('username', doctorData.username || user);
            sessionStorage.setItem('userRole', 'DOCTOR');
            sessionStorage.setItem('doctorId', String(doctorData.id));
            sessionStorage.setItem('userType', 'DOCTOR');
            sessionStorage.setItem('doctorName', doctorData.fullName || 
              `${doctorData.firstName || ''} ${doctorData.lastName || ''}`.trim() || user);
            
            showToast(`Welcome Dr. ${doctorData.fullName || 'Doctor'}!`, 'success');
            navigate('/doctor', { replace: true });
            return;
          }
        }
      } catch (doctorErr) {
        console.warn('⚠️ Doctor login error:', doctorErr.message);
      }

      // ===== 4. BOTH LOGINS FAILED =====
      setError('Invalid username or password. Please try again.');
      
    } catch (err) {
      setError(t.msg.serverError || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [username, password, navigate, t]);

  // ================= ENTER KEY =================
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  // ================= LANGUAGE =================
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
  };

  const updateClinicLanguage = async (language) => {
    try {
      await fetch(`${BASE_URL}/api/clinic/1/language?language=${language}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      //console.warn(err);
    }
  };

  return (
    <div
      className="login-container"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/report-pic.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* HEADER with Micro Care SYSTEM */}
      <div className="background-header">
        <div className="header-left">{clinicInfo?.day}</div>

        <div className="header-center">
          <span className="clinic-brand">🏥 {clinicInfo?.clinicName || t.loading}</span>
          <span className="system-badge">SYSTEM</span>
        </div>

        <div className="header-right">
          <select
            value={lang}
            onChange={(e) => {
              handleLanguageChange(e);
              updateClinicLanguage(e.target.value);
            }}
          >
            <option value="en">🇬🇧 English</option>
            <option value="ar">🇸🇦 العربية</option>
          </select>

          <span className="header-time">
            {currentTime}
          </span>
        </div>
      </div>

      {/* LOGIN BUTTON */}
      {!openLogin && (
        <button
          className="login-main-button"
          onClick={() => {
            setUsername('');
            setPassword('');
            setError('');
            setOpenLogin(true);
          }}
        >
          🔓 {t.btn.signin}
        </button>
      )}

      {/* LOGIN MODAL with Micro Care SYSTEM */}
      {openLogin && (
        <div className="login-overlay">
          <div className="login-modal" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="modal-header">
              <div className="modal-clinic-name">
                <span className="clinic-name-main">🏥 {clinicInfo?.clinicName || 'Micro Care'}</span>
                <span className="system-tag">SYSTEM</span>
              </div>
              <div className="modal-day">
                📅 {clinicInfo?.day} • {currentTime}
              </div>
            </div>

            <div className="welcome-premium">
              Welcome Back! 👋<br />
              <span>Micro Care SYSTEM</span>
            </div>

            <h2>
              🔐 {t.title.login}
            </h2>

            <div style={{ marginBottom: '15px' }}>
              <label className="input-label">
                {t.prompt.username}
              </label>
              <input
                type="text"
                value={username}
                placeholder={t.prompt.username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-field"
                autoFocus
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label className="input-label">
                {t.prompt.password}
              </label>
              <input
                type="password"
                value={password}
                placeholder={t.prompt.password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-field"
              />
            </div>

            <div className="error-label">
              {error}
            </div>

            <button
              className="login-button"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? '⏳ Signing in...' : '➜ ' + t.btn.signin}
            </button>

            <button
              className="close-button"
              onClick={() => setOpenLogin(false)}
            >
              ✕ {t.btn.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;