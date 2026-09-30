import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FillButton } from './FillButton';

interface NavbarProps {
  onDirectBooking: () => void;
  onNavigate: (id: 'hero' | 'about' | 'samples' | 'hobbies' | 'booking') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDirectBooking, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 mx-4 bg-[#825260] rounded-full shadow-lg max-w-[1024px] mx-auto">
      <div className="px-6 h-16 md:h-20 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className="font-display text-3xl md:text-4xl font-black text-[#f3dfc6]"
        >
          J
        </button>

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
          <FillButton
            variant="solid"
            onClick={onDirectBooking}
            className="!px-5 !py-2 !text-sm !font-bold uppercase tracking-widest"
          >
            Inquire
          </FillButton>
        </nav>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7 text-[#f3dfc6]" />
          ) : (
            <Menu className="w-7 h-7 text-[#f3dfc6]" />
          )}
        </button>
      </div>

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
          <FillButton
            variant="solid"
            onClick={() => {
              onDirectBooking();
              setMobileMenuOpen(false);
            }}
            className="!px-5 !py-2 !text-sm w-fit"
          >
            Inquire
          </FillButton>
        </div>
      )}
    </header>
  );
};
