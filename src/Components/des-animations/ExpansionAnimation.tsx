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
          className="absolute border border-r-0 border-black"
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

        {/* left grid left side bits*/}
        <div>
          <motion.div
            className="absolute border border-transparent bg-transparent font-mono"
            animate={{
              x: isAnimating ? "240px" : "0px",
              y: isAnimating ? "72px": "0px",
              display: isAnimating ? "block" : "none"
            }}
            transition={{ease: "easeInOut"}}
            initial={false}
          >
            <div className="w-6 h-6 border border-transparent bg-transparent">{leftBits.charAt(0)}</div>
          </motion.div>
          <motion.div
            className="absolute border border-transparent bg-transparent font-mono"
            animate={{
              x: isAnimating ? "240px" : "0px",
              y: isAnimating ? "0px": "24px",
              display: isAnimating ? "block" : "none"
            }}
            transition={{ease: "easeInOut"}}
            initial={false}
          >
            <div className="w-6 h-6 border border-transparent bg-transparent">{leftBits.charAt(4)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{leftBits.charAt(8)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{leftBits.charAt(12)}</div>
          </motion.div>
        </div>

        {/* right expanded background*/}
        <motion.div
          className="absolute left-[72px] border border-l-0 border-black"
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

        {/* left grid right side bits*/}
        <div>
         <motion.div
            className="absolute border border-transparent bg-transparent font-mono"
            animate={{
              x: isAnimating ? "120px" : "72px",
              y: isAnimating ? "0px": "0px",
              display: isAnimating ? "block" : "none"
            }}
            transition={{ease: "easeInOut"}}
            initial={false}
          >
            <div className="w-6 h-6 border border-transparent bg-transparent">{leftBits.charAt(3)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{leftBits.charAt(7)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{leftBits.charAt(11)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{leftBits.charAt(15)}</div>
          </motion.div>
        </div>

        {/* Grid */}
        <div className='relative'>
          <div className={`grid grid-cols-4 border border-black ${!isExpanded && "border-r-0"}`}>
            {Array(16).fill(null).map((b, k) => (
              <div key={k} className="w-6 h-6 border border-black font-mono" />
            ))}
          </div>
          <div className={`absolute top-0 left-0 grid grid-cols-4 border border-transparent ${!isExpanded && "border-r-0"}`}>
            {leftBits.split('').map((b, k) => (
              <div key={k} className="w-6 h-6 border border-transparent font-mono">
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Half */}
      <div className="relative text-center">
        {/* left expanded background*/}
        <motion.div
          className="absolute border border-r-0 border-black"
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

        {/* right grid left side bits*/}
        <div>
          <motion.div
            className="absolute border border-transparent bg-transparent font-mono"
            animate={{
              x: isAnimating ? "-48px" : "0px",
              y: isAnimating ? "0px": "0px",
              display: isAnimating ? "block" : "none"
            }}
            transition={{ease: "easeInOut"}}
            initial={false}
          >
            <div className="w-6 h-6 border border-transparent bg-transparent">{rightBits.charAt(0)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{rightBits.charAt(4)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{rightBits.charAt(8)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{rightBits.charAt(12)}</div>
          </motion.div>
        </div>

        {/* right expanded background*/}
        <motion.div
          className="absolute left-[72px] border border-l-0 border-black"
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

        {/* right grid right side bits*/}
        <div>
          <motion.div
            className="absolute border border-transparent bg-transparent font-mono"
            animate={{
              x: isAnimating ? "-168px" : "72px",
              y: isAnimating ? "24px": "0px",
              display: isAnimating ? "block" : "none"
            }}
            transition={{ease: "easeInOut"}}
            initial={false}
          >
            <div className="w-6 h-6 border border-transparent bg-transparent">{rightBits.charAt(3)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{rightBits.charAt(7)}</div>
            <div className="w-6 h-6 border border-transparent bg-transparent">{rightBits.charAt(11)}</div>
          </motion.div>
          <motion.div
            className="absolute border border-transparent bg-transparent font-mono"
            animate={{
              x: isAnimating ? "-168px" : "72px",
              y: isAnimating ? "0px": "72px",
              display: isAnimating ? "block" : "none"
            }}
            transition={{ease: "easeInOut"}}
            initial={false}
          >
            <div className="w-6 h-6 border border-transparent bg-transparent">{rightBits.charAt(15)}</div>
          </motion.div>
        </div>

        {/* Grid */}
        <div className='relative'>
          <div className={`grid grid-cols-4 border border-black ${!isExpanded && "border-l-0"}`}>
            {Array(16).fill(null).map((b, k) => (
              <div key={k} className="w-6 h-6 border border-black font-mono"/>
            ))}
          </div>
          <div className={`absolute top-0 left-0 grid grid-cols-4 border border-transparent ${!isExpanded && "border-l-0"}`}>
            {rightBits.split('').map((b, k) => (
              <div key={k} className="w-6 h-6 border border-transparent font-mono">
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}