import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Sparkles, 
  Type, 
  Globe, 
  Download, 
  Copy, 
  Check,
  Loader2,
  FileText,
  Save
} from 'lucide-react';

interface TranscriptEditorProps {
  transcript: any;
  onBack: () => void;
  onUpdate: (updatedData: any) => void;
}

export function TranscriptEditor({ transcript, onBack, onUpdate }: TranscriptEditorProps) {
  const [content, setContent] = useState(transcript.content);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSummarize = async () => {
    setIsProcessing('summary');
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content }),
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleTranslate = async (lang: string) => {
    setIsProcessing('translate');
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: content, targetLanguage: lang }),
      });
      const data = await response.json();
      setTranslation(data.translation);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSave = () => {
    onUpdate({ ...transcript, content });
  };

  const downloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${transcript.title}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-[#E4E3E0] overflow-hidden">
      <header className="h-20 lg:h-24 shrink-0 bg-[#050505] border-b border-white/5 flex items-center justify-between px-4 lg:px-10">
        <div className="flex items-center gap-3 lg:gap-8 min-w-0">
          <button 
            onClick={onBack}
            className="shrink-0 w-8 h-8 lg:w-10 lg:h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            <ChevronLeft size={14} />
          </button>
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg lg:text-2xl font-serif italic truncate">{transcript.title}</h1>
            <p className="text-[8px] lg:text-[9px] text-[#E4E3E0]/40 font-mono uppercase tracking-[0.3em]">{transcript.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
          <button 
            onClick={handleSave}
            className="p-2 lg:px-6 lg:py-2.5 border border-white/10 rounded-lg text-[10px] uppercase tracking-[0.2em] font-mono hover:bg-white/5 transition-all flex items-center gap-3"
            title="Commit Changes"
          >
            <Save size={14} />
            <span className="hidden lg:inline">Commit</span>
          </button>
          <button 
            onClick={downloadTxt}
            className="p-2 lg:px-6 lg:py-2.5 bg-white text-black rounded-lg text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-3"
            title="Export Archive"
          >
            <Download size={14} />
            <span className="hidden lg:inline">Export</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 bg-[#080808]">
          <div className="max-w-4xl mx-auto relative group">
            <div className="absolute right-0 -top-6 lg:-top-8 flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] lg:text-[10px] font-mono uppercase tracking-widest hidden sm:inline">Editor Mode</span>
              <button 
                onClick={handleCopy}
                className="hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                {isCopied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
            
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[50vh] lg:min-h-[70vh] bg-transparent border-none focus:ring-0 text-sm md:text-base leading-relaxed text-[#E4E3E0]/90 resize-none font-mono selection:bg-white selection:text-black"
              spellCheck={false}
            />
          </div>
        </main>

        <aside className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l border-white/5 bg-[#050505] overflow-y-auto p-6 lg:p-10 space-y-8 lg:space-y-12">
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 flex items-center gap-3 border-b border-white/5 pb-4">
              <Sparkles size={14} className="text-blue-400" />
              Intelligence Analysis
            </h3>
            
            <button 
              onClick={handleSummarize}
              disabled={!!isProcessing}
              className="w-full p-8 bg-white/5 border border-white/5 rounded-xl text-left hover:bg-white/10 transition-all group disabled:opacity-50"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-serif italic">Synthesize Intelligence</span>
                {isProcessing === 'summary' && <Loader2 className="animate-spin opacity-40" size={14} />}
              </div>
              <p className="text-[10px] uppercase tracking-wider text-white/30 leading-relaxed font-mono">
                Process transcript for key objectives, logistics, and personnel identifies.
              </p>
            </button>

            {summary && (
              <div className="p-8 bg-white/5 border border-white/5 rounded-xl animate-in fade-in slide-in-from-right-4">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-6 opacity-40">System_Summary.log</h4>
                <div className="text-xs text-[#E4E3E0]/80 leading-relaxed italic whitespace-pre-wrap font-serif">
                  {summary}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 pt-12 border-t border-white/5">
            <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 flex items-center gap-3 border-b border-white/5 pb-4">
              <Globe size={14} className="text-emerald-400" />
              Language Decryption
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <LangButton lang="Spanish" onClick={() => handleTranslate('Spanish')} active={isProcessing === 'translate'} />
              <LangButton lang="French" onClick={() => handleTranslate('French')} active={isProcessing === 'translate'} />
              <LangButton lang="German" onClick={() => handleTranslate('German')} active={isProcessing === 'translate'} />
              <LangButton lang="Hindi" onClick={() => handleTranslate('Hindi')} active={isProcessing === 'translate'} />
            </div>

            {translation && (
              <div className="p-8 bg-white/5 border border-white/5 rounded-xl animate-in fade-in slide-in-from-right-4">
                <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] mb-6 opacity-40">Decrypted_Stream.log</h4>
                <p className="text-xs text-[#E4E3E0]/80 leading-relaxed font-mono italic">{translation}</p>
              </div>
            )}
          </div>

          <div className="pt-12 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] leading-relaxed">
            Note: All intelligence data is processed via zero-knowledge Gemini-3 protocols. No human access permitted.
          </div>
        </aside>
      </div>
    </div>
  );
}

function LangButton({ lang, onClick, active }: { lang: string, onClick: () => void, active: boolean }) {
  return (
    <button 
      onClick={onClick}
      disabled={active}
      className="px-4 py-3 bg-white/5 border border-white/5 rounded-lg text-[9px] uppercase tracking-[0.2em] font-mono text-white/40 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
    >
      {lang}
    </button>
  );
}
