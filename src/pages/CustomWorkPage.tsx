import React from 'react';
import { RequestProjectSection } from '../components/RequestProjectSection';

export default function CustomWorkPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="font-serif-display text-gr-display font-bold tracking-tight mb-4">
          Custom Engineering
        </h1>
        <p className="text-gr-base ">
          Hire our team for bespoke local-first software development.
        </p>
      </div>
      <RequestProjectSection />
    </div>
  );
}
