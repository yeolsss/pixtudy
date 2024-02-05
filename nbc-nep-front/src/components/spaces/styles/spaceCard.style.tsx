import UserIcon from "@/components/common/UserIcon";
import styled from "styled-components";

export const StCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;

export const StContentsContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: var(--sub-font);
  gap: ${(props) => props.theme.spacing[12]};
  margin-top: ${(props) => props.theme.spacing[12]};
  margin-bottom: ${(props) => props.theme.spacing[12]};
  padding: 0 ${(props) => props.theme.spacing[12]};
  img {
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing[12]};
  }
  h1 {
    display: flex;
    flex-direction: row;
    gap: ${(props) => props.theme.spacing[8]};
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.heading.desktop.sm.fontSize};
    font-weight: ${(props) => props.theme.heading.desktop.sm.fontWeight};

    img {
      cursor: pointer;
      width: 15px;
      height: 15px;
    }
  }
  p {
    font-family: var(--default-font);
    font-size: ${(props) => props.theme.body.sm.regular.fontSize};
    height: calc(2 * ${(props) => props.theme.body.md.medium.lineHeight});
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    padding: ${(props) => props.theme.unit[2]};
    letter-spacing: ${(props) => props.theme.body.md.medium.letterSpacing};
    line-height: ${(props) => props.theme.body.md.medium.lineHeight};
  }
`;

export const StUserCounter = styled.div`
  position: absolute;
  display: flex;
  gap: ${(props) => props.theme.spacing[4]};
  justify-content: center;
  align-items: center;
  top: ${(props) => props.theme.unit["8"]};
  right: ${(props) => props.theme.unit["20"]};
  padding-top: ${(props) => props.theme.spacing[4]};
  padding-bottom: ${(props) => props.theme.spacing[4]};
  padding-right: ${(props) => props.theme.spacing[8]};
  padding-left: ${(props) => props.theme.spacing[8]};
  background-color: var(--button-opacity);
  border-radius: ${(props) => props.theme.border.radius.circle};
`;

export const StSpan = styled.span<{ $userExists: number }>`
  display: block;
  color: ${(props) =>
    props.$userExists ? "var(--user-exists)" : "var(--user-not-exists)"};
  padding-top: ${(props) => props.theme.spacing[2]};
  font-family: var(--sub-font);
  font-size: ${(props) => props.theme.body.sm.regular.fontSize};
`;

export const StUserIcon = styled(UserIcon)`
  width: ${(props) => props.theme.unit["8"]};
  height: ${(props) => props.theme.unit["8"]};
`;

export const StButtonContainer = styled.div`
  padding-bottom: ${(props) => props.theme.spacing[12]};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  button {
    padding: 12px;
    display: flex;
    width: fit-content;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-color: ${(props) => props.theme.color.border.interactive.secondary};
    border-radius: ${(props) => props.theme.border.radius[8]};
    font-size: ${(props) => props.theme.body.lg.regular.fontSize};
    padding-left: ${(props) => props.theme.spacing[16]};
    padding-right: ${(props) => props.theme.spacing[16]};
    &:hover {
      /* border: none; */
      background-color: ${(props) =>
        props.theme.color.bg.interactive["primary-hovered"]};
    }
    &:active {
      /* border: none; */
      background-color: ${(props) =>
        props.theme.color.bg.interactive["primary-pressed"]};
    }

    & > span {
      display: block;
      width: 24px;
      height: 24px;
      background: url("/assets/backpack.png");
      background-position: center;
      background-size: 120%;
      background-repeat: no-repeat;
      filter: saturate(0);
    }
    &:hover > span {
      filter: saturate(1);
    }
    &:nth-child(2) > span {
      width: 24px;
      height: 24px;
      background: url("/assets/laptop.png");
      background-position: center;
      background-size: 80%;
      background-repeat: no-repeat;
    }
  }
`;
