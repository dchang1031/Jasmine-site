import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onDirectBooking: () => void;
  onNavigate: (id: 'hero' | 'about' | 'samples' | 'hobbies' | 'booking') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDirectBooking, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-4 bg-[#825260] rounded-full shadow-lg max-w-[1024px] mx-auto">
      <div className="px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className="font-display text-4xl font-black text-[#f3dfc6]"
        >
          J
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-[#f3dfc6]">
          <button type="button" onClick={() => onNavigate('about')} className="hover:text-gray-200">
            About
          </button>
          <button type="button" onClick={() => onNavigate('samples')} className="hover:text-gray-200">
            Work
          </button>
          <button type="button" onClick={() => onNavigate('hobbies')} className="hover:text-gray-200">
            Hobbies
          </button>
          <button
            type="button"
            onClick={onDirectBooking}
            className="bg-[#f3dfc6] text-black px-5 py-2 hover:bg-gray-200 rounded-full"
          >
            Inquire
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-8 h-8 text-[#f3dfc6]" />
          ) : (
            <Menu className="w-8 h-8 text-[#f3dfc6]" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 text-[#f3dfc6] font-bold uppercase tracking-widest">
          <button
            type="button"
            onClick={() => {
              onNavigate('about');
              setMobileMenuOpen(false);
            }}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('samples');
              setMobileMenuOpen(false);
            }}
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => {
              onNavigate('hobbies');
              setMobileMenuOpen(false);
            }}
          >
            Hobbies
          </button>
          <button
            type="button"
            onClick={() => {
              onDirectBooking();
              setMobileMenuOpen(false);
            }}
            className="bg-[#f3dfc6] text-black px-5 py-2 rounded-full w-fit"
          >
            Inquire
          </button>
        </div>
      )}
    </header>
  );
};
