// deriving types from other types, which lets you reduce repetition in your code and create a single source of truth for your types

// 1) use interface extends to make one interface inherit from another
interface Album {
  title: string
  releaseYear: number
  artist: {
    name: string
  }
}

interface AlbumDetails extends Album {
  genre: string
}

// 2) Union type
type Triangle = {
  type: 'triangle'
  sideLength: number
}

type Rectangle = {
  type: 'rectangle'
  width: number
  height: number
}

type Shape = Triangle | Rectangle

// 3) keyof operator: allows you to extract keys from an object type into a uninon type
type AlbumKeys = keyof Album // "title" | "artist" | "releaseYear"

// 4) typeof oeprator: allows you to extract a type from a value
const albumSales = {
  'Kind of Blue': 5000000,
  'A Love Supreme': 1000000,
  'Mingus Ah Um': 3000000,
}
type AlbumSalesType = typeof albumSales //  'Kind of Blue': number; 'A Love Supreme': number; 'Mingus Ah Um': number;
type AlbumTitles = keyof AlbumSalesType //  "Kind of Blue" | "A Love Supreme" | "Mingus Ah Um"

// A common pattern is to combine keyof and typeof to create a new type from an existing object type’s keys and values:
type AlbumNames = keyof typeof albumSales
function getSales(title: AlbumNames) {
  return albumSales[title]
}

// Runtime typeof
const albumSalesType = typeof albumSales // "object"

// Type typeof
type AlbumSalesType2 = typeof albumSales // {"Kind of Blue": number; "A Love Supreme": number; "Mingus Ah Um": number;}

// 5) Index access types
type AlbumTitle = Album['title'] // string
type AlbumTuple = [string, string, number]
type AlbumHeader = AlbumTuple[0]

// chaining them
type ArtistName = Album['artist']['name']

// union
type AlbumPropertyTypes = Album['title' | 'artist' | 'releaseYear']

// getting object's values with keyof
type AlbumPropertyTypes2 = Album[keyof Album] // string | number | {name: string}

// Using as const for JS style enums
const albumTypes = {
  CD: 'cd',
  VINYL: 'vinyl',
  DIGITAL: 'digital',
} as const

type UppercaseAlbumType = keyof typeof albumTypes // "CD" | "VINYL" | "DIGITAL"

// POJO = plain old javascript object
type AlbumType = (typeof albumTypes)[keyof typeof albumTypes] // "cd" | "vinyl" | "digital"

// Exercise 10-1
interface FormValues {
  name: string
  email: string
  password: string
}

const inputs: Record<
  keyof FormValues,
  {
    initialValue: string
    label: string
  }
> = {
  name: {
    initialValue: '',
    label: 'Name',
  },
  email: {
    initialValue: '',
    label: 'Email',
  },
  password: {
    initialValue: '',
    label: 'Password',
  },
}

// Exercise 10-2
const configurations = {
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
}

// type Environment = "development" | "production" | "staging";
type Environment = keyof typeof configurations

// Exercise 10-3,10-4,10-5: Accessing Specific Values
export const programModeEnumMap = {
  GROUP: 'group',
  ANNOUNCEMENT: 'announcement',
  ONE_ON_ONE: '1on1',
  SELF_DIRECTED: 'selfDirected',
  PLANNED_ONE_ON_ONE: 'planned1on1',
  PLANNED_SELF_DIRECTED: 'plannedSelfDirected',
} as const

type ProgramModeMap = typeof programModeEnumMap
type Group = ProgramModeMap['GROUP'] // hovering over Group shows: type Group = 'group'
type Key = 'PLANNED_ONE_ON_ONE' | 'PLANNED_SELF_DIRECTED'
type PlannedPrograms = ProgramModeMap[Key]
type AllPrograms = (typeof programModeEnumMap)[keyof typeof programModeEnumMap]

// Exercise 10-6: Creating a Union from an as const Array
export const programModes = [
  'group',
  'announcement',
  '1on1',
  'selfDirected',
  'planned1on1',
  'plannedSelfDirected',
] as const
type AllPrograms2 = (typeof programModes)[number]

// Deriving Types from Functions
function sellAlbum(album: Album, price: number, quantity: number) {
  return price * quantity
}

// The Parameters utility type extracts the parameters from a given function type and returns them as a tuple.
type SellAlbumParams = Parameters<typeof sellAlbum> // type SellAlbumParams = [album: Album, price: number, quantity: number]

// The ReturnType utility type extracts the return type from a given function:
type SellAlbumReturn = ReturnType<typeof sellAlbum> // type SellAlbumReturn = number;

//The Awaited utility type is used to unwrap the Promise type and provide the type of the resolved value.
type AlbumPromise = Promise<Album>
type AlbumResolved = Awaited<AlbumPromise>

// Exercise 10-7: A Single Source of Truth
const makeQuery = (
  url: string,
  opts?: {
    method?: string
    headers?: {
      [key: string]: string
    }
    body?: string
  },
) => {}

type MakeQueryParameters = Parameters<typeof makeQuery>

// Exercise 10-8: Typing Based on a Return Value
const createUser = (id: string) => {
  return {
    id,
    name: 'John Doe',
    email: 'example@email.com',
  }
}
type User = ReturnType<typeof createUser>

// Exercise 10-9: Unwrapping a Promise
const fetchUser = async (id: string) => {
  return {
    id,
    name: 'John Doe',
    email: 'example@email.com',
  }
}
type AsyncUser = Awaited<ReturnType<typeof fetchUser>>

// The Exclude utility type is used to remove types from a union
type AlbumState =
  | {
      type: 'released'
      releaseDate: string
    }
  | {
      type: 'recording'
      studio: string
    }
  | {
      type: 'mixing'
      engineer: string
    }
type UnreleasedState = Exclude<AlbumState, { type: 'released' }>

// NonNullable is used to remove null and undefined from a type
type Artist = NonNullable<Album['artist']>

// Extract is the opposite of Exclude. It’s used to extract types from a union.
type RecordingState = Extract<AlbumState, { type: 'recording' }>
