import React from 'react';

export const TheProblem: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif-display text-display tracking-tight mb-6">
          Cloud dictation tools are broken.
        </h2>
        <p className="text-gr-title leading-relaxed">
          Sending your microphone audio to external servers exposes your private conversations to data harvesting. It introduces noticeable network lag that breaks your typing flow, and locks your own hardware behind a $12/month subscription paywall for a feature your PC can already run locally.
        </p>
      </div>
    </section>
  );
};
