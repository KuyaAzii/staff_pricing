// components/Dashboard.tsx
"use client";
import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="dist/css/style.css" />
      <title>Dashboard</title>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <a href="#" className="flex items-center pb-4 border-b border-b-gray-800">
          <img
            src="https://placehold.co/32x32"
            alt=""
            className="w-8 h-8 rounded object-cover"
          />
          <span className="text-lg font-bold text-white ml-3">Logo</span>
        </a>
        <ul className="mt-4">
          <li className="mb-1 group active">
            <a
              href="#"
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              <i className="ri-dashboard-line mr-3 text-lg" />
              <span className="text-sm">Dashboard</span>
            </a>
          </li>
          {/* ... (similar changes for other menu items) ... */}

        </ul>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleSidebar}
      />
      {/* Main Content */}
      <main className={`w-full md:ml-${isOpen ? '64' : '0'} bg-gray-50 min-h-screen transition-all main`}>
        <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
          <button type="button" className="text-lg text-gray-600 sidebar-toggle" onClick={toggleSidebar}>
            <i className={`ri-menu-${isOpen ? '2-line' : 'line'}`} />
          </button>
          <ul className="flex items-center text-sm ml-4">
            <li className="mr-2">
              <a href="#" className="text-gray-400 hover:text-gray-600 font-medium">
                Dashboard
              </a>
            </li>
          </ul>
          {/* ... (similar changes for other header elements) ... */}
        </div>
        {/* ... (similar changes for the content) ... */}
      </main>
    </>
  );
};

export default Dashboard;

