import type {Expect, Equal} from '../helpers'

// 1) Union types
/**
 * A union `A | B` means the value is one of several types, so only members common to all of them are accessible until you narrow.
 */
const message: string | null = Date.now() % 2 === 0 ? 'Even timestamp' : null

type Id = number | string
const logId = (id: Id) => {
    console.log(id)
}

// 2) Literal types and composing unions
/**
 * A literal type allows one exact value; unions of literals act as enums, and unions can be built from other unions.
 */
// Literal type
type yesOrNo = 'YES' | 'NO'
type StatusCode = 200 | 401 | 500
// Combine literal types
type DigitalFormat = 'MP3' | 'FLAC'
type PhysicalFormat = 'LP' | 'CD' | 'Cassette'
type AlbumFormat = DigitalFormat | PhysicalFormat

// 3) Narrowing out null
/**
 * Comparing against `null` splits the union: inside the `if` the value is `string`, in the `else` it is `null`.
 */
// Exercise 5-1
export function getUsername(username: string | null) {
    if (username !== null) {
        return `User: ${username}`
    } else {
        return 'Guest'
    }
}

// 4) Exhaustive switch over a literal union
/**
 * Because `Direction` has four known members, a switch covering all of them satisfies the return type with no fallback.
 */
// Exercise 5-2
export type Direction = 'up' | 'down' | 'left' | 'right'
export type Position = { x: number; y: number }

// Returns the displacement vector for moving `distance` units in `direction`.
// Cartesian convention: up = +y, down = -y, right = +x, left = -x.
export function move(direction: Direction, distance: number): Position {
    switch (direction) {
        case 'up':
            return {x: 0, y: distance}
        case 'down':
            return {x: 0, y: -distance}
        case 'left':
            return {x: -distance, y: 0}
        case 'right':
            return {x: distance, y: 0}
    }
}

// 5) Wide vs narrow types
/**
 * Narrowing moves from many possible values to fewer; a union is always wider than any single member.
 */
// Process of narrowing
// "small" is narrower than string, while number is wider than 22 for example.
// Unions Are Wider Than Their Members (e.g string | number is wider than string or number on its own)
// To narrow, you use: typeof + if else

// 6) Narrowing with typeof
/**
 * `typeof` in a condition tells TypeScript which branch is which, unlocking the string-only and number-only methods.
 */
export const getAlbumYear = (year: string | number): string => {
    if (typeof year === 'string') {
        return `The album was released in ${year.toUpperCase()}.`
    }
    return `The album was released in ${year.toFixed(0)}.`
}

// Exercise 5-3
export function validateUsername(username: string | null): boolean {
    if (typeof username === 'string') {
        return username.length > 5 // red squiggly line under username
    } else {
        return false
    }
}

// 7) Throwing to narrow (early return / guard)
/**
 * Throwing on the bad case removes it from the type for all code that follows.
 */
// Exercise 5-4
export const appElement = document.getElementById('app')
if (!appElement && !document) {
    throw new Error('Could not find app element')
}

// 8) Narrowing with the `in` operator
/**
 * `'data' in response` checks for a property at runtime and narrows the union to the member that has it.
 */
// Exercise 5-5
type APIResponse =
    | {
    data: {
        id: string
    }
}
    | {
    error: string
}

export const handleResponse = (response: APIResponse) => {
    if ('data' in response) {
        return response.data.id
    } else {
        throw new Error(response.error)
    }
}

// 9) unknown, never and any
/**
 * `unknown` accepts anything but lets you do nothing until narrowed, `never` holds no values, `any` opts out of checking entirely.
 */
// The Widest Type: unknown
// The Narrowest Type: never
// Disable type safety: any

// 10) Typing caught errors with instanceof
/**
 * `catch` gives you `unknown`, so `error instanceof Error` is what makes `.message` safe; rethrow anything else.
 */
// Exercise 5-6
const somethingDangerous = () => {
    if (Math.random() > 0.5) {
        throw new Error('Something went wrong.')
    }

    return 'all good.'
}

try {
    somethingDangerous()
} catch (error) {
    if (error instanceof Error) {
        const error = new Error('Some error message')
        console.error(error.message)
    } else {
        throw error
    }
}

// 11) Narrowing unknown step by step
/**
 * To reach a deep property on `unknown` you must prove each level: object, not null, key present, then the value's type.
 */
// Exercise 5-7
export const parseValue = (value: unknown): string => {
    if (
        typeof value === 'object' &&
        value !== null &&
        'data' in value &&
        typeof value.data === 'object' &&
        value.data !== null &&
        'id' in value.data &&
        typeof value.data.id === 'string'
    ) {
        return value.data.id
    }

    throw new Error('Parsing error!')
}

// 12) Discriminated unions
/**
 * A shared literal property (here `status`) acts as a tag, so switching on it narrows to exactly one member and its extra fields.
 */
// Discriminated unions
type LoadingState = {
    status: "loading";
};

type ErrorState = {
    status: "error";
    error: string;
};

type SuccessState = {
    status: "success";
    data: string;
};

type State = LoadingState | ErrorState | SuccessState;

const renderUI = (state: State) => {
    switch (state.status) {
        case 'loading':
            return "Loading. . .";
        case 'error':
            return `Error: ${state.error?.toUpperCase()}`;
        case 'success':
            return `Success: ${state.data}`
    }
}

// 13) Destructuring after narrowing
/**
 * Narrow first, then destructure — destructuring before the check discards the link to the discriminant.
 */
// Exercise 5-8: Destructuring a Discriminated Union
type Circle = {
    kind: "circle";
    radius: number;
};

type Square = {
    kind: "square";
    sideLength: number;
};

type Shape = Circle | Square;

export function calculateArea(shape: Shape) {
    if (shape.kind === "circle") {
        const {radius} = shape;
        return Math.PI * radius * radius;
    } else {
        const {sideLength} = shape;
        return sideLength * sideLength;
    }
}

// 14) Narrowing a discriminated union with switch
/**
 * A switch on the discriminant is the same narrowing as if/else, but scales better and reads as exhaustive.
 */
// Exercise 5-9: Narrowing a Discriminated Union with a switch Statement
function calculateArea2(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius * shape.radius;
        case "square":
            return shape.sideLength * shape.sideLength;
    }
}

// 15) Discriminated tuples
/**
 * The first tuple element can be the tag, so `["error", string] | ["success", User[]]` is narrowed by checking index 0.
 */
// Exercise 5-10: Discriminated Tuples
type User = {
    id: string,
    username: string,
}

type UserAPIResponse = ["error", string] | ["success", User[]];

export async function fetchUser(): Promise<UserAPIResponse> {
    try {
        const response = await fetch("https://api.example.com/data");

        if (!response.ok) {
            return ["error", "An error has occurred"];
        }

        const data = await response.json();

        return ["success", data];
    } catch (e) {
        return ["error", "An error occurred"];
    }
}

// 16) Using else as the default branch
/**
 * With a two-member union, checking one member leaves the other as the `else` type — no explicit second check needed.
 */
type Shape3 = Circle | Square;

// Exercise 5-11: Handling Defaults with a Discriminated Union
export function calculateArea3(shape: Shape3) {
    if (shape.kind === "square") {
        return shape.sideLength * shape.sideLength;
    } else {
        return Math.PI * shape.radius * shape.radius;
    }
}
