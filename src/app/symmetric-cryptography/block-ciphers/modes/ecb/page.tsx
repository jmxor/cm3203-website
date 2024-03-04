"use client"

import AnimationInput from "@/Components/AnimationInput";
import FlowControl from "@/Components/FlowControl";
import {useState} from "react";
import {motion} from "framer-motion";

export default function ECBModePage() {
  const [input, setInput] = useState('00110011');
  const [animationStep, setAnimationStep] = useState(0);
  const stepsPerBlock = 4;

  return (
    <section className="w-full flex flex-col items-center sm:w-1/3">
     <AnimationInput
       value={input}
       onChange={e => setInput(e.target.value)}
       highlightStart={Math.floor(animationStep / stepsPerBlock) * 8}
       highlightEnd={Math.floor(animationStep / stepsPerBlock) * 8 + 8}
     />

      <br/>

      <div className="w-full overflow-clip border border-transparent">
        <motion.div
          className="flex"
          animate={{x: Math.floor(animationStep / stepsPerBlock) * -100 + "%"}}
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

      <FlowControl
        animationStep={animationStep}
        stepForward={() => setAnimationStep(animationStep + 1)}
        stepBackward={() => setAnimationStep(animationStep - 1)} />

      <textarea
        className="w-full boxed"
        value={input.slice(0, Math.floor((animationStep + 1) / stepsPerBlock) * 8)}
        onChange={undefined}
        readOnly
      />

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
    <div className="flex w-full justify-center shrink-0">
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

          <div className="w-48 h-16 flex items-center border-2 border-black font-mono">
            <span className="text-center">Block Cipher Function</span>
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