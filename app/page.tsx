'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import RandomProfileButton from "../components/RandomProfileOverlay";
import CategoryCard from "../components/CategoryCard";
import { Profile, Category } from '../types';
import ArabicSlider from '../components/ArabicSlider';
import { useLanguage } from '../components/LanguageContext';
import StatsCards from '../components/StatsCards';
import translations from '../components/translations';

export default function Home() {
  const { language } = useLanguage();
  const [charity, setCharity] = useState<Profile | null>(null);
  const [mosque, setMosque] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [charityCount, setCharityCount] = useState<number>(0);
  const [mosqueCount, setMosqueCount] = useState<number>(0);
  const [bookCount, setBookCount] = useState<number>(0);
  const [animatedCharity, setAnimatedCharity] = useState(0);
  const [animatedMosque, setAnimatedMosque] = useState(0);
  const [animatedBook, setAnimatedBook] = useState(0);

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
          const charitiesCategory = categoriesData.find((cat: Category) => cat.name === 'Charities');
          const mosquesCategory = categoriesData.find((cat: Category) => cat.name === 'Mosques');
          const booksCategory = categoriesData.find((cat: Category) => cat.name === 'Books');
          
          if (charitiesCategory) {
            setCharityCount(charitiesCategory.profileCount);
          }
          if (mosquesCategory) {
            setMosqueCount(mosquesCategory.profileCount);
          }
          if (booksCategory) {
            setBookCount(booksCategory.profileCount);
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
      } catch {
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

  useEffect(() => {
    const duration = 800;
    const animateValue = (start: number, end: number, setter: (v: number) => void) => {
      if (start === end) return;
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(start + (end - start) * progress);
        setter(value);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    animateValue(animatedCharity, charityCount, setAnimatedCharity);
    animateValue(animatedMosque, mosqueCount, setAnimatedMosque);
    animateValue(animatedBook, bookCount, setAnimatedBook);
    // eslint-disable-next-line
  }, [charityCount, mosqueCount, bookCount]);

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


  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <NavBar />
      {/* Motivating Intro Section */}
      <section className="w-full bg-gradient-to-b from-gray-100 to-white dark:from-black dark:to-gray-900 py-10 px-4 flex flex-col items-center text-center border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-4 drop-shadow-lg">{translations[language].welcome}</h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mb-6">
          {translations[language].intro}
        </p>
        <StatsCards
          animatedCharity={animatedCharity}
          animatedMosque={animatedMosque}
          animatedBook={animatedBook}
          translations={{
            charities: translations[language].charities,
            mosques: translations[language].mosques,
            libraries: translations[language].libraries,
          }}
        />
      </section>
      <ArabicSlider />
      <motion.main 
        className="flex flex-1 flex-col items-center justify-center gap-8 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
                className="flex flex-col md:flex-row items-center gap-8 w-full justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex-1 max-w-md w-full">
                  <CategoryCard category={charitiesCategory} />
                </div>
                <div className="flex-1 max-w-md w-full">
                  <CategoryCard category={mosquesCategory} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      {/* Random Cards Section at Bottom */}
      <section className="w-full bg-gray-100 dark:bg-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              {translations[language].discover}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {translations[language].random}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="w-full">
              <RandomProfileButton 
                category={translations[language].charities} 
                initialProfile={charity}
              />
            </div>
            <div className="w-full">
              <RandomProfileButton 
                category={translations[language].mosques} 
                initialProfile={mosque}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}