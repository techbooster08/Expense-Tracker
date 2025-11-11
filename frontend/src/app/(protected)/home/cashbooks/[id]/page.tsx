// app/cashbook/[id]/page.tsx
"use client";

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import {
  ArrowLeft,
  Download,
  Trash2,
  Plus,
  Minus,
  Search,
  User,
  LayoutDashboard,
  Book,
  Wallet,
  BarChart2,
  Receipt,
  ArrowRightLeft,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// --- Mock Data for Transactions ---
const transactionsData = [
  {
    id: 1,
    date: '29 Nov, 2024',
    time: '10:30 AM',
    details: 'Freelance Income',
    category: 'Income',
    mode: 'Online',
    amount: 25000,
    balance: 45034,
    type: 'income',
  },
  {
    id: 2,
    date: '29 Nov, 2024',
    time: '09:15 AM',
    details: 'Home Rent',
    category: 'Rent',
    mode: 'Cash',
    amount: -1500,
    balance: 43534,
    type: 'expense',
  },
  {
    id: 3,
    date: '28 Nov, 2024',
    time: '08:45 AM',
    details: 'Petrol',
    category: 'Travel',
    mode: 'Cash',
    amount: -300,
    balance: 43234,
    type: 'expense',
  },
  {
    id: 4,
    date: '28 Nov, 2024',
    time: '07:20 AM',
    details: 'Groceries',
    category: 'Food & Dining',
    mode: 'Online',
    amount: -850,
    balance: 42384,
    type: 'expense',
  },
  {
    id: 5,
    date: '27 Nov, 2024',
    time: '08:30 PM',
    details: 'Dinner Party',
    category: 'Entertainment',
    mode: 'Card',
    amount: -1200,
    balance: 41184,
    type: 'expense',
  },
  {
    id: 6,
    date: '27 Nov, 2024',
    time: '11:05 AM',
    details: 'Electricity Bill',
    category: 'Utilities',
    mode: 'Online',
    amount: -450,
    balance: 40734,
    type: 'expense',
  },
  {
    id: 7,
    date: '26 Nov, 2024',
    time: '03:15 PM',
    details: 'Medicine',
    category: 'Healthcare',
    mode: 'Cash',
    amount: -320,
    balance: 40414,
    type: 'expense',
  },
  {
    id: 8,
    date: '26 Nov, 2024',
    time: '09:30 AM',
    details: 'Coffee Shop',
    category: 'Food & Dining',
    mode: 'Card',
    amount: -150,
    balance: 40264,
    type: 'expense',
  },
];

// --- Reusable Navbar Component (as seen in your image) ---
const AppNavbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-primary-blue p-2 rounded-lg">
              <Receipt size={20} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">
              ExpenseTracker
            </span>
          </div>

          {/* Main Navigation (Desktop) */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {[
              { name: 'Dashboard', icon: <LayoutDashboard size={16} /> },
              { name: 'Cashbooks', icon: <Book size={16} /> },
              { name: 'Budget', icon: <Wallet size={16} /> },
              { name: 'Reports', icon: <BarChart2 size={16} /> },
            ].map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  item.name === 'Cashbooks'
                    ? 'text-primary-blue font-semibold'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Side Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              <User size={16} />
              Login
            </a>
            <button className="flex items-center justify-center gap-2 bg-primary-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors text-sm">
              <Plus size={16} /> New Book
            </button>
          </div>

          {/* Mobile Menu Button (placeholder) */}
          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-900">
              <Book size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Main Page Component ---
export default function CashbookViewPage() {
  // Simple state for modals (placeholders)
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  // Helper for formatting currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`min-h-screen bg-light-bg ${inter.variable} font-sans`}>
      <AppNavbar />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/home/cashbooks" // Link back to dashboard
              className="p-2 rounded-full text-gray-500 hover:bg-gray-200"
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                November Expenses
              </h1>
              <p className="text-sm text-gray-500">
                Manage transactions for this cashbook
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg py-2 px-4 shadow-sm hover:bg-gray-50">
              <Download size={16} />
              Export
            </button>
            <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg">
              <Trash2 size={18} />
            </button>
          </div>
        </header>

        {/* Search & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg py-2 px-3 w-full md:w-auto md:min-w-[320px]">
            <Search className="text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by description, amount or category"
              className="border-none outline-none text-sm ml-2 w-full bg-transparent"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsIncomeModalOpen(true)}
              className="flex-1 md:flex-auto flex items-center justify-center gap-2 text-sm font-semibold text-green-600 bg-green-100/70 border border-green-200 rounded-lg py-2 px-4 hover:bg-green-100"
            >
              <Plus size={16} />
              Add Income
            </button>
            <button
              onClick={() => setIsExpenseModalOpen(true)}
              className="flex-1 md:flex-auto flex items-center justify-center gap-2 text-sm font-semibold text-red-600 bg-red-100/70 border border-red-200 rounded-lg py-2 px-4 hover:bg-red-100"
            >
              <Minus size={16} />
              Add Expense
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <StatCard
            title="Total Income"
            amount={25000}
            icon={<ArrowUpRight className="text-green-600" />}
            bgColor="bg-green-50/70"
            borderColor="border-green-200"
            textColor="text-green-600"
          />
          <StatCard
            title="Total Expenses"
            amount={4770}
            icon={<ArrowDownLeft className="text-red-600" />}
            bgColor="bg-red-50/70"
            borderColor="border-red-200"
            textColor="text-red-600"
          />
          <StatCard
            title="Net Balance"
            amount={20230}
            icon={<ArrowRightLeft className="text-primary-blue" />}
            bgColor="bg-indigo-50/70"
            borderColor="border-indigo-200"
            textColor="text-primary-blue"
          />
        </section>

        {/* --- Transactions Section --- */}
        <section className="mt-8">
          <div className="flex justify-between items-baseline">
            <h2 className="text-lg font-semibold text-gray-800">
              Showing {transactionsData.length} transactions
            </h2>
            <span className="text-xs text-gray-500">Book ID: 1</span>
          </div>

          {/* --- DESKTOP TABLE --- */}
          {/* This table is HIDDEN on mobile (hidden) and SHOWN on medium screens and up (md:table) */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm mt-4 overflow-x-auto hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactionsData.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tx.date}</div>
                      <div className="text-xs text-gray-500">{tx.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {tx.details}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {tx.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tx.mode === 'Online' || tx.mode === 'Card'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tx.mode}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        tx.type === 'income'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : ''}
                      {formatCurrency(tx.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {formatCurrency(tx.balance)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- MOBILE CARD LIST --- */}
          {/* This list is SHOWN on mobile (block) and HIDDEN on medium screens and up (md:hidden) */}
          <div className="space-y-4 mt-4 md:hidden">
            {transactionsData.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-base font-semibold text-gray-900">
                      {tx.details}
                    </span>
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      tx.type === 'income'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : ''}
                    {formatCurrency(tx.amount)}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    <div>{tx.date}, {tx.time}</div>
                    <div className="mt-1">
                      Balance: 
                      <span className="font-medium text-gray-700 ml-1">
                        {formatCurrency(tx.balance)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-gray-500">{tx.category}</div>
                     <span
                        className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tx.mode === 'Online' || tx.mode === 'Card'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tx.mode}
                      </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Reusable Stat Card Component ---
interface StatCardProps {
  title: string;
  amount: number;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  amount,
  icon,
  bgColor,
  borderColor,
  textColor,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className={`bg-white p-5 rounded-xl border ${borderColor} ${bgColor}`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-white border border-gray-200">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-500">{title}</span>
      </div>
      <span
        className={`block text-3xl font-bold ${textColor} mt-3`}
      >
        {formatCurrency(amount)}
      </span>
    </div>
  );
};

// You would create and import a real modal component here
// For this example, we just use the state