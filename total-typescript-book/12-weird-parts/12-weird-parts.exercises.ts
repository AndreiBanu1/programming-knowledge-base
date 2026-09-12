// Evolving any type
let myVar
myVar = 659457206512
console.log(myVar.toExponential()) // Logs "6.59457206512e+11"
// myVar.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type 'number'.

myVar = 'mf doom'
console.log(myVar.toUpperCase()) // Logs "MF DOOM"

// You can push anything to it and it will infer the type of the value
const evolvingArray = [] // any[]

evolvingArray.push('abc') // string[];
evolvingArray.push(123) // (string | number)[];
evolvingArray.push('do re mi') // (string | number)[];
evolvingArray.push({ easy: true }) // (string | number | {easy: boolean})[];

// No Excess Property Checks on Variables
interface Album {
  title: string
  releaseYear: number
}

const rubberSoul = {
  title: 'Rubber Soul',
  releaseYear: 1965,
  label: 'Parlophone',
}

const processAlbum = (album: Album) => console.log(album)
processAlbum(rubberSoul) // No error!

// No Excess Property Checks When Comparing Functions
const remapAlbums = (albums: Album[], remap: (album: Album) => Album) => {
  return albums.map(remap)
}

const albums = [{ title: 'Rubber Soul', releaseYear: 1965 }]

const newAlbums = remapAlbums(albums, (album) => ({
  ...album,
  releaseYear: album.releaseYear + 1,
  strangeProperty: 'This is strange',
}))

// Open vs. Closed Object Types
// TypeScript objects are open types
type User = {
  name: string
} // this means an object will have at least the property name

// Fresh object -> generates error
const user: User = {
  name: 'John',
  // age: 30, // error: object literal may only specify known properties
}

// Stale Object
const person = {
  name: 'John',
  age: 30,
}

// The Empty Object Type
const coverArtist: {} = 'Guy-Manuel De Homem-Christo'
const upcCode: {} = 724384260910
const submit = (homework: {}) => console.log(homework)
submit('Oh Yeah')
// submit(null); // Argument of type 'undefined' is not assignable to parameter of type '{}'.

// The Type and Value Worlds
const myNumber: number = 42
//    ^^^^^^^^  ^^^^^^   ^^
//       Value   type    value

// if (typeof key === 'string' && (key as keyof typeof obj))
//^^^^^^^^^^^^^^^^^^^^^^     ^^^^^^^^^^^^^^^^^^^
//Value                    type

// Classes Can Cross Between Worlds
class Song {
  title: string
  artist: string

  constructor(title: string, artist: string) {
    this.title = title
    this.artist = artist
  }
}

// use Song class as a type
const playSong = (song: Song) => {
  console.log(`Now playing '${song.title}' by ${song.artist}`)
}

// Song class used as a constructor argument, so it's a type in Value world
const song1 = new Song('Song 1', 'Artist 1')
playSong(song1)

// Enums Can Cross Between Worlds
enum AlbumStatus {
  NewRelease = 0,
  OnSale = 1,
  StaffPick = 2,
  Clearance = 3,
}

// Used as Type
function logAlbumStatus(status: AlbumStatus) {
  if (status === AlbumStatus.NewRelease) {
    console.log('No discount available.')
  } else {
    console.log('Discounted price available.')
  }
}

// used as Value
function logAlbumStatus2(status: typeof AlbumStatus) {
  // . . .Implementation
}

logAlbumStatus2({
  NewRelease: 0,
  OnSale: 1,
  StaffPick: 2,
  Clearance: 3,
})

// The this Keyword Can Cross Between World
class Songoku {
  playCount: number

  constructor(title: string) {
    this.playCount = 0 // refers to this instance of playCount property
  }

  play(): this {
    this.playCount += 1 // this used as value to access playCount property
    return this // but also as a type to return the value of the method
  }
}

// Naming Types and Values the Same -  it’s possible to name types and values the same thing
export const Track = {
  play: (title: string) => {
    console.log(`Playing: ${title}`)
  },
  pause: () => {
    console.log('Song paused')
  },
  stop: () => {
    console.log('Song stopped')
  },
}

export type Track = typeof Track

const mamboNumberFivePlayer = (track: Track) => {
  // Track is a type for track argument
  track.play('Mambo No. 5')
}

mamboNumberFivePlayer(Track) // Track used as value

// Using this in Functions
const solidAir = {
  title: 'Solid Air',
  artist: 'John Martyn',
  sales: 40000,
  price: 12.99,
  // when declaring a function with the function keyword, this will always refer to the object that the function is a part of
  sellAlbum: function () {
    this.sales++ // acess the property of the object
    console.log(`${this.title} has sold ${this.sales} copies.`) // acess the property of the object
  },
}

// Arrow Functions Don’t Support this - Unlike functions created with the function keyword, arrow functions can’t be annotated with a this parameter
// const sellAlbum = (this: { title: string; sales: number }) => { // An arrow function cannot have a 'this' parameter.
//   this.sales++
//   console.log(`${this.title} has sold ${this.sales} copies.`)
// }

// Function Assignability -> Just because a function can receive a certain number of parameters doesn’t mean it has to use them all in its implementation.
type CallbackType = (filename: string, volume: number, bassBoost: boolean) => void

const handlePlayer = (callback: CallbackType) => {
  // Implementation
}

handlePlayer((filename: string) => console.log(`Playing ${filename}`))
handlePlayer((filename: string, volume: number) =>
  console.log(`Playing ${filename} at volume ${volume}`),
)
handlePlayer((filename: string, volume: number, bassBoost: boolean) => {
  console.log(`Playing ${filename} at volume ${volume} with bass boost on!`)
})

// Unions of Functions Intersect Parameters -> When creating a union of functions, it will create an intersection of the parameters.
const formatterFunctions = {
  title: (album: { title: string }) => `Title: ${album.title}`,
  artist: (album: { artist: string }) => `Artist: ${album.artist}`,
  releaseYear: (album: { releaseYear: number }) => `Release Year: ${album.releaseYear}`,
}

const getAlbumInfo = (
  album: { title: string; artist: string; releaseYear: number }, // here is an intersection
  key: keyof typeof formatterFunctions,
) => {
  const functionToCall = formatterFunctions[key]

  return functionToCall(album)
}

// Exercise 12-1: Accepting Anything Except null and undefined
const acceptAnythingExceptNullOrUndefined = (input: {}) => {}
acceptAnythingExceptNullOrUndefined('hello')
acceptAnythingExceptNullOrUndefined(42)
acceptAnythingExceptNullOrUndefined(true)
acceptAnythingExceptNullOrUndefined(Symbol('foo'))
acceptAnythingExceptNullOrUndefined({})
acceptAnythingExceptNullOrUndefined([])
acceptAnythingExceptNullOrUndefined(() => {})
acceptAnythingExceptNullOrUndefined(/foo/)
acceptAnythingExceptNullOrUndefined(new Error('foo'))
acceptAnythingExceptNullOrUndefined(
  // @ts-expect-error // red squiggly line under @ts-expect-error
  null,
)
acceptAnythingExceptNullOrUndefined(
  // @ts-expect-error // red squiggly line under @ts-expect-error
  undefined,
)

// Exercise 12-2: Detecting Excess Properties in an Object
interface FetchOptions {
  url: string
  method?: string
  headers?: Record<string, string>
  body?: string
}

const options: FetchOptions = {
  url: '/',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  // @ts-expect-error // red squiggly line under @ts-expect-error
  search: new URLSearchParams({
    limit: '10',
  }),
}

const myFetch = async (options: FetchOptions) => {}

myFetch(options)

// Exercise 12-3: Detecting Excess Properties in a Function
interface User2 {
  id: number
  name: string
}

const users = [
  {
    name: 'Waqas',
  },
  {
    name: 'Zain',
  },
]

const usersWithIds: User[] = users.map(
  (user, index): User2 => ({
    ...user,
    id: index,
    // @ts-expect-error // red squiggly line under @ts-expect-error
    age: 30,
  }),
)

// Exercise 12-4: Iterating over Objects
interface User3 {
  id: number
  name: string
}

function printUser(user: User3) {
  Object.values(user).forEach(console.log)
}

it('Should log all the keys of the user', () => {
  const consoleSpy = vitest.spyOn(console, 'log')

  printUser({
    id: 1,
    name: 'Waqas',
  })

  expect(consoleSpy).toHaveBeenCalledWith(1)
  expect(consoleSpy).toHaveBeenCalledWith('Waqas')
})

// Exercise 12-5: Function Parameter Comparisons
type Event = 'click' | 'hover' | 'scroll'

type CallbackType2 = (event: Event, x: number, y: number, screenId: number) => void

const listenToEvent = (callback: CallbackType2) => {}

// Exercise 12-6: Unions of Functions with Object Params
const logId = (obj: { id: string }) => {
  console.log(obj.id)
}

const logName = (obj: { name: string }) => {
  console.log(obj.name)
}

const loggers = [logId, logName]

const logAll = (obj: { id: string; name: string }) => {
  // red squiggly line under obj
  loggers.forEach((func) => func(obj))
}

// Exercise 12-7: Unions of Functions with Incompatible Parameters
const objOfFunctions = {
  string: (input: string) => input.toUpperCase(),
  number: (input: number) => input.toFixed(2),
  boolean: (input: boolean) => (input ? 'true' : 'false'),
}

const format = (input: string | number | boolean) => {
  // 'typeof' isn't smart enough to know that.
  // It can only be 'string', 'number', or 'boolean'.
  const inputType = typeof input as 'string' | 'number' | 'boolean'
  const formatter = objOfFunctions[inputType]

  return formatter(input as never) // red squiggly line under input
}
