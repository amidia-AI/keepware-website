import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Code2, HelpCircle, Route, FileWarning, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { KeepwareLogo } from './KeepwareLogo';
import { FEATURED_APP } from '../data/appsData';

interface NavbarProps {
  onOpenBuyModal: () => void;
  onOpenAuthModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBuyModal, onOpenAuthModal }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/typemaster') || location.pathname.startsWith(`/${FEATURED_APP.id}`);

  // Close dropdown and mobile menu on route change
  useEffect(() => {
    setIsServicesOpen(false);
    setIsMobileOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesOpen]);

  const serviceItems = [
    {
      label: 'Custom Work',
      to: '/custom-work',
      icon: Code2,
      type: 'link' as const,
    },
    {
      label: 'Support',
      to: '/support',
      icon: HelpCircle,
      type: 'link' as const,
    },
    {
      label: 'Roadmap',
      to: '/roadmap',
      icon: Route,
      type: 'link' as const,
    },
    {
      label: 'Known Issues',
      to: '/docs/known-issues',
      icon: FileWarning,
      type: 'link' as const,
    },
    {
      label: 'License Key Lookup',
      icon: User,
      type: 'action' as const,
      onClick: () => {
        setIsServicesOpen(false);
        setIsMobileOpen(false);
        onOpenAuthModal?.();
      },
    },
  ];

  return (
    <>
      <header className="fixed top-3 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
        <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto surface-dark glass-pill rounded-full px-4 sm:px-6 py-2.5 shadow-pill organic-transition relative">
          
          {/* Brand Logo - keepware */}
          <Link to="/" className="flex items-center gap-2.5 group focus-ring rounded-full">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 4 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-full surface-light bg-bg flex items-center justify-center shadow-sm shrink-0 p-1.5"
            >
              <KeepwareLogo className="w-full h-full " veinColor="#F5F1E8" />
            </motion.div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif-display font-bold text-gr-sub tracking-tight">
                keepware
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-gr-base font-medium text-muted">
            <Link
              to={`/${FEATURED_APP.id}`}
              className="hover:underline organic-transition focus-ring rounded-md px-1 flex items-center gap-1.5"
              title={`Featured: ${FEATURED_APP.name}`}
            >
              <span>Featured Product</span>
            </Link>
            <Link to={`/${FEATURED_APP.id}#how-it-works`} className="hover:underline organic-transition focus-ring rounded-md px-1">
              How it works
            </Link>
            <Link to={`/${FEATURED_APP.id}#pricing`} className="hover:underline organic-transition focus-ring rounded-md px-1">
              Pricing
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-gr-base font-medium organic-transition focus-ring cursor-pointer ${
                  isServicesOpen ? 'bg-border text-text' : 'hover:underline text-muted'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isServicesOpen ? 'rotate-180 text-text' : 'text-muted'
                  }`}
                />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 surface-dark rounded-2xl p-1.5 border border-border shadow-2xl z-50 backdrop-blur-md"
                  >
                    <div className="flex flex-col gap-0.5">
                      {serviceItems.map((item) => {
                        const Icon = item.icon;
                        if (item.type === 'link' && item.to) {
                          return (
                            <Link
                              key={item.label}
                              to={item.to}
                              onClick={() => setIsServicesOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-gr-base font-medium text-muted hover:text-text hover:bg-border organic-transition focus-ring"
                            >
                              <Icon className="w-4 h-4 shrink-0 text-muted" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        }

                        return (
                          <button
                            key={item.label}
                            type="button"
                            onClick={item.onClick}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gr-base font-medium text-muted hover:text-text hover:bg-border organic-transition text-left cursor-pointer focus-ring"
                          >
                            <Icon className="w-4 h-4 shrink-0 text-muted" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Action Button */}
            {isProductPage ? (
              <button
                onClick={onOpenBuyModal}
                className="hidden sm:flex bg-btn-bg hover:opacity-90 text-gr-base font-semibold px-5 py-2 rounded-full organic-transition shadow-sm items-center justify-center focus-ring text-btn-text"
              >
                Buy {FEATURED_APP.name} — ${FEATURED_APP.priceUsd}
              </button>
            ) : (
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="email"]') as HTMLInputElement | null;
                  if (input) {
                    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    input.focus();
                  }
                }}
                className="hidden sm:flex bg-btn-bg hover:opacity-90 text-gr-base font-semibold px-4 py-1.5 rounded-full organic-transition shadow-sm items-center justify-center focus-ring text-btn-text text-sm"
              >
                Get Updates
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-1.5 rounded-full hover:bg-border organic-transition focus-ring text-muted"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
              className="md:hidden max-w-5xl mx-auto mt-2 surface-dark glass-pill rounded-2xl p-4 shadow-pill pointer-events-auto organic-transition border border-border"
            >
              <div className="flex flex-col gap-1 text-gr-base font-medium text-muted">
                <Link
                  to={`/${FEATURED_APP.id}`}
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 px-3 hover:underline focus-ring rounded-lg hover:bg-border flex items-center justify-between"
                >
                  <span>Featured Product</span>
                  <span className="text-xs bg-border px-2 py-0.5 rounded-full text-muted">{FEATURED_APP.name}</span>
                </Link>
                <Link
                  to={`/${FEATURED_APP.id}#how-it-works`}
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 px-3 hover:underline focus-ring rounded-lg hover:bg-border"
                >
                  How it works
                </Link>
                <Link
                  to={`/${FEATURED_APP.id}#pricing`}
                  onClick={() => setIsMobileOpen(false)}
                  className="py-2 px-3 hover:underline focus-ring rounded-lg hover:bg-border"
                >
                  Pricing
                </Link>

                {/* Mobile Services Accordion */}
                <div className="pt-2 border-t border-border mt-1">
                  <button
                    type="button"
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-border text-left font-semibold text-text"
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isMobileServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-2 flex flex-col gap-1 pt-1"
                      >
                        {serviceItems.map((item) => {
                          const Icon = item.icon;
                          if (item.type === 'link' && item.to) {
                            return (
                              <Link
                                key={item.label}
                                to={item.to}
                                onClick={() => setIsMobileOpen(false)}
                                className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-border text-muted hover:text-text organic-transition text-sm"
                              >
                                <Icon className="w-4 h-4 shrink-0 text-muted" />
                                <span>{item.label}</span>
                              </Link>
                            );
                          }

                          return (
                            <button
                              key={item.label}
                              type="button"
                              onClick={item.onClick}
                              className="w-full flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-border text-muted hover:text-text organic-transition text-left text-sm cursor-pointer"
                            >
                              <Icon className="w-4 h-4 shrink-0 text-muted" />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-3 border-t border-border mt-2">
                  {isProductPage ? (
                    <button
                      onClick={() => {
                        setIsMobileOpen(false);
                        onOpenBuyModal();
                      }}
                      className="w-full bg-btn-bg text-btn-text font-bold py-2.5 rounded-full shadow-md text-center"
                    >
                      Buy {FEATURED_APP.name} — ${FEATURED_APP.priceUsd}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMobileOpen(false);
                        const input = document.querySelector('input[type="email"]') as HTMLInputElement | null;
                        if (input) {
                          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          input.focus();
                        }
                      }}
                      className="w-full bg-btn-bg text-btn-text font-bold py-2.5 rounded-full shadow-md text-center"
                    >
                      Get Updates
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
