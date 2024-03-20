import {ChangeEvent, useEffect, useRef} from "react";

interface AnimationInputProps {
  value: string,
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  label: string,
  placeholder: string,
  maxLength?: number
  highlightStart: number,
  highlightEnd: number,
}

export default function AnimationTextarea(props: AnimationInputProps) {
  const {value, onChange, label, placeholder, maxLength, highlightStart, highlightEnd} = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current!.style.height = "0px";
    const scrollHeight = textareaRef.current!.scrollHeight;
    textareaRef.current!.style.height = scrollHeight + 2 + "px"
  }, [textareaRef, value]);

  // TODO: remove random extra bottom padding
  // TODO: make highlight start and stop optional parameters

  return (
    <>
      <label className="px-1 border border-r-0 border-black rounded-l">
        {label}
      </label>
      <div className="relative w-full border border-black rounded-r">
        <textarea
          className="w-full min-h-[50px] px-1 bg-transparent font-mono resize-none"
          ref={textareaRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
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
    </>
  )
}