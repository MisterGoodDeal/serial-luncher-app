export function hasOwnProperty<
  X extends object | undefined,
  Y extends PropertyKey
>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj !== undefined && obj.hasOwnProperty(prop);
}

export function assertHasOwnProperty<
  X extends object,
  Y extends PropertyKey,
  Type
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(_obj: X): asserts _obj is X & Record<Y, Type> {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function assertIs<T>(_val: unknown): asserts _val is T {}

export function assert(condition: boolean, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertUnreachable = (_x?: never): never => {
  throw new Error("Didn't expect to get here");
};
