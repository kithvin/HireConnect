import React from "react";
import { Video, Laptop, ZapIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function Herosection() {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="text-center">

        {/* Main Heading */}
        <h1 className="relative inline-block">
          <span className="overflow-hidden block">
            <span className="typing-text text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              <span className="block sm:inline">Welcome to</span>{" "}
              <span className="block sm:inline text-blue-500">HireConnect</span>
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          A modern platform designed to simplify technical interviews and smart
          hiring.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 sm:mt-10 mb-14">
          <SignInButton mode="modal">
            <button className="flex items-center justify-center px-6 py-4 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-300 w-full sm:w-auto cursor-pointer">
              <Laptop className="w-5 h-5" />
              Start Coding Now
            </button>
          </SignInButton>

          <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-4 px-10 rounded-xl transition duration-300 w-full sm:w-auto cursor-pointer">
            <Video className="w-5 h-5" />
            Watch Demo
          </button>
        </div>

        {/* Feature Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left max-w-7xl mx-auto">
          
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-600 shadow-md mb-6">
              <ZapIcon className="size-4 text-white" />
              <span className="text-white font-semibold text-sm">
                Live technical interviews
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Enhance Skills
              </span>
              <span className="block text-white mt-2">Empower Teams.</span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A powerful platform for real time collaborative coding interviews
              and pair programming, designed to help teams and candidates
              succeed.
            </p>

            {/* Stats */}
            <div className="stats stats-vertical sm:stats-horizontal bg-base-100 shadow-lg rounded-2xl mt-10 mx-auto lg:mx-0">
              <div className="stat text-center">
                <div className="stat-title text-gray-400">Active Users</div>
                <div className="stat-value text-indigo-400">10K+</div>
                <div className="stat-desc text-gray-500">
                  Developers & Recruiters
                </div>
              </div>

              <div className="stat text-center">
                <div className="stat-title text-gray-400">Sessions Hosted</div>
                <div className="stat-value text-purple-400">50K+</div>
                <div className="stat-desc text-gray-500">
                  Live Interview Sessions
                </div>
              </div>

              <div className="stat text-center">
                <div className="stat-title text-gray-400">Platform Uptime</div>
                <div className="stat-value text-fuchsia-400">99.9%</div>
                <div className="stat-desc text-gray-500">Reliable & Secure</div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src="/hero.png"
            alt="HireConnect platform preview"
            className="hidden lg:block w-full h-auto rounded-3xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Herosection;