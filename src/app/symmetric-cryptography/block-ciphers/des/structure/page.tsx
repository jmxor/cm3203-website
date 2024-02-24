"use client"

import {useState} from "react";
import {motion, useCycle} from "framer-motion";

export default function DESCipherPage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [block, setBlock] = useState('1001101011111011110100100110100011001010100101001000101100111101');
  const [isAnimated, cycleAnimated] = useCycle(false, true)

  // NOTE: For reasons currently unknown the transformation matrices required for the animation are the inverse
  // of the matrix of positions, i.e. applying the IPMatrix will mean the 57th bit is in the top left, as shown by
  // the InvIPMatrix
  const IPMatrix = [
    39, 7, 47, 15, 55, 23, 63, 31,
    38, 6, 46, 14, 54, 22, 62, 30,
    37, 5, 45, 13, 53, 21, 61, 29,
    36, 4, 44, 12, 52, 20, 60, 28,
    35, 3, 43, 11, 51, 19, 59, 27,
    34, 2, 42, 10, 50, 18, 58, 26,
    33, 1, 41, 9,  49, 17, 57, 25,
    32, 0, 40, 8,  48, 16, 56, 24,
  ];

  const InvIPMatrix = [
    57, 49, 41, 33, 25, 17, 9,  1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7,
    56, 48, 40, 32, 24, 16, 8,  0,
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
  ];

  // TODO: Add padding of input block

  return (
    <>
      <section className="w-full flex flex-col items-center text-center sm:w-1/2">
        <h1>Block</h1>
        <div className="relative">
          {/* Grid */}
          <div className="grid grid-cols-8 border border-black">
            {block.split('').map((b, k) => (
              <div key={k} className="w-6 h-6 border border-black"/>
            ))}
          </div>

          {/* Bits */}
          <div className="absolute top-0 left-0 grid grid-cols-8 border border-transparent font-mono">
            {block.split('').map((b, k) => (
              <motion.div
                key={k}
                className="absolute w-6 h-6"
                animate={{
                  x: ((isAnimated ? IPMatrix[k] : k) % 8) * 24,
                  y: Math.floor((isAnimated ? IPMatrix[k] : k) / 8) * 24,
                }}
                transition={{ease: "easeInOut"}}
                initial={false}
              >
                {k}
              </motion.div>
            ))}
          </div>
        </div>
        <button onClick={() => cycleAnimated()}>Cycle</button>
      </section>
    </>
  )
}