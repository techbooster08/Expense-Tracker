// components/CreateCashbookModal.tsx
import React from 'react';
import { X } from 'lucide-react';

// Define the props our modal will accept
interface CreateCashbookModalProps {
  onClose: () => void; // A function to close the modal
}

const CreateCashbookModal: React.FC<CreateCashbookModalProps> = ({ onClose }) => {
  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Cashbook
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="cashbookName"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Cashbook Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cashbookName"
              placeholder="e.g., Personal Expenses, Business, Travel"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="What will you track in this cashbook?"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue"
            />
          </div>
        </form>

        {/* Quick Start Tips */}
        <div className="mt-6 rounded-lg bg-indigo-50/70 p-4">
          <h4 className="font-semibold text-primary-blue">Quick Start Tips:</h4>
          <ul className="mt-2 space-y-1.5">
            {[
              'Use specific names like "November Budget" or "Travel Fund"',
              'You can add transactions immediately after creation',
              'Track both income and expenses in each book',
            ].map((tip) => (
              <li key={tip} className="flex items-center text-sm text-gray-600">
                <span className="mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            type="button"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose} // In a real app, this would submit the form
            type="submit"
            className="rounded-lg border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-opacity-90"
          >
            Create Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCashbookModal;