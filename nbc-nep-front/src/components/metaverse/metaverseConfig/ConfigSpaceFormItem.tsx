import { PropsWithChildren } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'
import styled from 'styled-components'

interface Props {
  title: string
  maxLength: number
  curLength: number
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>
}

export default function ConfigSpaceFormItem({
  title,
  curLength,
  maxLength,
  children,
  error
}: PropsWithChildren<Props>) {
  return (
    <div>
      <StHeader>
        <span>{title}</span>
        <span>
          {curLength}/{maxLength}
        </span>
      </StHeader>
      {children}
      {error && <StErrorText>{error as string}</StErrorText>}
    </div>
  )
}

const StHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  span:last-child {
    font-size: 1.125rem;
    font-weight: normal;
  }
`

const StErrorText = styled.span`
  font-size: 1.125rem !important;
  font-weight: normal !important;
  color: ${(props) => props.theme.color.danger[500]};
  font-family: var(--default-font);
`
