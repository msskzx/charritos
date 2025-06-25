'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import ProfileCard from '../../../components/ProfileCard';
import { Category } from '../../../types';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

// Main Category Page Component
const CategoryPage = ({ params }: PageProps) => {
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { id } = await params;
                
                const response = await fetch(`/api/categories/${encodeURIComponent(id)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setError('Category not found');
                    } else {
                        throw new Error('Failed to fetch category');
                    }
                    return;
                }

                const data = await response.json();
                setCategory(data);
            } catch (error) {
                console.error('Error fetching category:', error);
                setError('Failed to load category data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategory();
    }, [params]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
                <NavBar />
                <main className="flex-grow container mx-auto p-8">
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !category) {
        return (
            <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
                <NavBar />
                <main className="flex-grow container mx-auto p-8">
                    <div className="text-center">
                        <p className="text-red-600 dark:text-red-400 text-lg my-8">
                            {error || 'Category not found'}
                        </p>
                        <Link 
                            href="/categories" 
                            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            Back to Categories
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
            <NavBar />

            <main className="flex-grow container mx-auto p-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link 
                        href="/categories" 
                        className="text-black dark:text-white hover:underline"
                    >
                        ← Back to Categories
                    </Link>
                </div>

                {/* Category Header */}
                <div className="text-center mb-12">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-5xl font-bold mx-auto mb-4">
                        {category.name.charAt(0)}
                    </div>
                    <h1 className="text-4xl font-extrabold text-black dark:text-white mb-4 drop-shadow-lg">
                        {category.name}
                    </h1>
                    {category.description && (
                        <p className="text-lg text-black dark:text-white max-w-2xl mx-auto">
                            {category.description}
                        </p>
                    )}
                </div>

                {/* Profiles Count */}
                <div className="text-center mb-8">
                    <p className="text-black dark:text-white text-lg">
                        {category.profileCount} profile{category.profileCount !== 1 ? 's' : ''} found
                    </p>
                </div>

                {/* Profiles Grid */}
                {category.profileCount === 0 ? (
                    <div className="text-center">
                        <p className="text-black dark:text-white text-lg my-8">
                            No profiles found in this category.
                        </p>
                        <Link 
                            href="/profiles" 
                            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            View All Profiles
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {category.profiles?.map((profile) => (
                            <ProfileCard key={profile.id} profile={profile} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CategoryPage; 