import NavItem from "@/Components/NavItem";
import {motion} from "framer-motion";

interface NavbarProps {
  isOpen: boolean
}

export default function Navbar(props: NavbarProps) {
  const {isOpen} = props;

  // TODO: make close navbar when clicking link
  return (
    <motion.nav
      className="absolute top-0 left-0 z-10 w-full h-full px-2 py-1 bg-white sm:static sm:shrink-0 sm:w-64"
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
      animate={isOpen ? "open": "closed"}
    >
      <ul>
        <NavItem name="Symmetric Cryptography" href="">
          <NavItem name="Block Ciphers" href="">
            <NavItem name="DES" href="/symmetric-cryptography/block-ciphers/des/structure" >
              <NavItem name="Feistel Structure" href="/symmetric-cryptography/block-ciphers/des/structure" />
              <NavItem name="Feistel Function" href="/symmetric-cryptography/block-ciphers/des/function" />
              <NavItem name="Key Schedule" href="/symmetric-cryptography/block-ciphers/des/key-schedule" />
            </NavItem>
            <NavItem name="Modes of Operation" href="">
              <NavItem name="ECB" href="/symmetric-cryptography/block-ciphers/modes/ecb"/>
              <NavItem name="CBC" href="/symmetric-cryptography/block-ciphers/modes/cbc"/>
              <NavItem name="CTR" href="/symmetric-cryptography/block-ciphers/modes/ctr"/>
              <NavItem name="GCM" href="/symmetric-cryptography/block-ciphers/modes/gcm"/>
              <NavItem name="PCBC" href="/symmetric-cryptography/block-ciphers/modes/pcbc"/>
              <NavItem name="OFB" href="/symmetric-cryptography/block-ciphers/modes/ofb"/>
            </NavItem>
          </NavItem>
        </NavItem>
      </ul>
    </motion.nav>
  )
}