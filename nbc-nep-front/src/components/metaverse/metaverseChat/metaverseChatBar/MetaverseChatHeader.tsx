import Image from 'next/image'
import styled from 'styled-components'
import { times } from '@/assets/GNB'

interface Props {
  title: string
  subtitle?: string
  handler: () => void
}
export default function MetaverseChatHeader({
  title,
  subtitle,
  handler
}: Props) {
  return (
    <StMetaverseDmHeader>
      <h1>{title}</h1>
      {subtitle && <h2>To. {subtitle}</h2>}
      <button onClick={handler}>
        <Image src={times} alt="close" width={12} height={12} />
      </button>
    </StMetaverseDmHeader>
  )
}

const StMetaverseDmHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing['20']};
  > h1 {
    font-size: ${(props) => props.theme.unit['20']};
    font-family: var(--point-font);
    font-weight: bold;
    color: ${({ theme }) => theme.color.text.interactive.inverse};
    white-space: nowrap;
  }
  > h2 {
    margin-top: ${(props) => props.theme.spacing['24']};
    font-size: ${(props) => props.theme.unit['16']};
    font-family: var(--main-font);
    font-weight: bold;
    color: ${({ theme }) => theme.color.text.interactive.inverse};
    white-space: nowrap;
    padding-bottom: ${(props) => props.theme.spacing['12']};
    border-bottom: 1px solid white;
  }
  > button {
    position: absolute;
    right: 0;
    top: 0;
    width: 12px !important;
    height: 12px !important;
    background-color: transparent;
    border: none;
    padding: unset;
  }
`
