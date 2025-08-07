import Link from "next/link";

export default function Welcome() {
  return (
    <div className="welcomeContainer">
      <div className="welcomeContent">
        <h1 className="welcomeTitle">Welcome to <span>Toro Track</span></h1>
        
        
        <Link href="/login" className="loginButton">
          Get Started
        </Link>
      </div>
    </div>
  );
}