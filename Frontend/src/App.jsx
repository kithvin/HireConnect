// src/App.jsx
import { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const { user, isSignedIn, isLoaded } = useUser();
  const [syncStatus, setSyncStatus] = useState("idle"); // idle | syncing | success | error
  const lastSyncedIdRef = useRef(null);

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      try {
        setSyncStatus("syncing");

        await fetch(`${API_URL}/api/sync-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          }),
        });

        setSyncStatus("success");
        lastSyncedIdRef.current = user.id;
      } catch (err) {
        console.error("Sync error:", err);
        setSyncStatus("error");
      }
    };

    if (isLoaded && isSignedIn && user && lastSyncedIdRef.current !== user.id) {
      syncUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className="app">
      {/* Logged out */}
      <SignedOut>
        <h2>👋 Welcome to HireConnect</h2>
        <p>Please sign in to continue 👇</p>
        <SignIn />
      </SignedOut>

      {/* Logged in */}
      <SignedIn>
        <h2>🚀 Welcome Back!</h2>
        <p>You are signed in.</p>
        <UserButton />

        {/* Tiny sync status text */}
        <div style={{ marginTop: "1rem" }}>
          {syncStatus === "syncing" && <p>🔄 Syncing your account...</p>}
          {syncStatus === "success" && <p>✅ Account synced with backend.</p>}
          {syncStatus === "error" && (
            <p>❌ Could not sync your account (check console).</p>
          )}
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
