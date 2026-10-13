import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HistoryIcon,
  LayoutDashboardIcon,
  CircleDollarSignIcon,
} from "lucide-react";
import { Show, UserButton, SignInButton, useUser } from "@clerk/react";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const location = useLocation();

  const userName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "User";

  const navLinkClass = (path) =>
    `px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
      location.pathname === path
        ? "ring ring-blue-100 bg-blue-50 text-slate-800"
        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
    }`;

  return (
    <header className="w-full max-w-[1220px] mx-auto bg-white/90 backdrop-blur xl:rounded-b-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between border border-slate-200">
      {/* Brand and navigation */}
      <div className="flex items-center gap-6">
        <Link to="/dashboard" className="flex items-center gap-1.5">
          <img
            src="/logo.svg"
            alt="Video Meeting Application Logo"
            className="w-6 h-6"
          />
          <span className="text-2xl font-medium tracking-tight text-slate-900">
            Video Meeting App
            <span className="text-primary">.</span>
          </span>
        </Link>

        <Show when="signed-in">
          <nav className="hidden md:flex items-center gap-1.5 ml-2">
            <Link to="/dashboard" className={navLinkClass("/dashboard")}>
              <LayoutDashboardIcon className="w-3.5 h-3.5" />
              Dashboard
            </Link>

            <Link to="/sessions" className={navLinkClass("/sessions")}>
              <HistoryIcon className="w-3.5 h-3.5" />
              Sessions
            </Link>

            <Link to="/pricing" className={navLinkClass("/pricing")}>
              <CircleDollarSignIcon className="w-3.5 h-3.5" />
              Pricing
            </Link>
          </nav>
        </Show>
      </div>

      {/* Authentication and profile */}
      <div className="flex items-center gap-4">
        <Show when="signed-in">
          <Link
            to="/sessions"
            className="md:hidden text-xs font-medium text-slate-600 hover:text-primary flex items-center gap-1"
          >
            <HistoryIcon className="w-4 h-4" />
            Sessions
          </Link>

          <span className="hidden sm:inline font-medium tracking-wide text-sm text-slate-700">
            Welcome, {userName}
          </span>

          <UserButton />
        </Show>

        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
              Sign in
            </button>
          </SignInButton>
        </Show>
      </div>
    </header>
  );
};

export default Navbar;