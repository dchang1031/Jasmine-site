import React, { useState } from 'react';

type Variant = 'solid' | 'outline';

interface FillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

/**
 * Button with left→right fill animation.
 * Filled portion uses inverted text/button colors.
 * Desktop: hover only | Mobile: press/click only
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

  const shell = isSolid
    ? 'bg-[#f3dfc6] text-[#6d1822] border-2 border-[#f3dfc6]'
    : 'bg-transparent text-[#f3dfc6] border-2 border-[#f3dfc6]';

  const fillBg = isSolid ? 'bg-[#6d1822]' : 'bg-[#f3dfc6]';
  const fillText = isSolid ? 'text-[#f3dfc6]' : 'text-[#6d1822]';

  return (
    <button
      type="button"
      {...rest}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => window.setTimeout(() => setPressed(false), 280)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      className={`
        relative inline-flex items-center justify-center overflow-hidden
        rounded-full px-8 py-4 font-bold text-lg
        select-none
        ${shell}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>

      <span
        aria-hidden
        className={`
          fill-layer absolute inset-0 z-20 origin-left overflow-hidden
          transition-transform duration-300 ease-out
          ${fillBg}
          ${pressed ? 'scale-x-100' : 'scale-x-0'}
        `}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center whitespace-nowrap px-8 font-bold text-lg ${fillText}`}
        >
          {children}
        </span>
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
    ? 'bg-[#f3dfc6] text-[#6d1822] border-2 border-[#f3dfc6]'
    : 'bg-transparent text-[#f3dfc6] border-2 border-[#f3dfc6]';

  const fillBg = isSolid ? 'bg-[#6d1822]' : 'bg-[#f3dfc6]';
  const fillText = isSolid ? 'text-[#f3dfc6]' : 'text-[#6d1822]';

  return (
    <a
      {...rest}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => window.setTimeout(() => setPressed(false), 280)}
      onPointerLeave={() => setPressed(false)}
      className={`
        relative inline-flex items-center justify-center overflow-hidden
        rounded-full px-8 py-4 font-bold text-lg
        select-none
        ${shell}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className={`
          fill-layer absolute inset-0 z-20 origin-left overflow-hidden
          transition-transform duration-300 ease-out
          ${fillBg}
          ${pressed ? 'scale-x-100' : 'scale-x-0'}
        `}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center whitespace-nowrap px-8 font-bold text-lg ${fillText}`}
        >
          {children}
        </span>
      </span>
    </a>
  );
};
