'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "2rem",
      background: "var(--background)",
      animation: "fadeIn 0.6s ease-out forwards",
      flexDirection: "column", // Added to stack logo and form vertically
     // gap: "1.5rem" //gap between the logo and the login form 
    }}>
      {/* Logo Section */}
      <div style={{
        marginBottom: "-2.5rem",
        textAlign: "center"
      }}>
        <div style={{
          width: "400px",
          height: "300px",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          margin: "0 auto 1rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
           border: "3px solid rgba(var(--brand-color-rgb), 0.2)" 
        }}>
          <Image
            src="/toroLogo.jpg"
            alt="Toro Track Logo"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <h1 style={{
          fontSize: "2.25rem",
          fontWeight: "700",
          color: "var(--brand-color)",
          margin: "0.5rem 0 0"
        }}>
         
        </h1>
      </div>

      {/* Form Container */}
      <div style={{
        textAlign: "center",
        maxWidth: "600px",
        width: "100%",
        background: "var(--background)",
        padding: "2rem",
        borderRadius: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: "600",
          color: "var(--foreground)",
          marginBottom: "1.5rem"
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
              background: "var(--background)",
              color: "var(--foreground)",
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
              background: "var(--background)",
              color: "var(--foreground)",
              transform: "scale(0.9)",
              transformOrigin: "center"
            }}
          />
          
          <button 
            type="submit"
            style={{
              display: "inline-block",
              background: "var(--brand-color)",
              color: "white",
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
              marginBottom: "1.5rem"
            }}
          >
            Sign In
          </button>
        </form>
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