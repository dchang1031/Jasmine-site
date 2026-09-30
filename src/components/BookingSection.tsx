import React from 'react';
import { FillLink } from './FillButton';

export const BookingSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-10 md:py-20">
      <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-8 md:mb-16 text-[#f3dfc6]">
        Let's connect for your project.
      </h2>

      <div className="p-8 md:p-10 bg-[#825260] max-w-2xl rounded-[40px]">
        <p className="text-lg md:text-xl mb-6 md:mb-8 text-[#f3dfc6]">
          Let's build something unforgettable.
        </p>
        <FillLink
          href="mailto:booking@jasminegabrielle.com"
          variant="solid"
          className="!bg-[#f3dfc6] !text-[#6d1822]"
        >
          booking@jasminegabrielle.com
        </FillLink>
      </div>
    </div>
  );
};
