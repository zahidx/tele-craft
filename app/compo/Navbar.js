"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Sun, Moon, Home, PenTool, PlayCircle, Book, Users, User, Settings, LogOut, ChevronDown
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [communityDropdown, setCommunityDropdown] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
        setCommunityDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((prev) => !prev), []);

  // Toggle Theme
  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }, [theme, setTheme]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-500 transition-all duration-300">
            Tele<span className="text-blue-500">Craft</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { href: "/", icon: <Home className="w-5 h-5 mr-2" />, text: "Home" },
              { href: "/create", icon: <PenTool className="w-5 h-5 mr-2" />, text: "Create Story" },
              { href: "/interactive", icon: <PlayCircle className="w-5 h-5 mr-2" />, text: "Interactive Mode" },
              { href: "/library", icon: <Book className="w-5 h-5 mr-2" />, text: "Library" },
            ].map((item, index) => (
              <Link key={index} href={item.href} className="flex items-center text-gray-900 dark:text-white hover:text-blue-500 transition-all duration-300">
                {item.icon} {item.text}
              </Link>
            ))}

            {/* Community Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCommunityDropdown(!communityDropdown)}
                className="flex items-center text-gray-900 dark:text-white hover:text-blue-500 transition-all duration-300"
                aria-expanded={communityDropdown}
              >
                <Users className="w-5 h-5 mr-2" /> Community <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <AnimatePresence>
                {communityDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2"
                  >
                    <Link href="/community/trending" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Trending
                    </Link>
                    <Link href="/community/share" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Share Stories
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-gray-900 dark:text-white hover:text-blue-500 transition-all duration-300">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center text-gray-900 dark:text-white hover:text-blue-500 transition-all duration-300"
                aria-expanded={profileDropdown}
              >
                <User className="w-5 h-5 mr-2" /> Profile <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <AnimatePresence>
                {profileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2"
                  >
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
                    <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</Link>
                    <Link href="/logout" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden text-gray-900 dark:text-white hover:text-blue-500 transition-all duration-300">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-white dark:bg-gray-900 px-4 py-2 space-y-2"
            >
              <Link href="/" className="block px-4 py-2 hover:text-blue-500">Home</Link>
              <Link href="/create" className="block px-4 py-2 hover:text-blue-500">Create Story</Link>
              <Link href="/interactive" className="block px-4 py-2 hover:text-blue-500">Interactive Mode</Link>
              <Link href="/library" className="block px-4 py-2 hover:text-blue-500">Library</Link>
              <button onClick={toggleTheme} className="block w-full text-left px-4 py-2 hover:text-blue-500">
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
