export default function stringRotateLeft(string: string, count: number) {
  return string.slice(count, string.length) + string.slice(0, count)
}