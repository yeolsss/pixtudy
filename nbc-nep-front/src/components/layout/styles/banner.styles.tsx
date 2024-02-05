import styled from "styled-components";

export const StBannerItem = styled.li`
  /* width: 420px; */
  height: 50rem;
  border-radius: ${(props) => props.theme.border.radius[12]};
  border: 1px solid ${(props) => props.theme.color.border.secondary};
  overflow: hidden;
`;

export const StButton = styled.button<{ $bgSrc: string }>`
  background-image: url(${(props) => props.$bgSrc});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: ${(props) => props.theme.elevation.Light.shadow4};
  border: none;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;

  padding: 0;
`;

export const StInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => props.theme.unit[8]};

  background-color: ${(props) => props.theme.color.base.white};
  padding: ${(props) =>
    `${props.theme.spacing[16]} ${props.theme.spacing[12]}`};
  * {
    color: ${(props) =>
      props.theme.color.text.interactive["secondary-pressed"]};
  }
`;

export const StTitle = styled.h2`
  font-family: var(--sub-font);
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
`;

export const StDescription = styled.p`
  font-family: var(--default-font);
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;
