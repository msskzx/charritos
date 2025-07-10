import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-black text-white py-6 mt-8 border-t border-black flex flex-col items-center">
            <div className="mb-2">&copy; {new Date().getFullYear()} Sanabel. All rights reserved.</div>
            <LanguageSwitcher />
        </footer>
    );
};

export default Footer;