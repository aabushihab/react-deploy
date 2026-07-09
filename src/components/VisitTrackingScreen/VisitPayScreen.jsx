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
    approval: 'Approval Code',
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

  // Update originalAmount when remaining changes
  useEffect(() => {
    if (remaining > 0) {
      setOriginalAmount(remaining);
    }
  }, [remaining]);

  // Calculate paying now and remaining
  const payingNow = (parseFloat(cashAmount) || 0) + (parseFloat(posAmount) || 0);
  const remainingAfterPayment = Math.max(0, originalAmount - payingNow);

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

    // Validation
    if (paymentType !== 'FREE' && paymentType !== 'INSURANCE' && totalPayment <= 0) {
      setError('Please enter a payment amount');
      return;
    }

    if (paymentType === 'POS' || paymentType === 'CASH + POS') {
      if (posValue > 0 && (!terminalId || !posNo || !cardType || !approvalCode)) {
        setError('All POS fields are required');
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
      // Build request body matching Java backend format
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
        const posPayment = {
          paymentMethod: 'POS',
          cashAmount: posValue,
          terminalId: terminalId,
          posPaymentNo: posNo,
          cardType: cardType,
          approvalCode: approvalCode
        };
        payments.push(posPayment);
      }

      // INSURANCE payment
      if (paymentType === 'INSURANCE') {
        const insurancePayment = {
          paymentMethod: 'INSURANCE',
          originalAmount: originalAmount,
          cashAmount: cashValue,
          insuranceAmount: originalAmount - cashValue,
          insuranceProvider: insuranceProvider,
          insuranceClass: insuranceClass,
          insuranceType: insuranceType,
          coveragePercent: coveragePercent,
          insuranceAcceptNumber: insuranceAcceptNo
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

      // Build the final payload - matches Java backend
      const payload = {
        originalAmount: originalAmount,
        currency: currency,
        payments: payments
      };

      //console.log('📤 Sending payment payload:', JSON.stringify(payload, null, 2));

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
            //console.log('✅ Payment successful:', result);
          } catch (parseErr) {
            //console.warn('⚠️ Response was not valid JSON:', text);
            result = { message: 'Payment processed successfully', raw: text };
          }
        } else {
          //console.log('✅ Payment successful (empty response)');
          result = { message: 'Payment processed successfully' };
        }
      } else {
        const text = await res.text();
        //console.log('✅ Payment successful (non-JSON response):', text);
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
      //console.error('❌ Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Determine if fields should be visible
  const showCashField = paymentType === 'CASH' || paymentType === 'CASH + POS' || paymentType === 'INSURANCE';
  const showPosField = paymentType === 'POS' || paymentType === 'CASH + POS';
  const showPosDetails = paymentType === 'POS' || paymentType === 'CASH + POS';
  const showInsuranceFields = paymentType === 'INSURANCE';
  const showFreeMessage = paymentType === 'FREE';

  // Helper to handle number input changes
  const handleNumberChange = (setter) => (e) => {
    const value = e.target.value;
    // Allow empty string, numbers, and decimal points
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h3 style={{ margin: '0 0 15px 0' }}>💰 Payment</h3>
        
        <div style={{ marginBottom: 15 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Visit #{visit.id}</span>
            <span>Patient: {visit.patientName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Total Amount:</span>
            <span style={{ fontWeight: 'bold' }}>{visit.amount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Paid:</span>
            <span style={{ fontWeight: 'bold', color: '#48bb78' }}>{visit.totalPaid.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Remaining:</span>
            <span style={{ fontWeight: 'bold', color: '#e53e3e' }}>{remaining.toFixed(2)}</span>
          </div>
        </div>

        <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />

        <div style={{ marginBottom: 15 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.original}</label>
              <input
                type="number"
                value={originalAmount}
                onChange={(e) => setOriginalAmount(parseFloat(e.target.value) || 0)}
                style={inputStyle}
                placeholder="Enter amount"
              />
              {remaining > 0 && (
                <div style={{ 
                  fontSize: 12, 
                  color: '#718096', 
                  marginTop: 4,
                  fontStyle: 'italic'
                }}>
                  💡 Auto-filled with remaining amount ({remaining.toFixed(2)})
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.selectCurrency}</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={inputStyle}
              >
                {currencies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.paymentType}</label>
            <select
              value={paymentType}
              onChange={(e) => {
                setPaymentType(e.target.value);
                if (e.target.value === 'FREE') {
                  setCashAmount('');
                  setPosAmount('');
                }
              }}
              style={inputStyle}
            >
              <option value="CASH">CASH</option>
              <option value="POS">POS</option>
              <option value="CASH + POS">CASH + POS</option>
              <option value="INSURANCE">INSURANCE</option>
              <option value="FREE">FREE</option>
            </select>
          </div>

          {/* FREE Payment Message */}
          {showFreeMessage && (
            <div style={{ 
              padding: '15px', 
              background: '#fefcbf', 
              borderRadius: 8, 
              marginBottom: 10,
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#744210'
            }}>
              🎉 FREE Payment - No amount will be charged
            </div>
          )}

          {/* Cash Amount - Only show for CASH, CASH+POS, and INSURANCE */}
          {showCashField && (
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cash}</label>
              <input
                type="text"
                value={cashAmount}
                onChange={handleNumberChange(setCashAmount)}
                placeholder="Enter amount"
                style={inputStyle}
              />
            </div>
          )}

          {/* POS Amount - Only show for POS and CASH+POS */}
          {showPosField && (
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.pos}</label>
              <input
                type="text"
                value={posAmount}
                onChange={handleNumberChange(setPosAmount)}
                placeholder="Enter amount"
                style={inputStyle}
              />
            </div>
          )}

          {/* POS Details - Only show for POS and CASH+POS */}
          {showPosDetails && (
            <>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.terminalId}</label>
                <input
                  type="text"
                  value={terminalId}
                  onChange={(e) => setTerminalId(e.target.value)}
                  placeholder="Enter terminal ID"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.posNo}</label>
                <input
                  type="text"
                  value={posNo}
                  onChange={(e) => setPosNo(e.target.value)}
                  placeholder="Enter POS number"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardType}</label>
                <input
                  type="text"
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  placeholder="Enter card type"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.approval}</label>
                <input
                  type="text"
                  value={approvalCode}
                  onChange={(e) => setApprovalCode(e.target.value)}
                  placeholder="Enter approval code"
                  style={inputStyle}
                />
              </div>
            </>
          )}

          {/* Insurance Fields - Only show for INSURANCE */}
          {showInsuranceFields && (
            <>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceProvider}</label>
                <input
                  type="text"
                  value={insuranceProvider}
                  onChange={(e) => setInsuranceProvider(e.target.value)}
                  placeholder="Enter insurance provider"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceClass}</label>
                <select
                  value={insuranceClass}
                  onChange={(e) => setInsuranceClass(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select Class</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.insuranceType}</label>
                <select
                  value={insuranceType}
                  onChange={(e) => setInsuranceType(e.target.value)}
                  style={inputStyle}
                >
                  <option value="BENEFICIARY">BENEFICIARY</option>
                  <option value="SUBSCRIBER">SUBSCRIBER</option>
                </select>
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.coverage} ({coveragePercent}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={coveragePercent}
                  onChange={(e) => setCoveragePercent(parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.acceptNo}</label>
                <input
                  type="text"
                  value={insuranceAcceptNo}
                  onChange={(e) => setInsuranceAcceptNo(e.target.value)}
                  placeholder="Enter insurance accept number"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.cardId}</label>
                <input
                  type="text"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                  placeholder="Enter Card ID OR Form ID"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: 5 }}>{t.formId}</label>
                <input
                  type="text"
                  value={formId}
                  onChange={(e) => setFormId(e.target.value)}
                  placeholder="Enter Form ID OR Card ID"
                  style={inputStyle}
                />
              </div>
            </>
          )}

          {/* Summary - Always show */}
          <div style={{ marginTop: 15, padding: '10px', background: '#f7fafc', borderRadius: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span>{t.payingNow}:</span>
              <span style={{ fontWeight: 'bold', color: '#2b6cb0' }}>
                {paymentType === 'FREE' ? '0.00' : payingNow.toFixed(2)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t.remainingLabel}:</span>
              <span style={{ fontWeight: 'bold', color: remainingAfterPayment === 0 ? '#48bb78' : '#e53e3e' }}>
                {paymentType === 'FREE' ? originalAmount.toFixed(2) : remainingAfterPayment.toFixed(2)}
              </span>
            </div>
          </div>

          {error && <div style={{ color: '#fc8181', fontSize: 14, marginTop: 10 }}>{error}</div>}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={cancelButtonStyle}
          >
            {t.cancel}
          </button>
          <button
            onClick={handlePay}
            disabled={loading}
            style={payButtonStyle}
          >
            {loading ? '⏳ Processing...' : '💰 Pay'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles remain the same
const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2000,
};

const modalContent = {
  background: 'white',
  borderRadius: 12,
  padding: 24,
  maxWidth: 500,
  width: '95%',
  maxHeight: '90vh',
  overflowY: 'auto',
  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid #e2e8f0',
  fontSize: 14,
  boxSizing: 'border-box',
};

const cancelButtonStyle = {
  background: '#e2e8f0',
  border: 'none',
  padding: '8px 20px',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 14,
};

const payButtonStyle = {
  background: '#48bb78',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
  padding: '8px 20px',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 14,
};

export default VisitPayScreen;