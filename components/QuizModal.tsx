
import React, { useState, useEffect } from 'react';
import { X, Trophy, AlertCircle, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { translations, LanguageCode } from '../translations';
import { QuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';
import { Mascot } from './Mascot';
import { LoadingBrush } from './LoadingBrush';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, language }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [mascotMood, setMascotMood] = useState<'neutral' | 'happy' | 'excited' | 'sad' | 'thinking'>('neutral');
  const [mascotMessage, setMascotMessage] = useState('');

  const t = translations[language] || translations['en'];

  useEffect(() => {
    if (isOpen) {
      startQuiz();
    }
  }, [isOpen, language]);

  const startQuiz = async () => {
    setLoading(true);
    setQuizCompleted(false);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setMascotMood('thinking');
    
    const qs = await generateQuiz(language);
    setQuestions(qs);
    setLoading(false);
    setMascotMood('neutral');
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);
    
    const currentQ = questions[currentQuestionIndex];
    const isCorrect = index === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      setMascotMood('excited');
      setMascotMessage(currentQ.encouragement || "Correct! System optimized.");
    } else {
      setMascotMood('sad');
      setMascotMessage(t.quiz.goodTry);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setMascotMood('neutral');
      setMascotMessage('');
    } else {
      setQuizCompleted(true);
      setMascotMood('happy');
      setMascotMessage(score === questions.length ? t.quiz.greatJob : t.quiz.goodTry);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 dark:bg-black/90 backdrop-blur-sm p-4 transition-all">
      {/* Responsive Modal Container with Theme Support */}
      <div className="bg-heritage-paper dark:bg-ar-dark border border-heritage-brown/20 dark:border-tech-purple/30 rounded-3xl shadow-2xl dark:shadow-[0_0_50px_rgba(250,204,21,0.2)] w-full max-w-5xl min-h-[600px] overflow-hidden relative flex flex-col max-h-[90vh] transition-colors duration-300 text-heritage-brown dark:text-white">
        
        {/* Header */}
        <div className="bg-heritage-brown/5 dark:bg-black/40 p-6 flex justify-between items-center border-b border-heritage-brown/10 dark:border-tech-purple/20">
          <div className="flex items-center gap-3">
            <Trophy className="text-heritage-accent dark:text-ar-gold" size={32} />
            <h2 className="font-heritage-title dark:font-tech font-bold text-2xl">{t.quiz.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-heritage-brown/60 dark:text-gray-400 hover:text-heritage-brown dark:hover:text-white">
            <X size={32} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex-1 overflow-y-auto flex flex-col relative">
           {/* Grid bg inside modal (Adaptive) */}
           <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 bg-[linear-gradient(to_right,#4A3B2C_1px,transparent_1px),linear-gradient(to_bottom,#4A3B2C_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#FACC15_1px,transparent_1px),linear-gradient(to_bottom,#FACC15_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {loading ? (
             <div className="flex-1 flex flex-col items-center justify-center min-h-[300px]">
                <LoadingBrush status={t.quiz.loading} />
             </div>
          ) : quizCompleted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 py-8 animate-in zoom-in-50 duration-500 relative z-10">
               <div className="scale-125 mb-4">
                 <Mascot mood="excited" message={t.quiz.greatJob} />
               </div>
               <div>
                 <h3 className="font-heritage-title dark:font-tech text-4xl mb-4">{t.quiz.resultTitle}</h3>
                 <p className="text-3xl font-bold text-heritage-accent dark:text-ar-gold tracking-widest drop-shadow-md dark:drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                   SCORE: {score} / {questions.length}
                 </p>
               </div>
               <div className="flex gap-6 mt-8">
                 <button 
                    onClick={startQuiz}
                    className="flex items-center gap-2 px-8 py-4 bg-heritage-accent/10 dark:bg-ar-gold/20 text-heritage-accent dark:text-ar-gold border border-heritage-accent dark:border-ar-gold rounded-xl font-bold text-lg hover:bg-heritage-accent hover:text-white dark:hover:bg-ar-gold dark:hover:text-black transition-all shadow-lg"
                 >
                   <RotateCcw size={24} />
                   {t.quiz.restart}
                 </button>
                 <button 
                    onClick={onClose}
                    className="px-8 py-4 bg-black/5 dark:bg-white/5 text-heritage-brown/70 dark:text-gray-300 border border-heritage-brown/10 dark:border-white/10 rounded-xl font-bold text-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                 >
                   {t.quiz.close}
                 </button>
               </div>
            </div>
          ) : questions.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-12 h-full relative z-10">
              {/* Left: Mascot Area */}
              <div className="flex flex-col items-center justify-center w-full lg:w-1/3 order-2 lg:order-1 lg:border-r border-heritage-brown/10 dark:border-tech-purple/20 lg:pr-8">
                 <div className="scale-125">
                    <Mascot mood={mascotMood} message={mascotMessage} />
                 </div>
              </div>

              {/* Right: Question Area */}
              <div className="flex-1 flex flex-col order-1 lg:order-2 justify-center">
                 <div className="mb-8">
                   <span className="text-sm font-bold dark:font-tech text-heritage-accent dark:text-tech-purple uppercase tracking-widest mb-3 block">
                     {t.quiz.title} • {currentQuestionIndex + 1}/{questions.length}
                   </span>
                   <h3 className="font-heritage-body dark:font-sans text-3xl font-bold leading-snug">
                     {questions[currentQuestionIndex].question}
                   </h3>
                 </div>

                 <div className="space-y-4 flex-1">
                   {questions[currentQuestionIndex].options.map((option, idx) => {
                     // Determine styles based on state
                     let baseClass = "w-full text-left p-5 rounded-xl border transition-all flex justify-between items-center group font-medium text-lg ";
                     let stateClass = "border-heritage-brown/10 dark:border-white/10 hover:border-heritage-accent dark:hover:border-tech-purple hover:bg-heritage-accent/5 dark:hover:bg-tech-purple/10 text-heritage-brown/80 dark:text-gray-300";
                     let icon = null;

                     if (isAnswered) {
                       if (idx === questions[currentQuestionIndex].correctAnswer) {
                         stateClass = "border-green-500/50 bg-green-500/10 text-green-600 dark:text-green-400 shadow-md";
                         icon = <CheckCircle2 className="text-green-600 dark:text-green-500" size={24} />;
                       } else if (idx === selectedOption) {
                         stateClass = "border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400";
                         icon = <AlertCircle className="text-red-600 dark:text-red-500" size={24} />;
                       } else {
                         stateClass = "border-transparent opacity-50";
                       }
                     } else if (idx === selectedOption) {
                        stateClass = "border-heritage-accent dark:border-tech-purple bg-heritage-accent/10 dark:bg-tech-purple/20 text-heritage-brown dark:text-white font-bold";
                     }

                     return (
                       <button
                         key={idx}
                         onClick={() => handleOptionClick(idx)}
                         disabled={isAnswered}
                         className={baseClass + stateClass}
                       >
                         <span>{option}</span>
                         {icon}
                       </button>
                     );
                   })}
                 </div>

                 {isAnswered && (
                   <div className="mt-8 flex justify-end animate-in slide-in-from-bottom-2">
                     <button
                       onClick={handleNext}
                       className="flex items-center gap-3 bg-heritage-accent dark:bg-tech-purple text-white dark:text-black px-8 py-4 rounded-xl font-bold dark:font-tech text-lg hover:opacity-90 transition-all shadow-lg"
                     >
                       {t.quiz.next}
                       <ArrowRight size={24} />
                     </button>
                   </div>
                 )}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500 font-mono">
              System Error: Could not load data stream.
              <button onClick={onClose} className="block mx-auto mt-4 text-heritage-accent dark:text-ar-gold underline">Terminate</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
