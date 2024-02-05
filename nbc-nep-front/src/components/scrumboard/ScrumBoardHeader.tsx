import { StLine } from "@/components/spaces/SpaceListHeader";
import styled from "styled-components";
import SpaceSearchForm from "@/components/spaces/SpaceSearchForm";

export default function ScrumBoardHeader() {
  return (
    <StHeaderWrapper>
      <StSortTitleContainer>
        <span>최근 순</span>
        <StLine></StLine>
        <span>이름 순</span>
      </StSortTitleContainer>
      <SpaceSearchForm />
    </StHeaderWrapper>
  );
}

const StHeaderWrapper = styled.div``;
const StSortTitleContainer = styled.div``;
