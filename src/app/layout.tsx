import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

const inter = Merriweather({ weight: ["300", "400", "700", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arabi Learn",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className + "  text-onBackground"
        }
      >
        <div className="bg-background flex flex-col h-screen backdrop-filter backdrop-blur-sm bg-opacity-80 overflow-y-auto">
        <Navbar />


          {children}


        </div>
      </body>
    </html>
  );
}
