'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RandomCharityButton from "../components/RandomCharityButton";
import { Profile } from '../types';

export default function Home() {
  const [charity, setCharity] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial charity on component mount
  useEffect(() => {
    const fetchInitialCharity = async () => {
      try {
        const response = await fetch('/api/random-charity');
        if (!response.ok) {
          throw new Error('Failed to fetch initial charity');
        }
        const data = await response.json();
        setCharity(data);
      } catch (error) {
        console.error('Error fetching initial charity:', error);
        setError('Failed to load charity data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialCharity();
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
            Explore different charities, educators, and other helpful material.
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
            >
              <RandomCharityButton initialCharity={charity} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      <Footer />
    </div>
  );
}