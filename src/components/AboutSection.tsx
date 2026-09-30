import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#825260] p-8 card-rounded"
        >
          
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative">
             <img src="/src/assets/images/bio_studio_microphone_1790733243013.jpg" alt="Studio" className="w-full h-auto aspect-video object-cover rounded-[40px]" />
             <div className="sticker absolute -bottom-8 -left-8 bg-[#8e2d56] text-white w-28 h-28 rounded-blob flex items-center justify-center font-bold">NEW!</div>
          </motion.div>

          <div className="space-y-6">
            <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="font-display text-7xl font-black tracking-tighter text-[#f3dfc6]">This is who I am.</motion.h2>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-xl leading-relaxed text-[#f3dfc6]">
              Hi, I'm Jasmine. I bring stories to life with a dash of soul and a lot of grit. 
            </motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="border-l-4 border-[#f3dfc6] pl-6 py-2">
              <p className="font-editorial text-2xl italic text-[#f3dfc6]">"Every voice is a universe."</p>
            </motion.div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};
