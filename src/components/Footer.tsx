import React from 'react';
import { Send, Code2, AppWindow, Route, HelpCircle, FileWarning } from 'lucide-react';
import { Link } from 'react-router-dom';
import { KeepwareLogo } from './KeepwareLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="surface-dark border-t border-border pt-16 pb-24 sm:pb-12 px-4 sm:px-6 text-gr-base">
      <div className="max-w-5xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-border">
          
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-border flex items-center justify-center p-1.5 shadow-sm">
                <KeepwareLogo className="w-full h-full" veinColor="var(--bg)" />
              </div>
              <span className="font-serif-display font-bold text-gr-sub">
                keepware
              </span>
              <span className="text-sm uppercase font-bold text-muted bg-border px-3 py-0.5 rounded-full border border-border">
                Pay Once. Keep for Life.
              </span>
            </div>
            <p className="text-gr-base text-muted max-w-sm leading-relaxed mt-4">
              Curated home for standalone, local-first software. Featuring <strong>TypeMaster</strong> — private neural voice-to-text on your machine with zero cloud subscriptions.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-bold text-gr-base uppercase tracking-wider mb-3 font-mono">
              Storefront
            </h4>
            <ul className="space-y-3 text-gr-base text-muted">
              <li>
                <Link to="/" className="hover:underline organic-transition focus-ring rounded-sm">
                  Store Home
                </Link>
              </li>
              <li>
                <Link to="/typemaster" className="hover:underline organic-transition flex items-center gap-1.5 focus-ring rounded-sm w-max">
                  <AppWindow className="w-4 h-4" />
                  <span>TypeMaster App</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-bold text-gr-base uppercase tracking-wider mb-3 font-mono">
              Services
            </h4>
            <ul className="space-y-3 text-gr-base text-muted">
              <li>
                <Link
                  to="/custom-work"
                  className="hover:underline organic-transition flex items-center gap-1.5 focus-ring rounded-sm w-max"
                >
                  <Code2 className="w-4 h-4" />
                  <span>Custom Work</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:underline organic-transition flex items-center gap-1.5 focus-ring rounded-sm w-max"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Support & FAQ</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/roadmap"
                  className="hover:underline organic-transition flex items-center gap-1.5 focus-ring rounded-sm w-max"
                >
                  <Route className="w-4 h-4" />
                  <span>Roadmap</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/for-developers"
                  className="hover:underline organic-transition flex items-center gap-1.5 focus-ring rounded-sm w-max"
                >
                  <Code2 className="w-4 h-4" />
                  <span>For Developers</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/docs/known-issues"
                  className="hover:underline organic-transition flex items-center gap-1.5 focus-ring rounded-sm w-max"
                >
                  <FileWarning className="w-4 h-4" />
                  <span>Known Issues</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-gr-base text-muted">
          <p>© {new Date().getFullYear()} keepware. All rights reserved. 100% On-Device Local Computing.</p>
          <div className="flex items-center gap-4">
            <Link to="/support" className="hover:underline organic-transition focus-ring rounded-sm">Terms</Link>
            <span>•</span>
            <Link to="/support" className="hover:underline organic-transition focus-ring rounded-sm">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
