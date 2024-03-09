"use client"

import AnimationContainer from "@/Components/AnimationContainer";
import ExpansionAnimation from "@/Components/des-animations/ExpansionAnimation";
import AnimationFlowControl from "@/Components/AnimationFlowControl";
import {useState} from "react";

export default function DESFunctionPage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [input, setInput] = useState('');

  function startAnimation() {
    setAnimationStep(0);
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
        <textarea
          className="boxed resize-none"
          placeholder="00101001 ..."
          value={input}
          onChange={e => setInput(e.target.value)}
          maxLength={32}
        />

        <AnimationFlowControl
          animationStep={animationStep}
          startAnimation={startAnimation}
          stepForward={stepForward}
          stepBackward={stepBackward}
        />

        {/* Animation Section */}
        <ExpansionAnimation
          content={input}
          isExpanded={animationStep >= 1}
          isAnimating={animationStep >= 2}
        />
      </AnimationContainer>
    </section>
  )
}