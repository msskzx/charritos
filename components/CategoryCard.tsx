import React from 'react';
import Link from 'next/link';
import { Category } from '../types';

const CategoryCard: React.FC<{category: Category}> = ({ category }) => {
    return (
        <Link
            href={`/categories/${category.name}`}
            className="block p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out border border-black dark:border-white h-80 flex flex-col"
        >
            <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-4xl font-bold mb-3">
                    {category.name.split(' ').length >= 2
                        ? category.name.split(' ').slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase()
                        : category.name.charAt(0).toUpperCase()
                    }
                </div>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center">{category.name}</h2>
            <p className="text-black dark:text-white text-sm mb-4 text-center flex-1 overflow-hidden">
                {category.description || 'No description available.'}
            </p>

            {category.profileCount !== undefined && (
                <div className="flex justify-center mb-2">
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full font-medium">
                        {category.profileCount} {category.profileCount === 1 ? 'profile' : 'profiles'}
                    </span>
                </div>
            )}
        </Link>
    );
};

export default CategoryCard; 