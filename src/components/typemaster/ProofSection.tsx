import React, { useRef } from 'react';
import { Activity } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Chip } from '../../components/Chip';

export const ProofSection: React.FC = () => {
  // 3D Card tilt motion hooks
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural fluid 3D reaction
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates from -0.5 to 0.5
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="py-20 px-4 sm:px-6 relative z-10 border-b border-border topo-bg overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Verifiable Facts Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-14">
          <Chip surface="light">20.6 MB installer</Chip>
          <Chip surface="light">1.9 GB local model</Chip>
          <Chip surface="light" icon={<Activity className="w-4 h-4 text-[#17532F]" />}>
            Zero outbound network calls
          </Chip>
          <Chip surface="light">Built by an independent developer</Chip>
        </div>

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F1914] mb-3">
            Proof, not promises.
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
            Watch TypeMaster transcribe at 180ms latency in real time — completely disconnected from the internet.
          </p>
        </div>

        {/* 3D Interactive 16:9 Video Box */}
        <div 
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
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative w-full aspect-video rounded-2xl sm:rounded-3xl p-1.5 sm:p-2.5 bg-gradient-to-b from-white/90 via-white/70 to-white/40 border border-[#17532F]/20 shadow-[0_25px_50px_-12px_rgba(15,25,20,0.25)] backdrop-blur-xl group select-none overflow-hidden"
          >
            {/* Inner Video Container (16:9 Screen) */}
            <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#0a0f0d] flex items-center justify-center [transform:translateZ(20px)] shadow-inner">
              
              {/* Looping Video (autoplays, no player UI) */}
              <video
                src="/video1.1.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Offline Verification HUD Badge (Floating 3D Layer) */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-mono [transform:translateZ(35px)] shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="font-semibold">0 kbps Network Activity</span>
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

