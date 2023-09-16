
export type OkType<T> = {
    guard: 'Ok'
    success: true,
    data: T
}

export type ErrType<E> = {
    guard: 'Err',
    success: false
    error: E
}

export type ResultType<T, E> = OkType<T> | ErrType<E>
