export type TraceType<V, T> = {
    guard: 'Trace',
    value: V,
    traces: T[]
}

export function Trace<V, T>(value: V, initialValue?: T): TraceType<V, T> {
    const output: TraceType<V, T> = {
        guard: 'Trace',
        value,
        traces: []
    }

    if (initialValue) {
        output.traces.push(initialValue)
    }

    return output
}



export function returnTrace<T, R, A extends any[]>( fn: (...a: A) => R, trace: (...a: A) => T): (...newArgs: A) => TraceType<R, T>
export function returnTrace<T, R, A extends any[]>( fn: (...a: A) => R, message: T): (...newArgs: A) => TraceType<R, T>

export function returnTrace<T, R, A extends any[]>(
    fn: (...a: A) => R,
    trace: (...a: A) => T | T
): (...newArgs: A) => TraceType<R, T> {
    return (...args: A) => {
        return Trace(
            fn(...args),
            typeof trace === 'function'
                ? trace(...args as A)
                : trace)
    }
}

export function combineTrace<V, T>(a: TraceType<V, T>, b: TraceType<V, T>): TraceType<V, T> {
    // TODO: imlement combine
    throw Error('not implemented')
}

export function reduceTraces<V, T>(
    fns: Array<(input: V) => TraceType<V, T>>,
    initialValue: V
): TraceType<V, T> {
    let total: TraceType<V, T> = Trace(initialValue)

    for (const fn of fns) {
        const trace = fn(total.value)

        total = combineTrace(total, trace)
    }

    return total
}

function divide(a: number, b: number): number {
    return a / b
}

const divideWithTrace = returnTrace(divide, (a, b) => `divided ${a} by ${b}`)


divideWithTrace(6, 7)

const divideBy2 = (n: number) => divideWithTrace(n, 2)

reduceTraces([
    divideBy2,
    divideBy2,
    divideBy2
], 8)
