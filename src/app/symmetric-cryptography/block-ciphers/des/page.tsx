"use client"

import AnimationStageDisplay from "@/Components/des-animations/AnimationStageDisplay";
import PermutationAnimation from "@/Components/des-animations/PermutationAnimation";
import ExpansionAnimation from "@/Components/des-animations/ExpansionAnimation";
import FlowControl from "@/Components/FlowControl";
import {useState} from "react";
import {motion} from "framer-motion";

export default function DESCipherPage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [input, setInput] = useState('1001101011111011110100100110100011001010100101001000101100111101');
  const [animationInput, setAnimationInput] = useState('')
  const [block, setBlock] = useState('');
  const [permutedBlock, setPermutedBlock] = useState('');

  const startAnimation = () => {
    setAnimationStep(0);
    setAnimationInput(input);
    setBlock(input);
  }

  const stepForward = () => {
    setAnimationStep(animationStep + 1)

    switch (animationStep) {
      case 0:
        // TODO: Change padding to actual padding algorithm
        setBlock(animationInput.padEnd(64, '0'))
        break;
      case 2:
        // calculate permuted block
        let pBlock = ''
        for (let i = 57; i <= 63; i += 2) {
          for (let j = 0; j < 8; j++) {
            pBlock += block.charAt(i - j * 8)
          }
        }
        for (let i = 56; i <= 62; i += 2) {
          for (let j = 0; j < 8; j++) {
            pBlock += block.charAt(i - j * 8)
          }
        }
        setPermutedBlock(pBlock);
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

        {/*Animation Section*/}
        <div className="flex flex-col items-center">
          <h1>Block</h1>
          {
            animationStep <= 2 ?
              <PermutationAnimation
                content={block}
                transformation={IPTransform}
                isAnimating={animationStep >= 2}
              />
              :
              <motion.div
                className="flex flex-col"
                animate={{gap: animationStep > 2 ? "48px" : "0px"}}
              >
                <ExpansionAnimation
                  content={permutedBlock.slice(0,32)}
                  isExpanded={false}
                  isAnimating={false}
                />
                <ExpansionAnimation
                  content={permutedBlock.slice(32,64)}
                  isExpanded={animationStep >= 4}
                  isAnimating={animationStep >= 5}
                />
              </motion.div>
          }
        </div>

        {/* Animation Stage indicator*/}
        {/* TODO: Restyle display to be below animation*/}
        <AnimationStageDisplay animationStep={animationStep} />

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