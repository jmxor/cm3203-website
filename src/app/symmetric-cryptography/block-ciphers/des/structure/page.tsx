"use client"

import FlowControl from "@/Components/FlowControl";
import {useState} from "react";
import {motion, useCycle} from "framer-motion";

export default function DESCipherPage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [input, setInput] = useState('1001101011111011110100100110100011001010100101001000101100111101');
  const [animationInput, setAnimationInput] = useState('')
  const [block, setBlock] = useState('');
  const [isAnimated, cycleAnimated] = useCycle(false, true)

  const startAnimation = () => {
    setAnimationStep(0);
    setAnimationInput(input);
    setBlock(input);
  }

  const stepForward = () => {
    setAnimationStep(animationStep + 1)

    switch (animationStep) {
      case 1:
        // TODO: Change padding to actual padding algorithm
        setBlock(animationInput.padEnd(64, '0'))
        break;
    }
  }

  const stepBackward = () => {
    if (animationStep == 0) return;

    setAnimationStep(animationStep - 1)

    switch (animationStep) {

    }
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

  // TODO: fix spacing between bits and step animations

  return (
    <>
      <section className="w-full flex flex-col sm:w-1/3">
        <textarea
          className="border border-black resize-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          maxLength={64}
        />

        <button
          className="border my-2 border-black"
          onClick={startAnimation}
        >
          Start Encryption
        </button>

        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <h1>Block</h1>
            <div className="relative text-center">
              {/* Grid */}
              <div className="grid grid-cols-8 border border-black">
                {Array(64).fill(null).map((_, k) => (
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
                      x: ((animationStep > 3 ? IPTransform[k] : k) % 8) * 24,
                      y: Math.floor((animationStep > 3 ? IPTransform[k] : k) / 8) * 24,
                    }}
                    transition={{ease: "easeInOut"}}
                    initial={false}
                  >
                    {b}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <ol className="flex flex-col mt-6 border border-black text-center">
            <motion.li
              className="h-6 border border-black"
              animate={{backgroundColor: (animationStep >= 1 && animationStep < 3) ? 'yellow' : ''}}
            >Padding</motion.li>
            <motion.li
              className="h-6 border border-black"
              animate={{backgroundColor: (animationStep >= 3 && animationStep < 5) ? 'yellow' : ''}}
            >Initial Permutation</motion.li>
            <motion.li className="h-6 border border-black">Split Block</motion.li>
            <motion.li className="h-6 border border-black">Expansion</motion.li>
            <motion.li className="h-6 border border-black">Key Mixing</motion.li>
            <motion.li className="h-6 border border-black">Substitution</motion.li>
            <motion.li className="h-6 border border-black">Permutation</motion.li>

            <li className="h-6 border border-black">Final Permutation</li>
          </ol>
        </div>

        <div className="flex justify-center">
          <FlowControl
            animationStep={animationStep}
            stepForward={stepForward}
            stepBackward={stepBackward}
          />
        </div>
      </section>
    </>
  )
}