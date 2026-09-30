import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onDirectBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDirectBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 mx-4 bg-[#f3dfc6] rounded-full shadow-lg max-w-[1024px] mx-auto">
      <div className="px-6 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#hero" className="font-display text-4xl font-black text-[#6d1822]">
          J
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-[#6d1822]">
          <a href="#about" className="hover:text-gray-700">About</a>
          <a href="#samples" className="hover:text-gray-700">Work</a>
          <a href="#hobbies" className="hover:text-gray-700">Hobbies</a>
          <button onClick={onDirectBooking} className="bg-[#6d1822] text-[#f3dfc6] px-5 py-2 hover:bg-gray-900 rounded-full">
            Inquire
          </button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-8 h-8 text-[#6d1822]" /> : <Menu className="w-8 h-8 text-[#6d1822]" />}
        </button>
      </div>
    </header>
  );
};
