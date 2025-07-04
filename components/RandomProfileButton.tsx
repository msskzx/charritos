'use client';

import { useState } from 'react';
import { FaRandom, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from "./ProfileCard";
import { Profile } from '../types';

interface RandomProfileButtonProps {
  category: string;
  initialProfile?: Profile | null;
  buttonText?: string;
}

export default function RandomProfileButton({ 
  category, 
  initialProfile = null,
  buttonText 
}: RandomProfileButtonProps) {
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate button text based on category if not provided
  const getButtonText = () => {
    if (buttonText) return buttonText;
    return `Pick a Random ${category}`;
  };

  const refreshRandomProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/random-profile?category=${encodeURIComponent(category)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to fetch random ${category.toLowerCase()}`);
      }

      const newProfile = await response.json();
      setProfile(newProfile);
    } catch (error) {
      console.error(`Error refreshing random ${category.toLowerCase()}:`, error);
      setError(error instanceof Error ? error.message : `Failed to fetch random ${category.toLowerCase()}`);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <motion.button 
        onClick={refreshRandomProfile}
        disabled={isLoading}
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        animate="idle"
        transition={{ duration: 0.2 }}
        className="rounded-full border border-solid border-black dark:border-white transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-3 hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg h-14 px-8 shadow-lg w-auto"
      >
        {isLoading ? <FaSpinner className="w-6 h-6" /> : <FaRandom className="w-6 h-6" />}
        {isLoading ? 'Loading...' : getButtonText()}
      </motion.button>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="block p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
          >
            <p className="text-red-600 dark:text-red-400 text-center text-sm">
              {error}
            </p>
          </motion.div>
        )}

        {profile && (
          <motion.div
            key={profile.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="block"
          >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ProfileCard
                  profile={{
                    id: profile.id,
                    name: profile.name,
                    description: profile.description,
                    categories: profile.categories.map(c => ({ id: c.id, name: c.name })),
                    imageUrl: profile.imageUrl,
                    links: profile.links,
                  }}
                />
              </motion.div>
          </motion.div>
        )}

        {!profile && !error && (
          <motion.div
            key="no-profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="block p-6 bg-white dark:bg-black rounded-lg shadow-md border border-black dark:border-white h-full flex flex-col items-center"
          >
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No {category.toLowerCase()} found. Please check the database or add some {category.toLowerCase()} profiles.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 