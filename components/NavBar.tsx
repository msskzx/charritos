import React from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
    return (
        <nav className="bg-black w-full border-b border-black">
            <div className="container mx-auto flex justify-between items-center py-3 px-4">
                <Link href="/" className="text-white text-2xl font-bold">
                    Charritos
                </Link>
                <div className="flex space-x-6">
                    <Link href="/categories" className="text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-2 py-1">Categories</Link>
                    <Link href="/profiles" className="text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-2 py-1">Profiles</Link>
                    <Link href="/qibla" className="text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-2 py-1">Qibla</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
