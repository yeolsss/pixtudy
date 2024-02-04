import styled from 'styled-components'

export const StAuthOuterContainer = styled.div`
  display: flex;
  height: auto;
  min-height: 100%;
  min-width: 38rem;
`

export const StChangeAuthPage = styled.span`
  position: absolute;
  top: ${(props) => props.theme.spacing['40']};
  right: ${(props) => props.theme.spacing['48']};
  font-size: ${(props) => props.theme.unit['14']};
  font-family: var(--sub-font);
  & > a {
    font-family: inherit;
    margin-left: ${(props) => props.theme.spacing['12']};
    text-decoration: none;
    color: ${(props) => props.theme.color.text.interactive.primary};
  }
  @media screen and (max-width: 500px) {
    font-size: ${(props) => props.theme.unit['12']};
    right: ${(props) => props.theme.spacing['24']};
  }
`
