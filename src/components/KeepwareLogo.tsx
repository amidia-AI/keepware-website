import React from 'react';

interface KeepwareLogoProps {
  className?: string;
  size?: number | string;
  color?: string;
  veinColor?: string;
}

export const KeepwareLogo: React.FC<KeepwareLogoProps> = ({
  className = 'w-8 h-8',
  size,
  color = 'currentColor',
  veinColor = '#FAF9F5',
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="keepware logo"
    >
      {/* Vertical Pillar */}
      <rect
        x="124"
        y="92"
        width="68"
        height="328"
        rx="34"
        fill={color}
      />

      {/* Top Leaf */}
      <path
        d="M192 284 C192 284 212 232 242 186 C272 140 326 102 402 88 C392 166 352 220 306 250 C260 280 208 288 192 284 Z"
        fill={color}
      />
      {/* Top Leaf White Central Vein */}
      <path
        d="M228 238 C266 194 316 148 382 104"
        stroke={veinColor}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom Leaf */}
      <path
        d="M192 284 C192 284 220 282 268 304 C316 326 358 370 390 422 C308 422 254 384 226 346 C198 308 192 284 192 284 Z"
        fill={color}
      />
      {/* Bottom Leaf White Central Vein */}
      <path
        d="M228 316 C272 350 324 384 372 410"
        stroke={veinColor}
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
