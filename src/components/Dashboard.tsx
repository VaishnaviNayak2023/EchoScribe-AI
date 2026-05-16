import React, { useState } from 'react';
import { 
  Plus, 
  Mic, 
  Upload, 
  Search, 
  History, 
  Settings, 
  LogOut,
  FileAudio,
  MoreVertical,
  Trash2,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { AudioRecorder } from './AudioRecorder';
import { TranscriptEditor } from './TranscriptEditor';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'history' | 'record'>('history');
  const [selectedTranscript, setSelectedTranscript] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<any[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleTranscribed = (transcript: string) => {
    const newEntry = {
      id: Date.now().toString(),
      title: `LOG_${Date.now()}`,
      date: new Date().toLocaleString(),
      content: transcript,
    };
    setTranscripts([newEntry, ...transcripts]);
    setSelectedTranscript(newEntry.id);
    setActiveTab('history');
  };

  const currentTranscript = transcripts.find(t => t.id === selectedTranscript);

  if (selectedTranscript && currentTranscript) {
    return (
      <TranscriptEditor 
        transcript={currentTranscript}
        onBack={() => setSelectedTranscript(null)}
        onUpdate={(updatedData: any) => {
          setTranscripts(prev => prev.map(t => t.id === updatedData.id ? updatedData : t));
        }}
      />
    );
  }

  return (
    <div className="flex h-screen bg-[#050505] text-[#E4E3E0] relative">
      {/* Sidebar - Desktop and Mobile Overlay */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 border-r border-white/5 flex flex-col bg-[#080808] transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium opacity-60">Session.Live</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden opacity-40 hover:opacity-100">
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-2">
          <SidebarLink 
            icon={<Plus size={14} />} 
            label="Initialize Log" 
            active={activeTab === 'record'} 
            onClick={() => { setActiveTab('record'); setIsSidebarOpen(false); }}
          />
          <SidebarLink 
            icon={<History size={14} />} 
            label="Database" 
            active={activeTab === 'history'} 
            onClick={() => { setActiveTab('history'); setIsSidebarOpen(false); }}
          />
          <SidebarLink icon={<Settings size={14} />} label="System Config" />
        </nav>

        <div className="p-6 border-t border-white/5 bg-[#050505]">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-[10px] uppercase tracking-[0.2em] font-mono opacity-40 hover:opacity-100 hover:text-red-400 transition-all"
          >
            <LogOut size={14} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-20 shrink-0 border-b border-white/5 bg-[#050505] flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 opacity-40 hover:opacity-100">
              <Menu size={18} />
            </button>
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-mono opacity-40">
              {activeTab === 'history' ? '// INDEX_VAULT' : '// NEW_ENTRY_STREAM'}
            </h2>
          </div>
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-20" size={12} />
              <input 
                type="text" 
                placeholder="Query database..." 
                className="pl-10 pr-4 py-2 bg-transparent border-none text-[10px] uppercase tracking-[0.2em] font-mono focus:ring-0 w-64 opacity-40 focus:opacity-100 transition-opacity"
              />
            </div>
            <div className="text-[9px] font-mono opacity-20 truncate max-w-[80px] lg:max-w-none">00:14:22:04</div>
          </div>
        </header>

        <div className="p-6 lg:p-10 overflow-y-auto flex-1 pb-24 lg:pb-10">
          {activeTab === 'record' ? (
            <div className="max-w-3xl mx-auto py-4 lg:py-12">
              <AudioRecorder onTranscribed={handleTranscribed} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
              {transcripts.length === 0 ? (
                <div className="col-span-full py-20 lg:py-40 text-center border border-dashed border-white/5 rounded-2xl">
                  <div className="text-[10px] font-mono opacity-20 uppercase tracking-[0.5em] mb-4">Vault Empty</div>
                  <p className="text-[10px] font-mono opacity-10">No intelligence logs found in current session.</p>
                </div>
              ) : (
                transcripts.map((t) => (
                  <div 
                    key={t.id}
                    onClick={() => setSelectedTranscript(t.id)}
                    className="p-6 lg:p-8 bg-[#080808] border border-white/5 hover:border-white/20 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="text-[10px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">
                        ID: {t.id}
                      </div>
                      <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                    </div>
                    <h4 className="text-xl font-serif italic mb-2">{t.title}</h4>
                    <p className="text-[9px] font-mono opacity-30 mb-8 uppercase tracking-widest">{t.date}</p>
                    <p className="text-[11px] leading-relaxed opacity-40 line-clamp-4 font-mono group-hover:opacity-80 transition-opacity">
                      {t.content}
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-mono uppercase tracking-widest">Open Archive</span>
                      <ExternalLink size={12} className="opacity-40" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-4 px-6 py-4 w-full text-[10px] uppercase tracking-[0.3em] font-mono transition-all border-l-2 ${
        active 
          ? 'bg-white/5 border-white text-white opacity-100' 
          : 'border-transparent opacity-40 hover:opacity-100 hover:bg-white/5'
      }`}
    >
      <span className={active ? 'text-white' : 'opacity-40'}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
