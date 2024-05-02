import stringRotateLeft from "@/functions/stringRotateLeft";

test('test single bit stringRotateLeft ', () => {
  expect(stringRotateLeft('0', 1)).toBe('0')
  expect(stringRotateLeft('1', 1)).toBe('1')
  expect(stringRotateLeft('0', 2)).toBe('0')
  expect(stringRotateLeft('1', 2)).toBe('1')
})

test('test multi-character stringXOR', () => {
  expect(stringRotateLeft('00', 1)).toBe('00')
  expect(stringRotateLeft('01', 1)).toBe('10')
  expect(stringRotateLeft('10', 1)).toBe('01')
  expect(stringRotateLeft('11', 1)).toBe('11')
  expect(stringRotateLeft('00', 2)).toBe('00')
  expect(stringRotateLeft('01', 2)).toBe('01')
  expect(stringRotateLeft('10', 2)).toBe('10')
  expect(stringRotateLeft('11', 2)).toBe('11')

})
