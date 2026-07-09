import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="fixed top-5 right-7 z-1000 flex items-center gap-4.5 rounded-lg bg-[#1d1f1d] px-6 py-3">
        <Link className="text-white hover:text-gray-300 font-medium transition-colors" to="/">
          Home
        </Link>
      </nav>
      <div className="pt-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;