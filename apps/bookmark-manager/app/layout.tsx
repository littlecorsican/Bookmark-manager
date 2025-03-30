import "./globals.css";
import React, { useRef, ReactNode } from "react";
import SideBar from "./components/Sidebar";
import { RootLayoutProps } from "./types/types";


export const metadata = {
  title: 'Bookmark manager',
  description: 'This is my Next.js app called Bookmark manager',
  icons: {
    icon: '/appicon.ico',
  },
};


const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {

  return (
    <html lang="en">
      <head>
        <title>Bookmark Manager</title>
      </head>
      <body className="h-screen flex bg-gray-100">
        {/* <SideBar /> */}

        <main className="w-full p-6">
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
