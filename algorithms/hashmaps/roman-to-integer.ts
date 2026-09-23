const map = new Map<string, number>([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
])

function romanToInt(s: string): number {
  let num = 0
  for (let i = 0; i < s.length - 1; i++) {
    const current = map.get(s[i])!
    const next = map.get(s[i + 1])!
    if (current < next) {
      num -= current
    } else {
      num += current
    }
  }
  num += map.get(s[s.length - 1])!
  return num
}
