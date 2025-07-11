'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileCard from "./ProfileCard";
import { Profile } from '../types';
import React from 'react';

interface RandomProfileButtonProps {
  category: string;
  initialProfile?: Profile | null;
  buttonText?: React.ReactNode;
}

export default function RandomProfileButton({ 
  category, 
  initialProfile = null
}: RandomProfileButtonProps) {
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(!initialProfile);

  // Update profile when initialProfile prop changes
  React.useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile);
      setIsInitialLoading(false);
    }
  }, [initialProfile]);

  const refreshRandomProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/random-profile?category=${category}`, {
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
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <motion.button 
        onClick={refreshRandomProfile}
        disabled={isLoading}
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        animate="idle"
        transition={{ duration: 0.2 }}
        className="rounded-full border border-solid border-black dark:border-white transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg h-14 w-14 shadow-lg"
      >
        <FontAwesomeIcon icon={faShuffle} className="w-6 h-6" />
      </motion.button>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="block p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 w-full"
          >
            <p className="text-red-600 dark:text-red-400 text-center text-sm">
              {error}
            </p>
          </motion.div>
        )}

        {(isInitialLoading || isLoading) && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="block p-6 bg-white dark:bg-black rounded-lg shadow-md border border-black dark:border-white w-full flex flex-col items-center justify-center min-h-[200px]"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black dark:border-white"></div>
            </div>
          </motion.div>
        )}

        {profile && !isInitialLoading && !isLoading && (
          <motion.div
            key={profile.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="block w-full"
          >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ProfileCard
                  profile={profile}
                />
              </motion.div>
          </motion.div>
        )}

        {!profile && !error && !isInitialLoading && !isLoading && (
          <motion.div
            key="no-profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="block p-6 bg-white dark:bg-black rounded-lg shadow-md border border-black dark:border-white w-full flex flex-col items-center justify-center min-h-[200px]"
          >
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No {category.toLowerCase()} found.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 