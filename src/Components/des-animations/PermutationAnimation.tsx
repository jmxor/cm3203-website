import {motion} from "framer-motion";

interface BitGridProps {
  index: number
  content: string,
  transformation: number[],
  isAnimating: boolean
}

export default function PermutationAnimation(props: BitGridProps) {
  const {index, content, transformation, isAnimating} = props;

  return (
    <motion.div key={index} className="relative text-center">
      {/* Grid */}
      <div className="grid grid-cols-8 border border-black">
        {Array(64).fill(null).map((_, k) => (
          <div key={k} className="w-6 h-6 border border-black"/>
        ))}
      </div>

      {/* Bits */}
      <div className="absolute top-0 left-0 grid grid-cols-8 border border-transparent font-mono">
        {content.split('').map((b, k) => (
          <motion.div
            key={k}
            className="absolute w-6 h-6"
            animate={{
              x: ((isAnimating ? transformation[k] : k) % 8) * 24,
              y: Math.floor((isAnimating ? transformation[k] : k) / 8) * 24,
            }}
            transition={{ease: "easeInOut"}}
            initial={false}
          >
            {b}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}