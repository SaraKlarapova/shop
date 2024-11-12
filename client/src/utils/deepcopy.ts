export function deepCopyArray<T>(arr: T[]): T[] {
    if (!Array.isArray(arr)) {
        throw new Error('Input is not an array');
    }

    return arr.map(element => {
        if (Array.isArray(element)) {
            return deepCopyArray(element) as unknown as T;
        } else if (typeof element === 'object' && element !== null) {
            return { ...element } as T;
        } else {
            return element;
        }
    });
}
