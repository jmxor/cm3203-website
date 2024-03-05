import {motion} from "framer-motion";

interface ExpansionAnimationProps {
  content: string
  isExpanded: boolean
  isAnimating: boolean
}

export default function ExpansionAnimation(props: ExpansionAnimationProps) {
  const {content, isExpanded, isAnimating} = props;
  let leftBits = ''
  let rightBits = ''

  // distribute bits
  for (let i = 0; i < content.length; i++) {
    if (Math.floor(i/4) % 2 == 0) {
      leftBits += content.charAt(i)
    } else {
      rightBits += content.charAt(i)
    }
  }

  return (
    <motion.div
      className="flex justify-center"
      animate={{gap: isExpanded ? "45px" : 0}}
      initial={false}
    >
      {/*Left half*/}
      <div className="relative text-center">
        {/* left expanded background*/}
        <motion.div
          className="absolute top-0 left-0 flex flex-col border border-r-0 border-black"
          animate={{
            display: isExpanded ? "" : "none",
            x: isExpanded ? "-24px" : 0,
          }}
          initial={false}
        >
          {Array(4).fill(null).map((_, k) =>
            <div key={k} className="w-6 h-6 border border-black"/>
          )}
        </motion.div>

        {/* right expanded background*/}
        <motion.div
          className="absolute top-0 left-[72px] flex flex-col border border-l-0 border-black"
          animate={{
            display: isExpanded ? "" : "none",
            x: isExpanded ? "24px" : 0,
          }}
          initial={false}
        >
          {Array(4).fill(null).map((_, k) =>
            <div key={k} className="w-6 h-6 border border-black"/>
          )}
        </motion.div>

        {/* Grid */}
        <div className={`grid grid-cols-4 border border-black ${!isExpanded && "border-r-0"}`}>
          {leftBits.split('').map((b, k) => (
            <div key={k} className="w-6 h-6 border border-black font-mono">
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* Right Half */}
      <div className="relative text-center">
        {/* left expanded background*/}
        <motion.div
          className="absolute top-0 left-0 flex flex-col border border-r-0 border-black"
          animate={{
            display: isExpanded ? "" : "none",
            x: isExpanded ? "-24px" : 0,
          }}
          initial={false}
        >
          {Array(4).fill(null).map((_, k) =>
            <div key={k} className="w-6 h-6 border border-black"/>
          )}
        </motion.div>

        {/* right expanded background*/}
        <motion.div
          className="absolute top-0 left-[72px] flex flex-col border border-l-0 border-black"
          animate={{
            display: isExpanded ? "" : "none",
            x: isExpanded ? "24px" : 0,
          }}
          initial={false}
        >
          {Array(4).fill(null).map((_, k) =>
            <div key={k} className="w-6 h-6 border border-black"/>
          )}
        </motion.div>

        {/* Grid */}
        <div className={`grid grid-cols-4 border border-black ${!isExpanded && "border-l-0"}`}>
          {rightBits.split('').map((b, k) => (
            <div key={k} className="w-6 h-6 border border-black font-mono">
              {b}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}