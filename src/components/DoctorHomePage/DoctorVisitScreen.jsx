// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorVisitScreen.css';

// // Constants
// const DISCHARGE_STATUSES = ['NOT_DISCHARGED', 'DISCHARGED', 'FOLLOW_UP_REQUIRED', 'REFERRED'];
// const DURATION_TYPES = ['Hour', 'Day', 'Week', 'Month', 'Year'];

// const DoctorVisitScreen = ({ doctorId, visitId, initialStatus = 'NEW', username, onClose }) => {
//   // ==================== STATE ====================
//   const [currentStatus, setCurrentStatus] = useState(initialStatus);
//   const [activeTab, setActiveTab] = useState('visit');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);
  
//   // Visit Details
//   const [chiefComplaint, setChiefComplaint] = useState('');
//   const [history, setHistory] = useState('');
//   const [medications, setMedications] = useState('');
//   const [allergies, setAllergies] = useState('');
//   const [doctorNotes, setDoctorNotes] = useState('');
//   const [dischargeStatus, setDischargeStatus] = useState('NOT_DISCHARGED');
  
//   // Drugs
//   const [searchQuery, setSearchQuery] = useState('');
//   const [drugSearchResults, setDrugSearchResults] = useState([]);
//   const [favoriteDrugs, setFavoriteDrugs] = useState([]);
//   const [visitDrugs, setVisitDrugs] = useState([]);
//   const [frequencies, setFrequencies] = useState([]);
  
//   // Prescription Dialog
//   const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
//   const [selectedDrugId, setSelectedDrugId] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     duration: '',
//     durationType: '',
//     frequency: null,
//     dose: '',
//     instruction: ''
//   });
  
//   // Procedures
//   const [selectedProcedures, setSelectedProcedures] = useState([]);
//   const [radiologyProcedures, setRadiologyProcedures] = useState([]);
//   const [laboratoryProcedures, setLaboratoryProcedures] = useState([]);
//   const [medicalProcedures, setMedicalProcedures] = useState([]);
//   const [searchRadiology, setSearchRadiology] = useState('');
//   const [searchLaboratory, setSearchLaboratory] = useState('');
//   const [searchMedical, setSearchMedical] = useState('');

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       //console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== VISIT OPERATIONS ====================
//   const startVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/start`, { method: 'PUT' });
//       setCurrentStatus('IN_PROGRESS');
//       alert('Visit started successfully');
//     } catch (err) {
//       setError('Failed to start visit: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch]);

//   const closeVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/close`, { method: 'PUT' });
//       alert('Visit closed successfully');
//       if (onClose) onClose();
//     } catch (err) {
//       setError('Failed to close visit: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, onClose]);

//   const saveVisitDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const body = {
//         chiefComplaint,
//         history,
//         medications,
//         allergies,
//         doctorNotes,
//         status: dischargeStatus
//       };
      
//       await apiFetch(`/api/visits/${visitId}/details`, {
//         method: 'PUT',
//         body: JSON.stringify(body)
//       });
      
//       setIsSaved(true);
//       alert('Visit details saved successfully');
//     } catch (err) {
//       setError('Failed to save: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, chiefComplaint, history, medications, allergies, doctorNotes, dischargeStatus, apiFetch]);

//   // ==================== DRUG OPERATIONS ====================
//   const searchDrugs = useCallback(async () => {
//     if (!searchQuery.trim()) return;
//     try {
//       const results = await apiFetch(
//         `/api/drugs/autocomplete?name=${encodeURIComponent(searchQuery)}`
//       );
//       setDrugSearchResults(results || []);
//     } catch (err) {
//       setError('Failed to search drugs: ' + err.message);
//     }
//   }, [searchQuery, apiFetch]);

//   const addDrugToVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs`, {
//         method: 'POST',
//         body: JSON.stringify([drugId])
//       });
//       await loadVisitDrugs();
//       alert('Drug added successfully');
//     } catch (err) {
//       setError('Failed to add drug: ' + err.message);
//     }
//   }, [visitId, apiFetch]);

//   const removeDrugFromVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs/${drugId}`, {
//         method: 'DELETE'
//       });
//       await loadVisitDrugs();
//       alert('Drug removed successfully');
//     } catch (err) {
//       setError('Failed to remove drug: ' + err.message);
//     }
//   }, [visitId, apiFetch]);

//   const loadVisitDrugs = useCallback(async () => {
//     try {
//       const drugs = await apiFetch(`/api/visits/${visitId}/drugs`);
//       setVisitDrugs(drugs || []);
//     } catch (err) {
//       //console.error('Failed to load visit drugs:', err);
//     }
//   }, [visitId, apiFetch]);

//   // ==================== FAVORITE DRUGS ====================
//   const loadFavorites = useCallback(async () => {
//     try {
//       const favorites = await apiFetch(`/api/doctors/${doctorId}/favorites`);
//       const favoriteIds = Array.isArray(favorites) ? favorites : [];
      
//       if (favoriteIds.length > 0) {
//         const drugDetails = await apiFetch('/api/drugs/by-ids', {
//           method: 'POST',
//           body: JSON.stringify(favoriteIds)
//         });
//         setFavoriteDrugs(drugDetails || []);
//       } else {
//         setFavoriteDrugs([]);
//       }
//     } catch (err) {
//       //console.error('Failed to load favorites:', err);
//     }
//   }, [doctorId, apiFetch]);

//   const toggleFavorite = useCallback(async (drugId) => {
//     try {
//       const isFavorite = favoriteDrugs.some(d => d.drugId === drugId);
//       const endpoint = `/api/doctors/${doctorId}/favorites`;
      
//       if (isFavorite) {
//         await apiFetch(endpoint, {
//           method: 'DELETE',
//           body: JSON.stringify([drugId])
//         });
//       } else {
//         await apiFetch(endpoint, {
//           method: 'POST',
//           body: JSON.stringify([drugId])
//         });
//       }
//       await loadFavorites();
//     } catch (err) {
//       setError('Failed to toggle favorite: ' + err.message);
//     }
//   }, [doctorId, favoriteDrugs, apiFetch, loadFavorites]);

//   // ==================== PRESCRIPTIONS ====================
//   const loadFrequencies = useCallback(async () => {
//     try {
//       const data = await apiFetch('/api/repetitions');
//       setFrequencies(data || []);
//     } catch (err) {
//       //console.error('Failed to load frequencies:', err);
//     }
//   }, [apiFetch]);

//   const savePrescription = useCallback(async () => {
//     if (!selectedDrugId) return;
    
//     const { duration, durationType, frequency, dose, instruction } = prescriptionData;
//     if (!duration || !durationType || !frequency) {
//       alert('Please fill all required fields');
//       return;
//     }
    
//     try {
//       const body = {
//         drugId: selectedDrugId,
//         duration,
//         durationType: DURATION_TYPES.indexOf(durationType) + 1,
//         frequencyId: frequency.id,
//         frequency: frequency.repetitionDesc,
//         dose: dose || '',
//         instruction: instruction || ''
//       };
      
//       await apiFetch(`/api/visits/${visitId}/drug-prescriptions`, {
//         method: 'POST',
//         body: JSON.stringify(body)
//       });
      
//       alert('Prescription saved successfully');
//       setShowPrescriptionDialog(false);
//       setSelectedDrugId(null);
//       setPrescriptionData({ duration: '', durationType: '', frequency: null, dose: '', instruction: '' });
//     } catch (err) {
//       setError('Failed to save prescription: ' + err.message);
//     }
//   }, [visitId, selectedDrugId, prescriptionData, apiFetch]);

//   const showPrescription = useCallback(async (drugId) => {
//     try {
//       const prescriptions = await apiFetch(`/api/visits/${visitId}/drug-prescriptions`);
//       const found = prescriptions?.find(p => p.drugId === drugId);
      
//       if (!found) {
//         alert('No prescription found for this drug');
//         return;
//       }
      
//       const message = `
//         Drug: ${found.tradeName || 'Unknown'}
//         Dose: ${found.dose || 'Not specified'}
//         Duration: ${found.duration || 'Not specified'}
//         Duration Type: ${mapDurationType(found.durationType)}
//         Frequency: ${found.frequency || 'Not specified'}
//         Instruction: ${found.instructions || 'Not specified'}
//       `;
//       alert(message);
//     } catch (err) {
//       setError('Failed to load prescription: ' + err.message);
//     }
//   }, [visitId, apiFetch]);

//   const mapDurationType = (type) => {
//     const types = ['Hour', 'Day', 'Week', 'Month', 'Year'];
//     return types[parseInt(type) - 1] || '-';
//   };

//   // ==================== PROCEDURE OPERATIONS ====================
//   const loadProcedures = useCallback(async (category) => {
//     try {
//       const data = await apiFetch(`/api/procedures?category=${category}`);
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       //console.error(`Failed to load ${category} procedures:`, err);
//     }
//   }, [apiFetch]);

//   const searchProcedures = useCallback(async (category, query) => {
//     if (!query.trim()) {
//       loadProcedures(category);
//       return;
//     }
    
//     try {
//       const data = await apiFetch(
//         `/api/procedures/search?category=${category}&name=${encodeURIComponent(query)}`
//       );
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       setError(`Failed to search ${category} procedures: ` + err.message);
//     }
//   }, [apiFetch, loadProcedures]);

//   const addProcedureToVisit = useCallback(async (procedure) => {
//     if (!procedure || selectedProcedures.includes(procedure)) {
//       if (selectedProcedures.includes(procedure)) {
//         alert('Procedure already selected');
//       }
//       return;
//     }
    
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'POST' }
//       );
//       await loadSelectedProcedures();
//     } catch (err) {
//       setError('Failed to add procedure: ' + err.message);
//     }
//   }, [visitId, selectedProcedures, apiFetch]);

//   const removeProcedureFromVisit = useCallback(async (procedure) => {
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'DELETE' }
//       );
//       await loadSelectedProcedures();
//     } catch (err) {
//       setError('Failed to remove procedure: ' + err.message);
//     }
//   }, [visitId, apiFetch]);

//   const loadSelectedProcedures = useCallback(async () => {
//     try {
//       const data = await apiFetch(`/visits/${visitId}/procedures`);
//       setSelectedProcedures(data || []);
//     } catch (err) {
//       //console.error('Failed to load selected procedures:', err);
//     }
//   }, [visitId, apiFetch]);

//   // ==================== LOAD DATA ====================
//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([
//         loadVisitDrugs(),
//         loadFavorites(),
//         loadSelectedProcedures(),
//         loadFrequencies(),
//         loadProcedures('RADIOLOGY'),
//         loadProcedures('LABORATORY'),
//         loadProcedures('MEDICAL')
//       ]);
//     };
    
//     loadData();
//   }, [loadVisitDrugs, loadFavorites, loadSelectedProcedures, loadFrequencies, loadProcedures]);

//   // ==================== RENDER HELPERS ====================
//   const renderStatusBadge = (status) => {
//     const colors = {
//       'NEW': '#e74c3c',
//       'IN_PROGRESS': '#f39c12',
//       'CLOSED': '#27ae60'
//     };
//     return (
//       <span className="status-badge" style={{ backgroundColor: colors[status] || '#3498db' }}>
//         {status}
//       </span>
//     );
//   };

//   // ==================== PRESCRIPTION DIALOG ====================
//   const renderPrescriptionDialog = () => {
//     if (!showPrescriptionDialog) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowPrescriptionDialog(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <h3>📋 Drug Prescription</h3>
//           <div className="form-group">
//             <label>Duration *</label>
//             <input
//               type="number"
//               placeholder="Enter duration"
//               value={prescriptionData.duration}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>Duration Type *</label>
//             <select
//               value={prescriptionData.durationType}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, durationType: e.target.value })}
//             >
//               <option value="">Select duration type</option>
//               {DURATION_TYPES.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Frequency *</label>
//             <select
//               value={prescriptionData.frequency?.id || ''}
//               onChange={(e) => {
//                 const freq = frequencies.find(f => f.id === parseInt(e.target.value));
//                 setPrescriptionData({ ...prescriptionData, frequency: freq });
//               }}
//             >
//               <option value="">Select frequency</option>
//               {frequencies.map((freq) => (
//                 <option key={freq.id} value={freq.id}>
//                   {freq.repetitionDesc}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Dose</label>
//             <input
//               type="text"
//               placeholder="Enter dose"
//               value={prescriptionData.dose}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, dose: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>Instruction</label>
//             <textarea
//               placeholder="Enter instruction"
//               value={prescriptionData.instruction}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, instruction: e.target.value })}
//               rows={3}
//             />
//           </div>
//           <div className="modal-actions">
//             <button className="btn-cancel" onClick={() => setShowPrescriptionDialog(false)}>
//               Cancel
//             </button>
//             <button className="btn-save" onClick={savePrescription}>
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   return (
//     <div className="doctor-visit-screen">
//       {error && (
//         <div className="error-banner">
//           ⚠️ {error}
//           <button onClick={() => setError(null)}>✖</button>
//         </div>
//       )}
      
//       <div className="visit-header">
//         <h2>🩺 Visit #{visitId}</h2>
//         <div className="header-actions">
//           {renderStatusBadge(currentStatus)}
//           <button 
//             className={`btn-start ${currentStatus !== 'NEW' ? 'disabled' : ''}`}
//             onClick={startVisit}
//             disabled={currentStatus !== 'NEW' || loading}
//           >
//             ▶ Start Visit
//           </button>
//           <button 
//             className="btn-save"
//             onClick={saveVisitDetails}
//             disabled={loading}
//           >
//             💾 Save
//           </button>
//           <button 
//             className={`btn-close ${currentStatus !== 'IN_PROGRESS' ? 'disabled' : ''}`}
//             onClick={closeVisit}
//             disabled={currentStatus !== 'IN_PROGRESS' || loading}
//           >
//             ✖ Close Visit
//           </button>
//         </div>
//       </div>

//       <div className="tabs">
//         <button 
//           className={`tab ${activeTab === 'visit' ? 'active' : ''}`}
//           onClick={() => setActiveTab('visit')}
//         >
//           📋 Visit Details
//         </button>
//         <button 
//           className={`tab ${activeTab === 'drugs' ? 'active' : ''}`}
//           onClick={() => setActiveTab('drugs')}
//           disabled={currentStatus === 'NEW'}
//         >
//           💊 Drugs
//         </button>
//         <button 
//           className={`tab ${activeTab === 'procedures' ? 'active' : ''}`}
//           onClick={() => setActiveTab('procedures')}
//           disabled={currentStatus === 'NEW'}
//         >
//           🔬 Procedures
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'visit' && (
//           <div className="visit-tab">
//             <div className="form-group">
//               <label>🩺 Chief Complaint</label>
//               <textarea
//                 value={chiefComplaint}
//                 onChange={(e) => setChiefComplaint(e.target.value)}
//                 placeholder="Enter chief complaint..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📜 History</label>
//               <textarea
//                 value={history}
//                 onChange={(e) => setHistory(e.target.value)}
//                 placeholder="Enter history..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>💊 Medications</label>
//               <textarea
//                 value={medications}
//                 onChange={(e) => setMedications(e.target.value)}
//                 placeholder="Enter medications..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>⚠️ Allergies</label>
//               <textarea
//                 value={allergies}
//                 onChange={(e) => setAllergies(e.target.value)}
//                 placeholder="Enter allergies..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📝 Doctor Notes</label>
//               <textarea
//                 value={doctorNotes}
//                 onChange={(e) => setDoctorNotes(e.target.value)}
//                 placeholder="Enter doctor notes..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📌 Discharge Status</label>
//               <select
//                 value={dischargeStatus}
//                 onChange={(e) => setDischargeStatus(e.target.value)}
//               >
//                 {DISCHARGE_STATUSES.map((status) => (
//                   <option key={status} value={status}>
//                     {status.replace('_', ' ')}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}

//         {activeTab === 'drugs' && (
//           <div className="drugs-tab">
//             <div className="search-section">
//               <h3>🔍 Search Drugs</h3>
//               <div className="search-box">
//                 <input
//                   type="text"
//                   placeholder="Search drugs..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && searchDrugs()}
//                 />
//                 <button onClick={searchDrugs}>🔍 Search</button>
//               </div>
//             </div>

//             <div className="drug-results">
//               <h4>📋 Search Results</h4>
//               <div className="drug-list">
//                 {drugSearchResults.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         ➕
//                       </button>
//                       <button 
//                         className="btn-star"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                         style={{ color: favoriteDrugs.some(d => d.drugId === drug.drugId) ? 'gold' : 'gray' }}
//                       >
//                         {favoriteDrugs.some(d => d.drugId === drug.drugId) ? '★' : '☆'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="favorites-section">
//               <h4>⭐ Favorite Drugs</h4>
//               <div className="drug-list">
//                 {favoriteDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         ➕
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="visit-drugs-section">
//               <h4>💊 Selected Drugs</h4>
//               <div className="drug-list">
//                 {visitDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-prescription"
//                         onClick={() => {
//                           setSelectedDrugId(drug.drugId);
//                           setShowPrescriptionDialog(true);
//                         }}
//                       >
//                         📋
//                       </button>
//                       <button 
//                         className="btn-view"
//                         onClick={() => showPrescription(drug.drugId)}
//                       >
//                         👁
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => removeDrugFromVisit(drug.drugId)}
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'procedures' && (
//           <div className="procedures-tab">
//             <div className="procedure-categories">
//               <div className="procedure-category">
//                 <h4>📡 Radiology</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search radiology..."
//                     value={searchRadiology}
//                     onChange={(e) => setSearchRadiology(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('RADIOLOGY', searchRadiology)}
//                   />
//                   <button onClick={() => searchProcedures('RADIOLOGY', searchRadiology)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {radiologyProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>🧫 Laboratory</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search laboratory..."
//                     value={searchLaboratory}
//                     onChange={(e) => setSearchLaboratory(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('LABORATORY', searchLaboratory)}
//                   />
//                   <button onClick={() => searchProcedures('LABORATORY', searchLaboratory)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {laboratoryProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>🩺 Medical</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search medical..."
//                     value={searchMedical}
//                     onChange={(e) => setSearchMedical(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('MEDICAL', searchMedical)}
//                   />
//                   <button onClick={() => searchProcedures('MEDICAL', searchMedical)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {medicalProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="selected-procedures">
//               <h4>📋 Selected Procedures</h4>
//               <div className="procedure-list">
//                 {selectedProcedures.map((proc) => (
//                   <div key={proc} className="procedure-item selected">
//                     <span>{proc}</span>
//                     <button className="btn-remove" onClick={() => removeProcedureFromVisit(proc)}>✖</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {renderPrescriptionDialog()}
//     </div>
//   );
// };

// export default DoctorVisitScreen; V1

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorVisitScreen.css';

// // Constants
// const DISCHARGE_STATUSES = ['NOT_DISCHARGED', 'DISCHARGED', 'FOLLOW_UP_REQUIRED', 'REFERRED'];
// const DURATION_TYPES = ['Hour', 'Day', 'Week', 'Month', 'Year'];

// const DoctorVisitScreen = ({ doctorId, visitId, initialStatus = 'NEW', username, onClose }) => {
//   // ==================== STATE ====================
//   const [currentStatus, setCurrentStatus] = useState(initialStatus);
//   const [activeTab, setActiveTab] = useState('visit');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);
  
//   // Visit Details
//   const [chiefComplaint, setChiefComplaint] = useState('');
//   const [history, setHistory] = useState('');
//   const [medications, setMedications] = useState('');
//   const [allergies, setAllergies] = useState('');
//   const [doctorNotes, setDoctorNotes] = useState('');
//   const [dischargeStatus, setDischargeStatus] = useState('NOT_DISCHARGED');
  
//   // Drugs
//   const [searchQuery, setSearchQuery] = useState('');
//   const [drugSearchResults, setDrugSearchResults] = useState([]);
//   const [favoriteDrugs, setFavoriteDrugs] = useState([]);
//   const [visitDrugs, setVisitDrugs] = useState([]);
//   const [frequencies, setFrequencies] = useState([]);
  
//   // Prescription Dialog
//   const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
//   const [selectedDrugId, setSelectedDrugId] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     duration: '',
//     durationType: '',
//     frequency: null,
//     dose: '',
//     instruction: ''
//   });
  
//   // Procedures
//   const [selectedProcedures, setSelectedProcedures] = useState([]);
//   const [radiologyProcedures, setRadiologyProcedures] = useState([]);
//   const [laboratoryProcedures, setLaboratoryProcedures] = useState([]);
//   const [medicalProcedures, setMedicalProcedures] = useState([]);
//   const [searchRadiology, setSearchRadiology] = useState('');
//   const [searchLaboratory, setSearchLaboratory] = useState('');
//   const [searchMedical, setSearchMedical] = useState('');

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       //console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== VISIT OPERATIONS ====================
//   const startVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/start`, { method: 'PUT' });
//       setCurrentStatus('IN_PROGRESS');
//       alert('Visit started successfully');
//     } catch (err) {
//       setError('Failed to start visit: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch]);

//   const closeVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/close`, { method: 'PUT' });
//       alert('Visit closed successfully');
//       if (onClose) onClose();
//     } catch (err) {
//       setError('Failed to close visit: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, onClose]);

//   const saveVisitDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const body = {
//         chiefComplaint,
//         history,
//         medications,
//         allergies,
//         doctorNotes,
//         status: dischargeStatus
//       };
      
//       await apiFetch(`/api/visits/${visitId}/details`, {
//         method: 'PUT',
//         body: JSON.stringify(body)
//       });
      
//       setIsSaved(true);
//       alert('Visit details saved successfully');
//     } catch (err) {
//       setError('Failed to save: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, chiefComplaint, history, medications, allergies, doctorNotes, dischargeStatus, apiFetch]);

//   // ==================== DRUG OPERATIONS ====================
//   const searchDrugs = useCallback(async () => {
//     if (!searchQuery.trim()) return;
//     try {
//       const results = await apiFetch(
//         `/api/drugs/autocomplete?name=${encodeURIComponent(searchQuery)}`
//       );
//       setDrugSearchResults(results || []);
//     } catch (err) {
//       setError('Failed to search drugs: ' + err.message);
//     }
//   }, [searchQuery, apiFetch]);

//   const addDrugToVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs`, {
//         method: 'POST',
//         body: JSON.stringify([drugId])
//       });
//       await loadVisitDrugs();
//       alert('Drug added successfully');
//     } catch (err) {
//       setError('Failed to add drug: ' + err.message);
//     }
//   }, [visitId, apiFetch]);

//   const removeDrugFromVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs/${drugId}`, {
//         method: 'DELETE'
//       });
//       await loadVisitDrugs();
//       alert('Drug removed successfully');
//     } catch (err) {
//       setError('Failed to remove drug: ' + err.message);
//     }
//   }, [visitId, apiFetch]);

//   const loadVisitDrugs = useCallback(async () => {
//     try {
//       const drugs = await apiFetch(`/api/visits/${visitId}/drugs`);
//       setVisitDrugs(drugs || []);
//     } catch (err) {
//       //console.error('Failed to load visit drugs:', err);
//     }
//   }, [visitId, apiFetch]);

//   // ==================== FAVORITE DRUGS ====================
//   const loadFavorites = useCallback(async () => {
//     try {
//       const favorites = await apiFetch(`/api/doctors/${doctorId}/favorites`);
//       const favoriteIds = Array.isArray(favorites) ? favorites : [];
      
//       if (favoriteIds.length > 0) {
//         const drugDetails = await apiFetch('/api/drugs/by-ids', {
//           method: 'POST',
//           body: JSON.stringify(favoriteIds)
//         });
//         setFavoriteDrugs(drugDetails || []);
//       } else {
//         setFavoriteDrugs([]);
//       }
//     } catch (err) {
//       //console.error('Failed to load favorites:', err);
//     }
//   }, [doctorId, apiFetch]);

//   const toggleFavorite = useCallback(async (drugId) => {
//     try {
//       const isFavorite = favoriteDrugs.some(d => d.drugId === drugId);
//       const endpoint = `/api/doctors/${doctorId}/favorites`;
      
//       if (isFavorite) {
//         await apiFetch(endpoint, {
//           method: 'DELETE',
//           body: JSON.stringify([drugId])
//         });
//       } else {
//         await apiFetch(endpoint, {
//           method: 'POST',
//           body: JSON.stringify([drugId])
//         });
//       }
//       await loadFavorites();
//     } catch (err) {
//       setError('Failed to toggle favorite: ' + err.message);
//     }
//   }, [doctorId, favoriteDrugs, apiFetch, loadFavorites]);

//   // ==================== PRESCRIPTIONS ====================
//   const loadFrequencies = useCallback(async () => {
//     try {
//       const data = await apiFetch('/api/repetitions');
//       setFrequencies(data || []);
//     } catch (err) {
//       //console.error('Failed to load frequencies:', err);
//     }
//   }, [apiFetch]);

//   const savePrescription = useCallback(async () => {
//     if (!selectedDrugId) return;
    
//     const { duration, durationType, frequency, dose, instruction } = prescriptionData;
//     if (!duration || !durationType || !frequency) {
//       alert('Please fill all required fields');
//       return;
//     }
    
//     try {
//       const body = {
//         drugId: selectedDrugId,
//         duration,
//         durationType: DURATION_TYPES.indexOf(durationType) + 1,
//         frequencyId: frequency.id,
//         frequency: frequency.repetitionDesc,
//         dose: dose || '',
//         instruction: instruction || ''
//       };
      
//       await apiFetch(`/api/visits/${visitId}/drug-prescriptions`, {
//         method: 'POST',
//         body: JSON.stringify(body)
//       });
      
//       alert('Prescription saved successfully');
//       setShowPrescriptionDialog(false);
//       setSelectedDrugId(null);
//       setPrescriptionData({ duration: '', durationType: '', frequency: null, dose: '', instruction: '' });
//     } catch (err) {
//       setError('Failed to save prescription: ' + err.message);
//     }
//   }, [visitId, selectedDrugId, prescriptionData, apiFetch]);

//   const showPrescription = useCallback(async (drugId) => {
//     try {
//       const prescriptions = await apiFetch(`/api/visits/${visitId}/drug-prescriptions`);
//       const found = prescriptions?.find(p => p.drugId === drugId);
      
//       if (!found) {
//         alert('No prescription found for this drug');
//         return;
//       }
      
//       const message = `
//         Drug: ${found.tradeName || 'Unknown'}
//         Dose: ${found.dose || 'Not specified'}
//         Duration: ${found.duration || 'Not specified'}
//         Duration Type: ${mapDurationType(found.durationType)}
//         Frequency: ${found.frequency || 'Not specified'}
//         Instruction: ${found.instructions || 'Not specified'}
//       `;
//       alert(message);
//     } catch (err) {
//       setError('Failed to load prescription: ' + err.message);
//     }
//   }, [visitId, apiFetch]);

//   const mapDurationType = (type) => {
//     const types = ['Hour', 'Day', 'Week', 'Month', 'Year'];
//     return types[parseInt(type) - 1] || '-';
//   };

//   // ==================== PROCEDURE OPERATIONS ====================
//   const loadProcedures = useCallback(async (category) => {
//     try {
//       const data = await apiFetch(`/api/procedures?category=${category}`);
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       //console.error(`Failed to load ${category} procedures:`, err);
//     }
//   }, [apiFetch]);

//   const searchProcedures = useCallback(async (category, query) => {
//     if (!query.trim()) {
//       loadProcedures(category);
//       return;
//     }
    
//     try {
//       const data = await apiFetch(
//         `/api/procedures/search?category=${category}&name=${encodeURIComponent(query)}`
//       );
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       setError(`Failed to search ${category} procedures: ` + err.message);
//     }
//   }, [apiFetch, loadProcedures]);

//   const addProcedureToVisit = useCallback(async (procedure) => {
//     if (!procedure || selectedProcedures.includes(procedure)) {
//       if (selectedProcedures.includes(procedure)) {
//         alert('Procedure already selected');
//       }
//       return;
//     }
    
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'POST' }
//       );
//       await loadSelectedProcedures();
//     } catch (err) {
//       setError('Failed to add procedure: ' + err.message);
//     }
//   }, [visitId, selectedProcedures, apiFetch]);

//   const removeProcedureFromVisit = useCallback(async (procedure) => {
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'DELETE' }
//       );
//       await loadSelectedProcedures();
//     } catch (err) {
//       setError('Failed to remove procedure: ' + err.message);
//     }
//   }, [visitId, apiFetch]);

//   const loadSelectedProcedures = useCallback(async () => {
//     try {
//       const data = await apiFetch(`/visits/${visitId}/procedures`);
//       setSelectedProcedures(data || []);
//     } catch (err) {
//       //console.error('Failed to load selected procedures:', err);
//     }
//   }, [visitId, apiFetch]);

//   // ==================== LOAD DATA ====================
//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([
//         loadVisitDrugs(),
//         loadFavorites(),
//         loadSelectedProcedures(),
//         loadFrequencies(),
//         loadProcedures('RADIOLOGY'),
//         loadProcedures('LABORATORY'),
//         loadProcedures('MEDICAL')
//       ]);
//     };
    
//     loadData();
//   }, [loadVisitDrugs, loadFavorites, loadSelectedProcedures, loadFrequencies, loadProcedures]);

//   // ==================== RENDER HELPERS ====================
//   const renderStatusBadge = (status) => {
//     const colors = {
//       'NEW': '#e74c3c',
//       'IN_PROGRESS': '#f39c12',
//       'CLOSED': '#27ae60'
//     };
//     return (
//       <span className="status-badge" style={{ backgroundColor: colors[status] || '#3498db' }}>
//         {status}
//       </span>
//     );
//   };

//   // ==================== PRESCRIPTION DIALOG ====================
//   const renderPrescriptionDialog = () => {
//     if (!showPrescriptionDialog) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowPrescriptionDialog(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <h3>📋 Drug Prescription</h3>
//           <div className="form-group">
//             <label>Duration *</label>
//             <input
//               type="number"
//               placeholder="Enter duration"
//               value={prescriptionData.duration}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>Duration Type *</label>
//             <select
//               value={prescriptionData.durationType}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, durationType: e.target.value })}
//             >
//               <option value="">Select duration type</option>
//               {DURATION_TYPES.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Frequency *</label>
//             <select
//               value={prescriptionData.frequency?.id || ''}
//               onChange={(e) => {
//                 const freq = frequencies.find(f => f.id === parseInt(e.target.value));
//                 setPrescriptionData({ ...prescriptionData, frequency: freq });
//               }}
//             >
//               <option value="">Select frequency</option>
//               {frequencies.map((freq) => (
//                 <option key={freq.id} value={freq.id}>
//                   {freq.repetitionDesc}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Dose</label>
//             <input
//               type="text"
//               placeholder="Enter dose"
//               value={prescriptionData.dose}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, dose: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>Instruction</label>
//             <textarea
//               placeholder="Enter instruction"
//               value={prescriptionData.instruction}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, instruction: e.target.value })}
//               rows={3}
//             />
//           </div>
//           <div className="modal-actions">
//             <button className="btn-cancel" onClick={() => setShowPrescriptionDialog(false)}>
//               Cancel
//             </button>
//             <button className="btn-save" onClick={savePrescription}>
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   return (
//     <div className="doctor-visit-screen">
//       {error && (
//         <div className="error-banner">
//           ⚠️ {error}
//           <button onClick={() => setError(null)}>✖</button>
//         </div>
//       )}
      
//       <div className="visit-header">
//         <h2>🩺 Visit #{visitId}</h2>
//         <div className="header-actions">
//           {renderStatusBadge(currentStatus)}
//           <button 
//             className={`btn-start ${currentStatus !== 'NEW' ? 'disabled' : ''}`}
//             onClick={startVisit}
//             disabled={currentStatus !== 'NEW' || loading}
//           >
//             ▶ Start Visit
//           </button>
//           <button 
//             className="btn-save"
//             onClick={saveVisitDetails}
//             disabled={loading}
//           >
//             💾 Save
//           </button>
//           <button 
//             className={`btn-close ${currentStatus !== 'IN_PROGRESS' ? 'disabled' : ''}`}
//             onClick={closeVisit}
//             disabled={currentStatus !== 'IN_PROGRESS' || loading}
//           >
//             ✖ Close Visit
//           </button>
//         </div>
//       </div>

//       {/* ==================== TABS - FIXED ==================== */}
//       <div className="tabs">
//         <button 
//           className={`tab ${activeTab === 'visit' ? 'active' : ''}`}
//           onClick={() => setActiveTab('visit')}
//         >
//           📋 Visit Details
//         </button>
//         <button 
//           className={`tab ${activeTab === 'drugs' ? 'active' : ''}`}
//           onClick={() => {
//             // Allow access even for NEW visits
//             setActiveTab('drugs');
//           }}
//         >
//           💊 Drugs
//         </button>
//         <button 
//           className={`tab ${activeTab === 'procedures' ? 'active' : ''}`}
//           onClick={() => {
//             // Allow access even for NEW visits
//             setActiveTab('procedures');
//           }}
//         >
//           🔬 Procedures
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'visit' && (
//           <div className="visit-tab">
//             <div className="form-group">
//               <label>🩺 Chief Complaint</label>
//               <textarea
//                 value={chiefComplaint}
//                 onChange={(e) => setChiefComplaint(e.target.value)}
//                 placeholder="Enter chief complaint..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📜 History</label>
//               <textarea
//                 value={history}
//                 onChange={(e) => setHistory(e.target.value)}
//                 placeholder="Enter history..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>💊 Medications</label>
//               <textarea
//                 value={medications}
//                 onChange={(e) => setMedications(e.target.value)}
//                 placeholder="Enter medications..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>⚠️ Allergies</label>
//               <textarea
//                 value={allergies}
//                 onChange={(e) => setAllergies(e.target.value)}
//                 placeholder="Enter allergies..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📝 Doctor Notes</label>
//               <textarea
//                 value={doctorNotes}
//                 onChange={(e) => setDoctorNotes(e.target.value)}
//                 placeholder="Enter doctor notes..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📌 Discharge Status</label>
//               <select
//                 value={dischargeStatus}
//                 onChange={(e) => setDischargeStatus(e.target.value)}
//               >
//                 {DISCHARGE_STATUSES.map((status) => (
//                   <option key={status} value={status}>
//                     {status.replace('_', ' ')}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}

//         {activeTab === 'drugs' && (
//           <div className="drugs-tab">
//             <div className="search-section">
//               <h3>🔍 Search Drugs</h3>
//               <div className="search-box">
//                 <input
//                   type="text"
//                   placeholder="Search drugs..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && searchDrugs()}
//                 />
//                 <button onClick={searchDrugs}>🔍 Search</button>
//               </div>
//             </div>

//             <div className="drug-results">
//               <h4>📋 Search Results</h4>
//               <div className="drug-list">
//                 {drugSearchResults.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         ➕
//                       </button>
//                       <button 
//                         className="btn-star"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                         style={{ color: favoriteDrugs.some(d => d.drugId === drug.drugId) ? 'gold' : 'gray' }}
//                       >
//                         {favoriteDrugs.some(d => d.drugId === drug.drugId) ? '★' : '☆'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="favorites-section">
//               <h4>⭐ Favorite Drugs</h4>
//               <div className="drug-list">
//                 {favoriteDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         ➕
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="visit-drugs-section">
//               <h4>💊 Selected Drugs</h4>
//               <div className="drug-list">
//                 {visitDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-prescription"
//                         onClick={() => {
//                           setSelectedDrugId(drug.drugId);
//                           setShowPrescriptionDialog(true);
//                         }}
//                       >
//                         📋
//                       </button>
//                       <button 
//                         className="btn-view"
//                         onClick={() => showPrescription(drug.drugId)}
//                       >
//                         👁
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => removeDrugFromVisit(drug.drugId)}
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'procedures' && (
//           <div className="procedures-tab">
//             <div className="procedure-categories">
//               <div className="procedure-category">
//                 <h4>📡 Radiology</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search radiology..."
//                     value={searchRadiology}
//                     onChange={(e) => setSearchRadiology(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('RADIOLOGY', searchRadiology)}
//                   />
//                   <button onClick={() => searchProcedures('RADIOLOGY', searchRadiology)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {radiologyProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>🧫 Laboratory</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search laboratory..."
//                     value={searchLaboratory}
//                     onChange={(e) => setSearchLaboratory(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('LABORATORY', searchLaboratory)}
//                   />
//                   <button onClick={() => searchProcedures('LABORATORY', searchLaboratory)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {laboratoryProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>🩺 Medical</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search medical..."
//                     value={searchMedical}
//                     onChange={(e) => setSearchMedical(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('MEDICAL', searchMedical)}
//                   />
//                   <button onClick={() => searchProcedures('MEDICAL', searchMedical)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {medicalProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="selected-procedures">
//               <h4>📋 Selected Procedures</h4>
//               <div className="procedure-list">
//                 {selectedProcedures.map((proc) => (
//                   <div key={proc} className="procedure-item selected">
//                     <span>{proc}</span>
//                     <button className="btn-remove" onClick={() => removeProcedureFromVisit(proc)}>✖</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {renderPrescriptionDialog()}
//     </div>
//   );
// };

// export default DoctorVisitScreen;

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorVisitScreen.css';

// // Constants
// const DISCHARGE_STATUSES = ['NOT_DISCHARGED', 'DISCHARGED', 'FOLLOW_UP_REQUIRED', 'REFERRED'];
// const DURATION_TYPES = ['Hour', 'Day', 'Week', 'Month', 'Year'];

// const DoctorVisitScreen = ({ doctorId, visitId, initialStatus = 'NEW', username, onClose }) => {
//   // ==================== STATE ====================
//   const [currentStatus, setCurrentStatus] = useState(initialStatus);
//   const [activeTab, setActiveTab] = useState('visit');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);
  
//   // Visit Details
//   const [chiefComplaint, setChiefComplaint] = useState('');
//   const [history, setHistory] = useState('');
//   const [medications, setMedications] = useState('');
//   const [allergies, setAllergies] = useState('');
//   const [doctorNotes, setDoctorNotes] = useState('');
//   const [dischargeStatus, setDischargeStatus] = useState('NOT_DISCHARGED');
  
//   // Drugs
//   const [searchQuery, setSearchQuery] = useState('');
//   const [drugSearchResults, setDrugSearchResults] = useState([]);
//   const [favoriteDrugs, setFavoriteDrugs] = useState([]);
//   const [visitDrugs, setVisitDrugs] = useState([]);
//   const [frequencies, setFrequencies] = useState([]);
  
//   // Prescription Dialog
//   const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
//   const [selectedDrugId, setSelectedDrugId] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     duration: '',
//     durationType: '',
//     frequency: null,
//     dose: '',
//     instruction: ''
//   });
  
//   // Procedures
//   const [selectedProcedures, setSelectedProcedures] = useState([]);
//   const [radiologyProcedures, setRadiologyProcedures] = useState([]);
//   const [laboratoryProcedures, setLaboratoryProcedures] = useState([]);
//   const [medicalProcedures, setMedicalProcedures] = useState([]);
//   const [searchRadiology, setSearchRadiology] = useState('');
//   const [searchLaboratory, setSearchLaboratory] = useState('');
//   const [searchMedical, setSearchMedical] = useState('');

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       //console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== VISIT OPERATIONS ====================
//   const startVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/start`, { method: 'PUT' });
//       setCurrentStatus('IN_PROGRESS');
//       alert('Visit started successfully');
//     } catch (err) {
//       setError('Failed to start visit: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch]);

//   const closeVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/close`, { method: 'PUT' });
//       alert('Visit closed successfully');
//       if (onClose) onClose();
//     } catch (err) {
//       setError('Failed to close visit: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, onClose]);

//   const saveVisitDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const body = {
//         chiefComplaint,
//         history,
//         medications,
//         allergies,
//         doctorNotes,
//         status: dischargeStatus
//       };
      
//       await apiFetch(`/api/visits/${visitId}/details`, {
//         method: 'PUT',
//         body: JSON.stringify(body)
//       });
      
//       setIsSaved(true);
//       alert('Visit details saved successfully');
//     } catch (err) {
//       setError('Failed to save: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, chiefComplaint, history, medications, allergies, doctorNotes, dischargeStatus, apiFetch]);

//   // ==================== DRUG OPERATIONS ====================
//   const loadVisitDrugs = useCallback(async () => {
//     try {
//       const drugs = await apiFetch(`/api/visits/${visitId}/drugs`);
//       setVisitDrugs(drugs || []);
//     } catch (err) {
//       //console.error('Failed to load visit drugs:', err);
//     }
//   }, [visitId, apiFetch]);

//   const searchDrugs = useCallback(async () => {
//     if (!searchQuery.trim()) return;
//     try {
//       const results = await apiFetch(
//         `/api/drugs/autocomplete?name=${encodeURIComponent(searchQuery)}`
//       );
//       setDrugSearchResults(results || []);
//     } catch (err) {
//       setError('Failed to search drugs: ' + err.message);
//     }
//   }, [searchQuery, apiFetch]);

//   const addDrugToVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs`, {
//         method: 'POST',
//         body: JSON.stringify([drugId])
//       });
//       await loadVisitDrugs();
//       alert('Drug added successfully');
//     } catch (err) {
//       setError('Failed to add drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs]);

//   const removeDrugFromVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs/${drugId}`, {
//         method: 'DELETE'
//       });
//       await loadVisitDrugs();
//       alert('Drug removed successfully');
//     } catch (err) {
//       setError('Failed to remove drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs]);

//   // ==================== FAVORITE DRUGS ====================
//   const loadFavorites = useCallback(async () => {
//     try {
//       const favorites = await apiFetch(`/api/doctors/${doctorId}/favorites`);
//       const favoriteIds = Array.isArray(favorites) ? favorites : [];
      
//       if (favoriteIds.length > 0) {
//         const drugDetails = await apiFetch('/api/drugs/by-ids', {
//           method: 'POST',
//           body: JSON.stringify(favoriteIds)
//         });
//         setFavoriteDrugs(drugDetails || []);
//       } else {
//         setFavoriteDrugs([]);
//       }
//     } catch (err) {
//       //console.error('Failed to load favorites:', err);
//     }
//   }, [doctorId, apiFetch]);

//   const toggleFavorite = useCallback(async (drugId) => {
//     try {
//       const isFavorite = favoriteDrugs.some(d => d.drugId === drugId);
//       const endpoint = `/api/doctors/${doctorId}/favorites`;
      
//       if (isFavorite) {
//         await apiFetch(endpoint, {
//           method: 'DELETE',
//           body: JSON.stringify([drugId])
//         });
//       } else {
//         await apiFetch(endpoint, {
//           method: 'POST',
//           body: JSON.stringify([drugId])
//         });
//       }
//       await loadFavorites();
//     } catch (err) {
//       setError('Failed to toggle favorite: ' + err.message);
//     }
//   }, [doctorId, favoriteDrugs, apiFetch, loadFavorites]);

//   // ==================== PRESCRIPTIONS ====================
//   const loadFrequencies = useCallback(async () => {
//     try {
//       const data = await apiFetch('/api/repetitions');
//       setFrequencies(data || []);
//     } catch (err) {
//       //console.error('Failed to load frequencies:', err);
//     }
//   }, [apiFetch]);

//   const mapDurationType = useCallback((type) => {
//     const types = ['Hour', 'Day', 'Week', 'Month', 'Year'];
//     return types[parseInt(type) - 1] || '-';
//   }, []);

//   const savePrescription = useCallback(async () => {
//     if (!selectedDrugId) return;
    
//     const { duration, durationType, frequency, dose, instruction } = prescriptionData;
//     if (!duration || !durationType || !frequency) {
//       alert('Please fill all required fields');
//       return;
//     }
    
//     try {
//       const body = {
//         drugId: selectedDrugId,
//         duration,
//         durationType: DURATION_TYPES.indexOf(durationType) + 1,
//         frequencyId: frequency.id,
//         frequency: frequency.repetitionDesc,
//         dose: dose || '',
//         instruction: instruction || ''
//       };
      
//       await apiFetch(`/api/visits/${visitId}/drug-prescriptions`, {
//         method: 'POST',
//         body: JSON.stringify(body)
//       });
      
//       alert('Prescription saved successfully');
//       setShowPrescriptionDialog(false);
//       setSelectedDrugId(null);
//       setPrescriptionData({ duration: '', durationType: '', frequency: null, dose: '', instruction: '' });
//     } catch (err) {
//       setError('Failed to save prescription: ' + err.message);
//     }
//   }, [visitId, selectedDrugId, prescriptionData, apiFetch]);

//   const showPrescription = useCallback(async (drugId) => {
//     try {
//       const prescriptions = await apiFetch(`/api/visits/${visitId}/drug-prescriptions`);
//       const found = prescriptions?.find(p => p.drugId === drugId);
      
//       if (!found) {
//         alert('No prescription found for this drug');
//         return;
//       }
      
//       const message = `
//         Drug: ${found.tradeName || 'Unknown'}
//         Dose: ${found.dose || 'Not specified'}
//         Duration: ${found.duration || 'Not specified'}
//         Duration Type: ${mapDurationType(found.durationType)}
//         Frequency: ${found.frequency || 'Not specified'}
//         Instruction: ${found.instructions || 'Not specified'}
//       `;
//       alert(message);
//     } catch (err) {
//       setError('Failed to load prescription: ' + err.message);
//     }
//   }, [visitId, apiFetch, mapDurationType]);

//   // ==================== PROCEDURE OPERATIONS ====================
//   const loadProcedures = useCallback(async (category) => {
//     try {
//       const data = await apiFetch(`/api/procedures?category=${category}`);
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       //console.error(`Failed to load ${category} procedures:`, err);
//     }
//   }, [apiFetch]);

//   const searchProcedures = useCallback(async (category, query) => {
//     if (!query.trim()) {
//       loadProcedures(category);
//       return;
//     }
    
//     try {
//       const data = await apiFetch(
//         `/api/procedures/search?category=${category}&name=${encodeURIComponent(query)}`
//       );
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       setError(`Failed to search ${category} procedures: ` + err.message);
//     }
//   }, [apiFetch, loadProcedures]);

//   const loadSelectedProcedures = useCallback(async () => {
//     try {
//       const data = await apiFetch(`/visits/${visitId}/procedures`);
//       setSelectedProcedures(data || []);
//     } catch (err) {
//       //console.error('Failed to load selected procedures:', err);
//     }
//   }, [visitId, apiFetch]);

//   const addProcedureToVisit = useCallback(async (procedure) => {
//     if (!procedure || selectedProcedures.includes(procedure)) {
//       if (selectedProcedures.includes(procedure)) {
//         alert('Procedure already selected');
//       }
//       return;
//     }
    
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'POST' }
//       );
//       await loadSelectedProcedures();
//     } catch (err) {
//       setError('Failed to add procedure: ' + err.message);
//     }
//   }, [visitId, selectedProcedures, apiFetch, loadSelectedProcedures]);

//   const removeProcedureFromVisit = useCallback(async (procedure) => {
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'DELETE' }
//       );
//       await loadSelectedProcedures();
//     } catch (err) {
//       setError('Failed to remove procedure: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadSelectedProcedures]);

//   // ==================== LOAD DATA ====================
//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([
//         loadVisitDrugs(),
//         loadFavorites(),
//         loadSelectedProcedures(),
//         loadFrequencies(),
//         loadProcedures('RADIOLOGY'),
//         loadProcedures('LABORATORY'),
//         loadProcedures('MEDICAL')
//       ]);
//     };
    
//     loadData();
//   }, [loadVisitDrugs, loadFavorites, loadSelectedProcedures, loadFrequencies, loadProcedures]);

//   // ==================== RENDER HELPERS ====================
//   const renderStatusBadge = (status) => {
//     const colors = {
//       'NEW': '#e74c3c',
//       'IN_PROGRESS': '#f39c12',
//       'CLOSED': '#27ae60'
//     };
//     return (
//       <span className="status-badge" style={{ backgroundColor: colors[status] || '#3498db' }}>
//         {status}
//       </span>
//     );
//   };

//   // ==================== PRESCRIPTION DIALOG ====================
//   const renderPrescriptionDialog = () => {
//     if (!showPrescriptionDialog) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowPrescriptionDialog(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <h3>📋 Drug Prescription</h3>
//           <div className="form-group">
//             <label>Duration *</label>
//             <input
//               type="number"
//               placeholder="Enter duration"
//               value={prescriptionData.duration}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>Duration Type *</label>
//             <select
//               value={prescriptionData.durationType}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, durationType: e.target.value })}
//             >
//               <option value="">Select duration type</option>
//               {DURATION_TYPES.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Frequency *</label>
//             <select
//               value={prescriptionData.frequency?.id || ''}
//               onChange={(e) => {
//                 const freq = frequencies.find(f => f.id === parseInt(e.target.value));
//                 setPrescriptionData({ ...prescriptionData, frequency: freq });
//               }}
//             >
//               <option value="">Select frequency</option>
//               {frequencies.map((freq) => (
//                 <option key={freq.id} value={freq.id}>
//                   {freq.repetitionDesc}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Dose</label>
//             <input
//               type="text"
//               placeholder="Enter dose"
//               value={prescriptionData.dose}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, dose: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>Instruction</label>
//             <textarea
//               placeholder="Enter instruction"
//               value={prescriptionData.instruction}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, instruction: e.target.value })}
//               rows={3}
//             />
//           </div>
//           <div className="modal-actions">
//             <button className="btn-cancel" onClick={() => setShowPrescriptionDialog(false)}>
//               Cancel
//             </button>
//             <button className="btn-save" onClick={savePrescription}>
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   return (
//     <div className="doctor-visit-screen">
//       {error && (
//         <div className="error-banner">
//           ⚠️ {error}
//           <button onClick={() => setError(null)}>✖</button>
//         </div>
//       )}
      
//       <div className="visit-header">
//         <h2>🩺 Visit #{visitId}</h2>
//         <div className="header-actions">
//           {renderStatusBadge(currentStatus)}
//           <button 
//             className={`btn-start ${currentStatus !== 'NEW' ? 'disabled' : ''}`}
//             onClick={startVisit}
//             disabled={currentStatus !== 'NEW' || loading}
//           >
//             ▶ Start Visit
//           </button>
//           <button 
//             className="btn-save"
//             onClick={saveVisitDetails}
//             disabled={loading}
//           >
//             💾 Save
//           </button>
//           <button 
//             className={`btn-close ${currentStatus !== 'IN_PROGRESS' ? 'disabled' : ''}`}
//             onClick={closeVisit}
//             disabled={currentStatus !== 'IN_PROGRESS' || loading}
//           >
//             ✖ Close Visit
//           </button>
//           {/* ====== EXIT BUTTON ADDED HERE ====== */}
//           <button 
//             className="btn-exit"
//             onClick={onClose}
//           >
//             ✖ Exit
//           </button>
//         </div>
//       </div>

//       {/* ==================== TABS ==================== */}
//       <div className="tabs">
//         <button 
//           className={`tab ${activeTab === 'visit' ? 'active' : ''}`}
//           onClick={() => setActiveTab('visit')}
//         >
//           📋 Visit Details
//         </button>
//         <button 
//           className={`tab ${activeTab === 'drugs' ? 'active' : ''}`}
//           onClick={() => setActiveTab('drugs')}
//         >
//           💊 Drugs
//         </button>
//         <button 
//           className={`tab ${activeTab === 'procedures' ? 'active' : ''}`}
//           onClick={() => setActiveTab('procedures')}
//         >
//           🔬 Procedures
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'visit' && (
//           <div className="visit-tab">
//             <div className="form-group">
//               <label>🩺 Chief Complaint</label>
//               <textarea
//                 value={chiefComplaint}
//                 onChange={(e) => setChiefComplaint(e.target.value)}
//                 placeholder="Enter chief complaint..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📜 History</label>
//               <textarea
//                 value={history}
//                 onChange={(e) => setHistory(e.target.value)}
//                 placeholder="Enter history..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>💊 Medications</label>
//               <textarea
//                 value={medications}
//                 onChange={(e) => setMedications(e.target.value)}
//                 placeholder="Enter medications..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>⚠️ Allergies</label>
//               <textarea
//                 value={allergies}
//                 onChange={(e) => setAllergies(e.target.value)}
//                 placeholder="Enter allergies..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📝 Doctor Notes</label>
//               <textarea
//                 value={doctorNotes}
//                 onChange={(e) => setDoctorNotes(e.target.value)}
//                 placeholder="Enter doctor notes..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📌 Discharge Status</label>
//               <select
//                 value={dischargeStatus}
//                 onChange={(e) => setDischargeStatus(e.target.value)}
//               >
//                 {DISCHARGE_STATUSES.map((status) => (
//                   <option key={status} value={status}>
//                     {status.replace('_', ' ')}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}

//         {activeTab === 'drugs' && (
//           <div className="drugs-tab">
//             <div className="search-section">
//               <h3>🔍 Search Drugs</h3>
//               <div className="search-box">
//                 <input
//                   type="text"
//                   placeholder="Search drugs..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && searchDrugs()}
//                 />
//                 <button onClick={searchDrugs}>🔍 Search</button>
//               </div>
//             </div>

//             <div className="drug-results">
//               <h4>📋 Search Results</h4>
//               <div className="drug-list">
//                 {drugSearchResults.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         ➕
//                       </button>
//                       <button 
//                         className="btn-star"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                         style={{ color: favoriteDrugs.some(d => d.drugId === drug.drugId) ? 'gold' : 'gray' }}
//                       >
//                         {favoriteDrugs.some(d => d.drugId === drug.drugId) ? '★' : '☆'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="favorites-section">
//               <h4>⭐ Favorite Drugs</h4>
//               <div className="drug-list">
//                 {favoriteDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         ➕
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="visit-drugs-section">
//               <h4>💊 Selected Drugs</h4>
//               <div className="drug-list">
//                 {visitDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-prescription"
//                         onClick={() => {
//                           setSelectedDrugId(drug.drugId);
//                           setShowPrescriptionDialog(true);
//                         }}
//                       >
//                         📋
//                       </button>
//                       <button 
//                         className="btn-view"
//                         onClick={() => showPrescription(drug.drugId)}
//                       >
//                         👁
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => removeDrugFromVisit(drug.drugId)}
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'procedures' && (
//           <div className="procedures-tab">
//             <div className="procedure-categories">
//               <div className="procedure-category">
//                 <h4>📡 Radiology</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search radiology..."
//                     value={searchRadiology}
//                     onChange={(e) => setSearchRadiology(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('RADIOLOGY', searchRadiology)}
//                   />
//                   <button onClick={() => searchProcedures('RADIOLOGY', searchRadiology)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {radiologyProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>🧫 Laboratory</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search laboratory..."
//                     value={searchLaboratory}
//                     onChange={(e) => setSearchLaboratory(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('LABORATORY', searchLaboratory)}
//                   />
//                   <button onClick={() => searchProcedures('LABORATORY', searchLaboratory)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {laboratoryProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>🩺 Medical</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search medical..."
//                     value={searchMedical}
//                     onChange={(e) => setSearchMedical(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('MEDICAL', searchMedical)}
//                   />
//                   <button onClick={() => searchProcedures('MEDICAL', searchMedical)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {medicalProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="selected-procedures">
//               <h4>📋 Selected Procedures</h4>
//               <div className="procedure-list">
//                 {selectedProcedures.map((proc) => (
//                   <div key={proc} className="procedure-item selected">
//                     <span>{proc}</span>
//                     <button className="btn-remove" onClick={() => removeProcedureFromVisit(proc)}>✖</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {renderPrescriptionDialog()}
//     </div>
//   );
// };

// export default DoctorVisitScreen; 04072026  8:45 pm



// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorVisitScreen.css';

// // Constants
// const DISCHARGE_STATUSES = ['NOT_DISCHARGED', 'DISCHARGED', 'FOLLOW_UP_REQUIRED', 'REFERRED'];
// const DURATION_TYPES = ['Hour', 'Day', 'Week', 'Month', 'Year'];

// const DoctorVisitScreen = ({ doctorId, visitId, initialStatus = 'NEW', username, onClose }) => {
//   // ==================== STATE ====================
//   const [currentStatus, setCurrentStatus] = useState(initialStatus);
//   const [activeTab, setActiveTab] = useState('visit');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);
  
//   // Visit Details
//   const [chiefComplaint, setChiefComplaint] = useState('');
//   const [history, setHistory] = useState('');
//   const [medications, setMedications] = useState('');
//   const [allergies, setAllergies] = useState('');
//   const [doctorNotes, setDoctorNotes] = useState('');
//   const [dischargeStatus, setDischargeStatus] = useState('NOT_DISCHARGED');
  
//   // Drugs
//   const [searchQuery, setSearchQuery] = useState('');
//   const [drugSearchResults, setDrugSearchResults] = useState([]);
//   const [favoriteDrugs, setFavoriteDrugs] = useState([]);
//   const [visitDrugs, setVisitDrugs] = useState([]);
//   const [frequencies, setFrequencies] = useState([]);
  
//   // Prescription Dialog
//   const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
//   const [selectedDrugId, setSelectedDrugId] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     duration: '',
//     durationType: '',
//     frequency: null,
//     dose: '',
//     instruction: ''
//   });
  
//   // Procedures
//   const [selectedProcedures, setSelectedProcedures] = useState([]);
//   const [radiologyProcedures, setRadiologyProcedures] = useState([]);
//   const [laboratoryProcedures, setLaboratoryProcedures] = useState([]);
//   const [medicalProcedures, setMedicalProcedures] = useState([]);
//   const [searchRadiology, setSearchRadiology] = useState('');
//   const [searchLaboratory, setSearchLaboratory] = useState('');
//   const [searchMedical, setSearchMedical] = useState('');

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       //console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== VISIT OPERATIONS ====================
//   const startVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/start`, { method: 'PUT' });
//       setCurrentStatus('IN_PROGRESS');
//       alert('Visit started successfully');
//     } catch (err) {
//       setError('Failed to start visit: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch]);

//   const closeVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/close`, { method: 'PUT' });
//       alert('Visit closed successfully');
//       if (onClose) onClose();
//     } catch (err) {
//       setError('Failed to close visit: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, onClose]);

//   const saveVisitDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const body = {
//         chiefComplaint,
//         history,
//         medications,
//         allergies,
//         doctorNotes,
//         status: dischargeStatus
//       };
      
//       await apiFetch(`/api/visits/${visitId}/details`, {
//         method: 'PUT',
//         body: JSON.stringify(body)
//       });
      
//       setIsSaved(true);
//       alert('Visit details saved successfully');
//     } catch (err) {
//       setError('Failed to save: ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, chiefComplaint, history, medications, allergies, doctorNotes, dischargeStatus, apiFetch]);

//   // ==================== DRUG OPERATIONS ====================
//   const loadVisitDrugs = useCallback(async () => {
//     try {
//       const drugs = await apiFetch(`/api/visits/${visitId}/drugs`);
//       setVisitDrugs(drugs || []);
//     } catch (err) {
//       //console.error('Failed to load visit drugs:', err);
//     }
//   }, [visitId, apiFetch]);

//   const searchDrugs = useCallback(async () => {
//     if (!searchQuery.trim()) return;
//     try {
//       const results = await apiFetch(
//         `/api/drugs/autocomplete?name=${encodeURIComponent(searchQuery)}`
//       );
//       setDrugSearchResults(results || []);
//     } catch (err) {
//       setError('Failed to search drugs: ' + err.message);
//     }
//   }, [searchQuery, apiFetch]);

//   const addDrugToVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs`, {
//         method: 'POST',
//         body: JSON.stringify([drugId])
//       });
//       await loadVisitDrugs();
//       alert('Drug added successfully');
//     } catch (err) {
//       setError('Failed to add drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs]);

//   const removeDrugFromVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs/${drugId}`, {
//         method: 'DELETE'
//       });
//       await loadVisitDrugs();
//       alert('Drug removed successfully');
//     } catch (err) {
//       setError('Failed to remove drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs]);

//   // ==================== FAVORITE DRUGS ====================
//   const loadFavorites = useCallback(async () => {
//     try {
//       const favorites = await apiFetch(`/api/doctors/${doctorId}/favorites`);
//       const favoriteIds = Array.isArray(favorites) ? favorites : [];
      
//       if (favoriteIds.length > 0) {
//         const drugDetails = await apiFetch('/api/drugs/by-ids', {
//           method: 'POST',
//           body: JSON.stringify(favoriteIds)
//         });
//         setFavoriteDrugs(drugDetails || []);
//       } else {
//         setFavoriteDrugs([]);
//       }
//     } catch (err) {
//       //console.error('Failed to load favorites:', err);
//     }
//   }, [doctorId, apiFetch]);

//   const toggleFavorite = useCallback(async (drugId) => {
//     try {
//       const isFavorite = favoriteDrugs.some(d => d.drugId === drugId);
//       const endpoint = `/api/doctors/${doctorId}/favorites`;
      
//       if (isFavorite) {
//         await apiFetch(endpoint, {
//           method: 'DELETE',
//           body: JSON.stringify([drugId])
//         });
//       } else {
//         await apiFetch(endpoint, {
//           method: 'POST',
//           body: JSON.stringify([drugId])
//         });
//       }
//       await loadFavorites();
//     } catch (err) {
//       setError('Failed to toggle favorite: ' + err.message);
//     }
//   }, [doctorId, favoriteDrugs, apiFetch, loadFavorites]);

//   // ==================== PRESCRIPTIONS ====================
//   const loadFrequencies = useCallback(async () => {
//     try {
//       const data = await apiFetch('/api/repetitions');
//       setFrequencies(data || []);
//     } catch (err) {
//       //console.error('Failed to load frequencies:', err);
//     }
//   }, [apiFetch]);

//   const mapDurationType = useCallback((type) => {
//     const types = ['Hour', 'Day', 'Week', 'Month', 'Year'];
//     return types[parseInt(type) - 1] || '-';
//   }, []);

//   const savePrescription = useCallback(async () => {
//     if (!selectedDrugId) return;
    
//     const { duration, durationType, frequency, dose, instruction } = prescriptionData;
//     if (!duration || !durationType || !frequency) {
//       alert('Please fill all required fields');
//       return;
//     }
    
//     try {
//       const body = {
//         drugId: selectedDrugId,
//         duration,
//         durationType: DURATION_TYPES.indexOf(durationType) + 1,
//         frequencyId: frequency.id,
//         frequency: frequency.repetitionDesc,
//         dose: dose || '',
//         instruction: instruction || ''
//       };
      
//       await apiFetch(`/api/visits/${visitId}/drug-prescriptions`, {
//         method: 'POST',
//         body: JSON.stringify(body)
//       });
      
//       alert('Prescription saved successfully');
//       setShowPrescriptionDialog(false);
//       setSelectedDrugId(null);
//       setPrescriptionData({ duration: '', durationType: '', frequency: null, dose: '', instruction: '' });
//     } catch (err) {
//       setError('Failed to save prescription: ' + err.message);
//     }
//   }, [visitId, selectedDrugId, prescriptionData, apiFetch]);

//   const showPrescription = useCallback(async (drugId) => {
//     try {
//       const prescriptions = await apiFetch(`/api/visits/${visitId}/drug-prescriptions`);
//       const found = prescriptions?.find(p => p.drugId === drugId);
      
//       if (!found) {
//         alert('No prescription found for this drug');
//         return;
//       }
      
//       const message = `
//         Drug: ${found.tradeName || 'Unknown'}
//         Dose: ${found.dose || 'Not specified'}
//         Duration: ${found.duration || 'Not specified'}
//         Duration Type: ${mapDurationType(found.durationType)}
//         Frequency: ${found.frequency || 'Not specified'}
//         Instruction: ${found.instructions || 'Not specified'}
//       `;
//       alert(message);
//     } catch (err) {
//       setError('Failed to load prescription: ' + err.message);
//     }
//   }, [visitId, apiFetch, mapDurationType]);

//   // ==================== PROCEDURE OPERATIONS ====================
//   const loadProcedures = useCallback(async (category) => {
//     try {
//       const data = await apiFetch(`/api/procedures?category=${category}`);
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       //console.error(`Failed to load ${category} procedures:`, err);
//     }
//   }, [apiFetch]);

//   const searchProcedures = useCallback(async (category, query) => {
//     if (!query.trim()) {
//       loadProcedures(category);
//       return;
//     }
    
//     try {
//       const data = await apiFetch(
//         `/api/procedures/search?category=${category}&name=${encodeURIComponent(query)}`
//       );
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       setError(`Failed to search ${category} procedures: ` + err.message);
//     }
//   }, [apiFetch, loadProcedures]);

//   const loadSelectedProcedures = useCallback(async () => {
//     try {
//       const data = await apiFetch(`/visits/${visitId}/procedures`);
//       setSelectedProcedures(data || []);
//     } catch (err) {
//       //console.error('Failed to load selected procedures:', err);
//     }
//   }, [visitId, apiFetch]);

//   const addProcedureToVisit = useCallback(async (procedure) => {
//     if (!procedure || selectedProcedures.includes(procedure)) {
//       if (selectedProcedures.includes(procedure)) {
//         alert('Procedure already selected');
//       }
//       return;
//     }
    
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'POST' }
//       );
//       await loadSelectedProcedures();
//     } catch (err) {
//       setError('Failed to add procedure: ' + err.message);
//     }
//   }, [visitId, selectedProcedures, apiFetch, loadSelectedProcedures]);

//   const removeProcedureFromVisit = useCallback(async (procedure) => {
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'DELETE' }
//       );
//       await loadSelectedProcedures();
//     } catch (err) {
//       setError('Failed to remove procedure: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadSelectedProcedures]);

//   // ==================== LOAD DATA ====================
//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([
//         loadVisitDrugs(),
//         loadFavorites(),
//         loadSelectedProcedures(),
//         loadFrequencies(),
//         loadProcedures('RADIOLOGY'),
//         loadProcedures('LABORATORY'),
//         loadProcedures('MEDICAL')
//       ]);
//     };
    
//     loadData();
//   }, [loadVisitDrugs, loadFavorites, loadSelectedProcedures, loadFrequencies, loadProcedures]);

//   // ==================== RENDER HELPERS ====================
//   const renderStatusBadge = (status) => {
//     const colors = {
//       'NEW': '#e74c3c',
//       'IN_PROGRESS': '#f39c12',
//       'CLOSED': '#27ae60'
//     };
//     return (
//       <span className="status-badge" style={{ backgroundColor: colors[status] || '#3498db' }}>
//         {status}
//       </span>
//     );
//   };

//   // ==================== PRESCRIPTION DIALOG ====================
//   const renderPrescriptionDialog = () => {
//     if (!showPrescriptionDialog) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowPrescriptionDialog(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <h3>📋 Drug Prescription</h3>
//           <div className="form-group">
//             <label>Duration *</label>
//             <input
//               type="number"
//               placeholder="Enter duration"
//               value={prescriptionData.duration}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>Duration Type *</label>
//             <select
//               value={prescriptionData.durationType}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, durationType: e.target.value })}
//             >
//               <option value="">Select duration type</option>
//               {DURATION_TYPES.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Frequency *</label>
//             <select
//               value={prescriptionData.frequency?.id || ''}
//               onChange={(e) => {
//                 const freq = frequencies.find(f => f.id === parseInt(e.target.value));
//                 setPrescriptionData({ ...prescriptionData, frequency: freq });
//               }}
//             >
//               <option value="">Select frequency</option>
//               {frequencies.map((freq) => (
//                 <option key={freq.id} value={freq.id}>
//                   {freq.repetitionDesc}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Dose</label>
//             <input
//               type="text"
//               placeholder="Enter dose"
//               value={prescriptionData.dose}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, dose: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>Instruction</label>
//             <textarea
//               placeholder="Enter instruction"
//               value={prescriptionData.instruction}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, instruction: e.target.value })}
//               rows={3}
//             />
//           </div>
//           <div className="modal-actions">
//             <button className="btn-cancel" onClick={() => setShowPrescriptionDialog(false)}>
//               Cancel
//             </button>
//             <button className="btn-save" onClick={savePrescription}>
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   return (
//     <div className="doctor-visit-screen">
//       {error && (
//         <div className="error-banner">
//           ⚠️ {error}
//           <button onClick={() => setError(null)}>✖</button>
//         </div>
//       )}
      
//       <div className="visit-header">
//         <h2>🩺 Visit #{visitId}</h2>
//         <div className="header-actions">
//           {renderStatusBadge(currentStatus)}
//           <button 
//             className={`btn-start ${currentStatus !== 'NEW' ? 'disabled' : ''}`}
//             onClick={startVisit}
//             disabled={currentStatus !== 'NEW' || loading}
//           >
//             ▶ Start Visit
//           </button>
//           <button 
//             className="btn-save"
//             onClick={saveVisitDetails}
//             disabled={loading}
//           >
//             💾 Save
//           </button>
//           <button 
//             className={`btn-close ${currentStatus !== 'IN_PROGRESS' ? 'disabled' : ''}`}
//             onClick={closeVisit}
//             disabled={currentStatus !== 'IN_PROGRESS' || loading}
//           >
//             ✖ Close Visit
//           </button>
//           {/* ====== EXIT BUTTON ADDED HERE ====== */}
//           <button 
//             className="btn-exit"
//             onClick={onClose}
//           >
//             ✖ Exit
//           </button>
//         </div>
//       </div>

//       {/* ==================== TABS ==================== */}
//       <div className="tabs">
//         <button 
//           className={`tab ${activeTab === 'visit' ? 'active' : ''}`}
//           onClick={() => setActiveTab('visit')}
//         >
//           📋 Visit Details
//         </button>
//         <button 
//           className={`tab ${activeTab === 'drugs' ? 'active' : ''}`}
//           onClick={() => setActiveTab('drugs')}
//         >
//           💊 Drugs
//         </button>
//         <button 
//           className={`tab ${activeTab === 'procedures' ? 'active' : ''}`}
//           onClick={() => setActiveTab('procedures')}
//         >
//           🔬 Procedures
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'visit' && (
//           <div className="visit-tab">
//             <div className="form-group">
//               <label>🩺 Chief Complaint</label>
//               <textarea
//                 value={chiefComplaint}
//                 onChange={(e) => setChiefComplaint(e.target.value)}
//                 placeholder="Enter chief complaint..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📜 History</label>
//               <textarea
//                 value={history}
//                 onChange={(e) => setHistory(e.target.value)}
//                 placeholder="Enter history..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>💊 Medications</label>
//               <textarea
//                 value={medications}
//                 onChange={(e) => setMedications(e.target.value)}
//                 placeholder="Enter medications..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>⚠️ Allergies</label>
//               <textarea
//                 value={allergies}
//                 onChange={(e) => setAllergies(e.target.value)}
//                 placeholder="Enter allergies..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📝 Doctor Notes</label>
//               <textarea
//                 value={doctorNotes}
//                 onChange={(e) => setDoctorNotes(e.target.value)}
//                 placeholder="Enter doctor notes..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>📌 Discharge Status</label>
//               <select
//                 value={dischargeStatus}
//                 onChange={(e) => setDischargeStatus(e.target.value)}
//               >
//                 {DISCHARGE_STATUSES.map((status) => (
//                   <option key={status} value={status}>
//                     {status.replace('_', ' ')}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}

//         {activeTab === 'drugs' && (
//           <div className="drugs-tab">
//             <div className="search-section">
//               <h3>🔍 Search Drugs</h3>
//               <div className="search-box">
//                 <input
//                   type="text"
//                   placeholder="Search drugs..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && searchDrugs()}
//                 />
//                 <button onClick={searchDrugs}>🔍 Search</button>
//               </div>
//             </div>

//             <div className="drug-results">
//               <h4>📋 Search Results</h4>
//               <div className="drug-list">
//                 {drugSearchResults.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         ➕
//                       </button>
//                       <button 
//                         className="btn-star"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                         style={{ color: favoriteDrugs.some(d => d.drugId === drug.drugId) ? 'gold' : 'gray' }}
//                       >
//                         {favoriteDrugs.some(d => d.drugId === drug.drugId) ? '★' : '☆'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="favorites-section">
//               <h4>⭐ Favorite Drugs</h4>
//               <div className="drug-list">
//                 {favoriteDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         ➕
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="visit-drugs-section">
//               <h4>💊 Selected Drugs</h4>
//               <div className="drug-list">
//                 {visitDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-prescription"
//                         onClick={() => {
//                           setSelectedDrugId(drug.drugId);
//                           setShowPrescriptionDialog(true);
//                         }}
//                       >
//                         📋
//                       </button>
//                       <button 
//                         className="btn-view"
//                         onClick={() => showPrescription(drug.drugId)}
//                       >
//                         👁
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => removeDrugFromVisit(drug.drugId)}
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'procedures' && (
//           <div className="procedures-tab">
//             <div className="procedure-categories">
//               <div className="procedure-category">
//                 <h4>📡 Radiology</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search radiology..."
//                     value={searchRadiology}
//                     onChange={(e) => setSearchRadiology(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('RADIOLOGY', searchRadiology)}
//                   />
//                   <button onClick={() => searchProcedures('RADIOLOGY', searchRadiology)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {radiologyProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>🧫 Laboratory</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search laboratory..."
//                     value={searchLaboratory}
//                     onChange={(e) => setSearchLaboratory(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('LABORATORY', searchLaboratory)}
//                   />
//                   <button onClick={() => searchProcedures('LABORATORY', searchLaboratory)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {laboratoryProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>🩺 Medical</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder="Search medical..."
//                     value={searchMedical}
//                     onChange={(e) => setSearchMedical(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('MEDICAL', searchMedical)}
//                   />
//                   <button onClick={() => searchProcedures('MEDICAL', searchMedical)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {medicalProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>➕</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="selected-procedures">
//               <h4>📋 Selected Procedures</h4>
//               <div className="procedure-list">
//                 {selectedProcedures.map((proc) => (
//                   <div key={proc} className="procedure-item selected">
//                     <span>{proc}</span>
//                     <button className="btn-remove" onClick={() => removeProcedureFromVisit(proc)}>✖</button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {renderPrescriptionDialog()}
//     </div>
//   );
// };

// export default DoctorVisitScreen;   04072026 9:00 pm 

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorVisitScreen.css';

// // Constants
// const DISCHARGE_STATUSES = ['NOT_DISCHARGED', 'DISCHARGED', 'FOLLOW_UP_REQUIRED', 'REFERRED'];
// const DURATION_TYPES = ['Hour', 'Day', 'Week', 'Month', 'Year'];

// // ==================== LOCALIZATION ====================
// const EN_BUNDLE = {
//   'doctor.visit.title': 'Visit #{0}',
//   'doctor.visit.start': '▶ Start Visit',
//   'doctor.visit.save': '💾 Save',
//   'doctor.visit.close': '✖ Close Visit',
//   'doctor.visit.exit': '✖ Exit',
//   'doctor.visit.started': 'Visit started successfully',
//   'doctor.visit.closed': 'Visit closed successfully',
//   'doctor.visit.saved': 'Visit details saved successfully',
//   'doctor.visit.startFailed': 'Failed to start visit',
//   'doctor.visit.closeFailed': 'Failed to close visit',
//   'doctor.visit.saveFailed': 'Failed to save visit',
//   'doctor.visit.details': 'Visit Details',
//   'doctor.visit.chiefComplaint': '🩺 Chief Complaint',
//   'doctor.visit.history': '📜 History',
//   'doctor.visit.medications': '💊 Medications',
//   'doctor.visit.allergies': '⚠️ Allergies',
//   'doctor.visit.doctorNotes': '📝 Doctor Notes',
//   'doctor.visit.dischargeStatus': '📌 Discharge Status',
//   'doctor.visit.drugs': '💊 Drugs',
//   'doctor.visit.procedures': '🔬 Procedures',
//   'doctor.visit.searchDrugs': '🔍 Search Drugs',
//   'doctor.visit.searchResults': '📋 Search Results',
//   'doctor.visit.favoriteDrugs': '⭐ Favorite Drugs',
//   'doctor.visit.selectedDrugs': '💊 Selected Drugs',
//   'doctor.visit.add': '➕',
//   'doctor.visit.remove': '✖',
//   'doctor.visit.prescription': '📋',
//   'doctor.visit.view': '👁',
//   'doctor.visit.noPrescription': 'No prescription found for this drug',
//   'doctor.visit.drugAdded': 'Drug added successfully',
//   'doctor.visit.drugRemoved': 'Drug removed successfully',
//   'doctor.visit.prescriptionSaved': 'Prescription saved successfully',
//   'doctor.visit.fillRequired': 'Please fill all required fields',
//   'doctor.visit.selectProcedure': 'Procedure already selected',
//   'doctor.visit.procedureAdded': 'Procedure added successfully',
//   'doctor.visit.procedureRemoved': 'Procedure removed successfully',
//   'doctor.visit.radiology': '📡 Radiology',
//   'doctor.visit.laboratory': '🧫 Laboratory',
//   'doctor.visit.medical': '🩺 Medical',
//   'doctor.visit.selectedProcedures': '📋 Selected Procedures',
//   'doctor.visit.duration': 'Duration *',
//   'doctor.visit.durationType': 'Duration Type *',
//   'doctor.visit.frequency': 'Frequency *',
//   'doctor.visit.dose': 'Dose',
//   'doctor.visit.instruction': 'Instruction',
//   'doctor.visit.cancel': 'Cancel',
//   'doctor.visit.savePrescription': 'Save',
//   'doctor.visit.searchPlaceholder': 'Search drugs...',
//   'doctor.visit.searchRadiology': 'Search radiology...',
//   'doctor.visit.searchLaboratory': 'Search laboratory...',
//   'doctor.visit.searchMedical': 'Search medical...',
//   'doctor.visit.enterDuration': 'Enter duration',
//   'doctor.visit.enterDose': 'Enter dose',
//   'doctor.visit.enterInstruction': 'Enter instruction',
//   'doctor.visit.selectDurationType': 'Select duration type',
//   'doctor.visit.selectFrequency': 'Select frequency',
//   'doctor.visit.status': 'Status',
//   'doctor.visit.notDischarged': 'Not Discharged',
//   'doctor.visit.discharged': 'Discharged',
//   'doctor.visit.followUp': 'Follow-up Required',
//   'doctor.visit.referred': 'Referred',
//   'doctor.visit.discharge': 'Discharge'
// };

// const AR_BUNDLE = {
//   'doctor.visit.title': 'الزيارة #{0}',
//   'doctor.visit.start': '▶ بدء الزيارة',
//   'doctor.visit.save': '💾 حفظ',
//   'doctor.visit.close': '✖ إغلاق الزيارة',
//   'doctor.visit.exit': '✖ خروج',
//   'doctor.visit.started': 'تم بدء الزيارة بنجاح',
//   'doctor.visit.closed': 'تم إغلاق الزيارة بنجاح',
//   'doctor.visit.saved': 'تم حفظ تفاصيل الزيارة بنجاح',
//   'doctor.visit.startFailed': 'فشل بدء الزيارة',
//   'doctor.visit.closeFailed': 'فشل إغلاق الزيارة',
//   'doctor.visit.saveFailed': 'فشل حفظ الزيارة',
//   'doctor.visit.details': 'تفاصيل الزيارة',
//   'doctor.visit.chiefComplaint': '🩺 الشكوى الرئيسية',
//   'doctor.visit.history': '📜 التاريخ الطبي',
//   'doctor.visit.medications': '💊 الأدوية',
//   'doctor.visit.allergies': '⚠️ الحساسية',
//   'doctor.visit.doctorNotes': '📝 ملاحظات الطبيب',
//   'doctor.visit.dischargeStatus': '📌 حالة الخروج',
//   'doctor.visit.drugs': '💊 الأدوية',
//   'doctor.visit.procedures': '🔬 الإجراءات',
//   'doctor.visit.searchDrugs': '🔍 بحث عن أدوية',
//   'doctor.visit.searchResults': '📋 نتائج البحث',
//   'doctor.visit.favoriteDrugs': '⭐ الأدوية المفضلة',
//   'doctor.visit.selectedDrugs': '💊 الأدوية المختارة',
//   'doctor.visit.add': '➕',
//   'doctor.visit.remove': '✖',
//   'doctor.visit.prescription': '📋',
//   'doctor.visit.view': '👁',
//   'doctor.visit.noPrescription': 'لا توجد وصفة طبية لهذا الدواء',
//   'doctor.visit.drugAdded': 'تم إضافة الدواء بنجاح',
//   'doctor.visit.drugRemoved': 'تم حذف الدواء بنجاح',
//   'doctor.visit.prescriptionSaved': 'تم حفظ الوصفة الطبية بنجاح',
//   'doctor.visit.fillRequired': 'الرجاء ملء جميع الحقول المطلوبة',
//   'doctor.visit.selectProcedure': 'الإجراء محدد مسبقاً',
//   'doctor.visit.procedureAdded': 'تم إضافة الإجراء بنجاح',
//   'doctor.visit.procedureRemoved': 'تم حذف الإجراء بنجاح',
//   'doctor.visit.radiology': '📡 الأشعة',
//   'doctor.visit.laboratory': '🧫 المختبر',
//   'doctor.visit.medical': '🩺 الطبي',
//   'doctor.visit.selectedProcedures': '📋 الإجراءات المختارة',
//   'doctor.visit.duration': 'المدة *',
//   'doctor.visit.durationType': 'نوع المدة *',
//   'doctor.visit.frequency': 'التكرار *',
//   'doctor.visit.dose': 'الجرعة',
//   'doctor.visit.instruction': 'التعليمات',
//   'doctor.visit.cancel': 'إلغاء',
//   'doctor.visit.savePrescription': 'حفظ',
//   'doctor.visit.searchPlaceholder': 'بحث عن أدوية...',
//   'doctor.visit.searchRadiology': 'بحث عن إجراءات أشعة...',
//   'doctor.visit.searchLaboratory': 'بحث عن إجراءات مختبر...',
//   'doctor.visit.searchMedical': 'بحث عن إجراءات طبية...',
//   'doctor.visit.enterDuration': 'أدخل المدة',
//   'doctor.visit.enterDose': 'أدخل الجرعة',
//   'doctor.visit.enterInstruction': 'أدخل التعليمات',
//   'doctor.visit.selectDurationType': 'اختر نوع المدة',
//   'doctor.visit.selectFrequency': 'اختر التكرار',
//   'doctor.visit.status': 'الحالة',
//   'doctor.visit.notDischarged': 'لم يخرج',
//   'doctor.visit.discharged': 'خرج',
//   'doctor.visit.followUp': 'متابعة مطلوبة',
//   'doctor.visit.referred': 'تم التحويل',
//   'doctor.visit.discharge': 'الخروج'
// };

// const DoctorVisitScreen = ({ doctorId, visitId, initialStatus = 'NEW', username, onClose, language: propLanguage }) => {
//   // ==================== GET LANGUAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = localStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== LOCALIZATION ====================
//   const [locale, setLocale] = useState(getLanguage());
  
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   const isRTL = locale === 'ar';

//   // ==================== STATE ====================
//   const [currentStatus, setCurrentStatus] = useState(initialStatus);
//   const [activeTab, setActiveTab] = useState('visit');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);
  
//   // Visit Details
//   const [chiefComplaint, setChiefComplaint] = useState('');
//   const [history, setHistory] = useState('');
//   const [medications, setMedications] = useState('');
//   const [allergies, setAllergies] = useState('');
//   const [doctorNotes, setDoctorNotes] = useState('');
//   const [dischargeStatus, setDischargeStatus] = useState('NOT_DISCHARGED');
  
//   // Drugs
//   const [searchQuery, setSearchQuery] = useState('');
//   const [drugSearchResults, setDrugSearchResults] = useState([]);
//   const [favoriteDrugs, setFavoriteDrugs] = useState([]);
//   const [visitDrugs, setVisitDrugs] = useState([]);
//   const [frequencies, setFrequencies] = useState([]);
  
//   // Prescription Dialog
//   const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
//   const [selectedDrugId, setSelectedDrugId] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     duration: '',
//     durationType: '',
//     frequency: null,
//     dose: '',
//     instruction: ''
//   });
  
//   // Procedures
//   const [selectedProcedures, setSelectedProcedures] = useState([]);
//   const [radiologyProcedures, setRadiologyProcedures] = useState([]);
//   const [laboratoryProcedures, setLaboratoryProcedures] = useState([]);
//   const [medicalProcedures, setMedicalProcedures] = useState([]);
//   const [searchRadiology, setSearchRadiology] = useState('');
//   const [searchLaboratory, setSearchLaboratory] = useState('');
//   const [searchMedical, setSearchMedical] = useState('');

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       //console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== VISIT OPERATIONS ====================
//   const startVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/start`, { method: 'PUT' });
//       setCurrentStatus('IN_PROGRESS');
//       alert(t('doctor.visit.started'));
//     } catch (err) {
//       setError(t('doctor.visit.startFailed') + ': ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, t]);

//   const closeVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/close`, { method: 'PUT' });
//       alert(t('doctor.visit.closed'));
//       if (onClose) onClose();
//     } catch (err) {
//       setError(t('doctor.visit.closeFailed') + ': ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, onClose, t]);

//   const saveVisitDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const body = {
//         chiefComplaint,
//         history,
//         medications,
//         allergies,
//         doctorNotes,
//         status: dischargeStatus
//       };
      
//       await apiFetch(`/api/visits/${visitId}/details`, {
//         method: 'PUT',
//         body: JSON.stringify(body)
//       });
      
//       setIsSaved(true);
//       alert(t('doctor.visit.saved'));
//     } catch (err) {
//       setError(t('doctor.visit.saveFailed') + ': ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, chiefComplaint, history, medications, allergies, doctorNotes, dischargeStatus, apiFetch, t]);

//   // ==================== DRUG OPERATIONS ====================
//   const loadVisitDrugs = useCallback(async () => {
//     try {
//       const drugs = await apiFetch(`/api/visits/${visitId}/drugs`);
//       setVisitDrugs(drugs || []);
//     } catch (err) {
//       //console.error('Failed to load visit drugs:', err);
//     }
//   }, [visitId, apiFetch]);

//   const searchDrugs = useCallback(async () => {
//     if (!searchQuery.trim()) return;
//     try {
//       const results = await apiFetch(
//         `/api/drugs/autocomplete?name=${encodeURIComponent(searchQuery)}`
//       );
//       setDrugSearchResults(results || []);
//     } catch (err) {
//       setError('Failed to search drugs: ' + err.message);
//     }
//   }, [searchQuery, apiFetch]);

//   const addDrugToVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs`, {
//         method: 'POST',
//         body: JSON.stringify([drugId])
//       });
//       await loadVisitDrugs();
//       alert(t('doctor.visit.drugAdded'));
//     } catch (err) {
//       setError('Failed to add drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs, t]);

//   const removeDrugFromVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs/${drugId}`, {
//         method: 'DELETE'
//       });
//       await loadVisitDrugs();
//       alert(t('doctor.visit.drugRemoved'));
//     } catch (err) {
//       setError('Failed to remove drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs, t]);

//   // ==================== FAVORITE DRUGS ====================
//   const loadFavorites = useCallback(async () => {
//     try {
//       const favorites = await apiFetch(`/api/doctors/${doctorId}/favorites`);
//       const favoriteIds = Array.isArray(favorites) ? favorites : [];
      
//       if (favoriteIds.length > 0) {
//         const drugDetails = await apiFetch('/api/drugs/by-ids', {
//           method: 'POST',
//           body: JSON.stringify(favoriteIds)
//         });
//         setFavoriteDrugs(drugDetails || []);
//       } else {
//         setFavoriteDrugs([]);
//       }
//     } catch (err) {
//       //console.error('Failed to load favorites:', err);
//     }
//   }, [doctorId, apiFetch]);

//   const toggleFavorite = useCallback(async (drugId) => {
//     try {
//       const isFavorite = favoriteDrugs.some(d => d.drugId === drugId);
//       const endpoint = `/api/doctors/${doctorId}/favorites`;
      
//       if (isFavorite) {
//         await apiFetch(endpoint, {
//           method: 'DELETE',
//           body: JSON.stringify([drugId])
//         });
//       } else {
//         await apiFetch(endpoint, {
//           method: 'POST',
//           body: JSON.stringify([drugId])
//         });
//       }
//       await loadFavorites();
//     } catch (err) {
//       setError('Failed to toggle favorite: ' + err.message);
//     }
//   }, [doctorId, favoriteDrugs, apiFetch, loadFavorites]);

//   // ==================== PRESCRIPTIONS ====================
//   const loadFrequencies = useCallback(async () => {
//     try {
//       const data = await apiFetch('/api/repetitions');
//       setFrequencies(data || []);
//     } catch (err) {
//       //console.error('Failed to load frequencies:', err);
//     }
//   }, [apiFetch]);

//   const mapDurationType = useCallback((type) => {
//     const types = ['Hour', 'Day', 'Week', 'Month', 'Year'];
//     return types[parseInt(type) - 1] || '-';
//   }, []);

//   const savePrescription = useCallback(async () => {
//     if (!selectedDrugId) return;
    
//     const { duration, durationType, frequency, dose, instruction } = prescriptionData;
//     if (!duration || !durationType || !frequency) {
//       alert(t('doctor.visit.fillRequired'));
//       return;
//     }
    
//     try {
//       const body = {
//         drugId: selectedDrugId,
//         duration,
//         durationType: DURATION_TYPES.indexOf(durationType) + 1,
//         frequencyId: frequency.id,
//         frequency: frequency.repetitionDesc,
//         dose: dose || '',
//         instruction: instruction || ''
//       };
      
//       await apiFetch(`/api/visits/${visitId}/drug-prescriptions`, {
//         method: 'POST',
//         body: JSON.stringify(body)
//       });
      
//       alert(t('doctor.visit.prescriptionSaved'));
//       setShowPrescriptionDialog(false);
//       setSelectedDrugId(null);
//       setPrescriptionData({ duration: '', durationType: '', frequency: null, dose: '', instruction: '' });
//     } catch (err) {
//       setError('Failed to save prescription: ' + err.message);
//     }
//   }, [visitId, selectedDrugId, prescriptionData, apiFetch, t]);

//   const showPrescription = useCallback(async (drugId) => {
//     try {
//       const prescriptions = await apiFetch(`/api/visits/${visitId}/drug-prescriptions`);
//       const found = prescriptions?.find(p => p.drugId === drugId);
      
//       if (!found) {
//         alert(t('doctor.visit.noPrescription'));
//         return;
//       }
      
//       const message = `
//         Drug: ${found.tradeName || 'Unknown'}
//         Dose: ${found.dose || 'Not specified'}
//         Duration: ${found.duration || 'Not specified'}
//         Duration Type: ${mapDurationType(found.durationType)}
//         Frequency: ${found.frequency || 'Not specified'}
//         Instruction: ${found.instructions || 'Not specified'}
//       `;
//       alert(message);
//     } catch (err) {
//       setError('Failed to load prescription: ' + err.message);
//     }
//   }, [visitId, apiFetch, mapDurationType, t]);

//   // ==================== PROCEDURE OPERATIONS ====================
//   const loadProcedures = useCallback(async (category) => {
//     try {
//       const data = await apiFetch(`/api/procedures?category=${category}`);
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       //console.error(`Failed to load ${category} procedures:`, err);
//     }
//   }, [apiFetch]);

//   const searchProcedures = useCallback(async (category, query) => {
//     if (!query.trim()) {
//       loadProcedures(category);
//       return;
//     }
    
//     try {
//       const data = await apiFetch(
//         `/api/procedures/search?category=${category}&name=${encodeURIComponent(query)}`
//       );
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       setError(`Failed to search ${category} procedures: ` + err.message);
//     }
//   }, [apiFetch, loadProcedures]);

//   const loadSelectedProcedures = useCallback(async () => {
//     try {
//       const data = await apiFetch(`/visits/${visitId}/procedures`);
//       setSelectedProcedures(data || []);
//     } catch (err) {
//       //console.error('Failed to load selected procedures:', err);
//     }
//   }, [visitId, apiFetch]);

//   const addProcedureToVisit = useCallback(async (procedure) => {
//     if (!procedure || selectedProcedures.includes(procedure)) {
//       if (selectedProcedures.includes(procedure)) {
//         alert(t('doctor.visit.selectProcedure'));
//       }
//       return;
//     }
    
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'POST' }
//       );
//       await loadSelectedProcedures();
//       alert(t('doctor.visit.procedureAdded'));
//     } catch (err) {
//       setError('Failed to add procedure: ' + err.message);
//     }
//   }, [visitId, selectedProcedures, apiFetch, loadSelectedProcedures, t]);

//   const removeProcedureFromVisit = useCallback(async (procedure) => {
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'DELETE' }
//       );
//       await loadSelectedProcedures();
//       alert(t('doctor.visit.procedureRemoved'));
//     } catch (err) {
//       setError('Failed to remove procedure: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadSelectedProcedures, t]);

//   // ==================== LOAD DATA ====================
//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([
//         loadVisitDrugs(),
//         loadFavorites(),
//         loadSelectedProcedures(),
//         loadFrequencies(),
//         loadProcedures('RADIOLOGY'),
//         loadProcedures('LABORATORY'),
//         loadProcedures('MEDICAL')
//       ]);
//     };
    
//     loadData();
//   }, [loadVisitDrugs, loadFavorites, loadSelectedProcedures, loadFrequencies, loadProcedures]);

//   // ==================== RENDER HELPERS ====================
//   const renderStatusBadge = (status) => {
//     const colors = {
//       'NEW': '#e74c3c',
//       'IN_PROGRESS': '#f39c12',
//       'CLOSED': '#27ae60'
//     };
//     return (
//       <span className="status-badge" style={{ backgroundColor: colors[status] || '#3498db' }}>
//         {status}
//       </span>
//     );
//   };

//   // ==================== PRESCRIPTION DIALOG ====================
//   const renderPrescriptionDialog = () => {
//     if (!showPrescriptionDialog) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowPrescriptionDialog(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <h3>📋 {t('doctor.visit.prescription')}</h3>
//           <div className="form-group">
//             <label>{t('doctor.visit.duration')}</label>
//             <input
//               type="number"
//               placeholder={t('doctor.visit.enterDuration')}
//               value={prescriptionData.duration}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.durationType')}</label>
//             <select
//               value={prescriptionData.durationType}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, durationType: e.target.value })}
//             >
//               <option value="">{t('doctor.visit.selectDurationType')}</option>
//               {DURATION_TYPES.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.frequency')}</label>
//             <select
//               value={prescriptionData.frequency?.id || ''}
//               onChange={(e) => {
//                 const freq = frequencies.find(f => f.id === parseInt(e.target.value));
//                 setPrescriptionData({ ...prescriptionData, frequency: freq });
//               }}
//             >
//               <option value="">{t('doctor.visit.selectFrequency')}</option>
//               {frequencies.map((freq) => (
//                 <option key={freq.id} value={freq.id}>
//                   {freq.repetitionDesc}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.dose')}</label>
//             <input
//               type="text"
//               placeholder={t('doctor.visit.enterDose')}
//               value={prescriptionData.dose}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, dose: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.instruction')}</label>
//             <textarea
//               placeholder={t('doctor.visit.enterInstruction')}
//               value={prescriptionData.instruction}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, instruction: e.target.value })}
//               rows={3}
//             />
//           </div>
//           <div className="modal-actions">
//             <button className="btn-cancel" onClick={() => setShowPrescriptionDialog(false)}>
//               {t('doctor.visit.cancel')}
//             </button>
//             <button className="btn-save" onClick={savePrescription}>
//               {t('doctor.visit.savePrescription')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   return (
//     <div className={`doctor-visit-screen ${isRTL ? 'rtl' : ''}`}>
//       {error && (
//         <div className="error-banner">
//           ⚠️ {error}
//           <button onClick={() => setError(null)}>✖</button>
//         </div>
//       )}
      
//       <div className="visit-header">
//         <h2>🩺 {t('doctor.visit.title').replace('{0}', visitId)}</h2>
//         <div className="header-actions">
//           {renderStatusBadge(currentStatus)}
//           <button 
//             className={`btn-start ${currentStatus !== 'NEW' ? 'disabled' : ''}`}
//             onClick={startVisit}
//             disabled={currentStatus !== 'NEW' || loading}
//           >
//             {t('doctor.visit.start')}
//           </button>
//           <button 
//             className="btn-save"
//             onClick={saveVisitDetails}
//             disabled={loading}
//           >
//             {t('doctor.visit.save')}
//           </button>
//           <button 
//             className={`btn-close ${currentStatus !== 'IN_PROGRESS' ? 'disabled' : ''}`}
//             onClick={closeVisit}
//             disabled={currentStatus !== 'IN_PROGRESS' || loading}
//           >
//             {t('doctor.visit.close')}
//           </button>
//           <button 
//             className="btn-exit"
//             onClick={onClose}
//           >
//             {t('doctor.visit.exit')}
//           </button>
//         </div>
//       </div>

//       {/* ==================== TABS ==================== */}
//       <div className="tabs">
//         <button 
//           className={`tab ${activeTab === 'visit' ? 'active' : ''}`}
//           onClick={() => setActiveTab('visit')}
//         >
//           📋 {t('doctor.visit.details')}
//         </button>
//         <button 
//           className={`tab ${activeTab === 'drugs' ? 'active' : ''}`}
//           onClick={() => setActiveTab('drugs')}
//         >
//           {t('doctor.visit.drugs')}
//         </button>
//         <button 
//           className={`tab ${activeTab === 'procedures' ? 'active' : ''}`}
//           onClick={() => setActiveTab('procedures')}
//         >
//           {t('doctor.visit.procedures')}
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'visit' && (
//           <div className="visit-tab">
//             <div className="form-group">
//               <label>{t('doctor.visit.chiefComplaint')}</label>
//               <textarea
//                 value={chiefComplaint}
//                 onChange={(e) => setChiefComplaint(e.target.value)}
//                 placeholder="Enter chief complaint..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.history')}</label>
//               <textarea
//                 value={history}
//                 onChange={(e) => setHistory(e.target.value)}
//                 placeholder="Enter history..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.medications')}</label>
//               <textarea
//                 value={medications}
//                 onChange={(e) => setMedications(e.target.value)}
//                 placeholder="Enter medications..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.allergies')}</label>
//               <textarea
//                 value={allergies}
//                 onChange={(e) => setAllergies(e.target.value)}
//                 placeholder="Enter allergies..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.doctorNotes')}</label>
//               <textarea
//                 value={doctorNotes}
//                 onChange={(e) => setDoctorNotes(e.target.value)}
//                 placeholder="Enter doctor notes..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.dischargeStatus')}</label>
//               <select
//                 value={dischargeStatus}
//                 onChange={(e) => setDischargeStatus(e.target.value)}
//               >
//                 {DISCHARGE_STATUSES.map((status) => {
//                   const key = status.toLowerCase();
//                   const label = t(`doctor.visit.${key}`) || status.replace('_', ' ');
//                   return (
//                     <option key={status} value={status}>
//                       {label}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//           </div>
//         )}

//         {activeTab === 'drugs' && (
//           <div className="drugs-tab">
//             <div className="search-section">
//               <h3>{t('doctor.visit.searchDrugs')}</h3>
//               <div className="search-box">
//                 <input
//                   type="text"
//                   placeholder={t('doctor.visit.searchPlaceholder')}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && searchDrugs()}
//                 />
//                 <button onClick={searchDrugs}>🔍</button>
//               </div>
//             </div>

//             <div className="drug-results">
//               <h4>{t('doctor.visit.searchResults')}</h4>
//               <div className="drug-list">
//                 {drugSearchResults.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         {t('doctor.visit.add')}
//                       </button>
//                       <button 
//                         className="btn-star"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                         style={{ color: favoriteDrugs.some(d => d.drugId === drug.drugId) ? 'gold' : 'gray' }}
//                       >
//                         {favoriteDrugs.some(d => d.drugId === drug.drugId) ? '★' : '☆'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="favorites-section">
//               <h4>{t('doctor.visit.favoriteDrugs')}</h4>
//               <div className="drug-list">
//                 {favoriteDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         {t('doctor.visit.add')}
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                       >
//                         {t('doctor.visit.remove')}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="visit-drugs-section">
//               <h4>{t('doctor.visit.selectedDrugs')}</h4>
//               <div className="drug-list">
//                 {visitDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-prescription"
//                         onClick={() => {
//                           setSelectedDrugId(drug.drugId);
//                           setShowPrescriptionDialog(true);
//                         }}
//                       >
//                         {t('doctor.visit.prescription')}
//                       </button>
//                       <button 
//                         className="btn-view"
//                         onClick={() => showPrescription(drug.drugId)}
//                       >
//                         {t('doctor.visit.view')}
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => removeDrugFromVisit(drug.drugId)}
//                       >
//                         {t('doctor.visit.remove')}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'procedures' && (
//           <div className="procedures-tab">
//             <div className="procedure-categories">
//               <div className="procedure-category">
//                 <h4>{t('doctor.visit.radiology')}</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder={t('doctor.visit.searchRadiology')}
//                     value={searchRadiology}
//                     onChange={(e) => setSearchRadiology(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('RADIOLOGY', searchRadiology)}
//                   />
//                   <button onClick={() => searchProcedures('RADIOLOGY', searchRadiology)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {radiologyProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>{t('doctor.visit.add')}</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>{t('doctor.visit.laboratory')}</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder={t('doctor.visit.searchLaboratory')}
//                     value={searchLaboratory}
//                     onChange={(e) => setSearchLaboratory(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('LABORATORY', searchLaboratory)}
//                   />
//                   <button onClick={() => searchProcedures('LABORATORY', searchLaboratory)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {laboratoryProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>{t('doctor.visit.add')}</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>{t('doctor.visit.medical')}</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder={t('doctor.visit.searchMedical')}
//                     value={searchMedical}
//                     onChange={(e) => setSearchMedical(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('MEDICAL', searchMedical)}
//                   />
//                   <button onClick={() => searchProcedures('MEDICAL', searchMedical)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {medicalProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>{t('doctor.visit.add')}</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="selected-procedures">
//               <h4>{t('doctor.visit.selectedProcedures')}</h4>
//               <div className="procedure-list">
//                 {selectedProcedures.map((proc) => (
//                   <div key={proc} className="procedure-item selected">
//                     <span>{proc}</span>
//                     <button className="btn-remove" onClick={() => removeProcedureFromVisit(proc)}>
//                       {t('doctor.visit.remove')}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {renderPrescriptionDialog()}
//     </div>
//   );
// };

// export default DoctorVisitScreen;   09072026 11:00



// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorVisitScreen.css';

// // Constants
// const DISCHARGE_STATUSES = ['NOT_DISCHARGED', 'DISCHARGED', 'FOLLOW_UP_REQUIRED', 'REFERRED'];
// const DURATION_TYPES = ['Hour', 'Day', 'Week', 'Month', 'Year'];

// // ==================== LOCALIZATION ====================
// const EN_BUNDLE = {
//   'doctor.visit.title': 'Visit #{0}',
//   'doctor.visit.start': '▶ Start Visit',
//   'doctor.visit.save': '💾 Save',
//   'doctor.visit.close': '✖ Close Visit',
//   'doctor.visit.exit': '✖ Exit',
//   'doctor.visit.started': 'Visit started successfully',
//   'doctor.visit.closed': 'Visit closed successfully',
//   'doctor.visit.saved': 'Visit details saved successfully',
//   'doctor.visit.startFailed': 'Failed to start visit',
//   'doctor.visit.closeFailed': 'Failed to close visit',
//   'doctor.visit.saveFailed': 'Failed to save visit',
//   'doctor.visit.details': 'Visit Details',
//   'doctor.visit.chiefComplaint': '🩺 Chief Complaint',
//   'doctor.visit.history': '📜 History',
//   'doctor.visit.medications': '💊 Medications',
//   'doctor.visit.allergies': '⚠️ Allergies',
//   'doctor.visit.doctorNotes': '📝 Doctor Notes',
//   'doctor.visit.dischargeStatus': '📌 Discharge Status',
//   'doctor.visit.drugs': '💊 Drugs',
//   'doctor.visit.procedures': '🔬 Procedures',
//   'doctor.visit.searchDrugs': '🔍 Search Drugs',
//   'doctor.visit.searchResults': '📋 Search Results',
//   'doctor.visit.favoriteDrugs': '⭐ Favorite Drugs',
//   'doctor.visit.selectedDrugs': '💊 Selected Drugs',
//   'doctor.visit.add': '➕',
//   'doctor.visit.remove': '✖',
//   'doctor.visit.prescription': '📋',
//   'doctor.visit.view': '👁',
//   'doctor.visit.noPrescription': 'No prescription found for this drug',
//   'doctor.visit.drugAdded': 'Drug added successfully',
//   'doctor.visit.drugRemoved': 'Drug removed successfully',
//   'doctor.visit.prescriptionSaved': 'Prescription saved successfully',
//   'doctor.visit.fillRequired': 'Please fill all required fields',
//   'doctor.visit.selectProcedure': 'Procedure already selected',
//   'doctor.visit.procedureAdded': 'Procedure added successfully',
//   'doctor.visit.procedureRemoved': 'Procedure removed successfully',
//   'doctor.visit.radiology': '📡 Radiology',
//   'doctor.visit.laboratory': '🧫 Laboratory',
//   'doctor.visit.medical': '🩺 Medical',
//   'doctor.visit.selectedProcedures': '📋 Selected Procedures',
//   'doctor.visit.duration': 'Duration *',
//   'doctor.visit.durationType': 'Duration Type *',
//   'doctor.visit.frequency': 'Frequency *',
//   'doctor.visit.dose': 'Dose',
//   'doctor.visit.instruction': 'Instruction',
//   'doctor.visit.cancel': 'Cancel',
//   'doctor.visit.savePrescription': 'Save',
//   'doctor.visit.searchPlaceholder': 'Search drugs...',
//   'doctor.visit.searchRadiology': 'Search radiology...',
//   'doctor.visit.searchLaboratory': 'Search laboratory...',
//   'doctor.visit.searchMedical': 'Search medical...',
//   'doctor.visit.enterDuration': 'Enter duration',
//   'doctor.visit.enterDose': 'Enter dose',
//   'doctor.visit.enterInstruction': 'Enter instruction',
//   'doctor.visit.selectDurationType': 'Select duration type',
//   'doctor.visit.selectFrequency': 'Select frequency',
//   'doctor.visit.status': 'Status',
//   'doctor.visit.notDischarged': 'Not Discharged',
//   'doctor.visit.discharged': 'Discharged',
//   'doctor.visit.followUp': 'Follow-up Required',
//   'doctor.visit.referred': 'Referred',
//   'doctor.visit.discharge': 'Discharge'
// };

// const AR_BUNDLE = {
//   'doctor.visit.title': 'الزيارة #{0}',
//   'doctor.visit.start': '▶ بدء الزيارة',
//   'doctor.visit.save': '💾 حفظ',
//   'doctor.visit.close': '✖ إغلاق الزيارة',
//   'doctor.visit.exit': '✖ خروج',
//   'doctor.visit.started': 'تم بدء الزيارة بنجاح',
//   'doctor.visit.closed': 'تم إغلاق الزيارة بنجاح',
//   'doctor.visit.saved': 'تم حفظ تفاصيل الزيارة بنجاح',
//   'doctor.visit.startFailed': 'فشل بدء الزيارة',
//   'doctor.visit.closeFailed': 'فشل إغلاق الزيارة',
//   'doctor.visit.saveFailed': 'فشل حفظ الزيارة',
//   'doctor.visit.details': 'تفاصيل الزيارة',
//   'doctor.visit.chiefComplaint': '🩺 الشكوى الرئيسية',
//   'doctor.visit.history': '📜 التاريخ الطبي',
//   'doctor.visit.medications': '💊 الأدوية',
//   'doctor.visit.allergies': '⚠️ الحساسية',
//   'doctor.visit.doctorNotes': '📝 ملاحظات الطبيب',
//   'doctor.visit.dischargeStatus': '📌 حالة الخروج',
//   'doctor.visit.drugs': '💊 الأدوية',
//   'doctor.visit.procedures': '🔬 الإجراءات',
//   'doctor.visit.searchDrugs': '🔍 بحث عن أدوية',
//   'doctor.visit.searchResults': '📋 نتائج البحث',
//   'doctor.visit.favoriteDrugs': '⭐ الأدوية المفضلة',
//   'doctor.visit.selectedDrugs': '💊 الأدوية المختارة',
//   'doctor.visit.add': '➕',
//   'doctor.visit.remove': '✖',
//   'doctor.visit.prescription': '📋',
//   'doctor.visit.view': '👁',
//   'doctor.visit.noPrescription': 'لا توجد وصفة طبية لهذا الدواء',
//   'doctor.visit.drugAdded': 'تم إضافة الدواء بنجاح',
//   'doctor.visit.drugRemoved': 'تم حذف الدواء بنجاح',
//   'doctor.visit.prescriptionSaved': 'تم حفظ الوصفة الطبية بنجاح',
//   'doctor.visit.fillRequired': 'الرجاء ملء جميع الحقول المطلوبة',
//   'doctor.visit.selectProcedure': 'الإجراء محدد مسبقاً',
//   'doctor.visit.procedureAdded': 'تم إضافة الإجراء بنجاح',
//   'doctor.visit.procedureRemoved': 'تم حذف الإجراء بنجاح',
//   'doctor.visit.radiology': '📡 الأشعة',
//   'doctor.visit.laboratory': '🧫 المختبر',
//   'doctor.visit.medical': '🩺 الطبي',
//   'doctor.visit.selectedProcedures': '📋 الإجراءات المختارة',
//   'doctor.visit.duration': 'المدة *',
//   'doctor.visit.durationType': 'نوع المدة *',
//   'doctor.visit.frequency': 'التكرار *',
//   'doctor.visit.dose': 'الجرعة',
//   'doctor.visit.instruction': 'التعليمات',
//   'doctor.visit.cancel': 'إلغاء',
//   'doctor.visit.savePrescription': 'حفظ',
//   'doctor.visit.searchPlaceholder': 'بحث عن أدوية...',
//   'doctor.visit.searchRadiology': 'بحث عن إجراءات أشعة...',
//   'doctor.visit.searchLaboratory': 'بحث عن إجراءات مختبر...',
//   'doctor.visit.searchMedical': 'بحث عن إجراءات طبية...',
//   'doctor.visit.enterDuration': 'أدخل المدة',
//   'doctor.visit.enterDose': 'أدخل الجرعة',
//   'doctor.visit.enterInstruction': 'أدخل التعليمات',
//   'doctor.visit.selectDurationType': 'اختر نوع المدة',
//   'doctor.visit.selectFrequency': 'اختر التكرار',
//   'doctor.visit.status': 'الحالة',
//   'doctor.visit.notDischarged': 'لم يخرج',
//   'doctor.visit.discharged': 'خرج',
//   'doctor.visit.followUp': 'متابعة مطلوبة',
//   'doctor.visit.referred': 'تم التحويل',
//   'doctor.visit.discharge': 'الخروج'
// };

// const DoctorVisitScreen = ({ doctorId, visitId, initialStatus = 'NEW', username, onClose, language: propLanguage }) => {
//   // ==================== GET LANGUAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = sessionStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== LOCALIZATION ====================
//   const [locale, setLocale] = useState(getLanguage());
  
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   const isRTL = locale === 'ar';

//   // ==================== STATE ====================
//   const [currentStatus, setCurrentStatus] = useState(initialStatus);
//   const [activeTab, setActiveTab] = useState('visit');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);
  
//   // Visit Details
//   const [chiefComplaint, setChiefComplaint] = useState('');
//   const [history, setHistory] = useState('');
//   const [medications, setMedications] = useState('');
//   const [allergies, setAllergies] = useState('');
//   const [doctorNotes, setDoctorNotes] = useState('');
//   const [dischargeStatus, setDischargeStatus] = useState('NOT_DISCHARGED');
  
//   // Drugs
//   const [searchQuery, setSearchQuery] = useState('');
//   const [drugSearchResults, setDrugSearchResults] = useState([]);
//   const [favoriteDrugs, setFavoriteDrugs] = useState([]);
//   const [visitDrugs, setVisitDrugs] = useState([]);
//   const [frequencies, setFrequencies] = useState([]);
  
//   // Prescription Dialog
//   const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
//   const [selectedDrugId, setSelectedDrugId] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     duration: '',
//     durationType: '',
//     frequency: null,
//     dose: '',
//     instruction: ''
//   });
  
//   // Procedures
//   const [selectedProcedures, setSelectedProcedures] = useState([]);
//   const [radiologyProcedures, setRadiologyProcedures] = useState([]);
//   const [laboratoryProcedures, setLaboratoryProcedures] = useState([]);
//   const [medicalProcedures, setMedicalProcedures] = useState([]);
//   const [searchRadiology, setSearchRadiology] = useState('');
//   const [searchLaboratory, setSearchLaboratory] = useState('');
//   const [searchMedical, setSearchMedical] = useState('');
// const [filteredMedicalProcedures, setFilteredMedicalProcedures] = useState([]);

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       //console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== VISIT OPERATIONS ====================
//   const startVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/start`, { method: 'PUT' });
//       setCurrentStatus('IN_PROGRESS');
//       alert(t('doctor.visit.started'));
//     } catch (err) {
//       setError(t('doctor.visit.startFailed') + ': ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, t]);

//   const closeVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/close`, { method: 'PUT' });
//       alert(t('doctor.visit.closed'));
//       if (onClose) onClose();
//     } catch (err) {
//       setError(t('doctor.visit.closeFailed') + ': ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, onClose, t]);

//   const saveVisitDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const body = {
//         chiefComplaint,
//         history,
//         medications,
//         allergies,
//         doctorNotes,
//         status: dischargeStatus
//       };
      
//       await apiFetch(`/api/visits/${visitId}/details`, {
//         method: 'PUT',
//         body: JSON.stringify(body)
//       });
      
//       setIsSaved(true);
//       alert(t('doctor.visit.saved'));
//     } catch (err) {
//       setError(t('doctor.visit.saveFailed') + ': ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, chiefComplaint, history, medications, allergies, doctorNotes, dischargeStatus, apiFetch, t]);

//   // ==================== DRUG OPERATIONS ====================
//   const loadVisitDrugs = useCallback(async () => {
//     try {
//       const drugs = await apiFetch(`/api/visits/${visitId}/drugs`);
//       setVisitDrugs(drugs || []);
//     } catch (err) {
//       //console.error('Failed to load visit drugs:', err);
//     }
//   }, [visitId, apiFetch]);

//   const searchDrugs = useCallback(async () => {
//     if (!searchQuery.trim()) return;
//     try {
//       const results = await apiFetch(
//         `/api/drugs/autocomplete?name=${encodeURIComponent(searchQuery)}`
//       );
//       setDrugSearchResults(results || []);
//     } catch (err) {
//       setError('Failed to search drugs: ' + err.message);
//     }
//   }, [searchQuery, apiFetch]);

//   const addDrugToVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs`, {
//         method: 'POST',
//         body: JSON.stringify([drugId])
//       });
//       await loadVisitDrugs();
//       alert(t('doctor.visit.drugAdded'));
//     } catch (err) {
//       setError('Failed to add drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs, t]);

//   const removeDrugFromVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs/${drugId}`, {
//         method: 'DELETE'
//       });
//       await loadVisitDrugs();
//       alert(t('doctor.visit.drugRemoved'));
//     } catch (err) {
//       setError('Failed to remove drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs, t]);

//   // ==================== FAVORITE DRUGS ====================
//   const loadFavorites = useCallback(async () => {
//     try {
//       const favorites = await apiFetch(`/api/doctors/${doctorId}/favorites`);
//       const favoriteIds = Array.isArray(favorites) ? favorites : [];
      
//       if (favoriteIds.length > 0) {
//         const drugDetails = await apiFetch('/api/drugs/by-ids', {
//           method: 'POST',
//           body: JSON.stringify(favoriteIds)
//         });
//         setFavoriteDrugs(drugDetails || []);
//       } else {
//         setFavoriteDrugs([]);
//       }
//     } catch (err) {
//       //console.error('Failed to load favorites:', err);
//     }
//   }, [doctorId, apiFetch]);

//   const toggleFavorite = useCallback(async (drugId) => {
//     try {
//       const isFavorite = favoriteDrugs.some(d => d.drugId === drugId);
//       const endpoint = `/api/doctors/${doctorId}/favorites`;
      
//       if (isFavorite) {
//         await apiFetch(endpoint, {
//           method: 'DELETE',
//           body: JSON.stringify([drugId])
//         });
//       } else {
//         await apiFetch(endpoint, {
//           method: 'POST',
//           body: JSON.stringify([drugId])
//         });
//       }
//       await loadFavorites();
//     } catch (err) {
//       setError('Failed to toggle favorite: ' + err.message);
//     }
//   }, [doctorId, favoriteDrugs, apiFetch, loadFavorites]);

//   // ==================== PRESCRIPTIONS ====================
//   const loadFrequencies = useCallback(async () => {
//     try {
//       const data = await apiFetch('/api/repetitions');
//       setFrequencies(data || []);
//     } catch (err) {
//       //console.error('Failed to load frequencies:', err);
//     }
//   }, [apiFetch]);

//   const mapDurationType = useCallback((type) => {
//     const types = ['Hour', 'Day', 'Week', 'Month', 'Year'];
//     return types[parseInt(type) - 1] || '-';
//   }, []);

//   const savePrescription = useCallback(async () => {
//     if (!selectedDrugId) return;
    
//     const { duration, durationType, frequency, dose, instruction } = prescriptionData;
//     if (!duration || !durationType || !frequency) {
//       alert(t('doctor.visit.fillRequired'));
//       return;
//     }
    
//     try {
//       const body = {
//         drugId: selectedDrugId,
//         duration,
//         durationType: DURATION_TYPES.indexOf(durationType) + 1,
//         frequencyId: frequency.id,
//         frequency: frequency.repetitionDesc,
//         dose: dose || '',
//         instruction: instruction || ''
//       };
      
//       await apiFetch(`/api/visits/${visitId}/drug-prescriptions`, {
//         method: 'POST',
//         body: JSON.stringify(body)
//       });
      
//       alert(t('doctor.visit.prescriptionSaved'));
//       setShowPrescriptionDialog(false);
//       setSelectedDrugId(null);
//       setPrescriptionData({ duration: '', durationType: '', frequency: null, dose: '', instruction: '' });
//     } catch (err) {
//       setError('Failed to save prescription: ' + err.message);
//     }
//   }, [visitId, selectedDrugId, prescriptionData, apiFetch, t]);

//   const showPrescription = useCallback(async (drugId) => {
//     try {
//       const prescriptions = await apiFetch(`/api/visits/${visitId}/drug-prescriptions`);
//       const found = prescriptions?.find(p => p.drugId === drugId);
      
//       if (!found) {
//         alert(t('doctor.visit.noPrescription'));
//         return;
//       }
      
//       const message = `
//         Drug: ${found.tradeName || 'Unknown'}
//         Dose: ${found.dose || 'Not specified'}
//         Duration: ${found.duration || 'Not specified'}
//         Duration Type: ${mapDurationType(found.durationType)}
//         Frequency: ${found.frequency || 'Not specified'}
//         Instruction: ${found.instructions || 'Not specified'}
//       `;
//       alert(message);
//     } catch (err) {
//       setError('Failed to load prescription: ' + err.message);
//     }
//   }, [visitId, apiFetch, mapDurationType, t]);

//   // ==================== PROCEDURE OPERATIONS ====================
//   const loadProcedures = useCallback(async (category) => {
//     try {
//       const data = await apiFetch(`/api/procedures?category=${category}`);
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       //console.error(`Failed to load ${category} procedures:`, err);
//     }
//   }, [apiFetch]);

//   // const searchProcedures = useCallback(async (category, query) => {
//   //   if (!query.trim()) {
//   //     loadProcedures(category);
//   //     return;
//   //   }
    
//   //   try {
//   //     const data = await apiFetch(
//   //       `/api/procedures/search?category=${category}&name=${encodeURIComponent(query)}`
//   //     );
//   //     const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//   //     switch (category) {
//   //       case 'RADIOLOGY':
//   //         setRadiologyProcedures(names);
//   //         break;
//   //       case 'LABORATORY':
//   //         setLaboratoryProcedures(names);
//   //         break;
//   //       case 'MEDICAL':
//   //         setMedicalProcedures(names);
//   //         break;
//   //       default:
//   //         break;
//   //     }
//   //   } catch (err) {
//   //     setError(`Failed to search ${category} procedures: ` + err.message);
//   //   }
//   // }, [apiFetch, loadProcedures]);

// const searchProcedures = useCallback(async (category, query) => {
//   if (!query.trim()) {
//     loadProcedures(category);
//     return;
//   }

//   try {
//     const data = await apiFetch(
//       `/api/procedures/search?category=${category}&name=${encodeURIComponent(query)}`
//     );
//     const names = (data || []).map(p => p.procedureName).filter(Boolean);

//     switch (category) {
//       case 'RADIOLOGY':
//         setRadiologyProcedures(names);
//         break;
//       case 'LABORATORY':
//         setLaboratoryProcedures(names);
//         break;
//       case 'MEDICAL':
//         if (names.length === 0) {
//           // Fallback: filter from the full medical list
//           const filtered = medicalProcedures.filter(proc =>
//             proc.toLowerCase().includes(query.toLowerCase())
//           );
//           setFilteredMedicalProcedures(filtered);
//         } else {
//           setFilteredMedicalProcedures(names);
//         }
//         break;
//       default:
//         break;
//     }
//   } catch (err) {
//     setError(`Failed to search ${category} procedures: ` + err.message);
//   }
// }, [apiFetch, loadProcedures, medicalProcedures]);
  
//   const loadSelectedProcedures = useCallback(async () => {
//     try {
//       const data = await apiFetch(`/visits/${visitId}/procedures`);
//       setSelectedProcedures(data || []);
//     } catch (err) {
//       //console.error('Failed to load selected procedures:', err);
//     }
//   }, [visitId, apiFetch]);

//   const addProcedureToVisit = useCallback(async (procedure) => {
//     if (!procedure || selectedProcedures.includes(procedure)) {
//       if (selectedProcedures.includes(procedure)) {
//         alert(t('doctor.visit.selectProcedure'));
//       }
//       return;
//     }
    
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'POST' }
//       );
//       await loadSelectedProcedures();
//       alert(t('doctor.visit.procedureAdded'));
//     } catch (err) {
//       setError('Failed to add procedure: ' + err.message);
//     }
//   }, [visitId, selectedProcedures, apiFetch, loadSelectedProcedures, t]);

//   const removeProcedureFromVisit = useCallback(async (procedure) => {
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'DELETE' }
//       );
//       await loadSelectedProcedures();
//       alert(t('doctor.visit.procedureRemoved'));
//     } catch (err) {
//       setError('Failed to remove procedure: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadSelectedProcedures, t]);

//   // ==================== LOAD DATA ====================
//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([
//         loadVisitDrugs(),
//         loadFavorites(),
//         loadSelectedProcedures(),
//         loadFrequencies(),
//         loadProcedures('RADIOLOGY'),
//         loadProcedures('LABORATORY'),
//         loadProcedures('MEDICAL')
//       ]);
//     };
    
//     loadData();
//   }, [loadVisitDrugs, loadFavorites, loadSelectedProcedures, loadFrequencies, loadProcedures]);

// // Keep filtered procedures in sync when search is cleared
// useEffect(() => {
//   if (searchMedical.trim() === '') {
//     setFilteredMedicalProcedures(medicalProcedures);
//   }
// }, [medicalProcedures, searchMedical]);


//   // ==================== RENDER HELPERS ====================
//   const renderStatusBadge = (status) => {
//     const colors = {
//       'NEW': '#e74c3c',
//       'IN_PROGRESS': '#f39c12',
//       'CLOSED': '#27ae60'
//     };
//     return (
//       <span className="status-badge" style={{ backgroundColor: colors[status] || '#3498db' }}>
//         {status}
//       </span>
//     );
//   };

//   // ==================== PRESCRIPTION DIALOG ====================
//   const renderPrescriptionDialog = () => {
//     if (!showPrescriptionDialog) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowPrescriptionDialog(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <h3>📋 {t('doctor.visit.prescription')}</h3>
//           <div className="form-group">
//             <label>{t('doctor.visit.duration')}</label>
//             <input
//               type="number"
//               placeholder={t('doctor.visit.enterDuration')}
//               value={prescriptionData.duration}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.durationType')}</label>
//             <select
//               value={prescriptionData.durationType}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, durationType: e.target.value })}
//             >
//               <option value="">{t('doctor.visit.selectDurationType')}</option>
//               {DURATION_TYPES.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.frequency')}</label>
//             <select
//               value={prescriptionData.frequency?.id || ''}
//               onChange={(e) => {
//                 const freq = frequencies.find(f => f.id === parseInt(e.target.value));
//                 setPrescriptionData({ ...prescriptionData, frequency: freq });
//               }}
//             >
//               <option value="">{t('doctor.visit.selectFrequency')}</option>
//               {frequencies.map((freq) => (
//                 <option key={freq.id} value={freq.id}>
//                   {freq.repetitionDesc}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.dose')}</label>
//             <input
//               type="text"
//               placeholder={t('doctor.visit.enterDose')}
//               value={prescriptionData.dose}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, dose: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.instruction')}</label>
//             <textarea
//               placeholder={t('doctor.visit.enterInstruction')}
//               value={prescriptionData.instruction}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, instruction: e.target.value })}
//               rows={3}
//             />
//           </div>
//           <div className="modal-actions">
//             <button className="btn-cancel" onClick={() => setShowPrescriptionDialog(false)}>
//               {t('doctor.visit.cancel')}
//             </button>
//             <button className="btn-save" onClick={savePrescription}>
//               {t('doctor.visit.savePrescription')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   return (
//     <div className={`doctor-visit-screen ${isRTL ? 'rtl' : ''}`}>
//       {error && (
//         <div className="error-banner">
//           ⚠️ {error}
//           <button onClick={() => setError(null)}>✖</button>
//         </div>
//       )}
      
//       <div className="visit-header">
//         <h2>🩺 {t('doctor.visit.title').replace('{0}', visitId)}</h2>
//         <div className="header-actions">
//           {renderStatusBadge(currentStatus)}
//           <button 
//             className={`btn-start ${currentStatus !== 'NEW' ? 'disabled' : ''}`}
//             onClick={startVisit}
//             disabled={currentStatus !== 'NEW' || loading}
//           >
//             {t('doctor.visit.start')}
//           </button>
//           <button 
//             className="btn-save"
//             onClick={saveVisitDetails}
//             disabled={loading}
//           >
//             {t('doctor.visit.save')}
//           </button>
//           <button 
//             className={`btn-close ${currentStatus !== 'IN_PROGRESS' ? 'disabled' : ''}`}
//             onClick={closeVisit}
//             disabled={currentStatus !== 'IN_PROGRESS' || loading}
//           >
//             {t('doctor.visit.close')}
//           </button>
//           <button 
//             className="btn-exit"
//             onClick={onClose}
//           >
//             {t('doctor.visit.exit')}
//           </button>
//         </div>
//       </div>

//       {/* ==================== TABS ==================== */}
//       <div className="tabs">
//         <button 
//           className={`tab ${activeTab === 'visit' ? 'active' : ''}`}
//           onClick={() => setActiveTab('visit')}
//         >
//           📋 {t('doctor.visit.details')}
//         </button>
//         <button 
//           className={`tab ${activeTab === 'drugs' ? 'active' : ''}`}
//           onClick={() => setActiveTab('drugs')}
//         >
//           {t('doctor.visit.drugs')}
//         </button>
//         <button 
//           className={`tab ${activeTab === 'procedures' ? 'active' : ''}`}
//           onClick={() => setActiveTab('procedures')}
//         >
//           {t('doctor.visit.procedures')}
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'visit' && (
//           <div className="visit-tab">
//             <div className="form-group">
//               <label>{t('doctor.visit.chiefComplaint')}</label>
//               <textarea
//                 value={chiefComplaint}
//                 onChange={(e) => setChiefComplaint(e.target.value)}
//                 placeholder="Enter chief complaint..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.history')}</label>
//               <textarea
//                 value={history}
//                 onChange={(e) => setHistory(e.target.value)}
//                 placeholder="Enter history..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.medications')}</label>
//               <textarea
//                 value={medications}
//                 onChange={(e) => setMedications(e.target.value)}
//                 placeholder="Enter medications..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.allergies')}</label>
//               <textarea
//                 value={allergies}
//                 onChange={(e) => setAllergies(e.target.value)}
//                 placeholder="Enter allergies..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.doctorNotes')}</label>
//               <textarea
//                 value={doctorNotes}
//                 onChange={(e) => setDoctorNotes(e.target.value)}
//                 placeholder="Enter doctor notes..."
//                 rows={2}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.dischargeStatus')}</label>
//               {/* <select
//                 value={dischargeStatus}
//                 onChange={(e) => setDischargeStatus(e.target.value)}
//               >
//                 {DISCHARGE_STATUSES.map((status) => {
//                   const key = status.toLowerCase();
//                   const label = t(`doctor.visit.${key}`) || status.replace('_', ' ');
//                   return (
//                     <option key={status} value={status}>
//                       {label}
//                     </option>
//                   );
//                 })}
//               </select> */}


//               <select
//   value={dischargeStatus}
//   onChange={(e) => setDischargeStatus(e.target.value)}
// >
//   {DISCHARGE_STATUSES.map((status) => {
//     const statusKeys = {
//       NOT_DISCHARGED: 'notDischarged',
//       DISCHARGED: 'discharged',
//       FOLLOW_UP_REQUIRED: 'followUp',
//       REFERRED: 'referred'
//     };

//     const label = t(`doctor.visit.${statusKeys[status]}`);

//     return (
//       <option key={status} value={status}>
//         {label}
//       </option>
//     );
//   })}
// </select>
//             </div>
//           </div>
//         )}

//         {activeTab === 'drugs' && (
//           <div className="drugs-tab">
//             <div className="search-section">
//               <h3>{t('doctor.visit.searchDrugs')}</h3>
//               <div className="search-box">
//                 <input
//                   type="text"
//                   placeholder={t('doctor.visit.searchPlaceholder')}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && searchDrugs()}
//                 />
//                 <button onClick={searchDrugs}>🔍</button>
//               </div>
//             </div>

//             <div className="drug-results">
//               <h4>{t('doctor.visit.searchResults')}</h4>
//               <div className="drug-list">
//                 {drugSearchResults.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         {t('doctor.visit.add')}
//                       </button>
//                       <button 
//                         className="btn-star"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                         style={{ color: favoriteDrugs.some(d => d.drugId === drug.drugId) ? 'gold' : 'gray' }}
//                       >
//                         {favoriteDrugs.some(d => d.drugId === drug.drugId) ? '★' : '☆'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="favorites-section">
//               <h4>{t('doctor.visit.favoriteDrugs')}</h4>
//               <div className="drug-list">
//                 {favoriteDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId)}
//                       >
//                         {t('doctor.visit.add')}
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                       >
//                         {t('doctor.visit.remove')}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="visit-drugs-section">
//               <h4>{t('doctor.visit.selectedDrugs')}</h4>
//               <div className="drug-list">
//                 {visitDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-prescription"
//                         onClick={() => {
//                           setSelectedDrugId(drug.drugId);
//                           setShowPrescriptionDialog(true);
//                         }}
//                       >
//                         {t('doctor.visit.prescription')}
//                       </button>
//                       <button 
//                         className="btn-view"
//                         onClick={() => showPrescription(drug.drugId)}
//                       >
//                         {t('doctor.visit.view')}
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => removeDrugFromVisit(drug.drugId)}
//                       >
//                         {t('doctor.visit.remove')}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'procedures' && (
//           <div className="procedures-tab">
//             <div className="procedure-categories">
//               <div className="procedure-category">
//                 <h4>{t('doctor.visit.radiology')}</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder={t('doctor.visit.searchRadiology')}
//                     value={searchRadiology}
//                     onChange={(e) => setSearchRadiology(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('RADIOLOGY', searchRadiology)}
//                   />
//                   <button onClick={() => searchProcedures('RADIOLOGY', searchRadiology)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {radiologyProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>{t('doctor.visit.add')}</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>{t('doctor.visit.laboratory')}</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder={t('doctor.visit.searchLaboratory')}
//                     value={searchLaboratory}
//                     onChange={(e) => setSearchLaboratory(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('LABORATORY', searchLaboratory)}
//                   />
//                   <button onClick={() => searchProcedures('LABORATORY', searchLaboratory)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {laboratoryProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>{t('doctor.visit.add')}</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* <div className="procedure-category">
//                 <h4>{t('doctor.visit.medical')}</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder={t('doctor.visit.searchMedical')}
//                     value={searchMedical}
//                     onChange={(e) => setSearchMedical(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('MEDICAL', searchMedical)}
//                   />
//                   <button onClick={() => searchProcedures('MEDICAL', searchMedical)}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {medicalProcedures.map((proc) => (
//                     <div key={proc} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)}>{t('doctor.visit.add')}</button>
//                     </div>
//                   ))}
//                 </div>
//               </div> */}

//               <div className="procedure-category">
//   <h4>{t('doctor.visit.medical')}</h4>
//   <div className="search-box small">
//     <input
//       type="text"
//       placeholder={t('doctor.visit.searchMedical')}
//       value={searchMedical}
//       onChange={(e) => setSearchMedical(e.target.value)}
//       onKeyPress={(e) => e.key === 'Enter' && searchProcedures('MEDICAL', searchMedical)}
//     />
//     <button onClick={() => searchProcedures('MEDICAL', searchMedical)}>🔍</button>
//   </div>
//   <div className="procedure-list">
//     {/* {(searchMedical.trim() ? filteredMedicalProcedures : medicalProcedures).map((proc) => (
//       <div key={proc} className="procedure-item">
//         <span>{proc}</span>
//         <button onClick={() => addProcedureToVisit(proc)}>{t('doctor.visit.add')}</button>
//       </div>
//     ))} */}
 
// {(searchMedical.trim() ? filteredMedicalProcedures : medicalProcedures).map((proc, index) => (
//   <div key={`MEDICAL-${index}-${proc}`} className="procedure-item">
//     <span>{proc}</span>
//     <button onClick={() => addProcedureToVisit(proc)}>{t('doctor.visit.add')}</button>
//   </div>
// ))}
//   </div>
// </div>
//             </div>

//             <div className="selected-procedures">
//               <h4>{t('doctor.visit.selectedProcedures')}</h4>
//               <div className="procedure-list">
//                 {selectedProcedures.map((proc) => (
//                   <div key={proc} className="procedure-item selected">
//                     <span>{proc}</span>
//                     <button className="btn-remove" onClick={() => removeProcedureFromVisit(proc)}>
//                       {t('doctor.visit.remove')}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {renderPrescriptionDialog()}
//     </div>
//   );
// };

// export default DoctorVisitScreen;  09072026    4:00 pm 

// import React, { useState, useEffect, useCallback } from 'react';
// import { BASE_URL } from '../../utils/api';
// import './DoctorVisitScreen.css';

// // Constants
// const DISCHARGE_STATUSES = ['NOT_DISCHARGED', 'DISCHARGED', 'FOLLOW_UP_REQUIRED', 'REFERRED'];
// const DURATION_TYPES = ['Hour', 'Day', 'Week', 'Month', 'Year'];

// // ==================== LOCALIZATION ====================
// const EN_BUNDLE = {
//   'doctor.visit.title': 'Visit #{0}',
//   'doctor.visit.start': '▶ Start Visit',
//   'doctor.visit.save': '💾 Save',
//   'doctor.visit.close': '✖ Close Visit',
//   'doctor.visit.exit': '✖ Exit',
//   'doctor.visit.started': 'Visit started successfully',
//   'doctor.visit.closed': 'Visit closed successfully',
//   'doctor.visit.saved': 'Visit details saved successfully',
//   'doctor.visit.startFailed': 'Failed to start visit',
//   'doctor.visit.closeFailed': 'Failed to close visit',
//   'doctor.visit.saveFailed': 'Failed to save visit',
//   'doctor.visit.details': 'Visit Details',
//   'doctor.visit.chiefComplaint': '🩺 Chief Complaint',
//   'doctor.visit.history': '📜 History',
//   'doctor.visit.medications': '💊 Medications',
//   'doctor.visit.allergies': '⚠️ Allergies',
//   'doctor.visit.doctorNotes': '📝 Doctor Notes',
//   'doctor.visit.dischargeStatus': '📌 Discharge Status',
//   'doctor.visit.drugs': '💊 Drugs',
//   'doctor.visit.procedures': '🔬 Procedures',
//   'doctor.visit.searchDrugs': '🔍 Search Drugs',
//   'doctor.visit.searchResults': '📋 Search Results',
//   'doctor.visit.favoriteDrugs': '⭐ Favorite Drugs',
//   'doctor.visit.selectedDrugs': '💊 Selected Drugs',
//   'doctor.visit.add': '➕',
//   'doctor.visit.remove': '✖',
//   'doctor.visit.prescription': '📋',
//   'doctor.visit.view': '👁',
//   'doctor.visit.noPrescription': 'No prescription found for this drug',
//   'doctor.visit.drugAdded': 'Drug added successfully',
//   'doctor.visit.drugRemoved': 'Drug removed successfully',
//   'doctor.visit.prescriptionSaved': 'Prescription saved successfully',
//   'doctor.visit.fillRequired': 'Please fill all required fields',
//   'doctor.visit.selectProcedure': 'Procedure already selected',
//   'doctor.visit.procedureAdded': 'Procedure added successfully',
//   'doctor.visit.procedureRemoved': 'Procedure removed successfully',
//   'doctor.visit.radiology': '📡 Radiology',
//   'doctor.visit.laboratory': '🧫 Laboratory',
//   'doctor.visit.medical': '🩺 Medical',
//   'doctor.visit.selectedProcedures': '📋 Selected Procedures',
//   'doctor.visit.duration': 'Duration *',
//   'doctor.visit.durationType': 'Duration Type *',
//   'doctor.visit.frequency': 'Frequency *',
//   'doctor.visit.dose': 'Dose',
//   'doctor.visit.instruction': 'Instruction',
//   'doctor.visit.cancel': 'Cancel',
//   'doctor.visit.savePrescription': 'Save',
//   'doctor.visit.searchPlaceholder': 'Search drugs...',
//   'doctor.visit.searchRadiology': 'Search radiology...',
//   'doctor.visit.searchLaboratory': 'Search laboratory...',
//   'doctor.visit.searchMedical': 'Search medical...',
//   'doctor.visit.enterDuration': 'Enter duration',
//   'doctor.visit.enterDose': 'Enter dose',
//   'doctor.visit.enterInstruction': 'Enter instruction',
//   'doctor.visit.selectDurationType': 'Select duration type',
//   'doctor.visit.selectFrequency': 'Select frequency',
//   'doctor.visit.status': 'Status',
//   'doctor.visit.notDischarged': 'Not Discharged',
//   'doctor.visit.discharged': 'Discharged',
//   'doctor.visit.followUp': 'Follow-up Required',
//   'doctor.visit.referred': 'Referred',
//   'doctor.visit.discharge': 'Discharge'
// };

// const AR_BUNDLE = {
//   'doctor.visit.title': 'الزيارة #{0}',
//   'doctor.visit.start': '▶ بدء الزيارة',
//   'doctor.visit.save': '💾 حفظ',
//   'doctor.visit.close': '✖ إغلاق الزيارة',
//   'doctor.visit.exit': '✖ خروج',
//   'doctor.visit.started': 'تم بدء الزيارة بنجاح',
//   'doctor.visit.closed': 'تم إغلاق الزيارة بنجاح',
//   'doctor.visit.saved': 'تم حفظ تفاصيل الزيارة بنجاح',
//   'doctor.visit.startFailed': 'فشل بدء الزيارة',
//   'doctor.visit.closeFailed': 'فشل إغلاق الزيارة',
//   'doctor.visit.saveFailed': 'فشل حفظ الزيارة',
//   'doctor.visit.details': 'تفاصيل الزيارة',
//   'doctor.visit.chiefComplaint': '🩺 الشكوى الرئيسية',
//   'doctor.visit.history': '📜 التاريخ الطبي',
//   'doctor.visit.medications': '💊 الأدوية',
//   'doctor.visit.allergies': '⚠️ الحساسية',
//   'doctor.visit.doctorNotes': '📝 ملاحظات الطبيب',
//   'doctor.visit.dischargeStatus': '📌 حالة الخروج',
//   'doctor.visit.drugs': '💊 الأدوية',
//   'doctor.visit.procedures': '🔬 الإجراءات',
//   'doctor.visit.searchDrugs': '🔍 بحث عن أدوية',
//   'doctor.visit.searchResults': '📋 نتائج البحث',
//   'doctor.visit.favoriteDrugs': '⭐ الأدوية المفضلة',
//   'doctor.visit.selectedDrugs': '💊 الأدوية المختارة',
//   'doctor.visit.add': '➕',
//   'doctor.visit.remove': '✖',
//   'doctor.visit.prescription': '📋',
//   'doctor.visit.view': '👁',
//   'doctor.visit.noPrescription': 'لا توجد وصفة طبية لهذا الدواء',
//   'doctor.visit.drugAdded': 'تم إضافة الدواء بنجاح',
//   'doctor.visit.drugRemoved': 'تم حذف الدواء بنجاح',
//   'doctor.visit.prescriptionSaved': 'تم حفظ الوصفة الطبية بنجاح',
//   'doctor.visit.fillRequired': 'الرجاء ملء جميع الحقول المطلوبة',
//   'doctor.visit.selectProcedure': 'الإجراء محدد مسبقاً',
//   'doctor.visit.procedureAdded': 'تم إضافة الإجراء بنجاح',
//   'doctor.visit.procedureRemoved': 'تم حذف الإجراء بنجاح',
//   'doctor.visit.radiology': '📡 الأشعة',
//   'doctor.visit.laboratory': '🧫 المختبر',
//   'doctor.visit.medical': '🩺 الطبي',
//   'doctor.visit.selectedProcedures': '📋 الإجراءات المختارة',
//   'doctor.visit.duration': 'المدة *',
//   'doctor.visit.durationType': 'نوع المدة *',
//   'doctor.visit.frequency': 'التكرار *',
//   'doctor.visit.dose': 'الجرعة',
//   'doctor.visit.instruction': 'التعليمات',
//   'doctor.visit.cancel': 'إلغاء',
//   'doctor.visit.savePrescription': 'حفظ',
//   'doctor.visit.searchPlaceholder': 'بحث عن أدوية...',
//   'doctor.visit.searchRadiology': 'بحث عن إجراءات أشعة...',
//   'doctor.visit.searchLaboratory': 'بحث عن إجراءات مختبر...',
//   'doctor.visit.searchMedical': 'بحث عن إجراءات طبية...',
//   'doctor.visit.enterDuration': 'أدخل المدة',
//   'doctor.visit.enterDose': 'أدخل الجرعة',
//   'doctor.visit.enterInstruction': 'أدخل التعليمات',
//   'doctor.visit.selectDurationType': 'اختر نوع المدة',
//   'doctor.visit.selectFrequency': 'اختر التكرار',
//   'doctor.visit.status': 'الحالة',
//   'doctor.visit.notDischarged': 'لم يخرج',
//   'doctor.visit.discharged': 'خرج',
//   'doctor.visit.followUp': 'متابعة مطلوبة',
//   'doctor.visit.referred': 'تم التحويل',
//   'doctor.visit.discharge': 'الخروج'
// };

// const DoctorVisitScreen = ({ doctorId, visitId, initialStatus = 'NEW', username, onClose, language: propLanguage }) => {
//   // ==================== GET LANGUAGE ====================
//   const getLanguage = () => {
//     if (propLanguage) return propLanguage;
//     const storedLang = sessionStorage.getItem('lang');
//     if (storedLang) return storedLang;
//     return 'en';
//   };

//   // ==================== LOCALIZATION ====================
//   const [locale, setLocale] = useState(getLanguage());
  
//   const getBundle = useCallback(() => {
//     return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
//   }, [locale]);

//   const t = useCallback((key) => {
//     const bundle = getBundle();
//     return bundle[key] || key;
//   }, [getBundle]);

//   const isRTL = locale === 'ar';

//   // ==================== STATE ====================
//   const [currentStatus, setCurrentStatus] = useState(initialStatus);
//   const [activeTab, setActiveTab] = useState('visit');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSaved, setIsSaved] = useState(false);
  
//   // Visit Details
//   const [chiefComplaint, setChiefComplaint] = useState('');
//   const [history, setHistory] = useState('');
//   const [medications, setMedications] = useState('');
//   const [allergies, setAllergies] = useState('');
//   const [doctorNotes, setDoctorNotes] = useState('');
//   const [dischargeStatus, setDischargeStatus] = useState('NOT_DISCHARGED');
  
//   // Drugs
//   const [searchQuery, setSearchQuery] = useState('');
//   const [drugSearchResults, setDrugSearchResults] = useState([]);
//   const [favoriteDrugs, setFavoriteDrugs] = useState([]);
//   const [visitDrugs, setVisitDrugs] = useState([]);
//   const [frequencies, setFrequencies] = useState([]);
  
//   // Prescription Dialog
//   const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
//   const [selectedDrugId, setSelectedDrugId] = useState(null);
//   const [prescriptionData, setPrescriptionData] = useState({
//     duration: '',
//     durationType: '',
//     frequency: null,
//     dose: '',
//     instruction: ''
//   });
  
//   // Procedures
//   const [selectedProcedures, setSelectedProcedures] = useState([]);
//   const [radiologyProcedures, setRadiologyProcedures] = useState([]);
//   const [laboratoryProcedures, setLaboratoryProcedures] = useState([]);
//   const [medicalProcedures, setMedicalProcedures] = useState([]);
//   const [searchRadiology, setSearchRadiology] = useState('');
//   const [searchLaboratory, setSearchLaboratory] = useState('');
//   const [searchMedical, setSearchMedical] = useState('');
//   const [filteredMedicalProcedures, setFilteredMedicalProcedures] = useState([]);

//   // ==================== API HELPERS ====================
//   const apiFetch = useCallback(async (endpoint, options = {}) => {
//     const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
//     const fullUrl = `${BASE_URL}${url}`;
    
//     try {
//       const response = await fetch(fullUrl, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {})
//         }
//       });
      
//       const text = await response.text();
//       if (!response.ok) {
//         throw new Error(text || `HTTP ${response.status}`);
//       }
      
//       return text ? JSON.parse(text) : null;
//     } catch (error) {
//       //console.error('API Error:', error);
//       throw error;
//     }
//   }, []);

//   // ==================== VISIT OPERATIONS ====================
//   const startVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/start`, { method: 'PUT' });
//       setCurrentStatus('IN_PROGRESS');
//       alert(t('doctor.visit.started'));
//     } catch (err) {
//       setError(t('doctor.visit.startFailed') + ': ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, t]);

//   const closeVisit = useCallback(async () => {
//     try {
//       setLoading(true);
//       await apiFetch(`/api/visits/${visitId}/close`, { method: 'PUT' });
//       alert(t('doctor.visit.closed'));
//       if (onClose) onClose();
//     } catch (err) {
//       setError(t('doctor.visit.closeFailed') + ': ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, apiFetch, onClose, t]);

//   const saveVisitDetails = useCallback(async () => {
//     try {
//       setLoading(true);
//       const body = {
//         chiefComplaint,
//         history,
//         medications,
//         allergies,
//         doctorNotes,
//         status: dischargeStatus
//       };
      
//       await apiFetch(`/api/visits/${visitId}/details`, {
//         method: 'PUT',
//         body: JSON.stringify(body)
//       });
      
//       setIsSaved(true);
//       alert(t('doctor.visit.saved'));
//     } catch (err) {
//       setError(t('doctor.visit.saveFailed') + ': ' + err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [visitId, chiefComplaint, history, medications, allergies, doctorNotes, dischargeStatus, apiFetch, t]);

//   // ==================== DRUG OPERATIONS ====================
//   const loadVisitDrugs = useCallback(async () => {
//     try {
//       const drugs = await apiFetch(`/api/visits/${visitId}/drugs`);
//       setVisitDrugs(drugs || []);
//     } catch (err) {
//       //console.error('Failed to load visit drugs:', err);
//     }
//   }, [visitId, apiFetch]);

//   const searchDrugs = useCallback(async () => {
//     if (!searchQuery.trim()) return;
//     try {
//       const results = await apiFetch(
//         `/api/drugs/autocomplete?name=${encodeURIComponent(searchQuery)}`
//       );
//       setDrugSearchResults(results || []);
//     } catch (err) {
//       setError('Failed to search drugs: ' + err.message);
//     }
//   }, [searchQuery, apiFetch]);

//   const addDrugToVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs`, {
//         method: 'POST',
//         body: JSON.stringify([drugId])
//       });
//       await loadVisitDrugs();
//       alert(t('doctor.visit.drugAdded'));
//     } catch (err) {
//       setError('Failed to add drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs, t]);

//   const removeDrugFromVisit = useCallback(async (drugId) => {
//     try {
//       await apiFetch(`/api/visits/${visitId}/drugs/${drugId}`, {
//         method: 'DELETE'
//       });
//       await loadVisitDrugs();
//       alert(t('doctor.visit.drugRemoved'));
//     } catch (err) {
//       setError('Failed to remove drug: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadVisitDrugs, t]);

//   // ==================== FAVORITE DRUGS ====================
//   const loadFavorites = useCallback(async () => {
//     try {
//       const favorites = await apiFetch(`/api/doctors/${doctorId}/favorites`);
//       const favoriteIds = Array.isArray(favorites) ? favorites : [];
      
//       if (favoriteIds.length > 0) {
//         const drugDetails = await apiFetch('/api/drugs/by-ids', {
//           method: 'POST',
//           body: JSON.stringify(favoriteIds)
//         });
//         setFavoriteDrugs(drugDetails || []);
//       } else {
//         setFavoriteDrugs([]);
//       }
//     } catch (err) {
//       //console.error('Failed to load favorites:', err);
//     }
//   }, [doctorId, apiFetch]);

//   const toggleFavorite = useCallback(async (drugId) => {
//     try {
//       const isFavorite = favoriteDrugs.some(d => d.drugId === drugId);
//       const endpoint = `/api/doctors/${doctorId}/favorites`;
      
//       if (isFavorite) {
//         await apiFetch(endpoint, {
//           method: 'DELETE',
//           body: JSON.stringify([drugId])
//         });
//       } else {
//         await apiFetch(endpoint, {
//           method: 'POST',
//           body: JSON.stringify([drugId])
//         });
//       }
//       await loadFavorites();
//     } catch (err) {
//       setError('Failed to toggle favorite: ' + err.message);
//     }
//   }, [doctorId, favoriteDrugs, apiFetch, loadFavorites]);

//   // ==================== PRESCRIPTIONS ====================
//   const loadFrequencies = useCallback(async () => {
//     try {
//       const data = await apiFetch('/api/repetitions');
//       setFrequencies(data || []);
//     } catch (err) {
//       //console.error('Failed to load frequencies:', err);
//     }
//   }, [apiFetch]);

//   const mapDurationType = useCallback((type) => {
//     const types = ['Hour', 'Day', 'Week', 'Month', 'Year'];
//     return types[parseInt(type) - 1] || '-';
//   }, []);

//   const savePrescription = useCallback(async () => {
//     if (!selectedDrugId) return;
    
//     const { duration, durationType, frequency, dose, instruction } = prescriptionData;
//     if (!duration || !durationType || !frequency) {
//       alert(t('doctor.visit.fillRequired'));
//       return;
//     }
    
//     try {
//       const body = {
//         drugId: selectedDrugId,
//         duration,
//         durationType: DURATION_TYPES.indexOf(durationType) + 1,
//         frequencyId: frequency.id,
//         frequency: frequency.repetitionDesc,
//         dose: dose || '',
//         instruction: instruction || ''
//       };
      
//       await apiFetch(`/api/visits/${visitId}/drug-prescriptions`, {
//         method: 'POST',
//         body: JSON.stringify(body)
//       });
      
//       alert(t('doctor.visit.prescriptionSaved'));
//       setShowPrescriptionDialog(false);
//       setSelectedDrugId(null);
//       setPrescriptionData({ duration: '', durationType: '', frequency: null, dose: '', instruction: '' });
//     } catch (err) {
//       setError('Failed to save prescription: ' + err.message);
//     }
//   }, [visitId, selectedDrugId, prescriptionData, apiFetch, t]);

//   const showPrescription = useCallback(async (drugId) => {
//     try {
//       const prescriptions = await apiFetch(`/api/visits/${visitId}/drug-prescriptions`);
//       const found = prescriptions?.find(p => p.drugId === drugId);
      
//       if (!found) {
//         alert(t('doctor.visit.noPrescription'));
//         return;
//       }
      
//       const message = `
//         Drug: ${found.tradeName || 'Unknown'}
//         Dose: ${found.dose || 'Not specified'}
//         Duration: ${found.duration || 'Not specified'}
//         Duration Type: ${mapDurationType(found.durationType)}
//         Frequency: ${found.frequency || 'Not specified'}
//         Instruction: ${found.instructions || 'Not specified'}
//       `;
//       alert(message);
//     } catch (err) {
//       setError('Failed to load prescription: ' + err.message);
//     }
//   }, [visitId, apiFetch, mapDurationType, t]);

//   // ==================== PROCEDURE OPERATIONS ====================
//   const loadProcedures = useCallback(async (category) => {
//     try {
//       const data = await apiFetch(`/api/procedures?category=${category}`);
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           setMedicalProcedures(names);
//           setFilteredMedicalProcedures(names); // Initialize filtered list
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       //console.error(`Failed to load ${category} procedures:`, err);
//     }
//   }, [apiFetch]);

//   const searchProcedures = useCallback(async (category, query) => {
//     if (!query.trim()) {
//       loadProcedures(category);
//       return;
//     }

//     try {
//       const data = await apiFetch(
//         `/api/procedures/search?category=${category}&name=${encodeURIComponent(query)}`
//       );
//       const names = (data || []).map(p => p.procedureName).filter(Boolean);

//       switch (category) {
//         case 'RADIOLOGY':
//           setRadiologyProcedures(names);
//           break;
//         case 'LABORATORY':
//           setLaboratoryProcedures(names);
//           break;
//         case 'MEDICAL':
//           if (names.length === 0) {
//             // Fallback: filter from the full medical list
//             const filtered = medicalProcedures.filter(proc =>
//               proc.toLowerCase().includes(query.toLowerCase())
//             );
//             setFilteredMedicalProcedures(filtered);
//           } else {
//             setFilteredMedicalProcedures(names);
//           }
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       setError(`Failed to search ${category} procedures: ` + err.message);
//     }
//   }, [apiFetch, loadProcedures, medicalProcedures]);
  
//   const loadSelectedProcedures = useCallback(async () => {
//     try {
//       const data = await apiFetch(`/visits/${visitId}/procedures`);
//       setSelectedProcedures(data || []);
//     } catch (err) {
//       //console.error('Failed to load selected procedures:', err);
//     }
//   }, [visitId, apiFetch]);

//   const addProcedureToVisit = useCallback(async (procedure) => {
//     if (!procedure || selectedProcedures.includes(procedure)) {
//       if (selectedProcedures.includes(procedure)) {
//         alert(t('doctor.visit.selectProcedure'));
//       }
//       return;
//     }
    
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'POST' }
//       );
//       await loadSelectedProcedures();
//       alert(t('doctor.visit.procedureAdded'));
//     } catch (err) {
//       setError('Failed to add procedure: ' + err.message);
//     }
//   }, [visitId, selectedProcedures, apiFetch, loadSelectedProcedures, t]);

//   const removeProcedureFromVisit = useCallback(async (procedure) => {
//     try {
//       await apiFetch(
//         `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
//         { method: 'DELETE' }
//       );
//       await loadSelectedProcedures();
//       alert(t('doctor.visit.procedureRemoved'));
//     } catch (err) {
//       setError('Failed to remove procedure: ' + err.message);
//     }
//   }, [visitId, apiFetch, loadSelectedProcedures, t]);

//   // ==================== LOAD DATA ====================
//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([
//         loadVisitDrugs(),
//         loadFavorites(),
//         loadSelectedProcedures(),
//         loadFrequencies(),
//         loadProcedures('RADIOLOGY'),
//         loadProcedures('LABORATORY'),
//         loadProcedures('MEDICAL')
//       ]);
//     };
    
//     loadData();
//   }, [loadVisitDrugs, loadFavorites, loadSelectedProcedures, loadFrequencies, loadProcedures]);

//   // Keep filtered procedures in sync when search is cleared
//   useEffect(() => {
//     if (searchMedical.trim() === '') {
//       setFilteredMedicalProcedures(medicalProcedures);
//     }
//   }, [medicalProcedures, searchMedical]);

//   // ==================== RENDER HELPERS ====================
//   const renderStatusBadge = (status) => {
//     const colors = {
//       'NEW': '#e74c3c',
//       'IN_PROGRESS': '#f39c12',
//       'CLOSED': '#27ae60'
//     };
//     return (
//       <span className="status-badge" style={{ backgroundColor: colors[status] || '#3498db' }}>
//         {status}
//       </span>
//     );
//   };

//   // ==================== PRESCRIPTION DIALOG ====================
//   const renderPrescriptionDialog = () => {
//     if (!showPrescriptionDialog) return null;
    
//     return (
//       <div className="modal-overlay" onClick={() => setShowPrescriptionDialog(false)}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <h3>📋 {t('doctor.visit.prescription')}</h3>
//           <div className="form-group">
//             <label>{t('doctor.visit.duration')}</label>
//             <input
//               type="number"
//               placeholder={t('doctor.visit.enterDuration')}
//               value={prescriptionData.duration}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.durationType')}</label>
//             <select
//               value={prescriptionData.durationType}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, durationType: e.target.value })}
//             >
//               <option value="">{t('doctor.visit.selectDurationType')}</option>
//               {DURATION_TYPES.map((type) => (
//                 <option key={type} value={type}>{type}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.frequency')}</label>
//             <select
//               value={prescriptionData.frequency?.id || ''}
//               onChange={(e) => {
//                 const freq = frequencies.find(f => f.id === parseInt(e.target.value));
//                 setPrescriptionData({ ...prescriptionData, frequency: freq });
//               }}
//             >
//               <option value="">{t('doctor.visit.selectFrequency')}</option>
//               {frequencies.map((freq) => (
//                 <option key={freq.id} value={freq.id}>
//                   {freq.repetitionDesc}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.dose')}</label>
//             <input
//               type="text"
//               placeholder={t('doctor.visit.enterDose')}
//               value={prescriptionData.dose}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, dose: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>{t('doctor.visit.instruction')}</label>
//             <textarea
//               placeholder={t('doctor.visit.enterInstruction')}
//               value={prescriptionData.instruction}
//               onChange={(e) => setPrescriptionData({ ...prescriptionData, instruction: e.target.value })}
//               rows={3}
//             />
//           </div>
//           <div className="modal-actions">
//             <button className="btn-cancel" onClick={() => setShowPrescriptionDialog(false)}>
//               {t('doctor.visit.cancel')}
//             </button>
//             <button className="btn-save" onClick={savePrescription}>
//               {t('doctor.visit.savePrescription')}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // ==================== RENDER ====================
//   return (
//     <div className={`doctor-visit-screen ${isRTL ? 'rtl' : ''}`}>
//       {error && (
//         <div className="error-banner">
//           ⚠️ {error}
//           <button onClick={() => setError(null)}>✖</button>
//         </div>
//       )}
      
//       <div className="visit-header">
//         <h2>🩺 {t('doctor.visit.title').replace('{0}', visitId)}</h2>
//         <div className="header-actions">
//           {renderStatusBadge(currentStatus)}
//           <button 
//             className={`btn-start ${currentStatus !== 'NEW' ? 'disabled' : ''}`}
//             onClick={startVisit}
//             disabled={currentStatus !== 'NEW' || loading}
//           >
//             {t('doctor.visit.start')}
//           </button>
//           <button 
//             className="btn-save"
//             onClick={saveVisitDetails}
//             disabled={loading}
//           >
//             {t('doctor.visit.save')}
//           </button>
//           <button 
//             className={`btn-close ${currentStatus !== 'IN_PROGRESS' ? 'disabled' : ''}`}
//             onClick={closeVisit}
//             disabled={currentStatus !== 'IN_PROGRESS' || loading}
//           >
//             {t('doctor.visit.close')}
//           </button>
//           <button 
//             className="btn-exit"
//             onClick={onClose}
//           >
//             {t('doctor.visit.exit')}
//           </button>
//         </div>
//       </div>

//       {/* Visit Not Started Banner */}
//       {currentStatus === 'NEW' && (
//         <div className="visit-not-started-banner" style={{ 
//           backgroundColor: '#f39c12', 
//           color: 'white', 
//           padding: '10px', 
//           borderRadius: '5px',
//           marginBottom: '15px',
//           textAlign: 'center',
//           fontWeight: 'bold'
//         }}>
//           ⚠️ This visit has not been started yet. Please click "▶ Start Visit" to begin editing.
//         </div>
//       )}

//       {/* ==================== TABS ==================== */}
//       <div className="tabs">
//         <button 
//           className={`tab ${activeTab === 'visit' ? 'active' : ''}`}
//           onClick={() => setActiveTab('visit')}
//         >
//           📋 {t('doctor.visit.details')}
//         </button>
//         <button 
//           className={`tab ${activeTab === 'drugs' ? 'active' : ''}`}
//           onClick={() => setActiveTab('drugs')}
//         >
//           {t('doctor.visit.drugs')}
//         </button>
//         <button 
//           className={`tab ${activeTab === 'procedures' ? 'active' : ''}`}
//           onClick={() => setActiveTab('procedures')}
//         >
//           {t('doctor.visit.procedures')}
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 'visit' && (
//           <div className="visit-tab">
//             <div className="form-group">
//               <label>{t('doctor.visit.chiefComplaint')}</label>
//               <textarea
//                 value={chiefComplaint}
//                 onChange={(e) => setChiefComplaint(e.target.value)}
//                 placeholder="Enter chief complaint..."
//                 rows={2}
//                 disabled={currentStatus === 'NEW'}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.history')}</label>
//               <textarea
//                 value={history}
//                 onChange={(e) => setHistory(e.target.value)}
//                 placeholder="Enter history..."
//                 rows={2}
//                 disabled={currentStatus === 'NEW'}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.medications')}</label>
//               <textarea
//                 value={medications}
//                 onChange={(e) => setMedications(e.target.value)}
//                 placeholder="Enter medications..."
//                 rows={2}
//                 disabled={currentStatus === 'NEW'}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.allergies')}</label>
//               <textarea
//                 value={allergies}
//                 onChange={(e) => setAllergies(e.target.value)}
//                 placeholder="Enter allergies..."
//                 rows={2}
//                 disabled={currentStatus === 'NEW'}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.doctorNotes')}</label>
//               <textarea
//                 value={doctorNotes}
//                 onChange={(e) => setDoctorNotes(e.target.value)}
//                 placeholder="Enter doctor notes..."
//                 rows={2}
//                 disabled={currentStatus === 'NEW'}
//               />
//             </div>
//             <div className="form-group">
//               <label>{t('doctor.visit.dischargeStatus')}</label>
//               <select
//                 value={dischargeStatus}
//                 onChange={(e) => setDischargeStatus(e.target.value)}
//                 disabled={currentStatus === 'NEW'}
//               >
//                 {DISCHARGE_STATUSES.map((status) => {
//                   const statusKeys = {
//                     NOT_DISCHARGED: 'notDischarged',
//                     DISCHARGED: 'discharged',
//                     FOLLOW_UP_REQUIRED: 'followUp',
//                     REFERRED: 'referred'
//                   };

//                   const label = t(`doctor.visit.${statusKeys[status]}`);

//                   return (
//                     <option key={status} value={status}>
//                       {label}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//           </div>
//         )}

//         {activeTab === 'drugs' && (
//           <div className="drugs-tab">
//             <div className="search-section">
//               <h3>{t('doctor.visit.searchDrugs')}</h3>
//               <div className="search-box">
//                 <input
//                   type="text"
//                   placeholder={t('doctor.visit.searchPlaceholder')}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && searchDrugs()}
//                   disabled={currentStatus === 'NEW'}
//                 />
//                 <button onClick={searchDrugs} disabled={currentStatus === 'NEW'}>🔍</button>
//               </div>
//             </div>

//             <div className="drug-results">
//               <h4>{t('doctor.visit.searchResults')}</h4>
//               <div className="drug-list">
//                 {drugSearchResults.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId) || currentStatus === 'NEW'}
//                       >
//                         {t('doctor.visit.add')}
//                       </button>
//                       <button 
//                         className="btn-star"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                         style={{ color: favoriteDrugs.some(d => d.drugId === drug.drugId) ? 'gold' : 'gray' }}
//                         disabled={currentStatus === 'NEW'}
//                       >
//                         {favoriteDrugs.some(d => d.drugId === drug.drugId) ? '★' : '☆'}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="favorites-section">
//               <h4>{t('doctor.visit.favoriteDrugs')}</h4>
//               <div className="drug-list">
//                 {favoriteDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-add"
//                         onClick={() => addDrugToVisit(drug.drugId)}
//                         disabled={visitDrugs.some(d => d.drugId === drug.drugId) || currentStatus === 'NEW'}
//                       >
//                         {t('doctor.visit.add')}
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => toggleFavorite(drug.drugId)}
//                         disabled={currentStatus === 'NEW'}
//                       >
//                         {t('doctor.visit.remove')}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="visit-drugs-section">
//               <h4>{t('doctor.visit.selectedDrugs')}</h4>
//               <div className="drug-list">
//                 {visitDrugs.map((drug) => (
//                   <div key={drug.drugId} className="drug-item">
//                     <span>
//                       {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
//                     </span>
//                     <div className="drug-actions">
//                       <button 
//                         className="btn-prescription"
//                         onClick={() => {
//                           setSelectedDrugId(drug.drugId);
//                           setShowPrescriptionDialog(true);
//                         }}
//                         disabled={currentStatus === 'NEW'}
//                       >
//                         {t('doctor.visit.prescription')}
//                       </button>
//                       <button 
//                         className="btn-view"
//                         onClick={() => showPrescription(drug.drugId)}
//                         disabled={currentStatus === 'NEW'}
//                       >
//                         {t('doctor.visit.view')}
//                       </button>
//                       <button 
//                         className="btn-remove"
//                         onClick={() => removeDrugFromVisit(drug.drugId)}
//                         disabled={currentStatus === 'NEW'}
//                       >
//                         {t('doctor.visit.remove')}
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'procedures' && (
//           <div className="procedures-tab">
//             <div className="procedure-categories">
//               <div className="procedure-category">
//                 <h4>{t('doctor.visit.radiology')}</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder={t('doctor.visit.searchRadiology')}
//                     value={searchRadiology}
//                     onChange={(e) => setSearchRadiology(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('RADIOLOGY', searchRadiology)}
//                     disabled={currentStatus === 'NEW'}
//                   />
//                   <button onClick={() => searchProcedures('RADIOLOGY', searchRadiology)} disabled={currentStatus === 'NEW'}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {radiologyProcedures.map((proc, index) => (
//                     <div key={`RADIOLOGY-${index}-${proc}`} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)} disabled={currentStatus === 'NEW'}>
//                         {t('doctor.visit.add')}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>{t('doctor.visit.laboratory')}</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder={t('doctor.visit.searchLaboratory')}
//                     value={searchLaboratory}
//                     onChange={(e) => setSearchLaboratory(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('LABORATORY', searchLaboratory)}
//                     disabled={currentStatus === 'NEW'}
//                   />
//                   <button onClick={() => searchProcedures('LABORATORY', searchLaboratory)} disabled={currentStatus === 'NEW'}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {laboratoryProcedures.map((proc, index) => (
//                     <div key={`LABORATORY-${index}-${proc}`} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)} disabled={currentStatus === 'NEW'}>
//                         {t('doctor.visit.add')}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="procedure-category">
//                 <h4>{t('doctor.visit.medical')}</h4>
//                 <div className="search-box small">
//                   <input
//                     type="text"
//                     placeholder={t('doctor.visit.searchMedical')}
//                     value={searchMedical}
//                     onChange={(e) => setSearchMedical(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && searchProcedures('MEDICAL', searchMedical)}
//                     disabled={currentStatus === 'NEW'}
//                   />
//                   <button onClick={() => searchProcedures('MEDICAL', searchMedical)} disabled={currentStatus === 'NEW'}>🔍</button>
//                 </div>
//                 <div className="procedure-list">
//                   {(searchMedical.trim() ? filteredMedicalProcedures : medicalProcedures).map((proc, index) => (
//                     <div key={`MEDICAL-${index}-${proc}`} className="procedure-item">
//                       <span>{proc}</span>
//                       <button onClick={() => addProcedureToVisit(proc)} disabled={currentStatus === 'NEW'}>
//                         {t('doctor.visit.add')}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="selected-procedures">
//               <h4>{t('doctor.visit.selectedProcedures')}</h4>
//               <div className="procedure-list">
//                 {selectedProcedures.map((proc, index) => (
//                   <div key={`SELECTED-${index}-${proc}`} className="procedure-item selected">
//                     <span>{proc}</span>
//                     <button className="btn-remove" onClick={() => removeProcedureFromVisit(proc)} disabled={currentStatus === 'NEW'}>
//                       {t('doctor.visit.remove')}
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {renderPrescriptionDialog()}
//     </div>
//   );
// };

// export default DoctorVisitScreen;  11072026 11:20 pm

import React, { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '../../utils/api';

// Constants
const DISCHARGE_STATUSES = ['NOT_DISCHARGED', 'DISCHARGED', 'FOLLOW_UP_REQUIRED', 'REFERRED'];
const DURATION_TYPES = ['Hour', 'Day', 'Week', 'Month', 'Year'];

// ==================== LOCALIZATION ====================
const EN_BUNDLE = {
  'doctor.visit.title': 'Visit #{0}',
  'doctor.visit.start': '▶ Start Visit',
  'doctor.visit.save': '💾 Save',
  'doctor.visit.close': '✖ Close Visit',
  'doctor.visit.exit': '✖ Exit',
  'doctor.visit.started': 'Visit started successfully',
  'doctor.visit.closed': 'Visit closed successfully',
  'doctor.visit.saved': 'Visit details saved successfully',
  'doctor.visit.startFailed': 'Failed to start visit',
  'doctor.visit.closeFailed': 'Failed to close visit',
  'doctor.visit.saveFailed': 'Failed to save visit',
  'doctor.visit.details': 'Visit Details',
  'doctor.visit.chiefComplaint': '🩺 Chief Complaint',
  'doctor.visit.history': '📜 History',
  'doctor.visit.medications': '💊 Medications',
  'doctor.visit.allergies': '⚠️ Allergies',
  'doctor.visit.doctorNotes': '📝 Doctor Notes',
  'doctor.visit.dischargeStatus': '📌 Discharge Status',
  'doctor.visit.drugs': '💊 Drugs',
  'doctor.visit.procedures': '🔬 Procedures',
  'doctor.visit.searchDrugs': '🔍 Search Drugs',
  'doctor.visit.searchResults': '📋 Search Results',
  'doctor.visit.favoriteDrugs': '⭐ Favorite Drugs',
  'doctor.visit.selectedDrugs': '💊 Selected Drugs',
  'doctor.visit.add': '➕',
  'doctor.visit.remove': '✖',
  'doctor.visit.prescription': '📋',
  'doctor.visit.view': '👁',
  'doctor.visit.noPrescription': 'No prescription found for this drug',
  'doctor.visit.drugAdded': 'Drug added successfully',
  'doctor.visit.drugRemoved': 'Drug removed successfully',
  'doctor.visit.prescriptionSaved': 'Prescription saved successfully',
  'doctor.visit.fillRequired': 'Please fill all required fields',
  'doctor.visit.selectProcedure': 'Procedure already selected',
  'doctor.visit.procedureAdded': 'Procedure added successfully',
  'doctor.visit.procedureRemoved': 'Procedure removed successfully',
  'doctor.visit.radiology': '📡 Radiology',
  'doctor.visit.laboratory': '🧫 Laboratory',
  'doctor.visit.medical': '🩺 Medical',
  'doctor.visit.selectedProcedures': '📋 Selected Procedures',
  'doctor.visit.duration': 'Duration *',
  'doctor.visit.durationType': 'Duration Type *',
  'doctor.visit.frequency': 'Frequency *',
  'doctor.visit.dose': 'Dose',
  'doctor.visit.instruction': 'Instruction',
  'doctor.visit.cancel': 'Cancel',
  'doctor.visit.savePrescription': 'Save',
  'doctor.visit.searchPlaceholder': 'Search drugs...',
  'doctor.visit.searchRadiology': 'Search radiology...',
  'doctor.visit.searchLaboratory': 'Search laboratory...',
  'doctor.visit.searchMedical': 'Search medical...',
  'doctor.visit.enterDuration': 'Enter duration',
  'doctor.visit.enterDose': 'Enter dose',
  'doctor.visit.enterInstruction': 'Enter instruction',
  'doctor.visit.selectDurationType': 'Select duration type',
  'doctor.visit.selectFrequency': 'Select frequency',
  'doctor.visit.status': 'Status',
  'doctor.visit.notDischarged': 'Not Discharged',
  'doctor.visit.discharged': 'Discharged',
  'doctor.visit.followUp': 'Follow-up Required',
  'doctor.visit.referred': 'Referred',
  'doctor.visit.discharge': 'Discharge'
};

const AR_BUNDLE = {
  'doctor.visit.title': 'الزيارة #{0}',
  'doctor.visit.start': '▶ بدء الزيارة',
  'doctor.visit.save': '💾 حفظ',
  'doctor.visit.close': '✖ إغلاق الزيارة',
  'doctor.visit.exit': '✖ خروج',
  'doctor.visit.started': 'تم بدء الزيارة بنجاح',
  'doctor.visit.closed': 'تم إغلاق الزيارة بنجاح',
  'doctor.visit.saved': 'تم حفظ تفاصيل الزيارة بنجاح',
  'doctor.visit.startFailed': 'فشل بدء الزيارة',
  'doctor.visit.closeFailed': 'فشل إغلاق الزيارة',
  'doctor.visit.saveFailed': 'فشل حفظ الزيارة',
  'doctor.visit.details': 'تفاصيل الزيارة',
  'doctor.visit.chiefComplaint': '🩺 الشكوى الرئيسية',
  'doctor.visit.history': '📜 التاريخ الطبي',
  'doctor.visit.medications': '💊 الأدوية',
  'doctor.visit.allergies': '⚠️ الحساسية',
  'doctor.visit.doctorNotes': '📝 ملاحظات الطبيب',
  'doctor.visit.dischargeStatus': '📌 حالة الخروج',
  'doctor.visit.drugs': '💊 الأدوية',
  'doctor.visit.procedures': '🔬 الإجراءات',
  'doctor.visit.searchDrugs': '🔍 بحث عن أدوية',
  'doctor.visit.searchResults': '📋 نتائج البحث',
  'doctor.visit.favoriteDrugs': '⭐ الأدوية المفضلة',
  'doctor.visit.selectedDrugs': '💊 الأدوية المختارة',
  'doctor.visit.add': '➕',
  'doctor.visit.remove': '✖',
  'doctor.visit.prescription': '📋',
  'doctor.visit.view': '👁',
  'doctor.visit.noPrescription': 'لا توجد وصفة طبية لهذا الدواء',
  'doctor.visit.drugAdded': 'تم إضافة الدواء بنجاح',
  'doctor.visit.drugRemoved': 'تم حذف الدواء بنجاح',
  'doctor.visit.prescriptionSaved': 'تم حفظ الوصفة الطبية بنجاح',
  'doctor.visit.fillRequired': 'الرجاء ملء جميع الحقول المطلوبة',
  'doctor.visit.selectProcedure': 'الإجراء محدد مسبقاً',
  'doctor.visit.procedureAdded': 'تم إضافة الإجراء بنجاح',
  'doctor.visit.procedureRemoved': 'تم حذف الإجراء بنجاح',
  'doctor.visit.radiology': '📡 الأشعة',
  'doctor.visit.laboratory': '🧫 المختبر',
  'doctor.visit.medical': '🩺 الطبي',
  'doctor.visit.selectedProcedures': '📋 الإجراءات المختارة',
  'doctor.visit.duration': 'المدة *',
  'doctor.visit.durationType': 'نوع المدة *',
  'doctor.visit.frequency': 'التكرار *',
  'doctor.visit.dose': 'الجرعة',
  'doctor.visit.instruction': 'التعليمات',
  'doctor.visit.cancel': 'إلغاء',
  'doctor.visit.savePrescription': 'حفظ',
  'doctor.visit.searchPlaceholder': 'بحث عن أدوية...',
  'doctor.visit.searchRadiology': 'بحث عن إجراءات أشعة...',
  'doctor.visit.searchLaboratory': 'بحث عن إجراءات مختبر...',
  'doctor.visit.searchMedical': 'بحث عن إجراءات طبية...',
  'doctor.visit.enterDuration': 'أدخل المدة',
  'doctor.visit.enterDose': 'أدخل الجرعة',
  'doctor.visit.enterInstruction': 'أدخل التعليمات',
  'doctor.visit.selectDurationType': 'اختر نوع المدة',
  'doctor.visit.selectFrequency': 'اختر التكرار',
  'doctor.visit.status': 'الحالة',
  'doctor.visit.notDischarged': 'لم يخرج',
  'doctor.visit.discharged': 'خرج',
  'doctor.visit.followUp': 'متابعة مطلوبة',
  'doctor.visit.referred': 'تم التحويل',
  'doctor.visit.discharge': 'الخروج'
};

const DoctorVisitScreen = ({ doctorId, visitId, initialStatus = 'NEW', username, onClose, language: propLanguage }) => {
  // ==================== GET LANGUAGE ====================
  const getLanguage = () => {
    if (propLanguage) return propLanguage;
    const storedLang = sessionStorage.getItem('lang');
    if (storedLang) return storedLang;
    return 'en';
  };

  // ==================== LOCALIZATION ====================
  const [locale, setLocale] = useState(getLanguage());
  
  const getBundle = useCallback(() => {
    return locale === 'ar' ? AR_BUNDLE : EN_BUNDLE;
  }, [locale]);

  const t = useCallback((key) => {
    const bundle = getBundle();
    return bundle[key] || key;
  }, [getBundle]);

  const isRTL = locale === 'ar';

  // ==================== STATE ====================
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [activeTab, setActiveTab] = useState('visit');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  
  // Visit Details
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [history, setHistory] = useState('');
  const [medications, setMedications] = useState('');
  const [allergies, setAllergies] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [dischargeStatus, setDischargeStatus] = useState('NOT_DISCHARGED');
  
  // Drugs
  const [searchQuery, setSearchQuery] = useState('');
  const [drugSearchResults, setDrugSearchResults] = useState([]);
  const [favoriteDrugs, setFavoriteDrugs] = useState([]);
  const [visitDrugs, setVisitDrugs] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  
  // Prescription Dialog
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [selectedDrugId, setSelectedDrugId] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    duration: '',
    durationType: '',
    frequency: null,
    dose: '',
    instruction: ''
  });
  
  // Procedures
  const [selectedProcedures, setSelectedProcedures] = useState([]);
  const [radiologyProcedures, setRadiologyProcedures] = useState([]);
  const [laboratoryProcedures, setLaboratoryProcedures] = useState([]);
  const [medicalProcedures, setMedicalProcedures] = useState([]);
  const [searchRadiology, setSearchRadiology] = useState('');
  const [searchLaboratory, setSearchLaboratory] = useState('');
  const [searchMedical, setSearchMedical] = useState('');
  const [filteredMedicalProcedures, setFilteredMedicalProcedures] = useState([]);

  // ==================== API HELPERS ====================
  const apiFetch = useCallback(async (endpoint, options = {}) => {
    const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const fullUrl = `${BASE_URL}${url}`;
    
    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        }
      });
      
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || `HTTP ${response.status}`);
      }
      
      return text ? JSON.parse(text) : null;
    } catch (error) {
      throw error;
    }
  }, []);

  // ==================== VISIT OPERATIONS ====================
  const startVisit = useCallback(async () => {
    try {
      setLoading(true);
      await apiFetch(`/api/visits/${visitId}/start`, { method: 'PUT' });
      setCurrentStatus('IN_PROGRESS');
      alert(t('doctor.visit.started'));
    } catch (err) {
      setError(t('doctor.visit.startFailed') + ': ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [visitId, apiFetch, t]);

  const closeVisit = useCallback(async () => {
    try {
      setLoading(true);
      await apiFetch(`/api/visits/${visitId}/close`, { method: 'PUT' });
      alert(t('doctor.visit.closed'));
      if (onClose) onClose();
    } catch (err) {
      setError(t('doctor.visit.closeFailed') + ': ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [visitId, apiFetch, onClose, t]);

  const saveVisitDetails = useCallback(async () => {
    try {
      setLoading(true);
      const body = {
        chiefComplaint,
        history,
        medications,
        allergies,
        doctorNotes,
        status: dischargeStatus
      };
      
      await apiFetch(`/api/visits/${visitId}/details`, {
        method: 'PUT',
        body: JSON.stringify(body)
      });
      
      setIsSaved(true);
      alert(t('doctor.visit.saved'));
    } catch (err) {
      setError(t('doctor.visit.saveFailed') + ': ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [visitId, chiefComplaint, history, medications, allergies, doctorNotes, dischargeStatus, apiFetch, t]);

  // ==================== DRUG OPERATIONS ====================
  const loadVisitDrugs = useCallback(async () => {
    try {
      const drugs = await apiFetch(`/api/visits/${visitId}/drugs`);
      setVisitDrugs(drugs || []);
    } catch (err) {
      //console.error('Failed to load visit drugs:', err);
    }
  }, [visitId, apiFetch]);

  const searchDrugs = useCallback(async () => {
    if (!searchQuery.trim()) return;
    try {
      const results = await apiFetch(
        `/api/drugs/autocomplete?name=${encodeURIComponent(searchQuery)}`
      );
      setDrugSearchResults(results || []);
    } catch (err) {
      setError('Failed to search drugs: ' + err.message);
    }
  }, [searchQuery, apiFetch]);

  const addDrugToVisit = useCallback(async (drugId) => {
    try {
      await apiFetch(`/api/visits/${visitId}/drugs`, {
        method: 'POST',
        body: JSON.stringify([drugId])
      });
      await loadVisitDrugs();
      alert(t('doctor.visit.drugAdded'));
    } catch (err) {
      setError('Failed to add drug: ' + err.message);
    }
  }, [visitId, apiFetch, loadVisitDrugs, t]);

  const removeDrugFromVisit = useCallback(async (drugId) => {
    try {
      await apiFetch(`/api/visits/${visitId}/drugs/${drugId}`, {
        method: 'DELETE'
      });
      await loadVisitDrugs();
      alert(t('doctor.visit.drugRemoved'));
    } catch (err) {
      setError('Failed to remove drug: ' + err.message);
    }
  }, [visitId, apiFetch, loadVisitDrugs, t]);

  // ==================== FAVORITE DRUGS ====================
  const loadFavorites = useCallback(async () => {
    try {
      const favorites = await apiFetch(`/api/doctors/${doctorId}/favorites`);
      const favoriteIds = Array.isArray(favorites) ? favorites : [];
      
      if (favoriteIds.length > 0) {
        const drugDetails = await apiFetch('/api/drugs/by-ids', {
          method: 'POST',
          body: JSON.stringify(favoriteIds)
        });
        setFavoriteDrugs(drugDetails || []);
      } else {
        setFavoriteDrugs([]);
      }
    } catch (err) {
      //console.error('Failed to load favorites:', err);
    }
  }, [doctorId, apiFetch]);

  const toggleFavorite = useCallback(async (drugId) => {
    try {
      const isFavorite = favoriteDrugs.some(d => d.drugId === drugId);
      const endpoint = `/api/doctors/${doctorId}/favorites`;
      
      if (isFavorite) {
        await apiFetch(endpoint, {
          method: 'DELETE',
          body: JSON.stringify([drugId])
        });
      } else {
        await apiFetch(endpoint, {
          method: 'POST',
          body: JSON.stringify([drugId])
        });
      }
      await loadFavorites();
    } catch (err) {
      setError('Failed to toggle favorite: ' + err.message);
    }
  }, [doctorId, favoriteDrugs, apiFetch, loadFavorites]);

  // ==================== PRESCRIPTIONS ====================
  const loadFrequencies = useCallback(async () => {
    try {
      const data = await apiFetch('/api/repetitions');
      setFrequencies(data || []);
    } catch (err) {
      //console.error('Failed to load frequencies:', err);
    }
  }, [apiFetch]);

  const mapDurationType = useCallback((type) => {
    const types = ['Hour', 'Day', 'Week', 'Month', 'Year'];
    return types[parseInt(type) - 1] || '-';
  }, []);

  const savePrescription = useCallback(async () => {
    if (!selectedDrugId) return;
    
    const { duration, durationType, frequency, dose, instruction } = prescriptionData;
    if (!duration || !durationType || !frequency) {
      alert(t('doctor.visit.fillRequired'));
      return;
    }
    
    try {
      const body = {
        drugId: selectedDrugId,
        duration,
        durationType: DURATION_TYPES.indexOf(durationType) + 1,
        frequencyId: frequency.id,
        frequency: frequency.repetitionDesc,
        dose: dose || '',
        instruction: instruction || ''
      };
      
      await apiFetch(`/api/visits/${visitId}/drug-prescriptions`, {
        method: 'POST',
        body: JSON.stringify(body)
      });
      
      alert(t('doctor.visit.prescriptionSaved'));
      setShowPrescriptionDialog(false);
      setSelectedDrugId(null);
      setPrescriptionData({ duration: '', durationType: '', frequency: null, dose: '', instruction: '' });
    } catch (err) {
      setError('Failed to save prescription: ' + err.message);
    }
  }, [visitId, selectedDrugId, prescriptionData, apiFetch, t]);

  const showPrescription = useCallback(async (drugId) => {
    try {
      const prescriptions = await apiFetch(`/api/visits/${visitId}/drug-prescriptions`);
      const found = prescriptions?.find(p => p.drugId === drugId);
      
      if (!found) {
        alert(t('doctor.visit.noPrescription'));
        return;
      }
      
      const message = `
        Drug: ${found.tradeName || 'Unknown'}
        Dose: ${found.dose || 'Not specified'}
        Duration: ${found.duration || 'Not specified'}
        Duration Type: ${mapDurationType(found.durationType)}
        Frequency: ${found.frequency || 'Not specified'}
        Instruction: ${found.instructions || 'Not specified'}
      `;
      alert(message);
    } catch (err) {
      setError('Failed to load prescription: ' + err.message);
    }
  }, [visitId, apiFetch, mapDurationType, t]);

  // ==================== PROCEDURE OPERATIONS ====================
  const loadProcedures = useCallback(async (category) => {
    try {
      const data = await apiFetch(`/api/procedures?category=${category}`);
      const names = (data || []).map(p => p.procedureName).filter(Boolean);
      
      switch (category) {
        case 'RADIOLOGY':
          setRadiologyProcedures(names);
          break;
        case 'LABORATORY':
          setLaboratoryProcedures(names);
          break;
        case 'MEDICAL':
          setMedicalProcedures(names);
          setFilteredMedicalProcedures(names);
          break;
        default:
          break;
      }
    } catch (err) {
      //console.error(`Failed to load ${category} procedures:`, err);
    }
  }, [apiFetch]);

  const searchProcedures = useCallback(async (category, query) => {
    if (!query.trim()) {
      loadProcedures(category);
      return;
    }

    try {
      const data = await apiFetch(
        `/api/procedures/search?category=${category}&name=${encodeURIComponent(query)}`
      );
      const names = (data || []).map(p => p.procedureName).filter(Boolean);

      switch (category) {
        case 'RADIOLOGY':
          setRadiologyProcedures(names);
          break;
        case 'LABORATORY':
          setLaboratoryProcedures(names);
          break;
        case 'MEDICAL':
          if (names.length === 0) {
            const filtered = medicalProcedures.filter(proc =>
              proc.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMedicalProcedures(filtered);
          } else {
            setFilteredMedicalProcedures(names);
          }
          break;
        default:
          break;
      }
    } catch (err) {
      setError(`Failed to search ${category} procedures: ` + err.message);
    }
  }, [apiFetch, loadProcedures, medicalProcedures]);
  
  const loadSelectedProcedures = useCallback(async () => {
    try {
      const data = await apiFetch(`/visits/${visitId}/procedures`);
      setSelectedProcedures(data || []);
    } catch (err) {
      //console.error('Failed to load selected procedures:', err);
    }
  }, [visitId, apiFetch]);

  const addProcedureToVisit = useCallback(async (procedure) => {
    if (!procedure || selectedProcedures.includes(procedure)) {
      if (selectedProcedures.includes(procedure)) {
        alert(t('doctor.visit.selectProcedure'));
      }
      return;
    }
    
    try {
      await apiFetch(
        `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
        { method: 'POST' }
      );
      await loadSelectedProcedures();
      alert(t('doctor.visit.procedureAdded'));
    } catch (err) {
      setError('Failed to add procedure: ' + err.message);
    }
  }, [visitId, selectedProcedures, apiFetch, loadSelectedProcedures, t]);

  const removeProcedureFromVisit = useCallback(async (procedure) => {
    try {
      await apiFetch(
        `/visits/${visitId}/procedures?procedure=${encodeURIComponent(procedure)}`,
        { method: 'DELETE' }
      );
      await loadSelectedProcedures();
      alert(t('doctor.visit.procedureRemoved'));
    } catch (err) {
      setError('Failed to remove procedure: ' + err.message);
    }
  }, [visitId, apiFetch, loadSelectedProcedures, t]);

  // ==================== LOAD DATA ====================
  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        loadVisitDrugs(),
        loadFavorites(),
        loadSelectedProcedures(),
        loadFrequencies(),
        loadProcedures('RADIOLOGY'),
        loadProcedures('LABORATORY'),
        loadProcedures('MEDICAL')
      ]);
    };
    
    loadData();
  }, [loadVisitDrugs, loadFavorites, loadSelectedProcedures, loadFrequencies, loadProcedures]);

  // Keep filtered procedures in sync when search is cleared
  useEffect(() => {
    if (searchMedical.trim() === '') {
      setFilteredMedicalProcedures(medicalProcedures);
    }
  }, [medicalProcedures, searchMedical]);

  // ==================== RENDER HELPERS ====================
  const renderStatusBadge = (status) => {
    const colors = {
      'NEW': '#e74c3c',
      'IN_PROGRESS': '#f39c12',
      'CLOSED': '#27ae60'
    };
    return (
      <span className="status-badge" style={{ backgroundColor: colors[status] || '#3498db' }}>
        {status}
      </span>
    );
  };

  // ==================== PRESCRIPTION DIALOG ====================
  const renderPrescriptionDialog = () => {
    if (!showPrescriptionDialog) return null;
    
    return (
      <div className="modal-overlay" onClick={() => setShowPrescriptionDialog(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h3>📋 {t('doctor.visit.prescription')}</h3>
          <div className="form-group">
            <label>{t('doctor.visit.duration')}</label>
            <input
              type="number"
              placeholder={t('doctor.visit.enterDuration')}
              value={prescriptionData.duration}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, duration: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>{t('doctor.visit.durationType')}</label>
            <select
              value={prescriptionData.durationType}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, durationType: e.target.value })}
            >
              <option value="">{t('doctor.visit.selectDurationType')}</option>
              {DURATION_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>{t('doctor.visit.frequency')}</label>
            <select
              value={prescriptionData.frequency?.id || ''}
              onChange={(e) => {
                const freq = frequencies.find(f => f.id === parseInt(e.target.value));
                setPrescriptionData({ ...prescriptionData, frequency: freq });
              }}
            >
              <option value="">{t('doctor.visit.selectFrequency')}</option>
              {frequencies.map((freq) => (
                <option key={freq.id} value={freq.id}>
                  {freq.repetitionDesc}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>{t('doctor.visit.dose')}</label>
            <input
              type="text"
              placeholder={t('doctor.visit.enterDose')}
              value={prescriptionData.dose}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, dose: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>{t('doctor.visit.instruction')}</label>
            <textarea
              placeholder={t('doctor.visit.enterInstruction')}
              value={prescriptionData.instruction}
              onChange={(e) => setPrescriptionData({ ...prescriptionData, instruction: e.target.value })}
              rows={3}
            />
          </div>
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => setShowPrescriptionDialog(false)}>
              {t('doctor.visit.cancel')}
            </button>
            <button className="btn-save" onClick={savePrescription}>
              {t('doctor.visit.savePrescription')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==================== RENDER ====================
  return (
    <>
      <style>{`
        /* ==================== DOCTOR VISIT SCREEN STYLES ==================== */
        .doctor-visit-screen {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f0f2f5;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 20px;
          overflow-y: auto;
        }

        /* Header */
        .visit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          padding: 15px 20px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .visit-header h2 {
          margin: 0;
          color: #2c3e50;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .status-badge {
          padding: 4px 15px;
          border-radius: 12px;
          color: white;
          font-weight: bold;
          font-size: 12px;
        }

        .header-actions button {
          padding: 8px 20px;
          border: none;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 38px;
        }

        .btn-start {
          background: #4CAF50;
          color: white;
        }
        .btn-start:hover:not(.disabled):not(:disabled) {
          background: #388E3C;
        }

        .btn-save {
          background: #2196F3;
          color: white;
        }
        .btn-save:hover:not(:disabled) {
          background: #1976D2;
        }

        .btn-close {
          background: #F44336;
          color: white;
        }
        .btn-close:hover:not(.disabled):not(:disabled) {
          background: #D32F2F;
        }

        .btn-exit {
          background: #757575;
          color: white;
        }
        .btn-exit:hover {
          background: #616161;
        }

        .header-actions button.disabled,
        .header-actions button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: 5px;
          background: white;
          padding: 5px 10px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          flex-wrap: wrap;
        }

        .tab {
          padding: 10px 25px;
          border: none;
          border-radius: 8px;
          background: transparent;
          font-weight: bold;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          color: #7f8c8d;
          min-height: 40px;
        }

        .tab:hover:not(:disabled) {
          background: #f0f0f0;
        }

        .tab.active {
          background: #1E90FF;
          color: white;
        }

        .tab:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Tab Content */
        .tab-content {
          flex: 1;
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          overflow-y: auto;
        }

        /* Visit Tab */
        .visit-tab {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-group label {
          font-weight: bold;
          color: #2c3e50;
          font-size: 13px;
        }

        .form-group textarea,
        .form-group input,
        .form-group select {
          padding: 8px 12px;
          border: 1px solid #dce4ec;
          border-radius: 8px;
          font-size: 13px;
          font-family: inherit;
          transition: border-color 0.2s;
          min-height: 38px;
        }

        .form-group textarea:focus,
        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #1E90FF;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 60px;
        }

        /* Visit Not Started Banner */
        .visit-not-started-banner {
          background-color: #f39c12;
          color: white;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
          text-align: center;
          font-weight: bold;
        }

        /* Drugs Tab */
        .drugs-tab {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .search-section h3,
        .drug-results h4,
        .favorites-section h4,
        .visit-drugs-section h4 {
          margin: 0 0 10px 0;
          color: #2c3e50;
        }

        .search-box {
          display: flex;
          gap: 10px;
        }

        .search-box input {
          flex: 1;
          padding: 8px 15px;
          border: 1px solid #dce4ec;
          border-radius: 20px;
          font-size: 13px;
          min-height: 38px;
        }

        .search-box input:focus {
          outline: none;
          border-color: #1E90FF;
        }

        .search-box button {
          padding: 8px 20px;
          background: #2196F3;
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
          min-height: 38px;
        }

        .search-box button:hover:not(:disabled) {
          background: #1976D2;
        }

        .search-box button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .search-box.small input {
          flex: 1;
          padding: 6px 12px;
          border: 1px solid #dce4ec;
          border-radius: 15px;
          font-size: 12px;
          min-height: 32px;
        }

        .search-box.small button {
          padding: 6px 15px;
          font-size: 12px;
          min-height: 32px;
        }

        .drug-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #e8ecf0;
          border-radius: 8px;
          padding: 5px;
        }

        .drug-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          border-radius: 6px;
          background: #f8f9fa;
          transition: background 0.2s;
          flex-wrap: wrap;
          gap: 8px;
        }

        .drug-item:hover {
          background: #e9ecef;
        }

        .drug-item span {
          flex: 1;
          font-size: 13px;
          color: #2c3e50;
        }

        .drug-actions {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }

        .drug-actions button {
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 30px;
          min-height: 30px;
        }

        .btn-add {
          background: #4CAF50;
          color: white;
        }
        .btn-add:hover:not(:disabled) {
          background: #388E3C;
        }
        .btn-add:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .btn-star {
          background: transparent;
          font-size: 18px;
        }

        .btn-remove {
          background: #F44336;
          color: white;
        }
        .btn-remove:hover:not(:disabled) {
          background: #D32F2F;
        }

        .btn-prescription {
          background: #2196F3;
          color: white;
          width: auto !important;
          padding: 0 12px !important;
          border-radius: 15px !important;
        }
        .btn-prescription:hover:not(:disabled) {
          background: #1976D2;
        }

        .btn-view {
          background: #9E9E9E;
          color: white;
        }
        .btn-view:hover:not(:disabled) {
          background: #757575;
        }

        /* Procedures Tab */
        .procedures-tab {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .procedure-categories {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .procedure-category {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
        }

        .procedure-category h4 {
          margin: 0 0 10px 0;
          color: #2c3e50;
        }

        .procedure-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          max-height: 250px;
          overflow-y: auto;
          margin-top: 8px;
        }

        .procedure-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 6px 10px;
          border-radius: 5px;
          background: white;
          border: 1px solid #e8ecf0;
          transition: all 0.2s;
          gap: 8px;
        }

        .procedure-item:hover {
          border-color: #1E90FF;
        }

        .procedure-item span {
          font-size: 13px;
          color: #2c3e50;
          flex: 1;
        }

        .procedure-item button {
          width: 25px;
          height: 25px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.2s;
          min-width: 25px;
          min-height: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .procedure-item button:not(.btn-remove):not(:disabled) {
          background: #4CAF50;
          color: white;
        }
        .procedure-item button:not(.btn-remove):not(:disabled):hover {
          background: #388E3C;
        }

        .procedure-item button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .procedure-item.selected {
          background: #e3f2fd;
          border-color: #1E90FF;
        }

        .procedure-item .btn-remove {
          background: #F44336;
          color: white;
        }
        .procedure-item .btn-remove:hover:not(:disabled) {
          background: #D32F2F;
        }

        .selected-procedures {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 15px;
        }

        .selected-procedures h4 {
          margin: 0 0 10px 0;
          color: #2c3e50;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 15px;
          padding: 30px;
          max-width: 500px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-content h3 {
          margin: 0 0 20px 0;
          color: #2c3e50;
        }

        .modal-content .form-group {
          margin-bottom: 15px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .modal-actions button {
          padding: 8px 25px;
          border: none;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 38px;
        }

        .btn-cancel {
          background: #e0e0e0;
          color: #555;
        }
        .btn-cancel:hover {
          background: #d0d0d0;
        }

        .btn-save {
          background: #2196F3;
          color: white;
        }
        .btn-save:hover:not(:disabled) {
          background: #1976D2;
        }

        /* Error Banner */
        .error-banner {
          background: #ffebee;
          color: #c62828;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #ef9a9a;
        }

        .error-banner button {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #c62828;
          padding: 4px 8px;
        }

        /* ==================== RTL SUPPORT ==================== */
        .doctor-visit-screen.rtl {
          direction: rtl;
        }

        .doctor-visit-screen.rtl .header-actions {
          flex-direction: row-reverse;
        }

        .doctor-visit-screen.rtl .tabs {
          flex-direction: row-reverse;
        }

        .doctor-visit-screen.rtl .search-box {
          flex-direction: row-reverse;
        }

        .doctor-visit-screen.rtl .drug-actions {
          flex-direction: row-reverse;
        }

        .doctor-visit-screen.rtl .modal-actions {
          flex-direction: row-reverse;
        }

        .doctor-visit-screen.rtl .procedure-item {
          flex-direction: row-reverse;
        }

        .doctor-visit-screen.rtl .procedure-item button {
          margin-left: 0;
          margin-right: 10px;
        }

        .doctor-visit-screen.rtl .drug-item {
          flex-direction: row-reverse;
        }

        .doctor-visit-screen.rtl .drug-item .drug-actions {
          flex-direction: row-reverse;
        }

        .doctor-visit-screen.rtl .drug-item .drug-actions button {
          margin-left: 0;
          margin-right: 5px;
        }

        .doctor-visit-screen.rtl .form-group label {
          text-align: right;
        }

        .doctor-visit-screen.rtl .visit-header h2 {
          text-align: right;
        }

        .doctor-visit-screen.rtl .error-banner {
          flex-direction: row-reverse;
        }

        .doctor-visit-screen.rtl .modal-content .form-group label {
          text-align: right;
        }

        /* ==================== RESPONSIVE ==================== */
        @media (max-width: 768px) {
          .doctor-visit-screen {
            padding: 12px;
          }

          .visit-header {
            flex-direction: column;
            align-items: stretch;
          }

          .header-actions {
            flex-wrap: wrap;
            justify-content: center;
          }

          .header-actions button {
            font-size: 12px;
            padding: 6px 14px;
            min-height: 34px;
          }

          .tabs {
            flex-wrap: wrap;
          }

          .tab {
            padding: 8px 16px;
            font-size: 13px;
            min-height: 36px;
          }

          .tab-content {
            padding: 15px;
          }

          .procedure-categories {
            grid-template-columns: 1fr;
          }

          .modal-content {
            padding: 20px;
            max-width: 95%;
            margin: 10px;
          }

          .drug-item {
            flex-direction: column;
            align-items: stretch;
          }

          .drug-actions {
            justify-content: flex-start;
          }

          .drug-actions button {
            width: 36px;
            height: 36px;
            min-width: 36px;
            min-height: 36px;
          }

          .btn-prescription {
            width: auto !important;
            padding: 0 16px !important;
          }

          .search-box {
            flex-direction: column;
          }

          .search-box button {
            width: 100%;
          }

          .procedure-item {
            flex-wrap: wrap;
          }

          .visit-not-started-banner {
            font-size: 13px;
            padding: 8px;
          }
        }

        @media (max-width: 480px) {
          .doctor-visit-screen {
            padding: 8px;
          }

          .visit-header {
            padding: 10px 14px;
          }

          .visit-header h2 {
            font-size: 18px;
          }

          .header-actions button {
            font-size: 11px;
            padding: 5px 10px;
            min-height: 30px;
          }

          .tab {
            font-size: 12px;
            padding: 6px 12px;
            min-height: 32px;
          }

          .tab-content {
            padding: 10px;
          }

          .form-group textarea,
          .form-group input,
          .form-group select {
            font-size: 15px;
            min-height: 36px;
          }

          .modal-content {
            padding: 16px;
          }

          .modal-content h3 {
            font-size: 18px;
          }

          .modal-actions {
            flex-direction: column;
          }

          .modal-actions button {
            width: 100%;
          }
        }

        @media (max-width: 360px) {
          .visit-header h2 {
            font-size: 16px;
          }

          .header-actions {
            gap: 5px;
          }

          .header-actions button {
            font-size: 10px;
            padding: 4px 8px;
            min-height: 28px;
          }

          .tab {
            font-size: 11px;
            padding: 4px 10px;
            min-height: 28px;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .doctor-visit-screen {
            background: #1a1a2e;
          }

          .visit-header,
          .tab-content,
          .tabs {
            background: #2d2d44;
          }

          .visit-header h2 {
            color: #ecf0f1;
          }

          .tab {
            color: #b0b0b0;
          }

          .tab:hover:not(:disabled) {
            background: #3d3d5c;
          }

          .tab.active {
            background: #1E90FF;
            color: white;
          }

          .form-group label {
            color: #b0b0b0;
          }

          .form-group textarea,
          .form-group input,
          .form-group select {
            background: #1a1a2e;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .form-group textarea:focus,
          .form-group input:focus,
          .form-group select:focus {
            border-color: #1E90FF;
          }

          .form-group textarea::placeholder,
          .form-group input::placeholder {
            color: #666;
          }

          .search-box input {
            background: #1a1a2e;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .search-box input:focus {
            border-color: #1E90FF;
          }

          .search-box input::placeholder {
            color: #666;
          }

          .drug-item {
            background: #1a1a2e;
          }

          .drug-item:hover {
            background: #2d2d44;
          }

          .drug-item span {
            color: #b0b0b0;
          }

          .drug-list {
            border-color: #3d3d5c;
          }

          .procedure-category {
            background: #1a1a2e;
          }

          .procedure-category h4 {
            color: #b0b0b0;
          }

          .procedure-item {
            background: #2d2d44;
            border-color: #3d3d5c;
          }

          .procedure-item span {
            color: #b0b0b0;
          }

          .procedure-item.selected {
            background: #1a2744;
            border-color: #1E90FF;
          }

          .selected-procedures {
            background: #1a1a2e;
          }

          .selected-procedures h4 {
            color: #b0b0b0;
          }

          .modal-content {
            background: #1a1a2e;
          }

          .modal-content h3 {
            color: #ecf0f1;
          }

          .btn-cancel {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .btn-cancel:hover {
            background: #3d3d5c;
          }

          .visit-not-started-banner {
            background-color: #b7791f;
          }

          .error-banner {
            background: #2d1a1a;
            border-color: #4a1a1a;
            color: #ff6b6b;
          }

          .error-banner button {
            color: #ff6b6b;
          }
        }
      `}</style>

      <div className={`doctor-visit-screen ${isRTL ? 'rtl' : ''}`}>
        {error && (
          <div className="error-banner">
            ⚠️ {error}
            <button onClick={() => setError(null)}>✖</button>
          </div>
        )}
        
        <div className="visit-header">
          <h2>🩺 {t('doctor.visit.title').replace('{0}', visitId)}</h2>
          <div className="header-actions">
            {renderStatusBadge(currentStatus)}
            <button 
              className={`btn-start ${currentStatus !== 'NEW' ? 'disabled' : ''}`}
              onClick={startVisit}
              disabled={currentStatus !== 'NEW' || loading}
            >
              {t('doctor.visit.start')}
            </button>
            <button 
              className="btn-save"
              onClick={saveVisitDetails}
              disabled={loading}
            >
              {t('doctor.visit.save')}
            </button>
            <button 
              className={`btn-close ${currentStatus !== 'IN_PROGRESS' ? 'disabled' : ''}`}
              onClick={closeVisit}
              disabled={currentStatus !== 'IN_PROGRESS' || loading}
            >
              {t('doctor.visit.close')}
            </button>
            <button 
              className="btn-exit"
              onClick={onClose}
            >
              {t('doctor.visit.exit')}
            </button>
          </div>
        </div>

        {currentStatus === 'NEW' && (
          <div className="visit-not-started-banner">
            ⚠️ This visit has not been started yet. Please click "▶ Start Visit" to begin editing.
          </div>
        )}

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'visit' ? 'active' : ''}`}
            onClick={() => setActiveTab('visit')}
            disabled={currentStatus === 'NEW'}
          >
            📋 {t('doctor.visit.details')}
          </button>
          <button 
            className={`tab ${activeTab === 'drugs' ? 'active' : ''}`}
            onClick={() => setActiveTab('drugs')}
            disabled={currentStatus === 'NEW'}
          >
            {t('doctor.visit.drugs')}
          </button>
          <button 
            className={`tab ${activeTab === 'procedures' ? 'active' : ''}`}
            onClick={() => setActiveTab('procedures')}
            disabled={currentStatus === 'NEW'}
          >
            {t('doctor.visit.procedures')}
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'visit' && (
            <div className="visit-tab">
              <div className="form-group">
                <label>{t('doctor.visit.chiefComplaint')}</label>
                <textarea
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="Enter chief complaint..."
                  rows={2}
                  disabled={currentStatus === 'NEW'}
                />
              </div>
              <div className="form-group">
                <label>{t('doctor.visit.history')}</label>
                <textarea
                  value={history}
                  onChange={(e) => setHistory(e.target.value)}
                  placeholder="Enter history..."
                  rows={2}
                  disabled={currentStatus === 'NEW'}
                />
              </div>
              <div className="form-group">
                <label>{t('doctor.visit.medications')}</label>
                <textarea
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                  placeholder="Enter medications..."
                  rows={2}
                  disabled={currentStatus === 'NEW'}
                />
              </div>
              <div className="form-group">
                <label>{t('doctor.visit.allergies')}</label>
                <textarea
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="Enter allergies..."
                  rows={2}
                  disabled={currentStatus === 'NEW'}
                />
              </div>
              <div className="form-group">
                <label>{t('doctor.visit.doctorNotes')}</label>
                <textarea
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  placeholder="Enter doctor notes..."
                  rows={2}
                  disabled={currentStatus === 'NEW'}
                />
              </div>
              <div className="form-group">
                <label>{t('doctor.visit.dischargeStatus')}</label>
                <select
                  value={dischargeStatus}
                  onChange={(e) => setDischargeStatus(e.target.value)}
                  disabled={currentStatus === 'NEW'}
                >
                  {DISCHARGE_STATUSES.map((status) => {
                    const statusKeys = {
                      NOT_DISCHARGED: 'notDischarged',
                      DISCHARGED: 'discharged',
                      FOLLOW_UP_REQUIRED: 'followUp',
                      REFERRED: 'referred'
                    };

                    const label = t(`doctor.visit.${statusKeys[status]}`);

                    return (
                      <option key={status} value={status}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}

          {activeTab === 'drugs' && (
            <div className="drugs-tab">
              <div className="search-section">
                <h3>{t('doctor.visit.searchDrugs')}</h3>
                <div className="search-box">
                  <input
                    type="text"
                    placeholder={t('doctor.visit.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchDrugs()}
                    disabled={currentStatus === 'NEW'}
                  />
                  <button onClick={searchDrugs} disabled={currentStatus === 'NEW'}>🔍</button>
                </div>
              </div>

              <div className="drug-results">
                <h4>{t('doctor.visit.searchResults')}</h4>
                <div className="drug-list">
                  {drugSearchResults.map((drug) => (
                    <div key={drug.drugId} className="drug-item">
                      <span>
                        {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
                      </span>
                      <div className="drug-actions">
                        <button 
                          className="btn-add"
                          onClick={() => addDrugToVisit(drug.drugId)}
                          disabled={visitDrugs.some(d => d.drugId === drug.drugId) || currentStatus === 'NEW'}
                        >
                          {t('doctor.visit.add')}
                        </button>
                        <button 
                          className="btn-star"
                          onClick={() => toggleFavorite(drug.drugId)}
                          style={{ color: favoriteDrugs.some(d => d.drugId === drug.drugId) ? 'gold' : 'gray' }}
                          disabled={currentStatus === 'NEW'}
                        >
                          {favoriteDrugs.some(d => d.drugId === drug.drugId) ? '★' : '☆'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="favorites-section">
                <h4>{t('doctor.visit.favoriteDrugs')}</h4>
                <div className="drug-list">
                  {favoriteDrugs.map((drug) => (
                    <div key={drug.drugId} className="drug-item">
                      <span>
                        {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
                      </span>
                      <div className="drug-actions">
                        <button 
                          className="btn-add"
                          onClick={() => addDrugToVisit(drug.drugId)}
                          disabled={visitDrugs.some(d => d.drugId === drug.drugId) || currentStatus === 'NEW'}
                        >
                          {t('doctor.visit.add')}
                        </button>
                        <button 
                          className="btn-remove"
                          onClick={() => toggleFavorite(drug.drugId)}
                          disabled={currentStatus === 'NEW'}
                        >
                          {t('doctor.visit.remove')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="visit-drugs-section">
                <h4>{t('doctor.visit.selectedDrugs')}</h4>
                <div className="drug-list">
                  {visitDrugs.map((drug) => (
                    <div key={drug.drugId} className="drug-item">
                      <span>
                        {drug.tradeName} ({drug.strength}) - {drug.packageSize} - {drug.dosageUnit}
                      </span>
                      <div className="drug-actions">
                        <button 
                          className="btn-prescription"
                          onClick={() => {
                            setSelectedDrugId(drug.drugId);
                            setShowPrescriptionDialog(true);
                          }}
                          disabled={currentStatus === 'NEW'}
                        >
                          {t('doctor.visit.prescription')}
                        </button>
                        <button 
                          className="btn-view"
                          onClick={() => showPrescription(drug.drugId)}
                          disabled={currentStatus === 'NEW'}
                        >
                          {t('doctor.visit.view')}
                        </button>
                        <button 
                          className="btn-remove"
                          onClick={() => removeDrugFromVisit(drug.drugId)}
                          disabled={currentStatus === 'NEW'}
                        >
                          {t('doctor.visit.remove')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'procedures' && (
            <div className="procedures-tab">
              <div className="procedure-categories">
                <div className="procedure-category">
                  <h4>{t('doctor.visit.radiology')}</h4>
                  <div className="search-box small">
                    <input
                      type="text"
                      placeholder={t('doctor.visit.searchRadiology')}
                      value={searchRadiology}
                      onChange={(e) => setSearchRadiology(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && searchProcedures('RADIOLOGY', searchRadiology)}
                      disabled={currentStatus === 'NEW'}
                    />
                    <button onClick={() => searchProcedures('RADIOLOGY', searchRadiology)} disabled={currentStatus === 'NEW'}>🔍</button>
                  </div>
                  <div className="procedure-list">
                    {radiologyProcedures.map((proc, index) => (
                      <div key={`RADIOLOGY-${index}-${proc}`} className="procedure-item">
                        <span>{proc}</span>
                        <button onClick={() => addProcedureToVisit(proc)} disabled={currentStatus === 'NEW'}>
                          {t('doctor.visit.add')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="procedure-category">
                  <h4>{t('doctor.visit.laboratory')}</h4>
                  <div className="search-box small">
                    <input
                      type="text"
                      placeholder={t('doctor.visit.searchLaboratory')}
                      value={searchLaboratory}
                      onChange={(e) => setSearchLaboratory(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && searchProcedures('LABORATORY', searchLaboratory)}
                      disabled={currentStatus === 'NEW'}
                    />
                    <button onClick={() => searchProcedures('LABORATORY', searchLaboratory)} disabled={currentStatus === 'NEW'}>🔍</button>
                  </div>
                  <div className="procedure-list">
                    {laboratoryProcedures.map((proc, index) => (
                      <div key={`LABORATORY-${index}-${proc}`} className="procedure-item">
                        <span>{proc}</span>
                        <button onClick={() => addProcedureToVisit(proc)} disabled={currentStatus === 'NEW'}>
                          {t('doctor.visit.add')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="procedure-category">
                  <h4>{t('doctor.visit.medical')}</h4>
                  <div className="search-box small">
                    <input
                      type="text"
                      placeholder={t('doctor.visit.searchMedical')}
                      value={searchMedical}
                      onChange={(e) => setSearchMedical(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && searchProcedures('MEDICAL', searchMedical)}
                      disabled={currentStatus === 'NEW'}
                    />
                    <button onClick={() => searchProcedures('MEDICAL', searchMedical)} disabled={currentStatus === 'NEW'}>🔍</button>
                  </div>
                  <div className="procedure-list">
                    {(searchMedical.trim() ? filteredMedicalProcedures : medicalProcedures).map((proc, index) => (
                      <div key={`MEDICAL-${index}-${proc}`} className="procedure-item">
                        <span>{proc}</span>
                        <button onClick={() => addProcedureToVisit(proc)} disabled={currentStatus === 'NEW'}>
                          {t('doctor.visit.add')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="selected-procedures">
                <h4>{t('doctor.visit.selectedProcedures')}</h4>
                <div className="procedure-list">
                  {selectedProcedures.map((proc, index) => (
                    <div key={`SELECTED-${index}-${proc}`} className="procedure-item selected">
                      <span>{proc}</span>
                      <button className="btn-remove" onClick={() => removeProcedureFromVisit(proc)} disabled={currentStatus === 'NEW'}>
                        {t('doctor.visit.remove')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {renderPrescriptionDialog()}
      </div>
    </>
  );
};

export default DoctorVisitScreen;