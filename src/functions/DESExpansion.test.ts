import DESExpansion from "@/functions/DESExpansion";

test('test DESExpansion', () => {
  expect(DESExpansion('00100110111101110100110010011111')).toBe('100100001101011110101110101001011001010011111110')
  expect(DESExpansion('11011001100001010010100000001100')).toBe('011011110011110000001010100101010000000001011001')
  expect(DESExpansion('01001100001100100011011001001001')).toBe('101001011000000110100100000110101100001001010010')
  expect(DESExpansion('10100000000010101010011001010111')).toBe('110100000000000001010101010100001100001010101111')
})

