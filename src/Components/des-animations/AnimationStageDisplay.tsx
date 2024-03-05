import {motion} from "framer-motion";

interface AnimationStageDisplayProps {
  animationStep: number
}

export default function AnimationStageDisplay(props: AnimationStageDisplayProps) {
  //TODO: possibly add moving coloured indicator instead of changing bg colour
  const {animationStep} = props

  return (
    <ol className="flex flex-col mt-6 border border-black text-center">
      <motion.li
        className="h-6 border border-black"
        animate={{backgroundColor: (animationStep == 1) ? 'yellow' : ''}}
      >Padding</motion.li>
      <motion.li
        className="h-6 border border-black"
        animate={{backgroundColor: (animationStep == 2) ? 'yellow' : ''}}
      >Initial Permutation</motion.li>
      <motion.li
        className="h-6 border border-black"
        animate={{backgroundColor: (animationStep >= 3 && animationStep < 6) ? 'yellow' : ''}}
      >Expansion</motion.li>
      <motion.li className="h-6 border border-black">Key Mixing</motion.li>
      <motion.li className="h-6 border border-black">Substitution</motion.li>
      <motion.li className="h-6 border border-black">Permutation</motion.li>

      <li className="h-6 border border-black">Final Permutation</li>
    </ol>
  )
}