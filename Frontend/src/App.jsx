import "./App.css";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";

function App() {
  return (
    <div className="app">
      <SignedOut>
        <h2>👋 Welcome to HireConnect</h2>
        <p>Please sign in to continue 👇</p>
        <SignIn />
      </SignedOut>

      <SignedIn>
        <h2>✅ You are signed in!</h2>
        <p>Use the button below to manage your account or sign out.</p>
        <UserButton /> {/* Sign out included */}
      </SignedIn>
    </div>
  );
}

export default App;
