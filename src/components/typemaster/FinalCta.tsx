import { Surface } from "../../components/Surface";
import React, { useState } from 'react';
import { PricingBlock } from './PricingBlock';

interface FinalCtaProps {
  onDownload: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onDownload }) => {
  return (
    <Surface tone="dark" className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden flex flex-col justify-center items-center">
      <div className="noise-overlay"></div>
      <div id="pricing" className="relative z-10 max-w-3xl mx-auto text-center scroll-mt-28">
        <h2 className="font-serif-display text-display font-bold tracking-tight mb-6">
          No renewals.<br className="sm:hidden" /> No login.<br className="sm:hidden" /> No servers to shut down.
        </h2>
        <p className="text-gr-title leading-relaxed mb-12">
          You buy it, you download it, it works. If keepware ever disappears, your copy keeps running — offline activation means it never needs us again.
        </p>
        
        <PricingBlock onDownload={onDownload} />
      </div>
    </Surface>
  );
};
