const numbers = Array.from( { length: 10_000 }).map(
    () => Math.random()
);

const results = numbers
    .map( n => Math.round(n * 10) )
    .filter( n => n % 2 === 0 )
    .reduce( (acc, n) => acc + n, 0 );