"use client";
import { LogIn, Menu, X } from "lucide-react";
import {} from "../../../lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      {/* Wrap your app with the provider */}
        {/* nav bar */}
        <header className="w-full fixed top-0 z-50 bg-white shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <div className="flex items-center gap-2 min-w-max">
              <Image
                src={"/logo-expense-tracker.png"}
                alt="logo"
                height={60}
                width={200}
              />
            </div>

            <div className="hidden md:flex items-center gap-4 min-w-max">
              <button
                className="text-md cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition"
              >
                logout
              </button>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <div
            className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 md:hidden ${
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className={`fixed top-0 right-0 h-full w-72 bg-gray-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <Image
                  src={"/logo-expense-tracker.png"}
                  alt="logo"
                  width={150}
                  height={40}
                />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <X className="h-6 w-6 text-gray-700" />
                </button>
              </div>
              {/* Menu Footer */}
              <div className="p-4 border-t border-gray-200">
                <Link
                  href={"/auth"}
                  className="w-full text-md cursor-pointer bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login / Register</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        {children}
    </>
  );
}
