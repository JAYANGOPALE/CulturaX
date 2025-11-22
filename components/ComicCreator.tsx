
import React, { useState, useCallback } from 'react';
import { Sparkles, BookOpen, Eraser, Globe, Trophy, Share, ArrowLeft, Cpu, Sun, Moon, Book, ChevronLeft, ChevronRight, PenTool, Shield, User } from 'lucide-react';
import { ComicPanelData, LoadingState } from '../types';
import { generateCaption, generateImagePanel, editImagePanel } from '../services/geminiService';
import { ComicCard } from './ComicCard';
import { LoadingBrush } from './LoadingBrush';
import { QuizModal } from './QuizModal';
import { translations, languageOptions, LanguageCode } from '../translations';

interface ComicCreatorProps {
  onBack: () => void;
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ComicCreator: React.FC<ComicCreatorProps> = ({ 
  onBack,
  currentLanguage,
  setCurrentLanguage,
  isDarkMode,
  toggleTheme
}) => {
  const [activeTab, setActiveTab] = useState<'studio' | 'book'>('studio');
  const [input, setInput] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [panels, setPanels] = useState<ComicPanelData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [bookPage, setBookPage] = useState(0);

  const t = translations[currentLanguage] || translations['en'];

  // Official Pages Data
  const officialPages = [
    { 
        // Story 1: Cleanliness (Old man, Kids, Genie)
        imageUrl: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?q=80&w=1200&auto=format&fit=crop", 
        caption: t.officialStories.s1,
        isOfficial: true 
    },
    { 
        // Story 2: Foreigner/Guest (Atithi Devo Bhava)
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop", 
        caption: t.officialStories.s2,
        isOfficial: true 
    },
    { 
        // Story 3: Writing on Walls (Forts) - Fixed Image URL
        imageUrl: "https://images.unsplash.com/photo-1590050752117-238cb0fb5689?q=80&w=1200&auto=format&fit=crop", 
        caption: t.officialStories.s3,
        isOfficial: true 
    },
    { 
        // Story 4: Silence/Radio
        imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop", 
        caption: t.officialStories.s4,
        isOfficial: true 
    }
  ];

  // Combine official pages with user generated panels for the book view
  const allBookPages = [...officialPages, ...panels.map(p => ({ imageUrl: p.imageUrl, caption: p.caption, isOfficial: false }))];

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return;

    setError(null);
    setLoadingState(LoadingState.GENERATING_STORY);

    try {
      const langLabel = languageOptions.find(l => l.code === currentLanguage)?.label || 'English';
      const caption = await generateCaption(input, langLabel);
      
      setLoadingState(LoadingState.PAINTING_IMAGE);
      
      const imageUrl = await generateImagePanel(input, caption, langLabel);

      if (imageUrl) {
        const newPanel: ComicPanelData = {
          id: Date.now().toString(),
          imageUrl,
          caption,
          scenario: input,
          language: currentLanguage
        };
        setPanels(prev => [newPanel, ...prev]); // Newest first for Studio
        setInput('');
      } else {
        throw new Error("Failed to generate image data.");
      }
      
      setLoadingState(LoadingState.COMPLETE);
    } catch (err) {
      console.error(err);
      setError(t.errorGen);
      setLoadingState(LoadingState.ERROR);
    } finally {
      setTimeout(() => setLoadingState(LoadingState.IDLE), 2000);
    }
  }, [input, currentLanguage, t]);

  const handleEditPanel = async (id: string, instruction: string) => {
    const panel = panels.find(p => p.id === id);
    if (!panel) return;

    try {
      const newImageUrl = await editImagePanel(panel.imageUrl, instruction);
      if (newImageUrl) {
        setPanels(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, imageUrl: newImageUrl };
            }
            return p;
        }));
      }
    } catch (e) {
      console.error("Failed to edit", e);
      setError(t.errorEdit);
    }
  };

  const handleDeletePanel = (id: string) => {
    setPanels(prev => prev.filter(p => p.id !== id));
  };

  const generateStoryCollage = async (): Promise<string | null> => {
    if (panels.length === 0) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const width = 1200;
    const padding = 40;
    const headerHeight = 200;
    const footerHeight = 100;
    const panelHeight = 675;
    const textHeight = 150;
    const gap = 60;

    const storyPanels = [...panels].reverse();
    const totalHeight = headerHeight + (storyPanels.length * (panelHeight + textHeight + gap)) + footerHeight;

    canvas.width = width;
    canvas.height = totalHeight;

    // Dark background for collage too
    ctx.fillStyle = isDarkMode ? '#000000' : '#F9F5EB';
    ctx.fillRect(0, 0, width, totalHeight);

    // Gold Border
    ctx.strokeStyle = isDarkMode ? '#FFD700' : '#4A3B2C';
    ctx.lineWidth = 20;
    ctx.strokeRect(10, 10, width - 20, totalHeight - 20);

    // Title
    ctx.fillStyle = isDarkMode ? '#FFFFFF' : '#4A3B2C';
    ctx.font = 'bold 70px sans-serif'; 
    ctx.textAlign = 'center';
    ctx.fillText(t.appTitle + " Story", width / 2, 120);

    let currentY = headerHeight;

    for (const panel of storyPanels) {
      await new Promise<void>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
              ctx.save();
              ctx.beginPath();
              ctx.rect(padding, currentY, width - (padding * 2), panelHeight);
              ctx.clip();
              ctx.drawImage(img, padding, currentY, width - (padding * 2), panelHeight);
              // Tech Border (Yellow in dark mode)
              ctx.strokeStyle = isDarkMode ? '#FACC15' : '#C19A6B';
              ctx.lineWidth = 5;
              ctx.strokeRect(padding, currentY, width - (padding * 2), panelHeight);
              ctx.restore();
              resolve();
          };
          img.onerror = () => resolve();
          img.src = panel.imageUrl;
      });

      currentY += panelHeight + 30;

      ctx.font = 'italic 40px serif';
      ctx.fillStyle = isDarkMode ? '#FFD700' : '#4A3B2C';
      const words = panel.caption.split(' ');
      let line = '';
      let yText = currentY + 40;
      const maxWidth = width - (padding * 4);

      for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
              ctx.fillText(line, width / 2, yText);
              line = words[n] + ' ';
              yText += 50;
          } else {
              line = testLine;
          }
      }
      ctx.fillText(line, width / 2, yText);
      
      currentY += textHeight + gap;
    }
    
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#888';
    ctx.fillText("Created with CulturaX - Gemini AI", width / 2, totalHeight - 40);

    return canvas.toDataURL('image/png');
  };

  const handleShareStory = async () => {
    setIsSharing(true);
    try {
        const dataUrl = await generateStoryCollage();
        if (!dataUrl) throw new Error("Failed to generate collage");

        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], "culturax-story.png", { type: "image/png" });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: t.appTitle,
                text: t.introText,
                files: [file]
            });
        } else {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = "culturax-story.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (e) {
        console.error("Sharing failed", e);
        setError(t.shareStory.error);
    } finally {
        setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 relative bg-heritage-cream dark:bg-ar-dark text-heritage-brown dark:text-yellow-50 font-heritage-body dark:font-sans selection:bg-ar-gold selection:text-black overflow-hidden transition-colors duration-500">
      {/* Shared Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          {/* Grid pattern only in dark mode */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20 transition-opacity duration-500" style={{ 
              backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(250, 204, 21, 0.1)' : 'rgba(74, 59, 44, 0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'rgba(250, 204, 21, 0.1)' : 'rgba(74, 59, 44, 0.05)'} 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
          }}></div>
      </div>

      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        language={currentLanguage} 
      />

      <header className="bg-heritage-cream/90 dark:bg-black/80 backdrop-blur-md border-b border-heritage-brown/10 dark:border-tech-purple/30 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-black/5 dark:hover:bg-tech-purple/10 rounded-full text-heritage-brown/70 dark:text-gray-300 hover:text-heritage-brown dark:hover:text-white transition-colors">
                <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
                <Cpu className="text-heritage-accent dark:text-ar-gold shrink-0" size={28} />
                <h1 className="font-heritage-title dark:font-tech font-bold text-2xl tracking-tight">{t.appTitle}</h1>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-lg ml-4 border border-heritage-brown/10 dark:border-white/10">
               <button 
                  onClick={() => setActiveTab('studio')}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'studio' ? 'bg-heritage-accent dark:bg-ar-gold text-white dark:text-black shadow-md' : 'text-heritage-brown/70 dark:text-gray-400 hover:text-heritage-brown dark:hover:text-white'}`}
               >
                  <PenTool size={14} />
                  <span className="hidden sm:inline">{t.tabs.studio}</span>
               </button>
               <button 
                  onClick={() => setActiveTab('book')}
                  className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'book' ? 'bg-heritage-accent dark:bg-ar-gold text-white dark:text-black shadow-md' : 'text-heritage-brown/70 dark:text-gray-400 hover:text-heritage-brown dark:hover:text-white'}`}
               >
                  <Book size={14} />
                  <span className="hidden sm:inline">{t.tabs.book}</span>
               </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <button
               onClick={() => setIsQuizOpen(true)}
               className="flex items-center gap-2 bg-heritage-accent/10 dark:bg-tech-purple/10 text-heritage-accent dark:text-tech-purple border border-heritage-accent/30 dark:border-tech-purple/30 px-4 py-2 rounded-lg hover:bg-heritage-accent/20 dark:hover:bg-tech-purple/20 transition-colors font-bold text-xs uppercase tracking-wide shadow-sm"
             >
               <Trophy size={16} />
               <span className="hidden sm:inline">{t.quiz.button}</span>
             </button>

             <div className="flex items-center gap-1 bg-white/30 dark:bg-white/5 px-3 py-2 rounded-lg border border-heritage-brown/10 dark:border-white/20 hover:border-heritage-brown/30 dark:hover:border-white/40 transition-colors">
                <Globe size={16} className="text-heritage-brown/70 dark:text-gray-300" />
                <select 
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value as LanguageCode)}
                    className="bg-transparent border-none text-sm font-bold text-heritage-brown dark:text-gray-100 focus:outline-none cursor-pointer focus:ring-0"
                >
                    {languageOptions.map(opt => (
                        <option key={opt.code} value={opt.code} className="bg-heritage-cream dark:bg-black text-heritage-brown dark:text-gray-100">{opt.label}</option>
                    ))}
                </select>
             </div>
             
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-tech-purple/10 transition-colors text-heritage-brown dark:text-tech-purple"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        
        {activeTab === 'studio' ? (
          <>
            {panels.length === 0 && loadingState === LoadingState.IDLE && (
              <div className="text-center py-8 px-4 mb-8 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="font-heritage-title dark:font-tech text-4xl sm:text-5xl text-heritage-brown dark:text-white mb-4 drop-shadow-lg">{t.introTitle}</h2>
                <p className="text-heritage-brown/70 dark:text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
                  {t.introText}
                </p>
              </div>
            )}

            <div className="bg-white/40 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-12 border border-heritage-brown/10 dark:border-tech-purple/30 relative overflow-hidden group transition-colors duration-300">
              {/* Input Glow Effect */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-heritage-accent/10 dark:bg-tech-purple/10 blur-3xl rounded-full pointer-events-none group-hover:bg-heritage-accent/20 dark:group-hover:bg-tech-purple/20 transition-colors duration-700"></div>
              
              <label className="block text-xs font-bold text-heritage-accent dark:text-ar-gold uppercase tracking-widest mb-3 flex items-center gap-2">
                <Sparkles size={14} /> {t.sceneLabel}
              </label>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-white/60 dark:bg-black/40 border border-heritage-brown/20 dark:border-tech-purple/40 rounded-xl p-4 text-xl text-heritage-brown dark:text-white placeholder-heritage-brown/40 dark:placeholder-gray-500 focus:border-heritage-accent dark:focus:border-tech-purple focus:ring-1 focus:ring-heritage-accent/50 dark:focus:ring-tech-purple/50 outline-none transition-all resize-none h-24 sm:h-auto shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                  disabled={loadingState !== LoadingState.IDLE && loadingState !== LoadingState.COMPLETE && loadingState !== LoadingState.ERROR}
                />
                
                <div className="flex flex-row sm:flex-col gap-2 shrink-0">
                    <button
                    onClick={() => setInput('')}
                    className="flex-1 sm:flex-none flex items-center justify-center p-4 rounded-xl border border-heritage-brown/10 dark:border-tech-purple/30 text-heritage-brown/50 dark:text-gray-400 hover:text-heritage-brown dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    title={t.clear}
                    >
                    <Eraser size={20} />
                    </button>
                    <button 
                    onClick={handleGenerate}
                    disabled={!input.trim() || (loadingState !== LoadingState.IDLE && loadingState !== LoadingState.COMPLETE && loadingState !== LoadingState.ERROR)}
                    className="flex-[3] sm:flex-none bg-heritage-accent dark:bg-tech-purple text-white dark:text-black px-4 py-4 rounded-xl font-bold font-heritage-title dark:font-tech flex items-center justify-center gap-2 hover:opacity-90 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg dark:shadow-tech-purple/30"
                    >
                    <Sparkles size={20} className={loadingState !== LoadingState.IDLE && loadingState !== LoadingState.ERROR && loadingState !== LoadingState.COMPLETE ? "animate-spin" : ""} />
                    <span className="hidden sm:inline font-bold">GENERATE</span>
                    <span className="sm:hidden font-bold">GO</span>
                    </button>
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-500/30 flex items-center gap-2">
                  <span className="block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  {error}
                </div>
              )}
            </div>

            {(loadingState === LoadingState.GENERATING_STORY || loadingState === LoadingState.PAINTING_IMAGE) && (
              <div className="flex justify-center mb-12">
                <LoadingBrush status={loadingState === LoadingState.GENERATING_STORY ? t.loadingStory : t.loadingPaint} />
              </div>
            )}

            {panels.length > 0 && (
                <div className="flex justify-end mb-6 animate-in fade-in slide-in-from-bottom-2">
                    <button 
                        onClick={handleShareStory}
                        disabled={isSharing}
                        className="flex items-center gap-2 bg-watercolor-blue/10 dark:bg-tech-purple/10 text-heritage-brown dark:text-tech-purple border border-heritage-brown/20 dark:border-tech-purple/50 px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-watercolor-blue hover:text-black dark:hover:bg-tech-purple dark:hover:text-black transition-all disabled:opacity-70"
                    >
                        {isSharing ? (
                            <>
                                <Cpu size={18} className="animate-spin" />
                                <span>PROCESSING...</span>
                            </>
                        ) : (
                            <>
                                <Share size={18} />
                                <span>{t.shareStory.button.toUpperCase()}</span>
                            </>
                        )}
                    </button>
                </div>
            )}

            <div className="space-y-8 max-w-4xl mx-auto">
              {panels.map((panel) => (
                <ComicCard 
                    key={panel.id} 
                    panel={panel} 
                    currentLanguage={currentLanguage}
                    onEdit={handleEditPanel}
                    onDelete={handleDeletePanel}
                />
              ))}
            </div>

            {panels.length === 0 && loadingState === LoadingState.IDLE && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 max-w-4xl mx-auto">
                    {t.suggestions.map((idea: string, idx: number) => (
                        <button 
                            key={idx}
                            onClick={() => setInput(idea)}
                            className="p-4 rounded-xl border border-heritage-brown/10 dark:border-tech-purple/20 bg-white/40 dark:bg-black/40 hover:bg-heritage-accent/10 dark:hover:bg-tech-purple/10 hover:border-heritage-accent/50 dark:hover:border-tech-purple/50 text-heritage-brown/70 dark:text-gray-300 hover:text-heritage-brown dark:hover:text-white text-sm transition-all text-left"
                        >
                            "{idea}"
                        </button>
                    ))}
                </div>
            )}
          </>
        ) : (
          // COMIC BOOK VIEW - SINGLE PAGE
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12 flex flex-col items-center">
              {/* Single Page Container */}
              <div className="relative w-full max-w-4xl aspect-[3/2] md:aspect-[16/9] bg-heritage-brown dark:bg-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] dark:shadow-[0_0_50px_rgba(250,204,21,0.1)] border-4 md:border-8 border-heritage-accent/30 dark:border-ar-gold/30 overflow-hidden flex flex-col items-center justify-center">
                 
                 {/* Content Area */}
                 <div className="w-full h-full relative z-10 bg-heritage-paper dark:bg-gray-900/50 flex">
                    {allBookPages[bookPage] ? (
                         <div key={bookPage} className="w-full h-full flex flex-col p-6 md:p-12 animate-in slide-in-from-right-10 fade-in duration-500">
                             <div className="flex-1 relative rounded-xl overflow-hidden border-2 border-heritage-brown/20 dark:border-ar-gold/20 shadow-inner bg-black/20">
                                 <img 
                                   src={allBookPages[bookPage].imageUrl} 
                                   alt="Page" 
                                   className="w-full h-full object-contain md:object-cover"
                                 />
                                 
                                 {/* Badge: Official vs User */}
                                 {allBookPages[bookPage].isOfficial ? (
                                     <div className="absolute top-4 right-4 bg-ar-gold text-black text-xs font-bold px-3 py-1 rounded-full uppercase shadow-lg flex items-center gap-1">
                                         <Shield size={12} />
                                         {t.comicBook.official}
                                     </div>
                                 ) : (
                                    <div className="absolute top-4 right-4 bg-tech-purple text-black text-xs font-bold px-3 py-1 rounded-full uppercase shadow-lg flex items-center gap-1 border border-white/20">
                                         <User size={12} />
                                         {t.comicBook.userStory}
                                     </div>
                                 )}
                             </div>
                             <div className="mt-6 text-center bg-white/20 dark:bg-white/5 p-6 rounded-2xl border border-heritage-brown/5 dark:border-white/5 backdrop-blur-sm">
                                 <p className="font-heritage-body dark:font-sans text-xl md:text-2xl font-bold text-heritage-brown dark:text-white italic leading-relaxed">
                                   "{allBookPages[bookPage].caption}"
                                 </p>
                             </div>
                         </div>
                     ) : (
                         <div className="flex flex-col items-center justify-center h-full w-full text-center p-8">
                             <BookOpen size={64} className="mb-6 text-heritage-accent dark:text-gray-600 opacity-50" />
                             <p className="text-xl text-heritage-brown/60 dark:text-gray-400">{t.comicBook.empty}</p>
                         </div>
                     )}
                 </div>
              </div>

              {/* Explicit Navigation Buttons Below */}
              <div className="flex items-center gap-8 mt-8">
                  <button 
                      onClick={() => setBookPage(Math.max(0, bookPage - 1))}
                      disabled={bookPage === 0}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-heritage-cream dark:bg-black border border-heritage-brown/20 dark:border-ar-gold/30 shadow-lg text-heritage-brown dark:text-ar-gold hover:bg-white dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold"
                  >
                      <ChevronLeft size={20} />
                      {t.comicBook.prevBtn}
                  </button>
                  
                  <span className="font-heritage-body dark:font-mono text-lg font-bold text-heritage-brown dark:text-gray-400">
                      {bookPage + 1} / {allBookPages.length}
                  </span>

                  <button 
                      onClick={() => setBookPage(Math.min(allBookPages.length - 1, bookPage + 1))}
                      disabled={bookPage >= allBookPages.length - 1}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-heritage-cream dark:bg-black border border-heritage-brown/20 dark:border-ar-gold/30 shadow-lg text-heritage-brown dark:text-ar-gold hover:bg-white dark:hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold"
                  >
                      {t.comicBook.nextBtn}
                      <ChevronRight size={20} />
                  </button>
              </div>
          </div>
        )}

        {activeTab === 'studio' && panels.length > 0 && !isQuizOpen && (
           <div className="fixed bottom-8 right-8 animate-in slide-in-from-bottom-4 z-40">
             <button 
               onClick={() => setIsQuizOpen(true)}
               className="bg-heritage-accent dark:bg-ar-gold text-white dark:text-black p-4 rounded-full shadow-xl hover:scale-110 transition-all flex items-center gap-2 font-bold border-2 border-white/20 group shadow-ar-gold/30"
             >
               <Trophy size={24} className="group-hover:animate-bounce" />
               <span className="hidden md:inline font-heritage-title dark:font-tech">{t.quiz.button}</span>
             </button>
           </div>
        )}

      </main>
    </div>
  );
};
