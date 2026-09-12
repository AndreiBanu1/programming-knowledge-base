import { it, expect } from 'vitest'
import type { Expect, Equal } from '../helpers'
import {
  add,
  concatName,
  concatTwoStrings,
  getRectangleArea,
  getRectanglePerimeter,
  parsedData,
} from './04-essentials-types.exercises'

describe('Test suite for chapter 04-essentials types', () => {
  it('should return the result of the sum', () => {
    const result = add(1, 2)
    type test = Expect<Equal<typeof result, number>>
    expect(result).toEqual(3)
  })

  it('should return the concataned string', () => {
    const result = concatTwoStrings('Hello', 'World')
    type test = Expect<Equal<typeof result, string>>
    expect(result).toEqual('Hello World')
  })

  it('should return the full name', () => {
    const result = concatName('John', 'Doe')
    const result2 = concatName('John')

    type test = Expect<Equal<typeof result, string>>
    type test2 = Expect<Equal<typeof result2, string>>
    expect(result).toEqual('John Doe')
    expect(result2).toEqual('John')
  })

  it('should return just the first name if full name is not provided', () => {
    const result = concatName('John')

    type test = Expect<Equal<typeof result, string>>
    expect(result).toEqual('John')
  })

  it('should return the area of the rectangle', () => {
    const result = getRectangleArea({
      width: 10,
      height: 20,
    })

    type test = Expect<Equal<typeof result, number>>
    expect(result).toEqual(200)
  })

  it('should return the perimeter of the rectangle', () => {
    const result = getRectanglePerimeter({
      width: 10,
      height: 20,
    })

    type test = Expect<Equal<typeof result, number>>
    expect(result).toEqual(60)
  })

  it('should be the correct shape', () => {
    expect(parsedData).toEqual({
      name: 'Alice',
      age: 30,
    })
  })

  it('should return the full name', () => {
    const result = concatName('John', 'Doe')

    type test = Expect<Equal<typeof result, string>>

    expect(result).toEqual('John Doe')
  })

  it('should return the first name', () => {
    const result = concatName('John')

    type test = Expect<Equal<typeof result, string>>

    expect(result).toEqual('John')
  })
})
