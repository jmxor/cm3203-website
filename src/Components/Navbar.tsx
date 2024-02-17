import {motion} from "framer-motion";

interface NavbarProps {
  isOpen: boolean
}

export default function Navbar(props: NavbarProps) {
  const {isOpen} = props;

  return (
    <motion.nav
      className="absolute top-0 left-0 z-10 w-full px-2 bg-white sm:static sm:shrink-0 sm:w-64"
      variants={{
        open: {
          x: 0,
          transition: {ease: "easeInOut"}
        },
        closed: {
          x: "-100%",
          transition: {ease: "easeInOut"}
        }
      }}
      initial={false}
      animate={isOpen || window.innerWidth > 640 ? "open": "closed"}
    >
      <ul>
        <li>
          Symmetric Cryptography
          <ul>
            <li>
              Block Ciphers
              <ul>
                <li>DES</li>
                <li>
                  Modes Of Operation
                  <ul>
                    <li>ECB</li>
                    <li>CBC</li>
                    <li>CTR</li>
                    <li>GCM</li>
                    <li>PCBC</li>
                    <li>OFB</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </motion.nav>
  )
}