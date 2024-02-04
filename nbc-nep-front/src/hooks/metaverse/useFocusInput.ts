import { FocusEvent } from 'react'
import usePhaserInput from '../phaser/usePhaserInput'

export default function useFocusInput() {
  const { enableInput, disableInput } = usePhaserInput()

  const handleBlur = (e: FocusEvent) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      enableInput()
    }
  }

  const handleFocus = (e: FocusEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement
    ) {
      disableInput()
    }
  }

  return [handleFocus, handleBlur]
}
