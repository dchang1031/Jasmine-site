import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface HeroProps {
  onScrollToSamples: () => void;
  onScrollToBooking: () => void;
}

const heroImages = [
  '/src/assets/images/hero_jasmine_portrait_1790733232771.jpg',
  '/src/assets/images/hero_jasmine_2.jpg',
  '/src/assets/images/hero_jasmine_3.jpg',
];

export const Hero: React.FC<HeroProps> = ({ onScrollToSamples, onScrollToBooking }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImage((index) => (index + 1) % heroImages.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

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
            <h1 className="font-display text-[120px] font-black tracking-tighter text-[#f3dfc6] mb-6 leading-none">
              Hi, I'm Jasmine.
            </h1>
            <p className="text-xl font-medium text-[#f3dfc6] mb-10 max-w-md">
              I am a voice actress who brings characters to life with grit, soul, and a splash of magic.
            </p>
            <div className="flex gap-4">
              <button onClick={onScrollToSamples} className="bg-[#f3dfc6] text-[#6d1822] px-8 py-4 font-bold text-lg hover:bg-gray-100 rounded-full">
                Listen Now
              </button>
              <button onClick={onScrollToBooking} className="border-2 border-[#f3dfc6] text-[#f3dfc6] px-8 py-4 font-bold text-lg hover:bg-[#f3dfc6] hover:text-[#6d1822] rounded-full">
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
            <motion.div
              className="relative w-[350px] h-[500px] overflow-hidden card-rounded"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <AnimatePresence initial={false} mode="sync">
                <motion.img
                  key={heroImages[currentImage]}
                  src={heroImages[currentImage]}
                  alt="Jasmine"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
