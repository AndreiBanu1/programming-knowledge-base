import type { Expect, Equal } from '../helpers'

// Generics
type ResourceStatus<T> =
  | {
      status: 'available'
      content: T
    }
  | {
      status: 'unavailable'
      reason: string
    }

type StreamingPlaylist = ResourceStatus<{
  id: number
  name: string
  tracks: string[]
}>

type StreamingAlbum = ResourceStatus<{
  id: number
  title: string
  artist: string
  tracks: string[]
}>

// Multiple Type Parameters
type ResourceStatus2<TContent, TMetadata> =
  | {
      status: 'available'
      content: TContent
      metadata: TMetadata
    }
  | {
      status: 'unavailable'
      reason: string
    }

type StreamingPlaylist2 = ResourceStatus2<
  {
    id: number
    name: string
    tracks: string[]
  },
  {
    creator: string
    artwork: string
    dateUpdated: Date
  }
>

type StreamingAlbum2 = ResourceStatus2<
  {
    id: number
    title: string
    artist: string
    tracks: string[]
  },
  {
    recordLabel: string
    upc: string
    yearOfRelease: number
  }
>

// Default Type Parameteres
type ResourceStatus3<TContent, TMetadata = {}> =
  | {
      status: 'available'
      content: TContent
      metadata?: TMetadata
    }
  | {
      status: 'unavailable'
      reason: string
    }

type StreamingPlaylist3 = ResourceStatus3<{
  id: number
  name: string
  tracks: string[]
}>

// Type parameter constraints
type HasId = {
  id: number
}

type ResourceStatus4<TContent extends HasId, TMetadata extends object = {}> =
  | {
      status: 'available'
      content: TContent
      metadata: TMetadata
    }
  | {
      status: 'unavailable'
      reason: string
    }

type StreamingPlaylist4 = ResourceStatus4<
  {
    id: 123
    name: string
    tracks: string[]
  },
  {
    creator: string
    artwork: string
    dateUpdated: Date
  }
>

// Template Literal Types
type PngFile = `${string}.png` // it means it must end with .png
let myImage: PngFile = 'my-image.png' // OK
// let myImage: PngFile = 'my-image.jpg' // error

type ColorShade = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
type Color = 'red' | 'blue' | 'green'
type ColorPalette = `${Color}-${ColorShade}` // combines the two types to create a new type
let myColor: ColorPalette = 'red-500' // OK
let myColor2: ColorPalette = 'blue-900' // OK

// Transforming string types
type UppercaseHello = Uppercase<'hello'> // "HELLO"
type LowercaseHELLO = Lowercase<'HELLO'> // "hello"
type CapitalizeMatt = Capitalize<'matt'> // "Matt"
type UncapitalizePHD = Uncapitalize<'PHD'> // "pHD"

// Conditional Types
type ToArray<T> = T extends any[] ? T : T[] // T extends any[] checks if T could be passed to a function expecting any[], which means it is an array. If so, then the type of T will be returned unchanged. Otherwise return T[] directly
type Example = ToArray<string> // string[]
type Example2 = ToArray<string[]> // string[]

// Mapped type
interface Album {
  name: string
  artist: string
  songs: string[]
}

type Nullable<T> = {
  [K in keyof T]?: T[K] | null
}
type AlbumWithNullable = Nullable<Album>

// type AlbumWithNullable = {
//   name?: string | null | undefined
//   artist?: string | null | undefined
//   songs?: string[] | null | undefined
// }

// Remapping with uppercase
type AlbumWithUppercaseKeys = {
  [K in keyof Album as Uppercase<K>]: Album[K]
}

// Exercise 15-1: Creating a DataShape Type Helper
type ErrorShape = {
  error: {
    message: string
  }
}

type DataShape<T> =
  | {
      data: T
    }
  | ErrorShape

type UserDataShape = DataShape<{
  id: string
  name: string
  email: string
}>

type PostDataShape = DataShape<{
  id: string
  title: string
  body: string
}>

// Exercise 15-2: Typing PromiseFunc
// type PromiseFunc = (input: any) => Promise<any>
type PromiseFunc<TInput, TOutput> = (input: TInput) => Promise<TOutput>

type Example1 = PromiseFunc<string, string>

type Example152 = PromiseFunc<boolean, number>

// Exercise 15-3: Working with the Result Type
type Result<TResult, TError extends { message: string } = Error> =
  | {
      success: true
      data: TResult
    }
  | {
      success: false
      error: TError
    }

const createRandomNumber = (): Result<number> => {
  const num = Math.random()

  if (num > 0.5) {
    return {
      success: true,
      data: 123,
    }
  }

  return {
    success: false,
    error: new Error('Something went wrong'),
  }
}

const result = createRandomNumber()

if (result.success) {
  console.log(result.data)
} else {
  console.error(result.error.message)
}
// this pattern is a great alternative to the try ... catch block in JavaScript

// Exercise 15-4: Constraining the Result Type
type BadExample = Result<
  { id: string },
  // @ts-expect-error Should be an object with a message property.
  string
>

type GoodExample = Result<{ id: string }, TypeError>
type GoodExample2 = Result<{ id: string }, { message: string; code: number }>
type GoodExample3 = Result<{ id: string }, { message: string }>
type GoodExample4 = Result<{ id: string }>

// Exercise 15-5: A Stricter Omit Type
type StrictOmit<T, K extends keyof T> = Omit<T, K>
type ShouldFail = StrictOmit<
  { a: string },
  // @ts-expect-error
  'b'
>

// Exercise 15-6: Route Matching
type AbsoluteRoute = `/${string}`

const goToRoute = (route: AbsoluteRoute) => {
  // . . .
}

goToRoute('/home')
goToRoute('/about')
goToRoute('/contact')

goToRoute(
  // @ts-expect-error
  'somewhere',
)

// Exercise 15-7: Sandwich Permutations
type BreadType = 'rye' | 'brown' | 'white'

type Filling = 'cheese' | 'ham' | 'salami'
type Sandwich = `${BreadType} sandwich with ${Filling}`

type testsSandwich = [
  Expect<
    Equal<
      Sandwich,
      | 'rye sandwich with cheese'
      | 'rye sandwich with ham'
      | 'rye sandwich with salami'
      | 'brown sandwich with cheese'
      | 'brown sandwich with ham'
      | 'brown sandwich with salami'
      | 'white sandwich with cheese'
      | 'white sandwich with ham'
      | 'white sandwich with salami'
    >
  >,
]

// Exercise 15-8: Attribute Getters
interface Attributes {
  firstName: string
  lastName: string
  age: number
}

type AttributeGetters = {
  [K in keyof Attributes]: () => Attributes[K]
}

type testsAttributes = [
  Expect<
    Equal<
      AttributeGetters,
      {
        firstName: () => string
        lastName: () => string
        age: () => number
      }
    >
  >,
]

// Exercise 15-9: Renaming Keys in a Mapped Type
type AttributeGetters2 = {
  [K in keyof Attributes as `get${Capitalize<K>}`]: () => Attributes[K]
}

type testsAttr2 = [
  Expect<
    Equal<
      AttributeGetters2,
      {
        getFirstName: () => string
        getLastName: () => string
        getAge: () => number
      }
    >
  >,
]

// Declaring Generics
// 1
function identity<T>(arg: T): T {
  return arg
}
// 2
const identity2 = <T>(arg: T): T => arg
// 3
type Identity = <T>(arg: T) => void
const identity3: Identity = (arg) => arg

// Type alias for a generic function
type IdentityAlias = <T>(arg: T) => void
//              ^^^
// Type parameter belongs to the function.

type StringArray = Array<string>
// @ts-expect-error
type AnyArray = Array // red squiggly line under Array because we do not pass the string argument

// Generic type
type IdentityGeneric<T> = (arg: T) => void
//           ^^^
// Type parameter belongs to the type.

function identity4<T>(arg: T): T {
  return arg
}
const result1 = identity('hello') // result1: 'hello'
const result2 = identity({ hello: 'world' }) // result2: {hello: 'world'}
const result3 = identity([1, 2, 3]) // result3: number[]
const result4 = identity4(42) // 42

// Type parameter The <T> in identity<T>

// Type argument The number passed to Set<number>

// Generic class/function/type A class, function, or type that declares a type parameter

// When you want to allow more types
const getFirstElement = <T>(arr: T[]) => {
  return arr[0]
}

const firstNumber2 = getFirstElement([1, 2, 3])
const firstString2 = getFirstElement(['a', 'b', 'c'])

// set a default
const createSet = <T = string>(arr?: T[]) => {
  return new Set(arr)
}

// constrain a property
const removeId = <TObj extends { id: unknown }>(obj: TObj) => {
  const { id, ...rest } = obj
  return rest
}

// Type Predicate
function isAlbum(input: unknown): input is Album {
  return (
    typeof input === 'object' &&
    input !== null &&
    'id' in input &&
    'title' in input &&
    'artist' in input &&
    'year' in input
  )
}

// Type Assertion
function assertIsAlbum(input: unknown): asserts input is Album {
  if (
    typeof input === 'object' &&
    input !== null &&
    'id' in input &&
    'title' in input &&
    'artist' in input &&
    'year' in input
  ) {
    throw new Error('Not an Album!')
  }
}

// Function Overloads
function searchMusic(artist: string, genre: string, year: number): void
function searchMusic(criteria: { artist: string; genre: string; year: number }): void

function searchMusic(
  artistOrCriteria: string | { artist: string; genre: string; year: number },
  genre?: string,
  year?: number,
): void {
  if (typeof artistOrCriteria === 'string') {
    // Search with separate arguments
    search(artistOrCriteria, genre, year)
  } else {
    // Search with object
    search(artistOrCriteria.artist, artistOrCriteria.genre, artistOrCriteria.year)
  }
}

function search(artist: string, genre: string | undefined, year: number | undefined): void {
  // actual search implementation
}

// Exercise 16-1: Making a Function Generic
const createStringMap = <T = string>() => {
  return new Map<string, T>()
}

const numberMap = createStringMap<number>()

numberMap.set('foo', 123)
numberMap.set(
  'bar',
  // @ts-expect-error
  true,
)

// Exercise 16-3: Inference in Generic Functions
const uniqueArray = <T>(arr: any[]) => {
  return Array.from(new Set(arr))
}

// Exercise 16-4: Type Parameter Constraints
const UNKNOWN_CODE = 8000

const addCodeToError = <TError extends { message: string; code?: number }>(error: TError) => {
  return {
    ...error,
    code: error.code ?? UNKNOWN_CODE,
  }
}
