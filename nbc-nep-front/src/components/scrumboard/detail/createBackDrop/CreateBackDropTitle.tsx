import styled from 'styled-components'

interface Props {
  title: string
}

export default function CreateBackDropTitle({ title }: Props) {
  return <StCreateBackDropTitle>{title}</StCreateBackDropTitle>
}

const StCreateBackDropTitle = styled.h2`
  color: ${(props) => props.theme.color.text.primary};
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.unit[14]};
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`
