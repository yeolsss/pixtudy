import down from "@/assets/boards/input-down.svg";
import Image from "next/image";
import styled from "styled-components";
import useScrumBoardItemBackDrop from "@/zustand/createScrumBoardItemStore";
import CreateCategoryBackDrop from "@/components/scrumboard/detail/createBackDrop/CreateCategoryBackDrop";

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
        <Image src={down} alt={"down button"} width={24} height={24} />
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
    font-size: ${(props) => props.theme.unit[16]}px;
    padding: ${(props) => props.theme.unit[4]}px
      ${(props) => props.theme.unit[4]}px ${(props) => props.theme.unit[4]}px 0;
  }
  > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.theme.unit["24"]}px;
    height: ${(props) => props.theme.unit["24"]}px;
  }
`;
