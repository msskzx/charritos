import { FaListAlt } from "react-icons/fa";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <NavBar />
      <main className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-4xl font-extrabold text-center text-black dark:text-white tracking-tight drop-shadow-lg">
            Charritos
          </h1>
          <p className="text-lg text-center text-black dark:text-white max-w-xl mt-2">
            Explore different charities, educators, and other helpful material.
          </p>
        </div>
        <a
          className="rounded-full border border-solid border-black dark:border-white transition-colors flex items-center justify-center bg-black dark:bg-white text-white dark:text-black gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 font-medium text-lg h-14 px-8 shadow-lg"
          href="/categories"
        >
          <FaListAlt className="w-6 h-6" />
          Categories
        </a>
      </main>
      <Footer />
    </div>
  );
}
