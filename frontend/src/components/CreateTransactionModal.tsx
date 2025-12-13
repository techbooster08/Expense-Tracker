import React, { useEffect, useState } from 'react';
import { X, Calendar, Tag, CreditCard, FileText, IndianRupee, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/app/services/api';

interface CreateTransactionModalProps {
  onClose: () => void;
  type: 'cash_in' | 'cash_out';
  cashbookId: string;
  onSuccess?: () => void;
}

const CreateTransactionModal: React.FC<CreateTransactionModalProps> = ({ 
  onClose, 
  type, 
  cashbookId,
  onSuccess 
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategory] = useState([]);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().slice(0, 16)); // YYYY-MM-DDTHH:mm
  const [loading, setLoading] = useState(false);

  const isCashIn = type === 'cash_in';
  const title = isCashIn ? 'Cash In' : 'Cash Out';

  useEffect(()=>{
    const fetchCategories = async ()=>{
      const res = await api.get("/transaction/category");
      setCategory(res.data.categories);
    }
    if(cashbookId){
      fetchCategories();
    }
  },[]);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount))) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    setLoading(true);
    try {
      await api.post("/transaction", {
        cashbook_id: cashbookId,
        amount: parseFloat(amount),
        transaction_type: type,
        description,
        payment_mode: paymentMode,
        transaction_datetime: new Date(transactionDate).toISOString(),
        category_id: categoryId,
      });
      
      toast.success("Transaction added successfully");
      if (onSuccess) onSuccess();
      onClose();
      if (!onSuccess) window.location.reload();

    } catch (error) {
      console.error(error);
      toast.error("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-6 py-4 flex items-center justify-between ${isCashIn ? 'bg-green-50' : 'bg-red-50'} border-b ${isCashIn ? 'border-green-100' : 'border-red-100'}`}>
          <div>
            <h2 className={`text-xl font-bold ${isCashIn ? 'text-green-700' : 'text-red-700'}`}>
              Add {title}
            </h2>
            <p className={`text-xs ${isCashIn ? 'text-green-600' : 'text-red-600'} opacity-80`}>
              Record a new {isCashIn ? 'income' : 'expense'} transaction
            </p>
          </div>
          <button
            onClick={onClose}
            className={`rounded-full p-2 transition-colors ${isCashIn ? 'hover:bg-green-100 text-green-700' : 'hover:bg-red-100 text-red-700'}`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto">
          <form id="transaction-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee size={20} className={isCashIn ? 'text-green-600' : 'text-red-600'} />
                </div>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className={`block w-full pl-10 pr-4 py-3 text-2xl font-bold text-gray-900 rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:border-transparent transition-all ${
                    isCashIn 
                      ? 'focus:ring-green-500/20 border-green-200 bg-green-50/30' 
                      : 'focus:ring-red-500/20 border-red-200 bg-red-50/30'
                  }`}
                />
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Date & Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={18} className="text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  required
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag size={18} className="text-gray-400" />
                </div>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat : any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Cash', 'Online', 'Card'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border text-sm font-medium transition-all ${
                      paymentMode === mode
                        ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {mode === 'Cash' && <IndianRupee size={16} className="mb-1" />}
                    {mode === 'Online' && <CreditCard size={16} className="mb-1" />}
                    {mode === 'Card' && <CreditCard size={16} className="mb-1" />}
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                  <FileText size={18} className="text-gray-400" />
                </div>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add notes about this transaction..."
                  className="block w-full pl-10 pr-3 py-2.5 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>
            </div>

          </form>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="transaction-form"
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors ${
              isCashIn 
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Save Transaction
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTransactionModal;