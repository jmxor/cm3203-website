"use client"

import AnimationCarousel from "@/Components/AnimationCarousel";
import AnimationContainer from "@/Components/AnimationContainer";
import AnimationInput from "@/Components/AnimationInput";
import AnimationFlowControl from "@/Components/AnimationFlowControl";
import BitBox8x1 from "@/Components/BitBox8x1";
import {useState} from "react";
import {motion} from "framer-motion";

export default function ECBModePage() {
  const [plaintextInput, setPlaintextInput] = useState('');
  const [keyInput, setKeyInput] = useState('');

  const [animationStep, setAnimationStep] = useState(0);
  const [encryptionKey, setEncryptionKey] = useState('')
  const [plaintext, setPlaintext] = useState('')
  const [cipherText, setCipherText] = useState('');
  const stepsPerBlock = 3;
  
  function startAnimation() {
    setAnimationStep(0);
    setPlaintext(plaintextInput);
    setEncryptionKey(keyInput);

    let ciphertext = ''
    for (let i = 0; i < plaintextInput.length; i++) {
      ciphertext += (plaintextInput.charAt(i) != keyInput.charAt(i % 8)) ? '1' : '0'
    }
    setCipherText(ciphertext)
  }
  
  function stepForward() {
    if (animationStep == (Math.floor(plaintextInput.length / 8) * stepsPerBlock) -  1) return;
    setAnimationStep(animationStep + 1)
  }
  
  function stepBackward() {
    if (animationStep == 0) return;
    setAnimationStep(animationStep - 1)
  }

  return (
    <section className="w-full flex flex-col sm:block">
      <AnimationContainer>
        <AnimationInput
         value={plaintextInput}
         onChange={e => setPlaintextInput(e.target.value)}
         placeholder="Binary Plaintext (00101011...)"
         highlightStart={Math.floor(animationStep / stepsPerBlock) * 8}
         highlightEnd={Math.floor(animationStep / stepsPerBlock) * 8 + 8}
        />

        <input
          className="boxed font-mono"
          value={keyInput}
          onChange={e => setKeyInput(e.target.value)}
          placeholder="8-Bit Key"
          maxLength={8}
        />

        <AnimationFlowControl
          animationStep={animationStep}
          startAnimation={startAnimation}
          stepForward={stepForward}
          stepBackward={stepBackward}
        />

        <AnimationCarousel currentIndex={Math.floor(animationStep / stepsPerBlock)}>
          {Array(Math.ceil(plaintextInput.length / 8) || 1).fill(null).map((_, k) =>
            <ECBSection
              key={k}
              index={k}
              plaintextBlock={plaintext.slice(k * 8, k * 8 + 8)}
              ciphertextBlock={cipherText.slice(k * 8, k * 8 + 8)}
              encryptionKey={encryptionKey}
              animationStep={animationStep}
              stepsPerBlock={stepsPerBlock}
            />
          )}
        </AnimationCarousel>

        <textarea
          className="w-full boxed font-mono"
          value={cipherText.slice(0, Math.floor((animationStep + 1) / stepsPerBlock) * 8)}
          onChange={undefined}
          readOnly
        />
      </AnimationContainer>
    </section>
  )
}

interface ECBSectionProps {
  index: number
  plaintextBlock: string
  ciphertextBlock: string
  encryptionKey: string
  animationStep: number
  stepsPerBlock: number
}

function ECBSection(props: ECBSectionProps) {
  const {plaintextBlock, ciphertextBlock, encryptionKey, animationStep, stepsPerBlock, index} = props;
  const currentBlock = Math.floor(animationStep / stepsPerBlock) == index;

  return (
    <div className="relative w-full shrink-0 bg-[url('../../public/ecb-bg.svg')]">

      <div className="absolute top-[69px] left-[52px] w-16 h-6 border-2 border-black text-center align-middle">Key</div>

      <div className="flex flex-col items-center justify-center ml-[88px]">
        <BitBox8x1
          content={plaintextBlock}
          contentVisible={currentBlock && animationStep % stepsPerBlock == 0}
        />

        <div className="w-[194px] h-16 my-6 flex items-center border-2 border-black font-mono">
          <span className="text-center">Block Cipher Function</span>
        </div>

        <BitBox8x1
          content={ciphertextBlock}
          contentVisible={currentBlock && animationStep % stepsPerBlock == 1}
        />
      </div>
    </div>
  )
}