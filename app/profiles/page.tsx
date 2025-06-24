import React from 'react';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { PrismaClient } from '@prisma/client';
import ProfileCard from '../../components/ProfileCard';
import { Profile } from '../../types';

const prisma = new PrismaClient();

interface Link {
    name: string;
    url: string;
}

const getProfiles = async (): Promise<Profile[]> => {
    try {
        const profiles = await prisma.profile.findMany({
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
        return profiles as Profile[];
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return [];
    }
};

// Main Profiles Page Component
const ProfilesPage = async () => {
    const profiles: Profile[] = await getProfiles();

    return (
        <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
            <NavBar />

            <main className="flex-grow container mx-auto p-8">
                <h1 className="text-4xl font-extrabold text-center text-black dark:text-white mb-12 drop-shadow-lg">
                    All Profiles
                </h1>

                {profiles.length === 0 ? (
                    <p className="text-center text-black dark:text-white text-lg my-8">
                        No profiles found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profiles.map((profile) => (
                             <Link href={`/profiles/${profile.id}`} key={profile.id} className="block">
                                <div className="block p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out border border-black dark:border-white cursor-pointer h-full flex flex-col items-center">
                                    <ProfileCard
                                        profile={{
                                            name: profile.name,
                                            description: profile.description,
                                            categories: profile.categories.map(c => c.name),
                                        }}
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProfilesPage; 