/** Class Parameter Properties
 ** allow you to declare and initialize class members directly from the constructor parameters.
 */
class Rating {
  constructor(
    public value: number,
    private max: number,
  ) {}
}

/** Enums
 **You can use the enum keyword to define a set of named constants. These can be used as types or values.
 */
enum Direction {
  North,
  East,
  South,
  West,
}

enum AlbumStatus {
  NewRelease = 'NEW_RELEASE',
  OnSale = 'ON_SALE',
  StaffPick = 'STAFF_PICK',
}

enum AlbumStatusNo {
  NewRelease = 1,
  OnSale = 2,
  StaffPick = 3,
}

function findDirection(direction: Direction) {
  console.log(`The direction is ${direction}`)
}

findDirection(Direction.North)

/** Namespaces
 * Namespaces let you create mini-modules where you can export functions and types.
 * This allows you to use names that wouldn’t conflict with other things declared in the global scope.
 */
namespace RecordStoreUtils {
  export namespace Album {
    export interface Album {
      title: string
      artist: string
      year: number
    }
  }

  function addAlbum(title: string, artist: string, year: number): RecordStoreUtils.Album.Album {
    return { title: title, artist: artist, year: year }
  }

  namespace Sales {
    export function recordSale(albumTitle: string, quantity: number, price: number) {
      // Implementation to record an album sale
    }

    function calculateTotalSales(albumTitle: string): number {
      // Implementation to calculate total sales for an album
      return 0 // Placeholder return
    }
  }
}
