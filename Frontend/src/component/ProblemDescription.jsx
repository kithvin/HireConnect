import React from "react";
import { BookOpenIcon, LightbulbIcon, ShieldCheckIcon, ChevronDownIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  return (
    <div className="h-full flex flex-col bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden shadow-2xl font-sans">
      
      {/* HEADER SECTION */}
      <div className="p-6 bg-slate-900/80 border-b border-slate-800/50">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                {problem.title}
              </h1>
              <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                {problem.category}
              </p>
            </div>

            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex-shrink-0 ${getDifficultyBadgeClass(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>

          {/* SELECT BOX - Clean and High Contrast */}
          <div className="relative">
            <select
              className="
                w-full appearance-none
                bg-slate-950 text-slate-100 text-sm font-semibold
                border border-slate-700 rounded-xl
                px-4 py-3 pr-10
                focus:border-indigo-500 focus:outline-none
                cursor-pointer
              "
              value={currentProblemId}
              onChange={(e) => onProblemChange(e.target.value)}
            >
              {allProblems.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.title} — {p.difficulty}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* SCROLLABLE CONTENT AREA */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

        {/* DESCRIPTION SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
              <BookOpenIcon className="size-4 text-indigo-400" />
            </div>
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              Description
            </h2>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800/50 p-6 leading-relaxed shadow-inner">
            <div className="space-y-4 text-slate-100 text-[16px]">
              <p>
                {problem.description.text}
              </p>

              {problem.description.notes?.map((note, idx) => (
                <div key={idx} className="flex gap-3 text-[14px] text-slate-400 bg-slate-800/30 p-3 rounded-lg border border-slate-700/30">
                  <span className="text-indigo-400 font-bold">#</span>
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXAMPLES SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <LightbulbIcon className="size-4 text-amber-400" />
            </div>
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              Test Cases
            </h2>
          </div>

          <div className="space-y-4">
            {problem.examples.map((example, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2 ml-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Case 0{idx + 1}</span>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 font-mono text-sm space-y-3">
                  <div className="flex items-start gap-4">
                    <span className="text-indigo-400 font-bold min-w-[60px] text-[11px] uppercase pt-0.5">Input</span>
                    <code className="text-slate-100">{example.input}</code>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-emerald-400 font-bold min-w-[60px] text-[11px] uppercase pt-0.5">Output</span>
                    <code className="text-emerald-400">{example.output}</code>
                  </div>

                  {example.explanation && (
                    <div className="pt-3 mt-3 border-t border-slate-800/80 text-[13px] text-slate-400 font-sans italic leading-snug">
                      <span className="text-slate-300 font-bold not-italic">Note: </span>
                      {example.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONSTRAINTS SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-rose-500/10 rounded-lg border border-rose-500/20">
              <ShieldCheckIcon className="size-4 text-rose-400" />
            </div>
            <h2 className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              Constraints
            </h2>
          </div>

          <div className="bg-slate-900/40 rounded-2xl border border-slate-800/50 p-5">
            <ul className="space-y-3">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  <code className="text-sm text-slate-300 font-mono">{constraint}</code>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}

export default ProblemDescription;