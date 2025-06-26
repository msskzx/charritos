'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import { Profile, Link as LinkType } from '../../../types';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

// Main Profile Detail Page Component
const ProfileDetailPage = ({ params }: PageProps) => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { id } = await params;
                
                const response = await fetch(`/api/profiles/${encodeURIComponent(id)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setError('Profile not found');
                    } else {
                        throw new Error('Failed to fetch profile');
                    }
                    return;
                }

                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to load profile data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
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

    if (error || !profile) {
        return (
            <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
                <NavBar />
                <main className="flex-grow container mx-auto p-8">
                    <div className="text-center">
                        <p className="text-red-600 dark:text-red-400 text-lg my-8">
                            {error || 'Profile not found'}
                        </p>
                        <Link 
                            href="/profiles" 
                            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            Back to All Profiles
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
                        href="/profiles" 
                        className="text-black dark:text-white hover:underline"
                    >
                        ← Back to All Profiles
                    </Link>
                </div>

                {/* Profile Header */}
                <div className="text-center mb-12">
                    <div className="w-32 h-32 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-6xl font-bold mx-auto mb-6">
                        {profile.name.split(' ').length >= 2 
                            ? profile.name.split(' ').slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase()
                            : profile.name.charAt(0).toUpperCase()
                        }
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
                {profile.categories && profile.categories.length > 0 && (
                    <div className="mb-8">
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
                    <div className="w-full flex justify-center">
                        <div className="flex flex-col gap-3 w-full max-w-3xl">
                            {profile.links.map((link: LinkType, index: number) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full px-6 py-4 bg-black dark:bg-white text-white dark:text-black text-lg rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-center"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

            </main>

            <Footer />
        </div>
    );
};

export default ProfileDetailPage; 