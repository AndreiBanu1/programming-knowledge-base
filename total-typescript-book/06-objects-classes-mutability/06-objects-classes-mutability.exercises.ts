// 1) Intersection types
/**
 * `A & B` produces a type that must satisfy both shapes at once — every property of both is required.
 */
// Intersection types
export type Album = {
  title: string
  artist: string
  releaseYear: number
  genre?: string
}

export type SalesData = {
  unitsSold: number
  revenue: number
}

export type AlbumSales = Album & SalesData

export const wishYouWereHereSales: AlbumSales = {
  title: 'Wish You Were Here',
  artist: 'Pink Floyd',
  releaseYear: 1975,
  unitsSold: 13000000,
  revenue: 65000000,
}

// 2) Intersecting incompatible properties gives never
/**
 * `number & string` is impossible, so the property becomes `never` and no value can ever satisfy the type.
 */
// Combining incompatible types results in never
type User1 = {
  age: number
}

type User2 = {
  age: string
}

type User3 = User1 & User2 // never

// 3) Interfaces extending interfaces
/**
 * `extends` copies the base members into the child, expressing "is a" hierarchies instead of an ad-hoc merge.
 */
// Interfaces have the ability to extend other types
export interface Albom {
  title: string
  artist: string
  releaseYear: number
}

export interface StudioAlbum extends Albom {
  studio: string
  producer: string
}

export interface LiveAlbum extends Albom {
  concertVenue: string
  concertDate: Date
}

export const americanBeauty: StudioAlbum = {
  title: 'American Beauty',
  artist: 'Grateful Dead',
  releaseYear: 1970,
  studio: 'Wally Heider Studios',
  producer: 'Grateful Dead and Stephen Barncard',
}

export const oneFromTheVault: LiveAlbum = {
  title: 'One from the Vault',
  artist: 'Grateful Dead',
  releaseYear: 1991,
  concertVenue: 'Great American Music Hall',
  concertDate: new Date('1975-08-13'),
}

// 4) Extending multiple interfaces
/**
 * One interface can extend several parents at once, combining all their members.
 */
export interface BonusConcertEdition extends StudioAlbum, LiveAlbum {
  numberOfDiscs: number
}

// 5) Intersection vs. extends — prefer extends
/**
 * `extends` errors at the point of conflict and is cached by name; intersections are recomputed and report worse errors.
 */
/**
 * Intersections vs. interface extends -> choose interface
 * Better Errors When Merging Incompatible Types
 * Better TypeScript Performance
 * Interfaces are faster. TypeScript can cache the resultant type of an interface based on its name.
 * intersections are slow because they are recomputed everytime
 */

// 6) Factoring shared fields into a base type
/**
 * Common properties live in one `BaseEntity` and each concrete type intersects with it — no duplication.
 */
// Exercise 6-1: Creating an Intersection Type
export type User = {
  name: string
  email: string
} & BaseEntity

export type Product = {
  name: string
  price: number
} & BaseEntity

export type BaseEntity = {
  id: string
  createdAt: Date
}

export const product: Product = {
  id: 'dasdsa',
  createdAt: new Date(8.64e15),
  name: 'name',
  price: 2314,
}

// 7) The same factoring with interfaces
/**
 * Identical result to the intersection version, written the preferred way.
 */
// Exercise 6-2: Extending Interfaces
export interface IBaseEntity {
  id: string
  createdAt: Date
}

export interface IProduct extends IBaseEntity {
  name: string
  price: number
}

export interface IUser extends IBaseEntity {
  name: string
  email: string
}

// 8) Index signatures
/**
 * `[index: string]: boolean` allows any string key, which is what makes keys addable after the object is created.
 */
// Object keys can not be added dynamically, if you don't declare index signature
const albumAwards: {
  [index: string]: boolean
} = {}

albumAwards.Grammy = true
albumAwards.MercuryPrize = false
albumAwards.Billboard = true

interface AlbumAwards {
  [index: string]: boolean
}

// 9) Record as shorthand
/**
 * `Record<K, V>` is the terser form: a string key gives open-ended keys, a literal union gives an exact required set.
 */
// Record type supports dynamic keys
const albumRewards: Record<string, boolean> = {}
albumRewards.Grammy = true

const albumAwards2: Record<'Grammy' | 'MercuryPrize' | 'Billboard', boolean> = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true,
}

// 10) Required keys plus dynamic keys
/**
 * Intersecting a `Record` of known keys with an index signature demands the known keys while still permitting extras.
 */
type BaseAwards = 'Grammy' | 'MercuryPrize' | 'Billboard'

type ExtendedAlbumAwards = Record<BaseAwards, boolean> & {
  [award: string]: boolean
}

const extendedNominations: ExtendedAlbumAwards = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true, // Additional awards can be dynamically added.
  'American Music Awards': true,
}

interface IBaseAwards {
  Grammy: boolean
  MercuryPrize: boolean
  Billboard: boolean
}

interface IExtendedAlbumAwards extends IBaseAwards {
  [award: string]: boolean
}

// 11) PropertyKey
/**
 * `PropertyKey` is the built-in `string | number | symbol` — every type JavaScript accepts as a key.
 */
// The Property Key Type
type AlbumPK = {
  [key: PropertyKey]: string
}

// 12) Four ways to write dynamic keys
/**
 * Type alias, interface, inline annotation and `Record` are interchangeable here; `Record` is the shortest.
 */
// Exercise 6-3: Using an Index Signature for Dynamic Keys

// method I:
// type Scores = {
//     [key: string]: number;
// };

// method II:
// interface Scores {
//     [key: string]: number;
// }

// method III:
// const scores: {
//     [key: string]: number;
// } = {};

// method IV:
const scores: Record<string, number> = {}

scores.math = 95
scores.english = 90
scores.science = 85

// 13) Index signature alongside declared properties
/**
 * Listing keys explicitly next to the index signature makes those keys mandatory while other keys stay optional.
 */
// Exercise 6-4: Default Properties with Dynamic Keys
interface Scores {
  [subject: string]: number

  math: number
  english: number
  science: number
}

const scores2: Scores = {
  math: 95,
  english: 90,
  science: 90,
}

scores.athletics = 100
scores.french = 75
scores.spanish = 70

// 14) Restricting keys with Record
/**
 * A literal union as the key type closes the object: every member is required and unknown keys are rejected.
 */
// Exercise 6-5: Restricting Object Keys with Records
export type Environment = 'development' | 'production' | 'staging'

export type Configurations = Record<
  Environment,
  {
    apiBaseUrl: string
    timeout: number
  }
>

export const configurations: Configurations = {
  development: {
    apiBaseUrl: 'http://localhost:8080',
    timeout: 5000,
  },
  production: {
    apiBaseUrl: 'https://api.example.com',
    timeout: 10000,
  },
  staging: {
    apiBaseUrl: 'https://staging.example.com',
    timeout: 8000,
  },
  // @ts-expect-error // red squiggly line under @ts-expect-error
  notAllowed: {
    apiBaseUrl: 'https://staging.example.com',
    timeout: 8000,
  },
}

// 15) Accepting any key with PropertyKey
/**
 * Typing the parameter as `PropertyKey` lets the helper take strings, numbers or symbols, as `hasOwnProperty` does.
 */
// Exercise 6-6: Dynamic Key Support
export const hasKey = (obj: object, key: PropertyKey) => {
  return obj.hasOwnProperty(key)
}

// 16) Partial and Required
/**
 * `Partial<T>` makes every property optional (ideal for updates); `Required<T>` strips every `?` back off.
 */
// The Partial Type: create a new object type from an existing one, except all of its properties are optional.
type PartialAlbum = Partial<Album>

const updateAlbum = (album: PartialAlbum) => {
  // . . .
}

updateAlbum({ title: 'Geogaddi', artist: 'Boards of Canada' })

// The Required Type: ll the properties of a given object type are required.
type RequiredAlbum = Required<Album>

const doubleCup: RequiredAlbum = {
  title: 'Double Cup',
  artist: 'DJ Rashad',
  releaseYear: 2013,
  genre: 'Juke',
}

// 17) Pick and Omit
/**
 * `Pick` keeps the keys you name, `Omit` drops them — same idea from opposite directions.
 */
type AlbumData = Pick<Album, 'title' | 'artist'>

type AlbumDataWithOmit = Omit<Album, 'id' | 'releaseYear' | 'genre'>

// 18) Pick as a return type
/**
 * Deriving the return type with `Pick` keeps it tied to the source interface instead of hand-copying fields.
 */
// Exercise 6-7: Expecting Certain Properties
interface User67 {
  id: string
  name: string
  email: string
  role: string
}

export const fetchUser = async (): Promise<Pick<User67, 'name' | 'email'>> => {
  const response = await fetch('/api/user')
  const user = await response.json()
  return user
}

// 19) Composing utility types
/**
 * `Partial<Omit<T, 'id'>>` reads inside-out: remove `id`, then make what remains optional — a patch payload.
 */
//Exercise 6-8: Updating a Product
interface Product68 {
  id: number
  name: string
  price: number
  description: string
}

const updateProduct = (id: number, productInfo: Partial<Omit<Product68, 'id'>>) => {
  // Do something with the productInfo.
}

updateProduct(1, {
  // red squiggly line under the entire object
  name: 'Book',
})

updateProduct(1, {
  // red squiggly line under the entire object
  price: 12.99,
})

updateProduct(1, {
  // red squiggly line under the entire object
  description: 'A book about Dragons',
})

updateProduct(1, {
  // red squiggly line under the entire object
  name: 'Book',
  price: 12.99,
})

updateProduct(1, {
  // red squiggly line under the entire object
  name: 'Book',
  description: 'A book about Dragons',
})
