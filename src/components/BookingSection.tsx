import React from 'react';

export const BookingSection: React.FC = () => {
  return (
    <section id="booking" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-7xl font-black tracking-tighter mb-16 text-[#2d0a2a]">Contact</h2>
        
        <div className="p-10 bg-[#f3e5f5] border border-[#8e2d56]/20 max-w-2xl rounded-[40px]">
          <p className="text-xl mb-8 text-[#2d0a2a]">Let's build something unforgettable.</p>
          <a href="mailto:booking@jasminegabrielle.com" className="inline-block bg-[#8e2d56] text-white px-8 py-4 font-bold text-lg hover:bg-[#a6519b] rounded-full">
            booking@jasminegabrielle.com
          </a>
        </div>
      </div>
    </section>
  );
};
