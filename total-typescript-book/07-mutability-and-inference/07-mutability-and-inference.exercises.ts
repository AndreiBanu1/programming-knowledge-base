// 1) Let vs Const and type inference
/**
 * In this code example, TypeScript understands that the value of albumGenre can later be changed because let was used when declaring the variable.
 * Because the value might be changed, TypeScript widens it to a wider type. In this case, it infers albumGenre as a string rather than the specific literal type "rock".
 */
type AlbumGenre = 'rock' | 'country' | 'electronic'
// let albumGenre = 'rock'; // generates error
// let albumGenre: AlbumGenre = 'rock' // the fix
const albumGenre = 'rock' //alternative

const handleGenre = (genre: AlbumGenre) => {
  // ..
}

handleGenre(albumGenre)

// 2) Object Property Inference
/**
 * Object properties are mutable, so TypeScript widens them the same way it widens `let` — `status` is inferred as `string`, not the literal "on-sale".
 * Fixes: annotate the object (`const albumAttributes: AlbumAttributes`), or use `as const` on the value or the object.
 */
type AlbumAttributes = {
  status: 'new-release' | 'on-sale' | 'staff-pick'
}

const updateStatus = (attributes: AlbumAttributes) => {
  // ...
}

const albumAttributes = {
  status: 'on-sale',
}

// updateStatus(albumAttributes); // generates error because you later can reassign the value of `status` to a different string
updateStatus({ status: 'on-sale' }) // in-line fix because it can not be reassigned
// const albumAttributes: AlbumAttributes = { //explicitly declare the type and later can be reassigned but only to a valid string
//   status: 'on-sale',
// }
// updateStatus(albumAttributes) // No error

// title and artist properties are locked in and cannot be changed.
// However, the optional status and genre properties can still be modified.
// this occurs only on the type level. At runtime, the properties are still mutable.
interface Album {
  readonly title: string
  readonly artist: string
  status?: 'new-realse' | 'on-sale' | 'staff-pick'
  genre?: string[]
}

// Fully Readonly
const readOnlyWhiteAlbum: Readonly<Album> = {
  title: 'The Beatles (White Album)',
  artist: 'The Beatles',
  status: 'staff-pick',
}

// readonly modifier can be used to create a read-only array of genres
const readOnlyGenres: readonly string[] = ['rock', 'pop', 'unclassifiable']
const readOnlyGenres2: ReadonlyArray<string> = ['rock', 'pop', 'unclassifiable']
// readOnlyGenres.push("experimental");  // generates error because it tries to mutate the array
const upperGenres = readOnlyGenres.map((genre) => genre.toUpperCase()) // no error because it creates new array

// Readonly strict arround arrays
function printGenresReadOnly(genres: readonly string[]) {
  // . . .
}

function printGenresMutable(genres: string[]) {
  // . . .
}

const mutableGenres = ['rock', 'pop', 'unclassifiable']

// This works because specifying readonly on the printGenresReadOnly function parameter guarantees only that the function won’t alter the array’s content.
printGenresReadOnly(mutableGenres)
printGenresMutable(mutableGenres)

// However, the reverse is not true. If you declare a read-only array, you can pass it only to printGenresReadOnly. Attempting to pass it to printGenresMutable will yield an error:
printGenresReadOnly(readOnlyGenres)
// printGenresMutable(readOnlyGenres); // error

// The readonly Object Gap
// an object with a readonly property can freely be passed to a function that then mutates it
type ReadonlyAlbum = {
  readonly genre: string
}

type MutableAlbum = {
  genre: string
}

const readonlyAlbum: ReadonlyAlbum = {
  genre: 'Jazz Rap',
}

const processAlbum = (album: MutableAlbum) => {
  album.genre = 'Pop Punk'
}
processAlbum(readonlyAlbum)

// Exercise 7-1: Inference with an Array of Objects
type ButtonAttributes = {
  type: 'button' | 'submit' | 'reset'
}

const modifyButtons = (attributes: ButtonAttributes[]) => {}

const buttonsToChange: ButtonAttributes[] = [
  {
    type: 'button',
  },
  {
    type: 'submit',
  },
]

modifyButtons(buttonsToChange) // error

// Exercise 7-2: Avoiding Array Mutation
function printNames(names: ReadonlyArray<string>) {
  for (const name of names) {
    console.log(name)
  }

  // @ts-expect-error // red squiggly line under unused "@ts-expect-error" directive
  names.push('John')
  // @ts-expect-error // red squiggly line under unused "@ts-ex
  names[0] = 'Billy'
}

// Exercise 7-3: An Unsafe Tuple
const dangerousFunction = (arrayOfNumbers: number[]) => {
  arrayOfNumbers.pop()
  arrayOfNumbers.pop()
}

type Coordinate = readonly [number, number]
const myHouse: Coordinate = [0, 0]

dangerousFunction(
  // @ts-expect-error // red squiggly line under @ts-expect-error
  myHouse,
)

// Deep Immutability with as const
const albumAttributes2 = {
  status: 'on-sale',
} as const

// as const vs. Variable Annotation
const albumAttributes3: AlbumAttributes = {
  status: 'on-sale',
} as const

// as const vs. Object.freeze
const shelfLocations = Object.freeze({
  entrance: {
    status: 'on-sale',
  },
  frontCounter: {
    status: 'staff-pick',
  },
  endCap: {
    status: 'new-release',
  },
})
// shelfLocations.frontCounter = {status: "on-sale"}; // error because lvl 1 properties are readonly (freezed)
shelfLocations.entrance.status = 'new-release' // nested properties can still be modified

// Using as const makes the entire object deeply read-only, including all nested properties:
const shelfLocations2 = {
  entrance: {
    status: 'on-sale',
  },
  frontCounter: {
    status: 'staff-pick',
  },
  endCap: {
    status: 'new-release',
  },
} as const

/**
 * Object.freeze gives you runtime immutability,
 * as const gives you type-level immutability
 * as const is the more convenient and efficient choice since it means less work has to be done at runtime
 * Unless you specifically need the top level of an object to be frozen at runtime, you should stick with as const.
 */

// Exercise 7-4: Inferring Literal Values in Arrays
type ButtonAttributes2 = {
  type: 'button' | 'submit' | 'reset'
}

const modifyButtons2 = (attributes: ButtonAttributes2[]) => {}

const buttonsToChange2 = [
  {
    type: 'button',
  } as const,
  {
    type: 'submit',
  } as const,
]

modifyButtons2(buttonsToChange2)

buttonsToChange2.push({
  type: 'button',
})

/**
 * When you declare variables with let, TypeScript infers wider types because the values might be reassigned later.
 * Using const creates more precise literal types since the variable can’t be changed.
 */
