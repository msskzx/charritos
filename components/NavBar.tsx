import React, { useState } from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const translations = {
  en: {
    title: 'Sanabel',
    categories: 'Categories',
    profiles: 'Profiles',
  },
  ar: {
    title: 'سنابل',
    categories: 'التصنيفات',
    profiles: 'الملفات',
  },
};

const NavBar: React.FC = () => {
  const { language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black w-full border-b border-black">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <Link href="/" className="text-white text-2xl font-bold">
          {translations[language].title}
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/categories" className="text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-2 py-1">{translations[language].categories}</Link>
          <Link href="/profiles" className="text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-2 py-1">{translations[language].profiles}</Link>
          <LanguageSwitcher />
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 p-2"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="w-6 h-6" />
        </button>
      </div>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 pb-4 animate-fade-in-down">
          <div className="flex flex-col gap-3 mt-2">
            <Link href="/categories" className="text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-2 py-2" onClick={() => setMenuOpen(false)}>{translations[language].categories}</Link>
            <Link href="/profiles" className="text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-2 py-2" onClick={() => setMenuOpen(false)}>{translations[language].profiles}</Link>
            <div className="pt-2"><LanguageSwitcher /></div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
