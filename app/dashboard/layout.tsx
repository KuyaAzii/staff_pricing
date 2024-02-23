"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('dashboard');
    const pathname = usePathname()
    
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuClick = (menu: string, href: string) => {
        setSelectedMenu(menu);
        toggleSidebar();

    };

    return (
        <><link
            href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
            <link rel="stylesheet" />

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 w-64 min-h-full bg-gray-900 p-4 z-10 sidebar-menu transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center pb-4 border-b border-b-gray-800">
                    <img
                        src="https://placehold.co/32x32"
                        alt=""
                        className="w-8 h-8 rounded object-cover"
                    />
                    <span className="text-lg font-bold text-white ml-3">Logo</span>
                </div>
                <ul className="mt-4">
                    <li className={`mb-1 group ${pathname === '/dashboard' ? 'active' : ''}`}>
                        <Link className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100`} href={'/dashboard'}>  <i className="ri-dashboard-line mr-3 text-lg" /> Dashboard</Link>
                    </li>
                    <li className={`mb-1 group ${pathname.includes('createnew') ? 'active' : ''}`}>
                        <Link href={'/dashboard/createnew'} className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100`}>   <i className="ri-chat-new-line mr-3 text-lg" /> Create New</Link>
                    </li>
                    <li className={`mb-1 group ${pathname.includes('lists') ? 'active' : ''}`}>
                    <Link href={'/dashboard/lists'} className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100`}>   <i className="ri-file-list-3-line mr-3 text-lg" /> Lists</Link>
                    </li>
                    <li className={`mb-1 group ${selectedMenu === 'updatepricing' ? 'active' : ''}`}>
                        <div
                            className={`flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100`}
                            onClick={() => handleMenuClick('updatepricing', '/dashboard/updatepricing')}
                        >
                            <i className="ri-dashboard-line mr-3 text-lg" />
                            <span className="text-sm">Update Price</span>
                        </div>
                    </li>
                    {/* ... (similar changes for other menu items) ... */}
                </ul>
            </div>

            <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar} />

            {/* Main Content */}
            <main className={`w-full md:ml-${isOpen ? '70' : '0'} bg-gray-50 h-screen transition-all main`} style={{ marginLeft: isOpen ? '255px' : '0' }}>
                <div className="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-0">
                    <button type="button" className="text-lg text-gray-600 sidebar-toggle" onClick={toggleSidebar}>
                        <i className={`ri-menu-${isOpen ? '2-line' : 'line'}`} />
                    </button>
                    <ul className="flex items-center text-sm ml-4">
                        <li className="mr-2">
                            <div className="text-gray-400 hover:text-gray-600 font-medium">
                                Dashboard
                            </div>
                        </li>
                    </ul>
                    {/* ... (similar changes for other header elements) ... */}
                </div>

                {/* Main Content */}
                <div>
                    {children}
                </div>
            </main>
        </>
    )
}