import React from 'react';

export const BookingSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-20">
      <h2 className="font-display text-7xl font-black tracking-tighter mb-16 text-[#8e2d56]">
        Let's connect for your project.
      </h2>

      <div className="p-10 bg-[#825260] max-w-2xl rounded-[40px]">
        <p className="text-xl mb-8 text-[#f3dfc6]">Let's build something unforgettable.</p>
        <a
          href="mailto:booking@jasminegabrielle.com"
          className="inline-block bg-[#8e2d56] text-white px-8 py-4 font-bold text-lg hover:bg-[#a6519b] rounded-full"
        >
          booking@jasminegabrielle.com
        </a>
      </div>
    </div>
  );
};
