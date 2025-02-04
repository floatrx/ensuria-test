import { useEffect, type RefObject } from 'react';

/**
 * Hook that handles clicks outside the passed ref
 * @param ref
 * @param cb
 */
export const useClickOutside = (ref: RefObject<HTMLElement>, cb: (event: MouseEvent | TouchEvent) => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!ref.current || ref.current.contains(target)) {
        return;
      }
      cb(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, cb]);
};
