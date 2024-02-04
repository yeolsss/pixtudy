import styled from 'styled-components';

export const StShareButtonWrapper = styled.div<{
  $isScreenShareType: boolean
  $isShare: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: ${(props) => props.theme.spacing[4]};
  color: ${(props) => props.theme.color.text.interactive.inverse};

  ${(props) =>
    props.$isScreenShareType && props.$isShare && 'cursor:not-allowed;'}
`