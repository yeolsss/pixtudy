import { useEffect, useRef } from 'react'

export default function useEndOfChat<T>(dependencies: T[]) {
  const endOfChatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, dependencies)

  return endOfChatRef
}
