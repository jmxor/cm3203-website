export default function stringXOR(a: string, b: string) {
  let out = '';
  for (let i = 0; i < a.length; i++) {
    out += (a.charAt(i) != b.charAt(i)) ? '1' : '0'
  }

  return out
}