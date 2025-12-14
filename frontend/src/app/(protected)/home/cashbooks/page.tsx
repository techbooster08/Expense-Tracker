'use client'
import React, { useEffect, useState } from "react";
import CashbookCard from "../../../../components/CashbookCard";
import {
  Plus,
  Book,
  Star,
  Archive,
  Search,
  BookOpen,
  Briefcase,
  Wallet,
  Plane,
  ChevronDown, // Import the down arrow
} from "lucide-react";
import { Inter } from "next/font/google";
import CreateCashbookModal from "@/components/CreateCashbookModal";
import api from "@/app/services/api";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const fetchCashbooks = async ()=>{
      const res = await api.get("/cashbook");
      return res.data;
}


// --- Page Component ---
export default function CashbooksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cashbooks, setCashbooks] = useState([]);
  useEffect(()=>{
    try { 
     fetchCashbooks().then((data)=>{
       setCashbooks(data);
     });
    } catch (error) {
      console.log(error);
    }
  },[]);
  return (
    <div
      className={`flex min-h-screen  ${inter.variable} overflow-hidden font-sans`}
    >
      {/* ===== Sidebar ===== */}
      <aside
        className={`w-[260px] bg-white p-6 border-r h-screen border-gray-200 hidden pt-20 md:block`}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Plus size={18} /> Create New Book
        </button>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-500 text-white font-medium"
              >
                <Book size={18} /> All Cashbooks
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-500 font-medium hover:bg-gray-100"
              >
                <Star size={18} /> Favorites
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-lg text-gray-500 font-medium hover:bg-gray-100"
              >
                <Archive size={18} /> Archived
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 h-full p-4 relative">
        <header className="flex justify-between items-center pt-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Expense Books
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-1">
              Organize and track your expenses across different categories
            </p>
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex flex-row justify-between items-center mt-6 gap-4 w-full">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg py-2 px-3 w-full sm:w-[300px]">
            <Search className="text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search cashbooks..."
              className="border-none outline-none text-sm ml-2 w-full bg-transparent"
            />
          </div>
          {/* CORRECTION:
            Replaced the <select> element with a styled <button>
            to perfectly match your UI design.
          */}
          <div className="hidden sm:flex items-center text-sm text-gray-500">
            <span className="mr-2">Sort by:</span>
            <button className="flex items-center gap-1 text-sm font-semibold text-gray-900 bg-transparent border-none cursor-pointer">
              Last Updated
              <ChevronDown size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Star size={16} /> Favorites
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Archive size={16} /> Archived
            </a>
          </div>
          <div className="flex items-center text-sm text-gray-500 bg-gray-200 p-2 rounded-lg">
            <button className="flex items-center gap-1  text-sm font-semibold text-gray-900 border-none cursor-pointer">
              Last Updated
              <ChevronDown size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Cashbooks Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          {cashbooks.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Book className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                No cashbooks yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-sm">
                Create your first cashbook to start tracking your income and expenses efficiently.
              </p>
             
            </div>
          )}
          { cashbooks &&  cashbooks.map((book : any) => (
            <CashbookCard
              key={book.id}
              id = {book.id}
              title={book.name}
              description = {book.description}
              balance={book.balance}
              transactions={book.total_transactions}
              isFavorite={book.is_favorited}
            />
          ))}
        </section>

        {/* Floating Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 md:right-12 w-14 h-14 bg-blue-500 text-white rounded-full grid place-items-center shadow-lg hover:scale-105 transition-transform shadow-primary-blue/40"
        >
          <Plus size={24} />
        </button>

        {/* --- Render Modal --- */}
        {isModalOpen && (
          <CreateCashbookModal onClose={() => setIsModalOpen(false)} />
        )}
      </main>
    </div>
  );
}
