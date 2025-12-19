import React from "react";

export default function TailwindTest() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
        
        <h1 className="text-3xl font-bold text-indigo-400 mb-2">
          Tailwind CSS Working 🚀
        </h1>

        <p className="text-gray-300 mb-6">
          If you see colors, spacing, and rounded corners, Tailwind is set up correctly.
        </p>

        <div className="flex gap-4 justify-center">
          <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition">
            Primary
          </button>

          <button className="px-6 py-2 border border-gray-500 text-gray-300 rounded-lg hover:bg-gray-700 transition">
            Secondary
          </button>
        </div>

      </div>
    </div>
  );
}
