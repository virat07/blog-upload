"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user, logout } = useAuthContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      router.push("/signin");
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link legacyBehavior href="/">
          <a className="text-white text-lg font-semibold">Your App</a>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              Profile
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <Link legacyBehavior href="/profile">
                  <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    My Profile
                  </a>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link legacyBehavior href="/signin">
            <a className="text-gray-300 hover:text-white">Login</a>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
