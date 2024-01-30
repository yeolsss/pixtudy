import down from "@/assets/boards/input-down.svg";
import CreateCategoryBackDrop from "@/components/scrumboard/detail/createBackDrop/CreateCategoryBackDrop";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import Image from "next/image";
import styled from "styled-components";

export default function CreateCategoryInputBox() {
  const { category, isOpenCategoryBackDrop, setIsOpenCategoryBackDrop } =
    useScrumBoardItemBackDrop();
  const { name } = category;

  const handleOnClickBackDropToggle = () => {
    setIsOpenCategoryBackDrop(!isOpenCategoryBackDrop);
  };
  return (
    <StCategoryWrapper>
      <h1>{name}</h1>
      <div onClick={handleOnClickBackDropToggle}>
        <Image src={down} alt={"down button"} width={16} height={16} />
      </div>
      <CreateCategoryBackDrop isOpen={isOpenCategoryBackDrop} />
    </StCategoryWrapper>
  );
}

const StCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  > h1 {
    font-family: var(--point-font);
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.15px;
    font-size: ${(props) => props.theme.unit[16]};
    padding: ${(props) => props.theme.unit[4]} ${(props) => props.theme.unit[4]}
      ${(props) => props.theme.unit[4]} 0;
  }
  > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.theme.unit[32]};
    height: ${(props) => props.theme.unit[32]};
  }
`;
