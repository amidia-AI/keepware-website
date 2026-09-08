import React from 'react';
import { Mail, ArrowRight, FileWarning } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SupportPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="font-serif-display text-display font-bold tracking-tight mb-4">
          Support & Troubleshooting
        </h1>
        <p className="text-gr-title text-muted">
          Find solutions to common issues, hardware constraints, or contact us directly.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto w-full grid gap-6">
        
        {/* Contact Support */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-border text-muted flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-2xl font-bold mb-1">
                Email direct support
              </h3>
              <p className="text-gr-base text-muted max-w-md leading-relaxed">
                Drop our founders and core engineering team an email directly. We reply within 24 hours.
              </p>
            </div>
          </div>
          <a
            href="mailto:support@keepware.app"
            className="w-full sm:w-auto px-6 py-3 bg-border hover:bg-border font-bold text-gr-base rounded-xl organic-transition shadow-md flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-ring"
          >
            <span>support@keepware.app</span>
            <ArrowRight className="w-4 h-4 text-muted" />
          </a>
        </div>

        {/* Known Issues link */}
        <Link to="/docs/known-issues" className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-border focus-ring">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-border text-btn-bg flex items-center justify-center shrink-0">
              <FileWarning className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-2xl font-bold mb-1">
                Known Issues & Bug Tracker
              </h3>
              <p className="text-gr-base text-muted max-w-md leading-relaxed">
                Check here to see transparent tracking of current bugs, workarounds, and patch statuses.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-auto px-6 py-3 bg-transparent font-bold text-gr-base rounded-xl flex items-center justify-center gap-2 whitespace-nowrap">
            <span>View Tracker</span>
            <ArrowRight className="w-4 h-4 text-muted" />
          </div>
        </Link>
        
      </div>
    </div>
  );
}
