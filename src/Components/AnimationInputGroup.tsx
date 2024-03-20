import {PropsWithChildren} from "react";

interface AnimationInputGroupProps {

}

export default function AnimationInputGroup(props: PropsWithChildren<AnimationInputGroupProps>) {
  const {children} = props
  return (
    <div className="grid grid-cols-[96px_1fr] gap-y-2">
      {children}
    </div>
  )
}