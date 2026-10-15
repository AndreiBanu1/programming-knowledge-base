// setup:
const key = 'requestId'
const values = Array.from({ length: 100_000 }).fill(42)

// 1. without eval
function createMessages(key, values) {
  const messages = []
  for (let i = 0; i < values.length; i++) {
    messages.push({ [key]: values[i] })
  }
  return messages
}
 
createMessages(key, values)