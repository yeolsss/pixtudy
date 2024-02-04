import React, { useEffect, useRef } from 'react'

export default function useFocusOutInput(): React.RefObject<HTMLInputElement> {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleBackgroundClick = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      inputRef.current.blur()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleBackgroundClick)
    return () => {
      document.removeEventListener('mousedown', handleBackgroundClick)
    }
  }, [])

  return inputRef
}
