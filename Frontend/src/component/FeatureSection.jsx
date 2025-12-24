import { Code2, UserIcon, VideoIcon } from "lucide-react";
import React from "react";

function FeatureSection() {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          Everything you need to{" "}
          <span className="text-blue-500">Succeed</span>
        </h2>

        <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto">
          Powerful tools built to streamline coding interviews and boost
          productivity.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Feature 1 */}
        <div className="bg-gray-900/60 backdrop-blur border border-indigo-500/20 rounded-2xl p-8 text-center hover:shadow-indigo-500/20 hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <VideoIcon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-3">
            HD Video Call
          </h3>

          <p className="text-base-content/70 text-sm leading-relaxed">
            Conduct face to face technical interviews with high quality video
            and real time interaction.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-gray-900/60 backdrop-blur border border-indigo-500/20 rounded-2xl p-8 text-center hover:shadow-indigo-500/20 hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Code2 className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-3">
            Live Code Editor
          </h3>

          <p className="text-base-content/70 text-sm leading-relaxed">
          A real time code editor designed for smooth collaboration and accurate skill assessment.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-gray-900/60 backdrop-blur border border-indigo-500/20 rounded-2xl p-8 text-center hover:shadow-indigo-500/20 hover:shadow-xl transition-all duration-300">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <UserIcon className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-3">
            Easy Collaboration
          </h3>

          <p className="text-base-content/70 text-sm leading-relaxed">
          Collaborate in real time using a shared code editor designed for smooth technical interviews.
          </p>
        </div>

      </div>
    </div>
  );
}

export default FeatureSection;