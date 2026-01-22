
import React, { useState } from 'react';
import { InvitationData } from '../types';

interface Props {
  initialData: InvitationData;
  onUpdate: (data: InvitationData) => void;
  onBack: () => void;
  onNext: () => void;
}

const InvitationForm: React.FC<Props> = ({ initialData, onUpdate, onBack, onNext }) => {
  const [data, setData] = useState<InvitationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };
    setData(newData);
    onUpdate(newData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onUpdate(data);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onNext();
    }, 400);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border-b border-orange-100 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 hindi-font">
          चरण 2: आमंत्रण विवरण भरें
        </h2>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2 hindi-font">1. विद्यालय का नाम (Heading)</label>
          <textarea
            name="vidhyalayName"
            value={data.vidhyalayName}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all resize-none h-24 font-medium hindi-font text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2 hindi-font">2. अतिथि का नाम</label>
          <input
            type="text"
            name="guestName"
            value={data.guestName}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium hindi-font text-black"
            placeholder="नाम यहाँ लिखें"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2 hindi-font">3. दिनांक</label>
            <input
              type="text"
              name="date"
              value={data.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium hindi-font text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-600 mb-2 hindi-font">4. समय (बजे)</label>
            <select
              name="time"
              value={data.time}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all font-medium hindi-font text-black bg-white cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2 hindi-font">5. निवेदक विवरण</label>
          <textarea
            name="nivedak"
            value={data.nivedak}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-500 outline-none transition-all resize-none h-32 font-medium hindi-font text-black"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all hindi-font"
        >
          ← वापस (Step 1)
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-[2] bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span className="hindi-font text-lg">कार्ड तैयार करें →</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default InvitationForm;
