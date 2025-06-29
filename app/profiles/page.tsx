'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProfileCard from '../../components/ProfileCard';
import { Profile } from '../../types';

const ProfilesPage = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('/api/profiles', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profiles');
                }

                const data = await response.json();
                setProfiles(data);
            } catch (error) {
                setError('Failed to load profiles');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
            <NavBar />

            <main className="flex-grow container mx-auto p-8">
                <h1 className="text-4xl font-extrabold text-center text-black dark:text-white mb-12 drop-shadow-lg">
                    All Profiles
                </h1>

                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-600 dark:text-red-400 text-lg my-8">
                        {error}
                    </p>
                ) : profiles.length === 0 ? (
                    <p className="text-center text-black dark:text-white text-lg my-8">
                        No profiles found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profiles.map((profile) => (
                            <ProfileCard key={profile.id} profile={profile} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProfilesPage; 