import {ChangeEvent, useEffect, useRef} from "react";

interface AnimationInputProps {
  value: string,
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  highlightStart: number,
  highlightEnd: number,
}

export default function AnimationInput(props: AnimationInputProps) {
  const {value, onChange, highlightStart, highlightEnd} = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current!.style.height = "0px";
    const scrollHeight = textareaRef.current!.scrollHeight;
    textareaRef.current!.style.height = scrollHeight + 2 + "px"
  }, [textareaRef, value]);

  // TODO: remove random extra bottom padding

  return (
    <div className="relative w-full">
      <textarea
        className="w-full px-1 bg-transparent border border-black rounded font-mono resize-none"
        ref={textareaRef}
        value={value}
        onChange={onChange}
      />
      <div className="absolute top-0 left-0 overflow-auto -z-10">
        <div className="w-full px-1 text-transparent font-mono break-all">
          {value.slice(0, highlightStart)}
          <mark className="rounded text-transparent">
            {value.slice(highlightStart, highlightEnd)}
          </mark>
          {value.slice(highlightEnd, value.length)}
        </div>
      </div>
    </div>
  )
}