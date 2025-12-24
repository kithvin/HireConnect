import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, TerminalIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../assets/assets";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full flex flex-col rounded-2xl md:rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 overflow-hidden shadow-2xl relative">
      
      {/* TOP BAR - Responsive Padding */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/50 relative z-10">
        
        <div className="flex items-center gap-3 md:gap-4">
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-1 bg-indigo-500/20 rounded-full blur opacity-0 group-hover:opacity-100"></div>
            <img
              src={LANGUAGE_CONFIG[selectedLanguage].icon}
              alt="language icon"
              className="size-6 md:size-7 relative z-10 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 md:mb-1.5">Environment</span>
            <select
              value={selectedLanguage}
              onChange={onLanguageChange}
              className="bg-transparent text-white font-bold text-xs md:text-sm focus:outline-none cursor-pointer hover:text-indigo-400 truncate"
            >
              {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                <option key={key} value={key} className="bg-slate-900 text-white">
                  {lang.name.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Button - Responsive Text */}
        <button
          disabled={isRunning}
          onClick={onRunCode}
          className={`
            group relative flex items-center gap-2 px-3 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl
            font-bold text-[11px] md:text-sm tracking-tight cursor-pointer flex-shrink-0
            ${isRunning 
              ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]"}
          `}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-3 md:size-4" />
              <span>EXECUTING...</span>
            </>
          ) : (
            <>
              <div className="absolute inset-0 rounded-lg md:rounded-xl bg-white/10 opacity-0 group-hover:opacity-100" />
              <PlayIcon className="size-3 md:size-4 fill-current" />
              <span className="hidden xs:block">RUN CODE</span>
              <span className="xs:hidden">RUN</span>
            </>
          )}
        </button>
      </div>

      {/* EDITOR AREA */}
      <div className="flex-1 relative group min-h-[300px]">
        <div className="absolute left-0 top-0 w-1 h-full bg-indigo-500/20 opacity-0 group-hover:opacity-100 z-10" />
        
        <Editor
          height="100%"
          theme="vs-dark"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          loading={<div className="h-full w-full bg-[#020617] flex items-center justify-center text-slate-500 font-mono italic text-xs">Initializing Core...</div>}
          options={{
            fontSize: 14, // Slightly smaller for mobile reach
            fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
            fontWeight: "500",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            cursorBlinking: "solid",
            cursorSmoothCaretAnimation: "off",
            smoothScrolling: false,
            renderLineHighlight: "all",
            lineNumbers: "on",
            scrollbar: {
              vertical: "visible", // Allowed vertical scroll for mobile touch
              horizontal: "hidden",
              useShadows: false,
              verticalScrollbarSize: 8,
            },
            backgroundColor: "#020617",
            wordWrap: "on", // Crucial for mobile
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("hireconnect-dark", {
              base: "vs-dark",
              inherit: true,
              rules: [],
              colors: {
                "editor.background": "#02061700",
                "editor.lineHighlightBackground": "#1e293b50",
                "editorLineNumber.foreground": "#475569",
                "editorLineNumber.activeForeground": "#6366f1",
              },
            });
          }}
          onMount={(editor, monaco) => {
            monaco.editor.setTheme("hireconnect-dark");
          }}
        />
      </div>

      {/* FOOTER BAR */}
      <div className="px-4 md:px-6 py-2 bg-slate-900/80 border-t border-slate-800/50 flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <TerminalIcon className="size-3" />
          <span>Status:</span>
          <span className={isRunning ? "text-amber-400" : "text-emerald-400"}>
            {isRunning ? "Running" : "Ready"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CodeEditorPanel;
