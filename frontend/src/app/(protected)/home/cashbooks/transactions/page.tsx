// app/cashbook/[id]/page.tsx
"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import { useSearchParams, usePathname } from "next/navigation";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// --- Mock Data for Transactions ---
const transactionsData = [
  {
    id: 1,
    date: "29 Nov, 2024",
    time: "10:30 AM",
    details: "Freelance Income",
    category: "Income",
    mode: "Online",
    amount: 25000,
    balance: 45034,
    type: "income",
  },
  {
    id: 2,
    date: "29 Nov, 2024",
    time: "09:15 AM",
    details: "Home Rent",
    category: "Rent",
    mode: "Cash",
    amount: -1500,
    balance: 43534,
    type: "expense",
  },
  {
    id: 3,
    date: "28 Nov, 2024",
    time: "08:45 AM",
    details: "Petrol",
    category: "Travel",
    mode: "Cash",
    amount: -300,
    balance: 43234,
    type: "expense",
  },
  {
    id: 4,
    date: "28 Nov, 2024",
    time: "07:20 AM",
    details: "Groceries",
    category: "Food & Dining",
    mode: "Online",
    amount: -850,
    balance: 42384,
    type: "expense",
  },
  {
    id: 5,
    date: "27 Nov, 2024",
    time: "08:30 PM",
    details: "Dinner Party",
    category: "Entertainment",
    mode: "Card",
    amount: -1200,
    balance: 41184,
    type: "expense",
  },
  {
    id: 6,
    date: "27 Nov, 2024",
    time: "11:05 AM",
    details: "Electricity Bill",
    category: "Utilities",
    mode: "Online",
    amount: -450,
    balance: 40734,
    type: "expense",
  },
  {
    id: 7,
    date: "26 Nov, 2024",
    time: "03:15 PM",
    details: "Medicine",
    category: "Healthcare",
    mode: "Cash",
    amount: -320,
    balance: 40414,
    type: "expense",
  },
  {
    id: 8,
    date: "26 Nov, 2024",
    time: "09:30 AM",
    details: "Coffee Shop",
    category: "Food & Dining",
    mode: "Card",
    amount: -150,
    balance: 40264,
    type: "expense",
  },
];

// --- Main Page Component ---
export default function CashbookViewPage() {
  // Simple state for modals (placeholders)
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const searchParams = useSearchParams();

  // Helper for formatting currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`min-h-screen bg-light-bg ${inter.variable} font-sans`}>
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pt-20 sm:px-6 lg:px-8 pb-24 md:pb-6">
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
                {searchParams.get("title")?.toString()}
              </h1>
              <p className="text-sm text-gray-500">
                Manage transactions for this cashbook
              </p>
            </div>
          </div>
        </header>

        {/* Search & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 md:mt-6">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg py-2 px-3 w-full md:w-auto md:min-w-[320px]">
            <Search className="text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by description, amount or category"
              className="border-none outline-none text-sm ml-2 w-full bg-transparent"
            />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsIncomeModalOpen(true)}
              className="flex-1 md:flex-auto flex items-center justify-center gap-2 text-sm font-semibold text-green-600 bg-green-100/70 border border-green-200 rounded-lg py-2 px-4 hover:bg-green-100"
            >
              <Plus size={16} />
              CASH IN
            </button>
            <button
              onClick={() => setIsExpenseModalOpen(true)}
              className="flex-1 md:flex-auto flex items-center justify-center gap-2 text-sm font-semibold text-red-600 bg-red-100/70 border border-red-200 rounded-lg py-2 px-4 hover:bg-red-100"
            >
              <Minus size={16} />
              CASH OUT
            </button>
          </div>
        </div>

        {/* Stats Overview - Redesigned */}
        <section className="mt-4 md:mt-6">
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
              {/* Net Balance Section */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Wallet size={20} />
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    Net Balance
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    ₹{formatCurrency(20230)}
                  </h2>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px w-full md:w-px md:h-20 bg-gray-100"></div>

              {/* Income & Expense Row */}
              <div className="flex flex-row justify-between items-center gap-4 md:gap-16">
                {/* Income */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 rounded-full bg-green-100 text-green-600">
                      <ArrowUpRight size={14} />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Income</p>
                  </div>
                  <p className="text-xl font-semibold text-gray-900">
                    ₹{formatCurrency(25000)}
                  </p>
                </div>

                {/* Expense */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="p-1 rounded-full bg-red-100 text-red-600">
                      <ArrowDownLeft size={14} />
                    </div>
                    <p className="text-sm font-medium text-gray-500">
                      Expenses
                    </p>
                  </div>
                  <p className="text-xl font-semibold text-gray-900">
                    ₹{formatCurrency(4770)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Transactions Section --- */}
        <section className="mt-5 md:mt-8">
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
                          tx.mode === "Online" || tx.mode === "Card"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tx.mode}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        tx.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {tx.type === "income" ? "+" : ""}
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
          <div className="space-y-3 mt-3 md:hidden">
            {transactionsData.map((tx) => (
              <div
                key={tx.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm p-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-semibold text-gray-900">
                      {tx.details}
                    </span>
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      tx.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {tx.type === "income" ? "+" : ""}
                    {formatCurrency(tx.amount)}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    <div>
                      {tx.date}, {tx.time}
                    </div>
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
                        tx.mode === "Online" || tx.mode === "Card"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
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

      {/* Mobile Bottom Action Tabs */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
        <button
          onClick={() => setIsIncomeModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-green-700 bg-green-50 border border-green-200 rounded-xl py-3 active:bg-green-100"
        >
          <Plus size={20} />
          CASH IN
        </button>
        <button
          onClick={() => setIsExpenseModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 text-sm font-bold text-red-700 bg-red-50 border border-red-200 rounded-xl py-3 active:bg-red-100"
        >
          <Minus size={20} />
          CASH OUT
        </button>
      </div>
    </div>
  );
}
