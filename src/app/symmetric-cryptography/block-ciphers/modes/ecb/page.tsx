"use client"

import AnimationInput from "@/Components/AnimationInput";
import {useState} from "react";
import {motion} from "framer-motion";

export default function ECBModePage() {
  const [input, setInput] = useState('00110011');
  const [animationStep, setAnimationStep] = useState(0);
  const stepsPerBlock = 4;

  return (
    <section className="w-full flex flex-col items-center">
     <AnimationInput
       value={input}
       onChange={e => setInput(e.target.value)}
       highlightStart={0}
       highlightEnd={8}
     />

      <br/>

      <div className="w-72 h-72 overflow-clip border border-transparent">
        <motion.div
          className="flex"
          animate={{x: Math.floor(animationStep / stepsPerBlock) * -288}}
          transition={{ease: "easeInOut"}}
        >
          {
            Array(Math.ceil(input.length / 8) || 1).fill(null).map((_, k) =>
              <ECBSection
                key={k}
                index={k}
                content={input.slice(k * 8, k * 8 + 8)}
                animationStep={animationStep}
                stepsPerBlock={stepsPerBlock}
              />
            )
          }
        </motion.div>
      </div>

      <div className="flex">
        <button onClick={() => setAnimationStep(animationStep - 1)}>-</button>
        {animationStep}
        <button onClick={() => setAnimationStep(animationStep + 1)}>+</button>
      </div>

    </section>
  )
}

interface ECBSectionProps {
  index: number
  content: string
  animationStep: number
  stepsPerBlock: number
}

function ECBSection(props: ECBSectionProps) {
  const {content, animationStep, stepsPerBlock, index} = props;
  const currentBlock = Math.floor(animationStep / stepsPerBlock) == index;
  return (
    <div className="flex w-72 h-72 shrink-0">
        <div className="flex flex-col justify-center">
          <div className="flex">
            <div className="w-12 h-6 border-2 border-black text-center">Key</div>
            →
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="flex border border-black">
              {Array(8).fill(null).map(
                (c, k) => <div key={k} className="w-6 h-6 border border-black"/>
              )}
            </div>
            <motion.div
              className="absolute top-0 left-0 flex border border-transparent"
              animate={{opacity: (currentBlock && animationStep % stepsPerBlock == 1) ? 1 : 0}}
            >
              {content.split('').map(
                (c, k) => <div key={k} className="w-6 h-6 text-center font-mono">{c}</div>
              )}
            </motion.div>
          </div>

          <div>↓</div>

          <div className="w-48 h-16 border-2 border-black font-mono text-center">
            <span className="align-middle">Block Cipher Encryption Function</span>
          </div>

          <div>↓</div>

          <div className="relative">
            <div className="flex border border-black">
              {Array(8).fill(null).map(
                (c, k) => <div key={k} className="w-6 h-6 border border-black"/>
              )}
            </div>
            <motion.div
              className="absolute top-0 left-0 flex border border-transparent"
              animate={{opacity: (currentBlock && animationStep % stepsPerBlock == 2) ? 1 : 0}}
            >
              {content.split('').map(
                (c, k) => <div key={k} className="w-6 h-6 text-center font-mono">{c}</div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
  )
}