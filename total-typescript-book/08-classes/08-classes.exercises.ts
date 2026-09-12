class Album08 {
  title: string
  artist: string
  releaseYear: number

  /**
   * The constructor is a special method that runs when a new instance of the class is created.
   * It’s where you can set up the initial state of the object.
   */
  constructor(opts: { title: string; artist: string; releaseYear: number }) {
    this.title = opts.title
    this.artist = opts.artist
    this.releaseYear = opts.releaseYear
  }
}

const loopFindingJazzRecords = new Album08({
  title: 'Loop Finding Jazz Records',
  artist: 'The Loop',
  releaseYear: 2014,
})

console.log(loopFindingJazzRecords.title)

function printAlbumInfo(album: Album08) {
  console.log(`${album.title} by ${album.artist}, released in ${album.releaseYear}.`)
}

// The constructor is ran after the class is initialized
// the name being set in the constructor overrides the default name value from the class property initializer.
class User {
  name = 'Unknown User'

  constructor() {
    this.name = 'Matt Pocock'
  }
}

const user = new User()

console.log(user.name) // Output: Matt Pocock

// In the arrow method, this is bound to the instance of the class where it was defined.
// In the method method, this is bound to the object where it was called.
class MyClass {
  location = 'Class'

  arrow = () => {
    console.log('arrow', this)
  }

  method() {
    console.log('method', this)
  }
}

const myObj = {
  location: 'Object',
  arrow: new MyClass().arrow,
  method: new MyClass().method,
}

myObj.arrow() // {location: 'Class'}
myObj.method() // {location: 'Object'}

// super(). This is a special method that calls the constructor of the parent class and sets up the properties it defines.
// This is crucial to ensure that the base properties are initialized properly
class SpecialEditionAlbum extends Album08 {
  bonusTracks: string[]

  constructor(opts: { title: string; artist: string; releaseYear: number; bonusTracks: string[] }) {
    super(opts)
    this.bonusTracks = opts.bonusTracks
  }
}

const plasticOnoBandSpecialEdition = new SpecialEditionAlbum({
  title: 'Plastic Ono Band',
  artist: 'John Lennon',
  releaseYear: 2000,
  bonusTracks: ['Power to the People', 'Do the Oz'],
})

/**
 * Safely override with tsconfig.json
 * {
  "compilerOptions": {
    "noImplicitOverride": true
  }
}
* This will force you use the keyword: override method() or property or else it will throw an error
 */

// enforces the structure of the class using interface
interface IAlbum {
  title: string
  artist: string
  releaseYear: number
  trackList: string[]
}
class Album082 implements IAlbum {
  title: string
  artist: string
  releaseYear: number
  trackList: string[]

  constructor(opts: { title: string; artist: string; releaseYear: number; trackList: string[] }) {
    this.title = opts.title
    this.artist = opts.artist
    this.releaseYear = opts.releaseYear
    this.trackList = opts.trackList
  }
}

// Abstract class
// abstract classes blur the line between types and runtime
abstract class AlbumBase {
  title: string
  artist: string
  releaseYear: number
  trackList: string[] = []

  constructor(opts: { title: string; artist: string; releaseYear: number }) {
    this.title = opts.title
    this.artist = opts.artist
    this.releaseYear = opts.releaseYear
  }

  addTrack(track: string) {
    this.trackList.push(track)
  }

  abstract addReview(author: string, review: string): void
}
// Abstract classes don’t allow you to directly create instances of them.
// Instead, you’d need to create a class that extends the AlbumBase class
// this idea is similar to implementing interfaces, except that abstract classes can also include implementation details

// Abstract Methods
//on your abstract class, you can use the abstract keyword before a method to indicate
//that it must be implemented by any class that extends the abstract class

// Exercise 8-1: Creating a Class
class CanvasNode {
  x: number
  y: number

  constructor() {
    this.x = this.y = 0
  }
}

// Exercise 8-2: Implementing Class Methods
class CanvasNode2 {
  x = 0
  y = 0

  move(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

// Exercise 8-3: Implementing a Getter
class CanvasNode3 {
  x: number
  y: number

  constructor(position?: { x: number; y: number }) {
    this.x = position?.x ?? 0
    this.y = position?.y ?? 0
  }

  move(x: number, y: number) {
    this.x = x
    this.y = y
  }

  // using a getter, you can access the property as if it were a regular property on the class instance
  get position() {
    return {
      x: this.x,
      y: this.y,
    }
  }
}

// Exercise 8-4: Implementing a Setter
class CanvasNode4 {
  #x: number
  #y: number

  constructor(position?: { x: number; y: number }) {
    this.#x = position?.x ?? 0
    this.#y = position?.y ?? 0
  }

  set position(pos: { x: number; y: number }) {
    this.#x = pos.x
    this.#y = pos.y
  }
}

// Exercise 8-5: Extending a Class
type ViewMode = 'hidden' | 'visible' | 'selected'

class Shape {
  #x: number
  #y: number

  constructor(options?: { x: number; y: number }) {
    this.#x = options?.x ?? 0
    this.#y = options?.y ?? 0
  }

  // Position getter and setter methods

  move(x: number, y: number) {
    this.#x = x
    this.#y = y
  }
}

class CanvasNode5 extends Shape {
  #viewMode: ViewMode

  constructor(options?: { x: number; y: number; viewMode?: ViewMode }) {
    super(options)
    this.#viewMode = options?.viewMode ?? 'visible'
  }
}
