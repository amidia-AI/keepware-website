import React from 'react';
import { Lock, Zap, WifiOff } from 'lucide-react';
import { motion } from 'motion/react';
import { Surface } from '../Surface';
import { Chip } from '../Chip';

export const WhyLocalFirst: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 px-4 sm:px-6 topo-bg relative z-10 border-y border-border scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Chip surface="light" icon={<Lock className="w-4 h-4" />} className="mb-6">
            Built on local AI
          </Chip>
          <h2 className="font-serif-display text-display font-bold tracking-tight mb-4">
            Total control.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <Surface tone="dark" className="glass-card p-6 sm:p-8 rounded-3xl h-full flex flex-col">
            <motion.div whileHover={{ y: -5 }} className="flex flex-col h-full">
              <div className="w-12 h-12 bg-border rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-muted" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold mb-3 ">NDA-Safe Confidentiality</h3>
              <p className="text-gr-base text-muted leading-relaxed flex-1">
                Zero telemetry. Zero API calls. Your audio never leaves your motherboard, making it strictly compliant for legal, medical, and NDA-restricted work.
              </p>
            </motion.div>
          </Surface>
          
          <Surface tone="dark" className="glass-card p-6 sm:p-8 rounded-3xl h-full flex flex-col">
            <motion.div whileHover={{ y: -5 }} className="flex flex-col h-full">
              <div className="w-12 h-12 bg-border rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-muted" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold mb-3 ">Sub-200ms Latency</h3>
              <p className="text-gr-base text-muted leading-relaxed flex-1">
                Because there's no network round-trip to an external server, words appear on screen as fast as you can speak them. Type at the speed of thought.
              </p>
            </motion.div>
          </Surface>
          
          <Surface tone="dark" className="glass-card p-6 sm:p-8 rounded-3xl h-full flex flex-col">
            <motion.div whileHover={{ y: -5 }} className="flex flex-col h-full">
              <div className="w-12 h-12 bg-border rounded-xl flex items-center justify-center mb-6">
                <WifiOff className="w-6 h-6 text-muted" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold mb-3 ">100% Offline Capability</h3>
              <p className="text-gr-base text-muted leading-relaxed flex-1">
                Whether you're on a flight, in a dead zone, or actively air-gapping your workstation, TypeMaster works flawlessly without an internet connection.
              </p>
            </motion.div>
          </Surface>
        </div>
      </div>
    </section>
  );
};
