import {useEffect, useState} from "react";

/* Returns the dimensions of the current window
 * This code was adapted from Stack Overflow post answer by giovannipds 4-12-2019
 * accessed 15-05-2024
 * https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
 * Modified the handleResize function declaration to be an arrow function to conform to typescript strict mode
 */
export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width, height
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasWindow]);

  return windowDimensions
}