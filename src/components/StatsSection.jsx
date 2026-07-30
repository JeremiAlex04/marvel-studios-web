import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS_DATA } from '../data/heroverseData';
import { Shield, Zap, Sparkles } from 'lucide-react';

function CounterItem({ target, prefix, label }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center p-6 bg-slate-900/60 rounded-3xl border border-slate-800 backdrop-blur-md hover:border-heroverse-gold transition-all duration-300 shadow-glow-gold">
      <div className="font-hero text-5xl sm:text-7xl font-extrabold text-gradient-gold tracking-wide">
        {prefix}{count}
      </div>
      <div className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-widest mt-2">
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-radial-hero relative overflow-hidden">
      
      {/* Energy Background Rays */}
      <div className="absolute inset-0 bg-hero-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-48 bg-gradient-to-r from-transparent via-heroverse-blue/20 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat) => (
            <CounterItem
              key={stat.id}
              target={stat.count}
              prefix={stat.prefix}
              label={stat.label}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
