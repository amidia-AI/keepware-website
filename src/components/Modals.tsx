import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Check,
  Key,
  Send,
  Mail,
  Sparkles,
  Cpu,
  HardDrive,
  Mic,
  Monitor,
  CheckCircle2,
  Lock,
  AppWindow
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TYPEMASTER_APP } from '../data/appsData';
import { AppItem } from '../types';
import { KeepwareLogo } from './KeepwareLogo';

// ========================
// BUY / CHECKOUT MODAL ($19 USD)
// ========================
interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    LemonSqueezy?: { Url?: { Open: (url: string) => void } };
  }
}

export const BuyModal: React.FC<BuyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutOpened, setCheckoutOpened] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const app = TYPEMASTER_APP;
  const priceDisplay = `$${app.priceUsd.toFixed(2)}`;

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isProcessing) return;

    setIsProcessing(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId: app.id, email }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(body?.error?.message || 'Could not start checkout. Please try again.');
      }
      const checkoutUrl: string | undefined = body?.checkoutUrl;
      if (!checkoutUrl) throw new Error('Checkout provider returned no URL. Please try again.');

      const lemon = window.LemonSqueezy;
      if (lemon?.Url?.Open) {
        lemon.Url.Open(checkoutUrl);
        setCheckoutOpened(true);
      } else {
        // lemon.js unavailable (blocked/offline): fall back to full redirect.
        window.location.assign(checkoutUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      console.error('Purchase failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetAndClose = () => {
    setCheckoutOpened(false);
    setIsProcessing(false);
    setEmail('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 bg-bg/65 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="surface-light rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-border relative my-8"
      >
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 text-muted hover:underline p-1.5 rounded-full hover:bg-border transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!checkoutOpened ? (
          <div>
            
            {/* Header Badge */}
            <div className="flex items-center gap-2 text-gr-base font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 " />
              <span>Instant Perpetual License</span>
            </div>

            <h3 className="font-serif-display text-gr-sub font-bold mb-1">
              Get TypeMaster Lifetime
            </h3>
            <p className="text-gr-base mb-5">
              One-time payment of <span className="line-through text-muted mr-1">$23.99</span><span className="font-bold">{priceDisplay} USD</span> (Launch Price). Zero monthly subscriptions ever.
            </p>

            <form onSubmit={handlePurchase} className="space-y-4">
              
              {/* Email Address */}
              <div>
                <label className="block text-gr-base font-semibold mb-1">
                  Email for License Delivery & Updates:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                />
              </div>

              {error && (
                <p className="text-sm font-semibold text-[#B42318] bg-[#B42318]/5 border border-[#B42318]/20 rounded-xl px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-[#0070BA] hover:bg-[#005ea6] text-white disabled:opacity-50 font-bold text-gr-base rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Opening secure checkout...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Pay securely • {priceDisplay} USD</span>
                  </>
                )}
              </motion.button>

            </form>

            <div className="mt-4 text-center text-muted text-xs leading-relaxed">
              Secure checkout by Lemon Squeezy · Card, PayPal or Apple Pay · Taxes handled at checkout
            </div>

          </div>
        ) : (
          /* CHECKOUT OPENED — AWAITING PAYMENT */
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>

            <h3 className="font-serif-display text-gr-sub font-bold mb-1">
              Secure Checkout Opened
            </h3>
            <p className="text-gr-base mb-5">
              Complete your one-time payment of <span className="font-bold">{priceDisplay} USD</span> in the Lemon Squeezy window. Your perpetual license is registered to <span className="font-semibold">{email}</span> the moment payment succeeds.
            </p>

            <div className="surface-light rounded-2xl p-4 border border-border mb-5 text-left text-gr-base text-muted space-y-1.5">
              <p className="font-bold text-text text-sm">After payment:</p>
              <p className="text-xs sm:text-sm">1. Lemon Squeezy emails your receipt automatically.</p>
              <p className="text-xs sm:text-sm">2. Use &quot;License Key Lookup&quot; in the top bar to retrieve your key anytime with this email.</p>
            </div>

            <button
              onClick={handleResetAndClose}
              className="w-full py-3.5 surface-dark font-bold text-gr-base rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </motion.div>
    </div>
  );
};

// ========================
// APP DETAILS & REQUIREMENTS MODAL
// ========================
interface AppDetailsModalProps {
  app: AppItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: () => void;
}

export const AppDetailsModal: React.FC<AppDetailsModalProps> = ({
  app,
  isOpen,
  onClose,
  onBuy,
}) => {
  if (!isOpen || !app) return null;

  const priceDisplay = `$${app.priceUsd.toFixed(2)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 bg-bg/65 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="surface-light rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-border relative my-8 max-h-[90vh] overflow-y-auto"
      >
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-muted hover:underline p-1.5 rounded-full hover:bg-border transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Identity */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl surface-dark flex items-center justify-center shadow-md shrink-0">
            <Mic className="w-8 h-8 " />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-display font-bold text-gr-sub ">
                {app.name}
              </h3>
              <span className="text-gr-base font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-border ">
                {app.badge}
              </span>
            </div>
            <p className="text-gr-base font-semibold text-muted mt-0.5">
              Developed by {app.developer} • {app.version}
            </p>
            <p className="text-gr-base text-muted mt-1">
              Platforms: {app.platforms.join(', ')} • Size: {app.size}
            </p>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-6">
          <h4 className="text-gr-base font-bold uppercase tracking-wider text-muted mb-1.5">
            Architecture & Privacy Guarantee
          </h4>
          <p className="text-gr-base leading-relaxed">
            {app.longDescription}
          </p>
        </div>

        {/* Minimum System Requirements Box */}
        <div className="surface-light rounded-2xl p-5 border border-border/90 mb-6">
          <h4 className="text-gr-base font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 " />
            <span>Minimum System Requirements</span>
          </h4>
          
          <ul className="space-y-2.5 text-gr-base ">
            <li className="flex items-start gap-2">
              <strong className="min-w-[85px] ">OS:</strong>
              <span>{app.systemRequirements.os}</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="min-w-[85px] ">RAM:</strong>
              <span>{app.systemRequirements.ram}</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="min-w-[85px] ">Processor:</strong>
              <span>{app.systemRequirements.processor}</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="min-w-[85px] ">GPU/Accel:</strong>
              <span>{app.systemRequirements.gpuAcceleration}</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="min-w-[85px] ">Storage:</strong>
              <span>{app.systemRequirements.storage}</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="min-w-[85px] ">Network:</strong>
              <span className="font-semibold text-text">{app.systemRequirements.network}</span>
            </li>
          </ul>
        </div>

        {/* Features list */}
        <div className="mb-6">
          <h4 className="text-gr-base font-bold uppercase tracking-wider text-muted mb-2.5">
            Key Capabilities
          </h4>
          <ul className="space-y-2 text-gr-base ">
            {app.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Getting Started Guide */}
        <div className="mb-6">
          <h4 className="text-gr-base font-bold uppercase tracking-wider text-muted mb-2.5">
            How to use {app.name} {app.version}
          </h4>
          <ol className="space-y-3 text-gr-base">
            {app.usageGuide.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <span className="font-mono font-bold text-muted shrink-0">{item.step}</span>
                <span>
                  <strong className="block">{item.title}</strong>
                  <span className="text-muted">{item.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-gr-base font-semibold text-muted uppercase block">Perpetual License</span>
            <span className="font-serif-display font-bold text-gr-sub ">{priceDisplay}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="py-2.5 px-4 bg-border hover:bg-bg text-gr-base font-semibold rounded-xl cursor-pointer"
            >
              Close
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onClose();
                onBuy();
              }}
              className="py-3 px-6 surface-dark hover:bg-bg text-gr-base font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 " />
              <span>Get License ({priceDisplay})</span>
            </motion.button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

// ========================
// SUBMIT APP MODAL (FOR INDIE DEVS)
// ========================
interface SubmitAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitAppModal: React.FC<SubmitAppModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    appName: '',
    developerName: '',
    email: '',
    url: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/app-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit app');
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit app:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 bg-bg/65 backdrop-blur-xs overflow-y-auto">
      <div className="surface-light rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-border relative animate-in fade-in zoom-in-95 duration-200 my-8">
        
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-muted hover:underline p-1.5 rounded-full hover:bg-border transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-gr-base font-bold uppercase tracking-wider text-muted mb-1">
              <Send className="w-4 h-4 " />
              <span>Indie Software Curation</span>
            </div>

            <h3 className="font-serif-display text-gr-sub font-bold mb-1">
              Submit Your App to keepware
            </h3>
            <p className="text-gr-base mb-5">
              We are curating high-quality, local-first apps to expand beyond TypeMaster. 90% revenue share to creators.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gr-base font-semibold mb-1">App Name</label>
                  <input
                    type="text"
                    required
                    value={formData.appName}
                    onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                    placeholder="e.g. LocalStudio"
                    className="w-full px-3.5 py-2 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                  />
                </div>
                <div>
                  <label className="block text-gr-base font-semibold mb-1">Creator / Studio</label>
                  <input
                    type="text"
                    required
                    value={formData.developerName}
                    onChange={(e) => setFormData({ ...formData, developerName: e.target.value })}
                    placeholder="e.g. Apex Labs"
                    className="w-full px-3.5 py-2 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gr-base font-semibold mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="dev@domain.com"
                  className="w-full px-3.5 py-2 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                />
              </div>

              <div>
                <label className="block text-gr-base font-semibold mb-1">Website or Repository</label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                />
              </div>

              <div>
                <label className="block text-gr-base font-semibold mb-1">How does it run locally / offline?</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explain how it operates on-device without cloud telemetry..."
                  className="w-full px-3.5 py-2 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 surface-dark hover:bg-bg font-bold text-gr-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <Send className="w-4 h-4 " />
                <span>Submit for Batch Curation</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-gr-sub font-bold mb-1">
              Submission Received!
            </h3>
            <p className="text-gr-base mb-5">
              Thank you for building local-first software. Our review team will test your build and reach out soon.
            </p>
            <button
              onClick={handleClose}
              className="py-3 px-6 surface-dark text-gr-base font-bold rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

// ========================
// AUTH & LICENSE LOOKUP MODAL
// ========================
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [isLookingUp, setIsLookingUp] = useState(false);

  if (!isOpen) return null;

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLookingUp) return;
    setIsLookingUp(true);
    try {
      const res = await fetch(`/api/licenses?email=${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error('Lookup failed');
      setSent(true);
    } catch (err) {
      console.error('License lookup failed:', err);
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleClose = () => {
    setSent(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 sm:p-6 bg-bg/65 backdrop-blur-xs overflow-y-auto">
      <div className="surface-light rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-border relative animate-in fade-in zoom-in-95 duration-200 my-8">
        
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-muted hover:underline p-1.5 rounded-full hover:bg-border transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!sent ? (
          <div>
            <div className="w-11 h-11 rounded-2xl surface-dark flex items-center justify-center p-2 mb-3 shadow-xs">
              <KeepwareLogo className="w-full h-full " veinColor="var(--bg)" />
            </div>

            <h3 className="font-serif-display text-gr-sub font-bold mb-1">
              Find Your License Keys
            </h3>
            <p className="text-gr-base mb-5">
              Enter the email address you used at checkout to receive your perpetual license keys and direct installer download links.
            </p>

            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label className="block text-gr-base font-semibold mb-1">
                  Purchase Email:
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 surface-dark hover:bg-bg font-bold text-gr-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 " />
                <span>Send My License Links</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-gr-sub font-bold mb-1">
              License Link Dispatched!
            </h3>
            <p className="text-gr-base mb-5">
              We've dispatched all active keys associated with <span className="font-semibold ">{email}</span>. Check your inbox!
            </p>
            <button
              onClick={handleClose}
              className="py-3 px-6 surface-dark text-gr-base font-bold rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
