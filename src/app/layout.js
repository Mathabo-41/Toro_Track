import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "./QueryProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: 'Toro Track',
  description: 'Client Collaboration & Internal Tracking Tool',
  icons: {
    icon: '/appImages/toro-icon.png', 
  },
  // This viewport object is added for mobile responsiveness
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}