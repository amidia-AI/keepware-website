import React, { useState } from 'react';
import { SubmitAppSection } from '../components/SubmitAppSection';
import { SubmitAppModal } from '../components/Modals';

export default function ForDevelopersPage() {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 sm:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="font-serif-display text-gr-display font-bold tracking-tight mb-4">
          Indie Developer Curation
        </h1>
        <p className="text-gr-base ">
          Submit your subscription-free desktop utility to the keepware storefront.
        </p>
      </div>
      
      <div className="rounded-3xl overflow-hidden max-w-5xl mx-auto w-full">
        <SubmitAppSection onOpenSubmitModal={() => setIsSubmitModalOpen(true)} />
      </div>

      <SubmitAppModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
}
