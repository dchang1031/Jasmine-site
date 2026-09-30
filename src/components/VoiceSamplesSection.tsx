import React, { useRef, useState } from 'react';

interface SampleVideo {
  id: string;
  src: string;
  title: string;
}

const SAMPLES: SampleVideo[] = [
  {
    id: 'mitsuri',
    src: '/src/assets/images/Mitsuri.mp4',
    title: 'Mitsuri',
  },
  {
    id: 'oogway',
    src: '/src/assets/images/oogway.mp4',
    title: 'Oogway',
  },
];

const ArtisticPlayButton: React.FC<{ playing: boolean; onClick: () => void }> = ({
  playing,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={playing ? 'Pause' : 'Play'}
    className="absolute inset-0 z-10 flex items-center justify-center group"
  >
    <span
      className={`
        relative flex items-center justify-center
        w-20 h-20 md:w-24 md:h-24
        rounded-full
        bg-[#825260]/85 backdrop-blur-sm
        border-2 border-[#f3dfc6]/60
        shadow-[0_0_0_6px_rgba(130,82,96,0.25)]
        transition-all duration-300
        group-hover:scale-110 group-hover:border-[#f3dfc6] group-hover:bg-[#825260]
        ${
          playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }
      `}
    >
      {/* Decorative outer ring */}
      <span className="absolute inset-[-6px] rounded-full border border-[#f3dfc6]/20 pointer-events-none" />

      {playing ? (
        /* Pause icon */
        <span className="flex gap-1.5">
          <span className="w-2 h-7 bg-[#f3dfc6] rounded-sm" />
          <span className="w-2 h-7 bg-[#f3dfc6] rounded-sm" />
        </span>
      ) : (
        /* Artistic triangle */
        <span
          className="ml-1 w-0 h-0"
          style={{
            borderTop: '14px solid transparent',
            borderBottom: '14px solid transparent',
            borderLeft: '24px solid #f3dfc6',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          }}
        />
      )}
    </span>
  </button>
);

const SampleCard: React.FC<{ sample: SampleVideo; align: 'left' | 'right' }> = ({
  sample,
  align,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className={`w-full max-w-xl ${
        align === 'left' ? 'self-start' : 'self-end'
      }`}
    >
      <div className="relative overflow-hidden rounded-[32px] bg-[#825260] shadow-xl border border-[#f3dfc6]/15 aspect-video">
        <video
          ref={videoRef}
          src={sample.src}
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
        <ArtisticPlayButton playing={playing} onClick={toggle} />
      </div>
      <p className="mt-3 px-2 text-sm font-bold uppercase tracking-widest text-[#f3dfc6]/80">
        {sample.title}
      </p>
    </div>
  );
};

export const VoiceSamplesSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 w-full py-10 flex flex-col gap-10">
      <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#f3dfc6]">
        Here are 2 of my samples
      </h2>

      <div className="flex flex-col gap-12">
        {/* Top sample — left */}
        <SampleCard sample={SAMPLES[0]} align="left" />
        {/* Bottom sample — right */}
        <SampleCard sample={SAMPLES[1]} align="right" />
      </div>
    </div>
  );
};
