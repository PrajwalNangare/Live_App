
import React, { useState } from 'react';
import { Product } from '../types';
import { COMPANY_DATA } from '../constants';

interface PaymentModalProps {
  product: Product | null;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  // Exact Payee Name for the UPI Link
  const payeeName = "Prajwal Nangare";
  
  // The UPI URL that apps understand - ensuring 'pn' is exactly the name provided
  const upiUrl = `upi://pay?pa=${COMPANY_DATA.upiId}&pn=${encodeURIComponent(payeeName)}&am=${product.price}&cu=INR&tn=${encodeURIComponent('Payment for ' + product.name)}`;
  
  // Generating a QR code via a free reliable API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;

  const [paymentMode, setPaymentMode] = useState<'qr' | 'app'>(window.innerWidth < 768 ? 'app' : 'qr');

  const handleUPIClick = () => {
    // Attempt to open the UPI app
    window.location.href = upiUrl;
    
    // Feedback to user if nothing happens (usually on desktop or if app choice is needed)
    setTimeout(() => {
      if (document.hasFocus()) {
        console.log("UPI Intent triggered. If no app opened, use QR code.");
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/20">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Complete Payment</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover shadow-sm" />
            <div>
              <h3 className="font-bold text-slate-800 line-clamp-1">{product.name}</h3>
              <p className="text-blue-700 font-black text-xl">₹{product.price.toLocaleString('en-IN')}</p>
            </div>
          </div>

          <div className="mb-6 px-2">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Paying to:</span>
            </div>
            <p className="font-bold text-slate-800 text-lg">{payeeName}</p>
            <p className="text-xs text-slate-400">{COMPANY_DATA.upiId}</p>
          </div>

          {/* Toggle between QR and App Link */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button 
              onClick={() => setPaymentMode('qr')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${paymentMode === 'qr' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Scan QR Code
            </button>
            <button 
              onClick={() => setPaymentMode('app')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${paymentMode === 'app' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Pay via App
            </button>
          </div>

          {paymentMode === 'qr' ? (
            <div className="flex flex-col items-center animate-in fade-in duration-300">
              <div className="bg-white p-3 rounded-2xl border-2 border-slate-50 shadow-inner mb-4">
                <img src={qrCodeUrl} alt="Scan to Pay" className="w-52 h-52" />
              </div>
              <p className="text-center text-sm text-slate-500 font-medium px-4">
                Scan with <span className="text-blue-600 font-bold">Google Pay</span>, <span className="text-sky-500 font-bold">Paytm</span>, or any app.
              </p>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              <button 
                onClick={handleUPIClick}
                className="w-full flex items-center justify-center gap-3 p-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Pay with GPay / Paytm
              </button>
              
              <div className="flex justify-center gap-6 pt-2 grayscale opacity-70">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Google_Pay_%28GPay%29_Logo_%282018-2020%29.svg" className="h-5" alt="GPay" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg" className="h-3 mt-1" alt="Paytm" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" className="h-3 mt-1" alt="UPI" />
              </div>

              <p className="text-center text-xs text-slate-400 px-8">
                Tip: If app doesn't open, use the QR Code tab and scan.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-green-600 font-bold text-[10px] uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Authorized Payment to Prajwal Nangare
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
