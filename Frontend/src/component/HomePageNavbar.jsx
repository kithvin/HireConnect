import { Brain, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";

function HomePageNavbar() {
  return (
    <div className="bg-gradient-to-br from-black via-slate-900 to-gray-900">
      <div className="bg-gray-900/70 backdrop-blur-xl border-b border-indigo-500/30 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-110 transition-transform duration-300"
          >
            <div className="size-9 sm:size-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-600 flex items-center justify-center shadow-[0_0_15px_#4c1d95]">
              <Brain className="size-5 sm:size-6 text-white animate-brainOnOff" />
            </div>

            {/* Text block */}
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg sm:text-2xl tracking-wide text-indigo-300">
                HireConnect
              </span>
              <span className="text-[10px] sm:text-xs text-base-content/60 font-medium -mt-1">
                Innovate Together
              </span>
            </div>
          </Link>

          {/* CTA Button */}
          <SignInButton mode="modal">
            <button className="group px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-600 text-white font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 duration-200 rounded-xl flex items-center gap-1 cursor-pointer text-sm sm:text-base">
              <span>Get Started</span>
              <ChevronRight className="size-4 sm:size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}

export default HomePageNavbar;