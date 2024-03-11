import {motion} from "framer-motion";

interface BitBoxProps {
  content: string,
  contentVisible: boolean
}

export default function BitBox8x1(props: BitBoxProps) {
  const {content, contentVisible} = props;
  return (
    <div className="relative">
      <div className="flex border border-black">
        {Array(8).fill(null).map(
          (c, k) => <div key={k} className="w-6 h-6 border border-black"/>
        )}
      </div>
      <motion.div
        className="absolute top-0 left-0 flex border border-transparent"
        animate={{opacity: contentVisible ? 1 : 0}}
      >
        {content.split('').map(
          (c, k) => <div key={k} className="w-6 h-6 text-center font-mono">{c}</div>
        )}
      </motion.div>
    </div>
  )
}