
import React from 'react';
import { Cpu, Loader2 } from 'lucide-react';

interface LoadingBrushProps {
  status: string;
}

export const LoadingBrush: React.FC<LoadingBrushProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-tech-purple/20 blur-xl rounded-full animate-pulse"></div>
        <div className="relative bg-black/50 p-4 rounded-full border border-tech-purple/50 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            <Loader2 size={48} className="text-tech-purple animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Cpu size={24} className="text-white" />
            </div>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-1">
        <p className="font-tech text-xl text-tech-purple tracking-wider animate-pulse">{status}</p>
        <div className="h-1 w-24 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-tech-purple to-white animate-[width_2s_ease-in-out_infinite]" style={{width: '50%'}}></div>
        </div>
      </div>
    </div>
  );
};
