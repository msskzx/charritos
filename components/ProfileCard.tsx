import Link from 'next/link';
import React from 'react';
import { Profile } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const ProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => {
    return (
        <Link
            href={`/profiles/${profile.id}`}
            className="group block p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out border border-black dark:border-white h-80 flex flex-col relative overflow-hidden"
        >
            <div className="flex flex-col items-center mb-4 group-hover:opacity-0 transition-opacity duration-200">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-4xl font-bold mb-3">
                    {profile.name.split(' ').length >= 2
                        ? profile.name.split(' ').slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase()
                        : profile.name.charAt(0).toUpperCase()
                    }
                </div>
            </div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-2 text-center group-hover:opacity-0 transition-opacity duration-200">{profile.name}</h2>
            {(profile.city || profile.country) && (
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2 group-hover:opacity-0 transition-opacity duration-200">
                    <span>
                        <FontAwesomeIcon icon={faLocationDot} aria-label="location" />
                    </span>
                    <span>
                        {profile.city}{profile.city && profile.country ? ', ' : ''}{profile.country}
                    </span>
                </div>
            )} 
            <div className="flex flex-wrap justify-center gap-2 mb-2 z-20 group-hover:opacity-0 transition-opacity duration-200">
                {profile.categories.map((cat) => (
                    <span key={cat.id} className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full font-medium">
                        {cat.name}
                    </span>
                ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-sm px-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                {profile.description || 'No description available.'}
            </div>
        </Link>
    );
};

export default ProfileCard; 