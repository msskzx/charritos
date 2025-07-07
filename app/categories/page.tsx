'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import CategoryCard from '../../components/CategoryCard';
import { Category } from '../../types';

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
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
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {categories.map((category) => (
                            <CategoryCard key={category.name} category={category} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CategoriesPage;
