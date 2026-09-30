import React from 'react';

export const HobbiesSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-20">
      <h2 className="font-display text-7xl font-black tracking-tighter mb-16 text-[#8e2d56]">
        What I love to do outside of work.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DnD Card */}
        <div className="p-8 bg-[#825260] rounded-[40px]">
          <h3 className="text-4xl font-black mb-4 text-[#f3dfc6]">DnD</h3>
          <p className="text-lg text-[#f3dfc6]">
            Roll for initiative! Tabletop gaming is my favorite way to experiment with characters.
          </p>
        </div>

        {/* Cosplay Card */}
        <div className="p-8 bg-[#825260] rounded-[40px]">
          <h3 className="text-4xl font-black mb-4 text-[#f3dfc6]">COSPLAY</h3>
          <p className="text-lg text-[#f3dfc6]">
            Fabricating my own armor and costumes from scratch.
          </p>
        </div>
      </div>
    </div>
  );
};
