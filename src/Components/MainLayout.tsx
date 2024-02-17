"use client"

import Navbar from "@/Components/Navbar";
import NavToggle from "@/Components/NavToggle";
import {useCycle} from "framer-motion";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, toggleOpen] = useCycle(false, true)

  return (
    <>
      <header className="h-12">
        <div className="flex h-full mx-auto px-2 items-center justify-between 2xl:container">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-black rounded"/>
            <h1 className="ml-2">Security Animations</h1>
          </div>
          <NavToggle
            onClick={() => toggleOpen()}
            isOpen={isOpen}
          />
        </div>
      </header>

      <div className="relative w-full mx-auto sm:flex 2xl:container">
        <Navbar isOpen={isOpen} />
        <main className="px-2">
          {children}
        </main>
      </div>
    </>
  )
}