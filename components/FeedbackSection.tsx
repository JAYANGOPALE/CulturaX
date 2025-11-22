
import React, { useState } from 'react';
import { Send, Star, MessageSquare, CheckCircle2 } from 'lucide-react';
import { translations, LanguageCode } from '../translations';

interface FeedbackSectionProps {
  currentLanguage: LanguageCode;
  isDarkMode: boolean;
}

export const FeedbackSection: React.FC<FeedbackSectionProps> = ({ currentLanguage, isDarkMode }) => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovering, setIsHovering] = useState(0);
  
  const t = translations[currentLanguage] || translations['en'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      // Reset after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setRating(0);
        setFeedbackText('');
      }, 3000);
    }, 1000);
  };

  return (
    <section id="feedback" className="relative z-10 py-20 border-t border-heritage-brown/10 dark:border-tech-purple/20 bg-heritage-paper dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-10">
           <h2 className="text-4xl font-heritage-title font-black text-heritage-brown dark:text-white mb-4 uppercase tracking-wider">{t.feedback.title}</h2>
           <p className="text-heritage-brown/70 dark:text-gray-400">{t.feedback.subtitle}</p>
        </div>

        <div className="bg-white/50 dark:bg-black/40 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-heritage-brown/10 dark:border-tech-purple/30 relative overflow-hidden">
          {isSubmitted ? (
             <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-6">
                   <CheckCircle2 size={48} />
                </div>
                <h3 className="text-2xl font-bold text-heritage-brown dark:text-white mb-2">{t.feedback.success}</h3>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Rating */}
               <div className="flex flex-col items-center gap-2">
                  <label className="text-sm font-bold text-heritage-accent dark:text-ar-gold uppercase tracking-widest">{t.feedback.ratingLabel}</label>
                  <div className="flex gap-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setIsHovering(star)}
                          onMouseLeave={() => setIsHovering(0)}
                          className="p-1 transition-transform hover:scale-125"
                        >
                           <Star 
                             size={32} 
                             className={`${(isHovering || rating) >= star ? 'fill-heritage-accent dark:fill-ar-gold text-heritage-accent dark:text-ar-gold' : 'text-gray-300 dark:text-gray-700'} transition-colors`} 
                           />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Text Area */}
               <div className="relative">
                  <div className="absolute top-4 left-4 text-heritage-brown/30 dark:text-gray-600 pointer-events-none">
                     <MessageSquare size={20} />
                  </div>
                  <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder={t.feedback.placeholder}
                    required
                    className="w-full min-h-[150px] pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-black/60 border border-heritage-brown/10 dark:border-white/10 focus:border-heritage-accent dark:focus:border-tech-purple outline-none transition-colors resize-none text-heritage-brown dark:text-white placeholder:text-heritage-brown/40 dark:placeholder:text-gray-600"
                  />
               </div>

               <button 
                  type="submit"
                  disabled={!feedbackText.trim()}
                  className="w-full py-4 bg-heritage-brown dark:bg-tech-purple text-white dark:text-black font-bold rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  <Send size={20} />
                  {t.feedback.submit}
               </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
