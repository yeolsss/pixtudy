import styled from 'styled-components'

interface Props {
  closeModal?: () => void
  isBackground?: boolean
}
export default function BackDrop({ closeModal, isBackground = true }: Props) {
  return (
    <StBackDrop
      $isBackground={isBackground}
      onClick={closeModal && closeModal}
    />
  )
}

const StBackDrop = styled.div<{ $isBackground?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  ${(props) => props.$isBackground && 'background: rgba(0, 0, 0, 0.5)'};
  backdrop-filter: blur(4px);
  z-index: 2010;
`
