import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faMosque, faBook, faKaaba } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../types';

interface CategoryIconProps {
    category: Category;
    className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, className = "text-3xl" }) => {
    // Function to determine which icon to use based on category name
    const getCategoryIcon = (categoryName: string) => {
        const name = categoryName.toLowerCase();
        
        if (name.includes('mosques')) {
            return faMosque;
        } else if (name.includes('charities')) {
            return faHandHoldingHeart;
        } else if (name.includes('books')) {
            return faBook;
        } else if (name.includes('islam')) {
            return faKaaba; // Using star icon for Islam category
        }
        
        // Default fallback - use charity icon
        return faHandHoldingHeart;
    };

    const categoryIcon = getCategoryIcon(category.name);

    return <FontAwesomeIcon icon={categoryIcon} className={className} />;
};

export default CategoryIcon; 