// setup:
const key = 'requestId'
const values = Array.from({ length: 100_000 }).fill(42)

// 2. with eval
function createMessages(key, values) {
  const messages = []
  const createMessage = new Function('value',
    `return { ${JSON.stringify(key)}: value }`
  )
  for (let i = 0; i < values.length; i++) {
    messages.push(createMessage(values[i]))
  }
  return messages
}
 
createMessages(key, values)