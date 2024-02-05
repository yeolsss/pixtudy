import styled from "styled-components";

export const StSpacePreview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[16]};
  h2 {
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
  }
`;

export const StSpacePreviewContainer = styled.div`
  gap: ${(props) => props.theme.spacing[16]};
  margin-top: ${(props) => props.theme.spacing[6]};
  background-color: ${(props) => props.theme.color.bg.secondary};
  border-radius: ${(props) => props.theme.border.radius[12]};
  padding: ${(props) => props.theme.spacing[12]};
  & > div {
    display: flex;
    gap: ${(props) => props.theme.spacing[12]};
  }
`;

export const StPreviewContents = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  h2 {
    font-family: var(--point-font);
    font-weight: ${(props) => props.theme.heading.desktop.md.fontWeight};
    font-size: ${(props) => props.theme.body.md.medium.fontSize};
    margin-bottom: ${(props) => props.theme.spacing[8]};
  }
  h3 {
    width: 100%;
    font-family: var(--sub-font);
    font-size: ${(props) => props.theme.body.sm.medium.fontSize};
    margin-bottom: ${(props) => props.theme.spacing[8]};
  }
  h3::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.color.border.primary};
    margin-top: ${(props) => props.theme.spacing[8]};
  }
  p {
    font-family: var(--main-font);
    font-size: ${(props) => props.theme.body.sm.regular.fontSize};
    line-height: ${(props) => props.theme.body.sm.regular.lineHeight};
    word-break: break-word;
  }
`;

export const StPreviewDisabled = styled.div`
  background-color: ${(props) => props.theme.color.bg.secondary};
  height: ${(props) => props.theme.unit[128]};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing[8]};
  border-radius: ${(props) => props.theme.border.radius[16]};
`;
