import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProfileCard from "../components/ProfileCard";
import { FaRandom } from "react-icons/fa";
import Link from "next/link";
import { PrismaClient } from '@prisma/client';
import { Profile } from '../types';

const prisma = new PrismaClient();

const getRandomCharity = async (): Promise<Profile | null> => {
  try {
    // Get all profiles that have the "Charities" category
    const charityProfiles = await prisma.profile.findMany({
      where: {
        categories: {
          some: {
            name: "Charities"
          }
        }
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (charityProfiles.length === 0) {
      return null;
    }

    // Pick a random charity
    const randomIndex = Math.floor(Math.random() * charityProfiles.length);
    return charityProfiles[randomIndex];
  } catch (error) {
    console.error('Error fetching random charity:', error);
    return null;
  }
};

export default async function Home() {
  const randomCharity = await getRandomCharity();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <NavBar />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
        <div className="flex flex-col items-center gap-2 mb-4 text-center">
          <h1 className="text-4xl font-extrabold text-black dark:text-white tracking-tight drop-shadow-lg">
            Charritos
          </h1>
          <p className="text-lg text-black dark:text-white max-w-xl mt-2">
            Explore different charities, educators, and other helpful material.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          <Link 
            href="/"
            className="rounded-full border border-solid border-black dark:border-white transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-3 hover:bg-gray-800 dark:hover:bg-gray-200 font-medium text-lg h-14 px-8 shadow-lg w-auto"
          >
            <FaRandom className="w-6 h-6" />
            Pick a Random Charity
          </Link>

          {randomCharity && (
            <Link href={`/profiles/${randomCharity.id}`} className="block">
              <div className="block p-6 bg-white dark:bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 ease-in-out border border-black dark:border-white cursor-pointer h-full flex flex-col items-center">
                <ProfileCard
                  profile={{
                    name: randomCharity.name,
                    description: randomCharity.description,
                    categories: randomCharity.categories.map(c => c.name),
                  }}
                />
              </div>
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}