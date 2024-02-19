import {useCycle} from "framer-motion";
import Link from "next/link";
import {PropsWithChildren} from "react";
import {motion} from "framer-motion";

interface NavItemProps {
  name: string,
  href: string
}

export default function NavItem(props: PropsWithChildren<NavItemProps>) {
  const {name, href, children} = props;
  const [isExpanded, toggleExpanded] = useCycle(true, false)

  return (
    <motion.li
      variants={{
        expanded: {opacity: 1},
        collapsed: {opacity: 0, display: "none"}
      }}
    >
      <div className="flex items-center">
        {children
          ? <button className="w-4 h-4 bg-black rounded" onClick={() => toggleExpanded()}/>
          : <div className="w-4 h-2 bg-black rounded"/>
        }
        <Link href={href} className="ml-1">{name}</Link>
      </div>
      <motion.ul
        className="ml-4"
        animate={isExpanded? "expanded" : "collapsed"}
      >
        {children}
      </motion.ul>
    </motion.li>
  )
}