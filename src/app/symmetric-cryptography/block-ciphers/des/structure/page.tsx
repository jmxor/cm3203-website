"use client"

import {ChangeEvent, ChangeEventHandler, useState} from "react";

function initialPermutationFunc(block: string) {
  let permutation = ''

  for (let i = 57; i < 65; i += 2) {
    for (let j = 0; j < 8; j++) {
      permutation += block.charAt(i - j * 8)
    }
  }

  for (let i = 56; i < 64; i += 2) {
    for (let j = 0; j < 8; j++) {
      permutation += block.charAt(i - j * 8)
    }
  }

  return permutation
}

export default function DESCipherPage() {
  const [animationStep, setAnimationStep] = useState(0);
  const [plaintextBlock, setPlaintextBlock] = useState('1234567800000000000000000000000000000000000000000000000000000000');
  const [initialPermutation, setInitialPermutation] = useState(initialPermutationFunc(plaintextBlock));

  // TODO: Add padding of input block

  return (
    <>
      <section className="w-full flex flex-col items-center text-center sm:w-1/2">
      <h1>Encryption</h1>
      {/* Feistel structure */}
        <h1>Plaintext Block</h1>
        <textarea
          className="w-full boxed font-mono text-center resize-none"
          inputMode="numeric"
          value={plaintextBlock}
          onChange={e => setPlaintextBlock(e.target.value)}
          maxLength={64}
        />
        ↓
        <div className="w-full boxed font-mono">IP</div>
        ↓
        <div className="w-full boxed font-mono break-all">
          {initialPermutation}
        </div>
        <div className="flex w-full justify-around">
          <div>↓</div>
          <div>↓</div>
        </div>
        <div className="flex w-full gap-2 font-mono">
          <div className="w-1/2 boxed break-all">{initialPermutation.slice(0,32)}</div>
          <div className="w-1/2 boxed break-all">{initialPermutation.slice(32, 64)}</div>
        </div>
        <div className="flex w-full justify-around">
          <div>↓</div>
          <div></div>
          <div>↓</div>
        </div>
        <div>

        <span className="w-1/3 boxed font-mono">Feistel Function</span>
        </div>
        <div className="w-full boxed font-mono">IP<sup>-1</sup></div>
        ↓
        <div className="w-full boxed font-mono">OUTPUT</div>
      </section>

      {/*<section className="w-full sm:w-1/2">*/}
      {/*  <h1>Decryption</h1>*/}
      {/*</section>*/}
    </>
  )
}