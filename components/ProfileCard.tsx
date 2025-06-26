import Link from 'next/link';
import React from 'react';
import { Profile } from '../types';

const ProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => {
    return (
        <Link
            href={`/profiles/${profile.id}`}
            className="block p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out border border-black dark:border-white h-80 flex flex-col"
        >
            <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-4xl font-bold mb-3">
                    {profile.name.split(' ').length >= 2
                        ? profile.name.split(' ').slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase()
                        : profile.name.charAt(0).toUpperCase()
                    }
                </div>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center">{profile.name}</h2>
            <p className="text-black dark:text-white text-sm mb-4 text-center flex-1 overflow-hidden">
                {profile.description || 'No description available.'}
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-2">
                {profile.categories.map((cat) => (
                    <span key={cat.id} className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full font-medium">
                        {cat.name}
                    </span>
                ))}
            </div>
        </Link>
    );
};

export default ProfileCard; 