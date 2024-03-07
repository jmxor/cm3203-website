interface FlowControlProps {
  animationStep: number,
  animationInProgress: boolean,
  stepForward: () => void,
  stepBackward: () => void;
}

export default function FlowControl(props: FlowControlProps) {
  const {animationStep, animationInProgress, stepForward, stepBackward} = props;

  // TODO: add proper flow control icons
  // TODO: add disabled styling for buttons
  return (
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
  )
}