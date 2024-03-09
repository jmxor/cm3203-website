"use client"

import PermutationAnimation from "@/Components/des-animations/PermutationAnimation";
import FlowControl from "@/Components/FlowControl";
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export default function DESCipherPage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [input, setInput] = useState('1001101011111011110100100110100011001010100101001000101100111101');
  const [block, setBlock] = useState('');
  const [paddedBlock, setPaddedBlock] = useState('');
  const [permutedBlock, setPermutedBlock] = useState('');

  // calculate all blocks to be used in the animation
  const startAnimation = () => {
    setAnimationStep(0);
    setAnimationInProgress(true);
    setBlock(input)

    let padBlock = input.padEnd(64, '0')
    setPaddedBlock(padBlock)

    // calculate permuted block
    let permutedBlock = ''
    for (let i = 57; i <= 63; i += 2) {
      for (let j = 0; j < 8; j++) {
        permutedBlock += padBlock.charAt(i - j * 8)
      }
    }
    for (let i = 56; i <= 62; i += 2) {
      for (let j = 0; j < 8; j++) {
        permutedBlock += padBlock.charAt(i - j * 8)
      }
    }
    setPermutedBlock(permutedBlock);
  }

  const stepForward = () => {
    // TODO: prevent animation from stepping too far
    setAnimationStep(animationStep + 1)
  }

  const stepBackward = () => {
    if (animationStep == 0) return;
    setAnimationStep(animationStep - 1)
  }

  const IPTransform = [
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9,  49, 17, 57, 25,
    32, 0, 40, 8,  48, 16, 56, 24,
  ];

  const FPTransform = [
    57, 49, 41, 33, 25, 17, 9,  1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7,
    56, 48, 40, 32, 24, 16, 8,  0,
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
  ];

  return (
    <section className="w-full flex flex-col sm:block">
      <figure className="w-full mx-auto max-w-96 flex flex-col gap-2 sm:mx-0 sm:float-left">
        <textarea
          className="boxed resize-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          maxLength={64}
        />

        <FlowControl
          animationStep={animationStep}
          animationInProgress={animationInProgress}
          startAnimation={startAnimation}
          stepForward={stepForward}
          stepBackward={stepBackward}
        />

        <div className="relative flex flex-col">
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-[url('../../public/des-structure-bg-0.svg')]"
            animate={{opacity: animationStep < 4 ? 0 : 1}}
            initial={false}
          />
          <div className="ml-6 mr-auto">
            {/*<AnimatePresence>*/}
            {/* TODO: fix reverse animation jumping using AnimatePresence*/}
              {animationStep <= 2 ?
                <PermutationAnimation
                  key={0}
                  content={animationStep >= 1 ? paddedBlock : block}
                  transformation={IPTransform}
                  isAnimating={animationStep >= 2}
                />
                :
                <motion.div key={1} className="flex">
                  <motion.div
                    className="flex flex-col"
                    animate={{gap: animationStep > 2 ? "96px" : "0px"}}
                    exit={{gap: "0px"}}
                  >
                    <div className="grid grid-cols-8 bg-white border border-black text-center font-mono">
                      {permutedBlock.slice(0,32).split('').map((b, k) =>
                        <div key={k} className="w-6 h-6 border border-black" >{b}</div>
                      )}
                    </div>
                    <div className="grid grid-cols-8 bg-white border border-black text-center font-mono">
                      {permutedBlock.slice(32, 64).split('').map((b, k) =>
                        <div key={k} className="w-6 h-6 border border-black">{b}</div>
                      )}
                    </div>
                  </motion.div>
                  <div className="flex flex-col justify-center">
                    <motion.div
                      className="w-24 border-2 border-black text-center font-mono"
                      animate={{opacity: animationStep < 4 ? 0 : 1}}
                      initial={false}
                    >
                      Feistel Function
                    </motion.div>
                  </div>
                </motion.div>
              }
            {/*</AnimatePresence>*/}
          </div>
        </div>
      </figure>

      <p>
        Supporting Text
      </p>
    </section>
  )
}