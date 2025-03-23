// src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../firebase';

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center gap-4">
      {user ? (
        <>
          <h2 className="text-2xl">👋 Welcome, {user.displayName}!</h2>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User Profile"
              className="w-24 h-24 rounded-full"
            />
          )}
          <p className="text-gray-600">{user.email}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl">Sign in with your Google Account</h2>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}

export default Login;
