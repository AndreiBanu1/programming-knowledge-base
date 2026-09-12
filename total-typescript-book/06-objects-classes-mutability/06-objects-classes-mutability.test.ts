// @vitest-environment happy-dom
import { it, expect, describe } from 'vitest'
import type { Expect, Equal } from '../helpers'
import {
  hasKey,
  wishYouWereHereSales,
  americanBeauty,
  oneFromTheVault,
  product,
  configurations,
  type AlbumSales,
  type StudioAlbum,
  type LiveAlbum,
  type Product,
  type BaseEntity,
  type Configurations,
  type Environment,
  fetchUser,
} from './06-objects-classes-mutability.exercises'

describe('Test suite for chapter 06-object-classes-mutability', () => {
  describe('hasKey - dynamic key support', () => {
    it('Should work on string keys', () => {
      const obj = {
        foo: 'bar',
      }

      expect(hasKey(obj, 'foo')).toBe(true)
      expect(hasKey(obj, 'bar')).toBe(false)
    })

    it('Should work on number keys', () => {
      const obj = {
        1: 'bar',
      }

      expect(hasKey(obj, 1)).toBe(true)
      expect(hasKey(obj, 2)).toBe(false)
    })

    it('Should work on symbol keys', () => {
      const fooSymbol = Symbol('foo')
      const barSymbol = Symbol('bar')

      const obj = {
        [fooSymbol]: 'bar',
      }

      expect(hasKey(obj, fooSymbol)).toBe(true)
      expect(hasKey(obj, barSymbol)).toBe(false)
    })

    it('Should only consider own properties, not inherited ones', () => {
      const obj = {}

      // Inherited from Object.prototype, but not an own property
      expect(hasKey(obj, 'toString')).toBe(false)
      expect(hasKey(obj, 'hasOwnProperty')).toBe(false)
    })

    it('Should detect keys holding falsy or undefined values', () => {
      const obj = {
        zero: 0,
        empty: '',
        nothing: undefined,
        nullish: null,
      }

      expect(hasKey(obj, 'zero')).toBe(true)
      expect(hasKey(obj, 'empty')).toBe(true)
      expect(hasKey(obj, 'nothing')).toBe(true)
      expect(hasKey(obj, 'nullish')).toBe(true)
      expect(hasKey(obj, 'missing')).toBe(false)
    })

    it('Should return true for indices that exist on an array', () => {
      const arr = ['a', 'b']

      expect(hasKey(arr, 0)).toBe(true)
      expect(hasKey(arr, 1)).toBe(true)
      expect(hasKey(arr, 2)).toBe(false)
      expect(hasKey(arr, 'length')).toBe(true)
    })

    it('Should return a boolean type', () => {
      const result = hasKey({}, 'foo')
      type test = Expect<Equal<typeof result, boolean>>
      expect(typeof result).toBe('boolean')
    })
  })

  describe('Intersection types (Exercise 6-1)', () => {
    it('AlbumSales combines Album and SalesData fields', () => {
      expect(wishYouWereHereSales).toEqual({
        title: 'Wish You Were Here',
        artist: 'Pink Floyd',
        releaseYear: 1975,
        unitsSold: 13000000,
        revenue: 65000000,
      })
    })

    it('AlbumSales exposes both member types', () => {
      type test = Expect<
        Equal<
          AlbumSales,
          {
            title: string
            artist: string
            releaseYear: number
            genre?: string
          } & {
            unitsSold: number
            revenue: number
          }
        >
      >
      expect(true).toBe(true)
    })

    it('Product intersects its shape with BaseEntity', () => {
      expect(product.name).toBe('name')
      expect(product.price).toBe(2314)
      expect(typeof product.id).toBe('string')
      expect(product.createdAt).toBeInstanceOf(Date)

      type test = Expect<
        Equal<
          Product,
          {
            name: string
            price: number
          } & BaseEntity
        >
      >
    })
  })

  describe('Extending interfaces (Exercise 6-2)', () => {
    it('StudioAlbum inherits base album fields and adds studio info', () => {
      expect(americanBeauty).toEqual({
        title: 'American Beauty',
        artist: 'Grateful Dead',
        releaseYear: 1970,
        studio: 'Wally Heider Studios',
        producer: 'Grateful Dead and Stephen Barncard',
      })

      // Base fields are present on the extended interface
      const title: StudioAlbum['title'] = americanBeauty.title
      type test = Expect<Equal<typeof title, string>>
      expect(title).toBe('American Beauty')
    })

    it('LiveAlbum inherits base album fields and adds concert info', () => {
      expect(oneFromTheVault.title).toBe('One from the Vault')
      expect(oneFromTheVault.concertVenue).toBe('Great American Music Hall')
      expect(oneFromTheVault.concertDate).toBeInstanceOf(Date)
      expect(oneFromTheVault.concertDate.getUTCFullYear()).toBe(1975)

      type test = Expect<Equal<LiveAlbum['concertDate'], Date>>
    })
  })

  describe('Records restricting keys (Exercise 6-5)', () => {
    it('provides a config entry for every environment', () => {
      const environments: Environment[] = ['development', 'production', 'staging']

      for (const env of environments) {
        expect(configurations[env]).toBeDefined()
        expect(typeof configurations[env].apiBaseUrl).toBe('string')
        expect(typeof configurations[env].timeout).toBe('number')
      }
    })

    it('holds the expected per-environment values', () => {
      expect(configurations.development).toEqual({
        apiBaseUrl: 'http://localhost:8080',
        timeout: 5000,
      })
      expect(configurations.production).toEqual({
        apiBaseUrl: 'https://api.example.com',
        timeout: 10000,
      })
      expect(configurations.staging).toEqual({
        apiBaseUrl: 'https://staging.example.com',
        timeout: 8000,
      })
    })

    it('keys of Configurations are exactly the Environment union', () => {
      // At the type level, only the three environments are permitted.
      type test = Expect<Equal<keyof Configurations, Environment>>

      // The runtime object also carries an extra `notAllowed` key that is
      // only tolerated via a `@ts-expect-error` in the exercise, so assert
      // that every environment is present rather than exact key equality.
      expect(configurations).toHaveProperty('development')
      expect(configurations).toHaveProperty('production')
      expect(configurations).toHaveProperty('staging')
    })
  })

  describe('Expecting certain properties (Exercise 6-7)', () => {
    it('fields name and email are expected to be returned from fetch user', async () => {
      const user = await fetchUser()

      type test = Expect<Equal<typeof user, { name: string; email: string }>>
    })
  })
})
