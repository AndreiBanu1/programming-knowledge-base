// Annotating Values with satisfies
type Color =
  | string
  | {
      r: number
      g: number
      b: number
    }
// The satisfies operator is a way to tell TypeScript that a value must satisfy certain criteria but still allow TypeScript to infer the type.
const config = {
  foreground: { r: 255, g: 255, b: 255 },
  background: { r: 0, g: 0, b: 0 },
  border: 'transparent',
} satisfies Record<string, Color>

/* Rules:
When you use a variable annotation, the variable’s type wins.
When you don’t use a variable annotation, the value’s type wins.
When you use satisfies, you can tell TypeScript that a value must satisfy certain criteria but still allow TypeScript to infer the type.
*/

type Album = {
  format: 'CD' | 'Vinyl' | 'Digital'
}

const album: Album = {
  format: 'Vinyl',
} satisfies Album

// Assertions: Forcing the Type of Values
const searchParams = new URLSearchParams(window.location.search)

// The as Assertion is a way to override the type of any variable or property and tell TypeScript to treat it as a different type.
const id = searchParams.get('id') as string
const id2 = <string>searchParams.get('id')

// unsafe assertion
const albumSales = 'Heroes' as unknown as number

// The Non Null assertion !
const id3 = searchParams.get('id')!
type User = {
  name: string
  profile?: {
    bio: string
  }
}
const logUserBio = (user: User) => {
  console.log(user.profile!.bio)
}

type Logger = {
  log?: (message: string) => void
}

const main = (logger: Logger) => {
  logger.log!('Hello, world!')
}

// alternative is optional chaining
const main2 = (logger: Logger) => {
  logger.log?.('Hello, world!')
}

function addOne(num: number) {
  return num + 1
}
// @ts-expect-error directive -> tell TS that you expect an error
const result = addOne('one')

//  @ts-ignore directive -> tell TS to ignore the error
const result = addOne(1) // No errors here!

// @ts-nocheck -> completely remove type checking for a file

// Suppressing Errors vs. as any
const result2 = addOne({} as any) // combines a lie to TypeScript (as) with a type that disables all type checking (any).

const obj2 = {} as { a: number; b: number }
obj2.a = 1
obj2.b = 2

// Exercise 11-1: Providing Additional Info to TypeScript
const handleFormData = (e: SubmitEvent) => {
  e.preventDefault()
  const data = new FormData(e.target as HTMLFormElement)
  const value = Object.fromEntries(data.entries())
  return value
}

// Exercise 11-2: Solving Issues with Assertions
const findUsersByName = (
  searchParams: { name?: string },
  users: {
    id: string
    name: string
  }[],
) => {
  if (searchParams.name) {
    return users.filter((user) => user.name.includes(searchParams.name!))
  }

  return users
}

// Exercise 11-3: Enforcing a Valid Configuration
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
    // @ts-expect-error // red squiggly line under @ts-expect-error
    notAllowed: true,
  },
} satisfies Record<
  string,
  {
    apiBaseUrl: string
    timeout: number
  }
>

type Environment = keyof typeof configurations

// Exercise 11-4: Variable Annotation vs. as vs. satisfies
const obj: Record<string, number> = {}
obj.a = 1
obj.b = 2

const menuConfig = {
  home: {
    label: 'Home',
    link: '/home',
  },
  services: {
    label: 'Services',
    children: [
      {
        label: 'Consulting',
        link: '/services/consulting',
      },
      {
        label: 'Development',
        link: '/services/development',
      },
    ],
  },
} satisfies Record<
  string,
  | {
      label: string
      link: string
    }
  | {
      label: string
      children: {
        label: string
        link: string
      }[]
    }
>

const element = document.getElementById('app') as HTMLElement

// Exercise 11-5: Creating a Deeply Read-Only Object
const routes = {
  '/': {
    component: 'Home',
  },
  '/about': {
    component: 'About',
    // @ts-expect-error // red squiggly line under @ts-expect-error
    search: '?foo=bar',
  },
} as const satisfies Record<
  string,
  {
    component: string
  }
>

// @ts-expect-error // red squiggly line under @ts-expect-error
routes['/'].component = 'About'
