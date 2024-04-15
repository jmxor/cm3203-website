export default function DESPermutation(substitutedBlock: string) {
  const permutationMap = [
    15, 6,  19, 20, 28, 11, 27, 16,
    0,  14, 22, 25, 4,  17, 30, 9,
    1,  7,  23, 13, 31, 26, 2,  8,
    18, 12, 29, 5,  21, 10, 3,  24
  ]
  
  return permutationMap.map(index => substitutedBlock.charAt(index)).join('')
}