import {useState} from "react";

interface FlowControlProps {
  animationStep: number,
  startAnimation: () => void,
  stepForward: () => void,
  stepBackward: () => void;
}

export default function AnimationFlowControl(props: FlowControlProps) {
  const {animationStep, startAnimation, stepForward, stepBackward} = props;

  const [animationInProgress, setAnimationInProgress] = useState(false);

  // TODO: add proper flow control icons
  // TODO: add disabled styling for buttons
  return (
    <div className="w-full flex gap-2 col-span-2 justify-center">
      <button className="border border-black rounded grow" onClick={() => {startAnimation(); setAnimationInProgress(true)}} >
        Start Animation
      </button>
      <div className="flex border border-black rounded">
        <button
          className="w-6 h-6 border-r border-black"
          disabled={!animationInProgress}
          onClick={stepBackward}
        >|&lt;</button>
        <button
          className="w-6 h-6"
          disabled={!animationInProgress}
        >{animationStep}
        </button>
        <button
          className="w-6 h-6 border-l border-black"
          disabled={!animationInProgress}
          onClick={stepForward}
        >&gt;|</button>
      </div>
    </div>
  )
}