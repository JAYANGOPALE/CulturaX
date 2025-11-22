
import React, { useState, useEffect } from 'react';
import { X, Send, ShieldCheck, CheckCircle, Loader2, Lock } from 'lucide-react';
import { translations, LanguageCode } from '../translations';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  productName?: string;
}

type Step = 'details' | 'processing' | 'success';

export const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, language, productName }) => {
  const [step, setStep] = useState<Step>('details');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const t = translations[language] || translations['en'];

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setFormData({ name: '', email: '', phone: '' });
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate request processing delay
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-heritage-paper dark:bg-gray-900 border border-heritage-brown/20 dark:border-tech-purple/30 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-heritage-brown/5 dark:bg-black/50 p-4 flex justify-between items-center border-b border-heritage-brown/10 dark:border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-heritage-accent dark:text-ar-gold" size={24} />
            <div className="flex flex-col">
                <h3 className="font-bold text-heritage-brown dark:text-white font-heritage-title leading-tight">{t.purchase.title}</h3>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-heritage-brown/60 dark:text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right-4">
              {productName && (
                 <div className="bg-heritage-accent/10 dark:bg-tech-purple/10 border border-heritage-accent/20 dark:border-tech-purple/20 p-3 rounded-lg text-center mb-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-heritage-brown/70 dark:text-gray-400">Requesting for</p>
                    <p className="font-bold text-heritage-brown dark:text-white text-lg">{productName}</p>
                 </div>
              )}

              <div>
                <label className="block text-xs font-bold text-heritage-brown/70 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {t.purchase.nameLabel}
                </label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white dark:bg-black/50 border border-heritage-brown/20 dark:border-white/20 text-heritage-brown dark:text-white focus:border-heritage-accent dark:focus:border-tech-purple outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-heritage-brown/70 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {t.purchase.emailLabel}
                </label>
                <input 
                  type="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white dark:bg-black/50 border border-heritage-brown/20 dark:border-white/20 text-heritage-brown dark:text-white focus:border-heritage-accent dark:focus:border-tech-purple outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-heritage-brown/70 dark:text-gray-400 uppercase tracking-wider mb-1">
                  {t.purchase.phoneLabel}
                </label>
                <input 
                  type="tel" 
                  name="phone" 
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-white dark:bg-black/50 border border-heritage-brown/20 dark:border-white/20 text-heritage-brown dark:text-white focus:border-heritage-accent dark:focus:border-tech-purple outline-none transition-colors"
                />
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-4 bg-heritage-accent dark:bg-ar-gold text-white dark:text-black font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  {t.purchase.payBtn}
                </button>
                <p className="text-center text-xs text-heritage-brown/50 dark:text-gray-500 mt-3 flex items-center justify-center gap-1">
                  <Lock size={12} /> {t.purchase.secureBadge}
                </p>
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-heritage-accent/20 dark:bg-tech-purple/20 blur-xl rounded-full"></div>
                <Loader2 size={64} className="text-heritage-accent dark:text-tech-purple animate-spin relative z-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-heritage-brown dark:text-white mb-2">{t.purchase.processing}</h4>
                <p className="text-sm text-heritage-brown/60 dark:text-gray-400">Please do not close this window.</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-2">
                <CheckCircle size={40} />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-heritage-brown dark:text-white mb-2">{t.purchase.successTitle}</h4>
                <p className="text-heritage-brown/70 dark:text-gray-400 px-4 text-sm">
                  {t.purchase.successDesc}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-full py-4 bg-heritage-brown dark:bg-tech-purple text-white dark:text-black font-bold rounded-xl shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                <X size={20} />
                {t.purchase.downloadBtn}
              </button>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 bg-black/5 dark:bg-white/5 w-full">
          <div 
            className="h-full bg-heritage-accent dark:bg-tech-purple transition-all duration-500"
            style={{ width: step === 'details' ? '33%' : step === 'processing' ? '66%' : '100%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};
