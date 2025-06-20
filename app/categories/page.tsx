import React from 'react';
import Link from 'next/link'; // Import Link from next/link for client-side navigation
import NavBar from '../../components/navbar';
import Footer from '../../components/footer';

interface Category {
    id: string;
    name: string;
    description: string;
}

const getCategories = async (): Promise<Category[]> => {
    return [
        { id: 'history', name: 'History', description: 'Exploring events and figures from the past.' },
        { id: 'charities', name: 'Charities', description: 'Organizations making a positive difference.' },
        { id: 'arabic-language', name: 'Arabic Language', description: 'Resources for learning Arabic.' },
        { id: 'news', name: 'News', description: 'Latest updates from around the globe.' },
        { id: 'science', name: 'Science', description: 'Delving into scientific discoveries.' },
        { id: 'technology', name: 'Technology', description: 'Innovations and future trends.' },
    ].sort((a, b) => a.name.localeCompare(b.name));
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
            <p className="text-black dark:text-white text-sm">{category.description}</p>
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
