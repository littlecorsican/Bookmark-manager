import React, { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import Button from "./Shared/Button";

interface TopBarProps {
  children?: React.ReactNode;
}

const TopBar: React.FC<TopBarProps> = ({ children }) => {
  const context = useContext(GlobalContext);
  return (
    <header className="w-full bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 text-white shadow-lg border-b border-blue-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <h1 className="text-xl font-bold tracking-wide text-blue-300 hover:text-purple-400 transition">
          Control Panel
        </h1> 
        <div className="flex space-x-4">{children}</div>
      </div>
    </header>
  );
};

export default TopBar;
