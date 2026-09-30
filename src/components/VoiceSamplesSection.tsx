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

/** Large rounded-corner play triangle */
const RoundedPlayTriangle = () => (
  <svg
    width="48"
    height="54"
    viewBox="0 0 28 32"
    fill="none"
    className="ml-1.5 drop-shadow-md"
    aria-hidden
  >
    <path
      d="M3.5 4.2C3.5 2.1 5.7 0.8 7.5 1.8L24.2 11.3C26.1 12.4 26.1 15.1 24.2 16.2L7.5 25.7C5.7 26.7 3.5 25.4 3.5 23.3V4.2Z"
      fill="#f3dfc6"
      stroke="#f3dfc6"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

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
        w-[88px] h-[88px] md:w-[100px] md:h-[100px]
        bg-[#825260]/90 backdrop-blur-sm
        shadow-[0_8px_28px_rgba(0,0,0,0.35)]
        transition-all duration-300
        group-hover:scale-110 group-hover:bg-[#825260]
        ${
          playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }
      `}
      style={{
        borderRadius: '58% 42% 55% 45% / 48% 52% 42% 58%',
      }}
    >
      {playing ? (
        <span className="flex gap-2">
          <span className="w-3 h-9 bg-[#f3dfc6] rounded-full" />
          <span className="w-3 h-9 bg-[#f3dfc6] rounded-full" />
        </span>
      ) : (
        <RoundedPlayTriangle />
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
      <div className="relative overflow-hidden rounded-[32px] bg-[#825260] shadow-xl aspect-video">
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
        <SampleCard sample={SAMPLES[0]} align="left" />
        <SampleCard sample={SAMPLES[1]} align="right" />
      </div>
    </div>
  );
};
