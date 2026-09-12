// @vitest-environment happy-dom
import {it, expect} from 'vitest'
import type {Expect, Equal} from '../helpers'
import {
    getUsername,
    move,
    type Position,
    getAlbumYear,
    validateUsername,
    handleResponse,
    parseValue,
    calculateArea,
    fetchUser,
    calculateArea3
} from './05-union-literals-narrowing.exercises'

describe('Test suite for chapter 05-union-literals-narrowing', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should return the expected username', () => {
        const result = getUsername('Alice')
        type test = Expect<Equal<typeof result, string>>
        expect(result).toEqual('User: Alice')

        const result2 = getUsername(null)
        type test2 = Expect<Equal<typeof result2, string>>
        expect(result2).toEqual('Guest')
    })

    it('should move up by increasing y', () => {
        const result = move('up', 10)
        type test = Expect<Equal<typeof result, Position>>
        expect(result).toEqual({x: 0, y: 10})
    })

    it('should move down by decreasing y', () => {
        expect(move('down', 10)).toEqual({x: 0, y: -10})
    })

    it('should move left by decreasing x', () => {
        expect(move('left', 5)).toEqual({x: -5, y: 0})
    })

    it('should move right by increasing x', () => {
        expect(move('right', 5)).toEqual({x: 5, y: 0})
    })

    it('should produce no displacement for a distance of 0', () => {
        expect(move('up', 0)).toEqual({x: 0, y: 0})
    })

    it('narrows a string year and upper-cases it', () => {
        expect(getAlbumYear('mcmxcix')).toBe('The album was released in MCMXCIX.')
    })

    it('narrows a numeric year and formats it', () => {
        expect(getAlbumYear(1999)).toBe('The album was released in 1999.')
        expect(getAlbumYear(1999.7)).toBe('The album was released in 2000.') // toFixed rounds
    })

    it('should return true for valid usernames', () => {
        expect(validateUsername('Matt1234')).toBe(true)
        expect(validateUsername('Alice')).toBe(false)
        expect(validateUsername('Bob')).toBe(false)
    })

    it('should return false for null', () => {
        expect(validateUsername(null)).toBe(false)
    })

    it('throws an error when response contains an error', () => {
        expect(() =>
            handleResponse({
                error: 'Invalid argument',
            }),
        ).toThrowError('Invalid argument');
    });

    it('Should handle a {data: {id: string}}', () => {
        const result = parseValue({
            data: {
                id: '123',
            },
        })

        type test = Expect<Equal<typeof result, string>>

        expect(result).toBe('123')
    })

    it('Should error when anything else is passed in', () => {
        expect(() => parseValue('123')).toThrow('Parsing error!')

        expect(() => parseValue(123)).toThrow('Parsing error!')
    })

    it("should calculate the area of a circle", () => {
        const circle = {
            kind: "circle" as const,
            radius: 5,
        };
        const result = calculateArea(circle);
        expect(result).toBeCloseTo(Math.PI * 25);
    });

    it("should calculate the area of a square", () => {
        const square = {
            kind: "square" as const,
            sideLength: 4,
        };
        const result = calculateArea(square);
        expect(result).toBe(16);
    });

    it("returns success when the API responds with users", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => [
                    {
                        id: "1",
                        username: "john",
                    },
                ],
            }),
        );

        const result = await fetchUser();

        expect(result).toEqual([
            "success",
            [
                {
                    id: "1",
                    username: "john",
                },
            ],
        ]);
    });

    it("returns an error when the response is not OK", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
            }),
        );

        const result = await fetchUser();

        expect(result).toEqual([
            "error",
            "An error has occurred",
        ]);
    });

    it("returns an error when fetch throws", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockRejectedValue(new Error("Network error")),
        );

        const result = await fetchUser();

        expect(result).toEqual([
            "error",
            "An error occurred",
        ]);
    });
})

