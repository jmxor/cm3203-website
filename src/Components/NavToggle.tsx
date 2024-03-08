"use client"

import {MouseEventHandler} from "react";
import {motion} from "framer-motion";

const Path = (props: any) => (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="black"
      strokeLinecap="round"
      {...props}
    />
  )


interface NavToggleProps {
  onClick: MouseEventHandler<HTMLButtonElement>,
  isOpen: boolean
}

export default function NavToggle(props: NavToggleProps) {
  const {onClick, isOpen} = props;

  return (
    <motion.button
      className="flex flex-col gap-1 justify-between lg:hidden"
      onClick={onClick}
      initial={"closed"}
      animate={isOpen ? "open": "closed"}
    >
      <motion.div
        className="w-8 h-1.5 bg-black rounded"
        variants={{
          open: {y:"164%", rotate: "45deg"},
        }}
      />
      <motion.div
        className="w-8 h-1.5 bg-black rounded"
        variants={{
          open: {opacity: 0}
        }}
      />
      <motion.div
        className="w-8 h-1.5 bg-black rounded"
        variants={{
          open: {y: "-164%", rotate: "-45deg"},
        }}
      />
    </motion.button>
  )
}