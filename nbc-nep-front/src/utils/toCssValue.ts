export const toCssValue = (x: string | number | undefined) => {
  if (!x) {
    return undefined;
  }
  if (typeof x === "string") {
    return x;
  }
  return `${x}px`;
};
