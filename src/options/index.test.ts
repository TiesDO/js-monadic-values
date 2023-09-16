import { describe, expect, it } from "bun:test"
import { None, OptionType, Some } from "."

describe("creating options", () => {
    describe("creating primitive options", () => {
        let option: OptionType<any>;

        it('returns a number', () => {
            option = Some(5)

            expect(option.present).toBe(true)
            expect(option.data).toBe(5)
        })

        it('returns a string', () => {
            option = Some('hey')

            expect(option.present).toBe(true)
            expect(option.data).toBe('hey')
        })

        it('returns a boolean', () => {
            option = Some(true)

            expect(option.present).toBe(true)
            expect(option.data).toBe(true)
        })

        it('returns none', () => {
            option = None()

            expect(option.present).toBe(false)
            expect(option).not.toHaveProperty('data')
        })
    })
})
