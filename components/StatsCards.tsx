import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faMosque, faBook } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

interface StatsCardsProps {
  animatedCharity: number;
  animatedMosque: number;
  animatedBook: number;
  translations: {
    charities: string;
    mosques: string;
    libraries: string;
  };
}

const cardClass =
  'bg-white dark:bg-black rounded-lg shadow px-6 py-4 border border-gray-200 dark:border-gray-800 flex flex-col items-center w-64 max-w-xs';

const StatsCards: React.FC<StatsCardsProps> = ({
  animatedCharity,
  animatedMosque,
  animatedBook,
  translations,
}) => (
  <div className="flex flex-wrap justify-center gap-6 mt-2">
    <div className={cardClass}>
      <span className="text-2xl font-bold text-black dark:text-white">
        <motion.span animate={{}}>{animatedCharity}</motion.span>
      </span>
      <div className="text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2 mt-1">
        <FontAwesomeIcon icon={faHandHoldingHeart} className="w-5 h-5" /> {translations.charities}
      </div>
    </div>
    <div className={cardClass}>
      <span className="text-2xl font-bold text-black dark:text-white">
        <motion.span animate={{}}>{animatedMosque}</motion.span>
      </span>
      <div className="text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2 mt-1">
        <FontAwesomeIcon icon={faMosque} className="w-5 h-5" /> {translations.mosques}
      </div>
    </div>
    <div className={cardClass}>
      <span className="text-2xl font-bold text-black dark:text-white">
        <motion.span animate={{}}>{animatedBook}</motion.span>
      </span>
      <div className="text-gray-700 dark:text-gray-300 text-sm flex items-center gap-2 mt-1">
        <FontAwesomeIcon icon={faBook} className="w-5 h-5" /> {translations.libraries}
      </div>
    </div>
  </div>
);

export default StatsCards; 