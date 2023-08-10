import { Settings2, Home, Search } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';

function Sidebar () {
    const [isHovered, setIsHovered] = useState(false);

    const hoverHandler = () => {
        setIsHovered(!isHovered);
    }

    return (
        <div onMouseEnter={hoverHandler} onMouseLeave={hoverHandler} className="w-1/12 bg-indigo-900 
            hover:w-3/12 transition-all duration-150 
            hover:items-start
            hover:px-3
            flex flex-col items-center justify-center gap-5">
                <Link href='/home'>
                    <div className='flex gap-2 hover:cursor-pointer'>
                        <Home strokeWidth={1} />
                        <p className='text-slate-50'>{isHovered ? "Home" : null}</p>
                    </div>
                </Link>

                <Link href='/configuration'>
                    <div className='flex gap-2 hover:cursor-pointer'>
                        <Settings2 strokeWidth={1} />
                        <p className='text-slate-50'>{isHovered ? "Requirements" : null}</p>
                    </div>
                </Link>

                <Link href='/holehe'>
                    <div className='flex gap-2 hover:cursor-pointer'>
                        <Search strokeWidth={1} />
                        <p className='text-slate-50'>{isHovered ? "Holehe" : null}</p>
                    </div>
                </Link>
        </div>
      );
}

export default Sidebar;