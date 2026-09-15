import React from 'react';
import { motion } from 'motion/react';

interface PricingBlockProps {
  onOpenBuyModal: () => void;
}

export const PricingBlock: React.FC<PricingBlockProps> = ({ onOpenBuyModal }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex flex-col gap-2 mb-6">
        <p className="text-muted line-through decoration-muted text-lg">
          Cloud dictation: $12/month — forever
        </p>
        <div className="flex items-center justify-center gap-3 mb-1">
          <span className="text-3xl sm:text-4xl font-bold text-text">TypeMaster: Free</span>
        </div>
        <p className="text-muted font-medium text-sm">
          3 years of cloud dictation = $432. TypeMaster = Free forever.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOpenBuyModal}
        className="w-full sm:w-auto px-8 sm:px-10 py-4 bg-btn-bg hover:opacity-90 text-btn-text font-bold text-base sm:text-lg rounded-full shadow-lg organic-transition focus-ring mb-4 inline-flex items-center justify-center gap-2 select-none cursor-pointer"
      >
        <span>Download TypeMaster</span>
        <span className="text-btn-text/40 font-bold">·</span>
        <span className="font-extrabold">Free</span>
      </motion.button>

      <p className="text-sm font-medium text-muted">
        No account · No internet required · Yours forever
      </p>
    </div>
  );
};
