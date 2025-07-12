import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faMosque, faBook } from '@fortawesome/free-solid-svg-icons';
import { Profile } from '../types';

interface ProfileIconProps {
    profile: Profile;
    className?: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ profile, className = "text-3xl" }) => {
    // Function to determine which icon to use based on categories
    const getProfileIcon = (categories: Profile['categories']) => {
        const categoryNames = categories.map(cat => cat.name.toLowerCase());
        
        if (categoryNames.includes('mosque')) {
            return faMosque;
        } else if (categoryNames.includes('library')) {
            return faBook;
        }
        
        // Default fallback - use charity icon
        return faHandHoldingHeart;
    };

    const profileIcon = getProfileIcon(profile.categories);

    return <FontAwesomeIcon icon={profileIcon} className={className} />;
};

export default ProfileIcon; 