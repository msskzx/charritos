import React from 'react';
import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { Profile, Category } from '../../../types';

const prisma = new PrismaClient();

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const getCategoryWithProfiles = async (categoryId: string): Promise<{ category: Category; profiles: Profile[] } | null> => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId
            }
        });

        if (!category) {
            return null;
        }

        const profiles = await prisma.profile.findMany({
            where: {
                categories: {
                    some: {
                        id: categoryId
                    }
                }
            },
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        return {
            category: {
                id: category.id,
                name: category.name,
                description: category.description
            },
            profiles: profiles as Profile[]
        };
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
};

const ProfileListItem: React.FC<{ profile: Profile }> = ({ profile }) => {
    return (
        <Link href={`/profiles/${profile.id}`} className="block">
            <div className="block p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out border border-black dark:border-white cursor-pointer">
                <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-4xl font-bold mb-3">
                        {profile.name.charAt(0)}
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center">{profile.name}</h2>
                <p className="text-black dark:text-white text-sm mb-4 text-center">
                    {profile.description || 'No description available.'}
                </p>

            </div>
        </Link>
    );
};

// Main Category Page Component
const CategoryPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const category = await getCategoryWithProfiles(id);

    if (!category) {
        notFound();
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
                        {category.category.name.charAt(0)}
                    </div>
                    <h1 className="text-4xl font-extrabold text-black dark:text-white mb-4 drop-shadow-lg">
                        {category.category.name}
                    </h1>
                    {category.category.description && (
                        <p className="text-lg text-black dark:text-white max-w-2xl mx-auto">
                            {category.category.description}
                        </p>
                    )}
                </div>

                {/* Profiles Count */}
                <div className="text-center mb-8">
                    <p className="text-black dark:text-white text-lg">
                        {category.profiles.length} profile{category.profiles.length !== 1 ? 's' : ''} found
                    </p>
                </div>

                {/* Profiles Grid */}
                {category.profiles.length === 0 ? (
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
                        {category.profiles.map((profile) => (
                            <ProfileListItem key={profile.id} profile={profile} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CategoryPage; 