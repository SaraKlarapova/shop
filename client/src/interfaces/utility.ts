type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ConditionalInterface<T extends object, K extends keyof T> = K extends keyof T
    ? MakeOptional<T, Exclude<keyof T, K>>
    : T;

