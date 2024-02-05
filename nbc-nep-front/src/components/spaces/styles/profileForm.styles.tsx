import styled from "styled-components";

export const StProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[32]};
  align-items: stretch;
`;

export const StCurrentProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[16]};
  label {
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.sm.regular.fontSize};
  }
`;

export const StAvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.bg.secondary};
  //prettier-ignore
  padding: ${(props) => props.theme.spacing[16]} ${(props) =>
    props.theme.spacing[64]};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;

export const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.theme.spacing[8]};
  justify-content: center;
`;

export const StInputContainer = styled.div`
  position: relative;
  display: grid;
  gap: ${(props) => props.theme.spacing[12]};
  padding: ${(props) => props.theme.spacing[24]};
  max-height: ${(props) => props.theme.unit[220]};
  overflow: auto;
  border-radius: ${(props) => props.theme.border.radius[12]};
  background-color: ${(props) => props.theme.color.bg.secondary};
  grid-template-columns: repeat(5, 1fr);
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StInputWrapper = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background-color: ${(props) => props.theme.color.base.white};
  border-radius: ${(props) => props.theme.border.radius[8]};
  //prettier-ignore
  border-color: ${(props) =>
    props.$isSelected
      ? props.theme.color.border.focusRing
      : props.theme.color.border.secondary};
  border-width: ${(props) => (props.$isSelected ? "2px" : "1px")};
  border-style: solid;
  input[type="radio"] {
    display: none;
  }
`;

export const StAvatar = styled.span`
  background-image: url(${(props) => props.resource});
  background-position: center;
  display: inline-block;
  width: 32px;
  height: 48px;
  background-repeat: no-repeat;
  background-position: 0px -14px;
  margin-right: 10px;
  cursor: pointer;
  margin: 0;
`;
