import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onScrollToSamples: () => void;
  onScrollToBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSamples, onScrollToBooking }) => {
  return (
    <section id="hero" className="relative pt-10 pb-20">
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center gap-0 max-w-7xl px-6">
          
          {/* Editorial Text - Center */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 z-10 flex flex-col items-center text-center"
          >
            <h1 className="font-display text-[120px] font-black tracking-tighter text-[#8e2d56] mb-6 leading-none">
              Hi, I'm Jasmine.
            </h1>
            <p className="text-xl font-medium text-[#8e2d56] mb-10 max-w-md">
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
          </motion.div>

          {/* Image - Right */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-1/2 flex justify-center -ml-20 md:ml-0 mt-32 md:mt-20"
          >
            <img 
              src="/src/assets/images/hero_jasmine_portrait_1790733232771.jpg" 
              alt="Jasmine" 
              className="w-[350px] h-[500px] object-cover card-rounded" 
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
