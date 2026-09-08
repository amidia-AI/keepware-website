import React, { useRef } from 'react';
import { Monitor } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export const ProductDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D Card tilt motion hooks
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="demo" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#17532F]/10 text-[#17532F] text-xs font-bold uppercase tracking-wider mb-3">
          <Monitor className="w-3.5 h-3.5" />
          <span>Official VSL Walkthrough</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1914] mb-3">
          See how it works.
        </h2>
        <p className="text-muted text-base sm:text-lg leading-relaxed">
          Watch the full video demonstration showing offline voice transcription, sub-200ms latency, and local privacy.
        </p>
      </div>

      {/* 16:9 Walkthrough Video Box with 3D Tilt Effect */}
      <div 
        ref={containerRef}
        className="w-full max-w-4xl mx-auto [perspective:1200px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          ref={cardRef}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.2 }}
          className="relative w-full aspect-video rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 bg-gradient-to-b from-white/90 via-white/70 to-white/40 border border-[#17532F]/20 shadow-[0_20px_45px_-10px_rgba(15,25,20,0.2)] backdrop-blur-xl group select-none overflow-hidden"
        >
          {/* Video Container (16:9 Screen) */}
          <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A140F] flex items-center justify-center [transform:translateZ(20px)] shadow-inner">
            
            {/* Real HTML5 Video Player */}
            <video
              src="/video2.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Top Bar Indicators */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-mono [transform:translateZ(35px)]">
              <span className="w-2 h-2 rounded-full bg-[#E8A33D] animate-pulse"></span>
              <span className="font-semibold">TypeMaster VSL</span>
            </div>


          </div>
        </motion.div>

      </div>
    </section>
  );
};
