import styled from 'styled-components';

export const StDockPlayerWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing[8]};

  color: ${(props) => props.theme.color.text.interactive.inverse};
  font-family: var(--sub-font);

  max-width: 200px;
`

export const StDockPlayerNickname = styled.p`
  font-size: ${(props) => props.theme.body.lg.regular.fontSize};
`

export const StDockPlayerState = styled.p`
  font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  transition: all 0.8s ease-in;
`

export const StDockPlayerInfoWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[6]};
  margin-left: 40px;
  padding-top: ${(props) => props.theme.spacing[4]};

  position: relative;

  cursor: pointer;
`
