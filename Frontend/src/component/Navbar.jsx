import { Link, useLocation } from "react-router-dom";
import { Brain, BookOpen, LayoutDashboard } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";


function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  

  return (
    <nav
      className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl
      border-b border-indigo-500/30 shadow-xl"
    >
      <div
        className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3
        flex items-center justify-between gap-2"
      >
        {/* LOGO */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 sm:gap-3
          hover:scale-105 transition-transform duration-300"
        >
          <div
            className="size-9 sm:size-10 rounded-xl bg-gradient-to-br
            from-indigo-500 via-purple-600 to-fuchsia-600
            flex items-center justify-center
            shadow-[0_0_15px_#4c1d95]"
          >
            <Brain className="size-5 text-white animate-pulse" />
          </div>

          {/* Brand Text */}
          <div className="flex flex-col leading-tight">
            <span className="text-base sm:text-lg font-semibold tracking-wide text-indigo-200">
              HireConnect
            </span>
          </div>
        </Link>

        {/* NAV BUTTONS */}
        <div className="flex items-center gap-1 sm:gap-3">
          <NavButton
            to="/dashboard"
            active={isActive("/dashboard")}
            icon={<LayoutDashboard className="size-5 sm:size-4" />}
            label="Dashboard"
          />

          <NavButton
            to="/problem"
            active={isActive("/problems")}
            icon={<BookOpen className="size-5 sm:size-4" />}
            label="Questions"
          />
        </div>

        {/* USER */}
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                "w-8 h-8 sm:w-9 sm:h-9 ring-2 ring-indigo-500/40 hover:ring-indigo-500/70 transition",
            },
          }}
        />
      </div>
    </nav>
  );
}

/* Responsive Nav Button */
function NavButton({ to, active, icon, label }) {
  return (
    <Link
      to={to}
      className={`px-3 sm:px-4 py-2 rounded-xl
        flex items-center gap-0 sm:gap-2
        font-medium text-sm transition-all duration-300
        ${
          active
            ? "bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-600 text-white shadow-md"
            : "text-gray-300 hover:text-white hover:bg-gray-800"
        }`}
    >
      {icon}
      {/* Hide text on mobile */}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}

export default Navbar;
