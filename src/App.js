// // // // // src/App.js
// // // // import React from 'react';
// // // // import Login from './components/Login';

// // // // function App() {
// // // //   return (
// // // //     <div className="App">
// // // //       <Login />
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;

// // // import React from 'react';
// // // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // // import Login from './components/Login';
// // // import AdminHomePage from './components/AdminHomePage/AdminHomePage';
// // // function App() {
// // //   return (
// // //     <BrowserRouter>
// // //       <Routes>
// // //         <Route path="/" element={<Login />} />
// // //         <Route path="/admin" element={<AdminHomePage />} />
// // //       </Routes>
// // //     </BrowserRouter>
// // //   );
// // // }

// // // export default App;//

// // // import React from 'react';
// // // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // // import Login from './components/Login';
// // // import AdminHomePage from './components/AdminHomePage/AdminHomePage';
// // // import DoctorHomePage from './components/DoctorHomePage/DoctorHomePage';

// // // const isAuthenticated = () => {
// // //   return !!localStorage.getItem('adminToken');
// // // };

// // // const ProtectedRoute = ({ children }) => {
// // //   return isAuthenticated() ? children : <Navigate to="/" replace />;
// // // };

// // // function App() {
// // //   return (
// // //     <BrowserRouter>
// // //       <Routes>
// // //         <Route path="/" element={<Login />} />
// // //         <Route
// // //           path="/admin"
// // //           element={
// // //             <ProtectedRoute>
// // //               <AdminHomePage />
// // //             </ProtectedRoute>
// // //           }
// // //         />
// // //       </Routes>
// // //     </BrowserRouter>
// // //   );
// // // }

// // // export default App; 04072026

// // import React from 'react';
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import Login from './components/Login';
// // import AdminHomePage from './components/AdminHomePage/AdminHomePage';
// // import DoctorHomePage from './components/DoctorHomePage/DoctorHomePage';

// // // ---------- Auth Helpers ----------
// // const isAuthenticated = () => {
// //   return !!localStorage.getItem('adminToken');
// // };

// // const getUserRole = () => {
// //   return localStorage.getItem('userRole') || null;
// // };

// // // ---------- Protected Route (generic) ----------
// // const ProtectedRoute = ({ children, allowedRole }) => {
// //   const token = localStorage.getItem('adminToken');
// //   const role = localStorage.getItem('userRole');

// //   if (!token) {
// //     return <Navigate to="/" replace />;
// //   }

// //   if (allowedRole && role !== allowedRole) {
// //     // If the user is logged in but has the wrong role, redirect to the appropriate page
// //     if (role === 'ADMIN') {
// //       return <Navigate to="/admin" replace />;
// //     } else if (role === 'DOCTOR') {
// //       return <Navigate to="/doctor" replace />;
// //     } else {
// //       return <Navigate to="/" replace />;
// //     }
// //   }

// //   return children;
// // };

// // // ---------- App ----------
// // function App() {
// //   const role = getUserRole();

// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Login />} />

// //         {/* Admin Route – only ADMIN role allowed */}
// //         <Route
// //           path="/admin"
// //           element={
// //             <ProtectedRoute allowedRole="ADMIN">
// //               <AdminHomePage />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Doctor Route – only DOCTOR role allowed */}
// //         <Route
// //           path="/doctor"
// //           element={
// //             <ProtectedRoute allowedRole="DOCTOR">
// //               <DoctorHomePage
// //                 doctorId={localStorage.getItem('doctorId')}
// //                 username={localStorage.getItem('username')}
// //               />
// //             </ProtectedRoute>
// //           }
// //         />

// //         {/* Catch‑all – redirect to login if no route matches */}
// //         <Route path="*" element={<Navigate to="/" replace />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import AdminHomePage from './components/AdminHomePage/AdminHomePage';
// import DoctorHomePage from './components/DoctorHomePage/DoctorHomePage';

// // ---------- Auth Helpers ----------
// const isAuthenticated = () => {
//   return !!localStorage.getItem('adminToken');
// };

// const getUserRole = () => {
//   return localStorage.getItem('userRole') || null;
// };

// // ---------- Protected Route (generic) ----------
// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem('adminToken');
//   const role = localStorage.getItem('userRole');

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   // If allowedRoles is not specified, allow any authenticated user
//   if (!allowedRoles) {
//     return children;
//   }

//   // Check if the user's role is in the allowed roles list
//   const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
//   if (!roles.includes(role)) {
//     // If the user is logged in but has the wrong role, redirect to the appropriate page
//     if (role === 'ADMIN' || role === 'ASSISTANT') {
//       return <Navigate to="/admin" replace />;
//     } else if (role === 'DOCTOR') {
//       return <Navigate to="/doctor" replace />;
//     } else {
//       return <Navigate to="/" replace />;
//     }
//   }

//   return children;
// };

// // ---------- App ----------
// function App() {
//   const role = getUserRole();

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />

//         {/* Admin Route – allows ADMIN and ASSISTANT roles */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRoles={['ADMIN', 'ASSISTANT']}>
//               <AdminHomePage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Doctor Route – only DOCTOR role allowed */}
//         <Route
//           path="/doctor"
//           element={
//             <ProtectedRoute allowedRoles={['DOCTOR']}>
//               <DoctorHomePage
//                 doctorId={localStorage.getItem('doctorId')}
//                 username={localStorage.getItem('username')}
//               />
//             </ProtectedRoute>
//           }
//         />

//         {/* Catch‑all – redirect to login if no route matches */}
//         <Route path=  "*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;  

// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// // import Login from './components/Login';
// // import AdminHomePage from './components/AdminHomePage/AdminHomePage';
// // import DoctorHomePage from './components/DoctorHomePage/DoctorHomePage';
// // import './App.css';

// // // ---------- Constants ----------
// // const DEBUG_MODE = true;

// // const IDLE_TIMEOUT_MS = DEBUG_MODE ? 30 * 1000 : 30 * 60 * 1000;
// // const IDLE_CHECK_INTERVAL_MS = DEBUG_MODE ? 5 * 1000 : 30 * 1000;
// // const WARNING_MS = DEBUG_MODE ? 10 * 1000 : 2 * 60 * 1000;

// // // ---------- Auth ----------
// // const isAuthenticated = () => !!localStorage.getItem('adminToken');

// // const getUserRole = () => localStorage.getItem('userRole');

// // const performLogout = () => {
// //   console.log('🚪 LOGOUT: Session expired');

// //   localStorage.clear();
// //   sessionStorage.clear();

// //   document.cookie.split(';').forEach(c => {
// //     document.cookie =
// //       c.replace(/^ +/, '')
// //         .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
// //   });

// //   window.location.href = '/login';
// // };

// // // ---------- Protected Route ----------
// // const ProtectedRoute = ({ children, allowedRoles }) => {
// //   const token = localStorage.getItem('adminToken');
// //   const role = localStorage.getItem('userRole');

// //   if (!token) return <Navigate to="/" replace />;

// //   if (!allowedRoles) return children;

// //   const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

// //   if (!roles.includes(role)) {
// //     if (role === 'ADMIN' || role === 'ASSISTANT') return <Navigate to="/admin" replace />;
// //     if (role === 'DOCTOR') return <Navigate to="/doctor" replace />;
// //     return <Navigate to="/" replace />;
// //   }

// //   return children;
// // };

// // // ---------- Warning Modal ----------
// // const IdleWarningModal = ({ isOpen, onContinue, onLogout, timeRemaining }) => {
// //   if (!isOpen) return null;

// //   return (
// //     <div className="idle-warning-overlay">
// //       <div className="idle-warning-modal">
// //         <h2>⚠️ Session Expiring</h2>

// //         <p>
// //           You will be logged out in <b>{timeRemaining}s</b>
// //         </p>

// //         <div className="idle-warning-footer">
// //           <button onClick={onContinue}>Continue</button>
// //           <button onClick={onLogout}>Logout</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ---------- APP ----------
// // function App() {
// //   const [lastActivity, setLastActivity] = useState(Date.now());
// //   const [showWarning, setShowWarning] = useState(false);

// //   const intervalRef = useRef(null);

// //   const role = getUserRole();

// //   const forceLogout = useCallback(() => {
// //     performLogout();
// //   }, []);

// //   // reset activity
// //   const resetIdleTimer = useCallback(() => {
// //     if (!isAuthenticated()) return;

// //     setLastActivity(Date.now());
// //     setShowWarning(false);
// //   }, []);

// //   const handleUserActivity = useCallback(() => {
// //     resetIdleTimer();
// //   }, [resetIdleTimer]);

// //   // main idle checker (NO setTimeout used)
// //   const checkIdleStatus = useCallback(() => {
// //     if (!isAuthenticated()) return;

// //     const idleTime = Date.now() - lastActivity;

// //     // logout
// //     if (idleTime >= IDLE_TIMEOUT_MS) {
// //       console.log('🚪 Auto logout triggered');
// //       forceLogout();
// //       return;
// //     }

// //     // warning
// //     if (idleTime >= IDLE_TIMEOUT_MS - WARNING_MS) {
// //       if (!showWarning) {
// //         console.log('⚠️ Showing warning modal');
// //         setShowWarning(true);
// //       }
// //     } else {
// //       if (showWarning) setShowWarning(false);
// //     }
// //   }, [lastActivity, showWarning, forceLogout]);

// //   // setup listeners
// //   useEffect(() => {
// //     const events = [
// //       'mousemove',
// //       'mousedown',
// //       'keydown',
// //       'scroll',
// //       'touchstart',
// //       'click'
// //     ];

// //     events.forEach(e =>
// //       document.addEventListener(e, handleUserActivity)
// //     );

// //     intervalRef.current = setInterval(
// //       checkIdleStatus,
// //       IDLE_CHECK_INTERVAL_MS
// //     );

// //     return () => {
// //       events.forEach(e =>
// //         document.removeEventListener(e, handleUserActivity)
// //       );

// //       clearInterval(intervalRef.current);
// //     };
// //   }, [handleUserActivity, checkIdleStatus]);

// //   const timeRemaining = Math.max(
// //     0,
// //     Math.floor((IDLE_TIMEOUT_MS - (Date.now() - lastActivity)) / 1000)
// //   );

// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Login />} />

// //         <Route
// //           path="/admin"
// //           element={
// //             <ProtectedRoute allowedRoles={['ADMIN', 'ASSISTANT']}>
// //               <AdminHomePage />
// //             </ProtectedRoute>
// //           }
// //         />

// //         <Route
// //           path="/doctor"
// //           element={
// //             <ProtectedRoute allowedRoles={['DOCTOR']}>
// //               <DoctorHomePage
// //                 doctorId={localStorage.getItem('doctorId')}
// //                 username={localStorage.getItem('username')}
// //               />
// //             </ProtectedRoute>
// //           }
// //         />

// //         <Route path="*" element={<Navigate to="/" replace />} />
// //       </Routes>

// //       {/* Idle Warning */}
// //       <IdleWarningModal
// //         isOpen={showWarning && isAuthenticated()}
// //         onContinue={resetIdleTimer}
// //         onLogout={forceLogout}
// //         timeRemaining={timeRemaining}
// //       />
// //     </BrowserRouter>
// //   );
// // }

// // export default App;  05072026  V2


import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminHomePage from './components/AdminHomePage/AdminHomePage';
import DoctorHomePage from './components/DoctorHomePage/DoctorHomePage';

// ---------- Auth Helpers ----------
const isAuthenticated = () => {
  return !!localStorage.getItem('adminToken') || !!sessionStorage.getItem('adminToken');
};

const getUserRole = () => {
  // Check both localStorage and sessionStorage
  return localStorage.getItem('userRole') || sessionStorage.getItem('userRole') || null;
};

// ---------- Protected Route (generic) ----------
const ProtectedRoute = ({ children, allowedRoles }) => {
  // Check both storage mechanisms
  const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  const role = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');

  console.log('🔐 ProtectedRoute check:', { token, role, allowedRoles, path: window.location.pathname });

  if (!token) {
    console.log('❌ No token found, redirecting to login');
    return <Navigate to="/" replace />;
  }

  // If allowedRoles is not specified, allow any authenticated user
  if (!allowedRoles) {
    console.log('✅ No role restrictions, allowing access');
    return children;
  }

  // Check if the user's role is in the allowed roles list
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  if (!roles.includes(role)) {
    console.log(`❌ Role "${role}" not in allowed roles:`, roles);
    
    // If the user is logged in but has the wrong role, redirect to the appropriate page
    if (role === 'ADMIN' || role === 'ASSISTANT') {
      console.log('🔄 Redirecting ADMIN/ASSISTANT to /admin');
      return <Navigate to="/admin" replace />;
    } else if (role === 'DOCTOR') {
      console.log('🔄 Redirecting DOCTOR to /doctor');
      return <Navigate to="/doctor" replace />;
    } else {
      console.log('🔄 Unknown role, redirecting to login');
      return <Navigate to="/" replace />;
    }
  }

  console.log(`✅ Role "${role}" authorized for path:`, window.location.pathname);
  return children;
};

// ---------- App ----------
function App() {
  // Debug: Log current storage state
  React.useEffect(() => {
    console.log('🏥 App mounted');
    console.log('📦 localStorage:', {
      adminToken: localStorage.getItem('adminToken'),
      userRole: localStorage.getItem('userRole'),
      username: localStorage.getItem('username')
    });
    console.log('📦 sessionStorage:', {
      adminToken: sessionStorage.getItem('adminToken'),
      userRole: sessionStorage.getItem('userRole'),
      username: sessionStorage.getItem('username')
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin Route – allows ADMIN and ASSISTANT roles */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN', 'ASSISTANT']}>
              <AdminHomePage />
            </ProtectedRoute>
          }
        />

        {/* Doctor Route – only DOCTOR role allowed */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={['DOCTOR']}>
              <DoctorHomePage
                doctorId={localStorage.getItem('doctorId') || sessionStorage.getItem('doctorId')}
                username={localStorage.getItem('username') || sessionStorage.getItem('username')}
              />
            </ProtectedRoute>
          }
        />

        {/* Catch‑all – redirect to login if no route matches */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;