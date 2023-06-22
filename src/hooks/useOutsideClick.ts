import { useCallback, useEffect, useRef } from 'react';

export const useOutsideClick = (handler: () => void) => {
  const ref = useRef<HTMLElement>(null);
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handler();
    }
  }, []);
  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        handler();
      }
    },
    [ref.current]
  );
  useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, []);
  return ref;
};

export default useOutsideClick;
