import {motion} from "framer-motion";
import {PropsWithChildren} from "react";

interface AnimationCarouselProps {
  currentIndex: number,
}

export default function AnimationCarousel(props: PropsWithChildren<AnimationCarouselProps>) {
  const {currentIndex, children} = props;

  return (
    <div className="w-full overflow-clip">
      <motion.div
        className="flex"
        animate={{x: currentIndex * -100 + "%"}}
        transition={{ease: "easeInOut"}}
      >
        {children}
      </motion.div>
    </div>
  )
}