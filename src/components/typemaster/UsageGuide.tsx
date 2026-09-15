import React from 'react';
import { BookOpen, Lightbulb } from 'lucide-react';
import { motion } from 'motion/react';
import { Surface } from '../Surface';
import { Chip } from '../Chip';
import { TYPEMASTER_APP } from '../../data/appsData';
import { TYPEMASTER_MSI_URL } from '../../lib/typemasterDownload';

export const UsageGuide: React.FC = () => {
  return (
    <section id="guide" className="py-20 sm:py-24 px-4 sm:px-6 relative z-10 border-b border-border scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Chip surface="light" icon={<BookOpen className="w-4 h-4" />} className="mb-6">
            How to use it
          </Chip>
          <h2 className="font-serif-display text-display font-bold tracking-tight mb-4">
            From installer to first sentence.
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Six steps to get TypeMaster {TYPEMASTER_APP.version} dictating into every app on your machine. Rolling
            it out to multiple machines?{' '}
            <a
              href={TYPEMASTER_MSI_URL}
              className="underline underline-offset-2 hover:text-text organic-transition"
            >
              Download the .msi installer
            </a>{' '}
            instead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {TYPEMASTER_APP.usageGuide.map((item) => (
            <Surface key={item.id} tone="dark" className="glass-card p-6 sm:p-8 rounded-3xl h-full flex flex-col">
              <motion.div whileHover={{ y: -5 }} className="flex flex-col h-full">
                <div className="w-12 h-12 bg-border rounded-xl flex items-center justify-center mb-6">
                  <span className="font-mono font-bold text-muted">{item.step}</span>
                </div>
                <h3 className="font-serif-display text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gr-base text-muted leading-relaxed flex-1">
                  {item.description}
                </p>
                {item.hint && (
                  <p className="mt-5 pt-4 border-t border-border flex items-start gap-2 text-sm text-muted">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{item.hint}</span>
                  </p>
                )}
              </motion.div>
            </Surface>
          ))}
        </div>
      </div>
    </section>
  );
};
