"use client"

import AnimationContainer from "@/Components/AnimationContainer";
import AnimationInputGroup from "@/Components/AnimationInputGroup";
import AnimationTextarea from "@/Components/AnimationTextarea";
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
        <AnimationInputGroup>
          <AnimationTextarea
            value={input}
            onChange={e => setInput(e.target.value)}
            label="Plaintext 1/2-Block"
            placeholder="00101010..."
            highlightStart={0}
            highlightEnd={0}
          />

          <AnimationFlowControl
            animationStep={animationStep}
            startAnimation={startAnimation}
            stepForward={stepForward}
            stepBackward={stepBackward}
          />
        </AnimationInputGroup>

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