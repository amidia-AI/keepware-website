import React from 'react';
import { FileWarning, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function KnownIssuesPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto w-full">
        <Link to="/support" className="text-muted hover:underline mb-8 inline-block font-mono text-sm">
          &larr; Back to Support
        </Link>
        <h1 className="font-serif-display text-display font-bold mb-6 flex items-center gap-3">
          <FileWarning className="w-8 h-8 text-btn-bg" />
          Known Issues
        </h1>
        <p className="text-gr-title text-muted mb-12">
          Transparent tracking of current bugs, workarounds, and their patch status for all keepware applications.
        </p>

        <div className="space-y-8">
          {/* Issue 1 */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-xl font-bold ">TypeMaster: AMD GPU High Idle Usage</h3>
              <span className="bg-border text-btn-bg px-3 py-1 rounded-full text-sm font-bold font-mono shrink-0">
                In Progress
              </span>
            </div>
            <p className="text-muted mb-4">
              On certain RX 7000 series GPUs, the DirectML execution provider does not fully release memory when idle, leading to ~2% constant GPU utilization even when not dictating.
            </p>
            <div className="bg-border border border-border rounded-lg p-4 flex gap-3">
              <Info className="w-5 h-5 text-muted shrink-0 mt-0.5" />
              <p className="text-sm text-muted">
                <strong className="">Workaround:</strong> Restart the TypeMaster application process if you notice elevated temperatures over a 12-hour period. Fix expected in v1.4.3.
              </p>
            </div>
          </div>

          {/* Issue 2 */}
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <h3 className="text-xl font-bold ">TypeMaster: Missing punctuation in loud environments</h3>
              <span className="bg-border text-muted px-3 py-1 rounded-full text-sm font-bold font-mono shrink-0">
                Investigating
              </span>
            </div>
            <p className="text-muted mb-4">
              When background noise exceeds ~70dB (like in a crowded cafe), the neural net struggles to identify prosody pauses, resulting in missing periods and commas.
            </p>
            <div className="bg-border border border-border rounded-lg p-4 flex gap-3">
              <Info className="w-5 h-5 text-muted shrink-0 mt-0.5" />
              <p className="text-sm text-muted">
                <strong className="">Workaround:</strong> Explicitly dictate the words "period" or "comma" when in loud environments until the next acoustic model update.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
