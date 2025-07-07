import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => (
  <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center py-6 bg-black dark:bg-black w-full border-t border-gray-200 dark:border-gray-800">
    <a
      className="flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium"
      href="/contact"
    >
      <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" width={20} height={20} className="inline-block" />
      Contact
    </a>
    <a
      className="flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium"
      href="/about"
    >
      <FontAwesomeIcon icon={faCircleInfo} aria-hidden="true" width={20} height={20} className="inline-block" />
      About
    </a>
  </footer>
);

export default Footer;