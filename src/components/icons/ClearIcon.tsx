import React, { SVGProps } from 'react';

export const ClearIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
