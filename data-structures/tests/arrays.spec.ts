const a: number[] = []

function time(fn: () => void): number {
  const start = performance.now()
  fn()
  return performance.now() - start
}

function unshift(number: number) {
  for (let i = 0; i < number; ++i) {
    a.unshift(Math.random())
  }
}

function shift(number: number) {
  for (let i = 0; i < number; ++i) {
    a.shift()
  }
}

function push(number: number) {
  for (let i = 0; i < number; ++i) {
    a.push(Math.random())
  }
}

function pop(number: number) {
  for (let i = 0; i < number; ++i) {
    a.pop()
  }
}

function get(idx: number) {
  return function () {
    return a[idx]
  }
}

function push_arr(count: number) {
  return function () {
    push(count)
  }
}

function pop_arr(count: number) {
  return function () {
    pop(count)
  }
}

function unshift_arr(count: number) {
  return function () {
    unshift(count)
  }
}

function shift_arr(count: number) {
  return function () {
    shift(count)
  }
}

const tests = [10, 100, 1000, 10000, 100000, 1_000_000, 10_000_000]
console.log('=== Testing get ===')
tests.forEach((t) => {
  a.length = 0
  push(t)

  console.log(`${t.toLocaleString()} elements -> ${time(get(t - 1))} ms`)
})

console.log('\n=== Testing push ===')
tests.forEach((t) => {
  a.length = 0
  push(t)

  console.log(`${t.toLocaleString()} elements -> ${time(push_arr(1000))} ms`)
})

console.log('\n=== Testing pop ===')
tests.forEach((t) => {
  a.length = 0
  push(t)

  console.log(`${t.toLocaleString()} elements -> ${time(pop_arr(1000))} ms`)
})

console.log('\n=== Testing unshift ===')
tests.forEach((t) => {
  a.length = 0
  push(t)

  console.log(`${t.toLocaleString()} elements -> ${time(unshift_arr(1000))} ms`)
})

console.log('\n=== Testing shift ===')
tests.forEach((t) => {
  a.length = 0
  push(t)

  console.log(`${t.toLocaleString()} elements -> ${time(shift_arr(1000))} ms`)
})
