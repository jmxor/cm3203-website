"use client"

import AnimationCarousel from "@/Components/AnimationCarousel";
import AnimationContainer from "@/Components/AnimationContainer";
import AnimationFlowControl from "@/Components/AnimationFlowControl";
import AnimationInputGroup from "@/Components/AnimationInputGroup";
import AnimationTextarea from "@/Components/AnimationTextarea";
import PermutationAnimation from "@/Components/des-animations/PermutationAnimation";
import DESPermutedChoice1 from "@/functions/DESPermutedChoice1";
import DESPermutedChoice2 from "@/functions/DESPermutedChoice2";
import stringRotateLeft from "@/functions/stringRotateLeft";
import {motion} from "framer-motion";
import {useState} from "react";

export default function DESKeySchedulePage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [keyInput, setKeyInput] = useState('');
  const [key, setKey] = useState('')
  const [subKeyStates, setSubKeyStates] = useState<Array<string>>([]);
  const [subKeys, setSubKeys] = useState<Array<string>>([])

    function startAnimation() {
    setAnimationStep(0);
    setKey(keyInput);

    let rotationCounts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1]
    let tempSubKeyStates = [];
    let tempSubKeys = [];

    let tempPermutedKey = DESPermutedChoice1(keyInput);
    tempSubKeyStates.push(tempPermutedKey)
    let tempLeftKey = tempPermutedKey.slice(0, 28);
    let tempRightKey = tempPermutedKey.slice(28, 57);

    for (let i = 0; i < 16; i++) {
      let count = rotationCounts[i]
      tempLeftKey = stringRotateLeft(tempLeftKey, count)
      tempRightKey = stringRotateLeft(tempRightKey, count)
      tempSubKeyStates.push(tempLeftKey + tempRightKey)
      let tempSubkey = DESPermutedChoice2(tempLeftKey + tempRightKey)
      tempSubKeys.push(tempSubkey)
    }
    setSubKeyStates(tempSubKeyStates)
    setSubKeys(tempSubKeys)
  }

  function stepForward() {
    if (animationStep == 20) return
    setAnimationStep(animationStep + 1)
  }

  function stepBackward() {
    if (animationStep == 0) return;
    setAnimationStep(animationStep - 1)
  }

  const PC1Matrix = [
    8,  17, 26, 62, 58, 49, 40, 7,
    6,  16, 25, 61, 57, 48, 38, 15,
    5,  14, 24, 60, 56, 46, 37, 23,
    4,  13, 22, 59, 54, 45, 36, 31,
    3,  12, 21, 30, 53, 44, 35, 39,
    2,  11, 20, 29, 52, 43, 34, 47,
    1,  10, 19, 28, 51, 42, 33, 55,
    0,  9,  18, 27, 50, 41, 32, 63,
  ]

  return (
    <section className="w-full flex flex-col sm:block">
      <AnimationContainer>
        <AnimationInputGroup>
          <AnimationTextarea
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            label="Key (64-bit)"
            placeholder="00101010..."
            highlightStart={0}
            highlightEnd={0}
            maxLength={64}
          />

          <AnimationFlowControl
            animationStep={animationStep}
            startAnimation={startAnimation}
            stepForward={stepForward}
            stepBackward={stepBackward}
          />
        </AnimationInputGroup>

        {/* Animation Section */}
        <AnimationCarousel
          currentIndex={Math.max(animationStep - 4, 0)}
        >
          {animationStep < 3 ?
            <div className="relative ml-12">
              <PermutationAnimation
                index={0}
                content={key}
                transformation={PC1Matrix}
                isAnimating={animationStep > 1}
                bitsVisible={true}
                size={64}
              />
              <motion.div
                className="absolute w-6 h-[194px] top-0 left-[170px]"
                animate={{
                  backgroundColor: animationStep < 1 ? 'transparent' : 'white'
                }}
              />
            </div>
          :
            subKeyStates.map((subKeyState, i) =>
              <div key={i} className='relative w-full shrink-0'>
                <motion.div
                  className={`absolute w-full h-full top-0 left-0 ${i == 0 ? 'bg-[url(../../public/des-key-structure-bg-0.svg)]' : 'bg-[url(../../public/des-key-structure-bg-1.svg)]'}`}
                  animate={{opacity: animationStep < 4 ? 0 : 1}}
                  initial={false}
                />

                <motion.div
                  className='absolute top-[35px] left-[306px] flex flex-col w-[50px] h-[26px] border-2 border-black rounded text-center content-around'
                  animate={{opacity: animationStep < 4 ? 0 : 1}}
                  initial={false}
                >
                  <span>{'<<<'}</span>
                </motion.div>

                <motion.div
                  className='absolute top-[183px] left-[306px] flex flex-col w-[50px] h-[26px] border-2 border-black rounded text-center content-around'
                  animate={{opacity: animationStep < 4 ? 0 : 1}}
                  initial={false}
                >
                  <span>{'<<<'}</span>
                </motion.div>

                <motion.div animate={{opacity: i == 0 ? 0 : 1}} initial={false} className='absolute top-[109px] left-[236px] flex text-center'>
                  <span
                    className='w-[50px] h-[26px] border-2 border-black rounded'
                  >{'PC-2'}
                  </span>

                  <span
                    className='w-[74px] h-[26px] ml-6 border-2 border-black rounded'
                  >Subkey<sub>{i}</sub>
                  </span>
                </motion.div>

                <div className="ml-12 grow-0">
                  <motion.div className="relative flex w-full">
                    <motion.div
                      className="flex flex-col mr-6"
                      animate={{gap: animationStep < 3 ? "0px" : "48px"}}
                    >
                      <div className="grid grid-cols-7 bg-white border border-black text-center font-mono">
                        {subKeyStates[i].slice(0,28).split('').map((b, k) =>
                          <div key={k} className="w-6 h-6 border border-black" >{b}</div>
                        )}
                      </div>
                      <div className="grid grid-cols-7 bg-white border border-black text-center font-mono">
                        {subKeyStates[i].slice(28, 56).split('').map((b, k) =>
                          <div key={k} className="w-6 h-6 border border-black">{b}</div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            )

          }
        </AnimationCarousel>

        {/* Output*/}
        <textarea
          className="w-full boxed font-mono"
          value={subKeys.slice(0, Math.max(animationStep - 4, 0)).join('\n')}
          onChange={undefined}
          readOnly
        />
      </AnimationContainer>
    </section>
  )
}