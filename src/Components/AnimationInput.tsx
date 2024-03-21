import {ChangeEvent} from "react";

interface AnimationInputProps {
  label: string,
  placeholder: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  maxLength: number
}

export default function AnimationInput(props: AnimationInputProps) {
  const {label, placeholder, value, onChange, maxLength} = props;
  return (
    <>
      <label className="px-1 border border-r-0 border-black rounded-l">
          {label}
      </label>
      <input
        className="px-1 border border-black rounded-r rounded-l-none font-mono"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </>
  )
}