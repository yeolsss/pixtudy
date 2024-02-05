import { down } from "@/assets/boards";
import CreateCategoryBackDrop from "@/components/scrumboard/detail/createBackDrop/CreateCategoryBackDrop";
import useScrumBoardItemBackDropStore from "@/zustand/createScrumBoardItemStore";
import Image from "next/image";
import { StCategoryWrapper } from "../../styles/category.styles";

export default function CreateCategoryInputBox() {
  const { name } = useScrumBoardItemBackDropStore.use.category();
  const isOpenCategoryBackDrop =
    useScrumBoardItemBackDropStore.use.isOpenCategoryBackDrop();
  const setIsOpenCategoryBackDrop =
    useScrumBoardItemBackDropStore.use.setIsOpenCategoryBackDrop();

  const handleOnClickBackDropToggle = () => {
    setIsOpenCategoryBackDrop(!isOpenCategoryBackDrop);
  };

  return (
    <StCategoryWrapper>
      <h1>{name}</h1>
      <div
        onClick={handleOnClickBackDropToggle}
        onKeyDown={handleOnClickBackDropToggle}
        role="button"
        tabIndex={-1}
      >
        <Image src={down} alt="down button" width={16} height={16} />
      </div>
      <CreateCategoryBackDrop isOpen={isOpenCategoryBackDrop} />
    </StCategoryWrapper>
  );
}
