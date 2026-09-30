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
    <header
      className="fixed top-4 left-0 right-0 z-50 mx-4 bg-[#a87884]/95 backdrop-blur-md shadow-lg max-w-[1024px] mx-auto rounded-3xl md:rounded-full border border-[#f3dfc6]/15"
    >
      <div className="px-6 h-16 md:h-20 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('hero')}
          className="font-display text-3xl md:text-4xl font-black text-[#f3dfc6] transition-colors hover:text-white"
        >
          J
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-[#f3dfc6]">
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="transition-colors hover:text-white"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => onNavigate('samples')}
            className="transition-colors hover:text-white"
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => onNavigate('hobbies')}
            className="transition-colors hover:text-white"
          >
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
          className="md:hidden text-[#f3dfc6] transition-colors hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-5 flex flex-col items-start gap-4 text-[#f3dfc6] font-bold uppercase tracking-widest text-sm">
          <button
            type="button"
            className="py-1 transition-colors hover:text-white"
            onClick={() => {
              onNavigate('about');
              setMobileMenuOpen(false);
            }}
          >
            About
          </button>
          <button
            type="button"
            className="py-1 transition-colors hover:text-white"
            onClick={() => {
              onNavigate('samples');
              setMobileMenuOpen(false);
            }}
          >
            Work
          </button>
          <button
            type="button"
            className="py-1 transition-colors hover:text-white"
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
            className="!px-5 !py-2 !text-sm !font-bold uppercase tracking-widest"
          >
            Inquire
          </FillButton>
        </div>
      )}
    </header>
  );
};
