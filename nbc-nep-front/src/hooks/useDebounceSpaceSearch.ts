import useSpaceSearchStore from '@/zustand/spaceListStore'
import { useCallback, useEffect } from 'react'

export default function useDebounceSpaceSearch(timeout: number = 1000) {
  let timerId: NodeJS.Timeout | null = null
  const filterSpaces = useSpaceSearchStore.use.filterSpaces()

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId)
      }
    }
  }, [timerId])

  const debounce = useCallback(() => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      filterSpaces()
      clearTimeout(timerId as NodeJS.Timeout)
    }, timeout)
  }, [])

  return debounce
}
