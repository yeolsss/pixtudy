import { AuthFormType } from '@/types/auth.types'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import AuthHeroNotice from './AuthHeroNotice'
import { IMAGE_ARRAY } from './constants/constants'
import { generateRandomIndex } from './utils/authUtils'

interface Props {
  formType: AuthFormType
}
export default function AuthHeroBanner({ formType }: Props) {
  const randomIndex = generateRandomIndex(IMAGE_ARRAY.length)
  return (
    <StHeroBanner $formType={formType}>
      <Link href={'/'}>pixtudy</Link>
      <Image alt="auth-hero" src={IMAGE_ARRAY[randomIndex]} />
      <AuthHeroNotice formType={formType} />
    </StHeroBanner>
  )
}
const StHeroBanner = styled.div<{ $formType: AuthFormType }>`
  background-color: ${(props) =>
    props.$formType === 'signUp'
      ? props.theme.color.bg.interactive.primary
      : 'transparent'};
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > a {
    cursor: pointer;
    display: inline-block;
    position: absolute;
    top: ${(props) => props.theme.spacing['48']};
    left: ${(props) =>
      props.$formType === 'signUp' ? 'unset' : props.theme.spacing['48']};
    right: ${(props) =>
      props.$formType === 'signUp' ? props.theme.spacing['48'] : 'unset'};
    color: ${(props) =>
      props.$formType === 'signUp'
        ? props.theme.color.text.interactive.inverse
        : props.theme.color.text.interactive.primary};
    font-family: var(--point-font);
    font-size: ${(props) => props.theme.heading.desktop.lg.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.lg.fontWeight};
  }

  & > img {
    width: 70%;
    height: auto;
    padding-bottom: ${(props) => props.theme.spacing['80']};
  }

  @media screen and (max-width: 1000px) {
    display: none;
  }
`
