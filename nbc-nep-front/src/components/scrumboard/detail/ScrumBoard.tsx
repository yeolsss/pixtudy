import { useGetSpace } from "@/hooks/query/useSupabase";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";
import ScrumBoardCategory from "./ScrumBoardCategory";
import BackDrop from "@/components/scrumboard/detail/BackDrop";
import useCreateScrum from "@/hooks/scrumBoard/useCreateScrum";

export default function ScrumBoard() {
  const { space_id: spaceId } = useParams();
  const getSpace = useGetSpace();
  const { isCreateBackDropOpen, handleToggleCreate } = useCreateScrum();

  useEffect(() => {
    const space = getSpace(spaceId as string);
    console.log(space);
  }, []);

  return (
    <>
      <button onClick={() => handleToggleCreate(true)}>
        item 생성 임시 버튼
      </button>
      <StScrumBoardContainer>
        <ScrumBoardCategory />
        {isCreateBackDropOpen && <BackDrop />}
      </StScrumBoardContainer>
    </>
  );
}

const StScrumBoardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing[12]};
  position: relative;
`;
