interface FlowControlProps {
  animationStep: number
  stepForward: () => void,
  stepBackward: () => void;
}

export default function FlowControl(props: FlowControlProps) {
  const {animationStep, stepForward, stepBackward} = props;

  // TODO add proper flow control icons
  return (
    <div className="flex mt-6 border border-black">
      <button
        className="w-6 h-6 border border-black"
        onClick={stepBackward}
      >|&lt;</button>
      <button className="w-6 h-6 border border-black">{animationStep}</button>
      <button
        className="w-6 h-6 border border-black"
        onClick={stepForward}
      >&gt;|</button>
    </div>
  )
}