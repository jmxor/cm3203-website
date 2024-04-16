import stringXOR from "@/functions/stringXOR";

test('test single character stringXOR', () => {
  expect(stringXOR('0', '0')).toBe('0')
  expect(stringXOR('0', '1')).toBe('1')
  expect(stringXOR('1', '0')).toBe('1')
  expect(stringXOR('1', '1')).toBe('0')
})

test('test multi-character stringXOR', () => {
  expect(stringXOR('00', '00')).toBe('00')
  expect(stringXOR('00', '01')).toBe('01')
  expect(stringXOR('00', '10')).toBe('10')
  expect(stringXOR('00', '11')).toBe('11')
  expect(stringXOR('01', '00')).toBe('01')
  expect(stringXOR('01', '01')).toBe('00')
  expect(stringXOR('01', '10')).toBe('11')
  expect(stringXOR('01', '11')).toBe('10')
  expect(stringXOR('10', '00')).toBe('10')
  expect(stringXOR('10', '01')).toBe('11')
  expect(stringXOR('10', '10')).toBe('00')
  expect(stringXOR('10', '11')).toBe('01')
  expect(stringXOR('11', '00')).toBe('11')
  expect(stringXOR('11', '01')).toBe('10')
  expect(stringXOR('11', '10')).toBe('01')
  expect(stringXOR('11', '11')).toBe('00')
})
