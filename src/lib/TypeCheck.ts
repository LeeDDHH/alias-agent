const isUndefinedOrNull = <T>(v: T): boolean | null =>
  typeof v === 'undefined' || v == null;

export { isUndefinedOrNull };
