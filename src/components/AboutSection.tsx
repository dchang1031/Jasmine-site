import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#f3e5f5] p-8 card-rounded">
          
          <div className="relative">
             <img src="/src/assets/images/bio_studio_microphone_1790733243013.jpg" alt="Studio" className="w-full h-auto aspect-video object-cover rounded-[40px]" />
             <div className="sticker absolute -bottom-8 -left-8 bg-[#8e2d56] text-white w-28 h-28 rounded-blob flex items-center justify-center font-bold">NEW!</div>
          </div>

          <div className="space-y-6">
            <h2 className="font-display text-7xl font-black tracking-tighter text-[#2d0a2a]">About</h2>
            <p className="text-xl leading-relaxed text-[#2d0a2a]">
              Hi, I’m Jasmine. I bring stories to life with a dash of soul and a lot of grit. 
            </p>
            <div className="border-l-4 border-[#8e2d56] pl-6 py-2">
              <p className="font-editorial text-2xl italic">"Every voice is a universe."</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
