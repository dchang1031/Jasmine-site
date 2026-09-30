import React from 'react';

interface HeroProps {
  onScrollToSamples: () => void;
  onScrollToBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSamples, onScrollToBooking }) => {
  return (
    <section id="hero" className="relative pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Image Container */}
          <div className="w-full md:w-2/3 z-0">
            <img 
              src="/src/assets/images/hero_jasmine_portrait_1790733232771.jpg" 
              alt="Jasmine" 
              className="w-[350px] h-[500px] object-cover card-rounded" 
            />
          </div>

          {/* Editorial Text Card - partially overlapping */}
          <div className="w-full md:w-1/2 md:-ml-24 p-10 bg-[#f8f1f9] card-rounded border border-[#8e2d56]/20 shadow-xl z-10">
            <h1 className="font-display text-7xl font-black tracking-tighter text-[#2d0a2a] mb-6">
              Hi, I'm Jasmine.
            </h1>
            <p className="text-xl font-medium text-[#2d0a2a] mb-10">
              I am a voice actress who brings characters to life with grit, soul, and a splash of magic.
            </p>
            <div className="flex gap-4">
              <button onClick={onScrollToSamples} className="bg-[#8e2d56] text-white px-8 py-4 font-bold text-lg hover:bg-[#a6519b] rounded-full">
                Listen Now
              </button>
              <button onClick={onScrollToBooking} className="border-2 border-[#8e2d56] text-[#8e2d56] px-8 py-4 font-bold text-lg hover:bg-[#8e2d56] hover:text-white rounded-full">
                Book
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
