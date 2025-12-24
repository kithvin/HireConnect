import { Link } from "react-router-dom"; 
import Navbar from "../component/Navbar.jsx";
import Footer from "../component/Footer.jsx";
import { ChevronRightIcon, Code2Icon, CpuIcon, LayoutDashboardIcon, BarChart3Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { PROBLEMS } from "../assets/assets.js";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyCount = problems.filter(p => p.difficulty === "Easy").length;
  const mediumCount = problems.filter(p => p.difficulty === "Medium").length;
  const hardCount = problems.filter(p => p.difficulty === "Hard").length;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans selection:bg-indigo-500/30">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Background Glow Decorations */}
        <div className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-indigo-600/10 rounded-full blur-[80px] md:blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 md:w-[500px] h-80 md:h-[500px] bg-purple-600/10 rounded-full blur-[100px] md:blur-[150px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

          {/* PAGE TITLE */}
          <div className="mb-12 md:mb-20 text-center">
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 md:mb-6">
              Question <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Library</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              Master the technical interview with our curated collection of real world challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 md:gap-12 items-start mb-16 md:mb-20">
            
            {/* LEFT: PROBLEM LIST */}
            <div className="space-y-4">
              {problems.map((problem) => (
                <Link
                  key={problem.id}
                  to={`/problem/${problem.id}`}
                  className="group relative block rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-4 md:p-6 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4 md:gap-5">
                      <div className="size-10 md:size-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all shadow-xl flex-shrink-0">
                        <Code2Icon className="size-5 md:size-6 text-indigo-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="min-w-0"> {/* min-w-0 prevents text overflow in flex */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                            {problem.title}
                          </h2>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider border flex-shrink-0 ${getDifficultyBadgeClass(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs md:text-sm text-slate-500">
                          <span className="flex items-center gap-1"><CpuIcon className="size-3"/> {problem.category}</span>
                        </div>
                      </div>
                    </div>
                    {/* Hide the arrow text on mobile, just keep icon or hide entire div */}
                    <div className="flex items-center gap-1 text-indigo-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 md:-translate-x-4 transition-all flex-shrink-0">
                      <span className="text-xs md:text-sm font-semibold hidden sm:inline">Solve</span>
                      <ChevronRightIcon className="size-4 md:size-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* RIGHT: ILLUSTRATION CARD - Hidden on mobile/tablet, visible only on large screens */}
            <aside className="hidden lg:sticky lg:top-32 lg:block">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800">
                  <img
                    src="/Interview.png" 
                    alt="Platform Preview"
                    className="w-full h-auto md:h-110 transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="p-6 bg-slate-900/90 backdrop-blur-sm border-t border-slate-800">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <LayoutDashboardIcon className="size-5 text-indigo-400" />
                      Live Interview Mode
                    </h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                      Practice with our interactive IDE, real-time feedback, and compiler support.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* BOTTOM STATS CARD SECTION */}
          <section className="relative pt-6 md:pt-10">
            <div className="absolute inset-0 bg-indigo-500/5 blur-3xl -z-10" />
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 md:mb-12">
                <div className="flex items-center gap-4">
                  <div className="p-2 md:p-3 bg-indigo-500/10 rounded-xl md:rounded-2xl border border-indigo-500/20">
                    <BarChart3Icon className="text-indigo-400 size-6 md:size-8" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white">Library Stats</h3>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">Difficulty distribution</p>
                  </div>
                </div>
                <div className="sm:text-right flex flex-row sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0">
                  <p className="text-4xl md:text-5xl font-black text-indigo-400 leading-none">{problems.length}</p>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest sm:mt-2">Total Challenges</p>
                </div>
              </div>

              {/* STATS GRID - 1 column on mobile, 3 on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                <StatLine title="Easy" value={easyCount} total={problems.length} color="bg-emerald-500" textColor="text-emerald-400" />
                <StatLine title="Medium" value={mediumCount} total={problems.length} color="bg-amber-500" textColor="text-amber-400" />
                <StatLine title="Hard" value={hardCount} total={problems.length} color="bg-rose-500" textColor="text-rose-400" />
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatLine({ title, value, total, color, textColor }) {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
           <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-1">{title}</span>
           <span className={`text-2xl md:text-3xl font-black ${textColor}`}>{value}</span>
        </div>
        <span className="text-slate-600 text-[10px] md:text-xs font-bold mb-1">/ {total} Total</span>
      </div>
      <div className="h-1.5 md:h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/30">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider">
        {Math.round(percentage)}% of Library
      </p>
    </div>
  );
}

export default ProblemsPage;