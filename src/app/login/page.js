'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Image import is necessary

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", email, password);
    router.push("/dashboard");
  };

  return (
    <main style={{
      position: 'relative',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "2rem",
      flexDirection: "column",
      overflow: 'hidden',
    }}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: -2,
        }}
      >
        <source src="/appImages/logo_animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle overlay for better text readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: -1,
      }}></div>

      {/* Main content container */}
      <div style={{
        textAlign: "center",
        maxWidth: "500px",
        width: "100%",
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: "2rem",
        borderRadius: "16px",
      }}>
        {/* Logo Image (no container) 
        <div style={{ marginBottom: "1.5rem" }}>
          <img
          src="/appImages/logo.png"
          alt="Logo"
          style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px', // Adjust the width as needed
          height: 'auto', // Maintain aspect ratio
          zIndex: 1, // Ensure the logo is above the video and overlay
        }}
      />
        </div>*/}

        {/* Form Container */}
        <div style={{
          width: "100%",
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: 'blur(10px)',
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}>
          {/* Login Text */}
          <h2 style={{
            fontFamily: "'Disket Mono', monospace",
            color: "#283618",
            marginBottom: "1rem", // Add some space below the title
            textAlign: "center", // Center the text within the container
            fontSize: "2rem", // Adjust font size as needed
            fontWeight: "bold", // Make the text bold
          }}>
            Login
          </h2>
          <form onSubmit={handleSubmit} style={{
            width: "80%",
            margin: "0 auto"
          }}>

            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "1rem",
                fontFamily: "Disekt Mono, monospace",
                background: "rgba(255, 255, 255, 0.6)",
                color: "#525252",
                transform: "scale(0.9)",
                transformOrigin: "center"
              }}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "1rem",
                marginBottom: "2rem",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                fontSize: "1rem",
                //dark color for input fields 
                color: "#525252",
                fontFamily: "Disekt Mono, monospace",
                background: "rgba(255, 255, 255, 0.6)",
                //color: "var(--foreground)",
                transform: "scale(0.9)",
                transformOrigin: "center"
              }}
            />
            <button
              type="submit"
              style={{
                display: "inline-block",
                background: "#283618",
                color: "#606c38",
                padding: "1rem 2.5rem",
                borderRadius: "8px",
                fontSize: "1.125rem",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "80%",
                transform: "scale(0.9)",
                transformOrigin: "center",
                marginBottom: "1.5rem",
                fontFamily: "Disekt Mono, monospace",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}