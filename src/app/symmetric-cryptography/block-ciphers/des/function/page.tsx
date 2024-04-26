"use client"

import AnimationContainer from "@/Components/AnimationContainer";
import AnimationInputGroup from "@/Components/AnimationInputGroup";
import AnimationTextarea from "@/Components/AnimationTextarea";
import ExpansionAnimation from "@/Components/des-animations/ExpansionAnimation";
import AnimationFlowControl from "@/Components/AnimationFlowControl";
import PermutationAnimation from "@/Components/des-animations/PermutationAnimation";
import DESExpansion from "@/functions/DESExpansion";
import DESPermutation from "@/functions/DESPermutation";
import DESSubstitution from "@/functions/DESSubstitution";
import stringXOR from "@/functions/stringXOR";
import {useState} from "react";
import {motion} from "framer-motion";

const PTransform = [
  8,  16, 22, 30, 12, 27, 1,  17,
  23, 15, 29, 5,  25, 19, 9,  0,
  7,  13, 24, 2,  3,  28, 10, 18,
  31, 11, 21, 6,  4,  26, 14, 20
]

export default function DESFunctionPage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [input, setInput] = useState('');
  const [keyInput, setKeyInput] = useState('001101010011010100110101001101010011010100110101');
  const [halfBlock, setHalfBlock] = useState('');
  const [expandedHalfBlock, setExpandedHalfBlock] = useState('');
  const [mixedHalfBlock, setMixedHalfBlock] = useState('');
  const [subbedHalfBlock, setSubbedHalfBlock] = useState('');
  const [permutedHalfBlock, setPermutedHalfBlock] = useState('');

  function startAnimation() {
    setAnimationStep(0);
    setHalfBlock(input)

    let tempExpandedHalfBlock = DESExpansion(input)
    setExpandedHalfBlock(tempExpandedHalfBlock)

    let tempMixedHalfBlock = stringXOR(tempExpandedHalfBlock, keyInput)
    setMixedHalfBlock(tempMixedHalfBlock)

    let tempSubbedHalfBlock = DESSubstitution(tempMixedHalfBlock)
    setSubbedHalfBlock(tempSubbedHalfBlock)

    let tempPermutedHalfBlock = DESPermutation(tempSubbedHalfBlock)
    setPermutedHalfBlock(tempPermutedHalfBlock)
  }

  function stepForward() {
    setAnimationStep(animationStep + 1)
  }

  function stepBackward() {
    if (animationStep == 0) return;
    setAnimationStep(animationStep - 1)
  }

  return (
    <section className="w-full flex flex-col sm:block">
      <AnimationContainer>
        <AnimationInputGroup>
          <AnimationTextarea
            value={input}
            onChange={e => setInput(e.target.value)}
            label="Plaintext 1/2-Block"
            placeholder="00101010..."
            highlightStart={0}
            highlightEnd={0}
            maxLength={32}
          />

          <AnimationFlowControl
            animationStep={animationStep}
            startAnimation={startAnimation}
            stepForward={stepForward}
            stepBackward={stepBackward}
          />
        </AnimationInputGroup>

        {/* Animation Section */}
        <div className="relative h-[462px]">
          <motion.div
            className='absolute top-0 left-0 w-full h-full bg-[url(../../public/des-function-bg-0.svg)]'
            animate={{
              opacity: animationStep < 3 ? 0 : 1
            }}
            initial={false}
          />

          <ExpansionAnimation
            content={halfBlock}
            isExpanded={animationStep >= 1}
            isAnimating={animationStep >= 2}
          />

          <motion.div
            className={'flex flex-col content-center'}
            animate={{
              opacity: animationStep < 3 ? 0 : 1
            }}
            initial={false}
          >
            <div className='absolute top-[121px] left-[227px] w-16 h-[26px] border-2 border-black text-center'>
              Subkey
            </div>

            {/*Mixed half block*/}
            <div className='relative mt-[72px] w-[290px] mx-auto'>
              <div className='grid grid-cols-[repeat(12,1fr)] border border-black'>
                {Array(48).fill(null).map((_, i) =>
                  <div key={i} className='h-6 w-6 border border-black'/>
                )}
              </div>
              <motion.div
                className='absolute top-0 left-0 grid grid-cols-[repeat(12,1fr)] border border-transparent'
                animate={{opacity: animationStep < 4 ? 0 : 1}}
              >
                {mixedHalfBlock.split('').map((b, i) =>
                  <div key={i} className='h-6 w-6 border border-transparent text-center font-mono'>
                    {b}
                  </div>
                )}
              </motion.div>
            </div>

            {/* substitution box */}
            <div className="w-36 h-[50px] my-6 mx-auto flex items-center justify-center border-2 border-black rounded font-mono">
              Substitution
            </div>

            {/* Substitution output and permutation */}
            <div className='mx-auto'>
              <PermutationAnimation
                index={0}
                content={subbedHalfBlock}
                transformation={PTransform}
                isAnimating={animationStep >= 6}
                bitsVisible={animationStep >= 5}
                size={32}
              />
            </div>

          </motion.div>
        </div>

        <textarea
          className="w-full boxed font-mono"
          value={animationStep > 6 ? permutedHalfBlock : '' }
          onChange={undefined}
          readOnly
        />
      </AnimationContainer>
    </section>
  )
}