export type SomeType<T> = {
    guard: 'Some',

    present: true,

    data: T
}

export type NoneType = {
    guard: 'None',

    present: false
}

export type OptionType<T> = SomeType<T> | NoneType

/**
 * Wrap a javascript value in an option
 *
 * @template T - Option data type
 * @param {T} input - Data to store inside the option
 * @returns {SomeType<T>} A filled option
 */
export function Some<T>(input: T): SomeType<T> {
    return {
        guard: 'Some',
        present: true,
        data: input
    }
}

/**
 * Instantiate an simple None option
 *
 * @returns {NoneType} An empty Option
 */
export function None(): NoneType {
    return {
        guard: 'None',
        present: false
    }
}

/**
 * Checks if the input argument is an Option
 *
 * @template T - Type of the value contained in the option
 * @param {OptionType<T> | T} input - The value to check
 * @returns {boolean} true if the input is in fact an Option<T>
 */
export function isOption<T>(input: OptionType<T> | T): input is OptionType<T> {

    // ensure that the input is an object
    if (typeof input !== "object" || input === null) {
        return false
    }

    // both the property 'gaurd' and 'present' need to be on a valid Option
    if (!('guard' in input) ||
        !('present' in input)) {
        return false
    }

    // check based on the gaurd type
    switch (input.guard) {
        case 'Some':
            return 'data' in input && input.present === true
        case 'None':
            return input.present === false
        default:
            return false
    }
}

/**
 * Unwrap an Option, returing a fallback value when encountering a None
 *
 * @template T - Option value type
 * @template E - Option fallback type
 * @param {OptionType<T>} value - Option to unwrap
 * @param {E} fallback - Return value in case Option is None
 * @returns {T | E}
 */
export function unwrapSafe<T, E extends any>(value: OptionType<T>, fallback: E): T | E {
    return value.present ? value.data : fallback
}

/**
 * Unwrap an Option
 *
 * @template T - Option value type
 * @param {OptionType<T>} value - Option to unwrap
 * @returns {T | undefined} Either the value, if present, undefined otherwise
 */
export function unwrap<T>(value: OptionType<T>): T | undefined {
    return unwrapSafe(value, undefined)
}
