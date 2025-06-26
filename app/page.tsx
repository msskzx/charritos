'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RandomProfileButton from "../components/RandomProfileButton";
import CategoryCard from "../components/CategoryCard";
import { Profile } from '../types';

export default function Home() {
  const [charity, setCharity] = useState<Profile | null>(null);
  const [mosque, setMosque] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [charityCount, setCharityCount] = useState<number>(0);
  const [mosqueCount, setMosqueCount] = useState<number>(0);

  // Category data for the cards
  const charitiesCategory = {
    id: 'charities',
    name: 'Charities',
    description: 'Organizations making a positive difference.',
    profileCount: charityCount
  };

  const mosquesCategory = {
    id: 'mosques',
    name: 'Mosques',
    description: 'Mosques around the world.',
    profileCount: mosqueCount
  };

  // Fetch initial charity and mosque on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch categories to get profile counts
        const categoriesResponse = await fetch('/api/categories');
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          const charitiesCategory = categoriesData.find((cat: any) => cat.name === 'Charities');
          const mosquesCategory = categoriesData.find((cat: any) => cat.name === 'Mosques');
          
          if (charitiesCategory) {
            setCharityCount(charitiesCategory.profileCount);
          }
          if (mosquesCategory) {
            setMosqueCount(mosquesCategory.profileCount);
          }
        }

        // Fetch initial charity
        const charityResponse = await fetch('/api/random-profile?category=Charities');
        if (charityResponse.ok) {
          const charityData = await charityResponse.json();
          setCharity(charityData);
        }

        // Fetch initial mosque
        const mosqueResponse = await fetch('/api/random-profile?category=Mosques');
        if (mosqueResponse.ok) {
          const mosqueData = await mosqueResponse.json();
          setMosque(mosqueData);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setError('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 second timeout

    fetchInitialData();

    // Cleanup timeout
    return () => clearTimeout(timeoutId);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <NavBar />
      <motion.main 
        className="flex flex-1 flex-col items-center justify-center gap-8 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex flex-col items-center gap-2 mb-4 text-center"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-4xl font-extrabold text-black dark:text-white tracking-tight drop-shadow-lg"
            variants={titleVariants}
          >
            Charritos
          </motion.h1>
          <motion.p 
            className="text-lg text-black dark:text-white max-w-xl mt-2"
            variants={itemVariants}
          >
            Discover charities, mosques, and educational resources in one comprehensive platform. Discover resources to learn languages, coding, science, and more.
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6 w-full max-w-md"
            >
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="block p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
            >
              <p className="text-red-600 dark:text-red-400 text-center">
                {error}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-8 w-full max-w-4xl"
            >
              {/* Category Cards */}
              <motion.div 
                className="flex flex-row items-center gap-8 w-full justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex-1 max-w-md">
                  <CategoryCard category={charitiesCategory} />
                </div>
                <div className="flex-1 max-w-md">
                  <CategoryCard category={mosquesCategory} />
                </div>
              </motion.div>

              {/* Random Buttons */}
              <motion.div 
                className="flex flex-row items-center gap-8 w-full justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                {/* Random Charity Button */}
                <div className="flex-1 flex justify-center max-w-md">
                  <RandomProfileButton 
                    category="Charities" 
                    initialProfile={charity}
                    buttonText="Pick a Random Charity"
                  />
                </div>

                {/* Random Mosque Button */}
                <div className="flex-1 flex justify-center max-w-md">
                  <RandomProfileButton 
                    category="Mosques" 
                    initialProfile={mosque}
                    buttonText="Pick a Random Mosque"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      <Footer />
    </div>
  );
}