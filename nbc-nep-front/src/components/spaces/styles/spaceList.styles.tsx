import styled from "styled-components";

export const StCardListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[32]};
  width: 100%;
  padding-top: ${(props) => props.theme.spacing[32]};
  padding-bottom: ${(props) => props.theme.spacing[32]};
  padding-left: ${(props) => props.theme.spacing[40]};
  padding-right: ${(props) => props.theme.spacing[40]};
  margin-bottom: ${(props) => props.theme.spacing[64]};
`;

export const StSpaceList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  width: 100%;
  gap: ${(props) => props.theme.spacing[24]};
  margin-right: -${(props) => props.theme.spacing[24]};
  margin-bottom: 64px;
  li {
    width: 100%;
  }
`;
