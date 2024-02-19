"use client"

import AnimationInput from "@/Components/AnimationInput";
import {useState} from "react";

export default function DESCipherPage() {
  const [plaintext, setPlaintext] = useState('');

  return (
    <>
      <h1>Data Encryption Standard (DES) Cipher</h1>
      <div className="w-full sm:flex">
        <section className="w-full sm:w-1/2">
          <h1>Encryption</h1>
          <AnimationInput
            value={plaintext}
            onChange={e => setPlaintext(e.target.value)}
            highlightStart={0}
            highlightEnd={8}
          />
        </section>

        <section className="w-full sm:w-1/2">
          <h1>Decryption</h1>
        </section>
      </div>
    </>
  )
}