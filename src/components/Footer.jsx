import React from 'react';
import { Heart, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="bg-marvel-red text-white font-marvel text-2xl px-2.5 py-0.5 tracking-wider uppercase border border-red-500/50">
              MARVEL
            </div>
            <span className="font-marvel text-lg tracking-wider text-slate-200 uppercase">
              SUPERHEROES UNIVERSE
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Desarrollado con</span>
            <span className="px-2 py-0.5 bg-blue-950 text-blue-400 rounded border border-blue-800 font-semibold">React JS</span>
            <span>+</span>
            <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 rounded border border-cyan-800 font-semibold">Tailwind CSS</span>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Marvel Superheroes Web App. Proyecto demostrativo para fans de Marvel.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="w-3.5 h-3.5 text-marvel-red fill-marvel-red" /> para explorar el multiverso.
          </p>
        </div>

      </div>
    </footer>
  );
}
