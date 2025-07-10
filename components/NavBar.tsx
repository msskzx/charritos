import React from 'react';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';

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
    return (
        <nav className="bg-black w-full border-b border-black">
            <div className="container mx-auto flex justify-between items-center py-3 px-4">
                <Link href="/" className="text-white text-2xl font-bold">
                    {translations[language].title}
                </Link>
                <div className="flex space-x-6 items-center">
                    <Link href="/categories" className="text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-2 py-1">{translations[language].categories}</Link>
                    <Link href="/profiles" className="text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium px-2 py-1">{translations[language].profiles}</Link>
                    <LanguageSwitcher />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
