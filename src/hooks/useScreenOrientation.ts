import { useEffect, useState } from "react";

const getScrenOrientation = () => window.screen.orientation.type;

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationType>(getScrenOrientation());

  const updateOrientation = () => setOrientation(getScrenOrientation());

  useEffect(() => {
    window.addEventListener('orientationchange', updateOrientation);

    return () => window.removeEventListener('orientationchange', updateOrientation);
  }, []);

  return orientation;
}