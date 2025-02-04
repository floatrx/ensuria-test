import React, { SVGProps } from 'react';
import { cn } from '@/lib/utils/cn.ts';

export const DropdownIcon: React.FC<SVGProps<SVGSVGElement> & { isOpen: boolean }> = ({ isOpen, ...props }) => (
  <svg
    {...props}
    className={cn(`pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 transform transition-transform`, isOpen && 'rotate-180')}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 7L10 12L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
