"use client"
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { sideBarData } from '../data/data'
import Link from 'next/link'
import { Menu } from 'lucide-react'

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();
    
    return (
        <div className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isOpen ? 'w-64' : 'w-20'}`}>
            <div className='h-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]'>
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className='p-2 cursor-pointer hover:bg-[#2f2f2f] transition-colors max-w-fit rounded-lg mb-4'
                >
                    <Menu className='w-5 h-5' />
                </button>
                <nav className='flex-grow overflow-hidden'>
                    {sideBarData.map((item) => {
                        const IconComponent = item.icons;
                        return (
                            <div key={item.name} className='mb-2 overflow-hidden'>
                                <Link href={item.path}>
                                    <div className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#2f2f2f] transition-all duration-200 ${pathname === item.path ? 'bg-[#2f2f2f]' : ''}`}>
                                        <IconComponent className='w-5 h-5 min-w-[20px]' />
                                        <span className={`whitespace-nowrap ml-2 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
                                            {item.name}
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
