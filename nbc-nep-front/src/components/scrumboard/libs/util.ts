type CutTextToMaxLength = string;

export const cutTextToMaxLength = (
  text: string,
  maxLength: number
): CutTextToMaxLength => {
  const textLength = text.length;
  if (textLength > maxLength) {
    return text.slice(0, maxLength);
  }
  return text;
};
