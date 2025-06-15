import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignUp from "../Components/SignUp"; // this includes login modal
import { useAuth } from "../AuthContext"; // ✅ import AuthContext

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth(); // ✅ extract user and logout from context

  const handleLogout = () => {
    logout(); // clear token/session
    alert("Logged out successfully!");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2">
          <img
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc_Dm1kPRRe_ayTipbrDuxDAibx5ryn5KZow&s"}
            alt="Logo"
            className="h-8 md:h-10 object-contain"
          />
        </a>
        <nav className="hidden md:flex gap-6">
          <a href="/" className="text-sm font-medium text-purple-900 hover:text-purple-700">
            Problems
          </a>
          <Link to="/contest" className="text-sm font-medium text-gray-500 hover:text-purple-700">
            Contest
          </Link>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-purple-700">
            Discuss
          </a>
          <a href="#" className="text-sm font-medium text-gray-500 hover:text-purple-700">
            FAQ
          </a>
          <Link to="/set" className="text-sm font-medium text-gray-500 hover:text-purple-700">
            SetProblem
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to ="/dashboard" className="text-sm font-medium text-gray-500 hover:text-purple-700 hidden md:block">
          Dashboard
          </Link>

          {user ? (
            // ✅ Logout button if user is logged in
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-400 rounded-md hover:from-red-700 hover:to-red-500 hidden md:block"
            >
              Logout
            </button>
          ) : (
            // ✅ Login/SignUp button if user is not logged in
            <button
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-700 to-purple-500 rounded-md hover:from-purple-800 hover:to-purple-600 hidden md:block"
            >
              Login/SignUp
            </button>
          )}

          {/* Modal rendering */}
          {showLogin && <SignUp onClose={() => setShowLogin(false)} />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
