import DESExpansion from "@/functions/DESExpansion";
import DESPermutation from "@/functions/DESPermutation";
import DESSubstitution from "@/functions/DESSubstitution";
import stringXOR from "@/functions/stringXOR";

export default function DESFunction(halfBlock: string, subkey: string) {
  // Expansion
  let expandedHalfBlock = DESExpansion(halfBlock)

  // Key Mixing
  let mixedBlock = stringXOR(expandedHalfBlock, subkey)

  // Substitution
  let substitutedBlock = DESSubstitution(mixedBlock)

  // Permutation
  let permutedOutput = DESPermutation(substitutedBlock)

  return permutedOutput
}