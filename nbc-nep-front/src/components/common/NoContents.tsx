import Image from 'next/image'
import { useMemo } from 'react'
import styled from 'styled-components'

interface Props {
  text?: string
}

export default function NoContents({ text = '게시물이 없습니다' }: Props) {
  const randomImage = useMemo(() => {
    const random = Math.floor(Math.random() * 2 + 1)
    return `/assets/no_contents_${random}.png`
  }, [text])

  return (
    <StNoContents>
      <Image
        draggable="false"
        src={randomImage}
        alt="no contents"
        width={70}
        height={62}
      />
      <p>{text}</p>
    </StNoContents>
  )
}

const StNoContents = styled.div`
  display: flex;
  height: calc(92vh - 320px);
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: ${(props) => props.theme.spacing[12]};
  padding: ${(props) => props.theme.spacing[24]};
  padding-bottom: ${(props) => props.theme.spacing[48]};
  & > p {
    opacity: 0.2;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.sm.medium.fontSize};
    font-weight: ${(props) => props.theme.body.lg.semibold.fontWeight};
  }
  & > img {
    opacity: 0.2;
    filter: saturate(0);
  }
`
