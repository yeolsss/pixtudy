import styled from "styled-components";

export const StDmContainer = styled.section<{ $isOpen: boolean }>`
  width: ${(props) => (props.$isOpen ? "100%" : "0px")};
  height: ${(props) => (props.$isOpen ? "100%" : "0px")};
  overflow: hidden;
`;
export const StDmListCardWrapper = styled.div`
  padding: ${(props) => props.theme.spacing["2"]};
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const StMetaverseDmChannel = styled.div`
  height: 85%;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["4"]};
  overflow: hidden;
`;

export const StMetaverseDMCardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing["6"]};
  height: ${({ theme }) => theme.spacing["80"]};
  span {
    color: ${({ theme }) => theme.color.text.interactive.inverse};
    font-size: ${({ theme }) => theme.body.lg.regular.fontSize};
  }
  &:hover {
    box-shadow: ${({ theme }) => theme.elevation.Dark.shadow8};
  }
  cursor: pointer;
`;

export const StMetaverseAvatarWrapper = styled.div`
  width: ${({ theme }) => theme.spacing["32"]};
  height: ${({ theme }) => theme.spacing["32"]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StMetaverseDMCard = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.spacing["6"]};
  font-family: ${({ theme }) => theme.body.lg.regular.fontFamily};
  width: ${(props) => props.theme.unit["112"]};

  > span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  > span:first-child {
    font-size: ${(props) => props.theme.unit["14"]};
    font-weight: bold;
    margin-bottom: ${(props) => props.theme.spacing["6"]};
  }

  > span:last-child {
    font-size: ${(props) => props.theme.unit["12"]};
  }
`;

export const StUnreadCount = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${({ theme }) => theme.spacing["8"]};
  right: ${({ theme }) => theme.spacing["12"]};
  width: ${(props) => props.theme.unit["20"]};
  height: ${(props) => props.theme.unit["20"]};
  border-radius: ${({ theme }) => theme.border.radius.circle};
  background-color: ${({ theme }) => theme.color.bg.primary};

  > span {
    font-size: ${({ theme }) => theme.body.sm.regular.fontSize};
    color: ${({ theme }) => theme.color.text.primary} !important;
    font-weight: bold;
  }
`;
