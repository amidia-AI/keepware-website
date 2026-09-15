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

  const priceDisplay = app.priceUsd === 0 ? 'Free' : `$${app.priceUsd.toFixed(2)}`;

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
            <span className="text-gr-base font-semibold text-muted uppercase block">Price</span>
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
              <span>Download Now ({priceDisplay})</span>
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
