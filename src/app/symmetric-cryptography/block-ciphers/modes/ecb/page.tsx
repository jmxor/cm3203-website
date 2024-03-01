"use client"

import {useState} from "react";
import {motion} from "framer-motion";

export default function ECBModePage() {
  const [input, setInput] = useState('');
  const [animationStep, setAnimationStep] = useState(0);

  return (
    <section className="w-full flex flex-col items-center">
      <textarea
        className="w-full border border-black resize-none"
        value={input}
        onChange={e => setInput(e.target.value)}
        maxLength={64}
      />

      <br/>

      <div className="w-72 h-72 overflow-clip border border-transparent">
        <motion.div
          className="flex"
          animate={{x: animationStep * -288}}
          transition={{ease: "easeInOut"}}
        >
          {
            Array(Math.ceil(input.length / 8)).fill(null).map(
              (_, k) => <ECBSection key={k} content={input.slice(k * 8, k * 8 + 8)} />
            )
          }
        </motion.div>
      </div>

      <button onClick={() => setAnimationStep(animationStep - 1)}>-</button>
      <button onClick={() => setAnimationStep(animationStep + 1)}>+</button>

    </section>
  )
}

interface ECBSectionProps {
  content: string
}

function ECBSection(props: ECBSectionProps) {
  const {content} = props;
  return (
    <div className="flex w-72 h-72 shrink-0">
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
            <div className="absolute top-0 left-0 flex border border-transparent">
              {content.split('').map(
                (c, k) => <div key={k} className="w-6 h-6 text-center font-mono">{c}</div>
              )}
            </div>
          </div>

          <div>↓</div>

          <div className="w-48 h-16 border-2 border-black font-mono text-center">
            <span className="align-middle">Block Cipher Encryption Function</span>
          </div>

          <div>↓</div>

          <div className="relative">
            <div className="flex border border-black">
              {Array(8).fill(null).map(
                (c, k) => <div key={k} className="w-6 h-6 border border-black"/>
              )}
            </div>
            <div className="absolute top-0 left-0 flex border border-transparent">
              {content.split('').map(
                (c, k) => <div key={k} className="w-6 h-6 text-center font-mono">{c}</div>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}