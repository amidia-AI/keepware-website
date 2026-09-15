import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AppDetailsModal } from './components/Modals';
import { TYPEMASTER_APP } from './data/appsData';
import { downloadTypeMaster } from './lib/typemasterDownload';

// Pages
import HomePage from './pages/HomePage';
import TypeMasterPage from './pages/TypeMasterPage';
import SupportPage from './pages/SupportPage';
import RoadmapPage from './pages/RoadmapPage';
import CustomWorkPage from './pages/CustomWorkPage';
import ForDevelopersPage from './pages/ForDevelopersPage';
import KnownIssuesPage from './pages/KnownIssuesPage';

/**
 * Scrolls to the hash target on navigation, or to the top when there is no hash.
 * Without this a SPA route change keeps the previous scroll position and
 * cross-page anchors like /typemaster#pricing never scroll anywhere.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Let the destination route paint before looking for the target.
      const id = hash.slice(1);
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="min-h-screen relative flex flex-col">
        <div className="noise-overlay"></div>
        {/* Sticky Floating Navbar */}
        <Navbar
          onDownload={downloadTypeMaster}
        />
        <main className="flex-1 relative z-10 pb-24 sm:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/typemaster" element={
              <TypeMasterPage 
                onDownload={downloadTypeMaster}
                onOpenDetailsModal={() => setIsDetailsModalOpen(true)}
              />
            } />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/custom-work" element={<CustomWorkPage />} />
            <Route path="/for-developers" element={<ForDevelopersPage />} />
            <Route path="/docs/known-issues" element={<KnownIssuesPage />} />
          </Routes>
        </main>
        <Footer />
        
        {/* Global Modals */}
        <AppDetailsModal
          app={TYPEMASTER_APP}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onBuy={() => {
            setIsDetailsModalOpen(false);
            downloadTypeMaster();
          }}
        />
      </div>
    </BrowserRouter>
  );
}
