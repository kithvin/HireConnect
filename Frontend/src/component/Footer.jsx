import React from "react";
import { Brain } from "lucide-react";

const Footer = () => {
  // Footer links defined locally (no extra file)
  const footerLinks = [
    {
      title: "Platform",
      links: [
        "AI Interview System",
        "Online Interview Environment",
        "Coding Practice Space",
        "User Interaction Area",
      ],
    },
    {
      title: "Information",
      links: [
        "System Information",
        "General Details",
        "Basic Usage Notes",
        "Additional Information",
      ],
    },
    {
      title: "Support",
      links: [
        "Support Information",
        "User Help Notes",
        "General Assistance",
        "Feedback Information",
      ],
    },
  ];

  return (
    <footer
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 
      bg-gray-900/80 backdrop-blur-xl border-t border-indigo-500/30"
    >
      {/* TOP SECTION */}
      <div
        className="flex flex-col md:flex-row items-start justify-between 
        gap-10 py-10 border-b border-indigo-500/20 text-gray-400"
      >
        {/* BRAND + DESCRIPTION */}
        <div>
          <div className="flex items-center gap-3">
            <div
              className="size-10 rounded-xl bg-gradient-to-br
              from-indigo-500 via-purple-600 to-fuchsia-600
              flex items-center justify-center
              shadow-[0_0_12px_#4c1d95]"
            >
              <Brain className="size-5 text-white animate-pulse" />
            </div>

            <span className="text-lg font-bold tracking-wide text-indigo-300">
              HireConnect
            </span>
          </div>

          <p className="max-w-[420px] mt-6 text-sm leading-relaxed">
            HireConnect is a real world AI driven interview platform designed to
            connect recruiters and candidates in live interview sessions with
            integrated intelligent features.
          </p>
        </div>

        {/* FOOTER LINKS */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-sm text-white mb-3">
                {section.title}
              </h3>

              <ul className="text-sm space-y-2">
                {section.links.map((link, i) => (
                  <li
                    key={i}
                    className="cursor-default hover:text-indigo-400 transition"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM */}
      <p className="py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} HireConnect. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
