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

export default function CBCModePage() {
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
      let temp = stringXOR(plaintextInput[i], keyInput[i % 8])
      if (i < 8) {
        ciphertext += stringXOR(temp, IVInput[i])
      } else {
        ciphertext += stringXOR(temp, ciphertext[i-8])
      }
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
           placeholder="00101010..."
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
            label="IV (8-bit)"
            placeholder="01010010"
            value={IVInput}
            onChange={e => setIVInput(e.target.value)}
            maxLength={8}
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
            <CBCSection
              key={k}
              index={k}
              plaintextBlock={plaintext.slice(k * 8, k * 8 + 8)}
              ciphertextBlock={cipherText.slice(k * 8, k * 8 + 8)}
              encryptionKey={encryptionKey}
              initialisationVector={k==0 ? initialisationVector : cipherText.slice((k-1) * 8, (k-1) * 8 + 8)}
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

interface CBCSectionProps {
  index: number
  plaintextBlock: string
  ciphertextBlock: string
  encryptionKey: string
  initialisationVector:string;
  animationStep: number
  stepsPerBlock: number
}

function CBCSection(props: CBCSectionProps) {
  const {plaintextBlock, ciphertextBlock, encryptionKey, initialisationVector, animationStep, stepsPerBlock, index} = props;
  const currentBlock = Math.floor(animationStep / stepsPerBlock) == index;

  return (
    <div className="relative w-full shrink-0 bg-[url('../../public/cbc-bg.svg')]">

      <div className="absolute top-[117px] left-[54px] w-16 h-[26px] border-2 border-black text-center align-middle font-mono">Key</div>

      <div className="absolute top-[49px] left-[8px]">
        <BitBox8x1 content={initialisationVector} contentVisible={true} />
      </div>

      <div className="w-[194px] flex flex-col items-center justify-center ml-auto mr-12">
        <BitBox8x1
          content={plaintextBlock}
          contentVisible={currentBlock && animationStep % stepsPerBlock >= 0}
        />

        <div className="w-[194px] h-16 mt-[72px] mb-12 flex items-center border-2 border-black font-mono">
          <span className="text-center">Block Cipher Function</span>
        </div>

        <BitBox8x1
          content={ciphertextBlock}
          contentVisible={currentBlock && animationStep % stepsPerBlock >= 1}
        />
      </div>
    </div>
  )
}