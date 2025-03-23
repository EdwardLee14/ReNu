// src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../firebase';
import LoginImg from '../assets/login_image.jpeg';

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
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="w-2/5">
        <img
          src={LoginImg}
          alt="Login Visual"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Content */}
      <div className="w-3/5 flex flex-col items-center justify-center text-center gap-6 px-8">
        {user ? (
          <>
            <h2 className="text-3xl font-semibold">👋 Welcome back, {user.displayName}!</h2>
            <div>
              <h1 className="text-xl">By choosing second-hand goods, you've helped save:</h1>
              <h3 className="text-lg font-medium">
                Approximately <span className="text-4xl font-bold text-green-700">30</span> kg of CO2 emissions
              </h3>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold">Sign in with Google</h2>
            <button
              onClick={handleLogin}
              className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}


export default Login;

