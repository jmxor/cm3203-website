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
    const {innerWidth: width, innerHeight: height} = window;
    return {
      width, height
    }
  }

  const [windowDimensions, setWindowDimensions] = useState({width:0, height:0});

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []);

  return windowDimensions
}