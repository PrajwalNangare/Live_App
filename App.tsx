
import React, { useState, useEffect } from 'react';
import { COMPANY_DATA, PRODUCTS } from './constants';
import { Product } from './types';
import ProductCard from './components/ProductCard';
import PaymentModal from './components/PaymentModal';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'store' | 'about'>('home');
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const shareApp = async () => {
    const shareData = {
      title: 'Prajwal Nangare Ventures',
      text: `🔥 *₹१ धमाका सेल!* 🔥\nप्रीमियम फॅशन आता फक्त ₹१ मध्ये. लवकर खरेदी करा!\n\nलिंक:`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      showToast("लिंक कॉपी झाली!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white text-[10px] py-1 text-center font-black uppercase tracking-widest fixed top-0 w-full z-[100] shadow-sm">
        Authorized Enterprise App • Secure UPI Active
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-top-4">
          <div className="bg-slate-900 text-white px-8 py-3 rounded-2xl shadow-2xl font-bold text-sm">
            {toast}
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-md py-2 px-4' : 'bg-transparent py-6 px-6'}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3" onClick={() => setActiveTab('home')}>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-200">P</div>
            <div>
              <h1 className={`text-lg font-black tracking-tighter ${scrolled || activeTab !== 'home' ? 'text-slate-900' : 'text-white'}`}>
                Prajwal <span className="text-blue-500">Ventures</span>
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="live-dot"></div>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${scrolled || activeTab !== 'home' ? 'text-slate-400' : 'text-white/60'}`}>Live Now</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={shareApp}
            className={`p-3 rounded-2xl transition-all active:scale-90 ${scrolled || activeTab !== 'home' ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-white border border-white/20'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-t border-slate-100 shadow-[0_-15px_40px_rgba(0,0,0,0.08)] safe-pb">
        <div className="flex justify-around items-center h-20">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1.5 flex-1 transition-all ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-300'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={activeTab === 'home' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[10px] font-black uppercase tracking-wider">Home</span>
          </button>
          <button onClick={() => setActiveTab('store')} className={`flex flex-col items-center gap-1.5 flex-1 transition-all ${activeTab === 'store' ? 'text-blue-600' : 'text-slate-300'}`}>
            <div className="relative">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={activeTab === 'store' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
               <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider">₹1 Store</span>
          </button>
          <button onClick={() => setActiveTab('about')} className={`flex flex-col items-center gap-1.5 flex-1 transition-all ${activeTab === 'about' ? 'text-blue-600' : 'text-slate-300'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={activeTab === 'about' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-[10px] font-black uppercase tracking-wider">Company</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 pb-24">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="bg-slate-950 pt-48 pb-32 px-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full -mr-72 -mt-72 animate-pulse"></div>
               <div className="max-w-5xl mx-auto relative z-10">
                <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[10px] font-black px-4 py-2 rounded-full mb-8 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></span>
                  Official Launch Sale
                </div>
                <h2 className="text-7xl md:text-[9rem] font-black text-white mb-8 tracking-tighter leading-[0.8] animate-in slide-in-from-left-8">
                  FUTURE<br/><span className="text-blue-600 italic">STYLE.</span>
                </h2>
                <p className="text-slate-400 text-lg md:text-2xl mb-12 max-w-xl font-medium leading-relaxed">
                  Prajwal Nangare Ventures कडून तुमच्यासाठी खास भेट. प्रीमियम ब्रँड्स आता फक्त ₹१ मध्ये!
                </p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <button onClick={() => setActiveTab('store')} className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all">₹1 Store उघडा</button>
                  <button onClick={shareApp} className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black backdrop-blur-md flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
                    Link शेअर करा
                  </button>
                </div>
              </div>
            </section>
            
            {/* Stats */}
            <section className="py-12 px-6 -mt-10 max-w-5xl mx-auto relative z-20">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 text-center">
                  <p className="text-2xl font-black text-slate-900">5k+</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Users</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 text-center">
                  <p className="text-2xl font-black text-blue-600">₹1</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Price</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 text-center">
                  <p className="text-2xl font-black text-green-500">100%</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Safe</p>
                </div>
              </div>
            </section>

            {/* Featured Section */}
            <section className="py-20 px-6 max-w-5xl mx-auto">
              <div className="flex items-end justify-between mb-12">
                <h3 className="text-4xl font-black tracking-tighter">Hot Deals</h3>
                <button onClick={() => setActiveTab('store')} className="text-blue-600 font-black text-sm uppercase tracking-widest">See All</button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onBuy={setSelectedProduct} />)}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'store' && (
          <div className="pt-36 pb-12 px-6 max-w-5xl mx-auto animate-in slide-in-from-bottom-8">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-black tracking-tighter text-slate-900 mb-4 leading-none">द ₹१ धमाका</h2>
              <p className="text-slate-400 font-bold">मर्यादित कालावधीसाठी खास ऑफर.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {PRODUCTS.map(p => <ProductCard key={p.id} product={p} onBuy={setSelectedProduct} />)}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="pt-36 pb-20 px-6 max-w-3xl mx-auto animate-in fade-in duration-500">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12">
                <div className="live-dot scale-[1.5]"></div>
              </div>

              <h2 className="text-5xl font-black mb-10 tracking-tighter leading-none">Prajwal Nangare Ventures</h2>
              <p className="text-slate-500 mb-14 text-xl leading-relaxed font-medium italic">"{COMPANY_DATA.description}"</p>
              
              <div className="space-y-6 mb-16">
                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-6 group hover:bg-blue-600 transition-all duration-300">
                  <div className="w-16 h-16 bg-white shadow-lg text-blue-600 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110">📞</div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 group-hover:text-blue-200">Contact Us</p>
                    <p className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-white">{COMPANY_DATA.phone}</p>
                  </div>
                </div>

                <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-6 group hover:bg-blue-600 transition-all duration-300">
                  <div className="w-16 h-16 bg-white shadow-lg text-blue-600 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110">📍</div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 group-hover:text-blue-200">Location</p>
                    <p className="text-2xl font-black text-slate-800 leading-tight tracking-tight group-hover:text-white">{COMPANY_DATA.address}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/10 transition-opacity group-hover:opacity-100 opacity-0"></div>
                <h3 className="text-3xl font-black mb-4 relative z-10">अ‍ॅप शेअर करा!</h3>
                <p className="text-slate-400 mb-10 font-medium relative z-10 text-lg">जर तुम्हाला आमचे अ‍ॅप आवडले असेल, तर मित्र-मैत्रिणींना नक्की सांगा.</p>
                <button onClick={shareApp} className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-lg flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all relative z-10">
                  <span>Share on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedProduct && <PaymentModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      <AIAssistant />
    </div>
  );
};

export default App;
