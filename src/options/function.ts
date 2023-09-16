import { None, OptionType, Some, SomeType } from "./index"

/**
 * Transform a function to return an Option
 *
 * @template TReturn - Return type of the function
 * @template TArgs - Arguments of the function
 * @param {(...args: TArgs) => TReturn} fn - Input function
 * @returns {(...funcArgs: TArgs) => OptionType<TReturn>} Transformed function
 */
export function wrapAlwaysReturnValue<TReturn, TArgs extends any[]>(
    fn: (...args: TArgs) => TReturn
): (...funcArgs: TArgs) => OptionType<TReturn> {
    return (...args: TArgs) => {
        const rawResult = fn(...args)

        return Some(rawResult)
    }
}

/**
 * Transform a function to return an option, but return None on a specific return result
 *
 * @template T - Return type of the function
 * @template N - Type to exclude
 * @template A - Function arguments
 * @param {(...args: A) => T | N} fn - Input function
 * @param {N} noneValue - Value to turn into None
 * @returns {(...funcArgs: A) => OptionType<Exclude<T, N>>} The transformed function
 */
export function wrapFailingReturnValue<T, N, A extends any[]>(
    fn: (...args: A) => T | N,
    noneValue: N
): (...funcArgs: A) => OptionType<Exclude<T, N>> {
    return (...args: A) => {
        const rawResult = fn(...args)

        return rawResult === noneValue
            ? None()
            : (Some(rawResult) as SomeType<Exclude<T, N>>)
    }
}

/**
 * Transform the return type of a function into an Option, where undefined results in a None
 *
 * @template T - Return type of the function
 * @template A - Arguments of the function
 * @param {(...args: A) => T} fn - Function to transform
 * @returns {(...newArgs: A) => OptionType<Exclude<T, undefined>>} A transformed function returning an Option
 */
export function returnOption<T, A extends any[]>(
    fn: (...args: A) => T
): (...newArgs: A) => OptionType<Exclude<T, undefined>> {
    return wrapFailingReturnValue(fn, undefined)
}
