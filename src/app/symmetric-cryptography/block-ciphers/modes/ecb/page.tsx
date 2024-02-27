"use client"

import {useState} from "react";

export default function ECBModePage() {
  const [input, setInput] = useState('');

  return (
    <section className="w-full flex flex-col items-center">
      <textarea
        className="w-full border border-black resize-none"
        value={input}
        onChange={e => setInput(e.target.value)}
        maxLength={64}
      />

      <br/>

      <div className="flex">
        <div className="flex flex-col justify-center">
          <div className="flex">
            <div className="w-12 h-6 border-2 border-black text-center">Key</div>
            →
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex border border-black">
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
          </div>

          <div>↓</div>

          <div className="w-48 h-16 border-2 border-black font-mono text-center">
            <span className="align-middle">Block Cipher Encryption Function</span>
          </div>

          <div>↓</div>

          <div className="flex border border-black">
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
            <div className="w-6 h-6 border border-black"></div>
          </div>
        </div>
      </div>

    </section>
  )
}