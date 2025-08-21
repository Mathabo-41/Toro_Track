'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Image import is necessary
import {
  mainContainer,
  videoBackground,
  subtleOverlay,
  mainContentContainer,
  formContainer,
  loginTitle,
  formStyle,
  inputField,
  passwordField,
  loginButton,
  loginButtonHover, // Import the new hover style object
  globalStyles, // Import the global styles string
} from './login_styles/styles.js';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Add a new state hook to track whether the button is being hovered over
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", email, password);
    router.push("/dashboard");
  };

  return (
    <main style={mainContainer}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={videoBackground}
      >
        <source src="/appImages/logo_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle overlay for better text readability */}
      <div style={subtleOverlay}></div>

      {/* Main content container */}
      <div style={mainContentContainer}>
        {/* Form Container */}
        <div style={formContainer}>
          {/* Login Text */}
          <h2 style={loginTitle}>
            Login
          </h2>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputField}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={passwordField}
            />
            <button
              type="submit"
              // Conditionally apply the hover styles using a ternary operator
              style={isHovered ? { ...loginButton, ...loginButtonHover } : loginButton}
              // Add onMouseEnter and onMouseLeave event handlers
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{globalStyles}</style>
    </main>
  );
}
