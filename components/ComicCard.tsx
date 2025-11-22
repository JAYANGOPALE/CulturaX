
import React, { useState } from 'react';
import { ComicPanelData } from '../types';
import { Download, Share2, Wand2, Check, X, Trash2, Volume2, Maximize2 } from 'lucide-react';
import { translations, LanguageCode } from '../translations';

interface ComicCardProps {
  panel: ComicPanelData;
  currentLanguage: LanguageCode;
  onEdit: (id: string, instruction: string) => Promise<void>;
  onDelete: (id: string) => void;
}

export const ComicCard: React.FC<ComicCardProps> = ({ panel, currentLanguage, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const t = translations[currentLanguage] || translations['en'];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = panel.imageUrl;
    link.download = `culturax-story-${panel.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(panel.caption);
      const langMap: Record<string, string> = {
        'en': 'en-US', 'hi': 'hi-IN', 'mr': 'mr-IN', 'es': 'es-ES', 
        'fr': 'fr-FR', 'bn': 'bn-IN', 'ta': 'ta-IN', 'te': 'te-IN', 'ml': 'ml-IN', 'or': 'or-IN'
      };
      utterance.lang = langMap[panel.language] || 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmitEdit = async () => {
    if (!editPrompt.trim()) return;
    setIsProcessing(true);
    await onEdit(panel.id, editPrompt);
    setIsProcessing(false);
    setIsEditing(false);
    setEditPrompt('');
  };

  return (
    <>
      {/* Zoom Modal (Dark/Tech) */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-xl transition-opacity duration-300"
          onClick={() => setIsZoomed(false)}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
             <img 
              src={panel.imageUrl} 
              alt={panel.scenario}
              className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_50px_rgba(250,204,21,0.2)] border border-white/10"
            />
            <button 
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-black/50 text-ar-gold p-2 rounded-full hover:bg-white/10 transition-colors border border-ar-gold/30"
            >
              <X size={32} />
            </button>
             <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none px-4">
                 <span className="inline-block bg-black/80 text-ar-gold px-8 py-4 rounded-full text-xl font-tech border border-ar-gold/50 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
                    "{panel.caption}"
                 </span>
             </div>
          </div>
        </div>
      )}

      {/* Card Container (Black/Yellow) */}
      <div className="bg-white/5 dark:bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 dark:border-tech-purple/30 shadow-lg hover:shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:border-watercolor-blue/30 dark:hover:border-tech-purple/50 transform transition-all duration-300 group">
        
        {/* Image Area */}
        <div 
            className="relative aspect-video w-full max-w-full overflow-hidden rounded-lg border-2 border-white/10 dark:border-white/5 bg-black mb-4 shadow-inner cursor-zoom-in group/image"
            onClick={() => setIsZoomed(true)}
        >
          <img 
            src={panel.imageUrl} 
            alt={panel.scenario}
            className="w-full h-full object-cover block transition-transform duration-700 group-hover/image:scale-105 opacity-90 group-hover/image:opacity-100"
          />
          
          {/* Tech Overlay Lines */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-ar-gold/50 dark:border-tech-purple/50 rounded-tl-lg"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-ar-gold/50 dark:border-tech-pink/50 rounded-br-lg"></div>

          {/* Zoom Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] pointer-events-none">
             <div className="bg-black/80 p-3 rounded-full text-ar-gold dark:text-tech-purple border border-ar-gold/50 dark:border-tech-purple/50 shadow-[0_0_15px_rgba(255,215,0,0.4)] dark:shadow-[0_0_15px_rgba(250,204,21,0.4)] transform scale-75 group-hover/image:scale-100 transition-transform duration-300">
                <Maximize2 size={24} />
             </div>
          </div>
          
          {isProcessing && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-10 cursor-default" onClick={(e) => e.stopPropagation()}>
                  <div className="flex flex-col items-center animate-pulse text-watercolor-blue dark:text-tech-purple">
                      <Wand2 size={48} />
                      <span className="font-tech font-bold mt-2">Enhancing...</span>
                  </div>
              </div>
          )}
        </div>
        
        {/* Edit Input Area */}
        {isEditing ? (
          <div className="mb-4 p-3 bg-black/40 rounded-lg border border-watercolor-blue/50 dark:border-tech-purple/50 border-dashed animate-in fade-in slide-in-from-top-2">
              <label className="text-xs font-bold text-watercolor-blue dark:text-tech-purple uppercase block mb-1 tracking-wider">{t.magicEdit}</label>
              <div className="flex gap-2">
                  <input 
                      type="text" 
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder={t.editPlaceholder}
                      className="flex-1 bg-black/50 border border-white/20 rounded-md px-3 py-2 font-sans text-lg text-white focus:outline-none focus:border-watercolor-blue dark:focus:border-tech-purple focus:shadow-[0_0_10px_rgba(0,243,255,0.2)] dark:focus:shadow-[0_0_10px_rgba(250,204,21,0.2)] placeholder-gray-600"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmitEdit()}
                  />
                  <button 
                      onClick={handleSubmitEdit}
                      disabled={isProcessing || !editPrompt.trim()}
                      className="bg-watercolor-blue/20 text-watercolor-blue dark:text-tech-purple border border-watercolor-blue/50 dark:border-tech-purple/50 p-2 rounded-md hover:bg-watercolor-blue/40 dark:hover:bg-tech-purple/40 transition-colors disabled:opacity-50"
                      title={t.tooltips.edit}
                  >
                      <Check size={20} />
                  </button>
                  <button 
                      onClick={() => setIsEditing(false)}
                      className="bg-white/5 text-gray-400 p-2 rounded-md hover:bg-white/10 transition-colors"
                      title={t.tooltips.delete}
                  >
                      <X size={20} />
                  </button>
              </div>
          </div>
        ) : (
          <div className="bg-black/40 p-4 rounded-lg border border-white/5 relative mb-4 flex items-start justify-between gap-2">
              <p className="font-tech text-xl text-white/90 leading-relaxed w-full break-words">
                "{panel.caption}"
              </p>
              <button 
                onClick={handleSpeak}
                className="shrink-0 text-watercolor-blue dark:text-tech-purple hover:text-white transition-colors mt-1 p-2 hover:bg-watercolor-blue/10 dark:hover:bg-tech-purple/10 rounded-full"
                title={t.tooltips.read}
              >
                <Volume2 size={20} />
              </button>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 border-t border-white/5 dark:border-white/10">
          <span className="text-xs font-tech text-gray-500 dark:text-gray-500 uppercase tracking-widest">
            {t.ep} <span className="text-ar-gold dark:text-white">{panel.id.slice(-4)}</span>
          </span>
          <div className="flex gap-2">
              <button 
                onClick={() => setIsEditing(true)}
                className={`p-2 rounded-full transition-colors border border-transparent ${isEditing ? 'bg-watercolor-blue/20 text-watercolor-blue border-watercolor-blue/50' : 'text-gray-400 dark:text-gray-400 hover:text-watercolor-blue dark:hover:text-tech-purple hover:bg-watercolor-blue/10 dark:hover:bg-tech-purple/10'}`}
                title={t.tooltips.edit}
              >
                <Wand2 size={18} />
              </button>
              <button 
                onClick={handleDownload}
                className="p-2 text-gray-400 dark:text-gray-400 hover:text-ar-gold dark:hover:text-tech-purple hover:bg-ar-gold/10 dark:hover:bg-tech-purple/10 rounded-full transition-colors"
                title={t.tooltips.download}
              >
                <Download size={18} />
              </button>
              <button 
                className="p-2 text-gray-400 dark:text-gray-400 hover:text-ar-gold dark:hover:text-tech-purple hover:bg-ar-gold/10 dark:hover:bg-tech-purple/10 rounded-full transition-colors"
                title={t.tooltips.share}
              >
                <Share2 size={18} />
              </button>
              <button 
                onClick={() => onDelete(panel.id)}
                className="p-2 text-gray-400 dark:text-gray-400 hover:text-watercolor-red hover:bg-watercolor-red/10 rounded-full transition-colors"
                title={t.tooltips.delete}
              >
                <Trash2 size={18} />
              </button>
          </div>
        </div>
      </div>
    </>
  );
};
