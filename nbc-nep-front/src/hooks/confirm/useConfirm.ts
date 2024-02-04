import useConfirmStore from '@/zustand/confirmStore'
import { ConfirmTextState } from '@/types/zustand.types'

export default function useConfirm() {
  const closeConfirm = useConfirmStore.use.closeConfirm()
  const isOpen = useConfirmStore.use.isOpen()
  const message = useConfirmStore.use.message()
  const openConfirm = useConfirmStore.use.openConfirm()
  const result = useConfirmStore.use.result()
  const resultConfirm = useConfirmStore.use.resultConfirm()
  const title = useConfirmStore.use.title()
  const confirmButtonText = useConfirmStore.use.confirmButtonText!()
  const denyButtonText = useConfirmStore.use.denyButtonText!()

  const closeConfirmHandler = () => {
    // 닫기 이벤트
    closeConfirm()
  }

  const openConfirmHandler = (alertInfo: ConfirmTextState) => {
    return new Promise((res) => {
      openConfirm(alertInfo)
      const unsubscribe = useConfirmStore.subscribe((state) => {
        const result = state.result
        res(result)
        unsubscribe()
      })
    })
  }

  const setResult = (result: boolean) => {
    resultConfirm(result)
  }

  return {
    closeConfirmHandler,
    openConfirmHandler,
    setResult,
    isOpen,
    message,
    result,
    title,
    confirmButtonText,
    denyButtonText
  }
}
