// components/CashbookCard.tsx
import React, { useState } from "react";
// Import Lucid icons
import { Star, MoreVertical, BookOpen, Edit, Trash, Archive, ArchiveXIcon, ArchiveRestore } from "lucide-react";
import Link from "next/link";
import api from "@/app/services/api";
import toast from "react-hot-toast";

interface CashbookCardProps {
  id : string;
  title: string;
  description?: string;
  balance: string;
  transactions: number;
  isFavorite?: boolean;
  isArchived?: boolean;
}

const CashbookCard: React.FC<CashbookCardProps> = ({
  title,
  balance,
  transactions,
  isFavorite,
  isArchived,
  description,
  id,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try{
      await api.delete(`/cashbook/${id}`);
      toast.success("Cashbook deleted successfully");
      window.location.reload(); 
    }catch(error){
      console.log(error);
    }finally{
      setShowDeleteModal(false);
    }
  }

  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        {/* Card Icon */}
        <div className="w-10 h-10 rounded-lg grid place-items-center bg-blue-100 text-blue-500">
          <BookOpen size={18} />
        </div>

        {/* Card Actions */}
        <div className="flex gap-1">
          <button className="bg-transparent border-none text-gray-400 cursor-pointer p-1 hover:text-gray-600">
            {isFavorite ? (
              // Use fill-current and text-yellow-500 for a solid star
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
            ) : (
              <Star size={16} />
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-transparent border-none text-gray-400 cursor-pointer p-1 hover:text-gray-600"
            >
              <MoreVertical size={16} />
            </button>
            {showDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-20 border border-gray-100 py-1">
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    onClick={() => setShowDropdown(false)}
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    onClick={() => {
                      setShowDropdown(false);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash size={14} /> Delete
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-2"
                    onClick={() => {
                      setShowDropdown(false);
                      setShowDeleteModal(true);
                    }}
                  >
                    <ArchiveRestore size={14} /> Archive
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-6 hover:text-blue-600">
        <Link href={`/home/cashbooks/transactions?id=${id}&&title=${title}`}> {title}</Link>
      </h3>

      {/* Card Stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Balance</span>
          <span className="text-xl font-semibold text-green-500">
            {balance}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Transactions</span>
          <span className="text-base font-semibold text-gray-900">
            {transactions}
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-gray-200 pt-4 mt-6 text-xs text-gray-500">
        <span className="block mb-1">Description</span>
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium">
            {description || "No description provided"}
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Cashbook?</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete <span className="font-semibold">"{title}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default CashbookCard;
