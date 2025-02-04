import { useCallback } from 'react';

interface UseNavigationKeysProps {
  onUp?: () => void;
  onDown?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
}

export const useNavigationKeys = ({ onUp, onDown, onEnter, onEscape }: UseNavigationKeysProps) => {
  return useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key.match(/arrow|enter/gi)) {
        event.preventDefault();
      }
      switch (event.key) {
        case 'ArrowUp':
          onUp?.();
          break;
        case 'ArrowDown':
          onDown?.();
          break;
        case 'Enter':
          onEnter?.();
          break;
        case 'Escape':
          onEscape?.();
          break;
        default:
          break;
      }
    },
    [onUp, onDown, onEnter]
  );
};
