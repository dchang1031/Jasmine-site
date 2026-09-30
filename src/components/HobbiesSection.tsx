import React from 'react';

export const HobbiesSection: React.FC = () => {
  return (
    <section id="hobbies" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-7xl font-black tracking-tighter mb-16 text-[#2d0a2a]">Hobbies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* DnD Card */}
          <div className="p-8 bg-[#a6519b] rounded-[40px] text-white">
            <h3 className="text-4xl font-black mb-4">DnD</h3>
            <p className="text-lg">Roll for initiative! Tabletop gaming is my favorite way to experiment with characters.</p>
          </div>

          {/* Cosplay Card */}
          <div className="p-8 bg-[#8e2d56] rounded-[40px] text-white">
            <h3 className="text-4xl font-black mb-4">COSPLAY</h3>
            <p className="text-lg">Fabricating my own armor and costumes from scratch.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
