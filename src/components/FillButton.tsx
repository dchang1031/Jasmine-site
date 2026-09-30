import React, { useState } from 'react';

type Variant = 'solid' | 'outline';

interface FillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

/**
 * Left→right background fill. One text element stays in place;
 * text color inverts on hover (desktop) / press (mobile).
 */
export const FillButton: React.FC<FillButtonProps> = ({
  variant = 'solid',
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);
  const isSolid = variant === 'solid';

  // Default surface
  const shell = isSolid
    ? 'bg-[#f3dfc6] border-2 border-[#f3dfc6]'
    : 'bg-transparent border-2 border-[#f3dfc6]';

  // Default text color
  const textDefault = isSolid ? 'text-[#6d1822]' : 'text-[#f3dfc6]';
  // Inverted text color when filled
  const textFilled = isSolid ? 'text-[#f3dfc6]' : 'text-[#6d1822]';

  // Fill background color
  const fillBg = isSolid ? 'bg-[#6d1822]' : 'bg-[#f3dfc6]';

  return (
    <button
      type="button"
      {...rest}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => window.setTimeout(() => setPressed(false), 220)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      className={`
        fill-btn group relative inline-flex items-center justify-center overflow-hidden
        rounded-full px-8 py-4 font-bold text-lg select-none
        ${shell}
        ${className}
      `}
    >
      {/* Background fill — expands L→R, sits behind text */}
      <span
        aria-hidden
        className={`
          fill-layer absolute inset-0 z-0 origin-left
          transition-transform duration-300 ease-out
          ${fillBg}
          ${pressed ? 'is-pressed' : ''}
        `}
      />

      {/* Single text element — stays in place, color inverts when filled */}
      <span
        className={`
          relative z-10 transition-colors duration-300 ease-out
          ${textDefault}
          fill-btn-label
          ${pressed ? textFilled : ''}
        `}
      >
        {children}
      </span>
    </button>
  );
};

export const FillLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: Variant;
    children: React.ReactNode;
    className?: string;
  }
> = ({ variant = 'solid', children, className = '', ...rest }) => {
  const [pressed, setPressed] = useState(false);
  const isSolid = variant === 'solid';

  const shell = isSolid
    ? 'bg-[#f3dfc6] border-2 border-[#f3dfc6]'
    : 'bg-transparent border-2 border-[#f3dfc6]';

  const textDefault = isSolid ? 'text-[#6d1822]' : 'text-[#f3dfc6]';
  const textFilled = isSolid ? 'text-[#f3dfc6]' : 'text-[#6d1822]';
  const fillBg = isSolid ? 'bg-[#6d1822]' : 'bg-[#f3dfc6]';

  return (
    <a
      {...rest}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => window.setTimeout(() => setPressed(false), 220)}
      onPointerLeave={() => setPressed(false)}
      className={`
        fill-btn group relative inline-flex items-center justify-center overflow-hidden
        rounded-full px-8 py-4 font-bold text-lg select-none
        ${shell}
        ${className}
      `}
    >
      <span
        aria-hidden
        className={`
          fill-layer absolute inset-0 z-0 origin-left
          transition-transform duration-300 ease-out
          ${fillBg}
          ${pressed ? 'is-pressed' : ''}
        `}
      />
      <span
        className={`
          relative z-10 transition-colors duration-300 ease-out
          ${textDefault}
          fill-btn-label
          ${pressed ? textFilled : ''}
        `}
      >
        {children}
      </span>
    </a>
  );
};
