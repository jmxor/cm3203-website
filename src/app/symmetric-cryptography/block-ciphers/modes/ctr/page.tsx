"use client"

import AnimationCarousel from "@/Components/AnimationCarousel";
import AnimationContainer from "@/Components/AnimationContainer";
import AnimationInput from "@/Components/AnimationInput";
import AnimationInputGroup from "@/Components/AnimationInputGroup";
import AnimationTextarea from "@/Components/AnimationTextarea";
import AnimationFlowControl from "@/Components/AnimationFlowControl";
import BitBox8x1 from "@/Components/BitBox8x1";
import stringXOR from "@/functions/stringXOR";
import {useState} from "react";

export default function CTRModePage() {
  const [plaintextInput, setPlaintextInput] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [IVInput, setIVInput] = useState('');

  const [animationStep, setAnimationStep] = useState(0);
  const [encryptionKey, setEncryptionKey] = useState('')
  const [initialisationVector, setInitialisationVector] = useState('');
  const [plaintext, setPlaintext] = useState('')
  const [cipherText, setCipherText] = useState('');
  const stepsPerBlock = 3;

  function startAnimation() {
    setAnimationStep(0);
    setPlaintext(plaintextInput);
    setEncryptionKey(keyInput);
    setInitialisationVector(IVInput);

    let ciphertext = ''
    for (let i = 0; i < plaintextInput.length; i++) {
      let temp = initialisationVector + Math.floor(i / 8).toString(2).padStart(4, '0')
      ciphertext += stringXOR(stringXOR(temp.charAt(i % 8), keyInput.charAt(i % 8)), plaintextInput.charAt(i))
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
        <AnimationInputGroup>
          <AnimationTextarea
           value={plaintextInput}
           onChange={e => setPlaintextInput(e.target.value)}
           label="Plaintext"
           placeholder="00101011..."
           highlightStart={Math.floor(animationStep / stepsPerBlock) * 8}
           highlightEnd={Math.floor(animationStep / stepsPerBlock) * 8 + 8}
          />

          <AnimationInput
            label="Key (8-bit)"
            placeholder="01001010"
            value={keyInput}
            onChange={e => setKeyInput(e.target.value)}
            maxLength={8}
          />

          <AnimationInput
            label="IV (4-bit)"
            placeholder="0101"
            value={IVInput}
            onChange={e => setIVInput(e.target.value)}
            maxLength={4}
          />

          <AnimationFlowControl
            animationStep={animationStep}
            startAnimation={startAnimation}
            stepForward={stepForward}
            stepBackward={stepBackward}
          />
        </AnimationInputGroup>

        <AnimationCarousel currentIndex={Math.floor(animationStep / stepsPerBlock)}>
          {Array(Math.ceil(plaintextInput.length / 8) || 1).fill(null).map((_, k) =>
            <CTRSection
              key={k}
              index={k}
              plaintextBlock={plaintext.slice(k * 8, k * 8 + 8)}
              ciphertextBlock={cipherText.slice(k * 8, k * 8 + 8)}
              encryptionKey={encryptionKey}
              initialisationVector={initialisationVector}
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

interface CTRSectionProps {
  index: number
  plaintextBlock: string
  ciphertextBlock: string
  encryptionKey: string
  initialisationVector:string;
  animationStep: number
  stepsPerBlock: number
}

function CTRSection(props: CTRSectionProps) {
  const {plaintextBlock, ciphertextBlock, encryptionKey, initialisationVector, animationStep, stepsPerBlock, index} = props;
  const currentBlock = Math.floor(animationStep / stepsPerBlock) == index;
  return (
    <div className="relative w-full shrink-0 bg-[url('../../public/ctr-bg.svg')]">

      <div className="absolute top-[68px] left-[54px] w-16 h-[26px] border-2 border-black text-center align-middle font-mono">Key</div>

      <div className="absolute top-[136px] left-[9px]">
        <BitBox8x1 content={plaintextBlock} contentVisible={true} />
      </div>

      <div className="w-[194px] flex flex-col items-center justify-center ml-auto mr-12">
        <BitBox8x1
          content={initialisationVector + index.toString(2).padStart(4, '0')}
          contentVisible={currentBlock && animationStep % stepsPerBlock == 0}
        />

        <div className="w-[194px] h-16 mt-6 mb-[72px] flex items-center border-2 border-black font-mono">
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