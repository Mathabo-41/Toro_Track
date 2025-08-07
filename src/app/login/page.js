'use client';

// Import necessary hooks and components
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  // Initialize router for navigation
  const router = useRouter();
  
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log credentials (in a real app, you would authenticate here)
    console.log("Logging in:", email, password);
    
    // Redirect to dashboard after successful login
    router.push("/dashboard");
  };

  return (
    // Main container with centering and animation
    <main className="loginContainer" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh", // Full viewport height
      padding: "2rem",
      background: "var(--background)",
      animation: "fadeIn 0.6s ease-out forwards" // Fade-in animation
    }}>
      {/* Content wrapper with max width */}
      <div className="loginContent" style={{
        textAlign: "center",
        maxWidth: "600px", // Max width for larger screens
        width: "100%" // Full width on smaller screens
      }}>
        {/* Login title */}
        <h1 className="loginTitle" style={{
          fontSize: "clamp(2rem, 5vw, 3rem)", // Responsive font size
          fontWeight: "700",
          color: "var(--foreground)",
          marginBottom: "1rem",
          lineHeight: "1.2"
        }}>
          Login
        </h1>
        
        {/* Login form */}
        <form onSubmit={handleSubmit} style={{
          width: "80%", // Form takes 80% of container width
          margin: "0 auto" // Center the form
        }}>
          {/* Email input field */}
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
              transform: "scale(0.8)", // Scale down by 20%
              transformOrigin: "center" // Scale from center
            }}
          />
          
          {/* Password input field */}
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem",
              marginBottom: "2rem", // Extra space before button
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              fontSize: "1rem",
              background: "var(--background)",
              color: "var(--foreground)",
              transform: "scale(0.8)", // Scale down by 20%
              transformOrigin: "center" // Scale from center
            }}
          />
          
          {/* Submit button */}
          <button 
            type="submit" 
            className="loginButton"
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
              transition: "all 0.3s ease", // Smooth hover transition
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "80%",
              transform: "scale(0.8)", // Scale down by 20%
              transformOrigin: "center" // Scale from center
            }}
          >
            Sign In
          </button>
        </form>
        
        {/* Sign up link */}
      
      </div>
    </main>
  );
}