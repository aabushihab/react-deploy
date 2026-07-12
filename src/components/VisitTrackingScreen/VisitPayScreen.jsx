// // // import React, { useState, useEffect } from 'react';
// // // import { BASE_URL } from '../../utils/api';

// // // const VisitPayScreen = ({ visit, remaining, loggedUser, onClose, onPaymentComplete }) => {
// // //   const t = {
// // //     title: 'Payment',
// // //     original: 'Original Amount',
// // //     cancel: 'Cancel',
// // //     pay: 'Pay',
// // //     processing: 'Processing...',
// // //     paymentType: 'Payment Type',
// // //     cash: 'Cash Amount',
// // //     pos: 'POS Amount',
// // //     terminalId: 'Terminal ID',
// // //     posNo: 'POS Payment No',
// // //     cardType: 'Card Type',
// // //     approval: 'Approval Code',
// // //     insuranceProvider: 'Insurance Provider',
// // //     insuranceClass: 'Insurance Class',
// // //     insuranceType: 'Insurance Type',
// // //     coverage: 'Coverage',
// // //     acceptNo: 'Insurance Accept Number',
// // //     cardId: 'Card ID',
// // //     formId: 'Insurance Form ID',
// // //     payingNow: 'Paying Now',
// // //     remainingLabel: 'Remaining',
// // //     selectCurrency: 'Currency',
// // //   };

// // //   const [paymentType, setPaymentType] = useState('CASH');
// // //   const [originalAmount, setOriginalAmount] = useState(visit.amount || 0);
// // //   const [cashAmount, setCashAmount] = useState(0);
// // //   const [posAmount, setPosAmount] = useState(0);
// // //   const [terminalId, setTerminalId] = useState('');
// // //   const [posNo, setPosNo] = useState('');
// // //   const [cardType, setCardType] = useState('');
// // //   const [approvalCode, setApprovalCode] = useState('');
// // //   const [insuranceProvider, setInsuranceProvider] = useState('');
// // //   const [insuranceClass, setInsuranceClass] = useState('');
// // //   const [insuranceType, setInsuranceType] = useState('BENEFICIARY');
// // //   const [coveragePercent, setCoveragePercent] = useState(0);
// // //   const [insuranceAcceptNo, setInsuranceAcceptNo] = useState('');
// // //   const [cardId, setCardId] = useState('');
// // //   const [formId, setFormId] = useState('');
// // //   const [currency, setCurrency] = useState('JOD');
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');

// // //   const currencies = ['JOD', 'USD', 'EUR', 'KES', 'UGX', 'SAR', 'KWD', 'AED', 'BHD', 'OMR', 'QAR', 'LYD', 'EGP'];

// // //   // Calculate paying now and remaining
// // //   const payingNow = cashAmount + posAmount;
// // //   const remainingAfterPayment = Math.max(0, originalAmount - payingNow);

// // //   // Load insurance data when payment type is INSURANCE
// // //   useEffect(() => {
// // //     if (paymentType === 'INSURANCE' && visit.patientId) {
// // //       fetch(`${BASE_URL}/api/patients/search/id/${visit.patientId}`)
// // //         .then(res => {
// // //           if (!res.ok) throw new Error('Failed to load patient data');
// // //           return res.json();
// // //         })
// // //         .then(data => {
// // //           if (data.insuranceProvider) {
// // //             setInsuranceProvider(data.insuranceProvider);
// // //           }
// // //           if (data.classA) setInsuranceClass('A');
// // //           else if (data.classB) setInsuranceClass('B');
// // //           else if (data.classC) setInsuranceClass('C');
// // //         })
// // //         .catch(err => {
// // //           //console.error('Failed to load insurance data:', err);
// // //         });
// // //     }
// // //   }, [paymentType, visit.patientId]);

// // //   const handlePay = async () => {
// // //     setError('');

// // //     // Validation
// // //     if (paymentType !== 'FREE' && paymentType !== 'INSURANCE' && payingNow <= 0) {
// // //       setError('Please enter a payment amount');
// // //       return;
// // //     }

// // //     if (paymentType === 'POS' || paymentType === 'CASH + POS') {
// // //       if (posAmount > 0 && (!terminalId || !posNo || !cardType || !approvalCode)) {
// // //         setError('All POS fields are required');
// // //         return;
// // //       }
// // //     }

// // //     if (paymentType === 'INSURANCE') {
// // //       const hasCardId = cardId.trim() !== '';
// // //       const hasFormId = formId.trim() !== '';
      
// // //       if (!hasCardId && !hasFormId) {
// // //         setError('Enter Card ID or Form ID');
// // //         return;
// // //       }
// // //       if (hasCardId && hasFormId) {
// // //         setError('Enter only Card ID OR Form ID');
// // //         return;
// // //       }
// // //       if (!insuranceAcceptNo.trim()) {
// // //         setError('Insurance Accept Number is required');
// // //         return;
// // //       }
// // //       if (!insuranceProvider.trim() || !insuranceClass) {
// // //         setError('Provider and Class are required');
// // //         return;
// // //       }
// // //     }

// // //     setLoading(true);

// // //     try {
// // //       // ✅ Build request body matching Java backend format
// // //       const payments = [];

// // //       // CASH payment
// // //       if (cashAmount > 0) {
// // //         payments.push({
// // //           paymentMethod: 'CASH',
// // //           cashAmount: cashAmount
// // //         });
// // //       }

// // //       // POS payment
// // //       if (posAmount > 0) {
// // //         const posPayment = {
// // //           paymentMethod: 'POS',
// // //           cashAmount: posAmount,
// // //           terminalId: terminalId,
// // //           posPaymentNo: posNo,
// // //           cardType: cardType,
// // //           approvalCode: approvalCode
// // //         };
// // //         payments.push(posPayment);
// // //       }

// // //       // INSURANCE payment
// // //       if (paymentType === 'INSURANCE') {
// // //         const insurancePayment = {
// // //           paymentMethod: 'INSURANCE',
// // //           originalAmount: originalAmount,
// // //           cashAmount: cashAmount,
// // //           insuranceAmount: originalAmount - cashAmount,
// // //           insuranceProvider: insuranceProvider,
// // //           insuranceClass: insuranceClass,
// // //           insuranceType: insuranceType,
// // //           coveragePercent: coveragePercent,
// // //           insuranceAcceptNumber: insuranceAcceptNo
// // //         };
        
// // //         if (cardId.trim()) {
// // //           insurancePayment.cardId = cardId.trim();
// // //         }
// // //         if (formId.trim()) {
// // //           insurancePayment.insuranceFormId = formId.trim();
// // //         }
        
// // //         payments.push(insurancePayment);
// // //       }

// // //       // FREE payment
// // //       if (paymentType === 'FREE') {
// // //         payments.push({
// // //           paymentMethod: 'FREE',
// // //           cashAmount: 0
// // //         });
// // //       }

// // //       // ✅ Build the final payload - matches Java backend
// // //       const payload = {
// // //         originalAmount: originalAmount,
// // //         currency: currency,
// // //         payments: payments
// // //       };

// // //       //console.log('📤 Sending payment payload:', JSON.stringify(payload, null, 2));

// // //       const res = await fetch(`${BASE_URL}/api/visits/payments/${visit.id}`, {
// // //         method: 'POST',
// // //         headers: { 
// // //           'Content-Type': 'application/json',
// // //           'Accept': 'application/json'
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       // Handle error response
// // //       if (!res.ok) {
// // //         let errorText = '';
// // //         try {
// // //           const errorData = await res.json();
// // //           errorText = errorData.message || errorData.error || JSON.stringify(errorData);
// // //         } catch (e) {
// // //           errorText = await res.text();
// // //         }
// // //         throw new Error(`HTTP ${res.status}: ${errorText}`);
// // //       }

// // //       const result = await res.json();
// // //       //console.log('✅ Payment successful:', result);

// // //       // Log the action
// // //       try {
// // //         await fetch(`${BASE_URL}/api/logs/add`, {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify({
// // //             username: loggedUser,
// // //             action: 'PAYMENT',
// // //             details: `Payment of ${payingNow} for visit ${visit.id}`,
// // //           }),
// // //         });
// // //       } catch (logErr) { /* ignore */ }

// // //       if (onPaymentComplete) {
// // //         onPaymentComplete(payingNow);
// // //       }
// // //       onClose();
// // //     } catch (err) {
// // //       //console.error('❌ Payment error:', err);
// // //       setError(err.message || 'Payment failed. Please try again.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Determine if fields should be disabled
// // //   const isCash = paymentType === 'CASH' || paymentType === 'CASH + POS';
// // //   const isPos = paymentType === 'POS' || paymentType === 'CASH + POS';
// // //   const isInsurance = paymentType === 'INSURANCE';

// // //   return (
// // //     <div style={modalOverlay}>
// // //       <div style={modalContent}>
// // //         <h3 style={{ margin: '0 0 15px 0' }}>💰 Payment</h3>
        
// // //         <div style={{ marginBottom: 15 }}>
// // //           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// // //             <span>Visit #{visit.id}</span>
// // //             <span>Patient: {visit.patientName}</span>
// // //           </div>
// // //           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// // //             <span>Total Amount:</span>
// // //             <span style={{ fontWeight: 'bold' }}>{visit.amount.toFixed(2)}</span>
// // //           </div>
// // //           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// // //             <span>Paid:</span>
// // //             <span style={{ fontWeight: 'bold', color: '#48bb78' }}>{visit.totalPaid.toFixed(2)}</span>
// // //           </div>
// // //           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// // //             <span>Remaining:</span>
// // //             <span style={{ fontWeight: 'bold', color: '#e53e3e' }}>{remaining.toFixed(2)}</span>
// // //           </div>
// // //         </div>

// // //         <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

// // //         <div style={{ marginBottom: 15 }}>
// // //           <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
// // //             <div style={{ flex: 2 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.original}</label>
// // //               <input
// // //                 type="number"
// // //                 value={originalAmount}
// // //                 onChange={(e) => setOriginalAmount(parseFloat(e.target.value) || 0)}
// // //                 style={inputStyle}
// // //               />
// // //             </div>
// // //             <div style={{ flex: 1 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.selectCurrency}</label>
// // //               <select
// // //                 value={currency}
// // //                 onChange={(e) => setCurrency(e.target.value)}
// // //                 style={inputStyle}
// // //               >
// // //                 {currencies.map(c => <option key={c} value={c}>{c}</option>)}
// // //               </select>
// // //             </div>
// // //           </div>

// // //           <div style={{ marginBottom: 10 }}>
// // //             <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.paymentType}</label>
// // //             <select
// // //               value={paymentType}
// // //               onChange={(e) => {
// // //                 setPaymentType(e.target.value);
// // //                 if (e.target.value === 'FREE') {
// // //                   setCashAmount(0);
// // //                   setPosAmount(0);
// // //                 }
// // //               }}
// // //               style={inputStyle}
// // //             >
// // //               <option value="CASH">CASH</option>
// // //               <option value="POS">POS</option>
// // //               <option value="CASH + POS">CASH + POS</option>
// // //               <option value="INSURANCE">INSURANCE</option>
// // //               <option value="FREE">FREE</option>
// // //             </select>
// // //           </div>

// // //           {/* Cash Amount */}
// // //           <div style={{ marginBottom: 10, opacity: isCash || isInsurance ? 1 : 0.5 }}>
// // //             <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cash}</label>
// // //             <input
// // //               type="number"
// // //               value={cashAmount}
// // //               onChange={(e) => setCashAmount(parseFloat(e.target.value) || 0)}
// // //               disabled={!isCash && !isInsurance}
// // //               min="0"
// // //               step="0.01"
// // //               style={inputStyle}
// // //             />
// // //           </div>

// // //           {/* POS Amount */}
// // //           <div style={{ marginBottom: 10, opacity: isPos ? 1 : 0.5 }}>
// // //             <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.pos}</label>
// // //             <input
// // //               type="number"
// // //               value={posAmount}
// // //               onChange={(e) => setPosAmount(parseFloat(e.target.value) || 0)}
// // //               disabled={!isPos}
// // //               min="0"
// // //               step="0.01"
// // //               style={inputStyle}
// // //             />
// // //           </div>

// // //           {/* POS Fields */}
// // //           <div style={{ opacity: isPos ? 1 : 0.5, pointerEvents: isPos ? 'auto' : 'none' }}>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.terminalId}</label>
// // //               <input
// // //                 type="text"
// // //                 value={terminalId}
// // //                 onChange={(e) => setTerminalId(e.target.value)}
// // //                 disabled={!isPos}
// // //                 style={inputStyle}
// // //               />
// // //             </div>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.posNo}</label>
// // //               <input
// // //                 type="text"
// // //                 value={posNo}
// // //                 onChange={(e) => setPosNo(e.target.value)}
// // //                 disabled={!isPos}
// // //                 style={inputStyle}
// // //               />
// // //             </div>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardType}</label>
// // //               <input
// // //                 type="text"
// // //                 value={cardType}
// // //                 onChange={(e) => setCardType(e.target.value)}
// // //                 disabled={!isPos}
// // //                 style={inputStyle}
// // //               />
// // //             </div>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.approval}</label>
// // //               <input
// // //                 type="text"
// // //                 value={approvalCode}
// // //                 onChange={(e) => setApprovalCode(e.target.value)}
// // //                 disabled={!isPos}
// // //                 style={inputStyle}
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* Insurance Fields */}
// // //           <div style={{ opacity: isInsurance ? 1 : 0.5, pointerEvents: isInsurance ? 'auto' : 'none' }}>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceProvider}</label>
// // //               <input
// // //                 type="text"
// // //                 value={insuranceProvider}
// // //                 onChange={(e) => setInsuranceProvider(e.target.value)}
// // //                 disabled={!isInsurance}
// // //                 style={inputStyle}
// // //               />
// // //             </div>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceClass}</label>
// // //               <select
// // //                 value={insuranceClass}
// // //                 onChange={(e) => setInsuranceClass(e.target.value)}
// // //                 disabled={!isInsurance}
// // //                 style={inputStyle}
// // //               >
// // //                 <option value="">Select Class</option>
// // //                 <option value="A">A</option>
// // //                 <option value="B">B</option>
// // //                 <option value="C">C</option>
// // //               </select>
// // //             </div>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceType}</label>
// // //               <select
// // //                 value={insuranceType}
// // //                 onChange={(e) => setInsuranceType(e.target.value)}
// // //                 disabled={!isInsurance}
// // //                 style={inputStyle}
// // //               >
// // //                 <option value="BENEFICIARY">BENEFICIARY</option>
// // //                 <option value="SUBSCRIBER">SUBSCRIBER</option>
// // //               </select>
// // //             </div>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.coverage} ({coveragePercent}%)</label>
// // //               <input
// // //                 type="range"
// // //                 min="0"
// // //                 max="100"
// // //                 value={coveragePercent}
// // //                 onChange={(e) => setCoveragePercent(parseInt(e.target.value))}
// // //                 disabled={!isInsurance}
// // //                 style={{ width: '100%' }}
// // //               />
// // //             </div>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.acceptNo}</label>
// // //               <input
// // //                 type="text"
// // //                 value={insuranceAcceptNo}
// // //                 onChange={(e) => setInsuranceAcceptNo(e.target.value)}
// // //                 disabled={!isInsurance}
// // //                 style={inputStyle}
// // //               />
// // //             </div>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardId}</label>
// // //               <input
// // //                 type="text"
// // //                 value={cardId}
// // //                 onChange={(e) => setCardId(e.target.value)}
// // //                 disabled={!isInsurance}
// // //                 style={inputStyle}
// // //                 placeholder="Enter Card ID OR Form ID"
// // //               />
// // //             </div>
// // //             <div style={{ marginBottom: 10 }}>
// // //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.formId}</label>
// // //               <input
// // //                 type="text"
// // //                 value={formId}
// // //                 onChange={(e) => setFormId(e.target.value)}
// // //                 disabled={!isInsurance}
// // //                 style={inputStyle}
// // //                 placeholder="Enter Form ID OR Card ID"
// // //               />
// // //             </div>
// // //           </div>

// // //           {/* Summary */}
// // //           <div style={{ marginTop: 15, padding: '10px', background: '#f7fafc', borderRadius: 8 }}>
// // //             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
// // //               <span>{t.payingNow}:</span>
// // //               <span style={{ fontWeight: 'bold', color: '#2b6cb0' }}>{payingNow.toFixed(2)}</span>
// // //             </div>
// // //             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// // //               <span>{t.remainingLabel}:</span>
// // //               <span style={{ fontWeight: 'bold', color: remainingAfterPayment === 0 ? '#48bb78' : '#e53e3e' }}>
// // //                 {remainingAfterPayment.toFixed(2)}
// // //               </span>
// // //             </div>
// // //           </div>

// // //           {error && <div style={{ color: '#fc8181', fontSize: 14, marginTop: 10 }}>{error}</div>}
// // //         </div>

// // //         <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
// // //           <button
// // //             onClick={onClose}
// // //             style={cancelButtonStyle}
// // //           >
// // //             {t.cancel}
// // //           </button>
// // //           <button
// // //             onClick={handlePay}
// // //             disabled={loading}
// // //             style={payButtonStyle}
// // //           >
// // //             {loading ? '⏳ Processing...' : '💰 Pay'}
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Styles
// // // const modalOverlay = {
// // //   position: 'fixed',
// // //   top: 0,
// // //   left: 0,
// // //   right: 0,
// // //   bottom: 0,
// // //   background: 'rgba(0,0,0,0.5)',
// // //   display: 'flex',
// // //   justifyContent: 'center',
// // //   alignItems: 'center',
// // //   zIndex: 2000,
// // // };

// // // const modalContent = {
// // //   background: 'white',
// // //   borderRadius: 12,
// // //   padding: 24,
// // //   maxWidth: 500,
// // //   width: '95%',
// // //   maxHeight: '90vh',
// // //   overflowY: 'auto',
// // //   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// // // };

// // // const inputStyle = {
// // //   width: '100%',
// // //   padding: '8px 12px',
// // //   borderRadius: 8,
// // //   border: '1px solid #e2e8f0',
// // //   fontSize: 14,
// // //   boxSizing: 'border-box',
// // // };

// // // const cancelButtonStyle = {
// // //   background: '#e2e8f0',
// // //   border: 'none',
// // //   padding: '8px 20px',
// // //   borderRadius: 8,
// // //   cursor: 'pointer',
// // //   fontSize: 14,
// // // };

// // // const payButtonStyle = {
// // //   background: '#48bb78',
// // //   color: 'white',
// // //   fontWeight: 'bold',
// // //   border: 'none',
// // //   padding: '8px 20px',
// // //   borderRadius: 8,
// // //   cursor: 'pointer',
// // //   fontSize: 14,
// // // };

// // // export default VisitPayScreen;


// // import React, { useState, useEffect } from 'react';
// // import { BASE_URL } from '../../utils/api';

// // const VisitPayScreen = ({ visit, remaining, loggedUser, onClose, onPaymentComplete }) => {
// //   const t = {
// //     title: 'Payment',
// //     original: 'Original Amount',
// //     cancel: 'Cancel',
// //     pay: 'Pay',
// //     processing: 'Processing...',
// //     paymentType: 'Payment Type',
// //     cash: 'Cash Amount',
// //     pos: 'POS Amount',
// //     terminalId: 'Terminal ID',
// //     posNo: 'POS Payment No',
// //     cardType: 'Card Type',
// //     approval: 'Approval Code',
// //     insuranceProvider: 'Insurance Provider',
// //     insuranceClass: 'Insurance Class',
// //     insuranceType: 'Insurance Type',
// //     coverage: 'Coverage',
// //     acceptNo: 'Insurance Accept Number',
// //     cardId: 'Card ID',
// //     formId: 'Insurance Form ID',
// //     payingNow: 'Paying Now',
// //     remainingLabel: 'Remaining',
// //     selectCurrency: 'Currency',
// //   };

// //   const [paymentType, setPaymentType] = useState('CASH');
// //   const [originalAmount, setOriginalAmount] = useState(visit.amount || 0);
// //   const [cashAmount, setCashAmount] = useState(0);
// //   const [posAmount, setPosAmount] = useState(0);
// //   const [terminalId, setTerminalId] = useState('');
// //   const [posNo, setPosNo] = useState('');
// //   const [cardType, setCardType] = useState('');
// //   const [approvalCode, setApprovalCode] = useState('');
// //   const [insuranceProvider, setInsuranceProvider] = useState('');
// //   const [insuranceClass, setInsuranceClass] = useState('');
// //   const [insuranceType, setInsuranceType] = useState('BENEFICIARY');
// //   const [coveragePercent, setCoveragePercent] = useState(0);
// //   const [insuranceAcceptNo, setInsuranceAcceptNo] = useState('');
// //   const [cardId, setCardId] = useState('');
// //   const [formId, setFormId] = useState('');
// //   const [currency, setCurrency] = useState('JOD');
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');

// //   const currencies = ['JOD', 'USD', 'EUR', 'KES', 'UGX', 'SAR', 'KWD', 'AED', 'BHD', 'OMR', 'QAR', 'LYD', 'EGP'];

// //   // Calculate paying now and remaining
// //   const payingNow = cashAmount + posAmount;
// //   const remainingAfterPayment = Math.max(0, originalAmount - payingNow);

// //   // Load insurance data when payment type is INSURANCE
// //   useEffect(() => {
// //     if (paymentType === 'INSURANCE' && visit.patientId) {
// //       fetch(`${BASE_URL}/api/patients/search/id/${visit.patientId}`)
// //         .then(res => {
// //           if (!res.ok) throw new Error('Failed to load patient data');
// //           return res.json();
// //         })
// //         .then(data => {
// //           if (data.insuranceProvider) {
// //             setInsuranceProvider(data.insuranceProvider);
// //           }
// //           if (data.classA) setInsuranceClass('A');
// //           else if (data.classB) setInsuranceClass('B');
// //           else if (data.classC) setInsuranceClass('C');
// //         })
// //         .catch(err => {
// //           //console.error('Failed to load insurance data:', err);
// //         });
// //     }
// //   }, [paymentType, visit.patientId]);

// //  const handlePay = async () => {
// //   setError('');

// //   // Validation
// //   if (paymentType !== 'FREE' && paymentType !== 'INSURANCE' && payingNow <= 0) {
// //     setError('Please enter a payment amount');
// //     return;
// //   }

// //   if (paymentType === 'POS' || paymentType === 'CASH + POS') {
// //     if (posAmount > 0 && (!terminalId || !posNo || !cardType || !approvalCode)) {
// //       setError('All POS fields are required');
// //       return;
// //     }
// //   }

// //   if (paymentType === 'INSURANCE') {
// //     const hasCardId = cardId.trim() !== '';
// //     const hasFormId = formId.trim() !== '';
    
// //     if (!hasCardId && !hasFormId) {
// //       setError('Enter Card ID or Form ID');
// //       return;
// //     }
// //     if (hasCardId && hasFormId) {
// //       setError('Enter only Card ID OR Form ID');
// //       return;
// //     }
// //     if (!insuranceAcceptNo.trim()) {
// //       setError('Insurance Accept Number is required');
// //       return;
// //     }
// //     if (!insuranceProvider.trim() || !insuranceClass) {
// //       setError('Provider and Class are required');
// //       return;
// //     }
// //   }

// //   setLoading(true);

// //   try {
// //     // Build request body matching Java backend format
// //     const payments = [];

// //     // CASH payment
// //     if (cashAmount > 0) {
// //       payments.push({
// //         paymentMethod: 'CASH',
// //         cashAmount: cashAmount
// //       });
// //     }

// //     // POS payment
// //     if (posAmount > 0) {
// //       const posPayment = {
// //         paymentMethod: 'POS',
// //         cashAmount: posAmount,
// //         terminalId: terminalId,
// //         posPaymentNo: posNo,
// //         cardType: cardType,
// //         approvalCode: approvalCode
// //       };
// //       payments.push(posPayment);
// //     }

// //     // INSURANCE payment
// //     if (paymentType === 'INSURANCE') {
// //       const insurancePayment = {
// //         paymentMethod: 'INSURANCE',
// //         originalAmount: originalAmount,
// //         cashAmount: cashAmount,
// //         insuranceAmount: originalAmount - cashAmount,
// //         insuranceProvider: insuranceProvider,
// //         insuranceClass: insuranceClass,
// //         insuranceType: insuranceType,
// //         coveragePercent: coveragePercent,
// //         insuranceAcceptNumber: insuranceAcceptNo
// //       };
      
// //       if (cardId.trim()) {
// //         insurancePayment.cardId = cardId.trim();
// //       }
// //       if (formId.trim()) {
// //         insurancePayment.insuranceFormId = formId.trim();
// //       }
      
// //       payments.push(insurancePayment);
// //     }

// //     // FREE payment
// //     if (paymentType === 'FREE') {
// //       payments.push({
// //         paymentMethod: 'FREE',
// //         cashAmount: 0
// //       });
// //     }

// //     // Build the final payload - matches Java backend
// //     const payload = {
// //       originalAmount: originalAmount,
// //       currency: currency,
// //       payments: payments
// //     };

// //     //console.log('📤 Sending payment payload:', JSON.stringify(payload, null, 2));

// //     const res = await fetch(`${BASE_URL}/api/visits/payments/${visit.id}`, {
// //       method: 'POST',
// //       headers: { 
// //         'Content-Type': 'application/json',
// //         'Accept': 'application/json'
// //       },
// //       body: JSON.stringify(payload),
// //     });

// //     // Handle error response
// //     if (!res.ok) {
// //       let errorText = '';
// //       try {
// //         const errorData = await res.json();
// //         errorText = errorData.message || errorData.error || JSON.stringify(errorData);
// //       } catch (e) {
// //         // If JSON parsing fails, try to get text
// //         try {
// //           errorText = await res.text();
// //         } catch (textErr) {
// //           errorText = `HTTP ${res.status}: ${res.statusText}`;
// //         }
// //       }
// //       throw new Error(`HTTP ${res.status}: ${errorText}`);
// //     }

// //     // Check if there's content to parse
// //     const contentType = res.headers.get('content-type');
// //     let result;
    
// //     if (contentType && contentType.includes('application/json')) {
// //       // Try to parse JSON
// //       const text = await res.text();
// //       if (text && text.trim() !== '') {
// //         try {
// //           result = JSON.parse(text);
// //           //console.log('✅ Payment successful:', result);
// //         } catch (parseErr) {
// //           //console.warn('⚠️ Response was not valid JSON:', text);
// //           result = { message: 'Payment processed successfully', raw: text };
// //         }
// //       } else {
// //         // Empty response but successful
// //         //console.log('✅ Payment successful (empty response)');
// //         result = { message: 'Payment processed successfully' };
// //       }
// //     } else {
// //       // Not JSON response
// //       const text = await res.text();
// //       //console.log('✅ Payment successful (non-JSON response):', text);
// //       result = { message: text || 'Payment processed successfully' };
// //     }

// //     // Log the action
// //     try {
// //       await fetch(`${BASE_URL}/api/logs/add`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({
// //           username: loggedUser,
// //           action: 'PAYMENT',
// //           details: `Payment of ${payingNow} for visit ${visit.id}`,
// //         }),
// //       });
// //     } catch (logErr) { /* ignore */ }

// //     if (onPaymentComplete) {
// //       onPaymentComplete(payingNow);
// //     }
// //     onClose();
// //   } catch (err) {
// //     //console.error('❌ Payment error:', err);
// //     setError(err.message || 'Payment failed. Please try again.');
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //   // Determine if fields should be visible
// //   const showCashField = paymentType === 'CASH' || paymentType === 'CASH + POS' || paymentType === 'INSURANCE';
// //   const showPosField = paymentType === 'POS' || paymentType === 'CASH + POS';
// //   const showPosDetails = paymentType === 'POS' || paymentType === 'CASH + POS';
// //   const showInsuranceFields = paymentType === 'INSURANCE';
// //   const showFreeMessage = paymentType === 'FREE';

// //   return (
// //     <div style={modalOverlay}>
// //       <div style={modalContent}>
// //         <h3 style={{ margin: '0 0 15px 0' }}>💰 Payment</h3>
        
// //         <div style={{ marginBottom: 15 }}>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// //             <span>Visit #{visit.id}</span>
// //             <span>Patient: {visit.patientName}</span>
// //           </div>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// //             <span>Total Amount:</span>
// //             <span style={{ fontWeight: 'bold' }}>{visit.amount.toFixed(2)}</span>
// //           </div>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// //             <span>Paid:</span>
// //             <span style={{ fontWeight: 'bold', color: '#48bb78' }}>{visit.totalPaid.toFixed(2)}</span>
// //           </div>
// //           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
// //             <span>Remaining:</span>
// //             <span style={{ fontWeight: 'bold', color: '#e53e3e' }}>{remaining.toFixed(2)}</span>
// //           </div>
// //         </div>

// //         <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

// //         <div style={{ marginBottom: 15 }}>
// //           <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
// //             <div style={{ flex: 2 }}>
// //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.original}</label>
// //               <input
// //                 type="number"
// //                 value={originalAmount}
// //                 onChange={(e) => setOriginalAmount(parseFloat(e.target.value) || 0)}
// //                 style={inputStyle}
// //               />
// //             </div>
// //             <div style={{ flex: 1 }}>
// //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.selectCurrency}</label>
// //               <select
// //                 value={currency}
// //                 onChange={(e) => setCurrency(e.target.value)}
// //                 style={inputStyle}
// //               >
// //                 {currencies.map(c => <option key={c} value={c}>{c}</option>)}
// //               </select>
// //             </div>
// //           </div>

// //           <div style={{ marginBottom: 10 }}>
// //             <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.paymentType}</label>
// //             <select
// //               value={paymentType}
// //               onChange={(e) => {
// //                 setPaymentType(e.target.value);
// //                 if (e.target.value === 'FREE') {
// //                   setCashAmount(0);
// //                   setPosAmount(0);
// //                 }
// //               }}
// //               style={inputStyle}
// //             >
// //               <option value="CASH">CASH</option>
// //               <option value="POS">POS</option>
// //               <option value="CASH + POS">CASH + POS</option>
// //               <option value="INSURANCE">INSURANCE</option>
// //               <option value="FREE">FREE</option>
// //             </select>
// //           </div>

// //           {/* FREE Payment Message */}
// //           {showFreeMessage && (
// //             <div style={{ 
// //               padding: '15px', 
// //               background: '#fefcbf', 
// //               borderRadius: 8, 
// //               marginBottom: 10,
// //               textAlign: 'center',
// //               fontWeight: 'bold',
// //               color: '#744210'
// //             }}>
// //               🎉 FREE Payment - No amount will be charged
// //             </div>
// //           )}

// //           {/* Cash Amount - Only show for CASH, CASH+POS, and INSURANCE */}
// //           {showCashField && (
// //             <div style={{ marginBottom: 10 }}>
// //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cash}</label>
// //               <input
// //                 type="number"
// //                 value={cashAmount}
// //                 onChange={(e) => setCashAmount(parseFloat(e.target.value) || 0)}
// //                 min="0"
// //                 step="0.01"
// //                 style={inputStyle}
// //               />
// //             </div>
// //           )}

// //           {/* POS Amount - Only show for POS and CASH+POS */}
// //           {showPosField && (
// //             <div style={{ marginBottom: 10 }}>
// //               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.pos}</label>
// //               <input
// //                 type="number"
// //                 value={posAmount}
// //                 onChange={(e) => setPosAmount(parseFloat(e.target.value) || 0)}
// //                 min="0"
// //                 step="0.01"
// //                 style={inputStyle}
// //               />
// //             </div>
// //           )}

// //           {/* POS Details - Only show for POS and CASH+POS */}
// //           {showPosDetails && (
// //             <>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.terminalId}</label>
// //                 <input
// //                   type="text"
// //                   value={terminalId}
// //                   onChange={(e) => setTerminalId(e.target.value)}
// //                   style={inputStyle}
// //                 />
// //               </div>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.posNo}</label>
// //                 <input
// //                   type="text"
// //                   value={posNo}
// //                   onChange={(e) => setPosNo(e.target.value)}
// //                   style={inputStyle}
// //                 />
// //               </div>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardType}</label>
// //                 <input
// //                   type="text"
// //                   value={cardType}
// //                   onChange={(e) => setCardType(e.target.value)}
// //                   style={inputStyle}
// //                 />
// //               </div>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.approval}</label>
// //                 <input
// //                   type="text"
// //                   value={approvalCode}
// //                   onChange={(e) => setApprovalCode(e.target.value)}
// //                   style={inputStyle}
// //                 />
// //               </div>
// //             </>
// //           )}

// //           {/* Insurance Fields - Only show for INSURANCE */}
// //           {showInsuranceFields && (
// //             <>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceProvider}</label>
// //                 <input
// //                   type="text"
// //                   value={insuranceProvider}
// //                   onChange={(e) => setInsuranceProvider(e.target.value)}
// //                   style={inputStyle}
// //                 />
// //               </div>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceClass}</label>
// //                 <select
// //                   value={insuranceClass}
// //                   onChange={(e) => setInsuranceClass(e.target.value)}
// //                   style={inputStyle}
// //                 >
// //                   <option value="">Select Class</option>
// //                   <option value="A">A</option>
// //                   <option value="B">B</option>
// //                   <option value="C">C</option>
// //                 </select>
// //               </div>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceType}</label>
// //                 <select
// //                   value={insuranceType}
// //                   onChange={(e) => setInsuranceType(e.target.value)}
// //                   style={inputStyle}
// //                 >
// //                   <option value="BENEFICIARY">BENEFICIARY</option>
// //                   <option value="SUBSCRIBER">SUBSCRIBER</option>
// //                 </select>
// //               </div>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.coverage} ({coveragePercent}%)</label>
// //                 <input
// //                   type="range"
// //                   min="0"
// //                   max="100"
// //                   value={coveragePercent}
// //                   onChange={(e) => setCoveragePercent(parseInt(e.target.value))}
// //                   style={{ width: '100%' }}
// //                 />
// //               </div>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.acceptNo}</label>
// //                 <input
// //                   type="text"
// //                   value={insuranceAcceptNo}
// //                   onChange={(e) => setInsuranceAcceptNo(e.target.value)}
// //                   style={inputStyle}
// //                 />
// //               </div>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardId}</label>
// //                 <input
// //                   type="text"
// //                   value={cardId}
// //                   onChange={(e) => setCardId(e.target.value)}
// //                   style={inputStyle}
// //                   placeholder="Enter Card ID OR Form ID"
// //                 />
// //               </div>
// //               <div style={{ marginBottom: 10 }}>
// //                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.formId}</label>
// //                 <input
// //                   type="text"
// //                   value={formId}
// //                   onChange={(e) => setFormId(e.target.value)}
// //                   style={inputStyle}
// //                   placeholder="Enter Form ID OR Card ID"
// //                 />
// //               </div>
// //             </>
// //           )}

// //           {/* Summary - Always show */}
// //           <div style={{ marginTop: 15, padding: '10px', background: '#f7fafc', borderRadius: 8 }}>
// //             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
// //               <span>{t.payingNow}:</span>
// //               <span style={{ fontWeight: 'bold', color: '#2b6cb0' }}>
// //                 {paymentType === 'FREE' ? '0.00' : payingNow.toFixed(2)}
// //               </span>
// //             </div>
// //             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //               <span>{t.remainingLabel}:</span>
// //               <span style={{ fontWeight: 'bold', color: remainingAfterPayment === 0 ? '#48bb78' : '#e53e3e' }}>
// //                 {paymentType === 'FREE' ? originalAmount.toFixed(2) : remainingAfterPayment.toFixed(2)}
// //               </span>
// //             </div>
// //           </div>

// //           {error && <div style={{ color: '#fc8181', fontSize: 14, marginTop: 10 }}>{error}</div>}
// //         </div>

// //         <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
// //           <button
// //             onClick={onClose}
// //             style={cancelButtonStyle}
// //           >
// //             {t.cancel}
// //           </button>
// //           <button
// //             onClick={handlePay}
// //             disabled={loading}
// //             style={payButtonStyle}
// //           >
// //             {loading ? '⏳ Processing...' : '💰 Pay'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Styles remain the same
// // const modalOverlay = {
// //   position: 'fixed',
// //   top: 0,
// //   left: 0,
// //   right: 0,
// //   bottom: 0,
// //   background: 'rgba(0,0,0,0.5)',
// //   display: 'flex',
// //   justifyContent: 'center',
// //   alignItems: 'center',
// //   zIndex: 2000,
// // };

// // const modalContent = {
// //   background: 'white',
// //   borderRadius: 12,
// //   padding: 24,
// //   maxWidth: 500,
// //   width: '95%',
// //   maxHeight: '90vh',
// //   overflowY: 'auto',
// //   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// // };

// // const inputStyle = {
// //   width: '100%',
// //   padding: '8px 12px',
// //   borderRadius: 8,
// //   border: '1px solid #e2e8f0',
// //   fontSize: 14,
// //   boxSizing: 'border-box',
// // };

// // const cancelButtonStyle = {
// //   background: '#e2e8f0',
// //   border: 'none',
// //   padding: '8px 20px',
// //   borderRadius: 8,
// //   cursor: 'pointer',
// //   fontSize: 14,
// // };

// // const payButtonStyle = {
// //   background: '#48bb78',
// //   color: 'white',
// //   fontWeight: 'bold',
// //   border: 'none',
// //   padding: '8px 20px',
// //   borderRadius: 8,
// //   cursor: 'pointer',
// //   fontSize: 14,
// // };

// // export default VisitPayScreen;




// import React, { useState, useEffect } from 'react';
// import { BASE_URL } from '../../utils/api';

// const VisitPayScreen = ({ visit, remaining, loggedUser, onClose, onPaymentComplete }) => {
//   const t = {
//     title: 'Payment',
//     original: 'Original Amount',
//     cancel: 'Cancel',
//     pay: 'Pay',
//     processing: 'Processing...',
//     paymentType: 'Payment Type',
//     cash: 'Cash Amount',
//     pos: 'POS Amount',
//     terminalId: 'Terminal ID',
//     posNo: 'POS Payment No',
//     cardType: 'Card Type',
//     approval: 'Approval Code',
//     insuranceProvider: 'Insurance Provider',
//     insuranceClass: 'Insurance Class',
//     insuranceType: 'Insurance Type',
//     coverage: 'Coverage',
//     acceptNo: 'Insurance Accept Number',
//     cardId: 'Card ID',
//     formId: 'Insurance Form ID',
//     payingNow: 'Paying Now',
//     remainingLabel: 'Remaining',
//     selectCurrency: 'Currency',
//   };

//   const [paymentType, setPaymentType] = useState('CASH');
//   const [originalAmount, setOriginalAmount] = useState(remaining > 0 ? remaining : (visit.amount || 0));
//   const [cashAmount, setCashAmount] = useState(0);
//   const [posAmount, setPosAmount] = useState(0);
//   const [terminalId, setTerminalId] = useState('');
//   const [posNo, setPosNo] = useState('');
//   const [cardType, setCardType] = useState('');
//   const [approvalCode, setApprovalCode] = useState('');
//   const [insuranceProvider, setInsuranceProvider] = useState('');
//   const [insuranceClass, setInsuranceClass] = useState('');
//   const [insuranceType, setInsuranceType] = useState('BENEFICIARY');
//   const [coveragePercent, setCoveragePercent] = useState(0);
//   const [insuranceAcceptNo, setInsuranceAcceptNo] = useState('');
//   const [cardId, setCardId] = useState('');
//   const [formId, setFormId] = useState('');
//   const [currency, setCurrency] = useState('JOD');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const currencies = ['JOD', 'USD', 'EUR', 'KES', 'UGX', 'SAR', 'KWD', 'AED', 'BHD', 'OMR', 'QAR', 'LYD', 'EGP'];

//   // Update originalAmount when remaining changes
//   useEffect(() => {
//     if (remaining > 0) {
//       setOriginalAmount(remaining);
//     }
//   }, [remaining]);

//   // Calculate paying now and remaining
//   const payingNow = cashAmount + posAmount;
//   const remainingAfterPayment = Math.max(0, originalAmount - payingNow);

//   // Load insurance data when payment type is INSURANCE
//   useEffect(() => {
//     if (paymentType === 'INSURANCE' && visit.patientId) {
//       fetch(`${BASE_URL}/api/patients/search/id/${visit.patientId}`)
//         .then(res => {
//           if (!res.ok) throw new Error('Failed to load patient data');
//           return res.json();
//         })
//         .then(data => {
//           if (data.insuranceProvider) {
//             setInsuranceProvider(data.insuranceProvider);
//           }
//           if (data.classA) setInsuranceClass('A');
//           else if (data.classB) setInsuranceClass('B');
//           else if (data.classC) setInsuranceClass('C');
//         })
//         .catch(err => {
//           //console.error('Failed to load insurance data:', err);
//         });
//     }
//   }, [paymentType, visit.patientId]);

//   const handlePay = async () => {
//     setError('');

//     // Validation
//     if (paymentType !== 'FREE' && paymentType !== 'INSURANCE' && payingNow <= 0) {
//       setError('Please enter a payment amount');
//       return;
//     }

//     if (paymentType === 'POS' || paymentType === 'CASH + POS') {
//       if (posAmount > 0 && (!terminalId || !posNo || !cardType || !approvalCode)) {
//         setError('All POS fields are required');
//         return;
//       }
//     }

//     if (paymentType === 'INSURANCE') {
//       const hasCardId = cardId.trim() !== '';
//       const hasFormId = formId.trim() !== '';
      
//       if (!hasCardId && !hasFormId) {
//         setError('Enter Card ID or Form ID');
//         return;
//       }
//       if (hasCardId && hasFormId) {
//         setError('Enter only Card ID OR Form ID');
//         return;
//       }
//       if (!insuranceAcceptNo.trim()) {
//         setError('Insurance Accept Number is required');
//         return;
//       }
//       if (!insuranceProvider.trim() || !insuranceClass) {
//         setError('Provider and Class are required');
//         return;
//       }
//     }

//     setLoading(true);

//     try {
//       // Build request body matching Java backend format
//       const payments = [];

//       // CASH payment
//       if (cashAmount > 0) {
//         payments.push({
//           paymentMethod: 'CASH',
//           cashAmount: cashAmount
//         });
//       }

//       // POS payment
//       if (posAmount > 0) {
//         const posPayment = {
//           paymentMethod: 'POS',
//           cashAmount: posAmount,
//           terminalId: terminalId,
//           posPaymentNo: posNo,
//           cardType: cardType,
//           approvalCode: approvalCode
//         };
//         payments.push(posPayment);
//       }

//       // INSURANCE payment
//       if (paymentType === 'INSURANCE') {
//         const insurancePayment = {
//           paymentMethod: 'INSURANCE',
//           originalAmount: originalAmount,
//           cashAmount: cashAmount,
//           insuranceAmount: originalAmount - cashAmount,
//           insuranceProvider: insuranceProvider,
//           insuranceClass: insuranceClass,
//           insuranceType: insuranceType,
//           coveragePercent: coveragePercent,
//           insuranceAcceptNumber: insuranceAcceptNo
//         };
        
//         if (cardId.trim()) {
//           insurancePayment.cardId = cardId.trim();
//         }
//         if (formId.trim()) {
//           insurancePayment.insuranceFormId = formId.trim();
//         }
        
//         payments.push(insurancePayment);
//       }

//       // FREE payment
//       if (paymentType === 'FREE') {
//         payments.push({
//           paymentMethod: 'FREE',
//           cashAmount: 0
//         });
//       }

//       // Build the final payload - matches Java backend
//       const payload = {
//         originalAmount: originalAmount,
//         currency: currency,
//         payments: payments
//       };

//       //console.log('📤 Sending payment payload:', JSON.stringify(payload, null, 2));

//       const res = await fetch(`${BASE_URL}/api/visits/payments/${visit.id}`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(payload),
//       });

//       // Handle error response
//       if (!res.ok) {
//         let errorText = '';
//         try {
//           const errorData = await res.json();
//           errorText = errorData.message || errorData.error || JSON.stringify(errorData);
//         } catch (e) {
//           try {
//             errorText = await res.text();
//           } catch (textErr) {
//             errorText = `HTTP ${res.status}: ${res.statusText}`;
//           }
//         }
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }

//       // Check if there's content to parse
//       const contentType = res.headers.get('content-type');
//       let result;
      
//       if (contentType && contentType.includes('application/json')) {
//         const text = await res.text();
//         if (text && text.trim() !== '') {
//           try {
//             result = JSON.parse(text);
//             //console.log('✅ Payment successful:', result);
//           } catch (parseErr) {
//             //console.warn('⚠️ Response was not valid JSON:', text);
//             result = { message: 'Payment processed successfully', raw: text };
//           }
//         } else {
//           //console.log('✅ Payment successful (empty response)');
//           result = { message: 'Payment processed successfully' };
//         }
//       } else {
//         const text = await res.text();
//         //console.log('✅ Payment successful (non-JSON response):', text);
//         result = { message: text || 'Payment processed successfully' };
//       }

//       // Log the action
//       try {
//         await fetch(`${BASE_URL}/api/logs/add`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             username: loggedUser,
//             action: 'PAYMENT',
//             details: `Payment of ${payingNow} for visit ${visit.id}`,
//           }),
//         });
//       } catch (logErr) { /* ignore */ }

//       if (onPaymentComplete) {
//         onPaymentComplete(payingNow);
//       }
//       onClose();
//     } catch (err) {
//       //console.error('❌ Payment error:', err);
//       setError(err.message || 'Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Determine if fields should be visible
//   const showCashField = paymentType === 'CASH' || paymentType === 'CASH + POS' || paymentType === 'INSURANCE';
//   const showPosField = paymentType === 'POS' || paymentType === 'CASH + POS';
//   const showPosDetails = paymentType === 'POS' || paymentType === 'CASH + POS';
//   const showInsuranceFields = paymentType === 'INSURANCE';
//   const showFreeMessage = paymentType === 'FREE';

//   return (
//     <div style={modalOverlay}>
//       <div style={modalContent}>
//         <h3 style={{ margin: '0 0 15px 0' }}>💰 Payment</h3>
        
//         <div style={{ marginBottom: 15 }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Visit #{visit.id}</span>
//             <span>Patient: {visit.patientName}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Total Amount:</span>
//             <span style={{ fontWeight: 'bold' }}>{visit.amount.toFixed(2)}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Paid:</span>
//             <span style={{ fontWeight: 'bold', color: '#48bb78' }}>{visit.totalPaid.toFixed(2)}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Remaining:</span>
//             <span style={{ fontWeight: 'bold', color: '#e53e3e' }}>{remaining.toFixed(2)}</span>
//           </div>
//         </div>

//         <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

//         <div style={{ marginBottom: 15 }}>
//           <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
//             <div style={{ flex: 2 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.original}</label>
//               <input
//                 type="number"
//                 value={originalAmount}
//                 onChange={(e) => setOriginalAmount(parseFloat(e.target.value) || 0)}
//                 style={inputStyle}
//               />
//               {remaining > 0 && (
//                 <div style={{ 
//                   fontSize: 12, 
//                   color: '#718096', 
//                   marginTop: 4,
//                   fontStyle: 'italic'
//                 }}>
//                   💡 Auto-filled with remaining amount ({remaining.toFixed(2)})
//                 </div>
//               )}
//             </div>
//             <div style={{ flex: 1 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.selectCurrency}</label>
//               <select
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//                 style={inputStyle}
//               >
//                 {currencies.map(c => <option key={c} value={c}>{c}</option>)}
//               </select>
//             </div>
//           </div>

//           <div style={{ marginBottom: 10 }}>
//             <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.paymentType}</label>
//             <select
//               value={paymentType}
//               onChange={(e) => {
//                 setPaymentType(e.target.value);
//                 if (e.target.value === 'FREE') {
//                   setCashAmount(0);
//                   setPosAmount(0);
//                 }
//               }}
//               style={inputStyle}
//             >
//               <option value="CASH">CASH</option>
//               <option value="POS">POS</option>
//               <option value="CASH + POS">CASH + POS</option>
//               <option value="INSURANCE">INSURANCE</option>
//               <option value="FREE">FREE</option>
//             </select>
//           </div>

//           {/* FREE Payment Message */}
//           {showFreeMessage && (
//             <div style={{ 
//               padding: '15px', 
//               background: '#fefcbf', 
//               borderRadius: 8, 
//               marginBottom: 10,
//               textAlign: 'center',
//               fontWeight: 'bold',
//               color: '#744210'
//             }}>
//               🎉 FREE Payment - No amount will be charged
//             </div>
//           )}

//           {/* Cash Amount - Only show for CASH, CASH+POS, and INSURANCE */}
//           {showCashField && (
//             <div style={{ marginBottom: 10 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cash}</label>
//               <input
//                 type="number"
//                 value={cashAmount}
//                 onChange={(e) => setCashAmount(parseFloat(e.target.value) || 0)}
//                 min="0"
//                 step="0.01"
//                 style={inputStyle}
//               />
//             </div>
//           )}

//           {/* POS Amount - Only show for POS and CASH+POS */}
//           {showPosField && (
//             <div style={{ marginBottom: 10 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.pos}</label>
//               <input
//                 type="number"
//                 value={posAmount}
//                 onChange={(e) => setPosAmount(parseFloat(e.target.value) || 0)}
//                 min="0"
//                 step="0.01"
//                 style={inputStyle}
//               />
//             </div>
//           )}

//           {/* POS Details - Only show for POS and CASH+POS */}
//           {showPosDetails && (
//             <>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.terminalId}</label>
//                 <input
//                   type="text"
//                   value={terminalId}
//                   onChange={(e) => setTerminalId(e.target.value)}
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.posNo}</label>
//                 <input
//                   type="text"
//                   value={posNo}
//                   onChange={(e) => setPosNo(e.target.value)}
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardType}</label>
//                 <input
//                   type="text"
//                   value={cardType}
//                   onChange={(e) => setCardType(e.target.value)}
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.approval}</label>
//                 <input
//                   type="text"
//                   value={approvalCode}
//                   onChange={(e) => setApprovalCode(e.target.value)}
//                   style={inputStyle}
//                 />
//               </div>
//             </>
//           )}

//           {/* Insurance Fields - Only show for INSURANCE */}
//           {showInsuranceFields && (
//             <>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceProvider}</label>
//                 <input
//                   type="text"
//                   value={insuranceProvider}
//                   onChange={(e) => setInsuranceProvider(e.target.value)}
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceClass}</label>
//                 <select
//                   value={insuranceClass}
//                   onChange={(e) => setInsuranceClass(e.target.value)}
//                   style={inputStyle}
//                 >
//                   <option value="">Select Class</option>
//                   <option value="A">A</option>
//                   <option value="B">B</option>
//                   <option value="C">C</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceType}</label>
//                 <select
//                   value={insuranceType}
//                   onChange={(e) => setInsuranceType(e.target.value)}
//                   style={inputStyle}
//                 >
//                   <option value="BENEFICIARY">BENEFICIARY</option>
//                   <option value="SUBSCRIBER">SUBSCRIBER</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.coverage} ({coveragePercent}%)</label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={coveragePercent}
//                   onChange={(e) => setCoveragePercent(parseInt(e.target.value))}
//                   style={{ width: '100%' }}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.acceptNo}</label>
//                 <input
//                   type="text"
//                   value={insuranceAcceptNo}
//                   onChange={(e) => setInsuranceAcceptNo(e.target.value)}
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardId}</label>
//                 <input
//                   type="text"
//                   value={cardId}
//                   onChange={(e) => setCardId(e.target.value)}
//                   style={inputStyle}
//                   placeholder="Enter Card ID OR Form ID"
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.formId}</label>
//                 <input
//                   type="text"
//                   value={formId}
//                   onChange={(e) => setFormId(e.target.value)}
//                   style={inputStyle}
//                   placeholder="Enter Form ID OR Card ID"
//                 />
//               </div>
//             </>
//           )}

//           {/* Summary - Always show */}
//           <div style={{ marginTop: 15, padding: '10px', background: '#f7fafc', borderRadius: 8 }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
//               <span>{t.payingNow}:</span>
//               <span style={{ fontWeight: 'bold', color: '#2b6cb0' }}>
//                 {paymentType === 'FREE' ? '0.00' : payingNow.toFixed(2)}
//               </span>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <span>{t.remainingLabel}:</span>
//               <span style={{ fontWeight: 'bold', color: remainingAfterPayment === 0 ? '#48bb78' : '#e53e3e' }}>
//                 {paymentType === 'FREE' ? originalAmount.toFixed(2) : remainingAfterPayment.toFixed(2)}
//               </span>
//             </div>
//           </div>

//           {error && <div style={{ color: '#fc8181', fontSize: 14, marginTop: 10 }}>{error}</div>}
//         </div>

//         <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//           <button
//             onClick={onClose}
//             style={cancelButtonStyle}
//           >
//             {t.cancel}
//           </button>
//           <button
//             onClick={handlePay}
//             disabled={loading}
//             style={payButtonStyle}
//           >
//             {loading ? '⏳ Processing...' : '💰 Pay'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles remain the same
// const modalOverlay = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   background: 'rgba(0,0,0,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 2000,
// };

// const modalContent = {
//   background: 'white',
//   borderRadius: 12,
//   padding: 24,
//   maxWidth: 500,
//   width: '95%',
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// const inputStyle = {
//   width: '100%',
//   padding: '8px 12px',
//   borderRadius: 8,
//   border: '1px solid #e2e8f0',
//   fontSize: 14,
//   boxSizing: 'border-box',
// };

// const cancelButtonStyle = {
//   background: '#e2e8f0',
//   border: 'none',
//   padding: '8px 20px',
//   borderRadius: 8,
//   cursor: 'pointer',
//   fontSize: 14,
// };

// const payButtonStyle = {
//   background: '#48bb78',
//   color: 'white',
//   fontWeight: 'bold',
//   border: 'none',
//   padding: '8px 20px',
//   borderRadius: 8,
//   cursor: 'pointer',
//   fontSize: 14,
// };

// export default VisitPayScreen;


// import React, { useState, useEffect } from 'react';
// import { BASE_URL } from '../../utils/api';

// const VisitPayScreen = ({ visit, remaining, loggedUser, onClose, onPaymentComplete }) => {
//   const t = {
//     title: 'Payment',
//     original: 'Original Amount',
//     cancel: 'Cancel',
//     pay: 'Pay',
//     processing: 'Processing...',
//     paymentType: 'Payment Type',
//     cash: 'Cash Amount',
//     pos: 'POS Amount',
//     terminalId: 'Terminal ID',
//     posNo: 'POS Payment No',
//     cardType: 'Card Type',
//     approval: 'Approval Code',
//     insuranceProvider: 'Insurance Provider',
//     insuranceClass: 'Insurance Class',
//     insuranceType: 'Insurance Type',
//     coverage: 'Coverage',
//     acceptNo: 'Insurance Accept Number',
//     cardId: 'Card ID',
//     formId: 'Insurance Form ID',
//     payingNow: 'Paying Now',
//     remainingLabel: 'Remaining',
//     selectCurrency: 'Currency',
//   };

//   const [paymentType, setPaymentType] = useState('CASH');
//   const [originalAmount, setOriginalAmount] = useState(remaining > 0 ? remaining : (visit.amount || 0));
//   const [cashAmount, setCashAmount] = useState('');
//   const [posAmount, setPosAmount] = useState('');
//   const [terminalId, setTerminalId] = useState('');
//   const [posNo, setPosNo] = useState('');
//   const [cardType, setCardType] = useState('');
//   const [approvalCode, setApprovalCode] = useState('');
//   const [insuranceProvider, setInsuranceProvider] = useState('');
//   const [insuranceClass, setInsuranceClass] = useState('');
//   const [insuranceType, setInsuranceType] = useState('BENEFICIARY');
//   const [coveragePercent, setCoveragePercent] = useState(0);
//   const [insuranceAcceptNo, setInsuranceAcceptNo] = useState('');
//   const [cardId, setCardId] = useState('');
//   const [formId, setFormId] = useState('');
//   const [currency, setCurrency] = useState('JOD');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const currencies = ['JOD', 'USD', 'EUR', 'KES', 'UGX', 'SAR', 'KWD', 'AED', 'BHD', 'OMR', 'QAR', 'LYD', 'EGP'];

//   // Update originalAmount when remaining changes
//   useEffect(() => {
//     if (remaining > 0) {
//       setOriginalAmount(remaining);
//     }
//   }, [remaining]);

//   // Calculate paying now and remaining
//   const payingNow = (parseFloat(cashAmount) || 0) + (parseFloat(posAmount) || 0);
//   const remainingAfterPayment = Math.max(0, originalAmount - payingNow);

//   // Load insurance data when payment type is INSURANCE
//   useEffect(() => {
//     if (paymentType === 'INSURANCE' && visit.patientId) {
//       fetch(`${BASE_URL}/api/patients/search/id/${visit.patientId}`)
//         .then(res => {
//           if (!res.ok) throw new Error('Failed to load patient data');
//           return res.json();
//         })
//         .then(data => {
//           if (data.insuranceProvider) {
//             setInsuranceProvider(data.insuranceProvider);
//           }
//           if (data.classA) setInsuranceClass('A');
//           else if (data.classB) setInsuranceClass('B');
//           else if (data.classC) setInsuranceClass('C');
//         })
//         .catch(err => {
//           //console.error('Failed to load insurance data:', err);
//         });
//     }
//   }, [paymentType, visit.patientId]);

//   const handlePay = async () => {
//     setError('');

//     // Convert string values to numbers
//     const cashValue = parseFloat(cashAmount) || 0;
//     const posValue = parseFloat(posAmount) || 0;
//     const totalPayment = cashValue + posValue;

//     // Validation
//     if (paymentType !== 'FREE' && paymentType !== 'INSURANCE' && totalPayment <= 0) {
//       setError('Please enter a payment amount');
//       return;
//     }

//     if (paymentType === 'POS' || paymentType === 'CASH + POS') {
//       if (posValue > 0 && (!terminalId || !posNo || !cardType || !approvalCode)) {
//         setError('All POS fields are required');
//         return;
//       }
//     }

//     if (paymentType === 'INSURANCE') {
//       const hasCardId = cardId.trim() !== '';
//       const hasFormId = formId.trim() !== '';
      
//       if (!hasCardId && !hasFormId) {
//         setError('Enter Card ID or Form ID');
//         return;
//       }
//       if (hasCardId && hasFormId) {
//         setError('Enter only Card ID OR Form ID');
//         return;
//       }
//       if (!insuranceAcceptNo.trim()) {
//         setError('Insurance Accept Number is required');
//         return;
//       }
//       if (!insuranceProvider.trim() || !insuranceClass) {
//         setError('Provider and Class are required');
//         return;
//       }
//     }

//     setLoading(true);

//     try {
//       // Build request body matching Java backend format
//       const payments = [];

//       // CASH payment
//       if (cashValue > 0) {
//         payments.push({
//           paymentMethod: 'CASH',
//           cashAmount: cashValue
//         });
//       }

//       // POS payment
//       if (posValue > 0) {
//         const posPayment = {
//           paymentMethod: 'POS',
//           cashAmount: posValue,
//           terminalId: terminalId,
//           posPaymentNo: posNo,
//           cardType: cardType,
//           approvalCode: approvalCode
//         };
//         payments.push(posPayment);
//       }

//       // INSURANCE payment
//       if (paymentType === 'INSURANCE') {
//         const insurancePayment = {
//           paymentMethod: 'INSURANCE',
//           originalAmount: originalAmount,
//           cashAmount: cashValue,
//           insuranceAmount: originalAmount - cashValue,
//           insuranceProvider: insuranceProvider,
//           insuranceClass: insuranceClass,
//           insuranceType: insuranceType,
//           coveragePercent: coveragePercent,
//           insuranceAcceptNumber: insuranceAcceptNo
//         };
        
//         if (cardId.trim()) {
//           insurancePayment.cardId = cardId.trim();
//         }
//         if (formId.trim()) {
//           insurancePayment.insuranceFormId = formId.trim();
//         }
        
//         payments.push(insurancePayment);
//       }

//       // FREE payment
//       if (paymentType === 'FREE') {
//         payments.push({
//           paymentMethod: 'FREE',
//           cashAmount: 0
//         });
//       }

//       // Build the final payload - matches Java backend
//       const payload = {
//         originalAmount: originalAmount,
//         currency: currency,
//         payments: payments
//       };

//       //console.log('📤 Sending payment payload:', JSON.stringify(payload, null, 2));

//       const res = await fetch(`${BASE_URL}/api/visits/payments/${visit.id}`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(payload),
//       });

//       // Handle error response
//       if (!res.ok) {
//         let errorText = '';
//         try {
//           const errorData = await res.json();
//           errorText = errorData.message || errorData.error || JSON.stringify(errorData);
//         } catch (e) {
//           try {
//             errorText = await res.text();
//           } catch (textErr) {
//             errorText = `HTTP ${res.status}: ${res.statusText}`;
//           }
//         }
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }

//       // Check if there's content to parse
//       const contentType = res.headers.get('content-type');
//       let result;
      
//       if (contentType && contentType.includes('application/json')) {
//         const text = await res.text();
//         if (text && text.trim() !== '') {
//           try {
//             result = JSON.parse(text);
//             //console.log('✅ Payment successful:', result);
//           } catch (parseErr) {
//             //console.warn('⚠️ Response was not valid JSON:', text);
//             result = { message: 'Payment processed successfully', raw: text };
//           }
//         } else {
//           //console.log('✅ Payment successful (empty response)');
//           result = { message: 'Payment processed successfully' };
//         }
//       } else {
//         const text = await res.text();
//         //console.log('✅ Payment successful (non-JSON response):', text);
//         result = { message: text || 'Payment processed successfully' };
//       }

//       // Log the action
//       try {
//         await fetch(`${BASE_URL}/api/logs/add`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             username: loggedUser,
//             action: 'PAYMENT',
//             details: `Payment of ${totalPayment} for visit ${visit.id}`,
//           }),
//         });
//       } catch (logErr) { /* ignore */ }

//       if (onPaymentComplete) {
//         onPaymentComplete(totalPayment);
//       }
//       onClose();
//     } catch (err) {
//       //console.error('❌ Payment error:', err);
//       setError(err.message || 'Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Determine if fields should be visible
//   const showCashField = paymentType === 'CASH' || paymentType === 'CASH + POS' || paymentType === 'INSURANCE';
//   const showPosField = paymentType === 'POS' || paymentType === 'CASH + POS';
//   const showPosDetails = paymentType === 'POS' || paymentType === 'CASH + POS';
//   const showInsuranceFields = paymentType === 'INSURANCE';
//   const showFreeMessage = paymentType === 'FREE';

//   // Helper to handle number input changes
//   const handleNumberChange = (setter) => (e) => {
//     const value = e.target.value;
//     // Allow empty string, numbers, and decimal points
//     if (value === '' || /^\d*\.?\d*$/.test(value)) {
//       setter(value);
//     }
//   };

//   return (
//     <div style={modalOverlay}>
//       <div style={modalContent}>
//         <h3 style={{ margin: '0 0 15px 0' }}>💰 Payment</h3>
        
//         <div style={{ marginBottom: 15 }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Visit #{visit.id}</span>
//             <span>Patient: {visit.patientName}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Total Amount:</span>
//             <span style={{ fontWeight: 'bold' }}>{visit.amount.toFixed(2)}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Paid:</span>
//             <span style={{ fontWeight: 'bold', color: '#48bb78' }}>{visit.totalPaid.toFixed(2)}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Remaining:</span>
//             <span style={{ fontWeight: 'bold', color: '#e53e3e' }}>{remaining.toFixed(2)}</span>
//           </div>
//         </div>

//         <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

//         <div style={{ marginBottom: 15 }}>
//           <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
//             <div style={{ flex: 2 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.original}</label>
//               <input
//                 type="number"
//                 value={originalAmount}
//                 onChange={(e) => setOriginalAmount(parseFloat(e.target.value) || 0)}
//                 style={inputStyle}
//                 placeholder="Enter amount"
//               />
//               {remaining > 0 && (
//                 <div style={{ 
//                   fontSize: 12, 
//                   color: '#718096', 
//                   marginTop: 4,
//                   fontStyle: 'italic'
//                 }}>
//                   💡 Auto-filled with remaining amount ({remaining.toFixed(2)})
//                 </div>
//               )}
//             </div>
//             <div style={{ flex: 1 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.selectCurrency}</label>
//               <select
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//                 style={inputStyle}
//               >
//                 {currencies.map(c => <option key={c} value={c}>{c}</option>)}
//               </select>
//             </div>
//           </div>

//           <div style={{ marginBottom: 10 }}>
//             <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.paymentType}</label>
//             <select
//               value={paymentType}
//               onChange={(e) => {
//                 setPaymentType(e.target.value);
//                 if (e.target.value === 'FREE') {
//                   setCashAmount('');
//                   setPosAmount('');
//                 }
//               }}
//               style={inputStyle}
//             >
//               <option value="CASH">CASH</option>
//               <option value="POS">POS</option>
//               <option value="CASH + POS">CASH + POS</option>
//               <option value="INSURANCE">INSURANCE</option>
//               <option value="FREE">FREE</option>
//             </select>
//           </div>

//           {/* FREE Payment Message */}
//           {showFreeMessage && (
//             <div style={{ 
//               padding: '15px', 
//               background: '#fefcbf', 
//               borderRadius: 8, 
//               marginBottom: 10,
//               textAlign: 'center',
//               fontWeight: 'bold',
//               color: '#744210'
//             }}>
//               🎉 FREE Payment - No amount will be charged
//             </div>
//           )}

//           {/* Cash Amount - Only show for CASH, CASH+POS, and INSURANCE */}
//           {showCashField && (
//             <div style={{ marginBottom: 10 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cash}</label>
//               <input
//                 type="text"
//                 value={cashAmount}
//                 onChange={handleNumberChange(setCashAmount)}
//                 placeholder="Enter amount"
//                 style={inputStyle}
//               />
//             </div>
//           )}

//           {/* POS Amount - Only show for POS and CASH+POS */}
//           {showPosField && (
//             <div style={{ marginBottom: 10 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.pos}</label>
//               <input
//                 type="text"
//                 value={posAmount}
//                 onChange={handleNumberChange(setPosAmount)}
//                 placeholder="Enter amount"
//                 style={inputStyle}
//               />
//             </div>
//           )}

//           {/* POS Details - Only show for POS and CASH+POS */}
//           {showPosDetails && (
//             <>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.terminalId}</label>
//                 <input
//                   type="text"
//                   value={terminalId}
//                   onChange={(e) => setTerminalId(e.target.value)}
//                   placeholder="Enter terminal ID"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.posNo}</label>
//                 <input
//                   type="text"
//                   value={posNo}
//                   onChange={(e) => setPosNo(e.target.value)}
//                   placeholder="Enter POS number"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardType}</label>
//                 <input
//                   type="text"
//                   value={cardType}
//                   onChange={(e) => setCardType(e.target.value)}
//                   placeholder="Enter card type"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.approval}</label>
//                 <input
//                   type="text"
//                   value={approvalCode}
//                   onChange={(e) => setApprovalCode(e.target.value)}
//                   placeholder="Enter approval code"
//                   style={inputStyle}
//                 />
//               </div>
//             </>
//           )}

//           {/* Insurance Fields - Only show for INSURANCE */}
//           {showInsuranceFields && (
//             <>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceProvider}</label>
//                 <input
//                   type="text"
//                   value={insuranceProvider}
//                   onChange={(e) => setInsuranceProvider(e.target.value)}
//                   placeholder="Enter insurance provider"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceClass}</label>
//                 <select
//                   value={insuranceClass}
//                   onChange={(e) => setInsuranceClass(e.target.value)}
//                   style={inputStyle}
//                 >
//                   <option value="">Select Class</option>
//                   <option value="A">A</option>
//                   <option value="B">B</option>
//                   <option value="C">C</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceType}</label>
//                 <select
//                   value={insuranceType}
//                   onChange={(e) => setInsuranceType(e.target.value)}
//                   style={inputStyle}
//                 >
//                   <option value="BENEFICIARY">BENEFICIARY</option>
//                   <option value="SUBSCRIBER">SUBSCRIBER</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.coverage} ({coveragePercent}%)</label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={coveragePercent}
//                   onChange={(e) => setCoveragePercent(parseInt(e.target.value))}
//                   style={{ width: '100%' }}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.acceptNo}</label>
//                 <input
//                   type="text"
//                   value={insuranceAcceptNo}
//                   onChange={(e) => setInsuranceAcceptNo(e.target.value)}
//                   placeholder="Enter insurance accept number"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardId}</label>
//                 <input
//                   type="text"
//                   value={cardId}
//                   onChange={(e) => setCardId(e.target.value)}
//                   placeholder="Enter Card ID OR Form ID"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.formId}</label>
//                 <input
//                   type="text"
//                   value={formId}
//                   onChange={(e) => setFormId(e.target.value)}
//                   placeholder="Enter Form ID OR Card ID"
//                   style={inputStyle}
//                 />
//               </div>
//             </>
//           )}

//           {/* Summary - Always show */}
//           <div style={{ marginTop: 15, padding: '10px', background: '#f7fafc', borderRadius: 8 }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
//               <span>{t.payingNow}:</span>
//               <span style={{ fontWeight: 'bold', color: '#2b6cb0' }}>
//                 {paymentType === 'FREE' ? '0.00' : payingNow.toFixed(2)}
//               </span>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <span>{t.remainingLabel}:</span>
//               <span style={{ fontWeight: 'bold', color: remainingAfterPayment === 0 ? '#48bb78' : '#e53e3e' }}>
//                 {paymentType === 'FREE' ? originalAmount.toFixed(2) : remainingAfterPayment.toFixed(2)}
//               </span>
//             </div>
//           </div>

//           {error && <div style={{ color: '#fc8181', fontSize: 14, marginTop: 10 }}>{error}</div>}
//         </div>

//         <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//           <button
//             onClick={onClose}
//             style={cancelButtonStyle}
//           >
//             {t.cancel}
//           </button>
//           <button
//             onClick={handlePay}
//             disabled={loading}
//             style={payButtonStyle}
//           >
//             {loading ? '⏳ Processing...' : '💰 Pay'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles remain the same
// const modalOverlay = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   background: 'rgba(0,0,0,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 2000,
// };

// const modalContent = {
//   background: 'white',
//   borderRadius: 12,
//   padding: 24,
//   maxWidth: 500,
//   width: '95%',
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// const inputStyle = {
//   width: '100%',
//   padding: '8px 12px',
//   borderRadius: 8,
//   border: '1px solid #e2e8f0',
//   fontSize: 14,
//   boxSizing: 'border-box',
// };

// const cancelButtonStyle = {
//   background: '#e2e8f0',
//   border: 'none',
//   padding: '8px 20px',
//   borderRadius: 8,
//   cursor: 'pointer',
//   fontSize: 14,
// };

// const payButtonStyle = {
//   background: '#48bb78',
//   color: 'white',
//   fontWeight: 'bold',
//   border: 'none',
//   padding: '8px 20px',
//   borderRadius: 8,
//   cursor: 'pointer',
//   fontSize: 14,
// };

// export default VisitPayScreen;  11072026  9:20 pm

// import React, { useState, useEffect } from 'react';
// import { BASE_URL } from '../../utils/api';

// const VisitPayScreen = ({ visit, remaining, loggedUser, onClose, onPaymentComplete }) => {
//   const t = {
//     title: 'Payment',
//     original: 'Original Amount',
//     cancel: 'Cancel',
//     pay: 'Pay',
//     processing: 'Processing...',
//     paymentType: 'Payment Type',
//     cash: 'Cash Amount',
//     pos: 'POS Amount',
//     terminalId: 'Terminal ID',
//     posNo: 'POS Payment No',
//     cardType: 'Card Type',
//     approval: 'Approval Code',
//     insuranceProvider: 'Insurance Provider',
//     insuranceClass: 'Insurance Class',
//     insuranceType: 'Insurance Type',
//     coverage: 'Coverage',
//     acceptNo: 'Insurance Accept Number',
//     cardId: 'Card ID',
//     formId: 'Insurance Form ID',
//     payingNow: 'Paying Now',
//     remainingLabel: 'Remaining',
//     selectCurrency: 'Currency',
//   };

//   const [paymentType, setPaymentType] = useState('CASH');
//   const [originalAmount, setOriginalAmount] = useState(remaining > 0 ? remaining : (visit.amount || 0));
//   const [cashAmount, setCashAmount] = useState('');
//   const [posAmount, setPosAmount] = useState('');
//   const [terminalId, setTerminalId] = useState('');
//   const [posNo, setPosNo] = useState('');
//   const [cardType, setCardType] = useState('');
//   const [approvalCode, setApprovalCode] = useState('');
//   const [insuranceProvider, setInsuranceProvider] = useState('');
//   const [insuranceClass, setInsuranceClass] = useState('');
//   const [insuranceType, setInsuranceType] = useState('BENEFICIARY');
//   const [coveragePercent, setCoveragePercent] = useState(0);
//   const [insuranceAcceptNo, setInsuranceAcceptNo] = useState('');
//   const [cardId, setCardId] = useState('');
//   const [formId, setFormId] = useState('');
//   const [currency, setCurrency] = useState('JOD');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const currencies = ['JOD', 'USD', 'EUR', 'KES', 'UGX', 'SAR', 'KWD', 'AED', 'BHD', 'OMR', 'QAR', 'LYD', 'EGP'];
//   const cardTypes = ['Credit', 'Debit', 'Prepaid', 'Gift'];

//   // Update originalAmount when remaining changes
//   useEffect(() => {
//     if (remaining > 0) {
//       setOriginalAmount(remaining);
//     }
//   }, [remaining]);

//   // Calculate paying now and remaining
//   const payingNow = (parseFloat(cashAmount) || 0) + (parseFloat(posAmount) || 0);
//   const remainingAfterPayment = Math.max(0, originalAmount - payingNow);

//   // Load insurance data when payment type is INSURANCE
//   useEffect(() => {
//     if (paymentType === 'INSURANCE' && visit.patientId) {
//       fetch(`${BASE_URL}/api/patients/search/id/${visit.patientId}`)
//         .then(res => {
//           if (!res.ok) throw new Error('Failed to load patient data');
//           return res.json();
//         })
//         .then(data => {
//           if (data.insuranceProvider) {
//             setInsuranceProvider(data.insuranceProvider);
//           }
//           if (data.classA) setInsuranceClass('A');
//           else if (data.classB) setInsuranceClass('B');
//           else if (data.classC) setInsuranceClass('C');
//         })
//         .catch(err => {
//           //console.error('Failed to load insurance data:', err);
//         });
//     }
//   }, [paymentType, visit.patientId]);

//   const handlePay = async () => {
//     setError('');

//     // Convert string values to numbers
//     const cashValue = parseFloat(cashAmount) || 0;
//     const posValue = parseFloat(posAmount) || 0;
//     const totalPayment = cashValue + posValue;

//     // Validation
//     if (paymentType !== 'FREE' && paymentType !== 'INSURANCE' && totalPayment <= 0) {
//       setError('Please enter a payment amount');
//       return;
//     }

//     if (paymentType === 'POS' || paymentType === 'CASH + POS') {
//       if (posValue > 0 && (!terminalId || !posNo || !cardType || !approvalCode)) {
//         setError('All POS fields are required');
//         return;
//       }
//     }

//     if (paymentType === 'INSURANCE') {
//       const hasCardId = cardId.trim() !== '';
//       const hasFormId = formId.trim() !== '';
      
//       if (!hasCardId && !hasFormId) {
//         setError('Enter Card ID or Form ID');
//         return;
//       }
//       if (hasCardId && hasFormId) {
//         setError('Enter only Card ID OR Form ID');
//         return;
//       }
//       if (!insuranceAcceptNo.trim()) {
//         setError('Insurance Accept Number is required');
//         return;
//       }
//       if (!insuranceProvider.trim() || !insuranceClass) {
//         setError('Provider and Class are required');
//         return;
//       }
//     }

//     setLoading(true);

//     try {
//       // Build request body matching Java backend format
//       const payments = [];

//       // CASH payment
//       if (cashValue > 0) {
//         payments.push({
//           paymentMethod: 'CASH',
//           cashAmount: cashValue
//         });
//       }

//       // POS payment
//       if (posValue > 0) {
//         const posPayment = {
//           paymentMethod: 'POS',
//           cashAmount: posValue,
//           terminalId: terminalId,
//           posPaymentNo: posNo,
//           cardType: cardType,
//           approvalCode: approvalCode
//         };
//         payments.push(posPayment);
//       }

//       // INSURANCE payment
//       if (paymentType === 'INSURANCE') {
//         const insurancePayment = {
//           paymentMethod: 'INSURANCE',
//           originalAmount: originalAmount,
//           cashAmount: cashValue,
//           insuranceAmount: originalAmount - cashValue,
//           insuranceProvider: insuranceProvider,
//           insuranceClass: insuranceClass,
//           insuranceType: insuranceType,
//           coveragePercent: coveragePercent,
//           insuranceAcceptNumber: insuranceAcceptNo
//         };
        
//         if (cardId.trim()) {
//           insurancePayment.cardId = cardId.trim();
//         }
//         if (formId.trim()) {
//           insurancePayment.insuranceFormId = formId.trim();
//         }
        
//         payments.push(insurancePayment);
//       }

//       // FREE payment
//       if (paymentType === 'FREE') {
//         payments.push({
//           paymentMethod: 'FREE',
//           cashAmount: 0
//         });
//       }

//       // Build the final payload - matches Java backend
//       const payload = {
//         originalAmount: originalAmount,
//         currency: currency,
//         payments: payments
//       };

//       //console.log('📤 Sending payment payload:', JSON.stringify(payload, null, 2));

//       const res = await fetch(`${BASE_URL}/api/visits/payments/${visit.id}`, {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify(payload),
//       });

//       // Handle error response
//       if (!res.ok) {
//         let errorText = '';
//         try {
//           const errorData = await res.json();
//           errorText = errorData.message || errorData.error || JSON.stringify(errorData);
//         } catch (e) {
//           try {
//             errorText = await res.text();
//           } catch (textErr) {
//             errorText = `HTTP ${res.status}: ${res.statusText}`;
//           }
//         }
//         throw new Error(`HTTP ${res.status}: ${errorText}`);
//       }

//       // Check if there's content to parse
//       const contentType = res.headers.get('content-type');
//       let result;
      
//       if (contentType && contentType.includes('application/json')) {
//         const text = await res.text();
//         if (text && text.trim() !== '') {
//           try {
//             result = JSON.parse(text);
//             //console.log('✅ Payment successful:', result);
//           } catch (parseErr) {
//             //console.warn('⚠️ Response was not valid JSON:', text);
//             result = { message: 'Payment processed successfully', raw: text };
//           }
//         } else {
//           //console.log('✅ Payment successful (empty response)');
//           result = { message: 'Payment processed successfully' };
//         }
//       } else {
//         const text = await res.text();
//         //console.log('✅ Payment successful (non-JSON response):', text);
//         result = { message: text || 'Payment processed successfully' };
//       }

//       // Log the action
//       try {
//         await fetch(`${BASE_URL}/api/logs/add`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             username: loggedUser,
//             action: 'PAYMENT',
//             details: `Payment of ${totalPayment} for visit ${visit.id}`,
//           }),
//         });
//       } catch (logErr) { /* ignore */ }

//       if (onPaymentComplete) {
//         onPaymentComplete(totalPayment);
//       }
//       onClose();
//     } catch (err) {
//       //console.error('❌ Payment error:', err);
//       setError(err.message || 'Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Determine if fields should be visible
//   const showCashField = paymentType === 'CASH' || paymentType === 'CASH + POS' || paymentType === 'INSURANCE';
//   const showPosField = paymentType === 'POS' || paymentType === 'CASH + POS';
//   const showPosDetails = paymentType === 'POS' || paymentType === 'CASH + POS';
//   const showInsuranceFields = paymentType === 'INSURANCE';
//   const showFreeMessage = paymentType === 'FREE';

//   // Helper to handle number input changes
//   const handleNumberChange = (setter) => (e) => {
//     const value = e.target.value;
//     // Allow empty string, numbers, and decimal points
//     if (value === '' || /^\d*\.?\d*$/.test(value)) {
//       setter(value);
//     }
//   };

//   return (
//     <div style={modalOverlay}>
//       <div style={modalContent}>
//         <h3 style={{ margin: '0 0 15px 0' }}>💰 Payment</h3>
        
//         <div style={{ marginBottom: 15 }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Visit #{visit.id}</span>
//             <span>Patient: {visit.patientName}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Total Amount:</span>
//             <span style={{ fontWeight: 'bold' }}>{visit.amount.toFixed(2)}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Paid:</span>
//             <span style={{ fontWeight: 'bold', color: '#48bb78' }}>{visit.totalPaid.toFixed(2)}</span>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
//             <span>Remaining:</span>
//             <span style={{ fontWeight: 'bold', color: '#e53e3e' }}>{remaining.toFixed(2)}</span>
//           </div>
//         </div>

//         <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

//         <div style={{ marginBottom: 15 }}>
//           <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
//             <div style={{ flex: 2 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.original}</label>
//               <input
//                 type="number"
//                 value={originalAmount}
//                 onChange={(e) => setOriginalAmount(parseFloat(e.target.value) || 0)}
//                 style={inputStyle}
//                 placeholder="Enter amount"
//               />
//               {remaining > 0 && (
//                 <div style={{ 
//                   fontSize: 12, 
//                   color: '#718096', 
//                   marginTop: 4,
//                   fontStyle: 'italic'
//                 }}>
//                   💡 Auto-filled with remaining amount ({remaining.toFixed(2)})
//                 </div>
//               )}
//             </div>
//             <div style={{ flex: 1 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.selectCurrency}</label>
//               <select
//                 value={currency}
//                 onChange={(e) => setCurrency(e.target.value)}
//                 style={inputStyle}
//               >
//                 {currencies.map(c => <option key={c} value={c}>{c}</option>)}
//               </select>
//             </div>
//           </div>

//           <div style={{ marginBottom: 10 }}>
//             <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.paymentType}</label>
//             <select
//               value={paymentType}
//               onChange={(e) => {
//                 setPaymentType(e.target.value);
//                 if (e.target.value === 'FREE') {
//                   setCashAmount('');
//                   setPosAmount('');
//                 }
//               }}
//               style={inputStyle}
//             >
//               <option value="CASH">CASH</option>
//               <option value="POS">POS</option>
//               <option value="CASH + POS">CASH + POS</option>
//               <option value="INSURANCE">INSURANCE</option>
//               <option value="FREE">FREE</option>
//             </select>
//           </div>

//           {/* FREE Payment Message */}
//           {showFreeMessage && (
//             <div style={{ 
//               padding: '15px', 
//               background: '#fefcbf', 
//               borderRadius: 8, 
//               marginBottom: 10,
//               textAlign: 'center',
//               fontWeight: 'bold',
//               color: '#744210'
//             }}>
//               🎉 FREE Payment - No amount will be charged
//             </div>
//           )}

//           {/* Cash Amount - Only show for CASH, CASH+POS, and INSURANCE */}
//           {showCashField && (
//             <div style={{ marginBottom: 10 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cash}</label>
//               <input
//                 type="text"
//                 value={cashAmount}
//                 onChange={handleNumberChange(setCashAmount)}
//                 placeholder="Enter amount"
//                 style={inputStyle}
//               />
//             </div>
//           )}

//           {/* POS Amount - Only show for POS and CASH+POS */}
//           {showPosField && (
//             <div style={{ marginBottom: 10 }}>
//               <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.pos}</label>
//               <input
//                 type="text"
//                 value={posAmount}
//                 onChange={handleNumberChange(setPosAmount)}
//                 placeholder="Enter amount"
//                 style={inputStyle}
//               />
//             </div>
//           )}

//           {/* POS Details - Only show for POS and CASH+POS */}
//           {showPosDetails && (
//             <>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.terminalId}</label>
//                 <input
//                   type="text"
//                   value={terminalId}
//                   onChange={(e) => setTerminalId(e.target.value)}
//                   placeholder="Enter terminal ID"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.posNo}</label>
//                 <input
//                   type="text"
//                   value={posNo}
//                   onChange={(e) => setPosNo(e.target.value)}
//                   placeholder="Enter POS number"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardType}</label>
//                 <select
//                   value={cardType}
//                   onChange={(e) => setCardType(e.target.value)}
//                   style={inputStyle}
//                 >
//                   <option value="">Select Card Type</option>
//                   {cardTypes.map(type => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.approval}</label>
//                 <input
//                   type="text"
//                   value={approvalCode}
//                   onChange={(e) => setApprovalCode(e.target.value)}
//                   placeholder="Enter approval code"
//                   style={inputStyle}
//                 />
//               </div>
//             </>
//           )}

//           {/* Insurance Fields - Only show for INSURANCE */}
//           {showInsuranceFields && (
//             <>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceProvider}</label>
//                 <input
//                   type="text"
//                   value={insuranceProvider}
//                   onChange={(e) => setInsuranceProvider(e.target.value)}
//                   placeholder="Enter insurance provider"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceClass}</label>
//                 <select
//                   value={insuranceClass}
//                   onChange={(e) => setInsuranceClass(e.target.value)}
//                   style={inputStyle}
//                 >
//                   <option value="">Select Class</option>
//                   <option value="A">A</option>
//                   <option value="B">B</option>
//                   <option value="C">C</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceType}</label>
//                 <select
//                   value={insuranceType}
//                   onChange={(e) => setInsuranceType(e.target.value)}
//                   style={inputStyle}
//                 >
//                   <option value="BENEFICIARY">BENEFICIARY</option>
//                   <option value="SUBSCRIBER">SUBSCRIBER</option>
//                 </select>
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.coverage} ({coveragePercent}%)</label>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={coveragePercent}
//                   onChange={(e) => setCoveragePercent(parseInt(e.target.value))}
//                   style={{ width: '100%' }}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.acceptNo}</label>
//                 <input
//                   type="text"
//                   value={insuranceAcceptNo}
//                   onChange={(e) => setInsuranceAcceptNo(e.target.value)}
//                   placeholder="Enter insurance accept number"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardId}</label>
//                 <input
//                   type="text"
//                   value={cardId}
//                   onChange={(e) => setCardId(e.target.value)}
//                   placeholder="Enter Card ID OR Form ID"
//                   style={inputStyle}
//                 />
//               </div>
//               <div style={{ marginBottom: 10 }}>
//                 <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.formId}</label>
//                 <input
//                   type="text"
//                   value={formId}
//                   onChange={(e) => setFormId(e.target.value)}
//                   placeholder="Enter Form ID OR Card ID"
//                   style={inputStyle}
//                 />
//               </div>
//             </>
//           )}

//           {/* Summary - Always show */}
//           <div style={{ marginTop: 15, padding: '10px', background: '#f7fafc', borderRadius: 8 }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
//               <span>{t.payingNow}:</span>
//               <span style={{ fontWeight: 'bold', color: '#2b6cb0' }}>
//                 {paymentType === 'FREE' ? '0.00' : payingNow.toFixed(2)}
//               </span>
//             </div>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <span>{t.remainingLabel}:</span>
//               <span style={{ fontWeight: 'bold', color: remainingAfterPayment === 0 ? '#48bb78' : '#e53e3e' }}>
//                 {paymentType === 'FREE' ? originalAmount.toFixed(2) : remainingAfterPayment.toFixed(2)}
//               </span>
//             </div>
//           </div>

//           {error && <div style={{ color: '#fc8181', fontSize: 14, marginTop: 10 }}>{error}</div>}
//         </div>

//         <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
//           <button
//             onClick={onClose}
//             style={cancelButtonStyle}
//           >
//             {t.cancel}
//           </button>
//           <button
//             onClick={handlePay}
//             disabled={loading}
//             style={payButtonStyle}
//           >
//             {loading ? '⏳ Processing...' : '💰 Pay'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Styles remain the same
// const modalOverlay = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   right: 0,
//   bottom: 0,
//   background: 'rgba(0,0,0,0.5)',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   zIndex: 2000,
// };

// const modalContent = {
//   background: 'white',
//   borderRadius: 12,
//   padding: 24,
//   maxWidth: 500,
//   width: '95%',
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
// };

// const inputStyle = {
//   width: '100%',
//   padding: '8px 12px',
//   borderRadius: 8,
//   border: '1px solid #e2e8f0',
//   fontSize: 14,
//   boxSizing: 'border-box',
// };

// const cancelButtonStyle = {
//   background: '#e2e8f0',
//   border: 'none',
//   padding: '8px 20px',
//   borderRadius: 8,
//   cursor: 'pointer',
//   fontSize: 14,
// };

// const payButtonStyle = {
//   background: '#48bb78',
//   color: 'white',
//   fontWeight: 'bold',
//   border: 'none',
//   padding: '8px 20px',
//   borderRadius: 8,
//   cursor: 'pointer',
//   fontSize: 14,
// };

// export default VisitPayScreen; 12072026 4:00 pm

import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../utils/api';

const VisitPayScreen = ({ visit, remaining, loggedUser, onClose, onPaymentComplete }) => {
  const t = {
    title: 'Payment',
    original: 'Original Amount',
    cancel: 'Cancel',
    pay: 'Pay',
    processing: 'Processing...',
    paymentType: 'Payment Type',
    cash: 'Cash Amount',
    pos: 'POS Amount',
    terminalId: 'Terminal ID',
    posNo: 'POS Payment No',
    cardType: 'Card Type',
    approvalCode: 'Approval Code',
    insuranceProvider: 'Insurance Provider',
    insuranceClass: 'Insurance Class',
    insuranceType: 'Insurance Type',
    coverage: 'Coverage',
    acceptNo: 'Insurance Accept Number',
    cardId: 'Card ID',
    formId: 'Insurance Form ID',
    payingNow: 'Paying Now',
    remainingLabel: 'Remaining',
    selectCurrency: 'Currency',
  };

  const [paymentType, setPaymentType] = useState('CASH');
  const [originalAmount, setOriginalAmount] = useState(remaining > 0 ? remaining : (visit.amount || 0));
  const [cashAmount, setCashAmount] = useState('');
  const [posAmount, setPosAmount] = useState('');
  const [terminalId, setTerminalId] = useState('');
  const [posNo, setPosNo] = useState('');
  const [cardType, setCardType] = useState('');
  const [approvalCode, setApprovalCode] = useState('');
  const [insuranceProvider, setInsuranceProvider] = useState('');
  const [insuranceClass, setInsuranceClass] = useState('');
  const [insuranceType, setInsuranceType] = useState('BENEFICIARY');
  const [coveragePercent, setCoveragePercent] = useState(0);
  const [insuranceAcceptNo, setInsuranceAcceptNo] = useState('');
  const [cardId, setCardId] = useState('');
  const [formId, setFormId] = useState('');
  const [currency, setCurrency] = useState('JOD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const currencies = ['JOD', 'USD', 'EUR', 'KES', 'UGX', 'SAR', 'KWD', 'AED', 'BHD', 'OMR', 'QAR', 'LYD', 'EGP'];
  const cardTypes = ['Credit', 'Debit', 'Prepaid', 'Gift'];

  // Update originalAmount when remaining changes
  useEffect(() => {
    if (remaining > 0) {
      setOriginalAmount(remaining);
    } else if (visit.amount > 0) {
      setOriginalAmount(visit.amount);
    }
  }, [remaining, visit.amount]);

  // Calculate paying now and remaining
  const payingNow = (parseFloat(cashAmount) || 0) + (parseFloat(posAmount) || 0);
  const remainingAfterPayment = Math.max(0, originalAmount - payingNow);

  // Check if total payment exceeds original amount
  const isTotalExceedingOriginal = payingNow > originalAmount;

  // Load insurance data when payment type is INSURANCE
  useEffect(() => {
    if (paymentType === 'INSURANCE' && visit.patientId) {
      fetch(`${BASE_URL}/api/patients/search/id/${visit.patientId}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load patient data');
          return res.json();
        })
        .then(data => {
          if (data.insuranceProvider) {
            setInsuranceProvider(data.insuranceProvider);
          }
          if (data.classA) setInsuranceClass('A');
          else if (data.classB) setInsuranceClass('B');
          else if (data.classC) setInsuranceClass('C');
        })
        .catch(err => {
          //console.error('Failed to load insurance data:', err);
        });
    }
  }, [paymentType, visit.patientId]);

  const handlePay = async () => {
    setError('');

    // Convert string values to numbers
    const cashValue = parseFloat(cashAmount) || 0;
    const posValue = parseFloat(posAmount) || 0;
    const totalPayment = cashValue + posValue;

    // Validation - make sure there's an amount to pay
    if (paymentType !== 'FREE' && paymentType !== 'INSURANCE' && totalPayment <= 0) {
      setError('Please enter a payment amount');
      return;
    }

    // Make sure originalAmount is greater than 0
    if (originalAmount <= 0) {
      setError('Original amount must be greater than 0');
      return;
    }

    // Check if total payment exceeds original amount
    if (totalPayment > originalAmount) {
      setError(`Total payment (${totalPayment.toFixed(2)}) cannot exceed original amount (${originalAmount.toFixed(2)})`);
      return;
    }

    // Only validate POS fields if POS amount is greater than 0
    if ((paymentType === 'POS' || paymentType === 'CASH + POS') && posValue > 0) {
      if (!terminalId || !posNo || !cardType || !approvalCode) {
        setError('All POS fields are required for POS payment');
        return;
      }
    }

    if (paymentType === 'INSURANCE') {
      const hasCardId = cardId.trim() !== '';
      const hasFormId = formId.trim() !== '';
      
      if (!hasCardId && !hasFormId) {
        setError('Enter Card ID or Form ID');
        return;
      }
      if (hasCardId && hasFormId) {
        setError('Enter only Card ID OR Form ID');
        return;
      }
      if (!insuranceAcceptNo.trim()) {
        setError('Insurance Accept Number is required');
        return;
      }
      if (!insuranceProvider.trim() || !insuranceClass) {
        setError('Provider and Class are required');
        return;
      }
    }

    setLoading(true);

    try {
      // Build payments array based on payment type
      const payments = [];

      // CASH payment
      if (cashValue > 0) {
        payments.push({
          paymentMethod: 'CASH',
          cashAmount: cashValue
        });
      }

      // POS payment
      if (posValue > 0) {
        payments.push({
          paymentMethod: 'POS',
          cashAmount: posValue,
          terminalId: terminalId || '',
          posPaymentNo: posNo || '',
          cardType: cardType || '',
          approvalCode: approvalCode || ''
        });
      }

      // INSURANCE payment (if selected)
      if (paymentType === 'INSURANCE') {
        const insuranceAmount = originalAmount - (cashValue || 0);
        const insurancePayment = {
          paymentMethod: 'INSURANCE',
          originalAmount: originalAmount,
          cashAmount: cashValue || 0,
          insuranceAmount: insuranceAmount,
          insuranceProvider: insuranceProvider || '',
          insuranceClass: insuranceClass || '',
          insuranceType: insuranceType || 'BENEFICIARY',
          coveragePercent: coveragePercent || 0,
          insuranceAcceptNumber: insuranceAcceptNo || ''
        };
        
        if (cardId.trim()) {
          insurancePayment.cardId = cardId.trim();
        }
        if (formId.trim()) {
          insurancePayment.insuranceFormId = formId.trim();
        }
        
        payments.push(insurancePayment);
      }

      // FREE payment
      if (paymentType === 'FREE') {
        payments.push({
          paymentMethod: 'FREE',
          cashAmount: 0
        });
      }

      // Build the final payload
      const payload = {
        originalAmount: originalAmount,
        currency: currency || 'JOD',
        payments: payments
      };

      console.log('📤 Sending payment payload:', JSON.stringify(payload, null, 2));

      const res = await fetch(`${BASE_URL}/api/visits/payments/${visit.id}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      // Handle error response
      if (!res.ok) {
        let errorText = '';
        try {
          const errorData = await res.json();
          errorText = errorData.message || errorData.error || JSON.stringify(errorData);
        } catch (e) {
          try {
            errorText = await res.text();
          } catch (textErr) {
            errorText = `HTTP ${res.status}: ${res.statusText}`;
          }
        }
        console.error('❌ Payment error response:', errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      // Check if there's content to parse
      const contentType = res.headers.get('content-type');
      let result;
      
      if (contentType && contentType.includes('application/json')) {
        const text = await res.text();
        if (text && text.trim() !== '') {
          try {
            result = JSON.parse(text);
            console.log('✅ Payment successful:', result);
          } catch (parseErr) {
            console.warn('⚠️ Response was not valid JSON:', text);
            result = { message: 'Payment processed successfully', raw: text };
          }
        } else {
          console.log('✅ Payment successful (empty response)');
          result = { message: 'Payment processed successfully' };
        }
      } else {
        const text = await res.text();
        console.log('✅ Payment successful (non-JSON response):', text);
        result = { message: text || 'Payment processed successfully' };
      }

      // Log the action
      try {
        await fetch(`${BASE_URL}/api/logs/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: loggedUser,
            action: 'PAYMENT',
            details: `Payment of ${totalPayment} for visit ${visit.id}`,
          }),
        });
      } catch (logErr) { /* ignore */ }

      if (onPaymentComplete) {
        onPaymentComplete(totalPayment);
      }
      onClose();
    } catch (err) {
      console.error('❌ Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Determine if fields should be visible
  const showCashField = paymentType === 'CASH' || paymentType === 'CASH + POS' || paymentType === 'INSURANCE';
  const showPosField = paymentType === 'POS' || paymentType === 'CASH + POS';
  const showPosDetails = (paymentType === 'POS' || paymentType === 'CASH + POS') && parseFloat(posAmount) > 0;
  const showInsuranceFields = paymentType === 'INSURANCE';
  const showFreeMessage = paymentType === 'FREE';

  // Helper to handle number input changes
  const handleNumberChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <>
      <style>{`
        .visit-pay-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
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

        .visit-pay-modal {
          background: white;
          border-radius: 12px;
          padding: 24px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          animation: slideUp 0.3s ease;
        }

        .visit-pay-title {
          margin: 0 0 15px 0;
          font-size: 20px;
          color: #2d3748;
        }

        .visit-pay-info {
          margin-bottom: 15px;
        }

        .visit-pay-info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 14px;
          color: #4a5568;
        }

        .visit-pay-info-row .value-bold {
          font-weight: bold;
        }

        .visit-pay-info-row .value-green {
          color: #48bb78;
        }

        .visit-pay-info-row .value-red {
          color: #e53e3e;
        }

        .visit-pay-divider {
          margin: 10px 0;
          border: none;
          border-top: 1px solid #e2e8f0;
        }

        .visit-pay-form-group {
          margin-bottom: 15px;
        }

        .visit-pay-form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 14px;
          color: #2d3748;
        }

        .visit-pay-input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 14px;
          box-sizing: border-box;
          min-height: 38px;
          background: white;
          transition: border-color 0.2s;
        }

        .visit-pay-input:focus {
          outline: none;
          border-color: #4299e1;
        }

        .visit-pay-input-range {
          width: 100%;
        }

        .visit-pay-hint {
          font-size: 12px;
          color: #718096;
          margin-top: 4px;
          font-style: italic;
        }

        .visit-pay-free-message {
          padding: 15px;
          background: #fefcbf;
          border-radius: 8px;
          margin-bottom: 10px;
          text-align: center;
          font-weight: bold;
          color: #744210;
        }

        .visit-pay-summary {
          margin-top: 15px;
          padding: 10px;
          background: #f7fafc;
          border-radius: 8px;
        }

        .visit-pay-summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .visit-pay-summary-row .paying-now {
          font-weight: bold;
          color: #2b6cb0;
        }

        .visit-pay-summary-row .remaining-zero {
          font-weight: bold;
          color: #48bb78;
        }

        .visit-pay-summary-row .remaining-positive {
          font-weight: bold;
          color: #e53e3e;
        }

        .visit-pay-error {
          color: #fc8181;
          font-size: 14px;
          margin-top: 10px;
        }

        .visit-pay-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 15px;
        }

        .visit-pay-btn {
          padding: 8px 20px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 38px;
        }

        .visit-pay-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .visit-pay-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .visit-pay-btn-cancel {
          background: #e2e8f0;
          color: #4a5568;
        }

        .visit-pay-btn-cancel:hover:not(:disabled) {
          background: #cbd5e0;
        }

        .visit-pay-btn-pay {
          background: #48bb78;
          color: white;
          font-weight: bold;
        }

        .visit-pay-btn-pay:hover:not(:disabled) {
          background: #38a169;
        }

        .visit-pay-amount-input-group {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .visit-pay-amount-input-group .flex-2 {
          flex: 2;
          min-width: 150px;
        }

        .visit-pay-amount-input-group .flex-1 {
          flex: 1;
          min-width: 100px;
        }

        .visit-pay-exceed-error {
          color: #e53e3e;
          font-size: 13px;
          margin-top: 5px;
          font-weight: bold;
        }

        .visit-pay-valid-message {
          color: #48bb78;
          font-size: 13px;
          margin-top: 5px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .visit-pay-modal {
            padding: 20px;
            max-width: 95%;
          }

          .visit-pay-title {
            font-size: 18px;
          }

          .visit-pay-info-row {
            font-size: 13px;
          }

          .visit-pay-input {
            font-size: 15px;
            min-height: 36px;
          }

          .visit-pay-btn {
            font-size: 13px;
            padding: 6px 16px;
            min-height: 34px;
          }

          .visit-pay-amount-input-group {
            flex-direction: column;
          }

          .visit-pay-amount-input-group .flex-2,
          .visit-pay-amount-input-group .flex-1 {
            min-width: unset;
            width: 100%;
          }

          .visit-pay-actions {
            flex-direction: column;
          }

          .visit-pay-actions button {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .visit-pay-modal {
            padding: 16px;
          }

          .visit-pay-title {
            font-size: 16px;
          }

          .visit-pay-info-row {
            font-size: 12px;
          }

          .visit-pay-form-group label {
            font-size: 13px;
          }

          .visit-pay-input {
            font-size: 15px;
            min-height: 34px;
            padding: 6px 10px;
          }

          .visit-pay-btn {
            font-size: 12px;
            padding: 5px 12px;
            min-height: 32px;
          }

          .visit-pay-free-message {
            font-size: 13px;
            padding: 12px;
          }

          .visit-pay-summary-row {
            font-size: 13px;
          }

          .visit-pay-error {
            font-size: 13px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .visit-pay-modal {
            max-width: 80%;
          }
        }

        @media (prefers-color-scheme: dark) {
          .visit-pay-overlay {
            background: rgba(0, 0, 0, 0.7);
          }

          .visit-pay-modal {
            background: #1a1a2e;
          }

          .visit-pay-title {
            color: #ecf0f1;
          }

          .visit-pay-info-row {
            color: #b0b0b0;
          }

          .visit-pay-divider {
            border-top-color: #3d3d5c;
          }

          .visit-pay-form-group label {
            color: #b0b0b0;
          }

          .visit-pay-input {
            background: #2d2d44;
            border-color: #3d3d5c;
            color: #ecf0f1;
          }

          .visit-pay-input:focus {
            border-color: #4299e1;
          }

          .visit-pay-input::placeholder {
            color: #666;
          }

          .visit-pay-hint {
            color: #888;
          }

          .visit-pay-free-message {
            background: #2d2a1a;
            color: #f6e05e;
          }

          .visit-pay-summary {
            background: #2d2d44;
          }

          .visit-pay-summary-row {
            color: #b0b0b0;
          }

          .visit-pay-summary-row .paying-now {
            color: #63b3ed;
          }

          .visit-pay-summary-row .remaining-zero {
            color: #4CAF50;
          }

          .visit-pay-summary-row .remaining-positive {
            color: #fc8181;
          }

          .visit-pay-error {
            color: #fc8181;
          }

          .visit-pay-btn-cancel {
            background: #2d2d44;
            color: #b0b0b0;
          }

          .visit-pay-btn-cancel:hover:not(:disabled) {
            background: #3d3d5c;
          }

          .visit-pay-btn-pay {
            background: #2f855a;
          }

          .visit-pay-btn-pay:hover:not(:disabled) {
            background: #38a169;
          }

          .visit-pay-info-row .value-bold {
            color: #ecf0f1;
          }

          .visit-pay-info-row .value-green {
            color: #4CAF50;
          }

          .visit-pay-info-row .value-red {
            color: #fc8181;
          }
        }
      `}</style>

      <div className="visit-pay-overlay" onClick={onClose}>
        <div className="visit-pay-modal" onClick={(e) => e.stopPropagation()}>
          <h3 className="visit-pay-title">💰 {t.title}</h3>
          
          <div className="visit-pay-info">
            <div className="visit-pay-info-row">
              <span>Visit #{visit.id}</span>
              <span>Patient: {visit.patientName}</span>
            </div>
            <div className="visit-pay-info-row">
              <span>Total Amount:</span>
              <span className="value-bold">{visit.amount.toFixed(2)}</span>
            </div>
            <div className="visit-pay-info-row">
              <span>Paid:</span>
              <span className="value-bold value-green">{visit.totalPaid.toFixed(2)}</span>
            </div>
            <div className="visit-pay-info-row">
              <span>Remaining:</span>
              <span className="value-bold value-red">{remaining.toFixed(2)}</span>
            </div>
          </div>

          <hr className="visit-pay-divider" />

          <div className="visit-pay-form-group">
            <div className="visit-pay-amount-input-group">
              <div className="flex-2">
                <label>{t.original}</label>
                <input
                  type="number"
                  className="visit-pay-input"
                  value={originalAmount}
                  onChange={(e) => setOriginalAmount(parseFloat(e.target.value) || 0)}
                  placeholder="Enter amount"
                  min="0"
                />
                {remaining > 0 && (
                  <div className="visit-pay-hint">
                    💡 Auto-filled with remaining amount ({remaining.toFixed(2)})
                  </div>
                )}
              </div>
              <div className="flex-1">
                <label>{t.selectCurrency}</label>
                <select
                  className="visit-pay-input"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="visit-pay-form-group">
            <label>{t.paymentType}</label>
            <select
              className="visit-pay-input"
              value={paymentType}
              onChange={(e) => {
                setPaymentType(e.target.value);
                if (e.target.value === 'FREE') {
                  setCashAmount('');
                  setPosAmount('');
                  setTerminalId('');
                  setPosNo('');
                  setCardType('');
                  setApprovalCode('');
                }
              }}
            >
              <option value="CASH">CASH</option>
              <option value="POS">POS</option>
              <option value="CASH + POS">CASH + POS</option>
              <option value="INSURANCE">INSURANCE</option>
              <option value="FREE">FREE</option>
            </select>
          </div>

          {showFreeMessage && (
            <div className="visit-pay-free-message">
              🎉 FREE Payment - No amount will be charged
            </div>
          )}

          {showCashField && (
            <div className="visit-pay-form-group">
              <label>{t.cash}</label>
              <input
                type="text"
                className="visit-pay-input"
                value={cashAmount}
                onChange={handleNumberChange(setCashAmount)}
                placeholder="Enter amount"
              />
            </div>
          )}

          {showPosField && (
            <div className="visit-pay-form-group">
              <label>{t.pos}</label>
              <input
                type="text"
                className="visit-pay-input"
                value={posAmount}
                onChange={handleNumberChange(setPosAmount)}
                placeholder="Enter amount"
              />
            </div>
          )}

          {showPosDetails && (
            <>
              <div className="visit-pay-form-group">
                <label>{t.terminalId}</label>
                <input
                  type="text"
                  className="visit-pay-input"
                  value={terminalId}
                  onChange={(e) => setTerminalId(e.target.value)}
                  placeholder="Enter terminal ID"
                />
              </div>
              <div className="visit-pay-form-group">
                <label>{t.posNo}</label>
                <input
                  type="text"
                  className="visit-pay-input"
                  value={posNo}
                  onChange={(e) => setPosNo(e.target.value)}
                  placeholder="Enter POS number"
                />
              </div>
              <div className="visit-pay-form-group">
                <label>{t.cardType}</label>
                <select
                  className="visit-pay-input"
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                >
                  <option value="">Select Card Type</option>
                  {cardTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="visit-pay-form-group">
                <label>{t.approvalCode}</label>
                <input
                  type="text"
                  className="visit-pay-input"
                  value={approvalCode}
                  onChange={(e) => setApprovalCode(e.target.value)}
                  placeholder="Enter approval code"
                />
              </div>
            </>
          )}

          {showInsuranceFields && (
            <>
              <div className="visit-pay-form-group">
                <label>{t.insuranceProvider}</label>
                <input
                  type="text"
                  className="visit-pay-input"
                  value={insuranceProvider}
                  onChange={(e) => setInsuranceProvider(e.target.value)}
                  placeholder="Enter insurance provider"
                />
              </div>
              <div className="visit-pay-form-group">
                <label>{t.insuranceClass}</label>
                <select
                  className="visit-pay-input"
                  value={insuranceClass}
                  onChange={(e) => setInsuranceClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="visit-pay-form-group">
                <label>{t.insuranceType}</label>
                <select
                  className="visit-pay-input"
                  value={insuranceType}
                  onChange={(e) => setInsuranceType(e.target.value)}
                >
                  <option value="BENEFICIARY">BENEFICIARY</option>
                  <option value="SUBSCRIBER">SUBSCRIBER</option>
                </select>
              </div>
              <div className="visit-pay-form-group">
                <label>{t.coverage} ({coveragePercent}%)</label>
                <input
                  type="range"
                  className="visit-pay-input-range"
                  min="0"
                  max="100"
                  value={coveragePercent}
                  onChange={(e) => setCoveragePercent(parseInt(e.target.value))}
                />
              </div>
              <div className="visit-pay-form-group">
                <label>{t.acceptNo}</label>
                <input
                  type="text"
                  className="visit-pay-input"
                  value={insuranceAcceptNo}
                  onChange={(e) => setInsuranceAcceptNo(e.target.value)}
                  placeholder="Enter insurance accept number"
                />
              </div>
              <div className="visit-pay-form-group">
                <label>{t.cardId}</label>
                <input
                  type="text"
                  className="visit-pay-input"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                  placeholder="Enter Card ID OR Form ID"
                />
              </div>
              <div className="visit-pay-form-group">
                <label>{t.formId}</label>
                <input
                  type="text"
                  className="visit-pay-input"
                  value={formId}
                  onChange={(e) => setFormId(e.target.value)}
                  placeholder="Enter Form ID OR Card ID"
                />
              </div>
            </>
          )}

          <div className="visit-pay-summary">
            <div className="visit-pay-summary-row">
              <span>{t.payingNow}:</span>
              <span className="paying-now">
                {paymentType === 'FREE' ? '0.00' : payingNow.toFixed(2)}
              </span>
            </div>
            <div className="visit-pay-summary-row">
              <span>{t.remainingLabel}:</span>
              <span className={remainingAfterPayment === 0 ? 'remaining-zero' : 'remaining-positive'}>
                {paymentType === 'FREE' ? originalAmount.toFixed(2) : remainingAfterPayment.toFixed(2)}
              </span>
            </div>
          </div>

          {isTotalExceedingOriginal && (
            <div className="visit-pay-exceed-error">
              ⚠️ Total payment ({payingNow.toFixed(2)}) exceeds original amount ({originalAmount.toFixed(2)})
            </div>
          )}

          {!isTotalExceedingOriginal && payingNow > 0 && payingNow < originalAmount && (
            <div className="visit-pay-valid-message">
              ✅ Partial payment of {payingNow.toFixed(2)} - Remaining: {remainingAfterPayment.toFixed(2)}
            </div>
          )}

          {!isTotalExceedingOriginal && payingNow > 0 && payingNow === originalAmount && (
            <div className="visit-pay-valid-message">
              ✅ Full payment of {payingNow.toFixed(2)} - Visit will be fully paid
            </div>
          )}

          {error && <div className="visit-pay-error">{error}</div>}

          <div className="visit-pay-actions">
            <button
              className="visit-pay-btn visit-pay-btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              {t.cancel}
            </button>
            <button
              className="visit-pay-btn visit-pay-btn-pay"
              onClick={handlePay}
              disabled={loading || originalAmount <= 0 || isTotalExceedingOriginal || payingNow <= 0}
            >
              {loading ? '⏳ Processing...' : '💰 Pay'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitPayScreen;