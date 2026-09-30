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

  const shell = isSolid
    ? 'bg-[#f3dfc6] border-2 border-[#f3dfc6]'
    : 'bg-transparent border-2 border-[#f3dfc6]';

  const textDefault = isSolid ? 'text-[#6d1822]' : 'text-[#f3dfc6]';
  const fillBg = isSolid ? 'bg-[#6d1822]' : 'bg-[#f3dfc6]';

  return (
    <button
      type="button"
      data-variant={variant}
      data-pressed={pressed ? 'true' : 'false'}
      {...rest}
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => window.setTimeout(() => setPressed(false), 220)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      className={`
        fill-btn relative inline-flex items-center justify-center overflow-hidden
        rounded-full px-8 py-4 font-bold text-lg select-none
        ${shell}
        ${className}
      `}
    >
      <span
        aria-hidden
        className={`fill-layer absolute inset-0 z-0 ${fillBg}`}
      />
      <span className={`fill-btn-label relative z-10 ${textDefault}`}>
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
  const fillBg = isSolid ? 'bg-[#6d1822]' : 'bg-[#f3dfc6]';

  return (
    <a
      data-variant={variant}
      data-pressed={pressed ? 'true' : 'false'}
      {...rest}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => window.setTimeout(() => setPressed(false), 220)}
      onPointerLeave={() => setPressed(false)}
      className={`
        fill-btn relative inline-flex items-center justify-center overflow-hidden
        rounded-full px-8 py-4 font-bold text-lg select-none
        ${shell}
        ${className}
      `}
    >
      <span
        aria-hidden
        className={`fill-layer absolute inset-0 z-0 ${fillBg}`}
      />
      <span className={`fill-btn-label relative z-10 ${textDefault}`}>
        {children}
      </span>
    </a>
  );
};
