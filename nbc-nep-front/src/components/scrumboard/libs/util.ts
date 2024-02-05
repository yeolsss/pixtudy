type textMaxLengthReturn = string;
export const textMaxLength = (
  text: string,
  maxLength: number
): textMaxLengthReturn => {
  const textLength = text.length;
  if (textLength > maxLength) {
    return text.slice(0, maxLength);
  }
  return text;
};
