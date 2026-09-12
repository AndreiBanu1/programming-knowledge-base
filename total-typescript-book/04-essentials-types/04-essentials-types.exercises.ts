import type {Expect, Equal} from '../helpers'

// 1) Parameter and return type annotations
/**
 * Parameters must be annotated (they are `any`/implicit-any otherwise); the return type is optional and acts as a contract check.
 */
export const add = (a: number, b: number): number => {
    return a + b
}

// 2) Inferred return types
/**
 * With no return annotation, TypeScript infers it from the body — here `string`, because `join` returns a string.
 */
export const concatTwoStrings = (a: string, b: string) => {
    return [a, b].join(' ')
}

// 3) Object types via a type alias
/**
 * A `type` alias names an object shape once so many functions can reuse it instead of repeating an inline annotation.
 */
export type Rectangle = {
    width: number;
    height: number;
}
export const getRectangleArea = (rectangle: Rectangle) => {
    return rectangle.width * rectangle.height;
};
export const getRectanglePerimeter = (rectangle: Rectangle) => {
    return 2 * (rectangle.width + rectangle.height);
};

// 4) Nested object types and arrays of objects
/**
 * Object types nest freely: `items` is an array of inline object types, so `for...of` gives fully typed items.
 */
type ShoppingCart = {
    userId: string;
    items: { itemName: string, quantity: number, price: number }[];
};
const processCart = (cart: ShoppingCart) => {
    let total = 0;
    for (const item of cart.items) {
        total += item.quantity * item.price;
        console.log(`${item.itemName} ${total}$`);
    }
    console.log(`Total: ${total}$`);
};
processCart({
    userId: "user123",
    items: [
        {itemName: "apples", quantity: 5, price: 3},
        {itemName: "bananas", quantity: 3, price: 5},
        {itemName: "milk", quantity: 1, price: 10},
        {itemName: "bread", quantity: 2, price: 1},
        {itemName: "eggs", quantity: 12, price: 2},
    ],
});

// 5) Extracting a nested type into an interface
/**
 * Pulling the repeated shape out into `Ingredient` keeps `Recipe` readable and makes the inner type reusable.
 */
interface Ingredient {
    name: string;
    quantity: string;
}

type Recipe = {
    title: string;
    ingredients: Ingredient[];
    instructions: string;
};
const processRecipe = (recipe: Recipe) => {
    let total: string = "";
    for (let ingredient of recipe.ingredients) {
        total += ingredient.quantity + ingredient.quantity;
    }
};
processRecipe({
    title: "Chocolate Chip Cookies",
    ingredients: [
        {name: "Flour", quantity: "2 cups"},
        {name: "Sugar", quantity: "1 cup"},
        // other ingredients here. . .
    ],
    instructions: ". . .",
});

// 6) Tuples with named members
/**
 * A tuple fixes the length and the type at each index; the labels (`x:`, `y:`) are documentation only, not real keys.
 */
const setRange = (range: [x: number, y: number]) => {
    const x = range[0];
    const y = range[1];

    // Do something with x and y in here
    // x and y should both be numbers!

    type tests = [
        Expect<Equal<typeof x, number>>,
        Expect<Equal<typeof y, number>>,
    ];
};

// 7) Optional tuple members
/**
 * A trailing `?` member may be missing, so reading that index yields `number | undefined`.
 */
const goToLocation = (coordinates: [latitude: number, longitude: number, elevation?: number]) => {
    const latitude = coordinates[0];
    const longitude = coordinates[1];
    const elevation = coordinates[2];

    // Do something with latitude, longitude, and elevation in here

    type tests = [
        Expect<Equal<typeof latitude, number>>, // red squiggly line under Equal<> statement
        Expect<Equal<typeof longitude, number>>, // red squiggly line under Equal<> statement
        Expect<Equal<typeof elevation, number | undefined>>,
    ];
};

// 8) Optional object properties + passing type arguments
/**
 * `id?` makes the property omittable, and `new Map<number, User>()` passes type arguments explicitly so `set` is checked.
 */
type User = {
    id?: string;
    name: string;
    age: number;
};
const userMap = new Map<number, User>();

function setSomeUserMaps() {
    userMap.set(1, {name: "Max", age: 30});
    userMap.set(2, {name: "Manuel", age: 31});
// @ts-expect-error // red squiggly line under @ts-expect-error
    userMap.set("3", {name: "Anna", age: 29});
// @ts-expect-error // red squiggly line under @ts-expect-error
    userMap.set(3, "123");
}

// 9) Typing an `any` return value
/**
 * `JSON.parse` returns `any`, so annotating the variable is what restores type safety downstream.
 */
export const parsedData: {
    name: string;
    age: number;
} = JSON.parse('{"name": "Alice", "age": 30}');

// 10) Rest parameters
/**
 * `...formats: string[]` collects any number of trailing arguments into a typed array.
 */
type Album = {
    title: string;
    artist: string;
    year: number;
};

const getAlbumFormats = (album: Album, ...formats: string[]) => {
    return `${album.title} is available in the following formats: ${formats.join(
        ", ",
    )}`;
}
getAlbumFormats({
    title: "Inapoi in viitor",
    artist: "BUG Mafia",
    year: 2015
}, "CD", "LP", "Cassette");

// 11) Function types as parameters (contextual inference)
/**
 * Typing a parameter as a function signature lets the callback's own parameters be inferred at the call site.
 */
// type Mapper = (item: string) => number;
const mapOverObjects = (items: string[], map: (item: string) => number) => {
    return items.map(map);
}
const arrayOfNumbers = mapOverObjects(['1', '2', '3'], (item) => {
    return parseInt(item) * 100;
});

// 12) Function type aliases
/**
 * Function signatures can be named and reused, including optional and rest parameter forms.
 */
type WithOptional = (index?: number) => number;
type WithRest = (...rest: string[]) => number;
type WithMultiple = (first: string, second: string) => number;

// 13) Optional parameters
/**
 * `last?: string` is really `string | undefined`, so it must be narrowed before use.
 */
// Async
export const concatName = (first: string, last?: string) => {
    if (!last) {
        return first;
    }

    return `${first} ${last}`;
}

// 14) Callbacks that transform a value
/**
 * `makeChange: (user: User) => User` documents both what the callback receives and what it must give back.
 */
const modifyUser = (user: User[], id: string, makeChange: (user: User) => User) => {
    return user.map((u) => {
        if (u.id === id) {
            return makeChange(u);
        }

        return u;
    });
};
const users: User[] = [
    {id: "1", name: "John", age: 22},
    {id: "2", name: "Jane", age: 42},
];
modifyUser(users, "1", (user) => {
    return { ...user, name: "Waqas" };
});

// 15) The `void` return type
/**
 * `() => void` means "return value ignored" — a callback may still return something, it just won't be used.
 */
const addClickEventListener = (listener: () => void) => {
    if (typeof document !== "undefined") {
        document.addEventListener("click", listener);
    }
};
addClickEventListener(() => {
    console.log("Clicked!");
});

// 16) Async functions and Promise<T>
/**
 * An `async` function always returns a Promise, so the annotation wraps the resolved type; `await` unwraps it back.
 */
async function fetchData(): Promise<number> {
    const response = await fetch("https://api.example.com/data");
    const data: number = await response.json();
    return data;
}
const example = async () => {
    const data = await fetchData();
    type test = Expect<Equal<typeof data, number>>;
};
