// app/page.tsx
import React from 'react';
import CashbookCard from '@/components/CashbookCard';
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
} from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// --- Data for the cards (Corrected) ---
const cashbookData = [
  {
    title: 'November Expenses',
    balance: '₹17,534',
    transactions: 8,
    lastActivity: 'Coffee Shop - ₹150',
    time: '1 day ago',
    icon: <BookOpen size={18} />, 
  },
  {
    title: 'October Expenses',
    balance: '₹9,200',
    transactions: 3,
    lastActivity: 'Internet Bill - ₹800',
    time: '3 weeks ago',
    icon: <BookOpen size={18} />,
  },
  {
    title: 'Business Expenses',
    balance: '₹15,950',
    transactions: 3,
    lastActivity: 'Business Lunch - ₹680',
    time: '2 days ago',
    icon: <Briefcase size={18} />,
    // isFavorite: true, // CORRECTION: Removed this line
  },
  {
    title: 'Personal Budget',
    balance: '₹8,450',
    transactions: 18,
    lastActivity: 'Grocery Shopping - ₹1200',
    time: '5 days ago',
    icon: <Wallet size={18} />,
  },
  {
    title: 'Travel Fund',
    balance: '₹12,000',
    transactions: 5,
    lastActivity: 'Flight Booking - ₹8500',
    time: '1 week ago',
    icon: <Plane size={18} />,
  },
];

// --- Page Component ---
export default function CashbooksPage() {
  return (
    <div className={`flex min-h-screen ${inter.variable} font-sans`}>
      {/* ===== Sidebar ===== */}
      <aside className="w-[260px] bg-white p-6 border-r border-gray-200 hidden md:block">
        <button className="flex items-center justify-center gap-2 w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
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
      <main className="flex-1 p-6 md:p-10 relative">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">My Expense Books</h1>
          <p className="text-base text-gray-500 mt-1">
            Organize and track your expenses across different categories
          </p>
        </header>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg py-2 px-3 w-full md:w-[300px]">
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
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">Sort by:</span>
            <button className="flex items-center gap-1 text-sm font-semibold text-gray-900 bg-transparent border-none cursor-pointer">
              Last Updated
              <ChevronDown size={16} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <span className="block text-sm text-gray-500 mb-2">Total Books</span>
            <span className="block text-3xl font-bold text-gray-900">5</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <span className="block text-sm text-gray-500 mb-2">Total Balance</span>
            <span className="block text-3xl font-bold text-gray-900">63,134</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <span className="block text-sm text-gray-500 mb-2">Total Transactions</span>
            <span className="block text-3xl font-bold text-gray-900">37</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <span className="block text-sm text-gray-500 mb-2">Active This Month</span>
            <span className="block text-3xl font-bold text-primary-purple">3</span>
          </div>
        </section>

        {/* Cashbooks Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
          {cashbookData.map((book) => (
            <CashbookCard
              key={book.title}
              title={book.title}
              balance={book.balance}
              transactions={book.transactions}
              lastActivity={book.lastActivity}
              time={book.time}
              icon={book.icon}
            />
          ))}
        </section>

        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 md:right-12 w-14 h-14 bg-blue-500 text-white rounded-full grid place-items-center shadow-lg hover:scale-105 transition-transform shadow-primary-blue/40">
          <Plus size={24} />
        </button>
      </main>
    </div>
  );
}