import React, { useEffect, useState } from 'react';
import { Sparkles, ThumbsUp, Send, CheckCircle2, MessageSquarePlus, Filter, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { INITIAL_UPDATE_REQUESTS } from '../data/appsData';
import { UpdateRequestItem } from '../types';

function getVoterId(): string {
  const key = 'kw_voter_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export const AskForUpdatesSection: React.FC = () => {
  const [voterId] = useState<string>(() => getVoterId());
  const [requests, setRequests] = useState<UpdateRequestItem[]>(INITIAL_UPDATE_REQUESTS);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Feature' | 'Language' | 'Model'>('All');

  // Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<'Feature' | 'Language' | 'Model'>('Feature');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch('/api/feature-requests', { headers: { 'x-voter-id': voterId } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load requests'))))
      .then(({ requests: loaded, votedIds: loadedVotedIds }) => {
        setRequests(loaded);
        setVotedIds(new Set(loadedVotedIds));
      })
      .catch((err) => console.error('Failed to load feature requests:', err));
  }, [voterId]);

  const handleVote = async (id: string) => {
    if (pendingIds.has(id)) return;
    setPendingIds((prev) => new Set(prev).add(id));
    try {
      const res = await fetch(`/api/feature-requests/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voterId }),
      });
      if (!res.ok) throw new Error('Vote failed');
      const { request, voted } = await res.json();
      setRequests((prev) => prev.map((r) => (r.id === id ? request : r)));
      setVotedIds((prev) => {
        const next = new Set(prev);
        if (voted) next.add(id);
        else next.delete(id);
        return next;
      });
    } catch (err) {
      console.error('Failed to vote:', err);
    } finally {
      setPendingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/feature-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          category: newCategory,
          voterId,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit request');
      const { request } = await res.json();

      setRequests((prev) => [request, ...prev]);
      setVotedIds((prev) => new Set(prev).add(request.id));
      setNewTitle('');
      setNewDescription('');
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      console.error('Failed to submit feature request:', err);
    }
  };

  const filteredRequests = selectedFilter === 'All'
    ? requests
    : requests.filter((r) => r.category === selectedFilter);

  return (
    <section id="updates" className="py-16 sm:py-24 px-4 sm:px-6 surface-light border-t border-border/80">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-border text-gr-base font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 " />
            <span>Community Driven Roadmap</span>
          </div>
          <h2 className="font-serif-display text-gr-display font-bold tracking-tight mb-3">
            Ask for Updates & Feature Requests
          </h2>
          <p className="text-gr-base leading-relaxed">
            Every keepware perpetual license includes lifetime core updates. Upvote features you want prioritized or request a new model or language pack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Feature Requests & Upvotes */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-gr-base">
              <span className="text-muted font-semibold flex items-center gap-1">
                <Filter className="w-4 h-4" /> Filter:
              </span>
              {(['All', 'Feature', 'Language', 'Model'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3.5 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    selectedFilter === cat
                      ? 'surface-dark  shadow-xs'
                      : 'surface-light text-muted border border-border hover:border-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List of Requests */}
            {filteredRequests.map((req) => {
              const hasVoted = votedIds.has(req.id);

              return (
                <motion.div
                  key={req.id}
                  layout
                  className="surface-light rounded-2xl p-4 sm:p-5 border border-border/90 shadow-xs flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-gr-base font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-border ">
                        {req.category}
                      </span>
                      <span className="text-gr-base font-semibold px-2.5 py-0.5 rounded-full bg-border text-muted">
                        {req.status}
                      </span>
                      <span className="text-gr-base text-muted font-medium hidden sm:inline">
                        • {req.tag}
                      </span>
                    </div>

                    <h4 className="font-bold text-gr-base mb-1">
                      {req.title}
                    </h4>
                    <p className="text-gr-base leading-relaxed">
                      {req.description}
                    </p>
                  </div>

                  {/* Upvote Button with Bubble Click Animation */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleVote(req.id)}
                    className={`flex flex-col items-center justify-center min-w-[50px] p-2.5 rounded-xl border transition-all cursor-pointer ${
                      hasVoted
                        ? 'surface-dark  border-border shadow-sm'
                        : 'surface-light  border-border hover:border-border'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 mb-0.5 ${hasVoted ? 'fill-current' : ''}`} />
                    <span className="text-gr-base font-bold font-mono">{req.votes}</span>
                  </motion.button>
                </motion.div>
              );
            })}

          </div>

          {/* Right Column: Submit a New Update Request */}
          <div className="lg:col-span-5 surface-light rounded-3xl p-6 sm:p-7 border border-border shadow-md">
            <div className="flex items-center gap-2 text-gr-base font-bold uppercase tracking-wider text-muted mb-1">
              <MessageSquarePlus className="w-4 h-4 " />
              <span>Submit New Request</span>
            </div>
            <h3 className="font-serif-display text-gr-sub font-bold mb-2">
              What should we build next?
            </h3>
            <p className="text-gr-base mb-5">
              Have an idea for a custom workflow, specialized vocabulary model, or editor plugin? Let the keepware team know.
            </p>

            {isSubmitted && (
              <div className="p-3 mb-4 rounded-xl bg-border text-gr-base font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! Your feature request has been posted and logged to the roadmap.</span>
              </div>
            )}

            <form onSubmit={handleSubmitRequest} className="space-y-3.5">
              <div>
                <label className="block text-gr-base font-semibold mb-1">
                  Feature or Update Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Add offline Arabic dialect model"
                  className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                />
              </div>

              <div>
                <label className="block text-gr-base font-semibold mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                >
                  <option value="Feature">Feature & Workflow</option>
                  <option value="Language">Language & Dialect</option>
                  <option value="Model">Model & Quantization</option>
                </select>
              </div>

              <div>
                <label className="block text-gr-base font-semibold mb-1">
                  Details / Why it matters
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe your use case or the specific application you use..."
                  className="w-full px-4 py-2 surface-light border border-border rounded-xl text-gr-base focus:outline-none focus:border-heading-light"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="w-full py-3.5 surface-dark hover:bg-bg font-bold text-gr-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4 " />
                <span>Submit to Roadmap</span>
              </motion.button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
