import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-white p-8">
      <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
      <p className="text-xl mb-8 text-gray-400">Oops! There's nothing here.</p>
      <Link 
        to="/" 
        className="bg-[#1d1f1d] border border-gray-600 hover:text-gray-300 hover:border-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;