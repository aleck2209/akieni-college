import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akieni College — Portail d’inscription",
  description: "Inscription en ligne au lycée Akieni College.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<body className="min-h-screen bg-[#F4F6FA]">
  <div className="flex min-h-screen">

    {/* Barre latérale gauche */}
    <Sidebar />

    {/* Zone principale */}
    <div className="flex min-w-0 flex-1 flex-col">

      <DashboardHeader />

      <main className="flex-1 p-8">
        {children}
      </main>

      <Footer />

    </div>

  </div>
</body>
    </html>
  );
}
