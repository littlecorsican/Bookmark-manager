'use client'
import React, { useState, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SideBar=()=> {
    
    const [sideBarOpen, setSideBarOpen] = useState(true)

    const toggleSidebar = () => {
        setSideBarOpen((sideBarOpen)=>!sideBarOpen);
    };

    useEffect(()=>{
        if (sideBarOpen) {

        } else {

        }
    }, [sideBarOpen])
    
    return (

            <aside className={`h-full w-[280px] bg-slate-200 fixed z-40 overflow-auto
                shadow-lg shadow-gray-700 ${sideBarOpen ? "animate-animate-left" : "" }`}
                style={{ left: sideBarOpen ? "0px" : "-200px" }}
            >

            <div onClick={toggleSidebar} className="cursor-pointer float-right">
                {sideBarOpen ? <ChevronLeft/> : <ChevronRight/>}
            </div>
                <h1 className="text-xl font-bold mb-6">Bookmarks</h1>
                <nav className="space-y-2">
                    <a href="/" className="block p-2 rounded hover:bg-gray-700">
                        Home
                    </a>
                    {/* <a href="/categories" className="block p-2 rounded hover:bg-gray-700">
                    Categories
                    </a>
                    <a href="/favorites" className="block p-2 rounded hover:bg-gray-700">
                    Favorites
                    </a>
                    <a href="/settings" className="block p-2 rounded hover:bg-gray-700">
                    Settings
                    </a> */}
                </nav>
            </aside>
        )
}

export default SideBar