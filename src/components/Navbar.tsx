import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onDirectBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDirectBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 mx-4 bg-[#8e2d56] rounded-full shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#hero" className="font-display text-4xl font-black text-white">
          J
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white">
          <a href="#about" className="hover:text-gray-200">About</a>
          <a href="#samples" className="hover:text-gray-200">Work</a>
          <a href="#hobbies" className="hover:text-gray-200">Hobbies</a>
          <button onClick={onDirectBooking} className="bg-white text-[#8e2d56] px-5 py-2 hover:bg-gray-100 rounded-full">
            Inquire
          </button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>
    </header>
  );
};
