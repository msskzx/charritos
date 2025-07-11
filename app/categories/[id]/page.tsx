'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import ProfileCard from '../../../components/ProfileCard';
import { Category } from '../../../types';
import { useLanguage } from '../../../components/LanguageContext';
import translations from '../../../components/translations';
import CategoryIcon from '../../../components/CategoryIcon';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

// Main Category Page Component
const CategoryPage = ({ params }: PageProps) => {
    const { language } = useLanguage();
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const { id } = await params;
                
                const response = await fetch(`/api/categories/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setError(translations[language].categoryNotFound);
                    } else {
                        throw new Error('Failed to fetch category');
                    }
                    return;
                }

                const data = await response.json();
                setCategory(data);
            } catch (error) {
                console.error('Error fetching category:', error);
                setError(translations[language].failedToLoadCategory);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategory();
    }, [params, language]);

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
                <NavBar />
                <main className="flex-grow container mx-auto p-8">
                    <div className="text-center">
                        <p className="text-red-600 dark:text-red-400 text-lg my-8">
                            {error}
                        </p>
                        <Link 
                            href="/categories" 
                            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            {translations[language].backToCategories}
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (isLoading && !category) {
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
                        ← {translations[language].backToCategories}
                    </Link>
                </div>

                {/* Category Header */}
                {category && (
                    <div className="text-center mb-12">
                        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-5xl font-bold mx-auto mb-4">
                            <CategoryIcon category={category} className="text-4xl" />
                        </div>
                        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-4 drop-shadow-lg">
                            {language === 'ar' && category.nameAr ? category.nameAr : category.name}
                        </h1>
                        {(language === 'ar' && category.descriptionAr ? category.descriptionAr : category.description) && (
                            <p className="text-lg text-black dark:text-white max-w-2xl mx-auto">
                                {language === 'ar' && category.descriptionAr ? category.descriptionAr : category.description}
                            </p>
                        )}
                    </div>
                )}

                {/* Profiles Count */}
                {category && category.profileCount !== undefined && (
                    <div className="text-center mb-8">
                        <p className="text-black dark:text-white text-lg">
                            {category.profileCount} {category.profileCount === 1 ? translations[language].profileCount : translations[language].profileCountPlural} {translations[language].profilesFound(category.profileCount).split(' ').slice(1).join(' ')}
                        </p>
                    </div>
                )}

                {/* Loading State for Profiles */}
                {isLoading && category && (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
                        <p className="text-black dark:text-white text-lg">{translations[language].loadingProfiles}</p>
                    </div>
                )}

                {/* Profiles Grid */}
                {!isLoading && category && category.profileCount === 0 ? (
                    <div className="text-center">
                        <p className="text-black dark:text-white text-lg my-8">
                            {translations[language].noProfilesInCategory}
                        </p>
                        <Link 
                            href="/profiles" 
                            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            {translations[language].viewAllProfiles}
                        </Link>
                    </div>
                ) : !isLoading && category && (
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