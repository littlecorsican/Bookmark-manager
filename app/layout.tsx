import "./globals.css";
import React, { useRef, ReactNode } from "react";
import SideBar from "./components/Sidebar";

// Props for layout
interface RootLayoutProps {
  children: ReactNode;
}


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
