import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Loader2, Upload, AlertCircle } from 'lucide-react';

interface AudioRecorderProps {
  onTranscribed: (transcript: string) => void;
}

export function AudioRecorder({ onTranscribed }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await handleUpload(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
      
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } catch (err) {
      setError('Could not access microphone. Protocol failure.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setDuration(0);
    }
  };

  const handleUpload = async (blob: Blob) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('audio', blob, 'recording.wav');

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Transcription failed');
      
      const data = await response.json();
      onTranscribed(data.transcript);
    } catch (err) {
      setError('Intelligence extraction failed. API unreachable.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-12">
      <div className="bg-[#080808] border border-white/5 p-8 lg:p-20 text-center relative overflow-hidden group min-h-[400px] flex flex-col justify-center">
        {/* Disguise Labels */}
        <div className="absolute top-6 lg:top-12 left-6 lg:left-12 text-left">
          <h2 className="text-[8px] lg:text-[10px] uppercase tracking-[0.4em] opacity-40 mb-1 lg:mb-2">Disguise Interface</h2>
          <p className="text-[8px] lg:text-[10px] font-mono opacity-80 underline underline-offset-2 lg:underline-offset-4 decoration-white/20">Render: Stealth_Clock_v4</p>
        </div>

        {/* Status Indicator - Subtle dot that looks like part of the clock design */}
        <div className="absolute top-12 right-12 flex items-center gap-2 lg:gap-3">
          <div className={`w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full transition-colors duration-500 ${isRecording ? 'bg-white/10' : 'bg-white/5'}`} />
          <span className="text-[8px] lg:text-[9px] font-mono tracking-widest opacity-10 uppercase transition-opacity">
            {isRecording ? 'Encrypted' : 'Standby'}
          </span>
        </div>

        {/* Minimalist Clock - Always shows real time for stealth */}
        <div className="py-8 lg:py-12">
          <h1 className="text-6xl lg:text-[120px] font-serif italic tracking-tighter leading-none mb-2 lg:mb-4 selection:bg-transparent transition-all">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </h1>
          <p className="text-[8px] lg:text-[10px] uppercase tracking-[0.5em] lg:tracking-[1em] opacity-30">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
        </div>

        {/* Discreet Waveform - Very subtle, looks like static design even when recording */}
        <div className="mt-8 lg:mt-16 flex items-center justify-center space-x-1 lg:space-x-1.5 h-12 lg:h-16">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i}
              className="w-[1px] bg-white/20 transition-all duration-1000"
              style={{ 
                height: isRecording ? `${20 + Math.random() * 20}%` : '8px',
                opacity: isRecording ? 0.15 : 0.05
              }}
            />
          ))}
        </div>

        {/* Stealth Controls */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
          {!isRecording ? (
            <button 
              onClick={startRecording}
              disabled={isProcessing}
              className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all group/btn disabled:opacity-50"
            >
              <Mic size={32} className="opacity-60 group-hover/btn:opacity-100" />
            </button>
          ) : (
            <button 
              onClick={stopRecording}
              className="w-24 h-24 rounded-full border border-red-500/20 bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all group/btn"
            >
              <Square size={32} />
            </button>
          )}
        </div>

        {isProcessing && (
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white/40">
            <Loader2 className="animate-spin" size={14} />
            <span className="text-[10px] font-mono tracking-widest uppercase">Gemini Initializing Handshake...</span>
          </div>
        )}
      </div>

      <div className="text-center flex justify-center gap-12">
        <label className="cursor-pointer text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all flex items-center gap-3">
          <Upload size={14} />
          Import File
          <input type="file" accept="audio/*" className="hidden" onChange={handleFileChange} />
        </label>
        <button className="text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-all flex items-center gap-3">
          <AlertCircle size={14} />
          Protocol Info
        </button>
      </div>

      {error && (
        <div className="p-6 border border-red-500/10 text-red-400 bg-red-500/5 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.2em]">{error}</p>
        </div>
      )}
    </div>
  );
}
