import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "bg-white shadow-sm border-b border-gray-100" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="w-9 h-9" src={assets.logo} alt="MediConnect" />
            <span className="font-semibold text-gray-900 text-lg">
              MediConnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`
              }
            >
              Doctors
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`
              }
            >
              Contact
            </NavLink>
            {token && userData && (
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-primary bg-primary/5" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`
                }
              >
                Messages
              </NavLink>
            )}
          </ul>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {token && userData ? (
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img
                  className="w-9 h-9 rounded-full object-cover border-2 border-gray-100"
                  src={userData.image}
                  alt=""
                />
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                    <p
                      onClick={() => navigate("/my-profile")}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => navigate("/my-appointments")}
                      className="px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      My Appointments
                    </p>
                    <hr className="my-1 border-gray-100" />
                    <p
                      onClick={logout}
                      className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      Sign out
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}
            <button
              onClick={() => setShowMenu(true)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 ${showMenu ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/20 transition-opacity ${showMenu ? "opacity-100" : "opacity-0"}`}
          onClick={() => setShowMenu(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transition-transform ${showMenu ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="font-semibold text-gray-900">Menu</span>
            <button
              onClick={() => setShowMenu(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 space-y-1">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/"
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/doctors"
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Doctors
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/about"
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/contact"
              className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Contact
            </NavLink>
            {token && (
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/chat"
                className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Messages
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
