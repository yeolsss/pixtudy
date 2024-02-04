import { useEffect, useRef } from 'react'

export default function useKeyDownPrevent<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleKeyDownPrevent = (e: globalThis.KeyboardEvent) => {
      e.stopPropagation()
    }
    ref.current?.addEventListener('keydown', handleKeyDownPrevent)

    return () => {
      ref.current?.removeEventListener('keydown', handleKeyDownPrevent)
    }
  }, [])

  return ref
}
