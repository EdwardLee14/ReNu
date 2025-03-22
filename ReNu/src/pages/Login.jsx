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
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {user ? (
        <>
          <h2>👋 Welcome, {user.displayName}!</h2>
          <img
            src={user.photoURL}
            alt="User Profile"
            width={100}
            style={{ borderRadius: "50%", margin: "1rem 0" }}
          />
          <p>{user.email}</p>
          <button onClick={handleLogout}>Sign out</button>
        </>
      ) : (
        <>
          <h2>Sign in with your Google Account</h2>
          <button onClick={handleLogin}>Sign in with Google</button>
        </>
      )}
    </div>
  );
}

export default Login;
