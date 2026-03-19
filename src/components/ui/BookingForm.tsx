"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingForm = ({ isOpen, onClose }: BookingFormProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col font-sans"
          >
            <div className="p-8 border-b border-gray-100 flex items-center justify-between text-black">
              <h2 className="font-serif text-3xl tracking-widest uppercase">Reserve</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 flex-1 overflow-y-auto">
              <p className="text-gray-500 mb-8 lowercase tracking-widest text-sm">Experience the extraordinary</p>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 text-gray-400">Destination</label>
                  <select className="w-full border-b border-gray-200 text-black py-3 focus:outline-none focus:border-brand-turquoise transition-colors bg-transparent appearance-none rounded-none">
                    <option>The Canopy Villa</option>
                    <option>Infinity Pool Suite</option>
                    <option>Presidential Reserve</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 text-gray-400">Check In</label>
                    <input type="date" className="w-full border-b border-gray-200 text-black py-3 focus:outline-none focus:border-brand-turquoise transition-colors bg-transparent text-sm appearance-none rounded-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2 text-gray-400">Check Out</label>
                    <input type="date" className="w-full border-b border-gray-200 text-black py-3 focus:outline-none focus:border-brand-turquoise transition-colors bg-transparent text-sm appearance-none rounded-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 text-gray-400">Guests</label>
                  <select className="w-full border-b border-gray-200 text-black py-3 focus:outline-none focus:border-brand-turquoise transition-colors bg-transparent appearance-none rounded-none">
                    <option>2 Adults</option>
                    <option>2 Adults, 1 Child</option>
                    <option>4 Adults</option>
                  </select>
                </div>
              </form>
            </div>
            
            <div className="p-8 bg-gray-50">
              <div className="flex items-center justify-between mb-6">
                <span className="uppercase text-xs tracking-widest text-gray-500">Total</span>
                <span className="font-serif text-2xl tracking-widest text-black">₹450,000</span>
              </div>
              <button 
                onClick={() => alert("Payment Intent Started...")}
                className="w-full bg-brand-turquoise text-white py-4 font-sans text-sm tracking-widest uppercase hover:bg-brand-turquoise/90 transition-colors"
              >
                Confirm & Pay
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
