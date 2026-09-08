import React from 'react';
import { Send, Sparkles, Shield, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface SubmitAppSectionProps {
  onOpenSubmitModal: () => void;
}

export const SubmitAppSection: React.FC<SubmitAppSectionProps> = ({ onOpenSubmitModal }) => {
  return (
    <section id="submit-app" className="py-16 sm:py-20 px-4 sm:px-6 surface-dark relative overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-btn-bg/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-btn-bg/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-gr-base font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Indie Developer Platform</span>
        </div>

        <h2 className="font-serif-display text-gr-big font-bold tracking-tight mb-4">
          Are you building local-first indie software?
        </h2>

        <p className="text-gr-base max-w-2xl mx-auto leading-relaxed mb-8">
          <strong>keepware</strong> is currently showcasing TypeMaster, and we are opening up curation for more standalone, one-time-purchase desktop utilities soon. If your software respects privacy, runs locally, and rejects monthly subscription models, we'd love to feature you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={onOpenSubmitModal}
            className="w-full sm:w-auto px-7 py-3.5 surface-light hover:bg-border font-bold text-gr-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4 " />
            <span>Submit Your App for Next Batch</span>
          </motion.button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-gr-base ">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 " /> 90% Revenue Share
          </span>
          <span>•</span>
          <span>Perpetual DRM-Free Licensing</span>
          <span>•</span>
          <span>Zero Subscription Mandates</span>
        </div>

      </div>
    </section>
  );
};
