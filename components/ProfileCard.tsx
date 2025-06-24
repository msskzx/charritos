import React from 'react';

export interface ProfileForCard {
    name: string;
    description: string | null;
    categories: string[];
}

interface ProfileCardProps {
    profile: ProfileForCard;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    return (
        <>
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

            <div className="flex flex-wrap justify-center gap-2 mb-2">
                {profile.categories.map((cat) => (
                    <span key={cat} className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded-full font-medium">
                        {cat}
                    </span>
                ))}
            </div>
        </>
    );
};

export default ProfileCard; 