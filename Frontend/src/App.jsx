import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-black via-slate-900 to-gray-900 px-4">

      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur
                      border border-indigo-500/20 rounded-2xl
                      shadow-2xl p-8 text-center">

        <h1 className="text-3xl font-extrabold mb-2
                       bg-gradient-to-r from-indigo-400 to-purple-500
                       bg-clip-text text-transparent">
          Welcome to HireConnect
        </h1>

        {/* USER NOT SIGNED IN */}
        <SignedOut>
          <p className="text-gray-400 text-sm mb-8">
            Sign in to continue
          </p>

          <SignInButton mode="modal">
            <button className="w-full py-3 rounded-xl
                               bg-gradient-to-r from-indigo-500 to-purple-600
                               text-white font-semibold">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>

        {/* USER ALREADY SIGNED IN */}
        <SignedIn>
          <p className="text-gray-400 mb-4">
            You are already signed in
          </p>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

      </div>
    </div>
  );
}
