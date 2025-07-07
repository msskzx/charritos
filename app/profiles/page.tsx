'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProfileCard from '../../components/ProfileCard';
import { Profile } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';

const PAGE_SIZE = 12;

const ProfilesPage = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset to first page on new search
        }, 400);
        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        const fetchProfiles = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams({
                    page: String(page),
                    limit: String(PAGE_SIZE),
                });
                if (debouncedSearch) params.append('search', debouncedSearch);
                const response = await fetch(`/api/profiles?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profiles');
                }
                const data = await response.json();
                setProfiles(data.profiles);
                setTotal(data.total);
            } catch {
                setError('Failed to load profiles');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfiles();
    }, [page, debouncedSearch]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    // Add handler for search button
    const handleSearchClick = () => {
        setDebouncedSearch(search);
        setPage(1);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
            <NavBar />

            <main className="flex-grow container mx-auto p-8">
                <h1 className="text-4xl font-extrabold text-center text-black dark:text-white mb-12 drop-shadow-lg">
                    All Profiles
                </h1>

                {/* Search Bar */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            className="block w-full pr-12 py-2 pl-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="Search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleSearchClick(); }}
                        />
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                            onClick={handleSearchClick}
                            aria-label="Search"
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-600 dark:text-red-400 text-lg my-8">
                        {error}
                    </p>
                ) : profiles.length === 0 ? (
                    <p className="text-center text-black dark:text-white text-lg my-8">
                        No profiles found.
                    </p>
                ) : (
                    <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profiles.map((profile) => (
                            <ProfileCard key={profile.id} profile={profile} />
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                className="px-4 py-2 rounded bg-black dark:bg-white text-white dark:text-black disabled:opacity-50 transition-colors hover:bg-gray-800 dark:hover:bg-gray-200"
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                aria-label="Previous Page"
                            >
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span className="mx-2">Page {page} of {totalPages}</span>
                            <button
                                className="px-4 py-2 rounded bg-black dark:bg-white text-white dark:text-black disabled:opacity-50 transition-colors hover:bg-gray-800 dark:hover:bg-gray-200"
                                onClick={() => setPage(page + 1)}
                                disabled={page === totalPages}
                                aria-label="Next Page"
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ProfilesPage; 