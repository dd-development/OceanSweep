import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import SideNav from "./ui/dashboard/SideNav";
import Navbar from "./ui/dashboard/Navbar";
import { PageTitleProvider } from "./context/PageTitleContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oceansweep",
  description: "Oceansweep is a platform for managing ocean cleanup projects.",
};

export default async function RootLayout({
  children,
  title = "Oceansweep",
}: Readonly<{
  children: React.ReactNode;
  title: string
}>) {
  const session = await auth();
  const isAuthenticated = session?.user != null;
  //console.log("isAuth", isAuthenticated);
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-blue-50 to-white min-h-screen text-gray-900`}
      >
        <Toaster position="top-right" reverseOrder={false} /> 
        <PageTitleProvider>
        {isAuthenticated && (
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="flex-grow md:overflow-y-auto">
              <Navbar title={title}/>
              <div className="mx-auto p-2 bg-white/80 backdrop-blur-md rounded-lg shadow-lg">{children}</div>
            </div>
          </div>
        )} 

        {!isAuthenticated && <>{children}</>}
        </PageTitleProvider>
      </body>
    </html>
  );
}
