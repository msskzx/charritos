import React from 'react';
import Link from 'next/link';
import NavBar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface Link {
    name: string;
    url: string;
}

interface Profile {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    links: any;
    categories: {
        id: string;
        name: string;
    }[];
}

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

const getProfile = async (profileId: string): Promise<Profile | null> => {
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: profileId
            },
            include: {
                categories: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return profile as Profile;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
};

// Main Profile Detail Page Component
const ProfileDetailPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const profile = await getProfile(id);

    if (!profile) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
            <NavBar />

            <main className="flex-grow container mx-auto p-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Link 
                        href="/profiles" 
                        className="text-black dark:text-white hover:underline"
                    >
                        ← Back to All Profiles
                    </Link>
                </div>

                {/* Profile Header */}
                <div className="text-center mb-12">
                    <div className="w-32 h-32 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-6xl font-bold mx-auto mb-6">
                        {profile.name.charAt(0)}
                    </div>
                    <h1 className="text-5xl font-extrabold text-black dark:text-white mb-4 drop-shadow-lg">
                        {profile.name}
                    </h1>
                    {profile.description && (
                        <p className="text-xl text-black dark:text-white max-w-3xl mx-auto mb-6">
                            {profile.description}
                        </p>
                    )}
                </div>

                {/* Categories */}
                {profile.categories.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-4 text-center">
                            Categories
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {profile.categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/categories/${category.id}`}
                                    className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black text-sm rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Links */}
                {profile.links && Array.isArray(profile.links) && profile.links.length > 0 && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
                            Links
                        </h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            {profile.links.map((link: Link, index: number) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-lg rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="mt-12 text-center">
                    <Link 
                        href="/profiles" 
                        className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors mr-4"
                    >
                        View All Profiles
                    </Link>
                    <Link 
                        href="/categories" 
                        className="px-6 py-3 border border-black dark:border-white text-black dark:text-white rounded-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    >
                        Browse Categories
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfileDetailPage; 