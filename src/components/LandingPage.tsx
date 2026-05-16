import React from 'react';
import { Mic, Zap, Globe, FileText, ChevronRight, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="bg-[#050505] min-h-screen text-[#E4E3E0] selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-10 py-8 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-60">System.Secure.Active</span>
        </div>
        <div className="hidden md:flex space-x-12">
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">Vault</a>
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">Protocol</a>
          <a href="#" className="text-[10px] uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">Audit Log</a>
        </div>
        <button 
          onClick={onStart}
          className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center bg-black hover:scale-105 active:scale-95 transition-all group"
        >
          <Play size={14} fill="white" className="ml-0.5 text-white" />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-10 pt-32 pb-40">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-4 py-1 border border-white/10 rounded-full text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-12"
          >
            [ Intelligence Engine Core v2.5 ]
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-9xl font-serif italic tracking-tighter leading-none mb-12"
          >
            EchoScribe <span className="opacity-40">AI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto text-sm md:text-base font-mono opacity-40 leading-relaxed mb-16 tracking-tight"
          >
            Encrypted transcription. Stealth multi-speaker diarization. 
            Automated intelligence summaries for secure communication.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center items-center gap-8"
          >
            <button 
              onClick={onStart}
              className="px-10 py-5 bg-white text-black rounded-lg font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center gap-4 group"
            >
              Begin Session
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all flex items-center gap-3">
              <Play size={14} fill="currentColor" />
              View Protocol
            </button>
          </motion.div>
        </div>

        {/* Minimal Feature Grid */}
        <div className="grid md:grid-cols-3 gap-1 px-4 mt-32 border-t border-white/5 pt-12">
          <FeatureCard 
            title="Cloak Engine"
            description="Undetectable recording interface optimized for high-pressure environments."
          />
          <FeatureCard 
            title="Gemini Analysis"
            description="Real-time contextual processing with 99.8% semantic accuracy."
          />
          <FeatureCard 
            title="Vault Storage"
            description="Zero-knowledge encryption for your most sensitive intelligence logs."
          />
        </div>
      </main>

      <footer className="px-10 py-12 border-t border-white/5 flex justify-between items-center opacity-20">
        <div className="text-[10px] font-mono tracking-widest uppercase">© 2026 Echoscribe Pro</div>
        <div className="flex gap-8 text-[10px] font-mono tracking-widest uppercase">
          <span>Encrypted</span>
          <span>Anonymous</span>
          <span>Verified</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="p-12 group">
      <h3 className="text-xs font-mono uppercase tracking-[0.4em] mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
        {title}
      </h3>
      <p className="text-xs leading-relaxed opacity-30 group-hover:opacity-60 transition-opacity">
        {description}
      </p>
    </div>
  );
}
