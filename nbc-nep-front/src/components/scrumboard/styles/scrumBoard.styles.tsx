import { StCTAButton } from "@/components/common/button/button.styles";
import styled from "styled-components";

export const StScrumBoardWrapper = styled.div`
  position: relative;
`;

export const StScrumBoardContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  overflow: auto;
  margin: 0 auto;
  position: relative;
  padding: 0 ${(props) => props.theme.spacing[24]};
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing[12]};
    position: relative;
  }
`;

export const StAddCategoryBtn = styled(StCTAButton)`
  display: block;
  width: 320px;
  height: ${(props) => props.theme.unit[80]};
`;
