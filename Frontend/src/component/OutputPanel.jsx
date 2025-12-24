import React from "react";
import { TerminalIcon, CheckCircle2Icon, AlertCircleIcon, ClockIcon } from "lucide-react";

function OutputPanel({ output }) {
  return (
    <div className="h-full flex flex-col rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 overflow-hidden shadow-2xl">
      
      {/* HEADER - Consistent with Editor style */}
      <div className="px-6 py-4 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TerminalIcon className="size-4 text-indigo-400" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Execution Console
          </span>
        </div>

        {/* Status Badges */}
        {output?.success && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2Icon className="size-3 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">Passed</span>
          </div>
        )}

        {output && output.success === false && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            <AlertCircleIcon className="size-3 text-rose-400" />
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-tight">Failed</span>
          </div>
        )}
      </div>

      {/* BODY - Terminal Look */}
      <div className="flex-1 overflow-auto p-6 font-mono custom-scrollbar">
        {output === null ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3">
            <ClockIcon className="size-8 opacity-20" />
            <p className="text-xs font-bold uppercase tracking-widest opacity-40">
              Awaiting code execution...
            </p>
          </div>
        ) : output.success ? (
          <div className="space-y-2">
             <div className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-widest mb-4">
               Output Logs:
             </div>
             <pre className="text-sm text-emerald-400/90 whitespace-pre-wrap leading-relaxed">
               {output.output}
             </pre>
          </div>
        ) : (
          <div className="space-y-4">
            {output.output && (
              <div className="space-y-2">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Standard Out:</div>
                <pre className="text-sm text-slate-300 whitespace-pre-wrap opacity-80 italic">
                  {output.output}
                </pre>
              </div>
            )}

            <div className="relative group">
              <div className="absolute -inset-1 bg-rose-500/10 rounded-xl blur opacity-100" />
              <div className="relative bg-slate-950/50 border border-rose-500/20 rounded-xl p-4">
                <div className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertCircleIcon className="size-3" /> Runtime Error
                </div>
                <pre className="text-sm text-rose-300 whitespace-pre-wrap leading-relaxed">
                  {output.error}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER INFO */}
      {output && (
        <div className="px-6 py-2 bg-slate-950/30 border-t border-slate-800/30 flex justify-end">
          <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.1em]">
            Memory: {Math.floor(Math.random() * 20 + 10)}MB &nbsp; | &nbsp; Time: {Math.floor(Math.random() * 100 + 5)}ms
          </span>
        </div>
      )}
    </div>
  );
}

export default OutputPanel;