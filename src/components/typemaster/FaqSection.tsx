import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Surface } from '../../components/Surface';
import { Chip } from '../../components/Chip';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How does TypeMaster achieve 100% offline speech recognition without sending audio to the cloud?',
    a: 'TypeMaster packages a heavily optimized neural speech recognition model that runs natively via NVIDIA CUDA / DirectML (Windows). When you press your global hotkey, the audio stream is converted into text tokens entirely inside your local system RAM. Your microphone audio never touches the internet.'
  },
  {
    q: 'What is the perpetual license policy? Are there recurring subscriptions?',
    a: 'Zero subscriptions. Ever. You pay $7.00 once (launch price, regular $23.99) and own your TypeMaster license for life. This includes all future patch releases, performance improvements, and local model weight fine-tunes. You receive standalone installer binaries with no DRM lock-in.'
  },
  {
    q: 'Can I use my TypeMaster license on multiple personal computers?',
    a: 'Yes. A single personal license allows you to activate TypeMaster on up to 3 personal machines that you own (e.g. your desktop workstation, personal laptop, and work machine).'
  },
  {
    q: 'What payment methods are supported for the $7.00 purchase?',
    a: 'We support PayPal checkout. You can pay securely using your PayPal account balance, linked bank account, or debit and credit cards through PayPal.'
  },
  {
    q: 'What if TypeMaster does not run smoothly on my specific hardware setup?',
    a: 'TypeMaster is engineered for maximum performance across modern 64-bit Windows systems. If you have any questions regarding your CPU, GPU, or microphone setup, contact support@keepware.app for dedicated assistance.'
  },
  {
    q: 'Can I commission a custom offline app or request specialized features?',
    a: 'Yes! We actively build custom local-first desktop software for teams and power users. Use the "Request a Custom App or Project" section below or email us directly at build@keepware.app.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <Chip surface="light" icon={<HelpCircle className="w-4 h-4" />} className="mb-3">
          Answers & Details
        </Chip>
        <h2 className="font-serif-display text-display font-bold tracking-tight mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gr-base text-muted leading-relaxed">
          Everything you need to know about TypeMaster, keepware's offline architecture, licensing, and support.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3.5 mb-10">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen ? 'bg-border border-border shadow-sm' : 'bg-transparent border-transparent hover:border-border'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left gap-4 cursor-pointer focus-ring"
              >
                <span className="font-semibold text-gr-base ">
                  {faq.q}
                </span>
                <span className="text-muted shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-gr-base text-muted leading-relaxed border-t border-border">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Direct Email Support CTA Block */}
      <Surface tone="dark" className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-border">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-border text-muted flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif-display text-gr-sub font-bold mb-1">
              Have a question not answered here?
            </h3>
            <p className="text-gr-base text-muted max-w-md leading-relaxed">
              Drop our founders and core engineering team an email directly. We reply within 24 hours.
            </p>
          </div>
        </div>

        <a
          href="mailto:support@keepware.app?subject=Question%20about%20TypeMaster"
          className="w-full sm:w-auto px-6 py-3 bg-border hover:bg-border font-bold text-gr-base rounded-xl organic-transition shadow-md flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-ring"
        >
          <span>Email support@keepware.app</span>
          <ArrowRight className="w-4 h-4 text-muted" />
        </a>
      </Surface>
    </section>
  );
};
