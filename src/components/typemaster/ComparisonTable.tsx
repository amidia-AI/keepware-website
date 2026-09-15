import React from 'react';
import { Check, X } from 'lucide-react';
import { Surface } from '../Surface';

export const ComparisonTable: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative z-10 topo-bg border-y border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif-display text-display font-bold text-center tracking-tight mb-12">
          The difference is structural.
        </h2>

        <Surface tone="dark" className="glass-card rounded-3xl overflow-hidden shadow-soft">
          {/* Header Row */}
          <div className="grid grid-cols-3 bg-border border-b border-border p-4 sm:p-6 font-bold ">
            <div className="col-span-1">Feature</div>
            <div className="col-span-1 text-center text-btn-bg">TypeMaster</div>
            <div className="col-span-1 text-center text-muted">Cloud Dictation</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-surface-border text-sm sm:text-base">
            <div className="grid grid-cols-3 p-4 sm:p-6 items-center">
              <div className="col-span-1 font-semibold pr-2">Price</div>
              <div className="col-span-1 text-center font-bold font-mono text-xs sm:text-sm">
                <span className="text-btn-bg">Free</span>
              </div>
              <div className="col-span-1 text-center text-muted font-mono text-xs sm:text-sm">$12/mo</div>
            </div>

            <div className="grid grid-cols-3 p-4 sm:p-6 items-center">
              <div className="col-span-1 font-semibold pr-2">Where it runs</div>
              <div className="col-span-1 text-center text-btn-bg font-bold leading-tight">100% on your PC</div>
              <div className="col-span-1 text-center text-muted leading-tight">External servers</div>
            </div>

            <div className="grid grid-cols-3 p-4 sm:p-6 items-center">
              <div className="col-span-1 font-semibold pr-2">Works without internet</div>
              <div className="col-span-1 flex justify-center text-btn-bg">
                <Check className="w-5 h-5" />
              </div>
              <div className="col-span-1 flex justify-center text-muted">
                <X className="w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-3 p-4 sm:p-6 items-center">
              <div className="col-span-1 font-semibold pr-2">Does your voice leave the device?</div>
              <div className="col-span-1 flex justify-center text-btn-bg">
                <span className="flex items-center gap-1 sm:gap-1.5 font-bold">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" /> No
                </span>
              </div>
              <div className="col-span-1 flex justify-center text-muted">
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" /> Yes
                </span>
              </div>
            </div>
          </div>
        </Surface>
      </div>
    </section>
  );
};
