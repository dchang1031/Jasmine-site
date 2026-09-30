import React, { useRef } from 'react';
import { SAMPLES, VoiceSampleData, audioPlayer } from '../utils/audioEngine';

export const VoiceSamplesSection: React.FC = () => {
  const canvasRefs = {
    'sample-1': useRef<HTMLCanvasElement | null>(null),
    'sample-2': useRef<HTMLCanvasElement | null>(null),
  };

  const handleTogglePlay = (sample: VoiceSampleData) => {
    audioPlayer.play(sample, () => {}, () => {});
  };

  return (
    <section id="samples" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-7xl font-black tracking-tighter mb-16 text-[#2d0a2a]">Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SAMPLES.map((sample) => (
            <div key={sample.id} className="p-4 bg-[#f3e5f5] rounded-[40px] border border-[#8e2d56]/20">
              <canvas ref={canvasRefs[sample.id as 'sample-1' | 'sample-2']} width={640} height={360} className="w-full h-auto cursor-pointer rounded-[30px]" onClick={() => handleTogglePlay(sample)} />
              <h3 className="text-2xl font-bold mt-4 px-2 text-[#2d0a2a]">{sample.title}</h3>
              <p className="text-sm uppercase tracking-widest px-2 pb-4 text-[#8e2d56]">{sample.character}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
