import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, Shield, Layers, Laptop, Cpu, Code2, ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { ProjectRequest } from '../types';

export const RequestProjectSection: React.FC = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    projectTitle: '',
    platformTarget: 'macOS & Windows',
    budgetRange: '$1,000 - $3,000',
    description: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientEmail || !formData.projectTitle || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/project-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit project request');
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit project request:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      clientName: '',
      clientEmail: '',
      projectTitle: '',
      platformTarget: 'macOS & Windows',
      budgetRange: '$1,000 - $3,000',
      description: ''
    });
  };

  return (
    <section id="request-project" className="py-16 sm:py-24 px-4 sm:px-6 surface-light border-t border-border/90">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-border text-gr-base font-bold uppercase tracking-wider mb-3">
            <Code2 className="w-4 h-4 " />
            <span>Bespoke Engineering</span>
          </div>
          <h2 className="font-serif-display text-gr-display font-bold tracking-tight mb-3">
            Request a Custom App or Project
          </h2>
          <p className="text-gr-base leading-relaxed">
            Need a custom local-first desktop application, private offline tool, or specialized workflow built for your team? Commission custom software directly from keepware Labs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: What We Build & Value Proposition */}
          <div className="lg:col-span-5 space-y-5">
            <div className="surface-light rounded-3xl p-6 sm:p-7 border border-border shadow-sm space-y-4">
              <h3 className="font-serif-display text-gr-sub font-bold ">
                Why build with keepware?
              </h3>
              
              <ul className="space-y-3.5 text-gr-base ">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-border shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block ">100% On-Device & Air-Gapped</strong>
                    We specialize in local software that works completely offline with zero recurring server costs.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-border shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block ">Native Hardware Acceleration</strong>
                    Optimized for Apple Silicon Metal Neural Engine, NVIDIA CUDA, and multi-core CPU architectures.
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-border shrink-0 mt-0.5">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block ">You Own the Source Code & Binaries</strong>
                    Full intellectual property transfer with no recurring licensing fees or vendor lock-in.
                  </div>
                </li>
              </ul>

              <div className="pt-3 border-t border-border text-gr-base text-muted">
                <span className="font-semibold ">Typical turnarounds:</span> 1 to 4 weeks depending on scope and local model requirements.
              </div>
            </div>

            {/* Direct contact callout */}
            <div className="p-4 rounded-2xl surface-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-gr-base font-bold ">Prefer a direct conversation?</p>
                <p className="text-gr-base text-muted">Email our engineering lead directly.</p>
              </div>
              <a
                href="mailto:build@keepware.app?subject=Custom%20Project%20Inquiry"
                className="px-4 py-2 surface-light hover:bg-border text-gr-base font-bold rounded-xl whitespace-nowrap transition-colors"
              >
                build@keepware.app
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Request Form */}
          <div className="lg:col-span-7 surface-light rounded-3xl p-6 sm:p-8 border border-border shadow-md">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gr-base font-bold mb-1">
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="e.g. Jordan Lee (Acme Studio)"
                      className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                    />
                  </div>

                  <div>
                    <label className="block text-gr-base font-bold mb-1">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="jordan@company.com"
                      className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gr-base font-bold mb-1">
                    Project / Application Concept Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    placeholder="e.g. Offline Audio Transcriber & Note Organizer for Legal Teams"
                    className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gr-base font-bold mb-1">
                      Target Platforms
                    </label>
                    <select
                      value={formData.platformTarget}
                      onChange={(e) => setFormData({ ...formData, platformTarget: e.target.value })}
                      className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                    >
                      <option value="macOS (Apple Silicon & Intel)">macOS (Apple Silicon & Intel)</option>
                      <option value="Windows 10 / 11">Windows 10 / 11</option>
                      <option value="Cross-Platform (macOS, Windows, Linux)">Cross-Platform (macOS, Windows, Linux)</option>
                      <option value="CLI & Background Daemon">CLI & Background Daemon</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gr-base font-bold mb-1">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                    >
                      <option value="Under $1,000">Under $1,000 (Small Tool)</option>
                      <option value="$1,000 - $3,000">$1,000 - $3,000 (Dedicated Utility)</option>
                      <option value="$3,000 - $8,000">$3,000 - $8,000 (Full-featured Suite)</option>
                      <option value="$8,000+">$8,000+ (Enterprise Local Pipeline)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gr-base font-bold mb-1">
                    Describe your application goals & workflow
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us what the app should do, what inputs it processes, any specific local models required, and desired timelines..."
                    className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 surface-dark hover:bg-bg font-bold text-gr-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-3 disabled:opacity-60"
                >
                  <Send className="w-4 h-4 " />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Project Inquiry'}</span>
                </motion.button>

                <p className="text-gr-base text-center text-muted mt-2">
                  🔒 We review all proposals with strict confidentiality. NDA available upon request.
                </p>

              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-border flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 " />
                </div>
                <h3 className="font-serif-display text-gr-sub font-bold mb-2">
                  Project Inquiry Received!
                </h3>
                <p className="text-gr-base max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong>{formData.clientName}</strong>. Our engineering team has received your concept for <strong>"{formData.projectTitle}"</strong> and will get back to <strong>{formData.clientEmail}</strong> within 24 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 surface-dark text-gr-base font-bold rounded-xl cursor-pointer"
                >
                  Submit Another Project
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
