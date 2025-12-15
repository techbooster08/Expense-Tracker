// app/cashbook/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { useSearchParams} from "next/navigation";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  Loader2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import api from "@/app/services/api";
import CreateTransactionModal from "@/components/CreateTransactionModal";
import toast from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// --- Mock Data for Transactions ---
interface Transaction {
  id: string;
  cashbook_id: string;
  category_id: string;
  amount: string;
  transaction_type: "cash_in" | "cash_out";
  description: string;
  payment_mode: string;
  transaction_datetime: string;
  category_name: string;
  balance: string;
}

// --- Main Page Component ---
export default function CashbookViewPage() {
  // Simple state for modals (placeholders)
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const fetchTransactions = React.useCallback(async () => {
    try {
      const res = await api.get(`/transaction/${searchParams.get("id")}`);
      setTransactions(res.data || []);
    } catch (error: any) {
      console.log("Failed to fetch transactions", error);
      // If the API returns 404 when no transactions exist, clear the state
      if (error.response && error.response.status === 404) {
        setTransactions([]);
      }
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Calculate stats dynamically
  const stats = React.useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((tx) => {
      const amount = parseFloat(tx.amount);
      if (tx.transaction_type === "cash_in") {
        income += amount;
      } else {
        expense += amount;
      }
    });
    return { income, expense, balance: income - expense };
  }, [transactions]);

  // Helper for formatting currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const promptDelete = (transactionId: string) => {
    setTransactionToDelete(transactionId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!transactionToDelete) return;
    try {
      await api.delete(`/transaction/${transactionToDelete}`);
      toast.success("Transaction deleted successfully");
      await fetchTransactions();
      setIsDeleteModalOpen(false);
      setTransactionToDelete(null);
    } catch (error) {
      toast.error("Failed to delete transaction");
      console.log("Failed to delete transaction", error);
    }
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
                    ₹{formatCurrency(stats.balance)}
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
                    ₹{formatCurrency(stats.income)}
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
                    ₹{formatCurrency(stats.expense)}
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
              Showing {transactions.length} transactions
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-lg border border-gray-200 border-dashed mt-4">
              <div className="bg-gray-50 p-4 rounded-full mb-4">
                <FileText className="text-gray-400 w-10 h-10" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No transactions found
              </h3>
              <p className="text-gray-500 text-center max-w-sm">
                Start by adding a new cash in or cash out transaction to this
                book.
              </p>
            </div>
          ) : (
            <>
              {/* --- DESKTOP TABLE --- */}
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
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(tx.transaction_datetime).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(tx.transaction_datetime).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {tx.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tx.category_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              tx.payment_mode === "Online" ||
                              tx.payment_mode === "Card"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {tx.payment_mode}
                          </span>
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                            tx.transaction_type === "cash_in"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.transaction_type === "cash_in" ? "+" : "-"}
                          {formatCurrency(Number(tx.amount))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                          {formatCurrency(Number(tx.balance))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => promptDelete(tx.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* --- MOBILE CARD LIST --- */}
              <div className="space-y-3 mt-3 md:hidden">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <span className="text-base font-semibold text-gray-900">
                          {tx.description}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-lg font-bold ${
                            tx.transaction_type === "cash_in"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.transaction_type === "cash_in" ? "+" : ""}
                          {formatCurrency(Number(tx.amount))}
                        </span>
                        <button
                          onClick={() => promptDelete(tx.id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        <div>
                          {new Date(tx.transaction_datetime).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                          ,{" "}
                          {new Date(tx.transaction_datetime).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </div>
                        <div className="mt-1">
                          Balance:
                          <span className="font-medium text-gray-700 ml-1">
                            {formatCurrency(Number(tx.balance))}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="text-gray-500">{tx.category_name}</div>
                        <span
                          className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            tx.payment_mode === "Online" ||
                            tx.payment_mode === "Card"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {tx.payment_mode}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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

      {/* Transaction Modals */}
      {isIncomeModalOpen && (
        <CreateTransactionModal
          type="cash_in"
          cashbookId={searchParams.get("id") || ""}
          onClose={() => setIsIncomeModalOpen(false)}
          onSuccess={fetchTransactions}
        />
      )}

      {isExpenseModalOpen && (
        <CreateTransactionModal
          type="cash_out"
          cashbookId={searchParams.get("id") || ""}
          onClose={() => setIsExpenseModalOpen(false)}
          onSuccess={fetchTransactions}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Delete Transaction?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete this transaction? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
