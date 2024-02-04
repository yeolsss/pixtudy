type TextMaxLengthReturn = string
export const textMaxLength = (
  text: string,
  maxLength: number
): TextMaxLengthReturn => {
  const textLength = text.length
  if (textLength > maxLength) {
    return text.slice(0, maxLength)
  }
  return text
}
