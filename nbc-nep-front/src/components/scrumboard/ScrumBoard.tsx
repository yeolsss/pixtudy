import { useGetSpace } from "@/hooks/query/useSupabase";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import styled from "styled-components";
import ScrumBoardCategory from "./ScrumBoardCategory";

export default function ScrumBoard() {
  const { space_id: spaceId } = useParams();
  const getSpace = useGetSpace();

  useEffect(() => {
    const space = getSpace(spaceId as string);
    console.log(space);
  }, []);

  return (
    <>
      <StScrumBoardContainer>
        <ScrumBoardCategory />
      </StScrumBoardContainer>
    </>
  );
}

const StScrumBoardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing[12]};
`;
