import {atom, Getter} from "jotai";

export function atomWithRefresh<T>(fn: (get: Getter) => T, initialValue: T) {
    const baseAtom = atom(initialValue)

    return atom(
        (get) => {
            return get(baseAtom)
        },
        (get, set) => set(baseAtom, fn(get)),
    )
}
