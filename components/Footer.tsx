import React from "react";

const Footer: React.FC = () => (
  <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center py-6 bg-black dark:bg-black w-full border-t border-gray-200 dark:border-gray-800">
    <a
      className="flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium"
      href="/contact"
    >
      <svg
        aria-hidden
        width={20}
        height={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        className="inline-block"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" />
        <path d="M3 7l9 6 9-6" stroke="currentColor" />
      </svg>
      Contact
    </a>
    <a
      className="flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors hover:bg-gray-100 hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium"
      href="/about"
    >
      <svg
        aria-hidden
        width={20}
        height={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        className="inline-block"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" stroke="currentColor" />
      </svg>
      About
    </a>
  </footer>
);

export default Footer;