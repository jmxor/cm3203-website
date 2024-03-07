"use client"

import ExpansionAnimation from "@/Components/des-animations/ExpansionAnimation";
import FlowControl from "@/Components/FlowControl";
import {useState} from "react";

export default function DESFunctionPage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [animationInProgress, setAnimationInProgress] = useState(false);
  const [input, setInput] = useState('');

  function startAnimation() {
    setAnimationStep(0);
    setAnimationInProgress(true)
  }

  function stepForward() {
    setAnimationStep(animationStep + 1)
  }

  function stepBackward() {
    if (animationStep == 0) return;
    setAnimationStep(animationStep + 1)
  }

  return (
    <>
      <section className="w-full flex flex-col sm:w-1/3">
        <textarea
          className="boxed resize-none"
          placeholder="00101001 ..."
          value={input}
          onChange={e => setInput(e.target.value)}
          maxLength={32}
        />

        <div className="w-full flex gap-2 justify-center">
          <button className="border border-black rounded grow" onClick={startAnimation} >
            Start Animation
          </button>
          <FlowControl
            animationStep={animationStep}
            animationInProgress={animationInProgress}
            stepForward={stepForward}
            stepBackward={stepBackward}
          />
        </div>

        {/* Animation Section */}
        <ExpansionAnimation
          content={input}
          isExpanded={animationStep >= 1}
          isAnimating={animationStep >= 2}
        />
      </section>
    </>
  )
}