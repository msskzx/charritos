'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import CategoryCard from '../../components/CategoryCard';
import { CategoryForCard } from '../../types';

const CategoryListItem: React.FC<{ category: CategoryForCard }> = ({ category }) => {
    return (
        <Link
            href={`/categories/${category.name}`}
            className="block p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out border border-black dark:border-white"
        >
            <CategoryCard category={category} />
        </Link>
    );
};

// Main Categories Page Component
const CategoriesPage = () => {
    const [categories, setCategories] = useState<CategoryForCard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
            <NavBar />

            <main className="flex-grow container mx-auto p-8">
                <h1 className="text-4xl font-extrabold text-center text-black dark:text-white mb-12 drop-shadow-lg">
                    All Categories
                </h1>

                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <p className="text-black dark:text-white text-lg">Loading categories...</p>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-600 dark:text-red-400 text-lg my-8">
                        {error}
                    </p>
                ) : categories.length === 0 ? (
                    <p className="text-center text-black dark:text-white text-lg my-8">
                        No categories found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <CategoryListItem key={category.name} category={category} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CategoriesPage;
