import styled from "styled-components";
import ScrumBoardItem from "./ScrumBoardItem";

export default function ScrumBoardCategory() {
  const handleAddItem = () => {};

  return (
    <StCategoryWrapper>
      <h1>No status</h1>
      <StItemsContainer>
        <ScrumBoardItem />
      </StItemsContainer>
      <button onClick={handleAddItem} />
    </StCategoryWrapper>
  );
}

const StCategoryWrapper = styled.div`
  width: 20%;
  height: 100%;
`;

const StItemsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[12]};
  background-color: #f5f5f5;
  border-radius: ${(props) => props.theme.border.radius[8]};
  padding: 10px;
`;
