import React from 'react';
import { AskForUpdatesSection } from '../components/AskForUpdatesSection';

export default function RoadmapPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="font-serif-display text-gr-display font-bold tracking-tight mb-4">
          Community Roadmap
        </h1>
        <p className="text-gr-base ">
          Upvote the features you want prioritized or request a new integration.
        </p>
      </div>
      <AskForUpdatesSection />
    </div>
  );
}
