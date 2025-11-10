// components/CashbookCard.tsx
import React from 'react';
// Import Lucid icons
import { Star, MoreVertical } from 'lucide-react';

interface CashbookCardProps {
  title: string;
  balance: string;
  transactions: number;
  lastActivity: string;
  time: string;
  icon: React.ReactNode;
  isFavorite?: boolean;
}

const CashbookCard: React.FC<CashbookCardProps> = ({
  title,
  balance,
  transactions,
  lastActivity,
  time,
  icon,
  isFavorite = false,
}) => {
  return (
    <article className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        {/* Card Icon */}
        <div className="w-10 h-10 rounded-lg grid place-items-center bg-blue-100 text-blue-500">
          {/* Icon is passed as a prop, unchanged here */}
          {icon}
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
          <button className="bg-transparent border-none text-gray-400 cursor-pointer p-1 hover:text-gray-600">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>

      {/* Card Stats */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Balance</span>
          <span className="text-xl font-semibold text-green-500">{balance}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Transactions</span>
          <span className="text-base font-semibold text-gray-900">{transactions}</span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-t border-gray-200 pt-4 mt-6 text-xs text-gray-500">
        <span className="block mb-1">Last activity</span>
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium">{lastActivity}</span>
          <time className="text-gray-500">{time}</time>
        </div>
      </div>
    </article>
  );
};

export default CashbookCard;