import { FaListAlt } from "react-icons/fa";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 tracking-tight drop-shadow-lg">
            Charritos
          </h1>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-xl mt-2">
            Explore different charities, educators, and other helpful material.
          </p>
        </div>
        <a
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-lg h-14 px-8 shadow-lg"
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
