import React from 'react';

export const Preloader = ({ progress }: { progress: number }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center pointer-events-none">
      <div className="font-serif text-4xl mb-4 tracking-widest uppercase text-foreground">
        Travel Co.
      </div>
      <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-brand-turquoise transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 font-sans text-xs tracking-[0.2em] text-foreground/60 uppercase">
        Loading Experience {Math.round(progress)}%
      </div>
    </div>
  );
};
