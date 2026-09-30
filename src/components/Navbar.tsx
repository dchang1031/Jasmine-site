import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onDirectBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDirectBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-4 z-40 mx-4 bg-[#f8f1f9] border border-[#8e2d56]/20 rounded-full shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#hero" className="font-display text-4xl font-black text-[#8e2d56]">
          J
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-[#2d0a2a]">
          <a href="#about" className="hover:text-[#8e2d56]">About</a>
          <a href="#samples" className="hover:text-[#8e2d56]">Work</a>
          <a href="#hobbies" className="hover:text-[#8e2d56]">Hobbies</a>
          <button onClick={onDirectBooking} className="bg-[#2d0a2a] text-white px-5 py-2 hover:bg-[#8e2d56] rounded-full">
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
