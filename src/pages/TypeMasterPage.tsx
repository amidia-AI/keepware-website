import React from 'react';
import { Hero } from '../components/typemaster/Hero';
import { ProofSection } from '../components/typemaster/ProofSection';
import { TheProblem } from '../components/typemaster/TheProblem';
import { ComparisonTable } from '../components/typemaster/ComparisonTable';
import { ProductDemo } from '../components/typemaster/ProductDemo';
import { UsageGuide } from '../components/typemaster/UsageGuide';
import { WhyLocalFirst } from '../components/typemaster/WhyLocalFirst';
import { FaqSection } from '../components/typemaster/FaqSection';
import { FinalCta } from '../components/typemaster/FinalCta';

interface TypeMasterPageProps {
  onOpenBuyModal: () => void;
  onOpenDetailsModal?: () => void;
}

export default function TypeMasterPage({ onOpenBuyModal, onOpenDetailsModal }: TypeMasterPageProps) {
  // Use anchor links for modal instead if preferred, but keeping prop drilling for simplicity
  return (
    <div className="flex flex-col w-full relative">
      <Hero onOpenBuyModal={onOpenBuyModal} onOpenDetailsModal={onOpenDetailsModal || (() => {})} />
      <ProofSection />
      <TheProblem />
      <ComparisonTable />
      <ProductDemo />
      <UsageGuide />
      <WhyLocalFirst />
      <FaqSection />
      <FinalCta onOpenBuyModal={onOpenBuyModal} />
    </div>
  );
}

