import React from 'react';
import Link from 'next/link';
import { Category } from '../types';
import CategoryIcon from './CategoryIcon';
import { useLanguage } from './LanguageContext';
import translations from './translations';

const CategoryCard: React.FC<{category: Category}> = ({ category }) => {
    const { language } = useLanguage();
    
    // Use Arabic translations if available and language is Arabic
    const displayName = language === 'ar' && category.nameAr ? category.nameAr : category.name;
    const displayDescription = language === 'ar' && category.descriptionAr ? category.descriptionAr : category.description;
    
    // Get profile count text based on language
    const profileText = category.profileCount === 1 
        ? translations[language].profileCount 
        : translations[language].profileCountPlural;
    
    return (
        <Link
            href={`/categories/${category.name}`}
            className="block p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out border border-black dark:border-white h-80 flex flex-col"
        >
            <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-4xl font-bold mb-3">
                    <CategoryIcon category={category} />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center">{displayName}</h2>
            <p className="text-black dark:text-white text-sm mb-4 text-center flex-1 overflow-hidden">
                {displayDescription || 'No description available.'}
            </p>

            {category.profileCount !== undefined && (
                <div className="flex justify-center mb-2">
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium">
                        {category.profileCount} {profileText}
                    </span>
                </div>
            )}
        </Link>
    );
};

export default CategoryCard; 