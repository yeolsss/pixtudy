import useConfirm from '@/hooks/confirm/useConfirm'
import { PropsWithChildren } from 'react'
import ConfirmModal from '../modal/confirmModal/ConfirmModal'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }: PropsWithChildren) {
  const { isOpen } = useConfirm()
  return (
    <>
      <Header />
      <main>{children}</main>
      {isOpen && <ConfirmModal />}
      <Footer />
    </>
  )
}
