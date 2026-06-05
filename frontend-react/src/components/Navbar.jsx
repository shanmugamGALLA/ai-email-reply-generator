import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

function Navbar() {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0B1120]/80 backdrop-blur-lg border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-white font-bold text-lg">AI</span>
            </div>

            <span className="text-white text-xl font-bold tracking-wide">
              ReplyGen
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-gray-300 hover:text-white transition">
              Features
            </a>

            <a href="#workflow" className="text-gray-300 hover:text-white transition">
              Workflow
            </a>

            <a href="#benefits" className="text-gray-300 hover:text-white transition">
              Benefits
            </a>

            <a href="#faq" className="text-gray-300 hover:text-white transition">
              FAQ
            </a>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">

            {/*  FIXED CONDITION */}
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition"
                >
                  Login
                </Link>

                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium shadow-lg shadow-violet-500/30"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-white text-3xl"
          >
            {mobileMenu ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#111827]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-6">

              <a href="#features" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-white transition">
                Features
              </a>

              <a href="#workflow" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-white transition">
                Workflow
              </a>

              <a href="#benefits" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-white transition">
                Benefits
              </a>

              <a href="#faq" onClick={() => setMobileMenu(false)} className="text-gray-300 hover:text-white transition">
                FAQ
              </a>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenu(false)}
                    className="text-gray-300 hover:text-white transition"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenu(false)}
                    className="text-gray-300 hover:text-white transition"
                  >
                    Login
                  </Link>

                  <Link to="/register"
                  onClick={() => setMobileMenu(false)}
                  >
                    <button className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-medium">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;