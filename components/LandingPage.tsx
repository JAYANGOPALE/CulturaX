
import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Smartphone, Globe, Box, Users, Mail, Download, Layers, Cpu, Moon, Sun, Eye, ShoppingCart, Wifi, WifiOff } from 'lucide-react';
import { translations, languageOptions, LanguageCode } from '../translations';
import { PurchaseModal } from './PurchaseModal';
import { FeedbackSection } from './FeedbackSection';

interface LandingPageProps {
  onStartApp: () => void;
  currentLanguage: LanguageCode;
  setCurrentLanguage: (lang: LanguageCode) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onStartApp, 
  currentLanguage, 
  setCurrentLanguage,
  isDarkMode,
  toggleTheme
}) => {
  const t = translations[currentLanguage] || translations['en'];
  const fogLayerRef = useRef<HTMLDivElement>(null);
  const fogLayer2Ref = useRef<HTMLDivElement>(null);
  const neonGridRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Track which app is being requested: 'booklet' or 'groundplan'
  const [requestAppType, setRequestAppType] = useState<'booklet' | 'groundplan' | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;

    // Generate Particles
    if (particlesRef.current && particlesRef.current.children.length === 0) {
      for (let i = 0; i < 60; i++) {
        const dot = document.createElement("div");
        dot.style.position = "absolute";
        dot.style.width = "2px";
        dot.style.height = "2px";
        dot.style.backgroundColor = isDarkMode ? "#FACC15" : "#4A3B2C"; // Yellow in dark mode
        dot.style.borderRadius = "50%";
        dot.style.left = Math.random() * 100 + "%";
        dot.style.top = Math.random() * 100 + "%";
        dot.style.opacity = (Math.random() * 0.5 + 0.1).toString();
        dot.style.animation = `float ${4 + Math.random() * 4}s infinite ease-in-out`;
        dot.style.animationDelay = Math.random() * 3 + "s";
        particlesRef.current.appendChild(dot);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      targetMouseX = (e.clientX - w / 2) / (w / 2);
      targetMouseY = (e.clientY - h / 2) / (h / 2);

      if (neonGridRef.current) {
         const x = (e.clientX / w - 0.5) * 10;
         const y = (e.clientY / h - 0.5) * 10;
         neonGridRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
      }
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

    const animate = () => {
      mouseX = lerp(mouseX, targetMouseX, 0.06);
      mouseY = lerp(mouseY, targetMouseY, 0.06);

      if (fogLayerRef.current) {
        const moveX = mouseX * 20;
        const moveY = (mouseY * 20) + (scrollY * 0.1);
        fogLayerRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
      }

      if (fogLayer2Ref.current) {
        const moveX = mouseX * 40;
        const moveY = (mouseY * 40) + (scrollY * 0.1);
        fogLayer2Ref.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
  };

  // Determine the display name for the modal
  const getProductName = () => {
      if (requestAppType === 'booklet') return t.downloads.bookletTitle;
      if (requestAppType === 'groundplan') return t.downloads.gpTitle;
      return '';
  };

  return (
    <div className="min-h-screen overflow-x-hidden dark:text-yellow-50 text-heritage-brown font-heritage-body selection:bg-ar-gold selection:text-black transition-colors duration-500">
        {/* Purchase Modal */}
        <PurchaseModal 
          isOpen={!!requestAppType}
          onClose={() => setRequestAppType(null)}
          language={currentLanguage}
          productName={getProductName()}
        />

        {/* Background Layers */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            <div ref={fogLayerRef} className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            {isDarkMode ? (
              <div ref={fogLayer2Ref} className="absolute inset-0 bg-gradient-to-b from-[#000000] via-gray-900/50 to-[#000000]"></div>
            ) : (
              <div ref={fogLayer2Ref} className="absolute inset-0 bg-gradient-to-b from-transparent via-heritage-cream/20 to-heritage-paper/80"></div>
            )}
            <div 
                ref={neonGridRef} 
                className="absolute inset-0 opacity-10 dark:opacity-20" 
                style={{ 
                    backgroundImage: `linear-gradient(to right, ${isDarkMode ? '#FACC15' : '#C19A6B'} 1px, transparent 1px), linear-gradient(to bottom, ${isDarkMode ? '#FACC15' : '#C19A6B'} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    transform: 'perspective(500px) rotateX(60deg)'
                }}
            ></div>
            <div ref={particlesRef} className="absolute inset-0"></div>
        </div>

        {/* Navbar */}
        <header className="fixed top-0 w-full z-50 bg-heritage-cream/90 dark:bg-black/90 backdrop-blur-md border-b border-heritage-brown/10 dark:border-tech-purple/30 transition-colors duration-300">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-heritage-title font-bold tracking-tighter text-heritage-accent dark:text-ar-gold flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                   <Box size={24} className="dark:text-white" /> {t.appTitle}
                </div>
                
                <div className="flex items-center gap-6">
                    <nav className="hidden lg:flex space-x-8 text-sm font-bold tracking-wide uppercase">
                        {[
                          { id: 'home', label: t.nav.home },
                          { id: 'features', label: t.nav.features },
                          { id: 'downloads', label: t.nav.downloads },
                          { id: 'impact', label: t.nav.impact },
                          { id: 'team', label: t.nav.team },
                          { id: 'feedback', label: t.nav.feedback }
                        ].map((item) => (
                            <button 
                                key={item.id} 
                                onClick={() => scrollToSection(item.id)}
                                className="hover:text-heritage-accent dark:hover:text-tech-purple transition-colors dark:text-gray-300"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                      {/* Language Switcher */}
                      <div className="relative group">
                        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-tech-purple/20 transition-colors dark:text-tech-purple">
                          <Globe size={20} />
                        </button>
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-black border border-gray-200 dark:border-tech-purple/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden z-50">
                          {languageOptions.map(lang => (
                            <button
                              key={lang.code}
                              onClick={() => setCurrentLanguage(lang.code as LanguageCode)}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-heritage-accent/10 dark:hover:bg-tech-purple/20 dark:text-gray-200 ${currentLanguage === lang.code ? 'font-bold text-heritage-accent dark:text-tech-purple' : ''}`}
                            >
                              {lang.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Theme Toggle */}
                      <button 
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-tech-purple/20 transition-colors dark:text-tech-purple"
                      >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                      </button>
                    </div>

                    <button 
                        onClick={() => scrollToSection('contact')}
                        className="hidden md:block bg-heritage-accent dark:bg-ar-gold text-white dark:text-black px-4 py-2 rounded font-bold hover:opacity-90 transition-colors text-sm font-heritage-title shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                    >
                        {t.nav.contact}
                    </button>
                </div>
            </div>
        </header>

        {/* Hero */}
        <section id="home" className="relative z-10 min-h-screen flex items-center justify-center pt-20">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2 space-y-6">
                    <h2 className="text-5xl md:text-7xl font-heritage-title font-black leading-tight text-heritage-brown dark:text-white">
                        {t.hero.title} <span className="text-heritage-accent dark:text-tech-purple drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]">{t.hero.highlight}</span>
                    </h2>
                    <p className="text-heritage-brown/80 dark:text-gray-400 text-lg md:text-xl max-w-lg">
                        {t.hero.desc}
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                         <button 
                            onClick={onStartApp}
                            className="bg-heritage-brown dark:bg-tech-purple text-white dark:text-black px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-heritage-accent/20 dark:shadow-tech-purple/40 font-heritage-title"
                         >
                            {t.nav.launch} <ChevronRight size={20} />
                         </button>
                         <button 
                            onClick={() => scrollToSection('downloads')}
                            className="border border-heritage-brown/20 dark:border-tech-purple/40 px-8 py-4 rounded-lg font-bold text-lg hover:bg-black/5 dark:hover:bg-tech-purple/10 transition-all font-heritage-title dark:text-tech-purple"
                         >
                            {t.hero.tryNow}
                         </button>
                    </div>
                </div>
                <div className="md:w-1/2 relative group">
                    <div className="absolute inset-0 bg-heritage-accent/20 dark:bg-tech-purple/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
                    <div className="relative border border-heritage-brown/10 dark:border-tech-purple/30 bg-white/40 dark:bg-black/40 backdrop-blur-sm p-3 rounded-2xl overflow-hidden shadow-2xl">
                         <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                             <img 
                                src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1776&auto=format&fit=crop" 
                                alt="Taj Mahal"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                             />
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Why CulturaX */}
        <section id="why" className="relative z-10 py-20 bg-heritage-brown/5 dark:bg-gray-900/50 border-y border-heritage-brown/5 dark:border-tech-purple/10">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-heritage-title font-black text-heritage-accent dark:text-ar-gold mb-12 text-center uppercase tracking-wider drop-shadow-[0_0_10px_rgba(255,215,0,0.2)]">{t.why.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.why.items.map((item: string, i: number) => (
                        <div key={i} className="p-6 border border-heritage-brown/10 dark:border-tech-purple/20 bg-white/40 dark:bg-black/40 hover:bg-heritage-accent/10 dark:hover:bg-tech-purple/10 hover:border-heritage-accent/50 dark:hover:border-tech-purple/50 transition-all rounded-xl backdrop-blur-sm group">
                            <div className="h-2 w-2 bg-heritage-accent dark:bg-tech-purple mb-4 rounded-full group-hover:w-8 transition-all shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                            <p className="font-semibold text-lg dark:text-gray-200">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Features */}
        <section id="features" className="relative z-10 py-20">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-heritage-title font-black text-heritage-accent dark:text-ar-gold mb-12 text-center uppercase tracking-wider">{t.features.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { icon: <Smartphone />, ...t.features.f1 },
                        { icon: <Box />, ...t.features.f2 },
                        { icon: <Globe />, ...t.features.f3 },
                        { icon: <Cpu />, ...t.features.f4 },
                        { icon: <Layers />, ...t.features.f5 },
                        { icon: <Box />, ...t.features.f6 },
                    ].map((feature, i) => (
                        <div key={i} className="p-8 border border-heritage-brown/10 dark:border-tech-purple/20 bg-heritage-paper/50 dark:bg-black/80 rounded-xl hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-heritage-accent/10 dark:hover:shadow-tech-purple/20">
                            <div className="text-heritage-accent dark:text-tech-purple mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-2 font-heritage-title dark:text-white">{feature.t}</h3>
                            <p className="text-heritage-brown/70 dark:text-gray-400">{feature.d}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Downloads / Apps Section */}
        <section id="downloads" className="relative z-10 py-20 border-y border-heritage-brown/10 dark:border-tech-purple/20 bg-gradient-to-b from-heritage-brown/5 to-heritage-brown/10 dark:from-black dark:to-gray-900">
             <div className="container mx-auto px-6">
                <h2 className="text-4xl font-heritage-title font-black text-heritage-accent dark:text-tech-purple mb-4 text-center uppercase tracking-wider">{t.downloads.title}</h2>
                <p className="text-center text-heritage-brown/70 dark:text-gray-400 max-w-2xl mx-auto mb-16">
                  {t.downloads.subtitle}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    
                    {/* Booklet AR App */}
                    <div className="p-8 rounded-2xl border border-heritage-brown/10 dark:border-tech-purple/30 bg-white/60 dark:bg-black/60 hover:bg-heritage-accent/5 dark:hover:bg-tech-purple/5 transition-all relative group overflow-hidden shadow-xl">
                        {/* Offline Badge */}
                        <div className="absolute top-6 left-6 z-20">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 shadow-sm backdrop-blur-md">
                                <WifiOff size={14} strokeWidth={2.5} />
                                {t.downloads.offlineTag}
                            </span>
                        </div>

                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                           <Box size={120} className="text-heritage-accent dark:text-tech-purple rotate-12" />
                        </div>
                        <div className="relative z-10">
                           <div className="inline-block p-3 rounded-lg bg-heritage-accent/20 dark:bg-tech-purple/20 text-heritage-accent dark:text-tech-purple mb-6 mt-8">
                              <Smartphone size={32} />
                           </div>
                           <h3 className="text-2xl font-bold mb-2 font-heritage-title dark:text-white">{t.downloads.bookletTitle}</h3>
                           <p className="text-heritage-brown/70 dark:text-gray-400 mb-8 h-24">
                             {t.downloads.bookletDesc}
                           </p>
                           
                           <div className="space-y-3">
                             <button 
                                onClick={() => setRequestAppType('booklet')}
                                className="w-full py-3 bg-heritage-accent dark:bg-tech-purple text-white dark:text-black font-bold rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                             >
                               <Download size={20} /> {t.downloads.bookletBuy}
                             </button>
                             <button className="w-full py-3 border border-heritage-brown/20 dark:border-tech-purple/40 text-heritage-brown dark:text-tech-purple font-bold rounded-lg hover:bg-black/5 dark:hover:bg-tech-purple/10 transition-colors flex items-center justify-center gap-2 text-sm">
                               <Eye size={18} /> {t.downloads.bookletPreview}
                             </button>
                           </div>
                        </div>
                    </div>

                    {/* Groundplan AR App */}
                    <div className="p-8 rounded-2xl border border-heritage-brown/10 dark:border-tech-purple/30 bg-white/60 dark:bg-black/60 hover:bg-heritage-accent/5 dark:hover:bg-tech-purple/5 transition-all relative group overflow-hidden shadow-xl">
                        {/* Online Badge */}
                        <div className="absolute top-6 left-6 z-20">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 shadow-sm backdrop-blur-md">
                                <Wifi size={14} strokeWidth={2.5} />
                                {t.downloads.onlineTag}
                            </span>
                        </div>

                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                           <Layers size={120} className="text-heritage-accent dark:text-tech-purple -rotate-12" />
                        </div>
                        <div className="relative z-10">
                           <div className="inline-block p-3 rounded-lg bg-heritage-accent/20 dark:bg-tech-purple/20 text-heritage-accent dark:text-tech-purple mb-6 mt-8">
                              <Box size={32} />
                           </div>
                           <h3 className="text-2xl font-bold mb-2 font-heritage-title dark:text-white">{t.downloads.gpTitle}</h3>
                           <p className="text-heritage-brown/70 dark:text-gray-400 mb-8 h-24">
                             {t.downloads.gpDesc}
                           </p>
                           <div className="space-y-3">
                             <button 
                                onClick={() => setRequestAppType('groundplan')}
                                className="w-full py-3 bg-heritage-brown dark:bg-tech-purple text-white dark:text-black font-bold rounded-lg hover:opacity-90 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                             >
                               <Download size={20} /> {t.downloads.downloadApk}
                             </button>
                             <div className="h-[46px]"></div> {/* Spacer to align with booklet card buttons */}
                           </div>
                        </div>
                    </div>

                </div>
             </div>
        </section>

        {/* Impact */}
        <section id="impact" className="relative z-10 py-20 bg-gradient-to-b from-heritage-brown/90 to-heritage-brown dark:from-gray-900 dark:to-black text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-heritage-title font-black text-heritage-accent dark:text-ar-gold mb-12 uppercase tracking-wider">{t.impact.title}</h2>
                <div className="flex flex-wrap justify-center gap-4">
                    {t.impact.items.map((item: string, i: number) => (
                        <div key={i} className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-heritage-accent dark:hover:border-tech-purple text-sm md:text-base transition-all cursor-default dark:text-gray-200">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Team */}
        <section id="team" className="relative z-10 py-20">
             <div className="container mx-auto px-6">
                <h2 className="text-4xl font-heritage-title font-black text-heritage-accent dark:text-ar-gold mb-12 text-center uppercase tracking-wider">{t.team.title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { name: "ISHWARI SHINDE", role: t.team.lead },
                        { name: "JAYAN GOPALE", role: t.team.member },
                        { name: "ISHIKA SHIRODE", role: t.team.member },
                        { name: "PIYUSH KULKARNI", role: t.team.member },
                        { name: "NIKITA MORE", role: t.team.member },
                        { name: "SAKET KULTHE", role: t.team.member },
                    ].map((member, i) => (
                        <div key={i} className="p-6 bg-white dark:bg-black/60 border border-heritage-brown/10 dark:border-tech-purple/20 rounded-xl text-center hover:scale-105 transition-transform duration-300 shadow-lg">
                            <div className="w-20 h-20 mx-auto bg-heritage-paper dark:bg-gray-900 rounded-full mb-4 flex items-center justify-center text-heritage-brown dark:text-tech-purple border border-transparent dark:border-tech-purple/30">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-heritage-brown dark:text-white font-heritage-title">{member.name}</h3>
                            <p className="text-heritage-accent dark:text-tech-purple text-sm font-bold uppercase tracking-widest mt-1">{member.role}</p>
                        </div>
                    ))}
                </div>
             </div>
        </section>

        {/* Feedback Section */}
        <FeedbackSection currentLanguage={currentLanguage} isDarkMode={isDarkMode} />

        {/* Footer */}
        <footer id="contact" className="relative z-10 py-12 bg-heritage-brown dark:bg-black border-t border-white/10 dark:border-tech-purple/20 text-center text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-black text-heritage-accent dark:text-ar-gold mb-6 font-heritage-title">{t.footer.contact}</h2>
                <div className="flex flex-col items-center justify-center gap-2 mb-8">
                    <p className="text-gray-300 dark:text-gray-400">{t.footer.text}</p>
                    <a href="mailto:your-email@example.com" className="text-xl text-white hover:text-heritage-accent dark:hover:text-tech-purple transition-colors flex items-center gap-2 font-bold">
                        <Mail size={20} /> your-email@example.com
                    </a>
                </div>
                <div className="text-gray-500 text-sm">
                    {t.footer.rights}
                </div>
            </div>
        </footer>
    </div>
  );
};
