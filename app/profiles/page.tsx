import React from 'react';
import Link from 'next/link';
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';
import { PrismaClient } from '@prisma/client';

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
    links: Link[] | null;
    categories: {
        id: string;
        name: string;
    }[];
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

const ProfileListItem: React.FC<{ profile: Profile }> = ({ profile }) => {
    return (
        <Link href={`/profiles/${profile.id}`} className="block">
            <div className="block p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out border border-black dark:border-white cursor-pointer">
                <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-4xl font-bold mb-3">
                        {profile.name.split(' ').length >= 2 
                            ? profile.name.split(' ').slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase()
                            : profile.name.charAt(0).toUpperCase()
                        }
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center">{profile.name}</h2>
                <p className="text-black dark:text-white text-sm mb-4 text-center">
                    {profile.description || 'No description available.'}
                </p>
                
                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {profile.categories.map((category) => (
                        <span
                            key={category.id}
                            className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full font-medium"
                        >
                            {category.name}
                        </span>
                    ))}
                </div>

            </div>
        </Link>
    );
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
                            <ProfileListItem key={profile.id} profile={profile} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProfilesPage; 