import React from 'react';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Category {
    id: string;
    name: string;
    description: string | null;
}

const getCategories = async (): Promise<Category[]> => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

const CategoryListItem: React.FC<{ category: Category }> = ({ category }) => {
    return (
        <Link
            href={`/categories/${category.id}`}
            className="block p-4 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out text-center border border-black dark:border-white"
        >
            <div className="flex flex-col items-center mb-2">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-3xl font-bold mb-2">
                    {category.name.charAt(0)}
                </div>
            </div>
            <h2 className="text-xl font-bold text-black dark:text-white mb-2">{category.name}</h2>
            <p className="text-black dark:text-white text-sm">{category.description || 'No description available.'}</p>
        </Link>
    );
};

// Main Categories Page Component
const CategoriesPage = async () => {
    const categories: Category[] = await getCategories(); // Data fetching happens on the server

    return (
        <div className="min-h-screen flex flex-col items-center bg-white dark:bg-black text-black dark:text-white font-inter">
            <NavBar />

            <main className="flex-grow container mx-auto p-8">
                <h1 className="text-4xl font-extrabold text-center text-black dark:text-white mb-12 drop-shadow-lg">
                    All Categories
                </h1>

                {categories.length === 0 ? (
                    <p className="text-center text-black dark:text-white text-lg my-8">
                        No categories found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {categories.map((category) => (
                            <CategoryListItem key={category.id} category={category} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CategoriesPage;
