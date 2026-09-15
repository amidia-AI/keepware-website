import React, { useState } from 'react';
import { WifiOff, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Chip } from '../Chip';

interface HeroProps {
  onDownload: () => void;
  onOpenDetailsModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onDownload,
}) => {
  const [, setImageLoaded] = useState<boolean>(true);

  return (
    <section className="relative min-h-screen flex flex-col justify-start pt-28 sm:pt-36 pb-20 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      {/* Background Image as-is without any gradient or effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <picture>
          <source srcSet="/typemaster.webp" type="image/webp" />
          <img
            src="/typemaster.webp"
            alt="TypeMaster"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.endsWith('typemaster.png')) {
                target.src = '/typemaster.png';
              } else {
                setImageLoaded(false);
              }
            }}
          />
        </picture>
      </div>
      
      {/* Hero Content - Optimized for both Desktop & Mobile Screen Visibility */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start text-left">
        <div className="max-w-xl flex flex-col items-start max-md:w-full max-md:bg-white/95 max-md:backdrop-blur-md max-md:p-5 sm:max-md:p-7 max-md:rounded-3xl max-md:border max-md:border-[#17532F]/15 max-md:shadow-xl">
          
          {/* Top Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 sm:mb-6"
          >
            <Chip surface="dark" icon={<WifiOff className="w-3.5 h-3.5" />}>
              No internet required
            </Chip>
          </motion.div>

          {/* Main Headline in a Box */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-4 inline-block bg-white/90 backdrop-blur-md border border-[#17532F]/20 shadow-xs rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3.5"
          >
            <h1 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1914] leading-tight">
              Own your tools again.
            </h1>
          </motion.div>
          
          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="text-[#1C2C24] text-sm sm:text-base md:text-lg leading-relaxed font-medium mb-5 sm:mb-6"
          >
            TypeMaster turns your voice into text on any Windows app — 100% offline, on your own machine. <span className="font-bold text-[#0F1914]">Free to download.</span> Yours forever.
          </motion.p>

          {/* Specs / Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 mb-6 sm:mb-7"
          >
            <Chip surface="light">180ms latency</Chip>
            <Chip surface="light">0 kbps network</Chip>
            <Chip surface="light">Windows 10/11</Chip>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mb-5 w-full sm:w-auto"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDownload}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-[#E8A33D] hover:bg-[#d99530] text-[#111815] font-bold text-sm sm:text-base rounded-full shadow-md organic-transition focus-ring cursor-pointer text-center inline-flex items-center justify-center gap-2 select-none"
            >
              <span>Download TypeMaster</span>
              <span className="text-[#111815]/40 font-bold">·</span>
              <span className="font-extrabold">Free</span>
            </motion.button>
          </motion.div>
          
          {/* Trust Guarantees */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center gap-2 text-xs sm:text-sm text-[#384c42] font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-[#17532F] shrink-0" />
            <span>No account · No internet required · Yours forever</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

